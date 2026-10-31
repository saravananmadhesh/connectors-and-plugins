# Common Implementation Patterns

## Table of Contents
- [Dashboard Layouts](#dashboard-layouts)
  - [Simple Metric Cards](#simple-metric-cards)
  - [Executive Summary Layout](#executive-summary-layout)
- [Responsive Design](#responsive-design)
  - [Mobile-First Layout](#mobile-first-layout)
  - [Breakpoint-Based Styling](#breakpoint-based-styling)
- [Real-time Data Streaming](#real-time-data-streaming)
  - [Live Data Updates](#live-data-updates)
  - [Websocket Streaming](#websocket-streaming)
- [Multiple Sparklines in Grids](#multiple-sparklines-in-grids)
  - [Table with Inline Sparklines](#table-with-inline-sparklines)
- [Error Handling](#error-handling)
  - [Validate Data Before Rendering](#validate-data-before-rendering)
  - [Handle Missing or Incomplete Data](#handle-missing-or-incomplete-data)
- [Performance Tips](#performance-tips)
  - [Tip 1: Lazy Load Sparklines](#tip-1-lazy-load-sparklines)
  - [Tip 2: Debounce Data Updates](#tip-2-debounce-data-updates)
  - [Tip 3: Memoize Expensive Computations](#tip-3-memoize-expensive-computations)
- [Mobile-Friendly Sparklines](#mobile-friendly-sparklines)
  - [Touch-Friendly Sizing](#touch-friendly-sizing)
  - [Disable Tooltips on Mobile](#disable-tooltips-on-mobile)
- [Key Takeaways](#key-takeaways)

---

## Dashboard Layouts

### Simple Metric Cards

Create a grid of KPI cards with sparklines:

```vue
<template>
  <div class="dashboard">
    <div class="metric-card" v-for="metric in metrics" :key="metric.id">
      <div class="metric-header">
        <h4>{{ metric.title }}</h4>
        <span class="metric-value">{{ metric.currentValue }}</span>
      </div>
      
      <ejs-sparkline 
        :id="'sparkline-' + metric.id"
        :dataSource='metric.data'
        :type='metric.type'
        :fill='metric.color'
        :containerArea='containerArea'
        :height='sparklineHeight'
        :width='sparklineWidth'>
      </ejs-sparkline>
      
      <div class="metric-footer">
        <span>{{ metric.range }}</span>
        <span :style="{ color: metric.trendColor }">
          {{ metric.trendIcon }} {{ metric.trendPercent }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      sparklineHeight: '80px',
      sparklineWidth: '100%',
      containerArea: {
        border: { color: '#e0e0e0', width: 1 },
        background: '#fafafa'
      },
      metrics: [
        {
          id: 1,
          title: 'Total Sales',
          currentValue: '$45,230',
          data: [3, 6, 4, 1, 3, 2, 5],
          type: 'Area',
          color: '#1976d2',
          range: 'Last 7 days',
          trendIcon: '📈',
          trendColor: '#4caf50',
          trendPercent: 12.5
        },
        {
          id: 2,
          title: 'Website Traffic',
          currentValue: '12,450',
          data: [2, 4, 3, 5, 1, 4, 3],
          type: 'Line',
          color: '#388e3c',
          range: 'Last 7 days',
          trendIcon: '📈',
          trendColor: '#4caf50',
          trendPercent: 8.2
        },
        {
          id: 3,
          title: 'Conversion Rate',
          currentValue: '3.2%',
          data: [4, 2, 5, 3, 6, 1, 4],
          type: 'Column',
          color: '#f57c00',
          range: 'Last 7 days',
          trendIcon: '📉',
          trendColor: '#f44336',
          trendPercent: 2.1
        }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
}

.metric-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.metric-header h4 {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.metric-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.metric-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 12px;
  color: #999;
}
</style>
```

### Executive Summary Layout

Combine multiple sparklines in summary format:

```vue
<template>
  <div class="executive-summary">
    <h2>Weekly Performance Summary</h2>
    
    <div class="summary-row">
      <div class="summary-item">
        <label>Revenue Trend</label>
        <ejs-sparkline 
          :dataSource='revenueTrend'
          type='Area'
          fill='#2196f3'
          height='60px'
          width='100%'>
        </ejs-sparkline>
      </div>
      
      <div class="summary-item">
        <label>User Growth</label>
        <ejs-sparkline 
          :dataSource='userGrowth'
          type='Line'
          fill='#4caf50'
          height='60px'
          width='100%'>
        </ejs-sparkline>
      </div>
      
      <div class="summary-item">
        <label>Engagement</label>
        <ejs-sparkline 
          :dataSource='engagement'
          type='Column'
          fill='#ff9800'
          height='60px'
          width='100%'>
        </ejs-sparkline>
      </div>
    </div>
  </div>
</template>
<script>
import { SparklineComponent } from '@syncfusion/ej2-vue-charts';

export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      sparklineHeight: '80px',
      sparklineWidth: '100%',
      containerArea: {
        border: { color: '#e0e0e0', width: 1 },
        background: '#fafafa'
      },
      metrics: [
        {
          id: 1,
          title: 'Total Sales',
          currentValue: '$45,230',
          data: [3, 6, 4, 1, 3, 2, 5],
          type: 'Area',
          color: '#1976d2',
          range: 'Last 7 days',
          trendIcon: '📈',
          trendColor: '#4caf50',
          trendPercent: 12.5
        },
        {
          id: 2,
          title: 'Website Traffic',
          currentValue: '12,450',
          data: [2, 4, 3, 5, 1, 4, 3],
          type: 'Line',
          color: '#388e3c',
          range: 'Last 7 days',
          trendIcon: '📈',
          trendColor: '#4caf50',
          trendPercent: 8.2
        },
        {
          id: 3,
          title: 'Conversion Rate',
          currentValue: '3.2%',
          data: [4, 2, 5, 3, 6, 1, 4],
          type: 'Column',
          color: '#f57c00',
          range: 'Last 7 days',
          trendIcon: '📉',
          trendColor: '#f44336',
          trendPercent: 2.1
        }
      ]
    }
  }
}
</script>

<style scoped>
.executive-summary {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.executive-summary h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
}

.summary-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-item label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
}
</style>
```

---

## Responsive Design

### Mobile-First Layout

```vue
<template>
  <div class="responsive-dashboard">
    <div class="metric-grid" :class="{ mobile: isMobile }">
      <div class="metric" v-for="metric in metrics" :key="metric.id">
        <h4>{{ metric.title }}</h4>
        <ejs-sparkline 
          :dataSource='metric.data'
          :height='sparklineHeight'
          :width='sparklineWidth'
          :containerArea='getContainerArea()'>
        </ejs-sparkline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isMobile: window.innerWidth < 768,
      metrics: [
        { id: 1, title: 'Sales', data: [3, 6, 4, 1, 3, 2, 5] },
        { id: 2, title: 'Traffic', data: [2, 4, 3, 5, 1, 4, 3] }
      ]
    }
  },
  computed: {
    sparklineHeight: function() {
      return this.isMobile ? '60px' : '100px';
    },
    sparklineWidth: function() {
      return this.isMobile ? '100%' : '80%';
    }
  },
  methods: {
    getContainerArea: function() {
      if (this.isMobile) {
        return { background: 'transparent' };  // Minimal styling on mobile
      } else {
        return {
          border: { color: '#ddd', width: 1 },
          background: '#fafafa'
        };
      }
    }
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
</script>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.metric-grid.mobile {
  grid-template-columns: 1fr;
  gap: 12px;
}

.metric {
  background: white;
  padding: 12px;
  border-radius: 8px;
}

.metric h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}
</style>
```

### Breakpoint-Based Styling

```vue
<script>
export default {
  data: function() {
    return {
      screenSize: this.getScreenSize()
    }
  },
  computed: {
    sparklineConfig: function() {
      const configs = {
        'sm': { height: '50px', width: '100px' },
        'md': { height: '80px', width: '150px' },
        'lg': { height: '120px', width: '250px' }
      };
      return configs[this.screenSize];
    }
  },
  methods: {
    getScreenSize: function() {
      const width = window.innerWidth;
      if (width < 576) return 'sm';
      if (width < 992) return 'md';
      return 'lg';
    }
  },
  mounted: function() {
    window.addEventListener('resize', () => {
      this.screenSize = this.getScreenSize();
    });
  }
}
</script>
```

---

## Real-time Data Streaming

### Live Data Updates

```vue
<template>
  <div>
    <div class="controls">
      <button @click="toggleStream">
        {{ isStreaming ? 'Stop' : 'Start' }} Streaming
      </button>
      <span>Points: {{ liveData.length }}</span>
    </div>
    
    <ejs-sparkline 
      id="sparkline"
      :dataSource='liveData'
      type='Line'
      fill='#1976d2'
      lineWidth='2'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
import { SparklineComponent } from "@syncfusion/ej2-vue-charts";
export default {
  components: {
    'ejs-sparkline': SparklineComponent
  },
  data: function() {
    return {
      isStreaming: false,
      streamInterval: null,
      height: '200px',
      width: '100%',
      liveData: [5, 3, 4, 6, 8, 7, 9, 1]
    }
  },
  methods: {
    toggleStream: function() {
      this.isStreaming ? this.stopStream() : this.startStream();
    },
    
    startStream: function() {
      this.isStreaming = true;
      this.streamInterval = setInterval(() => {
        const newValue = Math.floor(Math.random() * 10) + 1;
        this.liveData.push(newValue);
        
        // Keep max 50 points
        if (this.liveData.length > 50) {
          this.liveData.shift();
        }
      }, 1000);
    },
    
    stopStream: function() {
      this.isStreaming = false;
      clearInterval(this.streamInterval);
    }
  },
  beforeDestroy: function() {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
    }
  }
}
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

.controls button {
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.controls span {
  color: #666;
  font-size: 12px;
}
</style>
```

### Websocket Streaming

```vue
<script>
export default {
  methods: {
    connectWebsocket: function(url) {
      const ws = new WebSocket(url);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        // Add new value
        this.liveData.push(data.value);
        
        // Limit size
        if (this.liveData.length > 100) {
          this.liveData = this.liveData.slice(-100);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      this.ws = ws;
    }
  },
  beforeDestroy: function() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
</script>
```

---

## Multiple Sparklines in Grids

### Table with Inline Sparklines

```vue
<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Sales Trend</th>
        <th>Target</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>
          <ejs-sparkline 
            :id="'sparkline-' + product.id"
            :dataSource='product.salesTrend'
            type='Area'
            :fill='product.color'
            height='40px'
            width='150px'>
          </ejs-sparkline>
        </td>
        <td>${{ product.target }}</td>
        <td>
          <span class="status" :class="product.status">
            {{ product.statusText }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: function() {
    return {
      products: [
        {
          id: 1,
          name: 'Product A',
          salesTrend: [3, 6, 4, 1, 3, 2, 5],
          target: 50000,
          color: '#2196f3',
          status: 'on-track',
          statusText: 'On Track'
        },
        {
          id: 2,
          name: 'Product B',
          salesTrend: [2, 4, 3, 5, 1, 4, 3],
          target: 40000,
          color: '#4caf50',
          status: 'exceeding',
          statusText: 'Exceeding'
        },
        {
          id: 3,
          name: 'Product C',
          salesTrend: [5, 2, 3, 1, 4, 2, 1],
          target: 30000,
          color: '#ff9800',
          status: 'at-risk',
          statusText: 'At Risk'
        }
      ]
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background: #f5f5f5;
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

.data-table td {
  border-bottom: 1px solid #eee;
  padding: 12px;
}

.data-table tbody tr:hover {
  background: #fafafa;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status.on-track {
  background: #e3f2fd;
  color: #1976d2;
}

.status.exceeding {
  background: #e8f5e9;
  color: #388e3c;
}

.status.at-risk {
  background: #fff3e0;
  color: #f57c00;
}
</style>
```

---

## Error Handling

### Validate Data Before Rendering

```vue
<template>
  <div>
    <div v-if="hasError" class="error-message">
      {{ errorMessage }}
    </div>
    
    <ejs-sparkline 
      v-if="!hasError"
      id="sparkline"
      :dataSource='validData'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      height: '100px',
      width: '300px',
      hasError: false,
      errorMessage: '',
      rawData: null,
      validData: []
    }
  },
  methods: {
    loadData: function(data) {
      try {
        if (!this.validateData(data)) {
          throw new Error('Invalid data format');
        }
        this.validData = data;
        this.hasError = false;
      } catch (error) {
        this.hasError = true;
        this.errorMessage = `Error: ${error.message}`;
        console.error('Data loading error:', error);
      }
    },
    
    validateData: function(data) {
      if (!Array.isArray(data) || data.length === 0) {
        return false;
      }
      
      // Check if all values are numeric (for simple arrays)
      if (typeof data[0] === 'number') {
        return data.every(item => typeof item === 'number');
      }
      
      // For object arrays, validate structure
      if (typeof data[0] === 'object') {
        return data.every(item => 
          'x' in item && 'y' in item && 
          typeof item.y === 'number'
        );
      }
      
      return false;
    }
  }
}
</script>

<style scoped>
.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #c62828;
}
</style>
```

### Handle Missing or Incomplete Data

```vue
<script>
export default {
  methods: {
    sanitizeData: function(data) {
      if (!data) return [];
      
      // Filter out invalid entries
      return data.filter(item => {
        if (typeof item === 'number') {
          return !isNaN(item) && isFinite(item);
        }
        if (typeof item === 'object') {
          return item.y && !isNaN(item.y) && isFinite(item.y);
        }
        return false;
      });
    },
    
    fillMissingValues: function(data) {
      // Replace missing values with average
      const validValues = data.filter(v => v !== null && v !== undefined);
      const average = validValues.length > 0 ? 
        validValues.reduce((a, b) => a + b) / validValues.length : 0;
      
      return data.map(v => (v === null || v === undefined) ? average : v);
    }
  }
}
</script>
```

---

## Performance Tips

### Tip 1: Lazy Load Sparklines

```vue
<template>
  <div>
    <ejs-sparkline 
      v-if="isVisible"
      id="sparkline"
      :dataSource='data'
      :height='height'
      :width='width'>
    </ejs-sparkline>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isVisible: false,
      data: [3, 6, 4, 1, 3, 2, 5]
    }
  },
  mounted: function() {
    // Lazy load when in viewport
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(this.$el);
  }
}
</script>
```

### Tip 2: Debounce Data Updates

```vue
<script>
export default {
  methods: {
    debounce: function(func, delay) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    },
    
    debouncedUpdate: function() {
      return this.debounce(() => {
        this.$forceUpdate();
      }, 500);
    }
  }
}
</script>
```

### Tip 3: Memoize Expensive Computations

```vue
<script>
export default {
  computed: {
    processedData: function() {
      if (this._cachedInput === this.rawData) {
        return this._cachedOutput;
      }
      
      this._cachedInput = this.rawData;
      this._cachedOutput = this.expensiveTransformation(this.rawData);
      return this._cachedOutput;
    }
  },
  methods: {
    expensiveTransformation: function(data) {
      // Complex data processing
      return data;
    }
  }
}
</script>
```

---

## Mobile-Friendly Sparklines

### Touch-Friendly Sizing

```vue
<template>
  <ejs-sparkline 
    :dataSource='data'
    :height='mobileHeight'
    :width='mobileWidth'
    :padding='mobilePadding'>
  </ejs-sparkline>
</template>

<script>
export default {
  computed: {
    isMobile: function() {
      return window.innerWidth < 768;
    },
    mobileHeight: function() {
      return this.isMobile ? '100px' : '150px';
    },
    mobileWidth: function() {
      return this.isMobile ? '100%' : '350px';
    },
    mobilePadding: function() {
      return this.isMobile ?
        { left: 5, right: 5, top: 5, bottom: 5 } :
        { left: 20, right: 20, top: 20, bottom: 20 };
    }
  }
}
</script>
```

### Disable Tooltips on Mobile

```vue
<template>
  <ejs-sparkline 
    :dataSource='data'
    :tooltipSettings='tooltipSettings'>
  </ejs-sparkline>
</template>

<script>
export default {
  computed: {
    isMobile: function() {
      return window.innerWidth < 768;
    },
    tooltipSettings: function() {
      return {
        visible: !this.isMobile  // Tooltips only on desktop
      }
    }
  }
}
</script>
```

---

## Key Takeaways

1. **Dashboard Layouts:** Use grid layouts for responsive metric cards
2. **Real-time Updates:** Implement debouncing and data limits for streaming data
3. **Responsive Design:** Adjust sizes and styling based on screen size
4. **Performance:** Limit data points, lazy load, and memoize expensive operations
5. **Error Handling:** Validate data before rendering
6. **Mobile:** Simplify styling and disable heavy features on touch devices
7. **Accessibility:** Enable labels and keyboard support for all deployments
