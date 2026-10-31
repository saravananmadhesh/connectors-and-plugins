# More Color Dialog in SfColorPalette

## Overview

The **More Colors** feature in `SfColorPalette` provides an extended color selection experience beyond what is available in the theme and standard color panels. When the user clicks the **More Colors** button, a dialog opens with a full color spectrum, allowing selection of any custom color with various opacity levels.

Colors selected from the More Colors dialog are tracked in the `RecentColors` collection and displayed in the **Recent Colors** panel.

## Enable the More Colors Button

Show the More Colors button by setting `ShowMoreColorsButton` to `true`:

```xml
<editors:SfColorPalette ShowMoreColorsButton="True" Name="colorPalette" />
```

```csharp
colorPalette.ShowMoreColorsButton = true;
```

> **Default value:** `ShowMoreColorsButton` is `true`.

## How the More Colors Dialog Works

1. User clicks the **More Colors** button at the bottom of the palette
2. A dialog opens with a full **color spectrum** for precise color selection
3. User adjusts hue, saturation, value, and opacity as needed
4. User clicks **OK** to confirm — the selected color becomes the `SelectedBrush`
5. The chosen color is added to the **Recent Colors** panel automatically

## Hide the More Colors Button

To restrict users to only palette colors (theme + standard), hide the More Colors button:

```xml
<editors:SfColorPalette ShowMoreColorsButton="False" Name="colorPalette" />
```

```csharp
colorPalette.ShowMoreColorsButton = false;
```

## Recently Used Colors

Colors selected from the More Colors dialog appear in the **Recent Colors** panel at the bottom of the palette. Access the list programmatically via `RecentColors`:

```csharp
// Get the recently used color list
var recentColors = colorPalette.RecentColors;

foreach (var brush in recentColors)
{
    if (brush is ColorModel solidBrush)
    {
        // Process each recent color
        var recentColor = solidBrush.Color;
    }
}
```

> **Note:** Only colors selected through the More Colors dialog are added to `RecentColors`. Colors selected from the theme or standard panels are **not** included.

## ShowMoreColorsButton Property Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowMoreColorsButton` | bool | true | Shows or hides the More Colors button |
| `RecentColors` | IEnumerable | — | Read-only collection of recently selected colors |

## Common Scenarios

### Scenario 1: Restrict to Palette Colors Only
When you want users to select only from the predefined palette:

```xml
<editors:SfColorPalette 
    ShowMoreColorsButton="False"
    Name="colorPalette" />
```

### Scenario 2: Full Color Freedom
When users need access to any color (e.g., design tools, drawing apps):

```xml
<editors:SfColorPalette 
    ShowMoreColorsButton="True"
    ShowNoColorButton="True"
    Name="colorPalette" />
```

### Scenario 3: React to More Color Selection

Use `SelectedBrushChanged` to respond whenever a color is picked — including from the More Colors dialog:

```xml
<editors:SfColorPalette 
    ShowMoreColorsButton="True"
    SelectedBrushChanged="ColorPalette_SelectedBrushChanged"
    Name="colorPalette" />
```

```csharp
private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // Fires for all color selections including More Colors dialog
    previewBorder.Background = e.NewBrush;
}
```
