# Special Time Regions

This reference covers configuring `SpecialTimeRegion` to highlight non-working hours, lunch breaks, blackout windows, and similar blocks on the WinUI Scheduler.

## Table of Contents
- [Overview](#overview)
- [SpecialTimeRegion Class](#specialtimeregion-class)
- [Where Special Time Regions Apply](#where-special-time-regions-apply)
- [Showing Regions in TimelineMonth](#showing-regions-in-timelinemonth)
- [Recurring Special Time Regions](#recurring-special-time-regions)
- [Merging Adjacent Regions](#merging-adjacent-regions)
- [Resource Scoping](#resource-scoping)
- [Customizing Visuals](#customizing-visuals)
- [Interaction Restrictions (CanEdit)](#interaction-restrictions-canedit)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

`SpecialTimeRegion` is a visual block rendered over the time slots of the WinUI Scheduler. Common uses include:

- Non-working hours (e.g., 6 PM – 8 AM)
- Lunch breaks or shift-change markers
- Maintenance windows or blackout periods
- Holiday shading

A region is owned by `DaysViewSettings.SpecialTimeRegions` (Day, Week, WorkWeek) or `TimelineViewSettings.SpecialTimeRegions` (TimelineDay, TimelineWeek, TimelineWorkWeek, TimelineMonth — opt-in via `ShowMonthTimeRegions`).

## SpecialTimeRegion Class

### Essential Properties

| Property | Type | Description |
|----------|------|-------------|
| `StartTime` | `DateTime` | Inclusive start of the region. In TimelineMonth, only the date portion is used. |
| `EndTime` | `DateTime` | End of the region. In TimelineMonth, only the date portion is used. |
| `Text` | `string` | Text rendered inside the region. Default: `string.Empty`. |
| `Background` | `Brush` | Background fill. Default: theme-defined neutral fill. |
| `Foreground` | `Brush` | Text/foreground color. Default: theme-defined text color. |
| `CanEdit` | `bool` | When `false`, blocks appointment creation, drag, resize, and selection inside the region. Default: `true`. |
| `CanMergeAdjacentRegions` | `bool` | Merge same-pattern regions across consecutive days in Week/WorkWeek views. Default: `false`. |
| `RecurrenceRule` | `string` | iCal `RRULE` string. Default: `null`. |
| `RecurrenceExceptionDates` | `ObservableCollection<DateTime>` | Exception dates for the recurrence. |
| `ResourceIdCollection` | `ObservableCollection<object>` | Limit the region to specific resource IDs (WPF/WinUI). |

> WPF only: `SpecialTimeRegion.Id` is assigned automatically and is used internally to look up the
> region in `SpecialTimeRegions` during virtualization and rendering. Treat it as read-only.

## Where Special Time Regions Apply

`SpecialTimeRegions` are configured on the appropriate view settings:

- **Day, Week, WorkWeek views** → `Schedule.DaysViewSettings.SpecialTimeRegions`
- **TimelineDay, TimelineWeek, TimelineWorkWeek** → `Schedule.TimelineViewSettings.SpecialTimeRegions` (rendered by default)
- **TimelineMonth** → `Schedule.TimelineViewSettings.SpecialTimeRegions` (rendered **only when** `ShowMonthTimeRegions = true`)
- **Month** → Special time regions are **not** rendered.

```xml
<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings>
            <scheduler:DaysViewSettings.SpecialTimeRegions>
                <ObservableCollection x:TypeArguments="scheduler:SpecialTimeRegion">
                    <scheduler:SpecialTimeRegion
                        StartTime="2026-06-15T12:00:00"
                        EndTime="2026-06-15T13:00:00"
                        Text="Lunch"
                        Background="Orange" />
                </ObservableCollection>
            </scheduler:DaysViewSettings.SpecialTimeRegions>
        </scheduler:DaysViewSettings>
    </scheduler:SfScheduler.DaysViewSettings>

    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings>
            <scheduler:TimelineViewSettings.SpecialTimeRegions>
                <ObservableCollection x:TypeArguments="scheduler:SpecialTimeRegion">
                    <scheduler:SpecialTimeRegion
                        StartTime="2026-06-15T18:00:00"
                        EndTime="2026-06-15T22:00:00"
                        Text="Maintenance"
                        CanEdit="False" />
                </ObservableCollection>
            </scheduler:TimelineViewSettings.SpecialTimeRegions>
        </scheduler:TimelineViewSettings>
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
// Day / Week / WorkWeek
Schedule.DaysViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 15, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 15, 13, 0, 0),
    Text      = "Lunch",
    Background = new SolidColorBrush(Colors.Orange)
});

// TimelineDay / TimelineWeek / TimelineWorkWeek
Schedule.TimelineViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 15, 18, 0, 0),
    EndTime   = new DateTime(2026, 6, 15, 22, 0, 0),
    Text      = "Maintenance",
    CanEdit   = false
});
```

## Showing Regions in TimelineMonth

By default, `TimelineViewSettings.SpecialTimeRegions` are **not** rendered in `TimelineMonth`. Enable
them with the `ShowMonthTimeRegions` flag. When enabled, regions render as date-column-spanning
blocks and the **time-of-day** portion of `StartTime`/`EndTime` is ignored.

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="TimelineMonth">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings ShowMonthTimeRegions="True">
            <scheduler:TimelineViewSettings.SpecialTimeRegions>
                <ObservableCollection x:TypeArguments="scheduler:SpecialTimeRegion">
                    <scheduler:SpecialTimeRegion
                        StartTime="2026-06-10"
                        EndTime="2026-06-15"
                        Text="Maintenance Window"
                        CanEdit="False" />
                </ObservableCollection>
            </scheduler:TimelineViewSettings.SpecialTimeRegions>
        </scheduler:TimelineViewSettings>
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.ViewType = SchedulerViewType.TimelineMonth;
Schedule.TimelineViewSettings.ShowMonthTimeRegions = true;
Schedule.TimelineViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 10),
    EndTime   = new DateTime(2026, 6, 15),
    Text      = "Maintenance Window",
    CanEdit   = false
});
```

Notes:
- `ShowMonthTimeRegions` defaults to `false` and only takes effect in `TimelineMonth` view.
- The `Background` and `Text` properties drive the visual appearance of the region.
- `CanEdit = false` blocks appointment drag-drop and resize inside the region in TimelineMonth view.

See [timeline-views.md](timeline-views.md#timeline-month--special-time-regions) for additional context.

## Recurring Special Time Regions

Use `RecurrenceRule` (iCal `RRULE` string) and `RecurrenceExceptionDates` to make a region repeat:

```csharp
var lunch = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 15, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 15, 13, 0, 0),
    Text      = "Lunch",
    Background = new SolidColorBrush(Colors.Orange),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1"
};

// Exclude a specific occurrence
lunch.RecurrenceExceptionDates.Add(new DateTime(2026, 6, 19)); // No lunch on Friday
```

Common rules:
- `FREQ=DAILY;INTERVAL=1` — every day
- `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` — weekdays only
- `FREQ=WEEKLY;INTERVAL=2` — every two weeks

## Merging Adjacent Regions

`CanMergeAdjacentRegions = true` merges regions that share the same `RecurrenceRule` and time-of-day
across consecutive visible days into a single block (in Day, Week, and WorkWeek views). Useful for
cleanly shading non-working hours across a multi-day view.

```csharp
var nonWorkingHours = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 1, 18, 0, 0),
    EndTime   = new DateTime(2026, 6, 1, 24, 0, 0),
    Background = new SolidColorBrush(Color.FromArgb(255, 245, 245, 245)),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1",
    CanMergeAdjacentRegions = true,
    CanEdit = false
};
```

**Rules for merging:**
- The regions must share the same `RecurrenceRule` and time-of-day.
- Regions with the same rule but non-consecutive days (e.g., alternate days) are **not** merged.
- Only applies to Day, Week, and WorkWeek views.

## Resource Scoping

Use `ResourceIdCollection` to restrict a region to one or more resources when
`ResourceCollection` is set on the scheduler and `ResourceGroupType` is `Resource`. Resources
whose IDs are not in the collection will not see the region.

```csharp
var lunch = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 15, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 15, 13, 0, 0),
    Text      = "Lunch",
    Background = new SolidColorBrush(Colors.Orange),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1",
    ResourceIdCollection = new ObservableCollection<object> { "0", "1", "2" }
};
```

If `ResourceCollection` is set but a region's `ResourceIdCollection` is empty or `null`, the region
is not added for any resource.

## Customizing Visuals

Use `SpecialTimeRegionTemplate` (single template) or `SpecialTimeRegionTemplateSelector`
(template chooser) on `DaysViewSettings` / `TimelineViewSettings` to fully customize the
region's appearance and behavior.

```xml
<scheduler:TimelineViewSettings ShowMonthTimeRegions="True">
    <scheduler:TimelineViewSettings.SpecialTimeRegionTemplate>
        <DataTemplate>
            <Border Background="{Binding Background}"
                    BorderBrush="DarkOrange"
                    BorderThickness="2"
                    CornerRadius="4">
                <StackPanel VerticalAlignment="Center"
                            HorizontalAlignment="Center">
                    <TextBlock Text="{Binding Text}"
                               FontWeight="SemiBold"
                               Foreground="{Binding Foreground}" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </scheduler:TimelineViewSettings.SpecialTimeRegionTemplate>
