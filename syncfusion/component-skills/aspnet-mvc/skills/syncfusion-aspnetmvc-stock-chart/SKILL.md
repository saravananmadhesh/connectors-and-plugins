---
name: syncfusion-aspnetmvc-stock-chart
description: Build interactive stock charts and financial data visualizations using Syncfusion Essential JS 2 in ASP.NET MVC. Use this skill when users need to create candlestick charts, OHLC charts, track stock prices, display technical indicators, range/period selectors, trend lines, or analyze financial data with interactive features. Includes configuration for axes, themes, tooltips, exports, and accessibility.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion Stock Chart

The Syncfusion Stock Chart (StockChart) component enables developers to create professional-grade financial data visualizations in ASP.NET MVC applications. It combines candlestick/OHLC series with interactive range selectors, technical indicators, trend lines, and comprehensive customization options.

## When to Use This Skill

**Use this skill when you need to:**
- Display stock prices with candlestick or OHLC (Open, High, Low, Close) series
- Render financial time-series data with multiple axes
- Add range and period selectors for date navigation
- Overlay technical indicators (Moving Average, Bollinger Bands, MACD, RSI, Stochastic)
- Draw trend lines for market analysis
- Customize appearance with themes, legends, and tooltips
- Export charts as images or PDFs
- Ensure accessibility with keyboard navigation and ARIA attributes
- Handle real-time or large financial datasets

## Component Overview

The Stock Chart is optimized for financial data with built-in support for:
- **Series Types:** Candlestick, OHLC, Line, Area
- **Axis Types:** DateTime, DateTimeCategory, Numeric, Category, Logarithmic
- **Interactive Features:** Range selector, period selector, cross-hair, tooltips, stock events
- **Analysis Tools:** Technical indicators, trend lines, moving averages
- **Customization:** Themes, gradients, title, legend positioning, accessibility

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet package setup
- Basic stock chart implementation
- CSS imports and theme configuration
- First rendering with sample data

### Chart Types and Series
📄 **Read:** [references/chart-types.md](references/chart-types.md)
- OHLC series (Open, High, Low, Close)
- Candlestick series configuration
- Line and Area series for overlay
- Selecting appropriate series types

### API Reference
📄 **Read:** [references/chart-types.md](references/api-reference.md)
- Overview
- Core Properties
- Series Configuration
- Axis Configuration
- Technical Indicators
- Trend Lines
- Range and Period Selection
- Tooltips and Crosshairs
- Events
- Methods
- Enumerations
- Complete Example

### Axis Configuration
📄 **Read:** [references/axis-configuration.md](references/axis-configuration.md)
- DateTime, DateTimeCategory, Numeric, Category, and Logarithmic axes
- Axis labels, ranges, and formatting
- Multiple axes and opposed positioning
- Custom axis titles and styling

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Financial data format requirements
- Binding data from sources (arrays, APIs, databases)
- Real-time data updates
- Data transformation and filtering

### Range and Period Selectors
📄 **Read:** [references/range-period-selectors.md](references/range-period-selectors.md)
- Range selector for custom date ranges
- Period selector with predefined intervals (Week, Month, Quarter, Year)
- Synchronizing selectors with chart
- Customizing selector appearance

### Technical Indicators
📄 **Read:** [references/technical-indicators.md](references/technical-indicators.md)
- Moving Average (SMA, EMA)
- Bollinger Bands with upper/lower bounds
- MACD (Moving Average Convergence Divergence)
- RSI (Relative Strength Index) and Stochastic Oscillator
- Adding and configuring indicators

### Trend Lines
📄 **Read:** [references/trend-lines.md](references/trend-lines.md)
- Linear, Exponential, Power, Logarithmic trend lines
- Moving Average trend lines
- Customizing colors and widths
- Removing and updating trends

### Customization and Styling
📄 **Read:** [references/customization-styling.md](references/customization-styling.md)
- Themes (Material, Bootstrap, Tailwind, etc.)
- Title, subtitle, and legend positioning
- Tooltip formatting and templates
- Gradients and color schemes
- CSS customization

