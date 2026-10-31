# Smart Editing Features

## Table of Contents
- [Slash Menu](#slash-menu)
- [Emoji Picker](#emoji-picker)
- [Mention Support](#mention-support)
- [Mail Merge](#mail-merge)

## Slash Menu

The slash menu is a command palette that appears when the user types `/` in the editor. It provides quick access to formatting commands, content insertion, and custom actions.

### Enable Slash Menu

Inject `SlashMenu` and set `slashMenuSettings.enable: true`.

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :slashMenuSettings="slashMenuSettings"
    placeholder="Type '/' to open the command menu"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar, SlashMenu
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
};
const slashMenuSettings = {
  enable: true,
  items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4',
    'OrderedList', 'UnorderedList', 'CodeBlock', 'Blockquote',
    'Link', 'Image', 'Table', 'Emojipicker']
};
provide('richtexteditor', [Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar, SlashMenu]);
</script>
```

### Customize Popup Size

```js
const slashMenuSettings = {
  enable: true,
  items: ['Paragraph', 'Heading 1', 'Heading 2'],
  popupHeight: 300,
  popupWidth: 250
};
```

### Custom Slash Menu Items

Add custom entries with `type: 'Custom'` and handle them via `slashMenuItemSelect`:

```vue
<template>
  <ejs-richtexteditor
    :slashMenuSettings="slashMenuSettings"
    :slashMenuItemSelect="onSlashMenuItemSelect"
  />
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar, SlashMenu
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);

const slashMenuSettings = {
  enable: true,
  items: [
    'Paragraph', 'Heading 1', 'Heading 2', 'OrderedList', 'UnorderedList',
    {
      text: 'Meeting Notes',
      description: 'Insert a meeting note template.',
      iconCss: 'e-icons e-description',
      type: 'Custom',
      command: 'MeetingNotes'
    }
  ]
};

const meetingNotes = `<p><strong>Meeting Notes</strong></p>
<table class="e-rte-table" style="width:100%">
  <tr><td><strong>Attendees</strong></td><td></td></tr>
  <tr><td><strong>Date & Time</strong></td><td></td></tr>
  <tr><td><strong>Agenda</strong></td><td></td></tr>
  <tr><td><strong>Action Items</strong></td><td></td></tr>
</table>`;

const onSlashMenuItemSelect = (args) => {
  if (args.item.command === 'MeetingNotes') {
    rteRef.value.ej2Instances.executeCommand('insertHTML', meetingNotes);
  }
};
provide('richtexteditor', [Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar, SlashMenu]);
</script>
```

## Emoji Picker

The emoji picker provides a panel for inserting emojis via the toolbar.

### Enable Emoji Picker

Inject `EmojiPicker` and add `EmojiPicker` to the toolbar items.

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :emojiPickerSettings="emojiPickerSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar, EmojiPicker
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', '|',
    'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|',
    'EmojiPicker', '|', 'Undo', 'Redo']
};

// Optional: customize the emoji sets
const emojiPickerSettings = {
  iconsSet: [
    {
      name: 'Smilies & People', code: '1F600', iconCss: 'e-emoji',
      icons: [
        { code: '1F600', desc: 'Grinning face' },
        { code: '1F603', desc: 'Grinning face with big eyes' },
        { code: '1F604', desc: 'Grinning face with smiling eyes' },
        { code: '1F602', desc: 'Face with tears of joy' }
      ]
    }
  ]
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar, EmojiPicker]);
</script>
```

The default emoji picker includes pre-configured emoji categories. You only need to provide `emojiPickerSettings` if you want to customize the available emojis.

## Mention Support

Mention integrates the separate Syncfusion Mention component with the Rich Text Editor so that users can type `@` to trigger a suggestion list.

### Install Dependencies

```bash
npm install @syncfusion/ej2-vue-dropdowns
```

### Setup

The `target` property of the Mention component must point to the editor's content editable area, using the editor's `id` with `_rte-edit-view` suffix.

```vue
<template>
  <div>
    <ejs-richtexteditor
      id="mention-editor"
      :value="value"
      placeholder="Type @ to mention someone"
    />
    <ejs-mention
      target="#mention-editor_rte-edit-view"
      :dataSource="mentionData"
      :fields="fieldsData"
      :minLength="1"
    />
  </div>
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, HtmlEditor
} from '@syncfusion/ej2-vue-richtexteditor';
import { MentionComponent as EjsMention } from '@syncfusion/ej2-vue-dropdowns';

const value = '<p>Type @ followed by a name to mention a user.</p>';
const mentionData = [
  { name: 'Alice Johnson', id: '1' },
  { name: 'Bob Smith', id: '2' },
  { name: 'Carol White', id: '3' }
];
const fieldsData = { text: 'name', value: 'id' };
provide('richtexteditor', [Toolbar, Link, HtmlEditor]);
</script>
```

### Control Suggestion Trigger

Use `minLength` to require the user to type a minimum number of characters after `@` before suggestions appear:

```vue
<!-- Show suggestions after typing 3+ chars after @ -->
<ejs-mention :minLength="3" ... />
```

## Mail Merge

Mail merge lets users insert placeholder fields (e.g., `{{FirstName}}`) into the editor that are later replaced with actual data. This is implemented using custom toolbar items.

```vue
<template>
  <ejs-richtexteditor
    ref="rteRef"
    :toolbarSettings="toolbarSettings"
  />
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'CreateLink', 'Image', '|',
    {
      tooltipText: 'Insert Field',
      template: '<button id="insert-field" class="e-tbar-btn e-control e-btn">Insert Field</button>',
      command: 'Custom'
    },
    {
      tooltipText: 'Merge Data',
      template: '<button id="merge-data" class="e-tbar-btn e-control e-btn">Merge Data</button>',
      command: 'Custom'
    },
    '|', 'Undo', 'Redo'
  ]
};

const mergeData = {
  FirstName: 'John',
  LastName: 'Doe',
  Company: 'Acme Corp'
};

// Wire up buttons after component creation
const onCreated = () => {
  document.getElementById('insert-field').onclick = () => {
    rteRef.value.ej2Instances.executeCommand('insertHTML', '{{FirstName}}');
  };
  document.getElementById('merge-data').onclick = () => {
    let content = rteRef.value.ej2Instances.getHtml();
    Object.entries(mergeData).forEach(([key, val]) => {
      content = content.replaceAll(`{{${key}}}`, val);
    });
    rteRef.value.ej2Instances.value = content;
    rteRef.value.dataBind();
  };
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```
