# Angular TextBox API Reference

> **Source:** https://ej2.syncfusion.com/angular/documentation/api/textbox/index-default

This document covers the complete API for the Syncfusion Angular TextBox component (`ejs-textbox`), including all properties, methods, and events.

---

## Properties

### appendTemplate `string | object`

Specifies the HTML template string for custom elements to append to the TextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

**Defaults to:** `null`

```typescript
<ejs-textbox [appendTemplate]="'myTemplate'"></ejs-textbox>
<ng-template #myTemplate>
  <span class="e-icons e-search"></span>
</ng-template>
```

---

### autocomplete `string`

Specifies whether the browser is allowed to automatically enter or select a value for the textbox. By default, autocomplete is enabled.

**Possible values:** `'on'` | `'off'`

**Defaults to:** `'on'`

```typescript
<ejs-textbox autocomplete="off"></ejs-textbox>
```

---

### cssClass `string`

Specifies the CSS class value that is appended to the wrapper of the TextBox. Use this to apply validation states (`e-error`, `e-warning`, `e-success`), sizing (`e-small`, `e-bigger`), or custom styling (`e-corner`, `e-outline`).

**Defaults to:** `''`

```typescript
<ejs-textbox cssClass="e-outline e-corner"></ejs-textbox>
```

---

### enablePersistence `boolean`

Enable or disable persisting the TextBox state between page reloads. If enabled, the `value` state will be persisted.

**Defaults to:** `false`

```typescript
<ejs-textbox [enablePersistence]="true"></ejs-textbox>
```

---

### enableRtl `boolean`

Enable or disable rendering the component in right-to-left direction.

**Defaults to:** `false`

```typescript
<ejs-textbox [enableRtl]="true"></ejs-textbox>
```

---

### enabled `boolean`

Specifies a Boolean value that indicates whether the TextBox allows user to interact with it. Set to `false` to disable the component.

**Defaults to:** `true`

```typescript
<ejs-textbox [enabled]="false"></ejs-textbox>
```

---

### floatLabelType `FloatLabelType`

Specifies the floating label behavior of the TextBox. The placeholder text floats above the TextBox based on the selected value.

**Possible values:**

| Value | Description |
|-------|-------------|
| `'Never'` | The placeholder text does not float. |
| `'Always'` | The placeholder text always floats above the TextBox. |
| `'Auto'` | The placeholder text floats when focused or when a value is entered. |

**Defaults to:** `'Never'`

```typescript
<ejs-textbox placeholder="Enter Name" floatLabelType="Auto"></ejs-textbox>
```

---

### htmlAttributes `{ [key: string]: string }`

You can add additional HTML attributes such as `name`, `type`, `maxlength`, `title`, etc., to the input element. If you configure both a component property and an equivalent HTML attribute, the component property value takes precedence.

**Defaults to:** `{}`

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-textbox [htmlAttributes]="htmlAttributes" placeholder="Enter password"></ejs-textbox>`
})
export class AppComponent {
  public htmlAttributes: { [key: string]: string } = {
    name: 'userpassword',
    type: 'password',
    maxlength: '12',
    title: 'Enter your password'
  };
}
```

---

### locale `string`

Overrides the global culture and localization value for this component.

**Defaults to:** `'en-US'`

```typescript
<ejs-textbox locale="fr-FR"></ejs-textbox>
```

---

### multiline `boolean`

Specifies a boolean value that enables or disables the multiline mode on the TextBox. The TextBox changes from a single line to multiline (textarea) when this property is `true`.

**Defaults to:** `false`

```typescript
<ejs-textbox [multiline]="true" placeholder="Enter your address"></ejs-textbox>
```

---

### placeholder `string`

Specifies the text shown as a hint or placeholder until the user focuses or enters a value. This property works in conjunction with `floatLabelType`.

**Defaults to:** `null`

```typescript
<ejs-textbox placeholder="Enter your name" floatLabelType="Auto"></ejs-textbox>
```

---

### prependTemplate `string | object`

Specifies the HTML template string for custom elements to prepend to the TextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

**Defaults to:** `null`

```typescript
<ejs-textbox [prependTemplate]="'myTemplate'"></ejs-textbox>
<ng-template #myTemplate>
  <span class="e-icons e-user"></span>
</ng-template>
```

---

### readonly `boolean`

Specifies the boolean value whether the TextBox allows the user to change the text. When `true`, the input is read-only.

**Defaults to:** `false`

```typescript
<ejs-textbox [readonly]="true" value="Read only content"></ejs-textbox>
```

---

### showClearButton `boolean`

Specifies a Boolean value that indicates whether the clear button is displayed in the TextBox. When enabled, the clear button appears when the field has content and disappears when the field is empty.

**Defaults to:** `false`

```typescript
<ejs-textbox [showClearButton]="true" placeholder="Search..."></ejs-textbox>
```

---

### type `string`

Specifies the behavior of the TextBox input element such as `text`, `password`, `email`, `number`, `tel`, `url`, etc.

**Defaults to:** `'text'`

