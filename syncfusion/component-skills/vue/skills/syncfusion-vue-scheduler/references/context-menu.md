# Context Menu

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Handle Menu Open](#handle-menu-open)
- [Handle Menu Selection](#handle-menu-selection)
- [Recurring Event Menu](#recurring-event-menu)
- [Custom Menu Items](#custom-menu-items)

## Overview

Context menu provides right-click menu options for cells and appointments. Requires manual integration of ContextMenu component.

## Basic Setup

```vue
<template>
  <div>
    <ejs-schedule ref="scheduleObj" id="Schedule">
    </ejs-schedule>
    
    <ejs-contextmenu 
      ref="menuObj"
      target=".e-schedule"
      :items="menuItems"
      :beforeOpen="onBeforeOpen"
      :select="onMenuSelect">
    </ejs-contextmenu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { provide } from "vue";
import { Day, Week, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';

const scheduleObj = ref(null);
const menuObj = ref(null);
let selectedTarget = null;

const menuItems = [
  { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
  { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
  { text: 'Today', iconCss: 'e-icons e-today', id: 'Today' },
  { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
  { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' }
];

provide('schedule', [Day, Week, Month, Agenda]);
</script>
```

## Handle Menu Open

```vue
<script setup>
const onBeforeOpen = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  const targetElement = args.event.target;
  
  // Close quick info popup
  schedule.closeQuickInfoPopup();
  
  selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells');
  
  if (isNullOrUndefined(selectedTarget)) {
    args.cancel = true;
    return;
  }
  
  const menu = menuObj.value.ej2Instances;
  
  if (selectedTarget.classList.contains('e-appointment')) {
    // Show options for appointments
    menu.showItems(['Save', 'Delete'], true);
    menu.hideItems(['Add', 'AddRecurrence', 'Today'], true);
  } else {
    // Show options for cells
    menu.showItems(['Add', 'AddRecurrence', 'Today'], true);
    menu.hideItems(['Save', 'Delete'], true);
  }
};
</script>
```

## Handle Menu Selection

```vue
<script setup>
const onMenuSelect = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  const selectedMenuItem = args.item.id;
  let eventObj;
  
  if (selectedTarget.classList.contains('e-appointment')) {
    eventObj = schedule.getEventDetails(selectedTarget);
  }
  
  switch (selectedMenuItem) {
    case 'Today':
      schedule.selectedDate = new Date();
      break;
      
    case 'Add':
      const cellData = schedule.getCellDetails(selectedTarget);
      schedule.openEditor(cellData, 'Add');
      break;
      
    case 'AddRecurrence':
      const cellDetails = schedule.getCellDetails(selectedTarget);
      schedule.openEditor(cellDetails, 'Add', null, 1);
      break;
      
    case 'Save':
      schedule.openEditor(eventObj, 'Save');
      break;
      
    case 'Delete':
      schedule.deleteEvent(eventObj);
      break;
  }
};
</script>
```

## Recurring Event Menu

Handle recurring events with sub-menu:

```vue
<script setup>
const menuItems = [
  { text: 'New Event', id: 'Add' },
  { 
    text: 'Edit Event', 
    id: 'EditRecurrence',
    items: [
      { text: 'Edit Occurrence', id: 'EditOccurrence' },
      { text: 'Edit Series', id: 'EditSeries' }
    ]
  },
  { 
    text: 'Delete Event', 
    id: 'DeleteRecurrence',
    items: [
      { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
      { text: 'Delete Series', id: 'DeleteSeries' }
    ]
  }
];

const onBeforeOpen = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  const menu = menuObj.value.ej2Instances;
  
  if (selectedTarget.classList.contains('e-appointment')) {
    const eventObj = schedule.getEventDetails(selectedTarget);
    
    if (eventObj.RecurrenceRule) {
      // Show recurring event options
      menu.showItems(['EditRecurrence', 'DeleteRecurrence'], true);
      menu.hideItems(['Add', 'Save', 'Delete'], true);
    } else {
      // Show normal event options
      menu.showItems(['Save', 'Delete'], true);
      menu.hideItems(['Add', 'EditRecurrence', 'DeleteRecurrence'], true);
    }
  }
};

const onMenuSelect = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  let eventObj = schedule.getEventDetails(selectedTarget);
  
  switch (args.item.id) {
    case 'EditOccurrence':
      schedule.openEditor(eventObj, 'EditOccurrence');
      break;
      
    case 'EditSeries':
      schedule.openEditor(eventObj, 'EditSeries');
      break;
      
    case 'DeleteOccurrence':
      schedule.deleteEvent(eventObj, 'DeleteOccurrence');
      break;
      
    case 'DeleteSeries':
      schedule.deleteEvent(eventObj, 'DeleteSeries');
      break;
  }
};
</script>
```

## Custom Menu Items

Add custom menu items:

```vue
<script setup>
const menuItems = [
  { text: 'New Event', id: 'Add' },
  { text: 'Print Event', iconCss: 'e-icons e-print', id: 'Print' },
  { text: 'Export Event', iconCss: 'e-icons e-export', id: 'Export' },
  { text: 'Send Email', iconCss: 'e-icons e-email', id: 'Email' }
];

const onMenuSelect = (args) => {
  const schedule = scheduleObj.value.ej2Instances;
  
  switch (args.item.id) {
    case 'Print':
      const eventObj = schedule.getEventDetails(selectedTarget);
      printEvent(eventObj);
      break;
      
    case 'Export':
      exportEvent();
      break;
      
    case 'Email':
      sendEmail();
      break;
  }
};

const printEvent = (event) => {
  console.log('Printing event:', event);
  // Implement print logic
};

const exportEvent = () => {
  console.log('Exporting event');
  // Implement export logic
};

const sendEmail = () => {
  console.log('Sending email');
  // Implement email logic
};
</script>
```

## Mobile Context Menu

For mobile devices, context menu opens on tap-hold:

```vue
<template>
  <ejs-contextmenu 
    target=".e-schedule"
    :items="menuItems"
    :beforeOpen="onBeforeOpen">
  </ejs-contextmenu>
</template>
```

**Note**: Automatically handles touch interactions. No additional configuration needed.

## Styling Context Menu

```vue
<template>
  <ejs-contextmenu 
    cssClass="custom-context-menu"
    target=".e-schedule"
    :items="menuItems">
  </ejs-contextmenu>
</template>

<style>
.custom-context-menu .e-menu-item {
  padding: 10px 15px;
}

.custom-context-menu .e-menu-item .e-icons {
  margin-right: 8px;
  font-size: 16px;
}

.custom-context-menu .e-menu-item:hover {
  background-color: #e3f2fd;
}
</style>
```

## Best Practices

1. **Close quick info popup** - Always close quick info in `beforeOpen`
2. **Validate target** - Check if clicked element is valid before showing menu
3. **Show relevant items** - Display menu items based on context (cell vs. event)
4. **Handle recurring events** - Provide options for occurrence vs. series
5. **Add custom actions** - Extend menu with application-specific features
6. **Test mobile** - Verify tap-hold interaction works on touch devices
