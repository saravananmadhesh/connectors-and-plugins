# Localization & Globalization for Syncfusion ASP.NET MVC EJ2

## Overview

**Localization (L10N)** is translating UI text to different languages.  
**Globalization (G11N)** is formatting numbers, dates, currencies based on culture.  
**Internationalization (I18N)** is the technical framework supporting both.

### Default Settings
- **Default Locale**: `en-US` (American English)
- **Default Currency**: `USD`

---

## Quick Setup Checklist

✓ Install `@syncfusion/ej2-locale` via npm  
✓ Copy locale JSON files to `~/Content/locale/`  
✓ Load locale data in `_Layout.cshtml` using AJAX  
✓ Call `ej.base.setCulture('de')` to apply culture  
✓ For date/number formatting: Load CLDR data as well  
✓ Test with multiple cultures before deployment  

---

## Localization: Multi-Language Support

### Step 1: Install Locale Package

```bash
npm install @syncfusion/ej2-locale --save
```

### Step 2: Create Locale Folder Structure

Create `~/Content/locale` and copy JSON files from `node_modules/@syncfusion/ej2-locale/src`:

```
Content/
├── locale/
│   ├── en.json          # English
│   ├── de.json          # German
│   ├── fr.json          # French
│   ├── es.json          # Spanish
│   ├── it.json          # Italian
│   ├── zh.json          # Chinese
│   ├── ja.json          # Japanese
│   ├── ar.json          # Arabic
│   └── ... (other languages)
```

### Step 3: Static Localization (Single Language)

Set locale once for all controls in `_Layout.cshtml`:

```html
<body>
    <script>
        // Load locale JSON file
        var ajax = new ej.base.Ajax(
            location.origin + '/Content/locale/de.json',
            'GET',
            false
        );
        
        ajax.send().then((response) => {
            var localeData = JSON.parse(response);
            
            // Load locale strings into library
            ej.base.L10n.load(localeData);
            
            // Set culture for all controls
            ej.base.setCulture('de');
        });
    </script>
    
    @RenderBody()
    
    @Html.EJS().ScriptManager()
</body>
```

### Step 4: Dynamic Localization (Runtime Switching)

Allow users to change language via dropdown:

**In _Layout.cshtml:**
```html
<body>
    <!-- Language Selector -->
    <div style="margin: 10px;">
        @Html.EJS().DropDownList("languageSelector")
            .DataSource((IEnumerable<Object>)ViewBag.Languages)
            .Fields(new Syncfusion.EJ2.DropDowns.DropDownListFieldSettings 
            { 
                Text = "Text", 
                Value = "ID" 
            })
            .Change("onLanguageChange")
            .Placeholder("Select Language")
            .Render()
    </div>
    
    @RenderBody()
    
    <script>
        function onLanguageChange(e) {
            var culture = e.value;
            
            // Load new locale JSON
            var ajax = new ej.base.Ajax(
                location.origin + '/Content/locale/' + culture + '.json',
                'GET',
                false
            );
            
            ajax.send().then((response) => {
                var localeData = JSON.parse(response);
                ej.base.L10n.load(localeData);
                ej.base.setCulture(culture);
                
                // Reload page to apply new language
                location.reload();
            });
        }
    </script>
    
    @Html.EJS().ScriptManager()
</body>
```

**In HomeController.cs:**
```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        var languages = new List<dynamic>
        {
            new { ID = "en-US", Text = "English" },
            new { ID = "de", Text = "Deutsch (German)" },
            new { ID = "fr", Text = "Français (French)" },
            new { ID = "es", Text = "Español (Spanish)" },
            new { ID = "it", Text = "Italiano (Italian)" },
            new { ID = "zh", Text = "中文 (Chinese)" },
            new { ID = "ja", Text = "日本語 (Japanese)" },
            new { ID = "ar", Text = "العربية (Arabic)" },
            new { ID = "ru", Text = "Русский (Russian)" }
        };
        
        ViewBag.Languages = languages;
        return View();
    }
}
```

---

