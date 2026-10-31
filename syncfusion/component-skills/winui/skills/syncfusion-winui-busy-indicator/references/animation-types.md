# Animation Types in WinUI BusyIndicator

## Table of Contents
- [Overview](#overview)
- [AnimationType Property](#animationtype-property)
- [Available Animation Types](#available-animation-types)
- [DottedCircularFluent (Default)](#dottedcircularfluent-default)
- [DottedCircle](#dottedcircle)
- [DottedLinear](#dottedlinear)
- [DoubleCircle](#doublecircle)
- [LinearBox](#linearbox)
- [LinearFluent](#linearfluent)
- [LinearOscillatingBox](#linearoscillatingbox)
- [SingleCircle](#singlecircle)
- [Comparison and Selection Guide](#comparison-and-selection-guide)

## Overview

The BusyIndicator control provides **8 predefined animation types** to match different UI contexts and design requirements. Each animation has a unique visual style and movement pattern.

**Key Benefits:**
- No need to create custom animations
- Consistent, professional appearance
- Optimized for performance
- Matches Fluent Design guidelines

## AnimationType Property

Use the `AnimationType` property to select an animation:

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircle"/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedCircle;
```

**Property Details:**
- **Type:** `BusyIndicatorAnimationType` (enum)
- **Default:** `DottedCircularFluent`
- **Options:** 8 animation types (see below)

## Available Animation Types

The `BusyIndicatorAnimationType` enum provides these options:

1. **DottedCircularFluent** - Circular pattern with rotating dots (Fluent style)
2. **DottedCircle** - Simple circular rotation with dots
3. **DottedLinear** - Linear horizontal animation with dots
4. **DoubleCircle** - Two concentric circles rotating
5. **LinearBox** - Box-shaped linear animation
6. **LinearFluent** - Linear Fluent Design style
7. **LinearOscillatingBox** - Box with back-and-forth oscillation
8. **SingleCircle** - Single circle rotation

## DottedCircularFluent (Default)

Modern Fluent Design style with circular dot pattern.

**Visual Style:** Multiple dots arranged in a circle, rotating smoothly with fade effects.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircularFluent"
    BusyContent="Loading..."/>
```

**C#:**
```csharp
SfBusyIndicator busyIndicator = new SfBusyIndicator
{
    IsActive = true,
    AnimationType = BusyIndicatorAnimationType.DottedCircularFluent,
    BusyContent = "Loading..."
};
```

**Best For:**
- Modern WinUI applications
- Dashboard loading
- Default choice for most scenarios
- Fluent Design compliance

**Characteristics:**
- Smooth, professional appearance
- Medium visual prominence
- Works well with light and dark themes

## DottedCircle

Simple circular animation with evenly spaced dots.

**Visual Style:** Dots arranged in a circle with continuous rotation.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedCircle"
    BusyContent="Processing..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedCircle;
```

**Best For:**
- Clean, minimal UI
- Data loading screens
- General-purpose loading indicator
- When you need less visual emphasis than DottedCircularFluent

**Characteristics:**
- Simpler than DottedCircularFluent
- Consistent rotation speed
- Lower visual emphasis

## DottedLinear

Horizontal linear animation with moving dots.

**Visual Style:** Dots moving horizontally in a line.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DottedLinear"
    BusyContent="Uploading..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedLinear;
```

**Best For:**
- Progress-like scenarios (uploads, downloads)
- Horizontal layouts
- Subtle background activity
- List/grid data loading

**Characteristics:**
- Linear motion (left to right)
- Less visually prominent
- Suggests forward progress

## DoubleCircle

Two concentric circles rotating in opposite directions.

**Visual Style:** Two circles of different sizes, rotating in opposite directions.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DoubleCircle"
    BusyContent="Calculating..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.DoubleCircle;
```

**Best For:**
- Complex operations
- Long-running calculations
- Data synchronization
- Emphasizing prolonged activity

**Characteristics:**
- More visually complex
- Higher visual emphasis
- Good for operations taking 5+ seconds

## LinearBox

Box-shaped linear animation with smooth progression.

**Visual Style:** Rectangular box with flowing linear animation.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="LinearBox"
    BusyContent="Downloading..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearBox;
```

**Best For:**
- File operations
- Downloads/uploads
- Progress-oriented tasks
- Forms and wizards

**Characteristics:**
- Box container with internal animation
- Suggests determinate progress
- Works well in constrained spaces

## LinearFluent

Modern Fluent Design linear animation.

**Visual Style:** Smooth linear animation following Fluent Design principles.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="LinearFluent"
    BusyContent="Refreshing..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearFluent;
```

**Best For:**
- Refresh operations
- Inline loading in lists
- Modern Windows 11 applications
- Fluent Design compliance

**Characteristics:**
- Sleek, modern appearance
- Horizontal motion
- Subtle but noticeable

## LinearOscillatingBox

Box with back-and-forth oscillating animation.

**Visual Style:** Box with animation moving back and forth.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="LinearOscillatingBox"
    BusyContent="Saving..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearOscillatingBox;
```

**Best For:**
- Saving operations
- Background synchronization
- Periodic tasks
- Subtle activity indication

**Characteristics:**
- Oscillating (back-and-forth) motion
- Less prominent than circular animations
- Good for secondary loading indicators

## SingleCircle

Simple single circle rotation.

**Visual Style:** Single circular element rotating continuously.

**XAML:**
```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="SingleCircle"
    BusyContent="Please wait..."/>
```

**C#:**
```csharp
busyIndicator.AnimationType = BusyIndicatorAnimationType.SingleCircle;
```

**Best For:**
- Minimal UI
- Lightweight loading
- Background tasks
- Secondary indicators

**Characteristics:**
- Simplest animation
- Lowest visual emphasis
- Smallest footprint

## Comparison and Selection Guide

### Animation Comparison Table

| Animation Type | Visual Style | Emphasis | Best Use Case | Fluent Design |
|----------------|--------------|----------|---------------|---------------|
| **DottedCircularFluent** | Circular dots | Medium-High | General loading | Yes ✓ |
| **DottedCircle** | Circular dots | Medium | Simple loading | No |
| **DottedLinear** | Linear dots | Low-Medium | Progress tasks | No |
| **DoubleCircle** | Dual circles | High | Long operations | No |
| **LinearBox** | Box linear | Medium | File operations | No |
| **LinearFluent** | Linear smooth | Medium | Refresh/Inline | Yes ✓ |
| **LinearOscillatingBox** | Box oscillate | Low | Background tasks | No |
| **SingleCircle** | Single circle | Low | Minimal loading | No |

### Selection Guidelines

**For Modern WinUI Apps:**
```
Primary choice: DottedCircularFluent
Alternative: LinearFluent
```

**For Long Operations (>5 seconds):**
```
Use: DoubleCircle or DottedCircularFluent
```

**For Subtle Background Activity:**
```
Use: DottedLinear, LinearOscillatingBox, or SingleCircle
```

**For File/Upload Operations:**
```
Use: LinearBox, DottedLinear, or LinearFluent
```

**For Inline/List Loading:**
```
Use: LinearFluent or DottedLinear
```

### Switching Animations Dynamically

You can change animations at runtime based on context:

```csharp
private void UpdateAnimationType(OperationType operationType)
{
    switch (operationType)
    {
        case OperationType.DataLoad:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedCircularFluent;
            break;
            
        case OperationType.FileUpload:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearBox;
            break;
            
        case OperationType.BackgroundSync:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.LinearOscillatingBox;
            break;
            
        case OperationType.LongCalculation:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.DoubleCircle;
            break;
            
        default:
            busyIndicator.AnimationType = BusyIndicatorAnimationType.DottedCircularFluent;
            break;
    }
}
```

## Combining with Other Properties

Enhance animations with customization properties:

```xaml
<notification:SfBusyIndicator 
    IsActive="True"
    AnimationType="DoubleCircle"
    BusyContent="Processing large dataset..."
    Color="DodgerBlue"
    SizeFactor="0.7"
    DurationFactor="0.6"/>
```

**Result:** Larger, moderately-paced blue DoubleCircle animation.

## Performance Considerations

- All animations are GPU-accelerated
- No performance difference between animation types
- Safe to use multiple BusyIndicators simultaneously
- Animations pause automatically when IsActive = false

## Next Steps

- **Content:** See [content.md](content.md) to customize messages and positioning
- **Customization:** See [customization.md](customization.md) to adjust size, speed, and colors
