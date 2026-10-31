# Getting Started with Linear Gauge

This guide will help you install, import, and create your first Linear Gauge component in an Angular application.

## Table of Contents

- [Installation](#installation)
  - [Step 1: Install via NPM](#step-1-install-via-npm)
  - [Step 2: Register the Module](#step-2-register-the-module)
  - [Step 3: Add CSS Theme](#step-3-add-css-theme)
- [Creating Your First Gauge](#creating-your-first-gauge)
  - [Basic Example](#basic-example)
- [Component Structure](#component-structure)
  - [Container Properties](#container-properties)
  - [Axes Configuration](#axes-configuration)
- [Ranges](#ranges)
- [Pointers](#pointers)
- [Labels](#labels)
- [Complete Working Example](#complete-working-example)


## Installation

### Step 1: Install via NPM

```bash
npm install @syncfusion/ej2-angular-lineargauge
```

### Step 2: Register the Module

In your `app.module.ts`, import and register the Linear Gauge module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LinearGaugeAllModule } from '@syncfusion/ej2-angular-lineargauge';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LinearGaugeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Creating Your First Gauge

### Basic Example

Create a simple horizontal gauge with a single range and pointer:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-gauge',
  template: `
    <ejs-lineargauge>
      <e-axes>
        <e-axis [minimum]="0" [maximum]="100">
          <e-ranges>
            <e-range [start]="0" [end]="30" [color]="'red'"></e-range>
            <e-range [start]="30" [end]="70" [color]="'yellow'"></e-range>
            <e-range [start]="70" [end]="100" [color]="'green'"></e-range>
          </e-ranges>
          <e-pointers>
            <e-pointer [value]="45"></e-pointer>
          </e-pointers>
        </e-axis>
      </e-axes>
    </ejs-lineargauge>
  `,
  styles: [`
    ::ng-deep .e-gauge {
      display: flex;
      justify-content: center;
    }
  `]
})
export class GaugeComponent { }
```

## Component Structure

### Container Properties

The gauge is contained within a configurable container:

```typescript
<ejs-lineargauge [container]="containerConfig">
  ...
</ejs-lineargauge>

// In component class:
containerConfig = {
  width: '100',      // Container width (pixel)
  height: '150px',    // Container height in pixels
  type: 'Normal',      // 'Normal' or 'RoundedRectangle'
  backgroundColor: 'yellow',
  offset: 5,
  roundedCornerRadius: 5,
  border: {
    color: '#ddd',
    width: 2
  }
};
```

### Axes Configuration

Each gauge contains axes that define the scale:

```typescript
<e-axes>
  <e-axis [minimum]="0" 
          [maximum]="100" 
          [opposedPosition]="false">
    <!-- Ranges, pointers, annotations, labels -->
  </e-axis>
</e-axes>
```

**Common axis properties:**
- `minimum`: Scale start value (default: 0)
- `maximum`: Scale end value (default: 100)
- `opposedPosition`: Place axis on opposite side (boolean)
- `isInversed`: Enables or disables the inversed axis.
- `labelStyle`: Sets and gets the options for customizing the appearance of the label in axis.
- `line`: Sets and gets the options for customizing the appearance of the axis line.
- `majorTicks`: Sets and gets the options for customizing the major tick lines.
- `minorTicks`: Sets and gets the options for customizing the minor tick lines.
- `pointers`: Sets and gets the options for customizing the pointers of an axis.
- `ranges`: Sets and gets the options for customizing the ranges of an axis.
- `showLastLabel`: Shows or hides the last label in the axis of the linear gauge.

## Ranges

Ranges are colored regions that indicate different value zones:

```typescript
<e-ranges>
  <e-range 
    [start]="0" 
    [end]="30" 
    [color]="'#F6B53F'"
    [offset]="10"
    [startWidth]="15"
    [endWidth]="15">
  </e-range>
</e-ranges>
```

**Range properties:**
- `start`: Range start value
- `end`: Range end value
- `color`: CSS color or hex value
- `offset`: Distance from axis (pixels)
- `startWidth`: Width at range start
- `endWidth`: Width at range end
- `border`: Customize the style properties of the border for the axis range.
- `linearGradient`: Render a linear gradient for the range.
- `position`: Position to place the ranges in the axis.
- `radialGradient`: Render a radial gradient for the range.

## Pointers

Pointers display the current value on the scale:

```typescript
<e-pointers>
  <e-pointer 
    [value]="50" 
    [type]="'Bar'"
    [color]="'#0066cc'"
    [width]="15"
    [offset]="5">
  </e-pointer>
</e-pointers>
```

**Pointer properties:**
- `value`: Current value (between minimum and maximum)
- `type`: 'Bar' (rectangular) or 'Marker' (circular/image)
- `color`: Pointer color
- `width`: Pointer thickness
- `offset`: Distance from axis
- `animationDuration`: Sets and gets the duration of animation in pointer
- `border`: Sets and gets the options to customize the style properties of the border for pointers.
- `description`: Sets and gets the description for the pointer.
- `enableDrag`: Enables or disables the drag movement of pointer to update the pointer value.
- `height`: Sets and gets the height of the pointer.
- `imageUrl`: Sets and gets the URL path for the image in marker when the marker type is set as image.
- `linearGradient`: Sets and gets the properties to render a linear gradient for the pointer.
- `markerType`: Sets and gets the type of the marker for pointers in axis.
- `opacity`: Sets and gets the opacity of pointer in linear gauge.
- `placement`: Sets and gets the place of the pointer.
- `position`: Sets and gets the position of the pointer.
- `radialGradient`: Sets and gets the properties to render a radial gradient for the pointer.
- `roundedCornerRadius`: Sets and gets the corner radius for pointer.
- `text`: Specifies the text that will be displayed as the pointer in Linear Gauge. To display the text pointer, the markerType property must be set to Text.
- `textStyle`: Defines the font properties such as font-size, font family and others for the text pointer.
- `type`: Sets and gets the type of pointer in axis. There are two types of pointers: Marker and Bar.
- `value`: Sets and gets the value of the pointer in axis.
- `width`: Sets and gets the width of the pointer.

## Labels

Configure axis labels:

```typescript
<e-axis [labelStyle]="labelStyle">
  ...
</e-axis>

labelStyle = {
  font: {
    fontFamily: 'Arial',
    size: '12px',
    color: '#666'
  },
  format: '{value}°C',
  margin: { top: 5, bottom: 5 }
};
```

## Complete Working Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-gauge-demo',
  template: `
    <div class="gauge-container">
      <h2>System Health Monitor</h2>
      <ejs-lineargauge 
        [orientation]="'Horizontal'"
        [container]="{ width: '100', height: '200px' }">
        <e-axes>
          <e-axis [minimum]="0" [maximum]="100"
                  [labelStyle]="labelStyle"
                  [majorTicks]="{ interval: 20 }"
                  [minorTicks]="{ interval: 5 }">
            <e-ranges>
              <e-range [start]="0" [end]="40" [color]="'#27ae60'" ></e-range>
              <e-range [start]="40" [end]="70" [color]="'#f39c12'" ></e-range>
              <e-range [start]="70" [end]="100" [color]="'#e74c3c'" ></e-range>
            </e-ranges>
            <e-pointers>
              <e-pointer [value]="currentHealth" [type]="'Bar'" [width]="20" [color]="'#2c3e50'"></e-pointer>
            </e-pointers>
          </e-axis>
        </e-axes>
      </ejs-lineargauge>
    </div>
  `,
  styles: [`
    .gauge-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class GaugeDemoComponent {
  currentHealth = 65;
  labelStyle = {
    font: {
      fontFamily: 'Arial',
      size: '14px',
      color: '#333'
    },
    format: '{value}%'
  };
}
```
