# Merge & Unmerge Cells

Merge cells into a single larger cell and split them back in the Syncfusion EJ2 Spreadsheet.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  allowMerge: true,
  sheets: [{ name: 'Sheet1' }]
});

spreadsheet.appendTo('#spreadsheet');

// === Merge all cells in range (default) ===
spreadsheet.merge('A1:C1');

// === Merge Horizontally (row-wise) ===
spreadsheet.merge('A1:C3', 'Horizontally');

// === Merge Vertically (column-wise) ===
spreadsheet.merge('A1:C3', 'Vertically');

// === Unmerge cells ===
spreadsheet.unMerge('A1:C1');
```

## Placeholders

### `merge(range, type)`

| Placeholder | Description | Example |
|---|---|---|
| `range` | Cell range to merge | `'A1:C1'`, `'A1:C3'`, `'B2:D5'` |
| `type` | Merge direction — `'All'`, `'Horizontally'`, `'Vertically'` (default: `'All'`) | `'All'` |

### `unMerge(range)`

| Placeholder | Description | Example |
|---|---|---|
| `range` | Merged range to split back | `'A1:C1'`, `'B2:D5'` |

### MergeType

| Value | Description |
|---|---|
| `'All'` | Merge all cells in the provided range into one |
| `'Horizontally'` | Merge cells row-wise (each row merged independently) |
| `'Vertically'` | Merge cells column-wise (each column merged independently) |

---

## Notes

- **Required**: Set `allowMerge: true` on the Spreadsheet instance
- **Value Retention**: Only the **top-left** cell value is kept after merge; other cell values are discarded
- **Unmerge**: After `unMerge()`, the top-left cell retains the value; other cells are left empty
- **Formulas**: References to a merged cell use the top-left address (e.g., `A1`)
- **Best Practice**: Use merge for headers and labels, not for core data cells
- **Caution**: Always `unMerge()` before writing individual cell data to avoid data loss