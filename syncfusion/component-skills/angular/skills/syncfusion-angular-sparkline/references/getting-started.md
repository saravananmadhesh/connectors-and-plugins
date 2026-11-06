# Getting Started with Angular Sparkline

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Add Syncfusion Package](#step-1-add-syncfusion-package)
  - [Step 2: Verify Installation](#step-2-verify-installation)
- [Basic Implementation](#basic-implementation)
  - [Minimal Sparkline Component](#minimal-sparkline-component)
  - [Adding Minimal Data](#adding-minimal-data)
- [Module Injection](#module-injection)
  - [Enabling Tooltip Service](#enabling-tooltip-service)
- [Data Binding](#data-binding)
  - [Using Primitive Arrays](#using-primitive-arrays)
  - [Using Object Arrays](#using-object-arrays)
  - [Example: Sales Data by Category](#example-sales-data-by-category)
- [Enabling Tooltips](#enabling-tooltips)
  - [Basic Tooltip Setup](#basic-tooltip-setup)
  - [Customizing Tooltip Format](#customizing-tooltip-format)
- [Running Your Application](#running-your-application)
  - [Development Server](#development-server)
  - [Verifying Sparkline Renders](#verifying-sparkline-renders)
  - [Build for Production](#build-for-production)
- [Troubleshooting](#troubleshooting)
  - [Issue: SparklineModule not Found](#issue-sparklinemodule-not-found)
  - [Issue: Sparkline Renders Empty](#issue-sparkline-renders-empty)
  - [Issue: Multiple Sparklines Not Rendering](#issue-multiple-sparklines-not-rendering)
  - [Issue: Tooltip Doesn't Appear](#issue-tooltip-doesnt-appear)
  - [Issue: Data Not Updating](#issue-data-not-updating)
  - [Issue: Performance Issues with Large Data](#issue-performance-issues-with-large-data)

## Prerequisites

Before implementing the Sparkline component, ensure:
- **Angular 19+** is installed (the examples use standalone components)
- **npm** is available on your system
- You have a working Angular project (or create one with `ng new my-app`)
- **Zone.js** is available in your project (typically installed with Angular CLI)

> **Note:** If using Angular 15-18, the examples work with minimal adjustments. For Angular 14 and below, consider upgrading or refer to legacy documentation.

## Installation

### Step 1: Add Syncfusion Package

Install the Syncfusion Angular Charts package (which includes Sparkline):

```bash
ng add @syncfusion/ej2-angular-charts
```

This command will:
- Add `@syncfusion/ej2-angular-charts` to your `package.json`
- Install peer dependencies automatically
- Register necessary providers if using older Angular versions

### Step 2: Verify Installation

Check that `package.json` includes:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-charts": "^latest",
    "@angular/core": "^19.0.0"
  }
}
```

If not, manually add the package:

```bash
npm install @syncfusion/ej2-angular-charts
```

## Basic Implementation

### Minimal Sparkline Component

Create a component with a basic sparkline:

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-sparkline 
    id='sparkline-container'
    height="100px"
    width="100%">
  </ejs-sparkline>`
})
export class AppComponent { }
```

**Output:** An empty SVG element (no data yet). You'll add data in the next step.

> ⚠️ **IMPORTANT: Unique IDs Required for Multiple Sparklines**
> 
> If you plan to display **more than one sparkline component** on the same page, you **MUST** provide a unique `id` attribute to each sparkline. Without unique IDs, sparklines may not render properly or may conflict with each other.
> 
> **Example: Multiple Sparklines with Unique IDs**
> ```html
> <!-- ✓ CORRECT - Each sparkline has a unique ID -->
> <ejs-sparkline id="sparkline-sales" [dataSource]="salesData"></ejs-sparkline>
> <ejs-sparkline id="sparkline-revenue" [dataSource]="revenueData"></ejs-sparkline>
> <ejs-sparkline id="sparkline-users" [dataSource]="usersData"></ejs-sparkline>
> 
> <!-- ✗ WRONG - No IDs causes rendering issues -->
> <ejs-sparkline [dataSource]="salesData"></ejs-sparkline>
> <ejs-sparkline [dataSource]="revenueData"></ejs-sparkline>
> 
> <!-- ✗ WRONG - Duplicate IDs causes conflicts -->
> <ejs-sparkline id="chart" [dataSource]="salesData"></ejs-sparkline>
> <ejs-sparkline id="chart" [dataSource]="revenueData"></ejs-sparkline>
> ```
> 
> **Symptoms of Missing Unique IDs:**
> - Sparklines don't render at all
> - Only the first sparkline displays correctly
> - Data appears in wrong sparklines
> - Tooltips or markers show incorrect data
> - Console errors about duplicate DOM IDs

### Adding Minimal Data

To render an actual sparkline, provide data:

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="[2, 6, 4, 8, 5, 1, 7]"
    type="Line"
    height="100px">
  </ejs-sparkline>`
})
export class AppComponent { }
```

**Output:** A line sparkline with 7 data points.

## Module Injection

Some features require injecting service providers. The most common is the **SparklineTooltipService** for tooltip support.

### Enabling Tooltip Service

```typescript
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  providers: [SparklineTooltipService],  // ← Inject tooltip service
  template: `<ejs-sparkline 
    [dataSource]="data"
    [tooltipSettings]="{ visible: true }">
  </ejs-sparkline>`
})
export class AppComponent {
  data = [2, 6, 4, 8, 5]
}
```

**Key Point:** Without injecting `SparklineTooltipService`, the tooltip won't work even if you set `visible: true`.

## Data Binding

### Using Primitive Arrays

For simple numeric data:

```typescript
dataSource = [10, 15, 8, 12, 20, 18]
```

Use in template:
```html
<ejs-sparkline [dataSource]="dataSource" type="Column"></ejs-sparkline>
```

### Using Object Arrays

For more complex data with multiple fields:

```typescript
dataSource = [
  { month: 'Jan', sales: 2 },
  { month: 'Feb', sales: 6 },
  { month: 'Mar', sales: 4 },
  { month: 'Apr', sales: 8 },
  { month: 'May', sales: 5 }
]
```

Map the fields:
```html
<ejs-sparkline 
  [dataSource]="dataSource"
  xName="month"
  yName="sales"
  type="Area">
</ejs-sparkline>
```

**Key Properties:**
- `xName` - The property name for X-axis values (often labels)
- `yName` - The property name for Y-axis values (numerical data)

### Example: Sales Data by Category

```typescript
@Component({
  template: `
   <ejs-sparkline
        [dataSource]="products"
        xName="month"
        yName="revenue"
        valueType="Category"
        type="Line"
        height="60px">
      </ejs-sparkline>
  `
})
export class DashboardComponent {
  products = [
        { month: 'Jan', revenue: 1000 },
        { month: 'Feb', revenue: 1200 },
        { month: 'Mar', revenue: 1100 },
        { month: 'Jan', revenue: 800 },
        { month: 'Feb', revenue: 950 },
        { month: 'Mar', revenue: 1050 }
    ]
}
```

## Enabling Tooltips

Tooltips display data values on hover.

### Basic Tooltip Setup

```typescript
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  providers: [SparklineTooltipService],
  template: `<ejs-sparkline 
    [dataSource]="[2, 6, 4, 8, 5]"
    [tooltipSettings]="{ visible: true }"
    type="Line">
  </ejs-sparkline>`
})
export class AppComponent { }
```

**Behavior:** Hover over the sparkline to see tooltips.

### Customizing Tooltip Format

```typescript
tooltipSettings = {
  visible: true,
  format: '${x}: ${y}',  // Display as "Month: Value"
  fill: '#FF5733'        // Tooltip background color
}
```

Use in template:
```html
<ejs-sparkline 
  [dataSource]="data"
  [tooltipSettings]="tooltipSettings">
</ejs-sparkline>
```

## Running Your Application

### Development Server

Start the Angular development server:

```bash
npm start
```

or

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`.

### Verifying Sparkline Renders

Check the browser console for errors. The sparkline should appear as:
- A compact line, column, or area chart depending on the type
- An interactive visualization when hovering (if tooltip is enabled)

### Build for Production

```bash
ng build --configuration production
```

The output will be in the `dist/` folder, ready to deploy.

## Troubleshooting

### Issue: SparklineModule not Found

**Solution:** Ensure the import path is correct:
```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
//                                                      ↓ correct package name
```

### Issue: Sparkline Renders Empty

**Cause:** No data provided or incorrect data mapping.

**Solution:**
1. Provide `dataSource` with values
2. For objects, ensure `xName` and `yName` match property names:

```typescript
dataSource = [{ label: 'Jan', value: 10 }]
xName="label"  // ← matches 'label' property
yName="value"  // ← matches 'value' property
```

### Issue: Multiple Sparklines Not Rendering

**Cause:** Missing or duplicate `id` attributes when using multiple sparkline components on the same page.

**Symptoms:**
- Only the first sparkline displays correctly
- Some sparklines don't render at all
- Data appears in the wrong sparkline
- Tooltips show incorrect values
- Browser console shows duplicate ID warnings

**Solution:** Provide a **unique `id`** attribute to each sparkline component:

```html
<!-- ✓ CORRECT - Unique IDs -->
<ejs-sparkline id="sparkline-1" [dataSource]="data1"></ejs-sparkline>
<ejs-sparkline id="sparkline-2" [dataSource]="data2"></ejs-sparkline>
<ejs-sparkline id="sparkline-3" [dataSource]="data3"></ejs-sparkline>

<!-- ✗ WRONG - No IDs -->
<ejs-sparkline [dataSource]="data1"></ejs-sparkline>
<ejs-sparkline [dataSource]="data2"></ejs-sparkline>

<!-- ✗ WRONG - Duplicate IDs -->
<ejs-sparkline id="chart" [dataSource]="data1"></ejs-sparkline>
<ejs-sparkline id="chart" [dataSource]="data2"></ejs-sparkline>
```

**TypeScript Example with Multiple Sparklines:**
```typescript
@Component({
  template: `
    <div class="sparkline-container">
      <ejs-sparkline id="sales-sparkline" [dataSource]="salesData"></ejs-sparkline>
      <ejs-sparkline id="revenue-sparkline" [dataSource]="revenueData"></ejs-sparkline>
      <ejs-sparkline id="users-sparkline" [dataSource]="usersData"></ejs-sparkline>
    </div>
  `
})
export class AppComponent {
  salesData = [10, 25, 15, 30, 20];
  revenueData = [100, 120, 110, 150, 130];
  usersData = [50, 75, 60, 90, 80];
}
```

**Best Practices:**
- Use descriptive IDs that identify the sparkline's purpose (e.g., `"sales-trend"`, `"revenue-chart"`)
- Use a consistent naming convention (e.g., `"sparkline-{name}"`)
- For dynamically generated sparklines, use unique identifiers from your data:
  ```html
  <ejs-sparkline 
    *ngFor="let item of items" 
    [id]="'sparkline-' + item.id"
    [dataSource]="item.data">
  </ejs-sparkline>
  ```

### Issue: Tooltip Doesn't Appear

**Cause:** Service not injected.

**Solution:**
```typescript
import { SparklineTooltipService } from '@syncfusion/ej2-angular-charts'

@Component({
  providers: [SparklineTooltipService]  // ← Required
})
```

### Issue: Data Not Updating

**Cause:** Data reference not changed after update.

**Solution:** Use Angular change detection by reassigning the array:

```typescript
updateData() {
  this.dataSource = [...this.dataSource, newValue]  // Create new reference
}
```

### Issue: Performance Issues with Large Data

**Solution:**
- Use the `Column` or `Area` type instead of `Line` for large datasets
- Reduce `height` and `width` to minimize render overhead
- Consider virtualizing multiple sparklines (show only visible items)
