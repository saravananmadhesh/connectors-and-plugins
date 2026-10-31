# Syncfusion EJ2 Progress Bar - Complete API Reference

**Component:** Syncfusion Progress Bar for ASP.NET Core  
**Namespace:** `Syncfusion.EJ2.ProgressBar`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.progressbar.progressbar.html

---

## Table of Contents

- [ProgressBar Class API](#progressbar-class-api)
  - [Constructor](#constructor)
  - [Properties (50+ Total)](#properties-50-total)
    - [Container & Display Properties](#container--display-properties)
- [Value and Range Properties](#value-and-range-properties)
- [Display Properties](#display-properties)
- [Styling and Appearance Properties](#styling-and-appearance-properties)
  - [Colors and Fills](#colors-and-fills)
  - [Thickness and Dimensions](#thickness-and-dimensions)
- [Shape and Type Properties](#shape-and-type-properties)
  - [Linear/Circular Selection](#linearcircular-selection)
  - [Circular Properties](#circular-properties)
- [Segmentation Properties](#segmentation-properties)
- [Secondary Progress Properties](#secondary-progress-properties)
- [Animation Properties](#animation-properties)
  - [ProgressBarAnimation Properties](#progressbaranimation-properties)
- [Label and Annotation Properties](#label-and-annotation-properties)
  - [ProgressBarFont Properties](#progressbarfont-properties)
  - [ProgressBarAnnotationSettings Properties](#progressbarannotationsettings-properties)
  - [ProgressBarRangeColor Properties](#progressbarrangecolor-properties)
- [Tooltip Properties](#tooltip-properties)
  - [ProgressBarTooltipSettings Properties](#progressbartooltipsettings-properties)
- [Accessibility Properties](#accessibility-properties)
- [Event Properties](#event-properties)
  - [Lifecycle Events](#lifecycle-events)
  - [Value Change Events](#value-change-events)
  - [Rendering Events](#rendering-events)
  - [Mouse Events](#mouse-events)
- [Related Classes](#related-classes)
  - [ProgressBarMargin](#progressbarmargin)
- [Enumerations](#enumerations)
  - [ProgressType](#progresstype)
  - [CornerType](#cornertype)
  - [ProgressTheme](#progresstheme)
  - [ModeType](#modetype)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Linear Progress Bar](#basic-linear-progress-bar)
  - [Circular Progress with Label](#circular-progress-with-label)
  - [Indeterminate Loading Progress](#indeterminate-loading-progress)
  - [Segmented Progress](#segmented-progress)
  - [Progress with Animation](#progress-with-animation)
  - [Secondary Progress (Buffer)](#secondary-progress-buffer)
  - [Progress with Tooltip](#progress-with-tooltip)
  - [Range Color Progress](#range-color-progress)
- [Common Property Combinations](#common-property-combinations)
- [Notes](#notes)

---

## ProgressBar Class API

**Primary component class for rendering progress bars with multiple type options.**

**Namespace:** `Syncfusion.EJ2.ProgressBar`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html)**

### Constructor

```csharp
public ProgressBar()
```

### Properties (50+ Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | null | Width of progress bar (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Width) |
| Height | string | null | Height of progress bar (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Height) |
| Margin | ProgressBarMargin | null | Margins around the progress bar (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Margin) |
| HtmlAttributes | object | null | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_HtmlAttributes) |

---

## Value and Range Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Value | double | NaN | Current progress value (0 to Maximum) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Value) |
| Minimum | double | 0 | Minimum range value for the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Minimum) |
| Maximum | double | 100 | Maximum range value for the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Maximum) |

---

## Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| IsActive | bool | false | Active/inactive state of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsActive) |
| IsIndeterminate | bool | false | Show indeterminate loading animation (unknown duration) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsIndeterminate) |
| EnableRtl | bool | false | Enable right-to-left rendering for RTL languages | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnableRtl) |

---

## Styling and Appearance Properties

### Colors and Fills

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| ProgressColor | string | null | Color for the progress bar fill (hex or CSS color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ProgressColor) |
| TrackColor | string | null | Color for the track (hex or CSS color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TrackColor) |
| IsGradient | bool | false | Apply gradient fill to the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsGradient) |
| IsStriped | bool | false | Apply striped pattern to the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_IsStriped) |
| Theme | ProgressTheme | Fabric | Visual theme: Fabric, Material, Bootstrap, HighContrast, etc. | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Theme) |

### Thickness and Dimensions

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| TrackThickness | double | 0 | Thickness of the track bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TrackThickness) |
| ProgressThickness | double | 0 | Thickness of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ProgressThickness) |
| CornerRadius | CornerType | Auto | Corner style: Auto, Round, Round4px, Square | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_CornerRadius) |

---

## Shape and Type Properties

### Linear/Circular Selection

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Type | ProgressType | Linear | Progress bar type: Linear, Circular | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Type) |
| Role | ModeType | null | Mode of the progress bar (Linear-specific) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Role) |

### Circular Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| StartAngle | double | 0 | Start angle for circular progress bar (degrees) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_StartAngle) |
| EndAngle | double | 0 | End angle for circular progress bar (degrees) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EndAngle) |
| Radius | string | "100%" | Radius of the circular progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Radius) |
| InnerRadius | string | "100%" | Inner radius for donut-style circular progress | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_InnerRadius) |
| EnablePieProgress | bool | false | Enable pie/donut view for circular progress | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnablePieProgress) |

---

## Segmentation Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| SegmentCount | double | 1 | Divide progress bar into multiple segments | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SegmentCount) |
| EnableProgressSegments | bool | false | Enable segment visualization | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnableProgressSegments) |
| SegmentColor | string[] | null | Array of colors for individual segments | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SegmentColor) |
| GapWidth | double | NaN | Gap width between segments | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_GapWidth) |

---

## Secondary Progress Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| SecondaryProgress | double | NaN | Secondary progress value for buffer/loading indication | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgress) |
| SecondaryProgressColor | string | "" | Color for secondary progress bar (hex or CSS color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgressColor) |
| SecondaryProgressThickness | double | NaN | Thickness for secondary progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_SecondaryProgressThickness) |

---

## Animation Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Animation | ProgressBarAnimation | null | Animation configuration (enable, duration, delay, easing) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Animation) |

### ProgressBarAnimation Properties

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| Enable | bool | Enable/disable animation | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnimation_Enable) |
| Duration | double | Animation duration in milliseconds | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnimation_Duration) |
| Delay | double | Animation delay in milliseconds | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnimation_Delay) |
| ContentTemplate | object | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnimation.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnimation_ContentTemplate) |

---

## Label and Annotation Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| ShowProgressValue | bool | false | Display progress percentage text label | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ShowProgressValue) |
| LabelOnTrack | bool | true | Position label on the progress track | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_LabelOnTrack) |
| LabelStyle | ProgressBarFont | null | Font styling for labels (fontFamily, size, fontStyle, fontWeight, color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_LabelStyle) |
| Annotations | List<ProgressBarAnnotationSettings> | null | Collection of custom annotations for the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Annotations) |
| RangeColors | List<ProgressBarRangeColor> | null | Collection of range-based color configurations | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_RangeColors) |

### ProgressBarFont Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| FontFamily | string | null | Font name/family | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_FontFamily) |
| Size | string | "16px" | Font size | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_Size) |
| FontStyle | string | "Normal" | Font style: Normal, Italic, Oblique | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_FontStyle) |
| FontWeight | string | "Normal" | Font weight: Normal, Bold, Lighter, etc. | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_FontWeight) |
| Color | string | "" | Text color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_Color) |
| Opacity | double | NaN | Opacity for the text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_Opacity) |
| Text | string | "" | label text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_Text) |
| TextAlignment | TextAlignmentType | Far | text alignment for label | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_Text) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarFont.html#Syncfusion_EJ2_ProgressBar_ProgressBarFont_ContentTemplate) |

### ProgressBarAnnotationSettings Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Content | string | null | Annotation content text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnnotationSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnnotationSettings_Content) |
| AnnotationRadius | string | "0%" | to move annotation | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnnotationSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnnotationSettings_AnnotationRadius) |
| AnnotationAngle | double | 0 | to move annotation | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarAnnotationSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarAnnotationSettings_AnnotationAngle) |

### ProgressBarRangeColor Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Color | string | null | Color for the range | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarRangeColor.html#Syncfusion_EJ2_ProgressBar_ProgressBarRangeColor_Color) |
| Start | double | NaN | Start value of the color range | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarRangeColor.html#Syncfusion_EJ2_ProgressBar_ProgressBarRangeColor_Start) |
| End | double | NaN | End value of the color range | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarRangeColor.html#Syncfusion_EJ2_ProgressBar_ProgressBarRangeColor_End) |

---

## Tooltip Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Tooltip | ProgressBarTooltipSettings | null | Tooltip configuration (enable, format, template) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Tooltip) |

### ProgressBarTooltipSettings Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Enable | bool | false | Show/hide tooltip | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_Enable) |
| Format | string | null | Tooltip display format string | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_Format) |
| ShowTooltipOnHover | bool | false | Show tooltip on hover | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_ShowTooltipOnHover) |
| ContentTemplate | object | - | Custom tooltip template HTML | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_ContentTemplate) |
| Fill | string | null | fill color of the tooltip that accepts value in hex as a valid CSS color string | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_Fill) |
| Border | ProgressBarBorder | null | Options to customize tooltip borders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_Border) |
| TextStyle | Options to customize the tooltip text | null | Options to customize the tooltip text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarTooltipSettings.html#Syncfusion_EJ2_ProgressBar_ProgressBarTooltipSettings_TextStyle) |

---

## Accessibility Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnablePersistence | bool | false | Persist component state between page reloads | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_EnablePersistence) |
| Locale | string | "" | Locale for internationalization (e.g., 'en-US', 'de-DE') | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Locale) |

