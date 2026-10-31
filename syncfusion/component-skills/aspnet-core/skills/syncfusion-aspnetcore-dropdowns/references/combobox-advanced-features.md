# Advanced Features

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Internationalization (i18n)](#internationalization-i18n)
- [RTL Support](#rtl-support)
- [Accessibility (WCAG)](#accessibility-wcag)
- [Disabled Items](#disabled-items)
- [Keyboard Navigation](#keyboard-navigation)

---

## Virtual Scrolling

### Enable Virtual Scrolling for Large Datasets

Virtual scrolling renders only visible items, dramatically improving performance with 10,000+ items.

> **Important:** `EnableVirtualization` works best with remote data or large local datasets. Ensure `PopupHeight` is set to enable virtual rendering.

**Controller:**
```csharp
public class ComboBoxController : Controller
{
    public ActionResult Index()
    {
        // 50,000 items
        List<ComboBoxData> largeDataset = new List<ComboBoxData>();
        for (int i = 1; i <= 50000; i++)
        {
            largeDataset.Add(new ComboBoxData { Id = i, Name = $"Item {i}" });
        }
        ViewBag.LargeDataset = largeDataset;
        return View();
    }
}

public class ComboBoxData
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

**View (Razor):**
```html
<ejs-combobox id="large-combo" 
    dataSource="ViewBag.LargeDataset"
    enableVirtualization="true"
    allowFiltering="true"
    popupHeight="300px"
    placeholder="Searching 50,000 items efficiently...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

**Benefits:**
- ✅ Handles 50,000+ items without lag
- ✅ Smooth scrolling with filtering
- ✅ Reduced memory usage
- ✅ Faster initial render

**When to use:**
- >5,000 items
- Large remote datasets
- Performance-critical applications

### Performance Comparison

| Scenario | Without Virtual Scroll | With Virtual Scroll |
|----------|----------------------|-------------------|
| 1,000 items | 50ms render | 45ms render |
| 10,000 items | 500ms render | 80ms render |
| 50,000 items | 3,000ms+ (lag) | 120ms render |

---

## Internationalization (i18n)

### Change Language/Locale

**Startup.cs (Configure method):**
```csharp
app.UseRequestLocalization(new RequestLocalizationOptions()
    .AddSupportedCultures("es-ES", "en-US", "fr-FR", "de-DE")
    .AddSupportedUICultures("es-ES", "en-US", "fr-FR", "de-DE")
    .SetDefaultCulture("es-ES"));
```

**Controller:**
```csharp
public ActionResult Index()
{
    List<ComboBoxData> items = new List<ComboBoxData>
    {
        new ComboBoxData { Id = 1, Name = "Opción 1" },
        new ComboBoxData { Id = 2, Name = "Opción 2" }
    };
    ViewBag.Items = items;
    ViewBag.Locale = CultureInfo.CurrentCulture.Name;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="combo" 
    dataSource="ViewBag.Items"
    locale="@ViewBag.Locale"
    placeholder="Seleccionar...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

**Supported locales:**
- `en-US` - English (USA)
- `es-ES` - Spanish
- `fr-FR` - French
- `de-DE` - German
- `ar-AE` - Arabic
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- And 20+ more...

### Custom Localization

Create custom locale strings in `_Layout.cshtml`:
```html
<script>
  new Syncfusion.Localization.L10n({
    'es-ES': {
      'dropdowns': {
        'noRecordsTemplate': 'Sin registros encontrados',
        'actionFailureTemplate': 'Los datos se cargaron sin éxito',
        'actionCompleteTemplate': 'Acción completada'
      }
    }
  });
</script>
```

---

## RTL Support

### Enable RTL Layout

**View (Razor):**
```html
<ejs-combobox id="combo" 
    dataSource="ViewBag.Items"
    enableRtl="true"
    placeholder="اختر عنصرًا">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

**Global RTL (in _Layout.cshtml):**
```html
<html dir="rtl">
  <head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material-rtl.css">
  </head>
  <body>
    <!-- Content -->
  </body>
</html>
```

---

## Accessibility (WCAG)

### ARIA Labels and Descriptions

**View (Razor):**
```html
<label for="combo-select">Select a Category:</label>
<ejs-combobox id="combo-select"
    dataSource="ViewBag.Items">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
<span id="combo-help">Use arrow keys to navigate, Enter to select</span>
```

### Keyboard Navigation Support

The ComboBox automatically supports these keyboard shortcuts:

| Key | Action |
|-----|--------|
| **Arrow Down** | Select next item |
| **Arrow Up** | Select previous item |
| **Enter** | Select item |
| **Esc** | Close dropdown |
| **Home** | Go to first item |
| **End** | Go to last item |

---

## Disabled Items

### Disable Entire ComboBox

**View (Razor):**
```html
<ejs-combobox id="combo" 
    dataSource="ViewBag.Items"
    enabled="false"
    placeholder="Disabled ComboBox">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

### Disable Specific Items

**Controller:**
```csharp
public class ComboBoxItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool Disabled { get; set; }
}

public ActionResult Index()
{
    List<ComboBoxItem> items = new List<ComboBoxItem>
    {
        new ComboBoxItem { Id = 1, Name = "Active", Disabled = false },
        new ComboBoxItem { Id = 2, Name = "Inactive", Disabled = true },
        new ComboBoxItem { Id = 3, Name = "Pending", Disabled = false }
    };
    ViewBag.Items = items;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="combo" 
    dataSource="ViewBag.Items"
    placeholder="Select an option">
    <e-combobox-fields text="Name" value="Id" disabled="Disabled"></e-combobox-fields>
</ejs-combobox>
```

---

## Keyboard Navigation

The ComboBox component provides comprehensive keyboard support for accessible data entry:

| Key Combination | Behavior |
|-----------------|----------|
| **Alt + Down Arrow** | Open popup |
| **Alt + Up Arrow** | Close popup |
| **Down Arrow** | Navigate to next item |
| **Up Arrow** | Navigate to previous item |
| **Page Down** | Scroll down one page |
| **Page Up** | Scroll up one page |
| **Home** | Navigate to first item |
| **End** | Navigate to last item |
| **Enter** | Select highlighted item |
| **Esc** | Close popup without selecting |

All keyboard navigation is enabled by default with no additional configuration required.
