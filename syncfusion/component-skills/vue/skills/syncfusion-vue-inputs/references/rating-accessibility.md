# Accessibility — Syncfusion Vue Rating

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Examples](#examples)

---

## WCAG 2.2 Compliance

Rating component meets WCAG 2.2 Level AA standards:

```vue
<template>
  <div class="accessibility-compliant">
    <fieldset>
      <legend>Product Rating (WCAG Compliant)</legend>
      <ejs-rating
        :value="currentRating"
        :max="5"
        @change="updateRating"
        aria-label="Rate this product from 1 to 5 stars">
      </ejs-rating>
      <p aria-live="polite" aria-atomic="true">
        You rated this product {{ currentRating }} out of 5 stars
      </p>
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
      currentRating: 0
    }
  },
  methods: {
    updateRating(event) {
      this.currentRating = event.value;
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

p {
  margin-top: 10px;
  font-size: 14px;
}
</style>
```

---

## Keyboard Navigation

Navigate with keyboard:

```vue
<template>
  <div>
    <div class="keyboard-nav">
      <h4>Keyboard Navigation</h4>
      <ul>
        <li><strong>Tab:</strong> Focus rating control</li>
        <li><strong>Arrow Keys:</strong> Navigate between stars</li>
        <li><strong>Enter/Space:</strong> Select rating</li>
      </ul>

      <fieldset>
        <legend>Try keyboard navigation:</legend>
        <ejs-rating
          :value="keyboardRating"
          :max="5"
          @change="handleKeyboardRating"
          aria-label="Rate using keyboard arrows">
        </ejs-rating>
        <p aria-live="assertive">Current rating: {{ keyboardRating }}/5</p>
      </fieldset>
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
      keyboardRating: 0
    }
  },
  methods: {
    handleKeyboardRating(event) {
      this.keyboardRating = event.value;
    }
  }
}
</script>

<style scoped>
.keyboard-nav {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.keyboard-nav h4 {
  margin-top: 0;
}

ul {
  background: #f5f5f5;
  padding: 15px 20px;
  border-radius: 4px;
  margin-bottom: 15px;
}

li {
  margin-bottom: 8px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

p {
  margin-top: 10px;
  font-size: 14px;
}
</style>
```

---

## ARIA Attributes

Use ARIA for accessibility:

```vue
<template>
  <div class="aria-demo">
    <div class="rating-group">
      <h4>Service Quality Rating</h4>
      <div role="group" aria-labelledby="service-rating-label">
        <p id="service-rating-label">Rate the service quality:</p>
        <ejs-rating
          :value="serviceRating"
          :max="5"
          @change="updateServiceRating"
          aria-label="Service quality rating"
          aria-describedby="rating-description">
        </ejs-rating>
        <p id="rating-description" class="description">
          1 star = Poor, 5 stars = Excellent
        </p>
        <p aria-live="polite">Service rating: {{ serviceRating }}/5</p>
      </div>
    </div>

    <div class="rating-group">
      <h4>Product Quality Rating</h4>
      <div role="group" aria-labelledby="product-rating-label">
        <p id="product-rating-label">Rate the product quality:</p>
        <ejs-rating
          :value="productRating"
          :max="5"
          @change="updateProductRating"
          aria-label="Product quality rating"
          aria-describedby="product-description">
        </ejs-rating>
        <p id="product-description" class="description">
          Consider durability, design, and functionality
        </p>
        <p aria-live="polite">Product rating: {{ productRating }}/5</p>
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
      serviceRating: 0,
      productRating: 0
    }
  },
  methods: {
    updateServiceRating(event) {
      this.serviceRating = event.value;
    },
    updateProductRating(event) {
      this.productRating = event.value;
    }
  }
}
</script>

<style scoped>
.aria-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.rating-group {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.rating-group h4 {
  margin-top: 0;
}

.rating-group p {
  margin: 10px 0;
}

.description {
  font-size: 12px;
  color: #666;
  font-style: italic;
}
</style>
```

---

## Examples

### Complete Accessible Rating Form

```vue
<template>
  <div class="accessible-form">
    <h3>Product Review Form - Accessible</h3>

    <form @submit.prevent="submitReview" novalidate>
      <div class="form-group">
        <fieldset>
          <legend>Product Quality <span aria-label="required">*</span></legend>
          <div role="group" aria-labelledby="quality-instructions">
            <p id="quality-instructions" class="instructions">
              Use arrow keys to navigate, press Enter to select
            </p>
            <ejs-rating
              :value="form.quality"
              :max="5"
              @change="form.quality = $event.value"
              aria-label="Rate product quality"
              aria-describedby="quality-scale">
            </ejs-rating>
            <p id="quality-scale" class="scale">
              1 = Poor, 5 = Excellent
            </p>
          </div>
        </fieldset>
      </div>

      <div class="form-group">
        <fieldset>
          <legend>Service Rating <span aria-label="required">*</span></legend>
          <div role="group" aria-labelledby="service-instructions">
            <p id="service-instructions" class="instructions">
              Rate your service experience
            </p>
            <ejs-rating
              :value="form.service"
              :max="5"
              @change="form.service = $event.value"
              aria-label="Rate service quality"
              aria-describedby="service-scale">
            </ejs-rating>
            <p id="service-scale" class="scale">
              1 = Poor, 5 = Excellent
            </p>
          </div>
        </fieldset>
      </div>

      <div class="form-group">
        <fieldset>
          <legend>Would You Recommend? <span aria-label="required">*</span></legend>
          <div role="group" aria-labelledby="recommend-instructions">
            <p id="recommend-instructions" class="instructions">
              How likely are you to recommend this product?
            </p>
            <ejs-rating
              :value="form.recommend"
              :max="5"
              @change="form.recommend = $event.value"
              aria-label="Likelihood to recommend"
              aria-describedby="recommend-scale">
            </ejs-rating>
            <p id="recommend-scale" class="scale">
              1 = Very Unlikely, 5 = Very Likely
            </p>
          </div>
        </fieldset>
      </div>

      <div class="form-group">
        <label for="comments">Comments (Optional):</label>
        <textarea
          id="comments"
          v-model="form.comments"
          rows="4"
          aria-describedby="comments-help">
        </textarea>
        <p id="comments-help" class="help-text">
          Share additional feedback (max 500 characters)
        </p>
      </div>

      <div class="actions">
        <button type="submit" aria-label="Submit review">
          Submit Review
        </button>
        <button type="reset" aria-label="Clear all fields">
          Clear
        </button>
      </div>

      <div v-if="submitted" class="success" role="alert">
        <p>Thank you! Your review has been submitted successfully.</p>
        <ul>
          <li>Quality: {{ form.quality }}/5</li>
          <li>Service: {{ form.service }}/5</li>
          <li>Recommend: {{ form.recommend }}/5</li>
        </ul>
      </div>
    </form>
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
        service: 0,
        recommend: 0,
        comments: ''
      },
      submitted: false
    }
  },
  methods: {
    submitReview() {
      if (this.form.quality > 0 && this.form.service > 0 && this.form.recommend > 0) {
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
          this.resetForm();
        }, 3000);
      } else {
        alert('Please rate all required fields');
      }
    },
    resetForm() {
      this.form = {
        quality: 0,
        service: 0,
        recommend: 0,
        comments: ''
      };
    }
  }
}
</script>

<style scoped>
.accessible-form {
  max-width: 600px;
  padding: 20px;
}

h3 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 30px;
}

fieldset {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 4px;
  margin: 0;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.instructions {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #666;
}

.scale {
  margin: 10px 0 0 0;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.help-text {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
}

button:hover {
  background: #106ebe;
}

button:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

button[type="reset"] {
  background: #e0e0e0;
  color: #333;
}

button[type="reset"]:hover {
  background: #d0d0d0;
}

.success {
  margin-top: 20px;
  padding: 15px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.success p {
  margin: 0 0 10px 0;
  font-weight: bold;
}

.success ul {
  margin: 0;
  padding-left: 20px;
}

.success li {
  margin-bottom: 5px;
}
</style>
```