---

## Event Properties

### Lifecycle Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| Load | string | Triggers before the progress bar is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Load) |
| Loaded | string | Triggers after the progress bar has fully loaded | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_Loaded) |

### Value Change Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| ValueChanged | string | Triggers when the progress value changes | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ValueChanged) |
| ProgressCompleted | string | Triggers when progress value reaches maximum | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_ProgressCompleted) |

### Rendering Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| TextRender | string | Before the progress bar label is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TextRender) |
| AnimationComplete | string | After animation is completed | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_AnimationComplete) |
| TooltipRender | string | Before the tooltip is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_TooltipRender) |

### Mouse Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| MouseClick | string | When the progress bar is clicked | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_MouseClick) |
| MouseDown | string | When mouse button is pressed on the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_MouseDown) |
| MouseUp | string | When mouse button is released | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_MouseUp) |
| MouseMove | string | When mouse moves over the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_MouseMove) |
| MouseLeave | string | When mouse leaves the progress bar area | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBar.html#Syncfusion_EJ2_ProgressBar_ProgressBar_MouseLeave) |

---

## Related Classes

### ProgressBarMargin

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Left | double | 10 | Left margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html#Syncfusion_EJ2_ProgressBar_ProgressBarMargin_Left) |
| Right| double | 10 | Right margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html#Syncfusion_EJ2_ProgressBar_ProgressBarMargin_Right) |
| Top | double | 10 | Top margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html#Syncfusion_EJ2_ProgressBar_ProgressBarMargin_Top) |
| Bottom | double | 10 | Bottom margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressBarMargin.html#Syncfusion_EJ2_ProgressBar_ProgressBarMargin_Bottom) |

