# Reminder and Notifications

This reference provides comprehensive guidance on implementing reminder and notification functionality for appointments in the WinUI Scheduler.

## Overview

While the WinUI Scheduler does not have built-in reminder functionality, you can implement reminders using Windows notifications and background tasks to alert users before appointments begin.

**Implementation Approaches:**
- Windows notifications (toast notifications)
- Background tasks for scheduled reminders
- In-app notifications
- Custom reminder dialogs

## Windows Toast Notifications

### Setting Up Notifications

Add the required package:

```xml
<PackageReference Include="Microsoft.Toolkit.Uwp.Notifications" Version="7.1.2" />
```

### Basic Toast Notification

```csharp
using Microsoft.Toolkit.Uwp.Notifications;

public class ReminderService
{
    public void ShowReminder(ScheduleAppointment appointment)
    {
        new ToastContentBuilder()
            .AddText($"Reminder: {appointment.Subject}")
            .AddText($"Starting at {appointment.StartTime:h:mm tt}")
            .AddButton(new ToastButton()
                .SetContent("View")
                .AddArgument("action", "view")
                .AddArgument("appointmentId", appointment.Id.ToString()))
            .AddButton(new ToastButton()
                .SetContent("Snooze")
                .AddArgument("action", "snooze")
                .AddArgument("appointmentId", appointment.Id.ToString()))
            .Show();
    }
}
```

### Advanced Toast with Image

```csharp
public void ShowReminderWithImage(ScheduleAppointment appointment)
{
    new ToastContentBuilder()
        .AddAppLogoOverride(new Uri("ms-appx:///Assets/reminder-icon.png"), ToastGenericAppLogoCrop.Circle)
        .AddText($"{appointment.Subject}")
        .AddText($"Starts: {appointment.StartTime:MMM dd, h:mm tt}")
        .AddText($"Location: {appointment.Location}")
        .AddButton(new ToastButton()
            .SetContent("Open")
            .AddArgument("action", "open")
            .AddArgument("id", appointment.Id.ToString())
            .SetBackgroundActivation())
        .AddButton(new ToastButton()
            .SetContent("Snooze 5 min")
            .AddArgument("action", "snooze")
            .AddArgument("id", appointment.Id.ToString())
            .AddArgument("duration", "5"))
        .AddButton(new ToastButtonDismiss("Dismiss"))
        .Show();
}
```

## Appointment with Reminder

### Extend ScheduleAppointment

```csharp
public class AppointmentWithReminder : ScheduleAppointment
{
    public bool HasReminder { get; set; }
    public int ReminderMinutesBefore { get; set; } = 15; // Default 15 minutes
    public DateTime? ReminderTime => HasReminder 
        ? StartTime.AddMinutes(-ReminderMinutesBefore) 
        : null;
    public bool ReminderShown { get; set; }
}
```

### Creating Appointments with Reminders

```csharp
var appointment = new AppointmentWithReminder
{
    Subject = "Team Meeting",
    StartTime = DateTime.Now.AddHours(1),
    EndTime = DateTime.Now.AddHours(2),
    HasReminder = true,
    ReminderMinutesBefore = 15 // Remind 15 minutes before
};

Schedule.ItemsSource.Add(appointment);
```

## Reminder Checking Service

### Periodic Reminder Check

```csharp
public class ReminderCheckService
{
    private DispatcherTimer _timer;
    private readonly ReminderService _reminderService;
    
    public ReminderCheckService(ReminderService reminderService)
    {
        _reminderService = reminderService;
        _timer = new DispatcherTimer();
        _timer.Interval = TimeSpan.FromMinutes(1); // Check every minute
        _timer.Tick += CheckReminders;
    }
    
    public void Start()
    {
        _timer.Start();
    }
    
    public void Stop()
    {
        _timer.Stop();
    }
    
    private void CheckReminders(object sender, object e)
    {
        var now = DateTime.Now;
        var appointments = GetAppointmentsWithReminders();
        
        foreach (var appointment in appointments)
        {
            if (appointment.ReminderTime.HasValue && 
                !appointment.ReminderShown &&
                appointment.ReminderTime.Value <= now)
            {
                _reminderService.ShowReminder(appointment);
                appointment.ReminderShown = true;
            }
        }
    }
    
    private List<AppointmentWithReminder> GetAppointmentsWithReminders()
    {
        // Get appointments from scheduler
        // Filter for upcoming appointments with reminders
        return _appointments
            .Where(apt => apt.HasReminder && 
                         apt.StartTime > DateTime.Now &&
                         !apt.ReminderShown)
            .ToList();
    }
}
```

