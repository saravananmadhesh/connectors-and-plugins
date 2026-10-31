# Customization (TypeScript & JavaScript)

- [purpose](#purpose)
- [sizing-and-dimensions](#sizing-and-dimensions)
  - [linear-progress-bar-sizing](#linear-progress-bar-sizing)
  - [percentage-based-sizing](#percentage-based-sizing)
  - [fixed-dimensions](#fixed-dimensions)
- [color-configuration](#color-configuration)
  - [progress-and-track-colors](#progress-and-track-colors)
  - [secondary-progress-color](#secondary-progress-color)
  - [conditional-colors](#conditional-colors)
- [value-ranges](#value-ranges)
  - [custom-range-configuration](#custom-range-configuration)
  - [file-size-progress](#file-size-progress)
- [radius-properties](#radius-properties)
  - [circular-progress-with-custom-radius](#circular-progress-with-custom-radius)
  - [donut-effect-with-inner-radius](#donut-effect-with-inner-radius)
  - [corner-radius-styling](#corner-radius-styling)
- [segments](#segments)
  - [linear-progress-with-segments](#linear-progress-with-segments)
  - [circular-progress-with-segments](#circular-progress-with-segments)
  - [segment-spacing](#segment-spacing)
- [thickness-control](#thickness-control)
  - [track-and-progress-thickness](#track-and-progress-thickness)
  - [secondary-progress-thickness](#secondary-progress-thickness)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)

## Purpose

Customization options allow you to control appearance (colors, sizes, thickness), behavior (segments, ranges), and styling (corners, effects). Tailor progress bars to match your application's design system and use case requirements.

## Sizing and Dimensions

### Linear Progress Bar Sizing

Control the width and height (thickness) of linear progress bars:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Thin Progress Bar</h4>
    <div id="thinBar"></div>
    
    <h4 style="margin-top: 20px;">Medium Progress Bar</h4>
    <div id="mediumBar"></div>
    
    <h4 style="margin-top: 20px;">Thick Progress Bar</h4>
    <div id="thickBar"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Thin bar
const thin: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '4px',
    width: '100%'
});
thin.appendTo('#thinBar');

// Medium bar
const medium: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%'
});
medium.appendTo('#mediumBar');

// Thick bar
const thick: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '40px',
    width: '100%'
});
thick.appendTo('#thickBar');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Thin Progress Bar</h4>
    <div id="thinBar"></div>
    
    <h4 style="margin-top: 20px;">Medium Progress Bar</h4>
    <div id="mediumBar"></div>
    
    <h4 style="margin-top: 20px;">Thick Progress Bar</h4>
    <div id="thickBar"></div>
</div>

<script>
// Thin bar
var thin = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '4px',
    width: '100%'
});
thin.appendTo('#thinBar');

// Medium bar
var medium = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%'
});
medium.appendTo('#mediumBar');

// Thick bar
var thick = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '40px',
    width: '100%'
});
thick.appendTo('#thickBar');
</script>
```

### Percentage-Based Sizing

Use percentage-based dimensions for responsive design:

#### TypeScript

**HTML:**

```html
<div style="width: 100%; margin: 20px 0;">
    <h4>Responsive Width (100%)</h4>
    <div id="responsive"></div>
    <p>This progress bar fills its container.</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const responsive: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 75,
    height: '25px',
    width: '100%'
});
responsive.appendTo('#responsive');
```

#### JavaScript

```html
<div style="width: 100%; margin: 20px 0;">
    <h4>Responsive Width (100%)</h4>
    <div id="responsive"></div>
    <p>This progress bar fills its container.</p>
</div>

<script>
var responsive = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 75,
    height: '25px',
    width: '100%'
});
responsive.appendTo('#responsive');
</script>
```

### Fixed Dimensions

Set fixed pixel dimensions for precise control:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const fixed: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '500px'
});
fixed.appendTo('#fixedSize');
```

#### JavaScript

```javascript
var fixed = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '500px'
});
fixed.appendTo('#fixedSize');
```

## Color Configuration

### Progress and Track Colors

Customize progress and track colors for visual design:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Default Blue</h4>
    <div id="blue"></div>
    
    <h4 style="margin-top: 20px;">Success Green</h4>
    <div id="green"></div>
    
    <h4 style="margin-top: 20px;">Warning Orange</h4>
    <div id="orange"></div>
    
    <h4 style="margin-top: 20px;">Danger Red</h4>
    <div id="red"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Default Blue
new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%'
}).appendTo('#blue');

// Green (Success)
new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#4CAF50',
    trackColor: '#E8F5E9'
}).appendTo('#green');

// Orange (Warning)
new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#FF9800',
    trackColor: '#FFE8D6'
}).appendTo('#orange');

// Red (Danger)
new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#F44336',
    trackColor: '#FFEBEE'
}).appendTo('#red');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Default Blue</h4>
    <div id="blue"></div>
    
    <h4 style="margin-top: 20px;">Success Green</h4>
    <div id="green"></div>
    
    <h4 style="margin-top: 20px;">Warning Orange</h4>
    <div id="orange"></div>
    
    <h4 style="margin-top: 20px;">Danger Red</h4>
    <div id="red"></div>
