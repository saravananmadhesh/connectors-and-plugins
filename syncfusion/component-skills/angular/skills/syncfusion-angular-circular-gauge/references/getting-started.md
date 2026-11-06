# Getting Started with Angular Circular Gauge

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Install Circular Gauge Package](#install-circular-gauge-package)
- [Module Setup](#module-setup)
  - [Import CircularGaugeModule](#import-circulargaugemodule)
  - [Add Required Services](#add-required-services)
  - [Update index.html](#update-indexhtml)
- [Basic Implementation](#basic-implementation)
  - [Minimal Gauge](#minimal-gauge)
  - [Gauge with Axes and Pointers](#gauge-with-axes-and-pointers)
- [Setting Pointer Values](#setting-pointer-values)
  - [Static Values (Template)](#static-values-template)
  - [Dynamic Values (Component)](#dynamic-values-component)
  - [Programmatic Update (ViewChild)](#programmatic-update-viewchild)
  - [Multiple Pointer Values](#multiple-pointer-values)
- [Import Styles](#import-styles)
  - [Syncfusion Styles](#syncfusion-styles)
  - [Tailwind Configuration (if using Tailwind)](#tailwind-configuration-if-using-tailwind)
- [Common Setup Issues](#common-setup-issues)
  - [Issue: "CircularGaugeModule not found"](#issue-circulargaugemodule-not-found)
  - [Issue: Gauge not rendering (blank container)](#issue-gauge-not-rendering-blank-container)
  - [Issue: "Cannot read property 'setPointerValue' of undefined"](#issue-cannot-read-property-setpointervalue-of-undefined)
  - [Issue: Styles not applying](#issue-styles-not-applying)

## When to Use This Skill

Use this skill when you need to:
- **Set up Angular CircularGauge** — Install and configure Syncfusion circulargauge in Angular projects
- **Install packages** — Add required npm packages
- **Configure modules** — Import CircularGaugeModule in Angular modules
- **Initialize circulargauge** — Create first working circulargauge component
- **Basic column setup** — Define and configure columns

## Installation

Install Syncfusion Angular Grid component via npm:

```bash
npm install @syncfusion/ej2-angular-circulargauge
```

## Module Setup

### Import CircularGaugeModule

Register the module in your Angular component:

```typescript
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  imports: [CircularGaugeModule],
  standalone: true,
  selector: 'app-gauge',
  template: `<ejs-circulargauge id='circular-container'></ejs-circulargauge>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

**Key points:**
- Use `imports` array for standalone components
- `ViewEncapsulation.None` allows CSS to apply to nested elements

### Add Required Services

If using advanced features (tooltips, annotations), inject the corresponding service:

```typescript
import { GaugeTooltipService } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  imports: [CircularGaugeModule],
  providers: [GaugeTooltipService],  // ← Add service provider
  standalone: true,
  selector: 'app-gauge',
  template: `<ejs-circulargauge id='circular-container'></ejs-circulargauge>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

**Common services:**
- `GaugeTooltipService` - For tooltip functionality
- `AnnotationsService` - For custom annotations

### Update index.html

Ensure the app root element exists:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Circular Gauge App</title>
</head>
<body>
  <app-gauge></app-gauge>
</body>
</html>
```

## Basic Implementation

### Minimal Gauge

```typescript
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  imports: [CircularGaugeModule],
  standalone: true,
  selector: 'app-gauge',
  template: `<ejs-circulargauge id='gauge-container'></ejs-circulargauge>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }
```

**Output:** Default gauge with:
- Single axis (0-100 range)
- Default pointer at center
- Tick marks and labels
- Full circular layout (200° to 160°)

### Gauge with Axes and Pointers

```typescript
@Component({
  imports: [CircularGaugeModule],
  standalone: true,
  selector: 'app-gauge',
  template: `
    <ejs-circulargauge id="circular-container" [title]='title'>
        <e-axes>
            <e-axis>
                <e-pointers>
                    <e-pointer value=35></e-pointer>
                </e-pointers>
            </e-axis>
        </e-axes>
    </ejs-circulargauge>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Gauge Title';
}
```

**Breakdown:**
- `<ejs-circulargauge>` - Main container
- `<e-axes>` - Axis collection
- `<e-axis>` - Single axis configuration
- `[startAngle]` / `[endAngle]` - Arc range (200° to 160° = 320° arc)
- `<e-pointers>` - Pointer collection
- `<e-pointer>` - Individual pointer
- `[value]` - Pointer position (0-100)
- `type='Needle'` - Pointer style (Needle, RangeBar, Marker)

## Setting Pointer Values

### Static Values (Template)

Set pointer value in template:

```typescript
<e-pointer [value]='50' type='Needle'></e-pointer>
```

### Dynamic Values (Component)

Update pointer from component property:

```typescript
export class AppComponent {
  pointerValue: number = 50;

  updatePointer() {
    this.pointerValue = 75; // Updates displayed pointer
  }
}
```

Template:
```html
<e-pointer [value]='pointerValue' type='Needle'></e-pointer>
```

### Programmatic Update (ViewChild)

Access gauge via ViewChild to update values dynamically:

```typescript
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { ViewChild, Component, AfterViewInit } from '@angular/core';

@Component({
  // ...
})
export class AppComponent implements AfterViewInit {
  @ViewChild('gauge') gaugeObj: CircularGaugeComponent;

  ngAfterViewInit() {
    // Update pointer value after component initializes
    this.gauge.setPointerValue(0, 0, 85); // axis, pointer index, value
  }

  updateValue() {
    this.gaugeObj.setPointerValue(0, 0, 90);
  }
}
```

Template:
```html
<ejs-circulargauge #gauge>
  <e-axes>
    <e-axis>
      <e-pointers>
        <e-pointer [value]='50' type='Needle'></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
<button (click)='updateValue()'>Update to 90</button>
```

### Multiple Pointer Values

```typescript
<e-axis>
  <e-pointers>
    <e-pointer [value]='50' type='Needle'></e-pointer>
    <e-pointer [value]='75' type='RangeBar'></e-pointer>
    <e-pointer [value]='60' type='Marker'></e-pointer>
  </e-pointers>
</e-axis>
```

Each pointer shows independently on the same axis.

## Common Setup Issues

### Issue: "CircularGaugeModule not found"

**Cause:** Package not installed or wrong import path

**Solution:**
```bash
npm install @syncfusion/ej2-angular-circulargauge --save
```

Then verify import:
```typescript
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';
```

### Issue: Gauge not rendering (blank container)

**Cause:** Missing styles or ViewEncapsulation issue

**Solution:**
1. Set ViewEncapsulation:
```typescript
@Component({
  encapsulation: ViewEncapsulation.None
})
```

### Issue: "Cannot read property 'setPointerValue' of undefined"

**Cause:** ViewChild accessed before component initializes

**Solution:** Use `AfterViewInit`:
```typescript
import { AfterViewInit, ViewChild } from '@angular/core';

export class AppComponent implements AfterViewInit {
  @ViewChild('gauge') gaugeObj: CircularGaugeComponent;

  ngAfterViewInit() {
    // Safe to access gauge here
    this.gaugeObj.setPointerValue(0, 0, 75);
  }
}
```

### Issue: Styles not applying

**Cause:** Incorrect theme import or missing CSS

**Solution:**
1. Verify theme import in global `styles.css`
2. Check ViewEncapsulation setting
3. Ensure `@syncfusion/ej2-base` is installed (peer dependency)

---

