# Buttons and Actions

## Table of Contents
- [Built-in Button Support](#built-in-button-support)
- [Button Model Properties](#button-model-properties)
- [Click Event Handlers](#click-event-handlers)
- [Icon Buttons](#icon-buttons)
- [Styling Buttons](#styling-buttons)
- [Primary and Secondary Buttons](#primary-and-secondary-buttons)
- [Common Patterns](#common-patterns)
- [Edge Cases](#edge-cases)

## Built-in Button Support

The Dialog supports built-in footer buttons via the `buttons` property:

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="openDialog" class="e-control e-btn e-primary">Open</button>

    <ejs-dialog
      ref="dialogRef"
      header="Confirmation"
      :buttons="buttons"
      target="#dialog-target"
    >
      Are you sure?
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
      buttons: [
        {
          buttonModel: {
            content: 'OK',
            cssClass: 'e-flat',
            isPrimary: true
          },
          click: this.handleOk
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
    openDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    handleOk: function() {
      console.log('OK clicked');
      this.closeDialog();
    }
  }
};
</script>
```

## Button Model Properties

Each button in the array has a `buttonModel` object:

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Button text/label |
| `cssClass` | string | CSS classes (e.g., 'e-flat', 'e-outline') |
| `isPrimary` | boolean | Highlight as primary action |
| `isDisabled` | boolean | Disable button |
| `iconCss` | string | Icon class (Font Awesome, Material Icons) |
| `id` | string | Button HTML id |

### Example with Full Properties

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Actions">
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
          buttonModel: {
            content: 'Save',
            cssClass: 'e-flat e-primary',
            isPrimary: true,
            iconCss: 'e-icons e-save',
            id: 'save-btn'
          },
          click: this.handleSave
        },
        {
          buttonModel: {
            content: 'Delete',
            cssClass: 'e-flat e-danger',
            iconCss: 'e-icons e-delete',
            id: 'delete-btn'
          },
          click: this.handleDelete
        }
      ]
    };
  },
  methods: {
    handleSave: function() {
      console.log('Save clicked');
    },
    handleDelete: function() {
      console.log('Delete clicked');
    }
  }
};
</script>
```

## Click Event Handlers

Each button has a `click` callback:

```vue
<template>
  <ejs-dialog ref="dialogRef" :buttons="buttons" header="Submit">
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
          buttonModel: { content: 'Submit', isPrimary: true, cssClass: 'e-flat' },
          click: this.handleSubmit
        }
      ]
    };
  },
  methods: {
    handleSubmit: function() {
      console.log('Submit clicked');
      // Perform action
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    }
  }
};
</script>
```

### Access Button Data in Handler

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Actions">
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
          buttonModel: { content: 'Action 1', cssClass: 'e-flat' },
          click: this.handleAction
        }
      ]
    };
  },
  methods: {
    handleAction: function(event) {
      // event.target refers to the button element
      console.log(event.target.textContent); // "Action 1"
    }
  }
};
</script>
```

### Multiple Actions

```vue
<template>
  <ejs-dialog ref="dialogRef" :buttons="buttons" header="Apply">
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
          buttonModel: { content: 'Apply', isPrimary: true, cssClass: 'e-flat' },
          click: this.handleApply
        }
      ]
    };
  },
  methods: {
    handleApply: function() {
      console.log('Apply clicked');
      this.saveData();
      this.refreshUI();
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    saveData: function() {
      console.log('Data saved');
    },
    refreshUI: function() {
      console.log('UI refreshed');
    }
  }
};
</script>
```

## Icon Buttons

### With Syncfusion Icons

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Actions">
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
          buttonModel: {
            content: 'Save',
            cssClass: 'e-flat',
            iconCss: 'e-icons e-save'
          },
          click: this.handleSave
        },
        {
          buttonModel: {
            content: 'Delete',
            cssClass: 'e-flat',
            iconCss: 'e-icons e-delete'
          },
          click: this.handleDelete
        }
      ]
    };
  },
  methods: {
    handleSave: function() {
      console.log('Save');
    },
    handleDelete: function() {
      console.log('Delete');
    }
  }
};
</script>
```

### Available Syncfusion Icons

- `e-save` - Save icon
- `e-delete` - Delete icon
- `e-edit` - Edit icon
- `e-update` - Update/refresh icon
- `e-print` - Print icon
- `e-export` - Export icon
- `e-close` - Close icon
- `e-search` - Search icon
- `e-settings` - Settings icon

### Font Awesome Icons

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Actions">
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
          buttonModel: {
            content: 'Download',
            cssClass: 'e-flat',
            iconCss: 'fa fa-download'
          },
          click: this.handleDownload
        },
        {
          buttonModel: {
            content: 'Share',
            cssClass: 'e-flat',
            iconCss: 'fa fa-share'
          },
          click: this.handleShare
        }
      ]
    };
  },
  methods: {
    handleDownload: function() {
      console.log('Download');
    },
    handleShare: function() {
      console.log('Share');
    }
  }
};
</script>
```

### Material Icons

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Actions">
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
          buttonModel: {
            content: '<span class="material-icons">favorite</span> Favorite',
            cssClass: 'e-flat',
            iconCss: 'material-icons'
          },
          click: this.handleFavorite
        }
      ]
    };
  },
  methods: {
    handleFavorite: function() {
      console.log('Favorite');
    }
  }
};
</script>
```

