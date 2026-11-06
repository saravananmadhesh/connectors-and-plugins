# Dashboard Layout Properties Reference (Vue 3)

## Table of Contents
- [Layout Properties](#layout-properties)
- [Interaction Properties](#interaction-properties)
- [Customization Properties](#customization-properties)
- [Advanced Properties](#advanced-properties)
- [Complete Reference Table](#complete-reference-table)

## Layout Properties

### columns

The number of grid columns in the dashboard layout.

```vue
<template>
  <DashboardLayoutComponent :columns="6" :panels="panels" />
</template>
```

| Type | Default | Range |
|------|---------|-------|
| number | 5 | 1-20 |

### cellSpacing

Horizontal and vertical spacing between cells (in pixels).

```vue
<template>
  <DashboardLayoutComponent :cellSpacing="[10, 15]" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| number[] | [10, 10] |

### cellAspectRatio

The aspect ratio (height/width) of each grid cell.

```vue
<template>
  <DashboardLayoutComponent :cellAspectRatio="1.5" :panels="panels" />
</template>
```

| Type | Default | Common Values |
|------|---------|---------------|
| number | 1 | 0.5, 1, 1.5, 2 |

### panels

Array of `PanelModel` objects defining the panels in the dashboard.

```vue
<script setup>
const panels = ref([
  { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'Panel 1', content: 'Content' }
]);
</script>
```

## Interaction Properties

### allowDragging

Enables or disables panel dragging.

```vue
<template>
  <DashboardLayoutComponent :allowDragging="true" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| boolean | true |

### allowResizing

Enables or disables panel resizing.

```vue
<template>
  <DashboardLayoutComponent :allowResizing="true" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| boolean | true |

### draggableHandle

CSS selector for elements that initiate dragging.

```vue
<template>
  <DashboardLayoutComponent
    :allowDragging="true"
    draggableHandle=".e-panel-header"
    :panels="panels"
  />
</template>
```

| Type | Default |
|------|---------|
| string | '.e-panel-container' |

### resizableHandles

Array of resize handle directions to display.

```vue
<template>
  <DashboardLayoutComponent
    :resizableHandles="['e-south-east', 'e-east', 'e-south']"
    :panels="panels"
  />
</template>
```

| Type | Default |
|------|---------|
| string[] | ['e-south-east'] |

**Available values:**
- `e-south-east` - Bottom-right corner (default)
- `e-south-west` - Bottom-left corner
- `e-north-east` - Top-right corner
- `e-north-west` - Top-left corner
- `e-east` - Right edge
- `e-west` - Left edge
- `e-south` - Bottom edge
- `e-north` - Top edge

## Customization Properties

### showGridLines

Displays visual grid lines in the dashboard.

```vue
<template>
  <DashboardLayoutComponent :showGridLines="true" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| boolean | false |

### enableRtl

Enables right-to-left layout direction.

```vue
<template>
  <DashboardLayoutComponent :enableRtl="true" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| boolean | false |

### enableHtmlSanitizer

Sanitizes HTML content in panel headers and content to prevent XSS attacks.

```vue
<template>
  <DashboardLayoutComponent :enableHtmlSanitizer="true" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| boolean | true |

## Advanced Properties

### mediaQuery

CSS media query string that determines when the layout switches to mobile mode.

```vue
<template>
  <DashboardLayoutComponent mediaQuery="max-width: 768px" :panels="panels" />
</template>
```

| Type | Default |
|------|---------|
| string | 'max-width: 600px' |

### enablePersistence

Saves and restores the dashboard layout across browser sessions using localStorage.

```vue
<template>
  <DashboardLayoutComponent
    id="my-dashboard"
    :enablePersistence="true"
    :panels="panels"
  />
</template>
```

| Type | Default |
|------|---------|
| boolean | false |

## Complete Reference Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | number | 5 | Number of grid columns |
| `cellSpacing` | number[] | [10, 10] | Horizontal and vertical cell spacing |
| `cellAspectRatio` | number | 1 | Cell aspect ratio (height/width) |
| `panels` | PanelModel[] | [] | Array of panel definitions |
| `allowDragging` | boolean | true | Enable panel dragging |
| `allowResizing` | boolean | true | Enable panel resizing |
| `allowFloating` | boolean | false | Auto-fill empty spaces |
| `draggableHandle` | string | '.e-panel-container' | Drag handle selector |
| `resizableHandles` | string[] | ['e-south-east'] | Active resize handles |
| `showGridLines` | boolean | false | Display grid lines |
| `mediaQuery` | string | 'max-width: 600px' | Mobile breakpoint |
| `enableRtl` | boolean | false | Right-to-left layout |
| `enablePersistence` | boolean | false | Persist layout across sessions |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML content |
| `id` | string | auto-generated | Unique dashboard identifier |

**Next:** Learn about [panel templates](dashboard-panel-templates.md) for custom headers and content.