</scheduler:TimelineViewSettings>
```

For conditional templates, implement a `DataTemplateSelector`:

```csharp
public class SpecialTimeRegionTemplateSelector : DataTemplateSelector
{
    public DataTemplate EditableTemplate { get; set; }
    public DataTemplate ReadOnlyTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
    {
        if (item is SpecialTimeRegion region && !region.CanEdit)
        {
            return ReadOnlyTemplate;
        }
        return EditableTemplate;
    }
}
```

```xml
<Window.Resources>
    <DataTemplate x:Key="specialRegionEditable">
        <Grid Background="{Binding Background}" Opacity="0.5" />
    </DataTemplate>
    <DataTemplate x:Key="specialRegionReadOnly">
        <Grid Background="{Binding Background}" Opacity="0.5">
            <Image Source="/Assets/Scheduler/Lock.png"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center" />
        </Grid>
    </DataTemplate>
    <local:SpecialTimeRegionTemplateSelector x:Key="specialTimeRegionTemplateSelector"
                                             EditableTemplate="{StaticResource specialRegionEditable}"
                                             ReadOnlyTemplate="{StaticResource specialRegionReadOnly}" />
</Window.Resources>

<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.TimelineViewSettings>
        <scheduler:TimelineViewSettings
            SpecialTimeRegionTemplateSelector="{StaticResource specialTimeRegionTemplateSelector}" />
    </scheduler:SfScheduler.TimelineViewSettings>
