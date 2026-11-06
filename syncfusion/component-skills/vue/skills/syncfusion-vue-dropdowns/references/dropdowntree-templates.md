# Templates

## Table of Contents

- [Item Template](#item-template)
- [Value Template](#value-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Template Expression Syntax](#template-expression-syntax)

## Item Template

Customize the content of each list item in the dropdown using the `#itemTemplate` scoped slot. This allows complex data display with custom formatting and styling.

### Basic Item Template

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select employee"
  >
    <template #itemTemplate="{ data }">
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="font-weight: bold;">{{ data.name }}</span>
        <span style="font-size: 12px; color: #999;">
          {{ data.position }}
        </span>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const employeeData = [
  {
    id: 1,
    name: 'Michael Scott',
    position: 'Manager',
    parentId: null,
    expanded: true,
  },
  {
    id: 2,
    name: 'Dwight Schrute',
    position: 'Assistant Regional Manager',
    parentId: 1,
  },
  {
    id: 3,
    name: 'Jim Halpert',
    position: 'Sales Representative',
    parentId: 1,
  },
];

const fields = {
  dataSource: employeeData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};
</script>
```

### Styling with CSS Classes

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #itemTemplate="{ data }">
      <div class="employee-item">
        <div class="employee-name">{{ data.name }}</div>
        <div class="employee-position">{{ data.position }}</div>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>

<style scoped>
.employee-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.employee-name {
  font-weight: 600;
  color: #333;
}

.employee-position {
  font-size: 12px;
  color: #666;
}
</style>
```

### Complex Template with Status Indicator

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select project"
  >
    <template #itemTemplate="{ data }">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
        <span>{{ data.name }}</span>
        <div style="display: flex; gap: 8px; align-items: center;">
          <div style="width: 50px; height: 4px; background: #ddd; border-radius: 2px; overflow: hidden;">
            <div
              :style="{
                width: `${data.progress}%`,
                height: '100%',
                backgroundColor: getStatusColor(data.status),
              }"
            />
          </div>
          <span
            :style="{
              fontSize: '11px',
              fontWeight: 'bold',
              color: getStatusColor(data.status),
            }"
          >
            {{ data.status }}
          </span>
        </div>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const projectData = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'In Progress',
    progress: 75,
    parentId: null,
  },
  {
    id: 2,
    name: 'Database Migration',
    status: 'Completed',
    progress: 100,
    parentId: 1,
  },
  {
    id: 3,
    name: 'API Development',
    status: 'Pending',
    progress: 0,
    parentId: 1,
  },
];

const fields = {
  dataSource: projectData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return '#4CAF50';
    case 'In Progress':
      return '#FFC107';
    case 'Pending':
      return '#F44336';
    default:
      return '#999';
  }
};
</script>
```

## Value Template

Customize how selected values display in the input field using the `#valueTemplate` scoped slot.

### Basic Value Template

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select employee"
  >
    <template #valueTemplate="{ data }">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>👤</span>
        <span>{{ data.name }}</span>
        <span style="font-size: 12px; color: #999;">
          ({{ data.position }})
        </span>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Count Summary

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
  >
    <template #valueTemplate="{ data }">
      <div v-if="Array.isArray(data)">
        Selected: <strong>{{ data.length }}</strong> items
      </div>
      <div v-else>
        {{ data.name }}
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Custom Format

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
  >
    <template #valueTemplate="{ data }">
      <span
        v-if="Array.isArray(data)"
        :title="data.map(d => d.name).join(', ')"
      >
        {{ data.map(d => d.name).join(', ').substring(0, 50) }}...
      </span>
      <span v-else>{{ data.name }}</span>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Header Template

Customize the popup header using the `#headerTemplate` scoped slot. This appears statically above list items.

### Search Header

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select item"
  >
    <template #headerTemplate>
      <div style="padding: 10px; border-bottom: 1px solid #ddd;">
        <h4 style="margin: 0; font-size: 14px;">Select an Item</h4>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
          Choose one or more items from the list below
        </p>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Header with Custom Content

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #headerTemplate>
      <div style="padding: 10px; text-align: center; background: #f5f5f5;">
        <strong>Available Options</strong>
        <span style="float: right; cursor: pointer;" @click="resetSelection">Reset</span>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const resetSelection = () => {
  console.log('Reset clicked');
};
</script>
```

## Footer Template

Add static content below the list items using the `#footerTemplate` scoped slot.

