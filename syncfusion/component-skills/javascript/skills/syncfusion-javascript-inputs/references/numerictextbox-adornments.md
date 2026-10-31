# Adornments – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Overview](#overview)
- [prependTemplate – Add Content Before Input](#prependtemplate--add-content-before-input)
- [appendTemplate – Add Content After Input](#appendtemplate--add-content-after-input)
- [Linked NumericTextBox Instances](#linked-numerictextbox-instances)
- [Custom Action Icons](#custom-action-icons)

---

## Overview

Adornments let you inject HTML content **before** or **after** the numeric input using the `prependTemplate` and `appendTemplate` properties. They are purely decorative/interactive elements – they do not affect the numeric behavior or the float label.

**Common uses:**
- Currency symbols (`$`, `€`, `¥`)
- Unit labels (`kg`, `cm`, `km`)
- Action icons (reset, add, subtract)
- Visual context indicators

---

## prependTemplate – Add Content Before Input

Set `prependTemplate` to an HTML string to render elements to the left of the input field.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  floatLabelType: 'Auto',
  value: 100,
  placeholder: 'Enter the price',
  prependTemplate: '<span class="e-input-group-icon">$</span>'
});

numeric.appendTo('#numeric');
```

---

## appendTemplate – Add Content After Input

Set `appendTemplate` to add elements to the right of the input field.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  floatLabelType: 'Auto',
  placeholder: 'Enter the weight',
  step: 1,
  value: 5,
  appendTemplate: '<span>kg</span>'
});

numeric.appendTo('#numeric');
```

---

## Linked NumericTextBox Instances

Use adornments alongside the `change` event to keep two NumericTextBox values in sync (e.g., price in one unit auto-converts to another).

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let prependNumeric: NumericTextBox = new NumericTextBox({
  floatLabelType: 'Auto',
  value: 1,
  placeholder: 'Enter the price',
  prependTemplate: '<span id="menu" class="e-icons e-menu" title="Menu"></span><span class="e-input-separator"></span>',
  change: () => {
    appendNumeric.value = prependNumeric.value * 5;
    appendNumeric.dataBind();
  }
});
prependNumeric.appendTo('#prepend');

let appendNumeric: NumericTextBox = new NumericTextBox({
  floatLabelType: 'Auto',
  placeholder: 'Enter the kg',
  step: 1,
  value: 5,
  appendTemplate: '<span>kg</span>',
  change: () => {
    prependNumeric.value = appendNumeric.value / 5;
    prependNumeric.dataBind();
  }
});
appendNumeric.appendTo('#append');
```

Call `dataBind()` after programmatically setting `value` so the component re-renders with the updated value.

---

## Custom Action Icons

Use both `prependTemplate` and `appendTemplate` together with event listeners in the `created` callback to wire up interactive icons.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let iconNumeric: NumericTextBox = new NumericTextBox({
  floatLabelType: 'Auto',
  placeholder: 'Enter the Number',
  value: 10,
  showSpinButton: false,
  prependTemplate: '<span id="reset" class="e-icons e-reset" title="Reset"></span><span class="e-input-separator"></span>',
  appendTemplate: '<span class="e-input-separator"></span><span id="subtract" class="e-icons e-horizontal-line"></span><span class="e-input-separator"></span><span id="plus" class="e-icons e-plus"></span>',
  created: () => {
    // Reset button
    const resetSpan = document.querySelector('#reset') as HTMLElement;
    if (resetSpan) {
      resetSpan.addEventListener('click', () => {
        iconNumeric.value = null;
        iconNumeric.dataBind();
      });
    }

    // Subtract button
    const subtractSpan = document.querySelector('#subtract') as HTMLElement;
    if (subtractSpan) {
      subtractSpan.addEventListener('click', () => {
        iconNumeric.value = iconNumeric.value - 1;
        iconNumeric.dataBind();
      });
    }

    // Plus button
    const plusSpan = document.querySelector('#plus') as HTMLElement;
    if (plusSpan) {
      plusSpan.addEventListener('click', () => {
        iconNumeric.value = iconNumeric.value + 1;
        iconNumeric.dataBind();
      });
    }
  }
});

iconNumeric.appendTo('#icontemplate');
```

**Notes:**
- Wire up DOM event listeners inside the `created` event callback to ensure the template elements are rendered.
- Call `dataBind()` after programmatically updating `value` to reflect the change in the UI.
- `showSpinButton: false` is often paired with custom action icons to avoid redundancy.