### Interactive Features
📄 **Read:** [references/interaction-features.md](references/interaction-features.md)
- Cross-hair and trackball tooltips
- Stock events rendering
- Legend interaction and visibility toggle
- Selection mode and highlight behavior

### Accessibility and Export
📄 **Read:** [references/accessibility-export.md](references/accessibility-export.md)
- WCAG compliance and keyboard navigation
- ARIA labels and screen reader support
- Exporting to image (PNG, SVG, PDF)
- Printing charts

## Quick Start Example

```csharp
@{
    ViewBag.Title = "Stock Chart";
}

@using Syncfusion.EJ2;

<!-- Stock Chart Container -->
<div id="stockChart"></div>

<script>
    // Sample financial data
    var chartData = [
        { x: new Date(2023, 0, 1), open: 100, high: 105, low: 98, close: 103 },
        { x: new Date(2023, 0, 2), open: 103, high: 110, low: 102, close: 108 },
        { x: new Date(2023, 0, 3), open: 108, high: 109, low: 100, close: 102 }
    ];

    var chart = new ej.charts.StockChart({
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Days',
            majorGridLines: { width: 0 }
        },
        primaryYAxis: {
            labelFormat: '${value}',
            tooltipFormat: '${value}'
        },
        series: [
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'close',
                type: 'Candlestick',
                low: 'low',
                high: 'high',
                open: 'open'
            }
        ],
        rangeSelector: {
            periods: [
                { intervalType: 'Days', interval: 7, text: '1W' },
                { intervalType: 'Months', interval: 1, text: '1M' },
                { intervalType: 'Months', interval: 3, text: '3M' },
                { intervalType: 'Months', interval: 6, text: '6M' }
            ]
        },
        title: 'Stock Chart'
    });
    chart.appendTo('#stockChart');
</script>
```

## Common Patterns

### Pattern 1: Basic Stock Chart with Candlestick Series
Most common use case—displaying OHLC stock data with candlestick visualization and range selection.

### Pattern 2: Adding Technical Indicators
Overlay multiple indicators (Moving Average, Bollinger Bands) for technical analysis without cluttering the main chart.

### Pattern 3: Multiple Axes for Different Scales
Combine price data (primary Y-axis) with volume data (secondary Y-axis) to show different metrics simultaneously.

### Pattern 4: Interactive Range Selection
Enable range and period selectors so users can zoom into specific time periods.

### Pattern 5: Real-Time Data Updates
Update chart data dynamically as new stock prices arrive while maintaining selector and indicator state.

### Pattern 6: Themed and Responsive
Apply consistent themes and ensure charts resize appropriately on different screen sizes.

## Key Features at a Glance

| Feature | Use Case |
|---------|----------|
| **Candlestick/OHLC Series** | Display stock price movements with open/high/low/close values |
| **DateTime Axes** | Align data points with accurate time intervals |
| **Range Selector** | Allow users to select custom date ranges for zooming |
| **Period Shortcuts** | Quick access to predefined periods (1W, 1M, 1Q, 1Y) |
| **Technical Indicators** | Overlay analysis tools like Moving Average, Bollinger Bands, MACD, RSI |
| **Trend Lines** | Draw linear or exponential trend lines for analysis |
| **Cross-hair** | Track precise values while hovering over the chart |
| **Stock Events** | Mark market open/close times with labels or dividers |
| **Themes** | Apply professional themes for consistent branding |
| **Export** | Save charts as PNG, SVG, or PDF |
| **Accessibility** | Support keyboard navigation and screen readers |

## Component Library Integration



This skill is part of the Syncfusion ASP.NET MVC component library:

```
implementing-syncfusion-aspnetmvc-components/
├── components/
│   ├── charts/
│   │   ├── implementing-sankey-chart/
│   │   └── [Other charts...]
│   │
│   └── data-visualization/
│       ├── implementing-stock-chart/ ← YOU ARE HERE
│       ├── implementing-range-navigator/
│       └── [Other visualization components...]
```

Other components in this library handle similar data visualization needs with different focuses. Stock Chart is specifically optimized for financial time-series data.

---

**Next Step:** Choose a reference file based on your task, or start with [Getting Started](references/getting-started.md) for first-time setup.
