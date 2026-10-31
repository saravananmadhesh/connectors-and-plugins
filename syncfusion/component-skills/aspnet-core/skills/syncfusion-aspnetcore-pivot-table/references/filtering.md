# Filtering in ASP.NET Core Pivot Table

## Table of Contents
- [Overview](#overview)
- [Member Filtering](#member-filtering)
  - [Append Current Selection to Existing Filters](#append-current-selection-to-existing-filters)
- [Label Filtering](#label-filtering)
- [Value Filtering](#value-filtering)
  - [Top and Bottom Filtering](#top-and-bottom-filtering)
  - [Value Filtering on Multiple Measures](#value-filtering-on-multiple-measures)
- [UI Filter Features](#ui-filter-features)
- [Typical Use Cases](#typical-use-cases)
- [Best Practices](#best-practices)

## Overview

The Pivot Table supports three types of filtering to help you focus on specific data:

1. **Member Filtering** - Show/hide specific dimension members (e.g., USA, UK, Canada)
2. **Label Filtering** - Filter members based on text patterns in their names
3. **Value Filtering** - Filter by aggregated values meeting certain conditions

By default, `allowMemberFilter` is **enabled**, allowing users to toggle members on/off. To enable label and value filtering, you must explicitly set `allowLabelFilter` and `allowValueFilter`.

## Member Filtering

Member filtering allows you to include or exclude specific dimension members from the Pivot Table. This is the most common and fastest filtering approach.

### Enable Member Filter UI

```html
<ejs-pivotview id="PivotView" height="400" width="100%" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" allowMemberFilter="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

When field list is displayed, users can click the filter icon next to any field to open the member editor and select/deselect members interactively.

### Include Only Specific Members

```html
<ejs-pivotview id="PivotView" height="400" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" allowMemberFilter="true">
        <e-filtersettings>
            <e-field name="Country" type="Include" items="@ViewBag.IncludeMembers"></e-field>
        </e-filtersettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Controller Setup:**

```csharp
public ActionResult Index()
{
    // Define countries to include in the filter
    ViewBag.IncludeMembers = new string[] { "USA", "UK", "Germany" };
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Result**: Pivot shows data only for USA, UK, and Germany. All other countries excluded.

### Exclude Specific Members

```html
<e-filtersettings>
    <e-field name="Country" type="Exclude" items="@ViewBag.ExcludeMembers"></e-field>
</e-filtersettings>
```

**Controller Setup:**

```csharp
ViewBag.ExcludeMembers = new string[] { "Canada", "Mexico" };
```

**Result**: Pivot shows all countries EXCEPT Canada and Mexico.

### Include vs Exclude - When to Use Each

| Approach | Scenario | Efficiency |
|----------|----------|-----------|
| **Include** | "Show only top 3 countries" (few items) | Faster (processes fewer items) |
| **Exclude** | "Hide these 2 countries" (few items to hide) | Faster (skips fewer items) |
| **Exclude** | "Show all except 5 items" (many items) | Faster than "include" all others |

**Rule of Thumb**: Include when < 20% of members; Exclude when > 80% of members.

### Multi-Field Member Filtering

Apply filters to multiple fields simultaneously:

```html
<e-filtersettings>
    <e-field name="Country" type="Include" items="@ViewBag.IncludeCountries"></e-field>
    <e-field name="Product" type="Exclude" items="@ViewBag.ExcludeProducts"></e-field>
</e-filtersettings>
```

**Controller Setup:**

```csharp
public ActionResult Index()
{
    // Include specific countries
    ViewBag.IncludeCountries = new string[] { "USA", "UK", "Germany" };
    
    // Exclude specific products
    ViewBag.ExcludeProducts = new string[] { "Accessories", "OLD_PRODUCT" };
    
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Result**: 
- Show only USA, UK, Germany
- Within those countries, exclude Accessories and OLD_PRODUCT

### Append Current Selection to Existing Filters

By default, when a filter is applied and a new field member is selected, the Pivot Table replaces the previous selection. Enabling the **Add current selection to filter** option ensures that each new selection is added to the existing filter instead of replacing it. This allows you to select multiple items incrementally without losing earlier selections.

**When to use this option:**
- You need to build up a multi-member filter across several dialog interactions
- You don't want to lose previously selected members when picking additional ones
- You're working with a long member list and want to add items one at a time using search

**How to append current selections to existing filters:**

1. Open the Filter dialog for the target field.
2. Search for the required field member and select it.
3. Enable the **Add current selection to filter** option in the Filter dialog.
4. Click the **OK** button to apply the filter and keep the member included.
5. Repeat the steps to add more members to the same filter.

> **Note:** When **Add current selection to filter** is disabled (the default), each new selection replaces the previous members in the filter.

## Label Filtering

Label filtering allows you to display only data with specific text patterns in the member names. Works with string, number, and date data types.

### Enable Label Filter UI

To enable label filtering, set `allowLabelFilter="true"`:

```html
<ejs-pivotview id="PivotView" height="400" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" 
        allowMemberFilter="true"
        allowLabelFilter="true">
        <e-rows><e-field name="Product"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### String Data Type - Text Pattern Matching

#### Contains Pattern

Show only products containing the word "Bike":

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="Contains" value1="Bike">
    </e-field>
</e-filtersettings>
```

**Matches**: "Road Bike", "Mountain Bike", "Electric Bike", "BikeFrame"

#### Begins With Pattern

Show only products starting with "M":

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="BeginWith" value1="M">
    </e-field>
</e-filtersettings>
```

**Matches**: "Mountain Bike", "Mudguard", "Motorcycle Parts"

#### Ends With Pattern

Show only products ending with "Wheel":

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="EndsWith" value1="Wheel">
    </e-field>
</e-filtersettings>
```

**Matches**: "Road Wheel", "Front Wheel", "Spin Wheel"

#### Exact Match

Show only exact product name:

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="Equals" value1="Mountain Bike">
    </e-field>
</e-filtersettings>
```

**Matches**: Only "Mountain Bike" exactly

#### Does Not Equal

Show all products except exact name:

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="DoesNotEquals" value1="OLD_PRODUCT">
    </e-field>
</e-filtersettings>
```

#### Does Not Contain

Show all products NOT containing text:

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="DoesNotContains" value1="Discontinued">
    </e-field>
</e-filtersettings>
```

#### Between (Alphabetically)

Show products alphabetically between two values:

```html
<e-filtersettings>
    <e-field name="Product" type="Label" 
        condition="Between" value1="A" value2="M">
    </e-field>
</e-filtersettings>
```

**Matches**: All products from "A" to "M" (e.g., "Accessories", "Lighting", but not "Mountain" which starts with M)

#### Greater Than / Less Than

```html
<!-- Products alphabetically after "P" -->
<e-field name="Product" type="Label" 
    condition="GreaterThan" value1="P">
</e-field>

<!-- Products alphabetically before "P" -->
<e-field name="Product" type="Label" 
    condition="LessThan" value1="P">
</e-field>
```

### String Conditions Reference Table

| Condition | Description | Example |
|-----------|-------------|---------|
| `Equals` | Exact match | `Equals:Mountain Bike` → "Mountain Bike" only |
| `DoesNotEquals` | Not exact match | `DoesNotEquals:Old` → Everything except "Old" |
| `Contains` | Contains substring | `Contains:Bike` → "Road Bike", "Mountain Bike", "Bike Tire" |
| `DoesNotContains` | Does not contain | `DoesNotContains:Used` → Excludes products with "Used" |
| `BeginWith` | Starts with | `BeginWith:M` → "Mountain", "Mudguard" |
| `EndsWith` | Ends with | `EndsWith:Wheel` → "Front Wheel", "Rear Wheel" |
| `Between` | Alphabetically between | `Between:A,M` → Products A-M |
| `GreaterThan` | After (alphabetically) | `GreaterThan:M` → Products starting after M |
| `LessThan` | Before (alphabetically) | `LessThan:M` → Products before M |

### Number Data Type

For numeric text values in labels (product codes, IDs):

```html
<ejs-pivotview id="PivotView" height="400" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" allowLabelFilter="true">
        <e-rows>
            <e-field name="ProductCode"></e-field>  <!-- "100", "200", "300" -->
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
        </e-values>
        
        <e-filtersettings>
            <!-- Show only products with codes less than 250 -->
            <e-field name="ProductCode" type="Number" 
                condition="LessThan" value1="250">
            </e-field>
        </e-filtersettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Number Conditions

| Operator | Use | Example |
|----------|-----|---------|
| `Equals` | Exact number | `250` → Only code 250 |
| `DoesNotEquals` | Exclude number | `100` → Everything except 100 |
| `GreaterThan` | Greater than threshold | `500` → Codes > 500 |
| `GreaterThanOrEqualTo` | Greater or equal | `500` → Codes ≥ 500 |
| `LessThan` | Less than threshold | `250` → Codes < 250 |
| `LessThanOrEqualTo` | Less or equal | `250` → Codes ≤ 250 |
| `Between` | Range | `Between:100,500` → Codes 100-500 |
| `NotBetween` | Not in range | `NotBetween:100,500` → Outside 100-500 |

### Date Data Type

For date values in labels:

```html
<e-filtersettings>
    <!-- Show only orders before 2024 -->
    <e-field name="OrderDate" type="Date" 
        condition="Before" value1="2024-01-01">
    </e-field>
</e-filtersettings>
```

### Date Conditions

| Operator | Use | Date Format |
|----------|-----|------------|
| `Equals` | Specific date | `"2024-01-15"` |
| `DoesNotEquals` | Exclude date | `"2024-01-15"` |
| `Before` | Before date | `"2024-01-01"` |
| `BeforeOrEqualTo` | Before or equal | `"2024-01-01"` |
| `After` | After date | `"2024-12-31"` |
| `AfterOrEqualTo` | After or equal | `"2024-12-31"` |
| `Between` | Date range | `value1="2024-01-01" value2="2024-12-31"` |
| `NotBetween` | Not in range | `value1="2024-01-01" value2="2024-12-31"` |

## Value Filtering

Value filtering displays only members with aggregated values meeting specific conditions. Use this to focus on high-performing or low-performing items.

### Enable Value Filter UI

Set `allowValueFilter="true"`:

```html
<ejs-pivotview id="PivotView" height="400" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" 
        allowValueFilter="true">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Greater Than Threshold

Show only countries with sales > 5,000:

```html
<e-filtersettings>
    <e-field name="Country" type="Value" 
        measure="Sales" 
        condition="GreaterThan" value1="5000">
    </e-field>
</e-filtersettings>
```

**Result**: Pivot displays only countries where Sum(Sales) > 5,000

### Greater Than or Equal

```html
<e-field name="Country" type="Value" 
    measure="Sales" 
    condition="GreaterThanOrEqualTo" value1="5000">
</e-field>
```

### Less Than or Equal

Show only sales ≤ 5,000:

```html
<e-field name="Country" type="Value" 
    measure="Sales" 
    condition="LessThanOrEqualTo" value1="5000">
</e-field>
```

### Between Range

Show countries with sales between 1,000 and 10,000:

```html
<e-field name="Country" type="Value" 
    measure="Sales" 
    condition="Between" value1="1000" value2="10000">
</e-field>
```

**Result**: Displays only countries where 1,000 ≤ Sum(Sales) ≤ 10,000

### Not Between Range

Show countries with sales outside 1,000-10,000 range:

```html
<e-field name="Country" type="Value" 
    measure="Sales" 
    condition="NotBetween" value1="1000" value2="10000">
</e-field>
```

### Top and Bottom Filtering

`Top` and `Bottom` are value filter operators used to show only the top N or bottom N members based on an aggregated value. Use `Top` to focus on leading performers (top revenue sources, top-selling products) and `Bottom` to surface underperformers or low-volume items.

To apply Top or Bottom filtering, set the `condition` property to **`Top`** or **`Bottom`** in the [`e-filtersettings`](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.PivotView.PivotViewFilterSetting.html), provide the count N in `value1`, and specify the `measure` field to rank by.

**How they work:**
- `Top` ranks members by the measure in descending order and keeps the top N
- `Bottom` ranks members by the measure in ascending order and keeps the bottom N
- Both operators are available in the value filter dialog under the **Value** tab, in the **Operators** dropdown
- Both run **client-side** after aggregation, so the full result set is computed first and then trimmed to N

**Rules to keep in mind:**
- `value1` defines N (the number of members to show). `value2` is not used by these operators.
- The `measure` property is required when multiple value fields are present, so the ranking is unambiguous.
- Ties are kept in their natural order; the first N ranked members are shown.

#### Top N - Show Top 5 Countries by Sales

Display only the top 5 countries based on the sum of sales:

```html
<e-filtersettings>
    <e-field name="Country" type="Value"
             measure="Sales"
             condition="Top" value1="5">
    </e-field>
</e-filtersettings>
```

**Result**: Pivot displays only the 5 countries with the highest Sum(Sales).

#### Bottom N - Show Bottom 5 Countries by Sales

Display only the 5 countries with the lowest sum of sales:

```html
<e-filtersettings>
    <e-field name="Country" type="Value"
             measure="Sales"
             condition="Bottom" value1="5">
    </e-field>
</e-filtersettings>
```

**Result**: Pivot displays only the 5 countries with the lowest Sum(Sales).

#### Top/Bottom with Multiple Measures

When the pivot has multiple value fields, you must specify which measure to rank by using the `measure` property. For example, to get the top 5 countries by **Sales** (not Profit):

```html
<e-values>
    <e-field name="Sales"></e-field>
    <e-field name="Profit"></e-field>
</e-values>

<e-filtersettings>
    <!-- Top 5 countries ranked by Sales (not Profit) -->
    <e-field name="Country" type="Value"
             measure="Sales"
             condition="Top" value1="5">
    </e-field>
</e-filtersettings>
```

**Result**: Top 5 countries ranked by Sum(Sales), even though Profit is also displayed. Replace `Top` with `Bottom` to flip the ranking.

#### Quick Reference

| Filter | Condition | value1 | Result |
|--------|-----------|--------|--------|
| Top N | `Top` | Count (e.g., `5`) | Top N members by highest value |
| Bottom N | `Bottom` | Count (e.g., `5`) | Bottom N members by lowest value |

#### Clearing Top or Bottom Filters

Like other value filters, you can clear a `Top` or `Bottom` filter by opening the filter dialog, switching to the **Value** tab, and clicking the **Clear** option at the bottom of the dialog.

### Value Filtering on Multiple Measures

When the pivot has multiple value fields (Sales and Profit), you must specify which one to filter on by using the `measure` property. This applies to every value filter operator, including `Top` and `Bottom`:

```html
<e-values>
    <e-field name="Sales"></e-field>
    <e-field name="Profit"></e-field>
</e-values>

<e-filtersettings>
    <!-- Filter by Sales (not Profit) -->
    <e-field name="Country" type="Value"
             measure="Sales"
             condition="GreaterThan" value1="5000">
    </e-field>
</e-filtersettings>
```

**Result**: Countries where Sum(Sales) > 5,000, even though Profit is also displayed.

### Value Filter Conditions Reference

| Operator | Use | Example |
|----------|-----|---------|
| `Equals` | Exact value | `Equals:5000` → Only members with value 5000 |
| `DoesNotEquals` | Exclude value | `DoesNotEquals:0` → Excludes zero-value members |
| `GreaterThan` | Greater than threshold | `GreaterThan:5000` → Values > 5000 |
| `GreaterThanOrEqualTo` | Greater or equal | `GreaterThanOrEqualTo:5000` → Values ≥ 5000 |
| `LessThan` | Less than threshold | `LessThan:5000` → Values < 5000 |
| `LessThanOrEqualTo` | Less or equal | `LessThanOrEqualTo:5000` → Values ≤ 5000 |
| `Between` | Range | `Between:1000,10000` → Values 1,000-10,000 |
| `NotBetween` | Not in range | `NotBetween:1000,10000` → Outside 1,000-10,000 |
| `Top` | Top N members (client-side) | `Top:5` → Top 5 by highest value |
| `Bottom` | Bottom N members (client-side) | `Bottom:5` → Bottom 5 by lowest value |

> **Note:** `Top` and `Bottom` operate on the aggregated result set after rendering. They require only `value1` (the count). Use the `measure` property to choose which value field to rank by when the pivot has multiple value fields.

## UI Filter Features

### Search Functionality

Users can type partial member names to quickly find items in filter dialog:

```
Filter Dialog for "Country":
┌─────────────────────────┐
│ 🔍 Search... (Type "usa")│
├─────────────────────────┤
│ ☑ United States        │
│ ☑ USA Territories      │
│ ✓ USA                  │
└─────────────────────────┘
```

**Workflow:**
1. Open filter dialog
2. Type in search box: "usa"
3. List filtered to matching members
4. Select/deselect from filtered results
5. Click OK to apply

### Sort Options

Sort members alphabetically ascending/descending:

```
Filter Dialog for "Product":
[Alphabetical ▼] [Sort Z-A]   <!-- Sort options -->
☑ Accessories
☑ Bike Frame
☑ Mountain Bike
```

**Options:**
- `A-Z` (Ascending) - Default
- `Z-A` (Descending)
- `By Count` - Sort by frequency

### Select All / Deselect All

Quick select/deselect all members:

```
[✓ Select All] [Clear All]

☑ Canada
☑ China
☑ France
☑ Germany
```

## Typical Use Cases

### Case 1: Executive Dashboard - Top Countries Only

```html
<e-filtersettings>
    <e-field name="Country" type="Include" items="@ViewBag.TopCountries">
    </e-field>
</e-filtersettings>
```

**Controller:**
```csharp
ViewBag.TopCountries = new string[] { "USA", "China", "Japan", "Germany", "UK" };
```

**Business Goal**: Focus on top 5 markets

### Case 2: Data Quality - Exclude Test Records

```html
<e-filtersettings>
    <e-field name="Customer" type="Label" 
        condition="DoesNotContains" value1="TEST">
    </e-field>
</e-filtersettings>
```

**Business Goal**: Hide test/staging data from reports

### Case 3: Performance Analysis - High Revenue Customers

```html
<e-filtersettings>
    <e-field name="Customer" type="Value" 
        measure="Revenue" 
        condition="GreaterThan" value1="50000">
    </e-field>
</e-filtersettings>
```

**Business Goal**: Analyze top customers driving 80% of revenue

### Case 4: Recent Data Analysis

```html
<e-filtersettings>
    <e-field name="OrderDate" type="Date" 
        condition="After" value1="2024-01-01">
    </e-field>
</e-filtersettings>
```

**Business Goal**: Show only current year data

### Case 5: Product Range Analysis

```html
<e-filtersettings>
    <!-- Bikes and Frames, but not Accessories -->
    <e-field name="ProductCategory" type="Label" 
        condition="Contains" value1="Bike">
    </e-field>
</e-filtersettings>
```

### Case 6: Top N Performers - Top 5 Countries by Sales

```html
<e-filtersettings>
    <e-field name="Country" type="Value"
             measure="Sales"
             condition="Top" value1="5">
    </e-field>
</e-filtersettings>
```

**Business Goal**: Focus executive dashboard on the 5 highest-revenue countries.

### Case 7: Bottom N Underperformers - Bottom 3 Products by Revenue

```html
<e-filtersettings>
    <e-field name="Product" type="Value"
             measure="Revenue"
             condition="Bottom" value1="3">
    </e-field>
</e-filtersettings>
```

**Business Goal**: Identify the 3 lowest-revenue products for review or discontinuation.

## Performance Optimization for Large Datasets

### Member Filter Performance with maxNodeLimitInMemberEditor

The member filter dialog improves loading performance when working with large datasets by limiting the number of members displayed initially. This helps prevent delays when the member list loads.

You can control how many members are displayed in the member filter dialog using the `maxNodeLimitInMemberEditor` property. By default, this property is set to **1000**. When your data contains more members than this limit, only the specified number will be shown initially, and a message will indicate how many additional members are available.

```html
<ejs-pivotview id="PivotView" height="400" width="100%" 
    showFieldList="true"
    maxNodeLimitInMemberEditor="500">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" allowMemberFilter="true">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Example Scenario**: If your data contains 5000 unique members named "Member 1", "Member 2", "Member 3", etc., and you set `maxNodeLimitInMemberEditor="500"`, only the first 500 members will appear by default. The dialog will show a message like "4500 more items. Search to refine further."

**To access members beyond the limit**: Use the search option in the member filter dialog. Type the starting characters of the member name to locate and select the desired members.

**Best Practice**: 
- For datasets with < 1,000 unique members per field: Use default setting (1000)
- For datasets with 1,000-10,000 unique members: Set to 500-1,000
- For datasets with > 10,000 unique members: Set to 200-500 and encourage users to use search

### OLAP Performance with loadOnDemandInMemberEditor

> **Note**: This option is applicable only for OLAP data sources.

This option improves the performance of the member editor when working with OLAP hierarchies by loading members only when needed, rather than loading all members at once. You can enable this by setting the `loadOnDemandInMemberEditor` property to **true**.

```html
<ejs-pivotview id="PivotView" height="400" width="100%" 
    showFieldList="true"
    loadOnDemandInMemberEditor="true">
    <e-datasourcesettings dataSource="@ViewBag.OlapDataSource">
        <e-rows><e-field name="[Geography].[Geography]"></e-field></e-rows>
        <e-columns><e-field name="[Time].[Calendar]"></e-field></e-columns>
        <e-values><e-field name="[Measures].[Internet Sales Amount]"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**How it works**:
- By default, this property is set to **true** for OLAP data sources
- Only the first level members are loaded initially from the OLAP cube
- The member editor opens quickly without performance delays
- Search operations apply only to currently loaded level members

**Loading additional members**:
1. **Expand individual members**: Click the expander button next to any member to load only its child members
2. **Load by level selection**: Choose a specific level from the dropdown list to load all members up to that selected level from the cube

**Performance Benefits**:
- Prevents performance issues when hierarchies contain large numbers of members
- Reduces initial load time from several seconds to milliseconds
- Once level members are loaded, they remain available for all subsequent operations
- Members persist until you refresh the web page

### Member Sorting in Filter Dialog

The member filter dialog provides built-in sort icons that let you arrange members in ascending or descending order. This helps with easier member selection and review.

**Sorting Options**:
- **Ascending sort**: Arrange members from A to Z (or lowest to highest for numerical values)
- **Descending sort**: Arrange members from Z to A (or highest to lowest for numerical values)
- **Original order**: When neither sorting option is selected, members appear in their original order from the data source

### Member Search in Filter Dialog

The member filter dialog includes a built-in search box that allows you to find members by typing part of their name. This is especially useful when dealing with large datasets.

**How to use**:
1. Type the starting characters of the member name you want to find
2. The list automatically filters to show only matching members
3. Select or deselect the filtered members as needed

**Example**: If searching for "United Kingdom" in a list of 200 countries, type "Unit" and the list will show only matching items.

**Performance Tip**: When `maxNodeLimitInMemberEditor` is set and members exceed the limit, use the search box to access members beyond the initially displayed range.

## Best Practices

### General Filtering Best Practices
✓ **Enable All Filter Types**: Always set `allowMemberFilter`, `allowLabelFilter`, and `allowValueFilter` for flexibility
✓ **Use Include for Specific Items**: More efficient when filtering to few items (< 20%)
✓ **Use Exclude for General Filters**: Better for "hide unwanted" scenarios (> 80%)
✓ **Label Filters for Text Patterns**: Use Contains/BeginsWith for product names, descriptions
✓ **Value Filters for Aggregates**: Use for sales thresholds, quantity ranges, performance metrics
✓ **Use Top/Bottom for Leaderboards**: Use `Top` and `Bottom` operators to show top/bottom N members without writing custom logic
✓ **Always Set measure for Top/Bottom**: When the pivot has multiple value fields, set `measure` to define which value to rank by
✓ **Pair Top with Bottom**: Show the same field with `Top` and `Bottom` to compare leaders and laggards side by side
✓ **Case-Sensitivity**: Field names are case-sensitive and must match DataSource exactly
✓ **Combine Strategically**: Member + Label + Value filters work together for complex analysis
✓ **Validate Conditions**: Use appropriate Operators for each data type (string, number, date)
✓ **Document Filters**: For saved reports, document which filters are applied for end-user clarity
✓ **Dynamic Filtering**: Allow UI-based filtering for business users; hardcode only for system defaults
✓ **Filter Reset**: Provide "Clear All Filters" button for easy reset to unfiltered view

### Performance Best Practices
✓ **Set maxNodeLimitInMemberEditor**: For fields with > 1,000 unique members, set to 200-500 to improve filter dialog load time
✓ **Enable loadOnDemandInMemberEditor for OLAP**: Load members on-demand for OLAP hierarchies with many levels
✓ **Member Filters Are Fastest**: Member filters execute faster than label or value filters
✓ **Value Filters on Large Datasets**: Value filters may be slower on datasets > 100,000 rows; consider server-side filtering
✓ **Use Search in Member Filter**: Encourage users to use search rather than scrolling through thousands of members
✓ **Limit Initial Member Display**: Don't load all members at once; use pagination or on-demand loading
✓ **Index Your Data Source**: Ensure database fields used in filters are indexed for faster retrieval
✓ **Consider Server-Side Pivot Engine**: For very large datasets (> 500K rows), use server-side processing with pre-filtered data
