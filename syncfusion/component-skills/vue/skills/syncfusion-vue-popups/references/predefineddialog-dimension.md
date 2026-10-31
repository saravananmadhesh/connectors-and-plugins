# Predefined Dialog - Dimension

## Dialog Sizing

Predefined dialogs automatically determine their size based on content. For custom sizing, use CSS classes or target specific elements.

## Content-Based Sizing

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="shortBtn" v-on:click.native="showShort" cssClass="e-primary">Short Content</ejs-button>
    <ejs-button id="longBtn" v-on:click.native="showLong" cssClass="e-primary">Long Content</ejs-button>
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
    showShort: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Short",
        content: "Brief message",
        okButton: { text: "OK", click: this.handleOk }
      });
    },
    showLong: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Long Content",
        content: "This is a much longer message that may wrap to multiple lines depending on the viewport width and the width constraints of the dialog.",
        okButton: { text: "OK", click: this.handleOk }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Content-sizing dialog closed.";
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

## Custom CSS for Sizing

### Compact Dialog

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="compactBtn" v-on:click.native="showCompact" cssClass="e-primary">Compact</ejs-button>
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
    showCompact: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Compact Dialog",
        content: "Small dialog with minimal padding",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "compact-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Compact dialog closed.";
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

.compact-dialog {
  min-width: 250px !important;
  max-width: 300px !important;
}

.compact-dialog .e-dlg-header {
  padding: 8px 12px !important;
}

.compact-dialog .e-dlg-content {
  padding: 8px 12px !important;
}

.compact-dialog .e-footer-content {
  padding: 8px 12px !important;
}
</style>
```

### Standard Dialog

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="standardBtn" v-on:click.native="showStandard" cssClass="e-primary">Standard</ejs-button>
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
    showStandard: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Standard Dialog",
        content: "Default sizing with standard padding",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "standard-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Standard dialog closed.";
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

.standard-dialog {
  min-width: 400px !important;
  max-width: 500px !important;
}

.standard-dialog .e-dlg-header {
  padding: 12px 16px !important;
}

.standard-dialog .e-dlg-content {
  padding: 16px !important;
}
</style>
```

### Large Dialog

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="largeBtn" v-on:click.native="showLarge" cssClass="e-primary">Large</ejs-button>
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
    showLarge: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Large Dialog",
        content: "Extended dialog for complex content",
        okButton: { text: "OK", click: this.handleOk },
        cancelButton: { text: "Cancel", click: this.handleCancel },
        cssClass: "large-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "OK clicked on large dialog.";
      document.getElementById("statusText").style.display = "block";
    },
    handleCancel: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Large dialog cancelled.";
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

.large-dialog {
  min-width: 600px !important;
  max-width: 800px !important;
}

.large-dialog .e-dlg-content {
  padding: 20px !important;
}
</style>
```

## Responsive Sizing

### Mobile-Responsive Dialog

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="responsiveBtn" v-on:click.native="showResponsive" cssClass="e-primary">Responsive</ejs-button>
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
    showResponsive: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Responsive Dialog",
        content: "This dialog adapts to screen size",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "responsive-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Responsive dialog closed.";
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

.responsive-dialog {
  min-width: 90vw !important;
  max-width: 90vw !important;
}

@media (min-width: 600px) {
  .responsive-dialog {
    min-width: 500px !important;
    max-width: 500px !important;
  }
}

@media (min-width: 1024px) {
  .responsive-dialog {
    min-width: 600px !important;
    max-width: 700px !important;
  }
}
</style>
```

## Header and Content Sizing

### Tall Header

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="tallHeaderBtn" v-on:click.native="showTallHeader" cssClass="e-primary">Tall Header</ejs-button>
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
    showTallHeader: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Title Line 1\nTitle Line 2",
        content: "Content here",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "tall-header-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Tall header dialog closed.";
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

.tall-header-dialog .e-dlg-header {
  padding: 16px !important;
  min-height: 80px !important;
}
</style>
```

### Scrollable Content

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="scrollBtn" v-on:click.native="showScrollable" cssClass="e-primary">Scrollable</ejs-button>
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
    showScrollable: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      let html = '<div style="padding: 10px;">';
      for (let i = 0; i < 20; i++) {
        html += "<p>Line " + (i + 1) + ": This is a long content that will require scrolling.</p>";
      }
      html += "</div>";
      content.innerHTML = html;

      dialogObj = DialogUtility.alert({
        title: "Scrollable Content",
        content: content,
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "scrollable-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Scrollable dialog closed.";
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

.scrollable-dialog .e-dlg-content {
  max-height: 300px !important;
  overflow-y: auto !important;
}
</style>
```

## Viewport Constraints

