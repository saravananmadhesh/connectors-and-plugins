# Drag and Drop — Syncfusion ASP.NET MVC Block Editor

## Enable/Disable Drag and Drop

Drag and drop is **enabled by default** (`EnableDragAndDrop = true`). To disable it:

```razor
@Html.EJS().BlockEditor("block-editor").EnableDragAndDrop(false).Render()
```

To explicitly enable (same as default):

```razor
@Html.EJS().BlockEditor("block-editor").EnableDragAndDrop(true).Render()
```

---

## Dragging Blocks

### Single Block Drag

1. Hover over any block to reveal the drag handle icon on the left.
2. Click and hold the drag handle.
3. Drag the block to the desired position — a visual indicator shows where it will land.
4. Release to drop.

### Multiple Block Drag

1. Select multiple blocks by clicking and using keyboard selection.
2. Once selected, hover over any selected block's drag handle.
3. Drag the entire selection to a new position.
4. Release to drop all selected blocks together.

> During drag, the editor renders a drop indicator line between blocks to help users place content precisely.

---

## Full Example with Drag Events

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor")
        .Blocks((List<BlockModel>)ViewBag.BlocksData)
        .EnableDragAndDrop(true)
        .BlockDragStart("onDragStart")
        .BlockDragging("onDragging")
        .BlockDropped("onDropped")
        .Render()
</div>

<style>
    #blockeditor-container { margin: 20px auto; }
</style>

<script>
    function onDragStart(args) {
        console.log('Drag started');
    }
    function onDragging(args) {
        // Fires continuously; avoid heavy work here
    }
    function onDropped(args) {
        console.log('Blocks rearranged');
    }
</script>
```

```csharp
public ActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object> { new { contentType = "Text", content = "Drag and Drop Demo" } }
        },
        new BlockModel
        {
            blockType = "Paragraph",
            content = new List<object> { new { contentType = "Text", content = "Hover a block to see the drag handle, then drag to reorder." } }
        },
        new BlockModel
        {
            blockType = "BulletList",
            content = new List<object> { new { contentType = "Text", content = "Drag and drop is enabled by default" } }
        },
        new BlockModel
        {
            blockType = "NumberedList",
            content = new List<object> { new { contentType = "Text", content = "Select multiple blocks and drag them together" } }
        }
    };
    ViewBag.BlocksData = blocks;
    return View();
}
```
