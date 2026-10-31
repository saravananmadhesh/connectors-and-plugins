# Dashboard Layout Events Reference (Vue 3)

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Drag Events](#drag-events)
- [Resize Events](#resize-events)
- [Change Event](#change-event)
- [Event Argument Types](#event-argument-types)
- [Complete API Table](#complete-api-table)

## Lifecycle Events

### created Event

Fired when the dashboard component is initialized.

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :created="onCreated"
  />
</template>

<script setup>
const onCreated = () => {
  console.log('Dashboard initialized');
  // Initialize defaults, fetch initial data, etc.
};
</script>
```

### destroyed Event

Fired when the component is destroyed (via `destroy()` method or component unmount).

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :destroyed="onDestroyed"
  />
</template>

<script setup>
const onDestroyed = () => {
  console.log('Dashboard destroyed');
  // Cleanup: remove event listeners, clear timers
};
</script>
```

## Drag Events

### dragStart Event

Fired when the user starts dragging a panel.

```vue
<script setup>
const onDragStart = (args) => {
  // args.element - the panel DOM element
  // args.event - original mouse/touch event
  // args.cancel - set to true to cancel drag

  console.log('Drag started for:', args.element.id);
  if (args.element.id === 'locked-panel') {
    args.cancel = true; // Prevent dragging
  }
};
</script>
```

### drag Event

Fired continuously during dragging.

```vue
<script setup>
const onDrag = (args) => {
  // Use sparingly - fires very frequently
  console.log('Dragging:', args.element.id);
};
</script>
```

### dragStop Event

Fired when dragging ends.

```vue
<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);

const onDragStop = () => {
  // Save the new layout
  const layout = dashboardRef.value?.serialize();
  if (layout) {
    localStorage.setItem('dashboard', JSON.stringify(layout));
  }
};
</script>
```

## Resize Events

### resizeStart Event

Fired when the user starts resizing a panel.

```vue
<script setup>
const onResizeStart = (args) => {
  console.log('Resize started:', args.element.id);
  // args.element, args.event, args.cancel
};
</script>
```

### resize Event

Fired continuously during resizing.

```vue
<script setup>
const onResize = (args) => {
  // args.element - panel being resized
  // args.event - original event
  const rect = args.element.getBoundingClientRect();
  console.log(`Size: ${rect.width}x${rect.height}`);
};
</script>
```

### resizeStop Event

Fired when resizing ends.

```vue
<script setup>
const onResizeStop = (args) => {
  console.log('Resize stopped:', args.element.id);
  // Persist new sizes
  saveLayout();
};
</script>
```

## Change Event

The `change` event is the most informative event, providing details about added, removed, and changed panels.

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :change="onChange"
  />
</template>

<script setup>
const onChange = (args) => {
  // args.addedPanels - panels that were added
  // args.removedPanels - panels that were removed
  // args.changedPanels - panels whose position/size changed
  // args.isInteracted - true if change was from user interaction

  console.log('Added:', args.addedPanels);
  console.log('Removed:', args.removedPanels);
  console.log('Changed:', args.changedPanels);
  console.log('User interaction:', args.isInteracted);
};
</script>
```

### Save Only on User Interaction

```vue
<script setup>
const onChange = (args) => {
  if (args.isInteracted) {
    saveLayout();
  }
};
</script>
```

### Track Specific Changes

```vue
<script setup>
const onChange = (args) => {
  if (args.changedPanels && args.changedPanels.length > 0) {
    console.log(`${args.changedPanels.length} panel(s) moved or resized`);
    args.changedPanels.forEach(panel => {
      console.log(`Panel ${panel.id}: row=${panel.row}, col=${panel.col}, sizeX=${panel.sizeX}, sizeY=${panel.sizeY}`);
    });
  }
};
</script>
```

## Event Argument Types

### DragStartArgs

```typescript
interface DragStartArgs {
  element: HTMLElement;     // Panel DOM element
  event: MouseEvent | TouchEvent;
  cancel: boolean;          // Set to true to cancel
}
```

### DragEventArgs

```typescript
interface DragEventArgs {
  element: HTMLElement;
  event: MouseEvent | TouchEvent;
}
```

### ResizeArgs

```typescript
interface ResizeArgs {
  element: HTMLElement;
  event: MouseEvent | TouchEvent;
  cancel: boolean;
}
```

### ChangeEventArgs

```typescript
interface ChangeEventArgs {
  addedPanels: PanelModel[];
  removedPanels: PanelModel[];
  changedPanels: PanelModel[];
  isInteracted: boolean;
}
```

## Complete API Table

| Event | Fired When | Args | Cancellable |
|-------|-----------|------|-------------|
| `created` | Component initialized | - | No |
| `destroyed` | Component destroyed | - | No |
| `dragStart` | Drag begins | `DragStartArgs` | Yes |
| `drag` | During drag | `DragEventArgs` | No |
| `dragStop` | Drag ends | `DragEventArgs` | No |
| `resizeStart` | Resize begins | `ResizeArgs` | Yes |
| `resize` | During resize | `ResizeArgs` | No |
| `resizeStop` | Resize ends | `ResizeArgs` | No |
| `change` | Any layout change | `ChangeEventArgs` | No |

## Common Patterns

### Auto-Save on Any Change

```vue
<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :dragStop="save"
    :resizeStop="save"
  />
</template>

<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);
const save = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('layout', JSON.stringify(layout));
};
</script>
```

### Restrict Dragging to Header

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    draggableHandle=".e-panel-header"
    :dragStart="validateDrag"
  />
</template>

<script setup>
const validateDrag = (args) => {
  if (!args.element.querySelector('.e-panel-header:hover')) {
    args.cancel = true;
  }
};
</script>
```

### Confirm Before Closing Panel

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :change="onChange"
  />
</template>

<script setup>
const onChange = (args) => {
  if (args.removedPanels.length > 0) {
    const confirmRemove = window.confirm('Remove panel?');
    if (!confirmRemove) {
      // Re-add the removed panels
      args.removedPanels.forEach(p => {
        // Ref-based access required for restoration
        // Component would need to expose this
      });
    }
  }
};
</script>
```

### Track All User Activity

```vue
<script setup>
const logActivity = (eventName) => (args) => {
  console.log(`[${new Date().toISOString()}] ${eventName}`, {
    panelId: args.element?.id,
    eventType: args.event?.type
  });
};
</script>

<template>
  <DashboardLayoutComponent
    :panels="panels"
    :dragStart="logActivity('dragStart')"
    :dragStop="logActivity('dragStop')"
    :resizeStart="logActivity('resizeStart')"
    :resizeStop="logActivity('resizeStop')"
  />
</template>
```

**Next:** Learn about [accessibility (WCAG)](dashboard-accessibility-wcag.md) for ARIA and keyboard support.
