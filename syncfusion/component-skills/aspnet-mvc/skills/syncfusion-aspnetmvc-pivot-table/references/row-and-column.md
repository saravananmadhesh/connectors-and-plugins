# Row and Column Configuration in ASP.NET MVC Pivot Table

## Table of Contents
- [Width and Height](#width-and-height)
- [Row Height](#row-height)
- [Column Width](#column-width)
- [Adjust Width Based on Columns](#adjust-width-based-on-columns)
- [Reorder](#reorder)
- [Column Resizing](#column-resizing)
- [Text Wrap](#text-wrap)
- [Text Align](#text-align)
- [AutoFit](#autofit)
- [Grid Lines](#grid-lines)
- [Selection](#selection)
- [Clip Mode](#clip-mode)
- [Cell Template](#cell-template)

## Width and Height

Set the overall pivot table dimensions using `Height` and `Width` properties on the PivotView:

```csharp
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>
    )ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).Height("450px").Width("100%").Render()
    ```

    **Supported Formats:**
    - **Pixel**: `"450px"`, `"800px"`
    - **Percentage**: `"100%"`, `"200%"`
    - **Auto** (Height only): `"auto"` - expands beyond parent container

    **Note:** Minimum width is 400px.

    ## Row Height

    Adjust row height for better readability using `RowHeight` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.RowHeight(60)).Height("450").Width("100%").Render()
    ```

    **Default Values:**
    - Desktop: 36 pixels
    - Mobile: 48 pixels

    ## Column Width

    Control default column width using `ColumnWidth` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.ColumnWidth(200)).Height("450").Width("100%").Render()
    ```

    **Default Values:**
    - Regular columns: 110 pixels
    - First column (grouping bar enabled): 250 pixels
    - First column (grouping bar disabled): 200 pixels

    ## Adjust Width Based on Columns

    Prevent auto-stretching of columns by using `AllowAutoResizing` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.AllowAutoResizing(false)).Height("450").Width("100%").Render()
    ```

    When `AllowAutoResizing(false)`, the pivot table width adjusts to match the combined width of all columns.

    ## Reorder

    Enable column header reordering by setting `AllowReordering` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); }).Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.AllowReordering(true)).Height("450").Width("100%").Render()
    ```

    **User Interaction:**
    - Click and drag any column header to new position
    - Click and drag row headers to reorder row fields
    - Visual indicator shows drop position

    ## Column Resizing

    Allow users to resize columns by dragging column borders using `AllowResizing` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.AllowResizing(true)).Height("450").Width("100%").Render()
    ```

    **User Actions:**
    - Drag the right edge of any column header to resize
    - Double-click column border to auto-fit width
    - RTL Mode: Drag left edge of header cell

    ## Text Wrap

    Enable text wrapping for cell content using `AllowTextWrap` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.AllowTextWrap(true)).Height("450").Width("100%").Render()
    ```

    **Result:**
    - Cell text wraps to next line when exceeding column width
    - Row height expands to fit wrapped content
    - Useful for long field names or captions

    ## Text Align

    Align cell content using the `ColumnRender` event in GridSettings with `stackedColumns`:

    ```csharp
    @using Syncfusion.EJ2.PivotView

    @Html.EJS().PivotView("PivotView").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(true)
    .FormatSettings(formatsettings =>
    {
        formatsettings.Name("Amount").Format("C0").MaximumSignificantDigits(10).MinimumSignificantDigits(1).UseGrouping(true).Add();
    }).Rows(rows =>
    {
        rows.Name("Country").Add(); rows.Name("Products").Add();
    }).Columns(columns =>
    {
        columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
    }).Values(values =>
    {
        values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
    })).GridSettings(gridSettings => gridSettings.ColumnRender("columnRender")).Render()

    <script>
        function columnRender(args) {
            if (args.stackedColumns[0]) {
                // Content for the row headers is right-aligned here.
                args.stackedColumns[0].textAlign = "Right";
            }
            if (args.stackedColumns[1]) {
                // Content for the column header "FY 2015" is center-aligned here.
                args.stackedColumns[1].textAlign = 'Center';
            }
            if (args.stackedColumns[1] && args.stackedColumns[1].columns[0]) {
                // Content for the column header "Q1" is right-aligned here.
                args.stackedColumns[1].columns[0].textAlign = 'Right';
            }
            if (args.stackedColumns[1] && args.stackedColumns[1].columns[0] && args.stackedColumns[1].columns[0].columns[0]) {
                // Content for the value header "Units Sold" is right-aligned here.
                args.stackedColumns[1].columns[0].columns[0].headerTextAlign = 'Right';
            }
            if (args.stackedColumns[1] && args.stackedColumns[1].columns[0] && args.stackedColumns[1].columns[0].columns[0]) {
                // Content for the values are left-aligned here.
                args.stackedColumns[1].columns[0].columns[0].textAlign = 'Left';
            }
        }
    </script>
    ```

    **Alignment Options:**
    - `Left` - Left align content
    - `Right` - Right align content
    - `Center` - Center align content
    - Use `textAlign` property for cell alignment
    - Use `headerTextAlign` property for header alignment

    ## AutoFit

    Automatically adjust column widths to fit content using the `AutoFitColumns` method:

    ```csharp
    <button onclick="autoFitColumns()">AutoFit Columns</button>

    <script>
        function autoFitColumns() {
            var pivotObj = document.getElementById('pivotview').ej2_instances[0];
            pivotObj.gridModule.autoFitColumns();  // Auto-fit all columns
        }
    </script>
    ```

    **AutoFit Specific Columns:**

    Set `autoFit` to true in the `ColumnRender` event:

    ```csharp
    @Html.EJS().PivotView("pivotview")
    .GridSettings(gs => gs
    .ColumnRender("columnRender"))
    .Render()

    <script>
        function columnRender(args) {
            if (args.Field === "Year") {
                args.AutoFit = true;  // Auto-fit this column
            }
        }
    </script>
    ```

    **Note:** First column has minimum width of 250px when grouping bar is enabled.

    ## Grid Lines

    Control grid line display using `GridLines` in GridSettings:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).GridSettings(gs => gs.GridLines("Vertical")).Height("450").Width("100%").Render()
    ```

    **Line Modes:**
    - `Both` - Horizontal and vertical lines (default)
    - `None` - No grid lines
    - `Horizontal` - Only horizontal lines
    - `Vertical` - Only vertical lines
    - `Default` - Based on applied theme

    ## Selection

    Enable cell selection using `AllowSelection` in GridSettings:

    ```csharp
    @using Syncfusion.EJ2.PivotView

    @Html.EJS().PivotView("PivotView").Height("300").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
    .FormatSettings(formatsettings =>
    {
        formatsettings.Name("Amount").Format("C0").MaximumSignificantDigits(10).MinimumSignificantDigits(1).UseGrouping(true).Add();
    }).Rows(rows =>
    {
        rows.Name("Country").Add(); rows.Name("Products").Add();
    }).Columns(columns =>
    {
        columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
    }).Values(values =>
    {
        values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
    })).GridSettings(gridSettings => gridSettings.AllowSelection(true).SelectionSettings(selectionSettings => selectionSettings.Type("Multiple"))).Render()
    ```

    **Selection Types:**
    - `Single` - Select one row, column, or cell at a time (default)
    - `Multiple` - Select multiple using CTRL+Click or SHIFT+Click

    **Selection Modes:**
    - `Row` - Select entire row (default)
    - `Column` - Select entire column
    - `Cell` - Select individual cells
    - `Both` - Select rows and columns

    **Cell Selection Modes:**
    - `Flow` - Continuous range selection (default)
    - `Box` - Rectangular block selection
    - `BoxWithBorder` - Box with highlighted borders

    ## Clip Mode

    Control how overflowing cell content is displayed using `ClipMode` in GridSettings:

    ```csharp
    @using Syncfusion.EJ2.PivotView

    @Html.EJS().PivotView("PivotView").Height("300").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
    .FormatSettings(formatsettings =>
    {
        formatsettings.Name("Amount").Format("C0").MaximumSignificantDigits(10).MinimumSignificantDigits(1).UseGrouping(true).Add();
    }).Rows(rows =>
    {
        rows.Name("Country").Add(); rows.Name("Products").Add();
    }).Columns(columns =>
    {
        columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
    }).Values(values =>
    {
        values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
    })).GridSettings(gridSettings => gridSettings.ClipMode("Clip")).Render()
    ```

    **Clip Modes:**
    - `"Clip"` - Cut off overflowing content
    - `"Ellipsis"` - Show ellipsis (`...`) for long content (default)
    - `"EllipsisWithTooltip"` - Show ellipsis with full content in tooltip on hover

    ## Cell Template

    Customize cell appearance using `CellTemplate` property:

    ```csharp
    @Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
            .DataSource((IEnumerable<object>)ViewBag.DataSource)
            .Rows(rows => { rows.Name("Country").Add(); })
            .Columns(columns => { columns.Name("Year").Add(); })
            .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).CellTemplate("<div class='custom'><strong>${value}</strong></div>").Height("450").Width("100%").Render()
    ```

    **Use Cases:**
    - Add icons or images
    - Apply custom formatting
    - Display calculated values
    - Add status indicators

    **Note:** CellTemplate triggers on every configuration change (sorting, filtering, etc.), so using complex templates with large datasets may cause flickering.
