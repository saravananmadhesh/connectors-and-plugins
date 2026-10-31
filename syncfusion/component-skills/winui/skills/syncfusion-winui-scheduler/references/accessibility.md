# Accessibility

This reference provides comprehensive guidance on accessibility features in the WinUI Scheduler to ensure the application is usable by everyone, including users with disabilities.

## Overview

The WinUI Scheduler supports accessibility features including keyboard navigation, screen reader support, high contrast themes, and WCAG compliance to ensure an inclusive user experience.

## Keyboard Navigation

### Navigation Keys

The scheduler supports standard keyboard navigation:

**General Navigation:**
- `Tab` - Move focus to next element
- `Shift + Tab` - Move focus to previous element
- `Arrow Keys` - Navigate between time slots/dates
- `Home` - Go to first cell in row
- `End` - Go to last cell in row
- `Page Up` - Navigate to previous period
- `Page Down` - Navigate to next period

**Appointment Navigation:**
- `Enter` - Select/activate focused appointment
- `Space` - Select focused appointment
- `Delete` - Delete selected appointment (if editing enabled)
- `Arrow Keys` - Move between appointments

**View Navigation:**
- `Ctrl + Left/Right` - Change view type
- `Ctrl + Home` - Go to today

### Enable Keyboard Focus

Ensure keyboard focus is visible:

```csharp
Schedule.UseSystemFocusVisuals = true;
```

### Keyboard Accessibility Example

```csharp
Schedule.KeyDown += (s, e) =>
{
    switch (e.Key)
    {
        case VirtualKey.Left:
            if (e.KeyStatus.IsMenuKeyDown) // Alt key
            {
                Schedule.Backward();
                e.Handled = true;
            }
            break;
            
        case VirtualKey.Right:
            if (e.KeyStatus.IsMenuKeyDown)
            {
                Schedule.Forward();
                e.Handled = true;
            }
            break;
            
        case VirtualKey.Home:
            Schedule.DisplayDate = DateTime.Today;
            e.Handled = true;
            break;
            
        case VirtualKey.N:
            if (e.KeyStatus.IsMenuKeyDown) // Alt+N for new
            {
                CreateNewAppointment();
                e.Handled = true;
            }
            break;
    }
};
```

## Screen Reader Support

### Automation Properties

Set automation properties for screen reader accessibility:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      AutomationProperties.Name="Appointment Scheduler"
                      AutomationProperties.HelpText="Navigate and manage appointments"
                      AutomationProperties.LabeledBy="{Binding ElementName=SchedulerLabel}"/>
```

```csharp
AutomationProperties.SetName(Schedule, "Appointment Scheduler");
AutomationProperties.SetHelpText(Schedule, "Use arrow keys to navigate, Enter to select");
```

### Appointment Automation Properties

```csharp
// Set automation properties on appointments
Schedule.ItemsSource.CollectionChanged += (s, e) =>
{
    if (e.NewItems != null)
    {
        foreach (ScheduleAppointment appointment in e.NewItems)
        {
            var automationName = $"{appointment.Subject} from {appointment.StartTime:g} to {appointment.EndTime:g}";
            // Note: Automation properties are set on UI elements by the control automatically
        }
    }
};
```

### Live Region Announcements

Announce changes to screen readers:

```csharp
public class AccessibilityAnnouncer
{
    private TextBlock _liveRegion;
    
    public AccessibilityAnnouncer(Panel parent)
    {
        _liveRegion = new TextBlock
        {
            Visibility = Visibility.Collapsed
        };
        
        AutomationProperties.SetLiveSetting(_liveRegion, AutomationLiveSetting.Assertive);
        parent.Children.Add(_liveRegion);
    }
    
    public void Announce(string message)
    {
        _liveRegion.Text = message;
        // Screen reader will announce the text
    }
}

// Usage
var announcer = new AccessibilityAnnouncer(RootGrid);

Schedule.CellTapped += (s, e) =>
{
    if (e.Element == SchedulerElement.Cell)
    {
        announcer.Announce($"Selected {e.Date:dddd, MMMM dd, yyyy}");
    }
};

