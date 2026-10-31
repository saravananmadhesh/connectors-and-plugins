# Nodes and Links: Core Configuration

## Table of Contents

- [Node Configuration](#node-configuration)
  - [Support Review Node Configuration](#support-review-node-configuration)
  - [Basic Node Setup](#basic-node-setup)
  - [Node Properties](#node-properties)
  - [Example Energy Nodes with Labels](#example-energy-nodes-with-labels)
- [Node Styling & Colors](#node-styling--colors)
  - [Support Review Node Styling  Colors](#support-review-node-styling--colors)
  - [Individual Node Colors](#individual-node-colors)
  - [Dynamic Node Colors from Data](#dynamic-node-colors-from-data)
  - [Font Styling for Node Labels](#font-styling-for-node-labels)
- [Link Configuration](#link-configuration)
  - [Support Review Link Configuration](#support-review-link-configuration)
  - [Basic Link Setup](#basic-link-setup)
  - [Link Properties](#link-properties)
  - [Example Multi-Stage Supply Chain](#example-multi-stage-supply-chain)
- [Link Styling](#link-styling)
  - [Support Review Link Styling](#support-review-link-styling)
  - [Opacity Control](#opacity-control)
  - [Curvature Settings](#curvature-settings)
  - [Individual Link Colors](#individual-link-colors)
- [Color Mapping](#color-mapping)
  - [Support Review Color Mapping](#support-review-color-mapping)
  - [Color by Source Node](#color-by-source-node)
  - [Color by Target Node](#color-by-target-node)
- [Data Binding Patterns](#data-binding-patterns)
  - [Support Review Data Binding Patterns](#support-review-data-binding-patterns)
  - [Pattern 1 Static Inline Data](#pattern-1-static-inline-data)
  - [Pattern 2 Dynamic v-for Loop](#pattern-2-dynamic-v-for-loop)
  - [Pattern 3 API-Driven with Computed](#pattern-3-api-driven-with-computed)
- [Common Pitfalls](#common-pitfalls)
  - [Support Review Common Pitfalls](#support-review-common-pitfalls)
  - [Pitfall 1 ID Mismatch](#pitfall-1-id-mismatch)
  - [Pitfall 2 Duplicate Node IDs](#pitfall-2-duplicate-node-ids)
  - [Pitfall 3 Cycles and Back-Links](#pitfall-3-cycles-and-back-links)
  - [Pitfall 4 Value Handling](#pitfall-4-value-handling)
  - [Pitfall 5 Self-Links](#pitfall-5-self-links)
  - [Pitfall 6 Missing Key in v-for](#pitfall-6-missing-key-in-v-for)

## Node Configuration

### Support Review Node Configuration

- Syncfusion Sankey nodes are **flow entities rendered as node rectangles**, not circular elements. The node-style API documents `width` as “the width of the node rectangle in pixels,” and the node overview describes nodes as sources, targets, and intermediate entities in a flow diagram. e unique across all nodes, and links must reference existing node ids through `sourceId` and `targetId`. Syncfusion explicitly documents node-id uniqueness and link-to-node matching. 
- Your original `label.font` usage is not aligned with the documented Sankey node-label model. The per-node `label` model documents `text` and `padding`, while font-related properties are documented on the component-level `labelSettings`. 

### Basic Node Setup

The corrected minimal node collection uses `<e-sankey-nodes>` and only the documented node-level properties. 

```vue
<e-sankey-nodes>
  <e-sankey-node id="Source A" />
  <e-sankey-node id="Target B" />
  <e-sankey-node id="Final C" />
</e-sankey-nodes>
```

### Node Properties

A corrected node/property split for Syncfusion Sankey is shown below: individual-node properties stay on the node, while size/opacity/border belong to `nodeStyle`. 

```javascript
const node = {
  id: 'Node1',                // REQUIRED: unique node id
  label: {
    text: 'Display Label',    // Supported on the node label model
    padding: 6                // Supported on the node label model
  },
  color: '#FF6B35',           // Per-node color
  offset: 50                  // Per-node custom offset
};

const nodeStyle = {
  width: 20,                  // Global node rectangle width
  padding: 10,                // Spacing around node content / labels
  opacity: 1,
  fill: '#FF6B35',            // Global default node fill
  stroke: '#333333',
  strokeWidth: 1
};

const labelSettings = {
  visible: true,
  color: '#000000',
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'Segoe UI',
  padding: 10
};
```

### Example Energy Nodes with Labels

This corrected Vue 3 Composition API SFC uses proper Sankey imports, proper node/link directives, per-node `color`, and global `labelSettings` for font styling. 

```vue
<template>
  <ejs-sankey
    id="sankey-energy-nodes"
    width="100%"
    height="400px"
    :nodeStyle="nodeStyle"
    :labelSettings="labelSettings"
  >
    <e-sankey-nodes>
      <e-sankey-node
        id="Solar Energy"
        :label="{ text: 'Solar Energy' }"
        color="#FFD700"
      />
      <e-sankey-node
        id="Wind Energy"
        :label="{ text: 'Wind Energy' }"
        color="#87CEEB"
      />
      <e-sankey-node
        id="Grid"
        :label="{ text: 'Distribution Grid' }"
        color="#808080"
      />
      <e-sankey-node
        id="Consumer"
        :label="{ text: 'End Consumer' }"
        color="#90EE90"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Solar Energy" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind Energy" targetId="Grid" :value="200" />
      <e-sankey-link sourceId="Grid" targetId="Consumer" :value="450" />
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

const nodeStyle = {
  width: 20,
  padding: 10,
  opacity: 1,
  stroke: '#FFFFFF',
  strokeWidth: 1
}

const labelSettings = {
  visible: true,
  fontSize: '12px',
  fontFamily: 'Segoe UI',
  color: '#1F1F1F',
  fontWeight: '400',
  padding: 8
}
</script>
```

## Node Styling & Colors

### Support Review Node Styling & Colors

- Use the node-level `color` property for **individual node color overrides**. Syncfusion documents `color` on the Sankey node model and `fill` on the global `nodeStyle` model. 
- Use `nodeStyle` for **global node appearance** such as `fill`, `opacity`, `stroke`, `strokeWidth`, `padding`, and `width`. 
- Use `labelSettings` for **font styling** such as `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`, `color`, and label visibility. Those font properties are documented on `labelSettings`, not inside the per-node `label` object. 

### Individual Node Colors

The corrected per-node color form is `color`, not `fill`, when you want to customize individual nodes. 

```vue
<e-sankey-node id="Critical" color="#E74C3C" />
<e-sankey-node id="Important" color="#F39C12" />
<e-sankey-node id="Normal" color="#3498DB" />
<e-sankey-node id="Complete" color="#2ECC71" />
```

### Dynamic Node Colors from Data

This corrected SFC keeps the dynamic data pattern and maps category-to-color through the documented node-level `color` property. 

```vue
<template>
  <ejs-sankey id="sankey-dynamic-node-colors" width="100%" height="380px">
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.name }"
        :color="getNodeColor(node.category)"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Input1" targetId="Process" :value="120" />
      <e-sankey-link sourceId="Process" targetId="Output" :value="110" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const nodes = ref([
  { id: 'Input1', name: 'Input 1', category: 'source' },
  { id: 'Process', name: 'Process', category: 'process' },
  { id: 'Output', name: 'Output', category: 'target' }
])

const colorMap = {
  source: '#3498DB',
  process: '#F39C12',
  target: '#2ECC71'
}

function getNodeColor(category) {
  return colorMap[category] || '#95A5A6'
}
</script>
```

### Font Styling for Node Labels

The corrected Syncfusion-native way to style Sankey node labels is through `labelSettings`, not `label.font`. If you need conditional per-label customization, use the documented `labelRendering` event. 

```vue
<template>
  <ejs-sankey
    id="sankey-label-fonts"
    width="100%"
    height="300px"
    :labelSettings="labelSettings"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Header" :label="{ text: 'Main Process' }" color="#2F80ED" />
      <e-sankey-node id="Output" :label="{ text: 'Output' }" color="#27AE60" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Header" targetId="Output" :value="100" />
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

const labelSettings = {
  visible: true,
  fontSize: '16px',
  color: '#FFFFFF',
  fontWeight: '700',
  fontFamily: 'Arial',
  padding: 8
}
</script>
```

## Link Configuration

### Support Review Link Configuration

- The documented Sankey link model contains `sourceId`, `targetId`, and `value`. Syncfusion documents those as the core per-link properties, with `value` controlling the link thickness. 
- The visual appearance of links is controlled globally through `linkStyle`, which documents `opacity`, `highlightOpacity`, `inactiveOpacity`, `curvature`, and `colorType`. 
- Your original per-link `color`, `opacity`, and `curvature` inside the individual link object are **not** part of the retrieved Sankey link model. For individual link color customization, the documented pattern is `linkRendering`; for shared behavior, use `linkStyle`. 
- The correct directive wrapper in Vue is `<e-sankey-links>`, not `<e-sankey-links-collection>`. 

### Basic Link Setup

The corrected minimal link collection uses the supported link model: `sourceId`, `targetId`, and `value`. 

```vue
<e-sankey-links>
  <e-sankey-link sourceId="A" targetId="B" :value="100" />
  <e-sankey-link sourceId="B" targetId="C" :value="80" />
</e-sankey-links>
```

### Link Properties

A corrected Syncfusion split is shown below: core link data on the link model, and visual styling on `linkStyle`. 

```javascript
const link = {
  sourceId: 'NodeA',   // REQUIRED: source node id
  targetId: 'NodeB',   // REQUIRED: target node id
  value: 150           // REQUIRED: controls link thickness
};

const linkStyle = {
  opacity: 0.7,
  highlightOpacity: 1,
  inactiveOpacity: 0.3,
  curvature: 0.5,
  colorType: 'Blend'   // 'Source' | 'Target' | 'Blend'
};
```

### Example Multi-Stage Supply Chain

This corrected Vue 3 SFC keeps the same business scenario but moves styling into the documented `linkStyle` model. 

```vue
<template>
  <ejs-sankey
    id="sankey-supply-chain"
    width="100%"
    height="450px"
    :linkStyle="linkStyle"
    :nodeStyle="nodeStyle"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Supplier" :label="{ text: 'Supplier' }" color="#3B82F6" />
      <e-sankey-node id="Factory" :label="{ text: 'Factory' }" color="#8B5CF6" />
      <e-sankey-node id="Warehouse" :label="{ text: 'Warehouse' }" color="#F59E0B" />
      <e-sankey-node id="Retail" :label="{ text: 'Retail' }" color="#10B981" />
      <e-sankey-node id="Customer" :label="{ text: 'Customer' }" color="#EF4444" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Supplier" targetId="Factory" :value="1000" />
      <e-sankey-link sourceId="Factory" targetId="Warehouse" :value="950" />
      <e-sankey-link sourceId="Warehouse" targetId="Retail" :value="900" />
      <e-sankey-link sourceId="Retail" targetId="Customer" :value="850" />
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

const nodeStyle = {
  width: 20,
  padding: 10,
  opacity: 1,
  stroke: '#FFFFFF',
  strokeWidth: 1
}

const linkStyle = {
  opacity: 0.6,
  curvature: 0.45,
  colorType: 'Blend'
}
</script>
```

## Link Styling

### Support Review Link Styling

- The documented `linkStyle` properties are `opacity`, `highlightOpacity`, `inactiveOpacity`, `curvature`, and `colorType`. 
- `colorType` supports `Source`, `Target`, and `Blend`. Syncfusion’s color-type API documents those exact options. 
- For **individual link colors**, use the documented `linkRendering` event, whose event args expose `fill` and the current `link`. 

### Opacity Control

Use `linkStyle.opacity` to control baseline link transparency. The documented default is `0.35`, and valid values are from `0` to `1`. 

```vue
<ejs-sankey :linkStyle="{ opacity: 0.5 }">
  <!-- Links are semi-transparent -->
</ejs-sankey>
```

- `opacity: 0` makes links fully transparent. 
- `opacity: 0.5` makes links semi-transparent. 
- `opacity: 1` makes links fully opaque. 

### Curvature Settings

Use `linkStyle.curvature` to control how strongly links bend. Syncfusion documents `0` as straight and `1` as fully curved. 

```vue
<ejs-sankey :linkStyle="{ curvature: 0.45 }">
  <!-- Curved links -->
</ejs-sankey>
```

- `curvature: 0` gives straight connections. 
- `curvature: 0.25` gives a light bend. 
- `curvature: 0.5` gives a moderate curve. 
- `curvature: 0.8` gives a strong curve. 

### Individual Link Colors

The corrected Syncfusion-native pattern for individual link colors is `linkRendering`, because the retrieved `SankeyLinkModel` does not document a per-link `color` property. The render event exposes `fill` and the current `link`. 

```vue
<template>
  <ejs-sankey
    id="sankey-individual-link-colors"
    width="100%"
    height="320px"
    :linkStyle="linkStyle"
    @linkRendering="onLinkRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node id="A" color="#1D4ED8" />
      <e-sankey-node id="B" color="#059669" />
      <e-sankey-node id="C" color="#DC2626" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
      <e-sankey-link sourceId="B" targetId="C" :value="80" />
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

const linkStyle = {
  opacity: 0.7,
  curvature: 0.45,
  colorType: 'Blend'
}

function onLinkRendering(args) {
  if (args.link.sourceId === 'A' && args.link.targetId === 'B') {
    args.fill = '#FF5733'
  }

  if (args.link.sourceId === 'B' && args.link.targetId === 'C') {
    args.fill = '#2ECC71'
  }
}
</script>
```

## Color Mapping

### Support Review Color Mapping

- The documented link color modes are `Source`, `Target`, and `Blend`, applied through `linkStyle.colorType`. 
- `Source` makes the link use the source node’s color, `Target` makes the link use the target node’s color, and `Blend` mixes the colors between source and target. 

### Color by Source Node

Use `linkStyle.colorType = 'Source'` when links should inherit source-node colors. 

```vue
<template>
  <ejs-sankey
    id="sankey-color-source"
    width="100%"
    height="340px"
    :linkStyle="linkStyle"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" color="#FFD700" />
      <e-sankey-node id="Wind" color="#87CEEB" />
      <e-sankey-node id="Grid" color="#808080" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Solar" targetId="Grid" :value="300" />
      <e-sankey-link sourceId="Wind" targetId="Grid" :value="200" />
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

const linkStyle = {
  colorType: 'Source',
  opacity: 0.6,
  curvature: 0.45
}
</script>
```

### Color by Target Node

Use `linkStyle.colorType = 'Target'` when links should inherit target-node colors. 

```vue
<script setup>
import { ref } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const linkStyle = ref({
  colorType: 'Target',
  opacity: 0.6,
  curvature: 0.45
})
</script>
```

## Data Binding Patterns

### Support Review Data Binding Patterns

- All three patterns you outlined are valid Vue patterns for Syncfusion Sankey: static inline nodes/links, reactive `v-for` rendering, and computed transformation from API data. Syncfusion’s Sankey model exposes `nodes`, `links`, `nodeStyle`, `linkStyle`, and `labelSettings`, and the Vue product example shows standard directive-based rendering. 
- For reactive rendering with `v-for`, keeping a stable Vue `:key` is the correct approach for predictable DOM updates. That is a Vue requirement and remains a best practice for Syncfusion node/link directives as well. 

### Pattern 1 Static Inline Data

This pattern is fully valid after correcting the wrapper directive names. 

```vue
<template>
  <ejs-sankey id="sankey-static-inline" width="100%" height="300px">
    <e-sankey-nodes>
      <e-sankey-node id="A" />
      <e-sankey-node id="B" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="A" targetId="B" :value="100" />
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
</script>
```

### Pattern 2 Dynamic v-for Loop

This corrected version keeps `v-for` and `:key` while using the proper directive wrappers. 

```vue
<template>
  <ejs-sankey id="sankey-vfor" width="100%" height="320px">
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.label }"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link
        v-for="(link, idx) in links"
        :key="`${link.sourceId}-${link.targetId}-${idx}`"
        :sourceId="link.sourceId"
        :targetId="link.targetId"
        :value="link.value"
      />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const nodes = ref([
  { id: 'Source', label: 'Data Source' },
  { id: 'Process', label: 'Processing' },
  { id: 'Output', label: 'Output' }
])

const links = ref([
  { sourceId: 'Source', targetId: 'Process', value: 500 },
  { sourceId: 'Process', targetId: 'Output', value: 450 }
])
</script>
```

### Pattern 3 API-Driven with Computed

This corrected SFC expands the logic block into a runnable Composition API example while keeping the same computed transformation idea. 

```vue
<template>
  <ejs-sankey id="sankey-api-computed" width="100%" height="360px">
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in computedNodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.label }"
        :color="node.color"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link
        v-for="(link, idx) in computedLinks"
        :key="`${link.sourceId}-${link.targetId}-${idx}`"
        :sourceId="link.sourceId"
        :targetId="link.targetId"
        :value="link.value"
      />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { computed, onMounted, ref, } from 'vue'
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts'

const rawData = ref({
  nodes: [],
  edges: []
})

const computedNodes = computed(() =>
  rawData.value.nodes.map(n => ({
    id: n.id,
    label: n.name,
    color: n.importance === 'high' ? '#E74C3C' : '#3498DB'
  }))
)

const computedLinks = computed(() =>
  rawData.value.edges.map(e => ({
    sourceId: e.from,
    targetId: e.to,
    value: e.weight
  }))
)

async function loadData() {
  const response = await fetch('/api/sankey')
  rawData.value = await response.json()
}

onMounted(() => {
  loadData()
})
</script>
```

## Common Pitfalls

### Support Review Common Pitfalls

- The most important documented constraints from the retrieved Syncfusion Sankey APIs are: unique node ids, exact link-to-node id matching, and `value` controlling link thickness. 
- The biggest technical issues in your original notes are not only data mistakes such as id mismatches, but also **API-shape mistakes** such as unsupported collection wrappers, unsupported `label.font`, and unsupported per-link `color` on the individual link model. 
- The retrieved Syncfusion Sankey pages do not explicitly describe cycle/self-link rules in the API model pages we checked, so those cases should be validated carefully in your application rather than treated as documented guaranteed behaviors. 

### Pitfall 1 ID Mismatch

If `sourceId` or `targetId` does not exactly match an existing node `id`, the link definition is invalid against the documented link model. 

```vue
<!-- WRONG -->
<e-sankey-node id="Source" />
<e-sankey-link sourceId="Sources" targetId="Target" :value="100" />
```

```vue
<!-- CORRECT -->
<e-sankey-node id="Source" />
<e-sankey-link sourceId="Source" targetId="Target" :value="100" />
```

### Pitfall 2 Duplicate Node IDs

Syncfusion explicitly requires node ids to be unique across the Sankey. 

```vue
<!-- WRONG -->
<e-sankey-node id="Process" />
<e-sankey-node id="Process" />
```

```vue
<!-- CORRECT -->
<e-sankey-node id="Process1" />
<e-sankey-node id="Process2" />
```

### Pitfall 3 Cycles and Back-Links

The retrieved Syncfusion API pages do not document a special cycle API or cycle-validation contract, so treat back-links and cycles as data cases that must be validated carefully in your app. For Sankey readability, a forward-flow structure is the safer pattern. 

```vue
<!-- Validate this carefully in your app -->
<e-sankey-link sourceId="A" targetId="B" :value="100" />
<e-sankey-link sourceId="B" targetId="A" :value="100" />
```

```vue
<!-- Safer forward-flow pattern -->
<e-sankey-link sourceId="A" targetId="B" :value="100" />
<e-sankey-link sourceId="B" targetId="C" :value="100" />
```

### Pitfall 4 Value Handling

Syncfusion documents `value` as the weight that determines link thickness. For meaningful Sankey output, use sensible numeric weights and validate your data before rendering. 

```vue
<!-- SAFER -->
<e-sankey-link sourceId="A" targetId="B" :value="100" />
<e-sankey-link sourceId="C" targetId="D" :value="50" />
```

### Pitfall 5 Self-Links

A self-link is not described as a special first-class case in the retrieved Syncfusion Sankey API pages, so validate it explicitly if your dataset can contain one. For predictable flow diagrams, different source and target ids are the safer pattern. 

```vue
<!-- Validate carefully -->
<e-sankey-link sourceId="A" targetId="A" :value="100" />
```

```vue
<!-- Safer -->
<e-sankey-link sourceId="A" targetId="B" :value="100" />
```

### Pitfall 6 Missing Key in v-for

A stable Vue `:key` remains the correct pattern for dynamic Sankey node/link lists. Use a unique id-based key for nodes and a stable composite key for links. 

```vue
<!-- WRONG -->
<e-sankey-node
  v-for="node in nodes"
  :id="node.id"
/>

<!-- CORRECT -->
<e-sankey-node
  v-for="node in nodes"
  :key="node.id"
  :id="node.id"
/>
```