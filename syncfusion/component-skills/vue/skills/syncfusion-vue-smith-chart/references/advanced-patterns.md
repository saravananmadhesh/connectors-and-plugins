# Advanced Patterns

## Table of Contents
- [Impedance vs Admittance Rendering](#impedance-vs-admittance-rendering)
  - [Impedance Rendering (Default)](#impedance-rendering-default)
  - [Admittance Rendering](#admittance-rendering)
  - [Switching Between Modes](#switching-between-modes)
- [Vue 3 Composition API](#vue-3-composition-api)
  - [Basic Setup](#basic-setup)
  - [Reactive Data Updates](#reactive-data-updates)
  - [Async Data Loading](#async-data-loading)
- [Data Transformation Patterns](#data-transformation-patterns)
  - [Convert from Frequency and S-Parameters](#convert-from-frequency-and-s-parameters)
  - [Convert from Complex Impedance](#convert-from-complex-impedance)
  - [Normalize Data to Chart Range](#normalize-data-to-chart-range)
  - [Filter Data by Criteria](#filter-data-by-criteria)
- [Performance Optimization](#performance-optimization)
  - [Virtual Scrolling](#virtual-scrolling)
  - [Data Decimation](#data-decimation)
  - [Lazy Loading](#lazy-loading)
- [Real-World Examples](#real-world-examples)
  - [Example 1: RF Cable Matching Network](#example-1-rf-cable-matching-network)
  - [Example 2: Multi-Frequency Analysis](#example-2-multi-frequency-analysis)

## Impedance vs Admittance Rendering

Smith Charts can render in two modes: impedance (default) and admittance.

### Impedance Rendering (Default)

Impedance = Resistance + j×Reactance. This is the standard mode for RF circuit analysis.

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    :title='title'
    renderType="Impedance">
    <e-seriesCollection>
      <e-series 
        :dataSource='impedanceData' 
        :name='name'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
export default {
  data: function () {
    return {
      title: { text: 'Impedance Smith Chart' },
      impedanceData: [
        { resistance: 10, reactance: 25 },
        { resistance: 8, reactance: 6 },
        // ... more impedance points
      ],
      name: 'Impedance Curve',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

### Admittance Rendering

Admittance is the reciprocal of impedance. Use for certain network analysis scenarios.

```vue
<template>
  <ejs-smithchart 
    id="smithchart" 
    :title='title'
    renderType="Admittance">
    <e-seriesCollection>
      <e-series 
        :dataSource='admittanceData' 
        :name='name'
        :reactance='reactance' 
        :resistance='resistance'>
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>

<script>
export default {
  data: function () {
    return {
      title: { text: 'Admittance Smith Chart' },
      admittanceData: [
        { resistance: 0.1, reactance: -0.25 },
        { resistance: 0.125, reactance: -0.06 },
        // ... more admittance points
      ],
      name: 'Admittance Curve',
      reactance: 'reactance',
      resistance: 'resistance'
    }
  }
}
</script>
```

### Switching Between Modes

```vue
<template>
  <div>
    <div class="controls">
      <label>
        <input type="radio" v-model="chartMode" value="Impedance"> Impedance
      </label>
      <label>
        <input type="radio" v-model="chartMode" value="Admittance"> Admittance
      </label>
    </div>
    
    <ejs-smithchart 
      id="smithchart" 
      :title='title'
      :renderType='chartMode'>
      <e-seriesCollection>
        <e-series 
          :dataSource='currentData' 
          :name='name'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      chartMode: 'Impedance',
      impedanceData: [ /* impedance points */ ],
      admittanceData: [ /* admittance points */ ],
      name: 'Data'
    }
  },
  computed: {
    currentData() {
      return this.chartMode === 'Impedance' 
        ? this.impedanceData 
        : this.admittanceData;
    }
  }
}
</script>
```

## Vue 3 Composition API

Implement Smith Chart using Vue 3's modern Composition API.

### Basic Setup

```vue
<script setup>
import { ref } from 'vue';
import { SmithchartComponent as EjsSmithchart, SeriesDirective as ESeries, SeriesCollectionDirective as ESeriesCollection } from '@syncfusion/ej2-vue-charts';

const title = ref({ text: 'Smith Chart with Composition API' });
const dataSource = ref([
  { resistance: 10, reactance: 25 },
  { resistance: 8, reactance: 6 },
  { resistance: 6, reactance: 4.5 }
]);
const name = ref('Transmission1');
const reactance = ref('reactance');
const resistance = ref('resistance');
</script>

<template>
  <ejs-smithchart id="smithchart" :title="title">
    <e-seriesCollection>
      <e-series 
        :dataSource="dataSource" 
        :name="name" 
        :reactance="reactance" 
        :resistance="resistance">
      </e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>
```

### Reactive Data Updates

```vue
<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import { SmithchartComponent as EjsSmithchart, SeriesDirective as ESeries, SeriesCollectionDirective as ESeriesCollection } from '@syncfusion/ej2-vue-charts';

const dataSource = ref([
  { resistance: 10, reactance: 25 }
]);

const userInput = ref({ res: 10, react: 25 });

const reactanceField = 'reactance';
const resistanceField = 'resistance';

const name = 'Transmission1';

function addPoint() {
  dataSource.value = [
    ...dataSource.value,
    {
      resistance: userInput.value.res,
      reactance: userInput.value.react
    }
  ];

  nextTick(() => {});
}

function clearData() {
  dataSource.value = [];
  nextTick(() => {});
}

watch(
  userInput,
  (newVal) => {
    console.log('Input changed:', newVal);
  },
  { deep: true }
);

const pointCount = computed(() => dataSource.value.length);
</script>

<template>
  <div>
    <div class="controls">
      <input v-model.number="userInput.res" placeholder="Resistance" type="number" />
      <input v-model.number="userInput.react" placeholder="Reactance" type="number" />
      <button @click="addPoint">Add Point</button>
      <button @click="clearData">Clear</button>
      <span>Points: {{ pointCount }}</span>
    </div>

    <ejs-smithchart id="smithchart">
      <e-seriesCollection>
        <e-series
          :dataSource="dataSource"
          :name="name"
          :reactance="reactanceField"
          :resistance="resistanceField"
        />
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>
```

### Async Data Loading

```vue
<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const error = ref(null);
const reactance = "reactance";
const resistance = "resistance";
const dataSource = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/transmission-data');
    dataSource.value = await response.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="loading">Loading data...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <ejs-smithchart v-else id="smithchart">
    <e-seriesCollection>
      <e-series :dataSource="dataSource" :reactance='reactance' :resistance='resistance'></e-series>
    </e-seriesCollection>
  </ejs-smithchart>
</template>
```

## Data Transformation Patterns

Convert various data formats to Smith Chart compatible format.

### Convert from Frequency and S-Parameters

S-parameters (scattering parameters) are commonly used in RF analysis.

```javascript
function sParametersToImpedance(sParams, z0 = 50, normalize = false) {
  return sParams.map((s) => {
    const a = s.s11Real;
    const b = s.s11Imag;
    const numRe = 1 + a;
    const numIm = b;
    const denRe = 1 - a;
    const denIm = -b;
    // denom magnitude squared
    const denMag2 = denRe * denRe + denIm * denIm;
    const EPS = 1e-12;
    if (denMag2 < EPS) {
      return {
        resistance: Infinity,
        reactance: Infinity
      };
    }
    // Complex division: (num / den)
    // (x + jy)/(u + jv) = [(xu + yv) + j(yu - xv)]/(u^2 + v^2)
    const ratioRe = (numRe * denRe + numIm * denIm) / denMag2;
    const ratioIm = (numIm * denRe - numRe * denIm) / denMag2;
    // Z = Z0 * ratio
    let zRe = z0 * ratioRe;
    let zIm = z0 * ratioIm;
    return {
      resistance: zRe,
      reactance: zIm
    };
  });
}

```

### Convert from Complex Impedance

```javascript
function complexToResistanceReactance(impedances) {
  return impedances.map(z => ({
    resistance: z.real ?? z.re ?? 0,
    reactance: z.imaginary ?? z.imag ?? z.im ?? 0
  }));
}

// Usage
const complexZ = [
  { real: 10, imaginary: 25 },
  { real: 8, imaginary: 6 }
];
const smithData = complexToResistanceReactance(complexZ);
```

### Normalize Data to Chart Range

```javascript
function normalizeImpedance(impedances, z0 = 50) {
  // Normalize to characteristic impedance
  return impedances.map(z => ({
    resistance: z.resistance / z0,
    reactance: z.reactance / z0
  }));
}

// Usage in component
computed: {
  normalizedData() {
    return normalizeImpedance(this.rawData, this.charZero);
  }
}
```

### Filter Data by Criteria

```javascript
methods: {
  filterLowLoss(data) {
    // Keep only points with reactance < 10
    return data.filter(point => Math.abs(point.reactance) < 10);
  },
  
  filterResistanceRange(data, min, max) {
    return data.filter(point => 
      point.resistance >= min && point.resistance <= max
    );
  }
}
```

## Performance Optimization

Optimize Smith Chart for large datasets.

### Virtual Scrolling

For very large datasets, render only visible points:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';
import { SmithchartComponent as EjsSmithchart, SeriesDirective as ESeries, SeriesCollectionDirective as ESeriesCollection } from "@syncfusion/ej2-vue-charts";

const allData = ref([]);
const pageSize = ref(1000);
const currentPage = ref(0);
const reactanceField = "reactance";
const resistanceField = "resistance";

const displayData = computed(() => {
  const start = currentPage.value * pageSize.value;
  const end = start + pageSize.value;
  return allData.value.slice(start, end);
});

function nextPage() {
  if ((currentPage.value + 1) * pageSize.value < allData.value.length) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

onMounted(() => {
  // create 5000 points as a demo
  allData.value = Array.from({ length: 5000 }, (_, i) => ({
    resistance: (i % 10) + 0.1,
    reactance: (i % 25) + 0.2
  }));
});
</script>

<template>
  <div>
    <button @click="previousPage" :disabled="currentPage === 0">Previous</button>
    <span>Page {{ currentPage + 1 }}</span>
    <button @click="nextPage">Next</button>
    
    <ejs-smithchart id="smithchart">
      <e-seriesCollection>
        <e-series :dataSource="displayData" :reactance="reactanceField" :resistance="resistanceField"></e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>
```

### Data Decimation

Reduce points while preserving shape using max-min decimation:

```javascript
function decimateData(data, tolerance = 0.1) {
  if (data.length < 3) return data;
  
  const decimated = [data[0]];
  let previousPoint = data[0];
  
  for (let i = 1; i < data.length - 1; i++) {
    const current = data[i];
    const next = data[i + 1];
    
    const distance = Math.sqrt(
      Math.pow(current.resistance - previousPoint.resistance, 2) +
      Math.pow(current.reactance - previousPoint.reactance, 2)
    );
    
    if (distance > tolerance) {
      decimated.push(current);
      previousPoint = current;
    }
  }
  
  decimated.push(data[data.length - 1]);
  return decimated;
}

// Usage
computed: {
  optimizedData() {
    return decimateData(this.rawData, 0.05);
  }
}
```

### Lazy Loading

Load data on demand:

```vue
<script setup>
import { ref } from "vue";
import {
  SmithchartComponent as EjsSmithchart,
  SeriesDirective as ESeries,
  SeriesCollectionDirective as ESeriesCollection
} from "@syncfusion/ej2-vue-charts";

const dataLoaded = ref(false);
const loading = ref(false);
const error = ref("");
const data = ref([]);

const reactanceField = "reactance";
const resistanceField = "resistance";
const seriesName = "Transmission Data";

async function loadData() {
  if (dataLoaded.value || loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    const response = await fetch("/api/transmission-data");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // Expecting: [{ resistance: number, reactance: number }, ...]
    data.value = await response.json();
    dataLoaded.value = true;
  } catch (e) {
    error.value = e?.message || "Failed to load data";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <button v-if="!dataLoaded" @click="loadData" :disabled="loading">
      {{ loading ? "Loading..." : "Load Chart Data" }}
    </button>

    <p v-if="error" style="color: red;">{{ error }}</p>

    <ejs-smithchart v-if="dataLoaded" id="smithchart">
      <e-seriesCollection>
        <e-series
          :dataSource="data"
          :name="seriesName"
          :reactance="reactanceField"
          :resistance="resistanceField"
          :marker="{ visible: true }"
        />
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>
```

## Real-World Examples

### Example 1: RF Cable Matching Network

Visualize impedance transformation along transmission line:

```vue
<template>
  <div class="matching-network">
    <div class="controls">
      <label>
        Source Impedance (Ω):
        <input v-model.number="sourceZ" type="number">
      </label>
      <label>
        Load Impedance (Ω):
        <input v-model.number="loadZ" type="number">
      </label>
      <label>
        Cable Length (wavelengths):
        <input v-model.number="cableLength" type="number" step="0.01">
      </label>
      <button @click="calculateImpedance">Calculate</button>
    </div>
    
    <ejs-smithchart id="smithchart" :title='title'>
      <e-seriesCollection>
        <e-series 
          :dataSource='impedanceData' 
          :name='name'
          :marker='marker'
          :reactance='reactance' 
          :resistance='resistance'>
        </e-series>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
import { SmithchartComponent, SeriesDirective, SeriesCollectionDirective } from "@syncfusion/ej2-vue-charts";
export default {
  name: "App",
  components: {
    "ejs-smithchart": SmithchartComponent,
    "e-seriesCollection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },
  data: function () {
    return {
      sourceZ: 50,
      loadZ: 75,
      cableLength: 0.5,
      impedanceData: [],
      name: 'Impedance Transformation',
      marker: { visible: true },
      reactance: 'reactance',
      resistance: 'resistance',
      title: { text: 'Transmission Line Matching Network' }
    }
  },
  methods: {
    calculateImpedance() {
      const z0 = 50; // Characteristic impedance
      const zl = this.loadZ; // Load impedance
      const beta = 2 * Math.PI * this.cableLength;
      
      this.impedanceData = [];
      
      // Calculate impedance at different distances
      for (let d = 0; d <= this.cableLength; d += 0.05) {
        const theta = 2 * Math.PI * d;
        
        // Input impedance calculation
        const real = z0;
        const imag = Math.tan(theta) * (zl - z0) / (z0 + Math.tan(theta) * zl);
        
        this.impedanceData.push({
          resistance: real / 50,  // Normalize
          reactance: imag / 50
        });
      }
    }
  },
  mounted() {
    this.calculateImpedance();
  }
}
</script>

<style scoped>
.matching-network {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.controls input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.controls button {
  padding: 8px 16px;
  background-color: #4472C4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
```

### Example 2: Multi-Frequency Analysis

Display impedance at different frequencies:

```vue
<template>
  <div class="frequency-analysis">
    <div class="frequency-selector">
      <button
        v-for="freq in frequencies"
        :key="freq"
        :class="{ active: selectedFreq === freq }"
        @click="selectedFreq = freq"
      >
        {{ freq }} GHz
      </button>
    </div>

    <ejs-smithchart
      id="smithchart"
      :title="chartTitle"
      :legendSettings="legendSettings">
      <e-seriesCollection>
        <e-series
          v-for="series in filteredFreqData"
          :key="series.name"
          :dataSource="series.impedance"
          :name="series.name"
          :fill="series.color"
          :marker="marker"
          :reactance="reactance"
          :resistance="resistance"/>
      </e-seriesCollection>
    </ejs-smithchart>
  </div>
</template>

<script>
import {
  SmithchartComponent,
  SeriesDirective,
  SeriesCollectionDirective,
  SmithchartLegend
} from "@syncfusion/ej2-vue-charts";

export default {
  name: "App",

  components: {
    "ejs-smithchart": SmithchartComponent,
    "e-seriesCollection": SeriesCollectionDirective,
    "e-series": SeriesDirective
  },

  data() {
    return {
      frequencies: [1, 2, 5, 10, 20],
      selectedFreq: 10,

      // Chart series list (each series gets impedance points computed in mounted)
      multiFreqData: [
        { name: "1 GHz", impedance: [], color: "#FF0000" },
        { name: "2 GHz", impedance: [], color: "#FFA500" },
        { name: "5 GHz", impedance: [], color: "#00AA00" },
        { name: "10 GHz", impedance: [], color: "#0000FF" },
        { name: "20 GHz", impedance: [], color: "#AA00AA" }
      ],

      reactance: "reactance",
      resistance: "resistance",
      // Legend
      legendSettings: { visible: true, position: "Top" },
      marker: { visible: true }
    };
  },

  computed: {
    chartTitle() {
      return {
        text: `Impedance vs Frequency (${this.selectedFreq} GHz Selected)`
      };
    },
    filteredFreqData() {
      const label = `${this.selectedFreq} GHz`;
      return this.multiFreqData.filter((s) => s.name === label);
    }
  },

  mounted() {
    this.generateFrequencyData();
  },

  methods: {
    generateFrequencyData() {
      this.multiFreqData.forEach((series, idx) => {
        const freq = this.frequencies[idx];
        series.impedance = this.calculateImpedanceAtFreq(freq);
      });
    },

    calculateImpedanceAtFreq(frequency) {
      const impedanceData = [];
      for (let i = 0; i <= 10; i++) {
        const r = i + frequency / 10;
        const x = (10 - i) * (frequency / 5);

        impedanceData.push({
          resistance: r / 50,
          reactance: x / 50
        });
      }
      return impedanceData;
    }
  },

  provide: {
    smithchart: [SmithchartLegend]
  }
};
</script>

<style scoped>
.frequency-analysis {
  padding: 20px;
}

.frequency-selector {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.frequency-selector button {
  padding: 8px 12px;
  background-color: #e0e0e0;
  border: 1px solid #999;
  border-radius: 3px;
  cursor: pointer;
}

.frequency-selector button.active {
  background-color: #4472C4;
  color: white;
}
</style>
```
