# Typography Blocks in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Paragraph Blocks](#paragraph-blocks)
  - [Basic Paragraphs](#basic-paragraphs)
  - [Paragraph with Placeholder](#paragraph-with-placeholder)
  - [Multiple Paragraphs](#multiple-paragraphs)
- [Heading Blocks](#heading-blocks)
  - [Heading Level 1](#heading-level-1)
  - [Heading Level 2](#heading-level-2)
  - [Heading Level 3](#heading-level-3)
  - [Heading Level 4](#heading-level-4)
  - [All Heading Levels](#all-heading-levels)
- [Divider Blocks](#divider-blocks)
  - [Basic Divider](#basic-divider)
  - [Divider with Text](#divider-with-text)
- [Placeholder Configuration](#placeholder-configuration)
  - [Custom Placeholders](#custom-placeholders)
  - [Localized Placeholders](#localized-placeholders)
- [Complete Examples](#complete-examples)

## Overview

Typography blocks in the BlockEditor are fundamental building blocks for creating structured content. They include Paragraphs, Headings (levels 1-4), and Dividers. Each block type has specific properties and can be customized with placeholders and content.

## Paragraph Blocks

### Basic Paragraphs

The Paragraph block is the default block type for text content:

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
        text: 'This is a simple paragraph block with plain text content.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Paragraph with Placeholder

Display a placeholder when the paragraph is empty:

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
    content: [],
    placeholder: 'Type your paragraph here...'
  }
]);
</script>
```

### Multiple Paragraphs

Create a document with multiple paragraph blocks:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
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
        text: 'This is the first paragraph in the document.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'This is the second paragraph with some additional content.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [
      {
        text: 'This is the third paragraph that completes the document.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Heading Blocks

### Heading Level 1

The largest heading level, typically used for document titles:

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
    type: 'Heading1',
    content: [
      {
        text: 'Document Title',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Heading Level 2

Used for major section headings:

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
    type: 'Heading2',
    content: [
      {
        text: 'Section Heading',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Heading Level 3

Used for subsection headings:

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
    type: 'Heading3',
    content: [
      {
        text: 'Subsection Heading',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Heading Level 4

The smallest heading level:

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
    type: 'Heading4',
    content: [
      {
        text: 'Minor Heading',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### All Heading Levels

A complete example showing all heading levels:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="600"
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
    type: 'Heading1',
    content: [
      {
        text: 'Main Title (Heading 1)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'This is introductory content for the document.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Heading2',
    content: [
      {
        text: 'Section Title (Heading 2)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Paragraph',
    content: [
      {
        text: 'Content for this section.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Heading3',
    content: [
      {
        text: 'Subsection Title (Heading 3)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block6',
    type: 'Paragraph',
    content: [
      {
        text: 'Content for this subsection.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block7',
    type: 'Heading4',
    content: [
      {
        text: 'Minor Section (Heading 4)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block8',
    type: 'Paragraph',
    content: [
      {
        text: 'Content for this minor section.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Divider Blocks

### Basic Divider

A horizontal rule to separate content sections:

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
        text: 'Content before divider.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Divider'
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [
      {
        text: 'Content after divider.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Divider with Text

Create visual separations in your document:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
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
    type: 'Heading2',
    content: [
      {
        text: 'First Section',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'This is the content of the first section.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Divider'
  },
  {
    id: 'block4',
    type: 'Heading2',
    content: [
      {
        text: 'Second Section',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Paragraph',
    content: [
      {
        text: 'This is the content of the second section.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Placeholder Configuration

### Custom Placeholders

Configure custom placeholders for different block types:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
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
    type: 'Heading1',
    content: [],
    placeholder: 'Enter document title...'
  },
  {
    id: 'block2',
    type: 'Heading2',
    content: [],
    placeholder: 'Enter section heading...'
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [],
    placeholder: 'Start writing your content here...'
  },
  {
    id: 'block4',
    type: 'Heading3',
    content: [],
    placeholder: 'Enter subsection heading...'
  },
  {
    id: 'block5',
    type: 'Paragraph',
    content: [],
    placeholder: 'Add more details...'
  }
]);
</script>
```

### Localized Placeholders

Use localized placeholders for internationalization:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :locale="currentLocale"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';
import { L10n } from '@syncfusion/ej2-base';

// Register German translations
L10n.load({
  'de': {
    'blockeditor': {
      'Heading1': 'Überschrift 1 eingeben...',
      'Heading2': 'Überschrift 2 eingeben...',
      'Paragraph': 'Text eingeben...'
    }
  }
});

const blockEditor = ref(null);
const currentLocale = ref('de');

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [],
    placeholder: 'Überschrift 1 eingeben...'
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [],
    placeholder: 'Text eingeben...'
  }
]);
</script>
```

## Complete Examples

### Document Structure Example

A complete document with all typography block types:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="700"
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
    type: 'Heading1',
    content: [
      {
        text: 'Complete Document Structure',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'This document demonstrates all typography block types available in the BlockEditor.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Divider'
  },
  {
    id: 'block4',
    type: 'Heading2',
    content: [
      {
        text: 'Introduction',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Paragraph',
    content: [
      {
        text: 'The BlockEditor supports various typography blocks for creating structured content.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block6',
    type: 'Heading3',
    content: [
      {
        text: 'Paragraph Blocks',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block7',
    type: 'Paragraph',
    content: [
      {
        text: 'Paragraphs are the most common block type for regular text content.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block8',
    type: 'Heading3',
    content: [
      {
        text: 'Heading Blocks',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block9',
    type: 'Paragraph',
    content: [
      {
        text: 'Headings help organize content into hierarchical sections.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block10',
    type: 'Heading4',
    content: [
      {
        text: 'Using Heading Levels',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block11',
    type: 'Paragraph',
    content: [
      {
        text: 'Choose the appropriate heading level based on the content hierarchy.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block12',
    type: 'Divider'
  },
  {
    id: 'block13',
    type: 'Heading2',
    content: [
      {
        text: 'Conclusion',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block14',
    type: 'Paragraph',
    content: [
      {
        text: 'Typography blocks form the foundation of well-structured documents.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

This comprehensive guide covers all typography block types in the Vue BlockEditor using the Composition API.
