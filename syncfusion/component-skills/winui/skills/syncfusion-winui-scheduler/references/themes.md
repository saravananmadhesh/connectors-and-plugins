# Themes and Styling

This reference provides comprehensive guidance on theming and styling the WinUI Scheduler to match your application's visual design.

## Overview

The WinUI Scheduler supports:
- Fluent Design System themes (Light, Dark)
- Custom color schemes
- Theme resources and styling
- High contrast themes

## Built-in Themes

### Light and Dark Themes

The scheduler automatically adapts to the application's theme:

```xml
<Application
    RequestedTheme="Light">  <!-- or "Dark" -->
</Application>
```

```csharp
// Set theme programmatically
if (Application.Current.RequestedTheme == ApplicationTheme.Dark)
{
    // Scheduler automatically uses dark theme
}

// Change theme at runtime
Application.Current.RequestedTheme = ApplicationTheme.Dark;
```

**Automatic Adaptation:**
- Background colors adjust
- Foreground text adjusts
- Border colors adjust
- Appointments maintain readability

### Respect System Theme

```xml
<Application
    RequestedTheme="Default">  <!-- Follows system setting -->
</Application>
```

## Custom Colors

### Scheduler Background

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      Background="WhiteSmoke"
                      Foreground="Black" />
```

```csharp
Schedule.Background = new SolidColorBrush(Colors.WhiteSmoke);
Schedule.Foreground = new SolidColorBrush(Colors.Black);
```

### Time Slot Styling

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.DaysViewSettings>
        <scheduler:DaysViewSettings>
            <scheduler:DaysViewSettings.TimeSlotStyle>
                <Style TargetType="scheduler:TimeSlotControl">
                    <Setter Property="Background" Value="White"/>
                    <Setter Property="BorderBrush" Value="LightGray"/>
                    <Setter Property="BorderThickness" Value="0,0,1,1"/>
                    <Setter Property="NonWorkingDayBackground" Value="#F5F5F5"/>
                </Style>
            </scheduler:DaysViewSettings.TimeSlotStyle>
        </scheduler:DaysViewSettings>
    </scheduler:SfScheduler.DaysViewSettings>
</scheduler:SfScheduler>
```

### Month Cell Styling

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Month">
    <scheduler:SfScheduler.MonthViewSettings>
        <scheduler:MonthViewSettings>
            <scheduler:MonthViewSettings.MonthCellStyle>
                <Style TargetType="scheduler:MonthCellControl">
                    <Setter Property="Background" Value="White"/>
                    <Setter Property="BorderBrush" Value="#E0E0E0"/>
                    <Setter Property="BorderThickness" Value="1"/>
                    <Setter Property="LeadingDatesBackground" Value="#FAFAFA"/>
                </Style>
            </scheduler:MonthViewSettings.MonthCellStyle>
        </scheduler:MonthViewSettings>
    </scheduler:SfScheduler.MonthViewSettings>
</scheduler:SfScheduler>
```

## Appointment Styling

### Default Appointment Colors

```csharp
var appointment = new ScheduleAppointment
{
    Subject = "Meeting",
    StartTime = DateTime.Now,
    EndTime = DateTime.Now.AddHours(1),
    Background = new SolidColorBrush(Colors.RoyalBlue),
    Foreground = new SolidColorBrush(Colors.White)
};
```

### Color Palette

```csharp
public static class AppointmentColors
{
    public static SolidColorBrush Blue = new SolidColorBrush(Color.FromArgb(255, 65, 105, 225));
    public static SolidColorBrush Green = new SolidColorBrush(Color.FromArgb(255, 46, 125, 50));
    public static SolidColorBrush Orange = new SolidColorBrush(Color.FromArgb(255, 255, 152, 0));
    public static SolidColorBrush Red = new SolidColorBrush(Color.FromArgb(255, 244, 67, 54));
    public static SolidColorBrush Purple = new SolidColorBrush(Color.FromArgb(255, 156, 39, 176));
    public static SolidColorBrush Teal = new SolidColorBrush(Color.FromArgb(255, 0, 150, 136));
}

// Usage
appointment.Background = AppointmentColors.Blue;
```

### Appointment Template

Custom appointment appearance:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.AppointmentTemplate>
        <DataTemplate>
            <Border Background="{Binding Background}"
                   BorderBrush="{Binding Foreground}"
                   BorderThickness="2"
                   CornerRadius="4"
                   Padding="4">
                <StackPanel>
                    <TextBlock Text="{Binding Subject}" 
                              FontWeight="Bold"
                              Foreground="{Binding Foreground}"/>
                    <TextBlock Text="{Binding StartTime, Converter={StaticResource TimeFormatConverter}}" 
                              FontSize="10"
                              Foreground="{Binding Foreground}"
                              Opacity="0.9"/>
                </StackPanel>
            </Border>
        </DataTemplate>
    </scheduler:SfScheduler.AppointmentTemplate>
</scheduler:SfScheduler>
```

## Theme Resources

### Using Theme Resources

