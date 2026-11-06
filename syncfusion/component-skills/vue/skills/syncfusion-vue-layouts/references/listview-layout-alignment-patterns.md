# ListView Layout & Alignment Patterns (Vue 3)

## Table of Contents
- [Patient Portal Pattern](#patient-portal-pattern)
- [Appointments Dashboard](#appointments-dashboard)
- [Monitoring Dashboard](#monitoring-dashboard)
- [Fixing Common Alignment Issues](#fixing-common-alignment-issues)
- [Responsive Grid Layouts](#responsive-grid-layouts)

## Patient Portal Pattern

A ListView combined with Card components for displaying patient information, appointments, and prescriptions.

```vue
<template>
  <div class="patient-portal">
    <div class="portal-header">
      <h1>Patient Portal</h1>
    </div>

    <div class="portal-content">
      <aside class="sidebar">
        <h3>Patients</h3>
        <ListViewComponent
          id="patient-list"
          :dataSource="patients"
          :fields="patientFields"
          height="600px"
          width="100%"
          :select="onPatientSelect"
        />
      </aside>

      <main class="main-content">
        <div class="card-grid">
          <div class="e-card">
            <div class="e-card-header-title">Appointments</div>
            <ListViewComponent
              id="appointments-list"
              :dataSource="appointments"
              :fields="apptFields"
              height="240px"
            />
          </div>

          <div class="e-card">
            <div class="e-card-header-title">Prescriptions</div>
            <ListViewComponent
              id="prescriptions-list"
              :dataSource="prescriptions"
              :fields="rxFields"
              height="240px"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const patients = ref([
  { id: '1', name: 'John Doe', mrn: 'MRN-001' },
  { id: '2', name: 'Jane Smith', mrn: 'MRN-002' }
]);

const patientFields = { id: 'id', text: 'name' };

const appointments = ref([
  { id: 'a1', text: 'Dr. Williams - Mar 15' },
  { id: 'a2', text: 'Lab work - Mar 18' }
]);

const apptFields = { id: 'id', text: 'text' };

const prescriptions = ref([
  { id: 'r1', text: 'Lisinopril 10mg' },
  { id: 'r2', text: 'Metformin 500mg' }
]);

const rxFields = { id: 'id', text: 'text' };

const onPatientSelect = (args) => {
  console.log('Selected patient:', args.text);
};
</script>

<style scoped>
.patient-portal {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.portal-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.sidebar {
  width: 280px;
  border-right: 1px solid #e0e0e0;
  overflow: auto;
  flex-shrink: 0;
}
.main-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
```

## Appointments Dashboard

A 3x2 grid layout with filter controls and appointment cards.

```vue
<template>
  <div class="appointments-dashboard">
    <div class="filter-bar">
      <select v-model="filter" @change="applyFilter">
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
      </select>
    </div>

    <div class="dashboard-grid">
      <div class="e-card" v-for="appt in filteredAppointments" :key="appt.id">
        <div class="e-card-header">
          <div class="e-card-header-caption">
            <div class="e-card-header-title">{{ appt.patient }}</div>
            <div class="e-card-sub-title">{{ appt.time }}</div>
          </div>
        </div>
        <div class="e-card-content">
          <p><strong>Type:</strong> {{ appt.type }}</p>
          <p><strong>Provider:</strong> {{ appt.provider }}</p>
        </div>
        <div class="e-card-actions">
          <button class="e-card-btn" @click="confirm(appt)">Confirm</button>
          <button class="e-card-btn" @click="reschedule(appt)">Reschedule</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filter = ref('all');

const appointments = ref([
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Consultation', provider: 'Dr. Smith' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', provider: 'Dr. Williams' }
]);

const filteredAppointments = computed(() => appointments.value);
</script>

<style scoped>
.appointments-dashboard { padding: 20px; }
.filter-bar { margin-bottom: 16px; }
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 1024px) {
  .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}
</style>
```

## Monitoring Dashboard

A 3x3 grid displaying KPIs and monitoring metrics.

```vue
<template>
  <div class="monitoring-dashboard">
    <h1>System Monitoring</h1>
    <div class="kpi-grid">
      <div class="e-card kpi-card" v-for="kpi in kpis" :key="kpi.id">
        <div class="e-card-content">
          <div class="kpi-label">{{ kpi.label }}</div>
          <div class="kpi-value" :class="getStatusClass(kpi.value)">
            {{ kpi.value }}{{ kpi.unit }}
          </div>
        </div>
      </div>
    </div>

    <div class="alerts-section">
      <h2>Active Alerts</h2>
      <div class="e-card">
        <ListViewComponent
          id="alerts-list"
          :dataSource="alerts"
          :fields="alertFields"
          height="300px"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const kpis = ref([
  { id: 1, label: 'CPU Usage', value: 45, unit: '%' },
  { id: 2, label: 'Memory', value: 78, unit: '%' },
  { id: 3, label: 'Disk', value: 32, unit: '%' },
  { id: 4, label: 'Network In', value: 124, unit: 'MB/s' },
  { id: 5, label: 'Network Out', value: 89, unit: 'MB/s' },
  { id: 6, label: 'Active Users', value: 1240, unit: '' }
]);

const alerts = ref([
  { id: 'a1', text: 'High CPU on server-01' },
  { id: 'a2', text: 'Disk space low on db-02' }
]);

const alertFields = { id: 'id', text: 'text' };

const getStatusClass = (value) => {
  if (value > 80) return 'status-critical';
  if (value > 60) return 'status-warning';
  return 'status-normal';
};
</script>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}
.kpi-label { font-size: 14px; color: #666; }
.kpi-value { font-size: 28px; font-weight: bold; margin-top: 8px; }
.status-normal { color: #4caf50; }
.status-warning { color: #ff9800; }
.status-critical { color: #f44336; }
</style>
```

## Fixing Common Alignment Issues

### Issue: ListView Doesn't Fill Container

```vue
<template>
  <div class="container">
    <ListViewComponent
      :dataSource="items"
      :fields="fields"
      width="100%"
      height="100%"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 500px; /* Explicit height required */
}
</style>
```

### Issue: Scrolling Doesn't Work in Flex Container

```vue
<template>
  <div class="flex-container">
    <header>Header</header>
    <div class="scrollable-area">
      <ListViewComponent :dataSource="items" :fields="fields" height="100%" />
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.scrollable-area {
  flex: 1;
  overflow: auto;
  min-height: 0; /* Required for flex children */
}
</style>
```

### Issue: Border Around ListView Not Aligned

```vue
<style>
/* Remove default border and add custom one */
.e-list-view {
  border: none;
}
.e-list-item {
  border-bottom: 1px solid #e0e0e0;
}
.e-list-item:last-child {
  border-bottom: none;
}
</style>
```

## Responsive Grid Layouts

### Auto-Fit Grid

```vue
<template>
  <div class="auto-grid">
    <div class="e-card" v-for="item in items" :key="item.id">
      <div class="e-card-content">{{ item.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
```

### Container Queries

```vue
<template>
  <div class="container-query-example">
    <ListViewComponent :dataSource="items" :fields="fields" />
  </div>
</template>

<style scoped>
.container-query-example {
  container-type: inline-size;
  container-name: list;
}
@container list (min-width: 600px) {
  .e-list-item {
    padding: 16px 24px;
  }
}
</style>
```

## Best Practices

1. **Use explicit dimensions**: Set width/height when needed for proper rendering

2. **Apply flex/grid to parents**: For proper alignment in complex layouts

3. **Set min-height: 0 on flex children**: Required for scrollable content

4. **Use semantic HTML structure**: Improve accessibility with proper landmarks

5. **Test on multiple screen sizes**: Verify responsive behavior

6. **Avoid too many nested containers**: Keep DOM structure flat

7. **Use CSS variables for theming**: Maintain consistency across cards and lists

**Next:** Learn about [quick start alignment](listview-quick-start-alignment.md) for fast setup patterns.
