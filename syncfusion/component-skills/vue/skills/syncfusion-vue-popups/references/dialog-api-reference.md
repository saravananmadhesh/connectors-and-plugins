# API Reference

## DialogModel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isModal` | boolean | false | Enable modal mode (blocks parent) |
| `visible` | boolean | false | Initial visibility state |
| `header` | string | '' | Dialog title/header text |
| `content` | string | '' | Dialog body content |
| `buttons` | ButtonPropsModel[] | [] | Footer action buttons |
| `footerTemplate` | Template | - | Custom footer slot |
| `showCloseIcon` | boolean | false | Show close button in header |
| `closeOnEscape` | boolean | true | Close on Escape key |
| `width` | string \| number | '330px' | Dialog width |
| `height` | string \| number | 'auto' | Dialog height |
| `minHeight` | string \| number | - | Minimum height during resize |
| `minWidth` | string \| number | - | Minimum width during resize |
| `maxHeight` | string \| number | - | Maximum height |
| `maxWidth` | string \| number | - | Maximum width |
| `position` | PositionData | { X: 'center', Y: 'center' } | Positioning (presets or pixels) |
| `allowDragging` | boolean | false | Enable drag functionality |
| `enableResize` | boolean | false | Enable resize functionality |
| `resizeHandles` | ResizeDirections[] | ['All'] | Which edges/corners resize |
| `target` | string | 'body' | Container selector |
| `animationSettings` | AnimationSettingsModel | - | Open/close animation |
| `cssClass` | string | '' | Custom CSS classes |
| `locale` | string | 'en-US' | Language/culture code |
| `enableRtl` | boolean | false | Right-to-left rendering |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML for XSS prevention |
| `zIndex` | number | auto | Stack order |
| `enablePersistence` | boolean | false | Persist size/position |

## ButtonPropsModel Structure

```typescript
{
  buttonModel: {
    content: string,              // Button text
    cssClass: string,             // CSS classes
    isPrimary: boolean,           // Primary button styling
    isDisabled: boolean,          // Disabled state
    iconCss: string,              // Icon CSS class
    id: string,                   // HTML id attribute
  },
  click: () => void               // Click handler
}
```

### Button CSS Classes

- `e-flat` - Flat button style
- `e-outline` - Outline style
- `e-primary` - Primary color
- `e-danger` - Red/danger color
- `e-success` - Green/success color
- `e-warning` - Yellow/warning color
- `e-info` - Blue/info color
- `e-small` - Smaller size
- `e-large` - Larger size

## AnimationSettingsModel

```typescript
{
  effect: 'Fade' | 'FadeZoom' | 'Flip' | 'FlipLeftDown' | 'FlipLeftUp' |
          'FlipRightDown' | 'FlipRightUp' | 'FlipXDown' | 'FlipXUp' |
          'FlipYLeft' | 'FlipYRight' | 'Zoom' | 'ZoomIn' | 'ZoomOut' |
          'SlideDown' | 'SlideUp' | 'None',
  duration: number,               // Milliseconds (default: 400)
  delay: number                   // Milliseconds (default: 0)
}
```

## PositionData

```typescript
{
  X: 'left' | 'center' | 'right' | number,
  Y: 'top' | 'center' | 'bottom' | number
}
```

### Position Presets
- TopLeft, TopCenter, TopRight
- LeftCenter, Center, RightCenter
- BottomLeft, BottomCenter, BottomRight

## Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `open` | `DialogEventArgs` | Fired when dialog opens |
| `close` | `DialogEventArgs` | Fired when dialog closes |
| `beforeOpen` | `DialogEventArgs` | Fired before opening (cancelable) |
| `beforeClose` | `DialogEventArgs` | Fired before closing (cancelable) |
| `drag` | `DialogDragEventArgs` | Fired during dragging |
| `dragStart` | `DialogDragEventArgs` | Fired when drag starts |
| `dragStop` | `DialogDragEventArgs` | Fired when drag stops |
| `resizeStart` | `DialogResizeEventArgs` | Fired when resize starts |
| `resize` | `DialogResizeEventArgs` | Fired during resizing |
| `resizeStop` | `DialogResizeEventArgs` | Fired when resize stops |

## Methods

### show()
Display the dialog

```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    show: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    }
  }
};
</script>
```

### hide()
Hide the dialog

```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    hide: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    }
  }
};
</script>
```

