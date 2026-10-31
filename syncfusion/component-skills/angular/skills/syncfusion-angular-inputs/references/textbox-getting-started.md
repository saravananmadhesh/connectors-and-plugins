# Getting Started with Angular TextBox

This guide walks you through setting up and creating your first Syncfusion Angular TextBox component.

## Installation and Package Setup

### Step 1: Install Required Packages

The recommended way to install the TextBox component is using the Angular CLI `ng add` command, which automatically installs the package, registers the default theme in `angular.json`, and imports the module:

```bash
ng add @syncfusion/ej2-angular-inputs
```

Alternatively, install manually:

```bash
npm install @syncfusion/ej2-angular-inputs
```

**Dependency Chain:**
```
|-- @syncfusion/ej2-angular-inputs
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-inputs
        |-- @syncfusion/ej2-base
        |-- @syncfusion/ej2-buttons
        |-- @syncfusion/ej2-popups
        |-- @syncfusion/ej2-splitbuttons
```

### Step 2: Import the Module

In your Angular component, import `TextBoxModule`:

```typescript
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  // ...
})
export class MyComponent {}
```

**For Non-Standalone Components:**
```typescript
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [TextBoxModule],
  // ...
})
export class AppModule { }
```

---

## Create Your First TextBox Component

### Basic TextBox

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-textbox-demo',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Basic TextBox</h2>
      <ejs-textbox 
        placeholder="Enter your name"
      ></ejs-textbox>
    </div>
  `
})
export class TextBoxDemoComponent {}
```

**Result:** A simple input field with placeholder text.

### Add Icons to TextBox Using addIcon Method

Icons can be added to the TextBox using the [`addIcon`](references/api.md#addicon) method within the [`created`](references/api.md#created) event. The method accepts a `position` (`'append'` or `'prepend'`) and a CSS class string.

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-textbox-icon',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <ejs-textbox #textbox placeholder="Enter Date" (created)="onCreate()"></ejs-textbox>
  `
})
export class TextBoxIconComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public onCreate(): void {
    this.textboxObj.addIcon('append', 'e-icons e-input-group-icon e-input-popup-date');
  }
}
```

```css
.e-input-group-icon.e-input-popup-date::before {
  content: "\e901";
}
```

**Supported icon positions:** `'append'` (after input) | `'prepend'` (before input)

### TextBox with Two-Way Binding

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textbox-binding',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <h2>TextBox with Data Binding</h2>
      <ejs-textbox 
        [(ngModel)]="userName"
        placeholder="Enter your name"
      ></ejs-textbox>
      <p>Your name: {{ userName }}</p>
    </div>
  `
})
export class TextBoxBindingComponent {
  userName = '';
}
```

**Key Points:**
- Use `[(ngModel)]` for two-way binding
- Import `FormsModule` for ngModel support
- Component automatically updates when user types

---

## CSS Imports and Theme Selection

### Import Styles

Add CSS imports to your global `styles.css` or `angular.json` styles array. Import in dependency order:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/textbox/index.css";
```

> **Note:** Ensure the import order aligns with the component's dependency sequence.

When you run `ng add @syncfusion/ej2-angular-inputs`, the Material theme is registered in `angular.json` automatically.

### Available Themes

Syncfusion provides multiple themes. Replace `material3` with the desired theme name:

```css
/* Material 3 (recommended) */
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';

/* Material */
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';

/* Bootstrap 5 */
@import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';

/* Fluent 2 */
@import '../node_modules/@syncfusion/ej2-inputs/styles/fluent2.css';

/* Tailwind 3 */
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
```

**Theme Selection Tips:**
- Material 3: Latest Google Material Design
- Bootstrap 5: Classic Bootstrap styling
- Fluent 2: Microsoft Fluent UI design
- Tailwind 3: Tailwind-based lightweight styling

---

## Floating Label Implementation

### Auto Floating Label

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-float-label',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Floating Label TextBox</h2>
      <ejs-textbox 
        placeholder="Enter your email"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class FloatLabelComponent {}
```

**Behavior:**
- Label appears on top when input is focused
- Label floats up when user starts typing
- Label remains above if input has value
- Label returns to placeholder position when empty and unfocused

### Always Floating Label

```typescript
<ejs-textbox 
  placeholder="Full Name"
  [floatLabelType]="'Always'"
></ejs-textbox>
```

**Behavior:**
- Label always appears above input
- Never collapses into placeholder
- Useful for dense forms or specific designs

### Never Floating Label

```typescript
<ejs-textbox 
  placeholder="Phone Number"
  [floatLabelType]="'Never'"
></ejs-textbox>
```

**Behavior:**
- Traditional placeholder approach
- No floating animation

---

## Basic Event Binding and Data Binding

### Input Event

```typescript
import { Component } from '@angular/core';
import { TextBoxModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-input-event',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        (input)="onInput($event)"
        placeholder="Type something..."
      ></ejs-textbox>
      <p>Current value: {{ currentValue }}</p>
      <p>Character count: {{ currentValue.length }}</p>
    </div>
  `
})
export class InputEventComponent {
  currentValue = '';

