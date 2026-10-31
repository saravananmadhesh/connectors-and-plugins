# Command Events & Customization

## Table of Contents
- [Click Event Handling](#click-event-handling)
- [HTML Attributes Customization](#html-attributes-customization)
- [CSS Class Customization](#css-class-customization)
- [Custom HTML Attributes](#custom-html-attributes)
- [Combining htmlAttributes and cssClass](#combining-htmlattributes-and-cssclass)
- [Event-Driven Patterns](#event-driven-patterns)

## Click Event Handling

Implement click event handlers for toolbar items using component methods.

### Basic Click Handler

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut' (click)="onCut()"></e-item>
        <e-item text='Copy' (click)="onCopy()"></e-item>
        <e-item text='Paste' (click)="onPaste()"></e-item>
      </e-items>
    </ejs-toolbar>
    <p>{{ message }}</p>
  `
})
export class AppComponent {
  message: string = '';

  onCut() {
    this.message = 'Cut executed';
  }

  onCopy() {
    this.message = 'Copy executed';
  }

  onPaste() {
    this.message = 'Paste executed';
  }
}
```

### Click with Item ID

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item id='btn_cut' text='Cut' (click)="handleClick('cut')"></e-item>
        <e-item id='btn_copy' text='Copy' (click)="handleClick('copy')"></e-item>
        <e-item id='btn_paste' text='Paste' (click)="handleClick('paste')"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  handleClick(command: string) {
    console.log(`Executing: ${command}`);
  }
}
```

## HTML Attributes Customization

The `htmlAttributes` property enables setting custom HTML attributes for toolbar commands.

### htmlAttributes Property

The `htmlAttributes` property accepts an object with HTML attributes:
- `class` - CSS classes (appended, not replaced)
- `id` - Element ID
- `style` - Inline CSS styles (replaced)
- `role` - ARIA role for accessibility
- `data-*` - Custom data attributes

### Basic htmlAttributes Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Bold' [htmlAttributes]="boldAttr"></e-item>
        <e-item text='Italic' [htmlAttributes]="italicAttr"></e-item>
        <e-item text='Underline' [htmlAttributes]="underAttr"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  boldAttr = { 'class': 'custom_bold', 'id': 'bold_btn' };
  italicAttr = { 'class': 'custom_italic', 'id': 'italic_btn' };
  underAttr = { 'class': 'custom_underline', 'id': 'under_btn' };
}
```

### htmlAttributes with Styles

```typescript
boldAttr = {
  'id': 'bold_button',
  'style': 'background-color: #ffeb3b; font-weight: bold;',
  'data-command': 'bold'
};
```

### htmlAttributes with Multiple Classes

> **Important:** Multiple CSS classes are appended to existing classes, not replaced. Existing style classes are preserved.

```typescript
boldAttr = {
  'class': 'custom_bold active-state hover-effect'
};
```

**Rendered HTML:**
```html
<!-- Original classes + new classes -->
<button class="e-btn e-tbar-btn custom_bold active-state hover-effect">Bold</button>
```

### htmlAttributes with ARIA Attributes

```typescript
boldAttr = {
  'role': 'button',
  'aria-label': 'Make text bold',
  'aria-pressed': 'false'
};

italicAttr = {
  'role': 'button',
  'aria-label': 'Make text italic'
};
```

## CSS Class Customization

Use the `cssClass` property for straightforward CSS class management.

### cssClass Property

The `cssClass` property adds one or more CSS classes to toolbar items without replacing existing classes.

### Single CSS Class

```typescript
<e-item text='Bold' cssClass='e-bold'></e-item>
<e-item text='Italic' cssClass='e-italic'></e-item>
<e-item text='Underline' cssClass='e-underline'></e-item>
```

### Multiple CSS Classes

```typescript
<e-item text='Bold' cssClass='e-bold active primary'></e-item>
<e-item text='Delete' cssClass='e-danger hover-red'></e-item>
<e-item text='Save' cssClass='e-success hover-green'></e-item>
```

### cssClass vs htmlAttributes

**Use `cssClass` when:**
- Adding simple CSS classes only
- No other HTML attributes needed
- Straightforward styling scenarios

**Use `htmlAttributes` when:**
- Setting multiple attributes (id, style, role, data-*)
- Need custom styling in inline style attribute
- Require ARIA attributes for accessibility

## Custom HTML Attributes

Comprehensive example with multiple custom attributes.

### Complete Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Bold' [htmlAttributes]='boldAttribute'></e-item>
        <e-item text='Italic' [htmlAttributes]='italicAttribute'></e-item>
        <e-item text='Underline' [htmlAttributes]='underAttribute'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Uppercase' cssClass='e-txt-casing'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  boldAttribute: any = {
    'class': 'custom_bold',
    'id': 'itemId',
    'data-command': 'bold',
    'title': 'Make text bold (Ctrl+B)'
  };

  italicAttribute: any = {
    'class': 'custom_italic',
    'id': 'italic_btn',
    'data-command': 'italic',
    'title': 'Make text italic (Ctrl+I)'
  };

  underAttribute: any = {
    'class': 'custom_underline',
    'id': 'under_btn',
    'data-command': 'underline',
    'title': 'Underline text (Ctrl+U)'
  };
}
```

### With Style Attributes

```typescript
boldAttribute: any = {
  'class': 'custom_bold',
  'id': 'bold_btn',
  'style': 'background-color: #fff3cd; border: 1px solid #ffc107;',
  'aria-label': 'Bold formatting',
  'aria-pressed': 'false'
};
```

## Combining htmlAttributes and cssClass

Both properties can be used together for complete customization.

### Combined Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Save'
                 cssClass='action-button'
                 [htmlAttributes]='saveAttr'
                 (click)="onSave()"></e-item>
        
        <e-item text='Delete'
                 cssClass='danger-button'
                 [htmlAttributes]='deleteAttr'
                 (click)="onDelete()"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  saveAttr = {
    'id': 'save_btn',
    'data-tooltip': 'Save document',
    'aria-label': 'Save'
  };

  deleteAttr = {
    'id': 'delete_btn',
    'data-tooltip': 'Delete selected items',
    'aria-label': 'Delete'
  };

  onSave() {
    console.log('Save clicked');
  }

  onDelete() {
    console.log('Delete clicked');
  }
}
```

**Result:**
- `cssClass` adds CSS styling classes
- `htmlAttributes` adds attributes and IDs
- Both work together without conflict

## Event-Driven Patterns

### Pattern 1: Command Dispatch

```typescript
handleCommand(command: string, payload?: any) {
  switch(command) {
    case 'cut':
      console.log('Cut:', payload);
      break;
    case 'copy':
      console.log('Copy:', payload);
      break;
    case 'paste':
      console.log('Paste:', payload);
      break;
  }
}
```

Template:
```typescript
<e-item text='Cut' (click)="handleCommand('cut')"></e-item>
<e-item text='Copy' (click)="handleCommand('copy')"></e-item>
<e-item text='Paste' (click)="handleCommand('paste')"></e-item>
```

### Pattern 2: Action Method Mapping

```typescript
actions = {
  cut: () => this.cutText(),
  copy: () => this.copyText(),
  paste: () => this.pasteText(),
  undo: () => this.undoAction(),
  redo: () => this.redoAction()
};

executeAction(actionKey: string) {
  const action = this.actions[actionKey];
  if (action) {
    action();
  }
}

cutText() { /* implementation */ }
copyText() { /* implementation */ }
pasteText() { /* implementation */ }
undoAction() { /* implementation */ }
redoAction() { /* implementation */ }
```

### Pattern 3: State-Based Customization

```typescript
getItemAttributes(itemId: string): any {
  const baseAttrs = {
    'id': `btn_${itemId}`,
    'class': 'custom-item'
  };

  if (this.isDisabled(itemId)) {
    return { ...baseAttrs, 'disabled': 'true' };
  }

  if (this.isActive(itemId)) {
    return { ...baseAttrs, 'class': 'custom-item active' };
  }

  return baseAttrs;
}
```