</scheduler:SfScheduler>
```

## Interaction Restrictions (CanEdit)

When `CanEdit = false`, the region is **non-interactive**:

- Users cannot click-and-drag to create a new appointment inside it.
- Existing appointments cannot be dragged or resized into it (the drag-and-drop controller
  treats the region as a drop-restricted surface).
- Selection of underlying time slots is suppressed.

This is the recommended setting for blackout windows, holidays, and maintenance periods.

## Common Patterns

### Pattern 1: Daily Lunch Break

```csharp
Schedule.DaysViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 1, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 1, 13, 0, 0),
    Text      = "Lunch",
    Background = new SolidColorBrush(Colors.Orange),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1",
    CanEdit = false
});
```

### Pattern 2: Weekday Work Hours Shading

```csharp
// Shaded non-working hours for a 9-to-5 schedule, weekdays only
var morningGap = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 1, 0, 0, 0),
    EndTime   = new DateTime(2026, 6, 1, 9, 0, 0),
    Background = new SolidColorBrush(Color.FromArgb(255, 245, 245, 245)),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
    CanMergeAdjacentRegions = true,
    CanEdit = false
};

var eveningGap = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 1, 17, 0, 0),
    EndTime   = new DateTime(2026, 6, 1, 23, 59, 59),
    Background = new SolidColorBrush(Color.FromArgb(255, 245, 245, 245)),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
    CanMergeAdjacentRegions = true,
    CanEdit = false
};

