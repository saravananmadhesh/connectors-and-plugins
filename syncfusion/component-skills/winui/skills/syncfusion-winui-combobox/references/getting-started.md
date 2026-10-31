# Getting Started with WinUI ComboBox

This guide covers the installation, basic setup, and fundamental usage patterns for the Syncfusion WinUI ComboBox control.

## Installation

### Step 1: Install NuGet Package

Install the Syncfusion Editors package that contains the ComboBox control:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**NuGet Package Manager UI:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Editors.WinUI"
3. Click Install

**Package Reference (.csproj):**
```xml
<PackageReference Include="Syncfusion.Editors.WinUI" Version="*" />
```

### Step 2: Register Syncfusion License

Add license registration in `App.xaml.cs` **before** `InitializeComponent()`:

```csharp
using Syncfusion.Licensing;

public App()
{
    // Register Syncfusion license key
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    this.InitializeComponent();
}
```

**Get License Key:**
- Free Community License: https://www.syncfusion.com/sales/communitylicense
- Trial License: https://www.syncfusion.com/downloads
- Commercial License: Contact Syncfusion sales

## Basic Implementation

### Import Namespace

Add the Syncfusion namespace to your XAML file:

```xaml
<Window
    x:Class="YourApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    
    <!-- Your content here -->
</Window>
```

### Create Basic ComboBox

**XAML:**
```xaml
<editors:SfComboBox x:Name="comboBox"
                    Width="250"
                    Height="40" />
```

**C# Code-Behind:**
```csharp
using Syncfusion.UI.Xaml.Editors;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Create ComboBox programmatically
        SfComboBox comboBox = new SfComboBox
        {
            Width = 250,
            Height = 40
        };
        
        // Add to layout
        rootGrid.Children.Add(comboBox);
    }
}
```

## Populating Items

### Method 1: Using SfComboBoxItem (Static Items)

Add items directly in XAML using `SfComboBoxItem`:

```xaml
<editors:SfComboBox x:Name="comboBox" 
                    Width="250"
                    PlaceholderText="Select a sport">
    <editors:SfComboBoxItem Content="Badminton" />
    <editors:SfComboBoxItem Content="Cricket" />
    <editors:SfComboBoxItem Content="Football" />
    <editors:SfComboBoxItem Content="Golf" />
    <editors:SfComboBoxItem Content="Hockey" />
    <editors:SfComboBoxItem Content="Tennis" />
</editors:SfComboBox>
```

**Adding items in code:**
```csharp
SfComboBox comboBox = new SfComboBox { Width = 250 };

comboBox.Items.Add(new SfComboBoxItem { Content = "Badminton" });
comboBox.Items.Add(new SfComboBoxItem { Content = "Cricket" });
comboBox.Items.Add(new SfComboBoxItem { Content = "Football" });
comboBox.Items.Add(new SfComboBoxItem { Content = "Golf" });
comboBox.Items.Add(new SfComboBoxItem { Content = "Hockey" });

this.Content = comboBox;
```

**When to use:** Best for small, fixed lists that don't change (e.g., months, days of week).

### Method 2: Data Binding with ItemsSource (Dynamic Data)

Bind to a collection for dynamic, data-driven scenarios.

#### Step 1: Create Model Class

```csharp
// Model.cs
public class SocialMedia
{
    public string Name { get; set; }
    public int ID { get; set; }
    public string IconUrl { get; set; }
}
```

#### Step 2: Create ViewModel

```csharp
// ViewModel.cs
using System.Collections.ObjectModel;

public class SocialMediaViewModel
{
    public ObservableCollection<SocialMedia> SocialMedias { get; set; }
    
    public SocialMediaViewModel()
    {
        SocialMedias = new ObservableCollection<SocialMedia>
        {
            new SocialMedia { Name = "Facebook", ID = 0 },
            new SocialMedia { Name = "Google Plus", ID = 1 },
            new SocialMedia { Name = "Instagram", ID = 2 },
            new SocialMedia { Name = "LinkedIn", ID = 3 },
            new SocialMedia { Name = "Skype", ID = 4 },
            new SocialMedia { Name = "Telegram", ID = 5 },
            new SocialMedia { Name = "Twitter", ID = 10 },
            new SocialMedia { Name = "WhatsApp", ID = 12 },
            new SocialMedia { Name = "YouTube", ID = 13 }
        };
    }
}
```

