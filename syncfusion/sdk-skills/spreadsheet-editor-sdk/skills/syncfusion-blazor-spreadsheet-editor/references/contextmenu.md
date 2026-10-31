## Context Menu
> Display context-sensitive options when right-clicking on cells, rows, columns, and sheet tabs to perform operations like cut, copy, paste, insert, delete, and more.

### PROPERTY
```csharp
EnableContextMenu="true(Default)/false"
```

### EVENTS
```csharp
ContextMenuOpening="OnContextMenuOpening"
ContextMenuClosing="OnContextMenuClosing"
```

```csharp
private void OnContextMenuOpening(ContextMenuOpenCloseEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ContextMenuOpening Event Arguments**
| Event Arguments | Description |
|---|---|
| `Items` | The collection of context menu items that will be displayed. You can add, remove, hide, or disable items to customize the menu before it is rendered. |
| `ParentItem` | The parent menu item when the popup represents a submenu; otherwise, the root menu item. |
| `Container` | The DOM container element of the context menu popup being opened. |
| `ScrollHeight` | The scroll height of the context menu container, useful for positioning calculations. |
| `Position` | The pointer position (X and Y coordinates) at which the context menu is being opened. |
| `Cancel` | Set to `true` to prevent the context menu from opening. |

```csharp
private void OnContextMenuClosing(ContextMenuOpenCloseEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ContextMenuClosing Event Arguments**
| Event Arguments | Description |
|---|---|
| `Items` | The collection of context menu items currently displayed. Available for inspection before the menu closes. |
| `ParentItem` | The parent menu item when the popup represents a submenu; otherwise, the root menu item. |
| `Container` | The DOM container element of the context menu popup being closed. |
| `ScrollHeight` | The scroll height of the context menu container, useful for positioning calculations. |
| `Position` | The pointer position (X and Y coordinates) at which the context menu is currently displayed. |
| `Cancel` | Set to `true` to prevent the context menu from closing. |

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Enables the specified context menu items by display text or ID.
// Invalid or non-existent identifiers are ignored.
SpreadsheetRef.EnableContextMenuItems(List<string> ITEMS)

// Disables the specified context menu items by display text or ID.
SpreadsheetRef.DisableContextMenuItems(List<string> ITEMS)

// Removes the specified context menu items from the current instance by display text or ID.
SpreadsheetRef.RemoveContextMenuItems(List<string> ITEMS)

```
### API Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `ITEMS` | A collection of context menu item IDs to enable | new List<string> { "spreadsheet_cmenu_Copy" } |

### Features Accessible via Context Menu

**Cell Context Menu**
- Cut, Copy, Paste
- Hyperlink creation
- Sort operations
- Clear Contents
- Filter operations

**Row Header Context Menu**
- Cut, Copy, Paste
- Insert Rows Above / Below

**Column Header Context Menu**
- Cut, Copy, Paste
- Insert Column to the Left / Right

**Sheet Tab Context Menu**
- Insert, Delete, Duplicate
- Rename, Protect/Unprotect Sheet
- Move Left / Right
- Hide Sheet

### Related Properties that Control Context Menu Options

| Property | Default | Effect when set to "false" |
|---|---|---|
| `EnableClipboard` | true | Removes Cut, Copy, Paste from all context menus |
| `AllowSorting` | true | Removes Sort option from context menus |
| `AllowFiltering` | true | Removes Filter option from context menus |
| `AllowHyperlink` | true | Removes Hyperlink options from context menus |

### When Context Menu is Disabled

When `EnableContextMenu` is set to **false**, the following features become unavailable through the UI:
- Quick access to Cut, Copy, Paste operations
- Fast row/column insertion via header context menu
- Quick sheet management (insert, delete, rename, move)
- Filter and Sort quick options
- Hyperlink creation shortcuts

**Note:** These operations may still be available through the ribbon menu, toolbar buttons, or API methods, depending on the Spreadsheet configuration.

### Sheet Protection Impact on Context Menu

When a sheet is protected:
- **Cut**, **Paste**, **Clear Contents** are restricted to unlocked cells only
- **Insert Rows/Columns** options are available only if explicitly enabled in protection settings
- **Hyperlink**, **Sort**, **Filter** options are available only if explicitly enabled in protection settings

When a workbook is protected:
- Only **Protect Sheet** / **Unprotect Sheet** option remains active
- All other sheet tab options (**Insert**, **Delete**, **Rename**, **Move**, **Hide**, **Duplicate**) are disabled

### Notes
- **EnableContextMenu** is enabled by default; include `EnableContextMenu="false"` only when you want to **disable** context menu for the sheet.
- **When using the API methods** `EnableContextMenuItems`, `DisableContextMenuItems`, or `RemoveContextMenuItems`, ensure the `SfSpreadsheet` component includes `ID="spreadsheet"` so the APIs can target the correct instance.
- **ContextMenuOpening** event fires *before* the context menu popup is displayed and can be used to customize the menu items (add, remove, hide, or disable) or cancel the menu from opening.
- **ContextMenuClosing** event fires *before* the context menu popup closes and can be used to inspect the displayed menu items or cancel the menu from closing.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.
- Clipboard, sorting, filtering, and hyperlink features can be independently controlled via their respective properties.

### Documentation link
[Blazor Spreadsheet Context Menu](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/contextmenu)