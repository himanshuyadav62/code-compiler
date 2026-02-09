# Auto-Completion Features

## Overview

The C++ IDE now includes intelligent auto-completion for:
- ✅ **Variables** - All declared variables
- ✅ **Functions** - User-defined functions with parameter hints
- ✅ **Keywords** - C++ language keywords
- ✅ **Snippets** - Common code patterns

## 1. Variable Auto-Completion

### What Gets Detected:
- Variable declarations with any C++ type:
  - `int`, `float`, `double`, `char`, `bool`
  - `string`, `long`, `short`, `unsigned`
  - `auto`, `const`
- Function parameters
- Variables in any scope

### Example:
```cpp
int studentAge = 20;
float studentGPA = 3.8;
char studentGrade = 'A';

// Type "stud" + Ctrl+Space
// Suggests: studentAge, studentGPA, studentGrade
```

### Features:
- 📦 Variable icon in suggestions
- Shows "declared variable" detail
- Real-time detection as you type
- Works across entire file

## 2. Function Auto-Completion

### What Gets Detected:
- Function declarations with any return type
- Function definitions
- Parameter names and types
- Full function signatures

### Example:
```cpp
int calculateSum(int a, int b) {
    return a + b;
}

// Type "calc" + Ctrl+Space
// Suggests: calculateSum(a, b)
// Shows: "int calculateSum(int a, int b)"
```

### Features:
- ƒ Function icon in suggestions
- Shows full signature in documentation
- Parameter placeholders when inserted
- Tab navigation between parameters
- Excludes `main()` and keywords

### Smart Parameter Insertion:
When you select a function, it inserts with placeholders:
```cpp
calculateSum(a, b)
           ↑   ↑
         Tab stops here
```

Press `Tab` to jump between parameters!

## 3. Code Snippets

### Available Snippets:

#### Output
- **cout** → `cout << text << endl;`

#### Input
- **cin** → `cin >> variable;`

#### Loops
- **for** → Complete for loop with counter
- **while** → Complete while loop

#### Conditionals
- **if** → If statement block
- **else** → Else block
- **else if** → Else if statement
- **switch** → Switch statement with cases

#### Data Structures
- **vector** → Vector declaration

#### Functions
- **function** → Complete function template

### Example Usage:
```cpp
// Type "for" + Tab
for (int i = 0; i < n; i++) {
    // cursor here
}

// Type "vector" + Tab
vector<int> vec;
```

## 4. How to Use

### Trigger Auto-Completion:
1. **Automatic**: Start typing, suggestions appear
2. **Manual**: Press `Ctrl+Space` anytime
3. **After dot/arrow**: Automatic for member access

### Navigate Suggestions:
- `↑` / `↓` - Move up/down
- `Page Up` / `Page Down` - Scroll list
- `Home` / `End` - Jump to start/end
- `Esc` - Close suggestions

### Accept Suggestions:
- `Enter` - Accept and insert
- `Tab` - Accept and insert
- Click - Accept with mouse

### Parameter Navigation:
- `Tab` - Next parameter
- `Shift+Tab` - Previous parameter
- Click - Jump to specific parameter

## 5. Smart Features

### Context-Aware:
- Only suggests relevant items
- Filters based on what you type
- Prioritizes recent declarations

### Type Information:
- Variables show their type
- Functions show return type
- Parameters show in signature

### Documentation:
- Hover to see details
- Full signatures displayed
- Helpful descriptions

## 6. Examples by Category

### Basic Variables:
```cpp
int x = 10;
float y = 20.5;

// Type "x" or "y" - both suggested
cout << x + y << endl;
```

### Function Parameters:
```cpp
void process(int value, float rate) {
    // Type "val" - suggests "value"
    // Type "rat" - suggests "rate"
    cout << value * rate << endl;
}
```

### Multiple Functions:
```cpp
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

// Type "add" - suggests add()
// Type "sub" - suggests subtract()
// Type "mult" - suggests multiply()
```

### Nested Scopes:
```cpp
int globalVar = 100;

int main() {
    int localVar = 50;
    
    // Both globalVar and localVar suggested
    cout << globalVar + localVar << endl;
    return 0;
}
```

### Complex Example:
```cpp
#include <iostream>
using namespace std;

double calculateAverage(int a, int b, int c) {
    return (a + b + c) / 3.0;
}

int main() {
    int score1 = 85;
    int score2 = 90;
    int score3 = 78;
    
    // Type "calc" - suggests calculateAverage()
    // Type "score" - suggests all three scores
    double average = calculateAverage(score1, score2, score3);
    
    cout << "Average: " << average << endl;
    return 0;
}
```

## 7. Tips for Best Experience

### 1. Use Descriptive Names:
✅ Good: `studentAge`, `calculateTotal`, `isValid`
❌ Bad: `x`, `calc`, `chk`

### 2. Declare Before Use:
- Variables and functions must be declared before they appear in suggestions
- Declare functions at the top of your file

### 3. Leverage Tab Stops:
- After inserting a function, use `Tab` to quickly fill parameters
- Much faster than clicking each parameter

### 4. Combine with Snippets:
- Use snippets for structure (for, if, while)
- Use auto-completion for your variables/functions

### 5. Trust the Suggestions:
- The editor scans your entire code
- All declared items will appear
- No need to remember exact names

## 8. Comparison with Other Editors

| Feature | This IDE | Basic Editor | VS Code |
|---------|----------|--------------|---------|
| Variable completion | ✅ | ❌ | ✅ |
| Function completion | ✅ | ❌ | ✅ |
| Parameter hints | ✅ | ❌ | ✅ |
| Code snippets | ✅ | ❌ | ✅ |
| Real-time detection | ✅ | ❌ | ✅ |
| Tab navigation | ✅ | ❌ | ✅ |
| Client-side | ✅ | ✅ | ❌ |

## 9. Technical Details

### Detection Algorithm:
1. Scans code from start to cursor position
2. Uses regex to find declarations
3. Extracts names and signatures
4. Filters out keywords and `main()`
5. Provides suggestions in real-time

### Performance:
- Instant suggestions (< 10ms)
- Efficient regex matching
- No server round-trips
- Scales with code size

### Limitations:
- Only detects declarations before cursor
- Doesn't understand complex scoping
- No cross-file suggestions
- Basic type inference only

## 10. Future Enhancements

Potential improvements:
- Class member suggestions
- Namespace support
- Template suggestions
- Include file awareness
- Semantic analysis
- Type inference
- Error suggestions

---

**Start using auto-completion today and code faster!** 🚀

Press `Ctrl+Space` anytime to see what's available.
