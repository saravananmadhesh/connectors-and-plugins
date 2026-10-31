# Accessibility and Migration — Syncfusion Vue TextBox

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [React to Vue Migration Guide](#react-to-vue-migration-guide)
- [Examples](#examples)

---

## WCAG 2.2 Compliance

Implement accessible TextBox:

```vue
<template>
  <div class="accessibility-demo">
    <fieldset>
      <legend>Accessible TextBox Examples</legend>

      <div class="form-group">
        <label for="accessible-text">Name (Required):</label>
        <ejs-textbox
          id="accessible-text"
          v-model="form.name"
          :enabled="true"
          aria-required="true"
          aria-label="Name input field"
          aria-describedby="name-help">
        </ejs-textbox>
        <span id="name-help" class="helper-text">Enter your full name</span>
      </div>

      <div class="form-group">
        <label for="email-text">Email (Required):</label>
        <ejs-textbox
          id="email-text"
          v-model="form.email"
          type="email"
          aria-required="true"
          aria-label="Email input field"
          aria-describedby="email-help">
        </ejs-textbox>
        <span id="email-help" class="helper-text">Enter a valid email address</span>
      </div>

      <div class="form-group">
        <label for="optional-text">Optional Notes:</label>
        <ejs-textbox
          id="optional-text"
          v-model="form.notes"
          aria-label="Optional notes field"
          aria-describedby="notes-help">
        </ejs-textbox>
        <span id="notes-help" class="helper-text">Optional: Add any additional notes</span>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        notes: ''
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

.helper-text {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Keyboard Navigation

Keyboard navigation support:

```vue
<template>
  <div class="keyboard-demo">
    <h4>Keyboard Navigation Support</h4>

    <table class="nav-table">
      <thead>
        <tr>
          <th>Key/Combination</th>
          <th>Action</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><kbd>Tab</kbd></td>
          <td>Move to next field</td>
          <td>Navigate between inputs</td>
        </tr>
        <tr>
          <td><kbd>Shift+Tab</kbd></td>
          <td>Move to previous field</td>
          <td>Go back to previous input</td>
        </tr>
        <tr>
          <td><kbd>Home</kbd></td>
          <td>Move cursor to start</td>
          <td>Jump to beginning of text</td>
        </tr>
        <tr>
          <td><kbd>End</kbd></td>
          <td>Move cursor to end</td>
          <td>Jump to end of text</td>
        </tr>
        <tr>
          <td><kbd>Ctrl+A</kbd></td>
          <td>Select all text</td>
          <td>Select entire content</td>
        </tr>
        <tr>
          <td><kbd>Ctrl+X</kbd></td>
          <td>Cut selected text</td>
          <td>Copy to clipboard and remove</td>
        </tr>
        <tr>
          <td><kbd>Ctrl+C</kbd></td>
          <td>Copy selected text</td>
          <td>Copy to clipboard</td>
        </tr>
        <tr>
          <td><kbd>Ctrl+V</kbd></td>
          <td>Paste text</td>
          <td>Insert from clipboard</td>
        </tr>
      </tbody>
    </table>

    <div class="test-area">
      <h5>Test Keyboard Navigation:</h5>
      <div class="form-group">
        <label for="first">First Field (Tab to enter):</label>
        <ejs-textbox id="first" placeholder="Tab here"></ejs-textbox>
      </div>

      <div class="form-group">
        <label for="second">Second Field:</label>
        <ejs-textbox id="second" placeholder="Tab from first"></ejs-textbox>
      </div>

      <div class="form-group">
        <label for="third">Third Field:</label>
        <ejs-textbox id="third" placeholder="Tab from second"></ejs-textbox>
      </div>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  }
}
</script>

<style scoped>
.keyboard-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 15px 0 10px 0;
}

.nav-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.nav-table th,
.nav-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.nav-table th {
  background: #f5f5f5;
  font-weight: bold;
}

