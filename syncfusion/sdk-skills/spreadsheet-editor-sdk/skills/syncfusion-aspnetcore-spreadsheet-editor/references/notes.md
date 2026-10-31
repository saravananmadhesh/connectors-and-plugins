# Notes Feature — Syncfusion ASP.NET Core Spreadsheet

The **Notes** feature in the Syncfusion ASP.NET Core Spreadsheet allows you to add plain text annotations to cells, useful for comments, feedback, and quick review notes. Notes can be inserted through UI interactions or programmatically.

## Overview

- Notes appear as a **red triangle** at the cell's top right corner.
- **Hovering** over the indicator shows the note content.
- Notes support **sticky mode** (`isVisible: true`) and **hidden mode** (`isVisible: false`).
- Notes are **plain text only** (no formatting).
- Notes from Excel files automatically load when opened.

## 1. Enabling Notes

Notes are enabled by default.

```cshtml
<ejs-spreadsheet id="spreadsheet" enableNotes="true"></ejs-spreadsheet>
```

Disable all note features:

```cshtml
<ejs-spreadsheet id="spreadsheet" enableNotes="false"></ejs-spreadsheet>
```

## 2. Adding or Editing Notes Programmatically

```cshtml
@section Scripts {
    <script>
        function created() {
            var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
            spreadsheet.updateCell(
                { notes: { text: "Review this item before publishing" } },
                "A2"
            );
        }
    </script>
}

```

## 3. Sticky Notes (Visible Notes)

```cshtml
<script>
    var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
    spreadsheet.updateCell(
        {
            notes: {
                text: "Important item - check stock regularly",
                isVisible: true
            }
        },
        "B3"
    );
</script>

```

## 4. Deleting Notes

```cshtml
<script>
    var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
    spreadsheet.updateCell(
        { notes: null },
        "A1"
    );
</script>
```

## 5. UI Interactions

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

## 6. Importing Notes from Excel Files

Notes are automatically loaded when opening excel files.

## 7. Note Model Structure

```cshtml
{
  text: string,
  isVisible?: boolean
}
```

## 8. Best Practices

- Keep notes short for clarity.
- Use sticky notes for important items.
- Hidden notes are better for optional hints.
- Notes are plain text only.
- Notes and comments cannot coexist on the same cell.
