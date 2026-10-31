# Getting Started with Accordion

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Setup](#basic-setup)
- [Initialization Methods](#initialization-methods)
- [Minimal Working Example](#minimal-working-example)
- [Item Configuration](#item-configuration)
- [Tracking Expanded Items with expandedIndices](#tracking-expanded-items-with-expandedindices)
- [Customizing Headers with headerTemplate](#customizing-headers-with-headertemplate)
- [Customizing Appearance](#customizing-appearance)

## Installation

Install the Syncfusion Vue navigations package using npm:

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This package includes the Accordion component and its dependencies:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-vue-base` - Vue bindings
- `@syncfusion/ej2-navigations` - Navigation components
- `@syncfusion/ej2-buttons` - Button component (used by headers)
- `@syncfusion/ej2-popups` - Popup utilities

## CSS Imports

Add component styles to your application. Choose the theme that matches your design:

```vue
<!-- In your App.vue or main component -->
<script setup>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/accordion/index.css";
</script>
```

**Available Themes:**
- `tailwind3.css` - Modern Tailwind design
- `bootstrap5.3.css` - Bootstrap 5.3 styling
- `fluent2.css` - Microsoft Fluent 2 design
- `material3.css` - Material Design 3

## Basic Setup

Import the Accordion component and required directives:

```vue
<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

These three components work together:
- `AccordionComponent` - Main container
- `AccordionItemsDirective` - Wrapper for items
- `AccordionItemDirective` - Individual collapsible panels

## Initialization Methods

### Method 1: Using Items API (Recommended)

Declare accordion items using component directives:

```vue
<template>
  <div>
    <ejs-accordion>
      <e-accordion-items>
        <e-accordion-item header="ASP.NET" :content="aspContent" />
        <e-accordion-item header="ASP.NET MVC" :content="mvcContent" />
        <e-accordion-item header="JavaScript" :content="jsContent" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';
import '@syncfusion/ej2-popups/styles/tailwind3.css';
import '@syncfusion/ej2-vue-navigations/styles/tailwind3.css';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const aspContent = '<div>Microsoft ASP.NET is a set of technologies for building Web applications.</div>';
const mvcContent = '<div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components.</div>';
const jsContent = '<div>JavaScript (JS) is an interpreted computer programming language.</div>';
</script>
```

**Benefits:** Clear component structure, easy to manage state, preferred for Vue applications

### Method 2: Using HTML Markup

Use native HTML elements as accordion structure:

```vue
<template>
  <ejs-accordion>
    <div>
      <div>
        <div>ASP.NET</div>
      </div>
      <div>
        <div>Microsoft ASP.NET is a set of technologies...</div>
      </div>
    </div>
    <div>
      <div>
        <div>ASP.NET MVC</div>
      </div>
      <div>
        <div>The Model-View-Controller (MVC) architectural pattern...</div>
      </div>
    </div>
  </ejs-accordion>
</template>
```

**HTML Structure:**
```
AccordionComponent
  └─ div (item container)
      ├─ div (header container)
      │   └─ div (header text/content)
      └─ div (panel container)
          └─ div (panel content)
```

**When to use:** For simple static content or migrating from HTML-based templates

## Minimal Working Example

Complete working example with two collapsible panels:

```vue
<template>
  <div class="p-8">
    <h1>My First Accordion</h1>
    
    <ejs-accordion :expandMode="'Multiple'">
      <e-accordion-items>
        <e-accordion-item 
          header="What is Vue?" 
          content="Vue is a JavaScript framework for building user interfaces with reusable components." 
        />
        <e-accordion-item 
          header="What is the Composition API?" 
          content="The Composition API is a way to compose component logic using imported functions in Vue 3." 
        />
        <e-accordion-item 
          header="What are Composables?" 
          content="Composables are functions that leverage Vue's Composition API to encapsulate and reuse stateful logic." 
        />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';
import '@syncfusion/ej2-popups/styles/tailwind3.css';
import '@syncfusion/ej2-vue-navigations/styles/tailwind3.css';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

**Run the application:**
```bash
npm run dev
```

The accordion will render with three collapsible panels, all initially collapsed. Click headers to expand/collapse.

## Item Configuration

Each accordion item can be configured with specific properties to control its appearance, behavior, and state.

### Item Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `header` | string | - | Header text or slot template for the panel header |
| `content` | string | - | Content text or slot template for the panel body |
| `expanded` | boolean | false | Whether the item is initially expanded |
| `disabled` | boolean | false | Whether the item is disabled and cannot be clicked |
| `cssClass` | string | - | Custom CSS class to apply to the item |

### Basic Item Configuration

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <!-- Initially expanded item -->
      <e-accordion-item 
        :expanded="true"
        header="Always Open"
        content="This item starts expanded"
      />
      
      <!-- Disabled item -->
      <e-accordion-item 
        :disabled="true"
        header="Locked Section"
        content="This item is disabled and cannot be clicked"
      />
      
      <!-- Normal item -->
      <e-accordion-item 
        header="Regular Item"
        content="This is a normal collapsible item"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

### Setting Per-Item Initial Expansion

Use the `expanded` property to control which items are open when the component loads:

```vue
<ejs-accordion :expandMode="'Multiple'">
  <e-accordion-items>
    <e-accordion-item 
      :expanded="true"
      header="Expanded by Default" 
      content="This panel opens automatically" 
    />
    <e-accordion-item 
      :expanded="true"
      header="Also Expanded" 
      content="Multiple items can be open with Multiple mode" 
    />
    <e-accordion-item 
      :expanded="false"
      header="Collapsed Item" 
      content="This one starts closed" 
    />
  </e-accordion-items>
</ejs-accordion>
```

### Disabling Specific Items

Mark items as disabled to prevent user interaction:

```vue
<ejs-accordion>
  <e-accordion-items>
    <e-accordion-item 
      header="Available" 
      content="User can click this" 
    />
    <e-accordion-item 
      :disabled="true"
      header="Coming Soon" 
      content="This feature will be available soon" 
    />
    <e-accordion-item 
      :disabled="true"
      header="Premium Only" 
      content="This requires a premium subscription" 
    />
    <e-accordion-item 
      header="Available" 
      content="User can click this" 
    />
  </e-accordion-items>
</ejs-accordion>
```

**Styling disabled items:**
```css
.e-accordion-item.e-disabled .e-accordion-header {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Applying Custom CSS to Items

Use the `cssClass` property to style individual items differently:

```vue
<ejs-accordion>
  <e-accordion-items>
    <e-accordion-item 
      header="Warning Section"
      content="This item has special styling"
      cssClass="warning-item"
    />
    <e-accordion-item 
      header="Success Section"
      content="This item indicates success"
      cssClass="success-item"
    />
    <e-accordion-item 
      header="Info Section"
      content="This item shows information"
      cssClass="info-item"
    />
  </e-accordion-items>
</ejs-accordion>
```

**Styling each type:**
```css
/* Warning item styling */
.warning-item .e-accordion-header {
  background-color: #ff9800;
  color: white;
  border-left: 4px solid #e65100;
}

.warning-item .e-accordion-content {
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
}

/* Success item styling */
.success-item .e-accordion-header {
  background-color: #4caf50;
  color: white;
  border-left: 4px solid #2e7d32;
}

.success-item .e-accordion-content {
  background-color: #f1f8e9;
  border-left: 4px solid #4caf50;
}

/* Info item styling */
.info-item .e-accordion-header {
  background-color: #2196f3;
  color: white;
  border-left: 4px solid #1565c0;
}

.info-item .e-accordion-content {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}
```

### Dynamic Item Configuration

Configure items dynamically based on data:

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item
        v-for="(item, index) in items"
        :key="index"
        :header="item.header"
        :content="item.content"
        :expanded="item.expanded"
        :disabled="item.disabled"
        :cssClass="item.cssClass"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
  },
  { 
    header: 'FAQ #3',
    content: 'Third frequently asked question...',
    expanded: false,
    disabled: true,
    cssClass: 'faq-item'
  }
]);
</script>
```

## Tracking Expanded Items with expandedIndices

The `expandedIndices` property returns an array of indices for currently expanded items. Use this to track state or control which panels are open.

### Getting Currently Expanded Items

```vue
<template>
  <div>
    <button @click="checkExpandedItems">Check Expanded Items</button>

    <ejs-accordion ref="accordionRef">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
        <e-accordion-item header="Item 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);

const checkExpandedItems = () => {
  const expanded = accordionRef.value?.expandedIndices;
  console.log('Currently expanded items:', expanded);
  // Output example: [0, 2] means items at index 0 and 2 are expanded
};
</script>
```

### Using expandedIndices in Events

```vue
<template>
  <div>
    <p>Expanded items: [{{ expandedList.join(', ') }}]</p>

    <ejs-accordion 
      ref="accordionRef" 
      :expandMode="'Multiple'"
      @expanded="onExpanded"
    >
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
        <e-accordion-item header="Item 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const expandedList = ref([]);

const onExpanded = (args) => {
  const expanded = accordionRef.value?.expandedIndices || [];
  expandedList.value = expanded;
  console.log('Expanded indices after change:', expanded);
};
</script>
```

### Wizard Pattern with expandedIndices

Real-world example using `expandedIndices` to control a multi-step wizard:

```vue
<template>
  <div>
    <div style="margin-bottom: 15px">
      <button @click="goToStep(0)">Step 1: Signin</button>
      <button @click="goToStep(1)" :disabled="!allowNext()">
        Step 2: Address
      </button>
      <button @click="goToStep(2)" :disabled="!allowNext()">
        Step 3: Payment
      </button>
    </div>

    <ejs-accordion 
      ref="accordionRef" 
      :expandMode="'Single'"
    >
      <e-accordion-items>
        <e-accordion-item :expanded="true" header="Sign In" content="Email and password..." />
        <e-accordion-item header="Delivery Address" content="Address details..." />
        <e-accordion-item header="Card Details" content="Payment information..." />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);

const allowNext = () => {
  const expanded = accordionRef.value?.expandedIndices || [];
  return expanded[expanded.length - 1] >= 0;
};

const goToStep = (stepIndex) => {
  accordionRef.value?.expandItem(true, stepIndex);
};
</script>
```

### Setting Initial expandedIndices

Set which items should be expanded when the component loads:

```vue
<ejs-accordion :expandMode="'Multiple'" :expandedIndices="[0, 2]">
  <e-accordion-items>
    <e-accordion-item header="Item 1" content="Expanded on load" />
    <e-accordion-item header="Item 2" content="Collapsed on load" />
    <e-accordion-item header="Item 3" content="Expanded on load" />
  </e-accordion-items>
</ejs-accordion>
```

## Customizing Headers with headerTemplate

The `headerTemplate` property allows you to render custom HTML or components as accordion headers instead of plain text. Use template slots for custom headers.

### Basic Header Template with Slot

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item content="List of documents here">
        <template #header>
          <div style="display: flex; align-items: center; gap: 10px">
            <span style="font-size: 20px">📋</span>
            <span>Document List</span>
          </div>
        </template>
      </e-accordion-item>
      
      <e-accordion-item content="Configuration settings here">
        <template #header>
          <div style="display: flex; align-items: center; gap: 10px">
            <span style="font-size: 20px">⚙️</span>
            <span>Settings</span>
          </div>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

### Header Template with Status Badge

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item content="User details form">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>User Information</span>
            <span 
              style="background-color: #4caf50; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px"
            >
              Complete
            </span>
          </div>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>
```

### Header Template with Dynamic Data

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item
        v-for="item in items"
        :key="item.id"
        :content="`Details for ${item.title}`"
      >
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
            <div>
              <strong>{{ item.title }}</strong>
              <span style="margin-left: 10px; font-size: 12px; color: #666">
                Priority: {{ item.priority }}
              </span>
            </div>
            <span
              :style="{ 
                backgroundColor: getStatusColor(item.status),
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px'
              }"
            >
              {{ item.status }}
            </span>
          </div>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const items = ref([
  { id: 1, title: 'Task 1', status: 'pending', priority: 'high' },
  { id: 2, title: 'Task 2', status: 'in-progress', priority: 'medium' },
  { id: 3, title: 'Task 3', status: 'completed', priority: 'low' }
]);

const getStatusColor = (status) => {
  const colors = {
    'pending': '#ff9800',
    'in-progress': '#2196f3',
    'completed': '#4caf50'
  };
  return colors[status] || '#999';
};
</script>
```

### Header Template with Icons and Counters

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item content="List of 5 notifications">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>Notifications</span>
            <span 
              style="background-color: #f0f0f0; padding: 2px 8px; border-radius: 50%; min-width: 24px; text-align: center; font-weight: bold"
            >
              5
            </span>
          </div>
        </template>
      </e-accordion-item>
      
      <e-accordion-item content="List of 12 messages">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>Messages</span>
            <span 
              style="background-color: #f0f0f0; padding: 2px 8px; border-radius: 50%; min-width: 24px; text-align: center; font-weight: bold"
            >
              12
            </span>
          </div>
        </template>
      </e-accordion-item>
      
      <e-accordion-item content="List of 3 tasks">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span>Tasks</span>
            <span 
              style="background-color: #f0f0f0; padding: 2px 8px; border-radius: 50%; min-width: 24px; text-align: center; font-weight: bold"
            >
              3
            </span>
          </div>
        </template>
      </e-accordion-item>
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

## Customizing Appearance

### Adding Custom CSS Classes

Use the `cssClass` property to apply custom styles:

```vue
<template>
  <ejs-accordion cssClass="custom-accordion">
    <e-accordion-items>
      <e-accordion-item 
        header="Section 1" 
        content="Content here"
        cssClass="custom-item"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<style scoped>
.custom-accordion {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.custom-item :deep(.e-accordion-header) {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.custom-item :deep(.e-accordion-content) {
  padding: 20px;
}
</style>
```

### Using Built-in Classes

The Accordion generates these classes automatically:

```css
.e-accordion              /* Main container */
.e-accordion-item        /* Individual item */
.e-accordion-header      /* Header section */
.e-accordion-content     /* Content panel */
.e-accordion-control     /* Expanded item */
.e-disabled              /* Disabled item */
```

### Common Styling Tasks

**Change header background:**
```css
.e-accordion-header {
  background-color: #2c3e50;
  color: white;
}
```

**Add padding to content:**
```css
.e-accordion-content {
  padding: 20px 15px;
}
```

**Customize borders:**
```css
.e-accordion-item {
  border: 1px solid #ddd;
  margin: 10px 0;
}
```

---

## Next Steps

1. **Expand Modes** - Control whether one or multiple panels can be open
2. **Animation Effects** - Add smooth transitions when panels expand/collapse
3. **Content Loading** - Load content dynamically from data sources or APIs
4. **Advanced Features** - Nested accordions, events, and Vue Composition API patterns

## Troubleshooting

**Issue: Styles not appearing**
- Verify all CSS imports are present in correct order
- Check that theme CSS file matches your chosen theme
- Ensure CSS file is imported before component usage

**Issue: Component not rendering**
- Confirm package is installed: `npm list @syncfusion/ej2-vue-navigations`
- Check that component imports match your component names
- Verify Vue version compatibility (Vue 3+ required)

**Issue: Content not showing**
- For Items API: ensure `content` prop is provided
- For HTML markup: verify DOM structure follows required hierarchy
- Check browser console for errors
