# Getting Started with WinUI Segmented Control

This guide covers installation, basic setup, and initial implementation of the Segmented Control in WinUI applications.

## Installation

Install the Syncfusion Editors NuGet package for WinUI.

### Using Visual Studio NuGet Package Manager

1. Open your WinUI 3 project
2. Navigate to **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. Search for **"Syncfusion.Editors.WinUI"**
4. Select the package and install

### Using Package Manager Console

```powershell
Install-Package Syncfusion.Editors.WinUI
```

### Using .NET CLI

```bash
dotnet add package Syncfusion.Editors.WinUI
```

## License Registration

Syncfusion controls require a license key. Register it in your `App.xaml.cs` before any component initialization:

```csharp
using Syncfusion.Licensing;

public App()
{
    // Register Syncfusion license FIRST
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**Getting a License:**
- **Free Community License:** Available for qualifying developers
- **Trial License:** 30-day evaluation
- **Commercial License:** For commercial projects
- Visit: https://www.syncfusion.com/sales/products

## Namespace Imports

Add the Syncfusion namespace to your XAML pages:

```xaml
<Window
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    <!-- Your content -->
</Window>
```

For C# code-behind:

```csharp
using Syncfusion.UI.Xaml.Editors;
```

## Basic Initialization

### In XAML

```xaml
<Window
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    <Grid>
        <syncfusion:SfSegmentedControl 
            x:Name="segmentedControl"
            HorizontalAlignment="Center"
            VerticalAlignment="Center"/>
    </Grid>
</Window>
```

### In C# Code

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Editors;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        SfSegmentedControl segmentedControl = new SfSegmentedControl();
        rootGrid.Children.Add(segmentedControl);
    }
}
```

## Populating with String Collections

The simplest way to populate the Segmented Control is with inline string items.

### Inline String Items

```xaml
<syncfusion:SfSegmentedControl 
    x:Name="periodSelector"
    HorizontalAlignment="Center"
    VerticalAlignment="Center"
    SelectedIndex="0">
    <x:String>Day</x:String>
    <x:String>Week</x:String>
    <x:String>Month</x:String>
    <x:String>Year</x:String>
</syncfusion:SfSegmentedControl>
```

**Result:** A segmented control with 4 options, "Day" selected by default.

### String Collection in Code

```csharp
var periods = new List<string> { "Day", "Week", "Month", "Year" };
segmentedControl.ItemsSource = periods;
segmentedControl.SelectedIndex = 2; // Select "Month"
```

## Populating with Business Objects

For more complex scenarios, bind to a collection of business objects.

### Define the Model

```csharp
public class PeriodModel : INotifyPropertyChanged
{
    private string name;
    
    public string Name
    {
        get { return name; }
        set 
        { 
            name = value;
            OnPropertyChanged(nameof(Name));
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### Create the ViewModel

```csharp
public class SegmentedViewModel
{
    public ObservableCollection<PeriodModel> Periods { get; set; }
    
    public SegmentedViewModel()
    {
        Periods = new ObservableCollection<PeriodModel>
        {
            new PeriodModel { Name = "Day" },
            new PeriodModel { Name = "Week" },
            new PeriodModel { Name = "Month" },
            new PeriodModel { Name = "Year" }
        };
    }
}
```

### Bind with DisplayMemberPath

The `DisplayMemberPath` property tells the control which property to display.

```xaml
<Window
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors"
    xmlns:local="using:YourNamespace">
    <Window.DataContext>
        <local:SegmentedViewModel/>
    </Window.DataContext>
    
    <Grid>
        <syncfusion:SfSegmentedControl 
            ItemsSource="{Binding Periods}"
            DisplayMemberPath="Name"
            SelectedIndex="2"
            HorizontalAlignment="Center"
            VerticalAlignment="Center"/>
    </Grid>
</Window>
```

**Result:** Displays "Day", "Week", "Month", "Year" with "Month" selected (index 2).

## Custom UI with ItemTemplate

For advanced scenarios with icons, images, or complex layouts, use `ItemTemplate`.

### Model with Icon Data

```csharp
public class FileTypeModel
{
    public string Name { get; set; }
    public string IconPath { get; set; }
    public Brush IconColor { get; set; }
}

public class FileTypeViewModel
{
    public ObservableCollection<FileTypeModel> FileTypes { get; set; }
    
    public FileTypeViewModel()
    {
        FileTypes = new ObservableCollection<FileTypeModel>
        {
            new FileTypeModel 
            { 
                Name = "Word", 
                IconPath = "M14.8,9.8L12.7,10L11.4,17.9...", // Path data
                IconColor = new SolidColorBrush(Colors.Brown)
            },
            new FileTypeModel 
            { 
                Name = "PDF", 
                IconPath = "M6.27,25.18C4.19,25.84...",
                IconColor = new SolidColorBrush(Colors.OrangeRed)
            },
            new FileTypeModel 
            { 
                Name = "Excel", 
                IconPath = "M8.4,12L9,12C10.7...",
                IconColor = new SolidColorBrush(Colors.Green)
            }
        };
    }
}
```

### ItemTemplate with Icon and Text

```xaml
<syncfusion:SfSegmentedControl 
    ItemsSource="{Binding FileTypes}"
    SelectedIndex="0"
    HorizontalAlignment="Center"
    VerticalAlignment="Center">
    <syncfusion:SfSegmentedControl.ItemTemplate>
        <DataTemplate>
            <StackPanel Height="50" Orientation="Vertical">
                <Path 
                    Data="{Binding IconPath}" 
                    Fill="{Binding IconColor}"
                    Stretch="Uniform"
                    Width="16" 
                    Height="16" 
                    Margin="0,8,0,0"/>
                <TextBlock 
                    Text="{Binding Name}" 
                    Margin="0,6,0,0"
                    HorizontalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfSegmentedControl.ItemTemplate>
