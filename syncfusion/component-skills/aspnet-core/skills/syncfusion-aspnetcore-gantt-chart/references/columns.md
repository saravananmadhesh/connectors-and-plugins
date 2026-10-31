# Columns — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Defining Columns](#defining-columns)
- [Column Properties Reference](#column-properties-reference)
- [Custom Column Header](#custom-column-header)
- [Column Template](#column-template)
- [Column Type](#column-type)
- [Column Format](#column-format)
- [Serial Number Column](#serial-number-column)
- [Checkbox Column](#checkbox-column)
- [Show or Hide Columns Dynamically](#show-or-hide-columns-dynamically)
- [Controlling Column Actions](#controlling-column-actions)
- [Frozen Columns](#frozen-columns)
- [Column Reordering](#column-reordering)
- [Column Resizing](#column-resizing)
- [Column Spanning](#column-spanning)
- [Responsive Columns](#responsive-columns)
- [WBS Column](#wbs-column)
- [Column Menu](#column-menu)
- [TreeColumnIndex](#treecolumnindex)

---

## Defining Columns

Use `<e-gantt-columns>` to explicitly define which columns appear in the TreeGrid section. If omitted, Gantt auto-generates columns from `taskFields`.

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"> </e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="250"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

---

## Column Properties Reference

| Property | Type | Description |
|---|---|---|
| `field` | string | Maps to the data model property name |
| `headerText` | string | Column header label |
| `width` | number/string | Column width in pixels or percentage |
| `textAlign` | string | `Left` \| `Right` \| `Center` \| `Justify` |
| `format` | string | Date/number format (e.g., `yMd`, `C2`, `n2`) |
| `isPrimaryKey` | bool | Must be `true` on the ID column for CRUD |
| `visible` | bool | Show or hide the column |
| `allowEditing` | bool | Allow cell editing for this column |
| `allowSorting` | bool | Allow sorting on this column |
| `allowFiltering` | bool | Allow filtering on this column |
| `clipMode` | string | `Clip` \| `Ellipsis` \| `EllipsisWithTooltip` |
| `editType` | string | `numericedit` \| `defaultedit` \| `dropdownedit` \| `booleanedit` \| `datepickeredit` |
| `freeze` | string | `Left` \| `Right` to freeze the column |
| `minWidth` | number | Minimum column width during resizing |
| `maxWidth` | number | Maximum column width during resizing |

---

## Custom Column Header

Use `headerText` for a simple rename, or `headerTemplate` for rich HTML content:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
          endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskName" headerTemplate="#projectName" width="150"></e-gantt-column>
        <e-gantt-column field="StartDate" headerTemplate="#dateTemplate" width="150"></e-gantt-column>
        <e-gantt-column field="Duration" headerTemplate="#durationTemplate" width="150"></e-gantt-column>
        <e-gantt-column field="Progress" headerTemplate="#progressTemplate" width="150"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
				
			
<script type="text/x-template" id="projectName">
    <div>
        <div>
            <img src="taskname.png" width="20" height="20" class="e-image" />  Task Name
        </div>
    </div>
</script>
<script type="text/x-template" id="dateTemplate">
    <div>
        <div>
            <img src="startdate.png" width="20" height="20" class="e-image" />  Start Date
        </div>
    </div>
</script>
<script type="text/x-template" id="durationTemplate">
    <div>
        <div>
            <img src="duration.png" width="20" height="20" class="e-image" />  Duration
        </div>
    </div>
</script>
<script type="text/x-template" id="progressTemplate">
    <div>
        <div>
            <img src="progress.png" width="20" height="20" class="e-image" />  Progress
        </div>
    </div>
</script>
```

> Header templates use `type="text/x-template"` script blocks. Reference them by script ID string on the `headerTemplate` attribute (e.g., `headerTemplate="#projectName"`). There is no `<e-gantt-column-headertemplate>` child tag.

---

## Column Template

Render custom HTML inside cells using a column template — reference a script ID string via the `template` attribute:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" resources="ViewBag.projectResources">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
           endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks" resourceInfo="ResourceId">
    </e-gantt-taskfields>
     <e-gantt-resourcefields id="ResourceId" name="ResourceName"> </e-gantt-resourcefields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" headerText="Task Id" width="50"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="ResourceId" headerText="Resources" template="#columnTemplate"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>					
</ejs-gantt>
				
    <script type="text/x-jsrender" id="columnTemplate">
        ${if(ganttProperties.resourceNames)}
        <div class="image">
            <img src="${TaskID}.png" style="height:40px;width:40px" /><div style="display:inline-block;width:100%;position:relative;left:30px;top:-14px">${ganttProperties.resourceNames}</div>
        </div>
        ${/if}
    </script>
```

> Column templates use `type="text/x-jsrender"` script blocks. Reference them by script ID string on the `template` attribute (e.g., `template="#columnTemplate"`). There is no `<e-gantt-column-template>` child tag. Access gantt-computed values via `${ganttProperties.resourceNames}`, and raw task fields via `${TaskName}`, `${Progress}`, etc.

---

## Column Type

Use `columns.type` to specify the data type of a column. If `format` is defined, Gantt uses `type` to choose between number or date formatting.

Supported types:
- `string`
- `number`
- `boolean`
- `date`
- `dateTime`

```cshtml
<e-gantt-column field="Progress"  type="number"  headerText="Progress" width="100"></e-gantt-column>
<e-gantt-column field="StartDate" type="date"    headerText="Start Date" format="yMd" width="120"></e-gantt-column>
<e-gantt-column field="IsActive"  type="boolean" headerText="Active" displayAsCheckBox="true" width="80"></e-gantt-column>
```

> If `type` is not defined, it is inferred from the first record of `dataSource`. If the first record has a `null`/blank value for a column, you must explicitly define the `type` for that column.

---

## Column Format

Format cell values using the `columns.format` property. Gantt uses the Internationalization library for number and date values. Default culture is `en-US`.

### Number Formatting

| Format | Description |
|--------|-------------|
| `N` | Numeric — followed by precision integer (e.g., `N2`, `N3`) |
| `C` | Currency — followed by precision integer (e.g., `C2`, `C3`) |
| `P` | Percentage — input must be in range 0–100; `0.2` renders as `20%` (e.g., `P2`) |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="150"></e-gantt-column>
        <e-gantt-column field="Progress" width="150" format="C"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Date Formatting

Pass a built-in skeleton string or a custom format object to `format`:

| Format | Rendered Value |
|--------|---------------|
| `{ type:'date', format:'dd/MM/yyyy' }` | 04/07/2019 |
| `{ type:'date', format:'dd.MM.yyyy' }` | 04.07.2019 |
| `{ type:'date', skeleton:'short' }` | 7/4/19 |
| `{ type:'dateTime', format:'dd/MM/yyyy hh:mm a' }` | 04/07/2019 12:00 AM |
| `{ type:'dateTime', format:'MM/dd/yyyy hh:mm:ss a' }` | 07/04/2019 12:00:00 AM |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
           endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="50"></e-gantt-column>
        <e-gantt-column field="TaskName"></e-gantt-column>
        <e-gantt-column field="StartDate" format="yMd"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

---

## Serial Number Column

Add an auto-incrementing serial number column to display row indices. Enable with `enableSerialNumber="true"` and include a column with `field="SerialNumber"`.

### Enable Serial Number Column

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="450px"
           enableSerialNumber="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="SerialNumber" headerText="S.No" width="70" textAlign="Center"></e-gantt-column>
        <e-gantt-column field="TaskId" width="100"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate" format="yMd"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Serial Number Column Behavior

| Scenario | Behavior |
|----------|----------|
| **Initial Render** | Serial numbers increment from 1 based on visible row order |
| **Sorting** | Serial numbers re-index after sort is applied; numbers reflect current sort order |
| **Filtering** | Serial numbers re-index to show only visible filtered rows; numbers are sequential for visible rows only |
| **Searching** | Serial numbers re-index for matching search results; hidden rows are not numbered |
| **Row Expand/Collapse** | Expanding or collapsing parent rows updates serial numbers; child row numbers adjust accordingly |
| **Adding Rows** | New rows receive the next sequential number; existing numbers update if insertion changes row order |
| **Editing Rows** | Serial numbers remain unchanged during cell or dialog editing |
| **Deleting Rows** | Remaining rows are re-indexed; numbers remain sequential |
| **Drag and Drop** | Serial numbers re-index after rows are reordered; new sequence is reflected |
| **Virtualization** | Serial numbers reflect position in virtualized view; numbers update as user scrolls |
| **Paging** | Each page has independent serial numbering starting from 1 (if paging is enabled) |

### Serial Number Column Examples

**Basic Serial Number Column:**
```cshtml
<e-gantt-column field="SerialNumber" headerText="No." width="60" textAlign="Center"></e-gantt-column>
```

**Frozen Serial Number Column:**
```cshtml
<e-gantt-column field="SerialNumber" headerText="S.No" width="70" 
                textAlign="Center" isFrozen="true"></e-gantt-column>
```

**Custom Header with Serial Number:**
```cshtml
<e-gantt-column field="SerialNumber" headerTemplate="#serialHeader" width="70" 
                textAlign="Center"></e-gantt-column>

<script type="text/x-template" id="serialHeader">
    <div>
        <span style="color: #0066cc; font-weight: bold;">Sequence #</span>
    </div>
</script>
```

### Serial Number Column Limitations

1. **Cannot Be Edited**: Serial number values are read-only and auto-generated; do not set `allowEditing="true"` on this column.

2. **Cannot Be Sorted**: Serial number column sorting is disabled; sorting is based on underlying data, and serial numbers reflect the sorted order.

3. **Cannot Be Filtered**: Serial numbers cannot be used as filter criteria; filter other columns instead.

4. **Cannot Be Used for CRUD**: Serial numbers are computed; they cannot be used as task IDs or primary keys for CRUD operations.

5. **Paging Context**: When paging is enabled, each page shows serial numbers starting from 1; across pages, numbers are not continuous.

6. **Hierarchical Display**: Serial numbers include parent and child tasks in a single sequence; collapsed parents do not affect numbering of visible children.

### Best Practices

1. **Position at Start**: Place the serial number column at the leftmost position for clarity.

2. **Freeze if Needed**: If you have many columns, consider freezing the serial number column so it stays visible during horizontal scroll.

3. **Use Meaningful Header**: Use clear headers like "S.No" or "Row #" to indicate the column's purpose.

4. **Combine with Primary Key**: Always maintain a separate ID field (TaskId) for primary key operations; do not rely on serial numbers for data identification.

5. **Document Behavior**: If your application depends on serial number updates, document the re-indexing behavior for sort, filter, and drag-and-drop operations.

---

## Checkbox Column

Add a boolean checkbox column for selection or boolean data fields:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Verified" headerText="Verified" displayAsCheckBox="true"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

---

## Show or Hide Columns Dynamically

Use the `showColumn` and `hideColumn` methods to toggle column visibility programmatically via external buttons. Pass the column's `headerText` value to identify the column.

```cshtml
<ejs-button id="show" cssClass="e-flat" content="Show Columns"></ejs-button>
<ejs-button id="hide" cssClass="e-flat" content="Hide Columns"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
       endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>

<script>
    document.getElementById("show").addEventListener("click", function () {
        var gantt = document.getElementById("Gantt").ej2_instances[0];
        gantt.showColumn(['Duration']); //show by HeaderText
    });

    document.getElementById("hide").addEventListener("click", function () {
        var gantt = document.getElementById("Gantt").ej2_instances[0];
        gantt.hideColumn(['Duration']); //hide by HeaderText
    })
</script>
```

> Pass the column **headerText** (not the field name) to `showColumn`/`hideColumn`.

---

## Controlling Column Actions

Enable or disable specific Gantt actions per column using the following boolean properties on `<e-gantt-column>`:

| Property | Description |
|----------|-------------|
| `allowFiltering` | Enables or disables filtering for the column |
| `allowSorting` | Enables or disables sorting for the column |
| `allowReordering` | Enables or disables drag reordering for the column |
| `allowEditing` | Enables or disables cell editing for the column |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1"
           allowSorting="true" allowReordering="true" allowFiltering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" allowSorting="false" width="250"></e-gantt-column>
        <e-gantt-column field="Progress" allowReordering="false"></e-gantt-column>
        <e-gantt-column field="StartDate" allowEditing="false"></e-gantt-column>
        <e-gantt-column field="Duration" allowFiltering="false"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>
```

---

## Frozen Columns

Pin columns to the left or right so they remain visible when scrolling horizontally. Use the `frozenColumns` property on `<ejs-gantt>` to freeze the first N columns from the left:

```cshtml
@using Syncfusion.EJ2.Gantt

<div>
    <ejs-gantt id="GanttContainer"
               datasource="@Model.DataSource"
               height="430px"
               treeColumnIndex="1"
               gridLines="Both"
               frozenColumns= 2
               allowSelection="false"
               splitterSettings="@(new GanttSplitterSettings { Position = \"65%\" })"
               labelSettings="@(new GanttLabelSettings { TaskLabel = \"Progress\" })"
               taskFields="@(new GanttTaskFields {
                   Id = \"TaskID\",
                   Name = \"TaskName\",
                   StartDate = \"StartDate\",
                   EndDate = \"EndDate\",
                   Duration = \"Duration\",
                   Dependency = \"Predecessor\",
                   Progress = \"Progress\",
                   ParentID = \"ParentID\"
               })">
        <e-gantt-columns>
            <e-gantt-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-gantt-column>
            <e-gantt-column field="TaskName" headerText="Task Name" textAlign="Left" width="290"></e-gantt-column>
            <e-gantt-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" width="120"></e-gantt-column>
            <e-gantt-column field="Duration" headerText="Duration" textAlign="Right" width="90"></e-gantt-column>
            <e-gantt-column field="EndDate" headerText="End Date" textAlign="Right" format="yMd" width="120"></e-gantt-column>
            <e-gantt-column field="Progress" headerText="Progress" textAlign="Left" width="120"></e-gantt-column>
            <e-gantt-column field="Predecessor" headerText="Predecessor" textAlign="Left" width="120"></e-gantt-column>
        </e-gantt-columns>
    </ejs-gantt>
</div>
```

### Freeze Particular Columns

Use the `isFrozen` property at the column level to freeze a specific column at any desired index on the left side:

```cshtml
@page
@model IndexModel

<ejs-gantt id="Gantt" dataSource="@Model.DataSource" height="430px" treeColumnIndex="1" gridLines="Both">
    <e-gantt-taskfields id="TaskID"
                        name="TaskName"
                        startDate="StartDate"
                        duration="Duration"
                        endDate="EndDate"
                        dependency="Predecessor"
                        progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-splitterSettings position="65%"></e-gantt-splitterSettings>
    <e-gantt-labelSettings taskLabel="Progress"></e-gantt-labelSettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskID" headerText="Task ID" isFrozen="true"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="220" isFrozen="true"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress"></e-gantt-column>
        <e-gantt-column field="Status" headerText="Status" isFrozen="true"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Freeze Direction

Use the `freeze` property to position frozen columns on the left, right, or in a fixed position:

| Value | Description |
|-------|-------------|
| `Left` | Freezes the column on the left side |
| `Right` | Freezes the column on the right side |
| `Fixed` | Locks the column at a fixed position — always visible during horizontal scroll |

```cshtml
@using Syncfusion.EJ2.Gantt

<div>
    <ejs-gantt id="GanttContainer"
               dataSource="@Model.DataSource"
               resources="@Model.Resources"
               height="430px"
               treeColumnIndex="1"
               gridLines="Both"
               allowSelection="false"
               highlightWeekends="true">
        <e-gantt-splitterSettings position="65%"></e-gantt-splitterSettings>
        <e-gantt-labelSettings taskLabel="Progress"></e-gantt-labelSettings>
        <e-gantt-taskFields id="TaskID" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" parentID="ParentID" resourceInfo="Resources"></e-gantt-taskFields>
        <e-gantt-resourceFields id="ResourceId" name="ResourceName"></e-gantt-resourceFields>
        <e-gantt-columns>
            <e-gantt-column field="TaskID" headerText="Task ID" width="90" textAlign="Right" freeze="Left"></e-gantt-column>
            <e-gantt-column field="TaskName" headerText="Task Name" width="200" textAlign="Left"></e-gantt-column>
            <e-gantt-column field="StartDate" headerText="Start Date" width="130" format="yMd" textAlign="Right"></e-gantt-column>
            <e-gantt-column field="Duration" headerText="Duration" width="110" textAlign="Right"></e-gantt-column>
            <e-gantt-column field="EndDate" headerText="End Date" width="130" format="yMd" textAlign="Right"></e-gantt-column>
            <e-gantt-column field="Progress" headerText="Progress" width="110" textAlign="Center" freeze="Fixed"></e-gantt-column>
            <e-gantt-column field="Predecessor" headerText="Dependency" width="120"></e-gantt-column>
            <e-gantt-column field="Resources" headerText="Assignee" width="150" freeze="Right"></e-gantt-column>
        </e-gantt-columns>
    </ejs-gantt>
</div>
```

> The `freeze` direction is not compatible when both `isFrozen` and `frozenColumns` properties are enabled simultaneously.

### Change Default Frozen Line Color

Customize the frozen border color using CSS:

```css
/* Left frozen columns */
.e-gantt .e-leftfreeze.e-freezeleftborder {
    border-right-color: rgb(0, 255, 0) !important;
}

/* Right frozen columns */
.e-gantt .e-rightfreeze.e-freezerightborder {
    border-left-color: rgb(0, 0, 255) !important;
}

/* Fixed frozen columns — both left and right borders */
.e-gantt .e-leftfreeze.e-freezeleftborder {
    border-right-color: rgb(0, 255, 0) !important;
}
.e-gantt .e-rightfreeze.e-freezerightborder {
    border-left-color: rgb(0, 0, 255) !important;
}
```

---

## Column Reordering

Allow users to drag and drop columns to reorder them. Set `allowReordering="true"` on `<ejs-gantt>`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowReordering="true" columnDragStart="columnDragStart"
    columnDrag="columnDrag" columnDrop="columnDrop">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
            endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> To disable reordering for a specific column, set `allowReordering="false"` on that `<e-gantt-column>`.

### Reorder Events

| Event | Trigger |
|-------|---------|
| `columnDragStart` | When column header drag starts |
| `columnDrag` | While column header is being dragged continuously |
| `columnDrop` | When a column header is dropped on the target column |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowReordering="true" columnDragStart="columnDragStart"
    columnDrag="columnDrag" columnDrop="columnDrop">
        <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                    endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
        </e-gantt-taskfields>
    </ejs-gantt>
<script>
    function columnDragStart() {
        alert('columnDragStart event is triggered');
    }
    function columnDrag() {
        alert('columnDrag event is triggered');
    }
    function columnDrop() {
        alert('columnDrop event is triggered');
    }
</script>
```

### Reorder Multiple Columns

Use the `reorderColumns` method to reorder multiple columns at once programmatically:

```cshtml
<ejs-button id="reorderMultipleCols" content="Reorder Task ID and Task Name to Last" cssClass="e-primary"></ejs-button>
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowReordering="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
             endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
	
<script>
	document.getElementById('reorderMultipleCols').addEventListener('click', function (args) {
           var ganttObj = document.getElementById('Gantt').ej2_instances[0];
           ganttObj.reorderColumns(['TaskId', 'TaskName'], 'Progress');
        });
</script>
```

---

## Column Resizing

Allow users to resize column widths by clicking and dragging the right edge of the column header. Double-clicking the right edge auto-fits the column to its widest cell content. Set `allowResizing="true"` on `<ejs-gantt>`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowResizing="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
        endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> To disable resizing for a specific column, set `allowResizing="false"` on that `<e-gantt-column>`.

### Minimum and Maximum Column Width

Restrict how far a column can be resized using `minWidth` and `maxWidth` per column:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" allowResizing="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="50"></e-gantt-column>
        <e-gantt-column field="TaskName" width="200" minWidth="150" maxWidth="250"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration" width="100" minWidth="50" maxWidth="200"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Touch Interaction

On touch devices, tapping the right edge of a column header reveals a floating resize handler. Drag the floating handler to resize the column.

---

## Column Spanning

Merge adjacent cells in a row to span multiple columns using the `queryCellInfo` event:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1"
           queryCellInfo="QueryCellEvent" >
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="work1" headerText="Work-1"></e-gantt-column>
        <e-gantt-column field="work2" headerText="Work-2"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
<script>
    function QueryCellEvent(args) {
        switch (args.data.TaskID) {
            case 1:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
            case 2:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
            case 3:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
            case 4:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
            case 5:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
            case 7:
                if ((args.column.field == 'work1') && (args.data.taskData.work1 == 'support')) {
                    args.colSpan = 2;
                }
                break;
        }
    }
</script>
```

---

## Responsive Columns

Hide columns on smaller screen widths using `hideAtMedia`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" width="50"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Job Name" width="250"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration" hideAtMedia="(min-width: 500px)"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

The column is automatically hidden when the viewport width matches the media query.

---

## WBS Column

Display a Work Breakdown Structure (WBS) code column — automatically generated hierarchy codes. Enable WBS with `enableWBS="true"` and `enableAutoWbsUpdate="true"` on `<ejs-gantt>`, then add `WBSCode` and `WBSPredecessor` columns. Use a flat (parent-ID) data binding with `parentID` in task fields:

```cshtml
<ejs-gantt id="GanttChart" dataSource="@GanttData.WBSData()" allowSorting="true" enableContextMenu="true" enableWBS="true" enableAutoWbsUpdate="true" allowPdfExport="true" allowSelection="true" allowFiltering="true" allowUnscheduledTasks="true" highlightWeekends="true" gridLines="Both" height="550px" treeColumnIndex="2" projectStartDate="03/31/2024" projectEndDate="05/30/2024" rowHeight="40" taskbarHeight="20" toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })">
    <e-gantt-selectionsettings mode="Row" type="Single" enableToggle="false"></e-gantt-selectionsettings>
    <e-gantt-splittersettings columnIndex="4"></e-gantt-splittersettings>
    <e-gantt-timelinesettings>
        <e-timelinesettings-toptier unit="Week" format="dd/MM/yyyy"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Day" count="1"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true" allowTaskbarEditing="true" showDeleteConfirmDialog="true"></e-gantt-editsettings>
    <e-gantt-filtersettings type="Menu"></e-gantt-filtersettings>
    <e-gantt-tooltipsettings showTooltip="true"></e-gantt-tooltipsettings>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" duration="Duration" progress="Progress" dependency="Predecessor" parentID="ParentID"></e-gantt-taskfields>
    <e-gantt-labelsettings taskLabel="${Progress}%"></e-gantt-labelsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" headerText="Task ID" visible="false"></e-gantt-column>
        <e-gantt-column field="WBSCode" headerText="WBS Code" width="150px"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="260px"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date" width="140px"></e-gantt-column>
        <e-gantt-column field="WBSPredecessor" headerText="WBS Predecessor" width="190px"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration" allowEditing="false"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-eventmarkers>
        <e-gantt-eventmarker day="04/2/2024" label="Project Initiation"></e-gantt-eventmarker>
    </e-gantt-eventmarkers>
</ejs-gantt>
```

| Property | Description |
|---|---|
| Property | Description |
|---|---|
| `enableWBS` | Enables WBS code generation |
| `enableAutoWbsUpdate` | Automatically recalculates WBS codes when tasks are reordered via drag-and-drop |
| `WBSCode` | Auto-generated column field (e.g., `1`, `1.1`, `1.1.1`) |
| `WBSPredecessor` | Auto-generated column that shows predecessors using WBS codes instead of task IDs |

> WBS requires **flat (parent-ID) data binding** — use `parentID` in `<e-gantt-taskfields>` instead of `child`. There is no `<e-gantt-wbscodegenerationsettings>` tag; WBS is enabled via `enableWBS` and `enableAutoWbsUpdate` attributes on `<ejs-gantt>` directly.

### Managing WBS Code Updates

For better performance, control when WBS codes are updated using the `ActionBegin` and `DataBound` events. This is useful to enable auto-update only during specific actions (e.g., row drag-and-drop):

```cshtml
<ejs-gantt id="GanttChart" dataSource="@GanttData.WBSData()" allowSorting="true" enableContextMenu="true" enableWBS="true" enableAutoWbsUpdate="false" allowPdfExport="true" allowSelection="true" allowFiltering="true" allowUnscheduledTasks="true" highlightWeekends="true" gridLines="Both" height="550px" treeColumnIndex="2" dataBound="dataBound" actionBegin="actionBegin"  projectStartDate="03/31/2024" projectEndDate="05/30/2024" rowHeight="40" taskbarHeight="20" toolbar="@(new List<string>() { "Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll", "Indent", "Outdent" })">
    <e-gantt-selectionsettings mode="Row" type="Single" enableToggle="false"></e-gantt-selectionsettings>
    <e-gantt-splittersettings columnIndex="4"></e-gantt-splittersettings>
    <e-gantt-timelinesettings>
        <e-timelinesettings-toptier unit="Week" format="dd/MM/yyyy"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Day" count="1"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true" allowTaskbarEditing="true" showDeleteConfirmDialog="true"></e-gantt-editsettings>
    <e-gantt-filtersettings type="Menu"></e-gantt-filtersettings>
    <e-gantt-tooltipsettings showTooltip="true"></e-gantt-tooltipsettings>
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" duration="Duration" progress="Progress" dependency="Predecessor" parentID="ParentID"></e-gantt-taskfields>
    <e-gantt-labelsettings taskLabel="${Progress}%"></e-gantt-labelsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" headerText="Task ID" visible="false"></e-gantt-column>
        <e-gantt-column field="WBSCode" headerText="WBS Code" width="150px"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Task Name" width="260px"></e-gantt-column>
        <e-gantt-column field="StartDate" headerText="Start Date" width="140px"></e-gantt-column>
        <e-gantt-column field="WBSPredecessor" headerText="WBS Predecessor" width="190px"></e-gantt-column>
        <e-gantt-column field="Duration" headerText="Duration" allowEditing="false"></e-gantt-column>
        <e-gantt-column field="Progress" headerText="Progress"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-eventmarkers>
        <e-gantt-eventmarker day="04/2/2024" label="Project Initiation"></e-gantt-eventmarker>
    </e-gantt-eventmarkers>
</ejs-gantt>


<script>
    var isRowDropped = false;
    function actionBegin(args) {
    	if (args.requestType === "beforeDrop") {
            var ganttObj = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
            isRowDropped = true;
            ganttObj.enableAutoWbsUpdate = true;
        }            
    }
    function dataBound() {
    	if (this.isRowDropped) {
            var ganttObj = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
            ganttObj.enableAutoWbsUpdate = false;
            isRowDropped = false;
        }
    }
</script>
```

### WBS Limitations

- Editing the `WBSCode` and `WBSPredecessor` columns is **not supported**.
- **Load on demand** is not supported with the WBS feature.
- `WBSCode` and `WBSPredecessor` fields **cannot be mapped** directly from the data source.

---

## Column Menu

Show a context menu on column headers for sorting, filtering, and autofit. Set `showColumnMenu="true"` on `<ejs-gantt>`:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" showColumnMenu="true" allowFiltering="true" allowSorting="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

Default column menu items:

| Item | Description |
|------|-------------|
| `SortAscending` | Sort the column in ascending order |
| `SortDescending` | Sort the column in descending order |
| `AutoFit` | Auto-fit the current column width |
| `AutoFitAll` | Auto-fit all columns |
| `Filter` | Show the filter option based on `filterSettings.type` |

> To disable the column menu for a specific column, set `showColumnMenu="false"` on that `<e-gantt-column>`.

### Column Menu Events

| Event | Trigger |
|-------|---------|
| `columnMenuOpen` | Before the column menu opens |
| `columnMenuClick` | When the user clicks a column menu item |

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1"
           allowSorting="true" allowReordering="true" allowFiltering="true" columnMenuOpen="columnMenuOpen" showColumnMenu="true" columnMenuClick="columnMenuClick">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function columnMenuOpen() {
        alert('columnMenuOpen event is triggered')
    }
    function columnMenuClick() {
        alert('columnMenuClick event is triggered')
    }
</script>
```

### Custom Column Menu Items

Add custom items to the column menu via `columnMenuItems`. Handle click actions in the `columnMenuClick` event:

```cshtml
@{ List<object> columnMenuitems = new List<object>();
    columnMenuitems.Add(new { text = "Clear Sorting", id = "ganttclearsorting" });}
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1"
    allowSorting="true" allowReordering="true" allowFiltering="true" columnMenuItems="columnMenuitems" columnMenuClick="columnMenuClick" showColumnMenu="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function columnMenuClick(args) {
        if (args.item.id === 'ganttclearsorting') {
            this.clearSorting();
        }
    }
</script>
```

### Customize Menu Items Per Column

Hide specific menu items for particular columns using `columnMenuOpen` and the `columnMenuOpenEventArgs.hide` flag:

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.DataSource" height="550px" gridLines="Both" treeColumnIndex="1"
           allowSorting="true" allowReordering="true" allowFiltering="true" columnMenuOpen="columnMenuOpen" showColumnMenu="true">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress" dependency="Predecessor" child="SubTasks">
    </e-gantt-taskfields>
    <e-gantt-columns>
        <e-gantt-column field="TaskId"></e-gantt-column>
        <e-gantt-column field="TaskName" headerText="Name" width="250"></e-gantt-column>
        <e-gantt-column field="Progress"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="Duration"></e-gantt-column>
    </e-gantt-columns>
    <e-gantt-editsettings allowEditing="true"></e-gantt-editsettings>
</ejs-gantt>

<script>
    function columnMenuOpen(args) {
        for (let item of args.items) {
            if (item.text === 'Filter' && args.column.field === 'TaskName') {
                item.hide = true;
            } else {
                item.hide = false;
            }
        }
    }
</script>
```

---

## TreeColumnIndex

Control which column displays the expand/collapse tree icon (default is index 0 = first column):

```cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource" height="450px" treeColumnIndex="2">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate" endDate="EndDate" duration="Duration" progress="Progress" child="SubTasks">
    </e-gantt-taskfields>
</ejs-gantt>
```

> Setting `treeColumnIndex` controls which auto-generated column displays the expand/collapse icon.
