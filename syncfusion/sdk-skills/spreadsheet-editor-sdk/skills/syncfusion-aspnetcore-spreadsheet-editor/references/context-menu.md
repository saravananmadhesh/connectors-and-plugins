# Context Menu Customization — Syncfusion ASP.NET Core Spreadsheet

The Syncfusion **ASP.NET Core Spreadsheet** provides a customizable right‑click context menu. You can dynamically add, remove, enable, or disable menu items based on where the user right‑clicks (cell, row header, column header, or sheet tab).

## 1. Minimal Code

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@section ControlsSection{
    <div class="control-section">
        <ejs-spreadsheet id="spreadsheet" enableContextMenu="true" 
                         contextMenuBeforeOpen="contextMenuBeforeOpenHandler" 
                         contextMenuItemSelect="contextMenuItemSelectHandler">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
}

<script>
    function contextMenuBeforeOpenHandler(args) {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // Check where right-click occurred
        if (ej.base.closest(args.event.target, '.e-sheet-content')) {
            // Right-click on cell
            spreadsheet.addContextMenuItems([{ text: 'Analyze' }], 'Paste', true);

        } else if (ej.base.closest(args.event.target, '.e-colhdr-table')) {
            // Right-click on column header
            spreadsheet.removeContextMenuItems(['Copy']);

        } else if (ej.base.closest(args.event.target, '.e-rowhdr-table')) {
            // Right-click on row header
            spreadsheet.addContextMenuItems([{ text: 'Hide Row' }], 'Delete', false);
        }
    }

    function contextMenuItemSelectHandler(args) {
        if (args.text === 'Analyze') {
            console.log('Analyzing selected range...');
            // Custom logic here
        }
    }
</script>

```

## 2. Placeholders

| Placeholder | Description | Example |
|------------|-------------|---------|
| `[MENU_TEXT]` | New menu item text | `'Analyze'`, `'Duplicate Row'` |
| `[BEFORE_TEXT]` | Insert before/after this item | `'Paste'`, `'Delete'` |
| `[TARGET]` | Right‑click context selector | `'.e-sheet-content'`, `'.e-rowhdr-table'` |

## 3. Key API Methods

### 3.1 `addContextMenuItems(items, text, insertAfter?)`

```cshtml
spreadsheet.addContextMenuItems([{ text: "My Option" }], "Copy", true);
```

### 3.2 `removeContextMenuItems(items, isUniqueId?)`

```cshtml
spreadsheet.removeContextMenuItems(["Cut", "Copy"]);
```

### 3.3 `enableContextMenuItems(items, enable, isUniqueId?)`

```cshtml
spreadsheet.enableContextMenuItems(["Paste"], false);
```

## 4. Events

### 4.1 `contextMenuBeforeOpen`

```cshtml
const contextMenuBeforeOpen = (args) => {
  if (closest(args.event.target, ".e-toolbar-item")) {
    args.cancel = true;
  }
};
```

### 4.2 `contextMenuItemSelect`

```cshtml
const contextMenuItemSelect = (args) => {
  console.log("Selected:", args.text);
};
```

### 4.3 `contextMenuBeforeClose`

```cshtml
const contextMenuBeforeClose = (args) => {
  console.log("Menu closing...");
};
```

---
## 5. Detecting Context in contextMenuBeforeOpen event

```typescript
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@section ControlsSection{
    <div class="control-section">
        <ejs-spreadsheet id="spreadsheet" enableContextMenu="true"
                         contextMenuBeforeOpen="contextMenuBeforeOpenHandler">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1"></e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
}