## Styling Buttons

### CSS Classes

Built-in classes:
- `e-flat` - Flat button style
- `e-outline` - Outline style
- `e-primary` - Primary theme color (combine with isPrimary)
- `e-danger` - Red danger style
- `e-success` - Green success style
- `e-warning` - Yellow warning style
- `e-info` - Blue info style
- `e-small` - Smaller button
- `e-large` - Larger button

### Styling Examples

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Styling">
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
          buttonModel: {
            content: 'Primary',
            cssClass: 'e-flat e-primary',
            isPrimary: true
          },
          click: this.handlePrimary
        },
        {
          buttonModel: {
            content: 'Danger',
            cssClass: 'e-flat e-danger'
          },
          click: this.handleDanger
        },
        {
          buttonModel: {
            content: 'Success',
            cssClass: 'e-flat e-success'
          },
          click: this.handleSuccess
        }
      ]
    };
  },
  methods: {
    handlePrimary: function() {},
    handleDanger: function() {},
    handleSuccess: function() {}
  }
};
</script>
```

### Custom CSS

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Custom">
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
          buttonModel: {
            content: 'Custom',
            cssClass: 'my-custom-button'
          },
          click: this.handleCustom
        }
      ]
    };
  },
  methods: {
    handleCustom: function() {}
  }
};
</script>

<style>
.my-custom-button {
  background: linear-gradient(to right, #667eea, #764ba2) !important;
  color: white !important;
  border: none !important;
  font-weight: bold !important;
}

.my-custom-button:hover {
  opacity: 0.8;
}
</style>
```

## Primary and Secondary Buttons

### Marking Primary Action

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Save">
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
          buttonModel: {
            content: 'Save',
            cssClass: 'e-flat',
            isPrimary: true  // Highlighted as main action
          },
          click: this.handleSave
        },
        {
          buttonModel: {
            content: 'Cancel',
            cssClass: 'e-flat',
            isPrimary: false  // Secondary action
          },
          click: this.handleCancel
        }
      ]
    };
  },
  methods: {
    handleSave: function() {
      console.log('Save clicked');
    },
    handleCancel: function() {
      console.log('Cancel clicked');
    }
  }
};
</script>
```

**Visual difference:** Primary button has different background color.

### Confirmation Pattern

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Delete">
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
          buttonModel: {
            content: 'Delete',
            cssClass: 'e-flat e-danger',
            isPrimary: true  // Dangerous action as primary
          },
          click: this.handleDelete
        },
        {
          buttonModel: {
            content: 'Cancel',
            cssClass: 'e-flat'
          },
          click: this.handleCancel
        }
      ]
    };
  },
  methods: {
    handleDelete: function() {
      console.log('Delete confirmed');
    },
    handleCancel: function() {
      console.log('Cancelled');
    }
  }
};
</script>
```

## Common Patterns

### Pattern 1: OK/Cancel Dialog

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="openDialog" class="e-control e-btn e-primary">Confirm</button>
    <ejs-dialog
      ref="dialogRef"
      header="Confirm Action"
      :buttons="buttons"
      target="#dialog-target"
    >
      Proceed with this action?
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
      buttons: [
        {
          buttonModel: { content: 'OK', isPrimary: true, cssClass: 'e-flat' },
          click: this.handleOk
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    openDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    handleOk: function() {
      console.log('Confirmed');
      this.closeDialog();
    }
  }
};
</script>
```

### Pattern 2: Yes/No Dialog

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Yes/No">
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
          buttonModel: { content: 'Yes', isPrimary: true, cssClass: 'e-flat e-success' },
          click: this.handleYes
        },
        {
          buttonModel: { content: 'No', cssClass: 'e-flat' },
          click: this.handleNo
        }
      ]
    };
  },
  methods: {
    handleYes: function() {
      console.log('Yes clicked');
    },
    handleNo: function() {
      console.log('No clicked');
    }
  }
};
</script>
```

