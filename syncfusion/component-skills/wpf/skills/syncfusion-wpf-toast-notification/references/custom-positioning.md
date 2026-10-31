# Custom Toast Positioning

## Table of Contents

- [Overview](#overview)
- [Standard Placements](#standard-placements)
- [Positioning Methods](#positioning-methods)
- [Using HorizontalOffset and VerticalOffset](#using-horizontaloffset-and-verticaloffset)
- [Using Custom Placement with X and Y](#using-custom-placement-with-x-and-y)
- [Custom Positioning Examples](#custom-positioning-examples)
- [Key Positioning Properties](#key-positioning-properties)
- [Positioning Behavior](#positioning-behavior)
- [Best Practices](#best-practices)

## Overview

Custom toast positioning allows you to display notifications at specific screen coordinates beyond the standard 8 placement options, providing greater flexibility in notification placement. The SfToastNotification control offers two approaches for custom positioning:

1. **Offset-based positioning:** Use `HorizontalOffset` and `VerticalOffset` with standard placements
2. **Absolute positioning:** Use `X` and `Y` coordinates with `Placement = ToastPlacement.Custom`

---

## Standard Placements

While WPF Toast Control provides 8 standard placements, you can use custom positioning for more precise control:

| Placement | Description |
|-----------|-------------|
| TopLeft | Top-left corner |
| TopCenter | Top-center position |
| TopRight | Top-right corner |
| LeftCenter | Left-center position |
| RightCenter | Right-center position |
| BottomLeft | Bottom-left corner |
| BottomCenter | Bottom-center position |
| BottomRight | Bottom-right corner (default) |

---

## Positioning Methods

### Method 1: Offset-Based Positioning

Apply `HorizontalOffset` and `VerticalOffset` to adjust the toast position relative to a standard placement:

```csharp
// Adjust position relative to standard placement
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.BottomRight,
    Title = "Offset Toast",
    Message = "This toast is displayed with custom offsets.",
    HorizontalOffset = -50.0,   // 50 pixels to the left
    VerticalOffset = 20.0       // 20 pixels down
});
```

### Method 2: Absolute Positioning

Use `Placement = ToastPlacement.Custom` with `X` and `Y` coordinates for absolute screen positioning:

```csharp
// Display at exact screen coordinates
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    Title = "Custom Position",
    Message = "Toast at exact coordinates",
    X = 200,    // 200 pixels from left
    Y = 450     // 450 pixels from top
});
```

---

## Using HorizontalOffset and VerticalOffset

The `HorizontalOffset` and `VerticalOffset` properties adjust the toast position relative to its selected placement. These values can be positive or negative.

### Example: TopRight Placement with Offset

```csharp
// Position in top-right corner with inset
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.TopRight,
    HorizontalOffset = -20.0,   // 20 pixels left from right edge
    VerticalOffset = 20.0,      // 20 pixels down from top
    Title = "Notification",
    Message = "Top-right with custom offset"
});
```

### Example: BottomLeft Placement with Offset

```csharp
// Position in bottom-left corner with inset
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.BottomLeft,
    HorizontalOffset = 20.0,    // 20 pixels right from left edge
    VerticalOffset = -20.0,     // 20 pixels up from bottom
    Title = "Alert",
    Message = "Bottom-left with custom offset"
});
```

---

## Using Custom Placement with X and Y

When `Placement` is set to `ToastPlacement.Custom`, the `X` and `Y` properties specify the exact screen coordinates.

## Custom Positioning Examples

### Center of Screen

```csharp
double screenWidth = SystemParameters.PrimaryScreenWidth;
double screenHeight = SystemParameters.PrimaryScreenHeight;

// Calculate center position (assuming toast width/height ~300x100)
double centerX = (screenWidth - 300) / 2;
double centerY = (screenHeight - 100) / 2;

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = centerX,
    Y = centerY,
    Title = "Centered",
    Message = "Toast centered on screen"
});
```

### Multiple Toasts at Different Positions

```csharp
// First toast - top-left
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 50,
    Y = 50,
    Title = "Position 1",
    Message = "Top-left area",
    Severity = ToastSeverity.Info
});

// Second toast - center
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 400,
    Y = 250,
    Title = "Position 2",
    Message = "Center area",
    Severity = ToastSeverity.Success
});

// Third toast - bottom-right
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 800,
    Y = 500,
    Title = "Position 3",
    Message = "Bottom-right area",
    Severity = ToastSeverity.Warning
});
```

### Dashboard Layout with Quadrants

```csharp
// Position notifications in each quadrant of the screen
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 50,
    Y = 50,
    Title = "Sales Widget",
    Message = "Sales increased by 15%",
    Severity = ToastSeverity.Success
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 950,
    Y = 50,
    Title = "Traffic Widget",
    Message = "Traffic spike detected",
    Severity = ToastSeverity.Warning
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 50,
    Y = 650,
    Title = "Users Widget",
    Message = "New user registered",
    Severity = ToastSeverity.Info
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 950,
    Y = 650,
    Title = "Errors Widget",
    Message = "Error detected",
    Severity = ToastSeverity.Error
});
```

### Responsive Positioning Based on Screen Size

```csharp
double screenWidth = SystemParameters.PrimaryScreenWidth;
double screenHeight = SystemParameters.PrimaryScreenHeight;

// Calculate responsive position based on screen dimensions
double xPosition = screenWidth - 350;   // Right side with margin
double yPosition = screenHeight - 150;  // Bottom with margin

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = xPosition,
    Y = yPosition,
    Title = "Responsive",
    Message = "Positioned responsive to screen size"
});
```

### System Monitoring Dashboard

```csharp
// CPU Monitor - Top Left
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 50,
    Y = 100,
    Title = "CPU Monitor",
    Message = "CPU usage: 75%",
    Severity = ToastSeverity.Warning
});

// Memory Monitor - Top Center
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 400,
    Y = 100,
    Title = "Memory Monitor",
    Message = "Memory usage: 82%",
    Severity = ToastSeverity.Warning
});

// Disk Monitor - Top Right
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 750,
    Y = 100,
    Title = "Disk Monitor",
    Message = "Disk usage: 60%",
    Severity = ToastSeverity.Info
});

// Network Monitor - Bottom Center
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 400,
    Y = 600,
    Title = "Network Monitor",
    Message = "Network: 125 Mbps",
    Severity = ToastSeverity.Info
});
```

### Combining with Spacing Property

```csharp
// Set spacing for stacked notifications
SfToastNotification.Spacing = 20;

// Stack multiple toasts at same X position
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 100,
    Y = 100,
    Title = "Toast 1",
    Message = "First stacked notification",
    Severity = ToastSeverity.Info
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 100,
    Y = 140,  // 20px below first (Spacing value)
    Title = "Toast 2",
    Message = "Second stacked notification",
    Severity = ToastSeverity.Success
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.Custom,
    X = 100,
    Y = 180,  // 20px below second
    Title = "Toast 3",
    Message = "Third stacked notification",
    Severity = ToastSeverity.Warning
});
```

---

## Key Positioning Properties

### Offset-Based Properties

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `Placement` | ToastPlacement | Standard placements | Base placement for offset calculation |
| `HorizontalOffset` | double | ±∞ | Horizontal adjustment from placement (pixels) |
| `VerticalOffset` | double | ±∞ | Vertical adjustment from placement (pixels) |

### Absolute Positioning Properties

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `Placement` | ToastPlacement | Custom | Must be set to `ToastPlacement.Custom` |
| `X` | double | 0 to screen width | Distance from left edge (pixels) |
| `Y` | double | 0 to screen height | Distance from top edge (pixels) |

---

## Positioning Behavior

### Offset Positioning Behavior

- When using `HorizontalOffset` and `VerticalOffset` with standard placements, the values are relative to the placement
- Positive `HorizontalOffset` moves right; negative moves left
- Positive `VerticalOffset` moves down; negative moves up
- The placement anchor point remains the reference

### Custom Positioning Behavior

- When `Placement = ToastPlacement.Custom`, `X` and `Y` specify absolute screen coordinates
- `X` is measured from the left edge of the screen
- `Y` is measured from the top edge of the screen
- The top-left corner of the toast aligns with the specified (X, Y) coordinates
- `HorizontalOffset` and `VerticalOffset` are ignored when using custom placement

### Stacking Behavior

- Multiple toasts at the same position may stack on top of each other
- Use `Spacing` property to control distance between stacked toasts
- Different X/Y coordinates prevent overlapping

---

## Best Practices

### DO ✅

- ✓ Use offset-based positioning for placement adjustments (margin-like behavior)
- ✓ Use custom placement with X/Y for absolute positioning requirements
- ✓ Calculate screen dimensions for responsive layouts
- ✓ Use reasonable margin values (20-50px) from screen edges
- ✓ Combine with Spacing property for stacked notifications
- ✓ Test positioning on multiple screen resolutions
- ✓ Consider DPI scaling on high-resolution displays
- ✓ Use different X/Y values for multiple notifications to prevent overlap

### DON'T ❌

- ✗ Hardcode absolute positions for all screen sizes
- ✗ Position toasts completely off-screen
- ✗ Use extreme offset values
- ✗ Ignore screen boundaries
- ✗ Forget to set `Placement = ToastPlacement.Custom` for X/Y usage
- ✗ Mix offset and custom positioning approaches inconsistently
- ✗ Assume fixed screen dimensions

### Responsive Design Tips

1. **Calculate screen dimensions:**
   ```csharp
   double screenWidth = SystemParameters.PrimaryScreenWidth;
   double screenHeight = SystemParameters.PrimaryScreenHeight;
   ```

2. **Use percentage-based calculations:**
   ```csharp
   double x = screenWidth * 0.1;  // 10% from left
   double y = screenHeight * 0.9; // 90% from top
   ```

3. **Account for DPI:**
   ```csharp
   double dpi = SystemParameters.DpiX;
   double adjustedPosition = basePosition * (dpi / 96.0); // Standard DPI = 96
   ```