</div>

<script>
// Default Blue
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%'
}).appendTo('#blue');

// Green (Success)
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#4CAF50',
    trackColor: '#E8F5E9'
}).appendTo('#green');

// Orange (Warning)
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#FF9800',
    trackColor: '#FFE8D6'
}).appendTo('#orange');

// Red (Danger)
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px',
    width: '100%',
    progressColor: '#F44336',
    trackColor: '#FFEBEE'
}).appendTo('#red');
</script>
```

### Secondary Progress Color

Customize colors for primary and secondary progress independently:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Video Playback (Red playing, Yellow buffered)</h4>
    <div id="videoBuffer"></div>
    
    <h4 style="margin-top: 20px;">Download & Verification</h4>
    <div id="downloadVerify"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Video Buffering
new ProgressBar({
    type: 'Linear',
    value: 35,
    secondaryProgress: 65,
    height: '20px',
    width: '100%',
    progressColor: '#FF6B6B',
    secondaryProgressColor: '#FFD93D',
    trackColor: '#E0E0E0'
}).appendTo('#videoBuffer');

// Download with Verification
new ProgressBar({
    type: 'Linear',
    value: 50,
    secondaryProgress: 80,
    height: '25px',
    width: '100%',
    progressColor: '#4CAF50',
    secondaryProgressColor: '#81C784',
    trackColor: '#E8F5E9'
}).appendTo('#downloadVerify');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Video Playback (Red playing, Yellow buffered)</h4>
    <div id="videoBuffer"></div>
    
    <h4 style="margin-top: 20px;">Download & Verification</h4>
    <div id="downloadVerify"></div>
</div>

<script>
// Video Buffering
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 35,
    secondaryProgress: 65,
    height: '20px',
    width: '100%',
    progressColor: '#FF6B6B',
    secondaryProgressColor: '#FFD93D',
    trackColor: '#E0E0E0'
}).appendTo('#videoBuffer');

// Download with Verification
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    secondaryProgress: 80,
    height: '25px',
    width: '100%',
    progressColor: '#4CAF50',
    secondaryProgressColor: '#81C784',
    trackColor: '#E8F5E9'
}).appendTo('#downloadVerify');
</script>
```

### Conditional Colors

Change colors based on progress value (e.g., red below 33%, orange 33-66%, green above 66%):

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <input type="range" id="colorSlider" min="0" max="100" value="30" style="width: 100%; max-width: 400px;">
    <p>Progress: <span id="colorPercent">30</span>%</p>
    <div id="conditionalColor"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let conditionalBar: ProgressBar;
let currentValue = 30;

function getColors(value: number): { progress: string; track: string } {
    if (value < 33) {
        return { progress: '#F44336', track: '#FFEBEE' };  // Red
    } else if (value < 66) {
        return { progress: '#FF9800', track: '#FFE8D6' };  // Orange
    } else {
        return { progress: '#4CAF50', track: '#E8F5E9' };  // Green
    }
}

