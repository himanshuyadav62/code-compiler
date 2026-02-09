# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

### 3. Open Browser
Navigate to: **http://localhost:5173**

---

## 📝 Basic Usage

### Write Code
1. Type C++ code in the left panel
2. Use the default template or create your own

### Run Code
1. Click the **"Run Code"** button
2. View output in the bottom-right panel

### Add Input
1. Type input values in the top-right panel
2. Separate multiple values with spaces

---

## 💾 Template Management

### Save Template
1. Write your code
2. Click **⋮** (three dots)
3. Select **"Save as Template"**
4. Enter a name

### Load Template
1. Click the dropdown menu
2. Select your template
3. Code appears in editor

### Delete Template
1. Select template from dropdown
2. Click **⋮** (three dots)
3. Select **"Delete Template"**

---

## 🎨 UI Features

### Resize Panels
- Drag the vertical divider left/right
- Adjust editor and I/O panel sizes

### Clear Output
- Click **"Clear"** button in output section

### Menu
- Click **⋮** for template actions

---

## 📦 Build Commands

```bash
# Development
pnpm dev          # Start dev server

# Production
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint
```

---

## ✨ Example Code

### Hello World
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

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
**Input:** `5 10`  
**Output:** `Sum: 15`

---

## 🔧 Troubleshooting

**Compiler not loading?**
- Check internet connection
- Refresh the page

**Code not running?**
- Check for syntax errors
- Ensure compiler is ready

**Template not saving?**
- Don't use "default" as name
- Check localStorage is enabled

---

## 📚 More Information

- **README.md** - Full project documentation
- **USAGE.md** - Detailed usage guide
- **ARCHITECTURE.md** - Technical architecture
- **IMPLEMENTATION_SUMMARY.md** - What was built

---

## 🎯 That's It!

You're ready to start coding in C++! 🎉
