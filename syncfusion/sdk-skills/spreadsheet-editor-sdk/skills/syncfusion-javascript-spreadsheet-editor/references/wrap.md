# Wrap Text API Reference

## Overview

The `wrap()` method wraps or unwraps text content of cells in the Spreadsheet. Long text will display as multiple lines within a cell without expanding the column width.

**API Documentation**: https://ej2.syncfusion.com/documentation/api/spreadsheet/index-default#wrap

## Method Signature

```typescript
wrap(address: string, wrap: boolean = true): void
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `address` | string | — | Cell address to wrap. Supports single cell (e.g., `'B5'`), range (e.g., `'A1:D10'`), or entire column (e.g., `'C:C'`) |
| `wrap` | boolean | `true` | `true` to enable wrapping; `false` to disable |

## Return Value

`void`

## Examples

### Single Cell

```typescript
spreadsheet.wrap('B5', true);   // enable
spreadsheet.wrap('B5', false);  // disable
```

### Range of Cells

```typescript
spreadsheet.wrap('A1:D10', true);
```

### Entire Column

```typescript
spreadsheet.wrap('C:C', true);
```

### Based on User Input

```typescript
const address = document.getElementById('addressInput').value;
const enable = document.getElementById('wrapCheckbox').checked;
spreadsheet.wrap(address, enable);
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CELL_ADDRESS]` | Address of the cell to wrap | `'B5'`, `'A1:D10'`, `'C:C'` |
| `[ENABLE]` | Wrap boolean value | `true`, `false` |

## Notes

- Address parameter is case-insensitive (`'b5'` and `'B5'` are equivalent)
- Applies immediately without requiring a refresh
- Works with all cell alignments and formatting
- Text wrapping is preserved when copying cells