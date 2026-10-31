# Localization

> Localize static text in ribbon and dialogs to any language in WPF Spreadsheet control.

---

## Overview

Supports translating all UI elements and dialogs to the desired language for global users.

---

## Key Features
- Localize ribbon, dialogs, and messages
- Support for multiple languages
- Easy integration with resource files

---

## Example

Provide resource files for different languages to localize the spreadsheet UI.

## Set Current UI Culture to the Application
```csharp
// To set the CultureInformation in the Application, set the CurrentUICulture before the InitializeComponent() method is called.
public MainWindow()
{
    System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo("ja-JP");
    InitializeComponent();
}
```
## Localize when the resource file is present in a different assembly or different namespace
```csharp
// WPF-Spreadsheet (SfSpreadsheet) reads the localization resource files based on the assembly name from its default namespace.
// If you have the localization resource file other than the executing assembly (Assembly.GetExecutingAssembly())
// or other than the default namespace, then you have to pass the assembly having the resource file and its default namespace to GridResourceWrapper.SetResources method.
public MainWindow()
 {
      System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo("ja");
      Assembly assembly = Assembly.Load("Another assemblyname having resource file");
      Syncfusion.UI.Xaml.Spreadsheet.Resources.GridResourceWrapper.SetResources(assembly, "namespacename");
      InitializeComponent();
 }
```

---

## References
- [Localization Documentation](https://help.syncfusion.com/wpf/spreadsheet/localization)
