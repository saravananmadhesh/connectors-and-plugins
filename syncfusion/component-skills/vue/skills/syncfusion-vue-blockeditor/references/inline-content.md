# Inline Content in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [ContentModel Structure](#contentmodel-structure)
- [Content Types](#content-types)
  - [Text Content](#text-content)
  - [Link Content](#link-content)
  - [Mention Content](#mention-content)
  - [Label Content](#label-content)
  - [InlineCode Content](#inlinecode-content)
- [Inline Styles](#inline-styles)
  - [Bold Text](#bold-text)
  - [Italic Text](#italic-text)
  - [Underline Text](#underline-text)
  - [Strikethrough Text](#strikethrough-text)
  - [Subscript and Superscript](#subscript-and-superscript)
  - [Text Color](#text-color)
  - [Background Color](#background-color)
- [Link Properties](#link-properties)
- [Mention Configuration](#mention-configuration)
- [Label Settings](#label-settings)
- [Complete Examples](#complete-examples)

## Overview

Inline content in the BlockEditor represents the text and formatting within blocks. Each block contains a `content` property that is an array of `ContentModel` objects. These objects define text segments with their associated formatting and properties.

## ContentModel Structure

The `ContentModel` interface defines the structure of inline content:

```typescript
interface ContentModel {
  text: string;              // The text content
  type?: ContentType;        // Type: 'Text' | 'Link' | 'Mention' | 'Label' | 'InlineCode'
  url?: string;              // URL for links
  title?: string;            // Title attribute for links
  target?: string;           // Target for links (_blank, _self, etc.)
  mentionId?: string;        // ID for mentions
  labelId?: string;          // ID for labels
  format?: FormatStyle;      // Inline formatting
}
```

## Content Types

### Text Content

Plain text is the default content type. Each text segment can have different formatting applied:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This is plain text content. ',
        type: 'Text'
      },
      {
        text: 'This is another text segment.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Link Content

Links are inline content with URL, title, and target properties:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Visit ',
        type: 'Text'
      },
      {
        text: 'Syncfusion',
        type: 'Link',
        url: 'https://www.syncfusion.com',
        title: 'Syncfusion Official Website',
        target: '_blank'
      },
      {
        text: ' for more information.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Mention Content

Mentions allow you to reference users, items, or entities:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :mentionSettings="mentionSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const mentionSettings = ref({
  dataSource: [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' }
  ],
  fields: { text: 'name', value: 'id' },
  displayTemplate: '<span>@${name}</span>',
  popupWidth: '250px',
  popupHeight: '200px',
  trigger: '@'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Hey ',
        type: 'Text'
      },
      {
        text: '@Alice Johnson',
        type: 'Mention',
        mentionId: '1'
      },
      {
        text: ', can you review this?',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Label Content

Labels (also called tags) are inline content triggered by special characters:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :labelSettings="labelSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const labelSettings = ref({
  dataSource: [
    { id: 'tag1', name: 'urgent', color: '#ff0000' },
    { id: 'tag2', name: 'review', color: '#00ff00' },
    { id: 'tag3', name: 'documentation', color: '#0000ff' }
  ],
  fields: { text: 'name', value: 'id' },
  trigger: '#'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This task is ',
        type: 'Text'
      },
      {
        text: '#urgent',
        type: 'Label',
        labelId: 'tag1'
      },
      {
        text: ' and needs ',
        type: 'Text'
      },
      {
        text: '#review',
        type: 'Label',
        labelId: 'tag2'
      }
    ]
  }
]);
</script>
```

### InlineCode Content

Inline code displays text in a monospace font for code snippets:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Use the ',
        type: 'Text'
      },
      {
        text: 'console.log()',
        type: 'InlineCode'
      },
      {
        text: ' method to debug your code.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Inline Styles

### Bold Text

Apply bold formatting using the `format` property:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This is normal text and ',
        type: 'Text'
      },
      {
        text: 'this is bold text',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Italic Text

Apply italic formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This is normal text and ',
        type: 'Text'
      },
      {
        text: 'this is italic text',
        type: 'Text',
        format: { fontStyle: 'italic' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Underline Text

Apply underline formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This is normal text and ',
        type: 'Text'
      },
      {
        text: 'this is underlined text',
        type: 'Text',
        format: { textDecoration: 'underline' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Strikethrough Text

Apply strikethrough formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Regular price: ',
        type: 'Text'
      },
      {
        text: '$100',
        type: 'Text',
        format: { textDecoration: 'line-through' }
      },
      {
        text: ' Sale price: $75',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Subscript and Superscript

Apply subscript and superscript formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'The formula for water is H',
        type: 'Text'
      },
      {
        text: '2',
        type: 'Text',
        format: { verticalAlign: 'sub' }
      },
      {
        text: 'O.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'Einstein\'s equation: E=mc',
        type: 'Text'
      },
      {
        text: '2',
        type: 'Text',
        format: { verticalAlign: 'super' }
      }
    ]
  }
]);
</script>
```

### Text Color

Apply text color formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :fontColorSettings="fontColorSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const fontColorSettings = ref({
  colorCode: {
    'Custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3']
  },
  modeSwitcher: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This text is ',
        type: 'Text'
      },
      {
        text: 'red',
        type: 'Text',
        format: { color: '#ff0000' }
      },
      {
        text: ', this is ',
        type: 'Text'
      },
      {
        text: 'blue',
        type: 'Text',
        format: { color: '#0000ff' }
      },
      {
        text: ', and this is ',
        type: 'Text'
      },
      {
        text: 'green',
        type: 'Text',
        format: { color: '#00ff00' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Background Color

Apply background color formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :backgroundColorSettings="backgroundColorSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const backgroundColorSettings = ref({
  colorCode: {
    'Custom': ['#ffeb3b', '#ff9800', '#f44336', '#e91e63', '#9c27b0', '#673ab7']
  },
  modeSwitcher: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This text has a ',
        type: 'Text'
      },
      {
        text: 'yellow background',
        type: 'Text',
        format: { backgroundColor: '#ffff00' }
      },
      {
        text: ', this has a ',
        type: 'Text'
      },
      {
        text: 'pink background',
        type: 'Text',
        format: { backgroundColor: '#ffc0cb' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Link Properties

Complete link configuration with all available properties:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Internal link: ',
        type: 'Text'
      },
      {
        text: 'Home Page',
        type: 'Link',
        url: '/home',
        title: 'Go to home page',
        target: '_self'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'External link: ',
        type: 'Text'
      },
      {
        text: 'Documentation',
        type: 'Link',
        url: 'https://docs.example.com',
        title: 'View documentation',
        target: '_blank'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [
      {
        text: 'Email link: ',
        type: 'Text'
      },
      {
        text: 'contact@example.com',
        type: 'Link',
        url: 'mailto:contact@example.com',
        title: 'Send email'
      }
    ]
  }
]);
</script>
```

## Mention Configuration

Advanced mention settings with custom templates:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :mentionSettings="mentionSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const mentionSettings = ref({
  dataSource: [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Tester' }
  ],
  fields: { text: 'name', value: 'id' },
  displayTemplate: '<div><strong>@${name}</strong><br/><small>${role}</small></div>',
  itemTemplate: '<div><strong>${name}</strong> - ${email}<br/><small>${role}</small></div>',
  popupWidth: '300px',
  popupHeight: '250px',
  trigger: '@',
  allowSpaces: true,
  minLength: 1,
  sortOrder: 'Ascending'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Team members: ',
        type: 'Text'
      },
      {
        text: '@Alice Johnson',
        type: 'Mention',
        mentionId: '1'
      },
      {
        text: ', ',
        type: 'Text'
      },
      {
        text: '@Bob Smith',
        type: 'Mention',
        mentionId: '2'
      }
    ]
  }
]);
</script>
```

## Label Settings

Advanced label configuration with colors and triggers:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :labelSettings="labelSettings"
      :height="400"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const labelSettings = ref({
  dataSource: [
    { id: 'tag1', name: 'urgent', color: '#ff0000', category: 'priority' },
    { id: 'tag2', name: 'review', color: '#00ff00', category: 'status' },
    { id: 'tag3', name: 'documentation', color: '#0000ff', category: 'type' },
    { id: 'tag4', name: 'bug', color: '#ff00ff', category: 'type' },
    { id: 'tag5', name: 'feature', color: '#00ffff', category: 'type' }
  ],
  fields: { text: 'name', value: 'id' },
  trigger: '#',
  allowSpaces: false,
  minLength: 1,
  popupWidth: '200px',
  popupHeight: '150px'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Tags: ',
        type: 'Text'
      },
      {
        text: '#urgent',
        type: 'Label',
        labelId: 'tag1'
      },
      {
        text: ' ',
        type: 'Text'
      },
      {
        text: '#bug',
        type: 'Label',
        labelId: 'tag4'
      },
      {
        text: ' ',
        type: 'Text'
      },
      {
        text: '#review',
        type: 'Label',
        labelId: 'tag2'
      }
    ]
  }
]);
</script>
```

## Complete Examples

### Rich Text Formatting Example

Combining multiple inline styles and content types:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :mentionSettings="mentionSettings"
      :labelSettings="labelSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const mentionSettings = ref({
  dataSource: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ],
  fields: { text: 'name', value: 'id' },
  trigger: '@'
});

const labelSettings = ref({
  dataSource: [
    { id: 'tag1', name: 'important' },
    { id: 'tag2', name: 'todo' }
  ],
  fields: { text: 'name', value: 'id' },
  trigger: '#'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This document contains ',
        type: 'Text'
      },
      {
        text: 'bold text',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: ', ',
        type: 'Text'
      },
      {
        text: 'italic text',
        type: 'Text',
        format: { fontStyle: 'italic' }
      },
      {
        text: ', ',
        type: 'Text'
      },
      {
        text: 'underlined text',
        type: 'Text',
        format: { textDecoration: 'underline' }
      },
      {
        text: ', and ',
        type: 'Text'
      },
      {
        text: 'colored text',
        type: 'Text',
        format: { color: '#ff0000', backgroundColor: '#ffff00' }
      },
      {
        text: '.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'Visit ',
        type: 'Text'
      },
      {
        text: 'our website',
        type: 'Link',
        url: 'https://example.com',
        target: '_blank'
      },
      {
        text: ' for more information.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [
      {
        text: 'Mention: ',
        type: 'Text'
      },
      {
        text: '@John Doe',
        type: 'Mention',
        mentionId: '1'
      },
      {
        text: ' Label: ',
        type: 'Text'
      },
      {
        text: '#important',
        type: 'Label',
        labelId: 'tag1'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Paragraph',
    content: [
      {
        text: 'Inline code: ',
        type: 'Text'
      },
      {
        text: 'const x = 10;',
        type: 'InlineCode'
      }
    ]
  }
]);
</script>
```

This comprehensive guide covers all inline content types, formatting options, and configurations available in the Vue BlockEditor using the Composition API.
