# Globalization & Localization — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Globalization (Number and Date Formatting)](#globalization-number-and-date-formatting)
- [Localization (UI Strings)](#localization-ui-strings)
- [RTL (Right-to-Left) Layout](#rtl-right-to-left-layout)

## When to Use This

- Apply culture-specific number and date formatting
- Localize UI strings for different languages
- Implement right-to-left (RTL) layouts
- Support multiple locales and regions
- Format currency and date values by culture

---

## Globalization (Number and Date Formatting)

Set the `locale` property to apply locale-specific number and date formatting:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="de">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" format="yMd" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

Load locale data via `ej.base.L10n.load()` in JavaScript for the specific culture:

```javascript
ej.base.setCulture('de');
ej.base.setCldrData({
    // CLDR data for 'de' locale
});
```

Or use Syncfusion's CLDR data package:

```html
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
<script src="locale-data/de.json"></script>
```

---

## Localization (UI Strings)

Translate grid UI text (toolbar labels, dialog text, filter captions, pager text, etc.) by loading a locale JSON:

```javascript
ej.base.L10n.load({
    'de': {
        'grid': {
            'EmptyRecord': 'Keine Aufzeichnungen zum Anzeigen',
            'GroupDropArea': 'Spalten hier ablegen um zu gruppieren',
            'UnGroup': 'Klicken Sie hier, um die Gruppierung aufzuheben',
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
            'NotEqual': 'Ungleich'
        },
        'pager': {
            'currentPageInfo': '{0} von {1} Seiten',
            'totalItemsInfo': '({0} Beiträge)',
            'firstPageTooltip': 'Zur ersten Seite',
            'lastPageTooltip': 'Zur letzten Seite',
            'nextPageTooltip': 'Zur nächsten Seite',
            'previousPageTooltip': 'Zurück zur letzten Seite'
        }
    }
});
```

Then set the `locale` on the grid:

```cshtml
<ejs-grid id="Grid" locale="de" dataSource="@ViewBag.DataSource">
```

---

## RTL (Right-to-Left) Layout

Enable right-to-left text direction for Arabic, Hebrew, and other RTL languages with `enableRtl="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" locale="ar" enableRtl="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

When RTL is enabled:
- Column headers and content align to the right
- Pager controls are mirrored
- Group drop area is right-aligned
- Sorting/filter icons appear on the left side of header text
