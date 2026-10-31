# Right-to-Left (RTL) — Flutter DataGrid

## Overview

`SfDataGrid` supports right-to-left rendering. Columns are rendered based on the active text direction.

---

## Method 1: Wrap with Directionality Widget

Wrap `SfDataGrid` in a `Directionality` widget and set `textDirection` to `TextDirection.rtl`:

```dart
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

Directionality(
  textDirection: TextDirection.rtl,
  child: SfDataGrid(
    source: _employeeDataSource,
    columnWidthMode: ColumnWidthMode.fill,
    columns: <GridColumn>[
      GridColumn(
        columnName: 'id',
        label: Container(
          padding: EdgeInsets.all(16.0),
          alignment: Alignment.center,
          child: Text('ID'),
        ),
      ),
      GridColumn(
        columnName: 'name',
        label: Container(
          padding: EdgeInsets.all(8.0),
          alignment: Alignment.center,
          child: Text('Name'),
        ),
      ),
      GridColumn(
        columnName: 'designation',
        label: Container(
          padding: EdgeInsets.all(8.0),
          alignment: Alignment.center,
          child: Text('Designation', overflow: TextOverflow.ellipsis),
        ),
      ),
      GridColumn(
        columnName: 'salary',
        label: Container(
          padding: EdgeInsets.all(8.0),
          alignment: Alignment.center,
          child: Text('Salary'),
        ),
      ),
    ],
  ),
)
```

---

## Method 2: Set Locale to an RTL Language

Change the app `locale` in `MaterialApp` to an RTL language (Arabic, Persian, Hebrew, Pashto, Urdu, etc.).

### Add dependency

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
```

### Implementation

```dart
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:syncfusion_flutter_datagrid/datagrid.dart';

MaterialApp(
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: <Locale>[
    Locale('en'),
    Locale('ar'),
  ],
  locale: Locale('ar'),  // Arabic → RTL
  home: SfDataGrid(
    source: _employeeDataSource,
    columnWidthMode: ColumnWidthMode.fill,
    columns: <GridColumn>[
      GridColumn(
        columnName: 'id',
        label: Container(padding: EdgeInsets.all(16.0), alignment: Alignment.center, child: Text('ID')),
      ),
      GridColumn(
        columnName: 'name',
        label: Container(padding: EdgeInsets.all(8.0), alignment: Alignment.center, child: Text('Name')),
      ),
      GridColumn(
        columnName: 'designation',
        label: Container(padding: EdgeInsets.all(8.0), alignment: Alignment.center, child: Text('Designation', overflow: TextOverflow.ellipsis)),
      ),
      GridColumn(
        columnName: 'salary',
        label: Container(padding: EdgeInsets.all(8.0), alignment: Alignment.center, child: Text('Salary')),
      ),
    ],
  ),
)
```

---

## Key Points

- The `Directionality` widget approach is the simplest and does not require locale packages.
- The locale-based approach automatically applies RTL when the user's device language is set to an RTL language.
- Both methods affect the rendering direction of columns, scroll direction, and widget alignment inside the DataGrid.

---

## TOC

- [Method 1: Wrap with Directionality Widget](#method-1-wrap-with-directionality-widget)
- [Method 2: Set Locale to an RTL Language](#method-2-set-locale-to-an-rtl-language)