<script>
    function contextMenuBeforeOpenHandler(args) {
        var event = args.event;

        if (ej.base.closest(event.target, '.e-sheet-content')) {
            // Cell right-click
            console.log('Cell menu');
        }
        else if (ej.base.closest(event.target, '.e-colhdr-table')) {
            // Column header right-click
            console.log('Column header menu');
        }
        else if (ej.base.closest(event.target, '.e-rowhdr-table')) {
            // Row header right-click
            console.log('Row header menu');
        }
        else if (ej.base.closest(event.target, '.e-toolbar-item')) {
            // Sheet tab right-click
            console.log('Sheet tab menu');
        }
    }
</script>

```

## 6. Conditional Menu Items Example

```typescript
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@section ControlsSection{
    <div class="control-section">
        <ejs-spreadsheet id="spreadsheet" enableContextMenu="true"
                         contextMenuBeforeOpen="contextMenuBeforeOpenHandler"
                         contextMenuItemSelect="contextMenuItemSelectHandler">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1"></e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
}

<script>
    function contextMenuBeforeOpenHandler(args) {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        var sheet = spreadsheet.getActiveSheet();
        var isSheetProtected = sheet.isProtected;

        // For cells
        if (ej.base.closest(args.event.target, '.e-sheet-content')) {
            if (isSheetProtected) {
                // Add item only when sheet is protected
                spreadsheet.addContextMenuItems([{ text: 'Unprotect Sheet' }], 'Paste', true);
            }
        }
    }

    function contextMenuItemSelectHandler(args) {
        if (args.text === 'Unprotect Sheet') {
            spreadsheet.unprotectSheet();
        }
    }
</script>

```

## 7. Full Customization Example

```typescript

<script>
    function contextMenuBeforeOpenHandler(args) {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        var event = args.event;

        // For cells
        if (ej.base.closest(event.target, '.e-sheet-content')) {
            spreadsheet.addContextMenuItems([
                { text: 'Statistics' },
                { text: 'Forecast' }
            ], 'Copy', true);

            // Disable default Format Cells for read-only
            spreadsheet.enableContextMenuItems(['Format Cells'], false);
        }

        // For columns
        else if (ej.base.closest(event.target, '.e-colhdr-table')) {
            spreadsheet.addContextMenuItems([
                { text: 'Insert Left' },
                { text: 'Insert Right' }
            ], 'Insert Column', true);
        }

        // For rows
        else if (ej.base.closest(event.target, '.e-rowhdr-table')) {
            spreadsheet.addContextMenuItems([
                { text: 'Duplicate Row' }
            ], 'Delete', false);
        }
    }

    function contextMenuItemSelectHandler(args) {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        var sheet = spreadsheet.getActiveSheet();

        switch (args.text) {
            case 'Statistics':
                console.log('Show statistics for selection');
                break;
            case 'Insert Left':
                spreadsheet.insert(undefined, undefined, 'Column');
                break;
            case 'Duplicate Row':
                console.log('Duplicate row');
                // Custom row duplication logic here
                break;
        }
    }
</script>

```

## 8. Disable Context Menu Entirely

```cshtml
<ejs-spreadsheet id="spreadsheet" enableContextMenu="false"></ejs-spreadsheet>
```

## 9. Built‑In Context Menu Items

### Cell Menu
Cut, Copy, Paste, Paste Special, Filter, Sort, Hyperlink, Clear, Delete, Insert, Merge/Unmerge, Comments

### Column Header Menu
Insert Column, Delete Column, Hide/Unhide Column, Column Width

### Row Header Menu
Insert Row, Delete Row, Hide/Unhide Row, Row Height

### Sheet Tab Menu
Insert Sheet, Delete Sheet, Rename, Move, Duplicate, Hide/Unhide, Protect/Unprotect

## 10. MenuItemModel Structure

```cshtml
interface MenuItemModel {
  text: string;
  id?: string;
  items?: MenuItemModel[];
  separator?: boolean;
}
```

## 11. Notes

- Always check context using `closest()`.
- Custom menu items must be re-added inside `contextMenuBeforeOpen`.
- Avoid heavy computations inside the event.
- Support keyboard context menu with **Shift + F10**.
