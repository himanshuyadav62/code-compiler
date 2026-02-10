import { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useResizer } from './hooks/useResizer';
import { initializeParser, validateCppSyntax, isParserInitialized } from './utils/syntaxValidator';
import type { editor } from 'monaco-editor';
import './App.css';

const DEFAULT_TEMPLATE = `#include <iostream>
using namespace std;

int main() {
    return 0;
}`;

interface Template {
  [key: string]: string;
}

function App() {
  const [code, setCode] = useState(DEFAULT_TEMPLATE);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState<'success' | 'error' | ''>('');
  const [isRunning, setIsRunning] = useState(false);
  const [templates, setTemplates] = useState<Template>({});
  const [selectedTemplate, setSelectedTemplate] = useState('default');
  const [showMenu, setShowMenu] = useState(false);
  const [isCompilerReady, setIsCompilerReady] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const JSCPPRef = useRef<unknown>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const { editorWidth, containerRef, handleMouseDown } = useResizer();

  // Load templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cppTemplates');
    if (saved) {
      setTemplates(JSON.parse(saved));
    }
  }, []);

  // Load JSCPP compiler
  useEffect(() => {
    const loadCompiler = async () => {
      try {
        const JSCPP = await import('https://cdn.jsdelivr.net/npm/JSCPP@2.0.9/+esm');
        JSCPPRef.current = JSCPP.default || JSCPP;
        setIsCompilerReady(true);
        setOutput('Compiler ready. Click "Run Code" to execute.');
        setOutputType('success');
      } catch (error) {
        console.error('Compiler load error:', error);
        setOutput('Failed to load compiler. Please refresh the page.');
        setOutputType('error');
      }
    };
    loadCompiler();
  }, []);

  // Load Tree-sitter parser for syntax validation
  useEffect(() => {
    const loadParser = async () => {
      try {
        const result = await initializeParser();
        if (result) {
          console.log('Tree-sitter parser initialized successfully');
        } else {
          console.warn('Tree-sitter parser failed to initialize - syntax validation disabled');
        }
      } catch (error) {
        console.error('Parser load error:', error);
      }
    };
    loadParser();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Ctrl+' to run code
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "'") {
        event.preventDefault();
        handleRunCode();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, input, isCompilerReady, isRunning]);

  const saveTemplates = (newTemplates: Template) => {
    localStorage.setItem('cppTemplates', JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };

  const handleSaveTemplate = () => {
    const name = prompt('Enter template name:');
    if (!name) return;

    if (name.toLowerCase() === 'default') {
      alert('Cannot use "default" as template name.');
      return;
    }

    if (!code.trim()) {
      alert('Cannot save empty template.');
      return;
    }

    const newTemplates = { ...templates, [name]: code };
    saveTemplates(newTemplates);
    setSelectedTemplate(name);
    setOutput(`Template "${name}" saved successfully!`);
    setOutputType('success');
    setShowMenu(false);
  };

  const handleDeleteTemplate = () => {
    if (selectedTemplate === 'default') {
      alert('Cannot delete the default template.');
      return;
    }

    if (!confirm(`Delete template "${selectedTemplate}"?`)) return;

    const newTemplates = { ...templates };
    delete newTemplates[selectedTemplate];
    saveTemplates(newTemplates);
    setSelectedTemplate('default');
    setCode(DEFAULT_TEMPLATE);
    setOutput(`Template "${selectedTemplate}" deleted.`);
    setOutputType('');
    setShowMenu(false);
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedTemplate(name);
    const templateCode = name === 'default' ? DEFAULT_TEMPLATE : templates[name];
    if (templateCode) {
      setCode(templateCode);
      setOutput('Template loaded. Click "Run Code" to execute.');
      setOutputType('');
    }
  };

  const handleRunCode = async () => {
    if (!isCompilerReady) {
      setOutput('Compiler is still loading...');
      setOutputType('error');
      return;
    }

    if (!code.trim()) {
      setOutput('Please write some code first.');
      setOutputType('error');
      return;
    }

    setIsRunning(true);
    setOutput('Compiling and running...');
    setOutputType('');

    try {
      let outputText = '';
      const inputData = input.trim();

      const result = await (JSCPPRef.current as { run: (code: string, input: string, options: any) => Promise<number | undefined> }).run(code, inputData, {
        stdio: {
          write: (s: string) => {
            outputText += s;
          }
        }
      });

      if (result !== undefined && result !== null) {
        outputText += '\nProgram exited with code: ' + result;
      }

      setOutput(outputText || 'Program executed successfully with no output.');
      setOutputType('success');
    } catch (error) {
      let errorMsg = 'Compilation/Runtime Error:\n\n';
      
      if (error instanceof Error && error.message) {
        errorMsg += error.message;
      } else {
        errorMsg += String(error);
      }

      if (error && typeof error === 'object' && 'line' in error) {
        errorMsg += '\n\nLine: ' + error.line;
      }

      setOutput(errorMsg);
      setOutputType('error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearOutput = () => {
    setOutput('');
    setOutputType('');
  };

  const handleResetCode = () => {
    if (!confirm('Reset code to template? This will discard your current changes.')) return;
    
    const templateCode = selectedTemplate === 'default' ? DEFAULT_TEMPLATE : templates[selectedTemplate];
    if (templateCode) {
      setCode(templateCode);
      setOutput('Code reset to template.');
      setOutputType('');
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Register custom completion provider for variables and functions
    monaco.languages.registerCompletionItemProvider('cpp', {
      provideCompletionItems: (model: editor.ITextModel, position: any) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        // Extract variable declarations (int, float, double, char, bool, string, etc.)
        const variableRegex = /\b(?:int|float|double|char|bool|string|long|short|unsigned|auto|const)\s+(\w+)/g;
        const variables = new Set<string>();
        let match;

        while ((match = variableRegex.exec(textUntilPosition)) !== null) {
          variables.add(match[1]);
        }

        // Also extract function parameters
        const paramRegex = /\(([^)]*)\)/g;
        let paramMatch;
        while ((paramMatch = paramRegex.exec(textUntilPosition)) !== null) {
          const params = paramMatch[1].split(',');
          params.forEach(param => {
            const paramNameRegex = /\w+$/;
            const paramNameMatch = paramNameRegex.exec(param.trim());
            if (paramNameMatch) {
              variables.add(paramNameMatch[0]);
            }
          });
        }

        // Extract function declarations
        const functionRegex = /(?:int|float|double|char|bool|string|void|long|short|unsigned|auto)\s+(\w+)\s*\([^)]*\)\s*[{;]/g;
        const functions = new Map<string, string>();
        let funcMatch;

        while ((funcMatch = functionRegex.exec(textUntilPosition)) !== null) {
          const funcName = funcMatch[1];
          if (funcName !== 'main' && funcName !== 'if' && funcName !== 'while' && funcName !== 'for') {
            // Extract the full function signature
            const funcStart = funcMatch.index;
            const funcSignature = textUntilPosition.substring(funcStart, funcMatch.index + funcMatch[0].length);
            const signatureMatch = /(\w+\s+\w+\s*\([^)]*\))/.exec(funcSignature);
            if (signatureMatch) {
              functions.set(funcName, signatureMatch[1]);
            }
          }
        }

        // Create variable suggestions
        const variableSuggestions = Array.from(variables).map(varName => ({
          label: varName,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: varName,
          detail: 'declared variable',
          documentation: `Variable: ${varName}`,
        }));

        // Create function suggestions
        const functionSuggestions = Array.from(functions.entries()).map(([funcName, signature]) => {
          // Extract parameters for snippet
          const paramsMatch = /\(([^)]*)\)/.exec(signature);
          const params = paramsMatch ? paramsMatch[1] : '';
          
          // Create snippet with parameter placeholders
          let snippetText = funcName + '(';
          if (params.trim()) {
            const paramList = params.split(',').map((p, i) => {
              const paramName = p.trim().split(/\s+/).pop() || `arg${i + 1}`;
              return `\${${i + 1}:${paramName}}`;
            });
            snippetText += paramList.join(', ');
          }
          snippetText += ')';

          return {
            label: funcName,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: snippetText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'declared function',
            documentation: signature,
          };
        });

        // Add common C++ keywords and snippets
        const cppSuggestions = [
          {
            label: 'cout',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'cout << ${1:text} << endl;',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Output to console',
          },
          {
            label: 'cin',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'cin >> ${1:variable};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Input from console',
          },
          {
            label: 'for',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'For loop',
          },
          {
            label: 'while',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'while (${1:condition}) {\n\t${2}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'While loop',
          },
          {
            label: 'if',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if (${1:condition}) {\n\t${2}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'If statement',
          },
          {
            label: 'else',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'else {\n\t${1}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Else statement',
          },
          {
            label: 'else if',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'else if (${1:condition}) {\n\t${2}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Else if statement',
          },
          {
            label: 'switch',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'switch (${1:variable}) {\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${4}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Switch statement',
          },
          {
            label: 'vector',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'vector<${1:int}> ${2:vec};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Vector declaration',
          },
          {
            label: 'function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '${1:int} ${2:functionName}(${3:params}) {\n\t${4}\n\treturn ${5:0};\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Function declaration',
          },
        ];

        return {
          suggestions: [...variableSuggestions, ...functionSuggestions, ...cppSuggestions],
        };
      },
    });

    // Enable syntax validation on change with debounce
    let debounceTimer: ReturnType<typeof setTimeout>;
    editor.onDidChangeModelContent(() => {
      if (isParserInitialized()) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          validateSyntax();
        }, 500);
      }
    });

    // Initial validation
    if (isParserInitialized()) {
      validateSyntax();
    }
  };

  // Validate C++ syntax using Tree-sitter and show errors inline
  const validateSyntax = useCallback(() => {
    if (!editorRef.current || !monacoRef.current || !isParserInitialized()) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const code = model.getValue();
    
    // Use Tree-sitter for proper syntax analysis
    const errors = validateCppSyntax(code, monacoRef.current.MarkerSeverity);

    // Set markers in the editor
    monacoRef.current.editor.setModelMarkers(model, 'cpp', errors);
    markersRef.current = errors;
  }, []);

  return (
    <div className="app-container" ref={containerRef}>
      <div className="editor-section" style={{ flex: `0 0 ${editorWidth}%` }}>
        <div className="section-header">
          <div className="header-left">
            <h3>Code Editor</h3>
            <select 
              value={selectedTemplate} 
              onChange={handleTemplateChange}
              className="template-select"
            >
              <option value="default">Basic Example</option>
              {Object.keys(templates).sort((a, b) => a.localeCompare(b)).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="menu-container" ref={menuRef}>
              <button 
                className="menu-button" 
                onClick={() => setShowMenu(!showMenu)}
              >
                ⋮
              </button>
              {showMenu && (
                <div className="menu-dropdown">
                  <button 
                    className="menu-item" 
                    onClick={handleSaveTemplate}
                    type="button"
                  >
                    💾 Save as Template
                  </button>
                  <button 
                    className="menu-item" 
                    onClick={handleResetCode}
                    type="button"
                  >
                    🔄 Reset to Template
                  </button>
                  <button 
                    className="menu-item" 
                    onClick={handleDeleteTemplate}
                    type="button"
                  >
                    🗑️ Delete Template
                  </button>
                </div>
              )}
            </div>
          </div>
          <button 
            className="run-button" 
            onClick={handleRunCode}
            disabled={isRunning || !isCompilerReady}
            title="Run Code (Ctrl+')"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <div className="editor-wrapper">
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              suggestOnTriggerCharacters: true,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: false,
              },
              parameterHints: {
                enabled: true,
              },
              suggest: {
                showKeywords: true,
                showSnippets: true,
                showVariables: true,
              },
            }}
          />
        </div>
      </div>

      <button 
        className="resizer" 
        onMouseDown={handleMouseDown}
        aria-label="Resize panels"
        type="button"
      />

      <div className="io-section" style={{ width: `${100 - editorWidth}%` }}>
        <div className="input-section">
          <div className="section-header">
            <h3>Input</h3>
          </div>
          <textarea
            className="input-area"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input here (e.g., 42 or multiple values: 10 20 30)..."
          />
        </div>

        <div className="output-section">
          <div className="section-header">
            <h3>Output</h3>
            <button className="clear-button" onClick={handleClearOutput}>
              Clear
            </button>
          </div>
          <pre className={`output-area ${outputType}`}>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
