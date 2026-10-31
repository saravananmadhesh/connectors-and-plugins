# Spin Buttons and Step — Syncfusion Vue NumericTextBox

## Table of Contents
- [Spin Buttons](#spin-buttons)
- [Step Configuration](#step-configuration)
- [Large Step Values](#large-step-values)
- [Examples](#examples)

---

## Spin Buttons

Control spin button visibility and behavior:

```vue
<template>
  <div>
    <ejs-numerictextbox
      value="10"
      :spin-button="true"
      :step="1"
      placeholder="With spin buttons">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="10"
      :spin-button="false"
      placeholder="No spin buttons">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="10"
      :show-spin-button="true"
      placeholder="Customized buttons">
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

## Step Configuration

Configure step increment/decrement:

```vue
<template>
  <div>
    <label>Step Value: {{ stepValue }}</label>
    <input
      v-model.number="stepValue"
      type="range"
      :min="0.1"
      :max="10"
      step="0.1">

    <ejs-numerictextbox
      value="0"
      :step="stepValue"
      :spin-button="true"
      placeholder="Click up/down buttons">
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
      stepValue: 1
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
  margin-bottom: 15px;
}
</style>
```

---

## Large Step Values

Use large increments:

```vue
<template>
  <div class="step-examples">
    <div class="example">
      <h4>Price (Step: 0.01)</h4>
      <ejs-numerictextbox
        value="0"
        :step="0.01"
        :decimals="2"
        format="c2"
        prefix="$"
        :spin-button="true"
        placeholder="Price">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Quantity (Step: 1)</h4>
      <ejs-numerictextbox
        value="0"
        :step="1"
        :decimals="0"
        :spin-button="true"
        placeholder="Quantity">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Volume (Step: 5)</h4>
      <ejs-numerictextbox
        value="0"
        :step="5"
        :spin-button="true"
        placeholder="Volume in liters">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Temperature (Step: 0.5)</h4>
      <ejs-numerictextbox
        value="20"
        :step="0.5"
        :decimals="1"
        suffix="°C"
        :spin-button="true"
        placeholder="Temperature">
      </ejs-numerictextbox>
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
.step-examples {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.example {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}
</style>
```

---

## Examples

### Complete Step Configuration Demo

```vue
<template>
  <div class="step-demo">
    <h3>Spin Buttons and Step Configuration</h3>

    <div class="configuration-panel">
      <h4>Configuration</h4>

      <div class="config-group">
        <label>
          <input type="checkbox" v-model="enableSpinButtons"> Enable Spin Buttons
        </label>
      </div>

      <div class="config-group">
        <label>Step Value:</label>
        <ejs-numerictextbox
          v-model.number="stepValue"
          :decimals="2"
          :min="0.01"
          :max="100"
          :step="0.01"
          placeholder="Step value">
        </ejs-numerictextbox>
      </div>

      <div class="config-group">
        <label>Min Value:</label>
        <ejs-numerictextbox
          v-model.number="minValue"
          :decimals="0"
          :step="1"
          placeholder="Minimum">
        </ejs-numerictextbox>
      </div>

      <div class="config-group">
        <label>Max Value:</label>
        <ejs-numerictextbox
          v-model.number="maxValue"
          :decimals="0"
          :step="1"
          placeholder="Maximum">
        </ejs-numerictextbox>
      </div>
    </div>

    <div class="demo-section">
      <h4>Demo Input</h4>
      <ejs-numerictextbox
        value="10"
        :spin-button="enableSpinButtons"
        :step="stepValue"
        :min="minValue"
        :max="maxValue"
        placeholder="Try using spin buttons">
      </ejs-numerictextbox>
    </div>

    <div class="examples">
      <h4>Common Use Cases</h4>

      <div class="use-case">
        <label>Quantity (Step: 1):</label>
        <ejs-numerictextbox
          value="1"
          :step="1"
          :decimals="0"
          :min="1"
          :spin-button="true">
        </ejs-numerictextbox>
      </div>

      <div class="use-case">
        <label>Rating (Step: 0.5):</label>
        <ejs-numerictextbox
          value="3.5"
          :step="0.5"
          :decimals="1"
          :min="0"
          :max="5"
          :spin-button="true">
        </ejs-numerictextbox>
      </div>

      <div class="use-case">
        <label>Percentage (Step: 1):</label>
        <ejs-numerictextbox
          value="50"
          :step="1"
          :decimals="0"
          :min="0"
          :max="100"
          suffix="%"
          :spin-button="true">
        </ejs-numerictextbox>
      </div>
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
      enableSpinButtons: true,
      stepValue: 1,
      minValue: 0,
      maxValue: 100
    }
  }
}
</script>

<style scoped>
.step-demo {
  padding: 20px;
  max-width: 500px;
}

.configuration-panel,
.demo-section,
.examples {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.configuration-panel h4,
.demo-section h4,
.examples h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.config-group,
.use-case {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="checkbox"] {
  margin-right: 8px;
}
</style>
```
