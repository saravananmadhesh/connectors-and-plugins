# Chart API Reference

## Table of Contents
- [Main Classes](#main-classes)
- [Configuration Classes](#configuration-classes)
- [Series & Data Classes](#series--data-classes)
- [Axis Classes](#axis-classes)
- [Enumerations](#enumerations)
- [Events](#events)
- [Methods](#methods)

---

## Main Classes

### Chart
**Purpose:** Represents the chart control component. This is the main class for creating and configuring charts.

**Usage:**
```typescript
import { Chart } from '@syncfusion/ej2-charts';

const chart = new Chart({
  // Configuration options
}, '#chart');
```

**Key Properties:**
- `primaryXAxis` - Configuration for X-axis
- `primaryYAxis` - Configuration for Y-axis
- `series` - Array of series configurations
- `tooltip` - Tooltip settings
- `legend` - Legend configuration
- `title` - Chart title text
- `subtitle` - Chart subtitle text
- `height` - Chart height
- `width` - Chart width
- `theme` - Chart theme
- `palette` - Color palette array
- `background` - Chart background color
- `border` - Chart border configuration
- `margin` - Chart margin configuration
- `annotations` - Chart annotations

**Key Methods:**
- `refresh()` - Refresh/redraw the chart
- `export(type, fileName)` - Export chart (PNG, SVG, PDF)
- `print()` - Print the chart
- `destroy()` - Destroy the chart component

---

## Configuration Classes

### CrosshairSettings
**Purpose:** Options to configure the crosshair on the chart, which displays lines that follow the mouse cursor and show the axis values of the data points.

**Properties:**
```typescript
crosshair: {
  enable: boolean,           // Enable/disable crosshair
  lineType: 'Both' | 'Vertical' | 'Horizontal' | 'None',
  lineColor: string,
  lineWidth: number,
  lineDashArray: string,
  tooltip: CrosshairTooltip  // Tooltip configuration
}
```

### CrosshairTooltip
**Purpose:** Configures the crosshair tooltip for the chart.

**Properties:**
- `enable` - Enable/disable tooltip
- `fill` - Background color
- `textStyle` - Font styling

### ZoomSettings
**Purpose:** Configures the zooming behavior for the chart.

**Properties:**
```typescript
zoomSettings: {
  enable: boolean,
  mode: 'X' | 'Y' | 'XY',           // Zoom axis
  toolbarItems: ToolbarItems[],      // Toolbar buttons
  horizontalAlignment: 'Near' | 'Center' | 'Far'
}
```

### ChartAnnotationSettings
**Purpose:** Configures the annotation settings for a chart to highlight or provide additional information about specific points or regions.

**Properties:**
- `x` - X-axis location (Point or category name)
- `y` - Y-axis value
- `content` - Annotation content (HTML or text)
- `coordinateUnits` - 'Pixel' | 'Point'
- `region` - 'Chart' | 'Series'
- `verticalAlignment` - 'Top' | 'Bottom' | 'Middle'
- `horizontalAlignment` - 'Left' | 'Center' | 'Right'

### LegendSettings
**Purpose:** Configures the appearance and behavior of legends in charts.

**Properties:**
```typescript
legend: {
  visible: boolean,
  position: 'Top' | 'Bottom' | 'Left' | 'Right' | 'Auto' | 'Custom',
  alignment: 'Near' | 'Center' | 'Far',
  layout: 'Horizontal' | 'Vertical' | 'Auto',
  shape: 'Circle' | 'Rectangle' | 'Triangle' | 'Diamond' | 'Cross' | 'Plus' | 'SeriesType',
  mode: 'Series' | 'Point' | 'Range' | 'Gradient',
  title: string,
  background: string,
  border: Border,
  width: string,
  height: string,
  margin: Margin,
  padding: number,
  opacity: number,
  enablePages: boolean,
  enableHighlight: boolean,
  toggleVisibility: boolean,
  textWrap: 'Normal' | 'Wrap'
}
```

### ChartArea
**Purpose:** The ChartArea class provides properties to customize the appearance and layout of the chart's display area.

**Properties:**
- `background` - Background color
- `border` - Border configuration
- `opacity` - Transparency level (0-1)

### Title/Subtitle Configuration (titleSettings)
**Purpose:** The titleSettings class provides options to customize the title and subtitle displayed in the chart.

**Properties:**
```typescript
title: string,
subtitle: string,
titleSettings: {
  text: string,
  textAlignment: 'Center' | 'Left' | 'Right',
  position: 'Top' | 'Bottom' | 'Left' | 'Right' | 'Custom',
  x: number,
  y: number,
  background: string,
  border: titleBorder,
  font: Font,
  subTitleSettings: TitleStyleSettings
}
```

### Margin
**Purpose:** The Margin class enables configuration of the space around the chart's content.

**Properties:**
- `left` - Left margin in pixels
- `right` - Right margin in pixels
- `top` - Top margin in pixels
- `bottom` - Bottom margin in pixels

### Border
**Purpose:** The Border class provides configuration options for setting the borders in a chart.

**Properties:**
- `color` - Border color
- `width` - Border width in pixels
- `dashArray` - Dash pattern (e.g., "5,5")

### Font
**Purpose:** The Font class provides configuration options for customizing the fonts used in the charts.

**Properties:**
```typescript
font: {
  fontFamily: string,        // Font family name
  fontStyle: 'Normal' | 'Italic' | 'Oblique',
  fontWeight: 'Normal' | 'Bold' | '100' | '200' | ... | '900',
  size: string,              // E.g., '12px'
  color: string,             // Text color
  opacity: number            // 0-1
}
```

### RangeColorSetting
**Purpose:** Configures the range color settings in the chart for color mapping.

**Properties:**
- `min` - Minimum value
- `max` - Maximum value
- `color` - Color for this range
- `label` - Label for the range

### StackLabelsFont
**Purpose:** The StackLabelsFont class provides configuration options for customizing the font properties of stack labels in charts.

**Properties:**
- `fontFamily` - Font family
- `fontStyle` - Font style
- `fontWeight` - Font weight
- `size` - Font size
- `color` - Text color

### ScrollbarSettings
**Purpose:** Specifies properties for customizing the scrollbar settings in lazy loading.

**Properties:**
```typescript
scrollbarSettings: {
  enable: boolean,
  range: ScrollbarSettingsRange,
  position: 'PlaceNextToAxisLine' | 'Top' | 'Bottom' | 'Left' | 'Right'
}
```

### DragSettings
**Purpose:** Configures the drag settings for series in the chart.

**Properties:**
- `enable` - Enable/disable dragging
- `minY` - Minimum Y value
- `maxY` - Maximum Y value
- `fill` - Drag area fill color

---

## Series & Data Classes

### Series
**Purpose:** The Series class is used to configure individual series in a chart.

**Key Properties:**
```typescript
series: [{
  dataSource: any[],         // Data array
  xName: string,             // X-axis field name
  yName: string,             // Y-axis field name
  type: ChartSeriesType,     // Series type (Line, Column, etc.)
  name: string,              // Series name/legend label
  visible: boolean,
  fill: string,              // Series color
  width: number | string,    // Line width
  opacity: number,           // Transparency
  marker: MarkerSettings,
  dataLabel: DataLabelSettings,
  tooltip: TooltipSettings,
  trendlines: Trendline[],
  cornerRadius: CornerRadius,
  emptyPointSettings: EmptyPointSettings,
  dragSettings: DragSettings,
  errorBar: ErrorBarSettings,
  animation: Animation
}]
```

### MarkerSettings
**Purpose:** This class is used to define the appearance and behavior of the series markers.

**Properties:**
```typescript
marker: {
  visible: boolean,
  width: number,             // Marker size width
  height: number,            // Marker size height
  shape: ChartShape,         // Shape type (Circle, Rectangle, Triangle, etc.)
  fill: string,              // Marker color
  opacity: number,
  border: Border,
  offset: Offset,
  imageUrl: string,          // For image markers
  dataLabel: DataLabelSettings,
  position: 'Top' | 'Bottom' | 'Middle'
}
```

### DataLabelSettings
**Purpose:** This class provides options to customize the appearance and behavior of data labels within a series.

**Properties:**
```typescript
dataLabel: {
  visible: boolean,
  position: 'Outer' | 'Top' | 'Bottom' | 'Middle' | 'Auto',
  alignment: 'Center' | 'Far' | 'Near',
  rx: number,                // X offset
  ry: number,                // Y offset
  template: string,          // Custom HTML template
  format: string,            // Format string (e.g., '${point.y}%')
  margin: Margin,
  font: Font,
  border: Border,
  background: string,
  opacity: number,
  showZero: boolean,
  angle: number,             // Text rotation angle
  enableRotation: boolean,
  textOverflow: 'Ellipsis' | 'Clip',
  textWrap: 'Normal' | 'Wrap' | 'AnyWhere'
}
```

### ErrorBarSettings
**Purpose:** The ErrorBarSettings class provides options to customize the appearance and behavior of error bars in a series.

**Properties:**
```typescript
errorBar: {
  visible: boolean,
  type: 'Fixed' | 'Percentage' | 'StandardDeviation' | 'StandardError' | 'Custom',
  direction: 'Both' | 'Minus' | 'Plus',
  mode: 'Vertical' | 'Horizontal' | 'Both',
  verticalError: number,
  horizontalError: number,
  verticalErrorValue: number,
  horizontalErrorValue: number,
  fill: string,
  drawCap: boolean,
  cap: ErrorBarCapSettings
}
```

### ErrorBarCapSettings
**Purpose:** The ErrorBarCapSettings class provides options to customize the appearance and behavior of error bars cap.

**Properties:**
- `length` - Cap length
- `width` - Cap width
- `color` - Cap color

### Points
**Purpose:** The model that represents how the points in a series are configured and displayed.

**Properties:**
- `x` - X-axis value
- `y` - Y-axis value
- `text` - Data point text
- `fill` - Point color
- `visibility` - Show/hide point
- Any custom properties

### Trendline
**Purpose:** Configures the behavior and appearance of trendlines in a chart series. Trendlines indicate trends and the rate of price changes over a period.

**Properties:**
```typescript
trendlines: [{
  type: 'Linear' | 'Exponential' | 'Polynomial' | 'Power' | 'Logarithmic' | 'MovingAverage',
  visible: boolean,
  name: string,
  fill: string,
  width: number,
  dashArray: string,
  polynomialOrder: number,   // For polynomial trendline
  period: number,            // For moving average
  forward: number,           // Extend forward
  backward: number,          // Extend backward
  intercept: number,         // Y-intercept
  opacity: number
}]
```

### EmptyPointSettings
**Purpose:** This class configures the appearance and behavior of points with empty data in the series.

**Properties:**
```typescript
emptyPointSettings: {
  mode: 'Gap' | 'Zero' | 'Drop' | 'Average',
  fill: string,
  border: Border,
  opacity: number
}
```

### ParetoOptions
**Purpose:** The ParetoOptions class provides a set of properties for configuring the Pareto series.

**Properties:**
- `showCumulativeLine` - Show/hide cumulative line
- `cumulativeLineColor` - Cumulative line color
- `cumulativeLineWidth` - Cumulative line width

### LastValueLabelSettings
**Purpose:** This class is used to introduce a grid line indicator to highlight the last value of each series.

**Properties:**
- `visible` - Show/hide
- `fill` - Label color
- `border` - Label border
- `opacity` - Transparency

### SeriesLabelSettings
**Purpose:** Configures options for displaying series names as inline labels in the chart.

**Properties:**
```typescript
labelSettings: {
  visible: boolean,
  text: string,
  background: string,
  border: Border,
  opacity: number,
  font: Font,
  showOverlapText: boolean
}
```

### StackLabelSettings
**Purpose:** Represents the settings for configuring stack labels in a chart.

**Properties:**
```typescript
stackLabel: {
  visible: boolean,
  format: string,
  font: StackLabelsFont,
  border: Border,
  fill: string,
  opacity: number,
  alignment: 'Center' | 'Top' | 'Bottom'
}
```

### Animation
**Purpose:** Configures the animation behavior for the chart series.

**Properties:**
```typescript
animation: {
  enable: boolean,
  duration: number,          // In milliseconds
  delay: number,
  option: 'Progressive' | 'Simultaneous' | 'Series' | 'Category'
}
```

### Accessibility
**Purpose:** The Accessibility class configures accessibility options for chart controls.

**Properties:**
```typescript
accessibility: {
  enable: boolean,
  ariaLabel: string,
  description: string,
  descriptionId: string,
  ariaLabelledBy: string,
  ariaDescribedBy: string
}
```

### SeriesAccessibility
**Purpose:** The SeriesAccessibility class configures accessibility options specifically for chart series elements.

**Properties:**
- Similar to Accessibility class, applied at series level

---

## Axis Classes

### Axis
**Purpose:** The Axis class configures the axes in the chart. It provides various properties to customize the appearance and behavior of chart axes.

**Key Properties:**
```typescript
primaryXAxis: {
  valueType: 'Double' | 'DateTime' | 'Category' | 'Logarithmic' | 'DateTimeCategory',
  title: string,
  labelFormat: string,       // E.g., '{value}%', 'MMM dd'
  intervalType: IntervalType,
  interval: number,
  minimum: number,
  maximum: number,
  majorTickLines: MajorTickLines,
  minorTickLines: MinorTickLines,
  majorGridLines: MajorGridLines,
  minorGridLines: MinorGridLines,
  axisLine: AxisLine,
  labelIntersectAction: LabelIntersectAction,
  labelPlacement: 'OnTicks' | 'BetweenTicks',
  labelPosition: 'Inside' | 'Outside',
  logBase: number,           // For logarithmic axis
  isIndexed: boolean,
  stripLines: StripLineSettings[],
  multiLevelLabels: MultiLevelLabels[],
  scrollbarSettings: ScrollbarSettings,
  opposedPosition: boolean,
  rangePadding: ChartRangePadding,
  enableAutoIntervalOnBothAxes: boolean,
  desiredIntervals: number,
  maxLabelWidth: number,
  scrollbarPosition: ScrollbarPosition,
  edge: EdgeLabelPlacement
}
```

### AxisLine
**Purpose:** Configures the axis line of a chart, allowing customization of the line's appearance.

**Properties:**
- `width` - Line width in pixels
- `color` - Line color
- `dashArray` - Dash pattern
- `visible` - Show/hide axis line

### MajorGridLines
**Purpose:** Configures the major grid lines in the axis.

**Properties:**
- `width` - Line width
- `color` - Line color
- `dashArray` - Dash pattern
- `visible` - Show/hide grid lines

### MinorGridLines
**Purpose:** Configures the minor grid lines in the axis.

**Properties:**
- Same as MajorGridLines

### MajorTickLines
**Purpose:** Configures the major tick lines in the axis.

**Properties:**
- `width` - Tick width
- `size` - Tick length
- `color` - Tick color

### MinorTickLines
**Purpose:** Configures the minor tick lines in the axis.

**Properties:**
- Same as MajorTickLines

### MultiLevelLabels
**Purpose:** The MultiLevelLabels class is used to customize the appearance and behavior of multi-level labels in charts.

**Properties:**
```typescript
multiLevelLabels: [{
  categories: MultiLevelCategories[],
  overflow: 'Trim' | 'Wrap' | 'None',
  alignment: 'Center' | 'Left' | 'Right',
  textStyle: Font,
  border: Border,
  textOverflow: 'Ellipsis' | 'Trim' | 'Clip'
}]
```

### MultiLevelCategories
**Purpose:** The MultiLevelCategories class allows defining and customizing the categories used in multi-level labels.

**Properties:**
- `start` - Start index
- `end` - End index
- `text` - Category text

### StripLine
**Purpose:** The StripLine module is used to render strip lines in charts.

### StripLineSettings
**Purpose:** The StripLineSettings class provides configuration options for strip lines in a chart.

**Properties:**
```typescript
stripLines: [{
  startValue: number,
  endValue: number,
  size: number,
  sizeType: 'Auto' | 'Pixel' | 'Year' | 'Month' | 'Day' | 'Hour' | 'Minutes' | 'Seconds',
  isSegmented: boolean,
  segmentStart: number,
  segmentEnd: number,
  segmentAxisName: string,
  color: string,
  opacity: number,
  zIndex: 'Behind' | 'Over',
  visible: boolean,
  text: string,
  rotation: number,
  textAlignment: 'MiddleLeft' | 'MiddleCenter' | 'MiddleRight' | 'TopLeft' | 'TopCenter' | 'TopRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight',
  textStyle: Font,
  border: Border
}]
```

### Column
**Purpose:** Configures the columns of the chart to create multiple horizontal columns within the chart area.

**Properties:**
- `width` - Column width percentage
- `lineWidth` - Column line width
- `lineColor` - Column line color

### Row
**Purpose:** Configures the rows of the chart to create multiple vertical rows within the chart area.

**Properties:**
- Similar to Column class

---

## Enumerations

### ChartSeriesType
Values: `Line`, `Column`, `Area`, `Pie`, `Doughnut`, `Polar`, `Radar`, `Bar`, `Histogram`, `StackingColumn`, `StackingArea`, `StackingLine`, `StackingBar`, `StackingColumn100`, `StackingArea100`, `StackingLine100`, `StackingBar100`, `StepLine`, `StepArea`, `Scatter`, `Spline`, `RangeColumn`, `Hilo`, `HiloOpenClose`, `Waterfall`, `RangeArea`, `RangeStepArea`, `Candle`, `SplineRangeArea`, `BoxAndWhisker`, `MultiColoredLine`, `MultiColoredArea`, `Pareto`

### ChartShape
Marker shapes: `Circle`, `Rectangle`, `Triangle`, `Diamond`, `Cross`, `Plus`, `HorizontalLine`, `VerticalLine`, `Pentagon`, `InvertedTriangle`, `Image`

### ChartTheme
Available themes: `Material`, `Fabric`, `Bootstrap`, `HighContrastLight`, `MaterialDark`, `FabricDark`, `HighContrast`, `BootstrapDark`, `Bootstrap4`, `Tailwind`, `TailwindDark`, `Bootstrap5`, `Bootstrap5Dark`, `Fluent`, `FluentDark`, `Fluent2`, `Fluent2Dark`, `Material3`, `Material3Dark`

### LegendPosition
Values: `Auto`, `Top`, `Left`, `Bottom`, `Right`, `Custom`

### LegendMode
Values: `Series`, `Point`, `Range`, `Gradient`

### LegendLayout
Values: `Horizontal`, `Vertical`, `Auto`

### LegendShape
Values: `Circle`, `Rectangle`, `Triangle`, `Diamond`, `Cross`, `HorizontalLine`, `VerticalLine`, `Pentagon`, `InvertedTriangle`, `SeriesType`, `Image`

### LabelPosition
Values: `Outer`, `Top`, `Bottom`, `Middle`, `Auto`

### DataLabelIntersectAction
Values: `None`, `Hide`, `Rotate90`

### LabelIntersectAction
Values: `None`, `Hide`, `Trim`, `Wrap`, `MultipleRows`, `Rotate45`, `Rotate90`

### EmptyPointMode
Values: `Gap`, `Zero`, `Drop`, `Average`

### ZoomMode
Values: `X`, `Y`, `XY`

### ToolbarItems
Values: `Zoom`, `ZoomIn`, `ZoomOut`, `Pan`, `Reset`

### SelectionMode
Values: `None`, `Series`, `Point`, `Cluster`, `DragXY`, `DragX`, `DragY`, `Lasso`

### SelectionPattern
Values: `None`, `Chessboard`, `Dots`, `DiagonalForward`, `Crosshatch`, `Pacman`, `Diagonalbackward`, `Grid`, `Turquoise`, `Star`, `Triangle`, `Circle`, `Tile`, `Horizontaldash`, `Verticaldash`, `Rectangle`, `Box`, `Verticalstripe`, `Horizontalstripe`, `Bubble`

### HighlightMode
Values: `None`, `Series`, `Point`, `Cluster`

### IntervalType
Values: `Auto`, `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds`

### ValueType
Values: `Double`, `DateTime`, `Category`, `Logarithmic`, `DateTimeCategory`

### ChartRangePadding
Values: `Auto`, `None`, `Normal`, `Additional`, `Round`

### EdgeLabelPlacement
Values: `None`, `Hide`, `Shift`

### TooltipPosition
Values: `Fixed`, `Nearest`

### FadeOutMode
Values: `Click`, `Move`

### ErrorBarType
Values: `Fixed`, `Percentage`, `StandardDeviation`, `StandardError`, `Custom`

### ErrorBarMode
Values: `Vertical`, `Horizontal`, `Both`

### ErrorBarDirection
Values: `Both`, `Minus`, `Plus`

### ExportType
Values: `PNG`, `JPEG`, `SVG`, `PDF`, `XLSX`, `CSV`, `Print`

### TrendlineTypes
Values: `Linear`, `Exponential`, `Polynomial`, `Power`, `Logarithmic`, `MovingAverage`

### TechnicalIndicators
Values: `Sma`, `Ema`, `Tma`, `Atr`, `AccumulationDistribution`, `Momentum`, `Rsi`, `Macd`, `Stochastic`, `BollingerBands`

### MacdType
Values: `Line`, `Histogram`, `Both`

### BoxPlotMode
Values: `Exclusive`, `Inclusive`, `Normal`

### FinancialDataFields
Values: `High`, `Low`, `Open`, `Close`

### ChartDrawType
Values: `Line`, `Column`, `Area`, `Scatter`, `Spline`, `StackingColumn`, `StackingArea`, `RangeColumn`, `SplineArea`

### Alignment
Values: `Near`, `Center`, `Far`

### Position
Values: `Top`, `Middle`, `Bottom`

### LineType
Values: `None`, `Both`, `Vertical`, `Horizontal`

### SplineType
Values: `Natural`, `Cardinal`, `Clamped`, `Monotonic`

### StepPosition
Values: `Left`, `Center`, `Right`

### TextAlignment
Values: `Center`, `Left`, `Right`

### TextOverflow
Values: `None`, `Wrap`, `Trim`

### TextWrap
Values: `Normal`, `Wrap`, `AnyWhere`

### LabelOverflow
Values: `Ellipsis`, `Clip`

### LabelPlacement
Values: `BetweenTicks`, `OnTicks`

### LegendTitlePosition
Values: `Top`, `Left`, `Right`

### PeriodSelectorPosition
Values: `Top`, `Bottom`

### Segment
Values: `X`, `Y`

### SizeType
Values: `Auto`, `Pixel`, `Year`, `Month`, `Day`, `Hour`, `Minutes`, `Seconds`

### Anchor
Values: `Start`, `Middle`, `End`

### AxisPosition
Values: `Inside`, `Outside`

### BorderType
Values: `Rectangle`, `Brace`, `WithoutBorder`, `WithoutTopBorder`, `WithoutTopandBottomBorder`, `CurlyBrace`

### ShapeType
Values: `Rectangle`, `Cylinder`

### SkeletonType
Values: `Date`, `DateTime`, `Time`

### Units
Values: `Pixel`, `Point`

### Regions
Values: `Chart`, `Series`

### ScrollbarPosition
Values: `PlaceNextToAxisLine`, `Top`, `Bottom`, `Left`, `Right`

---

## Events

The Chart component emits various events for user interactions and data changes:

### Chart-level Events

```typescript
new Chart({
  // Life cycle events
  beforePrint: (args: IBeforePrintEventArgs) => { },
  pointRender: (args: IPointRenderEventArgs) => { },
  seriesRender: (args: ISeriesRenderEventArgs) => { },
  axisLabelRender: (args: IAxisLabelRenderEventArgs) => { },
  tooltipRender: (args: ITooltipRenderEventArgs) => { },
  legendRender: (args: ILegendRenderEventArgs) => { },
  titleRender: (args: ITitleRenderEventArgs) => { },
  load: (args: ILoadedEventArgs) => { },
  loaded: (args: ILoadedEventArgs) => { },
  resize: (args: IResizeEventArgs) => { },
  
  // User interaction events
  click: (args: IMouseEventArgs) => { },
  pointClick: (args: IPointEventArgs) => { },
  pointMove: (args: IPointEventArgs) => { },
  mouseDown: (args: IMouseEventArgs) => { },
  mouseUp: (args: IMouseEventArgs) => { },
  mouseMove: (args: IMouseEventArgs) => { },
  mouseLeave: (args: IMouseEventArgs) => { },
  
  // Selection & drag events
  selectionComplete: (args: ISelectionCompleteEventArgs) => { },
  dataLabelRender: (args: IDataLabelRenderEventArgs) => { },
  crosshairMove: (args: ICrosshairMoveEventArgs) => { },
  dragStart: (args: IDragCompleteEventArgs) => { },
  drag: (args: IDragCompleteEventArgs) => { },
  dragEnd: (args: IDragCompleteEventArgs) => { },
  
  // Export & animation events
  beforeExport: (args: IBeforeExportEventArgs) => { },
  afterExport: (args: any) => { },
  beforeResize: (args: any) => { },
  imageExport: (args: any) => { },
  pdfExport: (args: any) => { }
});
```

---

## Methods

### Chart Methods

```typescript
const chart = new Chart({...});

// Rendering & Display
chart.refresh() - Refresh/redraw the chart
chart.print() - Print the chart
chart.destroy() - Destroy the chart
chart.export(type: ExportType, fileName: string) - Export to PNG, SVG, PDF, etc.

// Data & Series Management
chart.addSeries(seriesCollection: Series[]) - Add series dynamically
chart.removeSeries(index: number) - Remove series by index
chart.updateSeries(seriesCollection: Series[]) - Update series data

// Selection & Interaction
chart.selectDataPoint(seriesIndex: number, pointIndex: number) - Select a data point
chart.clearSelection() - Clear all selections
chart.highlightPoint(seriesIndex: number, pointIndex: number, highlight: boolean) - Highlight/unhighlight point

// Axis & Scrollbar
chart.setAxisRange(axis: Axis, min: number, max: number) - Set axis range
chart.getAxisCoordinates(x: number, y: number) - Get axis values from pixel coordinates
chart.getPixelFromAxis(xValue: number, yValue: number) - Get pixel coordinates from axis values

// Tooltip & Crosshair
chart.showTooltip(x: number, y: number) - Show tooltip at coordinates
chart.hideTooltip() - Hide tooltip
chart.moveCrosshair(x: number, y: number) - Move crosshair

// Zoom & Pan
chart.zoom(factor: number, axisName?: string) - Zoom in/out
chart.pan(direction: 'Left' | 'Right' | 'Up' | 'Down') - Pan chart
chart.resetZoom() - Reset zoom level

// Visibility & State
chart.hidePointSeries(seriesIndex: number, pointIndex: number) - Hide a point
chart.showPointSeries(seriesIndex: number, pointIndex: number) - Show a point
chart.isPointInChart(x: number, y: number) - Check if point is within chart area
```

---

## Modules

The Chart component requires specific modules to be injected using `Chart.Inject()`:

```typescript
import {
  Chart,
  LineSeries,
  ColumnSeries,
  AreaSeries,
  BarSeries,
  PieSeries,
  ScatterSeries,
  SplineSeries,
  StepLineSeries,
  StepAreaSeries,
  StackingColumnSeries,
  StackingAreaSeries,
  StackingBarSeries,
  StackingLineSeries,
  HistogramSeries,
  CandleSeries,
  HiloSeries,
  HiloOpenCloseSeries,
  RangeColumnSeries,
  RangeAreaSeries,
  WaterfallSeries,
  FunnelSeries,
  PyramidSeries,
  BoxPlotSeries,
  SplineRangeAreaSeries,
  ParetoSeries,
  MulticolorLineSeriesModule,
  RadarSeries,
  PolarSeries,
  BubbleSeries,
  Tooltip,
  Legend,
  Zoom,
  Selection,
  Highlight,
  DataLabel,
  Category,
  DateTime,
  Logarithmic,
  DateTimeCategory,
  StackingColumnSeries,
  Crosshair,
  Trendline,
  Export,
  ImageExport,
  PDF,
  StripLine,
  TechnicalIndicator,
  Annotation,
  ErrorBar,
  LegendSettings,
  ScrollBar
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  DateTime,
  Legend,
  Tooltip
);
```

---

## Related Classes (Continued)

### PeriodSelectorSettings
**Purpose:** Configures the period selector settings for date-time axis.

**Properties:**
```typescript
periodSelectorSettings: {
  enable: boolean,
  position: 'Top' | 'Bottom',
  height: number,
  periods: Periods[],
  buttons: ToolbarPosition[]
}
```

### Periods
**Purpose:** Configures the button settings in period selector.

**Properties:**
- `text` - Button text
- `intervalType` - Interval type
- `interval` - Interval value
- `selected` - Is selected

### ToolbarPosition
**Purpose:** Configures the ToolbarPosition for the chart.

**Properties:**
- `alignment` - Toolbar alignment
- `position` - Toolbar position

### Offset
**Purpose:** The Offset class provides options to adjust the position of the marker relative to its default location.

**Properties:**
- `x` - X offset in pixels
- `y` - Y offset in pixels

### Indexes
**Purpose:** Specifies the indexes for the series and data points.

**Properties:**
- `series` - Series index
- `point` - Point index

### Location
**Purpose:** Configures the location for the legend and tooltip in the chart.

**Properties:**
- `x` - X coordinate
- `y` - Y coordinate

### CornerRadius
**Purpose:** The CornerRadius class provides options to customize the rounding of the corners for columns in the column series.

**Properties:**
- `bottomLeft` - Bottom-left radius
- `bottomRight` - Bottom-right radius
- `topLeft` - Top-left radius
- `topRight` - Top-right radius

### Connector
**Purpose:** The Connector class configures the appearance and properties of connectors in chart controls.

**Properties:**
- `type` - Connector type
- `color` - Line color
- `width` - Line width

### CenterLabel
**Purpose:** Options to customize the center label of the Pie and Donut charts.

**Properties:**
- `text` - Label text
- `hoverTextFormat` - Hover text format
- `textStyle` - Font styling

### ContainerPadding
**Purpose:** Configures the padding around the chart legend container.

**Properties:**
- `left` - Left padding
- `right` - Right padding
- `top` - Top padding
- `bottom` - Bottom padding

### GradientColorStop
**Purpose:** Represents a color stop in a gradient.

**Properties:**
- `color` - Color value
- `offset` - Offset percentage (0-100)
- `opacity` - Transparency level

### LinearGradient
**Purpose:** Represents a linear gradient configuration.

**Properties:**
```typescript
linearGradient: {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colorStop: GradientColorStop[]
}
```

### RadialGradient
**Purpose:** Represents a radial gradient configuration.

**Properties:**
```typescript
radialGradient: {
  cx: number,
  cy: number,
  r: number,
  colorStop: GradientColorStop[]
}
```

### LabelBorder
**Purpose:** The LabelBorder class provides options to customize the border settings for chart labels.

**Properties:**
- `color` - Border color
- `width` - Border width
- `type` - Border type

### TitleStyleSettings
**Purpose:** The TitleStyleSettings class provides options to customize the title and subtitle displayed in the accumulation chart.

**Properties:**
```typescript
titleStyleSettings: {
  size: string,
  opacity: number,
  alignment: 'Center' | 'Left' | 'Right',
  fontStyle: 'Normal' | 'Italic',
  fontWeight: 'Normal' | 'Bold',
  fontFamily: string,
  color: string
}
```

### titleBorder
**Purpose:** Configures the borders of the chart title and subtitle.

**Properties:**
- `color` - Border color
- `width` - Border width
- `type` - Border type

### SeriesBase
**Purpose:** Defines the common behavior for series and technical indicators.

**Properties:**
- Shares common properties with Series class

### TechnicalIndicator
**Purpose:** Defines how to represent the market trend using technical indicators.

**Properties:**
```typescript
indicators: [{
  type: TechnicalIndicators,
  field: FinancialDataFields,
  seriesName: string,
  yAxisName: string,
  fill: string,
  period: number,
  standardDeviation: number,
  macdType: MacdType
}]
```

### Modules for Indicators
```typescript
import {
  Sma,
  Ema,
  Tma,
  Atr,
  AccumulationDistribution,
  Momentum,
  Rsi,
  Macd,
  Stochastic,
  BollingerBands
} from '@syncfusion/ej2-charts';

Chart.Inject(Sma, Ema, Macd, Rsi);
```

---

## Export Module

### Export
**Purpose:** The Export module is used to print and export the rendered chart.

**Usage:**
```typescript
import { Export } from '@syncfusion/ej2-charts';

Chart.Inject(Export);

// Export methods
chart.export('PNG', 'chart.png');
chart.export('SVG', 'chart.svg');
chart.export('PDF', 'chart.pdf');
chart.export('Print', undefined);

// Data export
chart.export('CSV', 'data.csv');
chart.export('XLSX', 'data.xlsx');
```

---

## Event Interfaces

### Common Event Arguments

```typescript
interface IMouseEventArgs {
  cancel: boolean;
  x: number;
  y: number;
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
}

interface IPointEventArgs {
  cancel: boolean;
  pointIndex: number;
  seriesIndex: number;
  pointX: number;
  pointY: number;
}

interface ISelectionCompleteEventArgs {
  selectedDataIndexes: Indexes[];
  oldIndexes: Indexes[];
  newIndexes: Indexes[];
}

interface IDataLabelRenderEventArgs {
  cancel: boolean;
  template: string;
  text: string;
  x: number;
  y: number;
}

interface ITooltipRenderEventArgs {
  cancel: boolean;
  text: string | string[];
  data: object;
  headerText: string;
}

interface ICrosshairMoveEventArgs {
  cancel: boolean;
  value: number;
  axisName: string;
}

interface IBeforeExportEventArgs {
  type: ExportType;
  fileName: string;
}
```

---

## Common Patterns & Usage

### Multi-axis Chart
```typescript
const chart = new Chart({
  axes: [{
    name: 'YAxis1',
    opposedPosition: true
  }],
  series: [
    { yAxisName: 'YAxis1', ... }
  ]
});
```

### Grouped Series
```typescript
series: [
  { xName: 'x', yName: 'y1', type: 'Column' },
  { xName: 'x', yName: 'y2', type: 'Column' }
]
```

### Dynamic Updates
```typescript
chart.series[0].dataSource = newData;
chart.refresh();
```

### Custom Formatting
```typescript
labelFormat: '{value:n0}' // Numbers with thousand separators
labelFormat: 'MMM dd' // Date format
labelFormat: '{value}%' // Percentage format
```

---

## Documentation Links

- **Official API Documentation:** https://ej2.syncfusion.com/documentation/api/chart/
- **Getting Started Guide:** https://ej2.syncfusion.com/javascript/documentation/chart/chart-getting-started/
- **Feature Guides:** https://ej2.syncfusion.com/javascript/documentation/chart/chart-types/
