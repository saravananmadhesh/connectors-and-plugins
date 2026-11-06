# Rating Getting Started - Vue 3

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="rating-container">
    <label>Rate this product:</label>
    <RatingComponent
      v-model="rating"
      :min="1"
      :max="5"
      @change="onRatingChange"
    />
    <p>Rating: {{ rating }} / 5</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/rating/index.css";

const rating = ref(0);

const onRatingChange = (args) => {
  console.log('Rating changed to:', args.value);
};
</script>

<style scoped>
.rating-container {
  max-width: 400px;
  padding: 20px;
}
</style>
```

---

## Quick Start

### Half Star Rating

```vue
<template>
  <div>
    <label>Rate with precision:</label>
    <RatingComponent
      v-model="rating"
      :max="5"
      :precision="'Half'"
    />
    <p>Rating: {{ rating }} / 5</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

const rating = ref(0);
</script>
```

### Quarter Star Rating

```vue
<template>
  <div>
    <label>Detailed rating:</label>
    <RatingComponent
      v-model="rating"
      :max="5"
      :precision="'Quarter'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

const rating = ref(0);
</script>
```

---

## Complete Example: Product Review

```vue
<template>
  <div class="review-container">
    <h2>Leave a Review</h2>

    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="product">Product Name:</label>
        <input
          id="product"
          v-model="review.productName"
          type="text"
          required
          disabled
        />
      </div>

      <div class="form-group">
        <label>Product Rating:</label>
        <div class="rating-section">
          <RatingComponent
            v-model="review.rating"
            :min="1"
            :max="5"
          />
          <span class="rating-text">
            {{ review.rating ? `${review.rating} / 5 stars` : 'Click to rate' }}
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>Quality Rating:</label>
        <RatingComponent
          v-model="review.qualityRating"
          :min="1"
          :max="5"
        />
      </div>

      <div class="form-group">
        <label>Value for Money:</label>
        <RatingComponent
          v-model="review.valueRating"
          :min="1"
          :max="5"
        />
      </div>

      <div class="form-group">
        <label for="comment">Your Review:</label>
        <textarea
          id="comment"
          v-model="review.comment"
          placeholder="Write your review..."
          rows="5"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="name">Your Name:</label>
        <input
          id="name"
          v-model="review.userName"
          type="text"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="actions">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
        </button>
        <button type="reset" @click="resetReview">
          Clear
        </button>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </form>

    <div class="reviews-summary">
      <h3>Average Rating</h3>
      <div class="avg-rating">
        <span class="rating-value">{{ averageRating.toFixed(1) }}</span>
        <RatingComponent
          :value="Math.round(averageRating)"
          :readonly="true"
          :min="1"
          :max="5"
        />
        <p>(Based on {{ totalReviews }} reviews)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { RatingComponent } from '@syncfusion/ej2-vue-inputs';

const isSubmitting = ref(false);
const error = ref('');
const successMessage = ref('');
const totalReviews = ref(25);

const review = reactive({
  productName: 'Wireless Headphones',
  rating: 0,
  qualityRating: 0,
  valueRating: 0,
  comment: '',
  userName: ''
});

const averageRating = computed(() => {
  return (review.rating + review.qualityRating + review.valueRating) / 3 || 0;
});

const submitReview = async () => {
  error.value = '';
  successMessage.value = '';

  if (review.rating === 0) {
    error.value = 'Please rate the product';
    return;
  }

  if (!review.comment.trim()) {
    error.value = 'Please write a review';
    return;
  }

  if (!review.userName.trim()) {
    error.value = 'Please enter your name';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: review.productName,
        rating: review.rating,
        qualityRating: review.qualityRating,
        valueRating: review.valueRating,
        comment: review.comment,
        userName: review.userName
      })
    });

    if (response.ok) {
      successMessage.value = 'Thank you! Your review has been submitted.';
      totalReviews.value++;
      resetReview();
    } else {
      error.value = 'Failed to submit review. Please try again.';
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again later.';
    console.error('Submit error:', err);
  } finally {
    isSubmitting.value = false;
  }
};

const resetReview = () => {
  review.rating = 0;
  review.qualityRating = 0;
  review.valueRating = 0;
  review.comment = '';
  review.userName = '';
  error.value = '';
};
</script>

<style scoped>
.review-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rating-text {
  color: #666;
  font-size: 14px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
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

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button[type="reset"] {
  background-color: #6c757d;
  color: white;
}

button[type="reset"]:hover {
  background-color: #5a6268;
}

.reviews-summary {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.avg-rating {
  margin-top: 15px;
}

.rating-value {
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
}

.reviews-summary p {
  color: #666;
  margin: 10px 0 0 0;
}
</style>
```
