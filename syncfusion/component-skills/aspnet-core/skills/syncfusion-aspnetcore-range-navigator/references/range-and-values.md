# Range Selection and Values

## Table of Contents

- [Range Selection Methods](#range-selection-methods)
  - [1. Dragging Thumbs](#1-dragging-thumbs)
  - [2. Tapping on Labels](#2-tapping-on-labels)
  - [3. Setting Programmatically](#3-setting-programmatically)
- [Programmatic Range Setting](#programmatic-range-setting)
  - [Setting Range in Code-Behind](#setting-range-in-code-behind)
  - [Updating Range via JavaScript](#updating-range-via-javascript)
- [Value Property](#value-property)
  - [DateTime Value](#datetime-value)
  - [Numeric Value](#numeric-value)
- [Deferred Updates](#deferred-updates)
  - [Without Deferred Update (Default)](#without-deferred-update-default)
  - [With Deferred Update](#with-deferred-update)
- [Snapping](#snapping)
  - [Snapping Enabled (Default)](#snapping-enabled-default)
  - [Snapping Disabled](#snapping-disabled)
- [Events and Change Detection](#events-and-change-detection)
  - [Changed Event](#changed-event)
  - [Loaded Event](#loaded-event)
  - [Tooltip Render Event](#tooltip-render-event)
- [Complete Example](#complete-example)

## Range Selection Methods

Users can select a range in three ways:

### 1. Dragging Thumbs

Users click and drag the left or right thumb (slider handle) to adjust the range.

```
┌────────────────────────────────────────┐
│   Original:                            │
│   ◄────────[Selected Range]──────►    │
│                                        │
│   After dragging right thumb:          │
│   ◄──────[Shorter Range]────►         │
└────────────────────────────────────────┘
```

This is the default interaction and works automatically without configuration.

### 2. Tapping on Labels

Users click on axis labels to set the range boundaries. This is automatically enabled.

```
┌────────────────────────────────────────┐
│   Labels: Jan  Feb  Mar  Apr  May      │
│   Click Jan and May to set range       │
│   ◄────────[Jan to May]────────►      │
└────────────────────────────────────────┘
```

### 3. Setting Programmatically

Set the range via the `value` property in code-behind or markup:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    value="@(new DateTime[]{new DateTime(2024, 3, 1), new DateTime(2024, 9, 1)})">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

The `value` property accepts an array of two values:
- `value[0]` = Start of range (left thumb)
- `value[1]` = End of range (right thumb)

## Programmatic Range Setting

### Setting Range in Code-Behind

Pass range data to your view and set the value programmatically:

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<ChartData> Data { get; set; }
    public DateTime[] RangeValue { get; set; }
    
    public void OnGet()
    {
        Data = GetData();
        
        // Set initial range (March 1 to September 1, 2024)
        RangeValue = new DateTime[]
        {
            new DateTime(2024, 3, 1),
            new DateTime(2024, 9, 1)
        };
    }
    
    private List<ChartData> GetData()
    {
        return new List<ChartData>
        {
            new ChartData { x = new DateTime(2024, 1, 1), y = 20 },
            new ChartData { x = new DateTime(2024, 2, 1), y = 30 },
            new ChartData { x = new DateTime(2024, 3, 1), y = 40 },
            new ChartData { x = new DateTime(2024, 4, 1), y = 35 },
            new ChartData { x = new DateTime(2024, 5, 1), y = 50 },
            new ChartData { x = new DateTime(2024, 6, 1), y = 60 },
            new ChartData { x = new DateTime(2024, 7, 1), y = 55 },
            new ChartData { x = new DateTime(2024, 8, 1), y = 70 },
            new ChartData { x = new DateTime(2024, 9, 1), y = 65 },
            new ChartData { x = new DateTime(2024, 10, 1), y = 75 },
            new ChartData { x = new DateTime(2024, 11, 1), y = 80 },
            new ChartData { x = new DateTime(2024, 12, 1), y = 85 }
        };
    }
}

public class ChartData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    value="@Model.RangeValue">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
```

### Updating Range via JavaScript

Update the range dynamically after the component is loaded:

```html
<!-- Set range on button click -->
<button onclick="setCustomRange()">Set Custom Range</button>

<ejs-rangenavigator id="rangeNavigator" valueType="DateTime">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<script>
    function setCustomRange() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        
        // Set new range
        rangeObj.value = [
            new Date(2024, 2, 1),    // March 1, 2024 (month is 0-indexed)
            new Date(2024, 8, 1)     // September 1, 2024
        ];
    }
</script>
```

## Value Property

### DateTime Value

For DateTime valueType, use JavaScript Date objects or .NET DateTime:

```csharp
// In C# code-behind
RangeValue = new DateTime[]
{
    new DateTime(2024, 3, 15),    // March 15, 2024
    new DateTime(2024, 6, 30)     // June 30, 2024
};
```

```javascript
// In JavaScript
rangeObj.value = [
    new Date(2024, 2, 15),    // March 15, 2024
    new Date(2024, 5, 30)     // June 30, 2024
];
```

### Numeric Value

For Double/Numeric valueType, use numeric values:

```csharp
// In C# code-behind
public double[] NumericRange { get; set; }

public void OnGet()
{
    NumericRange = new double[] { 10, 80 };  // Start: 10, End: 80
}
```

```cshtml
<!-- In Razor -->
<ejs-rangenavigator valueType="Double" value="@Model.NumericRange">
</ejs-rangenavigator>
```

## Deferred Updates

By default, the `changed` event fires continuously while dragging the thumbs. Use `enableDeferredUpdate` to fire the event only when the user releases the thumb.

### Without Deferred Update (Default)

Events fire while dragging:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    enableDeferredUpdate="false" 
    changed="onRangeChanged">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>

<script>
    function onRangeChanged(args) {
        console.log('Range changed:', args.start, args.end);
        // This fires many times while dragging
    }
</script>
```

### With Deferred Update

Events fire only after releasing:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    enableDeferredUpdate="true" 
    changed="onRangeChanged">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>

<script>
    function onRangeChanged(args) {
        console.log('Range finalized:', args.start, args.end);
        // This fires only once after user finishes dragging
    }
</script>
```

**When to use:**
- `enableDeferredUpdate="true"` - When updating UI is expensive (charts, API calls, data processing)
- `enableDeferredUpdate="false"` - For real-time, responsive feedback

## Snapping

The `allowSnapping` property determines where the thumbs can be positioned.

### Snapping Enabled (Default)

Thumbs snap to the nearest interval:

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    allowSnapping="true" 
    interval="1" 
    intervalType="Months">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

The thumbs align to month boundaries (1st of each month).

```
Without Snapping: ◄───────────[Mar 15 - Aug 20]──────────►
With Snapping:    ◄───────────[Mar 1 - Aug 1]───────────►
```

### Snapping Disabled

Thumbs can be placed anywhere:

```cshtml
<ejs-rangenavigator valueType="DateTime" 
    allowSnapping="false">
    <!-- ... series configuration ... -->
</ejs-rangenavigator>
```

Users can drag thumbs to any exact date/value.

**When to use:**
- `allowSnapping="true"` - When you want alignment to intervals (months, years, etc.)
- `allowSnapping="false"` - For precise control over exact dates or values

## Events and Change Detection

### Changed Event

Fires when the range selection changes:

```cshtml
<ejs-rangenavigator id="rangeNavigator" changed="onRangeChanged">
    <!-- ... configuration ... -->
</ejs-rangenavigator>

<script>
    function onRangeChanged(args) {
        console.log('Start:', args.start);
        console.log('End:', args.end);
        console.log('Label:', args.label);
    }
</script>
```

**Event arguments:**
- `args.start` - Start date/value
- `args.end` - End date/value
- `args.label` - Formatted label

### Synchronizing Chart with RangeNavigator

The `changed` event can be used to synchronize a chart with the RangeNavigator selection. When the user moves or resizes the selected range, the chart updates automatically using the `zoomFactor` and `zoomPosition` properties of the chart axis.

```cshtml
<!-- Area Chart -->
<ejs-chart id="areaChart">
    <e-chart-primaryxaxis valueType="DateTime">
    </e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@Model.Data"
                  xName="x"
                  yName="y"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.xArea">
        </e-series>
    </e-series-collection>
</ejs-chart>
<!-- Range Navigator -->
<ejs-rangenavigator id="rangeNavigator"
                    valueType="DateTime"
                    changed="rangeChanged">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries
            dataSource="@Model.Data"
            xName="x"
            yName="y"
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>
<script>
    function rangeChanged(args) {
        var chart = document.getElementById('areaChart').ej2_instances[0];
        // Synchronize chart zoom with selected range
        chart.primaryXAxis.zoomFactor = args.zoomFactor;
        chart.primaryXAxis.zoomPosition = args.zoomPosition;
        chart.dataBind();
    }
</script>
```

### Loaded Event

Fires when component is fully initialized:

```cshtml
<ejs-rangenavigator loaded="onLoaded">
    <!-- ... configuration ... -->
</ejs-rangenavigator>

<script>
    function onLoaded(args) {
        console.log('RangeNavigator loaded and ready');
    }
</script>
```

### Tooltip Render Event

Fires when tooltip is about to render:

```cshtml
<ejs-rangenavigator tooltipRender="onTooltipRender">
    <!-- ... configuration ... -->
</ejs-rangenavigator>

<script>
    function onTooltipRender(args) {
        // Customize tooltip content
        args.text = "Custom: " + args.text;
    }
</script>
```

## Complete Example

```csharp
// Code-behind (IndexModel.cs)
public class IndexModel : PageModel
{
    public List<ChartData> Data { get; set; }
    public DateTime[] RangeValue { get; set; }
    
    public void OnGet()
    {
        Data = GenerateData();
        RangeValue = new DateTime[]
        {
            new DateTime(2024, 3, 1),
            new DateTime(2024, 8, 1)
        };
    }
    
    private List<ChartData> GenerateData()
    {
        var data = new List<ChartData>();
        for (int i = 0; i < 12; i++)
        {
            data.Add(new ChartData
            {
                x = new DateTime(2024, i + 1, 1),
                y = 20 + (i * 5)
            });
        }
        return data;
    }
}

public class ChartData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}
```

```cshtml
<!-- Razor page (Index.cshtml) -->
<h4>Range Selector with Controls</h4>

<div style="margin-bottom: 10px;">
    <button onclick="setQ1Range()">Set Q1 (Jan-Mar)</button>
    <button onclick="setQ2Range()">Set Q2 (Apr-Jun)</button>
    <button onclick="setH2Range()">Set H2 (Jul-Dec)</button>
</div>

<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    value="@Model.RangeValue" 
    enableDeferredUpdate="true" 
    allowSnapping="true" 
    interval="1" 
    intervalType="Months" 
    changed="onRangeChanged">
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
</ejs-rangenavigator>

<p id="rangeInfo">Selected Range: -</p>

<script>
    function setQ1Range() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.value = [new Date(2024, 0, 1), new Date(2024, 2, 31)];
    }
    
    function setQ2Range() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.value = [new Date(2024, 3, 1), new Date(2024, 5, 30)];
    }
    
    function setH2Range() {
        var rangeObj = document.getElementById('rangeNavigator').ej2_instances[0];
        rangeObj.value = [new Date(2024, 6, 1), new Date(2024, 11, 31)];
    }
    
    function onRangeChanged(args) {
        var rangeInfo = document.getElementById('rangeInfo');
        rangeInfo.innerText = 'Selected Range: ' + args.start + ' to ' + args.end;
    }
</script>
```

This example shows:
- Initial range set to March-August
- Buttons to set predefined ranges (Q1, Q2, H2)
- Deferred update enabled for single event on release
- Snapping enabled for monthly alignment
- Display of selected range via changed event
