# Styling and Appearance — Syncfusion Vue TextArea

## Table of Contents
- [CSS Customization](#css-customization)
- [Theme Variants](#theme-variants)
- [Size Variants](#size-variants)
- [Examples](#examples)

---

## CSS Customization

Apply custom CSS classes to textarea:

```vue
<template>
  <div class="styling-demo">
    <fieldset>
      <legend>CSS Customization</legend>

      <div class="form-group">
        <label for="default-style">Default Style:</label>
        <textarea
          id="default-style"
          v-model="defaultText"
          rows="3"
          placeholder="Default appearance">
        </textarea>
      </div>

      <div class="form-group">
        <label for="rounded">Rounded Corners:</label>
        <textarea
          id="rounded"
          v-model="roundedText"
          class="rounded-style"
          rows="3"
          placeholder="Rounded corners">
        </textarea>
      </div>

      <div class="form-group">
        <label for="shadow">With Shadow:</label>
        <textarea
          id="shadow"
          v-model="shadowText"
          class="shadow-style"
          rows="3"
          placeholder="Has shadow effect">
        </textarea>
      </div>

      <div class="form-group">
        <label for="gradient">Gradient Border:</label>
        <textarea
          id="gradient"
          v-model="gradientText"
          class="gradient-style"
          rows="3"
          placeholder="Gradient border">
        </textarea>
      </div>

      <div class="form-group">
        <label for="minimal">Minimal Style:</label>
        <textarea
          id="minimal"
          v-model="minimalText"
          class="minimal-style"
          rows="3"
          placeholder="Minimal border">
        </textarea>
      </div>

      <div class="form-group">
        <label for="underline">Underline Only:</label>
        <textarea
          id="underline"
          v-model="underlineText"
          class="underline-style"
          rows="3"
          placeholder="Underline only">
        </textarea>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaStylingDemo',
  data() {
    return {
      defaultText: '',
      roundedText: '',
      shadowText: '',
      gradientText: '',
      minimalText: '',
      underlineText: ''
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
  transition: all 0.2s;
}

.rounded-style {
  border-radius: 20px;
  border: 2px solid #0078d4;
  padding: 12px 20px;
}

.rounded-style:focus {
  border-color: #106ebe;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}

.shadow-style {
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.shadow-style:focus {
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.2);
  border-color: #0078d4;
}

.gradient-style {
  border: 2px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #0078d4, #00b294) border-box;
  border-radius: 8px;
}

.gradient-style:focus {
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #106ebe, #00a085) border-box;
}

.minimal-style {
  border: none;
  border-bottom: 2px solid #e0e0e0;
  border-radius: 0;
  background: #fafafa;
  padding-left: 0;
}

.minimal-style:focus {
  border-bottom-color: #0078d4;
  background: white;
  outline: none;
}

.underline-style {
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 0;
  padding: 10px 0;
  background: transparent;
}

.underline-style:focus {
  border-bottom-color: #0078d4;
  outline: none;
}
</style>
```

---

## Theme Variants

Different color themes and states:

```vue
<template>
  <div class="theme-variants">
    <h4>Theme Variants</h4>

    <div class="theme-section">
      <h5>Primary Theme</h5>
      <textarea
        v-model="primaryText"
        class="theme-primary"
        rows="2"
        placeholder="Primary theme">
      </textarea>
    </div>

    <div class="theme-section">
      <h5>Success Theme</h5>
      <textarea
        v-model="successText"
        class="theme-success"
        rows="2"
        placeholder="Success theme">
      </textarea>
    </div>

    <div class="theme-section">
      <h5>Warning Theme</h5>
      <textarea
        v-model="warningText"
        class="theme-warning"
        rows="2"
        placeholder="Warning theme">
      </textarea>
    </div>

    <div class="theme-section">
      <h5>Error Theme</h5>
      <textarea
        v-model="errorText"
        class="theme-error"
        rows="2"
        placeholder="Error theme">
      </textarea>
    </div>

    <div class="theme-section">
      <h5>Info Theme</h5>
      <textarea
        v-model="infoText"
        class="theme-info"
        rows="2"
        placeholder="Info theme">
      </textarea>
    </div>

    <div class="theme-section">
      <h5>Dark Theme</h5>
      <textarea
        v-model="darkText"
        class="theme-dark"
        rows="2"
        placeholder="Dark theme">
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaThemes',
  data() {
    return {
      primaryText: '',
      successText: '',
      warningText: '',
      errorText: '',
      infoText: '',
      darkText: ''
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

.theme-section {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  transition: all 0.2s;
}

textarea:focus {
  outline: none;
}

.theme-primary {
  border-color: #0078d4;
  background: #f0f7ff;
}

.theme-primary:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
}

.theme-success {
  border-color: #28a745;
  background: #f0fff4;
}

.theme-success:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
}

.theme-warning {
  border-color: #ffc107;
  background: #fffbf0;
}

.theme-warning:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.2);
}

.theme-error {
  border-color: #dc3545;
  background: #fff5f5;
}

.theme-error:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);
}

.theme-info {
  border-color: #17a2b8;
  background: #f0f9fb;
}

.theme-info:focus {
  background: white;
  box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.2);
}

.theme-dark {
  border-color: #343a40;
  background: #343a40;
  color: white;
}

.theme-dark::placeholder {
  color: #adb5bd;
}

.theme-dark:focus {
  background: #23272b;
  box-shadow: 0 0 0 3px rgba(52, 58, 64, 0.3);
}
</style>
```

---

## Size Variants

Different size options:

```vue
<template>
  <div class="size-variants">
    <h4>Size Variants</h4>

    <div class="size-section">
      <h5>Small</h5>
      <textarea
        v-model="smallText"
        class="size-small"
        rows="2"
        placeholder="Small textarea">
      </textarea>
    </div>

    <div class="size-section">
      <h5>Medium (Default)</h5>
      <textarea
        v-model="mediumText"
        class="size-medium"
        rows="3"
        placeholder="Medium textarea">
      </textarea>
    </div>

    <div class="size-section">
      <h5>Large</h5>
      <textarea
        v-model="largeText"
        class="size-large"
        rows="4"
        placeholder="Large textarea">
      </textarea>
    </div>

    <div class="size-section">
      <h5>Extra Large</h5>
      <textarea
        v-model="xlText"
        class="size-xl"
        rows="5"
        placeholder="Extra large textarea">
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaSizes',
  data() {
    return {
      smallText: '',
      mediumText: '',
      largeText: '',
      xlText: ''
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

.size-section {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

textarea {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.size-small {
  padding: 6px 10px;
  font-size: 12px;
  min-height: 60px;
}

.size-medium {
  padding: 10px;
  font-size: 14px;
  min-height: 80px;
}

.size-large {
  padding: 14px;
  font-size: 16px;
  min-height: 120px;
}

.size-xl {
  padding: 18px;
  font-size: 18px;
  min-height: 160px;
  line-height: 1.6;
}
</style>
```

---

## Examples

### Complete Styling Showcase

```vue
<template>
  <div class="styling-complete">
    <h3>Styling and Appearance</h3>

    <div class="showcase-grid">
      <div class="showcase-card">
        <h4>Modern Card</h4>
        <textarea
          v-model="card1"
          class="modern-card"
          rows="4"
          placeholder="Modern card style">
        </textarea>
      </div>

      <div class="showcase-card">
        <h4>Neumorphic</h4>
        <textarea
          v-model="card2"
          class="neumorphic"
          rows="4"
          placeholder="Neumorphic style">
        </textarea>
      </div>

      <div class="showcase-card">
        <h4>Glassmorphism</h4>
        <textarea
          v-model="card3"
          class="glass"
          rows="4"
          placeholder="Glassmorphism">
        </textarea>
      </div>

      <div class="showcase-card">
        <h4>Outlined</h4>
        <textarea
          v-model="card4"
          class="outlined"
          rows="4"
          placeholder="Outlined style">
        </textarea>
      </div>

      <div class="showcase-card">
        <h4>Filled</h4>
        <textarea
          v-model="card5"
          class="filled"
          rows="4"
          placeholder="Filled style">
        </textarea>
      </div>

      <div class="showcase-card">
        <h4>Disabled State</h4>
        <textarea
          v-model="card6"
          class="disabled-state"
          rows="4"
          placeholder="Disabled"
          disabled>
        </textarea>
      </div>
    </div>

    <div class="state-demo">
      <h4>State Variations</h4>
      <div class="state-grid">
        <div class="state-item">
          <label>Normal:</label>
          <textarea v-model="normal" rows="2" class="state-normal" placeholder="Normal"></textarea>
        </div>
        <div class="state-item">
          <label>Focused:</label>
          <textarea v-model="focused" rows="2" class="state-focused" placeholder="Click to focus"></textarea>
        </div>
        <div class="state-item">
          <label>Filled:</label>
          <textarea v-model="filled" rows="2" class="state-filled" placeholder="Filled"></textarea>
        </div>
        <div class="state-item">
          <label>Read-only:</label>
          <textarea v-model="readonly" rows="2" class="state-readonly" readonly></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaStylingComplete',
  data() {
    return {
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      card5: '',
      card6: 'This is disabled and cannot be edited.',
      normal: '',
      focused: '',
      filled: 'This has content',
      readonly: 'Read-only content that cannot be modified.'
    }
  }
}
</script>

<style scoped>
.styling-complete {
  padding: 20px;
  max-width: 1100px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.showcase-card {
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

textarea {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.modern-card {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.modern-card:focus {
  border-color: #0078d4;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.15);
  outline: none;
}

.neumorphic {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #e0e5ec;
  box-shadow: inset 4px 4px 8px #b8bdc4, inset -4px -4px 8px #ffffff;
}

.neumorphic:focus {
  outline: none;
  box-shadow: inset 6px 6px 10px #a8adb4, inset -6px -6px 10px #ffffff;
}

.glass {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #333;
}

.glass:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border-color: rgba(0, 120, 212, 0.5);
}

.outlined {
  padding: 12px;
  border: 2px solid #0078d4;
  border-radius: 4px;
  background: transparent;
}

.outlined:focus {
  background: #f0f7ff;
  outline: none;
}

.filled {
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: #e3f2fd;
}

.filled:focus {
  background: #bbdefb;
  border-color: #0078d4;
  outline: none;
}

.disabled-state {
  padding: 12px;
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.state-demo {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.state-item label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.state-normal {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background: white;
}

.state-focused {
  padding: 8px;
  border: 2px solid #0078d4;
  border-radius: 3px;
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
}

.state-filled {
  padding: 8px;
  border: 1px solid #28a745;
  border-radius: 3px;
  background: #f0fff4;
}

.state-readonly {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background: #f5f5f5;
  color: #666;
}

.state-normal:focus,
.state-focused:focus,
.state-filled:focus {
  outline: none;
}
</style>
```
