# Predefined Dialog - Animation

## Animation Settings

The `DialogUtility` supports animation effects for predefined dialogs through the `animationSettings` property.

## Animation Effects

| Effect | Visual | Typical Use |
|--------|--------|------------|
| `Fade` | Smooth fade in/out | Subtle, professional |
| `FadeZoom` | Fade + zoom combined | Emphasis on importance |
| `Zoom` | Zoom from center | Modern, engaging |
| `ZoomIn` | Zoom expanding outward | Growing emphasis |
| `ZoomOut` | Zoom contracting inward | Subtle appearance |
| `SlideDown` | Slide from top | Directional entry |
| `SlideUp` | Slide from bottom | Reverse motion |
| `Flip` | 3D flip effect | Dramatic |
| `FlipLeftDown` | Flip bottom-left corner | Dynamic |
| `FlipLeftUp` | Flip top-left corner | Dynamic |
| `FlipRightDown` | Flip bottom-right corner | Dynamic |
| `FlipRightUp` | Flip top-right corner | Dynamic |
| `FlipXDown` | Horizontal flip down | Cinematic |
| `FlipXUp` | Horizontal flip up | Cinematic |
| `FlipYLeft` | Vertical flip left | Cinematic |
| `FlipYRight` | Vertical flip right | Cinematic |
| `None` | Instant appearance | No animation |

## Basic Animation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="fadeBtn" v-on:click.native="showFadeAnimation" cssClass="e-primary">Fade Animation</ejs-button>
    <ejs-button id="zoomBtn" v-on:click.native="showZoomAnimation" cssClass="e-primary">Zoom Animation</ejs-button>
    <ejs-button id="slideBtn" v-on:click.native="showSlideAnimation" cssClass="e-primary">Slide Animation</ejs-button>
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
    showFadeAnimation: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Fade Effect",
        content: "This dialog appears with fade animation",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "Fade",
          duration: 500,
          delay: 0
        }
      });
    },
    showZoomAnimation: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Zoom Effect",
        content: "This dialog zooms into view",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "Zoom",
          duration: 600,
          delay: 0
        }
      });
    },
    showSlideAnimation: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Slide Effect",
        content: "This dialog slides into view",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "SlideDown",
          duration: 400,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Animation dialog closed.";
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

## Animation Settings Options

```typescript
{
  effect: 'Fade' | 'FadeZoom' | 'Zoom' | 'ZoomIn' | 'ZoomOut' |
          'SlideDown' | 'SlideUp' | 'Flip' | 'FlipLeftDown' | 'FlipLeftUp' |
          'FlipRightDown' | 'FlipRightUp' | 'FlipXDown' | 'FlipXUp' |
          'FlipYLeft' | 'FlipYRight' | 'None',
  duration: number,               // Milliseconds
  delay: number                   // Milliseconds before animation
}
```

## Duration and Delay

