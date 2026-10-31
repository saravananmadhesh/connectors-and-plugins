# Syncfusion EJ2 ProgressBar - Complete API Reference

**Component:** Syncfusion ProgressBar for ASP.NET MVC  
**Namespace:** `Syncfusion.EJ2.ProgressBar`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html

---

## Table of Contents
- [ProgressBar Class API](#progressbar-class-api)
  - [Constructor](#constructor)
  - [Properties (40+ Total)](#properties-40-total)
    - [Container & Display Properties](#container--display-properties)
    - [Progress Configuration](#progress-configuration)
    - [Visual Styling Properties](#visual-styling-properties)
    - [Circular/Radial Properties](#circularradial-properties)
    - [Segment & Track Properties](#segment--track-properties)
    - [Advanced Features Properties](#advanced-features-properties)
    - [Tooltip & Label Properties](#tooltip--label-properties)
    - [Annotation Properties](#annotation-properties)
    - [Localization & Accessibility](#localization--accessibility)
    - [State Management](#state-management)
- [ProgressBarAnimation Configuration](#progressbaranimation-configuration)
  - [ProgressbarAnimation Usage Example](#progressbaranimation-usage-example)
- [ProgressBarTooltipSettings Configuration](#progressbartooltipsettings-configuration)
  - [ProgressbarTooltipSettings Usage Example](#progressbartooltipsettings-usage-example)
- [ProgressBarAnnotationSettings Configuration](#progressbarannotationsettings-configuration)
  - [ProgressbarAnnotationSettings Usage Example](#progressbarannotationsettings-usage-example)
- [ProgressBarRangeColor Configuration](#progressbarrangecolor-configuration)
  - [ProgressbarRangeColor Usage Example](#progressbarrangecolor-usage-example)
- [ProgressBarFont Configuration](#progressbarfont-configuration)
- [ProgressBarMargin Configuration](#progressbarmargin-configuration)
  - [ProgressBarMargin Usage Example](#progressbarmargin-usage-example)
- [Events Reference](#events-reference)
  - [Lifecycle Events](#lifecycle-events)
  - [Progress Events](#progress-events)
  - [Interaction Events](#interaction-events)
  - [Render Events](#render-events)
  - [Event Handler Example](#event-handler-example)
- [Enumerations](#enumerations)
  - [ProgressType](#progresstype)
  - [ModeType (Linear Progress Modes)](#modetype-linear-progress-modes)
  - [CornerType](#cornertype)
  - [ProgressTheme](#progresstheme)
- [Related Classes](#related-classes)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Linear Progress](#basic-linear-progress)
  - [Circular Progress with Annotation](#circular-progress-with-annotation)
  - [Indeterminate Progress (Loading State)](#indeterminate-progress-loading-state)
  - [Segmented Progress](#segmented-progress)
  - [Progress with Range Colors](#progress-with-range-colors)
  - [Progress with Striped Effect](#progress-with-striped-effect)
  - [Progress with Tooltip](#progress-with-tooltip)
- [Namespace Information](#namespace-information)
- [Additional Resources](#additional-resources)

---

## ProgressBar Class API

**Primary component class for rendering progress indicators with multiple visualization types.**

**Namespace:** `Syncfusion.EJ2.ProgressBar`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html)**

### Constructor

```csharp
public ProgressBar()
```

Creates a new instance of the ProgressBar component.

### Properties (40+ Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | null | Width of progress bar container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Width) |
| Height | string | null | Height of progress bar container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Height) |
| HtmlAttributes | - | null | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_HtmlAttributes) |

#### Progress Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Type | ProgressType | Linear | Progress bar type (Linear, Circular) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Type) |
| Value | double | NaN | Current progress value (numeric) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Value) |
| Minimum | double | 0 | Minimum progress value | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Minimum) |
| Maximum | double | 100 | Maximum progress value | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Maximum) |
| SecondaryProgress | double | NaN | Secondary/buffer progress value | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgress) |
| IsIndeterminate | bool | false | Unknown/indeterminate progress state | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsIndeterminate) |
| ShowProgressValue | bool | false | Display percentage value label | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ShowProgressValue) |
| Role | ModeType | null | Linear progress mode (Auto, Danger, Info, Success, Warning) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Role) |

#### Visual Styling Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| ProgressColor | string | null | Primary progress bar color (hex, rgba, named) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ProgressColor) |
| TrackColor | string | null | Background track color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TrackColor) |
| SecondaryProgressColor | string | "" | Secondary progress bar color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgressColor) |
| ProgressThickness | double | 0 | Progress bar thickness/width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ProgressThickness) |
| TrackThickness | double | 0 | Background track thickness/width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TrackThickness) |
| SecondaryProgressThickness | double | NaN | Secondary progress bar thickness | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgressThickness) |
| IsStriped | bool | false | Striped pattern for progress bar | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsStriped) |
| IsGradient | bool | false | Gradient color effect | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsGradient) |
| IsActive | bool | false | Active/animated state for striped bars | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsActive) |
| CornerRadius | CornerType | Auto | Corner radius type (Auto, Round, Square, Round4px) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_CornerRadius) |
| Theme | ProgressTheme | Fabric | Predefined theme (Fabric, FabricDark, Fluent, etc.) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Theme) |

#### Circular/Radial Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Radius | string | "100%" | Outer radius for circular progress (px, %) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Radius) |
| InnerRadius | string | "100%" | Inner radius for circular progress | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_InnerRadius) |
| StartAngle | double | 0 | Start angle for circular progress (degrees) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_StartAngle) |
| EndAngle | double | 0 | End angle for circular progress (degrees) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EndAngle) |
| EnablePieProgress | bool | false | Pie view for circular progress | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnablePieProgress) |

#### Segment & Track Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| SegmentCount | double | 1 | Number of progress segments | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SegmentCount) |
| EnableProgressSegments | bool | false | Enable progress segment display | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnableProgressSegments) |
| GapWidth | double | NaN | Gap width between segments | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_GapWidth) |
| SegmentColor | string[] | null | Array of colors for segments | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SegmentColor) |
| RangeColors | List<ProgressBarRangeColor> | null | Color mapping for value ranges | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_RangeColors) |

#### Advanced Features Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Animation | ProgressBarAnimation | null | Animation configuration settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Animation) |
| Margin | ProgressBarMargin | null | Margins around progress bar | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Margin) |

#### Tooltip & Label Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Tooltip | ProgressBarTooltipSettings | null | Tooltip display configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Tooltip) |
| LabelStyle | ProgressBarFont | null | Font styling for progress value label | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_LabelStyle) |
| LabelOnTrack | bool | true | Display label on track area | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_LabelOnTrack) |

#### Annotation Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Annotations | List<ProgressBarAnnotationSettings> | null | Custom content annotations | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Annotations) |

#### Localization & Accessibility

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Locale | string | "" | Language locale code for i18n | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Locale) |
| EnableRtl | bool | false | Right-to-left language support | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnableRtl) |

#### State Management

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnablePersistence | bool | false | Persist component state across page reloads | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnablePersistence) |

---

## ProgressBarAnimation Configuration

**Defines animation properties for progress bar transitions.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Enable | bool | false | Enable animations |
| Duration | double | 2000 | Animation duration in milliseconds |
| Delay | double | 0 | Animation delay in milliseconds |

### ProgressbarAnimation Usage Example

```csharp
.Animation(an => an
    .Enable(true)
    .Delay(0)
    .Duration(2000)
)
```

---

## ProgressBarTooltipSettings Configuration

**Defines tooltip display and formatting properties.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Enable | bool | false | Enable tooltip display |
| Fill | string | null | Tooltip background color |
| TextStyle | ProgressBarFont | null | Tooltip font styling |
| Format | string | null | Format string for tooltip content (e.g., "${value}%") |
| ShowTooltipOnHover | bool | false | Show tooltip only on hover |
| Border | ProgressBarBorder | null | Options to customize tooltip borders |


### ProgressbarTooltipSettings Usage Example

```csharp
.Tooltip(tp => tp
   .Enable(true)
   .Format("Progress: ${value}")
   .ShowTooltipOnHover(true)
)
```

---

## ProgressBarAnnotationSettings Configuration

**Defines custom annotation content for progress bar display.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnnotationSettings.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Content | string | null | HTML/text content for annotation |
| AnnotationRadius | string | "0%" | to move annotation |
| AnnotationAngle | number | 0 | to move annotation |

### ProgressbarAnnotationSettings Usage Example

```csharp
.Annotations(an => { an
    .Content("<div  style='font-size:20px; font-weight:bold; color:#ffffff;fill:#ffffff'><span>60%</span></div>")
    .Add();
})
```

---

## ProgressBarRangeColor Configuration

**Defines color mapping based on value ranges.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarRangeColor.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | string | null | Color for this range |
| Start | double | NaN | Minimum value for range |
| End | double | NaN | Maximum value for range |

### ProgressbarRangeColor Usage Example

```csharp
.RangeColors(new List<ProgressBarRangeColor>
{
    new ProgressBarRangeColor { Color = "#ff0000", Start = 0, End = 33 },
    new ProgressBarRangeColor { Color = "#ffff00", Start = 33, End = 66 },
    new ProgressBarRangeColor { Color = "#00ff00", Start = 66, End = 100 }
})
```

---

## ProgressBarFont Configuration

**Defines font properties for labels and annotations.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | string | "" | Font color |
| FontFamily | string | null | Font family name |
| Size | string | "16px" | Font size for the text |
| FontStyle | string | "Normal" | Font style (normal, italic, oblique) |
| FontWeight | string | "Normal" | Font weight (normal, bold, 100-900) |
| Opacity | double | NaN | Font opacity (0-1) |
| TextAlignment | TextAlignmentType | Far | Text alignment (Near, Far, Center) |
| Text | string | "" | label text |

---

## ProgressBarMargin Configuration

**Defines margin spacing around progress bar.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html)**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Left | double | 10 | Left margin in pixels |
| Right | double | 10 | Right margin in pixels |
| Top | double | 10 | Top margin in pixels |
| Bottom | double | 10 | Bottom margin in pixels |

### ProgressBarMargin Usage Example

```csharp
.Margin(m => m
   .Left(10)
   .Right(10)
   .Top(5)
   .Bottom(5)
)
```

---

## Events Reference

### Lifecycle Events

```csharp
public string Load { get; set; }              // Before progress bar loads
public string Loaded { get; set; }            // After progress bar fully loads
```

### Progress Events

```csharp
public string ValueChanged { get; set; }      // Progress value changed
public string ProgressCompleted { get; set; } // Progress reaches maximum value
```

### Interaction Events

```csharp
public string MouseClick { get; set; }    // Progress bar clicked
public string MouseDown { get; set; }     // Mouse button pressed
public string MouseUp { get; set; }       // Mouse button released
public string MouseMove { get; set; }     // Mouse moved over bar
public string MouseLeave { get; set; }    // Mouse leaves bar area
```

### Render Events

```csharp
public string TooltipRender { get; set; }      // Before tooltip renders
public string TextRender { get; set; }         // Before label/text renders
public string AnimationComplete { get; set; }  // Animation completes
```

### Event Handler Example

```csharp
<div id="pause-container">
    @(Html.EJS().ProgressBar("pause-container").Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular).Value(100)
        .Width("160px").Height("160px")
        .Minimum(0).Maximum(100).Load("progressLoad")
        .Animation(an => an.Enable(true).Delay(0).Duration(2000)).ProgressCompleted("progressCompleted")
        .Annotations(an =>
        {
            an.Content(""<div  style='font-size:20px; font-weight:bold; color:#ffffff;fill:#ffffff'><span>60%</span></div>"").Add();
        }).Render())
</div>

<script>
var clearTimeout1;
var clearTimeout2;
var progressCompleted = function (args) {
            clearTimeout(clearTimeout2);
            clearTimeout2 = setTimeout(function () {
                var pausePlay = document.getElementById("pause-container").ej2_instances[0];
                pausePlay.annotations[0].content = "<div id="point1" style="font-size:20px;font-weight:bold;color:#ffffff;fill:#ffffff"><span>60%</span></div>";
                pausePlay.dataBind();
            }, 2000);
        }
</script>
```

---

## Enumerations

### ProgressType

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressType.html)**

```csharp
public enum ProgressType
{
    Linear,         // Default linear progress bar
    Circular,       // Circular/radial progress indicator
}
```

### ModeType (Linear Progress Modes)

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ModeType.html)**

```csharp
public enum ModeType
{
   Auto,
   Danger,
   Info,
   Success,
   Warning
}
```

### CornerType

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.CornerType.html)**

```csharp
public enum CornerType
{
    Auto,           // Auto corner radius
    Round,          // Fully rounded corners
    Square,         // Sharp/square corners
    Round4px
}
```

### ProgressTheme

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressTheme.html)**

```csharp
public enum ProgressTheme
{
    Fabric,         // Default Fabric theme
    FabricDark,     // Dark variant
    Fluent,         // Fluent Design theme
    FluentDark,     // Dark Fluent variant
    Bootstrap4,     // Bootstrap 4 theme
    Bootstrap5,     // Bootstrap 5 theme
    Bootstrap5Dark, // Dark Bootstrap 5
    TailwindCSS,    // TailwindCSS theme
    TailwindDark,   // Dark TailwindCSS
    Material,       // Material Design theme
    MaterialDark    // Dark Material variant
}
```

---

## Related Classes

| Class | Purpose | API Link |
|-------|---------|----------|
| ProgressBarAnimation | Animation configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html) |
| ProgressBarTooltipSettings | Tooltip configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html) |
| ProgressBarAnnotationSettings | Annotation configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnnotationSettings.html) |
| ProgressBarRangeColor | Range color mapping | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarRangeColor.html) |
| ProgressBarFont | Font styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html) |
| ProgressBarMargin | Margin configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html) |

