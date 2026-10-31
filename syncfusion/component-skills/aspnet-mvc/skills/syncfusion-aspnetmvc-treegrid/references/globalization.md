# Globalization in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Localization](#localization)
- [Number & Date Formatting](#number--date-formatting)
- [Multi-language Interface](#multi-language-interface)
- [Locale-aware Features](#locale-aware-features)

## When to Use This

Use globalization features when you need to:
- Support multiple languages and regions
- Display dates and numbers in locale-specific formats
- Enable right-to-left (RTL) layouts for Arabic, Hebrew, etc.
- Create applications for international audiences
- Adapt UI text to user's preferred language

## RTL (Right-to-Left) Support

### Enable RTL

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableRtl(true)               // Enable right-to-left layout
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("الرقم").Width("80").Add();
        col.Field("TaskName").HeaderText("اسم المهمة").Width("200").Add();
        col.Field("Status").HeaderText("الحالة").Width("120").Add();
    })
    .Render()
```

**RTL Features:**
- All content flows right-to-left
- Column order reversed
- Scrollbar on left side
- Text alignment changed
- Icons flipped appropriately

### RTL CSS

```css
/* RTL Styling */
.e-rtl .e-grid {
    direction: rtl;
    text-align: right;
}

.e-rtl .e-headercell,
.e-rtl .e-rowcell {
    text-align: right;
    padding-right: 15px;
    padding-left: 5px;
}

.e-rtl .e-grid .e-gridcontent {
    margin-left: 0;
    margin-right: 0;
}
```

## Localization

### Set Locale Language

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Locale("ar-AE")               // Arabic (UAE)
    .AllowPaging(true)
    .AllowFiltering(true)
    .AllowSorting(true)
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("معرف المهمة").Width("80").Add();
        col.Field("TaskName").HeaderText("اسم المهمة").Width("200").Add();
    })
    .Render()
```

**Supported Locales:**
- `en-US`: English (USA)
- `en-GB`: English (UK)
- `de`: German
- `es`: Spanish
- `fr`: French
- `ar-AE`: Arabic
- `ja-JP`: Japanese
- `zh-CN`: Chinese (Simplified)
- `ko-KR`: Korean

### Custom Localization

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Locale("fr-FR")              // French
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Nom de la tâche").Width("200").Add();
        col.Field("StartDate").HeaderText("Date de début").Type("date").Format("dd/MM/yyyy").Width("120").Add();
    })
    .Render()
```

### Custom Locale Strings

```html
<script>
// Define custom locale
var customLocale = {
    'fr-FR': {
        'pagerExcelExport': 'Exporter vers Excel',
        'pagerPdfExport': 'Exporter vers PDF',
        'pagerAdd': 'Ajouter une nouvelle ligne',
        'pagerEdit': 'Éditer',
        'pagerDelete': 'Supprimer'
    }
};

// Apply custom locale
ej.base.L10n.load(customLocale);

// Then create Grid with locale
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Locale("fr-FR")
    .Render()
</script>
```

## Number & Date Formatting

### Number Formatting by Locale

```csharp
// en-US: 1,234.56
// de-DE: 1.234,56
// fr-FR: 1 234,56
```

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Locale("de-DE")              // German formatting
    .Columns(col =>
    {
        col.Field("Budget")
           .HeaderText("Budget")
           .Type("number")
           .Format("C2")          // Currency with 2 decimals
           .Width("120")
           .Add();
           
        col.Field("Quantity")
           .HeaderText("Menge")
           .Type("number")
           .Format("N0")          // Number with thousands separator
           .Width("100")
           .Add();
    })
    .Render()
```

### Date Formatting by Locale

```csharp
// en-US: 03/19/2026
// de-DE: 19.03.2026
// fr-FR: 19/03/2026
// ja-JP: 2026/03/19
```

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Locale("ja-JP")              // Japanese date format
    .Columns(col =>
    {
        col.Field("StartDate")
           .HeaderText("開始日")
           .Type("date")
           .Format("yyyy/MM/dd")  // Japanese format
           .Width("120")
           .Add();
           
        col.Field("EndDate")
           .HeaderText("終了日")
           .Type("date")
           .Format("yyyy/MM/dd")
           .Width("120")
           .Add();
    })
    .Render()
```

## Multi-language Interface

### Language Switcher

```html
<select onchange="changeLanguage(this.value)">
    <option value="en-US">English</option>
    <option value="fr-FR">Français</option>
    <option value="de-DE">Deutsch</option>
    <option value="ar-AE">العربية</option>
</select>

<div id="TreeGrid">
    @Html.EJS().TreeGrid("TreeGrid")
        .DataSource(ViewBag.DataSource)
        .Locale("en-US")
        .Render()
</div>

<script>
function changeLanguage(locale) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.locale = locale;
    grid.refresh();
    
    console.log("Grid language changed to: " + locale);
}
</script>
```

## Locale-aware Features

### Locale Affects:

1. **Column Headers** - Translated
2. **Paging Text** - "First", "Previous", "Next", "Last"
3. **Filter Menu** - Filter operators text
4. **Edit Dialog** - Button captions
5. **Export** - Sheet names, headers
6. **Number Format** - Decimal separator, thousands separator
7. **Date Format** - Day, month, year order
8. **Time Format** - 12-hour vs 24-hour

### Complete RTL + Arabic Example

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableRtl(true)
    .Locale("ar-AE")
    .AllowPaging(true)
    .AllowFiltering(true)
    .AllowExcelExport(true)
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("رقم المهمة").Width("80").Add();
        col.Field("TaskName").HeaderText("اسم المهمة").Width("200").Add();
        col.Field("StartDate").HeaderText("تاريخ البدء").Type("date").Format("dd/MM/yyyy").Width("120").Add();
        col.Field("Budget").HeaderText("الميزانية").Type("number").Format("C2").Width("120").Add();
        col.Field("Status").HeaderText("الحالة").Width("120").Add();
    })
    .Render()
```
