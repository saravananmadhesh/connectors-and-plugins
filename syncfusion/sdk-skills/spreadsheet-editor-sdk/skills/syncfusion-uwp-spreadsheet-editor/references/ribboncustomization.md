# Ribbon Customization — UWP Spreadsheet

> Learn how to customize the ribbon UI in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control by adding, modifying, or removing ribbon tabs and items.

---

## Overview

SfSpreadsheet provides a built-in ribbon (`SfSpreadsheetRibbon`) similar to Microsoft Excel. You can customize the ribbon to suit application-specific requirements. Ribbon customization can be achieved in two ways:

1. **Using Control Templates** – Override the default template of `SfSpreadsheetRibbon`.
2. **Using Events** – Dynamically add or remove ribbon tabs and items during runtime.

---

## Using SfSpreadsheetRibbon

Bind the `SfSpreadsheetRibbon` to the `SfSpreadsheet` control using the `DataContext`.

```xaml
<syncfusion:SfSpreadsheetRibbon x:Name="ribbon" DataContext="{Binding ElementName=spreadsheet}" />
```

---

## Add a Custom Ribbon Tab

You can create a new ribbon tab and add custom buttons when the ribbon is loaded.

```csharp
// Namespace
using Syncfusion.UI.Xaml.Controls.SfRibbon;
using Syncfusion.UI.Xaml.Grid.Utility;

ribbon.Loaded += ribbon_Loaded;

void ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var sfRibbon = GridUtil.GetVisualChild<SfRibbon>(sender as FrameworkElement);
    if (sfRibbon != null)
    {
        SfRibbonTab ribbonTab = new SfRibbonTab();
        ribbonTab.Caption = "OTHER";

        SfRibbonButton button1 = new SfRibbonButton();
        button1.Label = "PRINT";
        button1.SizeMode = SizeMode.Large;
        button1.Click += Button1_Click;

        SfRibbonButton button2 = new SfRibbonButton();
        button2.Label = "PRINT PREVIEW";
        button2.SizeMode = SizeMode.Large;

        SfRibbonBar ribbonBar = new SfRibbonBar();
        ribbonBar.Header = "Printing Options";
        ribbonBar.Items.Add(button1);
        ribbonBar.Items.Add(button2);

        ribbonTab.Items.Add(ribbonBar);
        sfRibbon.Items.Add(ribbonTab);
    }
}
```

---

## Add Items to an Existing Ribbon Tab

Custom ribbon items can also be added to predefined tabs, such as the **View** tab.

```csharp
// Namespace
using Syncfusion.UI.Xaml.Controls.SfRibbon;
using Syncfusion.UI.Xaml.Grid.Utility;


ribbon.Loaded += ribbon_Loaded;

void ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var sfRibbon = GridUtil.GetVisualChild<SfRibbon>(sender as FrameworkElement);
    if (sfRibbon != null)
    {
        var ribbonTab = sfRibbon.Items[2] as SfRibbonTab;

        SfRibbonButton button = new SfRibbonButton();
        button.Label = "PRINT";

        ribbonTab.Items.Add(button);
    }
}
```

---

## Remove a Ribbon Tab

Ribbon tabs can be removed programmatically during runtime.

```csharp
// Namespace
using Syncfusion.UI.Xaml.Controls.SfRibbon;
using Syncfusion.UI.Xaml.Grid.Utility;

ribbon.Loaded += ribbon_Loaded;

void ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var sfRibbon = GridUtil.GetVisualChild<SfRibbon>(sender as FrameworkElement);
    if (sfRibbon != null)
    {
        // Removes the second tab (for example, Data tab)
        var item = sfRibbon.Items[1];
        sfRibbon.Items.Remove(item);
    }
}
```

---

## Remove Ribbon Items from a Tab

Individual ribbon items can also be removed from a ribbon tab.

```csharp
// Namespace
using Syncfusion.UI.Xaml.Controls.SfRibbon;
using Syncfusion.UI.Xaml.Grid.Utility;

ribbon.Loaded += ribbon_Loaded;

void ribbon_Loaded(object sender, RoutedEventArgs e)
{
    var sfRibbon = GridUtil.GetVisualChild<SfRibbon>(sender as FrameworkElement);
    if (sfRibbon != null)
    {
        var ribbonTab = sfRibbon.Items[0] as SfRibbonTab;
        // Remove the first ribbon item in the tab
        ribbonTab.Items.RemoveAt(0);
    }
}
```

---

## Notes

- Ribbon customization should be done inside the `Loaded` event.
- Always retrieve `SfRibbon` using `GridUtil.GetVisualChild<T>()`.
- Index-based access (`Items[n]`) depends on the default ribbon layout.

---

