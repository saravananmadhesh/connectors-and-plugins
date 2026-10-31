# CheckBox Label and Size

The Syncfusion TypeScript CheckBox component supports configurable labels and three size variants.

## Table of Contents
- [Label Property](#label-property)
- [Label Position](#label-position)
- [Label Customization](#label-customization)
- [Size Variants](#size-variants)
- [Small Size](#small-size)
- [Default Size](#default-size)
- [Larger Sizes via CSS](#larger-sizes-via-css)

---

## Label Property

The `label` property sets the text displayed next to the checkbox.

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Accept terms and conditions'
});
checkbox.appendTo('#checkbox');
```

### Label as String

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Simple string label'
});
checkbox.appendTo('#checkbox');
```

### Label as HTML

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: '<span style="color: red;">Required</span> field'
});
checkbox.appendTo('#checkbox');
```

### No Label

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  // No label property - checkbox only
});
checkbox.appendTo('#checkbox');
```

---

## Label Position

Control where the label appears relative to the checkbox:

| Position | Description |
|----------|-------------|
| `After` | Label appears after (right of) the checkbox (default) |
| `Before` | Label appears before (left of) the checkbox |

### Label After Checkbox (Default)

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Label after checkbox',
  labelPosition: 'After'
});
checkbox.appendTo('#checkbox');
```

### Label Before Checkbox

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Label before checkbox',
  labelPosition: 'Before'
});
checkbox.appendTo('#checkbox');
```

---

## Label Customization

### Custom Label CSS Class

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Custom styled label',
  cssClass: 'custom-label'
});
checkbox.appendTo('#checkbox');
```

```css
.custom-label .e-checkbox-label {
  color: #1976d2;
  font-weight: 600;
  font-size: 16px;
}
```

### Long Label with Wrapping

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'I have read and agree to the terms of service and privacy policy',
  cssClass: 'long-label'
});
checkbox.appendTo('#checkbox');
```

```css
.long-label .e-checkbox-label {
  max-width: 300px;
  line-height: 1.5;
}
```

### Rich Text Label

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Subscribe to <a href="#" style="color: blue;">newsletter</a> and <strong>promotions</strong>'
});
checkbox.appendTo('#checkbox');
```

---

## Size Variants

The CheckBox component supports a `cssClass` property that can be combined with predefined size classes.

| Size Class | Description |
|------------|-------------|
| `e-small` | Small checkbox |
| (default) | Default size checkbox |

---

## Small Size

Create a small-sized checkbox:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Small checkbox',
  cssClass: 'e-small'
});
checkbox.appendTo('#checkbox');
```

### Small with Label Before

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Compact',
  labelPosition: 'Before',
  cssClass: 'e-small'
});
checkbox.appendTo('#checkbox');
```

---

## Default Size

The default size checkbox is used when no size class is specified:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Default size checkbox'
  // No cssClass = default size
});
checkbox.appendTo('#checkbox');
```

---

## Larger Sizes via CSS

Create custom larger sizes using CSS:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let largeCheckbox: CheckBox = new CheckBox({
  label: 'Large checkbox',
  cssClass: 'e-large-checkbox'
});
largeCheckbox.appendTo('#large-checkbox');

let xlargeCheckbox: CheckBox = new CheckBox({
  label: 'Extra large checkbox',
  cssClass: 'e-xlarge-checkbox'
});
xlargeCheckbox.appendTo('#xlarge-checkbox');
```

```css
/* Large checkbox */
.e-large-checkbox .e-checkbox-wrapper .e-frame {
  width: 24px;
  height: 24px;
}

.e-large-checkbox .e-checkbox-wrapper .e-label {
  font-size: 18px;
  line-height: 24px;
}

/* Extra large checkbox */
.e-xlarge-checkbox .e-checkbox-wrapper .e-frame {
  width: 32px;
  height: 32px;
}

.e-xlarge-checkbox .e-checkbox-wrapper .e-label {
  font-size: 22px;
  line-height: 32px;
}
```

---

## Size Comparison Example

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

// Small
let small: CheckBox = new CheckBox({
  label: 'Small',
  cssClass: 'e-small'
});
small.appendTo('#small-checkbox');

// Default
let defaultSize: CheckBox = new CheckBox({
  label: 'Default'
});
defaultSize.appendTo('#default-checkbox');

// Large (custom)
let large: CheckBox = new CheckBox({
  label: 'Large',
  cssClass: 'e-large-checkbox'
});
large.appendTo('#large-checkbox');
```

---

## Common Patterns

### Required Field Indicator

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let requiredCheckbox: CheckBox = new CheckBox({
  label: 'I accept the agreement <span style="color: red;">*</span>',
  cssClass: 'required-field'
});
requiredCheckbox.appendTo('#required-checkbox');
```

### Inline Checkbox Group

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let option1: CheckBox = new CheckBox({
  label: 'Option 1',
  labelPosition: 'After'
});
option1.appendTo('#option1');

let option2: CheckBox = new CheckBox({
  label: 'Option 2',
  labelPosition: 'After'
});
option2.appendTo('#option2');
```

```html
<div style="display: flex; gap: 16px; align-items: center;">
  <input type="checkbox" id="option1" />
  <input type="checkbox" id="option2" />
</div>
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string \| HTMLElement` | `''` | Checkbox label text |
| `labelPosition` | `string` | `'After'` | Label position: `Before` or `After` |
| `cssClass` | `string` | `''` | Custom CSS class (use `e-small` for small size) |

For complete API details, see [checkbox-api.md](./checkbox-api.md).
