# Dashboard Layout State Persistence (Vue 3)

## Table of Contents
- [serialize() Method](#serialize-method)
- [localStorage Integration](#localstorage-integration)
- [sessionStorage Integration](#sessionstorage-integration)
- [Database/API Integration](#databaseapi-integration)
- [Auto-Save with Debouncing](#auto-save-with-debouncing)
- [Versioning and Migration](#versioning-and-migration)

## serialize() Method

The `serialize()` method returns an array of `PanelModel` objects representing the current layout state.

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const serializeLayout = () => {
  const layout = dashboardRef.value?.serialize();
  console.log('Current layout:', layout);
  // Returns: [{ id, row, col, sizeX, sizeY, ... }, ...]
  return layout;
};
</script>
```

**Returned PanelModel structure:**

```typescript
interface SerializedPanel {
  id: string;
  row: number;
  col: number;
  sizeX: number;
  sizeY: number;
  // Additional metadata may be included
}
```

## localStorage Integration

### Save Layout to localStorage

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);
const STORAGE_KEY = 'userDashboardLayout';

const saveLayout = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    console.log('Layout saved');
  }
};

const loadLayout = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse saved layout:', e);
    return null;
  }
};

const restoreLayout = () => {
  const layout = loadLayout();
  if (layout && dashboardRef.value) {
    dashboardRef.value.removeAll();
    layout.forEach(panel => dashboardRef.value?.addPanel(panel));
  }
};

const resetLayout = () => {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
};
</script>

<template>
  <div>
    <div class="controls">
      <button @click="saveLayout">Save</button>
      <button @click="restoreLayout">Restore</button>
      <button @click="resetLayout">Reset</button>
    </div>
    <DashboardLayoutComponent ref="dashboardRef" :panels="initialPanels" />
  </div>
</template>
```

### Auto-Save on Drag/Resize

```vue
<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :dragStop="autoSave"
    :resizeStop="autoSave"
  />
</template>

<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);

const autoSave = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('autoDashboard', JSON.stringify(layout));
};
</script>
```

## sessionStorage Integration

sessionStorage persists across page navigation within the same tab but is cleared when the tab closes.

```vue
<script setup>
const saveToSession = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) sessionStorage.setItem('tempDashboard', JSON.stringify(layout));
};

const loadFromSession = () => {
  const saved = sessionStorage.getItem('tempDashboard');
  if (saved && dashboardRef.value) {
    const layout = JSON.parse(saved);
    dashboardRef.value.removeAll();
    layout.forEach(panel => dashboardRef.value?.addPanel(panel));
  }
};
</script>
```

## Database/API Integration

### Save to Backend API

```vue
<script setup>
const userId = 'user-123';

const saveToAPI = async () => {
  const layout = dashboardRef.value?.serialize();
  if (!layout) return;

  try {
    const response = await fetch(`/api/users/${userId}/dashboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ layout, savedAt: new Date().toISOString() })
    });

    if (!response.ok) throw new Error('Save failed');
    console.log('Layout saved to server');
  } catch (error) {
    console.error('Failed to save layout:', error);
    // Fallback to localStorage
    localStorage.setItem('dashboardBackup', JSON.stringify(layout));
  }
};

const loadFromAPI = async () => {
  try {
    const response = await fetch(`/api/users/${userId}/dashboard`);
    if (!response.ok) throw new Error('Load failed');
    const { layout } = await response.json();
    if (layout && dashboardRef.value) {
      dashboardRef.value.removeAll();
      layout.forEach(panel => dashboardRef.value?.addPanel(panel));
    }
  } catch (error) {
    console.error('Failed to load layout, trying localStorage:', error);
    restoreLayout();
  }
};
</script>
```

### Pinia Store Integration

```vue
<script setup>
import { useDashboardStore } from '@/stores/dashboard';

const dashboardStore = useDashboardStore();
const dashboardRef = ref(null);

const saveToStore = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) dashboardStore.saveLayout(layout);
};

