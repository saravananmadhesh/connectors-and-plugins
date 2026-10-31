# Badge Types and Shapes

## Table of Contents
- [Color Variants](#color-variants)
- [Shape Types](#shape-types)
  - [Circle](#circle)
  - [Pill](#pill)
  - [Link](#link)
  - [Notification](#notification)
  - [Dot](#dot)
  - [Overlap](#overlap)
- [Badge Positioning](#badge-positioning)
- [Combining Modifier Classes](#combining-modifier-classes)

---

## Color Variants

The Badge component provides eight predefined color variants. Each carries a semantic meaning to communicate intent to users:

| Class | Purpose |
|---|---|
| `e-badge-primary` | General notifications, default state |
| `e-badge-secondary` | Supplementary or secondary information |
| `e-badge-success` | Positive outcomes, confirmations |
| `e-badge-danger` | Errors, critical issues requiring attention |
| `e-badge-warning` | Caution, items needing review |
| `e-badge-info` | Informational messages or guidance |
| `e-badge-light` | Subtle indicators on dark backgrounds |
| `e-badge-dark` | Prominent indicators on light backgrounds |

```html
<div class="sample_container">
    <div class="block">
        <div class="e-card e-badge-showcase">
            <div class="e-card-content">
                <div><span class="e-badge e-badge-primary">Primary</span></div>
            </div>
            <div class="e-card-content">
                <div><code>.e-badge-primary</code></div>
            </div>
        </div>
    </div>
    <!-- Repeat pattern for secondary, success, danger, warning, info, light, dark -->
</div>
```

---

## Shape Types

### Circle

Apply `.e-badge-circle` to render a circular badge. Typically combined with `.e-badge-notification` and `.e-badge-overlap` for icon overlays.

```html
<div>
    <div class="badge-block">
        <div class="skype svg_icons"></div>
        <span class="e-badge e-badge-success e-badge-overlap e-badge-notification e-badge-circle">18</span>
    </div>
    <div class="badge-block">
        <div class="twitter svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification e-badge-circle">9</span>
    </div>
    <div class="badge-block">
        <div class="facebook svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification e-badge-circle">2</span>
    </div>
    <div class="badge-block">
        <div class="firefox svg_icons"></div>
        <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle">35</span>
    </div>
</div>
```

---

### Pill

Apply `.e-badge-pill` for a rounded-rectangle (pill) shape — ideal for text labels and "New" indicators.

```html
<h1>Badge Component <span class="e-badge e-badge-primary e-badge-pill">New</span></h1>
```

---

### Link

When badge classes are applied to an `<a>` tag, the badge gains hover state styling automatically.

```html
<div class="badge-block">
    <a href="#" class="e-badge e-badge-primary">Link Badge</a>
</div>
```

---

### Notification

Apply `.e-badge-notification` to create a counter badge. Use for alert counts and status changes that need immediate attention.

> **Note:** Ensure the parent element has `position: relative` for correct placement.

```html
<div>
    <div class="badge-block">
        <div class="skype svg_icons"></div>
        <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">99+</span>
    </div>
    <div class="badge-block">
        <div class="twitter svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">27</span>
    </div>
    <div class="badge-block">
        <div class="facebook svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">2</span>
    </div>
    <div class="badge-block">
        <div class="firefox svg_icons"></div>
        <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">35</span>
    </div>
</div>
```

---

### Dot

Apply `.e-badge-dot` to render a small dot with no text content — ideal for presence/availability indicators.

> **Note:** Leave the `<span>` empty. Set the parent to `position: relative`.

```html
<div>
    <div class="badge-block">
        <div class="skype svg_icons"></div>
        <span class="e-badge e-badge-success e-badge-overlap e-badge-dot"></span>
    </div>
    <div class="badge-block">
        <div class="twitter svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-dot"></span>
    </div>
    <div class="badge-block">
        <div class="facebook svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-dot"></span>
    </div>
    <div class="badge-block">
        <div class="firefox svg_icons"></div>
        <span class="e-badge e-badge-danger e-badge-overlap e-badge-dot"></span>
    </div>
</div>
```

---

### Overlap

Apply `.e-badge-overlap` to make the badge extend beyond the boundary of the parent element. Combine it with `.e-badge-notification` or `.e-badge-dot` for icon overlays.

```html
<div>
    <div class="badge-block">
        <div class="skype svg_icons"></div>
        <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">99+</span>
    </div>
    <div class="badge-block">
        <div class="twitter svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">27</span>
    </div>
    <div class="badge-block">
        <div class="facebook svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-notification">2</span>
    </div>
    <div class="badge-block">
        <div class="firefox svg_icons"></div>
        <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">35</span>
    </div>
</div>
```

---

## Badge Positioning

Notification and dot badges default to **top** placement. Add `.e-badge-bottom` to move the badge to the bottom of the parent.

This is particularly useful for avatar components where bottom placement communicates status more intuitively.

```html
<div>
    <div class="badge-block">
        <div class="firefox svg_icons"></div>
        <!-- Bottom position -->
        <span class="e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom"></span>
    </div>
    <div class="badge-block">
        <div class="skype svg_icons"></div>
        <span class="e-badge e-badge-info e-badge-overlap e-badge-dot e-badge-bottom"></span>
    </div>
    <div class="badge-block">
        <div class="facebook svg_icons"></div>
        <!-- Default top position (no e-badge-bottom) -->
        <span class="e-badge e-badge-info e-badge-overlap e-badge-dot"></span>
    </div>
    <div class="badge-block">
        <div class="twitter svg_icons"></div>
        <span class="e-badge e-badge-danger e-badge-overlap e-badge-dot e-badge-bottom"></span>
    </div>
</div>
```

---

## Combining Modifier Classes

Modifier classes compose freely. The typical pattern for icon notification badges is:

```
e-badge  +  [color]  +  e-badge-overlap  +  e-badge-notification  +  [optional: e-badge-circle]
```

| Goal | Classes to combine |
|---|---|
| Notification counter on icon (default) | `e-badge e-badge-{color} e-badge-overlap e-badge-notification` |
| Circular notification counter | `e-badge e-badge-{color} e-badge-overlap e-badge-notification e-badge-circle` |
| Dot status indicator (top) | `e-badge e-badge-{color} e-badge-overlap e-badge-dot` |
| Dot status indicator (bottom) | `e-badge e-badge-{color} e-badge-overlap e-badge-dot e-badge-bottom` |
| Pill label | `e-badge e-badge-{color} e-badge-pill` |
