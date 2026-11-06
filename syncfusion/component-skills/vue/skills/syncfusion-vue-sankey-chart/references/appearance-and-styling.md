# Appearance and Styling

## Table of Contents
- [Background &amp; Borders](#background--borders)
  - [Chart Container Background](#chart-container-background)
  - [Border Styling](#border-styling)
- [Dimensions &amp; Responsive Sizing](#dimensions--responsive-sizing)
  - [Fixed Dimensions](#fixed-dimensions)
  - [Percentage-Based (Responsive)](#percentage-based-responsive)
  - [Dynamic Sizing Based on Screen Size](#dynamic-sizing-based-on-screen-size)
  - [Mobile-Friendly Layout](#mobile-friendly-layout)
- [Theme Selection](#theme-selection)
  - [Built-in Themes](#built-in-themes)
  - [Using Themes in Component](#using-themes-in-component)
- [Link Styling](#link-styling)
  - [Global Link Configuration](#global-link-configuration)
  - [Link Styling Options](#link-styling-options)
  - [Individual Link Colors](#individual-link-colors)
  - [Gradient Link Colors (CSS Only)](#gradient-link-colors-css-only)
- [Label Positioning &amp; Visibility](#label-positioning--visibility)
  - [Label Configuration](#label-configuration)
  - [Node with Custom Labels](#node-with-custom-labels)
  - [Hide Labels for Cleaner Look](#hide-labels-for-cleaner-look)
  - [Smart Label Mode](#smart-label-mode)
- [Individual Node &amp; Link Styling](#individual-node--link-styling)
  - [Styled Nodes with Different Colors](#styled-nodes-with-different-colors)
  - [Conditional Styling Based on Data](#conditional-styling-based-on-data)
- [Margin &amp; Padding Configuration](#margin--padding-configuration)
  - [Chart Margins](#chart-margins)
  - [Node Label Padding](#node-label-padding)
  - [Space Between Nodes](#space-between-nodes)
- [Responsive Design Examples](#responsive-design-examples)
  - [Example 1: Desktop-Optimized Layout](#example-1-desktop-optimized-layout)
  - [Example 2: Mobile-Optimized Layout](#example-2-mobile-optimized-layout)
  - [Example 3: Dark Mode Theme](#example-3-dark-mode-theme)
- [Final Appearance and Customization Summary](#final-appearance-and-customization-summary)
- [Best Production Pattern for Appearance](#best-production-pattern-for-appearance)

## Background & Borders

### Chart Container Background

The original example uses:

```js
const background = ref({
  color: '#F5F5F5'
});
```

For a cleaner Vue 3 Syncfusion setup, bind the background as a string value.

```vue
<template>
  <div class="sankey-wrapper">
    <ejs-sankey
      width="100%"
      height="500px"
      :background="background"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" :color="'#3B82F6'" />
        <e-sankey-node id="B" :label="{ text: 'Process' }" :color="'#F59E0B'" />
        <e-sankey-node id="C" :label="{ text: 'Output' }" :color="'#10B981'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="120" :color="'#93C5FD'" />
        <e-sankey-link sourceId="B" targetId="C" :value="100" :color="'#86EFAC'" />
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

const background = ref('#F5F5F5');
</script>

<style scoped>
.sankey-wrapper {
  border: 1px solid #DDD;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
</style>
```

### Border Styling

This is a good customization pattern because the styling is kept in the wrapper instead of trying to overload the Sankey configuration with layout decoration.

```vue
<template>
  <div class="bordered-sankey">
    <ejs-sankey height="400px" background="transparent">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Start' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'End' }" :color="'#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" :color="'#60A5FA'" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>

<style scoped>
.bordered-sankey {
  border: 2px solid #3498DB;
  border-radius: 6px;
  background: linear-gradient(135deg, #F5F7FA 0%, #C3CFE2 100%);
  padding: 12px;
}
</style>
```

## Dimensions & Responsive Sizing

### Fixed Dimensions

This is valid when you need a precise design surface.

```vue
<template>
  <ejs-sankey width="800px" height="500px">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Source' }" :color="'#3B82F6'" />
      <e-sankey-node id="B" :label="{ text: 'Target' }" :color="'#22C55E'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="150" :color="'#60A5FA'" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Percentage-Based (Responsive)

This pattern is correct as long as the parent container has a real height.

```vue
<template>
  <div class="chart-container">
    <ejs-sankey width="100%" height="100%">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" :color="'#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="90" :color="'#93C5FD'" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
}
</style>
```

### Dynamic Sizing Based on Screen Size

Your original idea is correct, but it needs cleanup for the resize listener.

```vue
<template>
  <ejs-sankey :width="chartWidth" :height="chartHeight">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Source' }" :color="'#2563EB'" />
      <e-sankey-node id="B" :label="{ text: 'Stage 1' }" :color="'#F59E0B'" />
      <e-sankey-node id="C" :label="{ text: 'Stage 2' }" :color="'#10B981'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="100" :color="'#60A5FA'" />
      <e-sankey-link sourceId="B" targetId="C" :value="85" :color="'#34D399'" />
    </e-sankey-links-collection>
  </ejs-sankey>
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

const screenWidth = ref(window.innerWidth);

const chartWidth = computed(() => (screenWidth.value < 768 ? '100%' : '90%'));
const chartHeight = computed(() => (screenWidth.value < 768 ? '400px' : '600px'));

function handleResize() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
```

### Mobile-Friendly Layout

This pattern is fine, but the height should also react if the screen size changes after mount.

```vue
<template>
  <div class="sankey-responsive">
    <ejs-sankey :width="'100%'" :height="chartHeight">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Mobile Input' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Mobile Output' }" :color="'#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="75" :color="'#93C5FD'" />
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

const width = ref(window.innerWidth);

const chartHeight = computed(() => (width.value < 640 ? '400px' : '500px'));

function handleResize() {
  width.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.sankey-responsive {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

@media (max-width: 640px) {
  .sankey-responsive {
    padding: 8px;
  }
}
</style>
```

## Theme Selection

### Built-in Themes

These theme names are appropriate for Syncfusion styling selection, but you should treat them as stylesheet imports, not as arbitrary runtime URLs from `/node_modules`.

```js
const themes = [
  'material',
  'bootstrap',
  'fabric',
  'tailwind',
  'fluent',
  'material-dark',
  'bootstrap-dark',
  'fabric-dark',
  'tailwind-dark',
  'fluent-dark'
];
```

### Using Themes in Component

A safer runtime theme-switching pattern is to update one dedicated theme link instead of appending duplicate stylesheets.

```vue
<template>
  <div>
    <div class="theme-buttons">
      <button type="button" @click="setTheme('material')">Material</button>
      <button type="button" @click="setTheme('bootstrap')">Bootstrap</button>
      <button type="button" @click="setTheme('fluent')">Fluent</button>
    </div>

    <ejs-sankey height="500px">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" :color="'#10B981'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="100" :color="'#93C5FD'" />
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

const currentTheme = ref('material');

function setTheme(theme) {
  currentTheme.value = theme;

  let themeLink = document.getElementById('syncfusion-theme');
  if (!themeLink) {
    themeLink = document.createElement('link');
    themeLink.id = 'syncfusion-theme';
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);
  }

  themeLink.href = `/themes/${theme}.css`;
}
</script>

<style scoped>
.theme-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

button {
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Link Styling

### Global Link Configuration

Use a reactive object only if your project version supports global link style configuration for Sankey. For appearance-critical work, per-link styling remains the safest path.

```vue
<template>
  <ejs-sankey :linkStyle="linkStyle">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Source' }" :color="'#2563EB'" />
      <e-sankey-node id="B" :label="{ text: 'Target' }" :color="'#16A34A'" />
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

const linkStyle = ref({
  opacity: 0.6,
  curvature: 0.45,
  colorType: 'Source',
  color: '#FF5733'
});
</script>
```

### Link Styling Options

The original list is conceptually useful. The safest interpretation for appearance customization is:

```js
const linkStyle = {
  colorType: 'Source',
  color: '#3498DB',
  opacity: 0.6,
  curvature: 0.5,
  strokeDasharray: '5,5'
};
```

Use this only when your project version exposes these link-style configuration options at the Sankey level.

### Individual Link Colors

This is the strongest customization method when appearance matters most.

```vue
<template>
  <ejs-sankey>
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'High Priority' }" :color="'#1D4ED8'" />
      <e-sankey-node id="B" :label="{ text: 'Normal' }" :color="'#2563EB'" />
      <e-sankey-node id="C" :label="{ text: 'Success' }" :color="'#16A34A'" />
      <e-sankey-node id="D" :label="{ text: 'End' }" :color="'#0F766E'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link
        sourceId="A"
        targetId="B"
        :value="100"
        :color="'#E74C3C'"
        :opacity="0.8"
      />

      <e-sankey-link
        sourceId="B"
        targetId="C"
        :value="80"
        :color="'#3498DB'"
        :opacity="0.6"
      />

      <e-sankey-link
        sourceId="C"
        targetId="D"
        :value="70"
        :color="'#2ECC71'"
        :opacity="0.5"
      />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Gradient Link Colors (CSS Only)

The original example mixes chart background and link appearance in one rule set. For clearer customization, keep them separate.

```vue
<template>
  <div class="sankey-with-gradients">
    <ejs-sankey id="sankey" height="400px" background="transparent">
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Start' }" :color="'#6366F1'" />
        <e-sankey-node id="B" :label="{ text: 'Finish' }" :color="'#8B5CF6'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="120" :color="'#A78BFA'" :opacity="0.7" />
      </e-sankey-links-collection>
    </ejs-sankey>
  </div>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>

<style scoped>
.sankey-with-gradients {
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
  padding: 12px;
  border-radius: 8px;
}

::v-deep .e-sankey-link {
  filter: opacity(0.7);
}
</style>
```

## Label Positioning & Visibility

### Label Configuration

If your version exposes chart-level label configuration, this pattern is acceptable.

```vue
<template>
  <ejs-sankey :labelSettings="labelSettings">
    <e-sankey-nodes-collection>
      <e-sankey-node id="Node1" :label="{ text: 'Node 1' }" :color="'#2563EB'" />
      <e-sankey-node id="Node2" :label="{ text: 'Node 2' }" :color="'#16A34A'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="Node1" targetId="Node2" :value="100" />
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

const labelSettings = ref({
  visible: true,
  position: 'Top',
  smartLabelMode: 'Trim',
  font: {
    size: '12px',
    color: '#000000',
    fontWeight: 'Normal'
  },
  padding: 8
});
</script>
```

### Node with Custom Labels

This is the best appearance customization strategy because it is explicit and easy to reason about.

```vue
<template>
  <ejs-sankey>
    <e-sankey-nodes-collection>
      <e-sankey-node
        id="Node1"
        :color="'#1D4ED8'"
        :label="{
          text: 'Custom Label',
          visible: true,
          position: 'Top',
          font: { size: '14px', color: '#FFFFFF', fontWeight: '600' },
          padding: 8
        }"
      />
    </e-sankey-nodes-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Hide Labels for Cleaner Look

If the chart-level setting is supported in your project, this is a clean way to reduce clutter.

```vue
<template>
  <ejs-sankey :labelSettings="{ visible: false }">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :color="'#2563EB'" />
      <e-sankey-node id="B" :color="'#16A34A'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Smart Label Mode

Your original intent is good. Use one value at a time.

```vue
<template>
  <ejs-sankey :labelSettings="labelSettings">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Very Long Label for Source Node' }" :color="'#2563EB'" />
      <e-sankey-node id="B" :label="{ text: 'Very Long Label for Target Node' }" :color="'#16A34A'" />
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

const labelSettings = ref({
  visible: true,
  smartLabelMode: 'Trim'
});
</script>
```

## Individual Node & Link Styling

### Styled Nodes with Different Colors

Here is the corrected version using explicit `color` binding.

```vue
<template>
  <ejs-sankey height="400px">
    <e-sankey-nodes-collection>
      <e-sankey-node
        id="Input A"
        :label="{ text: 'Input A' }"
        :color="'#3498DB'"
      />
      <e-sankey-node
        id="Input B"
        :label="{ text: 'Input B' }"
        :color="'#3498DB'"
      />

      <e-sankey-node
        id="Process"
        :label="{ text: 'Processing' }"
        :color="'#F39C12'"
      />

      <e-sankey-node
        id="Output"
        :label="{ text: 'Output' }"
        :color="'#2ECC71'"
      />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="Input A" targetId="Process" :value="100" :color="'#60A5FA'" />
      <e-sankey-link sourceId="Input B" targetId="Process" :value="80" :color="'#60A5FA'" />
      <e-sankey-link sourceId="Process" targetId="Output" :value="150" :color="'#86EFAC'" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Conditional Styling Based on Data

This is the recommended customization pattern for appearance logic because the visual output is derived from your data model.

```vue
<template>
  <ejs-sankey>
    <e-sankey-nodes-collection>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.label }"
        :color="getNodeColor(node.value)"
      />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link
        v-for="(link, idx) in links"
        :key="idx"
        :sourceId="link.sourceId"
        :targetId="link.targetId"
        :value="link.value"
        :opacity="link.value > 500 ? 0.8 : 0.4"
        :color="link.value > 500 ? '#2563EB' : '#94A3B8'"
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
  { id: 'A', label: 'Node A', value: 800 },
  { id: 'B', label: 'Node B', value: 500 },
  { id: 'C', label: 'Node C', value: 300 }
]);

const links = ref([
  { sourceId: 'A', targetId: 'B', value: 620 },
  { sourceId: 'B', targetId: 'C', value: 420 }
]);

function getNodeColor(value) {
  if (value >= 700) return '#27AE60';
  if (value >= 500) return '#F39C12';
  return '#E74C3C';
}
</script>
```

## Margin & Padding Configuration

### Chart Margins

```vue
<template>
  <ejs-sankey :margin="margin">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'Source' }" :color="'#2563EB'" />
      <e-sankey-node id="B" :label="{ text: 'Target' }" :color="'#16A34A'" />
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

const margin = ref({
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
});
</script>
```

### Node Label Padding

This is a good appearance customization pattern.

```vue
<template>
  <ejs-sankey>
    <e-sankey-nodes-collection>
      <e-sankey-node
        id="Node1"
        :color="'#2563EB'"
        :label="{
          text: 'Node 1',
          padding: 12,
          position: 'Top',
          font: { size: '13px', color: '#111827' }
        }"
      />
    </e-sankey-nodes-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode
} from '@syncfusion/ej2-vue-charts';
</script>
```

### Space Between Nodes

This is valid when your chart version supports Sankey node spacing.

```vue
<template>
  <ejs-sankey :nodeSpacing="40">
    <e-sankey-nodes-collection>
      <e-sankey-node id="A" :label="{ text: 'A' }" :color="'#2563EB'" />
      <e-sankey-node id="B" :label="{ text: 'B' }" :color="'#F59E0B'" />
      <e-sankey-node id="C" :label="{ text: 'C' }" :color="'#10B981'" />
    </e-sankey-nodes-collection>

    <e-sankey-links-collection>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
      <e-sankey-link sourceId="B" targetId="C" :value="90" />
    </e-sankey-links-collection>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
</script>
```

## Responsive Design Examples

### Example 1: Desktop-Optimized Layout

```vue
<template>
  <div class="desktop-layout">
    <ejs-sankey
      width="100%"
      height="700px"
      :labelSettings="{ visible: true }"
      :margin="desktopMargin"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Desktop Input' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Desktop Output' }" :color="'#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="140" :color="'#93C5FD'" />
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

const desktopMargin = ref({ top: 40, bottom: 40, left: 40, right: 40 });
</script>

<style scoped>
.desktop-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
```

### Example 2: Mobile-Optimized Layout

This version keeps the original order but makes the responsiveness safer and cleaner.

```vue
<template>
  <div class="mobile-layout">
    <ejs-sankey
      width="100%"
      :height="isMobile ? '500px' : '700px'"
      :labelSettings="{ visible: !isMobile }"
      :margin="isMobile ? mobileMargin : desktopMargin"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" :color="'#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" :color="'#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link sourceId="A" targetId="B" :value="90" :color="'#93C5FD'" />
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

const screenWidth = ref(window.innerWidth);

const isMobile = computed(() => screenWidth.value < 768);

const mobileMargin = ref({ top: 10, bottom: 10, left: 10, right: 10 });
const desktopMargin = ref({ top: 30, bottom: 30, left: 30, right: 30 });

function handleResize() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.mobile-layout {
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .mobile-layout {
    padding: 0 4px;
  }
}
</style>
```

### Example 3: Dark Mode Theme

The idea is good, but dark mode should ideally use a real Syncfusion dark theme stylesheet together with your container styling. The example below keeps your structure while making the appearance customization safer.

```vue
<template>
  <div :class="['chart-container', { dark: isDarkMode }]">
    <ejs-sankey
      height="500px"
      :background="isDarkMode ? '#1E1E1E' : '#FFFFFF'"
    >
      <e-sankey-nodes-collection>
        <e-sankey-node id="A" :label="{ text: 'Input' }" :color="isDarkMode ? '#60A5FA' : '#2563EB'" />
        <e-sankey-node id="B" :label="{ text: 'Output' }" :color="isDarkMode ? '#34D399' : '#16A34A'" />
      </e-sankey-nodes-collection>

      <e-sankey-links-collection>
        <e-sankey-link
          sourceId="A"
          targetId="B"
          :value="100"
          :color="isDarkMode ? '#94A3B8' : '#93C5FD'"
        />
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

const isDarkMode = ref(
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
}
</script>

<style scoped>
.chart-container {
  background-color: #FFFFFF;
  transition: background-color 0.3s ease;
  padding: 12px;
  border-radius: 8px;
}

.chart-container.dark {
  background-color: #1E1E1E;
  color: #FFFFFF;
}

.chart-container.dark ::v-deep svg text {
  fill: #FFFFFF;
}
</style>
```

## Final Appearance and Customization Summary

For Syncfusion Vue 3 Sankey appearance work, these are the most important corrections and best practices applied to your original content:

1. Use `color` consistently for node and link appearance instead of mixing in `fill`.
2. Use a **string background value** for the Sankey background.
3. Apply decorative frame styling such as borders, gradients, radius, and shadows to the **container**, not to the chart configuration unless explicitly supported.
4. For theme customization:
   - import theme CSS globally, or
   - replace one controlled theme stylesheet,
   - do not append repeated `/node_modules/...` links on every click.
5. Prefer **data-driven appearance logic** for styling changes instead of post-render DOM mutation.
6. Clean up resize listeners and keep responsive sizing reactive.
7. Use per-node label objects when you need precise label customization.

```vue
<template>
  <div
    :class="['appearance-demo-shell', { dark: isDarkMode }]"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="toolbar">
      <div class="toolbar-group">
        <label class="toolbar-label">Theme</label>
        <select v-model="currentTheme" @change="applyTheme">
          <option value="material">Material</option>
          <option value="bootstrap">Bootstrap</option>
          <option value="fluent">Fluent</option>
          <option value="tailwind">Tailwind</option>
          <option value="material-dark">Material Dark</option>
          <option value="bootstrap-dark">Bootstrap Dark</option>
          <option value="fluent-dark">Fluent Dark</option>
          <option value="tailwind-dark">Tailwind Dark</option>
        </select>
      </div>

      <div class="toolbar-group">
        <label class="toolbar-label">Labels</label>
        <button type="button" @click="showLabels = !showLabels">
          {{ showLabels ? 'Hide Labels' : 'Show Labels' }}
        </button>
      </div>

      <div class="toolbar-group">
        <label class="toolbar-label">Smart Labels</label>
        <select v-model="smartLabelMode">
          <option value="Trim">Trim</option>
          <option value="Hide">Hide</option>
        </select>
      </div>

      <div class="toolbar-group">
        <label class="toolbar-label">Spacing</label>
        <button type="button" @click="toggleCompactSpacing">
          {{ compactSpacing ? 'Normal Spacing' : 'Compact Spacing' }}
        </button>
      </div>

      <div class="toolbar-group">
        <label class="toolbar-label">Dark Mode</label>
        <button type="button" @click="toggleDarkMode">
          {{ isDarkMode ? 'Light' : 'Dark' }}
        </button>
      </div>

      <div class="toolbar-group">
        <label class="toolbar-label">RTL</label>
        <button type="button" @click="isRtl = !isRtl">
          {{ isRtl ? 'Disable RTL' : 'Enable RTL' }}
        </button>
      </div>
    </div>

    <div class="chart-frame">
      <ejs-sankey
        ref="sankeyRef"
        :width="chartWidth"
        :height="chartHeight"
        :background="chartBackground"
        :margin="chartMargin"
        :nodeSpacing="nodeSpacing"
        :labelSettings="labelSettings"
        :enableRtl="isRtl"
      >
        <e-sankey-nodes-collection>
          <e-sankey-node
            v-for="node in nodes"
            :key="node.id"
            :id="node.id"
            :color="getNodeColor(node)"
            :label="getNodeLabel(node)"
          />
        </e-sankey-nodes-collection>

        <e-sankey-links-collection>
          <e-sankey-link
            v-for="(link, index) in links"
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
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesDirective as ESankeyNodesCollection,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksDirective as ESankeyLinksCollection,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const sankeyRef = ref(null);

const currentTheme = ref('material');
const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
const isRtl = ref(false);
const showLabels = ref(true);
const smartLabelMode = ref('Trim');
const compactSpacing = ref(false);
const screenWidth = ref(window.innerWidth);

const nodes = ref([
  { id: 'Input A', label: 'Input A', category: 'source', value: 820 },
  { id: 'Input B', label: 'Input B', category: 'source', value: 520 },
  { id: 'Process', label: 'Processing', category: 'process', value: 680 },
  { id: 'Review', label: 'Quality Review', category: 'process', value: 430 },
  { id: 'Output', label: 'Output', category: 'output', value: 910 }
]);

const links = ref([
  { sourceId: 'Input A', targetId: 'Process', value: 420 },
  { sourceId: 'Input B', targetId: 'Process', value: 260 },
  { sourceId: 'Process', targetId: 'Review', value: 310 },
  { sourceId: 'Process', targetId: 'Output', value: 280 },
  { sourceId: 'Review', targetId: 'Output', value: 210 }
]);

const chartWidth = computed(() => '100%');
const chartHeight = computed(() => (screenWidth.value < 640 ? '420px' : screenWidth.value < 1024 ? '560px' : '680px'));

const chartBackground = computed(() => (isDarkMode.value ? '#111827' : '#F9FAFB'));

const chartMargin = computed(() => {
  if (screenWidth.value < 640) {
    return { top: 12, bottom: 12, left: 12, right: 12 };
  }

  if (screenWidth.value < 1024) {
    return { top: 20, bottom: 20, left: 20, right: 20 };
  }

  return { top: 32, bottom: 32, left: 32, right: 32 };
});

const nodeSpacing = computed(() => (compactSpacing.value ? 18 : screenWidth.value < 640 ? 26 : 40));

const labelSettings = computed(() => ({
  visible: showLabels.value,
  smartLabelMode: smartLabelMode.value,
  position: 'Top',
  padding: 8,
  font: {
    size: screenWidth.value < 640 ? '11px' : '13px',
    color: isDarkMode.value ? '#F9FAFB' : '#111827',
    fontWeight: '600'
  }
}));

function getNodeColor(node) {
  if (node.category === 'source') {
    return isDarkMode.value ? '#60A5FA' : '#2563EB';
  }

  if (node.category === 'process') {
    return isDarkMode.value ? '#FBBF24' : '#F59E0B';
  }

  return isDarkMode.value ? '#34D399' : '#10B981';
}

function getLinkColor(link) {
  const sourceNode = nodes.value.find((node) => node.id === link.sourceId);

  if (!sourceNode) {
    return isDarkMode.value ? '#94A3B8' : '#CBD5E1';
  }

  if (sourceNode.category === 'source') {
    return isDarkMode.value ? '#93C5FD' : '#60A5FA';
  }

  if (sourceNode.category === 'process') {
    return isDarkMode.value ? '#FCD34D' : '#FBBF24';
  }

  return isDarkMode.value ? '#6EE7B7' : '#86EFAC';
}

function getLinkOpacity(link) {
  if (link.value >= 400) return 0.9;
  if (link.value >= 250) return 0.7;
  return 0.5;
}

function getNodeLabel(node) {
  return {
    text: showLabels.value ? node.label : '',
    visible: showLabels.value,
    position: 'Top',
    padding: 8,
    font: {
      size: screenWidth.value < 640 ? '11px' : '13px',
      color: isDarkMode.value ? '#F9FAFB' : '#111827',
      fontWeight: '600'
    }
  };
}

function toggleCompactSpacing() {
  compactSpacing.value = !compactSpacing.value;
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
}

function applyTheme() {
  let themeLink = document.getElementById('syncfusion-theme');

  if (!themeLink) {
    themeLink = document.createElement('link');
    themeLink.id = 'syncfusion-theme';
    themeLink.rel = 'stylesheet';
    document.head.appendChild(themeLink);
  }

  themeLink.href = `/themes/${currentTheme.value}.css`;
}

function handleResize() {
  screenWidth.value = window.innerWidth;
  sankeyRef.value?.ej2Instances?.refresh();
}

watch(currentTheme, () => {
  applyTheme();
});

watch([isDarkMode, showLabels, smartLabelMode, compactSpacing], () => {
  sankeyRef.value?.ej2Instances?.refresh();
});

onMounted(() => {
  applyTheme();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.appearance-demo-shell {
  width: 100%;
  display: grid;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #111827;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.appearance-demo-shell.dark {
  background: #0F172A;
  color: #F9FAFB;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: end;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.appearance-demo-shell.dark .toolbar {
  border-color: #334155;
  background: linear-gradient(135deg, #1E293B 0%, #111827 100%);
}

.toolbar-group {
  display: grid;
  gap: 6px;
  min-width: 140px;
}

.toolbar-label {
  font-size: 12px;
  font-weight: 700;
  opacity: 0.8;
}

select,
button {
  height: 36px;
  padding: 0 12px;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  background: #FFFFFF;
  color: #111827;
  cursor: pointer;
}

.appearance-demo-shell.dark select,
.appearance-demo-shell.dark button {
  border-color: #475569;
  background: #1E293B;
  color: #F9FAFB;
}

.chart-frame {
  width: 100%;
  border: 1px solid #D1D5DB;
  border-radius: 16px;
  padding: 12px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 246, 1) 100%);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.appearance-demo-shell.dark .chart-frame {
  border-color: #334155;
  background:
    linear-gradient(135deg, rgba(30, 41, 59, 1) 0%, rgba(15, 23, 42, 1) 100%);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

.chart-frame :deep(svg text) {
  transition: fill 0.2s ease;
}

@media (max-width: 640px) {
  .appearance-demo-shell {
    padding: 10px;
  }

  .toolbar {
    padding: 10px;
    gap: 10px;
  }

  .toolbar-group {
    min-width: 120px;
  }

  .chart-frame {
    padding: 8px;
    border-radius: 12px;
  }
}
</style>
```

## Best Production Pattern for Appearance

If your goal is maximum visual control with minimum ambiguity, this is the safest strategy:

- wrapper `<div>` for border, card layout, gradients, padding, responsive framing,
- Sankey `background`, `margin`, `nodeSpacing`, and orientation for chart layout,
- node `color` and `label` for node appearance,
- link `color` and `opacity` for flow appearance,
- theme CSS imported globally for complete visual consistency.