---

## Enumerations

### ProgressType

| Value | Description | API Link |
|-------|-------------|----------|
| Linear | Standard horizontal progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressType.html#Syncfusion_EJ2_ProgressBar_ProgressType_Linear) |
| Circular | Full circular progress indicator | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ProgressType.html#Syncfusion_EJ2_ProgressBar_ProgressType_Circular) |

### CornerType

| Value | Description | API Link |
|-------|-------------|----------|
| Auto | Automatic corner radius | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.CornerType.html#Syncfusion_EJ2_ProgressBar_CornerType_Auto) |
| Round | Fully rounded corners | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.CornerType.html#Syncfusion_EJ2_ProgressBar_CornerType_Round) |
| Round4px | specifies the 4px edges of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.CornerType.html#Syncfusion_EJ2_ProgressBar_CornerType_Round4px) |
| Square | Sharp square corners | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.CornerType.html#Syncfusion_EJ2_ProgressBar_CornerType_Square) |

### ProgressTheme

| Value | Description |
|-------|-------------|
| Fabric | Fabric design theme |
| Material | Material design theme |
| Bootstrap | Bootstrap theme |
| HighContrast | High contrast accessibility theme |
| Bootstrap4 | Bootstrap 4 theme |
| Bootstrap5 | Bootstrap 5 theme |
| Tailwind | Tailwind CSS theme |

### ModeType

