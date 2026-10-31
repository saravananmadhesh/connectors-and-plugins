# API Reference — Syncfusion Vue RangeSlider

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Examples](#examples)

---

## Properties

Complete RangeSlider API:

```vue
<template>
  <div class="api-reference">
    <fieldset>
      <legend>RangeSlider API Properties</legend>

      <div class="property-table-wrapper">
        <h4>All Properties</h4>
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
              <td><code>value</code></td>
              <td>number | number[]</td>
              <td>null</td>
              <td>Current value or [start, end] for Range type</td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>string</td>
              <td>Default</td>
              <td>Slider type: Default, MinRange, Range</td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td>number</td>
              <td>0</td>
              <td>Minimum value</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td>number</td>
              <td>100</td>
              <td>Maximum value</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td>number</td>
              <td>1</td>
              <td>Step increment</td>
            </tr>
            <tr>
              <td><code>orientation</code></td>
              <td>string</td>
              <td>Horizontal</td>
              <td>Orientation: Horizontal, Vertical</td>
            </tr>
            <tr>
              <td><code>tooltip</code></td>
              <td>object</td>
              <td>{ isVisible: false }</td>
              <td>Tooltip configuration</td>
            </tr>
            <tr>
              <td><code>ticks</code></td>
              <td>object</td>
              <td>{ placement: 'before' }</td>
              <td>Tick marks configuration</td>
            </tr>
            <tr>
              <td><code>limits</code></td>
              <td>object</td>
              <td>{ enabled: false }</td>
              <td>Handle movement limits</td>
            </tr>
            <tr>
              <td><code>colorRange</code></td>
              <td>object[]</td>
              <td>[]</td>
              <td>Color zones on the track</td>
            </tr>
            <tr>
              <td><code>customValues</code></td>
              <td>array</td>
              <td>null</td>
              <td>Custom value scale</td>
            </tr>
            <tr>
              <td><code>showButtons</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Show increment/decrement buttons</td>
            </tr>
            <tr>
              <td><code>enableAnimation</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Enable handle animation</td>
            </tr>
            <tr>
              <td><code>enabled</code></td>
              <td>boolean</td>
              <td>true</td>
              <td>Enable or disable slider</td>
            </tr>
            <tr>
              <td><code>readonly</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Read-only mode</td>
            </tr>
            <tr>
              <td><code>cssClass</code></td>
              <td>string</td>
              <td>''</td>
              <td>Custom CSS classes</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>number | string</td>
              <td>null</td>
              <td>Slider width</td>
            </tr>
            <tr>
              <td><code>enableRtl</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Right-to-left mode</td>
            </tr>
            <tr>
              <td><code>enablePersistence</code></td>
              <td>boolean</td>
              <td>false</td>
              <td>Persist state across reloads</td>
            </tr>
            <tr>
              <td><code>locale</code></td>
              <td>string</td>
              <td>''</td>
              <td>Locale string</td>
            </tr>
          </tbody>
        </table>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'RangeSliderAPI'
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

.property-table-wrapper {
  overflow-x: auto;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.api-table th,
.api-table td {
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.api-table th {
  background: #f0f7ff;
  font-weight: bold;
  position: sticky;
  top: 0;
}

code {
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 3px;
  font-family: monospace;
  font-size: 11px;
}
</style>
```

---

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `reposition()` | - | void | Recalculate handle positions |
| `destroy()` | - | void | Destroy the component |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `change` | `SliderChangeEventArgs` | Fires while dragging (continuous) |
| `changed` | `SliderChangeEventArgs` | Fires after drag completes |
| `created` | `Object` | Fires after component creation |
| `renderingTicks` | `SliderTickEventArgs` | Custom tick label text |
| `renderedTicks` | `SliderTickRenderedEventArgs` | Post-process tick DOM |
| `tooltipChange` | `SliderTooltipEventArgs` | Customize tooltip text |

---

## Examples

### Complete API Usage

```vue
<template>
  <div class="api-example">
    <h3>RangeSlider API Reference</h3>

    <div class="demo-section">
      <h4>Property Examples</h4>

      <div class="example-group">
        <label>Basic Slider (min=0, max=100, value=50):</label>
        <input
          type="range"
          v-model.number="value1"
          min="0"
          max="100"
          step="1"
          class="slider">
        <p>Value: <strong>{{ value1 }}</strong></p>
      </div>

      <div class="example-group">
        <label>Range Slider (min=0, max=1000, step=50):</label>
        <div class="range-container">
          <input
            type="range"
            v-model.number="rangeStart"
            min="0"
            max="1000"
            step="50"
            class="slider">
          <input
            type="range"
            v-model.number="rangeEnd"
            min="0"
            max="1000"
            step="50"
            class="slider">
        </div>
        <p>Range: <strong>{{ rangeStart }} - {{ rangeEnd }}</strong></p>
      </div>

      <div class="example-group">
        <label>Step Slider (step=5):</label>
        <input
          type="range"
          v-model.number="stepValue"
          min="0"
          max="100"
          step="5"
          class="slider">
        <p>Value: <strong>{{ stepValue }}</strong></p>
      </div>

      <div class="example-group">
        <label>Disabled Slider:</label>
        <input
          type="range"
          value="50"
          min="0"
          max="100"
          disabled
          class="slider">
      </div>
    </div>

    <div class="api-summary">
      <h4>API Summary</h4>
      <ul>
        <li><strong>Properties:</strong> 20+ configurable options</li>
        <li><strong>Methods:</strong> reposition(), destroy()</li>
        <li><strong>Events:</strong> change, changed, created, renderingTicks, renderedTicks, tooltipChange</li>
        <li><strong>Types:</strong> Default, MinRange, Range</li>
        <li><strong>Orientation:</strong> Horizontal, Vertical</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APIExample',
  data() {
    return {
      value1: 50,
      rangeStart: 200,
      rangeEnd: 800,
      stepValue: 25
    }
  }
}
</script>

<style scoped>
.api-example {
  padding: 20px;
  max-width: 800px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 12px 0; color: #0078d4; }
p { margin: 8px 0 0 0; font-size: 13px; }

.demo-section {
  margin-bottom: 20px;
}

.example-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 13px;
}

.slider {
  width: 100%;
  margin: 8px 0;
}

.range-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.api-summary {
  padding: 15px;
  background: #f0f7ff;
  border-radius: 4px;
}

.api-summary ul {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.6;
}

.api-summary li {
  margin-bottom: 4px;
}
</style>
```