```vue
<template>
  <div class="predefinedDialogs">
    <div style="margin: 10px 0;">
      <label>Duration: {{ duration }}ms</label>
      <input v-model.number="duration" type="range" min="0" max="2000" step="100" style="width: 300px;" />
    </div>

    <div style="margin: 10px 0;">
      <label>Delay: {{ delay }}ms</label>
      <input v-model.number="delay" type="range" min="0" max="1000" step="100" style="width: 300px;" />
    </div>

    <ejs-button id="animBtn" v-on:click.native="showAnimated" cssClass="e-primary">Show Dialog</ejs-button>
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
      duration: 500,
      delay: 0
    };
  },
  methods: {
    showAnimated: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Custom Animation",
        content: "Duration: " + this.duration + "ms, Delay: " + this.delay + "ms",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "Zoom",
          duration: this.duration,
          delay: this.delay
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Animated dialog closed.";
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

## Common Animation Patterns

### Fast, Snappy Animation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="fastBtn" v-on:click.native="showFast" cssClass="e-primary">Show Quick Dialog</ejs-button>
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
    showFast: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Quick Dialog",
        content: "Fast animation for snappy UX",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "Zoom",
          duration: 200,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Quick dialog closed.";
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

### Smooth, Professional Animation

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="smoothBtn" v-on:click.native="showSmooth" cssClass="e-primary">Show Smooth Dialog</ejs-button>
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
    showSmooth: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Professional Dialog",
        content: "Smooth, polished animation",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: "Fade",
          duration: 500,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Smooth dialog closed.";
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

### Delayed Animation with Entrance Effect

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="delayedBtn" v-on:click.native="showDelayed" cssClass="e-primary">Show Delayed Dialog</ejs-button>
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
    showDelayed: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.confirm({
        title: "Important Action",
        content: "Please review before proceeding",
        okButton: { text: "Proceed", click: this.handleProceed },
        cancelButton: { text: "Cancel", click: this.handleCancel },
        animationSettings: {
          effect: "FadeZoom",
          duration: 600,
          delay: 300
        }
      });
    },
    handleProceed: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "The user proceeded.";
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

### Emphasis Effect for Important Messages

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="warningBtn" v-on:click.native="showWarning" cssClass="e-warning">Show Warning</ejs-button>
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
    showWarning: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Warning",
        content: "This action requires attention",
        okButton: { text: "Acknowledge", click: this.handleOk },
        animationSettings: {
          effect: "FlipYRight",
          duration: 700,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Warning acknowledged.";
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

### Animation Showcase

```vue
<template>
  <div class="predefinedDialogs">
    <h2>Animation Effects Demo</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
      <ejs-button v-for="effect in effects" :id="'eff_' + effect" :key="effect" v-on:click.native="showAnimation(effect)" cssClass="e-primary">{{ effect }}</ejs-button>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <label>Selected Effect: {{ selectedEffect }}</label><br />
      <label>Duration: {{ duration }}ms</label><br />
      <input v-model.number="duration" type="range" min="100" max="2000" step="100" style="width: 100%; margin: 10px 0;" />
      <ejs-button id="customDurBtn" v-on:click.native="showCustom" cssClass="e-primary">Show with Custom Duration</ejs-button>
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
      effects: [
        "Fade", "FadeZoom", "Zoom", "ZoomIn", "ZoomOut",
        "SlideDown", "SlideUp", "Flip", "FlipLeftDown", "FlipLeftUp",
        "FlipRightDown", "FlipRightUp", "FlipXDown", "FlipXUp",
        "FlipYLeft", "FlipYRight"
      ],
      selectedEffect: "Fade",
      duration: 500
    };
  },
  methods: {
    showAnimation: function (effect) {
      this.selectedEffect = effect;
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: effect + " Animation",
        content: "Demonstrating " + effect + " animation effect",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: effect,
          duration: 500,
          delay: 0
        }
      });
    },
    showCustom: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: this.selectedEffect + " Animation",
        content: "Duration: " + this.duration + "ms",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: this.selectedEffect,
          duration: this.duration,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Animation dialog closed.";
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

### Multi-Dialog Animation Sequence

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="seqBtn" v-on:click.native="showSequence" cssClass="e-primary">Show Sequence</ejs-button>
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
    showSequence: function () {
      document.getElementById("statusText").style.display = "none";
      // First dialog with fade
      dialogObj = DialogUtility.alert({
        title: "Step 1",
        content: "First dialog in sequence",
        okButton: { text: "Next", click: this.showStep2 },
        animationSettings: {
          effect: "Fade",
          duration: 400,
          delay: 0
        }
      });
    },
    showStep2: function () {
      const self = this;
      setTimeout(function () {
        dialogObj = DialogUtility.alert({
          title: "Step 2",
          content: "Second dialog in sequence",
          okButton: { text: "Next", click: self.showStep3 },
          animationSettings: {
            effect: "Zoom",
            duration: 500,
            delay: 0
          }
        });
      }, 100);
    },
    showStep3: function () {
      const self = this;
      setTimeout(function () {
        dialogObj = DialogUtility.alert({
          title: "Step 3",
          content: "Final dialog in sequence",
          okButton: { text: "Done", click: self.handleDone },
          animationSettings: {
            effect: "SlideDown",
            duration: 400,
            delay: 0
          }
        });
      }, 100);
    },
    handleDone: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Sequence complete.";
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

## Performance Considerations

- Reduce duration for low-end devices (≤ 300ms)
- Use simpler effects (Fade, Zoom) for frequent dialogs
- Avoid multiple simultaneous animations
- Set delay strategically to avoid dialog overlap
- Consider motion-reduce preferences: `prefers-reduced-motion`

```vue
<template>
  <div class="predefinedDialogs">
    <ejs-button id="rmBtn" v-on:click.native="showAnimated" cssClass="e-primary">Show Dialog</ejs-button>
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
      prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    };
  },
  methods: {
    showAnimated: function () {
      document.getElementById("statusText").style.display = "none";
      dialogObj = DialogUtility.alert({
        title: "Dialog",
        content: "Content",
        okButton: { text: "OK", click: this.handleOk },
        animationSettings: {
          effect: this.prefersReducedMotion ? "None" : "Fade",
          duration: this.prefersReducedMotion ? 0 : 500,
          delay: 0
        }
      });
    },
    handleOk: function () {
      dialogObj.hide();
      document.getElementById("statusText").innerHTML = "Motion-respecting dialog closed.";
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
