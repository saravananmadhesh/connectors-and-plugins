# Styling and Appearance in JavaScript ListBox

## Table of Contents
- [Built-in Themes](#built-in-themes)
- [CSS Customization](#css-customization)
- [Using cssClass for Scoped Styles](#using-cssclass-for-scoped-styles)
- [Conditional Item Styling](#conditional-item-styling)
- [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)

---

## Built-in Themes

Syncfusion provides pre-built themes. Reference the CSS in your HTML or import it in your entry file.

### Via HTML `<link>` Tags

```html
<!-- Tailwind 3 (recommended) -->
<link href="node_modules/@syncfusion/ej2-base/styles/tailwind3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css" rel="stylesheet" />
```

### Via ES Module Import

```ts
// Material
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';

// Bootstrap 5
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-inputs/styles/bootstrap5.css';
import '@syncfusion/ej2-dropdowns/styles/bootstrap5.css';

// Fluent (Microsoft)
import '@syncfusion/ej2-base/styles/fluent.css';
import '@syncfusion/ej2-inputs/styles/fluent.css';
import '@syncfusion/ej2-dropdowns/styles/fluent.css';
```

### Available Themes Summary

| Theme | Suffix |
|---|---|
| Tailwind 3 (recommended) | `tailwind3.css` |
| Material | `material.css` |
| Bootstrap 5 | `bootstrap5.css` |
| Fluent | `fluent.css` |
| Fabric (Office) | `fabric.css` |

---

## CSS Customization

Override component styles using the EJ2 CSS class selectors:

### Container Styles

```css
/* ListBox outer container */
.e-listbox-wrapper {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### List Item Styles

```css
/* All items */
.e-listbox-wrapper .e-list-item {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

/* Hover state */
.e-listbox-wrapper .e-list-item:hover {
  background-color: #e3f2fd;
}

/* Selected state */
.e-listbox-wrapper .e-list-item.e-selected {
  background-color: #1976d2;
  color: white;
  font-weight: 500;
}

/* Focused state */
.e-listbox-wrapper .e-list-item:focus {
  outline: 2px solid #1976d2;
  outline-offset: -2px;
}

/* Disabled state */
.e-listbox-wrapper .e-list-item.e-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Group Header Styles

```css
.e-listbox-wrapper .e-list-group-item {
  padding: 10px 16px;
  background-color: #e8e8e8;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #424242;
}
```

---

## Using cssClass for Scoped Styles

Apply a custom CSS class to isolate styles to a specific ListBox instance:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  cssClass: 'custom-listbox'
});

listBox.appendTo('#listbox');
```

```css
/* Styles scoped only to this instance */
.custom-listbox .e-list-item {
  border-left: 3px solid transparent;
}

.custom-listbox .e-list-item.e-selected {
  border-left-color: #1976d2;
  background-color: #e3f2fd;
  color: #1976d2;
}
```

---

## Conditional Item Styling

Style items differently based on their data using `itemTemplate` combined with CSS:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'High Priority', id: '1', priority: 'high' },
  { text: 'Medium Priority', id: '2', priority: 'medium' },
  { text: 'Low Priority', id: '3', priority: 'low' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  itemTemplate: '<div class="list-item priority-${priority}">${text}</div>'
});

listBox.appendTo('#listbox');
```

```css
.list-item { padding: 10px 16px; }
.priority-high { border-left: 4px solid #f44336; color: #f44336; }
.priority-medium { border-left: 4px solid #ff9800; color: #ff9800; }
.priority-low { border-left: 4px solid #4caf50; color: #4caf50; }
```

---

## Responsive Design

Set `height` and `width` as percentages or `auto` for fluid layouts:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  height: '400px',
  width: '100%'
});

listBox.appendTo('#listbox');
```

### RTL Support

Enable right-to-left rendering for RTL locales:

```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  enableRtl: true
});

listBox.appendTo('#listbox');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Custom CSS not applying | Theme CSS loading after custom CSS | Load custom CSS after Syncfusion theme CSS |
| Styles affect all ListBox instances | Global `.e-list-item` selector | Scope styles under `.cssClass` or a parent selector |
| Selected item colors wrong | Specificity conflict | Add `!important` or increase selector specificity |
| Height not working | Conflicting parent CSS | Ensure parent container does not have `overflow: hidden` |
