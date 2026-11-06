# Smart Editing (Mentions, Slash Menu, Emoji, Mail Merge)

## Table of Contents
- [Mentions (@tag)](#mentions-tag)
- [Slash Menu (/)](#slash-menu-)
- [Emoji Picker](#emoji-picker)
- [Mail Merge (Placeholder Fields)](#mail-merge-placeholder-fields)

---

## Mentions (@tag)

Integrates the Syncfusion `Mention` control with the RTE to let users type `@` and pick from a suggestion list.

### Required packages

```bash
npm install @syncfusion/ej2-dropdowns
```

### Setup

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { Mention } from '@syncfusion/ej2-dropdowns';
RichTextEditor.Inject(Toolbar, HtmlEditor, QuickToolbar);

const emailData = [
  { Name: 'Selma Rose', EmailId: 'selma@example.com' },
  { Name: 'Robert', EmailId: 'robert@example.com' }
];

const editor = new RichTextEditor({
  placeholder: 'Type @ to tag someone...'
});
editor.appendTo('#editor');

// Attach Mention to the editor's input element
const mention = new Mention({
  target: editor.inputElement,    // use editor.inputElement as target
  dataSource: emailData,
  fields: { text: 'Name' },
  minLength: 0,                   // 0 = show list immediately after '@'
  // minLength: 3 = require 3 chars typed after '@' before showing list
});
mention.appendTo('#mentionEditor');  // empty <div id="mentionEditor"></div> in HTML
```

### Key `Mention` properties

| Property | Description |
|----------|-------------|
| `target` | The `editor.inputElement` of the RTE |
| `dataSource` | Array of objects to show in suggestions |
| `fields.text` | Field name to display in suggestion list |
| `minLength` | Min chars after `@` to trigger suggestions (default: `0`) |
| `suggestionCount` | Max items to show (default: `5`) |
| `allowSpaces` | Allow spaces in mention search |

> **Note**: For Iframe editors, use `target: '#rteId_rte-edit-view'` (append `_rte-edit-view` suffix to the RTE element ID).

---

## Slash Menu (/)

When users type `/` at the start of a line, a command menu appears with formatting and insertion options.

### Required module

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, SlashMenu, SlashMenuItemSelectArgs } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, SlashMenu);
```

### Enable with built-in items

```typescript
const editor = new RichTextEditor({
  slashMenuSettings: {
    enable: true,
    items: [
      'Paragraph', 'Heading 1', 'Heading 2', 'Heading 3',
      'Heading 4', 'OrderedList', 'UnorderedList',
      'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video',
      'Audio', 'Table', 'Emojipicker'
    ],
    popupWidth: 300,
    popupHeight: 350
  }
});
```

### Add custom slash menu items

```typescript
const editor = new RichTextEditor({
  slashMenuSettings: {
    enable: true,
    items: [
      'Paragraph', 'Heading 1',
      {
        text: 'Meeting Notes',
        command: 'MeetingNotes',
        type: 'Basic Blocks',
        iconCss: 'e-icons e-justify',
        description: 'Insert a meeting notes template'
      }
    ]
  },
  actionBegin: (args: SlashMenuItemSelectArgs) => {
    if (args.requestType === 'SlashMenuSelect' && args.command === 'MeetingNotes') {
      editor.executeCommand('insertHTML', '<p><strong>Meeting Notes</strong></p>');
      args.cancel = true;
    }
  }
});
```

### `slashMenuSettings` reference

| Property | Default | Description |
|----------|---------|-------------|
| `enable` | `false` | Enable/disable slash menu |
| `items` | Built-in set | Built-in item names or custom item objects |
| `popupWidth` | `300` | Popup width in px |
| `popupHeight` | `350` | Popup height in px |

---

## Emoji Picker

### Required module

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, EmojiPicker } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, EmojiPicker);
```

### Add to toolbar

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['EmojiPicker']
  }
});
```

### Custom emoji set

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['EmojiPicker'] },
  emojiPickerSettings: {
    iconsSet: [
      {
        name: 'Smilies & People',
        code: '1F600',
        iconCss: 'e-emoji',
        icons: [
          { code: '1F600', desc: 'Grinning face' },
          { code: '1F602', desc: 'Face with tears of joy' },
          { code: '1F60A', desc: 'Smiling face with smiling eyes' }
        ]
      },
      {
        name: 'Animals & Nature',
        code: '1F435',
        iconCss: 'e-animals',
        icons: [
          { code: '1F436', desc: 'Dog face' },
          { code: '1F431', desc: 'Cat face' }
        ]
      }
    ]
  }
});
```

---

## Mail Merge (Placeholder Fields)

Implement mail merge by using custom toolbar items that insert `{{PlaceholderName}}` tokens into the editor, then replace them with real data on demand.

### Required packages

```bash
npm install @syncfusion/ej2-splitbuttons
```

### Pattern

```typescript
import { RichTextEditor, Toolbar, HtmlEditor } from '@syncfusion/ej2-richtexteditor';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
RichTextEditor.Inject(Toolbar, HtmlEditor);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: [
      'Bold', 'Italic', '|',
      { tooltipText: 'Insert Field', template: '#insertField', command: 'Custom' },
      { tooltipText: 'Merge Data',   template: '#mergeData',   command: 'Custom' }
    ]
  }
});
editor.appendTo('#editor');

// Dropdown to insert placeholders
const fields: ItemModel[] = [
  { text: 'First Name' },
  { text: 'Last Name' },
  { text: 'Company Name' }
];

const insertField = new DropDownButton({
  items: fields,
  select: (args) => {
    const placeholder = `{{${args.item.text.replace(/ /g, '')}}}`;
    editor.executeCommand('insertHTML', placeholder);
  }
});
insertField.appendTo('#insertField');

// Replace placeholders with data
const mergeData = {
  FirstName: 'John',
  LastName: 'Doe',
  CompanyName: 'Syncfusion'
};

document.getElementById('mergeDataBtn').addEventListener('click', () => {
  let content = editor.getHtml();
  Object.keys(mergeData).forEach((key) => {
    content = content.replace(new RegExp(`{{${key}}}`, 'g'), mergeData[key]);
  });
  editor.value = content;
  editor.dataBind();
});
```

### HTML template elements

```html
<div id="editor"></div>
<div id="mentionEditor"></div>
<button id="insertField">Insert Field ▾</button>
<button id="mergeDataBtn">Merge Data</button>
```
