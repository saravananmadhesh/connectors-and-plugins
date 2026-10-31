# Getting Started — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Installation](#installation)
- [Basic Implementation](#basic-implementation)
- [CSS Theme Setup](#css-theme-setup)
- [Common Patterns](#common-patterns)
- [Next Steps](#next-steps)

---

## Installation

Install the Syncfusion Vue MaskedTextBox package:

```bash
npm install @syncfusion/ej2-vue-inputs
```

---

## Basic Implementation

Create a simple masked text box for phone numbers:

```vue
<template>
  <div>
    <h3>Basic MaskedTextBox</h3>
    
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      placeholder="(555) 555-5555"
      value="">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>
```

**Key Properties:**
- `mask` — Input mask pattern (required)
- `placeholder` — Placeholder text
- `value` — Default value

---

## CSS Theme Setup

Import theme CSS in your main.js:

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import { enableRipple } from '@syncfusion/ej2-base';

// Import CSS theme
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/maskedtextbox/index.css";

enableRipple(true);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

**Available Themes:**
- `material.css` — Material Design
- `bootstrap.css` — Bootstrap 4
- `bootstrap5.css` — Bootstrap 5
- `fabric.css` — Office Fabric
- `tailwind.css` — Tailwind CSS

---

## Common Patterns

### Phone Number Input

```vue
<template>
  <div>
    <label for="phone">Phone Number:</label>
    <ejs-maskedtextbox
      id="phone"
      mask="(999) 999-9999"
      placeholder="(555) 555-5555"
      @change="onPhoneChange">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  methods: {
    onPhoneChange(event) {
      console.log('Phone:', event.value);
    }
  }
}
</script>
```

### Credit Card Input

```vue
<template>
  <div>
    <label for="card">Credit Card:</label>
    <ejs-maskedtextbox
      id="card"
      mask="9999 9999 9999 9999"
      placeholder="1234 5678 9012 3456"
      @change="onCardChange">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  methods: {
    onCardChange(event) {
      const sanitized = event.value.replace(/\s/g, '');
      console.log('Card:', sanitized);
    }
  }
}
</script>
```

### Date Input

```vue
<template>
  <div>
    <label for="date">Date (MM/DD/YYYY):</label>
    <ejs-maskedtextbox
      id="date"
      mask="99/99/9999"
      placeholder="MM/DD/YYYY"
      @change="onDateChange">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  methods: {
    onDateChange(event) {
      console.log('Date:', event.value);
    }
  }
}
</script>
```

### Email-like Pattern

```vue
<template>
  <div>
    <label for="email">Email Domain:</label>
    <ejs-maskedtextbox
      id="email"
      mask="aaaa@aaa.aaa"
      placeholder="user@domain.com"
      @change="onEmailChange">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  methods: {
    onEmailChange(event) {
      console.log('Email:', event.value);
    }
  }
}
</script>
```

---

## Next Steps

- **Read:** [mask-configuration.md](maskedtextbox-mask-configuration.md) — Learn mask syntax and patterns
- **Read:** [form-validation.md](maskedtextbox-form-validation.md) — Add form validation
- **Read:** [api.md](maskedtextbox-api.md) — Complete API reference

---

## Complete Getting Started Example

```vue
<template>
  <div class="getting-started-demo">
    <h2>MaskedTextBox Getting Started</h2>
    
    <div class="input-section">
      <div class="input-group">
        <label>Phone Number:</label>
        <ejs-maskedtextbox
          mask="(999) 999-9999"
          placeholder="(555) 555-5555"
          @change="updateInput('phone', $event)">
        </ejs-maskedtextbox>
      </div>

      <div class="input-group">
        <label>SSN:</label>
        <ejs-maskedtextbox
          mask="999-99-9999"
          placeholder="123-45-6789"
          @change="updateInput('ssn', $event)">
        </ejs-maskedtextbox>
      </div>

      <div class="input-group">
        <label>Credit Card:</label>
        <ejs-maskedtextbox
          mask="9999 9999 9999 9999"
          placeholder="1234 5678 9012 3456"
          @change="updateInput('card', $event)">
        </ejs-maskedtextbox>
      </div>

      <div class="input-group">
        <label>Date (MM/DD/YYYY):</label>
        <ejs-maskedtextbox
          mask="99/99/9999"
          placeholder="MM/DD/YYYY"
          @change="updateInput('date', $event)">
        </ejs-maskedtextbox>
      </div>
    </div>

    <div class="output-section">
      <h3>Entered Values:</h3>
      <pre>{{ JSON.stringify(inputs, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      inputs: {
        phone: '',
        ssn: '',
        card: '',
        date: ''
      }
    }
  },
  methods: {
    updateInput(field, event) {
      this.inputs[field] = event.value;
      console.log(`${field}: ${event.value}`);
    }
  }
}
</script>

<style scoped>
.getting-started-demo {
  padding: 20px;
  max-width: 600px;
}

.input-section {
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.output-section {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0 0 0;
}
</style>
```
