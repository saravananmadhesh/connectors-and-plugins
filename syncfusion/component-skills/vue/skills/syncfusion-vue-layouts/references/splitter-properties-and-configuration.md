# Splitter Properties and Configuration (Vue 3)

## Table of Contents
- [Splitter Component Properties](#splitter-component-properties)
- [Pane Properties](#pane-properties)
- [Common Configuration Patterns](#common-configuration-patterns)

## Splitter Component Properties

The `SplitterComponent` provides configuration options to customize the layout, behavior, and appearance.

### orientation

**Type:** `'Horizontal' | 'Vertical'`

Specifies the layout direction of the panes. Use "Horizontal" for left-to-right layout and "Vertical" for top-to-bottom layout.

```vue
<template>
  <SplitterComponent id="splitter" height="250px" width="600px" orientation="Horizontal">
    <e-panes>
      <e-pane><div>Left</div></e-pane>
      <e-pane><div>Right</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

**When to Use:** Set orientation when initializing the splitter to control the pane arrangement.

---

### height and width

**Type:** `string`

Specifies the height and width of the Splitter component. Accepts both pixel and percentage values.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

**When to Use:** Always set explicit height for vertical splitters to ensure proper rendering.

---

### separatorSize

**Type:** `number`

Specifies the size (in pixels) of the separator bar between panes.

**Default:** 4 pixels

```vue
<template>
  <SplitterComponent height="250px" width="600px" :separatorSize="4">
    <e-panes>
      <e-pane size="250px"><div>1</div></e-pane>
      <e-pane size="250px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### cssClass

**Type:** `string`

Specifies one or more CSS class names to customize the Splitter styling.

```vue
<template>
  <SplitterComponent cssClass="custom-splitter dark-theme" height="250px" width="600px">
    <e-panes>
      <e-pane size="250px"><div>1</div></e-pane>
      <e-pane size="250px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### enableRtl

**Type:** `boolean`

Enables right-to-left rendering for RTL languages (Arabic, Hebrew, etc.).

```vue
<template>
  <SplitterComponent :enableRtl="true" height="250px" width="600px">
    <e-panes>
      <e-pane size="250px"><div>1</div></e-pane>
      <e-pane size="250px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### enablePersistence

**Type:** `boolean`

**Default:** `false`

Enables persistence of the Splitter state (pane sizes, collapsed states) between page reloads using browser storage.

```vue
<template>
  <SplitterComponent :enablePersistence="true" height="250px" width="600px" id="splitter-persistence">
    <e-panes>
      <e-pane size="250px" :collapsible="true"><div>1</div></e-pane>
      <e-pane size="250px" :collapsible="true"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

**Note:** Component must have an `id` attribute for persistence to work.

### enableHtmlSanitizer

**Type:** `boolean`

**Default:** `true`

Defines whether to allow HTML content sanitization. When enabled, prevents cross-site scripting (XSS) attacks.

**Security Note:** XSS attacks can compromise your application. Only disable sanitization for trusted content sources.

```vue
<template>
  <SplitterComponent :enableHtmlSanitizer="true" height="250px" width="600px">
    <e-panes>
      <e-pane content="<div>Safe HTML Content</div>"></e-pane>
      <e-pane content="<p>More content</p>"></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### locale

**Type:** `string`

**Default:** `'en-US'`

Overrides the global culture and localization for the Splitter component.

```vue
<template>
  <SplitterComponent locale="fr-FR" height="250px" width="600px">
    <e-panes>
      <e-pane size="250px"><div>1</div></e-pane>
      <e-pane size="250px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Pane Properties

### size

**Type:** `string`

Specifies the size of the pane. Can be in pixels (`'200px'`) or percentage (`'50%'`).

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="30%"><div>30%</div></e-pane>
      <e-pane size="70%"><div>70%</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### min / max

**Type:** `string`

Sets the minimum and maximum size of the pane.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="50%" min="100px" max="400px"><div>Constrained</div></e-pane>
      <e-pane size="50%"><div>Other</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### collapsed

**Type:** `boolean`

**Default:** `false`

Initial collapsed state of the pane.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsed="true"><div>Hidden</div></e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### collapsible

**Type:** `boolean`

**Default:** `false`

Allows user to collapse the pane.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>Collapsible</div></e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### resizable

**Type:** `boolean`

**Default:** `true`

Allows user to resize the pane.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :resizable="false"><div>Fixed</div></e-pane>
      <e-pane><div>Resizable</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### content

**Type:** `string | HTMLElement | function`

Sets the content of the pane directly via the `content` property.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane content="<div>String content</div>"></e-pane>
      <e-pane content="<p>Another pane</p>"></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### cssClass

**Type:** `string`

Custom CSS class for the pane.

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" cssClass="highlighted-pane"><div>Highlighted</div></e-pane>
      <e-pane><div>Normal</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Common Configuration Patterns

### Pattern 1: Three-Pane Layout with Sidebar

```vue
<template>
  <SplitterComponent height="600px" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="20%" min="150px" max="300px">
        <nav>Sidebar Navigation</nav>
      </e-pane>
      <e-pane size="60%" min="300px">
        <main>Main Content</main>
      </e-pane>
      <e-pane size="20%" min="150px" max="400px">
        <aside>Right Panel</aside>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Pattern 2: Code Editor Layout

```vue
<template>
  <SplitterComponent height="100vh" width="100%" orientation="Horizontal">
    <e-panes>
      <e-pane size="20%" min="150px" :collapsible="true">
        <div class="file-tree">File Explorer</div>
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
```

### Pattern 3: Master-Detail View

```vue
<template>
  <SplitterComponent height="500px" width="100%">
    <e-panes>
      <e-pane size="30%" min="200px" :collapsible="true">
        <div>List of items</div>
      </e-pane>
      <e-pane size="70%">
        <div>Detail view</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

**Next:** Learn about [methods reference](splitter-methods-reference.md) for imperative API.
