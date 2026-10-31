# CheckBox API Reference

Complete API reference for the Syncfusion TypeScript CheckBox component.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Type Definitions](#type-definitions)
- [Complete Example](#complete-example)

---

## Properties

### label

Gets or sets the label of the checkbox.

| | |
|---|---|
| **Type** | `string \| HTMLElement` |
| **Default** | `''` |

```typescript
let checkbox: CheckBox = new CheckBox({
  label: 'Accept terms'
});
```

### checked

Gets or sets the checked state of the checkbox.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  checked: true
});
```

### indeterminate

Gets or sets the indeterminate state of the checkbox.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  indeterminate: true
});
```

### disabled

Gets or sets whether the checkbox is disabled.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  disabled: true
});
```

### readonly

Gets or sets whether the checkbox is readonly.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  readonly: true
});
```

### labelPosition

Gets or sets the position of the label relative to the checkbox.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'After'` |
| **Values** | `'Before' \| 'After'` |

```typescript
let checkbox: CheckBox = new CheckBox({
  labelPosition: 'Before'
});
```

### name

Gets or sets the name attribute of the checkbox (used in form submission).

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let checkbox: CheckBox = new CheckBox({
  name: 'terms',
  value: 'accepted'
});
```

### value

Gets or sets the value attribute of the checkbox (used in form submission).

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let checkbox: CheckBox = new CheckBox({
  name: 'option',
  value: 'option1'
});
```

### cssClass

Gets or sets custom CSS classes for the checkbox.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let checkbox: CheckBox = new CheckBox({
  cssClass: 'custom-checkbox e-small'
});
```

### enableRtl

Gets or sets whether to enable right-to-left layout.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  enableRtl: true
});
```

### enablePersistence

Gets or sets whether to enable state persistence.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let checkbox: CheckBox = new CheckBox({
  enablePersistence: true
});
```

### locale

Gets or sets the locale for internationalization.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

```typescript
let checkbox: CheckBox = new CheckBox({
  locale: 'fr-FR'
});
```

---

## Methods

### check()

Sets the checkbox to checked state.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let checkbox: CheckBox = new CheckBox();
checkbox.appendTo('#checkbox');

checkbox.check(); // Checks the checkbox
```

### uncheck()

Sets the checkbox to unchecked state.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.uncheck(); // Unchecks the checkbox
```

### toggle()

Toggles the checkbox state.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.toggle(); // Toggles between checked and unchecked
```

### focusIn()

Focuses the checkbox.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.focusIn(); // Programmatically focus the checkbox
```

### focusOut()

Removes focus from the checkbox.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.focusOut();
```

### click()

Programmatically clicks the checkbox.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.click(); // Triggers click event and toggles state
```

### destroy()

Destroys the checkbox component.

| | |
|---|---|
| **Returns** | `void` |

```typescript
checkbox.destroy();
```

### getPersistData()

Gets the persistence data for the checkbox.

| | |
|---|---|
| **Returns** | `string` |

```typescript
const data: string = checkbox.getPersistData();
```

---

## Events

### change

Triggered when the checkbox state changes.

| | |
|---|---|
| **Event Args** | `ChangeEventArgs` |

```typescript
let checkbox: CheckBox = new CheckBox({
  change: (args: ChangeEventArgs) => {
    console.log('Checked:', args.checked);
    console.log('Previous:', args.previousCheckState);
  }
});
```

### created

Triggered after the component is created and rendered.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let checkbox: CheckBox = new CheckBox({
  created: () => {
    console.log('CheckBox created');
  }
});
```

### destroyed

Triggered after the component is destroyed.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let checkbox: CheckBox = new CheckBox({
  destroyed: () => {
    console.log('CheckBox destroyed');
  }
});
```

---

## Interfaces

### ChangeEventArgs

```typescript
interface ChangeEventArgs {
  checked: boolean;            // Current checked state
  previousCheckState: boolean; // Previous checked state
  event: Event;                // Original event
  element: HTMLElement;        // Checkbox element
}
```

### CheckBoxModel

```typescript
interface CheckBoxModel {
  label?: string | HTMLElement;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  labelPosition?: 'Before' | 'After';
  name?: string;
  value?: string;
  cssClass?: string;
  enableRtl?: boolean;
  enablePersistence?: boolean;
  locale?: string;
  change?: (args: ChangeEventArgs) => void;
  created?: () => void;
  destroyed?: () => void;
}
```

---

## Enumerations

### LabelPosition

| Value | Description |
|-------|-------------|
| `Before` | Label appears before (left of) checkbox |
| `After` | Label appears after (right of) checkbox (default) |

---

## Complete Example

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import './styles.css';

let checkbox: CheckBox = new CheckBox({
  label: 'Complete CheckBox example',
  checked: false,
  indeterminate: false,
  disabled: false,
  readonly: false,
  labelPosition: 'After',
  name: 'example',
  value: 'example-value',
  cssClass: 'custom-checkbox',
  enableRtl: false,
  enablePersistence: true,
  locale: 'en-US',
  change: (args: ChangeEventArgs) => {
    console.log('State changed:', args.checked);
  },
  created: () => {
    console.log('Component created');
  }
});
checkbox.appendTo('#checkbox');

// Programmatic control
// checkbox.check();
// checkbox.uncheck();
// checkbox.toggle();
// checkbox.focusIn();
// checkbox.focusOut();
// checkbox.click();
// checkbox.destroy();
```

---

## See Also

- [checkbox-getting-started.md](./checkbox-getting-started.md) - Setup and installation
- [checkbox-label-and-size.md](./checkbox-label-and-size.md) - Label and size configuration
- [checkbox-states.md](./checkbox-states.md) - Checked, indeterminate, disabled states
- [checkbox-style-and-appearance.md](./checkbox-style-and-appearance.md) - CSS customization
- [checkbox-how-to.md](./checkbox-how-to.md) - Common patterns
- [checkbox-accessibility.md](./checkbox-accessibility.md) - Accessibility guidelines
