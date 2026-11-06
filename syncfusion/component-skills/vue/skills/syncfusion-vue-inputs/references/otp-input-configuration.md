# Configuration — Syncfusion Vue OTP Input

## Table of Contents
- [OTP Length](#otp-length)
- [Input Type and Format](#input-type-and-format)
- [Validation](#validation)
- [Examples](#examples)

---

## OTP Length

Configure the number of digits:

```vue
<template>
  <div>
    <label>OTP Length: {{ otpLength }}</label>
    <input
      v-model.number="otpLength"
      type="range"
      :min="4"
      :max="8"
      @change="handleLengthChange">

    <ejs-otpinput
      :length="otpLength"
      placeholder="Enter OTP">
    </ejs-otpinput>
  </div>
</template>

<script>
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-otpinput': OtpInputComponent
  },
  data() {
    return {
      otpLength: 6
    }
  },
  methods: {
    handleLengthChange() {
      console.log('OTP Length changed to:', this.otpLength);
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

## Input Type and Format

Configure input behavior:

```vue
<template>
  <div class="config-options">
    <div class="option">
      <h4>4-Digit PIN</h4>
      <ejs-otpinput
        :length="4"
        placeholder="0000">
      </ejs-otpinput>
    </div>

    <div class="option">
      <h4>6-Digit OTP (Standard)</h4>
      <ejs-otpinput
        :length="6"
        placeholder="000000">
      </ejs-otpinput>
    </div>

    <div class="option">
      <h4>8-Digit OTP (Secure)</h4>
      <ejs-otpinput
        :length="8"
        placeholder="00000000">
      </ejs-otpinput>
    </div>
  </div>
</template>

<script>
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-otpinput': OtpInputComponent
  }
}
</script>

<style scoped>
.config-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.option {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.option h4 {
  margin: 0 0 10px 0;
}
</style>
```

---

## Validation

Validate OTP input:

```vue
<template>
  <div>
    <ejs-otpinput
      :length="6"
      v-model="otpValue"
      placeholder="000000"
      @complete="validateOTP">
    </ejs-otpinput>

    <div v-if="validationResult" :class="['validation', validationResult.type]">
      {{ validationResult.message }}
    </div>
  </div>
</template>

<script>
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-otpinput': OtpInputComponent
  },
  data() {
    return {
      otpValue: '',
      validationResult: null
    }
  },
  methods: {
    validateOTP(event) {
      const otp = event.value;
      
      if (!otp || otp.length !== 6) {
        this.validationResult = {
          type: 'error',
          message: 'OTP must be 6 digits'
        };
        return;
      }

      // Check for known invalid patterns
      if (otp === '000000' || otp === '111111') {
        this.validationResult = {
          type: 'error',
          message: 'Invalid OTP pattern'
        };
        return;
      }

      this.validationResult = {
        type: 'success',
        message: '✓ Valid OTP'
      };
    }
  }
}
</script>

<style scoped>
.validation {
  margin-top: 12px;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

.validation.success {
  background: #d4edda;
  color: #155724;
}

.validation.error {
  background: #f8d7da;
  color: #721c24;
}
</style>
```

---

## Examples

### Complete Configuration Demo

```vue
<template>
  <div class="config-demo">
    <h3>OTP Input Configuration</h3>

    <div class="config-panel">
      <h4>Configuration Options</h4>

      <div class="config-field">
        <label>OTP Length:</label>
        <select v-model.number="config.length">
          <option value="4">4 Digits (PIN)</option>
          <option value="5">5 Digits</option>
          <option value="6">6 Digits (Standard)</option>
          <option value="7">7 Digits</option>
          <option value="8">8 Digits (Secure)</option>
        </select>
      </div>

      <div class="config-field">
        <label>
          <input type="checkbox" v-model="config.autoFocus"> Auto Focus First Input
        </label>
      </div>

      <div class="config-field">
        <label>
          <input type="checkbox" v-model="config.clearOnError"> Clear on Invalid Input
        </label>
      </div>
    </div>

    <div class="demo-section">
      <h4>Preview</h4>
      <ejs-otpinput
        :key="config.length"
        :length="config.length"
        :placeholder="'0'.repeat(config.length)"
        v-model="otpValue"
        @complete="handleComplete">
      </ejs-otpinput>
      
      <p v-if="otpComplete" class="success">
        ✓ OTP Complete: {{ otpValue }}
      </p>
    </div>

    <div class="common-uses">
      <h4>Common Use Cases</h4>

      <div class="use-case">
        <h5>Email Verification (6 digits)</h5>
        <ejs-otpinput
          :length="6"
          placeholder="000000">
        </ejs-otpinput>
      </div>

      <div class="use-case">
        <h5>SMS 2FA (6 digits)</h5>
        <ejs-otpinput
          :length="6"
          placeholder="000000">
        </ejs-otpinput>
      </div>

      <div class="use-case">
        <h5>Bank PIN (4 digits)</h5>
        <ejs-otpinput
          :length="4"
          placeholder="0000">
        </ejs-otpinput>
      </div>

      <div class="use-case">
        <h5>Security Code (8 digits)</h5>
        <ejs-otpinput
          :length="8"
          placeholder="00000000">
        </ejs-otpinput>
      </div>
    </div>
  </div>
</template>

<script>
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-otpinput': OtpInputComponent
  },
  data() {
    return {
      config: {
        length: 6,
        autoFocus: true,
        clearOnError: false
      },
      otpValue: '',
      otpComplete: false
    }
  },
  methods: {
    handleComplete(event) {
      this.otpComplete = true;
      this.otpValue = event.value;
    }
  }
}
</script>

<style scoped>
.config-demo {
  padding: 20px;
  max-width: 600px;
}

.config-panel,
.demo-section,
.common-uses {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.config-panel h4,
.demo-section h4,
.common-uses h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.config-field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.success {
  color: #107c10;
  font-weight: bold;
  margin-top: 15px;
}

.use-case {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.use-case:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.use-case h5 {
  margin: 0 0 10px 0;
}
</style>
```