function initConditionalColor(): void {
    const colors = getColors(currentValue);
    
    if (conditionalBar) {
        conditionalBar.destroy();
    }
    
    conditionalBar = new ProgressBar({
        type: 'Linear',
        value: currentValue,
        height: '20px',
        width: '100%',
        progressColor: colors.progress,
        trackColor: colors.track
    });
    
    conditionalBar.appendTo('#conditionalColor');
}

const slider = document.getElementById('colorSlider') as HTMLInputElement;
const percentSpan = document.getElementById('colorPercent') as HTMLSpanElement;

slider.addEventListener('input', (e) => {
    currentValue = parseInt((e.target as HTMLInputElement).value);
    percentSpan.textContent = currentValue.toString();
    
    const colors = getColors(currentValue);
    conditionalBar.value = currentValue;
    conditionalBar.progressColor = colors.progress;
    conditionalBar.trackColor = colors.track;
});

initConditionalColor();
```

#### JavaScript

```html
<div style="margin: 20px;">
    <input type="range" id="colorSlider" min="0" max="100" value="30" style="width: 100%; max-width: 400px;">
    <p>Progress: <span id="colorPercent">30</span>%</p>
    <div id="conditionalColor"></div>
</div>

<script>
var conditionalBar;
var currentValue = 30;

function getColors(value) {
    if (value < 33) {
        return { progress: '#F44336', track: '#FFEBEE' };  // Red
    } else if (value < 66) {
        return { progress: '#FF9800', track: '#FFE8D6' };  // Orange
    } else {
        return { progress: '#4CAF50', track: '#E8F5E9' };  // Green
    }
}

function initConditionalColor() {
    var colors = getColors(currentValue);
    
    if (conditionalBar) {
        conditionalBar.destroy();
    }
    
    conditionalBar = new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: currentValue,
        height: '20px',
        width: '100%',
        progressColor: colors.progress,
        trackColor: colors.track
    });
    
    conditionalBar.appendTo('#conditionalColor');
}

var slider = document.getElementById('colorSlider');
var percentSpan = document.getElementById('colorPercent');

slider.addEventListener('input', function(e) {
    currentValue = parseInt(e.target.value);
    percentSpan.textContent = currentValue;
    
    var colors = getColors(currentValue);
    conditionalBar.value = currentValue;
    conditionalBar.progressColor = colors.progress;
    conditionalBar.trackColor = colors.track;
});

initConditionalColor();
</script>
```
```

## Value Ranges

### Custom Range Configuration

Use custom minimum and maximum values instead of default 0-100:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Standard Range (0-100)</h4>
    <div id="standard"></div>
    <p>Value: 50</p>
    
    <h4 style="margin-top: 20px;">Large Range (0-1000)</h4>
    <div id="large"></div>
    <p>Value: 500 out of 1000</p>
    
    <h4 style="margin-top: 20px;">Negative Range (-50 to 50)</h4>
    <div id="negative"></div>
    <p>Value: 0 (neutral position)</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Standard range
new ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: 100,
    value: 50,
    height: '20px',
    width: '100%'
}).appendTo('#standard');

// Large range (0-1000)
new ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: 1000,
    value: 500,
    height: '20px',
    width: '100%'
}).appendTo('#large');

// Negative range (-50 to 50)
new ProgressBar({
    type: 'Linear',
    minimum: -50,
    maximum: 50,
    value: 0,
    height: '20px',
    width: '100%'
}).appendTo('#negative');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Standard Range (0-100)</h4>
    <div id="standard"></div>
    <p>Value: 50</p>
    
    <h4 style="margin-top: 20px;">Large Range (0-1000)</h4>
    <div id="large"></div>
    <p>Value: 500 out of 1000</p>
    
    <h4 style="margin-top: 20px;">Negative Range (-50 to 50)</h4>
    <div id="negative"></div>
    <p>Value: 0 (neutral position)</p>
</div>

<script>
// Standard range
new ej.progressbar.ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: 100,
    value: 50,
    height: '20px',
    width: '100%'
}).appendTo('#standard');

// Large range (0-1000)
new ej.progressbar.ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: 1000,
    value: 500,
    height: '20px',
    width: '100%'
}).appendTo('#large');

