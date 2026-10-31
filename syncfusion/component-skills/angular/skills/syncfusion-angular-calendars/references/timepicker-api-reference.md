# Complete API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Type Interfaces](#type-interfaces)
- [Key Configuration](#key-configuration)
- [Usage Examples](#usage-examples)

---

## Properties

### allowEdit

**Type:** `boolean`  
**Default:** `true`

Specifies whether the input textbox is editable or not. When set to false, users can only select values from the popup list, not type directly in the input.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  allowEdit: boolean = false;  // Readonly input
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [allowEdit]="allowEdit">
</ejs-timepicker>
```

---

### cssClass

**Type:** `string`  
**Default:** `null`

Specifies the root CSS class for the TimePicker component to customize appearance by overriding styles.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  cssClass: string = 'custom-timepicker primary-theme';
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [cssClass]="cssClass">
</ejs-timepicker>
```

---

### enableMask

**Type:** `boolean`  
**Default:** `false`

Specifies whether the TimePicker has a masked input or not. When true, displays input placeholders to guide user entry.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  enableMask: boolean = true;
  maskPlaceholder = {
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enableMask]="enableMask"
  [maskPlaceholder]="maskPlaceholder">
</ejs-timepicker>
```

---

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting component's state between page reloads. Persists the selected value.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  enablePersistence: boolean = true;  // State saved across reloads
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enablePersistence]="enablePersistence">
</ejs-timepicker>
```

---

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering component in right to left direction. Useful for RTL languages like Arabic and Hebrew.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  enableRtl: boolean = true;
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enableRtl]="enableRtl">
</ejs-timepicker>
```

---

### enabled

**Type:** `boolean`  
**Default:** `true`

Specifies whether the component is enabled or disabled. When false, the component is grayed out and non-functional.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  enabled: boolean = false;  // Disabled component
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [enabled]="enabled">
</ejs-timepicker>
```

---

### floatLabelType

**Type:** `'Never' | 'Always' | 'Auto'`  
**Default:** `'Never'`

Specifies the placeholder text to be floated. Options:
- **Never:** Label doesn't float (default behavior)
- **Always:** Label always floats above input
- **Auto:** Label floats on focus or when value exists

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  floatLabelType: string = 'Auto';
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [floatLabelType]="floatLabelType"
  placeholder="Select time">
</ejs-timepicker>
```

---

### format

**Type:** `string | TimeFormatObject`  
**Default:** Based on culture

Specifies the format of the value to be displayed in the component. Can be a format string or object with skeleton property.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  // String format
  format: string = 'hh:mm a';  // 02:30 PM
  // OR: format: string = 'HH:mm';  // 14:30
  
  // TimeFormatObject
  // format = { skeleton: 'Hms' };  // Hour, minute, second
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [format]="format">
</ejs-timepicker>
```

**Format Characters:**
- `h` - Hour (1-12)
- `hh` - Hour, padded (01-12)
- `H` - Hour (0-23)
- `HH` - Hour, padded (00-23)
- `m` - Minute (0-59)
- `mm` - Minute, padded (00-59)
- `s` - Second (0-59)
- `ss` - Second, padded (00-59)
- `a` - AM/PM

---

### fullScreenMode

**Type:** `boolean`  
**Default:** `false`

Specifies whether the component popup displays in full screen mode on mobile devices.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  fullScreenMode: boolean = true;
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [fullScreenMode]="fullScreenMode">
</ejs-timepicker>
```

---

### htmlAttributes

**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Allows adding additional HTML attributes like disabled, aria-labels, data attributes, etc., to the element.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  htmlAttributes = {
    'aria-label': 'Select appointment time',
    'data-test-id': 'appointment-timepicker',
    'autocomplete': 'off'
  };
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [htmlAttributes]="htmlAttributes">
</ejs-timepicker>
```

---

### keyConfigs

**Type:** `{ [key: string]: string }`  
**Default:** Standard keyboard shortcuts

Customizes key actions in TimePicker. Useful for different keyboard layouts.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  keyConfigs = {
    enter: 'enter',
    escape: 'escape',
    down: 'downarrow',
    up: 'uparrow',
    home: 'home',
    end: 'end',
    open: 'alt+downarrow',
    close: 'alt+uparrow'
  };
}
```

See [Key Configuration](#key-configuration) section for full list.

---

### locale

**Type:** `string`  
**Default:** `'en-US'`

Overrides the global culture and localization value for this component.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  locale: string = 'de-DE';  // German
  // Or: locale: string = 'ar-SA';  // Arabic
  // Or: locale: string = 'ja-JP';  // Japanese
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [locale]="locale">
</ejs-timepicker>
```

