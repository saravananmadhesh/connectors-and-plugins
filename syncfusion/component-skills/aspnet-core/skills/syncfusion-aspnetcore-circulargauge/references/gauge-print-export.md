# Print and Export Functionality in Circular Gauge

## Table of Contents

- [Print Overview](#print-overview)
- [Implementing Print](#implementing-print)
  - [Enable Print](#enable-print)
  - [Print Button](#print-button)
  - [Print with JavaScript](#print-with-javascript)
  - [Browser Print Dialog](#browser-print-dialog)
- [Image Export](#image-export)
  - [Export as Image](#export-as-image)
- [Export to PNG/JPEG/SVG](#export-to-pngjpegsvg)
  - [Export as PNG](#export-as-png)
  - [Export as JPEG](#export-as-jpeg)
  - [Export as SVG](#export-as-svg)
- [Print Overview](#print-overview)
  - [Multiple Export Options](#multiple-export-options)
- [PDF Export](#pdf-export)
  - [Enable PDF Export](#enable-pdf-export)
  - [PDF with Orientation](#pdf-with-orientation)
  - [PDF Export Workflow](#pdf-export-workflow)
- [Base64 Export](#base64-export)
  - [Get Gauge as Base64](#get-gauge-as-base64)
  - [Using Base64 String](#using-base64-string)
  - [Send to Server](#send-to-server)
- [Complete Example: Export Controls](#complete-example-export-controls)
- [Use Cases](#use-cases)
  - [Report Generation](#report-generation)
  - [Data Archiving](#data-archiving)
  - [Email Sharing](#email-sharing)
  - [Web Integration](#web-integration)
  - [Document Attachment](#document-attachment)
- [Troubleshooting](#troubleshooting)

## Print Overview

Print functionality allows users to print the rendered Circular Gauge directly from the browser. This is useful when users need a hard copy or report snapshot of the current gauge state.

Printing preserves the current Circular Gauge visualization, including:

- Title.
- Axis configuration.
- Pointer value.
- Ranges.
- Colors.
- Current rendered state.

To use print functionality, set `allowPrint="true"` on the root `ejs-circulargauge` tag and call the client-side `print()` method from JavaScript.

## Implementing Print

Printing a Circular Gauge requires both the print-enabled component configuration and a client-side JavaScript trigger. Setting `allowPrint="true"` only enables the print feature internally; it does not automatically open the print dialog by itself.

### Step 1: Enable Print in the Circular Gauge

Set `allowPrint="true"` on the root `ejs-circulargauge` tag.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Printable Gauge";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Printable Gauge";
}

<h1>Printable Circular Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowPrint="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Step 2: Add a Print Button

Add a button before or above the Circular Gauge. The button will call the JavaScript print function.

```html
<button type="button" onclick="printGauge()">Print Gauge</button>
```

The button alone does not print the gauge. It must call a JavaScript function that accesses the rendered Circular Gauge instance.

### Step 3: Call the Print Method Using JavaScript

Use JavaScript to get the Circular Gauge instance and call the `print()` method.

```html
<script>
    function printGauge() {
        var gaugeElement = document.getElementById('gauge');

        if (gaugeElement && gaugeElement.ej2_instances && gaugeElement.ej2_instances.length > 0) {
            var gaugeInstance = gaugeElement.ej2_instances[0];
            gaugeInstance.print();
        }
    }
</script>
```

Complete working print example:

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "System Status";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Print Gauge";
}

<h1>Print Circular Gauge</h1>

<button type="button" onclick="printGauge()">Print Gauge</button>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowPrint="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function printGauge() {
        var gaugeElement = document.getElementById('gauge');

        if (gaugeElement && gaugeElement.ej2_instances && gaugeElement.ej2_instances.length > 0) {
            var gaugeInstance = gaugeElement.ej2_instances[0];
            gaugeInstance.print();
        }
    }
</script>
```

### Step 4: Print Using Ctrl + P

The default browser `Ctrl + P` prints the full page and may not call the Circular Gauge component print method. To print the Circular Gauge through the Syncfusion print method, intercept `Ctrl + P` and call `gaugeInstance.print()` manually.

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Print Gauge with Ctrl + P";
}

<h1>Print Circular Gauge with Ctrl + P</h1>
<p>Press Ctrl + P to print the Circular Gauge using the component print method.</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowPrint="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    document.addEventListener('keydown', function (event) {
        var isPrintShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p';

        if (isPrintShortcut) {
            event.preventDefault();

            var gaugeElement = document.getElementById('gauge');

            if (gaugeElement && gaugeElement.ej2_instances && gaugeElement.ej2_instances.length > 0) {
                var gaugeInstance = gaugeElement.ej2_instances[0];
                gaugeInstance.print();
            }
        }
    });
</script>
```

Use the same `Index.cshtml.cs` from Step 3 for this example.

### Step 5: Browser Print Dialog

When the `print()` method is called, the browser print dialog opens. The user can then select printer, destination, paper size, orientation, and other browser-level print settings.

Important points:

- `allowPrint="true"` enables print support.
- JavaScript must call `gaugeInstance.print()`.
- A button click or keyboard shortcut is the recommended trigger.
- Normal browser `Ctrl + P` may print the full page instead of using the Circular Gauge component print method.
- To make `Ctrl + P` print through the component, intercept the shortcut and call `gaugeInstance.print()` manually.

## Image Export

### Export as Image

Use `allowImageExport="true"` to enable image export. The Circular Gauge can be exported as PNG, JPEG, or SVG.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Image Export Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Image Export";
}

<h1>Image Export</h1>

<button type="button" onclick="exportGauge()">Export as PNG</button>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowImageExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportGauge() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('PNG', 'gauge-export');
    }
</script>
```

Export method pattern:

```javascript
gaugeInstance.export(type, fileName);
```

Common image export types:

- `PNG`
- `JPEG`
- `SVG`

## Export to PNG/JPEG/SVG

### Export as PNG

PNG export is useful when you need lossless output.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "PNG Export Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "PNG Export";
}

<h1>PNG Export</h1>

<button type="button" onclick="exportPNG()">Export PNG</button>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowImageExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportPNG() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('PNG', 'my-gauge');
    }
</script>
```

### Export as JPEG

JPEG export is useful when you need a smaller raster image.

```html
<button type="button" onclick="exportJPEG()">Export JPEG</button>

<script>
    function exportJPEG() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('JPEG', 'my-gauge');
    }
</script>
```

### Export as SVG

SVG export is useful when you need scalable vector output.

```html
<button type="button" onclick="exportSVG()">Export SVG</button>

<script>
    function exportSVG() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('SVG', 'my-gauge');
    }
</script>
```

### Multiple Export Options

Use one reusable function for multiple image types.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Multiple Export Options";

        public double PointerValue { get; set; } = 72;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Multiple Export Options";
}

<h1>Multiple Export Options</h1>

<button type="button" onclick="exportImage('PNG')">Download PNG</button>
<button type="button" onclick="exportImage('JPEG')">Download JPEG</button>
<button type="button" onclick="exportImage('SVG')">Download SVG</button>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowImageExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0" end="35" color="#2ECC71"></e-circulargauge-range>
                <e-circulargauge-range start="35" end="70" color="#F39C12"></e-circulargauge-range>
                <e-circulargauge-range start="70" end="100" color="#E74C3C"></e-circulargauge-range>
            </e-circulargauge-ranges>
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportImage(type) {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        var fileName = 'gauge-' + new Date().getTime();
        gaugeInstance.export(type, fileName);
    }
</script>
```

## PDF Export

### Enable PDF Export

Use `allowPdfExport="true"` to enable PDF export.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "PDF Export Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "PDF Export";
}

<h1>PDF Export</h1>

<button type="button" onclick="exportPDF()">Export as PDF</button>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowPdfExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportPDF() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('PDF', 'gauge-export');
    }
</script>
```

### PDF with Orientation

For most cases, the default PDF orientation is sufficient. If orientation is needed, pass the orientation value as the third parameter.

```html
<button type="button" onclick="exportPortrait()">PDF - Portrait</button>
<button type="button" onclick="exportLandscape()">PDF - Landscape</button>

<script>
    function exportPortrait() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('PDF', 'gauge-portrait', 0);
    }

    function exportLandscape() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        gaugeInstance.export('PDF', 'gauge-landscape', 1);
    }
</script>
```

Recommended orientation values:

- `Portrait`
- `Landscape`

### PDF Export Workflow

1. User clicks the PDF export button.
2. The Circular Gauge captures the current rendered state.
3. A PDF file is generated.
4. The browser downloads the PDF file.
5. The user can open the generated PDF in a PDF viewer.

## Base64 Export

### Get Gauge as Base64

Use `allowImageExport="true"` and pass `false` as the fourth export parameter to return the exported content instead of downloading it.

Because the export result can be asynchronous, handle it with `Promise.resolve(...)`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Base64 Export Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Base64 Export";
}

<h1>Base64 Export</h1>

<button type="button" onclick="exportBase64()">Get Base64</button>

<pre id="base64Output"></pre>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowImageExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportBase64() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        var exportResult = gaugeInstance.export('PNG', 'gauge', null, false);

        Promise.resolve(exportResult).then(function (base64String) {
            document.getElementById('base64Output').textContent = base64String;
        });
    }
</script>
```

### Using Base64 String

Use the returned base64 string to display the exported gauge image in an `img` element.

```html
<button type="button" onclick="exportAndDisplay()">Export and Display</button>

<div id="imageContainer"></div>

<script>
    function exportAndDisplay() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        var exportResult = gaugeInstance.export('PNG', 'gauge', null, false);

        Promise.resolve(exportResult).then(function (base64String) {
            var img = document.createElement('img');

            if (base64String.indexOf('data:image') === 0) {
                img.src = base64String;
            } else {
                img.src = 'data:image/png;base64,' + base64String;
            }

            document.getElementById('imageContainer').innerHTML = '';
            document.getElementById('imageContainer').appendChild(img);
        });
    }
</script>
```

### Send to Server

When sending exported image data to the server, use a Razor Page handler. The following example posts the base64 string to `OnPostSaveGaugeImage`.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Save Exported Gauge";

        public double PointerValue { get; set; } = 65;

        public void OnGet()
        {
        }

        public IActionResult OnPostSaveGaugeImage([FromBody] GaugeImageRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.ImageData))
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "Image data is empty."
                });
            }

            return new JsonResult(new
            {
                success = true,
                message = "Gauge image data received successfully."
            });
        }

        public class GaugeImageRequest
        {
            public string ImageData { get; set; } = string.Empty;

            public string FileName { get; set; } = string.Empty;
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Send Gauge Export to Server";
}

<h1>Send Gauge Export to Server</h1>

<button type="button" onclick="exportToServer()">Save to Server</button>

<div id="serverResult"></div>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowImageExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function exportToServer() {
        var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
        var exportResult = gaugeInstance.export('PNG', 'gauge', null, false);

        Promise.resolve(exportResult).then(function (base64String) {
            fetch('?handler=SaveGaugeImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value || ''
                },
                body: JSON.stringify({
                    imageData: base64String,
                    fileName: 'gauge-' + new Date().getTime() + '.png'
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                document.getElementById('serverResult').textContent = result.message;
            });
        });
    }
</script>
```

If antiforgery validation is enabled and the token is required, include the antiforgery token in the page before calling the handler.

## Complete Example: Export Controls

This example includes print, image export, PDF export, and base64 preview in one Razor Page.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Export Example";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 72;

        public double GoodRangeStart { get; set; } = 0;

        public double GoodRangeEnd { get; set; } = 35;

        public double WarningRangeStart { get; set; } = 35;

        public double WarningRangeEnd { get; set; } = 70;

        public double CriticalRangeStart { get; set; } = 70;

        public double CriticalRangeEnd { get; set; } = 100;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Export Controls";
}

<h1>Export Controls</h1>

<div>
    <button type="button" onclick="printGauge()">Print</button>
    <button type="button" onclick="exportImage('PNG')">PNG</button>
    <button type="button" onclick="exportImage('JPEG')">JPEG</button>
    <button type="button" onclick="exportImage('SVG')">SVG</button>
    <button type="button" onclick="exportPDF()">PDF</button>
    <button type="button" onclick="previewBase64()">Preview Base64 PNG</button>
</div>

<div id="imagePreview"></div>

<ejs-circulargauge id="exportGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    allowPrint="true"
                    allowImageExport="true"
                    allowPdfExport="true">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="@Model.GoodRangeStart"
                                       end="@Model.GoodRangeEnd"
                                       color="#2ECC71">
                </e-circulargauge-range>
                <e-circulargauge-range start="@Model.WarningRangeStart"
                                       end="@Model.WarningRangeEnd"
                                       color="#F39C12">
                </e-circulargauge-range>
                <e-circulargauge-range start="@Model.CriticalRangeStart"
                                       end="@Model.CriticalRangeEnd"
                                       color="#E74C3C">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         color="#333333">
                    <e-pointer-animation enable="true"
                                         duration="1500">
                    </e-pointer-animation>
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function getGaugeInstance() {
        var gaugeElement = document.getElementById('exportGauge');

        if (!gaugeElement || !gaugeElement.ej2_instances || gaugeElement.ej2_instances.length === 0) {
            return null;
        }

        return gaugeElement.ej2_instances[0];
    }

    function printGauge() {
        var gauge = getGaugeInstance();

        if (gauge) {
            gauge.print();
        }
    }

    function exportImage(type) {
        var gauge = getGaugeInstance();

        if (gauge) {
            var fileName = 'gauge-' + new Date().getTime();
            gauge.export(type, fileName);
        }
    }

    function exportPDF() {
        var gauge = getGaugeInstance();

        if (gauge) {
            var fileName = 'gauge-' + new Date().getTime();
            gauge.export('PDF', fileName);
        }
    }

    function previewBase64() {
        var gauge = getGaugeInstance();

        if (gauge) {
            var exportResult = gauge.export('PNG', 'gauge-preview', null, false);

            Promise.resolve(exportResult).then(function (base64String) {
                var img = document.createElement('img');

                if (base64String.indexOf('data:image') === 0) {
                    img.src = base64String;
                } else {
                    img.src = 'data:image/png;base64,' + base64String;
                }

                document.getElementById('imagePreview').innerHTML = '';
                document.getElementById('imagePreview').appendChild(img);
            });
        }
    }
</script>
```

## Use Cases

### Report Generation

Export the Circular Gauge as a PDF or image and include it in dashboard reports.

### Data Archiving

Save gauge snapshots as images for historical reference.

### Email Sharing

Use image or base64 export when embedding a gauge snapshot in email content.

### Web Integration

Allow users to download the gauge as PNG, JPEG, SVG, or PDF from a web dashboard.

### Document Attachment

Export the Circular Gauge and attach the output to tickets, documents, or audit records.

## Troubleshooting

If the print button is not working:

1. Confirm that `allowPrint="true"` is set on the Circular Gauge.

```html
<ejs-circulargauge allowPrint="true">
</ejs-circulargauge>
```

2. Confirm that the gauge instance is available.

```javascript
var gaugeInstance = document.getElementById('gauge').ej2_instances[0];
```

3. Check the browser console for JavaScript errors.

If image export is not working:

1. Confirm that `allowImageExport="true"` is set.

```html
<ejs-circulargauge allowImageExport="true">
</ejs-circulargauge>
```

2. Use a valid image export type.

```javascript
gaugeInstance.export('PNG', 'gauge-export');
gaugeInstance.export('JPEG', 'gauge-export');
gaugeInstance.export('SVG', 'gauge-export');
```

If PDF export is not working:

1. Confirm that `allowPdfExport="true"` is set.

```html
<ejs-circulargauge allowPdfExport="true">
</ejs-circulargauge>
```

2. Use `PDF` as the export type.

```javascript
gaugeInstance.export('PDF', 'gauge-export');
```

If base64 export is not returning as expected:

1. Pass `false` as the fourth parameter.

```javascript
var exportResult = gaugeInstance.export('PNG', 'gauge', null, false);
```

2. Handle the result using `Promise.resolve(...)`.

```javascript
Promise.resolve(exportResult).then(function (base64String) {
    console.log(base64String);
});
```

If the exported image preview is broken:

1. Check whether the returned value already includes the `data:image` prefix.
2. Add the prefix only when needed.

```javascript
if (base64String.indexOf('data:image') === 0) {
    img.src = base64String;
} else {
    img.src = 'data:image/png;base64,' + base64String;
}
```

If file download does not start:

1. Check browser download settings.
2. Check whether pop-up or download restrictions are enabled.
3. Confirm that the export method is called after the gauge has fully rendered.
4. Check the browser console for script errors.
