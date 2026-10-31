# Circular 3D Chart API Reference

This document summarizes key properties, methods, and events for the `CircularChart3DComponent` with direct links to the official Syncfusion Angular API anchors.

- Base URL: https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/index-default

## Properties
- `background` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#background)
- `backgroundImage` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#backgroundimage)
- `border` — [BorderModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/bordermodel)
- `dataSource` — [Object | DataManager](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#datasource)
- `depth` — [number](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#depth)
- `enableAnimation` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#enableanimation)
- `enableExport` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#enableexport)
- `enablePersistence` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#enablepersistence)
- `enableRotation` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#enablerotation)
- `enableRtl` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#enablertl)
- `height` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#height)
- `highlightColor` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#highlightcolor)
- `highlightMode` — [CircularChart3DHighlightMode](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dhighlightmode)
- `highlightPattern` — [SelectionPattern](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/selectionpattern)
- `isMultiSelect` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#ismultiselect)
- `legendSettings` — [CircularChart3DLegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dlegendsettingsmodel)
- `locale` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#locale)
- `margin` — [MarginModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/marginmodel)
- `rotation` — [number](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#rotation)
- `selectedDataIndexes` — [IndexesModel[]](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/indexesmodel)
- `selectionMode` — [CircularChart3DSelectionMode](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dselectionmode)
- `selectionPattern` — [SelectionPattern](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/selectionpattern)
- `series` — [CircularChart3DSeriesModel[]](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dseriesmodel)
- `subTitle` / `subTitleStyle` — string / [FontModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/fontmodel)
- `theme` — [CircularChart3DTheme](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dtheme)
- `tilt` — [number](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#tilt)
- `title` / `titleStyle` — string / [FontModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/fontmodel)
- `tooltip` — [CircularChart3DTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dtooltipsettingsmodel)
- `useGroupingSeparator` — [boolean](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#usegroupingseparator)
- `width` — [string](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmodel#width)

## Methods
- `export(type: ExportType, fileName: string)` — Export chart as image - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/index-default#export)
- `pdfExport(...)` — Export chart to PDF (supports options) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/index-default#pdfexport)
- `print(id?: string[])` — Print chart element(s) - [Refer link](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/index-default#print)

## Events
- `afterExport` — [CircularChart3DAfterExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dafterexporteventargs)
- `beforeExport` — [CircularChart3DExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dexporteventargs)
- `beforePrint` — [CircularChart3DPrintEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dprinteventargs)
- `beforeResize` — [CircularChart3DBeforeResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dbeforeresizeeventargs)
- `circularChart3DMouseClick` — [CircularChart3DMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmouseeventargs)
- `circularChart3DMouseDown` — [CircularChart3DMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmouseeventargs)
- `circularChart3DMouseLeave` — [CircularChart3DMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmouseeventargs)
- `circularChart3DMouseMove` — [CircularChart3DMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmouseeventargs)
- `circularChart3DMouseUp` — [CircularChart3DMouseEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dmouseeventargs)
- `legendClick` — [CircularChart3DLegendClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dlegendclickeventargs)
- `legendRender` — [CircularChart3DLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dlegendrendereventargs)
- `load` / `loaded` — [CircularChart3DLoadedEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dloadedeventargs)
- `pointClick` / `pointMove` — [CircularChart3DPointEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dpointeventargs)
- `pointRender` — [CircularChart3DPointRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dpointrendereventargs)
- `resized` — [CircularChart3DResizeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dresizeeventargs)
- `selectionComplete` — [CircularChart3DSelectionCompleteEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dselectioncompleteeventargs)
- `seriesRender` — [CircularChart3DSeriesRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dseriesrendereventargs)
- `textRender` — [CircularChart3DTextRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dtextrendereventargs)
- `tooltipRender` — [CircularChart3DTooltipRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/circularchart3dtooltiprendereventargs)

---
Generated from: https://ej2.syncfusion.com/angular/documentation/api/circularchart3d/index-default
