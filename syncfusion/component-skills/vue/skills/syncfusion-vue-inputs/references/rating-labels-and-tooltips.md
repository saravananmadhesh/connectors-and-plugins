# Labels and Tooltips — Syncfusion Vue Rating

## Table of Contents
- [Custom Labels](#custom-labels)
- [Tooltips](#tooltips)
- [Label Configuration](#label-configuration)
- [Examples](#examples)

---

## Custom Labels

Add custom labels to ratings:

```vue
<template>
  <div class="labels-demo">
    <div class="example">
      <h4>Simple Labels</h4>
      <div class="rating-with-label">
        <ejs-rating 
          :value="simpleRating"
          @change="simpleRating = $event.value">
        </ejs-rating>
        <p>{{ getRatingLabel(simpleRating) }}</p>
      </div>
    </div>

    <div class="example">
      <h4>Emoji Labels</h4>
      <div class="rating-with-label">
        <ejs-rating 
          :value="emojiRating"
          @change="emojiRating = $event.value">
        </ejs-rating>
        <p>{{ getEmojiLabel(emojiRating) }}</p>
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
      simpleRating: 0,
      emojiRating: 0
    }
  },
  methods: {
    getRatingLabel(rating) {
      const labels = {
        0: 'Not rated',
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      };
      return labels[rating];
    },
    getEmojiLabel(rating) {
      const emojis = {
        0: '😐 Not rated',
        1: '😞 Poor',
        2: '😕 Fair',
        3: '🙂 Good',
        4: '😊 Very Good',
        5: '🤩 Excellent'
      };
      return emojis[rating];
    }
  }
}
</script>

<style scoped>
.labels-demo {
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

.rating-with-label {
  text-align: center;
}

.rating-with-label p {
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #0078d4;
}
</style>
```

---

## Tooltips

Show rating tooltips:

```vue
<template>
  <div class="tooltip-demo">
    <div class="section">
      <h4>Standard Tooltips</h4>
      <ejs-rating
        :value="1"
        :tooltip="{ content: 'Poor - needs improvement' }"
        placeholder="Hover for tooltip">
      </ejs-rating>

      <ejs-rating
        :value="3"
        :tooltip="{ content: 'Good - meets expectations' }"
        placeholder="Hover for tooltip">
      </ejs-rating>

      <ejs-rating
        :value="5"
        :tooltip="{ content: 'Excellent - exceeds expectations' }"
        placeholder="Hover for tooltip">
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
.tooltip-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.section {
  margin-bottom: 20px;
}

.section h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

:deep(.e-rating) {
  margin-bottom: 15px;
}
</style>
```

---

## Label Configuration

Configure rating labels:

```vue
<template>
  <div class="config-demo">
    <div class="config-panel">
      <h4>Configuration</h4>

      <div class="option">
        <label for="label-style">Label Style:</label>
        <select id="label-style" v-model="config.style">
          <option value="text">Text</option>
          <option value="emoji">Emoji</option>
          <option value="verbose">Verbose</option>
        </select>
      </div>

      <div class="option">
        <label for="label-position">Label Position:</label>
        <select id="label-position" v-model="config.position">
          <option value="below">Below</option>
          <option value="above">Above</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div class="option">
        <label>
          <input type="checkbox" v-model="config.showPercentage"> Show Percentage
        </label>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <div :style="{ display: config.position === 'above' ? 'flex' : 'block', flexDirection: config.position === 'above' ? 'column-reverse' : 'row' }">
        <ejs-rating
          :value="previewValue"
          @change="previewValue = $event.value">
        </ejs-rating>
        <p v-if="config.position !== 'right'" style="text-align: center;">
          {{ getLabel(previewValue) }}
          <span v-if="config.showPercentage">({{ previewValue * 20 }}%)</span>
        </p>
        <p v-if="config.position === 'right'" style="margin-left: 15px;">
          {{ getLabel(previewValue) }}
          <span v-if="config.showPercentage">({{ previewValue * 20 }}%)</span>
        </p>
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
      previewValue: 3,
      config: {
        style: 'text',
        position: 'below',
        showPercentage: false
      },
      labelMaps: {
        text: {
          0: 'Not rated',
          1: 'Poor',
          2: 'Fair',
          3: 'Good',
          4: 'Very Good',
          5: 'Excellent'
        },
        emoji: {
          0: '😐',
          1: '😞',
          2: '😕',
          3: '🙂',
          4: '😊',
          5: '🤩'
        },
        verbose: {
          0: 'No rating',
          1: 'Very poor experience',
          2: 'Below average',
          3: 'Satisfactory',
          4: 'Good experience',
          5: 'Outstanding experience'
        }
      }
    }
  },
  methods: {
    getLabel(value) {
      return this.labelMaps[this.config.style][value];
    }
  }
}
</script>

<style scoped>
.config-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.config-panel,
.preview {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.option {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.preview p {
  margin: 15px 0 0 0;
  font-weight: bold;
  font-size: 16px;
}
</style>
```

---

## Examples

### Complete Labels and Tooltips Demo

```vue
<template>
  <div class="labels-tooltips-demo">
    <h3>Rating Labels and Tooltips</h3>

    <div class="demo-section">
      <h4>Product Feedback Form</h4>

      <div class="feedback-form">
        <div class="form-group">
          <fieldset>
            <legend>Product Quality</legend>
            <div class="rating-item">
              <ejs-rating
                :value="feedback.quality"
                @change="feedback.quality = $event.value"
                :tooltip="{ content: qualityTooltip }">
              </ejs-rating>
              <p class="label">{{ qualityLabel }}</p>
            </div>
          </fieldset>
        </div>

        <div class="form-group">
          <fieldset>
            <legend>Shipping Experience</legend>
            <div class="rating-item">
              <ejs-rating
                :value="feedback.shipping"
                @change="feedback.shipping = $event.value"
                :tooltip="{ content: shippingTooltip }">
              </ejs-rating>
              <p class="label">{{ shippingLabel }}</p>
            </div>
          </fieldset>
        </div>

        <div class="form-group">
          <fieldset>
            <legend>Customer Support</legend>
            <div class="rating-item">
              <ejs-rating
                :value="feedback.support"
                @change="feedback.support = $event.value"
                :tooltip="{ content: supportTooltip }">
              </ejs-rating>
              <p class="label">{{ supportLabel }}</p>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Labeled Rating Styles</h4>

      <div class="style-gallery">
        <div class="style-item">
          <p class="style-name">Numeric Labels</p>
          <ejs-rating :value="4"></ejs-rating>
          <p class="numeric-label">4 out of 5</p>
        </div>

        <div class="style-item">
          <p class="style-name">Percentage Labels</p>
          <ejs-rating :value="4"></ejs-rating>
          <p class="percentage-label">80%</p>
        </div>

        <div class="style-item">
          <p class="style-name">Text Labels</p>
          <ejs-rating :value="4"></ejs-rating>
          <p class="text-label">Very Good</p>
        </div>

        <div class="style-item">
          <p class="style-name">Emoji Labels</p>
          <ejs-rating :value="4"></ejs-rating>
          <p class="emoji-label">😊</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Dynamic Tooltip Demo</h4>

      <div class="tooltip-section">
        <ejs-rating
          :value="interactiveRating"
          @change="interactiveRating = $event.value"
          :tooltip="{ content: interactiveTooltip, position: 'TopCenter' }">
        </ejs-rating>
        <div class="tooltip-display">
          <p class="tooltip-text">{{ interactiveTooltip }}</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Summary View</h4>

      <div class="summary">
        <div class="summary-row">
          <span class="label">Quality:</span>
          <div class="rating-display">
            <ejs-rating :value="feedback.quality" read-only></ejs-rating>
          </div>
          <span class="label">{{ qualityLabel }}</span>
        </div>

        <div class="summary-row">
          <span class="label">Shipping:</span>
          <div class="rating-display">
            <ejs-rating :value="feedback.shipping" read-only></ejs-rating>
          </div>
          <span class="label">{{ shippingLabel }}</span>
        </div>

        <div class="summary-row">
          <span class="label">Support:</span>
          <div class="rating-display">
            <ejs-rating :value="feedback.support" read-only></ejs-rating>
          </div>
          <span class="label">{{ supportLabel }}</span>
        </div>

        <div class="average">
          <p><strong>Average Rating:</strong></p>
          <p class="avg-value">{{ averageRating.toFixed(1) }} / 5</p>
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
      feedback: {
        quality: 4,
        shipping: 3,
        support: 5
      },
      interactiveRating: 3,
      labels: {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      },
      tooltips: {
        0: 'Not rated',
        1: 'Poor - needs significant improvement',
        2: 'Fair - room for improvement',
        3: 'Good - meets requirements',
        4: 'Very Good - exceeds expectations',
        5: 'Excellent - outstanding'
      }
    }
  },
  computed: {
    qualityLabel() {
      return this.feedback.quality ? this.labels[this.feedback.quality] : 'Not rated';
    },
    shippingLabel() {
      return this.feedback.shipping ? this.labels[this.feedback.shipping] : 'Not rated';
    },
    supportLabel() {
      return this.feedback.support ? this.labels[this.feedback.support] : 'Not rated';
    },
    qualityTooltip() {
      return this.tooltips[this.feedback.quality];
    },
    shippingTooltip() {
      return this.tooltips[this.feedback.shipping];
    },
    supportTooltip() {
      return this.tooltips[this.feedback.support];
    },
    interactiveTooltip() {
      return this.tooltips[this.interactiveRating];
    },
    averageRating() {
      return (this.feedback.quality + this.feedback.shipping + this.feedback.support) / 3;
    }
  }
}
</script>

<style scoped>
.labels-tooltips-demo {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.feedback-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.form-group {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

legend {
  font-weight: bold;
  margin-bottom: 10px;
}

.rating-item {
  text-align: center;
}

.label {
  margin-top: 10px;
  font-weight: bold;
  color: #0078d4;
}

.style-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.style-item {
  padding: 15px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 4px;
}

.style-name {
  margin: 0 0 10px 0;
  font-weight: bold;
  font-size: 14px;
}

.numeric-label,
.percentage-label,
.text-label,
.emoji-label {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
}

.emoji-label {
  font-size: 32px;
}

.tooltip-section {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.tooltip-display {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tooltip-text {
  margin: 0;
  font-weight: bold;
  color: #333;
}

.summary {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.summary-row {
  display: grid;
  grid-template-columns: 120px 100px 1fr;
  align-items: center;
  gap: 15px;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.summary-row:last-child {
  border-bottom: none;
}

.rating-display {
  text-align: center;
}

.average {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border: 2px solid #0078d4;
  border-radius: 4px;
  text-align: center;
}

.average p {
  margin: 5px 0;
}

.avg-value {
  font-size: 24px;
  font-weight: bold;
  color: #0078d4;
}
</style>
```
