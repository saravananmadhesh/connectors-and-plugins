# Frozen Rows and Columns

## Table of Contents

- [When to Use This Feature](#when-to-use-this-feature)
- [Basic Frozen Rows and Columns](#basic-frozen-rows-and-columns)
- [Freeze Particular Columns](#freeze-particular-columns)
- [Freeze Direction](#freeze-direction)
- [Limitations](#limitations)

## When to Use This Feature

Enable frozen rows and columns when you need to keep certain rows (typically headers) and columns always visible while scrolling through large datasets. Use this feature when:

- You need to keep column headers visible during vertical scrolling
- You need to keep identifier columns (like ID or Name) visible during horizontal scrolling
- You want to freeze multiple columns or rows simultaneously
- You need fine-grained control over which columns remain visible
- You need to freeze columns in specific directions (left or right side)

## Basic Frozen Rows and Columns

Frozen rows and columns provide an option to make rows and columns always visible at the top and left side of the Tree Grid while scrolling.

### Implementation

To freeze rows and columns, use the `frozenRows` and `frozenColumns` properties. The `frozenRows` property specifies the number of rows to freeze from the top, and `frozenColumns` property specifies the number of columns to freeze from the left.

```html
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.datasource" height="410" width="auto" childMapping="Children" treeColumnIndex="1" frozenRows="3" allowSelection="false" frozenColumns="2">
    <e-treegrid-columns>
        <e-treegrid-column field='TaskId' headerText='Task ID' width='100' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='TaskName' headerText='Task Name' width='230'></e-treegrid-column>
        <e-treegrid-column field='StartDate' headerText='Start Date' width='150' format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='EndDate' headerText='End Date' width='150' format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Duration' headerText='Duration' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Progress' headerText='Progress' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Priority' headerText='Priority' width='120'></e-treegrid-column>
        <e-treegrid-column field="Approved" headerText="Approved" textAlign="Left" width="110" type="boolean"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

In this example, the left two columns (TaskId and TaskName) and the top three rows are frozen. The remaining columns and rows will scroll normally while the frozen rows and columns remain visible.

## Freeze Particular Columns

You can freeze specific columns individually by using the `isFrozen` property on individual column definitions. This allows you to freeze particular columns regardless of their position in the column order.

### Implementation

Set the `isFrozen` property to `true` on the e-treegrid-column tag helper for the columns you want to freeze:

```html
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.datasource" height="410" width="auto" childMapping="Children" allowSelection="false">
    <e-treegrid-columns>
        <e-treegrid-column field='TaskId' headerText='Task ID' width='100' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='TaskName' headerText='Task Name' width='230' isFrozen="true"></e-treegrid-column>
        <e-treegrid-column field='StartDate' headerText='Start Date' width='150' isFrozen="true" format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='EndDate' headerText='End Date' width='150' format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Duration' headerText='Duration' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Progress' headerText='Progress' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Priority' headerText='Priority' width='120'></e-treegrid-column>
        <e-treegrid-column field="Approved" headerText="Approved" textAlign="Left" width="110" type="boolean"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

In this example, the TaskName and StartDate columns are frozen, keeping them visible during horizontal scrolling while other columns scroll normally.

## Freeze Direction

You can freeze columns on the left or right side of the Tree Grid by using the `column.freeze` property. The remaining columns will be movable, and the Tree Grid will automatically position the columns based on the freeze direction value.

### Freeze Direction Types

The `column.freeze` property accepts the following values:

- **Left**: Freezes the column on the left side of the Tree Grid
- **Right**: Freezes the column on the right side of the Tree Grid

### Implementation

Set the `freeze` property on individual columns to specify whether they should be frozen on the left or right:

```html
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.datasource" height="410" treeColumnIndex="1" childMapping="Children" allowSelection="false">
    <e-treegrid-columns>
        <e-treegrid-column field='TaskId' headerText='Task ID' width='100' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='TaskName' headerText='Task Name' width='230' freeze="Left"></e-treegrid-column>
        <e-treegrid-column field='StartDate' headerText='Start Date' width='150' format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='EndDate' headerText='End Date' width='150' format="yMd" textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Duration' headerText='Duration' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Progress' headerText='Progress' width='120' textAlign='Right'></e-treegrid-column>
        <e-treegrid-column field='Priority' headerText='Priority' width='120' freeze="Right"></e-treegrid-column>
        <e-treegrid-column field="Approved" headerText="Approved" textAlign="Left" width="110" type="boolean"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

In this example, the TaskName column is frozen on the left side and the Priority column is frozen on the right side. The columns in between will scroll normally while these frozen columns remain visible on their respective sides.

### Important Note

Freeze Direction is not compatible with the `isFrozen` and `frozenColumns` properties. Choose either the freeze direction approach or the isFrozen/frozenColumns approach, but do not mix them in the same Tree Grid configuration.

## Limitations

### General Limitations for Frozen Rows and Columns

The following features are not supported when using frozen rows and columns:

- Row Template
- Detail Template
- Cell Editing

These features cannot be used in conjunction with frozen rows or columns due to technical constraints in how the Tree Grid renders and manages frozen content.

### Freeze Direction Limitations

In addition to the general limitations, the Freeze Direction feature has the following additional limitations:

- Infinite scroll cache mode is not compatible with freeze direction
- Freeze direction in stacked headers is not compatible with column reordering

When using freeze direction with stacked headers, you cannot reorder columns as this conflicts with the frozen column positioning logic.
