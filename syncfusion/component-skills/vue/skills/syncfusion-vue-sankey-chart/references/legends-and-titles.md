# Legends and Titles

## Table of Contents
- [Title and Subtitle Setup](#title-and-subtitle-setup)
  - [Technical Review for This Section](#technical-review-for-this-section)
  - [Basic Title](#basic-title)
  - [Title with Styling](#title-with-styling)
  - [Title and Subtitle](#title-and-subtitle)
  - [Dynamic Title from Data](#dynamic-title-from-data)
  - [Title with Background](#title-with-background)
- [Legend Configuration](#legend-configuration)
  - [Technical Review for This Section](#technical-review-for-this-section-1)
  - [Enable Legend](#enable-legend)
  - [Legend Positions](#legend-positions)
  - [Legend with Custom Styling](#legend-with-custom-styling)
- [Legend Interaction](#legend-interaction)
  - [Technical Review for This Section](#technical-review-for-this-section-2)
  - [Legend Click Handling](#legend-click-handling)
  - [Legend Highlighting](#legend-highlighting)
- [Legend Styling](#legend-styling)
  - [Technical Review for This Section](#technical-review-for-this-section-3)
  - [Custom Legend Shape](#custom-legend-shape)
  - [Legend with Background and Border](#legend-with-background-and-border)
  - [Legend Template Custom HTML](#legend-template-custom-html)
- [Multi-Series Pattern](#multi-series-pattern)
  - [Technical Review for This Section](#technical-review-for-this-section-4)
  - [Legend for Multiple Data Series](#legend-for-multiple-data-series)
- [Best Practices](#best-practices)
  - [Technical Review for This Section](#technical-review-for-this-section-5)
  - [Practice 1 Descriptive Titles](#practice-1-descriptive-titles)
  - [Practice 2 Complementary Legend Position](#practice-2-complementary-legend-position)
  - [Practice 3 Title and Legend Sync](#practice-3-title-and-legend-sync)
  - [Practice 4 Legend Accessibility](#practice-4-legend-accessibility)
  - [Practice 5 Responsive Legend](#practice-5-responsive-legend)

## Title and Subtitle Setup

### Technical Review for This Section

- Your `title`, `subTitle`, `titleStyle`, and `subTitleStyle` usage is conceptually correct for Syncfusion Sankey. The documented Sankey title API supports `title`, `subTitle`, `titleStyle`, and `subTitleStyle`, and the style model supports properties such as `size`, `fontWeight`, `fontFamily`, `color`, `fontStyle`, `opacity`, and `textAlignment`. loser to the official title examples. 
- If you want a full-width banner above the diagram, an external wrapper is still valid. If you want the built-in title system only, the title settings model also supports title background, border, and position-oriented settings for the title/subtitle area. 

### Basic Title

```vue
<template>
  <ejs-sankey id="sankey-basic-title" :title="title" width="100%" height="450px">
    <e-sankey-nodes>
      <e-sankey-node id="Source" :label="{ text: 'Source' }" />
      <e-sankey-node id="Process" :label="{ text: 'Process' }" />
      <e-sankey-node id="Output" :label="{ text: 'Output' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Source" targetId="Process" :value="100" />
      <e-sankey-link sourceId="Process" targetId="Output" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const title = 'Energy Flow Diagram 2024'
</script>
```

### Title with Styling

```vue
<template>
  <ejs-sankey
    id="sankey-title-style"
    :title="title"
    :titleStyle="titleStyle"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Generation" :label="{ text: 'Generation' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
      <e-sankey-node id="Usage" :label="{ text: 'Usage' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Generation" targetId="Grid" :value="220" />
      <e-sankey-link sourceId="Grid" targetId="Usage" :value="220" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const title = 'Annual Energy Distribution'

const titleStyle = {
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  fontWeight: '600',
  color: '#1F1F1F',
  size: '18px',
  textAlignment: 'Center'
}
</script>
```

### Title and Subtitle

```vue
<template>
  <ejs-sankey
    id="sankey-title-subtitle"
    :title="title"
    :subTitle="subTitle"
    :titleStyle="titleStyle"
    :subTitleStyle="subTitleStyle"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Plant" :label="{ text: 'Plant' }" />
      <e-sankey-node id="Transmission" :label="{ text: 'Transmission' }" />
      <e-sankey-node id="Consumption" :label="{ text: 'Consumption' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Plant" targetId="Transmission" :value="320" />
      <e-sankey-link sourceId="Transmission" targetId="Consumption" :value="295" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const title = 'Energy Flow System'
const subTitle = 'Tracking energy from generation to consumption across regions'

const titleStyle = {
  fontWeight: '700',
  size: '20px',
  color: '#333333',
  textAlignment: 'Center'
}

const subTitleStyle = {
  fontWeight: '400',
  size: '14px',
  color: '#666666',
  textAlignment: 'Center'
}
</script>
```

### Dynamic Title from Data

```vue
<template>
  <ejs-sankey id="sankey-dynamic-title" :title="dynamicTitle" width="100%" height="450px">
    <e-sankey-nodes>
      <e-sankey-node id="Input" :label="{ text: 'Input' }" />
      <e-sankey-node id="Distribution" :label="{ text: 'Distribution' }" />
      <e-sankey-node id="Demand" :label="{ text: 'Demand' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Input" targetId="Distribution" :value="180" />
      <e-sankey-link sourceId="Distribution" targetId="Demand" :value="170" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const period = ref('Q1 2024')
const company = ref('Energy Corp')

const dynamicTitle = computed(() => `${company.value} - Flow Analysis for ${period.value}`)
</script>
```

### Title with Background

- Your wrapper-banner approach is valid when you want a full-width decorative header above the chart. That is different from the built-in Sankey title system, which is intended for title/subtitle text configuration inside the component. The title settings model additionally documents background and border support for the title/subtitle area itself. 

```vue
<template>
  <div class="titled-chart">
    <div class="title-banner">
      <h2>{{ title }}</h2>
      <p class="subtitle">{{ subTitle }}</p>
    </div>

    <ejs-sankey id="sankey-banner-title" width="100%" height="500px">
      <e-sankey-nodes>
        <e-sankey-node id="Manufacturer" :label="{ text: 'Manufacturer' }" />
        <e-sankey-node id="Distributor" :label="{ text: 'Distributor' }" />
        <e-sankey-node id="Retail" :label="{ text: 'Retail' }" />
        <e-sankey-node id="Consumer" :label="{ text: 'Consumer' }" />
      </e-sankey-nodes>
      <e-sankey-links>
        <e-sankey-link sourceId="Manufacturer" targetId="Distributor" :value="500" />
        <e-sankey-link sourceId="Distributor" targetId="Retail" :value="420" />
        <e-sankey-link sourceId="Retail" targetId="Consumer" :value="380" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const title = 'Global Supply Chain Flow'
const subTitle = 'From manufacturers to end consumers'
</script>

<style scoped>
.title-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 24px;
  border-radius: 8px 8px 0 0;
  text-align: center;
}

.title-banner h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}
</style>
```

## Legend Configuration

### Technical Review for This Section

- The Sankey legend is configured through `legendSettings`, and Syncfusion documents key properties including `visible`, `position`, `width`, `height`, `shapeWidth`, `shapeHeight`, `padding`, `itemPadding`, `shapePadding`, `background`, `opacity`, `title`, `alignment`, `layout`, `location`, `border`, and `textStyle`. 
- In Vue, keep injecting the legend module with `provide('sankey', [SankeyLegend])` when you use legend functionality. Syncfusion’s Sankey docs across wrappers consistently describe legend module/service injection as part of enabling legend features. 
- `mode: 'Point'` should be removed from your Sankey legend settings. The API page shows `mode`, but it explicitly notes that this property is applicable to the chart component rather than Sankey-specific usage. 
- `height` is documented as a string in the legend settings model, so use values like `'40px'` instead of a bare number for consistency with the official API shape. 
- `shapeMargin` is not part of the documented Sankey legend API. The documented spacing property between the legend shape and text is `shapePadding`. 

### Enable Legend

```vue
<template>
  <ejs-sankey
    id="sankey-enable-legend"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Bottom',
  alignment: 'Center',
  itemPadding: 8,
  height: '40px',
  width: '100%',
  background: '#FFFFFF',
  border: {
    color: '#CCCCCC',
    width: 1
  }
}

provide('sankey', [SankeyLegend])
</script>
```

### Legend Positions

```vue
<!-- Bottom -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Bottom' }"></ejs-sankey>

<!-- Top -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Top' }"></ejs-sankey>

<!-- Left -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Left' }"></ejs-sankey>

<!-- Right -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Right' }"></ejs-sankey>

<!-- Auto -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Auto' }"></ejs-sankey>

<!-- Custom -->
<ejs-sankey
  :legendSettings="{
    visible: true,
    position: 'Custom',
    location: { x: 120, y: 150 },
    width: '150px',
    height: '150px'
  }"
></ejs-sankey>
```

### Legend with Custom Styling

```vue
<template>
  <ejs-sankey
    id="sankey-legend-style"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Coal" :label="{ text: 'Coal' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
      <e-sankey-link sourceId="Coal" targetId="Grid" :value="500" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Right',
  itemPadding: 12,
  textStyle: {
    fontFamily: 'Segoe UI',
    fontWeight: '400',
    size: '13px',
    color: '#333333'
  },
  border: {
    color: '#3498DB',
    width: 2
  },
  background: '#F8F8F8',
  opacity: 0.95,
  shapeHeight: 12,
  shapeWidth: 12,
  shapePadding: 8
}

provide('sankey', [SankeyLegend])
</script>
```

## Legend Interaction

### Technical Review for This Section

- The currently documented Sankey events include `load`, `loaded`, `legendItemRendering`, `labelRendering`, `nodeRendering`, `linkRendering`, `tooltipRendering`, `nodeClick`, `nodeEnter`, `nodeLeave`, `linkClick`, `linkEnter`, `linkLeave`, `sizeChanged`, and export/print events. The current event documentation does not list `legendItemClick`, `legendItemMouseMove`, or `legendItemMouseLeave` as public Sankey events. 
- For legend interaction, the supported and documented path is to use `legendSettings.enableHighlight` for built-in highlight behavior and `legendItemRendering` for custom legend item appearance before render. [
- If you want click-to-filter behavior, the safest Vue 3 pattern is an external custom control that updates the Sankey nodes/links reactively, while the Syncfusion legend remains a visual key. This avoids depending on undocumented legend click events. 
- Your collection tags should be corrected from `<e-sankey-nodes-collection>` and `<e-sankey-links-collection>` to `<e-sankey-nodes>` and `<e-sankey-links>`, which is the directive structure used in Syncfusion Sankey examples. 

### Legend Click Handling

- Because `legendItemClick` is not part of the currently documented Sankey event surface, the recommended replacement is an external filter control plus the built-in Sankey legend. 

```vue
<template>
  <div class="legend-filter-layout">
    <div class="custom-legend">
      <button
        v-for="node in sourceNodes"
        :key="node.id"
        class="legend-chip"
        :class="{ inactive: !activeSources.includes(node.id) }"
        @click="toggleSource(node.id)"
      >
        <span class="swatch" :style="{ backgroundColor: node.color }"></span>
        {{ node.label }}
      </button>
    </div>

    <ejs-sankey
      id="sankey-custom-legend-filter"
      :legendSettings="legendSettings"
      width="100%"
      height="450px"
    >
      <e-sankey-nodes>
        <e-sankey-node
          v-for="node in nodes"
          :key="node.id"
          :id="node.id"
          :label="{ text: node.label }"
          :fill="node.color"
        />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link
          v-for="(link, idx) in filteredLinks"
          :key="idx"
          :sourceId="link.sourceId"
          :targetId="link.targetId"
          :value="link.value"
        />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, ref, provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const nodes = ref([
  { id: 'Solar', label: 'Solar', color: '#FFD700' },
  { id: 'Wind', label: 'Wind', color: '#87CEEB' },
  { id: 'Coal', label: 'Coal', color: '#A9A9A9' },
  { id: 'Grid', label: 'Grid', color: '#5B8FF9' }
])

const sourceNodes = computed(() => nodes.value.filter(node => ['Solar', 'Wind', 'Coal'].includes(node.id)))

const allLinks = ref([
  { sourceId: 'Solar', targetId: 'Grid', value: 300 },
  { sourceId: 'Wind', targetId: 'Grid', value: 200 },
  { sourceId: 'Coal', targetId: 'Grid', value: 500 }
])

const activeSources = ref(['Solar', 'Wind', 'Coal'])

const filteredLinks = computed(() =>
  allLinks.value.filter(link => activeSources.value.includes(link.sourceId))
)

function toggleSource(sourceId) {
  if (activeSources.value.includes(sourceId)) {
    activeSources.value = activeSources.value.filter(id => id !== sourceId)
  } else {
    activeSources.value = [...activeSources.value, sourceId]
  }
}

const legendSettings = {
  visible: true,
  position: 'Bottom'
}

provide('sankey', [SankeyLegend])
</script>

<style scoped>
.legend-filter-layout {
  width: 100%;
}

.custom-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.legend-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d0d7de;
  background: #ffffff;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.legend-chip.inactive {
  opacity: 0.5;
}

.swatch {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 2px;
}
</style>
```

### Legend Highlighting

- For Sankey legend highlighting, prefer the built-in `enableHighlight: true`. If you need custom hover reactions, use the documented node/link enter/leave events instead of undocumented legend hover handlers. 

```vue
<template>
  <ejs-sankey
    id="sankey-legend-highlight"
    :legendSettings="legendSettings"
    @nodeEnter="onNodeEnter"
    @nodeLeave="onNodeLeave"
    @linkEnter="onLinkEnter"
    @linkLeave="onLinkLeave"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Bottom',
  enableHighlight: true
}

function onNodeEnter(args) {
  console.log('Node enter:', args)
}

function onNodeLeave(args) {
  console.log('Node leave:', args)
}

function onLinkEnter(args) {
  console.log('Link enter:', args)
}

function onLinkLeave(args) {
  console.log('Link leave:', args)
}

provide('sankey', [SankeyLegend])
</script>
```

## Legend Styling

### Technical Review for This Section

- `shapeHeight`, `shapeWidth`, `shapePadding`, `background`, `border`, `margin`, `padding`, `opacity`, `title`, `titleStyle`, and `template` are aligned with the documented legend settings surface. 
- `shapeBorder` and `shapeMargin` are not listed in the current Sankey legend settings documentation, so they should not be relied upon in Vue 3 Sankey examples. Use `border` for the legend container and `shapePadding` for symbol/text spacing. 

### Custom Legend Shape

```vue
<template>
  <ejs-sankey
    id="sankey-custom-legend-shape"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Hydro" :label="{ text: 'Hydro' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="150" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="220" />
      <e-sankey-link sourceId="Hydro" targetId="Grid" :value="180" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Bottom',
  shapeHeight: 15,
  shapeWidth: 15,
  shapePadding: 10
}

provide('sankey', [SankeyLegend])
</script>
```

### Legend with Background and Border

```vue
<template>
  <ejs-sankey
    id="sankey-legend-bg-border"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Coal" :label="{ text: 'Coal' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
      <e-sankey-link sourceId="Coal" targetId="Grid" :value="500" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Right',
  background: '#F0F8FF',
  border: {
    color: '#4169E1',
    width: 2
  },
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },
  padding: 15,
  opacity: 0.9
}

provide('sankey', [SankeyLegend])
</script>
```

### Legend Template Custom HTML

```vue
<template>
  <ejs-sankey
    id="sankey-legend-template"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Coal" :label="{ text: 'Coal' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
      <e-sankey-link sourceId="Coal" targetId="Grid" :value="500" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const legendSettings = {
  visible: true,
  position: 'Bottom',
  template: `
    <div style="display:flex;align-items:center;padding:4px 8px;">
      <span style="display:inline-block;width:12px;height:12px;background:${'${fill}'};margin-right:8px;"></span>
      <span>${'${text}'}</span>
    </div>
  `
}

provide('sankey', [SankeyLegend])
</script>
```

## Multi-Series Pattern

### Technical Review for This Section

- Sankey is fundamentally a node/link flow component, not a multi-series Cartesian chart. So the word “series” in this section is better treated as a custom business category that you use to filter nodes and links reactively. 
- The external button-filter approach is valid for category toggling, while the built-in legend continues to serve as a visual key. This is more accurate than implying that Sankey has first-class series collections comparable to chart series.

### Legend for Multiple Data Series

```vue
<template>
  <div class="multi-series-container">
    <h3>{{ title }}</h3>

    <div class="legend-controls">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="['series-button', { active: category.active }]"
        @click="toggleCategory(category.id)"
      >
        <span :style="{ backgroundColor: category.color }" class="color-dot"></span>
        {{ category.name }}
      </button>
    </div>

    <ejs-sankey :legendSettings="legendSettings" width="100%" height="450px">
      <e-sankey-nodes>
        <e-sankey-node
          v-for="node in visibleNodes"
          :key="node.id"
          :id="node.id"
          :label="{ text: node.label }"
          :fill="node.color"
        />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link
          v-for="(link, idx) in visibleLinks"
          :key="idx"
          :sourceId="link.sourceId"
          :targetId="link.targetId"
          :value="link.value"
        />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { computed, ref, provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const title = ref('Multi-Source Energy Analysis')

const categories = ref([
  { id: 'renewable', name: 'Renewable Sources', color: '#2ECC71', active: true },
  { id: 'fossil', name: 'Fossil Fuels', color: '#E74C3C', active: true },
  { id: 'nuclear', name: 'Nuclear', color: '#F39C12', active: true }
])

const allNodes = ref([
  { id: 'Solar', label: 'Solar', color: '#2ECC71', category: 'renewable' },
  { id: 'Wind', label: 'Wind', color: '#2ECC71', category: 'renewable' },
  { id: 'Coal', label: 'Coal', color: '#E74C3C', category: 'fossil' },
  { id: 'Nuclear', label: 'Nuclear', color: '#F39C12', category: 'nuclear' },
  { id: 'Grid', label: 'Distribution Grid', color: '#95A5A6', category: null }
])

const allLinks = ref([
  { sourceId: 'Solar', targetId: 'Grid', value: 300, category: 'renewable' },
  { sourceId: 'Wind', targetId: 'Grid', value: 200, category: 'renewable' },
  { sourceId: 'Coal', targetId: 'Grid', value: 500, category: 'fossil' },
  { sourceId: 'Nuclear', targetId: 'Grid', value: 400, category: 'nuclear' }
])

const visibleNodes = computed(() =>
  allNodes.value.filter(node =>
    node.category === null || categories.value.some(category => category.id === node.category && category.active)
  )
)

const visibleLinks = computed(() =>
  allLinks.value.filter(link =>
    categories.value.some(category => category.id === link.category && category.active)
  )
)

function toggleCategory(categoryId) {
  categories.value = categories.value.map(category =>
    category.id === categoryId ? { ...category, active: !category.active } : category
  )
}

const legendSettings = {
  visible: true,
  position: 'Bottom'
}

provide('sankey', [SankeyLegend])
</script>

<style scoped>
.multi-series-container {
  width: 100%;
}

.legend-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.series-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #DDD;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.series-button:hover {
  border-color: #3498DB;
  background: #F0F8FF;
}

.series-button.active {
  border-color: #3498DB;
  background: #E3F2FD;
  font-weight: 600;
}

.color-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
</style>
```

## Best Practices

### Technical Review for This Section

- Descriptive titles and a clear title/subtitle hierarchy are explicitly recommended in the Sankey title guidance. 
- Legend placement should be chosen based on available space and readability; the documented legend positions include `Auto`, `Top`, `Bottom`, `Left`, `Right`, and `Custom`. 
- For accessibility, the legend settings model includes accessibility-oriented properties such as `description` and `tabIndex`, and the title settings model includes title/subtitle accessibility support. These are more Syncfusion-native than relying only on raw `role` and `aria-label` on the wrapper element. 
- For responsive behavior, a resize listener is fine, but in Vue 3 you should remove the listener in `onBeforeUnmount` to avoid leaks. 

### Practice 1 Descriptive Titles

```vue
<!-- ✅ GOOD -->
<ejs-sankey :title="'Q4 2024 Energy Distribution Across Regions'"></ejs-sankey>

<!-- ❌ AVOID -->
<ejs-sankey :title="'Chart'"></ejs-sankey>
```

### Practice 2 Complementary Legend Position

```vue
<!-- Horizontal or wide layout -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Bottom' }"></ejs-sankey>

<!-- Taller or narrow layout -->
<ejs-sankey :legendSettings="{ visible: true, position: 'Right' }"></ejs-sankey>
```

### Practice 3 Title and Legend Sync

```vue
<template>
  <ejs-sankey
    id="sankey-title-legend-sync"
    :title="title"
    :titleStyle="titleStyle"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Input" :label="{ text: 'Input' }" />
      <e-sankey-node id="Output" :label="{ text: 'Output' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Input" targetId="Output" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const title = 'Annual Flow Analysis'

const titleStyle = {
  fontFamily: 'Segoe UI',
  size: '18px',
  fontWeight: '600',
  color: '#1F1F1F',
  textAlignment: 'Center'
}

const legendSettings = {
  visible: true,
  textStyle: {
    fontFamily: 'Segoe UI',
    size: '12px',
    color: '#1F1F1F'
  }
}

provide('sankey', [SankeyLegend])
</script>
```

### Practice 4 Legend Accessibility

```vue
<template>
  <ejs-sankey
    id="sankey-accessible-legend"
    :title="title"
    :subTitle="subTitle"
    :legendSettings="legendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const title = 'Energy Flow Legend and Chart'
const subTitle = 'Accessible Sankey example'

const legendSettings = {
  visible: true,
  description: 'Legend for energy source categories in the Sankey diagram',
  tabIndex: 3,
  textStyle: {
    size: '14px'
  }
}

provide('sankey', [SankeyLegend])
</script>
```

### Practice 5 Responsive Legend

```vue
<template>
  <ejs-sankey
    id="sankey-responsive-legend"
    :legendSettings="responsiveLegendSettings"
    width="100%"
    height="450px"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, provide } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts'

const screenWidth = ref(window.innerWidth)

const responsiveLegendSettings = computed(() => ({
  visible: true,
  position: screenWidth.value < 768 ? 'Bottom' : 'Right',
  alignment: 'Center',
  itemPadding: screenWidth.value < 768 ? 4 : 8
}))

function handleResize() {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

provide('sankey', [SankeyLegend])
</script>
```