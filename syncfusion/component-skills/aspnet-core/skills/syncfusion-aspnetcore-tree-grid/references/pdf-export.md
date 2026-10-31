# PDF Export — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Enabling PDF Export](#enabling-pdf-export)
- [PDF Export via Toolbar](#pdf-export-via-toolbar)
- [External Button PDF Export](#external-button-pdf-export)
- [PDF Export Options](#pdf-export-options)
- [Persist Collapsed State](#persist-collapsed-state)
- [Adding Headers and Footers](#adding-headers-and-footers)
- [PDF Cell Style Customization](#pdf-cell-style-customization)
- [Custom Aggregates in Export](#custom-aggregates-in-export)
- [Landscape and Page Orientation](#landscape-and-page-orientation)
- [Server-Side PDF Export](#server-side-pdf-export)
- [Limitations](#limitations)

---

## When to Use This Skill

Use this reference when you need to:
- Users need to download TreeGrid data as PDF documents
- Create printable PDF reports from hierarchical data
- Preserve column widths and formatting in PDF output
- Export selected rows or filtered data
- Add custom headers, footers, and styling to PDF
- Configure page orientation (Portrait/Landscape)
- Customize cell colors and fonts in exported PDF
- Persist expanded/collapsed hierarchy state in export

---

## Overview

PDF export functionality allows TreeGrid data to be exported to PDF format. Supports custom styling, headers/footers, column visibility control, and hierarchical data preservation.

---

## Enabling PDF Export

Enable PDF export by setting `allowPdfExport="true"` on TreeGrid:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              allowPdfExport="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## PDF Export via Toolbar

Add **PdfExport** to the toolbar for one-click PDF download:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              allowPdfExport="true"
              toolbar="@(new List<string>() {"PdfExport"})">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Clicking the toolbar button automatically triggers PDF export with the filename `TreeGrid.pdf`.

---

## External Button PDF Export

Trigger PDF export programmatically from an external button:

```cshtml
<!-- Export Button -->
<button onclick="exportPdf()">Download PDF</button>

<!-- TreeGrid -->
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              allowPdfExport="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function exportPdf() {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        treeGridInstance.pdfExport();
    }
</script>
```

---

## PDF Export Options

Customize PDF export behavior with `pdfExportProperties`:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              allowPdfExport="true"
              toolbar="@(new List<string>() {"PdfExport"})"
              toolbarClick="toolbarClickHandler">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function toolbarClickHandler(args) {
        if (args.item.id === 'TreeGrid_pdfexport') {
            const pdfExportProperties = {
                fileName: 'TaskReport.pdf',
                pageOrientation: 'Landscape',
                pageSize: 'A4',
                isCollapsedStatePersist: true,
                dataSource: undefined  // Export entire data
            };
            document.getElementById('TreeGrid').ej2_instances[0].pdfExport(pdfExportProperties);
        }
    }
</script>
```

### Available Options:

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | string | Output PDF filename (without extension) |
| `pageOrientation` | string | `'Portrait'` (default) or `'Landscape'` |
| `pageSize` | string | `'A4'` (default), `'A3'`, `'A5'`, `'Letter'`, `'Note'`, etc. |
| `isCollapsedStatePersist` | boolean | Preserve collapsed state of parent rows |
| `dataSource` | array | Custom data to export (optional) |
| `theme` | object | Theme styling for PDF output |

---

## Persist Collapsed State

Preserve the collapsed/expanded state of hierarchical rows in the PDF:

```javascript
function exportPdf() {
    const pdfExportProperties = {
        fileName: 'TreeGrid.pdf',
        isCollapsedStatePersist: true  // Maintain current expand/collapse state
    };
    document.getElementById('TreeGrid').ej2_instances[0].pdfExport(pdfExportProperties);
}
```

**When enabled:**
- Rows collapsed at export time stay collapsed in PDF
- Rows expanded at export time stay expanded in PDF
- Improves clarity of hierarchical data in static PDF format

---

## Adding Headers and Footers

Add custom headers and footers to PDF exports:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPdfExport="true"
              toolbarClick="toolbarClickHandler">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function toolbarClickHandler(args) {
        if (args.item.id === 'TreeGrid_pdfexport') {
            const pdfExportProperties = {
                fileName: 'TaskReport.pdf',
                format: {
                    // Custom header
                    header: {
                        headerRows: 2,
                        rows: [
                            {
                                cells: [{
                                    colSpan: 3,
                                    value: 'Project Task Report',
                                    style: { fontSize: 20, bold: true, alignment: 'Center' }
                                }]
                            },
                            {
                                cells: [{
                                    colSpan: 3,
                                    value: 'Generated: ' + new Date().toDateString(),
                                    style: { fontSize: 10, italic: true }
                                }]
                            }
                        ]
                    },
                    // Custom footer
                    footer: {
                        footerRows: 1,
                        rows: [
                            {
                                cells: [{
                                    colSpan: 3,
                                    value: 'Confidential - Internal Use Only',
                                    style: { fontSize: 10, italic: true, hAlign: 'Center' }
                                }]
                            }
                        ]
                    }
                }
            };
            document.getElementById('TreeGrid').ej2_instances[0].pdfExport(pdfExportProperties);
        }
    }
</script>
```

### Header/Footer Style Properties:

| Property | Options | Example |
|----------|---------|---------|
| `bold` | true/false | `bold: true` — Bold text |
| `italic` | true/false | `italic: true` — Italic text |
| `fontSize` | number | `fontSize: 14` — Font size in points |
| `alignment` | 'Left', 'Center', 'Right' | `alignment: 'Center'` |
| `hAlign` | 'Left', 'Center', 'Right' | `hAlign: 'Right'` — Horizontal alignment |

---

## PDF Cell Style Customization

Use the `pdfQueryCellInfo` event to customize cell styles before export:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPdfExport="true"
              pdfQueryCellInfo="onPdfQueryCellInfo">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onPdfQueryCellInfo(args) {
        // Highlight high priority tasks in red
        if (args.column.field === 'Priority' && args.value === 'High') {
            args.style = {
                textBrushColor: '#FF0000',  // Red text
                bold: true
            };
        }
        
        // Highlight medium priority in orange
        if (args.column.field === 'Priority' && args.value === 'Medium') {
            args.style = {
                textBrushColor: '#FFA500'  // Orange text
            };
        }
    }
</script>
```

### Available Style Properties:

| Property | Description | Example |
|----------|-------------|---------|
| `textBrushColor` | Cell text color (hex) | `'#FF0000'` — Red |
| `backgroundColor` | Cell background color (hex) | `'#FFFF00'` — Yellow |
| `bold` | Bold text | `true` or `false` |
| `italic` | Italic text | `true` or `false` |
| `fontSize` | Font size in points | `12` |

---

## Custom Aggregates in Export

Customize aggregate display values in exported PDF using `pdfAggregateQueryCellInfo`:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPdfExport="true"
              pdfAggregateQueryCellInfo="onPdfAggregateCell">
    <e-treegrid-aggregates>
        <e-treegrid-aggregate>
            <e-summaryrows>
                <e-summaryrow>
                    <e-summarycells>
                        <e-summarycell type="Sum" field="Duration"></e-summarycell>
                    </e-summarycells>
                </e-summaryrow>
            </e-summaryrows>
        </e-treegrid-aggregate>
    </e-treegrid-aggregates>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onPdfAggregateCell(args) {
        // Customize aggregate summary display
        if (args.column.field === 'Duration') {
            args.value = 'Total Hours: ' + args.value;  // Prefix with "Total Hours:"
            args.style = { bold: true };
        }
    }
</script>
```

---

## Landscape and Page Orientation

Export PDF in Landscape orientation for wider content:

```javascript
function exportLandscapePdf() {
    const pdfExportProperties = {
        fileName: 'WideTasks.pdf',
        pageOrientation: 'Landscape',  // Landscape mode
        pageSize: 'A4'
    };
    document.getElementById('TreeGrid').ej2_instances[0].pdfExport(pdfExportProperties);
}
```

### Page Orientation:

| Value | Dimensions | Best For |
|-------|-----------|----------|
| `'Portrait'` (default) | 210 x 297 mm | Standard documents |
| `'Landscape'` | 297 x 210 mm | Wide tables, many columns |

### Page Sizes:

| Size | Dimensions |
|------|-----------|
| `'A3'` | 297 x 420 mm |
| `'A4'` (default) | 210 x 297 mm |
| `'A5'` | 148 x 210 mm |
| `'Letter'` | 216 x 279 mm |
| `'Note'` | 216 x 279 mm |

---

## Server-Side PDF Export

Handle PDF export on the server for advanced processing:

**`Index.cshtml` — Client-side trigger:**
```cshtml
<button onclick="serverExport()">Download PDF (Server)</button>

<script>
    function serverExport() {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        treeGridInstance.serverPdfExport('/api/treegrid/pdfexport');
    }
</script>
```

**`TreeGridController.cs` — Server-side handling:**
```csharp
using Syncfusion.EJ2.TreeGrid;

[HttpPost]
public IActionResult PdfExport([FromBody] string gridModel)
{
    TreeGridExcelExportProperties exportProperties = new TreeGridExcelExportProperties();
    TreeGridPdfExportProperties pdfExportProperties = new TreeGridPdfExportProperties();
    
    // Set custom filename
    pdfExportProperties.FileName = "TreeGrid_Report.pdf";
    
    // Fetch TreeGrid data
    var data = GetTreeGridData();  // Your data retrieval method
    
    // Perform server-side export
    TreeGridExcelExport excelExport = new TreeGridExcelExport();
    return excelExport.PdfExport<TaskModel>(pdfExportProperties, data);
}

private List<TaskModel> GetTreeGridData()
{
    // Fetch data from database or service
    return _taskService.GetAllTasks();
}
```

---

## Limitations

- ❌ Cannot set column-specific page breaks
- ❌ Complex merged cells may not render correctly
- ❌ Tree grid images/custom HTML in cells not directly embedded
- ❌ Very large datasets (10000+ rows) may cause performance issues
- ❌ Advanced styling (gradients, complex borders) not fully supported
- ❌ Row templates convert to plain text in PDF

---

## Best Practices

1. **Use Landscape for Wide Data** — More than 5-6 columns benefit from landscape orientation
2. **Persist Expanded/Collapsed State** — Helps readers understand hierarchical relationships
3. **Add Headers and Footers** — Provides context and metadata for reports
4. **Test Style Output** — Verify color/font styling renders correctly in PDF viewer
5. **Use Server-Side Export** — For large datasets or complex post-processing
6. **Provide Meaningful Filenames** — Include date or report ID: `TaskReport_2026_03_27.pdf`
7. **Validate Data Before Export** — Ensure no missing columns or critical data

---

## Related Topics

- **Excel Export** — Alternative format for tabular data
- **Print** — Browser-based printing vs. PDF export
- **Export Options** — Shared options for all export formats
- **Editing** — When to lock editing before PDF export
