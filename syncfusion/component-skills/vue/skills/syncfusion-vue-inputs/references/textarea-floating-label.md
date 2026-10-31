# Floating Label — Syncfusion Vue TextArea

## Table of Contents
- [Basic Floating Label](#basic-floating-label)
- [Floating Label States](#floating-label-states)
- [Custom Styles](#custom-styles)
- [Examples](#examples)

---

## Basic Floating Label

Implement floating label pattern:

```vue
<template>
  <div class="floating-label-demo">
    <fieldset>
      <legend>Floating Label TextArea</legend>

      <div class="form-group">
        <div class="floating-input">
          <textarea
            id="message"
            v-model="message"
            class="textarea-input"
            @focus="focused = true"
            @blur="focused = message.length > 0"
            rows="4"
            placeholder=" ">
          </textarea>
          <label for="message" class="floating-label">Message</label>
        </div>
      </div>

      <div class="form-group">
        <div class="floating-input">
          <textarea
            id="comment"
            v-model="comment"
            class="textarea-input"
            @focus="focused = true"
            @blur="focused = comment.length > 0"
            rows="4"
            placeholder=" ">
          </textarea>
          <label for="comment" class="floating-label">Add Comment</label>
        </div>
      </div>

      <div class="form-group">
        <div class="floating-input">
          <textarea
            id="notes"
            v-model="notes"
            class="textarea-input"
            @focus="focused = true"
            @blur="focused = notes.length > 0"
            rows="4"
            placeholder=" ">
          </textarea>
          <label for="notes" class="floating-label">Additional Notes</label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFloatingLabel',
  data() {
    return {
      message: '',
      comment: '',
      notes: '',
      focused: false
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
  margin-bottom: 25px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.floating-input {
  position: relative;
}

.textarea-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
}

.textarea-input:focus {
  outline: none;
  border-color: #0078d4;
}

.floating-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.textarea-input:focus ~ .floating-label,
.textarea-input:not(:placeholder-shown) ~ .floating-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}
</style>
```

---

## Floating Label States

Different states:

```vue
<template>
  <div class="states-demo">
    <h4>Floating Label States</h4>

    <div class="state-section">
      <h5>Empty State (Placeholder)</h5>
      <div class="floating-input">
        <textarea
          id="empty"
          class="textarea-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="empty" class="floating-label">Your Text</label>
      </div>
      <p class="note">Label appears inline when empty</p>
    </div>

    <div class="state-section">
      <h5>Filled State</h5>
      <div class="floating-input">
        <textarea
          id="filled"
          value="This is filled content"
          class="textarea-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="filled" class="floating-label">Your Text</label>
      </div>
      <p class="note">Label floats above when filled</p>
    </div>

    <div class="state-section">
      <h5>Focused State</h5>
      <div class="floating-input">
        <textarea
          id="focused"
          autofocus
          class="textarea-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="focused" class="floating-label">Your Text</label>
      </div>
      <p class="note">Label floats and highlights when focused</p>
    </div>

    <div class="state-section">
      <h5>Valid State</h5>
      <div class="floating-input valid">
        <textarea
          id="valid"
          value="Valid content"
          class="textarea-input valid-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="valid" class="floating-label">Your Text</label>
        <span class="valid-indicator">✓</span>
      </div>
      <p class="note">With success indicator</p>
    </div>

    <div class="state-section">
      <h5>Error State</h5>
      <div class="floating-input error">
        <textarea
          id="error"
          value="Invalid"
          class="textarea-input error-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="error" class="floating-label">Your Text</label>
        <span class="error-message">Required field</span>
      </div>
      <p class="note">With error message</p>
    </div>

    <div class="state-section">
      <h5>Disabled State</h5>
      <div class="floating-input disabled">
        <textarea
          id="disabled"
          disabled
          value="Disabled content"
          class="textarea-input"
          rows="3"
          placeholder=" ">
        </textarea>
        <label for="disabled" class="floating-label">Your Text</label>
      </div>
      <p class="note">Disabled with grayed appearance</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFloatingLabelStates'
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

.state-section {
  margin-bottom: 25px;
}

.state-section:last-child {
  margin-bottom: 0;
}

.floating-input {
  position: relative;
  margin-bottom: 10px;
}

.textarea-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s;
}

.textarea-input:focus {
  outline: none;
  border-color: #0078d4;
}

.floating-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.textarea-input:focus ~ .floating-label,
.textarea-input:not(:placeholder-shown) ~ .floating-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

.valid-input {
  border-color: #28a745;
  background: #f0fff4;
}

.valid-input:focus {
  border-color: #28a745;
}

.valid-input:focus ~ .floating-label,
.valid-input:not(:placeholder-shown) ~ .floating-label {
  color: #28a745;
}

.valid-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #28a745;
  font-weight: bold;
}

.error-input {
  border-color: #dc3545;
  background: #fff5f5;
}

.error-input:focus {
  border-color: #dc3545;
}

.error-input:focus ~ .floating-label,
.error-input:not(:placeholder-shown) ~ .floating-label {
  color: #dc3545;
}

.error-message {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #dc3545;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.textarea-input:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.note {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #999;
}
</style>
```

---

## Custom Styles

Customize floating label appearance:

```vue
<template>
  <div class="custom-styles">
    <h4>Custom Floating Label Styles</h4>

    <div class="style-showcase">
      <div class="style-card">
        <h5>Outlined Style</h5>
        <div class="floating-input outlined">
          <textarea
            id="outlined"
            class="textarea-input outlined-input"
            rows="3"
            placeholder=" ">
          </textarea>
          <label for="outlined" class="floating-label outlined-label">Message</label>
        </div>
      </div>

      <div class="style-card">
        <h5>Filled Style</h5>
        <div class="floating-input filled">
          <textarea
            id="filled-style"
            class="textarea-input filled-input"
            rows="3"
            placeholder=" ">
          </textarea>
          <label for="filled-style" class="floating-label filled-label">Message</label>
        </div>
      </div>

      <div class="style-card">
        <h5>Underline Style</h5>
        <div class="floating-input underline">
          <textarea
            id="underline"
            class="textarea-input underline-input"
            rows="3"
            placeholder=" ">
          </textarea>
          <label for="underline" class="floating-label underline-label">Message</label>
        </div>
      </div>

      <div class="style-card">
        <h5>Modern Style</h5>
        <div class="floating-input modern">
          <textarea
            id="modern"
            class="textarea-input modern-input"
            rows="3"
            placeholder=" ">
          </textarea>
          <label for="modern" class="floating-label modern-label">Message</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaCustomFloatingStyles'
}
</script>

<style scoped>
h4 {
  margin-top: 0;
  margin-bottom: 20px;
}

h5 {
  margin: 0 0 10px 0;
}

.style-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.style-card {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.floating-input {
  position: relative;
}

/* Outlined Style */
.outlined-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s;
}

.outlined-input:focus {
  outline: none;
  border-color: #0078d4;
}

.outlined-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
  background: #f9f9f9;
  padding: 0 4px;
}

.outlined-input:focus ~ .outlined-label,
.outlined-input:not(:placeholder-shown) ~ .outlined-label {
  top: -8px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

/* Filled Style */
.filled-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  background: #f5f5f5;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s;
  border-radius: 4px 4px 0 0;
}

.filled-input:focus {
  outline: none;
  border-bottom-color: #0078d4;
  background: #f0f0f0;
}

.filled-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.filled-input:focus ~ .filled-label,
.filled-input:not(:placeholder-shown) ~ .filled-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

/* Underline Style */
.underline-input {
  width: 100%;
  padding: 16px 0 8px 0;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s;
}

.underline-input:focus {
  outline: none;
  border-bottom-color: #0078d4;
}

.underline-label {
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.underline-input:focus ~ .underline-label,
.underline-input:not(:placeholder-shown) ~ .underline-label {
  top: 0;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

/* Modern Style */
.modern-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: linear-gradient(to bottom, transparent 0%, transparent 50%, #f9f9f9 50%, #f9f9f9 100%);
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.modern-input:focus {
  outline: none;
  border-color: #0078d4;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.15);
}

.modern-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.modern-input:focus ~ .modern-label,
.modern-input:not(:placeholder-shown) ~ .modern-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}
</style>
```

---

## Examples

### Complete Floating Label Form Demo

```vue
<template>
  <div class="floating-label-complete">
    <h3>Floating Label TextArea Guide</h3>

    <div class="form-section">
      <h4>Contact Form with Floating Labels</h4>

      <form @submit.prevent="submitForm" class="contact-form">
        <fieldset>
          <legend>Get in Touch</legend>

          <div class="form-group">
            <div class="floating-input">
              <textarea
                id="name"
                v-model="form.name"
                @blur="validateField('name')"
                class="textarea-input"
                :class="{ 'has-error': errors.name }"
                rows="1"
                placeholder=" ">
              </textarea>
              <label for="name" class="floating-label">Full Name</label>
              <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
            </div>
          </div>

          <div class="form-group">
            <div class="floating-input">
              <textarea
                id="email"
                v-model="form.email"
                @blur="validateField('email')"
                class="textarea-input"
                :class="{ 'has-error': errors.email }"
                rows="1"
                placeholder=" ">
              </textarea>
              <label for="email" class="floating-label">Email Address</label>
              <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
            </div>
          </div>

          <div class="form-group">
            <div class="floating-input">
              <textarea
                id="subject"
                v-model="form.subject"
                class="textarea-input"
                rows="1"
                placeholder=" ">
              </textarea>
              <label for="subject" class="floating-label">Subject</label>
            </div>
          </div>

          <div class="form-group">
            <div class="floating-input">
              <textarea
                id="message"
                v-model="form.message"
                @blur="validateField('message')"
                class="textarea-input"
                :class="{ 'has-error': errors.message }"
                rows="5"
                placeholder=" ">
              </textarea>
              <label for="message" class="floating-label">Message</label>
              <p v-if="errors.message" class="error-text">{{ errors.message }}</p>
              <p class="char-count">{{ form.message.length }}/500</p>
            </div>
          </div>

          <button type="submit" class="submit-btn">Send Message</button>
        </fieldset>
      </form>

      <div v-if="submitSuccess" class="success-message">
        ✓ Thank you! Your message has been sent.
      </div>
    </div>

    <div class="style-variants">
      <h4>Style Variants</h4>

      <div class="variants-grid">
        <div class="variant">
          <h5>Default</h5>
          <div class="floating-input">
            <textarea
              id="var-default"
              class="textarea-input"
              rows="3"
              placeholder=" ">
            </textarea>
            <label for="var-default" class="floating-label">Feedback</label>
          </div>
        </div>

        <div class="variant">
          <h5>Outlined</h5>
          <div class="floating-input outlined-variant">
            <textarea
              id="var-outlined"
              class="textarea-input outlined-variant-input"
              rows="3"
              placeholder=" ">
            </textarea>
            <label for="var-outlined" class="floating-label outlined-variant-label">Feedback</label>
          </div>
        </div>

        <div class="variant">
          <h5>Filled</h5>
          <div class="floating-input filled-variant">
            <textarea
              id="var-filled"
              class="textarea-input filled-variant-input"
              rows="3"
              placeholder=" ">
            </textarea>
            <label for="var-filled" class="floating-label filled-variant-label">Feedback</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaFloatingLabelComplete',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {
        name: '',
        email: '',
        message: ''
      },
      submitSuccess: false
    }
  },
  methods: {
    validateField(field) {
      switch(field) {
        case 'name':
          this.errors.name = this.form.name ? '' : 'Name is required';
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.form.email) {
            this.errors.email = 'Email is required';
          } else if (!emailRegex.test(this.form.email)) {
            this.errors.email = 'Invalid email format';
          } else {
            this.errors.email = '';
          }
          break;
        case 'message':
          this.errors.message = this.form.message ? '' : 'Message is required';
          break;
      }
    },
    submitForm() {
      this.validateField('name');
      this.validateField('email');
      this.validateField('message');

      if (!this.errors.name && !this.errors.email && !this.errors.message && this.form.name && this.form.email && this.form.message) {
        this.submitSuccess = true;
        this.form = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => { this.submitSuccess = false; }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.floating-label-complete {
  padding: 20px;
  max-width: 800px;
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
  font-size: 13px;
}

.form-section,
.style-variants {
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
  margin-bottom: 20px;
}

.floating-input {
  position: relative;
}

.textarea-input {
  width: 100%;
  padding: 16px 12px 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s;
}

.textarea-input:focus {
  outline: none;
  border-color: #0078d4;
}

.textarea-input.has-error {
  border-color: #dc3545;
  background: #fff5f5;
}

.floating-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.textarea-input:focus ~ .floating-label,
.textarea-input:not(:placeholder-shown) ~ .floating-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

.textarea-input.has-error:focus ~ .floating-label,
.textarea-input.has-error:not(:placeholder-shown) ~ .floating-label {
  color: #dc3545;
}

.error-text {
  margin-top: 4px;
  font-size: 12px;
  color: #dc3545;
}

.char-count {
  margin-top: 4px;
  font-size: 11px;
  color: #999;
}

.submit-btn {
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

.submit-btn:hover {
  background: #106ebe;
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

.variants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.variant {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.outlined-variant {
  position: relative;
}

.outlined-variant-input {
  border: 2px solid #e0e0e0;
}

.outlined-variant-input:focus {
  border-color: #0078d4;
}

.outlined-variant-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
  background: #f9f9f9;
  padding: 0 4px;
}

.outlined-variant-input:focus ~ .outlined-variant-label,
.outlined-variant-input:not(:placeholder-shown) ~ .outlined-variant-label {
  top: -10px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

.filled-variant {
  position: relative;
}

.filled-variant-input {
  border: none;
  border-bottom: 2px solid #e0e0e0;
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
}

.filled-variant-input:focus {
  outline: none;
  border-bottom-color: #0078d4;
}

.filled-variant-label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}

.filled-variant-input:focus ~ .filled-variant-label,
.filled-variant-input:not(:placeholder-shown) ~ .filled-variant-label {
  top: 4px;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}
</style>
```
