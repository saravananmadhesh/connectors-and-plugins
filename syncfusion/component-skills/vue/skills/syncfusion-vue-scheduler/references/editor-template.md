# Editor Template and Custom Fields

## Table of Contents
- [Event Editor Overview](#event-editor-overview)
- [Customizing Editor Labels](#customizing-editor-labels)
- [Customizing Editor Buttons](#customizing-editor-buttons)
- [Field Validation](#field-validation)
- [Add Additional Fields](#add-additional-fields)
- [Custom Editor Template](#custom-editor-template)
- [Quick Info Template](#quick-info-template)

## Event Editor Overview

The event editor is a popup/dialog that opens when:
- Double-clicking a cell (add mode)
- Double-clicking an event (edit mode)
- Single-clicking a cell then pressing Enter (quick add)

## Customizing Editor Labels

Change default field labels using `title` property:

```vue
<script setup>
const eventSettings = {
  dataSource: [],
  fields: {
    subject: { name: 'Subject', title: 'Event Name' },
    location: { name: 'Location', title: 'Event Location' },
    description: { name: 'Description', title: 'Event Description' },
    startTime: { name: 'StartTime', title: 'Start Duration' },
    endTime: { name: 'EndTime', title: 'End Duration' }
  }
};
</script>
```

## Customizing Editor Buttons

Change editor button text using localization:

```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add Event'
    }
  }
});
</script>
```

## Field Validation

Add validation rules to editor fields:

```vue
<script setup>
const eventSettings = {
  dataSource: [],
  fields: {
    subject: { 
      name: 'Subject', 
      title: 'Event Name',
      validation: { required: true }
    },
    location: { 
      name: 'Location', 
      validation: { 
        required: true,
        regex: ['^[a-zA-Z0-9 ]+$', 'Special characters not allowed']
      }
    }
  }
};
</script>
```

## Add Additional Fields

Add custom fields to default editor:

```vue
<template>
  <ejs-schedule 
    ref="scheduleObj"
    :popupOpen="onPopupOpen"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { ref } from "vue";
import { createElement } from '@syncfusion/ej2-base';

const scheduleObj = ref(null);

const onPopupOpen = (args) => {
  if (args.type === 'Editor') {
    // Add custom field
    if (!args.element.querySelector('.custom-field-row')) {
      const row = createElement('div', { className: 'custom-field-row' });
      const formElement = args.element.querySelector('.e-schedule-form');
      formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
      
      const container = createElement('div', { className: 'custom-field-container' });
      const inputEle = createElement('input', {
        className: 'e-field', attrs: { name: 'Priority' }
      });
      container.appendChild(inputEle);
      row.appendChild(container);
      
      // Create dropdown for priority
      let dropDownList = new DropDownList({
        dataSource: ['High', 'Medium', 'Low'],
        value: args.data.Priority,
        placeholder: 'Priority'
      });
      dropDownList.appendTo(inputEle);
    }
  }
};

const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      Priority: 'High' // Custom field
    }
  ]
};
</script>
```

## Custom Editor Template

Create fully custom editor:

```vue
<template>
  <ejs-schedule 
    :editorTemplate="'editorTemplate'"
    :eventSettings="eventSettings">
    <template v-slot:editorTemplate="{ data }">
      <div class="custom-editor">
        <div class="e-title-location-row">
          <input type="text" v-model="data.Subject" placeholder="Title" />
        </div>
        <div class="e-start-end-row">
          <ejs-datetimepicker v-model="data.StartTime"></ejs-datetimepicker>
          <ejs-datetimepicker v-model="data.EndTime"></ejs-datetimepicker>
        </div>
        <div class="e-description-row">
          <textarea v-model="data.Description" placeholder="Description"></textarea>
        </div>
        <div class="e-priority-row">
          <ejs-dropdownlist 
            v-model="data.Priority"
            :dataSource="['High', 'Medium', 'Low']"
            placeholder="Select Priority">
          </ejs-dropdownlist>
        </div>
      </div>
    </template>
  </ejs-schedule>
</template>

<style>
.custom-editor {
  padding: 20px;
}
.custom-editor input,
.custom-editor textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
}
</style>
```

## Quick Info Template

Customize quick info popup:

```vue
<template>
  <ejs-schedule :quickInfoTemplates="quickInfoTemplates">
  </ejs-schedule>
</template>

<script setup>
const quickInfoTemplates = {
  header: (props) => {
    return `<div class="quick-info-header">${props.Subject || 'New Event'}</div>`;
  },
  content: (props) => {
    return `<div class="quick-info-content">
      <div>Time: ${formatTime(props.StartTime)} - ${formatTime(props.EndTime)}</div>
      <div>Location: ${props.Location || 'N/A'}</div>
    </div>`;
  },
  footer: (props) => {
    return `<div class="quick-info-footer">
      <button class="e-btn e-flat" onclick="editEvent()">Edit</button>
      <button class="e-btn e-flat" onclick="deleteEvent()">Delete</button>
    </div>`;
  }
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
</script>
```

## Disable Editor

Prevent editor from opening:

```vue
<template>
  <ejs-schedule 
    :readonly="true"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>
```

Or use `popupOpen` event:

```vue
<script setup>
const onPopupOpen = (args) => {
  if (args.type === 'Editor') {
    args.cancel = true; // Prevent editor from opening
  }
};
</script>
```

## Best Practices

1. **Validate custom fields** - Add proper validation for custom fields
2. **Store custom data** - Ensure custom fields are saved to dataSource
3. **Test editor responsiveness** - Verify editor works on mobile devices
4. **Keep editor simple** - Too many fields reduce usability
5. **Use localization** - Support multiple languages for button text
6. **Handle save/cancel** - Properly handle user actions in custom templates
