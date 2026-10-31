# ButtonGroup Selection and Nesting

> Advanced button group patterns including single/multiple selection and nesting with dropdown and split buttons.

---

## Table of Contents

1. [Single Selection (Radio)](#single-selection-radio)
2. [Multiple Selection (Checkbox)](#multiple-selection-checkbox)
3. [Nesting DropDownButton](#nesting-dropdownbutton)
4. [Nesting SplitButton](#nesting-splitbutton)
5. [Selection State Management](#selection-state-management)

---

## Single Selection (Radio)

Create a radio-style button group where only one button can be selected:

```vue
<template>
  <div class="example-section">
    <h2>Radio Selection</h2>
    <p>Selected: <strong>{{ selectedSize }}</strong></p>
    
    <div class="e-btn-group">
      <input 
        type="radio"
        id="small-btn"
        name="size"
        value="small"
        v-model="selectedSize"
      />
      <label class="e-btn e-primary" for="small-btn">Small</label>
      
      <input 
        type="radio"
        id="medium-btn"
        name="size"
        value="medium"
        v-model="selectedSize"
      />
      <label class="e-btn e-primary" for="medium-btn">Medium</label>
      
      <input 
        type="radio"
        id="large-btn"
        name="size"
        value="large"
        v-model="selectedSize"
      />
      <label class="e-btn e-primary" for="large-btn">Large</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedSize = ref('medium');
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin: 10px 0;
}
</style>
```

---

## Multiple Selection (Checkbox)

Create a checkbox-style button group where multiple buttons can be selected:

```vue
<template>
  <div class="example-section">
    <h2>Checkbox Selection</h2>
    <p>Selected: {{ selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None' }}</p>
    
    <div class="e-btn-group">
      <input 
        type="checkbox"
        id="feature-wifi"
        name="features"
        value="wifi"
        v-model="selectedFeatures"
      />
      <label class="e-btn" for="feature-wifi">WiFi</label>
      
      <input 
        type="checkbox"
        id="feature-bluetooth"
        name="features"
        value="bluetooth"
        v-model="selectedFeatures"
      />
      <label class="e-btn" for="feature-bluetooth">Bluetooth</label>
      
      <input 
        type="checkbox"
        id="feature-gps"
        name="features"
        value="gps"
        v-model="selectedFeatures"
      />
      <label class="e-btn" for="feature-gps">GPS</label>
      
      <input 
        type="checkbox"
        id="feature-nfc"
        name="features"
        value="nfc"
        v-model="selectedFeatures"
      />
      <label class="e-btn" for="feature-nfc">NFC</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedFeatures = ref([]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin: 10px 0;
}
</style>
```

---

## Nesting DropDownButton

Include a DropDownButton inside a button group:

```vue
<template>
  <div class="example-section">
    <h2>DropDownButton in ButtonGroup</h2>
    
    <div class="e-btn-group">
      <ejs-button>New</ejs-button>
      
      <ejs-dropdown-button :items="fileItems">
        File
      </ejs-dropdown-button>
      
      <ejs-button>Save</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  components: {
    'ejs-button': ButtonComponent,
    'ejs-dropdown-button': DropDownButtonComponent
  }
};

const fileItems = ref([
  { text: 'New File' },
  { text: 'New Folder' },
  { separator: true },
  { text: 'Open' },
  { text: 'Close' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Nesting SplitButton

Include a SplitButton inside a button group:

```vue
<template>
  <div class="example-section">
    <h2>SplitButton in ButtonGroup</h2>
    
    <div class="e-btn-group">
      <ejs-button css-class="e-primary">Undo</ejs-button>
      
      <ejs-split-button 
        :items="formatItems"
        css-class="e-primary"
        @click="handleFormat"
      >
        Format
      </ejs-split-button>
      
      <ejs-button css-class="e-primary">Redo</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  components: {
    'ejs-button': ButtonComponent,
    'ejs-split-button': SplitButtonComponent
  }
};

const formatItems = ref([
  { text: 'Bold' },
  { text: 'Italic' },
  { text: 'Underline' },
  { separator: true },
  { text: 'Clear Formatting' }
]);

const handleFormat = () => {
  console.log('Format applied');
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}
</style>
```

---

## Selection State Management

Manage complex selection scenarios with Vue reactive state:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Selection State</h2>
    
    <div class="control-panel">
      <button @click="clearAll">Clear All</button>
      <button @click="selectAll">Select All</button>
      <button @click="toggleAll">Toggle All</button>
    </div>
    
    <p>Selected: {{ selectedOptions.join(', ') || 'None' }}</p>
    
    <div class="e-btn-group">
      <input 
        type="checkbox"
        id="opt-a"
        name="options"
        value="option-a"
        v-model="selectedOptions"
      />
      <label class="e-btn" for="opt-a">Option A</label>
      
      <input 
        type="checkbox"
        id="opt-b"
        name="options"
        value="option-b"
        v-model="selectedOptions"
      />
      <label class="e-btn" for="opt-b">Option B</label>
      
      <input 
        type="checkbox"
        id="opt-c"
        name="options"
        value="option-c"
        v-model="selectedOptions"
      />
      <label class="e-btn" for="opt-c">Option C</label>
      
      <input 
        type="checkbox"
        id="opt-d"
        name="options"
        value="option-d"
        v-model="selectedOptions"
      />
      <label class="e-btn" for="opt-d">Option D</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedOptions = ref([]);
const allOptions = ['option-a', 'option-b', 'option-c', 'option-d'];

const clearAll = () => {
  selectedOptions.value = [];
};

const selectAll = () => {
  selectedOptions.value = [...allOptions];
};

const toggleAll = () => {
  if (selectedOptions.value.length === allOptions.length) {
    clearAll();
  } else {
    selectAll();
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.control-panel {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin: 10px 0;
  font-weight: bold;
}
</style>
```

---

## Form Submission with ButtonGroup

Handle form submission with selected button values:

```vue
<template>
  <form @submit.prevent="handleSubmit" class="form-example">
    <h2>Form with ButtonGroup</h2>
    
    <fieldset>
      <legend>Select your preference:</legend>
      
      <div class="e-btn-group">
        <input 
          type="radio"
          id="pref-daily"
          name="preference"
          value="daily"
          v-model="formData.preference"
          required
        />
        <label class="e-btn e-outline" for="pref-daily">Daily</label>
        
        <input 
          type="radio"
          id="pref-weekly"
          name="preference"
          value="weekly"
          v-model="formData.preference"
        />
        <label class="e-btn e-outline" for="pref-weekly">Weekly</label>
        
        <input 
          type="radio"
          id="pref-monthly"
          name="preference"
          value="monthly"
          v-model="formData.preference"
        />
        <label class="e-btn e-outline" for="pref-monthly">Monthly</label>
      </div>
    </fieldset>
    
    <button type="submit" class="submit-btn">Submit</button>
    <p v-if="submitted">Submitted preference: {{ formData.preference }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  preference: 'daily'
});

const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  console.log('Form submitted with:', formData.value);
};
</script>

<style scoped>
.form-example {
  padding: 20px;
  max-width: 500px;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:hover {
  background-color: #218838;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

---

## Next Steps

- Explore styling in [buttongroup-types-and-styles.md](buttongroup-types-and-styles.md)
- Learn how-to patterns in [buttongroup-how-to.md](buttongroup-how-to.md)
- Check accessibility in [buttongroup-accessibility.md](buttongroup-accessibility.md)
