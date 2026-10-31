# Precision and Decimals — Syncfusion Vue NumericTextBox

## Table of Contents
- [Decimal Places](#decimal-places)
- [Precision Modes](#precision-modes)
- [Rounding](#rounding)
- [Examples](#examples)

---

## Decimal Places

Set number of decimal places:

```vue
<template>
  <div>
    <ejs-numerictextbox
      value="123.456"
      :decimals="2"
      placeholder="2 decimals">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="123.456789"
      :decimals="4"
      placeholder="4 decimals">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="100"
      :decimals="0"
      placeholder="No decimals">
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

## Precision Modes

Control precision and value handling:

```vue
<template>
  <div>
    <label>
      <input type="radio" v-model="precisionMode" value="Deterministic">
      Deterministic (Fixed decimals)
    </label>

    <label>
      <input type="radio" v-model="precisionMode" value="Significant">
      Significant (Significant digits)
    </label>

    <ejs-numerictextbox
      value="1234.5678"
      :decimals="2"
      :precision-mode="precisionMode"
      placeholder="Try different modes">
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
      precisionMode: 'Deterministic'
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin: 10px 0;
}
</style>
```

---

## Rounding

Control rounding behavior:

```vue
<template>
  <div>
    <div class="rounding-demo">
      <h4>Standard Rounding</h4>
      <ejs-numerictextbox
        value="123.456"
        :decimals="2"
        placeholder="Rounded to 2 decimals">
      </ejs-numerictextbox>
      <p class="result">Result: 123.46</p>
    </div>

    <div class="rounding-demo">
      <h4>Truncation (No Rounding)</h4>
      <ejs-numerictextbox
        value="123.456"
        :decimals="2"
        placeholder="Truncated to 2 decimals">
      </ejs-numerictextbox>
      <p class="result">Result: 123.45</p>
    </div>

    <div class="rounding-demo">
      <h4>Financial Rounding</h4>
      <ejs-numerictextbox
        value="123.455"
        :decimals="2"
        placeholder="Banker's rounding">
      </ejs-numerictextbox>
      <p class="result">Result: 123.46 (rounded to even)</p>
    </div>
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
.rounding-demo {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.rounding-demo h4 {
  margin: 0 0 10px 0;
}

.result {
  margin-top: 10px;
  color: #666;
  font-size: 12px;
}
</style>
```

---

## Examples

### Complete Precision Demo

```vue
<template>
  <div class="precision-demo">
    <h3>Precision and Decimal Configuration</h3>

    <div class="example-section">
      <h4>Financial Calculation</h4>
      <div class="input-group">
        <label>Amount:</label>
        <ejs-numerictextbox
          v-model.number="amount"
          :decimals="2"
          format="c2"
          prefix="$"
          placeholder="Enter amount">
        </ejs-numerictextbox>
      </div>

      <div class="input-group">
        <label>Tax Rate (%):</label>
        <ejs-numerictextbox
          v-model.number="taxRate"
          :decimals="2"
          suffix="%"
          :min="0"
          :max="100"
          placeholder="Tax percentage">
        </ejs-numerictextbox>
      </div>

      <div class="result-box">
        <p><strong>Original Amount:</strong> ${{ amount.toFixed(2) }}</p>
        <p><strong>Tax Amount:</strong> ${{ calculateTax().toFixed(2) }}</p>
        <p><strong>Total:</strong> ${{ (amount + calculateTax()).toFixed(2) }}</p>
      </div>
    </div>

    <div class="example-section">
      <h4>Scientific Measurement</h4>
      <div class="input-group">
        <label>Value (4 decimal places):</label>
        <ejs-numerictextbox
          v-model.number="scientificValue"
          :decimals="4"
          placeholder="Enter value">
        </ejs-numerictextbox>
      </div>
      <p class="result">Value: {{ scientificValue.toFixed(4) }}</p>
    </div>

    <div class="example-section">
      <h4>Integer Input</h4>
      <div class="input-group">
        <label>Quantity (no decimals):</label>
        <ejs-numerictextbox
          v-model.number="quantity"
          :decimals="0"
          :min="0"
          placeholder="Enter quantity">
        </ejs-numerictextbox>
      </div>
      <p class="result">Quantity: {{ quantity }}</p>
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
      amount: 100.00,
      taxRate: 8.5,
      scientificValue: 1.2345,
      quantity: 10
    }
  },
  methods: {
    calculateTax() {
      return this.amount * (this.taxRate / 100);
    }
  }
}
</script>

<style scoped>
.precision-demo {
  padding: 20px;
  max-width: 500px;
}

.example-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example-section h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.result {
  margin-top: 10px;
  color: #666;
  font-size: 12px;
}

.result-box {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-top: 15px;
}

.result-box p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
```
