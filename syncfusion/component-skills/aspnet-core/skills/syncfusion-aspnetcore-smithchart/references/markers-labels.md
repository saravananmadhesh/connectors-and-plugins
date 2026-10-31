# Markers and Data Labels in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Markers](#markers)
  - [Enabling Markers](#enabling-markers)
  - [Marker Customization](#marker-customization)
  - [Complete Marker Configuration Example](#complete-marker-configuration-example)
- [Data Labels](#data-labels)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Data Label Customization](#data-label-customization)
- [Combined Usage](#combined-usage)
  - [Basic Combined Usage](#basic-combined-usage)
  - [Enhanced Visual Hierarchy](#enhanced-visual-hierarchy)
- [Practical Examples](#practical-examples)
  - [Example 1: Measurement Point Identification](#example-1-measurement-point-identification)
  - [Example 2: Process Path Analysis](#example-2-process-path-analysis)
  - [Example 3: Comparative Analysis](#example-3-comparative-analysis)
  - [Example 4: High-Precision Technical Analysis](#example-4-high-precision-technical-analysis)
  - [Example 5: Dashboard with Minimal Markers](#example-5-dashboard-with-minimal-markers)
- [Best Practices](#best-practices)

## Overview

Markers and data labels enhance Smith Chart readability by identifying individual data points. Markers are visual symbols placed at each point, while data labels display point values. Both are disabled by default but can be enabled and customized independently.

## Markers

Markers are visual indicators placed at each data point on the Smith Chart series.

### Enabling Markers

Enable markers for a series by setting `visible="true"`:

```cshtml
<e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line" 
                               resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true">
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

### Marker Customization

Customize marker appearance with the following properties:

#### Width and Height

Control marker size:

```cshtml
<e-smithchartseries-marker visible="true" width="8" height="8">
</e-smithchartseries-marker>
```

- `width` - Marker width in pixels
- `height` - Marker height in pixels
- Typical range: 4-12 pixels
- Default: usually 5 pixels

#### Fill Color

Set marker color using the `fill` property:

```cshtml
<e-smithchartseries-marker visible="true" fill="blue">
</e-smithchartseries-marker>
```

Common colors:
- `red`, `green`, `blue`, `orange`, `purple`
- Hex values: `#FF0000`, `#00FF00`, etc.
- RGB: `rgb(255, 0, 0)`

#### Opacity

Control marker transparency:

```cshtml
<e-smithchartseries-marker visible="true" opacity="0.8">
</e-smithchartseries-marker>
```

- `0.5` - 50% transparent
- `0.8` - 80% opaque (default, very visible)
- `1.0` - Fully opaque

#### Border Customization

Add borders around markers:

```cshtml
<e-smithchartseries-marker visible="true">
    <e-series-marker-border width="2" color="darkblue">
    </e-series-marker-border>
</e-smithchartseries-marker>
```

Creates a circle marker with dark blue outline, useful for:
- Emphasizing data points
- Improving visibility on complex charts
- Creating layered visual hierarchy

#### Marker Shapes

Change the marker shape using the `shape` property:

```cshtml
<e-smithchartseries-marker visible="true" shape="Circle">
</e-smithchartseries-marker>
```

Available shapes:
- `Circle` - Default round marker
- `Rectangle` - Square markers
- `Triangle` - Triangular markers
- `Diamond` - Diamond-shaped markers
- `Pentagon` - Five-sided markers
- `Plus` - Plus sign marker
- `InvertedTriangle` - Inverted triangle

### Complete Marker Configuration Example

```cshtml
<e-smithchart-smithchartseries dataSource="MeasuredData" name="Measurement Points" 
                               resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true" width="10" height="10" fill="navy" opacity="0.9" shape="Circle">
        <e-series-marker-border width="1" color="white">
        </e-series-marker-border>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

## Data Labels

Data labels display values or identifiers at each data point, providing direct information without requiring tooltips.

### Enabling Data Labels

Enable data labels within the marker configuration:

```cshtml
<e-smithchartseries-marker visible="true">
    <e-series-marker-datalabel visible="true">
    </e-series-marker-datalabel>
</e-smithchartseries-marker>
```

### Data Label Customization

#### Text Styling

Customize label appearance using `textStyle`:

```cshtml
<e-series-marker-datalabel visible="true">
</e-series-marker-datalabel>
<script>
    function loaded(args) {
        window.smithchart = args.smithchart;
        args.smithchart.series[0].marker = {
            dataLabel: {
                visible: true,
                textStyle: {
                    fontSize: "12px",
                    fontWeight: "bold"
                }
            }
        };
        args.smithchart.refresh();
    }
</script>
```

Available properties:
- `fontFamily` - Font typeface (Arial, Verdana, etc.)
- `fontSize` - Text size in pixels (typical: 8-12px)
- `fontColor` - Text color
- `fontWeight` - Font weight (normal, bold)
- `fontStyle` - Font style (normal, italic)

#### Fill and Border

Add background to labels:

```cshtml
<e-series-marker-datalabel visible="true" fill="yellow" opacity="0.7">
    <e-series-marker-border width="1" color="black">
    </e-series-marker-border>
</e-series-marker-datalabel>
```

This creates visible label boxes, useful for:
- High-contrast environments
- Printed materials
- Professional presentations

#### Smart Labels

Enable automatic label positioning to prevent overlaps:

```cshtml
<e-smithchart-smithchartseries dataSource="DenseData" name="Data" enableSmartLabels="true" 
                               resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true">
        <e-series-marker-datalabel visible="true">
        </e-series-marker-datalabel>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

Smart labels:
- Detect overlapping labels automatically
- Reposition labels for readability
- Excellent for dense data points
- Essential for high-frequency measurements

## Combined Usage

Use markers and data labels together for comprehensive point identification:

### Basic Combined Usage

```cshtml
<e-smithchart-smithchartseries dataSource="RFMeasurement" name="RF Analysis" 
                               resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker>
        <e-series-marker-datalabel visible="true">
        </e-series-marker-datalabel>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>
```

### Enhanced Visual Hierarchy

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <!-- Primary series - prominent markers and labels -->
        <e-smithchart-smithchartseries dataSource="PrimaryData" name="Primary Measurement" fill="navy" enableSmartLabels="true" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker>
                <e-series-marker-datalabel visible="true" fill="lightyellow" opacity="0.9">
                </e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Secondary series - subtle markers, no labels -->
        <e-smithchart-smithchartseries dataSource="SecondaryData" name="Secondary Measurement" fill="lightblue" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="5" height="5" fill="gray" opacity="0.6">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>

<script>
    function loaded(args) {
        window.smithchart = args.smithchart;
        args.smithchart.series[0].marker = {
            dataLabel: {
                visible: true,
                textStyle: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "blue"
                }
            }
        };
        args.smithchart.refresh();
    }
</script>
```

## Practical Examples

### Example 1: Measurement Point Identification

Display specific measurement values:

```cshtml
<e-smithchart-smithchartseries dataSource="CircuitMeasurements" name="Component Testing" 
                               resistance="resistance" reactance="reactance">
    <e-smithchartseries-marker visible="true" width="7" height="7" fill="red">
        <e-series-marker-border width="1" color="darkred">
        </e-series-marker-border>
    </e-smithchartseries-marker>
</e-smithchart-smithchartseries>

```

### Example 2: Process Path Analysis

Show progression along a transmission line:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="ImpedancePath" name="Impedance Evolution" fill="purple" enableSmartLabels="true" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="8" height="8" fill="purple" shape="Circle">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 3: Comparative Analysis

Distinguish multiple measurement sets:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-smithchartseriescollection>
        <!-- Simulated data -->
        <e-smithchart-smithchartseries dataSource="SimulatedData" name="Simulation" fill="green" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="6" height="6" fill="darkgreen" shape="Diamond">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Measured data -->
        <e-smithchart-smithchartseries dataSource="MeasuredData" name="Measurement" fill="orange" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="6" height="6" fill="darkorange" shape="Circle">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>

        <!-- Calculated reference -->
        <e-smithchart-smithchartseries dataSource="CalculatedData" name="Calculated" fill="gray" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="6" height="6" fill="darkgray" shape="Rectangle">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 4: High-Precision Technical Analysis

Maximum detail for publication-quality charts:

```cshtml
<ejs-smithchart id="smithchart">
    <e-title text="RF Circuit Analysis - High Precision">
    </e-title>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="PrecisionData" name="Measured Impedance" 
                  fill="darkblue" width="2" enableSmartLabels="true" resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker>
                <e-series-marker-datalabel visible="true" fill="lightyellow" opacity="0.95">
                    </e-textstyle>
                </e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>

<script>
    function loaded(args) {
        window.smithchart = args.smithchart;
        args.smithchart.series[0].marker = {
            dataLabel: {
                textStyle: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "blue"
                }
            }
        };
        args.smithchart.refresh();
    }
</script>
```

### Example 5: Dashboard with Minimal Markers

Clean dashboard appearance with subtle markers:

```cshtml
<ejs-smithchart id="dashboard-chart">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="DashboardData" name="Status" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="4" height="4" fill="#0066CC" opacity="0.7">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Best Practices

1. **Size Appropriately** - Large markers are better for small datasets; tiny markers for dense data
2. **Use Smart Labels** - Always enable for multiple series or dense points
3. **Color Consistency** - Match marker colors to series colors for clarity
4. **Label Frequency** - Show labels for key points; hide for background series
5. **Contrast** - Ensure markers and labels contrast with background and series lines
6. **Test on Target Display** - Verify readability at intended screen size
7. **Performance** - Too many markers/labels on very large datasets may impact performance

Properly configured markers and data labels transform Smith Charts from technical visualizations into clear, informative presentations of RF and transmission line data.
