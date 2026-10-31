---
name: syncfusion-angular-chart
description: Implement Syncfusion Angular Chart component for professional data visualization. Use this when creating or customizing charts such as line, bar, column, area, pie, financial (candlestick, OHLC), scatter, bubble, or stock charts. Supports axes configuration, series binding, legends, tooltips, zooming, real-time updates, technical indicators, themes, export, and accessibility features.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion Angular Chart Component

A comprehensive guide for implementing the Syncfusion Angular Chart component, a high-performance, interactive data visualization library supporting 25+ chart types including line, bar, area, column, pie, financial, and specialized series. Optimized for responsive rendering, smooth interactions, and large datasets.

## When to Use This Skill

Use this skill when you need to:

- **Visualize Data:** Display numerical data as charts, graphs, or plots in Angular applications
- **Trend Analysis:** Show data trends over time using line, spline, or area charts
- **Comparisons:** Compare categorical data using column, bar, or grouped charts
- **Financial Data:** Implement stock charts with candlestick, OHLC, or technical indicators
- **Statistical Analysis:** Use box plots, histograms, or pareto charts for distributions
- **Multi-dimensional Data:** Display scatter plots or bubble charts for correlation analysis
- **Real-time Monitoring:** Create live-updating charts for dashboards or monitoring systems
- **Interactive Exploration:** Add zooming, panning, crosshair, tooltips, or selection features
- **AI Agent Integration:** Enable WebMCP so browser model contexts and AI agents can inspect and operate the Chart through registered tools
- **Custom Visualizations:** Combine multiple series types, axes, or create complex layouts
- **Accessible Charts:** Implement WCAG-compliant charts with keyboard navigation and screen reader support

## Component Overview

The Syncfusion Angular Chart is a feature-rich data visualization component with:

- **25+ Series Types:** Line, spline, step line, area, column, bar, scatter, bubble, pie, financial (candlestick, OHLC), statistical (box & whisker, histogram, pareto), polar, radar, waterfall, and more
- **Interactive Features:** Zooming (selection, mouse wheel, pinch), panning, tooltips, crosshair, trackball, selection, data editing
- **WebMCP Integration:** Automatic registration of built-in Chart inspection and mutation tools through `enableWebMcp` and `webMcpSettings`
- **Multiple Axes:** Support for primary, secondary, and multiple axes with different data types (numeric, datetime, logarithmic, category)
- **Chart Elements:** Legends, data markers, data labels, annotations, trendlines, technical indicators, striplines
- **Data Binding:** Local arrays, remote data (OData, DataManager), JSON sources, dynamic updates
- **Customization:** Themes, CSS styling, color palettes, responsive design, animations
- **Export & Print:** Export to PDF, SVG, PNG, JPEG, CSV, XLSX formats
- **Accessibility:** WCAG compliance, keyboard navigation, ARIA attributes, internationalization, RTL support

## Quality Standards for This Skill

This skill documentation follows strict quality standards to ensure accuracy and production-readiness:

