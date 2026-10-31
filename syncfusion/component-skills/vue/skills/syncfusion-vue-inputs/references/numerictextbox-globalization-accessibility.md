# Globalization and Accessibility — Syncfusion Vue NumericTextBox

## Table of Contents
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [Accessibility (WCAG)](#accessibility-wcag)
- [Examples](#examples)

---

## Localization

Support multiple languages and locale formats:

```vue
<template>
  <div>
    <div class="locale-selector">
      <button
        v-for="locale in locales"
        :key="locale"
        @click="currentLocale = locale"
        :class="{ active: currentLocale === locale }">
        {{ locale }}
      </button>
    </div>

    <ejs-numerictextbox
      value="1234.56"
      :locale="currentLocale"
      placeholder="Price">
    </ejs-numerictextbox>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { L10n } from '@syncfusion/ej2-base';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      locales: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'zh-CN'],
      currentLocale: 'en-US'
    }
  },
  mounted() {
    // Load custom locale strings
    L10n.load({
      'de-DE': {
        'numerictextbox': { incrementTitle: 'Erhöhen', decrementTitle: 'Verringern' }
      },
      'fr-FR': {
        'numerictextbox': { incrementTitle: 'Augmenter', decrementTitle: 'Diminuer' }
      }
    });
  }
}
</script>

<style scoped>
.locale-selector {
  margin-bottom: 20px;
}

button {
  padding: 8px 12px;
  margin-right: 8px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background: #0078d4;
  color: white;
}
</style>
```

---

## RTL Support

Support right-to-left languages:

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <label>
      <input type="checkbox" v-model="isRTL"> Enable RTL
    </label>

    <ejs-numerictextbox
      value="1234.56"
      placeholder="Price"
      :enable-rtl="isRTL">
    </ejs-numerictextbox>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      isRTL: false
    }
  }
}
</script>

<style scoped>
[dir="rtl"] {
  text-align: right;
}

label {
  display: block;
  margin-bottom: 15px;
}
</style>
```

---

## Accessibility (WCAG)

Ensure WCAG 2.2 Level AA compliance:

```vue
<template>
  <div>
    <label for="price-input">Product Price (USD):</label>
    <ejs-numerictextbox
      id="price-input"
      value="99.99"
      format="c2"
      prefix="$"
      currency="USD"
      aria-label="Product Price in US Dollars"
      aria-describedby="price-help"
      placeholder="Enter price">
    </ejs-numerictextbox>
    <small id="price-help">Enter the product price in US dollars</small>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  }
}
</script>

<style scoped>
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

small {
  display: block;
  color: #666;
  margin-top: 5px;
  font-size: 12px;
}
</style>
```

---

## Examples

### Complete Globalization Demo

```vue
<template>
  <div class="globalization-demo">
    <h3>Globalization and Accessibility</h3>

    <div class="control-group">
      <label>Select Locale:</label>
      <select v-model="selectedLocale" @change="handleLocaleChange">
        <option value="en-US">English (US)</option>
        <option value="de-DE">German</option>
        <option value="fr-FR">French</option>
        <option value="es-ES">Spanish</option>
        <option value="ar-AE">Arabic (RTL)</option>
      </select>
    </div>

    <div class="control-group">
      <label>
        <input type="checkbox" v-model="enableRTL"> Enable RTL
      </label>
    </div>

    <div :dir="enableRTL ? 'rtl' : 'ltr'">
      <label for="demo-input">Price Input:</label>
      <ejs-numerictextbox
        id="demo-input"
        value="1234.56"
        format="c2"
        currency="USD"
        :locale="selectedLocale"
        :enable-rtl="enableRTL"
        aria-label="Price input with localization and RTL support"
        placeholder="Enter price">
      </ejs-numerictextbox>
    </div>

    <div class="demo-info">
      <p><strong>Current Locale:</strong> {{ selectedLocale }}</p>
      <p><strong>RTL Enabled:</strong> {{ enableRTL ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { L10n } from '@syncfusion/ej2-base';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      selectedLocale: 'en-US',
      enableRTL: false
    }
  },
  mounted() {
    // Load localization strings
    L10n.load({
      'de-DE': {
        'numerictextbox': {
          incrementTitle: 'Erhöhen',
          decrementTitle: 'Verringern'
        }
      },
      'fr-FR': {
        'numerictextbox': {
          incrementTitle: 'Augmenter',
          decrementTitle: 'Diminuer'
        }
      },
      'es-ES': {
        'numerictextbox': {
          incrementTitle: 'Aumentar',
          decrementTitle: 'Disminuir'
        }
      },
      'ar-AE': {
        'numerictextbox': {
          incrementTitle: 'زيادة',
          decrementTitle: 'تقليل'
        }
      }
    });
  },
  methods: {
    handleLocaleChange() {
      if (this.selectedLocale === 'ar-AE') {
        this.enableRTL = true;
      }
    }
  }
}
</script>

<style scoped>
.globalization-demo {
  padding: 20px;
  max-width: 500px;
}

.control-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.demo-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.demo-info p {
  margin: 8px 0;
  font-size: 14px;
}
</style>
```
