# Localization — UWP Spreadsheet

> Support multiple languages and cultures in Syncfusion UWP Spreadsheet. Implement localization for built-in strings, custom content, and regional formatting to provide a global user experience.

## Supported Languages and Cultures

### Localized UI Strings

The Spreadsheet control supports localization for:

| Component | Localized Elements |
|-----------|------------------|
| **Ribbon** | Tab names, button labels, tooltips |
| **Menus** | Context menu items, dialog options |
| **Dialogs** | Dialog titles, button text, messages |
| **Error Messages** | Validation errors, warnings |
| **Functions** | Formula function names, descriptions |
| **Status Bar** | Status messages, cell information |
| **Cell Comments** | UI elements for cell notes |

### Supported Languages

- English (en)
- French (fr)
- German (de)
- Spanish (es)
- Portuguese (pt)
- Russian (ru)
- Chinese Simplified (zh-Hans)
- Chinese Traditional (zh-Hant)
- Japanese (ja)
- Korean (ko)
- Arabic (ar)
- Hebrew (he)
- Dutch (nl)
- Swedish (sv)
- Norwegian (no)
- Danish (da)
- Finnish (fi)
- Italian (it)
- Polish (pl)
- Turkish (tr)

---

## Setting Application Culture

Configure the application culture for Spreadsheet localization.

### Set Culture in Code
```csharp
using System.Globalization;
using Windows.Globalization;

private void SetApplicationCulture()
{
    // Set culture to French
    CultureInfo culture = new CultureInfo("fr-FR");
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    
    // Reinitialize Spreadsheet for localization
    spreadsheet.Refresh();
}
```

### Set Culture from Language Selection
```csharp
private void ChangeLanguage(string languageTag)
{
    // Set Windows language
    ApplicationLanguages.PrimaryLanguageOverride = languageTag;
    
    // Also set culture
    CultureInfo culture = new CultureInfo(languageTag);
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    
    // Refresh UI
    spreadsheet.Refresh();
}
```

---

## Localizing Spreadsheet UI

Localize built-in Spreadsheet UI elements.

### Ribbon Localization
```csharp
private void InitializeLocalizedSpreadsheet()
{
    // Set culture
    CultureInfo culture = new CultureInfo("es-ES");
    CultureInfo.CurrentUICulture = culture;
    
    // The Ribbon UI will automatically display in Spanish:
    // "Inicio" (Home) instead of "Home"
    // "Insertar" (Insert) instead of "Insert"
    // "Formato" (Format) instead of "Format"
}
```

### Dialog Localization
```csharp
private void ShowLocalizedDialog()
{
    // Set culture
    CultureInfo culture = new CultureInfo("de-DE");
    CultureInfo.CurrentUICulture = culture;
    
    // Dialogs will appear in German:
    // "Datei öffnen" instead of "Open File"
    // "Speichern unter" instead of "Save As"
    // "OK", "Abbrechen" instead of "OK", "Cancel"
}
```

---

## Custom Localization with Resource Files

Create custom localization using resource files.

### Create Resource File (.resw)

Create a file: `Strings/en-US/Resources.resw`
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <xsd:import namespace="http://schemas.microsoft.com/winfx/2006/xaml"/>
  </xsd:schema>
  
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  
  <data name="WelcomeMessage" xml:space="preserve">
    <value>Welcome to Spreadsheet Application</value>
  </data>
  
  <data name="SaveConfirmation" xml:space="preserve">
    <value>Do you want to save the changes?</value>
  </data>
  
  <data name="DataValidationError" xml:space="preserve">
    <value>Invalid data entered</value>
  </data>
  
  <data name="SortAscending" xml:space="preserve">
    <value>Sort Ascending</value>
  </data>
  
  <data name="SortDescending" xml:space="preserve">
    <value>Sort Descending</value>
  </data>
</root>
```

### Create Resource File for French (.resw)

Create a file: `Strings/fr-FR/Resources.resw`
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="WelcomeMessage" xml:space="preserve">
    <value>Bienvenue dans l'application Spreadsheet</value>
  </data>
  
  <data name="SaveConfirmation" xml:space="preserve">
    <value>Voulez-vous enregistrer les modifications?</value>
  </data>
  
  <data name="DataValidationError" xml:space="preserve">
    <value>Données invalides saisies</value>
  </data>
  
  <data name="SortAscending" xml:space="preserve">
    <value>Trier par ordre croissant</value>
  </data>
  
  <data name="SortDescending" xml:space="preserve">
    <value>Trier par ordre décroissant</value>
  </data>
</root>
```

