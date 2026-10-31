# CheckBox Getting Started - Vue 3

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Single Checkbox](#single-checkbox)
4. [Checkbox Groups](#checkbox-groups)
5. [States](#states)
6. [Accessibility](#accessibility)

---

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="checkbox-container">
    <CheckBoxComponent
      v-model="isChecked"
      :label="'Accept terms and conditions'"
      @change="onChange"
    />
    <p>Status: {{ isChecked ? 'Checked' : 'Unchecked' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/check-box/index.css";

const isChecked = ref(false);

const onChange = (args) => {
  console.log('Checkbox changed to:', args.checked);
};
</script>

<style scoped>
.checkbox-container {
  padding: 20px;
}
</style>
```

---

## Single Checkbox

### Basic Checkbox

```vue
<template>
  <CheckBoxComponent
    v-model="agree"
    label="I agree"
  />
</template>

<script setup>
import { ref } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const agree = ref(false);
</script>
```

### Checkbox with Initial State

```vue
<template>
  <div>
    <CheckBoxComponent
      v-model="isEnabled"
      label="Enable notifications"
    />
    <p v-if="isEnabled">Notifications are enabled</p>
    <p v-else>Notifications are disabled</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const isEnabled = ref(true);
</script>
```

---

## Checkbox Groups

### Multiple Independent Checkboxes

```vue
<template>
  <div class="checkbox-group">
    <h3>Select Features:</h3>
    <div class="checkbox-item">
      <CheckBoxComponent
        v-model="features.darkMode"
        label="Dark Mode"
      />
    </div>
    <div class="checkbox-item">
      <CheckBoxComponent
        v-model="features.notifications"
        label="Notifications"
      />
    </div>
    <div class="checkbox-item">
      <CheckBoxComponent
        v-model="features.twoFactor"
        label="Two-Factor Authentication"
      />
    </div>

    <div class="selected-features">
      <h4>Selected:</h4>
      <ul>
        <li v-if="features.darkMode">✓ Dark Mode</li>
        <li v-if="features.notifications">✓ Notifications</li>
        <li v-if="features.twoFactor">✓ Two-Factor Authentication</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const features = reactive({
  darkMode: false,
  notifications: false,
  twoFactor: false
});
</script>

<style scoped>
.checkbox-group {
  padding: 20px;
  max-width: 400px;
}

.checkbox-item {
  margin-bottom: 15px;
}

.selected-features {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.selected-features ul {
  margin: 0;
  padding-left: 20px;
}
</style>
```

### Array of Checkboxes with v-for

```vue
<template>
  <div class="checkbox-list">
    <h3>Select Interests:</h3>
    <div v-for="interest in availableInterests" :key="interest.id" class="checkbox-item">
      <CheckBoxComponent
        :value="interest.id"
        :label="interest.name"
        @change="toggleInterest($event, interest.id)"
      />
    </div>

    <div class="selected-list">
      <h4>Selected Interests:</h4>
      <p>{{ selectedInterests.join(', ') || 'None selected' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const selectedInterests = ref([]);

const availableInterests = ref([
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Sports' },
  { id: 3, name: 'Music' },
  { id: 4, name: 'Travel' },
  { id: 5, name: 'Photography' }
]);

const toggleInterest = (event, interestId) => {
  const index = selectedInterests.value.indexOf(interestId);
  if (event.checked) {
    if (index === -1) {
      selectedInterests.value.push(interestId);
    }
  } else {
    if (index !== -1) {
      selectedInterests.value.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.checkbox-list {
  padding: 20px;
  max-width: 400px;
}

.checkbox-item {
  margin-bottom: 12px;
}

.selected-list {
  margin-top: 20px;
  padding: 15px;
  background-color: #e7f3ff;
  border-radius: 4px;
}
</style>
```

---

## States

### Disabled Checkbox

```vue
<template>
  <div>
    <CheckBoxComponent
      v-model="checked1"
      label="Enabled checkbox"
    />
    <CheckBoxComponent
      v-model="checked2"
      label="Disabled checkbox"
      :disabled="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const checked1 = ref(true);
const checked2 = ref(false);
</script>
```

### Indeterminate State

```vue
<template>
  <div class="checkbox-hierarchy">
    <div class="parent">
      <CheckBoxComponent
        :checked="allSelected"
        :indeterminate="someSelected && !allSelected"
        label="Select All"
        @change="toggleAll"
      />
    </div>

    <div class="children">
      <CheckBoxComponent
        v-for="item in items"
        :key="item.id"
        v-model="item.selected"
        :label="item.name"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const items = ref([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: false },
  { id: 3, name: 'Item 3', selected: false }
]);

const allSelected = computed(() => {
  return items.value.every(item => item.selected);
});

const someSelected = computed(() => {
  return items.value.some(item => item.selected);
});

const toggleAll = (args) => {
  items.value.forEach(item => {
    item.selected = args.checked;
  });
};
</script>

<style scoped>
.checkbox-hierarchy {
  padding: 20px;
}

.parent {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ddd;
}

.children {
  padding-left: 30px;
}

.children :deep(.e-checkbox) {
  margin-bottom: 10px;
}
</style>
```

---

## Accessibility

### ARIA Labels

```vue
<template>
  <div class="form-group">
    <fieldset>
      <legend>Choose your preferences:</legend>
      
      <CheckBoxComponent
        id="email-checkbox"
        v-model="emailNotif"
        :aria-labelledby="'email-label'"
        label="Email notifications"
      />

      <CheckBoxComponent
        id="sms-checkbox"
        v-model="smsNotif"
        :aria-labelledby="'sms-label'"
        label="SMS notifications"
      />
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const emailNotif = ref(true);
const smsNotif = ref(false);
</script>
```

---

## Complete Example: Consent Form

```vue
<template>
  <div class="consent-form">
    <h2>Consent Form</h2>

    <form @submit.prevent="submitConsent">
      <div class="form-section">
        <h3>Data Usage</h3>
        
        <CheckBoxComponent
          v-model="consent.analytics"
          label="Allow Analytics Tracking"
        />
        <p class="description">
          Help us improve by tracking how you use our service
        </p>

        <CheckBoxComponent
          v-model="consent.marketing"
          label="Marketing Communications"
        />
        <p class="description">
          Receive updates about new features and promotions
        </p>

        <CheckBoxComponent
          v-model="consent.thirdParty"
          label="Share with Third Parties"
        />
        <p class="description">
          Allow sharing anonymized data with trusted partners
        </p>
      </div>

      <div class="form-section">
        <h3>Legal</h3>
        
        <CheckBoxComponent
          v-model="consent.terms"
          label="I agree to Terms of Service"
          required
        />

        <CheckBoxComponent
          v-model="consent.privacy"
          label="I have read Privacy Policy"
          required
        />
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div class="actions">
        <button type="submit">Submit Consent</button>
        <button type="button" @click="resetForm">Reset</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

const error = ref('');

const consent = reactive({
  analytics: false,
  marketing: false,
  thirdParty: false,
  terms: false,
  privacy: false
});

const submitConsent = () => {
  error.value = '';

  if (!consent.terms || !consent.privacy) {
    error.value = 'You must accept Terms and Privacy Policy';
    return;
  }

  console.log('Consent submitted:', consent);
  alert('Consent preferences saved!');
};

const resetForm = () => {
  consent.analytics = false;
  consent.marketing = false;
  consent.thirdParty = false;
  consent.terms = false;
  consent.privacy = false;
  error.value = '';
};
</script>

<style scoped>
.consent-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-section h3 {
  margin-top: 0;
}

.description {
  color: #666;
  font-size: 12px;
  margin: 5px 0 15px 25px;
}

.error {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
}

button[type="submit"]:hover {
  background-color: #218838;
}

button[type="button"] {
  background-color: #6c757d;
  color: white;
}

button[type="button"]:hover {
  background-color: #5a6268;
}
</style>
```

