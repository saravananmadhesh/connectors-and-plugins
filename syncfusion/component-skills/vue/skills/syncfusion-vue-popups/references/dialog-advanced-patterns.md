# Advanced Patterns

## Table of Contents
- [Events](#events)
- [Nested Dialogs](#nested-dialogs)
- [Preventing Close](#preventing-close)
- [Full-Screen Dialogs](#full-screen-dialogs)
- [Z-Index Management](#z-index-management)
- [Persistence](#persistence)
- [Common Edge Cases](#common-edge-cases)
- [Examples](#examples)

## Events

DialogComponent emits events during its lifecycle:

| Event | Arguments | When Fires |
|-------|-----------|-----------|
| `open` | `DialogEventArgs` | Dialog becomes visible |
| `close` | `DialogEventArgs` | Dialog becomes hidden |
| `beforeOpen` | `DialogEventArgs` | Before dialog opens (can prevent) |
| `beforeClose` | `DialogEventArgs` | Before dialog closes (can prevent) |
| `drag` | `DialogDragEventArgs` | During drag |
| `dragStart` | `DialogDragEventArgs` | Drag starts |
| `dragStop` | `DialogDragEventArgs` | Drag ends |
| `resizeStart` | `DialogResizeEventArgs` | Resize starts |
| `resize` | `DialogResizeEventArgs` | During resize |
| `resizeStop` | `DialogResizeEventArgs` | Resize ends |

### Event Handling

```vue
<template>
  <div>
    <ejs-dialog
      header="Events Demo"
      @open="onOpen"
      @close="onClose"
      @beforeOpen="onBeforeOpen"
      @beforeClose="onBeforeClose"
      @drag="onDrag"
      @dragStart="onDragStart"
      @dragStop="onDragStop"
    >
      <p>Open browser console to see events</p>
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
  methods: {
    onOpen: function(args) {
      console.log('Dialog opened', args);
    },
    onClose: function(args) {
      console.log('Dialog closed', args);
    },
    onBeforeOpen: function(args) {
      console.log('Before open', args);
      // Can set args.cancel = true to prevent opening
    },
    onBeforeClose: function(args) {
      console.log('Before close', args);
      // Can set args.cancel = true to prevent closing
    },
    onDrag: function(args) {
      console.log('Dragging', args);
    },
    onDragStart: function(args) {
      console.log('Drag started', args);
    },
    onDragStop: function(args) {
      console.log('Drag ended', args);
    }
  }
};
</script>
```

## Nested Dialogs

Create dialogs within dialogs:

```vue
<template>
  <div id="target" style="position: relative; height: 600px">
    <button @click="showParent" class="e-btn">Open Parent</button>

    <!-- Parent Dialog -->
    <ejs-dialog
      ref="parentDialog"
      header="Parent Dialog"
      target="#target"
      :visible="false"
      :buttons="parentButtons"
    >
      <p>I am the parent dialog</p>

      <!-- Child Dialog inside Parent -->
      <ejs-dialog
        ref="childDialog"
        header="Child Dialog"
        target="#target"
        :visible="false"
        :buttons="childButtons"
      >
        <p>I am the child dialog, nested within parent</p>
      </ejs-dialog>
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
      parentButtons: [
        {
          buttonModel: { content: 'Open Child', cssClass: 'e-flat', isPrimary: true },
          click: this.showChild
        },
        {
          buttonModel: { content: 'Close', cssClass: 'e-flat' },
          click: this.closeParent
        }
      ],
      childButtons: [
        {
          buttonModel: { content: 'Close', cssClass: 'e-flat', isPrimary: true },
          click: this.closeChild
        }
      ]
    };
  },
  methods: {
    showParent: function() {
      if (this.$refs.parentDialog) {
        this.$refs.parentDialog.show();
      }
    },
    showChild: function() {
      if (this.$refs.childDialog) {
        this.$refs.childDialog.show();
      }
    },
    closeParent: function() {
      if (this.$refs.parentDialog) {
        this.$refs.parentDialog.hide();
      }
    },
    closeChild: function() {
      if (this.$refs.childDialog) {
        this.$refs.childDialog.hide();
      }
    }
  }
};
</script>
```

## Preventing Close

Use `beforeClose` event to prevent closing:

```vue
<template>
  <ejs-dialog
    ref="formDialog"
    header="Prevent Close"
    @beforeClose="onBeforeClose"
  >
    <div style="padding: 16px">
      <p>Make a change and try closing without saving</p>
      <input v-model="data" type="text" style="width: 100%; padding: 8px" />
      <p v-if="data !== originalData" style="color: red">You have unsaved changes!</p>
    </div>
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
      data: 'Original value',
      originalData: 'Original value'
    };
  },
  methods: {
    onBeforeClose: function(args) {
      if (this.data !== this.originalData) {
        const proceed = confirm('You have unsaved changes. Close anyway?');
        args.cancel = !proceed;  // Prevent closing if user clicks Cancel
      }
    }
  }
};
</script>
```

## Full-Screen Dialogs

Create a dialog that covers the entire screen:

```vue
<template>
  <ejs-dialog
    header="Full Screen Dialog"
    width="100%"
    height="100%"
    :position="{ X: 0, Y: 0 }"
    target="body"
  >
    <div style="padding: 40px">
      <h1>Full Screen Content</h1>
      <p>This dialog covers the entire viewport</p>
    </div>
  </ejs-dialog>
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

## Z-Index Management

Control stacking order of multiple dialogs:

```vue
<template>
  <div id="target" style="position: relative; height: 600px">
    <button @click="show1" class="e-btn">Dialog 1</button>
    <button @click="show2" class="e-btn">Dialog 2</button>
    <button @click="show3" class="e-btn">Dialog 3</button>

    <ejs-dialog
      ref="dialog1"
      header="Dialog 1"
      :zIndex="1000"
      :position="{ X: 50, Y: 100 }"
      target="#target"
      :visible="false"
    >
      Dialog 1 content
    </ejs-dialog>

    <ejs-dialog
      ref="dialog2"
      header="Dialog 2"
      :zIndex="1001"
      :position="{ X: 150, Y: 150 }"
      target="#target"
      :visible="false"
    >
      Dialog 2 content
    </ejs-dialog>

    <ejs-dialog
      ref="dialog3"
      header="Dialog 3"
      :zIndex="1002"
      :position="{ X: 250, Y: 200 }"
      target="#target"
      :visible="false"
    >
      Dialog 3 content
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
  methods: {
    show1: function() {
      if (this.$refs.dialog1) {
        this.$refs.dialog1.show();
      }
    },
    show2: function() {
      if (this.$refs.dialog2) {
        this.$refs.dialog2.show();
      }
    },
    show3: function() {
      if (this.$refs.dialog3) {
        this.$refs.dialog3.show();
      }
    }
  }
};
</script>
```

## Persistence

Enable `enablePersistence` to remember dialog size/position:

```vue
<template>
  <ejs-dialog
    header="Persistent Settings"
    :enablePersistence="true"
    :allowDragging="true"
    :enableResize="true"
  >
    <p>Drag me around and resize me.</p>
    <p>Close and reload the page - my position and size are remembered!</p>
  </ejs-dialog>
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

## Common Edge Cases

### Dialog Content Doesn't Update

```vue
<!-- ✓ Correct: Reactive state -->
<ejs-dialog :visible="isOpen">
  Count: {{ count }}
  <button @click="incrementCount">Increment</button>
</ejs-dialog>

<!-- ✗ Wrong: Static reference doesn't update -->
<ejs-dialog :visible="isOpen" ref="dialogRef">
  <!-- Content won't update if you only use ref -->
</ejs-dialog>

<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  data: function() {
    return {
      isOpen: false,
      count: 0
    };
  },
  methods: {
    incrementCount: function() {
      this.count++;
    }
  }
};
</script>
```

### Dialog Behind Other Elements

```vue
<script>
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    'ejs-dialog': DialogComponent
  },
  methods: {
    onClickDialog: function() {
      // Increase z-index to bring to front
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.zIndex = 10000;
      }
    }
  }
};
</script>
```

### Dialog Ref Not Ready

```vue
<!-- ✓ Always use ref check -->
this.$refs.dialogRef.show();

<!-- ✗ May crash if ref is null -->
this.$refs.dialogRef.show();
```

## Examples

### Example 1: Event Tracking

```vue
<template>
  <div>
    <div style="margin-bottom: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
      <h3>Events Log:</h3>
      <div style="max-height: 200px; overflow-y: auto; font-size: 12px">
        <div v-for="(log, idx) in events" :key="idx" style="padding: 4px">
          {{ log }}
        </div>
      </div>
      <button @click="clearEvents" class="e-btn" style="margin-top: 8px">Clear</button>
    </div>

    <button @click="showDialog" class="e-btn">Open Dialog</button>

    <ejs-dialog
      ref="dialogRef"
      header="Event Tracking"
      :allowDragging="true"
      :enableResize="true"
      @open="logEvent('open')"
      @close="logEvent('close')"
      @beforeOpen="logEvent('beforeOpen')"
      @beforeClose="logEvent('beforeClose')"
      @dragStart="logEvent('dragStart')"
      @dragStop="logEvent('dragStop')"
    >
      Interact with me to see events
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
      events: []
    };
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    logEvent: function(eventName) {
      const timestamp = new Date().toLocaleTimeString();
      this.events.unshift(timestamp + ' - ' + eventName);
    },
    clearEvents: function() {
      this.events = [];
    }
  }
};
</script>
```

### Example 2: Multi-Step Wizard

```vue
<template>
  <button @click="showWizard" class="e-btn">Start Wizard</button>

  <ejs-dialog
    ref="wizardDialog"
    :header="'Step ' + currentStep + ' of 3'"
    :buttons="wizardButtons"
    width="500px"
    :visible="false"
  >
    <!-- Step 1 -->
    <div v-if="currentStep === 1" style="padding: 20px">
      <h3>Personal Information</h3>
      <input v-model="wizard.name" placeholder="Full Name" style="width: 100%; padding: 8px; margin-bottom: 10px" />
      <input v-model="wizard.email" placeholder="Email" style="width: 100%; padding: 8px" />
    </div>

    <!-- Step 2 -->
    <div v-if="currentStep === 2" style="padding: 20px">
      <h3>Address</h3>
      <input v-model="wizard.address" placeholder="Street Address" style="width: 100%; padding: 8px; margin-bottom: 10px" />
      <input v-model="wizard.city" placeholder="City" style="width: 100%; padding: 8px" />
    </div>

    <!-- Step 3 -->
    <div v-if="currentStep === 3" style="padding: 20px">
      <h3>Confirmation</h3>
      <pre>{{ JSON.stringify(wizard, null, 2) }}</pre>
    </div>
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
      currentStep: 1,
      wizard: {
        name: '',
        email: '',
        address: '',
        city: ''
      }
    };
  },
  computed: {
    wizardButtons: function() {
      const buttons = [];

      if (this.currentStep > 1) {
        buttons.push({
          buttonModel: { content: 'Back', cssClass: 'e-flat' },
          click: this.prevStep
        });
      }

      if (this.currentStep < 3) {
        buttons.push({
          buttonModel: { content: 'Next', cssClass: 'e-flat', isPrimary: true },
          click: this.nextStep
        });
      } else {
        buttons.push({
          buttonModel: { content: 'Finish', cssClass: 'e-flat', isPrimary: true },
          click: this.finishWizard
        });
      }

      buttons.push({
        buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
        click: this.cancelWizard
      });

      return buttons;
    }
  },
  methods: {
    showWizard: function() {
      this.currentStep = 1;
      if (this.$refs.wizardDialog) {
        this.$refs.wizardDialog.show();
      }
    },
    nextStep: function() {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    prevStep: function() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    finishWizard: function() {
      console.log('Wizard complete:', this.wizard);
      if (this.$refs.wizardDialog) {
        this.$refs.wizardDialog.hide();
      }
    },
    cancelWizard: function() {
      if (this.$refs.wizardDialog) {
        this.$refs.wizardDialog.hide();
      }
    }
  }
};
</script>
```

## Key Takeaways

- **Events** enable custom logic on dialog lifecycle
- **Nested dialogs** support complex workflows
- **beforeClose** event prevents unwanted closes
- **Z-index** manages overlapping dialogs
- **Persistence** remembers user preferences
- **Edge cases** require defensive coding patterns

**Next:** Choose another reference topic based on your needs.
