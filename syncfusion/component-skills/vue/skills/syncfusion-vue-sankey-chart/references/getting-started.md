# Getting Started with Sankey Diagram

## Table of Contents
- [Installation & Package Setup](#installation--package-setup)
  - [Step 1: Install the Package](#step-1-install-the-package)
  - [Step 2: Verify Dependencies](#step-2-verify-dependencies)
  - [Step 3: Import CSS Theme](#step-3-import-css-theme)
- [Module Registration](#module-registration)
  - [Core Modules](#core-modules)
  - [Feature Modules (Optional)](#feature-modules-optional)
- [Component Import & Registration](#component-import--registration)
  - [Vue 3 - Composition API (Recommended)](#vue-3---composition-api-recommended)
  - [Vue 3 - Options API](#vue-3---options-api)
  - [Vue 2 - Options API](#vue-2---options-api)
- [Basic Sankey Setup](#basic-sankey-setup)
  - [Minimal Example (3 nodes, 2 links)](#minimal-example-3-nodes-2-links)
- [Data Binding with Collections](#data-binding-with-collections)
  - [Static Binding (Inline)](#static-binding-inline)
  - [Dynamic Binding with v-for](#dynamic-binding-with-v-for)
  - [JSON Data Example](#json-data-example)
- [Vue 2 vs Vue 3 Patterns](#vue-2-vs-vue-3-patterns)
  - [Import Differences](#import-differences)
  - [Directive Naming](#directive-naming)
  - [Module Provide](#module-provide)
- [Running in Development](#running-in-development)
  - [Start Development Server](#start-development-server)
  - [Open in Browser](#open-in-browser)
  - [Verify Rendering](#verify-rendering)
  - [Hot Module Reloading](#hot-module-reloading)
- [Troubleshooting](#troubleshooting)
  - [Issue: "Cannot find module '@syncfusion/ej2-vue-charts'"](#issue-cannot-find-module-syncfusionej2-vue-charts)
  - [Issue: Diagram not rendering (blank container)](#issue-diagram-not-rendering-blank-container)
  - [Issue: "Unknown custom element 'ejs-sankey'"](#issue-unknown-custom-element-ejs-sankey)
  - [Issue: Tooltips not showing](#issue-tooltips-not-showing)
  - [Issue: Performance slow with 100+ nodes](#issue-performance-slow-with-100-nodes)

## Installation & Package Setup

### Step 1: Install the Package

The Sankey Diagram is part of the Syncfusion Vuearts --save
```

### Step 2: Verify Dependencies

To use the Syncfusion Vue Sankey Diagram, install `@syncfusion/ej2-vue-charts` and keep all Syncfusion EJ2 packages in your project on a compatible version line. The official Vue getting-started guidance also requires adding the appropriate Syncfusion theme CSS files. 

### Step 3: Import CSS Theme

**Available themes:** Syncfusion lists built-in themes such as Material, Bootstrap, Fabric, Tailwind CSS, and Material 3 for Vue components, including Sankey support. 

- `material.css` 
- `bootstrap.css` 
- `fabric.css` 
- `tailwind.css` 
- `material3.css` 

## Module Registration

The Sankey Diagram supports built-in features such as legends, tooltips, labels, events, themes, and print/export. The official Vue Sankey sample explicitly injects `SankeyLegend` through `provide`. 

### Core Modules

Use the Sankey component and the node/link collection directives from `@syncfusion/ej2-vue-charts`. The official example uses `SankeyComponent`, `SankeyNodesCollectionDirective`, `SankeyNodeDirective`, `SankeyLinksCollectionDirective`, and `SankeyLinkDirective`. 

```javascript
import { provide } from 'vue';
import {
  SankeyComponent,
  SankeyNodesCollectionDirective,
  SankeyNodeDirective,
  SankeyLinksCollectionDirective,
  SankeyLinkDirective
} from '@syncfusion/ej2-vue-charts';

provide('sankey', []);
```

### Feature Modules (Optional)

If you need legend support, inject `SankeyLegend` as shown in the official Sankey example. For additional optional capabilities such as tooltip, labels, events, and print/export, use the corresponding Sankey documentation and API page for your installed version. 

```javascript
import { provide } from 'vue';
import { SankeyLegend } from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyLegend]);
```

**Module purposes:**
- **SankeyLegend**: Displays the legend and supports legend interaction. 
- **Tooltip support**: Displays details for nodes and links during pointer interaction. 
- **Label support**: Displays node labels and improves diagram readability. 
- **Print/export support**: Enables printing and exporting to formats such as PDF and image formats. 
- **Events support**: Enables interaction- and lifecycle-related handling from the Sankey component. 

## Component Import & Registration

### Vue 3 - Composition API (Recommended)

The official Syncfusion Sankey Vue example uses `<ejs-sankey>`, `<e-sankey-nodes>`, `<e-sankey-node>`, `<e-sankey-links>`, and `<e-sankey-link>`. The link attributes correspond to `sourceId`, `targetId`, and `value`, and in Vue templates these are used as `source-id`, `target-id`, and `value`. 

```vue
<template>
  <div class="app">
    <ejs-sankey
      id="sankey-chart"
      height="420px"
      title="Basic Sankey"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="A" :label="{ text: 'A' }" />
        <e-sankey-node id="B" :label="{ text: 'B' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="A" target-id="B" :value="100" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>
```

The official Syncfusion sample also demonstrates `nodeStyle`, `linkStyle`, node `label`, and link mapping through `source-id`, `target-id`, and `value`. 

### Vue 3 - Options API

The same Sankey structure applies in Vue 3 Options API, with explicit component registration under the `components` section. 

```vue
<template>
  <div class="app">
    <ejs-sankey
      id="sankey-chart"
      height="420px"
      title="Basic Sankey"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="A" :label="{ text: 'A' }" />
        <e-sankey-node id="B" :label="{ text: 'B' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="A" target-id="B" :value="100" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script>
import {
  SankeyComponent,
  SankeyNodesCollectionDirective,
  SankeyNodeDirective,
  SankeyLinksCollectionDirective,
  SankeyLinkDirective
} from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-sankey': SankeyComponent,
    'e-sankey-nodes': SankeyNodesCollectionDirective,
    'e-sankey-node': SankeyNodeDirective,
    'e-sankey-links': SankeyLinksCollectionDirective,
    'e-sankey-link': SankeyLinkDirective
  },
  data() {
    return {
      nodeStyle: {
        width: 30,
        padding: 10
      },
      linkStyle: {
        colorType: 'Source'
      }
    };
  }
};
</script>
```

This structure matches the official Sankey directive model used in the Syncfusion Vue example. 

### Vue 2 - Options API

Vue 2 uses the same Sankey directive tags, but `provide` should be declared as a function when you inject optional Sankey modules. 

```vue
<template>
  <div class="app">
    <ejs-sankey
      id="sankey-chart"
      height="420px"
      title="Basic Sankey"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="A" :label="{ text: 'A' }" />
        <e-sankey-node id="B" :label="{ text: 'B' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="A" target-id="B" :value="100" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script>
import {
  SankeyComponent,
  SankeyNodesCollectionDirective,
  SankeyNodeDirective,
  SankeyLinksCollectionDirective,
  SankeyLinkDirective,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';

export default {
  name: 'App',
  components: {
    'ejs-sankey': SankeyComponent,
    'e-sankey-nodes': SankeyNodesCollectionDirective,
    'e-sankey-node': SankeyNodeDirective,
    'e-sankey-links': SankeyLinksCollectionDirective,
    'e-sankey-link': SankeyLinkDirective
  },
  provide: function () {
    return {
      sankey: [SankeyLegend]
    };
  },
  data() {
    return {
      nodeStyle: {
        width: 30,
        padding: 10
      },
      linkStyle: {
        colorType: 'Source'
      }
    };
  }
};
</script>
```

This follows the same directive and injection approach shown in the official Sankey Vue example. 

## Basic Sankey Setup

### Minimal Example (3 nodes, 2 links)

A minimal Sankey Diagram requires nodes with unique `id` values and links with valid `source-id`, `target-id`, and `value` mappings. The official API description for Sankey links confirms that `sourceId`, `targetId`, and `value` define the source node, target node, and link weight. 

```vue
<template>
  <div>
    <ejs-sankey height="400px">
      <e-sankey-nodes>
        <e-sankey-node id="Node1" :label="{ text: 'Node1' }" />
        <e-sankey-node id="Node2" :label="{ text: 'Node2' }" />
        <e-sankey-node id="Node3" :label="{ text: 'Node3' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Node1" target-id="Node2" :value="50" />
        <e-sankey-link source-id="Node2" target-id="Node3" :value="40" />
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
} from '@syncfusion/ej2-vue-charts';
</script>
```

**What happens:**
1. Three Sankey nodes are rendered in the diagram. 
2. Two links connect the nodes using the configured source and target IDs. 
3. Link width is determined by the `value` assigned to each link. 
4. The Sankey Diagram supports flow-oriented visualization and can be displayed in horizontal or vertical orientation. 

## Data Binding with Collections

### Static Binding (Inline)

For static binding, define the nodes and links directly inside the Sankey directives using the official directive structure. 

```vue
<e-sankey-nodes>
  <e-sankey-node id="A" :label="{ text: 'A' }" />
  <e-sankey-node id="B" :label="{ text: 'B' }" />
</e-sankey-nodes>

<e-sankey-links>
  <e-sankey-link source-id="A" target-id="B" :value="100" />
</e-sankey-links>
```

### Dynamic Binding with v-for

For dynamic binding, keep the same directive structure and bind `id`, `label`, `source-id`, `target-id`, and `value` from reactive arrays. This matches the node and link configuration model shown in the Syncfusion Vue Sankey example. 

```vue
<template>
  <ejs-sankey :nodeStyle="nodeStyle" :linkStyle="linkStyle">
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
        v-for="(link, index) in links"
        :key="index"
        :source-id="link.sourceId"
        :target-id="link.targetId"
        :value="link.value"
      />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { ref } from 'vue';

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

const nodes = ref([
  { id: 'Energy Input', label: 'Energy Input' },
  { id: 'Power Plant', label: 'Power Plant' },
  { id: 'Consumer', label: 'Consumer' }
]);

const links = ref([
  { sourceId: 'Energy Input', targetId: 'Power Plant', value: 500 },
  { sourceId: 'Power Plant', targetId: 'Consumer', value: 450 }
]);
</script>
```

The essential requirement is that every link must map to existing node IDs through `sourceId` and `targetId`, with the link weight supplied through `value`. 

### JSON Data Example

When mapping external JSON into the Syncfusion Sankey format, create node objects with `id` and link objects with `sourceId`, `targetId`, and `value`. These are the properties used by the Sankey link model. 

```javascript
// Define data structure
const energyData = {
  nodes: [
    { id: 'Solar' },
    { id: 'Wind' },
    { id: 'Coal' },
    { id: 'Generation' },
    { id: 'Consumption' }
  ],
  links: [
    { source: 'Solar', target: 'Generation', weight: 300 },
    { source: 'Wind', target: 'Generation', weight: 200 },
    { source: 'Coal', target: 'Generation', weight: 500 },
    { source: 'Generation', target: 'Consumption', weight: 900 }
  ]
};

// Map to component format
const nodes = energyData.nodes.map((n) => ({
  id: n.id
}));

const links = energyData.links.map((l) => ({
  sourceId: l.source,
  targetId: l.target,
  value: l.weight
}));
```

## Vue 2 vs Vue 3 Patterns

### Import Differences

**Vue 3:** Use Composition API helpers such as `ref` and `provide`, and prefer a modern Vue 3 setup flow such as Vite for new projects. Syncfusion’s Vue 3 guidance explicitly recommends Vite for modern setup. 

```javascript
import { ref, provide } from 'vue';
```

**Vue 2:** Use the Options API and declare `provide` in the component options. 

```javascript
export default {
  provide: function () {
    return {
      sankey: []
    };
  }
};
```

### Directive Naming

**Vue 3:** The official Sankey example uses the directive names below. 

```vue
<ejs-sankey>
  <e-sankey-nodes>
    <e-sankey-node id="A" />
  </e-sankey-nodes>
</ejs-sankey>
```

**Vue 2:** The same directive naming pattern applies. 

```vue
<ejs-sankey>
  <e-sankey-nodes>
    <e-sankey-node id="A" />
  </e-sankey-nodes>
</ejs-sankey>
```

### Module Provide

**Vue 3:** Use `provide('sankey', [...])` to inject optional Sankey modules. This is the pattern shown in the official example. 

```javascript
provide('sankey', [SankeyLegend]);
```

**Vue 2:** Return the injected modules from `provide()`. 

```javascript
provide: function () {
  return {
    sankey: [SankeyLegend]
  };
}
```

## Running in Development

### Start Development Server

For Vue 3 projects created with Vite, run `npm run dev`. For Vue CLI-based projects, run `npm run serve`. Syncfusion’s Vue 3 guidance also highlights Vite as the recommended option for new projects. 

```bash
# Vue 3 (Vite)
npm run dev

# Vue 2 / Vue CLI
npm run serve
```

### Open in Browser

Open the local URL shown in your terminal after starting the development server. The exact address depends on your tooling and project configuration. 

### Verify Rendering

1. Open browser DevTools. 
2. Inspect the app container and verify that the Sankey Diagram has rendered without runtime errors. 
3. If optional features such as legend or tooltips are enabled, verify that the required modules and settings are configured. 

### Hot Module Reloading

When using the standard Vue development workflow, saving the component should trigger the dev server’s live update behavior. 

## Troubleshooting

### Issue: "Cannot find module '@syncfusion/ej2-vue-charts'"

**Solution:** Ensure the package is installed in the current project. Syncfusion Vue packages are distributed through npm, and the getting-started flow begins with package installation. 

```bash
npm install @syncfusion/ej2-vue-charts --save
npm install
```

### Issue: Diagram not rendering (blank container)

**Check:**
1. Modules provided? If you enabled optional features such as legends, inject the corresponding module through `provide`. The official Sankey sample shows this for `SankeyLegend`. 
2. Data exists? Verify that the node and link collections are not empty. A Sankey Diagram requires connected nodes and links. 
3. IDs unique? Every node `id` must be unique, and every link `source-id` / `target-id` must point to existing node IDs. 
4. Template syntax correct? Use `<e-sankey-nodes>`, `<e-sankey-links>`, `source-id`, and `target-id` in Vue templates. 

### Issue: "Unknown custom element 'ejs-sankey'"

**Vue 3 Composition API:** Import the Sankey component and directives in `<script setup>`. This is the same import model shown by the Syncfusion Sankey example. 

```javascript
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';
```

**Vue 2 / Vue 3 Options API:** Register the Sankey components explicitly in the `components` section. 

```javascript
components: {
  'ejs-sankey': SankeyComponent,
  'e-sankey-nodes': SankeyNodesCollectionDirective,
  'e-sankey-node': SankeyNodeDirective,
  'e-sankey-links': SankeyLinksCollectionDirective,
  'e-sankey-link': SankeyLinkDirective
}
```

### Issue: Tooltips not showing

**Solution:** Ensure tooltip support is enabled in your Sankey configuration and that the corresponding tooltip feature for your installed version is correctly configured. Syncfusion lists tooltip support as a built-in Sankey capability. 

### Issue: Performance slow with 100+ nodes

**Solutions:**
- Reduce visual complexity by limiting optional features such as extra labels, legends, and other interactive features when not required. Syncfusion lists these as supported Sankey capabilities. 
- Validate your node/link mapping carefully so that only required nodes and links are rendered. Sankey links depend on valid source and target node IDs. 
- Start from a minimal working Sankey configuration and add features incrementally. This aligns with the official sample structure and avoids unnecessary configuration complexity. 