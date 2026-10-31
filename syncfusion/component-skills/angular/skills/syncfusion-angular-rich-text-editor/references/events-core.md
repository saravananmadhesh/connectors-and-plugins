# Rich Text Editor Events — Core

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Action Events](#action-events)
- [Content Change Events](#content-change-events)
- [Dialog Events](#dialog-events)
- [Popup Events](#popup-events)
- [Quick Toolbar Events](#quick-toolbar-events)
- [Resize Events](#resize-events)

---

## Lifecycle Events

### created

Triggers when the Rich Text Editor is rendered.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
import { Component } from '@angular/core';

@Component({
  template: `<ejs-richtexteditor (created)="onCreated()"></ejs-richtexteditor>`
})
export class AppComponent {
  onCreated(): void {
    console.log('Editor has been created');
    // Initialize custom configurations
    // Load saved content
  }
}
```

### destroyed

Triggers when the Rich Text Editor is destroyed.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onDestroyed(): void {
  console.log('Editor has been destroyed');
  // Cleanup operations
  // Save state before destruction
}
```

### focus

Triggers when the Rich Text Editor gains focus.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onFocus(): void {
  console.log('Editor focused');
  this.showToolbarHints = true;
}
```

### blur

Triggers when the Rich Text Editor loses focus.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onBlur(): void {
  console.log('Editor blurred');
  this.autoSaveContent();
}
```

---

## Action Events

### actionBegin

Triggers before executing a command via toolbar items. Cancel this event to prevent the command from executing by setting `args.cancel = true`.

**Event Type:** `EmitType<ActionBeginEventArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to cancel the action
- `name` (string): Name of the event
- `originalEvent` (MouseEvent | KeyboardEvent | DragEvent): Original event that triggered the action
- `requestType` (string): Type of the current action
- `selectType` (string): Selection type (dropdown or not)

**Example:**
```typescript
import { ActionBeginEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (actionBegin)="onActionBegin($event)"></ejs-richtexteditor>`
})
export class AppComponent {
  onActionBegin(args: ActionBeginEventArgs): void {
    console.log('Action:', args.requestType);

    // Prevent certain actions
    if (args.requestType === 'Image' && !this.userCanUploadImages) {
      args.cancel = true;
      alert('You do not have permission to upload images');
    }

    // Log user actions for audit
    this.logUserAction(args.requestType);
  }
}
```

### actionComplete

Triggers after executing a command via toolbar items.

**Event Type:** `EmitType<ActionCompleteEventArgs>`

**Event Arguments:**
- `editorMode` (string): Current mode of the editor
- `event` (MouseEvent | KeyboardEvent): Event associated with the action
- `name` (string): Name of the event
- `requestType` (string): Type of the completed action

**Example:**
```typescript
import { ActionCompleteEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onActionComplete(args: ActionCompleteEventArgs): void {
  console.log('Action completed:', args.requestType);

  // Track formatting actions
  if (args.requestType === 'Bold' || args.requestType === 'Italic') {
    this.trackFormattingUsage(args.requestType);
  }

  // Update UI after specific actions
  if (args.requestType === 'FullScreen') {
    this.isFullScreen = true;
  }
}
```

---

## Content Change Events

### change

Triggers when the Rich Text Editor loses focus AND changes have been made to the content.

**Event Type:** `EmitType<ChangeEventArgs>`

**Event Arguments:**
- `isInteracted` (boolean): Specifies if triggered by user interaction or auto-save
- `name` (string): Name of the event
- `value` (string): Current value/content of the editor

**Example:**
```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (change)="onChange($event)"></ejs-richtexteditor>`
})
export class AppComponent {
  onChange(args: ChangeEventArgs): void {
    console.log('Content changed:', args.value);
    console.log('Is user interaction:', args.isInteracted);

    // Save to database
    this.saveContent(args.value);

    // Update character count
    this.updateCharacterCount(args.value);
  }

  saveContent(content: string): void {
    // Auto-save implementation
    this.http.post('/api/save', { content }).subscribe(
      () => console.log('Content saved'),
      (error) => console.error('Save failed:', error)
    );
  }
}
```

### selectionChanged

Triggers when a non-empty text selection is made or updated in the editor. Fires in both HTML and Markdown modes.

**Event Type:** `EmitType<SelectionChangedEventArgs>`

**Event Arguments:**
- `editorMode` (EditorMode | string): Current editor mode (HTML or Markdown)
- `selectedContent` (string): HTML string of the selected content
- `selection` (Selection): Browser Selection object

**Example:**
```typescript
import { SelectionChangedEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (selectionChanged)="onSelectionChanged($event)"></ejs-richtexteditor>`
})
export class AppComponent {
  onSelectionChanged(args: SelectionChangedEventArgs): void {
    console.log('Selected content:', args.selectedContent);
    console.log('Editor mode:', args.editorMode);

    // Show custom context menu for selection
    if (args.selectedContent) {
      this.showContextMenu(args.selection);
    }

    // Enable/disable custom buttons based on selection
    this.updateCustomToolbar(args.selectedContent);
  }

  showContextMenu(selection: Selection): void {
    console.log('Selection range:', selection.rangeCount);
  }
}
```

---

## Dialog Events

### beforeDialogOpen

Triggers before a dialog is opened. Cancel by setting `args.cancel = true`.

**Event Type:** `EmitType<BeforeOpenEventArgs>`

**Example:**
```typescript
onBeforeDialogOpen(args: BeforeOpenEventArgs): void {
  console.log('Dialog opening');

  // Prevent dialog from opening under certain conditions
  if (!this.userHasPermission) {
    args.cancel = true;
    alert('You do not have permission to perform this action');
  }
}
```

### dialogOpen

Triggers when a dialog is opened.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onDialogOpen(): void {
  console.log('Dialog opened');
  // Custom initialization for dialog
}
```

### beforeDialogClose

Triggers before a dialog is closed. Cancel by setting `args.cancel = true`.

**Event Type:** `EmitType<BeforeCloseEventArgs>`

**Example:**
```typescript
onBeforeDialogClose(args: BeforeCloseEventArgs): void {
  // Validate form before closing
  if (this.hasUnsavedChanges) {
    const confirmClose = confirm('You have unsaved changes. Close anyway?');
    args.cancel = !confirmClose;
  }
}
```

### dialogClose

Triggers after a dialog has been closed.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onDialogClose(): void {
  console.log('Dialog closed');
  // Cleanup or refresh operations
}
```

---

## Popup Events

### beforePopupOpen

Triggers before a popup is about to open. Can be canceled by setting `args.cancel = true`.

**Event Type:** `EmitType<BeforePopupOpenCloseEventArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to prevent popup from opening
- `element` (HTMLElement): Popup HTML element
- `originalEvent` (Event): Original DOM event
- `popupInstance` (any): Popup instance
- `type` (EditorPopupType): Type of popup (EmojiPicker, AIAssistant)

**Example:**
```typescript
import { BeforePopupOpenCloseEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

onBeforePopupOpen(args: BeforePopupOpenCloseEventArgs): void {
  console.log('Opening popup:', args.type);

  // Add custom elements to popup
  if (args.type === 'EmojiPicker') {
    this.customizeEmojiPicker(args.element);
  }

  // Prevent popup under certain conditions
  if (!this.featureEnabled) {
    args.cancel = true;
  }
}
```

### beforePopupClose

Triggers before a popup is about to close. Can be canceled by setting `args.cancel = true`.

**Event Type:** `EmitType<BeforePopupOpenCloseEventArgs>`

**Example:**
```typescript
onBeforePopupClose(args: BeforePopupOpenCloseEventArgs): void {
  console.log('Closing popup:', args.type);

  // Cleanup custom elements
  if (args.type === 'AIAssistant') {
    this.cleanupAIAssistant(args.element);
  }
}
```

---

## Quick Toolbar Events

### beforeQuickToolbarOpen

Triggers before the quick toolbar opens.

**Event Type:** `EmitType<BeforeQuickToolbarOpenArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to prevent quick toolbar from opening
- `targetElement` (Element): Target element that triggered the toolbar

**Example:**
```typescript
import { BeforeQuickToolbarOpenArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor (beforeQuickToolbarOpen)="onBeforeQuickToolbar($event)"></ejs-richtexteditor>`,
  providers: [QuickToolbarService]
})
export class AppComponent {
  onBeforeQuickToolbar(args: BeforeQuickToolbarOpenArgs): void {
    console.log('Quick toolbar opening for:', args.targetElement);

    // Prevent quick toolbar for specific elements
    if (args.targetElement.tagName === 'TABLE' && !this.allowTableEditing) {
      args.cancel = true;
    }
  }
}
```

### quickToolbarOpen

Triggers when the quick toolbar is opened.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onQuickToolbarOpen(): void {
  console.log('Quick toolbar opened');
}
```

### quickToolbarClose

Triggers after the quick toolbar has been closed.

**Event Type:** `EmitType<Object>`

**Example:**
```typescript
onQuickToolbarClose(): void {
  console.log('Quick toolbar closed');
}
```

---

## Resize Events

### resizeStart

Triggers when resizing starts for tables, images, videos, or the editor itself.

**Event Type:** `EmitType<ResizeArgs>`

**Event Arguments:**
- `cancel` (boolean): Set to `true` to prevent resize
- `event` (MouseEvent | TouchEvent): Resize event
- `requestType` (string): Type of request

**Example:**
```typescript
import { ResizeArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [enableResize]="true" (resizeStart)="onResizeStart($event)"></ejs-richtexteditor>`,
  providers: [ResizeService]
})
export class AppComponent {
  onResizeStart(args: ResizeArgs): void {
    console.log('Resize started:', args.requestType);

    // Prevent resize for certain elements
    if (this.isReadOnly) {
      args.cancel = true;
    }
  }
}
```

### resizing

Triggers continuously while resizing elements.

**Event Type:** `EmitType<ResizeArgs>`

**Example:**
```typescript
onResizing(args: ResizeArgs): void {
  console.log('Resizing in progress');

  // Show current dimensions
  const target = args.event.target as HTMLElement;
  console.log('Current size:', target.offsetWidth, target.offsetHeight);
}
```

### resizeStop

Triggers when resizing stops.

**Event Type:** `EmitType<ResizeArgs>`

**Example:**
```typescript
onResizeStop(args: ResizeArgs): void {
  console.log('Resize stopped:', args.requestType);

  // Save new dimensions
  this.saveResizeState();
}
```

---

## Common Event Patterns

### Comprehensive Event Logging

```typescript
@Component({
  template: `
    <ejs-richtexteditor
      (created)="onCreated()"
      (actionBegin)="onActionBegin($event)"
      (actionComplete)="onActionComplete($event)"
      (change)="onChange($event)"
      (selectionChanged)="onSelectionChanged($event)"
      (toolbarClick)="onToolbarClick($event)"
      (imageUploadSuccess)="onImageUploadSuccess($event)"
      (imageUploadFailed)="onImageUploadFailed($event)">
    </ejs-richtexteditor>
  `
})
export class AppComponent {
  eventLog: string[] = [];

  logEvent(eventName: string, details?: any): void {
    const timestamp = new Date().toISOString();
    this.eventLog.push(`[${timestamp}] ${eventName}: ${JSON.stringify(details)}`);
  }

  onCreated(): void {
    this.logEvent('created');
  }

  onActionBegin(args: ActionBeginEventArgs): void {
    this.logEvent('actionBegin', { requestType: args.requestType });
  }

  // ... other event handlers
}
```

### Form Validation with Events

```typescript
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ejs-richtexteditor
        formControlName="content"
        (change)="onContentChange($event)"
        (blur)="onBlur()">
      </ejs-richtexteditor>
      <button type="submit">Submit</button>
    </form>
  `
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  onContentChange(args: ChangeEventArgs): void {
    // Update form control
    this.form.patchValue({ content: args.value });

    // Validate on change
    if (this.form.get('content')?.invalid) {
      console.log('Content validation failed');
    }
  }

  onBlur(): void {
    // Mark as touched on blur
    this.form.get('content')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

---

## See Also

- [properties.md](properties.md) - Component properties and configuration
- [methods.md](methods.md) - Programmatic API methods
- [toolbar.md](toolbar.md) - Toolbar event handling
- [ai-assistant.md](ai-assistant.md) - AI-specific events
