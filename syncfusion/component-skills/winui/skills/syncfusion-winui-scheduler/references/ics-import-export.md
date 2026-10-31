# ICS Import and Export

This reference covers round-tripping appointments to and from RFC 5545 iCalendar (`.ics`) files in the WinUI Scheduler.

## Table of Contents
- [Overview](#overview)
- [Public API](#public-api)
- [Exporting Appointments](#exporting-appointments)
- [Importing Appointments](#importing-appointments)
- [Recurring Series and Changed Occurrences](#recurring-series-and-changed-occurrences)
- [All-Day and Time Zone Handling](#all-day-and-time-zone-handling)
- [Customizing the Export File Name](#customizing-the-export-file-name)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

`SfScheduler` ships with built-in support for exporting appointments to an iCalendar (`.ics`) file
and importing appointments from a user-selected `.ics` file. The implementation follows
[RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545) and supports:

- Single (non-recurring) appointments
- Recurring series with `RRULE` and exception dates (`EXDATE`)
- Changed occurrences via `RECURRENCE-ID`
- All-day events (`VALUE=DATE`)
- Time zone-aware entries (`TZID=...` and `Z` UTC suffix)

## Public API

| Method | Return type | Description |
|--------|-------------|-------------|
| `Schedule.ExportToICalendar(string fileName = null)` | `Task<bool>` | Asynchronously exports all appointments to an `.ics` file and saves it to the user's Downloads folder. Returns `true` on success. |
| `Schedule.ImportICalendar()` | `Task<bool>` | Asynchronously opens the platform file picker, parses the chosen `.ics` file, and appends the resulting appointments to the scheduler. Returns `true` on success. |

Both methods are instance methods on `SfScheduler` and are intended to be `await`ed from event
handlers.

## Exporting Appointments

`ExportToICalendar` writes a standards-compliant `.ics` document and saves it to the user's
Downloads folder. If `fileName` is `null`, the file is named `Calendar.ics`. The `.ics`
extension is appended automatically — pass a bare name without an extension.

```csharp
private async void OnExportClicked(object sender, RoutedEventArgs e)
{
    bool success = await Schedule.ExportToICalendar("MyCalendar");
    if (success)
    {
        StatusText.Text = "Exported MyCalendar.ics to Downloads";
    }
}
```

**Output format:**

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Syncfusion//SfScheduler WinUI//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Syncfusion SfScheduler
X-WR-TIMEZONE:<local time zone id>
CREATED:<utc timestamp>
LAST-MODIFIED:<utc timestamp>
BEGIN:VEVENT
UID:<appointment Id>
SUMMARY:<subject>
DESCRIPTION:<notes>
LOCATION:<location>
DTSTART:<start time>
DTEND:<end time>
RRULE:<recurrence rule>
EXDATE:<exception date 1>
EXDATE:<exception date 2>
END:VEVENT
END:VCALENDAR
```

**Notes:**
- The export is performed on a background thread; control returns to the UI thread when the file is written.
- Duplicate extensions are stripped (e.g., `Calendar.ics.ics` becomes `Calendar.ics`).
- The export reads from `Schedule.AppointmentEngine.Appointments`. If you bind `ItemsSource` to a custom collection, ensure the engine reflects your appointments.

## Importing Appointments

`ImportICalendar` opens the platform file picker (WinUI uses `FileOpenPicker` initialized with
the window handle), reads the chosen file, parses each `VEVENT`, and adds the resulting
`ScheduleAppointment` instances to the scheduler's `ItemsSource`.

```csharp
private async void OnImportClicked(object sender, RoutedEventArgs e)
{
    bool success = await Schedule.ImportICalendar();
    if (success)
    {
        StatusText.Text = "Imported .ics file successfully";
    }
}
```

**Behavior:**
- If `ItemsSource` is `null`, the scheduler initializes it as `ObservableCollection<ScheduleAppointment>`.
- Duplicate `UID`s (matching an existing `Appointment.Id`) are skipped.
- `RECURRENCE-ID` values are matched to their parent pattern (identified by `UID`) and added as `ChangedOccurrence` appointments with the pattern's `RecurrenceExceptionDates` populated.
- If the file is missing a `BEGIN:VCALENDAR` header, an `InvalidOperationException` is thrown.

## Recurring Series and Changed Occurrences

The export/import pipeline preserves recurrence structure across round-trips.

**Series export:**
- A pattern appointment is exported as one `VEVENT` with `RRULE` and any `EXDATE` entries.
- Each changed occurrence is exported as a separate `VEVENT` that shares the parent's `UID` and
  includes `RECURRENCE-ID`. The corresponding exception date is included on the pattern.

**Series import:**
- All `VEVENT`s are grouped by `UID`.
- For each group, the master VEVENT (with `RRULE`, no `RECURRENCE-ID`) becomes the pattern.
- Each VEVENT with `RECURRENCE-ID` becomes a `ChangedOccurrence` whose `RecurrenceId` references
  the pattern's `Id`. The `RecurrenceExceptionDates` on the pattern are augmented to include the
  original occurrence date so the engine skips the unmodified occurrence.

**Recurrence rule format:** the `RecurrenceRule` property uses standard iCal `RRULE` strings,
for example:

- `FREQ=DAILY;INTERVAL=1;COUNT=10`
- `FREQ=WEEKLY;BYDAY=MO,WE,FR`
- `FREQ=MONTHLY;BYMONTHDAY=15`

## All-Day and Time Zone Handling

| Scenario | ICS property form | Scheduler mapping |
|----------|-------------------|-------------------|
| All-day event | `DTSTART;VALUE=DATE:20260615` | `ScheduleAppointment.IsAllDay = true`; `DTEND` is start + 1 day |
| Time-zone-aware event | `DTSTART;TZID=Pacific Standard Time:20260615T100000` | `ScheduleAppointment.StartTimeZone` is set |
| UTC event | `DTSTART:20260615T170000Z` | UTC `DateTime`; converted to local on import |

On export:
- If `StartTimeZone` is set, the `DTSTART` line includes `TZID=<id>`.
- Otherwise, the local time is converted to UTC and emitted with the `Z` suffix.
- All-day events use `VALUE=DATE` and a date-only value.

On import:
- A `TZID` is validated against `TimeZoneInfo.FindSystemTimeZoneById`. If the identifier is not
  recognized, `StartTimeZone` / `EndTimeZone` are left as `null`.
- UTC values are converted to local time before being assigned to `StartTime` / `EndTime`.

## Customizing the Export File Name

Pass any string to `ExportToICalendar`; the implementation strips a `.ics` extension if you
accidentally include one and re-adds it.

```csharp
// Saves <Downloads>\TeamCalendar.ics
await Schedule.ExportToICalendar("TeamCalendar");

// Same result — ".ics" is stripped and re-added
await Schedule.ExportToICalendar("TeamCalendar.ics");

// Default: <Downloads>\Calendar.ics
await Schedule.ExportToICalendar();
```

## Common Patterns

### Pattern 1: Toolbar Buttons for Export and Import

```xml
<StackPanel Orientation="Horizontal">
    <Button Content="Export" Click="OnExportClicked" />
    <Button Content="Import" Click="OnImportClicked" />
</StackPanel>
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week" />
```

```csharp
private async void OnExportClicked(object sender, RoutedEventArgs e)
    => await Schedule.ExportToICalendar("MyCalendar");

private async void OnImportClicked(object sender, RoutedEventArgs e)
    => await Schedule.ImportICalendar();
```

### Pattern 2: Awaiting from a ViewModel

```csharp
public class SchedulerViewModel
{
    public SfScheduler Schedule { get; init; }

    public async Task ExportAsync() => await Schedule.ExportToICalendar("Backup");
    public async Task ImportAsync() => await Schedule.ImportICalendar();
}
```

### Pattern 3: Back Up Before Import

```csharp
private async void OnReplaceCalendarClicked(object sender, RoutedEventArgs e)
{
    // Preserve a backup
    await Schedule.ExportToICalendar($"Backup-{DateTime.Now:yyyyMMdd-HHmmss}");

    // Clear existing appointments before importing
    if (Schedule.ItemsSource is ObservableCollection<ScheduleAppointment> existing)
    {
        existing.Clear();
    }

    // Import the new file
    await Schedule.ImportICalendar();
}
```

### Pattern 4: Disable UI During Import/Export

```csharp
private bool _busy;

private async Task RunImportAsync()
{
    if (_busy) return;
    _busy = true;
    try
    {
        ImportButton.IsEnabled = false;
        await Schedule.ImportICalendar();
    }
    finally
    {
        _busy = false;
        ImportButton.IsEnabled = true;
    }
}
```

## Troubleshooting

### Export File Is Empty

**Cause:** No appointments are available in `Schedule.AppointmentEngine.Appointments`.

**Solutions:**
- Confirm `ItemsSource` is bound to an `ObservableCollection<ScheduleAppointment>` (or compatible).
- Confirm appointments are added **before** `ExportToICalendar` is called.

### Import Throws `InvalidOperationException: VCALENDAR header not found`

**Cause:** The file is not a valid iCalendar file or was read as a different format.

**Solutions:**
- Confirm the file's first line begins with `BEGIN:VCALENDAR`.
- Confirm the file uses UTF-8 or ASCII encoding.
- Open the file in a text editor and verify `END:VCALENDAR` exists.

### Imported Recurrence Series Looks Wrong

**Cause:** Mismatched `UID` values between the pattern and its `VEVENT`s, or unusual time-zone
handling on the source calendar.

**Solutions:**
- Verify all `VEVENT`s for the same series share the same `UID`.
- Check that `RECURRENCE-ID` matches the original local start time of the occurrence.
- Validate the file in another tool (Outlook, Google Calendar export) to isolate whether the
  issue is in the source file or in the scheduler.

### Imported Appointments Appear Off by Hours

**Cause:** The scheduler's `TimeZone` differs from the local time zone implied by the file.

**Solutions:**
- Set `Schedule.TimeZone` to the expected display time zone before importing.
- Check whether the source calendar emitted UTC (`Z`) or local-with-`TZID` values.

### File Picker Doesn't Appear in WinUI

**Cause:** The picker was not associated with the current window handle.

**Solution:** The scheduler's import implementation already handles HWND initialization, but if
you wrap the call in a custom picker, ensure you call `InitializeWithWindow.Initialize(picker, hwnd)`
where `hwnd` is the owning window's handle.

### Import Adds Duplicates

**Cause:** Appointments with the same `Id` already exist in the scheduler's `ItemsSource`.

**Solutions:**
- Clear `ItemsSource` before importing a fresh file.
- Use a unique `Id` per appointment (the export sets `UID` as `Id` automatically).