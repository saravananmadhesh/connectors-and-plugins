# Troubleshooting

## Table of Contents

- [Installation Issues](#installation-issues)
  - [Package Installation Fails](#package-installation-fails)
  - [Module Not Found Error](#module-not-found-error)
- [Module and Import Errors](#module-and-import-errors)
  - [SmithchartModule Not Available](#smithchartmodule-not-available)
  - [Missing Service Injection](#missing-service-injection)
  - [ViewEncapsulation Issue](#viewencapsulation-issue)
  - [Unnecessary Imports](#unnecessary-imports)
- [Data Display Issues](#data-display-issues)
  - [No Data Appears on Chart](#no-data-appears-on-chart)
  - [Points Not Rendering](#points-not-rendering)
  - [Series Not Appearing in Legend](#series-not-appearing-in-legend)
- [Rendering Issues](#rendering-issues)
  - [Chart Not Displaying](#chart-not-displaying)
  - [Chart Partially Visible](#chart-partially-visible)
- [Performance Problems](#performance-problems)
  - [Slow Rendering with Large Datasets](#slow-rendering-with-large-datasets)
  - [Memory Usage Growing](#memory-usage-growing)
- [Styling and Visual Issues](#styling-and-visual-issues)
  - [Theme Not Applied](#theme-not-applied)
  - [Colors Not Changing](#colors-not-changing)
- [Feature-Specific Issues](#feature-specific-issues)
  - [Tooltips Not Showing](#tooltips-not-showing)
  - [Print Not Working](#print-not-working)
  - [Legend Click Doesn't Toggle Series](#legend-click-doesnt-toggle-series)
- [Template Element Naming](#template-element-naming)
  - [e-series-collection Not Recognized](#e-series-collection-not-recognized)
- [Browser Compatibility](#browser-compatibility)
  - [Chart Not Working in Specific Browser](#chart-not-working-in-specific-browser)
- [Getting More Help](#getting-more-help)
  - [Debug Information](#debug-information)
  - [Resources](#resources)

## Installation Issues

### Package Installation Fails

**Problem:** `npm add @syncfusion/ej2-angular-charts` fails or times out

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Try installing with specific version:**
```bash
npm install @syncfusion/ej2-angular-charts@32.1.19
```

3. **Use yarn instead:**
```bash
yarn add @syncfusion/ej2-angular-charts
```

4. **Check npm registry:**
```bash
npm config get registry
# Should output: https://registry.npmjs.org/
```

### Module Not Found Error

**Problem:** "Cannot find module '@syncfusion/ej2-angular-charts'"

**Solutions:**

1. **Reinstall package:**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Verify installation:**
```bash
npm list @syncfusion/ej2-angular-charts
```

3. **Check package.json:**
```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-charts": "^32.1.19"
  }
}
```

## Module and Import Errors

### SmithchartModule Not Available

**Problem:** "SmithchartModule is not exported from @syncfusion/ej2-angular-charts"

**Solution:** Verify the correct import:

```typescript
// ✓ CORRECT
import { SmithchartModule } from '@syncfusion/ej2-angular-charts'

// ✗ WRONG
import { SmithchartComponent } from '@syncfusion/ej2-angular-charts'
```

### Missing Service Injection

**Problem:** Tooltips don't work

**Solution:** Inject required service in `providers`:

```typescript
import { TooltipRenderService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SmithchartModule],
  providers: [TooltipRenderService],  // ← Add this
  standalone: true
})
```

**Services by feature:**
- Tooltips: `TooltipRenderService`

### ViewEncapsulation Issue

**Problem:** Styling not applied, theme not working

**Solution:** Add `ViewEncapsulation.None`:

```typescript
import { ViewEncapsulation } from '@angular/core'

@Component({
  encapsulation: ViewEncapsulation.None,  // ← Add this
  template: `<ejs-smithchart></ejs-smithchart>`
})
```

### Unnecessary Imports

**Problem:** Importing modules/services that aren't used adds bundle size and confusion

**Solutions:**

1. **Don't import CommonModule in standalone components:**
```typescript
// ✗ WRONG - CommonModule not needed for standalone
import { CommonModule } from '@angular/common'
@Component({
  imports: [SmithchartModule, CommonModule],
  standalone: true
})

// ✓ CORRECT - Only SmithchartModule needed
import { SmithchartModule } from '@syncfusion/ej2-angular-charts'
@Component({
  imports: [SmithchartModule],
  standalone: true
})
```

2. **Don't import services you're not using:**
```typescript
// ✗ WRONG - TooltipRenderService not needed without tooltips
import { TooltipRenderService } from '@syncfusion/ej2-angular-charts'
@Component({
  providers: [TooltipRenderService],  // ← Unnecessary
  standalone: true
})
export class AppComponent {
  series = [{ points: [...] }]  // No tooltip configuration
}

// ✓ CORRECT - Add service only when using tooltips
import { TooltipRenderService } from '@syncfusion/ej2-angular-charts'
@Component({
  providers: [TooltipRenderService],  // ← Used for tooltip rendering
  standalone: true
})
export class AppComponent {
  series = [{
    points: [...],
    tooltip: { visible: true }  // ← Tooltips configured
  }]
}
```

3. **SmithchartLegendService usage:**
```typescript
// ✗ WRONG - Service not needed for basic legend display
import { SmithchartLegendService } from '@syncfusion/ej2-angular-charts'
@Component({
  providers: [SmithchartLegendService],  // ← Not needed
  standalone: true
})
export class AppComponent {
  series = [{ name: 'Line A', points: [...] }]
  legendSettings = { visible: true }  // Basic legend
}

// ✓ CORRECT - Only add if handling legend click events
import { SmithchartLegendService } from '@syncfusion/ej2-angular-charts'
@Component({
  providers: [SmithchartLegendService],  // ← For custom event handling
  standalone: true
})
export class AppComponent {
  series = [...]
  legendSettings = { visible: true }
  
  // Custom legend interaction logic
  onLegendClick(event: any) { }
}
```

| Import | Use Only When | Reason |
|--------|---------------|--------|
| `CommonModule` | Never in standalone | Standalone doesn't need it |
| `TooltipRenderService` | `tooltip: { visible: true }` | Renders tooltip content |
| `SmithchartLegendService` | Custom legend events | Handles legend click interactions |

## Data Display Issues

### No Data Appears on Chart

**Problem:** Chart renders but no series visible

**Checklist:**

1. **Verify data array exists:**
```typescript
series = [{
  points: [
    { resistance: 0.4, reactance: 0.2 }
  ]
}]

// ✓ Check: Array not empty
// ✓ Check: Properties named 'resistance' and 'reactance'
```

2. **Ensure series binding:**
```html
<ejs-smithchart [series]="series"></ejs-smithchart>
```

3. **Check data type:**
```typescript
// ✓ CORRECT - array of objects
points: [{ resistance: 0.4, reactance: 0.2 }]

// ✗ WRONG - array of primitives
points: [10, 20, 30]
```

### Points Not Rendering

**Problem:** Series exists but data points don't show

**Solutions:**

1. **Verify property names:**
```typescript
// If data has different property names:
series = [{
  dataSource: data,
  resistance: 'r_value',    // Map correct properties
  reactance: 'x_value'
}]
```

2. **Check property values:**
```typescript
// ✓ Valid values
{ resistance: 10, reactance: 10 }
{ resistance: -5, reactance: 15 }
{ resistance: 0, reactance: 0 }

// ✗ Invalid values
{ resistance: undefined, reactance: null }
{ resistance: 'abc', reactance: 'xyz' }
```

3. **Enable markers to verify data:**
```typescript
series = [{
  marker: { 
    visible: true,   // Shows points more clearly
    dataLabel: { visible: true }
  },  
}]
```

### Series Not Appearing in Legend

**Problem:** Multiple series created but legend empty

**Solutions:**

1. **Add series names:**
```typescript
series = [{
  points: [...],
  name: 'Device A'  // ← Add name property
}]
```

2. **Enable legend:**
```typescript
legendSettings = { visible: true }  // ← Make sure it's true
```

3. **Check series visibility:**
```typescript
// Hidden series won't show in legend
visibility: 'hidden'  // ← Might be hiding the series
```

## Rendering Issues

### Chart Not Displaying

**Problem:** Empty container, no chart visible

**Solutions:**

1. **Set container dimensions:**
```html
<ejs-smithchart style="width: 100%; height: 400px;"></ejs-smithchart>
```

2. **Check component selector:**
```html
<!-- Template must include component -->
<ejs-smithchart></ejs-smithchart>
```
### Chart Partially Visible

**Problem:** Only part of chart renders or cuts off

**Solutions:**

1. **Adjust container size:**
```html
<div style="width: 100%; height: 500px;">
  <ejs-smithchart style="width: 100%; height: 100%;"></ejs-smithchart>
</div>
```

2. **Check parent layout:**
```css
/* Ensure parent has dimensions */
.chart-container {
  width: 100%;
  height: 500px;
  position: relative;
}
```

3. **Enable responsive:**
```typescript
// Chart auto-resizes with container
```

### Can't Bind to 'tooltip' Property
 
**Problem:** Can't bind to 'tooltip' since it isn't a known property of 'ejs-smithchart'
 
**Solution:**
 
Define the tooltip inside the SmithChart series instead of the chart:
 
```typescript
// ✗ WRONG - tooltip on chart
<ejs-smithchart [tooltip]="{ visible: true }"></ejs-smithchart>
 
// ✓ CORRECT - tooltip in series
series = [{
  tooltip: { visible: true },
  marker: { visible: true },
  points: [...]
}]
```

## Performance Problems

### Slow Rendering with Large Datasets

**Problem:** Chart lags with 1000+ data points

**Solutions:**

1. **Reduce data points:**
```typescript
// Sample every nth point
const sampledData = data.filter((d, i) => i % 10 === 0)
```

2. **Disable markers and labels:**
```typescript
series = [{
  marker: { 
    visible: false
    dataLabel: { visible: false }
  },
}]
```

3. **Disable smart labels:**
```typescript
series = [{
  enableSmartLabels: false
}]
```

4. **Use data aggregation:**
```typescript
function aggregateData(data: any[], bucketSize: number) {
  const result = []
  for (let i = 0; i < data.length; i += bucketSize) {
    result.push(data[i])
  }
  return result
}
```

### Memory Usage Growing

**Problem:** Memory increases over time

**Solutions:**

1. **Unsubscribe from observables:**
```typescript
private destroy$ = new Subject<void>()

ngOnInit() {
  this.dataService.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.series = data)
}

ngOnDestroy() {
  this.destroy$.next()
  this.destroy$.complete()
}
```

2. **Limit data history:**
```typescript
updateData(newPoint: any) {
  if (this.series[0].points.length > 1000) {
    this.series[0].points.shift()  // Remove oldest point
  }
  this.series[0].points.push(newPoint)
}
```

## Styling and Visual Issues

### Theme Not Applied

**Problem:** Chart shows default colors instead of theme

**Solutions:**

1. **Add ViewEncapsulation.None:**
```typescript
import { ViewEncapsulation } from '@angular/core'

@Component({
  encapsulation: ViewEncapsulation.None
})
```

2. **Check CSS load order:**
```html
<!-- In index.html -->
<link rel="stylesheet" href="styles.css">
```

### Colors Not Changing

**Problem:** Fill color on series doesn't update

**Solutions:**

1. **Update series reference:**
```typescript
// Instead of mutating:
this.series[0].fill = '#0066CC'

// Use new reference:
this.series = [{...this.series[0], fill: '#0066CC'}]
```

2. **Check CSS specificity:**
```css
/* May need !important for overrides */
::ng-deep .e-smithchart-series {
  stroke: #0066CC !important;
}
```

## Feature-Specific Issues

### Tooltips Not Showing

**Problem:** Hover doesn't display tooltip

**Solutions:**

1. **Inject service:**
```typescript
import { TooltipRenderService } from '@syncfusion/ej2-angular-charts'

@Component({
  providers: [TooltipRenderService]
})
```

2. **Enable tooltip:**
```typescript
series = [{
  tooltip: { visible: true },
  marker: { visible: true },
  points: [...]
}]
```

3. **Bind in template:**
```html
<ejs-smithchart [series]="series"></ejs-smithchart>
```

### Print Not Working

**Problem:** Print button doesn't open print dialog

**Solutions:**

1. **Get reference to chart:**
```typescript
@ViewChild('smithchart')
smithchart: any

print() {
  this.smithchart.print()
}
```

### Legend Click Doesn't Toggle Series

**Problem:** Clicking legend doesn't hide/show series

**Solutions:**

1. **Verify legend visible:**
```typescript
legendSettings = { visible: true }
```

2. **Check series visibility property:**
```typescript
series = [{
  name: 'Device',
  visibility: "visible"  
}]
```

3. **Handle click event:**
```typescript
onLegendItemClick(args: any) {
  console.log('Series toggled:', args.series.name)
}
```

## Template Element Naming

### e-series-collection Not Recognized

**Problem:** Error: `'e-series-collection' is not a known element`

```
'e-series-collection' is not a known element:
1. If 'e-series-collection' is an Angular component, then verify that it is included in the '@Component.imports' of this component.
2. If 'e-series-collection' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component
```

**Root Cause:** Using kebab-case (`e-series-collection`) instead of camelCase (`e-seriesCollection`) for Syncfusion template elements.

**Solution:** Use camelCase element names in templates

**WRONG:**
```html
<e-seriesCollection>
  <e-series></e-series>
</e-seriesCollection>
```

**CORRECT:**
```html
<e-series-collection>
  <e-series></e-series>
</e-series-collection>
```

**Key Points:**
- Syncfusion Angular components use **camelCase** element names (not kebab-case)
- Common element names:
  - `e-seriesCollection` (not `e-series-collection`)
  - `e-series` (not `e-series` - this one is already correct)
  - `e-legendSettings` (not `e-legend-settings`)
  - `e-markerSettings` (not `e-marker-settings`)

**Example - Correct Template Structure:**
```typescript
@Component({
  template: `
    <ejs-smithchart [series]="series">
      <e-seriesCollection>              <!-- ✓ camelCase -->
        <e-series 
          *ngFor="let s of series"
          [name]="s.name"
          [points]="s.points">
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  `
})
export class AppComponent {
  series = [...]
}
```

## Browser Compatibility

### Chart Not Working in Specific Browser

**Problem:** Works in Chrome but not in Firefox/Safari

**Solutions:**

1. **Check browser support:**
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+

2. **Test in different browser:**
```bash
# Use BrowserStack or local testing
```

3. **Check console for errors:**
```javascript
// Open DevTools → Console tab
// Look for JavaScript errors
```

## Getting More Help

### Debug Information

When reporting issues, include:

1. **Angular version:**
```bash
ng version
```

2. **Syncfusion version:**
```bash
npm list @syncfusion/ej2-angular-charts
```

3. **Browser information:**
   - Browser name and version
   - Operating system

4. **Minimal reproduction:**
   - Small code example showing the issue
   - Sample data

### Resources

- [Syncfusion Documentation](https://ej2.syncfusion.com/angular/documentation/smithchart/getting-started)
- [GitHub Issues](https://github.com/syncfusion/ej2-angular-ui-components/issues)
- [Support Forum](https://www.syncfusion.com/forums/angular)


