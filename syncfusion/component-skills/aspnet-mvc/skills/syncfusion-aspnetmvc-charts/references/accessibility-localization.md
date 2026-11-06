# Accessibility and Localization

## Table of Contents
- [Accessibility Features](#accessibility-features)
  - [Enable Accessibility](#enable-accessibility)
  - [ARIA Labels](#aria-labels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Enable Keyboard Navigation](#enable-keyboard-navigation)
  - [Custom Keyboard Actions](#custom-keyboard-actions)
- [WCAG Compliance](#wcag-compliance)
  - [Color Contrast](#color-contrast)
  - [Text Alternatives](#text-alternatives)
  - [Focus Indicators](#focus-indicators)
- [Localization](#localization)
  - [Load Locale](#load-locale)
  - [Localized Chart](#localized-chart)
  - [Custom Localization](#custom-localization)
- [Right-to-Left (RTL)](#right-to-left-rtl)
  - [Enable RTL](#enable-rtl)
  - [RTL with Localization](#rtl-with-localization)
- [Internationalization](#internationalization)
  - [Number Formatting](#number-formatting)
  - [Date Formatting](#date-formatting)
  - [Multi-Language Support](#multi-language-support)
- [Common Patterns](#common-patterns)
  - [Fully Accessible Chart](#fully-accessible-chart)
  - [Localized International Chart](#localized-international-chart)
- [Troubleshooting](#troubleshooting)
  - [Locale not loading](#locale-not-loading)
  - [RTL not working](#rtl-not-working)
  - [Keyboard navigation issues](#keyboard-navigation-issues)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Accessibility Features

Make charts accessible to all users.

### Enable Accessibility

```cshtml
@Html.EJS().Chart("accessibleChart").EnableCanvas(true).Title("Monthly Sales Analysis").Description("Chart showing monthly sales data from January to December").TabIndex(0).Series(series => series.Add()).Render()
```

### ARIA Labels

```cshtml
@Html.EJS().Chart("ariaChart").Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .XName("Month")
              .YName("Sales")
              .Name("Sales Data")
              .Add();
    }
    ).Loaded("onChartLoaded").Render()

<script>
    function onChartLoaded(args) {
        var chartElement = document.getElementById('ariaChart');
        chartElement.setAttribute('role', 'img');
        chartElement.setAttribute('aria-label', 'Sales chart showing monthly trends');
    }
</script>
```

## Keyboard Navigation

Enable keyboard interaction for accessibility.

**Keyboard shortcuts:**
- `Tab` - Focus on chart and its elements
- `Arrow Keys` - Navigate through data points
- `Enter/Space` - Select data point
- `+` / `-` - Zoom in/out (when zoom enabled)
- `Ctrl + P` - Print chart
- `Escape` - Reset selection/zoom

### Enable Keyboard Navigation

```cshtml
@Html.EJS().Chart("keyboardChart").SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).HighlightMode(Syncfusion.EJ2.Charts.HighlightMode.Point).Tooltip(tt => tt.Enable(true)
    ).Series(series => series.Add()
    ).Render()
```

## WCAG Compliance

Follow WCAG 2.1 guidelines for accessibility.

### Color Contrast

Ensure sufficient color contrast (minimum 4.5:1 ratio):

```cshtml
@Html.EJS().Chart("contrastChart").Palettes(new string[] { 
        "#0062B1",  // High contrast blue
        "#CB4B16",  // High contrast orange
        "#2AA198",  // High contrast teal
        "#D33682"   // High contrast pink
    }).Series(series =>
    {
        series.Border(b => b.Width(2).Color("#000000"))  // Border for better distinction
              .Add();
    }).Render()
```

### Text Alternatives

Provide text alternatives for visual content:

```cshtml
@Html.EJS().Chart("textAltChart").Title("Q1 2024 Sales Performance").SubTitle("Data shows 25% growth compared to Q1 2023").Series(series => series.Add()
    .)Render()

<div id="chartDescription" class="sr-only">
    This chart displays quarterly sales data. 
    January: $35,000, February: $28,000, March: $34,000.
    Average sales: $32,333. Peak month: January.
</div>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }
</style>
```

### Focus Indicators

Ensure visible focus indicators:

```cshtml
<style>
    #wcagChart:focus {
        outline: 3px solid #0078D4;
        outline-offset: 2px;
    }
    
    #wcagChart svg *:focus {
        outline: 2px solid #0078D4;
    }
</style>

@Html.EJS().Chart("wcagChart").TabIndex(0).Series(series => series.Add()
    ).Render()
```

## Localization

Display charts in different languages.

### Load Locale

```cshtml
<head>
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/ej2-locale/src/es.json"></script>
</head>

<script>
    ej.base.setCulture('es');
    ej.base.L10n.load({
        'es': {
            'chart': {
                'ZoomIn': 'Acercar',
                'ZoomOut': 'Alejar',
                'Zoom': 'Zoom',
                'Pan': 'Pan',
                'Reset': 'Restablecer',
                'ResetZoom': 'Restablecer Zoom'
            }
        }
    });
</script>
```

### Localized Chart

```cshtml
@Html.EJS().Chart("localizedChart").Locale("es").ZoomSettings(zs => zs
        .EnableSelectionZooming(true)
        .EnableMouseWheelZooming(true)
    ).Series(series => series.Add()
    ).Render()
```

### Custom Localization

```cshtml
<script>
    ej.base.L10n.load({
        'fr-FR': {
            'chart': {
                'ZoomIn': 'Zoomer',
                'ZoomOut': 'Dézoomer',
                'Zoom': 'Zoom',
                'Pan': 'Panoramique',
                'Reset': 'Réinitialiser',
                'ResetZoom': 'Réinitialiser le zoom'
            }
        }
    });
</script>

@Html.EJS().Chart("frenchChart").Locale("fr-FR").Series(series => series.Add()).Render()
```

## Right-to-Left (RTL)

Support RTL languages like Arabic and Hebrew.

### Enable RTL

```cshtml
@Html.EJS().Chart("rtlChart").EnableRtl(true).Title("مبيعات شهرية").PrimaryXAxis(px => px
        .Title("الشهور")
        .ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py
        .Title("المبيعات")
    ).Series(series =>
    {
        series.DataSource(ViewBag.ArabicData)
              .XName("Month")
              .YName("Sales")
              .Add();
    }).Render()
```

### RTL with Localization

```cshtml
<script>
    ej.base.setCulture('ar');
    ej.base.enableRtl = true;
    
    ej.base.L10n.load({
        'ar': {
            'chart': {
                'ZoomIn': 'تكبير',
                'ZoomOut': 'تصغير',
                'Zoom': 'تكبير/تصغير',
                'Pan': 'تحريك',
                'Reset': 'إعادة تعيين',
                'ResetZoom': 'إعادة تعيين التكبير'
            }
        }
    });
</script>

@Html.EJS().Chart("arabicChart")
    .Locale("ar")
    .EnableRtl(true)
    .Series(series => series.Add())
    .Render()
```

## Internationalization

Format numbers and dates according to locale.

### Number Formatting

```cshtml
<script>
    ej.base.setCulture('de-DE');
</script>

@Html.EJS().Chart("germanChart").Locale("de-DE").PrimaryYAxis(py => py
        .LabelFormat("c")  // Currency format
        .LabelStyle(ls => ls.Format("c"))
    ).Series(series => series.Add()
    ).Render()
```

**Format options:**
- `n` - Number (1,234.56)
- `c` - Currency ($1,234.56)
- `p` - Percentage (12.34%)
- `n2` - Number with 2 decimals

### Date Formatting

```cshtml
<script>
    ej.base.setCulture('ja-JP');
</script>

@Html.EJS().Chart("japaneseChart").Locale("ja-JP").PrimaryXAxis(px => px
        .ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
        .LabelFormat("y/M/d")  // Japanese date format
        .IntervalType(Syncfusion.EJ2.Charts.IntervalType.Months)
    ).Series(series => series.Add()
    ).Render()
```

### Multi-Language Support

```cshtml
@{
    var currentCulture = System.Threading.Thread.CurrentThread.CurrentCulture.Name;
}

<script>
    ej.base.setCulture('@currentCulture');
</script>

@Html.EJS().Chart("multiLangChart").Locale("@currentCulture").Series(series => series.Add()
    ).Render()
```

## Common Patterns

### Fully Accessible Chart

```cshtml
@Html.EJS().Chart("fullyAccessible").Title("Annual Revenue Analysis").TabIndex(0).EnableCanvas(true).Palettes(new string[] { "#0062B1", "#CB4B16", "#2AA198" }
    ).SelectionMode(Syncfusion.EJ2.Charts.SelectionMode.Point).HighlightMode(Syncfusion.EJ2.Charts.HighlightMode.Point).Tooltip(tt => tt.Enable(true)
    ).Series(series =>
    {
        series.DataSource(ViewBag.Data)
              .Border(b => b.Width(2).Color("#000000"))
              .Marker(m => m.Visible(true).Height(8).Width(8))
              .Add();
    }
    ).Loaded("addAccessibilityAttributes").Render()

<script>
    function addAccessibilityAttributes(args) {
        var chart = document.getElementById('fullyAccessible');
        chart.setAttribute('role', 'img');
        chart.setAttribute('aria-label', 'Bar chart showing annual revenue from 2020 to 2024');
    }
</script>
```

### Localized International Chart

```cshtml
@{
    var culture = ViewBag.Culture ?? "en-US";
}

<script>
    ej.base.setCulture('@culture');
</script>

@Html.EJS().Chart("internationalChart").Locale("@culture").EnableRtl(culture.StartsWith("ar") || culture.StartsWith("he")
    ).PrimaryYAxis(py => py.LabelFormat("c")
    ).Series(series => series.Add()
    ).Render()
```

## Troubleshooting

### Locale not loading
- Include locale script in layout
- Call `setCulture()` before chart initialization
- Verify locale code is correct (e.g., 'fr-FR' not 'fr')

### RTL not working
- Set `EnableRtl(true)` on chart
- Set `ej.base.enableRtl = true` globally
- Check if locale supports RTL

### Keyboard navigation issues
- Ensure chart has `TabIndex` set
- Enable `SelectionMode` or `HighlightMode`
- Check focus styles are visible

## Best Practices

1. **Color Contrast**: Use WCAG AA compliant colors (4.5:1 ratio)
2. **Keyboard Access**: Ensure all features accessible via keyboard
3. **Text Alternatives**: Provide descriptive titles and subtitles
4. **Focus Management**: Clear focus indicators on interactive elements
5. **Localization**: Load only needed locales to reduce bundle size
6. **RTL Testing**: Test RTL layouts with actual RTL content
7. **Screen Readers**: Test with NVDA, JAWS, or VoiceOver

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html
