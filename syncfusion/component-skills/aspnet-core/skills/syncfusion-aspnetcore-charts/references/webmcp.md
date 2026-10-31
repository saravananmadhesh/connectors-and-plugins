# WebMCP Integration

## Table of Contents

- [Supported APIs](#supported-apis)
- [Strict AI Generation Rules](#strict-ai-generation-rules)
- [Complete Tag Helper Sample](#complete-tag-helper-sample)
- [Complete Fluent-Builder Sample](#complete-fluent-builder-sample)
- [Register All Built-In Tools](#register-all-built-in-tools)
- [AI Validation Checklist](#ai-validation-checklist)
- [Complete end-to-end ASP.NET Core guidance](#complete-end-to-end-aspnet-core-guidance)
- [Register all built-in tools](#register-all-built-in-tools-1)
- [Register specific built-in tools](#register-specific-built-in-tools)
- [Controller required by the samples](#controller-required-by-the-samples)
- [Complete fluent-builder patterns](#complete-fluent-builder-patterns)
- [Custom WebMCP tools](#custom-webmcp-tools)
- [Built-in and custom tools together](#built-in-and-custom-tools-together)
- [Confirmation, cancellation, and validation](#confirmation-cancellation-and-validation)
- [Direct tool execution](#direct-tool-execution)
- [Exact built-in tool names](#exact-built-in-tool-names)
- [Spoon-fed tool-by-tool ASP.NET Core guidance](#spoon-fed-tool-by-tool-aspnet-core-guidance)
- [Required generation scenarios](#required-generation-scenarios)
- [Final validation checklist](#final-validation-checklist)

Use this reference when generating Syncfusion ASP.NET Core Chart samples with WebMCP.

## Supported APIs

- `EnableWebMcp`
- `WebMcpSettings`
- `BeforeWebMcpToolExecute`
- `ChartBuilder.EnableWebMcp(...)`
- `ChartBuilder.WebMcpSettings(...)`
- `ChartBuilder.BeforeWebMcpToolExecute(...)`

## Strict AI Generation Rules

1. Set `enableWebMcp="true"` in Tag Helper samples or call `.EnableWebMcp(true)` in fluent-builder samples.
2. Give the Chart a stable and unique ID.
3. Use `webMcpSettings` when a custom prefix, selected tool list, custom tools, or exposure restrictions are required.
4. Use the same `Tools` property for built-in tool names and application-specific custom tool objects. There is no separate `CustomTools` property.
5. Omit `Tools` when all built-in tools should be registered.
6. Use an explicit tool-name allowlist only for selected-tool or feature-tour samples.
7. Do not invent tool names.
8. Treat registration as automatic after Chart rendering.
9. Never call `registerWebMcpTools()`.
10. Never generate a registration button.
11. Use `beforeWebMcpToolExecute` only when execution validation, cancellation, auditing, or confirmation control is required.
12. Keep write-operation confirmation unless an intentional override is requested.
13. Do not generate fake model-context UI or fabricated tool responses.

## Complete Tag Helper Sample

### Index.cshtml

```cshtml
@using Syncfusion.EJ2.Charts
@{
    var webMcpSettings = new ChartWebMcpSettings
    {
        Name = "featureTourChart",
        Tools = new[]
        {
            "inspectChart",
            "getSeriesData",
            "showChartTooltip",
            "hideChartTooltip",
            "getChartAxes",
            "updateChartSeries"
        },
        ExposedTo = new[] { "assistant" }
    };
}

<ejs-chart id="feature-tour-chart"
           title="Chart WebMCP Feature Tour"
           enableWebMcp="true"
           webMcpSettings="webMcpSettings"
           beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    <e-chart-primaryxaxis title="Sample index" minimum="0" maximum="7" interval="1"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Value" minimum="0" maximum="100" interval="20"></e-chart-primaryyaxis>
    <e-chart-tooltipsettings enable="true" shared="true"></e-chart-tooltipsettings>
    <e-chart-crosshairsettings enable="true" lineType="@LineType.Both"></e-chart-crosshairsettings>
    <e-chart-legendsettings visible="true"></e-chart-legendsettings>
    <e-chart-zoomsettings enableSelectionZooming="true" enableMouseWheelZooming="true" enablePan="true">
    </e-chart-zoomsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Line"
                  xName="X" yName="Y" name="Observed values">
            <e-series-marker visible="true"></e-series-marker>
        </e-series>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Column"
                  xName="X" yName="Comparison" name="Comparison values">
        </e-series>
    </e-series-collection>
</ejs-chart>

<script>
    function beforeWebMcpToolExecute(args) {
        if (args.toolName.endsWith('_printChart')) {
            args.showConfirmationDialog = true;
        }
    }
</script>
```

### HomeController.cs

```csharp
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
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

## Complete Fluent-Builder Sample

```cshtml
@Html.EJS().Chart("feature-tour-chart")
    .Title("Chart WebMCP Feature Tour")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings
        .Name("featureTourChart")
        .Tools(new[]
        {
            "inspectChart",
            "getSeriesData",
            "showChartTooltip",
            "hideChartTooltip",
            "getChartAxes",
            "updateChartSeries"
        })
        .ExposedTo(new[] { "assistant" }))
    .BeforeWebMcpToolExecute("beforeWebMcpToolExecute")
    .Render()
```

## Register All Built-In Tools

Omit `Tools` when all built-in tools should be registered:

```cshtml
@{
    var webMcpSettings = new ChartWebMcpSettings
    {
        Name = "salesChart"
    };
}

<ejs-chart id="salesChart"
           enableWebMcp="true"
           webMcpSettings="webMcpSettings">
</ejs-chart>
```

## AI Validation Checklist

- [ ] The Chart has a stable ID.
- [ ] `enableWebMcp="true"` or `.EnableWebMcp(true)` is used.
- [ ] `webMcpSettings` is generated when a prefix, selected tools, custom tools, or exposure restrictions are needed.
- [ ] `Tools` is omitted when all built-in tools are required.
- [ ] Custom tools are supplied through `Tools` or `webMcpSettings.tools`; no separate `CustomTools` or `customTools` property is generated.
- [ ] Explicit tool names are verified.
- [ ] `ExposedTo` values come from the request or deployment environment.
- [ ] `beforeWebMcpToolExecute` is included only when execution handling is required.
- [ ] Registration is automatic.
- [ ] No `registerWebMcpTools()` call is generated.
- [ ] No manual registration button is generated.
- [ ] No fake model-context UI or fabricated response is generated.




## Complete end-to-end ASP.NET Core guidance

### Required project files

A complete MVC sample must include the Razor view and its controller. A Razor Pages sample must include both `Index.cshtml` and `Index.cshtml.cs`. Never reference server values without supplying the corresponding controller or PageModel.

### `_ViewImports.cshtml`

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

### `Views/Shared/_Layout.cshtml`

Place the Syncfusion script manager after the page content and after the required EJ2 client resources.

```cshtml
@RenderBody()
@Html.EJS().ScriptManager()
```

## Register all built-in tools

Omit `Tools` completely.

```cshtml
@using Syncfusion.EJ2.Charts
@{
    var webMcpSettings = new ChartWebMcpSettings
    {
        Name = "allToolsChart"
    };
}
<ejs-chart id="all-tools-chart" enableWebMcp="true" webMcpSettings="webMcpSettings">
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Line" xName="X" yName="Y"></e-series>
    </e-series-collection>
</ejs-chart>
```

## Register specific built-in tools

```cshtml
@using Syncfusion.EJ2.Charts
@{
    var webMcpSettings = new ChartWebMcpSettings
    {
        Name = "specificToolsChart",
        Tools = new[]
        {
            "inspectChart",
            "getSeriesData",
            "showChartTooltip",
            "hideChartTooltip",
            "updateChartDataSource"
        }
    };
}
<ejs-chart id="specific-tools-chart" enableWebMcp="true" webMcpSettings="webMcpSettings"
           beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    <e-chart-tooltipsettings enable="true"></e-chart-tooltipsettings>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Line" xName="X" yName="Y"></e-series>
    </e-series-collection>
</ejs-chart>
<script>
    function beforeWebMcpToolExecute(args) {
        if (args.toolName.endsWith('_updateChartDataSource')) {
            args.showConfirmationDialog = true;
        }
    }
</script>
```

## Controller required by the samples

```csharp
using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Index()
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

## Complete fluent-builder patterns

### All built-in tools

```cshtml
@Html.EJS().Chart("all-tools-chart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings.Name("allToolsChart"))
    .Render()
```

### Selected built-in tools

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
    .Render()
```

## Custom WebMCP tools

A custom tool needs a unique name, precise description, JSON input schema, runtime validation, executable browser function, and JSON-safe result. Do not return the Chart, a DOM element, an event, a function, a circular value, or an EJ2 class instance.

```cshtml
<ejs-chart id="custom-tool-chart" enableWebMcp="true">
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Line" xName="X" yName="Y"></e-series>
    </e-series-collection>
</ejs-chart>
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
                return { success: true, point: { index: point.index, x: point.x, y: point.yValue } };
            }
        }];
        chart.webMcpSettings = { name: 'customToolsChart', tools: customTools };
        chart.dataBind();
    });
</script>
```

## Built-in and custom tools together

Use the `tools` property for both selected built-in tools and application-specific custom tools. There is no separate `customTools` property. Retrieve the selected built-in tool objects from the rendered Chart, append the custom tool objects, and assign the combined array to `webMcpSettings.tools`.

```cshtml
<ejs-chart id="combined-tools-chart" enableWebMcp="true">
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" type="@ChartSeriesType.Line" xName="X" yName="Y"></e-series>
    </e-series-collection>
</ejs-chart>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var chart = document.getElementById('combined-tools-chart').ej2_instances[0];
        var selectedToolNames = [
            'inspectChart',
            'getSeriesData',
            'showChartTooltip',
            'hideChartTooltip'
        ];
        var customTool = {
            name: 'getPointCount',
            description: 'Returns the number of points in the requested Chart series.',
            inputSchema: {
                type: 'object',
                properties: {
                    seriesIndex: { type: 'number', description: 'Zero-based series index.' }
                },
                required: ['seriesIndex'],
                additionalProperties: false
            },
            execute: async function (input) {
                var series = chart.series[input.seriesIndex];
                if (!series) {
                    return { success: false, message: 'The requested series does not exist.' };
                }
                return {
                    success: true,
                    seriesIndex: input.seriesIndex,
                    pointCount: series.points ? series.points.length : 0
                };
            }
        };
        var tools = chart.getWebMcpTools(selectedToolNames);
        tools.push(customTool);
        chart.setProperties({
            webMcpSettings: {
                name: 'combinedToolsChart',
                tools: tools
            }
        }, false);
    });
</script>
```

Rules for combining built-in and custom tools:

- Do not use or generate a `customTools` property.
- Retrieve built-in tool objects with `getWebMcpTools(selectedToolNames)` after the Chart is rendered.
- Append each custom tool object to the returned built-in tool array.
- Assign the combined array through `webMcpSettings.tools` by using `setProperties()`.
- Use `tools: customTools` when registering only custom tools at runtime.
- Continue to use the server-side `Tools` property when passing a supported tool collection through `ChartWebMcpSettings`.

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

The registered name may include the configured prefix. Use `endsWith()` to match the operation. Validate IDs, indexes, axis names, annotation indexes, field mappings, export types, configuration objects, and application permissions.

## Direct tool execution

```javascript
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
```

Use direct execution only for diagnostics, tests, or an explicitly requested workflow. Do not add an execution button unless requested.

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

## Spoon-fed tool-by-tool ASP.NET Core guidance

### 1. `inspectChart`

**Selected-tool setting:**

```csharp
Tools = new[] { "inspectChart" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'inspectChart', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 2. `getSeriesData`

**Selected-tool setting:**

```csharp
Tools = new[] { "getSeriesData" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getSeriesData', { seriesIndex: 0 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 3. `addChartSeries`

**Selected-tool setting:**

```csharp
Tools = new[] { "addChartSeries" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartSeries', { series: { type: 'Line', dataSource: [{ x: 1, y: 20 }], xName: 'x', yName: 'y' } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 4. `removeChartSeries`

**Selected-tool setting:**

```csharp
Tools = new[] { "removeChartSeries" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartSeries', { seriesIndex: 1 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 5. `clearChartSeries`

**Selected-tool setting:**

```csharp
Tools = new[] { "clearChartSeries" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'clearChartSeries', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 6. `updateChartAnnotation`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartAnnotation" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartAnnotation', { annotationIndex: 0, annotation: { content: '<div>Updated</div>', x: 5, y: 58 } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 7. `showChartTooltip`

**Selected-tool setting:**

```csharp
Tools = new[] { "showChartTooltip" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'showChartTooltip', { seriesIndex: 0, pointIndex: 2 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 8. `showChartCrosshair`

**Selected-tool setting:**

```csharp
Tools = new[] { "showChartCrosshair" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'showChartCrosshair', { x: 250, y: 180 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 9. `exportChart`

**Selected-tool setting:**

```csharp
Tools = new[] { "exportChart" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'exportChart', { type: 'PNG', fileName: 'chart-export' });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 10. `printChart`

**Selected-tool setting:**

```csharp
Tools = new[] { "printChart" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'printChart', { elementIds: 'feature-tour-chart' });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 11. `updateChartDataSource`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartDataSource" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartDataSource', { seriesIndex: 0, dataSource: [{ x: 1, y: 40 }] });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 12. `toggleChartSeriesVisibility`

**Selected-tool setting:**

```csharp
Tools = new[] { "toggleChartSeriesVisibility" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'toggleChartSeriesVisibility', { seriesIndex: 0 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 13. `configureChartZoom`

**Selected-tool setting:**

```csharp
Tools = new[] { "configureChartZoom" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'configureChartZoom', { zoomSettings: { enableSelectionZooming: true, enablePan: true } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 14. `resetChartZoom`

**Selected-tool setting:**

```csharp
Tools = new[] { "resetChartZoom" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'resetChartZoom', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 15. `selectChartPoints`

**Selected-tool setting:**

```csharp
Tools = new[] { "selectChartPoints" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'selectChartPoints', { points: [{ seriesIndex: 0, pointIndex: 1 }] });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 16. `clearChartSelection`

**Selected-tool setting:**

```csharp
Tools = new[] { "clearChartSelection" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'clearChartSelection', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 17. `addChartAxis`

**Selected-tool setting:**

```csharp
Tools = new[] { "addChartAxis" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartAxis', { axis: { name: 'secondaryAxis', opposedPosition: true } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 18. `updateChartAxis`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartAxis" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartAxis', { axisName: 'primaryYAxis', axis: { maximum: 120 } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 19. `updateChartTitle`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartTitle" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartTitle', { title: 'Updated title' });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 20. `hideChartTooltip`

**Selected-tool setting:**

```csharp
Tools = new[] { "hideChartTooltip" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'hideChartTooltip', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 21. `hideChartCrosshair`

**Selected-tool setting:**

```csharp
Tools = new[] { "hideChartCrosshair" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'hideChartCrosshair', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 22. `updateChartProperties`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartProperties" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartProperties', { properties: { title: 'Updated properties', tooltip: { enable: true } } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 23. `updateChartSeries`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartSeries" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartSeries', { seriesIndex: 0, series: { type: 'Column' } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 24. `updateChartPoint`

**Selected-tool setting:**

```csharp
Tools = new[] { "updateChartPoint" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'updateChartPoint', { seriesIndex: 0, pointIndex: 2, point: { x: 3, y: 70 } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 25. `appendChartData`

**Selected-tool setting:**

```csharp
Tools = new[] { "appendChartData" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'appendChartData', { seriesIndex: 0, data: [{ x: 7, y: 80 }] });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 26. `removeChartPoints`

**Selected-tool setting:**

```csharp
Tools = new[] { "removeChartPoints" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartPoints', { seriesIndex: 0, pointIndexes: [1, 3] });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 27. `getChartPoint`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartPoint" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartPoint', { seriesIndex: 0, pointIndex: 2 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 28. `getSelectedChartData`

**Selected-tool setting:**

```csharp
Tools = new[] { "getSelectedChartData" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getSelectedChartData', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 29. `getChartAxes`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartAxes" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartAxes', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 30. `getChartIndicators`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartIndicators" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartIndicators', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 31. `getChartStriplines`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartStriplines" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartStriplines', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 32. `removeChartAxis`

**Selected-tool setting:**

```csharp
Tools = new[] { "removeChartAxis" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartAxis', { axisName: 'secondaryAxis' });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 33. `getChartAnnotations`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartAnnotations" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartAnnotations', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 34. `addChartAnnotation`

**Selected-tool setting:**

```csharp
Tools = new[] { "addChartAnnotation" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'addChartAnnotation', { annotation: { content: '<div>New</div>', x: 4, y: 65 } });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 35. `removeChartAnnotation`

**Selected-tool setting:**

```csharp
Tools = new[] { "removeChartAnnotation" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'removeChartAnnotation', { annotationIndex: 0 });
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 36. `animateChart`

**Selected-tool setting:**

```csharp
Tools = new[] { "animateChart" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'animateChart', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.

### 37. `getChartLegend`

**Selected-tool setting:**

```csharp
Tools = new[] { "getChartLegend" }
```

**Direct execution:**

```javascript
await executeTool('feature-tour-chart', 'getChartLegend', {});
```

**Requirements:** Keep the stable Chart ID, enable WebMCP, preserve automatic registration, validate every referenced target, and retain the Chart configuration required by the operation.


## Required generation scenarios

- Tag Helper with all built-in tools.
- Fluent builder with all built-in tools.
- Tag Helper with selected tools.
- Fluent builder with selected tools.
- Custom tools.
- Built-in and custom tools together.
- Confirmation, cancellation, and validation.
- Direct diagnostic execution.
- Controller or PageModel for all server-bound Razor values.

## Final validation checklist

- [ ] The Chart has a stable ID.
- [ ] Tag Helper uses `enableWebMcp="true"` or fluent builder uses `.EnableWebMcp(true)`.
- [ ] `Tools` is omitted for all-tools registration.
- [ ] Selected names are exact and case-sensitive.
- [ ] `ExposedTo` is included only when supplied by the request or environment.
- [ ] Automatic registration is preserved.
- [ ] No `registerWebMcpTools()` call or registration button exists.
- [ ] The controller or PageModel supplies every server-bound value.
- [ ] IDs, indexes, names, mappings, and configuration objects are valid.
- [ ] Write-operation confirmation remains unless intentionally overridden.
- [ ] Custom-tool schema and runtime input are validated.
- [ ] Custom-tool output is JSON-safe.
- [ ] No fake model-context UI or fabricated result is generated.

