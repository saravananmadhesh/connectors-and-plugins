# Localization and Internationalization

Support multiple languages and date formats for global applications.

## Basic Localization Setup

Add localization dependencies to `pubspec.yaml`:

```yaml
dependencies:
  flutter_localizations:
    sdk: flutter
  syncfusion_localizations: ^xx.x.xx
```

Import in your app:

```dart
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:syncfusion_localizations/syncfusion_localizations.dart';
```

## Configure MaterialApp

```dart
MaterialApp(
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    SfGlobalLocalizations.delegate,
  ],
  supportedLocales: [
    Locale('en', 'US'),
    Locale('es', 'ES'),
    Locale('fr', 'FR'),
    Locale('de', 'DE'),
    Locale('zh', 'CN'),
  ],
  locale: Locale('es', 'ES'), // Set default locale
  home: MyCalendar(),
)
```

## Date Format Customization

### Calendar Header Date Format

```dart
SfCalendar(
  view: CalendarView.month,
  headerDateFormat: 'MMMM yyyy', // "March 2026"
)
```

### View Header Day Format

```dart
SfCalendar(
  view: CalendarView.week,
  timeSlotViewSettings: TimeSlotViewSettings(
    dayFormat: 'EEE', // "Mon", "Tue", etc.
    dateFormat: 'd', // Just day number
  ),
)
```

### Date Range Picker Month Format

```dart
SfDateRangePicker(
  monthFormat: 'MMM', // "Jan", "Feb", etc.
)
```

## Right-to-Left (RTL) Support

Both components automatically support RTL languages like Arabic and Hebrew:

```dart
MaterialApp(
  locale: Locale('ar', 'SA'), // Arabic
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    SfGlobalLocalizations.delegate,
  ],
  home: SfCalendar(view: CalendarView.month),
)
```

## Common Date Formats

| Pattern | Example | Description |
|---------|---------|-------------|
| `'d'` | 20 | Day of month |
| `'dd'` | 20 | Day with leading zero |
| `'E'` | Thu | Short day name |
| `'EEEE'` | Thursday | Full day name |
| `'M'` | 3 | Month number |
| `'MM'` | 03 | Month with leading zero |
| `'MMM'` | Mar | Short month name |
| `'MMMM'` | March | Full month name |
| `'y'` | 2026 | Year |
| `'yy'` | 26 | 2-digit year |

## Next Steps

- **Accessibility:** Read [accessibility.md](accessibility.md) for screen reader support
