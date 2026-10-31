# Quick Popup and Validation

## Table of Contents
- [Quick Popup Customization Combinations](#quick-popup-customization-combinations)
- [Disabling Quick Popups](#disabling-quick-popups)
- [More Events Popup](#more-events-popup)
- [Common Patterns](#common-patterns)


## Quick Popup Customization Combinations

Customize both cell and event quick popups with shared template:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Buttons
@using Syncfusion.Blazor.Inputs
@using System.Globalization

<SfSchedule TValue="AppointmentData"
            @ref="ScheduleRef"
            @bind-SelectedDate="@CurrentDate"
            CssClass="quick-popup-custom"
            Width="100%"
            Height="650px">

    <ScheduleQuickInfoTemplates TemplateType="TemplateType.Both">

        <HeaderTemplate>
            @{
                var data = context as AppointmentData;
                bool isEvent = data != null && data.Id > 0;
            }

            <div class="quick-header">
                <h3>@(isEvent ? data?.Subject : "New Event")</h3>
            </div>
        </HeaderTemplate>

        <ContentTemplate>
            @{
                var data = context as AppointmentData;
                bool isEvent = data != null && data.Id > 0;
            }

            <div class="quick-content">

                @if (isEvent)
                {
                    <div class="event-info">

                        <p>
                            <strong>@data?.Subject</strong>
                        </p>

                        <p>
                            @FormatTimeRange(
                                data?.StartTime,
                                data?.EndTime)
                        </p>

                        <p>
                            @(data?.IsAllDay == true
                                ? "All-day event"
                                : "Timed event")
                        </p>

                    </div>
                }
                else
                {
                    <div class="cell-info">

                        <div class="event-field">
                            <label>Subject:</label>

                            <SfTextBox @ref="SubjectRef"
                                       Placeholder="Enter subject">
                            </SfTextBox>
                        </div>

                        <div class="event-field">
                            <label>
                                Time:
                                @FormatTimeRange(
                                    data?.StartTime,
                                    data?.EndTime)
                            </label>
                        </div>

                    </div>
                }

            </div>
        </ContentTemplate>

        <FooterTemplate>
            @{
                var data = context as AppointmentData;
                bool isEvent = data != null && data.Id > 0;
            }

            <div class="quick-footer">

                @if (isEvent)
                {
                    <SfButton Content="Edit"
                              IsPrimary="true"
                              OnClick="@(args => EditEvent(data))">
                    </SfButton>

                    <SfButton Content="Delete"
                              CssClass="e-danger"
                              OnClick="@(args => DeleteEvent(data))">
                    </SfButton>
                }
                else
                {
                    <SfButton Content="Add"
                              IsPrimary="true"
                              OnClick="@(args => AddEvent(data))">
                    </SfButton>

                    <SfButton Content="Cancel"
                              OnClick="ClosePopup">
                    </SfButton>
                }

            </div>
        </FooterTemplate>

    </ScheduleQuickInfoTemplates>

    <ScheduleEventSettings DataSource="@DataSource">
    </ScheduleEventSettings>

    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>

</SfSchedule>

@code {

    private SfSchedule<AppointmentData>? ScheduleRef;

    private SfTextBox? SubjectRef;

    DateTime CurrentDate = new DateTime(2026, 3, 24);

    List<AppointmentData> DataSource = new()
    {
        new AppointmentData
        {
            Id = 1,
            Subject = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 30, 0),
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0)
        }
    };

    private async Task ClosePopup()
    {
        await ScheduleRef!.CloseQuickInfoPopupAsync();
    }

    private async Task AddEvent(AppointmentData? data)
    {
        if (data == null)
        {
            return;
        }

        AppointmentData newEvent = new()
        {
            Id = DataSource.Any() ? DataSource.Max(x => x.Id) + 1 : 1,
            Subject = SubjectRef?.Value ?? "New Event",
            StartTime = data.StartTime,
            EndTime = data.EndTime
        };

        await ScheduleRef!.AddEventAsync(newEvent);
        await ScheduleRef.CloseQuickInfoPopupAsync();
    }

    private async Task EditEvent(AppointmentData? data)
    {
        if (data == null)
        {
            return;
        }

        await ScheduleRef!.CloseQuickInfoPopupAsync();

        await ScheduleRef.OpenEditorAsync(data,CurrentAction.Save);
    }

    private async Task DeleteEvent(AppointmentData? data)
    {
        if (data == null)
        {
            return;
        }

        await ScheduleRef!.CloseQuickInfoPopupAsync();

        await ScheduleRef.DeleteEventAsync(data,CurrentAction.Delete);
    }

    private string FormatTimeRange(DateTime? startTime,DateTime? endTime)
    {
        if (startTime == null || endTime == null)
        {
            return string.Empty;
        }

        return startTime.Value.ToString("dddd dd, MMMM yyyy",CultureInfo.InvariantCulture)+ " ("+ startTime.Value.ToString("hh:mm tt",CultureInfo.InvariantCulture)+ "-"+ endTime.Value.ToString("hh:mm tt",CultureInfo.InvariantCulture)+ ")";
    }

    public class AppointmentData
    {
        public int Id { get; set; }

        public string Subject { get; set; } = string.Empty;

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public bool IsAllDay { get; set; }
    }
}
```

## Disabling Quick Popups

Disable quick popups:

```cshtml
@using Syncfusion.Blazor.Schedule

<!-- Method 1: Set ShowQuickInfo to false -->
<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate" ShowQuickInfo="false">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

<!-- Method 2: Prevent specific popup types -->
<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEvents TValue="AppointmentData" OnPopupOpen="@OnPopupOpen"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Meeting", 
            StartTime = new DateTime(2026, 3, 24, 9, 30, 0), 
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0) 
        }
    };

    public void OnPopupOpen(PopupOpenEventArgs<AppointmentData> args)
    {
        // Prevent quick popups on cell click
        if (args.Type == PopupType.QuickInfo)
        {
            args.Cancel = true;
        }
        
        // Prevent quick popups on event click
        if (args.Type == PopupType.EditEventInfo)
        {
            args.Cancel = true;
        }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
```

**Quick Popup Options:**
- `ShowQuickInfo="true"` - Enable quick popups (default)
- `ShowQuickInfo="false"` - Disable all quick popups
- `QuickInfoOnSelectionEnd="false"` - Prevent quick popup at selection end (default)
- `QuickInfoOnSelectionEnd="true"` - Show quick popup after multiple cell selection

## More Events Popup

When multiple appointments fit in a cell, a "more events" indicator appears:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEvents TValue="AppointmentData" MoreEventsClicked="@OnMoreEventsClicked"></ScheduleEvents>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData { Id = 1, Subject = "Meeting 1", StartTime = new DateTime(2026, 3, 24, 9, 0, 0), EndTime = new DateTime(2026, 3, 24, 10, 0, 0) },
        new AppointmentData { Id = 2, Subject = "Meeting 2", StartTime = new DateTime(2026, 3, 24, 10, 30, 0), EndTime = new DateTime(2026, 3, 24, 11, 30, 0) },
        new AppointmentData { Id = 3, Subject = "Meeting 3", StartTime = new DateTime(2026, 3, 24, 12, 0, 0), EndTime = new DateTime(2026, 3, 24, 13, 0, 0) },
        new AppointmentData { Id = 4, Subject = "Meeting 4", StartTime = new DateTime(2026, 3, 24, 14, 0, 0), EndTime = new DateTime(2026, 3, 24, 15, 0, 0) }
    };

    public void OnMoreEventsClicked(MoreEventsClickedEventArgs args)
    {
        Console.WriteLine($"More events clicked for date: {args.Date}");
        Console.WriteLine($"Events count: {args.Events?.Count}");
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
```

**More Events Behavior:**
- Appears when cell content exceeds available height
- Click to view all appointments for that day
- Month view shows "+ more" indicator
- All-day row shows indicator after 3 appointments (day/week views)
- Prevent popup with `MoreEventsClicked` event and `args.Cancel = true`

## Common Patterns

### Quick Popup Watermark Text

By default, quick popup shows "Add Title" watermark. Change by modifying localization resources or use custom templates.

### Multiple Selection Behavior

**AllowMultiRowSelection property:**
- `true` (default) - Allow selecting multiple days by dragging
- `false` - Prevent multi-day selection
- `QuickInfoOnSelectionEnd="true"` - Show quick popup after selection completes

### Editor vs Quick Popup

| Aspect | Editor | Quick Popup |
|--------|--------|------------|
| Trigger | Double-click | Single-click |
| Fields | All event fields | Subject only |
| Mobile | Dialog window | Quick popup |
| Customization | Templates + EditorTemplate | QuickInfoTemplates |
| Close behavior | Manual or auto-save | Auto-close |

### Validation Strategy

1. **Editor validation** - Use ValidationRules in ScheduleField
2. **Template validation** - Use DataAnnotations attributes
3. **Event validation** - Use OnActionBegin event (ActionType checking)
4. **Field validation** - Check args.Data properties
