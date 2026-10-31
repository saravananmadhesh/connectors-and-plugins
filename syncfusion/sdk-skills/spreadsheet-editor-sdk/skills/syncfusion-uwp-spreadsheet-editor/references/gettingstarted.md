# Getting Started — UWP Spreadsheet

> Begin working with Syncfusion Spreadsheet control for UWP. Learn how to set up your project, create spreadsheets, and perform basic operations.

---

## Prerequisites and Setup Requirements

Before using the UWP Spreadsheet component, ensure the following setup is complete:

### ⭐ 1. NuGet Package Installation (MANDATORY - DO THIS FIRST)

**Without these packages, ALL code will fail to compile.**

Add to `.csproj`:
```xml
<PackageReference Include="Syncfusion.SfSpreadsheet.UWP" />
<PackageReference Include="Syncfusion.SfSpreadsheetHelper.UWP" />
```

Or use CLI:
```
dotnet add package Syncfusion.SfSpreadsheet.UWP
dotnet add package Syncfusion.SfSpreadsheetHelper.UWP
```
 
### 2. MainWindow.xaml.cs Configuration
 
 ### For add spreadhseet
 
```csharp
using Syncfusion.UI.Xaml.Spreadsheet;
```

### For CellGrid related task such as while using GridRangeInfo
```csharp
using Syncfusion.UI.Xaml.CellGrid;
```
### For Excel‑related tasks such as converting GridRange to Excel range and Excel range to GridRange and Workbookloaded event trigger
```csharp
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;
```

### For Xlsio API's like IRange, ExcelLineStyle, ExcelKnownColors
```csharp
using Syncfusion.XlsIO;
```
### For add WorksheetImpl class 
```csharp

using Syncfusion.XlsIO.Implementation;
```

### For add or accessing shapes
```csharp
using Syncfusion.XlsIO.Implementation.Shapes;
```

 
### MainPage.xaml Configuration
```xaml
xmlns:syncfusion="using:Syncfusion.UI.Xaml.Spreadsheet"
```
---

## Basic Spreadsheet Code

### Minimal Code
```xml
<syncfusion:SfSpreadsheet x:Name="spreadsheet" FormulaBarVisibility="Visible" />
```

### With Ribbon 
```xml
<Page
    x:Class="SpreadsheetDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Spreadsheet">

    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <syncfusion:SfSpreadsheetRibbon x:Name="ribbon" DataContext="{Binding ElementName=spreadsheet}" Grid.Row="0"/>

        <syncfusion:SfSpreadsheet x:Name="spreadsheet" Grid.Row="1"/>
    </Grid>
</Page>
```

## ⚠️ IMPORTANT: Code Placement Guidelines

**All codes should be placed inside the `MainPage Loaded` event**, EXCEPT when explicitly using `WorkbookLoaded` event in reference files. When `Workbook Loaded` is specified in a reference, **skip the code inside WorkbookLoaded** and place it in `MainPage Loaded` instead.

**Reason:** Placing code inside `Workbook Loaded` can cause recursive or circular events and lead to unexpected behavior. Always prefer `MainPage Loaded` unless the reference explicitly requires `Workbook Loaded`.

---



## Create a New Workbook

### ⚠️ IMPORTANT: When to Call Create()

**DO:**
- Call `Create()` in the **constructor** only (BEFORE workbook is loaded)
- Use `Create()` when explicitly creating a new empty workbook for the first time
- 

**DO NOT:**
- ❌ Call `Create()` inside the `Workbook Loaded` or `MainPage Loaded` event — this creates a circular/recursive situation
- ❌ Call `Create()` after opening an existing file — this will overwrite loaded data

### Minimal Code
```csharp
// To create a new workbook with specified number of worksheets
public MainPage()
{
  InitializeComponent();
  spreadsheet.Create(1);
}
```

### With Multiple Sheets
```csharp
// To Create a new workbook with 3 worksheets 
public MainPage()
{
  InitializeComponent();
  spreadsheet.Create(3);
}
```
---

## Open an Existing Workbook

### Minimal Code
```csharp
// To open existing excel workbook into spreadsheet
public MainPage()
{
    Stream fileStream = typeof(MainPage).GetTypeInfo().Assembly.GetManifestResourceStream("SfSpreadsheetDemo.Assets.BidDetails.xlsx");
    this.spreadsheet.Open(fileStream);
}
```

### All Overloads
```csharp
public MainPage()
{
//Using Stream, 
spreadsheet.Open (Stream file)

//Using StorageFile,
spreadsheet.Open (StorageFile file)

//Using Workbook,
spreadsheet.Open(IWorkbook workbook)
}
```

---

## Save a Workbook

### Minimal Code
```csharp
// To save the excel workbook
spreadsheet.Save();
```

### Save As
```csharp
//Using Storage File,
spreadsheet.SaveAs (StorageFile file);

//Using String,
spreadsheet.SaveAs (string file);

//For Dialog box,
spreadsheet.SaveAs();
```
---

## References
- [Getting Started Documentation](https://help.syncfusion.com/uwp/spreadsheet/getting-started)
- [UWP Spreadsheet Overview](https://help.syncfusion.com/uwp/spreadsheet/overview)
