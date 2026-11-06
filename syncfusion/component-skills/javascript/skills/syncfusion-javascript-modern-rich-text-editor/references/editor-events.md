# Events in Syncfusion JavaScript Modern Rich Text Editor

The Modern Rich Text Editor component emits various events to notify your application about user interactions, state changes, and content modifications. This guide covers all available events and how to handle them.

## Table of contents

- [change](#change)
- [created](#created)
- [destroyed](#destroyed)
- [focus](#focus)
- [blur](#blur)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [API references](#api-references)

## change

The `change` event is raised whenever the editor content changes, such as when text is inserted, deleted, moved, replaced, or formatted. Its event arguments provide the updated document and selection states, the type of action performed, and the nodes affected by the change.

The following example demonstrates how to handle the `change` event and display the action performed along with the primary affected element.

```ts
import { RichTextEditorUI, ChangeEventArgs } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    change: (args: ChangeEventArgs) => {
        const logElement: HTMLElement = document.getElementById('event-log') as HTMLElement;
        const nodeElement: HTMLElement = document.getElementById('affected-node') as HTMLElement;
        if (logElement && nodeElement) {
            // 1. Display the type of action performed (e.g., "Insertion")
            logElement.innerText = `Action: ${args.action || 'Modified'}`;
            // 2. Extract and display the tag/type of the affected node (e.g., "paragraph")
            if (args.affectedNodes && args.affectedNodes.length > 0) {
                const primaryNode: any = args.affectedNodes[0];
                nodeElement.innerText = `Affected Element: <${primaryNode.type}>`;
            } else {
                nodeElement.innerText = 'Affected Element: None';
            }
        }
    }
});

editor.appendTo('#editor');
```

## created

The `created` event is raised after the Rich Text Editor UI component has been successfully initialized and rendered. Use this event to perform setup tasks that depend on the editor instance or its rendered DOM elements.

The following example demonstrates how to handle the `created` event and display a notification confirming that the editor is ready for interaction.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    // The created event fires immediately after the component is rendered
    created: () => {
        const logElement: HTMLElement = document.getElementById('event-log') as HTMLElement;
        if (logElement) {
            // Update the UI text to tell a new user that the component is fully ready
            logElement.innerText = 'Action: Editor is ready for input!';
        }
    }
});

editor.appendTo('#editor');
```

## destroyed

The `destroyed` event is raised when the Rich Text Editor component is destroyed and removed from the application. It can be used to perform cleanup tasks, such as releasing resources, removing event handlers, or resetting related state.

The following example demonstrates how to handle the `destroyed` event and log the destruction notification to confirm cleanup and resource release.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    // The destroyed event fires after the component is removed from the application
    destroyed: () => {
        const logElement: HTMLElement = document.getElementById('event-log') as HTMLElement;
        if (logElement) {
            // Inform the user that cleanup tasks are executing or complete
            logElement.innerText = 'Action: Editor has been destroyed and resources are cleared!';
        }
    }
});
editor.appendTo( '#editor' );

document.getElementById('destroy-btn').addEventListener('click', () => {
    if (editor) {
        editor.destroy();
    }
});
```

## focus

The `focus` event is raised when the editor receives focus, either through user interaction or a method call. Its event arguments identify the event name, indicate whether the focus was user-initiated, and specify the focus source.

The following example demonstrates how to handle the `focus` event and log a notification indicating that the editor has received focus and is ready for user input.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    // Raised when the editor receives focus
    focus: () => {
        logEvent('[focus event]: Editor focused.');
    },
    // Raised when the editor loses focus
    blur: () => {
        logEvent('[blur event]: Editor lost focus. Click inside the Editor to focus again.');
    }
});
editor.appendTo( '#editor' );

// Helper function to update the event log in the HTML UI
function logEvent(message: string): void {
    const logElement: HTMLElement = document.getElementById('event-log') as HTMLElement;
    if (logElement) {
        logElement.innerText = message;
    }
}
```

## blur

The `blur` event is raised when the editor loses focus, either through user interaction or a method call. Its event arguments identify the event name, indicate whether the blur was caused by user interaction, provide the focus event, and specify the source.

The following example demonstrates how to handle the `blur` event and log a notification indicating that the editor has lost focus and user input has ceased.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    // Raised when the editor loses focus
    blur: () => {
        logEvent('[blur event]: Editor lost focus.');
    },
    // Raised when the editor receives focus
    focus: () => {
        logEvent('[focus event]: Editor focused. Click outside the Editor to trigger blur event.');
    }
});
editor.appendTo( '#editor' );

// Helper function to update the event log in the HTML UI
function logEvent(message: string): void {
    const logElement: HTMLElement = document.getElementById('event-log') as HTMLElement;
    if (logElement) {
        logElement.innerText = message;
    }
}
```

## actionBegin

The `actionBegin` event is raised before an editor action is executed, such as inserting, deleting, formatting, or modifying content. It provides details about the pending action and allows applications to monitor or customize the editor behavior before the operation begins.

The following example demonstrates how to handle the `actionBegin` event and log pre-action events with timestamps to track when operations are initiated before they complete.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    // Triggers BEFORE an action takes place (e.g., formatting, inserting images, typing)
    actionBegin: (args: any) => {
        logToConsole('actionBegin', args.action, '#d9534f'); // Highlighted in Red
    },
});
editor.appendTo( '#editor' );