</syncfusion:SfSegmentedControl>
```

**Result:** Segments display icon above text with custom colors.

### ItemTemplate with Horizontal Layout

```xaml
<syncfusion:SfSegmentedControl.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal">
            <SymbolIcon Symbol="{Binding IconSymbol}" Width="16" Height="16"/>
            <TextBlock Text="{Binding Name}" Margin="8,0,0,0" VerticalAlignment="Center"/>
        </StackPanel>
    </DataTemplate>
</syncfusion:SfSegmentedControl.ItemTemplate>
```

## Complete Working Example

Here's a full working example with ViewModel, data binding, and selection handling.

### ViewModel

```csharp
public class MainViewModel : INotifyPropertyChanged
{
    private int selectedPeriodIndex;
    
    public ObservableCollection<string> Periods { get; set; }
    
    public int SelectedPeriodIndex
    {
        get { return selectedPeriodIndex; }
        set
        {
            selectedPeriodIndex = value;
            OnPropertyChanged(nameof(SelectedPeriodIndex));
            OnPeriodChanged();
        }
    }
    
    public MainViewModel()
    {
        Periods = new ObservableCollection<string>
        {
            "Day", "Week", "Month", "Year"
        };
        
        SelectedPeriodIndex = 2; // Default to "Month"
    }
    
    private void OnPeriodChanged()
    {
        string selectedPeriod = Periods[SelectedPeriodIndex];
        // Update your data based on selected period
        LoadDataForPeriod(selectedPeriod);
    }
    
    private void LoadDataForPeriod(string period)
    {
        // Your logic here
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### XAML

```xaml
<Window
    x:Class="SegmentedApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:SegmentedApp"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    
    <Window.DataContext>
        <local:MainViewModel/>
    </Window.DataContext>
    
    <Grid>
        <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="20">
            <TextBlock 
                Text="Select Time Period" 
                FontSize="18" 
                HorizontalAlignment="Center"/>
            
            <syncfusion:SfSegmentedControl 
                ItemsSource="{Binding Periods}"
                SelectedIndex="{Binding SelectedPeriodIndex, Mode=TwoWay}"
                HorizontalAlignment="Center"/>
            
            <TextBlock 
                Text="{Binding Periods[SelectedPeriodIndex]}" 
                FontSize="16"
                HorizontalAlignment="Center"
                Foreground="Gray"/>
        </StackPanel>
    </Grid>
</Window>
```

### Code-Behind (Minimal)

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
    }
}
```

## Troubleshooting

### Items Not Showing

**Problem:** Segmented Control is empty or items don't appear.

**Solutions:**
1. Verify ItemsSource is properly bound: `ItemsSource="{Binding Periods}"`
2. Check DataContext is set on parent element or window
3. Ensure collection is not null or empty
4. If using DisplayMemberPath, verify property name matches exactly
5. Check Output window for binding errors

### Selected Item Not Working

**Problem:** SelectedIndex doesn't select the correct item.

**Solutions:**
1. Set SelectedIndex after ItemsSource is populated
2. Ensure index is within valid range (0 to Items.Count - 1)
3. Use two-way binding: `SelectedIndex="{Binding SelectedIndex, Mode=TwoWay}"`
4. In code, set ItemsSource first, then SelectedIndex

### License Warning

**Problem:** "License key is invalid" or trial banner appears.

**Solutions:**
1. Register license in App.xaml.cs constructor BEFORE InitializeComponent()
2. Verify license key is correct (no extra spaces or line breaks)
3. Ensure license type matches your usage (community/trial/commercial)
4. Get license from: https://www.syncfusion.com/account/manage-trials/downloads

### ItemTemplate Not Rendering

**Problem:** Custom ItemTemplate doesn't show or looks wrong.

**Solutions:**
1. Verify DataTemplate is inside ItemTemplate property
2. Check binding paths match your model properties
3. Set explicit Width/Height on container elements if needed
4. Test with simple TextBlock first, then add complexity
5. Use x:Bind for better error messages (compile-time binding)

### No Visual Feedback on Click

**Problem:** Clicking segments has no effect or visual feedback.

**Solutions:**
1. Ensure control is enabled: `IsEnabled="True"`
2. Check control has proper size (not collapsed or zero size)
3. Verify HorizontalAlignment and VerticalAlignment are set appropriately
4. Test with simple string items first to isolate issue
5. Check if custom styles are overriding hover/pressed states
