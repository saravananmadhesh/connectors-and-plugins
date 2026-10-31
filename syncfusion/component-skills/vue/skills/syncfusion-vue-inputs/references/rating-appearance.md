# Appearance — Syncfusion Vue Rating

## Table of Contents
- [Icon Selection](#icon-selection)
- [Size Configuration](#size-configuration)
- [Visual Customization](#visual-customization)
- [Examples](#examples)

---

## Icon Selection

Choose rating icons:

```vue
<template>
  <div class="icon-demo">
    <div class="example">
      <h4>Star Icons (Default)</h4>
      <ejs-rating :value="3" icon-css=""></ejs-rating>
    </div>

    <div class="example">
      <h4>Heart Icons</h4>
      <ejs-rating 
        :value="3" 
        icon-css="e-icons"
        :full-icon="'e-heart-fill'"
        :empty-icon="'e-heart'">
      </ejs-rating>
    </div>

    <div class="example">
      <h4>Smile Icons</h4>
      <ejs-rating 
        :value="3" 
        icon-css="e-icons"
        :full-icon="'e-smile'"
        :empty-icon="'e-neutral'">
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
.icon-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.example {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
}

.example h4 {
  margin-top: 0;
}
</style>
```

---

## Size Configuration

Set rating size:

```vue
<template>
  <div class="size-demo">
    <div class="size-example">
      <h4>Small Rating</h4>
      <ejs-rating :value="3" css-class="small-rating"></ejs-rating>
    </div>

    <div class="size-example">
      <h4>Medium Rating (Default)</h4>
      <ejs-rating :value="3"></ejs-rating>
    </div>

    <div class="size-example">
      <h4>Large Rating</h4>
      <ejs-rating :value="3" css-class="large-rating"></ejs-rating>
    </div>

    <div class="size-example">
      <h4>Extra Large Rating</h4>
      <ejs-rating :value="3" css-class="xlarge-rating"></ejs-rating>
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
.size-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.size-example {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
}

.size-example h4 {
  margin-top: 0;
}

:deep(.small-rating .e-icon-star) {
  font-size: 12px;
}

:deep(.large-rating .e-icon-star) {
  font-size: 32px;
}

:deep(.xlarge-rating .e-icon-star) {
  font-size: 48px;
}
</style>
```

---

## Visual Customization

Customize appearance:

```vue
<template>
  <div class="custom-demo">
    <div class="style-group">
      <h4>Color Themes</h4>

      <div class="style-item">
        <label>Default (Gold)</label>
        <ejs-rating :value="3" css-class="color-gold"></ejs-rating>
      </div>

      <div class="style-item">
        <label>Red</label>
        <ejs-rating :value="3" css-class="color-red"></ejs-rating>
      </div>

      <div class="style-item">
        <label>Blue</label>
        <ejs-rating :value="3" css-class="color-blue"></ejs-rating>
      </div>

      <div class="style-item">
        <label>Green</label>
        <ejs-rating :value="3" css-class="color-green"></ejs-rating>
      </div>
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
.custom-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.style-group h4 {
  margin-top: 0;
}

.style-item {
  margin-bottom: 15px;
}

.style-item:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.color-gold .e-icon.e-icon-star::before) {
  color: #ffc107;
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

---

## Examples

### Complete Visual Customization Demo

```vue
<template>
  <div class="appearance-demo">
    <h3>Rating Component Appearance</h3>

    <div class="config-panel">
      <h4>Configuration</h4>

      <div class="config-group">
        <label>Size:</label>
        <select v-model="config.size">
          <option value="small">Small (16px)</option>
          <option value="medium">Medium (24px)</option>
          <option value="large">Large (32px)</option>
          <option value="xlarge">Extra Large (48px)</option>
        </select>
      </div>

      <div class="config-group">
        <label>Color Theme:</label>
        <select v-model="config.color">
          <option value="gold">Gold (Default)</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
      </div>

      <div class="config-group">
        <label>
          <input type="checkbox" v-model="config.readonly"> Read-only
        </label>
      </div>

      <div class="config-group">
        <label>
          <input type="checkbox" v-model="config.showLabel"> Show Label
        </label>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <div class="preview-content">
        <ejs-rating
          :value="previewValue"
          @change="previewValue = $event.value"
          :read-only="config.readonly"
          :css-class="`size-${config.size} color-${config.color}`">
        </ejs-rating>
        <p v-if="config.showLabel" class="rating-label">
          Rating: {{ previewValue }} / 5
        </p>
      </div>
    </div>

    <div class="gallery">
      <h4>Style Gallery</h4>

      <div class="gallery-grid">
        <div v-for="size in ['small', 'medium', 'large', 'xlarge']" :key="size" class="gallery-item">
          <label>{{ size.charAt(0).toUpperCase() + size.slice(1) }}</label>
          <ejs-rating 
            :value="3" 
            :css-class="`size-${size} color-gold`">
          </ejs-rating>
        </div>

        <div v-for="color in ['gold', 'red', 'blue', 'green', 'purple']" :key="color" class="gallery-item">
          <label>{{ color.charAt(0).toUpperCase() + color.slice(1) }}</label>
          <ejs-rating 
            :value="3" 
            :css-class="`size-medium color-${color}`">
          </ejs-rating>
        </div>
      </div>
    </div>

    <div class="product-showcase">
      <h4>Product Showcase</h4>

      <div class="product-card">
        <div class="product-image">📱</div>
        <div class="product-info">
          <h5>Premium Smartphone</h5>
          <ejs-rating :value="4" css-class="size-medium color-gold"></ejs-rating>
          <p class="rating-text">4.5 out of 5 (1,234 reviews)</p>
          <p class="price">$599</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image">⌚</div>
        <div class="product-info">
          <h5>Smart Watch</h5>
          <ejs-rating :value="5" css-class="size-medium color-blue"></ejs-rating>
          <p class="rating-text">5.0 out of 5 (856 reviews)</p>
          <p class="price">$299</p>
        </div>
      </div>

      <div class="product-card">
        <div class="product-image">🎧</div>
        <div class="product-info">
          <h5>Wireless Earbuds</h5>
          <ejs-rating :value="4" css-class="size-medium color-purple"></ejs-rating>
          <p class="rating-text">4.2 out of 5 (542 reviews)</p>
          <p class="price">$149</p>
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
      previewValue: 3,
      config: {
        size: 'medium',
        color: 'gold',
        readonly: false,
        showLabel: true
      }
    }
  }
}
</script>

<style scoped>
.appearance-demo {
  padding: 20px;
  max-width: 800px;
}

.config-panel,
.preview,
.gallery,
.product-showcase {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

h5 {
  margin: 0 0 10px 0;
}

.config-group {
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

.preview-content {
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.rating-label {
  margin-top: 15px;
  font-weight: bold;
  color: #333;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
}

.gallery-item {
  padding: 15px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 4px;
}

.gallery-item label {
  margin-bottom: 10px;
}

.product-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  grid-template-rows: auto 1fr;
}

.product-showcase h4 {
  grid-column: 1 / -1;
  margin-bottom: 10px;
}

.product-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  display: flex;
  gap: 15px;
  align-items: center;
}

.product-image {
  font-size: 48px;
  min-width: 60px;
}

.product-info {
  flex: 1;
}

.product-info h5 {
  margin-bottom: 8px;
}

.rating-text {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #0078d4;
  margin: 10px 0 0 0;
}

:deep(.size-small .e-icon-star::before) {
  font-size: 16px;
}

:deep(.size-medium .e-icon-star::before) {
  font-size: 24px;
}

:deep(.size-large .e-icon-star::before) {
  font-size: 32px;
}

:deep(.size-xlarge .e-icon-star::before) {
  font-size: 48px;
}

:deep(.color-gold .e-icon.e-icon-star::before) {
  color: #ffc107;
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

:deep(.color-purple .e-icon.e-icon-star::before) {
  color: #9c27b0;
}
</style>
```
