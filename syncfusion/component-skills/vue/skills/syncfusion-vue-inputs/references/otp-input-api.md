# OTP Input API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | '' | Current OTP value |
| `length` | number | 4 | Number of OTP digits |
| `type` | string | 'text' | Input type: 'text', 'password', 'number' |
| `placeholder` | string | '' | Placeholder for each input |
| `separator` | string | '' | Separator between inputs (e.g., '-') |
| `disabled` | boolean | false | Disable all inputs |
| `readonly` | boolean | false | Make inputs read-only |
| `autoFocus` | boolean | true | Auto-focus first input |
| `autoSubmit` | boolean | false | Auto-submit when filled |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getValue()` | - | string | Get complete OTP value |
| `setValue(value)` | string | void | Set OTP value |
| `clear()` | - | void | Clear all inputs |
| `focus(index)` | number | void | Focus specific input |
| `enable()` | - | void | Enable component |
| `disable()` | - | void | Disable component |

---

## Events

```typescript
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);  // Current OTP value
};

onComplete = (args: CompleteEventArgs) => {
  console.log('OTP complete:', args.value);
};

onInput = (args: InputEventArgs) => {
  console.log(args.value);
};

onKeyDown = (args: KeyEventArgs) => {
  console.log(args.key);
};
```

---

## Complete Example

```vue
<template>
  <div class="otp-demo">
    <div class="verification-section">
      <h2>Email Verification</h2>
      <p>Enter the 6-digit code sent to your email</p>

      <!-- OTP Input -->
      <OTPInputComponent
        v-model="otp"
        :length="6"
        :type="'number'"
        :placeholder="'0'"
        :separator="'-'"
        :autoFocus="true"
        :autoSubmit="false"
        @change="onOTPChange"
        @complete="onOTPComplete"
      />

      <!-- Status -->
      <div v-if="otp.length === 6" class="otp-filled">
        ✓ OTP Entered: {{ otp }}
      </div>

      <!-- Actions -->
      <div class="actions">
        <button @click="verifyOTP" :disabled="otp.length !== 6">
          Verify OTP
        </button>
        <button @click="resendOTP" :disabled="!canResend">
          {{ canResend ? 'Resend OTP' : `Resend in ${resendCountdown}s` }}
        </button>
        <button @click="clearOTP">Clear</button>
      </div>

      <!-- Messages -->
      <div v-if="verifyError" class="error-message">
        {{ verifyError }}
      </div>
      <div v-if="verifySuccess" class="success-message">
        {{ verifySuccess }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { OTPInputComponent } from '@syncfusion/ej2-vue-inputs';

const otp = ref('');
const verifyError = ref('');
const verifySuccess = ref('');
const canResend = ref(false);
const resendCountdown = ref(0);

const onOTPChange = (args) => {
  console.log('OTP changed:', args.value);
};

const onOTPComplete = (args) => {
  console.log('OTP complete:', args.value);
  // Auto-verify or auto-submit could happen here
};

const verifyOTP = async () => {
  try {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: otp.value })
    });

    if (response.ok) {
      verifySuccess.value = 'OTP verified successfully!';
      verifyError.value = '';
    } else {
      verifyError.value = 'Invalid OTP. Please try again.';
      verifySuccess.value = '';
    }
  } catch (error) {
    verifyError.value = 'Verification failed. Please try again.';
  }
};

const resendOTP = async () => {
  try {
    await fetch('/api/resend-otp', { method: 'POST' });
    
    canResend.value = false;
    resendCountdown.value = 60;
    
    const interval = setInterval(() => {
      resendCountdown.value--;
      if (resendCountdown.value === 0) {
        clearInterval(interval);
        canResend.value = true;
      }
    }, 1000);
  } catch (error) {
    console.error('Error resending OTP:', error);
  }
};

const clearOTP = () => {
  otp.value = '';
  verifyError.value = '';
  verifySuccess.value = '';
};
</script>

<style scoped>
.otp-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.verification-section {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h2 {
  margin: 0 0 10px 0;
  text-align: center;
  color: #333;
}

p {
  margin: 0 0 30px 0;
  text-align: center;
  color: #666;
}

.otp-filled {
  margin: 20px 0;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 25px 0;
}

button {
  padding: 12px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  background-color: #764ba2;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
}
</style>
```

