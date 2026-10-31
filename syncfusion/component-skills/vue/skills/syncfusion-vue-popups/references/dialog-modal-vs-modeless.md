# Modal vs Modeless Dialogs

## Table of Contents
- [Understanding Modal](#understanding-modal)
- [Understanding Modeless](#understanding-modeless)
- [Comparison](#comparison)
- [When to Use Each](#when-to-use-each)
- [Focus Management](#focus-management)
- [Escape Key Behavior](#escape-key-behavior)
- [Examples](#examples)

## Understanding Modal

A **modal dialog** blocks interaction with the rest of the page. The user must interact with the dialog before continuing.

```vue
<template>
  <ejs-dialog
    header="Modal Dialog"
    :isModal="true"
    width="400px"
  >
    You cannot interact with the page behind me.
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

**Characteristics:**
- Overlay/backdrop behind the dialog
- Parent elements are disabled
- User must close dialog to proceed
- Focus trapped in dialog (accessibility)
- Typical use: confirmations, alerts, critical actions

## Understanding Modeless

A **modeless dialog** allows interaction with the page while the dialog is open. It's like a floating window.

```vue
<template>
  <ejs-dialog
    header="Modeless Dialog"
    :isModal="false"
    width="400px"
    :allowDragging="true"
  >
    You can interact with the page behind me!
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

**Characteristics:**
- No overlay/backdrop
- Parent elements remain interactive
- Dialog can be moved around (usually draggable)
- Focus NOT trapped
- Typical use: properties panel, floating toolbar, reference windows

## Comparison

| Aspect | Modal | Modeless |
|--------|-------|----------|
| **User Can Interact Behind** | ❌ No | ✅ Yes |
| **Overlay/Backdrop** | ✅ Yes | ❌ No |
| **Typical Purpose** | Critical decisions | Supplementary info |
| **Focus Behavior** | Trapped | Not trapped |
| **Dragging** | Usually not | Usually yes |
| **Escape Key** | Closes (typically) | Closes (typically) |
| **Examples** | Delete confirmation, alert, form submission | Properties panel, chat window, reference window |

## When to Use Each

### Use Modal When:
- Confirming destructive actions (delete, submit)
- Requiring user input before continuing
- Displaying critical information
- Alert or warning messages
- Form submissions
- Creating new records

### Use Modeless When:
- Displaying optional information
- Properties or settings panel
- Chat or messaging window
- Reference lookup (look up info without closing current task)
- Floating help tooltips
- Draggable settings panels
- Multiple independent windows

## Focus Management

### Modal: Focus Trapped

In a modal dialog, focus stays within the dialog:

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <input type="text" placeholder="Page content" />
    
    <ejs-dialog
      header="Modal - Focus Trapped"
      :isModal="true"
      target="#dialog-target"
      :visible="true"
    >
      <input type="text" placeholder="Dialog input 1" />
      <input type="text" placeholder="Dialog input 2" />
      <!-- Pressing Tab cycles through only these inputs -->
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

**Benefit:** Users can't accidentally interact with behind page while dialog is open.

### Modeless: Focus Free

In a modeless dialog, focus can move to parent page:

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <input type="text" placeholder="Page content - Still usable!" />
    
    <ejs-dialog
      header="Modeless - Focus Free"
      :isModal="false"
      target="#dialog-target"
      :visible="true"
    >
      <input type="text" placeholder="Dialog input" />
      <!-- Can Tab back to page content -->
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

## Escape Key Behavior

Both modal and modeless dialogs close on Escape by default:

```vue
<template>
  <ejs-dialog
    header="Press Escape to Close"
    :isModal="true"
    :closeOnEscape="true"
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
  }
  // Can disable Escape closing:
  // :closeOnEscape="false"
};
</script>
```

## Examples

### Example 1: Modal Confirmation

```vue
<template>
  <div id="dialog-target" style="position: relative; height: 400px">
    <button @click="showDeleteConfirm" class="e-btn e-danger">
      Delete Item
    </button>

    <ejs-dialog
      ref="deleteDialog"
      header="⚠️ Confirm Delete"
      :isModal="true"
      :buttons="deleteButtons"
      target="#dialog-target"
      :visible="false"
    >
      <p>Are you sure you want to delete this item?</p>
      <p style="color: red; font-weight: bold">This action cannot be undone.</p>
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
      deleteButtons: [
        {
          buttonModel: {
            content: 'Delete',
            cssClass: 'e-flat e-danger',
            isPrimary: true
          },
          click: this.handleDelete
        },
        {
          buttonModel: {
            content: 'Cancel',
            cssClass: 'e-flat'
          },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    showDeleteConfirm: function() {
      if (this.$refs.deleteDialog) {
        this.$refs.deleteDialog.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.deleteDialog) {
        this.$refs.deleteDialog.hide();
      }
    },
    handleDelete: function() {
      console.log('Item deleted');
      this.closeDialog();
    }
  }
};
</script>

<style>
#dialog-target {
  background: #f5f5f5;
  padding: 20px;
}
</style>
```

### Example 2: Modeless Properties Panel

```vue
<template>
  <div id="dialog-target" style="position: relative; height: 600px; background: #f5f5f5">
    <div style="padding: 20px">
      <h2>Main Content</h2>
      <p>You can still interact with this area while the properties panel is open.</p>
      <input type="text" placeholder="Type here..." style="width: 300px; padding: 8px" />
    </div>

    <ejs-dialog
      header="Properties"
      :isModal="false"
      :allowDragging="true"
      :enableResize="true"
      :position="dialogPosition"
      width="280px"
      target="#dialog-target"
      :visible="true"
    >
      <div style="padding: 16px">
        <div style="margin-bottom: 12px">
          <label>Color:</label>
          <input type="color" value="#667eea" style="width: 100%" />
        </div>
        <div style="margin-bottom: 12px">
          <label>Size:</label>
          <select style="width: 100%; padding: 4px">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div style="margin-bottom: 12px">
          <label>Opacity:</label>
          <input type="range" min="0" max="100" value="100" style="width: 100%" />
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
      dialogPosition: { X: 400, Y: 200 }
    };
  }
};
</script>

<style>
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
</style>
```

### Example 3: Modal Alert

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="showAlert" class="e-btn e-primary">Show Alert</button>

    <ejs-dialog
      ref="alertDialog"
      header="Alert"
      :isModal="true"
      :buttons="alertButtons"
      target="#dialog-target"
      :visible="false"
    >
      <p style="font-size: 16px; line-height: 1.5">
        Your changes have been saved successfully!
      </p>
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
      alertButtons: [
        {
          buttonModel: {
            content: 'OK',
            cssClass: 'e-flat e-primary',
            isPrimary: true
          },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    showAlert: function() {
      if (this.$refs.alertDialog) {
        this.$refs.alertDialog.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.alertDialog) {
        this.$refs.alertDialog.hide();
      }
    }
  }
};
</script>
```

### Example 4: Modeless Chat Window

```vue
<template>
  <div id="dialog-target" style="position: relative; height: 600px">
    <div style="padding: 20px">
      <h2>Main Work Area</h2>
      <p>Work here while chatting...</p>
    </div>

    <ejs-dialog
      header="💬 Chat"
      :isModal="false"
      :allowDragging="true"
      :position="chatPosition"
      width="300px"
      height="400px"
      target="#dialog-target"
      :visible="true"
    >
      <div style="display: flex; flex-direction: column; height: 100%; padding: 12px">
        <div style="flex: 1; overflow-y: auto; margin-bottom: 12px; border: 1px solid #ddd; padding: 8px">
          <div style="margin-bottom: 8px">
            <strong>Agent:</strong> Hello! How can I help?
          </div>
          <div style="margin-bottom: 8px">
            <strong>You:</strong> I need assistance with my order.
          </div>
        </div>
        <input 
          type="text" 
          placeholder="Type message..." 
          style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px"
        />
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
      chatPosition: { X: 'right', Y: 'bottom' }
    };
  }
};
</script>
```

## Key Takeaways

- **Modal** = critical action confirmation, full user attention required
- **Modeless** = reference info, supplementary tools, non-blocking panels
- **Focus** behavior differs: trapped vs free
- **Escapekey** closes both by default
- Choose based on whether user MUST interact with dialog before continuing

**Next:** Choose another reference topic based on your needs.
