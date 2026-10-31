````markdown
# Animations & Transitions — Dialog (ASP.NET Core)

## Table of Contents
- [Animation Basics](#animation-basics)
- [Built-in Effects](#built-in-effects)
- [Animation Duration](#animation-duration)
- [Disabling Animations](#disabling-animations)
- [Performance Considerations](#performance-considerations)

## Animation Basics

The Dialog supports smooth animations when opening and closing. Animations are configured using the `<e-dialog-animationsettings>` child tag inside `<ejs-dialog>`.

### Animation Configuration

```csharp
<ejs-dialog id="animatedDialog" 
    header="Animated Dialog" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>This dialog animates with a Zoom effect.</p>
    </e-content-template>
</ejs-dialog>
```

**Sub-tag:** `<e-dialog-animationsettings>` — accepts:
- `effect` — Animation type (see Built-in Effects below)
- `duration` — Time in milliseconds (default: `400`)
- `delay` — Delay before animation starts in milliseconds (default: `0`)

## Built-in Effects

### Zoom Effect

Smoothly scales the dialog in/out:

```csharp
<ejs-dialog id="zoomDialog" 
    header="Zoom Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog zooms in when opening and zooms out when closing.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showZoomDialog()">Show Zoom</button>

<script>
    function showZoomDialog() {
        document.getElementById('zoomDialog').ej2_instances[0].show();
    }
</script>
```

**Use case:** Creates a professional, modern feel. Good for confirmations and alerts.

### Fade Effect

Gradually appears or disappears:

```csharp
<ejs-dialog id="fadeDialog" 
    header="Fade Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Fade" duration="600" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog fades in smoothly when opened.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showFadeDialog()">Show Fade</button>

<script>
    function showFadeDialog() {
        document.getElementById('fadeDialog').ej2_instances[0].show();
    }
</script>
```

**Use case:** Subtle, elegant transition for informational dialogs.

### FadeZoom Effect

Combines fade and zoom:

```csharp
<ejs-dialog id="fadeZoomDialog" 
    header="FadeZoom Animation" 
    width="500px">
    <e-dialog-animationsettings effect="FadeZoom" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog fades and zooms simultaneously.</p>
    </e-content-template>
</ejs-dialog>
```

### Slide Effects

Dialog slides from an edge into view:

```csharp
<!-- Slide from bottom -->
<ejs-dialog id="slideBottomDialog" 
    header="SlideBottom Animation" 
    width="500px">
    <e-dialog-animationsettings effect="SlideBottom" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog slides up from the bottom when opening.</p>
    </e-content-template>
</ejs-dialog>

<!-- Slide from top -->
<ejs-dialog id="slideTopDialog" 
    header="SlideTop Animation" 
    width="500px">
    <e-dialog-animationsettings effect="SlideTop" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog slides down from the top when opening.</p>
    </e-content-template>
</ejs-dialog>

<!-- Slide from left -->
<ejs-dialog id="slideLeftDialog" 
    header="SlideLeft Animation" 
    width="500px">
    <e-dialog-animationsettings effect="SlideLeft" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog slides in from the left when opening.</p>
    </e-content-template>
</ejs-dialog>

<!-- Slide from right -->
<ejs-dialog id="slideRightDialog" 
    header="SlideRight Animation" 
    width="500px">
    <e-dialog-animationsettings effect="SlideRight" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog slides in from the right when opening.</p>
    </e-content-template>
</ejs-dialog>
```

### Flip Effects

3D flip animations along various axes:

```csharp
<ejs-dialog id="flipDialog" header="Flip Animation" width="500px">
    <e-dialog-animationsettings effect="FlipXDown" duration="500" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Dialog flips down along the X axis.</p>
    </e-content-template>
</ejs-dialog>
```

**Available Flip variants:** `FlipLeftDown`, `FlipLeftUp`, `FlipRightDown`, `FlipRightUp`, `FlipXDown`, `FlipXUp`, `FlipYLeft`, `FlipYRight`

## Animation Duration

### Fast Animation (200-300ms)

Quick, snappy transitions:

```csharp
<ejs-dialog id="fastDialog" 
    header="Fast Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="200" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>This animation is quick and responsive.</p>
    </e-content-template>
</ejs-dialog>
```

**Good for:** Frequent interactions, quick feedback.

### Standard Animation (400-500ms)

Balanced duration:

```csharp
<ejs-dialog id="standardDialog" 
    header="Standard Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>This is the recommended animation duration.</p>
    </e-content-template>
</ejs-dialog>
```

**Good for:** Most use cases, professional feel.

### Slow Animation (600-800ms)

Graceful, deliberate transitions:

```csharp
<ejs-dialog id="slowDialog" 
    header="Slow Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Fade" duration="800" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Slow animations give time to perceive the change.</p>
    </e-content-template>
</ejs-dialog>
```

**Good for:** High-importance messages, accessibility.

## Disabling Animations

### No Animation

Remove all animations for instant display:

```csharp
<ejs-dialog id="noAnimDialog" 
    header="No Animation" 
    width="500px">
    <e-dialog-animationsettings effect="None"></e-dialog-animationsettings>
    <e-content-template>
        <p>This dialog appears instantly with no animation.</p>
    </e-content-template>
</ejs-dialog>
```

**Use case:** Accessibility, performance optimization.

### Animation Off via JavaScript

Disable animation at runtime:

```csharp
<ejs-dialog id="toggleAnimDialog" 
    header="Toggle Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>Animation can be toggled on/off.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="toggleAnimation()">Toggle Animation</button>

<script>
    var animationEnabled = true;
    
    function toggleAnimation() {
        var dialog = document.getElementById('toggleAnimDialog').ej2_instances[0];
        
        if (animationEnabled) {
            dialog.animationSettings = { effect: 'None' };
            animationEnabled = false;
        } else {
            dialog.animationSettings = { effect: 'Zoom', duration: 400, delay: 0 };
            animationEnabled = true;
        }
    }
</script>
```

## Performance Considerations

### Respecting prefers-reduced-motion

Respect user's accessibility preferences:

```csharp
<ejs-dialog id="a11yDialog" 
    header="Accessible Animation" 
    width="500px">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template>
        <p>This dialog respects user motion preferences.</p>
    </e-content-template>
</ejs-dialog>

<script>
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        var dialog = document.getElementById('a11yDialog').ej2_instances[0];
        dialog.animationSettings = { effect: 'None' };
    }
</script>
```

### Multiple Dialogs

If many dialogs with animations exist, reduce duration or disable for less important ones:

```csharp
<!-- Important dialog: full animation -->
<ejs-dialog id="importantDialog" header="Important">
    <e-dialog-animationsettings effect="Zoom" duration="400" delay="0"></e-dialog-animationsettings>
    <e-content-template><p>Critical information</p></e-content-template>
</ejs-dialog>

<!-- Secondary dialog: no animation -->
<ejs-dialog id="secondaryDialog" header="Secondary">
    <e-dialog-animationsettings effect="None"></e-dialog-animationsettings>
    <e-content-template><p>Additional info</p></e-content-template>
</ejs-dialog>
```

## Complete Effects Reference

| Effect | Description | Use Case |
|--------|-------------|----------|
| `Zoom` | Scales in/out | Confirmations, alerts |
| `Fade` | Fades in/out | Subtle transitions |
| `FadeZoom` | Fade + zoom combined | Modern open/close |
| `SlideBottom` | Slides up from bottom | Bottom-anchored messages |
| `SlideTop` | Slides down from top | Top-anchored messages |
| `SlideLeft` | Slides in from left | Left-aligned dialogs |
| `SlideRight` | Slides in from right | Right-aligned dialogs |
| `FlipLeftDown` | 3D flip left-down | Dramatic reveal |
| `FlipLeftUp` | 3D flip left-up | Dramatic reveal |
| `FlipRightDown` | 3D flip right-down | Dramatic reveal |
| `FlipRightUp` | 3D flip right-up | Dramatic reveal |
| `FlipXDown` | 3D flip on X axis downward | Dramatic reveal |
| `FlipXUp` | 3D flip on X axis upward | Dramatic reveal |
| `FlipYLeft` | 3D flip on Y axis left | Dramatic reveal |
| `FlipYRight` | 3D flip on Y axis right | Dramatic reveal |
| `None` | No animation | Accessibility, performance |

> **Note:** The following effects are NOT supported and must not be used: `FadeIn`, `FadeOut`, `SlideIn`, `SlideOut`, `SlideDown`, `SlideUp`, `Bounce`, `Flip`. Use the exact effect names from the table above.
````