# ICS (iCalendar) Import and Export

## Table of Contents
- [Overview](#overview)
- [When to Use](#when-to-use)
- [Export Appointments to ICS](#export-appointments-to-ics)
  - [ExportAsync (ExportToICalendar)](#exportasync-exporttoicalendar)
  - [Export Behavior](#export-behavior)
  - [Export Output Location](#export-output-location)
- [Import Appointments from ICS](#import-appointments-from-ics)
  - [ImportAsync (ImportICalendar)](#importasync-importicalendar)
  - [Import Behavior](#import-behavior)
- [ICS File Structure (RFC 5545)](#ics-file-structure-rfc-5545)
- [Supported Properties](#supported-properties)
- [Recurring Appointments in ICS](#recurring-appointments-in-ics)
  - [Exporting Recurrence](#exporting-recurrence)
  - [Importing Recurrence](#importing-recurrence)
  - [Changed Occurrences](#changed-occurrences)
- [Timezones in ICS](#timezones-in-ics)
- [End-to-End Examples](#end-to-end-examples)
- [Limitations and Edge Cases](#limitations-and-edge-cases)

## Overview

The WPF Scheduler (`SfScheduler`) ships with built-in support for importing and exporting appointments using the standard **iCalendar (.ics)** format defined by **RFC 5545**. This makes it possible to interoperate with other calendar applications such as Microsoft Outlook, Google Calendar, Apple Calendar, and Mozilla Thunderbird.

Two asynchronous APIs are exposed directly on `SfScheduler`:

| API | Purpose |
|-----|---------|
| `ExportToICalendar(string fileName = null)` | Serializes the scheduler's appointments to an `.ics` file written to the user's Downloads folder. |
| `ImportICalendar()` | Opens a file picker, parses the selected `.ics` file, and adds the resulting appointments to the scheduler. |

Both APIs are `Task<bool>` — the task result is `true` on success, `false` if the operation was cancelled or produced no content.

## When to Use

Use the ICS import/export feature when the user needs to:

- Share scheduler data with users of other calendar clients (Outlook, Google, Apple, Thunderbird).
- Back up or archive scheduled appointments to a portable file.
- Migrate appointments between two `SfScheduler` instances in different applications.
- Exchange data with calendar servers that consume or publish iCalendar feeds.
- Round-trip recurring appointments with the standard RRULE/EXDATE/RECURRENCE-ID structure.

## Export Appointments to ICS

### ExportAsync (ExportToICalendar)

`ExportToICalendar` is an instance method on `SfScheduler` that returns `Task<bool>`.

**Signature**

```csharp
public Task<bool> ExportToICalendar(string fileName = null)
```

**Parameters**
- `fileName` (optional) — Name of the `.ics` file **without path or extension**. If omitted, the default file name `Calendar` is used. The `.ics` extension is appended automatically. If a value that already contains an extension is passed, the extension is stripped before the `.ics` extension is appended (so `MyCalendar.ics` is written as `MyCalendar.ics`, not `MyCalendar.ics.ics`).

**Returns**
- `true` if the file was written successfully.
- `false` if the scheduler is `null` or no content was produced.

**Example — Export from a button click**

```csharp
using System.Windows;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        ExportButton.Click += ExportButton_Click;
    }

    private async void ExportButton_Click(object sender, RoutedEventArgs e)
    {
        bool success = await Schedule.ExportToICalendar("MyCalendar");
        if (success)
        {
            MessageBox.Show("Exported to your Downloads folder.");
        }
    }
}
```

**Example — Export with default file name**

```csharp
await Schedule.ExportToICalendar();
```

### Export Behavior

The exporter reads from the scheduler's `AppointmentEngine.Appointments` collection and writes a single `VCALENDAR` containing one `VEVENT` per appointment (with shared `UID`s and `RECURRENCE-ID` properties for edited occurrences).

**Headers written**

| ICS Property | Value |
|--------------|-------|
| `BEGIN:VCALENDAR` | Marks the start of the calendar object |
| `VERSION` | `2.0` |
| `PRODID` | `-//Syncfusion//SfScheduler WPF//EN` (WPF) or `-//Syncfusion//SfScheduler WinUI//EN` (WinUI) |
| `CALSCALE` | `GREGORIAN` |
| `METHOD` | `PUBLISH` |
| `X-WR-CALNAME` | `Syncfusion SfScheduler` |
| `X-WR-TIMEZONE` | `TimeZoneInfo.Local.Id` |
| `CREATED` | UTC timestamp at export time |
| `LAST-MODIFIED` | UTC timestamp at export time |

**Per-appointment properties written**

- `UID` — `ScheduleAppointment.Id` (when non-null)
- `SUMMARY` — `ScheduleAppointment.Subject` (defaults to `No Subject`)
- `DESCRIPTION` — `ScheduleAppointment.Notes`
- `LOCATION` — `ScheduleAppointment.Location`
- `DTSTART` — `StartTime` formatted per the appointment's timezone / all-day status
- `DTEND` — `EndTime` (falls back to `StartTime + 1 day` for all-day or `StartTime + 1 hour` for timed events)
- `RRULE` — `RecurrenceRule`
- `EXDATE` — One entry per `RecurrenceExceptionDates` entry, combined with the pattern's local time-of-day

### Export Output Location

`ExportToICalendar` writes the file directly to the current user's **Downloads** folder:

```
%USERPROFILE%\Downloads\<fileName>.ics
```

For example, `Schedule.ExportToICalendar("MyCalendar")` produces:

```
C:\Users\<user>\Downloads\MyCalendar.ics
```

The `Downloads` path is resolved from `Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)` and combined with the `Downloads` directory. The file is written on a background thread using `Task.Run` + `File.WriteAllText`.

## Import Appointments from ICS

### ImportAsync (ImportICalendar)

`ImportICalendar` is an instance method on `SfScheduler` that returns `Task<bool>`.

**Signature**

```csharp
public Task<bool> ImportICalendar()
```

**Parameters**
- None. The method opens the standard `OpenFileDialog` (WPF) or `FileOpenPicker` (WinUI) for the user to choose an `.ics` file.

**Returns**
- `true` if a file was selected and parsed successfully.
- `false` if the user cancelled the picker or the file was empty.

**Example — Import from a button click**

```csharp
using System.Windows;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        ImportButton.Click += ImportButton_Click;
    }

    private async void ImportButton_Click(object sender, RoutedEventArgs e)
    {
        bool success = await Schedule.ImportICalendar();
        if (success)
        {
            MessageBox.Show("Appointments imported.");
        }
    }
}
```

### Import Behavior

The importer follows these steps:

1. Opens the system file picker (filter: `ICalendar Files (*.ics)|*.ics|All Files (*.*)|*.*`).
2. Reads the file contents on a background thread.
3. Validates that the file contains a `BEGIN:VCALENDAR` header (throws `InvalidOperationException` if missing).
4. Extracts every `VEVENT` block.
5. Parses each `VEVENT` into a `ScheduleAppointment` (and remembers the raw `UID` plus `RECURRENCE-ID` date for the two-pass link step).
6. Groups parsed events by raw `UID`. For each group:
   - Identifies the master event (one with `RRULE` and no `RECURRENCE-ID`).
   - Identifies changed occurrences (events with `RECURRENCE-ID`).
   - Adds the original occurrence date to the master's `RecurrenceExceptionDates` collection.
   - Sets `RecurrenceId` on each changed occurrence to a temporary raw-UID string, marks its `Type` as `ChangedOccurrence`, and clears its `RecurrenceRule`.
7. Adds pattern (and standalone) appointments to the scheduler first using `AppointmentHelper.CreateNewAppointment`, recording the pattern's actual `Id`.
8. After patterns are added, replaces the temporary raw-UID placeholders in each changed occurrence's `RecurrenceId` with the pattern's actual `Id`, then adds the changed occurrences to the scheduler.
9. If `ItemsSource` is `null`, an empty `ObservableCollection<ScheduleAppointment>` is created and assigned.

Duplicates are avoided by checking existing `Id` and `RecurrenceId` values against the appointment engine's current appointments before adding.

## ICS File Structure (RFC 5545)

The exporter produces files that conform to RFC 5545. A minimal exported `.ics` looks like this:

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Syncfusion//SfScheduler WPF//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Syncfusion SfScheduler
X-WR-TIMEZONE:Pacific Standard Time
CREATED:20260615T103000Z
LAST-MODIFIED:20260615T103000Z
BEGIN:VEVENT
UID:meeting-001
SUMMARY:Project Kickoff
DESCRIPTION:Discuss Q3 OKRs
LOCATION:Conference Room A
DTSTART;TZID=Pacific Standard Time:20260615T100000
DTEND;TZID=Pacific Standard Time:20260615T110000
END:VEVENT
END:VCALENDAR
```

An **all-day** event uses `VALUE=DATE` and a date-only value:

```ics
BEGIN:VEVENT
UID:holiday-001
SUMMARY:Independence Day
DTSTART;VALUE=DATE:20260704
DTEND;VALUE=DATE:20260705
END:VEVENT
```

## Supported Properties

The importer parses the following RFC 5545 properties from each `VEVENT`:

| ICS Property | Maps to ScheduleAppointment |
|--------------|------------------------------|
| `UID` | `Id` |
| `SUMMARY` | `Subject` |
| `DESCRIPTION` | `Notes` |
| `LOCATION` | `Location` |
| `DTSTART` (with `VALUE=DATE`) | `StartTime` (date-only) and `IsAllDay = true` |
| `DTSTART` (with `TZID=...`) | `StartTime` and `StartTimeZone` |
| `DTSTART` (with `Z` suffix) | `StartTime` (UTC, converted to local) |
| `DTSTART` (floating) | `StartTime` (interpreted as local) |
| `DTEND` | `EndTime` (same TZ/all-day rules as `DTSTART`) |
| `RRULE` | `RecurrenceRule` |
| `EXDATE` | Adds each entry to `RecurrenceExceptionDates` |
| `RECURRENCE-ID` | Captured for linking back to the parent pattern; the parent `RecurrenceId` is also set |

Line folding (RFC 5545 §3.1 — lines beginning with a space or tab that continue the previous logical line) is honored during parsing and is not used in export output.

## Recurring Appointments in ICS

### Exporting Recurrence

A pattern (series) appointment with `RecurrenceRule` is exported as a single `VEVENT` containing both the event data and the `RRULE`:

```ics
BEGIN:VEVENT
UID:standup-001
SUMMARY:Daily Standup
DTSTART:20260324T090000
DTEND:20260324T093000
RRULE:FREQ=DAILY;INTERVAL=1;COUNT=30
END:VEVENT
```

Exception dates are emitted as `EXDATE` lines, using the pattern's local time-of-day combined with each exception's local date:

```ics
EXDATE:20260326T090000
EXDATE:20260328T090000
```

### Importing Recurrence

On import, `RRULE` is mapped directly to `ScheduleAppointment.RecurrenceRule`. Each `EXDATE` is added to `RecurrenceExceptionDates` as a local-midnight date.

### Changed Occurrences

A *changed occurrence* is a single occurrence of a recurring series that the user has edited independently of the rest of the series. RFC 5545 represents this with a second `VEVENT` that shares the parent's `UID` and adds a `RECURRENCE-ID` property referencing the original occurrence start.

**Export format:**

```ics
BEGIN:VEVENT
UID:standup-001
SUMMARY:Daily Standup (with guest speaker)
DTSTART;TZID=Pacific Standard Time:20260326T100000
DTEND;TZID=Pacific Standard Time:20260326T110000
RRULE:FREQ=DAILY;INTERVAL=1;COUNT=30
RECURRENCE-ID:20260326T090000
END:VEVENT
```

**How the exporter identifies changed occurrences:** when iterating the scheduler's appointments, occurrences with `RecurrenceId != null` and an empty `RecurrenceRule` are grouped by their parent ID. They are written as additional `VEVENT`s under the parent's UID. The original date for the `RECURRENCE-ID` value is matched from the pattern's `RecurrenceExceptionDates` (preferring a same-day entry, otherwise the closest one).

**How the importer handles them:** the importer groups parsed events by raw UID. After patterns are added, each parsed occurrence's temporary `RecurrenceId` (the raw UID string) is rewritten to the actual pattern `Id`. The occurrence's `Type` is set to `ChangedOccurrence`, its `RecurrenceRule` is cleared, and the original occurrence date is added to the pattern's `RecurrenceExceptionDates`.

## Timezones in ICS

Both export and import follow RFC 5545 timezone conventions:

- If `ScheduleAppointment.StartTimeZone` is set, the exporter writes `DTSTART;TZID=<id>:<local time>`.
- If `EndTimeZone` is set, the same logic is used for `DTEND`.
- If neither is set, the value is converted to UTC and suffixed with `Z` (e.g. `DTSTART:20260324T170000Z`).
- The importer validates every `TZID` value against `TimeZoneInfo.FindSystemTimeZoneById`. Unrecognized timezones are dropped (the appointment is still created, but with no `StartTimeZone`/`EndTimeZone`).
- UTC values (ending in `Z`) are converted to local time on import.
- Floating values (no `Z`, no `TZID`) are interpreted as local time.

## End-to-End Examples

### Example 1 — Export to ICS on Demand

**XAML:**

```xaml
<Window x:Class="SchedulerIcsDemo.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:syncfusion="http://schemas.syncfusion.com/wpf"
        Title="ICS Export Demo" Height="600" Width="900">
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <StackPanel Orientation="Horizontal" Grid.Row="0" Margin="5">
            <Button Content="Export to ICS" Click="ExportButton_Click" Margin="2"/>
            <Button Content="Import from ICS" Click="ImportButton_Click" Margin="2"/>
        </StackPanel>

        <syncfusion:SfScheduler x:Name="Schedule" Grid.Row="1" ViewType="Week"/>
    </Grid>
</Window>
```

**C#:**

```csharp
using System.Windows;
using Syncfusion.UI.Xaml.Scheduler;

namespace SchedulerIcsDemo
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Schedule.ItemsSource = GetAppointments();
        }

        private ScheduleAppointmentCollection GetAppointments()
        {
            var appointments = new ScheduleAppointmentCollection
            {
                new ScheduleAppointment
                {
                    StartTime = new DateTime(2026, 6, 15, 10, 0, 0),
                    EndTime = new DateTime(2026, 6, 15, 11, 0, 0),
                    Subject = "Project Kickoff",
                    Location = "Conference Room A",
                    Notes = "Discuss Q3 OKRs",
                    AppointmentBackground = System.Windows.Media.Brushes.SteelBlue
                },
                new ScheduleAppointment
                {
                    StartTime = new DateTime(2026, 6, 15, 0, 0, 0),
                    EndTime = new DateTime(2026, 6, 15, 23, 59, 59),
                    Subject = "All-Day Workshop",
                    IsAllDay = true,
                    AppointmentBackground = System.Windows.Media.Brushes.SeaGreen
                },
                new ScheduleAppointment
                {
                    StartTime = new DateTime(2026, 6, 16, 14, 0, 0),
                    EndTime = new DateTime(2026, 6, 16, 15, 0, 0),
                    Subject = "Daily Standup",
                    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=10",
                    AppointmentBackground = System.Windows.Media.Brushes.Orange
                }
            };

            return appointments;
        }

        private async void ExportButton_Click(object sender, RoutedEventArgs e)
        {
            bool ok = await Schedule.ExportToICalendar("TeamCalendar");
            MessageBox.Show(ok ? "Exported to Downloads folder." : "Export cancelled.");
        }

        private async void ImportButton_Click(object sender, RoutedEventArgs e)
        {
            bool ok = await Schedule.ImportICalendar();
            MessageBox.Show(ok ? "Imported successfully." : "Import cancelled.");
        }
    }
}
```

### Example 2 — Round-Trip a Recurring Series with a Changed Occurrence

This example creates a recurring meeting, edits one occurrence, then exports and re-imports the file to verify the round-trip preserves the recurrence and the changed occurrence.

```csharp
using System.Collections.ObjectModel;
using Syncfusion.UI.Xaml.Scheduler;
using System.Windows.Media;

// 1) Add a recurring meeting
var standup = new ScheduleAppointment
{
    Id = "standup-001",
    StartTime = new DateTime(2026, 6, 16, 9, 0, 0),
    EndTime = new DateTime(2026, 6, 16, 9, 30, 0),
    Subject = "Daily Standup",
    RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=5",
    AppointmentBackground = Brushes.Orange
};

// 2) Mark 2026-06-18 as an exception and add a changed occurrence for that day
standup.RecurrenceExceptionDates = new ObservableCollection<DateTime>
{
    new DateTime(2026, 6, 18)
};

// (Changing a single occurrence via the appointment engine or UI would create
//  a new appointment with RecurrenceId set to the pattern's Id.)
// Assume `changedStandup` is such an occurrence:
var changedStandup = new ScheduleAppointment
{
    Id = "standup-001-occurrence-3",
    StartTime = new DateTime(2026, 6, 18, 11, 0, 0),
    EndTime = new DateTime(2026, 6, 18, 12, 0, 0),
    Subject = "Standup with Guest Speaker",
    RecurrenceId = standup.Id,
    Type = AppointmentType.ChangedOccurrence,
    AppointmentBackground = Brushes.DarkOrange
};

Schedule.ItemsSource = new ScheduleAppointmentCollection { standup, changedStandup };

// 3) Export
await Schedule.ExportToICalendar("Standup");

// 4) (In a separate run) Import — the recurrence and the changed occurrence are
//    reconstructed as separate ScheduleAppointment objects linked by RecurrenceId.
await Schedule.ImportICalendar();
```

### Example 3 — Pre-Populating an Empty Scheduler via Import

If `ItemsSource` is `null` when `ImportICalendar` is called, the importer creates a new `ObservableCollection<ScheduleAppointment>` and assigns it to `ItemsSource` before adding the parsed appointments. No additional setup is required.

```csharp
// Clear the scheduler first
Schedule.ItemsSource = null;

// Import — ItemsSource is automatically created
await Schedule.ImportICalendar();
```

## Limitations and Edge Cases

- **File location is fixed for export.** `ExportToICalendar` always writes to `%USERPROFILE%\Downloads`. To export to a custom path, read the source's `ICSImportExport.ExportAsync` flow (internal) or serialize the content yourself.
- **Export uses the appointment engine's flat collection.** Appointments are exported in the order returned by `AppointmentEngine.Appointments`. Recurring patterns are exported before their changed occurrences, but there is no guarantee about the order of unrelated standalone appointments.
- **Timezone identifiers must be valid on the importing machine.** The importer validates `TZID` values against `TimeZoneInfo.FindSystemTimeZoneById`. Unknown zones are dropped (the appointment is still created).
- **Floating times are treated as local.** `DTSTART:20260324T090000` (no `Z`, no `TZID`) is interpreted as local time on import.
- **Duplicate detection.** Imports skip appointments whose `Id` already exists in the engine, and skip changed occurrences whose `RecurrenceId` already exists. Existing data is preserved.
- **Recurrence exceptions are date-only.** `EXDATE` values are stored as local-midnight `DateTime`s, ignoring the time-of-day portion of the original `VEVENT`.
- **Custom ICS properties are not preserved.** Only the subset of RFC 5545 properties listed above is read on import; everything else (alarms, attachments, attendees, status) is ignored.
- **Invalid file.** A file without `BEGIN:VCALENDAR` throws `InvalidOperationException` during import.

## Next Steps

- **Appointments** — see [appointments.md](appointments.md) for `ScheduleAppointment`, recurrence, and data mapping.
- **View customization** — see [view-customization.md](view-customization.md) for working hours, time intervals, and special time regions (including the new TimelineMonth support, see below).