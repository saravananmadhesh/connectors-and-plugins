# Custom Functions

Add custom calculation functions to extend the built-in formula engine in the Spreadsheet.

## Key Method

### `addCustomFunction(functionHandler, functionName?, formulaDescription?)`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `functionHandler` | `string \| Function` | ✅ | Function handler name or function reference |
| `functionName` | `string` | ❌ | Formula name used in cells (uppercase) |
| `formulaDescription` | `string` | ❌ | Description shown in formula UI |

**Returns**: `void`

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

// === Local handler functions instead of window ===
const doubleHandler = (num: number): number => num * 2;
const fahrenheitHandler = (f: number): number => (f - 32) * (5 / 9);
const gradeHandler = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

const spreadsheet = new Spreadsheet({
    sheets: [{ name: 'Sheet1' }],
    created: (): void => {
        // Register custom functions
        spreadsheet.addCustomFunction(doubleHandler, 'DOUBLE', 'Multiplies value by 2');
        spreadsheet.addCustomFunction(fahrenheitHandler, 'FTOC', 'Fahrenheit to Celsius');
        spreadsheet.addCustomFunction(gradeHandler, 'GRADE', 'Returns letter grade');

        // Use in cells
        spreadsheet.updateCell({ value: '=DOUBLE(5)' }, 'A1');      // 10
        spreadsheet.updateCell({ value: '=FTOC(98.6)' }, 'A2');     // 37
        spreadsheet.updateCell({ value: '=GRADE(85)' }, 'A3');      // "B"
    }
});
spreadsheet.appendTo('#spreadsheet');
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[HANDLER_NAME]` | Function name | `'doubleHandler'`, `'gradeHandler'` |
| `[FUNCTION_NAME]` | Formula name used in cells (uppercase) | `'DOUBLE'`, `'FTOC'`, `'GRADE'` |
| `[DESCRIPTION]` | User-friendly description | `'Multiplies value by 2'` |

## Notes

- Handler functions should be accessible where `addCustomFunction()` is called
- Function names must be uppercase and unique - cannot override built-ins like `SUM`, `AVERAGE`
- Register in the `created` event to ensure spreadsheet is ready
- Custom functions do not persist across page reloads unless re-registered