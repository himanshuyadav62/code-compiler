let parser: any = null;
let isInitialized = false;

export async function initializeParser(): Promise<any> {
  if (isInitialized) return parser;

  try {
    // Dynamic import of web-tree-sitter
    const TreeSitterModule: any = await import('web-tree-sitter');

    console.log('TreeSitter module keys:', Object.keys(TreeSitterModule));

    // Try different ways to access the Parser class
    const TreeSitter = TreeSitterModule.default ||
      TreeSitterModule.Parser ||
      TreeSitterModule;

    console.log('TreeSitter:', TreeSitter);
    console.log('TreeSitter.init:', TreeSitter.init);

    // Check if we got the right thing
    if (!TreeSitter || typeof TreeSitter.init !== 'function') {
      throw new Error('TreeSitter.init not found');
    }

    // Initialize Tree-sitter
    await TreeSitter.init({
      locateFile() {
        return '/tree-sitter.wasm';
      }
    });

    parser = new TreeSitter();

    // Load C++ language grammar locally
    // Access Language from the module directly if not on the class
    const Language = TreeSitterModule.Language || TreeSitter.Language;
    const Cpp = await Language.load('/tree-sitter-cpp.wasm');
    parser.setLanguage(Cpp);

    isInitialized = true;
    console.log('Tree-sitter parser successfully initialized');
    return parser;
  } catch (error) {
    console.error('Failed to initialize Tree-sitter parser:', error);
    return null;
  }
}

export interface SyntaxError {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
  severity: number;
}

interface MonacoSeverity {
  Error: number;
  Warning: number;
}

export function validateCppSyntax(code: string, monacoSeverity: MonacoSeverity): SyntaxError[] {
  if (!parser || !isInitialized) {
    return [];
  }

  let tree: any = null;
  const errors: SyntaxError[] = [];

  try {
    tree = parser.parse(code);
    const rootNode = tree.rootNode;

    // Find all ERROR nodes in the syntax tree
    function findErrors(node: any) {
      if (node.type === 'ERROR' || (typeof node.isMissing === 'function' && node.isMissing())) {
        const startPos = node.startPosition;
        const endPos = node.endPosition;

        // Get the error context
        let message = 'Syntax error';

        // Try to provide more specific error messages
        if (node.type === 'ERROR') {
          const text = code.substring(node.startIndex, node.endIndex);

          if (text.includes(';')) {
            message = 'Unexpected semicolon';
          } else if (text.includes('{') || text.includes('}')) {
            message = 'Unexpected brace';
          } else if (text.includes('(') || text.includes(')')) {
            message = 'Unexpected parenthesis';
          } else if (text.trim().length === 0) {
            // Handle empty/whitespace errors specially
            // If we have an error node that is just whitespace, it's often a "missing" something else
            // but if we don't know what, "Syntax error" is safe.
            // Sometimes tree-sitter produces 0-length ERROR nodes.
            if (node.endIndex === node.startIndex) {
              message = 'Missing token';
            } else {
              message = 'Unexpected token';
            }
          } else {
            message = `Unexpected token: ${text.substring(0, 20)}`;
          }
        } else if (typeof node.isMissing === 'function' && node.isMissing()) {
          message = `Missing ${node.type}`;
        }

        errors.push({
          startLineNumber: startPos.row + 1,
          startColumn: startPos.column + 1,
          endLineNumber: endPos.row + 1,
          endColumn: endPos.column + 1,
          message,
          severity: monacoSeverity.Error,
        });
      }

      // Recursively check children if this node contains an error
      const hasError = typeof node.hasError === 'function' ? node.hasError() : node.hasError;
      if (hasError) {
        for (let i = 0; i < node.childCount; i++) {
          const child = node.child(i);
          if (child) {
            findErrors(child);
          }
        }
      }
    }

    findErrors(rootNode);

    // Additional semantic checks
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();

      // Check for missing includes
      if ((trimmedLine.includes('cout') || trimmedLine.includes('cin') || trimmedLine.includes('endl')) &&
        !code.includes('#include <iostream>') && !code.includes('#include<iostream>')) {
        errors.push({
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: line.length + 1,
          message: 'Missing #include <iostream>',
          severity: monacoSeverity.Warning,
        });
      }

      const vectorRegex = /vector</;
      if (vectorRegex.exec(trimmedLine) &&
        !code.includes('#include <vector>') && !code.includes('#include<vector>')) {
        errors.push({
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: line.length + 1,
          message: 'Missing #include <vector>',
          severity: monacoSeverity.Warning,
        });
      }

      const stringRegex = /\bstring\s+\w+/;
      if (stringRegex.exec(trimmedLine) &&
        !code.includes('#include <string>') && !code.includes('#include<string>')) {
        errors.push({
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: line.length + 1,
          message: 'Missing #include <string>',
          severity: monacoSeverity.Warning,
        });
      }
    });

    // Check for main function
    const mainRegex = /int\s+main\s*\(/;
    if (!mainRegex.exec(code)) {
      errors.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 1,
        message: 'Missing int main() function',
        severity: monacoSeverity.Warning,
      });
    }

  } catch (error) {
    console.error('Error during syntax validation:', error);
  } finally {
    if (tree) {
      tree.delete();
    }
  }

  return errors;
}

export function isParserInitialized(): boolean {
  return isInitialized && parser !== null;
}
