# Drag-Drop and Content Manipulation

## Enable Drag and Drop

Control drag-and-drop operations using the `enableDragAndDrop` property:

```razor
<ejs-blockeditor id="block-editor" 
                 blocks="@ViewBag.BlocksData" 
                 enableDragAndDrop="true">
</ejs-blockeditor>
```

By default, `enableDragAndDrop` is set to `true`. To disable drag-and-drop:

```razor
<ejs-blockeditor id="block-editor" 
                 blocks="@ViewBag.BlocksData" 
                 enableDragAndDrop="false">
</ejs-blockeditor>
```

## Dragging Blocks

The Block Editor supports both single and multiple block dragging.

### Single Block Dragging

Users can hover over a block to reveal the drag handle, then click and drag to move it:

1. Hover over a block to show the drag handle
2. Click and hold the drag handle
3. Drag the block to the desired position
4. Release to drop the block

### Multiple Block Dragging

Select multiple blocks and drag them together:

1. Select multiple blocks (Ctrl+Click or Cmd+Click)
2. Hover over any selected block to reveal drag handle
3. Click and hold the drag handle
4. Drag all selected blocks together
5. Release to drop at the new position

### Visual Feedback

During drag operations, the editor provides:
- **Drag preview** - Visual indicator of the block being dragged
- **Drop indicator** - Line showing where the block will be placed
- **Hover states** - Visual feedback on potential drop zones
- **Block outline** - Highlighting to show selected blocks

## Reordering Blocks

### Basic Block Reordering

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" 
                     blocks="@ViewBag.BlocksData" 
                     enableDragAndDrop="true">
    </ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
</style>
```

### Track Drag Events

```razor
<ejs-blockeditor id="block-editor" 
                 blocks="@ViewBag.BlocksData"
                 blockDragStart="onDragStart"
                 blockDragging="onDragging"
                 blockDropped="onDropped">
</ejs-blockeditor>

<script>
    function onDragStart(args) {
        console.log('Drag started', args.block.id);
        // Perform actions when drag starts
    }
    
    function onDragging(args) {
        console.log('Dragging block', args.block.id);
        // Perform actions during drag
    }
    
    function onDropped(args) {
        console.log('Block dropped at position', args.index);
        // Perform actions when block is dropped
    }
</script>
```

### Programmatic Block Movement

Use the `moveBlock` method to move blocks programmatically:

```javascript
var blockEditorObj = ej.base.getInstance(
    document.getElementById('block-editor'), 
    ejs.blockeditor.BlockEditor
);

// Move a block to a new position
blockEditorObj.moveBlock('source-block-id', 'target-block-id');
```

## Content Insertion

### Insert Block at Specific Position

```javascript
const newBlock = {
    id: 'new-block-id',
    blockType: 'Paragraph',
    content: [
        {
            contentType: "Text",
            content: 'New content inserted'
        }
    ]
};

// Insert after existing block (third parameter: true = after, false = before)
blockEditorObj.addBlock(newBlock, 'existing-block-id', true);

// Insert before existing block
blockEditorObj.addBlock(newBlock, 'existing-block-id', false);
```

### Insert Multiple Blocks

```javascript
const blocksToAdd = [
    {
        id: 'heading',
        blockType: 'Heading',
        properties = { level: 2 },
        content: [{ contentType: "Text", content: 'Section Title' }]
    },
    {
        id: 'paragraph',
        blockType: 'Paragraph',
        content: [{ contentType: "Text", content: 'Section content' }]
    }
];

// Add first block
blockEditorObj.addBlock(blocksToAdd[0], null, true);

// Add second block after the first
blockEditorObj.addBlock(blocksToAdd[1], blocksToAdd[0].id, true);
```

### Insert Block at End

```javascript
// Get the last block ID or use null/undefined
blockEditorObj.addBlock(newBlock);
```

## Block Positioning

### Move Block Up/Down

```javascript
// Move block up in the document
blockEditorObj.moveBlock('block-to-move', 'block-above-target', false);

// Move block down in the document
blockEditorObj.moveBlock('block-to-move', 'block-below-target', true);
```

### Get Block Position

```javascript
var blockEditorObj = ej.base.getInstance(
    document.getElementById('block-editor'), 
    ejs.blockeditor.BlockEditor
);

// Get a specific block
var block = blockEditorObj.getBlock('block-id');

// Get total block count
var totalBlocks = blockEditorObj.getBlockCount();

// Iterate through blocks to find position
for (let i = 0; i < totalBlocks; i++) {
    var currentBlock = blockEditorObj.getBlock(/* ... */);
    if (currentBlock.id === 'target-block-id') {
        console.log('Block found at position:', i);
        break;
    }
}
```

## Content Insertion Events

### Before Content Insertion

```razor
<ejs-blockeditor id="block-editor" blockDragStart="beforeInsert">
</ejs-blockeditor>

