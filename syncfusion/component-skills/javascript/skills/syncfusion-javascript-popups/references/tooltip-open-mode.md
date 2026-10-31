# Tooltip Open Mode

The Syncfusion TypeScript Tooltip supports multiple open modes, sticky mode, open/close delays, and custom open triggers.

## Table of Contents
- [Open Modes](#open-modes)
- [Auto Mode](#auto-mode)
- [Hover Mode](#hover-mode)
- [Click Mode](#click-mode)
- [Focus Mode](#focus-mode)
- [Custom Mode](#custom-mode)
- [Combining Modes](#combining-modes)
- [Sticky Mode](#sticky-mode)
- [Open and Close Delays](#open-and-close-delays)
- [Programmatic Open/Close](#programmatic-openclose)
- [Mobile Behavior](#mobile-behavior)

---

## Open Modes

The `opensOn` property controls how the tooltip is triggered:

| Mode | Value | Trigger |
|------|-------|---------|
| Auto | `'Auto'` | Hover, Focus, or Touch (default) |
| Hover | `'Hover'` | Mouse hover |
| Click | `'Click'` | Click/tap |
| Focus | `'Focus'` | Element focus (keyboard) |
| Custom | `'Custom'` | Programmatic only |

---

## Auto Mode

Automatically detects the best trigger based on device capabilities:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Auto mode - hover, focus, or touch',
  opensOn: 'Auto'
});
tooltip.appendTo('#target');
```

**Behavior:**
- Desktop: Hover and Focus
- Touch devices: Tap and hold
- Keyboard: Focus

---

## Hover Mode

Tooltip appears on mouse hover:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Hover over me',
  opensOn: 'Hover'
});
tooltip.appendTo('#target');
```

---

## Click Mode

Tooltip appears on click/tap:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Click to show',
  opensOn: 'Click'
});
tooltip.appendTo('#target');
```

---

## Focus Mode

Tooltip appears when the element receives focus (keyboard navigation):

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Focused element',
  opensOn: 'Focus'
});
tooltip.appendTo('#input-field');
```

**Use Cases:**
- Form field hints
- Accessibility-focused interfaces
- Keyboard navigation

---

## Custom Mode

Tooltip is shown/hidden only programmatically:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Custom trigger',
  opensOn: 'Custom'
});
tooltip.appendTo('#target');

// Show programmatically
function showTooltip(): void {
  tooltip.open();
}

// Hide programmatically
function hideTooltip(): void {
  tooltip.close();
}
```

---

## Combining Modes

Combine multiple open modes using space-separated values:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Hover + Click
let hoverClick: Tooltip = new Tooltip({
  content: 'Hover or click',
  opensOn: 'Hover Click'
});
hoverClick.appendTo('#target');

// Hover + Focus
let hoverFocus: Tooltip = new Tooltip({
  content: 'Hover or focus',
  opensOn: 'Hover Focus'
});
hoverFocus.appendTo('#input-field');

// All modes
let allModes: Tooltip = new Tooltip({
  content: 'Any interaction',
  opensOn: 'Hover Click Focus'
});
allModes.appendTo('#target');
```

---

## Sticky Mode

Make the tooltip stay visible until explicitly closed (displays a close button):

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Sticky tooltip - click X to close',
  isSticky: true
});
tooltip.appendTo('#target');
```

**Use Cases:**
- Detailed information display
- Help documentation
- Long-form content

**Behavior:**
- Tooltip stays visible after hover/click
- Close button (X) appears in the tooltip
- Click X to dismiss

---

## Open and Close Delays

Add delay before opening or closing the tooltip:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Open delay
let openDelay: Tooltip = new Tooltip({
  content: 'Opens after 500ms',
  openDelay: 500
});
openDelay.appendTo('#target');

// Close delay
let closeDelay: Tooltip = new Tooltip({
  content: 'Closes after 1 second',
  closeDelay: 1000
});
closeDelay.appendTo('#target');

// Both delays
let bothDelays: Tooltip = new Tooltip({
  content: 'Delayed open and close',
  openDelay: 300,
  closeDelay: 800
});
bothDelays.appendTo('#target');
```

**Defaults:** `openDelay: 0`, `closeDelay: 0`

**Use Cases:**
- Prevent flicker on quick mouse movements
- Allow users time to move to tooltip
- Improve UX for small targets

---

## Programmatic Open/Close

Control tooltip visibility programmatically:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let tooltip: Tooltip = new Tooltip({
  content: 'Programmatically controlled',
  opensOn: 'Custom'
});
tooltip.appendTo('#target');

let showBtn: Button = new Button({
  content: 'Show Tooltip',
  click: () => tooltip.open()
});
showBtn.appendTo('#show-btn');

let hideBtn: Button = new Button({
  content: 'Hide Tooltip',
  click: () => tooltip.close()
});
hideBtn.appendTo('#hide-btn');
```

---

## Mobile Behavior

On touch devices, the tooltip uses tap-and-hold:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Tap and hold on mobile',
  opensOn: 'Auto'  // Automatically detects touch
});
tooltip.appendTo('#mobile-target');
```

**Mobile Behavior:**
- Tap and hold to show tooltip
- Tap elsewhere to hide
- Sticky mode shows close button

---

## Complete Example: Form Field Tooltip

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

// Username field with focus-triggered tooltip
let usernameTooltip: Tooltip = new Tooltip({
  content: 'Must be 3-20 characters, alphanumeric only',
  position: 'RightCenter',
  opensOn: 'Focus',
  showTipPointer: true
});
usernameTooltip.appendTo('#username');

// Email field with hover + focus
let emailTooltip: Tooltip = new Tooltip({
  content: 'Enter a valid email address',
  position: 'RightCenter',
  opensOn: 'Hover Focus',
  openDelay: 200
});
emailTooltip.appendTo('#email');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opensOn` | `string` | `'Auto'` | Open trigger mode |
| `isSticky` | `boolean` | `false` | Sticky mode (stays visible) |
| `openDelay` | `number` | `0` | Open delay in ms |
| `closeDelay` | `number` | `0` | Close delay in ms |

| Method | Description |
|--------|-------------|
| `open()` | Shows the tooltip |
| `close()` | Hides the tooltip |
| `refresh()` | Refreshes tooltip position |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
