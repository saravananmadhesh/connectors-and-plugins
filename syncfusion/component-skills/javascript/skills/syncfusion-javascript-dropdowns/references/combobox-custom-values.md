# Custom Values — Syncfusion TypeScript ComboBox

## Table of Contents
- [allowCustom](#allowcustom)
- [autofill — Inline Suggestion](#autofill--inline-suggestion)
- [customValueSpecifier Event](#customvaluespecifier-event)
- [CustomValueSpecifierEventArgs Interface](#customvaluespecifiereventargs-interface)
- [Formatting Custom Values](#formatting-custom-values)
- [Restricting to Existing Values](#restricting-to-existing-values)
- [Clearing Custom Values](#clearing-custom-values)
- [allowObjectBinding with Custom Values](#allowobjectbinding-with-custom-values)

---

## allowCustom

The `allowCustom` property (default `true`) controls whether the user can submit a value that does not exist in the data source.

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';

// Default: allowCustom is true — user can type any value
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowCustom: true,         // user can type 'Rugby' even if not in list
  placeholder: 'Select or type a sport'
});
comboBox.appendTo('#combo-element');
```

When `allowCustom: true` and the user types a value not in the list:
- The typed text becomes `comboBox.text`
- `comboBox.value` is set to the typed text
- The `customValueSpecifier` event fires if you handle it

When `allowCustom: false`:
- If the typed text does not match any list item, the input is cleared on blur
- Only existing list values can be selected

---

## autofill — Inline Suggestion

`autofill: true` enables inline text completion — as the user types, the ComboBox automatically fills the rest of the first matching item's text into the input and selects the completion portion:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Badminton', 'Basketball', 'Cricket', 'Football'],
  autofill: true,
  placeholder: 'Start typing...'
});
comboBox.appendTo('#combo-element');
```

**Behavior:**
- User types `"Ba"` → input shows `"Badminton"` with `"dminton"` selected
- User continues typing to refine → suggestion updates
- User presses Enter or Tab → accepts the suggestion
- User presses Backspace → removes suggestion, keeps typed text

`autofill` works without `allowFiltering`. When both are enabled, the popup filters AND the inline suggestion appears simultaneously.

---

## customValueSpecifier Event

The `customValueSpecifier` event fires when the user types a value that does not exist in the data source and `allowCustom` is `true`. Use it to format, validate, or enrich the custom value before it is stored.

```typescript
import { ComboBox, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: [{ name: 'Cricket', id: '1' }, { name: 'Football', id: '2' }],
  fields: { text: 'name', value: 'id' },
  allowCustom: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    // args.text = the typed custom text
    // Set args.item to define how text and value are stored
    args.item = {
      name: args.text,               // maps to fields.text
      id: args.text.toLowerCase()    // maps to fields.value
    };
  }
});
comboBox.appendTo('#combo-element');
```

After the event handler runs:
- `comboBox.text` = `args.item[fields.text]`
- `comboBox.value` = `args.item[fields.value]`

---

## CustomValueSpecifierEventArgs Interface

```typescript
interface CustomValueSpecifierEventArgs {
  /**
   * The typed custom text entered by the user.
   */
  text: string;

  /**
   * Set this to define the stored value and display text for the custom entry.
   * Keys must match your fields.text and fields.value mappings.
   */
  item: { [key: string]: string | Object };
}
```

If `item` is left as an empty object `{}`, both `text` and `value` default to the raw typed string.

---

## Formatting Custom Values

Use `customValueSpecifier` to apply transformations to user-typed text:

```typescript
import { ComboBox, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: [
    { label: 'Engineering', code: 'ENG' },
    { label: 'Design',      code: 'DES' }
  ],
  fields: { text: 'label', value: 'code' },
  allowCustom: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    // Store uppercase code derived from typed text
    args.item = {
      label: args.text,
      code: args.text.toUpperCase().substring(0, 3)
    };
  },
  placeholder: 'Select or type a department'
});
comboBox.appendTo('#combo-element');
```

**Result:** User types `"Marketing"` → stored as `{ label: 'Marketing', code: 'MAR' }`.

---

## Restricting to Existing Values

Set `allowCustom: false` to force users to pick from the predefined list only:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: ['Cricket', 'Football', 'Tennis'],
  allowCustom: false,        // clears input on blur if typed text has no match
  placeholder: 'Select a sport (must exist in list)'
});
comboBox.appendTo('#combo-element');
```

When the user types text with no match and moves focus away:
- The input is cleared
- `comboBox.value` and `comboBox.text` remain as their previous valid values

---

## Clearing Custom Values

**Via the clear button:**
Setting `showClearButton: true` (default) renders a ✕ button that clears `value`, `text`, and `index` to `null`:

```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowCustom: true,
  showClearButton: true   // default; click ✕ to clear
});
comboBox.appendTo('#combo-element');
```

**Via `clear()` method:**
```typescript
// Programmatically clear the current value
comboBox.clear();
// comboBox.value === null
// comboBox.text  === null
```

**Via `value` property:**
```typescript
comboBox.setProperties({ value: null });
```

---

## allowObjectBinding with Custom Values

When `allowObjectBinding: true`, custom values entered via `customValueSpecifier` are stored as objects:

```typescript
import { ComboBox, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const teamData: { [key: string]: Object }[] = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Design' }
];

const comboBox: ComboBox = new ComboBox({
  dataSource: teamData,
  fields: { text: 'name', value: 'id' },
  allowCustom: true,
  allowObjectBinding: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    // Assign an object — all keys from existing items should be present
    args.item = {
      name: args.text,
      id: null            // new custom item has no id yet
    };
  }
});
comboBox.appendTo('#combo-element');

// After user types 'Marketing':
// comboBox.value === { id: null, name: 'Marketing' }
```

With `allowObjectBinding`, the full object is available in `comboBox.value` for direct use with forms or APIs.
