# Appointment Drag and Drop

This reference provides comprehensive guidance on appointment drag-and-drop functionality in the WinUI Scheduler for rescheduling appointments.

## Overview

The WinUI Scheduler supports rescheduling appointments by dragging and dropping them to different time slots or resources. This provides an intuitive way for users to reschedule meetings and events.

**Important Framework Note:** Due to a framework issue in Windows App SDK 1.1 and later, drag-and-drop functionality may not work until the framework resolves this issue. See [GitHub Issue #7231](https://github.com/microsoft/microsoft-ui-xaml/issues/7231).

## Drag and Drop Behavior

### Supported Views
- Day View
- Week View
- WorkWeek View
- TimelineDay View
- TimelineWeek View
- TimelineWorkWeek View
- TimelineMonth View

### Month View Note
Drag-and-drop is supported in Month view, but the appointment is rescheduled to the dropped date as an all-day appointment.

## Disabling Drag and Drop

### Disable for All Appointments

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AppointmentEditFlag="Add,Edit,Resize" />
```

```csharp
// Disable drag-drop, keep other edit features
Schedule.AppointmentEditFlag = AppointmentEditFlag.Add | 
                               AppointmentEditFlag.Edit | 
                               AppointmentEditFlag.Resize;
```

### Conditional Disabling

Use the `AppointmentDragStarting` event to conditionally prevent drag operations:

```csharp
Schedule.AppointmentDragStarting += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    
    // Prevent dragging past appointments
    if (appointment.StartTime < DateTime.Now)
    {
        e.Cancel = true;
    }
    
    // Prevent dragging important appointments
    if (appointment.Subject.Contains("Important"))
    {
        e.Cancel = true;
    }
};
```

## Time Indicator

### Show Time Indicator During Drag

Display a time indicator showing the exact time while dragging:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DragDropSettings>
        <scheduler:DragDropSettings ShowTimeIndicator="True" />
    </scheduler:SfScheduler.DragDropSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.DragDropSettings.ShowTimeIndicator = true;
```

**Note:** Time indicator is not applicable for Month and TimelineMonth views.

### Time Indicator Appearance

The time indicator appears in the time ruler showing the appointment's new start time during the drag operation.

**Visibility Requirement:** The time indicator only shows when `TimeRulerSize` is greater than zero (time ruler is visible).

## Time Indicator Format

Customize the time indicator format:

```csharp
Schedule.DragDropSettings.TimeIndicatorFormat = "HH:mm tt";
// or
Schedule.DragDropSettings.TimeIndicatorFormat = "h:mm tt";
// or
Schedule.DragDropSettings.TimeIndicatorFormat = "HH:mm";
```

**Common Formats:**
- `"h:mm tt"` - 12-hour with AM/PM (e.g., "2:30 PM")
- `"HH:mm"` - 24-hour (e.g., "14:30")
- `"hh:mm tt"` - 12-hour with leading zero (e.g., "02:30 PM")

## Drag and Drop Events

### AppointmentDragStarting Event

Triggered when the user begins dragging an appointment:

```csharp
Schedule.AppointmentDragStarting += (s, e) =>
{
    // e.Appointment - The appointment being dragged
    // e.Resource - Source resource
    // e.Cancel - Set true to prevent drag
    
    var appointment = e.Appointment as ScheduleAppointment;
    
    // Example: Only allow dragging future appointments
    if (appointment.StartTime < DateTime.Now)
    {
        e.Cancel = true;
        ShowMessage("Cannot reschedule past appointments");
        return;
    }
    
    // Example: Check user permissions
    if (!CurrentUser.CanEditAppointment(appointment))
    {
        e.Cancel = true;
    }
};
```

### AppointmentDragOver Event

Triggered continuously while dragging the appointment:

