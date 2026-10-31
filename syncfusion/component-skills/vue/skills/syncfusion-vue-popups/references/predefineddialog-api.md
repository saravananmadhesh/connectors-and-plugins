# Predefined Dialog - API Reference

## DialogUtility Static Methods

### alert()

Show an acknowledgement dialog.

```typescript
DialogUtility.alert(options: AlertDialogOptions): void
```

**Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `title` | string | Dialog heading |
| `content` | string \| HTMLElement | Dialog body content |
| `okButton` | ButtonModel | OK button configuration |
| `position` | PositionData | Position (preset or pixels) |
| `animationSettings` | AnimationSettingsModel | Open/close animation |
| `cssClass` | string | Custom CSS classes |
| `locale` | string | Language/region code |
| `enableRtl` | boolean | Right-to-left rendering |
| `zIndex` | number | Stack order |
| `onOk` | () => void | OK button callback |

**Example:**

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="alertDlgBtn" v-on:click.native="showAlert" cssClass="e-primary">Show Alert</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showAlert: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Alert",
        content: "Message",
        okButton: {
          text: "OK",
          click: this.handleOk
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The alert was acknowledged.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### confirm()

Show a yes/no decision dialog.

```typescript
DialogUtility.confirm(options: ConfirmDialogOptions): void
```

**Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `title` | string | Dialog heading |
| `content` | string \| HTMLElement | Dialog body content |
| `okButton` | ButtonModel | Yes button configuration |
| `cancelButton` | ButtonModel | No button configuration |
| `okButtonCssClass` | string | CSS for OK button |
| `cancelButtonCssClass` | string | CSS for Cancel button |
| `position` | PositionData | Position |
| `animationSettings` | AnimationSettingsModel | Animation |
| `cssClass` | string | Custom CSS classes |
| `locale` | string | Language/region code |
| `enableRtl` | boolean | Right-to-left rendering |
| `zIndex` | number | Stack order |

**Example:**

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="confirmDlgBtn" v-on:click.native="showConfirm" cssClass="e-primary">Show Confirm</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showConfirm: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Confirm",
        content: "Do you want to continue?",
        okButton: { text: "Yes", click: this.handleOk },
        cancelButton: { text: "No", click: this.handleCancel }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user confirmed.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### prompt()

Show a text input dialog.

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="promptDlgBtn" v-on:click.native="showPrompt" :isPrimary="true">Show Prompt</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  data: function () {
    return {
      userName: ""
    };
  },
  methods: {
    showPrompt: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Name Input",
        content: '<p>Enter your name:</p><input id="userName" class="e-input" placeholder="Enter text..." />',
        okButton: { text: "OK", click: this.handleOk },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleOk: function () {
      const value = document.getElementById("userName").value;
      dialogObj.hide();
      if (value) {
        this.userName = value;
        document.getElementById("statusText").innerHTML = "The user's input is returned as " + value;
      } else {
        document.getElementById("statusText").innerHTML = "The user's input is returned as\" \"";
      }
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The prompt was cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

## Options Interfaces

### AlertDialogOptions

```typescript
interface AlertDialogOptions {
  title: string;
  content: string | HTMLElement;
  okButton?: ButtonModel;
  position?: PositionData;
  animationSettings?: AnimationSettingsModel;
  cssClass?: string;
  locale?: string;
  enableRtl?: boolean;
  zIndex?: number;
  onOk?: () => void;
}
```

### ConfirmDialogOptions

```typescript
interface ConfirmDialogOptions {
  title: string;
  content: string | HTMLElement;
  okButton?: ButtonModel;
  cancelButton?: ButtonModel;
  okButtonCssClass?: string;
  cancelButtonCssClass?: string;
  position?: PositionData;
  animationSettings?: AnimationSettingsModel;
  cssClass?: string;
  locale?: string;
  enableRtl?: boolean;
  zIndex?: number;
  onOk?: () => void;
  onCancel?: () => void;
}
```

### PromptDialogOptions

```typescript
interface PromptDialogOptions {
  title: string;
  content: string | HTMLElement;
  value?: string;
  input?: InputModel;
  okButton?: ButtonModel;
  cancelButton?: ButtonModel;
  okButtonCssClass?: string;
  cancelButtonCssClass?: string;
  position?: PositionData;
  animationSettings?: AnimationSettingsModel;
  cssClass?: string;
  locale?: string;
  enableRtl?: boolean;
  zIndex?: number;
  onOk?: (value: string) => void;
  onCancel?: () => void;
}
```

## Sub-Interfaces

### ButtonModel

```typescript
interface ButtonModel {
  text: string;              // Button text/label
  cssClass?: string;         // CSS classes
  isPrimary?: boolean;       // Primary button styling
  disabled?: boolean;        // Disabled state
  iconCss?: string;          // Icon CSS class
}
```

**CSS Classes:**
- `e-flat` - Flat button style
- `e-outline` - Outline style
- `e-primary` - Primary color
- `e-danger` - Red/danger color
- `e-success` - Green/success color
- `e-warning` - Yellow/warning color
- `e-info` - Blue/info color

### InputModel

```typescript
interface InputModel {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  placeholder?: string;      // Input placeholder
  pattern?: string;          // Regex pattern for validation
  className?: string;        // Custom CSS classes
  attributes?: Record<string, string>;
}
```

### PositionData

```typescript
interface PositionData {
  X: 'left' | 'center' | 'right' | number;
  Y: 'top' | 'center' | 'bottom' | number;
}
```

### AnimationSettingsModel

```typescript
interface AnimationSettingsModel {
  effect: 'Fade' | 'FadeZoom' | 'Zoom' | 'ZoomIn' | 'ZoomOut' | 
          'SlideDown' | 'SlideUp' | 'Flip' | 'FlipLeftDown' | 'FlipLeftUp' |
          'FlipRightDown' | 'FlipRightUp' | 'FlipXDown' | 'FlipXUp' |
          'FlipYLeft' | 'FlipYRight' | 'None';
  duration?: number;         // Milliseconds
  delay?: number;            // Milliseconds
}
```

## Examples

### Basic Alert

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="alertDlgBtn" v-on:click.native="showAlert" cssClass="e-primary">Show Alert</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showAlert: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Information",
        content: "Operation completed successfully",
        okButton: { text: "OK", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The alert was closed.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### Confirm with Custom Buttons

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="confirmDlgBtn" v-on:click.native="showConfirm" cssClass="e-danger">Delete Item</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showConfirm: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Delete Confirmation",
        content: "This action cannot be undone. Continue?",
        okButton: { text: "Delete", cssClass: "e-danger", click: this.handleDelete },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleDelete: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The item was deleted.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Deletion was cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### Prompt with Validation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="promptDlgBtn" v-on:click.native="showPrompt" :isPrimary="true">Enter Value</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showPrompt: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Enter Email",
        content: '<p>Please enter a valid email address:</p><input id="emailInput" class="e-input" type="email" placeholder="your@email.com" />',
        okButton: { text: "Submit", click: this.validateEmail },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    validateEmail: function () {
      const value = document.getElementById("emailInput").value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      dialogObj.hide();
      if (emailRegex.test(value)) {
        document.getElementById("statusText").innerHTML = "Valid email: " + value;
      } else {
        DialogUtility.alert({
          title: "Invalid Email",
          content: "Please enter a valid email address",
          okButton: { text: "OK" }
        });
      }
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The prompt was cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### Styled Dialog with Animation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="styledDlgBtn" v-on:click.native="showStyled" cssClass="e-success">Show Styled Dialog</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showStyled: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Success",
        content: "Your changes have been saved successfully",
        okButton: { text: "Done", cssClass: "e-success", click: this.handleOk },
        cssClass: "custom-dialog",
        position: { X: "center", Y: "top" },
        animationSettings: {
          effect: "SlideDown",
          duration: 400,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Changes saved successfully.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}

.custom-dialog {
  /* Custom styling */
}
</style>
```

## Common Patterns

### Chained Dialogs

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="chainDlgBtn" v-on:click.native="chainDialogs" cssClass="e-primary">Start Chain</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    chainDialogs: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Step 1",
        content: "Continue to step 2?",
        okButton: { text: "Yes", click: this.showStep2 },
        cancelButton: { text: "No", click: this.handleCancel }
      });
    },
    showStep2: function () {
      const self = this;
      setTimeout(function () {
        dialogObj = DialogUtility.confirm({
          title: "Step 2",
          content: "Continue to step 3?",
          okButton: { text: "Yes", click: self.showComplete },
          cancelButton: { text: "No", click: self.handleCancel }
        });
      }, 300);
    },
    showComplete: function () {
      dialogObj = DialogUtility.alert({
        title: "Complete",
        content: "Process completed",
        okButton: { text: "OK", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Chain complete.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Chain cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

### Context-Aware Dialogs

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="errDlgBtn" v-on:click.native="showError('Something went wrong')" cssClass="e-danger">Error</ejs-button>
    <ejs-button id="okDlgBtn" v-on:click.native="showSuccess('Operation completed')" cssClass="e-success">Success</ejs-button>
    <ejs-button id="warnDlgBtn" v-on:click.native="showWarning('Please review your input')" cssClass="e-warning">Warning</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  methods: {
    showError: function (message) {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Error",
        content: message,
        okButton: { text: "OK", cssClass: "e-danger", click: this.closeDialog }
      });
    },
    showSuccess: function (message) {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Success",
        content: message,
        okButton: { text: "OK", cssClass: "e-success", click: this.closeDialog }
      });
    },
    showWarning: function (message) {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Warning",
        content: message,
        okButton: { text: "OK", cssClass: "e-warning", click: this.closeDialog }
      });
    },
    closeDialog: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The dialog was closed.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material3.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material3.css";

#statusText {
  font-size: 16px;
  margin-top: 20px;
}

.predefinedDialogs {
  height: 100%;
  min-height: 350px;
}
</style>
```

## Notes

- `DialogUtility` methods are static and don't require component instantiation
- All callbacks are executed synchronously
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- For complex dialogs with custom layouts, use the `DialogComponent` instead
- Framework-agnostic: works identically in Vue, React, Angular, and vanilla JS
