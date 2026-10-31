# ASP.NET MVC Chart WebMCP AI Sample Generation Guide

## Purpose

Use this reference to generate complete Syncfusion ASP.NET MVC Chart samples with WebMCP. Preserve the existing WebMCP behavior exactly. Registration is automatic after rendering.

## Supported MVC APIs

- `EnableWebMcp`
- `WebMcpSettings`
- `BeforeWebMcpToolExecute`
- `ChartBuilder.EnableWebMcp(...)`
- `ChartBuilder.WebMcpSettings(...)`
- `ChartBuilder.BeforeWebMcpToolExecute(...)`

## Strict generation rules

- Use `.EnableWebMcp(true)`.
- Give the Chart a stable and unique ID.
- Use `.WebMcpSettings(...)` for a prefix, selected tools, custom tools, or exposure restrictions.
- Omit `Tools` when all built-in tools are required.
- Use exact, verified, case-sensitive tool names when tools are selected explicitly.
- Registration is automatic. Do not call `registerWebMcpTools()` and do not generate a registration button.
- Use `.BeforeWebMcpToolExecute(...)` only for validation, cancellation, auditing, or intentional confirmation control.
- Keep default write-operation confirmation unless an intentional override is requested.
- Do not invent `ExposedTo` values. Add them only when the user or deployment environment provides valid values.
- Include the controller action whenever the view depends on `ViewBag`, `ViewData`, or model values.
- Do not fabricate tool responses or generate a fake model-context UI.

## Required ASP.NET MVC project setup

### Add the Syncfusion MVC namespace

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts
```

### Add the Syncfusion script manager

Place the script manager in the shared layout after the page content and required EJ2 client resources.

```cshtml
@Html.EJS().ScriptManager()
```

## Complete MVC feature-tour sample

### `Views/Home/Index.cshtml`

```cshtml
@using Syncfusion.EJ2.Charts

@Html.EJS().Chart("feature-tour-chart")
    .Title("Chart WebMCP Feature Tour")
    .EnableWebMcp(true)
    .EnableExport(true)
    .WebMcpSettings(settings => settings
        .Name("featureTourChart")
        .Tools(new[]
        {
            "inspectChart",
            "getSeriesData",
            "addChartSeries",
            "removeChartSeries",
            "clearChartSeries",
            "updateChartAnnotation",
            "showChartTooltip",
            "showChartCrosshair",
            "exportChart",
            "printChart",
            "updateChartDataSource",
            "toggleChartSeriesVisibility",
            "configureChartZoom",
            "resetChartZoom",
            "selectChartPoints",
            "clearChartSelection",
            "addChartAxis",
            "updateChartAxis",
            "updateChartTitle",
            "hideChartTooltip",
            "hideChartCrosshair",
            "updateChartProperties",
            "updateChartSeries",
            "updateChartPoint",
            "appendChartData",
            "removeChartPoints",
            "getChartPoint",
            "getSelectedChartData",
            "getChartAxes",
            "getChartIndicators",
            "getChartStriplines",
            "removeChartAxis",
            "getChartAnnotations",
            "addChartAnnotation",
            "removeChartAnnotation",
            "animateChart",
            "getChartLegend"
        })
        .ExposedTo(new[] { "assistant" }))
    .BeforeWebMcpToolExecute("beforeWebMcpToolExecute")
    .PrimaryXAxis(x => x.Title("Sample index").Minimum(0).Maximum(8).Interval(1))
    .PrimaryYAxis(y => y.Title("Value").Minimum(0).Maximum(100).Interval(20))
    .Tooltip(t => t.Enable(true).Shared(true))
    .CrosshairSettings(c => c.Enable(true).LineType(LineType.Both))
    .LegendSettings(l => l.Visible(true))
    .ZoomSettings(z => z.EnableSelectionZooming(true).EnableMouseWheelZooming(true).EnablePan(true))
    .SelectionMode(SelectionMode.Point)
    .Series(series =>
    {
        series.Type(ChartSeriesType.Line).DataSource(ViewBag.ChartData).XName("X").YName("Y")
            .Name("Observed values").Marker(m => m.Visible(true)).Add();
        series.Type(ChartSeriesType.Column).DataSource(ViewBag.ChartData).XName("X").YName("Comparison")
            .Name("Comparison values").Add();
    })
    .Render()

