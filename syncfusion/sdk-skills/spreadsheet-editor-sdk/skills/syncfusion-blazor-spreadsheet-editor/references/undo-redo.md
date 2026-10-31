## Undo and Redo

> Reverse or reapply recent actions in the spreadsheet. Undo and Redo operations maintain a history of spreadsheet actions, allowing users to safely experiment with data and formatting while preserving the ability to restore previous states.

### Undo

> Reverse the most recent action performed within the spreadsheet, restoring the previous state and enabling safe modifications to content and formatting. End users can perform the undo operation through the user interface (UI) without requiring any programmatic customization.

### Redo

> Reapply an action that was previously undone, allowing end users to move forward through the operation history and restore both data and interface states. Redo actions can be performed via the user interface (UI) without requiring any programmatic customization.


### PROPERTY
```csharp
AllowUndoRedo="true(Default)/false"
```

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API Methods

The Spreadsheet exposes public methods to programmatically perform undo and redo operations in addition to the UI controls.

```csharp
// Reverts the most recent action when available
SpreadsheetRef.Undo();

// Reapplies the most recently undone action when available
SpreadsheetRef.Redo();
```

### Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |

**Summary**
Undo and Redo are available via both UI controls and the public `Undo()`/`Redo()` methods.

**How to Perform**

**Undo:**
- Click the **Undo** button located in the **Home** tab of the **Ribbon** to reverse the latest operation.
- Use the keyboard shortcut **Ctrl + Z** for a quick way to undo the last action.
- The **Undo** button is automatically disabled when there are no reversible operations available.

**Redo:**
- Click the **Redo** button located in the **Home** tab of the **Ribbon** to reapply the most recently undone operation.
- Use the keyboard shortcut **Ctrl + Y** for quick access to redo the last undone action.
- The **Redo** button is automatically disabled when no actions are available to reapply or when a cell is in edit mode.

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| **Ctrl + Z** | Undo the most recent action |
| **Ctrl + Y** | Redo the most recently undone action |

### Limitations
- The undo and redo history is limited to **25 operations** to optimize memory usage; once this limit is reached, older actions are automatically discarded.
- The history is cleared when worksheet protection is enabled.
- The redo history is cleared whenever a new action is performed after an undo operation.

### Notes

- **AllowUndoRedo**: default `true`; set `AllowUndoRedo="false"` to disable Undo/Redo UI and history.
- `Undo()`/`Redo()` operate on the internal history stacks and are no-ops when no actions are available.
- Respect limitations: history is limited (default 25 entries), history is cleared on sheet protection, and redo is cleared when new actions occur after an undo.
- These methods have the same protection and state constraints as the UI (do not call while a cell is in edit mode). Use `AllowUndoRedo="false"` to disable history/UI.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.


### Documentation link
[Blazor Spreadsheet Undo and Redo](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/undo-redo)
