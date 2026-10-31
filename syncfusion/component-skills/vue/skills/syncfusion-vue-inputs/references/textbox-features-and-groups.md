# Features and Groups — Syncfusion Vue TextBox

## Table of Contents
- [Floating Label Behaviors](#floating-label-behaviors)
- [Icons and Adornments](#icons-and-adornments)
- [Clear Button](#clear-button)
- [Examples](#examples)

---

## Floating Label Behaviors

Control floating label with `floatLabelType` property:

```vue
<template>
  <div class="floating-labels">
    <fieldset>
      <legend>Floating Label Types</legend>

      <div class="form-group">
        <label>Never (No floating):</label>
        <input
          type="text"
          v-model="neverValue"
          placeholder="Enter text"
          class="text-input never">
      </div>

      <div class="form-group">
        <label>Auto (Float on focus/value):</label>
        <input
          type="text"
          v-model="autoValue"
          placeholder="Enter text"
          class="text-input auto">
      </div>

      <div class="form-group">
        <label>Always (Float always):</label>
        <input
          type="text"
          v-model="alwaysValue"
          placeholder="Enter text"
          class="text-input always">
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextBoxFloatingLabels',
  data() {
    return {
      neverValue: '',
      autoValue: 'Has initial value',
      alwaysValue: ''
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
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.text-input {
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #0078d4;
}
</style>
```

---

## Icons and Adornments

Add icons before or after the input:

```vue
<template>
  <div class="icons-adornments">
    <fieldset>
      <legend>Icons and Adornments</legend>

      <div class="form-group">
        <label>Search with icon:</label>
        <div class="input-wrapper">
          <span class="input-icon">🔍</span>
          <input
            type="text"
            v-model="search"
            class="text-input with-icon-left"
            placeholder="Search...">
        </div>
      </div>

      <div class="form-group">
        <label>Email with icon:</label>
        <div class="input-wrapper">
          <span class="input-icon">📧</span>
          <input
            type="email"
            v-model="email"
            class="text-input with-icon-left"
            placeholder="Enter email">
        </div>
      </div>

      <div class="form-group">
        <label>Password with toggle:</label>
        <div class="input-wrapper">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="text-input with-icon-right"
            placeholder="Enter password">
          <button
            @click="showPassword = !showPassword"
            type="button"
            class="toggle-btn">
            {{ showPassword ? '👁️' : '🔒' }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>With clear button:</label>
        <div class="input-wrapper">
          <input
            type="text"
            v-model="clearable"
            class="text-input with-icon-right"
            placeholder="Type to see clear">
          <button
            v-if="clearable"
            @click="clearable = ''"
            type="button"
            class="toggle-btn">
            ✕
          </button>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextBoxIcons',
  data() {
    return {
      search: '',
      email: '',
      password: '',
      showPassword: false,
      clearable: ''
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
  font-size: 13px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 10px;
  font-size: 16px;
  z-index: 1;
  pointer-events: none;
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

.with-icon-left {
  padding-left: 36px;
}

.with-icon-right {
  padding-right: 36px;
}

.toggle-btn {
  position: absolute;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
}

.toggle-btn:hover {
  background: #f0f0f0;
}
</style>
```

---

## Clear Button

Show clear button when input has value:

```vue
<template>
  <div class="clear-button">
    <h4>Clear Button</h4>

    <div class="form-group">
      <label>Type to enable clear:</label>
      <div class="input-wrapper">
        <input
          type="text"
          v-model="text1"
          class="text-input"
          placeholder="Type something...">
        <button
          v-if="text1"
          @click="text1 = ''"
          type="button"
          class="clear-btn"
          title="Clear">
          ✕
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>Another clearable field:</label>
      <div class="input-wrapper">
        <input
          type="text"
          v-model="text2"
          class="text-input"
          placeholder="Type here too">
        <button
          v-if="text2"
          @click="text2 = ''"
          type="button"
          class="clear-btn"
          title="Clear">
          ✕
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>Disabled with value:</label>
      <div class="input-wrapper">
        <input
          type="text"
          v-model="text3"
          class="text-input"
          placeholder="Disabled"
          disabled>
        <button
          v-if="text3"
          type="button"
          class="clear-btn"
          title="Clear"
          disabled>
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxClearButton',
  data() {
    return {
      text1: '',
      text2: '',
      text3: 'Pre-filled value'
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
  font-size: 13px;
}

.input-wrapper {
  position: relative;
}

.text-input {
  width: 100%;
  padding: 10px 36px 10px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
}

.text-input:focus {
  outline: none;
  border-color: #0078d4;
}

.text-input:disabled {
  background: #f5f5f5;
  color: #999;
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.clear-btn:hover:not(:disabled) {
  background: #e0e0e0;
  color: #333;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## Examples

### Complete Features Demo

```vue
<template>
  <div class="features-complete">
    <h3>TextBox Features and Groups</h3>

    <div class="feature-grid">
      <div class="feature-card">
        <h4>Rounded Corner</h4>
        <input
          type="text"
          v-model="rounded"
          class="rounded-input"
          placeholder="Rounded corners">
      </div>

      <div class="feature-card">
        <h4>Small Size</h4>
        <input
          type="text"
          v-model="small"
          class="small-input"
          placeholder="Small size">
      </div>

      <div class="feature-card">
        <h4>Large Size</h4>
        <input
          type="text"
          v-model="large"
          class="large-input"
          placeholder="Large size">
      </div>

      <div class="feature-card">
        <h4>With Validation</h4>
        <input
          type="email"
          v-model="email"
          :class="['validation-input', emailClass]"
          placeholder="email@example.com">
        <p v-if="emailError" class="error-text">{{ emailError }}</p>
        <p v-else-if="email" class="success-text">✓ Valid email</p>
      </div>

      <div class="feature-card">
        <h4>Disabled State</h4>
        <input
          type="text"
          value="Disabled value"
          class="disabled-input"
          disabled>
      </div>

      <div class="feature-card">
        <h4>Read-only State</h4>
        <input
          type="text"
          value="Read-only value"
          class="readonly-input"
          readonly>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextBoxFeaturesComplete',
  data() {
    return {
      rounded: '',
      small: '',
      large: '',
      email: ''
    }
  },
  computed: {
    emailClass() {
      if (!this.email) return '';
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      return valid ? 'is-valid' : 'is-invalid';
    },
    emailError() {
      if (!this.email) return '';
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      return valid ? '' : 'Please enter a valid email';
    }
  }
}
</script>

<style scoped>
.features-complete {
  padding: 20px;
  max-width: 1000px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #333;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-card {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #0078d4;
}

.rounded-input {
  border-radius: 20px;
  padding: 10px 16px;
}

.small-input {
  padding: 6px 8px;
  font-size: 12px;
}

.large-input {
  padding: 14px 12px;
  font-size: 16px;
}

.validation-input.is-valid {
  border-color: #28a745;
  background: #f0fff4;
}

.validation-input.is-invalid {
  border-color: #dc3545;
  background: #fff5f5;
}

.error-text {
  margin: 4px 0 0 0;
  color: #dc3545;
  font-size: 12px;
}

.success-text {
  margin: 4px 0 0 0;
  color: #28a745;
  font-size: 12px;
}

.disabled-input {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.readonly-input {
  background: #fafafa;
  color: #666;
}
</style>
```
