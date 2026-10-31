# Style, Appearance & Customization

## Table of Contents
- [Float Label Types](#float-label-types)
- [Custom CSS Class](#custom-css-class)
- [CSS Overrides](#css-overrides)
- [Cursor Position on Focus](#cursor-position-on-focus)
- [Numeric Keypad on Mobile](#numeric-keypad-on-mobile)
- [Additional Properties](#additional-properties)

## Float Label Types

Control how the placeholder/label floats with `floatLabelType`:

| Value | Behavior |
|-------|----------|
| `"Never"` (default) | Placeholder does not float; stays inside the input |
| `"Always"` | Label always floats above the input |
| `"Auto"` | Label floats above when focused or when a value is entered |

### Template

```html
<!-- Placeholder floats when focused or has value -->
<ejs-maskedtextbox
  mask="000-000-0000"
  placeholder="Phone Number"
  floatLabelType="Auto">
</ejs-maskedtextbox>

<!-- Label always floats above -->
<ejs-maskedtextbox
  mask="000-000-0000"
  placeholder="Phone Number"
  floatLabelType="Always">
</ejs-maskedtextbox>
```

## Custom CSS Class

Use `cssClass` to apply a custom CSS class to the MaskedTextBox root element for targeted styling.

### Component

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  userIdMask: string = '00000';
  userIdValue: string = '42648';

  onFocus(args: any): void {
    console.log('Input focused');
  }
}
```

### Template

```html
<ejs-maskedtextbox
  [mask]="userIdMask"
  [value]="userIdValue"
  cssClass="e-style"
  placeholder="Enter user ID"
  floatLabelType="Always"
  (focus)="onFocus($event)">
</ejs-maskedtextbox>
```

### CSS

```css
.e-input-group input.e-style,
.e-input-group.e-control-wrapper input.e-style {
  font-size: 16px;
  font-weight: 500;
  border-color: #2196f3;
  color: #333;
}

.e-input-group input.e-style:focus,
.e-input-group.e-control-wrapper input.e-style:focus {
  border-color: #1976d2;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
}
```

## CSS Overrides

### Wrapper Element (height, font size, border)

```css
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
  font-size: 20px;
  border-color: red;
  height: 40px;
  border: 2px solid;
}
```

### Hover State

```css
.e-input-group input.e-input,
.e-input-group input.e-input:hover:not(.e-success):not(.e-warning):not(.e-error):not([disabled]):not(:focus),
.e-input-group.e-control-wrapper input.e-input,
.e-input-group.e-control-wrapper input.e-input:hover:not(.e-success):not(.e-warning):not(.e-error):not([disabled]):not(:focus) {
  border: 3px solid red;
}
```

## Cursor Position on Focus

By default, MaskedTextBox selects the entire mask on focus. Use the `focus` event handler to override cursor placement.

### Available properties in focus event args

| Property | Type | Description |
|----------|------|-------------|
| `selectionStart` | number | Starting position of the cursor selection |
| `selectionEnd` | number | Ending position of the cursor selection |
| `maskedValue` | string | The full masked string including literals |

### Cursor at Start

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  zipMask: string = '00000-00000';
  zipValue: string = '83929-4342';

  onFocusStart(args: any): void {
    args.selectionEnd = args.selectionStart = 0;
  }
}
```

```html
<ejs-maskedtextbox
  [mask]="zipMask"
  [value]="zipValue"
  placeholder="Cursor at start"
  floatLabelType="Always"
  (focus)="onFocusStart($event)">
</ejs-maskedtextbox>
```

### Cursor at End

```typescript
onFocusEnd(args: any): void {
  args.selectionStart = args.selectionEnd = args.maskedValue.length;
}
```

### Cursor at Specific Position

```typescript
onFocusPosition(args: any): void {
  args.selectionStart = 3;
  args.selectionEnd = 3;
}
```

### Multiple Inputs with Different Cursor Behaviors

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  zipMask: string = '00000-00000';

  focusStart(args: any): void {
    args.selectionEnd = args.selectionStart = 0;
  }

  focusEnd(args: any): void {
    args.selectionStart = args.selectionEnd = args.maskedValue.length;
  }

  focusAt3(args: any): void {
    args.selectionStart = 3;
    args.selectionEnd = 3;
  }
}
```

```html
<ejs-maskedtextbox
  [mask]="zipMask"
  value="93828-32132"
  placeholder="Default cursor"
  floatLabelType="Always">
</ejs-maskedtextbox>

<ejs-maskedtextbox
  [mask]="zipMask"
  value="83929-4342"
  placeholder="Cursor at start"
  floatLabelType="Always"
  (focus)="focusStart($event)">
</ejs-maskedtextbox>

<ejs-maskedtextbox
  [mask]="zipMask"
  value="83929-3213"
  placeholder="Cursor at end"
  floatLabelType="Always"
  (focus)="focusEnd($event)">
</ejs-maskedtextbox>

<ejs-maskedtextbox
  mask="+1 000-000-0000"
  value="234-432-432"
  placeholder="Cursor at position 3"
  floatLabelType="Always"
  (focus)="focusAt3($event)">
</ejs-maskedtextbox>
```

> **Note:** When all mask positions are filled, `selectionStart` and `selectionEnd` default to `0` (HTML5 input behavior). This is expected.

## Numeric Keypad on Mobile

By default, MaskedTextBox shows an alphanumeric keyboard on mobile. To show only the numeric keypad, set the HTML `type` attribute to `tel` via `htmlAttributes`:

### Component

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  phoneMask: string = '999-99999';
  phoneValue: string = '342-45432';
  htmlAttr: any = { type: 'tel' };
}
```

### Template

```html
<ejs-maskedtextbox
  [mask]="phoneMask"
  [value]="phoneValue"
  [htmlAttributes]="htmlAttr"
  placeholder="Phone Number">
</ejs-maskedtextbox>
```

> Setting `htmlAttributes` with `type: 'tel'` triggers a numeric keypad on iOS and Android while preserving mask behavior.

## Additional Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | boolean | `true` | Enables or disables the component |
| `readonly` | boolean | `false` | Makes the input read-only |
| `showClearButton` | boolean | `false` | Shows a clear (×) icon inside the input |
| `enableRtl` | boolean | `false` | Renders the component right-to-left |
| `width` | number \| string | `null` | Sets the width of the component |
| `enablePersistence` | boolean | `false` | Persists the `value` state across page reloads |

### Disabled State

```html
<ejs-maskedtextbox
  mask="000-000-0000"
  placeholder="Phone Number"
  [enabled]="false">
</ejs-maskedtextbox>
```

### Read-Only State

```html
<ejs-maskedtextbox
  mask="000-000-0000"
  value="123-456-7890"
  [readonly]="true">
</ejs-maskedtextbox>
```

### Show Clear Button

```html
<ejs-maskedtextbox
  mask="000-000-0000"
  placeholder="Phone Number"
  [showClearButton]="true">
</ejs-maskedtextbox>
```

## Reference Documentation

For complete style and customization documentation, visit:
https://ej2.syncfusion.com/angular/documentation/maskedtextbox/style-appearance