### Access Localized Strings
```csharp
using Windows.ApplicationModel.Resources;

private void UseLocalizedStrings()
{
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    
    string welcomeMessage = loader.GetString("WelcomeMessage");
    string saveConfirmation = loader.GetString("SaveConfirmation");
    string validationError = loader.GetString("DataValidationError");
    
    // Use in UI
    welcomeTextBlock.Text = welcomeMessage;
}
```

---

## Number and Date Formatting

Format numbers and dates according to culture.

### Culture-Aware Number Formatting
```csharp
private void ApplyLocalizedNumberFormatting()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    
    // Current culture determines formatting
    // German: 1.234,56 (period for thousands, comma for decimal)
    // US English: 1,234.56 (comma for thousands, period for decimal)
    
    worksheet.Range["A1"].Number = 1234.56;
    worksheet.Range["A1"].NumberFormat = "###,##0.00";
    
    // Format respects current culture
    CultureInfo culture = CultureInfo.CurrentCulture;
    string formatted = (1234.56).ToString("N2", culture);
}
```

### Culture-Aware Date Formatting
```csharp
private void ApplyLocalizedDateFormatting()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    
    DateTime now = DateTime.Now;
    worksheet.Range["B1"].DateTime = now;
    
    // Format dates according to culture
    // en-US: 3/24/2026
    // de-DE: 24.03.2026
    // fr-FR: 24/03/2026
    
    CultureInfo culture = CultureInfo.CurrentCulture;
    string dateFormatted = now.ToString("d", culture);
    
    worksheet.Range["B1"].Text = dateFormatted;
}
```

### Culture-Aware Currency Formatting
```csharp
private void ApplyLocalizedCurrencyFormatting()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    
    double amount = 1234.56;
    
    // US English: $1,234.56
    // German: 1.234,56 €
    // French: 1 234,56 €
    
    CultureInfo culture = CultureInfo.CurrentCulture;
    string currencyFormatted = amount.ToString("C", culture);
    
    worksheet.Range["C1"].Text = currencyFormatted;
    worksheet.Range["C1"].NumberFormat = "$#,##0.00";
}
```

---

## Right-to-Left (RTL) Language Support

Support RTL languages like Arabic and Hebrew.

### Enable RTL Layout
```csharp
private void EnableRTLLayout()
{
    // Detect RTL language
    CultureInfo culture = CultureInfo.CurrentCulture;
    
    if (culture.Name == "ar-SA" || culture.Name == "he-IL")
    {
        // Set RTL for UI
        FlowDirection = FlowDirection.RightToLeft;
        
        // Apply RTL to Spreadsheet
        spreadsheet.FlowDirection = FlowDirection.RightToLeft;
    }
}
```

### RTL in XAML
```xaml
<Page
    FlowDirection="RightToLeft"
    xmlns:spreadsheet="using:Syncfusion.UI.Xaml.Spreadsheet">
    
    <Grid>
        <spreadsheet:SfSpreadsheet x:Name="spreadsheet"
                                   FlowDirection="RightToLeft"/>
    </Grid>
</Page>
```

### RTL Cell Alignment
```csharp
private void SetRTLCellAlignment()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    
    worksheet.Range["A1"].Text = "مرحبا"; // Arabic
    worksheet.Range["A1"].CellStyle.HorizontalAlignment = ExcelHAlign.Right;
    
    worksheet.Range["B1"].Text = "שלום"; // Hebrew
    worksheet.Range["B1"].CellStyle.HorizontalAlignment = ExcelHAlign.Right;
}
```

---

## Localizing Custom Content

Localize content within your application.

### Localized Headers
```csharp
private void CreateLocalizedHeaders()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    
    worksheet.Range["A1"].Text = loader.GetString("ProductColumn");
    worksheet.Range["B1"].Text = loader.GetString("QuantityColumn");
    worksheet.Range["C1"].Text = loader.GetString("PriceColumn");
    worksheet.Range["D1"].Text = loader.GetString("TotalColumn");
}
```

