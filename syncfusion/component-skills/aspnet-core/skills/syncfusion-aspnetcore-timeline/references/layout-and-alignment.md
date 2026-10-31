# Layout and Alignment in Timeline

## Overview
The Timeline supports vertical and horizontal layouts, and four alignment modes: Before, After, Alternate, and AlternateReverse. These control how content and opposite content are positioned.

## Orientation
Set the orientation using the `orientation` property:
```cshtml
<ejs-timeline id="timeline" orientation="Horizontal">
    <e-timeline-items>
        <e-timeline-item content="Start"></e-timeline-item>
        <e-timeline-item content="Middle"></e-timeline-item>
        <e-timeline-item content="End"></e-timeline-item>
    </e-timeline-items>
</ejs-timeline>
```

## Alignment Modes
- **Before**: Content on top (horizontal) or left (vertical)
- **After**: Content on bottom (horizontal) or right (vertical)
- **Alternate**: Items alternate sides
- **AlternateReverse**: Items alternate in reverse order

Set alignment:
```cshtml
<ejs-timeline id="timeline" align="Alternate">
    ...
</ejs-timeline>
```

## Example: Alternate Alignment
```cshtml
<ejs-timeline id="timeline" align="Alternate">
    <e-timeline-items>
        <e-timeline-item content="Step 1"></e-timeline-item>
        <e-timeline-item content="Step 2"></e-timeline-item>
        <e-timeline-item content="Step 3"></e-timeline-item>
    </e-timeline-items>
</ejs-timeline>
```

## Reverse Order
Display items in reverse:
```cshtml
<ejs-timeline id="timeline" reverse="true">
    ...
</ejs-timeline>
```

## Best Practices
- Use Alternate for balanced layouts.
- Use Before/After for simple, linear flows.
- Test all alignments in RTL mode if supporting right-to-left languages.