```typescript
<ejs-textbox type="password" placeholder="Enter password"></ejs-textbox>
```

---

### value `string`

Sets the content (value) of the TextBox.

**Defaults to:** `null`

```typescript
<ejs-textbox value="Initial value"></ejs-textbox>
```

---

### width `number | string`

Specifies the width of the TextBox component.

**Defaults to:** `null`

```typescript
<ejs-textbox width="300px"></ejs-textbox>
<ejs-textbox [width]="300"></ejs-textbox>
```

---

## Methods

### addAttributes

Adds multiple attributes as key-value pairs to the TextBox element.

**Signature:** `addAttributes(attributes: { [key: string]: string }): void`

| Parameter | Type | Description |
|-----------|------|-------------|
| `attributes` | `{ [key: string]: string }` | Specifies the attributes to add to the TextBox element. |

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-textbox #textbox placeholder="Enter value"></ejs-textbox>`
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  ngAfterViewInit() {
    this.textboxObj.addAttributes({ maxlength: '15', autocomplete: 'off' });
  }
}
```

---

### addIcon

Adds icons to the TextBox component by creating a `<span>` element with the specified CSS classes.

**Signature:** `addIcon(position: string, icons: string | string[]): void`

| Parameter | Type | Description |
|-----------|------|-------------|
| `position` | `string` | Specifies the icon placement. Possible values: `'append'`, `'prepend'`. |
| `icons` | `string \| string[]` | CSS class or array of CSS classes applied to the created span element (icon or button). |

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-textbox #textbox placeholder="Enter Date" (created)="onCreate()"></ejs-textbox>`
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public onCreate(): void {
    this.textboxObj.addIcon('append', 'e-icons e-input-group-icon e-input-popup-date');
  }
}
```

---

### destroy

Removes the component from the DOM and detaches all its related event handlers. The original input element is maintained in the DOM.

**Signature:** `destroy(): void`

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [TextBoxModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-textbox #textbox placeholder="Enter Name"></ejs-textbox>
    <button ejs-button (click)="destroyHandler()">Destroy</button>
  `
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public destroyHandler(): void {
    this.textboxObj.destroy();
  }
}
```

---

### focusIn

Sets the focus to the TextBox widget for interaction.

**Signature:** `focusIn(): void`

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [TextBoxModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-textbox #textbox placeholder="Enter Name"></ejs-textbox>
    <button ejs-button (click)="focusHandler()">Focus In</button>
  `
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public focusHandler(): void {
    this.textboxObj.focusIn();
  }
}
```

---

### focusOut

Removes the focus from the TextBox widget if it is currently in focus.

**Signature:** `focusOut(): void`

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [TextBoxModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-textbox #textbox placeholder="Enter Name"></ejs-textbox>
    <button ejs-button (click)="blurHandler()">Focus Out</button>
  `
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  public blurHandler(): void {
    this.textboxObj.focusOut();
  }
}
```

---

### getPersistData

Gets the properties to be maintained in the persisted state.

**Signature:** `getPersistData(): string`

**Returns:** `string`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-textbox #textbox placeholder="Enter Name"></ejs-textbox>
    <button (click)="getPersistDataHandler()">Get Persist Data</button>
    <div>{{ persistData }}</div>
  `
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;
  public persistData: string = '';

  public getPersistDataHandler(): void {
    this.persistData = this.textboxObj.getPersistData();
  }
}
```

---

### removeAttributes

Removes multiple attributes by name from the TextBox element.

**Signature:** `removeAttributes(attributes: string[]): void`

| Parameter | Type | Description |
|-----------|------|-------------|
| `attributes` | `string[]` | Specifies the attribute names to remove from the TextBox element. |

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-textbox #textbox placeholder="Enter value"></ejs-textbox>`
})
export class AppComponent {
  @ViewChild('textbox')
  public textboxObj!: TextBoxComponent;

  ngAfterViewInit() {
    this.textboxObj.addAttributes({ maxlength: '15' });
    // Later, remove the attribute
    this.textboxObj.removeAttributes(['maxlength']);
  }
}
```

---

## Events

### blur `EmitType<FocusOutEventArgs>`

Triggers when the TextBox loses focus (focus-out event).

**Event Args:** [`FocusOutEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/textbox/focusouteventargs)

| Property | Type | Description |
|----------|------|-------------|
| `event` | `FocusEvent` | The original DOM focus-out event. |
| `value` | `string` | The current value of the TextBox when focus is lost. |
| `container` | `HTMLElement` | The outer wrapper element of the TextBox. |

```typescript
<ejs-textbox (blur)="onBlur($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onBlur(args: FocusOutEventArgs): void {
  console.log('TextBox blurred. Value:', args.value);
}
```

---

### change `EmitType<ChangedEventArgs>`

Triggers when the content of the TextBox has changed and the TextBox loses focus.