### refresh()
Refresh the dialog (recalculate positions)

```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    refresh: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.refresh();
      }
    }
  }
};
</script>
```

### destroy()
Destroy and clean up the dialog

```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    destroy: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.destroy();
      }
    }
  }
};
</script>
```

## Template Slots

### Default Slot (Content)
```vue
<ejs-dialog header="Title">
  <!-- Content goes here -->
</ejs-dialog>
```

### Header Slot
```vue
<ejs-dialog>
  <template #header>
    <!-- Custom header -->
  </template>
</ejs-dialog>
```

### Footer Slot
```vue
<ejs-dialog>
  <template #footer>
    <!-- Custom footer -->
  </template>
</ejs-dialog>
```

## Common Patterns

### Initialize from ref
```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
</template>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  mounted: function() {
    // Access dialog methods after mount
    if (this.$refs.dialogRef) {
      this.$refs.dialogRef.show();
    }
  }
};
</script>
```

### Prevent Close with Validation
```vue
<template>
  <ejs-dialog :beforeClose="onBeforeClose">
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
  data: function() {
    return {
      isFormValid: false
    };
  },
  methods: {
    onBeforeClose: function(args) {
      if (!this.isFormValid) {
        args.cancel = true;
      }
    }
  }
};
</script>
```

### Dynamic Buttons
```vue
<template>
  <ejs-dialog :buttons="dynamicButtons" header="Dynamic Buttons">
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
  data: function() {
    return {
      dynamicLabel: 'Click Me'
    };
  },
  computed: {
    dynamicButtons: function() {
      return [
        {
          buttonModel: { content: this.dynamicLabel },
          click: this.handleClick
        }
      ];
    }
  },
  methods: {
    handleClick: function() {
      console.log('Button clicked');
    }
  }
};
</script>
```

### Watch for Visibility Changes
```vue
<template>
  <ejs-dialog ref="dialogRef" header="Title">Content</ejs-dialog>
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
      isDialogOpen: false
    };
  },
  watch: {
    isDialogOpen: function(newVal) {
      if (this.$refs.dialogRef) {
        if (newVal) {
          this.$refs.dialogRef.show();
        } else {
          this.$refs.dialogRef.hide();
        }
      }
    }
  }
};
</script>
```

## Examples

### Complete TypeScript Setup
```vue
<template>
  <button @click="showDialog" class="e-btn">Open</button>

  <ejs-dialog
    ref="dialogRef"
    header="TypeScript Dialog"
    :buttons="buttons"
    width="400px"
    :visible="false"
    @open="onDialogOpen"
    @close="onDialogClose"
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
  data: function() {
    return {
      buttons: [
        {
          buttonModel: { content: 'OK', cssClass: 'e-flat', isPrimary: true },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    onDialogOpen: function(args) {
      console.log('Dialog opened');
    },
    onDialogClose: function(args) {
      console.log('Dialog closed');
    }
  }
};
</script>
```

### Full Featured Dialog
```vue
<template>
  <div id="app">
    <button @click="showDialog">Show Dialog</button>

    <ejs-dialog
      ref="dialogRef"
      header="Full Featured"
      :isModal="true"
      :buttons="buttons"
      :allowDragging="true"
      :enableResize="true"
      :position="dialogPosition"
      :animationSettings="animationSettings"
      width="500px"
      :visible="false"
      locale="en-US"
      :enablePersistence="true"
      @beforeOpen="onBeforeOpen"
      @beforeClose="onBeforeClose"
      @open="onOpen"
      @close="onClose"
    >
      <div style="padding: 20px">
        <p>Full featured dialog with all capabilities</p>
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
      dialogPosition: { X: 'center', Y: 'center' },
      animationSettings: { effect: 'Zoom', duration: 400, delay: 0 }
    };
  },
  computed: {
    buttons: function() {
      return [
        {
          buttonModel: { content: 'Save', cssClass: 'e-flat', isPrimary: true },
          click: this.saveDialog
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.closeDialog
        }
      ];
    }
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    saveDialog: function() {
      console.log('Save clicked');
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    onBeforeOpen: function(args) {
      console.log('Before open');
    },
    onBeforeClose: function(args) {
      console.log('Before close');
    },
    onOpen: function(args) {
      console.log('Opened');
    },
    onClose: function(args) {
      console.log('Closed');
    }
  }
};
</script>
```

**Next:** Choose another reference topic based on your needs.
