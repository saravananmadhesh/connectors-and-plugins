# Nested Blocks in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Children Property](#children-property)
- [Parent-Child Relationships](#parent-child-relationships)
  - [ParentId Configuration](#parentid-configuration)
  - [Multi-Level Nesting](#multi-level-nesting)
- [CollapsibleHeading Blocks](#collapsibleheading-blocks)
  - [CollapsibleHeading1](#collapsibleheading1)
  - [CollapsibleHeading2](#collapsibleheading2)
  - [CollapsibleHeading3](#collapsibleheading3)
  - [CollapsibleHeading4](#collapsibleheading4)
- [CollapsibleParagraph Blocks](#collapsibleparagraph-blocks)
- [IsExpanded Configuration](#isexpanded-configuration)
- [Quote Blocks](#quote-blocks)
- [Callout Blocks](#callout-blocks)
- [Complete Examples](#complete-examples)

## Overview

Nested blocks in the BlockEditor allow you to create hierarchical content structures. Blocks can contain child blocks through the `children` property, and child blocks reference their parent using `parentId`. This enables complex document structures with collapsible sections, nested lists, quotes, and callouts.

## Children Property

The `children` property contains an array of child blocks:

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
        text: 'Parent block with children',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'First child block',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block3',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'Second child block',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

## Parent-Child Relationships

### ParentId Configuration

Child blocks must reference their parent using `parentId`:

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
    id: 'parent1',
    type: 'BulletList',
    content: [
      {
        text: 'Parent item',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'child1',
        type: 'BulletList',
        parentId: 'parent1',
        content: [
          {
            text: 'Child item 1',
            type: 'Text'
          }
        ]
      },
      {
        id: 'child2',
        type: 'BulletList',
        parentId: 'parent1',
        content: [
          {
            text: 'Child item 2',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

### Multi-Level Nesting

Create deeply nested structures:

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
    id: 'level1',
    type: 'BulletList',
    content: [
      {
        text: 'Level 1',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'level2',
        type: 'BulletList',
        parentId: 'level1',
        content: [
          {
            text: 'Level 2',
            type: 'Text'
          }
        ],
        children: [
          {
            id: 'level3',
            type: 'BulletList',
            parentId: 'level2',
            content: [
              {
                text: 'Level 3',
                type: 'Text'
              }
            ],
            children: [
              {
                id: 'level4',
                type: 'BulletList',
                parentId: 'level3',
                content: [
                  {
                    text: 'Level 4',
                    type: 'Text'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);
</script>
```

## CollapsibleHeading Blocks

### CollapsibleHeading1

Create a collapsible heading level 1 with child content:

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
    type: 'CollapsibleHeading1',
    isExpanded: true,
    content: [
      {
        text: 'Collapsible Section',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'This content can be collapsed.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

### CollapsibleHeading2

Create a collapsible heading level 2:

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
    type: 'CollapsibleHeading2',
    isExpanded: true,
    content: [
      {
        text: 'Section Details',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'Detailed information goes here.',
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
            text: 'Bullet point 1',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block4',
        type: 'BulletList',
        parentId: 'block1',
        content: [
          {
            text: 'Bullet point 2',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

### CollapsibleHeading3

Create a collapsible heading level 3:

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
    type: 'CollapsibleHeading3',
    isExpanded: false,
    content: [
      {
        text: 'Collapsed by Default',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'This content is hidden until expanded.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

### CollapsibleHeading4

Create a collapsible heading level 4:

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
    type: 'CollapsibleHeading4',
    isExpanded: true,
    content: [
      {
        text: 'Sub-subsection',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'Detailed sub-subsection content.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

## CollapsibleParagraph Blocks

Create collapsible paragraphs with expandable content:

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
    type: 'CollapsibleParagraph',
    isExpanded: true,
    content: [
      {
        text: 'Click to collapse this paragraph',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'Hidden content that expands when opened.',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block3',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'Additional hidden content.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

## IsExpanded Configuration

Control the expanded state of collapsible blocks:

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
    type: 'CollapsibleHeading2',
    isExpanded: true,
    content: [
      {
        text: 'Expanded Section',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block2',
        type: 'Paragraph',
        parentId: 'block1',
        content: [
          {
            text: 'This section is visible by default.',
            type: 'Text'
          }
        ]
      }
    ]
  },
  {
    id: 'block3',
    type: 'CollapsibleHeading2',
    isExpanded: false,
    content: [
      {
        text: 'Collapsed Section',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block4',
        type: 'Paragraph',
        parentId: 'block3',
        content: [
          {
            text: 'This section is hidden by default.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

## Quote Blocks

Create quote blocks for highlighting cited text:

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
    type: 'Quote',
    content: [
      {
        text: 'To be, or not to be, that is the question.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: '— William Shakespeare',
        type: 'Text',
        format: { fontStyle: 'italic' }
      }
    ]
  }
]);
</script>
```

## Callout Blocks

Create callout blocks for important information:

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
    type: 'Callout',
    calloutType: 'info',
    content: [
      {
        text: 'Information: ',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: 'This is an informational callout block.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Callout',
    calloutType: 'warning',
    content: [
      {
        text: 'Warning: ',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: 'Proceed with caution.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Callout',
    calloutType: 'error',
    content: [
      {
        text: 'Error: ',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: 'An error has occurred.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Callout',
    calloutType: 'success',
    content: [
      {
        text: 'Success: ',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: 'Operation completed successfully.',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Complete Examples

### Comprehensive Nested Structure Example

A complete example demonstrating all nested block features:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="800"
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
        text: 'Comprehensive Nesting Guide',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'CollapsibleHeading2',
    isExpanded: true,
    content: [
      {
        text: 'Collapsible Sections',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block3',
        type: 'Paragraph',
        parentId: 'block2',
        content: [
          {
            text: 'Collapsible headings help organize content into expandable sections.',
            type: 'Text'
          }
        ]
      },
      {
        id: 'block4',
        type: 'CollapsibleHeading3',
        parentId: 'block2',
        isExpanded: true,
        content: [
          {
            text: 'Nested Collapsible Section',
            type: 'Text'
          }
        ],
        children: [
          {
            id: 'block5',
            type: 'Paragraph',
            parentId: 'block4',
            content: [
              {
                text: 'You can nest collapsible sections within each other.',
                type: 'Text'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'block6',
    type: 'CollapsibleHeading2',
    isExpanded: true,
    content: [
      {
        text: 'Nested Lists',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block7',
        type: 'BulletList',
        parentId: 'block6',
        content: [
          {
            text: 'Parent bullet point',
            type: 'Text'
          }
        ],
        children: [
          {
            id: 'block8',
            type: 'BulletList',
            parentId: 'block7',
            content: [
              {
                text: 'Nested bullet point',
                type: 'Text'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'block9',
    type: 'Heading2',
    content: [
      {
        text: 'Callouts and Quotes',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block10',
    type: 'Callout',
    calloutType: 'info',
    content: [
      {
        text: 'Note: ',
        type: 'Text',
        format: { fontWeight: 'bold' }
      },
      {
        text: 'Callouts draw attention to important information.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block11',
    type: 'Quote',
    content: [
      {
        text: 'Quality is not an act, it is a habit.',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block12',
    type: 'CollapsibleParagraph',
    isExpanded: false,
    content: [
      {
        text: 'Additional Details (Click to Expand)',
        type: 'Text'
      }
    ],
    children: [
      {
        id: 'block13',
        type: 'Paragraph',
        parentId: 'block12',
        content: [
          {
            text: 'This content is hidden until the user expands it.',
            type: 'Text'
          }
        ]
      }
    ]
  }
]);
</script>
```

This comprehensive guide covers all nested block features including collapsible headings, parent-child relationships, quotes, and callouts in the Vue BlockEditor using the Composition API.
