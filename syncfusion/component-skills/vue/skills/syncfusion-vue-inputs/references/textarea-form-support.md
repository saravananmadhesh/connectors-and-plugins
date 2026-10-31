# Form Support — Syncfusion Vue TextArea

## Table of Contents
- [Form Integration](#form-integration)
- [Form Validation](#form-validation)
- [Data Binding](#data-binding)
- [Examples](#examples)

---

## Form Integration

Integrate textarea with HTML forms:

```vue
<template>
  <div class="form-integration">
    <fieldset>
      <legend>Form Integration</legend>

      <form @submit.prevent="handleSubmit" class="demo-form">
        <div class="form-group">
          <label for="form-message">Message:</label>
          <textarea
            id="form-message"
            name="message"
            v-model="formData.message"
            rows="4"
            required>
          </textarea>
        </div>

        <div class="form-group">
          <label for="form-feedback">Feedback:</label>
          <textarea
            id="form-feedback"
            name="feedback"
            v-model="formData.feedback"
            rows="4">
          </textarea>
        </div>

        <button type="submit">Submit Form</button>
        <button type="reset" @click="resetForm">Reset</button>
      </form>

      <div v-if="submitted" class="result">
        <h5>Submitted Data:</h5>
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFormIntegration',
  data() {
    return {
      formData: {
        message: '',
        feedback: ''
      },
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      console.log('Form submitted:', this.formData);
    },
    resetForm() {
      this.formData = { message: '', feedback: '' };
      this.submitted = false;
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

.demo-form {
  margin-bottom: 20px;
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

button {
  padding: 8px 16px;
  margin-right: 8px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="reset"] {
  background: #6c757d;
}

button:hover {
  opacity: 0.9;
}

.result {
  padding: 15px;
  background: #f0f7ff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
}

.result h5 {
  margin-top: 0;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
}
</style>
```

---

## Form Validation

Validate textarea input within forms:

```vue
<template>
  <div class="form-validation">
    <form @submit.prevent="submitForm" class="validation-form">
      <fieldset>
        <legend>Form Validation</legend>

        <div class="form-group">
          <label for="required-ta">
            Required Field <span class="required">*</span>
          </label>
          <textarea
            id="required-ta"
            v-model="form.required"
            @blur="validateField('required')"
            :class="{ 'has-error': errors.required }"
            rows="3"
            required>
          </textarea>
          <p v-if="errors.required" class="error">{{ errors.required }}</p>
        </div>

        <div class="form-group">
          <label for="min-length-ta">
            Min 10 Characters
          </label>
          <textarea
            id="min-length-ta"
            v-model="form.minLength"
            @blur="validateField('minLength')"
            :class="{ 'has-error': errors.minLength }"
            rows="3">
          </textarea>
          <p v-if="errors.minLength" class="error">{{ errors.minLength }}</p>
        </div>

        <div class="form-group">
          <label for="pattern-ta">
            Alphanumeric Only
          </label>
          <textarea
            id="pattern-ta"
            v-model="form.pattern"
            @blur="validateField('pattern')"
            :class="{ 'has-error': errors.pattern }"
            rows="3">
          </textarea>
          <p v-if="errors.pattern" class="error">{{ errors.pattern }}</p>
        </div>

        <button type="submit" :disabled="!isFormValid">Submit</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFormValidation',
  data() {
    return {
      form: {
        required: '',
        minLength: '',
        pattern: ''
      },
      errors: {
        required: '',
        minLength: '',
        pattern: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.form.required && this.form.minLength.length >= 10 &&
             /^[a-zA-Z0-9\s]*$/.test(this.form.pattern);
    }
  },
  methods: {
    validateField(field) {
      switch(field) {
        case 'required':
          this.errors.required = this.form.required ? '' : 'This field is required';
          break;
        case 'minLength':
          this.errors.minLength = this.form.minLength.length >= 10 ?
            '' : 'Minimum 10 characters required';
          break;
        case 'pattern':
          this.errors.pattern = /^[a-zA-Z0-9\s]*$/.test(this.form.pattern) ?
            '' : 'Only alphanumeric characters allowed';
          break;
      }
    },
    submitForm() {
      ['required', 'minLength', 'pattern'].forEach(field => {
        this.validateField(field);
      });
      
      if (this.isFormValid) {
        alert('Form submitted successfully!');
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
  margin-bottom: 8px;
  font-weight: bold;
}

.required {
  color: #dc3545;
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

textarea.has-error {
  border-color: #dc3545;
  background: #fff5f5;
}

.error {
  margin-top: 4px;
  color: #dc3545;
  font-size: 12px;
}

button {
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

---

## Data Binding

Two-way data binding patterns:

```vue
<template>
  <div class="data-binding">
    <div class="binding-demo">
      <h4>Data Binding Patterns</h4>

      <div class="section">
        <h5>v-model Binding</h5>
        <textarea
          v-model="boundText"
          rows="3"
          placeholder="Type to see binding">
        </textarea>
        <p>Bound value: {{ boundText }}</p>
      </div>

      <div class="section">
        <h5>Manual Value Binding</h5>
        <textarea
          :value="manualText"
          @input="manualText = $event.target.value"
          rows="3"
          placeholder="Manual binding">
        </textarea>
        <p>Manual value: {{ manualText }}</p>
      </div>

      <div class="section">
        <h5>Computed Property</h5>
        <textarea
          :value="computedText"
          @input="computedTextInput = $event.target.value"
          rows="3"
          placeholder="Affects computed">
        </textarea>
        <p>Uppercase: {{ computedText.toUpperCase() }}</p>
      </div>

      <div class="section">
        <h5>Complex Object Binding</h5>
        <textarea
          v-model="user.bio"
          rows="3"
          placeholder="User bio">
        </textarea>
        <p>User data: {{ user }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaDataBinding',
  data() {
    return {
      boundText: '',
      manualText: '',
      computedTextInput: '',
      user: {
        name: 'John',
        bio: ''
      }
    }
  },
  computed: {
    computedText() {
      return this.computedTextInput;
    }
  }
}
</script>

<style scoped>
.binding-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 0 0 10px 0;
  font-size: 13px;
}

.section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 3px;
}

.section:last-child {
  margin-bottom: 0;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 10px;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

p {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Examples

### Complete Form with TextArea

```vue
<template>
  <div class="complete-form">
    <h3>Complete Form Support Guide</h3>

    <div class="form-container">
      <h4>Blog Comment Form</h4>

      <form @submit.prevent="submitComment" class="comment-form">
        <fieldset>
          <legend>Leave a Comment</legend>

          <div class="form-group">
            <label for="author">
              Author <span class="required">*</span>
            </label>
            <textarea
              id="author"
              v-model="comment.author"
              @blur="validateField('author')"
              :class="{ 'has-error': errors.author }"
              rows="1"
              required>
            </textarea>
            <p v-if="errors.author" class="error">{{ errors.author }}</p>
          </div>

          <div class="form-group">
            <label for="email">
              Email <span class="required">*</span>
            </label>
            <textarea
              id="email"
              v-model="comment.email"
              @blur="validateField('email')"
              :class="{ 'has-error': errors.email }"
              rows="1"
              type="email"
              required>
            </textarea>
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>

          <div class="form-group">
            <label for="website">Website (Optional)</label>
            <textarea
              id="website"
              v-model="comment.website"
              rows="1">
            </textarea>
          </div>

          <div class="form-group">
            <label for="comment-text">
              Comment <span class="required">*</span>
            </label>
            <textarea
              id="comment-text"
              v-model="comment.text"
              @blur="validateField('text')"
              :class="{ 'has-error': errors.text }"
              rows="5"
              maxlength="1000"
              required>
            </textarea>
            <p v-if="errors.text" class="error">{{ errors.text }}</p>
            <p class="char-count">{{ comment.text.length }}/1000</p>
          </div>

          <div class="form-group checkbox">
            <input
              id="subscribe"
              v-model="comment.subscribe"
              type="checkbox">
            <label for="subscribe">Notify me of follow-up comments</label>
          </div>

          <button type="submit" :disabled="!isCommentValid">Post Comment</button>
          <button type="reset" @click="resetComment">Clear</button>
        </fieldset>
      </form>

      <div v-if="commentPosted" class="success-message">
        ✓ Your comment has been posted!
      </div>
    </div>

    <div class="data-display">
      <h4>Form Data Structure</h4>
      <pre>{{ JSON.stringify(comment, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaCompleteForm',
  data() {
    return {
      comment: {
        author: '',
        email: '',
        website: '',
        text: '',
        subscribe: false
      },
      errors: {
        author: '',
        email: '',
        text: ''
      },
      commentPosted: false
    }
  },
  computed: {
    isCommentValid() {
      return this.comment.author && this.comment.email && this.comment.text &&
             !this.errors.author && !this.errors.email && !this.errors.text;
    }
  },
  methods: {
    validateField(field) {
      switch(field) {
        case 'author':
          this.errors.author = this.comment.author ? '' : 'Author name is required';
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.comment.email) {
            this.errors.email = 'Email is required';
          } else if (!emailRegex.test(this.comment.email)) {
            this.errors.email = 'Invalid email format';
          } else {
            this.errors.email = '';
          }
          break;
        case 'text':
          if (!this.comment.text) {
            this.errors.text = 'Comment text is required';
          } else if (this.comment.text.length < 10) {
            this.errors.text = 'Comment must be at least 10 characters';
          } else {
            this.errors.text = '';
          }
          break;
      }
    },
    submitComment() {
      this.validateField('author');
      this.validateField('email');
      this.validateField('text');

      if (this.isCommentValid) {
        this.commentPosted = true;
        setTimeout(() => {
          this.resetComment();
          this.commentPosted = false;
        }, 2000);
      }
    },
    resetComment() {
      this.comment = {
        author: '',
        email: '',
        website: '',
        text: '',
        subscribe: false
      };
      this.errors = { author: '', email: '', text: '' };
    }
  }
}
</script>

<style scoped>
.complete-form {
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

.form-container,
.data-display {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

fieldset {
  border: none;
  padding: 0;
}

legend {
  display: none;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.required {
  color: #dc3545;
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

textarea.has-error {
  border-color: #dc3545;
  background: #fff5f5;
}

.error {
  margin-top: 4px;
  color: #dc3545;
  font-size: 12px;
}

.char-count {
  margin-top: 4px;
  font-size: 11px;
  color: #999;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox label {
  margin-bottom: 0;
}

button {
  padding: 10px 20px;
  margin-right: 8px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button[type="reset"] {
  background: #6c757d;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.5;
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
}

.data-display {
  background: #f9f9f9;
}

pre {
  background: white;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}
</style>
```
