# Accessibility in JavaScript ListBox

## Table of Contents
- [Accessibility Standards](#accessibility-standards)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Troubleshooting](#troubleshooting)

---

## Accessibility Standards

The ListBox component meets the following accessibility standards out of the box:

| Standard | Support |
|---|---|
| WCAG 2.2 AA | ✅ Full support |
| Section 508 (US) | ✅ Full support |
| ADA (Americans with Disabilities Act) | ✅ Compliant |
| ARIA 1.2 | ✅ Full support |
| Screen Readers (NVDA, JAWS, VoiceOver) | ✅ Supported |
| Keyboard Navigation | ✅ Full support |
| Color Contrast | ✅ WCAG AA (4.5:1 minimum) |

---

## ARIA Attributes

The ListBox automatically sets the required ARIA attributes. You can augment them using `htmlAttributes`:

### Auto-Applied ARIA Attributes

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `listbox` | Identifies the component as a listbox |
| `aria-multiselectable` | `true` / `false` | Indicates whether multiple selection is allowed |
| `aria-selected` | `true` / `false` | Marks each item as selected or not |
| `aria-disabled` | `true` / `false` | Marks items as disabled |

### Custom ARIA via `htmlAttributes`

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  htmlAttributes: {
    'aria-label': 'Select a JavaScript framework',
    'aria-description': 'Choose your preferred front-end framework from the list'
  }
});

listBox.appendTo('#listbox');
```

### Label Association

Use an HTML `<label>` pointing to the ListBox element `id` for full screen-reader support:

```html
<label for="framework-list">Select your preferred framework:</label>
<div id="framework-list"></div>
```

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  htmlAttributes: { 'aria-labelledby': 'framework-list-label' }
});

listBox.appendTo('#framework-list');
```

---

## Keyboard Navigation

Keyboard navigation works out of the box. No extra configuration is needed.

### Default Keyboard Shortcuts

| Key | Action |
|---|---|
| **Arrow Up** | Move focus to the previous item |
| **Arrow Down** | Move focus to the next item |
| **Space** | Toggle selection (multiple mode) |
| **Enter** | Select the focused item (single mode) |
| **Home** | Move focus to the first item |
| **End** | Move focus to the last item |
| **Page Up** | Scroll up one visible page |
| **Page Down** | Scroll down one visible page |
| **Shift + Arrow** | Extend the current selection range (multiple mode) |
| **Ctrl + A** | Select all items (multiple mode) |

---

## Screen Reader Support

### Semantic Label with `fieldset`

Wrap the ListBox in a `<fieldset>` for the best semantic structure in forms:

```html
<fieldset>
  <legend>Your Experience Level</legend>
  <div id="level-listbox"></div>
</fieldset>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: [
    { text: 'Beginner', id: '1' },
    { text: 'Intermediate', id: '2' },
    { text: 'Advanced', id: '3' }
  ],
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#level-listbox');
```

### Announce Selection Count

Provide live-region feedback for assistive technology:

```html
<div id="listbox"></div>
<div aria-live="polite" id="selection-status"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { mode: 'Multiple' },
  change: (args) => {
    const status = document.getElementById('selection-status');
    if (status) {
      const count = (args.value as string[]).length;
      status.textContent = `${count} item${count !== 1 ? 's' : ''} selected`;
    }
  }
});

listBox.appendTo('#listbox');
```

---

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL locales:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  enableRtl: true
});

listBox.appendTo('#listbox');
```

### Global RTL

Set RTL globally for all EJ2 components in the app:

```ts
import { enableRtl } from '@syncfusion/ej2-base';

enableRtl(true);
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Screen reader not announcing items | Missing label | Add `aria-label` via `htmlAttributes` or associate a `<label>` |
| Keyboard navigation not working | Component not focused | Click the ListBox first or call `listBox.element.focus()` |
| RTL not applying | Global RTL not set or `enableRtl` missing | Set `enableRtl: true` in the model or call `enableRtl(true)` globally |
| Color contrast fails audit | Custom theme overrides | Test with a contrast checker and ensure 4.5:1 ratio for text on backgrounds |