const restoreFromStore = () => {
  const layout = dashboardStore.layout;
  if (layout && dashboardRef.value) {
    dashboardRef.value.removeAll();
    layout.forEach(panel => dashboardRef.value?.addPanel(panel));
  }
};
</script>
```

## Auto-Save with Debouncing

Avoid saving on every drag move by debouncing the save operation.

```vue
<script setup>
import { ref, onUnmounted } from 'vue';

const dashboardRef = ref(null);
let saveTimer = null;

const debouncedSave = (delay = 500) => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const layout = dashboardRef.value?.serialize();
    if (layout) localStorage.setItem('autoDashboard', JSON.stringify(layout));
  }, delay);
};

onUnmounted(() => {
  if (saveTimer) clearTimeout(saveTimer);
});
</script>

<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :dragStop="() => debouncedSave()"
    :resizeStop="() => debouncedSave()"
  />
</template>
```

### Custom Debounce Composable

```js
// composables/useDebounce.js
import { ref, onUnmounted } from 'vue';

export function useDebounce(fn, delay = 500) {
  const timer = ref(null);
  const debounced = (...args) => {
    if (timer.value) clearTimeout(timer.value);
    timer.value = setTimeout(() => fn(...args), delay);
  };
  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value);
  });
  return debounced;
}
```

```vue
<script setup>
import { useDebounce } from '@/composables/useDebounce';

const dashboardRef = ref(null);
const save = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('layout', JSON.stringify(layout));
};
const debouncedSave = useDebounce(save, 500);
</script>

<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :dragStop="debouncedSave"
  />
</template>
```

## Versioning and Migration

### Layout Schema Versioning

```vue
<script setup>
const CURRENT_VERSION = 2;
const STORAGE_KEY = 'userDashboard';

const saveWithVersion = () => {
  const layout = dashboardRef.value?.serialize();
  if (!layout) return;

  const payload = {
    version: CURRENT_VERSION,
    savedAt: new Date().toISOString(),
    layout
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

const loadWithVersion = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const payload = JSON.parse(raw);
    return migrate(payload);
  } catch (e) {
    console.error('Failed to load layout:', e);
    return null;
  }
};

const migrate = (payload) => {
  if (!payload.version) {
    // Old format: layout is the payload itself
    return { layout: payload, version: 1 };
  }
  if (payload.version < CURRENT_VERSION) {
    // Run migrations
    return migrateToV2(payload);
  }
  return payload;
};

const migrateToV2 = (payload) => {
  // Example: rename fields
  return {
    version: 2,
    savedAt: payload.savedAt,
    layout: payload.layout.map(p => ({
      ...p,
      // Add new fields with defaults
      zIndex: p.zIndex ?? 1000,
      enabled: p.enabled ?? true
    }))
  };
};
</script>
```

### Cleanup on Schema Change

```vue
<script setup>
const APP_SCHEMA_VERSION = 3;

const checkSchemaVersion = () => {
  const stored = localStorage.getItem('schemaVersion');
  if (stored !== String(APP_SCHEMA_VERSION)) {
    // Clear old layouts
    localStorage.removeItem('userDashboard');
    localStorage.setItem('schemaVersion', String(APP_SCHEMA_VERSION));
  }
};

onMounted(() => checkSchemaVersion());
</script>
```

## Best Practices

1. **Always handle save/load errors**: Wrap in try/catch and provide fallbacks

2. **Debounce auto-save**: Avoid excessive writes during continuous interactions

3. **Include metadata**: Save timestamps, version info, and user IDs with layouts

4. **Validate on load**: Discard corrupt or incompatible layouts

5. **Provide reset functionality**: Always allow users to revert to a default layout

6. **Migrate old formats**: Use versioned schemas to evolve layout storage

7. **Consider quota limits**: localStorage has 5-10MB limit per origin

8. **Use Pinia/Vuex for in-memory state**: Avoid hitting storage on every state change

**Next:** Learn about the [methods reference](dashboard-methods-reference.md) for all available imperative API.
