# Positioning and Dragging

## Table of Contents
- [Positioning Basics](#positioning-basics)
- [9 Preset Positions](#9-preset-positions)
- [Custom Pixel Positioning](#custom-pixel-positioning)
- [Dragging](#dragging)
- [Resizing](#resizing)
- [Target Element](#target-element)
- [Examples](#examples)

## Positioning Basics

The `position` prop controls where the dialog appears:

```vue
<!-- Default center -->
<ejs-dialog
  header="Dialog"
  :position="{ X: 'center', Y: 'center' }"
>
  Content
</ejs-dialog>

<!-- Or numeric pixels -->
<ejs-dialog
  header="Dialog"
  :position="{ X: 100, Y: 200 }"
>
  Content
</ejs-dialog>
```

**Position Property Structure:**
```typescript
position: {
  X: 'left' | 'center' | 'right' | number,  // Horizontal
  Y: 'top' | 'center' | 'bottom' | number   // Vertical
}
```

## 9 Preset Positions

| X / Y | Top | Center | Bottom |
|-------|-----|--------|--------|
| **Left** | TopLeft | LeftCenter | BottomLeft |
| **Center** | TopCenter | Center | BottomCenter |
| **Right** | TopRight | RightCenter | BottomRight |

### Examples

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px">
    <!-- Top Row -->
    <ejs-dialog header="TopLeft" :position="{ X: 'left', Y: 'top' }" width="200px">TopLeft</ejs-dialog>
    <ejs-dialog header="TopCenter" :position="{ X: 'center', Y: 'top' }" width="200px">TopCenter</ejs-dialog>
    <ejs-dialog header="TopRight" :position="{ X: 'right', Y: 'top' }" width="200px">TopRight</ejs-dialog>

    <!-- Middle Row -->
    <ejs-dialog header="LeftCenter" :position="{ X: 'left', Y: 'center' }" width="200px">LeftCenter</ejs-dialog>
    <ejs-dialog header="Center" :position="{ X: 'center', Y: 'center' }" width="200px">Center</ejs-dialog>
    <ejs-dialog header="RightCenter" :position="{ X: 'right', Y: 'center' }" width="200px">RightCenter</ejs-dialog>

    <!-- Bottom Row -->
    <ejs-dialog header="BottomLeft" :position="{ X: 'left', Y: 'bottom' }" width="200px">BottomLeft</ejs-dialog>
    <ejs-dialog header="BottomCenter" :position="{ X: 'center', Y: 'bottom' }" width="200px">BottomCenter</ejs-dialog>
    <ejs-dialog header="BottomRight" :position="{ X: 'right', Y: 'bottom' }" width="200px">BottomRight</ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

## Custom Pixel Positioning

Specify exact pixel coordinates:

```vue
<template>
  <div id="dialog-target" style="position: relative; height: 600px; background: #f5f5f5">
    <p>Click buttons to show dialogs at specific positions</p>

    <!-- Top-left corner (50px, 50px) -->
    <ejs-dialog
      header="Top-Left (50, 50)"
      :position="{ X: 50, Y: 50 }"
      width="250px"
      :visible="showTopLeft"
      target="#dialog-target"
    >
      Custom pixel position: 50px from left, 50px from top
    </ejs-dialog>

    <!-- Center of screen -->
    <ejs-dialog
      header="Center (250, 150)"
      :position="{ X: 250, Y: 150 }"
      width="250px"
      :visible="showCenter"
      target="#dialog-target"
    >
      Custom pixel position: 250px from left, 150px from top
    </ejs-dialog>

    <!-- Bottom-right corner -->
    <ejs-dialog
      header="Bottom-Right (350, 400)"
      :position="{ X: 350, Y: 400 }"
      width="250px"
      :visible="showBottomRight"
      target="#dialog-target"
    >
      Custom pixel position: 350px from left, 400px from top
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      showTopLeft: true,
      showCenter: true,
      showBottomRight: true
    };
  }
};
</script>
```

## Dragging

Enable `allowDragging` to let users move the dialog by its header:

```vue
<template>
  <ejs-dialog
    header="Drag me!"
    :allowDragging="true"
    :position="dragPosition"
    width="300px"
  >
    Click and drag the header to move me around.
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      dragPosition: { X: 200, Y: 150 }
    };
  }
};
</script>
```

**Dragging Events:**

```vue
<template>
  <ejs-dialog
    ref="dialogRef"
    header="Draggable Dialog"
    :allowDragging="true"
    @dragStart="onDragStart"
    @drag="onDrag"
    @dragStop="onDragStop"
  >
    Content
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    onDragStart: function(args) {
      console.log('Dragging started:', args);
    },
    onDrag: function(args) {
      console.log('Dragging:', args);
    },
    onDragStop: function(args) {
      console.log('Dragging stopped:', args);
    }
  }
};
</script>
```

## Resizing

Enable resizing with `enableResize`:

```vue
<template>
  <ejs-dialog
    header="Resizable Dialog"
    :enableResize="true"
    :resizeHandles="resizeHandles"
    width="400px"
    height="300px"
    minHeight="150px"
  >
    Drag the bottom-right corner or edges to resize.
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      resizeHandles: ['All']
    };
  }
};
</script>
```

**Resize Handle Options:**
- `'All'` - All edges and corners
- `'EastWest'` - Left and right edges
- `'NorthSouth'` - Top and bottom edges
- `'NorthEast'` - Top and right corner
- etc.

**Resize Events:**

```vue
<template>
  <ejs-dialog
    @resizeStart="onResizeStart"
    @resize="onResize"
    @resizeStop="onResizeStop"
  >
    Content
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    onResizeStart: function(args) {
      console.log('Resize started');
    },
    onResize: function(args) {
      console.log('Resizing:', args);
    },
    onResizeStop: function(args) {
      console.log('Resize stopped');
    }
  }
};
</script>
```

## Target Element

The `target` prop constrains the dialog within a container:

```vue
<template>
  <div id="dialog-container" style="position: relative; width: 500px; height: 400px; border: 2px solid red; overflow: hidden">
    <p>Dialog is constrained within this red box</p>

    <ejs-dialog
      header="Constrained"
      :allowDragging="true"
      target="#dialog-container"
      width="200px"
    >
      I can only be dragged within the red container.
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  }
};
</script>
```

**Why use target:**
- Keep modeless dialogs in view
- Prevent dialogs from escaping off-screen
- Organize multiple dialogs in a container

## Examples

### Example 1: Floating Properties Panel

```vue
<template>
  <div id="app" style="position: relative; height: 600px; background: #f5f5f5">
    <div style="padding: 20px">
      <h2>Editor</h2>
      <textarea style="width: 400px; height: 200px; padding: 8px"></textarea>
    </div>

    <!-- Floating Properties Panel -->
    <ejs-dialog
      header="Properties"
      :isModal="false"
      :allowDragging="true"
      :enableResize="true"
      :position="panelPosition"
      width="280px"
      target="#app"
    >
      <div style="padding: 16px">
        <div style="margin-bottom: 12px">
          <label>Font Size:</label>
          <input type="number" value="14" min="8" max="32" style="width: 100%; padding: 4px" />
        </div>
        <div style="margin-bottom: 12px">
          <label>Font Color:</label>
          <input type="color" value="#000000" style="width: 100%; padding: 4px" />
        </div>
      </div>
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      panelPosition: { X: 420, Y: 50 }
    };
  }
};
</script>

<style>
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 12px;
}
</style>
```

### Example 2: Sticky Position

```vue
<template>
  <ejs-dialog
    header="Always Visible"
    :position="stickyPosition"
    :isModal="true"
  >
    This stays centered even on window resize.
  </ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      stickyPosition: { X: 'center', Y: 'center' }
    };
  }
};
</script>
```

### Example 3: Positioned Dialogs

```vue
<template>
  <div id="target" style="position: relative; height: 600px; background: #f5f5f5">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 20px">
      <button @click="positions.topLeft = true" class="e-btn">Top-Left</button>
      <button @click="positions.topCenter = true" class="e-btn">Top-Center</button>
      <button @click="positions.topRight = true" class="e-btn">Top-Right</button>
    </div>

    <DialogComponent
      header="Top-Left"
      :position="{ X: 'left', Y: 'top' }"
      :visible="positions.topLeft"
      width="200px"
      target="#target"
      @close="positions.topLeft = false"
    >
      Top-Left Dialog
    </DialogComponent>

    <DialogComponent
      header="Top-Center"
      :position="{ X: 'center', Y: 'top' }"
      :visible="positions.topCenter"
      width="200px"
      target="#target"
      @close="positions.topCenter = false"
    >
      Top-Center Dialog
    </DialogComponent>

    <DialogComponent
      header="Top-Right"
      :position="{ X: 'right', Y: 'top' }"
      :visible="positions.topRight"
      width="200px"
      target="#target"
      @close="positions.topRight = false"
    >
      Top-Right Dialog
    </DialogComponent>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

const positions = reactive({
  topLeft: false,
  topCenter: false,
  topRight: false,
});
</script>
```

## Key Takeaways

- **position** controls dialog placement (preset or pixels)
- **allowDragging** lets users move the dialog
- **enableResize** lets users resize
- **target** constrains within a container
- Use **events** to track drag/resize actions

**Next:** Choose another reference topic based on your needs.
