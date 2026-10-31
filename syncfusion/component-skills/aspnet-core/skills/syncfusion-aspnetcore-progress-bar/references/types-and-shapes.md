# Types and Shapes

## Table of Contents
- [Understanding Progress Bar Types](#understanding-progress-bar-types)
  - [Available Types](#available-types)
- [Linear Progress Bars](#linear-progress-bars)
  - [Basic Linear Progress Bar](#basic-linear-progress-bar)
  - [Linear Progress with Secondary Progress](#linear-progress-with-secondary-progress)
  - [Linear Progress with Different Modes](#linear-progress-with-different-modes)
  - [Use Cases for Linear Progress Bars](#use-cases-for-linear-progress-bars)
  - [Linear Progress Styling](#linear-progress-styling)
- [Circular Progress Bars](#circular-progress-bars)
  - [Basic Circular Progress Bar](#basic-circular-progress-bar)
  - [Circular Progress with Value Display](#circular-progress-with-value-display)
  - [Circular Progress with Annotations](#circular-progress-with-annotations)
  - [Circular Progress with Secondary Progress](#circular-progress-with-secondary-progress)
  - [Use Cases for Circular Progress Bars](#use-cases-for-circular-progress-bars)
  - [Circular Progress Sizing](#circular-progress-sizing)
- [Choosing the Right Shape](#choosing-the-right-shape)
  - [Decision Matrix](#decision-matrix)
  - [Space Considerations](#space-considerations)
  - [Design Consistency](#design-consistency)
- [Shape-Specific Considerations](#shape-specific-considerations)
  - [Animation Compatibility](#animation-compatibility)
  - [Event Handling](#event-handling)
  - [Type-Specific Limitations](#type-specific-limitations)
  - [Performance](#performance)
  - [Accessibility](#accessibility)

## Understanding Progress Bar Types

The Syncfusion Progress Bar component supports two distinct shapes to match different design requirements and use cases. Each shape provides unique visual feedback and is optimized for specific scenarios. The type is set using the `type` property in the tag helper.

### Available Types

1. **Linear** - Horizontal bar for standard progress visualization
2. **Circular** - Circular gauge for compact space representation

The default type is `Linear`. You can switch between types by changing the `type` property value.

## Linear Progress Bars

Linear progress bars are the most common type. They display progress horizontally from left to right, making them intuitive for traditional progress representations.

### Basic Linear Progress Bar

```cshtml
<ejs-progressbar id="linearProgress" 
                  type="Linear" 
                  value="45" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

This creates a horizontal progress bar showing 45% completion. The bar fills from left to right as the value increases.

### Linear Progress with Secondary Progress

Linear bars support secondary progress for scenarios like buffered downloads where you want to show both buffered data and actual download progress:

```cshtml
<ejs-progressbar id="bufferedProgress" 
                  type="Linear" 
                  value="40" 
                  secondaryProgress="60"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

In this example:
- Primary progress (main fill) shows 40% at darker color
- Secondary progress shows 60% at lighter color
- Useful for media streaming where buffer ahead of playback

### Linear Progress with Different Modes

Linear bars work with all progress modes:

```cshtml
<!-- Determinate mode (known progress) -->
<ejs-progressbar id="determinate" 
                  type="Linear" 
                  value="75" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- Indeterminate mode (unknown progress) -->
<ejs-progressbar id="indeterminate" 
                  type="Linear" 
                  value="30"
                  isIndeterminate="true">
</ejs-progressbar>
```

### Use Cases for Linear Progress Bars

- **File uploads/downloads** - Show transfer progress
- **Data processing** - Display batch operation completion
- **Form submission** - Indicate multi-step form progress
- **Loading screens** - Represent resource loading
- **Build processes** - Show compilation or deployment progress
- **Database operations** - Display query execution progress

### Linear Progress Styling

Linear bars can be styled with custom thickness and corner radius:

```cshtml
<ejs-progressbar id="styledLinear" 
                  type="Linear" 
                  value="60" 
                  trackThickness="8"
                  progressThickness="8"
                  cornerRadius="Round"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Properties:
- `trackThickness` - Background track width in pixels
- `progressThickness` - Filled progress width in pixels
- `cornerRadius` - Rounded corner styling

## Circular Progress Bars

Circular progress bars display progress in a 360-degree circle format. They're compact and visually distinctive, making them suitable for dashboards and modern UI designs.

### Basic Circular Progress Bar

```cshtml
<ejs-progressbar id="circularProgress" 
                  type="Circular" 
                  value="65" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

This creates a circular progress bar showing 65% completion. The fill animates clockwise from the top position.

### Circular Progress with Value Display

Show the progress percentage or custom text in the center:

```cshtml
<ejs-progressbar id="circularWithValue" 
                  type="Circular" 
                  value="80" 
                  showProgressValue="true"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

The `showProgressValue="true"` displays the percentage (80%) in the center of the circle.

### Circular Progress with Annotations

Add custom content in the center of a circular progress bar:

```cshtml
<ejs-progressbar id="circularAnnotation" 
                  type="Circular" 
                  value="70" 
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<div class='circular-content'><span>70%</span><p>Uploading...</p></div>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>
```

You can add HTML content, buttons, images, or any view to the center. This enables:
- Control buttons (start, pause, cancel)
- Status icons or images
- Multiple text lines with status info
- Custom styling and branding

### Circular Progress with Secondary Progress

Like linear bars, circular bars support secondary progress:

```cshtml
<ejs-progressbar id="circularBuffer" 
                  type="Circular" 
                  value="50" 
                  secondaryProgress="70"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Shows two circular fills at different depths or opacities.

### Use Cases for Circular Progress Bars

- **Dashboard widgets** - Show multiple progress indicators compactly
- **Media playback** - Display video/audio progress in limited space
- **Disk usage** - Visualize storage capacity usage
- **Memory/CPU monitoring** - Show system resource usage
- **Task queue status** - Display multiple task progress simultaneously
- **Mobile app progress** - Fit on small screens
- **Process wheels** - Show task completion states

### Circular Progress Sizing

Control the radius and inner radius for different visual effects:

```cshtml
<ejs-progressbar id="customCircular" 
                  type="Circular"
                  height="300px" 
                  value="75" 
                  radius="90px"
                  innerRadius="80px"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Properties:
- `radius` - Outer circle radius
- `innerRadius` - Inner circle radius (creates a donut/ring effect)

## Choosing the Right Shape

### Decision Matrix

| Use Case | Recommended Type | Reason |
|----------|------------------|--------|
| File upload/download | Linear | Intuitive horizontal representation |
| Multi-task dashboard | Circular | Multiple compact indicators |
| Media player | Circular or Linear | Space efficiency or design choice |
| Loading screen | Linear or Circular | Design consistency with app |
| Buffered operations | Linear | Shows both progress and buffer |
| System metrics | Circular | Gauge-like representation |
| Limited screen space | Circular | Compact footprint |
| Status bar | Linear | Familiar UI pattern |
| Dashboard widget | Circular | Professional appearance |
| Sequential tasks | Linear | Shows progression steps |

### Space Considerations

- **Linear**: Uses horizontal space; width-dependent
- **Circular**: Uses equal width and height; compact

### Design Consistency

Choose shapes that match your application's design language:
- **Material Design**: Linear for main flows, Circular for status
- **Minimalist**: Circular for clean aesthetics
- **Enterprise**: Linear for familiarity and clarity
- **Modern dashboards**: Mix of Circular and Semi-Circular

## Shape-Specific Considerations

### Animation Compatibility

All two shapes support animations:

```cshtml
<!-- Any type with animation -->
<ejs-progressbar id="animatedProgress" 
                  type="Circular" 
                  value="50" 
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" duration="2000" delay="0"></e-progressbar-animation>
</ejs-progressbar>
```

### Event Handling

All types trigger the same events (ValueChanged, ProgressCompleted):

```cshtml
<ejs-progressbar id="eventProgress" 
                  type="Linear" 
                  value="0"
                  minimum="0"
                  maximum="100"
                  valueChanged="onProgressChange"
                  progressCompleted="onProgressComplete">
</ejs-progressbar>
<button type="button" id="startBtn">Start</button>

<script>
    let timer;

    document.getElementById('startBtn').addEventListener('click', function () {
        const pb = document.getElementById('eventProgress').ej2_instances[0]; // EJ2 instance
        let v = 0;

        clearInterval(timer);
        timer = setInterval(function () {
            v += 10;

            pb.value = v;
            pb.dataBind(); // apply the new value immediately

            if (v >= pb.maximum) {
                clearInterval(timer); // progressCompleted will fire when value hits maximum
            }
        }, 500);
    });

    function onProgressChange(args) {
        console.log('Progress changed to: ' + args.value);
    }

    function onProgressComplete(args) {
        console.log('Progress completed! Reached maximum value.');
    }
</script>
```

### Type-Specific Limitations

- **Linear**: Limited to horizontal orientation in standard implementation
- **Circular**: Requires adequate space; not suitable for very small containers

### Performance

All types have similar performance characteristics. Linear is slightly faster than Circular for very frequent updates due to simpler geometry calculations.

### Accessibility

All types fully support:
- ARIA attributes (progressbar role)
- Keyboard navigation
- Screen reader announcements
- High-contrast themes

---

Choose your progress bar shape based on the space available, design requirements, and user context. Each shape provides complete functionality with proper styling and event support.
