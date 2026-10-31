# Accessibility — Syncfusion Vue OTP Input

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Examples](#examples)

---

## WCAG 2.2 Compliance

Ensure accessibility standards:

```vue
<template>
  <div class="accessible-otp">
    <label for="otp-input">Enter One-Time Password (6 digits):</label>
    <ejs-otpinput
      id="otp-input"
      :length="6"
      aria-label="6-digit OTP input"
      aria-describedby="otp-help"
      placeholder="000000">
    </ejs-otpinput>
    <small id="otp-help">A 6-digit code has been sent to your registered email</small>
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
label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

small {
  display: block;
  color: #666;
  margin-top: 8px;
  font-size: 12px;
}
</style>
```

---

## Keyboard Navigation

Support keyboard interactions:

```vue
<template>
  <div class="keyboard-otp">
    <ejs-otpinput
      :length="6"
      placeholder="000000"
      @complete="handleComplete"
      @change="handleChange">
    </ejs-otpinput>

    <p v-if="navigationInfo">{{ navigationInfo }}</p>
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
      navigationInfo: 'Use arrow keys to navigate between fields. Tab to focus.'
    }
  },
  methods: {
    handleComplete(event) {
      console.log('OTP Complete:', event.value);
    },
    handleChange(event) {
      console.log('OTP Changed:', event.value);
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 15px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Screen Reader Support

Provide context for screen readers:

```vue
<template>
  <div class="screen-reader-otp">
    <fieldset>
      <legend>Two-Factor Authentication</legend>
      
      <label for="otp">Enter 6-digit verification code:</label>
      <ejs-otpinput
        id="otp"
        :length="6"
        placeholder="000000"
        aria-label="6-digit verification code"
        aria-describedby="otp-status"
        @complete="markComplete">
      </ejs-otpinput>

      <div id="otp-status" aria-live="polite" aria-atomic="true">
        <p v-if="isComplete">✓ Verification code received</p>
        <p v-else>Enter all 6 digits to proceed</p>
      </div>

      <small>A code was sent to your registered phone number ending in 5555</small>
    </fieldset>
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
      isComplete: false
    }
  },
  methods: {
    markComplete(event) {
      this.isComplete = !!event.value && event.value.length === 6;
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
}

legend {
  font-weight: bold;
  padding: 0 8px;
}

label {
  display: block;
  margin-bottom: 12px;
  font-weight: bold;
}

small {
  display: block;
  color: #666;
  margin-top: 12px;
  font-size: 12px;
}

#otp-status {
  margin-top: 12px;
  font-size: 14px;
}

#otp-status p {
  margin: 0;
}
</style>
```

---

## Examples

### Accessible OTP Form

```vue
<template>
  <div class="accessible-form">
    <h2>Secure Login</h2>

    <form @submit.prevent="verifyOTP">
      <fieldset>
        <legend>Verification Step</legend>

        <div class="form-section">
          <p>A 6-digit code has been sent to <strong>your-email@example.com</strong></p>
        </div>

        <div class="form-field">
          <label for="verification-code">
            Verification Code:
            <span aria-label="required">*</span>
          </label>
          <ejs-otpinput
            id="verification-code"
            :length="6"
            v-model="otpCode"
            placeholder="000000"
            aria-label="6-digit verification code"
            aria-describedby="code-help"
            aria-required="true"
            @complete="handleOTPComplete">
          </ejs-otpinput>
          <small id="code-help">Enter the 6-digit code from your email</small>
        </div>

        <div v-if="otpStatus" :class="['status', otpStatus.type]">
          {{ otpStatus.message }}
        </div>

        <button type="submit" :disabled="otpCode.length !== 6">
          Verify
        </button>
      </fieldset>
    </form>

    <div class="help-section">
      <h3>Accessibility Features</h3>
      <ul>
        <li>Keyboard navigation with arrow keys</li>
        <li>Screen reader compatible</li>
        <li>High contrast support</li>
        <li>Clear error messages</li>
      </ul>
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
      otpCode: '',
      otpStatus: null
    }
  },
  methods: {
    handleOTPComplete(event) {
      this.otpCode = event.value;
    },
    verifyOTP() {
      if (this.otpCode.length === 6) {
        this.otpStatus = {
          type: 'success',
          message: '✓ Code verified successfully!'
        };
      } else {
        this.otpStatus = {
          type: 'error',
          message: '✗ Please enter all 6 digits'
        };
      }
    }
  }
}
</script>

<style scoped>
.accessible-form {
  max-width: 500px;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

legend {
  font-weight: bold;
  font-size: 16px;
  padding: 0 8px;
}

.form-section {
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

small {
  display: block;
  color: #666;
  margin-top: 5px;
  font-size: 12px;
}

.status {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

button {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.help-section {
  margin-top: 30px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.help-section h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.help-section ul {
  margin: 0;
  padding-left: 20px;
}

.help-section li {
  margin: 5px 0;
  font-size: 14px;
}
</style>
```
