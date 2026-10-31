# Custom Functions

Add custom calculation functions to extend the built-in formula engine in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Sheet1").Add();
    }).Render()

<script>
    // === Define the handler functions ===
    function doubleHandler(num) {
        return num * 2;
    }

    function greetHandler(name) {
        return "Hello, " + name + "!";
    }

    function multiplyHandler(a, b, c) {
        return a * b * c;
    }

    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Register custom functions ===
        spreadsheet.addCustomFunction(doubleHandler, 'DOUBLE', 'Multiplies value by 2');
        spreadsheet.addCustomFunction(greetHandler, 'GREET', 'Returns greeting message');
        spreadsheet.addCustomFunction(multiplyHandler, 'MULTIPLY', 'Multiply three numbers');

        // === Use custom functions in formulas ===
        spreadsheet.updateCell({ formula: '=SQRT(16)' }, 'A1');            // 4
        spreadsheet.updateCell({ formula: '=DOUBLE(5)' }, 'A2');           // 10
        spreadsheet.updateCell({ formula: '=GREET("Alice")' }, 'A3');      // Hello, Alice!
        spreadsheet.updateCell({ formula: '=MULTIPLY(2, 3, 4)' }, 'A4');   // 24
    }
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
- `functionHandler` (string | Function) - handler function name or reference
- `functionName` (string, optional) - formula function name (default: handler name)
- `formulaDescription` (string, optional) - description for UI

**Returns**: void

```cshtml
// By function name (string)
spreadsheet.addCustomFunction('MyHandler', 'MYFUNCTION', 'My custom function');
```

## Implementation Patterns

### Simple Single-Parameter Function
```cshtml
// Add to created event or after initialization
spreadsheet.addCustomFunction(inchesToCmHandler, 'INTOCM', 'Convert inches to centimeters');

function inchesToCmHandler(inches) {
  return inches * 2.54;
}

// Use in formula
spreadsheet.updateCell({ formula: '=INTOCM(10)' }, 'B1'); // Result: 25.4
```

### Multi-Parameter Function
```cshtml
spreadsheet.addCustomFunction(temperatureHandler, 'FTOC', 'Convert Fahrenheit to Celsius');

function temperatureHandler(fahrenheit) {
  return (fahrenheit - 32) * (5 / 9);
}

spreadsheet.updateCell({ formula: '=FTOC(98.6)' }, 'C1'); // Result: 37
```

## Notes
- Handler functions must be accessible when passed to `addCustomFunction()`
- Use namespace prefixes to avoid conflicts (`CUSTOM_`, `APP_`, `BIZ_`)
- Custom functions are stored at the workbook level - won't persist across page reloads.
- Function names must be unique (even from built-in functions like SUM, AVERAGE)
- Custom functions run on the client; avoid heavy computations
- Array/range parameters may not be supported directly; pass individual cells instead