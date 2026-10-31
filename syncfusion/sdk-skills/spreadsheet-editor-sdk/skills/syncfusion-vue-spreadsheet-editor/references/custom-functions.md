# Custom Functions

Add custom calculation functions to extend the built-in formula engine in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :created="onCreated">
    <e-sheets>
      <e-sheet :name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;

    // Register custom formulas
    s.addCustomFunction(this.doubleHandler, "DOUBLE", "Multiplies value by 2");
    s.addCustomFunction(this.greetHandler, "GREET", "Returns greeting message");
    s.addCustomFunction(this.multiplyHandler, "MULTIPLY", "Multiply three numbers");

    // Use formulas
    s.updateCell({ formula: "=SQRT(16)" }, "A1");
    s.updateCell({ formula: "=DOUBLE(5)" }, "A2");
    s.updateCell({ formula: '=GREET("Alice")' }, "A3");
    s.updateCell({ formula: "=MULTIPLY(2,3,4)" }, "A4");
  },
  doubleHandler(num) {
    return num * 2;
  },
  greetHandler(name) {
    return `Hello, ${name}!`;
  },
  multiplyHandler(a, b, c) {
    return a * b * c;
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[HANDLER_NAME]` | Function name | `'calculateHandler'`, `'convertHandler'` |
| `[FUNCTION_NAME]` | Formula function name (uppercase) | `'SQRT'`, `'DOUBLE'`, `'MULTIPLY'` |
| `[DESCRIPTION]` | User-friendly description | `'Calculates square root'`, `'Converts F to C'` |
| `[PARAM1], [PARAM2]` | Function parameters | `num`, `value`, `celsius` |

## Key Methods

### `addCustomFunction(functionHandler, functionName?, formulaDescription?)`
Registers a custom function for use in formulas.

**Parameters**:
- `functionHandler` (string | Function) — handler function name or reference
- `functionName` (string, optional) — formula function name (default: handler name)
- `formulaDescription` (string, optional) — description for UI

**Returns**: void

```vue
// By function name (string)
spreadsheet.addCustomFunction('MyHandler', 'MYFUNCTION', 'My custom function');

// By function reference (less common)
spreadsheet.addCustomFunction((num: number) => num * 2, 'DOUBLE');
```

## Implementation Patterns

### Simple Single-Parameter Function
```vue
// Add to created event or after initialization
spreadsheet.addCustomFunction(this.inchesToCmHandler, 'INTOCM', 'Convert inches to centimeters');

inchesToCmHandler(inches) {
  return inches * 2.54;
};
// Use in formula
spreadsheet.updateCell({ formula: '=INTOCM(10)' }, 'B1'); // Result: 25.4
```

### Multi-Parameter Function
```vue
spreadsheet.addCustomFunction(this.temperatureHandler, 'FTOC', 'Convert Fahrenheit to Celsius');

temperatureHandler(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
};

spreadsheet.updateCell({ formula: '=FTOC(98.6)' }, 'C1'); // Result: 37
```

### Function with Multiple Inputs
```vue
spreadsheet.addCustomFunction(this.compoundHandler, 'COMPOUND', 'Calculate compound interest');

compoundHandler(principal, rate, time) {
  return principal * Math.pow(1 + rate / 100, time);
};

spreadsheet.updateCell({ value: '=COMPOUND(1000, 5, 2)' }, 'D1'); // Result: 1102.5
```

### Function with Text Output
```vue
spreadsheet.addCustomFunction(this.gradeHandler, 'GRADE', 'Assign letter grade');

gradeHandler(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

spreadsheet.updateCell({ formula: '=GRADE(85)' }, 'E1'); // Result: "B"
```

### Function Referencing Cell Values
```vue
spreadsheet.addCustomFunction(this.sumSquaresHandler, 'SUMSQ', 'Sum of squares of two numbers');

sumSquaresHandler(a, b) {
  return (a * a) + (b * b);
};

spreadsheet.updateCell({ formula: '=SUM(A1:A10)' }, 'A11');
spreadsheet.updateCell({ formula: '=SUMSQ(5, 3)' }, 'A12');
spreadsheet.updateCell({ formula: '=SUMSQ(A11, 10)' }, 'A13');
```

### Function with Array/Range Input (Advanced)
```vue
spreadsheet.addCustomFunction(this.maxDiffHandler, 'MAXDIFF', 'Max difference in range');

maxDiffHandler(range) {
  if (!range || range.length === 0) return 0;
  const max = Math.max(...range);
  const min = Math.min(...range);
  return max - min;
};
```

### Namespace Prefix for Organization
```vue
spreadsheet.addCustomFunction(this.mathAbsHandler, 'MATH_ABS', 'Absolute value');
spreadsheet.addCustomFunction(this.mathPowHandler, 'MATH_POW', 'Power function');
spreadsheet.addCustomFunction(this.mathSqrtHandler, 'MATH_SQRT', 'Square root');

mathAbsHandler(num) { return Math.abs(num); }
mathPowHandler(base, exp) { return Math.pow(base, exp); }
mathSqrtHandler(num) { return Math.sqrt(num); }

spreadsheet.updateCell({ formula: '=MATH_ABS(-5)' }, 'A1');
spreadsheet.updateCell({ formula: '=MATH_POW(2, 3)' }, 'A2');
spreadsheet.updateCell({ formula: '=MATH_SQRT(16)' }, 'A3');
```

### Function with Error Handling
```vue
spreadsheet.addCustomFunction(this.safeDivideHandler, 'SAFEDIV', 'Divide with error handling');

safeDivideHandler(numerator, denominator) {
  if (denominator === 0) return '#DIV/0!';
  return numerator / denominator;
};

spreadsheet.updateCell({ formula: '=SAFEDIV(10, 2)' }, 'B1');
spreadsheet.updateCell({ formula: '=SAFEDIV(10, 0)' }, 'B2');
```

### Function with Conditional Logic
```vue
spreadsheet.addCustomFunction(this.discountHandler, 'DISCOUNT', 'Apply discount based on amount');

discountHandler(amount, tier) {
  let discount = 0;
  if (tier === 1) discount = 0.05;
  else if (tier === 2) discount = 0.10;
  else if (tier === 3) discount = 0.15;
  return amount * (1 - discount);
};

spreadsheet.updateCell({ formula: '=DISCOUNT(100, 2)' }, 'C1');
```

## Advanced: Function Registration at Initialization

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :created="onCreated">
    <e-sheets>
      <e-sheet :name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

mounted() {
  this.sqrtHandler = num => Math.sqrt(num);
  this.cubeHandler = num => num ** 3;
  this.rectAreaHandler = (length, width) => length * width;
},

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;
    // Array of custom functions
    const customFns = [
      { handler: this.sqrtHandler, name: "SQRT", desc: "Square root" },
      { handler: this.cubeHandler, name: "CUBE", desc: "Cube value" },
      { handler: this.rectAreaHandler, name: "RECTAREA", desc: "Rectangle area" }
    ];
    // Register all custom functions
    customFns.forEach(fn => {
      s.addCustomFunction(fn.handler, fn.name, fn.desc);
    });
  }
}
};
</script>
```

## Naming Conventions

| Pattern | Example | Use Case |
|---------|---------|----------|
| Functional | `SQRT`, `CONVERT`, `CALCULATE` | General utilities |
| Namespace | `MATH_ABS`, `TEXT_UPPER`, `DATE_NOW` | Related function groups |
| Domain | `SALES_TAX`, `PAYROLL_TAX`, `DISCOUNT` | Business-specific |
| Prefixed | `CUSTOM_SQRT`, `USER_GRADE` | User-defined vs built-in |

## Notes

- **Best Practice**: Use UPPERCASE for custom function names (follows Excel convention)
- **Best Practice**: Handler functions must be accessible
- **Best Practice**: Use namespace prefixes to avoid conflicts (`CUSTOM_`, `APP_`, `BIZ_`)
- **Best Practice**: Add descriptions to help users understand function purpose
- **Performance**: Custom functions run on the client; avoid heavy computations
- **Limitation**: Array/range parameters may not be supported directly; pass individual cells instead

## Testing Custom Functions
```vue
const result1 = this.sqrtHandler(16);
console.log(`SQRT(16) = ${result1}`);

const result2 = this.doubleHandler(5);
console.log(`DOUBLE(5) = ${result2}`);

// Test via formula in spreadsheet
spreadsheet.updateCell({ formula: '=SQRT(25)' }, 'A1');
spreadsheet.updateCell({ formula: '=DOUBLE(10)' }, 'A2');
```
