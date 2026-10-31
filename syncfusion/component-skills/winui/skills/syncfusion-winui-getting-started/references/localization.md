# Localization and RTL Support for Syncfusion WinUI

## Table of Contents
- [Supported Languages](#supported-languages)
- [Setting Application Language](#setting-application-language)
- [Localizing with .resw Files](#localizing-with-resw-files)
- [Localizing Without .resw Files (Provider Method)](#localizing-without-resw-files-provider-method)
- [Culture and Language Codes](#culture-and-language-codes)
- [Custom Resource Files](#custom-resource-files)
- [Date and Time Formatting](#date-and-time-formatting)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Dynamic Language Switching](#dynamic-language-switching)

---

## Supported Languages

Syncfusion WinUI supports 60+ languages including:

**European Languages:**
- English (US, UK, AU, etc.)
- Spanish (Spain, Mexico, Latin America)
- French (France, Canada, Belgium)
- German, Italian, Portuguese, Dutch
- Polish, Russian, Swedish, Norwegian

**Asian Languages:**
- Chinese (Simplified, Traditional)
- Japanese, Korean
- Hindi, Thai, Vietnamese

**Middle Eastern & RTL:**
- Arabic, Hebrew, Persian, Urdu

**Other Languages:**
- Portuguese (Brazil)
- Turkish, Greek, Ukrainian
- And 40+ additional languages

---

## Setting Application Language

### WinUI-Specific Language Setting (Recommended)

**For both packaged and unpackaged deployments:**

```csharp
using Syncfusion.Licensing;

public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        // Set language for WinUI application (works for both packaged and unpackaged)
        // IMPORTANT: Set BEFORE InitializeComponent()
        Microsoft.Windows.Globalization.ApplicationLanguages.PrimaryLanguageOverride = "de"; // German
        
        this.InitializeComponent();
    }
}
```

**For packaged deployments only:**

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        // WARNING: This works for packaged deployments only
        // In unpackaged deployments, it may cause the app to crash
        Windows.Globalization.ApplicationLanguages.PrimaryLanguageOverride = "de";
        
        this.InitializeComponent();
    }
}
```

**Important Notes:**
- Always set language override **before** `InitializeComponent()` if using .resw files
- Use `Microsoft.Windows.Globalization` for both packaged and unpackaged deployments
- Use `Windows.Globalization` only for packaged deployments

### Method 1: In Code at Application Startup (General .NET Approach)

```csharp
using System.Globalization;
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Set language/culture for entire application
        // IMPORTANT: Set before InitializeComponent()
        CultureInfo.CurrentCulture = new CultureInfo("es-ES");      // Spanish (Spain)
        CultureInfo.CurrentUICulture = new CultureInfo("es-ES");
        
        this.InitializeComponent();
    }
}
```

### Method 2: Per-Thread Culture

```csharp
using System.Globalization;
using System.Threading;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        // Set culture for current thread only
        Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");
        Thread.CurrentThread.CurrentUICulture = new CultureInfo("fr-FR");
        
        this.InitializeComponent();
    }
}
```

### Method 3: Get System Culture

```csharp
using System.Globalization;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Use system's default culture
        CultureInfo systemCulture = CultureInfo.InstalledUICulture;
        CultureInfo.CurrentCulture = systemCulture;
        CultureInfo.CurrentUICulture = systemCulture;
        
        this.InitializeComponent();
    }
}
```

---

## Localizing with .resw Files

### Overview

WinUI applications use `.resw` files (Windows Resource Files) for localization. Syncfusion provides default resource files for all WinUI controls.

### Default Resource Files

**Download from GitHub:**
[Syncfusion WinUI Localization Resource Files](https://github.com/syncfusion/winui-controls-localization-resource-files)

### Creating .resw Files

**Step 1: Add Resources Folder**

Right-click your project → Add New Folder → Name it `Resources`

**Step 2: Add Language Folder**

Inside `Resources`, create a folder with the language code (e.g., `de` for German, `es` for Spanish)

**Project Structure:**
```
YourProject/
├── Resources/
│   ├── de/                          # German
│   │   ├── Syncfusion.Grid.WinUI.resw
│   │   ├── Syncfusion.Editors.WinUI.resw
│   │   └── ...
│   ├── es/                          # Spanish
│   │   ├── Syncfusion.Grid.WinUI.resw
│   │   └── ...
│   └── fr/                          # French
│       └── ...
```

**Step 3: Add Resource Files**

Copy the appropriate `.resw` files from the GitHub repository into your language folder.

**Example - For DataGrid:**
- Control: SfDataGrid
- Assembly: Syncfusion.Grid.WinUI
- Resource File: `Syncfusion.Grid.WinUI.resw`

### .resw File Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="AddNewRowText" xml:space="preserve">
    <value>Neue Zeile hinzufügen</value>  <!-- German: "Add New Row" -->
  </data>
  <data name="SortDateAscending" xml:space="preserve">
    <value>Aufsteigend sortieren</value>  <!-- German: "Sort Ascending" -->
  </data>
  <data name="SortDateDescending" xml:space="preserve">
    <value>Absteigend sortieren</value>   <!-- German: "Sort Descending" -->
  </data>
  <data name="ClearFilter" xml:space="preserve">
    <value>Filter löschen</value>         <!-- German: "Clear Filter" -->
  </data>
</root>
```

