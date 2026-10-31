# Tooltip Accessibility

The Syncfusion TypeScript Tooltip component is fully accessible, complying with WCAG 2.2 Level AA, Section 508, and ADA standards.

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Best Practices](#best-practices)
- [Accessibility Testing](#accessibility-testing)

---

## WCAG Compliance

The Tooltip component meets the following accessibility standards:

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.2 | AA | ✅ Compliant |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |
| WAI-ARIA | 1.2 | ✅ Compliant |

**Key Compliance Features:**
- Proper ARIA roles (`role="tooltip"`)
- `aria-describedby` linking tooltip to target
- `aria-hidden` for visibility state
- Keyboard support (Escape to close)
- Focus management
- Screen reader announcements

---

## WAI-ARIA Attributes

The Tooltip component automatically applies appropriate ARIA attributes:

### Default ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `tooltip` | Identifies the element as a tooltip |
| `aria-describedby` | Target element ID | Links tooltip to its target |
| `aria-hidden` | `true` / `false` | Indicates visibility state |

### Automatic ARIA Application

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Accessibility-friendly tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

**Resulting HTML:**

```html
<button id="target" aria-describedby="tooltip_id">Target</button>
<div id="tooltip_id" role="tooltip" aria-hidden="false">Accessibility-friendly tooltip</div>
```

---

## Keyboard Navigation

The Tooltip component supports keyboard interaction:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the target element |
| `Shift + Tab` | Move focus away from target |
| `Escape` | Close the tooltip |
| `Enter` / `Space` | Trigger click mode (if `opensOn: 'Click'`) |

### Focus-Accessible Tooltip

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Triggered on focus',
  opensOn: 'Focus',
  position: 'TopCenter'
});
tooltip.appendTo('#input-field');
```

**HTML:**

```html
<input id="input-field" type="text" placeholder="Focus me for help" />
```

---

## Screen Reader Support

The Tooltip component is tested with major screen readers:

| Screen Reader | Platform | Status |
|---------------|----------|--------|
| JAWS | Windows | ✅ Supported |
| NVDA | Windows | ✅ Supported |
| VoiceOver | macOS/iOS | ✅ Supported |
| TalkBack | Android | ✅ Supported |
| ChromeVox | Chrome OS | ✅ Supported |

### Screen Reader Behavior

**On Focus:**
> Screen reader announces: "Button, [button text]. Tooltip: [tooltip content]."

**On Hover (with focus):**
> Screen reader announces tooltip content when tooltip appears.

**On Escape:**
> Tooltip closes and focus returns to target element.

---

## Best Practices

### 1. Provide Meaningful Content

```typescript
// ✅ Good: Descriptive content
let good: Tooltip = new Tooltip({
  content: 'Save your changes to the server',
  position: 'TopCenter'
});

// ❌ Bad: Vague content
let bad: Tooltip = new Tooltip({
  content: 'Click here'
});
```

### 2. Don't Hide Critical Information in Tooltips

```typescript
// ✅ Good: Tooltip provides supplementary info
let good: Tooltip = new Tooltip({
  content: 'Optional: Add a description for context',
  position: 'RightCenter'
});

// ❌ Bad: Critical info hidden in tooltip
let bad: Tooltip = new Tooltip({
  content: 'You must click this to continue',
  position: 'TopCenter'
});
```

### 3. Use Appropriate Open Mode

```typescript
// ✅ Good: Use Focus for keyboard accessibility
let focusTooltip: Tooltip = new Tooltip({
  content: 'Enter your full legal name',
  opensOn: 'Focus'
});
focusTooltip.appendTo('#name-input');

// ✅ Good: Use Hover for mouse-only supplementary info
let hoverTooltip: Tooltip = new Tooltip({
  content: 'Premium feature',
  opensOn: 'Hover'
});
hoverTooltip.appendTo('#premium-badge');
```

### 4. Ensure Color Contrast

The component maintains WCAG AA color contrast ratios (4.5:1 for normal text) by default. When customizing, ensure your custom CSS maintains this standard.

### 5. Avoid Tooltip Overuse

```typescript
// ✅ Good: Tooltip on icon button
let good: Tooltip = new Tooltip({
  content: 'Settings',
  position: 'BottomCenter'
});
good.appendTo('#settings-icon');

// ❌ Bad: Tooltip on every element
// Don't add tooltips to every button or text element
```

### 6. Provide Close Mechanism for Sticky Tooltips

```typescript
// ✅ Good: Sticky tooltip with close button
let stickyTooltip: Tooltip = new Tooltip({
  content: 'Detailed help information that stays visible',
  isSticky: true  // Shows close button automatically
});
stickyTooltip.appendTo('#help-icon');
```

### 7. Respect Reduced Motion

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let tooltip: Tooltip = new Tooltip({
  content: 'Motion-aware tooltip',
  animation: prefersReducedMotion
    ? { open: { effect: 'None' }, close: { effect: 'None' } }
    : { open: { effect: 'FadeIn', duration: 400 }, close: { effect: 'FadeOut', duration: 400 } }
});
tooltip.appendTo('#target');
```

---

## Focus Management

When tooltip closes (via Escape or programmatically), focus should return to the target element:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Press Escape to close',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    tooltip.close();
    (document.getElementById('target') as HTMLElement).focus(); // Return focus to target
  }
});
```

---

## Internationalization and RTL

The Tooltip component supports internationalization with proper RTL handling:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { L10n } from '@syncfusion/ej2-base';

// Set custom locale
L10n.load({
  'ar-AE': {
    'tooltip': {
      'close': 'إغلاق'
    }
  }
});

let tooltip: Tooltip = new Tooltip({
  content: 'هذه تلميح',
  enableRtl: true,
  locale: 'ar-AE',
  position: 'LeftCenter'
});
tooltip.appendTo('#target');
```

---

## Mobile Accessibility

The Tooltip component is tested on mobile devices:

| Feature | iOS | Android |
|---------|-----|---------|
| VoiceOver | ✅ | N/A |
| TalkBack | N/A | ✅ |
| Touch gestures | ✅ | ✅ |
| Reduced motion | ✅ | ✅ |

**Mobile Behavior:**
- Tap and hold to show tooltip
- Screen readers announce tooltip content
- Swipe to dismiss (if sticky)

---

## Accessibility Testing

### Manual Testing Checklist

- [ ] Screen reader announces tooltip content
- [ ] `role="tooltip"` is present
- [ ] `aria-describedby` links tooltip to target
- [ ] `aria-hidden` toggles correctly
- [ ] Escape key closes tooltip
- [ ] Focus returns to target after close
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Reduced motion is respected
- [ ] RTL layout works properly

### Automated Testing

```typescript
// Test with axe-core or similar tools
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Test tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#test-target');

// Verify ARIA attributes
const tooltipElement: HTMLElement = document.querySelector('[role="tooltip"]')!;
console.log('Role:', tooltipElement.getAttribute('role')); // Should be "tooltip"
console.log('Aria-hidden:', tooltipElement.getAttribute('aria-hidden')); // Should be "false" when visible

const target: HTMLElement = document.getElementById('test-target')!;
console.log('Aria-describedby:', target.getAttribute('aria-describedby')); // Should be tooltip ID
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `cssClass` | `string` | `''` | Custom CSS class |
| `opensOn` | `string` | `'Auto'` | Open trigger mode |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
