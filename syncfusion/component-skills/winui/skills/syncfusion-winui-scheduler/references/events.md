# Scheduler Events

## Table of Contents
- [Overview](#overview)
- [Cell Events](#cell-events)
- [Appointment Events](#appointment-events)
- [View Events](#view-events)
- [Selection Events](#selection-events)
- [Pointer Events](#pointer-events)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

The WinUI Scheduler provides comprehensive events for user interactions, view changes, and appointment operations. These events enable customization, validation, and integration with application logic.

## Cell Events

### CellTapped Event

Fires when a user taps/clicks on a time slot or date cell:

```csharp
Schedule.CellTapped += (s, e) =>
{
    // e.Element - Type of element tapped (Cell, Appointment, MoreAppointments, Header)
    // e.Date - DateTime of the tapped cell
    // e.Appointment - Appointment object (if Element is Appointment)
    // e.Resource - Resource object (if resource grouping is enabled)
    
    if (e.Element == SchedulerElement.Cell)
    {
        Debug.WriteLine($"Cell tapped: {e.Date:g}");
        
        // Create appointment on cell tap
        CreateQuickAppointment(e.Date);
    }
    else if (e.Element == SchedulerElement.Appointment)
    {
        Debug.WriteLine($"Appointment tapped: {e.Appointment.Subject}");
        ShowAppointmentDetails(e.Appointment);
    }
    else if (e.Element == SchedulerElement.MoreAppointments)
    {
        Debug.WriteLine($"More appointments clicked for {e.Date:d}");
        // Agenda view opens automatically
    }
};
```

**SchedulerElement Values:**
- `Cell` - Time slot or date cell
- `Appointment` - Appointment block
- `MoreAppointments` - "+N more" indicator (Month view)
- `Header` - View header (day/date header)

### CellDoubleTapped Event

Fires when a user double-taps/double-clicks on a cell:

```csharp
Schedule.CellDoubleTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        // Open appointment editor on double-tap
        OpenAppointmentEditor(e.Date, e.Resource);
    }
};

private void OpenAppointmentEditor(DateTime startTime, object resource)
{
    var newAppointment = new ScheduleAppointment
    {
        Subject = "",
        StartTime = startTime,
        EndTime = startTime.AddHours(1)
    };
    
    if (resource != null)
    {
        newAppointment.ResourceIds = new ObservableCollection<object> 
        { 
            (resource as SchedulerResource).Id 
        };
    }
    
    Schedule.ItemsSource.Add(newAppointment);
    // Built-in editor opens automatically
}
```

### CellLongPressed Event

Fires when a user long-presses on a cell (touch gesture):

```csharp
Schedule.CellLongPressed += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        Debug.WriteLine($"Long press on: {e.Date:g}");
        
        // Show context menu or custom flyout
        ShowContextMenu(e.Date);
    }
};
```

## Appointment Events

### AppointmentTapped Event

Fires when an appointment is tapped:

```csharp
Schedule.AppointmentTapped += (s, e) =>
{
    // e.Appointment - The tapped appointment
    // e.Element - Will be SchedulerElement.Appointment
    // e.Resource - Associated resource (if resource grouping enabled)
    
    var appointment = e.Appointment as ScheduleAppointment;
    Debug.WriteLine($"Appointment tapped: {appointment.Subject}");
    
    ShowAppointmentPopup(appointment);
};
```

### AppointmentDoubleTapped Event

Fires when an appointment is double-tapped (opens editor by default):

```csharp
Schedule.AppointmentDoubleTapped += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    Debug.WriteLine($"Appointment double-tapped: {appointment.Subject}");
    
    // Default: Opens appointment editor
    // Cancel to prevent editor and handle custom action
    // e.Cancel = true;
    // ShowCustomEditor(appointment);
};
```

### AppointmentLongPressed Event

Fires when an appointment is long-pressed (touch):

```csharp
Schedule.AppointmentLongPressed += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    Debug.WriteLine($"Appointment long-pressed: {appointment.Subject}");
    
    // Show context menu
    ShowAppointmentContextMenu(appointment);
};
```

### SelectionChanged Event

Fires when appointment selection changes:

```csharp
Schedule.SelectionChanged += (s, e) =>
{
    // e.OldValue - Previously selected appointment(s)
    // e.NewValue - Newly selected appointment(s)
    
    if (e.NewValue != null && e.NewValue.Count > 0)
    {
        var selected = e.NewValue[0] as ScheduleAppointment;
        Debug.WriteLine($"Selected: {selected.Subject}");
        
        UpdateDetailsPanel(selected);
    }
    else
    {
        Debug.WriteLine("No appointment selected");
        ClearDetailsPanel();
    }
};
```

## View Events

### ViewChanged Event

Fires when the view changes (date range or view type):

```csharp
Schedule.ViewChanged += (s, e) =>
{
    // e.OldVisibleDates - Previous date range
    // e.NewVisibleDates - New date range
    // e.OldViewType - Previous view type
    // e.NewViewType - Current view type
    
    Debug.WriteLine($"View changed from {e.OldViewType} to {e.NewViewType}");
    
    var newRange = $"{e.NewVisibleDates.First():MMM dd} - {e.NewVisibleDates.Last():MMM dd}";
    Debug.WriteLine($"New date range: {newRange}");
    
    // Load appointments for new range
    LoadAppointments(e.NewVisibleDates.First(), e.NewVisibleDates.Last());
};
```

**Triggers:**
- `Forward()` / `Backward()` navigation
- Setting `DisplayDate` property
- Changing `ViewType` property

## Selection Events

### Appointment Selection

Enable and handle appointment selection:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      SelectionMode="Single"
                      SelectionChanged="Schedule_SelectionChanged" />
```

```csharp
// Single selection
Schedule.SelectionMode = SelectionMode.Single;

// Multiple selection
Schedule.SelectionMode = SelectionMode.Multiple;

// No selection
Schedule.SelectionMode = SelectionMode.None;

// Get selected appointment(s)
var selected = Schedule.SelectedAppointment; // Single mode
var selected = Schedule.SelectedAppointments; // Multiple mode

// Programmatically select
Schedule.SelectedAppointment = myAppointment;
```

### Selection Changed Handler

```csharp
Schedule.SelectionChanged += (s, e) =>
{
    if (Schedule.SelectionMode == SelectionMode.Single)
    {
        if (e.NewValue != null && e.NewValue.Count > 0)
        {
            var appointment = e.NewValue[0] as ScheduleAppointment;
            Debug.WriteLine($"Selected: {appointment.Subject}");
        }
    }
    else if (Schedule.SelectionMode == SelectionMode.Multiple)
    {
        Debug.WriteLine($"Selected {e.NewValue.Count} appointments");
        foreach (ScheduleAppointment apt in e.NewValue)
        {
            Debug.WriteLine($"  - {apt.Subject}");
        }
    }
};
```

## Pointer Events

### PointerPressed Event

```csharp
Schedule.PointerPressed += (s, e) =>
{
    var position = e.GetCurrentPoint(Schedule).Position;
    Debug.WriteLine($"Pointer pressed at: {position.X}, {position.Y}");
    
    // Use for custom interactions
};
```

### PointerMoved Event

```csharp
Schedule.PointerMoved += (s, e) =>
{
    // Track pointer movement
    // Useful for custom drag-drop or tooltips
};
```

### PointerReleased Event

```csharp
Schedule.PointerReleased += (s, e) =>
{
    // Handle custom pointer release logic
};
```

## Common Patterns

### Pattern 1: Quick Appointment Creation

```csharp
Schedule.CellTapped += async (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        var result = await ShowQuickAddDialog(e.Date);
        if (result != null)
        {
            var appointment = new ScheduleAppointment
            {
                Subject = result.Subject,
                StartTime = e.Date,
                EndTime = e.Date.AddHours(result.Duration),
                Background = new SolidColorBrush(result.Color)
            };
            
            Schedule.ItemsSource.Add(appointment);
        }
    }
};
```

### Pattern 2: Appointment Details Popup

```csharp
Schedule.AppointmentTapped += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    
    var flyout = new Flyout
    {
        Content = new StackPanel
        {
            Children =
            {
                new TextBlock { Text = appointment.Subject, FontWeight = FontWeights.Bold },
                new TextBlock { Text = $"From: {appointment.StartTime:g}" },
                new TextBlock { Text = $"To: {appointment.EndTime:g}" },
                new TextBlock { Text = appointment.Notes },
                new Button { Content = "Edit", Command = EditCommand, CommandParameter = appointment },
                new Button { Content = "Delete", Command = DeleteCommand, CommandParameter = appointment }
            }
        }
    };
    
    flyout.ShowAt(Schedule);
};
```

### Pattern 3: Lazy Load Appointments

```csharp
private DateTime _currentRangeStart;
private DateTime _currentRangeEnd;
private ScheduleAppointmentCollection _appointments = new ScheduleAppointmentCollection();

Schedule.ViewChanged += async (s, e) =>
{
    var newStart = e.NewVisibleDates.First();
    var newEnd = e.NewVisibleDates.Last();
    
    // Load if navigating to new range
    if (newStart < _currentRangeStart || newEnd > _currentRangeEnd)
    {
        ShowLoadingIndicator();
        
        var appointments = await LoadAppointmentsFromServerAsync(newStart, newEnd);
        
        foreach (var apt in appointments)
        {
            if (!_appointments.Any(a => a.Id == apt.Id))
            {
                _appointments.Add(apt);
            }
        }
        
        Schedule.ItemsSource = _appointments;
        
        _currentRangeStart = newStart;
        _currentRangeEnd = newEnd;
        
        HideLoadingIndicator();
    }
};
```

### Pattern 4: Prevent Overlapping Appointments

```csharp
Schedule.CellDoubleTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        var newStart = e.Date;
        var newEnd = newStart.AddHours(1);
        
        // Check for conflicts
        var hasConflict = (Schedule.ItemsSource as ScheduleAppointmentCollection)
            .Any(apt => apt.StartTime < newEnd && apt.EndTime > newStart);
        
        if (hasConflict)
        {
            ShowMessage("Time slot is already occupied");
            return;
        }
        
        // Create appointment
        var appointment = new ScheduleAppointment
        {
            Subject = "New Appointment",
            StartTime = newStart,
            EndTime = newEnd
        };
        
        Schedule.ItemsSource.Add(appointment);
    }
};
```

### Pattern 5: Context Menu on Long Press

```csharp
Schedule.CellLongPressed += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        var flyout = new MenuFlyout();
        
        var newItem = new MenuFlyoutItem { Text = "New Appointment" };
        newItem.Click += (sender, args) => CreateAppointment(e.Date);
        flyout.Items.Add(newItem);
        
        var pasteItem = new MenuFlyoutItem { Text = "Paste Appointment" };
        pasteItem.Click += (sender, args) => PasteAppointment(e.Date);
        flyout.Items.Add(pasteItem);
        
        flyout.ShowAt(Schedule);
    }
};

