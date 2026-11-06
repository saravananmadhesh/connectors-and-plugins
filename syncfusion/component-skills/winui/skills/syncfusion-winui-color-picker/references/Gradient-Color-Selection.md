# Gradient Color Selection

## Table of Contents
- [Overview](#overview)
- [What is a Gradient Color](#what-is-a-gradient-color)
- [Linear Gradient Brushes](#linear-gradient-brushes)
  - [Programmatic Linear Gradient](#programmatic-linear-gradient)
  - [Interactive Linear Gradient](#interactive-linear-gradient)
  - [Adjusting Linear Gradient Angle](#adjusting-linear-gradient-angle)
  - [Linear Gradient Start and End Points](#linear-gradient-start-and-end-points)
- [Radial Gradient Brushes](#radial-gradient-brushes)
  - [Programmatic Radial Gradient](#programmatic-radial-gradient)
  - [Interactive Radial Gradient](#interactive-radial-gradient)
  - [Radial Gradient Direction](#radial-gradient-direction)
  - [Radial Gradient Origin and Center](#radial-gradient-origin-and-center)
- [Gradient Stops](#gradient-stops)
  - [Adding Gradient Stops](#adding-gradient-stops)
  - [Removing Gradient Stops](#removing-gradient-stops)
  - [Modifying Gradient Stop Colors](#modifying-gradient-stop-colors)
  - [Adjusting Gradient Stop Offsets](#adjusting-gradient-stop-offsets)
- [Gradient Opacity Control](#gradient-opacity-control)
- [Axis Input Options](#axis-input-options)
- [Event Handling](#event-handling)
- [Common Scenarios](#common-scenarios)
- [Edge Cases and Gotchas](#edge-cases-and-gotchas)

## Overview

This guide covers gradient color brush creation and manipulation in the SfColorPicker control, including linear and radial gradients with multiple color stops.

## What is a Gradient Color

A **gradient color** paints an area with multiple colors that smoothly blend into each other along an axis. Unlike solid colors, gradients create visual transitions between two or more colors.

**Gradient Types:**
- **Linear Gradient**: Colors blend along a straight line defined by start and end points
- **Radial Gradient**: Colors blend outward from a center point in a circular/elliptical pattern

**Key Components:**
- **GradientStops**: Define colors and their positions along the gradient axis
- **Offset**: Position of each color (0.0 = start, 1.0 = end)
- **Axis**: Direction/shape of the gradient blend

## Linear Gradient Brushes

Linear gradients blend colors along a straight line from a start point to an end point.

### Programmatic Linear Gradient

Create linear gradients in code using **LinearGradientBrush**:

**XAML:**
```xml
<editors:SfColorPicker x:Name="colorPicker">
    <editors:SfColorPicker.SelectedBrush>
        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="Yellow" Offset="0.0" />
            <GradientStop Color="Red" Offset="0.25" />
            <GradientStop Color="Blue" Offset="0.75" />
            <GradientStop Color="LimeGreen" Offset="1.0" />
        </LinearGradientBrush>
    </editors:SfColorPicker.SelectedBrush>
</editors:SfColorPicker>
```

**C#:**
```csharp
// Create linear gradient brush
LinearGradientBrush linearGradient = new LinearGradientBrush();
linearGradient.StartPoint = new Point(0, 0);  // Top-left
linearGradient.EndPoint = new Point(1, 1);    // Bottom-right

// Add gradient stops
linearGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Yellow, Offset = 0.0 });
linearGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Red, Offset = 0.25 });
linearGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Blue, Offset = 0.75 });
linearGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.LimeGreen, Offset = 1.0 });

// Assign to color picker
colorPicker.SelectedBrush = linearGradient;
```

**Common Linear Gradient Patterns:**

**Horizontal (Left to Right):**
```csharp
linearGradient.StartPoint = new Point(0, 0.5);
linearGradient.EndPoint = new Point(1, 0.5);
```

**Vertical (Top to Bottom):**
```csharp
linearGradient.StartPoint = new Point(0.5, 0);
linearGradient.EndPoint = new Point(0.5, 1);
```

**Diagonal (Top-Left to Bottom-Right):**
```csharp
linearGradient.StartPoint = new Point(0, 0);
linearGradient.EndPoint = new Point(1, 1);
```

### Interactive Linear Gradient

Enable interactive linear gradient creation:

```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.LinearGradientBrush;
```

**User Actions:**
1. Select "Linear" from the brush type dropdown
2. Click to add gradient stops on the gradient axis
3. Click a stop to select and modify its color
4. Drag stops to reposition them
5. Delete stops by selecting and pressing Delete (minimum 2 stops required)
6. Adjust angle or start/end points

### Adjusting Linear Gradient Angle

Control gradient angle using the angle input (when AxisInputOption is Simple):

```xml
<editors:SfColorPicker 
    AxisInputOption="Simple"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AxisInputOption = AxisInputOption.Simple;
colorPicker.BrushTypeOptions = BrushTypeOptions.LinearGradientBrush;
```

**Angle Range:** 0-359 degrees
- **0°**: Horizontal (left to right)
- **90°**: Vertical (top to bottom)
- **180°**: Horizontal (right to left)
- **270°**: Vertical (bottom to top)

**Programmatic Angle Conversion:**
```csharp
// Convert angle to start/end points
double angleRadians = angle * Math.PI / 180.0;
double endX = Math.Cos(angleRadians);
double endY = Math.Sin(angleRadians);

linearGradient.StartPoint = new Point(0.5, 0.5);
linearGradient.EndPoint = new Point(0.5 + endX / 2, 0.5 + endY / 2);
```

### Linear Gradient Start and End Points

For advanced control, use start and end point editors (when AxisInputOption is Advanced):

```xml
<editors:SfColorPicker 
    AxisInputOption="Advanced"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AxisInputOption = AxisInputOption.Advanced;
```

**Point Format:** X and Y values from 0.0 to 1.0 (relative to control bounds)

**Example Advanced Configuration:**
```csharp
linearGradient.StartPoint = new Point(0.2, 0.3);
linearGradient.EndPoint = new Point(0.8, 0.7);
```

## Radial Gradient Brushes

Radial gradients blend colors outward from a center point in a circular or elliptical pattern.

### Programmatic Radial Gradient

Create radial gradients using **RadialGradientBrush**:

**XAML:**
```xml
<editors:SfColorPicker x:Name="colorPicker">
    <editors:SfColorPicker.SelectedBrush>
        <RadialGradientBrush 
            GradientOrigin="0.5,0.5" 
            Center="0.5,0.5" 
            RadiusX="0.5" 
            RadiusY="0.5">
            <GradientStop Color="Yellow" Offset="0.0" />
            <GradientStop Color="Red" Offset="0.25" />
            <GradientStop Color="Blue" Offset="0.75" />
            <GradientStop Color="LimeGreen" Offset="1.0" />
        </RadialGradientBrush>
    </editors:SfColorPicker.SelectedBrush>
</editors:SfColorPicker>
```

**C#:**
```csharp
// Create radial gradient brush
RadialGradientBrush radialGradient = new RadialGradientBrush();
radialGradient.GradientOrigin = new Point(0.5, 0.5);  // Center of gradient
radialGradient.Center = new Point(0.5, 0.5);          // Center of ellipse
radialGradient.RadiusX = 0.5;                         // Horizontal radius
radialGradient.RadiusY = 0.5;                         // Vertical radius

// Add gradient stops
radialGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Yellow, Offset = 0.0 });
radialGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Red, Offset = 0.25 });
radialGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.Blue, Offset = 0.75 });
radialGradient.GradientStops.Add(
    new GradientStop() { Color = Colors.LimeGreen, Offset = 1.0 });

// Assign to color picker
colorPicker.SelectedBrush = radialGradient;
```

**Radial Gradient Properties:**
- **GradientOrigin**: Point where gradient starts (focal point)
- **Center**: Center point of the gradient ellipse
- **RadiusX**: Horizontal radius of the gradient
- **RadiusY**: Vertical radius of the gradient

### Interactive Radial Gradient

Enable interactive radial gradient creation:

```xml
<editors:SfColorPicker 
    BrushTypeOptions="RadialGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.BrushTypeOptions = BrushTypeOptions.RadialGradientBrush;
```

**User Actions:**
1. Select "Radial" from the brush type dropdown
2. Add gradient stops on the gradient axis
3. Modify colors by selecting stops
4. Adjust gradient origin, center, and radius
5. Choose from preset directions (Simple mode)

### Radial Gradient Direction

Use preset directions when AxisInputOption is Simple:

```xml
<editors:SfColorPicker 
    AxisInputOption="Simple"
    BrushTypeOptions="RadialGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AxisInputOption = AxisInputOption.Simple;
colorPicker.BrushTypeOptions = BrushTypeOptions.RadialGradientBrush;
```

**Available Directions:**
- **Center**: Origin and center both at (0.5, 0.5)
- **Top-Left**: Origin at (0, 0)
- **Top-Right**: Origin at (1, 0)
- **Bottom-Left**: Origin at (0, 1)
- **Bottom-Right**: Origin at (1, 1)

### Radial Gradient Origin and Center

For advanced control, use origin, center, and radius editors (Advanced mode):

```xml
<editors:SfColorPicker 
    AxisInputOption="Advanced"
    BrushTypeOptions="RadialGradientBrush"
    x:Name="colorPicker" />
```

```csharp
colorPicker.AxisInputOption = AxisInputOption.Advanced;
```

**Advanced Controls:**
- **GradientOrigin X/Y**: Focal point position (0.0 to 1.0)
- **Center X/Y**: Ellipse center position (0.0 to 1.0)
- **RadiusX**: Horizontal radius (0.0 to 1.0)
- **RadiusY**: Vertical radius (0.0 to 1.0)

**Example - Off-Center Gradient:**
```csharp
radialGradient.GradientOrigin = new Point(0.3, 0.3);  // Upper-left focal point
radialGradient.Center = new Point(0.5, 0.5);          // Center ellipse
radialGradient.RadiusX = 0.6;
radialGradient.RadiusY = 0.6;
```

## Gradient Stops

Gradient stops define the colors and their positions along the gradient.

### Adding Gradient Stops

**Programmatically:**
```csharp
GradientStop newStop = new GradientStop()
{
    Color = Colors.Orange,
    Offset = 0.5  // Middle of gradient
};
linearGradient.GradientStops.Add(newStop);
```

**Interactively:** Users click on the gradient axis to add stops.

### Removing Gradient Stops

**Programmatically:**
```csharp
// Remove specific stop
linearGradient.GradientStops.RemoveAt(2);

// Clear all stops
linearGradient.GradientStops.Clear();
```

**Interactively:** Select a stop and press Delete (minimum 2 stops required).

### Modifying Gradient Stop Colors

**Programmatically:**
```csharp
// Change existing stop color
linearGradient.GradientStops[1].Color = Colors.Purple;
```

**Interactively:** Click a stop to select it, then choose a new color from the color spectrum.

### Adjusting Gradient Stop Offsets

**Programmatically:**
```csharp
// Change stop position
linearGradient.GradientStops[1].Offset = 0.33;
```

**Interactively:** Drag stops along the gradient axis.

**Offset Range:** 0.0 (start) to 1.0 (end)

**Multiple Stops Example:**
```csharp
// Rainbow gradient
var rainbow = new LinearGradientBrush();
rainbow.StartPoint = new Point(0, 0.5);
rainbow.EndPoint = new Point(1, 0.5);

rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Red, Offset = 0.0 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Orange, Offset = 0.17 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Yellow, Offset = 0.33 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Green, Offset = 0.5 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Blue, Offset = 0.67 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Indigo, Offset = 0.83 });
rainbow.GradientStops.Add(new GradientStop() { Color = Colors.Violet, Offset = 1.0 });

colorPicker.SelectedBrush = rainbow;
```

## Gradient Opacity Control

Control the overall opacity of the gradient brush:

**Interactive Opacity Slider:**
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush"
    x:Name="colorPicker" />
```

Users can adjust opacity using the dedicated opacity slider shown when in gradient mode.

**Programmatic Opacity:**
```csharp
// Set opacity for entire gradient
linearGradient.Opacity = 0.7;  // 70% opacity
```

**Per-Stop Opacity:**
```csharp
// Individual stop with transparency
var transparentStop = new GradientStop()
{
    Color = Color.FromArgb(128, 255, 0, 0),  // 50% transparent red
    Offset = 0.5
};
linearGradient.GradientStops.Add(transparentStop);
```

## Axis Input Options

Control the complexity of gradient axis editing:

### Simple Mode (Angle/Direction)

```xml
<editors:SfColorPicker 
    AxisInputOption="Simple"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

**Linear:** Shows angle slider (0-359°)  
**Radial:** Shows direction dropdown (Center, Top-Left, etc.)

### Advanced Mode (Precise Values)

```xml
<editors:SfColorPicker 
    AxisInputOption="Advanced"
    BrushTypeOptions="LinearGradientBrush"
    x:Name="colorPicker" />
```

**Linear:** Shows StartPoint X/Y and EndPoint X/Y editors  
**Radial:** Shows GradientOrigin X/Y, Center X/Y, RadiusX, RadiusY editors

## Event Handling

### SelectedBrushChanged Event

Handle gradient brush changes:

```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush"
    SelectedBrushChanged="ColorPicker_SelectedBrushChanged"
    x:Name="colorPicker" />
```

```csharp
private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs args)
{
    if (args.NewBrush is LinearGradientBrush linearBrush)
    {
        System.Diagnostics.Debug.WriteLine("Linear Gradient Selected");
        System.Diagnostics.Debug.WriteLine($"Start: {linearBrush.StartPoint}");
        System.Diagnostics.Debug.WriteLine($"End: {linearBrush.EndPoint}");
        System.Diagnostics.Debug.WriteLine($"Stops: {linearBrush.GradientStops.Count}");
        
        foreach (var stop in linearBrush.GradientStops)
        {
            System.Diagnostics.Debug.WriteLine($"  Offset {stop.Offset}: {stop.Color}");
        }
    }
    else if (args.NewBrush is RadialGradientBrush radialBrush)
    {
        System.Diagnostics.Debug.WriteLine("Radial Gradient Selected");
        System.Diagnostics.Debug.WriteLine($"Origin: {radialBrush.GradientOrigin}");
        System.Diagnostics.Debug.WriteLine($"Center: {radialBrush.Center}");
        System.Diagnostics.Debug.WriteLine($"Radius: {radialBrush.RadiusX} x {radialBrush.RadiusY}");
        System.Diagnostics.Debug.WriteLine($"Stops: {radialBrush.GradientStops.Count}");
    }
}
```

## Common Scenarios

### Scenario 1: Sunset Gradient (Linear)
```csharp
var sunset = new LinearGradientBrush();
sunset.StartPoint = new Point(0.5, 0);
sunset.EndPoint = new Point(0.5, 1);
sunset.GradientStops.Add(new GradientStop() { Color = Colors.Orange, Offset = 0.0 });
sunset.GradientStops.Add(new GradientStop() { Color = Colors.Red, Offset = 0.5 });
sunset.GradientStops.Add(new GradientStop() { Color = Colors.Purple, Offset = 1.0 });
colorPicker.SelectedBrush = sunset;
```

### Scenario 2: Spotlight Effect (Radial)
```csharp
var spotlight = new RadialGradientBrush();
spotlight.GradientOrigin = new Point(0.5, 0.5);
spotlight.Center = new Point(0.5, 0.5);
spotlight.RadiusX = 0.8;
spotlight.RadiusY = 0.8;
spotlight.GradientStops.Add(new GradientStop() { Color = Colors.White, Offset = 0.0 });
spotlight.GradientStops.Add(new GradientStop() { Color = Colors.Black, Offset = 1.0 });
colorPicker.SelectedBrush = spotlight;
```

### Scenario 3: Gradient-Only Color Picker
```xml
<editors:SfColorPicker 
    BrushTypeOptions="LinearGradientBrush,RadialGradientBrush"
    AxisInputOption="Simple"
    x:Name="colorPicker" />
```
