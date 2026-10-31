# Resize Behavior — Syncfusion Vue TextArea

## Table of Contents
- [Resize Modes](#resize-modes)
- [Manual Resize](#manual-resize)
- [Auto-Resize](#auto-resize)
- [Examples](#examples)

---

## Resize Modes

Control how users can resize the textarea:

```vue
<template>
  <div class="resize-modes">
    <fieldset>
      <legend>Resize Modes</legend>

      <div class="form-group">
        <label for="resize-vertical">Vertical Resize Only:</label>
        <textarea
          id="resize-vertical"
          v-model="verticalText"
          rows="3"
          class="resize-vertical"
          placeholder="Drag bottom-right corner vertically only">
        </textarea>
      </div>

      <div class="form-group">
        <label for="resize-horizontal">Horizontal Resize Only:</label>
        <textarea
          id="resize-horizontal"
          v-model="horizontalText"
          rows="3"
          class="resize-horizontal"
          placeholder="Drag horizontally only">
        </textarea>
      </div>

      <div class="form-group">
        <label for="resize-both">Both Directions:</label>
        <textarea
          id="resize-both"
          v-model="bothText"
          rows="3"
          class="resize-both"
          placeholder="Drag in any direction">
        </textarea>
      </div>

      <div class="form-group">
        <label for="resize-none">No Resize (Fixed):</label>
        <textarea
          id="resize-none"
          v-model="noneText"
          rows="3"
          class="resize-none"
          placeholder="Cannot be resized">
        </textarea>
      </div>

      <div class="form-group">
        <label for="resize-auto">Auto-Resize:</label>
        <textarea
          id="resize-auto"
          v-model="autoText"
          rows="2"
          class="resize-auto"
          placeholder="Grows with content">
        </textarea>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaResizeModes',
  data() {
    return {
      verticalText: '',
      horizontalText: '',
      bothText: '',
      noneText: '',
      autoText: ''
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

.form-group:last-child {
  margin-bottom: 0;
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
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.resize-vertical {
  resize: vertical;
  min-height: 60px;
}

.resize-horizontal {
  resize: horizontal;
  min-width: 200px;
}

.resize-both {
  resize: both;
  min-width: 200px;
  min-height: 60px;
}

.resize-none {
  resize: none;
  height: 80px;
}

.resize-auto {
  resize: none;
  overflow: hidden;
  min-height: 50px;
}
</style>
```

---

## Manual Resize

Manual height adjustment:

```vue
<template>
  <div class="manual-resize">
    <h4>Manual Resize Controls</h4>

    <div class="form-group">
      <label>Current Height: <span class="value">{{ currentHeight }}px</span></label>
      <input
        type="range"
        v-model.number="currentHeight"
        min="50"
        max="400"
        step="10">
    </div>

    <div class="form-group">
      <label>Current Width: <span class="value">{{ currentWidth }}%</span></label>
      <input
        type="range"
        v-model.number="currentWidth"
        min="20"
        max="100"
        step="5">
    </div>

    <div class="preview">
      <textarea
        v-model="text"
        :style="{
          height: currentHeight + 'px',
          width: currentWidth + '%'
        }"
        class="manual-resize-textarea"
        placeholder="Adjust the sliders to resize">
      </textarea>
    </div>

    <div class="button-group">
      <button @click="resetSize" class="btn-secondary">Reset Size</button>
      <button @click="expandSize" class="btn-primary">Expand</button>
      <button @click="shrinkSize" class="btn-secondary">Shrink</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaManualResize',
  data() {
    return {
      currentHeight: 150,
      currentWidth: 100,
      text: 'This textarea can be manually resized using the controls above.'
    }
  },
  methods: {
    resetSize() {
      this.currentHeight = 150;
      this.currentWidth = 100;
    },
    expandSize() {
      this.currentHeight = Math.min(400, this.currentHeight + 50);
      this.currentWidth = 100;
    },
    shrinkSize() {
      this.currentHeight = Math.max(50, this.currentHeight - 50);
      this.currentWidth = Math.max(30, this.currentWidth - 10);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.value {
  color: #0078d4;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
}

.preview {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.manual-resize-textarea {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
}

.manual-resize-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.button-group {
  display: flex;
  gap: 8px;
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
</style>
```

---

## Auto-Resize

Textarea that grows with content:

```vue
<template>
  <div class="auto-resize">
    <h4>Auto-Resize TextAreas</h4>

    <div class="form-group">
      <label for="auto-basic">Basic Auto-Resize:</label>
      <textarea
        id="auto-basic"
        v-model="basicText"
        ref="basicRef"
        @input="autoResize($event)"
        rows="2"
        class="auto-grow"
        placeholder="Type to see it grow">
      </textarea>
    </div>

    <div class="form-group">
      <label for="auto-max">Auto-Resize with Max Height:</label>
      <textarea
        id="auto-max"
        v-model="maxText"
        ref="maxRef"
        @input="autoResizeMax($event)"
        rows="2"
        class="auto-grow-max"
        placeholder="Grows up to 200px max">
      </textarea>
    </div>

    <div class="form-group">
      <label for="auto-min">Auto-Resize with Min Height:</label>
      <textarea
        id="auto-min"
        v-model="minText"
        ref="minRef"
        @input="autoResizeMin($event)"
        rows="2"
        class="auto-grow-min"
        placeholder="Min 100px, grows with content">
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaAutoResize',
  data() {
    return {
      basicText: '',
      maxText: '',
      minText: ''
    }
  },
  methods: {
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    },
    autoResizeMax(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = newHeight + 'px';
    },
    autoResizeMin(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      const newHeight = Math.max(100, textarea.scrollHeight);
      textarea.style.height = newHeight + 'px';
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.form-group {
  margin-bottom: 20px;
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
  resize: none;
  overflow: hidden;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.auto-grow {
  min-height: 50px;
}

.auto-grow-max {
  min-height: 50px;
  max-height: 200px;
  overflow-y: auto;
}

.auto-grow-min {
  min-height: 100px;
}
</style>
```

---

## Examples

### Complete Resize Demo

```vue
<template>
  <div class="resize-complete">
    <h3>TextArea Resize Behavior</h3>

    <div class="demo-section">
      <h4>Resize Mode Comparison</h4>

      <div class="resize-grid">
        <div class="resize-card">
          <h5>Vertical Only</h5>
          <textarea
            v-model="gridV"
            rows="3"
            class="demo-vertical"
            placeholder="Vertical resize">
          </textarea>
          <p class="caption">resize: vertical</p>
        </div>

        <div class="resize-card">
          <h5>Horizontal Only</h5>
          <textarea
            v-model="gridH"
            rows="3"
            class="demo-horizontal"
            placeholder="Horizontal resize">
          </textarea>
          <p class="caption">resize: horizontal</p>
        </div>

        <div class="resize-card">
          <h5>Both Directions</h5>
          <textarea
            v-model="gridB"
            rows="3"
            class="demo-both"
            placeholder="Both directions">
          </textarea>
          <p class="caption">resize: both</p>
        </div>

        <div class="resize-card">
          <h5>Fixed (No Resize)</h5>
          <textarea
            v-model="gridN"
            rows="3"
            class="demo-none"
            placeholder="No resize">
          </textarea>
          <p class="caption">resize: none</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Smart Auto-Resize Form</h4>

      <form @submit.prevent="submitForm" class="auto-resize-form">
        <div class="form-group">
          <label for="form-subject">Subject:</label>
          <input
            id="form-subject"
            v-model="form.subject"
            type="text"
            class="form-input"
            placeholder="Brief subject">
        </div>

        <div class="form-group">
          <label for="form-message">Message (auto-grows):</label>
          <textarea
            id="form-message"
            v-model="form.message"
            ref="messageRef"
            @input="autoGrow"
            rows="3"
            class="form-textarea"
            placeholder="Write your message...">
          </textarea>
          <p class="info">
            Height: {{ currentHeight }}px | 
            Content length: {{ form.message.length }} chars
          </p>
        </div>

        <button type="submit" :disabled="!form.message" class="btn-submit">
          Send Message
        </button>
      </form>
    </div>

    <div class="demo-section">
      <h4>Resize with Constraints</h4>

      <div class="constraint-demo">
        <div class="form-group">
          <label>Min Height (50-150px):</label>
          <input
            type="range"
            v-model.number="minH"
            min="50"
            max="150">
          <span class="value">{{ minH }}px</span>
        </div>

        <div class="form-group">
          <label>Max Height (200-500px):</label>
          <input
            type="range"
            v-model.number="maxH"
            min="200"
            max="500">
          <span class="value">{{ maxH }}px</span>
        </div>

        <textarea
          v-model="constrainedText"
          :style="{
            minHeight: minH + 'px',
            maxHeight: maxH + 'px'
          }"
          class="constrained-textarea"
          rows="4"
          placeholder="Respects min/max constraints">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaResizeComplete',
  data() {
    return {
      gridV: '',
      gridH: '',
      gridB: '',
      gridN: '',
      form: { subject: '', message: '' },
      currentHeight: 0,
      minH: 100,
      maxH: 300,
      constrainedText: ''
    }
  },
  methods: {
    autoGrow(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 400) + 'px';
      this.currentHeight = textarea.scrollHeight;
    },
    submitForm() {
      console.log('Form submitted:', this.form);
      alert('Message sent!');
      this.form = { subject: '', message: '' };
      this.currentHeight = 0;
    }
  }
}
</script>

<style scoped>
.resize-complete {
  padding: 20px;
  max-width: 1100px;
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
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.resize-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.resize-card {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 13px;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.demo-vertical {
  resize: vertical;
  min-height: 60px;
}

.demo-horizontal {
  resize: horizontal;
  min-width: 150px;
}

.demo-both {
  resize: both;
  min-width: 150px;
  min-height: 60px;
}

.demo-none {
  resize: none;
  height: 70px;
}

.caption {
  margin: 6px 0 0 0;
  font-size: 11px;
  color: #666;
  font-style: italic;
  text-align: center;
}

.auto-resize-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
}

.form-textarea {
  resize: none;
  overflow: hidden;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.info {
  margin: 6px 0 0 0;
  font-size: 11px;
  color: #666;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.constraint-demo {
  max-width: 600px;
}

.constraint-demo input[type="range"] {
  width: 100%;
  margin-top: 4px;
}

.value {
  display: inline-block;
  margin-left: 8px;
  color: #0078d4;
  font-weight: bold;
}

.constrained-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  margin-top: 15px;
}
</style>
```
