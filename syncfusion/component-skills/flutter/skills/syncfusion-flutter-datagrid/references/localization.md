# Localization — Flutter DataGrid

## Overview

The Flutter DataGrid supports localization for:
- **Filter popup strings** — requires `flutter_localizations` + `syncfusion_localizations`
- **DataPager strings** — requires `flutter_localizations`; static strings also need `syncfusion_localizations`

---

## Required Packages

### pubspec.yaml

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  syncfusion_localizations: ^xx.x.xx
```

---

## Required Imports

```dart
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:syncfusion_localizations/syncfusion_localizations.dart';
```

---

## Localizing DataGrid Filter Popup

Add `SfGlobalLocalizations.delegate` to `localizationsDelegates` in your `MaterialApp`:

```dart
return MaterialApp(
  localizationsDelegates: const [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    SfGlobalLocalizations.delegate,
  ],
  supportedLocales: const [
    Locale('zh'),
    Locale('ar'),
    Locale('ja'),
  ],
  locale: const Locale('zh'),
  home: Scaffold(
    appBar: AppBar(title: Text('DataGrid Demo')),
    body: SfDataGrid(
      source: employeeDataSource,
      allowFiltering: true,
      columns: [
        GridColumn(
          columnName: 'id',
          label: Container(
            padding: EdgeInsets.all(16),
            alignment: Alignment.center,
            child: Text('ID'),
          ),
        ),
        GridColumn(
          columnName: 'name',
          label: Container(
            padding: EdgeInsets.all(8),
            alignment: Alignment.center,
            child: Text('Name'),
          ),
        ),
      ],
    ),
  ),
);
```

---

## Localizing DataPager

For basic DataPager localization (dynamic strings), only `flutter_localizations` is needed:

```dart
return MaterialApp(
  localizationsDelegates: const [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: const [
    Locale('zh'),
    Locale('ar'),
  ],
  locale: const Locale('zh'),
  home: Scaffold(
    body: Column(
      children: [
        Expanded(
          child: SfDataGrid(
            source: employeeDataSource,
            columns: columns,
          ),
        ),
        SfDataPager(
          delegate: employeeDataSource,
          pageCount: employees.length / rowsPerPage,
        ),
      ],
    ),
  ),
);
```

For **static strings** in DataPager, also add `SfGlobalLocalizations.delegate`:

```dart
localizationsDelegates: const [
  GlobalMaterialLocalizations.delegate,
  GlobalWidgetsLocalizations.delegate,
  SfGlobalLocalizations.delegate,   // needed for static DataPager strings
],
```

---

## Key Points

- `SfGlobalLocalizations.delegate` handles Syncfusion-specific strings (filter popup labels, DataPager static text)
- `GlobalMaterialLocalizations.delegate` and `GlobalWidgetsLocalizations.delegate` are always required
- The `locale` property on `MaterialApp` sets the active locale; `supportedLocales` declares all supported locales
- No additional DataGrid-specific configuration is needed — localization is applied automatically via the `MaterialApp` delegates

---

## Key Configuration Reference

| Configuration | Package | Purpose |
|---|---|---|
| `GlobalMaterialLocalizations.delegate` | `flutter_localizations` | Material widget localization |
| `GlobalWidgetsLocalizations.delegate` | `flutter_localizations` | Base widget localization |
| `SfGlobalLocalizations.delegate` | `syncfusion_localizations` | Syncfusion-specific strings (filter popup, DataPager) |
| `supportedLocales` | — | Declares which locales the app supports |
| `locale` | — | Sets the active locale |
