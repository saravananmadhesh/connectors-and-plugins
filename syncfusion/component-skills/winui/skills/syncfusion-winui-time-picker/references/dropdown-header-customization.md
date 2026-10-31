# Dropdown Header Customization in WinUI TimePicker

Comprehensive guide for customizing the dropdown header in the Syncfusion WinUI TimePicker control, including adding hints, custom templates, and managing column headers.

## Table of Contents
- [Overview](#overview)
- [Adding Hints in Dropdown Header](#adding-hints-in-dropdown-header)
- [Showing and Hiding Header](#showing-and-hiding-header)
- [Custom Header Templates](#custom-header-templates)
- [Column Headers](#column-headers)
- [Header Styling Patterns](#header-styling-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The dropdown header provides contextual information and guidance to users when selecting time.

**Header Components:**
- **DropDownHeader** - Text or content displayed at top of dropdown
- **DropDownHeaderTemplate** - Custom template for header appearance
- **ShowDropDownHeader** - Controls header visibility
- **ShowColumnHeaders** - Controls spinner column header visibility

## Adding Hints in Dropdown Header

Display helpful text at the top of the dropdown.

### Basic Header Text

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    DropDownHeader="Select the Time"
    ShowDropDownHeader="True" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.DropDownHeader = "Select the Time";
timePicker.ShowDropDownHeader = true;
```

### Visual Structure

```
┌─────────────────────────────────────┐
│  Select the Time         ← Header   │
├───────────┬───────────┬─────────────┤
│   Hour    │  Minute   │   AM/PM     │
├───────────┼───────────┼─────────────┤
│     10    │    25     │     AM      │
│  → 11 ←   │  → 30 ←   │  → PM ←     │
│     12    │    35     │     AM      │
└───────────┴───────────┴─────────────┘
```

### Contextual Header Text

**Appointment Booking:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Select Appointment Time"
    ShowDropDownHeader="True" />
```

**Meeting Scheduler:**
```xml
<editors:SfTimePicker 
    DropDownHeader="When does the meeting start?"
    ShowDropDownHeader="True" />
```

**Alarm Setting:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Set an Alarm"
    ShowDropDownHeader="True" />
```

**Delivery Time:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Choose your delivery time slot"
    ShowDropDownHeader="True" />
```

### Dynamic Header Text

```csharp
// Change header based on selection
private void UpdateHeaderBasedOnContext()
{
    if (isStartTime)
    {
        sfTimePicker.DropDownHeader = "Select Start Time";
    }
    else
    {
        sfTimePicker.DropDownHeader = "Select End Time";
    }
}

// Change header based on time range
private void UpdateHeaderBasedOnTimeRange()
{
    var hour = DateTime.Now.Hour;
    
    if (hour < 12)
    {
        sfTimePicker.DropDownHeader = "Select Morning Time";
    }
    else if (hour < 17)
    {
        sfTimePicker.DropDownHeader = "Select Afternoon Time";
    }
    else
    {
        sfTimePicker.DropDownHeader = "Select Evening Time";
    }
}
```

## Showing and Hiding Header

Control header visibility with `ShowDropDownHeader` property.

### Default Behavior

**Default:** `ShowDropDownHeader = false` (header hidden)

### Enabling Header

**XAML:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Select Time"
    ShowDropDownHeader="True" />
```

**C#:**
```csharp
timePicker.ShowDropDownHeader = true;
timePicker.DropDownHeader = "Select Time";
```

### Hiding Header

```xml
<editors:SfTimePicker 
    ShowDropDownHeader="False" />
```

```csharp
timePicker.ShowDropDownHeader = false;
```

### Visual Comparison

**ShowDropDownHeader="True":**
```
┌─────────────────────────────────────┐
│  Select Time                        │ ← Header visible
├───────────┬───────────┬─────────────┤
│   Hour    │  Minute   │   AM/PM     │
├───────────┼───────────┼─────────────┤
│  → 11 ←   │  → 30 ←   │  → PM ←     │
└───────────┴───────────┴─────────────┘
```

**ShowDropDownHeader="False":**
```
┌───────────┬───────────┬─────────────┐
│   Hour    │  Minute   │   AM/PM     │ ← No header
├───────────┼───────────┼─────────────┤
│  → 11 ←   │  → 30 ←   │  → PM ←     │
└───────────┴───────────┴─────────────┘
```

### Conditional Visibility

```csharp
// Show header only for first-time users
private void ConfigureHeaderForUser(bool isFirstTimeUser)
{
    if (isFirstTimeUser)
    {
        sfTimePicker.ShowDropDownHeader = true;
        sfTimePicker.DropDownHeader = "Select the time from the list below";
    }
    else
    {
        sfTimePicker.ShowDropDownHeader = false;
    }
}

// Show header based on form validation
private void ShowHeaderIfNeeded()
{
    if (sfTimePicker.SelectedTime == null)
    {
        sfTimePicker.ShowDropDownHeader = true;
        sfTimePicker.DropDownHeader = "Time selection is required";
    }
}
```

## Custom Header Templates

Create rich, styled headers using `DropDownHeaderTemplate`.

### Basic Custom Template

**XAML:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Select Time"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <TextBlock 
                Text="{Binding}"
                FontSize="16"
                FontWeight="Bold"
                Foreground="DarkBlue"
                HorizontalAlignment="Center"
                VerticalAlignment="Center" />
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

**Note:** `{Binding}` refers to the `DropDownHeader` property value.

### Header with Icon

**Clock Icon Header:**
```xml
<editors:SfTimePicker 
    DropDownHeader="Set an Alarm"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" 
                       HorizontalAlignment="Center"
                       Spacing="8">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE121;"
                    FontSize="18"
                    Foreground="{ThemeResource SystemAccentColor}" />
                <TextBlock 
                    Text="{Binding}"
                    FontSize="14"
                    VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Alarm Icon Header

```xml
<editors:SfTimePicker 
    DropDownHeader="Set an Alarm"
    ShowDropDownHeader="True"
    x:Name="sfTimePicker">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Foreground="Green"
                    FontWeight="SemiBold"
                    Text="{Binding}" />
                <Path
                    Width="32"
                    Height="32"
                    Margin="5,5,5,10"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Bottom"
                    Fill="Blue"
                    Data="M5.0499409,20.854989C5.6799391,20.854989 6.1909379,21.365994 6.1909379,21.995999 6.1909379,22.626004 5.6799391,23.137007 5.0499409,23.137007 4.4199427,23.137007 3.9099439,22.626004 3.9099437,21.995999 3.9099439,21.365994 4.4199427,20.854989 5.0499409,20.854989z M14.596949,20.759993C15.226947,20.759993 15.737946,21.270998 15.737946,21.901003 15.737946,22.531008 15.226947,23.042012 14.596949,23.042012 13.966951,23.042012 13.456952,22.531008 13.456952,21.901003 13.456952,21.270998 13.966951,20.759993 14.596949,20.759993z M5.4789585,10.087996C5.2049588,10.087996,4.9809588,10.311996,4.9809588,10.585996L4.9809588,12.577998C4.9809588,14.500999,6.5449585,16.065,8.4669574,16.065L11.455957,16.065C13.377957,16.065,14.941956,14.500999,14.941956,12.577998L14.941956,10.585996C14.941956,10.311996,14.718956,10.087996,14.443957,10.087996z M5.4789585,9.0919948L14.443957,9.0919948C15.267956,9.0919948,15.937956,9.7619953,15.937956,10.585996L15.937956,12.577998C15.937956,15.05,13.927957,17.061,11.455957,17.061L8.4669574,17.061C5.9959587,17.061,3.984959,15.05,3.9849592,12.577998L3.9849592,10.585996C3.984959,9.7619953,4.6549586,9.0919948,5.4789585,9.0919948z M10.605848,6.2067145C10.182643,6.2076663,9.9221548,6.2276208,9.9099678,6.2286375L9.8250068,6.2326353C3.4400006,6.2326355,2.1699818,8.8086996,1.9920029,9.2787094L1.9920029,23.634949C1.9920033,24.403944,2.6179796,25.030968,3.3879987,25.030968L16.945976,25.030968C17.489004,25.030968,17.929983,24.588944,17.929983,24.044928L17.931997,9.3637023C16.43066,6.4917114,12.266111,6.202981,10.605848,6.2067145z M10.652609,4.2130087C12.769905,4.2105492,17.93724,4.6332789,19.83196,8.7126899L19.924001,8.9116983 19.922963,24.044928C19.922963,25.686985,18.586965,27.023009,16.945976,27.023009L15.744038,27.023009 18.39861,30.386019C18.739616,30.818005 18.665614,31.444987 18.234607,31.785977 18.051605,31.929972 17.8336,31.99997 17.617597,31.99997 17.322593,31.99997 17.030588,31.870974 16.834585,31.621981L13.203441,27.023009 7.3373374,27.023009 3.7063731,31.621964C3.5103699,31.869967 3.2183651,31.99997 2.92336,31.99997 2.7073566,31.99997 2.489353,31.929968 2.3063499,31.785967 1.8753428,31.444962 1.8013416,30.817952 2.1423472,30.385945L4.7967409,27.023009 3.3879987,27.023009C1.5189811,27.023009,1.5606929E-09,25.502963,0,23.634949L0.018981917,8.9346786C0.057983368,8.7426891 1.067016,4.2546039 9.7849678,4.2405961 9.9051145,4.2323452 10.21317,4.2135194 10.652609,4.2130087z M9.9619535,0C10.772957,0 11.430959,0.65799594 11.430959,1.4689908 11.430959,2.2799857 10.772957,2.9379814 9.9619535,2.9379817 9.1509508,2.9379814 8.4929479,2.2799857 8.4929479,1.4689908 8.4929479,0.65799594 9.1509508,0 9.9619535,0z"
                    Stretch="Uniform" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Header with Background

```xml
<editors:SfTimePicker 
    DropDownHeader="Appointment Time"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="{ThemeResource SystemAccentColor}"
                Padding="12,8"
                CornerRadius="4,4,0,0">
                <TextBlock 
                    Text="{Binding}"
                    Foreground="White"
                    FontSize="14"
                    FontWeight="SemiBold"
                    HorizontalAlignment="Center" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Multi-Line Header

```xml
<editors:SfTimePicker 
    DropDownHeader="Select Time"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel Padding="8">
                <TextBlock 
                    Text="Appointment Booking"
                    FontSize="16"
                    FontWeight="Bold"
                    Foreground="{ThemeResource SystemAccentColor}" />
                <TextBlock 
                    Text="Select your preferred time slot"
                    FontSize="12"
                    Foreground="{ThemeResource TextFillColorSecondaryBrush}"
                    Margin="0,4,0,0" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Header with Warning

```xml
<editors:SfTimePicker 
    DropDownHeader="Time Selection Required"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="#FFF3CD"
                BorderBrush="#FFC107"
                BorderThickness="1"
                Padding="12,8">
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon 
                        FontFamily="Segoe MDL2 Assets" 
                        Glyph="&#xE7BA;"
                        Foreground="#856404"
                        FontSize="16" />
                    <TextBlock 
                        Text="{Binding}"
                        Foreground="#856404"
                        FontSize="13"
                        VerticalAlignment="Center" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Header with Gradient

```xml
<editors:SfTimePicker 
    DropDownHeader="Select Time"
    ShowDropDownHeader="True">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border Height="50">
                <Border.Background>
                    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                        <GradientStop Color="#667eea" Offset="0"/>
                        <GradientStop Color="#764ba2" Offset="1"/>
                    </LinearGradientBrush>
                </Border.Background>
                <TextBlock 
                    Text="{Binding}"
                    Foreground="White"
                    FontSize="16"
                    FontWeight="Bold"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

## Column Headers

Control the visibility of spinner column headers (Hour, Minute, AM/PM).

### Showing Column Headers

**XAML:**
```xml
<!-- Show column headers (default) -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ShowColumnHeaders="True" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.ShowColumnHeaders = true; // Default
```

### Hiding Column Headers

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ShowColumnHeaders="False" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.ShowColumnHeaders = false;
```

### Visual Comparison

**ShowColumnHeaders="True" (Default):**
```
┌───────────┬───────────┬─────────────┐
│   Hour    │  Minute   │   AM/PM     │ ← Column headers
├───────────┼───────────┼─────────────┤
│     10    │    25     │     AM      │
│  → 11 ←   │  → 30 ←   │  → PM ←     │
│     12    │    35     │     AM      │
└───────────┴───────────┴─────────────┘
```

**ShowColumnHeaders="False":**
```
┌───────────┬───────────┬─────────────┐
│     10    │    25     │     AM      │ ← No column headers
│  → 11 ←   │  → 30 ←   │  → PM ←     │
│     12    │    35     │     AM      │
└───────────┴───────────┴─────────────┘
```

### When to Hide Column Headers

**Hide column headers when:**
- Users are familiar with time picker interface
- Cleaner, more compact UI is desired
- Dropdown space is limited
- Column purpose is obvious from context

**Keep column headers when:**
- First-time or infrequent users
- Complex time formats (with seconds)
- Accessibility is important
- Educational/training contexts

### Custom Column Headers

To customize column header text, use the `TimeFieldPrepared` event:

```csharp
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column != null)
    {
        if (e.Column.Field == DateTimeField.Hour12)
        {
            e.Column.Header = "Hr";
            e.Column.ShowHeader = true;
        }
        else if (e.Column.Field == DateTimeField.Minute)
        {
            e.Column.Header = "Min";
            e.Column.ShowHeader = true;
        }
        else if (e.Column.Field == DateTimeField.Meridiem)
        {
            e.Column.Header = "AM/PM";
            e.Column.ShowHeader = true;
        }
    }
};
```

**Result:**
```
┌───────────┬───────────┬─────────────┐
│    Hr     │    Min    │   AM/PM     │ ← Custom headers
├───────────┼───────────┼─────────────┤
│     10    │    25     │     AM      │
│  → 11 ←   │  → 30 ←   │  → PM ←     │
└───────────┴───────────┴─────────────┘
```

## Header Styling Patterns

### Minimalist Style

```xml
<editors:SfTimePicker ShowDropDownHeader="True" DropDownHeader="Select">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <TextBlock 
                Text="{Binding}"
                FontSize="12"
                Foreground="{ThemeResource TextFillColorSecondaryBrush}"
                Margin="8,4" />
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Bold Accent Style

```xml
<editors:SfTimePicker ShowDropDownHeader="True" DropDownHeader="Choose Time">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <TextBlock 
                Text="{Binding}"
                FontSize="18"
                FontWeight="Bold"
                Foreground="{ThemeResource SystemAccentColor}"
                Margin="12,8" />
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Card Style

```xml
<editors:SfTimePicker ShowDropDownHeader="True" DropDownHeader="Appointment Time">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
                BorderBrush="{ThemeResource CardStrokeColorDefaultBrush}"
                BorderThickness="0,0,0,1"
                Padding="16,12">
                <TextBlock 
                    Text="{Binding}"
                    FontSize="14"
                    FontWeight="SemiBold" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

### Information Style

```xml
<editors:SfTimePicker ShowDropDownHeader="True" DropDownHeader="Business hours: 9 AM - 5 PM">
    <editors:SfTimePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="#E3F2FD"
                BorderBrush="#2196F3"
                BorderThickness="0,0,0,2"
                Padding="12,8">
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon 
                        FontFamily="Segoe MDL2 Assets" 
                        Glyph="&#xE946;"
                        Foreground="#1976D2"
                        FontSize="14" />
                    <TextBlock 
                        Text="{Binding}"
                        Foreground="#1976D2"
                        FontSize="12"
                        VerticalAlignment="Center" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.DropDownHeaderTemplate>
</editors:SfTimePicker>
```

## Best Practices

### Header Content

✅ **Do:**
- Use clear, concise header text
- Provide context for time selection
- Use consistent terminology
- Keep headers under 50 characters

❌ **Don't:**
- Use overly long or verbose text
- Include redundant information
- Use technical jargon
- Repeat what's obvious

### Header Design

✅ **Do:**
- Use theme-aware colors
- Ensure proper contrast ratios (WCAG AA)
- Test in light and dark themes
- Keep headers visually distinct from content

❌ **Don't:**
- Use colors that blend with background
- Make headers taller than necessary
- Use complex animations
- Overcrowd with icons and text

### Column Headers

✅ **Do:**
- Show column headers for new users
- Use short, descriptive labels
- Localize header text
- Keep headers consistent across pickers

❌ **Don't:**
- Use abbreviations without context
- Hide headers if they aid understanding
- Use all caps unnecessarily
- Make headers interactive

### Performance

✅ **Do:**
- Keep header templates simple
- Cache custom resources
- Use built-in controls when possible

❌ **Don't:**
- Load heavy images in templates
- Perform calculations in templates
- Use complex data binding

## Troubleshooting

### Issue: Header Not Showing

**Problem:** DropDownHeader doesn't display

**Solutions:**
1. **Enable ShowDropDownHeader:**
   ```xml
   ShowDropDownHeader="True"
   ```

2. **Set DropDownHeader property:**
   ```xml
   DropDownHeader="Select Time"
   ```

3. **Check both properties:**
   ```csharp
   timePicker.ShowDropDownHeader = true;
   timePicker.DropDownHeader = "Select Time";
   ```

### Issue: Custom Template Not Applied

**Problem:** DropDownHeaderTemplate doesn't show

**Solutions:**
1. **Verify template structure:**
   ```xml
   <editors:SfTimePicker.DropDownHeaderTemplate>
       <DataTemplate>
           <!-- Content -->
       </DataTemplate>
   </editors:SfTimePicker.DropDownHeaderTemplate>
   ```

2. **Don't use both Header and Template:**
   ```xml
   <!-- Incorrect: removes DropDownHeader when using template -->
   <editors:SfTimePicker 
       DropDownHeader="Text"
       DropDownHeaderTemplate="{StaticResource Template}" />
   
   <!-- Correct: DropDownHeader provides data to template -->
   <editors:SfTimePicker 
       DropDownHeader="Text"
       ShowDropDownHeader="True">
       <editors:SfTimePicker.DropDownHeaderTemplate>
           <DataTemplate>
               <TextBlock Text="{Binding}" />
           </DataTemplate>
       </editors:SfTimePicker.DropDownHeaderTemplate>
   </editors:SfTimePicker>
   ```

3. **Check DataContext:**
   ```xml
   <!-- {Binding} binds to DropDownHeader value -->
   <TextBlock Text="{Binding}" />
   ```

### Issue: Column Headers Not Hiding

**Problem:** ShowColumnHeaders="False" doesn't work

**Solutions:**
1. **Verify property:**
   ```csharp
   timePicker.ShowColumnHeaders = false;
   ```

2. **Check TimeFieldPrepared event:**
   ```csharp
   // Don't explicitly set ShowHeader in event
   timePicker.TimeFieldPrepared += (s, e) =>
   {
       // Remove this line:
       // e.Column.ShowHeader = true;
   };
   ```

### Issue: Header Clipped or Truncated

**Problem:** Header text cut off

**Solutions:**
1. **Set DropDownWidth:**
   ```csharp
   timePicker.DropDownWidth = 350;
   ```

2. **Use TextWrapping:**
   ```xml
   <TextBlock 
       Text="{Binding}"
       TextWrapping="Wrap"
       MaxWidth="300" />
   ```

3. **Shorten header text:**
   ```csharp
   timePicker.DropDownHeader = "Select Time"; // Shorter
   ```

## See Also

- [Dropdown Customization](dropdown-customization.md) - Button and placement
- [Dropdown Spinner Customization](dropdown-spinner-customization.md) - Spinner cells and columns
- [Getting Started](getting-started.md) - Basic TimePicker setup
