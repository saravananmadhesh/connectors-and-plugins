# Localization and Internationalization — MultiColumn ComboBox

## Table of Contents
- [Enable Localization](#enable-localization)
- [Supported Languages](#supported-languages)
- [Custom Localization](#custom-localization)
- [RTL Support](#rtl-support)
- [Date and Number Formatting](#date-and-number-formatting)
- [Translation Integration](#translation-integration)

---

## Enable Localization

### Basic Localization

```cshtml
@{
    ViewBag.Culture = "es";  // Spanish
}

<html lang="@ViewBag.Culture">
<head>
    <!-- Localized CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-locales@latest/es.js" />
</head>
<body>
    <ejs-multicolumncombobox id="combo"
        dataSource="@ViewBag.employees"
        locale="@ViewBag.Culture"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Nombre" width="150px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
    
    <script src="https://cdn.jsdelivr.net/npm/ej2-locales@latest/es.js"></script>
</body>
</html>
```

### Get User Locale

```csharp
public IActionResult Index()
{
    var userLocale = CultureInfo.CurrentCulture.Name; // "es-ES", "en-US", etc.
    var language = CultureInfo.CurrentCulture.TwoLetterISOLanguageName; // "es", "en"
    
    ViewBag.Locale = language;
    ViewBag.employees = GetEmployees();
    
    return View();
}
```

---

## Supported Languages

### Available Locales

| Code | Language | File |
|------|----------|------|
| `en` | English | `en.js` |
| `es` | Spanish | `es.js` |
| `de` | German | `de.js` |
| `fr` | French | `fr.js` |
| `pt` | Portuguese | `pt.js` |
| `ja` | Japanese | `ja.js` |
| `zh` | Chinese | `zh.js` |
| `ar` | Arabic | `ar.js` |
| `ru` | Russian | `ru.js` |
| `hi` | Hindi | `hi.js` |

### Load Multiple Languages

```cshtml
<head>
    <!-- English (default) -->
    <script src="https://cdn.jsdelivr.net/npm/ej2-locales@latest/en.js"></script>
    <!-- Spanish -->
    <script src="https://cdn.jsdelivr.net/npm/ej2-locales@latest/es.js"></script>
    <!-- French -->
    <script src="https://cdn.jsdelivr.net/npm/ej2-locales@latest/fr.js"></script>
    <!-- German -->
    <script src="https://cdn.jsdelivr.net/npm/ej2-locales@latest/de.js"></script>
</head>

<body>
    <select id="languageSelector" onchange="changeLanguage()">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
    </select>
    
    <ejs-multicolumncombobox id="combo"
        dataSource="@ViewBag.employees"
        locale="en"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
    
    <script>
    function changeLanguage() {
        let locale = document.getElementById('languageSelector').value;
        let combo = document.getElementById('combo').ej2_instances[0];
        
        combo.locale = locale;
        combo.refresh();
    }
    </script>
</body>
```

---

## Custom Localization

### Add Custom Locale

```javascript
// Define custom strings for Spanish
let customLocale = {
    'es': {
        'grid': {
            'EmptyRecord': 'Sin registros encontrados',
            'Pager': {
                'currentPageInfo': '{currentPageInfo} de {totalPageInfo} páginas',
                'totalItemsInfo': 'Mostrando {totalItems} registros',
                'firstPageTooltip': 'Primera página',
                'lastPageTooltip': 'Última página',
                'nextPageTooltip': 'Siguiente',
                'previousPageTooltip': 'Anterior'
            }
        },
        'multicolumncombobox': {
            'noRecordsTemplate': 'No se encontraron registros',
            'actionFailureTemplate': 'Ha ocurrido un error'
        }
    }
};

// Register custom locale
ej2.base.L10n.load(customLocale);
```

### Override Default Messages

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

combo.localeString = {
    'noRecordsTemplate': 'Ningún empleado disponible',
    'placeholder': 'Buscar empleado...'
};
```

### Create Complete Locale File

**File: locale-es.json**

```json
{
  "es": {
    "grid": {
      "EmptyRecord": "Sin registros disponibles",
      "Pager": {
        "currentPageInfo": "{currentPageInfo} de {totalPageInfo}",
        "totalItemsInfo": "Total de {totalItems} registros"
      }
    },
    "multicolumncombobox": {
      "noRecordsTemplate": "No hay coincidencias",
      "actionFailureTemplate": "Error al cargar datos"
    },
    "datepicker": {
      "placeholder": "Seleccionar fecha",
      "today": "Hoy"
    }
  }
}
```

```csharp
public IActionResult GetLocale(string lang)
{
    // Load locale from JSON file
    string jsonPath = $"wwwroot/locales/locale-{lang}.json";
    
    if (!System.IO.File.Exists(jsonPath))
        jsonPath = "wwwroot/locales/locale-en.json";
    
    string json = System.IO.File.ReadAllText(jsonPath);
    return Content(json, "application/json");
}
```

---

## RTL Support

### Enable RTL Layout

```cshtml
<html dir="rtl" lang="ar">
<head>
    <!-- RTL CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-rtl@latest/ej2-rtl.css" />
</head>
<body>
    <ejs-multicolumncombobox id="combo"
        dataSource="@ViewBag.employees"
        locale="ar"
        enableRtl="true"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="المعرّف" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="الاسم" width="150px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="Designation" header="المسمى الوظيفي" width="120px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
</body>
</html>
```

### RTL CSS Customization

```css
/* RTL-specific styles */
.e-rtl .e-multicolumncombobox {
    direction: rtl;
    text-align: right;
}

.e-rtl .e-grid .e-gridcontent {
    direction: rtl;
}

.e-rtl .e-ddl-icon {
    left: auto;
    right: 8px;
}

/* Mirror icons */
.e-rtl .e-icon-arrow-down::before {
    transform: scaleX(-1);
}
```

### Dynamic RTL Toggle

```javascript
function toggleRtl() {
    let combo = document.getElementById('combo').ej2_instances[0];
    let htmlElement = document.documentElement;
    
    combo.enableRtl = !combo.enableRtl;
    htmlElement.dir = combo.enableRtl ? 'rtl' : 'ltr';
    
    combo.refresh();
}
```

---

## Date and Number Formatting

### Format Dates in Locale

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    locale="@ViewBag.Culture"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <!-- Date column with locale-specific formatting -->
        <e-multicolumncombobox-column field="JoinDate" header="Join Date" width="120px"
            type="date" format="yMd"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

**Format Patterns:**
- `yMd` - 1/15/2023 (en-US) | 15/1/2023 (es-ES)
- `medium` - Jan 15, 2023
- `long` - January 15, 2023
- `full` - Sunday, January 15, 2023

### Format Numbers in Locale

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    locale="es"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <!-- Currency formatting by locale -->
        <e-multicolumncombobox-column field="Salary" header="Salary" width="120px"
            type="number" format="C2"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

**Formats:**
- `C2` - $1,250.50 (en-US) | 1.250,50 € (es-ES)
- `N2` - 1,250.50 (en-US) | 1.250,50 (es-ES)
- `P0` - 50% (universal)

---

## Translation Integration

### Integration with Resource Files

**Resource: Resources/Employees.resx (English)**
```
EmployeeID = Employee ID
Name = Employee Name
Salary = Salary
JoinDate = Join Date
```

**Resource: Resources/Employees.es.resx (Spanish)**
```
EmployeeID = Identificación del Empleado
Name = Nombre del Empleado
Salary = Salario
JoinDate = Fecha de Ingreso
```

**Controller:**

```csharp
public IActionResult Index()
{
    var culture = CultureInfo.CurrentCulture;
    
    ViewBag.headers = new {
        employeeId = Localizer["EmployeeID"],
        name = Localizer["Name"],
        salary = Localizer["Salary"],
        joinDate = Localizer["JoinDate"]
    };
    
    ViewBag.employees = GetEmployees();
    return View();
}
```

**View:**

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    locale="@CultureInfo.CurrentCulture.TwoLetterISOLanguageName"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" 
            header="@ViewBag.headers.employeeId" width="80px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" 
            header="@ViewBag.headers.name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Salary" 
            header="@ViewBag.headers.salary" width="120px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="JoinDate" 
            header="@ViewBag.headers.joinDate" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Third-Party Translation Library

```csharp
// Using Microsoft.Extensions.Localization
public class EmployeeController : Controller
{
    private readonly IStringLocalizer<EmployeeController> _localizer;
    
    public EmployeeController(IStringLocalizer<EmployeeController> localizer)
    {
        _localizer = localizer;
    }
    
    public IActionResult Index()
    {
        ViewBag.columnHeaders = new {
            id = _localizer["ID"],
            name = _localizer["Name"],
            designation = _localizer["Designation"],
            salary = _localizer["Salary"]
        };
        
        return View();
    }
}
```

### Translation JSON Files

**File: wwwroot/locales/en.json**
```json
{
  "EmployeeID": "Employee ID",
  "EmployeeName": "Name",
  "Designation": "Designation",
  "Salary": "Salary",
  "Department": "Department",
  "JoinDate": "Join Date"
}
```

**File: wwwroot/locales/es.json**
```json
{
  "EmployeeID": "Identificación del Empleado",
  "EmployeeName": "Nombre",
  "Designation": "Cargo",
  "Salary": "Salario",
  "Department": "Departamento",
  "JoinDate": "Fecha de Ingreso"
}
```

```javascript
async function loadTranslations(locale) {
    let response = await fetch(`/locales/${locale}.json`);
    let translations = await response.json();
    
    let combo = document.getElementById('combo').ej2_instances[0];
    
    // Update column headers
    let columns = combo.gridSettings.columns;
    for (let col of columns) {
        if (translations[col.field]) {
            col.header = translations[col.field];
        }
    }
    
    combo.refresh();
}
```

---

## Best Practices

| Practice | Benefit | Notes |
|----------|---------|-------|
| Set locale on server | Performance | Avoid client-side locale detection |
| Preload locale files | UX | Faster initial render |
| Separate locale files | Maintainability | Easy to update translations |
| Use resource files | Consistency | Centralized translations |
| Test RTL layouts | Quality | Ensure proper formatting |
| Format dates by locale | Usability | Users see familiar date format |
