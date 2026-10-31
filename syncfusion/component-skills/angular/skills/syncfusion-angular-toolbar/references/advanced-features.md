# Advanced Features

## Table of Contents
- [Button Grouping](#button-grouping)
- [Accessibility Features](#accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [RTL Support](#rtl-support)
- [Performance Optimization](#performance-optimization)
- [WAI-ARIA Compliance](#wai-aria-compliance)

## Button Grouping

Group related toolbar buttons together using separators for visual organization and improved UX.

### Basic Button Groups

```typescript
<ejs-toolbar>
  <e-items>
    <!-- File operations group -->
    <e-item text='New' prefixIcon='e-icons e-new'></e-item>
    <e-item text='Open' prefixIcon='e-icons e-open'></e-item>
    <e-item text='Save' prefixIcon='e-icons e-save'></e-item>
    <e-item type='Separator'></e-item>

    <!-- Edit operations group -->
    <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
    <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
    <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
    <e-item type='Separator'></e-item>

    <!-- Undo/Redo group -->
    <e-item text='Undo' prefixIcon='e-icons e-undo'></e-item>
    <e-item text='Redo' prefixIcon='e-icons e-redo'></e-item>
    <e-item type='Separator'></e-item>

    <!-- Formatting group -->
    <e-item text='Bold' prefixIcon='e-icons e-bold'></e-item>
    <e-item text='Italic' prefixIcon='e-icons e-italic'></e-item>
    <e-item text='Underline' prefixIcon='e-icons e-underline'></e-item>
  </e-items>
</ejs-toolbar>
```

### Group Styling

```css
/* Visual styling for groups */
.e-toolbar .e-toolbar-item:not(.e-separator) {
  margin-right: 2px;
}

.e-toolbar .e-toolbar-item.e-separator {
  height: 24px;
  margin: 0 4px;
  background: #ddd;
  width: 1px;
  min-width: 1px;
  min-height: auto;
}
```

## Accessibility Features

The Syncfusion Toolbar provides built-in accessibility compliance with WAI-ARIA specifications.

### Accessibility Highlights

- Keyboard navigation support (Tab, Arrows, Enter)
- ARIA attributes for screen readers
- Focus indicators for visual navigation
- Semantic HTML for assistive technologies
- Color-independent visual indicators

## Keyboard Navigation

Navigate toolbar items without mouse using keyboard shortcuts.

### Default Navigation Keys

| Key | Action |
|-----|--------|
| **Tab** | Move to next focusable item (with tabIndex) |
| **Shift+Tab** | Move to previous focusable item |
| **Right Arrow** | Move to next item in toolbar |
| **Left Arrow** | Move to previous item in toolbar |
| **Enter/Space** | Activate current item |
| **Home** | Jump to first item |
| **End** | Jump to last item |

### Keyboard Navigation Example

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
        <!-- Items with tabIndex for tab key navigation -->
        <e-item text='Cut' tabIndex="1" (keydown)="onKeyDown($event)"></e-item>
        <e-item text='Copy' tabIndex="2" (keydown)="onKeyDown($event)"></e-item>
        <e-item text='Paste' tabIndex="3" (keydown)="onKeyDown($event)"></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Undo' tabIndex="4" (keydown)="onKeyDown($event)"></e-item>
        <e-item text='Redo' tabIndex="5" (keydown)="onKeyDown($event)"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle activation
      console.log('Item activated:', target.textContent);
    }
  }
}
```

### Tab Key Navigation with tabIndex

```typescript
<e-item text='Item 1' tabIndex="1"></e-item>
<e-item text='Item 2' tabIndex="2"></e-item>
<e-item text='Item 3' tabIndex="3"></e-item>
```

Users can press Tab repeatedly to cycle through items in tabIndex order.

## RTL Support

Right-to-left language support for Arabic, Hebrew, and other RTL languages.

### Enable RTL

```typescript
<ejs-toolbar enableRtl="true">
  <e-items>
    <e-item text='قص' prefixIcon='e-icons e-cut'></e-item>
    <e-item text='نسخ' prefixIcon='e-icons e-copy'></e-item>
    <e-item text='لصق' prefixIcon='e-icons e-paste'></e-item>
  </e-items>
</ejs-toolbar>
```

### RTL Component Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar [enableRtl]="isRtlMode">
      <e-items>
        <e-item text='تحرير' prefixIcon='e-icons e-edit'></e-item>
        <e-item text='حذف' prefixIcon='e-icons e-delete'></e-item>
        <e-item text='حفظ' prefixIcon='e-icons e-save'></e-item>
      </e-items>
    </ejs-toolbar>

    <button (click)="toggleRtl()">Toggle RTL</button>
  `
})
export class AppComponent {
  isRtlMode: boolean = false;

  toggleRtl() {
    this.isRtlMode = !this.isRtlMode;
  }
}
```

### RTL CSS Adjustments

```css
/* RTL-specific toolbar direction */
.e-rtl .e-toolbar {
  direction: rtl;
}

.e-rtl .e-toolbar .e-toolbar-item {
  direction: rtl;
}

/* Icon positioning in RTL mode */
.e-rtl .e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  margin-left: 6px;
  margin-right: 0;
}
```

## Performance Optimization

Optimize toolbar performance for applications with many items or frequent updates.

### Lazy Loading Items

```typescript
export class AppComponent {
  toolbarItems: any[] = [];

  ngOnInit() {
    // Load initial items
    this.loadInitialItems();
  }

