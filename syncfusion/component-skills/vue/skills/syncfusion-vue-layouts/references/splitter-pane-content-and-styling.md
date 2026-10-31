# Splitter Pane Content & Styling (Vue 3)

## Table of Contents
- [HTML Content in Panes](#html-content-in-panes)
- [Vue Component Content in Panes](#vue-component-content-in-panes)
- [CSS Selector-Based Content](#css-selector-based-content)
- [Pane Template Usage](#pane-template-usage)
- [Custom Styling and Classes](#custom-styling-and-classes)

## HTML Content in Panes

### Slot Content

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="50%">
        <div class="pane-content">
          <h3>Pane Title</h3>
          <p>Pane content goes here</p>
        </div>
      </e-pane>
      <e-pane size="50%">
        <div>Other content</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Raw HTML via `content` Prop

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane content="<div class='pane-content'><h3>Title</h3><p>Content</p></div>" />
      <e-pane content="<p>More content</p>" />
    </e-panes>
  </SplitterComponent>
</template>
```

### Dynamic HTML Content

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane :content="dynamicContent" />
      <e-pane>Static content</e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, computed } from 'vue';

const userName = ref('John');
const dynamicContent = computed(() =>
  `<div class="user-info"><h3>${userName.value}</h3></div>`
);
</script>
```

## Vue Component Content in Panes

### Using Vue Components in Panes

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px">
        <Sidebar />
      </e-pane>
      <e-pane>
        <MainContent />
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';
</script>
```

### Conditional Components

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px">
        <component :is="currentSidebar" />
      </e-pane>
      <e-pane>
        <MainContent />
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';
import NavigationSidebar from './components/NavigationSidebar.vue';
import ToolsSidebar from './components/ToolsSidebar.vue';
import MainContent from './components/MainContent.vue';

const mode = ref('navigation');
const currentSidebar = ref(NavigationSidebar);
</script>
```

## CSS Selector-Based Content

### Apply Styles to Pane Children

```vue
<style>
/* Style all pane content */
.e-pane > div {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

/* Style specific pane via index */
.e-splitter .e-pane:nth-child(1) {
  background: #f5f5f5;
  border-right: 1px solid #ddd;
}

.e-splitter .e-pane:nth-child(2) {
  background: #ffffff;
}
</style>
```

## Pane Template Usage

### Using Function-Based Templates

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane :content="renderFirst" />
      <e-pane>Static</e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const renderFirst = () => {
  const div = document.createElement('div');
  div.innerHTML = '<h3>Rendered</h3><p>Function-based content</p>';
  return div;
};
</script>
```

### Template with Data

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane :content="(el) => renderWithData(el, userData)" />
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const userData = ref({ name: 'John', age: 30 });

const renderWithData = (el, data) => {
  el.innerHTML = `
    <div class="user-card">
      <h3>${data.value.name}</h3>
      <p>Age: ${data.value.age}</p>
    </div>
  `;
};
</script>
```

## Custom Styling and Classes

### Per-Pane CSS Classes

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" cssClass="sidebar-pane">
        <div>Sidebar</div>
      </e-pane>
      <e-pane cssClass="main-pane">
        <div>Main</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<style>
.sidebar-pane {
  background: #f0f0f0;
  border-right: 1px solid #ccc;
}

.main-pane {
  background: #fff;
}
</style>
```

### Full-Height Pane Content

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px">
        <div class="full-pane">Content</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<style>
.full-pane {
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
```

### Scrolling Content Inside Pane

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px">
        <div class="scrollable-pane">
          <div v-for="i in 50" :key="i">Item {{ i }}</div>
        </div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<style>
.scrollable-pane {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
}
</style>
```

### Pane with Header and Footer

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="50%">
        <div class="structured-pane">
          <div class="pane-header">Header</div>
          <div class="pane-body">Body content</div>
          <div class="pane-footer">Footer</div>
        </div>
      </e-pane>
      <e-pane>Other</e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<style>
.structured-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pane-header {
  background: #007acc;
  color: white;
  padding: 12px;
  flex-shrink: 0;
}
.pane-body {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
.pane-footer {
  background: #f5f5f5;
  padding: 12px;
  flex-shrink: 0;
}
</style>
```

### Theming Panes

```vue
<style>
/* Dark theme */
.dark-pane {
  background: #1e1e1e;
  color: #f0f0f0;
}

/* Light theme */
.light-pane {
  background: #ffffff;
  color: #333;
}

/* Accent pane */
.accent-pane {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
```

## Best Practices

1. **Use slot content for static content**: Better Vue integration

2. **Use `content` prop for dynamic HTML**: Useful for templated content

3. **Always set explicit dimensions**: Use `height: 100%` for full pane fill

4. **Handle overflow**: Add `overflow: auto` for scrollable content

5. **Apply scoped styles**: Avoid global CSS conflicts

6. **Test with various content types**: HTML, Vue components, lazy content

7. **Consider performance**: Avoid heavy components in many panes

**Next:** Learn about [accessibility and globalization](splitter-accessibility-and-globalization.md).
