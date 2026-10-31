# Row Customization — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Customize Row Appearance](#customize-row-appearance)
- [Alternate Row Styling](#alternate-row-styling)
- [Row Template](#row-template)
- [Detail Template](#detail-template)
- [Row Drag and Drop](#row-drag-and-drop)
- [Row Height](#row-height)
- [Row Spanning](#row-spanning)
- [Indent and Outdent](#indent-and-outdent)

---

## When to Use This Skill

Use this reference when you need to:
- Customize the appearance of rows based on data conditions
- Apply alternate row styling for better readability
- Use row templates for complex row layouts
- Implement detail templates for expandable rows
- Enable row drag-and-drop functionality
- Adjust row height or implement row spanning
- Implement indent/outdent operations for hierarchical data

---

## Customize Row Appearance

Use the `rowDataBound` event to apply conditional styling to rows:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" rowDataBound="onRowDataBound">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onRowDataBound(args) {
        // Highlight rows where Duration > 5
        if (args.data['Duration'] > 5) {
            args.row.style.backgroundColor = '#f9d6d6';
        }
    }
</script>
```

---

## Alternate Row Styling

Override the `.e-altrow` CSS class to change the background color of every other row:

```css
.e-treegrid .e-altrow {
    background-color: #ffd800;
}
```

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" enableAltRow="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Row Template

Replace the entire row rendering with a custom template using `rowTemplate`. When using `rowTemplate`, the template receives the bound data record.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="0" rowTemplate="#rowtemplate" height="335">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" width="130"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script id="rowtemplate" type="text/x-template">
    <tr>
        <td class="border-bottom">
            <b>${TaskName}</b>
        </td>
        <td class="border-bottom">
            ${StartDate}
        </td>
    </tr>
</script>
```

> Selection is NOT supported when using `rowTemplate`.
> `frozenRows`/`frozenColumns` and editing are incompatible with `rowTemplate`.

---

## Detail Template

Show additional information in an expandable detail row below each record using `detailTemplate`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" detailTemplate="#detailtemplate" height="335">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script id="detailtemplate" type="text/x-template">
    <div class="detail-info">
        <p><b>Task:</b> ${TaskName}</p>
        <p><b>Duration:</b> ${Duration} days</p>
        <p><b>Priority:</b> ${Priority}</p>
    </div>
</script>
```

> `detailTemplate` is NOT compatible with virtualization or stacked headers.
> `frozenRows`/`frozenColumns` are incompatible with `detailTemplate`.

---

## Row Drag and Drop

Enable users to reorder rows by dragging. Requires `allowRowDragAndDrop="true"` and `isPrimaryKey`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowRowDragAndDrop="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Handle the `rowDrop` event to capture and persist the new order:

```cshtml
<ejs-treegrid id="TreeGrid" ... rowDrop="onRowDrop">
```

```javascript
function onRowDrop(args) {
    console.log('Dropped at index:', args.dropIndex);
    console.log('Dropped data:', args.data);
}
```

---

## Row Height

Set a fixed height for all rows using the `rowHeight` property or CSS:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" rowHeight="60">
    ...
</ejs-treegrid>
```

Or via CSS (needed when using row virtualization with varying content heights):
```css
.e-treegrid .e-row {
    height: 2em;
}
```

---

## Row Spanning

Span a cell across multiple rows using `rowSpan` in the `queryCellInfo` event:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" queryCellInfo="onQueryCellInfo">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onQueryCellInfo(args) {
        if (args.column.field === 'Priority' && args.data['TaskId'] === 1) {
            args.rowSpan = 3;
        }
    }
</script>
```

> Row spanning is NOT compatible with row virtual scrolling.

---

## Indent and Outdent

Change the indent level of rows (affects the hierarchy level):

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1"
              toolbar="@(new List<string>() {"Indent","Outdent"})">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"
                             mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```
