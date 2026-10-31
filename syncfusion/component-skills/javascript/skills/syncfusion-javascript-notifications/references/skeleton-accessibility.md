# Skeleton Accessibility

The Syncfusion EJ2 JavaScript Skeleton component is fully accessible, complying with WCAG 2.2 Level AA, Section 508, and ADA standards.

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Label Property](#label-property)
- [RTL Support](#rtl-support)
- [Reduced Motion Support](#reduced-motion-support)
- [Best Practices](#best-practices)
- [Screen Reader Support](#screen-reader-support)

---

## WCAG Compliance

The Skeleton component meets the following accessibility standards:

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.2 | AA | ✅ Compliant |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |
| WAI-ARIA | 1.2 | ✅ Compliant |

**Key Compliance Features:**
- Proper ARIA roles for loading states
- `aria-live` regions for dynamic updates
- `aria-busy` to indicate loading state
- `prefers-reduced-motion` respect
- Screen reader announcements
- Keyboard-friendly

---

## WAI-ARIA Attributes

The Skeleton component automatically applies appropriate ARIA attributes:

### Default ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `status` | Identifies the skeleton as a status indicator |
| `aria-live` | `polite` | Announces updates without interrupting |
| `aria-busy` | `true` | Indicates loading state |
| `aria-label` | Label content | Provides accessible name |

### Automatic ARIA Application

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  label: 'Loading user avatar'
});
skeleton.appendTo('#avatar-skeleton');
// Renders as:
// <div role="status" aria-live="polite" aria-busy="true" aria-label="Loading user avatar"></div>
```

### Custom ARIA Attributes

Add custom ARIA attributes for specific context:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  label: 'Loading article content'
});
skeleton.appendTo('#article-skeleton');

// Add additional ARIA attributes
const element: HTMLElement = document.getElementById('article-skeleton')!;
element.setAttribute('aria-describedby', 'loading-description');

const description: HTMLElement = document.createElement('div');
description.id = 'loading-description';
description.textContent = 'Article is loading, please wait...';
document.body.appendChild(description);
```

---

## Label Property

The `label` property provides an accessible name for the skeleton, which screen readers will announce.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Avatar skeleton
let avatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  label: 'Loading user avatar'
});
avatar.appendTo('#avatar-skeleton');

// Article skeleton
let article: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  label: 'Loading article content'
});
article.appendTo('#article-skeleton');

// List item skeleton
let listItem: Skeleton = new Skeleton({
  shape: 'Text',
  height: '16px',
  width: '60%',
  label: 'Loading list item'
});
listItem.appendTo('#list-item-skeleton');
```

**Screen Reader Output:**
> "Loading user avatar"
> "Loading article content"
> "Loading list item"

---

## RTL Support

Enable right-to-left layout using the `enableRtl` property:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  enableRtl: true
});
skeleton.appendTo('#skeleton');
```

**Use Cases:**
- Arabic, Hebrew, Persian languages
- Right-to-left reading languages
- Internationalization support

---

## Reduced Motion Support

The Skeleton component respects the `prefers-reduced-motion` user setting for users who are sensitive to animations.

### Automatic Detection

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

### CSS-Based Reduced Motion

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .e-skeleton {
    animation: none !important;
  }
}
```

### Complete Reduced Motion Pattern

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

const motionQuery: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');

function createSkeleton(): Skeleton {
  return new Skeleton({
    shape: 'Rectangle',
    width: '100%',
    height: '200px',
    shimmerEffect: motionQuery.matches ? 'Fade' : 'Wave',
    cssClass: motionQuery.matches ? 'reduced-motion-skeleton' : 'normal-skeleton'
  });
}

let skeleton: Skeleton = createSkeleton();
skeleton.appendTo('#skeleton');

// Listen for changes in motion preference
motionQuery.addEventListener('change', (e: MediaQueryListEvent) => {
  console.log('Motion preference changed:', e.matches);
  // Recreate skeleton with new settings if needed
});
```

---

## Best Practices

### 1. Provide Meaningful Labels

```typescript
// ✅ Good: Descriptive label
let good: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  label: 'Loading user profile picture'
});

// ❌ Bad: Generic or no label
let bad: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
  // Missing label
});
```

### 2. Hide Skeleton from Screen Readers When Not Needed

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  label: 'Loading content'
});
skeleton.appendTo('#skeleton');

// When content is loaded, hide skeleton from screen readers
function onContentLoaded(): void {
  const element: HTMLElement = document.getElementById('skeleton')!;
  element.setAttribute('aria-hidden', 'true');
  skeleton.hide();
}
```

### 3. Use Appropriate Shimmer Effect

```typescript
// ✅ Good: Use subtle effects for users with motion sensitivity
const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let skeleton: Skeleton = new Skeleton({
  shape: 'Text',
  height: '15px',
  width: '80%',
  shimmerEffect: prefersReducedMotion ? 'Fade' : 'Pulse'
});
```

### 4. Provide Loading Time Expectations

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  label: 'Loading content, this may take a few seconds'
});
skeleton.appendTo('#skeleton');
```

### 5. Combine with Progress Indicators

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  label: 'Loading 45%'
});
skeleton.appendTo('#skeleton');

// Update label as progress changes
function updateProgress(percent: number): void {
  const element: HTMLElement = document.getElementById('skeleton')!;
  element.setAttribute('aria-label', `Loading ${percent}%`);
}
```

---

## Screen Reader Support

The Skeleton component is tested with major screen readers:

| Screen Reader | Platform | Status |
|---------------|----------|--------|
| JAWS | Windows | ✅ Supported |
| NVDA | Windows | ✅ Supported |
| VoiceOver | macOS/iOS | ✅ Supported |
| TalkBack | Android | ✅ Supported |
| ChromeVox | Chrome OS | ✅ Supported |

### Screen Reader Announcements

**With Label:**
> "Loading user avatar, status"

**Without Label:**
> "Loading, status"

**After Content Loads:**
> Skeleton is removed and actual content is announced

---

## Accessibility Testing

### Manual Testing Checklist

- [ ] Screen reader announces skeleton with appropriate label
- [ ] `aria-busy` is set to `true` during loading
- [ ] `aria-live="polite"` is present
- [ ] Skeleton is hidden from screen readers when content loads
- [ ] Reduced motion preference is respected
- [ ] RTL layout works correctly
- [ ] Skeleton doesn't interfere with keyboard navigation
- [ ] Focus is properly managed when content loads

### Automated Testing

```typescript
// Test with axe-core or similar tools
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px',
  label: 'Test skeleton'
});
skeleton.appendTo('#test-skeleton');

// Verify ARIA attributes
const element: HTMLElement = document.getElementById('test-skeleton')!;
console.log('Role:', element.getAttribute('role')); // Should be "status"
console.log('ARIA-live:', element.getAttribute('aria-live')); // Should be "polite"
console.log('ARIA-busy:', element.getAttribute('aria-busy')); // Should be "true"
console.log('ARIA-label:', element.getAttribute('aria-label')); // Should be "Test skeleton"
```

---

## Internationalization and RTL

The Skeleton component supports internationalization with proper RTL handling:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';
import { L10n } from '@syncfusion/ej2-base';

// Set custom locale
L10n.load({
  'ar-AE': {
    'skeleton': {
      'loading': 'جاري التحميل'
    }
  }
});

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  enableRtl: true,
  locale: 'ar-AE',
  label: 'جاري تحميل المحتوى'
});
skeleton.appendTo('#skeleton');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Accessible label for screen readers |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |

For complete API details, see [skeleton-api.md](./skeleton-api.md).
