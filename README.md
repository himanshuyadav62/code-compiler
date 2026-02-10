# C++ Online IDE

A modern, client-side C++ code editor with real-time compilation using WebAssembly. Built with React, TypeScript, and Monaco Editor.

## Features

- **Monaco Editor**: Full-featured code editor (same as VS Code)
  - Syntax highlighting
  - Code suggestions and auto-completion
  - **Real-time syntax validation** with Tree-sitter
  - **Variable suggestions**: Auto-suggests variables you've declared
  - Bracket matching
  - Line numbers
  - Minimap

- **Client-Side Compilation**: Uses JSCPP (JavaScript C++ interpreter)
  - No server required
  - Runs entirely in browser
  - Instant feedback

- **Template Management**:
  - Save custom code templates
  - Load templates from dropdown
  - **Reset to template**: Restore original template code
  - Delete templates
  - Persistent storage using localStorage

- **Resizable Panels**: Drag the divider to adjust editor and I/O panel sizes

- **Three-Panel Layout**:
  - Left: Code editor (resizable)
  - Right Top: Input section
  - Right Bottom: Output section

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Usage

1. Write your C++ code in the left panel
2. Add input (if needed) in the top-right panel
3. Click "Run Code" to execute
4. View output in the bottom-right panel

### Template Management

- **Save Template**: Click the three-dot menu (⋮) → "Save as Template" → Enter a name
- **Load Template**: Select from the dropdown menu
- **Reset to Template**: Click the three-dot menu (⋮) → "Reset to Template" → Restores original template code
- **Delete Template**: Select a template → Click three-dot menu → "Delete Template"

## Variable & Function Auto-Completion

The editor automatically suggests variables and functions you've declared:
- **Variables**: Type a few letters of a variable name
- **Functions**: Type a function name and get parameter hints
- Press `Ctrl+Space` to trigger suggestions
- Select from the list of declared variables/functions
- Works with all C++ data types and return types
- Function suggestions include parameter placeholders

## Supported C++ Features

The JSCPP interpreter supports most C++ features including:
- Standard I/O (cin, cout)
- Control structures (if, for, while, switch)
- Functions
- Arrays and pointers
- Basic classes and structs
- STL containers (limited support)

## Browser Requirements

- Modern browser with ES6+ support
- Internet connection (for CDN resources)

## Tech Stack

- React 19
- TypeScript
- Vite
- Monaco Editor
- JSCPP (C++ interpreter)

## Notes

- JSCPP is a JavaScript-based C++ interpreter
- Some advanced C++ features may not be supported
- For production use with full C++ support, consider using Emscripten
