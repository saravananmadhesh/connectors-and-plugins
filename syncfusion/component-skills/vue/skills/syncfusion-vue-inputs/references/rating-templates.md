# Templates — Syncfusion Vue Rating

## Table of Contents
- [Custom Item Templates](#custom-item-templates)
- [Icon Templates](#icon-templates)
- [Label Templates](#label-templates)
- [Examples](#examples)

---

## Custom Item Templates

Create custom rating templates:

```vue
<template>
  <div class="template-demo">
    <h4>Custom Star Template</h4>
    <ejs-rating
      :value="templateValue"
      @change="templateValue = $event.value">
      <template #item="{ index, isFullStar }">
        <span :class="{ 'filled': isFullStar, 'empty': !isFullStar }">
          ★
        </span>
      </template>
    </ejs-rating>

    <h4>Heart Template</h4>
    <ejs-rating
      :value="heartValue"
      @change="heartValue = $event.value">
      <template #item="{ index, isFullStar }">
        <span :class="{ 'filled-heart': isFullStar, 'empty-heart': !isFullStar }">
          ♥
        </span>
      </template>
    </ejs-rating>
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
      templateValue: 3,
      heartValue: 2
    }
  }
}
</script>

<style scoped>
.template-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.template-demo h4 {
  margin-top: 0;
  margin-bottom: 12px;
}

:deep(.filled) {
  color: #ffc107;
  font-size: 24px;
}

:deep(.empty) {
  color: #ddd;
  font-size: 24px;
}

:deep(.filled-heart) {
  color: #ff6b6b;
  font-size: 24px;
}

:deep(.empty-heart) {
  color: #ddd;
  font-size: 24px;
}
</style>
```

---

## Icon Templates

Use custom icons:

```vue
<template>
  <div class="icon-template-demo">
    <div class="icon-option">
      <h4>Star Icons</h4>
      <ejs-rating 
        :value="3"
        icon-css="e-icons"
        :full-icon="'e-star'"
        :empty-icon="'e-star'">
      </ejs-rating>
    </div>

    <div class="icon-option">
      <h4>Heart Icons</h4>
      <ejs-rating 
        :value="3" 
        icon-css="e-icons"
        :full-icon="'e-heart'"
        :empty-icon="'e-heart'">
      </ejs-rating>
    </div>

    <div class="icon-option">
      <h4>Thumbs Up Icons</h4>
      <ejs-rating 
        :value="3" 
        icon-css="e-icons"
        :full-icon="'e-thumbs-up'"
        :empty-icon="'e-thumbs-up'">
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
.icon-template-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.icon-option {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
}

.icon-option h4 {
  margin-top: 0;
  margin-bottom: 12px;
}
</style>
```

---

## Label Templates

Template with labels:

```vue
<template>
  <div class="label-template-demo">
    <div class="template-section">
      <h4>Rating with Dynamic Labels</h4>

      <div class="rating-with-label">
        <ejs-rating
          :value="labeledValue"
          @change="labeledValue = $event.value"
          placeholder="Select rating">
        </ejs-rating>
        <template v-if="labeledValue">
          <p class="label">{{ getRatingLabel(labeledValue) }}</p>
          <p class="emoji">{{ getRatingEmoji(labeledValue) }}</p>
        </template>
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
      labeledValue: 0
    }
  },
  methods: {
    getRatingLabel(value) {
      const labels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      };
      return labels[value];
    },
    getRatingEmoji(value) {
      const emojis = {
        1: '😞',
        2: '😕',
        3: '🙂',
        4: '😊',
        5: '🤩'
      };
      return emojis[value];
    }
  }
}
</script>

<style scoped>
.label-template-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.template-section h4 {
  margin-top: 0;
}

.rating-with-label {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.label {
  margin: 15px 0 0 0;
  font-size: 16px;
  font-weight: bold;
  color: #0078d4;
}

.emoji {
  margin: 8px 0 0 0;
  font-size: 32px;
}
</style>
```

---

## Examples

### Complete Templates Demo

```vue
<template>
  <div class="templates-demo">
    <h3>Rating Templates</h3>

    <div class="template-selector">
      <h4>Template Styles</h4>
      <div class="buttons">
        <button
          v-for="style in templateStyles"
          :key="style"
          @click="selectedTemplate = style"
          :class="{ active: selectedTemplate === style }">
          {{ style }}
        </button>
      </div>
    </div>

    <div class="template-preview">
      <h4>Preview</h4>
      <div class="preview-box">
        <div v-if="selectedTemplate === 'Standard'">
          <label>Standard Star Rating:</label>
          <ejs-rating :value="3"></ejs-rating>
        </div>

        <div v-if="selectedTemplate === 'Hearts'">
          <label>Heart Rating:</label>
          <ejs-rating 
            :value="3"
            icon-css="e-icons"
            :full-icon="'e-heart-fill'"
            :empty-icon="'e-heart'">
          </ejs-rating>
        </div>

        <div v-if="selectedTemplate === 'Numbers'">
          <label>Numeric Rating:</label>
          <div class="number-rating">
            <button
              v-for="num in 5"
              :key="num"
              @click="numericRating = num"
              :class="{ active: numericRating === num }">
              {{ num }}
            </button>
          </div>
          <p>{{ numericRating }}/5</p>
        </div>

        <div v-if="selectedTemplate === 'Emoji'">
          <label>Emoji Rating:</label>
          <div class="emoji-rating">
            <span
              v-for="(emoji, index) in emojis"
              :key="index"
              @click="emojiRating = index + 1"
              :class="{ active: emojiRating === index + 1 }"
              class="emoji-item">
              {{ emoji }}
            </span>
          </div>
          <p>{{ emojiLabels[emojiRating - 1] || 'Not rated' }}</p>
        </div>

        <div v-if="selectedTemplate === 'Smileys'">
          <label>Smiley Rating:</label>
          <div class="smiley-rating">
            <span
              v-for="(smiley, index) in smileys"
              :key="index"
              @click="smileyRating = index + 1"
              :class="{ active: smileyRating === index + 1 }"
              class="smiley-item">
              {{ smiley }}
            </span>
          </div>
          <p>{{ smileyLabels[smileyRating - 1] || 'Not rated' }}</p>
        </div>
      </div>
    </div>

    <div class="gallery">
      <h4>Template Gallery</h4>

      <div class="gallery-grid">
        <div class="gallery-item">
          <p class="gallery-title">Classic Stars</p>
          <ejs-rating :value="4" read-only></ejs-rating>
        </div>

        <div class="gallery-item">
          <p class="gallery-title">Hearts</p>
          <ejs-rating
            :value="4"
            read-only
            icon-css="e-icons"
            :full-icon="'e-heart-fill'"
            :empty-icon="'e-heart'">
          </ejs-rating>
        </div>

        <div class="gallery-item">
          <p class="gallery-title">Diamonds</p>
          <ejs-rating
            :value="4"
            read-only
            css-class="diamond-rating">
          </ejs-rating>
        </div>

        <div class="gallery-item">
          <p class="gallery-title">Circles</p>
          <ejs-rating
            :value="4"
            read-only
            css-class="circle-rating">
          </ejs-rating>
        </div>

        <div class="gallery-item">
          <p class="gallery-title">Gradient Stars</p>
          <ejs-rating
            :value="4"
            read-only
            css-class="gradient-rating">
          </ejs-rating>
        </div>

        <div class="gallery-item">
          <p class="gallery-title">Outlined Stars</p>
          <ejs-rating
            :value="4"
            read-only
            css-class="outline-rating">
          </ejs-rating>
        </div>
      </div>
    </div>

    <div class="custom-section">
      <h4>Custom Rating Builder</h4>

      <div class="builder">
        <div class="option">
          <label for="icon-select">Icon Style:</label>
          <select id="icon-select" v-model="customStyle.icon">
            <option value="star">Star</option>
            <option value="heart">Heart</option>
            <option value="circle">Circle</option>
            <option value="diamond">Diamond</option>
          </select>
        </div>

        <div class="option">
          <label for="size-select">Size:</label>
          <select id="size-select" v-model="customStyle.size">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div class="option">
          <label for="color-select">Color:</label>
          <select id="color-select" v-model="customStyle.color">
            <option value="gold">Gold</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </div>
      </div>

      <div class="custom-preview">
        <label>Your Custom Rating:</label>
        <ejs-rating
          :value="customRating"
          @change="customRating = $event.value"
          :css-class="`${customStyle.icon}-style size-${customStyle.size} color-${customStyle.color}`">
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
      selectedTemplate: 'Standard',
      templateStyles: ['Standard', 'Hearts', 'Numbers', 'Emoji', 'Smileys'],
      numericRating: 0,
      emojiRating: 0,
      smileyRating: 0,
      emojis: ['😞', '😕', '🙂', '😊', '🤩'],
      emojiLabels: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      smileys: ['😢', '😐', '🙂', '😊', '😄'],
      smileyLabels: ['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'],
      customStyle: {
        icon: 'star',
        size: 'medium',
        color: 'gold'
      },
      customRating: 3
    }
  }
}
</script>

<style scoped>
.templates-demo {
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

.template-selector,
.template-preview,
.gallery,
.custom-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
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

.preview-box {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.preview-box > div {
  text-align: center;
}

.preview-box label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

.number-rating {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 10px 0;
}

.number-rating button {
  width: 40px;
  height: 40px;
  padding: 0;
}

.emoji-rating,
.smiley-rating {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px 0;
}

.emoji-item,
.smiley-item {
  font-size: 32px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.emoji-item.active,
.smiley-item.active {
  opacity: 1;
  transform: scale(1.2);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.gallery-item {
  padding: 15px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 4px;
}

.gallery-title {
  margin: 0 0 10px 0;
  font-weight: bold;
  font-size: 12px;
}

.builder {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.option label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 12px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-preview {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.custom-preview label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

:deep(.diamond-rating .e-icon-star::before) {
  content: '◆';
}

:deep(.circle-rating .e-icon-star::before) {
  content: '●';
}

:deep(.gradient-rating .e-icon-star.e-rating::before) {
  background: linear-gradient(135deg, #ffc107, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.outline-rating .e-icon-star::before) {
  content: '☆';
}

:deep(.size-small .e-icon-star::before) {
  font-size: 16px;
}

:deep(.size-large .e-icon-star::before) {
  font-size: 32px;
}

:deep(.color-red .e-icon.e-icon-star::before) {
  color: #dc3545;
}

:deep(.color-blue .e-icon.e-icon-star::before) {
  color: #0078d4;
}

:deep(.color-green .e-icon.e-icon-star::before) {
  color: #28a745;
}
</style>
```