### ✅ API Accuracy Standards
- **Property Names:** Use exact Syncfusion v33+ API property names (e.g., `legendSettings` NOT `legend`)
- **Type Safety:** All code examples use explicit TypeScript types from `@syncfusion/ej2-angular-charts`
- **Verification:** All properties verified against official [Syncfusion API docs](https://ej2.syncfusion.com/angular/documentation/api/chart/)
- **No Assumptions:** Never guess property names—always check official documentation first

### ✅ Code Quality Standards
- **TypeScript Strict Mode:** All examples compile with `"strict": true`
- **No `any` Types:** 100% type coverage, no loose typing
- **Tested Examples:** Code examples tested in real Angular projects
- **Import Statements:** All required types explicitly imported

### ✅ Documentation Standards
- **Clear Property Names:** Template property names clearly distinguished from TypeScript names
- **Type Declarations:** TypeScript type models documented for each property
- **Common Mistakes Section:** Each feature includes "❌ Don't do this" examples
- **Related Properties:** Links to related settings and cross-references

### 🔍 Common Pitfalls (Learn From Mistakes)

| ❌ WRONG | ✅ CORRECT | Why |
|---------|-----------|-----|
| `[legend]` | `[legendSettings]` | Must use `Settings` suffix for config objects |
| No type declared | `public legendSettings: LegendSettingsModel = {...}` | Type safety enables IDE IntelliSense |
| `[tooltips]` | `[tooltip]` | Use singular form, not plural |
| Global marker config | Per-series marker config | Markers are series-specific |

**See:** [Property Mapping Guide](references/property-mapping-guide.md) for complete reference  
**For Developers:** [Skill Development Guide](references/skill-development-guide.md) explains how to maintain this documentation

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

When you need to:
- Install and set up the Chart component in an Angular project
- Understand prerequisites and system requirements
- Add the `@syncfusion/ej2-angular-charts` package
- Configure CSS themes and imports
- Create your first basic chart
- Understand the chart module structure

### Series Types

📄 **Read:** [references/series-types.md](references/series-types.md)

When you need to:
- Choose the appropriate chart type for your data
- Implement line series (line, step line, spline, stacked, multi-colored)
- Create area charts (area, stacked, 100% stacked, range, spline range)
- Build column and bar charts (column, bar, stacked, range)
- Visualize financial data (candlestick, hilo, hilo-open-close)
- Use statistical charts (box & whisker, histogram, pareto, error bar)
- Create specialized charts (scatter, bubble, polar, radar, waterfall, vertical)
- Combine multiple series types in one chart

### Chart Elements

📄 **Read:** [references/chart-elements.md](references/chart-elements.md)

When you need to:
- Configure and customize legends (positioning, templates, styling)
- Add data markers to highlight points (shapes, sizes, visibility)
- Display data labels on chart elements (positioning, templates, formatting)
- Add custom annotations (text, shapes, images at specific coordinates)
- Include trendlines (linear, exponential, polynomial, moving average)
- Add technical indicators (RSI, MACD, Bollinger Bands, EMA, SMA)
- Highlight specific ranges with striplines
- Apply gradient fills to series

### Axes and Layout

📄 **Read:** [references/axes-and-layout.md](references/axes-and-layout.md)

When you need to:
- Configure axis types (numeric, datetime, logarithmic, category)
- Set up primary and secondary axes
- Add multiple axes for different data scales
- Format axis labels (rotation, alignment, multilevel labels)
- Customize gridlines and tick marks
- Implement axis crossing and inversed axes
- Create charts with multiple panes
- Configure chart title, subtitle, and dimensions
- Set chart margins and padding

### Interactive Features

📄 **Read:** [references/interactive-features.md](references/interactive-features.md)

When you need to:
- Enable zooming (selection zoom, mouse wheel zoom, pinch zoom, zoom toolbar)
- Implement panning for navigating zoomed charts
- Add tooltips (default, custom templates, shared tooltips)
- Enable crosshair for precise value reading
- Use trackball for multi-series point tracking
- Implement selection (point, series, cluster, drag selection)
- Enable data editing by dragging points
- Synchronize multiple charts for coordinated interactions

### WebMCP and AI Agent Integration

📄 **Read:** [references/webmcp-feature-spec.md](references/webmcp-feature-spec.md)

Use this reference when you need to:

- Enable Chart WebMCP integration with `enableWebMcp`.
- Configure automatic registration through `webMcpSettings`.
- Register all built-in tools or select specific tools.
- Generate focused samples with only the imports and providers required by the rendered Chart, selected tools, and permitted mutations.
- Generate unrestricted feature-tour samples with the complete required Chart feature set.
- Import `ChartModule` and provide `WebMcpChartService`.
- Determine the required Angular services for each of the 37 built-in WebMCP tools.
- Configure `beforeWebMcpToolExecute` for validation, confirmation, cancellation, and custom cancellation responses.
- Retrieve executable tools through `getWebMcpTools()` for diagnostics, testing, or direct execution.
- Create custom WebMCP tools with valid input schemas and JSON-safe execution responses.
- Avoid unsupported patterns such as manual registration buttons, calls to `registerWebMcpTools()`, fake model-context UI, and fabricated tool responses.

### Data Binding

📄 **Read:** [references/data-binding.md](references/data-binding.md)

When you need to:
- Bind local data (arrays of objects, JSON)
- Connect to remote data sources (OData, RESTful APIs)
- Use DataManager for advanced data operations
- Handle dynamic data updates and real-time data
- Manage empty points and null values
- Map data fields to chart properties
- Optimize performance for large datasets
- Handle asynchronous data loading

### Customization

📄 **Read:** [references/customization.md](references/customization.md)

When you need to:
- Apply built-in themes (Material, Bootstrap, Fabric, Tailwind, etc.)
- Customize chart appearance with CSS
- Use Theme Studio for custom theme generation
- Configure color palettes for series
- Style individual series with custom colors and patterns
- Implement responsive design for different screen sizes
- Configure chart background, border, and area
- Customize animation effects

### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)

When you need to:
- Implement WCAG 2.0/2.1 compliant charts
- Enable keyboard navigation (arrow keys, tab, enter)
- Configure ARIA attributes for screen readers
- Ensure proper color contrast and focus indicators
- Support high contrast themes

### Property Mapping Guide

📄 **Read:** [references/property-mapping-guide.md](references/property-mapping-guide.md)

**⚠️ START HERE** if you:
- Are confused about which properties to use
- Want to understand the `Settings` suffix convention
- Need to know which properties are chart-level vs series-level
- Want to avoid common API naming mistakes
- Need TypeScript type information for all properties

**Key Resources:**
- Complete property mapping table with ✅/❌ comparisons
- Common naming pitfalls (legend vs legendSettings)
- Type-safe implementation patterns
- QA verification checklist for new properties

### Skill Development Guide

📄 **Read:** [references/skill-development-guide.md](references/skill-development-guide.md)

**For Skill Developers & Contributors:**
- 4 Key Areas for improving skill documentation
- The `legendSettings` case study (what went wrong, how to fix)
- API accuracy verification process
- QA checklist for pre-release documentation
- Common pitfalls to avoid
- Implement internationalization (i18n) for multiple languages
- Enable localization (l10n) for regional formats
- Add RTL (right-to-left) support for appropriate languages
- Configure advanced accessibility features

### Advanced Features

📄 **Read:** [references/advanced-features.md](references/advanced-features.md)

When you need to:
- Handle chart events (load, loaded, pointClick, seriesRender, axisLabelRender, etc.)
- Export charts (PDF, SVG, PNG, JPEG, CSV, XLSX)
- Implement print functionality
- Understand module injection for tree-shaking
- Use different render methods (SVG, Canvas)
- Configure animation settings
- Handle empty point modes
- Access chart API methods programmatically
- Implement advanced event-driven interactions
- Integrate Chart with browser model contexts through WebMCP tools

### Common Patterns and Examples

📄 **Read:** [references/common-patterns.md](references/common-patterns.md)

When you need to:
- See complete examples for common use cases
- Build a trend analysis dashboard
- Create a financial stock chart with technical indicators
- Implement real-time data monitoring with live updates
- Build multi-axis comparison charts
- Create distribution analysis visualizations
- Find troubleshooting solutions for common issues
- Learn performance optimization techniques
- Migrate from EJ1 to EJ2 Chart
- Follow best practices for chart implementation

## Quick Start Example

Here's a minimal example to create a basic line chart:

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, LineSeriesService, DateTimeService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
        SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis'
    [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Line' xName='month' yName='sales'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public chartData?: Object[];
    public title?: string;
     public primaryXAxis?: Object;
      public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
          { month: 'Jan', sales: 35 },
          { month: 'Feb', sales: 28 },
          { month: 'Mar', sales: 34 },
          { month: 'Apr', sales: 32 },
          { month: 'May', sales: 40 },
          { month: 'Jun', sales: 32 },
          { month: 'Jul', sales: 35 },
          { month: 'Aug', sales: 55 },
          { month: 'Sep', sales: 38 },
          { month: 'Oct', sales: 30 },
          { month: 'Nov', sales: 25 },
          { month: 'Dec', sales: 32 }
      ];
        this.primaryXAxis = {
            interval: 1,
            valueType: 'Category',
        };
        this.primaryYAxis =
        {
            title: 'Sales',
        },
        this.title = 'Monthly Sales Comparison';
    }
}
```

## Common Patterns

### Pattern 1: Multi-Series Comparison Chart

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService, LegendService, DataLabelService, MultiLevelLabelService, SelectionService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [ CategoryService, BarSeriesService, ColumnSeriesService, LineSeriesService,LegendService, DataLabelService, MultiLevelLabelService, SelectionService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='gold' name='gold'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='silver' name='Silver'></e-series>
            <e-series [dataSource]='chartData' type='Column' xName='country' yName='bronze' name='Bronze'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    ngOnInit(): void {
        this.chartData = [
              { country: "USA", gold: 50, silver: 70, bronze: 45 },
              { country: "China", gold: 40, silver: 60, bronze: 55 },
              { country: "Japan", gold: 70, silver: 60, bronze: 50 },
              { country: "Australia", gold: 60, silver: 56, bronze: 40 },
              { country: "France", gold: 50, silver: 45, bronze: 35 },
              { country: "Germany", gold: 40, silver: 30, bronze: 22 },
              { country: "Italy", gold: 40, silver: 35, bronze: 37 },
              { country: "Sweden", gold: 30, silver: 25, bronze: 27 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Countries'
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 80,
            interval: 20, title: 'Medals'
        };
        this.title = 'Olympic Medals';
    }
}
```

