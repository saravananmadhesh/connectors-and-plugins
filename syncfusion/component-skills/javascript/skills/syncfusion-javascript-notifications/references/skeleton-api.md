# Skeleton API Reference

Complete API reference for the Syncfusion EJ2 JavaScript Skeleton component.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enumerations](#enumerations)
- [Type Definitions](#type-definitions)
- [Complete Example](#complete-example)

---

## Properties

### shape

Gets or sets the shape of the skeleton.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Text'` |
| **Values** | `'Text' \| 'Circle' \| 'Square' \| 'Rectangle'` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
});
```

### shimmerEffect

Gets or sets the shimmer animation effect.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Wave'` |
| **Values** | `'Wave' \| 'Pulse' \| 'Fade'` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  shimmerEffect: 'Pulse'
});
```

### width

Gets or sets the width of the skeleton.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
});
```

### height

Gets or sets the height of the skeleton.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Text',
  height: '15px',
  width: '80%'
});
```

### visible

Gets or sets whether the skeleton is visible.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  visible: false
});
```

### cssClass

Gets or sets custom CSS classes for additional styling.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  cssClass: 'my-custom-skeleton'
});
```

### label

Gets or sets the accessible label for screen readers.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  label: 'Loading user avatar'
});
```

### enableRtl

Gets or sets whether to enable right-to-left layout.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  enableRtl: true
});
```

### enablePersistence

Gets or sets whether to enable state persistence.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  enablePersistence: true
});
```

### locale

Gets or sets the locale for internationalization.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  locale: 'fr-FR'
});
```

---

## Methods

### show()

Shows the skeleton if it is hidden.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  visible: false
});
skeleton.appendTo('#skeleton');

skeleton.show();
```

### hide()

Hides the skeleton.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px'
});
skeleton.appendTo('#skeleton');

skeleton.hide();
```

### destroy()

Destroys the skeleton component and removes it from the DOM.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px'
});
skeleton.appendTo('#skeleton');

skeleton.destroy();
```

---

## Events

### created

Triggered after the component is created and rendered.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  created: () => {
    console.log('Skeleton component created');
  }
});
```

### destroyed

Triggered after the component is destroyed.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  destroyed: () => {
    console.log('Skeleton component destroyed');
  }
});
```

---

## Enumerations

### SkeletonType

Defines the shape types for the skeleton.

| Value | Description |
|-------|-------------|
| `Text` | Text line placeholder (default) |
| `Circle` | Circular placeholder (avatars, profile pictures) |
| `Square` | Square placeholder (icons, thumbnails) |
| `Rectangle` | Rectangular placeholder (images, cards) |

### ShimmerEffect

Defines the shimmer animation effects.

| Value | Description |
|-------|-------------|
| `Wave` | Horizontal shimmer wave (default) |
| `Pulse` | Opacity pulsing in and out |
| `Fade` | Smooth fade in/out animation |

---

## Type Definitions

### SkeletonModel

```typescript
interface SkeletonModel {
  shape?: 'Text' | 'Circle' | 'Square' | 'Rectangle';
  shimmerEffect?: 'Wave' | 'Pulse' | 'Fade';
  width?: string;
  height?: string;
  visible?: boolean;
  cssClass?: string;
  label?: string;
  enableRtl?: boolean;
  enablePersistence?: boolean;
  locale?: string;
  created?: () => void;
  destroyed?: () => void;
}
```

---

## Complete Example

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  shimmerEffect: 'Wave',
  width: '100%',
  height: '200px',
  visible: true,
  cssClass: 'my-custom-skeleton',
  label: 'Loading content',
  enableRtl: false,
  enablePersistence: false,
  locale: 'en-US',
  created: () => {
    console.log('Skeleton created');
  },
  destroyed: () => {
    console.log('Skeleton destroyed');
  }
});
skeleton.appendTo('#skeleton');

// Programmatic control
// skeleton.show();
// skeleton.hide();
// skeleton.destroy();
```

---

## See Also

- [skeleton-getting-started.md](./skeleton-getting-started.md) - Setup and installation
- [skeleton-shapes.md](./skeleton-shapes.md) - Shape types and dimensions
- [skeleton-shimmer-effect.md](./skeleton-shimmer-effect.md) - Shimmer animations
- [skeleton-styles.md](./skeleton-styles.md) - Customization and visibility
- [skeleton-accessibility.md](./skeleton-accessibility.md) - Accessibility guidelines
