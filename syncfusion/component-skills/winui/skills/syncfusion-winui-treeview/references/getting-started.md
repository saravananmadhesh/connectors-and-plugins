# Getting Started with WinUI TreeView

This guide covers the essential steps to add and configure the Syncfusion WinUI TreeView control in your Windows App SDK application.

## Prerequisites

Before starting, ensure you have:
- **Visual Studio 2022** or later
- **Windows App SDK 1.0** or later installed
- **.NET 6.0** or later
- **WinUI 3 project** (Desktop app)

## Installation

### Step 1: Install NuGet Package

Install the Syncfusion TreeView package via NuGet:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.TreeView.WinUI
```

**Or using .NET CLI:**
```bash
dotnet add package Syncfusion.TreeView.WinUI
```

**Or using Visual Studio:**
1. Right-click your project → **Manage NuGet Packages**
2. Search for `Syncfusion.TreeView.WinUI`
3. Click **Install**

The package automatically includes required dependencies:
- `Syncfusion.Core.WinUI`
- `Syncfusion.Data.WinUI`

### Step 2: Register Syncfusion License

Add your license key in `App.xaml.cs` before any UI initialization:

```csharp
using Microsoft.UI.Xaml;
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        // Register Syncfusion license FIRST
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        this.InitializeComponent();
    }
}
```

**Get a license key:**
- **Free Community License:** https://www.syncfusion.com/products/communitylicense
- **30-day Trial:** Automatic during trial period
- **Commercial License:** From your Syncfusion account

## Basic TreeView Setup

### Step 3: Add Namespace Import

In your XAML page, add the TreeView namespace:

```xml
<Page x:Class="YourApp.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:treeView="using:Syncfusion.UI.Xaml.TreeView">
    
    <!-- TreeView goes here -->
    
</Page>
```

### Step 4: Add TreeView Control

Add the TreeView control to your page:

```xml
<Grid>
    <treeView:SfTreeView x:Name="treeView" 
                          Width="400" 
                          Height="500" />
</Grid>
```

### Code-Behind Initialization

Alternatively, create the TreeView in C#:

```csharp
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.TreeView;

public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        SfTreeView treeView = new SfTreeView
        {
            Width = 400,
            Height = 500
        };
        
        RootGrid.Children.Add(treeView);
    }
}
```

## Populating TreeView with Data

There are two primary modes to populate TreeView:
1. **Bound Mode** - Data binding with your models
2. **Unbound Mode** - Manual TreeViewNode creation

### Bound Mode: Basic Example

**Create a Data Model:**

```csharp
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

public class FileNode : INotifyPropertyChanged
{
    private string _name;
    private ObservableCollection<FileNode> _children;
    
    public string Name
    {
        get => _name;
        set
        {
            _name = value;
            OnPropertyChanged();
        }
    }
    