<script>
    function beforeWebMcpToolExecute(args) {
        if (args.toolName.endsWith('_printChart')) {
            args.showConfirmationDialog = true;
        }
    }

    async function executeTool(chartId, name, input) {
        var element = document.getElementById(chartId);
        if (!element || !element.ej2_instances || !element.ej2_instances.length) {
            throw new Error('The Chart is not available.');
        }
        var chart = element.ej2_instances[0];
        var tools = chart.getWebMcpTools([name]);
        var tool = tools.find(function (item) { return item.name === name; });
        if (!tool || typeof tool.execute !== 'function') {
            throw new Error('The requested WebMCP tool is unavailable.');
        }
        return tool.execute(input);
    }
</script>
```

### `Controllers/HomeController.cs`

```csharp
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.ChartData = new[]
        {
            new { X = 1, Y = 32, Comparison = 24 },
            new { X = 2, Y = 48, Comparison = 36 },
            new { X = 3, Y = 42, Comparison = 34 },
            new { X = 4, Y = 65, Comparison = 52 },
            new { X = 5, Y = 58, Comparison = 46 },
            new { X = 6, Y = 74, Comparison = 61 }
        };
        return View();
    }
}
```

The `ExposedTo` value above belongs to the supplied behavior. In newly generated samples, include it only when the request or environment supplies the value.

## Register all built-in tools

Omit `Tools` completely.

```cshtml
@Html.EJS().Chart("all-tools-chart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings.Name("allToolsChart"))
    .Series(series =>
    {
        series.Type(ChartSeriesType.Line).DataSource(ViewBag.ChartData).XName("X").YName("Y").Add();
    })
    .Render()
```

## Register selected built-in tools

```cshtml
@Html.EJS().Chart("specific-tools-chart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings
        .Name("specificToolsChart")
        .Tools(new[]
        {
            "inspectChart",
            "getSeriesData",
            "showChartTooltip",
            "hideChartTooltip",
            "updateChartDataSource"
        }))
    .BeforeWebMcpToolExecute("beforeWebMcpToolExecute")
    .Tooltip(t => t.Enable(true))
    .Series(series =>
    {
        series.Type(ChartSeriesType.Line).DataSource(ViewBag.ChartData).XName("X").YName("Y").Add();
    })
    .Render()

<script>
    function beforeWebMcpToolExecute(args) {
        if (args.toolName.endsWith('_updateChartDataSource')) {
            args.showConfirmationDialog = true;
        }
    }
</script>
```

## Add custom WebMCP tools

A custom tool contains a browser-executable function. Define it on the client and attach it to the rendered Chart. Do not try to serialize an executable JavaScript function through a C# object.

```cshtml
@Html.EJS().Chart("custom-tool-chart")
    .EnableWebMcp(true)
    .Series(series =>
    {
        series.Type(ChartSeriesType.Line).DataSource(ViewBag.ChartData).XName("X").YName("Y").Add();
    })
    .Render()

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var chart = document.getElementById('custom-tool-chart').ej2_instances[0];
        var customTools = [{
            name: 'getHighestPoint',
            description: 'Returns the highest point from the requested Chart series.',
            inputSchema: {
                type: 'object',
                properties: { seriesIndex: { type: 'number', description: 'Zero-based series index.' } },
                required: ['seriesIndex'],
                additionalProperties: false
            },
            execute: async function (input) {
                if (!Number.isInteger(input.seriesIndex) || input.seriesIndex < 0) {
                    return { success: false, message: 'Provide a valid non-negative series index.' };
                }
                var series = chart.series[input.seriesIndex];
                var points = series && series.points ? series.points : [];
                if (!series) return { success: false, message: 'The requested series does not exist.' };
                if (!points.length) return { success: false, message: 'The requested series has no points.' };
                var point = points.reduce(function (highest, current) {
                    return current.yValue > highest.yValue ? current : highest;
                });
                return {
                    success: true,
                    seriesIndex: input.seriesIndex,
                    point: { index: point.index, x: point.x, y: point.yValue }
                };
            }
        }];
        chart.webMcpSettings = { name: 'customToolsChart', customTools: customTools };
        chart.dataBind();
    });