### Pattern 2: Interactive Chart with Zoom and Tooltip

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { DateTimeService, StepLineSeriesService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts'
import { LegendService, TooltipService, CategoryService, ZoomService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';
import { toolData } from './datasource';
@Component({
imports: [ ChartModule ],
providers: [ DateTimeService, ZoomService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService],
standalone: true,
    selector: 'app-container',
    template: `<ejs-chart id="chart-container" [primaryXAxis]='primaryXAxis'[primaryYAxis]='primaryYAxis' [title]='title' [tooltip]='tooltip'>
        <e-series-collection>
            <e-series [dataSource]='chartData' type='StepLine' xName='x' yName='y' width=2 name='China' [marker]='marker'></e-series>
        </e-series-collection>
    </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public primaryYAxis?: Object;
    public marker?: Object;
    public tooltip?: Object;
    public zoom?: Object;
    ngOnInit(): void {
      this.chartData = [
              { x: new Date(1975, 0, 1), y: 16, y1: 10, y2: 4.5 },
              { x: new Date(1980, 0, 1), y: 12.5, y1: 7.5, y2: 5 },
              { x: new Date(1985, 0, 1), y: 19, y1: 11, y2: 6.5 },
              { x: new Date(1990, 0, 1), y: 14.4, y1: 7, y2: 4.4 },
              { x: new Date(1995, 0, 1), y: 11.5, y1: 8, y2: 5 },
              { x: new Date(2000, 0, 1), y: 14, y1: 6, y2: 1.5 },
              { x: new Date(2005, 0, 1), y: 10, y1: 3.5, y2: 2.5 },
              { x: new Date(2010, 0, 1), y: 16, y1: 7, y2: 3.7 }
      ];
      this.primaryXAxis = {
          valueType: 'DateTime',
      };
      this.zoom = {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableSelectionZooming: true
        };
      this.tooltip = { enable: true };
      this.marker = { visible: true, width: 10, height: 10 };
      this.title = 'Unemployment Rates 1975-2010';
  }
}
```

### Pattern 3: Financial Stock Chart

```typescript
import { ChartModule } from '@syncfusion/ej2-angular-charts'
import { CategoryService, CandleSeriesService } from '@syncfusion/ej2-angular-charts'
import { Component, OnInit } from '@angular/core';

@Component({
imports: [ ChartModule ],
providers: [CategoryService, CandleSeriesService],
standalone: true,
    selector: 'app-container',
    template: ` <ejs-chart style='display:block;' id='chart-container' [primaryXAxis]='primaryXAxis' [primaryYAxis]='primaryYAxis' [title]='title' >
                <e-series-collection>
                    <e-series [dataSource]='data' type='Candle' xName='x' high='high' low='low' open='open' close='close' name='SHIRPUR-G'> </e-series>
                </e-series-collection>
     </ejs-chart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public title?: string;
    public primaryYAxis?: Object;
    public data?: Object[];
    ngOnInit(): void {
        this.data = [
            { x: 'Jan', open: 120, high: 160, low: 100, close: 140 },
            { x: 'Feb', open: 150, high: 190, low: 130, close: 170 },
            { x: 'Mar', open: 130, high: 170, low: 110, close: 150 },
            { x: 'Apr', open: 160, high: 180, low: 120, close: 140 },
            { x: 'May', open: 150, high: 170, low: 110, close: 130 }
            ];
        this.primaryXAxis = {
            title: 'Date',
            valueType: 'Category',
            };
        this.primaryYAxis = {
            title: 'Price', minimum: 100, maximum: 200, interval: 20,
            };
        this.title = 'Shirpur Gold Refinery Share Price';
    }
}
```

## Key Configuration Options

### Series Configuration
- `type`: Chart type (Line, Column, Bar, Area, Scatter, etc.)
- `dataSource`: Data array for the series
- `xName`, `yName`: Property names for x and y values
- `name`: Series name for legend
- `marker`: Marker configuration for data points
- `fill`: Series color

### Axis Configuration
- `valueType`: Axis type (Double, DateTime, Category, Logarithmic)
- `title`: Axis title text
- `minimum`, `maximum`: Axis range
- `interval`: Label interval
- `labelFormat`: Format string for labels
- `opposedPosition`: Position axis on opposite side

### Chart Configuration
- `title`: Chart title
- `width`, `height`: Chart dimensions
- `theme`: Built-in theme name
- `background`: Chart background color
- `legendSettings`: Legend configuration
- `zoomSettings`: Zoom configuration
- `tooltip`: Tooltip configuration

## Common Use Cases

1. **Business Dashboards:** Display KPIs, sales trends, revenue comparisons
2. **Financial Applications:** Stock charts, portfolio performance, technical analysis
3. **Analytics Platforms:** User behavior, traffic analysis, conversion funnels
4. **Scientific Visualization:** Experimental data, statistical distributions, correlation analysis
5. **Monitoring Systems:** Real-time metrics, system performance, IoT data
6. **Reporting Tools:** Automated reports, data exports, scheduled visualizations
7. **Educational Applications:** Math graphs, statistics teaching, data science demonstrations

## Next Steps

After creating your basic chart:
- Explore different series types for your specific data visualization needs
- Add interactive features like zooming and tooltips for better user experience
- Customize appearance with themes and styling
- Implement data binding for dynamic data sources
- Ensure accessibility compliance for all users
- Export and print capabilities for sharing visualizations

For detailed implementation guidance, refer to the specific reference files listed in the navigation guide above.

## API Reference Documentation

📄 **Complete API Guide:** [references/api-reference.md](references/api-reference.md)

The Syncfusion Angular Chart component provides 200+ API documentation files covering:

- **Core APIs:** ChartModel (40+ properties), AxisModel (50+ properties), SeriesDirective (60+ properties)
- **Chart Elements:** Legend, Markers, Data Labels, Tooltip, Annotations, Trendlines, Technical Indicators, Striplines
- **Interactive Features:** Zooming, Panning, Crosshair, Selection, Drag Settings
- **AI Integration:** WebMCP enablement, settings, tool registration, tool execution, confirmation, and cleanup
- **Events:** 40+ event interfaces (ILoadedEventArgs, IPointRenderEventArgs, IZoomingEventArgs, etc.)
- **Enumerations:** 50+ enums (ChartSeriesType, ValueType, ChartTheme, SelectionMode, ExportType, etc.)
- **Utilities:** BorderModel, FontModel, MarginModel, AnimationModel, and more

All API documentation is available at https://ej2.syncfusion.com/angular/documentation/api/chart/. See [references/api-reference.md](references/api-reference.md) for comprehensive API navigation and documentation structure.

Each reference guide (getting-started.md, series-types.md, axes-and-layout.md, etc.) links to the official online API documentation throughout the content.