### Editing Default Language Strings

You can change default English strings by adding `.resw` files to your `Resources` folder:

**Step 1: Add default resource files** (from GitHub) to `Resources/en-US/` folder

**Step 2: Modify values** in the .resw file:

```xml
<root>
  <data name="AddNewRowText" xml:space="preserve">
    <value>Click here to add new item</value>  <!-- Custom English text -->
  </data>
</root>
```

Syncfusion controls will read the custom strings from your application's .resw files.

### Complete Example - DataGrid Localization

**App.xaml.cs:**
```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        this.InitializeComponent();
    }
}
```

**MainWindow.xaml.cs:**
```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        // Set German language
        Microsoft.Windows.Globalization.ApplicationLanguages.PrimaryLanguageOverride = "de";
        this.InitializeComponent();
    }
}
```

**Resources/de/Syncfusion.Grid.WinUI.resw:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="AddNewRowText" xml:space="preserve">
    <value>Zum Hinzufügen hier klicken</value>
  </data>
  <data name="SortAscending" xml:space="preserve">
    <value>Aufsteigend sortieren</value>
  </data>
  <data name="SortDescending" xml:space="preserve">
    <value>Absteigend sortieren</value>
  </data>
  <data name="ClearFilter" xml:space="preserve">
    <value>Filter löschen</value>
  </data>
  <data name="Filter" xml:space="preserve">
    <value>Filter</value>
  </data>
</root>
```

---

## Localizing Without .resw Files (Provider Method)

### Overview

You can localize Syncfusion WinUI controls programmatically using the **`LocalizationProvider`** class and **`ILocalizationProvider`** interface. This method allows custom string localization without creating .resw files.

### Implementation Steps

**Step 1: Include Required Namespace**

```csharp
using Syncfusion.UI.Xaml.Core;
```

**Step 2: Create Localization Provider Class**

Implement the `ILocalizationProvider` interface:

```csharp
using Syncfusion.UI.Xaml.Core;

public class MyStringLoader : ILocalizationProvider
{
    public string GetLocalizedString(LocalizationInfo info)
    {
        // Return custom string for specific keys
        switch (info.ResourceName)
        {
            case "AddNewRowText":  // From Syncfusion.Grid.WinUI
                return "Agregar Nueva Fila";  // Spanish
            case "SortAscending":
                return "Ordenar Ascendente";
            case "SortDescending":
                return "Ordenar Descendente";
            case "ClearFilter":
                return "Limpiar Filtro";
            case "Filter":
                return "Filtrar";
            default:
                // Return null for non-localized keys
                // They will use resource map or default values
                return null;
        }
    }
}
```

**Step 3: Assign Provider in App Constructor**

```csharp
using Syncfusion.UI.Xaml.Core;