</script>
```

### Custom-tool requirements

- Use a unique name that does not conflict with a built-in tool.
- Provide a precise description and a valid JSON input schema.
- List mandatory inputs in `required`.
- Use `additionalProperties: false` when undeclared inputs must be rejected.
- Validate every input again inside `execute`.
- Return explicit JSON-safe success or failure objects.
- Never return the Chart instance, DOM nodes, functions, events, circular objects, or EJ2 class instances.
- Do not expose sensitive application state.

## Use built-in and custom tools together

```javascript
chart.webMcpSettings = {
    name: 'combinedToolsChart',
    tools: ['inspectChart', 'getSeriesData', 'showChartTooltip', 'hideChartTooltip'],
    customTools: customTools
};
chart.dataBind();
```

## Confirmation, cancellation, and validation

```javascript
function beforeWebMcpToolExecute(args) {
    if (args.toolName.endsWith('_exportChart') || args.toolName.endsWith('_printChart')) {
        args.showConfirmationDialog = true;
    }
    if (args.toolName.endsWith('_clearChartSeries') && !canClearSeries) {
        args.cancel = true;
    }
}
```

The registered tool name can contain the prefix configured with `Name(...)`. Use `endsWith()` when matching an operation. Validate Chart and element IDs, series indexes, point indexes, annotation indexes, axis names, data mappings, export types, configuration objects, and application permissions.

## Direct tool execution

Use the `executeTool` helper from the complete sample only for diagnostics, tests, or explicitly requested UI workflows. Direct execution is not required for automatic registration. Do not add an execution button unless the requested UI requires one.

## Exact built-in tool names

- `inspectChart`
- `getSeriesData`
- `addChartSeries`
- `removeChartSeries`
- `clearChartSeries`
- `updateChartAnnotation`
- `showChartTooltip`
- `showChartCrosshair`
- `exportChart`
- `printChart`
- `updateChartDataSource`
- `toggleChartSeriesVisibility`
- `configureChartZoom`
- `resetChartZoom`
- `selectChartPoints`
- `clearChartSelection`
- `addChartAxis`
- `updateChartAxis`
- `updateChartTitle`
- `hideChartTooltip`
- `hideChartCrosshair`
- `updateChartProperties`
- `updateChartSeries`
- `updateChartPoint`
- `appendChartData`
- `removeChartPoints`
- `getChartPoint`
- `getSelectedChartData`
- `getChartAxes`
- `getChartIndicators`
- `getChartStriplines`
- `removeChartAxis`
- `getChartAnnotations`
- `addChartAnnotation`
- `removeChartAnnotation`
- `animateChart`
- `getChartLegend`

## Spoon-fed tool-by-tool ASP.NET MVC guidance

Every focused sample must retain the stable ID, `.EnableWebMcp(true)`, automatic registration, required server data, and Chart settings needed by the selected operation.

### 1. `inspectChart`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("inspectChartChart")
    .Tools(new[] { "inspectChart" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'inspectChart', {});
```

**Precondition:** A rendered Chart is required.

