# List Blocks in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [BulletList Blocks](#bulletlist-blocks)
  - [Basic Bullet List](#basic-bullet-list)
  - [Nested Bullet Lists](#nested-bullet-lists)
  - [Bullet List with Placeholder](#bullet-list-with-placeholder)
- [NumberedList Blocks](#numberedlist-blocks)
  - [Basic Numbered List](#basic-numbered-list)
  - [Nested Numbered Lists](#nested-numbered-lists)
  - [Numbered List with Placeholder](#numbered-list-with-placeholder)
- [Checklist Blocks](#checklist-blocks)
  - [Basic Checklist](#basic-checklist)
  - [Checklist with isChecked State](#checklist-with-ischecked-state)
  - [Mixed Checked States](#mixed-checked-states)
- [Placeholder Customization](#placeholder-customization)
- [Complete Examples](#complete-examples)

## Overview

List blocks in the BlockEditor allow you to create organized content using bullet points, numbered items, or checkable tasks. The three main list types are BulletList, NumberedList, and Checklist. Each can be nested to create hierarchical structures.

## BulletList Blocks

### Basic Bullet List

Create a simple unordered list with bullet points:

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
    type: 'BulletList',
    content: [
      {
        text: 'First item in the bullet list',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'BulletList',
    content: [
      {
        text: 'Second item in the bullet list',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'BulletList',
    content: [
      {
        text: 'Third item in the bullet list',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Nested Bullet Lists

Create hierarchical bullet lists using the `children` property:

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
    type: 'BulletList',
    content: [
      {
        text: 'Parent item 1',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'BulletList',
        parentId: 'block1',
        content: [
          {
            text: 'Child item 1.1',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block3',
        type: 'BulletList',
        parentId: 'block1',
        content: [
          {
            text: 'Child item 1.2',
            type: 'Text'
          }
        ]
      }
    ]
  },
  {
    id: 'block4',
    type: 'BulletList',
    content: [
      {
        text: 'Parent item 2',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Bullet List with Placeholder

Display placeholder text for empty bullet list items:

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
    type: 'BulletList',
    content: [],
    placeholder: 'Type a bullet point...'
  }
]);
</script>
```

## NumberedList Blocks

### Basic Numbered List

Create an ordered list with automatic numbering:

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
    type: 'NumberedList',
    content: [
      {
        text: 'First numbered item',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'NumberedList',
    content: [
      {
        text: 'Second numbered item',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'NumberedList',
    content: [
      {
        text: 'Third numbered item',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Nested Numbered Lists

Create hierarchical numbered lists:

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
    type: 'NumberedList',
    content: [
      {
        text: 'Step 1: Preparation',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'NumberedList',
        parentId: 'block1',
        content: [
          {
            text: 'Gather materials',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block3',
        type: 'NumberedList',
        parentId: 'block1',
        content: [
          {
            text: 'Set up workspace',
            type: 'Text'
          }
        ]
      }
    ]
  },
  {
    id: 'block4',
    type: 'NumberedList',
    content: [
      {
        text: 'Step 2: Execution',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block5',
        type: 'NumberedList',
        parentId: 'block4',
        content: [
          {
            text: 'Follow instructions',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block6',
        type: 'NumberedList',
        parentId: 'block4',
        content: [
          {
            text: 'Monitor progress',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

### Numbered List with Placeholder

Display placeholder text for empty numbered list items:

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
    type: 'NumberedList',
    content: [],
    placeholder: 'Type a numbered item...'
  }
]);
</script>
```

## Checklist Blocks

### Basic Checklist

Create a task list with checkboxes:

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
    type: 'Checklist',
    content: [
      {
        text: 'Complete project documentation',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Checklist',
    content: [
      {
        text: 'Review code changes',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Checklist',
    content: [
      {
        text: 'Update dependencies',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Checklist with isChecked State

Control the checked state of checklist items:

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
    type: 'Checklist',
    isChecked: true,
    content: [
      {
        text: 'Completed task',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Pending task',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Mixed Checked States

Create a task list with various completion states:

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
    type: 'Checklist',
    isChecked: true,
    content: [
      {
        text: 'Design mockups',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Checklist',
    isChecked: true,
    content: [
      {
        text: 'Setup development environment',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Implement features',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Write unit tests',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Deploy to production',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Placeholder Customization

Customize placeholders for different list types:

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
        text: 'Shopping List',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'BulletList',
    content: [],
    placeholder: 'Add an item to your shopping list...'
  },
  {
    id: 'block3',
    type: 'Heading2',
    content: [
      {
        text: 'Recipe Steps',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'NumberedList',
    content: [],
    placeholder: 'Add the next step...'
  },
  {
    id: 'block5',
    type: 'Heading2',
    content: [
      {
        text: 'Todo List',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block6',
    type: 'Checklist',
    content: [],
    placeholder: 'Add a task...'
  }
]);
</script>
```

## Complete Examples

### Comprehensive List Example

A complete example combining all list types:

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
        text: 'Project Planning Document',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Heading2',
    content: [
      {
        text: 'Team Members',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'BulletList',
    content: [
      {
        text: 'Alice (Project Manager)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'BulletList',
    content: [
      {
        text: 'Bob (Lead Developer)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'BulletList',
    content: [
      {
        text: 'Charlie (Designer)',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block6',
    type: 'Heading2',
    content: [
      {
        text: 'Project Phases',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block7',
    type: 'NumberedList',
    content: [
      {
        text: 'Planning and Requirements',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block8',
    type: 'NumberedList',
    content: [
      {
        text: 'Design and Prototyping',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block9',
    type: 'NumberedList',
    content: [
      {
        text: 'Development',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block10',
    type: 'NumberedList',
    content: [
      {
        text: 'Testing and QA',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block11',
    type: 'NumberedList',
    content: [
      {
        text: 'Deployment',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block12',
    type: 'Heading2',
    content: [
      {
        text: 'Current Tasks',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block13',
    type: 'Checklist',
    isChecked: true,
    content: [
      {
        text: 'Define project scope',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block14',
    type: 'Checklist',
    isChecked: true,
    content: [
      {
        text: 'Create wireframes',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block15',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Develop core features',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block16',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Write documentation',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block17',
    type: 'Checklist',
    isChecked: false,
    content: [
      {
        text: 'Conduct user testing',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

This comprehensive guide covers all list block types (BulletList, NumberedList, and Checklist) in the Vue BlockEditor using the Composition API.
