# Usage Guide

## Quick Start

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173`

## Features Overview

### 1. Code Editor (Left Panel)
- Write your C++ code here
- Features syntax highlighting, auto-completion, and error detection
- Monaco Editor (same as VS Code)

### 2. Template Management
- **Dropdown Menu**: Select from saved templates or "Basic Example"
- **Three-Dot Menu (⋮)**:
  - **Save as Template**: Save current code with a custom name
  - **Delete Template**: Remove the selected template

### 3. Input Section (Top Right)
- Enter program input here
- Input is read character by character by the C++ program

### 4. Output Section (Bottom Right)
- View program output
- Green text = successful execution
- Red text = compilation/runtime errors
- **Clear button**: Clear the output

### 5. Resizable Panels
- Drag the vertical divider between editor and I/O sections
- Adjust panel sizes from 20% to 80%

## Example Workflows

### Basic Hello World
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```
Click "Run Code" → See output

### With Input
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << (a + b) << endl;
    return 0;
}
```
1. Enter in Input section: `5 10`
2. Click "Run Code"
3. See output: `Sum: 15`

### Save as Template
1. Write your code
2. Click the three-dot menu (⋮)
3. Select "Save as Template"
4. Enter a name (e.g., "My Algorithm")
5. Template is now available in the dropdown

### Load Template
1. Click the template dropdown
2. Select your saved template
3. Code loads into the editor
4. Modify as needed

### Delete Template
1. Select the template from dropdown
2. Click the three-dot menu (⋮)
3. Select "Delete Template"
4. Confirm deletion

## Keyboard Shortcuts

Monaco Editor supports standard VS Code shortcuts:
- `Ctrl+S` / `Cmd+S`: Save (browser save)
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Shift+Z` / `Cmd+Shift+Z`: Redo
- `Ctrl+F` / `Cmd+F`: Find
- `Ctrl+H` / `Cmd+H`: Replace
- `Alt+Up/Down`: Move line up/down
- `Ctrl+/` / `Cmd+/`: Toggle comment

## Tips

1. **Templates persist**: Saved templates are stored in browser localStorage
2. **Input format**: For multiple inputs, separate with spaces or newlines
3. **Error messages**: Show line numbers for easier debugging
4. **JSCPP limitations**: Some advanced C++ features may not work
5. **Clear output**: Use the Clear button to reset output before running again

## Troubleshooting

### Compiler not loading
- Check internet connection (JSCPP loads from CDN)
- Refresh the page
- Check browser console for errors

### Code not running
- Ensure code has no syntax errors
- Check if compiler is ready (status message in output)
- Try with a simple example first

### Input not working
- JSCPP has limited input support
- Use simple data types (int, float, char)
- Avoid complex string operations

### Template not saving
- Check browser localStorage is enabled
- Ensure template name is unique
- Don't use "default" as template name
