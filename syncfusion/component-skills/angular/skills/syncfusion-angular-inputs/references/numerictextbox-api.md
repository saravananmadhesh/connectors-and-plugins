# NumericTextBox API Reference

> **Source:** [Syncfusion Angular NumericTextBox API](https://ej2.syncfusion.com/angular/documentation/api/numerictextbox/index-default)

## Table of Contents

- [NumericTextBoxComponent](#numerictextboxcomponent)
  - [Properties](#properties)
  - [Methods](#methods)
  - [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
  - [ChangeEventArgs](#changeeventargs)
  - [NumericBlurEventArgs](#numericblureventargs)
  - [NumericFocusEventArgs](#numericfocuseventargs)

---

## NumericTextBoxComponent

Represents the EJ2 Angular NumericTextBox Component.

```html
<ejs-numerictextbox [value]="value"></ejs-numerictextbox>
```

---

## Properties

### allowMouseWheel

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Gets or sets a value indicating whether the mouse wheel interaction is enabled for incrementing or decrementing the value in the NumericTextBox component.

```html
<ejs-numerictextbox [allowMouseWheel]="false" value="10"></ejs-numerictextbox>
```

---

### appendTemplate

| | |
|---|---|
| **Type** | `string \| object` |
| **Default** | `null` |

Specifies the HTML template string for custom elements to append to the NumericTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

```html
<ejs-numerictextbox [appendTemplate]="appendTpl" value="100"></ejs-numerictextbox>
<ng-template #appendTpl>
  <span class="unit-label">kg</span>
</ng-template>
```

---

### cssClass

| | |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Gets or sets the CSS classes to the root element of the NumericTextBox which helps to customize the complete UI styles for the NumericTextBox component.

```html
<ejs-numerictextbox cssClass="custom-numeric" value="10"></ejs-numerictextbox>
```

---

### currency

| | |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Specifies the currency code to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `'USD'` for the US dollar, `'EUR'` for the euro.

```html
<ejs-numerictextbox format="c2" currency="USD" value="100"></ejs-numerictextbox>
```

---

### decimals

| | |
|---|---|
| **Type** | `number` |
| **Default** | `null` |

Specifies the number precision applied to the textbox value when the NumericTextBox is focused. For more information, refer to [Precision of Numbers](https://ej2.syncfusion.com/angular/documentation/numerictextbox/formats/#precision-of-numbers).

```html
<ejs-numerictextbox [decimals]="2" value="10.50"></ejs-numerictextbox>
```

---

### enablePersistence

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Enable or disable persisting NumericTextBox state between page reloads. If enabled, the `value` state will be persisted.

```html
<ejs-numerictextbox [enablePersistence]="true" value="50"></ejs-numerictextbox>
```

---

### enableRtl

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Enable or disable rendering the component in right-to-left direction.

```html
<ejs-numerictextbox [enableRtl]="true" value="100"></ejs-numerictextbox>
```

---

### enabled

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Sets a value that enables or disables the NumericTextBox control.

```html
<ejs-numerictextbox [enabled]="false" value="50"></ejs-numerictextbox>
```

---

### floatLabelType

| | |
|---|---|
| **Type** | [`FloatLabelType`](https://ej2.syncfusion.com/angular/documentation/api/numerictextbox/floatlabeltype) |
| **Default** | `'Never'` |

The placeholder acts as a label and floats above the NumericTextBox based on the below values:

| Value | Description |
|-------|-------------|
| `Never` | Never floats the label in the NumericTextBox when the placeholder is available. |
| `Always` | The floating label always floats above the NumericTextBox. |
| `Auto` | The floating label floats above the NumericTextBox after focusing it or when a value is entered. |

```html
<ejs-numerictextbox floatLabelType="Auto" placeholder="Enter value"></ejs-numerictextbox>
```

---

### format

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'n2'` |

Specifies the number format that indicates the display format for the value of the NumericTextBox. For more information, refer to [Formats](https://ej2.syncfusion.com/angular/documentation/numerictextbox/formats/#standard-formats).

Common format strings:

| Format | Description |
|--------|-------------|
| `'n2'` | Numeric with 2 decimal places (default) |
| `'c2'` | Currency with 2 decimal places |
| `'p'` | Percentage |
| `'n0'` | Integer (no decimals) |

```html
<ejs-numerictextbox format="c2" value="1000"></ejs-numerictextbox>
```

---

### htmlAttributes

| | |
|---|---|
| **Type** | `{ [key: string]: string }` |
| **Default** | `{}` |

You can add additional HTML attributes such as `disabled`, `value`, etc., to the element. If you configure both a property and an equivalent HTML attribute, the component considers the property value.

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-numerictextbox [htmlAttributes]="htmlAttributes"></ejs-numerictextbox>`
})
export class AppComponent {
  public htmlAttributes = { name: 'quantity', min: '0', max: '100' };
}
```

---

### locale

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` (resolves to `'en-US'`) |

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

```html
<ejs-numerictextbox locale="de-DE" value="1000"></ejs-numerictextbox>
```

---

### max

| | |
|---|---|
| **Type** | `number` |
| **Default** | `null` |

Specifies a maximum value that a user is allowed to enter. For more information, refer to [Range Validation](https://ej2.syncfusion.com/angular/documentation/numerictextbox/getting-started/#range-validation).

```html
<ejs-numerictextbox [max]="100" value="50"></ejs-numerictextbox>
```

---

### min

| | |
|---|---|
| **Type** | `number` |
| **Default** | `null` |

Specifies a minimum value that a user is allowed to enter. For more information, refer to [Range Validation](https://ej2.syncfusion.com/angular/documentation/numerictextbox/getting-started/#range-validation).

```html
<ejs-numerictextbox [min]="0" value="50"></ejs-numerictextbox>
```

---

### placeholder

| | |
|---|---|
| **Type** | `string` |
| **Default** | `null` |

Gets or sets the string shown as a hint/placeholder when the NumericTextBox is empty. It acts as a label and floats above the NumericTextBox based on the `floatLabelType`.

```html
<ejs-numerictextbox placeholder="Enter amount" floatLabelType="Auto"></ejs-numerictextbox>
```

---

### prependTemplate

| | |
|---|---|
| **Type** | `string \| object` |
| **Default** | `null` |

Specifies the HTML template string for custom elements to prepend to the NumericTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

```html
<ejs-numerictextbox [prependTemplate]="prependTpl" value="100"></ejs-numerictextbox>
<ng-template #prependTpl>
  <span class="e-input-group-icon e-money-icon"></span>
</ng-template>
```

---

### readonly

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Sets a value that enables or disables the readonly state on the NumericTextBox. If `true`, the NumericTextBox will not allow user input.

```html
<ejs-numerictextbox [readonly]="true" value="100"></ejs-numerictextbox>
```

---

### showClearButton

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Specifies whether to show or hide the clear icon.

```html
<ejs-numerictextbox [showClearButton]="true" value="50"></ejs-numerictextbox>
```

---

### showSpinButton

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Specifies whether the up and down spin buttons should be displayed in the NumericTextBox.

```html
<ejs-numerictextbox [showSpinButton]="false" value="10"></ejs-numerictextbox>
```

---

### step

| | |
|---|---|
| **Type** | `number` |
| **Default** | `1` |

Specifies the incremental or decremental step size for the NumericTextBox. For more information, refer to [Range Validation](https://ej2.syncfusion.com/angular/documentation/numerictextbox/getting-started/#range-validation).

```html
<ejs-numerictextbox [step]="5" value="50" min="0" max="100"></ejs-numerictextbox>
```

---

### strictMode

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

Specifies a value that indicates whether the NumericTextBox control allows values for the specified range.

| Value | Behavior |
|-------|----------|
| `true` | Input value is restricted between the `min` and `max` range. The typed value is modified to fit the range on focused-out state. |
| `false` | Any value is allowed, even out-of-range values. An error class is added to the component to highlight the error when a wrong value is entered. |

```html
<ejs-numerictextbox [strictMode]="false" min="10" max="20" value="25"></ejs-numerictextbox>
```

---

### validateDecimalOnType

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

Specifies whether the decimal length should be restricted during typing.

| Value | Behavior |
|-------|----------|
| `true` | Decimal places are restricted in real-time while the user types. |
| `false` | Decimal places are validated only on blur. |

```html
<ejs-numerictextbox [validateDecimalOnType]="true" [decimals]="2" value="10.50"></ejs-numerictextbox>
```

---

### value

| | |
|---|---|
| **Type** | `number` |
| **Default** | `null` |

Sets the value of the NumericTextBox.

```html
<ejs-numerictextbox [value]="numericValue"></ejs-numerictextbox>
```

```typescript
export class AppComponent {
  numericValue: number = 100;
}
```

---

### width

| | |
|---|---|
| **Type** | `number \| string` |
| **Default** | `null` |

Specifies the width of the NumericTextBox.

```html
<ejs-numerictextbox width="300px" value="10"></ejs-numerictextbox>
<!-- or -->
<ejs-numerictextbox [width]="300" value="10"></ejs-numerictextbox>
```

---

## Methods

### decrement

Decrements the NumericTextBox value with the specified step value.

**Signature:** `decrement(step?: number): void`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `number` | Optional | Specifies the value used to decrement the NumericTextBox value. If not provided, the numeric value is decremented based on the `step` property value. |

**Returns:** `void`

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

decrementValue(): void {
  this.numericObj.decrement();       // decrement by step property value
  this.numericObj.decrement(10);     // decrement by 10
}
```

---

### destroy

Removes the component from the DOM and detaches all its related event handlers. Also maintains the initial input element from the DOM.

**Signature:** `destroy(): void`

**Returns:** `void`

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

destroyComponent(): void {
  this.numericObj.destroy();
}
```

---

### focusIn

Sets the focus to the widget for interaction.

**Signature:** `focusIn(): void`

**Returns:** `void`

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

setFocus(): void {
  this.numericObj.focusIn();
}
```

---

### focusOut

Removes the focus from the widget if the widget is in focus state.

**Signature:** `focusOut(): void`

**Returns:** `void`

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

removeFocus(): void {
  this.numericObj.focusOut();
}
```

---

### getPersistData

Gets the properties to be maintained in the persisted state.

**Signature:** `getPersistData(): string`

**Returns:** `string` — A JSON string of the persisted property values.

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

getPersistedState(): void {
  const persistData: string = this.numericObj.getPersistData();
  console.log(persistData);
}
```

---

### getText

Returns the value of the NumericTextBox with the format applied to the NumericTextBox.

**Signature:** `getText(): string`

**Returns:** `string` — The formatted display text of the NumericTextBox.

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

getFormattedValue(): void {
  const text: string = this.numericObj.getText();
  console.log(text); // e.g., "$1,000.00" for currency format
}
```

---

### increment

Increments the NumericTextBox value with the specified step value.

**Signature:** `increment(step?: number): void`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `step` | `number` | Optional | Specifies the value used to increment the NumericTextBox value. If not provided, the numeric value is incremented based on the `step` property value. |

**Returns:** `void`

```typescript
@ViewChild('numeric')
public numericObj: NumericTextBoxComponent;

incrementValue(): void {
  this.numericObj.increment();       // increment by step property value
  this.numericObj.increment(10);     // increment by 10
}
```

---

## Events

### blur

**Type:** `EmitType<`[`NumericBlurEventArgs`](#numericblureventargs)`>`

Triggers when the NumericTextBox loses focus (focus out).

```html
<ejs-numerictextbox (blur)="onBlur($event)" value="10"></ejs-numerictextbox>
```

```typescript
import { NumericBlurEventArgs } from '@syncfusion/ej2-angular-inputs';

onBlur(args: NumericBlurEventArgs): void {
  console.log('Blur event:', args.value);
  console.log('Container:', args.container);
}
```

---

### change

**Type:** `EmitType<`[`ChangeEventArgs`](#changeeventargs)`>`

Triggers when the value of the NumericTextBox changes. The change event is triggered in the following scenarios:

- Changing the previous value using keyboard interaction and then focusing out of the component.
- Focusing on the component and scrolling within the input.
- Changing the value using the spin buttons.
- Programmatically changing the value using the `value` property.

```html
<ejs-numerictextbox (change)="onChange($event)" value="10"></ejs-numerictextbox>
```

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';

onChange(args: ChangeEventArgs): void {
  console.log('New value:', args.value);
  console.log('Previous value:', args.previousValue);
  console.log('Is user interaction:', args.isInteracted);
}
```

---

### created

**Type:** `EmitType<Object>`

Triggers when the NumericTextBox component is created.

```html
<ejs-numerictextbox (created)="onCreated()" value="10"></ejs-numerictextbox>
```

```typescript
onCreated(): void {
  console.log('NumericTextBox created successfully');
}
```

---

### destroyed

**Type:** `EmitType<Object>`

Triggers when the NumericTextBox component is destroyed.

```html
<ejs-numerictextbox (destroyed)="onDestroyed()" value="10"></ejs-numerictextbox>
```

```typescript
onDestroyed(): void {
  console.log('NumericTextBox destroyed');
}
```

---

### focus

**Type:** `EmitType<`[`NumericFocusEventArgs`](#numericfocuseventargs)`>`

Triggers when the NumericTextBox receives focus (focus in).

```html
<ejs-numerictextbox (focus)="onFocus($event)" value="10"></ejs-numerictextbox>
```

```typescript
import { NumericFocusEventArgs } from '@syncfusion/ej2-angular-inputs';

onFocus(args: NumericFocusEventArgs): void {
  console.log('Focus event:', args.value);
  console.log('Container:', args.container);
}
```

---

## Event Argument Interfaces

### ChangeEventArgs

Arguments passed to the [`change`](#change) event handler.

| Property | Type | Description |
|----------|------|-------------|
| `event` | `Event` | Returns the event parameters from the NumericTextBox. |
| `isInteracted` | `boolean` | Returns `true` when the value is changed by user interaction; otherwise `false` (programmatic change). |
| `name` | `string` | Specifies the name of the event. |
| `previousValue` | `number` | Returns the previously entered value of the NumericTextBox. |
| `value` | `number` | Returns the entered (current) value of the NumericTextBox. |

```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';

onChange(args: ChangeEventArgs): void {
  if (args.isInteracted) {
    console.log(`User changed value from ${args.previousValue} to ${args.value}`);
  } else {
    console.log(`Value programmatically set to ${args.value}`);
  }
}
```

---

### NumericBlurEventArgs

Arguments passed to the [`blur`](#blur) event handler.

| Property | Type | Description |
|----------|------|-------------|
| `container` | `HTMLElement` | Returns the NumericTextBox container element. |
| `event` | `MouseEvent \| FocusEvent \| TouchEvent \| KeyboardEvent` | Returns the original event arguments. |
| `name` | `string` | Specifies the name of the event. |
| `value` | `number` | Returns the current value of the NumericTextBox. |

```typescript
import { NumericBlurEventArgs } from '@syncfusion/ej2-angular-inputs';

onBlur(args: NumericBlurEventArgs): void {
  console.log('Value on blur:', args.value);
  console.log('Container element:', args.container);
  console.log('Original event:', args.event);
}
```

---

### NumericFocusEventArgs

Arguments passed to the [`focus`](#focus) event handler.

| Property | Type | Description |
|----------|------|-------------|
| `container` | `HTMLElement` | Returns the NumericTextBox container element. |
| `event` | `MouseEvent \| FocusEvent \| TouchEvent \| KeyboardEvent` | Returns the original event arguments. |
| `name` | `string` | Specifies the name of the event. |
| `value` | `number` | Returns the current value of the NumericTextBox. |

```typescript
import { NumericFocusEventArgs } from '@syncfusion/ej2-angular-inputs';

onFocus(args: NumericFocusEventArgs): void {
  console.log('Value on focus:', args.value);
  console.log('Container element:', args.container);
  console.log('Original event:', args.event);
}
```

---

## Complete API Summary Table

### Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowMouseWheel` | `boolean` | `true` | Enable/disable mouse wheel interaction. |
| `appendTemplate` | `string \| object` | `null` | HTML template to append after the input. |
| `cssClass` | `string` | `null` | Custom CSS classes for the root element. |
| `currency` | `string` | `null` | ISO 4217 currency code (e.g., `'USD'`, `'EUR'`). |
| `decimals` | `number` | `null` | Number of decimal places allowed when focused. |
| `enablePersistence` | `boolean` | `false` | Persist component state across page reloads. |
| `enableRtl` | `boolean` | `false` | Enable right-to-left rendering. |
| `enabled` | `boolean` | `true` | Enable or disable the component. |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Floating label behavior (`'Never'`, `'Always'`, `'Auto'`). |
| `format` | `string` | `'n2'` | Number display format (e.g., `'n2'`, `'c2'`, `'p'`). |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes for the element. |
| `locale` | `string` | `''` | Culture/locale override (e.g., `'de-DE'`, `'fr-FR'`). |
| `max` | `number` | `null` | Maximum value allowed. |
| `min` | `number` | `null` | Minimum value allowed. |
| `placeholder` | `string` | `null` | Hint text displayed when the input is empty. |
| `prependTemplate` | `string \| object` | `null` | HTML template to prepend before the input. |
| `readonly` | `boolean` | `false` | Enable read-only mode. |
| `showClearButton` | `boolean` | `false` | Show/hide the clear icon. |
| `showSpinButton` | `boolean` | `true` | Show/hide the up/down spin buttons. |
| `step` | `number` | `1` | Increment/decrement step size. |
| `strictMode` | `boolean` | `true` | Restrict input to the min/max range. |
| `validateDecimalOnType` | `boolean` | `false` | Restrict decimal length while typing. |
| `value` | `number` | `null` | Current numeric value. |
| `width` | `number \| string` | `null` | Width of the component. |

### Methods Summary

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `decrement` | `step?: number` | `void` | Decrements the value by the specified or default step. |
| `destroy` | — | `void` | Removes the component from the DOM. |
| `focusIn` | — | `void` | Sets focus to the widget. |
| `focusOut` | — | `void` | Removes focus from the widget. |
| `getPersistData` | — | `string` | Returns a JSON string of persisted properties. |
| `getText` | — | `string` | Returns the formatted display text. |
| `increment` | `step?: number` | `void` | Increments the value by the specified or default step. |

### Events Summary

| Event | Type | Description |
|-------|------|-------------|
| `blur` | `EmitType<NumericBlurEventArgs>` | Fires when the component loses focus. |
| `change` | `EmitType<ChangeEventArgs>` | Fires when the value changes. |
| `created` | `EmitType<Object>` | Fires when the component is created. |
| `destroyed` | `EmitType<Object>` | Fires when the component is destroyed. |
| `focus` | `EmitType<NumericFocusEventArgs>` | Fires when the component receives focus. |

---

## See Also

- [Getting Started](./getting-started.md)
- [Formats and Styling](./formats-styling.md)
- [Spinners and Step Control](./spinners-and-step.md)
- [Adornments and Templates](./adornments-and-templates.md)
- [Validation and Forms](./validation-and-forms.md)
- [Advanced Patterns](./advanced-patterns.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
- [Globalization](./globalization.md)
- [Official API Documentation](https://ej2.syncfusion.com/angular/documentation/api/numerictextbox/index-default)
