# Methods API in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Block Management Methods](#block-management-methods)
  - [addBlock](#addblock)
  - [removeBlock](#removeblock)
  - [updateBlock](#updateblock)
  - [moveBlock](#moveblock)
  - [getBlock](#getblock)
  - [getBlockCount](#getblockcount)
- [Selection Methods](#selection-methods)
  - [setSelection](#setselection)
  - [getSelectedBlocks](#getselectedblocks)
  - [selectBlock](#selectblock)
  - [selectAllBlocks](#selectallblocks)
  - [selectRange](#selectrange)
  - [getRange](#getrange)
  - [setCursorPosition](#setcursorposition)
- [Focus Methods](#focus-methods)
  - [focusIn](#focusin)
  - [focusOut](#focusout)
- [Data Export Methods](#data-export-methods)
  - [getDataAsJson](#getdataasjson)
  - [getDataAsHtml](#getdataashtml)
  - [print](#print)
  - [parseHtmlToBlocks](#parsehtmltoblocks)
  - [renderBlocksFromJson](#renderblocksfromjson)
- [Formatting Methods](#formatting-methods)
  - [executeToolbarAction](#executetoolbaraction)
  - [enableToolbarItems](#enabletoolbaritems)
  - [disableToolbarItems](#disabletoolbaritems)
- [Complete Examples](#complete-examples)

## Overview

The BlockEditor provides a comprehensive API with methods for block management, selection control, focus handling, data export, and formatting. All methods are accessed through the component reference using `blockEditor.value.ej2Instances.methodName()` pattern.

## Block Management Methods

### addBlock

Add a new block to the editor at a specific position:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleAddBlock">Add Block</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Existing block',
        contentType: 'Text'
      }
    ]
  }
]);

const handleAddBlock = () => {
  const newBlock = {
    id: 'newBlock' + Date.now(),
    blockType: 'Paragraph',
    content: [
      {
        content: 'New block added programmatically',
        contentType: 'Text'
      }
    ]
  };
  
  blockEditor.value.ej2Instances.addBlock(newBlock, 1); // Add at index 1
};
</script>
```

### removeBlock

Remove a block from the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleRemoveBlock">Remove First Block</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'First block',
        contentType: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Second block',
        contentType: 'Text'
      }
    ]
  }
]);

const handleRemoveBlock = () => {
  blockEditor.value.ej2Instances.removeBlock('block1');
};
</script>
```

### updateBlock

Update an existing block's content or properties:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleUpdateBlock">Update Block</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Original content',
        contentType: 'Text'
      }
    ]
  }
]);

const handleUpdateBlock = () => {
  const updatedBlock = {
    id: 'block1',
    blockType: 'Heading2',
    content: [
      {
        content: 'Updated to heading with new content',
        contentType: 'Text'
      }
    ]
  };
  
  blockEditor.value.ej2Instances.updateBlock('block1', updatedBlock);
};
</script>
```

### moveBlock

Move a block to a different position:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleMoveBlock">Move Block Up</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'First block', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Second block (will move up)', contentType: 'Text' }]
  },
  {
    id: 'block3',
    blockType: 'Paragraph',
    content: [{ content: 'Third block', contentType: 'Text' }]
  }
]);

const handleMoveBlock = () => {
  blockEditor.value.ej2Instances.moveBlock('block2', 0); // Move to first position
};
</script>
```

### getBlock

Retrieve a specific block by ID:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleGetBlock">Get Block Info</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Sample block',
        contentType: 'Text'
      }
    ]
  }
]);

const handleGetBlock = () => {
  const block = blockEditor.value.ej2Instances.getBlock('block1');
  console.log('Block data:', block);
  alert(`Block type: ${block.blockType}, Content: ${block.content[0].content}`);
};
</script>
```

### getBlockCount

Get the total number of blocks:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleGetBlockCount">Get Block Count</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'Block 1', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Block 2', contentType: 'Text' }]
  },
  {
    id: 'block3',
    blockType: 'Paragraph',
    content: [{ content: 'Block 3', contentType: 'Text' }]
  }
]);

const handleGetBlockCount = () => {
  const count = blockEditor.value.ej2Instances.getBlockCount();
  alert(`Total blocks: ${count}`);
};
</script>
```

## Selection Methods

### setSelection

Set the selection range in the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleSetSelection">Select Text</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Select part of this text programmatically',
        contentType: 'Text'
      }
    ]
  }
]);

const handleSetSelection = () => {
  blockEditor.value.ej2Instances.setSelection({
    blockId: 'block1',
    start: 0,
    end: 11 // Selects "Select part"
  });
};
</script>
```

### getSelectedBlocks

Get all currently selected blocks:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleGetSelectedBlocks">Get Selected Blocks</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'First block', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Second block', contentType: 'Text' }]
  }
]);

const handleGetSelectedBlocks = () => {
  const selectedBlocks = blockEditor.value.ej2Instances.getSelectedBlocks();
  console.log('Selected blocks:', selectedBlocks);
  alert(`Selected ${selectedBlocks.length} block(s)`);
};
</script>
```

### selectBlock

Select a specific block:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleSelectBlock">Select Second Block</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'First block', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Second block', contentType: 'Text' }]
  }
]);

const handleSelectBlock = () => {
  blockEditor.value.ej2Instances.selectBlock('block2');
};
</script>
```

### selectAllBlocks

Select all blocks in the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleSelectAll">Select All Blocks</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'First block', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Second block', contentType: 'Text' }]
  },
  {
    id: 'block3',
    blockType: 'Paragraph',
    content: [{ content: 'Third block', contentType: 'Text' }]
  }
]);

const handleSelectAll = () => {
  blockEditor.value.ej2Instances.selectAllBlocks();
};
</script>
```

### selectRange

Select a range of blocks:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleSelectRange">Select Range</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'Block 1', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Block 2', contentType: 'Text' }]
  },
  {
    id: 'block3',
    blockType: 'Paragraph',
    content: [{ content: 'Block 3', contentType: 'Text' }]
  },
  {
    id: 'block4',
    blockType: 'Paragraph',
    content: [{ content: 'Block 4', contentType: 'Text' }]
  }
]);

const handleSelectRange = () => {
  // Create a DOM Range object
  const range = document.createRange();
  // Set range start and end
  // This is a simplified example - in practice you'd get actual DOM nodes
  const startNode = document.querySelector('[data-block-id="block2"]');
  const endNode = document.querySelector('[data-block-id="block3"]');
  if (startNode && endNode) {
    range.setStart(startNode, 0);
    range.setEnd(endNode, 1);
    blockEditor.value.ej2Instances.selectRange(range);
  }
};
</script>
```

### getRange

Get the current selection range:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleGetRange">Get Range</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Select some text to see the range',
        contentType: 'Text'
      }
    ]
  }
]);

const handleGetRange = () => {
  const range = blockEditor.value.ej2Instances.getRange();
  console.log('Current range:', range);
};
</script>
```

### setCursorPosition

Set the cursor position in the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleSetCursor">Set Cursor Position</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Position cursor in this text',
        contentType: 'Text'
      }
    ]
  }
]);