function logToConsole(eventName: string, requestType: string | undefined, color: string): void {
    const logContainer: HTMLElement = document.getElementById('log-container') as HTMLElement;
    if (!logContainer) { return; }
    const timestamp: any = new Date().toLocaleTimeString();
    const actionLabel: any = requestType ? requestType : 'Generic Action';
    const logRow: HTMLElement = document.createElement('div');
    logRow.style.marginBottom = '6px';
    logRow.style.borderLeft = `3px solid ${color}`;
    logRow.style.paddingLeft = '8px';
    logRow.innerHTML = `<strong style="color: ${color}">[${timestamp}] ${eventName}</strong> — <em>Action:</em> ${actionLabel}`;
    logContainer.insertBefore(logRow, logContainer.firstChild);
}
```

## actionComplete

The `actionComplete` event is raised after an editor action, such as inserting, deleting, formatting, or modifying content, has been completed. It provides details about the completed action so applications can respond, update related state, or perform follow-up processing.

The following example demonstrates how to handle the `actionComplete` event and log post-action events with timestamps to track when operations have successfully finished and are ready for follow-up processing.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI( {
    // Triggers AFTER an action successfully completes
    actionComplete: (args: any) => {
        logToConsole('actionComplete', args.action, '#5cb85c'); // Highlighted in Green
    }
});
editor.appendTo( '#editor' );

function logToConsole(eventName: string, requestType: string | undefined, color: string): void {
    const logContainer: HTMLElement = document.getElementById('log-container') as HTMLElement;
    if (!logContainer) { return; }
    const timestamp: any = new Date().toLocaleTimeString();
    const actionLabel: any = requestType ? requestType : 'Generic Action';
    const logRow: HTMLElement = document.createElement('div');
    logRow.style.marginBottom = '6px';
    logRow.style.borderLeft = `3px solid ${color}`;
    logRow.style.paddingLeft = '8px';
    logRow.innerHTML = `<strong style="color: ${color}">[${timestamp}] ${eventName}</strong> — <em>Action:</em> ${actionLabel}`;
    logContainer.insertBefore(logRow, logContainer.firstChild);
}
```


## API references

Event-arg types that back the editor events, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `ChangeEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/changeeventargs>

#### Properties

- `action` — `DocumentChangeAction` — Semantic action describing the nature of the change.
  - `'Insertion'` — Content was added (typing, paste, insert command).
  - `'Deletion'` — Content was removed (backspace, delete, remove command).
  - `'Moved'` — Content was relocated (drag-drop, reorder, move command).
  - `'Replaced'` — Content was swapped (find-replace, transform).
  - `'Update'` — Attributes or formatting changed without structural change (heading level, text color).
  - `'Unknown'` — Transaction too complex to categorize; examine `affectedNodes` for details.
- `affectedNodes` — `EditorNode[]` — All Headless Editor nodes touched by this transaction. Populated based on action:
  - `'Insertion'` — Newly inserted nodes and their ancestors.
  - `'Deletion'` — Nodes that existed before deletion (for archival/undo preview).
  - `'Moved'` — Relocated nodes.
  - `'Replaced'` — Both old and new nodes.
  - `'Update'` — Mutated nodes.
  - `'Unknown'` — All nodes with changes (best effort).
- `document` — `EditorDocument` — The document state after the change.
- `selection` — `Selection` — The selection state after the change.

### `UpdatedToolbarStatusEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/updatedtoolbarstatuseventargs>

