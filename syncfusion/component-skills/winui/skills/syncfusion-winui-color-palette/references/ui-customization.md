# UI Customization in SfColorPalette

## Table of Contents
- [Programmatic Color Access](#programmatic-color-access)
- [Setting Null or Transparent Color](#setting-null-or-transparent-color)
- [No Color Button](#no-color-button)
- [Automatic Default Color](#automatic-default-color)
- [Selected Color Changed Event](#selected-color-changed-event)
- [Customize Header Foreground](#customize-header-foreground)
- [Change Flow Direction](#change-flow-direction)
- [Tooltip Support](#tooltip-support)
- [Recently Used Colors Panel](#recently-used-colors-panel)

## Programmatic Color Access

### Get the Selected Color

```csharp
if (colorPalette.SelectedBrush is SolidColorBrush brush)
{
    var color = brush.Color; // Windows.UI.Color
}
```

### Set the Selected Color

```xml
<editors:SfColorPalette SelectedBrush="Yellow" Name="colorPalette" />
<!-- Bind to another element -->
<Button Background="{Binding ElementName=colorPalette, Path=SelectedBrush}" Content="Preview" />
```

```csharp
colorPalette.SelectedBrush = new SolidColorBrush(Colors.Yellow);
```

> **Default value:** `SelectedBrush` is `Transparent (#00FFFFFF)`.

## Setting Null or Transparent Color

To represent a null/empty color state, set the `SelectedBrush` to `Transparent`:

```xml
<editors:SfColorPalette SelectedBrush="Transparent" Name="colorPalette" />
```

```csharp
colorPalette.SelectedBrush = new SolidColorBrush(Colors.Transparent);
// Equivalent: color code #00000000
```

## No Color Button

The **No Color** button lets users explicitly select transparent as their color. It is hidden by default.

```xml
<editors:SfColorPalette ShowNoColorButton="True" Name="colorPalette" />
```

```csharp
colorPalette.ShowNoColorButton = true;
```

> **Default value:** `ShowNoColorButton` is `false`.

## Initial Default Color

### Set the selected Color

You can also get the selected color by using the SelectedBrush property.

```xml
<editors:SfColorPalette SelectedBrush="Red" Name="colorPalette" />
```

```csharp
colorPalette.SelectedBrush = new SolidColorBrush(Colors.Red);
```

> **Default value:** `SelectedBrush` is `Transparent(#00FFFFFF)`.

### Hide the Default Color Button

```xml
<editors:SfColorPalette SelectedBrush="Green"
                        ShowDefaultColorButton="False"
                        Name="colorPalette" />
```

```csharp
colorPalette.SelectedBrush = new SolidColorBrush(Colors.Red);
colorPalette.ShowDefaultColorButton = false;
```

> **Default value:** `ShowDefaultColorButton` is `true`.

## Selected Color Changed Event

Subscribe to `SelectedBrushChanged` to be notified whenever the user picks a new color:

```xml
<editors:SfColorPalette 
    SelectedBrushChanged="ColorPalette_SelectedBrushChanged"
    Name="colorPalette" />
```

```csharp
colorPalette.SelectedBrushChanged += ColorPalette_SelectedBrushChanged;
```

**Handling the event:**
```csharp
private void ColorPalette_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var oldBrush = e.OldBrush;
    var newBrush = e.NewBrush;

    // Apply to a UI element
    if (newBrush is SolidColorBrush solidBrush)
    {
        targetElement.Background = solidBrush;
    }
}
```

**Event args properties:**

| Property | Description |
|----------|-------------|
| `OldBrush` | Previously selected brush |
| `NewBrush` | Newly selected brush |

## Customize Header Foreground

Change the foreground (text) color of all panel headers — Theme Colors, Standard Colors, and Recent Colors — using the `Foreground` property:

```xml
<editors:SfColorPalette Foreground="Red" Name="colorPalette" />
```

```csharp
colorPalette.Foreground = new SolidColorBrush(Colors.Red);
```

> **Default value:** `Foreground` is `Black`.

## Change Flow Direction

Switch the layout to right-to-left for RTL language support:

```xml
<editors:SfColorPalette FlowDirection="RightToLeft" Name="colorPalette" />
```

```csharp
colorPalette.FlowDirection = FlowDirection.RightToLeft;
```

> **Default value:** `FlowDirection` is `LeftToRight`.

## Tooltip Support

The `SfColorPalette` automatically shows a tooltip with the color name when the user hovers over any color swatch. No additional configuration is required — this is built-in behavior.

For custom colors added via `ColorModel`, the `Tooltip` property controls the displayed text:

```xml
<editors:ColorModel Color="#FF11EBF8" Tooltip="Aqua Blue" />
```

## Recently Used Colors Panel

The **Recent Colors** panel displays colors previously selected from the More Colors dialog. Read the list programmatically:

```csharp
// Get recently used colors
var recentColors = colorPalette.RecentColors;
```

> **Note:** Theme and standard palette color selections are **not** added to `RecentColors`. Only colors chosen from the More Colors dialog appear here.

## UI Customization Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `SelectedBrush` | Brush | Transparent | Gets or sets the selected color |
| `AutomaticBrush` | Brush | Black | Sets the automatic/default color |
| `ShowDefaultColorButton` | bool | true | Shows/hides the automatic color button |
| `ShowNoColorButton` | bool | false | Shows/hides the No Color (transparent) button |
| `ShowMoreColorsButton` | bool | true | Shows/hides the More Colors button |
| `RecentColors` | IEnumerable | — | Recently selected colors (read-only) |
| `Foreground` | Brush | Black | Foreground color for panel headers |
| `FlowDirection` | FlowDirection | LeftToRight | Layout direction (LTR or RTL) |
