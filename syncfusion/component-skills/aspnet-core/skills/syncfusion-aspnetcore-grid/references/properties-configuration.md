# Properties Configuration in ASP.NET Core Grid

## Table of Contents
- [Quick Property Reference](#quick-property-reference)
- [Data Properties](#data-properties)
- [Layout & Display Properties](#layout--display-properties)
- [Feature Properties](#feature-properties)
- [Edit Properties](#edit-properties)
- [Column Properties](#column-properties)
- [Selection Properties](#selection-properties)

---

## Quick Property Reference

```cshtml
<ejs-grid id="Grid" 
    dataSource="@ViewBag.DataSource"
    height="500"
    width="100%"
    allowPaging="true"
    pageSize="12"
    allowSorting="true"
    allowFiltering="true"
    allowSelection="true"
    selectionMode="Row"
    gridLines="Both"
    enableHover="true"
    enableAltRow="true"
    allowGrouping="false"
    allowExcelExport="true"
    allowPdfExport="true">
    
    <e-grid-pageSettings pageSize="20"></e-grid-pageSettings>
    <e-grid-sortSettings columns="@(new List<SortDescriptor> {
        new SortDescriptor { Field = "OrderID", Direction = "Descending" }
    })"></e-grid-sortSettings>
    
    <e-grid-columns>
        <!-- columns -->
    </e-grid-columns>
</ejs-grid>
```

---

## Data Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `dataSource` | IEnumerable/DataManager | null | Data to display in grid |
| `query` | Query | null | External Query for processing |
| `allowExternalMessage` | boolean | false | Show external messages |
| `locale` | string | 'en-US' | Language/locale setting |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.Orders" locale="en-US">
</ejs-grid>
```

---

## Layout & Display Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `height` | string/number | 'auto' | Scrollable height (e.g., '500px', '100%') |
| `width` | string/number | 'auto' | Grid width |
| `rowHeight` | number | null | Fixed row height |
| `gridLines` | GridLine | 'Default' | Grid border display: Both, Horizontal, Vertical, None |
| `clipMode` | ClipMode | 'Ellipsis' | Cell overflow: Ellipsis, Clip, EllipsisWithTooltip |
| `enableHover` | boolean | true | Highlight row on hover |
| `enableAltRow` | boolean | true | Alternate row colors |
| `enableStickyHeader` | boolean | false | Sticky column header |
| `allowTextWrap` | boolean | false | Wrap text in cells |
| `cssClass` | string | '' | Custom CSS class |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          height="500" 
          width="100%"
          gridLines="Both"
          clipMode="EllipsisWithTooltip"
          enableAltRow="true">
</ejs-grid>
```

---

## Feature Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowPaging` | boolean | false | Enable pagination |
| `pageSize` | number | 12 | Records per page (set with pageSettings) |
| `allowSorting` | boolean | false | Enable column sorting |
| `allowMultiSorting` | boolean | false | Sort by multiple columns |
| `allowFiltering` | boolean | false | Enable filtering |
| `allowGrouping` | boolean | false | Enable grouping |
| `allowSelection` | boolean | true | Enable row/cell selection |
| `allowSearching` | boolean | false | Show search bar |
| `allowReordering` | boolean | false | Drag to reorder columns |
| `allowResizing` | boolean | false | Resize columns |
| `allowExcelExport` | boolean | false | Export to Excel |
| `allowPdfExport` | boolean | false | Export to PDF |
| `allowRowDragAndDrop` | boolean | false | Drag rows |
| `allowKeyboard` | boolean | true | Keyboard navigation |
| `enableAccessibility` | boolean | true | Accessibility features |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          allowPaging="true"
          allowSorting="true"
          allowFiltering="true"
          allowGrouping="true"
          allowSelection="true"
          allowExcelExport="true"
          allowPdfExport="true">
    <e-grid-pageSettings pageSize="20"></e-grid-pageSettings>
</ejs-grid>
```

---

## Edit Properties

| Property | Type | Purpose |
|----------|------|---------|
| `editSettings` | EditSettings | Edit mode configuration (mode, allowAdding, allowEditing, allowDeleting) |
| `toolbar` | List<string> | Toolbar buttons: Add, Edit, Delete, Update, Cancel, ExcelExport, PdfExport, etc. |
| `detailTemplate` | string | Template for detail row |
| `rowTemplate` | string/Func | Custom row template |
| `editTemplate` | string/Func | Custom edit form template |

**Example:**
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel", "ExcelExport", "PdfExport" })">
    <e-grid-editSettings allowAdding="true" 
                        allowEditing="true" 
                        allowDeleting="true" 
                        mode="Dialog"></e-grid-editSettings>
</ejs-grid>
```

---

## Column Properties

| Property | Type | Purpose |
|----------|------|---------|
| `field` | string | Data field name |
| `headerText` | string | Column header label |
| `width` | number/string | Column width (pixels or %) |
| `type` | string | Data type: string, number, date, boolean, checkbox |
| `format` | string | Format specifier: C2 (currency), yMd (date), etc. |
| `textAlign` | TextAlign | Cell text alignment: Left, Right, Center, Justify |
| `headerTextAlign` | TextAlign | Header alignment |
| `allowFiltering` | boolean | Enable filter for column (default: true) |
| `allowSorting` | boolean | Enable sort (default: true) |
| `allowSearching` | boolean | Include in search |
| `allowGrouping` | boolean | Groupable column |
| `allowReordering` | boolean | Reorderable column |
| `allowResizing` | boolean | Resizable column |
| `isPrimaryKey` | boolean | Mark as primary key for CRUD |
| `isIdentity` | boolean | Auto-increment field |
| `allowEditing` | boolean | Editable column (readonly if false) |
| `validationRules` | object | Validation rules |
| `editType` | string | Editor type: numericedit, datepickeredit, dropdownlist, etc. |
| `defaultValue` | object | Default value for new records |
| `template` | string/Func | Custom cell template |
| `headerTemplate` | string/Func | Custom header template |
| `editTemplate` | string/Func | Custom edit template |
| `customAttributes` | object | CSS class or custom HTML attributes |
| `isFrozen` | boolean | Freeze/pin column |
| `minWidth` | number | Minimum column width |

**Example:**
```cshtml
<e-grid-columns>
    <e-grid-column field="OrderID" 
                   headerText="Order ID" 
                   width="100" 
                   type="number"
                   isPrimaryKey="true"
                   allowEditing="false">
    </e-grid-column>
    
    <e-grid-column field="Freight" 
                   headerText="Freight" 
                   width="100" 
                   type="number"
                   format="C2"
                   textAlign="Right"
                   validationRules="@(new { required = true, min = 0, max = 10000 })">
    </e-grid-column>
    
    <e-grid-column field="OrderDate" 
                   headerText="Order Date" 
                   type="date"
                   format="yMd"
                   width="130">
    </e-grid-column>
    
    <e-grid-column field="ShipCity" 
                   headerText="Ship City" 
                   width="120"
                   editType="dropdownlist">
    </e-grid-column>
</e-grid-columns>
```

---

## Selection Properties

| Property | Type | Purpose |
|----------|------|---------|
| `allowSelection` | boolean | Enable selection |
| `selectionMode` | SelectionMode | Row, Cell, or Both |
| `selectionType` | SelectionType | Single or Multiple |
| `checkboxOnly` | boolean | Select only via checkbox |
| `persistSelection` | boolean | Persist selection on page change |

**Example:**

```cshtml
<!-- Row Selection (default) -->
<ejs-grid id="Grid" allowSelection="true">
    <e-grid-selectionSettings mode="Row" type="Multiple"></e-grid-selectionSettings>
</ejs-grid>

<!-- Cell Selection -->
<ejs-grid id="Grid" allowSelection="true">
    <e-grid-selectionSettings mode="Cell" type="Multiple"></e-grid-selectionSettings>
</ejs-grid>

<!-- Checkbox Selection -->
<ejs-grid id="Grid" allowSelection="true">
    <e-grid-columns>
        <e-grid-column type="checkbox" width="50"></e-grid-column>
        <!-- other columns -->
    </e-grid-columns>
</ejs-grid>
```

---

## Common Property Combinations

### Minimal Grid
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Full-Featured Grid
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          height="600"
          allowPaging="true"
          pageSize="20"
          allowSorting="true"
          allowFiltering="true"
          allowGrouping="true"
          allowSelection="true"
          allowExcelExport="true"
          allowPdfExport="true"
          allowReordering="true"
          allowResizing="true"
          gridLines="Both"
          enableAltRow="true"
          enableHover="true"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel", "ExcelExport", "PdfExport" })">
    
    <e-grid-pageSettings pageSize="20"></e-grid-pageSettings>
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Dialog"></e-grid-editSettings>
    <e-grid-selectionSettings mode="Row" type="Multiple"></e-grid-selectionSettings>
    
    <e-grid-columns>
        <e-grid-column type="checkbox" width="50"></e-grid-column>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Read-Only Display Grid
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          allowPaging="true"
          allowSorting="true"
          allowFiltering="true"
          allowSelection="false">
    <e-grid-pageSettings pageSize="20"></e-grid-pageSettings>
</ejs-grid>
```

---

## Best Practices

1. **Always set reasonable heights**: Use height property to prevent scrolling issues
2. **Use column types**: String, number, date, boolean for proper formatting
3. **Set primary key**: Essential for editing and row identification
4. **Use properties not events when simple**: Properties are cleaner for static configuration
5. **Template over custom CSS**: Use templates for complex customization
6. **Test responsive**: Use percentage widths for responsive design
7. **Optimize toolbar**: Only include buttons users actually need
8. **Set pageSize appropriately**: Smaller pages = better performance