Schedule.AppointmentTapped += (s, e) =>
{
    var appointment = e.Appointment as ScheduleAppointment;
    announcer.Announce($"Selected appointment: {appointment.Subject}");
};
```

## High Contrast Support

### High Contrast Themes

The scheduler automatically adapts to Windows high contrast themes:

```csharp
// Detect high contrast mode
var accessibilitySettings = new AccessibilitySettings();
var isHighContrast = accessibilitySettings.HighContrast;

if (isHighContrast)
{
    // Apply high contrast customizations if needed
    Schedule.Background = new SolidColorBrush(Colors.Black);
}
```

### Custom High Contrast Colors

```xml
<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.Resources>
        <ResourceDictionary>
            <!-- High Contrast Theme Resources -->
            <SolidColorBrush x:Key="SchedulerHighContrastBackground" Color="Black"/>
            <SolidColorBrush x:Key="SchedulerHighContrastForeground" Color="White"/>
            <SolidColorBrush x:Key="SchedulerHighContrastBorder" Color="Yellow"/>
        </ResourceDictionary>
    </scheduler:SfScheduler.Resources>
</scheduler:SfScheduler>
```

### Test with High Contrast

Enable high contrast in Windows Settings:
1. Settings → Accessibility → Contrast themes
2. Select high contrast theme
3. Test scheduler functionality and visibility

## Focus Management

### Focus Indicators

Ensure visible focus indicators:

```xml
<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.Resources>
        <ResourceDictionary>
            <Style TargetType="scheduler:TimeSlotControl">
                <Setter Property="BorderBrush" Value="Transparent"/>
                <Setter Property="FocusVisualPrimaryBrush" Value="{ThemeResource SystemAccentColor}"/>
                <Setter Property="FocusVisualSecondaryBrush" Value="Transparent"/>
                <Setter Property="FocusVisualPrimaryThickness" Value="2"/>
            </Style>
        </ResourceDictionary>
    </scheduler:SfScheduler.Resources>
</scheduler:SfScheduler>
```

### Programmatic Focus

```csharp
// Set focus to scheduler
Schedule.Focus(FocusState.Programmatic);

// Handle focus lost
Schedule.LostFocus += (s, e) =>
{
    // Save selection state
    SaveCurrentSelection();
};

// Handle focus gained
Schedule.GotFocus += (s, e) =>
{
    // Restore selection state
    RestorePreviousSelection();
};
```

## Text Sizing

### Support Dynamic Text Scaling

Respect user's text size preferences:

```csharp
// Listen for text scale factor changes
var uiSettings = new UISettings();
uiSettings.TextScaleFactorChanged += (sender, args) =>
{
    // Adjust font sizes
    var scaleFactor = sender.TextScaleFactor;
    AdjustFontSizes(scaleFactor);
};

private void AdjustFontSizes(double scaleFactor)
{
    // Apply scale factor to fonts
    // Scheduler automatically respects system text scaling
}
```

### Minimum Touch Target Size

Ensure touch targets meet minimum size (44x44 pixels for WCAG 2.1 AAA):

```csharp
// Adjust cell height for touch accessibility
Schedule.TimeIntervalSize = 60; // Pixels per hour (vertical views)

// For timeline views
Schedule.TimeIntervalSize = 80; // Width per hour
```

## Color and Contrast

### WCAG Contrast Requirements

Ensure sufficient color contrast:
- Normal text: 4.5:1 contrast ratio (AA)
- Large text (18pt+): 3:1 contrast ratio (AA)
- UI components: 3:1 contrast ratio

### Check Contrast Programmatically

```csharp
public bool MeetsContrastRequirements(Color foreground, Color background, double fontSize)
{
    var contrastRatio = CalculateContrastRatio(foreground, background);
    var requiredRatio = fontSize >= 18 ? 3.0 : 4.5;
    
    return contrastRatio >= requiredRatio;
}

