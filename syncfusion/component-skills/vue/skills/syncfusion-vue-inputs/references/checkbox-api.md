# CheckBox API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | false | Whether checkbox is checked |
| `indeterminate` | boolean | false | Indeterminate state (partially checked) |
| `disabled` | boolean | false | Disable the checkbox |
| `label` | string | - | Label text for the checkbox |
| `labelPosition` | string | 'After' | Label position: 'Before' or 'After' |
| `name` | string | - | Name attribute for form submission |
| `value` | string | - | Value attribute for form submission |
| `cssClass` | string | - | Custom CSS class for styling |
| `htmlAttributes` | object | - | HTML attributes for the checkbox |
| `enableRtl` | boolean | false | Enable RTL mode |
| `locale` | string | 'en-US' | Localization language |
| `id` | string | - | Component ID attribute |
| `readonly` | boolean | false | Make checkbox read-only |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `click()` | - | void | Trigger checkbox click |
| `toggle()` | - | void | Toggle checked state |
| `check()` | - | void | Check the checkbox |
| `unCheck()` | - | void | Uncheck the checkbox |
| `setIndeterminate()` | - | void | Set indeterminate state |
| `enable()` | - | void | Enable the component |
| `disable()` | - | void | Disable the component |
| `focus()` | - | void | Set focus on checkbox |
| `blur()` | - | void | Remove focus from checkbox |
| `destroy()` | - | void | Destroy component |

---

## Events

### State Change Events

```typescript
// Value changed
onChange = (args: ChangeEventArgs) => {
  console.log(args.checked);         // New checked state
  console.log(args.indeterminate);   // Indeterminate state
  console.log(args.isInteracted);    // User interaction flag
};

// Input event
onInput = (args: InputEventArgs) => {
  console.log(args.checked);  // Checked state
};

// Focus event
onFocus = (args: FocusEventArgs) => {
  console.log('CheckBox focused');
};

// Blur event
onBlur = (args: BlurEventArgs) => {
  console.log('CheckBox blurred');
};
```

### Lifecycle Events

```typescript
// Before change
onBeforeChange = (args: BeforeChangeEventArgs) => {
  // args.cancel = true; // Prevent state change
  console.log(args.checked);
};

// Created
onCreated = () => {
  console.log('CheckBox created');
};

// Destroyed
onDestroyed = () => {
  console.log('CheckBox destroyed');
};
```

---

## Vue 3 Template Binding

```vue
<template>
  <div class="checkbox-demo">
    <!-- Basic CheckBox -->
    <CheckBoxComponent
      v-model="isAgree"
      label="I agree to terms"
      @change="onChange"
    />

    <!-- Disabled CheckBox -->
    <CheckBoxComponent
      v-model="isReadonly"
      label="Read-only option"
      :disabled="true"
    />

    <!-- Indeterminate CheckBox -->
    <CheckBoxComponent
      v-model="selectAll"
      label="Select All"
      :indeterminate="isIndeterminate"
      @change="onSelectAllChange"
    />

    <!-- Display values -->
    <p>Agreed: {{ isAgree }}</p>
    <p>Select All: {{ selectAll }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const isAgree = ref(false);
const isReadonly = ref(true);
const selectAll = ref(false);
const items = ref([
  { id: 1, name: 'Item 1', checked: false },
  { id: 2, name: 'Item 2', checked: false },
  { id: 3, name: 'Item 3', checked: false }
]);

const isIndeterminate = computed(() => {
  const checkedCount = items.value.filter(i => i.checked).length;
  return checkedCount > 0 && checkedCount < items.value.length;
});

const onChange = (args) => {
  console.log(`CheckBox changed: ${args.checked}`);
};

const onSelectAllChange = (args) => {
  items.value.forEach(item => {
    item.checked = args.checked;
  });
};
</script>
```

---

## Label Positioning

```typescript
// Label after checkbox (default)
labelPosition: 'After'  // [☑] Label text

// Label before checkbox
labelPosition: 'Before' // Label text [☑]
```

---

## Indeterminate State

The indeterminate state represents a "partially checked" condition, commonly used in tree/list selection scenarios:

```typescript
// Example: Select All functionality with partial selection
const isIndeterminate = computed(() => {
  const checked = items.value.filter(i => i.checked).length;
  // Indeterminate if some (but not all) items are checked
  return checked > 0 && checked < items.value.length;
});

const allChecked = computed(() => {
  return items.value.every(i => i.checked);
});

const handleSelectAll = (args) => {
  items.value.forEach(item => {
    item.checked = args.checked;
  });
};
```

---

## Complete API Example

