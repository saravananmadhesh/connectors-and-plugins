# Rating API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | 0 | Current rating value |
| `min` | number | 1 | Minimum rating |
| `max` | number | 5 | Maximum rating |
| `step` | number | 1 | Rating increment |
| `itemsCount` | number | 5 | Number of rating items |
| `readOnly` | boolean | false | Make rating read-only |
| `disabled` | boolean | false | Disable the rating |
| `fullSymbol` | string | '★' | Full rating symbol |
| `emptySymbol` | string | '☆' | Empty rating symbol |
| `hoverSymbol` | string | '★' | Hover symbol |
| `labelPosition` | string | 'Top' | Label position |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |
| `allowReset` | boolean | true | Allow rating reset |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getValue()` | - | number | Get current rating |
| `setValue(value)` | number | void | Set rating value |
| `reset()` | - | void | Reset to default |
| `enable()` | - | void | Enable component |
| `disable()` | - | void | Disable component |
| `refresh()` | - | void | Refresh component |

---

## Events

```typescript
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);        // New rating
  console.log(args.previousValue); // Previous rating
};

onHover = (args: HoverEventArgs) => {
  console.log(args.value);  // Hovered value
};
```

---

## Complete Example

```vue
<template>
  <div class="rating-demo">
    <!-- Product Rating -->
    <div class="rating-section">
      <h3>Product Rating</h3>
      
      <RatingComponent
        v-model="productRating"
        :max="5"
        :readOnly="false"
        @change="onRatingChange"
      />

      <p v-if="productRating > 0" class="rating-text">
        You rated this {{ productRating }} out of 5 stars
      </p>
    </div>

    <!-- Read-only Display -->
    <div class="read-only-section">
      <h3>Average Rating (Read-only)</h3>
      <RatingComponent
        v-model="averageRating"
        :readOnly="true"
      />
      <p>{{ averageRating }} out of 5 ({{ reviewCount }} reviews)</p>
    </div>

    <!-- Multiple Ratings -->
    <div class="multiple-ratings">
      <div v-for="criterion in criteria" :key="criterion">
        <label>{{ criterion }}:</label>
        <RatingComponent
          v-model="ratings[criterion]"
          :max="5"
        />
        <p>{{ ratings[criterion] }} / 5</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

const productRating = ref(0);
const averageRating = ref(4);
const reviewCount = ref(128);

const criteria = ['Design', 'Quality', 'Performance', 'Value'];
const ratings = reactive({
  'Design': 4,
  'Quality': 5,
  'Performance': 4,
  'Value': 3
});

const onRatingChange = (args) => {
  console.log('Rating changed to:', args.value);
};
</script>

<style scoped>
.rating-demo {
  padding: 20px;
}

.rating-section,
.read-only-section,
.multiple-ratings {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h3 {
  margin-top: 0;
}

.rating-text {
  margin-top: 15px;
  color: #666;
}

.multiple-ratings > div {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>
```