## Background Tasks

### Register Background Task

```csharp
public async Task RegisterReminderBackgroundTask()
{
    const string taskName = "AppointmentReminderTask";
    
    // Check if already registered
    if (BackgroundTaskRegistration.AllTasks.Any(t => t.Value.Name == taskName))
    {
        return;
    }
    
    // Request background access
    var access = await BackgroundExecutionManager.RequestAccessAsync();
    
    if (access == BackgroundAccessStatus.AlwaysAllowed || 
        access == BackgroundAccessStatus.AllowedSubjectToSystemPolicy)
    {
        var builder = new BackgroundTaskBuilder
        {
            Name = taskName,
            TaskEntryPoint = "YourApp.Tasks.ReminderBackgroundTask"
        };
        
        // Trigger every 15 minutes
        builder.SetTrigger(new TimeTrigger(15, false));
        
        // Require internet connection
        builder.AddCondition(new SystemCondition(SystemConditionType.InternetAvailable));
        
        builder.Register();
    }
}
```

### Background Task Implementation

```csharp
namespace YourApp.Tasks
{
    public sealed class ReminderBackgroundTask : IBackgroundTask
    {
        public void Run(IBackgroundTaskInstance taskInstance)
        {
            var deferral = taskInstance.GetDeferral();
            
            try
            {
                // Load appointments from local storage
                var appointments = LoadAppointmentsFromStorage();
                
                var now = DateTime.Now;
                var upcomingReminders = appointments
                    .Where(apt => apt.HasReminder &&
                                 apt.ReminderTime <= now &&
                                 apt.StartTime > now &&
                                 !apt.ReminderShown)
                    .ToList();
                
                foreach (var appointment in upcomingReminders)
                {
                    ShowToastNotification(appointment);
                    MarkReminderAsShown(appointment);
                }
            }
            finally
            {
                deferral.Complete();
            }
        }
        
        private void ShowToastNotification(AppointmentWithReminder appointment)
        {
            new ToastContentBuilder()
                .AddText($"Reminder: {appointment.Subject}")
                .AddText($"Starting in {(appointment.StartTime - DateTime.Now).TotalMinutes:N0} minutes")
                .Show();
        }
    }
}
```

## In-App Notifications

### Notification Panel

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    
    <!-- In-App Notification Bar -->
    <InfoBar x:Name="ReminderInfoBar"
            Grid.Row="0"
            Severity="Informational"
            IsOpen="False"
            IsClosable="True">
        <InfoBar.ActionButton>
            <Button Content="View" Click="ViewReminder_Click"/>
        </InfoBar.ActionButton>
    </InfoBar>
    
    <!-- Scheduler -->
    <scheduler:SfScheduler x:Name="Schedule" 
                          Grid.Row="1" 
                          ViewType="Week"/>
</Grid>
```

```csharp
private AppointmentWithReminder _currentReminderAppointment;

public void ShowInAppReminder(AppointmentWithReminder appointment)
{
    _currentReminderAppointment = appointment;
    
    ReminderInfoBar.Title = $"Reminder: {appointment.Subject}";
    ReminderInfoBar.Message = $"Starting at {appointment.StartTime:h:mm tt}";
    ReminderInfoBar.IsOpen = true;
}

private void ViewReminder_Click(object sender, RoutedEventArgs e)
{
    if (_currentReminderAppointment != null)
    {
        // Navigate to appointment
        Schedule.DisplayDate = _currentReminderAppointment.StartTime;
        Schedule.SelectedAppointment = _currentReminderAppointment;
        
        ReminderInfoBar.IsOpen = false;
    }
}
```

## Snooze Functionality

### Snooze Implementation

```csharp
public class SnoozeService
{
    private readonly Dictionary<int, Timer> _snoozeTimers = new();
    private readonly ReminderService _reminderService;
    
    public SnoozeService(ReminderService reminderService)
    {
        _reminderService = reminderService;
    }
    