public partial class App : Application
{
    public App()
    {
        // Set provider BEFORE InitializeComponent()
        LocalizationProvider.Provider = new MyStringLoader();
        
        this.InitializeComponent();
    }
}
```

### Assembly-Specific Localization

If the same key exists in multiple assemblies, use `ResourceAssemblyName` to target specific assemblies:

```csharp
public class MyStringLoader : ILocalizationProvider
{
    public string GetLocalizedString(LocalizationInfo info)
    {
        // Assembly-specific localization
        if (info.ResourceAssemblyName == "Syncfusion.Grid.WinUI" 
            && info.ResourceName == "SortDateDescending")
        {
            return "Ordenar Fecha Descendente";  // Spanish for DataGrid
        }
        
        if (info.ResourceAssemblyName == "Syncfusion.Editors.WinUI" 
            && info.ResourceName == "Automatic")
        {
            return "Automático";  // Spanish for Editors
        }
        
        // General localization for all assemblies
        switch (info.ResourceName)
        {
            case "OK":
                return "Aceptar";
            case "Cancel":
                return "Cancelar";
            default:
                return null;
        }
    }
}
```

### Complete Example - DataGrid with Provider

```csharp
using Syncfusion.UI.Xaml.Core;
using Syncfusion.Licensing;

// Localization Provider Implementation
public class GermanStringLoader : ILocalizationProvider
{
    public string GetLocalizedString(LocalizationInfo info)
    {
        // DataGrid-specific localization
        if (info.ResourceAssemblyName == "Syncfusion.Grid.WinUI")
        {
            switch (info.ResourceName)
            {
                case "AddNewRowText":
                    return "Neue Zeile hinzufügen";
                case "SortAscending":
                    return "Aufsteigend sortieren";
                case "SortDescending":
                    return "Absteigend sortieren";
                case "ClearFilter":
                    return "Filter löschen";
                case "Filter":
                    return "Filter";
                case "GroupDropAreaText":
                    return "Ziehen Sie eine Spaltenüberschrift hierher";
                default:
                    return null;
            }
        }
        
        // Other assemblies
        return null;
    }
}

// App.xaml.cs
public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Set provider before InitializeComponent
        LocalizationProvider.Provider = new GermanStringLoader();
        
        this.InitializeComponent();
    }
}
```

### Dynamic Language Switching with Provider

```csharp
using Syncfusion.UI.Xaml.Core;

public class MultiLanguageProvider : ILocalizationProvider
{
    private string _currentLanguage = "en-US";
    
    public void SetLanguage(string language)
    {
        _currentLanguage = language;
    }
    
    public string GetLocalizedString(LocalizationInfo info)
    {
        switch (_currentLanguage)
        {
            case "es-ES":  // Spanish
                return GetSpanishString(info.ResourceName);
            case "de-DE":  // German
                return GetGermanString(info.ResourceName);
            case "fr-FR":  // French
                return GetFrenchString(info.ResourceName);
            default:
                return null;  // Use default English
        }
    }
    
    private string GetSpanishString(string key)
    {
        switch (key)
        {
            case "AddNewRowText": return "Agregar Nueva Fila";
            case "SortAscending": return "Ordenar Ascendente";
            case "SortDescending": return "Ordenar Descendente";
            default: return null;
        }
    }
    
    private string GetGermanString(string key)
    {
        switch (key)
        {
            case "AddNewRowText": return "Neue Zeile hinzufügen";
            case "SortAscending": return "Aufsteigend sortieren";
            case "SortDescending": return "Absteigend sortieren";
            default: return null;
        }
    }
    
    private string GetFrenchString(string key)
    {
        switch (key)
        {
            case "AddNewRowText": return "Ajouter une nouvelle ligne";
            case "SortAscending": return "Trier par ordre croissant";
            case "SortDescending": return "Trier par ordre décroissant";
            default: return null;
        }
    }
}

// Usage in app
public partial class App : Application
{
    private static MultiLanguageProvider _localizationProvider;
    
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        _localizationProvider = new MultiLanguageProvider();
        LocalizationProvider.Provider = _localizationProvider;
        
        this.InitializeComponent();
    }
    
    public static void ChangeLanguage(string language)
    {
        _localizationProvider.SetLanguage(language);
        // You may need to refresh UI to apply changes
    }
}
```

### Localization Priority

**Highest Priority:** `LocalizationProvider.Provider` (overrides everything)
- Uses your custom `ILocalizationProvider` implementation
- Returns custom strings for specified keys

**Fallback:** Resource Map (.resw files)
- Uses .resw files from `Resources/{language}/` folder
- Loads strings from resource tables

**Default:** Built-in Resources
- Uses Syncfusion's default English strings

---

## Culture and Language Codes

### Common Culture Codes (BCP 47 Format)

```csharp
// English
"en-US"    // English (United States)
"en-GB"    // English (United Kingdom)
"en-AU"    // English (Australia)
"en-CA"    // English (Canada)

