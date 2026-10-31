# Labels and Tooltips

## Table of Contents

- [Label Configuration](#label-configuration)
  - [Global Label Settings](#global-label-settings)
  - [Label Positions](#label-positions)
- [Data Labels on Nodes](#data-labels-on-nodes)
  - [Enable Data Labels](#enable-data-labels)
  - [Label with Value Display](#label-with-value-display)
  - [Custom Label Formatting](#custom-label-formatting)
- [Tooltip Customization](#tooltip-customization)
  - [Enable Tooltips](#enable-tooltips)
  - [Tooltip Configuration Options](#tooltip-configuration-options)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Node Hover Tooltips](#node-hover-tooltips)
  - [Link Hover Tooltips](#link-hover-tooltips)
- [Template-Based Tooltips](#template-based-tooltips)
  - [HTML Template Tooltips](#html-template-tooltips)
  - [Dynamic Template with Vue](#dynamic-template-with-vue)
- [Accessible Label Patterns](#accessible-label-patterns)
  - [ARIA Labels](#aria-labels)
  - [Keyboard Navigation](#keyboard-navigation)
- [Edge Cases](#edge-cases)
  - [❌ Overlapping Labels](#-overlapping-labels)
  - [❌ Long Text Truncation](#-long-text-truncation)
  - [⚠️ Tooltip Delays](#️-tooltip-delays)
- [Performance Considerations](#performance-considerations)
  - [Large Dataset: Disable Labels](#large-dataset-disable-labels)
  - [Lazy Load Tooltips](#lazy-load-tooltips)
  - [Conditional Label Rendering](#conditional-label-rendering)

## Label Configuration

### Global Label Settings

**Analysis**  
- The documented Sankey label API supports `visible`, `color`, `fontFamily`, `fontSize`, `fontStyle`, `fontWeight`, and `padding`. The properties `position`, `smartLabelMode`, `angle`, `border`, and `margin` are not partglobal Sankey features such as labels and tooltips. 

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-label-settings"
    width="100%"
    height="420px"
    :labelSettings="labelSettings"
    :nodeStyle="nodeStyle"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="Solar" target-id="Grid" :value="500" />
      <e-sankey-link source-id="Wind" target-id="Grid" :value="300" />
    </e-sankey-links>
  </ejs-sankey>
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

const labelSettings = ref({
  visible: true,
  color: '#333333',
  fontSize: '12px',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  fontWeight: '400',
  fontStyle: 'normal',
  padding: 8
});

const nodeStyle = ref({
  width: 20,
  padding: 12
});
</script>
```

### Label Positions

**Analysis**  
- A Sankey label `position` API is not documented in the current Sankey label settings model. If you need more separation between the label and the node, use `labelSettings.padding` and `nodeStyle.padding` instead of `position: 'Top' | 'Bottom' | 'Middle'`.   
- If you need dynamic text changes, the documented event to intercept label content is `labelRendering`.   

**Corrected approach**

```vue
<template>
  <ejs-sankey
    id="sankey-label-spacing"
    width="100%"
    height="420px"
    :labelSettings="labelSettings"
    :nodeStyle="nodeStyle"
    @labelRendering="onLabelRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node id="Source" :label="{ text: 'Source node' }" />
      <e-sankey-node id="Process" :label="{ text: 'Process node' }" />
      <e-sankey-node id="Output" :label="{ text: 'Output node' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="Source" target-id="Process" :value="120" />
      <e-sankey-link source-id="Process" target-id="Output" :value="95" />
    </e-sankey-links>
  </ejs-sankey>
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

const labelSettings = ref({
  visible: true,
  color: '#1f2937',
  fontSize: '12px',
  padding: 10
});

const nodeStyle = ref({
  width: 24,
  padding: 16
});

const onLabelRendering = (args) => {
  if (args.text && args.text.length > 14) {
    args.text = `${args.text.slice(0, 14)}…`;
  }
};
</script>
```

## Data Labels on Nodes

### Enable Data Labels

**Analysis**  
- Your original snippet used `e-sankey-nodes-collection` / `e-sankey-links-collection`, but the documented Sankey directives are `<e-sankey-nodes>` and `<e-sankey-links>`.   
- Global label visibility belongs in `labelSettings.visible`, while the actual node text belongs to each node’s `label.text`. The node data-label model supports `text` and `padding` for the node label object.   
- `provide('sankey', [])` is unnecessary when you are not injecting legend/export/tooltip modules.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-enable-data-labels"
    height="400px"
    :labelSettings="labelSettings"
  >
    <e-sankey-nodes>
      <e-sankey-node id="A" :label="{ text: 'Node A' }" />
      <e-sankey-node id="B" :label="{ text: 'Node B' }" />
      <e-sankey-node id="C" :label="{ text: 'Node C' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
      <e-sankey-link source-id="B" target-id="C" :value="90" />
    </e-sankey-links>
  </ejs-sankey>
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

const labelSettings = ref({
  visible: true,
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '700',
  padding: 8
});
</script>
```

### Label with Value Display

**Analysis**  
- This pattern is valid when you place the display string in each node’s `label.text`. For node labels, the documented node data-label surface is text-oriented rather than a per-label `visible` switch.   
- Keep the root label styling global in `labelSettings` and the per-node value display inside `label.text`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-label-with-value"
    width="100%"
    height="420px"
    :labelSettings="labelSettings"
  >
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: `${node.name}\n${node.value}` }"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="450" />
      <e-sankey-link source-id="B" target-id="C" :value="400" />
    </e-sankey-links>
  </ejs-sankey>
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

const nodes = ref([
  { id: 'A', name: 'Input', value: 500 },
  { id: 'B', name: 'Process', value: 450 },
  { id: 'C', name: 'Output', value: 400 }
]);

const labelSettings = ref({
  visible: true,
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: '600',
  padding: 8
});
</script>
```

### Custom Label Formatting

**Analysis**  
- For advanced label mutation, use the documented `labelRendering` event instead of introducing unsupported label settings such as rotation or smart trim options that are not listed in the Sankey label settings API.   
- Individual nodes can still carry `label.text`, and you can override the final rendered text during `labelRendering`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-custom-label-formatting"
    width="100%"
    height="420px"
    :labelSettings="labelSettings"
    @labelRendering="onLabelRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in formattedNodes"
        :key="node.id"
        :id="node.id"
        :fill="node.color"
        :label="{ text: node.name }"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="1500" />
      <e-sankey-link source-id="B" target-id="C" :value="2500" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { computed, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([
  { id: 'A', name: 'Component A', value: 1500, unit: 'MB' },
  { id: 'B', name: 'Component B', value: 2500, unit: 'MB' },
  { id: 'C', name: 'Component C', value: 3000, unit: 'MB' }
]);

const formattedNodes = computed(() =>
  nodes.value.map((n) => ({
    ...n,
    color: n.value > 2500 ? '#E74C3C' : '#3498DB'
  }))
);

const labelSettings = ref({
  visible: true,
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '600',
  padding: 8
});

const onLabelRendering = (args) => {
  const match = nodes.value.find((item) => item.id === args?.node?.id);
  if (match) {
    args.text = `${match.name}\n${match.value.toLocaleString()} ${match.unit}`;
  }
};
</script>
```

## Tooltip Customization

### Enable Tooltips

**Analysis**  
- Sankey tooltips are enabled through the `tooltip` property, and the documented Sankey tooltip model is specific to Sankey, not generic chart-point placeholders like `${point.x}` / `${point.y}`. Official Sankey tooltip settings expose `nodeFormat`, `linkFormat`, `nodeTemplate`, and `linkTemplate`.   
- When you use tooltips in Sankey, inject `SankeyTooltip` in Vue through `provide('sankey', [SankeyTooltip])`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey id="sankey-enable-tooltips" :tooltip="tooltip">
    <e-sankey-nodes>
      <e-sankey-node id="A" :label="{ text: 'Node A' }" />
      <e-sankey-node id="B" :label="{ text: 'Node B' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const tooltip = ref({
  enable: true,
  nodeFormat: '$name : $value',
  linkFormat: '$start.name $start.value → $target.name $target.value'
});

provide('sankey', [SankeyTooltip]);
</script>
```

### Tooltip Configuration Options

**Analysis**  
- The Sankey tooltip settings officially document `enable`, `fill`, `opacity`, `textStyle`, `nodeFormat`, `linkFormat`, `enableAnimation`, `duration`, `fadeOutDuration`, and `fadeOutMode`.   
- The properties `shared`, `showDelay`, `hideDelay`, and a single generic `template` are not part of the Sankey tooltip settings model you should rely on here. For Sankey templates, use `nodeTemplate` and `linkTemplate`.   

**Correct Sankey tooltip object**

```js
const tooltip = {
  enable: true,
  fill: '#333333',
  opacity: 0.9,
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Segoe UI',
    size: '12px',
    fontWeight: '500'
  },
  nodeFormat: '$name : $value',
  linkFormat: '$start.name $start.value → $target.name $target.value',
  enableAnimation: true,
  duration: 300,
  fadeOutDuration: 800,
  fadeOutMode: 'Move'
};
```
### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `nodeFormat` and `linkFormat` properties by adding DateTime or number format specifiers to supported tooltip placeholders. This allows you to control how node and link values are displayed without using additional events.

A format specifier is applied by adding a colon (`:`) followed by the required format. Sankey tooltips support both `$placeholder` and `${placeholder}` syntax. When formatting is required, use the `${placeholder:format}` syntax.

For example:

```js
const tooltip = {
    enable: true,
    nodeFormat: '$name : ${value:n2}',
    linkFormat: '$start.name (${start.out:n2}) → ${target.name} (${target.in:n2}) : ${value:n2}'
}
```

In the above example, `$name` and `$start.name` display text values directly, while `${value:n2}`, `${start.out:n2}`, and `${target.in:n2}` display numeric values with two decimal places.

Sankey tooltip values can be displayed using either of the following syntaxes:

- `$start.name` or `${start.name}` - Displays the source node name.
- `$target.name` or `${target.name}` - Displays the target node name.
- `$value` or `${value}` - Displays the node or link value.

To apply formatting, use the `${placeholder:format}` syntax. For example, `${value:n2}` displays the value with two decimal places.

Inline formatting can be applied to the following tooltip placeholders:

- `$name` or `${name}` - Specifies the name or label of the hovered node.
- `$value`, `${value}`, or `${value:n2}` - Specifies the value of the hovered node or link.
- `$start.name` or `${start.name}` - Specifies the name of the source node in a link tooltip.
- `$start.value`, `${start.value}`, or `${start.value:n2}` - Specifies the value of the source node in a link tooltip.
- `$start.out`, `${start.out}`, or `${start.out:n2}` - Specifies the outgoing value from the source node in a link tooltip.
- `$target.name` or `${target.name}` - Specifies the name of the target node in a link tooltip.
- `$target.value`, `${target.value}`, or `${target.value:n2}` - Specifies the value of the target node in a link tooltip.
- `$target.in`, `${target.in}`, or `${target.in:n2}` - Specifies the incoming value to the target node in a link tooltip.

> **Important:** Sankey tooltip placeholders can be used in both `$placeholder` and `${placeholder}` formats, such as `$start.name` or `${start.name}`. However, when applying number formatting, the `${placeholder:format}` syntax must be used, such as `${value:n2}`, `${start.out:n2}`, and `${target.in:n2}`. Formatting is applied only when the resolved value supports the specified format. String placeholders such as `${name}`, `${start.name}`, and `${target.name}` are displayed as plain text and do not support number formatting.

The following number formats are supported:

- `n2` - Number with two decimal places.
- `n0` - Number without decimal places.
- `c2` - Currency format.
- `p1` - Percentage format.
- `e1` - Exponential notation.

If the specified format does not match the resolved value type, the original value is displayed.

### Node Hover Tooltips

**Analysis**  
- The Sankey tooltip already displays contextual information when users hover nodes or links, so a separate `nodeMouseMove` handler is not required just to show tooltips.   
- If you want additional node-hover behavior, the documented interaction event is `nodeEnter`, and tooltip content can be customized via `tooltipRendering`.   
- Using a custom `title` property on the node is not the documented Sankey tooltip path; use `nodeFormat`, `nodeTemplate`, or `tooltipRendering`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-node-hover-tooltips"
    :tooltip="tooltip"
    @nodeEnter="onNodeEnter"
    @tooltipRendering="onTooltipRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.id }"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
      <e-sankey-link source-id="B" target-id="C" :value="80" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([
  { id: 'A', description: 'This is Node A - the data source' },
  { id: 'B', description: 'This is Node B - the processing step' },
  { id: 'C', description: 'This is Node C - the final output' }
]);

const tooltip = ref({
  enable: true,
  nodeFormat: '$name : $value'
});

const onNodeEnter = (args) => {
  console.log('Hovered node:', args);
};

const onTooltipRendering = (args) => {
  if (args.node) {
    const match = nodes.value.find((n) => n.id === args.node.id);
    if (match) {
      args.text = `${match.id} — ${match.description}`;
    }
  }
};

provide('sankey', [SankeyTooltip]);
</script>
```

### Link Hover Tooltips

**Analysis**  
- For links, the built-in tooltip behavior is hover-driven, and the documented interaction event is `linkEnter`. Tooltip content is customizable through `linkFormat` or `tooltipRendering`.   
- A custom `title` field on the link is not the documented tooltip customization mechanism for Sankey.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-link-hover-tooltips"
    :tooltip="tooltip"
    @linkEnter="onLinkEnter"
    @tooltipRendering="onTooltipRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node id="A" :label="{ text: 'A' }" />
      <e-sankey-node id="B" :label="{ text: 'B' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const tooltip = ref({
  enable: true,
  linkFormat: '$start.name $start.value → $target.name $target.value'
});

const onLinkEnter = (args) => {
  console.log('Hovered link:', args);
};

const onTooltipRendering = (args) => {
  if (args.link) {
    args.text = `Flow: ${args.link.sourceId} → ${args.link.targetId} (${args.link.value})`;
  }
};

provide('sankey', [SankeyTooltip]);
</script>
```

## Template-Based Tooltips

### HTML Template Tooltips

**Analysis**  
- Sankey supports separate `nodeTemplate` and `linkTemplate`; a single shared `template` property is not the Sankey-specific API surface.   
- The tooltip docs explicitly distinguish node and link formatting/template behavior, so your original code should be split accordingly.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey id="sankey-html-template-tooltips" :tooltip="tooltip">
    <e-sankey-nodes>
      <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
      <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="Solar" target-id="Grid" :value="500" />
      <e-sankey-link source-id="Wind" target-id="Grid" :value="300" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const tooltip = ref({
  enable: true,
  nodeTemplate: (data) => `
    <div style="padding:8px 12px;background:#1a1a1a;border-radius:4px;">
      <p style="margin:0;color:#fff;font-weight:700;">${data?.name ?? 'Node'}</p>
      <p style="margin:4px 0 0;color:#FFC107;">Value: ${data?.value ?? 'N/A'}</p>
    </div>
  `,
  linkTemplate: (data) => `
    <div style="padding:8px 12px;background:#1a1a1a;border-radius:4px;">
      <p style="margin:0;color:#fff;font-weight:700;">${data?.start?.name ?? 'Source'} → ${data?.target?.name ?? 'Target'}</p>
      <p style="margin:4px 0 0;color:#90EE90;">Value: ${data?.value ?? 'N/A'}</p>
    </div>
  `
});

provide('sankey', [SankeyTooltip]);
</script>
```

### Dynamic Template with Vue

**Analysis**  
- If the tooltip markup needs runtime logic, use `nodeTemplate` / `linkTemplate` or `tooltipRendering`. That is the Sankey-specific path instead of a generic `template` string with chart-point placeholders.   
- The official Sankey tooltip render args expose `node`, `link`, and `text`, which is a good fit for per-hover dynamic text generation.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-dynamic-template"
    :tooltip="tooltip"
    @tooltipRendering="onTooltipRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in nodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.name }"
      />
      <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link
        v-for="(link, idx) in links"
        :key="idx"
        :source-id="link.from"
        :target-id="link.to"
        :value="link.flow"
      />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const nodes = ref([
  { id: 'A', name: 'Energy Source A', percentage: 45 },
  { id: 'B', name: 'Energy Source B', percentage: 55 }
]);

const links = ref([
  { from: 'A', to: 'Grid', flow: 450 },
  { from: 'B', to: 'Grid', flow: 550 }
]);

const tooltip = ref({
  enable: true,
  fill: 'rgba(0,0,0,0.8)',
  textStyle: {
    color: '#ffffff',
    size: '12px',
    fontWeight: '600'
  }
});

const onTooltipRendering = (args) => {
  if (args.node) {
    const item = nodes.value.find((n) => n.id === args.node.id);
    args.text = item
      ? `${item.name} — ${item.percentage}%`
      : `${args.node.id}`;
  }

  if (args.link) {
    args.text = `${args.link.sourceId} → ${args.link.targetId}: ${args.link.value}`;
  }
};

provide('sankey', [SankeyTooltip]);
</script>
```

## Accessible Label Patterns

### ARIA Labels

**Analysis**  
- The official Sankey component already advertises full keyboard accessibility and WAI-ARIA support, so your custom accessibility layer should complement the built-in behavior rather than try to replace it. 
- Container-level descriptive text (`role`, `aria-label`, `aria-labelledby`, `aria-describedby`) is a reliable enhancement pattern. Passing ad hoc accessibility props onto internal Sankey node directives is not the documented focus of the Sankey API.   

**Corrected Vue 3 SFC**

```vue
<template>
  <section
    class="sankey-wrapper"
    role="img"
    :aria-label="chartDescription"
  >
    <ejs-sankey id="sankey-accessible-aria">
      <e-sankey-nodes>
        <e-sankey-node
          v-for="node in nodes"
          :key="node.id"
          :id="node.id"
          :label="{ text: node.name }"
        />
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link source-id="A" target-id="C" :value="500" />
        <e-sankey-link source-id="B" target-id="C" :value="300" />
      </e-sankey-links>
    </ejs-sankey>
  </section>
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

const chartDescription = ref(
  'Energy flow diagram showing distribution from sources to consumers'
);

const nodes = ref([
  { id: 'A', name: 'Solar' },
  { id: 'B', name: 'Wind' },
  { id: 'C', name: 'Consumer' }
]);
</script>
```

### Keyboard Navigation

**Analysis**  
- The Sankey control already provides keyboard navigation support, including keyboard-operable legend highlighting and screen-reader support. Your custom `keydown` logic should therefore be an enhancement around the component, not a replacement for the built-in navigation model.   
- Tooltips and labels can still be enabled normally while your surrounding region provides instructions through accessible helper text.   

**Corrected Vue 3 SFC**

```vue
<template>
  <div class="accessible-sankey">
    <h2 id="sankey-title">{{ title }}</h2>
    <p id="sankey-description" class="description">{{ ariaDescription }}</p>

    <section
      role="region"
      aria-labelledby="sankey-title"
      aria-describedby="sankey-description sankey-help"
      tabindex="0"
      @keydown="onKeyDown"
    >
      <ejs-sankey
        id="sankey-keyboard"
        :labelSettings="labelSettings"
        :tooltip="tooltip"
      >
        <e-sankey-nodes>
          <e-sankey-node id="Solar" :label="{ text: 'Solar' }" />
          <e-sankey-node id="Wind" :label="{ text: 'Wind' }" />
          <e-sankey-node id="Grid" :label="{ text: 'Grid' }" />
        </e-sankey-nodes>

        <e-sankey-links>
          <e-sankey-link source-id="Solar" target-id="Grid" :value="500" />
          <e-sankey-link source-id="Wind" target-id="Grid" :value="300" />
        </e-sankey-links>
      </ejs-sankey>
    </section>

    <div id="sankey-help" class="keyboard-help" role="status" aria-live="polite">
      <p>Use the keyboard to move focus through the diagram and interact with supported elements.</p>
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
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const title = ref('Energy Flow Analysis');
const ariaDescription = ref('Sankey chart displaying energy distribution from renewable sources');

const labelSettings = ref({
  visible: true,
  fontSize: '12px'
});

const tooltip = ref({
  enable: true,
  nodeFormat: '$name : $value',
  linkFormat: '$start.name $start.value → $target.name $target.value'
});

const onKeyDown = (event) => {
  console.log('Wrapper keydown:', event.key);
};

provide('sankey', [SankeyTooltip]);
</script>

<style scoped>
.accessible-sankey {
  font-family: Arial, sans-serif;
  max-width: 800px;
}

.keyboard-help {
  margin-top: 16px;
  padding: 12px;
  background-color: #E8F5E9;
  border-radius: 4px;
  font-size: 14px;
  color: #2E7D32;
}
</style>
```

## Edge Cases

### ❌ Overlapping Labels

**Problem:** Labels overlap on crowded charts

```vue
<!-- WRONG: unsupported positioning-only strategy -->
<ejs-sankey :labelSettings="{ visible: true }">
  <!-- many nodes with labels -->
</ejs-sankey>
```

**Analysis**  
- The documented label settings API is intentionally small: visibility, typography, and padding. Unsupported properties such as `smartLabelMode` and `angle` should not be used for Sankey labels.   
- For crowded diagrams, the supported fixes are to hide labels globally, abbreviate them in `labelRendering`, and adjust `nodeStyle.padding` for spacing.   

**Solutions**

```vue
<!-- Solution 1: Hide labels globally -->
<ejs-sankey :labelSettings="{ visible: false }">
</ejs-sankey>

<!-- Solution 2: Keep labels visible, but increase spacing between nodes/labels -->
<ejs-sankey
  :labelSettings="{ visible: true, padding: 6 }"
  :nodeStyle="{ padding: 16 }"
>
</ejs-sankey>

<!-- Solution 3: Abbreviate labels in labelRendering -->
<ejs-sankey
  :labelSettings="{ visible: true }"
  @labelRendering="onLabelRendering"
>
</ejs-sankey>
```

```js
const onLabelRendering = (args) => {
  if (args.text && args.text.length > 10) {
    args.text = `${args.text.slice(0, 10)}…`;
  }
};
```

### ❌ Long Text Truncation

**Problem:** Node names are too long for the available space

```vue
<!-- WRONG: long raw node ID is not ideal for display -->
<e-sankey-node id="VeryLongDescriptiveNameThatHurtsReadability" />
```

**Analysis**  
- Use a compact node `id` for wiring and put the user-facing text in `label.text`. The node label model is built around a text payload plus padding.   
- If you need runtime shortening, use `labelRendering` to rewrite the final label text.   

**Solutions**

```vue
<!-- Solution 1: keep the node id compact and move readable text to label.text -->
<e-sankey-node id="VLN" :label="{ text: 'Very Long Name' }" />

<!-- Solution 2: manually break the label text -->
<e-sankey-node
  id="LongName"
  :label="{ text: 'Very Long\nDescriptive\nName' }"
/>

<!-- Solution 3: trim in labelRendering -->
<ejs-sankey @labelRendering="onLabelRendering">
</ejs-sankey>
```

```js
const onLabelRendering = (args) => {
  if (args.text && args.text.length > 18) {
    args.text = `${args.text.slice(0, 18)}…`;
  }
};
```

### ⚠️ Tooltip Delays

**Analysis**  
- Sankey tooltip timing is controlled through `duration` and `fadeOutDuration`; `showDelay` and `hideDelay` are not documented Sankey tooltip settings.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey id="sankey-tooltip-delays" :tooltip="tooltip">
    <e-sankey-nodes>
      <e-sankey-node id="A" :label="{ text: 'A' }" />
      <e-sankey-node id="B" :label="{ text: 'B' }" />
    </e-sankey-nodes>
    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const tooltip = ref({
  enable: true,
  duration: 300,
  fadeOutDuration: 150
});

provide('sankey', [SankeyTooltip]);
</script>
```

## Performance Considerations

### Large Dataset: Disable Labels

**Analysis**  
- Sankey is rendered as SVG, and the control supports labels and tooltips as separate visual layers. On large graphs, turning labels off while keeping tooltips on is the cleanest supported pattern to reduce clutter and improve readability.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-large-dataset"
    :labelSettings="{ visible: false }"
    :tooltip="{ enable: true, nodeFormat: '$name : $value', linkFormat: '$start.name $start.value → $target.name $target.value' }"
  >
    <!-- Large datasets: prefer tooltip-driven exploration -->
  </ejs-sankey>
</template>
```

### Lazy Load Tooltips

**Analysis**  
- The documented hook for runtime tooltip customization is `tooltipRendering`, whose event args expose `node`, `link`, and `text`. That makes it the right place to assemble tooltip content on demand.   
- A generic `tooltipInitialize` event is not the documented Sankey event surface; the published Sankey events list includes `tooltipRendering`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-lazy-tooltip"
    :tooltip="tooltip"
    @tooltipRendering="onTooltipRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node id="A" :label="{ text: 'A' }" />
      <e-sankey-node id="B" :label="{ text: 'B' }" />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  SankeyComponent as EjsSankey,
  SankeyNodesCollectionDirective as ESankeyNodes,
  SankeyNodeDirective as ESankeyNode,
  SankeyLinksCollectionDirective as ESankeyLinks,
  SankeyLinkDirective as ESankeyLink,
  SankeyTooltip
} from '@syncfusion/ej2-vue-charts';

const tooltip = ref({
  enable: true
});

const onTooltipRendering = async (args) => {
  if (args.node) {
    args.text = `Loading details for ${args.node.id}...`;
    await Promise.resolve();
    args.text = `Node ${args.node.id} — lazy content resolved`;
  }

  if (args.link) {
    args.text = `Loading flow ${args.link.sourceId} → ${args.link.targetId}...`;
    await Promise.resolve();
    args.text = `Flow ${args.link.sourceId} → ${args.link.targetId}: ${args.link.value}`;
  }
};

provide('sankey', [SankeyTooltip]);
</script>
```

### Conditional Label Rendering

**Analysis**  
- The node label object does not document a per-label `visible` flag. If you want conditional visibility, keep global labels enabled and blank out or rewrite `args.text` in `labelRendering`.   

**Corrected Vue 3 SFC**

```vue
<template>
  <ejs-sankey
    id="sankey-conditional-labels"
    :labelSettings="labelSettings"
    @labelRendering="onLabelRendering"
  >
    <e-sankey-nodes>
      <e-sankey-node
        v-for="node in allNodes"
        :key="node.id"
        :id="node.id"
        :label="{ text: node.name }"
      />
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link source-id="A" target-id="B" :value="100" />
    </e-sankey-links>
  </ejs-sankey>
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

const zoomLevel = ref(1);

const allNodes = ref([
  { id: 'A', name: 'Node A' },
  { id: 'B', name: 'Node B' }
]);

const labelSettings = ref({
  visible: true,
  fontSize: '12px'
});

const onLabelRendering = (args) => {
  if (zoomLevel.value <= 0.8) {
    args.text = '';
  }
};
</script>
```