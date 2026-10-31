# Content in WinUI BusyIndicator

## Table of Contents
- [Overview](#overview)
- [BusyContent Property](#busycontent-property)
- [BusyContentPosition Property](#busycontentposition-property)
- [BusyContentTemplate Property](#busycontenttemplate-property)
- [Advanced Template Examples](#advanced-template-examples)
- [Best Practices](#best-practices)

## Overview

The BusyIndicator control provides three properties to customize the content displayed alongside the loading animation:

1. **BusyContent** - Simple text or object content
2. **BusyContentPosition** - Position content relative to the indicator
3. **BusyContentTemplate** - Custom DataTemplate for rich content

These properties allow you to provide context to users about what's happening during the loading process.

## BusyContent Property

The `BusyContent` property displays a message or object below (or beside) the animated indicator.

**Property Details:**
- **Type:** `object`
- **Default:** `null` (no content displayed)
- **Common Usage:** Display loading messages, status text, or custom objects

### Basic Text Content

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircularFluent"
    BusyContent="Loading..."/>
```

**C#:**
```csharp
SfBusyIndicator busyIndicator = new SfBusyIndicator
{
    IsActive = true,
    AnimationType = BusyIndicatorAnimationType.DottedCircularFluent,
    BusyContent = "Loading..."
};
```

### Dynamic Content Updates

Update content during operation:

```csharp
private async void LoadMultiStepDataAsync()
{
    busyIndicator.IsActive = true;
    
    try
    {
        busyIndicator.BusyContent = "Connecting to server...";
        await ConnectAsync();
        
        busyIndicator.BusyContent = "Downloading data...";
        await DownloadDataAsync();
        
        busyIndicator.BusyContent = "Processing results...";
        await ProcessDataAsync();
    }
    finally
    {
        busyIndicator.IsActive = false;
    }
}
```

### Content with Variables

Show dynamic information:

```csharp
private async void UploadFilesAsync(List<string> files)
{
    busyIndicator.IsActive = true;
    
    for (int i = 0; i < files.Count; i++)
    {
        busyIndicator.BusyContent = $"Uploading file {i + 1} of {files.Count}...";
        await UploadFileAsync(files[i]);
    }
    
    busyIndicator.IsActive = false;
}
```

## BusyContentPosition Property

The `BusyContentPosition` property controls where content appears relative to the animated indicator.

**Property Details:**
- **Type:** `BusyIndicatorContentPosition` (enum)
- **Default:** `Bottom`
- **Options:** `Top`, `Bottom`, `Left`, `Right`

### Bottom Position (Default)

Content appears below the indicator:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    BusyContent="Loading..."
    BusyContentPosition="Bottom"/>
```

**Best For:** Vertical layouts, most general use cases.

### Top Position

Content appears above the indicator:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    BusyContent="Please wait..."
    BusyContentPosition="Top"/>
```

**C#:**
```csharp
busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Top;
```

**Best For:** When indicator needs to be bottom-aligned in the layout.

### Left Position

Content appears to the left of the indicator:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    BusyContent="Refreshing"
    BusyContentPosition="Left"/>
```

**C#:**
```csharp
busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Left;
```

**Best For:** Horizontal layouts, inline indicators, RTL languages.

### Right Position

Content appears to the right of the indicator:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    BusyContent="Loading data"
    BusyContentPosition="Right"/>
```

**C#:**
```csharp
busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Right;
```

**Best For:** Horizontal layouts, toolbar indicators, LTR languages.

### Choosing Position

```csharp
// Example: Choose position based on available space
private void ConfigureBusyIndicatorPosition()
{
    if (this.ActualWidth > this.ActualHeight)
    {
        // Wide layout - use horizontal positioning
        busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Right;
    }
    else
    {
        // Tall layout - use vertical positioning
        busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Bottom;
    }
}
```

## BusyContentTemplate Property

The `BusyContentTemplate` property allows you to define a custom `DataTemplate` for rich content beyond simple text.

**Property Details:**
- **Type:** `DataTemplate`
- **Default:** `null` (uses default text rendering)
- **Use Cases:** Styled text, icons, progress percentages, custom layouts

### Simple Custom Template

Add styling to text:

```xaml
<notification:SfBusyIndicator IsActive="True" AnimationType="DottedCircle">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate>
            <TextBlock 
                Text="Loading..." 
                FontSize="18" 
                FontStyle="Italic" 
                FontWeight="Bold" 
                Foreground="DodgerBlue"/>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

### Template with Icon

Combine icon and text:

```xaml
<notification:SfBusyIndicator IsActive="True" AnimationType="LinearFluent">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="10">
                <FontIcon Glyph="&#xE895;" FontSize="20" Foreground="Orange"/>
                <TextBlock Text="Downloading files..." 
                          FontSize="16" 
                          VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

**Common Icon Glyphs (Segoe MDL2 Assets):**
- `&#xE895;` - Download
- `&#xE896;` - Upload
- `&#xE72C;` - Sync
- `&#xE74E;` - Refresh
- `&#xE74C;` - Settings

### Multi-Line Content

Display multiple lines of information:

```xaml
<notification:SfBusyIndicator IsActive="True" AnimationType="DoubleCircle">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate>
            <StackPanel Spacing="5">
                <TextBlock Text="Processing Data" 
                          FontSize="16" 
                          FontWeight="SemiBold"
                          HorizontalAlignment="Center"/>
                <TextBlock Text="This may take a few moments..." 
                          FontSize="12" 
                          Foreground="Gray"
                          HorizontalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

### Template with Data Binding

Bind template to dynamic data:

**XAML:**
```xaml
<notification:SfBusyIndicator 
    x:Name="busyIndicator"
    IsActive="True" 
    AnimationType="DottedCircularFluent"
    BusyContent="{x:Bind ViewModel.LoadingStatus, Mode=OneWay}">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate x:DataType="x:String">
            <StackPanel Spacing="8">
                <TextBlock Text="{x:Bind}" 
                          FontSize="16" 
                          FontWeight="Medium"
                          HorizontalAlignment="Center"/>
                <ProgressBar IsIndeterminate="True" Width="200"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

**ViewModel:**
```csharp
public class MainViewModel : INotifyPropertyChanged
{
    private string loadingStatus = "Initializing...";
    
    public string LoadingStatus
    {
        get => loadingStatus;
        set
        {
            loadingStatus = value;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(LoadingStatus)));
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
}
```

## Advanced Template Examples

### Template with Animation

Add custom animations to content:

```xaml
<notification:SfBusyIndicator IsActive="True">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate>
            <TextBlock Text="Loading..." FontSize="18">
                <TextBlock.Resources>
                    <Storyboard x:Name="PulseAnimation" RepeatBehavior="Forever">
                        <DoubleAnimation 
                            Storyboard.TargetProperty="Opacity"
                            From="1.0" To="0.3" Duration="0:0:1"
                            AutoReverse="True"/>
                    </Storyboard>
                </TextBlock.Resources>
                <TextBlock.Triggers>
                    <EventTrigger RoutedEvent="Loaded">
                        <BeginStoryboard Storyboard="{StaticResource PulseAnimation}"/>
                    </EventTrigger>
                </TextBlock.Triggers>
            </TextBlock>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

### Template with Progress Percentage

Show percentage completion:

```xaml
<notification:SfBusyIndicator 
    x:Name="busyIndicator"
    IsActive="True"
    AnimationType="LinearFluent"
    BusyContent="{x:Bind ProgressPercentage, Mode=OneWay}">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate x:DataType="x:Int32">
            <StackPanel Spacing="10">
                <TextBlock HorizontalAlignment="Center">
                    <Run Text="Progress: "/>
                    <Run Text="{x:Bind}" FontWeight="Bold"/>
                    <Run Text="%"/>
                </TextBlock>
                <ProgressBar Value="{x:Bind}" Maximum="100" Width="200"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

**Code-Behind:**
```csharp
private int progressPercentage = 0;
public int ProgressPercentage
{
    get => progressPercentage;
    set
    {
        progressPercentage = value;
        busyIndicator.BusyContent = value;
    }
}

private async void SimulateProgressAsync()
{
    busyIndicator.IsActive = true;
    
    for (int i = 0; i <= 100; i += 10)
    {
        ProgressPercentage = i;
        await Task.Delay(500);
    }
    
    busyIndicator.IsActive = false;
}
```

### Template with Emoji/Special Characters

Use emoji for visual appeal:

```xaml
<notification:SfBusyIndicator IsActive="True" AnimationType="DottedCircle">
    <notification:SfBusyIndicator.BusyContentTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="10">
                <TextBlock Text="⏳" FontSize="24"/>
                <TextBlock Text="Please wait a moment..." 
                          FontSize="16" 
                          VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </notification:SfBusyIndicator.BusyContentTemplate>
</notification:SfBusyIndicator>
```

**Common Emoji:**
- ⏳ - Hourglass
- 🔄 - Refresh
- 💾 - Save
- 📥 - Download
- 📤 - Upload
- 🔍 - Search

## Best Practices

### 1. Keep Content Concise
```xaml
<!-- ✓ Good -->
<notification:SfBusyIndicator BusyContent="Loading data..."/>

<!-- ✗ Avoid -->
<notification:SfBusyIndicator BusyContent="Please wait while the application loads all the data from the remote server and processes it..."/>
```

### 2. Provide Context
```csharp
// ✓ Good - tells user what's happening
busyIndicator.BusyContent = "Uploading files...";

// ✗ Generic - no context
busyIndicator.BusyContent = "Please wait...";
```

### 3. Update Content for Long Operations
```csharp
// ✓ Good - shows progress through stages
busyIndicator.BusyContent = "Step 1 of 3: Validating...";
await ValidateAsync();

busyIndicator.BusyContent = "Step 2 of 3: Processing...";
await ProcessAsync();

busyIndicator.BusyContent = "Step 3 of 3: Saving...";
await SaveAsync();
```

### 4. Match Position to Layout
```csharp
// For vertical layouts
busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Bottom;

// For horizontal toolbars
busyIndicator.BusyContentPosition = BusyIndicatorContentPosition.Right;
```

### 5. Use Templates for Rich Content
```xaml
<!-- When you need more than text, use templates -->
<notification:SfBusyIndicator.BusyContentTemplate>
    <DataTemplate>
        <StackPanel>
            <TextBlock Text="Uploading" FontWeight="Bold"/>
            <TextBlock Text="5 files remaining" FontSize="12" Foreground="Gray"/>
        </StackPanel>
    </DataTemplate>
</notification:SfBusyIndicator.BusyContentTemplate>
```

### 6. Accessibility Considerations
```xaml
<!-- Add automation properties for screen readers -->
<notification:SfBusyIndicator 
    IsActive="True"
    BusyContent="Loading data"
    AutomationProperties.LiveSetting="Polite"
    AutomationProperties.Name="Loading indicator"/>
```

## Next Steps

- **Animation Types:** See [animation-types.md](animation-types.md) to choose the right animation
- **Customization:** See [customization.md](customization.md) to adjust size, speed, and colors
