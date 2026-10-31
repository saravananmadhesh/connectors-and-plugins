# Notes

Add notes to cells for feedback, remarks, and quick comments.

## Minimal Code

```typescript
const spreadsheet = new Spreadsheet({
  enableNotes: true,
  sheets: [{
    rows: [{
      cells: [{
        value: 'Sports Shoes',
        notes: { text: 'Highest sales this month.', isVisible: false }
      }]
    }]
  }]
});

spreadsheet.appendTo('#spreadsheet');
```

## Add / Edit / Delete Note

```typescript
// Add or Edit
spreadsheet.updateCell({ notes: { text: 'Review this item.', isVisible: false } }, 'A1');

// Delete
spreadsheet.updateCell({ notes: undefined }, 'A1');
```

## Show / Hide Note

```typescript
spreadsheet.updateCell({ notes: { text: 'Existing note', isVisible: true } }, 'A1');  // Show
spreadsheet.updateCell({ notes: { text: 'Existing note', isVisible: false } }, 'A1'); // Hide
```

## Note Model

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Note content (plain text only) |
| `isVisible` | `boolean` | `false` | `true` = sticky note, `false` = red triangle |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Shift + F2 | Add / Edit note |
| Right-click | Add / Edit / Delete / Show/Hide |

## Export Support

| Format | Notes Preserved |
|---|---|
| XLSX / XLS | ✅ Yes |
| CSV / PDF | ❌ No |

## Notes
- Plain text only — no rich formatting
- Notes and Comments **cannot coexist** on the same cell
- Use `isVisible: true` for critical notes, `false` for hints