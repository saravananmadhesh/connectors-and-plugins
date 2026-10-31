# Scrolling & Virtualization

Configure scrolling behavior and virtualization for large datasets in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Sheet1',
    ranges: [{ dataSource: largeDataset }],
    frozenRows: 1,
    frozenColumns: 1
  }],
  scrollSettings: {
    isFinite: false,
    enableVirtualization: true
  }
});
spreadsheet.appendTo('#spreadsheet');

// Navigate to a specific cell
spreadsheet.goTo('A500000');

// Navigate to a cell in another sheet
spreadsheet.goTo('Sheet2!B1000');
```

## API

### `scrollSettings`

| Property | Type | Default | Description |
|---|---|---|---|
| `isFinite` | `boolean` | `false` | `true` bounds scrolling to data range; `false` allows infinite scrolling |
| `enableVirtualization` | `boolean` | `true` | Renders only visible cells for large datasets |

### `goTo(cellAddress)`

| Parameter | Type | Description |
|---|---|---|
| `cellAddress` | `string` | Cell address in A1 notation e.g. `'A100'`, `'Sheet2!B50'` |

### Sheet-level Scroll Properties

| Property | Type | Description |
|---|---|---|
| `frozenRows` | `number` | Number of rows to freeze from the top |
| `frozenColumns` | `number` | Number of columns to freeze from the left |

## Notes

- `enableVirtualization: true` is recommended for datasets > 10,000 rows
- `isFinite: false` allows scrolling beyond the data range
- Frozen rows/columns stay fixed during scroll; virtual scrolling applies only to non-frozen area
- Container must have an explicit height set for virtualization to work correctly