  loadInitialItems() {
    this.toolbarItems = [
      { text: 'Cut', prefixIcon: 'e-icons e-cut' },
      { text: 'Copy', prefixIcon: 'e-icons e-copy' },
      { text: 'Paste', prefixIcon: 'e-icons e-paste' }
    ];
  }

  addMoreItems() {
    // Load additional items on demand
    const moreItems = [
      { text: 'Undo', prefixIcon: 'e-icons e-undo' },
      { text: 'Redo', prefixIcon: 'e-icons e-redo' }
    ];
    this.toolbarItems = [...this.toolbarItems, ...moreItems];
  }
}
```

### Dynamic Item Updates

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
      </e-items>
    </ejs-toolbar>

    <button (click)="addItem()">Add Item</button>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar?: ToolbarComponent;

  addItem() {
    if (this.toolbar?.toolbarItems) {
      this.toolbar.toolbarItems = [
        ...this.toolbar.toolbarItems,
        { text: 'New Item' }
      ];
    }
  }
}
```

### Virtual Scrolling (for very long toolbars)

Use virtualization for toolbars with hundreds of items:

```typescript
export class AppComponent {
  toolbarItems: any[] = [];

  ngOnInit() {
    // Generate large dataset
    this.toolbarItems = Array.from({ length: 1000 }, (_, i) => ({
      text: `Item ${i + 1}`,
      id: `item-${i}`
    }));
  }
}
```

## WAI-ARIA Compliance

The toolbar implements WAI-ARIA attributes for accessibility.

### ARIA Attributes

```typescript
<ejs-toolbar role="toolbar" aria-label="Text formatting toolbar">
  <e-items>
    <e-item text='Bold'
            role='button'
            aria-label='Bold (Ctrl+B)'
            aria-pressed='false'>
    </e-item>
    <e-item text='Italic'
            role='button'
            aria-label='Italic (Ctrl+I)'
            aria-pressed='false'>
    </e-item>
    <e-item text='Underline'
            role='button'
            aria-label='Underline (Ctrl+U)'
            aria-pressed='false'>
    </e-item>
  </e-items>
</ejs-toolbar>
```

### ARIA Live Regions

```typescript
<div aria-live="polite" aria-atomic="true" id="toolbar-status">
  {{ statusMessage }}
</div>

<ejs-toolbar>
  <e-items>
    <e-item text='Save'
            (click)="onSave()"
            aria-label='Save document'>
    </e-item>
  </e-items>
</ejs-toolbar>
```

Component:
```typescript
export class AppComponent {
  statusMessage: string = '';

  onSave() {
    // Perform save operation
    this.statusMessage = 'Document saved successfully';
  }
}
```

### Complete Accessible Toolbar Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <!-- Accessible toolbar container -->
    <ejs-toolbar role="toolbar" 
                  aria-label="Document formatting toolbar"
                  [items]="items">
      <e-items>
        <!-- Formatting tools with accessible labels -->
        <e-item text='Bold'
                id='btn-bold'
                role='button'
                aria-label='Bold text (Keyboard: Ctrl+B)'
                aria-pressed='false'
                tabIndex="0"
                (click)="toggleBold()"
                (keydown)="handleKeyPress($event, 'bold')">
        </e-item>

        <e-item text='Italic'
                id='btn-italic'
                role='button'
                aria-label='Italic text (Keyboard: Ctrl+I)'
                aria-pressed='false'
                tabIndex="0"
                (click)="toggleItalic()"
                (keydown)="handleKeyPress($event, 'italic')">
        </e-item>

        <e-item text='Underline'
                id='btn-underline'
                role='button'
                aria-label='Underline text (Keyboard: Ctrl+U)'
                aria-pressed='false'
                tabIndex="0"
                (click)="toggleUnderline()"
                (keydown)="handleKeyPress($event, 'underline')">
        </e-item>

        <e-item type='Separator'></e-item>

        <!-- File operations -->
        <e-item text='Save'
                id='btn-save'
                role='button'
                aria-label='Save document (Keyboard: Ctrl+S)'
                tabIndex="0"
                (click)="onSave()"
                (keydown)="handleKeyPress($event, 'save')">
        </e-item>
      </e-items>
    </ejs-toolbar>

    <!-- Status message for screen readers -->
    <div class="sr-only" 
         role="status" 
         aria-live="polite" 
         aria-atomic="true">
      {{ accessibilityMessage }}
    </div>
  `
})
export class AppComponent {
  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean = false;
  accessibilityMessage: string = '';
  items: any[] = [];

  toggleBold() {
    this.isBold = !this.isBold;
    this.accessibilityMessage = `Bold ${this.isBold ? 'enabled' : 'disabled'}`;
  }

  toggleItalic() {
    this.isItalic = !this.isItalic;
    this.accessibilityMessage = `Italic ${this.isItalic ? 'enabled' : 'disabled'}`;
  }

  toggleUnderline() {
    this.isUnderline = !this.isUnderline;
    this.accessibilityMessage = `Underline ${this.isUnderline ? 'enabled' : 'disabled'}`;
  }

  onSave() {
    this.accessibilityMessage = 'Document saved';
  }

  handleKeyPress(event: KeyboardEvent, action: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switch(action) {
        case 'bold':
          this.toggleBold();
          break;
        case 'italic':
          this.toggleItalic();
          break;
        case 'underline':
          this.toggleUnderline();
          break;
        case 'save':
          this.onSave();
          break;
      }
    }
  }
}
```

### Accessibility CSS

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus indicators */
.e-toolbar .e-tbar-btn:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  .e-toolbar .e-tbar-btn {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .e-toolbar * {
    animation: none !important;
    transition: none !important;
  }
}
```