  onInput(args: InputEventArgs) {
    this.currentValue = args.value;
  }
}
```

**Use Case:** Real-time character counting, dynamic validation, live search.

### Change Event

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-change-event',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        (change)="onChange($event)"
        placeholder="Enter value"
      ></ejs-textbox>
      <p *ngIf="lastChanged">Last changed: {{ lastChanged }}</p>
    </div>
  `
})
export class ChangeEventComponent {
  lastChanged = '';

  onChange(event: any) {
    this.lastChanged = new Date().toLocaleTimeString();
  }
}
```

**Difference from Input Event:**
- `input` fires on every keystroke
- `change` fires only when focus leaves the field

### Focus and Blur Events

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-focus-events',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        (focus)="onFocus()"
        (blur)="onBlur()"
        placeholder="Click to focus"
        [cssClass]="isFocused ? 'focused' : ''"
      ></ejs-textbox>
      <p>{{ status }}</p>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.focused {
      border-color: blue;
    }
  `]
})
export class FocusEventsComponent {
  isFocused = false;
  status = 'Not focused';

  onFocus() {
    this.isFocused = true;
    this.status = 'Field is focused';
  }

  onBlur() {
    this.isFocused = false;
    this.status = 'Field lost focus';
  }
}
```

---

## Common Setup Issues and Solutions

### Issue 1: Module Not Found

**Error:** `Can't resolve '@syncfusion/ej2-angular-inputs'`

**Solution:**
```bash
npm install @syncfusion/ej2-angular-inputs
npm install --save-dev @angular/cli
```

**Verify in `package.json`:**
```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-inputs": "^xx.x.x"
  }
}
```

### Issue 2: Styles Not Applied

**Problem:** TextBox appears unstyled

**Solution:** Ensure CSS is imported:

```typescript
// In component
import '@syncfusion/ej2-inputs/styles/material.css';

// Or in global styles.css
@import '@syncfusion/ej2-inputs/styles/material.css';
```

### Issue 3: Two-Way Binding Not Working

**Error:** ngModel not updating component property

**Solution:**
1. Import `FormsModule`
2. Use `[(ngModel)]="property"` syntax
3. Ensure component is standalone: `standalone: true`

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [TextBoxModule, FormsModule],
  // ...
})
```

### Issue 4: Floating Label Not Appearing

**Problem:** Placeholder doesn't float

**Solution:** Use correct property name and value:

```typescript
// ❌ Wrong
<ejs-textbox floatLabel="auto"></ejs-textbox>

// ✅ Correct
<ejs-textbox [floatLabelType]="'Auto'"></ejs-textbox>
```

### Issue 5: Performance Issues with Large Forms

**Problem:** Form with many TextBox instances loads slowly

**Solution:**
- Use `ChangeDetectionStrategy.OnPush` for parent component
- Lazy load unused components
- Use `trackBy` in `*ngFor` loops

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

---

## Next Steps

- Explore [input-features.md](input-features.md) to learn about clear buttons, disabled states, and HTML attributes
- Check [adornments-customization.md](adornments-customization.md) for adding icons and custom elements
- Review [styling-appearance.md](styling-appearance.md) for theme customization
- Study [validation-states.md](validation-states.md) for form validation patterns

