# Getting Started with Vue Dialog

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Implementation](#basic-implementation)
- [Using DialogComponent with Refs](#using-dialogcomponent-with-refs)
- [Show and Hide Methods](#show-and-hide-methods)
- [Composition API Pattern](#composition-api-pattern)
- [Initial Visibility](#initial-visibility)

## Installation

Install the required packages from Syncfusion:

```bash
npm install @syncfusion/ej2-vue-popups @syncfusion/ej2-base
```

### Package Structure

- `@syncfusion/ej2-vue-popups` - Vue wrapper for popups (includes Dialog)
- `@syncfusion/ej2-base` - Base styles and utilities

## CSS Imports

Import theme CSS in your component. Choose one theme:

**Material Theme (Default):**
```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";
</style>
```

**Note:** Always import base styles first, then component-specific styles.

## Basic Implementation

The simplest Dialog displays content with a header:

```vue
<template>
  <div id="target">
    <ejs-dialog
      target='#target'
      content="This is dialog content"
      width="300px"
    >
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

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

#target {
    height: 100%;
    min-height: 200px;
}
</style>
```

**Key Properties:**
- `header` - Dialog title (required)
- `width` - Dialog width (default: '330px')
- `visible` - Initial visibility (default: false)
- Children content becomes the dialog body

## Using DialogComponent with Refs

To control dialog visibility programmatically, use refs:

```vue
<template>
  <div id="target">
    <button @click="handleOpen" class="e-control e-btn e-primary">
      Open Dialog
    </button>

    <ejs-dialog
      ref="dialogRef"
      target='#target'
      header="Contact Form"
      content="Email: user@example.com"
      width="400px"
    >
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
    handleOpen: function() {
      this.$refs.dialogRef.show();
    },
    handleClose: function() {
      this.$refs.dialogRef.hide();
    }
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

#target {
    height: 100%;
    min-height: 200px;
}
</style>
```

**Methods:**
- `show()` - Display the dialog
- `hide()` - Hide the dialog
- Access via `dialogRef.value?.method()`

## Show and Hide Methods

You can control dialog visibility with ref methods:

```vue
<script>
export default {
  methods: {
    // Show the dialog
    openDialog: function() {
      this.$refs.dialogRef.show();
    },

    // Hide the dialog
    closeDialog: function() {
      this.$refs.dialogRef.hide();
    },

    // Toggle visibility
    toggleDialog: function() {
      if (this.$refs.dialogRef) {
        const isVisible = this.$refs.dialogRef.visible;
        isVisible ? this.$refs.dialogRef.hide() : this.$refs.dialogRef.show();
      }
    }
  }
}
</script>
```

**Important:** Check if the ref exists before calling methods. Access dialog methods via `this.$refs.dialogRef.method()`.

## Options API Pattern

Vue 2 uses the Options API with component registration:

```vue
<template>
  <div id="target" style="padding: 20px">
    <button @click="handleOpen" class="e-control e-btn e-primary">
      Open Form
    </button>

    <ejs-dialog
      ref="dialogRef"
      target='#target'
      header="User Registration"
      width="500px"
      :isModal="true"
      showCloseIcon
      :buttons="buttons"
    >
      <form @submit.prevent="handleSubmit" style="padding: 16px">
        <div style="margin-bottom: 12px">
          <label>Name:</label>
          <input
            type="text"
            v-model="formData.name"
            style="width: 100%; padding: 8px"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            v-model="formData.email"
            style="width: 100%; padding: 8px"
          />
        </div>
      </form>
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
      formData: { name: '', email: '' },
      buttons: [
        {
          buttonModel: { content: 'Submit', isPrimary: true },
          click: this.handleSubmit
        },
        {
          buttonModel: { content: 'Cancel' },
          click: this.handleClose
        }
      ]
    };
  },
  methods: {
    handleOpen: function() {
      this.$refs.dialogRef.show();
    },
    handleClose: function() {
      this.formData = { name: '', email: '' };
      this.$refs.dialogRef.hide();
    },
    handleSubmit: function() {
      console.log('Submitted:', this.formData);
      this.handleClose();
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

#target {
    height: 100%;
    min-height: 200px;
}
</style>
```

## Initial Visibility

Control whether the dialog appears on mount:

```vue
<!-- Dialog hidden on load -->
<DialogComponent header="Hidden" :visible="false">
  Content
</DialogComponent>

<!-- Dialog visible on load -->
<DialogComponent header="Visible" :visible="true">
  Content
</DialogComponent>
```

Use `:visible="false"` when you want to show it programmatically with `show()`.

## Complete Working Example

```vue
<template>
  <div id="target" style="padding: 20px">
    <h1>Dialog Example</h1>
    <p>Counter: {{ count }}</p>

    <button @click="handleOpen" class="e-control e-btn e-primary">
      Open Dialog
    </button>

    <ejs-dialog
      ref="dialogRef"
      target='#target'
      header="Counter Dialog"
      width="350px"
      :isModal="true"
      :buttons="buttons"
    >
      <div style="padding: 16px">
        <p>Current count: {{ count }}</p>
        <p>Click Increment to add 1</p>
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
      count: 0,
      buttons: [
        {
          buttonModel: {
            content: 'Increment',
            isPrimary: true,
            cssClass: 'e-flat'
          },
          click: this.handleIncrement
        },
        {
          buttonModel: {
            content: 'Close',
            cssClass: 'e-flat'
          },
          click: this.handleClose
        }
      ]
    };
  },
  methods: {
    handleOpen: function() {
      this.$refs.dialogRef.show();
    },
    handleClose: function() {
      this.$refs.dialogRef.hide();
    },
    handleIncrement: function() {
      this.count++;
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

#target {
    height: 100%;
    min-height: 200px;
}
</style>
```

## Common Patterns & Edge Cases

**Pattern: Dialog in a Target Container**
```vue
<template>
  <div id="dialog-target" style="position: relative; height: 400px">
    <ejs-dialog
      target="#dialog-target"
      :isModal="true"
    >
      Dialog appears within target
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
}
</script>
```

**Edge Case: Ref Not Ready**
```vue
<script>
export default {
  methods: {
    safeShow: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();  // ✓ Safe
      }
    }
  }
}
</script>
```

**Edge Case: Dialog Content Doesn't Update**
```vue
<!-- ✓ Correct: Reactive data updates trigger re-render -->
<ejs-dialog header="Dynamic Content">
  {{ dynamicContent }}
</ejs-dialog>

<script>
export default {
  data: function() {
    return {
      dynamicContent: 'Initial content'
    };
  },
  methods: {
    updateContent: function() {
      this.dynamicContent = 'Updated content';
    }
  }
}
</script>
```