### Fit to Viewport

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="fitBtn" v-on:click.native="showFitViewport" cssClass="e-primary">Fit Viewport</ejs-button>
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
    showFitViewport: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Fit to Viewport",
        content: "Dialog never exceeds viewport bounds",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "fit-viewport-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Fit-to-viewport dialog closed.";
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

.fit-viewport-dialog {
  max-width: calc(100vw - 40px) !important;
  max-height: calc(100vh - 40px) !important;
}

.fit-viewport-dialog .e-dlg-content {
  max-height: calc(100vh - 150px) !important;
  overflow-y: auto !important;
}
</style>
```

### Centered with Max Width

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="centeredMaxBtn" v-on:click.native="showCenteredMax" cssClass="e-primary">Centered Max</ejs-button>
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
    showCenteredMax: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Centered with Max Width",
        content: "Centered but never exceeds max width",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "centered-max-dialog",
        position: { X: "center", Y: "center" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Centered-max dialog closed.";
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

.centered-max-dialog {
  width: 90% !important;
  max-width: 600px !important;
  height: auto !important;
}
</style>
```

## Padding and Spacing

### Minimal Padding

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="minPadBtn" v-on:click.native="showMinimal" cssClass="e-primary">Minimal Padding</ejs-button>
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
        title: "Minimal",
        content: "Minimal padding for compact layout",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "minimal-padding-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Minimal-padding dialog closed.";
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

.minimal-padding-dialog .e-dlg-header {
  padding: 4px 8px !important;
}

.minimal-padding-dialog .e-dlg-content {
  padding: 4px 8px !important;
}

.minimal-padding-dialog .e-footer-content {
  padding: 4px 8px !important;
}
</style>
```

### Generous Padding

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="genPadBtn" v-on:click.native="showGenerous" cssClass="e-primary">Generous Padding</ejs-button>
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
    showGenerous: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Spacious",
        content: "Generous padding for breathing room",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "generous-padding-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Generous-padding dialog closed.";
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

.generous-padding-dialog .e-dlg-header {
  padding: 20px 24px !important;
}

.generous-padding-dialog .e-dlg-content {
  padding: 24px !important;
}

.generous-padding-dialog .e-footer-content {
  padding: 20px 24px !important;
}
</style>
```

## Examples

### Complete Dimension Demo

```vue
<template>
  <div class="predefinedDialogs">
    <h2>Dialog Dimension Examples</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
      <ejs-button id="compactDemoBtn" v-on:click.native="showCompact" cssClass="e-primary">Compact</ejs-button>
      <ejs-button id="standardDemoBtn" v-on:click.native="showStandard" cssClass="e-primary">Standard</ejs-button>
      <ejs-button id="largeDemoBtn" v-on:click.native="showLarge" cssClass="e-primary">Large</ejs-button>
      <ejs-button id="responsiveDemoBtn" v-on:click.native="showResponsive" cssClass="e-primary">Responsive</ejs-button>
      <ejs-button id="scrollableDemoBtn" v-on:click.native="showScrollable" cssClass="e-primary">Scrollable</ejs-button>
      <ejs-button id="minimalDemoBtn" v-on:click.native="showMinimal" cssClass="e-primary">Minimal</ejs-button>
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
  methods: {
    setStatus: function (message) {
      document.getElementById("statusText").innerHTML = message;
      document.getElementById("statusText").style.display = "block";
    },
    showCompact: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Compact",
        content: "Small, tight layout",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "compact-dialog"
      });
    },
    showStandard: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Standard",
        content: "Default sizing",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "standard-dialog"
      });
    },
    showLarge: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Large",
        content: "Extended dimensions for complex content layouts",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "large-dialog"
      });
    },
    showResponsive: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Responsive",
        content: "Adapts to screen size and orientation",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "responsive-dialog"
      });
    },
    showScrollable: function () {
      document.getElementById("statusText").style.display = "none";
      const content = document.createElement("div");
      let html = '<div style="padding: 10px;">';
      for (let i = 0; i < 15; i++) {
        html += "<p>Item " + (i + 1) + "</p>";
      }
      html += "</div>";
      content.innerHTML = html;

      dialogObj = DialogUtility.alert({
        title: "Scrollable",
        content: content,
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "scrollable-dialog"
      });
    },
    showMinimal: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Minimal",
        content: "Compact with minimal padding",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "minimal-padding-dialog"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      this.setStatus("Dimension demo dialog closed.");
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

- Predefined dialogs don't support explicit width/height properties
- Use CSS classes to customize sizing
- Consider responsive design for mobile devices
- Scrolling is automatically applied for content overflow
- Use viewport units (vw, vh) for responsive layouts
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- Test across multiple screen sizes and orientations
