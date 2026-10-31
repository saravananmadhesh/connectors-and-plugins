# Predefined Dialog - Position

## Positioning Predefined Dialogs

The `DialogUtility` provides the `position` property to control dialog placement on the viewport.

## Position Presets

### Center Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="centerPosBtn" v-on:click.native="showCenter" cssClass="e-primary">Center</ejs-button>
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
    showCenter: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Centered",
        content: "This dialog is centered on the viewport",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "center" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Center dialog closed.";
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

### Top Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="topPosBtn" v-on:click.native="showTop" cssClass="e-primary">Top</ejs-button>
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

### Bottom Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="bottomPosBtn" v-on:click.native="showBottom" cssClass="e-primary">Bottom</ejs-button>
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
    showBottom: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Bottom Alert",
        content: "This dialog appears at the bottom",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "bottom" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Bottom dialog closed.";
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

### Top-Left Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="topLeftBtn" v-on:click.native="showTopLeft" cssClass="e-primary">Top-Left</ejs-button>
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
    showTopLeft: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Top-Left",
        content: "Dialog at top-left corner",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "left", Y: "top" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Top-left dialog closed.";
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

### Top-Right Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="topRightBtn" v-on:click.native="showTopRight" cssClass="e-primary">Top-Right</ejs-button>
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
    showTopRight: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Top-Right",
        content: "Dialog at top-right corner",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "right", Y: "top" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Top-right dialog closed.";
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

### Bottom-Left Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="bottomLeftBtn" v-on:click.native="showBottomLeft" cssClass="e-primary">Bottom-Left</ejs-button>
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
    showBottomLeft: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Bottom-Left",
        content: "Dialog at bottom-left corner",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "left", Y: "bottom" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Bottom-left dialog closed.";
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

### Bottom-Right Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="bottomRightBtn" v-on:click.native="showBottomRight" cssClass="e-primary">Bottom-Right</ejs-button>
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
    showBottomRight: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Bottom-Right",
        content: "Dialog at bottom-right corner",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "right", Y: "bottom" }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Bottom-right dialog closed.";
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

## Pixel-Based Positioning

### Custom Coordinates

```vue
<template>
  <div class="predefinedDialogs">
    <input v-model.number="posX" type="number" placeholder="X (pixels)" min="0" style="margin: 0 10px;" />
    <input v-model.number="posY" type="number" placeholder="Y (pixels)" min="0" style="margin: 0 10px;" />
    <ejs-button id="posBtn" v-on:click.native="showAtCustom" cssClass="e-primary">Show at Position</ejs-button>
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
      posX: 100,
      posY: 100
    };
  },
  methods: {
    showAtCustom: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Custom Position",
        content: "Position: (" + this.posX + "px, " + this.posY + "px)",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: this.posX, Y: this.posY }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Custom-position dialog closed.";
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

### Fixed Offset Position

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="offsetBtn" v-on:click.native="showOffset" cssClass="e-primary">Offset Position</ejs-button>
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
    showOffset: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Offset from Center",
        content: "Positioned 100px from center",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: 100, Y: 100 }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Offset dialog closed.";
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

## Position Data Interface

```typescript
interface PositionData {
  X: 'left' | 'center' | 'right' | number;
  Y: 'top' | 'center' | 'bottom' | number;
}
```

### X Axis Values
- `'left'` - Align to left edge
- `'center'` - Center horizontally
- `'right'` - Align to right edge
- `number` - Pixel offset from left

### Y Axis Values
- `'top'` - Align to top edge
- `'center'` - Center vertically
- `'bottom'` - Align to bottom edge
- `number` - Pixel offset from top

## Common Positioning Patterns

### Toast-Style Notification (Top-Right)

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="toastBtn" v-on:click.native="showToast" cssClass="e-primary">Show Toast</ejs-button>
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
    showToast: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Notification",
        content: "This appears like a toast",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "right", Y: "top" },
        cssClass: "toast-notification"
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Toast notification closed.";
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

.toast-notification {
  margin: 10px !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}
</style>
```

### Alert Box (Center)

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="alertBtn" v-on:click.native="showAlert" cssClass="e-primary">Show Alert</ejs-button>
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
        title: "Important Information",
        content: "This requires user attention",
        okButton: { text: "OK", click: this.handleOk },
        position: { X: "center", Y: "center" },
        cssClass: "alert-box"
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

### Confirmation (Slightly Above Center)

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="confirmBtn" v-on:click.native="showConfirm" cssClass="e-primary">Confirm Action</ejs-button>
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
        content: "Are you sure?",
        okButton: { text: "Yes", click: this.handleOk },
        cancelButton: { text: "No", click: this.handleCancel },
        position: { X: "center", Y: 250 }
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

## Dynamic Positioning

