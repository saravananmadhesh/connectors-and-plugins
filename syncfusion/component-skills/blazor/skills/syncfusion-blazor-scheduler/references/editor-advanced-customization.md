# Editor Advanced Customization

## Table of Contents
- [Recurrence Options in Editor](#recurrence-options-in-editor)
- [Editor Template Validation](#editor-template-validation)
- [Quick Info Popups](#quick-info-popups)
- [Quick Popup on Cell](#quick-popup-on-cell)
- [Quick Popup on Event](#quick-popup-on-event)

## Recurrence Options in Editor

Add recurrence pattern fields to the custom editor template:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.DropDowns
@using Syncfusion.Blazor.Calendars
@using Syncfusion.Blazor.Inputs

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleTemplates>
        <EditorTemplate>
            <div class="custom-editor">
                <div class="form-group">
                    <label>Subject</label>
                    <SfTextBox Value="@((context as AppointmentData)?.Subject)"></SfTextBox>
                </div>
                
                <div class="form-group">
                    <label>Is Recurring</label>
                    <input type="checkbox" 
                        @onchange="@((ChangeEventArgs e) => UpdateRecurrence(context as AppointmentData, (bool)e.Value))" />
                </div>
                
                @if ((context as AppointmentData)?.RecurrenceRule != null)
                {
                    <div class="form-group">
                        <label>Recurrence Pattern</label>
                        <SfDropDownList TValue="string" TItem="RecurrencePattern"
                            DataSource="@RecurrencePatterns"
                            Fields="@(new DropDownListFieldSettings { Text = "Text", Value = "Value" })"
                            Value="@GetRecurrencePattern((context as AppointmentData)?.RecurrenceRule)"
                            ValueChange="@((ChangeEventArgs<string> e) => UpdateField(context as AppointmentData, nameof(AppointmentData.RecurrenceRule), e.Value))">
                        </SfDropDownList>
                    </div>
                    
                    <div class="form-group">
                        <label>Recurrence End Date</label>
                        <SfDatePicker TValue="DateTime?" 
                            Value="@GetRecurrenceEndDate((context as AppointmentData)?.RecurrenceRule)">
                        </SfDatePicker>
                    </div>
                }
                
                <div class="form-group">
                    <label>Start Time</label>
                    <SfDateTimePicker TValue="DateTime" 
                        Value="@((context as AppointmentData)?.StartTime)">
                    </SfDateTimePicker>
                </div>
            </div>
        </EditorTemplate>
    </ScheduleTemplates>
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
            Subject = "Daily Standup", 
            RecurrenceRule = "FREQ=DAILY;COUNT=10",
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0), 
            EndTime = new DateTime(2026, 3, 24, 9, 30, 0) 
        }
    };

    List<RecurrencePattern> RecurrencePatterns = new List<RecurrencePattern>
    {
        new RecurrencePattern { Text = "Daily", Value = "FREQ=DAILY;COUNT=10" },
        new RecurrencePattern { Text = "Weekly", Value = "FREQ=WEEKLY;COUNT=10" },
        new RecurrencePattern { Text = "Monthly", Value = "FREQ=MONTHLY;COUNT=10" },
        new RecurrencePattern { Text = "Yearly", Value = "FREQ=YEARLY;COUNT=10" }
    };

    private void UpdateRecurrence(AppointmentData data, bool isRecurring)
    {
        if (data != null)
        {
            if (isRecurring)
            {
                data.RecurrenceRule = "FREQ=DAILY;COUNT=10";
            }
            else
            {
                data.RecurrenceRule = null;
            }
        }
    }

    private void UpdateField(AppointmentData data, string fieldName, object value)
    {
        if (data != null)
        {
            var property = typeof(AppointmentData).GetProperty(fieldName);
            if (property != null)
            {
                property.SetValue(data, value);
            }
        }
    }

    private string GetRecurrencePattern(string recurrenceRule)
    {
        if (string.IsNullOrEmpty(recurrenceRule))
            return null;
        
        if (recurrenceRule.Contains("FREQ=DAILY"))
            return "FREQ=DAILY;COUNT=10";
        if (recurrenceRule.Contains("FREQ=WEEKLY"))
            return "FREQ=WEEKLY;COUNT=10";
        if (recurrenceRule.Contains("FREQ=MONTHLY"))
            return "FREQ=MONTHLY;COUNT=10";
        
        return recurrenceRule;
    }

    private DateTime? GetRecurrenceEndDate(string recurrenceRule)
    {
        if (string.IsNullOrEmpty(recurrenceRule) || !recurrenceRule.Contains("UNTIL="))
            return null;
        
        var untilPart = recurrenceRule.Split(';')
            .FirstOrDefault(x => x.StartsWith("UNTIL="));
        
        if (DateTime.TryParse(untilPart?.Replace("UNTIL=", ""), out var date))
            return date;
        
        return null;
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
    }

    public class RecurrencePattern
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
```

## Editor Template Validation

Apply DataAnnotations-based validation to editor template fields:

```cshtml
@using Syncfusion.Blazor.Schedule
@using System.ComponentModel.DataAnnotations

<SfSchedule TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleTemplates>
        <EditorTemplate>
            <div class="custom-editor">
                <div class="form-group">
                    <label>Subject (Required)</label>
                    <SfTextBox Value="@((context as AppointmentData)?.Subject)"></SfTextBox>
                    @if (GetValidationErrors("Subject").Any())
                    {
                        <span class="validation-error">@string.Join(", ", GetValidationErrors("Subject"))</span>
                    }
                </div>
                
                <div class="form-group">
                    <label>Email (Valid Email)</label>
                    <SfTextBox Type="InputType.Email" Value="@((context as AppointmentData)?.Email)"></SfTextBox>
                    @if (GetValidationErrors("Email").Any())
                    {
                        <span class="validation-error">@string.Join(", ", GetValidationErrors("Email"))</span>
                    }
                </div>
                
                <div class="form-group">
                    <label>Event Type (Required)</label>
                    <SfDropDownList TValue="string" TItem="EventTypeOption"
                        DataSource="@EventTypeOptions"
                        Fields="@(new DropDownListFieldSettings { Text = "Text", Value = "Value" })"
                        Value="@((context as AppointmentData)?.EventType)">
                    </SfDropDownList>
                    @if (GetValidationErrors("EventType").Any())
                    {
                        <span class="validation-error">@string.Join(", ", GetValidationErrors("EventType"))</span>
                    }
                </div>
            </div>
        </EditorTemplate>
    </ScheduleTemplates>
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
            Email = "user@company.com",
            EventType = "Meeting",
            StartTime = new DateTime(2026, 3, 24, 9, 30, 0), 
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0) 
        }
    };

    List<EventTypeOption> EventTypeOptions = new List<EventTypeOption>
    {
        new EventTypeOption { Text = "Meeting", Value = "Meeting" },
        new EventTypeOption { Text = "Conference", Value = "Conference" },
        new EventTypeOption { Text = "Workshop", Value = "Workshop" }
    };

    private List<string> GetValidationErrors(string fieldName)
    {
        // Mock validation - in real scenario, would use Validator class
        var errors = new List<string>();
        
        if (fieldName == "Subject")
        {
            // Check if required
        }
        
        if (fieldName == "Email")
        {
            // Check if valid email format
        }
        
        return errors;
    }

    public class AppointmentData
    {
        [Required(ErrorMessage = "Subject is required")]
        public string Subject { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Event Type is required")]
        public string EventType { get; set; }

        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }

    public class EventTypeOption
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
```

## Quick Info Popups

Quick popups (quick info windows) display when a cell or appointment is single-clicked:

```cshtml
@using Syncfusion.Blazor.Schedule

<SfSchedule TValue="AppointmentData" Height="550px" @bind-SelectedDate="@CurrentDate" ShowQuickInfo="true">
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

**Quick Popup Behaviors:**
- Single-click cell: Shows quick popup to add quick event
- Single-click appointment: Shows quick popup with event details
- Mobile: Quick popup opens on tap
- Disable with `ShowQuickInfo="false"`

## Quick Popup on Cell

Customize quick popup on cell click:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Buttons
@using Syncfusion.Blazor.Inputs
@using System.Globalization

<SfSchedule TValue="AppointmentData"
            @ref="ScheduleRef"
            CssClass="quick-popup-custom"
            Width="100%"
            Height="650px">

    <ScheduleQuickInfoTemplates TemplateType="TemplateType.Cell">

        <HeaderTemplate>
            <div class="quick-popup-header">
                <h3>Quick Add Event</h3>
            </div>
        </HeaderTemplate>

        <ContentTemplate>
            @{
                var cellData = context as AppointmentData;
            }

            <div class="quick-popup-content">

                <div class="event-field">
                    <label>Event Title:</label>
                    <SfTextBox @ref="SubjectRef"
                               Placeholder="Enter title">
                    </SfTextBox>
                </div>

                <div class="event-field">
                    <label>
                        Time:
                        @FormatTimeRange(
                            cellData.StartTime,
                            cellData.EndTime)
                    </label>
                </div>

            </div>
        </ContentTemplate>

        <FooterTemplate>
            @{
                var cellData = context as AppointmentData;
            }

            <div class="quick-popup-footer">

                <SfButton Content="Add"
                          IsPrimary="true"
                          OnClick="@(args => AddEvent(cellData))">
                </SfButton>

                <SfButton Content="Cancel"
                          OnClick="ClosePopup">
                </SfButton>

            </div>
        </FooterTemplate>

    </ScheduleQuickInfoTemplates>

</SfSchedule>

@code {

    private SfSchedule<AppointmentData>? ScheduleRef;
    private SfTextBox? SubjectRef;

    private async Task AddEvent(AppointmentData? data)
    {
        if (data == null)
            return;

        AppointmentData appointment = new()
        {
            Id = 1,
            Subject = SubjectRef?.Value ?? "New Event",
            StartTime = data.StartTime,
            EndTime = data.EndTime
        };

        await ScheduleRef!.AddEventAsync(appointment);
        await ScheduleRef.CloseQuickInfoPopupAsync();
    }

    private async Task ClosePopup()
    {
        await ScheduleRef!.CloseQuickInfoPopupAsync();
    }

    private string FormatTimeRange(DateTime? startTime, DateTime? endTime)
    {
        if (startTime == null || endTime == null)
        {
            return string.Empty;
        }

        return startTime.Value.ToString("dddd dd, MMMM yyyy", CultureInfo.InvariantCulture) + " (" + startTime.Value.ToString("hh:mm tt", CultureInfo.InvariantCulture) + "-" + endTime.Value.ToString("hh:mm tt", CultureInfo.InvariantCulture) + ")";
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

## Quick Popup on Event

Customize quick popup on event click:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Buttons
@using System.Globalization

<SfSchedule @ref="ScheduleRef" TValue="AppointmentData" @bind-SelectedDate="@CurrentDate" CssClass="quick-popup-custom" Width="100%" Height="650px">
    <ScheduleQuickInfoTemplates TemplateType="TemplateType.Event">
        <HeaderTemplate>
            <div class="event-header">
                <h3>@((context as AppointmentData)?.Subject)</h3>
            </div>
        </HeaderTemplate>
        
        <ContentTemplate>
            <div class="event-details">
                @{
                    var eventData = context as AppointmentData;
                }
                <div class="detail-item">
                    <span class="label">Time:</span>
                    <span class="value">@FormatTimeRange(eventData?.StartTime, eventData?.EndTime)</span>
                </div>
                <div class="detail-item">
                    <span class="label">Location:</span>
                    <span class="value">@((context as AppointmentData)?.Location ?? "Not specified")</span>
                </div>
                <div class="detail-item">
                    <span class="label">Description:</span>
                    <span class="value">@((context as AppointmentData)?.Description ?? "No description")</span>
                </div>
            </div>
        </ContentTemplate>

        <FooterTemplate>
            @{
                var eventData = context as AppointmentData;
            }

            <div class="event-actions">

                <SfButton Content="Edit"
                          IsPrimary="true"
                          OnClick="@(args => EditEvent(eventData))">
                </SfButton>

                <SfButton Content="Delete"
                          CssClass="e-danger"
                          OnClick="@(args => DeleteEvent(eventData))">
                </SfButton>

            </div>
        </FooterTemplate>
    </ScheduleQuickInfoTemplates>
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    private SfSchedule<AppointmentData>? ScheduleRef;
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Team Meeting", 
            Location = "Conference Room A",
            Description = "Weekly team synchronization",
            StartTime = new DateTime(2026, 3, 24, 9, 30, 0), 
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0) 
        }
    };

    private string FormatTimeRange(DateTime? startTime, DateTime? endTime)
    {
        if (startTime == null || endTime == null)
        {
            return string.Empty;
        }

        return startTime.Value.ToString("dddd dd, MMMM yyyy", CultureInfo.InvariantCulture) + " (" + startTime.Value.ToString("hh:mm tt", CultureInfo.InvariantCulture) + "-" + endTime.Value.ToString("hh:mm tt", CultureInfo.InvariantCulture) + ")";
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

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAllDay { get; set; }
    }
}
```
