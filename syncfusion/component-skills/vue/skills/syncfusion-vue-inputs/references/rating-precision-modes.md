# Precision Modes — Syncfusion Vue Rating

## Table of Contents
- [Precision Types](#precision-types)
- [Full Star Rating](#full-star-rating)
- [Half Star Rating](#half-star-rating)
- [Examples](#examples)

---

## Precision Types

Different precision modes:

```vue
<template>
  <div class="precision-demo">
    <div class="example">
      <h4>Full Stars (Default)</h4>
      <p>Only complete stars can be selected</p>
      <ejs-rating 
        :value="3"
        precision="Full">
      </ejs-rating>
    </div>

    <div class="example">
      <h4>Half Stars</h4>
      <p>Half stars can be selected</p>
      <ejs-rating 
        :value="3.5"
        precision="Half">
      </ejs-rating>
    </div>

    <div class="example">
      <h4>Quarter Stars</h4>
      <p>Quarter stars can be selected</p>
      <ejs-rating 
        :value="3.5"
        precision="Quarter">
      </ejs-rating>
    </div>

    <div class="example">
      <h4>Exact Precision</h4>
      <p>Any decimal value can be set</p>
      <ejs-rating 
        :value="3.75"
        precision="Exact">
      </ejs-rating>
    </div>
  </div>
</template>

<script>
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rating': RatingComponent
  }
}
</script>

<style scoped>
.precision-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.example {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example h4 {
  margin-top: 0;
}

.example p {
  margin: 5px 0 15px 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Full Star Rating

Full star mode:

```vue
<template>
  <div class="full-demo">
    <fieldset>
      <legend>Full Star Ratings</legend>
      
      <div class="rating-option">
        <label>Product Quality:</label>
        <ejs-rating 
          :value="fullRatings.quality"
          @change="fullRatings.quality = $event.value"
          precision="Full">
        </ejs-rating>
        <p>{{ fullRatings.quality }}/5 stars</p>
      </div>

      <div class="rating-option">
        <label>Service Quality:</label>
        <ejs-rating 
          :value="fullRatings.service"
          @change="fullRatings.service = $event.value"
          precision="Full">
        </ejs-rating>
        <p>{{ fullRatings.service }}/5 stars</p>
      </div>

      <div class="rating-option">
        <label>Overall Satisfaction:</label>
        <ejs-rating 
          :value="fullRatings.satisfaction"
          @change="fullRatings.satisfaction = $event.value"
          precision="Full">
        </ejs-rating>
        <p>{{ fullRatings.satisfaction }}/5 stars</p>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rating': RatingComponent
  },
  data() {
    return {
      fullRatings: {
        quality: 0,
        service: 0,
        satisfaction: 0
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

.rating-option {
  margin-bottom: 20px;
}

.rating-option:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

p {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: #666;
}
</style>
```

---

## Half Star Rating

Half star mode:

```vue
<template>
  <div class="half-demo">
    <fieldset>
      <legend>Half Star Ratings</legend>
      
      <div class="rating-option">
        <label>Food Quality:</label>
        <ejs-rating 
          :value="halfRatings.food"
          @change="halfRatings.food = $event.value"
          precision="Half">
        </ejs-rating>
        <p>{{ halfRatings.food }}/5 stars</p>
      </div>

      <div class="rating-option">
        <label>Atmosphere:</label>
        <ejs-rating 
          :value="halfRatings.atmosphere"
          @change="halfRatings.atmosphere = $event.value"
          precision="Half">
        </ejs-rating>
        <p>{{ halfRatings.atmosphere }}/5 stars</p>
      </div>

      <div class="rating-option">
        <label>Service:</label>
        <ejs-rating 
          :value="halfRatings.service"
          @change="halfRatings.service = $event.value"
          precision="Half">
        </ejs-rating>
        <p>{{ halfRatings.service }}/5 stars</p>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rating': RatingComponent
  },
  data() {
    return {
      halfRatings: {
        food: 0,
        atmosphere: 0,
        service: 0
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

.rating-option {
  margin-bottom: 20px;
}

.rating-option:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

p {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: #666;
}
</style>
```

---

## Examples

### Complete Precision Modes Demo

```vue
<template>
  <div class="precision-demo-complete">
    <h3>Rating Precision Modes</h3>

    <div class="config-section">
      <h4>Precision Mode Selector</h4>

      <div class="mode-selector">
        <button
          v-for="mode in modes"
          :key="mode"
          @click="selectedMode = mode"
          :class="{ active: selectedMode === mode }">
          {{ mode }}
        </button>
      </div>

      <div class="mode-description">
        <p>{{ getModeDescription() }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h4>Interactive Demo</h4>

      <div class="demo-box">
        <label>Try clicking on the stars:</label>
        <ejs-rating
          :value="demoValue"
          @change="demoValue = $event.value"
          :precision="selectedMode">
        </ejs-rating>
        <p class="current-value">Current value: {{ demoValue }}</p>
      </div>
    </div>

    <div class="comparison-section">
      <h4>Precision Mode Comparison</h4>

      <table class="comparison-table">
        <thead>
          <tr>
            <th>Mode</th>
            <th>Description</th>
            <th>Example Value</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Full</strong></td>
            <td>Only complete stars</td>
            <td>3.0</td>
            <td>
              <ejs-rating :value="3" precision="Full" read-only></ejs-rating>
            </td>
          </tr>
          <tr>
            <td><strong>Half</strong></td>
            <td>Half stars allowed</td>
            <td>3.5</td>
            <td>
              <ejs-rating :value="3.5" precision="Half" read-only></ejs-rating>
            </td>
          </tr>
          <tr>
            <td><strong>Quarter</strong></td>
            <td>Quarter stars allowed</td>
            <td>3.75</td>
            <td>
              <ejs-rating :value="3.75" precision="Quarter" read-only></ejs-rating>
            </td>
          </tr>
          <tr>
            <td><strong>Exact</strong></td>
            <td>Any decimal value</td>
            <td>3.33</td>
            <td>
              <ejs-rating :value="3.33" precision="Exact" read-only></ejs-rating>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="use-cases">
      <h4>Real-World Use Cases</h4>

      <div class="use-case">
        <h5>🏨 Hotel Ratings (Half Stars)</h5>
        <p>Hotels often use half-star ratings for more detailed feedback</p>
        <ejs-rating :value="4.5" precision="Half" read-only></ejs-rating>
        <p class="example-text">4.5/5.0 Average Rating (2,345 reviews)</p>
      </div>

      <div class="use-case">
        <h5>📱 App Store Ratings (Full Stars)</h5>
        <p>App stores typically use full-star ratings for simplicity</p>
        <ejs-rating :value="4" precision="Full" read-only></ejs-rating>
        <p class="example-text">4/5 Rating (156,789 ratings)</p>
      </div>

      <div class="use-case">
        <h5>⭐ Fine-Grained Review (Exact)</h5>
        <p>Product reviews that need precise decimal ratings</p>
        <ejs-rating :value="4.7" precision="Exact" read-only></ejs-rating>
        <p class="example-text">4.7/5.0 Average Rating</p>
      </div>

      <div class="use-case">
        <h5>🍽️ Restaurant Survey (Quarter Stars)</h5>
        <p>Restaurant surveys using quarter-star increments</p>
        <ejs-rating :value="4.25" precision="Quarter" read-only></ejs-rating>
        <p class="example-text">4.25/5.0 Food Quality Rating</p>
      </div>
    </div>

    <div class="feature-table">
      <h4>Precision Features Comparison</h4>

      <table class="features">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Full</th>
            <th>Half</th>
            <th>Quarter</th>
            <th>Exact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Whole Stars</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Half Stars</td>
            <td></td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Quarter Stars</td>
            <td></td>
            <td></td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Any Decimal</td>
            <td></td>
            <td></td>
            <td></td>
            <td>✓</td>
          </tr>
          <tr>
            <td>Simplicity</td>
            <td>★★★★★</td>
            <td>★★★★</td>
            <td>★★★</td>
            <td>★★</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rating': RatingComponent
  },
  data() {
    return {
      modes: ['Full', 'Half', 'Quarter', 'Exact'],
      selectedMode: 'Full',
      demoValue: 3,
      descriptions: {
        Full: 'Full precision allows only whole star ratings (1, 2, 3, 4, 5). Best for simple, discrete ratings.',
        Half: 'Half precision allows 0.5 increments (1, 1.5, 2, 2.5, etc.). Commonly used for product reviews.',
        Quarter: 'Quarter precision allows 0.25 increments (1, 1.25, 1.5, 1.75, 2, etc.). Provides fine-grained control.',
        Exact: 'Exact precision allows any decimal value. Useful for computed average ratings that may have arbitrary decimals.'
      }
    }
  },
  methods: {
    getModeDescription() {
      return this.descriptions[this.selectedMode];
    }
  }
}
</script>

<style scoped>
.precision-demo-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin: 20px 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

h5 {
  margin: 0 0 8px 0;
}

.config-section,
.demo-section,
.comparison-section,
.use-cases,
.feature-table {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.mode-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

button {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background: #0078d4;
  color: white;
  border-color: #0078d4;
}

.mode-description {
  padding: 12px;
  background: #f0f7ff;
  border-left: 4px solid #0078d4;
  border-radius: 4px;
}

.demo-box {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

.current-value {
  margin-top: 15px;
  font-weight: bold;
  color: #0078d4;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.comparison-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.comparison-table tr:hover {
  background: #f9f9f9;
}

.use-case {
  padding: 15px;
  margin-bottom: 15px;
  background: #f9f9f9;
  border-left: 4px solid #0078d4;
  border-radius: 4px;
}

.use-case:last-child {
  margin-bottom: 0;
}

.example-text {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.features {
  width: 100%;
  border-collapse: collapse;
}

.features th,
.features td {
  padding: 12px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.features th {
  background: #f5f5f5;
  font-weight: bold;
}

.features td:first-child {
  text-align: left;
  font-weight: bold;
}

.features tr:hover {
  background: #f9f9f9;
}
</style>
```
