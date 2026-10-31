# Predefined Dialog - Getting Started

## Overview

The PredefinedDialog component provides pre-built dialog templates for common scenarios using the `DialogUtility` class. This framework-agnostic utility creates alerts, confirms, and prompts without manual configuration.

## Installation

```bash
npm install @syncfusion/ej2-vue-popups --save
```

The `DialogUtility` class is part of the `@syncfusion/ej2-vue-popups` package and works identically in Vue 2, React, Angular, and vanilla JavaScript.

## Setup

### Register the Button Component

Import and register the Syncfusion Vue Button component in the `script` section of your `App.vue`:

```vue
<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  }
}
</script>
```

### Import Theme Styles

The Material3 theme styles must be imported in the `<style>` section of `src/App.vue`:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";
</style>
```

## Quick Start

### Alert Dialog

An alert dialog is used to display errors, warnings, and information alerts that require user awareness. The dialog is displayed with an `OK` button, and closes when the user clicks it.

```vue
<template>
  <div>
    <div class="predefinedDialogs">
      <ejs-button id="alertDlgBtn" v-on:click.native="alertBtnClick" cssClass="e-danger">Alert</ejs-button>
      <span id="statusText"></span>
    </div>
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
    return {};
  },
  methods: {
    alertBtnClick: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Low battery",
        content: "10% of battery remaining",
        okButton: { click: this.alertOkAction },
        position: { X: "center", Y: "center" }
      });
    },
    alertOkAction: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user closed the Alert dialog.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### Confirm Dialog

A confirm dialog displays a message along with `OK` and `Cancel` buttons. It is used to get user approval before critical actions.

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="confirmDlgBtn" v-on:click.native="confirmBtnClick" cssClass="e-success">Confirm</ejs-button>
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
    return {};
  },
  methods: {
    confirmBtnClick: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Delete multiple items",
        content: "Are you sure you want to permanently delete these items?",
        okButton: { click: this.confirmOkAction },
        cancelButton: { click: this.confirmCancelAction }
      });
    },
    confirmOkAction: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user confirmed the dialog box";
      document.getElementById("statusText").style.display = "block";
    },
    confirmCancelAction: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user canceled the dialog box.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### Prompt Dialog

A prompt dialog is used to get input from the user. When the user clicks the `OK` button, the input value is returned. Clicking `Cancel` returns a null value.

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="promptDlgBtn" v-on:click.native="promptBtnClick" :isPrimary="true">Prompt</ejs-button>
    <span id="statusText"></span>
  </div>
</template>

<script>
import { DialogUtility } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

let dialogObj = undefined;
let value;

export default {
  name: "App",
  components: {
    "ejs-button": ButtonComponent
  },
  data: function () {
    return {};
  },
  methods: {
    promptBtnClick: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Join chat group",
        content: '<p>Enter your name:</p><input id="inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
        okButton: { click: this.promptOkAction },
        cancelButton: { click: this.promptCancelAction },
        position: { X: "center", Y: "center" }
      });
    },
    promptOkAction: function () {
      value = document.getElementById("inputEle").value;
      if (value == "") {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user's input is returned as\" \"";
        document.getElementById("statusText").style.display = "block";
      } else {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user's input is returned as" + " " + value;
        document.getElementById("statusText").style.display = "block";
      }
    },
    promptCancelAction: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user canceled the prompt dialog";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

## Dialog Utility API

### DialogUtility Methods

#### alert(options: AlertDialogOptions)

Show an alert dialog (acknowledgement only).

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="alertDlgBtn" v-on:click.native="showAlert" cssClass="e-danger">Show Alert</ejs-button>
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
        title: "Alert Title",
        content: "Alert message content",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "top" },
        animationSettings: { effect: "Zoom" }
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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

#### confirm(options: ConfirmDialogOptions)

Show a confirmation dialog (yes/no response).

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="confirmDlgBtn" v-on:click.native="showConfirm" cssClass="e-success">Show Confirm</ejs-button>
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
        content: "Are you sure you want to delete?",
        okButton: { text: "Delete", cssClass: "e-danger", click: this.handleDelete },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleDelete: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user confirmed deletion.";
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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