#### Step 3: Bind to ComboBox

**XAML with DataContext:**
```xaml
<Window xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
        xmlns:local="using:YourApp">
    <Grid>
        <Grid.DataContext>
            <local:SocialMediaViewModel />
        </Grid.DataContext>
        
        <editors:SfComboBox x:Name="comboBox" 
                            Width="250"
                            PlaceholderText="Select a social media"
                            ItemsSource="{Binding SocialMedias}" />
    </Grid>
</Window>
```

**Code-Behind Binding:**
```csharp
public MainWindow()
{
    this.InitializeComponent();
    
    // Set DataContext
    comboBox.DataContext = new SocialMediaViewModel();
    
    // Bind ItemsSource
    SocialMediaViewModel viewModel = comboBox.DataContext as SocialMediaViewModel;
    comboBox.ItemsSource = viewModel.SocialMedias;
}
```

**When to use:** Best for data from databases, APIs, or collections that may change.

## Display Configuration

### Setting DisplayMemberPath and TextMemberPath

When binding to complex objects, specify which properties to display:

- **DisplayMemberPath:** Property shown in dropdown list items
- **TextMemberPath:** Property shown in selection box after selection

```xaml
<editors:SfComboBox ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name"
                    PlaceholderText="Select a social media" />
```

**In Code:**
```csharp
comboBox.DisplayMemberPath = "Name";
comboBox.TextMemberPath = "Name";
```

**Why both properties?**
- Often they're the same (like "Name" above)
- Can differ: Display full name in list, show abbreviation in selection box
- Example: DisplayMemberPath="FullDescription", TextMemberPath="ShortCode"

### Example with Different Paths

```csharp
// Model
public class Country
{
    public string FullName { get; set; }  // "United States of America"
    public string Code { get; set; }       // "USA"
    public int Population { get; set; }
}
```

```xaml
<!-- Show full name in dropdown, code in selection box -->
<editors:SfComboBox ItemsSource="{Binding Countries}"
                    DisplayMemberPath="FullName"
                    TextMemberPath="Code" />
```

## Customizing SelectionBox UI

The `SelectionBoxItemTemplate` allows custom display of the selected item.

### Example: Show Selection Count for Multiple Selection

```xaml
<editors:SfComboBox x:Name="comboBox"
                    Width="250"
                    SelectionMode="Multiple"
                    ItemsSource="{Binding SocialMedias}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name">
    <editors:SfComboBox.SelectionBoxItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="Selected: " 
                          FontWeight="SemiBold" />
                <TextBlock Text="{Binding ElementName=comboBox, Path=SelectedItems.Count}" 
                          FontWeight="Bold"
                          Foreground="Blue" />
                <TextBlock Text=" items" 
                          Margin="4,0,0,0" />
            </StackPanel>
        </DataTemplate>
    </editors:SfComboBox.SelectionBoxItemTemplate>
</editors:SfComboBox>
```

### Example: Custom Layout with Icon

```xaml
<editors:SfComboBox ItemsSource="{Binding Users}"
                    DisplayMemberPath="FullName"
                    TextMemberPath="FullName">
    <editors:SfComboBox.SelectionBoxItemTemplate>
        <DataTemplate>
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                </Grid.ColumnDefinitions>
                
                <Ellipse Width="24" Height="24" Margin="0,0,8,0">
                    <Ellipse.Fill>
                        <ImageBrush ImageSource="{Binding AvatarUrl}" />
                    </Ellipse.Fill>
                </Ellipse>
                
                <TextBlock Grid.Column="1" 
                          Text="{Binding FullName}"
                          VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfComboBox.SelectionBoxItemTemplate>
</editors:SfComboBox>
```

**Important Note:** `SelectionBoxItemTemplate` has no effect when `IsEditable="True"` because the selection box becomes a text input field.

## PlaceholderText (Watermark)

Display hint text when no item is selected:

```xaml
<editors:SfComboBox PlaceholderText="Choose your country"
                    ItemsSource="{Binding Countries}"
                    DisplayMemberPath="Name"
                    TextMemberPath="Name" />
```

```csharp
comboBox.PlaceholderText = "Choose your country";
```

## Complete Working Example

Here's a full working example with all components:

