# Table Blocks — Syncfusion ASP.NET MVC Block Editor

## Configure a Table Block

Set `blockType = "Table"` and define structure in `properties` using `columns` and `rows`.

### Minimal Table Example

```csharp
public class BlockModel
{
    public string blockType { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

new BlockModel
{
    blockType = "Table",
    properties = new
    {
        columns = new List<object>
        {
            new { id = "col1", headerText = "Name" },
            new { id = "col2", headerText = "Status" }
        },
        rows = new List<object>
        {
            new
            {
                cells = new List<object>
                {
                    new
                    {
                        columnId = "col1",
                        blocks = new List<BlockModel>
                        {
                            new BlockModel
                            {
                                blockType = "Paragraph",
                                content = new List<object>
                                {
                                    new { contentType = "Text", content = "Task A" }
                                }
                            }
                        }
                    },
                    new
                    {
                        columnId = "col2",
                        blocks = new List<BlockModel>
                        {
                            new BlockModel
                            {
                                blockType = "Paragraph",
                                content = new List<object>
                                {
                                    new { contentType = "Text", content = "In Progress" }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

### Table Properties

| Property | Description | Default |
|---|---|---|
| `columns` | Column definitions (`id`, `headerText`) | `[]` |
| `rows` | Row definitions with `cells` arrays | `[]` |
| `width` | Table display width | `"100%"` |
| `enableHeader` | Show column headers | `true` |
| `enableRowNumbers` | Show row number column | `true` |
| `readOnly` | Disable editing within the table | `false` |

### Multi-Column Table

```csharp
new BlockModel
{
    blockType = "Table",
    properties = new
    {
        enableHeader = true,
        enableRowNumbers = true,
        columns = new List<object>
        {
            new { id = "col1", headerText = "Column 1" },
            new { id = "col2", headerText = "Column 2" },
            new { id = "col3", headerText = "Column 3" }
        },
        rows = new List<object>
        {
            new
            {
                cells = new List<object>
                {
                    new { columnId = "col1", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 1" } } } } },
                    new { columnId = "col2", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 2" } } } } },
                    new { columnId = "col3", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 3" } } } } }
                }
            },
            new
            {
                cells = new List<object>
                {
                    new { columnId = "col1", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 4" } } } } },
                    new { columnId = "col2", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 5" } } } } },
                    new { columnId = "col3", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Cell 6" } } } } }
                }
            }
        }
    }
}
```

---

## Table Interactions

### Resizing Columns

Drag column borders to adjust widths dynamically. Resizing respects the layout; if the total width exceeds the container, a horizontal scrollbar appears. Only columns (not rows) can be resized.

### Multi-Row/Column Selection and Deletion

- **Single row** — click the row gripper (left side) to select it.
- **Multiple rows** — hold `Shift` and click another row to select a contiguous range. Shift + arrow keys also extend the selection.
- **Delete** — once rows or columns are selected, use the Delete popup that appears to remove them.
- **Full table deletion** — select the entire table and use the Delete popup to remove it completely.

### Slash Commands Inside Cells

Type `/` inside a table cell to open the slash command menu and insert a new block type within that cell.

### Keyboard Shortcuts in Table Cells

Standard formatting shortcuts (`Ctrl+B`, `Ctrl+I`, etc.) work inside table cells. Use `Tab` to move to the next cell and `Shift+Tab` to move to the previous cell.

---

## Read-Only Table

Render a table that users can view but not edit:

```csharp
new BlockModel
{
    blockType = "Table",
    properties = new
    {
        readOnly = true,
        enableHeader = true,
        columns = new List<object>
        {
            new { id = "col1", headerText = "Field" },
            new { id = "col2", headerText = "Value" }
        },
        rows = new List<object>
        {
            new
            {
                cells = new List<object>
                {
                    new { columnId = "col1", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Status" } } } } },
                    new { columnId = "col2", blocks = new List<BlockModel> { new BlockModel { blockType = "Paragraph", content = new List<object> { new { contentType = "Text", content = "Active" } } } } }
                }
            }
        }
    }
}
```
