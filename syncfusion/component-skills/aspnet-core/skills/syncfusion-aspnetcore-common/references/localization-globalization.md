# Localization and Globalization Guide for ASP.NET Core

## Table of Contents
- [Overview](#overview)
- [Localization (L10N)](#localization-l10n)
- [Globalization (L18N) and Internationalization](#globalization-l18n--internationalization)
- [CLDR Data Setup](#cldr-data-setup)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)

---

## Overview

**Globalization** is the combination of adapting controls to various languages by:
- **Internationalization (L18N)**: Parsing and formatting dates and numbers for different cultures
- **Localization (L10N)**: Translating text and adding cultural-specific customizations

### Default Settings

- **Default Locale**: American English (`en-US`)
- **Default Currency**: USD

---

## Localization (L10N)

Localization is the process of adapting application controls and content to the desired language with its corresponding region.

### Step 1: Install Locale Package

Install the Syncfusion locale data package:

```bash
npm install @syncfusion/ej2-locale
```

### Step 2: Setup Locale Folder

Once installed, copy culture-specific JSON files to your application:

1. Create a `locale` folder inside `wwwroot`
2. Copy locale files from `node_modules/@syncfusion/ej2-locale/src` to `wwwroot/locale`

**Example folder structure:**
```
wwwroot/
├── locale/
│   ├── en.json
│   ├── de.json
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

