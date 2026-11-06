# Accessibility in SfDataGrid

## Table of Contents
- [Screen Reader Support](#screen-reader-support)
- [Sufficient Contrast](#sufficient-contrast)
- [Large Fonts](#large-fonts)
- [Keyboard Navigation](#keyboard-navigation)
- [Visual Density](#visual-density)

---

## Screen Reader Support

`SfDataGrid` supports screen readers on Android and iOS:

- **Tap** a cell to have its content read aloud
- **Swipe left/right** to read adjacent cells
- **Drag with two fingers** to scroll the grid vertically or horizontally

No additional configuration is needed — screen reader support is built in.

---

## Sufficient Contrast

Customize the visual appearance of DataGrid elements to ensure sufficient color contrast for 
readability. Use the following properties (set via `SfDataGridThemeData` or directly on 
`SfDataGrid`):

| Property | Description |
|----------|-------------|
| `currentCellStyle` | Style the currently focused cell |
| `frozenPaneElevation` | Shadow elevation for frozen rows/columns |
| `frozenPaneLineColor` | Color of the frozen pane separator line |
| `gridLineColor` | Color of the grid lines between cells |
| `headerColor` | Background color of header cells |
| `headerHoverColor` | Header cell color on mouse hover |
| `selectionColor` | Background color of selected rows |
| `sortIconColor` | Color of the sort icon in column headers |

---

## Large Fonts

Since `SfDataGrid` receives Flutter widgets for each cell, font size automatically scales with 
OS accessibility settings on Android and iOS. Row heights also auto-adjust based on 
`MediaQueryData.textScaleFactor` so content remains visible.

To test or apply a specific scale factor:

```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

MediaQuery(
  data: MediaQueryData(textScaleFactor: 1.5),
  child: SfDataGrid(
    source: _employeeDataSource,
    columns: <GridColumn>[
      GridColumn(
        columnName: 'id',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerRight,
          child: Text('ID', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'name',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerLeft,
          child: Text('Name', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'salary',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerRight,
          child: Text('Salary', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'designation',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerLeft,
          child: Text('Designation', overflow: TextOverflow.ellipsis),
        ),
      ),
    ],
  ),
)
```

---

## Keyboard Navigation

Keyboard navigation is available when both `selectionMode` and `navigationMode` are enabled. 
Supported platforms: **web** and **desktop**.

```dart
SfDataGrid(
  source: _employeeDataSource,
  selectionMode: SelectionMode.single,
  navigationMode: GridNavigationMode.cell,
  columns: [...],
)
```

Refer to the [Syncfusion DataGrid selection documentation](https://help.syncfusion.com/flutter/datagrid/selection#keyboard-behavior) 
for the full list of supported keyboard shortcuts and their behavior.

---

## Visual Density

`SfDataGrid` row heights automatically adjust based on the Flutter `ThemeData.visualDensity` 
setting, keeping the layout consistent with your app's density:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

Theme(
  data: ThemeData(visualDensity: VisualDensity.compact),
  child: SfDataGrid(
    source: _employeeDataSource,
    columns: <GridColumn>[
      GridColumn(
        columnName: 'id',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerRight,
          child: Text('ID', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'name',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerLeft,
          child: Text('Name', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'salary',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerRight,
          child: Text('Salary', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'designation',
        label: Container(
          padding: EdgeInsets.symmetric(horizontal: 16.0),
          alignment: Alignment.centerLeft,
          child: Text('Designation', overflow: TextOverflow.ellipsis),
        ),
      ),
    ],
  ),
)
```

**`VisualDensity` options:**

| Value | Row height |
|-------|-----------|
| `VisualDensity.standard` | Default Flutter density |
| `VisualDensity.compact` | Reduced row heights |
| `VisualDensity.comfortable` | Increased row heights |
| `VisualDensity.adaptivePlatformDensity` | Adjusts based on platform |
