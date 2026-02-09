# Architecture Overview

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── index.css            # Global styles
├── main.tsx             # Application entry point
├── hooks/
│   └── useResizer.ts    # Custom hook for panel resizing
└── types/
    └── jscpp.d.ts       # Type definitions for JSCPP library
```

## Component Architecture

### App.tsx (Main Component)

**State Management:**
- `code`: Current code in editor
- `input`: User input for program
- `output`: Program output/errors
- `outputType`: Output styling (success/error)
- `isRunning`: Execution state
- `templates`: Saved code templates
- `selectedTemplate`: Currently selected template
- `showMenu`: Menu visibility state
- `isCompilerReady`: JSCPP load state

**Key Features:**

1. **Template Management**
   - Load from localStorage on mount
   - Save templates with custom names
   - Delete templates (except default)
   - Persist to localStorage

2. **Code Execution**
   - Async JSCPP compilation
   - Input/output handling
   - Error catching and display
   - Line number reporting

3. **UI Components**
   - Monaco Editor integration
   - Dropdown template selector
   - Three-dot menu for actions
   - Resizable panels

### useResizer Hook

**Purpose:** Handle panel resizing functionality

**Features:**
- Mouse event handling (down, move, up)
- Width calculation (20%-80% range)
- Cursor styling during resize
- Ref management for container

**Returns:**
- `editorWidth`: Current editor width percentage
- `containerRef`: Reference to container element
- `handleMouseDown`: Mouse down event handler

## Data Flow

```
User Action → State Update → UI Re-render
     ↓
Template Save → localStorage → State Update
     ↓
Code Execution → JSCPP → Output Display
```

## External Dependencies

### Monaco Editor
- **Package:** `@monaco-editor/react`
- **Purpose:** Code editor with syntax highlighting
- **Features:** Auto-completion, error detection, themes

### JSCPP
- **Source:** CDN (jsdelivr)
- **Purpose:** Client-side C++ interpreter
- **Load:** Dynamic import on component mount

## Storage Strategy

**localStorage Schema:**
```json
{
  "cppTemplates": {
    "templateName1": "code string",
    "templateName2": "code string"
  }
}
```

## Performance Considerations

1. **Lazy Loading:** JSCPP loaded asynchronously
2. **Automatic Layout:** Monaco editor auto-adjusts to container
3. **Event Delegation:** Single event listeners for resize
4. **Memoization:** Template list sorted only on change

## Error Handling

1. **Compiler Load Failure:** Display error message, disable run button
2. **Compilation Errors:** Show error message with line number
3. **Runtime Errors:** Catch and display with context
4. **Template Validation:** Check for empty code, reserved names

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support (Monaco built-in)
- Focus management for menu

## Future Enhancements

1. **Export/Import Templates:** Share templates as files
2. **Multiple Language Support:** Add Python, Java, etc.
3. **Code Formatting:** Auto-format on save
4. **Themes:** Light/dark mode toggle
5. **Collaborative Editing:** Real-time code sharing
6. **Execution History:** Save previous runs
7. **Syntax Validation:** Real-time error checking
8. **Code Snippets:** Pre-built code blocks
