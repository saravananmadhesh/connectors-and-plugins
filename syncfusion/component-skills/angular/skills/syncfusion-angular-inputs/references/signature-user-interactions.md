# User Interactions in Angular Signature Component

## Table of Contents
- [Overview](#overview)
- [Undo and Redo](#undo-and-redo)
- [Clear Method](#clear-method)
- [Disabled State](#disabled-state)
- [Read-only Mode](#read-only-mode)
- [Button State Management](#button-state-management)
- [Complete Interaction Example](#complete-interaction-example)

## Overview

The Signature component supports comprehensive user interactions to enhance the signing experience:

- **Undo/Redo** - Navigate through signature history
- **Clear** - Erase the signature
- **Disabled** - Prevent signature input
- **Read-only** - View-only mode

## Undo and Redo

### Action History System

The Signature component maintains a history of actions (snapshots) to support undo/redo functionality. Each stroke or action creates a snapshot for later recovery.

### Undo Method

Revert the last action by moving to the previous snapshot:

```typescript
undo(): void
```

**Example:**

```typescript
@Component({
  selector: 'app-undo',
  template: `
    <button (click)="undoLastAction()" [disabled]="!canUndo">Undo</button>
    <canvas ejs-signature #signature id="signature"></canvas>
  `
})
export class UndoComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  canUndo: boolean = false;

  undoLastAction(): void {
    if (this.signature?.canUndo()) {
      this.signature.undo();
    }
  }
}
```

### Redo Method

Repeat the last undone action by moving to the next snapshot:

```typescript
redo(): void
```

**Example:**

```typescript
redoLastAction(): void {
  if (this.signature?.canRedo()) {
    this.signature.redo();
  }
}
```

### Checking Undo/Redo Availability

Use `canUndo()` and `canRedo()` methods to check if undo/redo is available:

```typescript
canUndo(): boolean  // Returns true if undo history exists
canRedo(): boolean  // Returns true if redo history exists
```

**Example:**

```typescript
updateButtonStates(): void {
  const canUndoNow = this.signature?.canUndo() || false;
  const canRedoNow = this.signature?.canRedo() || false;

  this.undoButton.disabled = !canUndoNow;
  this.redoButton.disabled = !canRedoNow;
}
```

## Clear Method

### Erase All Strokes

The `clear()` method erases the entire signature and resets the canvas:

```typescript
clear(): void
```

**Important:** This action is tracked in the undo/redo history, so users can undo a clear operation.

**Example:**

```typescript
@Component({
  selector: 'app-clear',
  template: `
    <button (click)="clearSignature()" [disabled]="isEmpty">Clear</button>
    <canvas ejs-signature #signature id="signature"></canvas>
  `
})
export class ClearComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  isEmpty: boolean = true;

  clearSignature(): void {
    this.signature?.clear();
  }
}
```

### Checking if Empty

Use `isEmpty()` to check if the signature canvas is empty:

```typescript
isEmpty(): boolean  // Returns true if signature is empty
```

**Example:**

```typescript
canClearSignature(): void {
  if (!this.signature?.isEmpty()) {
    this.clearButton.disabled = false;
  } else {
    this.clearButton.disabled = true;
  }
}
```

## Disabled State

### Disable Signature Input

Use the `disabled` property to prevent user drawing and focus:

```typescript
disabled: boolean  // Default: false
```

When disabled:
- Users cannot draw on the canvas
- Component cannot receive focus
- Component appears with reduced opacity to indicate disabled state

**Example:**

```typescript
@Component({
  selector: 'app-disabled',
  template: `
    <label>
      <input type="checkbox" (change)="toggleDisabled($event)">
      Disable Signature
    </label>
    <canvas 
      ejs-signature 
      #signature 
      id="signature"
      [disabled]="isDisabled">
    </canvas>
  `
})
export class DisabledComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  isDisabled: boolean = false;

  toggleDisabled(event: any): void {
    this.isDisabled = event.target.checked;
    this.signature!.disabled = this.isDisabled;
  }
}
```

## Read-only Mode

### View-only Signature

Use the `isReadOnly` property to enable read-only mode:

```typescript
isReadOnly: boolean  // Default: false
```

When read-only:
- Component remains focusable
- Users cannot draw or modify the signature
- Allows viewing pre-loaded signatures
- Keyboard shortcuts are disabled

**Example:**

```typescript
@Component({
  selector: 'app-readonly',
  template: `
    <label>
      <input type="checkbox" (change)="toggleReadOnly($event)">
      Read-only Mode
    </label>
    <canvas 
      ejs-signature 
      #signature 
      id="signature"
      [isReadOnly]="isReadOnlyMode">
    </canvas>
  `
})
export class ReadOnlyComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  isReadOnlyMode: boolean = false;

  toggleReadOnly(event: any): void {
    this.isReadOnlyMode = event.target.checked;
    this.signature!.isReadOnly = this.isReadOnlyMode;
  }
}
```

## Button State Management

### Using Change Event

The `change` event fires when user completes signing or uses undo/redo/clear:

```typescript
(change)="handleSignatureChange()"
```

**Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { Button, getComponent } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-state-mgmt',
  template: `
    <div class="controls">
      <button #undoBtn (click)="undo()" disabled>Undo</button>
      <button #redoBtn (click)="redo()" disabled>Redo</button>
      <button #clearBtn (click)="clear()" disabled>Clear</button>
    </div>
    <canvas 
      ejs-signature 
      #signature 
      id="signature"
      (change)="updateButtonStates()">
    </canvas>
  `,
  styles: [`
    .controls {
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
    }
    
    button {
      padding: 8px 16px;
      cursor: pointer;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
    }
  `]
})
export class StateManagementComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  @ViewChild('undoBtn')
  public undoBtn?: any;

  @ViewChild('redoBtn')
  public redoBtn?: any;

  @ViewChild('clearBtn')
  public clearBtn?: any;

  updateButtonStates(): void {
    // Only update if not disabled
    if (this.signature?.disabled) {
      this.disableAllButtons();
      return;
    }

    // Undo button
    if (this.signature?.canUndo()) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }

    // Redo button
    if (this.signature?.canRedo()) {
      this.redoBtn.disabled = false;
    } else {
      this.redoBtn.disabled = true;
    }

    // Clear button
    if (!this.signature?.isEmpty()) {
      this.clearBtn.disabled = false;
    } else {
      this.clearBtn.disabled = true;
    }
  }

  disableAllButtons(): void {
    this.undoBtn.disabled = true;
    this.redoBtn.disabled = true;
    this.clearBtn.disabled = true;
  }

  undo(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.undo();
    }
  }

  redo(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.redo();
    }
  }

  clear(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.clear();
    }
  }
}
```

## Complete Interaction Example

Full example with all user interactions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule, CheckBoxModule],
  standalone: true,
  selector: 'app-full-interaction',
  template: `
    <div class="e-section-control">
      <div id="controls">
        <button ejs-button cssClass="e-primary" (click)="onUndo()" #undoBtn disabled>
          UNDO
        </button>
        <button ejs-button cssClass="e-primary" (click)="onRedo()" #redoBtn disabled>
          REDO
        </button>
        <button ejs-button cssClass="e-primary" (click)="onClear()" #clearBtn disabled>
          CLEAR
        </button>
        
        <span style="margin: 0 10px;">|</span>
        
        <label>
          <input type="checkbox" (change)="onDisableChange($event)">
          Disable
        </label>
        <label>
          <input type="checkbox" (change)="onReadOnlyChange($event)">
          Read-only
        </label>
      </div>
      
      <div id="signature-control">
        <canvas 
          ejs-signature 
          #signature 
          id="signature"
          (change)="updateButtonStates()">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    .e-section-control {
      padding: 20px;
    }
    
    #controls {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    
    button {
      padding: 8px 16px;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    label {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }
    
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
      max-width: 600px;
    }
  `]
})
export class FullInteractionComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  @ViewChild('undoBtn')
  public undoBtn?: any;

  @ViewChild('redoBtn')
  public redoBtn?: any;

  @ViewChild('clearBtn')
  public clearBtn?: any;

  onUndo(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.undo();
    }
  }

  onRedo(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.redo();
    }
  }

  onClear(): void {
    if (!this.signature?.disabled && !this.signature?.isReadOnly) {
      this.signature?.clear();
    }
  }

  onDisableChange(event: any): void {
    this.signature!.disabled = event.target.checked;
    if (event.target.checked) {
      this.disableAllButtons();
    } else {
      this.updateButtonStates();
    }
  }

  onReadOnlyChange(event: any): void {
    this.signature!.isReadOnly = event.target.checked;
    if (event.target.checked) {
      this.disableAllButtons();
    } else {
      this.updateButtonStates();
    }
  }

  updateButtonStates(): void {
    if (this.signature?.disabled || this.signature?.isReadOnly) {
      this.disableAllButtons();
      return;
    }

    this.undoBtn.disabled = !this.signature?.canUndo();
    this.redoBtn.disabled = !this.signature?.canRedo();
    this.clearBtn.disabled = this.signature?.isEmpty() || false;
  }

  disableAllButtons(): void {
    this.undoBtn.disabled = true;
    this.redoBtn.disabled = true;
    this.clearBtn.disabled = true;
  }
}
```

## State Management Summary

| State | Method | Behavior |
|-------|--------|----------|
| **Drawing** | Normal drawing operations | Undo/redo available, buttons enabled |
| **Undo Available** | `canUndo() = true` | Undo button enabled, restore previous snapshot |
| **Redo Available** | `canRedo() = true` | Redo button enabled, move to next snapshot |
| **Empty** | `isEmpty() = true` | Clear button disabled |
| **Disabled** | `disabled = true` | All buttons disabled, no drawing |
| **Read-only** | `isReadOnly = true` | All buttons disabled, can view only |

## Best Practices

1. **Always check state before action:** Use `canUndo()`, `canRedo()`, `isEmpty()` before enabling buttons
2. **Prevent conflicts:** Disable operations when component is disabled or read-only
3. **Update on change:** Listen to `change` event to keep buttons synchronized
4. **User feedback:** Show visual indication when buttons are disabled
5. **Keyboard integration:** Combine with keyboard shortcuts for complete accessibility
