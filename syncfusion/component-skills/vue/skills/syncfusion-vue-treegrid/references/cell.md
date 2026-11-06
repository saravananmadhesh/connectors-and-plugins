# Cell

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Auto Wrap - Text Wrapping](#auto-wrap---text-wrapping)
- [Clip Mode - Overflow Handling](#clip-mode---overflow-handling)
- [Complex Cell Content](#complex-cell-content)
- [Dynamic HTML Content](#dynamic-html-content)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

## When to Use

Use cell features when you need to:
- **Display HTML content** - Render styled text, icons, links in cells
- **Wrap text** - Handle long text that exceeds column width
- **Manage overflow** - Control how excess content is displayed
- **Improve readability** - Truncate, ellipsis, or tooltip for long content
- **Customize appearance** - Mix HTML and plain text dynamically
- **Responsive layouts** - Auto-adjust text based on available space
- **Data formatting** - Display formatted data with HTML structure

## Mandatory Rules

- ✓ **Unique Column Fields**: Each column must have unique field name
- ✓ **Width Property**: Set column width for clip/wrap to work effectively
- ✓ **clipMode Default**: Default is 'Ellipsis' if not specified
- ✓ **textWrapSettings**: Use `:textWrapSettings="{ wrapMode: 'Both' }"` for Vue binding
- ✓ **allowTextWrap**: Set `:allowTextWrap="true"` to enable text wrapping

## Auto Wrap - Text Wrapping

Enable automatic text wrapping when content exceeds column width:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    height="300px"
    :allowTextWrap="true"
    :textWrapSettings="wrapSettings">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

// Wrap mode options: 'Both', 'Header', 'Content'
const wrapSettings = ref({
  wrapMode: 'Both'  // Content will wrap to next line automatically
});

provide('treegrid', []);
</script>
```

### Text Wrap Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `Both` | Wraps both header and content | Default, best for long text everywhere |
| `Header` | Wraps header text only | Headers have long labels |
| `Content` | Wraps content text only | Only data needs wrapping, keep headers single line |

## Clip Mode - Overflow Handling

Control how cell content overflow is displayed:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    height="300px"
    gridLines="Both">
    <e-columns>
      <!-- Truncate overflow content -->
      <e-column 
        field="taskID" 
        headerText="Task ID" 
        width=90 
        clipMode="Clip"
        textAlign="Right">
      </e-column>
      
      <!-- Show ellipsis (default) -->
      <e-column 
        field="taskName" 
        headerText="Task Name" 
        width=100 
        clipMode="Ellipsis">
      </e-column>
      
      <!-- Ellipsis with tooltip on hover -->
      <e-column 
        field="assignee" 
        headerText="Assigned To" 
        width=80 
        clipMode="EllipsisWithTooltip"
        textAlign="Right">
      </e-column>
      
      <!-- Default ellipsis -->
      <e-column 
        field="priority" 
        headerText="Priority" 
        width=70 
        clipMode="Ellipsis"
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const data = ref([...]);

provide('treegrid', []);
</script>
```

### Clip Mode Options

| Mode | Display Behavior | Tooltip | Use Case |
|------|------------------|---------|----------|
| `Clip` | Truncates overflow content abruptly | No | Show partial text only |
| `Ellipsis` | Shows `...` when content overflows | No | Indicate truncation visually |
| `EllipsisWithTooltip` | Shows `...` with full text on hover | Yes | Best UX - users can see full content |

**Default:** `Ellipsis` is the default clipMode if not specified.