Event arguments for the `updatedToolbarStatus` event raised after the toolbar synchronizes its visual state (active buttons, dropdown values, color pickers) with the current editor selection / cursor formatting.

#### Properties

- `activeMarks` — `Object` — Snapshot of the active marks at the current selection.
- `blockFormats` — `Object` — Snapshot of block-level formats at the current selection.
- `styles` — `Object` — Resolved font / color values at the current selection.

### `itemClickEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/itemclickeventargs>

Event arguments for the `itemClick` event raised when a toolbar item is clicked.

#### Properties

- `actionId` — `string` — The action/command ID for the clicked item.
- `item` — `ToolbarItem` — The toolbar item configuration.
- `itemId` — `string` — Stable ID of the toolbar item that was clicked.
- `originalEvent` — `MouseEvent | KeyboardEvent` — The originating DOM event.


### `BeforeDialogCloseEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/beforedialogcloseeventargs>

Event args for `RichTextEditor.beforeDialogClose`. Extends the ej2 `BeforeCloseEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the dialog belongs to.

#### Properties

- `cancel` — `boolean` — Defines whether the current action can be prevented.
- `closedBy` — `string` — Returns whether the dialog is closed by "close icon", "overlayClick", "escape", and "user action".
- `container` — `HTMLElement` — Returns the root container element of the dialog.
- `element` — `Element` — Returns the element of the dialog.
- `event` — `Event` — Returns the original event arguments.
- `isInteracted` — `boolean` — Determines whether the event is triggered by interaction.
- `preventFocus` — `boolean` — Gets or sets a value indicating whether to prevent focus from returning to the previously active element after dialog closure.
- `source` — `string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target` — `HTMLElement | string` — Returns the target element of the dialog.

### `BeforeDialogOpenEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/beforedialogopeneventargs>

Event args for `RichTextEditor.beforeDialogOpen`. Extends the ej2 `BeforeOpenEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the dialog belongs to.

#### Properties

- `cancel` — `boolean` — Defines whether the current action can be prevented.
- `container` — `HTMLElement` — Returns the root container element of the dialog.
- `element` — `Element` — Returns the element of the dialog.
- `maxHeight` — `string` — Specify the value to override max-height value of dialog.
- `source` — `string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target` — `HTMLElement | string` — Returns the target element of the dialog.

### `BeforePopupCloseEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/beforepopupcloseeventargs>

Event args for `RichTextEditor.beforePopupClose`. Extends the ej2 `BeforeCloseEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the popup belongs to.

#### Properties

- `cancel` — `boolean` — Defines whether the current action can be prevented.
- `closedBy` — `string` — Returns whether the dialog is closed by "close icon", "overlayClick", "escape", and "user action".
- `container` — `HTMLElement` — Returns the root container element of the dialog.
- `element` — `Element` — Returns the element of the dialog.
- `event` — `Event` — Returns the original event arguments.
- `isInteracted` — `boolean` — Determines whether the event is triggered by interaction.
- `preventFocus` — `boolean` — Gets or sets a value indicating whether to prevent focus from returning to the previously active element after dialog closure.
- `source` — `string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target` — `HTMLElement | string` — Returns the target element of the dialog.

### `BeforePopupOpenEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/beforepopupopeneventargs>

Event args for `RichTextEditor.beforePopupOpen`. Extends the ej2 `PopupEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the popup belongs to.

#### Properties

- `animation` — `AnimationModel` — Specifies the animation Object.
- `cancel` — `boolean` — Illustrates whether the current action needs to be prevented or not.
- `event` — `MouseEvent | KeyboardEventArgs | TouchEvent | Object` — Specifies the event.
- `popup` — `Popup` — Specifies the popup Object.
- `source` — `string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