```vue
<template>
  <div class="checkbox-form">
    <!-- Select All with Indeterminate -->
    <div class="checkbox-group">
      <CheckBoxComponent
        v-model="allSelected"
        label="Select All Items"
        :indeterminate="isIndeterminate"
        @change="onSelectAllChange"
      />
    </div>

    <!-- Item List -->
    <div class="item-list">
      <div v-for="item in items" :key="item.id" class="checkbox-item">
        <CheckBoxComponent
          v-model="item.checked"
          :label="item.name"
          @change="onItemChange"
        />
      </div>
    </div>

    <!-- Options Group -->
    <div class="options-group">
      <h3>Subscribe to Newsletters</h3>
      
      <CheckBoxComponent
        v-model="preferences.marketing"
        label="Marketing Updates"
        @change="onPreferenceChange"
      />

      <CheckBoxComponent
        v-model="preferences.updates"
        label="Product Updates"
        @change="onPreferenceChange"
      />

      <CheckBoxComponent
        v-model="preferences.weekly"
        label="Weekly Digest"
        @change="onPreferenceChange"
      />

      <CheckBoxComponent
        v-model="preferences.disabled"
        label="Disabled Option"
        :disabled="true"
      />
    </div>

    <!-- Readonly Group -->
    <div class="readonly-group">
      <h3>Current Subscriptions (Read-only)</h3>
      
      <CheckBoxComponent
        v-model="subscriptions.premium"
        label="Premium Support"
        :readonly="true"
      />

      <CheckBoxComponent
        v-model="subscriptions.team"
        label="Team Features"
        :readonly="true"
      />
    </div>

    <!-- Summary -->
    <div class="summary">
      <h3>Selection Summary</h3>
      <p>Selected Items: {{ selectedCount }} / {{ items.length }}</p>
      <p>Marketing Emails: {{ preferences.marketing ? 'Yes' : 'No' }}</p>
      <p>Product Updates: {{ preferences.updates ? 'Yes' : 'No' }}</p>
      <p>Weekly Digest: {{ preferences.weekly ? 'Yes' : 'No' }}</p>

      <h4>Selected Item Details:</h4>
      <ul>
        <li v-for="item in selectedItems" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- Action Buttons -->
    <button @click="resetAll">Reset All</button>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

// Items list
const items = ref([
  { id: 1, name: 'Feature Request', checked: false },
  { id: 2, name: 'Bug Report', checked: true },
  { id: 3, name: 'Documentation', checked: true },
  { id: 4, name: 'Enhancement', checked: false },
  { id: 5, name: 'Question', checked: false }
]);

// Newsletter preferences
const preferences = ref({
  marketing: true,
  updates: false,
  weekly: true,
  disabled: false
});

// Subscriptions (read-only)
const subscriptions = ref({
  premium: true,
  team: false
});

// Select All state
const allSelected = ref(false);

// Computed properties
const selectedCount = computed(() => {
  return items.value.filter(i => i.checked).length;
});

const selectedItems = computed(() => {
  return items.value.filter(i => i.checked);
});

const isIndeterminate = computed(() => {
  const checked = selectedCount.value;
  return checked > 0 && checked < items.value.length;
});

// Event handlers
const onSelectAllChange = (args) => {
  items.value.forEach(item => {
    item.checked = args.checked;
  });
  allSelected.value = args.checked;
};

const onItemChange = () => {
  const checked = selectedCount.value;
  if (checked === 0) {
    allSelected.value = false;
  } else if (checked === items.value.length) {
    allSelected.value = true;
  } else {
    // Indeterminate state handled by computed property
    allSelected.value = false;
  }
};

const onPreferenceChange = () => {
  console.log('Preferences updated:', preferences.value);
};

const resetAll = () => {
  items.value.forEach(item => {
    item.checked = false;
  });
  allSelected.value = false;
  preferences.value = {
    marketing: true,
    updates: false,
    weekly: true,
    disabled: false
  };
};

const submitForm = () => {
  const data = {
    items: selectedItems.value,
    preferences: preferences.value,
    subscriptions: subscriptions.value
  };
  console.log('Form submitted:', data);
  alert('Form submitted! Check console for details.');
};
</script>

<style scoped>
.checkbox-form {
  max-width: 400px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.checkbox-group,
.checkbox-item,
.options-group,
.readonly-group {
  margin-bottom: 20px;
}

.checkbox-item {
  margin-left: 20px;
  margin-bottom: 10px;
}

h3 {
  margin: 15px 0 10px 0;
  font-size: 1.1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

h4 {
  margin: 10px 0 5px 0;
  font-size: 0.95rem;
}

.summary {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.summary p {
  margin: 5px 0;
}

.summary ul {
  margin-left: 20px;
  padding: 10px 0;
}

.summary li {
  margin: 3px 0;
}

button {
  padding: 8px 16px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

