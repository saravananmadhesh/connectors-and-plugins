# Formats and Validation — Syncfusion Vue NumericTextBox

## Table of Contents
- [Number Formatting](#number-formatting)
- [Validation](#validation)
- [Currency Format](#currency-format)
- [Examples](#examples)

---

## Number Formatting

Format numbers with custom patterns:

```vue
<template>
  <div>
    <ejs-numerictextbox
      value="1234.56"
      format="n2"
      placeholder="Decimal format">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="1000"
      format="c2"
      currency="USD"
      placeholder="Currency format">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="0.75"
      format="p0"
      placeholder="Percentage format">
    </ejs-numerictextbox>
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
```

---

## Validation

Validate numeric input:

```vue
<template>
  <div>
    <ejs-numerictextbox
      :min="0"
      :max="100"
      value="50"
      placeholder="Range 0-100"
      @blur="validateRange">
    </ejs-numerictextbox>
    <p v-if="validationError" class="error">{{ validationError }}</p>
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
      validationError: ''
    }
  },
  methods: {
    validateRange(event) {
      const value = event.value;
      if (value < 0 || value > 100) {
        this.validationError = 'Value must be between 0 and 100';
      } else {
        this.validationError = '';
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: #d83b01;
  font-size: 12px;
  margin-top: 5px;
}
</style>
```

---

## Currency Format

Format as currency:

```vue
<template>
  <div>
    <ejs-numerictextbox
      value="1234.56"
      format="c2"
      currency="USD"
      prefix="$"
      placeholder="USD Price">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="1234.56"
      format="c2"
      currency="EUR"
      prefix="€"
      placeholder="EUR Price">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="1234.56"
      format="c2"
      currency="GBP"
      prefix="£"
      placeholder="GBP Price">
    </ejs-numerictextbox>
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
```

---

## Examples

### Complete Formatting Demo

```vue
<template>
  <div class="formatting-demo">
    <h3>Number Formatting Examples</h3>

    <div class="format-example">
      <h4>Decimal (n2)</h4>
      <ejs-numerictextbox
        value="1234.567"
        format="n2"
        placeholder="Two decimals">
      </ejs-numerictextbox>
      <p class="result">Result: {{ formatValue(1234.567, 'n2') }}</p>
    </div>

    <div class="format-example">
      <h4>Currency (c2)</h4>
      <ejs-numerictextbox
        value="1234.56"
        format="c2"
        currency="USD"
        placeholder="USD Currency">
      </ejs-numerictextbox>
      <p class="result">Result: $1,234.56</p>
    </div>

    <div class="format-example">
      <h4>Percentage (p2)</h4>
      <ejs-numerictextbox
        value="0.75"
        format="p2"
        placeholder="Percentage">
      </ejs-numerictextbox>
      <p class="result">Result: 75.00%</p>
    </div>

    <div class="format-example">
      <h4>Validation Example</h4>
      <ejs-numerictextbox
        :min="10"
        :max="100"
        value="50"
        placeholder="Min: 10, Max: 100"
        @change="handleValidation">
      </ejs-numerictextbox>
      <p v-if="validationMessage" :class="validationClass">
        {{ validationMessage }}
      </p>
    </div>
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
      validationMessage: '',
      validationClass: ''
    }
  },
  methods: {
    formatValue(value, format) {
      // Simple formatting demo
      return value.toFixed(2);
    },
    handleValidation(event) {
      if (event.value < 10) {
        this.validationMessage = 'Value must be at least 10';
        this.validationClass = 'error';
      } else if (event.value > 100) {
        this.validationMessage = 'Value cannot exceed 100';
        this.validationClass = 'error';
      } else {
        this.validationMessage = '✓ Valid value';
        this.validationClass = 'success';
      }
    }
  }
}
</script>

<style scoped>
.formatting-demo {
  padding: 20px;
  max-width: 400px;
}

.format-example {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.format-example h4 {
  margin-bottom: 10px;
}

.result {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.error {
  color: #d83b01;
  font-size: 12px;
  margin-top: 8px;
}

.success {
  color: #107c10;
  font-size: 12px;
  margin-top: 8px;
}
</style>
```
