# Predefined Dialog - Customization

## Styling Predefined Dialogs

### Button Styling

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="primaryBtn" v-on:click.native="showPrimaryButton" cssClass="e-primary">Primary Button</ejs-button>
    <ejs-button id="dangerBtn" v-on:click.native="showDangerButton" cssClass="e-danger">Danger Button</ejs-button>
    <ejs-button id="successBtn" v-on:click.native="showSuccessButton" cssClass="e-success">Success Button</ejs-button>
    <ejs-button id="outlineBtn" v-on:click.native="showOutlineButton" cssClass="e-outline">Outline Button</ejs-button>
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
    showPrimaryButton: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Primary Action",
        content: "This shows a primary button",
        okButton: { text: "Continue", cssClass: "e-primary", click: this.handleOk }
      });
    },
    showDangerButton: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Destructive Action",
        content: "This action is permanent",
        okButton: { text: "Delete", cssClass: "e-danger", click: this.handleDelete },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    showSuccessButton: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Success",
        content: "Operation completed",
        okButton: { text: "Done", cssClass: "e-success", click: this.handleOk }
      });
    },
    showOutlineButton: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Confirm Action",
        content: "Please confirm",
        okButton: { text: "Confirm", cssClass: "e-outline", click: this.handleConfirm },
        cancelButton: { text: "Cancel", cssClass: "e-outline", click: this.handleCancel }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Action acknowledged.";
      document.getElementById("statusText").style.display = "block";
    },
    handleDelete: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Item deleted.";
      document.getElementById("statusText").style.display = "block";
    },
    handleConfirm: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Action confirmed.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Action cancelled.";
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

### Button Icons

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="iconBtn" v-on:click.native="showIconButton" cssClass="e-primary">Show Icon Button</ejs-button>
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
    showIconButton: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Save Changes",
        content: "Do you want to save your changes?",
        okButton: { text: "Save", iconCss: "e-icons e-save", cssClass: "e-primary", click: this.handleSave },
        cancelButton: { text: "Cancel", iconCss: "e-icons e-close", click: this.handleCancel }
      });
    },
    handleSave: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Changes saved.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Save cancelled.";
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

### Dialog CSS Classes

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="minimalBtn" v-on:click.native="showMinimal" cssClass="e-flat">Minimal Style</ejs-button>
    <ejs-button id="boldBtn" v-on:click.native="showBold" cssClass="e-primary">Bold Style</ejs-button>
    <ejs-button id="roundedBtn" v-on:click.native="showRounded" cssClass="e-info">Rounded Style</ejs-button>
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
    showMinimal: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Minimal Dialog",
        content: "Simple and clean design",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "minimal-dialog"
      });
    },
    showBold: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Bold Dialog",
        content: "Prominent styling",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "bold-dialog"
      });
    },
    showRounded: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Rounded Dialog",
        content: "Modern rounded corners",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "rounded-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Dialog closed.";
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

.minimal-dialog .e-dlg-header {
  background-color: #f5f5f5;
}

.bold-dialog .e-btn-primary {
  font-weight: bold;
}

