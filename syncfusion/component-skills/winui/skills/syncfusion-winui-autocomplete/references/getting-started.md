# Getting Started with AutoComplete

This guide covers the essential steps to install, configure, and implement the Syncfusion WinUI AutoComplete (`SfAutoComplete`) control in your WinUI 3 application.

## Installation

### Step 1: Install NuGet Package

Install the `Syncfusion.Editors.WinUI` NuGet package in your WinUI 3 project.

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**NuGet Package Manager:**
- Right-click on your project → Manage NuGet Packages
- Search for "Syncfusion.Editors.WinUI"
- Install the package

### Step 2: Import Namespace

Add the namespace to your XAML or C# files:

**XAML:**
```xaml
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Editors;
```

## Creating AutoComplete Control

### Basic Control Creation

**XAML:**
```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    <Grid Name="grid">
        <editors:SfAutoComplete Name="autoComplete" 
                                Width="250"
                                PlaceholderText="Type to search..."/>
    </Grid>
</Window>
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Editors;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();

            // Creating an instance of the AutoComplete control
            SfAutoComplete autoComplete = new SfAutoComplete();
            autoComplete.Width = 250;
            autoComplete.PlaceholderText = "Type to search...";
            grid.Children.Add(autoComplete);
        }
    }
}
```

## Data Binding

### Step 1: Create Model Class

Create a model class with the properties you want to display:

```csharp
// Model.cs
public class SocialMedia
{
    public string Name { get; set; }
    public int ID { get; set; }
}
```

### Step 2: Create ViewModel

Populate the data collection in a ViewModel:

```csharp
// ViewModel.cs
public class SocialMediaViewModel
{
    public ObservableCollection<SocialMedia> SocialMedias { get; set; }
    
    public SocialMediaViewModel()
    {
        this.SocialMedias = new ObservableCollection<SocialMedia>();
        this.SocialMedias.Add(new SocialMedia() { Name = "Facebook", ID = 0 });
        this.SocialMedias.Add(new SocialMedia() { Name = "Google Plus", ID = 1 });
        this.SocialMedias.Add(new SocialMedia() { Name = "Instagram", ID = 2 });
        this.SocialMedias.Add(new SocialMedia() { Name = "LinkedIn", ID = 3 });
        this.SocialMedias.Add(new SocialMedia() { Name = "Skype", ID = 4 });
        this.SocialMedias.Add(new SocialMedia() { Name = "Telegram", ID = 5 });
        this.SocialMedias.Add(new SocialMedia() { Name = "Twitter", ID = 6 });
        this.SocialMedias.Add(new SocialMedia() { Name = "WhatsApp", ID = 7 });
        this.SocialMedias.Add(new SocialMedia() { Name = "YouTube", ID = 8 });
    }
}
```

### Step 3: Bind ItemsSource

Bind the ViewModel collection to the `ItemsSource` property:

**XAML:**
```xaml
<Window
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    xmlns:local="using:GettingStarted">
    <Grid Name="grid">
        <Grid.DataContext>
            <local:SocialMediaViewModel />
        </Grid.DataContext>

        <editors:SfAutoComplete x:Name="autoComplete" 
                                Width="250"
                                ItemsSource="{Binding SocialMedias}" />
    </Grid>
</Window>
```

**C#:**
```csharp
autoComplete.DataContext = new SocialMediaViewModel();
autoComplete.ItemsSource = (autoComplete.DataContext as SocialMediaViewModel).SocialMedias;
```

## Configuring Member Paths

When binding complex objects, specify which properties to use for display and text:

### TextMemberPath

Specifies the property used for searching and displaying in the selection box:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        ItemsSource="{Binding SocialMedias}"
                        TextMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.TextMemberPath = "Name";
```

### DisplayMemberPath

Specifies the property displayed in the dropdown list:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        Width="250" />
```

```csharp
autoComplete.DisplayMemberPath = "Name";
```

### Using Both Together

**Best practice:** Set both for consistent display:

```xaml
<editors:SfAutoComplete x:Name="autoComplete"
                        Width="250"
                        ItemsSource="{Binding SocialMedias}"
                        DisplayMemberPath="Name"
                        TextMemberPath="Name"
                        PlaceholderText="Select a social media" />
```

**Behavior:**
- `DisplayMemberPath` → What shows in dropdown suggestions
- `TextMemberPath` → What shows in selection box after selection

## Complete Working Example

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    
    <Grid>
        <Grid.DataContext>
            <local:SocialMediaViewModel />
        </Grid.DataContext>

        <editors:SfAutoComplete x:Name="autoComplete"
                                Width="300"
                                PlaceholderText="Search social media..."
                                ItemsSource="{Binding SocialMedias}"
                                DisplayMemberPath="Name"
                                TextMemberPath="Name"
                                TextSearchMode="Contains" />
    </Grid>
</Window>
```

## Key Properties Summary

| Property | Description | Default |
|----------|-------------|---------|
| `ItemsSource` | Collection of items to display | `null` |
| `DisplayMemberPath` | Property path for dropdown display | `string.Empty` |
| `TextMemberPath` | Property path for selection box | `string.Empty` |
| `PlaceholderText` | Watermark text when empty | `string.Empty` |
| `TextSearchMode` | Filtering mode (StartsWith/Contains) | `StartsWith` |
| `SelectionMode` | Single or Multiple selection | `Single` |
| `Width` | Control width | `Auto` |

## Important Notes

**When to set member paths:**
- Required when binding complex objects (classes with multiple properties)
- Not needed for simple string collections
- If `TextMemberPath` is empty, searching uses `DisplayMemberPath`

**Default behavior:**
- If both member paths are empty with complex objects, displays class name with namespace
- For string collections, no member path needed

## Next Steps

- **Selection:** Learn about single/multiple selection modes → [selection.md](selection.md)
- **Filtering:** Configure search and filter behavior → [searching-filtering.md](searching-filtering.md)
- **Customization:** Customize templates and appearance → [ui-customization.md](ui-customization.md)