Schedule.DaysViewSettings.SpecialTimeRegions.Add(morningGap);
Schedule.DaysViewSettings.SpecialTimeRegions.Add(eveningGap);
```

### Pattern 3: Month-Long Maintenance Window

```csharp
Schedule.ViewType = SchedulerViewType.TimelineMonth;
Schedule.TimelineViewSettings.ShowMonthTimeRegions = true;

Schedule.TimelineViewSettings.SpecialTimeRegions.Add(new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 10),
    EndTime   = new DateTime(2026, 6, 20),
    Text      = "Maintenance Window",
    Background = new SolidColorBrush(Colors.OrangeRed) { Opacity = 0.4 },
    CanEdit   = false
});
```

### Pattern 4: Resource-Specific Lunch Break

```csharp
// Resources named "0".."6" see the lunch break; everyone else doesn't.
var lunch = new SpecialTimeRegion
{
    StartTime = new DateTime(2026, 6, 1, 12, 0, 0),
    EndTime   = new DateTime(2026, 6, 1, 13, 0, 0),
    Background = new SolidColorBrush(Colors.Orange),
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1",
    CanEdit = false,
    ResourceIdCollection = new ObservableCollection<object> { "0", "1", "2", "3", "4", "5", "6" }
};

Schedule.TimelineViewSettings.SpecialTimeRegions.Add(lunch);
```

### Pattern 5: Holiday Blackout with Custom Template

```csharp
// Use a DataTemplateSelector to differentiate blackout windows from regular shading.
Schedule.DaysViewSettings.SpecialTimeRegionTemplateSelector =
    new SpecialTimeRegionTemplateSelector { /* configured in XAML */ };
```

## Troubleshooting

### Special Time Region Not Visible

**Solutions:**
- For TimelineMonth, set `ShowMonthTimeRegions = true`.
- Confirm you are adding to the correct collection (`DaysViewSettings.SpecialTimeRegions` vs. `TimelineViewSettings.SpecialTimeRegions`).
- Verify the region's date range overlaps a visible date in the current view.
- For Month view, note that special time regions are **not** rendered — switch to a Day/Week/Timeline view.

### Region Visible but Blocked Clicks

**Cause:** `CanEdit = false`.

**Solution:** Set `CanEdit = true` if the region needs to be interactive, or accept the intended blackout behavior.

### Recurring Region Skips a Day

**Cause:** The day is listed in `RecurrenceExceptionDates`.

**Solution:** Remove the entry from `RecurrenceExceptionDates`, or check that the date you removed matches the expected local time of day for the exception.

### Resource-Scoped Region Not Showing

**Solutions:**
- Confirm the scheduler has `ResourceCollection` populated and `ResourceGroupType = Resource`.
- Verify the IDs in `ResourceIdCollection` match the IDs in `SchedulerResource.Id`.
- If `ResourceIdCollection` is `null` or empty while resources are configured, the region will not appear for any resource.

### Merged Region Splits in Week View

**Cause:** `CanMergeAdjacentRegions = true` only merges regions with the same `RecurrenceRule` and time-of-day.

**Solutions:**
- Ensure all regions to be merged share the same `RecurrenceRule`.
- Set identical `StartTime.TimeOfDay` and `EndTime.TimeOfDay` on the regions.
- Merging is only applied in Day/Week/WorkWeek views; it is not applied to Timeline views.

### Region Appears in Wrong Time Zone

**Cause:** `SpecialTimeRegion` values are interpreted in the scheduler's `TimeZone`. When the scheduler's `TimeZone` changes, the rendered position of time-based regions changes accordingly.

**Solution:** If you need a region to stay anchored to a specific local time-of-day, use the local time when constructing `StartTime`/`EndTime`. The scheduler converts the region's actual position internally using its `TimeZone`.