### Basic Footer

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #footerTemplate>
      <div style="padding: 10px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #999;">
        Total items: {{ fields.dataSource.length }}
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
};
</script>
```

### Footer with Actions

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #footerTemplate>
      <div style="padding: 10px; border-top: 1px solid #ddd; display: flex; gap: 10px; justify-content: space-between;">
        <button @click="selectAll" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">
          Select All
        </button>
        <button @click="clearAll" style="padding: 5px 10px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer;">
          Clear
        </button>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectAll = () => {
  console.log('Select all clicked');
};

const clearAll = () => {
  console.log('Clear all clicked');
};
</script>
```

## No Records Template

Customize the message shown when no items match the filter using the `#noRecordsTemplate` scoped slot.

### Basic No Records

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :allowFiltering="true"
  >
    <template #noRecordsTemplate>
      <div style="padding: 20px; text-align: center; color: #999;">
        <p style="margin: 0; font-size: 14px;">No items found</p>
        <p style="margin: 5px 0 0 0; font-size: 12px;">
          Try a different search term
        </p>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### No Records with Icon

```vue
<template>
  <DropDownTreeComponent :fields="fields" :allowFiltering="true">
    <template #noRecordsTemplate>
      <div style="padding: 20px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
        <p style="margin: 0; color: #999;">No results found</p>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Action Failure Template

Customize the error message shown when data loading fails using the `#actionFailureTemplate` scoped slot.

### Basic Action Failure

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #actionFailureTemplate>
      <div style="padding: 20px; text-align: center; color: #d32f2f;">
        <p style="margin: 0; font-size: 14px;">⚠️ Error loading data</p>
        <p style="margin: 5px 0 0 0; font-size: 12px;">
          Please try again later
        </p>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Action Failure with Retry

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #actionFailureTemplate>
      <div style="padding: 20px; text-align: center;">
        <p style="margin: 0; color: #d32f2f; font-weight: bold;">Failed to load data</p>
        <button
          @click="retryLoad"
          style="margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;"
        >
          Retry
        </button>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const retryLoad = () => {
  console.log('Retry loading');
};
</script>
```

## Template Expression Syntax

### Data Access in Templates

All template slot scopes receive the data object. Access properties using dot notation:

```vue
<template #itemTemplate="{ data }">
  <!-- Access simple properties -->
  <div>{{ data.name }}</div>
  <div>{{ data.position }}</div>
  
  <!-- Use computed expressions -->
  <div>{{ data.salary > 50000 ? 'Senior' : 'Junior' }}</div>
  
  <!-- Conditional rendering -->
  <div v-if="data.active">Active</div>
  <div v-else>Inactive</div>
  
  <!-- Methods in template -->
  <button @click="selectItem(data.id)">Select</button>
</template>

<script setup>
const selectItem = (id) => {
  console.log('Selected:', id);
};
</script>
```

### Template with Computed Properties

```vue
<template>
  <DropDownTreeComponent :fields="fields">
    <template #itemTemplate="{ data }">
      <div style="display: flex; justify-content: space-between;">
        <span>{{ data.name }}</span>
        <span :style="{ color: getItemColor(data) }">
          {{ getItemStatus(data) }}
        </span>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { computed } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const getItemColor = (item) => {
  return item.status === 'active' ? '#4CAF50' : '#999';
};

const getItemStatus = (item) => {
  return item.status === 'active' ? '✓ Active' : '○ Inactive';
};
</script>
```

### Template with v-bind and Event Handling

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
  >
    <template #itemTemplate="{ data }">
      <div
        :class="{ selected: isSelected(data.id) }"
        @click="toggleItem(data.id)"
        style="padding: 8px; cursor: pointer;"
      >
        <strong>{{ data.name }}</strong>
        <em v-if="data.department">({{ data.department }})</em>
      </div>
    </template>
  </DropDownTreeComponent>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedItems = ref(new Set());

const isSelected = (id) => selectedItems.value.has(id);

const toggleItem = (id) => {
  if (isSelected(id)) {
    selectedItems.value.delete(id);
  } else {
    selectedItems.value.add(id);
  }
};
</script>

<style scoped>
.selected {
  background-color: #e3f2fd;
  border-left: 3px solid #2196f3;
  padding-left: 5px;
}
</style>
```