### Localized Validation Messages
```csharp
private void ApplyLocalizedValidation()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    
    IDataValidation validation = worksheet.Range["A1"].DataValidation;
    validation.AllowType = ExcelDataType.Integer;
    validation.CompareOperator = ExcelDataValidationComparisonOperator.Between;
    validation.FirstFormula = "1";
    validation.SecondFormula = "100";
    validation.ShowErrorBox = true;
    
    // Localized error message
    validation.ErrorBoxText = loader.GetString("RangeError");
    validation.ErrorBoxTitle = loader.GetString("ValidationError");
}
```

### Localized Formulas
```csharp
private void CreateLocalizedFormulas()
{
    IWorksheet worksheet = spreadsheet.Workbook.Worksheets[0];
    
    // Formulas adapt to language
    // English: =SUM(A1:A10)
    // German: =SUMME(A1:A10)
    // French: =SOMME(A1:A10)
    
    CultureInfo culture = CultureInfo.CurrentCulture;
    string formula = GetLocalizedFormula("SUM", culture);
    
    worksheet.Range["A11"].Formula = formula + "(A1:A10)";
}

private string GetLocalizedFormula(string functionName, CultureInfo culture)
{
    Dictionary<string, Dictionary<string, string>> formulas = 
        new Dictionary<string, Dictionary<string, string>>
    {
        { "SUM", new Dictionary<string, string>
            {
                { "en-US", "SUM" },
                { "de-DE", "SUMME" },
                { "fr-FR", "SOMME" },
                { "es-ES", "SUMA" }
            }
        },
        { "AVERAGE", new Dictionary<string, string>
            {
                { "en-US", "AVERAGE" },
                { "de-DE", "MITTELWERT" },
                { "fr-FR", "MOYENNE" },
                { "es-ES", "PROMEDIO" }
            }
        }
    };
    
    if (formulas.ContainsKey(functionName) && 
        formulas[functionName].ContainsKey(culture.Name))
    {
        return formulas[functionName][culture.Name];
    }
    
    return functionName;
}
```

---

## Dynamic Language Switching

Allow users to change language at runtime.

### Language Selection ComboBox
```xaml
<ComboBox x:Name="languageComboBox" 
          SelectionChanged="LanguageComboBox_SelectionChanged">
    <ComboBoxItem>English</ComboBoxItem>
    <ComboBoxItem>Français</ComboBoxItem>
    <ComboBoxItem>Deutsch</ComboBoxItem>
    <ComboBoxItem>Español</ComboBoxItem>
</ComboBox>
```

### Handle Language Change
```csharp
private void LanguageComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    string selectedLanguage = languageComboBox.SelectedItem as string;
    
    string cultureCode = GetCultureCode(selectedLanguage);
    ChangeApplicationLanguage(cultureCode);
}

private string GetCultureCode(string language)
{
    Dictionary<string, string> languageMap = new Dictionary<string, string>
    {
        { "English", "en-US" },
        { "Français", "fr-FR" },
        { "Deutsch", "de-DE" },
        { "Español", "es-ES" },
        { "العربية", "ar-SA" },
        { "עברית", "he-IL" },
        { "日本語", "ja-JP" },
        { "中文", "zh-CN" }
    };
    
    return languageMap.ContainsKey(language) ? languageMap[language] : "en-US";
}

private void ChangeApplicationLanguage(string cultureCode)
{
    // Set culture
    CultureInfo culture = new CultureInfo(cultureCode);
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    ApplicationLanguages.PrimaryLanguageOverride = cultureCode;
    
    // Refresh UI
    ReloadSpreadsheetContent();
}

private void ReloadSpreadsheetContent()
{
    // Reload spreadsheet with new culture
    var currentWorkbook = spreadsheet.Workbook;
    spreadsheet.Close();
    spreadsheet.Open(currentWorkbook);
}
```

---

## Localizing Context Menus

Customize context menu localization.

### Localized Context Menu
```csharp
private void CreateLocalizedContextMenu()
{
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    
    // Create context menu items with localized strings
    MenuFlyout contextMenu = new MenuFlyout();
    
    MenuFlyoutItem cutItem = new MenuFlyoutItem
    {
        Text = loader.GetString("Cut"),
        Icon = new SymbolIcon(Symbol.Cut)
    };
    cutItem.Click += (s, e) => spreadsheet.Cut();
    
    MenuFlyoutItem copyItem = new MenuFlyoutItem
    {
        Text = loader.GetString("Copy"),
        Icon = new SymbolIcon(Symbol.Copy)
    };
    copyItem.Click += (s, e) => spreadsheet.Copy();
    
    MenuFlyoutItem pasteItem = new MenuFlyoutItem
    {
        Text = loader.GetString("Paste"),
        Icon = new SymbolIcon(Symbol.Paste)
    };
    pasteItem.Click += (s, e) => spreadsheet.Paste();
    
    contextMenu.Items.Add(cutItem);
    contextMenu.Items.Add(copyItem);
    contextMenu.Items.Add(pasteItem);
    
    // Attach to spreadsheet
    FlyoutBase.SetAttachedFlyout(spreadsheet, contextMenu);
}
```