.rounded-dialog .e-dlg-content {
  border-radius: 12px;
}
</style>
```

## Content Customization

### HTML Content

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="htmlBtn" v-on:click.native="showHTMLContent" cssClass="e-primary">Show HTML</ejs-button>
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
    showHTMLContent: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.innerHTML = '<div style="padding: 10px;"><h3 style="color: #333; margin-top: 0;">Welcome</h3><p>This is <strong>HTML content</strong> with <em>formatting</em>.</p><ul style="margin: 10px 0;"><li>Feature 1</li><li>Feature 2</li><li>Feature 3</li></ul></div>';
      dialogObj = DialogUtility.alert({
        title: "Rich Content",
        content: content,
        okButton: { text: "Close", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "HTML content dialog closed.";
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

### List Content

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="listBtn" v-on:click.native="showList" cssClass="e-primary">Show List</ejs-button>
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
    showList: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      const items = ["Login failed", "Session expired", "Please try again"];
      let html = '<div style="padding: 10px;"><strong>Error Details:</strong><ul>';
      items.forEach(function (item) {
        html += "<li>" + item + "</li>";
      });
      html += "</ul></div>";
      content.innerHTML = html;

      dialogObj = DialogUtility.alert({
        title: "Errors",
        content: content,
        okButton: { text: "OK", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Errors dialog closed.";
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

### Form-like Content

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="formBtn" v-on:click.native="showFormContent" cssClass="e-primary">Show Form</ejs-button>
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
    showFormContent: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.innerHTML = '<div style="padding: 10px;"><div style="margin: 10px 0;"><label style="display: block; margin-bottom: 5px;">Email:</label><input type="email" placeholder="Enter email" style="width: 100%; padding: 5px;"></div><div style="margin: 10px 0;"><label style="display: block; margin-bottom: 5px;">Message:</label><textarea placeholder="Enter message" style="width: 100%; padding: 5px; height: 80px;"></textarea></div></div>';

      dialogObj = DialogUtility.confirm({
        title: "Contact Form",
        content: content,
        okButton: { text: "Submit", cssClass: "e-primary", click: this.handleSubmit },
        cancelButton: { text: "Cancel", click: this.handleCancel }
      });
    },
    handleSubmit: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Form submitted successfully.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Form submission cancelled.";
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

## Position Customization

### Center Positioning

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="centerBtn" v-on:click.native="showCentered" cssClass="e-primary">Center</ejs-button>
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
    showCentered: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Centered",
        content: "This dialog is centered",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "center" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Centered dialog closed.";
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

### Top Positioning

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="topBtn" v-on:click.native="showTop" cssClass="e-primary">Top</ejs-button>
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
    showTop: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Top Notification",
        content: "This dialog appears at the top",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "top" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Top dialog closed.";
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

### Pixel-Based Positioning

```vue
<template>
  <div class="predefinedDialogs">
    <input v-model.number="posX" type="number" placeholder="X" min="0" style="margin-right: 10px;" />
    <input v-model.number="posY" type="number" placeholder="Y" min="0" style="margin-right: 10px;" />
    <ejs-button id="posBtn" v-on:click.native="showAtPosition" cssClass="e-primary">Show at Position</ejs-button>
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
      posX: 200,
      posY: 100
    };
  },
  methods: {
    showAtPosition: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Custom Position",
        content: "Position: (" + this.posX + ", " + this.posY + ")",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: this.posX, Y: this.posY }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Position dialog closed.";
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

## Localization

### Language Support

```vue
<template>
  <div class="predefinedDialogs">
    <select v-model="locale" style="margin: 10px;">
      <option value="en-US">English</option>
      <option value="de">German</option>
      <option value="fr-FR">French</option>
      <option value="es">Spanish</option>
    </select>
    <ejs-button id="localeBtn" v-on:click.native="showLocalized" cssClass="e-primary">Show Dialog</ejs-button>
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
      locale: "en-US"
    };
  },
  methods: {
    showLocalized: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Localized Dialog",
        content: "This dialog respects locale settings",
        okButton: { text: "OK", click: this.handleOk },
        locale: this.locale
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Localized dialog closed.";
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

## RTL Support

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="rtlBtn" v-on:click.native="showRTL" cssClass="e-primary">Show RTL Dialog</ejs-button>
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
    showRTL: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "تأكيد",
        content: "هل تريد المتابعة؟",
        okButton: { text: "نعم", click: this.handleOk },
        cancelButton: { text: "لا", click: this.handleCancel },
        locale: "ar",
        enableRtl: true
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "RTL dialog confirmed.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "RTL dialog cancelled.";
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

## Advanced Customization

### Custom CSS with Theme Colors

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="themedBtn" v-on:click.native="showThemedDialog" cssClass="e-primary">Themed Dialog</ejs-button>
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
    showThemedDialog: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Themed Dialog",
        content: "Custom themed styling applied",
        okButton: { text: "OK", cssClass: "e-primary", click: this.handleOk },
        cssClass: "themed-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Themed dialog closed.";
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

.themed-dialog {
  --primary-color: #007bff;
  --text-color: #333;
  --background-color: #f8f9fa;
}

.themed-dialog .e-dlg-header {
  background: var(--primary-color);
  color: white;
}

.themed-dialog .e-dlg-content {
  background: var(--background-color);
  color: var(--text-color);
}
</style>
```

