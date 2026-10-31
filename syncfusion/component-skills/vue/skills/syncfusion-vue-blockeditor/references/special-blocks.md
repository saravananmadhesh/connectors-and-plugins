# Special Blocks in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Code Blocks](#code-blocks)
  - [Basic Code Block](#basic-code-block)
  - [Syntax Highlighting](#syntax-highlighting)
  - [CodeBlockSettings Configuration](#codeblocksettings-configuration)
  - [Supported Languages](#supported-languages)
- [Image Blocks](#image-blocks)
  - [Basic Image Block](#basic-image-block)
  - [ImageBlockSettings Configuration](#imageblocksettings-configuration)
  - [Upload Configuration](#upload-configuration)
  - [Image Resizing](#image-resizing)
  - [Size Limits](#size-limits)
- [Table Blocks](#table-blocks)
  - [Basic Table](#basic-table)
  - [Table Properties](#table-properties)
  - [Table with Header](#table-with-header)
  - [Table with Row Numbers](#table-with-row-numbers)
  - [Table Resizing](#table-resizing)
  - [Table Cell Selection](#table-cell-selection)
- [Complete Examples](#complete-examples)

## Overview

Special blocks in the BlockEditor provide advanced content types including Code blocks with syntax highlighting, Image blocks with upload capabilities, and Table blocks with rich formatting options. These blocks enable rich, structured content creation.

## Code Blocks

### Basic Code Block

Create a code block for displaying source code:

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
    type: 'Code',
    language: 'javascript',
    content: [
      {
        text: 'function hello() {\n  console.log("Hello, World!");\n}',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Syntax Highlighting

Code blocks support syntax highlighting for various programming languages:

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
    type: 'Code',
    language: 'javascript',
    content: [
      {
        text: 'const greeting = "Hello";\nconsole.log(greeting);',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Code',
    language: 'python',
    content: [
      {
        text: 'def greet():\n    print("Hello, World!")',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Code',
    language: 'csharp',
    content: [
      {
        text: 'public void Greet() {\n    Console.WriteLine("Hello, World!");\n}',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### CodeBlockSettings Configuration

Configure code block behavior and available languages:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :codeBlockSettings="codeBlockSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const codeBlockSettings = ref({
  languages: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'Python', value: 'python' },
    { name: 'Java', value: 'java' },
    { name: 'C#', value: 'csharp' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' }
  ],
  defaultLanguage: 'javascript'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Code',
    language: 'javascript',
    content: [
      {
        text: '// JavaScript code\nconst app = { name: "BlockEditor" };',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Supported Languages

Example showing multiple language support:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :codeBlockSettings="codeBlockSettings"
      :height="700"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const codeBlockSettings = ref({
  languages: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'Python', value: 'python' },
    { name: 'Java', value: 'java' },
    { name: 'C#', value: 'csharp' },
    { name: 'C++', value: 'cpp' },
    { name: 'Ruby', value: 'ruby' },
    { name: 'PHP', value: 'php' },
    { name: 'Go', value: 'go' },
    { name: 'Rust', value: 'rust' },
    { name: 'Swift', value: 'swift' },
    { name: 'Kotlin', value: 'kotlin' },
    { name: 'SQL', value: 'sql' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'JSON', value: 'json' },
    { name: 'XML', value: 'xml' },
    { name: 'Markdown', value: 'markdown' }
  ],
  defaultLanguage: 'javascript'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading2',
    content: [
      {
        text: 'Code Examples',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Code',
    language: 'typescript',
    content: [
      {
        text: 'interface User {\n  name: string;\n  age: number;\n}',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Code',
    language: 'html',
    content: [
      {
        text: '<div class="container">\n  <h1>Title</h1>\n</div>',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Image Blocks

### Basic Image Block

Create an image block:

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
    type: 'Image',
    imageUrl: 'https://example.com/image.jpg',
    altText: 'Sample image',
    width: '100%'
  }
]);
</script>
```

### ImageBlockSettings Configuration

Configure image upload and handling:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  path: '/images/',
  maxFileSize: 5000000, // 5MB in bytes
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  saveFormat: 'Blob', // or 'Base64'
  enableResize: true,
  minWidth: '100px',
  minHeight: '100px',
  maxWidth: '2000px',
  maxHeight: '2000px',
  width: 'auto',
  height: 'auto'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Click to insert an image...',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Upload Configuration

Configure image upload with event handlers:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :beforeFileUpload="onBeforeFileUpload"
      :fileUploading="onFileUploading"
      :fileUploadSuccess="onFileUploadSuccess"
      :fileUploadFailed="onFileUploadFailed"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  path: '/images/',
  maxFileSize: 5000000,
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif']
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Insert images with upload support',
        type: 'Text'
      }
    ]
  }
]);

const onBeforeFileUpload = (args) => {
  console.log('Before upload:', args);
  // Validate file before upload
  if (args.fileData.size > 5000000) {
    args.cancel = true;
    alert('File size exceeds 5MB limit');
  }
};

const onFileUploading = (args) => {
  console.log('Uploading:', args);
};

const onFileUploadSuccess = (args) => {
  console.log('Upload success:', args);
};

const onFileUploadFailed = (args) => {
  console.error('Upload failed:', args);
};
</script>
```

### Image Resizing

Configure image resizing options:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :height="600"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  resize: true,
  resizeByPercent: false,
  minWidth: 50,
  minHeight: 50,
  maxWidth: 800,
  maxHeight: 600
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Image',
    imageUrl: 'https://via.placeholder.com/600x400',
    altText: 'Resizable image',
    width: 400,
    height: 300
  }
]);
</script>
```

### Size Limits

Configure file size and dimension constraints:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  maxFileSize: 3000000, // 3MB
  allowedTypes: ['.jpg', '.png'],
  minWidth: 200,
  minHeight: 200,
  maxWidth: 1920,
  maxHeight: 1080
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Images must be JPG or PNG, max 3MB, dimensions 200x200 to 1920x1080',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Table Blocks

### Basic Table

Create a simple table block:

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
    type: 'Table',
    rows: 3,
    columns: 3,
    cells: [
      [
        { content: [{ text: 'Cell 1,1', type: 'Text' }] },
        { content: [{ text: 'Cell 1,2', type: 'Text' }] },
        { content: [{ text: 'Cell 1,3', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Cell 2,1', type: 'Text' }] },
        { content: [{ text: 'Cell 2,2', type: 'Text' }] },
        { content: [{ text: 'Cell 2,3', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Cell 3,1', type: 'Text' }] },
        { content: [{ text: 'Cell 3,2', type: 'Text' }] },
        { content: [{ text: 'Cell 3,3', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

### Table Properties

Configure table properties including width and alignment:

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
    type: 'Table',
    rows: 2,
    columns: 2,
    width: '100%',
    cells: [
      [
        { content: [{ text: 'Name', type: 'Text' }], width: '50%' },
        { content: [{ text: 'Value', type: 'Text' }], width: '50%' }
      ],
      [
        { content: [{ text: 'Item 1', type: 'Text' }] },
        { content: [{ text: '100', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

### Table with Header

Create a table with header row:

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
    type: 'Table',
    rows: 4,
    columns: 3,
    enableHeader: true,
    cells: [
      [
        { content: [{ text: 'Name', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Email', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Role', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true }
      ],
      [
        { content: [{ text: 'Alice', type: 'Text' }] },
        { content: [{ text: 'alice@example.com', type: 'Text' }] },
        { content: [{ text: 'Developer', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Bob', type: 'Text' }] },
        { content: [{ text: 'bob@example.com', type: 'Text' }] },
        { content: [{ text: 'Designer', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Charlie', type: 'Text' }] },
        { content: [{ text: 'charlie@example.com', type: 'Text' }] },
        { content: [{ text: 'Manager', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

### Table with Row Numbers

Enable row numbers for tables:

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
    type: 'Table',
    rows: 3,
    columns: 2,
    enableRowNumbers: true,
    cells: [
      [
        { content: [{ text: 'Item', type: 'Text' }] },
        { content: [{ text: 'Quantity', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Apples', type: 'Text' }] },
        { content: [{ text: '10', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Oranges', type: 'Text' }] },
        { content: [{ text: '15', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

### Table Resizing

Configure resizable columns and rows:

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
    type: 'Table',
    rows: 2,
    columns: 3,
    allowResize: true,
    cells: [
      [
        { content: [{ text: 'Column 1', type: 'Text' }], width: '33%' },
        { content: [{ text: 'Column 2', type: 'Text' }], width: '34%' },
        { content: [{ text: 'Column 3', type: 'Text' }], width: '33%' }
      ],
      [
        { content: [{ text: 'Data 1', type: 'Text' }] },
        { content: [{ text: 'Data 2', type: 'Text' }] },
        { content: [{ text: 'Data 3', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

### Table Cell Selection

Example demonstrating table cell selection and formatting:

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
    type: 'Table',
    rows: 3,
    columns: 3,
    enableHeader: true,
    cells: [
      [
        { content: [{ text: 'Product', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Price', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Stock', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true }
      ],
      [
        { content: [{ text: 'Laptop', type: 'Text' }] },
        { content: [{ text: '$999', type: 'Text', format: { color: '#00aa00' } }] },
        { content: [{ text: '50', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Mouse', type: 'Text' }] },
        { content: [{ text: '$29', type: 'Text', format: { color: '#00aa00' } }] },
        { content: [{ text: '200', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

## Complete Examples

### Comprehensive Special Blocks Example

A complete example demonstrating all special block types:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :codeBlockSettings="codeBlockSettings"
      :imageBlockSettings="imageBlockSettings"
      :height="900"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const codeBlockSettings = ref({
  languages: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Python', value: 'python' },
    { name: 'HTML', value: 'html' }
  ],
  defaultLanguage: 'javascript'
});

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  path: '/images/',
  maxFileSize: 5000000,
  allowedTypes: ['.jpg', '.png', '.gif'],
  resize: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [
      {
        text: 'Special Blocks Demo',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Heading2',
    content: [
      {
        text: 'Code Block Example',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Code',
    language: 'javascript',
    content: [
      {
        text: 'function calculateSum(a, b) {\n  return a + b;\n}\n\nconst result = calculateSum(5, 10);\nconsole.log(result);',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Heading2',
    content: [
      {
        text: 'Image Block Example',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Image',
    imageUrl: 'https://via.placeholder.com/600x300',
    altText: 'Sample image',
    width: '100%'
  },
  {
    id: 'block6',
    type: 'Heading2',
    content: [
      {
        text: 'Table Block Example',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block7',
    type: 'Table',
    rows: 4,
    columns: 3,
    enableHeader: true,
    cells: [
      [
        { content: [{ text: 'Feature', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Status', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true },
        { content: [{ text: 'Priority', type: 'Text', format: { fontWeight: 'bold' } }], isHeader: true }
      ],
      [
        { content: [{ text: 'User Authentication', type: 'Text' }] },
        { content: [{ text: 'Complete', type: 'Text', format: { color: '#00aa00' } }] },
        { content: [{ text: 'High', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Dashboard', type: 'Text' }] },
        { content: [{ text: 'In Progress', type: 'Text', format: { color: '#ff8800' } }] },
        { content: [{ text: 'High', type: 'Text' }] }
      ],
      [
        { content: [{ text: 'Reporting', type: 'Text' }] },
        { content: [{ text: 'Pending', type: 'Text', format: { color: '#ff0000' } }] },
        { content: [{ text: 'Medium', type: 'Text' }] }
      ]
    ]
  }
]);
</script>
```

This comprehensive guide covers all special block types (Code, Image, and Table) in the Vue BlockEditor using the Composition API.