    public ObservableCollection<FileNode> Children
    {
        get => _children;
        set
        {
            _children = value;
            OnPropertyChanged();
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

**Create a ViewModel:**

```csharp
public class FileViewModel
{
    public ObservableCollection<FileNode> Files { get; set; }
    
    public FileViewModel()
    {
        Files = new ObservableCollection<FileNode>
        {
            new FileNode 
            { 
                Name = "Documents",
                Children = new ObservableCollection<FileNode>
                {
                    new FileNode { Name = "Resume.docx" },
                    new FileNode { Name = "CoverLetter.pdf" },
                    new FileNode 
                    { 
                        Name = "Projects",
                        Children = new ObservableCollection<FileNode>
                        {
                            new FileNode { Name = "Project1.docx" },
                            new FileNode { Name = "Project2.docx" }
                        }
                    }
                }
            },
            new FileNode 
            { 
                Name = "Downloads",
                Children = new ObservableCollection<FileNode>
                {
                    new FileNode { Name = "installer.exe" },
                    new FileNode { Name = "archive.zip" }
                }
            },
            new FileNode 
            { 
                Name = "Pictures",
                Children = new ObservableCollection<FileNode>
                {
                    new FileNode { Name = "photo1.jpg" },
                    new FileNode { Name = "photo2.png" }
                }
            }
        };
    }
}
```

**Bind to XAML:**

```xml
<Page xmlns:treeView="using:Syncfusion.UI.Xaml.TreeView"
      xmlns:local="using:YourApp">
    
    <Page.DataContext>
        <local:FileViewModel />
    </Page.DataContext>
    
    <Grid>
        <treeView:SfTreeView x:Name="treeView"
                              Width="400"
                              Height="500"
                              ChildPropertyName="Children"
                              ItemsSource="{Binding Files}">
            <treeView:SfTreeView.ItemTemplate>
                <DataTemplate>
                    <TextBlock Text="{Binding Name}" 
                               VerticalAlignment="Center"
                               Margin="5" />
                </DataTemplate>
            </treeView:SfTreeView.ItemTemplate>
        </treeView:SfTreeView>
    </Grid>
</Page>
```

**Key Properties Explained:**
- `ItemsSource` - Binds to your root collection
- `ChildPropertyName` - Specifies which property contains child items ("Children")
- `ItemTemplate` - Defines how each node appears

### Unbound Mode: Manual Nodes

Create nodes directly without data binding:

```xml
<treeView:SfTreeView x:Name="treeView" Width="400" Height="500">
    <treeView:SfTreeView.Nodes>
        <treeView:TreeViewNode Content="Documents" IsExpanded="True">
            <treeView:TreeViewNode.ChildNodes>
                <treeView:TreeViewNode Content="Resume.docx" />
                <treeView:TreeViewNode Content="CoverLetter.pdf" />
                <treeView:TreeViewNode Content="Projects" IsExpanded="True">
                    <treeView:TreeViewNode.ChildNodes>
                        <treeView:TreeViewNode Content="Project1.docx" />
                        <treeView:TreeViewNode Content="Project2.docx" />
                    </treeView:TreeViewNode.ChildNodes>
                </treeView:TreeViewNode>
            </treeView:TreeViewNode.ChildNodes>
        </treeView:TreeViewNode>
        <treeView:TreeViewNode Content="Downloads">
            <treeView:TreeViewNode.ChildNodes>
                <treeView:TreeViewNode Content="installer.exe" />
                <treeView:TreeViewNode Content="archive.zip" />
            </treeView:TreeViewNode.ChildNodes>
        </treeView:TreeViewNode>
        <treeView:TreeViewNode Content="Pictures">
            <treeView:TreeViewNode.ChildNodes>
                <treeView:TreeViewNode Content="photo1.jpg" />
                <treeView:TreeViewNode Content="photo2.png" />
            </treeView:TreeViewNode.ChildNodes>
        </treeView:TreeViewNode>
    </treeView:SfTreeView.Nodes>
</treeView:SfTreeView>
```

**Or in C#:**

```csharp
var documentsNode = new TreeViewNode 
{ 
    Content = "Documents", 
    IsExpanded = true 
};
documentsNode.ChildNodes.Add(new TreeViewNode { Content = "Resume.docx" });
documentsNode.ChildNodes.Add(new TreeViewNode { Content = "CoverLetter.pdf" });

var downloadsNode = new TreeViewNode 
{ 
    Content = "Downloads" 
};
downloadsNode.ChildNodes.Add(new TreeViewNode { Content = "installer.exe" });

treeView.Nodes.Add(documentsNode);
treeView.Nodes.Add(downloadsNode);
```

## Adding Icons to Nodes

Enhance your TreeView with icons:

```xml
<treeView:SfTreeView ItemsSource="{Binding Files}"
                      ChildPropertyName="Children">
    <treeView:SfTreeView.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon Glyph="&#xE8B7;" 
                          FontSize="16" 
                          Margin="0,0,8,0" />
                <TextBlock Text="{Binding Name}" 
                           VerticalAlignment="Center" />
            </StackPanel>
        </DataTemplate>
    </treeView:SfTreeView.ItemTemplate>
</treeView:SfTreeView>
```

**Using different icons based on node type:**

```csharp
// Add IsFolder property to FileNode
public bool IsFolder { get; set; }

// Update model
new FileNode { Name = "Documents", IsFolder = true, Children = ... }
```

```xml
<treeView:SfTreeView.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal">
            <FontIcon Glyph="{Binding IsFolder, Converter={StaticResource FolderIconConverter}}" 
                      FontSize="16" 
                      Margin="0,0,8,0" />
            <TextBlock Text="{Binding Name}" />
        </StackPanel>
    </DataTemplate>
</treeView:SfTreeView.ItemTemplate>
```

## Handling Basic Events

Subscribe to common events:

```xml
<treeView:SfTreeView ItemTapped="OnItemTapped"
                      SelectionChanged="OnSelectionChanged"
                      NodeExpanding="OnNodeExpanding" />
```

```csharp
private void OnItemTapped(object sender, ItemTappedEventArgs e)
{
    var tappedNode = e.Node;
    var tappedItem = tappedNode.Content; // Your data model
    
    // Handle tap
}

private void OnSelectionChanged(object sender, ItemSelectionChangedEventArgs e)
{
    var selectedItems = (sender as SfTreeView).SelectedItems;
    // Handle selection change
}

private void OnNodeExpanding(object sender, NodeExpandingEventArgs e)
{
    // Load data on demand
    // e.Cancel = true; // Cancel expansion if needed
}
```

## Common Initial Configuration

### Auto-expand nodes on load

```xml
<treeView:SfTreeView AutoExpandMode="AllNodes" />
```

Options:
- `None` - No auto-expansion (default)
- `AllNodes` - Expand all nodes
- `RootNodes` - Expand only root level

### Enable node selection

```xml
<treeView:SfTreeView SelectionMode="Single" />
```

Options:
- `None` - No selection
- `Single` - Single selection (default)
- `SingleDeselect` - Click to deselect
- `Multiple` - Multiple selection
- `Extended` - Multiple with Ctrl/Shift

### Enable animations

```xml
<treeView:SfTreeView IsAnimationEnabled="True" />
```

## Complete Minimal Example

Here's a complete working example you can copy-paste:

**MainPage.xaml:**
```xml
<Page x:Class="TreeViewApp.MainPage"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:treeView="using:Syncfusion.UI.Xaml.TreeView"
      xmlns:local="using:TreeViewApp">
    
    <Page.DataContext>
        <local:SimpleViewModel />
    </Page.DataContext>
    
    <Grid Padding="20">
        <treeView:SfTreeView ItemsSource="{Binding Items}"
                              ChildPropertyName="Children"
                              AutoExpandMode="RootNodes"
                              SelectionMode="Single">
            <treeView:SfTreeView.ItemTemplate>
                <DataTemplate>
                    <TextBlock Text="{Binding Name}" Margin="5" />
                </DataTemplate>
            </treeView:SfTreeView.ItemTemplate>
        </treeView:SfTreeView>
    </Grid>
</Page>
```

**SimpleViewModel.cs:**
```csharp
using System.Collections.ObjectModel;

namespace TreeViewApp
{
    public class SimpleViewModel
    {
        public ObservableCollection<Item> Items { get; set; }
        
        public SimpleViewModel()
        {
            Items = new ObservableCollection<Item>
            {
                new Item 
                { 
                    Name = "Item 1",
                    Children = new ObservableCollection<Item>
                    {
                        new Item { Name = "Child 1.1" },
                        new Item { Name = "Child 1.2" }
                    }
                },
                new Item { Name = "Item 2" },
                new Item { Name = "Item 3" }
            };
        }
    }
    
    public class Item
    {
        public string Name { get; set; }
        public ObservableCollection<Item> Children { get; set; }
    }
}
```

## Troubleshooting

### TreeView not appearing
- Verify NuGet package is installed
- Check that license is registered in App.xaml.cs
- Ensure TreeView has Width and Height set

### Nodes not expanding
- Verify `ChildPropertyName` matches your property name exactly (case-sensitive)
- Ensure child collection is initialized (not null)

### Data not updating
- Implement `INotifyPropertyChanged` on your data models
- Use `ObservableCollection<T>` for collections

### License watermark showing
- Register your license key in App.xaml.cs before InitializeComponent()
- Ensure license key is valid and not expired

## Next Steps

Now that you have a basic TreeView, explore advanced features:
- **Data Binding** - Complex hierarchies and HierarchyPropertyDescriptors
- **Selection** - Multiple selection modes and programmatic selection
- **Editing** - Inline editing with custom templates
- **Drag-Drop** - Node reordering and manipulation
- **Customization** - Styling, themes, and templates

Refer to other reference documentation for detailed guidance on each feature.
