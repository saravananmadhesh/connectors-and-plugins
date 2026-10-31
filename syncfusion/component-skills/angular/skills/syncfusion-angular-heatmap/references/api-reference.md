````markdown
# HeatMap API Reference

Base URL: https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default

This file lists the primary properties, methods and events for the Angular `ejs-heatmap` component (curated) and links to the official API index above for full details.

## Key Properties
- [`allowSelection`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#allowselection) : boolean — enable/disable cell selection  
- [`backgroundColor`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#backgroundcolor) : string — container background color  
- [`cellSettings`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#cellsettings) : `CellSettingsModel` — border, label and bubble settings for cells  
- [`dataSource`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#datasource) : Object[] | 2D array — data for rendering cells  
- [`legendSettings`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#legendsettings) : `LegendSettingsModel` — legend position and appearance  
- [`paletteSettings`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#palettesettings) : `PaletteSettingsModel` — color palette / gradient configuration  
- [`renderingMode`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#renderingmode) : `DrawType` — `SVG` or `Canvas` rendering mode  
- [`tooltipSettings`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#tooltipsettings) : `TooltipSettingsModel` — tooltip templates and behavior  
- [`xAxis`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#xaxis) : `AxisModel` — configuration for X axis (Labels/Numeric/DateTime)  
- [`yAxis`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#yaxis) : `AxisModel` — configuration for Y axis (Labels/Numeric/DateTime)  

---

## Key Methods
- [`clearSelection()`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#clearselection) — clear selected cells  
- [`refresh()`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#refresh) — re-render the heatmap  
- [`destroy()`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#destroy) — teardown component  
- [`export(type, fileName, orientation)`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#export) — export as image/PDF  
- [`print()`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#print) — print the heatmap  

---

## Important Events
- [`cellClick`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#cellclick) : `ICellClickEventArgs` — user clicked a cell  
- [`cellDoubleClick`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#celldoubleclick) : `ICellClickEventArgs` — double-click on cell  
- [`cellRender`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#cellrender) : `ICellEventArgs` — fired while rendering each cell (use to customize)  
- [`cellSelected`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#cellselected) : `ISelectedEventArgs` — when selection completes  
- [`tooltipRender`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#tooltiprender) : `ITooltipEventArgs` — customize tooltip content  
- [`legendRender`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#legendrender) : `ILegendRenderEventArgs` — fired when legend is rendered  
- [`load`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#load) / [`loaded`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#loaded) : `ILoadedEventArgs` — lifecycle load events  
- [`resized`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/index-default#resized) : `IResizeEventArgs` — when heatmap container is resized  

---

## Models & Event Args (select)
- [`CellSettingsModel`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/cellSettingsModel)  
- [`PaletteSettingsModel`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/paletteSettingsModel)  
- [`AxisModel`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/axisModel)  
- [`ICellClickEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/icellclickeventargs)  
- [`ICellEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/icelleventargs)  
- [`ISelectedEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/iselectedeventargs)  
- [`ITooltipEventArgs`](https://ej2.syncfusion.com/angular/documentation/api/heatmap/itooltipeventargs)  

For complete and authoritative API anchor links, use the official index above and search for the exact member or event name (the index exposes anchors for models and event-arg interfaces).

````
