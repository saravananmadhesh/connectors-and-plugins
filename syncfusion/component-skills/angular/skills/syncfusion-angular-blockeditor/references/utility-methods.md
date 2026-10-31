# Utility Methods

## Table of Contents
- [Overview](#overview)
- [Focus Methods](#focus-methods)
- [Toolbar Control Methods](#toolbar-control-methods)
- [Print Method](#print-method)

## Overview

The Block Editor provides utility methods for controlling editor behavior, managing toolbar items, and handling focus. These methods complement the core editing functionality.

---

## Focus Methods

### focusIn Method

Focuses the editor programmatically.

**Syntax:**
```typescript
focusIn(): void
```

**Parameters:** None

**Returns:** `void`

**Description:** Gives keyboard focus to the editor. After calling this method, the editor becomes the active element and can receive keyboard input.

**Use Cases:**
- Focus editor after user action (button click, modal close)
- Set focus when page loads
- Return focus after external operations
- Accessibility workflows

**Basic Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="focusEditor()">Focus Editor</button>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  public focusEditor(): void {
    this.blockEditor.focusIn();
  }
}
```

**Common Patterns:**

```typescript
// Focus on page load
ngAfterViewInit(): void {
  this.blockEditor.focusIn();
}

// Focus after modal closes
public onModalClose(): void {
  this.blockEditor.focusIn();
}

// Focus after content loads
public onContentLoaded(): void {
  setTimeout(() => {
    this.blockEditor.focusIn();
  }, 100);
}
```

---

### focusOut Method

Removes focus from the editor programmatically.

**Syntax:**
```typescript
focusOut(): void
```

**Parameters:** None

**Returns:** `void`

**Description:** Removes keyboard focus from the editor. The editor will no longer be the active element and won't receive keyboard input.

**Use Cases:**
- Remove focus before showing modal
- Blur editor during validation
- Prevent editing during processing
- Accessibility workflows

**Basic Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="blurEditor()">Blur Editor</button>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  public blurEditor(): void {
    this.blockEditor.focusOut();
  }
}
```

**Common Patterns:**

```typescript
// Blur before showing modal
public showModal(): void {
  this.blockEditor.focusOut();
  this.modalVisible = true;
}

// Blur during validation
public validateContent(): void {
  this.blockEditor.focusOut();
  const isValid = this.validate();
  if (isValid) {
    this.blockEditor.focusIn();
  }
}

// Blur during save operation
public async saveContent(): Promise<void> {
  this.blockEditor.focusOut();
  await this.saveToServer();
  this.showSuccessMessage();
}
```

---

## Toolbar Control Methods

### enableToolbarItems Method

Enables one or more toolbar items programmatically.

**Syntax:**
```typescript
enableToolbarItems(itemId: string | string[]): void
```

**Parameters:**
- **itemId**: `string` | `string[]` - The ID(s) of toolbar item(s) to enable

**Returns:** `void`

**Description:** Enables specified toolbar items that were previously disabled. Accepts a single item ID or an array of item IDs.

**Use Cases:**
- Enable formatting options based on selection
- Restore toolbar items after validation
- Conditional feature enablement
- Permission-based access control

**Basic Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="enableBold()">Enable Bold</button>
    <button (click)="enableMultiple()">Enable Multiple</button>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  // Enable single item
  public enableBold(): void {
    this.blockEditor.enableToolbarItems('bold');
  }
  
  // Enable multiple items
  public enableMultiple(): void {
    this.blockEditor.enableToolbarItems(['bold', 'italic', 'underline']);
  }
}
```

**Common Patterns:**

```typescript
// Enable based on selection
public onSelectionChanged(): void {
  const selectedBlocks = this.blockEditor.getSelectedBlocks();
  if (selectedBlocks && selectedBlocks.length > 0) {
    this.blockEditor.enableToolbarItems(['bold', 'italic', 'underline']);
  }
}

// Enable after content validation
public onValidationSuccess(): void {
  this.blockEditor.enableToolbarItems([
    'bold', 'italic', 'underline', 
    'strikethrough', 'subscript', 'superscript'
  ]);
}

// Enable based on user role
public configureToolbarForRole(role: string): void {
  if (role === 'editor' || role === 'admin') {
    this.blockEditor.enableToolbarItems([
      'bold', 'italic', 'underline', 
      'formats', 'alignments', 'lists'
    ]);
  }
}
```

---

### disableToolbarItems Method

Disables one or more toolbar items programmatically.

**Syntax:**
```typescript
disableToolbarItems(itemId: string | string[]): void
```

**Parameters:**
- **itemId**: `string` | `string[]` - The ID(s) of toolbar item(s) to disable

**Returns:** `void`

**Description:** Disables specified toolbar items. Accepts a single item ID or an array of item IDs. Disabled items remain visible but cannot be clicked.

**Use Cases:**
- Restrict formatting options
- Prevent editing during processing
- Permission-based access control
- Conditional feature restriction

**Basic Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="disableBold()">Disable Bold</button>
    <button (click)="disableMultiple()">Disable Multiple</button>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  // Disable single item
  public disableBold(): void {
    this.blockEditor.disableToolbarItems('bold');
  }
  
  // Disable multiple items
  public disableMultiple(): void {
    this.blockEditor.disableToolbarItems(['bold', 'italic', 'underline']);
  }
}
```

**Common Patterns:**

```typescript
// Disable during save
public async saveContent(): Promise<void> {
  this.blockEditor.disableToolbarItems([
    'bold', 'italic', 'underline', 'formats'
  ]);
  
  await this.saveToServer();
  
  this.blockEditor.enableToolbarItems([
    'bold', 'italic', 'underline', 'formats'
  ]);
}

// Disable based on read-only mode
public setReadOnlyMode(isReadOnly: boolean): void {
  if (isReadOnly) {
    this.blockEditor.disableToolbarItems([
      'bold', 'italic', 'underline', 'formats', 
      'alignments', 'lists', 'insertions'
    ]);
  } else {
    this.blockEditor.enableToolbarItems([
      'bold', 'italic', 'underline', 'formats', 
      'alignments', 'lists', 'insertions'
    ]);
  }
}

// Disable based on user permissions
public configureToolbarForViewer(): void {
  // Disable all formatting tools for viewer role
  this.blockEditor.disableToolbarItems([
    'bold', 'italic', 'underline', 'strikethrough',
    'subscript', 'superscript', 'formats', 'alignments'
  ]);
}
```

---

### Combined Toolbar Control Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-toolbar-control',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <div class="toolbar-controls">
      <button (click)="setMode('edit')">Edit Mode</button>
      <button (click)="setMode('review')">Review Mode</button>
      <button (click)="setMode('view')">View Mode</button>
    </div>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class ToolbarControlComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  private allTools = [
    'bold', 'italic', 'underline', 'strikethrough',
    'subscript', 'superscript', 'formats', 'alignments',
    'lists', 'insertions', 'links'
  ];
  
  public setMode(mode: 'edit' | 'review' | 'view'): void {
    switch (mode) {
      case 'edit':
        // Enable all tools
        this.blockEditor.enableToolbarItems(this.allTools);
        break;
        
      case 'review':
        // Enable only formatting, disable insertions
        this.blockEditor.disableToolbarItems(['insertions', 'links']);
        this.blockEditor.enableToolbarItems([
          'bold', 'italic', 'underline', 'strikethrough'
        ]);
        break;
        
      case 'view':
        // Disable all tools
        this.blockEditor.disableToolbarItems(this.allTools);
        break;
    }
  }
}
```

---

## Print Method

### print Method

Prints all the block data.

**Syntax:**
```typescript
print(): void
```

**Parameters:** None

**Returns:** `void`

**Description:** Prints the editor content. This method triggers the browser's print dialog with the editor content.

**Use Cases:**
- Print document from editor
- Generate hard copies
- Export to PDF via print
- Print preview functionality

**Basic Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="printContent()">Print</button>
    <ejs-blockeditor #blockEditor></ejs-blockeditor>
  `
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  public printContent(): void {
    this.blockEditor.print();
  }
}
```

**Common Patterns:**

```typescript
// Print with confirmation
public printWithConfirmation(): void {
  const confirmed = confirm('Do you want to print this document?');
  if (confirmed) {
    this.blockEditor.print();
  }
}

// Print after save
public async saveAndPrint(): Promise<void> {
  await this.saveContent();
  this.blockEditor.print();
}

// Print specific state
public printForReview(): void {
  // Optionally modify view before printing
  this.blockEditor.print();
}
```

---
