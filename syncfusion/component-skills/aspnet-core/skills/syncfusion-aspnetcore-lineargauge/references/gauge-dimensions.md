# Gauge Dimensions and Sizing

## Table of Contents
- [Container Dimensions](#container-dimensions)
- [Pixel-Based Sizing](#pixel-based-sizing)
- [Percentage-Based Sizing](#percentage-based-sizing)
- [Orientation](#orientation)
- [Responsive Behavior](#responsive-behavior)
- [Margin Control](#margin-control)
- [Common Patterns](#common-patterns)

## Container Dimensions

The Linear Gauge dimensions are controlled using the `Height` and `Width` properties. These can be specified in pixels or percentages.

**Default Dimensions:**
- Height: 450px
- Width: 100% (parent container width)

When neither height nor width is specified, these defaults are applied.

## Pixel-Based Sizing

Use pixel values for fixed-size gauges that don't scale with the container.

```cshtml
<ejs-lineargauge id="linear" height="400px" width="800px">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Behavior:**
- Gauge renders with exactly 400px height and 800px width
- Does not scale when container is resized
- Useful for dashboards with fixed layout designs

**Pixel Sizing Example:**

```cshtml
<!-- Small gauge for sidebar -->
<ejs-lineargauge id="small" height="200px" width="400px">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<!-- Large gauge for main content -->
<ejs-lineargauge id="large" height="600px" width="1200px">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Percentage-Based Sizing

Use percentage values to make gauges scale responsively with their containers.

```cshtml
<div style="width: 100%; height: 500px;">
    <ejs-lineargauge id="linear" height="100%" width="100%">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

**Behavior:**
- Gauge scales to fill the parent container
- Responsive - adapts when window is resized
- Excellent for adaptive dashboard layouts

**Percentage Sizing Examples:**

```cshtml
<!-- Half-width gauge (responsive) -->
<div style="width: 50%; display: inline-block;">
    <ejs-lineargauge id="gauge1" height="100%" width="100%">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>

<!-- Full-width gauge (responsive) -->
<div style="width: 100%;">
    <ejs-lineargauge id="gauge2" height="400px" width="100%">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

## Orientation

The `Orientation` property controls the layout direction of the gauge.

**Horizontal Orientation:**
```cshtml
<ejs-lineargauge id="linear" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Vertical Orientation:**
```cshtml
<ejs-lineargauge id="linear" orientation="Vertical">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Behavior:**
- **Horizontal:** Axis runs left-to-right; typically taller than wide; good for dashboards
- **Vertical:** Axis runs top-to-bottom; typically narrower; resembles a thermometer

**Choosing Orientation:**
- Use **Horizontal** for progress bars, speed indicators, percentage displays
- Use **Vertical** for temperature gauges, level indicators, thermometer-style displays

## Responsive Behavior

The Linear Gauge automatically responds to window resize events.

**Example: Adaptive Dashboard:**

```cshtml
<style>
    .gauge-container {
        width: 100%;
        max-width: 800px;
        margin: 20px auto;
    }
</style>

<div class="gauge-container">
    <ejs-lineargauge id="responsive-gauge" height="100%" width="100%">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="75" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

The gauge listens to the `Resized` event and updates its dimensions automatically.

**Responsive Grid Layout:**

```cshtml
<style>
    .gauge-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }
</style>

<div class="gauge-grid">
    <div>
        <ejs-lineargauge id="gauge1" height="100%" width="100%">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
    <div>
        <ejs-lineargauge id="gauge2" height="100%" width="100%">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100"></e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
</div>
```

## Margin Control

By default, the Linear Gauge renders with margins. Use the `AllowMargin` property to control this.

**With Margins (Default):**
```cshtml
<ejs-lineargauge id="linear" allowMargin="true">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Without Margins (Full-fit):**
```cshtml
<ejs-lineargauge id="linear" allowMargin="false" width="100%" height="100%">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Full-Fit Setup:**
To fit the gauge perfectly to its container without margins:

```cshtml
<style>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
    .gauge-container {
        width: 100%;
        height: 100%;
    }
</style>

<div class="gauge-container">
    <ejs-lineargauge id="linear" 
                      allowMargin="false" 
                      width="100%" 
                      height="100%">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

**Note:** To use full-fit feature effectively:
1. Set `AllowMargin="false"`
2. Set `Width="100%"` and `Height="100%"`
3. Set container margin and padding to 0
4. Set parent element dimensions

## Common Patterns

**Pattern 1: Fixed Dashboard Gauge**
```cshtml
<ejs-lineargauge id="gauge" height="300px" width="600px" title="Server Load">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="65" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Pattern 2: Responsive Card Gauge**
```cshtml
<div style="width: 100%; max-width: 400px;">
    <ejs-lineargauge id="gauge" height="100%" width="100%" title="Memory Usage">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="80" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

**Pattern 3: Full-Screen Gauge**
```cshtml
<ejs-lineargauge id="gauge" 
                  height="100%" 
                  width="100%" 
                  allowMargin="false"
                  title="Primary Metric">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```