**MainWindow.xaml:**
```xaml
<Window
    x:Class="ComboBoxDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    xmlns:local="using:ComboBoxDemo">
    
    <Grid Padding="20">
        <Grid.DataContext>
            <local:ProductViewModel />
        </Grid.DataContext>
        
        <StackPanel Spacing="20" MaxWidth="400">
            <TextBlock Text="Product Selection Demo"
                      FontSize="24"
                      FontWeight="Bold" />
            
            <editors:SfComboBox x:Name="productComboBox"
                                PlaceholderText="Select a product"
                                ItemsSource="{Binding Products}"
                                DisplayMemberPath="Name"
                                TextMemberPath="Name"
                                SelectionChanged="OnProductSelectionChanged" />
            
            <TextBlock x:Name="selectedProductText"
                      Text="No product selected"
                      FontStyle="Italic" />
        </StackPanel>
    </Grid>
</Window>
```

**MainWindow.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Editors;

namespace ComboBoxDemo
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
        }
        
        private void OnProductSelectionChanged(object sender, ComboBoxSelectionChangedEventArgs e)
        {
            if (e.AddedItems.Count > 0)
            {
                var product = e.AddedItems[0] as Product;
                selectedProductText.Text = $"Selected: {product.Name} (${product.Price})";
            }
        }
    }
}
```

**Models and ViewModel:**
```csharp
using System.Collections.ObjectModel;

namespace ComboBoxDemo
{
    // Model
    public class Product
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
    }
    
    // ViewModel
    public class ProductViewModel
    {
        public ObservableCollection<Product> Products { get; set; }
        
        public ProductViewModel()
        {
            Products = new ObservableCollection<Product>
            {
                new Product { Name = "Laptop", Price = 999.99m, Category = "Electronics" },
                new Product { Name = "Mouse", Price = 29.99m, Category = "Electronics" },
                new Product { Name = "Keyboard", Price = 79.99m, Category = "Electronics" },
                new Product { Name = "Monitor", Price = 299.99m, Category = "Electronics" },
                new Product { Name = "Headphones", Price = 149.99m, Category = "Audio" }
            };
        }
    }
}
```

**App.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Syncfusion.Licensing;

namespace ComboBoxDemo
{
    public partial class App : Application
    {
        public App()
        {
            // Register Syncfusion license FIRST
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
            
            this.InitializeComponent();
        }

        protected override void OnLaunched(LaunchActivatedEventArgs args)
        {
            m_window = new MainWindow();
            m_window.Activate();
        }

        private Window m_window;
    }
}
```

## Common Gotchas

### Issue: Items Not Displaying

**Problem:** ComboBox shows empty dropdown even though ItemsSource is set.

**Solution:** Set both `DisplayMemberPath` and `TextMemberPath` when binding to complex objects:
```csharp
comboBox.DisplayMemberPath = "Name";
comboBox.TextMemberPath = "Name";
```

### Issue: License Error on Startup

**Problem:** Application shows Syncfusion license warning dialog.

**Solution:** Register license **before** `InitializeComponent()` in App.xaml.cs:
```csharp
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
this.InitializeComponent();
```

### Issue: DataContext Not Working

**Problem:** Binding shows no data even though DataContext is set.

**Solution:** Ensure DataContext is set **before** setting ItemsSource binding, or use XAML binding which resolves at runtime:
```xaml
<Grid.DataContext>
    <local:YourViewModel />
</Grid.DataContext>
<editors:SfComboBox ItemsSource="{Binding YourCollection}" />
```

### Issue: SelectionBoxItemTemplate Not Showing

**Problem:** Custom template not visible in selection box.

**Solution:** `SelectionBoxItemTemplate` doesn't work when `IsEditable="True"`. For editable mode, the selection box is a text input field.

## Next Steps

Now that you have basic ComboBox setup working, explore:
- **[Selection modes](selection.md)** - Single and multiple selection with tokens/delimiters
- **[Filtering](filtering.md)** - Enable filtering and searching as users type
- **[Editing modes](editing.md)** - Editable vs non-editable, input validation
- **[UI Customization](ui-customization.md)** - Custom templates and styling

## Summary

**Key Takeaways:**
1. Install `Syncfusion.Editors.WinUI` NuGet package
2. Register license key in App.xaml.cs before InitializeComponent()
3. Import namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`
4. Use `SfComboBoxItem` for static lists, `ItemsSource` for dynamic data
5. Set `DisplayMemberPath` and `TextMemberPath` for complex objects
6. Use `PlaceholderText` for user guidance
7. Use `ObservableCollection<T>` for collections that may change
