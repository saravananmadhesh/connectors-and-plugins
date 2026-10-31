# Getting Started with Angular Maps

Complete guide to installing, configuring, and creating your first Syncfusion Angular Maps component.

## Table of Contents

- [Dependencies](#dependencies)
- [When to Use This Skill](#when-to-use-this-skill)
- [Installation](#installation)
- [Adding Maps Component](#adding-maps-component)
  - [Step 1 Import MapsModule](#step-1-import-mapsmodule)
  - [Step 2 Add Basic Maps Template](#step-2-add-basic-maps-template)
- [Module Injection](#module-injection)
  - [Inject Services](#inject-services)
  - [Layer Services](#layer-services)
  - [Marker and Bubble Services](#marker-and-bubble-services)
  - [Navigation Line Service](#navigation-line-service)
  - [User Interaction Services](#user-interaction-services)
  - [Annotation Service](#annotation-service)
  - [Print and Export Services](#print-and-export-services)
  - [Example Full Maps Service Injection](#example-full-maps-service-injection)
- [Interfaces](#interfaces)
  - [Maps Configuration Interfaces](#maps-configuration-interfaces)
  - [Layer Interfaces](#layer-interfaces)
  - [Data Label Interfaces](#data-label-interfaces)
  - [Marker Interfaces](#marker-interfaces)
  - [Bubble Interfaces](#bubble-interfaces)
  - [Navigation Line Interfaces](#navigation-line-interfaces)
  - [Tooltip Interfaces](#tooltip-interfaces)
  - [Legend Interfaces](#legend-interfaces)
  - [Selection and Highlight Interfaces](#selection-and-highlight-interfaces)
  - [Zoom Interfaces](#zoom-interfaces)
  - [Annotation Interfaces](#annotation-interfaces)
  - [Tile Map and Ajax Interfaces](#tile-map-and-ajax-interfaces)
  - [Maps Lifecycle Event Interfaces](#maps-lifecycle-event-interfaces)
  - [Maps Shape Event Interfaces](#maps-shape-event-interfaces)
  - [Maps Marker Event Interfaces](#maps-marker-event-interfaces)
  - [Maps Bubble Event Interfaces](#maps-bubble-event-interfaces)
  - [Maps Navigation Line Event Interfaces](#maps-navigation-line-event-interfaces)
  - [Maps Tooltip and Legend Event Interfaces](#maps-tooltip-and-legend-event-interfaces)
  - [Maps Annotation Event Interfaces](#maps-annotation-event-interfaces)
  - [Maps Zoom and Pan Event Interfaces](#maps-zoom-and-pan-event-interfaces)
  - [Maps Mouse Event Interfaces](#maps-mouse-event-interfaces)
  - [Print and Export Event Interfaces](#print-and-export-event-interfaces)
  - [Example Importing Interfaces](#example-importing-interfaces)
- [Loading GeoJSON Shape Data](#loading-geojson-shape-data)
  - [Step 1 Check for User-Provided Input File](#step-1-check-for-user-provided-input-file)
  - [Step 2 Import GeoJSON Data](#step-2-import-geojson-data)
  - [Step 3 Bind Shape Data](#step-3-bind-shape-data)
- [Binding Data Source](#binding-data-source)
  - [Step 1 Basic Shape Binding Display GeoJSON Shapes](#step-1-basic-shape-binding-display-geojson-shapes)
  - [Step 2 Data-Driven Visualization Bind External Data to Shapes](#step-2-data-driven-visualization-bind-external-data-to-shapes)
  - [Step 3 Module-Based Application Non-Standalone Components](#step-3-module-based-application-non-standalone-components)
  - [Matching GeoJSON Properties](#matching-geojson-properties)
- [Complete Working Example End-to-End](#complete-working-example-end-to-end)
  - [File Structure](#file-structure)
  - [1 Create world-mapts GeoJSON Data File](#1-create-world-mapts-geojson-data-file)
  - [2 Create mapscomponentts Component with Data Binding](#2-create-mapscomponentts-component-with-data-binding)
  - [3 Update appcomponentts](#3-update-appcomponentts)
- [Running the Application](#running-the-application)
  - [Development Server](#development-server)
  - [Build for Production](#build-for-production)
- [Troubleshooting](#troubleshooting)
  - [Issue Maps Not Displaying Shapes Not Appearing](#issue-maps-not-displaying-shapes-not-appearing)
  - [Issue Data Not Binding to Shapes Colors Not Applied](#issue-data-not-binding-to-shapes-colors-not-applied)
  - [Issue Module Not Found Error](#issue-module-not-found-error)
  - [Issue Services Not Injected Features Not Working](#issue-services-not-injected-features-not-working)
  - [Debugging Tips](#debugging-tips)
  - [Issue Feature Not Working Markers Tooltips etc](#issue-feature-not-working-markers-tooltips-etc)
  - [Issue Compatibility Warnings with Older Angular](#issue-compatibility-warnings-with-older-angular)
  - [Issue GeoJSON Not Loading](#issue-geojson-not-loading)
  - [Issue Performance Issues with Large Maps](#issue-performance-issues-with-large-maps)
- [Next Steps](#next-steps)
- [Complete Working Example](#complete-working-example)
- [API Reference Summary](#api-reference-summary)
  - [Core Setup APIs](#core-setup-apis)
  - [Essential Events](#essential-events)

## Dependencies

The Syncfusion Angular Maps component has the following dependency structure:

```text
|-- @syncfusion/ej2-angular-maps
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-maps
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-svg-base
    |-- @syncfusion/ej2-data
```

All dependencies are automatically installed when you install the main package.

## When to Use This Skill

Use this skill when you need to:

- **Set up Angular Maps** — Install and configure Syncfusion Maps in Angular projects
- **Install packages** — Add required npm packages
- **Configure modules** — Import `MapsModule` in Angular modules
- **Initialize maps** — Create the first working Maps component
- **Configure data binding** — Bind data to Maps shapes
- **Configure map layers** — Define layers, shape data, color mapping, labels, legends, tooltips, markers, and bubbles

## Installation

Install the Syncfusion Angular Maps component via npm:

```bash
npm install @syncfusion/ej2-angular-maps
```

## Adding Maps Component

### Step 1 Import MapsModule

For standalone components:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `<ejs-maps id="maps-container"></ejs-maps>`
})
export class AppComponent { }
```

For module-based applications:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MapsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 2 Add Basic Maps Template

Modify your component template to include the Maps element:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id="maps-container">
      <e-layers>
        <e-layer></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent { }
```

## Module Injection

Angular Maps features are modular and require service injection to enable them. This reduces bundle size by loading only the required map layers, markers, bubbles, data labels, navigation lines, legends, annotations, tooltip, selection, highlight, zooming, print, and export features.

Only inject services for the features you actually use.

### Inject Services

```typescript
import { Component } from '@angular/core';
import {
  MapsModule,
  LegendService,
  DataLabelService,
  MapsTooltipService,
  MarkerService,
  BubbleService,
  NavigationLineService,
  ZoomService,
  SelectionService,
  HighlightService,
  MapsAnnotationService,
  PrintService,
  PdfExportService,
  ImageExportService
} from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [
    LegendService,
    DataLabelService,
    MapsTooltipService,
    MarkerService,
    BubbleService,
    NavigationLineService,
    ZoomService,
    SelectionService,
    HighlightService,
    MapsAnnotationService,
    PrintService,
    PdfExportService,
    ImageExportService
  ],
  template: `
    <ejs-maps
      id="maps-container"
      [titleSettings]="titleSettings"
      [legendSettings]="legendSettings"
      [zoomSettings]="zoomSettings">
      <e-layers>
        <e-layer
          [shapeData]="shapeData"
          [shapeSettings]="shapeSettings"
          [dataLabelSettings]="dataLabelSettings"
          [tooltipSettings]="tooltipSettings"
          [markerSettings]="markerSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: Object = {};

  public titleSettings: Object = {
    text: 'World Map'
  };

  public legendSettings: Object = {
    visible: true
  };

  public zoomSettings: Object = {
    enable: true
  };

  public shapeSettings: Object = {
    fill: '#E5E5E5'
  };

  public dataLabelSettings: Object = {
    visible: true,
    labelPath: 'name'
  };

  public tooltipSettings: Object = {
    visible: true,
    valuePath: 'name'
  };

  public markerSettings: Object[] = [
    {
      visible: true,
      dataSource: [
        { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' }
      ],
      latitudeValuePath: 'latitude',
      longitudeValuePath: 'longitude',
      tooltipSettings: {
        visible: true,
        valuePath: 'name'
      }
    }
  ];
}
```

### Layer Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `DataLabelService` | Enable data labels for map shapes | `@syncfusion/ej2-angular-maps` |
| `MapsTooltipService` | Enable tooltip support for shapes, markers, and bubbles | `@syncfusion/ej2-angular-maps` |
| `LegendService` | Enable legend support for map layers, markers, and bubbles | `@syncfusion/ej2-angular-maps` |

### Marker and Bubble Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `MarkerService` | Enable markers for specific geographic locations | `@syncfusion/ej2-angular-maps` |
| `BubbleService` | Enable bubbles to represent data values on map shapes | `@syncfusion/ej2-angular-maps` |

### Navigation Line Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `NavigationLineService` | Enable navigation lines to display paths between geographic locations | `@syncfusion/ej2-angular-maps` |

### User Interaction Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `ZoomService` | Enable zooming and panning in Maps | `@syncfusion/ej2-angular-maps` |
| `SelectionService` | Enable map shape selection | `@syncfusion/ej2-angular-maps` |
| `HighlightService` | Enable map shape highlighting | `@syncfusion/ej2-angular-maps` |
| `MapsTooltipService` | Enable tooltip interaction for map elements | `@syncfusion/ej2-angular-maps` |

### Annotation Service

| Service | Purpose | Import package |
|---------|---------|----------------|
| `MapsAnnotationService` | Enable annotations in Maps | `@syncfusion/ej2-angular-maps` |

### Print and Export Services

| Service | Purpose | Import package |
|---------|---------|----------------|
| `PrintService` | Enable Maps print support | `@syncfusion/ej2-angular-maps` |
| `PdfExportService` | Enable Maps PDF export support | `@syncfusion/ej2-angular-maps` |
| `ImageExportService` | Enable Maps image export support such as PNG, JPEG, and SVG | `@syncfusion/ej2-angular-maps` |

### Example Full Maps Service Injection

```typescript
import { Component } from '@angular/core';
import {
  MapsModule,
  LegendService,
  DataLabelService,
  MapsTooltipService,
  MarkerService,
  BubbleService,
  NavigationLineService,
  ZoomService,
  SelectionService,
  HighlightService,
  MapsAnnotationService,
  PrintService,
  PdfExportService,
  ImageExportService
} from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [
    LegendService,
    DataLabelService,
    MapsTooltipService,
    MarkerService,
    BubbleService,
    NavigationLineService,
    ZoomService,
    SelectionService,
    HighlightService,
    MapsAnnotationService,
    PrintService,
    PdfExportService,
    ImageExportService
  ],
  template: `
    <ejs-maps
      id="maps-container"
      [titleSettings]="titleSettings"
      [legendSettings]="legendSettings"
      [zoomSettings]="zoomSettings"
      [annotations]="annotations">
      <e-layers>
        <e-layer
          [shapeData]="shapeData"
          [shapeSettings]="shapeSettings"
          [dataLabelSettings]="dataLabelSettings"
          [tooltipSettings]="tooltipSettings"
          [markerSettings]="markerSettings"
          [bubbleSettings]="bubbleSettings"
          [navigationLineSettings]="navigationLineSettings"
          [selectionSettings]="selectionSettings"
          [highlightSettings]="highlightSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: Object = {};

  public titleSettings: Object = {
    text: 'Sales by Region'
  };

  public legendSettings: Object = {
    visible: true
  };

  public zoomSettings: Object = {
    enable: true,
    toolbarSettings: {
      visible: true
    }
  };

  public annotations: Object[] = [
    {
      content: '<div>Map Annotation</div>',
      x: '50%',
      y: '10%'
    }
  ];

  public shapeSettings: Object = {
    fill: '#E5E5E5',
    colorValuePath: 'value'
  };

  public dataLabelSettings: Object = {
    visible: true,
    labelPath: 'name'
  };

  public tooltipSettings: Object = {
    visible: true,
    valuePath: 'name'
  };

  public markerSettings: Object[] = [
    {
      visible: true,
      dataSource: [
        { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' }
      ],
      latitudeValuePath: 'latitude',
      longitudeValuePath: 'longitude',
      tooltipSettings: {
        visible: true,
        valuePath: 'name'
      }
    }
  ];

  public bubbleSettings: Object[] = [
    {
      visible: true,
      valuePath: 'value',
      colorValuePath: 'value',
      minRadius: 10,
      maxRadius: 20
    }
  ];

  public navigationLineSettings: Object[] = [
    {
      visible: true,
      latitude: [13.0827, 28.6139],
      longitude: [80.2707, 77.2090],
      color: '#000000',
      width: 2
    }
  ];

  public selectionSettings: Object = {
    enable: true
  };

  public highlightSettings: Object = {
    enable: true
  };
}
```

## Interfaces

Angular Maps provides TypeScript interfaces to strongly type map configuration, layers, shape settings, markers, bubbles, navigation lines, data labels, legends, annotations, zooming, selection, highlight, tooltips, margins, borders, titles, and event arguments.

### Maps Configuration Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `MapsModel` | Defines the complete configuration model for the Maps component | `@syncfusion/ej2-angular-maps` |
| `MapsAreaSettingsModel` | Defines customization options for the area around the map | `@syncfusion/ej2-angular-maps` |
| `BorderModel` | Defines border color and width settings | `@syncfusion/ej2-angular-maps` |
| `MarginModel` | Defines margin settings for the Maps component | `@syncfusion/ej2-angular-maps` |
| `CenterPositionModel` | Defines the center latitude and longitude position of the map | `@syncfusion/ej2-angular-maps` |
| `TitleSettingsModel` | Defines map title settings | `@syncfusion/ej2-angular-maps` |
| `SubTitleSettingsModel` | Defines map subtitle settings | `@syncfusion/ej2-angular-maps` |
| `FontModel` | Defines font style, size, color, weight, opacity, and family settings | `@syncfusion/ej2-angular-maps` |

### Layer Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `LayerSettingsModel` | Defines map layer configuration such as shape data, data source, markers, bubbles, data labels, navigation lines, selection, highlight, and tooltip settings | `@syncfusion/ej2-angular-maps` |
| `ShapeSettingsModel` | Defines shape appearance settings such as fill, border, color mapping, and value path | `@syncfusion/ej2-angular-maps` |
| `ColorMappingSettingsModel` | Defines color mapping settings for map shapes | `@syncfusion/ej2-angular-maps` |
| `ToggleLegendSettingsModel` | Defines toggle behavior for map legend selection | `@syncfusion/ej2-angular-maps` |
| `InitialShapeSelectionSettingsModel` | Defines initially selected map shapes | `@syncfusion/ej2-angular-maps` |
| `PolygonSettingsModel` | Defines polygon shape settings for map layers | `@syncfusion/ej2-angular-maps` |

### Data Label Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `DataLabelSettingsModel` | Defines data label settings for map shapes | `@syncfusion/ej2-angular-maps` |
| `SmartLabelMode` | Defines smart label behavior for map labels | `@syncfusion/ej2-angular-maps` |
| `IntersectAction` | Defines label intersection behavior | `@syncfusion/ej2-angular-maps` |

### Marker Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `MarkerSettingsModel` | Defines marker settings such as data source, latitude, longitude, shape, template, and tooltip | `@syncfusion/ej2-angular-maps` |
| `MarkerClusterSettingsModel` | Defines marker cluster settings | `@syncfusion/ej2-angular-maps` |
| `MarkerClusterData` | Defines marker cluster data information | `@syncfusion/ej2-angular-maps` |

### Bubble Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `BubbleSettingsModel` | Defines bubble settings such as value path, color value path, min radius, max radius, opacity, and tooltip | `@syncfusion/ej2-angular-maps` |
| `BubbleData` | Defines bubble data information | `@syncfusion/ej2-angular-maps` |

### Navigation Line Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `NavigationLineSettingsModel` | Defines navigation line settings such as latitude, longitude, color, width, angle, and dash array | `@syncfusion/ej2-angular-maps` |
| `ArrowModel` | Defines arrow settings for navigation lines | `@syncfusion/ej2-angular-maps` |

### Tooltip Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `TooltipSettingsModel` | Defines tooltip settings for shapes, markers, and bubbles | `@syncfusion/ej2-angular-maps` |
| `TooltipBorderModel` | Defines tooltip border settings | `@syncfusion/ej2-angular-maps` |

### Legend Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `LegendSettingsModel` | Defines legend settings for map layers, markers, and bubbles | `@syncfusion/ej2-angular-maps` |
| `LegendTitleSettingsModel` | Defines legend title settings | `@syncfusion/ej2-angular-maps` |
| `LegendLocationModel` | Defines legend location settings | `@syncfusion/ej2-angular-maps` |

### Selection and Highlight Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `SelectionSettingsModel` | Defines selection settings for map shapes | `@syncfusion/ej2-angular-maps` |
| `HighlightSettingsModel` | Defines highlight settings for map shapes | `@syncfusion/ej2-angular-maps` |

### Zoom Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ZoomSettingsModel` | Defines zooming and panning behavior for Maps | `@syncfusion/ej2-angular-maps` |
| `ToolbarSettingsModel` | Defines zoom toolbar settings | `@syncfusion/ej2-angular-maps` |
| `ZoomToolbarButtonSettingsModel` | Defines zoom toolbar button customization settings | `@syncfusion/ej2-angular-maps` |
| `ZoomToolbarTooltipSettingsModel` | Defines zoom toolbar tooltip settings | `@syncfusion/ej2-angular-maps` |

### Annotation Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `AnnotationModel` | Defines annotation settings for Maps | `@syncfusion/ej2-angular-maps` |
| `MapsAnnotationModel` | Defines map annotation configuration | `@syncfusion/ej2-angular-maps` |

### Tile Map and Ajax Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `MapAjaxModel` | Defines Ajax settings for loading map data | `@syncfusion/ej2-angular-maps` |
| `OSM` | Defines OpenStreetMap tile provider support | `@syncfusion/ej2-angular-maps` |
| `BingMap` | Defines Bing Maps tile provider support | `@syncfusion/ej2-angular-maps` |

### Maps Lifecycle Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ILoadEventArgs` | Defines event arguments before Maps loading | `@syncfusion/ej2-angular-maps` |
| `ILoadedEventArgs` | Defines event arguments after Maps rendering is completed | `@syncfusion/ej2-angular-maps` |
| `IResizeEventArgs` | Defines event arguments after Maps resize | `@syncfusion/ej2-angular-maps` |
| `IAnimationCompleteEventArgs` | Defines event arguments after map animation is completed | `@syncfusion/ej2-angular-maps` |

### Maps Shape Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IShapeRenderingEventArgs` | Defines event arguments used while rendering map shapes | `@syncfusion/ej2-angular-maps` |
| `IShapeSelectedEventArgs` | Defines event arguments when a map shape is selected | `@syncfusion/ej2-angular-maps` |
| `IShapeHighlightEventArgs` | Defines event arguments when a map shape is highlighted | `@syncfusion/ej2-angular-maps` |
| `IShapeSelectionCompleteEventArgs` | Defines event arguments after map shape selection is completed | `@syncfusion/ej2-angular-maps` |

### Maps Marker Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IMarkerRenderingEventArgs` | Defines event arguments used while rendering map markers | `@syncfusion/ej2-angular-maps` |
| `IMarkerClickEventArgs` | Defines event arguments for marker click events | `@syncfusion/ej2-angular-maps` |
| `IMarkerMoveEventArgs` | Defines event arguments for marker mouse move events | `@syncfusion/ej2-angular-maps` |
| `IMarkerClusterRenderingEventArgs` | Defines event arguments used while rendering marker clusters | `@syncfusion/ej2-angular-maps` |
| `IMarkerClusterClickEventArgs` | Defines event arguments for marker cluster click events | `@syncfusion/ej2-angular-maps` |
| `IMarkerClusterMoveEventArgs` | Defines event arguments for marker cluster mouse move events | `@syncfusion/ej2-angular-maps` |

### Maps Bubble Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IBubbleRenderingEventArgs` | Defines event arguments used while rendering map bubbles | `@syncfusion/ej2-angular-maps` |
| `IBubbleClickEventArgs` | Defines event arguments for bubble click events | `@syncfusion/ej2-angular-maps` |
| `IBubbleMoveEventArgs` | Defines event arguments for bubble mouse move events | `@syncfusion/ej2-angular-maps` |

### Maps Navigation Line Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `INavigationLineRenderingEventArgs` | Defines event arguments used while rendering navigation lines | `@syncfusion/ej2-angular-maps` |

### Maps Tooltip and Legend Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `ITooltipRenderEventArgs` | Defines event arguments used while rendering Maps tooltip | `@syncfusion/ej2-angular-maps` |
| `ILegendRenderingEventArgs` | Defines event arguments used while rendering Maps legend | `@syncfusion/ej2-angular-maps` |

### Maps Annotation Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IAnnotationRenderingEventArgs` | Defines event arguments used while rendering Maps annotations | `@syncfusion/ej2-angular-maps` |

### Maps Zoom and Pan Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IZoomEventArgs` | Defines event arguments for map zoom events | `@syncfusion/ej2-angular-maps` |
| `IMapPanEventArgs` | Defines event arguments for map pan events | `@syncfusion/ej2-angular-maps` |

### Maps Mouse Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IClickEventArgs` | Defines event arguments for Maps click events | `@syncfusion/ej2-angular-maps` |
| `IMouseMoveEventArgs` | Defines event arguments for Maps mouse move events | `@syncfusion/ej2-angular-maps` |
| `IDoubleClickEventArgs` | Defines event arguments for Maps double-click events | `@syncfusion/ej2-angular-maps` |
| `IRightClickEventArgs` | Defines event arguments for Maps right-click events | `@syncfusion/ej2-angular-maps` |

### Print and Export Event Interfaces

| Interface | Purpose | Import package |
|-----------|---------|----------------|
| `IPrintEventArgs` | Defines event arguments for Maps print events | `@syncfusion/ej2-angular-maps` |
| `IExportEventArgs` | Defines event arguments for Maps export events | `@syncfusion/ej2-angular-maps` |

### Example Importing Interfaces

```typescript
import {
  MapsModel,
  LayerSettingsModel,
  ShapeSettingsModel,
  DataLabelSettingsModel,
  MarkerSettingsModel,
  BubbleSettingsModel,
  NavigationLineSettingsModel,
  LegendSettingsModel,
  TooltipSettingsModel,
  ZoomSettingsModel,
  SelectionSettingsModel,
  HighlightSettingsModel,
  AnnotationModel,
  MapsAreaSettingsModel,
  BorderModel,
  MarginModel,
  TitleSettingsModel,
  FontModel,
  CenterPositionModel,
  ColorMappingSettingsModel,
  InitialShapeSelectionSettingsModel,
  MarkerClusterSettingsModel,
  ToggleLegendSettingsModel,
  PolygonSettingsModel,
  MapAjaxModel,
  ILoadEventArgs,
  ILoadedEventArgs,
  IResizeEventArgs,
  IAnimationCompleteEventArgs,
  IShapeRenderingEventArgs,
  IShapeSelectedEventArgs,
  IMarkerRenderingEventArgs,
  IMarkerClickEventArgs,
  IBubbleRenderingEventArgs,
  INavigationLineRenderingEventArgs,
  ITooltipRenderEventArgs,
  ILegendRenderingEventArgs,
  IAnnotationRenderingEventArgs,
  IZoomEventArgs,
  IMapPanEventArgs,
  IClickEventArgs,
  IMouseMoveEventArgs,
  IPrintEventArgs,
  IExportEventArgs
} from '@syncfusion/ej2-angular-maps';

const border: BorderModel = {
  color: '#000000',
  width: 1
};

const margin: MarginModel = {
  left: 10,
  right: 10,
  top: 10,
  bottom: 10
};

const titleStyle: FontModel = {
  size: '16px',
  fontWeight: '600'
};

const titleSettings: TitleSettingsModel = {
  text: 'Sales by Region',
  textStyle: titleStyle
};

const centerPosition: CenterPositionModel = {
  latitude: 20.5937,
  longitude: 78.9629
};

const mapsArea: MapsAreaSettingsModel = {
  background: '#FFFFFF',
  border
};

const colorMapping: ColorMappingSettingsModel = {
  from: 0,
  to: 100,
  color: '#D6EAF8',
  label: 'Low'
};

const shapeSettings: ShapeSettingsModel = {
  fill: '#E5E5E5',
  colorValuePath: 'value',
  colorMapping: [colorMapping]
};

const dataLabelSettings: DataLabelSettingsModel = {
  visible: true,
  labelPath: 'name'
};

const tooltipSettings: TooltipSettingsModel = {
  visible: true,
  valuePath: 'name'
};

const markerSettings: MarkerSettingsModel[] = [
  {
    visible: true,
    dataSource: [
      { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' }
    ],
    latitudeValuePath: 'latitude',
    longitudeValuePath: 'longitude',
    tooltipSettings
  }
];

const bubbleSettings: BubbleSettingsModel[] = [
  {
    visible: true,
    valuePath: 'value',
    colorValuePath: 'value',
    minRadius: 10,
    maxRadius: 20,
    tooltipSettings
  }
];

const navigationLineSettings: NavigationLineSettingsModel[] = [
  {
    visible: true,
    latitude: [13.0827, 28.6139],
    longitude: [80.2707, 77.2090],
    color: '#000000',
    width: 2
  }
];

const selectionSettings: SelectionSettingsModel = {
  enable: true
};

const highlightSettings: HighlightSettingsModel = {
  enable: true
};

const initialShapeSelection: InitialShapeSelectionSettingsModel = {
  shapePath: 'name',
  shapeValue: 'India'
};

const markerClusterSettings: MarkerClusterSettingsModel = {
  allowClustering: true
};

const toggleLegendSettings: ToggleLegendSettingsModel = {
  enable: true
};

const polygonSettings: PolygonSettingsModel = {
  visible: true
};

const layer: LayerSettingsModel = {
  shapeData: {},
  shapeSettings,
  dataLabelSettings,
  tooltipSettings,
  markerSettings,
  bubbleSettings,
  navigationLineSettings,
  selectionSettings,
  highlightSettings,
  initialShapeSelection: [initialShapeSelection],
  markerClusterSettings,
  toggleLegendSettings,
  polygonSettings
};

const legendSettings: LegendSettingsModel = {
  visible: true
};

const zoomSettings: ZoomSettingsModel = {
  enable: true,
  toolbarSettings: {
    visible: true
  }
};

const annotation: AnnotationModel = {
  content: '<div>Map Annotation</div>',
  x: '50%',
  y: '10%'
};

const ajaxSettings: MapAjaxModel = {
  url: 'map-data.json'
};

const mapsOptions: MapsModel = {
  titleSettings,
  margin,
  mapsArea,
  centerPosition,
  legendSettings,
  zoomSettings,
  annotations: [annotation],
  layers: [layer]
};

const load = (args: ILoadEventArgs): void => {
  // Maps loading.
};

const loaded = (args: ILoadedEventArgs): void => {
  // Maps loaded.
};

const resized = (args: IResizeEventArgs): void => {
  // Maps resized.
};

const animationComplete = (args: IAnimationCompleteEventArgs): void => {
  // Maps animation completed.
};

const shapeRendering = (args: IShapeRenderingEventArgs): void => {
  // Map shape rendering.
};

const shapeSelected = (args: IShapeSelectedEventArgs): void => {
  // Map shape selected.
};

const markerRendering = (args: IMarkerRenderingEventArgs): void => {
  // Marker rendering.
};

const markerClick = (args: IMarkerClickEventArgs): void => {
  // Marker clicked.
};

const bubbleRendering = (args: IBubbleRenderingEventArgs): void => {
  // Bubble rendering.
};

const navigationLineRendering = (args: INavigationLineRenderingEventArgs): void => {
  // Navigation line rendering.
};

const tooltipRender = (args: ITooltipRenderEventArgs): void => {
  // Tooltip rendering.
};

const legendRendering = (args: ILegendRenderingEventArgs): void => {
  // Legend rendering.
};

const annotationRendering = (args: IAnnotationRenderingEventArgs): void => {
  // Annotation rendering.
};

const zoom = (args: IZoomEventArgs): void => {
  // Map zooming.
};

const pan = (args: IMapPanEventArgs): void => {
  // Map panning.
};

const click = (args: IClickEventArgs): void => {
  // Maps clicked.
};

const mouseMove = (args: IMouseMoveEventArgs): void => {
  // Maps mouse move.
};

const beforePrint = (args: IPrintEventArgs): void => {
  // Before Maps print.
};

const beforeExport = (args: IExportEventArgs): void => {
  // Before Maps export.
};
```

## Loading GeoJSON Shape Data

### Step 1 Check for User-Provided Input File

First, check whether the user has provided any GeoJSON input file.

- If the user provides a GeoJSON file, use that file as the map shape data.
- If the user does not provide any input file, use the default GeoJSON data as described below.

### Step 2 Import GeoJSON Data

The Maps component requires GeoJSON data to render map shapes.

For production applications or when you need the complete world map, you can reference map data directly from a URL.

```typescript
export const worldMapUrl = 'https://cdn.syncfusion.com/maps/map-data/world-map.json';
```

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { worldMapUrl } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id="maps">
      <e-layers>
        <e-layer
          shapeDataPath="name"
          shapePropertyPath="name"
          [shapeData]="shapeData">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: worldMapUrl
    }
  };
}
```

### Step 3 Bind Shape Data

Import and bind the GeoJSON data to the layer's `shapeData` property:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id="maps-container">
      <e-layers>
        <e-layer [shapeData]="shapeData"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };
}
```

## Binding Data Source

### Step 1 Basic Shape Binding Display GeoJSON Shapes

The simplest way to display map shapes is to bind GeoJSON data directly to a layer using the `shapeData` property:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id="maps-container">
      <e-layers>
        <e-layer [shapeData]="shapeData"></e-layer>
      </e-layers>
    </ejs-maps>
  `,
  styles: [`
    #maps-container {
      height: 500px;
      width: 100%;
    }
  `]
})
export class MapsComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };
}
```

**What Happens:**

- `shapeData` receives the GeoJSON FeatureCollection or remote map data settings.
- The layer automatically renders all shapes from the GeoJSON.
- Each shape is rendered from the GeoJSON features.

### Step 2 Data-Driven Visualization Bind External Data to Shapes

To color shapes based on external data, bind a `dataSource` and map values:

```typescript
import { Component } from '@angular/core';
import { MapsModule, LegendService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [MapsModule],
  providers: [LegendService],
  template: `
    <ejs-maps id="maps-container" [legendSettings]="legendSettings">
      <e-layers>
        <e-layer
          [shapeData]="shapeData"
          [dataSource]="dataSource"
          shapeDataPath="country"
          shapePropertyPath="name"
          [shapeSettings]="shapeSettings">
        </e-layer>
      </e-layers>
    </ejs-maps>
  `,
  styles: [`
    #maps-container {
      height: 500px;
      width: 100%;
    }
  `]
})
export class MapsComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };

  public dataSource: object[] = [
    { country: 'United States', population: 331002651, region: 'North America' },
    { country: 'Canada', population: 37742154, region: 'North America' },
    { country: 'Mexico', population: 128932753, region: 'North America' },
    { country: 'Brazil', population: 212559417, region: 'South America' },
    { country: 'Germany', population: 83783942, region: 'Europe' }
  ];

  public shapeSettings: object = {
    colorValuePath: 'region',
    colorMapping: [
      { value: 'North America', color: '#EDB46F' },
      { value: 'South America', color: '#F7DC6F' },
      { value: 'Europe', color: '#BB8FCE' }
    ]
  };

  public legendSettings: object = {
    visible: true,
    position: 'Bottom',
    title: { text: 'Regions' }
  };
}
```

**Key Properties for Data Binding:**

- `shapeData` - GeoJSON FeatureCollection containing shape geometries.
- `dataSource` - Array of data objects with custom values.
- `shapeDataPath` - Property in `dataSource` that identifies the shape.
- `shapePropertyPath` - Property in GeoJSON features that matches `shapeDataPath`.
- `colorValuePath` - Property in `dataSource` used for color mapping.
- `colorMapping` - Array mapping data values to colors.

### Step 3 Module-Based Application Non-Standalone Components

For traditional module-based Angular applications:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapsModule, LegendService, DataLabelService } from '@syncfusion/ej2-angular-maps';
import { MapsComponent } from './maps/maps.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, MapsComponent],
  imports: [BrowserModule, MapsModule],
  providers: [LegendService, DataLabelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };

  public dataSource: object[] = [];
}
```

```html
<ejs-maps id="maps-container">
  <e-layers>
    <e-layer [shapeData]="shapeData" [dataSource]="dataSource"></e-layer>
  </e-layers>
</ejs-maps>
```

### Matching GeoJSON Properties

The `shapePropertyPath` value must match a property in your GeoJSON features.

Example GeoJSON structure:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "admin": "Afghanistan",
        "name": "Afghanistan",
        "continent": "Asia"
      },
      "geometry": {}
    }
  ]
}
```

Valid configurations:

```typescript
shapePropertyPath: 'admin';
shapePropertyPath: 'name';
```

## Complete Working Example End-to-End

Here's a complete, copy-paste-ready example that shows the entire setup.

### File Structure

```text
src/
├── app/
│   ├── maps.component.ts
│   └── world-map.ts
└── app.component.ts
```

### 1 Create world-mapts GeoJSON Data File

```typescript
export let world_map: object = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { admin: 'Afghanistan', name: 'Afghanistan' },
      geometry: { type: 'Polygon', coordinates: [] }
    }
  ]
};
```

### 2 Create mapscomponentts Component with Data Binding

```typescript
import { Component } from '@angular/core';
import { MapsModule, LegendService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [MapsModule],
  providers: [LegendService],
  template: `
    <div style="width: 100%; height: 100%;">
      <h2>World Map with GeoJSON Data</h2>
      <ejs-maps id="world-map" [legendSettings]="legendSettings">
        <e-layers>
          <e-layer
            [shapeData]="shapeData"
            [dataSource]="dataSource"
            shapeDataPath="country"
            shapePropertyPath="admin"
            [shapeSettings]="shapeSettings">
          </e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `,
  styles: [`
    #world-map {
      height: 600px;
      width: 100%;
    }

    h2 {
      margin: 20px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class MapsComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };

  public dataSource: object[] = [
    { country: 'Afghanistan', status: 'Active', percentage: 45 },
    { country: 'Australia', status: 'Inactive', percentage: 28 },
    { country: 'Brazil', status: 'Active', percentage: 62 },
    { country: 'Germany', status: 'Active', percentage: 71 },
    { country: 'United States', status: 'Active', percentage: 85 }
  ];

  public shapeSettings: object = {
    colorValuePath: 'status',
    colorMapping: [
      { value: 'Active', color: '#4CAF50' },
      { value: 'Inactive', color: '#FFC107' }
    ]
  };

  public legendSettings: object = {
    visible: true,
    position: 'Bottom',
    title: { text: 'Status' }
  };
}
```

### 3 Update appcomponentts

```typescript
import { Component } from '@angular/core';
import { MapsComponent } from './maps.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsComponent],
  template: `<app-maps></app-maps>`
})
export class AppComponent { }
```

## Running the Application

### Development Server

Start the Angular development server:

```bash
npm start
```

Or:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

### Build for Production

Create an optimized production build:

```bash
ng build --configuration production
```

The build artifacts will be in the `dist/` directory.

## Troubleshooting

### Issue Maps Not Displaying Shapes Not Appearing

**Symptoms:** Blank screen or empty map container.

**Root Causes and Solutions:**

1. GeoJSON data is not imported or loaded correctly.
2. Container has no height.
3. `shapeData` binding is missing.
4. `shapePropertyPath` does not match the GeoJSON property.

```typescript
styles: [`#maps-container { height: 500px; width: 100%; }`]
```

```html
<e-layer [shapeData]="shapeData"></e-layer>
```

### Issue Data Not Binding to Shapes Colors Not Applied

**Symptoms:** Shapes appear but expected colors from `dataSource` are not applied.

**Root Causes and Solutions:**

1. Shape property name mismatch.
2. Missing `colorMapping`.
3. `colorValuePath` points to a non-existent field.

```typescript
public shapeSettings: object = {
  colorValuePath: 'status',
  colorMapping: [
    { value: 'Active', color: '#4CAF50' },
    { value: 'Inactive', color: '#FFC107' }
  ]
};
```

### Issue Module Not Found Error

**Symptoms:** `Cannot find module '@syncfusion/ej2-angular-maps'` or `MapsModule not defined`.

**Solutions:**

```bash
npm install @syncfusion/ej2-angular-maps --save
```

If needed, clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

For module-based apps, ensure `MapsModule` is imported.

### Issue Services Not Injected Features Not Working

**Symptoms:** Legends, tooltips, markers, bubbles, zooming, or data labels do not appear.

Inject the required services in `providers`:

```typescript
@Component({
  providers: [
    LegendService,
    DataLabelService,
    MapsTooltipService,
    ZoomService,
    SelectionService
  ]
})
export class MapsComponent { }
```

### Debugging Tips

1. Check the browser console for errors.
2. Verify GeoJSON format.
3. Log component data in the template or component class.
4. Inspect GeoJSON structure to find correct property paths.

```typescript
console.log('GeoJSON structure:', world_map);
console.log('First feature:', (world_map as any).features[0]);
console.log('First feature properties:', (world_map as any).features[0].properties);
```

### Issue Feature Not Working Markers Tooltips etc

**Symptoms:** Markers or tooltips do not appear despite configuration.

**Solutions:**

1. Inject the required service.
2. Set `visible: true` in the corresponding feature settings.

```typescript
providers: [MarkerService, MapsTooltipService]
```

### Issue Compatibility Warnings with Older Angular

For Angular versions older than 12, use the ngcc package:

```bash
npm install @syncfusion/ej2-angular-maps@ngcc --save
```

### Issue GeoJSON Not Loading

**Solutions:**

1. Verify GeoJSON structure.
2. Check file path.
3. Validate JSON syntax.
4. Export the data as an object type.

### Issue Performance Issues with Large Maps

**Solutions:**

1. Use simplified or lower-resolution shape data.
2. Only inject services you need.
3. Optimize the `dataSource` array size.
4. Avoid excessive markers or annotations.

## Next Steps

Now that you have a basic map running, explore these topics:

1. **Layers and Data Binding** - Learn about multiple layers, sublayers, and data binding patterns.
2. **Markers** - Add location markers with custom shapes and templates.
3. **User Interactions** - Enable zoom, pan, tooltips, and selection.
4. **Data Visualization** - Add bubbles, legends, and color mapping.
5. **Customization** - Theme and style your maps.

## Complete Working Example

Here's a complete, copy-paste-ready example:

```typescript
import { Component } from '@angular/core';
import {
  MapsModule,
  LegendService,
  DataLabelService,
  MapsTooltipService
} from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [LegendService, DataLabelService, MapsTooltipService],
  template: `
    <div style="padding: 20px;">
      <h1>World Population Map</h1>
      <ejs-maps
        id="maps-container"
        [titleSettings]="titleSettings"
        [legendSettings]="legendSettings">
        <e-layers>
          <e-layer
            [shapeData]="shapeData"
            [dataSource]="dataSource"
            shapeDataPath="country"
            shapePropertyPath="name"
            [shapeSettings]="shapeSettings"
            [dataLabelSettings]="dataLabelSettings"
            [tooltipSettings]="tooltipSettings">
          </e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `,
  styles: [`
    #maps-container {
      height: 500px;
      width: 100%;
    }
  `]
})
export class AppComponent {
  public shapeData: object = {
    dataOptions: {
      type: 'GET',
      url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json'
    }
  };

  public dataSource: object[] = [
    { country: 'United States', population: 331002651, density: '36/km²' },
    { country: 'India', population: 1380004385, density: '464/km²' },
    { country: 'China', population: 1439323776, density: '153/km²' },
    { country: 'Brazil', population: 212559417, density: '25/km²' }
  ];

  public titleSettings: object = {
    text: 'World Population by Country',
    textStyle: { size: '16px', fontWeight: 'bold' }
  };

  public shapeSettings: object = {
    colorValuePath: 'population',
    colorMapping: [
      { from: 0, to: 100000000, color: '#C5E8B7', label: '< 100M' },
      { from: 100000001, to: 500000000, color: '#5BC85A', label: '100M - 500M' },
      { from: 500000001, to: 2000000000, color: '#238B45', label: '> 500M' }
    ]
  };

  public legendSettings: object = {
    visible: true,
    position: 'Bottom'
  };

  public dataLabelSettings: object = {
    visible: true,
    labelPath: 'country',
    smartLabelMode: 'Trim'
  };

  public tooltipSettings: object = {
    visible: true,
    valuePath: 'country',
    format: '${country}<br>Population: ${population}<br>Density: ${density}'
  };
}
```

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
```

This complete example demonstrates:

- Installation and setup
- Module and service injection
- GeoJSON data binding
- External data source
- Color mapping based on population
- Legend, data labels, and tooltips
- Title and styling

## API Reference Summary

### Core Setup APIs

| API | Description | Documentation Link |
|-----|-------------|--------------------|
| `MapsComponent` | Main maps component | [MapsComponent](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent) |
| `LayerSettings` | Layer configuration | [LayerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings) |
| `shapeData` | GeoJSON shape data | [shapeData](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedata) |
| `dataSource` | External data binding | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#datasource) |
| `shapeDataPath` | Data matching field | [shapeDataPath](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedatapath) |
| `shapePropertyPath` | GeoJSON matching property | [shapePropertyPath](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapepropertypath) |
| `width` | Map width | [width](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#width) |
| `height` | Map height | [height](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#height) |
| `theme` | Built-in theme | [theme](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#theme) |

### Essential Events

| Event | Description | Documentation Link |
|-------|-------------|--------------------|
| `load` | Fires before map loads | [load](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#load) |
| `loaded` | Fires after map loads | [loaded](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#loaded) |

For complete API documentation, see [api-reference.md](references/api-reference.md).
