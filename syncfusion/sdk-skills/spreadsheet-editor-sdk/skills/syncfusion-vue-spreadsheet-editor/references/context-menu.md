# Context Menu Customization

Customize the right-click context menu by adding, removing, or modifying menu items for different contexts in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :enableContextMenu="true"
    :contextMenuBeforeOpen="onContextMenuBeforeOpen"
    :contextMenuItemSelect="onContextMenuItemSelect"
  >
    <e-sheets>
      <e-sheet :name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

import { closest } from "@syncfusion/ej2-base";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onContextMenuBeforeOpen: function(args) {
    const s = this.$refs.spreadsheet;

    // Right-click on cells
    if (closest(args.event.target, ".e-sheet-content")) {
      s.addContextMenuItems([{ text: "Analyze" }], "Paste", true);

    // Right-click on column header
    } else if (closest(args.event.target, ".e-colhdr-table")) {
      s.removeContextMenuItems(["Copy"]);

    // Right-click on row header
    } else if (closest(args.event.target, ".e-rowhdr-table")) {
      s.enableContextMenuItems(["Cut"], false);
    }
  },
  onContextMenuItemSelect: function(args) {
    if (args.item.text === "Analyze") {
      console.log("Analyzing selected range...");
      // Your custom logic here
    }
  }
  }
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[MENU_TEXT]` | Menu item label | `'Copy'`, `'Analyze'`, `'Format'` |
| `[BEFORE_TEXT]` | Existing menu item name | `'Paste'`, `'Delete'`, `'Insert'` |
| `[TARGET]` | Right-click context | `'.e-sheet-content'`, `'.e-colhdr-table'`, `'.e-rowhdr-table'` |

## Key Methods

### `addContextMenuItems(items, text, insertAfter?)`
Adds items to the context menu at a specific position.

**Parameters**:
- `items` (MenuItemModel[]) — new menu items to add
- `text` (string) — existing menu item name before/after which to insert
- `insertAfter` (boolean, optional) — `true` to insert after, `false` to insert before (default: `true`)

**Returns**: void

```vue
spreadsheet.addContextMenuItems([{
  text: 'My Option'
}], 'Copy', true);  // Add after Copy
```

### `removeContextMenuItems(items, isUniqueId?)`
Removes items from the context menu.

**Parameters**:
- `items` (string[]) — menu item texts to remove
- `isUniqueId` (boolean, optional) — if item names are unique IDs (default: `false`)

**Returns**: void

```vue
spreadsheet.removeContextMenuItems(['Cut', 'Copy']);
```

### `enableContextMenuItems(items, enable, isUniqueId?)`
Enables or disables context menu items.

**Parameters**:
- `items` (string[]) — menu item texts
- `enable` (boolean) — `true` to enable, `false` to disable
- `isUniqueId` (boolean, optional) — if using unique IDs (default: `false`)

**Returns**: void

```vue
spreadsheet.enableContextMenuItems(['Paste'], false);  // Disable Paste
```

## Context Menu Events

### `contextMenuBeforeOpen`
Fires **before** context menu opens. Can customize or cancel.

**Args** (`BeforeOpenCloseMenuEventArgs`):
- `event` (MouseEvent) — right-click event
- `target` (HTMLElement) — element right-clicked
- `cancel` (boolean) — set `true` to prevent menu from opening

```vue
methods: {
  onContextMenuBeforeOpen: function(args) {
    const s = this.$refs.spreadsheet;

    // Right-click on cells
    if (closest(args.event.target, ".e-sheet-content")) {
      s.addContextMenuItems([{ text: "Analyze" }], "Paste", true);

    // Right-click on column header
    } else if (closest(args.event.target, ".e-colhdr-table")) {
      s.removeContextMenuItems(["Copy"]);

    // Right-click on row header
    } else if (closest(args.event.target, ".e-rowhdr-table")) {
      s.enableContextMenuItems(["Cut"], false);
    }
  }
}

```

### `contextMenuItemSelect`
Fires when a context menu item is clicked.

**Args** (`MenuSelectEventArgs`):
- `text` (string) — clicked item text
- `element` (HTMLElement) — clicked element

```vue
methods: {
  onContextMenuItemSelect: function (args) {
    if (args.item.text === "Analyze") {
      console.log("Analyzing selected range...");
      // Your custom logic here
    }
  }
}

