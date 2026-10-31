# Classic Layout in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Classic Layout](#enable-classic-layout)
- [Compact vs Classic](#compact-vs-classic)
- [Data Organization](#data-organization)
- [Compatibility](#compatibility)
- [Limitations](#limitations)
- [Best Practices](#best-practices)

## Overview

The classic layout, also known as the tabular layout, displays pivot table data in a structured, tabular format. In this layout, fields in the row axis are displayed side by side in separate columns, making data interpretation and analysis easier. Grand totals appear at the end of all rows, while subtotals are placed in separate rows beneath each group.

**Characteristics:**
- Row axis fields shown as separate columns
- Tabular presentation similar to spreadsheets
- All features (filtering, sorting, drag-drop) work as normal
- Compatible with relational data only
- Works with both client-side and server-side engines

**When to use:**
- Data import/export scenarios
- Spreadsheet-like presentation
- Relational data analysis
- Traditional business intelligence

## Enable Classic Layout

Enable classic layout by setting `layout` property to `Tabular` in `<e-gridSettings>` tag:

```html
<ejs-pivotview id="pivotview" height="450" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-gridSettings layout="Tabular"></e-gridSettings>
</ejs-pivotview>
```

**Key Property:**
- `layout="Tabular"` - Activates classic/tabular layout in `<e-gridSettings>` tag
- Default layout is compact (hierarchical/nested) when not specified

## Compact vs Classic

### Compact Layout (Default - Hierarchical)

```
Column Headers:
                    2020        2021        2022        Grand Total

Row Structure:
Country
  USA
    North           40          45          50          135
    South           60          65          70          195
    USA Subtotal    100         110         120         330
  UK                80          85          90          255
Grand Total         180         195         210         585
```

**Characteristics:**
- Hierarchical row displays with indentation
- Parent and child fields nested
- Subtotals appear for each group
- Intuitive drill-down/drill-up
- Higher vertical space usage

### Classic Layout (Tabular)

```
Column Headers:
Country  State       2020   2021   2022   Grand Total

Row Structure:
USA      North       40     45     50      135
USA      South       60     65     70      195
USA      SUBTOTAL    100    110    120     330
UK       London      50     52     54      156
UK       Manchester  30     33     36      99
UK       SUBTOTAL    80     85     90      255
GRAND TOTAL          180    195    210     585
```

**Characteristics:**
- Row axis fields displayed as separate columns
- Similar to spreadsheet/database table format
- Fields listed left-to-right instead of nested
- More compact horizontal layout
- Subtotals in separate rows
- Grand totals at end

## Data Organization

### Single Row Field (Both Layouts Identical)

```html
<e-rows>
    <e-field name="Country"></e-field>
</e-rows>
```

```
Compact:   USA          UK          UK Grand Total
Classic:   Country      2020  2021  2022 Total
           USA          100   110   120   330
           UK           80    85    90    255
           Grand Total  180   195   210   585
```

### Multiple Row Fields (Difference Clearly Visible)

```html
<e-rows>
    <e-field name="Country"></e-field>
    <e-field name="State"></e-field>
</e-rows>
```

**Compact Layout:**
```
Country
  State
    USA
      California
      Texas
    UK
      London
      Manchester
```

**Classic Layout:**
```
Country  State          2020   2021
USA      California     100    110
USA      Texas          50     55
UK       London         40     42
UK       Manchester     30     32
```

## Compatibility

**Data Source Compatibility:**
- ✓ **Relational data:** Fully supported
- ✗ **OLAP data:** Not supported (classic layout only works with relational)
- ✓ **JSON data:** Supported
- ✓ **CSV data:** Supported
- ✓ **Remote data:** Supported (DataManager)

**Engine Compatibility:**
- ✓ Client-side engine
- ✓ Server-side engine

**Feature Compatibility:**
- ✓ Filtering
- ✓ Sorting
- ✓ Grouping
- ✓ Calculated fields
- ✓ Conditional formatting
- ✓ Export (Excel/PDF)
- ✓ Drill-down/drill-up

## Limitations

### Row Subtotals at Top Position
- **Limitation:** Subtotals at "Top" position are NOT supported for row subtotals
- **Why:** Classic layout structure doesn't support top subtotal placement for rows
- **Workaround:** Use default positioning or `Bottom` position
- **Column Subtotals:** Not affected, can use any position

### Column Width Behavior
- Classic layout shows each field in separate column
- May result in wider horizontal layout
- Requires horizontal scrolling for many fields
- Column widths should be adjusted accordingly

### OLAP Incompatibility
- Classic layout not supported with OLAP data sources
- Must use compact layout for OLAP analysis

## Best Practices

- **Data Type:** Use classic layout for relational data only
- **Number of Fields:** Classic layout good for 2-4 row fields; avoid excessive fields
- **Export:** Classic layout exports cleanly to Excel/spreadsheets
- **Mobile:** Compact layout better for mobile (narrower) due to field nesting
- **Analysis Type:** Use for traditional tabular analysis
- **Subtotal Position:** Use default or Bottom (row subtotals at Top not supported)
- **Testing:** Verify classic layout works with your data type before deployment
- **User Preference:** Offer choice between compact/classic layouts
- **Documentation:** Inform users that classic layout requires relational data
- **Performance:** No significant performance difference between layouts
- **Scrolling:** Plan for horizontal scrolling with many row fields
