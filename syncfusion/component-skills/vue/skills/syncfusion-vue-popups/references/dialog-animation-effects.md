# Animation Effects

## Table of Contents
- [Animation Settings](#animation-settings)
- [16 Available Effects](#16-available-effects)
- [Duration and Delay](#duration-and-delay)
- [Disable Animations](#disable-animations)
- [Performance Considerations](#performance-considerations)
- [Examples](#examples)

## Animation Settings

The `animationSettings` prop controls dialog opening/closing animations:

```vue
<template>
  <ejs-dialog
    header="Animated"
    :animationSettings="animationSettings"
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
  },
  data: function() {
    return {
      animationSettings: { effect: 'Zoom', duration: 400, delay: 0 }
    };
  }
};
</script>
```

**AnimationSettingsModel:**
```typescript
animationSettings: {
  effect: string,      // Animation effect name
  duration: number,    // Duration in milliseconds
  delay: number        // Delay before animation starts (ms)
}
```

## 16 Available Effects

| Effect | Description |
|--------|-------------|
| `Fade` | Fade in/out effect |
| `FadeZoom` | Fade + zoom combined |
| `Flip` | Flip effect |
| `FlipLeftDown` | Flip from top-left to bottom-right |
| `FlipLeftUp` | Flip from bottom-left to top-right |
| `FlipRightDown` | Flip from top-right to bottom-left |
| `FlipRightUp` | Flip from bottom-right to top-left |
| `FlipXDown` | Flip on X axis downward |
| `FlipXUp` | Flip on X axis upward |
| `FlipYLeft` | Flip on Y axis leftward |
| `FlipYRight` | Flip on Y axis rightward |
| `Zoom` | Zoom in/out effect |
| `ZoomIn` | Zoom in only |
| `ZoomOut` | Zoom out only |
| `SlideDown` | Slide down effect |
| `SlideUp` | Slide up effect |

### Example: All Effects

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 20px">
    <button v-for="effect in effects" :key="effect" @click="showDialog(effect)" class="e-btn">
      {{ effect }}
    </button>

    <ejs-dialog
      v-if="selectedEffect"
      ref="dialogRef"
      header="Animation Effect"
      :animationSettings="getAnimationSettings"
      width="300px"
      @close="resetEffect"
    >
      <p>This dialog is animated with {{ selectedEffect }} effect.</p>
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
      effects: [
        'Fade', 'FadeZoom', 'Flip', 'FlipLeftDown',
        'FlipLeftUp', 'FlipRightDown', 'FlipRightUp', 'FlipXDown',
        'FlipXUp', 'FlipYLeft', 'FlipYRight', 'Zoom',
        'ZoomIn', 'ZoomOut', 'SlideDown', 'SlideUp'
      ],
      selectedEffect: null
    };
  },
  computed: {
    getAnimationSettings: function() {
      return {
        effect: this.selectedEffect,
        duration: 400,
        delay: 0
      };
    }
  },
  methods: {
    showDialog: function(effect) {
      this.selectedEffect = effect;
      const self = this;
      setTimeout(function() {
        if (self.$refs.dialogRef) {
          self.$refs.dialogRef.show();
        }
      }, 0);
    },
    resetEffect: function() {
      this.selectedEffect = null;
    }
  }
};
</script>
```

## Duration and Delay

Control animation timing:

```vue
<template>
  <div id="dialog-target" style="position: relative; padding: 20px">
    <div style="margin-bottom: 20px">
      <label>Duration: {{ duration }}ms</label>
      <input v-model.number="duration" type="range" min="100" max="2000" step="100" style="width: 300px" />
    </div>

    <div style="margin-bottom: 20px">
      <label>Delay: {{ delay }}ms</label>
      <input v-model.number="delay" type="range" min="0" max="1000" step="100" style="width: 300px" />
    </div>

    <button @click="showDialog" class="e-btn">Show Dialog</button>

    <ejs-dialog
      ref="dialogRef"
      header="Custom Animation Timing"
      :animationSettings="animationSettings"
      target="#dialog-target"
      :visible="false"
      width="300px"
    >
      <p>Adjust the duration and delay above to see the effect.</p>
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
      duration: 400,
      delay: 0
    };
  },
  computed: {
    animationSettings: function() {
      return {
        effect: 'Zoom',
        duration: this.duration,
        delay: this.delay
      };
    }
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    }
  }
};
</script>
```

## Disable Animations

Set effect to `'None'` to disable animations:

```vue
<template>
  <ejs-dialog
    header="No Animation"
    :animationSettings="{ effect: 'None' }"
  >
    This dialog appears instantly without animation.
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

