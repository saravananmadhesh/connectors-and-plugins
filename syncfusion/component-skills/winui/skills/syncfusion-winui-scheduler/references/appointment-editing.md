# Appointment Editing

This reference provides comprehensive guidance on editing appointments in the WinUI Scheduler, including the built-in appointment editor, resizing, and event handling.

## Table of Contents
- [Overview](#overview)
- [Built-in Appointment Editor](#built-in-appointment-editor)
- [Creating Appointments via UI](#creating-appointments-via-ui)
- [Editing Appointments](#editing-appointments)
- [Recurring Appointment Editing](#recurring-appointment-editing)
- [Appointment Editor Events](#appointment-editor-events)
- [Appointment Resizing](#appointment-resizing)
- [Deleting Appointments](#deleting-appointments)
- [Disabling Editing](#disabling-editing)
- [Customization](#customization)

## Overview

The WinUI Scheduler provides a built-in appointment editor dialog for creating, editing, and deleting appointments. The editor can be customized or replaced with a custom implementation.

## Built-in Appointment Editor

The `SchedulerAppointmentEditorView` is the default editor dialog that opens when:
- Double-clicking on a time cell or month cell
- Double-clicking on an existing appointment
- Double-clicking on the view header (creates all-day appointment)

### Default Editor Features

The built-in editor includes fields for:
- **Subject** - Appointment title (required)
- **Location** - Meeting location
- **Start Date/Time** - Appointment start
- **End Date/Time** - Appointment end
- **All-Day** - Toggle for all-day appointments
- **Time Zone** - Start and end time zone selection
- **Notes** - Additional description
- **Recurrence** - Recurrence pattern configuration
- **Reminder** - Reminder settings
- **Resource** - Resource assignment (if resources configured)

## Creating Appointments via UI

### Creating from Time Cell

Double-click any time cell to open the appointment editor:

```csharp
// The editor opens automatically on double-click
// The start time is set to the clicked cell's time
// The end time is set to start time + 1 hour by default
```

### Creating All-Day Appointments

Double-click the view header to create all-day appointments:

**Note:** This only works when `AllowViewNavigation` is false, or when clicking on the date text (not outside it).

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      AllowViewNavigation="False" />
```

### Creating from Month Cell

Double-click any month cell to open the appointment editor:

```csharp
// In month view, double-clicking a cell creates an appointment
// Default: All-day appointment for that date
```

## Editing Appointments

### Editing via Double-Click

Double-click any existing appointment to open the editor with the appointment's current values pre-filled.

**The editor allows modifying:**
- Subject, location, notes
- Start and end times
- All-day status
- Time zones
- Recurrence pattern
- Resources

### Editing via AppointmentTapped Event

```csharp
Schedule.AppointmentTapped += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    // Custom editing logic
};
```

## Recurring Appointment Editing

When editing a recurring appointment, the scheduler displays a dialog asking:

**"Do you want to change only this occurrence or the series?"**

Options:
- **Just this one** - Edit only the selected occurrence
- **The series** - Edit the entire recurrence series

### Controlling Edit Mode

Use the `RecurringAppointmentBeginningEdit` event to control the edit mode:

```csharp
Schedule.RecurringAppointmentBeginningEdit += (s, e) =>
{
    // EditMode options: User, Occurrence, Series
    
    // Let user choose (default)
    e.EditMode = RecurringAppointmentEditMode.User;
    
    // Always edit only occurrence
    e.EditMode = RecurringAppointmentEditMode.Occurrence;
    
    // Always edit entire series
    e.EditMode = RecurringAppointmentEditMode.Series;
};
```

**EditMode Values:**
- `User` - Show dialog, let user choose (default)
- `Occurrence` - Automatically edit only the occurrence
- `Series` - Automatically edit the entire series

## Appointment Editor Events

### AppointmentEditorOpening Event

Triggered when the appointment editor is about to open:

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    // e.Appointment - Existing appointment (null for new)
    // e.DateTime - Date/time of clicked cell
    // e.Resource - Resource if applicable
    // e.Cancel - Set true to prevent editor opening
    // e.AppointmentEditorOptions - Control visible fields
    
    // Example: Cancel editor for past dates
    if (e.DateTime < DateTime.Now)
    {
        e.Cancel = true;
        return;
    }
    
    // Example: Use custom editor
    e.Cancel = true;
    ShowCustomEditor(e.Appointment, e.DateTime);
};
```

**Use Cases:**
- Implement custom appointment editor
- Validate before allowing edits
- Pre-populate fields with default values
- Restrict editing based on user permissions

### AppointmentEditorClosing Event

Triggered when the appointment editor is closing after save/cancel:

```csharp
Schedule.AppointmentEditorClosing += (s, e) =>
{
    // e.Appointment - The appointment being saved
    // e.Action - Add, Edit, Delete, or Cancel
    // e.Handled - Set true to handle save manually
    // e.Cancel - Set true to prevent closing
    // e.Resources - Resource collection for the appointment
    
    var appointment = e.Appointment as ScheduleAppointment;
    
    switch (e.Action)
    {
        case AppointmentEditorAction.Add:
            // Appointment is being added
            break;
        case AppointmentEditorAction.Edit:
            // Appointment is being edited
            break;
        case AppointmentEditorAction.Delete:
            // Appointment is being deleted
            break;
        case AppointmentEditorAction.Cancel:
            // User canceled editing
            break;
    }
    
    // Example: Prevent saving appointments on weekends
    if (appointment.StartTime.DayOfWeek == DayOfWeek.Saturday ||
        appointment.StartTime.DayOfWeek == DayOfWeek.Sunday)
    {
        e.Handled = true;
        // Show message to user
    }
};
```

**Use Cases:**
- Custom validation before saving
- Log appointment changes
- Sync with external calendar systems
- Apply business rules

## Appointment Resizing

Appointments can be resized by dragging the top or bottom edges (or left/right in timeline views).

### Resizing Behavior

- **Day/Week/WorkWeek Views:** Drag top or bottom edge vertically
- **Timeline Views:** Drag left or right edge horizontally
- **Month View:** Resizing not supported

### AppointmentResizing Event

```csharp
Schedule.AppointmentResizing += (s, e) =>
{
    // e.Appointment - Appointment being resized
    // e.Action - Starting, Progressing, Committing, Canceling
    // e.StartTime - New start time
    // e.EndTime - New end time
    // e.CanContinueResize - Allow/prevent resize
    // e.CanCommit - Allow/prevent final commit
    // e.Resource - Associated resource
    
    switch (e.Action)
    {
        case AppointmentResizeAction.Starting:
            // User starts resizing
            // Set CanContinueResize = false to prevent
            break;
            
        case AppointmentResizeAction.Progressing:
            // Resize in progress
            // Validate new times
            if (e.EndTime < e.StartTime.AddMinutes(30))
            {
                e.CanContinueResize = false; // Minimum 30 min
            }
            break;
            
        case AppointmentResizeAction.Committing:
            // User releases pointer to commit
            // Set CanCommit = false to reject changes
            break;
            
        case AppointmentResizeAction.Canceling:
            // User pressed Esc to cancel
            break;
    }
};
```

### Disabling Resize

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AppointmentEditFlag="Add,DragDrop,Edit" />
```

```csharp
// Disable only resize (allow other editing)
Schedule.AppointmentEditFlag = AppointmentEditFlag.Add | 
                               AppointmentEditFlag.DragDrop | 
                               AppointmentEditFlag.Edit;
```

## Deleting Appointments

### Delete Methods

**Method 1: Delete Key**
- Select an appointment
- Press the `Delete` key
- Appointment is removed

**Method 2: Appointment Editor**
- Open appointment editor
- Click "Delete" button
- Appointment is removed

### Deleting Recurring Appointments

When deleting a recurring appointment, the scheduler shows a dialog:

**"Do you want to delete only this occurrence or the series?"**

Options:
- **Delete this occurrence** - Delete only selected occurrence
- **Delete the series** - Delete entire recurrence series

### AppointmentDeleting Event

```csharp
Schedule.AppointmentDeleting += (s, e) =>
{
    // e.Appointment - Appointment being deleted
    // e.Cancel - Set true to prevent deletion
    
    var appointment = e.Appointment as ScheduleAppointment;
    
    // Example: Confirm before deleting
    var result = await ShowConfirmDialog($"Delete '{appointment.Subject}'?");
    if (!result)
    {
        e.Cancel = true;
    }
    
    // Example: Prevent deleting important appointments
    if (appointment.Subject.Contains("Important"))
    {
        e.Cancel = true;
        ShowMessage("Cannot delete important appointments");
    }
};
```

## Disabling Editing

### Disable All Editing

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AppointmentEditFlag="None" />
```

```csharp
Schedule.AppointmentEditFlag = AppointmentEditFlag.None;
```

This disables:
- Adding appointments
- Editing appointments
- Deleting appointments
- Drag-and-drop
- Resizing

### Selective Editing Control

```csharp
// Allow only adding new appointments
Schedule.AppointmentEditFlag = AppointmentEditFlag.Add;

// Allow editing and deleting, but not adding or dragging
Schedule.AppointmentEditFlag = AppointmentEditFlag.Edit | 
                               AppointmentEditFlag.Delete;

// Allow everything except resizing
Schedule.AppointmentEditFlag = AppointmentEditFlag.Add | 
                               AppointmentEditFlag.DragDrop | 
                               AppointmentEditFlag.Edit;
```

## Customization

### Hiding Editor Fields

Control which fields appear in the appointment editor:

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    // Hide specific fields using bitwise operations
    e.AppointmentEditorOptions = AppointmentEditorOptions.All & 
        ~AppointmentEditorOptions.Reminder & 
        ~AppointmentEditorOptions.Resource &
        ~AppointmentEditorOptions.Background &
        ~AppointmentEditorOptions.Foreground;
};
```

**AppointmentEditorOptions Values:**
- `All` - Show all fields
- `Subject` - Subject field (cannot hide)
- `Location` - Location field (cannot hide)
- `StartTime` - Start time field (cannot hide)
- `EndTime` - End time field (cannot hide)
- `AllDay` - All-day checkbox
- `TimeZone` - Time zone selection
- `Notes` - Notes field
- `Recurrence` - Recurrence configuration
- `Reminder` - Reminder settings
- `Resource` - Resource selection
- `Background` - Background color picker
- `Foreground` - Foreground color picker

**Note:** Subject, Location, Start Time, and End Time fields cannot be hidden as they are mandatory.

### Custom Appointment Editor

Replace the default editor with a custom implementation:

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    // Cancel default editor
    e.Cancel = true;
    
    // Show custom editor
    var customEditor = new CustomAppointmentEditor();
    
    if (e.Appointment != null)
    {
        // Editing existing appointment
        customEditor.LoadAppointment(e.Appointment);
    }
    else
    {
        // Creating new appointment
        customEditor.SetDefaultValues(e.DateTime, e.Resource);
    }
    
    var result = await customEditor.ShowAsync();
    
    if (result == ContentDialogResult.Primary)
    {
        var appointment = customEditor.GetAppointment();
        
        if (e.Appointment != null)
        {
            // Update existing
            UpdateAppointment(e.Appointment, appointment);
        }
        else
        {
            // Add new
            var appointments = Schedule.ItemsSource as ScheduleAppointmentCollection;
            appointments.Add(appointment);
        }
    }
};
```

## Best Practices

### Validation
- Validate appointment times before saving
- Ensure end time is after start time
- Check for appointment conflicts if needed
- Validate required fields

### User Experience
- Provide clear feedback when operations succeed or fail
- Confirm before deleting appointments
- Handle recurring appointment edits carefully
- Show meaningful error messages

### Performance
- Avoid heavy operations in editing events
- Use async operations for database updates
- Batch multiple changes when possible

### Data Integrity
- Handle exceptions gracefully
- Ensure data consistency when editing recurring appointments
- Properly update underlying data sources
- Maintain audit trails if required

## Common Patterns

### Pattern 1: Validate Before Save

```csharp
Schedule.AppointmentEditorClosing += (s, e) =>
{
    if (e.Action == AppointmentEditorAction.Add || 
        e.Action == AppointmentEditorAction.Edit)
    {
        var apt = e.Appointment as ScheduleAppointment;
        
        if (string.IsNullOrWhiteSpace(apt.Subject))
        {
            e.Handled = true;
            ShowError("Subject is required");
        }
    }
};
```

### Pattern 2: Restrict Editing Hours

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    // Only allow appointments between 8 AM and 6 PM
    if (e.DateTime.Hour < 8 || e.DateTime.Hour >= 18)
    {
        e.Cancel = true;
        ShowMessage("Appointments only allowed between 8 AM and 6 PM");
    }
};
```

### Pattern 3: Auto-fill Location

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    if (e.Appointment == null && e.Resource != null)
    {
        // Auto-fill location based on resource
        // This requires custom editor implementation
    }
};
```

## Troubleshooting

### Editor Not Opening

**Problem:** Double-clicking doesn't open the editor.

**Solutions:**
- Verify `AppointmentEditFlag` is not set to `None`
- Check if `AppointmentEditorOpening` event cancels the operation
- Ensure the control is properly initialized

### Changes Not Saving

**Problem:** Edits don't persist after saving.

**Solutions:**
- Check if `AppointmentEditorClosing` event sets `Handled = true`
- Verify `ItemsSource` is an `ObservableCollection`
- Ensure data binding is configured correctly
- Check for errors in event handlers

### Recurring Edit Dialog Not Showing

**Problem:** Recurring appointment edit dialog doesn't appear.

**Solutions:**
- Check `RecurringAppointmentBeginningEdit` event
- Verify `EditMode` is set to `User` (default)
- Ensure appointment has valid `RecurrenceRule`