// Negative range (-50 to 50)
new ej.progressbar.ProgressBar({
    type: 'Linear',
    minimum: -50,
    maximum: 50,
    value: 0,
    height: '20px',
    width: '100%'
}).appendTo('#negative');
</script>
```

### File Size Progress

Track file uploads/downloads using file sizes as range:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Upload Progress (in MB)</h4>
    <div id="fileProgress"></div>
    <p>Uploaded: <span id="uploadedMB">350</span> MB / <span id="totalMB">1000</span> MB</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const uploadedSize = 350;
const totalSize = 1000;

new ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: totalSize,
    value: uploadedSize,
    height: '25px',
    width: '100%'
}).appendTo('#fileProgress');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Upload Progress (in MB)</h4>
    <div id="fileProgress"></div>
    <p>Uploaded: <span id="uploadedMB">350</span> MB / <span id="totalMB">1000</span> MB</p>
</div>

<script>
var uploadedSize = 350;
var totalSize = 1000;

new ej.progressbar.ProgressBar({
    type: 'Linear',
    minimum: 0,
    maximum: totalSize,
    value: uploadedSize,
    height: '25px',
    width: '100%'
}).appendTo('#fileProgress');
</script>
```

## Radius Properties

### Circular Progress with Custom Radius

Customize the radius of circular progress bars to control size:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px; display: flex; gap: 20px; justify-content: space-around; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>Small Radius</h4>
        <div id="smallRadius" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Medium Radius</h4>
        <div id="mediumRadius" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Large Radius</h4>
        <div id="largeRadius" style="height: 200px; width: 200px;"></div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Small radius
new ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 80,
    height: '200px',
    width: '200px'
}).appendTo('#smallRadius');

// Medium radius
new ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 100,
    height: '200px',
    width: '200px'
}).appendTo('#mediumRadius');

// Large radius
new ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 130,
    height: '200px',
    width: '200px'
}).appendTo('#largeRadius');
```

#### JavaScript

```html
<div style="margin: 20px; display: flex; gap: 20px; justify-content: space-around; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>Small Radius</h4>
        <div id="smallRadius" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Medium Radius</h4>
        <div id="mediumRadius" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Large Radius</h4>
        <div id="largeRadius" style="height: 200px; width: 200px;"></div>
    </div>
</div>

<script>
// Small radius
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 80,
    height: '200px',
    width: '200px'
}).appendTo('#smallRadius');

// Medium radius
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 100,
    height: '200px',
    width: '200px'
}).appendTo('#mediumRadius');

// Large radius
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    radius: 130,
    height: '200px',
    width: '200px'
}).appendTo('#largeRadius');
</script>
```

### Donut Effect with Inner Radius

Create donut-style progress bars with inner radius (hollow center):

#### TypeScript

**HTML:**

```html
<div style="margin: 20px; display: flex; gap: 20px; justify-content: space-around; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>Wide Donut</h4>
        <div id="wideDonut" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Thin Donut Ring</h4>
        <div id="thinDonut" style="height: 200px; width: 200px;"></div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Wide donut
new ProgressBar({
    type: 'Circular',
    value: 60,
    radius: 100,
    innerRadius: 70,
    height: '200px',
    width: '200px'
}).appendTo('#wideDonut');

// Thin donut ring
new ProgressBar({
    type: 'Circular',
    value: 60,
    radius: 100,
    innerRadius: 85,
    height: '200px',
    width: '200px'
}).appendTo('#thinDonut');
```

#### JavaScript

```html
<div style="margin: 20px; display: flex; gap: 20px; justify-content: space-around; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>Wide Donut</h4>
        <div id="wideDonut" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>Thin Donut Ring</h4>
        <div id="thinDonut" style="height: 200px; width: 200px;"></div>
    </div>
</div>

<script>
// Wide donut
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 60,
    radius: 100,
    innerRadius: 70,
    height: '200px',
    width: '200px'
}).appendTo('#wideDonut');

