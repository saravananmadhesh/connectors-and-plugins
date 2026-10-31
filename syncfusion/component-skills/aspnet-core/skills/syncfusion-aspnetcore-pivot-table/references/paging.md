# Paging in Pivot Table

## ⚠️ SECURITY NOTICE

**Remote data sources MUST use authenticated, configuration-based endpoints.** Never hardcode API URLs.

✅ **Required Security Controls:**
- Configuration-based URLs (IConfiguration, appsettings.json)
- Authentication and authorization for API endpoints
- HTTPS/SSL for all remote connections

## Table of Contents
- [Overview](#overview)
- [Enable Paging](#enable-paging)
- [Configure Page Size](#configure-page-size)
- [Set Current Page](#set-current-page)
- [Show or Hide Page Size Dropdown](#show-or-hide-page-size-dropdown)
- [Customize Page Size Options](#customize-page-size-options)
- [Pager Position](#pager-position)
- [Inverse Pager](#inverse-pager)
- [Compact View](#compact-view)
- [Show or Hide Pagers](#show-or-hide-pagers)
- [Render All Records](#render-all-records)
- [Performance With Paging](#performance-with-paging)
- [Comparison with Virtual Scrolling](#comparison-with-virtual-scrolling)
- [Events](#events)
- [Best Practices](#best-practices)

## Overview

Paging divides large Pivot Table datasets into smaller, manageable chunks displayed one page at a time. This improves performance when working with thousands of rows by loading and rendering only the current page's data, reducing memory usage and browser rendering time.

**Key Features:**
- Divides data into pages
- Shows page navigation controls
- Configurable page size
- Improves rendering performance
- Works with all data sources
- Maintains aggregation accuracy

## Enable Paging

Enable paging by adding the `enablePaging` property:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Properties:**
- `enablePaging="true"` - Enables paging functionality
- Pager shows at bottom of pivot table
- Navigation controls included automatically

## Configure Page Size

Set the number of rows and columns per page using the `<e-pageSettings>` tag. The `rowPageSize` controls rows per page and `columnPageSize` controls columns per page:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
</ejs-pivotview>
```

**Key Properties in `<e-pageSettings>`:**
- `rowPageSize="10"` (default) - Number of rows displayed per page
- `columnPageSize="5"` (default) - Number of columns displayed per page

**Examples:**
- Small dataset: `rowPageSize="20"` `columnPageSize="10"`
- Large dataset: `rowPageSize="5"` `columnPageSize="3"`

## Set Current Page

Control which page is displayed initially using `currentRowPage` and `currentColumnPage` properties:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5" 
                    currentRowPage="2" currentColumnPage="1"></e-pageSettings>
</ejs-pivotview>
```

**Properties:**
- `currentRowPage="1"` - Starting row page (1-based index)
- `currentColumnPage="1"` - Starting column page (1-based index)

**Use Cases:**
- Load specific page on application startup
- Jump to row page 3: `currentRowPage="3"`
- Jump to column page 2: `currentColumnPage="2"`

## Show or Hide Page Size Dropdown

Control visibility of the "Rows per page" and "Columns per page" dropdowns using `<e-pagerSettings>`:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings showRowPageSize="false" showColumnPageSize="false"></e-pagerSettings>
</ejs-pivotview>
```

**Properties:**
- `showRowPageSize="true"` (default) - Show/hide "Rows per page" dropdown
- `showColumnPageSize="true"` (default) - Show/hide "Columns per page" dropdown

**Scenarios:**
- Hide both dropdowns: `showRowPageSize="false" showColumnPageSize="false"`
- Hide only row dropdown: `showRowPageSize="false"`
- Hide only column dropdown: `showColumnPageSize="false"`

## Customize Page Size Options

Define custom page size options in the dropdowns using `<e-pagerSettings>`:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings rowPageSizes="@ViewBag.RowPageSizes" 
                     columnPageSizes="@ViewBag.ColumnPageSizes"></e-pagerSettings>
</ejs-pivotview>
```

**Backend Code (C#):**
```csharp
public IActionResult Index()
{
    // Custom row page size options
    ViewBag.RowPageSizes = new int[] { 10, 20, 30, 40, 50 };
    
    // Custom column page size options
    ViewBag.ColumnPageSizes = new int[] { 5, 10, 15, 20, 30 };
    
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Properties:**
- `rowPageSizes` - Array of custom row page size options
- `columnPageSizes` - Array of custom column page size options

**Default Options:**
- Rows: 10, 50, 100, 200
- Columns: 5, 10, 20, 50, 100

## Pager Position

Control where the pager UI appears using the `position` property in `<e-pagerSettings>`:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings position="Top"></e-pagerSettings>
</ejs-pivotview>
```

**Position Options:**
- `Top` - Pager appears above pivot table
- `Bottom` (default) - Pager appears below pivot table

**Use Cases:**
- Top position for mobile layouts
- Top position for better visibility
- Bottom position for traditional reports

## Inverse Pager

Swap the positions of row and column pagers using the `isInversed` property in `<e-pagerSettings>`:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings isInversed="true"></e-pagerSettings>
</ejs-pivotview>
```

**Default Layout:**
```
[Row Pager] ... [Column Pager]
```

**Inverse Layout:**
```
[Column Pager] ... [Row Pager]
```

## Compact View

Display pager in compact mode showing only navigation buttons:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings enableCompactView="true"></e-pagerSettings>
</ejs-pivotview>
```

**Compact View Features:**
- Shows only Previous/Next buttons
- Hides page dropdown and input box
- Minimal interface for space-constrained layouts
- Cleaner appearance

**Use Cases:**
- Mobile devices
- Embedded dashboards
- Limited screen space
- Simplified interfaces

## Show or Hide Pagers

Control visibility of row and column pagers independently using `<e-pagerSettings>`:

```html
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pageSettings rowPageSize="10" columnPageSize="5"></e-pageSettings>
    <e-pagerSettings showRowPager="false"></e-pagerSettings>
</ejs-pivotview>
```

**Hide Column Pager Only:**
```html
<e-pagerSettings showColumnPager="false"></e-pagerSettings>
```

**Hide Both Pagers:**
```html
<e-pagerSettings showRowPager="false" showColumnPager="false"></e-pagerSettings>
```

**PagerSettings Properties:**
- `showRowPager="true"` (default) - Show/hide row pager
- `showColumnPager="true"` (default) - Show/hide column pager

**Use Cases:**
- Hide row pager if only columns are large
- Hide column pager if only rows are large
- Hide both to show pager programmatically

**Important Note:** Use `<e-pagerSettings>` for pager UI configuration (position, compactView, visibility). Use `<e-pageSettings>` for page size settings (rowPageSize, columnPageSize).

## Render All Records

To load all records without paging in memory:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Without Paging:**
- All rows and columns rendered at once
- Larger initial load time
- Higher memory consumption
- Useful for small datasets (<5,000 rows)

**With Paging:**
- Only current page rendered
- Faster initial load time
- Lower memory usage
- Recommended for large datasets (>10,000 rows)

## Performance With Paging

### Impact Analysis

**Page Size Recommendations:**

| Dataset Size | Page Size | Initial Load | Memory |
|---|---|---|---|
| 100-500 rows | 20 | Fast | Low |
| 500-5,000 rows | 10 | Normal | Low-Medium |
| 5,000-50,000 rows | 10 | Good | Medium |
| 50,000+ rows | 5 | Acceptable | Low |

**Configuration:**

```html
<!-- Small dataset, no paging -->
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<!-- Large dataset with optimized page size -->
<ejs-pivotview id="PivotView" height="300" enablePaging="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-pagesettings rowPageSize="20" columnPageSize="10"></e-pagesettings>
</ejs-pivotview>
```

### Performance Tips

✓ **Enable for >10,000 records** for faster rendering
```html
<ejs-pivotview id="PivotView" enablePaging="true">
    <e-pagesettings rowPageSize="15"></e-pagesettings>
</ejs-pivotview>
```

✓ **Adjust page size** based on user experience
```html
<e-pagesettings rowPageSize="20" columnPageSize="8"></e-pagesettings>
```

✓ **Combine with sorting** for logical ordering
```html
<e-datasourcesettings enableSorting="true">
    <e-sortsettings>
        <e-field name="Year" order="Ascending"></e-field>
    </e-sortsettings>
    <e-rows>
        <e-field name="Country"></e-field>
    </e-rows>
    <e-columns>
        <e-field name="Year" caption="Year"></e-field>
    </e-columns>
    <e-values>
        <e-field name="Amount"></e-field>
    </e-values>
</e-datasourcesettings>
```

✓ **Combine with filtering** to scan subset of data
```html
<e-datasourcesettings>
    <e-filtersettings>
        <e-field name="Country" type="Include" items="@new string[] { 'USA', 'UK' }"></e-field>
    </e-filtersettings>
    <e-rows>
        <e-field name="Country"></e-field>
    </e-rows>
    <e-columns>
        <e-field name="Year" caption="Year"></e-field>
    </e-columns>
    <e-values>
        <e-field name="Amount"></e-field>
    </e-values>
</e-datasourcesettings>
```

## Comparison with Virtual Scrolling

| Feature | Paging | Virtual Scrolling |
|---------|--------|-------------------|
| **Navigation** | Page-by-page (click buttons) | Continuous scrolling |
| **Initial Load** | Fast (one page) | Depends on dataset size |
| **Memory Usage** | Lower (one page in memory) | Higher (current+adjacent pages) |
| **Column Width** | Flexible (pixels/percentage) | Pixels only |
| **Column Resizing** | Supported | Not recommended |
| **Ideal Dataset** | 10,000+ rows | 100,000+ rows |
| **UI Features** | Full featured | Limited |
| **Network Bandwidth** | Lower | Higher |
| **User Experience** | Discrete pages | Smooth scrolling |

**Choose Paging if:**
- Dataset fits well in pages
- Full editing features needed
- Memory is constrained
- Column resizing required
- Network bandwidth limited

**Choose Virtual Scrolling if:**
- Continuous exploration preferred
- Column widths are fixed
- Performance is critical
- Smooth scrolling required

## Best Practices

✓ **Enable paging for large datasets** to improve performance
```html
<ejs-pivotview id="PivotView" enablePaging="true" height="600">
```

✓ **Set appropriate page size** based on data volume
```html
<e-pagesettings rowPageSize="15" columnPageSize="8"></e-pagesettings>
```

✓ **Combine with sorting** for logical data presentation
```html
<e-datasourcesettings enableSorting="true">
```

❌ **Avoid:** Small page sizes (<5 rows) causing excessive navigation
❌ **Avoid:** Large page sizes (>50 rows) without sufficient height
❌ **Avoid:** Paging with real-time data without refresh handling
❌ **Avoid:** Not considering mobile screen size with paging

## Important Notes

- Paging applies to **row axis independently** from column axis
- Each axis has **separate page control** (rowPageSize, columnPageSize)
- Paging **reduces initial load time** significantly for large datasets
- Page navigation **preserves current sort/filter state**
- Pivoting maintains **paging consistency** across different layouts
- Works with **all data sources**: JSON, CSV, SQL, OLAP, etc.
- **Memory efficiency** improves proportionally with page size reduction
- Drill-through from **paged tables** shows records from current page context