<script>
    function beforeInsert(args) {
        // Validate or modify content before insertion
        console.log('Block about to be inserted:', args.block);
        
        // Cancel insertion if needed
        if (args.block.blockType === 'Image' && !isValidImageUrl(args.block.properties.src)) {
            args.cancel = true;
        }
    }
    
    function isValidImageUrl(url) {
        // Validation logic
        return url && url.startsWith('http');
    }
</script>
```

### After Content Insertion

```razor
<ejs-blockeditor id="block-editor" blockChanged="afterInsert">
</ejs-blockeditor>

<script>
    function afterInsert(args) {
        console.log('Block inserted:', args.block.id);
        // Update UI or trigger post-insertion actions
    }
</script>
```

## Block Nesting

### Create Nested Structure

Nested blocks are created using the `children` property in the block's properties:

```csharp
new BlockModel
{
    id = "collapsible-section",
    blockType = "CollapsibleHeading",
    content = new List<object>
    {
        new { contentType = "Text", content = "Click to expand" }
    },
    properties = new
    {
        level = 1,
        isExpanded = true,
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Nested content" }
                }
            },
            new BlockModel
            {
                blockType = "BulletList",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Nested list item" }
                }
            }
        }
    }
}
```

### Indentation for Nesting

Use the `indent` property to create visual nesting without structural nesting:

```csharp
new BlockModel
{
    blockType = "Paragraph",
    indent = 0,
    content = new List<object> { new { contentType = "Text", content = "Level 0" } }
}

new BlockModel
{
    blockType = "Paragraph",
    indent = 1,
    content = new List<object> { new { contentType = "Text", content = "Level 1" } }
}

new BlockModel
{
    blockType = "Paragraph",
    indent = 2,
    content = new List<object> { new { contentType = "Text", content = "Level 2" } }
}
```

## Complete Drag-Drop Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" 
                     blocks="@ViewBag.BlocksData"
                     enableDragAndDrop="true"
                     blockDragStart="onDragStart"
                     blockDragging="onDragging"
                     blockDropped="onDropped">
    </ejs-blockeditor>
    
    <div id="controls">
        <h3>Drag-Drop Demo</h3>
        <button onclick="addBlockBtn()">Add New Block</button>
        <button onclick="moveBlockBtn()">Move Block</button>
        <div id="output"></div>
    </div>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
    
    #controls {
        margin-top: 20px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 5px;
    }
    
    #output {
        margin-top: 15px;
        padding: 10px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        min-height: 50px;
        font-family: monospace;
        white-space: pre-wrap;
    }
</style>

<script>
    var blockEditorObj;
    
    function onDragStart(args) {
        console.log('Drag started for block:', args.block.id);
        displayOutput(`Dragging block: ${args.block.id}`);
    }
    
    function onDragging(args) {
        // Called during drag operation
    }
    
    function onDropped(args) {
        console.log('Block dropped at position:', args.index);
        displayOutput(`Block dropped at index: ${args.index}`);
    }
    
    function addBlockBtn() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'), 
            ejs.blockeditor.BlockEditor
        );
        
        const newBlock = {
            id: 'new-' + Date.now(),
            blockType: 'Paragraph',
            content: [
                {
                    contentType: "Text",
                    content: 'New block added at ' + new Date().toLocaleTimeString()
                }
            ]
        };
        
        blockEditorObj.addBlock(newBlock);
        displayOutput(`New block added: ${newBlock.id}`);
    }
    
    function moveBlockBtn() {
        if (blockEditorObj.getBlockCount() >= 2) {
            // Move second block to first position
            var blocks = [];
            for (let i = 0; i < blockEditorObj.getBlockCount(); i++) {
                blocks.push(blockEditorObj.getBlock(i));
            }
            
            if (blocks.length > 1) {
                blockEditorObj.moveBlock(blocks[1].id, blocks[0].id, false);
                displayOutput('Blocks reordered');
            }
        }
    }
    
    function displayOutput(message) {
        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            outputDiv.textContent = message;
        }
    }
</script>
```

**Controller:**

```csharp
public IActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "h1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Drag and Drop Demo" }
            }
        },
        new BlockModel
        {
            id = "p1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Drag blocks to reorder content" }
            }
        },
        new BlockModel
        {
            id = "p2",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Try dragging this block up or down" }
            }
        }
    };
    
    ViewBag.BlocksData = blocks;
    return View();
}
```

## Drag-Drop Best Practices

1. **Enable visual feedback** - Show drag preview and drop indicator
2. **Validate drops** - Prevent invalid block movements
3. **Handle restrictions** - Some blocks may not be movable (e.g., templates)
4. **Update UI** - Reflect changes in real-time
5. **Track changes** - Log reordering operations for undo/redo
6. **Test on touch devices** - Ensure drag-drop works on mobile
7. **Provide keyboard alternatives** - Allow block movement via keyboard shortcuts

Drag-and-drop functionality combined with programmatic APIs provides a complete solution for flexible content manipulation and reorganization in the Block Editor.
