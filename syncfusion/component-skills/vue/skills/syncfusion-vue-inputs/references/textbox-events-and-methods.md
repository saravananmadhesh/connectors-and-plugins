# Events and Methods — Syncfusion Vue TextBox

## Table of Contents
- [Event Handling](#event-handling)
- [Methods and Programmatic Control](#methods-and-programmatic-control)
- [Examples](#examples)

---

## Event Handling

Handle textbox events:

```vue
<template>
  <div class="events-demo">
    <fieldset>
      <legend>TextBox Events</legend>

      <div class="example">
        <label for="event-input">Input Event:</label>
        <ejs-textbox
          id="event-input"
          v-model="inputValue"
          @input="handleInput"
          placeholder="Type to trigger input event">
        </ejs-textbox>
        <p>Last input: {{ lastInputEvent }}</p>
      </div>

      <div class="example">
        <label for="event-change">Change Event:</label>
        <ejs-textbox
          id="event-change"
          v-model="changeValue"
          @change="handleChange"
          placeholder="Blur to trigger change event">
        </ejs-textbox>
        <p>Last change: {{ lastChangeEvent }}</p>
      </div>

      <div class="example">
        <label for="event-focus">Focus Event:</label>
        <ejs-textbox
          id="event-focus"
          @focus="handleFocus"
          placeholder="Click to focus">
        </ejs-textbox>
        <p>Focus count: {{ focusCount }}</p>
      </div>

      <div class="example">
        <label for="event-blur">Blur Event:</label>
        <ejs-textbox
          id="event-blur"
          @blur="handleBlur"
          placeholder="Click away to trigger blur">
        </ejs-textbox>
        <p>Last blur: {{ lastBlurTime }}</p>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      inputValue: '',
      changeValue: '',
      lastInputEvent: 'None',
      lastChangeEvent: 'None',
      focusCount: 0,
      lastBlurTime: 'None'
    }
  },
  methods: {
    handleInput(event) {
      this.lastInputEvent = `"${event.target.value}" at ${new Date().toLocaleTimeString()}`;
    },
    handleChange(event) {
      this.lastChangeEvent = `Changed to "${event.target.value}"`;
    },
    handleFocus() {
      this.focusCount++;
    },
    handleBlur() {
      this.lastBlurTime = new Date().toLocaleTimeString();
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.example {
  margin-bottom: 15px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

p {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Methods and Programmatic Control

Use textbox methods:

```vue
<template>
  <div class="methods-demo">
    <h4>TextBox Methods</h4>

    <div class="method-section">
      <h5>Focus and Blur</h5>
      <ejs-textbox
        ref="methodText"
        placeholder="Click buttons below"
        @focus="onFocus"
        @blur="onBlur">
      </ejs-textbox>

      <div class="button-group">
        <button @click="focusTextbox">Focus</button>
        <button @click="blurTextbox">Blur</button>
      </div>

      <p v-if="isFocused" class="status focused">✓ Focused</p>
      <p v-else class="status">Not focused</p>
    </div>

    <div class="method-section">
      <h5>Get and Set Value</h5>
      <ejs-textbox
        ref="valueText"
        v-model="textValue"
        placeholder="Enter text">
      </ejs-textbox>

      <div class="button-group">
        <button @click="getValue">Get Value</button>
        <button @click="setValue('Hello!')">Set Value</button>
        <button @click="clearValue">Clear Value</button>
      </div>

      <p>Current value: {{ currentValue }}</p>
    </div>

    <div class="method-section">
      <h5>Enable and Disable</h5>
      <ejs-textbox
        ref="enableText"
        v-model="enableValue"
        placeholder="Toggle enabled state">
      </ejs-textbox>

      <div class="button-group">
        <button @click="enableTextbox">Enable</button>
        <button @click="disableTextbox">Disable</button>
      </div>

      <p>Enabled: {{ isEnabled }}</p>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      textValue: '',
      enableValue: 'Sample text',
      isFocused: false,
      currentValue: '',
      isEnabled: true
    }
  },
  methods: {
    focusTextbox() {
      if (this.$refs.methodText) {
        this.$refs.methodText.$el.querySelector('input').focus();
      }
    },
    blurTextbox() {
      if (this.$refs.methodText) {
        this.$refs.methodText.$el.querySelector('input').blur();
      }
    },
    onFocus() {
      this.isFocused = true;
    },
    onBlur() {
      this.isFocused = false;
    },
    getValue() {
      this.currentValue = this.textValue || 'Empty';
    },
    setValue(value) {
      this.textValue = value;
      this.currentValue = value;
    },
    clearValue() {
      this.textValue = '';
      this.currentValue = '';
    },
    enableTextbox() {
      this.isEnabled = true;
      if (this.$refs.enableText) {
        this.$refs.enableText.enabled = true;
      }
    },
    disableTextbox() {
      this.isEnabled = false;
      if (this.$refs.enableText) {
        this.$refs.enableText.enabled = false;
      }
    }
  }
}
</script>

