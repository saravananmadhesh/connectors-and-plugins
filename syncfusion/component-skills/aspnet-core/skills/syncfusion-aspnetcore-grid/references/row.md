# Row Features — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Row Template](#row-template)
- [Detail Template](#detail-template)
- [Row Drag and Drop](#row-drag-and-drop)
- [Row Spanning](#row-spanning)
- [Row Pinning (Sticky Rows)](#row-pinning-sticky-rows)
- [Row Height](#row-height)

## When to Use This

- Customize row appearance and layout
- Create row detail templates
- Implement row drag and drop
- Span rows across columns
- Pin or sticky rows to top

---

## Row Template

Replace the default row rendering with a custom HTML template using `rowTemplate`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.EmployeeDataSource" height="335" width="auto" rowTemplate="#rowtemplate">
    <e-grid-columns>
        <e-grid-column headerText="Employee Image" width="150" textAlign="Center" field= 'OrderID'> </e-grid-column>
        <e-grid-column headerText="Employee Details" width="300" field="EmployeeID" textAlign="Left"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script id="rowtemplate" type="text/x-template">
    <tr>
        <td class="photo">
            <img src="/images/${EmployeeID}.png" alt="${EmployeeID}" />
        </td>
        <td class="details">
            <table class="cardtable" cellpadding="3" cellspacing="2">
                <colgroup>
                    <col width="50%">
                    <col width="50%">
                </colgroup>
                <tbody>
                    <tr>
                        <td class="cardheader">First Name </td>
                        <td>${FirstName} </td>
                    </tr>
                    <tr>
                        <td class="cardheader">Last Name</td>
                        <td>${LastName} </td>
                    </tr>
                    <tr>
                        <td class="cardheader">Title</td>
                        <td>${Title}</td>
                    </tr>
                </tbody>
            </table>
        </td>
     </tr>
</script>
```

The template receives the row's data object. Access fields with `${OrderID}`, `${CustomerID}`, etc. (using template literals in the script template).

> When using `rowTemplate`, built-in features like sorting, filtering, and editing work only when explicitly handled.

---

## Detail Template

Show expandable child content below each row using `detailTemplate`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.EmployeeDataSource" detailTemplate="#detailtemplate" width='auto'> 
    <e-grid-columns> 
        <e-grid-column field="FirstName" headerText="First Name" width="140"></e-grid-column> 
        <e-grid-column field="LastName" headerText="Last Name" width="140"></e-grid-column>
    </e-grid-columns> 
</ejs-grid>

<script type="text/x-template" id="detailtemplate">
    <table class="detailtable" width="100%">
        <colgroup>
            <col width="35%" />
            <col width="35%" />
        </colgroup>
        <tbody>
            <tr>
                <td rowspan="4" style="text-align: center;">
                    <img class='photo' src="images/${EmployeeID}.png" alt="${EmployeeID}" />
                </td>
                <td>
                    <span style="font-weight: 500;">First Name: </span> ${FirstName}
                </td>
                <td>
                    <span style="font-weight: 500;">Postal Code: </span> ${PostalCode}
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-weight: 500;">Last Name: </span> ${LastName}
                </td>
                <td>
                    <span style="font-weight: 500;">City: </span> ${City}
                </td>
            </tr>
        </tbody>
    </table>
</script>
```

The detail template receives the row data. Use it to render nested grids, charts, or custom HTML per row.

Control expand/collapse programmatically:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.detailRowModule.expand(2);   // expand row at index 2
grid.detailRowModule.collapse(2); // collapse row at index 2
grid.detailRowModule.expandAll();
grid.detailRowModule.collapseAll();
```

---

## Row Drag and Drop

Allow users to reorder rows by dragging. Enable with `allowRowDragAndDrop="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowRowDragAndDrop="true">
    <e-grid-rowdropsettings targetID="DestGrid"></e-grid-rowdropsettings>
    <e-grid-selectionsettings type="Multiple"></e-grid-selectionsettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

To drag rows between two grids, set `targetID` to the destination grid's ID. Listen to `rowDrop` event to handle the result.

---

## Row Spanning

Merge cells vertically across rows using `queryCellInfo` event:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" queryCellInfo="queryCellEvent" gridLines="Both" allowTextWrap="true" width= 'auto',>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

```javascript
function queryCellInfo(args) {
    // Example: span first column for rows 0-2
    if (args.column.field === 'City') {
        args.rowSpan = 2;
    }
}
```

---

## Row Pinning (Sticky Rows)

Pin specific rows to the top of the grid so they remain visible while scrolling. Use `frozenRows` or configure via `<e-grid-editSettings>` `frozenRows`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" frozenRows="2" height="400">
```

---

## Row Height

Set a uniform row height:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" rowHeight="60">
```

Or set per-row using `rowDataBound` event:
```javascript
function rowDataBound(args) {
    if (args.data.Freight > 100) {
        args.row.style.height = '80px';
    }
}
```