## Globalization: Culture-Specific Formatting

For number, date, currency, and percentage formatting specific to cultures, CLDR (Common Locale Data Repository) data is required.

### Step 1: Install CLDR Data Package

```bash
npm install cldr-data --save
```

### Step 2: Create CLDR Data Folder

After npm install, create `~/Content/cldr-data` and copy:

```
Content/
├── cldr-data/
│   ├── supplemental/
│   │   ├── numberingSystems.json      (Common for all cultures)
│   │   ├── ordinals-cardinal.json
│   │   └── ...
│   └── main/
│       ├── en/                        (English files)
│       │   ├── ca-gregorian.json
│       │   ├── numbers.json
│       │   ├── timeZoneNames.json
│       │   └── currencies.json
│       ├── de/                        (German files)
│       ├── fr/                        (French files)
│       └── ... (one folder per culture)
```

**Required files per culture:**
- `ca-gregorian.json` - Calendar data
- `numbers.json` - Number formatting rules
- `timeZoneNames.json` - Timezone names
- `currencies.json` - Currency codes and symbols
- `numberingSystems.json` (in supplemental, shared) - Numbering systems

### Step 3: Load CLDR Data in _Layout.cshtml

```html
<script>
    function loadCultureData(culture) {
        var requiredFiles = [
            'ca-gregorian.json',
            'numberingSystems.json',
            'numbers.json',
            'timeZoneNames.json',
            'currencies.json',
            'ca-islamic.json'
        ];
        
        var loader = ej.base.loadCldr;
        
        requiredFiles.forEach((fileName) => {
            var filePath;
            
            if (fileName === 'numberingSystems.json') {
                // numberingSystems is in supplemental folder
                filePath = location.origin + '/Content/cldr-data/supplemental/' + fileName;
            } else {
                // Other files are in culture-specific folders
                filePath = location.origin + '/Content/cldr-data/main/' + culture + '/' + fileName;
            }
            
            var xhr = new ej.base.Ajax(filePath, 'GET', false);
            
            xhr.onSuccess = (data) => {
                loader(JSON.parse(data));
            };
            
            xhr.send();
        });
    }
    
    // Load for default culture
    loadCultureData('de');
    ej.base.setCulture('de');
</script>
```

---

## Setting Global Culture and Currency

### Set Culture Globally

Apply culture to all Syncfusion controls:

```javascript
// Set for all controls
ej.base.setCulture('de-DE');

// Set currency code for number formatting
ej.base.setCurrencyCode('EUR');
```

### Set Locale on Individual Controls

```html
<!-- Calendar with Spanish locale -->
@Html.EJS().Calendar("calendar")
    .Locale("es")
    .Render()

<!-- Grid with German locale -->
@Html.EJS().Grid("grid")
    .Locale("de")
    .Render()
```

---

## Number Formatting Examples

### Get Number Formatter

```javascript
var intl = new ej.base.Internationalization();

// Currency formatter
var currencyFormatter = intl.getNumberFormat({
    format: 'C',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
console.log(currencyFormatter(1234.56));  // € 1,234.56 (German)

// Percentage formatter
var percentFormatter = intl.getNumberFormat({ format: 'P2' });
console.log(percentFormatter(0.45));  // 45.00%

// Custom format
var customFormatter = intl.getNumberFormat({
    format: '0000.##',
    useGrouping: true
});
console.log(customFormatter(1234.5));  // 1,234.5
```

### Number Format Strings

| Format | Description | Example |
|--------|-------------|---------|
| `N` | Numeric | 1,234.56 |
| `C` | Currency | $1,234.56 |
| `P` | Percentage | 45.67% |
| `E` | Exponential | 1.23E+03 |

### Parse Numbers

```javascript
var intl = new ej.base.Internationalization();

// Parse currency string
var parser = intl.getNumberParser({ format: 'C' });
var value = parser('$1,234.56');
console.log(value);  // 1234.56
```

---

## Date Formatting Examples

### Format Dates