---

### maskPlaceholder

**Type:** `TimeMaskPlaceholderModel`  
**Default:** `{ hour: 'hour', minute: 'minute', second: 'second' }`

Specifies the mask placeholder to be displayed on masked timepicker.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  enableMask: boolean = true;
  
  maskPlaceholder = {
    hour: 'hh',
    minute: 'mm',
    second: 'ss'
  };
}
```

---

### max

**Type:** `Date`  
**Default:** `00:00`

Gets or sets the maximum time value that can be allowed to select in TimePicker. Times after this are disabled.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  max: Date = new Date(2026, 2, 24, 17, 0);  // 5:00 PM
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [max]="max">
</ejs-timepicker>
```

---

### min

**Type:** `Date`  
**Default:** `00:00`

Gets or sets the minimum time value that can be allowed to select in TimePicker. Times before this are disabled.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  min: Date = new Date(2026, 2, 24, 9, 0);   // 9:00 AM
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [min]="min">
</ejs-timepicker>
```

---

### openOnFocus

**Type:** `boolean`  
**Default:** `false`

By default, the popup opens on icon click. If set to true, the popup opens when the input is focused.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  openOnFocus: boolean = true;
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [openOnFocus]="openOnFocus">
</ejs-timepicker>
```

---

### placeholder

**Type:** `string`  
**Default:** `null`

Specifies the placeholder text that is displayed in the textbox when no value is selected.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  placeholder="Select appointment time">
</ejs-timepicker>
```

---

### readonly

**Type:** `boolean`  
**Default:** `false`

Specifies the component in readonly state. When true, the component is functional but displays as read-only.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  readonly: boolean = true;
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [readonly]="readonly">
</ejs-timepicker>
```

---

### scrollTo

**Type:** `Date`  
**Default:** `null`

Specifies the scroll bar position if there is no value selected. When popup opens without a selected value, it scrolls to this position.

```typescript
export class AppComponent {
  selectedTime: Date | null = null;
  scrollTo: Date = new Date(2026, 2, 24, 9, 0);  // Scroll to 9 AM
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [scrollTo]="scrollTo">
</ejs-timepicker>
```

---

### serverTimezoneOffset

**Type:** `number`  
**Default:** `null`

By default, time values are processed based on system timezone. Set this to process time using server timezone (in minutes from UTC).

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  serverTimezoneOffset: number = 330;  // UTC+5:30 (India)
  // Or: serverTimezoneOffset: number = -480;  // UTC-8 (Pacific)
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [serverTimezoneOffset]="serverTimezoneOffset">
</ejs-timepicker>
```

---

### showClearButton

**Type:** `boolean`  
**Default:** `true`

Specifies whether to show or hide the clear icon. When shown, users can click to clear the selected value.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  showClearButton: boolean = false;  // Hide clear button
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [showClearButton]="showClearButton">
</ejs-timepicker>
```

---

### step

**Type:** `number`  
**Default:** `30`

Specifies the time interval in minutes between two adjacent time values in the popup list.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  step: number = 15;  // 15-minute intervals
  // Options: 5, 15, 30, 60
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [step]="step">
</ejs-timepicker>
```

---

### strictMode

**Type:** `boolean`  
**Default:** `false`

Specifies whether the component acts as strict, allowing only valid time values within specified range. Invalid values revert to previous valid value.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  strictMode: boolean = true;
  min: Date = new Date(2026, 2, 24, 9, 0);
  max: Date = new Date(2026, 2, 24, 17, 0);
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [strictMode]="strictMode"
  [min]="min"
  [max]="max">
</ejs-timepicker>
```

---

### value

**Type:** `Date`  
**Default:** `null`

Gets or sets the selected time value. The value is parsed based on culture-specific time format.

```typescript
export class AppComponent {
  selectedTime: Date = new Date(2026, 2, 24, 14, 30);  // 2:30 PM
}
```

```html
<ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
```

---

### width

**Type:** `string | number`  
**Default:** `null`

Gets or sets the width of the TimePicker component. Can be specified as string (with units) or number (pixels).

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  width: string = '100%';  // Full width
  // Or: width: string = '300px';
  // Or: width: number = 250;  // Converts to pixels
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [width]="width">
</ejs-timepicker>
```

---

### zIndex

**Type:** `number`  
**Default:** `1000`

Specifies the z-index value of the TimePicker popup element. Use higher values for modal dialogs.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  zIndex: number = 9999;  // High z-index for modal
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [zIndex]="zIndex">
</ejs-timepicker>
```