private double CalculateContrastRatio(Color c1, Color c2)
{
    var l1 = GetRelativeLuminance(c1);
    var l2 = GetRelativeLuminance(c2);
    
    var lighter = Math.Max(l1, l2);
    var darker = Math.Min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

private double GetRelativeLuminance(Color color)
{
    var r = GetColorComponent(color.R / 255.0);
    var g = GetColorComponent(color.G / 255.0);
    var b = GetColorComponent(color.B / 255.0);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

private double GetColorComponent(double value)
{
    return value <= 0.03928 
        ? value / 12.92 
        : Math.Pow((value + 0.055) / 1.055, 2.4);
}
```

### Accessible Appointment Colors

```csharp
// Define accessible color palette
public static class AccessibleColors
{
    // High contrast colors with sufficient contrast ratios
    public static SolidColorBrush HighContrastRed = new SolidColorBrush(Color.FromArgb(255, 229, 20, 0));
    public static SolidColorBrush HighContrastBlue = new SolidColorBrush(Color.FromArgb(255, 0, 120, 215));
    public static SolidColorBrush HighContrastGreen = new SolidColorBrush(Color.FromArgb(255, 16, 124, 16));
    public static SolidColorBrush HighContrastOrange = new SolidColorBrush(Color.FromArgb(255, 247, 99, 12));
}

// Use accessible colors
var appointment = new ScheduleAppointment
{
    Subject = "Important Meeting",
    StartTime = DateTime.Now,
    EndTime = DateTime.Now.AddHours(1),
    Background = AccessibleColors.HighContrastBlue,
    Foreground = new SolidColorBrush(Colors.White) // Ensures contrast
};
```

## Common Patterns

### Pattern 1: Complete Keyboard Support

```csharp
private void SetupKeyboardAccessibility()
{
    Schedule.KeyDown += (s, e) =>
    {
        var handled = true;
        
        switch (e.Key)
        {
            // Navigation
            case VirtualKey.Home:
                Schedule.DisplayDate = DateTime.Today;
                break;
                
            case VirtualKey.PageUp:
                Schedule.Backward();
                break;
                
            case VirtualKey.PageDown:
                Schedule.Forward();
                break;
            
            // Appointment operations (with Ctrl)
            case VirtualKey.N when e.KeyStatus.IsMenuKeyDown:
                CreateNewAppointment();
                break;
                
            case VirtualKey.E when e.KeyStatus.IsMenuKeyDown:
                EditSelectedAppointment();
                break;
                
            case VirtualKey.Delete:
                DeleteSelectedAppointment();
                break;
            
            // View switching
            case VirtualKey.D when e.KeyStatus.IsMenuKeyDown:
                Schedule.ViewType = SchedulerViewType.Day;
                break;
                
            case VirtualKey.W when e.KeyStatus.IsMenuKeyDown:
                Schedule.ViewType = SchedulerViewType.Week;
                break;
                
            case VirtualKey.M when e.KeyStatus.IsMenuKeyDown:
                Schedule.ViewType = SchedulerViewType.Month;
                break;
            
            default:
                handled = false;
                break;
        }
        
        e.Handled = handled;
    };
}
```

### Pattern 2: Screen Reader Announcements

```csharp
private AccessibilityAnnouncer _announcer;

private void SetupScreenReaderSupport()
{
    _announcer = new AccessibilityAnnouncer(RootGrid);
    
    Schedule.ViewChanged += (s, e) =>
    {
        var start = e.NewVisibleDates.First();
        var end = e.NewVisibleDates.Last();
        _announcer.Announce($"View changed to {Schedule.ViewType}. Showing {start:MMMM dd} to {end:MMMM dd}");
    };
    
    Schedule.SelectionChanged += (s, e) =>
    {
        if (e.NewValue?.Count > 0)
        {
            var appointment = e.NewValue[0] as ScheduleAppointment;
            _announcer.Announce($"Selected {appointment.Subject}, {appointment.StartTime:g} to {appointment.EndTime:g}");
        }
    };
    
    Schedule.AppointmentEditorOpening += (s, e) =>
    {
        _announcer.Announce("Appointment editor opened");
    };
    
    Schedule.AppointmentEditorClosing += (s, e) =>
    {
        if (e.Action == AppointmentEditorAction.Add)
            _announcer.Announce("Appointment created");
        else if (e.Action == AppointmentEditorAction.Edit)
            _announcer.Announce("Appointment updated");
        else if (e.Action == AppointmentEditorAction.Delete)
            _announcer.Announce("Appointment deleted");
    };
}
```

### Pattern 3: High Contrast Mode Detection

```csharp
private void AdaptToHighContrast()
{
    var accessibilitySettings = new AccessibilitySettings();
    
    if (accessibilitySettings.HighContrast)
    {
        // Use high contrast colors
        var appointments = Schedule.ItemsSource as ScheduleAppointmentCollection;
        foreach (var appointment in appointments)
        {
            // Ensure sufficient contrast
            appointment.Background = new SolidColorBrush(Colors.White);
            appointment.Foreground = new SolidColorBrush(Colors.Black);
        }
        
        // Adjust UI elements
        Schedule.Background = new SolidColorBrush(Colors.Black);
        Schedule.Foreground = new SolidColorBrush(Colors.White);
    }
}
```

### Pattern 4: Accessible Appointment Editor

```csharp
Schedule.AppointmentEditorOpening += (s, e) =>
{
    // Set automation properties on editor fields
    var editor = e.Editor; // If accessible
    
    // Ensure labels and fields are properly associated
    // Add helpful instructions
    _announcer.Announce("Appointment editor. Use Tab to navigate between fields");
};
```

### Pattern 5: Focus Management

```csharp
private ScheduleAppointment _lastFocusedAppointment;

private void ManageFocus()
{
    Schedule.SelectionChanged += (s, e) =>
    {
        if (e.NewValue?.Count > 0)
        {
            _lastFocusedAppointment = e.NewValue[0] as ScheduleAppointment;
        }
    };
    
    Schedule.LostFocus += (s, e) =>
    {
        // Save focus state for restoration
    };
    
    Schedule.GotFocus += (s, e) =>
    {
        // Restore previous selection
        if (_lastFocusedAppointment != null)
        {
            Schedule.SelectedAppointment = _lastFocusedAppointment;
        }
    };
}
```

## Best Practices

### Keyboard Accessibility
- Support all operations via keyboard
- Provide keyboard shortcuts for common actions
- Show keyboard shortcuts in tooltips
- Ensure Tab order is logical
- Make focus indicators clearly visible

### Screen Reader Support
- Set meaningful automation names
- Provide helpful automation descriptions
- Announce dynamic content changes
- Label all interactive elements
- Test with Narrator (Windows) and NVDA

### Visual Accessibility
- Ensure 4.5:1 contrast for text (3:1 for large text)
- Support high contrast themes
- Don't rely on color alone to convey information
- Provide text alternatives for icons
- Support text scaling (120%, 150%, 200%)

### Touch Accessibility
- Minimum 44x44 pixel touch targets
- Provide adequate spacing between elements
- Support touch, mouse, and keyboard equally
- Test with touch and pen input

## Testing

### Accessibility Testing Checklist

- [ ] All functionality accessible via keyboard
- [ ] Focus indicators visible and clear
- [ ] Screen reader announces all content
- [ ] Works in high contrast mode
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Touch targets meet minimum size
- [ ] Text respects system scaling
- [ ] No keyboard traps
- [ ] Logical tab order
- [ ] Meaningful error messages

### Testing Tools

**Windows:**
- **Narrator** - Built-in screen reader
- **Accessibility Insights** - Automated testing tool
- **Contrast Checker** - Verify color contrast
- **Touch Target Size Checker** - Verify touch targets

**Testing Commands:**
- `Windows + Ctrl + Enter` - Start Narrator
- `Windows + Ctrl + M` - Enable Magnifier
- `Alt + Shift + Print Screen` - Toggle high contrast

## Troubleshooting

### Keyboard Navigation Not Working

**Problem:** Arrow keys or Tab don't navigate scheduler.

**Solutions:**
- Ensure `IsTabStop = true`
- Check if focus is on scheduler
- Verify no KeyDown handler consumes events
- Set `UseSystemFocusVisuals = true`

### Screen Reader Not Announcing

**Problem:** Narrator doesn't read scheduler content.

**Solutions:**
- Set `AutomationProperties.Name` on scheduler
- Verify live region is configured for announcements
- Check that UI elements have meaningful names
- Test with Narrator (Windows + Ctrl + Enter)

### Focus Indicator Not Visible

**Problem:** Can't see which element has focus.

**Solutions:**
- Set `UseSystemFocusVisuals = true`
- Increase `FocusVisualPrimaryThickness`
- Use high contrast focus brush
- Test with high contrast mode

### High Contrast Mode Issues

**Problem:** Scheduler unreadable in high contrast.

**Solutions:**
- Use system theme resources
- Don't hardcode colors
- Test with all high contrast themes
- Provide fallback colors
