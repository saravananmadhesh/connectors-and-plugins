# Value and Content — Syncfusion Vue TextArea

## Table of Contents
- [Setting Values](#setting-values)
- [Reading Values](#reading-values)
- [Two-Way Binding](#two-way-binding)
- [Examples](#examples)

---

## Setting Values

Set values using the `value` prop or v-model:

```vue
<template>
  <div class="value-content">
    <fieldset>
      <legend>Value and Content Management</legend>

      <div class="form-group">
        <label for="initial-value">Initial Value (prop binding):</label>
        <textarea
          id="initial-value"
          :value="initialContent"
          @input="initialContent = $event.target.value"
          rows="3"
          placeholder="Initial content">
        </textarea>
      </div>

      <div class="form-group">
        <label for="v-model-value">v-model Two-Way Binding:</label>
        <textarea
          id="v-model-value"
          v-model="vModelContent"
          rows="3"
          placeholder="v-model content">
        </textarea>
        <p class="info">Current value: {{ vModelContent }}</p>
      </div>

      <div class="form-group">
        <label for="default-content">Default Content:</label>
        <textarea
          id="default-content"
          v-model="defaultContent"
          rows="4"
          placeholder="Will be initialized">
        </textarea>
        <button @click="resetToDefault" class="btn-secondary">Reset to Default</button>
      </div>

      <div class="form-group">
        <label for="programmatic">Programmatic Value Setting:</label>
        <textarea
          id="programmatic"
          ref="programmaticRef"
          rows="3"
          placeholder="Set via method">
        </textarea>
        <div class="button-group">
          <button @click="setHello" class="btn-primary">Set "Hello World"</button>
          <button @click="appendText" class="btn-secondary">Append Text</button>
          <button @click="clearContent" class="btn-danger">Clear</button>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaValueContent',
  data() {
    return {
      initialContent: 'This is the initial content set via prop binding.',
      vModelContent: '',
      defaultContent: 'This is the default content. It will be restored when you click reset.',
      programmaticText: ''
    }
  },
  methods: {
    setHello() {
      const textarea = this.$refs.programmaticRef;
      if (textarea) {
        textarea.value = 'Hello, World!';
        this.programmaticText = 'Hello, World!';
      }
    },
    appendText() {
      const textarea = this.$refs.programmaticRef;
      if (textarea) {
        textarea.value += '\n\nAppended: ' + new Date().toLocaleTimeString();
        this.programmaticText = textarea.value;
      }
    },
    clearContent() {
      const textarea = this.$refs.programmaticRef;
      if (textarea) {
        textarea.value = '';
        this.programmaticText = '';
      }
    },
    resetToDefault() {
      this.defaultContent = 'This is the default content. It will be restored when you click reset.';
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
  margin-bottom: 20px;
}

.form-group:last-child {
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
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.info {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.85;
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
</style>
```

---

## Reading Values

Get the current value from textarea:

```vue
<template>
  <div class="read-value">
    <fieldset>
      <legend>Reading Values</legend>

      <div class="form-group">
        <label for="read-input">Type something:</label>
        <textarea
          id="read-input"
          ref="readRef"
          v-model="text"
          rows="4"
          placeholder="Start typing...">
        </textarea>
      </div>

      <div class="button-group">
        <button @click="getValue" class="btn-primary">Get Value</button>
        <button @click="getLength" class="btn-secondary">Get Length</button>
        <button @click="getSelection" class="btn-secondary">Get Selection</button>
        <button @click="logValue" class="btn-secondary">Log to Console</button>
      </div>

      <div class="output-panel">
        <h5>Output:</h5>
        <pre>{{ output }}</pre>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaReadValue',
  data() {
    return {
      text: '',
      output: 'Click a button to read the textarea value.'
    }
  },
  methods: {
    getValue() {
      const value = this.$refs.readRef.value;
      this.output = `Value: "${value}"`;
    },
    getLength() {
      const length = this.$refs.readRef.value.length;
      this.output = `Length: ${length} characters`;
    },
    getSelection() {
      const start = this.$refs.readRef.selectionStart;
      const end = this.$refs.readRef.selectionEnd;
      const selected = this.$refs.readRef.value.substring(start, end);
      this.output = `Selection: start=${start}, end=${end}, text="${selected}"`;
    },
    logValue() {
      console.log('Textarea value:', this.$refs.readRef.value);
      this.output = 'Value logged to console (open DevTools to view).';
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

.button-group {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
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

.output-panel {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.output-panel h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
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

## Two-Way Binding

Comprehensive two-way binding patterns:

```vue
<template>
  <div class="binding-patterns">
    <h4>Two-Way Binding Patterns</h4>

    <div class="pattern-section">
      <h5>Pattern 1: v-model (Recommended)</h5>
      <textarea v-model="pattern1" rows="2" placeholder="Pattern 1"></textarea>
      <p>Bound: {{ pattern1 }}</p>
    </div>

    <div class="pattern-section">
      <h5>Pattern 2: .lazy Modifier</h5>
      <textarea v-model.lazy="pattern2" rows="2" placeholder="Updates on change"></textarea>
      <p>Bound: {{ pattern2 }}</p>
    </div>

    <div class="pattern-section">
      <h5>Pattern 3: Object Property Binding</h5>
      <textarea v-model="user.bio" rows="2" placeholder="Bio"></textarea>
      <p>User: {{ JSON.stringify(user) }}</p>
    </div>

    <div class="pattern-section">
      <h5>Pattern 4: Computed Get/Set</h5>
      <textarea :value="upperText" @input="upperText = $event.target.value.toUpperCase()" rows="2" placeholder="Auto-uppercase"></textarea>
      <p>Value (uppercased): {{ upperText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaBinding',
  data() {
    return {
      pattern1: '',
      pattern2: '',
      user: { name: 'Alice', bio: '' },
      upperText: ''
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

.pattern-section {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 8px;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

p {
  margin: 0;
  font-size: 12px;
  color: #666;
  word-break: break-all;
}
</style>
```

---

## Examples

### Complete Value and Content Management Demo

```vue
<template>
  <div class="value-content-complete">
    <h3>Value and Content Management</h3>

    <div class="editor-container">
      <div class="editor-toolbar">
        <button @click="newDocument" class="btn-new">New</button>
        <button @click="saveDocument" class="btn-save">Save</button>
        <button @click="loadDocument" class="btn-load">Load</button>
        <button @click="exportText" class="btn-export">Export</button>
        <span class="char-info">
          {{ document.content.length }} chars, 
          {{ wordCount }} words
        </span>
      </div>

      <textarea
        v-model="document.content"
        @input="markUnsaved"
        class="document-editor"
        placeholder="Start writing your document...">
      </textarea>

      <div class="status-bar">
        <span :class="['status', document.saved ? 'saved' : 'unsaved']">
          {{ document.saved ? '✓ Saved' : '● Unsaved changes' }}
        </span>
        <span class="last-saved">
          Last saved: {{ lastSavedTime }}
        </span>
      </div>
    </div>

    <div class="templates-section">
      <h4>Quick Templates</h4>
      <div class="template-buttons">
        <button @click="loadTemplate('meeting')">Meeting Notes</button>
        <button @click="loadTemplate('email')">Email Draft</button>
        <button @click="loadTemplate('report')">Report Template</button>
        <button @click="loadTemplate('list')">To-Do List</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaValueContentComplete',
  data() {
    return {
      document: {
        content: '',
        saved: true
      },
      lastSavedTime: 'Never',
      saveTimer: null
    }
  },
  computed: {
    wordCount() {
      return this.document.content.trim().split(/\s+/).filter(w => w).length;
    }
  },
  methods: {
    newDocument() {
      if (!this.document.saved && !confirm('Discard unsaved changes?')) return;
      this.document = { content: '', saved: true };
      this.lastSavedTime = 'Never';
    },
    saveDocument() {
      console.log('Saving document:', this.document.content);
      this.document.saved = true;
      this.lastSavedTime = new Date().toLocaleTimeString();
    },
    loadDocument() {
      const saved = localStorage.getItem('demo-document');
      if (saved) {
        this.document = { content: saved, saved: true };
        this.lastSavedTime = new Date().toLocaleTimeString();
      }
    },
    exportText() {
      const blob = new Blob([this.document.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.txt';
      link.click();
      URL.revokeObjectURL(url);
    },
    markUnsaved() {
      this.document.saved = false;
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => {
        localStorage.setItem('demo-document', this.document.content);
        this.saveDocument();
      }, 2000);
    },
    loadTemplate(type) {
      const templates = {
        meeting: 'Meeting Notes\n\nDate: \nAttendees: \n\nAgenda:\n1. \n2. \n3. \n\nNotes:\n\n\nAction Items:\n- ',
        email: 'Subject: \n\nDear ,\n\n\n\nBest regards,\n',
        report: 'Report Title\n\nExecutive Summary:\n\n\nFindings:\n\n\nRecommendations:\n\n\n',
        list: 'To-Do List\n\n[ ] Task 1\n[ ] Task 2\n[ ] Task 3\n\nCompleted:\n[x] '
      };
      this.document.content = templates[type] || '';
      this.markUnsaved();
    }
  },
  beforeUnmount() {
    clearTimeout(this.saveTimer);
  }
}
</script>

<style scoped>
.value-content-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 20px 0 10px 0;
}

.editor-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.editor-toolbar button {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.btn-new {
  background: #6c757d;
  color: white;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-load {
  background: #17a2b8;
  color: white;
}

.btn-export {
  background: #0078d4;
  color: white;
}

.char-info {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.document-editor {
  width: 100%;
  min-height: 300px;
  padding: 15px;
  border: none;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
}

.document-editor:focus {
  outline: none;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  font-size: 12px;
}

.status.saved {
  color: #28a745;
  font-weight: bold;
}

.status.unsaved {
  color: #ffc107;
  font-weight: bold;
}

.last-saved {
  color: #666;
}

.templates-section {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.template-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.template-buttons button {
  padding: 8px 14px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.template-buttons button:hover {
  background: #e0e0e0;
}
</style>
```