---

## Methods

### show()

**Returns:** `void`

Opens the popup to show the list of available times. Call this method to programmatically display the time list.

```typescript
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  openTimePicker(): void {
    this.timePicker.show();
  }
}
```

```html
<ejs-timepicker #timePickerRef [(ngModel)]="selectedTime"></ejs-timepicker>
<button (click)="openTimePicker()">Open</button>
```

---

### hide()

**Returns:** `void`

Hides the TimePicker popup. Call this method to programmatically close the time list.

```typescript
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  closeTimePicker(): void {
    this.timePicker.hide();
  }
}
```

```html
<ejs-timepicker #timePickerRef [(ngModel)]="selectedTime"></ejs-timepicker>
<button (click)="closeTimePicker()">Close</button>
```

---

### focusIn()

**Returns:** `void`

Sets focus to the TimePicker input textbox element. Moves keyboard focus to the component.

```typescript
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  focusInput(): void {
    this.timePicker.focusIn();
  }
}
```

```html
<ejs-timepicker #timePickerRef [(ngModel)]="selectedTime"></ejs-timepicker>
<button (click)="focusInput()">Focus Input</button>
```

---

### focusOut()

**Returns:** `void`

Removes focus from the TimePicker input textbox element. Blurs the component and optionally closes popup.

```typescript
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  blurInput(): void {
    this.timePicker.focusOut();
  }
}
```

```html
<ejs-timepicker #timePickerRef [(ngModel)]="selectedTime"></ejs-timepicker>
<button (click)="blurInput()">Blur Input</button>
```

---

### getPersistData()

**Returns:** `string`

Gets the properties to be maintained upon browser refresh when persistence is enabled. Returns serialized state data.

```typescript
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  getState(): void {
    const persistedData = this.timePicker.getPersistData();
    console.log('Persisted State:', persistedData);
    localStorage.setItem('timePickerState', persistedData);
  }
}
```

```html
<ejs-timepicker 
  #timePickerRef 
  [(ngModel)]="selectedTime"
  [enablePersistence]="true">
</ejs-timepicker>
<button (click)="getState()">Get State</button>
```

---

## Events

### blur

**Type:** `EmitType<BlurEventArgs>`