Schedule.AppointmentLongPressed += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    
    var flyout = new MenuFlyout();
    
    var editItem = new MenuFlyoutItem { Text = "Edit" };
    editItem.Click += (sender, args) => EditAppointment(appointment);
    flyout.Items.Add(editItem);
    
    var copyItem = new MenuFlyoutItem { Text = "Copy" };
    copyItem.Click += (sender, args) => CopyAppointment(appointment);
    flyout.Items.Add(copyItem);
    
    var deleteItem = new MenuFlyoutItem { Text = "Delete" };
    deleteItem.Click += (sender, args) => DeleteAppointment(appointment);
    flyout.Items.Add(deleteItem);
    
    flyout.ShowAt(Schedule);
};
```

### Pattern 6: Update External UI on Selection

```csharp
private TextBlock detailsSubject;
private TextBlock detailsTime;
private TextBlock detailsNotes;

Schedule.SelectionChanged += (s, e) =>
{
    if (e.NewValue != null && e.NewValue.Count > 0)
    {
        var appointment = e.NewValue[0] as ScheduleAppointment;
        
        detailsSubject.Text = appointment.Subject;
        detailsTime.Text = $"{appointment.StartTime:g} - {appointment.EndTime:g}";
        detailsNotes.Text = appointment.Notes ?? "No notes";
        
        DetailsPanel.Visibility = Visibility.Visible;
    }
    else
    {
        DetailsPanel.Visibility = Visibility.Collapsed;
    }
};
```

### Pattern 7: Track View Changes

```csharp
private Stack<(SchedulerViewType viewType, DateTime displayDate)> _navigationHistory = new();