const handleSetCursor = () => {
  blockEditor.value.ej2Instances.setCursorPosition({
    blockId: 'block1',
    offset: 13 // Position after "Position cursor"
  });
};
</script>
```

## Focus Methods

### focusIn

Set focus to the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleFocusIn">Focus Editor</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Click the button to focus this editor',
        contentType: 'Text'
      }
    ]
  }
]);

const handleFocusIn = () => {
  blockEditor.value.ej2Instances.focusIn();
};
</script>
```

### focusOut

Remove focus from the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleFocusOut">Blur Editor</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Focus will be removed when button is clicked',
        contentType: 'Text'
      }
    ]
  }
]);

const handleFocusOut = () => {
  blockEditor.value.ej2Instances.focusOut();
};
</script>
```

## Data Export Methods

### getDataAsJson

Export editor content as JSON:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleExportJson">Export as JSON</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Heading1',
    content: [{ content: 'Document Title', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Document content', contentType: 'Text' }]
  }
]);

const handleExportJson = () => {
  const json = blockEditor.value.ej2Instances.getDataAsJson();
  console.log('JSON export:', json);
  alert('Check console for JSON output');
};
</script>
```

### getDataAsHtml

Export editor content as HTML:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleExportHtml">Export as HTML</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Heading1',
    content: [{ content: 'Document Title', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Document content', contentType: 'Text' }]
  }
]);

const handleExportHtml = () => {
  const html = blockEditor.value.ej2Instances.getDataAsHtml();
  console.log('HTML export:', html);
};
</script>
```

### print

Print the editor content:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handlePrint">Print Document</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Heading1',
    content: [{ content: 'Printable Document', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'This document will be printed.', contentType: 'Text' }]
  }
]);

const handlePrint = () => {
  blockEditor.value.ej2Instances.print();
};
</script>
```

### parseHtmlToBlocks

Parse HTML string into block format:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleParseHtml">Parse HTML</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'Initial content', contentType: 'Text' }]
  }
]);

const handleParseHtml = () => {
  const htmlString = '<h1>New Title</h1><p>New paragraph content</p>';
  const blocks = blockEditor.value.ej2Instances.parseHtmlToBlocks(htmlString);
  console.log('Parsed blocks:', blocks);
};
</script>
```

### renderBlocksFromJson

Render blocks from JSON data:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleRenderFromJson">Load from JSON</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [{ content: 'Original content', contentType: 'Text' }]
  }
]);

const handleRenderFromJson = () => {
  const jsonData = [
    {
      id: 'newBlock1',
      blockType: 'Heading1',
      content: [{ content: 'Loaded from JSON', contentType: 'Text' }]
    },
    {
      id: 'newBlock2',
      blockType: 'Paragraph',
      content: [{ content: 'This content was loaded dynamically', contentType: 'Text' }]
    }
  ];
  
  blockEditor.value.ej2Instances.renderBlocksFromJson(jsonData);
};
</script>
```

