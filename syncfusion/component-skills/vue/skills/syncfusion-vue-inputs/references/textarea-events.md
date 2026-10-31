# Events — Syncfusion Vue TextArea

## Table of Contents
- [Input Events](#input-events)
- [Change Events](#change-events)
- [Focus Events](#focus-events)
- [Examples](#examples)

---

## Input Events

Real-time input event handling:

```vue
<template>
  <div class="input-events">
    <fieldset>
      <legend>Input Events</legend>

      <div class="form-group">
        <label for="input-tracking">Type to track events:</label>
        <textarea
          id="input-tracking"
          v-model="text"
          @input="handleInput"
          @keydown="handleKeydown"
          @keyup="handleKeyup"
          rows="4"
          placeholder="Start typing...">
        </textarea>
      </div>

      <div class="event-counter">
        <p>Input events: <strong>{{ eventCount.input }}</strong></p>
        <p>Keydown events: <strong>{{ eventCount.keydown }}</strong></p>
        <p>Keyup events: <strong>{{ eventCount.keyup }}</strong></p>
        <p>Last key pressed: <strong>{{ lastKey || 'None' }}</strong></p>
      </div>

      <div class="event-log">
        <h5>Recent Events:</h5>
        <ul>
          <li v-for="(event, index) in recentEvents" :key="index">
            <span class="event-type">{{ event.type }}</span>
            <span class="event-time">{{ event.time }}</span>
            <span class="event-detail">{{ event.detail }}</span>
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaInputEvents',
  data() {
    return {
      text: '',
      eventCount: { input: 0, keydown: 0, keyup: 0 },
      lastKey: '',
      recentEvents: []
    }
  },
  methods: {
    handleInput(event) {
      this.eventCount.input++;
      this.addEvent('input', `Value length: ${event.target.value.length}`);
    },
    handleKeydown(event) {
      this.eventCount.keydown++;
      this.lastKey = event.key;
      this.addEvent('keydown', `Key: ${event.key}, Code: ${event.code}`);
    },
    handleKeyup(event) {
      this.eventCount.keyup++;
      this.addEvent('keyup', `Key: ${event.key}`);
    },
    addEvent(type, detail) {
      this.recentEvents.unshift({
        type,
        time: new Date().toLocaleTimeString(),
        detail
      });
      if (this.recentEvents.length > 10) {
        this.recentEvents = this.recentEvents.slice(0, 10);
      }
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.event-counter {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.event-counter p {
  margin: 0;
  font-size: 13px;
}

.event-log {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.event-log h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-log li {
  padding: 4px 0;
  font-size: 12px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.event-log li:last-child {
  border-bottom: none;
}

.event-type {
  font-weight: bold;
  color: #0078d4;
  min-width: 70px;
}

.event-time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.event-detail {
  color: #333;
  flex: 1;
}
</style>
```

---

## Change Events

Change event handling (fires on blur):

```vue
<template>
  <div class="change-events">
    <h4>Change Events</h4>

    <div class="form-group">
      <label>Original Value: <strong>{{ originalValue }}</strong></label>
      <textarea
        v-model="currentValue"
        @change="handleChange"
        @blur="handleBlur"
        rows="3"
        class="change-textarea"
        placeholder="Edit and click outside to see change event">
      </textarea>
    </div>

    <div class="change-info">
      <p>Current Value: <strong>{{ currentValue }}</strong></p>
      <p>Change Count: <strong>{{ changeCount }}</strong></p>
      <p>Last Changed: <strong>{{ lastChangeTime || 'Never' }}</strong></p>
    </div>

    <div class="change-history">
      <h5>Change History:</h5>
      <ol>
        <li v-for="(change, index) in changeHistory" :key="index">
          <span class="change-time">{{ change.time }}</span> - 
          Changed from <em>"{{ change.from }}"</em> to <em>"{{ change.to }}"</em>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaChangeEvents',
  data() {
    return {
      originalValue: 'Initial value',
      currentValue: 'Initial value',
      changeCount: 0,
      lastChangeTime: null,
      changeHistory: []
    }
  },
  methods: {
    handleChange(event) {
      this.changeCount++;
      this.lastChangeTime = new Date().toLocaleTimeString();
      
      this.changeHistory.unshift({
        time: this.lastChangeTime,
        from: this.originalValue,
        to: event.target.value
      });
      
      this.originalValue = event.target.value;
      
      if (this.changeHistory.length > 5) {
        this.changeHistory = this.changeHistory.slice(0, 5);
      }
    },
    handleBlur(event) {
      console.log('TextArea blurred with value:', event.target.value);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.change-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.change-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.change-info {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 15px;
}

.change-info p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.change-info p:last-child {
  margin-bottom: 0;
}

.change-history {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.change-history ol {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.change-history li {
  margin-bottom: 4px;
  line-height: 1.4;
}

.change-time {
  color: #0078d4;
  font-weight: bold;
  font-family: monospace;
}
</style>
```

---

## Focus Events

Focus and blur event handling:

```vue
<template>
  <div class="focus-events">
    <h4>Focus Events</h4>

    <div class="form-group">
      <label>Field 1:</label>
      <textarea
        v-model="field1"
        @focus="handleFocus('Field 1', $event)"
        @blur="handleBlur('Field 1', $event)"
        rows="2"
        class="focus-textarea"
        placeholder="Focus to see event">
      </textarea>
    </div>

    <div class="form-group">
      <label>Field 2:</label>
      <textarea
        v-model="field2"
        @focus="handleFocus('Field 2', $event)"
        @blur="handleBlur('Field 2', $event)"
        rows="2"
        class="focus-textarea"
        placeholder="Focus to see event">
      </textarea>
    </div>

    <div class="form-group">
      <label>Field 3:</label>
      <textarea
        v-model="field3"
        @focus="handleFocus('Field 3', $event)"
        @blur="handleBlur('Field 3', $event)"
        rows="2"
        class="focus-textarea"
        placeholder="Focus to see event">
      </textarea>
    </div>

    <div class="focus-status">
      <p>Currently Focused: <strong>{{ focusedField || 'None' }}</strong></p>
      <p>Total Focus Events: <strong>{{ focusCount }}</strong></p>
      <p>Total Blur Events: <strong>{{ blurCount }}</strong></p>
    </div>

    <div class="focus-log">
      <h5>Event Log:</h5>
      <ul>
        <li v-for="(log, index) in eventLog" :key="index" :class="log.type">
          <span class="log-type">{{ log.type.toUpperCase() }}</span>
          <span class="log-field">{{ log.field }}</span>
          <span class="log-time">{{ log.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFocusEvents',
  data() {
    return {
      field1: '',
      field2: '',
      field3: '',
      focusedField: '',
      focusCount: 0,
      blurCount: 0,
      eventLog: []
    }
  },
  methods: {
    handleFocus(field, event) {
      this.focusedField = field;
      this.focusCount++;
      this.addLog('focus', field);
    },
    handleBlur(field, event) {
      this.focusedField = '';
      this.blurCount++;
      this.addLog('blur', field);
    },
    addLog(type, field) {
      this.eventLog.unshift({
        type,
        field,
        time: new Date().toLocaleTimeString()
      });
      if (this.eventLog.length > 8) {
        this.eventLog = this.eventLog.slice(0, 8);
      }
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.form-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 13px;
}

.focus-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.focus-textarea:focus {
  outline: none;
  border-color: #0078d4;
  background: #f0f7ff;
}

.focus-status {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 12px;
}

.focus-status p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.focus-status p:last-child {
  margin-bottom: 0;
}

.focus-log {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.focus-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.focus-log li {
  padding: 4px 8px;
  font-size: 12px;
  display: flex;
  gap: 10px;
  margin-bottom: 3px;
  border-radius: 3px;
}

.focus-log li.focus {
  background: #d4edda;
}

.focus-log li.blur {
  background: #f8d7da;
}

.log-type {
  font-weight: bold;
  min-width: 50px;
}

.log-field {
  color: #0078d4;
  font-weight: bold;
  min-width: 70px;
}

.log-time {
  color: #666;
  font-family: monospace;
  margin-left: auto;
}
</style>
```

---

## Examples

### Complete Events Demo

```vue
<template>
  <div class="events-complete">
    <h3>TextArea Events</h3>

    <div class="demo-section">
      <h4>Comprehensive Event Tracking</h4>

      <div class="form-group">
        <label for="event-tracker">Type, focus, or change this field:</label>
        <textarea
          id="event-tracker"
          v-model="text"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
          @keyup="onKeyup"
          @select="onSelect"
          @click="onClick"
          rows="6"
          class="event-textarea"
          placeholder="Interact with this textarea to see all events">
        </textarea>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Input</div>
          <div class="stat-value">{{ stats.input }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Change</div>
          <div class="stat-value">{{ stats.change }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Focus</div>
          <div class="stat-value">{{ stats.focus }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Blur</div>
          <div class="stat-value">{{ stats.blur }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Keydown</div>
          <div class="stat-value">{{ stats.keydown }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Keyup</div>
          <div class="stat-value">{{ stats.keyup }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Select</div>
          <div class="stat-value">{{ stats.select }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Click</div>
          <div class="stat-value">{{ stats.click }}</div>
        </div>
      </div>

      <div class="event-stream">
        <h5>Event Stream:</h5>
        <div class="stream-controls">
          <button @click="clearStream" class="btn-clear">Clear</button>
          <label>
            <input type="checkbox" v-model="autoScroll"> Auto-scroll
          </label>
        </div>
        <div ref="streamRef" class="stream-content">
          <div v-for="(event, index) in eventStream" :key="index" :class="['event-item', event.type]">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-name">{{ event.type }}</span>
            <span class="event-data">{{ event.data }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaEventsComplete',
  data() {
    return {
      text: '',
      stats: {
        input: 0, change: 0, focus: 0, blur: 0,
        keydown: 0, keyup: 0, select: 0, click: 0
      },
      eventStream: [],
      autoScroll: true
    }
  },
  methods: {
    onInput(e) { this.trackEvent('input', `Length: ${e.target.value.length}`); },
    onChange(e) { this.trackEvent('change', `New: "${e.target.value.substring(0, 30)}..."`); },
    onFocus() { this.trackEvent('focus', 'Gained focus'); },
    onBlur() { this.trackEvent('blur', 'Lost focus'); },
    onKeydown(e) { this.trackEvent('keydown', `Key: ${e.key}`); },
    onKeyup(e) { this.trackEvent('keyup', `Key: ${e.key}`); },
    onSelect(e) { 
      const len = e.target.selectionEnd - e.target.selectionStart;
      this.trackEvent('select', `Selected ${len} chars`); 
    },
    onClick(e) { this.trackEvent('click', `Position: ${e.target.selectionStart}`); },
    trackEvent(type, data) {
      this.stats[type]++;
      this.eventStream.push({
        time: new Date().toLocaleTimeString(),
        type,
        data
      });
      
      if (this.eventStream.length > 50) {
        this.eventStream = this.eventStream.slice(-50);
      }
      
      if (this.autoScroll) {
        this.$nextTick(() => {
          const stream = this.$refs.streamRef;
          if (stream) stream.scrollTop = stream.scrollHeight;
        });
      }
    },
    clearStream() {
      this.eventStream = [];
    }
  }
}
</script>

<style scoped>
.events-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 6px;
}

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.demo-section {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.event-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.event-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}

.stat-card {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #0078d4;
}

.event-stream {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.stream-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.btn-clear {
  padding: 4px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.stream-controls label {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  font-size: 12px;
}

.stream-content {
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 3px;
}

.event-item {
  padding: 6px 10px;
  font-size: 12px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.event-item.input { background: #e3f2fd; }
.event-item.change { background: #fff3cd; }
.event-item.focus { background: #d4edda; }
.event-item.blur { background: #f8d7da; }
.event-item.keydown { background: #f3e5f5; }
.event-item.keyup { background: #fce4ec; }
.event-item.select { background: #e0f7fa; }
.event-item.click { background: #f5f5f5; }

.event-time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.event-name {
  font-weight: bold;
  min-width: 70px;
}

.event-data {
  color: #333;
  flex: 1;
}
</style>
```