```javascript
var intl = new ej.base.Internationalization();

// Full date format
var fullFormatter = intl.getDateFormat({
    type: 'date',
    skeleton: 'full'
});
console.log(fullFormatter(new Date()));
// "Friday, December 20, 2024" (en-US)
// "Freitag, 20. Dezember 2024" (de-DE)

// Short datetime format
var shortFormatter = intl.getDateFormat({
    type: 'dateTime',
    skeleton: 'short'
});
console.log(shortFormatter(new Date()));
// "12/20/24, 3:45 PM" (en-US)
// "20.12.24, 15:45" (de-DE)
```

### Parse Dates

```javascript
var intl = new ej.base.Internationalization();

// Parse date string
var parser = intl.getDateParser({
    type: 'date',
    skeleton: 'short'
});
var date = parser('12/20/2024');
console.log(date);  // Date object
```

### Supported Date Skeletons

- `short` - M/d/yy format
- `medium` - MMM d, y format
- `long` - MMMM d, y format
- `full` - EEEE, MMMM d, y format

---

## Complete Example: German Calendar with Formatting

**_Layout.cshtml:**
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>

<body>
    <script>
        // Load German localization
        var localeAjax = new ej.base.Ajax('/Content/locale/de.json', 'GET', false);
        localeAjax.send().then((response) => {
            ej.base.L10n.load(JSON.parse(response));
        });
        
        // Load German CLDR data
        function loadCultureData(culture) {
            var files = [
                'ca-gregorian.json',
                'numberingSystems.json',
                'numbers.json',
                'timeZoneNames.json',
                'currencies.json'
            ];
            
            files.forEach((file) => {
                var path = file === 'numberingSystems.json'
                    ? '/Content/cldr-data/supplemental/' + file
                    : '/Content/cldr-data/main/' + culture + '/' + file;
                
                var xhr = new ej.base.Ajax(path, 'GET', false);
                xhr.onSuccess = (data) => ej.base.loadCldr(JSON.parse(data));
                xhr.send();
            });
        }
        
        loadCultureData('de');
        ej.base.setCulture('de');
        ej.base.setCurrencyCode('EUR');
    </script>
    
    <!-- Calendar with German locale -->
    <div style="margin: 20px;">
        <h3>Kalender (German Calendar)</h3>
        @Html.EJS().Calendar("calendar").Locale("de").Render()
    </div>
    
    <!-- Grid with German locale -->
    <div style="margin: 20px;">
        <h3>Tabelle (German Grid)</h3>
        @Html.EJS().Grid("grid")
            .Locale("de")
            .DataSource(ViewBag.data)
            .Columns(col =>
            {
                col.Field("OrderID").HeaderText("Bestellung ID").Width("120").Add();
                col.Field("CustomerName").HeaderText("Kundenname").Width("150").Add();
                col.Field("OrderDate").HeaderText("Bestelldatum").Type("date").Format("yMd").Width("130").Add();
                col.Field("Freight").HeaderText("Fracht").Format("C2").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("120").Add();
            })
            .AllowPaging()
            .Render()
    </div>
    
    @Html.EJS().ScriptManager()
