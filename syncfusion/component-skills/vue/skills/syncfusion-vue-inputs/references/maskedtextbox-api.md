# API Reference — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Examples](#examples)

---

## Properties

Complete list of MaskedTextBox properties:

```vue
<template>
  <div class="api-demo">
    <fieldset>
      <legend>MaskedTextBox API Properties</legend>

      <div class="property-section">
        <h4>Core Properties</h4>
        <table class="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>mask</code></td>
              <td>string</td>
              <td>null</td>
              <td>Mask pattern for input format</td>
            </tr>
            <tr>
              <td><code>value</code></td>
              <td>string</td>
              <td>null</td>
              <td>Current value of the input</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>string</td>
              <td>null</td>
              <td>Placeholder text</td>
            </tr>
            <tr>
              <td><code>promptChar</code></td>
              <td>string</td>
              <td>'_'</td>
              <td>Prompt character for empty mask positions</td>
            </tr>
            <tr>
              <td><code>customCharacters</code></td>
              <td>object</td>
              <td>null</td>
              <td>Custom character mappings</td>
            </tr>
            <tr>
              <td><code>floatLabelType</code></td>
              <td>string</td>
              <td>Never</td>
              <td>Floating label behavior: Never, Always, Auto</td>
            </tr>
            <tr>
              <td><code>enabled</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Enable or disable input</td>
            </tr>
            <tr>
              <td><code>readonly</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Make input read-only</td>
            </tr>
            <tr>
              <td><code>showClearButton</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Show clear button</td>
            </tr>
            <tr>
              <td><code>cssClass</code></td>
              <td>string</td>
              <td>''</td>
              <td>Custom CSS classes</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>number|string</td>
              <td>null</td>
              <td>Width of the component</td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'MaskedTextBoxAPI'
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

h4 {
  margin: 0 0 10px 0;
  color: #0078d4;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.api-table th,
.api-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.api-table th {
  background: #f0f7ff;
  font-weight: bold;
}

code {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}
</style>
```

---

## Methods

Available MaskedTextBox methods:

```vue
<template>
  <div class="methods-section">
    <h4>Methods</h4>
    <table class="api-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Parameters</th>
          <th>Returns</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>getMaskedValue()</code></td>
          <td>-</td>
          <td>string</td>
          <td>Get the masked value (with prompt chars)</td>
        </tr>
        <tr>
          <td><code>getValue()</code></td>
          <td>-</td>
          <td>string</td>
          <td>Get the raw value (without prompt chars)</td>
        </tr>
        <tr>
          <td><code>setValue(value)</code></td>
          <td>string</td>
          <td>void</td>
          <td>Set the value programmatically</td>
        </tr>
        <tr>
          <td><code>focusIn()</code></td>
          <td>-</td>
          <td>void</td>
          <td>Set focus to the input</td>
        </tr>
        <tr>
          <td><code>focusOut()</code></td>
          <td>-</td>
          <td>void</td>
          <td>Remove focus from the input</td>
        </tr>
        <tr>
          <td><code>getPersistData()</code></td>
          <td>-</td>
          <td>string</td>
          <td>Get persistence data</td>
        </tr>
        <tr>
          <td><code>addAttributes(attributes)</code></td>
          <td>object</td>
          <td>void</td>
          <td>Add HTML attributes dynamically</td>
        </tr>
        <tr>
          <td><code>removeAttributes(attributes)</code></td>
          <td>string[]</td>
          <td>void</td>
          <td>Remove HTML attributes</td>
        </tr>
        <tr>
          <td><code>destroy()</code></td>
          <td>-</td>
          <td>void</td>
          <td>Destroy the component</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Methods'
}
</script>

<style scoped>
h4 { margin: 0 0 10px 0; color: #0078d4; }

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.api-table th,
.api-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.api-table th {
  background: #f0f7ff;
  font-weight: bold;
}

code {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}
</style>
```

---

## Events

MaskedTextBox events:

| Event | Args | Description |
|-------|------|-------------|
| `change` | `ChangedEventArgs` | Fires when value changes |
| `focus` | `FocusInEventArgs` | Fires on focus |
| `blur` | `FocusOutEventArgs` | Fires on blur |
| `created` | `Object` | Fires after component creation |
| `destroyed` | `Object` | Fires on component destroy |

---

## Examples

### Complete API Usage

```vue
<template>
  <div class="api-example">
    <h3>MaskedTextBox API Reference</h3>

    <div class="demo-section">
      <h4>Property Usage Examples</h4>
      
      <div class="example-group">
        <label>Phone Number (mask="000-000-0000"):</label>
        <input
          type="text"
          v-model="phone"
          placeholder="___-___-____"
          maxlength="12"
          class="masked-input">
      </div>

      <div class="example-group">
        <label>SSN (mask="000-00-0000"):</label>
        <input
          type="text"
          v-model="ssn"
          placeholder="___-__-____"
          maxlength="11"
          class="masked-input">
      </div>

      <div class="example-group">
        <label>Date (mask="00/00/0000"):</label>
        <input
          type="text"
          v-model="date"
          placeholder="__/__/____"
          maxlength="10"
          class="masked-input">
      </div>

      <div class="example-group">
        <label>ZIP Code (mask="00000"):</label>
        <input
          type="text"
          v-model="zip"
          placeholder="_____"
          maxlength="5"
          class="masked-input">
      </div>
    </div>

    <div class="values-display">
      <h4>Current Values:</h4>
      <pre>{{ JSON.stringify({ phone, ssn, date, zip }, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APIExample',
  data() {
    return {
      phone: '',
      ssn: '',
      date: '',
      zip: ''
    }
  }
}
</script>

<style scoped>
.api-example {
  padding: 20px;
  max-width: 700px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 12px 0; color: #0078d4; }

.demo-section {
  margin-bottom: 20px;
}

.example-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.masked-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: monospace;
  font-size: 14px;
  letter-spacing: 1px;
}

.masked-input:focus {
  outline: 2px solid #0078d4;
  outline-offset: -1px;
}

.values-display {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
}

.values-display pre {
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
}
</style>
```
