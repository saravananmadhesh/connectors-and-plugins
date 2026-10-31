# Custom Spacing Between Toasts

## Table of Contents
- [Overview](#overview)
- [Control Toast Spacing](#control-toast-spacing)
- [Default vs Custom Spacing](#default-vs-custom-spacing)
- [Spacing Examples](#spacing-examples)
- [Combining Spacing with Other Features](#combining-spacing-with-other-features)
- [Key Spacing Properties](#key-spacing-properties)
- [Best Practices](#best-practices)
- [Effect on Multiple Notifications](#effect-on-multiple-notifications)

## Overview

Custom spacing allows you to control the distance between multiple toast notifications, enabling you to create a more tailored and visually organized notification layout.

---

## Control Toast Spacing

Use the `Spacing` property to customize the distance between toast notifications displayed in corners:

```csharp
// Set custom spacing between toasts
SfToastNotification.Spacing = 20;  // 20 pixels between toasts
```

## Default vs Custom Spacing

| Scenario | Spacing | Result |
|----------|---------|--------|
| Default | 10 pixels | Compact notification layout |
| Compact | 5 pixels | Minimal spacing for dense layouts |
| Standard | 15-20 pixels | Balanced spacing (recommended) |
| Comfortable | 25-30 pixels | Extra space between notifications |

---

## Spacing Examples

### Compact Layout with Minimal Spacing

```csharp
// Create a compact notification area with minimal spacing
SfToastNotification.Spacing = 5;

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Notification 1",
    Message = "First compact message",
    Mode = ToastMode.Screen
});

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Notification 2",
    Message = "Second compact message",
    Mode = ToastMode.Screen
});
```

### Comfortable Layout with Extra Spacing

```csharp
// Create a comfortable notification area with extra spacing
SfToastNotification.Spacing = 30;

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Alert 1",
    Message = "Important message with extra spacing",
    Mode = ToastMode.Screen,
    Severity = ToastSeverity.Warning
});

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Alert 2",
    Message = "Another important message",
    Mode = ToastMode.Screen,
    Severity = ToastSeverity.Error
});
```

### Dynamic Spacing Based on Screen Size

```csharp
// Adjust spacing based on display density
double screenDpi = SystemParameters.LogicalPixelsPerInch;

if (screenDpi >= 192)  // High DPI (4K)
{
    SfToastNotification.Spacing = 25;
}
else if (screenDpi >= 144)  // Medium DPI (1440p)
{
    SfToastNotification.Spacing = 20;
}
else  // Standard DPI (1080p)
{
    SfToastNotification.Spacing = 15;
}

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Responsive Spacing",
    Message = "Spacing adapts to screen resolution",
    Mode = ToastMode.Screen
});
```

---

## Combining Spacing with Other Features

### Combining Custom Spacing with Placements

```csharp
// Display multiple toasts in same corner with custom spacing
SfToastNotification.Spacing = 20;

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Info",
    Message = "First information toast",
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.BottomRight
});

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Success",
    Message = "Operation completed successfully",
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.BottomRight,
    Severity = ToastSeverity.Success
});

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Warning",
    Message = "Please review this warning",
    Mode = ToastMode.Screen,
    Placement = ToastPlacement.BottomRight,
    Severity = ToastSeverity.Warning
});
```

### Combining Custom Spacing with Custom Positioning

```csharp
// Use corner spacing with custom horizontal/vertical positioning
SfToastNotification.Spacing = 15;

SfToastNotification.Show(this, new ToastOptions
{
    Title = "Custom Position 1",
    Message = "First custom positioned toast",
    Mode = ToastMode.Screen,
    HorizontalPosition = 100,
    VerticalPosition = 100
});

// Next toast will be spaced 15 pixels from the first
SfToastNotification.Show(this, new ToastOptions
{
    Title = "Custom Position 2",
    Message = "Second custom positioned toast",
    Mode = ToastMode.Screen,
    HorizontalPosition = 100,
    VerticalPosition = 130  // 15 pixels below first toast
});
```

## Key Spacing Properties

| Property | Type | Description |
|----------|------|-------------|
| `Spacing` | double | Distance (in pixels) between toasts in corners and edges |

---

## Best Practices

- Use 10-20 pixels for standard UI applications
- Increase spacing for high-DPI displays for better readability
- Use minimal spacing (5-10px) when screen space is limited
- Consistent spacing creates a professional, organized appearance
- Test spacing on target display resolutions
- Combine with custom positioning for pixel-perfect layouts
- Consider group headers when calculating overall spacing

## Effect on Multiple Notifications

When multiple toasts are displayed using the same placement:
- First toast appears at the placement location
- Second toast is offset by `Spacing` from the first
- Third toast is offset by `Spacing` from the second
- And so on for additional toasts

Example with 20px Spacing and BottomRight placement:
```
Screen Bottom
├─ Toast 1 (Top position)
├─ 20px spacing
├─ Toast 2 (Middle position)
├─ 20px spacing
└─ Toast 3 (Bottom position)
```