</body>
```

---

## Best Practices

1. ✓ **Load locale early**: Ensure locale JSON loads before controls initialize
2. ✓ **Load CLDR for formatting**: Required for date/number/currency formatting
3. ✓ **Use standard culture codes**: `de`, `fr`, `es` (ISO 639 codes)
4. ✓ **Store user preference**: Remember user's language choice in session/database
5. ✓ **Test all cultures**: Verify text length, RTL support, date formats
6. ✓ **Document missing locales**: Some cultures may not be supported
7. ✓ **Cache locale files**: Minify and cache locale JSON files in production
8. ✓ **Provide fallback**: Default to `en-US` if requested culture not available

---

## Supported Cultures

| Code | Language | Locale File |
|------|----------|------------|
| `en-US` | English (US) | en.json |
| `de` | German | de.json |
| `de-DE` | German (Germany) | de.json |
| `fr` | French | fr.json |
| `es` | Spanish | es.json |
| `it` | Italian | it.json |
| `pt-BR` | Portuguese (Brazil) | pt.json |
| `zh` | Chinese | zh.json |
| `ja` | Japanese | ja.json |
| `ko` | Korean | ko.json |
| `ar` | Arabic | ar.json |
| `ru` | Russian | ru.json |

Full list: https://github.com/syncfusion/ej2-locale

---

## References

- [Syncfusion Localization](https://ej2.syncfusion.com/aspnetmvc/documentation/common/localization)
- [Syncfusion Globalization](https://ej2.syncfusion.com/aspnetmvc/documentation/common/internationalization)
- [Locale JSON Files Repository](https://github.com/syncfusion/ej2-locale)
- [CLDR Data](https://cldr.unicode.org/)
- [ISO 639 Language Codes](https://www.iso.org/iso-639-language-codes.html)
│   ├── fr.json
│   ├── zh.json
│   └── ... (other cultures)
└── index.html
```

The JSON files contain all Syncfusion® ASP.NET Core controls' locale text.

### Step 3: Statically Set the Culture

For static culture setup, modify `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    ...
    <script>
        var ajax = new ej.base.Ajax(location.origin + '/../../locale/de.json', 'GET', false);
        ajax.send().then((e) => {
            var loader = JSON.parse(e);
            ej.base.L10n.load(loader);
            ej.base.setCulture('de');  // Set culture for ASP.NET Core controls
        });
    </script>
</body>
```

**Example Control Usage:**

```html
<ejs-grid id="Grid" allowPaging="true" allowGrouping="true">
    <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc/Orders/" 
                    adaptor="ODataV4Adaptor" 
                    crossdomain="true">
    </e-data-manager>
    <e-grid-pagesettings pageCount="6"></e-grid-pagesettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer Name" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
        <e-grid-column field="ShipCity" headerText="Ship City" width="170"></e-grid-column>
        <e-grid-column field="ShipCountry" headerText="Ship Country" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Step 4: Dynamically Set the Culture

Allow users to change culture at runtime. Modify `~/Pages/Shared/_Layout.cshtml`:

```html
@model IndexModel
<!DOCTYPE html>
<html lang="en">
<body>
<header>
    ...
    <div>
        <ejs-dropdownlist id="culture-switch" 
                         dataSource="@Model.Cultures" 
                         index="0" 
                         change="onCultureChange" 
                         floatLabelType="Always">
        <e-dropdownlist-fields text="Text" value="ID"></e-dropdownlist-fields>
        </ejs-dropdownlist>
    </div>
</header>

<script>
    function onCultureChange(e) {
        var culture = e.value;
        var ajax = new ej.base.Ajax(location.origin + '/../../locale/' + culture + '.json', 'GET', false);
        ajax.send().then((e) => {
            var loader = JSON.parse(e);
            ej.base.L10n.load(loader);
            ej.base.setCulture(culture);  // Set culture for ASP.NET Core controls
        });
    }
</script>
<body>
</html>
```

**Add culture data in `~/Pages/Index.cshtml.cs`:**

```csharp
public List<CultureDetails> Cultures = new List<CultureDetails>() 
{
    new CultureDetails(){ ID = "en-US", Text = "English" },
    new CultureDetails(){ ID = "de", Text = "Germany" },
    new CultureDetails(){ ID = "fr", Text = "French" },
    new CultureDetails(){ ID = "zh", Text = "Chinese" }
};

