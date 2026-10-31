# Methods — Syncfusion ASP.NET MVC Block Editor

## Table of Contents
- [Getting the Instance](#getting-the-instance)
- [Block Management](#block-management)
- [Selection & Cursor](#selection--cursor)
- [Focus Management](#focus-management)
- [Formatting Methods](#formatting-methods)
- [Data Export & Import](#data-export--import)

---

## Getting the Instance

All method calls require a reference to the component instance. Capture it in the `Created` event:

```razor
@Html.EJS().BlockEditor("block-editor").Created("onCreated").Render()
```

```javascript
var blockEditorObj;
function onCreated() {
    blockEditorObj = ej.base.getInstance(
        document.getElementById('block-editor'),
        ejs.blockeditor.BlockEditor
    );
}
```

> Never call methods before `onCreated` fires. The instance is `null` until the editor is fully initialized.

---

## Block Management

### addBlock

Adds a new block relative to a target block. `insertAfter = true` inserts after the target; `false` inserts before.

```javascript
var newBlock = {
    id: 'new-para',
    blockType: 'Paragraph',
    content: [{ contentType: 'Text', content: 'New block content' }]
};

// Insert after 'target-block-id'
blockEditorObj.addBlock(newBlock, 'target-block-id', true);

// Insert before 'target-block-id'
blockEditorObj.addBlock(newBlock, 'target-block-id', false);
```

### removeBlock

Removes a block by its `id`:

```javascript
blockEditorObj.removeBlock('block-to-remove');
```

### moveBlock

Moves a block to a new position relative to a target:

```javascript
blockEditorObj.moveBlock('source-block-id', 'target-block-id');
```

### updateBlock

Updates specific properties of an existing block. Returns `true` on success, `false` if block not found.

```javascript
var success = blockEditorObj.updateBlock('block-id', {
    indent: 1,
    content: [{ content: 'Updated text' }]
});

// Toggle checklist checked state
blockEditorObj.updateBlock('checklist-block-id', { isChecked: true });
```

### getBlock

Retrieves a block model by its `id`. Returns `null` if not found.

```javascript
var block = blockEditorObj.getBlock('block-id');
if (block) {
    console.log('Type:', block.blockType);
    console.log('Content:', block.content[0].content);
}
```

### getBlockCount

Returns the total number of blocks in the editor:

```javascript
var count = blockEditorObj.getBlockCount();
console.log('Total blocks:', count);
```

---

## Selection & Cursor

### setSelection

Selects text within a content element from `start` to `end` position:

```javascript
// Select characters 5–15 in a content element with id 'content-el-id'
blockEditorObj.setSelection('content-el-id', 5, 15);
```

### setCursorPosition

Places the cursor at a specific character position within a block:

```javascript
blockEditorObj.setCursorPosition('block-id', 10);
```

### getSelectedBlocks

Returns an array of currently selected block models. Returns `null` if nothing is selected.

```javascript
var selected = blockEditorObj.getSelectedBlocks();
if (selected && selected.length > 0) {
    selected.forEach(b => console.log(b.id, b.blockType));
}
```

### getRange

Returns the current `Range` object. Returns `null` when no selection is active.

```javascript
var range = blockEditorObj.getRange();
if (range) {
    console.log('Start offset:', range.startOffset);
    console.log('End offset:', range.endOffset);
    console.log('Collapsed (cursor only):', range.collapsed);
}
```

### selectRange

Sets the selection to a custom `Range` object:

```javascript
var element = document.getElementById('para-block');
var range = document.createRange();
var textNode = element.querySelector('.e-block-content').firstChild;
range.setStart(textNode, 5);
range.setEnd(textNode, 20);
blockEditorObj.selectRange(range);
```

### selectBlock

Selects an entire block by its `id`:

```javascript
blockEditorObj.selectBlock('heading-block');
```

### selectAllBlocks

Selects all blocks in the editor:

```javascript
blockEditorObj.selectAllBlocks();
```

---

## Focus Management

### focusIn

Gives focus to the editor, making it ready for keyboard input:

```javascript
blockEditorObj.focusIn();
```

### focusOut

Removes focus from the editor and clears any active selections:

```javascript
blockEditorObj.focusOut();
```

---

## Formatting Methods

### executeToolbarAction

Applies a built-in formatting command to the currently selected text:

```javascript
// Apply bold
blockEditorObj.executeToolbarAction(ej.blockeditor.BuiltInToolbar.Bold);

// Apply italic
blockEditorObj.executeToolbarAction(ej.blockeditor.BuiltInToolbar.Italic);

// Apply text color (pass color as second argument)
blockEditorObj.executeToolbarAction(ej.blockeditor.BuiltInToolbar.Color, '#ff0000');
```

### enableToolbarItems

Enables one or more inline toolbar items:

```javascript
// Enable a single item
blockEditorObj.enableToolbarItems('bold');

// Enable multiple items
blockEditorObj.enableToolbarItems(['bold', 'italic', 'underline']);
```

### disableToolbarItems

Disables one or more inline toolbar items:

```javascript
blockEditorObj.disableToolbarItems('bold');
blockEditorObj.disableToolbarItems(['bold', 'italic']);
```

---

## Data Export & Import

### getDataAsJson

Exports all blocks (or a specific block) as a JSON object:

```javascript
// All blocks
var allJson = blockEditorObj.getDataAsJson();
console.log(JSON.stringify(allJson, null, 2));

// Specific block
var blockJson = blockEditorObj.getDataAsJson('block-id');
```

### getDataAsHtml

Exports all blocks (or a specific block) as an HTML string:

```javascript
// All blocks
var allHtml = blockEditorObj.getDataAsHtml();

// Specific block
var blockHtml = blockEditorObj.getDataAsHtml('block-id');
```

### renderBlocksFromJson

Renders blocks from a JSON data object. Optionally replaces existing content or inserts after a target block.

```javascript
// Replace all existing content
blockEditorObj.renderBlocksFromJson(jsonData, true);

// Insert at cursor without replacing (default behavior)
blockEditorObj.renderBlocksFromJson(jsonData);

// Insert after a specific block (only when replace = false)
blockEditorObj.renderBlocksFromJson(jsonData, false, 'target-block-id');
```

### parseHtmlToBlocks

Converts an HTML string into an array of block model objects:

```javascript
var htmlString = '<h1>Title</h1><p>Paragraph text.</p>';
var blocks = blockEditorObj.parseHtmlToBlocks(htmlString);
console.log('Parsed blocks:', blocks.length);
```

### print

Opens the browser print dialog with the current editor content formatted for printing:

```javascript
blockEditorObj.print();
```

---

## Real-World Pattern: Auto-Save on Blur

```razor
@Html.EJS().BlockEditor("block-editor")
    .Created("onCreated")
    .Blur("onBlur")
    .Render()
```

```javascript
var blockEditorObj;

function onCreated() {
    blockEditorObj = ej.base.getInstance(
        document.getElementById('block-editor'),
        ejs.blockeditor.BlockEditor
    );
}

function onBlur() {
    var jsonData = blockEditorObj.getDataAsJson();
    fetch('/api/content/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    });
}
```
