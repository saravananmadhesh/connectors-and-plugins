# API Reference — Syncfusion Angular TextArea

Source: https://ej2.syncfusion.com/angular/documentation/api/textarea/index-default

## Table of Contents
- [Component Selector](#component-selector)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enum Types](#enum-types)

---

## Component Selector

```html
<ejs-textarea [value]="value"></ejs-textarea>
```

**Module import:**
```typescript
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';
```

---

## Properties

### adornmentFlow
**Type:** `AdornmentsDirection` (`'Horizontal' | 'Vertical'`)  
**Default:** `'Horizontal'`

Specifies the adornment direction of textarea. Controls the flow of the textarea and adornment sections (horizontal vs vertical).

```html
<ejs-textarea adornmentFlow="Vertical"></ejs-textarea>
```

---

### adornmentOrientation
**Type:** `AdornmentsDirection` (`'Horizontal' | 'Vertical'`)  
**Default:** `'Horizontal'`

Specifies the adornment orientation of textarea. Controls the direction of adornment items relative to each other within their region.

```html
<ejs-textarea adornmentOrientation="Vertical"></ejs-textarea>
```

---

### appendTemplate
**Type:** `string | object`  
**Default:** `null`

Specifies the HTML template to append inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```typescript
appendTemplate: string = '<button class="e-btn">Submit</button>';
```
```html
<ejs-textarea [appendTemplate]="appendTemplate"></ejs-textarea>
```

---

### cols
**Type:** `number`  
**Default:** (browser default)

Specifies the visible width of the textarea, measured in average character widths.

```html
<ejs-textarea [cols]="60"></ejs-textarea>
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Specifies a CSS class value appended to the wrapper of the TextArea. Use to apply custom styles or built-in variants (`e-small`, `e-bigger`, `e-filled`, `e-outline`, `e-static-clear`).

```html
<ejs-textarea cssClass="e-outline e-bigger"></ejs-textarea>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the TextArea `value` state between page reloads via localStorage.

```html
<ejs-textarea [enablePersistence]="true"></ejs-textarea>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left direction.

```html
<ejs-textarea [enableRtl]="true"></ejs-textarea>
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Specifies whether the TextArea allows user interaction. Set to `false` to disable the component.

```html
<ejs-textarea [enabled]="false"></ejs-textarea>
```

---

### floatLabelType
**Type:** `FloatLabelType` (`'Never' | 'Always' | 'Auto'`)  
**Default:** `'Never'`

Specifies the floating label behavior of the TextArea placeholder text.
- `'Never'` — placeholder text never floats
- `'Always'` — placeholder text always floats above
- `'Auto'` — placeholder text floats while focusing or on value entry

```html
<ejs-textarea floatLabelType="Auto" placeholder="Enter text"></ejs-textarea>
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Adds additional HTML attributes to the textarea element. If both this property and an equivalent component property are set, the component property takes precedence.

```typescript
htmlAttrs = { 'aria-label': 'Comments', 'data-id': 'comment-box' };
```
```html
<ejs-textarea [htmlAttributes]="htmlAttrs"></ejs-textarea>
```

---

### locale
**Type:** `string`  
**Default:** `''` (uses global culture `'en-US'`)

Overrides the global culture and localization value for this component.

```html
<ejs-textarea locale="de"></ejs-textarea>
```

---

### maxLength
**Type:** `number`  
**Default:** (no limit)

Specifies the maximum number of characters allowed in the TextArea. Prevents further input when the limit is reached.

```html
<ejs-textarea [maxLength]="500"></ejs-textarea>
```

---

### placeholder
**Type:** `string`  
**Default:** `null`

Specifies the text shown as a hint/placeholder until the user focuses or enters a value. Behavior depends on the `floatLabelType` property.

```html
<ejs-textarea placeholder="Enter your comments"></ejs-textarea>
```

---

### prependTemplate
**Type:** `string | object`  
**Default:** `null`

Specifies the HTML template to prepend inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```typescript
prependTemplate: string = '<span class="e-icons e-edit"></span>';
```
```html
<ejs-textarea [prependTemplate]="prependTemplate"></ejs-textarea>
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

Specifies whether the TextArea allows user to change the text. When `true`, content is displayed but not editable.

```html
<ejs-textarea [readonly]="true" value="Non-editable content"></ejs-textarea>
```

---

### resizeMode
**Type:** `Resize` (`'Both' | 'Vertical' | 'Horizontal' | 'None'`)  
**Default:** `'Both'`

Specifies the resize mode of the textarea.
- `'Both'` — resize vertically and horizontally
- `'Vertical'` — resize height only
- `'Horizontal'` — resize width only
- `'None'` — disable resizing

```html
<ejs-textarea resizeMode="Vertical"></ejs-textarea>
```

---

### rows
**Type:** `number`  
**Default:** (browser default)

Specifies the visible height of the textarea, measured in lines.

```html
<ejs-textarea [rows]="5"></ejs-textarea>
```

---

### showClearButton
**Type:** `boolean`  
**Default:** `false`

Specifies whether the clear button (×) is displayed in the TextArea. The button appears when the textarea has a value.

```html
<ejs-textarea [showClearButton]="true"></ejs-textarea>
```

---

### value
**Type:** `string`  
**Default:** `null`

Sets the content of the TextArea.

```html
<ejs-textarea value="Initial content"></ejs-textarea>
```

---

### width
**Type:** `number | string`  
**Default:** `null`

Specifies the width of the TextArea component. Accepts a number (pixels) or a string with CSS units.

```html
<ejs-textarea [width]="400"></ejs-textarea>
<ejs-textarea width="100%"></ejs-textarea>
```

---

## Methods

### addAttributes

Adds multiple attributes as key-value pairs to the TextArea element.

**Signature:** `addAttributes(attributes: { [key: string]: string }): void`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

this.textarea.addAttributes({
  'data-custom': 'value',
  'aria-describedby': 'help-text'
});
```

---

### destroy

Removes the component from the DOM and detaches all related event handlers. Restores the initial textarea element.

**Signature:** `destroy(): void`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

this.textarea.destroy();
```

---

### focusIn

Sets focus to the textarea element for user interaction.

**Signature:** `focusIn(): void`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

this.textarea.focusIn(); // Programmatically focus
```

---

### focusOut

Removes focus from the textarea element.

**Signature:** `focusOut(): void`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

this.textarea.focusOut(); // Programmatically blur
```

---

### getPersistData

Gets the properties to be maintained in the persisted state. Returns a JSON string of persisted properties.

**Signature:** `getPersistData(): string`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

const persistedData: string = this.textarea.getPersistData();
console.log(persistedData); // e.g., '{"value":"some text"}'
```

---

### removeAttributes

Removes multiple attributes by name from the TextArea element.

**Signature:** `removeAttributes(attributes: string[]): void`

```typescript
@ViewChild('textarea') textarea!: TextAreaComponent;

this.textarea.removeAttributes(['data-custom', 'aria-describedby']);
```

---

## Events

### blur
**Type:** `EmitType<FocusOutEventArgs>`

Triggers when the TextArea loses focus.

```html
<ejs-textarea (blur)="onBlur($event)"></ejs-textarea>
```
```typescript
import { FocusOutEventArgs } from '@syncfusion/ej2-angular-inputs';
onBlur(args: FocusOutEventArgs) { }
```

---

### change
**Type:** `EmitType<ChangedEventArgs>`

Triggers when the content of TextArea has changed and gets focus-out.

```html
<ejs-textarea (change)="onChange($event)"></ejs-textarea>
```
```typescript
import { ChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
onChange(args: ChangedEventArgs) {
  console.log(args.value, args.previousValue);
}
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the TextArea component is created.

```html
<ejs-textarea (created)="onCreated()"></ejs-textarea>
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggers when the TextArea component is destroyed.

```html
<ejs-textarea (destroyed)="onDestroyed()"></ejs-textarea>
```

---

### focus
**Type:** `EmitType<FocusInEventArgs>`

Triggers when the TextArea gains focus.

```html
<ejs-textarea (focus)="onFocus($event)"></ejs-textarea>
```
```typescript
import { FocusInEventArgs } from '@syncfusion/ej2-angular-inputs';
onFocus(args: FocusInEventArgs) { }
```

---

### input
**Type:** `EmitType<InputEventArgs>`

Triggers each time the value of the TextArea has changed (fires on every keystroke).

```html
<ejs-textarea (input)="onInput($event)"></ejs-textarea>
```
```typescript
import { InputEventArgs } from '@syncfusion/ej2-angular-inputs';
onInput(args: InputEventArgs) {
  console.log(args.value);
}
```

---

## Enum Types

### FloatLabelType
```typescript
type FloatLabelType = 'Never' | 'Always' | 'Auto';
```
- `'Never'` — placeholder stays inside, never floats (default)
- `'Always'` — placeholder always floats above
- `'Auto'` — placeholder floats on focus or when a value is present

---

### Resize
```typescript
type Resize = 'Both' | 'Vertical' | 'Horizontal' | 'None';
```
- `'Both'` — resize both dimensions (default)
- `'Vertical'` — resize height only
- `'Horizontal'` — resize width only
- `'None'` — no resizing allowed

---

### AdornmentsDirection
```typescript
type AdornmentsDirection = 'Horizontal' | 'Vertical';
```
- `'Horizontal'` — horizontal layout (default for both `adornmentFlow` and `adornmentOrientation`)
- `'Vertical'` — vertical layout
