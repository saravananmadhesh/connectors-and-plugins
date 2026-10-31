# ICS Import and Printing

## Table of Contents
- [Importing Events from ICS Files](#importing-events-from-ics-files)
- [Printing Scheduler](#printing-scheduler)
- [Printing with Options](#printing-with-options)
- [Export and Import Summary](#export-and-import-summary)
- [Common Patterns](#common-patterns)

## Importing Events from ICS Files

Import events from external ICS files using `ImportICalendarAsync` with file uploader:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Inputs
@using System.IO

<SfUploader AllowedExtensions=".ics" Multiple="false">
    <UploaderButtons Browse="Choose ICS File"></UploaderButtons>
    <UploaderEvents ValueChange="OnFileSelect"></UploaderEvents>
</SfUploader>

<SfSchedule @ref="ScheduleRef" TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    SfSchedule<AppointmentData> ScheduleRef;
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    List<AppointmentData> DataSource = new List<AppointmentData>();

    public async Task OnFileSelect(UploadChangeEventArgs args)
    {
        foreach (var file in args.Files)
        {
            var stream = file.Stream;
            
            // Read file content as string
            using (var reader = new StreamReader(stream))
            {
                var fileContent = await reader.ReadToEndAsync();
                
                // Import ICS content into Scheduler
                await ScheduleRef.ImportICalendarAsync(fileContent);
            }
        }
    }

    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Location { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
        public Nullable<int> RecurrenceID { get; set; }
    }
}
```

**Import Behavior:**
- ImportICalendarAsync accepts ICS file content as string
- Parses VEVENT entries from ICS
- Adds imported events to Scheduler DataSource
- Supports recurring events with RRULE
- Merges with existing appointments (doesn't replace)

## Printing Scheduler

Print Scheduler content with current view using `PrintAsync` method:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Buttons

<SfButton Content="Print Scheduler" OnClick="OnPrint"></SfButton>

<SfSchedule @ref="ScheduleRef" TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    SfSchedule<AppointmentData> ScheduleRef;
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Conference", 
            StartTime = new DateTime(2026, 3, 24, 9, 0, 0), 
            EndTime = new DateTime(2026, 3, 24, 11, 0, 0) 
        }
    };

    public async Task OnPrint()
    {
        // Print current view without options
        await ScheduleRef.PrintAsync();
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

**Print Behavior:**
- Prints current active view
- Opens browser print dialog
- User controls paper size, orientation, margins
- Includes all visible appointments in current view

## Printing with Options

Print with custom dimensions using `PrintOptions`:

```cshtml
@using Syncfusion.Blazor.Schedule
@using Syncfusion.Blazor.Buttons

<SfButton Content="Print with Custom Size" OnClick="OnPrintCustom"></SfButton>

<SfSchedule @ref="ScheduleRef" TValue="AppointmentData" Height="650px" @bind-SelectedDate="@CurrentDate">
    <ScheduleEventSettings DataSource="@DataSource"></ScheduleEventSettings>
    <ScheduleViews>
        <ScheduleView Option="View.Day"></ScheduleView>
        <ScheduleView Option="View.Week"></ScheduleView>
        <ScheduleView Option="View.Month"></ScheduleView>
    </ScheduleViews>
</SfSchedule>

@code {
    SfSchedule<AppointmentData> ScheduleRef;
    DateTime CurrentDate = new DateTime(2026, 3, 24);
    
    List<AppointmentData> DataSource = new List<AppointmentData>
    {
        new AppointmentData 
        { 
            Id = 1, 
            Subject = "Team Meeting", 
            StartTime = new DateTime(2026, 3, 24, 10, 0, 0), 
            EndTime = new DateTime(2026, 3, 24, 11, 30, 0) 
        }
    };

    public async Task OnPrintCustom()
    {
        // Print with custom width and height
        PrintOptions options = new PrintOptions 
        { 
            Width = "1000px",
            Height = "800px"
        };
        
        await ScheduleRef.PrintAsync(options);
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

**PrintOptions Properties:**
- `Width` - Print area width (e.g., "1000px", "100%")
- `Height` - Print area height (e.g., "800px")
- Allows scaling of printed content
- User still controls final print settings

## Export and Import Summary

| Operation | Method | Output | Custom Options |
|-----------|--------|--------|-----------------|
| Excel Export | ExportToExcelAsync | .xlsx / .csv | Fields, Custom Data, Headers, FileName, DateFormat |
| ICS Export | ExportToICalendarAsync | .ics | Custom FileName |
| ICS Import | ImportICalendarAsync | Merged into DataSource | File content string |
| Print | PrintAsync | Browser print dialog | Width, Height |
| Customize Excel | OnExcelExporting event | Modified worksheet | Formatting, styles, content |

## Common Patterns

### Export Only High-Priority Events
Use CustomData option to filter and export specific subset of appointments

### Integrate with Outlook
Export to ICS format and open in Outlook, Google Calendar, or Apple Calendar

### Backup Events
Regular Excel export provides backup of all scheduling data

### Report Generation
Combine ExportToExcelAsync with custom headers and date formatting for professional reports

### Import External Calendars
Support importing calendars shared by team members or external partners via ICS
