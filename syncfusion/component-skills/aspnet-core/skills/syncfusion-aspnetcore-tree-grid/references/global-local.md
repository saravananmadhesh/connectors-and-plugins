# Globalization & Localization — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Globalization (Number and Date Formatting)](#globalization-number-and-date-formatting)
- [Localization (UI Strings)](#localization-ui-strings)
- [RTL (Right-to-Left) Layout](#rtl-right-to-left-layout)

## When to Use This

- Apply culture-specific number and date formatting to TreeGrid columns
- Localize UI strings for different languages (toolbar, dialogs, pager, filter)
- Implement right-to-left (RTL) layouts for Arabic, Hebrew, and other RTL languages
- Support multiple locales and regions for global applications
- Format currency, date, and number values by culture
- Translate expand/collapse and hierarchy-related UI text

---

## Globalization (Number and Date Formatting)

Set the `locale` property to apply locale-specific number and date formatting for all numeric and date columns:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData" 
              childMapping="Children" treeColumnIndex="1"
              locale="de">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Budget" headerText="Budget" 
                           format="C2" type="number" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="Progress" headerText="Progress" 
                           format="N2" type="number" textAlign="Right" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Supported Locales**: `en`, `de`, `fr`, `es`, `it`, `ja`, `zh`, `ar`, `ru`, etc.

Load locale data via `ej.base.setCulture()` in JavaScript for the specific culture:

```javascript
// Set the culture for globalization
ej.base.setCulture('de');

// Load CLDR data for the locale
ej.base.setCldrData({
    // CLDR data for 'de' locale
});
```

Or use Syncfusion's CLDR data package via CDN:

```html
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/locale/de.json"></script>
```

**Format Examples**:
- `C2` — Currency with 2 decimal places (e.g., €1,234.56)
- `N2` — Number with 2 decimal places (e.g., 1.234,56)
- `yMd` — Date format (e.g., 15.3.2024 for German)
- `d` — Date format based on locale (short date)
- `P` — Percentage format

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData" 
              childMapping="Children" treeColumnIndex="1"
              locale="fr">
    <e-treegrid-columns>
        <!-- French culture: currency shows as €, decimals use comma -->
        <e-treegrid-column field="ProjectCost" headerText="Coût du Projet" 
                           format="C2" type="number" width="120"></e-treegrid-column>
        <!-- French date format: dd/MM/yyyy -->
        <e-treegrid-column field="Deadline" headerText="Délai" 
                           format="yMd" type="date" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Localization (UI Strings)

Translate TreeGrid UI text (toolbar labels, dialog text, filter captions, pager text, expand/collapse text, etc.) by loading a locale JSON:

```javascript
ej.base.L10n.load({
    'de': {
        'treegrid': {
            'EmptyRecord': 'Keine Aufzeichnungen zum Anzeigen',
            'EmptyDataSourceError': 'DataSource darf bei der ersten Ladung nicht leer sein',
            'Add': 'Hinzufügen',
            'Edit': 'Bearbeiten',
            'Cancel': 'Stornieren',
            'Update': 'Aktualisieren',
            'Delete': 'Löschen',
            'Print': 'Drucken',
            'Search': 'Suche',
            'FilterButton': 'Filtern',
            'ClearButton': 'Löschen',
            'StartsWith': 'Beginnt mit',
            'EndsWith': 'Endet mit',
            'Contains': 'Enthält',
            'Equal': 'Gleich',
            'NotEqual': 'Ungleich',
            'LessThan': 'Kleiner als',
            'GreaterThan': 'Größer als'
        },
        'pager': {
            'currentPageInfo': '{0} von {1} Seiten',
            'totalItemsInfo': '({0} Beiträge)',
            'firstPageTooltip': 'Zur ersten Seite',
            'lastPageTooltip': 'Zur letzten Seite',
            'nextPageTooltip': 'Zur nächsten Seite',
            'previousPageTooltip': 'Zurück zur vorherigen Seite'
        }
    }
});
```

Then set the `locale` on the TreeGrid:

```cshtml
<ejs-treegrid id="TreeGrid" locale="de" dataSource="@ViewBag.TreeData"
              childMapping="Children" treeColumnIndex="1"
              allowPaging="true" allowFiltering="true" allowEditing="true">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true" 
                             allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
</ejs-treegrid>
```

**LocalizationMessages for TreeGrid**:
- `EmptyRecord` — Message when no records are present
- `Add` / `Edit` / `Delete` — Toolbar action labels
- `Update` / `Cancel` — Dialog button text
- `Search` — Search/find field placeholder
- `FilterButton` — Filter header button text
- `StartsWith`, `EndsWith`, `Contains` — Filter operator labels

---

## RTL (Right-to-Left) Layout

Enable right-to-left text direction for Arabic, Hebrew, and other RTL languages with `enableRtl="true"`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData" 
              childMapping="Children" treeColumnIndex="1"
              locale="ar" enableRtl="true"
              allowSorting="true" allowFiltering="true" allowPaging="true">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-filtersettings type="Excel" hierarchyMode="Parent"></e-treegrid-filtersettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="معرّف المهمة" 
                           isPrimaryKey="true" width="80"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="اسم المهمة" width="200"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="تاريخ البدء" 
                           format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="المدة" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

When RTL is enabled:
- Column headers and content align to the right
- Expand/collapse arrows appear on the right side of parent rows
- Pager controls are mirrored
- Filter and sort icons appear on the left side of header text
- Dialog windows and tooltips adopt RTL alignment
- Toolbar buttons and menus are right-aligned
- Parent-child hierarchy indentation is reversed

**RTL with Localization**:
```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData" 
              childMapping="Children" treeColumnIndex="1"
              locale="ar" enableRtl="true"
              toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true" 
                             allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="ID" 
                           isPrimaryKey="true" width="80"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Best Practices

1. **Set locale early**: Configure the culture before initializing the TreeGrid
2. **Match data types**: Ensure column `type` matches the data type (date, number, string)
3. **Use format codes**: Apply appropriate format codes (`C2`, `yMd`, `N2`) based on column content
4. **Load CLDR data**: Load locale data via CDN or local JSON for proper number/date formatting
5. **Test RTL layouts**: Verify expand/collapse and hierarchy rendering in RTL mode
6. **Comprehensive localization**: Translate both UI strings and column headers for a complete experience
7. **Hierarchy-aware strings**: Ensure parent-child relationship text is also localized if using custom templates

---

## Example: Multi-Locale TreeGrid with Toolbar

```cshtml
@{
    var currentLocale = ViewBag.Locale ?? "en";
}

<div>
    <label>Select Language:</label>
    <select id="localeSelector">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
    </select>
</div>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.TreeData" 
              childMapping="Children" treeColumnIndex="1"
              locale="@currentLocale"
              enableRtl="@(currentLocale == "ar" ? true : false)"
              allowSorting="true" allowFiltering="true" allowPaging="true"
              toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel", "ExcelExport", "PdfExport" })">
    <e-treegrid-pagesettings pageSize="5"></e-treegrid-pagesettings>
    <e-treegrid-filtersettings type="Excel" hierarchyMode="Parent"></e-treegrid-filtersettings>
    <e-treegrid-editSettings allowAdding="true" allowEditing="true" 
                             allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="ID" 
                           isPrimaryKey="true" type="number" width="80"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           type="date" format="yMd" width="120"></e-treegrid-column>
        <e-treegrid-column field="Budget" headerText="Budget" 
                           type="number" format="C2" textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    document.getElementById('localeSelector').addEventListener('change', function(e) {
        var locale = e.target.value;
        var isRtl = locale === 'ar';
        
        var gridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        gridInstance.locale = locale;
        gridInstance.enableRtl = isRtl;
        gridInstance.refresh();
    });
</script>
```

> Use globalization and localization together to provide a truly international TreeGrid experience. Always test formatting and RTL rendering with real hierarchical data in your target locales.