## Performance Considerations

**Tips for optimal performance:**

1. **Use simpler effects** - Fade and Zoom are faster than complex flips
2. **Reduce duration** for faster animations (200-300ms recommended)
3. **Disable animations** on low-end devices:

```vue
<template>
  <ejs-dialog :animationSettings="animationSettings">
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
  computed: {
    isLowEnd: function() {
      // Detect low-end device
      return navigator.deviceMemory < 4;
    },
    animationSettings: function() {
      return {
        effect: this.isLowEnd ? 'None' : 'Zoom',
        duration: this.isLowEnd ? 0 : 400,
        delay: 0
      };
    }
  }
};
</script>
```

## Examples

### Example 1: Different Effects Showcase

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 20px">
      <p>Click any button to see the effect:</p>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px">
        <button @click="current='Fade'; show()" class="e-btn">Fade</button>
        <button @click="current='Zoom'; show()" class="e-btn">Zoom</button>
        <button @click="current='FlipLeftDown'; show()" class="e-btn">FlipLeftDown</button>
        <button @click="current='SlideDown'; show()" class="e-btn">SlideDown</button>
      </div>
    </div>

    <ejs-dialog
      v-if="isVisible"
      ref="dialogRef"
      header="Animation Demo"
      :animationSettings="currentAnimationSettings"
      width="350px"
      @close="hideDialog"
    >
      <p style="text-align: center; padding: 20px">
        <span style="font-size: 24px; font-weight: bold">{{ current }}</span>
        <br />
        <span style="color: #666">Animation Effect</span>
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
      current: 'Fade',
      isVisible: false
    };
  },
  computed: {
    currentAnimationSettings: function() {
      return {
        effect: this.current,
        duration: 500,
        delay: 0
      };
    }
  },
  methods: {
    show: function(effect) {
      this.current = effect;
      this.isVisible = true;
      const self = this;
      setTimeout(function() {
        if (self.$refs.dialogRef) {
          self.$refs.dialogRef.show();
        }
      }, 0);
    },
    hideDialog: function() {
      this.isVisible = false;
    }
  }
};
</script>
```

### Example 2: Staggered Animations

```vue
<template>
  <div id="target" style="position: relative; height: 500px; padding: 20px">
    <button @click="showAll" class="e-btn e-primary">Show All</button>

    <ejs-dialog
      header="Dialog 1"
      :animationSettings="{ effect: 'Fade', duration: 400, delay: 0 }"
      :position="{ X: 50, Y: 100 }"
      width="250px"
      :visible="visible1"
      target="#target"
    >
      First dialog
    </ejs-dialog>

    <ejs-dialog
      header="Dialog 2"
      :animationSettings="{ effect: 'Fade', duration: 400, delay: 150 }"
      :position="{ X: 350, Y: 100 }"
      width="250px"
      :visible="visible2"
      target="#target"
    >
      Second dialog
    </ejs-dialog>

    <ejs-dialog
      header="Dialog 3"
      :animationSettings="{ effect: 'Fade', duration: 400, delay: 300 }"
      :position="{ X: 200, Y: 300 }"
      width="250px"
      :visible="visible3"
      target="#target"
    >
      Third dialog
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
      visible1: false,
      visible2: false,
      visible3: false
    };
  },
  methods: {
    showAll: function() {
      this.visible1 = true;
      this.visible2 = true;
      this.visible3 = true;
    }
  }
};
</script>
```

### Example 3: Conditional Animation

```vue
<template>
  <div>
    <label style="display: flex; align-items: center; gap: 8px">
      <input v-model="animationEnabled" type="checkbox" />
      Enable Animation
    </label>

    <button @click="showDialog" class="e-btn">Show</button>

    <ejs-dialog
      ref="dialogRef"
      header="Conditional Animation"
      :animationSettings="animationSettings"
      width="350px"
      :visible="false"
    >
      Animation is {{ animationEnabled ? 'enabled' : 'disabled' }}
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
      animationEnabled: true
    };
  },
  computed: {
    animationSettings: function() {
      return {
        effect: this.animationEnabled ? 'Zoom' : 'None',
        duration: 400,
        delay: 0
      };
    }
  },
  methods: {
    showDialog: function() {
      if (this.$refs.dialogRef) {
        this.$refs.dialogRef.show();
      }
    }
  }
};
</script>
```

## Key Takeaways

- **16 effects** available for different use cases
- **Duration** controls speed (200-500ms recommended)
- **Delay** creates staggered animations
- **Set effect to 'None'** to disable animations
- **Consider performance** on low-end devices

**Next:** Choose another reference topic based on your needs.
