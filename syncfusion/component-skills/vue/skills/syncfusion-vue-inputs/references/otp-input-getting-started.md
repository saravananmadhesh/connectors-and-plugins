# OTP Input Getting Started - Vue 3

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="otp-container">
    <label>Enter OTP:</label>
    <OtpInputComponent
      v-model="otp"
      :length="6"
      @change="onOtpChange"
    />
    <p>OTP: {{ otp }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/otp-input/index.css";

const otp = ref('');

const onOtpChange = (args) => {
  console.log('OTP changed:', args.value);
};
</script>

<style scoped>
.otp-container {
  max-width: 400px;
  padding: 20px;
}
</style>
```

---

## Quick Start

### 4-Digit OTP

```vue
<template>
  <div>
    <label>4-Digit PIN:</label>
    <OtpInputComponent
      v-model="pin"
      :length="4"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

const pin = ref('');
</script>
```

### 6-Digit OTP

```vue
<template>
  <div>
    <label>6-Digit OTP:</label>
    <OtpInputComponent
      v-model="otp"
      :length="6"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

const otp = ref('');
</script>
```

---

## Complete Example: Two-Factor Authentication

```vue
<template>
  <div class="otp-verification">
    <h2>Two-Factor Authentication</h2>

    <div v-if="!otpSent" class="step-1">
      <h3>Step 1: Enter Your Phone Number</h3>
      <form @submit.prevent="sendOtp">
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            id="phone"
            v-model="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <button type="submit" :disabled="isSending">
          {{ isSending ? 'Sending OTP...' : 'Send OTP' }}
        </button>
      </form>
    </div>

    <div v-else class="step-2">
      <h3>Step 2: Verify OTP</h3>
      <p>We've sent a verification code to {{ maskedPhone }}</p>

      <div class="form-group">
        <label for="otp">Enter 6-digit OTP:</label>
        <OtpInputComponent
          ref="otpInputRef"
          v-model="otpValue"
          :length="6"
          :type="'number'"
        />
      </div>

      <div v-if="otpError" class="error-message">
        {{ otpError }}
      </div>

      <div class="actions">
        <button @click="verifyOtp" :disabled="isVerifying || otpValue.length !== 6">
          {{ isVerifying ? 'Verifying...' : 'Verify OTP' }}
        </button>
        <button @click="changPhone" type="button" class="secondary">
          Change Number
        </button>
      </div>

      <div class="resend-section">
        <p v-if="!canResend">
          Resend OTP in {{ remainingTime }} seconds
        </p>
        <button v-else @click="resendOtp" type="button" class="link">
          Resend OTP
        </button>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { OtpInputComponent } from '@syncfusion/ej2-vue-inputs';

const otpInputRef = ref(null);
const phoneNumber = ref('');
const otpValue = ref('');
const otpSent = ref(false);
const isSending = ref(false);
const isVerifying = ref(false);
const otpError = ref('');
const successMessage = ref('');
const canResend = ref(false);
const remainingTime = ref(30);
let resendTimer = null;

const maskedPhone = computed(() => {
  const last4 = phoneNumber.value.slice(-4);
  return `***-***-${last4}`;
});

const sendOtp = async () => {
  isSending.value = true;

  try {
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    otpSent.value = true;
    canResend.value = false;
    remainingTime.value = 30;
    startResendTimer();
    console.log('OTP sent to', phoneNumber.value);
  } catch (error) {
    console.error('Error sending OTP:', error);
  } finally {
    isSending.value = false;
  }
};

const verifyOtp = async () => {
  isVerifying.value = true;
  otpError.value = '';

  try {
    // Simulate API call to verify OTP
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otpValue.value === '123456') { // Demo OTP
      successMessage.value = '✓ Phone number verified successfully!';
      setTimeout(() => {
        alert('2FA setup complete!');
        resetForm();
      }, 2000);
    } else {
      otpError.value = 'Invalid OTP. Please try again.';
      otpValue.value = '';
    }
  } catch (error) {
    otpError.value = 'Verification failed. Please try again.';
    console.error('Error verifying OTP:', error);
  } finally {
    isVerifying.value = false;
  }
};

const resendOtp = () => {
  otpValue.value = '';
  otpError.value = '';
  canResend.value = false;
  remainingTime.value = 30;
  startResendTimer();
  console.log('OTP resent');
};

const changPhone = () => {
  otpSent.value = false;
  phoneNumber.value = '';
  otpValue.value = '';
  otpError.value = '';
  if (resendTimer) clearInterval(resendTimer);
};

const startResendTimer = () => {
  if (resendTimer) clearInterval(resendTimer);
  resendTimer = setInterval(() => {
    remainingTime.value--;
    if (remainingTime.value <= 0) {
      canResend.value = true;
      clearInterval(resendTimer);
    }
  }, 1000);
};

const resetForm = () => {
  phoneNumber.value = '';
  otpValue.value = '';
  otpSent.value = false;
  otpError.value = '';
  successMessage.value = '';
  canResend.value = false;
  remainingTime.value = 30;
  if (resendTimer) clearInterval(resendTimer);
};

onUnmounted(() => {
  if (resendTimer) clearInterval(resendTimer);
});
</script>

<style scoped>
.otp-verification {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 12px;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:not(.secondary):not(.link) {
  background-color: #007bff;
  color: white;
}

button:not(.secondary):not(.link):hover:not(:disabled) {
  background-color: #0056b3;
}

button:not(.secondary):not(.link):disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.secondary {
  background-color: #6c757d;
  color: white;
}

button.secondary:hover {
  background-color: #5a6268;
}

button.link {
  background-color: transparent;
  color: #007bff;
  text-decoration: underline;
  padding: 0;
}

button.link:hover {
  color: #0056b3;
}

.resend-section {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.resend-section p {
  color: #666;
  font-size: 12px;
  margin: 0;
}
</style>
```
