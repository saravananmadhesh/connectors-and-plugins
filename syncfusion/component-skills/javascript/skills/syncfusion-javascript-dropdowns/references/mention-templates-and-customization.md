# Templates and Customization — Syncfusion TypeScript Mention

## Table of Contents
- [itemTemplate — Customize Popup Items](#itemtemplate--customize-popup-items)
- [displayTemplate — Customize the Inserted Chip](#displaytemplate--customize-the-inserted-chip)
- [groupTemplate — Group Header Rendering](#grouptemplate--group-header-rendering)
- [showMentionChar — Include Trigger in Chip](#showmentionchar--include-trigger-in-chip)
- [suffixText — Text After Insertion](#suffixtext--text-after-insertion)
- [highlight — Bold Matched Characters](#highlight--bold-matched-characters)
- [cssClass — Component Styling](#cssclass--component-styling)

---

## itemTemplate — Customize Popup Items

`itemTemplate` lets you define custom HTML for each item row in the suggestion popup. Use template syntax with `${property}` to bind data fields.

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { name: 'Alice Johnson', id: 'alice', role: 'Engineer',  avatar: 'AJ' },
  { name: 'Bob Smith',     id: 'bob',   role: 'Designer',  avatar: 'BS' },
  { name: 'Carol White',   id: 'carol', role: 'Manager',   avatar: 'CW' }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  itemTemplate: `
    <div class="mention-item">
      <span class="avatar">\${avatar}</span>
      <div class="details">
        <span class="emp-name">\${name}</span>
        <span class="emp-role">\${role}</span>
      </div>
    </div>
  `
});
mentionObj.appendTo('#mention-element');
```

```css
/* Companion CSS */
.mention-item { display: flex; align-items: center; gap: 8px; padding: 4px; }
.avatar { width: 32px; height: 32px; border-radius: 50%; background: #6264a7;
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: bold; }
.emp-name { font-weight: 600; display: block; }
.emp-role { font-size: 12px; color: #666; }
```

> **Note:** Escape the `$` in template literals to prevent JavaScript evaluating the expression early — use `\${name}` in a template string, or use a regular string with single quotes and `${name}`.

---

## displayTemplate — Customize the Inserted Chip

`displayTemplate` controls the HTML fragment inserted into the target element when the user selects an item. By default, the component inserts a `<span class="e-mention-chip">` with the item's text.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  // Insert a chip with avatar initials + name
  displayTemplate: `
    <span class="custom-chip">
      <span class="chip-avatar">\${avatar}</span>
      <span class="chip-name">\${name}</span>
    </span>
  `
});
mentionObj.appendTo('#mention-element');
```

```css
.custom-chip { display: inline-flex; align-items: center; gap: 4px;
               background: #e8f0fe; border-radius: 12px; padding: 2px 8px;
               font-size: 13px; }
.chip-avatar { font-weight: bold; color: #6264a7; }
```

> `displayTemplate` only applies to contenteditable elements. For plain `<textarea>` and `<input>` targets, only plain text is inserted (chip HTML is not rendered in non-contenteditable elements).

---

## groupTemplate — Group Header Rendering

When `fields.groupBy` is set, `groupTemplate` customizes the section header that separates item groups:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'role' },
  groupTemplate: `<div class="group-header">\${role}</div>`
});
mentionObj.appendTo('#mention-element');
```

```css
.group-header {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #999;
  padding: 4px 8px;
  background: #f5f5f5;
  letter-spacing: 0.5px;
}
```

---

## showMentionChar — Include Trigger in Chip

When `showMentionChar: true`, the configured `mentionChar` (default `@`) is prepended to the chip text on insertion. Users see `@Alice` instead of `Alice`.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  showMentionChar: true    // inserts "@Alice" instead of "Alice"
});
mentionObj.appendTo('#mention-element');
```

This works with a custom `mentionChar` too:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['JavaScript', 'TypeScript', 'Python'],
  mentionChar: '#',
  showMentionChar: true    // inserts "#TypeScript"
});
mentionObj.appendTo('#mention-element');
```

---

## suffixText — Text After Insertion

`suffixText` appends a string immediately after the inserted chip. Use `' '` (space) to keep typing flow natural, or `'\n'` to insert a line break:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  suffixText: ' '    // cursor lands after a space following the chip
});
mentionObj.appendTo('#mention-element');
```

Default is `null` — no suffix is appended.

---

## highlight — Bold Matched Characters

Set `highlight: true` to visually emphasize the typed characters within each suggestion item. Matched text is wrapped in a `<span>` with bold styling.

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['Alice Johnson', 'Alicia Keys', 'Bob Smith', 'Alice Cooper'],
  highlight: true    // typing "ali" bolds "Ali" in "Alice Johnson" and "Alice Cooper"
});
mentionObj.appendTo('#mention-element');
```

Highlighting respects the current `filterType` and `ignoreCase` settings. Combining with `itemTemplate` requires using the built-in template tokens so the component can identify which text nodes to highlight.

---

## cssClass — Component Styling

`cssClass` adds one or more space-separated CSS classes to the Mention component's root and popup elements. Use this to scope custom styles without affecting other components:

```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  cssClass: 'team-mention dark-popup'
});
mentionObj.appendTo('#mention-element');
```

```css
/* Target the popup container */
.team-mention.e-mention.e-popup {
  border: 2px solid #6264a7;
  border-radius: 8px;
}

/* Target each list item */
.team-mention .e-list-item {
  font-family: 'Segoe UI', sans-serif;
}

/* Target the active/selected item */
.team-mention .e-list-item.e-active {
  background-color: #e8f0fe;
  color: #1a0dab;
}
```

Updating `cssClass` after instantiation is supported — the old class is removed and the new one applied automatically.
