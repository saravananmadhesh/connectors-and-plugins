# Context Flyout and Commands

This reference provides comprehensive guidance on implementing context menus, flyouts, and commands in the WinUI Scheduler.

## Overview

The WinUI Scheduler supports custom context flyouts and commands for appointments and cells, enabling rich interaction patterns beyond the default behavior.

## Context Flyout

### Default Context Flyout

The scheduler provides built-in context menu functionality. You can customize or replace it.

### Custom Appointment Context Flyout

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.AppointmentContextFlyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Edit" Click="EditAppointment_Click">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE70F;"/>
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
            
            <MenuFlyoutItem Text="Copy" Click="CopyAppointment_Click">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE8C8;"/>
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
            
            <MenuFlyoutSeparator/>
            
            <MenuFlyoutItem Text="Delete" Click="DeleteAppointment_Click">
                <MenuFlyoutItem.Icon>
                    <FontIcon Glyph="&#xE74D;"/>
                </MenuFlyoutItem.Icon>
            </MenuFlyoutItem>
        </MenuFlyout>
    </scheduler:SfScheduler.AppointmentContextFlyout>
</scheduler:SfScheduler>
```

```csharp
private ScheduleAppointment _contextAppointment;

private void EditAppointment_Click(object sender, RoutedEventArgs e)
{
    // Edit appointment logic
    OpenAppointmentEditor(_contextAppointment);
}

private void CopyAppointment_Click(object sender, RoutedEventArgs e)
{
    // Copy appointment
    var copy = new ScheduleAppointment
    {
        Subject = _contextAppointment.Subject + " (Copy)",
        StartTime = _contextAppointment.StartTime,
        EndTime = _contextAppointment.EndTime,
        Background = _contextAppointment.Background
    };
    
    Schedule.ItemsSource.Add(copy);
}

private async void DeleteAppointment_Click(object sender, RoutedEventArgs e)
{
    var dialog = new ContentDialog
    {
        Title = "Delete Appointment",
        Content = $"Delete '{_contextAppointment.Subject}'?",
        PrimaryButtonText = "Delete",
        CloseButtonText = "Cancel",
        XamlRoot = this.XamlRoot
    };
    
    if (await dialog.ShowAsync() == ContentDialogResult.Primary)
    {
        Schedule.ItemsSource.Remove(_contextAppointment);
    }
}
```

### Cell Context Flyout

```csharp
Schedule.CellLongPressed += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        var flyout = new MenuFlyout();
        
        var newItem = new MenuFlyoutItem { Text = "New Appointment" };
        newItem.Click += (sender, args) => CreateAppointment(e.Date);
        flyout.Items.Add(newItem);
        
        if (_clipboard != null)
        {
            var pasteItem = new MenuFlyoutItem { Text = "Paste Appointment" };
            pasteItem.Click += (sender, args) => PasteAppointment(e.Date);
            flyout.Items.Add(pasteItem);
        }
        
        flyout.ShowAt(Schedule, e.Position);
    }
};
```

## Commands

### ICommand Implementation

```csharp
public class RelayCommand : ICommand
{
    private readonly Action<object> _execute;
    private readonly Func<object, bool> _canExecute;
    
    public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
    {
        _execute = execute ?? throw new ArgumentNullException(nameof(execute));
        _canExecute = canExecute;
    }
    
    public event EventHandler CanExecuteChanged;
    
    public bool CanExecute(object parameter)
    {
        return _canExecute == null || _canExecute(parameter);
    }
    
