# Selection and Read-Only — Syncfusion Vue Rating

## Table of Contents
- [Selection Modes](#selection-modes)
- [Read-Only Mode](#read-only-mode)
- [Disabled State](#disabled-state)
- [Examples](#examples)

---

## Selection Modes

Different selection modes:

```vue
<template>
  <div class="selection-demo">
    <div class="mode">
      <h4>Single Selection</h4>
      <p>Select only one rating</p>
      <ejs-rating
        :value="singleValue"
        @change="singleValue = $event.value">
      </ejs-rating>
      <p>Selected: {{ singleValue }}/5</p>
    </div>

    <div class="mode">
      <h4>Multiple Selections</h4>
      <p>Rate multiple aspects</p>
      <div class="rating-set">
        <div class="rating-item">
          <label>Quality:</label>
          <ejs-rating
            :value="multipleValues.quality"
            @change="multipleValues.quality = $event.value">
          </ejs-rating>
        </div>
        <div class="rating-item">
          <label>Service:</label>
          <ejs-rating
            :value="multipleValues.service"
            @change="multipleValues.service = $event.value">
          </ejs-rating>
        </div>
      </div>
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
      singleValue: 0,
      multipleValues: {
        quality: 0,
        service: 0
      }
    }
  }
}
</script>

<style scoped>
.selection-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.mode {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.mode h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.mode p {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #666;
}

.rating-set {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rating-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
```

---

## Read-Only Mode

Display-only rating:

```vue
<template>
  <div class="readonly-demo">
    <fieldset>
      <legend>Read-Only Ratings</legend>

      <div class="item">
        <h4>Product Review - Display Only</h4>
        <div class="review-card">
          <h5>Premium Headphones</h5>
          <ejs-rating :value="4.5" read-only precision="Half"></ejs-rating>
          <p class="rating-text">4.5/5 (2,345 reviews)</p>
          <p class="review-text">"Great sound quality and comfortable fit!"</p>
        </div>
      </div>

      <div class="item">
        <h4>Store Performance - Display Only</h4>
        <div class="store-ratings">
          <div class="rating-row">
            <span>Product Quality:</span>
            <ejs-rating :value="5" read-only></ejs-rating>
          </div>
          <div class="rating-row">
            <span>Shipping Speed:</span>
            <ejs-rating :value="4" read-only></ejs-rating>
          </div>
          <div class="rating-row">
            <span>Customer Service:</span>
            <ejs-rating :value="5" read-only></ejs-rating>
          </div>
        </div>
      </div>
    </fieldset>
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
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.item {
  margin-bottom: 25px;
}

.item:last-child {
  margin-bottom: 0;
}

.item h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

.review-card {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.review-card h5 {
  margin: 0 0 10px 0;
}

.rating-text {
  margin: 8px 0;
  font-size: 12px;
  color: #0078d4;
  font-weight: bold;
}

.review-text {
  margin: 8px 0 0 0;
  font-size: 13px;
  font-style: italic;
  color: #666;
}

.store-ratings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 15px;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}
</style>
```

---

## Disabled State

Disabled rating:

```vue
<template>
  <div class="disabled-demo">
    <div class="example">
      <h4>Enabled Rating</h4>
      <ejs-rating
        :value="enabledValue"
        @change="enabledValue = $event.value"
        :enabled="true">
      </ejs-rating>
      <p>You can interact with this rating</p>
    </div>

    <div class="example">
      <h4>Disabled Rating</h4>
      <ejs-rating
        :value="3"
        :enabled="false">
      </ejs-rating>
      <p>This rating is disabled and cannot be changed</p>
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
      enabledValue: 0
    }
  }
}
</script>

<style scoped>
.disabled-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  margin: 12px 0 0 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Examples

### Complete Selection and Read-Only Demo

```vue
<template>
  <div class="selection-readonly-demo">
    <h3>Selection and Read-Only Modes</h3>

    <div class="interactive-section">
      <h4>Interactive Rating Form</h4>

      <form @submit.prevent="submitForm" class="form">
        <fieldset>
          <legend>Leave Your Feedback</legend>

          <div class="form-group">
            <label for="product-quality">Product Quality:</label>
            <ejs-rating
              id="product-quality"
              :value="form.quality"
              @change="form.quality = $event.value"
              :enabled="true">
            </ejs-rating>
            <p class="helper">Click stars to rate quality</p>
          </div>

          <div class="form-group">
            <label for="shipping">Shipping Experience:</label>
            <ejs-rating
              id="shipping"
              :value="form.shipping"
              @change="form.shipping = $event.value"
              :enabled="true">
            </ejs-rating>
            <p class="helper">Click stars to rate shipping</p>
          </div>

          <div class="form-group">
            <label for="support">Customer Support:</label>
            <ejs-rating
              id="support"
              :value="form.support"
              @change="form.support = $event.value"
              :enabled="true">
            </ejs-rating>
            <p class="helper">Click stars to rate support</p>
          </div>

          <button type="submit" :disabled="!isFormValid">Submit Feedback</button>
        </fieldset>
      </form>
    </div>

    <div class="readonly-section">
      <h4>Display Mode (Read-Only)</h4>

      <div class="ratings-display">
        <div class="display-item">
          <h5>Top Product - 5 Stars</h5>
          <ejs-rating :value="5" read-only></ejs-rating>
          <p class="count">98% recommend this product</p>
        </div>

        <div class="display-item">
          <h5>Popular Item - 4.5 Stars</h5>
          <ejs-rating :value="4.5" read-only precision="Half"></ejs-rating>
          <p class="count">4.5 out of 5 (1,234 reviews)</p>
        </div>

        <div class="display-item">
          <h5>Standard Item - 3.5 Stars</h5>
          <ejs-rating :value="3.5" read-only precision="Half"></ejs-rating>
          <p class="count">3.5 out of 5 (456 reviews)</p>
        </div>

        <div class="display-item">
          <h5>Discontinued - 2 Stars</h5>
          <ejs-rating :value="2" read-only></ejs-rating>
          <p class="count">No longer available</p>
        </div>
      </div>
    </div>

    <div class="disabled-section">
      <h4>Disabled State (Cannot Interact)</h4>

      <div class="disabled-demo">
        <fieldset disabled>
          <legend>Disabled Rating Form</legend>

          <div class="form-group">
            <label>Quality:</label>
            <ejs-rating :value="3" :enabled="false"></ejs-rating>
            <p class="helper">This form is disabled</p>
          </div>

          <div class="form-group">
            <label>Service:</label>
            <ejs-rating :value="4" :enabled="false"></ejs-rating>
            <p class="helper">Ratings cannot be changed</p>
          </div>

          <button type="button" disabled>Submit (Disabled)</button>
        </fieldset>
      </div>
    </div>

    <div class="comparison-section">
      <h4>Mode Comparison</h4>

      <table class="comparison">
        <thead>
          <tr>
            <th>Mode</th>
            <th>Enabled</th>
            <th>Read-Only</th>
            <th>User Interaction</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Editable</strong></td>
            <td>✓</td>
            <td></td>
            <td>Full - Click to rate</td>
            <td>Rating input forms</td>
          </tr>
          <tr>
            <td><strong>Read-Only</strong></td>
            <td>✓</td>
            <td>✓</td>
            <td>None - Display only</td>
            <td>Product reviews display</td>
          </tr>
          <tr>
            <td><strong>Disabled</strong></td>
            <td></td>
            <td></td>
            <td>None - Grayed out</td>
            <td>Unavailable forms</td>
          </tr>
          <tr>
            <td><strong>Hover Preview</strong></td>
            <td>✓</td>
            <td></td>
            <td>Hover to preview, click to select</td>
            <td>Interactive rating selection</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="submitted" class="success-message">
      <h4>✓ Feedback Submitted</h4>
      <ul>
        <li>Quality: {{ form.quality }}/5</li>
        <li>Shipping: {{ form.shipping }}/5</li>
        <li>Support: {{ form.support }}/5</li>
        <li>Average: {{ averageRating.toFixed(1) }}/5</li>
      </ul>
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
      form: {
        quality: 0,
        shipping: 0,
        support: 0
      },
      submitted: false
    }
  },
  computed: {
    isFormValid() {
      return this.form.quality > 0 && this.form.shipping > 0 && this.form.support > 0;
    },
    averageRating() {
      return (this.form.quality + this.form.shipping + this.form.support) / 3;
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
          this.form = { quality: 0, shipping: 0, support: 0 };
        }, 3000);
      }
    }
  }
}
</script>

<style scoped>
.selection-readonly-demo {
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

h5 {
  margin: 0 0 10px 0;
}

.interactive-section,
.readonly-section,
.disabled-section,
.comparison-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.form {
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

.helper {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #666;
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

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.ratings-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.display-item {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.count {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #666;
}

.disabled-demo fieldset {
  opacity: 0.6;
}

.comparison {
  width: 100%;
  border-collapse: collapse;
}

.comparison th,
.comparison td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.comparison th {
  background: #f5f5f5;
  font-weight: bold;
}

.comparison tr:hover {
  background: #f9f9f9;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.success-message h4 {
  margin: 0 0 10px 0;
  border: none;
  padding: 0;
}

.success-message ul {
  margin: 0;
  padding-left: 20px;
}

.success-message li {
  margin-bottom: 5px;
}
</style>
```
