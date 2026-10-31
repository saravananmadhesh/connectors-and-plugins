# Resizing in WPF DataGrid (SfDataGrid)

Comprehensive reference for column and row resizing operations, configuration, and event handling in the Syncfusion WPF DataGrid control.

## Table of Contents
- [Overview](#overview)
- [Column Resizing](#column-resizing)
- [Per-Column Resizing Control](#per-column-resizing-control)
- [MinimumWidth and MaximumWidth Constraints](#MinimumWidth-and-MaximumWidth-constraints)
- [Hidden Column Resizing](#hidden-column-resizing)
- [Cancel Column Resizing](#cancel-column-resizing)
- [Detect Column Resize Completion](#detect-column-resize-completion)
- [Row Resizing](#row-resizing)
- [Per-Row Resizing Control](#per-row-resizing-control)
- [Hidden Row Resizing](#hidden-row-resizing)
- [Cancel Row Resizing](#cancel-row-resizing)
- [Detect Row Resize Completion](#detect-row-resize-completion)

## Overview

WPF DataGrid supports interactive resizing of columns and rows by dragging their edges. Resizing adjusts the visual layout without modifying the underlying data source. Both column and row resizing can be enabled at the grid level or controlled individually per column or per row via events.

**Key Features:**
- Enable column resizing at grid level or per column
- Enable row resizing at grid level
- Enforce minimum and maximum width constraints for columns
- Support resizing of hidden columns and hidden rows via resize indicators
- Cancel resizing for specific columns or rows using events
- Detect resize completion with event reason values

## Column Resizing

Allow users to resize columns by dragging the column header edge:

```xml
<syncfusion:SfDataGrid x:Name="dataGrid"
                       AllowResizingColumns="True"
                       AutoGenerateColumns="True"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.AllowResizingColumns = true;
```

A resize cursor appears when hovering over the right edge of a column header.

## Per-Column Resizing Control

Enable or disable resizing for specific columns by setting `GridColumn.AllowResizing`:

```xml
<syncfusion:SfDataGrid AllowResizingColumns="True"
                       AutoGenerateColumns="False"
                       ItemsSource="{Binding Orders}">
    <syncfusion:SfDataGrid.Columns>
        <syncfusion:GridTextColumn AllowResizing="True"  MappingName="OrderID" />
        <syncfusion:GridTextColumn AllowResizing="False" MappingName="CustomerID" />
        <syncfusion:GridTextColumn AllowResizing="True"  MappingName="Country" />
    </syncfusion:SfDataGrid.Columns>
</syncfusion:SfDataGrid>
```

```csharp
dataGrid.Columns["CustomerID"].AllowResizing = false;
```

## MinimumWidth and MaximumWidth Constraints

Column resizing respects `GridColumn.MinimumWidth` and `GridColumn.MaximumWidth`. The user cannot resize beyond these bounds:

```xml
<syncfusion:GridTextColumn MappingName="ProductName"
                           MinimumWidth="80"
                           MaximumWidth="300" />
```

```csharp
dataGrid.Columns["ProductName"].MinimumWidth = 80;
dataGrid.Columns["ProductName"].MaximumWidth = 300;
```

## Hidden Column Resizing

Allow users to resize hidden columns by displaying a resize indicator for them:

```xml
<syncfusion:SfDataGrid AllowResizingColumns="True"
                       AllowResizingHiddenColumns="True"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.AllowResizingHiddenColumns = true;
```

When enabled, a small resize indicator appears between visible columns where hidden columns reside.

## Cancel Column Resizing

Handle the `ResizingColumns` event and set `e.Cancel = true` to prevent resizing a specific column:

```csharp
dataGrid.ResizingColumns += OnResizingColumns;

void OnResizingColumns(object sender, ResizingColumnsEventArgs e)
{
    // Block resizing for the column at index 2 (OrderID)
    if (e.ColumnIndex == 2)
        e.Cancel = true;
}
```

`ResizingColumnsEventArgs` members:
- `ColumnIndex` — Zero-based index of the column being resized
- `Width` — The proposed new width
- `Reason` — Reason for the event (Resizing or Resized)
- `Cancel` — Set to `true` to cancel the resize

## Detect Column Resize Completion

Check `e.Reason` in the `ResizingColumns` event to detect when the user has finished resizing:

```csharp
dataGrid.ResizingColumns += OnResizingColumns;

void OnResizingColumns(object sender, ResizingColumnsEventArgs e)
{
    if (e.Reason == ColumnResizingReason.Resized)
    {
        var columnName = dataGrid.Columns[e.ColumnIndex].MappingName;
        Debug.WriteLine($"Column '{columnName}' resized to {e.Width}px");
    }
}
```

| `Reason` Value | Triggered When |
|---|---|
| `ColumnResizingReason.Resizing` | During drag (fires multiple times) |
| `ColumnResizingReason.Resized` | When the mouse button is released (fires once) |

## Row Resizing

Allow users to resize rows by dragging the bottom edge of a row:

```xml
<syncfusion:SfDataGrid x:Name="dataGrid"
                       AllowResizingRows="True"
                       AutoGenerateColumns="True"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.AllowResizingRows = true;
```

> **Note:** Header rows and stacked header rows cannot be resized, even when `AllowResizingRows` is `true`.

## Per-Row Resizing Control

Row resizing does not have a per-row property on the data row itself. Use the `RowResizing` event to cancel resizing for specific rows:

```csharp
dataGrid.RowResizing += OnRowResizing;

void OnRowResizing(object sender, RowResizingEventArgs e)
{
    // Block resizing for the first data row (RowIndex 1, as 0 is header)
    if (e.RowIndex == 1)
        e.Cancel = true;
}
```

## Hidden Row Resizing

Allow users to resize hidden rows by displaying a resize indicator for them:

```xml
<syncfusion:SfDataGrid AllowResizingRows="True"
                       AllowResizingHiddenRows="True"
                       ItemsSource="{Binding Orders}" />
```

```csharp
dataGrid.AllowResizingHiddenRows = true;
```

## Cancel Row Resizing

Handle the `RowResizing` event and set `e.Cancel = true` to prevent resizing a specific row:

```csharp
dataGrid.RowResizing += OnRowResizing;

void OnRowResizing(object sender, RowResizingEventArgs e)
{
    // Block resizing for the third row
    if (e.RowIndex == 3)
        e.Cancel = true;
}
```

`RowResizingEventArgs` members:
- `RowIndex` — Zero-based index of the row being resized
- `Height` — The proposed new height
- `Reason` — Reason for the event (Resizing or Resized)
- `Cancel` — Set to `true` to cancel the resize

## Detect Row Resize Completion

Check `e.Reason` in the `RowResizing` event to detect when the user has finished resizing:

```csharp
dataGrid.RowResizing += OnRowResizing;

void OnRowResizing(object sender, RowResizingEventArgs e)
{
    if (e.Reason == RowResizingReason.Resized)
    {
        Debug.WriteLine($"Row {e.RowIndex} resized to {e.Height}px");
    }
}
```

| `Reason` Value | Triggered When |
|---|---|
| `RowResizingReason.Resizing` | During drag (fires multiple times) |
| `RowResizingReason.Resized` | When the mouse button is released (fires once) |