public class CultureDetails
{
    public string ID { get; set; }
    public string Text { get; set; }
}
```

### Step 5: Change Locale for Individual Controls

Set the `locale` property on specific controls:

```html
<ejs-grid id="Grid" allowPaging="true" locale="de-DE" allowGrouping="true">
    <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc/Orders/" 
                    adaptor="ODataV4Adaptor" 
                    crossdomain="true">
    </e-data-manager>
    <e-grid-pagesettings pageCount="6"></e-grid-pagesettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer Name" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    ej.base.L10n.load({
        'de-DE': {
            'grid': {
                'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
                'GroupDropArea': 'Ziehen Sie einen Spaltenkopf hier, um die Gruppe ihre Spalte',
                'UnGroup': 'Klicken Sie hier, um die Gruppierung aufheben',
                'Item': 'Artikel',
                'Items': 'Artikel'
            },
            'pager': {
                'currentPageInfo': '{0} von {1} Seiten',
                'totalItemsInfo': '({0} Beiträge)',
                'firstPageTooltip': 'Zur ersten Seite',
                'lastPageTooltip': 'Zur letzten Seite',
                'nextPageTooltip': 'Zur nächsten Seite',
                'previousPageTooltip': 'Zurück zur letzten Seit'
            }
        }
    });
    ej.base.setCulture('de');
</script>
```

> **Important:** Load locale text before changing culture globally using `L10n.load()`.

---

## Globalization (L18N) & Internationalization

Globalization handles parsing and formatting of dates and numbers based on culture-specific rules.

### Setting Global Culture and Currency

#### Loading Culture Data

CLDR (Common Locale Data Repository) data is required for cultures other than `en-US`:

| CLDR Data | Location |
|---|---|
| ca-gregorian | `cldr/main/en/ca-gregorian.json` |
| timeZoneNames | `cldr/main/en/timeZoneNames.json` |
| numbers | `cldr/main/en/numbers.json` |
| numberingSystems | `cldr/supplemental/numberingSystems.json` |
| currencies | `cldr/main/en/currencies.json` |

> **Note:** For `en`, dependency files are already loaded in the library.

#### Setting Global Culture

```html
<script>
    ej.base.setCulture('ar');  // Set Arabic culture globally
</script>
```

#### Setting Currency Code

```html
<script>
    ej.base.setCurrencyCode('QAR');  // Set Qatari Riyal
</script>
```

> **Default:** If global culture is not set, `en-US` is the default locale and `USD` is the default currency.

---

## CLDR Data Setup

For controls like Schedule that require culture-specific data (dates, numbers, calendars), CLDR data must be configured.

### Step 1: Install CLDR Data Package

```bash
npm install cldr-data
```

### Step 2: Create CLDR Folder Structure in wwwroot

```
wwwroot/
├── cldr-data/
│   ├── supplemental/
│   │   └── numberingSystems.json
│   └── main/
│       ├── en/
│       │   ├── ca-gregorian.json
│       │   ├── numbers.json
│       │   ├── timeZoneNames.json
│       │   ├── ca-islamic.json
│       │   └── currencies.json
│       ├── fr-CH/
│       │   ├── ca-gregorian.json
│       │   ├── numbers.json
│       │   ├── timeZoneNames.json
│       │   └── ca-islamic.json
│       └── ... (other cultures)
└── index.html
```

### Step 3: Copy Required CLDR Files

Required files for most controls:
- `numberingSystems.json` (from `node_modules/cldr-data/supplemental`)
- `ca-gregorian.json` (culture-specific)
- `numbers.json` (culture-specific)
- `timeZoneNames.json` (culture-specific)
- `ca-islamic.json` (culture-specific)

### Step 4: Load Culture Files in HTML

```html
<script>
    loadCultureFiles('fr-CH');
    
    function loadCultureFiles(name) {
        var files = ['ca-gregorian.json', 'numberingSystems.json', 'numbers.json', 'timeZoneNames.json', 'ca-islamic.json'];
        var loader = ej.base.loadCldr;
        var loadCulture = function (prop) {
            var val, ajax;
            if (files[prop] === 'numberingSystems.json') {
                ajax = new ej.base.Ajax(location.origin + '/../cldr-data/supplemental/' + files[prop], 'GET', false);
            } else {
                ajax = new ej.base.Ajax(location.origin + '/../cldr-data/main/' + name + '/' + files[prop], 'GET', false);
            }
            ajax.onSuccess = function (value) {
                val = value;
            };
            ajax.send();
            loader(JSON.parse(val));
        };
        for (var prop = 0; prop < files.length; prop++) {
            loadCulture(prop);
        }
    }
