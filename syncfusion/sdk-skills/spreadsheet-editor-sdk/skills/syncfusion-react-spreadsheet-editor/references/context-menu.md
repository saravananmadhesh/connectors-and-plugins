# Context Menu Customization — Syncfusion React Spreadsheet (React Version)

The Syncfusion **React Spreadsheet** provides a customizable right‑click context menu. You can dynamically add, remove, enable, or disable menu items based on where the user right‑clicks (cell, row header, column header, or sheet tab).


## 1. Minimal React Example

```jsx
import * as React from "react";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective
} from "@syncfusion/ej2-react-spreadsheet";
import { closest } from "@syncfusion/ej2-base";

export default function App() {
  const spreadsheetRef = useRef(null);

  const contextMenuBeforeOpen = (args) => {
    const spreadsheet = spreadsheetRef.current;
    const target = args.event.target;

    if (closest(target, ".e-sheet-content")) {
      spreadsheet.addContextMenuItems([{ text: "Analyze" }], "Paste", true);
    } else if (closest(target, ".e-colhdr-table")) {
      spreadsheet.removeContextMenuItems(["Copy"]);
    } else if (closest(target, ".e-rowhdr-table")) {
      spreadsheet.addContextMenuItems([{ text: "Hide Row" }], "Delete", false);
    } else if (closest(target, ".e-toolbar-item")) {
      spreadsheet.enableContextMenuItems(["Delete"], false);
    }
  };

  const contextMenuItemSelect = (args) => {
    if (args.text === "Analyze") {
      console.log("Analyzing selected range...");
    }
  };

  return (
    <SpreadsheetComponent
      ref={spreadsheetRef}
      enableContextMenu={true}
      contextMenuBeforeOpen={contextMenuBeforeOpen}
      contextMenuItemSelect={contextMenuItemSelect}
    >
      <SheetsDirective>
        <SheetDirective name="Sheet1" />
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
```
---

## 2. Placeholders

| Placeholder | Description | Example |
|------------|-------------|---------|
| `[MENU_TEXT]` | New menu item text | `'Analyze'`, `'Duplicate Row'` |
| `[BEFORE_TEXT]` | Insert before/after this item | `'Paste'`, `'Delete'` |
| `[TARGET]` | Right‑click context selector | `'.e-sheet-content'`, `'.e-rowhdr-table'` |

## 3. Key API Methods

### 3.1 `addContextMenuItems(items, text, insertAfter?)`

```jsx
spreadsheet.addContextMenuItems([{ text: "My Option" }], "Copy", true);
```

### 3.2 `removeContextMenuItems(items, isUniqueId?)`

```jsx
spreadsheet.removeContextMenuItems(["Cut", "Copy"]);
```

### 3.3 `enableContextMenuItems(items, enable, isUniqueId?)`

```jsx
spreadsheet.enableContextMenuItems(["Paste"], false);
```

## 4. Events

### 4.1 `contextMenuBeforeOpen`

```jsx
const contextMenuBeforeOpen = (args) => {
  if (closest(args.event.target, ".e-toolbar-item")) {
    args.cancel = true;
  }
};
```

### 4.2 `contextMenuItemSelect`

```jsx
const contextMenuItemSelect = (args) => {
  console.log("Selected:", args.text);
};
```

### 4.3 `contextMenuBeforeClose`

```jsx
const contextMenuBeforeClose = (args) => {
  console.log("Menu closing...");
};
```

---

## 5. Detecting Context in contextMenuBeforeOpen event

```jsx
if (closest(target, ".e-sheet-content")) {
  console.log("Cell menu");
} else if (closest(target, ".e-colhdr-table")) {
  console.log("Column header");
} else if (closest(target, ".e-rowhdr-table")) {
  console.log("Row header");
} else if (closest(target, ".e-toolbar-item")) {
  console.log("Sheet tab menu");
}
```
---

## 6. Conditional Menu Items Example

```jsx
const contextMenuBeforeOpen = (args) => {
  const spreadsheet = spreadsheetRef.current;
  const sheet = spreadsheet.getActiveSheet();

  if (closest(args.event.target, ".e-sheet-content")) {
    if (sheet.isProtected) {
      spreadsheet.addContextMenuItems([{ text: "Unprotect Sheet" }], "Paste", true);
    }
  }
};

const contextMenuItemSelect = (args) => {
  if (args.text === "Unprotect Sheet") {
    spreadsheet.unprotectSheet();
  }
};
```
---

## 7. Full Customization Example

```jsx
const contextMenuBeforeOpen = (args) => {
  const spreadsheet = spreadsheetRef.current;
  const target = args.event.target;

  if (closest(target, ".e-sheet-content")) {
    spreadsheet.addContextMenuItems([{ text: "Statistics" }, { text: "Forecast" }], "Copy", true);
    spreadsheet.enableContextMenuItems(["Format Cells"], false);
  }

  if (closest(target, ".e-colhdr-table")) {
    spreadsheet.addContextMenuItems([{ text: "Insert Left" }, { text: "Insert Right" }], "Insert Column", true);
  }

  if (closest(target, ".e-rowhdr-table")) {
    spreadsheet.addContextMenuItems([{ text: "Duplicate Row" }], "Delete", false);
  }
};

const contextMenuItemSelect = (args) => {
  switch (args.text) {
    case "Statistics":
      console.log("Show stats");
      break;
    case "Insert Left":
      spreadsheet.insert(undefined, undefined, "Column");
      break;
    case "Duplicate Row":
      console.log("Duplicate row");
      break;
  }
};
```

## 8. Disable Context Menu Entirely

```jsx
<SpreadsheetComponent enableContextMenu={false} />
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

```tsx
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

