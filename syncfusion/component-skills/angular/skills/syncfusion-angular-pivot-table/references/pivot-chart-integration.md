# Pivot Chart Integration

## Table of Contents
- [Overview](#overview)
- [Data Binding](#data-binding)
- [Chart Types](#chart-types)
- [Accumulation Charts](#accumulation-charts)
- [Field List](#field-list)
- [Grouping Bar](#grouping-bar)
- [Axis Configuration](#axis-configuration)
- [Multiple Axis](#multiple-axis)
- [Series Customization](#series-customization)

## Overview

The Pivot Chart visualizes aggregated values in graphical format supporting 21+ chart types, drill operations, and dynamic field configuration. Inject `PivotChartService` module and configure `displayOption` to control visibility.

**displayOption properties:**
- `view`: Table / Chart / Both
- `primary`: Table or Chart (applies when Both)

```typescript
@Component({
  providers: [PivotChartService],
  template: `<ejs-pivotview 
    [displayOption]="{view: 'Both', primary: 'Chart'}"
    [chartSettings]="chartSettings">
  </ejs-pivotview>`
})
export class AppComponent {
  chartSettings: any = { chartSeries: { type: 'Column' } };
}
```

## Data Binding

Pivot Chart supports local arrays and remote DataManager. Use `dataSourceSettings.dataSource` for local data. For remote, configure `dataSourceSettings.url` with `mode: 'Server'`.

## Chart Types

21 chart types supported including:
- Line, Column, Area, Bar, StepArea
- StackingLine, StackingColumn, StackingArea, StackingBar, StepLine
- Pareto, Bubble, Scatter, Spline, SplineArea
- StackingLine100, StackingColumn100, StackingBar100, StackingArea100
- Polar, Radar

Default is Line. Change via `chartSeries.type` property within `chartSettings`.

```typescript
this.chartSettings = { chartSeries: { type: 'Bar' } };
this.pivotGrid.refresh();
```

## Accumulation Charts

Supports Pie, Doughnut, Funnel, Pyramid. Set type via `chartSeries` within `chartSettings`:

```typescript
chartSettings: any = { 
  chartSeries: { type: 'Pie' }
};
```

### Drill Down and Up

Accumulation charts support drill operations via context menu with Expand/Collapse/Exit options. Works with row headers only.

### Column Headers and Delimiters

For multi-level columns, specify `columnHeader` and `columnDelimiter` in `chartSettings`:

```typescript
chartSettings: any = {
  columnHeader: 'Germany-Road Bikes',
  columnDelimiter: '-'
};
```

### Label Customization

Control data labels via `dataLabel` in `chartSeries`:
- `visible`: Show/hide labels
- `position`: Outside (default) or Inside
- `enableSmartLabels`: Auto-arrange to prevent overlap
- `connectorStyle`: Customize connector lines

### Pie and Doughnut Customization

- `startAngle`, `endAngle`: Create semi-pie/semi-doughnut
- `innerRadius`: Convert pie to doughnut (percentage > 0)
- `explode`: Highlight individual points on click

## Field List

Enable `showFieldList: true` to allow field manipulation. Chart updates automatically when fields change.

```typescript
@Component({
  template: `<ejs-pivotview 
    [showFieldList]="true">
  </ejs-pivotview>`
})
```

## Grouping Bar

Enable `showGroupingBar: true` for value axis field switching:

```typescript
@Component({
  template: `<ejs-pivotview 
    [showGroupingBar]="true">
  </ejs-pivotview>`
})
```

For accumulation charts, dropdown appears on column axis for header switching.

## Axis Configuration

Customize axes via `primaryXAxis` and `primaryYAxis` in `chartSettings`:

```typescript
chartSettings: any = {
  primaryXAxis: { labelIntersectAction: 'Rotate90' },
  primaryYAxis: { title: 'Sales Amount', labelFormat: '${value}K' }
};
```

**Not supported** for accumulation charts (Pie, Doughnut, Pyramid, Funnel).

Use `multiLevelLabelRender` event to modify multi-level labels:

```typescript
chartSettings: any = {
  multiLevelLabelRender: (args: any) => {
    args.text = 'Custom Label';
    args.alignment = 'Center';
  }
};
```

## Multiple Axis

### Enable Multiple Axes

Set `enableMultipleAxis: true` in `chartSettings`:

```typescript
chartSettings: any = {
  enableMultipleAxis: true
};
```

Each value field gets separate Y-axis. Not applicable for accumulation charts.

### Scroll on Multiple Axis

Set `enableScrollOnMultiAxis: true` to maintain 160-180px minimum height per chart with vertical scrollbar:

```typescript
chartSettings: any = {
  enableMultipleAxis: true,
  enableScrollOnMultiAxis: true
};
```

### Multiple Values in Single Chart

Set `multipleAxisMode` to display multiple value fields together:
- `Stacked` (default): Each value on separate axis
- `Single`: Multiple values with separate Y-axis scales
- `Combined`: Multiple values on single Y-axis

```typescript
chartSettings: any = {
  enableMultipleAxis: true,
  multipleAxisMode: 'Single'
};
```

Notes: Y-axis range formatted using first value field. Combined mode shares single Y-axis.

### Show Point Color by Members

Set `showPointColorByMembers: true` to display consistent colors for each member across all measures:

```typescript
chartSettings: any = {
  showPointColorByMembers: true
};
```

## Series Customization

Customize all series via `chartSeries` in `chartSettings`:

```typescript
chartSettings: any = {
  chartSeries: {
    type: 'Column',
    marker: { dataLabel: { visible: true } }
  }
};
```

Customize individual series using `chartSeriesCreated` event:

```typescript
@Component({
  template: `<ejs-pivotview 
    (chartSeriesCreated)="onSeriesCreated($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  onSeriesCreated(args: any): void {
    args.series.forEach((series: any) => {
      if (args.series.indexOf(series) % 2 === 0) {
        series.visible = false;
      }
    });
  }
}
```

## Best Practices

1. Use field list and grouping bar for user-driven field modifications
2. Choose appropriate chart type for data cardinality
3. Apply smart labels to prevent label overlap
4. Pre-filter data at source for performance
5. Avoid deep stacking for large datasets
6. Use multiple axis modes strategically (Single/Combined)
7. Test axis customization on non-accumulation charts only
8. Inject PivotChartService before using chart features
