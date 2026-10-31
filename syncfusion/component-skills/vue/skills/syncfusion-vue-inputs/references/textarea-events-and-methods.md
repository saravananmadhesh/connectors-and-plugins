# Events and Methods — Syncfusion Vue TextArea

## Table of Contents
- [Event Handling](#event-handling)
- [TextArea Methods](#textarea-methods)
- [Examples](#examples)

---

## Event Handling

Handle textarea events:

```vue
<template>
  <div class="events-demo">
    <fieldset>
      <legend>TextArea Events</legend>

      <div class="example">
        <label for="event-input">Input Event:</label>
        <textarea
          id="event-input"
          v-model="inputValue"
          @input="handleInput"
          rows="3"
          placeholder="Type to trigger input event">
        </textarea>
        <p>Last input: {{ lastInputEvent }}</p>
      </div>

      <div class="example">
        <label for="event-change">Change Event:</label>
        <textarea
          id="event-change"
          v-model="changeValue"
          @change="handleChange"
          rows="3"
          placeholder="Blur to trigger change event">
        </textarea>
        <p>Last change: {{ lastChangeEvent }}</p>
      </div>

      <div class="example">
        <label for="event-focus">Focus Event:</label>
        <textarea
          id="event-focus"
          @focus="handleFocus"
          rows="3"
          placeholder="Click to focus">
        </textarea>
        <p>Focus count: {{ focusCount }}</p>
      </div>

      <div class="example">
        <label for="event-blur">Blur Event:</label>
        <textarea
          id="event-blur"
          @blur="handleBlur"
          rows="3"
          placeholder="Click away to trigger blur">
        </textarea>
        <p>Last blur: {{ lastBlurTime }}</p>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaEventHandling',
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
      this.lastInputEvent = `"${event.target.value.substring(0, 20)}" at ${new Date().toLocaleTimeString()}`;
    },
    handleChange(event) {
      this.lastChangeEvent = `Changed to "${event.target.value.substring(0, 20)}"`;
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
  margin-bottom: 20px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

p {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## TextArea Methods

Methods and programmatic control:

```vue
<template>
  <div class="methods-demo">
    <h4>TextArea Methods</h4>

    <div class="method-section">
      <h5>Focus and Blur</h5>
      <textarea
        ref="methodText"
        rows="3"
        placeholder="Click buttons below">
      </textarea>

      <div class="button-group">
        <button @click="focusTextarea">Focus</button>
        <button @click="blurTextarea">Blur</button>
      </div>

      <p v-if="isFocused" class="status focused">✓ Focused</p>
      <p v-else class="status">Not focused</p>
    </div>

    <div class="method-section">
      <h5>Get and Set Value</h5>
      <textarea
        ref="valueText"
        v-model="textValue"
        rows="3"
        placeholder="Enter text">
      </textarea>

      <div class="button-group">
        <button @click="getValue">Get Value</button>
        <button @click="setValue('Hello!')">Set Value</button>
        <button @click="clearValue">Clear Value</button>
      </div>

      <p>Current value: {{ currentValue }}</p>
    </div>

    <div class="method-section">
      <h5>Enable and Disable</h5>
      <textarea
        ref="enableText"
        v-model="enableValue"
        :disabled="!isEnabled"
        rows="3"
        placeholder="Toggle enabled state">
      </textarea>

      <div class="button-group">
        <button @click="enableTextarea">Enable</button>
        <button @click="disableTextarea">Disable</button>
      </div>

      <p>Enabled: {{ isEnabled }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaMethods',
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
    focusTextarea() {
      if (this.$refs.methodText) {
        this.$refs.methodText.focus();
      }
    },
    blurTextarea() {
      if (this.$refs.methodText) {
        this.$refs.methodText.blur();
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
    enableTextarea() {
      this.isEnabled = true;
    },
    disableTextarea() {
      this.isEnabled = false;
    }
  },
  mounted() {
    const methodText = this.$refs.methodText;
    if (methodText) {
      methodText.addEventListener('focus', this.onFocus);
      methodText.addEventListener('blur', this.onBlur);
    }
  },
  beforeUnmount() {
    const methodText = this.$refs.methodText;
    if (methodText) {
      methodText.removeEventListener('focus', this.onFocus);
      methodText.removeEventListener('blur', this.onBlur);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.method-section {
  margin-bottom: 25px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.method-section:last-child {
  margin-bottom: 0;
}

h5 {
  margin: 0 0 10px 0;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 10px;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

textarea:disabled {
  background: #f0f0f0;
  opacity: 0.6;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
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
  margin: 0;
  font-size: 12px;
  color: #666;
  padding: 8px;
  background: white;
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
    <h3>TextArea Events and Methods Guide</h3>

    <div class="event-log-section">
      <h4>Event Logger</h4>

      <div class="log-container">
        <textarea
          v-model="loggedText"
          @input="logEvent('input')"
          @change="logEvent('change')"
          @focus="logEvent('focus')"
          @blur="logEvent('blur')"
          @keydown="logEvent('keydown')"
          rows="5"
          placeholder="Type to see events logged">
        </textarea>

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

        <textarea
          v-model="autoSaveText"
          @input="onAutoSave"
          rows="4"
          placeholder="Auto-saves while typing">
        </textarea>

        <p v-if="autoSaveStatus" :class="autoSaveStatus.class">
          {{ autoSaveStatus.message }}
        </p>
      </div>

      <div class="use-case">
        <h5>Character Counter</h5>

        <textarea
          v-model="counterText"
          maxlength="200"
          @input="updateCounter"
          rows="4"
          placeholder="Type to count characters (max 200)">
        </textarea>

        <div class="counter-display">
          <p>Characters: {{ counterText.length }}/200</p>
          <p v-if="counterText.length > 160" class="warning">
            ⚠ Approaching limit
          </p>
        </div>
      </div>

      <div class="use-case">
        <h5>Search with Debounce</h5>

        <textarea
          v-model="searchText"
          @input="onSearch"
          rows="4"
          placeholder="Search (debounced)">
        </textarea>

        <div class="search-results">
          <p v-if="isSearching" class="searching">Searching...</p>
          <p v-else-if="searchResults.length > 0">
            Found {{ searchResults.length }} results
          </p>
          <p v-else-if="searchText" class="no-results">No results found</p>
        </div>
      </div>
    </div>

    <div class="method-examples">
      <h4>Method Examples</h4>

      <div class="method-card">
        <h5>Focus Management</h5>

        <textarea
          ref="focusDemo"
          rows="3"
          placeholder="Click button to focus">
        </textarea>

        <button @click="focusExample">Focus This Input</button>
        <p>{{ focusDemoText }}</p>
      </div>

      <div class="method-card">
        <h5>Value Manipulation</h5>

        <textarea
          ref="valueDemo"
          v-model="valueDemoText"
          rows="3"
          placeholder="Use buttons below">
        </textarea>

        <div class="button-group">
          <button @click="setDemoValue('Hello World')">Set Value</button>
          <button @click="appendDemoValue(' !')">Append Text</button>
          <button @click="clearDemoValue">Clear</button>
          <button @click="getDemoValue">Get Value</button>
        </div>

        <p>Result: {{ valueDemoResult }}</p>
      </div>

      <div class="method-card">
        <h5>State Control</h5>

        <textarea
          ref="stateDemo"
          v-model="stateDemoText"
          :disabled="!isDemoEnabled"
          rows="3"
          placeholder="State can be controlled">
        </textarea>

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
export default {
  name: 'TextAreaEventsMethodsComplete',
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
      const value = (eventType === 'keydown') ? 
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
      if (this.counterText.length === 200) {
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
        const sampleData = [
          'Lorem Ipsum', 'Dolor Sit', 'Amet Consectetur',
          'Adipiscing Elit', 'Sed Do'
        ];
        
        this.searchResults = sampleData.filter(item =>
          item.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.isSearching = false;
      }, 500);
    },
    focusExample() {
      if (this.$refs.focusDemo) {
        this.$refs.focusDemo.focus();
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
  max-width: 1000px;
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
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
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
  padding: 4px 8px;
  font-size: 11px;
  font-family: monospace;
  margin-bottom: 2px;
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

.time {
  color: #999;
  margin-right: 8px;
}

.event-name {
  font-weight: bold;
  color: #0078d4;
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
