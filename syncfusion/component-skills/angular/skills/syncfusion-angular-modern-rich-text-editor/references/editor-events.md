# Editor Events

## Table of Contents
- [Overview](#overview)
- [change](#change)
- [created](#created)
- [destroyed](#destroyed)
- [focus](#focus)
- [blur](#blur)
- [actionBegin](#actionbegin)
- [actionComplete](#actioncomplete)
- [API Reference](#api-reference)
  - [ChangeEventArgs](#changeeventargs)
  - [EditorComponentEventArgs](#editorcomponenteventargs)
  - [DialogType](#dialogtype)
  - [BeforeDialogCloseEventArgs](#beforedialogcloseeventargs)
  - [BeforeDialogOpenEventArgs](#beforedialogopeneventargs)
  - [BeforePopupCloseEventArgs](#beforepopupcloseeventargs)
  - [BeforePopupOpenEventArgs](#beforepopupopeneventargs)

---

## Overview

The Modern Rich Text Editor component emits various events to notify your application about user interactions, state changes, and content modifications. This reference covers the core component events. For toolbar-specific events (`itemClicked`, `updatedToolbarStatus`) see [Toolbar](toolbar.md). For slash-command selection events (`itemSelect`) see [Features — Slash Commands](features.md). For upload lifecycle events (`fileUploading`, `fileUploadSuccess`) see [Image Handling](image.md).

## change

The [`change`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#change) event is raised whenever the editor content changes, such as when text is inserted, deleted, moved, replaced, or formatted. Its event arguments provide the updated document and selection states, the type of action performed, and the nodes affected by the change.

The following example demonstrates how to handle the `change` event and display the action performed along with the primary affected element.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, ChangeEventArgs } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App {
    public eventLog: string = 'Action: Waiting for input...';
    public affectedNode: string = 'Affected Element: None';

    public onChange(args: ChangeEventArgs): void {
        // 1. Display the type of action performed (e.g., "Insertion")
        this.eventLog = `Action: ${args.action || 'Modified'}`;
        // 2. Extract and display the tag/type of the affected node (e.g., "paragraph")
        if (args.affectedNodes && args.affectedNodes.length > 0) {
            const primaryNode: any = args.affectedNodes[0];
            this.affectedNode = `Affected Element: <${primaryNode.type}>`;
        } else {
            this.affectedNode = 'Affected Element: None';
        }
    }
}
```

```html
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
    <span class="badge">{{ affectedNode }}</span>
</div>
<ejs-richtexteditor-ui (change)="onChange($event)"></ejs-richtexteditor-ui>
```

## created

The [`created`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#created) event is raised after the Rich Text Editor UI component has been successfully initialized and rendered. Use this event to perform setup tasks that depend on the editor instance or its rendered DOM elements.

The following example demonstrates how to handle the `created` event and display a notification confirming that the editor is ready for interaction.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public eventLog: string = 'Action: Waiting for input...';

    ngAfterViewInit(): void {
        // The created event fires immediately after the component is rendered
        this.rteObj.created = () => {
            // Update the UI text to tell a new user that the component is fully ready
            this.eventLog = 'Action: Editor is ready for input!';
        };
    }
}
```

```html
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
</div>
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
```

## destroyed

The [`destroyed`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#destroyed) event is raised when the Rich Text Editor component is destroyed and removed from the application. It can be used to perform cleanup tasks, such as releasing resources, removing event handlers, or resetting related state.

The following example demonstrates how to handle the `destroyed` event and log the destruction notification to confirm cleanup and resource release.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public eventLog: string = 'Action: Waiting for input...';

    ngAfterViewInit(): void {
        // The destroyed event fires after the component is removed from the application
        this.rteObj.destroyed = () => {
            // Inform the user that cleanup tasks are executing or complete
            this.eventLog = 'Action: Editor has been destroyed and resources are cleared!';
        };
    }

    public destroy(): void {
        if (this.rteObj) {
            this.rteObj.destroy();
        }
    }
}
```

```html
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
</div>
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
<button id="destroy-btn" class="destroy-btn" (click)="destroy()">
    Destroy Editor Component
</button>
```

## focus

The [`focus`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#focus) event is raised when the editor receives focus, either through user interaction or a method call. Its event arguments identify the event name, indicate whether the focus was user-initiated, and specify the focus source.

The following example demonstrates how to handle the `focus` event and log a notification indicating that the editor has received focus and is ready for user input.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public eventLog: string = 'Click inside the editor to trigger the focus event...';

    ngAfterViewInit(): void {
        // Raised when the editor receives focus
        this.rteObj.focus = () => {
            this.eventLog = '[focus event]: Editor focused.';
        };
        // Raised when the editor loses focus
        this.rteObj.blur = () => {
            this.eventLog = '[blur event]: Editor lost focus. Click inside the Editor to focus again.';
        };
    }
}
```

```html
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
</div>
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
```

## blur

The [`blur`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#blur) event is raised when the editor loses focus. It complements the `focus` event and lets applications track when the editor becomes inactive so they can flush transient state, dismiss auxiliary UI, or persist in-progress changes.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public eventLog: string = 'Click inside the editor to trigger the focus event...';

    ngAfterViewInit(): void {
        // Raised when the editor loses focus
        this.rteObj.blur = () => {
            this.eventLog = '[blur event]: Editor lost focus.';
        };
        // Raised when the editor receives focus
        this.rteObj.focus = () => {
            this.eventLog = '[focus event]: Editor focused. Click outside the Editor to trigger blur event.';
        };
    }
}
```

```html
<div class="event-dashboard">
    <span class="badge">{{ eventLog }}</span>
</div>
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
```

## actionBegin

The [`actionBegin`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#actionbegin) event is raised before an editor action is executed, such as inserting, deleting, formatting, or modifying content. It provides details about the pending action and allows applications to monitor or customize the editor behavior before the operation begins.

The following example demonstrates how to handle the `actionBegin` event and log pre-action events with timestamps to track when operations are initiated before they complete.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

interface LogRow {
    timestamp: string;
    eventName: string;
    action: string;
    color: string;
}

@Component({
    imports: [CommonModule, RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public logs: LogRow[] = [];
    public showEmpty: boolean = true;

    ngAfterViewInit(): void {
        // Triggers BEFORE an action takes place (e.g., formatting, inserting images, typing)
        this.rteObj.actionBegin = (args: any) => {
            this.logToConsole('actionBegin', args.action, '#d9534f'); // Highlighted in Red
        };
    }

    private logToConsole(eventName: string, requestType: string | undefined, color: string): void {
        // Hide the placeholder text once the first event fires
        this.showEmpty = false;
        const timestamp: string = new Date().toLocaleTimeString();
        const actionLabel: string = requestType ? requestType : 'Generic Action';
        this.logs = [{ timestamp, eventName, action: actionLabel, color }, ...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
        this.showEmpty = true;
    }
}
```

```html
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>

<div class="logger-panel">
    <div class="logger-header">
        <h4>Live Event Log Console</h4>
        <button id="clear-btn" (click)="clearLogs()">Clear Logs</button>
    </div>
    <div class="log-container">
        <div *ngIf="showEmpty" class="empty-message">
            No events captured yet. Try typing or formatting some text inside the editor...
        </div>
        <div *ngFor="let log of logs" class="log-row" [style.borderLeft]="'3px solid ' + log.color">
            <strong [style.color]="log.color">[{{ log.timestamp }}] {{ log.eventName }}</strong>
            &mdash; <em>Action:</em> {{ log.action }}
        </div>
    </div>
</div>
```

## actionComplete

The [`actionComplete`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#actioncomplete) event is raised after an editor action, such as inserting, deleting, formatting, or modifying content, has been completed. It provides details about the completed action so applications can respond, update related state, or perform follow-up processing.

The following example demonstrates how to handle the `actionComplete` event and log post-action events with timestamps to track when operations have successfully finished and are ready for follow-up processing.

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

interface LogRow {
    timestamp: string;
    eventName: string;
    action: string;
    color: string;
}

@Component({
    imports: [CommonModule, RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App implements AfterViewInit {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public logs: LogRow[] = [];
    public showEmpty: boolean = true;

    ngAfterViewInit(): void {
        // Triggers AFTER an action successfully completes
        this.rteObj.actionComplete = (args: any) => {
            this.logToConsole('actionComplete', args.action, '#5cb85c'); // Highlighted in Green
        };
    }

    private logToConsole(eventName: string, requestType: string | undefined, color: string): void {
        // Hide the placeholder text once the first event fires
        this.showEmpty = false;
        const timestamp: string = new Date().toLocaleTimeString();
        const actionLabel: string = requestType ? requestType : 'Generic Action';
        this.logs = [{ timestamp, eventName, action: actionLabel, color }, ...this.logs];
    }

    public clearLogs(): void {
        this.logs = [];
        this.showEmpty = true;
    }
}
```

```html
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>

<div class="logger-panel">
    <div class="logger-header">
        <h4>Live Event Log Console</h4>
        <button id="clear-btn" (click)="clearLogs()">Clear Logs</button>
    </div>
    <div class="log-container">
        <div *ngIf="showEmpty" class="empty-message">
            No events captured yet. Try typing or formatting some text inside the editor...
        </div>
        <div *ngFor="let log of logs" class="log-row" [style.borderLeft]="'3px solid ' + log.color">
            <strong [style.color]="log.color">[{{ log.timestamp }}] {{ log.eventName }}</strong>
            &mdash; <em>Action:</em> {{ log.action }}
        </div>
    </div>
</div>
```
---

## API Reference

### ChangeEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/changeeventargs>

#### Properties

- `action: DocumentChangeAction` — Semantic action describing the nature of the change. Possible values:
  - `'Insertion'` — Content was added (typing, paste, insert command)
  - `'Deletion'` — Content was removed (backspace, delete, remove command)
  - `'Moved'` — Content was relocated (drag-drop, reorder, move command)
  - `'Replaced'` — Content was swapped (find-replace, transform)
  - `'Update'` — Attributes or formatting changed without structural change (heading level, text color)
  - `'Unknown'` — Transaction too complex to categorize; examine `affectedNodes` for details
- `affectedNodes: EditorNode[]` — All Headless Editor nodes touched by this transaction.
  - `'Insertion'`: Newly inserted nodes and their ancestors
  - `'Deletion'`: Nodes that existed before deletion (for archival/undo preview)
  - `'Moved'`: Relocated nodes
  - `'Replaced'`: Both old and new nodes
  - `'Update'`: Mutated nodes
  - `'Unknown'`: All nodes with changes (best effort)
- `document: EditorDocument` — The document state after the change.
- `selection: Selection` — The selection state after the change.

---

### EditorComponentEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/editorcomponenteventargs>

Editor feature (`source`) carried by every sub-component event argument raised on the editor. The `source` is a plain string set at sub-component initialization (e.g. `'Link'`, `'Image'`, `'Table'`) identifying which feature the dialog, popup, or upload belongs to. A single handler can branch on `args.source` rather than wiring one callback per feature.

#### Properties

- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.

---

### DialogType

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/dialogtype>

Enumerates the dialog types supported by the editor for inserting links, images, audio, video, and tables.

- `InsertImage` — Defines `DialogType` for inserting an image.
- `InsertLink` — Defines `DialogType` for inserting a link.
- `InsertTable` — Defines `DialogType` for inserting a table.

---

### BeforeDialogCloseEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforedialogcloseeventargs>

Event args for `RichTextEditor.beforeDialogClose`. Extends the ej2 `BeforeCloseEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the dialog belongs to.

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `closedBy: string` — Returns whether the dialog, is closed by "close icon", "overlayClick", "escape" and "user action".
- `container: HTMLElement` — Returns the root container element of the dialog.
- `element: Element` — Returns the element of the dialog.
- `event: Event` — Returns the original event arguments.
- `isInteracted: boolean` — Determines whether the event is triggered by interaction.
- `preventFocus: boolean` — Gets or sets a value indicating whether to prevent focus from returning to the previously active element after dialog closure.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target: HTMLElement | string` — Returns the target element of the dialog.

---

### BeforeDialogOpenEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforedialogopeneventargs>

Event args for `RichTextEditor.beforeDialogOpen`. Extends the ej2 `BeforeOpenEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the dialog belongs to.

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `container: HTMLElement` — Returns the root container element of the dialog.
- `element: Element` — Returns the element of the dialog.
- `maxHeight: string` — Specify the value to override max-height value of dialog.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target: HTMLElement | string` — Returns the target element of the dialog.

---

### BeforePopupCloseEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforepopupcloseeventargs>

Event args for `RichTextEditor.beforePopupClose`. Extends the ej2 `BeforeCloseEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the popup belongs to.

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `closedBy: string` — Returns whether the dialog, is closed by "close icon", "overlayClick", "escape" and "user action".
- `container: HTMLElement` — Returns the root container element of the dialog.
- `element: Element` — Returns the element of the dialog.
- `event: Event` — Returns the original event arguments.
- `isInteracted: boolean` — Determines whether the event is triggered by interaction.
- `preventFocus: boolean` — Gets or sets a value indicating whether to prevent focus from returning to the previously active element after dialog closure.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `target: HTMLElement | string` — Returns the target element of the dialog.

---

### BeforePopupOpenEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforepopupopeneventargs>

Event args for `RichTextEditor.beforePopupOpen`. Extends the ej2 `PopupEventArgs` with the `source` field that identifies the editor feature (e.g. `'Link'`, `'Image'`, `'Table'`) the popup belongs to.

#### Properties

- `animation: AnimationModel` — Specifies the animation Object.
- `cancel: boolean` — Illustrates whether the current action needs to be prevented or not.
- `event: MouseEvent | KeyboardEventArgs | TouchEvent | Object` — Specifies the event.
- `popup: Popup` — Specifies the popup Object.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
