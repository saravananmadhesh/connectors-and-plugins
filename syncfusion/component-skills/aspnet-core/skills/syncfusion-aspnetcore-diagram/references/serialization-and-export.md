# Serialization and Export in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Serialization (Save and Load)](#serialization-save-and-load)
- [Reduce JSON Size](#reduce-json-size)
- [Local Storage Persistence](#local-storage-persistence)
- [loaded Event](#loaded-event)
- [Export to Image or SVG](#export-to-image-or-svg)
- [Print](#print)
- [Module Injection](#module-injection)

## Serialization (Save and Load)

### Save Diagram

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Returns the diagram state as a JSON string
var json = diagram.saveDiagram();
console.log(json);  // Full diagram JSON
```

### Load Diagram

```javascript
// Clear the diagram and load from a previously saved JSON string
diagram.loadDiagram(json);
```

> **Note:** `loadDiagram()` clears all existing nodes and connectors before loading. The `loaded` event fires after the load completes.

### Full Save/Load Example

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes"
    loaded="onDiagramLoaded">
</ejs-diagram>

<button onclick="saveDiagram()">Save</button>
<button onclick="loadDiagram()">Load</button>

<ejs-scripts></ejs-scripts>
<script>
    var savedJson = '';

    function saveDiagram() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        savedJson = diagram.saveDiagram();
        console.log('Saved:', savedJson.length, 'characters');
    }

    function loadDiagram() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        if (savedJson) {
            diagram.loadDiagram(savedJson);
        }
    }

    function onDiagramLoaded() {
        console.log('Diagram loaded successfully');
    }
</script>
```

## Reduce JSON Size

By default, `saveDiagram()` includes all properties (even defaults). Use `preventDefaults` to omit unchanged defaults and reduce JSON size significantly:

```csharp
ViewBag.serializationSettings = new DiagramSerializationSettings
{
    PreventDefaults = true
};
```

```cshtml
<ejs-diagram id="diagram"
    serializationSettings="@ViewBag.serializationSettings">
</ejs-diagram>
```

With `PreventDefaults = true`, only non-default property values are serialized.

## Local Storage Persistence

Save and restore diagram state using `localStorage`:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Save to localStorage
function saveToLocalStorage() {
    var json = diagram.saveDiagram();
    localStorage.setItem('diagram_state', json);
    console.log('Diagram saved to localStorage');
}

// Load from localStorage
function loadFromLocalStorage() {
    var json = localStorage.getItem('diagram_state');
    if (json) {
        diagram.loadDiagram(json);
    } else {
        console.log('No saved diagram found');
    }
}
```

### Auto-save on Change

```cshtml
<ejs-diagram id="diagram"
    historyChange="onHistoryChange">
</ejs-diagram>
<script>
    function onHistoryChange(args) {
        if (args.action === 'AddEntry') {
            var diagram = document.getElementById('diagram').ej2_instances[0];
            localStorage.setItem('diagram_autosave', diagram.saveDiagram());
        }
    }
</script>
```

## loaded Event

The `loaded` event fires after `loadDiagram()` completes. Use it to run post-load logic:

```cshtml
<ejs-diagram id="diagram" loaded="onLoaded">
</ejs-diagram>
<script>
    function onLoaded() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        diagram.fitPage();  // Fit all content in view after load
    }
</script>
```

## Export to Image or SVG

### Prerequisites

The `PrintAndExport` module must be injected before using export or print:

```javascript
ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);
```

Or include in the `<script>` block after `<ejs-scripts>`:

```cshtml
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);
</script>
```

### exportDiagram Options

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

diagram.exportDiagram({
    fileName: 'my-diagram',   // File name without extension
    format: 'PNG',            // 'PNG' | 'JPEG' | 'BMP' | 'SVG'
    mode: 'Download',         // 'Download' | 'Data'
    region: 'Content'         // 'Content' | 'PageSettings' | 'CustomBounds'
});
```

| Option | Values | Description |
|--------|--------|-------------|
| `fileName` | string | Output file name (no extension) |
| `format` | `'PNG'`, `'JPEG'`, `'BMP'`, `'SVG'` | Export format |
| `mode` | `'Download'` | Triggers browser download |
| `mode` | `'Data'` | Returns Base64 data URL string |
| `region` | `'Content'` | Export only the node/connector area |
| `region` | `'PageSettings'` | Export the full defined page |
| `region` | `'CustomBounds'` | Export a specific rectangle |

### Export Custom Bounds

```javascript
diagram.exportDiagram({
    fileName: 'region',
    format: 'PNG',
    mode: 'Download',
    region: 'CustomBounds',
    bounds: { x: 50, y: 50, width: 500, height: 400 }
});
```

### Get Base64 Data URL

```javascript
var dataUrl = diagram.exportDiagram({
    format: 'PNG',
    mode: 'Data',
    region: 'Content'
});
// dataUrl = "data:image/png;base64,iVBOR..."
document.getElementById('preview').src = dataUrl;
```

### Export with Margin

```javascript
diagram.exportDiagram({
    fileName: 'diagram',
    format: 'SVG',
    mode: 'Download',
    region: 'Content',
    margin: { left: 20, top: 20, right: 20, bottom: 20 }
});
```

### Full Export Button Example

```cshtml
<button onclick="exportPng()">Export PNG</button>
<button onclick="exportSvg()">Export SVG</button>

<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes">
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);

    function exportPng() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        diagram.exportDiagram({
            fileName: 'diagram',
            format: 'PNG',
            mode: 'Download',
            region: 'Content'
        });
    }

    function exportSvg() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        diagram.exportDiagram({
            fileName: 'diagram',
            format: 'SVG',
            mode: 'Download',
            region: 'Content'
        });
    }
</script>
```

> **Note:** HTML nodes (`type: 'HTML'`) cannot be exported to image formats (PNG/JPEG/BMP). Use SVG export if HTML nodes are required.

## Print

Print the diagram using the browser's print dialog:

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

diagram.print({
    region: 'Content',         // 'Content' | 'PageSettings' | 'CustomBounds'
    multiplePage: false,       // true = split across multiple pages
    pageWidth: 816,            // Page width in pixels (default 8.5in at 96dpi)
    pageHeight: 1056,          // Page height in pixels (default 11in at 96dpi)
    pageOrientation: 'Portrait'  // 'Portrait' | 'Landscape'
});
```

| Option | Description |
|--------|-------------|
| `region` | Area to print (same as export regions) |
| `multiplePage` | `true` to paginate large diagrams |
| `pageWidth` / `pageHeight` | Paper size in pixels |
| `pageOrientation` | `'Portrait'` or `'Landscape'` |
| `margin` | `{ left, top, right, bottom }` around content |

### Print Button Example

```cshtml
<button onclick="printDiagram()">Print</button>

<ejs-diagram id="diagram" width="100%" height="550px"
    nodes="@ViewBag.nodes">
</ejs-diagram>
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);

    function printDiagram() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        diagram.print({
            region: 'Content',
            pageOrientation: 'Landscape',
            pageWidth: 1056,
            pageHeight: 816
        });
    }
</script>
```

## Module Injection

Always inject `PrintAndExport` before using export or print:

```cshtml
<ejs-scripts></ejs-scripts>
<script>
    ej.diagrams.Diagram.Inject(ej.diagrams.PrintAndExport);
</script>
```

If using other modules simultaneously:

```javascript
ej.diagrams.Diagram.Inject(
    ej.diagrams.PrintAndExport,
    ej.diagrams.BpmnDiagrams,
    ej.diagrams.MindMap,
    ej.diagrams.ComplexHierarchicalTree
);
```