// Thin donut ring
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 60,
    radius: 100,
    innerRadius: 85,
    height: '200px',
    width: '200px'
}).appendTo('#thinDonut');
</script>
```

### Corner Radius Styling

Control corner style with cornerRadius property (Square or Round):

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Square Corners</h4>
    <div id="square"></div>
    
    <h4 style="margin-top: 20px;">Rounded Corners</h4>
    <div id="round"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Square corners
new ProgressBar({
    type: 'Linear',
    value: 50,
    cornerRadius: 'Square',
    height: '20px',
    width: '100%'
}).appendTo('#square');

// Rounded corners
new ProgressBar({
    type: 'Linear',
    value: 50,
    cornerRadius: 'Round',
    height: '20px',
    width: '100%'
}).appendTo('#round');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Square Corners</h4>
    <div id="square"></div>
    
    <h4 style="margin-top: 20px;">Rounded Corners</h4>
    <div id="round"></div>
</div>

<script>
// Square corners
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    cornerRadius: 'Square',
    height: '20px',
    width: '100%'
}).appendTo('#square');

// Rounded corners
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    cornerRadius: 'Round',
    height: '20px',
    width: '100%'
}).appendTo('#round');
</script>
```
## Segments

### Linear Progress with Segments

Divide linear progress bars into segments:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Linear Progress with 5 Segments</h4>
    <div id="linearSegments"></div>
    <p>Progress: 65%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

new ProgressBar({
    type: 'Linear',
    value: 65,
    segmentCount: 5,
    height: '25px',
    width: '100%'
}).appendTo('#linearSegments');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Linear Progress with 5 Segments</h4>
    <div id="linearSegments"></div>
    <p>Progress: 65%</p>
</div>

<script>
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 65,
    segmentCount: 5,
    height: '25px',
    width: '100%'
}).appendTo('#linearSegments');
</script>
```

### Circular Progress with Segments

Divide circular progress bars into visible segments:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px; display: flex; gap: 30px; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>4 Segments</h4>
        <div id="fourSegments" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>6 Segments</h4>
        <div id="sixSegments" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>8 Segments</h4>
        <div id="eightSegments" style="height: 200px; width: 200px;"></div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// 4 segments
new ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 4,
    height: '200px',
    width: '200px'
}).appendTo('#fourSegments');

// 6 segments
new ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 6,
    height: '200px',
    width: '200px'
}).appendTo('#sixSegments');

// 8 segments
new ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 8,
    height: '200px',
    width: '200px'
}).appendTo('#eightSegments');
```

#### JavaScript

```html
<div style="margin: 20px; display: flex; gap: 30px; flex-wrap: wrap;">
    <div style="text-align: center;">
        <h4>4 Segments</h4>
        <div id="fourSegments" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>6 Segments</h4>
        <div id="sixSegments" style="height: 200px; width: 200px;"></div>
    </div>
    
    <div style="text-align: center;">
        <h4>8 Segments</h4>
        <div id="eightSegments" style="height: 200px; width: 200px;"></div>
    </div>
</div>

<script>
// 4 segments
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 4,
    height: '200px',
    width: '200px'
}).appendTo('#fourSegments');

// 6 segments
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 6,
    height: '200px',
    width: '200px'
}).appendTo('#sixSegments');

// 8 segments
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75,
    segmentCount: 8,
    height: '200px',
    width: '200px'
}).appendTo('#eightSegments');
</script>
```

### Segment Spacing

Control spacing between segments using segmentSpacing property:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>No Spacing</h4>
    <div id="noSpacing" style="height: 200px; width: 200px;"></div>
    
    <h4 style="margin-top: 20px;">Small Spacing</h4>
    <div id="smallSpacing" style="height: 200px; width: 200px;"></div>
    
    <h4 style="margin-top: 20px;">Large Spacing</h4>
    <div id="largeSpacing" style="height: 200px; width: 200px;"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// No spacing
new ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 0,
    height: '200px',
    width: '200px'
}).appendTo('#noSpacing');

// Small spacing
new ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 2,
    height: '200px',
    width: '200px'
}).appendTo('#smallSpacing');