kbd {
  padding: 3px 8px;
  background: #f0f0f0;
  border: 1px solid #999;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}

.test-area {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
```

---

## React to Vue Migration Guide

Migrate from React to Vue:

```vue
<template>
  <div class="migration-guide">
    <h4>React to Vue TextBox Migration</h4>

    <div class="migration-table">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>React Pattern</th>
            <th>Vue 3 Pattern</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Import</strong></td>
            <td><code>import { TextBoxComponent }</code></td>
            <td><code>import { TextBoxComponent }</code></td>
          </tr>
          <tr>
            <td><strong>State</strong></td>
            <td><code>const [val, setVal] = useState('')</code></td>
            <td><code>const val = ref('')</code></td>
          </tr>
          <tr>
            <td><strong>v-model</strong></td>
            <td><code>value={val} onChange={(e) => setVal(e.target.value)}</code></td>
            <td><code>v-model="val"</code></td>
          </tr>
          <tr>
            <td><strong>Props</strong></td>
            <td><code>&lt;TextBox placeholder="text" /&gt;</code></td>
            <td><code>&lt;ejs-textbox placeholder="text"&gt;&lt;/ejs-textbox&gt;</code></td>
          </tr>
          <tr>
            <td><strong>Events</strong></td>
            <td><code>onChange={handleChange}</code></td>
            <td><code>@change="handleChange"</code></td>
          </tr>
          <tr>
            <td><strong>Methods</strong></td>
            <td><code>ref.current.focus()</code></td>
            <td><code>this.$refs.textbox.focus()</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="example-comparison">
      <h5>Example: Simple Form Migration</h5>

      <div class="code-block">
        <h6>React:</h6>
        <pre><code>import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

function MyForm() {
  const [name, setName] = useState('');
  
  return (
    &lt;TextBoxComponent
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter name"
    /&gt;
  );
}</code></pre>
      </div>

      <div class="code-block">
        <h6>Vue 3:</h6>
        <pre><code>import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref } from 'vue';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  setup() {
    const name = ref('');
    return { name };
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  }
}
</script>

<style scoped>
.migration-guide {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 15px 0 10px 0;
}

h6 {
  margin: 10px 0 5px 0;
}

.migration-table {
  margin-bottom: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background: #f5f5f5;
  font-weight: bold;
}

code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}

.code-block {
  padding: 12px;
  background: #f9f9f9;
  border-left: 3px solid #0078d4;
  margin-bottom: 12px;
  border-radius: 4px;
}

.code-block:last-child {
  margin-bottom: 0;
}

