# Dropdown Header Customization in WinUI DatePicker

Complete guide for customizing the dropdown header area of the Syncfusion WinUI DatePicker control, including header content, templates, and column header visibility.

## Table of Contents
- [Overview](#overview)
- [Setting Dropdown Header](#setting-dropdown-header)
- [Custom Header Template](#custom-header-template)
- [Column Headers](#column-headers)
- [Common Header Patterns](#common-header-patterns)
- [Header Layout Combinations](#header-layout-combinations)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

The DatePicker dropdown can display two types of headers:
1. **Dropdown Header:** Custom content at the top of the dropdown
2. **Column Headers:** Labels above day/month/year spinner columns

## Setting Dropdown Header

### DropDownHeader Property

Add hint text or content in the dropdown header area:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DropDownHeader="Select journey date"
    ShowDropDownHeader="True" />
```

```csharp
datePicker.DropDownHeader = "Select journey date";
datePicker.ShowDropDownHeader = true;
```

**Requirements:**
- Must set `ShowDropDownHeader="True"` to display header
- `DropDownHeader` can be string or any object

**Default values:**
- `DropDownHeader`: `null`
- `ShowDropDownHeader`: `false`

### Header with Rich Content

```csharp
// Set header as any object
datePicker.DropDownHeader = new TextBlock
{
    Text = "Choose Date",
    FontSize = 16,
    FontWeight = FontWeights.Bold
};
datePicker.ShowDropDownHeader = true;
```

### Showing/Hiding Header

```csharp
// Show header
datePicker.ShowDropDownHeader = true;

// Hide header
datePicker.ShowDropDownHeader = false;
```

## Custom Header Template

### DropDownHeaderTemplate Property

Create custom UI for the dropdown header:

```xml
<editors:SfDatePicker 
    DropDownHeader="Choose a Travel Date"
    ShowDropDownHeader="True"
    x:Name="datePicker">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Foreground="Green"
                    FontSize="16"
                    FontWeight="SemiBold"
                    Text="{Binding}" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

**DataContext:** The `DataContext` of `DropDownHeaderTemplate` is the value of `DropDownHeader` property.

### Header with Icon

```xml
<editors:SfDatePicker 
    DropDownHeader="Select journey date"
    ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" HorizontalAlignment="Center">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE787;"
                    Margin="0,0,8,0"
                    Foreground="Blue" />
                <TextBlock 
                    Text="{Binding}" 
                    FontSize="14"
                    VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

### Header with Travel Icon

```xml
<editors:SfDatePicker 
    DropDownHeader="Choose a Travel Date"
    ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Foreground="Green"
                    Text="{Binding}"
                    FontSize="14"
                    FontWeight="SemiBold" />
                <Path
                    Width="32"
                    Height="32"
                    Margin="5,5,5,10"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Bottom"
                    Fill="Blue"
                    Data="M5.0499409,20.854989C5.6799391,20.854989..."
                    Stretch="Uniform" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

### Styled Header with Background

```xml
<editors:SfDatePicker 
    DropDownHeader="Select Appointment Date"
    ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="{ThemeResource AccentFillColorDefaultBrush}"
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
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

### Header with Multiple Lines

```xml
<editors:SfDatePicker ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeader>
        <StackPanel>
            <TextBlock Text="Select Date" FontWeight="Bold" />
            <TextBlock Text="Choose your preferred date" 
                       FontSize="12" 
                       Foreground="Gray" />
        </StackPanel>
    </editors:SfDatePicker.DropDownHeader>
</editors:SfDatePicker>
```

### Header with Date Information

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowDropDownHeader="True"
    SelectedDateChanged="DatePicker_SelectedDateChanged">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <StackPanel Padding="8">
                <TextBlock 
                    Text="Selected Date"
                    FontSize="12"
                    Foreground="Gray" />
                <TextBlock 
                    Text="{Binding}"
                    FontSize="16"
                    FontWeight="SemiBold"
                    Margin="0,4,0,0" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

```csharp
private void DatePicker_SelectedDateChanged(DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    if (e.NewDateTime.HasValue)
    {
        datePicker.DropDownHeader = e.NewDateTime.Value.ToString("MMMM dd, yyyy");
    }
}
```

## Column Headers

### ShowColumnHeaders Property

Control visibility of column headers (Day, Month, Year labels):

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowColumnHeaders="False" />
```

```csharp
datePicker.ShowColumnHeaders = false;
```

**Default:** `true` (headers visible)

### Column Header Behavior

**When `ShowColumnHeaders="True"` (default):**
- Headers show above each spinner column
- Headers display based on field format (Day, Month, Year)
- Headers help users identify columns

**When `ShowColumnHeaders="False"`:**
- No labels above spinner columns
- Cleaner, more compact appearance
- Useful when column content is self-explanatory

### Customizing Column Headers

To customize individual column headers (text, formatting, etc.), use the `DateFieldPrepared` event:

```csharp
private void DatePicker_DateFieldPrepared(object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        if (e.Column.Field == DateTimeField.Day)
        {
            e.Column.ShowHeader = true;
            e.Column.Header = "Day";
        }
        else if (e.Column.Field == DateTimeField.MonthName)
        {
            e.Column.ShowHeader = true;
            e.Column.Header = "Month";
        }
        else if (e.Column.Field == DateTimeField.Year)
        {
            e.Column.ShowHeader = true;
            e.Column.Header = "Year";
        }
    }
}
```

For more details, see [Spinner Customization](spinner-customization.md).

## Common Header Patterns

### Pattern 1: Simple Text Header
```xml
<editors:SfDatePicker 
    DropDownHeader="Select a date"
    ShowDropDownHeader="True" />
```

### Pattern 2: Instructional Header
```xml
<editors:SfDatePicker 
    DropDownHeader="Choose your appointment date (Mon-Fri only)"
    ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <TextBlock 
                Text="{Binding}"
                TextWrapping="Wrap"
                Foreground="DarkBlue"
                FontSize="12"
                Padding="8" />
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

### Pattern 3: Branded Header
```xml
<editors:SfDatePicker ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeader>
        <StackPanel Orientation="Horizontal">
            <Image 
                Source="/Assets/logo.png"
                Width="24"
                Height="24"
                Margin="0,0,8,0" />
            <TextBlock 
                Text="Acme Booking System"
                FontWeight="SemiBold"
                VerticalAlignment="Center" />
        </StackPanel>
    </editors:SfDatePicker.DropDownHeader>
</editors:SfDatePicker>
```

### Pattern 4: Minimal No Headers
```xml
<editors:SfDatePicker 
    ShowDropDownHeader="False"
    ShowColumnHeaders="False" />
```

### Pattern 5: Header with Current Selection
```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowDropDownHeader="True"
    SelectedDateChanged="UpdateHeader">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="LightGray"
                Padding="10">
                <StackPanel>
                    <TextBlock 
                        Text="Current Selection"
                        FontSize="10"
                        Foreground="Gray" />
                    <TextBlock 
                        Text="{Binding}"
                        FontSize="14"
                        FontWeight="Bold"
                        Margin="0,4,0,0" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

```csharp
private void UpdateHeader(DependencyObject d, DependencyPropertyChangedEventArgs e)
{
    if (e.NewDateTime.HasValue)
    {
        datePicker.DropDownHeader = e.NewDateTime.Value.ToString("dddd, MMMM dd, yyyy");
    }
    else
    {
        datePicker.DropDownHeader = "No date selected";
    }
}
```

## Header Layout Combinations

### Header Only (No Column Headers)
```xml
<editors:SfDatePicker 
    DropDownHeader="Select Date"
    ShowDropDownHeader="True"
    ShowColumnHeaders="False" />
```

### Column Headers Only (No Dropdown Header)
```xml
<editors:SfDatePicker 
    ShowDropDownHeader="False"
    ShowColumnHeaders="True" />
```

### Both Headers
```xml
<editors:SfDatePicker 
    DropDownHeader="Choose a date"
    ShowDropDownHeader="True"
    ShowColumnHeaders="True" />
```

### No Headers (Minimal)
```xml
<editors:SfDatePicker 
    ShowDropDownHeader="False"
    ShowColumnHeaders="False" />
```

## Common Use Cases

### Use Case 1: Booking System
```xml
<editors:SfDatePicker 
    DropDownHeader="Select Reservation Date"
    ShowDropDownHeader="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border 
                Background="#2196F3"
                Padding="12">
                <StackPanel>
                    <TextBlock 
                        Text="{Binding}"
                        Foreground="White"
                        FontSize="14"
                        FontWeight="SemiBold" />
                    <TextBlock 
                        Text="Available dates only"
                        Foreground="White"
                        FontSize="10"
                        Opacity="0.8"
                        Margin="0,4,0,0" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

### Use Case 2: Clean Minimal Design
```xml
<editors:SfDatePicker 
    ShowDropDownHeader="False"
    ShowColumnHeaders="False"
    ShowDropDownButton="False" />
```

### Use Case 3: Guided Selection
```xml
<editors:SfDatePicker 
    DropDownHeader="Step 2: Choose your travel date"
    ShowDropDownHeader="True"
    ShowColumnHeaders="True">
    <editors:SfDatePicker.DropDownHeaderTemplate>
        <DataTemplate>
            <Border BorderBrush="Orange" BorderThickness="0,0,0,2" Padding="8">
                <TextBlock 
                    Text="{Binding}"
                    FontSize="13"
                    Foreground="Orange"
                    FontWeight="SemiBold" />
            </Border>
        </DataTemplate>
    </editors:SfDatePicker.DropDownHeaderTemplate>
</editors:SfDatePicker>
```

## Troubleshooting

### Issue: Header Not Showing
**Cause:** `ShowDropDownHeader` is `false`  
**Solution:** Set property to `true`:
```xml
<editors:SfDatePicker 
    DropDownHeader="Select Date"
    ShowDropDownHeader="True" />
```

### Issue: Template Not Applied
**Cause:** Missing DataTemplate tags  
**Solution:** Ensure proper template structure:
```xml
<editors:SfDatePicker.DropDownHeaderTemplate>
    <DataTemplate>
        <!-- Your content here -->
    </DataTemplate>
</editors:SfDatePicker.DropDownHeaderTemplate>
```

### Issue: Binding Not Working in Template
**Cause:** Incorrect binding syntax  
**Solution:** Use `{Binding}` to bind to DropDownHeader value:
```xml
<TextBlock Text="{Binding}" />
```

### Issue: Column Headers Overlap Content
**Cause:** Headers enabled with small dropdown height  
**Solution:** Increase height or hide headers:
```xml
<editors:SfDatePicker 
    DropDownHeight="300"
    ShowColumnHeaders="True" />
```

## Next Steps

- **Spinner Customization:** Customize spinner cells and columns
- **Dropdown Customization:** Configure dropdown button and placement
- **Getting Started:** Basic DatePicker setup

## Related Resources

- [GitHub Examples - Custom UI](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples/tree/main/Samples/CustomUI)
- [Spinner Customization](spinner-customization.md)
- [Dropdown Customization](dropdown-customization.md)