Schedule.ViewChanged += (s, e) =>
{
    _navigationHistory.Push((e.OldViewType, Schedule.DisplayDate));
    
    Debug.WriteLine($"Navigation: {e.OldViewType} -> {e.NewViewType}");
    
    BackButton.IsEnabled = _navigationHistory.Count > 0;
};

private void BackButton_Click(object sender, RoutedEventArgs e)
{
    if (_navigationHistory.Count > 0)
    {
        var previous = _navigationHistory.Pop();
        Schedule.ViewType = previous.viewType;
        Schedule.DisplayDate = previous.displayDate;
    }
}
```

## Best Practices

### Event Handlers
- Keep event handlers fast and responsive
- Use async/await for I/O operations
- Avoid blocking UI thread
- Handle exceptions gracefully

### User Interactions
- Provide visual feedback for taps/clicks
- Show loading indicators for async operations
- Validate user actions before processing
- Give clear error messages

### Performance
- Debounce frequently firing events (PointerMoved)
- Lazy load data in ViewChanged
- Cache results when possible
- Unsubscribe from events when no longer needed

### Accessibility
- Support keyboard navigation
- Provide alternative interaction methods
- Announce changes to screen readers
- Ensure touch targets are sufficiently large

## Troubleshooting

### Event Not Firing

**Problem:** Event handler doesn't execute.

**Solutions:**
- Verify event handler is properly subscribed
- Check if event is canceled by another handler
- Ensure control is not disabled
- Verify correct element type in handler condition

### Multiple Events Fire Unexpectedly

**Problem:** Same event fires multiple times.

**Solutions:**
- Check for duplicate event subscriptions
- Unsubscribe before resubscribing
- Use -= before += when attaching handlers
- Check if nested controls trigger events

### CellTapped Not Working

**Problem:** Cell taps not detected.

**Solutions:**
- Verify `AppointmentEditFlag` doesn't disable all interactions
- Check if pointer events are being handled elsewhere
- Ensure scheduler is not in read-only mode
- Test with simple handler first

### Selection Not Working

**Problem:** Appointments don't select.

**Solutions:**
- Set `SelectionMode` to `Single` or `Multiple`
- Check if selection is programmatically cleared
- Verify appointments are selectable
- Ensure no event handler cancels selection

### ViewChanged Fires Too Often

**Problem:** ViewChanged event triggers excessively.

**Solutions:**
- Check if DisplayDate is being set repeatedly
- Verify no infinite loop in handler
- Debounce handler if needed
- Check for data binding issues

### Appointment Events Not Firing

**Problem:** AppointmentTapped or similar events don't fire.

**Solutions:**
- Verify appointments are in ItemsSource
- Check if CellTapped handler handles appointment taps
- Ensure appointments are visible (not filtered out)
- Test with simple event handler