---

## Localized Error and Status Messages

Localize messages and notifications.

### Error Messages
```csharp
private void ShowLocalizedErrorMessage(string errorKey)
{
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    string errorMessage = loader.GetString(errorKey);
    
    ContentDialog errorDialog = new ContentDialog
    {
        Title = loader.GetString("Error"),
        Content = errorMessage,
        PrimaryButtonText = loader.GetString("OK")
    };
    
    errorDialog.ShowAsync();
}
```

### Status Messages
```csharp
private void DisplayLocalizedStatusMessage(string statusKey)
{
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    string statusMessage = loader.GetString(statusKey);
    
    statusTextBlock.Text = statusMessage;
}
```

### Localized Notifications
```csharp
private void NotifyLocalizedSave()
{
    ResourceLoader loader = ResourceLoader.GetForViewIndependentUse();
    
    string savedMessage = loader.GetString("FileSavedSuccessfully");
    string fileName = spreadsheet.Workbook.Worksheets[0].Name;
    
    statusTextBlock.Text = string.Format(savedMessage, fileName);
}
```

---

## Example: Complete Localization Setup

```csharp
using System;
using System.Collections.Generic;
using System.Globalization;
using Syncfusion.UI.Xaml.Spreadsheet;
using Syncfusion.XlsIO;
using Windows.ApplicationModel.Resources;
using Windows.Globalization;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

public sealed partial class LocalizedSpreadsheetPage : Page
{
    private ResourceLoader resourceLoader;
    
    public LocalizedSpreadsheetPage()
    {
        this.InitializeComponent();
        InitializeLocalization();
        InitializeSpreadsheet();
    }
    
    private void InitializeLocalization()
    {
        resourceLoader = ResourceLoader.GetForViewIndependentUse();
        
        // Load available languages
        PopulateLanguageComboBox();
        
        // Set default to current system language
        SetCurrentSystemLanguage();
    }
    
    private void PopulateLanguageComboBox()
    {
        languageComboBox.Items.Add("English");
        languageComboBox.Items.Add("Français");
        languageComboBox.Items.Add("Deutsch");
        languageComboBox.Items.Add("Español");
        languageComboBox.Items.Add("العربية");
        languageComboBox.Items.Add("עברית");
        
        languageComboBox.SelectedIndex = 0;
    }
    
    private void SetCurrentSystemLanguage()
    {
        string currentLanguage = ApplicationLanguages.PrimaryLanguageOverride;
        
        if (string.IsNullOrEmpty(currentLanguage))
        {
            currentLanguage = Windows.System.UserProfile.GlobalizationPreferences.HomeGeographicRegion;
        }
        
        CultureInfo culture = new CultureInfo(currentLanguage ?? "en-US");
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
    }
    
    private void InitializeSpreadsheet()
    {
        IWorkbook workbook = new WorkbookImpl();
        IWorksheet worksheet = workbook.Worksheets[0];
        worksheet.Name = resourceLoader.GetString("SalesReport");
        
        // Add localized headers
        worksheet.Range["A1"].Text = resourceLoader.GetString("ProductColumn");
        worksheet.Range["B1"].Text = resourceLoader.GetString("QuantityColumn");
        worksheet.Range["C1"].Text = resourceLoader.GetString("PriceColumn");
        worksheet.Range["D1"].Text = resourceLoader.GetString("TotalColumn");
        
        // Format header row
        IRange headerRange = worksheet.Range["A1:D1"];
        headerRange.CellStyle.Font.Bold = true;
        headerRange.CellStyle.HorizontalAlignment = ExcelHAlign.Center;
        
        // Add sample data
        worksheet.Range["A2"].Text = resourceLoader.GetString("Product1");
        worksheet.Range["B2"].Number = 5;
        worksheet.Range["C2"].Number = 1200;
        worksheet.Range["D2"].Formula = "=B2*C2";
        
        // Apply currency formatting
        CultureInfo culture = CultureInfo.CurrentCulture;
        worksheet.Range["C2:D10"].NumberFormat = culture.NumberFormat.CurrencySymbol + "#,##0.00";
        
        // Auto-fit columns
        worksheet.AutofitColumns(1, 4);
        
        // Open in spreadsheet
        spreadsheet.Open(workbook);
    }
    
    private void LanguageComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        string selectedLanguage = languageComboBox.SelectedItem as string;
        string cultureCode = GetCultureCode(selectedLanguage);
        
        ChangeApplicationLanguage(cultureCode);
    }
    
    private string GetCultureCode(string language)
    {
        Dictionary<string, string> languageMap = new Dictionary<string, string>
        {
            { "English", "en-US" },
            { "Français", "fr-FR" },
            { "Deutsch", "de-DE" },
            { "Español", "es-ES" },
            { "العربية", "ar-SA" },
            { "עברית", "he-IL" }
        };
        
        return languageMap.ContainsKey(language) ? languageMap[language] : "en-US";
    }
    
    private void ChangeApplicationLanguage(string cultureCode)
    {
        CultureInfo culture = new CultureInfo(cultureCode);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
        ApplicationLanguages.PrimaryLanguageOverride = cultureCode;
        
        // Update flow direction for RTL languages
        if (cultureCode == "ar-SA" || cultureCode == "he-IL")
        {
            this.FlowDirection = FlowDirection.RightToLeft;
            spreadsheet.FlowDirection = FlowDirection.RightToLeft;
        }
        else
        {
            this.FlowDirection = FlowDirection.LeftToRight;
            spreadsheet.FlowDirection = FlowDirection.LeftToRight;
        }
        
        // Reload content with new language
        ReloadSpreadsheetContent();
    }
    
    private void ReloadSpreadsheetContent()
    {
        var workbook = spreadsheet.Workbook;
        spreadsheet.Close();
        InitializeSpreadsheet();
    }
}
```

