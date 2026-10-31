# Adornments — Syncfusion Vue TextArea

## Table of Contents
- [Prefix and Suffix](#prefix-and-suffix)
- [Icon Adornments](#icon-adornments)
- [Button Adornments](#button-adornments)
- [Examples](#examples)

---

## Prefix and Suffix

Add prefix and suffix content:

```vue
<template>
  <div class="adornments-demo">
    <fieldset>
      <legend>TextArea with Prefix/Suffix</legend>

      <div class="example">
        <label for="prefix-ta">With Prefix:</label>
        <div class="input-wrapper">
          <span class="prefix">$</span>
          <textarea
            id="prefix-ta"
            class="e-textarea"
            placeholder="Enter amount"
            rows="3">
          </textarea>
        </div>
      </div>

      <div class="example">
        <label for="suffix-ta">With Suffix:</label>
        <div class="input-wrapper">
          <textarea
            id="suffix-ta"
            class="e-textarea"
            placeholder="Enter text"
            rows="3">
          </textarea>
          <span class="suffix">.txt</span>
        </div>
      </div>

      <div class="example">
        <label for="both-ta">With Both:</label>
        <div class="input-wrapper both">
          <span class="prefix">📧</span>
          <textarea
            id="both-ta"
            class="e-textarea"
            placeholder="Enter message"
            rows="3">
          </textarea>
          <span class="suffix">✓</span>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaAdornmentsPrefix'
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

.input-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.input-wrapper.both {
  flex-wrap: wrap;
}

.prefix,
.suffix {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  font-weight: bold;
  color: #666;
}

.suffix {
  border-right: none;
  border-left: 1px solid #e0e0e0;
  order: 3;
}

.e-textarea {
  flex: 1;
  border: none;
  padding: 12px;
  font-family: inherit;
  font-size: inherit;
  resize: none;
}

.e-textarea:focus {
  outline: none;
}
</style>
```

---

## Icon Adornments

Add icons as adornments:

```vue
<template>
  <div class="icon-adornments">
    <fieldset>
      <legend>Icon Adornments</legend>

      <div class="example">
        <label for="icon-search">Search with Icon:</label>
        <div class="input-wrapper icon-left">
          <span class="icon-left">🔍</span>
          <textarea
            id="icon-search"
            class="e-textarea"
            placeholder="Search notes"
            rows="3">
          </textarea>
        </div>
      </div>

      <div class="example">
        <label for="icon-status">Status Icon:</label>
        <div class="input-wrapper icon-right">
          <textarea
            id="icon-status"
            class="e-textarea"
            placeholder="Write your message"
            rows="3">
          </textarea>
          <span class="icon-right status-pending">⏳</span>
        </div>
      </div>

      <div class="example">
        <label for="icon-both">Multiple Icons:</label>
        <div class="input-wrapper icon-both">
          <span class="icon-left">📝</span>
          <textarea
            id="icon-both"
            class="e-textarea"
            placeholder="Document notes"
            rows="3">
          </textarea>
          <span class="icon-right">✏️</span>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaIconAdornments'
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

.input-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.input-wrapper.icon-left .icon-left {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f9f9f9;
  border-right: 1px solid #e0e0e0;
  font-size: 18px;
}

.input-wrapper.icon-right .icon-right {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  background: #f9f9f9;
  border-left: 1px solid #e0e0e0;
  font-size: 18px;
  margin-top: 3px;
}

.input-wrapper.icon-both .icon-left {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f9f9f9;
  border-right: 1px solid #e0e0e0;
  font-size: 18px;
}

.input-wrapper.icon-both .icon-right {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  background: #f9f9f9;
  border-left: 1px solid #e0e0e0;
  font-size: 18px;
  margin-top: 3px;
}

.status-pending {
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.e-textarea {
  flex: 1;
  border: none;
  padding: 12px;
  font-family: inherit;
  font-size: inherit;
  resize: none;
}

.e-textarea:focus {
  outline: none;
}
</style>
```

---

## Button Adornments

Add action buttons:

```vue
<template>
  <div class="button-adornments">
    <fieldset>
      <legend>Button Adornments</legend>

      <div class="example">
        <label for="btn-clear">Clear Button:</label>
        <div class="input-wrapper with-button">
          <textarea
            id="btn-clear"
            v-model="clearText"
            class="e-textarea"
            placeholder="Type something"
            rows="3">
          </textarea>
          <button @click="clearText = ''" class="adornment-btn clear">
            ✕ Clear
          </button>
        </div>
      </div>

      <div class="example">
        <label for="btn-send">Send Button:</label>
        <div class="input-wrapper with-button">
          <textarea
            id="btn-send"
            v-model="sendText"
            class="e-textarea"
            placeholder="Type message"
            rows="3">
          </textarea>
          <button @click="sendMessage" class="adornment-btn send">
            ⬆ Send
          </button>
        </div>
        <p v-if="messageSent" class="success">Message sent!</p>
      </div>

      <div class="example">
        <label for="btn-preview">Preview Button:</label>
        <div class="input-wrapper with-button">
          <textarea
            id="btn-preview"
            v-model="previewText"
            class="e-textarea"
            placeholder="Enter text"
            rows="3">
          </textarea>
          <button @click="showPreview" class="adornment-btn preview">
            👁 Preview
          </button>
        </div>
        <div v-if="previewOpen" class="preview-popup">
          <h5>Preview</h5>
          <p>{{ previewText }}</p>
          <button @click="previewOpen = false">Close</button>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaButtonAdornments',
  data() {
    return {
      clearText: '',
      sendText: '',
      messageSent: false,
      previewText: '',
      previewOpen: false
    }
  },
  methods: {
    sendMessage() {
      if (this.sendText.trim()) {
        this.messageSent = true;
        this.sendText = '';
        setTimeout(() => { this.messageSent = false; }, 2000);
      }
    },
    showPreview() {
      this.previewOpen = !this.previewOpen;
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
  position: relative;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.input-wrapper.with-button {
  flex-direction: column;
}

.e-textarea {
  flex: 1;
  border: none;
  padding: 12px;
  font-family: inherit;
  font-size: inherit;
  resize: none;
  order: 1;
}

.e-textarea:focus {
  outline: none;
}

.adornment-btn {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  border-top: 1px solid #e0e0e0;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: background 0.2s;
  order: 2;
}

.adornment-btn:hover {
  background: #e0e0e0;
}

.adornment-btn.clear:hover {
  background: #ffebee;
}

.adornment-btn.send:hover {
  background: #e8f5e9;
}

.adornment-btn.preview:hover {
  background: #e3f2fd;
}

.success {
  margin-top: 8px;
  color: #28a745;
  font-size: 12px;
}

.preview-popup {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-top: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.preview-popup h5 {
  margin: 0 0 10px 0;
}

.preview-popup p {
  margin: 0 0 10px 0;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 3px;
  max-height: 150px;
  overflow-y: auto;
}

.preview-popup button {
  width: 100%;
  padding: 8px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.preview-popup button:hover {
  background: #106ebe;
}

p {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Examples

### Complete Adornments Demo

```vue
<template>
  <div class="adornments-complete">
    <h3>TextArea Adornments Guide</h3>

    <div class="adornment-showcase">
      <h4>Adornment Patterns</h4>

      <div class="showcase-grid">
        <div class="pattern-card">
          <h5>Currency Input</h5>
          <div class="input-wrapper">
            <span class="prefix">$</span>
            <textarea
              v-model="currencyInput"
              class="e-textarea"
              placeholder="Enter amount"
              rows="2">
            </textarea>
          </div>
        </div>

        <div class="pattern-card">
          <h5>Code Block</h5>
          <div class="input-wrapper">
            <span class="prefix">&lt;/&gt;</span>
            <textarea
              v-model="codeInput"
              class="e-textarea"
              placeholder="Enter code"
              rows="2">
            </textarea>
          </div>
        </div>

        <div class="pattern-card">
          <h5>Search Query</h5>
          <div class="input-wrapper">
            <span class="icon-left">🔍</span>
            <textarea
              v-model="searchInput"
              class="e-textarea"
              placeholder="Search..."
              rows="2">
            </textarea>
          </div>
        </div>

        <div class="pattern-card">
          <h5>Notification</h5>
          <div class="input-wrapper">
            <textarea
              v-model="notificationInput"
              class="e-textarea"
              placeholder="Notification text"
              rows="2">
            </textarea>
            <span class="icon-right">🔔</span>
          </div>
        </div>

        <div class="pattern-card">
          <h5>User Input</h5>
          <div class="input-wrapper">
            <span class="prefix">@</span>
            <textarea
              v-model="userInput"
              class="e-textarea"
              placeholder="Enter username"
              rows="2">
            </textarea>
            <span class="icon-right">👤</span>
          </div>
        </div>

        <div class="pattern-card">
          <h5>With Action</h5>
          <div class="input-wrapper with-button">
            <textarea
              v-model="actionInput"
              class="e-textarea"
              placeholder="Message"
              rows="2">
            </textarea>
            <button @click="handleAction" class="action-btn">⬆</button>
          </div>
        </div>
      </div>
    </div>

    <div class="form-use-case">
      <h4>Real-World Use Case: Comment Form</h4>

      <div class="comment-form">
        <fieldset>
          <legend>Leave a Comment</legend>

          <div class="form-group">
            <label for="comment-name">Name:</label>
            <div class="input-wrapper">
              <span class="prefix">👤</span>
              <textarea
                id="comment-name"
                v-model="comment.name"
                class="e-textarea"
                placeholder="Your name"
                rows="1">
              </textarea>
            </div>
          </div>

          <div class="form-group">
            <label for="comment-email">Email:</label>
            <div class="input-wrapper">
              <span class="prefix">📧</span>
              <textarea
                id="comment-email"
                v-model="comment.email"
                class="e-textarea"
                placeholder="your@email.com"
                rows="1">
              </textarea>
            </div>
          </div>

          <div class="form-group">
            <label for="comment-text">Comment:</label>
            <div class="input-wrapper icon-left">
              <span class="icon-left">💭</span>
              <textarea
                id="comment-text"
                v-model="comment.text"
                class="e-textarea"
                placeholder="Write your comment..."
                rows="5">
              </textarea>
            </div>
            <p class="char-count">{{ comment.text.length }}/500 characters</p>
          </div>

          <button @click="submitComment" class="submit-btn">
            ✓ Post Comment
          </button>
        </fieldset>

        <div v-if="commentPosted" class="success-message">
          ✓ Comment posted successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaAdornmentsComplete',
  data() {
    return {
      currencyInput: '',
      codeInput: '',
      searchInput: '',
      notificationInput: '',
      userInput: '',
      actionInput: '',
      comment: {
        name: '',
        email: '',
        text: ''
      },
      commentPosted: false
    }
  },
  methods: {
    handleAction() {
      if (this.actionInput.trim()) {
        this.actionInput = '';
      }
    },
    submitComment() {
      if (this.comment.name && this.comment.email && this.comment.text) {
        this.commentPosted = true;
        this.comment = { name: '', email: '', text: '' };
        setTimeout(() => { this.commentPosted = false; }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.adornments-complete {
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
  margin: 0 0 8px 0;
  font-size: 14px;
}

.adornment-showcase,
.form-use-case {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.pattern-card {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.input-wrapper.with-button {
  flex-direction: column;
}

.prefix,
.icon-left,
.icon-right {
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  font-weight: bold;
  color: #666;
  font-size: 14px;
}

.icon-right {
  border-right: none;
  border-left: 1px solid #e0e0e0;
}

.e-textarea {
  flex: 1;
  border: none;
  padding: 8px;
  font-family: inherit;
  font-size: 13px;
  resize: none;
}

.e-textarea:focus {
  outline: none;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  background: #0078d4;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  border-top: 1px solid #e0e0e0;
}

.action-btn:hover {
  background: #106ebe;
}

.comment-form {
  background: white;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
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
  font-size: 14px;
}

.char-count {
  margin-top: 5px;
  font-size: 11px;
  color: #999;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.submit-btn:hover {
  background: #218838;
}

.success-message {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: bold;
}
</style>
```
