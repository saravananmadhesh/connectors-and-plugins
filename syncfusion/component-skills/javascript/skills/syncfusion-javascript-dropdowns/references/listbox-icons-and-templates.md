# Icons and Templates in JavaScript ListBox

## Table of Contents
- [Adding Icons](#adding-icons)
- [Item Templates](#item-templates)
- [No Records Template](#no-records-template)
- [Troubleshooting](#troubleshooting)

---

## Adding Icons

### Icon CSS Classes via `fields.iconCss`

Map a data property to CSS icon classes using `fields.iconCss`:

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'Audio', id: '1', icon: 'e-icons e-music' },
  { text: 'Video', id: '2', icon: 'e-icons e-video' },
  { text: 'Image', id: '3', icon: 'e-icons e-image' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: {
    text: 'text',
    value: 'id',
    iconCss: 'icon'   // Maps the 'icon' property to the icon CSS class
  }
});

listBox.appendTo('#listbox');
```

### Inline Emoji Icons in Text

Embed emoji directly in the `text` property for a simple, no-CSS approach:

```ts
const data: { [key: string]: Object }[] = [
  { text: '⚙️ JavaScript', id: '1' },
  { text: '📘 TypeScript', id: '2' },
  { text: '⚛️ React', id: '3' },
  { text: '💚 Vue', id: '4' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' }
});

listBox.appendTo('#listbox');
```

---

## Item Templates

Use `itemTemplate` to render a custom HTML string for each list item. The template receives the data item properties as bound variables.

### Basic Item Template with Detail Text

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', level: 'Advanced' },
  { text: 'React', id: '2', level: 'Intermediate' },
  { text: 'Vue', id: '3', level: 'Beginner' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  itemTemplate: '<div style="padding:8px">' +
    '<span>${text}</span>' +
    '<span style="margin-left:10px;color:#999">(${level})</span>' +
    '</div>'
});

listBox.appendTo('#listbox');
```

### Template with Icon and Description

```ts
const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', icon: '⚙️', description: 'Dynamic language for web' },
  { text: 'React', id: '2', icon: '⚛️', description: 'UI library with components' },
  { text: 'TypeScript', id: '3', icon: '📘', description: 'Typed superset of JavaScript' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  itemTemplate: '<div style="display:flex;align-items:center;padding:8px">' +
    '<span style="font-size:20px;margin-right:12px">${icon}</span>' +
    '<div>' +
    '<div style="font-weight:bold">${text}</div>' +
    '<div style="font-size:12px;color:#666">${description}</div>' +
    '</div>' +
    '</div>'
});

listBox.appendTo('#listbox');
```

### Template with Status Badge

```ts
const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', status: 'Stable' },
  { text: 'TypeScript', id: '2', status: 'Stable' },
  { text: 'React 19', id: '3', status: 'Beta' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  itemTemplate: '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px">' +
    '<span>${text}</span>' +
    '<span class="badge badge-${status.toLowerCase()}">${status}</span>' +
    '</div>'
});

listBox.appendTo('#listbox');
```

**CSS:**
```css
.badge { padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.badge-stable { background: #4caf50; color: white; }
.badge-beta { background: #ff9800; color: white; }
```

### Template with Formatted Score

```ts
const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1', score: 95 },
  { text: 'TypeScript', id: '2', score: 88 },
  { text: 'React', id: '3', score: 92 }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  itemTemplate: '<div style="display:flex;justify-content:space-between;padding:8px">' +
    '<span>${text}</span>' +
    '<span style="color:#1976d2;font-weight:600">${score}%</span>' +
    '</div>'
});

listBox.appendTo('#listbox');
```

---

## No Records Template

Customize the message shown when no items match the filter or the data source is empty:

```ts
const listBox: ListBox = new ListBox({
  dataSource: [],
  fields: { text: 'text', value: 'id' },
  noRecordsTemplate: '<div style="text-align:center;padding:20px;color:#999">' +
    '🔍 No items found' +
    '</div>'
});

listBox.appendTo('#listbox');
```

---

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Template shows `${text}` literally | Template string not parsed | Ensure the template uses `${}` syntax (EJ2 template engine), not JSX |
| Icon CSS classes not rendering | Missing icon font | Import the Syncfusion icon font or the relevant icon library CSS |
| Template layout breaks on select | Inline styles overridden | Scope custom CSS under a `cssClass` to prevent theme conflicts |
| `noRecordsTemplate` not showing | Data is not empty | Verify `dataSource` is truly empty or no filter results remain |
