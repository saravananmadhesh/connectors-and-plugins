# Customization and Styling

## Table of Contents
- [Segments](#segments)
  - [Basic Segmentation](#basic-segmentation)
  - [Segment Scenarios](#segment-scenarios)
  - [Segment Best Practices](#segment-best-practices)
- [Thickness Configuration](#thickness-configuration)
  - [Track Thickness](#track-thickness)
  - [Progress Thickness](#progress-thickness)
  - [Secondary Progress Thickness](#secondary-progress-thickness)
  - [Thickness for Circular Bars](#thickness-for-circular-bars)
  - [Thickness Best Practices](#thickness-best-practices)
- [Radius Configuration](#radius-configuration)
  - [Radius Property](#radius-property)
  - [Corner Radius](#corner-radius)
  - [Radius for Circular Bars](#radius-for-circular-bars)
  - [Common Radius Values](#common-radius-values)
- [Inner Radius](#inner-radius)
  - [Basic Inner Radius](#basic-inner-radius)
  - [Inner Radius Values](#inner-radius-values)
  - [Donut with Annotation](#donut-with-annotation)
- [Color Customization](#color-customization)
  - [Progress Color](#progress-color)
  - [Track Color](#track-color)
  - [Secondary Progress Color](#secondary-progress-color)
  - [Semantic Color Indicators](#semantic-color-indicators)
- [CSS-Based Styling](#css-based-styling)
  - [CSS Classes for Progress Bar](#css-classes-for-progress-bar)
  - [Container Styling](#container-styling)
- [Theme Integration](#theme-integration)
  - [Available Themes](#available-themes)
  - [Switching Themes Dynamically](#switching-themes-dynamically)
- [Complete Customization Examples](#complete-customization-examples)
  - [Example 1: Multi-Step Wizard Progress](#example-1-multi-step-wizard-progress)
  - [Example 2: Status Dashboard](#example-2-status-dashboard)
  - [Example 3: Video Player Buffer](#example-3-video-player-buffer)

## Segments

Divide a progress bar into multiple segments to visualize progress of multiple sequential tasks. Each segment represents a step in the process.

### Basic Segmentation

```csharp
@(Html.EJS().ProgressBar("segmentedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .SegmentCount(4)    // Divide into 4 segments
    .Value(50)
    .Height("30")
    .Render()
)
```

With `SegmentCount(4)` and `Value(50)`, the progress bar shows 50% complete, which is 2 out of 4 segments filled.

### Segment Scenarios

**Installation Steps** - 5 segments for 5-step installation:
```csharp
@(Html.EJS().ProgressBar("installProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .SegmentCount(5)
    .Value(40)      // 2 of 5 steps complete
    .Height("30")
    .Render()
)
```

**Workflow Progress** - 6 segments for multi-step approval workflow:
```csharp
@(Html.EJS().ProgressBar("workflowProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .SegmentCount(6)
    .Value(50)      // 3 of 6 steps complete
    .Height("30")
    .Render()
)
```

**Form Steps** - 3 segments for multi-step form:
```csharp
@(Html.EJS().ProgressBar("formProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .SegmentCount(3)
    .Value(33)      // 1 of 3 steps complete
    .Height("30")
    .Render()
)
```

### Segment Best Practices

- Use segments when you have 3-8 distinct steps
- Avoid too many segments (>10) as they become hard to see
- Combine with labels or tooltips to identify each segment
- Update Value incrementally as each step completes
- Use 20%, 40%, 60%, 80%, 100% values for even progression

## Thickness Configuration

Control the visual weight of the progress bar by adjusting track thickness, progress thickness, and secondary progress thickness.

### Track Thickness

The `TrackThickness` property controls the background track width:

```csharp
@(Html.EJS().ProgressBar("thinTrack")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .TrackThickness(3)   // Thin track
    .Height("30")
    .Render()
)

@(Html.EJS().ProgressBar("normalTrack")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .TrackThickness(10)  // Normal track
    .Height("30")
    .Render()
)

@(Html.EJS().ProgressBar("thickTrack")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .TrackThickness(20)  // Thick track
    .Height("30")
    .Render()
)
```

### Progress Thickness

The `ProgressThickness` property controls the filled portion width:

```csharp
@(Html.EJS().ProgressBar("customProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressThickness(15)   // Thicker progress bar
    .TrackThickness(8)       // Thinner track
    .Height("30")
    .Render()
)
```

### Secondary Progress Thickness

For buffer states, control the secondary progress width:

```csharp
@(Html.EJS().ProgressBar("bufferProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(40)                      // Primary progress
    .SecondaryProgress(75)          // Secondary/buffer progress
    .ProgressThickness(12)          // Primary thickness
    .SecondaryProgressThickness(8)  // Secondary thickness
    .Height("30")
    .Render()
)
```

### Thickness for Circular Bars

```csharp
@(Html.EJS().ProgressBar("circularCustom")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(70)
    .TrackThickness(8)      // Track ring width
    .ProgressThickness(12)  // Progress ring width
    .Height("250")
    .Width("250")
    .Render()
)
```

### Thickness Best Practices

- For thin progress bars (height <20), use TrackThickness 2-5
- For normal bars (height 20-50), use TrackThickness 8-12
- For thick bars (height >50), use TrackThickness 15+
- Progress thickness should be slightly larger than track thickness for visibility
- Ensure ProgressThickness < Height for proper rendering

## Radius Configuration

Customize the shape of the progress bar endpoints and corners using radius properties.

### Radius Property

The `Radius` property rounds the corners of the progress bar:

```csharp
@(Html.EJS().ProgressBar("roundedEnds")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Radius("5")      // Round the progress bar ends
    .Height("30")
    .Render()
)
```

### Corner Radius

The `CornerRadius` property rounds the corners of the track and progress:

```csharp
@(Html.EJS().ProgressBar("roundedCorners")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .CornerRadius("10")  // More rounded corners
    .Height("30")
    .Render()
)
```

### Radius for Circular Bars

For circular progress bars, use Radius to control the overall circle border:

```csharp
@(Html.EJS().ProgressBar("roundedCircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(70)
    .Radius("120")    // Creates smooth circular appearance
    .Height("250")
    .Width("250")
    .Render()
)
```

### Common Radius Values

- **Radius 0**: Sharp corners (default)
- **Radius 5**: Slightly rounded (modern look)
- **Radius 10**: Well-rounded corners (softer appearance)
- **Radius 15+**: Fully rounded (pill-shaped)

```csharp
<!-- Sharp corners -->
@(Html.EJS().ProgressBar("sharp")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Radius("0")
    .Height("30")
    .Render()
)

<!-- Modern rounded -->
@(Html.EJS().ProgressBar("modern")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Radius("5")
    .Height("30")
    .Render()
)

<!-- Pill-shaped -->
@(Html.EJS().ProgressBar("pill")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Radius("15")
    .Height("30")
    .Render()
)
```

## Inner Radius

For circular and semi-circular progress bars, the `InnerRadius` property creates a donut-shaped appearance.

### Basic Inner Radius

```csharp
@(Html.EJS().ProgressBar("donutProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(70)
    .InnerRadius("80%")  // Create donut effect
    .Height("250")
    .Width("250")
    .Render()
)
```

### Inner Radius Values

Inner radius can be specified as:
- **Percentage**: `"50%"`, `"80%"` - Relative to circle size
- **Pixel values**: `"80"`, `"100"` - Absolute pixels

```csharp
<!-- Thin donut (large inner radius) -->
@(Html.EJS().ProgressBar("thinDonut")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .InnerRadius("90%")
    .Height("250")
    .Width("250")
    .Render()
)

<!-- Normal donut (medium inner radius) -->
@(Html.EJS().ProgressBar("normalDonut")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .InnerRadius("70%")
    .Height("250")
    .Width("250")
    .Render()
)

<!-- Thick donut (small inner radius) -->
@(Html.EJS().ProgressBar("thickDonut")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .InnerRadius("50%")
    .Height("250")
    .Width("250")
    .Render()
)
```

### Donut with Annotation

Combine inner radius with annotation to display text in the center:

```csharp
@(Html.EJS().ProgressBar("donutWithText")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .InnerRadius("75%")
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div style='font-size: 24px; font-weight: bold;'>75%</div>").Add(); })
    .Render()
)
```

## Color Customization

Customize the colors of progress bars to match your design:

### Progress Color

The `ProgressColor` property sets the filled portion color:

```csharp
@(Html.EJS().ProgressBar("greenProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#00a651")  // Green
    .Height("30")
    .Render()
)

@(Html.EJS().ProgressBar("blueProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#0078d4")  // Blue
    .Height("30")
    .Render()
)

@(Html.EJS().ProgressBar("purpleProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#7c3aed")  // Purple
    .Height("30")
    .Render()
)
```

### Track Color

The `TrackColor` property sets the background track color:

```csharp
@(Html.EJS().ProgressBar("customTrack")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#0078d4")  // Blue progress
    .TrackColor("#e0e0e0")     // Light gray track
    .Height("30")
    .Render()
)
```

### Secondary Progress Color

For buffer states, customize secondary progress color:

```csharp
@(Html.EJS().ProgressBar("bufferColors")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(40)
    .SecondaryProgress(75)
    .ProgressColor("#0078d4")           // Blue for played
    .SecondaryProgressColor("#90caf9")  // Light blue for buffered
    .TrackColor("#e0e0e0")              // Gray track
    .Height("30")
    .Render()
)
```

### Semantic Color Indicators

Use colors to indicate status:

```csharp
<!-- Success (Green) -->
@(Html.EJS().ProgressBar("successProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(100)
    .ProgressColor("#00a651")
    .Height("30")
    .Render()
)

<!-- Warning (Orange) -->
@(Html.EJS().ProgressBar("warningProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .ProgressColor("#ff9800")
    .Height("30")
    .Render()
)

<!-- Danger (Red) -->
@(Html.EJS().ProgressBar("dangerProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(25)
    .ProgressColor("#f44336")
    .Height("30")
    .Render()
)

<!-- Info (Blue) -->
@(Html.EJS().ProgressBar("infoProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .ProgressColor("#2196f3")
    .Height("30")
    .Render()
)
```

## CSS-Based Styling

Style progress bars using CSS classes:

### CSS Classes for Progress Bar

```html
<style>
    .custom-progress-bar {
        margin: 20px 0;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .success-progress .e-progress-outline {
        background-color: #e8f5e9;
    }
    
    .e-progress-track {
        background-color: #f0f0f0;
    }
    
    .large-progress .e-progress-bar {
        height: 40px;
    }
</style>

@(Html.EJS().ProgressBar("styledProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)
    .Height("30")
    .Render()
)
```

### Container Styling

Style the progress bar container:

```html
<style>
    .progress-container {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .progress-container h4 {
        margin-top: 0;
        color: #333;
    }
    
    .progress-container p {
        font-size: 12px;
        color: #666;
        margin: 5px 0 15px 0;
    }
</style>

<div class="progress-container">
    <h4>Processing Data</h4>
    <p>Completed: 45 of 100 items</p>
    @(Html.EJS().ProgressBar("containerProgress")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(45)
        .Height("30")
        .Render()
    )
</div>
```

## Theme Integration

Syncfusion Progress Bar automatically integrates with Syncfusion themes.

### Available Themes

The Progress Bar appearance changes based on the CSS theme loaded:

```html
<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/material.css" />

<!-- Bootstrap 5 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/bootstrap5.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/fluent.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/tailwind.css" />

<!-- High Contrast Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/highcontrast.css" />
```

### Switching Themes Dynamically

```html
<div>
    <label>Select Theme:</label>
    <select id="themeSelector" onchange="changeTheme(this.value)">
        <option value="material">Material</option>
        <option value="bootstrap5">Bootstrap 5</option>
        <option value="fluent">Fluent</option>
        <option value="tailwind">Tailwind</option>
    </select>
</div>

@(Html.EJS().ProgressBar("themeProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
)

<script>
    function changeTheme(themeName) {
        var themeLink = document.querySelector('link[rel="stylesheet"][href*="cdn.syncfusion"]');
        var newUrl = 'https://cdn.syncfusion.com/ej2/23.2.36/' + themeName + '.css';
        themeLink.href = newUrl;
    }
</script>
```

## Complete Customization Examples

### Example 1: Multi-Step Wizard Progress

```html
<div style="margin: 20px;">
    <h3>Account Setup Wizard</h3>
    
    <div style="margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Step 1: Personal Info</span>
            <span>Step 2: Address</span>
            <span>Step 3: Verification</span>
            <span>Step 4: Complete</span>
        </div>
        
        @(Html.EJS().ProgressBar("wizardProgress")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .SegmentCount(4)
            .Value(50)  <!-- 2 of 4 steps complete -->
            .ProgressColor("#0078d4")
            .TrackColor("#e0e0e0")
            .Height("8")
            .Radius(4)
            .Render()
        )
    </div>
</div>
```

### Example 2: Status Dashboard

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px;">
    
    <div style="text-align: center;">
        <h4>CPU Usage</h4>
        @(Html.EJS().ProgressBar("cpuStatus")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(45)
            .ProgressColor("#4caf50")  <!-- Green for normal -->
            .Height("150")
            .Width("150")
            .Render()
        )
        <p>45% - Normal</p>
    </div>
    
    <div style="text-align: center;">
        <h4>Memory Usage</h4>
        @(Html.EJS().ProgressBar("memoryStatus")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(78)
            .ProgressColor("#ff9800")  <!-- Orange for warning -->
            .Height("150")
            .Width("150")
            .Render()
        )
        <p>78% - Warning</p>
    </div>
    
    <div style="text-align: center;">
        <h4>Disk Usage</h4>
        @(Html.EJS().ProgressBar("diskStatus")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(92)
            .ProgressColor("#f44336")  <!-- Red for critical -->
            .Height("150")
            .Width("150")
            .Render()
        )
        <p>92% - Critical</p>
    </div>
    
</div>
```

### Example 3: Video Player Buffer

```html
<div style="margin: 20px;">
    <h3>Video Player</h3>
    
    @(Html.EJS().ProgressBar("videoBuffer")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(35)              <!-- Played -->
        .SecondaryProgress(72)  <!-- Buffered -->
        .ProgressColor("#0078d4")
        .SecondaryProgressColor("#90caf9")
        .TrackColor("#e0e0e0")
        .Height("6")
        .Radius("3")
        .Tooltip(tp => tp.
            Enable(true).
            Format("${value}% played")
        )
        .Render()
    )
    
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 5px; color: #666;">
        <span>0:00 (Watched)</span>
        <span id="totalTime">10:00</span>
    </div>
</div>
```