```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <!-- Light Theme -->
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="SchedulerBackgroundBrush" Color="White"/>
                <SolidColorBrush x:Key="SchedulerForegroundBrush" Color="Black"/>
                <SolidColorBrush x:Key="SchedulerBorderBrush" Color="LightGray"/>
                <SolidColorBrush x:Key="SchedulerHeaderBrush" Color="#F5F5F5"/>
            </ResourceDictionary>
            
            <!-- Dark Theme -->
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="SchedulerBackgroundBrush" Color="#1E1E1E"/>
                <SolidColorBrush x:Key="SchedulerForegroundBrush" Color="White"/>
                <SolidColorBrush x:Key="SchedulerBorderBrush" Color="#3F3F3F"/>
                <SolidColorBrush x:Key="SchedulerHeaderBrush" Color="#2D2D2D"/>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>
    </ResourceDictionary>
</Application.Resources>

<!-- Use theme resources -->
<scheduler:SfScheduler x:Name="Schedule" 
                      Background="{ThemeResource SchedulerBackgroundBrush}"
                      Foreground="{ThemeResource SchedulerForegroundBrush}"/>
```

## View Header Styling

### Custom Header Appearance

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings>
            <scheduler:ViewHeaderSettings.ViewHeaderTemplate>
                <DataTemplate>
                    <Grid Background="#4CAF50">
                        <StackPanel Padding="5">
                            <TextBlock Text="{Binding DayText}" 
                                      FontWeight="Bold"
                                      FontSize="14"
                                      Foreground="White"
                                      HorizontalAlignment="Center"/>
                            <TextBlock Text="{Binding DateText}" 
                                      FontSize="12"
                                      Foreground="White"
                                      HorizontalAlignment="Center"
                                      Opacity="0.9"/>
                        </StackPanel>
                    </Grid>
                </DataTemplate>
            </scheduler:ViewHeaderSettings.ViewHeaderTemplate>
        </scheduler:ViewHeaderSettings>
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

## Today Highlighting

### Highlight Current Day

```xml
<scheduler:SfScheduler.DaysViewSettings>
    <scheduler:DaysViewSettings>
        <scheduler:DaysViewSettings.TimeSlotStyle>
            <Style TargetType="scheduler:TimeSlotControl">
                <Setter Property="Background" Value="White"/>
                <!-- Today's column background -->
                <Setter Property="TodayBackground" Value="#E8F5E9"/>
            </Style>
        </scheduler:DaysViewSettings.TimeSlotStyle>
    </scheduler:DaysViewSettings>
</scheduler:SfScheduler.DaysViewSettings>
```

### Current Time Indicator

```csharp
// Enable current time indicator in Day/Week views
// (Typically enabled by default)

// Style current time indicator line
// Access through DaysViewSettings if customization is supported
```

## Common Patterns

### Pattern 1: Material Design Theme

```csharp
public static class MaterialColors
{
    // Primary
    public static Color Primary = Color.FromArgb(255, 33, 150, 243);
    public static Color PrimaryDark = Color.FromArgb(255, 25, 118, 210);
    public static Color PrimaryLight = Color.FromArgb(255, 100, 181, 246);
    
    // Accent
    public static Color Accent = Color.FromArgb(255, 255, 64, 129);
    
    // Background
    public static Color Background = Color.FromArgb(255, 250, 250, 250);
    public static Color Surface = Color.FromArgb(255, 255, 255, 255);
}

// Apply Material Design colors
Schedule.Background = new SolidColorBrush(MaterialColors.Background);

// Use for appointments
var appointment = new ScheduleAppointment
{
    Subject = "Design Review",
    StartTime = DateTime.Now,
    EndTime = DateTime.Now.AddHours(1),
    Background = new SolidColorBrush(MaterialColors.Primary),
    Foreground = new SolidColorBrush(Colors.White)
};
```

### Pattern 2: Theme Switcher

```xml
<ToggleSwitch x:Name="ThemeToggle" 
             OnContent="Dark Theme" 
             OffContent="Light Theme"
             Toggled="ThemeToggle_Toggled"/>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Week"/>
```

```csharp
private void ThemeToggle_Toggled(object sender, RoutedEventArgs e)
{
    var isDark = ThemeToggle.IsOn;
    
    if (isDark)
    {
        // Apply dark theme
        Schedule.Background = new SolidColorBrush(Color.FromArgb(255, 30, 30, 30));
        Schedule.Foreground = new SolidColorBrush(Colors.White);
        
        // Update appointments for dark theme
        UpdateAppointmentColors(isDark: true);
    }
    else
    {
        // Apply light theme
        Schedule.Background = new SolidColorBrush(Colors.White);
        Schedule.Foreground = new SolidColorBrush(Colors.Black);
        
        UpdateAppointmentColors(isDark: false);
    }
}

private void UpdateAppointmentColors(bool isDark)
{
    var appointments = Schedule.ItemsSource as ScheduleAppointmentCollection;
    
    foreach (var apt in appointments)
    {
        if (isDark)
        {
            // Lighten colors for dark theme
            apt.Foreground = new SolidColorBrush(Colors.White);
        }
        else
        {
            // Darken colors for light theme
            apt.Foreground = new SolidColorBrush(Colors.White);
        }
    }
}
```

