# Clipboard Operations

## Table of Contents
- [Overview](#overview)
- [Enable Clipboard](#enable-clipboard)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Programmatic API](#programmatic-api)
  - [copy() Method](#copymethod)
  - [cut() Method](#cutmethod)
  - [paste() Method](#pastemethod)
- [Context Menu Integration](#context-menu-integration)
- [Clipboard with Custom Buttons](#clipboard-with-custom-buttons)
- [Behavior Notes](#behavior-notes)
- [Best Practices](#best-practices)

## Overview

The clipboard feature enables cutting, copying, and pasting appointments for efficient schedule management.

## Enable Clipboard

```vue
<template>
  <ejs-schedule 
    :allowClipboard="true"
    :allowKeyboardInteraction="true">
  </ejs-schedule>
</template>
```

**Note**: `allowKeyboardInteraction` must be `true` for clipboard to work.

## Keyboard Shortcuts

| Operation | Windows/Linux | Mac | Description |
|-----------|---------------|-----|-------------|
| Copy | Ctrl+C | Cmd+C | Copy selected appointment |
| Cut | Ctrl+X | Cmd+X | Cut selected appointment |
| Paste | Ctrl+V | Cmd+V | Paste copied/cut appointment |

### Usage:
1. Click an appointment to select it
2. Press **Ctrl+C** (copy) or **Ctrl+X** (cut)
3. Click target time slot
4. Press **Ctrl+V** to paste

## Programmatic API

### copy() Method

Copy selected appointment:

```vue
<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);

const copyAppointment = () => {
  const selectedElements = scheduleObj.value.ej2Instances.getSelectedElements();
  if (selectedElements.length > 0) {
    scheduleObj.value.copy(selectedElements);
  }
};
</script>
```

### cut() Method

Cut selected appointment:

```vue
<script setup>
const cutAppointment = () => {
  const selectedElements = scheduleObj.value.ej2Instances.getSelectedElements();
  if (selectedElements.length > 0) {
    scheduleObj.value.cut(selectedElements);
  }
};
</script>
```

### paste() Method

Paste to specific cell:

```vue
<script setup>
const pasteAppointment = (targetCell) => {
  scheduleObj.value.paste(targetCell);
};
</script>
```

## Context Menu Integration

Use clipboard methods with context menu:

```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :allowClipboard="true">
  </ejs-schedule>
  
  <ejs-contextmenu 
    target=".e-schedule"
    :items="menuItems"
    :select="onMenuSelect">
  </ejs-contextmenu>
</template>

<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);
let selectedTarget = null;

const menuItems = [
  { text: 'Cut Event', iconCss: 'e-icons e-cut', id: 'Cut' },
  { text: 'Copy Event', iconCss: 'e-icons e-copy', id: 'Copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste', id: 'Paste' }
];

const onMenuSelect = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  
  switch (args.item.id) {
    case 'Cut':
      if (selectedTarget) {
        schedule.cut([selectedTarget]);
      }
      break;
    case 'Copy':
      if (selectedTarget) {
        schedule.copy([selectedTarget]);
      }
      break;
    case 'Paste':
      if (selectedTarget) {
        schedule.paste(selectedTarget);
      }
      break;
  }
};
</script>
```

## Clipboard with Custom Buttons

```vue
<template>
  <div>
    <button @click="copyEvent">Copy</button>
    <button @click="cutEvent">Cut</button>
    <button @click="pasteEvent">Paste</button>
    
    <ejs-schedule 
      ref="scheduleObj"
      :allowClipboard="true"
      :eventClick="onEventClick"
      :cellClick="onCellClick">
    </ejs-schedule>
  </div>
</template>

<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);
let selectedElement = null;

const onEventClick = (args) => {
  selectedElement = args.element;
};

const onCellClick = (args) => {
  selectedElement = args.element;
};

const copyEvent = () => {
  if (selectedElement && selectedElement.classList.contains('e-appointment')) {
    scheduleObj.value.copy([selectedElement]);
  }
};

const cutEvent = () => {
  if (selectedElement && selectedElement.classList.contains('e-appointment')) {
    scheduleObj.value.cut([selectedElement]);
  }
};

const pasteEvent = () => {
  if (selectedElement) {
    scheduleObj.value.paste(selectedElement);
  }
};
</script>
```

## Behavior Notes

1. **Copy**: Creates duplicate appointment at paste location
2. **Cut**: Moves appointment from original to paste location
3. **Paste**: Places copied/cut appointment at selected cell
4. **Multiple paste**: Can paste same copied appointment multiple times
5. **Cut once**: Cut appointment can only be pasted once (it moves)

## Best Practices

1. **Enable keyboard interaction** - Required for keyboard shortcuts
2. **Provide visual feedback** - Show users when appointment is copied/cut
3. **Validate paste target** - Ensure valid time slot before pasting
4. **Handle errors gracefully** - Check if appointment exists before operations
5. **Test on mobile** - Verify touch interactions work properly
