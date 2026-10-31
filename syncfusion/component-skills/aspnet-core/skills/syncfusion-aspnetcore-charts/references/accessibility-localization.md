# Accessibility and Localization

## Table of Contents

- [WCAG 2.0 Compliance](#wcag-20-compliance)
  - [ARIA Attributes](#aria-attributes)
  - [Accessible Chart Elements](#accessible-chart-elements)
- [Keyboard Navigation](#keyboard-navigation)
  - [Enable Keyboard Navigation](#enable-keyboard-navigation)
- [Accessibility and Localization](#accessibility-and-localization-1)
- [Screen Reader Support](#screen-reader-support)
  - [Descriptive Series Names](#descriptive-series-names)
  - [Accessible Tooltips](#accessible-tooltips)
- [Color Contrast](#color-contrast)
  - [High Contrast Theme](#high-contrast-theme)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Set Locale](#set-locale)
  - [Number Formatting](#number-formatting)
  - [Date Formatting](#date-formatting)
- [Localization](#localization)
  - [Custom Locale Strings](#custom-locale-strings)
  - [Common Locales](#common-locales)
- [Focus Indicators](#focus-indicators)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)


Ensure charts are accessible to all users and support multiple languages.

## WCAG 2.0 Compliance

Syncfusion Charts follow WCAG 2.0 standards for web accessibility.

### ARIA Attributes

Automatically added for screen readers:

```cshtml
<ejs-chart id="chart" 
           title="Sales Chart">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="Month" yName="Sales">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Accessible Chart Elements

- Chart title and subtitle have proper ARIA labels
- Series have meaningful names for screen readers
- Data points are keyboard navigable
- Tooltips provide textual information

## Keyboard Navigation

Navigate chart elements using keyboard.

**Keyboard Shortcuts:**
- **Tab:** Focus on chart
- **Arrow Keys:** Navigate data points
- **Enter:** Select data point
- **Escape:** Clear selection
- **+/-:** Zoom in/out (when zooming enabled)

### Enable Keyboard Navigation
- Syncfusion Charts include built‑in keyboard navigation by default.
- There is no property named `enableKeyboard`, and you do not need to manually enable it.

```cshtml
<ejs-chart id="chart" >
</ejs-chart>
```
# Accessibility and Localization

Ensure charts are accessible to all users and support multiple languages.

## Screen Reader Support

### Descriptive Series Names

```cshtml
<e-series name="Product A Sales" 
          dataSource="@ViewBag.ProductA" 
          xName="Month" 
          yName="Sales">
</e-series>
```

### Accessible Tooltips

```cshtml
<e-chart-tooltipsettings enable="true" 
                         format="${series.name}: ${point.y}">
</e-chart-tooltipsettings>
```

## Color Contrast

Ensure adequate contrast for visual impairment. We can utilize 18+ themes available fpr chart components. Those themes includes Material, Fabric, Tailwind CSS, Fluent, Bootstrap 5 and more.

### High Contrast Theme

```cshtml
<ejs-chart id="chart" theme="Highcontrast">
</ejs-chart>
```

## RTL (Right-to-Left) Support

For Arabic, Hebrew, and other RTL languages.

```cshtml
<ejs-chart id="chart" enableRtl="true">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="Category" yName="Value">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**RTL Effects:**
- Chart elements mirror horizontally
- Legend position adjusts
- Axis labels reverse
- Tooltips position appropriately

## Internationalization (i18n)

Support multiple locales and number/date formats.

### Set Locale

```csharp
// In Program.cs or Startup.cs
using Syncfusion.EJ2.Base;

// Register locale
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

// Set culture
var cultureInfo = new System.Globalization.CultureInfo("fr-FR");
System.Globalization.CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
System.Globalization.CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
```

```cshtml
<ejs-chart id="chart" locale="fr-FR">
    <e-chart-primaryyaxis labelFormat="c">
    </e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="Product" yName="Sales">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Number Formatting

```cshtml
<!-- French format: 1 234,56 -->
<e-chart-primaryyaxis labelFormat="n2" locale="fr-FR">
</e-chart-primaryyaxis>

<!-- German format: 1.234,56 -->
<e-chart-primaryyaxis labelFormat="n2" locale="de-DE">
</e-chart-primaryyaxis>
```

### Date Formatting

```cshtml
<!-- US format: 03/18/2023 -->
<e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                      labelFormat="MM/dd/yyyy" 
                      locale="en-US">
</e-chart-primaryxaxis>

<!-- European format: 18/03/2023 -->
<e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.DateTime" 
                      labelFormat="dd/MM/yyyy" 
                      locale="en-GB">
</e-chart-primaryxaxis>
```

## Localization

Translate chart UI elements.

### Custom Locale Strings

```javascript
<script>
    var L10n = ej.base.L10n;
    L10n.load({
        'de-DE': {
            'chart': {
                'ZoomIn': 'Hineinzoomen',
                'ZoomOut': 'Herauszoomen',
                'Reset': 'Zurücksetzen',
                'Pan': 'Schwenken',
                'Zoom': 'Zoomen'
            }
        }
    });
</script>

<ejs-chart id="chart" locale="de-DE">
    <e-chart-zoomsettings enableSelectionZooming="true">
    </e-chart-zoomsettings>
</ejs-chart>
```

### Common Locales

- `en-US` - English (United States)
- `en-GB` - English (United Kingdom)
- `de-DE` - German
- `fr-FR` - French
- `es-ES` - Spanish
- `pt-BR` - Portuguese (Brazil)
- `zh-CN` - Chinese (Simplified)
- `ja-JP` - Japanese
- `ar-AE` - Arabic

## Focus Indicators

Visual feedback for keyboard navigation.

```cshtml
<ejs-chart id="chart" highlightMode="Point">
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" xName="X" yName="Y">
        </e-series>
    </e-series-collection>
</ejs-chart>
```

**Highlight modes:** None, Point, Series, Cluster

## Best Practices

1. **Always provide meaningful titles** for context
2. **Use descriptive series names** for screen readers
3. **Enable tooltips** for additional information
4. **Test with keyboard only** navigation
5. **Verify color contrast** ratios (≥4.5:1 for normal text)
6. **Support RTL** for international users
7. **Use high contrast theme** option for accessibility
8. **Provide text alternatives** for complex visualizations
9. **Test with screen readers** (NVDA, JAWS, VoiceOver)
10. **Ensure responsive design** for different screen sizes

This ensures charts are usable by all users regardless of ability or language.

## API Reference

- **Chart API:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart.html
- **Key properties/events:** `description`, `enableRtl`, `locale`, `title`, `tooltip`, `zoomSettings`, `crosshair`, `primaryXAxis`, `primaryYAxis`, `load`, `loaded`, `resized`, `tooltipRender`, `pointClick`.