// Large spacing
new ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 5,
    height: '200px',
    width: '200px'
}).appendTo('#largeSpacing');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>No Spacing</h4>
    <div id="noSpacing" style="height: 200px; width: 200px;"></div>
    
    <h4 style="margin-top: 20px;">Small Spacing</h4>
    <div id="smallSpacing" style="height: 200px; width: 200px;"></div>
    
    <h4 style="margin-top: 20px;">Large Spacing</h4>
    <div id="largeSpacing" style="height: 200px; width: 200px;"></div>
</div>

<script>
// No spacing
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 0,
    height: '200px',
    width: '200px'
}).appendTo('#noSpacing');

// Small spacing
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 2,
    height: '200px',
    width: '200px'
}).appendTo('#smallSpacing');

// Large spacing
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 100,
    segmentCount: 6,
    segmentSpacing: 5,
    height: '200px',
    width: '200px'
}).appendTo('#largeSpacing');
</script>
```
```

## Thickness Control

### Track and Progress Thickness

Customize thickness (width) of track and progress bars independently:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Thin Progress</h4>
    <div id="thinThick"></div>
    
    <h4 style="margin-top: 20px;">Medium Progress</h4>
    <div id="mediumThick"></div>
    
    <h4 style="margin-top: 20px;">Thick Progress</h4>
    <div id="thickThick"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Thin bar
new ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 2,
    progressThickness: 2,
    height: '20px',
    width: '100%'
}).appendTo('#thinThick');

// Medium bar
new ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 8,
    progressThickness: 8,
    height: '20px',
    width: '100%'
}).appendTo('#mediumThick');

// Thick bar
new ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 20,
    progressThickness: 20,
    height: '30px',
    width: '100%'
}).appendTo('#thickThick');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Thin Progress</h4>
    <div id="thinThick"></div>
    
    <h4 style="margin-top: 20px;">Medium Progress</h4>
    <div id="mediumThick"></div>
    
    <h4 style="margin-top: 20px;">Thick Progress</h4>
    <div id="thickThick"></div>
</div>

<script>
// Thin bar
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 2,
    progressThickness: 2,
    height: '20px',
    width: '100%'
}).appendTo('#thinThick');

// Medium bar
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 8,
    progressThickness: 8,
    height: '20px',
    width: '100%'
}).appendTo('#mediumThick');

// Thick bar
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    trackThickness: 20,
    progressThickness: 20,
    height: '30px',
    width: '100%'
}).appendTo('#thickThick');
</script>
```

### Secondary Progress Thickness

Customize thickness for primary and secondary progress independently (useful for buffer scenarios):

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Equal Thickness (Buffering)</h4>
    <div id="equalThick"></div>
    
    <h4 style="margin-top: 20px;">Thicker Secondary</h4>
    <div id="thickerSecondary"></div>
    
    <h4 style="margin-top: 20px;">Thinner Primary</h4>
    <div id="thinnerPrimary"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Equal thickness
new ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '30px',
    width: '100%',
    trackThickness: 25,
    progressThickness: 25,
    secondaryProgressThickness: 25,
    progressColor: '#2196F3',
    secondaryProgressColor: '#90CAF9',
    trackColor: '#E3F2FD'
}).appendTo('#equalThick');

// Thicker secondary
new ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '30px',
    width: '100%',
    trackThickness: 15,
    progressThickness: 15,
    secondaryProgressThickness: 20,
    progressColor: '#FF6B6B',
    secondaryProgressColor: '#FFB347',
    trackColor: '#FFF5E1'
}).appendTo('#thickerSecondary');

// Thinner primary
new ProgressBar({
    type: 'Linear',
    value: 50,
    secondaryProgress: 85,
    height: '30px',
    width: '100%',
    trackThickness: 20,
    progressThickness: 10,
    secondaryProgressThickness: 20,
    progressColor: '#4CAF50',
    secondaryProgressColor: '#81C784',
    trackColor: '#E8F5E9'
}).appendTo('#thinnerPrimary');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Equal Thickness (Buffering)</h4>
    <div id="equalThick"></div>
    
    <h4 style="margin-top: 20px;">Thicker Secondary</h4>
    <div id="thickerSecondary"></div>
    
    <h4 style="margin-top: 20px;">Thinner Primary</h4>
    <div id="thinnerPrimary"></div>
</div>

<script>
// Equal thickness
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '30px',
    width: '100%',
    trackThickness: 25,
    progressThickness: 25,
    secondaryProgressThickness: 25,
    progressColor: '#2196F3',
    secondaryProgressColor: '#90CAF9',
    trackColor: '#E3F2FD'
}).appendTo('#equalThick');

// Thicker secondary
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,
    height: '30px',
    width: '100%',
    trackThickness: 15,
    progressThickness: 15,
    secondaryProgressThickness: 20,
    progressColor: '#FF6B6B',
    secondaryProgressColor: '#FFB347',
    trackColor: '#FFF5E1'
}).appendTo('#thickerSecondary');

// Thinner primary
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    secondaryProgress: 85,
    height: '30px',
    width: '100%',
    trackThickness: 20,
    progressThickness: 10,
    secondaryProgressThickness: 20,
    progressColor: '#4CAF50',
    secondaryProgressColor: '#81C784',
    trackColor: '#E8F5E9'
}).appendTo('#thinnerPrimary');
</script>
```

