# Adornments — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Prefix and Suffix](#prefix-and-suffix)
- [Leading and Trailing Icons](#leading-and-trailing-icons)
- [Button Addons](#button-addons)
- [Examples](#examples)

---

## Prefix and Suffix

Add text before and after the input:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      :float-label-type="'Auto'"
      placeholder="Phone">
      <ng-template #prefixTemplate>
        <span class="prefix">📱</span>
      </ng-template>
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

<style scoped>
.prefix {
  margin-right: 10px;
}
</style>
```

---

## Leading and Trailing Icons

Add icons using CSS or templates:

```vue
<template>
  <div class="icon-adornment">
    <div class="input-wrapper">
      <span class="icon icon-leading">📞</span>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone Number">
      </ejs-maskedtextbox>
      <span class="icon icon-trailing">✓</span>
    </div>
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

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}

.icon {
  font-size: 18px;
  margin: 0 8px;
}

.icon-leading {
  order: 1;
}

.icon-trailing {
  order: 3;
}
</style>
```

---

## Button Addons

Add buttons as input adornments:

```vue
<template>
  <div class="button-addon">
    <div class="input-group">
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone Number"
        v-model="phoneNumber">
      </ejs-maskedtextbox>
      <button @click="clearPhone" class="addon-button">Clear</button>
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
      phoneNumber: ''
    }
  },
  methods: {
    clearPhone() {
      this.phoneNumber = '';
    }
  }
}
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 0;
}

.e-maskedtextbox {
  flex: 1;
}

.addon-button {
  padding: 10px 16px;
  background: #0078d4;
  color: white;
  border: none;
  cursor: pointer;
}

.addon-button:hover {
  background: #106ebe;
}
</style>
```

---

## Examples

### Complete Adornment Demo

```vue
<template>
  <div class="adornment-demo">
    <h3>Adornments Examples</h3>
    
    <div class="example-section">
      <h4>Phone Number with Icon</h4>
      <div class="icon-wrapper">
        <span class="leading-icon">📱</span>
        <ejs-maskedtextbox
          mask="(999) 999-9999"
          placeholder="Phone">
        </ejs-maskedtextbox>
      </div>
    </div>

    <div class="example-section">
      <h4>Credit Card with Security Icon</h4>
      <div class="icon-wrapper">
        <span class="leading-icon">💳</span>
        <ejs-maskedtextbox
          mask="9999 9999 9999 9999"
          placeholder="Card Number">
        </ejs-maskedtextbox>
        <span class="trailing-icon">🔒</span>
      </div>
    </div>

    <div class="example-section">
      <h4>Date with Calendar Icon</h4>
      <div class="icon-wrapper">
        <span class="leading-icon">📅</span>
        <ejs-maskedtextbox
          mask="99/99/9999"
          placeholder="MM/DD/YYYY">
        </ejs-maskedtextbox>
      </div>
    </div>
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

<style scoped>
.adornment-demo {
  padding: 20px;
}

.example-section {
  margin-bottom: 30px;
}

.example-section h4 {
  margin-bottom: 15px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.leading-icon,
.trailing-icon {
  font-size: 20px;
  flex-shrink: 0;
}
</style>
```