```csharp
Schedule.AppointmentDragOver += (s, e) =>
{
    // e.Appointment - The appointment being dragged
    // e.DraggingPoint - Current pointer position
    // e.DraggingTime - Time at current position
    // e.SourceResource - Original resource
    // e.TargetResource - Resource being dragged over
    
    var appointment = e.Appointment as ScheduleAppointment;
    
    // Example: Show feedback during drag
    var duration = appointment.EndTime - appointment.StartTime;
    var newEndTime = e.DraggingTime.Add(duration);
    
    UpdateDragFeedback($"New time: {e.DraggingTime:h:mm tt} - {newEndTime:h:mm tt}");
    
    // Example: Validate drop location
    if (e.DraggingTime.DayOfWeek == DayOfWeek.Saturday ||
        e.DraggingTime.DayOfWeek == DayOfWeek.Sunday)
    {
        ShowWarning("Cannot schedule on weekends");
    }
};
```

### AppointmentDropping Event

Triggered when the user releases the appointment:

```csharp
Schedule.AppointmentDropping += (s, e) =>
{
    // e.Appointment - The appointment being dropped
    // e.DropTime - New start time
    // e.SourceResource - Original resource
    // e.TargetResource - Target resource
    // e.Cancel - Set true to reject drop
    
    var appointment = e.Appointment as ScheduleAppointment;
    
    // Example: Validate business hours
    if (e.DropTime.Hour < 8 || e.DropTime.Hour >= 18)
    {
        e.Cancel = true;
        ShowMessage("Appointments must be scheduled between 8 AM and 6 PM");
        return;
    }
    
    // Example: Check for conflicts
    if (HasConflict(e.DropTime, appointment))
    {
        e.Cancel = true;
        ShowMessage("Appointment conflicts with existing appointment");
        return;
    }
    
    // Example: Confirm before rescheduling
    var result = await ConfirmReschedule(appointment, e.DropTime);
    if (!result)
    {
        e.Cancel = true;
    }
};
```

## Drag and Drop with Resources

When resources are configured, appointments can be dragged between resources:

```csharp
Schedule.AppointmentDragOver += (s, e) =>
{
    if (e.SourceResource != null && e.TargetResource != null)
    {
        // Dragging between resources
        var sourceRes = e.SourceResource as SchedulerResource;
        var targetRes = e.TargetResource as SchedulerResource;
        
        ShowFeedback($"Moving from {sourceRes.Name} to {targetRes.Name}");
    }
};

Schedule.AppointmentDropping += (s, e) =>
{
    if (e.SourceResource != e.TargetResource)
    {
        // Validate resource change
        if (!CanMoveToResource(e.Appointment, e.TargetResource))
        {
            e.Cancel = true;
            ShowMessage("Cannot move appointment to this resource");
        }
    }
};
```

## Common Patterns

### Pattern 1: Prevent Overlapping Appointments

```csharp
Schedule.AppointmentDropping += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    var duration = appointment.EndTime - appointment.StartTime;
    var newEndTime = e.DropTime.Add(duration);
    
    var appointments = Schedule.ItemsSource as ScheduleAppointmentCollection;
    var hasOverlap = appointments.Any(apt =>
        apt != appointment &&
        apt.StartTime < newEndTime &&
        apt.EndTime > e.DropTime);
    
    if (hasOverlap)
    {
        e.Cancel = true;
        ShowMessage("This time slot is already occupied");
    }
};
```

### Pattern 2: Snap to Time Intervals

```csharp
Schedule.AppointmentDropping += (s, e) =>
{
    // Snap to 15-minute intervals
    var minutes = e.DropTime.Minute;
    var remainder = minutes % 15;
    
    if (remainder != 0)
    {
        var snappedTime = e.DropTime.AddMinutes(-(remainder));
        // Note: Cannot modify e.DropTime directly
        // Handle in post-drop logic
    }
};
```

### Pattern 3: Log Appointment Changes

```csharp
Schedule.AppointmentDropping += (s, e) =>
{
    if (!e.Cancel)
    {
        var appointment = e.Appointment as ScheduleAppointment;
        var oldTime = appointment.StartTime;
        var newTime = e.DropTime;
        
        LogAppointmentChange(appointment.Id, oldTime, newTime, CurrentUser);
    }
};
```