// Spanish
"es-ES"    // Spanish (Spain)
"es-MX"    // Spanish (Mexico)
"es-AR"    // Spanish (Argentina)

// French
"fr-FR"    // French (France)
"fr-CA"    // French (Canada)
"fr-BE"    // French (Belgium)

// German
"de-DE"    // German (Germany)
"de-AT"    // German (Austria)
"de-CH"    // German (Switzerland)

// Other European
"it-IT"    // Italian (Italy)
"pt-BR"    // Portuguese (Brazil)
"pt-PT"    // Portuguese (Portugal)
"nl-NL"    // Dutch (Netherlands)
"ru-RU"    // Russian (Russia)
"pl-PL"    // Polish (Poland)
"sv-SE"    // Swedish (Sweden)
"no-NO"    // Norwegian (Norway)

// Asian Languages
"ja-JP"    // Japanese (Japan)
"zh-CN"    // Chinese (Simplified, China)
"zh-TW"    // Chinese (Traditional, Taiwan)
"ko-KR"    // Korean (South Korea)
"th-TH"    // Thai (Thailand)
"vi-VN"    // Vietnamese (Vietnam)
"hi-IN"    // Hindi (India)

// RTL Languages
"ar-SA"    // Arabic (Saudi Arabia)
"ar-EG"    // Arabic (Egypt)
"ar-AE"    // Arabic (UAE)
"he-IL"    // Hebrew (Israel)
"fa-IR"    // Persian (Iran)
"ur-PK"    // Urdu (Pakistan)
"ur-IN"    // Urdu (India)
```

### Creating Culture Info Objects

```csharp
using System.Globalization;

// From culture code
CultureInfo culture = new CultureInfo("es-ES");

// From LCID (Locale ID)
CultureInfo culture = new CultureInfo(3082);  // Spanish (Spain)

// With specific properties
var culture = new CultureInfo("de-DE")
{
    DateTimeFormat = DateTimeFormatInfo.CurrentInfo,
    NumberFormat = NumberFormatInfo.CurrentInfo
};
```

---

## Custom Resource Files

### Loading Localization Resources

```csharp
using System.Resources;
using System.Globalization;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        // Load strings from resource file
        ResourceManager resourceManager = new ResourceManager(
            "YourNamespace.Resources.Strings",  // Namespace.ResourceName
            typeof(MainWindow).Assembly
        );
        
        // Get localized string
        string greeting = resourceManager.GetString("Greeting", CultureInfo.CurrentCulture);
        Console.WriteLine(greeting);  // Output in current language
    }
}
```

### Creating Resource Files

**Step 1: Create Strings.resx (Base/English)**

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="Greeting" xml:space="preserve">
    <value>Hello, World!</value>
  </data>
  <data name="Submit" xml:space="preserve">
    <value>Submit</value>
  </data>
  <data name="Cancel" xml:space="preserve">
    <value>Cancel</value>
  </data>
</root>
```

**Step 2: Create Language-Specific Files**

`Strings.es-ES.resx` (Spanish):
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="Greeting" xml:space="preserve">
    <value>¡Hola, Mundo!</value>
  </data>
  <data name="Submit" xml:space="preserve">
    <value>Enviar</value>
  </data>
  <data name="Cancel" xml:space="preserve">
    <value>Cancelar</value>
  </data>
</root>
```

`Strings.fr-FR.resx` (French):
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <data name="Greeting" xml:space="preserve">
    <value>Bonjour, le monde!</value>
  </data>
  <data name="Submit" xml:space="preserve">
    <value>Soumettre</value>
  </data>
  <data name="Cancel" xml:space="preserve">
    <value>Annuler</value>
  </data>
</root>
```

**Step 3: Use in Code**