</script>
```

### Step 5: Apply Culture to Schedule Control

```html
@using Syncfusion.EJ2
@{
    var dataManager = new DataManager()
    {
        Url = "https://services.syncfusion.com/aspnet/production/api/Schedule",
        Adaptor = "ODataV4Adaptor",
        CrossDomain = true
    };
}

<ejs-schedule id="schedule" 
              width="100%" 
              height="550" 
              selectedDate="DateTime.Now" 
              readonly="true" 
              locale="fr-CH">
    <e-schedule-eventsettings dataSource="dataManager">
    </e-schedule-eventsettings>
</ejs-schedule>

<script>
    loadCultureFiles('fr-CH');
    // ... loadCultureFiles function code
</script>
```

---

## Code Examples

### Number Formatting and Parsing

#### Number Format Options

| Property | Description | Values |
|---|---|---|
| format | Format type (N/C/P) | `N` (numeric), `C` (currency), `P` (percentage) |
| minimumFractionDigits | Min fraction digits | 0-20 |
| maximumFractionDigits | Max fraction digits | 0-20 |
| minimumSignificantDigits | Min significant digits | 1-21 |
| maximumSignificantDigits | Max significant digits | 1-21 |
| useGrouping | Enable group separator | true/false |
| minimumIntegerDigits | Min integer digits | 1-21 |
| currency | Currency code | e.g., `USD`, `EUR`, `QAR` |

#### Number Formatting Example

```html
<div>Value:<span class='format text'>12345.65</span></div>
<div>Formatted Value:<span class='result text'></span></div>

<script>
    var intl = new ej.base.Internationalization();
    var nFormatter = intl.getNumberFormat({ 
        skeleton: 'C3', 
        currency: 'USD',
        minimumIntegerDigits: 8
    });
    var formattedValue = nFormatter(1234545.65);
    document.querySelector('.result').innerHTML = formattedValue;
</script>
```

#### Custom Number Format Specifiers

| Specifier | Description | Example |
|---|---|---|
| `0` | Digit placeholder | `instance.formatNumber(123, {format: '0000'})` → `'0123'` |
| `#` | Optional digit | `instance.formatNumber(1234, {format: '####'})` → `'1234'` |
| `.` | Decimal point | `instance.formatNumber(546321, {format: '###0.##0#'})` → `'546321.000'` |
| `%` | Percentage | `instance.formatNumber(1, {format: '0000 %'})` → `'0100 %'` |
| `$` | Currency | `instance.formatNumber(13, {format: '$ ###.00'})` → `'$ 13.00'` |
| `;` | Format separator | Positive; Negative; Zero |
| `'String'` | Literal text | `instance.formatNumber(-123.44, {format: "####.## '@'"})` → `'123.44 @'` |

#### Number Parsing Example

```html
<div>FormattedValue:<span class='format text'>$01,234,545.650</span></div>
<div>ParsedOutput:<span class='result text'></span></div>

<script>
    var intl = new ej.base.Internationalization();
    var val = intl.parseNumber('$01,234,545.650', { 
        format: 'C3', 
        currency: 'USD', 
        minimumIntegerDigits: 8 
    });
    document.querySelector('.result').innerHTML = val + '';
</script>
```

### Date and DateTime Formatting

#### Date Format Skeletons

**Date Type Skeletons:**

| Skeleton | Example Output |
|---|---|
| short | `11/4/16` |
| medium | `Nov 4, 2016` |
| long | `November 4, 2016` |
| full | `Friday, November 4, 2016` |

**Time Type Skeletons:**

| Skeleton | Example Output |
|---|---|
| short | `1:03 PM` |
| medium | `1:03:04 PM` |
| long | `1:03:04 PM GMT+5` |
| full | `1:03:04 PM GMT+05:30` |

**DateTime Type Skeletons:**