### Accessibility Customization

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="accBtn" v-on:click.native="showAccessibleDialog" cssClass="e-primary">Accessible Dialog</ejs-button>
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
    showAccessibleDialog: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.setAttribute("role", "region");
      content.setAttribute("aria-label", "Dialog content");
      content.innerHTML = '<div style="padding: 10px;"><h2 id="dialog-title">Important Information</h2><p id="dialog-desc">Please read the following details carefully.</p><ul aria-describedby="dialog-desc"><li>Point 1</li><li>Point 2</li></ul></div>';

      dialogObj = DialogUtility.alert({
        title: "Accessible Dialog",
        content: content,
        okButton: { text: "Acknowledge", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Accessible dialog closed.";
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

## Examples

### Complete Customization Demo

```vue
<template>
  <div class="predefinedDialogs">
    <h2>Predefined Dialog Customization</h2>

    <div style="margin: 20px 0;">
      <h4>Button Styles</h4>
      <ejs-button id="primaryBtn" v-on:click.native="showPrimary" cssClass="e-primary">Primary</ejs-button>
      <ejs-button id="dangerBtn" v-on:click.native="showDanger" cssClass="e-danger">Danger</ejs-button>
      <ejs-button id="successBtn" v-on:click.native="showSuccess" cssClass="e-success">Success</ejs-button>
    </div>

    <div style="margin: 20px 0;">
      <h4>Positions</h4>
      <ejs-button id="centerBtn" v-on:click.native="showCenter" cssClass="e-primary">Center</ejs-button>
      <ejs-button id="topBtn" v-on:click.native="showTop" cssClass="e-primary">Top</ejs-button>
      <ejs-button id="bottomBtn" v-on:click.native="showBottom" cssClass="e-primary">Bottom</ejs-button>
    </div>

    <div style="margin: 20px 0;">
      <h4>Content Types</h4>
      <ejs-button id="htmlBtn" v-on:click.native="showHTML" cssClass="e-primary">HTML</ejs-button>
      <ejs-button id="listBtn" v-on:click.native="showList" cssClass="e-primary">List</ejs-button>
      <ejs-button id="customBtn" v-on:click.native="showCustom" cssClass="e-primary">Custom</ejs-button>
    </div>

    <div style="margin: 20px 0;">
      <h4>Localization</h4>
      <select v-model="selectedLocale" style="padding: 5px; margin: 0 10px;">
        <option value="en-US">English</option>
        <option value="de">German</option>
        <option value="fr-FR">French</option>
      </select>
      <ejs-button id="localeBtn" v-on:click.native="showLocalized" cssClass="e-primary">Show</ejs-button>
    </div>

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
      selectedLocale: "en-US"
    };
  },
  methods: {
    setStatus: function (message) {
      document.getElementById("statusText").innerHTML = message;
      document.getElementById("statusText").style.display = "block";
    },
    showPrimary: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Primary Action",
        content: "This uses primary button styling",
        okButton: { text: "OK", cssClass: "e-primary", click: this.closeDialog }
      });
    },
    showDanger: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Danger Zone",
        content: "This is a destructive action",
        okButton: { text: "Proceed", cssClass: "e-danger", click: this.handleProceed },
        cancelButton: { text: "Cancel", click: this.closeDialog }
      });
    },
    showSuccess: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Success",
        content: "Operation completed successfully",
        okButton: { text: "Done", cssClass: "e-success", click: this.closeDialog }
      });
    },
    showCenter: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Center",
        content: "Centered position",
        okButton: { text: "OK", click: this.closeDialog },
        position: { X: "center", Y: "center" }
      });
    },
    showTop: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Top",
        content: "Top position",
        okButton: { text: "OK", click: this.closeDialog },
        position: { X: "center", Y: "top" }
      });
    },
    showBottom: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Bottom",
        content: "Bottom position",
        okButton: { text: "OK", click: this.closeDialog },
        position: { X: "center", Y: "bottom" }
      });
    },
    showHTML: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.innerHTML = '<p><strong>Bold</strong> and <em>italic</em> text</p>';
      dialogObj = DialogUtility.alert({
        title: "HTML Content",
        content: content,
        okButton: { text: "OK", click: this.closeDialog }
      });
    },
    showList: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.innerHTML = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      dialogObj = DialogUtility.alert({
        title: "List Content",
        content: content,
        okButton: { text: "OK", click: this.closeDialog }
      });
    },
    showCustom: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      content.innerHTML = '<div style="background: #f0f0f0; padding: 10px; border-radius: 4px;"><p>Custom styled content</p></div>';
      dialogObj = DialogUtility.alert({
        title: "Custom Content",
        content: content,
        okButton: { text: "OK", click: this.closeDialog }
      });
    },
    showLocalized: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Localized",
        content: "This dialog is localized",
        okButton: { text: "OK", click: this.closeDialog },
        locale: this.selectedLocale
      });
    },
    handleProceed: function () {
      dialogObj.hide();
      this.setStatus("Dangerous action proceeded.");
    },
    closeDialog: function () {
      dialogObj.hide();
      this.setStatus("Dialog closed.");
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

- All customizations are applied through options objects, not component props
- Use HTML elements for rich content instead of plain strings
- CSS classes must be predefined in your stylesheet
- Localization strings are managed by Syncfusion locale data
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- For complex UI, consider `DialogComponent` instead of `DialogUtility`
