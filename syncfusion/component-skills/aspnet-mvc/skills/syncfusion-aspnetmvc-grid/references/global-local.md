# Globalization and Localization in ASP.NET MVC Grid

Customize the grid text for different languages and cultures using localization and globalization.

## When to Use This

Use this reference when you need to:
- Display the grid in different languages
- Customize grid text and labels
- Format numbers and dates per locale
- Switch locales dynamically at runtime
- Support international applications

## Table of Contents
- [Localization Setup](#localization-setup)
- [Switch Locale Dynamically](#switch-locale-dynamically)
- [French Culture Example](#french-culture-example)
- [Full List of Locale Keys](#full-list-of-locale-keys)
- [Globalization (Number and Date Formatting)](#globalization-number-and-date-formatting)

## Localization Setup

Set the `Locale` property on the grid and load translation strings using the `L10n.load()` function from `ej2-base`:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Locale("de-DE")
    .AllowPaging(true)
    .AllowGrouping(true)
    .AllowFiltering(true)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()

<script>
// Load German locale strings before grid renders
ej.base.L10n.load({
    'de-DE': {
        'grid': {
            'EmptyRecord': 'Keine Aufzeichnungen vorhanden',
            'GroupDropArea': 'Spaltenüberschrift hier ablegen zum Gruppieren',
            'UnGroup': 'Klicken Sie hier, um die Gruppierung aufzuheben',
            'GroupDisable': 'Gruppierung ist deaktiviert für diese Spalte',
            'FilterbarTitle': 's Filterleiste',
            'EmptyDataSourceError': 'DataSource darf beim ersten Laden nicht leer sein',
            'Add': 'Hinzufügen',
            'Edit': 'Bearbeiten',
            'Cancel': 'Stornieren',
            'Update': 'Aktualisieren',
            'Delete': 'Löschen',
            'Print': 'Drucken',
            'Pdfexport': 'PDF-Export',
            'Excelexport': 'Excel-Export',
            'Csvexport': 'CSV-Export',
            'Search': 'Suche',
            'Save': 'Speichern'
        },
        'pager': {
            'currentPageInfo': '{0} von {1} Seiten',
            'totalItemsInfo': '({0} Aufnahmen)',
            'firstPageTooltip': 'Zur ersten Seite',
            'lastPageTooltip': 'Zur letzten Seite',
            'nextPageTooltip': 'Zur nächsten Seite',
            'previousPageTooltip': 'Zurück zur letzten Seite',
            'nextPagerTooltip': 'Gehen Sie zu den nächsten Pager-Elementen',
            'previousPagerTooltip': 'Gehen Sie zu den vorherigen Pager-Elementen',
            'pagerDropDown': 'Artikel pro Seite',
            'pagerAllDropDown': 'Artikel'
        }
    }
});
</script>
```

## Switch Locale Dynamically

Use `setCulture` and `setCurrencyCode` to switch locale at runtime:

```javascript
function switchToFrench() {
    ej.base.setCulture('fr-FR');
    ej.base.setCurrencyCode('EUR');
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.locale = 'fr-FR';
    grid.refresh();
}
```

## French Culture Example

```javascript
ej.base.L10n.load({
    'fr-FR': {
        'grid': {
            'EmptyRecord': 'Aucun enregistrement à afficher',
            'GroupDropArea': 'Faites glisser un en-tête de colonne ici pour grouper sa colonne',
            'UnGroup': 'Cliquez ici pour dégrouper',
            'Add': 'Ajouter',
            'Edit': 'Modifier',
            'Cancel': 'Annuler',
            'Update': 'Mettre à jour',
            'Delete': 'Supprimer',
            'Search': 'Chercher'
        },
        'pager': {
            'currentPageInfo': '{0} de {1} pages',
            'totalItemsInfo': '({0} items)'
        }
    }
});
```

## Full List of Locale Keys

### Data Rendering
| Key | Default Text |
|-----|-------------|
| `EmptyRecord` | No records to display |
| `EmptyDataSourceError` | DataSource must not be empty at initial load |

### Columns
| Key | Default Text |
|-----|-------------|
| `True` | true |
| `False` | false |
| `TemplateCell` | is template cell |
| `CheckBoxLabel` | checkbox |

### Editing
| Key | Default Text |
|-----|-------------|
| `Add` | Add |
| `Edit` | Edit |
| `Cancel` | Cancel |
| `Update` | Update |
| `Delete` | Delete |
| `Save` | Save |
| `EditFormTitle` | Details of |
| `AddFormTitle` | Add New Record |
| `BatchSaveConfirm` | Are you sure you want to save changes? |
| `ConfirmDelete` | Are you sure you want to Delete Record? |
| `CancelEdit` | Are you sure you want to Cancel the changes? |

### Grouping
| Key | Default Text |
|-----|-------------|
| `GroupDropArea` | Drag a column header here to group its column |
| `UnGroup` | Click here to ungroup |
| `Item` | item |
| `Items` | items |

### Filtering
| Key | Default Text |
|-----|-------------|
| `FilterbarTitle` | \s filter bar cell |
| `FilterButton` | Filter |
| `ClearButton` | Clear |
| `StartsWith` | Starts With |
| `EndsWith` | Ends With |
| `Contains` | Contains |
| `Equal` | Equal |
| `NotEqual` | Not Equal |
| `LessThan` | Less Than |
| `GreaterThan` | Greater Than |
| `Between` | Between |
| `CustomFilter` | Custom Filter |
| `SelectAll` | Select All |
| `Blanks` | Blanks |
| `ClearFilter` | Clear Filter |
| `NumberFilter` | Number Filters |
| `TextFilter` | Text Filters |
| `DateFilter` | Date Filters |

### Searching
| Key | Default Text |
|-----|-------------|
| `Search` | Search |
| `SearchColumns` | search columns |
| `Clear` | Clear |

### Sorting
| Key | Default Text |
|-----|-------------|
| `Sort` | Sort |
| `SortAtoZ` | Sort A to Z |
| `SortZtoA` | Sort Z to A |
| `SortAscending` | Sort Ascending |
| `SortDescending` | Sort Descending |

### Toolbar
| Key | Default Text |
|-----|-------------|
| `Print` | Print |
| `Pdfexport` | PDF Export |
| `Excelexport` | Excel Export |
| `Csvexport` | CSV Export |

### Pager
| Key | Default Text |
|-----|-------------|
| `currentPageInfo` | {0} of {1} pages |
| `totalItemsInfo` | ({0} items) |
| `firstPageTooltip` | Go to first page |
| `lastPageTooltip` | Go to last page |
| `nextPageTooltip` | Go to next page |
| `previousPageTooltip` | Go to previous page |
| `pagerDropDown` | Items per page |
| `All` | All |

### Context Menu
| Key | Default Text |
|-----|-------------|
| `Copy` | Copy |
| `Group` | Group by this column |
| `Ungroup` | Ungroup by this column |
| `autoFitAll` | Auto Fit all columns |
| `autoFit` | Auto Fit this column |
| `Export` | Export |
| `FirstPage` | First Page |
| `LastPage` | Last Page |
| `PreviousPage` | Previous Page |
| `NextPage` | Next Page |

## Globalization (Number and Date Formatting)

Use CLDR data to format numbers and dates according to locale:

```javascript
// Load CLDR data for a culture
ej.base.loadCldr(
    window.numberingSystems,
    window.cagregorian,
    window.currencies,
    window.numbers,
    window.timeZoneNames
);
ej.base.setCulture('de-DE');
ej.base.setCurrencyCode('EUR');
```

With CLDR loaded, number/date columns format automatically per the locale.
