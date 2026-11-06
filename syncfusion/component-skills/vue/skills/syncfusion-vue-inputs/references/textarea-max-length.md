# Max Length — Syncfusion Vue TextArea

## Table of Contents
- [Max Length Configuration](#max-length-configuration)
- [Character Counter](#character-counter)
- [Custom Length Validation](#custom-length-validation)
- [Examples](#examples)

---

## Max Length Configuration

Configure maximum length:

```vue
<template>
  <div class="maxlength-demo">
    <fieldset>
      <legend>Max Length TextArea</legend>

      <div class="example">
        <label for="max-50">Max 50 Characters:</label>
        <textarea
          id="max-50"
          v-model="text50"
          maxlength="50"
          rows="2"
          placeholder="Max 50 chars">
        </textarea>
      </div>

      <div class="example">
        <label for="max-100">Max 100 Characters:</label>
        <textarea
          id="max-100"
          v-model="text100"
          maxlength="100"
          rows="3"
          placeholder="Max 100 chars">
        </textarea>
      </div>

      <div class="example">
        <label for="max-500">Max 500 Characters:</label>
        <textarea
          id="max-500"
          v-model="text500"
          maxlength="500"
          rows="5"
          placeholder="Max 500 chars">
        </textarea>
      </div>

      <div class="example">
        <label for="no-limit">No Limit:</label>
        <textarea
          id="no-limit"
          v-model="textNoLimit"
          rows="3"
          placeholder="Unlimited">
        </textarea>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaMaxLength',
  data() {
    return {
      text50: '',
      text100: '',
      text500: '',
      textNoLimit: ''
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
</style>
```

---

## Character Counter

Display character counter:

```vue
<template>
  <div class="counter-demo">
    <h4>Character Counter</h4>

    <div class="counter-section">
      <h5>Simple Counter</h5>
      <textarea
        id="simple-counter"
        v-model="simpleText"
        rows="3"
        maxlength="100"
        placeholder="Max 100 chars">
      </textarea>
      <p class="counter">{{ simpleText.length }}/100</p>
    </div>

    <div class="counter-section">
      <h5>Counter with Warning</h5>
      <textarea
        id="warning-counter"
        v-model="warningText"
        rows="3"
        maxlength="200"
        placeholder="Max 200 chars">
      </textarea>
      <div class="counter-display">
        <p class="counter">{{ warningText.length }}/200</p>
        <p v-if="warningText.length > 150" class="warning">
          ⚠ Only {{ 200 - warningText.length }} characters remaining
        </p>
        <p v-if="warningText.length === 200" class="error">
          ✗ Limit reached
        </p>
      </div>
    </div>

    <div class="counter-section">
      <h5>Progress Bar Counter</h5>
      <textarea
        id="progress-counter"
        v-model="progressText"
        rows="3"
        maxlength="150"
        placeholder="Max 150 chars">
      </textarea>
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: (progressText.length / 150) * 100 + '%' }">
        </div>
      </div>
      <p class="counter">{{ progressText.length }}/150</p>
    </div>

    <div class="counter-section">
      <h5>Word Counter</h5>
      <textarea
        id="word-counter"
        v-model="wordText"
        rows="3"
        placeholder="Type to count words">
      </textarea>
      <p class="counter">
        Words: {{ wordCount }}, Characters: {{ wordText.length }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaCharacterCounter',
  data() {
    return {
      simpleText: '',
      warningText: '',
      progressText: '',
      wordText: ''
    }
  },
  computed: {
    wordCount() {
      return this.wordText.trim().split(/\s+/).filter(w => w.length > 0).length;
    }
  }
}
</script>

<style scoped>
h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 0 0 10px 0;
  font-size: 13px;
}

.counter-section {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.counter-section:last-child {
  margin-bottom: 0;
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

.counter-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.counter {
  margin: 0;
  font-size: 12px;
  color: #666;
  font-weight: bold;
}

.warning {
  margin: 0;
  color: #ffc107;
  font-size: 12px;
  font-weight: bold;
}

.error {
  margin: 0;
  color: #dc3545;
  font-size: 12px;
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #28a745, #0078d4);
  transition: width 0.2s ease;
}
</style>
```

---

## Custom Length Validation

Custom validation beyond maxlength:

```vue
<template>
  <div class="custom-validation">
    <h4>Custom Length Validation</h4>

    <div class="validation-section">
      <h5>Min and Max Length</h5>
      <textarea
        id="min-max"
        v-model="minMaxText"
        @blur="validateMinMax"
        :class="{ 'has-error': minMaxError, 'has-success': minMaxValid }"
        rows="3"
        placeholder="Must be 20-200 chars">
      </textarea>
      <p v-if="minMaxError" class="error">{{ minMaxError }}</p>
      <p v-if="minMaxValid" class="success">✓ Valid length</p>
      <p class="info">Min: 20, Max: 200 | Current: {{ minMaxText.length }}</p>
    </div>

    <div class="validation-section">
      <h5>Paragraph Limit</h5>
      <textarea
        id="paragraph-limit"
        v-model="paragraphText"
        rows="5"
        placeholder="Limit: 3 paragraphs">
      </textarea>
      <p class="info">
        Paragraphs: {{ paragraphCount }}/3
        <span v-if="paragraphCount > 3" class="error"> ✗ Exceeded</span>
        <span v-else-if="paragraphCount === 3" class="warning"> ⚠ At limit</span>
      </p>
    </div>

    <div class="validation-section">
      <h5>Line Limit</h5>
      <textarea
        id="line-limit"
        v-model="lineText"
        rows="4"
        placeholder="Limit: 4 lines">
      </textarea>
      <p class="info">
        Lines: {{ lineCount }}/4
        <span v-if="lineCount > 4" class="error"> ✗ Exceeded</span>
      </p>
    </div>

    <div class="validation-section">
      <h5>Sentence Limit</h5>
      <textarea
        id="sentence-limit"
        v-model="sentenceText"
        rows="4"
        placeholder="Limit: 2 sentences">
      </textarea>
      <p class="info">
        Sentences: {{ sentenceCount }}/2
        <span v-if="sentenceCount > 2" class="error"> ✗ Exceeded</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaCustomValidation',
  data() {
    return {
      minMaxText: '',
      minMaxError: '',
      minMaxValid: false,
      paragraphText: '',
      lineText: '',
      sentenceText: ''
    }
  },
  computed: {
    paragraphCount() {
      return this.paragraphText.split(/\n\s*\n/).filter(p => p.trim()).length;
    },
    lineCount() {
      return this.lineText.split('\n').length;
    },
    sentenceCount() {
      const sentences = this.sentenceText.match(/[.!?]+/g);
      return sentences ? sentences.length : (this.sentenceText.trim() ? 1 : 0);
    }
  },
  methods: {
    validateMinMax() {
      const len = this.minMaxText.length;
      if (len < 20) {
        this.minMaxError = `Too short (${len}/20 minimum)`;
        this.minMaxValid = false;
      } else if (len > 200) {
        this.minMaxError = `Too long (${len}/200 maximum)`;
        this.minMaxValid = false;
      } else {
        this.minMaxError = '';
        this.minMaxValid = true;
      }
    }
  }
}
</script>

<style scoped>
h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 0 0 10px 0;
  font-size: 13px;
}

.validation-section {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.validation-section:last-child {
  margin-bottom: 0;
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

textarea.has-error {
  border-color: #dc3545;
  background: #fff5f5;
}

textarea.has-success {
  border-color: #28a745;
  background: #f0fff4;
}

.info {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.error {
  color: #dc3545;
  font-weight: bold;
}

.warning {
  color: #ffc107;
  font-weight: bold;
}

.success {
  margin: 8px 0 0 0;
  color: #28a745;
  font-size: 12px;
}
</style>
```

---

## Examples

### Complete Max Length Demo

```vue
<template>
  <div class="maxlength-complete">
    <h3>Max Length TextArea Guide</h3>

    <div class="length-showcase">
      <h4>Character Limit Showcase</h4>

      <div class="showcase-grid">
        <div class="showcase-card">
          <h5>Tweet-like (280 chars)</h5>
          <textarea
            id="tweet"
            v-model="tweet"
            maxlength="280"
            rows="3"
            placeholder="What's happening?">
          </textarea>
          <div class="counter-info">
            <div class="counter-bar">
              <div 
                class="counter-fill tweet-fill"
                :style="{ width: (tweet.length / 280) * 100 + '%' }">
              </div>
            </div>
            <p>{{ tweet.length }}/280</p>
          </div>
        </div>

        <div class="showcase-card">
          <h5>SMS Message (160 chars)</h5>
          <textarea
            id="sms"
            v-model="sms"
            maxlength="160"
            rows="3"
            placeholder="Send a message">
          </textarea>
          <div class="counter-info">
            <div class="counter-bar">
              <div 
                class="counter-fill sms-fill"
                :style="{ width: (sms.length / 160) * 100 + '%' }">
              </div>
            </div>
            <p>{{ sms.length }}/160</p>
          </div>
        </div>

        <div class="showcase-card">
          <h5>Bio (150 chars)</h5>
          <textarea
            id="bio"
            v-model="bio"
            maxlength="150"
            rows="2"
            placeholder="About you">
          </textarea>
          <div class="counter-info">
            <div class="counter-bar">
              <div 
                class="counter-fill bio-fill"
                :style="{ width: (bio.length / 150) * 100 + '%' }">
              </div>
            </div>
            <p>{{ bio.length }}/150</p>
          </div>
        </div>

        <div class="showcase-card">
          <h5>Review (1000 chars)</h5>
          <textarea
            id="review"
            v-model="review"
            maxlength="1000"
            rows="5"
            placeholder="Write your review">
          </textarea>
          <div class="counter-info">
            <div class="counter-bar">
              <div 
                class="counter-fill review-fill"
                :style="{ width: (review.length / 1000) * 100 + '%' }">
              </div>
            </div>
            <p>{{ review.length }}/1000</p>
          </div>
        </div>
      </div>
    </div>

    <div class="form-example">
      <h4>Real-World Form with Length Limits</h4>

      <form @submit.prevent="submitForm" class="length-form">
        <fieldset>
          <legend>Product Feedback</legend>

          <div class="form-group">
            <label for="title">
              Title <span class="required">*</span>
            </label>
            <textarea
              id="title"
              v-model="form.title"
              maxlength="100"
              rows="1"
              required>
            </textarea>
            <div class="length-indicator">
              <p class="counter">{{ form.title.length }}/100</p>
            </div>
          </div>

          <div class="form-group">
            <label for="summary">
              Summary <span class="required">*</span>
            </label>
            <textarea
              id="summary"
              v-model="form.summary"
              maxlength="500"
              rows="3"
              required>
            </textarea>
            <div class="length-indicator">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: (form.summary.length / 500) * 100 + '%' }">
                </div>
              </div>
              <p class="counter">{{ form.summary.length }}/500</p>
              <p v-if="form.summary.length > 400" class="warning">
                ⚠ {{ 500 - form.summary.length }} characters remaining
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="details">Details (Optional)</label>
            <textarea
              id="details"
              v-model="form.details"
              maxlength="2000"
              rows="5">
            </textarea>
            <div class="length-indicator">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: (form.details.length / 2000) * 100 + '%' }">
                </div>
              </div>
              <p class="counter">{{ form.details.length }}/2000</p>
            </div>
          </div>

          <button type="submit" :disabled="!form.title || !form.summary">
            Submit Feedback
          </button>
        </fieldset>
      </form>

      <div v-if="submitted" class="success-message">
        ✓ Thank you for your feedback!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaMaxLengthComplete',
  data() {
    return {
      tweet: '',
      sms: '',
      bio: '',
      review: '',
      form: {
        title: '',
        summary: '',
        details: ''
      },
      submitted: false
    }
  },
  methods: {
    submitForm() {
      this.submitted = true;
      setTimeout(() => {
        this.form = { title: '', summary: '', details: '' };
        this.submitted = false;
      }, 2000);
    }
  }
}
</script>

<style scoped>
.maxlength-complete {
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
  margin: 0 0 10px 0;
  font-size: 14px;
}

.length-showcase,
.form-example {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.showcase-card {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 10px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.counter-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.counter-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.counter-fill {
  height: 100%;
  transition: width 0.2s ease;
}

.tweet-fill {
  background: #1da1f2;
}

.sms-fill {
  background: #28a745;
}

.bio-fill {
  background: #ffc107;
}

.review-fill {
  background: #0078d4;
}

.counter-info p {
  margin: 0;
  font-size: 11px;
  color: #666;
  font-weight: bold;
  min-width: 50px;
}

fieldset {
  border: none;
  padding: 0;
}

legend {
  display: none;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.required {
  color: #dc3545;
}

.length-indicator {
  margin-top: 8px;
}

.progress-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #28a745, #0078d4);
  transition: width 0.2s ease;
}

.counter {
  font-size: 11px;
  color: #666;
  font-weight: bold;
  margin: 0;
}

.warning {
  margin-top: 4px;
  font-size: 11px;
  color: #ffc107;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
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
