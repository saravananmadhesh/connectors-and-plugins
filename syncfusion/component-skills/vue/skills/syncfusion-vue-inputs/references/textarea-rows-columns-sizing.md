# Rows, Columns, and Sizing — Syncfusion Vue TextArea

## Table of Contents
- [Rows Configuration](#rows-configuration)
- [Columns Configuration](#columns-configuration)
- [Responsive Sizing](#responsive-sizing)
- [Examples](#examples)

---

## Rows Configuration

Configure visible height with rows:

```vue
<template>
  <div class="rows-demo">
    <fieldset>
      <legend>Rows Configuration</legend>

      <div class="form-group">
        <label for="rows-2">2 Rows (Small):</label>
        <textarea
          id="rows-2"
          v-model="text2"
          rows="2"
          placeholder="2 rows">
        </textarea>
      </div>

      <div class="form-group">
        <label for="rows-3">3 Rows:</label>
        <textarea
          id="rows-3"
          v-model="text3"
          rows="3"
          placeholder="3 rows">
        </textarea>
      </div>

      <div class="form-group">
        <label for="rows-5">5 Rows (Default):</label>
        <textarea
          id="rows-5"
          v-model="text5"
          rows="5"
          placeholder="5 rows">
        </textarea>
      </div>

      <div class="form-group">
        <label for="rows-8">8 Rows (Large):</label>
        <textarea
          id="rows-8"
          v-model="text8"
          rows="8"
          placeholder="8 rows">
        </textarea>
      </div>

      <div class="form-group">
        <label for="rows-15">15 Rows (Extra Large):</label>
        <textarea
          id="rows-15"
          v-model="text15"
          rows="15"
          placeholder="15 rows">
        </textarea>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaRows',
  data() {
    return {
      text2: '',
      text3: '',
      text5: '',
      text8: '',
      text15: ''
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
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}
</style>
```

---

## Columns Configuration

Set visible width with cols:

```vue
<template>
  <div class="cols-demo">
    <h4>Columns Configuration</h4>

    <div class="form-group">
      <label>20 columns (narrow):</label>
      <textarea v-model="col20" cols="20" rows="2" placeholder="20 cols"></textarea>
    </div>

    <div class="form-group">
      <label>40 columns (medium):</label>
      <textarea v-model="col40" cols="40" rows="2" placeholder="40 cols"></textarea>
    </div>

    <div class="form-group">
      <label>60 columns (wide):</label>
      <textarea v-model="col60" cols="60" rows="2" placeholder="60 cols"></textarea>
    </div>

    <div class="form-group">
      <label>Full width (no cols):</label>
      <textarea v-model="colFull" rows="2" placeholder="Full width with CSS" class="full-width"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaColumns',
  data() {
    return {
      col20: '',
      col40: '',
      col60: '',
      colFull: ''
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.form-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

textarea {
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 13px;
}

textarea:focus {
  outline: none;
  border-color: #0078d4;
}

.full-width {
  width: 100%;
}
</style>
```

---

## Responsive Sizing

Responsive textarea sizing:

```vue
<template>
  <div class="responsive-sizing">
    <fieldset>
      <legend>Responsive Sizing</legend>

      <div class="form-group">
        <label for="responsive-1">Responsive (50% width on mobile, 100% on desktop):</label>
        <textarea
          id="responsive-1"
          v-model="responsive1"
          rows="4"
          class="responsive-textarea"
          placeholder="Resizes with viewport">
        </textarea>
      </div>

      <div class="form-group">
        <label for="responsive-2">Fixed height with auto-grow:</label>
        <textarea
          id="responsive-2"
          v-model="responsive2"
          rows="3"
          class="auto-grow"
          placeholder="Type to see auto-grow">
        </textarea>
      </div>

      <div class="form-group">
        <label for="responsive-3">Min/Max height constraint:</label>
        <textarea
          id="responsive-3"
          v-model="responsive3"
          rows="4"
          class="min-max-height"
          placeholder="Min 100px, Max 200px">
        </textarea>
      </div>

      <div class="form-group">
        <label for="responsive-4">Fluid (no fixed size):</label>
        <textarea
          id="responsive-4"
          v-model="responsive4"
          class="fluid"
          placeholder="Resizable in all directions">
        </textarea>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextAreaResponsive',
  data() {
    return {
      responsive1: '',
      responsive2: '',
      responsive3: '',
      responsive4: ''
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

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

textarea {
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

.responsive-textarea {
  width: 50%;
}

@media (max-width: 768px) {
  .responsive-textarea {
    width: 100%;
  }
}

.auto-grow {
  width: 100%;
  min-height: 80px;
  resize: none;
  overflow: hidden;
}

.min-max-height {
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
}

.fluid {
  width: 100%;
  min-height: 100px;
  resize: both;
}
</style>
```

---

## Examples

### Complete Sizing Demo

```vue
<template>
  <div class="sizing-complete">
    <h3>TextArea Sizing Guide</h3>

    <div class="demo-section">
      <h4>Common Use Case Sizes</h4>

      <div class="size-grid">
        <div class="size-card">
          <h5>Comment (3 rows)</h5>
          <textarea
            v-model="comment"
            rows="3"
            class="size-form"
            placeholder="Add a comment...">
          </textarea>
          <p class="info">3 rows × full width</p>
        </div>

        <div class="size-card">
          <h5>Description (5 rows)</h5>
          <textarea
            v-model="description"
            rows="5"
            class="size-form"
            placeholder="Describe...">
          </textarea>
          <p class="info">5 rows × full width</p>
        </div>

        <div class="size-card">
          <h5>Article (10 rows)</h5>
          <textarea
            v-model="article"
            rows="10"
            class="size-form"
            placeholder="Write article...">
          </textarea>
          <p class="info">10 rows × full width</p>
        </div>

        <div class="size-card">
          <h5>Bio (2 rows)</h5>
          <textarea
            v-model="bio"
            rows="2"
            class="size-form"
            placeholder="Short bio">
          </textarea>
          <p class="info">2 rows × full width</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Dynamic Sizing Controls</h4>

      <div class="controls">
        <div class="control-group">
          <label>Rows: <span class="value">{{ dynamicRows }}</span></label>
          <input
            type="range"
            v-model.number="dynamicRows"
            min="1"
            max="20">
        </div>

        <div class="control-group">
          <label>Min Height: <span class="value">{{ minHeight }}px</span></label>
          <input
            type="range"
            v-model.number="minHeight"
            min="50"
            max="300">
        </div>

        <div class="control-group">
          <label>Max Height: <span class="value">{{ maxHeight }}px</span></label>
          <input
            type="range"
            v-model.number="maxHeight"
            min="100"
            max="500">
        </div>
      </div>

      <div class="dynamic-preview">
        <textarea
          v-model="dynamicText"
          :rows="dynamicRows"
          :style="{
            minHeight: minHeight + 'px',
            maxHeight: maxHeight + 'px'
          }"
          placeholder="Adjust the controls to see live sizing">
        </textarea>
        <p class="info">
          Current: {{ dynamicRows }} rows, {{ minHeight }}-{{ maxHeight }}px
        </p>
      </div>
    </div>

    <div class="demo-section">
      <h4>Form Layout Sizes</h4>

      <div class="form-row">
        <div class="form-col">
          <label>Half width (rows=3)</label>
          <textarea v-model="half1" rows="3" class="half-width" placeholder="Half 1"></textarea>
        </div>
        <div class="form-col">
          <label>Half width (rows=3)</label>
          <textarea v-model="half2" rows="3" class="half-width" placeholder="Half 2"></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col-third">
          <label>Third (rows=2)</label>
          <textarea v-model="third1" rows="2" class="third-width" placeholder="Third 1"></textarea>
        </div>
        <div class="form-col-third">
          <label>Third (rows=2)</label>
          <textarea v-model="third2" rows="2" class="third-width" placeholder="Third 2"></textarea>
        </div>
        <div class="form-col-third">
          <label>Third (rows=2)</label>
          <textarea v-model="third3" rows="2" class="third-width" placeholder="Third 3"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextAreaSizingComplete',
  data() {
    return {
      comment: '',
      description: '',
      article: '',
      bio: '',
      dynamicText: '',
      dynamicRows: 5,
      minHeight: 100,
      maxHeight: 300,
      half1: '',
      half2: '',
      third1: '',
      third2: '',
      third3: ''
    }
  }
}
</script>

<style scoped>
.sizing-complete {
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

.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.size-card {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.size-form {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.size-form:focus {
  outline: none;
  border-color: #0078d4;
}

.info {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #666;
  font-style: italic;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.control-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
}

.value {
  color: #0078d4;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
}

.dynamic-preview {
  padding: 15px;
  background: white;
  border-radius: 4px;
}

.dynamic-preview textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-col,
.form-col-third {
  flex: 1;
}

.form-row label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.half-width,
.third-width {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.half-width:focus,
.third-width:focus {
  outline: none;
  border-color: #0078d4;
}
</style>
```