### Position Based on Screen Size

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="responsiveBtn" v-on:click.native="showResponsive" cssClass="e-primary">Show Responsive</ejs-button>
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
      const position = this.getResponsivePosition();
      dialogObj = DialogUtility.alert({
        title: "Responsive",
        content: "Position adjusts based on screen size",
        okButton: { text: "OK", click: this.handleOk },
        position: position
      });
    },
    getResponsivePosition: function () {
      const width = window.innerWidth;
      if (width < 600) {
        return { X: "center", Y: "center" };
      } else if (width < 1024) {
        return { X: "center", Y: "top" };
      } else {
        return { X: "right", Y: "top" };
      }
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
</style>
```

### Position Near Element

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="nearBtn" ref="targetBtn" v-on:click.native="showNearButton" cssClass="e-primary">Show Near Button</ejs-button>
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
    showNearButton: function () {
      document.getElementById("statusText").style.display = "none";
      const targetBtn = this.$refs.targetBtn ? this.$refs.targetBtn.$el : null;
      if (targetBtn) {
        const rect = targetBtn.getBoundingClientRect();
        const position = {
          X: rect.left,
          Y: rect.bottom + 10
        };
        dialogObj = DialogUtility.alert({
          title: "Near Button",
          content: "Dialog appears near the clicked button",
          okButton: { text: "OK", click: this.handleOk },
          position: position
        });
      }
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Near-button dialog closed.";
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

### Complete Position Demo

```vue
<template>
  <div class="predefinedDialogs">
    <h2>Dialog Position Examples</h2>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0;">
      <ejs-button id="tlBtn" v-on:click.native="showTopLeft" cssClass="e-primary">Top-Left</ejs-button>
      <ejs-button id="tBtn" v-on:click.native="showTop" cssClass="e-primary">Top</ejs-button>
      <ejs-button id="trBtn" v-on:click.native="showTopRight" cssClass="e-primary">Top-Right</ejs-button>

      <ejs-button id="lBtn" v-on:click.native="showLeft" cssClass="e-primary">Left</ejs-button>
      <ejs-button id="cBtn" v-on:click.native="showCenter" cssClass="e-primary">Center</ejs-button>
      <ejs-button id="rBtn" v-on:click.native="showRight" cssClass="e-primary">Right</ejs-button>

      <ejs-button id="blBtn" v-on:click.native="showBottomLeft" cssClass="e-primary">Bottom-Left</ejs-button>
      <ejs-button id="bBtn" v-on:click.native="showBottom" cssClass="e-primary">Bottom</ejs-button>
      <ejs-button id="brBtn" v-on:click.native="showBottomRight" cssClass="e-primary">Bottom-Right</ejs-button>
    </div>

    <div style="margin: 20px 0;">
      <h4>Custom Position</h4>
      <input v-model.number="customX" type="number" placeholder="X" style="padding: 5px; margin: 5px 5px 5px 0;" />
      <input v-model.number="customY" type="number" placeholder="Y" style="padding: 5px; margin: 5px 5px 5px 0;" />
      <ejs-button id="customPosBtn" v-on:click.native="showCustom" cssClass="e-primary">Show</ejs-button>
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
      customX: 50,
      customY: 50
    };
  },
  methods: {
    setStatus: function (message) {
      document.getElementById("statusText").innerHTML = message;
      document.getElementById("statusText").style.display = "block";
    },
    showPosition: function (position) {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Position Test",
        content: "Position: (" + position.X + ", " + position.Y + ")",
        okButton: { text: "OK", click: this.closeDialog },
        position: position
      });
    },
    showTopLeft: function () {
      this.showPosition({ X: "left", Y: "top" });
    },
    showTop: function () {
      this.showPosition({ X: "center", Y: "top" });
    },
    showTopRight: function () {
      this.showPosition({ X: "right", Y: "top" });
    },
    showLeft: function () {
      this.showPosition({ X: "left", Y: "center" });
    },
    showCenter: function () {
      this.showPosition({ X: "center", Y: "center" });
    },
    showRight: function () {
      this.showPosition({ X: "right", Y: "center" });
    },
    showBottomLeft: function () {
      this.showPosition({ X: "left", Y: "bottom" });
    },
    showBottom: function () {
      this.showPosition({ X: "center", Y: "bottom" });
    },
    showBottomRight: function () {
      this.showPosition({ X: "right", Y: "bottom" });
    },
    showCustom: function () {
      this.showPosition({ X: this.customX, Y: this.customY });
    },
    closeDialog: function () {
      dialogObj.hide();
      this.setStatus("Position dialog closed.");
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

- Position is relative to the viewport, not the page
- Preset values ('left', 'center', 'right', 'top', 'bottom') are responsive
- Numeric positions are in pixels from viewport edge
- Default position is `{ X: 'center', Y: 'center' }`
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- Consider viewport size when positioning
- Test positioning on different screen sizes
- Mobile devices may override positioning based on viewport constraints