| Value | Description | API Link |
|-------|-------------|----------|
| Auto | Defines the auto mode of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ModeType.html#Syncfusion_EJ2_ProgressBar_ModeType_Auto) |
| Success | Defines the success mode of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ModeType.html#Syncfusion_EJ2_ProgressBar_ModeType_Success) |
| Info | Defines the info mode of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ModeType.html#Syncfusion_EJ2_ProgressBar_ModeType_Info) |
| Danger | Defines the danger mode of the progress bar | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ModeType.html#Syncfusion_EJ2_ProgressBar_ModeType_Danger) |
| Warning | Defines the warning mode of the progress bar| [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.ProgressBar.ModeType.html#Syncfusion_EJ2_ProgressBar_ModeType_Warning) |

---

## Common Usage Patterns

### Basic Linear Progress Bar

```cshtml
<ejs-progressbar id="basicProgress" 
    type="Linear" 
    value="50" 
    minimum="0" 
    maximum="100">
</ejs-progressbar>
```

### Circular Progress with Label

```cshtml
<ejs-progressbar id="circularProgress" 
    type="Circular" 
    value="75" 
    minimum="0" 
    maximum="100"
    showProgressValue="true">
</ejs-progressbar>
```

### Indeterminate Loading Progress

```cshtml
<ejs-progressbar id="indeterminateProgress" 
    type="Linear" 
    isIndeterminate="true"
    value="30">
</ejs-progressbar>
```

### Segmented Progress

```cshtml
<ejs-progressbar id="segmentProgress" 
    type="Linear" 
    value="60" 
    segmentCount="5"
    enableProgressSegments="true">
</ejs-progressbar>
```

### Progress with Animation

```cshtml
<ejs-progressbar id="animatedProgress" 
    type="Linear" 
    value="0" 
    minimum="0" 
    maximum="100">
    <e-progressbar-animation enable="true" 
        duration="1000" 
        delay="0">
    </e-progressbar-animation>
</ejs-progressbar>
```

### Secondary Progress (Buffer)

```cshtml
<ejs-progressbar id="bufferProgress" 
    type="Linear" 
    value="40" 
    secondaryProgress="60">
</ejs-progressbar>
```

### Progress with Tooltip

```cshtml
<ejs-progressbar id="tooltipProgress" 
    type="Linear" 
    value="50" 
    showProgressValue="true">
    <e-progressbar-tooltipsettings enable="true" 
        format="Progress: ${value}">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

### Range Color Progress

```cshtml
<ejs-progressbar id="rangeProgress" 
    type="Linear" 
    value="70">
    <e-progressbar-rangecolors>
        <e-progressbar-rangecolor start="0" end="33" color="#FF4081"></e-progressbar-rangecolor>
        <e-progressbar-rangecolor start="33" end="66" color="#FFC107"></e-progressbar-rangecolor>
        <e-progressbar-rangecolor start="66" end="100" color="#4CAF50"></e-progressbar-rangecolor>
    </e-progressbar-rangecolors>
</ejs-progressbar>
```

---

## Common Property Combinations

- **With Display Value:** Set `showProgressValue = true`
- **Animated Progress:** Set `animation.enable = true` with `animation.duration`
- **Circular Display:** Set `type = ProgressType.Circular`
- **Loading State:** Set `isIndeterminate = true` for unknown duration
- **Buffer Progress:** Set `secondaryProgress` value
- **Segmented Display:** Set `enableProgressSegments = true` + `segmentCount`
- **Custom Colors:** Set `progressColor`, `trackColor`, `segmentColor` array
- **Styled Text:** Configure `labelStyle` with font properties
- **Range-Based Colors:** Add `rangeColors` collection
- **Tooltip Info:** Set `tooltip.enable = true` + `tooltip.format`
- **RTL Support:** Set `enableRtl = true`

---

## Notes

- Progress bar value must be between Minimum and Maximum
- Animation provides smooth transitions between value changes
- Indeterminate mode shows continuous animation (use for unknown durations)
- Secondary progress is typically used for buffered content
- Segment count divides the progress bar into visual milestones
- Range colors allow different colors based on progress value ranges
- Circular and SemiCircular types are useful for compact/gauge-style displays
- Theme must be set during initialization
- RTL support requires both `enableRtl = true` and proper locale
- Label positioning can be controlled with `labelOnTrack` property
- For complete method signatures and examples, see the official documentation linked at the top

