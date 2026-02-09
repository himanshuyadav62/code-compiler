# Demo Examples

## Testing Variable Auto-Completion

### Example 1: Basic Variables
```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 10;
    float price = 99.99;
    char grade = 'A';
    
    // Start typing "num" and press Ctrl+Space
    // You'll see "number" in the suggestions
    cout << number << endl;
    
    // Start typing "pr" and press Ctrl+Space
    // You'll see "price" in the suggestions
    cout << price << endl;
    
    return 0;
}
```

### Example 2: Multiple Variables
```cpp
#include <iostream>
using namespace std;

int main() {
    int studentAge = 20;
    int studentGrade = 85;
    int studentId = 12345;
    
    // Type "student" and press Ctrl+Space
    // All three variables will appear in suggestions
    cout << studentAge << endl;
    cout << studentGrade << endl;
    cout << studentId << endl;
    
    return 0;
}
```

### Example 3: Function Parameters
```cpp
#include <iostream>
using namespace std;

int calculateSum(int firstNumber, int secondNumber) {
    // Type "first" or "second" and press Ctrl+Space
    // Parameters will appear in suggestions
    return firstNumber + secondNumber;
}

int main() {
    int result = calculateSum(10, 20);
    cout << result << endl;
    return 0;
}
```

## Testing Function Auto-Completion

### Example 1: Simple Functions
```cpp
#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int multiply(int x, int y) {
    return x * y;
}

int main() {
    // Type "add" and press Ctrl+Space
    // You'll see "add(a, b)" in suggestions
    int sum = add(10, 20);
    
    // Type "mult" and press Ctrl+Space
    // You'll see "multiply(x, y)" in suggestions
    int product = multiply(5, 6);
    
    cout << "Sum: " << sum << endl;
    cout << "Product: " << product << endl;
    
    return 0;
}
```

### Example 2: Functions with Variables
```cpp
#include <iostream>
using namespace std;

double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}

double calculateCircumference(double radius) {
    return 2 * 3.14159 * radius;
}

int main() {
    double circleRadius = 5.0;
    
    // Type "calc" - suggests both functions
    // Type "circleR" - suggests the variable
    double area = calculateArea(circleRadius);
    double circumference = calculateCircumference(circleRadius);
    
    cout << "Area: " << area << endl;
    cout << "Circumference: " << circumference << endl;
    
    return 0;
}
```

## Testing Combined Auto-Completion

### Example: Variables + Functions Together
```cpp
#include <iostream>
using namespace std;

int square(int num) {
    return num * num;
}

int cube(int num) {
    return num * num * num;
}

int main() {
    int number = 5;
    int anotherNumber = 10;
    
    // Type "num" - suggests: number, anotherNumber (variables)
    // Type "sq" - suggests: square(num) (function)
    // Type "cu" - suggests: cube(num) (function)
    
    int squared = square(number);
    int cubed = cube(anotherNumber);
    
    cout << "Square: " << squared << endl;
    cout << "Cube: " << cubed << endl;
    
    return 0;
}
```

## Testing Reset to Template

### Scenario 1: Accidental Changes
1. Load a template (e.g., "Basic Example")
2. Make some changes to the code
3. Realize you want to start over
4. Click ⋮ → "Reset to Template"
5. Confirm the dialog
6. Code is restored to original template

### Scenario 2: Experimenting
1. Save your working code as "My Algorithm"
2. Experiment with different approaches
3. If experiment fails, click ⋮ → "Reset to Template"
4. Back to your saved version instantly

## Testing Input/Output

### Example: Simple Input
```cpp
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << x << endl;
    return 0;
}
```
**Input:** `42`  
**Output:** `42`

### Example: Multiple Inputs
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << "Sum: " << (a + b + c) << endl;
    return 0;
}
```
**Input:** `10 20 30`  
**Output:** `Sum: 60`

### Example: Mixed Types
```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    float salary;
    cin >> age >> salary;
    cout << "Age: " << age << endl;
    cout << "Salary: " << salary << endl;
    return 0;
}
```
**Input:** `25 50000.50`  
**Output:**  
```
Age: 25
Salary: 50000.5
```

## Code Snippets Available

Type these and press `Ctrl+Space` or `Tab`:

- **cout** → `cout << text << endl;`
- **cin** → `cin >> variable;`
- **for** → Complete for loop structure
- **while** → Complete while loop structure
- **if** → Complete if statement structure
- **else** → Complete else block
- **vector** → Vector declaration

## Tips for Best Experience

1. **Auto-Completion Trigger:**
   - Type a few characters
   - Press `Ctrl+Space` to see suggestions
   - Use arrow keys to navigate
   - Press `Enter` or `Tab` to accept

2. **Variable Naming:**
   - Use descriptive names (e.g., `studentAge` not `sa`)
   - Auto-completion works better with longer names
   - CamelCase or snake_case both work

3. **Template Workflow:**
   - Start with default template
   - Write your code
   - Save as template when satisfied
   - Use reset if you need to start over

4. **Input Format:**
   - Separate values with spaces: `10 20 30`
   - Or use newlines:
     ```
     10
     20
     30
     ```
   - Both work the same way

5. **Debugging:**
   - Check output for error messages
   - Error messages include line numbers
   - Use reset to start fresh if needed
