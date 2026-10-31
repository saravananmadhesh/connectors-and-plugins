# Tooltip - Animation

## Animation Support

Tooltips can animate in and out with various effects, durations, and delays.

## Basic Animation

### Fade Animation

```vue
<template>
  <button id="btn" class="e-btn">Hover for Fade</button>
  <ejs-tooltip 
    target="#btn"
    content="Fade animation"
    :animationSettings="{ effect: 'Fade', duration: 500 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Zoom Animation

```vue
<template>
  <button id="btn" class="e-btn">Hover for Zoom</button>
  <ejs-tooltip 
    target="#btn"
    content="Zoom animation"
    :animationSettings="{ effect: 'Zoom', duration: 400 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

## Animation Properties

```typescript
interface AnimationSettings {
  effect: 'Fade' | 'Zoom' | 'None';  // Animation type
  duration: number;                   // Duration in ms (default: 150)
  delay: number;                      // Delay before animation (default: 0)
}
```

## Animation Effects

### Fade

Smooth appearance/disappearance:

```vue
<template>
  <button id="btn" class="e-btn">Fade</button>
  <ejs-tooltip 
    target="#btn"
    content="Smooth fade effect"
    :animationSettings="{ effect: 'Fade', duration: 300 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Zoom

Scale-based animation:

```vue
<template>
  <button id="btn" class="e-btn">Zoom</button>
  <ejs-tooltip 
    target="#btn"
    content="Zoom in/out effect"
    :animationSettings="{ effect: 'Zoom', duration: 400 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### None

No animation:

```vue
<template>
  <button id="btn" class="e-btn">Instant</button>
  <ejs-tooltip 
    target="#btn"
    content="No animation"
    :animationSettings="{ effect: 'None' }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

## Duration Control

### Fast Animation

```vue
<template>
  <button id="btn" class="e-btn">Fast (100ms)</button>
  <ejs-tooltip 
    target="#btn"
    content="Quick animation"
    :animationSettings="{ effect: 'Fade', duration: 100 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Normal Animation

```vue
<template>
  <button id="btn" class="e-btn">Normal (300ms)</button>
  <ejs-tooltip 
    target="#btn"
    content="Standard animation"
    :animationSettings="{ effect: 'Zoom', duration: 300 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Slow Animation

```vue
<template>
  <button id="btn" class="e-btn">Slow (600ms)</button>
  <ejs-tooltip 
    target="#btn"
    content="Smooth, deliberate animation"
    :animationSettings="{ effect: 'Fade', duration: 600 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

## Delay Control

### No Delay

```vue
<template>
  <button id="btn" class="e-btn">Instant</button>
  <ejs-tooltip 
    target="#btn"
    content="Appears immediately"
    :animationSettings="{ effect: 'Fade', duration: 300, delay: 0 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### With Delay

```vue
<template>
  <button id="btn" class="e-btn">Delayed (200ms)</button>
  <ejs-tooltip 
    target="#btn"
    content="Appears after delay"
    :animationSettings="{ effect: 'Zoom', duration: 400, delay: 200 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

## Dynamic Animation

### Configurable Animation

```vue
<template>
  <div style="padding: 20px;">
    <div style="margin: 10px 0;">
      <label>Effect:</label>
      <select v-model="effect">
        <option value="Fade">Fade</option>
        <option value="Zoom">Zoom</option>
        <option value="None">None</option>
      </select>
    </div>

    <div style="margin: 10px 0;">
      <label>Duration: {{ duration }}ms</label>
      <input 
        v-model.number="duration"
        type="range"
        min="100"
        max="1000"
        step="100"
        style="width: 200px;"
      />
    </div>

    <button id="btn" class="e-btn">Hover to preview</button>

    <ejs-tooltip 
      target="#btn"
      content="Custom animation"
      :animationSettings="{ effect, duration }"
    />
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data() {
    return {
      effect: 'Fade',
      duration: 300
    };
  }
};
</script>

<style scoped>
select {
  padding: 5px;
  margin: 0 10px;
}

input[type="range"] {
  vertical-align: middle;
}
</style>
```

## Common Patterns

### Subtle Animation

