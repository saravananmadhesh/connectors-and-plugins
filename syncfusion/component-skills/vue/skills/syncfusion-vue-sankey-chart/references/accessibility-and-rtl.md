# Accessibility and RTL Support

## Table of Contents
- [WCAG Compliance Patterns](#wcag-compliance-patterns)
  - [WCAG 2.2 AA-Oriented Compliance](#wcag-22-aa-oriented-compliance)
  - [Testing Against WCAG Checklist](#testing-against-wcag-checklist)
- [Keyboard Navigation](#keyboard-navigation)
  - [Keyboard Navigation Guidance](#keyboard-navigation-guidance)
  - [Focus Indicators](#focus-indicators)
- [ARIA Attributes and Roles](#aria-attributes-and-roles)
  - [Semantic ARIA Labels](#semantic-aria-labels)
  - [ARIA Live Regions](#aria-live-regions)
  - [ARIA Labels for Dynamic Content](#aria-labels-for-dynamic-content)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Announcements](#screen-reader-announcements)
- [RTL Layout Patterns](#rtl-layout-patterns)
  - [Enable RTL Support](#enable-rtl-support)
  - [RTL with Arabic Labels](#rtl-with-arabic-labels)
  - [RTL with Hebrew](#rtl-with-hebrew)
- [Color Contrast Requirements](#color-contrast-requirements)
  - [WCAG AA Contrast (4.5:1 for Normal Text)](#wcag-aa-contrast-451-for-normal-text)
  - [Test Color Contrast](#test-color-contrast)
- [Focus Management](#focus-management)
  - [Managing Focus in Complex Charts](#managing-focus-in-complex-charts)
- [Testing Accessibility](#testing-accessibility)
  - [Automated Testing Tools](#automated-testing-tools)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Screen Reader Testing](#screen-reader-testing)

## WCAG Compliance Patterns

### WCAG 2.2 AA-Oriented Compliance

Syncfusion’s Vue components are documented with accessibility support aligned to **WCAG 2.2**, **WAI-ARIA**, **keyboard navigation**, and related accessibility standards, and the Sankey component

```vue
<template>
  <section
    class="sankey-section"
    role="region"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
  >
    <h2 :id="titleId">{{ title }}</h2>
    <p :id="descriptionId">{{ description }}</p>

    <ejs-sankey
      id="accessible-sankey"
      height="420px"
      title="Energy Flow System"
      :tooltip="tooltip"
      :labelSettings="labelSettings"
      :legendSettings="legendSettings"
      :enableRtl="false"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
      aria-roledescription="Sankey diagram"
      :aria-label="chartAriaLabel"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
        <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
        <e-sankey-node id="Coal" :label="{ text: 'Coal' }" />
        <e-sankey-node id="Generation" :label="{ text: 'Generation' }" />
        <e-sankey-node id="Consumption" :label="{ text: 'Consumption' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Solar" target-id="Generation" :value="300" />
        <e-sankey-link source-id="Wind" target-id="Generation" :value="200" />
        <e-sankey-link source-id="Coal" target-id="Generation" :value="500" />
        <e-sankey-link source-id="Generation" target-id="Consumption" :value="900" />
      </e-sankey-links>
    </ejs-sankey>
  </section>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';

const titleId = 'sankey-title';
const descriptionId = 'sankey-description';

const title = ref('Energy Flow System');
const description = ref(
  'Sankey diagram showing energy distribution from sources to generation and consumption.'
);

const chartAriaLabel = ref(
  'Energy flow Sankey diagram with sources Solar, Wind, and Coal flowing into Generation and then to Consumption.'
);

const labelSettings = ref({
  visible: true,
  font: {
    size: '14px',
    color: '#111111'
  }
});

const tooltip = ref({
  enable: true
});

const legendSettings = ref({
  visible: true,
  position: 'Bottom'
});

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

provide('sankey', [SankeyLegend]);
</script>

<style scoped>
.sankey-section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1f2937;
  background: #ffffff;
}

h2 {
  font-size: 24px;
  margin: 0 0 12px 0;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 20px 0;
}
</style>
```

### Testing Against WCAG Checklist

Use accessibility testing to validate semantics, contrast, keyboard access, ARIA naming, and screen-reader behavior. Syncfusion’s Vue accessibility guidance explicitly references WCAG, WAI-ARIA, and keyboard navigation, and also recommends an accessibility-focused implementation approach. 

```javascript
const wcagChecklist = {
  '1.3.1 Info and Relationships': {
    requirement: 'Semantic structure preserved',
    implementation: 'Use headings, region landmarks, and descriptive labels',
    test: 'Validate with axe DevTools or Lighthouse'
  },
  '1.4.3 Contrast (Minimum)': {
    requirement: 'Text contrast >= 4.5:1',
    implementation: 'Use accessible label and surrounding text colors',
    test: 'WebAIM Contrast Checker'
  },
  '1.4.11 Non-text Contrast': {
    requirement: 'Visual components contrast >= 3:1',
    implementation: 'Ensure labels, focus states, and key visuals remain distinguishable',
    test: 'Manual visual inspection'
  },
  '2.1.1 Keyboard': {
    requirement: 'All important functions keyboard accessible',
    implementation: 'Rely on built-in Syncfusion keyboard support and visible focus states',
    test: 'Keyboard-only testing'
  },
  '4.1.2 Name, Role, Value': {
    requirement: 'Accessible names and roles exposed',
    implementation: 'Use aria-label, aria-labelledby, and aria-describedby on surrounding structure',
    test: 'Screen reader verification'
  }
};
```

## Keyboard Navigation

### Keyboard Navigation Guidance

Syncfusion documents keyboard navigation support at the Vue component level, and the Sankey documentation also states that Sankey elements are keyboard accessible. For that reason, avoid overriding native `Tab` behavior unless you are intentionally adding **app-level shortcuts** around the chart rather than replacing the component’s own navigation model. 

```vue
<template>
  <div class="accessible-chart">
    <div class="keyboard-help" role="note" aria-label="Keyboard help">
      <p><strong>Keyboard guidance:</strong></p>
      <ul>
        <li>Tab and Shift+Tab: move between page controls and the chart region.</li>
        <li>Use the component's built-in keyboard support once the chart receives focus.</li>
        <li>Provide a visible heading and description so assistive technology users understand the chart purpose.</li>
      </ul>
    </div>

    <div
      class="chart-frame"
      tabindex="0"
      role="group"
      aria-labelledby="kbd-title"
      aria-describedby="kbd-desc"
      @focus="onFrameFocus"
      @blur="onFrameBlur"
    >
      <h3 id="kbd-title" class="sr-only">Keyboard accessible Sankey diagram</h3>
      <p id="kbd-desc" class="sr-only">
        Focus enters the chart region here. The Sankey component provides keyboard-accessible behavior.
      </p>

      <ejs-sankey
        height="420px"
        title="Keyboard Accessible Sankey"
        :tooltip="tooltip"
        :nodeStyle="nodeStyle"
        :linkStyle="linkStyle"
      >
        <e-sankey-nodes>
          <e-sankey-node id="Input" :label="{ text: 'Input' }" />
          <e-sankey-node id="Process" :label="{ text: 'Process' }" />
          <e-sankey-node id="Output" :label="{ text: 'Output' }" />
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link source-id="Input" target-id="Process" :value="100" />
          <e-sankey-link source-id="Process" target-id="Output" :value="80" />
        </e-sankey-links>
      </ejs-sankey>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const frameFocused = ref(false);

const tooltip = ref({
  enable: true
});

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

function onFrameFocus() {
  frameFocused.value = true;
}

function onFrameBlur() {
  frameFocused.value = false;
}
</script>

<style scoped>
.keyboard-help {
  background-color: #e8f1ff;
  border: 1px solid #2563eb;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.keyboard-help p {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #1d4ed8;
}

.keyboard-help ul {
  margin: 0;
  padding-left: 20px;
}

.chart-frame {
  border-radius: 8px;
}

.chart-frame:focus {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### Focus Indicators

Syncfusion’s Sankey API surface includes focus-border customization, and Syncfusion’s general accessibility guidance emphasizes keyboard usage and visible focus behavior. If you do not use the built-in focus border settings, add a strong wrapper focus outline around the chart region. 

```vue
<template>
  <div class="accessible-chart">
    <div class="keyboard-help" role="note" aria-label="Keyboard help">
      <p><strong>Keyboard guidance:</strong></p>
      <ul>
        <li>Tab and Shift+Tab: move between page controls and the chart region.</li>
        <li>Use the component's built-in keyboard support once the chart receives focus.</li>
        <li>Provide a visible heading and description so assistive technology users understand the chart purpose.</li>
      </ul>
    </div>

    <div
      class="chart-frame"
      tabindex="0"
      role="group"
      aria-labelledby="kbd-title"
      aria-describedby="kbd-desc"
      @focus="onFrameFocus"
      @blur="onFrameBlur"
    >
      <h3 id="kbd-title" class="sr-only">Keyboard accessible Sankey diagram</h3>
      <p id="kbd-desc" class="sr-only">
        Focus enters the chart region here. The Sankey component provides keyboard-accessible behavior.
      </p>

      <ejs-sankey
        height="420px"
        title="Keyboard Accessible Sankey"
        :tooltip="tooltip"
        :nodeStyle="nodeStyle"
        :linkStyle="linkStyle"
      >
        <e-sankey-nodes>
          <e-sankey-node id="Input" :label="{ text: 'Input' }" />
          <e-sankey-node id="Process" :label="{ text: 'Process' }" />
          <e-sankey-node id="Output" :label="{ text: 'Output' }" />
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link source-id="Input" target-id="Process" :value="100" />
          <e-sankey-link source-id="Process" target-id="Output" :value="80" />
        </e-sankey-links>
      </ejs-sankey>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';

provide('sankey', [SankeyTooltip, SankeyLegend]);
const frameFocused = ref(false);

const tooltip = ref({
  enable: true
});

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

function onFrameFocus() {
  frameFocused.value = true;
}

function onFrameBlur() {
  frameFocused.value = false;
}
</script>

<style scoped>
.keyboard-help {
  background-color: #e8f1ff;
  border: 1px solid #2563eb;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.keyboard-help p {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #1d4ed8;
}

.keyboard-help ul {
  margin: 0;
  padding-left: 20px;
}

.chart-frame {
  border-radius: 8px;
}

.chart-frame:focus {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## ARIA Attributes and Roles

### Semantic ARIA Labels

Use semantic wrapper markup (`region`, `aria-labelledby`, `aria-describedby`) to describe the chart’s purpose. Syncfusion’s accessibility guidance highlights WAI-ARIA support, and the Sankey documentation confirms screen-reader accessibility and complete WAI-ARIA support for the component. 

```vue
<template>
  <div
    role="region"
    aria-labelledby="chart-title"
    aria-describedby="chart-description"
  >
    <h2 id="chart-title">Energy flow data visualization</h2>
    <p id="chart-description">
      This Sankey diagram displays energy flow from Solar, Wind, and Coal into Generation,
      and then into Consumption. Link thickness represents the magnitude of flow.
    </p>

    <ejs-sankey
      height="420px"
      title="Energy Flow"
      aria-roledescription="Sankey diagram"
      :aria-label="chartAriaLabel"
      :tooltip="tooltip"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
        <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
        <e-sankey-node id="Coal" :label="{ text: 'Coal' }" />
        <e-sankey-node id="Generation" :label="{ text: 'Generation' }" />
        <e-sankey-node id="Consumption" :label="{ text: 'Consumption' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Solar" target-id="Generation" :value="300" />
        <e-sankey-link source-id="Wind" target-id="Generation" :value="200" />
        <e-sankey-link source-id="Coal" target-id="Generation" :value="500" />
        <e-sankey-link source-id="Generation" target-id="Consumption" :value="900" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const chartAriaLabel = ref(
  'Energy flow Sankey diagram with five nodes and four weighted links.'
);

const tooltip = ref({
  enable: true
});

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>
```

### ARIA Live Regions

Use an off-screen live region for **application-level announcements** such as language switches, dataset changes, or external filter changes. This is a reliable accessibility pattern and avoids depending on undocumented custom DOM hooks. Syncfusion’s accessibility guidance emphasizes assistive technology compatibility and screen-reader support. 

```vue
<template>
  <div>
    <div
      class="announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ announcement }}
    </div>

    <div class="toolbar">
      <button type="button" @click="useEnergyDataset">Load Energy Dataset</button>
      <button type="button" @click="useWaterDataset">Load Water Dataset</button>
    </div>

    <ejs-sankey
      height="420px"
      :title="chartTitle"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
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
          :key="idx"
          :source-id="link.sourceId"
          :target-id="link.targetId"
          :value="link.value"
        />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const chartTitle = ref('Energy Flow');
const announcement = ref('Chart loaded. Use surrounding page controls to update the diagram.');

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

const energyNodes = [
  { id: 'Solar', label: 'Solar' },
  { id: 'Wind', label: 'Wind' },
  { id: 'Grid', label: 'Grid' }
];

const energyLinks = [
  { sourceId: 'Solar', targetId: 'Grid', value: 300 },
  { sourceId: 'Wind', targetId: 'Grid', value: 200 }
];

const waterNodes = [
  { id: 'Source', label: 'Source' },
  { id: 'Treatment', label: 'Treatment' },
  { id: 'Distribution', label: 'Distribution' }
];

const waterLinks = [
  { sourceId: 'Source', targetId: 'Treatment', value: 500 },
  { sourceId: 'Treatment', targetId: 'Distribution', value: 450 }
];

const nodes = ref(energyNodes);
const links = ref(energyLinks);

function useEnergyDataset() {
  chartTitle.value = 'Energy Flow';
  nodes.value = energyNodes;
  links.value = energyLinks;
  announcement.value = 'Energy dataset loaded into the Sankey diagram.';
}

function useWaterDataset() {
  chartTitle.value = 'Water Flow';
  nodes.value = waterNodes;
  links.value = waterLinks;
  announcement.value = 'Water dataset loaded into the Sankey diagram.';
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.announcer {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
```

### ARIA Labels for Dynamic Content

In Syncfusion Sankey, the most reliable pattern is to provide a **chart-level accessible label** plus a **textual summary** of nodes and links next to or ahead of the chart, instead of assuming that individual directive tags expose arbitrary `aria-*` attributes. Syncfusion explicitly documents WAI-ARIA support and screen-reader compatibility at the component level. 

```vue
<template>
  <section
    role="region"
    aria-labelledby="dynamic-chart-title"
    aria-describedby="dynamic-chart-summary"
  >
    <h2 id="dynamic-chart-title">Dynamic Sankey Accessibility</h2>

    <p id="dynamic-chart-summary">
      This Sankey diagram contains {{ nodes.length }} nodes and {{ links.length }} links.
    </p>

    <ul class="sr-only">
      <li v-for="node in nodes" :key="node.id">
        Node {{ node.label }} with value {{ node.value }} in category {{ node.category }}.
      </li>
      <li v-for="(link, idx) in links" :key="`link-${idx}`">
        Link from {{ link.sourceId }} to {{ link.targetId }} with value {{ link.value }}.
      </li>
    </ul>

    <ejs-sankey
      height="420px"
      aria-roledescription="Sankey diagram"
      :aria-label="`Sankey diagram with ${nodes.length} nodes and ${links.length} links`"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
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
          :key="idx"
          :source-id="link.sourceId"
          :target-id="link.targetId"
          :value="link.value"
        />
      </e-sankey-links>
    </ejs-sankey>
  </section>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const nodes = ref([
  { id: 'A', label: 'Input A', value: 500, category: 'source' },
  { id: 'B', label: 'Process', value: 450, category: 'process' },
  { id: 'C', label: 'Output', value: 400, category: 'target' }
]);

const links = ref([
  { sourceId: 'A', targetId: 'B', value: 450 },
  { sourceId: 'B', targetId: 'C', value: 400 }
]);

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## Screen Reader Support

### Screen Reader Announcements

Syncfusion states that Sankey provides screen-reader support and WAI-ARIA accessibility. A practical implementation pattern is to pair the visual chart with an off-screen **data summary** that exposes the same information in a screen-reader-friendly sequence. 

```vue
<template>
  <div class="sr-wrapper">
    <div class="sr-only">
      <h2>Sankey Diagram Data Summary</h2>
      <p>{{ srSummary }}</p>
      <ul>
        <li v-for="node in nodes" :key="node.id">
          {{ node.label }}: {{ node.value }}
        </li>
      </ul>
    </div>

    <ejs-sankey
      height="420px"
      aria-roledescription="Sankey diagram"
      :aria-label="chartAriaLabel"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
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
          source-id="A"
          target-id="C"
          :value="500"
        />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref, computed } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);
const nodes = ref([
  { id: 'A', label: 'Solar', value: 300 },
  { id: 'B', label: 'Wind', value: 200 },
  { id: 'C', label: 'Grid', value: 500 }
]);

const srSummary = computed(() =>
  `This diagram shows ${nodes.value.length} nodes. Solar has value 300, Wind has value 200, and Grid has value 500.`
);

const chartAriaLabel = computed(() =>
  'Interactive Sankey diagram displaying energy distribution between source and destination nodes.'
);

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-wrapper {
  position: relative;
}
</style>
```

## RTL Layout Patterns

### Enable RTL Support

Syncfusion Vue components support RTL by setting the **`enableRtl`** property to `true`, and the Sankey documentation also explicitly calls out RTL support as part of the component’s capabilities. 

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <button type="button" @click="toggleRTL">
      {{ isRTL ? 'Switch to LTR' : 'Switch to RTL' }}
    </button>

    <ejs-sankey
      height="500px"
      :enableRtl="isRTL"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
      title="RTL Demo"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Source" :label="{ text: 'Source' }" />
        <e-sankey-node id="Target" :label="{ text: 'Target' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Source" target-id="Target" :value="100" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const isRTL = ref(false);

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

function toggleRTL() {
  isRTL.value = !isRTL.value;
}
</script>
```

### RTL with Arabic Labels

For Arabic or other RTL languages, use `dir="rtl"` on the surrounding container and set `:enableRtl="true"` on the Sankey component. Syncfusion’s Vue RTL guidance documents the `enableRtl` pattern, and Sankey documentation confirms RTL support. 

```vue
<template>
  <div :dir="language === 'ar' ? 'rtl' : 'ltr'" :lang="language">
    <div class="toolbar">
      <button type="button" @click="setLanguage('en')">English</button>
      <button type="button" @click="setLanguage('ar')">العربية</button>
    </div>

    <ejs-sankey
      height="500px"
      :enableRtl="language === 'ar'"
      :title="getTitle()"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Solar" :label="{ text: getNodeLabel('solar') }" />
        <e-sankey-node id="Wind" :label="{ text: getNodeLabel('wind') }" />
        <e-sankey-node id="Grid" :label="{ text: getNodeLabel('grid') }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Solar" target-id="Grid" :value="300" />
        <e-sankey-link source-id="Wind" target-id="Grid" :value="200" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const language = ref('en');

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

const translations = {
  en: {
    title: 'Energy Flow System',
    solar: 'Solar Energy',
    wind: 'Wind Energy',
    grid: 'Distribution Grid'
  },
  ar: {
    title: 'نظام تدفق الطاقة',
    solar: 'الطاقة الشمسية',
    wind: 'طاقة الرياح',
    grid: 'شبكة التوزيع'
  }
};

function getTitle() {
  return translations[language.value]?.title || translations.en.title;
}

function getNodeLabel(key) {
  return translations[language.value]?.[key] || translations.en[key];
}

function setLanguage(lang) {
  language.value = lang;
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
```

### RTL with Hebrew

RTL support also applies to Hebrew and similar languages by combining a surrounding RTL direction with `enableRtl`. Syncfusion’s common Vue RTL guidance documents this support pattern. 

```vue
<template>
  <div dir="rtl" lang="he">
    <ejs-sankey
      height="500px"
      :enableRtl="true"
      title="תרשים זרימת אנרגיה"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Solar" :label="{ text: 'אנרגיה סולארית' }" />
        <e-sankey-node id="Grid" :label="{ text: 'רשת חלוקה' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Solar" target-id="Grid" :value="300" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>
```

## Color Contrast Requirements

### WCAG AA Contrast (4.5:1 for Normal Text)

Syncfusion accessibility guidance emphasizes readable contrast and high-contrast support, so make sure surrounding text, labels, focus states, and any supporting UI meet WCAG contrast expectations. Because Sankey styling is component-driven, validate your chosen node/link/label theme colors using a contrast checker rather than assuming a specific palette is compliant. 

```vue
<template>
  <div class="contrast-demo">
    <h2>Accessible Contrast Example</h2>
    <p class="contrast-note">
      Use high-contrast surrounding text and verify your final Sankey theme colors with a contrast checker.
    </p>

    <ejs-sankey
      height="420px"
      :labelSettings="labelSettings"
      :nodeStyle="nodeStyle"
      :linkStyle="linkStyle"
      title="Contrast-Friendly Sankey"
    >
      <e-sankey-nodes>
        <e-sankey-node id="Good" :label="{ text: 'WCAG AA' }" />
        <e-sankey-node id="Adequate" :label="{ text: 'Adequate Contrast' }" />
        <e-sankey-node id="Output" :label="{ text: 'Output' }" />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="Good" target-id="Adequate" :value="80" />
        <e-sankey-link source-id="Adequate" target-id="Output" :value="60" />
      </e-sankey-links>
    </ejs-sankey>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const labelSettings = ref({
  visible: true,
  font: {
    size: '14px',
    color: '#111111'
  }
});

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});
</script>

<style scoped>
.contrast-demo {
  background: #ffffff;
  color: #111111;
  padding: 20px;
}

.contrast-note {
  color: #1f2937;
}
</style>
```

### Test Color Contrast

Use a contrast-checking tool to validate your final label and UI colors, especially when using custom themes or branded color palettes. Syncfusion’s accessibility documentation highlights readable contrast and high-contrast support as important accessibility considerations. 

```javascript
const contrastExamples = {
  good: {
    foreground: '#000000',
    background: '#FFFFFF',
    ratio: 21,
    wcag: 'AAA'
  },
  adequate: {
    foreground: '#333333',
    background: '#F0F0F0',
    ratio: 7.6,
    wcag: 'AA'
  },
  inadequate: {
    foreground: '#CCCCCC',
    background: '#FFFFFF',
    ratio: 1.3,
    wcag: 'FAIL'
  }
};
```

## Focus Management

### Managing Focus in Complex Charts

A robust pattern is to manage focus on a wrapper element that contains the Sankey component, while preserving the component’s own keyboard-accessible behavior. Syncfusion’s accessibility guidance emphasizes keyboard support, and the EJ2 Sankey API surface also includes focus-border configuration options. 

```vue
<template>
  <div class="focus-managed-chart">
    <button type="button" @click="focusChartRegion">Focus Chart Region</button>

    <div
      ref="chartRegion"
      class="chart-region"
      tabindex="0"
      role="region"
      aria-label="Focusable Sankey chart region"
      @focus="onChartFocus"
      @blur="onChartBlur"
    >
      <ejs-sankey
        height="420px"
        title="Focus Managed Sankey"
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

    <button type="button" ref="afterChartButton">Move Focus Out</button>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip,
  SankeyLegend
} from '@syncfusion/ej2-vue-charts';
provide('sankey', [SankeyTooltip, SankeyLegend]);

const chartRegion = ref(null);
const afterChartButton = ref(null);
const focusState = ref(null);

const nodeStyle = ref({
  width: 30,
  padding: 10
});

const linkStyle = ref({
  colorType: 'Source'
});

function focusChartRegion() {
  chartRegion.value?.focus?.();
}

function onChartFocus() {
  focusState.value = 'chart';
}

function onChartBlur() {
  focusState.value = null;
}
</script>

<style scoped>
.focus-managed-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-region {
  border-radius: 8px;
}

.chart-region:focus {
  outline: 3px solid #1976d2;
  outline-offset: 3px;
}

button {
  padding: 8px 16px;
  border: 1px solid #cccccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:focus {
  outline: 3px solid #1976d2;
  outline-offset: 2px;
}
</style>
```

## Testing Accessibility

### Automated Testing Tools

For Vue projects, prefer Vue-focused testing libraries instead of JSX/React-based render examples. Pair Vue Testing Library with `axe-core` (or an equivalent adapter) to check for common accessibility violations. Syncfusion’s accessibility documentation explicitly mentions both standards-based accessibility support and testing/validation as part of the accessibility story. 

```javascript
// Example test stack for Vue projects:
// npm install --save-dev @testing-library/vue axe-core vitest

import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import AccessibleSankey from './AccessibleSankey.vue';

expect.extend(toHaveNoViolations);

describe('Accessible Sankey', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(AccessibleSankey);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

Keyboard access, visible focus, screen-reader announcements, readable contrast, and responsive behavior should all be validated manually in addition to automated checks. Syncfusion’s accessibility documentation highlights keyboard navigation, screen-reader support, contrast considerations, and responsive usability as important accessibility areas. 

```javascript
const manualTestingChecklist = {
  'Keyboard Navigation': [
    'Tab key reaches the chart region and surrounding controls',
    'Shift+Tab moves backward correctly',
    'Visible focus is always present',
    'The chart remains understandable when used without a mouse'
  ],
  'Screen Reader': [
    'Chart purpose is announced clearly',
    'Summary text describes nodes and flows',
    'No redundant or confusing announcements occur',
    'Dataset or language changes are announced through a live region'
  ],
  'Visual': [
    'Text contrast meets 4.5:1 for AA',
    'Focus indicators are visible',
    'Important meaning is not conveyed by color alone',
    'Content remains usable at 200% zoom'
  ],
  'Responsive': [
    'Works on narrow viewports',
    'Controls remain reachable',
    'No inaccessible overflow is introduced',
    'RTL layout remains readable for supported languages'
  ]
};
```

### Screen Reader Testing

Test with at least one screen reader on each major platform you support. Syncfusion documents screen-reader compatibility and accessibility support for Vue components, so the final app should be verified in real assistive technology environments rather than relying only on static audits. 

```javascript
const screenReaders = {
  NVDA: 'Windows (free/open-source)',
  JAWS: 'Windows (commercial)',
  VoiceOver: 'macOS and iOS (built-in)',
  TalkBack: 'Android (built-in)'
};

// Suggested workflow:
// 1. Enable a screen reader.
// 2. Move through headings, controls, and the chart region.
// 3. Confirm the chart purpose and summary are announced.
// 4. Trigger dataset or language changes and verify live-region announcements.
// 5. Re-test in RTL mode if Arabic, Hebrew, or similar support is required.
```