**Event Args:** [`ChangedEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/textbox/changedeventargs)

| Property | Type | Description |
|----------|------|-------------|
| `event` | `Event` | The original DOM change event. |
| `value` | `string` | The current value of the TextBox. |
| `previousValue` | `string` | The previous value before the change. |
| `container` | `HTMLElement` | The outer wrapper element of the TextBox. |

```typescript
<ejs-textbox (change)="onChange($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onChange(args: ChangedEventArgs): void {
  console.log('Value changed from', args.previousValue, 'to', args.value);
}
```

---

### created `EmitType<Object>`

Triggers when the TextBox component is created and initialized.

```typescript
<ejs-textbox (created)="onCreate($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onCreate(args: any): void {
  console.log('TextBox created');
}
```

---

### destroyed `EmitType<Object>`

Triggers when the TextBox component is destroyed (via the `destroy()` method).

```typescript
<ejs-textbox (destroyed)="onDestroyed($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onDestroyed(args: any): void {
  console.log('TextBox destroyed');
}
```

---

### focus `EmitType<FocusInEventArgs>`

Triggers when the TextBox receives focus.

**Event Args:** [`FocusInEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/textbox/focusineventargs)

| Property | Type | Description |
|----------|------|-------------|
| `event` | `FocusEvent` | The original DOM focus event. |
| `value` | `string` | The current value of the TextBox when focused. |
| `container` | `HTMLElement` | The outer wrapper element of the TextBox. |

```typescript
<ejs-textbox (focus)="onFocus($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onFocus(args: FocusInEventArgs): void {
  console.log('TextBox focused. Value:', args.value);
}
```

---

### input `EmitType<InputEventArgs>`

Triggers each time the value of the TextBox has changed (fires on every keystroke).

**Event Args:** [`InputEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/textbox/inputeventargs)

| Property | Type | Description |
|----------|------|-------------|
| `event` | `Event` | The original DOM input event. |
| `value` | `string` | The current value of the TextBox. |
| `previousValue` | `string` | The value before the current input change. |
| `container` | `HTMLElement` | The outer wrapper element of the TextBox. |

```typescript
<ejs-textbox (input)="onInput($event)" placeholder="Enter Name"></ejs-textbox>
```

```typescript
public onInput(args: InputEventArgs): void {
  console.log('Current value:', args.value);
}
```

---

## Summary Table

### Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `appendTemplate` | `string \| object` | `null` | Template for elements appended after the input |
| `autocomplete` | `string` | `'on'` | Browser autocomplete behavior (`'on'` \| `'off'`) |
| `cssClass` | `string` | `''` | CSS classes appended to the wrapper |
| `enablePersistence` | `boolean` | `false` | Persist value state between page reloads |
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `enabled` | `boolean` | `true` | Allow user interaction |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Floating label behavior (`'Never'` \| `'Always'` \| `'Auto'`) |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes for the input element |
| `locale` | `string` | `'en-US'` | Culture and localization override |
| `multiline` | `boolean` | `false` | Enable multiline textarea mode |
| `placeholder` | `string` | `null` | Hint/placeholder text |
| `prependTemplate` | `string \| object` | `null` | Template for elements prepended before the input |
| `readonly` | `boolean` | `false` | Prevent user from editing the text |
| `showClearButton` | `boolean` | `false` | Display clear button when field has content |
| `type` | `string` | `'text'` | Input type (`text`, `password`, `email`, etc.) |
| `value` | `string` | `null` | Current value of the TextBox |
| `width` | `number \| string` | `null` | Width of the component |

### Methods Summary

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addAttributes` | `attributes: { [key: string]: string }` | `void` | Add multiple attributes to the input element |
| `addIcon` | `position: string, icons: string \| string[]` | `void` | Add icon(s) to the TextBox |
| `destroy` | — | `void` | Remove component from DOM and detach event handlers |
| `focusIn` | — | `void` | Set focus on the TextBox |
| `focusOut` | — | `void` | Remove focus from the TextBox |
| `getPersistData` | — | `string` | Get persisted state properties |
| `removeAttributes` | `attributes: string[]` | `void` | Remove attributes from the input element |

### Events Summary

| Event | Args Type | Description |
|-------|-----------|-------------|
| `blur` | `FocusOutEventArgs` | Fires when TextBox loses focus |
| `change` | `ChangedEventArgs` | Fires when value changes and TextBox loses focus |
| `created` | `Object` | Fires when component is created |
| `destroyed` | `Object` | Fires when component is destroyed |
| `focus` | `FocusInEventArgs` | Fires when TextBox receives focus |
| `input` | `InputEventArgs` | Fires on every value change (each keystroke) |

---

## CSS Classes Reference

The following CSS classes can be applied via the `cssClass` property:

| CSS Class | Description |
|-----------|-------------|
| `e-error` | Applies error validation state styling |
| `e-warning` | Applies warning validation state styling |
| `e-success` | Applies success validation state styling |
| `e-small` | Renders a smaller-sized TextBox |
| `e-bigger` | Renders a larger-sized TextBox |
| `e-outline` | Applies outlined (box model) styling |
| `e-corner` | Applies rounded corner styling (visible in box model inputs) |

