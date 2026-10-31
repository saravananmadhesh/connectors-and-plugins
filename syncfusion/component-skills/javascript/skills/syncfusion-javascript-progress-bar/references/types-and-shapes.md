# Types and Shapes (TypeScript & JavaScript)

- [purpose](#purpose)
- [linear-progress-bar](#linear-progress-bar)
  - [basic-linear-progress](#basic-linear-progress)
  - [linear-with-secondary-progress](#linear-with-secondary-progress)
  - [horizontal-and-vertical-linear](#horizontal-and-vertical-linear)
- [circular-progress-bar](#circular-progress-bar)
  - [basic-circular-progress](#basic-circular-progress)
  - [circular-with-custom-radius](#circular-with-custom-radius)
  - [compact-circular-progress](#compact-circular-progress)
- [semi-circular-progress-bar](#semi-circular-progress-bar)
  - [basic-semi-circular-progress](#basic-semi-circular-progress)
  - [customized-semi-circular](#customized-semi-circular)
- [type-specific-properties](#type-specific-properties)
  - [linear-specific-properties](#linear-specific-properties)
  - [circular-specific-properties](#circular-specific-properties)
  - [semi-circular-specific-properties](#semi-circular-specific-properties)
- [when-to-use-each-type](#when-to-use-each-type)
- [switching-between-types](#switching-between-types)
- [complete-type-comparison-example](#complete-type-comparison-example)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)

## Purpose

Progress Bar types determine the visual representation shape: linear bars for directional progress, circular for contained space-efficient progress, and semi-circular for gauge-style indicators.

Choose the appropriate type based on:

```text
Available screen space and layout.
User expectation for progress indication.
Integration with dashboard or interface design.
Mobile vs. desktop requirements.
Accessibility and visual clarity needs.
```

## Linear Progress Bar

### Purpose

Linear progress bars display progress as a horizontal or vertical rectangular bar. They are ideal for file uploads/downloads, page loading, and simple progress tracking where directional progress is intuitive.

### Basic Linear Progress

Display a horizontal linear progress bar:

#### TypeScript

**HTML:**

```html
<div id="linear"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const linear: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 75,
    height: '20px',
    width: '100%'
});

linear.appendTo('#linear');
```

#### JavaScript

```html
<div id="linear"></div>

<script>
var linear = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 75,
    height: '20px',
    width: '100%'
});

linear.appendTo('#linear');
</script>
```

### Linear with Secondary Progress

Display two progress states simultaneously (primary progress and buffered progress):

#### TypeScript

**HTML:**

```html
<div id="buffer"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const buffer: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '20px',
    width: '100%',
    trackColor: '#F0F0F0',
    progressColor: '#4472C4',
    secondaryProgressColor: '#D0D0D0'
});

buffer.appendTo('#buffer');
```

**Use Case:** Video buffering (primary: playing position, secondary: buffered content)

#### JavaScript

```html
<div id="buffer"></div>

<script>
var buffer = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '20px',
    width: '100%',
    trackColor: '#F0F0F0',
    progressColor: '#4472C4',
    secondaryProgressColor: '#D0D0D0'
});

buffer.appendTo('#buffer');
</script>
```

### Horizontal and Vertical Linear

Linear progress bars can be oriented horizontally or vertically:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px 0;">
    <h4>Horizontal</h4>
    <div id="horizontal"></div>
</div>

<div style="margin: 20px 0; height: 300px;">
    <h4>Vertical</h4>
    <div id="vertical"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Horizontal
const horizontal: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 65,
    height: '20px',
    width: '100%'
});

horizontal.appendTo('#horizontal');

// Vertical
const vertical: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 75,
    height: '250px',
    width: '20px',
    isVertical: true
});

vertical.appendTo('#vertical');
```

#### JavaScript

```html
<div style="margin: 20px 0;">
    <h4>Horizontal</h4>
    <div id="horizontal"></div>
</div>

<div style="margin: 20px 0; height: 300px;">
    <h4>Vertical</h4>
    <div id="vertical"></div>
</div>

<script>
// Horizontal
var horizontal = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 65,
    height: '20px',
    width: '100%'
});

horizontal.appendTo('#horizontal');

// Vertical
var vertical = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 75,
    height: '250px',
    width: '20px',
    isVertical: true
});

vertical.appendTo('#vertical');
</script>
```

## Circular Progress Bar

### Purpose

Circular progress bars display progress as a full circle. They provide a visually compelling, space-efficient representation ideal for dashboards, KPIs, and central focus designs.

### Basic Circular Progress

Display a complete circular progress indicator:

#### TypeScript

**HTML:**

```html
<div id="circular"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const circular: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 60,
    height: '200px',
    width: '200px'
});

circular.appendTo('#circular');
```

#### JavaScript

```html
<div id="circular"></div>

<script>
var circular = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 60,
    height: '200px',
    width: '200px'
});

circular.appendTo('#circular');
</script>
```

### Circular with Custom Radius

Create donut-style or thick-walled circular progress bars by adjusting inner and outer radius:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Donut Style</h4>
    <div id="donut"></div>
</div>

<div style="margin: 20px;">
    <h4>Thick Ring</h4>
    <div id="thickring"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Donut Style
const donut: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '250px',
    width: '250px',
    radius: '120px',
    innerRadius: '80px'
});

donut.appendTo('#donut');

// Thick Ring
const thickRing: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 85,
    height: '250px',
    width: '250px',
    radius: '110px',
    innerRadius: '100px',
    trackThickness: 8,
    progressThickness: 8
});

thickRing.appendTo('#thickring');
```

**Properties:**

```text
radius        -> Outer radius of the circle. Default: 100px.
innerRadius   -> Inner radius for donut-style appearance. Optional.
trackThickness -> Track bar line thickness. Default: 2.
progressThickness -> Progress bar line thickness. Default: 2.
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Donut Style</h4>
    <div id="donut"></div>
</div>

<div style="margin: 20px;">
    <h4>Thick Ring</h4>
    <div id="thickring"></div>
</div>

<script>
// Donut Style
var donut = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    height: '250px',
    width: '250px',
    radius: '120px',
    innerRadius: '80px'
});

donut.appendTo('#donut');

// Thick Ring
var thickRing = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 85,
    height: '250px',
    width: '250px',
    radius: '110px',
    innerRadius: '100px',
    trackThickness: 8,
    progressThickness: 8
});

thickRing.appendTo('#thickring');
</script>
```

### Compact Circular Progress

Create a compact circular progress bar suitable for inline display or small widget spaces:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const compact: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 85,
    height: '150px',
    width: '150px',
    radius: '70px',
    innerRadius: '60px',
    trackThickness: 4,
    progressThickness: 4
});

compact.appendTo('#compact');
```

#### JavaScript

```html
<div id="compact"></div>

<script>
var compact = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 85,
    height: '150px',
    width: '150px',
    radius: '70px',
    innerRadius: '60px',
    trackThickness: 4,
    progressThickness: 4
});

compact.appendTo('#compact');
</script>
```

## Semi-Circular Progress Bar

### Purpose

Semi-circular progress bars display progress as a half-circle, ideal for gauge-style indicators, battery level displays, and dashboard metrics where a semicircular shape fits the layout.

### Basic Semi-Circular Progress

Display a half-circular progress indicator:

#### TypeScript

**HTML:**

```html
<div id="semicircle"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const semicircle: ProgressBar = new ProgressBar({
    type: 'SemiCircle',
    value: 70,
    height: '300px',
    width: '300px'
});

semicircle.appendTo('#semicircle');
```

#### JavaScript

```html
<div id="semicircle"></div>

<script>
var semicircle = new ej.progressbar.ProgressBar({
    type: 'SemiCircle',
    value: 70,
    height: '300px',
    width: '300px'
});

semicircle.appendTo('#semicircle');
</script>
```

### Customized Semi-Circular

Create a customized semi-circular progress bar with colors, thickness, and corner styles:

#### TypeScript

**HTML:**

```html
<div id="custom-semicircle"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const customSemi: ProgressBar = new ProgressBar({
    type: 'SemiCircle',
    value: 65,
    height: '300px',
    width: '300px',
    radius: '150px',
    innerRadius: '100px',
    cornerRadius: 'Round',
    trackColor: '#E0E0E0',
    progressColor: '#2196F3',
    trackThickness: 40,
    progressThickness: 40
});

customSemi.appendTo('#custom-semicircle');
```

**Use Cases:** Dashboard metrics, battery level indicators, fuel gauge displays, completion status widgets

#### JavaScript

```html
<div id="custom-semicircle"></div>

<script>
var customSemi = new ej.progressbar.ProgressBar({
    type: 'SemiCircle',
    value: 65,
    height: '300px',
    width: '300px',
    radius: '150px',
    innerRadius: '100px',
    cornerRadius: 'Round',
    trackColor: '#E0E0E0',
    progressColor: '#2196F3',
    trackThickness: 40,
    progressThickness: 40
});

customSemi.appendTo('#custom-semicircle');
</script>
```

## Type-Specific Properties

### Linear-Specific Properties

```text
width                     -> Width of the progress bar. Default: 100%.
height                    -> Height (thickness) of the bar. Default: 20px.
isVertical                -> Boolean flag for vertical orientation. Default: false.
trackThickness            -> Track bar line thickness. Default: 2.
progressThickness         -> Progress bar line thickness. Default: 2.
secondaryProgress         -> Secondary progress value for buffering. Optional.
secondaryProgressThickness -> Secondary progress thickness. Default: 2.
```

### Circular-Specific Properties

```text
radius                -> Outer radius of the circle. Default: 100px.
innerRadius           -> Inner radius for donut-style appearance. Optional.
trackThickness        -> Track bar line thickness. Default: 2.
progressThickness     -> Progress bar line thickness. Default: 2.
cornerRadius          -> 'Round' or 'Square' corner style. Default: 'Round'.
```

### Semi-Circular-Specific Properties

```text
radius                -> Radius of the semi-circle. Default: 100px.
innerRadius           -> Inner radius for donut-style appearance. Optional.
trackThickness        -> Track bar line thickness. Default: 2.
progressThickness     -> Progress bar line thickness. Default: 2.
cornerRadius          -> 'Round' or 'Square' corner style. Default: 'Round'.
```

## When to Use Each Type

### Linear Progress Bar

**Best for:**

```text
File uploads/downloads
Page loading indicators
Sequential task progress
Streaming or buffering progress (with secondary progress)
Installation steps
Horizontal space-constrained layouts
```

**Example:**

```typescript
type: 'Linear',
value: 65,
height: '20px',
width: '100%'
```

### Circular Progress Bar

**Best for:**

```text
Dashboard KPIs and metrics
Quota or capacity indicators
Skill or completion percentages
System resource usage (CPU, memory)
Central focus designs
Profile completion status
```

**Example:**

```typescript
type: 'Circular',
value: 75,
height: '200px',
width: '200px'
```

### Semi-Circular Progress Bar

**Best for:**

```text
Battery or fuel level indicators
Speedometer-like visualizations
Gauge-style progress displays
Dashboard widget status
Limited vertical space (dashboard panels)
Temperature or pressure indicators
```

**Example:**

```typescript
type: 'SemiCircle',
value: 70,
height: '300px',
width: '300px'
```

## Switching Between Types

Dynamically change progress bar type based on screen size or user preference:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <label for="typeSelect">Progress Bar Type: </label>
    <select id="typeSelect" onchange="switchType(this.value)">
        <option value="Linear">Linear</option>
        <option value="Circular">Circular</option>
        <option value="SemiCircle">Semi-Circular</option>
    </select>
</div>

<div id="progressContainer"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let currentProgress: ProgressBar;

function switchType(type: string): void {
    const container = document.getElementById('progressContainer');
    if (container) {
        container.innerHTML = '';
    }

    if (currentProgress) {
        currentProgress.destroy();
    }

    const config: any = {
        value: 50,
        type: type
    };

    // Type-specific configuration
    if (type === 'Linear') {
        config.height = '20px';
        config.width = '100%';
    } else if (type === 'Circular') {
        config.height = '200px';
        config.width = '200px';
    } else if (type === 'SemiCircle') {
        config.height = '300px';
        config.width = '300px';
    }

    currentProgress = new ProgressBar(config);
    currentProgress.appendTo('#progressContainer');
}
```

#### JavaScript

```html
<div style="margin: 20px;">
    <label for="typeSelect">Progress Bar Type: </label>
    <select id="typeSelect" onchange="switchType(this.value)">
        <option value="Linear">Linear</option>
        <option value="Circular">Circular</option>
        <option value="SemiCircle">Semi-Circular</option>
    </select>
</div>

<div id="progressContainer"></div>

<script>
var currentProgress;

function switchType(type) {
    var container = document.getElementById('progressContainer');
    if (container) {
        container.innerHTML = '';
    }

    if (currentProgress) {
        currentProgress.destroy();
    }

    var config = {
        value: 50,
        type: type
    };

    // Type-specific configuration
    if (type === 'Linear') {
        config.height = '20px';
        config.width = '100%';
    } else if (type === 'Circular') {
        config.height = '200px';
        config.width = '200px';
    } else if (type === 'SemiCircle') {
        config.height = '300px';
        config.width = '300px';
    }

    currentProgress = new ej.progressbar.ProgressBar(config);
    currentProgress.appendTo('#progressContainer');
}
</script>
```

## Complete Type Comparison Example

Display all three types side-by-side for visual comparison:

#### TypeScript

**HTML:**

```html
<div style="display: flex; gap: 40px; padding: 20px; flex-wrap: wrap;">
    <div>
        <h4>Linear (75%)</h4>
        <div id="linearComp"></div>
    </div>

    <div>
        <h4>Circular (75%)</h4>
        <div id="circularComp"></div>
    </div>

    <div>
        <h4>Semi-Circular (75%)</h4>
        <div id="semicircleComp"></div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Linear
const linear = new ProgressBar({
    type: 'Linear',
    value: 75,
    height: '20px',
    width: '200px'
});
linear.appendTo('#linearComp');

// Circular
const circular = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '200px',
    width: '200px'
});
circular.appendTo('#circularComp');

// Semi-Circular
const semiCircle = new ProgressBar({
    type: 'SemiCircle',
    value: 75,
    height: '200px',
    width: '200px'
});
semiCircle.appendTo('#semicircleComp');
```

#### JavaScript

```html
<div style="display: flex; gap: 40px; padding: 20px; flex-wrap: wrap;">
    <div>
        <h4>Linear (75%)</h4>
        <div id="linearComp"></div>
    </div>

    <div>
        <h4>Circular (75%)</h4>
        <div id="circularComp"></div>
    </div>

    <div>
        <h4>Semi-Circular (75%)</h4>
        <div id="semicircleComp"></div>
    </div>
</div>

<script>
// Linear
var linear = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 75,
    height: '20px',
    width: '200px'
});
linear.appendTo('#linearComp');

// Circular
var circular = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    height: '200px',
    width: '200px'
});
circular.appendTo('#circularComp');

// Semi-Circular
var semiCircle = new ej.progressbar.ProgressBar({
    type: 'SemiCircle',
    value: 75,
    height: '200px',
    width: '200px'
});
semiCircle.appendTo('#semicircleComp');
</script>
```

## Runtime Validation Checklist

Before deploying type-based progress bars:

- **Type Value:** Type is `Linear`, `Circular`, or `SemiCircle`.
- **Dimensions:** Height and width are valid CSS measurements and match container.
- **Radius Properties:** Radius values are less than half the container dimensions (for circular/semi-circular).
- **Inner Radius:** InnerRadius is smaller than outer radius (for donut effects).
- **Thickness Properties:** TrackThickness and progressThickness are positive values.
- **Container Size:** Container has adequate space for the chosen type.
- **Responsive:** Dimensions adapt appropriately on mobile and desktop.
- **Value Range:** Progress value is between 0 and 100.
- **Secondary Progress:** SecondaryProgress value (if used) is valid and greater than primary progress.
- **Accessibility:** Progress value is labeled or announced for screen readers.

## Combined Mistakes and Future References

### Incorrect: Circular with Undersized Container

```typescript
// WRONG - Circle won't fit in container
const circular = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '100px',
    width: '100px',
    radius: '150px'  // Larger than half the container
});
```

**Correction:**

Ensure radius is proportionate to container:

```typescript
const circular = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '250px',
    width: '250px',
    radius: '120px'  // Fits within container
});
```

### Incorrect: Invalid Inner Radius

```typescript
// WRONG - Inner radius larger than outer
const donut = new ProgressBar({
    type: 'Circular',
    value: 60,
    height: '200px',
    width: '200px',
    radius: '80px',
    innerRadius: '100px'  // Larger than outer radius
});
```

**Correction:**

Inner radius must be smaller than outer radius:

```typescript
const donut = new ProgressBar({
    type: 'Circular',
    value: 60,
    height: '200px',
    width: '200px',
    radius: '100px',
    innerRadius: '70px'  // Smaller than outer
});
```

### Incorrect: SemiCircle with Square Container

```typescript
// WRONG - SemiCircle in square container can be distorted
const semiCircle = new ProgressBar({
    type: 'SemiCircle',
    value: 70,
    height: '200px',
    width: '100px'  // Not square
});
```

**Correction:**

Use square containers for semi-circular progress:

```typescript
const semiCircle = new ProgressBar({
    type: 'SemiCircle',
    value: 70,
    height: '200px',
    width: '200px'  // Square container
});
```

### Incorrect: Type String Case Sensitivity

```typescript
// WRONG - Incorrect casing
const progress = new ProgressBar({
    type: 'linear'  // Should be 'Linear'
});
```

**Correction:**

Use proper enum casing:

```typescript
const progress = new ProgressBar({
    type: 'Linear'  // Correct casing
});
```

### Incorrect: Missing Responsive Dimensions

```typescript
// WRONG - Fixed pixels without responsive behavior
const circular = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '300px',
    width: '300px'  // Fixed size, not responsive
});
```

**Correction:**

Use CSS media queries or dynamic sizing:

```typescript
const circular = new ProgressBar({
    type: 'Circular',
    value: 75,
    height: '100%',
    width: '100%'  // Responsive to container
});

// With CSS media queries
// @media (max-width: 600px) { #container { width: 200px; } }
```
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
