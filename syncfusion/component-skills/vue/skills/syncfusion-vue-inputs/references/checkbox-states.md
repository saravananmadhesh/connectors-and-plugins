# States — Syncfusion Vue CheckBox

Manage checkbox states including checked, unchecked, disabled, and indeterminate.

---

## Table of Contents
- [Checked State](#checked-state)
- [Unchecked State](#unchecked-state)
- [Disabled State](#disabled-state)
- [Indeterminate State](#indeterminate-state)
- [State Change Events](#state-change-events)
- [Programmatic State Management](#programmatic-state-management)

---

## Checked State

Set the `:checked="true"` property to render a checked checkbox:

```vue
<template>
  <div>
    <ejs-checkbox
      label="Agree to Terms"
      :checked="true">
    </ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

**Property:** `checked` — `boolean`, defaults to `false`

---

## Unchecked State

Checkboxes are unchecked by default. No prop is needed:

```vue
<template>
  <div>
    <ejs-checkbox label="Newsletter Signup"></ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

---

## Disabled State

Prevent user interaction by setting `:disabled="true"`:

```vue
<template>
  <div>
    <ul>
      <!-- Disabled and unchecked -->
      <li>
        <ejs-checkbox
          label="Disabled (Unchecked)"
          :disabled="true">
        </ejs-checkbox>
      </li>

      <!-- Disabled and checked -->
      <li>
        <ejs-checkbox
          label="Disabled (Checked)"
          :checked="true"
          :disabled="true">
        </ejs-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

**Property:** `disabled` — `boolean`, defaults to `false`

**Use Cases:**
- Disable checkboxes until a prerequisite condition is met
- Lock settings that should not be changed
- Indicate unavailable options

---

## Indeterminate State

The indeterminate state represents a "partially checked" condition, commonly used in hierarchical checkboxes (e.g., "Select All" when some items are checked):

```vue
<template>
  <div>
    <ejs-checkbox
      label="Select All Items"
      :indeterminate="isIndeterminate"
      @change="handleSelectAll">
    </ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  },
  data() {
    return {
      isIndeterminate: true
    }
  },
  methods: {
    handleSelectAll(event) {
      if (event.checked) {
        // All selected
        this.isIndeterminate = false;
      } else {
        // None selected
        this.isIndeterminate = false;
      }
    }
  }
}
</script>
```

**Property:** `indeterminate` — `boolean`, defaults to `false`

**Note:** The indeterminate state is typically read-only. It's set programmatically when managing hierarchical selections.

---

## State Change Events

React to state changes using the `change` event:

```vue
<template>
  <div>
    <ejs-checkbox
      label="Enable Notifications"
      @change="onCheckboxChange">
    </ejs-checkbox>

    <p v-if="notificationsEnabled">✓ Notifications are enabled</p>
    <p v-else>✗ Notifications are disabled</p>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  },
  data() {
    return {
      notificationsEnabled: false
    }
  },
  methods: {
    onCheckboxChange(event) {
      this.notificationsEnabled = event.checked;
      console.log('Checkbox changed:', event.checked);
    }
  }
}
</script>
```

**Event:** `change` — Fires when the checkbox state changes
- **`event.checked`** — New checked state (`true` or `false`)
- **`event.indeterminate`** — Indeterminate state (`true` or `false`)

---

## Programmatic State Management

Update checkbox state using Vue's reactive data:

```vue
<template>
  <div>
    <div class="controls">
      <button @click="toggleCheckbox">Toggle Checkbox</button>
      <button @click="setChecked">Set Checked</button>
      <button @click="setUnchecked">Set Unchecked</button>
      <button @click="setDisabled">Set Disabled</button>
      <button @click="enableCheckbox">Enable Checkbox</button>
    </div>

    <ejs-checkbox
      ref="checkboxRef"
      :label="checkboxLabel"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="handleChange">
    </ejs-checkbox>

    <p>Current State: {{ stateInfo }}</p>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  },
  data() {
    return {
      isChecked: false,
      isDisabled: false,
      checkboxLabel: 'Manage State Programmatically'
    }
  },
  computed: {
    stateInfo() {
      return `${this.isChecked ? 'Checked' : 'Unchecked'} - ${this.isDisabled ? 'Disabled' : 'Enabled'}`;
    }
  },
  methods: {
    toggleCheckbox() {
      this.isChecked = !this.isChecked;
    },
    setChecked() {
      this.isChecked = true;
    },
    setUnchecked() {
      this.isChecked = false;
    },
    setDisabled() {
      this.isDisabled = true;
    },
    enableCheckbox() {
      this.isDisabled = false;
    },
    handleChange(event) {
      console.log('State changed:', event.checked);
    }
  }
}
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #106ebe;
}

p {
  margin-top: 20px;
  font-weight: bold;
}
</style>
```

**Best Practices:**
- Use Vue's reactive data (`data()`) to manage state
- Bind to `:checked`, `:disabled`, and `:indeterminate` for two-way sync
- Listen to `change` events to capture user interactions
- Avoid direct DOM manipulation via `ref` unless necessary