### Pattern 3: Multiple Actions

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Save">
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
          buttonModel: { content: 'Save', isPrimary: true, cssClass: 'e-flat' },
          click: this.handleSave
        },
        {
          buttonModel: { content: 'Save As', cssClass: 'e-flat' },
          click: this.handleSaveAs
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.handleCancel
        }
      ]
    };
  },
  methods: {
    handleSave: function() {
      console.log('Save clicked');
    },
    handleSaveAs: function() {
      console.log('Save As clicked');
    },
    handleCancel: function() {
      console.log('Cancel clicked');
    }
  }
};
</script>
```

### Pattern 4: Single Button (Alert)

```vue
<template>
  <ejs-dialog ref="dialogRef" :buttons="buttons" header="Alert">
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
          buttonModel: { content: 'OK', isPrimary: true, cssClass: 'e-flat' },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    }
  }
};
</script>
```

### Pattern 5: Form Actions

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Form">
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
          buttonModel: { content: 'Submit', isPrimary: true, cssClass: 'e-flat' },
          click: this.handleSubmit
        },
        {
          buttonModel: { content: 'Reset', cssClass: 'e-flat' },
          click: this.handleReset
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.handleCancel
        }
      ]
    };
  },
  methods: {
    handleSubmit: function() {
      console.log('Form submitted');
    },
    handleReset: function() {
      console.log('Form reset');
    },
    handleCancel: function() {
      console.log('Form cancelled');
    }
  }
};
</script>
```

### Pattern 6: Delete Dialog (Danger Pattern)

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="openDialog" class="e-control e-btn e-primary">Delete</button>
    <ejs-dialog
      ref="dialogRef"
      header="⚠️ Delete Item"
      :buttons="buttons"
      :isModal="true"
      target="#dialog-target"
    >
      This action cannot be undone. Continue?
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
      buttons: [
        {
          buttonModel: {
            content: 'Delete',
            cssClass: 'e-flat e-danger',
            isPrimary: true
          },
          click: this.handleDelete
        },
        {
          buttonModel: { content: 'Cancel', cssClass: 'e-flat' },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    openDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
      }
    },
    handleDelete: function() {
      this.performDelete();
      this.closeDialog();
    },
    performDelete: function() {
      console.log('Item deleted');
    }
  }
};
</script>
```

## Edge Cases

### Disabled Buttons

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Submit">
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
      isLoading: false,
      buttons: [
        {
          buttonModel: {
            content: 'Submit',
            cssClass: 'e-flat',
            isPrimary: true,
            isDisabled: false  // Will be updated reactively
          },
          click: this.handleSubmit
        }
      ]
    };
  },
  methods: {
    handleSubmit: async function() {
      this.isLoading = true;
      this.buttons[0].buttonModel.isDisabled = true;
      try {
        await this.performAction();
      } finally {
        this.isLoading = false;
        this.buttons[0].buttonModel.isDisabled = false;
      }
    },
    performAction: async function() {
      // Async action
    }
  }
};
</script>
```

### Button with Loading State

```vue
<template>
  <ejs-dialog ref="dialogRef" :buttons="buttons" header="Submit Form">
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
      isSubmitting: false,
      buttons: [
        {
          buttonModel: {
            content: 'Submit',
            cssClass: 'e-flat',
            isPrimary: true
          },
          click: this.handleSubmit
        }
      ]
    };
  },
  computed: {
    buttonContent: function() {
      return this.isSubmitting ? 'Submitting...' : 'Submit';
    }
  },
  methods: {
    handleSubmit: async function() {
      this.isSubmitting = true;
      this.buttons[0].buttonModel.content = this.buttonContent;
      try {
        await this.submitForm();
        if (this.$refs.dialogRef) {
          this.$refs.dialogRef.hide();
        }
      } finally {
        this.isSubmitting = false;
        this.buttons[0].buttonModel.content = 'Submit';
      }
    },
    submitForm: async function() {
      // Async form submission
    }
  }
};
</script>
```

### No Buttons (Footer Template Only)

Use footer slot if you need complete control and don't want built-in buttons:

```vue
<template>
  <ejs-dialog header="Custom Footer" :isModal="true">
    <template #footer>
      <div style="display: flex; gap: 10px; justify-content: flex-end; padding: 15px">
        <button class="e-control e-btn">Custom 1</button>
        <button class="e-control e-btn">Custom 2</button>
      </div>
    </template>
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
};
</script>
```

### Very Long Button Text

```vue
<template>
  <ejs-dialog :buttons="buttons" header="Long Text">
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
          buttonModel: {
            content: 'This is a very long button label that might wrap',
            cssClass: 'e-flat'
          },
          click: this.handleClick
        }
      ]
    };
  },
  methods: {
    handleClick: function() {
      console.log('Clicked');
    }
  }
};
</script>

<style>
.e-dialog .e-footer .e-btn {
  min-width: 100px;
}
</style>
```

### Dynamic Button Properties

```vue
<template>
  <div id="dialog-target" style="position: relative">
    <button @click="openDialog" class="e-control e-btn e-primary">Show</button>
    <ejs-dialog
      ref="dialogRef"
      header="Counter"
      :buttons="buttons"
      target="#dialog-target"
    >
      Click the button below to count
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
      count: 0
    };
  },
  computed: {
    buttonLabel: function() {
      return 'Clicked ' + this.count + ' times';
    },
    buttons: function() {
      return [
        {
          buttonModel: {
            content: this.buttonLabel,
            cssClass: 'e-flat'
          },
          click: this.incrementCount
        }
      ];
    }
  },
  methods: {
    openDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    incrementCount: function() {
      this.count++;
    }
  }
};
</script>
```

**Next:** Choose another reference topic based on your needs.