### Pattern 3: Category-Based Colors

```csharp
public enum AppointmentCategory
{
    Work,
    Personal,
    Meeting,
    Holiday,
    Deadline
}

public static class CategoryColors
{
    public static SolidColorBrush GetColor(AppointmentCategory category)
    {
        return category switch
        {
            AppointmentCategory.Work => new SolidColorBrush(Color.FromArgb(255, 33, 150, 243)), // Blue
            AppointmentCategory.Personal => new SolidColorBrush(Color.FromArgb(255, 76, 175, 80)), // Green
            AppointmentCategory.Meeting => new SolidColorBrush(Color.FromArgb(255, 255, 152, 0)), // Orange
            AppointmentCategory.Holiday => new SolidColorBrush(Color.FromArgb(255, 244, 67, 54)), // Red
            AppointmentCategory.Deadline => new SolidColorBrush(Color.FromArgb(255, 156, 39, 176)), // Purple
            _ => new SolidColorBrush(Colors.Gray)
        };
    }
}

// Usage
var appointment = new ScheduleAppointment
{
    Subject = "Team Meeting",
    StartTime = DateTime.Now,
    EndTime = DateTime.Now.AddHours(1),
    Background = CategoryColors.GetColor(AppointmentCategory.Meeting)
};
```

### Pattern 4: Gradient Appointments

```xml
<scheduler:SfScheduler.AppointmentTemplate>
    <DataTemplate>
        <Border CornerRadius="4">
            <Border.Background>
                <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                    <GradientStop Color="#2196F3" Offset="0"/>
                    <GradientStop Color="#1976D2" Offset="1"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="{Binding Subject}" 
                      Foreground="White"
                      Margin="4"
                      FontWeight="SemiBold"/>
        </Border>
    </DataTemplate>
</scheduler:SfScheduler.AppointmentTemplate>
```

### Pattern 5: Brand-Themed Scheduler

```csharp
public static class BrandTheme
{
    // Company brand colors
    public static Color BrandPrimary = Color.FromArgb(255, 0, 123, 255);
    public static Color BrandSecondary = Color.FromArgb(255, 108, 117, 125);
    public static Color BrandSuccess = Color.FromArgb(255, 40, 167, 69);
    public static Color BrandWarning = Color.FromArgb(255, 255, 193, 7);
    public static Color BrandDanger = Color.FromArgb(255, 220, 53, 69);
    
    public static void ApplyToScheduler(SfScheduler scheduler)
    {
        scheduler.Background = new SolidColorBrush(Colors.White);
        scheduler.Foreground = new SolidColorBrush(BrandSecondary);
        
        // Apply to new appointments
        scheduler.CellDoubleTapped += (s, e) =>
        {
            if (e.Element == SchedulerElement.Cell)
            {
                var appointment = new ScheduleAppointment
                {
                    Subject = "New Appointment",
                    StartTime = e.Date,
                    EndTime = e.Date.AddHours(1),
                    Background = new SolidColorBrush(BrandPrimary),
                    Foreground = new SolidColorBrush(Colors.White)
                };
                
                scheduler.ItemsSource.Add(appointment);
            }
        };
    }
}

// Usage
BrandTheme.ApplyToScheduler(Schedule);
```

## Best Practices

### Color Selection
- Use consistent color palette across application
- Ensure sufficient contrast (WCAG guidelines)
- Limit number of appointment colors (5-8 max)
- Test colors in both light and dark themes

### Theme Support
- Support both light and dark themes
- Use theme resources for consistent styling
- Test all views in both themes
- Ensure readability in high contrast mode

### Performance
- Cache brush objects (don't create repeatedly)
- Use solid colors over gradients when possible
- Minimize complex appointment templates
- Test performance with many appointments

### Consistency
- Match scheduler theme with app theme
- Use brand colors consistently
- Maintain visual hierarchy
- Follow platform design guidelines

## Troubleshooting

### Colors Not Applying

**Problem:** Custom colors don't show.

**Solutions:**
- Check if theme resources override colors
- Verify brushes are not null
- Ensure appointments have Background set
- Test with solid colors first

### Dark Theme Issues

**Problem:** Scheduler unreadable in dark theme.

**Solutions:**
- Set explicit Background and Foreground
- Use theme-aware resources
- Test with Windows dark mode
- Adjust appointment colors for dark backgrounds

### Appointment Template Not Showing

**Problem:** Custom AppointmentTemplate doesn't display.

**Solutions:**
- Verify DataTemplate syntax
- Check binding paths
- Ensure template has root element
- Test with simple template first

### Theme Changes Not Reflecting

**Problem:** Theme change doesn't update scheduler.

**Solutions:**
- Refresh scheduler after theme change
- Use theme resources (automatically update)
- Recreate appointments if needed
- Check if caching prevents updates