```csharp
using System.Globalization;
using System.Resources;

public partial class MainWindow : Window
{
    private ResourceManager _resourceManager;
    
    public MainWindow()
    {
        this.InitializeComponent();
        
        _resourceManager = new ResourceManager(
            "YourApp.Resources.Strings",
            typeof(MainWindow).Assembly
        );
        
        // Strings automatically load in current culture
        string greeting = _resourceManager.GetString("Greeting");
        string submit = _resourceManager.GetString("Submit");
        
        GreetingText.Text = greeting;
        SubmitButton.Content = submit;
    }
}
```

---

## Date and Time Formatting

### Culture-Aware Formatting

```csharp
using System;
using System.Globalization;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        DateTime now = DateTime.Now;
        
        // Set to Spanish culture
        CultureInfo.CurrentCulture = new CultureInfo("es-ES");
        Console.WriteLine(now.ToString("d"));    // 21/03/2026
        Console.WriteLine(now.ToString("D"));    // jueves, 21 de marzo de 2026
        Console.WriteLine(now.ToString("g"));    // 21/03/2026 14:30
        
        // Switch to US culture
        CultureInfo.CurrentCulture = new CultureInfo("en-US");
        Console.WriteLine(now.ToString("d"));    // 3/21/2026
        Console.WriteLine(now.ToString("D"));    // Thursday, March 21, 2026
        Console.WriteLine(now.ToString("g"));    // 3/21/2026 2:30 PM
    }
}
```

### Number Formatting

```csharp
using System;
using System.Globalization;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
        
        decimal price = 1234.56m;
        
        // US format
        CultureInfo.CurrentCulture = new CultureInfo("en-US");
        Console.WriteLine(price.ToString("C"));  // $1,234.56
        Console.WriteLine(price.ToString("N"));  // 1,234.56
        
        // German format
        CultureInfo.CurrentCulture = new CultureInfo("de-DE");
        Console.WriteLine(price.ToString("C"));  // 1.234,56 €
        Console.WriteLine(price.ToString("N"));  // 1.234,56
        
        // French format
        CultureInfo.CurrentCulture = new CultureInfo("fr-FR");
        Console.WriteLine(price.ToString("C"));  // 1 234,56 €
    }
}
```

---

## Right-to-Left (RTL) Support

### When to Use RTL

Required for languages that read right-to-left:
- Arabic (العربية)
- Hebrew (עברית)
- Persian (فارسی)
- Urdu (اردو)

These languages require both language setting AND flow direction change.

### Method 1: Application-Level RTL

```csharp
using System.Globalization;
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Enable RTL for Arabic
        CultureInfo.CurrentUICulture = new CultureInfo("ar-SA");
        CultureInfo.CurrentCulture = new CultureInfo("ar-SA");
        
        // Set flow direction for entire application
        this.Resources["FlowDirection"] = FlowDirection.RightToLeft;
        
        this.InitializeComponent();
    }
}
```

### Method 2: Window-Level RTL

```xml
<!-- MainWindow.xaml -->
<Window x:Class="YourApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:syncfusion="using:Syncfusion.UI.Xaml.Controls"
        xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
        FlowDirection="RightToLeft">
    
    <Grid>
        <editors:SfComboBox x:Name="comboBox" Content="موافق" />  <!-- "OK" in Arabic -->
    </Grid>
    
</Window>
```

### Method 3: Dynamic RTL Based on Language

```csharp
using System.Globalization;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
    }
    
    private void SetLanguage(string cultureCode)
    {
        CultureInfo culture = new CultureInfo(cultureCode);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
        
        // Set flow direction based on language
        if (IsRTLLanguage(cultureCode))
        {
            this.FlowDirection = FlowDirection.RightToLeft;
        }
        else
        {
            this.FlowDirection = FlowDirection.LeftToRight;
        }
    }
    
    private bool IsRTLLanguage(string cultureCode)
    {
        return cultureCode.StartsWith("ar") ||   // Arabic
               cultureCode.StartsWith("he") ||   // Hebrew
               cultureCode.StartsWith("fa") ||   // Persian
               cultureCode.StartsWith("ur");     // Urdu
    }
}
```

### RTL Layout Considerations

Components automatically adjust in RTL mode:

| Aspect | LTR | RTL |
|--------|-----|-----|
| Text flow | Left to right | Right to left |
| Button alignment | Left | Right |
| Scrollbars | Right | Left |
| Margins/padding | Preserved | Mirrored |
| Navigation arrows | → | ← |

### RTL-Aware Layout Example