    public void SnoozeReminder(AppointmentWithReminder appointment, int minutes)
    {
        // Cancel existing snooze timer if any
        if (_snoozeTimers.TryGetValue(appointment.Id, out var existingTimer))
        {
            existingTimer.Dispose();
            _snoozeTimers.Remove(appointment.Id);
        }
        
        // Create new snooze timer
        var timer = new Timer(
            callback: _ => ShowSnoozeReminder(appointment),
            state: null,
            dueTime: TimeSpan.FromMinutes(minutes),
            period: Timeout.InfiniteTimeSpan);
        
        _snoozeTimers[appointment.Id] = timer;
        
        // Mark reminder as not shown so it can show again
        appointment.ReminderShown = false;
    }
    
    private void ShowSnoozeReminder(AppointmentWithReminder appointment)
    {
        _reminderService.ShowReminder(appointment);
        
        // Clean up timer
        if (_snoozeTimers.TryGetValue(appointment.Id, out var timer))
        {
            timer.Dispose();
            _snoozeTimers.Remove(appointment.Id);
        }
    }
    
    public void CancelSnooze(int appointmentId)
    {
        if (_snoozeTimers.TryGetValue(appointmentId, out var timer))
        {
            timer.Dispose();
            _snoozeTimers.Remove(appointmentId);
        }
    }
}
```

## Reminder Settings UI

### Reminder Configuration

```xml
<StackPanel Spacing="10">
    <CheckBox x:Name="ReminderCheckBox" 
             Content="Remind me"
             Checked="ReminderCheckBox_Changed"
             Unchecked="ReminderCheckBox_Changed"/>
    
    <ComboBox x:Name="ReminderTimeCombo"
             Header="Reminder time"
             IsEnabled="{x:Bind ReminderCheckBox.IsChecked, Mode=OneWay}"
             SelectedIndex="2">
        <ComboBoxItem>5 minutes before</ComboBoxItem>
        <ComboBoxItem>10 minutes before</ComboBoxItem>
        <ComboBoxItem>15 minutes before</ComboBoxItem>
        <ComboBoxItem>30 minutes before</ComboBoxItem>
        <ComboBoxItem>1 hour before</ComboBoxItem>
        <ComboBoxItem>1 day before</ComboBoxItem>
    </ComboBox>
</StackPanel>
```

```csharp
private void ReminderCheckBox_Changed(object sender, RoutedEventArgs e)
{
    if (sender is CheckBox checkbox && 
        _currentAppointment is AppointmentWithReminder appointment)
    {
        appointment.HasReminder = checkbox.IsChecked == true;
    }
}

private int GetReminderMinutes()
{
    return ReminderTimeCombo.SelectedIndex switch
    {
        0 => 5,
        1 => 10,
        2 => 15,
        3 => 30,
        4 => 60,
        5 => 1440, // 1 day
        _ => 15
    };
}
```

## Common Patterns

### Pattern 1: Complete Reminder System

```csharp
public class AppointmentReminderManager
{
    private readonly ReminderService _reminderService;
    private readonly ReminderCheckService _checkService;
    private readonly SnoozeService _snoozeService;
    
    public AppointmentReminderManager()
    {
        _reminderService = new ReminderService();
        _checkService = new ReminderCheckService(_reminderService);
        _snoozeService = new SnoozeService(_reminderService);
    }
    
    public void Start()
    {
        _checkService.Start();
    }
    
    public void Stop()
    {
        _checkService.Stop();
    }
    
    public void ShowReminder(AppointmentWithReminder appointment)
    {
        _reminderService.ShowReminder(appointment);
    }
    
    public void SnoozeReminder(AppointmentWithReminder appointment, int minutes)
    {
        _snoozeService.SnoozeReminder(appointment, minutes);
    }
}
```

### Pattern 2: Reminder with Sound

```csharp
using Windows.UI.Notifications;
using Windows.Data.Xml.Dom;

public void ShowReminderWithSound(AppointmentWithReminder appointment)
{
    var toastXml = ToastNotificationManager.GetTemplateContent(ToastTemplateType.ToastText02);
    
    var textNodes = toastXml.GetElementsByTagName("text");
    textNodes[0].AppendChild(toastXml.CreateTextNode($"Reminder: {appointment.Subject}"));
    textNodes[1].AppendChild(toastXml.CreateTextNode($"Starting at {appointment.StartTime:h:mm tt}"));
    
    // Add sound
    var toastNode = toastXml.SelectSingleNode("/toast");
    var audio = toastXml.CreateElement("audio");
    audio.SetAttribute("src", "ms-winsoundevent:Notification.Reminder");
    audio.SetAttribute("loop", "false");
    toastNode.AppendChild(audio);
    
    var toast = new ToastNotification(toastXml);
    ToastNotificationManager.CreateToastNotifier().Show(toast);
}
```

### Pattern 3: Multiple Reminders

```csharp
public class MultipleReminderAppointment : AppointmentWithReminder
{
    public List<int> ReminderMinutes { get; set; } = new List<int> { 15, 60, 1440 };
    // Remind at 15 min, 1 hour, and 1 day before
    
