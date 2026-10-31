# Multiline TextBox — Syncfusion Vue TextBox

## Table of Contents
- [Multiline Configuration](#multiline-configuration)
- [Auto-Resize](#auto-resize)
- [Character Counting](#character-counting)
- [Examples](#examples)

---

## Multiline Configuration

Convert TextBox to multiline mode:

```vue
<template>
  <div class="multiline-config">
    <fieldset>
      <legend>Multiline TextBox</legend>

      <div class="form-group">
        <label>Multiline (using textarea):</label>
        <textarea
          v-model="multilineText"
          rows="4"
          class="text-area"
          placeholder="Type multiline content...">
        </textarea>
      </div>

      <div class="form-group">
        <label>With rows specified:</label>
        <textarea
          v-model="fixedRows"
          rows="3"
          class="text-area"
          placeholder="Fixed 3 rows">
        </textarea>
      </div>

      <div class="form-group">
        <label>With max length:</label>
        <textarea
          v-model="limitedText"
          rows="3"
          maxlength="200"
          class="text-area"
          placeholder="Max 200 characters">
        </textarea>
        <p class="counter">{{ limitedText.length }}/200</p>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextBoxMultiline',
  data() {
    return {
      multilineText: '',
      fixedRows: '',
      limitedText: ''
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
  margin-bottom: 6px;
  font-weight: bold;
}

.text-area {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.text-area:focus {
  outline: none;
  border-color: #0078d4;
}

.counter {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #666;
  text-align: right;
}
</style>
```

---

## Auto-Resize

Automatically resize textarea based on content:

```vue
<template>
  <div class="auto-resize">
    <h4>Auto-Resize TextBox</h4>

    <div class="form-group">
      <label>Type to see auto-resize:</label>
      <textarea
        v-model="autoText"
        ref="autoRef"
        @input="autoResize"
        rows="2"
        class="auto-textarea"
        placeholder="Start typing and watch the textarea grow...">
      </textarea>
    </div>

    <div class="info-box">
      <p>Current height: <strong>{{ currentHeight }}px</strong></p>
      <p>Lines: <strong>{{ lineCount }}</strong></p>
      <p>Characters: <strong>{{ autoText.length }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxAutoResize',
  data() {
    return {
      autoText: '',
      currentHeight: 0,
      lineCount: 1
    }
  },
  methods: {
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.currentHeight = textarea.scrollHeight;
      this.lineCount = this.autoText.split('\n').length;
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

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.auto-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  overflow: hidden;
  min-height: 50px;
}

.auto-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.info-box {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
}

.info-box p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.info-box p:last-child {
  margin-bottom: 0;
}
</style>
```

---

## Character Counting

Real-time character counting:

```vue
<template>
  <div class="char-counting">
    <h4>Character Counting</h4>

    <div class="form-group">
      <label>Description (300 max):</label>
      <textarea
        v-model="description"
        rows="4"
        maxlength="300"
        class="counting-textarea"
        placeholder="Write a description...">
      </textarea>
      <div class="counter-row">
        <p :class="['counter', counterClass]">
          {{ description.length }}/300
          <span v-if="isNearLimit" class="warning">⚠</span>
        </p>
        <p v-if="isAtLimit" class="error-text">Maximum reached!</p>
      </div>
    </div>

    <div class="form-group">
      <label>Comment (500 max with warning at 80%):</label>
      <textarea
        v-model="comment"
        rows="3"
        maxlength="500"
        class="counting-textarea"
        placeholder="Add your comment...">
      </textarea>
      <div class="counter-row">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: (comment.length / 500) * 100 + '%', background: progressColor }">
          </div>
        </div>
        <p class="counter">{{ comment.length }}/500</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxCharCounting',
  data() {
    return {
      description: '',
      comment: ''
    }
  },
  computed: {
    isNearLimit() {
      return this.description.length >= 250;
    },
    isAtLimit() {
      return this.description.length >= 300;
    },
    counterClass() {
      if (this.isAtLimit) return 'at-limit';
      if (this.isNearLimit) return 'near-limit';
      return '';
    },
    progressColor() {
      const pct = (this.comment.length / 500) * 100;
      if (pct >= 90) return '#dc3545';
      if (pct >= 80) return '#ffc107';
      return '#28a745';
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

.counting-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.counting-textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.counter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.counter {
  margin: 0;
  font-size: 12px;
  color: #666;
  font-weight: bold;
}

.counter.near-limit {
  color: #ffc107;
}

.counter.at-limit {
  color: #dc3545;
}

.warning {
  margin-left: 4px;
}

.error-text {
  margin: 0;
  font-size: 12px;
  color: #dc3545;
  font-weight: bold;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: all 0.2s;
}
</style>
```

---

## Examples

### Complete Multiline Demo

```vue
<template>
  <div class="multiline-complete">
    <h3>Multiline TextBox</h3>

    <div class="form-card">
      <h4>Feedback Form</h4>
      
      <div class="form-group">
        <label>Subject:</label>
        <input
          type="text"
          v-model="feedback.subject"
          class="text-input"
          placeholder="Brief subject">
      </div>

      <div class="form-group">
        <label>Category:</label>
        <select v-model="feedback.category" class="text-input">
          <option value="">Select category</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="general">General Feedback</option>
        </select>
      </div>

      <div class="form-group">
        <label>Your Feedback:</label>
        <textarea
          v-model="feedback.message"
          rows="6"
          maxlength="1000"
          class="text-input multiline"
          placeholder="Describe your feedback in detail...">
        </textarea>
        <p class="char-info">
          {{ feedback.message.length }}/1000 characters
        </p>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="feedback.anonymous">
          Submit anonymously
        </label>
      </div>

      <button
        @click="submitFeedback"
        :disabled="!isValid"
        class="btn-submit">
        Submit Feedback
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxMultilineComplete',
  data() {
    return {
      feedback: {
        subject: '',
        category: '',
        message: '',
        anonymous: false
      },
      submitted: false
    }
  },
  computed: {
    isValid() {
      return this.feedback.subject && this.feedback.category && 
             this.feedback.message.length >= 20;
    }
  },
  methods: {
    submitFeedback() {
      console.log('Feedback submitted:', this.feedback);
      this.submitted = true;
      setTimeout(() => {
        this.feedback = { subject: '', category: '', message: '', anonymous: false };
        this.submitted = false;
      }, 2000);
    }
  }
}
</script>

<style scoped>
.multiline-complete {
  padding: 20px;
  max-width: 700px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 6px;
}

.form-card {
  padding: 25px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

label input[type="checkbox"] {
  margin-right: 6px;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
}

.text-input:focus {
  outline: none;
  border-color: #0078d4;
}

.multiline {
  resize: vertical;
  min-height: 100px;
}

.char-info {
  margin: 6px 0 0 0;
  font-size: 12px;
  color: #666;
  text-align: right;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.btn-submit:hover:not(:disabled) {
  background: #106ebe;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```
