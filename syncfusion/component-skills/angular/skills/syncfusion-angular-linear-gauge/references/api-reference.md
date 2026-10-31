# Linear Gauge API Reference

This document summarizes key properties, methods, and events for the `LinearGaugeComponent` with direct links to the official Syncfusion Angular API anchors.

- Base URL: https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default

## Properties
- `allowImageExport` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#allowimageexport)
- `allowMargin` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#allowmargin)
- `allowPdfExport` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#allowpdfexport)
- `allowPrint` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#allowprint)
- `animationDuration` — [number](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#animationduration)
- `annotations` — [AnnotationModel[]](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/annotationmodel)
- `axes` — [AxisModel[]](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/axismodel)
- `background` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#background)
- `border` — [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/bordermodel)
- `container` — [ContainerModel](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/containermodel)
- `description` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#description)
- `edgeLabelPlacement` — [LabelPlacement](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/labelplacement)
- `enablePersistence` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#enablepersistence)
- `enableRtl` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#enablertl)
- `format` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#format)
- `height` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#height)
- `locale` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#locale)
- `margin` — [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/marginmodel)
- `orientation` — [Orientation](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/orientation)
- `rangePalettes` — [string[]](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#rangepalettes)
- `tabIndex` — [number](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#tabindex)
- `theme` — [LinearGaugeTheme](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/lineargaugetheme)
- `title` / `titleStyle` — string / [FontModel](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/fontmodel)
- `tooltip` — [TooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/tooltipsettingsmodel)
- `useGroupingSeparator` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#usegroupingseparator)
- `width` — [string](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#width)

## Methods
- `destroy()` — Destroy the gauge - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#destroy)
- `export(type: ExportType, fileName: string, orientation?: PdfPageOrientation, allowDownload?: boolean)` — Export gauge (returns Promise) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#export)
- `print(id?: string[])` — Print gauge element(s) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#print)
- `setAnnotationValue(annotationIndex: number, content: string | Function, axisValue?: number)` — Set annotation value - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#setannotationvalue)
- `setPointerValue(axisIndex: number, pointerIndex: number, value: number)` — Set a pointer value - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default#setpointervalue)

## Events
- `animationComplete` — [IAnimationCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/ianimationcompleteeventargs)
- `annotationRender` — [IAnnotationRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iannotationrendereventargs)
- `axisLabelRender` — [IAxisLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iaxislabelrendereventargs)
- `beforePrint` — [IPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iprinteventargs)
- `dragEnd` / `dragMove` / `dragStart` — [IPointerDragEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/ipointerdrageventargs)
- `gaugeMouseDown` / `gaugeMouseLeave` / `gaugeMouseMove` / `gaugeMouseUp` — [IMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/imouseeventargs)
- `load` / `loaded` — [ILoadEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iloadeventargs) / [ILoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iloadedeventargs)
- `resized` — [IResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/iresizeeventargs)
- `tooltipRender` — [ITooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/itooltiprendereventargs)
- `valueChange` — [IValueChangeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/ivaluechangeeventargs)

---
Generated from: https://ej2.syncfusion.com/angular/documentation/api/linear-gauge/index-default