## Formatting Methods

### executeToolbarAction

Execute a toolbar formatting action:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleBold">Make Bold</button>
    <button @click="handleItalic">Make Italic</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Select text and apply formatting',
        contentType: 'Text'
      }
    ]
  }
]);

const handleBold = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Bold');
};

const handleItalic = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Italic');
};
</script>
```

### enableToolbarItems

Enable specific toolbar items:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleEnableItems">Enable Formatting</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Test content',
        contentType: 'Text'
      }
    ]
  }
]);

const handleEnableItems = () => {
  blockEditor.value.ej2Instances.enableToolbarItems(['Bold', 'Italic', 'Underline']);
};
</script>
```

### disableToolbarItems

Disable specific toolbar items:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="500"
    />
    <button @click="handleDisableItems">Disable Formatting</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    blockType: 'Paragraph',
    content: [
      {
        content: 'Test content',
        contentType: 'Text'
      }
    ]
  }
]);

const handleDisableItems = () => {
  blockEditor.value.ej2Instances.disableToolbarItems(['Bold', 'Italic', 'Underline']);
};
</script>
```

## Complete Examples

### Comprehensive Methods Example

A complete example demonstrating all method categories:

```vue
<template>
  <div>
    <div class="button-group">
      <h3>Block Management</h3>
      <button @click="addNewBlock">Add Block</button>
      <button @click="removeLastBlock">Remove Block</button>
      <button @click="updateFirstBlock">Update Block</button>
      <button @click="getBlockInfo">Get Block Info</button>
    </div>
    
    <div class="button-group">
      <h3>Selection</h3>
      <button @click="selectFirstBlock">Select First</button>
      <button @click="selectAll">Select All</button>
      <button @click="getSelection">Get Selection</button>
    </div>
    
    <div class="button-group">
      <h3>Focus</h3>
      <button @click="focusEditor">Focus</button>
      <button @click="blurEditor">Blur</button>
    </div>
    
    <div class="button-group">
      <h3>Export</h3>
      <button @click="exportJson">Export JSON</button>
      <button @click="exportHtml">Export HTML</button>
      <button @click="printContent">Print</button>
    </div>
    
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
    blockType: 'Heading1',
    content: [{ content: 'Methods API Demo', contentType: 'Text' }]
  },
  {
    id: 'block2',
    blockType: 'Paragraph',
    content: [{ content: 'Use the buttons above to test various methods.', contentType: 'Text' }]
  }
]);

// Block Management
const addNewBlock = () => {
  const newBlock = {
    id: 'block' + Date.now(),
    blockType: 'Paragraph',
    content: [{ content: 'Newly added block', contentType: 'Text' }]
  };
  blockEditor.value.ej2Instances.addBlock(newBlock);
};

const removeLastBlock = () => {
  const count = blockEditor.value.ej2Instances.getBlockCount();
  if (count > 0) {
    const blocks = blockEditor.value.ej2Instances.getDataAsJson();
    blockEditor.value.ej2Instances.removeBlock(blocks[blocks.length - 1].id);
  }
};

const updateFirstBlock = () => {
  blockEditor.value.ej2Instances.updateBlock('block1', {
    id: 'block1',
    blockType: 'Heading2',
    content: [{ content: 'Updated Title', contentType: 'Text' }]
  });
};

const getBlockInfo = () => {
  const count = blockEditor.value.ej2Instances.getBlockCount();
  alert(`Total blocks: ${count}`);
};

// Selection
const selectFirstBlock = () => {
  blockEditor.value.ej2Instances.selectBlock('block1');
};

const selectAll = () => {
  blockEditor.value.ej2Instances.selectAllBlocks();
};

const getSelection = () => {
  const selected = blockEditor.value.ej2Instances.getSelectedBlocks();
  alert(`Selected ${selected.length} block(s)`);
};

// Focus
const focusEditor = () => {
  blockEditor.value.ej2Instances.focusIn();
};

const blurEditor = () => {
  blockEditor.value.ej2Instances.focusOut();
};

// Export
const exportJson = () => {
  const json = blockEditor.value.ej2Instances.getDataAsJson();
  console.log('JSON:', json);
  alert('Check console for JSON output');
};

const exportHtml = () => {
  const html = blockEditor.value.ej2Instances.getDataAsHtml();
  console.log('HTML:', html);
  alert('Check console for HTML output');
};

const printContent = () => {
  blockEditor.value.ej2Instances.print();
};
</script>

<style scoped>
.button-group {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
}

.button-group h3 {
  margin-top: 0;
}

button {
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 8px 15px;
}
</style>
```

This comprehensive guide covers all 20+ methods in the Vue BlockEditor API using the Composition API and ref access pattern.
