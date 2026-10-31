# Advanced Features and Events

## Table of Contents

- [Event Handling](#event-handling)
  - [Why the original event snippets need adjustment](#why-the-original-event-snippets-need-adjustment)
  - [Supported event strategy](#supported-event-strategy)
  - [Complete Vue 3 event-driven Sankey example](#complete-vue-3-event-driven-sankey-example)
  - [Node mouse events](#node-mouse-events)
  - [Link mouse events](#link-mouse-events)
  - [Click events](#click-events)
  - [Loaded event (chart ready)](#loaded-event-chart-ready)
  - [Legend item click](#legend-item-click)
  - [Resize behavior](#resize-behavior)
- [Print and Export Functionality](#print-and-export-functionality)
  - [Print chart](#print-chart)
  - [Export to PNG](#export-to-png)
  - [Export to multiple formats](#export-to-multiple-formats)
  - [Export with timestamp](#export-with-timestamp)
- [Orientation Control](#orientation-control)
  - [Horizontal orientation (left to right)](#horizontal-orientation-left-to-right)
  - [Vertical orientation (top to bottom)](#vertical-orientation-top-to-bottom)
  - [Switching orientations](#switching-orientations)
- [RTL Support](#rtl-support)
  - [Enable RTL layout](#enable-rtl-layout)
  - [RTL with Arabic or Hebrew labels](#rtl-with-arabic-or-hebrew-labels)
- [Responsive Design](#responsive-design)
  - [Resize handling](#resize-handling)
  - [Container-based responsiveness](#container-based-responsiveness)
- [Performance Optimization](#performance-optimization)
  - [Disable unnecessary features](#disable-unnecessary-features)
  - [Lazy load data](#lazy-load-data)
- [Interactive Highlighting](#interactive-highlighting)
  - [Highlight on node hover](#highlight-on-node-hover)
  - [Filter by selection](#filter-by-selection)

## Event Handling

### Why the original event snippets need adjustment

Your original event examples communicate the intent correctly, but there are a few implementation details that should be corrected for a production-ready Syncfusion Vue 3 Sankey setup:

1. **Do not store raw DOM targets as state**
   - `selectedNode.value = args.target` and `hoveredNode.value = args.target` are brittle.
   - A stable key such as `node id`, `sourceId`, `targetId`, or a normalized event payload is safer.

2. **Avoid direct DOM style mutation when possible**
   - `args.target.style.opacity = '0.8'` works only when the underlying target is exactly the rendered SVG element you expect.
   - In Syncfusion components, the safer pattern is:
     - read event payload,
     - update reactive state,
     - drive visual changes through bound node/link properties or a controlled refresh.

3. **Resize should be handled externally unless the wrapper explicitly exposes those events**
   - `@resizing` and `@resized` should not be treated as guaranteed Sankey events without confirming the exact wrapper API surface.
   - In Vue 3, container-driven resize handling with `ResizeObserver` is the safer pattern.

4. **Access component methods from the EJ2 instance**
   - In Vue wrappers, `ref` usually gives the wrapper component, and methods are commonly accessed through `ref.value.ej2Instances`.

5. **Expand all partial snippets into valid Vue 3 Composition API components**
   - The final code below is a complete Vue 3 SFC using `<script setup>` and correct Syncfusion Vue imports.

### Supported event strategy

For an advanced event-driven Sankey implementation, the most practical pattern is:

- Use `loaded` for post-render work.
- Use `nodeMouseMove` and `nodeMouseLeave` to track hover state.
- Use `linkMouseMove` and `linkMouseLeave` to track relationship hover state.
- Use `nodeClick` and `linkClick` to drive selection or details panels.
- Use `legendItemClick` only if legend is enabled.
- Use `ResizeObserver` for resize-aware rendering instead of depending on unverified wrapper resize events.

### Complete Vue 3 event-driven Sankey example

```vue
<template>
  <div ref="hostEl" class="demo-wrap">
    <div class="toolbar">
      <button type="button" @click="printChart">Print</button>
      <button type="button" @click="exportChart('PNG')">PNG</button>
      <button type="button" @click="exportChart('JPEG')">JPEG</button>
      <button type="button" @click="exportChart('SVG')">SVG</button>
      <button type="button" @click="exportChart('PDF')">PDF</button>
      <button type="button" @click="toggleOrientation">
        Orientation: {{ orientation }}
      </button>
      <button type="button" @click="isRtl = !isRtl">
        RTL: {{ isRtl ? 'On' : 'Off' }}
      </button>
    </div>

    <div class="status-panel">
      <div><strong>Loaded:</strong> {{ isChartReady ? 'Yes' : 'No' }}</div>
      <div><strong>Hovered Node:</strong> {{ hoveredNodeId || 'None' }}</div>
      <div><strong>Hovered Link:</strong> {{ hoveredLinkSummary || 'None' }}</div>
      <div><strong>Selected Node:</strong> {{ selectedNodeId || 'None' }}</div>
      <div><strong>Selected Link:</strong> {{ selectedLinkSummary || 'None' }}</div>
      <div><strong>Last Event:</strong> {{ lastEvent }}</div>
    </div>

    <ejs-sankey
      ref="sankeyRef"
      :width="'100%'"
      :height="'520px'"
      :enableRtl="isRtl"
      :orientation="orientation"
      :tooltip="tooltipSettings"
      :legendSettings="legendSettings"
      @loaded="onLoaded"
      @nodeMouseMove="onNodeMouseMove"
      @nodeMouseLeave="onNodeMouseLeave"
      @linkMouseMove="onLinkMouseMove"
      @linkMouseLeave="onLinkMouseLeave"
      @nodeClick="onNodeClick"
      @linkClick="onLinkClick"
      @legendItemClick="onLegendItemClick"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node
          v-for="node in renderedNodes"
          :key="node.id"
          :id="node.id"
          :offset="node.offset"
          :height="node.height"
          :width="node.width"
          :color="getNodeColor(node.id)"
          :label="{ text: node.label }"
        />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link
          v-for="(link, index) in renderedLinks"
          :key="`${link.sourceId}-${link.targetId}-${index}`"
          :sourceId="link.sourceId"
          :targetId="link.targetId"
          :value="link.value"
          :color="getLinkColor(link)"
          :opacity="getLinkOpacity(link)"
        />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend,
  SankeyTooltip,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyLegend, SankeyTooltip, SankeyExport]);

const sankeyRef = ref(null);
const hostEl = ref(null);
const resizeObserver = ref(null);

const isChartReady = ref(false);
const isRtl = ref(false);
const orientation = ref('Horizontal');

const hoveredNodeId = ref('');
const hoveredLink = ref(null);
const selectedNodeId = ref('');
const selectedLink = ref(null);
const lastEvent = ref('Waiting for interaction...');

const nodes = ref([
  { id: 'A', label: 'Source', width: 20, height: 120, offset: 0.1 },
  { id: 'B', label: 'Process 1', width: 20, height: 90, offset: 0.2 },
  { id: 'C', label: 'Process 2', width: 20, height: 70, offset: 0.45 },
  { id: 'D', label: 'Output', width: 20, height: 110, offset: 0.25 }
]);

const links = ref([
  { sourceId: 'A', targetId: 'B', value: 100 },
  { sourceId: 'A', targetId: 'C', value: 60 },
  { sourceId: 'B', targetId: 'D', value: 80 },
  { sourceId: 'C', targetId: 'D', value: 50 }
]);

const tooltipSettings = ref({
  enable: true
});

const legendSettings = ref({
  visible: true
});

const renderedNodes = computed(() => nodes.value);
const renderedLinks = computed(() => links.value);

const hoveredLinkSummary = computed(() => {
  if (!hoveredLink.value) return '';
  return `${hoveredLink.value.sourceId} → ${hoveredLink.value.targetId} (${hoveredLink.value.value})`;
});

const selectedLinkSummary = computed(() => {
  if (!selectedLink.value) return '';
  return `${selectedLink.value.sourceId} → ${selectedLink.value.targetId} (${selectedLink.value.value})`;
});

function normalizeNodeArgs(args) {
  const data = args?.data ?? {};
  return {
    id: data.id ?? data.nodeId ?? args?.id ?? '',
    text: data.label?.text ?? data.text ?? data.id ?? ''
  };
}

function normalizeLinkArgs(args) {
  const data = args?.data ?? {};
  return {
    sourceId: data.sourceId ?? data.sourceID ?? args?.sourceId ?? args?.source ?? '',
    targetId: data.targetId ?? data.targetID ?? args?.targetId ?? args?.target ?? '',
    value: data.value ?? args?.value ?? 0
  };
}

function onLoaded() {
  isChartReady.value = true;
  lastEvent.value = 'loaded';
}

function onNodeMouseMove(args) {
  const node = normalizeNodeArgs(args);
  hoveredNodeId.value = node.id;
  lastEvent.value = `nodeMouseMove: ${node.id}`;
}

function onNodeMouseLeave() {
  hoveredNodeId.value = '';
  lastEvent.value = 'nodeMouseLeave';
}

function onLinkMouseMove(args) {
  hoveredLink.value = normalizeLinkArgs(args);
  lastEvent.value = `linkMouseMove: ${hoveredLink.value.sourceId} → ${hoveredLink.value.targetId}`;
}

function onLinkMouseLeave() {
  hoveredLink.value = null;
  lastEvent.value = 'linkMouseLeave';
}

function onNodeClick(args) {
  const node = normalizeNodeArgs(args);
  selectedNodeId.value = node.id;
  selectedLink.value = null;
  lastEvent.value = `nodeClick: ${node.id}`;
}

function onLinkClick(args) {
  selectedLink.value = normalizeLinkArgs(args);
  selectedNodeId.value = '';
  lastEvent.value = `linkClick: ${selectedLink.value.sourceId} → ${selectedLink.value.targetId}`;
}

function onLegendItemClick(args) {
  lastEvent.value = `legendItemClick: ${args?.text ?? 'legend item'}`;
}

function printChart() {
  sankeyRef.value?.ej2Instances?.print();
}

function exportChart(format) {
  const today = new Date().toISOString().slice(0, 10);
  sankeyRef.value?.ej2Instances?.export(format, `sankey-${format.toLowerCase()}-${today}`);
}

function toggleOrientation() {
  orientation.value = orientation.value === 'Horizontal' ? 'Vertical' : 'Horizontal';
}

function getNodeColor(nodeId) {
  if (!hoveredNodeId.value && !selectedNodeId.value) return '#4F46E5';

  if (selectedNodeId.value && nodeId === selectedNodeId.value) {
    return '#DC2626';
  }

  if (hoveredNodeId.value && nodeId === hoveredNodeId.value) {
    return '#EA580C';
  }

  if (isNodeConnected(nodeId)) {
    return '#0EA5E9';
  }

  return '#D1D5DB';
}

function getLinkColor(link) {
  if (selectedLink.value) {
    const isSelected =
      selectedLink.value.sourceId === link.sourceId &&
      selectedLink.value.targetId === link.targetId &&
      selectedLink.value.value === link.value;

    return isSelected ? '#DC2626' : '#D1D5DB';
  }

  if (hoveredNodeId.value) {
    return isLinkConnectedToHoveredNode(link) ? '#0EA5E9' : '#D1D5DB';
  }

  if (hoveredLink.value) {
    const isHovered =
      hoveredLink.value.sourceId === link.sourceId &&
      hoveredLink.value.targetId === link.targetId &&
      hoveredLink.value.value === link.value;

    return isHovered ? '#EA580C' : '#D1D5DB';
  }

  return '#6366F1';
}

function getLinkOpacity(link) {
  if (selectedLink.value) {
    const isSelected =
      selectedLink.value.sourceId === link.sourceId &&
      selectedLink.value.targetId === link.targetId &&
      selectedLink.value.value === link.value;

    return isSelected ? 0.95 : 0.2;
  }

  if (hoveredNodeId.value) {
    return isLinkConnectedToHoveredNode(link) ? 0.85 : 0.2;
  }

  if (hoveredLink.value) {
    const isHovered =
      hoveredLink.value.sourceId === link.sourceId &&
      hoveredLink.value.targetId === link.targetId &&
      hoveredLink.value.value === link.value;

    return isHovered ? 0.85 : 0.2;
  }

  return 0.7;
}

function isNodeConnected(nodeId) {
  if (hoveredNodeId.value) {
    return links.value.some(
      (link) =>
        (link.sourceId === hoveredNodeId.value && link.targetId === nodeId) ||
        (link.targetId === hoveredNodeId.value && link.sourceId === nodeId)
    );
  }

  if (selectedNodeId.value) {
    return links.value.some(
      (link) =>
        (link.sourceId === selectedNodeId.value && link.targetId === nodeId) ||
        (link.targetId === selectedNodeId.value && link.sourceId === nodeId)
    );
  }

  return false;
}

function isLinkConnectedToHoveredNode(link) {
  return link.sourceId === hoveredNodeId.value || link.targetId === hoveredNodeId.value;
}

onMounted(() => {
  if (!hostEl.value) return;

  resizeObserver.value = new ResizeObserver(() => {
    sankeyRef.value?.ej2Instances?.refresh();
  });

  resizeObserver.value.observe(hostEl.value);
});

onBeforeUnmount(() => {
  resizeObserver.value?.disconnect();
});
</script>

<style scoped>
.demo-wrap {
  width: 100%;
  display: grid;
  gap: 16px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #F9FAFB;
}

button {
  padding: 8px 14px;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  background: #FFFFFF;
  cursor: pointer;
}

button:hover {
  background: #F3F4F6;
}
</style>
```

### Node mouse events

Your original pattern:

```js
hoveredNode.value = args.target;
args.target.style.opacity = '0.8';
```

should be replaced with this logic:

- Extract a **stable node identity** from the event payload.
- Save only the node ID into reactive state.
- Recalculate related node/link appearance from that state.

Recommended pattern:

```ts
function onNodeMouseMove(args) {
  const node = normalizeNodeArgs(args);
  hoveredNodeId.value = node.id;
}

function onNodeMouseLeave() {
  hoveredNodeId.value = '';
}
```

This is more reliable than mutating the rendered SVG element directly.

### Link mouse events

Your original snippet assumes:

```js
args.source
args.target
args.value
```

That is fine as a conceptual example, but for safer production code you should normalize from the event payload first because wrappers may expose the values under `args.data`.

Recommended pattern:

```ts
function onLinkMouseMove(args) {
  hoveredLink.value = normalizeLinkArgs(args);
}

function onLinkMouseLeave() {
  hoveredLink.value = null;
}
```

### Click events

Your original click handlers correctly represent the intended behavior, but they should store normalized business values instead of raw event targets.

Recommended pattern:

```ts
function onNodeClick(args) {
  const node = normalizeNodeArgs(args);
  selectedNodeId.value = node.id;
}

function onLinkClick(args) {
  selectedLink.value = normalizeLinkArgs(args);
}
```

This makes selection stable even after refreshes, re-renders, or theme changes.

### Loaded event (chart ready)

Your `loaded` usage is correct in concept.

Use it for:

- post-render inspection,
- programmatic focus,
- export readiness,
- style synchronization,
- external layout work after first render.

Recommended pattern:

```ts
function onLoaded() {
  isChartReady.value = true;
}
```

### Legend item click

If the legend is enabled, `legendItemClick` is the correct place to:

- update external filters,
- sync with side panels,
- track analytics,
- cancel or customize interaction logic if needed by your application flow.

Minimal pattern:

```ts
function onLegendItemClick(args) {
  lastEvent.value = `legendItemClick: ${args?.text ?? 'legend item'}`;
}
```

### Resize behavior

Instead of assuming Sankey-specific resize events are always exposed by the Vue wrapper, use `ResizeObserver` and refresh the EJ2 instance.

Recommended pattern:

```ts
onMounted(() => {
  resizeObserver.value = new ResizeObserver(() => {
    sankeyRef.value?.ej2Instances?.refresh();
  });

  if (hostEl.value) {
    resizeObserver.value.observe(hostEl.value);
  }
});
```

This is the most dependable Vue 3 approach for responsive Sankey rendering.

## Print and Export Functionality

### Print chart

Your original export module injection is on the right track, but the safer instance access is through `ej2Instances`.

```vue
<template>
  <div>
    <button type="button" @click="printChart">Print Chart</button>

    <ejs-sankey ref="sankeyRef" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Source' }" />
        <e-sankey-node id="B" :label="{ text: 'Target' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="120" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyExport]);

const sankeyRef = ref(null);

function printChart() {
  sankeyRef.value?.ej2Instances?.print();
}
</script>
```

### Export to PNG

```vue
<template>
  <div>
    <button type="button" @click="exportPNG">Export as PNG</button>

    <ejs-sankey ref="sankeyRef" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Source' }" />
        <e-sankey-node id="B" :label="{ text: 'Target' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="120" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyExport]);

const sankeyRef = ref(null);

function exportPNG() {
  sankeyRef.value?.ej2Instances?.export('PNG', 'sankey-chart');
}
</script>
```

### Export to multiple formats

```vue
<template>
  <div class="export-controls">
    <button type="button" @click="exportChart('PNG')">PNG</button>
    <button type="button" @click="exportChart('JPEG')">JPEG</button>
    <button type="button" @click="exportChart('SVG')">SVG</button>
    <button type="button" @click="exportChart('PDF')">PDF</button>

    <ejs-sankey ref="sankeyRef" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Energy In' }" />
        <e-sankey-node id="B" :label="{ text: 'Conversion' }" />
        <e-sankey-node id="C" :label="{ text: 'Energy Out' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="160" />
        <e-sankey-link sourceId="B" targetId="C" :value="140" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyExport]);

const sankeyRef = ref(null);

function exportChart(format) {
  const filename = `energy-flow-${new Date().toISOString().slice(0, 10)}`;
  sankeyRef.value?.ej2Instances?.export(format, filename);
}
</script>

<style scoped>
.export-controls {
  display: grid;
  gap: 12px;
}

.export-controls > div,
.export-controls > button {
  width: fit-content;
}

button {
  padding: 8px 16px;
  border: 1px solid #2563EB;
  background: #FFFFFF;
  color: #2563EB;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background: #2563EB;
  color: #FFFFFF;
}
</style>
```

### Export with timestamp

```vue
<template>
  <div>
    <button type="button" @click="exportWithTimestamp">Export Chart</button>

    <ejs-sankey ref="sankeyRef" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="75" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink,
  SankeyExport
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyExport]);

const sankeyRef = ref(null);

function exportWithTimestamp() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `sankey-${timestamp}`;
  sankeyRef.value?.ej2Instances?.export('PNG', filename);
}
</script>
```

## Orientation Control

### Horizontal orientation (left to right)

Your idea is correct. Bind the orientation directly.

```vue
<template>
  <ejs-sankey :orientation="orientation" height="500px">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Start' }" />
      <e-sankey-node id="B" :label="{ text: 'End' }" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const orientation = ref('Horizontal');
</script>
```

### Vertical orientation (top to bottom)

```vue
<template>
  <ejs-sankey :orientation="orientation" height="500px">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Start' }" />
      <e-sankey-node id="B" :label="{ text: 'End' }" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const orientation = ref('Vertical');
</script>
```

### Switching orientations

```vue
<template>
  <div>
    <div class="controls">
      <button
        type="button"
        @click="setOrientation('Horizontal')"
        :class="{ active: currentOrientation === 'Horizontal' }"
      >
        Horizontal
      </button>

      <button
        type="button"
        @click="setOrientation('Vertical')"
        :class="{ active: currentOrientation === 'Vertical' }"
      >
        Vertical
      </button>
    </div>

    <ejs-sankey :orientation="currentOrientation" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" />
        <e-sankey-node id="B" :label="{ text: 'Process' }" />
        <e-sankey-node id="C" :label="{ text: 'Output' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="110" />
        <e-sankey-link sourceId="B" targetId="C" :value="95" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const currentOrientation = ref('Horizontal');

function setOrientation(value) {
  currentOrientation.value = value;
}
</script>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

button {
  padding: 8px 16px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
}
</style>
```

## RTL Support

### Enable RTL layout

Your idea is correct. Pairing `dir` on the wrapper and `enableRtl` on the Sankey is a clean approach.

```vue
<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <ejs-sankey :enableRtl="isRtl" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Source' }" />
        <e-sankey-node id="B" :label="{ text: 'Target' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const isRtl = ref(false);
</script>
```

### RTL with Arabic or Hebrew labels

```vue
<template>
  <div :dir="language === 'ar' || language === 'he' ? 'rtl' : 'ltr'">
    <ejs-sankey :enableRtl="language === 'ar' || language === 'he'" height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: getLabel('source') }" />
        <e-sankey-node id="B" :label="{ text: getLabel('target') }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const language = ref('en');

const labels = {
  en: { source: 'Source', target: 'Target' },
  ar: { source: 'المصدر', target: 'الهدف' },
  he: { source: 'מקור', target: 'יעד' }
};

function getLabel(key) {
  return labels[language.value]?.[key] ?? '';
}
</script>
```

## Responsive Design

### Resize handling

Instead of relying on uncertain wrapper resize events, use a responsive container and `ResizeObserver`.

```vue
<template>
  <div ref="containerRef" class="responsive-container">
    <ejs-sankey ref="sankeyRef" :width="'100%'" :height="chartHeight">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const sankeyRef = ref(null);
const containerRef = ref(null);
const windowWidth = ref(window.innerWidth);
let resizeObserver = null;

const chartHeight = computed(() => (windowWidth.value < 768 ? '400px' : '600px'));

function onWindowResize() {
  windowWidth.value = window.innerWidth;
  sankeyRef.value?.ej2Instances?.refresh();
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize);

  resizeObserver = new ResizeObserver(() => {
    sankeyRef.value?.ej2Instances?.refresh();
  });

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  resizeObserver?.disconnect();
});
</script>

<style scoped>
.responsive-container {
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;
}
</style>
```

### Container-based responsiveness

Your original intent is good. The safer version includes cleanup.

```vue
<template>
  <div ref="container" class="sankey-container">
    <ejs-sankey
      ref="sankeyRef"
      :width="`${containerWidth}px`"
      :height="`${containerHeight}px`"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Source' }" />
        <e-sankey-node id="B" :label="{ text: 'Target' }" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const container = ref(null);
const sankeyRef = ref(null);
const containerWidth = ref(0);
const containerHeight = ref(500);
let observer = null;

function measure() {
  if (!container.value) return;
  containerWidth.value = container.value.offsetWidth;
  containerHeight.value = container.value.offsetHeight || 500;
  sankeyRef.value?.ej2Instances?.refresh();
}

onMounted(() => {
  measure();

  observer = new ResizeObserver(() => {
    measure();
  });

  if (container.value) {
    observer.observe(container.value);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.sankey-container {
  width: 100%;
  height: 500px;
  display: block;
}
</style>
```

## Performance Optimization

### Disable unnecessary features

Your performance idea is correct. For large datasets, reduce interactivity and label overhead.

```vue
<template>
  <ejs-sankey
    :tooltip="tooltipSettings"
    height="500px"
  >
    <e-sankey-nodes-collection>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: '' }"
      />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link
        v-for="(link, index) in links"
        :key="index"
        :sourceId="link.sourceId"
        :targetId="link.targetId"
        :value="link.value"
      />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([]);
const links = ref([]);

const tooltipSettings = ref({
  enable: false
});
</script>
```

**Correction note:** instead of assuming a top-level `labelSettings.visible = false`, a more predictable large-data simplification is to reduce label text usage and disable non-essential features like tooltips, legend, and aggressive hover styling.

### Lazy load data

Your lazy-loading concept is valid. The main improvement is to ensure links only render when both endpoint nodes are visible.

```vue
<template>
  <div class="lazy-demo">
    <button type="button" @click="loadMore">Load More</button>

    <ejs-sankey height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node
          v-for="node in visibleNodes"
          :key="node.id"
          :id="node.id"
          :label="{ text: node.label }"
        />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link
          v-for="(link, idx) in visibleLinks"
          :key="idx"
          :sourceId="link.sourceId"
          :targetId="link.targetId"
          :value="link.value"
        />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const allNodes = ref([]);
const allLinks = ref([]);
const loadedCount = ref(100);

const visibleNodes = computed(() => allNodes.value.slice(0, loadedCount.value));

const visibleNodeIds = computed(() => new Set(visibleNodes.value.map((n) => n.id)));

const visibleLinks = computed(() =>
  allLinks.value.filter(
    (link) =>
      visibleNodeIds.value.has(link.sourceId) &&
      visibleNodeIds.value.has(link.targetId)
  )
);

function loadMore() {
  loadedCount.value += 100;
}

async function fetchData() {
  const response = await fetch('/api/sankey-data');
  const data = await response.json();
  allNodes.value = data.nodes ?? [];
  allLinks.value = data.links ?? [];
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.lazy-demo {
  display: grid;
  gap: 12px;
}
</style>
```

## Interactive Highlighting

### Highlight on node hover

```vue
<template>
  <ejs-sankey
    @nodeMouseMove="onNodeEnter"
    @nodeMouseLeave="onNodeExit"
  >
    <e-sankey-nodes-collection>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.label }"
        :color="getNodeColor(node.id)"
      />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link
        v-for="(link, idx) in links"
        :key="idx"
        :sourceId="link.sourceId"
        :targetId="link.targetId"
        :value="link.value"
        :opacity="isLinkRelated(link) ? 0.85 : 0.25"
      />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([
  { id: 'A', label: 'Node A' },
  { id: 'B', label: 'Node B' },
  { id: 'C', label: 'Node C' }
]);

const links = ref([
  { sourceId: 'A', targetId: 'B', value: 100 },
  { sourceId: 'B', targetId: 'C', value: 90 }
]);

const hoveredNode = ref('');

function onNodeEnter(args) {
  hoveredNode.value = args?.data?.id ?? '';
}

function onNodeExit() {
  hoveredNode.value = '';
}

function getNodeColor(nodeId) {
  if (!hoveredNode.value) return '#2563EB';
  if (nodeId === hoveredNode.value) return '#DC2626';
  if (isNodeRelated(nodeId)) return '#F59E0B';
  return '#D1D5DB';
}

function isNodeRelated(nodeId) {
  return links.value.some(
    (link) =>
      (link.sourceId === hoveredNode.value && link.targetId === nodeId) ||
      (link.targetId === hoveredNode.value && link.sourceId === nodeId)
  );
}

function isLinkRelated(link) {
  if (!hoveredNode.value) return true;
  return link.sourceId === hoveredNode.value || link.targetId === hoveredNode.value;
}
</script>
```

### Filter by selection

Your original filtering logic works, but it should support all selected nodes consistently and derive nodes from the filtered links.

```vue
<template>
  <div>
    <div class="filter-buttons">
      <button
        v-for="node in nodes"
        :key="node.id"
        type="button"
        @click="toggleFilter(node.id)"
        :class="{ active: selectedNodes.includes(node.id) }"
      >
        {{ node.label }}
      </button>
      <button type="button" @click="resetFilter">Reset</button>
    </div>

    <ejs-sankey height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node
          v-for="node in filteredNodes"
          :key="node.id"
          :id="node.id"
          :label="{ text: node.label }"
        />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link
          v-for="(link, idx) in filteredLinks"
          :key="idx"
          :sourceId="link.sourceId"
          :targetId="link.targetId"
          :value="link.value"
        />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([
  { id: 'A', label: 'Source 1' },
  { id: 'B', label: 'Source 2' },
  { id: 'C', label: 'Process' },
  { id: 'D', label: 'Output' }
]);

const links = ref([
  { sourceId: 'A', targetId: 'C', value: 100 },
  { sourceId: 'B', targetId: 'C', value: 80 },
  { sourceId: 'C', targetId: 'D', value: 150 }
]);

const selectedNodes = ref([]);

const filteredLinks = computed(() => {
  if (selectedNodes.value.length === 0) return links.value;

  return links.value.filter(
    (link) =>
      selectedNodes.value.includes(link.sourceId) ||
      selectedNodes.value.includes(link.targetId)
  );
});

const filteredNodeIds = computed(() => {
  if (selectedNodes.value.length === 0) {
    return new Set(nodes.value.map((n) => n.id));
  }

  const ids = new Set(selectedNodes.value);

  filteredLinks.value.forEach((link) => {
    ids.add(link.sourceId);
    ids.add(link.targetId);
  });

  return ids;
});

const filteredNodes = computed(() =>
  nodes.value.filter((node) => filteredNodeIds.value.has(node.id))
);

function toggleFilter(nodeId) {
  if (selectedNodes.value.includes(nodeId)) {
    selectedNodes.value = selectedNodes.value.filter((id) => id !== nodeId);
  } else {
    selectedNodes.value = [...selectedNodes.value, nodeId];
  }
}

function resetFilter() {
  selectedNodes.value = [];
}
</script>

<style scoped>
.filter-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

button {
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background: #2563EB;
  color: #FFFFFF;
  border-color: #2563EB;
}
</style>
```