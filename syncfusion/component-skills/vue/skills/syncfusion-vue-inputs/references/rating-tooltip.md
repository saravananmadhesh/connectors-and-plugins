# Tooltip — Syncfusion Vue Rating

## Table of Contents
- [Tooltip Configuration](#tooltip-configuration)
- [Tooltip Positioning](#tooltip-positioning)
- [Custom Tooltips](#custom-tooltips)
- [Examples](#examples)

---

## Tooltip Configuration

Enable and configure tooltips:

```vue
<template>
  <div class="tooltip-config">
    <fieldset>
      <legend>Tooltip Configuration</legend>

      <div class="example">
        <label>Standard Tooltips</label>
        <ejs-rating
          :value="3"
          :tooltip="{ isVisible: true }">
        </ejs-rating>
      </div>

      <div class="example">
        <label>Custom Tooltip Text</label>
        <ejs-rating
          :value="3"
          :tooltip="{ isVisible: true, content: 'Rate your satisfaction level' }">
        </ejs-rating>
      </div>

      <div class="example">
        <label>Tooltips Disabled</label>
        <ejs-rating
          :value="3"
          :tooltip="{ isVisible: false }">
        </ejs-rating>
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

.example {
  margin-bottom: 20px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

---

## Tooltip Positioning

Position tooltips:

```vue
<template>
  <div class="tooltip-positioning">
    <div class="position">
      <h4>Top Tooltip</h4>
      <ejs-rating
        :value="3"
        :tooltip="{ isVisible: true, position: 'Top' }">
      </ejs-rating>
    </div>

    <div class="position">
      <h4>Bottom Tooltip</h4>
      <ejs-rating
        :value="3"
        :tooltip="{ isVisible: true, position: 'Bottom' }">
      </ejs-rating>
    </div>

    <div class="position">
      <h4>Left Tooltip</h4>
      <ejs-rating
        :value="3"
        :tooltip="{ isVisible: true, position: 'Left' }">
      </ejs-rating>
    </div>

    <div class="position">
      <h4>Right Tooltip</h4>
      <ejs-rating
        :value="3"
        :tooltip="{ isVisible: true, position: 'Right' }">
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
.tooltip-positioning {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.position {
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
}

.position h4 {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
```

---

## Custom Tooltips

Create custom tooltips:

```vue
<template>
  <div class="custom-tooltips">
    <div class="section">
      <h4>Dynamic Tooltips</h4>

      <div class="rating-item">
        <label>Select a rating (hover to see tooltip):</label>
        <ejs-rating
          :value="customRating"
          @change="customRating = $event.value"
          :tooltip="{ isVisible: true, content: customTooltip }">
        </ejs-rating>
        <p class="current">{{ customTooltip }}</p>
      </div>
    </div>

    <div class="section">
      <h4>Detailed Tooltips</h4>

      <div class="rating-item">
        <label>Product Quality:</label>
        <ejs-rating
          :value="qualityRating"
          @change="qualityRating = $event.value"
          :tooltip="{ isVisible: true, content: qualityTooltip }">
        </ejs-rating>
      </div>

      <div class="rating-item">
        <label>Shipping Experience:</label>
        <ejs-rating
          :value="shippingRating"
          @change="shippingRating = $event.value"
          :tooltip="{ isVisible: true, content: shippingTooltip }">
        </ejs-rating>
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
      customRating: 0,
      qualityRating: 0,
      shippingRating: 0
    }
  },
  computed: {
    customTooltip() {
      const tooltips = {
        0: 'Select a rating',
        1: 'Poor - needs improvement',
        2: 'Fair - acceptable',
        3: 'Good - satisfactory',
        4: 'Very Good - good experience',
        5: 'Excellent - outstanding'
      };
      return tooltips[this.customRating];
    },
    qualityTooltip() {
      const tooltips = {
        0: 'Rate the product quality',
        1: '1/5 - Product quality is poor',
        2: '2/5 - Product quality is below average',
        3: '3/5 - Product quality is acceptable',
        4: '4/5 - Product quality is good',
        5: '5/5 - Product quality is excellent'
      };
      return tooltips[this.qualityRating];
    },
    shippingTooltip() {
      const tooltips = {
        0: 'Rate your shipping experience',
        1: '1/5 - Very slow shipping',
        2: '2/5 - Slow shipping',
        3: '3/5 - Average shipping time',
        4: '4/5 - Fast shipping',
        5: '5/5 - Very fast shipping'
      };
      return tooltips[this.shippingRating];
    }
  }
}
</script>

<style scoped>
.custom-tooltips {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.section {
  margin-bottom: 25px;
}

.section:last-child {
  margin-bottom: 0;
}

.section h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.rating-item {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.rating-item:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.current {
  margin-top: 8px;
  font-size: 12px;
  color: #0078d4;
  font-style: italic;
}
</style>
```

---

## Examples

### Complete Tooltip Demo

```vue
<template>
  <div class="tooltip-demo-complete">
    <h3>Rating Tooltip Features</h3>

    <div class="config-section">
      <h4>Tooltip Configuration</h4>

      <div class="config-options">
        <div class="option">
          <label>
            <input type="checkbox" v-model="config.enabled"> Enable Tooltips
          </label>
        </div>

        <div class="option">
          <label>Tooltip Position:</label>
          <select v-model="config.position" :disabled="!config.enabled">
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="TopCenter">Top Center</option>
            <option value="BottomCenter">Bottom Center</option>
          </select>
        </div>

        <div class="option">
          <label>Tooltip Style:</label>
          <select v-model="config.style" :disabled="!config.enabled">
            <option value="simple">Simple</option>
            <option value="detailed">Detailed</option>
            <option value="emoji">With Emoji</option>
          </select>
        </div>
      </div>
    </div>

    <div class="preview-section">
      <h4>Preview</h4>

      <div class="preview-box">
        <label>Hover over the stars to see tooltip:</label>
        <ejs-rating
          :value="previewValue"
          @change="previewValue = $event.value"
          :tooltip="config.enabled ? { isVisible: true, content: getTooltipContent(previewValue), position: config.position } : {}">
        </ejs-rating>
        <p class="current-tooltip">{{ config.enabled ? getTooltipContent(previewValue) : 'Tooltips disabled' }}</p>
      </div>
    </div>

    <div class="examples-section">
      <h4>Use Case Examples</h4>

      <div class="example">
        <h5>📱 App Store Rating</h5>
        <p>Simple tooltip for app ratings</p>
        <ejs-rating
          :value="4"
          read-only
          :tooltip="{ isVisible: true, content: 'Rated 4 out of 5 stars' }">
        </ejs-rating>
      </div>

      <div class="example">
        <h5>🏨 Hotel Rating</h5>
        <p>Detailed tooltip with description</p>
        <ejs-rating
          :value="4.5"
          read-only
          precision="Half"
          :tooltip="{ isVisible: true, content: 'Excellent hotel with great service (4.5/5)' }">
        </ejs-rating>
      </div>

      <div class="example">
        <h5>🍔 Restaurant Rating</h5>
        <p>Aspect-specific tooltip</p>
        <ejs-rating
          :value="4"
          read-only
          :tooltip="{ isVisible: true, content: 'Food Quality: 4/5 - Delicious and fresh' }">
        </ejs-rating>
      </div>

      <div class="example">
        <h5>🎬 Movie Rating</h5>
        <p>Rating with sentiment tooltip</p>
        <ejs-rating
          :value="5"
          read-only
          :tooltip="{ isVisible: true, content: 'Must Watch! Outstanding movie (5/5)' }">
        </ejs-rating>
      </div>
    </div>

    <div class="feedback-section">
      <h4>Interactive Feedback Form</h4>

      <form @submit.prevent="submitFeedback" class="feedback-form">
        <div class="form-group">
          <label for="overall">Overall Experience:</label>
          <ejs-rating
            id="overall"
            :value="feedback.overall"
            @change="feedback.overall = $event.value"
            :tooltip="{ isVisible: true, content: overallTooltip }">
          </ejs-rating>
          <p class="helper">{{ overallTooltip }}</p>
        </div>

        <div class="form-group">
          <label for="quality">Product Quality:</label>
          <ejs-rating
            id="quality"
            :value="feedback.quality"
            @change="feedback.quality = $event.value"
            :tooltip="{ isVisible: true, content: qualityTooltip }">
          </ejs-rating>
          <p class="helper">{{ qualityTooltip }}</p>
        </div>

        <div class="form-group">
          <label for="delivery">Delivery Speed:</label>
          <ejs-rating
            id="delivery"
            :value="feedback.delivery"
            @change="feedback.delivery = $event.value"
            :tooltip="{ isVisible: true, content: deliveryTooltip }">
          </ejs-rating>
          <p class="helper">{{ deliveryTooltip }}</p>
        </div>

        <button type="submit" :disabled="!isFormValid">Submit Feedback</button>
      </form>

      <div v-if="submitted" class="success">
        ✓ Feedback submitted successfully!
      </div>
    </div>

    <div class="tooltip-tips">
      <h4>💡 Tooltip Best Practices</h4>

      <ul>
        <li><strong>Be concise:</strong> Keep tooltips short and informative</li>
        <li><strong>Be consistent:</strong> Use same format for all tooltips</li>
        <li><strong>Be clear:</strong> Clearly explain what each rating means</li>
        <li><strong>Be helpful:</strong> Provide context or examples when needed</li>
        <li><strong>Position wisely:</strong> Avoid tooltips going off-screen</li>
        <li><strong>Use appropriate delay:</strong> Not too quick to trigger, not too slow</li>
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
      previewValue: 3,
      config: {
        enabled: true,
        position: 'Top',
        style: 'simple'
      },
      feedback: {
        overall: 0,
        quality: 0,
        delivery: 0
      },
      submitted: false,
      tooltipStyles: {
        simple: {
          1: '1/5',
          2: '2/5',
          3: '3/5',
          4: '4/5',
          5: '5/5'
        },
        detailed: {
          0: 'Please rate',
          1: 'Poor - needs improvement',
          2: 'Fair - acceptable',
          3: 'Good - satisfactory',
          4: 'Very Good - exceeds expectations',
          5: 'Excellent - outstanding'
        },
        emoji: {
          0: '😐 Not rated',
          1: '😞 Poor',
          2: '😕 Fair',
          3: '🙂 Good',
          4: '😊 Very Good',
          5: '🤩 Excellent'
        }
      }
    }
  },
  computed: {
    isFormValid() {
      return this.feedback.overall > 0 && this.feedback.quality > 0 && this.feedback.delivery > 0;
    },
    overallTooltip() {
      const tooltips = {
        0: 'How would you rate your overall experience?',
        1: '1/5 - Very poor experience',
        2: '2/5 - Below average',
        3: '3/5 - Satisfactory',
        4: '4/5 - Good experience',
        5: '5/5 - Excellent experience'
      };
      return tooltips[this.feedback.overall];
    },
    qualityTooltip() {
      const tooltips = {
        0: 'Rate the product quality',
        1: '1/5 - Poor quality',
        2: '2/5 - Below average quality',
        3: '3/5 - Average quality',
        4: '4/5 - Good quality',
        5: '5/5 - Excellent quality'
      };
      return tooltips[this.feedback.quality];
    },
    deliveryTooltip() {
      const tooltips = {
        0: 'How fast was the delivery?',
        1: '1/5 - Very slow',
        2: '2/5 - Slow',
        3: '3/5 - Average speed',
        4: '4/5 - Fast',
        5: '5/5 - Very fast'
      };
      return tooltips[this.feedback.delivery];
    }
  },
  methods: {
    getTooltipContent(value) {
      return this.tooltipStyles[this.config.style][value] || 'Select a rating';
    },
    submitFeedback() {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.feedback = { overall: 0, quality: 0, delivery: 0 };
      }, 2000);
    }
  }
}
</script>

<style scoped>
.tooltip-demo-complete {
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
  margin: 0 0 8px 0;
}

.config-section,
.preview-section,
.examples-section,
.feedback-section,
.tooltip-tips {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.config-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.option {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="checkbox"] {
  margin-right: 8px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select:disabled {
  background: #f5f5f5;
  opacity: 0.5;
}

.preview-box {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.current-tooltip {
  margin-top: 15px;
  font-size: 14px;
  color: #0078d4;
  font-weight: bold;
}

.example {
  padding: 15px;
  margin-bottom: 12px;
  background: #f9f9f9;
  border-left: 4px solid #0078d4;
  border-radius: 4px;
}

.example:last-child {
  margin-bottom: 0;
}

.example p {
  margin: 5px 0;
  font-size: 12px;
  color: #666;
}

.feedback-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.form-group {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.form-group label {
  margin-bottom: 10px;
}

.helper {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

button {
  padding: 12px 24px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: bold;
}

.tooltip-tips ul {
  margin: 0;
  padding-left: 20px;
}

.tooltip-tips li {
  margin-bottom: 10px;
}
</style>
```
