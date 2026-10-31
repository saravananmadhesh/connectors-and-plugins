# Circular Gauge API Reference

This document summarizes key properties, methods, and events for the `CircularGaugeComponent` with direct links to the official Syncfusion Angular API anchors.

- Base URL: https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default

## Properties
- `allowImageExport` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#allowimageexport)
- `allowMargin` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#allowmargin)
- `allowPdfExport` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#allowpdfexport)
- `allowPrint` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#allowprint)
- `allowRangePreRender` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#allowrangeprerender)
- `animationDuration` — [number](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#animationduration)
- `axes` — [AxisModel[]](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/axismodel)
- `background` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#background)
- `border` — [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/bordermodel)
- `centerX` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#centerx)
- `centerY` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#centery)
- `description` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#description)
- `enablePersistence` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#enablepersistence)
- `enablePointerDrag` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#enablepointerdrag)
- `enableRangeDrag` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#enablerangedrag)
- `enableRtl` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#enablertl)
- `height` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#height)
- `legendSettings` — [LegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/legendsettingsmodel)
- `locale` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#locale)
- `margin` — [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/marginmodel)
- `moveToCenter` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#movetocenter)
- `tabIndex` — [number](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#tabindex)
- `theme` — [GaugeTheme](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/gaugetheme)
- `title` / `titleStyle` — string / [FontModel](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/fontmodel)
- `tooltip` — [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/tooltipsettingsmodel)
- `useGroupingSeparator` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#usegroupingseparator)
- `width` — [string](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#width)

## Methods
- `destroy()` — Destroy the gauge - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#destroy)
- `export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean)` — Export gauge (returns Promise) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#export)
- `print(id?: string[])` — Print gauge element(s) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#print)
- `setAnnotationValue(axisIndex: number, annotationIndex: number, content: string | Function)` — Set annotation content - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#setannotationvalue)
- `setPointerValue(axisIndex: number, pointerIndex: number, value: number)` — Set pointer value - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#setpointervalue)
- `setRangeValue(axisIndex: number, rangeIndex: number, start: number, end: number)` — Set range values - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default#setrangevalue)

## Events
- `animationComplete` — [IAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/ianimationcompleteeventargs)
- `annotationRender` — [IAnnotationRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iannotationrendereventargs)
- `axisLabelRender` — [IAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iaxislabelrendereventargs)
- `beforePrint` — [IPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iprinteventargs)
- `dragEnd` / `dragMove` / `dragStart` — [IPointerDragEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/ipointerdrageventargs)
- `gaugeMouseDown` / `gaugeMouseLeave` / `gaugeMouseMove` / `gaugeMouseUp` — [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/imouseeventargs)
- `legendRender` — [ILegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/ilegendrendereventargs)
- `load` / `loaded` — [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iloadedeventargs)
- `radiusCalculate` — [IRadiusCalculateEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iradiuscalculateeventargs)
- `resized` — [IResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/iresizeeventargs)
- `tooltipRender` — [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/itooltiprendereventargs)

---
Generated from: https://ej2.syncfusion.com/angular/documentation/api/circular-gauge/index-default
