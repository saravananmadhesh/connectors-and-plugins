# Localization in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Setting Grid Locale](#setting-grid-locale)
- [Supported Locales](#supported-locales)
- [Customize Locale Strings](#customize-locale-strings)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Date and Number Formatting](#date-and-number-formatting)

---

## Overview

Syncfusion Grid supports localization for UI text, messages, and number/date formatting in multiple languages. Configure locale at grid level for UI text, and at column level for data formatting.

---

## Setting Grid Locale

### Default English Grid

```cshtml
<!-- Default locale is 'en-US' -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="en-US">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Change Grid Locale

```cshtml
<!-- Spanish locale -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="es-ES">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- French locale -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="fr-FR">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<!-- German locale -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="de-DE">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Set Locale from Server

```cshtml
@{
    var culture = System.Globalization.CultureInfo.CurrentUICulture.Name;
}

<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="@culture">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Supported Locales

The Grid supports 40+ locales:

| Locale | Language | Code |
|--------|----------|------|
| English (US) | English | en-US |
| English (UK) | English | en-GB |
| Spanish (Spain) | Spanish | es-ES |
| French (France) | French | fr-FR |
| German (Germany) | German | de-DE |
| Italian (Italy) | Italian | it-IT |
| Portuguese (Portugal) | Portuguese | pt-PT |
| Portuguese (Brazil) | Portuguese | pt-BR |
| Russian (Russia) | Russian | ru-RU |
| Chinese (Simplified) | Chinese | zh-CN |
| Chinese (Traditional) | Chinese | zh-TW |
| Japanese (Japan) | Japanese | ja-JP |
| Korean (Korea) | Korean | ko-KR |
| Arabic (Saudi Arabia) | Arabic | ar-SA |
| Hebrew (Israel) | Hebrew | he-IL |
| Swedish (Sweden) | Swedish | sv-SE |
| Norwegian (Norway) | Norwegian | nb-NO |
| Dutch (Netherlands) | Dutch | nl-NL |
| Turkish (Turkey) | Turkish | tr-TR |
| Polish (Poland) | Polish | pl-PL |
| Czech (Czech Republic) | Czech | cs-CZ |
| Hungarian (Hungary) | Hungarian | hu-HU |
| Romanian (Romania) | Romanian | ro-RO |
| Thai (Thailand) | Thai | th-TH |
| Vietnamese (Vietnam) | Vietnamese | vi-VN |
| Indonesian (Indonesia) | Indonesian | id-ID |
| Filipino (Philippines) | Filipino | fil-PH |
| Danish (Denmark) | Danish | da-DK |
| Finnish (Finland) | Finnish | fi-FI |
| Greek (Greece) | Greek | el-GR |

---

## Customize Locale Strings

### Override Default Locale Strings

```cshtml
@{
    var L10n = new ej.base.L10n();
    L10n.setLocale("es-ES", new {
        grid = new {
            Add = "Añadir",
            Edit = "Editar",
            Delete = "Borrar",
            Update = "Actualizar",
            Cancel = "Cancelar",
            Save = "Guardar",
            EmptyDataSource = "No hay datos disponibles"
        }
    });
}

<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="es-ES" allowPaging="true">
    <e-grid-toolbar>
        <e-grid-toolbar-item type="Add"></e-grid-toolbar-item>
        <e-grid-toolbar-item type="Edit"></e-grid-toolbar-item>
        <e-grid-toolbar-item type="Delete"></e-grid-toolbar-item>
    </e-grid-toolbar>
</ejs-grid>
```

### Common Localizable Strings

```csharp
new {
    grid = new {
        Add = "Add",
        Edit = "Edit", 
        Delete = "Delete",
        Update = "Update",
        Cancel = "Cancel",
        Save = "Save",
        EmptyDataSource = "No records to display",
        TotalCount = "Total count",
        PagerItemsLength = "Items per page",
        SelectAll = "Select All",
        Blanks = "(Blanks)",
        FilterMenu = "Filter",
        FilterBarCell = "Filter bar cell",
        Contains = "Contains",
        StartsWith = "Starts with",
        EndsWith = "Ends with"
    }
}
```

---

## Right-to-Left (RTL)

### Enable RTL Layout

```cshtml
<!-- Enable RTL for Arabic, Hebrew, etc. -->
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          locale="ar-SA" 
          enableRtl="true">
    <e-grid-columns>
        <e-grid-column field="الطلب" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="العميل" headerText="Customer" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### CSS for RTL

```css
/* RTL-specific styling */
.e-rtl .e-grid {
    direction: rtl;
    text-align: right;
}

.e-rtl .e-headercell {
    padding-right: 10px;
    padding-left: 5px;
}
```

---

## Date and Number Formatting

### Column-Level Locale Formatting

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="de-DE">
    <e-grid-columns>
        <!-- Number formatting: German locale uses comma as decimal separator -->
        <e-grid-column field="Freight" 
                       headerText="Freight" 
                       type="number" 
                       format="C2"
                       width="100">
        </e-grid-column>
        
        <!-- Date formatting: German date format (dd.MM.yyyy) -->
        <e-grid-column field="OrderDate" 
                       headerText="Order Date" 
                       type="date" 
                       format="dd.MM.yyyy"
                       width="130">
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Format Examples by Locale

| Locale | Currency | Date | Number |
|--------|----------|------|--------|
| en-US | $1,234.56 | 1/15/2023 | 1,234.56 |
| de-DE | 1.234,56 € | 15.01.2023 | 1.234,56 |
| fr-FR | 1 234,56 € | 15/01/2023 | 1 234,56 |
| ja-JP | ¥1,235 | 2023/1/15 | 1,234.56 |
| ar-SA | ر.س 1,234.56 | 15/1/2023 | ١٬٢٣٤٫٥٦ |

### Custom Date/Number Formatting

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="de-DE">
    <e-grid-columns>
        <!-- Custom currency format -->
        <e-grid-column field="Freight" 
                       headerText="Freight" 
                       type="number" 
                       format="N2"
                       width="100">
        </e-grid-column>
        
        <!-- Custom date format -->
        <e-grid-column field="OrderDate" 
                       headerText="Order Date" 
                       type="date" 
                       format="yMMMM d"
                       width="160">
        </e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Best Practices

1. **Set locale for entire application**: Use a base layout or global configuration
2. **Match column formats to locale**: Use culture-appropriate date/number formats
3. **Customize for business needs**: Override default strings for domain-specific terms
4. **Test with different locales**: Verify UI spacing and text length in all target languages
5. **Use locale-aware filtering**: Ensure filters work with localized data formats
6. **Provide language switcher**: Allow users to change locale dynamically
7. **Support RTL correctly**: Test RTL layouts thoroughly, especially with custom CSS
8. **Translate column headers**: Always provide localized `headerText` values

---

## Sample: Multi-Language Grid

```cshtml
@{
    var currentLocale = ViewBag.CurrentLocale ?? "en-US";
}

<div>
    <label>Language:</label>
    <select onchange="changeLocale(this.value)">
        <option value="en-US" selected="@(currentLocale == "en-US")">English</option>
        <option value="es-ES" selected="@(currentLocale == "es-ES")">Spanish</option>
        <option value="fr-FR" selected="@(currentLocale == "fr-FR")">French</option>
        <option value="de-DE" selected="@(currentLocale == "de-DE")">German</option>
        <option value="ar-SA" selected="@(currentLocale == "ar-SA")">Arabic</option>
    </select>
</div>

<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="@currentLocale"
          enableRtl="@(currentLocale.StartsWith("ar"))">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function changeLocale(locale) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.locale = locale;
    grid.enableRtl = locale.startsWith('ar');
    grid.refresh();
}
</script>
```