#### prompt(options: PromptDialogOptions)

Show a prompt dialog (text input).

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
  methods: {
    showPrompt: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Name Input",
        content: '<p>What is your name?</p><input id="inputName" class="e-input" placeholder="Enter your name" style="width: 100%; padding: 8px;" />',
        okButton: { text: "Submit", click: this.handleSubmit },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleSubmit: function () {
      const value = document.getElementById("inputName").value;
      dialogObj.hide();
      if (value) {
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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

## Options Structure and API

### AlertDialogOptions

Used with `DialogUtility.alert()` method in Vue 2 Options API:

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
        title: "Information",             // Dialog title string
        content: "Message content",       // Dialog body content (HTML supported)
        okButton: {
          text: "OK",                     // Button label
          cssClass: "e-primary",          // CSS classes
          click: this.handleOk            // Click handler - Options API method
        },
        position: {
          X: "center",                    // Horizontal: 'center' | pixel value
          Y: "center"                     // Vertical: 'center' | 'top' | pixel value
        },
        animationSettings: {
          effect: "Zoom",                 // Effect: 'Zoom' | 'SlideIn' | 'None'
          duration: 300                   // Duration in milliseconds
        },
        cssClass: "custom-alert"          // Custom CSS class
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Alert closed.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### ConfirmDialogOptions

Used with `DialogUtility.confirm()` method in Vue 2 Options API:

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
        title: "Confirmation",
        content: "Do you want to continue?",
        okButton: {
          text: "Yes",                    // OK button label
          cssClass: "e-primary",
          click: this.handleOk            // OK click handler
        },
        cancelButton: {
          text: "No",                     // Cancel button label
          cssClass: "e-outline",
          click: this.handleCancel        // Cancel click handler
        },
        position: {
          X: "center",
          Y: "top"
        }
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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### PromptDialogOptions

Text input dialog using `DialogUtility.confirm()` with HTML input element:

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
      inputValue: ""
    };
  },
  methods: {
    showPrompt: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "User Input",
        content: '<input id="userInput" class="e-input" placeholder="Enter text" style="width: 100%; padding: 8px;" />',
        okButton: {
          text: "Submit",
          click: this.handleSubmit
        },
        cancelButton: {
          text: "Cancel",
          click: this.handleCancel
        }
      });
    },
    handleSubmit: function () {
      const value = document.getElementById("userInput").value;
      dialogObj.hide();
      if (value) {
        this.inputValue = value;
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
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

## Common Patterns

### Delete Confirmation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="deleteDlgBtn" v-on:click.native="deleteItem" cssClass="e-danger">Delete Item</ejs-button>
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
    deleteItem: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Delete Item",
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
      document.getElementById("statusText").innerHTML = "The delete action was cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### User Input with Validation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="usernameDlgBtn" v-on:click.native="getUserInput" cssClass="e-primary">Enter Username</ejs-button>
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
      username: ""
    };
  },
  methods: {
    getUserInput: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Username",
        content: '<p>Enter a username (3+ characters):</p><input id="usernameInput" class="e-input" placeholder="Username" style="width: 100%; padding: 8px;" />',
        okButton: { text: "OK", click: this.handleUsernameSubmit },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleUsernameSubmit: function () {
      const value = document.getElementById("usernameInput").value;
      if (value && value.length >= 3) {
        this.username = value;
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "Username set to: " + value;
        document.getElementById("statusText").style.display = "block";
      } else {
        dialogObj.hide();
        DialogUtility.alert({
          title: "Validation Error",
          content: "Username must be at least 3 characters",
          okButton: { text: "OK" }
        });
      }
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The input was cancelled.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

### Info Alert with HTML Content

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="infoDlgBtn" v-on:click.native="showInfo" cssClass="e-info">Show Info</ejs-button>
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
    showInfo: function () {
      document.getElementById("statusText").style.display = "none";
      const htmlContent = '<div style="padding: 10px;"><h4>Version Information</h4><p>Application v2.0.0</p><ul><li>Feature 1</li><li>Feature 2</li></ul></div>';
      dialogObj = DialogUtility.alert({
        title: "About Application",
        content: htmlContent,
        okButton: { text: "Close", click: this.closeInfo },
        position: { X: "center", Y: "center" }
      });
    },
    closeInfo: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Info dialog closed.";
      document.getElementById("statusText").style.display = "block";
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

## Examples

### Complete Dialog Utility Demo

```vue
<template>
  <div class="predefinedDialogs">
    <h2>Predefined Dialog Examples</h2>

    <div style="display: flex; gap: 10px; margin: 20px 0;">
      <ejs-button id="alertDlgBtn" v-on:click.native="showAlert" cssClass="e-danger">Alert</ejs-button>
      <ejs-button id="confirmDlgBtn" v-on:click.native="showConfirm" cssClass="e-success">Confirm</ejs-button>
      <ejs-button id="promptDlgBtn" v-on:click.native="showPrompt" :isPrimary="true">Prompt</ejs-button>
      <ejs-button id="deleteDlgBtn" v-on:click.native="showDelete" cssClass="e-danger">Delete</ejs-button>
    </div>

    <div id="statusText" style="margin-top: 20px; padding: 10px; background: #f5f5f5;"></div>
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
      username: ""
    };
  },
  methods: {
    setStatus: function (message) {
      document.getElementById("statusText").innerHTML = message;
      document.getElementById("statusText").style.display = "block";
    },
    showAlert: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Information",
        content: "This is a simple alert dialog",
        okButton: { click: this.handleAlertOk }
      });
    },
    handleAlertOk: function () {
      dialogObj.hide();
      this.setStatus("The user closed the Alert dialog.");
    },
    showConfirm: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Confirmation",
        content: "Do you want to proceed?",
        okButton: { text: "Yes", click: this.handleConfirmOk },
        cancelButton: { text: "No", click: this.handleConfirmCancel }
      });
    },
    handleConfirmOk: function () {
      dialogObj.hide();
      this.setStatus("The user confirmed the dialog box");
    },
    handleConfirmCancel: function () {
      dialogObj.hide();
      this.setStatus("The user canceled the dialog box.");
    },
    showPrompt: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Enter Name",
        content: '<p>Enter your name:</p><input id="nameInput" class="e-input" placeholder="Enter your name" style="width: 100%; padding: 8px;" />',
        okButton: { text: "Submit", click: this.handlePromptSubmit },
        cancelButton: { text: "Cancel", click: this.handlePromptCancel }
      });
    },
    handlePromptSubmit: function () {
      const value = document.getElementById("nameInput").value;
      if (value) {
        this.username = value;
        dialogObj.hide();
        this.setStatus("The user's input is returned as " + value);
      }
    },
    handlePromptCancel: function () {
      dialogObj.hide();
      this.setStatus("The user canceled the prompt dialog");
    },
    showDelete: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Delete Item",
        content: "Are you sure you want to delete this item?",
        okButton: { text: "Delete", cssClass: "e-danger", click: this.handleDeleteConfirm },
        cancelButton: { text: "Cancel", click: this.handleDeleteCancel }
      });
    },
    handleDeleteConfirm: function () {
      dialogObj.hide();
      this.setStatus("The item was deleted.");
    },
    handleDeleteCancel: function () {
      dialogObj.hide();
      this.setStatus("The delete action was cancelled.");
    }
  }
}
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";

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

- `DialogUtility` is framework-agnostic and works identically in Vue, React, Angular, and vanilla JavaScript
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- Dialog options are passed as objects, not components
- Store the returned dialog instance in a variable (`dialogObj`) so you can call `dialogObj.hide()` from button callbacks
- Use the `DialogComponent` instead of `DialogUtility` when you need complex layouts, templates, or built-in dragging/resizing
