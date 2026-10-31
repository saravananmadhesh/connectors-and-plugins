# Skeleton Shimmer Effects

## Table of Contents
- [Overview](#overview)
- [Effect Types](#effect-types)
- [Usage](#usage)
- [Examples](#examples)
- [Choosing an Effect](#choosing-an-effect)

---

## Overview

Shimmer effects provide animated visual feedback that signals to users the application is actively loading content. Configure the animation style with the `shimmerEffect` attribute.

```cshtml
<ejs-skeleton id="sk_pulse_circle" shape="Circle" width="48px" shimmerEffect="Pulse"></ejs-skeleton>
```

Default effect is `"Wave"` when `shimmerEffect` is omitted.

---

## Effect Types

### Wave (default)
A flowing highlight sweeps across the skeleton from left to right, mimicking a scan or reflection. Best for most general-purpose loading states.

```cshtml
<ejs-skeleton id="sk_wave" height="15px" width="100%" shimmerEffect="Wave"></ejs-skeleton>
```

### Pulse
The entire skeleton fades in and out uniformly, creating a breathing or pulsing rhythm. Works well for lists and items where you want a subtler, less directional animation.

```cshtml
<ejs-skeleton id="sk_pulse" height="15px" width="100%" shimmerEffect="Pulse"></ejs-skeleton>
```

### Fade
A gradual fade in/out animation. Provides the most subtle visual feedback; appropriate when you want a calm, non-distracting loading state.

```cshtml
<ejs-skeleton id="sk_fade" height="15px" width="100%" shimmerEffect="Fade"></ejs-skeleton>
```

---

## Usage

Apply `shimmerEffect` directly on any `<ejs-skeleton>`. All skeletons in a layout can share the same effect or use different ones:

```cshtml
@* ~/Pages/Index.cshtml *@
<div style="display: flex; flex-direction: column; gap: 10px;">
    <ejs-skeleton id="sk_wave"  height="15px" width="100%" shimmerEffect="Wave"></ejs-skeleton>
    <ejs-skeleton id="sk_pulse" height="15px" width="80%"  shimmerEffect="Pulse"></ejs-skeleton>
    <ejs-skeleton id="sk_fade"  height="15px" width="60%"  shimmerEffect="Fade"></ejs-skeleton>
</div>
```

---

## Examples

### List Skeleton with Pulse
Pulse is ideal for list items where the whole row fades together:

```cshtml
@* ~/Pages/Index.cshtml *@
<ul style="list-style: none; padding: 0;">
    @for (var i = 1; i <= 3; i++)
    {
        <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
            <ejs-skeleton id="@($"sk_av_{i}")" shape="Circle" width="40px" shimmerEffect="Pulse"></ejs-skeleton>
            <div style="flex: 1;">
                <ejs-skeleton id="@($"sk_t1_{i}")" width="60%" height="15px" shimmerEffect="Pulse"></ejs-skeleton>
                <br />
                <ejs-skeleton id="@($"sk_t2_{i}")" width="40%" height="15px" shimmerEffect="Pulse"></ejs-skeleton>
            </div>
        </li>
    }
</ul>
```

### Card Skeleton with Wave (default)
```cshtml
@* ~/Pages/Index.cshtml *@
<div style="padding: 16px;">
    <ejs-skeleton id="sk_card_img" shape="Rectangle" width="100%" height="180px"></ejs-skeleton>
    <br />
    <ejs-skeleton id="sk_card_h" height="18px" width="60%"></ejs-skeleton>
    <br />
    <ejs-skeleton id="sk_card_l1" height="14px" width="90%"></ejs-skeleton>
    <br />
    <ejs-skeleton id="sk_card_l2" height="14px" width="75%"></ejs-skeleton>
</div>
```

### Fade Effect for Subtle Transitions
```cshtml
@* ~/Pages/Index.cshtml *@
<div>
    <ejs-skeleton id="sk_subtle_av"   shape="Circle" width="56px" shimmerEffect="Fade"></ejs-skeleton>
    <br />
    <ejs-skeleton id="sk_subtle_text" height="16px" width="50%"  shimmerEffect="Fade"></ejs-skeleton>
</div>
```

---

## Choosing an Effect

| Effect | Best for | Visual style |
|--------|----------|------------|
| `Wave` | General use, cards, images | Directional left-to-right sweep |
| `Pulse` | Lists, repeated items | Uniform in/out breathing |
| `Fade` | Subtle or low-distraction UI | Soft, non-directional fade |

> All three effects respect the `prefers-reduced-motion` media query for users who prefer reduced animation.
