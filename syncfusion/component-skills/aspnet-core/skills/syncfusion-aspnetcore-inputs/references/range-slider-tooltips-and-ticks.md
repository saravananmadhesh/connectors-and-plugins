# Range Slider Tooltips and Ticks — ASP.NET Core

This reference covers tooltip display options, tick marks, labels, and positioning.

## Table of Contents
- [Tooltip Overview](#tooltip-overview)
- [Tooltip Modes](#tooltip-modes)
- [Tooltip Placement](#tooltip-placement)
- [Show/Hide Tooltips](#showhide-tooltips)

---

## Tooltip Overview

The Range Slider displays a tooltip to indicate the current value when users interact with the slider handle.

```cshtml
<ejs-slider id="default" value="30" type="MinRange">
    <e-slider-tooltipdata isVisible="true" showOn="Hover" placement="After"></e-slider-tooltipdata>
</ejs-slider>
```

## Tooltip Modes

Use the `showOn` property to control when the tooltip appears:

- `Hover` — tooltip appears when hovering over the thumb
- `Focus` — tooltip appears when the thumb receives focus
- `Always` — tooltip remains visible at all times

```cshtml
<ejs-slider id="alwaysTooltip" value="30" type="MinRange">
    <e-slider-tooltipdata isVisible="true" showOn="Always" placement="After"></e-slider-tooltipdata>
</ejs-slider>
```

## Tooltip Placement

Control the tooltip position relative to the slider thumb using the `placement` property.

```cshtml
<ejs-slider id="placementTooltip" value="30" type="MinRange">
    <e-slider-tooltipdata isVisible="true" showOn="Always" placement="After"></e-slider-tooltipdata>
</ejs-slider>
```

## Show/Hide Tooltips

Set `isVisible` to `false` to hide the tooltip entirely.

```cshtml
<ejs-slider id="noTooltip" value="50" type="MinRange">
    <e-slider-tooltipdata isVisible="false"></e-slider-tooltipdata>
</ejs-slider>
```

## See Also

- `range-slider-getting-started.md` — Quick start guide
- `range-slider-types-and-orientation.md` — Types and orientations
- `range-slider-events-and-methods.md` — Event handling
- `range-slider-styling.md` — Custom styling
- `range-slider-api-reference.md` — Complete API reference
