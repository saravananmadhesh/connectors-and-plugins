# Notes Feature — Syncfusion React Spreadsheet

The **Notes** feature in the Syncfusion React Spreadsheet allows you to add plain text annotations to cells, useful for comments, feedback, and quick review notes. Notes can be inserted through JSX, UI interactions, or programmatically.

## Overview

- Notes appear as a **red triangle** at the cell's top right corner.
- **Hovering** over the indicator shows the note content.
- Notes support **sticky mode** (`isVisible: true`) and **hidden mode** (`isVisible: false`).
- Notes are **plain text only** (no formatting).
- Notes from Excel files automatically load when opened.

## 1. Enabling Notes

Notes are enabled by default.

```jsx
<SpreadsheetComponent enableNotes={true} />
```

Disable all note features:

```jsx
<SpreadsheetComponent enableNotes={false} />
```

## 2. Adding Notes in JSX (Initialization)

```jsx
<CellDirective
  value="Sports Shoes"
  notes={{
    text: "These shoes have the highest sales this month.",
    isVisible: false
  }}
/>
```

## 3. Adding or Editing Notes Programmatically

```jsx
const spreadsheetRef = useRef(null);

const created = () => {
  const spreadsheet = spreadsheetRef.current;
  if (!ss) return;

  spreadsheet.updateCell(
    { notes: { text: "Review this item before publishing" } },
    "A2"
  );
}
```

## 4. Sticky Notes (Visible Notes)

```jsx
const spreadsheet = spreadsheetRef.current;
spreadsheet.updateCell(
  {
    notes: {
      text: "Important item - check stock regularly",
      isVisible: true
    }
  },
  "B3"
);
```

## 5. Deleting Notes

```jsx
const spreadsheet = spreadsheetRef.current;
spreadsheet.updateCell(
  { notes: null },
  "A1"
);
```

## 6. UI Interactions

### Add Note
- Right click (Context menu) → Add Note
- Ribbon → Review → Notes → Add Note
- Shortcut → Shift + F2

### Edit Note
- Right click (Context menu) → Edit Note
- Ribbon → Review → Notes → Edit Note
- Shortcut → Shift + F2

### Delete Note
- Right click (Context menu) → Delete Note

### Show / Hide Note
- Right click (Context menu) → Show/Hide Note
- Ribbon → Review → Notes → Show/Hide Note

### Show All Notes
- Ribbon → Review → Notes → Show All Notes

### Hover Preview
- Hover over the red triangle to view note content.

## 7. Importing Notes from Excel Files

Notes are automatically loaded when opening excel files.

## 8. Note Model Structure

```jsx
{
  text: string,
  isVisible?: boolean
}
```

## 9. Best Practices

- Keep notes short for clarity.
- Use sticky notes for important items.
- Hidden notes are better for optional hints.
- Notes are plain text only.
- Notes and comments cannot coexist on the same cell.