---

## Common Usage Patterns

### Basic Linear Progress

```cshtml
@Html.EJS().ProgressBar("linearProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
```

### Circular Progress with Annotation

```cshtml
@Html.EJS().ProgressBar("circularProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .Height("250")
    .Width("250")
    .ShowProgressValue(true)
    .Annotations(an =>
    {
        an.Content(""<div  style='font-size:20px; font-weight:bold; color:#ffffff;fill:#ffffff'><span>75%</span></div>"").Add();
    })
    .Render()
```

### Indeterminate Progress (Loading State)

```cshtml
@Html.EJS().ProgressBar("indeterminateProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)
    .Height("4")
    .Animation(an => an.Enable(true).Delay(0).Duration(2000))
    .Render()
```

### Segmented Progress

```cshtml
@Html.EJS().ProgressBar("segmentedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .SegmentCount(4)
    .Height("30")
    .Render()
```

### Progress with Range Colors

```cshtml
@Html.EJS().ProgressBar("rangeColorProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("250")
    .Width("250")
    .RangeColors(new List<ProgressBarRangeColor>
    {
        new ProgressBarRangeColor { Color = "#e74c3c", Start = 0, End = 33 },
        new ProgressBarRangeColor { Color = "#f39c12", Start = 33, End = 66 },
        new ProgressBarRangeColor { Color = "#2ecc71", Start = 66, End = 100 }
    })
    .Render()
```

### Progress with Striped Effect

```cshtml
@Html.EJS().ProgressBar("stripedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(45)
    .IsStriped(true)
    .IsActive(true)
    .Height("30")
    .Render()
```

### Progress with Tooltip

```cshtml
@Html.EJS().ProgressBar("tooltipProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(70)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Format("Progress: ${value}"))
    .Render()
```

---

## Namespace Information

**Primary Namespace:** `Syncfusion.EJ2.ProgressBar`

**Assembly:** `Syncfusion.EJ2.dll`

**Required Using Statements:**
```csharp
using Syncfusion.EJ2;
using Syncfusion.EJ2.ProgressBar;
```

---

## Additional Resources

- **Official Documentation:** https://ej2.syncfusion.com/aspnetmvc/documentation/progress-bar/
- **API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.progressbar.progressbar.html
- **Component Demos:** https://ej2.syncfusion.com/aspnetmvc/progressbar/linear#/fluent2
- **GitHub Examples:** https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/ProgressBar/