    public List<DateTime> ReminderTimes => ReminderMinutes
        .Select(m => StartTime.AddMinutes(-m))
        .Where(t => t > DateTime.Now)
        .OrderBy(t => t)
        .ToList();
    
    public HashSet<int> ShownReminders { get; set; } = new HashSet<int>();
}
```

### Pattern 4: Recurring Appointment Reminders

```csharp
public void ShowRecurringReminder(AppointmentWithReminder appointment)
{
    if (appointment.RecurrenceRule != null)
    {
        new ToastContentBuilder()
            .AddText($"Recurring: {appointment.Subject}")
            .AddText($"Next occurrence: {appointment.StartTime:MMM dd, h:mm tt}")
            .AddText($"Repeats: {GetRecurrenceDescription(appointment.RecurrenceRule)}")
            .AddButton("View All", "action", "viewSeries")
            .AddButton("Dismiss", "action", "dismiss")
            .Show();
    }
    else
    {
        ShowReminder(appointment);
    }
}

private string GetRecurrenceDescription(string recurrenceRule)
{
    // Parse iCal recurrence rule and return friendly description
    if (recurrenceRule.Contains("FREQ=DAILY"))
        return "Daily";
    else if (recurrenceRule.Contains("FREQ=WEEKLY"))
        return "Weekly";
    else if (recurrenceRule.Contains("FREQ=MONTHLY"))
        return "Monthly";
    else
        return "Repeating";
}
```

### Pattern 5: Smart Reminder Timing

```csharp
public class SmartReminderService
{
    public int CalculateOptimalReminderTime(AppointmentWithReminder appointment)
    {
        var duration = appointment.EndTime - appointment.StartTime;
        
        // Short appointments (< 30 min): remind 5-10 minutes before
        if (duration.TotalMinutes < 30)
            return 5;
        
        // Medium appointments (30 min - 2 hours): remind 15 minutes before
        if (duration.TotalHours < 2)
            return 15;
        
        // Long appointments (2+ hours): remind 30 minutes before
        if (duration.TotalHours < 4)
            return 30;
        
        // Very long appointments/all-day: remind 1 hour before
        return 60;
    }
    
    public void SetSmartReminder(AppointmentWithReminder appointment)
    {
        appointment.HasReminder = true;
        appointment.ReminderMinutesBefore = CalculateOptimalReminderTime(appointment);
    }
}
```

## Best Practices

### Timing
- Default to 15 minutes before for most appointments
- Allow users to customize reminder time
- Support multiple reminders for important events
- Consider time zones for traveling users

### Notifications
- Use clear, concise text
- Include appointment subject and time
- Provide action buttons (View, Snooze, Dismiss)
- Use appropriate notification sound

### User Experience
- Make reminders easy to snooze
- Allow dismissing from notification
- Show in-app indicators for missed reminders
- Respect user's notification preferences

### Performance
- Use background tasks for reliability
- Check reminders efficiently (not too frequently)
- Clean up completed reminders
- Store reminder state persistently

## Troubleshooting

### Notifications Not Showing

**Problem:** Toast notifications don't appear.

**Solutions:**
- Check Windows notification settings
- Verify app has notification permission
- Ensure app is registered for notifications
- Test with simple notification first

### Background Task Not Running

**Problem:** Reminders don't trigger when app is closed.

**Solutions:**
- Verify background task registration
- Check BackgroundExecutionManager access
- Ensure trigger conditions are met
- Check battery saver settings

### Reminders Showing Late

**Problem:** Notifications appear after scheduled time.

**Solutions:**
- Reduce check interval (currently every minute)
- Use background task for reliability
- Check system time accuracy
- Verify timer is running

### Duplicate Reminders

**Problem:** Same reminder shows multiple times.

**Solutions:**
- Mark reminder as shown after displaying
- Check for duplicate timer registration
- Clear shown reminders periodically
- Use unique appointment IDs
