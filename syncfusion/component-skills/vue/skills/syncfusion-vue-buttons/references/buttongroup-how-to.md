# ButtonGroup How-To Guide

> Common recipes and patterns for working with button groups in Vue 3.

---

## Table of Contents

1. [Add Icons to Buttons](#add-icons-to-buttons)
2. [Rounded Corners](#rounded-corners)
3. [Disable Individual Buttons](#disable-individual-buttons)
4. [Disable All Buttons](#disable-all-buttons)
5. [Enable Ripple Effect](#enable-ripple-effect)
6. [Enable RTL Support](#enable-rtl-support)
7. [Vertical Orientation](#vertical-orientation)
8. [Form Submit with Radio ButtonGroup](#form-submit-with-radio-buttongroup)
9. [Initialize Using CSS Classes](#initialize-using-css-classes)

---

## Add Icons to Buttons

Add icons to individual buttons in a group:

```vue
<template>
  <div class="example-section">
    <h2>ButtonGroup with Icons</h2>
    
    <div class="e-btn-group">
      <ejs-button icon-css="e-icons e-save">Save</ejs-button>
      <ejs-button icon-css="e-icons e-refresh">Refresh</ejs-button>
      <ejs-button icon-css="e-icons e-delete">Delete</ejs-button>
    </div>
    
    <!-- Icons only -->
    <h3>Icons Only</h3>
    <div class="e-btn-group">
      <ejs-button icon-css="e-icons e-cut"></ejs-button>
      <ejs-button icon-css="e-icons e-copy"></ejs-button>
      <ejs-button icon-css="e-icons e-paste"></ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
}
</style>
```

---

## Rounded Corners

Apply rounded corners to a button group:

```vue
<template>
  <div class="example-section">
    <h2>Rounded Corner ButtonGroup</h2>
    
    <div class="e-btn-group e-round-corner e-primary">
      <ejs-button>Left</ejs-button>
      <ejs-button>Center</ejs-button>
      <ejs-button>Right</ejs-button>
    </div>
    
    <!-- Outline with rounded corners -->
    <h3>Outline with Rounded Corners</h3>
    <div class="e-btn-group e-round-corner e-outline e-success">
      <ejs-button>Accept</ejs-button>
      <ejs-button>Decline</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Disable Individual Buttons

Disable specific buttons within a group:

```vue
<template>
  <div class="example-section">
    <h2>Disable Individual Buttons</h2>
    
    <div class="e-btn-group">
      <ejs-button>Enabled</ejs-button>
      <ejs-button :disabled="true">Disabled</ejs-button>
      <ejs-button>Enabled</ejs-button>
    </div>
    
    <!-- Dynamically disable -->
    <h3>Dynamic Disable</h3>
    <p>
      <button @click="toggleDisabled">Toggle Middle Button</button>
    </p>
    
    <div class="e-btn-group">
      <ejs-button css-class="e-primary">First</ejs-button>
      <ejs-button :disabled="isDisabled" css-class="e-primary">
        {{ isDisabled ? 'Disabled' : 'Enabled' }}
      </ejs-button>
      <ejs-button css-class="e-primary">Last</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const isDisabled = ref(false);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

button {
  padding: 6px 12px;
  margin: 10px 0;
}
</style>
```

---

## Disable All Buttons

Disable the entire button group:

```vue
<template>
  <div class="example-section">
    <h2>Disable All Buttons</h2>
    
    <p>
      <button @click="toggleGroupDisabled">
        {{ groupDisabled ? 'Enable Group' : 'Disable Group' }}
      </button>
    </p>
    
    <div class="e-btn-group" :class="{ 'disabled-group': groupDisabled }">
      <ejs-button :disabled="groupDisabled">Option 1</ejs-button>
      <ejs-button :disabled="groupDisabled">Option 2</ejs-button>
      <ejs-button :disabled="groupDisabled">Option 3</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const groupDisabled = ref(false);

const toggleGroupDisabled = () => {
  groupDisabled.value = !groupDisabled.value;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

button {
  padding: 6px 12px;
  margin-bottom: 10px;
}

.disabled-group {
  opacity: 0.6;
  pointer-events: none;
}
</style>
```

---

## Enable Ripple Effect

Apply ripple effect globally:

```vue
<script setup>
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

// Enable ripple effect for all buttons
enableRipple(true);

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<template>
  <div class="example-section">
    <h2>ButtonGroup with Ripple Effect</h2>
    <p>Click buttons to see ripple animation</p>
    
    <div class="e-btn-group e-primary">
      <ejs-button>Click 1</ejs-button>
      <ejs-button>Click 2</ejs-button>
      <ejs-button>Click 3</ejs-button>
    </div>
  </div>
</template>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Enable RTL Support

Enable right-to-left layout for RTL languages:

```vue
<template>
  <div class="example-section" :dir="isRTL ? 'rtl' : 'ltr'">
    <h2>RTL Support</h2>
    
    <p>
      <button @click="toggleRTL">
        {{ isRTL ? 'Switch to LTR' : 'Switch to RTL' }}
      </button>
    </p>
    
    <div class="e-btn-group e-primary" :enable-rtl="isRTL">
      <ejs-button icon-css="e-icons e-upload">Upload</ejs-button>
      <ejs-button icon-css="e-icons e-download">Download</ejs-button>
      <ejs-button icon-css="e-icons e-share">Share</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const isRTL = ref(false);

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

button {
  padding: 6px 12px;
  margin-bottom: 10px;
}
</style>
```

---

## Vertical Orientation

Create vertical button groups:

```vue
<template>
  <div class="example-section">
    <h2>Vertical ButtonGroup</h2>
    
    <div class="e-btn-group e-vertical">
      <ejs-button>Top</ejs-button>
      <ejs-button>Middle</ejs-button>
      <ejs-button>Bottom</ejs-button>
    </div>
    
    <!-- Vertical with color -->
    <h3>Vertical Primary</h3>
    <div class="e-btn-group e-vertical e-primary">
      <ejs-button>First</ejs-button>
      <ejs-button>Second</ejs-button>
      <ejs-button>Third</ejs-button>
    </div>
    
    <!-- Vertical with outline -->
    <h3>Vertical Outline</h3>
    <div class="e-btn-group e-vertical e-outline e-success">
      <ejs-button>Yes</ejs-button>
      <ejs-button>No</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
}
</style>
```

---

## Form Submit with Radio ButtonGroup

Handle form submission with radio button selection:

```vue
<template>
  <form @submit.prevent="handleFormSubmit" class="form-example">
    <h2>Survey Form</h2>
    
    <div class="form-group">
      <label>How satisfied are you with our service?</label>
      
      <div class="e-btn-group">
        <input 
          type="radio"
          id="very-dissatisfied"
          name="satisfaction"
          value="very_dissatisfied"
          v-model="formData.satisfaction"
          required
        />
        <label class="e-btn" for="very-dissatisfied">Very Dissatisfied</label>
        
        <input 
          type="radio"
          id="dissatisfied"
          name="satisfaction"
          value="dissatisfied"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="dissatisfied">Dissatisfied</label>
        
        <input 
          type="radio"
          id="neutral"
          name="satisfaction"
          value="neutral"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="neutral">Neutral</label>
        
        <input 
          type="radio"
          id="satisfied"
          name="satisfaction"
          value="satisfied"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="satisfied">Satisfied</label>
        
        <input 
          type="radio"
          id="very-satisfied"
          name="satisfaction"
          value="very_satisfied"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="very-satisfied">Very Satisfied</label>
      </div>
    </div>
    
    <button type="submit">Submit</button>
    
    <p v-if="submitted">
      Thank you! Your response: <strong>{{ formData.satisfaction }}</strong>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  satisfaction: 'neutral'
});

const submitted = ref(false);

const handleFormSubmit = () => {
  submitted.value = true;
  console.log('Form submitted:', formData.value);
};
</script>

<style scoped>
.form-example {
  padding: 20px;
  max-width: 600px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

p {
  margin-top: 15px;
  color: #28a745;
  font-weight: bold;
}
</style>
```

---

## Initialize Using CSS Classes

Create button groups using CSS classes only (no Vue components):

```vue
<template>
  <div class="example-section">
    <h2>CSS-Only ButtonGroup</h2>
    
    <!-- Using HTML input and label elements with CSS classes -->
    <div class="e-btn-group e-primary">
      <input type="radio" id="r1" name="group1" />
      <label class="e-btn" for="r1">Option A</label>
      
      <input type="radio" id="r2" name="group1" />
      <label class="e-btn" for="r2">Option B</label>
      
      <input type="radio" id="r3" name="group1" />
      <label class="e-btn" for="r3">Option C</label>
    </div>
    
    <!-- Using HTML buttons with CSS classes -->
    <h3>HTML Buttons with CSS Classes</h3>
    <div class="e-btn-group e-outline">
      <button class="e-btn">Edit</button>
      <button class="e-btn">Delete</button>
      <button class="e-btn">Archive</button>
    </div>
  </div>
</template>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Next Steps

- Learn about styling in [buttongroup-types-and-styles.md](buttongroup-types-and-styles.md)
- Explore selection patterns in [buttongroup-selection-and-nesting.md](buttongroup-selection-and-nesting.md)
- Check accessibility in [buttongroup-accessibility.md](buttongroup-accessibility.md)
