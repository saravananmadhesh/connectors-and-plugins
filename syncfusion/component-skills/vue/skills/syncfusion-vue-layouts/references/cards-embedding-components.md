# Embedding Components in Cards (Vue 3)

## Table of Contents
- [ListView in Cards](#listview-in-cards)
- [Grid in Cards](#grid-in-cards)
- [Chart in Cards](#chart-in-cards)
- [Form Components in Cards](#form-components-in-cards)
- [Dynamic Content with Reactive State](#dynamic-content-with-reactive-state)
- [Best Practices](#best-practices)

## ListView in Cards

Cards are commonly used to host a ListView, creating a structured list container with header and optional actions.

### Todo List Card

```vue
<template>
  <div class="e-card" style="max-width: 360px;">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">My Tasks</div>
        <div class="e-card-sub-title">{{ remaining }} of {{ todos.length }} remaining</div>
      </div>
    </div>
    <ListViewComponent
      :dataSource="todos"
      :fields="fields"
      :showCheckBox="true"
      height="280px"
    />
    <div class="e-card-actions">
      <button class="e-card-btn" @click="addTodo" style="flex: 1;">Add Task</button>
      <button class="e-card-btn" @click="clearCompleted">Clear Done</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const todos = ref([
  { id: 1, text: 'Design homepage', isChecked: false },
  { id: 2, text: 'Implement login flow', isChecked: true },
  { id: 3, text: 'Write unit tests', isChecked: false }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };

const remaining = computed(() => todos.value.filter(t => !t.isChecked).length);

const addTodo = () => {
  const text = window.prompt('New task:');
  if (text) {
    todos.value = [...todos.value, { id: Date.now(), text, isChecked: false }];
  }
};

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.isChecked);
};
</script>
```

### Project Tasks Card

```vue
<template>
  <div class="e-card">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Project Tasks</div>
        <div class="e-card-sub-title">{{ selected.length }} selected</div>
      </div>
    </div>
    <ListViewComponent
      :dataSource="tasks"
      :fields="fields"
      :showCheckBox="true"
      height="320px"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const tasks = ref([
  { id: 1, text: 'Wireframes' },
  { id: 2, text: 'Mockups' },
  { id: 3, text: 'Frontend implementation' },
  { id: 4, text: 'Backend API' },
  { id: 5, text: 'QA testing' }
]);

const fields = { id: 'id', text: 'text', isChecked: 'isChecked' };
const selected = computed(() => tasks.value.filter(t => t.isChecked));
</script>
```

## Grid in Cards

Display tabular data inside a card for compact data views.

### Sales Data Card

```vue
<template>
  <div class="e-card">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Q1 Sales</div>
        <div class="e-card-sub-title">Top performing products</div>
      </div>
    </div>
    <GridComponent
      :dataSource="sales"
      :allowPaging="true"
      :pageSettings="{ pageSize: 5 }"
    >
      <e-columns>
        <e-column field="product" headerText="Product" width="120" textAlign="Left"></e-column>
        <e-column field="units" headerText="Units" width="80" textAlign="Right"></e-column>
        <e-column field="revenue" headerText="Revenue" width="100" textAlign="Right" format="C2"></e-column>
      </e-columns>
    </GridComponent>
  </div>
</template>

<script setup>
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';

const sales = [
  { product: 'Widget A', units: 240, revenue: 4800 },
  { product: 'Widget B', units: 180, revenue: 3600 },
  { product: 'Widget C', units: 320, revenue: 6400 },
  { product: 'Widget D', units: 150, revenue: 3000 },
  { product: 'Widget E', units: 280, revenue: 5600 }
];
</script>
```

## Chart in Cards

Visualize trends inside a card for dashboard-style displays.

### Trend Visualization Card

```vue
<template>
  <div class="e-card" style="max-width: 400px;">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Weekly Trends</div>
        <div class="e-card-sub-title">Last 7 days</div>
      </div>
    </div>
    <ChartComponent
      id="trend-chart"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
      :seriesRender="series"
      title="Visitors"
      width="100%"
      height="240px"
    ></ChartComponent>
    <div class="e-card-actions">
      <button class="e-card-btn" @click="range = 'week'" :style="rangeBtnStyle('week')">Week</button>
      <button class="e-card-btn" @click="range = 'month'" :style="rangeBtnStyle('month')">Month</button>
      <button class="e-card-btn" @click="range = 'year'" :style="rangeBtnStyle('year')">Year</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective } from '@syncfusion/ej2-vue-charts';

const range = ref('week');

const chartData = {
  week: [
    { day: 'Mon', value: 120 },
    { day: 'Tue', value: 150 },
    { day: 'Wed', value: 170 },
    { day: 'Thu', value: 140 },
    { day: 'Fri', value: 200 },
    { day: 'Sat', value: 220 },
    { day: 'Sun', value: 190 }
  ],
  month: [
    { day: 'W1', value: 800 },
    { day: 'W2', value: 950 },
    { day: 'W3', value: 1100 },
    { day: 'W4', value: 1050 }
  ],
  year: [
    { day: 'Q1', value: 3200 },
    { day: 'Q2', value: 4100 },
    { day: 'Q3', value: 3800 },
    { day: 'Q4', value: 4500 }
  ]
};

const primaryXAxis = { valueType: 'Category' };
const primaryYAxis = { labelFormat: '{value}' };

const series = computed(() => [{
  dataSource: chartData[range.value],
  xName: 'day',
  yName: 'value',
  type: 'Line',
  marker: { visible: true, width: 10, height: 10 }
}]);

const rangeBtnStyle = (key) => ({
  flex: 1,
  background: range.value === key ? '#007bff' : '#e9ecef',
  color: range.value === key ? 'white' : '#333',
  border: 'none',
  padding: '8px'
});
</script>
```

## Form Components in Cards

Combine inputs, dropdowns, and buttons inside a card to build a self-contained form UI.

### Settings Form Card

```vue
<template>
  <div class="e-card" style="max-width: 400px;">
    <div class="e-card-header-title">Profile Settings</div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
      <div class="form-row">
        <label>Name</label>
        <TextBoxComponent v-model="form.name" placeholder="Your name" />
      </div>
      <div class="form-row">
        <label>Email</label>
        <TextBoxComponent v-model="form.email" placeholder="you@example.com" />
      </div>
      <div class="form-row">
        <label>Country</label>
        <DropDownListComponent
          v-model="form.country"
          :dataSource="countries"
          placeholder="Select country"
        />
      </div>
      <div class="form-row">
        <CheckBoxComponent v-model="form.subscribe" label="Subscribe to newsletter" />
      </div>
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn" @click="reset" style="flex: 1;">Reset</button>
      <button
        class="e-card-btn"
        @click="save"
        :style="{ background: '#007bff', color: 'white', flex: 1 }"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

const form = reactive({
  name: '',
  email: '',
  country: null,
  subscribe: false
});

const initial = JSON.parse(JSON.stringify(form));

const countries = [
  { text: 'United States', value: 'us' },
  { text: 'Canada', value: 'ca' },
  { text: 'United Kingdom', value: 'uk' },
  { text: 'Australia', value: 'au' }
];

const reset = () => Object.assign(form, initial);
const save = () => { console.log('Saved:', form); };
</script>

<style scoped>
.form-row {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}
.form-row label {
  margin-bottom: 4px;
  font-weight: 500;
}
</style>
```

## Dynamic Content with Reactive State

Build a card whose body changes based on user interaction with embedded components.

### Tabbed Card

```vue
<template>
  <div class="e-card" style="max-width: 480px;">
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="e-card-content">
      <div v-if="activeTab === 'overview'">
        <h3>Overview</h3>
        <p>{{ product.description }}</p>
      </div>
      <div v-else-if="activeTab === 'specs'">
        <ul>
          <li v-for="(value, key) in product.specs" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
      <div v-else-if="activeTab === 'reviews'">
        <p v-for="(review, i) in product.reviews" :key="i">"{{ review }}"</p>
      </div>
    </div>
    <div class="e-card-actions">
      <button class="e-card-btn" @click="activeTab = 'overview'">Back to Overview</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  product: { type: Object, required: true }
});

const activeTab = ref('overview');
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Specs' },
  { id: 'reviews', label: 'Reviews' }
];
</script>

<style scoped>
.tab-bar { display: flex; border-bottom: 1px solid #e0e0e0; }
.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.tab-btn.active { border-bottom: 2px solid #007bff; color: #007bff; }
</style>
```

## Best Practices

1. **Set explicit heights on ListView/Grid inside cards**: Prevents layout shifts and provides scrollable content

2. **Match padding to card design**: Use `.e-card-content` padding for inner content area

3. **Avoid deeply nested cards**: One level of embedding is ideal; deeper nesting complicates layout

4. **Use scoped slots for chart customization**: Pass template fragments for tooltips, legends, and data labels

5. **Handle loading and empty states**: Show placeholders when the embedded component has no data

6. **Test with real data**: Verify your card layout works with long text, many rows, and various data shapes

**Next:** Return to the [SKILL.md](../SKILL.md#card) for the complete Card overview and additional component combinations.
