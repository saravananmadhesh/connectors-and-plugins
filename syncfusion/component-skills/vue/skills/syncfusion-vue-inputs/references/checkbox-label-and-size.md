# Label and Size — Syncfusion Vue CheckBox

Configure the checkbox caption text, label position, and display size.

---

## Label

Use the `label` property to define the caption for the CheckBox. This eliminates the need for separate `<label>` HTML elements.

```vue
<template>
  <div>
    <ejs-checkbox label="Accept Terms and Conditions"></ejs-checkbox>
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

**Property:** `label` — `string`, defaults to `''`

---

## Label Position

Use the `label-position` property to place the label **before** or **after** the checkbox frame.

| Value | Behavior |
|-------|----------|
| `"After"` | Label appears to the **right** of the checkbox (default) |
| `"Before"` | Label appears to the **left** of the checkbox |

```vue
<template>
  <div>
    <ul>
      <!-- Label on the left -->
      <li>
        <ejs-checkbox
          label="Left Side Label"
          label-position="Before">
        </ejs-checkbox>
      </li>

      <!-- Label on the right (default) -->
      <li>
        <ejs-checkbox
          label="Right Side Label"
          :checked="true">
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

**Property:** `labelPosition` — `'Before' | 'After'`, defaults to `'After'`

---

## Size

The CheckBox offers two size options:

| Size | How to Set |
|------|-----------|
| **Default** | No additional prop needed |
| **Small** | `css-class="e-small"` |

Use small checkboxes in compact layouts, data tables, or dense form fields.

```vue
<template>
  <div>
    <ul>
      <!-- Small size -->
      <li>
        <ejs-checkbox
          label="Small"
          css-class="e-small">
        </ejs-checkbox>
      </li>

      <!-- Default size -->
      <li>
        <ejs-checkbox
          label="Default">
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

**Property:** `cssClass` — `string`, defaults to `''`

---

## Combined Example

```vue
<template>
  <div class="label-size-demo">
    <h3>Checkbox Label and Size Variations</h3>
    
    <div class="section">
      <h4>Default Size</h4>
      <ejs-checkbox
        label="Accept Terms"
        :checked="true">
      </ejs-checkbox>
    </div>

    <div class="section">
      <h4>Small Size</h4>
      <ejs-checkbox
        label="Remember Me"
        css-class="e-small"
        :checked="true">
      </ejs-checkbox>
    </div>

    <div class="section">
      <h4>Label Position - Before</h4>
      <ejs-checkbox
        label="Subscribe to Updates"
        label-position="Before">
      </ejs-checkbox>
    </div>

    <div class="section">
      <h4>Label Position - After</h4>
      <ejs-checkbox
        label="Receive Notifications"
        label-position="After">
      </ejs-checkbox>
    </div>

    <div class="section">
      <h4>Multiple Checkboxes</h4>
      <ul class="checkbox-list">
        <li v-for="item in checkboxItems" :key="item">
          <ejs-checkbox
            :label="item"
            :checked="selectedItems.includes(item)"
            @change="toggleCheckbox(item)">
          </ejs-checkbox>
        </li>
      </ul>
    </div>
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
      checkboxItems: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      selectedItems: ['Option 1']
    }
  },
  methods: {
    toggleCheckbox(item) {
      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    }
  }
}
</script>

<style scoped>
.label-size-demo {
  padding: 20px;
}

.section {
  margin: 20px 0;
}

.checkbox-list {
  list-style: none;
  padding: 0;
}

.checkbox-list li {
  margin: 10px 0;
}

h4 {
  margin-bottom: 10px;
  color: #333;
}
</style>
```
