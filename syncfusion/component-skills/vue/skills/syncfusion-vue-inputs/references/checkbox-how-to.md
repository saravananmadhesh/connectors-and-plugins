# How-To Guides — Syncfusion Vue CheckBox

## Table of Contents
- [Use Name and Value in Form Submission](#use-name-and-value-in-form-submission)
- [Enable Right-to-Left (RTL)](#enable-right-to-left-rtl)
- [Create Customized Checkbox Variants](#create-customized-checkbox-variants)
  - [Color Variants](#color-variants)
  - [Round (Custom Frame) Checkbox](#round-custom-frame-checkbox)
  - [Custom Check Icon](#custom-check-icon)

---

## Use Name and Value in Form Submission

The `name` attribute groups checkboxes in a form. When the form is submitted, only **checked** checkbox values are sent to the server. **Disabled** and **unchecked** checkboxes are excluded from the submission payload.

Retrieve submitted values server-side using the `name` attribute key.

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <ul>
      <!-- Checked — will be submitted -->
      <li>
        <ejs-checkbox
          name="Sport"
          value="Cricket"
          label="Cricket"
          :checked="true">
        </ejs-checkbox>
      </li>

      <!-- Checked — will be submitted -->
      <li>
        <ejs-checkbox
          name="Sport"
          value="Hockey"
          label="Hockey"
          :checked="true">
        </ejs-checkbox>
      </li>

      <!-- Disabled — will NOT be submitted -->
      <li>
        <ejs-checkbox
          name="Sport"
          value="Tennis"
          label="Tennis"
          :disabled="true">
        </ejs-checkbox>
      </li>

      <!-- Unchecked — will NOT be submitted -->
      <li>
        <ejs-checkbox
          name="Sport"
          value="Basketball"
          label="Basketball">
        </ejs-checkbox>
      </li>

      <li>
        <ejs-button is-primary="true">Submit</ejs-button>
      </li>
    </ul>
  </form>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent,
    'ejs-button': ButtonComponent
  },
  methods: {
    handleSubmit() {
      // On submit, only Sport=Cricket and Sport=Hockey are sent
      console.log('Form submitted');
    }
  }
}
</script>
```

**Result:** On submit, only `Sport=Cricket` and `Sport=Hockey` are sent.

- **`name`** — `string`: Groups checkboxes as a form field name
- **`value`** — `string`: The value sent for this checkbox when checked

---

## Enable Right-to-Left (RTL)

Set `:enable-rtl="true"` to flip the CheckBox layout for RTL locales (Arabic, Hebrew, etc.):

```vue
<template>
  <div>
    <ul>
      <li>
        <ejs-checkbox
          label="Default RTL Checkbox"
          :enable-rtl="true">
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

The checkbox frame and label render in right-to-left order. Combine with `label-position="Before"` for additional control.

---

## Create Customized Checkbox Variants

### Color Variants

Apply semantic color meanings (primary, success, warning, danger, info) by combining `css-class` with custom CSS:

```vue
<template>
  <div>
    <ul>
      <li>
        <ejs-checkbox
          label="Primary"
          css-class="e-primary"
          :checked="true">
        </ejs-checkbox>
      </li>
      <li>
        <ejs-checkbox
          label="Success"
          css-class="e-success"
          :checked="true">
        </ejs-checkbox>
      </li>
      <li>
        <ejs-checkbox
          label="Info"
          css-class="e-info"
          :checked="true">
        </ejs-checkbox>
      </li>
      <li>
        <ejs-checkbox
          label="Warning"
          css-class="e-warning"
          :checked="true">
        </ejs-checkbox>
      </li>
      <li>
        <ejs-checkbox
          label="Danger"
          css-class="e-danger"
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

**CSS Styling (App.css):**

```css
/* Primary */
.e-checkbox.e-primary .e-frame {
  background-color: #0078d4;
  border-color: #0078d4;
}

/* Success */
.e-checkbox.e-success .e-frame {
  background-color: #107c10;
  border-color: #107c10;
}

/* Info */
.e-checkbox.e-info .e-frame {
  background-color: #0078d4;
  border-color: #0078d4;
}

/* Warning */
.e-checkbox.e-warning .e-frame {
  background-color: #ffb900;
  border-color: #ffb900;
}

/* Danger */
.e-checkbox.e-danger .e-frame {
  background-color: #d83b01;
  border-color: #d83b01;
}
```

### Round (Custom Frame) Checkbox

Create circular checkboxes using CSS border-radius:

```vue
<template>
  <div class="round-checkbox-container">
    <ejs-checkbox
      label="Round Checkbox"
      css-class="e-round"
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

<style scoped>
.e-checkbox.e-round .e-frame {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
</style>
```

### Custom Check Icon

Replace the default checkmark with a custom icon:

```vue
<template>
  <div>
    <ejs-checkbox
      label="Custom Icon"
      css-class="custom-icon-checkbox"
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

<style scoped>
.e-checkbox.custom-icon-checkbox.e-checked .e-frame::after {
  content: '✓';
  color: white;
  font-weight: bold;
}
</style>
```
