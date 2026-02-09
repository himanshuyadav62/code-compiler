# Function Auto-Completion Demo

## How It Works

When you declare functions in your code, the editor automatically detects them and provides intelligent suggestions with parameter hints.

## Example 1: Basic Function

```cpp
#include <iostream>
using namespace std;

int calculateSum(int a, int b) {
    return a + b;
}

int main() {
    // Type "calc" and press Ctrl+Space
    // You'll see "calculateSum" in suggestions
    // When you select it, it auto-fills: calculateSum(a, b)
    // with placeholders for parameters
    int result = calculateSum(10, 20);
    cout << result << endl;
    return 0;
}
```

**What happens:**
1. Type `calc`
2. Press `Ctrl+Space`
3. See `calculateSum` with signature `int calculateSum(int a, int b)`
4. Select it
5. Editor inserts: `calculateSum(a, b)` with `a` and `b` as tab stops
6. Press `Tab` to jump between parameters

## Example 2: Multiple Functions

```cpp
#include <iostream>
using namespace std;

int add(int x, int y) {
    return x + y;
}

int multiply(int x, int y) {
    return x * y;
}

float divide(float a, float b) {
    return a / b;
}

bool isEven(int num) {
    return num % 2 == 0;
}

int main() {
    // Type "add" - suggests add()
    int sum = add(5, 3);
    
    // Type "mult" - suggests multiply()
    int product = multiply(4, 6);
    
    // Type "div" - suggests divide()
    float quotient = divide(10.0, 3.0);
    
    // Type "isE" - suggests isEven()
    bool even = isEven(42);
    
    cout << "Sum: " << sum << endl;
    cout << "Product: " << product << endl;
    cout << "Quotient: " << quotient << endl;
    cout << "Is even: " << even << endl;
    
    return 0;
}
```

## Example 3: Functions with Different Return Types

```cpp
#include <iostream>
using namespace std;

void printMessage(int count) {
    for (int i = 0; i < count; i++) {
        cout << "Hello!" << endl;
    }
}

double calculateAverage(int a, int b, int c) {
    return (a + b + c) / 3.0;
}

char getGrade(int score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'F';
}

int main() {
    // Type "print" - suggests printMessage(count)
    printMessage(3);
    
    // Type "calc" - suggests calculateAverage(a, b, c)
    double avg = calculateAverage(85, 90, 78);
    
    // Type "getG" - suggests getGrade(score)
    char grade = getGrade(85);
    
    cout << "Average: " << avg << endl;
    cout << "Grade: " << grade << endl;
    
    return 0;
}
```

## Example 4: Complex Parameters

```cpp
#include <iostream>
using namespace std;

int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int numbers[] = {5, 2, 8, 1, 9};
    
    // Type "find" - suggests findMax(arr, size)
    int maximum = findMax(numbers, 5);
    
    int x = 10, y = 20;
    // Type "swap" - suggests swap(a, b)
    swap(&x, &y);
    
    cout << "Max: " << maximum << endl;
    cout << "x: " << x << ", y: " << y << endl;
    
    return 0;
}
```

## Example 5: Recursive Functions

```cpp
#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    // Type "fact" - suggests factorial(n)
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) return n;
    // Type "fib" - suggests fibonacci(n)
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    // Both functions appear in suggestions
    cout << "Factorial of 5: " << factorial(5) << endl;
    cout << "Fibonacci of 7: " << fibonacci(7) << endl;
    return 0;
}
```

## Features of Function Auto-Completion

### ✅ What's Detected:
- Function name
- Return type (int, float, void, etc.)
- Parameter names and types
- Full function signature

### ✅ What You Get:
- Function name in suggestion list
- Function icon (different from variables)
- Full signature in documentation
- Parameter placeholders when inserted
- Tab navigation between parameters

### ✅ Smart Filtering:
- Excludes `main()` function
- Excludes keywords like `if`, `while`, `for`
- Only shows user-defined functions
- Works with functions declared anywhere in the file

## Tips for Best Experience

1. **Descriptive Names**: Use clear function names
   - Good: `calculateTotalPrice()`
   - Bad: `calc()`

2. **Trigger Suggestions**:
   - Type first few letters
   - Press `Ctrl+Space`
   - Or just keep typing

3. **Parameter Navigation**:
   - After inserting function, press `Tab` to jump between parameters
   - Or click to edit specific parameter

4. **View Signature**:
   - Hover over function name in suggestions
   - See full signature in documentation panel

5. **Combined with Variables**:
   - Variables and functions both appear in suggestions
   - Different icons help distinguish them
   - Variables show as 📦, functions show as ƒ

## Keyboard Shortcuts

- `Ctrl+Space` - Trigger suggestions
- `↑` / `↓` - Navigate suggestions
- `Enter` or `Tab` - Accept suggestion
- `Esc` - Close suggestions
- `Tab` - Jump to next parameter placeholder
- `Shift+Tab` - Jump to previous parameter

## Example Workflow

1. **Declare your functions** at the top:
```cpp
int add(int a, int b) { return a + b; }
int multiply(int x, int y) { return x * y; }
```

2. **In main(), start typing**:
```cpp
int main() {
    int result = a  // Press Ctrl+Space here
}
```

3. **See suggestions**:
   - `add(a, b)` - declared function
   - `auto` - keyword
   - Any variables starting with 'a'

4. **Select and use**:
   - Choose `add`
   - Editor inserts: `add(a, b)`
   - Replace `a` with `10`
   - Press `Tab`
   - Replace `b` with `20`
   - Done!

## Try It Yourself!

Copy any example above into the editor and experience:
- Real-time function detection
- Intelligent suggestions
- Parameter placeholders
- Seamless coding experience

Happy coding! 🚀
