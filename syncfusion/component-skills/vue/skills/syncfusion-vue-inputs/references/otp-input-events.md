# Events and Methods — Syncfusion Vue OTP Input

## Table of Contents
- [Event Handling](#event-handling)
- [Change Event](#change-event)
- [Complete Event](#complete-event)
- [Examples](#examples)

---

## Event Handling

Handle OTP input events:

```vue
<template>
  <div>
    <ejs-otpinput
      :length="6"
      placeholder="000000"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur">
    </ejs-otpinput>

    <p v-if="eventLog">Last event: {{ eventLog }}</p>
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
      eventLog: ''
    }
  },
  methods: {
    handleChange(event) {
      this.eventLog = `Changed: ${event.value}`;
    },
    handleFocus(event) {
      this.eventLog = 'Focused';
    },
    handleBlur(event) {
      this.eventLog = 'Blurred';
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

## Change Event

Handle value changes:

```vue
<template>
  <div>
    <ejs-otpinput
      :length="6"
      v-model="otp"
      placeholder="000000"
      @change="onOtpChange">
    </ejs-otpinput>

    <div v-if="changeInfo" class="change-info">
      <p><strong>Current Value:</strong> {{ otp }}</p>
      <p><strong>Change Timestamp:</strong> {{ changeInfo }}</p>
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
      otp: '',
      changeInfo: ''
    }
  },
  methods: {
    onOtpChange(event) {
      const now = new Date().toLocaleTimeString();
      this.changeInfo = now;
      console.log('OTP changed to:', event.value);
    }
  }
}
</script>

<style scoped>
.change-info {
  margin-top: 15px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.change-info p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
```

---

## Complete Event

Handle OTP completion:

```vue
<template>
  <div>
    <ejs-otpinput
      :length="6"
      placeholder="000000"
      @complete="onOtpComplete">
    </ejs-otpinput>

    <div v-if="isComplete" class="complete-message">
      <p>✓ OTP received: {{ completedOtp }}</p>
      <button @click="submitOtp">Verify</button>
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
      isComplete: false,
      completedOtp: ''
    }
  },
  methods: {
    onOtpComplete(event) {
      this.completedOtp = event.value;
      this.isComplete = true;
      console.log('OTP Complete:', event.value);
    },
    submitOtp() {
      console.log('Submitting OTP:', this.completedOtp);
    }
  }
}
</script>

<style scoped>
.complete-message {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.complete-message p {
  margin: 0 0 10px 0;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}
</style>
```

---

## Examples

### Complete Event Handling Demo

```vue
<template>
  <div class="event-demo">
    <h3>OTP Input Event Handling</h3>

    <div class="otp-section">
      <h4>Verification Code</h4>
      <ejs-otpinput
        :length="6"
        placeholder="000000"
        @change="handleChange"
        @complete="handleComplete"
        @focus="handleFocus"
        @blur="handleBlur">
      </ejs-otpinput>
    </div>

    <div class="events-log">
      <h4>Event Log</h4>
      <div class="log-content">
        <p v-for="(log, index) in eventLogs" :key="index" class="log-entry">
          <span class="time">{{ log.time }}</span>
          <span class="event">{{ log.event }}</span>
          <span v-if="log.value" class="value">{{ log.value }}</span>
        </p>
      </div>
      <button @click="clearLogs" class="clear-btn">Clear Logs</button>
    </div>

    <div v-if="otpComplete" class="status-section">
      <h4>Status</h4>
      <div class="success-message">
        <p>✓ OTP Verification Code Received</p>
        <p><strong>Code:</strong> {{ completedOtp }}</p>
        <button @click="verifyOtp">Verify Code</button>
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
      eventLogs: [],
      otpComplete: false,
      completedOtp: ''
    }
  },
  methods: {
    handleChange(event) {
      this.addLog('Change', `Value: ${event.value}`);
    },
    handleComplete(event) {
      this.addLog('Complete', `OTP: ${event.value}`);
      this.otpComplete = true;
      this.completedOtp = event.value;
    },
    handleFocus(event) {
      this.addLog('Focus', 'OTP input focused');
    },
    handleBlur(event) {
      this.addLog('Blur', 'OTP input blurred');
    },
    addLog(event, value) {
      const time = new Date().toLocaleTimeString();
      this.eventLogs.unshift({ time, event, value });
      // Keep only last 10 logs
      if (this.eventLogs.length > 10) {
        this.eventLogs.pop();
      }
    },
    clearLogs() {
      this.eventLogs = [];
    },
    verifyOtp() {
      console.log('Verifying OTP:', this.completedOtp);
      this.addLog('Verify', `Code ${this.completedOtp} submitted`);
    }
  }
}
</script>

<style scoped>
.event-demo {
  padding: 20px;
  max-width: 600px;
}

.otp-section,
.events-log,
.status-section {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.log-content {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 12px;
}

.log-entry {
  margin: 5px 0;
  padding: 5px;
  border-bottom: 1px solid #eee;
}

.log-entry:last-child {
  border-bottom: none;
}

.time {
  color: #666;
  margin-right: 8px;
}

.event {
  color: #0078d4;
  font-weight: bold;
  margin-right: 8px;
}

.value {
  color: #107c10;
}

.clear-btn {
  padding: 8px 16px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.clear-btn:hover {
  background: #d0d0d0;
}

.success-message {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 12px;
  border-radius: 4px;
}

.success-message p {
  margin: 5px 0;
}

.success-message button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.success-message button:hover {
  background: #218838;
}
</style>
```
