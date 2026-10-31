# Customization — Syncfusion TypeScript ComboBox

## Table of Contents
- [floatLabelType](#floatlabeltype)
- [cssClass](#cssclass)
- [headerTemplate and footerTemplate](#headertemplate-and-footertemplate)
- [placeholder](#placeholder)
- [width](#width)
- [popupHeight and popupWidth](#popupheight-and-popupwidth)
- [readonly Mode](#readonly-mode)
- [Popup Control: showPopup and hidePopup](#popup-control-showpopup-and-hidepopup)
- [Focus Control: focusIn and focusOut](#focus-control-focusin-and-focusout)
- [Spinner: showSpinner and hideSpinner](#spinner-showspinner-and-hidespinner)
- [getItems and getDataByValue](#getitems-and-getdatabyvalue)

---

## floatLabelType

`floatLabelType` controls the behavior of the label above the input field. Works when a `placeholder` is set.

| Value | Behavior |
|---|---|
| `'Never'` | Label stays as placeholder, never floats (default) |
| `'Always'` | Label floats above the input at all times |
| `'Auto'` | Label floats above on focus or when a value is selected |

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

// Auto-floating label
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  floatLabelType: 'Auto',
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

```typescript
// Always-floating label
const comboBox2: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  floatLabelType: 'Always',
  placeholder: 'Sport'
});
comboBox2.appendTo('#combo-element2');
```

---

## cssClass

`cssClass` adds one or more CSS class names to the root element of the component, enabling targeted styling:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  cssClass: 'custom-combo highlighted-combo',
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

```css
/* Target root element */
.custom-combo {
  border: 2px solid #3f51b5;
  border-radius: 4px;
}

/* Target the popup list */
.custom-combo .e-popup {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Target list items */
.custom-combo .e-list-item {
  font-size: 14px;
}
```

---

## headerTemplate and footerTemplate

Inject custom HTML content at the top (`headerTemplate`) or bottom (`footerTemplate`) of the popup list.

**Header template:**
```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  headerTemplate: '<div class="header-content"><span>Available Sports</span></div>',
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

**Footer template:**
```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  footerTemplate: '<div class="footer-info">Total: ' + sportsData.length + ' sports</div>',
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

**Both together:**
```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  fields: { text: 'sport', value: 'id' },
  headerTemplate: '<div class="combo-header"><b>Sports List</b></div>',
  footerTemplate: '<div class="combo-footer"><em>Click or type to select</em></div>'
});
comboBox.appendTo('#combo-element');
```

Templates accept an HTML string. Use inline styles or CSS classes for appearance.

---

## placeholder

Sets the hint text displayed in the input when nothing is selected:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  placeholder: 'Select or type a sport'
});
comboBox.appendTo('#combo-element');
```

Update at runtime:
```typescript
comboBox.setProperties({ placeholder: 'Choose a game' });
```

---

## width

Controls the width of the ComboBox input element. Accepts CSS values (`'px'`, `'%'`, `'em'`) or a number (treated as pixels):

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  width: '350px',            // fixed pixel width
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');

// Or use a number
const comboBox2: ComboBox = new ComboBox({
  dataSource: sportsData,
  width: 350                 // number treated as px
});
comboBox2.appendTo('#combo-element2');
```

Default is `'100%'` — inherits the width of the parent container.

---

## popupHeight and popupWidth

Control the dimensions of the dropdown popup:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: largeSportsData,
  popupHeight: '200px',      // default '300px'
  popupWidth: '400px',       // default '100%' (matches input width)
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

Both accept CSS strings or numbers. `popupWidth` defaults to the component's width.

---

## readonly Mode

`readonly: true` prevents user interaction — the input displays the current value but cannot be changed:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  value: 'Cricket',
  readonly: true,
  placeholder: 'Sport (read-only)'
});
comboBox.appendTo('#combo-element');
```

Toggle readonly at runtime:
```typescript
comboBox.setProperties({ readonly: false });   // re-enable interaction
comboBox.setProperties({ readonly: true });    // disable again
```

When `readonly` is `true`, keyboard event listeners are removed automatically.

---

## Popup Control: showPopup and hidePopup

Open and close the popup programmatically:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');

// Open the popup
document.getElementById('open-btn')!.addEventListener('click', () => {
  comboBox.showPopup();
});

// Close the popup
document.getElementById('close-btn')!.addEventListener('click', () => {
  comboBox.hidePopup();
});
```

`hidePopup()` also triggers custom value resolution if the user has typed an unmatched value and `allowCustom` is `true`.

---

## Focus Control: focusIn and focusOut

Move keyboard focus to or from the component:

```typescript
// Move focus to the ComboBox
comboBox.focusIn();

// Move focus away from the ComboBox
comboBox.focusOut();
```

Use `focusIn()` to programmatically activate the component (e.g., after a form validation failure).

---

## Spinner: showSpinner and hideSpinner

Display a loading spinner inside the component button area during async operations:

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');

// Show spinner during a data fetch
async function loadData(): Promise<void> {
  comboBox.showSpinner();
  try {
    const newData = await fetchSportsData();
    comboBox.setProperties({ dataSource: newData });
  } finally {
    comboBox.hideSpinner();
  }
}
```

The spinner replaces the dropdown arrow button while visible. Call `hideSpinner()` to restore the button.

---

## getItems and getDataByValue

**`getItems()`** — returns all rendered `<li>` elements in the popup list:

```typescript
const allItems: Element[] = comboBox.getItems();
console.log('Total rendered items:', allItems.length);

// Highlight all items matching a condition
allItems.forEach((item: Element) => {
  if (item.textContent?.includes('Cricket')) {
    (item as HTMLElement).style.fontWeight = 'bold';
  }
});
```

**`getDataByValue()`** — returns the data object matching a given value:

```typescript
const dataObject = comboBox.getDataByValue('3');
// Returns: { id: '3', sport: 'Cricket' }

// Useful for looking up related data after selection
const selectedData = comboBox.getDataByValue(comboBox.value as string);
console.log('Selected item data:', selectedData);
```

Both methods require the popup list to have been rendered at least once.
