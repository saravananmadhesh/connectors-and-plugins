# Style and Accessibility — Syncfusion TypeScript DropDownList

## Table of Contents
- [CSS Customization](#css-customization)
- [Float Label with Asterisk](#float-label-with-asterisk)
- [RTL Support](#rtl-support)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Programmatic Focus](#programmatic-focus)

---

## CSS Customization

Use these CSS selectors to override the default DropDownList appearance.

### Wrapper Element (Input)

```css
.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #32a5ab;
}
```

### Dropdown Icon Color

```css
.e-ddl.e-input-group .e-input-group-icon,
.e-ddl.e-input-group.e-control-wrapper .e-input-group-icon:hover {
    color: #bb233d;
    font-size: 13px;
}
```

### Focus Color (Underline)

```css
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::before,
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::after {
    background: #c000ff;
}
```

### Outline Theme Focus Color

```css
.e-outline.e-input-group.e-input-focus:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-outline.e-input-group.e-control-wrapper.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) {
    border-color: #b1bd15;
    box-shadow: inset 1px 1px #b1bd15, inset -1px 0 #b1bd15, inset 0 -1px #b1bd15;
}
```

### Disabled Component Text Color

```css
.e-input-group.e-control-wrapper .e-input[disabled] {
    -webkit-text-fill-color: #0d9133;
}
```

### Float Label Focusing Color

```css
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-control-wrapper.e-input-group:not(.e-float-icon-left) .e-float-line::after {
    background-color: #2319b8;
}

.e-ddl.e-lib.e-input-group.e-control-wrapper.e-float-input.e-input-focus .e-float-text.e-label-top {
    color: #2319b8;
}
```

### Placeholder Text Color

```css
.e-ddl.e-input-group input.e-input::placeholder {
    color: red;
}
```

### List Item Background (Hover / Focus / Active)

```css
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-active.e-hover,
.e-dropdownbase .e-list-item.e-hover {
    background-color: #1f9c99;
    color: #2319b8;
}
```

### Popup List Item Appearance

```css
.e-dropdownbase .e-list-item,
.e-dropdownbase .e-list-item.e-item-focus {
    background-color: #29c2b8;
    color: #207cd9;
    font-family: emoji;
    min-height: 29px;
}
```

---

## Float Label with Asterisk

To add a mandatory asterisk (`*`) to a floating label, use this CSS:

```css
.e-input-group.e-control-wrapper.e-float-input .e-float-text::after {
    content: ' *';
    color: red;
}
```

Combined with `floatLabelType: 'Auto'`:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game',
    floatLabelType: 'Auto'
});
dropDownListObject.appendTo('#ddlelement');
```

---

## RTL Support

Enable right-to-left rendering for RTL languages (Arabic, Hebrew, etc.) using `enableRtl: true`:

```ts
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    enableRtl: true,
    placeholder: 'Select a game'
});
```

---

## WAI-ARIA Attributes

The DropDownList uses the `Listbox` role. Each list item has the `option` role. The following ARIA attributes reflect component state:

| Attribute | Purpose |
|---|---|
| `aria-haspopup` | Indicates whether the input has a popup list |
| `aria-expanded` | Indicates whether the popup is open |
| `aria-selected` | Marks the currently selected option |
| `aria-readonly` | Indicates the readonly state |
| `aria-disabled` | Indicates the disabled state |
| `aria-activedescendent` | ID of the active list item for focus management |
| `aria-owns` | ID of the popup list (child relationship) |

These attributes are applied automatically — no manual configuration needed.

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `Arrow Down` | Selects the first item (if none selected) or next item |
| `Arrow Up` | Selects the previous item |
| `Page Down` | Scrolls down one page; selects the first item in the new page |
| `Page Up` | Scrolls up one page; selects the first item in the new page |
| `Enter` | Selects the focused item and closes the popup; or toggles the popup |
| `Tab` | Closes the popup (if open) and moves focus to the next tab stop |
| `Shift + Tab` | Closes the popup (if open) and moves focus to the previous tab stop |
| `Alt + Down` | Opens the popup |
| `Alt + Up` | Closes the popup |
| `Escape` | Closes the popup; selected item remains unchanged |
| `Home` | Selects the first item |
| `End` | Selects the last item |

---

## Programmatic Focus

Use `focusIn()` to focus the component programmatically:

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    dataSource: gameList,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    popupHeight: '200px'
});
dropDownListObject.appendTo('#ddlelement');

// Focus via Alt+T keyboard shortcut
document.onkeyup = (e) => {
    if (e.altKey && e.keyCode === 84) {
        dropDownListObject.focusIn();
    }
};
```
