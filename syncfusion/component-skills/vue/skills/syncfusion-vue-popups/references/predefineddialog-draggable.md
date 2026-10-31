# Predefined Dialog - Draggable

## Dragging Support

Predefined dialogs using `DialogUtility` do not support built-in dragging functionality like the DialogComponent. However, you can create a draggable wrapper or use alternative approaches.

## Why Dragging Isn't Available

The `DialogUtility` class generates simple dialogs designed for quick acknowledgements, confirmations, and prompts. These are typically:
- Short-lived (disappear after user action)
- Non-interactive (no complex interactions)
- Modal (focus is on the dialog, not background)

For draggable dialogs, use the **DialogComponent** instead.

## Alternative: Draggable DialogComponent

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="openDraggableBtn" v-on:click.native="showDraggableDialog" cssClass="e-primary">Open Draggable</ejs-button>
    <span id="statusText"></span>

    <ejs-dialog
      ref="dialogRef"
      header="Draggable Dialog"
      :isModal="false"
      :allowDragging="true"
      :buttons="buttons"
      width="400px"
      :visible="false"
    >
      This dialog can be dragged by its header
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  name: "App",
  components: {
    "ejs-dialog": DialogComponent,
    "ejs-button": ButtonComponent
  },
  data: function () {
    return {
      buttons: [
        {
          buttonModel: { content: "Close", cssClass: "e-flat" },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    showDraggableDialog: function () {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    },
    closeDialog: function () {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.hide();
        document.getElementById("statusText").innerHTML = "Draggable dialog closed.";
        document.getElementById("statusText").style.display = "block";
      }
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

## Enhanced DialogUtility with Custom Dragging

For a custom solution combining DialogUtility with dragging:

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="customDraggableBtn" v-on:click.native="showDraggableAlert" cssClass="e-primary">Custom Draggable</ejs-button>
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
    showDraggableAlert: function () {
      document.getElementById("statusText").style.display = "none";
      const self = this;
      dialogObj = DialogUtility.alert({
        title: "Custom Draggable",
        content: "This uses custom CSS and JavaScript for dragging",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "custom-draggable-dialog"
      });

      // Add dragging after dialog is created
      setTimeout(function () {
        const dialog = document.querySelector(".e-dialog.custom-draggable-dialog");
        if (dialog) {
          self.makeDraggable(dialog);
        }
      }, 100);
    },
    makeDraggable: function (element) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      const header = element.querySelector(".e-dlg-header");

      const self = this;
      if (header) {
        header.style.cursor = "move";
        header.onmousedown = function (e) {
          self.dragMouseDown(e, element, pos1, pos2, pos3, pos4);
        };
      }
    },
    dragMouseDown: function (e, element, pos1, pos2, pos3, pos4) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      document.onmousemove = function (ev) {
        this.elementDrag(ev, element, pos1, pos2, pos3, pos4);
      }.bind(this);
    },
    elementDrag: function (e, element, pos1, pos2, pos3, pos4) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    },
    closeDragElement: function () {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Custom draggable dialog closed.";
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

.custom-draggable-dialog {
  position: fixed !important;
}

.custom-draggable-dialog .e-dlg-header {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
```

## Drag and Drop Example

```vue
<template>
  <div class="predefinedDialogs">
    <h3>Drag Dialog to Reposition</h3>
    <ejs-button id="openDropBtn" v-on:click.native="showDialog" cssClass="e-primary">Open Dialog</ejs-button>
    <span id="statusText"></span>

    <div
      id="drop-zone"
      style="margin-top: 20px; padding: 20px; background: #f5f5f5; min-height: 200px; border: 2px dashed #ccc;"
      @dragover.prevent
      @drop="handleDrop"
    >
      Drag dialog here to snap
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
  methods: {
    showDialog: function () {
      document.getElementById("statusText").style.display = "none";
      const self = this;
      dialogObj = DialogUtility.alert({
        title: "Draggable Alert",
        content: "Try dragging this dialog",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "draggable-dialog"
      });

      setTimeout(function () {
        const dialog = document.querySelector(".e-dialog.draggable-dialog");
        if (dialog) {
          self.makeDialogDraggable(dialog);
        }
      }, 100);
    },
    makeDialogDraggable: function (element) {
      let offsetX = 0, offsetY = 0;
      const header = element.querySelector(".e-dlg-header");

      element.style.position = "fixed";
      element.style.cursor = "move";

      const self = this;
      if (header) {
        header.onmousedown = function (e) {
          e.preventDefault();
          offsetX = e.clientX - element.offsetLeft;
          offsetY = e.clientY - element.offsetTop;

          document.onmousemove = function (moveEvent) {
            element.style.left = (moveEvent.clientX - offsetX) + "px";
            element.style.top = (moveEvent.clientY - offsetY) + "px";
          };

          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    },
    handleDrop: function (e) {
      e.preventDefault();
      document.getElementById("statusText").innerHTML = "Dropped at: " + e.clientX + ", " + e.clientY;
      document.getElementById("statusText").style.display = "block";
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Draggable dialog closed.";
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

.draggable-dialog {
  position: fixed !important;
}
</style>
```

## Touch Support for Mobile

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="touchBtn" v-on:click.native="showTouchDialog" cssClass="e-primary">Open (Touch Enabled)</ejs-button>
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
    showTouchDialog: function () {
      document.getElementById("statusText").style.display = "none";
      const self = this;
      dialogObj = DialogUtility.alert({
        title: "Touch Draggable",
        content: "Draggable on touch devices",
        okButton: { text: "OK", click: this.handleOk },
        cssClass: "touch-draggable-dialog"
      });

      setTimeout(function () {
        const dialog = document.querySelector(".e-dialog.touch-draggable-dialog");
        if (dialog) {
          self.makeTouchDraggable(dialog);
        }
      }, 100);
    },
    makeTouchDraggable: function (element) {
      let startX = 0, startY = 0;
      const header = element.querySelector(".e-dlg-header");

      element.style.position = "fixed";
      element.style.touchAction = "none";

      const self = this;
      const handleStart = function (e) {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        element.style.zIndex = 10000;
      };

      const handleMove = function (e) {
        const moveX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
        const moveY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
        element.style.left = (element.offsetLeft + moveX) + "px";
        element.style.top = (element.offsetTop + moveY) + "px";
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
      };

      if (header) {
        header.addEventListener("mousedown", handleStart);
        header.addEventListener("touchstart", handleStart);
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("touchmove", handleMove);

        document.addEventListener("mouseup", function () {
          document.removeEventListener("mousemove", handleMove);
        });

        document.addEventListener("touchend", function () {
          document.removeEventListener("touchmove", handleMove);
        });
      }
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Touch-draggable dialog closed.";
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

.touch-draggable-dialog {
  position: fixed !important;
}

.touch-draggable-dialog .e-dlg-header {
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
</style>
```

## Examples

### Recommendation: Use DialogComponent for Dragging

For production applications, the DialogComponent is the recommended solution:

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="toggleDragBtn" v-on:click.native="toggleDialog" cssClass="e-primary">{{ isOpen ? 'Close' : 'Open' }} Draggable Dialog</ejs-button>
    <span id="statusText"></span>

    <ejs-dialog
      ref="dialogRef"
      header="Draggable Dialog"
      :isModal="false"
      :allowDragging="true"
      :enableResize="true"
      :buttons="buttons"
      width="450px"
      :visible="isOpen"
      @close="onDialogClose"
    >
      <div style="padding: 20px;">
        <p>Drag the header to move this dialog.</p>
        <p>Resize from corners or edges.</p>
        <p>Features are built-in and fully optimized.</p>
      </div>
    </ejs-dialog>
  </div>
</template>

<script>
import { DialogComponent } from "@syncfusion/ej2-vue-popups";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  name: "App",
  components: {
    "ejs-dialog": DialogComponent,
    "ejs-button": ButtonComponent
  },
  data: function () {
    return {
      isOpen: false,
      buttons: [
        {
          buttonModel: { content: "Close", cssClass: "e-flat" },
          click: this.closeDialog
        }
      ]
    };
  },
  methods: {
    toggleDialog: function () {
      this.isOpen = !this.isOpen;
    },
    onDialogClose: function () {
      this.isOpen = false;
    },
    closeDialog: function () {
      this.isOpen = false;
      document.getElementById("statusText").innerHTML = "Draggable DialogComponent closed.";
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

- **Best Practice**: Use `DialogComponent` with `:allowDragging="true"` for draggable dialogs
- Use the Syncfusion Vue `ButtonComponent` (`<ejs-button>`) for triggering dialogs, as shown in the official documentation
- The Syncfusion button uses `v-on:click.native` (in Vue 2) to bind native click events to the host element
- `DialogUtility` is optimized for simple, modal dialogs
- Custom dragging requires manual event handling
- Consider performance on mobile devices
- Touch support must be explicitly added
- Test across browsers for drag consistency
