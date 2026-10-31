# Events – Syncfusion TypeScript ColorPicker

## Table of Contents
1. [Event Overview](#event-overview)
2. [change Event](#change-event)
3. [select Event](#select-event)
4. [change vs. select Decision Guide](#change-vs-select-decision-guide)
5. [beforeOpen and open Events](#beforeopen-and-open-events)
6. [beforeClose Event](#beforeclose-event)
7. [beforeModeSwitch and onModeSwitch Events](#beforemodeswitch-and-onmodeswitch-events)
8. [beforeTileRender Event](#beforetilerender-event)
9. [created Event](#created-event)
10. [addEventListener and removeEventListener](#addeventlistener-and-removeeventlistener)

---

## Event Overview

| Event | When it fires | Can cancel? | Arg type |
|---|---|---|---|
| `change` | Color committed (Apply clicked, or immediate if `showButtons: false`) | No | `ColorPickerEventArgs` |
| `select` | Color interactively selected (requires `showButtons: true`) | No | `ColorPickerEventArgs` |
| `beforeTileRender` | Each palette tile before render | No | `PaletteTileEventArgs` |
| `beforeOpen` | Before popup opens | ✅ Yes | `BeforeOpenCloseEventArgs` |
| `open` | After popup opens | No | `OpenEventArgs` |
| `beforeClose` | Before popup closes | ✅ Yes | `BeforeOpenCloseEventArgs` |
| `beforeModeSwitch` | Before mode toggle | No | `ModeSwitchEventArgs` |
| `onModeSwitch` | After mode toggle completes | No | `ModeSwitchEventArgs` |
| `created` | Component initialization complete | No | `Event` |

---

## change Event

**Type:** `EmitType<ColorPickerEventArgs>`

Fires when the selected color is committed. Commit timing depends on `showButtons`:
- `showButtons: false` — fires immediately on every color interaction
- `showButtons: true` — fires only when the user clicks **Apply**

```typescript
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  value: '#4caf50ff',
  change: (args: ColorPickerEventArgs) => {
    // args.currentValue.hex   — 6-char HEX (no alpha): '#4caf50'
    // args.currentValue.rgba  — CSS rgba string: 'rgba(76,175,80,1)'
    // args.previousValue.hex  — previous 6-char HEX
    // args.previousValue.rgba — previous CSS rgba string
    // args.value              — full HEX8: '#4caf50ff'

    const preview = document.getElementById('color-preview') as HTMLElement;
    preview.style.backgroundColor = args.currentValue.rgba;
    console.log('Color changed to:', args.currentValue.hex);
  }
});
colorPicker.appendTo('#color-picker');
```

---

## select Event

**Type:** `EmitType<ColorPickerEventArgs>`

Fires during interactive color selection when `showButtons: true`. Useful for live previews before the user confirms with Apply.

```typescript
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  showButtons: true,
  select: (args: ColorPickerEventArgs) => {
    // Preview color in real time before Apply
    const livePreview = document.getElementById('live-preview') as HTMLElement;
    livePreview.style.backgroundColor = args.currentValue.rgba;
  },
  change: (args: ColorPickerEventArgs) => {
    // Final committed color
    console.log('Applied:', args.currentValue.hex);
    saveColorToServer(args.currentValue.hex);
  }
});
colorPicker.appendTo('#color-picker');

function saveColorToServer(hex: string): void {
  // API call to persist the selection
}
```

**Note:** `args.value` (HEX8) is NOT present in `select` event args. Only `currentValue` and `previousValue` are available.

---

## change vs. select Decision Guide

| Scenario | Use |
|---|---|
| Immediate color update with no confirmation | `change` with `showButtons: false` |
| Live preview + confirmation (Apply) | Both: `select` for preview, `change` for commit |
| Save color to database/API | `change` only (avoid saving on `select`) |
| Undo/redo support | Track previous values in `change` event |
| Design tool live color update | `select` with `showButtons: true` |

---

## beforeOpen and open Events

**`beforeOpen`** fires before the popup opens. Set `args.cancel = true` to prevent opening.

```typescript
import { ColorPicker, BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  beforeOpen: (args: BeforeOpenCloseEventArgs) => {
    // args.element — the popup container element
    // args.event   — the original DOM event
    // args.cancel  — set true to prevent opening

    const isAllowed: boolean = checkUserPermission();
    if (!isAllowed) {
      args.cancel = true;    // Prevent popup from opening
      showPermissionError();
    }
  },
  open: (args) => {
    // args.element — the popup container element
    console.log('ColorPicker popup opened');
  }
});
colorPicker.appendTo('#color-picker');

function checkUserPermission(): boolean { return true; }
function showPermissionError(): void { alert('Permission denied'); }
```

**Note:** `beforeOpen` and `open` do not fire in `inline: true` mode.

---

## beforeClose Event

Fires before the popup closes. Set `args.cancel = true` to keep the popup open.

```typescript
import { ColorPicker, BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  showButtons: true,
  beforeClose: (args: BeforeOpenCloseEventArgs) => {
    // args.element — the popup container element
    // args.event   — the original DOM event (null if closed programmatically)
    // args.cancel  — set true to keep popup open

    if (hasUnsavedChanges()) {
      const confirmed: boolean = confirm('Discard color changes?');
      if (!confirmed) {
        args.cancel = true;    // Keep popup open
      }
    }
  }
});
colorPicker.appendTo('#color-picker');

function hasUnsavedChanges(): boolean { return true; }
```

---

## beforeModeSwitch and onModeSwitch Events

Fire when the user (or code) switches between Picker and Palette mode.

```typescript
import { ColorPicker, ModeSwitchEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  modeSwitcher: true,
  beforeModeSwitch: (args: ModeSwitchEventArgs) => {
    // args.element — the container element
    // args.mode    — the TARGET mode: 'Picker' or 'Palette'
    console.log(`About to switch to ${args.mode} mode`);
  },
  onModeSwitch: (args: ModeSwitchEventArgs) => {
    // args.element — the container element
    // args.mode    — the CURRENT mode after switching: 'Picker' or 'Palette'
    console.log(`Now in ${args.mode} mode`);
    updateModeIndicator(args.mode);
  }
});
colorPicker.appendTo('#color-picker');

function updateModeIndicator(mode: string): void {
  const indicator = document.getElementById('mode-label') as HTMLElement;
  indicator.textContent = `Mode: ${mode}`;
}
```

---

## beforeTileRender Event

Fires for each palette tile during render. Use it to add attributes, tooltips, icons, or custom styles to individual tiles.

```typescript
import { ColorPicker, PaletteTileEventArgs } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  mode: 'Palette',
  beforeTileRender: (args: PaletteTileEventArgs) => {
    // args.element    — the <span> tile element
    // args.presetName — the group key name (e.g., 'default', 'custom')
    // args.value      — HEX color value for this tile (e.g., '#f44336')

    // Add color value as tooltip title
    if (args.value) {
      args.element.setAttribute('title', args.value.toUpperCase());
    }

    // Mark a specific brand color with a custom class
    if (args.value === '#1a237e') {
      args.element.classList.add('brand-primary');
    }
  }
});
colorPicker.appendTo('#color-picker');
```

---

## created Event

Fires once when the component finishes its initial render. Use it for post-initialization DOM access.

```typescript
import { ColorPicker } from '@syncfusion/ej2-inputs';

const colorPicker: ColorPicker = new ColorPicker({
  value: '#ff9800ff',
  created: () => {
    // Component is fully rendered
    console.log('ColorPicker ready. Value:', colorPicker.value);

    // Apply initial preview
    const hex = colorPicker.getValue(colorPicker.value, 'rgba');
    const preview = document.getElementById('preview') as HTMLElement;
    if (preview) {
      preview.style.backgroundColor = hex;
    }
  }
});
colorPicker.appendTo('#color-picker');
```

---

## addEventListener and removeEventListener

Attach and detach event handlers dynamically after initialization.

```typescript
const colorPicker: ColorPicker = new ColorPicker({ value: '#607d8bff' });
colorPicker.appendTo('#color-picker');

// Add a handler dynamically
const changeHandler = (args: any) => {
  console.log('Dynamic handler — color:', args.currentValue.hex);
};
colorPicker.addEventListener('change', changeHandler);

// Remove the handler when no longer needed
colorPicker.removeEventListener('change', changeHandler);
```

**Use case:** Conditionally attaching event listeners based on application state (e.g., enabling color tracking only in edit mode).
