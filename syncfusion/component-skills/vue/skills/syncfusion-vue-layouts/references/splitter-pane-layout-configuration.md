# Splitter Pane Layout Configuration (Vue 3)

## Table of Contents
- [Horizontal and Vertical Layouts](#horizontal-and-vertical-layouts)
- [Multiple Panes](#multiple-panes)
- [Nested Splitters](#nested-splitters)
- [Pane Properties and Configuration](#pane-properties-and-configuration)
- [Layout Patterns for Common Use Cases](#layout-patterns-for-common-use-cases)

## Horizontal and Vertical Layouts

### Horizontal Layout (Default)

Panes arranged left-to-right.

```vue
<template>
  <SplitterComponent height="400px" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="200px"><div>Left</div></e-pane>
      <e-pane size="200px"><div>Center</div></e-pane>
      <e-pane size="200px"><div>Right</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Vertical Layout

Panes arranged top-to-bottom.

```vue
<template>
  <SplitterComponent height="600px" width="100%" orientation="Vertical">
    <e-panes>
      <e-pane size="200px"><div>Top</div></e-pane>
      <e-pane size="200px"><div>Middle</div></e-pane>
      <e-pane size="200px"><div>Bottom</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Dynamic Orientation

```vue
<template>
  <div>
    <button @click="toggleOrientation">Toggle Orientation</button>
    <SplitterComponent height="400px" width="100%" :orientation="orientation">
      <e-panes>
        <e-pane size="50%"><div>1</div></e-pane>
        <e-pane size="50%"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const orientation = ref('Horizontal');
const toggleOrientation = () => {
  orientation.value = orientation.value === 'Horizontal' ? 'Vertical' : 'Horizontal';
};
</script>
```

## Multiple Panes

### Three-Pane Layout

```vue
<template>
  <SplitterComponent height="500px" width="100%">
    <e-panes>
      <e-pane size="20%" min="150px" max="300px">
        <div>Sidebar</div>
      </e-pane>
      <e-pane size="60%" min="400px">
        <div>Main Content</div>
      </e-pane>
      <e-pane size="20%" min="150px" max="400px">
        <div>Right Panel</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Four-Pane Layout

```vue
<template>
  <SplitterComponent height="500px" width="100%">
    <e-panes>
      <e-pane size="15%"><div>1</div></e-pane>
      <e-pane size="35%"><div>2</div></e-pane>
      <e-pane size="35%"><div>3</div></e-pane>
      <e-pane size="15%"><div>4</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Nested Splitters

Combine horizontal and vertical splitters for complex layouts like code editors.

### Code Editor Layout

```vue
<template>
  <SplitterComponent height="100vh" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="20%" min="150px" :collapsible="true">
        <div class="file-explorer">File Explorer</div>
      </e-pane>
      <e-pane size="80%">
        <SplitterComponent height="100%" width="100%" orientation="Vertical">
          <e-panes>
            <e-pane size="70%">
              <div class="editor">Code Editor</div>
            </e-pane>
            <e-pane size="30%" :collapsible="true">
              <div class="terminal">Terminal / Output</div>
            </e-pane>
          </e-panes>
        </SplitterComponent>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<style scoped>
.file-explorer, .editor, .terminal {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.file-explorer { background: #f5f5f5; }
.editor { background: #ffffff; }
.terminal { background: #1e1e1e; color: #fff; }
</style>
```

### Email Client Layout

```vue
<template>
  <SplitterComponent height="100vh" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="200px" :collapsible="true">
        <div class="folder-list">Folders</div>
      </e-pane>
      <e-pane size="300px" :collapsible="true">
        <SplitterComponent height="100%" width="100%" orientation="Vertical">
          <e-panes>
            <e-pane size="50%">
              <div class="email-list">Email List</div>
            </e-pane>
            <e-pane size="50%">
              <div class="email-preview">Preview</div>
            </e-pane>
          </e-panes>
        </SplitterComponent>
      </e-pane>
      <e-pane size="auto">
        <div class="email-content">Email Content</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Dashboard Layout

```vue
<template>
  <SplitterComponent height="100vh" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="250px" :collapsible="true">
        <div class="sidebar">Navigation</div>
      </e-pane>
      <e-pane>
        <SplitterComponent height="100%" width="100%" orientation="Vertical">
          <e-panes>
            <e-pane size="60%">
              <div class="main-content">Main Dashboard</div>
            </e-pane>
            <e-pane size="40%" :collapsible="true">
              <div class="bottom-panel">Activity Feed</div>
            </e-pane>
          </e-panes>
        </SplitterComponent>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Pane Properties and Configuration

### Pane with All Properties

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane
        size="50%"
        min="200px"
        max="600px"
        :collapsible="true"
        :resizable="true"
        cssClass="highlighted-pane"
      >
        <div>Fully configured pane</div>
      </e-pane>
      <e-pane size="50%">
        <div>Simple pane</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Per-Pane CSS Classes

```vue
<style>
.e-pane.highlighted-pane {
  background: #f0f8ff;
  border-right: 2px solid #007acc;
}
</style>
```

## Layout Patterns for Common Use Cases

### Pattern 1: File Manager

```vue
<template>
  <SplitterComponent height="100vh" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsible="true">
        <div>Quick Access</div>
      </e-pane>
      <e-pane size="400px" :collapsible="true">
        <div>Folder Tree</div>
      </e-pane>
      <e-pane>
        <div>File List</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Pattern 2: Chat Application

```vue
<template>
  <SplitterComponent height="100vh" width="100%">
    <e-panes>
      <e-pane size="280px" :collapsible="true">
        <div class="chat-list">Contact List</div>
      </e-pane>
      <e-pane>
        <SplitterComponent height="100%" width="100%" orientation="Vertical">
          <e-panes>
            <e-pane size="80%">
              <div class="messages">Messages</div>
            </e-pane>
            <e-pane size="20%">
              <div class="input-area">Message Input</div>
            </e-pane>
          </e-panes>
        </SplitterComponent>
      </e-pane>
      <e-pane size="240px" :collapsible="true">
        <div class="info-panel">Info</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Pattern 3: IDE with Multiple Panels

```vue
<template>
  <SplitterComponent height="100vh" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsible="true">
        <div>Explorer</div>
      </e-pane>
      <e-pane>
        <SplitterComponent height="100%" width="100%" orientation="Vertical">
          <e-panes>
            <e-pane size="70%">
              <div>Editor</div>
            </e-pane>
            <e-pane size="30%" :collapsible="true">
              <SplitterComponent height="100%" width="100%" orientation="Horizontal">
                <e-panes>
                  <e-pane size="50%">
                    <div>Terminal</div>
                  </e-pane>
                  <e-pane size="50%">
                    <div>Output</div>
                  </e-pane>
                </e-panes>
              </SplitterComponent>
            </e-pane>
          </e-panes>
        </SplitterComponent>
      </e-pane>
      <e-pane size="300px" :collapsible="true">
        <div>Properties</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Best Practices

1. **Use percentage sizes for responsive layouts**: `size="50%"` adapts to container size

2. **Set min/max to prevent extremes**: Avoid 0-size or full-width panes

3. **Use nested splitters for complex layouts**: Code editors, dashboards, etc.

4. **Consider collapse behavior**: Allow users to hide secondary panels

5. **Maintain consistent orientations**: Don't mix horizontal/vertical unnecessarily

6. **Test resize limits**: Verify behavior at minimum and maximum sizes

7. **Provide visual separators**: Clear boundaries between panes

8. **Save layout state**: Persist user-customized layouts

**Next:** Learn about [pane sizing and separation](splitter-pane-sizing-and-separation.md) for size details.