pre {
  margin: 0;
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
}
</style>
```

---

## Examples

### Complete Accessibility Demo

```vue
<template>
  <div class="accessibility-complete">
    <h3>TextBox Accessibility Features</h3>

    <div class="wcag-section">
      <h4>WCAG 2.2 Compliant Form</h4>

      <form @submit.prevent="submitForm" class="form" role="form">
        <fieldset>
          <legend>Contact Information</legend>

          <div class="form-group">
            <label for="name">
              Name <span class="required">*</span>
            </label>
            <ejs-textbox
              id="name"
              v-model="formData.name"
              aria-required="true"
              aria-invalid="nameError ? 'true' : 'false'"
              aria-describedby="name-error name-help"
              placeholder="Enter full name">
            </ejs-textbox>
            <p id="name-help" class="help-text">Enter your complete name</p>
            <p v-if="nameError" id="name-error" class="error-text" role="alert">
              Name is required
            </p>
          </div>

          <div class="form-group">
            <label for="email">
              Email <span class="required">*</span>
            </label>
            <ejs-textbox
              id="email"
              v-model="formData.email"
              type="email"
              aria-required="true"
              aria-invalid="emailError ? 'true' : 'false'"
              aria-describedby="email-error email-help"
              placeholder="Enter email address">
            </ejs-textbox>
            <p id="email-help" class="help-text">Use format: user@example.com</p>
            <p v-if="emailError" id="email-error" class="error-text" role="alert">
              Please enter a valid email
            </p>
          </div>

          <div class="form-group">
            <label for="phone">Phone:</label>
            <ejs-textbox
              id="phone"
              v-model="formData.phone"
              type="tel"
              aria-label="Phone number"
              aria-describedby="phone-help"
              placeholder="(123) 456-7890">
            </ejs-textbox>
            <p id="phone-help" class="help-text">Optional: Include area code</p>
          </div>

          <div class="form-group">
            <label for="message">Message:</label>
            <ejs-textbox
              id="message"
              v-model="formData.message"
              multiline
              aria-label="Message content"
              placeholder="Enter your message">
            </ejs-textbox>
          </div>

          <button type="submit">Submit Form</button>
        </fieldset>
      </form>

      <div v-if="submitted" class="success-message" role="status">
        ✓ Form submitted successfully!
      </div>
    </div>

    <div class="keyboard-section">
      <h4>Keyboard Navigation Demo</h4>
      <p>Try using <kbd>Tab</kbd> to navigate between fields, <kbd>Shift+Tab</kbd> to go back.</p>

      <div class="keyboard-test">
        <div class="field">
          <label for="field1">Field 1:</label>
          <ejs-textbox id="field1" placeholder="Press Tab to next"></ejs-textbox>
        </div>

        <div class="field">
          <label for="field2">Field 2:</label>
          <ejs-textbox id="field2" placeholder="Tab continues here"></ejs-textbox>
        </div>

        <div class="field">
          <label for="field3">Field 3:</label>
          <ejs-textbox id="field3" placeholder="Last field"></ejs-textbox>
        </div>
      </div>
    </div>

    <div class="screen-reader-section">
      <h4>Screen Reader Support</h4>

      <div class="sr-example">
        <label for="sr-test">Screen Reader Test Field:</label>
        <ejs-textbox
          id="sr-test"
          aria-label="Test field with description"
          aria-describedby="sr-description"
          placeholder="Type something">
        </ejs-textbox>
        <p id="sr-description" class="sr-only">
          This is a screen reader description that explains what this field does
        </p>
      </div>
    </div>

    <div class="best-practices">
      <h4>🎯 Accessibility Best Practices</h4>

      <ul>
        <li><strong>Labels:</strong> Always associate labels with form fields using <code>for</code> attribute</li>
        <li><strong>ARIA:</strong> Use aria-required, aria-invalid, aria-describedby for additional context</li>
        <li><strong>Error Messages:</strong> Link errors to fields with aria-describedby</li>
        <li><strong>Keyboard Support:</strong> Ensure Tab navigation works properly</li>
        <li><strong>Color Contrast:</strong> Maintain sufficient contrast ratio (4.5:1 for text)</li>
        <li><strong>Screen Readers:</strong> Use aria-label for icon buttons and aria-live for dynamic content</li>
        <li><strong>Validation:</strong> Display errors alongside the invalid field</li>
        <li><strong>Help Text:</strong> Provide clear instructions using aria-describedby</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      submitted: false,
      nameError: false,
      emailError: false
    }
  },
  methods: {
    submitForm() {
      this.nameError = !this.formData.name;
      this.emailError = !this.isValidEmail(this.formData.email);

      if (!this.nameError && !this.emailError) {
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
          this.formData = { name: '', email: '', phone: '', message: '' };
        }, 2000);
      }
    },
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
}
</script>

<style scoped>
.accessibility-complete {
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

.wcag-section,
.keyboard-section,
.screen-reader-section,
.best-practices {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

form {
  max-width: 500px;
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
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.required {
  color: #dc3545;
}

.help-text {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.error-text {
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
  font-weight: bold;
}

button {
  padding: 12px 24px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

button:hover {
  background: #106ebe;
}

.success-message {
  margin-top: 20px;
  padding: 12px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
}

.keyboard-test {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field label {
  margin-bottom: 5px;
}

.sr-example {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}

kbd {
  padding: 3px 8px;
  background: #f0f0f0;
  border: 1px solid #999;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}

code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}

.best-practices ul {
  margin: 0;
  padding-left: 20px;
}

.best-practices li {
  margin-bottom: 10px;
}
</style>
```