### Pattern 4: Send Notifications

```csharp
Schedule.AppointmentDropping += async (s, e) =>
{
    if (!e.Cancel)
    {
        var appointment = e.Appointment as ScheduleAppointment;
        
        // Notify attendees of time change
        await NotifyAttendees(appointment, e.DropTime);
    }
};
```

## Touch Drag and Drop

### Enabling Touch Drag

By default, appointments can be dragged using touch gestures. However, if appointment selection needs to work with touch:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AppointmentEditFlag="Add,Edit,Resize" />
```

Disabling drag-drop allows touch to select appointments instead.

### Touch Context Menu Alternative

If drag-drop is disabled, use context flyout for rescheduling:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AppointmentEditFlag="Add,Edit,Resize">
    <scheduler:SfScheduler.AppointmentContextFlyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Reschedule" Click="RescheduleClicked"/>
        </MenuFlyout>
    </scheduler:SfScheduler.AppointmentContextFlyout>
</scheduler:SfScheduler>
```

## Visual Feedback

### Custom Drag Visual

While dragging, the appointment maintains its original appearance. Provide additional feedback using the `AppointmentDragOver` event:

```csharp
private TextBlock dragFeedback;

Schedule.AppointmentDragOver += (s, e) =>
{
    if (dragFeedback == null)
    {
        dragFeedback = new TextBlock
        {
            Foreground = new SolidColorBrush(Colors.Blue)
        };
        // Add to visual tree at appropriate location
    }
    
    dragFeedback.Text = $"Drop at: {e.DraggingTime:h:mm tt}";
    dragFeedback.Visibility = Visibility.Visible;
};

Schedule.AppointmentDropping += (s, e) =>
{
    if (dragFeedback != null)
    {
        dragFeedback.Visibility = Visibility.Collapsed;
    }
};
```

## Best Practices

### Validation
- Always validate drop locations for business rules
- Check for appointment conflicts
- Validate resource permissions
- Ensure dropped time is within allowed hours

### User Experience
- Provide clear visual feedback during drag
- Show time indicator when possible
- Give feedback on invalid drop locations
- Confirm significant time changes

### Performance
- Avoid heavy computations in `AppointmentDragOver`
- Use async operations for validation that requires I/O
- Cache resource permissions if checking frequently

### Error Handling
- Handle cancellation gracefully
- Provide meaningful error messages
- Log failures for debugging
- Roll back on save failures

## Troubleshooting

### Drag and Drop Not Working

**Problem:** Cannot drag appointments.

**Solutions:**
- Check if `AppointmentEditFlag` includes `DragDrop`
- Verify framework version (Windows App SDK issue)
- Check if `AppointmentDragStarting` event cancels the operation
- Ensure appointments are not read-only

### Time Indicator Not Showing

**Problem:** Time indicator doesn't appear during drag.

**Solutions:**
- Verify `ShowTimeIndicator = true` in `DragDropSettings`
- Check that `TimeRulerSize` is greater than zero
- Ensure view is Day, Week, or Timeline (not Month)
- Verify time ruler is visible

### Appointments Drop at Wrong Time

**Problem:** Appointments are scheduled at incorrect times after drop.

**Solutions:**
- Check time zone settings
- Verify `DropTime` value in `AppointmentDropping` event
- Ensure no custom logic is modifying times incorrectly
- Check `TimeInterval` settings for the view

### Resource Changes Not Working

**Problem:** Cannot drag appointments between resources.

**Solutions:**
- Verify `ResourceGroupType` is not `None`
- Check that resources are properly configured
- Ensure `TargetResource` is accessible in events
- Validate resource permissions

## Limitations

1. **Framework Issue:** Drag-and-drop may not work in Windows App SDK 1.1+ due to framework bug
2. **Month View:** Appointments drop as all-day appointments
3. **All-Day Panel:** Limited drag-and-drop support in all-day appointment panel
4. **Read-Only:** Drag-and-drop doesn't work for read-only appointments

