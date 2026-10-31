# Methods and API

## Table of Contents

- [Block Management Methods](#block-management-methods)
- [Selection and Cursor Methods](#selection-and-cursor-methods)
- [Focus Management](#focus-management)
- [Formatting Methods](#formatting-methods)
- [Data Export Methods](#data-export-methods)
- [Complete API Example](#complete-api-example)

## Block Management Methods

### addBlock

Add a new block to the editor at a specified position.

```javascript
const newBlock = {
    id: 'new-block',
    blockType: 'Paragraph',
    content: [
        {
            contentType: "Text",
            content: 'This is a newly added block'
        }
    ]
};

// Add after a specific block (true = after, false = before)
blockEditorObj.addBlock(newBlock, 'target-block-id', true);

// Add before a specific block
blockEditorObj.addBlock(newBlock, 'target-block-id', false);

// Add at the end
blockEditorObj.addBlock(newBlock);
```

### removeBlock

Remove a block from the editor by its ID.

```javascript
// Remove a block by its ID
blockEditorObj.removeBlock('block-to-remove-id');
```

### moveBlock

Move a block from one position to another within the editor.

```javascript
// Move a block to a new position
blockEditorObj.moveBlock('source-block-id', 'target-block-id');

// Move block before target
blockEditorObj.moveBlock('block-id', 'target-id', false);

// Move block after target
blockEditorObj.moveBlock('block-id', 'target-id', true);
```

### updateBlock

Update the properties of an existing block. Only specified properties are modified.

```javascript
// Update block properties
const success = blockEditorObj.updateBlock('block-id', {
    isChecked: true,
    indent: 1,
    content: [
        {
            contentType: "Text",
            content: 'Updated content'
        }
    ]
});

if (success) {
    console.log('Block updated successfully');
} else {
    console.log('Failed to update block');
}
```

### getBlock

Retrieve a block model by its unique ID. Returns `null` if not found.

```javascript
// Get a specific block
const block = blockEditorObj.getBlock('block-id');

if (block) {
    console.log('Block found:');
    console.log('ID:', block.id);
    console.log('Type:', block.blockType);
    console.log('Content:', block.content);
} else {
    console.log('Block not found');
}
```

### getBlockCount

Get the total number of blocks in the editor.

```javascript
// Get total block count
const count = blockEditorObj.getBlockCount();
console.log('Total blocks:', count);

// Iterate through all blocks
for (let i = 0; i < count; i++) {
    // Get each block by index
    // (Note: getBlock() typically takes ID, iterate differently)
}
```

### Practical Block Management Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor created="onCreated" id="block-editor" blocks="@ViewBag.BlocksData">
    </ejs-blockeditor>
    
    <div id="controls">
        <h3>Block Management Methods</h3>
        <div class="button-group">
            <button onclick="addBlockBtn()">Add Block</button>
            <button onclick="removeBlockBtn()">Remove Block</button>
            <button onclick="getBlockBtn()">Get Block</button>
            <button onclick="moveBlockBtn()">Move Block</button>
            <button onclick="updateBlockBtn()">Update Block</button>
            <button onclick="getBlockCountBtn()">Get Block Count</button>
        </div>
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
    
    .button-group button {
        margin: 5px;
        padding: 8px 16px;
        background-color: #007acc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .button-group button:hover {
        background-color: #005a9e;
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
    
    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'), 
            ejs.blockeditor.BlockEditor
        );
    }
    
    function addBlockBtn() {
        const newBlock = {
            id: 'new-' + Date.now(),
            blockType: 'Paragraph',
            content: [
                {
                    contentType: "Text",
                    content: 'This is a newly added block'
                }
            ]
        };
        
        blockEditorObj.addBlock(newBlock);
        displayOutput(`Block added with ID: ${newBlock.id}`);
    }
    
    function removeBlockBtn() {
        if (blockEditorObj.getBlockCount() > 1) {
            blockEditorObj.removeBlock('block-3');
            displayOutput('Block with ID "block-3" removed');
        } else {
            displayOutput('Cannot remove last block');
        }
    }
    
    function getBlockBtn() {
        const block = blockEditorObj.getBlock('block-1');
        if (block && block.content) {
            displayOutput(`Block found:\nID: ${block.id}\nType: ${block.blockType}\nContent: ${block.content[0].content}`);
        } else {
            displayOutput('Block "block-1" not found');
        }
    }
    
    function moveBlockBtn() {
        blockEditorObj.moveBlock('block-2', 'block-1');
        displayOutput('Block "block-2" moved successfully');
    }
    
    function updateBlockBtn() {
        const success = blockEditorObj.updateBlock('block-2', {
            content: [
                {
                    contentType: "Text",
                    content: 'Updated content'
                }
            ]
        });
        
        if (success) {
            displayOutput('Block "block-2" updated successfully');
        } else {
            displayOutput('Failed to update block');
        }
    }
    
    function getBlockCountBtn() {
        const count = blockEditorObj.getBlockCount();
        displayOutput(`Total number of blocks: ${count}`);
    }
    
    function displayOutput(message) {
        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            outputDiv.textContent = message;
        }
    }
</script>
```

## Selection and Cursor Methods

### setSelection

Set text selection within a specific content element using start and end positions.

```javascript
// Set text selection from position 0 to 10
blockEditorObj.setSelection('content-id', 0, 10);
```

### setCursorPosition

Set cursor position within a content element.

```javascript
// Set cursor at position 5 in the content
blockEditorObj.setCursorPosition('content-id', 5);
```

### getSelectedBlocks

Get all blocks that are currently selected.

```javascript
// Get selected blocks
const selectedBlocks = blockEditorObj.getSelectedBlocks();
console.log('Selected blocks count:', selectedBlocks.length);

selectedBlocks.forEach(block => {
    console.log('Selected block ID:', block.id);
});
```

### getRange

Get the current text selection range.

```javascript
// Get current selection range
const range = blockEditorObj.getRange();
if (range) {
    console.log('Selection start:', range.start);
    console.log('Selection end:', range.end);
}
```

### selectRange

Select a specific range of text.

```javascript
// Select text from start to end position
blockEditorObj.selectRange(0, 100);
```

### selectBlock

Select an entire block.

```javascript
// Select a specific block
blockEditorObj.selectBlock('block-id');
```

### selectAllBlocks

Select all blocks in the editor.

```javascript
// Select all blocks
blockEditorObj.selectAllBlocks();
```

## Focus Management

### focusIn

Set focus to the Block Editor.

```javascript
// Focus the editor
blockEditorObj.focusIn();
```

### focusOut

Remove focus from the Block Editor.

```javascript
// Remove focus from editor
blockEditorObj.focusOut();
```

## Formatting Methods

### executeToolbarAction

Execute a toolbar formatting action programmatically.

```javascript
// Apply bold formatting
blockEditorObj.executeToolbarAction('bold');

// Apply italic formatting
blockEditorObj.executeToolbarAction('italic');

// Other formatting actions: underline, strikethrough, link, fontColor, backgroundColor
```

### enableToolbarItems

Enable specific toolbar items.

```javascript
// Enable toolbar items by ID
blockEditorObj.enableToolbarItems(['bold', 'italic', 'underline']);
```

### disableToolbarItems

Disable specific toolbar items.

```javascript
// Disable toolbar items
blockEditorObj.disableToolbarItems(['strikethrough', 'link']);
```

## Data Export Methods

### getDataAsJson

Export editor content as JSON.

```javascript
// Get editor content as JSON
const jsonContent = blockEditorObj.getDataAsJson();
console.log('JSON data:', jsonContent);

// Send to server
fetch('/api/save-content', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonContent)
});
```

### getDataAsHtml

Export editor content as HTML.

```javascript
// Get editor content as HTML
const htmlContent = blockEditorObj.getDataAsHtml();
console.log('HTML content:', htmlContent);

// Display in preview
document.getElementById('preview').innerHTML = htmlContent;
```

### renderBlocksFromJson

Render blocks from JSON data.

```javascript
const jsonData = {
    blocks: [
        {
            id: 'p1',
            blockType: 'Paragraph',
            content: [{ contentType: 'Text', content: 'Content from JSON' }]
        }
    ]
};

// Render blocks from JSON
blockEditorObj.renderBlocksFromJson(jsonData);
```

### parseHtmlToBlocks

Parse HTML string to blocks.

```javascript
const htmlString = '<p>HTML content</p><h2>Heading</h2>';

// Parse HTML to blocks
const blocks = blockEditorObj.parseHtmlToBlocks(htmlString);
console.log('Parsed blocks:', blocks);
```

### print

Print the editor content.

```javascript
// Print editor content
blockEditorObj.print();
```

## Complete API Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor created="onCreated" id="block-editor" blocks="@ViewBag.BlocksData">
    </ejs-blockeditor>
    
    <div id="controls">
        <h3>API Methods Demo</h3>
        
        <div>
            <h4>Data Export</h4>
            <button onclick="exportAsJson()">Export as JSON</button>
            <button onclick="exportAsHtml()">Export as HTML</button>
            <button onclick="printContent()">Print</button>
        </div>
        
        <div>
            <h4>Selection & Cursor</h4>
            <button onclick="selectAllBtn()">Select All Blocks</button>
            <button onclick="focusBtn()">Focus Editor</button>
        </div>
        
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
    }
    
    #controls h4 {
        margin-top: 15px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
    }
    
    button {
        margin: 5px 5px 5px 0;
        padding: 8px 16px;
        background-color: #007acc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #005a9e;
    }
    
    #output {
        margin-top: 15px;
        padding: 10px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        min-height: 100px;
        font-family: monospace;
        white-space: pre-wrap;
        max-height: 300px;
        overflow-y: auto;
    }
</style>

<script>
    var blockEditorObj;
    
    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'), 
            ejs.blockeditor.BlockEditor
        );
    }
    
    function exportAsJson() {
        const json = blockEditorObj.getDataAsJson();
        displayOutput('JSON Export:\n' + JSON.stringify(json, null, 2));
    }
    
    function exportAsHtml() {
        const html = blockEditorObj.getDataAsHtml();
        displayOutput('HTML Export:\n' + html);
    }
    
    function printContent() {
        blockEditorObj.print();
        displayOutput('Print dialog opened');
    }
    
    function selectAllBtn() {
        blockEditorObj.selectAllBlocks();
        const count = blockEditorObj.getSelectedBlocks().length;
        displayOutput(`Selected ${count} blocks`);
    }
    
    function focusBtn() {
        blockEditorObj.focusIn();
        displayOutput('Editor focused. Start typing...');
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
            id = "block-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "API Methods Demo" }
            }
        },
        new BlockModel
        {
            id = "block-2",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "This demo showcases various API methods" }
            }
        }
    };
    
    ViewBag.BlocksData = blocks;
    return View();
}

[HttpPost]
public IActionResult SaveContent([FromBody] object content)
{
    // Save content to database
    return Json(new { success = true });
}
```

The Block Editor provides a comprehensive API for managing content programmatically, enabling advanced customization and integration with your application workflow.