```xml
<Grid FlowDirection="{Binding FlowDirection}">
    <StackPanel Orientation="Horizontal" HorizontalAlignment="Right">
        <!-- ComboBox and MaskedTextBox automatically mirror in RTL -->
        <editors:SfComboBox x:Name="comboBox" PlaceholderText="إرسال" />  <!-- "Send" -->
    </StackPanel>
</Grid>
```

---

## Dynamic Language Switching

### Complete Multi-Language Example

```csharp
using System.Globalization;
using System.Resources;

public partial class MainWindow : Window
{
    private ResourceManager _resourceManager;
    
    public MainWindow()
    {
        this.InitializeComponent();
        
        _resourceManager = new ResourceManager(
            "YourApp.Resources.Strings",
            typeof(MainWindow).Assembly
        );
        
        // Set initial language
        SwitchLanguage("en-US");
    }
    
    private void SwitchLanguage(string cultureCode)
    {
        // Update culture
        CultureInfo culture = new CultureInfo(cultureCode);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
        
        // Update flow direction for RTL languages
        this.FlowDirection = IsRTLLanguage(cultureCode) 
            ? FlowDirection.RightToLeft 
            : FlowDirection.LeftToRight;
        
        // Reload UI text with new language
        RefreshUIText();
    }
    
    private void RefreshUIText()
    {
        TitleText.Text = _resourceManager.GetString("Title");
        SubmitButton.Content = _resourceManager.GetString("Submit");
        CancelButton.Content = _resourceManager.GetString("Cancel");
    }
    
    private bool IsRTLLanguage(string cultureCode)
    {
        return cultureCode.StartsWith("ar") ||
               cultureCode.StartsWith("he") ||
               cultureCode.StartsWith("fa") ||
               cultureCode.StartsWith("ur");
    }
    
    // Language selection event handlers
    private void EnglishButton_Click(object sender, RoutedEventArgs e) => SwitchLanguage("en-US");
    private void SpanishButton_Click(object sender, RoutedEventArgs e) => SwitchLanguage("es-ES");
    private void ArabicButton_Click(object sender, RoutedEventArgs e) => SwitchLanguage("ar-SA");
    private void FrenchButton_Click(object sender, RoutedEventArgs e) => SwitchLanguage("fr-FR");
}
```

### Saving Language Preference

```csharp
using Windows.Storage;

public partial class App : Application
{
    private const string LANGUAGE_PREFERENCE_KEY = "UserLanguagePreference";
    
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Load saved language
        string savedLanguage = LoadLanguagePreference();
        ApplyLanguage(string.IsNullOrEmpty(savedLanguage) ? "en-US" : savedLanguage);
        
        this.InitializeComponent();
    }
    
    public void SaveLanguagePreference(string cultureCode)
    {
        var localSettings = ApplicationData.Current.LocalSettings;
        localSettings.Values[LANGUAGE_PREFERENCE_KEY] = cultureCode;
        ApplyLanguage(cultureCode);
    }
    
    public string LoadLanguagePreference()
    {
        var localSettings = ApplicationData.Current.LocalSettings;
        return localSettings.Values.ContainsKey(LANGUAGE_PREFERENCE_KEY) 
            ? (string)localSettings.Values[LANGUAGE_PREFERENCE_KEY] 
            : null;
    }
    
    private void ApplyLanguage(string cultureCode)
    {
        var culture = new CultureInfo(cultureCode);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
    }
}
```

---

## Best Practices

### Localization Guidelines

1. **Set culture early** - In App.xaml.cs or MainWindow constructor
2. **Externalize strings** - Use .resx files, not hardcoded strings
3. **Test all languages** - Especially RTL languages
4. **Consider date formats** - Automatically handled by CultureInfo
5. **Test number formats** - Currency, decimals vary by culture
6. **Allow user choice** - Let users change language/locale
7. **Store preference** - Save user's language choice

### Testing Localization

```csharp
// Test multiple languages
var testLanguages = new[] { "en-US", "es-ES", "ar-SA", "zh-CN" };

foreach (var language in testLanguages)
{
    var culture = new CultureInfo(language);
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    
    // Verify strings load correctly
    // Check date/number formatting
    // Verify RTL rendering
    Debug.WriteLine($"Testing: {language}");
}
```
