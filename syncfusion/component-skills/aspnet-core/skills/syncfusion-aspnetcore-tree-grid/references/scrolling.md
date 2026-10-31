# Scrolling in Tree Grid

## Table of Contents

- [When to Use This Feature](#when-to-use-this-feature)
- [Basic Scrolling Configuration](#basic-scrolling-configuration)
- [Sticky Header](#sticky-header)
- [Scroll to Selected Row](#scroll-to-selected-row)
- [Row Virtualization](#row-virtualization)
- [Column Virtualization](#column-virtualization)
- [Infinite Scrolling](#infinite-scrolling)

## When to Use This Feature

Enable scrolling when your Tree Grid contains data that exceeds the visible viewport. Use this when you need to display large hierarchical datasets without performance degradation. Choose from three scrolling modes based on your data size and user interaction patterns:
- **Basic Scrolling**: Standard scrolling with fixed dimensions
- **Row Virtualization**: Optimal for thousands of rows with hierarchical data
- **Infinite Scrolling**: Ideal for lazy-loading large datasets from servers
- **Column Virtualization**: Use when you have many columns exceeding viewport width

## Basic Scrolling Configuration

The scrollbar is displayed in the Tree Grid when content exceeds the element width or height. The vertical and horizontal scrollbars appear based on the following criteria:

- The vertical scrollbar appears when the total height of rows present in the Tree Grid exceeds its element height.
- The horizontal scrollbar appears when the sum of columns width exceeds the Tree Grid element width.

By default, the height and width properties are set to `auto`.

### Set Width and Height

To specify the width and height of the scroller in pixels, set the pixel value to a number:

```html
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="315" width="400" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Responsive with Parent Container

Specify the width and height as 100% to make the Tree Grid element fill its parent container. Setting the height to 100% requires the Tree Grid parent element to have explicit height:

```html
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="100%" width="100%" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

## Sticky Header

The sticky header feature keeps the column headers fixed (sticky) while scrolling through large datasets. This ensures that the headers remain visible at all times, enhancing user experience by making it easier to understand the context of the data displayed.

To enable sticky headers in the Tree Grid, set the `enableStickyHeader` property to true. This makes the column headers stick to the top of the Tree Grid container or its parent scrolling container when you scroll vertically.

```html
<div style="height: 400px; overflow-y: auto; padding: 0px 10px 0px 10px; border: 1px solid #ddd;">
    <div style="padding: 20px 0px 20px 0px; display: flex">
        <label style="margin: -2px 5px 0px 0px; font-weight: bold;">Enable/Disable Sticky Header</label>
        <ejs-switch id="switch" checked="true" change="toggleStickyHeader"></ejs-switch>
    </div>
    <div style='height: 1000px'>
        <ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children" treeColumnIndex="1" enableStickyHeader="true" height="100%">
            <e-treegrid-columns>
                <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
                <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
                <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
                <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
            </e-treegrid-columns>
        </ejs-treegrid>
    </div>
</div>

<script>
    function toggleStickyHeader(args) {
        var treeGrid = document.getElementById("TreeGrid").ej2_instances[0];
        treeGrid.enableStickyHeader = args.checked ?? false;
    }
</script>
```

## Scroll to Selected Row

You can scroll the Tree Grid content to the selected row position by using the `rowSelected` event:

```html
<ejs-numerictextbox id="numeric" change="onChange" min="0" width="200" showSpinButton="false" format="##" placeholder="Enter index to select a row"></ejs-numerictextbox>

<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="270" width="100%" childMapping="Children" treeColumnIndex="1" rowSelected="rowSelected">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onChange(args) {
        var treegrid = document.getElementById("TreeGrid").ej2_instances[0];
        treegrid.selectRow(parseInt(this.getText(), 10));
    }
    function rowSelected(args) {
        var rowHeight = this.getRows()[treegrid.getSelectedRowIndexes()[0]].scrollHeight;
        this.getContent().children[0].scrollTop = rowHeight * this.getSelectedRowIndexes()[0];
    }
</script>
```

## Row Virtualization

Row virtualization allows you to load and render rows only in the content viewport. It is an alternative way of paging in which the rows are appended while scrolling vertically.

### Implementation

To setup row virtualization, define `enableVirtualization` as true and content height by the `height` property. The number of records displayed in the Tree Grid is determined implicitly by the height of the content area, and a buffer of records is maintained in the Tree Grid content in addition to the original set of rows.

The expand and collapse state of any child record is persisted during virtualization.

```html
<ejs-treegrid id="TreeGrid" height="600" dataSource="ViewBag.datasource" enableVirtualization="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Player Jersey" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD1" headerText="Player Name" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD2" headerText="Year" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="FIELD3" headerText="Stint" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD4" headerText="TMID" textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Limitations

Row virtual scrolling is not compatible with the following features:

- Batch editing
- Checkbox selection
- Detail template
- Row template
- Rowspan
- Auto-fill

Additional limitations:

- It is necessary to set a static height for the component or its parent container when using row virtualization. The 100% height will work only if the component height is set to 100%, and its parent container has a static height.
- When row virtual scrolling is activated, compatibility for copy-paste and drag-and-drop operations is limited to the data items visible in the current viewport of the Tree Grid.
- Cell-based selection is not supported for row virtual scrolling.
- Using different row heights with a template column, when the template height differs for each row, is not supported.
- The height of the Tree Grid content is calculated using the row height and total number of records in the data source. Features which change row height such as text wrapping are not supported.
- Due to the element height limitation in browsers, the maximum number of records loaded by the Tree Grid is limited by the browser capability.

If you want to increase the row height to accommodate content, specify the row height as follows:

```css
.e-treegrid .e-row {
    height: 2em;
}
```

## Column Virtualization

Column virtualization allows you to virtualize columns. It renders columns only in the current viewport, and all other columns are rendered on demand during horizontal scrolling.

### Implementation

To setup column virtualization, set the `EnableVirtualization` and `EnableColumnVirtualization` properties as `true`. Column width is required for column virtualization. If column width is not defined, the Tree Grid will consider its value as `200px`.

```html
<ejs-treegrid id="TreeGrid" height="600" dataSource="ViewBag.datasource" enableVirtualization="true" enableColumnVirtualization="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Player Jersey" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD1" headerText="Player Name" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD2" headerText="Year" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="FIELD3" headerText="Stint" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD4" headerText="TMID" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD6" headerText="GP" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD7" headerText="GS" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD8" headerText="Minutes" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD9" headerText="Points" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD10" headerText="oRebounds" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD11" headerText="dRebounds" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD12" headerText="Rebounds" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD13" headerText="Assists" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD14" headerText="Steals" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD15" headerText="Blocks" width="120" textAlign="Right"></e-treegrid-column>
        <e-treegrid-column field="FIELD16" headerText="Turnovers" width="120" textAlign="Right"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Limitations

Column virtual scrolling has the following limitations:

- Column width should be in pixels. Percentage values are not accepted.
- Selected column details are only retained within the viewport. When the next set of columns is loaded, the selection for previously visible columns is lost.
- Cell selection is not supported for column virtual scrolling.
- The Ctrl + Home and Ctrl + End keys are not supported when using column virtual scrolling.
- Column virtual scrolling is not compatible with the following features:
  - Colspan
  - Batch editing
  - Checkbox selection
  - Column with infinite scrolling
  - Stacked header
  - Row template
  - Detail template
  - Auto-fill
  - Column chooser

The following features are compatible with column virtualization and work only within the viewport:

- Column resizing
- Column reordering
- Auto-fit
- Print
- Clipboard
- Column menu (Column chooser, AutofitAll)

## Infinite Scrolling

Infinite scrolling is used to load a huge amount of data without degrading the Tree Grid performance. This feature works like the lazy loading concept, which means the buffer data is loaded only when the scrollbar reaches the end of the scroller.

To use infinite scrolling, set the `enableInfiniteScrolling` property as true. In this feature, Tree Grid will not make a new data request when you visit the same page again.

```html
<ejs-treegrid id="TreeGrid" height="600" dataSource="ViewBag.datasource" enableInfiniteScrolling="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-pagesettings pageSize="50"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Player Jersey" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD1" headerText="Player Name" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD2" headerText="Year" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="FIELD3" headerText="Stint" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD4" headerText="TMID" textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Initial Blocks Configuration

You can define the initial loading pages count by using the `initialBlocks` property of the `InfiniteScrollSettings` tag helper. By default, this feature loads three pages in initial rendering.

In the following example, the property value is set to load five page records instead of three:

```html
<ejs-treegrid id="TreeGrid" height="600" dataSource="ViewBag.datasource" enableInfiniteScrolling="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-infinitescrollsettings initialBlocks="5"></e-treegrid-infinitescrollsettings>
    <e-treegrid-pagesettings pageSize="50"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Player Jersey" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD1" headerText="Player Name" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD2" headerText="Year" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="FIELD3" headerText="Stint" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD4" headerText="TMID" textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Cache Mode

Cache is used to store the loaded rows object in the Tree Grid instance which can be reused for creating row elements whenever you scroll to an already visited page. This mode maintains row elements based on the `maxBlocks` count value of the `InfiniteScrollSettings` tag helper. Once this limit is exceeded, it will remove row elements from DOM for new rows.

To enable cache mode in infinite scrolling, set the `enableCache` property of `InfiniteScrollSettings` tag helper as true:

```html
<ejs-treegrid id="TreeGrid" height="600" dataSource="ViewBag.datasource" enableInfiniteScrolling="true" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-infinitescrollsettings enableCache="true"></e-treegrid-infinitescrollsettings>
    <e-treegrid-pagesettings pageSize="50"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Player Jersey" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD1" headerText="Player Name" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD2" headerText="Year" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="FIELD3" headerText="Stint" textAlign="Right" width="120"></e-treegrid-column>
        <e-treegrid-column field="FIELD4" headerText="TMID" textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Limitations for Infinite Scrolling

Infinite scrolling has the following limitations:

- Due to the element height limitation in browsers, the maximum number of records loaded by the Tree Grid is limited by the browser capability.
- Initial loading rows total height must be greater than the viewport height.
- Cell selection will not be persisted in cache mode.
- Infinite scrolling is not compatible with batch editing, cell editing, detail template, and hierarchy features.
- The aggregated information and total group items are displayed based on the current view items.
- Programmatic selection using the `selectRows` and `selectRow` methods is not supported in infinite scrolling.
- Infinite scrolling does not support rendering records in a collapsed state. All records must be fully expanded at initial rendering for proper functionality.