---

## Number Format Variations by Culture

| Value | en-US | de-DE | fr-FR | ar-SA |
|-------|-------|-------|-------|-------|
| 1000 | 1,000 | 1.000 | 1 000 | ١٬٠٠٠ |
| 1234.56 | 1,234.56 | 1.234,56 | 1 234,56 | ١٬٢٣٤٫٥٦ |
| $1234.56 | $1,234.56 | 1.234,56 € | 1 234,56 € | ر.س.‏ 1,234.56 |

---

## Date Format Variations by Culture

| Date | en-US | de-DE | fr-FR | ja-JP |
|------|-------|-------|-------|-------|
| March 24, 2026 | 3/24/2026 | 24.03.2026 | 24/03/2026 | 2026/3/24 |
| Time | 2:30:45 PM | 14:30:45 | 14:30:45 | 14:30:45 |
| DateTime | 3/24/2026 2:30:45 PM | 24.03.2026 14:30:45 | 24/03/2026 14:30:45 | 2026/3/24 14:30:45 |

---

## Best Practices

1. **Use Resource Files** - Store all strings in .resw files
2. **Support RTL** - Test with Arabic and Hebrew
3. **Format Numbers/Dates** - Always use CultureInfo
4. **Test All Languages** - Verify each supported language
5. **Use Language Codes** - Follow ISO 639-1 standards
6. **Handle RTL Layout** - Adjust alignment for RTL languages
7. **Reload UI Properly** - Refresh spreadsheet on language change
8. **Document Formats** - Specify expected date/time formats
9. **Use Pseudo-Localization** - Test with dummy long strings
10. **Consider Font Support** - Ensure fonts support all languages

---

## Key Members

| Member | Type | Description |
|--------|------|-------------|
| `CultureInfo` | Class | Represents culture-specific information |
| `CurrentCulture` | Static Property | Gets/sets current culture |
| `CurrentUICulture` | Static Property | Gets/sets current UI culture |
| `ApplicationLanguages` | Class | Manages application language override |
| `ResourceLoader` | Class | Loads localized resource strings |
| `FlowDirection` | Enum | Specifies text flow direction (LTR/RTL) |
| `ToString(format, culture)` | Method | Formats value using specific culture |
| `GetString()` | Method | Gets localized string from resources |

---


