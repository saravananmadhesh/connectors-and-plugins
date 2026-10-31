# Customization

## Table of Contents
- [Colors and Theming](#colors-and-theming)
  - [Theme Selection](#theme-selection)
  - [Custom Color Styling](#custom-color-styling)
  - [State-Based Color Customization](#state-based-color-customization)
  - [Gradient Colors](#gradient-colors)
- [Thickness Customization](#thickness-customization)
  - [Basic Thickness Properties](#basic-thickness-properties)
  - [Responsive Thickness](#responsive-thickness)
  - [Thickness by Progress Type](#thickness-by-progress-type)
- [Radius and Corner Styling](#radius-and-corner-styling)
  - [Corner Radius for Linear Bars](#corner-radius-for-linear-bars)
  - [Radius for Circular Bars](#radius-for-circular-bars)
  - [Inner Radius for Donut Effect](#inner-radius-for-donut-effect)
- [Segmentation](#segmentation)
  - [Basic Segmentation](#basic-segmentation)
  - [Segmentation Use Cases](#segmentation-use-cases)
  - [Styled Segments](#styled-segments)
- [Advanced Styling Examples](#advanced-styling-examples)
  - [Example 1: Gradient with Animated Background](#example-1-gradient-with-animated-background)
  - [Example 2: Multi-Color Status Indicator](#example-2-multi-color-status-indicator)
- [CSS Variable Customization](#css-variable-customization)

## Colors and Theming

The Progress Bar component supports color customization through CSS classes and inline styles. You can customize the primary progress color, secondary progress color, and track background color.

### Theme Selection

Choose from built-in themes by updating your stylesheet reference:

```html
<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/material.css" />

<!-- Bootstrap Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/bootstrap.css" />

<!-- Fabric Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/fabric.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/fluent.css" />

<!-- High Contrast Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/highcontrast.css" />
```

Built-in themes provide complete styling consistency across all Syncfusion components.

### Custom Color Styling
Customize the color of progress, secondary progress, and track by using the progressColor, secondaryProgressColor and trackColor properties.

```cshtml
<ejs-progressbar id="customColor"
                 type="Linear" 
                 value="60" 
                 secondaryProgress="80"
                 minimum="0" 
                 maximum="100"
                 progressColor="#4CAF50"
                 trackColor="#E0E0E0"
                 secondaryProgressColor="#81C784">
</ejs-progressbar>
```

### State-Based Color Customization

Change colors based on progress state:

```cshtml
<ejs-progressbar id="stateProgress"
                 type="Linear"
                 value="45"
                 secondaryProgress="60"
                 minimum="0"
                 maximum="100"
                 trackColor="#E0E0E0"
                 progressColor="#FF9800"
                 secondaryProgressColor="#FFD180">
</ejs-progressbar>

<script>
function updateProgressState(value, bufferValue) {
  var pb = document.getElementById('stateProgress').ej2_instances[0];
  pb.value = value;
  pb.secondaryProgress = bufferValue;
  // State-based colors (no CSS)
  if (value < 25) {
    // Critical
    pb.progressColor = '#F44336';          
    pb.trackColor = '#FFEBEE';             
    pb.secondaryProgressColor = '#FFCDD2'; 
  } else if (value < 50) {
    // Warning
    pb.progressColor = '#FF9800';
    pb.trackColor = '#FFF3E0';
    pb.secondaryProgressColor = '#FFD180';
  } else {
    // Success
    pb.progressColor = '#4CAF50';          
    pb.trackColor = '#E8F5E9';             
    pb.secondaryProgressColor = '#A5D6A7'; 
  }

  // Apply changes immediately
  pb.dataBind(); 
}
</script>
```

### Gradient Colors

Apply gradient colors for sophisticated visual effects:

```cshtml
<ejs-progressbar id="gradientProgress"
                 type="Linear"
                 value="70"
                 minimum="0"
                 maximum="100"
                 trackColor="#E0E0E0"
                 secondaryProgress="85"
                 secondaryProgressColor="#B2DFDB"
                 load="onGradientLoad">
</ejs-progressbar>

<script>
function onGradientLoad(args) {
  // Multi-color gradient effect across the progress value range
  args.progressBar.rangeColors = [
    { color: "#FF6B6B", isGradient: true, start: 0,  end: 33 },
    { color: "#4ECDC4", isGradient: true, start: 33, end: 66 },
    { color: "#45B7D1", isGradient: true, start: 66, end: 100 }
  ];
}
</script>
```

## Thickness Customization

Control the thickness of the progress bar, track, and secondary progress independently.

### Basic Thickness Properties

```cshtml
<ejs-progressbar id="thickProgress" 
                  type="Linear" 
                  value="50"
                  secondaryProgress="85"
                  trackThickness="8"
                  progressThickness="8"
                  secondaryProgressThickness="6"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Properties:
- `trackThickness` - Background track thickness (pixels)
- `progressThickness` - Main progress fill thickness (pixels)
- `secondaryProgressThickness` - Secondary progress thickness (pixels)

### Responsive Thickness

Adjust thickness based on screen size:

```cshtml
<ejs-progressbar id="responsiveProgress"
                 type="Linear"
                 value="60"
                 trackThickness="8"
                 progressThickness="8"
                 minimum="0"
                 maximum="100"
                 loaded="onResponsiveLoaded">
</ejs-progressbar>

<script>
let pb;
let mq;
function applyResponsiveThickness() {
  if (!pb) return;
  const isMobile = mq.matches;
  pb.trackThickness = isMobile ? 6 : 8;      
  pb.progressThickness = isMobile ? 6 : 8;   
  pb.dataBind();  
  pb.refresh();   
}

function onResponsiveLoaded() {
  pb = document.getElementById('responsiveProgress').ej2_instances[0];

  mq = window.matchMedia('(max-width: 768px)');
  applyResponsiveThickness();

  // Update when screen size crosses breakpoint
  mq.addEventListener('change', applyResponsiveThickness);
}
</script>
```

### Thickness by Progress Type

Different thicknesses for different progress bar types:

```cshtml
<!-- Thin linear for subtle feedback -->
<ejs-progressbar id="thinLinear" 
                  type="Linear" 
                  value="40"
                  trackThickness="2"
                  progressThickness="2"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- Bold circular for dashboard -->
<ejs-progressbar id="boldCircular" 
                  type="Circular" 
                  value="75"
                  height="150px"
                  trackThickness="12"
                  progressThickness="12"
                  radius="80px"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

## Radius and Corner Styling

Customize the corner radius for rounded appearance.

### Corner Radius for Linear Bars

```cshtml
<ejs-progressbar id="roundedLinear" 
                  type="Linear" 
                  value="55"
                  cornerRadius="Square"
                  trackThickness="10"
                  progressThickness="10"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Properties:
- `cornerRadius` - Controls the corner style using predefined values (Auto, Round, Round4px, Square)

### Radius for Circular Bars

```cshtml
<!-- Custom circular radius -->
<ejs-progressbar id="customCircular" 
                  type="Circular" 
                  value="70"
                  height="200"
                  radius="100px"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### Inner Radius for Donut Effect

Create a donut/ring appearance by setting inner radius:

```cshtml
<ejs-progressbar id="donutProgress" 
                  type="Circular" 
                  value="60"
                  height="200px"
                  radius="100px"
                  innerRadius="80px"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

With `innerRadius`, the progress bar renders as a ring with:
- Outer edge at `radius`
- Inner empty space starting at `innerRadius`
- Visible stroke between inner and outer edges

## Segmentation

Divide a progress bar into multiple segments to visualize sequential or milestone-based progress.

### Basic Segmentation

```cshtml
<ejs-progressbar id="segmentedProgress" 
                  type="Linear" 
                  value="60"
                  segmentCount="5"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Creates 5 equal segments:
- Filled segments (0-60%): Show completed portion
- Empty segments (60-100%): Show remaining work

### Segmentation Use Cases

```cshtml
<!-- 3-step process -->
<ejs-progressbar id="threeStep" 
                  type="Linear" 
                  value="66"
                  segmentCount="3"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- 10-item task list -->
<ejs-progressbar id="itemProgress" 
                  type="Linear" 
                  value="50"
                  segmentCount="10"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- 4-phase project -->
<ejs-progressbar id="phaseProgress" 
                  type="Linear" 
                  value="75"
                  segmentCount="4"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### Styled Segments

Customize segment appearance:

```cshtml
<ejs-progressbar id="coloredSegments"
                 type="Linear" 
                 value="60"
                 segmentCount="5"
                 minimum="0" 
                 maximum="100"
                 loaded="onSegmentsLoaded">
</ejs-progressbar>

<script>
function onSegmentsLoaded() {
    var pb = document.getElementById('coloredSegments').ej2_instances[0];
    pb.segmentColor = ['#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9', '#E8F5E9'];
    pb.dataBind();
    setTimeout(() => pb.refresh(), 0); 
}
</script>
```

## Advanced Styling Examples

### Example 1: Gradient with Animated Background

```cshtml
<style>
    @@keyframes flow {
        0%, 100% { background-position: 0% center; }
        50% { background-position: 100% center; }
    }

    /* Wrapper for progress + overlay */
    #animatedGradientWrap {
        position: relative;
        width: 100%;
        max-width: 600px;
        --w: 50%;
        --h: 6px; /* thickness */
    }

    /* Animated gradient overlay (acts as progress fill) */
    #animatedGradientWrap .gradient-fill {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: var(--h);
        width: var(--w);
        z-index: 2;
        pointer-events: none;
        border-radius: 999px;

        background: linear-gradient(
            90deg,#FF6B6B 0%, #FF8E72 25%, #FFA502 50%, #FFB347 75%, #FFC87C 100%
        );
        background-size: 200% 100%;
        animation: flow 3s ease-in-out infinite;
    }
    #animatedGradient { position: relative; z-index: 1; }
</style>

<div id="animatedGradientWrap">
    <div class="gradient-fill"></div>

    <ejs-progressbar id="animatedGradient"
                     type="Linear"
                     value="50"
                     minimum="0"
                     maximum="100"
                     trackThickness="6"
                     progressThickness="6"
                     trackColor="#E0E0E0"
                     progressColor="transparent"
                     loaded="onAnimatedGradientLoaded"
                     valueChanged="onAnimatedGradientValueChanged">
        <e-progressbar-animation enable="false"></e-progressbar-animation>
    </ejs-progressbar>
</div>

<script>
    function syncAnimatedGradientWidth() {
        var pb = document.getElementById('animatedGradient').ej2_instances[0];
        document.getElementById('animatedGradientWrap')
            .style.setProperty('--w', pb.value + '%');
    }
    function onAnimatedGradientLoaded() {
        syncAnimatedGradientWidth();
    }
    function onAnimatedGradientValueChanged() {
        syncAnimatedGradientWidth();
    }
</script>
```

### Example 2: Multi-Color Status Indicator

```cshtml
<ejs-progressbar id="statusProgress"
                 type="Linear"
                 value="80"
                 minimum="0"
                 maximum="100"
                 trackColor="#E0E0E0"
                 progressColor="#F44336">
</ejs-progressbar>

<script>
function setStatus(progressId, value) {
    var pbEl = document.getElementById(progressId);
    var pb = pbEl.ej2_instances[0];

    // Clamp value to range
    value = Math.max(pb.minimum, Math.min(pb.maximum, value));
    console.log(value);
    // Update value
    pb.value = value;

    if (value <= 25) {
        pb.progressColor = '#F44336'; // critical
        pb.trackColor = '#FFEBEE';
    } else if (value <= 50) {
        pb.progressColor = '#FF9800'; // warning
        pb.trackColor = '#FFF3E0';
    } else if (value <= 75) {
        pb.progressColor = '#2196F3'; // info
        pb.trackColor = '#E3F2FD';
    } else {
        pb.progressColor = '#4CAF50'; // success
        pb.trackColor = '#E8F5E9';
    }
    pb.dataBind();
}
</script>
```

## CSS Variable Customization

Use CSS custom properties for dynamic theme switching:

```cshtml
<style>
  :root {
    --progress-color: #2196F3;
    --track-color: #E0E0E0;
    --secondary-color: #81D4FA;
    --thickness: 8;     /* number (px) */
  }
</style>

<script>
  function applyThemeToProgressBar() {
    const pb = document.getElementById('themeProgress')?.ej2_instances?.[0];
    if (!pb) { requestAnimationFrame(applyThemeToProgressBar); return; }

    const rootStyles = getComputedStyle(document.documentElement);

    const progress = rootStyles.getPropertyValue('--progress-color').trim();
    const track = rootStyles.getPropertyValue('--track-color').trim();
    const secondary = rootStyles.getPropertyValue('--secondary-color').trim();
    const thickness = parseInt(rootStyles.getPropertyValue('--thickness').trim(), 10) || 8;

    pb.progressColor = progress;
    pb.trackColor = track;
    pb.secondaryProgressColor = secondary;

    pb.trackThickness = thickness;
    pb.progressThickness = thickness;

    pb.dataBind();

     pb.refresh();  
  }

  function setTheme(themeName) {
    const root = document.documentElement;

    if (themeName === 'dark') {
      root.style.setProperty('--progress-color', '#BB86FC');
      root.style.setProperty('--track-color', '#2A2A2A');
      root.style.setProperty('--secondary-color', '#6200EE');
      root.style.setProperty('--thickness', '8');
    } else if (themeName === 'light') {
      root.style.setProperty('--progress-color', '#2196F3');
      root.style.setProperty('--track-color', '#E0E0E0');
      root.style.setProperty('--secondary-color', '#81D4FA');
      root.style.setProperty('--thickness', '8');
    } else if (themeName === 'green') {
      root.style.setProperty('--progress-color', '#4CAF50');
      root.style.setProperty('--track-color', '#F1F8E9');
      root.style.setProperty('--secondary-color', '#81C784');
      root.style.setProperty('--thickness', '8');
    }

    // Re-apply variables to ProgressBar
    applyThemeToProgressBar();
  }

  document.addEventListener('DOMContentLoaded', applyThemeToProgressBar);
</script>

<button type="button" onclick="setTheme('dark')">Dark Theme</button>
<button type="button" onclick="setTheme('light')">Light Theme</button>
<button type="button" onclick="setTheme('green')">Green Theme</button>

<ejs-progressbar id="themeProgress"
                 type="Linear"
                 value="55"
                 secondaryProgress="75"
                 minimum="0"
                 maximum="100"
                 cornerRadius="Round">
</ejs-progressbar>
```

---

Customize the Progress Bar to match your application's design language and branding requirements. Combine these techniques to create unique and visually appealing progress indicators.
