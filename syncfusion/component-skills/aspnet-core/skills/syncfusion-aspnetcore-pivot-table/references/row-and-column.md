# Row and Column Configuration in Pivot Table

## Table of Contents
- [Width and Height](#width-and-height)
- [Row Height](#row-height)
- [Column Width](#column-width)
- [Adjust Width Based on Columns](#adjust-width-based-on-columns)
- [Reorder Columns](#reorder-columns)
- [Column Resizing](#column-resizing)
- [Text Wrap](#text-wrap)
- [Text Align](#text-align)
- [AutoFit Columns](#autofit-columns)
- [Grid Lines](#grid-lines)
- [Selection](#selection)
- [Clip Mode](#clip-mode)
- [Cell Template](#cell-template)
- [Best Practices](#best-practices)

## Width and Height

Set the overall dimensions of the pivot table container to control layout and scrolling behavior.

### Basic Width and Height Configuration

```html
<ejs-pivotview id="PivotView" width="550" height="315px">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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

**Width/Height Formats:**
- **Pixels:** `width="550"` or `height="315px"`
- **Percentage:** `width="100%"` or `height="80%"`
- **Auto:** `height="auto"` (expands to content, desktop only)
- **Viewport:** `height="100vh"` (full viewport height)

## Row Height

Set uniform or variable row heights to improve readability and accommodate more content.

### Set Uniform Row Height for All Rows

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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
    <e-gridSettings rowHeight="60"></e-gridSettings>
</ejs-pivotview>
```

**Default Row Heights:**
- Desktop: 36 pixels
- Mobile: 48 pixels
- Grouping Bar enabled: May adjust based on content

### Use Cases for Row Height:
- **Content overflow:** Increase to 50-60px for wrapped text or images
- **Compact view:** Set to 30-35px for dense data display
- **Accessibility:** Expand to 48px+ for touch-friendly targets on mobile

## Column Width

Control the width of grid columns to fit content and improve visual presentation.

### Set Uniform Column Width

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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
    <e-gridSettings columnWidth="120"></e-gridSettings>
</ejs-pivotview>
```

**Default Column Widths:**
- Regular columns: 110 pixels
- First column (with grouping bar): 250 pixels
- First column (without grouping bar): 200 pixels

## Adjust Width Based on Columns

Prevent columns from auto-stretching to fill container width. Set to false to maintain fixed column widths.

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-gridSettings allowAutoResizing="false"></e-gridSettings>
</ejs-pivotview>
```

**Behavior:**
- `allowAutoResizing="true"` (default): Columns auto-stretch to fill available width
- `allowAutoResizing="false"`: Columns maintain fixed width, horizontal scrollbar appears if needed

**Use Case:** Preserve exact column widths for precise layouts, especially with fixed column widths set.

## Reorder Columns

Allow users to drag and drop column headers to reorder columns in the grid.

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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
    <e-gridSettings allowReordering="true"></e-gridSettings>
</ejs-pivotview>
```

**Behavior:**
- Enabled by default in most scenarios
- Users can drag column headers left/right to reorder
- Reorder state can be persisted to state storage

## Column Resizing

Enable or disable the ability to resize columns by dragging the column border.

```html
<ejs-gridSettings allowResizing="true"></e-gridSettings>
```

**Behavior:**
- `allowResizing="true"` (default): Users can resize columns by dragging borders
- `allowResizing="false"`: Column borders are not draggable

**Use Case:** 
- Enable for flexible layouts where users need to adjust column widths
- Disable when column widths must remain fixed

## Text Wrap

Allow cell content to wrap to multiple lines within cells instead of being clipped.

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-gridSettings allowTextWrap="true"></e-gridSettings>
</ejs-pivotview>
```

**Behavior:**
- `allowTextWrap="true"`: Content wraps to multiple lines, rows expand to fit
- `allowTextWrap="false"` (default): Content is clipped or truncated

**Use Case:** Display long field names or values fully without truncation, increases row heights dynamically.

## Text Align

Text alignment provides flexibility in positioning content within cells, making the data presentation more organized and visually appealing. You can align the content of the Pivot Table's row headers, column headers, and value cells using the textAlign and headerTextAlign properties in the columnRender event under e-gridSettings. The available alignment options are:

- **Left** - Positions the content on the left side of the cell.
- **Right** - Positions the content on the right side of the cell.
- **Center** - Positions the content in the center of the cell.
- **Justify** - Distributes the content evenly across the cell width for optimal space utilization.

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true" width="650">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="true">
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
    <e-gridSettings columnRender="columnRender"></e-gridSettings>
</ejs-pivotview>

<script>
    function columnRender(args) {
        if(args.stackedColumns[0]){
            // Content for the row headers is right-aligned here.
            args.stackedColumns[0].textAlign="Right";
        }
        if(args.stackedColumns[1]){
            // Content for the column header "FY 2015" is center-aligned here.
            args.stackedColumns[1].textAlign = 'Center';
        }
        if(args.stackedColumns[1] && args.stackedColumns[1].columns[0]){
            // Content for the column header "Q1" is right-aligned here.
            args.stackedColumns[1].columns[0].textAlign = 'Right';
        }
        if(args.stackedColumns[1] && args.stackedColumns[1].columns[0] && args.stackedColumns[1].columns[0].columns[0]){
            // Content for the value header "Units Sold" is right-aligned here.
            args.stackedColumns[1].columns[0].columns[0].headerTextAlign = 'Right';    
        }
        if(args.stackedColumns[1] && args.stackedColumns[1].columns[0] && args.stackedColumns[1].columns[0].columns[0]){
            // Content for the values are left-aligned here.
            args.stackedColumns[1].columns[0].columns[0].textAlign = 'Left';     
        }
    }
</script>
```

## AutoFit Columns

The AutoFit option allows users to easily adjust Pivot Table columns so that each column matches the width of its content, making the data easier to read without cell content being cut off or wrapped unnecessarily. To accomplish this, you can use the autoFitColumns method from the grid instance, which automatically resizes all Pivot Table columns based on the content of their cells.

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true" dataBound="ondataBound" width="650">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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

<script>
    function ondataBound(args) {
        var pivotTableObj = document.getElementById('PivotView').ej2_instances[0];
        pivotTableObj.grid.autoFitColumns();
    }
</script>
```

## Grid Lines

Control the visibility and style of grid lines separating rows and columns.

```html
<ejs-pivotview id="PivotView" height="300" load="onLoad">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    function onLoad(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.gridSettings.gridLines = "Both";
    }
</script>
```

**GridLines Options:**
- `Both` (default): Display horizontal and vertical lines
- `Horizontal`: Display horizontal lines only
- `Vertical`: Display vertical lines only
- `None`: Hide all grid lines
- `Default`: Use default grid appearance

**Use Case:**
- `None`: Clean, minimalist design for reports
- `Both`: High visibility for data-heavy layouts
- `Horizontal`: Focus on row separation for readability

## Selection

Enable users to select cells, rows, or entire columns with different selection modes.

### Basic Cell Selection

```html
<ejs-pivotview id="PivotView" height="300" load="onLoad">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-gridSettings allowSelection="true"></e-gridSettings>
</ejs-pivotview>

<script>
    var pivotObj;
    function onLoad(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.gridSettings.selectionSettings = {
            type: "Single",
            mode: "Cell"
        };
    }
</script>
```

### Multiple Row Selection

```html
<ejs-pivotview id="PivotView" height="300" load="onLoad">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-gridSettings allowSelection="true"></e-gridSettings>
</ejs-pivotview>

<script>
    var pivotObj;
    function onLoad(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.gridSettings.selectionSettings = {
            type: "Multiple",
            mode: "Row"
        };
    }
</script>
```

### Selection Configuration Options

**Type:**
- `Single`: Only one cell/row/column selectable
- `Multiple`: Multiple cells/rows/columns selectable with Ctrl+Click or Shift+Click

**Mode:**
- `Row`: Select entire rows
- `Column`: Select entire columns
- `Cell`: Select individual cells
- `Both`: Allow both row and column selection simultaneously

**CellSelectionMode:**
- `Flow`: Default; contiguous range selection
- `Box`: Select rectangular area
- `BoxWithBorder`: Box selection with visible border

## Clip Mode

Control how cell content is displayed when it exceeds column width.

```html
<ejs-pivotview id="PivotView" height="300" load="onLoad">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    function onLoad(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.gridSettings = {
            clipMode: "Ellipsis"
        };
    }
</script>
```

**Clip Mode Options:**
- `Clip` (default): Content is clipped/hidden when it exceeds column width
- `Ellipsis`: Shows truncated text with "..." at the end
- `EllipsisWithTooltip`: Truncated with "..." and tooltip on hover shows full content

**Use Case:**
- Protect layout from long text overflow
- Provide visual indicators (ellipsis) that content is truncated
- Enable tooltips for users to see full content

## Cell Template

Customize cell rendering with HTML templates for displaying custom content.

```html
<ejs-pivotview id="PivotView" height="300" cellTemplate="#template">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script type="text/x-template" id="template">
    <span>${value}</span>
</script>
```

### Advanced Cell Template with Formatting

```html
<script type="text/x-template" id="template">
    <span style="color: ${value > 500000 ? 'green' : 'red'}">${value}</span>
</script>
```

**Use Cases:**
- Display custom formatting or icons based on cell values
- Create conditional styling (color, bold, etc.)
- Integrate custom UI components in cells
- Show sparklines, progress bars, or custom graphics

## Best Practices

1. **Responsive Design:** Use percentages for width/height to enable responsive layouts
2. **Accessibility:** Ensure row height (48px+) on mobile for touch targets
3. **Performance:** Limit column width customization for large datasets; use auto-resizing cautiously
4. **Usability:** Enable text wrap and appropriate clip mode for long content
5. **Selection:** Configure selection mode based on user interaction patterns (analysis vs. reporting)
6. **Grid Lines:** Choose grid line style based on data density and readability needs
7. **Column Sizing:** Balance fixed widths (predictable layout) vs. variable widths (responsive)
8. **Scrolling:** Consider virtual scrolling for large tables with many rows/columns
<ejs-pivotview id="PivotView" height="450px">
    <e-gridSettings rowHeight="40">
    </e-gridSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Properties:**
- `rowHeight="40"` - Height in pixels for each row

### Row Height Defaults

| Device | Default | Use Case |
|--------|---------|----------|
| Desktop | 36px | Standard web applications |
| Tablet | 48px | Touch-friendly on tablets |
| Mobile | 48px | Larger tap targets |
| Print | 24px | Optimal for paper output |

### Custom Row Heights

```html
<!-- Larger rows for readability -->
<e-gridSettings rowHeight="50"></e-gridSettings>

<!-- Compact rows for data density -->
<e-gridSettings rowHeight="30"></e-gridSettings>

<!-- Extra large for accessibility -->
<e-gridSettings rowHeight="60"></e-gridSettings>
```

## Column Width Configuration

### Set Default Column Width

Apply uniform width to all columns:

```html
<ejs-pivotview id="PivotView" height="450px">
    <e-gridSettings columnWidth="150">
    </e-gridSettings>
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
```

**Properties:**
- `columnWidth="150"` - Width in pixels for each column

### Column Width Defaults

| Context | Default | Notes |
|---------|---------|-------|
| Regular columns | 110px | Standard data columns |
| Row header (first) | 250px | With grouping bar enabled |
| Row header (collapsed) | 150px | Without grouping bar |
| Value column | 120px | Numeric data |

### Width Recommendations

```html
<!-- Standard tables -->
<e-gridSettings columnWidth="120"></e-gridSettings>

<!-- Wide content (text fields) -->
<e-gridSettings columnWidth="180"></e-gridSettings>

<!-- Compact display (financial data) -->
<e-gridSettings columnWidth="100"></e-gridSettings>

<!-- Mobile-friendly -->
<e-gridSettings columnWidth="80"></e-gridSettings>
```

## Field Positioning

### Organize Fields Across Axes

Position fields on different axes:

```html
<ejs-pivotview id="PivotView" height="450px">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        
        <!-- Row axis (leftmost) -->
        <e-rows>
            <e-field name="Country" caption="Country"></e-field>
            <e-field name="State" caption="State"></e-field>
            <e-field name="Products" caption="Product Category"></e-field>
        </e-rows>
        
        <!-- Column axis (top) -->
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter" caption="Quarter"></e-field>
        </e-columns>
        
        <!-- Value axis (measurement) -->
        <e-values>
            <e-field name="Sold" caption="Units Sold" type="Sum"></e-field>
            <e-field name="Amount" caption="Sales Amount" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Output Layout:**
```
         Q1 2020 | Q2 2020 | Q3 2020 | Q4 2020
                | Units|Sales|Units|Sales|...
USA     |   100 |  $5K  | 120 | $6K | ...
  CA    |    60 |  $3K  |  70 | $3.5K | ...
  NY    |    40 |  $2K  |  50 | $2.5K | ...
Canada  |    80 |  $4K  | 100 | $5K | ...
```

### Field Nesting Order

Field order determines grouping hierarchy:

```html
<!-- Deep nesting (3 levels) -->
<e-rows>
    <e-field name="Country"></e-field>    <!-- First level -->
    <e-field name="State"></e-field>      <!-- Second level -->
    <e-field name="City"></e-field>       <!-- Third level -->
</e-rows>
```

**Nesting Impact:**
- **First field:** Top-level grouping
- **Subsequent fields:** Nested under previous
- **Drag to reorder:** Change grouping priority

## Headers and Subtotals

### Control Header Display

```html
<ejs-pivotview id="PivotView" height="450px">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <!-- Show/hide row field header -->
            <e-field name="Country" caption="Country"></e-field>
            <e-field name="Products" caption="Product"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Subtotals Configuration

```html
<ejs-pivotview id="PivotView" height="450px">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <!-- Display subtotals for this field -->
            <e-field name="Country" caption="Country" showSubTotals="true"></e-field>
            <e-field name="Products" caption="Product" showSubTotals="false"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Properties:**
- `showSubTotals="true"` (default) - Display subtotal rows
- `showSubTotals="false"` - Hide subtotal rows for field
- Grand totals always display (cannot be hidden)

## Responsive Design

### Mobile-Friendly Dimensions

```html
<ejs-pivotview id="PivotView" width="100%" height="100vh">
    <e-gridSettings columnWidth="100" rowHeight="40">
    </e-gridSettings>
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

<style>
    @media (max-width: 768px) {
        #PivotView {
            width: 100% !important;
            height: 500px !important;
        }
    }
    
    @media (max-width: 480px) {
        #PivotView {
            width: 100% !important;
            height: 350px !important;
        }
        
        .e-pivot {
            font-size: 12px;
        }
    }
</style>
```

## Best Practices

✓ **Use percentage for responsive layouts**
```html
<ejs-pivotview id="PivotView" width="100%" height="100vh">
```

✓ **Set reasonable row heights for data density**
```html
<e-gridSettings rowHeight="36"></e-gridSettings>
```

✓ **Configure column widths** based on content
```html
<e-gridSettings columnWidth="140"></e-gridSettings>
```

✓ **Order fields logically** for natural grouping
```html
<e-rows>
    <e-field name="Country"></e-field>
    <e-field name="State"></e-field>
</e-rows>
```

✓ **Show subtotals** for analytical clarity
```html
<e-field name="Country" showSubTotals="true"></e-field>
```

❌ **Avoid:** Fixed pixels for responsive designs
❌ **Avoid:** Too small row heights affecting readability
❌ **Avoid:** Overly wide columns wasting space
❌ **Avoid:** Deep nesting (>4 levels) causing confusion
❌ **Avoid:** Mixing fixed and percentage sizing

## Important Notes

- **Minimum width:** Pivot enforces minimum 400px width
- **Scrollbars:** Appear automatically when content exceeds dimensions
- **First column width:** May be wider with grouping bar enabled
- **Virtual scrolling:** Improves performance with large grids
- **Header height:** Automatically adjusted to accommodate content
- **Responsive design:** Use media queries for mobile optimization
- **Performance:** Large row heights reduce visible rows, improving performance