```

### `contextMenuBeforeClose`
Fires **before** context menu closes.

**Args** (`BeforeOpenCloseMenuEventArgs`):
- `cancel` (boolean) — set `true` to prevent closing

```vue
methods: {
  onContextMenuBeforeClose: function (args) {
    console.log('Context menu closing');
  }
}
```

## Context Types (Detection)

```vue
import { closest } from "@syncfusion/ej2-base";

methods: {
  onContextMenuBeforeOpen(args) {
    const e = args.event;

    if (closest(e.target, ".e-sheet-content")) {
      console.log("Cell menu");

    } else if (closest(e.target, ".e-colhdr-table")) {
      console.log("Column menu");

    } else if (closest(e.target, ".e-rowhdr-table")) {
      console.log("Row menu");

    } else if (closest(e.target, ".e-toolbar-item")) {
      console.log("Sheet tab menu");
    }
  }
}
```

## Advanced: Conditional Menu Items

```vue
methods: {
  onContextMenuBeforeOpen(args) {
    const s = this.$refs.spreadsheet;
    const sheet = s.getActiveSheet();
    const isProtected = sheet.isProtected;

    if (closest(args.event.target, ".e-sheet-content")) {
      if (isProtected) {
        s.addContextMenuItems([{ text: "Unprotect Sheet" }], "Paste", true);
      }
    }
  },

  onContextMenuItemSelect(args) {
    if (args.text === "Unprotect Sheet") {
      this.$refs.spreadsheet.unprotectSheet();
    }
  }
}
```

## Example: Full Context Menu Customization

```vue
methods: {
  onContextMenuBeforeOpen(args) {
    const s = this.$refs.spreadsheet;
    const t = args.event.target;

    // Cell menu
    if (closest(t, ".e-sheet-content")) {
      s.addContextMenuItems(
        [{ text: "Statistics" }, { text: "Forecast" }],
        "Copy",
        true
      );

      // Disable Format Cells
      s.enableContextMenuItems(["Format Cells"], false);
    }

    // Column menu
    else if (closest(t, ".e-colhdr-table")) {
      s.addContextMenuItems(
        [{ text: "Insert Left" }, { text: "Insert Right" }],
        "Insert Column",
        true
      );
    }

    // Row menu
    else if (closest(t, ".e-rowhdr-table")) {
      s.addContextMenuItems([{ text: "Duplicate Row" }], "Delete", false);
    }
  },

  onContextMenuItemSelect(args) {
    const s = this.$refs.spreadsheet;

    switch (args.item.text) {
      case "Statistics":
        console.log("Show statistics");
        break;

      case "Forecast":
        console.log("Show forecast");
        break;

      case "Insert Left":
        s.insert(undefined, undefined, "Column");
        break;

      case "Duplicate Row":
        console.log("Duplicate row");
        break;
    }
  }
}
```

## Disable Context Menu Entirely

```vue
<ejs-spreadsheet :enableContextMenu="false">
```

## Built-In Context Menu Items

| Location | Default Items |
|----------|---|
| **Cell** | Cut, Copy, Paste Special, Paste, Format Cells, Insert Comments, Edit Comments, Delete Comments, Clear Contents, Clear Formats, Clear All, Delete, Merge Cells, Unmerge Cells, Hyperlink |
| **Column** | Insert Column Before, Insert Column After, Delete Column, Column Width, Optimal Width |
| **Row** | Insert Above, Insert Below, Delete Row, Row Height, Optimal Height, Hide, Unhide |
| **Sheet Tab** | Insert, Delete, Rename, Move, Duplicate, Show, Hide, Protect, Unprotect |

## MenuItemModel Structure

```vue
interface MenuItemModel {
  text: string;               // Menu item label
  id?: string;               // Optional unique ID
  items?: MenuItemModel[];    // Submenu items
  separator?: boolean;       // Separator line
}
```

## Notes

- **Best Practice**: Check context type before adding items (use `closest()`)
- **Best Practice**: Use `contextMenuBeforeOpen` event to customize dynamically
- **Best Practice**: Keep menu items concise and action-oriented
- **Performance**: Avoid heavy operations in `contextMenuBeforeOpen` — runs on every right-click

## Keyboard Alternatives

Users can right-click or press `Shift + F10` to open context menu. Support both for accessibility.