### 2. `getSeriesData`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getSeriesDataChart")
    .Tools(new[] { "getSeriesData" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getSeriesData', { seriesIndex: 0 });
```

**Precondition:** The series index must exist.

### 3. `addChartSeries`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("addChartSeriesChart")
    .Tools(new[] { "addChartSeries" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartSeries', { series: { type: 'Line', dataSource: [{ x: 1, y: 20 }, { x: 2, y: 35 }], xName: 'x', yName: 'y', name: 'Added series' } });
```

**Precondition:** Every series type and nested feature that the tool may create must be available in the deployed EJ2 client scripts.

### 4. `removeChartSeries`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("removeChartSeriesChart")
    .Tools(new[] { "removeChartSeries" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartSeries', { seriesIndex: 1 });
```

**Precondition:** The target series index must exist.

### 5. `clearChartSeries`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("clearChartSeriesChart")
    .Tools(new[] { "clearChartSeries" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'clearChartSeries', {});
```

**Precondition:** At least one series should exist before execution.

### 6. `updateChartAnnotation`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartAnnotationChart")
    .Tools(new[] { "updateChartAnnotation" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartAnnotation', { annotationIndex: 0, annotation: { content: '<div>Updated peak</div>', x: 5, y: 58 } });
```

**Precondition:** The annotation index must exist and annotation support must be available.

### 7. `showChartTooltip`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("showChartTooltipChart")
    .Tools(new[] { "showChartTooltip" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'showChartTooltip', { seriesIndex: 0, pointIndex: 2 });
```

**Precondition:** Tooltip must be enabled and the series and point indexes must exist.

### 8. `showChartCrosshair`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("showChartCrosshairChart")
    .Tools(new[] { "showChartCrosshair" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'showChartCrosshair', { x: 250, y: 180 });
```

**Precondition:** Crosshair must be enabled and the coordinates must be valid.

### 9. `exportChart`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("exportChartChart")
    .Tools(new[] { "exportChart" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'exportChart', { type: 'PNG', fileName: 'chart-export' });
```

**Precondition:** Export must be enabled and the type must be supported.

### 10. `printChart`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("printChartChart")
    .Tools(new[] { "printChart" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'printChart', { elementIds: 'feature-tour-chart' });
```

**Precondition:** The supplied Chart or element ID must exist.

### 11. `updateChartDataSource`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartDataSourceChart")
    .Tools(new[] { "updateChartDataSource" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartDataSource', { seriesIndex: 0, dataSource: [{ x: 1, y: 40 }, { x: 2, y: 55 }] });
```

**Precondition:** The series must exist and incoming fields must match xName and yName.

### 12. `toggleChartSeriesVisibility`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("toggleChartSeriesVisibilityChart")
    .Tools(new[] { "toggleChartSeriesVisibility" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'toggleChartSeriesVisibility', { seriesIndex: 0 });
```

**Precondition:** The target series must exist. Enable the legend when legend state is expected.

### 13. `configureChartZoom`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("configureChartZoomChart")
    .Tools(new[] { "configureChartZoom" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'configureChartZoom', { zoomSettings: { enableSelectionZooming: true, enableMouseWheelZooming: true, enablePan: true } });
```

**Precondition:** Zoom support must be available.

### 14. `resetChartZoom`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("resetChartZoomChart")
    .Tools(new[] { "resetChartZoom" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'resetChartZoom', {});
```

**Precondition:** The Chart must be rendered with zoom support.

### 15. `selectChartPoints`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("selectChartPointsChart")
    .Tools(new[] { "selectChartPoints" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'selectChartPoints', { points: [{ seriesIndex: 0, pointIndex: 1 }, { seriesIndex: 0, pointIndex: 3 }] });
```

**Precondition:** Selection mode must be compatible and every index must exist.

### 16. `clearChartSelection`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("clearChartSelectionChart")
    .Tools(new[] { "clearChartSelection" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'clearChartSelection', {});
```

**Precondition:** Selection support must be available.

### 17. `addChartAxis`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("addChartAxisChart")
    .Tools(new[] { "addChartAxis" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartAxis', { axis: { name: 'secondaryAxis', title: 'Secondary value', opposedPosition: true } });
```

**Precondition:** Use a unique additional-axis name and retain every permitted axis value type.

### 18. `updateChartAxis`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartAxisChart")
    .Tools(new[] { "updateChartAxis" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartAxis', { axisName: 'primaryYAxis', axis: { title: 'Updated value', minimum: 0, maximum: 120, interval: 20 } });
```

**Precondition:** The target primary or additional axis must exist.

### 19. `updateChartTitle`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartTitleChart")
    .Tools(new[] { "updateChartTitle" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartTitle', { title: 'Updated Chart title', subTitle: 'Updated subtitle' });
```

**Precondition:** The Chart must be rendered.

### 20. `hideChartTooltip`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("hideChartTooltipChart")
    .Tools(new[] { "hideChartTooltip" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'hideChartTooltip', {});
```

**Precondition:** Tooltip must be enabled when a visible tooltip is expected.

### 21. `hideChartCrosshair`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("hideChartCrosshairChart")
    .Tools(new[] { "hideChartCrosshair" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'hideChartCrosshair', {});
```

**Precondition:** Crosshair must be enabled when a visible crosshair is expected.

### 22. `updateChartProperties`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartPropertiesChart")
    .Tools(new[] { "updateChartProperties" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartProperties', { properties: { background: '#FFFFFF', title: 'Updated properties', legendSettings: { visible: true }, tooltip: { enable: true, shared: true } } });
```

**Precondition:** Every feature that the tool may enable must be available in the deployed EJ2 scripts.

### 23. `updateChartSeries`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartSeriesChart")
    .Tools(new[] { "updateChartSeries" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartSeries', { seriesIndex: 0, series: { type: 'Column', name: 'Updated series', marker: { visible: true } } });
```

**Precondition:** The series must exist, and every permitted target series and nested feature must be available.

### 24. `updateChartPoint`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("updateChartPointChart")
    .Tools(new[] { "updateChartPoint" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartPoint', { seriesIndex: 0, pointIndex: 2, point: { x: 3, y: 70 } });
```

**Precondition:** The series and point indexes must exist and field mappings must match.

### 25. `appendChartData`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("appendChartDataChart")
    .Tools(new[] { "appendChartData" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'appendChartData', { seriesIndex: 0, data: [{ x: 7, y: 80 }, { x: 8, y: 76 }] });
```

**Precondition:** The target series must exist and appended fields must match its mappings.

### 26. `removeChartPoints`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("removeChartPointsChart")
    .Tools(new[] { "removeChartPoints" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartPoints', { seriesIndex: 0, pointIndexes: [1, 3] });
```

**Precondition:** Every target point index must exist.

### 27. `getChartPoint`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartPointChart")
    .Tools(new[] { "getChartPoint" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartPoint', { seriesIndex: 0, pointIndex: 2 });
```

**Precondition:** The series and point indexes must exist.

### 28. `getSelectedChartData`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getSelectedChartDataChart")
    .Tools(new[] { "getSelectedChartData" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getSelectedChartData', {});
```

**Precondition:** Selection support is required and a selection must exist when selected data is expected.

### 29. `getChartAxes`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartAxesChart")
    .Tools(new[] { "getChartAxes" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartAxes', {});
```

**Precondition:** The Chart must be rendered and configured axis support must remain available.

### 30. `getChartIndicators`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartIndicatorsChart")
    .Tools(new[] { "getChartIndicators" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartIndicators', {});
```

**Precondition:** Configured indicators and their source series must exist when results are expected.

### 31. `getChartStriplines`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartStriplinesChart")
    .Tools(new[] { "getChartStriplines" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartStriplines', {});
```

**Precondition:** Configure axis striplines when stripline results are expected.

### 32. `removeChartAxis`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("removeChartAxisChart")
    .Tools(new[] { "removeChartAxis" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartAxis', { axisName: 'secondaryAxis' });
```

**Precondition:** Target an existing removable additional axis.

### 33. `getChartAnnotations`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartAnnotationsChart")
    .Tools(new[] { "getChartAnnotations" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartAnnotations', {});
```

**Precondition:** Configure annotations when annotation results are expected.

### 34. `addChartAnnotation`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("addChartAnnotationChart")
    .Tools(new[] { "addChartAnnotation" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartAnnotation', { annotation: { content: '<div>New annotation</div>', x: 4, y: 65, coordinateUnits: 'Point', region: 'Series' } });
```

**Precondition:** Annotation coordinates, units, and region must be valid.

### 35. `removeChartAnnotation`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("removeChartAnnotationChart")
    .Tools(new[] { "removeChartAnnotation" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartAnnotation', { annotationIndex: 0 });
```

**Precondition:** The annotation index must exist.

### 36. `animateChart`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("animateChartChart")
    .Tools(new[] { "animateChart" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'animateChart', {});
```

**Precondition:** The Chart must contain animation-compatible series.

### 37. `getChartLegend`

**Selected-tool configuration:**

```cshtml
.WebMcpSettings(settings => settings
    .Name("getChartLegendChart")
    .Tools(new[] { "getChartLegend" }))
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartLegend', {});
```

**Precondition:** Legend must be enabled when visible legend information is expected.

## Required generation scenarios

- An MVC Chart with all built-in tools.
- An MVC Chart with selected built-in tools.
- An MVC Chart with one or more custom WebMCP tools.
- An MVC Chart with built-in and custom tools together.
- A sample with validation, cancellation, and confirmation handling.
- A diagnostic or test sample that directly executes a tool.
- A complete view and controller for every server-backed sample.

## Final copy rules

- Always include the controller action when the view binds server data.
- Always preserve the stable rendered Chart ID.
- Always use `.EnableWebMcp(true)`.
- Omit `Tools` for all-tools registration.
- Use exact, case-sensitive names for selected tools.
- Do not invent `ExposedTo` values.
- Do not call `registerWebMcpTools()`.
- Do not create a registration button.
- Do not fabricate tool output.
- Return JSON-safe custom-tool output.

## AI validation checklist

- [ ] The Razor view imports the required Syncfusion Chart namespace.
- [ ] The shared layout includes the Syncfusion script manager.
- [ ] The Chart has a stable ID.
- [ ] `.EnableWebMcp(true)` is used.
- [ ] `.WebMcpSettings(...)` is used only when settings are required.
- [ ] `Tools` is omitted for all built-ins.
- [ ] Selected names belong to the verified 37-tool list and use exact casing.
- [ ] `ExposedTo` values come from the request or environment.
- [ ] `.BeforeWebMcpToolExecute(...)` is included only when execution handling is required.
- [ ] Default write confirmation is preserved unless intentionally overridden.
- [ ] The controller supplies every server-bound value.
- [ ] All IDs, indexes, names, and data mappings used by examples are valid.
- [ ] Custom-tool schemas and runtime inputs are validated.
- [ ] Custom-tool output is JSON-safe.
- [ ] Direct execution is limited to diagnostics, tests, or requested workflows.
- [ ] Registration is automatic.
- [ ] No registration call, registration button, fabricated output, or fake model-context UI is generated.
