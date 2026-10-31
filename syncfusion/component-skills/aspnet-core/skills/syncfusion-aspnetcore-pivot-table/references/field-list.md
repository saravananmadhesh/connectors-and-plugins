# Field List in ASP.NET Core Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Field List](#enable-field-list)
- [Field List Modes](#field-list-modes)
- [Field List Features](#field-list-features)
- [Standalone PivotFieldList](#standalone-pivotfieldlist)
- [Search Desired Field](#search-desired-field)
- [Group Fields Under Custom Names](#group-fields-under-custom-names)
- [Remove Specific Fields](#remove-specific-fields-from-displaying)
- [Changing Aggregation Type](#changing-aggregation-type-of-value-fields)
- [Set Caption to Fields](#set-caption-to-fields-which-isnt-bound-to-the-report)
- [Show Values Button](#show-values-button)
- [Calculated Fields](#calculated-fields)
- [Show Field List Using Toolbar](#show-field-list-using-toolbar)
- [Best Practices](#best-practices)

## Overview

The Field List UI component enables dynamic field management without requiring code changes. Users can:
- Drag/drop fields between rows, columns, values, and filters
- Modify aggregation types
- Apply filtering and sorting
- Rearrange field order for various analyses
- Create calculated fields (when allowed)

The Field List appears as a modal dialog by default (popup mode) but can be displayed as a fixed sidebar.

**Key Features:**
- Drag-and-drop field arrangement
- Add/remove fields dynamically
- Search and organize fields
- Create calculated fields
- Deferred layout updates
- Popup or standalone display modes
- Dynamic field grouping

## Enable Field List

### Popup Mode (Default)

Display field list through toolbar icon or programmatically:

```html
<ejs-pivotview id="PivotView" height="400" width="100%" showFieldList="true">
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

**How It Works:**
- `showFieldList="true"` - Adds a "Field List" button to toolbar
- Clicking the button opens a modal dialog
- Users drag fields within the field list to modify pivot structure
- Field list updates pivot table in real-time
- Click close button or click outside to close modal

### Field List UI Layout

```
┌──────────────────────────┐
│ Field List - Pivot Table │  (Modal Dialog)
├──────────────────────────┤
│ 🔍 Search Fields...      │  (Search box)
├──────────────────────────┤
│ ✓ Available Fields:      │
│   ☐ ProductID           │
│   ☐ ProductName         │
│   ☐ CustomerID          │
│   ☑ Amount              │
│   ☑ Quantity            │
├──────────────────────────┤
│ Rows:      Columns:     │
│ ☑ Country  ☑ Year      │
│                ☑ Quarter│
├──────────────────────────┤
│ Values:    Filters:     │
│ ☑ Amount   ☐ (empty)   │
│            │
│      [OK]  [Cancel]     │
└──────────────────────────┘
```

## Field List Modes

### Popup Mode (Default)

Field list appears in a modal dialog when toolbar button clicked:

```html
<ejs-pivotview id="PivotView" height="400" width="100%" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Characteristics:**
- Modal dialog opens on button click
- Field list hidden until explicitly opened
- Maximizes screen space for pivot table
- Best for desktop/tablet applications

### Fixed Mode (Always Visible) - Standalone Field List

**CRITICAL DISTINCTION:**
- `showFieldList="true"` on `<ejs-pivotview>` = Popup field list (modal dialog)
- Standalone `<ejs-pivotfieldlist>` = Fixed field list (always visible, sidebar)

To have a permanently visible field list, you MUST use a separate `PivotFieldList` component:

```html
<div style="display: flex; gap: 10px; width: 100%; height: 600px;">
    <!-- Fixed Field List Sidebar (Left) -->
    <div style="width: 300px; border-right: 1px solid #e0e0e0;">
        <ejs-pivotfieldlist id="fieldlist" renderMode="Fixed">
            <e-datasourcesettings dataSource="@ViewBag.DataSource">
                <e-fieldlist-rows>
                    <e-field name="Country"></e-field>
                    <e-field name="Products"></e-field>
                </e-fieldlist-rows>
                <e-fieldlist-columns>
                    <e-field name="Year" caption="Year"></e-field>
                    <e-field name="Quarter"></e-field>
                </e-fieldlist-columns>
                <e-fieldlist-values>
                    <e-field name="Sold" caption="Units Sold"></e-field>
                    <e-field name="Amount" caption="Sold Amount"></e-field>
                </e-fieldlist-values>
            </e-datasourcesettings>
        </ejs-pivotfieldlist>
    </div>
    
    <!-- Pivot Table (Right) - Synchronized with Field List -->
    <div style="flex: 1;">
        <ejs-pivotview id="PivotView" height="600" width="100%"></ejs-pivotview>
    </div>
</div>
```

**Synchronization via JavaScript:**

```javascript
var pivotObj;
var fieldlistObj;

// When pivot table engine is populated
function onGridEnginePopulate(args) {
    fieldlistObj = document.getElementById('fieldlist').ej2_instances[0];
    if (fieldlistObj) {
        fieldlistObj.update(pivotObj);
    }
}

// When field list engine is populated
function onFieldListEnginePopulate(args) {
    pivotObj = document.getElementById('PivotView').ej2_instances[0];
    fieldlistObj = document.getElementById('fieldlist').ej2_instances[0];
    fieldlistObj.updateView(pivotObj);
}
```

**Key Points for Fixed Field List:**
- Set `renderMode="Fixed"` on `<ejs-pivotfieldlist>` tag (NOT `<e-rendersettings>`)
- Use `<e-fieldlist-rows>`, `<e-fieldlist-columns>`, `<e-fieldlist-values>` tags for field list data source
- `<ejs-pivotview>` remains empty of datasource settings (synchronized via JavaScript)
- When user drags fields in field list, use `fieldListObj.updateView(pivotObj)` to sync Pivot Table
- Field list remains **permanently visible** on the page
- Takes up screen space but provides seamless drag-drop experience
- Best for: exploratory data analysis, power users who frequently reorganize fields

## Field List Features

### Drag-and-Drop Field Arrangement

```html
<ejs-pivotview id="PivotView" height="400" width="100%" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <!-- Initial configuration -->
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**User Interactions:**
- Drag fields from **"Available Fields"** → Row/Column/Value/Filter areas
- Drag fields **between different axes** to reorganize
- Double-click field to add to value area (default aggregation)
- Right-click for context menu options
- Drag field OUT of axis area to remove it

### Modify Aggregation Types

Click dropdown on value fields to change how values are calculated:

```
Values Section:
  [ Sales Amount ▼ ]  ← Click dropdown arrow
```

**Available Aggregation Functions:**
- **Numeric Fields**: Sum (default), Average, Min, Max, Count, DistinctCount, Product, StandardDeviation, StandardDeviationP, SampleVariance, PopulationVariance
- **String/Date Fields**: Count, DistinctCount only

**Example Scenario:**
1. Drag "Amount" field to Values area (default: Sum)
2. Click dropdown on "Amount" in Values area
3. Select "Average" to change to Average(Amount)
4. Pivot table updates automatically

### Filter Fields Dynamically

Click filter icon next to dimension fields to apply member filters:

```
Rows Section:
  [ Country 🔍 ]  ← Click filter icon
```

**Opens Filter Dialog to:**
- Include/exclude specific members
- Search member list for quick filtering
- Filter by text patterns
- Apply complex member filters

### Sort Fields in Ascending/Descending

Click sort icon to toggle sort direction:

```
Columns Section:
  [ Year ↑ ]  ← Click to change sort order
```

**Toggle Behavior:** Ascending → Descending → None → Ascending

## Standalone PivotFieldList

### Complete Fixed Field List + Pivot Example

```html
<div class="field-pivot-container" style="display: flex; height: 600px; width: 100%; gap: 10px;">
    
    <!-- Standalone Field List (Fixed, Always Visible) -->
    <div class="field-list-panel" style="width: 280px; border: 1px solid #ddd; border-radius: 4px;">
        <ejs-pivotfieldlist id="fieldlist" renderMode="Fixed" allowCalculatedField="true" enginePopulated="onFieldListEnginePopulate">
            <e-datasourcesettings dataSource="@ViewBag.DataSource">
                <e-fieldlist-rows>
                    <e-field name="Country"></e-field>
                </e-fieldlist-rows>
                <e-fieldlist-columns>
                    <e-field name="Year"></e-field>
                </e-fieldlist-columns>
                <e-fieldlist-values>
                    <e-field name="Sales"></e-field>
                </e-fieldlist-values>
            </e-datasourcesettings>
        </ejs-pivotfieldlist>
    </div>
    
    <!-- Pivot Table (Synchronized with Field List) -->
    <div class="pivot-table-panel" style="flex: 1; border: 1px solid #ddd; border-radius: 4px; overflow: auto;">
        <ejs-pivotview id="PivotView" height="600" width="100%" enginePopulated="onGridEnginePopulate"></ejs-pivotview>
    </div>
</div>
```

**JavaScript Synchronization:**

```javascript
var pivotObj;
var fieldlistObj;

function onGridEnginePopulate(args) {
    pivotObj = document.getElementById('PivotView').ej2_instances[0];
    fieldlistObj = document.getElementById('fieldlist').ej2_instances[0];
    if (fieldlistObj) {
        fieldlistObj.update(pivotObj);
    }
}

function onFieldListEnginePopulate(args) {
    pivotObj = document.getElementById('PivotView').ej2_instances[0];
    fieldlistObj = document.getElementById('fieldlist').ej2_instances[0];
    if (pivotObj) {
        fieldlistObj.updateView(pivotObj);
    }
}
```

**Benefits:**
- More intuitive UI for complex pivot configurations
- Field list always visible for quick adjustments
- No modal dialogs to manage
- All field operations accessible without clicking buttons
- Better for exploratory data analysis workflows

**Important Note - ASP.NET Core Syntax:**

⚠️ **Do NOT use `<e-rendersettings>` tag** in ASP.NET Core. It does not exist in ASP.NET Core tag helpers. Instead:
- Use `renderMode="Fixed"` or `renderMode="Popup"` as an attribute on `<ejs-pivotfieldlist>`
- Use `<e-fieldlist-rows>`, `<e-fieldlist-columns>`, `<e-fieldlist-values>`, `<e-fieldlist-formatsettings>` for field list data source
- This `renderMode` attribute is ASP.NET Core tag helper specific syntax

**Trade-offs:**
- Reduces space available for pivot table (field list takes ~300px)
- Requires flex layout management and JavaScript synchronization
- Less suitable for mobile/small screens

## Search Desired Field

### Search in Popup Field List

To enable search in the built-in popup Field List, set `enableFieldSearching="true"` on the `<ejs-pivotview>` tag:

```html
<ejs-button id="fieldlistbtn" content="Field List" isPrimary="true"></ejs-button>

<div id="Popup_FieldList"></div>

<ejs-pivotview id="PivotView" height="300" enableFieldSearching="true" enginePopulated="onGridEnginePopulate"></ejs-pivotview>

<ejs-pivotfieldlist id="PivotFieldList" renderMode="Popup" target="#Popup_FieldList" enginePopulated="onFieldListEnginePopulate">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-fieldlist-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-fieldlist-rows>
        <e-fieldlist-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-fieldlist-columns>
        <e-fieldlist-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-fieldlist-values>
    </e-datasourcesettings>
</ejs-pivotfieldlist>

<style>
    .e-toggle-field-list {
        display: none !important;
    }
</style>

<script>
    var pivotObj; var fieldlistObj;
    function onGridEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        if (fieldlistObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        fieldlistObj.updateView(pivotObj);
    }
    document.getElementById('fieldlistbtn').onclick = function () {
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        fieldlistObj.dialogRenderer.fieldListDialog.show();
    };
</script>
```

### Search in Fixed/Standalone Field List

To enable search in the standalone Field List, set `enableFieldSearching="true"` on the `<ejs-pivotfieldlist>` tag:

```html
<ejs-pivotview id="PivotView" height="300" enginePopulated="onGridEnginePopulate"></ejs-pivotview>

<ejs-pivotfieldlist id="Static_FieldList" renderMode="Fixed" enableFieldSearching="true" enginePopulated="onFieldListEnginePopulate">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-fieldlist-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-fieldlist-rows>
        <e-fieldlist-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-fieldlist-columns>
        <e-fieldlist-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-fieldlist-values>
    </e-datasourcesettings>
</ejs-pivotfieldlist>
```

**Search Workflow:**
1. Type field name in search box at top of field list
2. Field list filters in real-time as you type
3. Example: Type "Prod" matches ProductID, ProductName, ProductCategory
4. Drag desired field to axis area
5. Click X button to clear search

**Search Features:**
- **Real-time Filtering**: Results update as you type
- **Partial Matching**: "Prod" matches ProductID, ProductName, ProductCategory
- **Case Insensitive**: "PRODUCT" matches "product"
- **Works in Both Modes**: Popup and Fixed field list support search

## Group Fields Under Custom Names

### Group Related Fields

Organize fields into custom folders in the Field List using the `<e-fieldmapping>` section with the `groupName` property:

```html
<ejs-pivotview id="PivotView" height="350" showGroupingBar="true" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" allowLabelFilter="true" allowValueFilter="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Production Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
        <e-fieldmapping>
            <e-field name="Quarter" groupName="Product Category"></e-field>
            <e-field name="Products" groupName="Product Category"></e-field>
            <e-field name="Amount" caption="Sold Amount" groupName="Product Category"></e-field>
        </e-fieldmapping>
    </e-datasourcesettings>
</ejs-pivotview>
```

**How Grouping Works:**
- Use `<e-fieldmapping>` to define field groups in the Field List
- Set `groupName="Product Category"` to group related fields together
- Fields with same `groupName` appear under a folder in Field List
- Users can expand/collapse group folders
- Improves UX when dataset has 50+ fields

**Key Points:**
- Fields can only be grouped under a **single level** (no nested groups)
- Use `caption` to provide friendly names within the group
- Groups appear as collapsible folders in Field List UI

## Remove Specific Fields From Displaying

### Hide Sensitive or Unnecessary Fields

To hide specific fields from the Field List, use the `excludeFields` attribute on `<e-datasourcesettings>` to pass an array of field names to exclude:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" excludeFields="@ViewBag.ExcludeFields" expandAll="false" enableSorting="true" allowLabelFilter="true" allowValueFilter="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
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

**Controller Setup:**

```csharp
public class PivotController : Controller
{
    public ActionResult Index()
    {
        // Define fields to exclude from field list
        var excludeFields = new string[] { "InternalID", "RowNumber", "Status" };
        
        ViewBag.DataSource = GetDataSource();
        ViewBag.ExcludeFields = excludeFields;
        
        return View();
    }
}
```

**Why Hide Fields:**
- **Security**: Hide sensitive data (SSN, email addresses, internal IDs)
- **Simplify**: Hide technical fields (row numbers, internal identifiers)
- **Clarity**: Show only business-relevant fields to users
- **Performance**: Reduce cognitive load when dataset has 100+ fields

**Important Note:**
- Excluded fields are **hidden from Field List** but still available in data source
- They won't appear in the available fields section
- Users cannot drag/add them to any axis
- Data source still contains all fields for processing

## Changing Aggregation Type of Value Fields

### Runtime Aggregation Changes

Users can change how values are calculated in real-time:

```html
<!-- Initial setup with custom aggregation -->
<ejs-pivotview id="PivotView" height="400" width="100%" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="Sum" caption="Total Sales"></e-field>
            <e-field name="Quantity" type="Avg" caption="Avg Quantity"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**User Workflow:**
1. Open field list
2. In "Values" section, click dropdown on "Total Sales"
3. Select "Average" instead of "Sum"
4. Pivot table immediately updates showing average sales

**Common Aggregation Switches:**
- **Sales Analysis**: Sum → Average (compare per-transaction values)
- **Performance Metrics**: Average → Max/Min (find outliers)
- **Counting**: Sum → DistinctCount (unique occurrences)

## Set Caption to Fields Which Isn't Bound to the Report

### Display Names for Fields

Use the `caption` attribute to provide user-friendly names:

```html
<e-datasourcesettings dataSource="@ViewBag.DataSource">
    <e-rows>
        <e-field name="CountryCode" caption="Country"></e-field>
        <e-field name="ProductSKU" caption="Product"></e-field>
    </e-rows>
    <e-columns>
        <e-field name="FiscalYear" caption="Year"></e-field>
    </e-columns>
    <e-values>
        <e-field name="OrderAmount" caption="Sales Amount"></e-field>
        <e-field name="OrderQuantity" caption="Units Sold"></e-field>
    </e-values>
</e-datasourcesettings>
```

**Why Use Captions:**
- Database field names (CountryCode) vs user-friendly names (Country)
- Spaces in display names (can't use in field names)
- Multiple languages via localization
- Acronyms explained (SKU → "Stock Keeping Unit")

## Show Values Button

### Display Values Axis in Field List

When values are not visible in upper part of field list, show "Values" button:

```html
<ejs-pivotfieldlist id="fieldlist" renderMode="Fixed" showValuesButton="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-fieldlist-rows>
            <e-field name="Country"></e-field>
            <e-field name="Product"></e-field>
        </e-fieldlist-rows>
        <e-fieldlist-columns>
            <e-field name="Year"></e-field>
        </e-fieldlist-columns>
        <e-fieldlist-values>
            <e-field name="Sales"></e-field>
            <e-field name="Profit"></e-field>
        </e-fieldlist-values>
    </e-datasourcesettings>
</ejs-pivotfieldlist>
```

**When Used:**
- When field list is too crowded with many fields
- Values button toggles visibility of Values area
- Saves space in constrained layouts

## Calculated Fields

### Allow Users to Create Calculated Fields

Enable power users to create custom calculated fields:

```html
<ejs-pivotview id="PivotView" height="400" width="100%" 
    showFieldList="true" allowCalculatedField="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
            <e-field name="Profit"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**User Workflow:**
1. Open Field List dialog
2. Look for "New Calculate Field" or similar option
3. Enter field name and formula (e.g., "Profit Margin = Profit / Sales * 100")
4. New calculated field appears in Values area
5. Use like any other calculated value

**Example Calculated Fields:**
- **Profit Margin**: `(Profit / Sales) * 100` - Shows % of profit
- **ROI**: `(Profit / Investment) * 100` - Return on investment
- **Market Share**: `(OurSales / TotalMarketSales) * 100`
- **Variance**: `CurrentYear - PreviousYear` - Year-over-year change

## Show Field List Using Toolbar

### Display Field List Icon in Toolbar

To show the Field List button in the Pivot Table toolbar, set both `showFieldList="true"` and `showToolbar="true"` on the `<ejs-pivotview>` tag, and include `"FieldList"` in the toolbar collection:

```html
<ejs-pivotview id="pivotview" showToolbar="true" showFieldList="true" width="100%" height="300" 
    toolbar="@(new List<string>() { "FieldList" })">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Points:**
- `showToolbar="true"` - Displays the toolbar above the Pivot Table
- `showFieldList="true"` - Enables Field List functionality
- `toolbar="@(new List<string>() { "FieldList" })"` - Adds FieldList button to toolbar
- **Field List icon** appears in toolbar instead of top-left corner
- Click toolbar icon to open Field List dialog
- Saves space compared to always-visible field list

**When to Use:**
- ✓ Dashboard designs with toolbar at top
- ✓ Space-constrained layouts
- ✓ Business users who occasionally modify fields
- ✓ Mobile-friendly interfaces (field list opens as modal)

## Best Practices

✓ **Use Captions**: Always provide user-friendly captions for field names
✓ **Group Related Fields**: Use groupName to organize fields into folders
✓ **Search Optimization**: Enable enableFieldSearching for 50+ field datasets
✓ **Hide Sensitive Data**: Use excludeFields to prevent showing SSN, email, internal IDs
✓ **Fixed for Power Users**: Use standalone field list for exploratory analysts
✓ **Popup for Business Users**: Use showFieldList for users who rarely modify structure
✓ **Calculated Fields**: Enable allowCalculatedField for analyst users
✓ **Deferred Updates**: Use allowDeferLayoutUpdate when users perform multiple operations
✓ **Mobile Consideration**: Popup mode works better on mobile than fixed mode
✓ **Performance**: Limit visible fields to < 100 for better UX (use search for larger sets)
```html
<ejs-pivotfieldlist id="fieldList" enableFieldSearching="true">
```

✓ **Use standalone field list** for power user workflows
```html
<ejs-pivotfieldlist id="fieldList"></ejs-pivotfieldlist>
```

✓ **Combine field list with grouping bar** for maximum flexibility
```html
<ejs-pivotview id="PivotView" showFieldList="true" showGroupingBar="true">
```

❌ **Avoid:** Showing field list by default on small screens
❌ **Avoid:** Large number of fields without search enabled
❌ **Avoid:** Deferred update with single field operations
❌ **Avoid:** Complex field names without clear descriptions

## Important Notes

- Field list **requires data source configuration** to display fields
- Can be **popup** (showFieldList="true") or **standalone** (ejs-pivotfieldlist)
- **Drag-drop** works between all field areas
- Field list **automatically updates** when data source changes
- **Search is case-insensitive** and partial-match enabled
- Deferred update **improves performance** for batch operations
- Field list **maintains state** with save/load functionality
- **Keyboard support** for accessibility (Tab, Enter, Arrow keys)
