# Events — Syncfusion Vue Rating

## Table of Contents
- [Change Event](#change-event)
- [Rating Changed Event](#rating-changed-event)
- [Hover Effects](#hover-effects)
- [Examples](#examples)

---

## Change Event

Handle rating change:

```vue
<template>
  <div>
    <ejs-rating 
      :value="currentRating"
      @change="handleChange">
    </ejs-rating>

    <p v-if="lastChange">Last change: {{ lastChange }}</p>
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
      currentRating: 0,
      lastChange: ''
    }
  },
  methods: {
    handleChange(event) {
      this.currentRating = event.value;
      this.lastChange = `Rating changed to ${event.value} at ${new Date().toLocaleTimeString()}`;
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 15px;
  font-size: 14px;
}
</style>
```

---

## Rating Changed Event

Track rating changes:

```vue
<template>
  <div class="tracking-demo">
    <ejs-rating
      :value="ratingValue"
      @change="onRatingChange"
      @created="onCreated">
    </ejs-rating>

    <div class="stats">
      <h4>Rating Statistics</h4>
      <p><strong>Current Rating:</strong> {{ ratingValue }}/5</p>
      <p><strong>Total Changes:</strong> {{ changeCount }}</p>
      <p><strong>Last Change:</strong> {{ lastChangeTime }}</p>
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
      ratingValue: 0,
      changeCount: 0,
      lastChangeTime: 'Never'
    }
  },
  methods: {
    onRatingChange(event) {
      this.ratingValue = event.value;
      this.changeCount++;
      this.lastChangeTime = new Date().toLocaleTimeString();
    },
    onCreated() {
      console.log('Rating component created');
    }
  }
}
</script>

<style scoped>
.tracking-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.stats {
  margin-top: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.stats h4 {
  margin-top: 0;
}

.stats p {
  margin: 8px 0;
}
</style>
```

---

## Hover Effects

Track hover interactions:

```vue
<template>
  <div class="hover-demo">
    <ejs-rating
      :value="selectedRating"
      @change="handleChange"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
    </ejs-rating>

    <div class="hover-info">
      <p><strong>Hovered:</strong> {{ hoveredValue || 'None' }}/5</p>
      <p><strong>Selected:</strong> {{ selectedRating || 'None' }}/5</p>
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
      hoveredValue: 0,
      selectedRating: 0
    }
  },
  methods: {
    handleChange(event) {
      this.selectedRating = event.value;
    },
    handleMouseEnter(event) {
      this.hoveredValue = event.value;
    },
    handleMouseLeave() {
      this.hoveredValue = 0;
    }
  }
}
</script>

<style scoped>
.hover-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.hover-info {
  margin-top: 15px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.hover-info p {
  margin: 8px 0;
}
</style>
```

---

## Examples

### Complete Event Handling Demo

```vue
<template>
  <div class="events-demo">
    <h3>Rating Events Demo</h3>

    <div class="demo-section">
      <h4>Product Rating with Event Tracking</h4>

      <div class="rating-section">
        <label>How would you rate this product?</label>
        <ejs-rating
          :value="form.rating"
          @change="updateRating"
          placeholder="Select rating">
        </ejs-rating>

        <div class="form-section">
          <label for="review">Leave a Review:</label>
          <textarea
            id="review"
            v-model="form.review"
            rows="4"
            @change="updateReview"
            placeholder="Share your feedback...">
          </textarea>

          <button @click="submitReview" :disabled="form.rating === 0">
            Submit Review
          </button>
        </div>
      </div>

      <div class="event-log">
        <h4>Event Log</h4>
        <div class="log-container">
          <div v-for="(log, index) in eventLog" :key="index" class="log-entry">
            <span class="time">{{ log.time }}</span>
            <span class="event">{{ log.event }}</span>
            <span class="value">{{ log.value }}</span>
          </div>
        </div>
        <button @click="clearLog" class="clear-btn">Clear Log</button>
      </div>
    </div>

    <div class="demo-section">
      <h4>Rating History</h4>

      <div class="history">
        <div v-if="history.length === 0" class="empty">
          No ratings yet
        </div>

        <div v-for="(item, index) in history" :key="index" class="history-item">
          <div class="timestamp">{{ item.timestamp }}</div>
          <div class="rating-display">
            <ejs-rating :value="item.rating" read-only></ejs-rating>
            <span class="rating-text">{{ item.rating }}/5</span>
          </div>
          <p v-if="item.review" class="review">{{ item.review }}</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Rating Statistics</h4>

      <div class="stats-grid">
        <div class="stat">
          <div class="stat-value">{{ totalRatings }}</div>
          <div class="stat-label">Total Ratings</div>
        </div>

        <div class="stat">
          <div class="stat-value">{{ averageRating.toFixed(1) }}</div>
          <div class="stat-label">Average Rating</div>
        </div>

        <div class="stat">
          <div class="stat-value">{{ highestRating }}</div>
          <div class="stat-label">Highest Rating</div>
        </div>

        <div class="stat">
          <div class="stat-value">{{ lowestRating }}</div>
          <div class="stat-label">Lowest Rating</div>
        </div>
      </div>

      <div class="distribution">
        <h5>Rating Distribution</h5>
        <div class="dist-item">
          <span>⭐⭐⭐⭐⭐ (5 stars)</span>
          <div class="bar">
            <div class="fill" :style="{ width: distribution[5] + '%' }"></div>
          </div>
          <span>{{ distribution[5] }}%</span>
        </div>
        <div class="dist-item">
          <span>⭐⭐⭐⭐ (4 stars)</span>
          <div class="bar">
            <div class="fill" :style="{ width: distribution[4] + '%' }"></div>
          </div>
          <span>{{ distribution[4] }}%</span>
        </div>
        <div class="dist-item">
          <span>⭐⭐⭐ (3 stars)</span>
          <div class="bar">
            <div class="fill" :style="{ width: distribution[3] + '%' }"></div>
          </div>
          <span>{{ distribution[3] }}%</span>
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
      form: {
        rating: 0,
        review: ''
      },
      eventLog: [],
      history: [],
      ratings: []
    }
  },
  computed: {
    totalRatings() {
      return this.history.length;
    },
    averageRating() {
      if (this.history.length === 0) return 0;
      const sum = this.history.reduce((acc, item) => acc + item.rating, 0);
      return sum / this.history.length;
    },
    highestRating() {
      return this.history.length > 0 ? Math.max(...this.history.map(h => h.rating)) : 0;
    },
    lowestRating() {
      return this.history.length > 0 ? Math.min(...this.history.map(h => h.rating)) : 0;
    },
    distribution() {
      const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      this.history.forEach(item => {
        dist[item.rating] = (dist[item.rating] || 0) + 1;
      });
      const total = this.history.length || 1;
      return {
        5: Math.round(dist[5] / total * 100),
        4: Math.round(dist[4] / total * 100),
        3: Math.round(dist[3] / total * 100),
        2: Math.round(dist[2] / total * 100),
        1: Math.round(dist[1] / total * 100)
      };
    }
  },
  methods: {
    updateRating(event) {
      this.form.rating = event.value;
      this.logEvent('rating_selected', `Rating: ${event.value}/5`);
    },
    updateReview(event) {
      this.logEvent('review_typed', `${event.target.value.length} characters`);
    },
    submitReview() {
      if (this.form.rating === 0) {
        alert('Please select a rating');
        return;
      }

      this.history.unshift({
        rating: this.form.rating,
        review: this.form.review,
        timestamp: new Date().toLocaleString()
      });

      this.logEvent('review_submitted', `${this.form.rating}/5 stars`);

      this.form.rating = 0;
      this.form.review = '';
    },
    logEvent(event, value) {
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift({ time, event, value });
      if (this.eventLog.length > 15) {
        this.eventLog.pop();
      }
    },
    clearLog() {
      this.eventLog = [];
    }
  }
}
</script>

<style scoped>
.events-demo {
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

h5 {
  margin: 15px 0 10px 0;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.rating-section {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-section {
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
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

.clear-btn {
  background: #e0e0e0;
  color: #333;
}

.clear-btn:hover {
  background: #d0d0d0;
}

.event-log {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.log-container {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 12px;
}

.log-entry {
  display: flex;
  gap: 10px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}

.log-entry:last-child {
  border-bottom: none;
}

.time {
  color: #666;
  min-width: 80px;
}

.event {
  color: #0078d4;
  font-weight: bold;
  min-width: 100px;
}

.value {
  color: #107c10;
}

.history {
  max-height: 300px;
  overflow-y: auto;
}

.empty {
  padding: 20px;
  text-align: center;
  color: #999;
  font-style: italic;
}

.history-item {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f9f9f9;
}

.timestamp {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.rating-text {
  font-weight: bold;
}

.review {
  margin: 10px 0 0 0;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat {
  padding: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #0078d4;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.distribution {
  padding: 15px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.dist-item {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.dist-item:last-child {
  margin-bottom: 0;
}

.bar {
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(to right, #ffc107, #ff9800);
  transition: width 0.3s ease;
}
</style>
```
