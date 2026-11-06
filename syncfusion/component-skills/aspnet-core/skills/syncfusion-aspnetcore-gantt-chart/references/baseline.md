---
layout: post
title: Baseline in ASP.NET Core Syncfusion Gantt Component
description: Learn how to implement baseline feature in Syncfusion ASP.NET Core Gantt component. Compare original planned schedules with actual task execution timelines for comprehensive project tracking.
platform: ej2-asp-core-mvc
control: Baseline
publishingplatform: aspnet-core
---

# Baseline in ASP.NET Core Syncfusion Gantt Component

## Table of Contents

- [Overview](#overview)
- [Baseline Fields](#baseline-fields)
- [Implementing Baseline](#implementing-baseline)
- [Configuring Baseline Display](#configuring-baseline-display)
- [Baseline Milestones](#baseline-milestones)
- [Customizing Baseline Appearance](#customizing-baseline-appearance)
- [Baseline Templates](#baseline-templates)
- [Multiple Baseline Rendering](#multiple-baseline-rendering)

## Overview

The baseline feature in the Gantt component enables comparison between original planned schedules and actual task execution timelines. This visualization provides clear insights into schedule deviations, helping assess project performance and identify areas requiring attention. Baseline functionality displays both the original planned timeline and current progress side-by-side for comprehensive project tracking.

Before implementing baseline functionality, ensure the data source includes baseline date fields and configure the `taskFields` object with appropriate field mappings. The baseline feature requires proper field mapping to display planned versus actual timelines effectively.

## Baseline Fields

Three key fields control baseline behavior in your data model:

- **`baselineStartDate`**: Represents the originally planned start date of a task. This value is used to compare against the actual start date to identify schedule deviations.
- **`baselineEndDate`**: Represents the originally planned end date of a task. It is used to compare against the actual end date.
- **`baselineDuration`**: Represents the total planned duration of the task. This value is critical for baseline visualization. To represent a baseline milestone, this property must be explicitly set to `0`. Setting `baselineStartDate` and `baselineEndDate` to the same value without setting `baselineDuration` to `0` will result in a one-day baseline task, not a milestone.

## Implementing Baseline

To enable baseline, configure the Gantt component by setting `renderBaseline` to `true`, mapping `baselineStartDate`, `baselineEndDate`, and optionally `baselineDuration` in `taskFields`.

### Step 1: Update Your Data Model

Add baseline date fields to your `GanttDataSource` class:

```csharp
public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentID { get; set; }
    
    // Baseline fields
    public DateTime BaselineStartDate { get; set; }
    public DateTime BaselineEndDate { get; set; }
    public int? BaselineDuration { get; set; }
}
```

### Step 2: Configure Task Fields in CSHTML

Map the baseline fields in your Gantt tag helper:

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection" 
           height="450px"
           renderBaseline="true"
           projectStartDate="03/31/2019"
           projectEndDate="05/31/2019">
    
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        endDate="EndDate"
                        duration="Duration"
                        progress="Progress"
                        parentID="ParentID"
                        baselineStartDate="BaselineStartDate"
                        baselineEndDate="BaselineEndDate"
                        baselineDuration="BaselineDuration">
    </e-gantt-taskfields>
    
    <e-gantt-columns>
        <e-gantt-column field="TaskId" isPrimaryKey="true"></e-gantt-column>
        <e-gantt-column field="TaskName"></e-gantt-column>
        <e-gantt-column field="StartDate"></e-gantt-column>
        <e-gantt-column field="EndDate"></e-gantt-column>
        <e-gantt-column field="BaselineStartDate"></e-gantt-column>
        <e-gantt-column field="BaselineEndDate"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Step 3: Populate Baseline Data

In your controller/page model, set baseline dates for your tasks:

```csharp
// ~/Pages/Index.cshtml.cs
public void OnGet()
{
    GanttDataSourceCollection = GetTaskCollection();
}

private List<GanttDataSource> GetTaskCollection()
{
    return new List<GanttDataSource>()
    {
        new GanttDataSource
        {
            TaskId = 1,
            TaskName = "Project initiation",
            StartDate = new DateTime(2019, 03, 29),
            EndDate = new DateTime(2019, 04, 21),
            BaselineStartDate = new DateTime(2019, 03, 31),
            BaselineEndDate = new DateTime(2019, 04, 21),
            BaselineDuration = 20
        },
        new GanttDataSource
        {
            TaskId = 2,
            TaskName = "Identify site location",
            StartDate = new DateTime(2019, 04, 02),
            Duration = 4,
            Progress = 50,
            ParentID = 1,
            BaselineStartDate = new DateTime(2019, 04, 02),
            BaselineEndDate = new DateTime(2019, 04, 06),
            BaselineDuration = 4
        },
        new GanttDataSource
        {
            TaskId = 7,
            TaskName = "List materials",
            StartDate = new DateTime(2019, 04, 04),
            Duration = 3,
            Progress = 50,
            ParentID = 5,
            BaselineStartDate = new DateTime(2019, 04, 02),
            BaselineEndDate = new DateTime(2019, 04, 04),
            BaselineDuration = 2
        }
    };
}
```

## Configuring Baseline Display

### Enable Baseline Rendering

Set the `renderBaseline` property to `true` on the Gantt component:

```cshtml
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection" 
           renderBaseline="true"
           height="450px">
</ejs-gantt>
```

### Customize Baseline Color

Use the `baselineColor` property to set the color of baseline bars:

```cshtml
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection" 
           renderBaseline="true"
           baselineColor="red"
           height="450px">
</ejs-gantt>
```

Alternative colors: `blue`, `green`, `orange`, `#FF5733`, `rgb(255, 87, 51)`, etc.

## Baseline Milestones

To display a baseline milestone (zero-duration baseline), explicitly set `baselineDuration` to `0`:

```csharp
new GanttDataSource
{
    TaskId = 8,
    TaskName = "Estimation approval",
    StartDate = new DateTime(2019, 04, 04),
    Duration = 0,
    Progress = 50,
    ParentID = 5,
    BaselineStartDate = new DateTime(2019, 04, 02),
    BaselineEndDate = new DateTime(2019, 04, 02),
    BaselineDuration = 0  // Explicit: This is a baseline milestone
}
```

**Important**: Simply setting `baselineStartDate` and `baselineEndDate` to the same value without explicitly setting `baselineDuration` to `0` will result in a one-day baseline task, not a milestone.

## Customizing Baseline Appearance

### CSS Class Styling

Customize baseline bars using the `.e-baseline-bar` CSS class:

```css
.e-gantt .e-gantt-chart .e-baseline-bar {
  height: 4px;
  border-radius: 2px;
  opacity: 0.9;
  background-color: #4caf50;
}
```

### Dynamic Styling via queryTaskbarInfo

While `queryTaskbarInfo` primarily targets taskbar styling, you can use it in conjunction with your baseline configuration:

```cshtml
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection"
           renderBaseline="true"
           height="450px"
           queryTaskbarInfo="@Url.Page("Index", "QueryTaskbarInfo")">
</ejs-gantt>

<script>
    function queryTaskbarInfo(args) {
        // Customize taskbar styling
        if (args.data.Progress > 50) {
            args.taskbarBgColor = '#ff7575';
        }
    }
</script>
```

## Baseline Templates

The `baselineTemplate` property allows customization of baseline rendering by replacing the default baseline UI with a custom HTML structure. This enables advanced scenarios such as rendering additional baseline elements, visual indicators, or multiple baselines using task-specific data.

### Basic Baseline Template

Set the `baselineTemplate` property with a template string:

```cshtml
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection"
           renderBaseline="true"
           height="450px"
           baselineTemplate="#baselinetemplate">
</ejs-gantt>

<script id="baselinetemplate" type="text/x-jsrender">
    <div style="background-color: rgba(76, 175, 80, 0.5); height: 100%; border-bottom: 2px solid green;">
        <span style="font-size: 12px; padding: 5px;">Baseline</span>
    </div>
</script>
```

### Custom Baseline Visual Indicator

Create a more sophisticated baseline template with visual indicators:

```cshtml
<script id="baselinetemplate" type="text/x-jsrender">
    <div style="height: 100%; background: linear-gradient(to right, rgba(76, 175, 80, 0.3), rgba(76, 175, 80, 0.6)); position: relative;">
        <span style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #333;">
            Planned: {{:baselineStartDate | dateFormat:'MMM dd'}} - {{:baselineEndDate | dateFormat:'MMM dd'}}
        </span>
    </div>
</script>
```

## Multiple Baseline Rendering

By default, the Gantt component supports a single baseline per task. However, using the `baselineTemplate`, you can extend this behavior to render multiple baselines by maintaining additional baseline data within a custom field in your data source.

This enables rich visualization scenarios such as:

- Comparing original vs revised schedules
- Visualizing multiple planning phases
- Highlighting deviations across timeline checkpoints

### Implementation Steps

#### Step 1: Update Data Model

Add additional baseline fields to your data class:

```csharp
public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentID { get; set; }
    
    // Primary baseline
    public DateTime BaselineStartDate { get; set; }
    public DateTime BaselineEndDate { get; set; }
    public int? BaselineDuration { get; set; }
    
    // Additional baselines (for multiple baseline rendering)
    public List<BaselinePhase> BaselinePhases { get; set; }
}

public class BaselinePhase
{
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Color { get; set; }
}
```

#### Step 2: Populate Multiple Baseline Data

```csharp
new GanttDataSource
{
    TaskId = 1,
    TaskName = "Project initiation",
    StartDate = new DateTime(2019, 03, 29),
    EndDate = new DateTime(2019, 04, 21),
    BaselineStartDate = new DateTime(2019, 03, 31),
    BaselineEndDate = new DateTime(2019, 04, 21),
    BaselineDuration = 20,
    BaselinePhases = new List<BaselinePhase>
    {
        new BaselinePhase { Name = "Original Plan", StartDate = new DateTime(2019, 03, 31), EndDate = new DateTime(2019, 04, 21), Color = "#4caf50" },
        new BaselinePhase { Name = "Revised Plan", StartDate = new DateTime(2019, 03, 25), EndDate = new DateTime(2019, 04, 28), Color = "#ff9800" }
    }
}
```

#### Step 3: Create Template with Multiple Baseline Rendering

```cshtml
<ejs-gantt id='Gantt' 
           dataSource="Model.GanttDataSourceCollection"
           renderBaseline="true"
           height="450px"
           baselineTemplate="#multipleBaselineTemplate">
</ejs-gantt>

<script id="multipleBaselineTemplate" type="text/x-jsrender">
    {{if baselinePhases && baselinePhases.length}}
        {{for baselinePhases}}
            <div style="height: 50%; background-color: {{:color}}; opacity: 0.6; border-bottom: 1px solid #333;">
                <span style="font-size: 10px; padding: 2px;">{{:name}}</span>
            </div>
        {{/for}}
    {{else}}
        <div style="height: 100%; background-color: #4caf50; opacity: 0.5;"></div>
    {{/if}}
</script>
```

### Key Template Considerations

- The template receives the task data object
- Use `{{:propertyName}}` syntax for data binding
- Support conditional rendering with `{{if condition}}`
- Use `{{for array}}` to iterate over multiple baselines
- Ensure height and positioning work within the timeline cell context
- Apply appropriate opacity for visual layering