Triggers when the TimePicker input loses focus. Fired after focusOut() is called or user clicks away.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onBlur(args: BlurEventArgs): void {
    console.log('Input blurred:', args);
    // Handle blur event
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (blur)="onBlur($event)">
</ejs-timepicker>
```

---

### change

**Type:** `EmitType<ChangeEventArgs>`

Triggers when the selected time value changes. Fired when user selects a new time from popup or modifies input.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onTimeChange(args: ChangeEventArgs): void {
    console.log('Time changed:', args.value);
    console.log('Time as text:', args.text);
    console.log('Is user interaction:', args.isInteracted);
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (change)="onTimeChange($event)">
</ejs-timepicker>
```

---

### cleared

**Type:** `EmitType<ClearedEventArgs>`

Triggers when the TimePicker value is cleared using the clear button.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onCleared(args: ClearedEventArgs): void {
    console.log('Value cleared');
    // Handle clear event
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (cleared)="onCleared($event)">
</ejs-timepicker>
```

---

### close

**Type:** `EmitType<PopupEventArgs>`

Triggers when the TimePicker popup is closed. Fired after user makes selection or presses Escape.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onPopupClose(args: PopupEventArgs): void {
    console.log('Popup closed');
    // Handle close event
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (close)="onPopupClose($event)">
</ejs-timepicker>
```

---

### created

**Type:** `EmitType<Object>`

Triggers when the TimePicker component is created and initialized. Fired after all properties are set.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onCreated(): void {
    console.log('TimePicker component created');
    // Initialize custom logic
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (created)="onCreated()">
</ejs-timepicker>
```

---

### destroyed

**Type:** `EmitType<Object>`

Triggers when the TimePicker component is destroyed. Fired during component cleanup.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onDestroyed(): void {
    console.log('TimePicker component destroyed');
    // Cleanup logic
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (destroyed)="onDestroyed()">
</ejs-timepicker>
```

---

### focus

**Type:** `EmitType<FocusEventArgs>`

Triggers when the TimePicker input gets focus. Fired after focusIn() or user clicks on input.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onFocus(args: FocusEventArgs): void {
    console.log('Input focused:', args);
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (focus)="onFocus($event)">
</ejs-timepicker>
```

---

### itemRender

**Type:** `EmitType<ItemEventArgs>`

Triggers while rendering each popup list item. Allows customization of individual time items.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onItemRender(args: ItemEventArgs): void {
    // Customize item rendering
    const itemText = args.element.textContent;
    console.log('Rendering item:', itemText);
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (itemRender)="onItemRender($event)">
</ejs-timepicker>
```

---

### open

**Type:** `EmitType<PopupEventArgs>`

Triggers when the TimePicker popup is opened. Fired before popup becomes visible.

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  onPopupOpen(args: PopupEventArgs): void {
    console.log('Popup opened');
    // Handle open event
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  (open)="onPopupOpen($event)">
</ejs-timepicker>
```

---

## Type Interfaces

### ChangeEventArgs

Arguments passed to the `change` event:

```typescript
interface ChangeEventArgs {
  element: HTMLInputElement | HTMLElement;   // The input element
  event: KeyboardEvent | FocusEvent | MouseEvent | Event;  // Original DOM event
  isInteracted: boolean;  // true when changed by user interaction, false when programmatic
  text: string;           // Selected time value as string
  value: Date;            // Selected time value as Date object
}
```

### PopupEventArgs

Arguments passed to `open` and `close` events:

```typescript
interface PopupEventArgs {
  appendTo: HTMLElement;  // Node to which popup element is appended
  cancel: boolean;        // Set to true to prevent the open/close action
  event: MouseEvent | KeyboardEvent | FocusEvent | Event;  // Original DOM event
  name: string;           // 'open' or 'close'
  popup: Popup;           // TimePicker popup object
}
```

### BlurEventArgs

Arguments passed to the `blur` event:

```typescript
interface BlurEventArgs {
  value: Date;            // Current time value
  event: FocusEvent;      // FocusEvent object
}
```

### FocusEventArgs

Arguments passed to the `focus` event:

```typescript
interface FocusEventArgs {
  value: Date;            // Current time value
  event: FocusEvent;      // FocusEvent object
}
```

### ItemEventArgs

Arguments passed to the `itemRender` event:

```typescript
interface ItemEventArgs {
  element: HTMLElement;   // Created LI element
  isDisabled: boolean;    // Whether the current time value is disabled
  name: string;           // Name of the event
  text: string;           // Displayed text value in popup list
  value: Date;            // Date object of displayed text in popup list
}
```

### ClearedEventArgs

Arguments passed to the `cleared` event:

```typescript
interface ClearedEventArgs {
  event: MouseEvent | Event;  // Original event arguments (clear button click)
}
```

---

## Key Configuration

Keyboard shortcuts can be customized using `keyConfigs`:

| Key Action | Default | Purpose |
|-----------|---------|---------|
| `enter` | `'enter'` | Select highlighted time |
| `escape` | `'escape'` | Close popup |
| `tab` | `'tab'` | Move to next field |
| `home` | `'home'` | Go to first time in list |
| `end` | `'end'` | Go to last time in list |
| `down` | `'downarrow'` | Next time in list |
| `up` | `'uparrow'` | Previous time in list |
| `left` | `'leftarrow'` | Previous unit (hour/minute) |
| `right` | `'rightarrow'` | Next unit (hour/minute) |
| `open` | `'alt+downarrow'` | Open popup |
| `close` | `'alt+uparrow'` | Close popup |

---

## Usage Examples

### Complete Implementation

```typescript
import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ChangeEventArgs, PopupEventArgs } from '@syncfusion/ej2-calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('timePickerRef') timePicker!: TimePickerComponent;
  
  // Properties
  selectedTime: Date = new Date();
  min: Date = new Date(2026, 2, 24, 9, 0);
  max: Date = new Date(2026, 2, 24, 17, 0);
  format: string = 'hh:mm a';
  step: number = 30;
  cssClass: string = 'custom-timepicker';
  
  // Methods
  openPicker(): void {
    this.timePicker.show();
  }
  
  closePicker(): void {
    this.timePicker.hide();
  }
  
  // Events
  onChange(args: ChangeEventArgs): void {
    console.log('Selected:', args.value);
  }
  
  onOpen(args: PopupEventArgs): void {
    console.log('Popup opened');
  }
}
```

```html
<ejs-timepicker
  #timePickerRef
  [(ngModel)]="selectedTime"
  [min]="min"
  [max]="max"
  [format]="format"
  [step]="step"
  [cssClass]="cssClass"
  (change)="onChange($event)"
  (open)="onOpen($event)"
  placeholder="Select time">
</ejs-timepicker>

<button (click)="openPicker()">Open</button>
<button (click)="closePicker()">Close</button>
```
