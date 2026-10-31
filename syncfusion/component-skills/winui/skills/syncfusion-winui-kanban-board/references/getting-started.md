# Getting Started with WinUI Kanban

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Creating WinUI Application](#creating-winui-application)
- [Adding Kanban Control](#adding-kanban-control)
- [Populating ItemsSource](#populating-itemsource)
- [Using Default KanbanModel](#using-default-kanbanmodel)
- [Creating Custom Model with Data Mapping](#creating-custom-model-with-data-mapping)
- [Defining Columns](#defining-columns)
- [Theming Support](#theming-support)
- [Localization](#localization)
- [RTL Support](#rtl-support)

## Installation and Setup

### Step 1: Create WinUI 3 Application

Create a [WinUI 3 Blank app for C# and .NET 8](https://learn.microsoft.com/en-us/windows/apps/winui/winui3/create-your-first-winui3-app) or later.

### Step 2: Install NuGet Package

Add reference to the [Syncfusion.Kanban.WinUI](https://www.nuget.org/packages/Syncfusion.Kanban.WinUI) NuGet package.

**Package Manager Console:**
```
Install-Package Syncfusion.Kanban.WinUI
```

**NuGet Package Manager UI:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Kanban.WinUI"
3. Click Install

### Step 3: Register Syncfusion License

Add license registration in App.xaml.cs before any Syncfusion control is initialized:

```csharp
using Syncfusion.Licensing;

public App()
{
    // Register Syncfusion license
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**Get License Key:** [Syncfusion Licensing](https://help.syncfusion.com/common/essential-studio/licensing/overview)

## Creating WinUI Application

### Import Namespace

Add the Kanban namespace in XAML:

```xml
<Window
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:kanban="using:Syncfusion.UI.Xaml.Kanban">
    
    <!-- Kanban control -->
</Window>
```

Or in C# code-behind:

```csharp
using Syncfusion.UI.Xaml.Kanban;
```

## Adding Kanban Control

### XAML Approach

```xml
<Window xmlns:kanban="using:Syncfusion.UI.Xaml.Kanban">
    <kanban:SfKanban x:Name="kanban"/>
</Window>
```

### Code-Behind Approach

```csharp
using Syncfusion.UI.Xaml.Kanban;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        SfKanban kanban = new SfKanban();
        this.Content = kanban;
    }
}
```

## Populating ItemsSource

The Kanban control displays cards from a data source bound to the `ItemsSource` property. You can use either:
1. **Default KanbanModel** - Built-in model with default card UI
2. **Custom Model** - Your own data model with custom card template

## Using Default KanbanModel

### Overview

The `KanbanModel` class provides built-in properties with default card UI. Each instance represents one card.

**Advantages:**
- No custom template required
- Built-in card appearance
- Quick implementation
- All standard features included

### KanbanModel Properties

| Property | Type | Purpose |
|----------|------|---------|
| `Title` | string | Card title (displayed prominently) |
| `Id` | object | Unique identifier |
| `Description` | string | Detailed card text |
| `Category` | object | Column assignment (e.g., "Open", "In Progress", "Done") |
| `Assignee` | string | Assigned person (default for swim lanes) |
| `IndicatorColorKey` | object | Priority indicator (High, Normal, Low) |
| `Tags` | List<string> | Labels displayed at bottom |
| `Image` | Image | Avatar/icon displayed on card |

### Step 1: Create ViewModel

```csharp
using Syncfusion.UI.Xaml.Kanban;
using System.Collections.ObjectModel;

public class ViewModel
{
    public ObservableCollection<KanbanModel> TaskDetails { get; set; }

    public ViewModel()
    {
        TaskDetails = GetTaskDetails();
    }

    private ObservableCollection<KanbanModel> GetTaskDetails()
    {
        var taskDetails = new ObservableCollection<KanbanModel>();

        taskDetails.Add(new KanbanModel()
        {
            Title = "UWP Issue",
            Id = "651",
            Description = "Crosshair label template not visible in UWP",
            Category = "Open",
            IndicatorColorKey = "High",
            Tags = new List<string>() { "Bug Fixing" }
        });

        taskDetails.Add(new KanbanModel()
        {
            Title = "WinUI Issue",
            Id = "646",
            Description = "AxisLabel cropped when rotating the axis label",
            Category = "Open",
            IndicatorColorKey = "Low",
            Tags = new List<string>() { "Bug Fixing" }
        });

        taskDetails.Add(new KanbanModel()
        {
            Title = "Kanban Feature",
            Id = "25678",
            Description = "Provide drag and drop support",
            Category = "In Progress",
            IndicatorColorKey = "Low",
            Tags = new List<string>() { "New control" }
        });

        taskDetails.Add(new KanbanModel()
        {
            Title = "New Feature",
            Id = "29574",
            Description = "Dragging events support for Kanban",
            Category = "In Progress",
            IndicatorColorKey = "Normal",
            Tags = new List<string>() { "New Control" }
        });

        taskDetails.Add(new KanbanModel()
        {
            Title = "WF Issue",
            Id = "1254",
            Description = "HorizontalAlignment for tooltip is not working",
            Category = "Done",
            IndicatorColorKey = "High",
            Tags = new List<string>() { "Bug fixing" }
        });

        return taskDetails;
    }
}
```

### Step 2: Bind ItemsSource

**XAML:**
```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding TaskDetails}">
    <kanban:SfKanban.DataContext>
        <local:ViewModel/>
    </kanban:SfKanban.DataContext>
</kanban:SfKanban>
```

**C#:**
```csharp
kanban.ItemsSource = new ViewModel().TaskDetails;
```

### Step 3: Define Indicator Colors

Map `IndicatorColorKey` values to actual colors:

**XAML:**
```xml
<kanban:SfKanban.IndicatorColorPalette>
    <kanban:KanbanColorMapping Key="Low" Color="Blue"/>
    <kanban:KanbanColorMapping Key="Normal" Color="Green"/>
    <kanban:KanbanColorMapping Key="High" Color="Red"/>
</kanban:SfKanban.IndicatorColorPalette>
```

**C#:**
```csharp
List<KanbanColorMapping> indicatorColorPalette = new List<KanbanColorMapping>();
indicatorColorPalette.Add(new KanbanColorMapping() { Key="Low", Color = Colors.Blue });
indicatorColorPalette.Add(new KanbanColorMapping() { Key= "Normal", Color = Colors.Green });
indicatorColorPalette.Add(new KanbanColorMapping() { Key= "High", Color = Colors.Red });
kanban.IndicatorColorPalette = indicatorColorPalette;
```

## Defining Columns

Columns can be generated automatically or defined manually.

### Auto-Generate Columns

Columns are created automatically from unique `Category` values:

```xml
<kanban:SfKanban x:Name="kanban"
                 AutoGenerateColumns="True"
                 ItemsSource="{Binding TaskDetails}">
</kanban:SfKanban>
```

**Result:** Columns created for each unique Category value ("Open", "In Progress", "Done")

### Manual Column Definition

For custom column headers and control:

**XAML:**
```xml
<kanban:SfKanban x:Name="kanban"
                 AutoGenerateColumns="False" 
                 ItemsSource="{Binding TaskDetails}">
    <kanban:KanbanColumn HeaderText="To Do" Categories="Open" />
    <kanban:KanbanColumn HeaderText="In Progress" Categories="In Progress" />
    <kanban:KanbanColumn HeaderText="Done" Categories="Done" />
</kanban:SfKanban>
```

**C#:**
```csharp
kanban.AutoGenerateColumns = false;
kanban.ItemsSource = new ViewModel().TaskDetails;
kanban.Columns.Add(new KanbanColumn() { HeaderText = "To Do", Categories = "Open" });
kanban.Columns.Add(new KanbanColumn() { HeaderText = "In Progress", Categories = "In Progress" });
kanban.Columns.Add(new KanbanColumn() { HeaderText = "Done", Categories = "Done" });
```

**Key Points:**
- `HeaderText` sets column display name
- `Categories` maps data Category values to column (comma-separated for multiple)
- Cards appear in column matching their Category value

## Creating Custom Model with Data Mapping

### When to Use

Use custom models when:
- You have existing data structures
- Need additional properties beyond KanbanModel
- Want custom business logic in model

**Important:** Custom models require defining `CardTemplate` since default UI requires KanbanModel.

### Step 1: Create Custom Model

```csharp
public class TaskDetails
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }  // Will map to Category
    public string Priority { get; set; }
}
```

### Step 2: Create ViewModel

```csharp
public class ViewModel
{
    public ObservableCollection<TaskDetails> TaskDetails { get; set; }
    
    public ViewModel()
    {
        TaskDetails = GetTaskDetails();
    }

    private ObservableCollection<TaskDetails> GetTaskDetails()
    {
        var taskDetails = new ObservableCollection<TaskDetails>();

        taskDetails.Add(new TaskDetails()
        {
            Title = "UWP Issue",
            Description = "Crosshair label template not visible in UWP",
            Status = "Open",
            Priority = "High"
        });

        taskDetails.Add(new TaskDetails()
        {
            Title = "Kanban Feature",
            Description = "Provide drag and drop support",
            Status = "In Progress",
            Priority = "Low"
        });

        taskDetails.Add(new TaskDetails()
        {
            Title = "New Feature",
            Description = "Dragging events support for Kanban",
            Status = "Done",
            Priority = "Normal"
        });

        return taskDetails;
    }
}
```

### Step 3: Map Column Property

Use `ColumnMappingPath` to specify which property determines column assignment:

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding TaskDetails}"
                 ColumnMappingPath="Status">
```

**Default:** If not specified, uses "Category" property

### Step 4: Define CardTemplate (Required)

**XAML:**
```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding TaskDetails}"
                 ColumnMappingPath="Status">
    <kanban:SfKanban.CardTemplate>
        <DataTemplate>
            <Border BorderBrush="Black"
                    BorderThickness="1"
                    CornerRadius="3"
                    Background="#F3CFCE">
                <StackPanel Margin="10">
                    <TextBlock Text="{Binding Title}"
                               TextAlignment="Center"
                               FontWeight="Bold"
                               FontSize="14" />
                    <TextBlock Text="{Binding Description}"
                               TextAlignment="Center"
                               FontSize="12"
                               TextWrapping="Wrap"
                               Margin="5" />
                    <TextBlock Text="{Binding Priority}"
                               TextAlignment="Right"
                               FontSize="10"
                               Foreground="Gray" />
                </StackPanel>
            </Border>
        </DataTemplate>
    </kanban:SfKanban.CardTemplate>
</kanban:SfKanban>
```

**DataContext:** Your custom model instance (TaskDetails in this example)

### Step 5: Define Columns

```xml
<kanban:KanbanColumn HeaderText="To Do" Categories="Open" />
<kanban:KanbanColumn HeaderText="In Progress" Categories="In Progress" />
<kanban:KanbanColumn HeaderText="Done" Categories="Done" />
```

Cards are placed in columns where `Categories` matches the value of property specified in `ColumnMappingPath`.

## Theming Support

Kanban supports automatic light and dark theme adaptation based on system settings.

### Built-in Theme Adaptation

```xml
<!-- No configuration needed - automatically adapts -->
<kanban:SfKanban ItemsSource="{Binding TaskDetails}"/>
```

**Theme Resource Files:** [Syncfusion WinUI Theme Resources](https://github.com/syncfusion/winui-controls-theme-resource-files/tree/master/Syncfusion.Kanban.WinUI)

**Reference:** [Themes for Syncfusion WinUI controls](https://help.syncfusion.com/winui/common/themes)

## Localization

Localize all static default strings in Kanban to any supported language.

### Steps to Localize

1. **Add Resource Files:** Create .resw files with translated strings
2. **Register Resources:** Use SfResourceManager to register
3. **Apply Localization:** Kanban automatically uses localized strings

**Example Resource Keys:**
- `Kanban_ColumnHeaderText`
- `Kanban_MaximumLimitMessage`
- `Kanban_MinimumLimitMessage`

**Reference:** [Localization in WinUI controls](https://help.syncfusion.com/winui/common/localization)

## RTL Support

Enable right-to-left rendering for RTL languages (Arabic, Hebrew, etc.):

```xml
<kanban:SfKanban FlowDirection="RightToLeft"
                 ItemsSource="{Binding TaskDetails}"/>
```

**Effect:**
- Board layout renders right-to-left
- Text alignment adjusts automatically
- Column order reverses
- Maintains all functionality

**Reference:** [Right to left in WinUI controls](https://help.syncfusion.com/winui/common/right-to-left)

## Common Patterns

### Pattern: Quick Start with Defaults

```csharp
// ViewModel
public ObservableCollection<KanbanModel> Tasks { get; set; }

// XAML
<kanban:SfKanban ItemsSource="{Binding Tasks}"/>
```

**Result:** Auto-generated columns, default card UI

### Pattern: Custom Columns with WIP Limits

```xml
<kanban:SfKanban AutoGenerateColumns="False" 
                 ItemsSource="{Binding Tasks}">
    <kanban:KanbanColumn HeaderText="Backlog" 
                         Categories="Open,New" />
    <kanban:KanbanColumn HeaderText="Active" 
                         Categories="In Progress" 
                         MaximumCount="5" />
    <kanban:KanbanColumn HeaderText="Complete" 
                         Categories="Done,Closed" />
</kanban:SfKanban>
```

**Result:** Custom headers, multiple categories per column, WIP limit on Active column

### Pattern: Custom Model with Mapping

```csharp
// Model
public class Issue
{
    public string Name { get; set; }
    public string State { get; set; }  // Maps to columns
}

// XAML
<kanban:SfKanban ColumnMappingPath="State" 
                 ItemsSource="{Binding Issues}">
    <kanban:SfKanban.CardTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding Name}"/>
        </DataTemplate>
    </kanban:SfKanban.CardTemplate>
</kanban:SfKanban>
```

## Troubleshooting

### Cards Not Appearing

**Problem:** Kanban shows columns but no cards

**Solutions:**
1. Verify ItemsSource is bound and has data
2. Check Category values in data match column Categories
3. If using custom model, ensure CardTemplate is defined
4. Verify ColumnMappingPath matches your model property name

### Columns Not Generating

**Problem:** No columns visible

**Solutions:**
1. Check AutoGenerateColumns is true OR Columns are manually added
2. Verify data has Category property with values
3. Check DataContext is set correctly
4. Ensure namespaces are imported correctly

### Theme Not Applied

**Problem:** Kanban doesn't match system theme

**Solutions:**
1. Verify theme resources are merged in App.xaml
2. Check theme resource URI is correct
3. Restart application after adding theme resources
4. Ensure Syncfusion.Themes.WinUI package is installed

### License Key Error

**Problem:** "License key not registered" error

**Solutions:**
1. Register license in App.xaml.cs before InitializeComponent()
2. Verify license key is valid and not expired
3. Check license is registered before any Syncfusion control is created
4. Get license key from Syncfusion account

## Next Steps

- **Cards Configuration:** [cards.md](cards.md) - Customize card appearance and properties
- **Columns Management:** [columns.md](columns.md) - Advanced column features
- **Swim Lanes:** [swimlanes.md](swimlanes.md) - Group cards by categories
- **Workflows:** [workflows.md](workflows.md) - Define card transition rules