| Skeleton | Example Output |
|---|---|
| short | `11/4/16, 1:03 PM` |
| medium | `Nov 4, 2016, 1:03:04 PM` |
| long | `November 4, 2016 at 1:03:04 PM GMT+5` |
| full | `Friday, November 4, 2016 at 1:03:04 PM GMT+05:30` |

#### Additional Date Skeletons

| Skeleton | Output |
|---|---|
| `d` | `7` |
| `E` | `Mon` |
| `Ed` | `7 Mon` |
| `Ehm` | `Mon 12:43 AM` |
| `yMd` | `11/7/2016` |
| `yMEd` | `Mon, 11/7/2016` |
| `GyMMM` | `Nov 2016 AD` |

#### Date Formatting Example

```html
<div>DateValue:<span class='format text'>new Date('1/12/2014 10:20:33')</span></div>
<div>Formatted Value:<span class='result text'></span></div>

<script>
    var intl = new ej.base.Internationalization();
    var dFormatter = intl.getDateFormat({ 
        skeleton: 'full', 
        type: 'dateTime' 
    });
    var formattedString = dFormatter(new Date('1/12/2014 10:20:33'));
    document.querySelector('.result').innerHTML = formattedString;
</script>
```

#### Custom Date Format Specifiers

| Specifier | Description |
|---|---|
| `G` | Era |
| `y` | Year |
| `M / L` | Month |
| `E / c` | Day of week |
| `d` | Day of month |
| `h / H` | Hour (h=12-hour, H=24-hour) |
| `m` | Minutes |
| `s` | Seconds |
| `f` | Milliseconds |
| `a` | AM/PM designator |
| `z` | Time zone |
| `'String'` | Literal text (single quotes) |

#### Custom Date Format Example

```html
<div>DateValue:<span class='format text'>new Date('1/12/2014 10:20:33')</span></div>
<div>Formatted Value:<span class='result text'></span></div>

<script>
    var intl = new ej.base.Internationalization();
    var formattedString = intl.formatDate(
        new Date('1/12/2014 10:20:33'), 
        { format: '\'year:\'y MM \'month:\' MM' }
    );
    document.querySelector('.result').innerHTML = formattedString;
</script>
```

#### Date Parsing Example

```html
<div>FormattedValue:<span class='format text'>11/2016</span></div>
<div>ParsedValue:<span class='result text'></span></div>

<script>
    var intl = new ej.base.Internationalization();
    var val = intl.parseDate('11/2016', {skeleton: 'yM'});
    document.querySelector('.result').innerHTML = val.toString();
</script>
```

---

## Best Practices

### Localization Best Practices

1. **Load Culture Data Early**: Load locale JSON files before rendering controls
2. **Use L10n.load()**: Always use the `L10n.load()` method to register locale data
3. **Test Multiple Cultures**: Test your application in different languages and regions
4. **Keep JSON Files Updated**: Update locale files when upgrading Syncfusion®
5. **Document Custom Translations**: If you add custom locale text, document it clearly

### Globalization Best Practices

1. **Load CLDR Data for Non-English Cultures**: Always load CLDR data for Schedule and date/time controls
2. **Set Global Culture Early**: Configure global culture and currency at application startup
3. **Use Culture-Appropriate Formats**: Format numbers and dates according to the selected culture
4. **Test Number/Date Parsing**: Ensure proper parsing of user-entered values in different formats
5. **Consider Performance**: CLDR data can be large; lazy-load cultures only when needed

### Naming Conventions

- **Locale codes**: Use standard BCP 47 format (e.g., `en-US`, `de-DE`, `fr-FR`)
- **Culture identifiers**: Use lowercase with hyphen separator (e.g., `en-us`, `de`, `fr-ch`)
- **JSON file names**: Match culture codes (e.g., `en-US.json`, `de.json`)

### Performance Tips

1. **Preload Only Used Cultures**: Don't preload all CLDR data; load only what your app needs
2. **Cache Formatters**: Cache formatter functions if formatting many values
3. **Lazy-Load Locale Files**: Load culture files on-demand when user changes language
4. **Use Minified Files**: Use minified CLDR and locale files in production

---

