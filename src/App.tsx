import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useResizer } from './hooks/useResizer';
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
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
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