<style scoped>
.methods-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.methods-demo h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.method-section {
  margin-bottom: 25px;
}

.method-section:last-child {
  margin-bottom: 0;
}

h5 {
  margin: 0 0 10px 0;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background: #106ebe;
}

p {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.status {
  padding: 8px;
  background: #f9f9f9;
  border-radius: 3px;
}

.status.focused {
  background: #d4edda;
  color: #155724;
}
</style>
```

---

## Examples

### Complete Events and Methods Demo

```vue
<template>
  <div class="events-methods-complete">
    <h3>Events and Methods Guide</h3>

    <div class="event-log-section">
      <h4>Event Logger</h4>

      <div class="log-container">
        <ejs-textbox
          v-model="loggedText"
          @input="logEvent('input')"
          @change="logEvent('change')"
          @focus="logEvent('focus')"
          @blur="logEvent('blur')"
          @keydown="logEvent('keydown')"
          @keyup="logEvent('keyup')"
          placeholder="Type to see events logged">
        </ejs-textbox>

        <div class="event-display">
          <h5>Event Log:</h5>
          <div class="log-list">
            <div
              v-for="(event, index) in eventLog"
              :key="index"
              class="log-item"
              :class="event.type">
              <span class="time">{{ event.time }}</span>
              <span class="event-name">{{ event.type }}</span>
              <span v-if="event.value" class="event-value">{{ event.value }}</span>
            </div>
          </div>

          <button @click="clearLog" class="clear-btn">Clear Log</button>
        </div>
      </div>

      <p class="log-stats">Total events: {{ eventLog.length }}</p>
    </div>

    <div class="real-world-section">
      <h4>Real-World Use Cases</h4>

      <div class="use-case">
        <h5>Auto-Save Feature</h5>

        <ejs-textbox
          v-model="autoSaveText"
          @input="onAutoSave"
          placeholder="Auto-saves while typing">
        </ejs-textbox>

        <p v-if="autoSaveStatus" :class="autoSaveStatus.class">
          {{ autoSaveStatus.message }}
        </p>
      </div>

      <div class="use-case">
        <h5>Character Counter</h5>

        <ejs-textbox
          v-model="counterText"
          maxlength="100"
          @input="updateCounter"
          placeholder="Type to count characters (max 100)">
        </ejs-textbox>

        <div class="counter-display">
          <p>Characters: {{ counterText.length }}/100</p>
          <p v-if="counterText.length > 80" class="warning">
            ⚠ Approaching limit
          </p>
        </div>
      </div>

      <div class="use-case">
        <h5>Search with Debounce</h5>

        <ejs-textbox
          v-model="searchText"
          @input="onSearch"
          placeholder="Search (debounced)">
        </ejs-textbox>

        <div class="search-results">
          <p v-if="isSearching" class="searching">Searching...</p>
          <p v-else-if="searchResults.length > 0">
            Found {{ searchResults.length }} results
          </p>
          <p v-else-if="searchText" class="no-results">No results found</p>
        </div>
      </div>

      <div class="use-case">
        <h5>Form Field Validation</h5>

        <ejs-textbox
          v-model="emailField"
          type="email"
          @blur="validateEmail"
          @input="updateEmailStatus"
          :class="emailStatus.class"
          placeholder="Enter email">
        </ejs-textbox>

        <p :class="emailStatus.class">{{ emailStatus.message }}</p>
      </div>
    </div>

    <div class="method-examples">
      <h4>Method Examples</h4>

      <div class="method-card">
        <h5>Focus Management</h5>

        <ejs-textbox
          ref="focusDemo"
          placeholder="Click button to focus">
        </ejs-textbox>

        <button @click="focusExample">Focus This Input</button>
        <p>{{ focusDemoText }}</p>
      </div>

      <div class="method-card">
        <h5>Value Manipulation</h5>

        <ejs-textbox
          ref="valueDemo"
          v-model="valueDemoText"
          placeholder="Use buttons below">
        </ejs-textbox>

        <div class="button-group">
          <button @click="setDemoValue('Hello World')">Set Value</button>
          <button @click="appendDemoValue('!')">Append Text</button>
          <button @click="clearDemoValue">Clear</button>
          <button @click="getDemoValue">Get Value</button>
        </div>

        <p>Result: {{ valueDemoResult }}</p>
      </div>

      <div class="method-card">
        <h5>State Control</h5>

        <ejs-textbox
          ref="stateDemo"
          v-model="stateDemoText"
          :enabled="isDemoEnabled"
          placeholder="State can be controlled">
        </ejs-textbox>

        <div class="button-group">
          <button @click="isDemoEnabled = true">Enable</button>
          <button @click="isDemoEnabled = false">Disable</button>
          <button @click="toggleDemoState">Toggle</button>
        </div>

        <p>State: {{ isDemoEnabled ? 'Enabled' : 'Disabled' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      loggedText: '',
      eventLog: [],
      autoSaveText: '',
      autoSaveStatus: null,
      autoSaveTimeout: null,
      counterText: '',
      searchText: '',
      searchResults: [],
      isSearching: false,
      searchTimeout: null,
      emailField: '',
      emailStatus: { class: '', message: '' },
      valueDemoText: '',
      valueDemoResult: '',
      stateDemoText: 'Sample text',
      isDemoEnabled: true,
      focusDemoText: ''
    }
  },
  methods: {
    logEvent(eventType) {
      const time = new Date().toLocaleTimeString();
      const value = eventType === 'keydown' || eventType === 'keyup' ? 
        ` (${this.loggedText.length} chars)` : '';
      
      this.eventLog.unshift({
        type: eventType,
        time: time,
        value: value
      });

      if (this.eventLog.length > 20) {
        this.eventLog = this.eventLog.slice(0, 20);
      }
    },
    clearLog() {
      this.eventLog = [];
    },
    onAutoSave() {
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveStatus = { 
        class: 'saving', 
        message: 'Saving...' 
      };

      this.autoSaveTimeout = setTimeout(() => {
        this.autoSaveStatus = { 
          class: 'saved', 
          message: '✓ Saved at ' + new Date().toLocaleTimeString() 
        };
      }, 1500);
    },
    updateCounter() {
      if (this.counterText.length === 100) {
        this.counterText = this.counterText;
      }
    },
    onSearch() {
      clearTimeout(this.searchTimeout);
      
      if (!this.searchText) {
        this.searchResults = [];
        this.isSearching = false;
        return;
      }

      this.isSearching = true;
      this.searchTimeout = setTimeout(() => {
        // Simulate search results
        const sampleData = [
          'Apple', 'Application', 'Apply',
          'Banana', 'Band',
          'Cherry', 'Chart'
        ];
        
        this.searchResults = sampleData.filter(item =>
          item.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.isSearching = false;
      }, 500);
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!this.emailField) {
        this.emailStatus = { class: '', message: '' };
      } else if (emailRegex.test(this.emailField)) {
        this.emailStatus = { class: 'valid', message: '✓ Valid email' };
      } else {
        this.emailStatus = { class: 'invalid', message: '✗ Invalid email' };
      }
    },
    updateEmailStatus() {
      if (!this.emailField) {
        this.emailStatus = { class: '', message: '' };
      }
    },
    focusExample() {
      if (this.$refs.focusDemo) {
        this.$refs.focusDemo.$el.querySelector('input').focus();
        this.focusDemoText = '✓ Focused at ' + new Date().toLocaleTimeString();
      }
    },
    setDemoValue(value) {
      this.valueDemoText = value;
      this.valueDemoResult = `Set to: "${value}"`;
    },
    appendDemoValue(text) {
      this.valueDemoText += text;
      this.valueDemoResult = `Appended: "${text}"`;
    },
    clearDemoValue() {
      this.valueDemoText = '';
      this.valueDemoResult = 'Cleared';
    },
    getDemoValue() {
      this.valueDemoResult = `Current value: "${this.valueDemoText}"`;
    },
    toggleDemoState() {
      this.isDemoEnabled = !this.isDemoEnabled;
    }
  }
}
</script>

