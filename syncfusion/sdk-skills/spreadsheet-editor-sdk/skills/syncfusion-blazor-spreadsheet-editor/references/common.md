## Component Configuration

> Configure the Spreadsheet component's basic layout properties and appearance.

### PROPERTIES
```csharp
Height="auto(Default)/CSS height value"
Width="auto(Default)/CSS width value"
ID="Unique component ID"
CssClass="CSS class names"
ActiveSheetIndex="0(Default)/valid sheet index"
AllowImage="true(Default)/false"
AllowInsert="true(Default)/false"
AllowDelete="true(Default)/false"
EnableKeyboardNavigation="true(Default)/false"
EnableKeyboardShortcut="true(Default)/false"
```

### EVENTS
```csharp
Created="OnCreated"
ActionBeginning="OnActionBeginning"
ActionCompleted="OnActionCompleted"
ActionFailed="OnActionFailed"
```

```csharp
private void OnCreated(object args)
{
    // customize your code based on the requirements
}
```
**Created Event Arguments**
| Event Arguments | Description |
|---|---|
| `args` | The event argument payload supplied when the Spreadsheet component has finished initialization. The event is raised as `EventCallback<object>`, so the argument type is `object` and is typically `null` or unused. |

```csharp
private void OnActionBeginning(ActionBeginningEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ActionBeginning Event Arguments**
| Event Arguments | Description |
|---|---|
| `Action` | The name of the Spreadsheet action that is about to be performed (e.g., `Edit`, `Cut`, `Copy`, `Paste`, `Delete`, `Sort`, `Filter`, `Open`, `Save`, `Undo`, `Redo`). |
| `Range` | The selected range associated with the action in A1 notation with sheet name (e.g., `Sheet1!A1:B10`). |
| `SheetName` | The name of the worksheet on which the action will be performed. |
| `Cancel` | Set to `true` to cancel the action before it executes. |

```csharp
private void OnActionCompleted(ActionCompletedEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ActionCompleted Event Arguments**
| Event Arguments | Description |
|---|---|
| `Action` | The name of the Spreadsheet action that was just completed (e.g., `Edit`, `Cut`, `Copy`, `Paste`, `Delete`, `Sort`, `Filter`, `Open`, `Save`, `Undo`, `Redo`). |
| `Range` | The range affected by the completed action in A1 notation with sheet name (e.g., `Sheet1!A1:B10`). |
| `SheetName` | The name of the worksheet on which the action was performed. |

```csharp
private void OnActionFailed(ActionFailedEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ActionFailed Event Arguments**
| Event Arguments | Description |
|---|---|
| `Action` | The name of the Spreadsheet action that failed (e.g., `Edit`, `Cut`, `Copy`, `Paste`, `Delete`, `Sort`, `Filter`, `Open`, `Save`, `Undo`, `Redo`). Use this to conditionally log or route failures based on the operation type. |
| `Error` | The `Exception` object describing the error that caused the Spreadsheet action to fail. Provides access to `Message`, exception type via `GetType()`, and the full stack trace. |

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Returns the formatted display text for the given cell address (supports sheet-qualified addresses)
var text = SpreadsheetRef.GetDisplayText(cellAddress);

// Clears contents, formats, hyperlinks, or all from a target range (supports sheet-qualified ranges).
await SpreadsheetRef.ClearAsync(CLEAROPERATIONTYPES, RANGE);
```

### Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `CELLADDRESS` | Cell address or sheet-qualified address used by API methods | "A1", "Sheet1!B5" |
| `CLEAROPERATIONTYPES` | Enum value specifying clear operation: `ClearContents`, `ClearFormats`, `ClearHyperlinks`, `ClearAll` | ClearOperationType.ClearContents |
| `RANGE` | A1-style range or sheet-qualified range to target; omit to use current selection | "Sheet1!A1:A10" |
| `CSS height value` | Any valid CSS height value | `"500px"`, `"50vh"`, `"100%"` |
| `CSS width value` | Any valid CSS width value | `"800px"`, `"75vw"`, `"100%"` |
| `Unique component ID` | A custom identifier for the component | `"MySpreadsheet"`, `"DataEditor"` |
| `CSS class names` | One or more CSS class names separated by spaces | `"dark-theme"`, `"my-style another-style"` |
| `valid sheet index` | Zero-based index of the worksheet to activate (0 = first sheet, 1 = second sheet, etc.) | `0`, `1`, `2` |

### Notes
- **Height** defaults to `auto`; set a specific value to control vertical sizing.
- **Width** defaults to `auto`; set a specific value to control horizontal sizing.
- **ID** is auto-generated if not specified; set a custom ID for targeted styling or JavaScript access.
- **CssClass** allows applying custom CSS styles to the root element for appearance customization.
- **ActiveSheetIndex** uses zero-based indexing; invalid indices are automatically corrected to 0 (first sheet).
- Changing **ActiveSheetIndex** programmatically switches the active sheet in the spreadsheet.
- **AllowImage** is enabled by default; include `AllowImage="false"` only when you want to **disable** image insertion for the spreadsheet.
- Existing images in imported Excel files are always displayed regardless of the **AllowImage** setting; this property only controls the ability to insert new images.
- **AllowInsert**: enabled by default; include `AllowInsert="false"` to disable inserting rows, columns, or sheets via the UI or API.
- **AllowDelete**: enabled by default; include `AllowDelete="false"` to prevent deleting sheets via the UI or API. 
- **EnableKeyboardShortcut**: default `true`; set `EnableKeyboardShortcut="false"` to disable keyboard shortcuts (Ctrl/Cmd and shortcut keys) inside the spreadsheet.
- **EnableKeyboardNavigation**: default `true`; set `EnableKeyboardNavigation="false"` to disable keyboard navigation between cells (arrow keys, Tab, Enter).
- **Created** event fires *after* the Spreadsheet component has finished initialization and is ready for user interaction. Use it to run startup logic such as registering handlers or applying configuration.
- **ActionBeginning** event fires *before* a Spreadsheet action is executed and exposes the action name, range, and sheet name. Use it to validate or cancel the action via `args.Cancel = true`.
- **ActionCompleted** event fires *after* a Spreadsheet action has completed successfully and exposes the action name, affected range, and sheet name. Use it for auditing, logging, or post-processing.
- **ActionFailed** event fires when a Spreadsheet action fails and provides the underlying `Exception` in `args.Error`. Use it for diagnostics, error logging, or recovery workflows.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet Component](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/getting-started)
````
