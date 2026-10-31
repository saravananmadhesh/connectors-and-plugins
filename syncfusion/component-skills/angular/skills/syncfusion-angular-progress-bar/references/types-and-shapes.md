# Types and Shapes in Angular Progress Bar

## Table of Contents

- [Linear Progress Bar](#linear-progress-bar)
  - [Basic Linear Progress](#basic-linear-progress)
  - [Linear with Secondary Progress Buffer](#linear-with-secondary-progress-buffer)
- [Circular Progress Bar](#circular-progress-bar)
  - [Basic Circular Progress](#basic-circular-progress)
  - [Circular with Custom Radius](#circular-with-custom-radius)
  - [Compact Circular Progress](#compact-circular-progress)
- [Semi-Circular Progress Bar](#semi-circular-progress-bar)
  - [Basic Semi-Circular Progress](#basic-semi-circular-progress)
  - [Customized Semi-Circular](#customized-semi-circular)
- [Type-Specific Properties](#type-specific-properties)
  - [Linear-Specific Properties](#linear-specific-properties)
  - [Circular-Specific Properties](#circular-specific-properties)
- [Switching Between Types](#switching-between-types)
- [When to Use Each Type](#when-to-use-each-type)
  - [Linear Progress Bar Type](#linear-progress-bar-type)
  - [Circular Progress Bar Type](#circular-progress-bar-type)
  - [Semi-Circular Progress Bar Type](#semi-circular-progress-bar-type)
- [Complete Type Comparison Example](#complete-type-comparison-example)
- [Changing Properties by Type](#changing-properties-by-type)
- [Performance Tips](#performance-tips)

## Linear Progress Bar

Linear progress bars display progress horizontally (default) or vertically. They're ideal for simple progress tracking.

### Basic Linear Progress

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-linear-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="75"
      type="Linear"
      height="20">
    </ejs-progressbar>
  `
})
export class LinearProgressComponent {
}
```

### Linear with Secondary Progress (Buffer)

Display two progress states simultaneously:

```typescript
@Component({
  selector: 'app-buffer-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="40"
      [secondaryProgress]="70"
      type="Linear"
      height="20">
    </ejs-progressbar>
  `,
  styles: [`
    :host ::ng-deep .e-progress {
      background-color: #f0f0f0;
    }
    :host ::ng-deep .e-secondary-progress {
      background-color: #d0d0d0;
    }
  `]
})
export class BufferProgressComponent {
}
```

**Use Case:** Video buffering (primary: playing, secondary: buffered)

## Circular Progress Bar

Circular progress bars provide a more visual, space-efficient representation of progress.

### Basic Circular Progress

```typescript
@Component({
  selector: 'app-circular-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="60"
      type="Circular">
    </ejs-progressbar>
  `
})
export class CircularProgressComponent {
}
```

### Circular with Custom Radius

Adjust the inner and outer radius:

```typescript
@Component({
  selector: 'app-custom-circular',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="75"
      type="Circular"
      radius="150"
      height="400"
      innerRadius="100">
    </ejs-progressbar>
  `
})
export class CustomCircularComponent {
}
```

**Properties:**
- `radius` - Outer radius of the circle (default: 100)
- `innerRadius` - Inner radius for donut-style appearance

### Compact Circular Progress

```html
<ejs-progressbar 
  [value]="85"
  type="Circular"
  height="200"
  radius="80"
  innerRadius="60">
</ejs-progressbar>
```

## Semi-Circular Progress Bar

Semi-circular progress bars display progress as a half-circle, ideal for dashboard widgets and status displays.

### Basic Semi-Circular Progress

```typescript
@Component({
  selector: 'app-semi-circular-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="70"
      type="SemiCircular"
      height="300"
      width="300">
    </ejs-progressbar>
  `
})
export class SemiCircularProgressComponent {
}
```

### Customized Semi-Circular

```typescript
@Component({
  selector: 'app-custom-semi-circular',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="65"
      type="SemiCircular"
      height="300"
      width="300"
      radius="150"
      innerRadius="100"
      cornerRadius="Round"
      trackColor="#e0e0e0"
      progressColor="#2196F3"
      [trackThickness]="40"
      [progressThickness]="40">
    </ejs-progressbar>
  `
})
export class CustomSemiCircularComponent {
}
```

**Use Case:** Dashboard metrics, battery level indicators, completion status in admin panels

## Type-Specific Properties

### Linear-Specific Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | number\|string | Width of the progress bar SVG Container |
| `height` | number | Height of the progress bar SVG Container |
| `trackThickness` | number | Track line thickness |
| `progressThickness` | number | Progress bar thickness |
| `secondaryProgressThickness` | number | Secondary progress thickness |

### Circular-Specific Properties

| Property | Type | Description |
|----------|------|-------------|
| `radius` | number\|string | Outer radius of the circular progress |
| `innerRadius` | number\|string | Inner radius for donut-style appearance |
| `cornerRadius` | string | 'Round' \| 'Square' - Corner style for circular bars |

## Switching Between Types

Dynamically change progress bar type based on user preference or layout:

```typescript
@Component({
  selector: 'app-switch-types',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <label>Progress Bar Type:</label>
      <select (change)="onTypeChange($event)">
        <option value="Linear">Linear</option>
        <option value="Circular">Circular</option>
      </select>

    <div style="margin-top: 20px;">
      <ejs-progressbar 
        *ngIf="selectedType === 'Linear'"
        id="linearBar"
        type="Linear"
        [value]="50"
        height="20"
        style="width:300px;">
      </ejs-progressbar>

      <ejs-progressbar 
        *ngIf="selectedType === 'Circular'"
        id="circularBar"
        type="Circular"
        [value]="50"
        width="120"
        height="120">
      </ejs-progressbar>
    </div>
    </div>
  `,
  styles: [`
    select {
      padding: 8px;
      font-size: 14px;
    }
  `]
})
export class SwitchTypesComponent {
  selectedType = 'Linear';

  onTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value;
  }
}
```

## When to Use Each Type

### Linear Progress Bar Type

**When to use:**
- File uploads/downloads
- Loading bars at the top of pages
- Process steps (vertical orientation)
- Simple progress indicators
- Space-constrained layouts (horizontal)

**Example:**
```html
<ejs-progressbar 
  [value]="progress"
  type="Linear"
  height="4">
</ejs-progressbar>
```

### Circular Progress Bar Type

**When to use:**
- Dashboard metrics and KPIs
- Quota or capacity indicators
- Skill proficiency displays
- System resource usage
- Central focal point designs

**Example:**
```html
<ejs-progressbar 
  [value]="completionRate"
  type="Circular">
</ejs-progressbar>
```

### Semi-Circular Progress Bar Type

**When to use:**
- Status displays in widgets
- Battery or fuel level indicators
- Speedometer-like visualizations
- Gauge-style progress indicators
- Space-limited dashboard panels

**Example:**
```html
<ejs-progressbar 
  [value]="statusLevel"
  type="SemiCircular"
  height="300"
  width="300">
</ejs-progressbar>
```

## Complete Type Comparison Example

Display all three types side-by-side:

```typescript
@Component({
  selector: 'app-type-comparison',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="display: flex; gap: 40px; padding: 20px; flex-wrap: wrap;">
      
      <!-- Linear -->
      <div>
        <h4>Linear (75%)</h4>
        <ejs-progressbar
          id="linear" 
          [value]="75"
          type="Linear"
          height="20"
          style="width: 200px;">
        </ejs-progressbar>
      </div>

      <!-- Circular -->
      <div>
        <h4>Circular (75%)</h4>
        <ejs-progressbar
          id="circular" 
          [value]="75"
          type="Circular"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

      <!-- Semi-Circular -->
      <div>
        <h4>Semi-Circular (75%)</h4>
        <ejs-progressbar
          id="semicircular" 
          [value]="75"
          type="SemiCircular"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

    </div>
  `
})
export class TypeComparisonComponent {
}
```

## Changing Properties by Type

Different types support different properties:

```typescript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adaptive-properties',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
     <!-- Linear Progress Bar -->
    <ejs-progressbar
      *ngIf="isLinear"
      id="linearBar"
      type="Linear"
      [value]="60"
      height="20"
      style="width:300px;">
    </ejs-progressbar>

    <!-- Circular Progress Bar -->
    <ejs-progressbar
      *ngIf="isCircular"
      id="circularBar"
      height="300"
      type="Circular"
      [value]="60"
      radius="120"
      innerRadius="50">
    </ejs-progressbar>
  `
})
export class AdaptivePropertiesComponent {
  type: 'Linear' | 'Circular' = 'Linear';

  get isLinear() {
    return this.type === 'Linear';
  }

  get isCircular() {
    return this.type === 'Circular' || this.type === 'SemiCircular';
  }
}
```

## Performance Tips

- **Linear:** Minimal CPU usage, best for frequent updates
- **Circular:** Moderate CPU usage, smooth scaling

For high-frequency updates (every 10ms), use **Linear** type for best performance.