<style scoped>
.events-methods-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin: 0 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

h5 {
  margin: 0 0 12px 0;
}

.event-log-section,
.real-world-section,
.method-examples {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.log-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.event-display {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  background: #f9f9f9;
}

.event-display h5 {
  margin: 0 0 10px 0;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.log-item {
  padding: 4px;
  font-size: 11px;
  font-family: monospace;
  margin-bottom: 2px;
  padding: 4px 8px;
  background: white;
  border-left: 3px solid #ccc;
}

.log-item.input {
  border-left-color: #0078d4;
}

.log-item.change {
  border-left-color: #28a745;
}

.log-item.focus,
.log-item.blur {
  border-left-color: #ffc107;
}

.log-item.keydown,
.log-item.keyup {
  border-left-color: #6f42c1;
}

.time {
  color: #999;
  margin-right: 8px;
}

.event-name {
  font-weight: bold;
  color: #0078d4;
}

.event-value {
  color: #666;
  margin-left: 8px;
}

.clear-btn {
  width: 100%;
  padding: 8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.clear-btn:hover {
  background: #c82333;
}

.log-stats {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.use-case {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.use-case:last-child {
  margin-bottom: 0;
}

.counter-display {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.counter-display p {
  margin: 5px 0;
}

.warning {
  color: #ffc107;
  font-weight: bold;
}

.search-results {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.searching {
  color: #0078d4;
}

.no-results {
  color: #dc3545;
}

.valid {
  border-color: #28a745 !important;
  color: #28a745;
}

.invalid {
  border-color: #dc3545 !important;
  color: #dc3545;
}

.saving {
  color: #ffc107;
}

.saved {
  color: #28a745;
}

.method-card {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.method-card:last-child {
  margin-bottom: 0;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

button:hover {
  background: #106ebe;
}

p {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
</style>
```
