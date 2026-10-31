# Skeleton Shimmer Effects

The Syncfusion EJ2 JavaScript Skeleton component supports three shimmer animation effects that indicate loading activity.

## Table of Contents
- [Shimmer Effect Values](#shimmer-effect-values)
- [Wave Effect (Default)](#wave-effect-default)
- [Pulse Effect](#pulse-effect)
- [Fade Effect](#fade-effect)
- [Visual Comparison](#visual-comparison)
- [Choosing the Right Effect](#choosing-the-right-effect)

---

## Shimmer Effect Values

The `shimmerEffect` property accepts the following values:

| Effect | Value | Visual Behavior | Best For |
|--------|-------|-----------------|----------|
| Wave | `'Wave'` | Horizontal shimmer wave moving across (default) | General purpose, most contexts |
| Pulse | `'Pulse'` | Opacity pulsing in and out | Subtle loading, minimal distraction |
| Fade | `'Fade'` | Fade in/out animation | Calm, elegant loading states |

---

## Wave Effect (Default)

A horizontal shimmer wave that moves across the skeleton placeholder, creating a "loading" sweep effect.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  shimmerEffect: 'Wave'  // default
});
skeleton.appendTo('#skeleton');
```

**Visual Behavior:**
- Continuous left-to-right shimmer wave
- Most attention-grabbing effect
- Commonly used in modern web apps
- Indicates active loading

---

## Pulse Effect

The skeleton pulses in and out by changing opacity, creating a breathing effect.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Text',
  height: '15px',
  width: '80%',
  shimmerEffect: 'Pulse'
});
skeleton.appendTo('#skeleton');
```

**Visual Behavior:**
- Opacity oscillates between high and low values
- Subtle, non-distracting
- Good for text-heavy content
- Indicates passive loading

---

## Fade Effect

The skeleton fades in and out smoothly, creating a gentle loading animation.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  shimmerEffect: 'Fade'
});
skeleton.appendTo('#skeleton');
```

**Visual Behavior:**
- Smooth opacity transitions
- Most subtle effect
- Elegant and professional
- Good for minimal designs

---

## Visual Comparison

### Wave vs Pulse vs Fade

| Characteristic | Wave | Pulse | Fade |
|----------------|------|-------|------|
| Visual Intensity | High | Medium | Low |
| Animation Speed | Fast | Medium | Slow |
| Distraction Level | High | Medium | Low |
| Best Context | Cards, images | Text, lists | Avatars, icons |
| Modern Feel | ✅ | ✅ | ✅ |
| Subtle Feel | ❌ | ✅ | ✅ |

---

## List Skeleton with Pulse Effect

Common pattern for loading list items:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Create a list item with Pulse effect
const listItem: HTMLElement = document.getElementById('list-item')!;
listItem.style.display = 'flex';
listItem.style.alignItems = 'center';
listItem.style.gap = '12px';
listItem.style.padding = '12px';

// Icon
let listIcon: Skeleton = new Skeleton({
  shape: 'Square',
  width: '40px',
  shimmerEffect: 'Pulse'
});
listIcon.appendTo(document.createElement('div'));

// Title
let listTitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '16px',
  width: '60%',
  shimmerEffect: 'Pulse'
});
listTitle.appendTo(document.createElement('div'));

// Subtitle
let listSubtitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '12px',
  width: '40%',
  shimmerEffect: 'Pulse'
});
listSubtitle.appendTo(document.createElement('div'));
```

---

## Mixed Effects Example

Use different effects for different skeleton elements:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Image with Wave effect (more attention)
let image: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  shimmerEffect: 'Wave'
});
image.appendTo('#skeleton-image');

// Text with Pulse effect (less attention)
let title: Skeleton = new Skeleton({
  shape: 'Text',
  height: '20px',
  width: '90%',
  shimmerEffect: 'Pulse'
});
title.appendTo('#skeleton-title');

// Avatar with Fade effect (subtle)
let avatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  shimmerEffect: 'Fade'
});
avatar.appendTo('#skeleton-avatar');
```

---

## Choosing the Right Effect

| Scenario | Recommended Effect |
|----------|---------------------|
| Image loading | `Wave` |
| Card content loading | `Wave` |
| Text paragraph loading | `Pulse` |
| List items loading | `Pulse` |
| Avatar loading | `Fade` |
| Icon loading | `Fade` |
| Subtle background loading | `Fade` |
| Active data fetching | `Wave` |
| Passive background tasks | `Pulse` or `Fade` |

---

## Reduced Motion Support

The skeleton respects the `prefers-reduced-motion` user setting:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Check user's motion preference
const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  shimmerEffect: prefersReducedMotion ? 'Fade' : 'Wave'  // Use subtle effect for reduced motion
});
skeleton.appendTo('#skeleton');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shimmerEffect` | `string` | `'Wave'` | Shimmer effect: `Wave`, `Pulse`, `Fade` |

For complete API details, see [skeleton-api.md](./skeleton-api.md).
