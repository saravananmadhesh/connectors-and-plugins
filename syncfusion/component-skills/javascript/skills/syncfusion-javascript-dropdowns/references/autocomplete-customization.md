# Customization and Accessibility — Syncfusion TypeScript AutoComplete

## Table of Contents
- [floatLabelType](#floatlabeltype)
- [placeholder](#placeholder)
- [cssClass](#cssclass)
- [itemTemplate](#itemtemplate)
- [groupTemplate](#grouptemplate)
- [noRecordsTemplate](#norecordstemplate)
- [popupHeight and popupWidth](#popupheight-and-popupwidth)
- [Disabled State](#disabled-state)
- [enableRtl](#enablertl)
- [enablePersistence](#enablepersistence)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Accessibility](#aria-accessibility)

---

## floatLabelType

Controls the behavior of the input's placeholder label. Default is `'Never'`.

| Value | Behavior |
|---|---|
| `'Never'` | Label stays as a regular placeholder; disappears when the user types (default) |
| `'Always'` | Label floats above the input at all times, even when empty |
| `'Auto'` | Label floats above after the user focuses the input or enters a value; returns when empty and blurred |

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

// Floating label — moves up when user focuses
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol', 'David'],
  floatLabelType: 'Auto',
  placeholder: 'Search team member'
});
atcObj.appendTo('#atc');
```

```typescript
// Always-visible label above the input
const atcObj2: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  floatLabelType: 'Always',
  placeholder: 'Employee Name'
});
atcObj2.appendTo('#atc2');
```

---

## placeholder

Sets the placeholder text displayed in the input when it is empty. Works together with `floatLabelType`.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  placeholder: 'Type to search...'
});
atcObj.appendTo('#atc');
```

---

## cssClass

Applies one or more CSS class names (space-separated) to the component's root wrapper and popup element. Use it to theme or scope styles.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  cssClass: 'custom-atc compact-input'
});
atcObj.appendTo('#atc');
```

```css
/* Scope styling to this instance */
.custom-atc .e-input {
  border-radius: 20px;
  padding-left: 12px;
}

.custom-atc .e-list-item:hover {
  background-color: #f0f8ff;
}
```

---

## itemTemplate

Specifies a custom HTML template for each suggestion item in the popup list. Supports `${fieldName}` binding syntax.

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { id: 'e1', name: 'Alice Johnson', role: 'Lead Engineer',  avatar: 'AJ' },
  { id: 'e2', name: 'Bob Smith',     role: 'UI Designer',    avatar: 'BS' },
  { id: 'e3', name: 'Carol White',   role: 'Product Manager', avatar: 'CW' }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `
    <div class="emp-item">
      <span class="avatar">\${avatar}</span>
      <div class="emp-info">
        <span class="emp-name">\${name}</span>
        <span class="emp-role">\${role}</span>
      </div>
    </div>
  `,
  placeholder: 'Search employees'
});
atcObj.appendTo('#atc');
```

```css
.emp-item { display: flex; align-items: center; gap: 10px; padding: 4px 0; }
.avatar   { width: 32px; height: 32px; border-radius: 50%; background: #007bff;
            color: #fff; display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 600; flex-shrink: 0; }
.emp-info { display: flex; flex-direction: column; }
.emp-name { font-weight: 600; font-size: 14px; }
.emp-role { font-size: 12px; color: #6c757d; }
```

---

## groupTemplate

Specifies a custom HTML template for group header items. Requires `fields.groupBy` to be set.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: [
    { name: 'Alice', dept: 'Engineering' },
    { name: 'Bob',   dept: 'Design'      }
  ],
  fields: { text: 'name', value: 'name', groupBy: 'dept' },
  groupTemplate: `<div class="group-hdr"><span class="e-icons e-folder"></span> \${dept}</div>`,
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

```css
.group-hdr {
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  color: #495057;
  padding: 4px 8px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
```

---

## noRecordsTemplate

Specifies the HTML shown in the popup when no items match the filter text.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  noRecordsTemplate: '<div class="no-results">No matching results found</div>',
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

```css
.no-results {
  text-align: center;
  padding: 16px;
  color: #6c757d;
  font-style: italic;
}
```

---

## popupHeight and popupWidth

Control the dimensions of the suggestion popup:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: largeList,
  fields: { text: 'name', value: 'id' },
  popupHeight: '250px',  // scrollable height (default '300px')
  popupWidth: '400px',   // width (default '100%' of input width)
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

Both accept a string (e.g. `'250px'`, `'50%'`) or a number (treated as pixels).

---

## Disabled State

Set `enabled: false` to render the component in a disabled, non-interactive state:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  enabled: false,
  placeholder: 'Search (disabled)'
});
atcObj.appendTo('#atc');
```

Toggle disabled state at runtime:

```typescript
// Disable
atcObj.enabled = false;
atcObj.dataBind();

// Re-enable
atcObj.enabled = true;
atcObj.dataBind();
```

---

## enableRtl

Renders the component in right-to-left direction. Useful for Arabic, Hebrew, and other RTL languages.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['أحمد', 'فاطمة', 'محمد'],
  enableRtl: true,
  placeholder: 'بحث'
});
atcObj.appendTo('#atc');
```

---

## enablePersistence

When `true`, the component's current value is saved to `localStorage` and restored on page reload.

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: ['Alice', 'Bob', 'Carol'],
  enablePersistence: true,
  placeholder: 'Search (persisted)'
});
atcObj.appendTo('#atc');
```

---

## Keyboard Navigation

The AutoComplete supports full keyboard navigation out of the box:

| Key | Action |
|---|---|
| **Any character** | Types into input; triggers filtering after `minLength` is met |
| **↓ Down Arrow** | Opens popup if closed; moves focus down through suggestion items |
| **↑ Up Arrow** | Moves focus up through suggestion items |
| **Enter** | Selects the focused suggestion item |
| **Tab** | Selects the focused item and moves browser focus to next element |
| **Escape** | Closes the popup without selecting |
| **Backspace / Delete** | Clears typed text; closes popup if input becomes shorter than `minLength` |

---

## ARIA Accessibility

The AutoComplete component automatically applies ARIA attributes to its input and popup:

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `"combobox"` | Identifies the input as a combobox |
| `aria-autocomplete` | `"list"` | Indicates the input has an autocomplete list |
| `aria-expanded` | `"true"` / `"false"` | Whether the popup is open |
| `aria-owns` | `"{popupId}"` | Associates the input with the suggestion popup |
| `aria-activedescendant` | `"{activeItemId}"` | Identifies the currently focused suggestion item |
| `aria-haspopup` | `"listbox"` | Declares the popup is a listbox |

Use `htmlAttributes` to add extra accessibility attributes to the input:

```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  htmlAttributes: {
    'aria-label': 'Search for a team member',
    'aria-required': 'true',
    name: 'teamMember'
  },
  placeholder: 'Search team'
});
atcObj.appendTo('#atc');
```
