# Integration Examples for Range Navigator

## Table of Contents

- [Overview](#overview)
- [Range Navigator with Chart](#range-navigator-with-chart)
  - [Complete Dashboard Example](#complete-dashboard-example)
  - [Explanation](#explanation)
- [Range Navigator with DataGrid](#range-navigator-with-datagrid)
  - [Grid with Date Range Filter](#grid-with-date-range-filter)
- [Real-Time Data Updates](#real-time-data-updates)
  - [Live Dashboard with Streaming Data](#live-dashboard-with-streaming-data)
- [Common Integration Patterns](#common-integration-patterns)
  - [Pattern 1: Master-Detail with Chart and Grid](#pattern-1-master-detail-with-chart-and-grid)
  - [Pattern 2: Multi-Chart Synchronization](#pattern-2-multi-chart-synchronization)
  - [Pattern 3: Drill-Down Navigation](#pattern-3-drill-down-navigation)
  - [Performance Optimization for Integration](#performance-optimization-for-integration)
  - [Testing Integration](#testing-integration)

## Overview

Range Navigator shines when integrated with other components. The most common patterns are:

1. **Chart synchronization** - Range Navigator as mini view with main Chart
2. **Grid filtering** - Range Navigator to filter DataGrid records
3. **Real-time dashboards** - Range Navigator updating live data streams

## Range Navigator with Chart

### Complete Dashboard Example

Combine Range Navigator with Chart for coordinated data exploration:

```vue
<template>
  <div class="dashboard">
    <h2>Sales Dashboard</h2>

    <!-- Mini view with Range Navigator -->
    <div class="range-section">
      <h4>Select Date Range</h4>

      <ejs-rangenavigator
        :valueType="'DateTime'"
        :value="rangeValue"
        :labelFormat="'MMM dd'"
        :periodSelectorSettings="periodSettings"
        :height="'100px'"
        @changed="onRangeChange"
      >
        <e-rangenavigator-series-collection>
          <e-rangenavigator-series
            :dataSource="miniChartData"
            xName="date"
            yName="value"
            type="Area"
            :fill="'#69D2E7'"
          />
        </e-rangenavigator-series-collection>
      </ejs-rangenavigator>
    </div>

    <!-- Main Chart showing filtered data -->
    <div class="chart-section">
      <h4>Sales Trend</h4>

      <ejs-chart
        :primaryXAxis="xAxis"
        :tooltip="chartTooltip"
      >
        <e-series-collection>
          <e-series
            :dataSource="filteredChartData"
            xName="date"
            yName="value"
            type="Line"
            name="Sales"
          />
        </e-series-collection>
      </ejs-chart>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  ChartComponent as EjsChart,
  SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries,
  AreaSeries,
  LineSeries,
  DateTime,
  PeriodSelector,
  Tooltip,
  Legend
} from '@syncfusion/ej2-vue-charts';

// Inject required Range Navigator modules
provide('rangeNavigator', [DateTime, AreaSeries, PeriodSelector]);

// Inject required Chart modules
provide('chart', [LineSeries, DateTime, Tooltip, Legend]);

// Sample data - 365 days
const generateYearData = () => {
  const data = [];
  const startDate = new Date(2023, 0, 1);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    data.push({
      date,
      value: Math.floor(Math.random() * 1000) + 500
    });
  }

  return data;
};

// Data
const miniChartData = ref(generateYearData());
const allChartData = ref([...miniChartData.value]);

// Initial selected range
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 0, 31)
]);

// Period selector configuration
const periodSettings = ref({
  periods: [
    { text: '1W', interval: 1, intervalType: 'Weeks' },
    { text: '1M', interval: 1, intervalType: 'Months', selected: true },
    { text: '3M', interval: 3, intervalType: 'Months' },
    { text: '6M', interval: 6, intervalType: 'Months' },
    { text: '1Y', interval: 1, intervalType: 'Years' },
    { text: 'All' }
  ]
});

// X-axis configuration for Chart
const xAxis = ref({
  valueType: 'DateTime',
  majorGridLines: { width: 0 }
});

// Chart tooltip configuration
const chartTooltip = ref({
  enable: true,
  shared: true
});

// Filtered chart data
const filteredChartData = computed(() => {
  const [start, end] = rangeValue.value;

  return allChartData.value.filter((item) => {
    return item.date >= start && item.date <= end;
  });
});

// Handle range changes
const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.range-section {
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.chart-section {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

h2, h4 {
  margin: 0 0 10px 0;
  color: #333;
}
</style>
```

### Explanation

1. **Mini View (Range Navigator):** Shows full 365 days of data with Area chart
2. **Period Selector:** Quick buttons (1W, 1M, 3M, etc.)
3. **Main Chart:** Displays only filtered data within selected range
4. **Synchronization:** Computed property `filteredChartData` updates when range changes
5. **Event Handling:** `@change` event updates the `rangeValue` ref

## Range Navigator with DataGrid

### Grid with Date Range Filter

Filter DataGrid records based on Range Navigator selection:

```vue
<template>
  <div class="grid-dashboard">
    <h2>Transaction Records</h2>

    <!-- Range Navigator for date filtering -->
    <div class="filter-section">
      <h4>Filter by Date Range</h4>

      <ejs-rangenavigator
        :valueType="'DateTime'"
        :value="rangeValue"
        :width="'100%'"
        :height="'100px'"
        @changed="onRangeChange"
      >
        <e-rangenavigator-series-collection>
          <e-rangenavigator-series
            :dataSource="transactionData"
            xName="transactionDate"
            yName="amount"
            type="Line"
          />
        </e-rangenavigator-series-collection>
      </ejs-rangenavigator>
    </div>

    <!-- DataGrid showing filtered transactions -->
    <div class="grid-section">
      <p>Showing {{ filteredTransactions.length }} transactions</p>

      <ejs-grid
        ref="grid"
        id="Grid"
        :dataSource="filteredTransactions"
        :allowPaging="true"
        :allowExcelExport="true"
        :allowPdfExport="true"
        :pageSettings="pageSettings"
        :toolbar="toolbarOptions"
        :toolbarClick="toolbarClick"
      >
        <e-columns>
          <e-column field="id" headerText="ID" width="90" textAlign="Right" />
          <e-column
            field="transactionDate"
            headerText="Date"
            type="date"
            format="yMd"
            width="130"
          />
          <e-column field="description" headerText="Description" width="220" />
          <e-column
            field="amount"
            headerText="Amount"
            type="number"
            format="C2"
            textAlign="Right"
            width="130"
          />
          <e-column field="status" headerText="Status" width="130" />
        </e-columns>
      </ejs-grid>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-vue-charts';

import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Page,
  Search,
  Toolbar,
  ExcelExport,
  PdfExport
} from '@syncfusion/ej2-vue-grids';

// Inject required modules
provide('rangeNavigator', [DateTime, LineSeries]);
provide('grid', [Page, Search, Toolbar, ExcelExport, PdfExport]);

// Grid reference
const grid = ref(null);

// Generate sample transactions
const generateTransactions = () => {
  const data = [];
  const startDate = new Date(2023, 0, 1);

  for (let i = 0; i < 500; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * 365));

    data.push({
      id: i + 1,
      transactionDate: date,
      description: `Transaction ${i + 1}`,
      amount: Math.floor(Math.random() * 5000) + 100,
      status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)]
    });
  }

  return data.sort((a, b) => a.transactionDate - b.transactionDate);
};

// Data
const transactionData = ref(generateTransactions());

// Range state
const rangeValue = ref([
  new Date(2023, 0, 1),
  new Date(2023, 11, 31)
]);

// Grid configuration
const pageSettings = { pageSize: 10 };
const toolbarOptions = ['ExcelExport', 'PdfExport', 'Search'];

// Filtered transactions based on range
const filteredTransactions = computed(() => {
  const [start, end] = rangeValue.value;

  return transactionData.value.filter((item) => {
    return item.transactionDate >= start && item.transactionDate <= end;
  });
});

// Handle range changes
const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];
};

// Handle toolbar export actions
const toolbarClick = (args) => {
  if (!grid.value) return;

  if (args.item.id === 'Grid_excelexport') {
    grid.value.ej2Instances.excelExport();
  } else if (args.item.id === 'Grid_pdfexport') {
    grid.value.ej2Instances.pdfExport();
  }
};
</script>

<style scoped>
.grid-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.grid-section {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  padding: 12px;
}

h2,
h4 {
  margin: 0 0 10px 0;
}
</style>
```

## Real-Time Data Updates

### Live Dashboard with Streaming Data

Update Range Navigator with real-time data:

```vue
<template>
  <div class="realtime-dashboard">
    <h2>Real-Time Metrics</h2>

    <div class="stats">
      <div>Total Records: {{ liveData.length }}</div>
      <div>Last Update: {{ lastUpdateTime }}</div>
      <div>Auto Follow: {{ autoFollow ? 'On' : 'Off' }}</div>
    </div>

    <ejs-rangenavigator
      :valueType="'DateTime'"
      :value="rangeValue"
      :width="'100%'"
      :height="'120px'"
      @changed="onRangeChange"
    >
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series
          :dataSource="liveData"
          xName="timestamp"
          yName="value"
          type="Line"
          :width="2"
        />
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide } from 'vue';
import {
  RangeNavigatorComponent as EjsRangenavigator,
  RangenavigatorSeriesCollectionDirective as ERangenavigatorSeriesCollection,
  RangenavigatorSeriesDirective as ERangenavigatorSeries,
  DateTime,
  LineSeries
} from '@syncfusion/ej2-vue-charts';

// Inject required modules
provide('rangeNavigator', [DateTime, LineSeries]);

const liveData = ref([]);
const rangeValue = ref([new Date(), new Date()]);
const lastUpdateTime = ref(new Date().toLocaleTimeString());
const autoFollow = ref(true);

let dataInterval = null;

// Seed some initial data so the navigator is meaningful immediately
const seedInitialData = () => {
  const now = new Date();
  const seeded = [];

  for (let i = 59; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000);
    seeded.push({
      timestamp: time,
      value: Math.floor(Math.random() * 100) + 50
    });
  }

  liveData.value = seeded;
  rangeValue.value = [seeded[0].timestamp, seeded[seeded.length - 1].timestamp];
  lastUpdateTime.value = now.toLocaleTimeString();
};

onMounted(() => {
  seedInitialData();

  // Simulate real-time data stream
  dataInterval = setInterval(() => {
    const now = new Date();

    liveData.value.push({
      timestamp: now,
      value: Math.floor(Math.random() * 100) + 50
    });

    // Keep only last 100 points
    if (liveData.value.length > 100) {
      liveData.value.shift();
    }

    // Auto follow only when user has not manually changed the range
    if (autoFollow.value) {
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      rangeValue.value = [oneMinuteAgo, now];
    }

    lastUpdateTime.value = now.toLocaleTimeString();
  }, 1000);
});

onBeforeUnmount(() => {
  if (dataInterval) {
    clearInterval(dataInterval);
  }

  liveData.value = [];
});

// Handle range changes
const onRangeChange = (args) => {
  rangeValue.value = [args.start, args.end];

  // Stop auto-follow once the user changes the range manually
  autoFollow.value = false;

  console.log('User changed range:', args.start, args.end);
};
</script>

<style scoped>
.realtime-dashboard {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex-wrap: wrap;
}

.stats div {
  font-weight: bold;
  color: #333;
}
</style>
```

## Common Integration Patterns

### Pattern 1: Master-Detail with Chart and Grid

Show chart in Range Navigator, details in Grid:

```javascript
// When user clicks data point in Range Navigator:
// 1. Update range
// 2. Filter Chart to show details
// 3. Update Grid with matching records
```

### Pattern 2: Multi-Chart Synchronization

Synchronize multiple charts with one Range Navigator:

```vue
<template>
  <!-- Single Range Navigator -->
  <ejs-rangenavigator 
    :value="rangeValue"
    @change="onRangeChange"
  >
    <!-- Chart 1 data -->
  </ejs-rangenavigator>
  
  <!-- Multiple Charts all filtered by range -->
  <ejs-chart :dataSource="filteredChart1Data"><!-- --></ejs-chart>
  <ejs-chart :dataSource="filteredChart2Data"><!-- --></ejs-chart>
  <ejs-chart :dataSource="filteredChart3Data"><!-- --></ejs-chart>
</template>

<script setup>
// All computed properties filter based on rangeValue
const filteredChart1Data = computed(() => filterByRange(chart1Data, rangeValue));
const filteredChart2Data = computed(() => filterByRange(chart2Data, rangeValue));
const filteredChart3Data = computed(() => filterByRange(chart3Data, rangeValue));
</script>
```

### Pattern 3: Drill-Down Navigation

Use Range Navigator for hierarchical data exploration:

```javascript
// Year view → Range Navigator
// Select range → Drill to Month view
// Select range → Drill to Day view
// Select range → Drill to Hour view
```

### Performance Optimization for Integration

```javascript
// 1. Debounce range changes to avoid excessive filtering
const debounceChange = debounce((args) => {
  rangeValue.value = [args.start, args.end];
}, 300);

// 2. Use computed properties (lazy evaluation)
const filtered = computed(() => filterData(rangeValue));

// 3. Virtualize grids for large datasets
<ejs-grid :enableVirtualization="true">

// 4. Aggregate chart data for performance
const aggregated = aggregateData(rawData, 'day');
```

### Testing Integration

```javascript
// Test that Range Navigator and Chart stay synchronized
it('should filter chart data when range changes', () => {
  rangeValue.value = [newStart, newEnd];
  expect(filteredChartData.value).toEqual(expectedFiltered);
});

// Test grid updates with range
it('should filter grid records when range changes', () => {
  rangeValue.value = [newStart, newEnd];
  expect(filteredTransactions.value.length).toBe(expectedCount);
});
```
