# Resource Customization

## Table of Contents
- [Custom Working Hours per Resource](#custom-working-hours-per-resource)
- [Custom Working Days per Resource](#custom-working-days-per-resource)
- [Resource Header Template](#resource-header-template)
- [Multi-Column Resource Headers (Timeline Only)](#multi-column-resource-headers-timeline-only)
- [Customizing Parent Resource Cells](#customizing-parent-resource-cells)
- [Custom CSS Class per Resource](#custom-css-class-per-resource)
- [Expanded/Collapsed State (Timeline)](#expandedcollapsed-state-timeline)
- [Best Practices](#best-practices)

## Resource Customization

### Custom Working Hours per Resource

Set different working hours for each resource:

```vue
<script setup>
const ownerData = [
  { 
    Id: 1, 
    OwnerText: 'Nancy', 
    OwnerColor: '#ffaa00',
    StartHour: '08:00',
    EndHour: '17:00'
  }, 
  { 
    Id: 2, 
    OwnerText: 'Steven', 
    OwnerColor: '#f8a398',
    StartHour: '10:00',
    EndHour: '19:00'
  }
];
</script>

<template>
  <e-resources>
    <e-resource 
      field="OwnerId" 
      title="Owner" 
      name="Owners"
      :dataSource="ownerData"
      textField="OwnerText"
      idField="Id"
      colorField="OwnerColor"
      startHourField="StartHour"
      endHourField="EndHour">
    </e-resource>
  </e-resources>
</template>
```

### Custom Working Days per Resource

Define working days for each resource:

```vue
<script setup>
const ownerData = [
  { 
    Id: 1, 
    OwnerText: 'Nancy', 
    OwnerColor: '#ffaa00',
    WorkDays: [1, 2, 3, 4, 5] // Mon-Fri
  }, 
  { 
    Id: 2, 
    OwnerText: 'Steven', 
    OwnerColor: '#f8a398',
    WorkDays: [0, 2, 4, 6] // Sun, Tue, Thu, Sat
  }
];
</script>

<template>
  <e-resources>
    <e-resource 
      workDaysField="WorkDays"
      field="OwnerId" 
      title="Owner" 
      name="Owners"
      :dataSource="ownerData"
      textField="OwnerText"
      idField="Id"
      colorField="OwnerColor">
    </e-resource>
  </e-resources>
</template>
```

### Resource Header Template

Customize resource header display:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group">
    <e-resources>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        colorField="OwnerColor"
        :resourceHeaderTemplate="'resourceHeaderTemplate'">
        <template v-slot:resourceHeaderTemplate="{ data }">
          <div class="template-wrap">
            <div class="resource-image">
              <img :src="`images/${data.resourceData.Image}.png`" />
            </div>
            <div class="resource-details">
              <div class="resource-name">{{ data.resourceData.OwnerText }}</div>
              <div class="resource-designation">{{ data.resourceData.Designation }}</div>
            </div>
          </div>
        </template>
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
const ownerData = [
  { 
    Id: 1, 
    OwnerText: 'Nancy', 
    OwnerColor: '#ffaa00',
    Image: 'nancy',
    Designation: 'Project Manager'
  }, 
  { 
    Id: 2, 
    OwnerText: 'Steven', 
    OwnerColor: '#f8a398',
    Image: 'steven',
    Designation: 'Developer'
  }
];

const group = {
  resources: ['Owners']
};
</script>

<style>
.template-wrap {
  display: flex;
  align-items: center;
  padding: 5px;
}
.resource-image img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.resource-details {
  margin-left: 10px;
}
.resource-name {
  font-size: 16px;
  font-weight: 500;
}
.resource-designation {
  font-size: 12px;
  color: gray;
}
</style>
```

### Multi-Column Resource Headers (Timeline Only)

Create multi-column resource headers with custom fields:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group"
    :renderCell="onRenderCell">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
    </e-views>
    <template v-slot:resourceHeaderTemplate="{ data }">
      <div class="template-wrap">
        <div class="room-name">{{ data.resourceData.Text }}</div>
        <div class="room-type">{{ data.resourceData.Type }}</div>
        <div class="room-capacity">{{ data.resourceData.Capacity }}</div>
      </div>
    </template>
    <e-resources>
      <e-resource 
        field="RoomId" 
        title="RoomType" 
        name="MeetingRoom"
        :dataSource="roomData"
        textField="Text"
        idField="Id"
        colorField="Color"
        :resourceHeaderTemplate="'resourceHeaderTemplate'">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews, TimelineMonth } from '@syncfusion/ej2-vue-schedule';

const roomData = [
  { Text: 'Jammy', Id: 1, Color: '#ea7a57', Capacity: 20, Type: 'Conference' },
  { Text: 'Tweety', Id: 2, Color: '#7fa900', Capacity: 7, Type: 'Cabin' },
  { Text: 'Nestle', Id: 3, Color: '#5978ee', Capacity: 5, Type: 'Cabin' }
];

const group = {
  resources: ['MeetingRoom']
};

const eventSettings = { dataSource: [] };

const onRenderCell = function (args) {
  if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
    let target = args.element.querySelector('.e-resource-text');
    target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
  }
};

provide('schedule', [TimelineViews, TimelineMonth]);
</script>

<style>
.template-wrap {
  display: flex;
  height: 100%;
  text-align: left;
}

.template-wrap > div {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 0 33.3%;
  font-weight: 500;
  line-height: 58px;
  overflow: hidden;
  padding-left: 5px;
  text-overflow: ellipsis;
}

.template-wrap > div:last-child {
  border-right: 0;
}

.e-schedule .e-timeline-view .e-resource-left-td .e-resource-text {
  display: flex;
  font-weight: 500;
  padding: 0;
}

.e-schedule .e-timeline-view .e-resource-left-td .e-resource-text > div {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  flex: 0 0 33.3%;
  font-weight: 500;
  height: 36px;
  line-height: 34px;
  padding-left: 5px;
}

.e-schedule .e-timeline-view .e-resource-left-td .e-resource-text > div:last-child {
  border-right: 0;
}
</style>
```

### Customizing Parent Resource Cells

Customize parent resource cells in timeline views by checking `elementType` in `renderCell`:

```vue
<template>
  <ejs-schedule 
    :eventSettings="eventSettings"
    :group="group"
    :renderCell="onRenderCell">
    <e-views>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="TimelineMonth"></e-view>
    </e-views>
    <e-resources>
      <e-resource 
        field="RoomId" 
        title="Room" 
        name="Rooms"
        :dataSource="roomData"
        textField="RoomText"
        idField="Id"
        groupIDField="RoomGroupId"
        colorField="RoomColor">
      </e-resource>
      <e-resource 
        field="OwnerId" 
        title="Owner" 
        name="Owners"
        :allowMultiple="true"
        :dataSource="ownerData"
        textField="OwnerText"
        idField="Id"
        groupIDField="OwnerGroupId"
        colorField="OwnerColor">
      </e-resource>
    </e-resources>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews, TimelineMonth } from '@syncfusion/ej2-vue-schedule';

const roomData = [
  { RoomText: 'ROOM 1', Id: 1, RoomGroupId: 1, RoomColor: '#cb6bb2' },
  { RoomText: 'ROOM 2', Id: 2, RoomGroupId: 2, RoomColor: '#56ca85' }
];

const ownerData = [
  { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
  { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
  { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
];

const group = {
  resources: ['Rooms', 'Owners']
};

const eventSettings = { dataSource: [] };

const onRenderCell = function (args) {
  // Customize parent resource group cells
  if (args.elementType === 'resourceGroupCells' && args.element.classList.contains('e-work-hours')) {
    args.element.style.background = '#FAFAE3'; // Light background for work hours
  }
};

provide('schedule', [TimelineViews, TimelineMonth]);
</script>
```

**elementType Values:**
- `resourceGroupCells`: Parent/group level resource cells (for customizing group header area)
- `emptyCells`: Empty cells in the resource header row
- `workCells`: Work hours cells
- `weekendCells`: Weekend cells

### Custom CSS Class per Resource

Apply custom styles to resource appointments:

```vue
<script setup>
const ownerData = [
  { 
    Id: 1, 
    OwnerText: 'Nancy', 
    OwnerColor: '#ffaa00',
    CssClass: 'nancy-appointments'
  }, 
  { 
    Id: 2, 
    OwnerText: 'Steven', 
    OwnerColor: '#f8a398',
    CssClass: 'steven-appointments'
  }
];
</script>

<template>
  <e-resources>
    <e-resource 
      cssClassField="CssClass"
      field="OwnerId" 
      title="Owner" 
      name="Owners"
      :dataSource="ownerData"
      textField="OwnerText"
      idField="Id"
      colorField="OwnerColor">
    </e-resource>
  </e-resources>
</template>

<style>
.nancy-appointments {
  border-left: 4px solid #ff6b6b !important;
  font-weight: bold;
}
.steven-appointments {
  border-left: 4px solid #4ecdc4 !important;
  font-style: italic;
}
</style>
```

## Expanded/Collapsed State (Timeline)

Control initial expand/collapse state for Timeline views:

```vue
<script setup>
const ownerData = [
  { Id: 1, OwnerText: 'Nancy', OwnerColor: '#ffaa00', Expanded: true },
  { Id: 2, OwnerText: 'Steven', OwnerColor: '#f8a398', Expanded: false }
];
</script>

<template>
  <e-resources>
    <e-resource 
      expandedField="Expanded"
      field="OwnerId" 
      title="Owner" 
      name="Owners"
      :dataSource="ownerData"
      textField="OwnerText"
      idField="Id"
      colorField="OwnerColor">
    </e-resource>
  </e-resources>
</template>
```

## Best Practices

1. **Use unique resource IDs** - Ensure `idField` values are unique across resources
2. **Set meaningful colors** - Use distinct colors for better visual distinction
3. **Limit resource count** - Too many resources reduce usability; consider pagination or filters
4. **Enable allowMultiple** - When appointments need multiple resource assignment
5. **Use hierarchical grouping** - Organize complex resource structures logically
6. **Customize working hours** - Set resource-specific hours for accurate availability
7. **Apply resource templates** - Enhance header display with images and additional info
8. **Test with Timeline views** - Timeline views often work better with multiple resources
9. **Implement resource filtering** - Allow users to show/hide specific resources
10. **Validate resource assignments** - Ensure appointments have valid resource IDs before saving
