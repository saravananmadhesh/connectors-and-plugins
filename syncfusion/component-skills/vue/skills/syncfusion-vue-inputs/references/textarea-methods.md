# Methods — Syncfusion Vue TextArea

## Table of Contents
- [Focus Methods](#focus-methods)
- [Value Methods](#value-methods)
- [Selection Methods](#selection-methods)
- [Examples](#examples)

---

## Focus Methods

Control focus programmatically:

```vue
<template>
  <div class="focus-methods">
    <fieldset>
      <legend>Focus Methods</legend>

      <div class="form-group">
        <label for="focus-input">Test Field:</label>
        <textarea
          id="focus-input"
          ref="focusRef"
          v-model="text"
          rows="3"
          placeholder="This field can be focused/blurred programmatically">
        </textarea>
      </div>

      <div class="button-group">
        <button @click="focusField" class="btn-primary">Focus</button>
        <button @click="blurField" class="btn-secondary">Blur</button>
        <button @click="selectAll" class="btn-secondary">Select All</button>
        <button @click="checkFocus" class="btn-secondary">Check Focus</button>
      </div>

      <div class="status">
        <p>Status: <span :class="['status-badge', isFocused ? 'focused' : 'blurred']">
          {{ isFocused ? 'Focused' : 'Not Focused' }}
        </span></p>
        <p>Has selection: <strong>{{ hasSelection ? 'Yes' : 'No' }}</strong></p>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFocusMethods',
  data() {
    return {
      text: 'This is sample text. Click focus methods to see them in action.',
      isFocused: false,
      hasSelection: false
    }
  },
  mounted() {
    this.checkFocusInterval = setInterval(this.checkFocus, 200);
  },
  beforeUnmount() {
    clearInterval(this.checkFocusInterval);
  },
  methods: {
    focusField() {
      const textarea = this.$refs.focusRef;
      if (textarea) {
        textarea.focus();
      }
    },
    blurField() {
      const textarea = this.$refs.focusRef;
      if (textarea) {
        textarea.blur();
      }
    },
    selectAll() {
      const textarea = this.$refs.focusRef;
      if (textarea) {
        textarea.focus();
        textarea.select();
      }
    },
    checkFocus() {
      const textarea = this.$refs.focusRef;
      if (textarea) {
        this.isFocused = document.activeElement === textarea;
        this.hasSelection = textarea.selectionEnd > textarea.selectionStart;
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

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.btn-primary {
  background: #0078d4;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

button:hover {
  opacity: 0.85;
}

.status {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.status p {
  margin: 0 0 6px 0;
  font-size: 13px;
}

.status p:last-child {
  margin-bottom: 0;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 3px;
  font-weight: bold;
  font-size: 12px;
}

.status-badge.focused {
  background: #28a745;
  color: white;
}

.status-badge.blurred {
  background: #6c757d;
  color: white;
}
</style>
```

---

## Value Methods

Get and set values programmatically:

```vue
<template>
  <div class="value-methods">
    <h4>Value Methods</h4>

    <div class="form-group">
      <label>Test TextArea:</label>
      <textarea
        ref="valueRef"
        v-model="text"
        rows="3"
        class="value-textarea"
        placeholder="Value can be set/get programmatically">
      </textarea>
    </div>

    <div class="button-group">
      <button @click="getCurrentValue" class="btn-primary">Get Value</button>
      <button @click="setValueHello" class="btn-secondary">Set "Hello"</button>
      <button @click="setValueTimestamp" class="btn-secondary">Set Timestamp</button>
      <button @click="clearValue" class="btn-danger">Clear</button>
      <button @click="appendText" class="btn-secondary">Append</button>
    </div>

    <div class="output-panel">
      <h5>Last Operation Result:</h5>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaValueMethods',
  data() {
    return {
      text: 'Initial value',
      result: 'Click a button to perform a value operation.'
    }
  },
  methods: {
    getCurrentValue() {
      const value = this.$refs.valueRef.value;
      this.result = `GET Value: "${value}" (length: ${value.length})`;
    },
    setValueHello() {
      const textarea = this.$refs.valueRef;
      textarea.value = 'Hello, World!';
      this.text = 'Hello, World!';
      this.result = 'SET Value: "Hello, World!"';
    },
    setValueTimestamp() {
      const textarea = this.$refs.valueRef;
      const timestamp = new Date().toISOString();
      textarea.value = `Timestamp: ${timestamp}`;
      this.text = `Timestamp: ${timestamp}`;
      this.result = `SET Value with timestamp: ${timestamp}`;
    },
    clearValue() {
      const textarea = this.$refs.valueRef;
      textarea.value = '';
      this.text = '';
      this.result = 'CLEARED Value';
    },
    appendText() {
      const textarea = this.$refs.valueRef;
      const newText = textarea.value + '\nAppended: ' + new Date().toLocaleTimeString();
      textarea.value = newText;
      this.text = newText;
      this.result = 'APPENDED text to current value';
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
}

.value-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.value-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.btn-primary {
  background: #0078d4;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

button:hover {
  opacity: 0.85;
}

.output-panel {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

pre {
  margin: 0;
  padding: 10px;
  background: white;
  border-radius: 3px;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
```

---

## Selection Methods

Manage text selection in textarea:

```vue
<template>
  <div class="selection-methods">
    <h4>Selection Methods</h4>

    <div class="form-group">
      <label>Sample Text:</label>
      <textarea
        ref="selectionRef"
        v-model="text"
        rows="5"
        class="selection-textarea"
        @select="updateSelectionInfo"
        @click="updateSelectionInfo"
        @keyup="updateSelectionInfo"
        placeholder="Select text to see selection info">
      </textarea>
    </div>

    <div class="button-group">
      <button @click="selectAllText" class="btn-primary">Select All</button>
      <button @click="selectFirstLine" class="btn-secondary">Select First Line</button>
      <button @click="selectLastWord" class="btn-secondary">Select Last Word</button>
      <button @click="setCursorStart" class="btn-secondary">Cursor to Start</button>
      <button @click="setCursorEnd" class="btn-secondary">Cursor to End</button>
      <button @click="getSelectedText" class="btn-primary">Get Selected</button>
    </div>

    <div class="selection-info">
      <h5>Selection Information:</h5>
      <p>Start: <strong>{{ selectionInfo.start }}</strong></p>
      <p>End: <strong>{{ selectionInfo.end }}</strong></p>
      <p>Length: <strong>{{ selectionInfo.length }}</strong></p>
      <p>Text: <strong>"{{ selectionInfo.text }}"</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaSelectionMethods',
  data() {
    return {
      text: 'The quick brown fox jumps over the lazy dog.\nThis is line two of the sample text.\nThird line ends here.',
      selectionInfo: {
        start: 0,
        end: 0,
        length: 0,
        text: ''
      }
    }
  },
  methods: {
    updateSelectionInfo() {
      const textarea = this.$refs.selectionRef;
      if (textarea) {
        this.selectionInfo.start = textarea.selectionStart;
        this.selectionInfo.end = textarea.selectionEnd;
        this.selectionInfo.length = textarea.selectionEnd - textarea.selectionStart;
        this.selectionInfo.text = textarea.value.substring(
          textarea.selectionStart,
          textarea.selectionEnd
        );
      }
    },
    selectAllText() {
      const textarea = this.$refs.selectionRef;
      textarea.focus();
      textarea.select();
      this.updateSelectionInfo();
    },
    selectFirstLine() {
      const textarea = this.$refs.selectionRef;
      const firstLineEnd = this.text.indexOf('\n');
      textarea.focus();
      textarea.setSelectionRange(0, firstLineEnd > 0 ? firstLineEnd : this.text.length);
      this.updateSelectionInfo();
    },
    selectLastWord() {
      const textarea = this.$refs.selectionRef;
      const lastSpace = this.text.lastIndexOf(' ');
      const start = lastSpace >= 0 ? lastSpace + 1 : 0;
      textarea.focus();
      textarea.setSelectionRange(start, this.text.length);
      this.updateSelectionInfo();
    },
    setCursorStart() {
      const textarea = this.$refs.selectionRef;
      textarea.focus();
      textarea.setSelectionRange(0, 0);
      this.updateSelectionInfo();
    },
    setCursorEnd() {
      const textarea = this.$refs.selectionRef;
      textarea.focus();
      const len = textarea.value.length;
      textarea.setSelectionRange(len, len);
      this.updateSelectionInfo();
    },
    getSelectedText() {
      this.updateSelectionInfo();
      alert(`Selected text: "${this.selectionInfo.text}"`);
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
}

.selection-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.selection-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.btn-primary {
  background: #0078d4;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

button:hover {
  opacity: 0.85;
}

.selection-info {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.selection-info p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.selection-info p:last-child {
  margin-bottom: 0;
}
</style>
```

---

## Examples

### Complete Methods Demo

```vue
<template>
  <div class="methods-complete">
    <h3>TextArea Methods</h3>

    <div class="editor-section">
      <h4>Multi-Action Text Editor</h4>

      <div class="toolbar">
        <button @click="execAction('focus')" class="btn-action">Focus</button>
        <button @click="execAction('blur')" class="btn-action">Blur</button>
        <button @click="execAction('selectAll')" class="btn-action">Select All</button>
        <button @click="execAction('copy')" class="btn-action">Copy</button>
        <button @click="execAction('cut')" class="btn-action">Cut</button>
        <button @click="execAction('getValue')" class="btn-action">Get Value</button>
        <button @click="execAction('setValue')" class="btn-action">Set Value</button>
        <button @click="execAction('clear')" class="btn-danger">Clear</button>
      </div>

      <textarea
        ref="editorRef"
        v-model="editorText"
        rows="8"
        class="editor-textarea"
        placeholder="Use the toolbar buttons to manipulate this textarea">
      </textarea>

      <div class="action-log">
        <h5>Action Log:</h5>
        <ul>
          <li v-for="(log, index) in actionLog" :key="index">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-action">{{ log.action }}</span>
            <span class="log-result">{{ log.result }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaMethodsComplete',
  data() {
    return {
      editorText: 'Welcome to the TextArea methods demo. Try the actions above!',
      actionLog: []
    }
  },
  methods: {
    execAction(action) {
      const textarea = this.$refs.editorRef;
      let result = '';
      
      switch(action) {
        case 'focus':
          textarea.focus();
          result = 'Focused';
          break;
        case 'blur':
          textarea.blur();
          result = 'Blurred';
          break;
        case 'selectAll':
          textarea.focus();
          textarea.select();
          result = `Selected ${textarea.selectionEnd - textarea.selectionStart} chars`;
          break;
        case 'copy':
          try {
            textarea.select();
            document.execCommand('copy');
            result = 'Copied to clipboard';
          } catch(e) {
            result = 'Copy failed';
          }
          break;
        case 'cut':
          try {
            textarea.select();
            document.execCommand('cut');
            result = 'Cut to clipboard';
          } catch(e) {
            result = 'Cut failed';
          }
          break;
        case 'getValue':
          result = `Value: "${textarea.value}"`;
          break;
        case 'setValue':
          textarea.value = `Reset at ${new Date().toLocaleTimeString()}`;
          this.editorText = textarea.value;
          result = 'Value set to current time';
          break;
        case 'clear':
          textarea.value = '';
          this.editorText = '';
          result = 'Cleared';
          break;
      }
      
      this.logAction(action, result);
    },
    logAction(action, result) {
      this.actionLog.unshift({
        time: new Date().toLocaleTimeString(),
        action,
        result
      });
      if (this.actionLog.length > 10) {
        this.actionLog = this.actionLog.slice(0, 10);
      }
    }
  }
}
</script>

<style scoped>
.methods-complete {
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

.editor-section {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.toolbar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.btn-action {
  background: #0078d4;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

button:hover {
  opacity: 0.85;
}

.editor-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
}

.editor-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.action-log {
  margin-top: 15px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.action-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.action-log li {
  padding: 6px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  display: flex;
  gap: 10px;
}

.action-log li:last-child {
  border-bottom: none;
}

.log-time {
  color: #999;
  font-family: monospace;
}

.log-action {
  color: #0078d4;
  font-weight: bold;
  min-width: 80px;
}

.log-result {
  color: #333;
  flex: 1;
}
</style>
```
