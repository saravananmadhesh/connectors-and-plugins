# Print and Export in Syncfusion ASP.NET MVC Sankey Chart

##  Table of Contents

- [Shared model and controller used by the examples](#shared-model-and-controller-used-by-the-examples)
  - [Model](#model)
  - [Controller](#controller)
- [Export Functionality Basics](#export-functionality-basics)
  - [Supported Export Formats](#supported-export-formats)
  - [Basic Sankey Setup for Export and Print](#basic-sankey-setup-for-export-and-print)
- [Export Formats](#export-formats)
  - [PNG Export](#png-export)
  - [JPEG Export](#jpeg-export)
  - [SVG Export](#svg-export)
  - [PDF Export](#pdf-export)
- [Export Implementation](#export-implementation)
  - [Basic Export Button](#basic-export-button)
  - [Export Multiple Formats](#export-multiple-formats)
  - [Export with Custom Filename](#export-with-custom-filename)
  - [Bulk Export](#bulk-export)
- [Print Functionality](#print-functionality)
  - [Basic Print](#basic-print)
  - [Print with a Toolbar](#print-with-a-toolbar)
  - [Print-Friendly Page Styling](#print-friendly-page-styling)
  - [Practical note about print preview](#practical-note-about-print-preview)
- [Export Events](#export-events)
  - [Before Export Event](#before-export-event)
  - [Export Completed Event](#export-completed-event)
  - [Before Print Event](#before-print-event)
  - [Export Validation Pattern](#export-validation-pattern)
- [Custom Export Settings](#custom-export-settings)
  - [Custom Filename with Metadata](#custom-filename-with-metadata)
  - [Export with Temporary Background](#export-with-temporary-background)
  - [Export After Temporary Resize](#export-after-temporary-resize)
  - [Export with Current Title](#export-with-current-title)
  - [Practical note about watermarking and manual image composition](#practical-note-about-watermarking-and-manual-image-composition)
- [Complete Export and Print Example](#complete-export-and-print-example)
- [Common Export Patterns](#common-export-patterns)
  - [Pattern 1: Export Toolbar](#pattern-1-export-toolbar)
  - [Pattern 2: Export with User-Selected Format and File Name](#pattern-2-export-with-user-selected-format-and-file-name)
  - [Pattern 3: Batch Export](#pattern-3-batch-export)
  - [Pattern 4: Print and PDF Pairing](#pattern-4-print-and-pdf-pairing)
  - [Pattern 5: Export After Layout Change](#pattern-5-export-after-layout-change)
  - [Pattern 6: PDF-Oriented Reporting Export](#pattern-6-pdf-oriented-reporting-export)
- [Best Practices](#best-practices)
- [Future reference](#future-reference)

## Shared model and controller used by the examples

### Model

```csharp
using System.Collections.Generic;
using Syncfusion.EJ2.Charts;

namespace WebApplication1.Models
{
    public class SankeyPrintExportViewModel
    {
        public List<SankeyNode> SankeyNodes { get; set; }
        public List<SankeyLink> SankeyLinks { get; set; }
    }
}
```

### Controller

```csharp
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class SankeyController : Controller
    {
        public ActionResult PrintExport()
        {
            var model = new SankeyPrintExportViewModel
            {
                SankeyNodes = new List<SankeyNode>
                {
                    new SankeyNode { Id = "Product A", Color = "#FF6B6B", Label = new SankeyChartDataLabel { Text = "Product A" } },
                    new SankeyNode { Id = "Product B", Color = "#4ECDC4", Label = new SankeyChartDataLabel { Text = "Product B" } },
                    new SankeyNode { Id = "Online Sales", Color = "#95E1D3", Label = new SankeyChartDataLabel { Text = "Online Sales" } },
                    new SankeyNode { Id = "Retail Sales", Color = "#A78BFA", Label = new SankeyChartDataLabel { Text = "Retail Sales" } },
                    new SankeyNode { Id = "Revenue", Color = "#60A5FA", Label = new SankeyChartDataLabel { Text = "Revenue" } }
                },
                SankeyLinks = new List<SankeyLink>
                {
                    new SankeyLink { SourceId = "Product A", TargetId = "Online Sales", Value = 520 },
                    new SankeyLink { SourceId = "Product B", TargetId = "Retail Sales", Value = 410 },
                    new SankeyLink { SourceId = "Online Sales", TargetId = "Revenue", Value = 520 },
                    new SankeyLink { SourceId = "Retail Sales", TargetId = "Revenue", Value = 410 }
                }
            };

            return View(model);
        }
    }
}
```

---

## Table of Contents
- #export-functionality-basics
- #export-formats
- #export-implementation
- #print-functionality
- #export-events
- #custom-export-settings
- #common-export-patterns
- #best-practices
- #future-reference

---

## Export Functionality Basics

Export functionality allows users to save the Sankey chart in different file formats for sharing, reporting, or archiving.

### Supported Export Formats

The Sankey instance supports exporting to:

1. `PNG`
2. `JPEG`
3. `SVG`
4. `PDF`

### Basic Sankey Setup for Export and Print

The helper itself is configured as usual, and export or print is triggered through JavaScript on the rendered Sankey instance.

```cshtml
@model WebApplication1.Models.SankeyPrintExportViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").Tooltip(
        t => t.Enable(true)
    ).LegendSettings(
        l => l.Visible(true)
    ).BeforeExport("onBeforeExport").ExportCompleted("onExportCompleted").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Export Formats

### PNG Export

PNG is suitable for web usage and clear raster output.

```html
<script>
    function exportPNG() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.export("PNG", "sankey-chart");
    }
</script>
```

### JPEG Export

JPEG can be useful when smaller raster file size is preferred.

```html
<script>
    function exportJPEG() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.export("JPEG", "sankey-chart");
    }
</script>
```

### SVG Export

SVG is useful for scalable vector output.

```html
<script>
    function exportSVG() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.export("SVG", "sankey-chart");
    }
</script>
```

### PDF Export

PDF is useful for report-ready document output.

```html
<script>
    function exportPDF() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.export("PDF", "sankey-chart");
    }
</script>
```

---

## Export Implementation

### Basic Export Button

```cshtml
<button type="button" onclick="exportPNG()">Export as PNG</button>

<script>
    function getSankeyInstance() {
        var sankeyElement = document.getElementById("sankey");
        return sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;
    }

    function exportPNG() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.export("PNG", "sankey-chart");
    }
</script>
```

### Export Multiple Formats

```cshtml
<div class="toolbar-row">
    <button type="button" onclick="exportAsFormat('PNG')">Export as PNG</button>
    <button type="button" onclick="exportAsFormat('JPEG')">Export as JPEG</button>
    <button type="button" onclick="exportAsFormat('SVG')">Export as SVG</button>
    <button type="button" onclick="exportAsFormat('PDF')">Export as PDF</button>
</div>

<script>
    function exportAsFormat(format) {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var filename = "sankey-" + new Date().getTime();
        sankeyInstance.export(format, filename);
    }
</script>
```

### Export with Custom Filename

```html
<script>
    function exportWithCustomName(format) {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var filename = prompt("Enter filename:", "sales-flow");

        if (filename) {
            sankeyInstance.export(format, filename);
        }
    }
</script>
```

### Bulk Export

```html
<script>
    function exportAllFormats() {
        var formats = ["PNG", "JPEG", "SVG", "PDF"];
        var index = 0;

        function exportNext() {
            if (index >= formats.length) {
                return;
            }

            var sankeyInstance = getSankeyInstance();

            if (!sankeyInstance) {
                return;
            }

            var format = formats[index];
            var filename = "sankey-" + new Date().getTime() + "-" + format.toLowerCase();

            sankeyInstance.export(format, filename);
            index++;

            setTimeout(exportNext, 600);
        }

        exportNext();
    }
</script>
```

---

## Print Functionality

### Basic Print

```cshtml
<button type="button" onclick="printChart()">Print Chart</button>

<script>
    function printChart() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.print();
    }
</script>
```

### Print with a Toolbar

```cshtml
<div class="toolbar-row">
    <button type="button" onclick="printChart()">Print</button>
    <button type="button" onclick="exportAsFormat('PDF')">Export PDF</button>
    <button type="button" onclick="exportAsFormat('SVG')">Export SVG</button>
</div>
```

### Print-Friendly Page Styling

```html
<style media="print">
    .no-print {
        display: none !important;
    }

    #sankey {
        width: 100% !important;
        height: auto !important;
    }

    @page {
        margin: 1cm;
    }
</style>
```

```cshtml
<div class="no-print toolbar-row">
    <button type="button" onclick="printChart()">Print</button>
</div>
```

### Practical note about print preview

The built-in Sankey print flow is handled through the `print()` instance method. If a custom preview window is needed, that falls outside the standard Sankey MVC helper surface and is better treated as separate custom page logic.

---

## Export Events

### Before Export Event

Use `BeforeExport` to inspect or adjust export arguments before the export starts.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").BeforeExport("onBeforeExport").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onBeforeExport(args) {
        if (!args) {
            return;
        }

        if (args.fileName) {
            args.fileName = args.fileName + "-" + new Date().getTime();
        }
    }
</script>
```

### Export Completed Event

Use `ExportCompleted` to run post-export logic.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").ExportCompleted("onExportCompleted").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onExportCompleted(args) {
        if (!args) {
            return;
        }

        showNotification("Chart export completed.");
    }

    function showNotification(message) {
        alert(message);
    }
</script>
```

### Before Print Event

Use `BeforePrint` to inspect or adjust state before print starts.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onBeforePrint(args) {
        if (!args) {
            return;
        }

        console.log("Print is starting.");
    }
</script>
```

### Export Validation Pattern

```html
<script>
    function onBeforeExport(args) {
        if (!args) {
            return;
        }

        try {
            if (!args.fileName || !args.fileName.trim()) {
                args.cancel = true;
                alert("Please provide a valid export file name.");
            }
        } catch (e) {
            args.cancel = true;
            alert("Export could not be started.");
        }
    }
</script>
```

---

## Custom Export Settings

### Custom Filename with Metadata

```html
<script>
    function exportWithMetadata(format) {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var period = "Q4-2024";
        var filename = "sankey_" + period + "_" + new Date().getTime();

        sankeyInstance.export(format, filename);
    }
</script>
```

### Export with Temporary Background

You can temporarily update the Sankey background, export, and then restore it.

```html
<script>
    function exportWithBackground(format) {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var originalBackground = sankeyInstance.background;
        sankeyInstance.background = "#FFFFFF";
        sankeyInstance.export(format, "sankey-with-background");
        sankeyInstance.background = originalBackground;
    }
</script>
```

### Export After Temporary Resize

For alternate export dimensions, temporarily resize, refresh, export, then restore.

```html
<script>
    function exportLargePNG() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var originalWidth = sankeyInstance.width;
        var originalHeight = sankeyInstance.height;

        sankeyInstance.width = "1200px";
        sankeyInstance.height = "800px";
        sankeyInstance.refresh();

        setTimeout(function () {
            sankeyInstance.export("PNG", "sankey-large");

            sankeyInstance.width = originalWidth;
            sankeyInstance.height = originalHeight;
            sankeyInstance.refresh();
        }, 500);
    }
</script>
```

### Export with Current Title

Since the Sankey helper already supports `Title(...)` and `SubTitle(...)`, the cleanest export path is usually to set the title on the chart itself before exporting rather than manually drawing an image composition.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").SubTitle("Q4 Overview").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Practical note about watermarking and manual image composition

Watermarking, manual canvas composition, or building a custom print preview are outside the standard Sankey MVC helper export surface. For actual Sankey export support, the stable built-in path remains:

- `export(...)`
- `print()`

If you need advanced post-processing, that is better handled as a separate custom image or SVG workflow rather than as a built-in Sankey export feature.

---
## Complete Export and Print Example
```cshtml

@model WebApplication1.Models.SankeyAccessibilityViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div style="margin-bottom:12px; display:flex; flex-wrap:wrap; gap:10px; align-items:center;">
    <label for="exportFormat">Format:</label>
    <select id="exportFormat" style="padding:4px 6px;">
        <option value="PNG">PNG</option>
        <option value="JPEG">JPEG</option>
        <option value="SVG">SVG</option>
        <option value="PDF">PDF</option>
    </select>

    <label for="exportFileName">File Name:</label>
    <input type="text" id="exportFileName" value="sankey-chart" style="padding:4px 6px;" />

    <label for="exportMetadata">Metadata:</label>
    <input type="text" id="exportMetadata" value="Q4-2024" style="padding:4px 6px;" />

    <label for="exportBackground">Background:</label>
    <input type="color" id="exportBackground" value="#ffffff" style="width:48px; height:32px; padding:2px;" />

    <label for="useMetadata">
        <input type="checkbox" id="useMetadata" checked />
        Add metadata
    </label>

    <label for="useBackground">
        <input type="checkbox" id="useBackground" checked />
        Apply export background
    </label>

    <button type="button" onclick="exportSelected()">Export</button>
    <button type="button" onclick="exportLargeSelected()">Export Large</button>
    <button type="button" onclick="printSankey()">Print</button>
</div>

@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Orientation(
        Model.Orientation
    ).Title("Sales Flow Analysis").Tooltip(
        t => t.Enable(true)
    ).LegendSettings(
        l => l.Visible(true)
    ).BeforeExport("onBeforeExport").ExportCompleted("onExportCompleted").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    var pendingExportState = null;

    function getSankeyInstance() {
        var sankeyElement = document.getElementById("sankey");
        return sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;
    }

    function getExportFormat() {
        var element = document.getElementById("exportFormat");
        return element ? element.value : "PNG";
    }

    function getExportFileName() {
        var element = document.getElementById("exportFileName");
        var fileName = element ? element.value.trim() : "";

        return fileName || "sankey-chart";
    }

    function getExportMetadata() {
        var element = document.getElementById("exportMetadata");
        return element ? element.value.trim() : "";
    }

    function getExportBackground() {
        var element = document.getElementById("exportBackground");
        return element ? element.value : "#ffffff";
    }

    function shouldUseMetadata() {
        var element = document.getElementById("useMetadata");
        return element ? element.checked : false;
    }

    function shouldUseBackground() {
        var element = document.getElementById("useBackground");
        return element ? element.checked : false;
    }

    function buildExportFileName() {
        var fileName = getExportFileName();
        var metadata = getExportMetadata();

        if (shouldUseMetadata() && metadata) {
            return fileName + "_" + metadata;
        }

        return fileName;
    }

    function exportSelected() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var format = getExportFormat();
        var fileName = buildExportFileName();

        pendingExportState = {
            originalBackground: sankeyInstance.background,
            originalWidth: sankeyInstance.width,
            originalHeight: sankeyInstance.height
        };

        if (shouldUseBackground()) {
            sankeyInstance.background = getExportBackground();
        }

        sankeyInstance.refresh();

        setTimeout(function () {
            sankeyInstance.export(format, fileName);
        }, 1500);
    }

    function exportLargeSelected() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var format = getExportFormat();
        var fileName = buildExportFileName();

        pendingExportState = {
            originalBackground: sankeyInstance.background,
            originalWidth: sankeyInstance.width,
            originalHeight: sankeyInstance.height
        };

        sankeyInstance.width = "1200px";
        sankeyInstance.height = "800px";

        if (shouldUseBackground()) {
            sankeyInstance.background = getExportBackground();
        }

        sankeyInstance.refresh();

        setTimeout(function () {
            sankeyInstance.export(format, fileName);
        }, 500);
    }

    function printSankey() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.print();
    }

    function onBeforeExport(args) {
        if (!args) {
            return;
        }

        console.log("Before export:", args);
    }

    function onExportCompleted(args) {
        console.log("Export completed:", args);

        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance || !pendingExportState) {
            return;
        }

        sankeyInstance.width = pendingExportState.originalWidth;
        sankeyInstance.height = pendingExportState.originalHeight;
        sankeyInstance.background = pendingExportState.originalBackground;

        pendingExportState = null;
        sankeyInstance.refresh();
    }

    function onBeforePrint(args) {
        console.log("Before print:", args);
    }
</script>
```

---

## Common Export Patterns

### Pattern 1: Export Toolbar

```cshtml
@model WebApplication1.Models.SankeyPrintExportViewModel
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

<div class="toolbar-row no-print">
    <button type="button" onclick="exportAsFormat('PNG')">PNG</button>
    <button type="button" onclick="exportAsFormat('PDF')">PDF</button>
    <button type="button" onclick="exportAsFormat('SVG')">SVG</button>
    <button type="button" onclick="printChart()">Print</button>
</div>

<div class="control-section">
    @Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Sales Flow Analysis").Tooltip(
            t => t.Enable(true)
        ).LegendSettings(
            l => l.Visible(true)
        ).BeforeExport("onBeforeExport").ExportCompleted("onExportCompleted").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
</div>

<script>
    function getSankeyInstance() {
        var sankeyElement = document.getElementById("sankey");
        return sankeyElement && sankeyElement.ej2_instances ? sankeyElement.ej2_instances[0] : null;
    }

    function exportAsFormat(format) {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var filename = "sankey-" + new Date().getTime();
        sankeyInstance.export(format, filename);
    }

    function printChart() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.print();
    }

    function onBeforeExport(args) {
        if (!args) {
            return;
        }

        if (args.fileName) {
            args.fileName = args.fileName + "-export";
        }
    }

    function onExportCompleted(args) {
        if (!args) {
            return;
        }

        console.log("Export completed.");
    }

    function onBeforePrint(args) {
        if (!args) {
            return;
        }

        console.log("Print started.");
    }
</script>

<style>
    .toolbar-row {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
    }

    .toolbar-row button {
        padding: 8px 12px;
        cursor: pointer;
    }

    .control-section {
        margin-top: 10px;
    }
</style>
```

### Pattern 2: Export with User-Selected Format and File Name

```html
<script>
    function exportSelected() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        var format = document.getElementById("exportFormat").value;
        var filename = document.getElementById("exportFileName").value || "sankey-chart";

        sankeyInstance.export(format, filename);
    }
</script>
```

```cshtml
<div class="toolbar-row no-print">
    <select id="exportFormat">
        <option value="PNG">PNG</option>
        <option value="JPEG">JPEG</option>
        <option value="SVG">SVG</option>
        <option value="PDF">PDF</option>
    </select>

    <input type="text" id="exportFileName" value="sankey-chart" />

    <button type="button" onclick="exportSelected()">Export</button>
</div>
```

### Pattern 3: Batch Export

```html
<script>
    function exportCommonFormats() {
        var formats = ["PNG", "PDF", "SVG"];
        var index = 0;

        function nextExport() {
            if (index >= formats.length) {
                return;
            }

            var sankeyInstance = getSankeyInstance();

            if (!sankeyInstance) {
                return;
            }

            var format = formats[index];
            sankeyInstance.export(format, "sankey-" + format.toLowerCase());
            index++;

            setTimeout(nextExport, 600);
        }

        nextExport();
    }
</script>
```

### Pattern 4: Print and PDF Pairing

A very common workflow is to offer both print and PDF side by side.

```cshtml
<div class="toolbar-row no-print">
    <button type="button" onclick="printChart()">Print</button>
    <button type="button" onclick="exportAsFormat('PDF')">Export PDF</button>
</div>
```

### Pattern 5: Export After Layout Change

If the user changes Sankey size or orientation, refresh first and export after the updated layout is applied.

```html
<script>
    function exportAfterHorizontalLayout() {
        var sankeyInstance = getSankeyInstance();

        if (!sankeyInstance) {
            return;
        }

        sankeyInstance.orientation = "Horizontal";
        sankeyInstance.refresh();

        setTimeout(function () {
            sankeyInstance.export("PNG", "sankey-horizontal");
        }, 1500);
    }
</script>
```

### Pattern 6: PDF-Oriented Reporting Export

For reporting screens, keep the chart title, legend, and a clean background in place before exporting to PDF.

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Executive Flow Summary").SubTitle("Prepared for reporting").Background("#FFFFFF").LegendSettings(
        l => l.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Best Practices

1. **Provide multiple export formats** so users can choose the output that fits their workflow.
2. **Use clear file names** and consider adding a timestamp for easy identification.
3. **Use the built-in Sankey methods** `export(...)` and `print()` as the primary implementation path.
4. **Refresh before exporting** if you have just changed chart size, orientation, or other layout-sensitive properties.
5. **Keep the toolbar outside print output** by using a `no-print` CSS class.
6. **Handle export events gracefully** with `BeforeExport`, `ExportCompleted`, and `BeforePrint`.
7. **Prefer chart-level titles and subtitles** rather than trying to manually compose title graphics before export.
8. **Use plain and stable client-side logic** when building custom export buttons.

---

## Future reference

- Use `.Nodes(...)` and `.Links(...)` instead of `.DataSource(...)`, `.From(...)`, `.To(...)`, and `.Weight(...)`.
- Use client-side `sankeyInstance.export("PNG" | "JPEG" | "SVG" | "PDF", fileName)` for export.
- Use client-side `sankeyInstance.print()` for printing.
- Do not rely on unsupported Sankey helper patterns such as `.ExportType(...)` or `.PrintSettings(...)` for this component.
- Use `.BeforeExport("...")`, `.ExportCompleted("...")`, and `.BeforePrint("...")` on the main Sankey helper chain when event hooks are needed.
- Keep the helper chain continuous in MVC, for example:
  `@Html.EJS().Sankey("sankey").Width("100%").Height("500px").BeforeExport("onBeforeExport").ExportCompleted("onExportCompleted").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()`