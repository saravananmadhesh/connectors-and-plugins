# RangeSlider Getting Started - Vue 3

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="rangeslider-container">
    <label>Select Price Range:</label>
    <SliderComponent
      v-model="priceRange"
      :min="0"
      :max="1000"
      :type="'Range'"
      :step="10"
      @change="onRangeChange"
    />
    <p>Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SliderComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/slider/index.css";

const priceRange = ref([200, 800]);

const onRangeChange = (args) => {
  console.log('Range changed to:', args.value);
};
</script>

<style scoped>
.rangeslider-container {
  max-width: 500px;
  padding: 20px;
}
</style>
```

---

## Single Slider

```vue
<template>
  <div>
    <label>Volume:</label>
    <SliderComponent
      v-model="volume"
      :min="0"
      :max="100"
      :step="5"
      :type="'Default'"
    />
    <p>Volume: {{ volume }}%</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SliderComponent } from '@syncfusion/ej2-vue-inputs';

const volume = ref(50);
</script>
```

---

## Range Slider with Min/Max

```vue
<template>
  <div class="filter-container">
    <h3>Filter by Price</h3>
    <SliderComponent
      v-model="priceRange"
      :min="0"
      :max="10000"
      :step="100"
      :type="'Range'"
    />
    <div class="price-display">
      <p>Min: ${{ priceRange[0] }}</p>
      <p>Max: ${{ priceRange[1] }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SliderComponent } from '@syncfusion/ej2-vue-inputs';

const priceRange = ref([500, 9500]);
</script>

<style scoped>
.price-display {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}
</style>
```

---

## Complete Example: E-Commerce Filter

```vue
<template>
  <div class="product-filter">
    <h2>Filter Products</h2>

    <div class="filter-section">
      <h3>Price Range</h3>
      <SliderComponent
        v-model="filters.priceRange"
        :min="0"
        :max="10000"
        :step="50"
        :type="'Range'"
      />
      <div class="range-display">
        <span>${{ filters.priceRange[0] }}</span>
        <span>-</span>
        <span>${{ filters.priceRange[1] }}</span>
      </div>
    </div>

    <div class="filter-section">
      <h3>Rating</h3>
      <SliderComponent
        v-model="filters.rating"
        :min="1"
        :max="5"
        :step="0.5"
        :type="'Default'"
      />
      <p>Minimum Rating: {{ filters.rating }} ⭐</p>
    </div>

    <div class="filter-section">
      <h3>Discount</h3>
      <SliderComponent
        v-model="filters.discount"
        :min="0"
        :max="100"
        :step="5"
        :type="'Default'"
      />
      <p>Discount: {{ filters.discount }}%</p>
    </div>

    <div class="actions">
      <button @click="applyFilters">Apply Filters</button>
      <button @click="resetFilters">Reset</button>
    </div>

    <div class="results">
      <h3>Products Found: {{ productCount }}</h3>
      <p>{{ filterSummary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { SliderComponent } from '@syncfusion/ej2-vue-inputs';

const filters = reactive({
  priceRange: [500, 5000],
  rating: 3,
  discount: 0
});

const productCount = ref(0);

const filterSummary = computed(() => {
  return `Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}, 
           Rating: ${filters.rating}+, 
           Discount: ${filters.discount}%+`;
});

const applyFilters = () => {
  // Simulate filtering products
  productCount.value = Math.floor(Math.random() * 50) + 10;
  alert(`Filters applied! Found ${productCount.value} products`);
};

const resetFilters = () => {
  filters.priceRange = [0, 10000];
  filters.rating = 1;
  filters.discount = 0;
  productCount.value = 0;
};
</script>

<style scoped>
.product-filter {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.filter-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.filter-section h3 {
  margin-top: 0;
}

.range-display {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 25px 0;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:first-child {
  background-color: #007bff;
  color: white;
}

button:first-child:hover {
  background-color: #0056b3;
}

button:last-child {
  background-color: #6c757d;
  color: white;
}

button:last-child:hover {
  background-color: #5a6268;
}

.results {
  padding: 20px;
  background-color: #e7f3ff;
  border-radius: 4px;
  border: 1px solid #b3d9ff;
}

.results h3 {
  margin-top: 0;
}
</style>
```
