# Clipboard Operations

Copy, cut, and paste cells with values, formatting, and formulas in the Spreadsheet.

## API Reference

| Method | Signature | Returns |
|---|---|---|
| `copy` | `copy(address?: string)` | `Promise<Object>` |
| `cut` | `cut(address?: string)` | `Promise<Object>` |
| `paste` | `paste(address?: string, type?: PasteSpecialType)` | `void` |

## Paste Types

| Type | Description |
|---|---|
| `'All'` | Values + formatting (default) |
| `'Values'` | Cell values only; formulas become static values |
| `'Formats'` | Formatting only; data unchanged |

## Minimal Code

```typescript
// Copy
spreadsheet.copy();              // copy selected range
spreadsheet.copy('A1:B2');       // copy specific range

// Cut
spreadsheet.cut();               // cut selected range
spreadsheet.cut('A1:B2');        // cut specific range

// Paste
spreadsheet.paste();                       // paste All to active cell
spreadsheet.paste('D1');                   // paste All to specific cell
spreadsheet.paste('D1', 'Values');         // paste values only
spreadsheet.paste('D1', 'Formats');        // paste formatting only
```

## Examples

### Copy and Paste Values Only
```typescript
spreadsheet.copy('A1:D10');
spreadsheet.paste('F1', 'Values');
```

### Cut and Move Cells
```typescript
spreadsheet.cut('A1:C5');
spreadsheet.paste('G1');         // source cells cleared after paste
```

### Paste Formatting Only
```typescript
spreadsheet.copy('A1:D1');
spreadsheet.paste('A2', 'Formats');  // data in A2 unchanged; formatting applied
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[SOURCE_RANGE]` | Cell or range to copy/cut | `'A1'`, `'A1:D10'`, `'Sheet1!B2'` |
| `[DEST_CELL]` | Paste destination | `'D1'`, `'E5'` |
| `[PASTE_TYPE]` | Type of paste | `'All'`, `'Values'`, `'Formats'` |

## Notes

- `cut()` + `paste()` clears source cells; use `copy()` to preserve original
- Relative formula references update on paste; absolute references (`$A$1`) stay fixed
- Keyboard: `Ctrl+C` copy, `Ctrl+X` cut, `Ctrl+V` paste, `Esc` cancel