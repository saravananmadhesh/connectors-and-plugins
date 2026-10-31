# Ribbon Customization

> Add, remove, and customize ribbon tabs and items in WPF Spreadsheet (SfSpreadsheetRibbon) — using events, control templates, and command cancellation.

---

## Overview

Ribbon customization can be done in two ways:
1. **Using Control Template** – Override the `SfSpreadsheetRibbon` template for full visual control.
2. **Using the `Loaded` Event** – Add or remove ribbon tabs/items at runtime.

---

## Add a New Ribbon Tab

### Minimal Code

```xml
<syncfusion:SfSpreadsheetRibbon x:Name="ribbon" DataContext="{Binding ElementName=spreadsheet}" />
```
```csharp
// To add custom ribbon tab in the spreadsheet ribbon
ribbon.Loaded += Ribbon_Loaded;

void Ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var ribbon1 = GridUtil.GetVisualChild<Ribbon>(sender as FrameworkElement);
    if (ribbon1 != null)
    {
        RibbonTab tab = new RibbonTab();
        tab.Caption = "CUSTOM";
        ribbon1.Items.Add(tab);
    }
}
```

### With Buttons
```csharp
// To add ribbon bar and ribbon buttons within ribbon tab in SpreadsheetRibbon
void Ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var ribbon1 = GridUtil.GetVisualChild<Ribbon>(sender as FrameworkElement);
    if (ribbon1 != null)
    {
        // Create tab
        RibbonTab ribbonTab = new RibbonTab();
        ribbonTab.Caption = "OTHER";

        // Create buttons
        RibbonButton btn1 = new RibbonButton();
        btn1.Label = "PRINT";
        btn1.SmallIcon = new BitmapImage(new Uri("/Icons/Print.png", UriKind.Relative));
        

        RibbonButton btn2 = new RibbonButton();
        btn2.Label = "PRINT PREVIEW";
        btn2.SmallIcon = new BitmapImage(new Uri("/Icons/Print.png", UriKind.Relative));
        

        // Create bar and add buttons
        RibbonBar bar = new RibbonBar();
        bar.Header = "Printing Options";
        bar.IsLauncherButtonVisible = false;
        bar.Items.Add(btn1);
        bar.Items.Add(btn2);

        ribbonTab.Items.Add(bar);
        ribbon1.Items.Add(ribbonTab);
    }
}
```

---

## Add Items to an Existing Ribbon Tab

```csharp
// To add ribbon Items like ribbon button to existion ribbon tab in the SpreadsheetRibbon
ribbon.Loaded += ribbon_Loaded;
void Ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var ribbon1 = GridUtil.GetVisualChild<Ribbon>(sender as FrameworkElement);
    if (ribbon1 != null)
    {
        // Access the View tab (index 2)
        var ribbonTab = ribbon1.Items[2] as RibbonTab;

        RibbonButton btn = new RibbonButton();
        btn.Label = "PRINT";
        btn.SmallIcon = new BitmapImage(new Uri("/Icons/Print.png", UriKind.Relative));
        

        ribbonTab.Items.Add(btn);
    }
}
```

---

## Remove a Ribbon Tab

```csharp
// To remove the ribbon tab in the SfSpreadsheetRibbon
ribbon.Loaded += ribbon_Loaded;
void Ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var ribbon1 = GridUtil.GetVisualChild<Ribbon>(sender as FrameworkElement);
    if (ribbon1 != null)
    {
        // Remove the Data tab (index 1)
        var item = ribbon1.Items[1];
        ribbon1.Items.Remove(item);
    }
}
```

---

## Remove Items from a Ribbon Tab

```csharp
// To remove the ribbon menu items in the ribbon tab of SfSpreadsheetRibbon
ribbon.Loaded += ribbon_Loaded;
void Ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var ribbon1 = GridUtil.GetVisualChild<Ribbon>(sender as FrameworkElement);
    if (ribbon1 != null)
    {
        // Remove the Freeze Panes group from the View tab
        var ribbonTab = ribbon1.Items[2] as RibbonTab;
        ribbonTab.Items.Remove(ribbonTab.Items[1]);
    }
}
```

---

## Cancel a Ribbon Command

```csharp
// To cancel particular action of Spreadsheetribbon commands.
// Attach event
this.ribbon.Commands.CommandExecuting += Commands_CommandExecuting;

void Commands_CommandExecuting(object sender, CommandExecutingEventArgs args)
{
    // Cancel the Copy command
    if (args.CommandName == "Copy")
    {
        args.cancel = true;
    }
}
```

### Common Cancellable Command Names
```
"Copy"   "Cut"   "Paste"   "Undo"   "Redo"
"Bold"   "Italic"   "Underline"   "MergeCell"
```

---

## Bind Ribbon to Spreadsheet (XAML)

```xml
<syncfusion:SfSpreadsheetRibbon
    x:Name="ribbon"
    DataContext="{Binding ElementName=spreadsheet}" />
```

---

## References
- [Ribbon Customization Documentation](https://help.syncfusion.com/wpf/spreadsheet/ribbon-customization)