    public void Execute(object parameter)
    {
        _execute(parameter);
    }
    
    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

### Appointment Commands

```csharp
public class AppointmentCommands
{
    public ICommand EditCommand { get; }
    public ICommand DeleteCommand { get; }
    public ICommand CopyCommand { get; }
    public ICommand MoveCommand { get; }
    public ICommand MarkCompleteCommand { get; }
    
    public AppointmentCommands(SfScheduler scheduler)
    {
        EditCommand = new RelayCommand(
            execute: obj => EditAppointment(obj as ScheduleAppointment),
            canExecute: obj => obj is ScheduleAppointment);
        
        DeleteCommand = new RelayCommand(
            execute: obj => DeleteAppointment(obj as ScheduleAppointment, scheduler),
            canExecute: obj => obj is ScheduleAppointment);
        
        CopyCommand = new RelayCommand(
            execute: obj => CopyAppointment(obj as ScheduleAppointment, scheduler),
            canExecute: obj => obj is ScheduleAppointment);
        
        MoveCommand = new RelayCommand(
            execute: obj => MoveAppointment(obj as ScheduleAppointment),
            canExecute: obj => obj is ScheduleAppointment);
        
        MarkCompleteCommand = new RelayCommand(
            execute: obj => MarkComplete(obj as ScheduleAppointment),
            canExecute: obj => obj is ScheduleAppointment apt && !apt.IsCompleted);
    }
    
    private void EditAppointment(ScheduleAppointment appointment)
    {
        // Open editor
    }
    
    private void DeleteAppointment(ScheduleAppointment appointment, SfScheduler scheduler)
    {
        scheduler.ItemsSource.Remove(appointment);
    }
    
    private void CopyAppointment(ScheduleAppointment appointment, SfScheduler scheduler)
    {
        var copy = new ScheduleAppointment
        {
            Subject = appointment.Subject + " (Copy)",
            StartTime = appointment.StartTime.AddDays(1),
            EndTime = appointment.EndTime.AddDays(1),
            Background = appointment.Background
        };
        
        scheduler.ItemsSource.Add(copy);
    }
    
    private void MoveAppointment(ScheduleAppointment appointment)
    {
        // Show date picker for moving
    }
    
    private void MarkComplete(ScheduleAppointment appointment)
    {
        appointment.IsCompleted = true;
        appointment.Background = new SolidColorBrush(Colors.Gray);
    }
}
```

### Using Commands in Flyout

```xml
<Page.Resources>
    <local:AppointmentCommands x:Key="AppointmentCommands"/>
</Page.Resources>

<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.AppointmentContextFlyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Edit" 
                          Command="{StaticResource AppointmentCommands.EditCommand}"
                          CommandParameter="{Binding}"/>
            
            <MenuFlyoutItem Text="Delete" 
                          Command="{StaticResource AppointmentCommands.DeleteCommand}"
                          CommandParameter="{Binding}"/>
        </MenuFlyout>
    </scheduler:SfScheduler.AppointmentContextFlyout>
</scheduler:SfScheduler>
```

## Common Patterns

### Pattern 1: Multi-Action Flyout

```csharp
private void ShowAppointmentFlyout(ScheduleAppointment appointment, Point position)
{
    var flyout = new MenuFlyout();
    
    // View
    var viewItem = new MenuFlyoutItem 
    { 
        Text = "View Details",
        Icon = new FontIcon { Glyph = "\uE8F4" }
    };
    viewItem.Click += (s, e) => ShowDetails(appointment);
    flyout.Items.Add(viewItem);
    
    // Edit
    var editItem = new MenuFlyoutItem 
    { 
        Text = "Edit",
        Icon = new FontIcon { Glyph = "\uE70F" },
        KeyboardAcceleratorTextOverride = "Ctrl+E"
    };
    editItem.Click += (s, e) => EditAppointment(appointment);
    flyout.Items.Add(editItem);
    
    // Duplicate
    var duplicateItem = new MenuFlyoutItem 
    { 
        Text = "Duplicate",
        Icon = new FontIcon { Glyph = "\uE8C8" }
    };
    duplicateItem.Click += (s, e) => DuplicateAppointment(appointment);
    flyout.Items.Add(duplicateItem);
    
    flyout.Items.Add(new MenuFlyoutSeparator());
    
    // Move to
    var moveSubmenu = new MenuFlyoutSubItem 
    { 
        Text = "Move to",
        Icon = new FontIcon { Glyph = "\uE8DE" }
    };
    
    moveSubmenu.Items.Add(CreateMoveItem("Tomorrow", 1, appointment));
    moveSubmenu.Items.Add(CreateMoveItem("Next Week", 7, appointment));
    moveSubmenu.Items.Add(CreateMoveItem("Next Month", 30, appointment));
    flyout.Items.Add(moveSubmenu);
    
    // Change color
    var colorSubmenu = new MenuFlyoutSubItem 
    { 
        Text = "Change Color",
        Icon = new FontIcon { Glyph = "\uE790" }
    };
    
    colorSubmenu.Items.Add(CreateColorItem("Blue", Colors.Blue, appointment));
    colorSubmenu.Items.Add(CreateColorItem("Green", Colors.Green, appointment));
    colorSubmenu.Items.Add(CreateColorItem("Red", Colors.Red, appointment));
    flyout.Items.Add(colorSubmenu);
    
    flyout.Items.Add(new MenuFlyoutSeparator());
    
    // Delete
    var deleteItem = new MenuFlyoutItem 
    { 
        Text = "Delete",
        Icon = new FontIcon { Glyph = "\uE74D", Foreground = new SolidColorBrush(Colors.Red) },
        KeyboardAcceleratorTextOverride = "Delete"
    };
    deleteItem.Click += async (s, e) => await DeleteAppointment(appointment);
    flyout.Items.Add(deleteItem);
    
    flyout.ShowAt(Schedule, position);
}

private MenuFlyoutItem CreateMoveItem(string label, int days, ScheduleAppointment appointment)
{
    var item = new MenuFlyoutItem { Text = label };
    item.Click += (s, e) =>
    {
        appointment.StartTime = appointment.StartTime.AddDays(days);
        appointment.EndTime = appointment.EndTime.AddDays(days);
    };
    return item;
}

private MenuFlyoutItem CreateColorItem(string label, Color color, ScheduleAppointment appointment)
{
    var item = new MenuFlyoutItem 
    { 
        Text = label,
        Icon = new FontIcon 
        { 
            Glyph = "\u2B24", 
            Foreground = new SolidColorBrush(color) 
        }
    };
    item.Click += (s, e) => appointment.Background = new SolidColorBrush(color);
    return item;
}
```

### Pattern 2: Conditional Menu Items

```csharp
private MenuFlyout CreateConditionalFlyout(ScheduleAppointment appointment)
{
    var flyout = new MenuFlyout();
    
    // Always show Edit
    var editItem = new MenuFlyoutItem { Text = "Edit" };
    editItem.Click += (s, e) => EditAppointment(appointment);
    flyout.Items.Add(editItem);
    
    // Show "Mark Complete" only if not completed
    if (!appointment.IsCompleted)
    {
        var completeItem = new MenuFlyoutItem 
        { 
            Text = "Mark Complete",
            Icon = new FontIcon { Glyph = "\uE73E" }
        };
        completeItem.Click += (s, e) => MarkComplete(appointment);
        flyout.Items.Add(completeItem);
    }
    
    // Show "Reopen" only if completed
    if (appointment.IsCompleted)
    {
        var reopenItem = new MenuFlyoutItem 
        { 
            Text = "Reopen",
            Icon = new FontIcon { Glyph = "\uE7A7" }
        };
        reopenItem.Click += (s, e) => ReopenAppointment(appointment);
        flyout.Items.Add(reopenItem);
    }
    
    // Show "Share" only if appointment is in the future
    if (appointment.StartTime > DateTime.Now)
    {
        var shareItem = new MenuFlyoutItem 
        { 
            Text = "Share",
            Icon = new FontIcon { Glyph = "\uE72D" }
        };
        shareItem.Click += (s, e) => ShareAppointment(appointment);
        flyout.Items.Add(shareItem);
    }
    
    // Show "Cancel" only if recurring
    if (appointment.RecurrenceRule != null)
    {
        var cancelItem = new MenuFlyoutItem 
        { 
            Text = "Cancel Series",
            Icon = new FontIcon { Glyph = "\uE711" }
        };
        cancelItem.Click += async (s, e) => await CancelSeries(appointment);
        flyout.Items.Add(cancelItem);
    }
    
    flyout.Items.Add(new MenuFlyoutSeparator());
    
    // Always show Delete
    var deleteItem = new MenuFlyoutItem { Text = "Delete" };
    deleteItem.Click += async (s, e) => await DeleteAppointment(appointment);
    flyout.Items.Add(deleteItem);
    
    return flyout;
}
```

### Pattern 3: Keyboard Shortcuts

```csharp
private void SetupKeyboardShortcuts()
{
    Schedule.KeyDown += (s, e) =>
    {
        var selectedAppointment = Schedule.SelectedAppointment as ScheduleAppointment;
        
        if (selectedAppointment == null)
            return;
        
        bool isCtrl = Window.Current.CoreWindow.GetKeyState(VirtualKey.Control)
            .HasFlag(CoreVirtualKeyStates.Down);
        
        bool isShift = Window.Current.CoreWindow.GetKeyState(VirtualKey.Shift)
            .HasFlag(CoreVirtualKeyStates.Down);
        
        if (isCtrl)
        {
            switch (e.Key)
            {
                case VirtualKey.E:
                    EditAppointment(selectedAppointment);
                    e.Handled = true;
                    break;
                    
                case VirtualKey.C:
                    CopyAppointment(selectedAppointment);
                    e.Handled = true;
                    break;
                    
                case VirtualKey.X:
                    CutAppointment(selectedAppointment);
                    e.Handled = true;
                    break;
                    
                case VirtualKey.V:
                    PasteAppointment(Schedule.DisplayDate);
                    e.Handled = true;
                    break;
            }
        }
        
        if (e.Key == VirtualKey.Delete)
        {
            DeleteAppointment(selectedAppointment);
            e.Handled = true;
        }
        
        if (e.Key == VirtualKey.F2)
        {
            EditAppointment(selectedAppointment);
            e.Handled = true;
        }
    };
}
```

### Pattern 4: Custom Flyout with Details

```csharp
private async void ShowDetailedFlyout(ScheduleAppointment appointment)
{
    var flyout = new Flyout
    {
        Placement = FlyoutPlacementMode.Top
    };
    
    var content = new StackPanel { Width = 300 };
    
    // Header
    var header = new TextBlock
    {
        Text = appointment.Subject,
        FontSize = 18,
        FontWeight = FontWeights.Bold,
        Margin = new Thickness(0, 0, 0, 10)
    };
    content.Children.Add(header);
    
    // Time
    var time = new TextBlock
    {
        Text = $"{appointment.StartTime:g} - {appointment.EndTime:g}",
        FontSize = 14,
        Foreground = new SolidColorBrush(Colors.Gray),
        Margin = new Thickness(0, 0, 0, 10)
    };
    content.Children.Add(time);
    
    // Notes
    if (!string.IsNullOrEmpty(appointment.Notes))
    {
        var notes = new TextBlock
        {
            Text = appointment.Notes,
            TextWrapping = TextWrapping.Wrap,
            Margin = new Thickness(0, 0, 0, 10)
        };
        content.Children.Add(notes);
    }
    
    // Action buttons
    var buttons = new StackPanel 
    { 
        Orientation = Orientation.Horizontal, 
        HorizontalAlignment = HorizontalAlignment.Right,
        Spacing = 10
    };
    
    var editButton = new Button 
    { 
        Content = "Edit",
        Style = (Style)Application.Current.Resources["AccentButtonStyle"]
    };
    editButton.Click += (s, e) =>
    {
        flyout.Hide();
        EditAppointment(appointment);
    };
    buttons.Children.Add(editButton);
    
    var deleteButton = new Button { Content = "Delete" };
    deleteButton.Click += async (s, e) =>
    {
        flyout.Hide();
        await DeleteAppointment(appointment);
    };
    buttons.Children.Add(deleteButton);
    
    content.Children.Add(buttons);
    
    flyout.Content = content;
    flyout.ShowAt(Schedule);
}
```

### Pattern 5: Quick Actions Bar

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    
    <!-- Quick Actions -->
    <CommandBar Grid.Row="0" DefaultLabelPosition="Right">
        <AppBarButton Icon="Add" Label="New" Click="NewAppointment_Click"/>
        <AppBarButton Icon="Edit" Label="Edit" Click="EditSelected_Click"/>
        <AppBarButton Icon="Copy" Label="Copy" Click="CopySelected_Click"/>
        <AppBarButton Icon="Delete" Label="Delete" Click="DeleteSelected_Click"/>
        <AppBarSeparator/>
        <AppBarButton Icon="Calendar" Label="Today" Click="GoToToday_Click"/>
    </CommandBar>
    
