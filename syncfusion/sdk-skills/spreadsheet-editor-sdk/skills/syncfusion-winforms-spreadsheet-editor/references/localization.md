# Localization in Windows Forms Spreadsheet

Localization is the process of customizing the UI for a specific culture or language. The WinForms Spreadsheet control supports localizing all static text in the Ribbon and dialogs to any desired language using resource (`.resx`) files.

## Setting the Current UI Culture

Set the `CurrentUICulture` of the current thread before initializing components so that the correct localized strings are loaded.

```csharp
using System.Globalization;
using System.Threading;

public Form1()
{
    Thread.CurrentThread.CurrentUICulture = new CultureInfo("ja-JP");
    InitializeComponent();
}
```

> **NOTE:** The `CurrentUICulture` must be set **before** calling `InitializeComponent()` to take effect.

## Localization Using Resource Files

Follow these steps to add a new language:

### Step 1: Create a Resources Folder

Create a folder named `Resources` in your application project.

### Step 2: Add the Default Resource File

Add the default English resource file `Syncfusion.Spreadsheet.Windows.resx` to the `Resources` folder. This file contains all the default key-value pairs.

### Step 3: Create a Culture-Specific Resource File

Create a new `.resx` file named in the following pattern:

```
Syncfusion.Spreadsheet.Windows.[Culture name].resx
```

**Examples:**

| Culture | File Name |
|---|---|
| Japanese | `Syncfusion.Spreadsheet.Windows.ja.resx` |
| French | `Syncfusion.Spreadsheet.Windows.fr.resx` |
| German | `Syncfusion.Spreadsheet.Windows.de.resx` |
| Arabic | `Syncfusion.Spreadsheet.Windows.ar.resx` |

### Step 4: Add Localized Key-Value Pairs

In the culture-specific `.resx` file, add the Name/Value pairs with translated text for each key defined in the default resource file.

## Modifying Default Localized Strings

To override the default English text:

1. Add `Syncfusion.Spreadsheet.Windows.resx` to the `Resources` folder of your application.
2. Modify the Name/Value pairs in the `.resx` file as needed.

> **NOTE:** The custom resource file in your application takes precedence over the default strings in the Syncfusion assembly.

## See Also

- [Overview](overview.md)
- [Getting Started](getting-started.md)
