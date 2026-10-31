# Real-Time Data and Advanced Use Cases

## Table of Contents
- [Real-Time Data Updates](#real-time-data-updates)
  - [Basic Value Update](#basic-value-update)
  - [Smooth Value Transitions](#smooth-value-transitions)
  - [Value History Tracking](#value-history-tracking)
- [Polling Patterns](#polling-patterns)
  - [Simple Polling](#simple-polling)
  - [Adaptive Polling Interval](#adaptive-polling-interval)
- [WebSocket Integration](#websocket-integration)
  - [Basic WebSocket Connection](#basic-websocket-connection)
  - [WebSocket with Message Types](#websocket-with-message-types)
- [Multi-Gauge Dashboards](#multi-gauge-dashboards)
  - [Dashboard Layout](#dashboard-layout)
- [Performance Optimization](#performance-optimization)
  - [Disable Animation for Frequent Updates](#disable-animation-for-frequent-updates)
  - [Batch Updates](#batch-updates)
  - [Virtual Updates (Only Update When Needed)](#virtual-updates-only-update-when-needed)
- [Common Use Case Patterns](#common-use-case-patterns)
  - [Pattern 1: System Performance Monitor](#pattern-1-system-performance-monitor)
  - [Pattern 2: Industrial Temperature Monitor](#pattern-2-industrial-temperature-monitor)
  - [Pattern 3: Vehicle Dashboard Speedometer](#pattern-3-vehicle-dashboard-speedometer)
- [Responsive Gauge Implementation](#responsive-gauge-implementation)
  - [Mobile-Responsive Gauge](#mobile-responsive-gauge)

## Real-Time Data Updates

Update gauge values dynamically from data sources.

### Basic Value Update

```vue
<template>
  <ejs-circulargauge :axes="axes"></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      axes: [{
        minimum: 0,
        maximum: 100,
        pointers: [{
          value: 50,
          enableDrag: false,
          animation: {
            enable: true,
            duration: 500
          }
        }]
      }]
    };
  },
  
  methods: {
    updateValue(newValue) {
      // Update pointer value
      this.axes[0].pointers[0].value = newValue;
      this.$forceUpdate();  // Trigger Vue update
    }
  },
  
  mounted() {
    // Simulate real-time updates
    setInterval(() => {
      const newValue = Math.random() * 100;
      this.updateValue(newValue);
    }, 2000);
  }
}
</script>
```

### Smooth Value Transitions

```javascript
methods: {
  updateValueSmooth(targetValue, duration = 1000) {
    const startValue = this.axes[0].pointers[0].value;
    const startTime = Date.now();
    
    const updateFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linear interpolation
      const newValue = startValue + (targetValue - startValue) * progress;
      this.axes[0].pointers[0].value = newValue;
      this.$forceUpdate();
      
      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      }
    };
    
    requestAnimationFrame(updateFrame);
  }
}
```

### Value History Tracking

```javascript
data() {
  return {
    valueHistory: [],
    maxHistory: 100  // Keep last 100 values
  };
},

methods: {
  updateWithHistory(newValue) {
    this.valueHistory.push({
      value: newValue,
      timestamp: new Date(),
      average: this.calculateAverage()
    });
    
    // Trim history
    if (this.valueHistory.length > this.maxHistory) {
      this.valueHistory.shift();
    }
    
    this.axes[0].pointers[0].value = newValue;
    this.$forceUpdate();
  },
  
  calculateAverage() {
    if (this.valueHistory.length === 0) return 0;
    const sum = this.valueHistory.reduce((a, b) => a + b.value, 0);
    return sum / this.valueHistory.length;
  }
}
```

## Polling Patterns

Fetch updated data at regular intervals.

### Simple Polling

```javascript
data() {
  return {
    pollInterval: null,
    isPolling: false
  };
},

methods: {
  startPolling() {
    this.isPolling = true;
    this.pollInterval = setInterval(() => {
      this.fetchAndUpdateValue();
    }, 5000);  // Poll every 5 seconds
  },
  
  stopPolling() {
    this.isPolling = false;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  },
  
  async fetchAndUpdateValue() {
    try {
      const response = await fetch('/api/current-value');
      const data = await response.json();
      this.updateValue(data.value);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  }
},

mounted() {
  this.startPolling();
},

beforeDestroy() {
  this.stopPolling();
}
```

### Adaptive Polling Interval

```javascript
data() {
  return {
    pollInterval: null,
    currentInterval: 5000,  // Start at 5 seconds
    minInterval: 1000,
    maxInterval: 30000,
    failureCount: 0
  };
},

methods: {
  async fetchAndUpdateValue() {
    try {
      const response = await fetch('/api/current-value');
      const data = await response.json();
      
      this.updateValue(data.value);
      
      // On success, potentially increase interval
      if (this.failureCount > 0) {
        this.failureCount = 0;
        this.adjustPollInterval(true);
      }
    } catch (error) {
      this.failureCount++;
      
      // On failure, decrease interval (retry faster)
      if (this.failureCount <= 3) {
        this.adjustPollInterval(false);
      }
    }
  },
  
  adjustPollInterval(increase) {
    if (increase) {
      this.currentInterval = Math.min(
        this.currentInterval * 1.2,
        this.maxInterval
      );
    } else {
      this.currentInterval = Math.max(
        this.currentInterval * 0.8,
        this.minInterval
      );
    }
    
    // Restart polling with new interval
    clearInterval(this.pollInterval);
    this.startPolling();
  }
}
```

## WebSocket Integration

Use WebSocket for push-based updates instead of polling.

### Basic WebSocket Connection

```javascript
data() {
  return {
    ws: null,
    isConnected: false
  };
},

methods: {
  connectWebSocket() {
    this.ws = new WebSocket('wss://api.example.com/metrics');
    
    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
      this.isConnected = true;
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.updateValue(data.value);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    };
    
    this.ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      this.isConnected = false;
      
      // Attempt reconnect after delay
      setTimeout(() => this.connectWebSocket(), 3000);
    };
  },
  
  disconnectWebSocket() {
    if (this.ws) {
      this.ws.close();
    }
  }
},

mounted() {
  this.connectWebSocket();
},

beforeDestroy() {
  this.disconnectWebSocket();
}
```

### WebSocket with Message Types

```javascript
onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'value_update':
      this.updateValue(message.value);
      break;
      
    case 'config_update':
      this.updateConfiguration(message.config);
      break;
      
    case 'alert':
      this.showAlert(message.alert);
      break;
      
    case 'heartbeat':
      // Keep-alive message
      break;
      
    default:
      console.warn('Unknown message type:', message.type);
  }
}
```

## Multi-Gauge Dashboards

Create dashboards with multiple related gauges.

### Dashboard Layout

```vue
<template>
  <div class="dashboard">
    <div class="header">
      <h1>System Monitoring Dashboard</h1>
      <button v-if="!isPolling" @click="startPolling">Start Monitoring</button>
      <button v-if="isPolling" @click="stopPolling">Stop Monitoring</button>
    </div>
    
    <div class="gauges-grid">
      <div class="gauge-card">
        <h2>CPU Usage</h2>
        <ejs-circulargauge :axes="cpuAxes"></ejs-circulargauge>
        <p class="value">{{ cpuValue }}%</p>
      </div>
      
      <div class="gauge-card">
        <h2>Memory Usage</h2>
        <ejs-circulargauge :axes="memoryAxes"></ejs-circulargauge>
        <p class="value">{{ memoryValue }}%</p>
      </div>
      
      <div class="gauge-card">
        <h2>Disk Usage</h2>
        <ejs-circulargauge :axes="diskAxes"></ejs-circulargauge>
        <p class="value">{{ diskValue }}%</p>
      </div>
      
      <div class="gauge-card">
        <h2>Network I/O</h2>
        <ejs-circulargauge :axes="networkAxes"></ejs-circulargauge>
        <p class="value">{{ networkValue }} Mbps</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cpuValue: 0,
      memoryValue: 0,
      diskValue: 0,
      networkValue: 0,
      isPolling: false,
      
      cpuAxes: [{
        minimum: 0,
        maximum: 100,
        ranges: [
          { start: 0, end: 50, color: '#27AE60' },
          { start: 50, end: 100, color: '#E74C3C' }
        ],
        pointers: [{ value: 0 }]
      }],
      
      memoryAxes: [{
        minimum: 0,
        maximum: 100,
        ranges: [
          { start: 0, end: 50, color: '#27AE60' },
          { start: 50, end: 100, color: '#E74C3C' }
        ],
        pointers: [{ value: 0 }]
      }],
      
      diskAxes: [{
        minimum: 0,
        maximum: 100,
        ranges: [
          { start: 0, end: 50, color: '#27AE60' },
          { start: 50, end: 100, color: '#E74C3C' }
        ],
        pointers: [{ value: 0 }]
      }],
      
      networkAxes: [{
        minimum: 0,
        maximum: 1000,
        ranges: [
          { start: 0, end: 500, color: '#27AE60' },
          { start: 500, end: 1000, color: '#E74C3C' }
        ],
        pointers: [{ value: 0 }]
      }]
    };
  },
  
  methods: {
    startPolling() {
      this.isPolling = true;
      this.pollMetrics();
    },
    
    stopPolling() {
      this.isPolling = false;
    },
    
    pollMetrics() {
      if (!this.isPolling) return;
      
      fetch('/api/system-metrics')
        .then(r => r.json())
        .then(data => {
          this.cpuValue = data.cpu;
          this.memoryValue = data.memory;
          this.diskValue = data.disk;
          this.networkValue = data.network;
          
          this.cpuAxes[0].pointers[0].value = data.cpu;
          this.memoryAxes[0].pointers[0].value = data.memory;
          this.diskAxes[0].pointers[0].value = data.disk;
          this.networkAxes[0].pointers[0].value = data.network;
          
          this.$forceUpdate();
        })
        .catch(error => console.error('Fetch error:', error))
        .finally(() => {
          if (this.isPolling) {
            setTimeout(() => this.pollMetrics(), 5000);
          }
        });
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.gauges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.gauge-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gauge-card h2 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
}

.value {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #3FB9E3;
  margin: 15px 0 0 0;
}
</style>
```

## Performance Optimization

Optimize gauges for best rendering performance.

### Disable Animation for Frequent Updates

```javascript
axes: [{
  pointers: [{
    value: 65,
    animation: {
      enable: false  // Disable for frequent updates
    }
  }]
}]
```

### Batch Updates

```javascript
data() {
  return {
    updateQueue: [],
    updateTimer: null
  };
},

methods: {
  queueUpdate(value) {
    this.updateQueue.push(value);
    
    if (!this.updateTimer) {
      this.updateTimer = setTimeout(() => {
        this.processUpdates();
      }, 50);  // Batch updates every 50ms
    }
  },
  
  processUpdates() {
    if (this.updateQueue.length > 0) {
      const lastValue = this.updateQueue[this.updateQueue.length - 1];
      this.axes[0].pointers[0].value = lastValue;
      this.$forceUpdate();
      
      this.updateQueue = [];
      this.updateTimer = null;
    }
  }
}
```

### Virtual Updates (Only Update When Needed)

```javascript
methods: {
  updateValueSmartly(newValue) {
    const currentValue = this.axes[0].pointers[0].value;
    const threshold = 0.5;  // Only update if change > 0.5
    
    if (Math.abs(newValue - currentValue) > threshold) {
      this.axes[0].pointers[0].value = newValue;
      this.$forceUpdate();
    }
  }
}
```

## Common Use Case Patterns

### Pattern 1: System Performance Monitor

```javascript
// Monitor CPU, memory, disk, network
// Update every 2 seconds
// Show alerts when exceeding thresholds
axes: [
  {
    pointers: [{ value: 0 }],
    ranges: [
      { start: 0, end: 50, color: '#27AE60' },
      { start: 50, end: 80, color: '#F39C12' },
      { start: 80, end: 100, color: '#E74C3C' }
    ]
  }
]

// Alert logic
watch: {
  cpuValue(newValue) {
    if (newValue > 80) {
      this.showAlert('CPU usage critical: ' + newValue + '%');
    }
  }
}
```

### Pattern 2: Industrial Temperature Monitor

```javascript
// Real-time temperature with zones
axes: [{
  minimum: -20,
  maximum: 80,
  ranges: [
    { start: -20, end: 0, color: '#3498DB', name: 'Freezing' },
    { start: 0, end: 15, color: '#27AE60', name: 'Cold' },
    { start: 15, end: 25, color: '#F39C12', name: 'Normal' },
    { start: 25, end: 40, color: '#E74C3C', name: 'Hot' },
    { start: 40, end: 80, color: '#C0392B', name: 'Critical' }
  ],
  pointers: [{ value: 22 }]
}]
```

### Pattern 3: Vehicle Dashboard Speedometer

```javascript
// Speed gauge with multiple pointers
axes: [{
  minimum: 0,
  maximum: 300,
  startAngle: 200,
  endAngle: 340,
  pointers: [
    { value: 85, name: 'Speed', radius: '60%' },
    { value: 120, name: 'Speed limit', radius: '70%' }
  ]
}]
```

## Responsive Gauge Implementation

Create gauges that adapt to different screen sizes.

### Mobile-Responsive Gauge

```vue
<template>
  <ejs-circulargauge 
    :width="gaugeWidth"
    :height="gaugeHeight"
    :axes="axes"
  ></ejs-circulargauge>
</template>

<script>
export default {
  data() {
    return {
      gaugeWidth: '100%',
      gaugeHeight: '400px'
    };
  },
  
  methods: {
    onResize() {
      const width = window.innerWidth;
      
      if (width < 480) {
        this.gaugeHeight = '250px';
      } else if (width < 768) {
        this.gaugeHeight = '350px';
      } else {
        this.gaugeHeight = '400px';
      }
    }
  },
  
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
}
</script>

<style scoped>
@media (max-width: 480px) {
  :deep(.e-circulargauge) {
    font-size: 10px;
  }
}
</style>
```