```vue
<template>
  <button id="btn" class="e-btn">Info</button>
  <ejs-tooltip 
    target="#btn"
    content="Subtle fade in/out"
    :animationSettings="{ effect: 'Fade', duration: 150, delay: 0 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Emphasis Animation

```vue
<template>
  <button id="btn" class="e-btn">Important</button>
  <ejs-tooltip 
    target="#btn"
    content="Emphasized zoom effect"
    :animationSettings="{ effect: 'Zoom', duration: 500, delay: 0 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

### Delayed Emphasis

```vue
<template>
  <button id="btn" class="e-btn">Action</button>
  <ejs-tooltip 
    target="#btn"
    content="Delayed with emphasis"
    :animationSettings="{ effect: 'Zoom', duration: 400, delay: 200 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>
```

## Performance Optimization

### Disable Animation for Low-End Devices

```vue
<template>
  <button id="btn" class="e-btn">Optimized</button>
  <ejs-tooltip 
    target="#btn"
    content="Animation adaptive"
    :animationSettings="prefersReducedMotion ? { effect: 'None' } : { effect: 'Zoom', duration: 300 }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data() {
    return {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  }
};
</script>
```

### Fast Animation for Mobile

```vue
<template>
  <button id="btn" class="e-btn">Mobile Optimized</button>
  <ejs-tooltip 
    target="#btn"
    content="Fast on mobile"
    :animationSettings="{
      effect: 'Fade',
      duration: isMobile ? 150 : 300
    }"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data() {
    return {
      isMobile: window.innerWidth < 768
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
};
</script>
```

## Examples

### Complete Animation Demo

```vue
<template>
  <div style="padding: 20px;">
    <h2>Tooltip Animation Examples</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
      <div>
        <h4>Fade</h4>
        <button id="fade" class="e-btn">Hover</button>
        <ejs-tooltip target="#fade" content="Fade effect" :animationSettings="{ effect: 'Fade', duration: 300 }" />
      </div>

      <div>
        <h4>Zoom</h4>
        <button id="zoom" class="e-btn">Hover</button>
        <ejs-tooltip target="#zoom" content="Zoom effect" :animationSettings="{ effect: 'Zoom', duration: 400 }" />
      </div>

      <div>
        <h4>No Animation</h4>
        <button id="none" class="e-btn">Hover</button>
        <ejs-tooltip target="#none" content="No effect" :animationSettings="{ effect: 'None' }" />
      </div>

      <div>
        <h4>Fast</h4>
        <button id="fast" class="e-btn">Hover</button>
        <ejs-tooltip target="#fast" content="Fast (100ms)" :animationSettings="{ effect: 'Fade', duration: 100 }" />
      </div>

      <div>
        <h4>Slow</h4>
        <button id="slow" class="e-btn">Hover</button>
        <ejs-tooltip target="#slow" content="Slow (600ms)" :animationSettings="{ effect: 'Zoom', duration: 600 }" />
      </div>

      <div>
        <h4>With Delay</h4>
        <button id="delay" class="e-btn">Hover</button>
        <ejs-tooltip target="#delay" content="200ms delay" :animationSettings="{ effect: 'Fade', duration: 300, delay: 200 }" />
      </div>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h4>Custom Animation</h4>
      <div style="margin: 10px 0;">
        <label>Effect:</label>
        <select v-model="customEffect">
          <option value="Fade">Fade</option>
          <option value="Zoom">Zoom</option>
          <option value="None">None</option>
        </select>
      </div>
      <div style="margin: 10px 0;">
        <label>Duration: {{ customDuration }}ms</label>
        <input v-model.number="customDuration" type="range" min="100" max="1000" step="100" />
      </div>
      <button id="custom" class="e-btn">Hover to test</button>
      <ejs-tooltip 
        target="#custom"
        content="Custom settings"
        :animationSettings="{ effect: customEffect, duration: customDuration }"
      />
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data() {
    return {
      customEffect: 'Fade',
      customDuration: 300
    };
  }
};
</script>

<style scoped>
button {
  width: 100%;
}

select {
  padding: 5px;
  margin: 0 10px;
}
</style>
```

## Notes

- Default effect is `Fade` with 150ms duration
- Use `Zoom` for emphasis on important information
- Keep durations under 500ms for responsiveness
- Respect `prefers-reduced-motion` for accessibility
- Animation settings apply to both open and close
- Set `effect: 'None'` to disable animation completely