## Runtime Validation Checklist

After implementing customization, verify:

- [ ] Container elements have explicit `id` attributes
- [ ] Width/height dimensions render without clipping
- [ ] Colors display correctly (progress, track, secondary)
- [ ] Radius properties apply (circular, semi-circular, innerRadius)
- [ ] Corner radius renders (Round vs. Square)
- [ ] Segments display with proper spacing
- [ ] Thickness values (track, progress, secondary) render correctly
- [ ] Responsive sizing adjusts with container
- [ ] Minimum/maximum values control progress range
- [ ] Device pixel ratio and zoom levels don't distort appearance

## Combined Mistakes and Future References

### Mistake 1: Not Specifying Container ID
**Wrong:**
```typescript
new ProgressBar({ type: 'Linear', value: 50 }).appendTo('');  // Empty ID
```
**Correct:**
```typescript
new ProgressBar({ type: 'Linear', value: 50 }).appendTo('#myProgress');  // Valid ID
```
**Impact:** Component won't render or renders to wrong location

### Mistake 2: Mixing Percentage and Pixel Thickness
**Wrong:**
```typescript
new ProgressBar({
    trackThickness: '50%',  // Percentage not supported
    progressThickness: 10
})
```
**Correct:**
```typescript
new ProgressBar({
    trackThickness: 15,  // Pixel values only
    progressThickness: 10
})
```
**Impact:** Thickness values ignored, rendering with default

### Mistake 3: Ignoring Radius Constraints
**Wrong:**
```typescript
new ProgressBar({
    type: 'Linear',  // Linear doesn't support radius
    radius: 100
})
```
**Correct:**
```typescript
new ProgressBar({
    type: 'Circular',  // Use Circular for radius
    radius: 100
})
```
**Impact:** Radius property ignored for linear progress

### Mistake 4: Secondary Progress Without Primary Range
**Wrong:**
```typescript
new ProgressBar({
    secondaryProgress: 80,
    value: undefined  // Missing primary value
})
```
**Correct:**
```typescript
new ProgressBar({
    value: 50,  // Set primary progress first
    secondaryProgress: 80
})
```
**Impact:** Secondary progress doesn't render properly

### Mistake 5: Not Destroying Before Recreating
**Wrong:**
```typescript
const bar = new ProgressBar(...);
bar.appendTo('#container');
// Later: create another without destroying
const bar2 = new ProgressBar(...);
bar2.appendTo('#container');  // Conflict
```
**Correct:**
```typescript
let bar: ProgressBar;
if (bar) bar.destroy();  // Destroy existing
bar = new ProgressBar(...);
bar.appendTo('#container');
```
**Impact:** Multiple instances conflict, memory leaks, rendering issues

---

**See Also:**
- [Getting Started](./getting-started.md) - Basic setup
- [Types and Shapes](./types-and-shapes.md) - Progress bar types
- [Progress Modes](./progress-modes.md) - Determinate, Indeterminate, Buffer modes
```