    <!-- Scheduler -->
    <scheduler:SfScheduler x:Name="Schedule" Grid.Row="1" ViewType="Week"/>
</Grid>
```

```csharp
private void NewAppointment_Click(object sender, RoutedEventArgs e)
{
    var appointment = new ScheduleAppointment
    {
        Subject = "New Appointment",
        StartTime = Schedule.DisplayDate,
        EndTime = Schedule.DisplayDate.AddHours(1)
    };
    
    Schedule.ItemsSource.Add(appointment);
}

private void EditSelected_Click(object sender, RoutedEventArgs e)
{
    if (Schedule.SelectedAppointment is ScheduleAppointment appointment)
    {
        EditAppointment(appointment);
    }
}

private void CopySelected_Click(object sender, RoutedEventArgs e)
{
    if (Schedule.SelectedAppointment is ScheduleAppointment appointment)
    {
        CopyAppointment(appointment);
    }
}

private async void DeleteSelected_Click(object sender, RoutedEventArgs e)
{
    if (Schedule.SelectedAppointment is ScheduleAppointment appointment)
    {
        await DeleteAppointment(appointment);
    }
}

private void GoToToday_Click(object sender, RoutedEventArgs e)
{
    Schedule.DisplayDate = DateTime.Today;
}
```

## Best Practices

### Context Menus
- Show relevant actions only
- Use icons for better recognition
- Group related actions with separators
- Provide keyboard shortcuts for common actions
- Keep menu depth shallow (max 2 levels)

### Commands
- Implement CanExecute for conditional availability
- Use RelayCommand or similar pattern
- Keep command logic separate from UI
- Make commands reusable across views

### User Experience
- Show immediate visual feedback
- Confirm destructive actions
- Support undo/redo for important operations
- Provide tooltips for icon-only buttons

