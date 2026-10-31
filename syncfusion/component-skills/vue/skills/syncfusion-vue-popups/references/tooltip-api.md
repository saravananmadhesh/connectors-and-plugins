# Tooltip - API Reference

## Component Properties

### Content

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string | '' | Tooltip content text or HTML |
| `template` | string | '' | HTML template for tooltip content |

### Target & Position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | Element \| string | null | Target element or selector |
| `position` | string | 'TopCenter' | Tooltip position relative to target |
| `offsetX` | number | 0 | Horizontal offset in pixels |
| `offsetY` | number | 0 | Vertical offset in pixels |
| `collision` | string | 'flip' | Collision handling: 'flip', 'fit', 'flipfit' |

### Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opensOn` | string | 'Hover' | When to open: 'Hover', 'Click', 'Focus', 'Custom' |
| `isSticky` | boolean | false | Keep tooltip open until dismissed |
| `closeDelay` | number | 0 | Delay (ms) before closing |
| `openDelay` | number | 0 | Delay (ms) before opening |

### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | string | '' | Additional CSS class |
| `tooltipPosition` | string | 'Auto' | Position precedence |
| `windowCollision` | boolean | false | Auto-adjust to stay in viewport |

### Animation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationSettings` | AnimationSettings | {effect: 'Fade', duration: 150} | Animation configuration |

### Localization

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | string | 'en-US' | Locale for text direction |
| `enableRtl` | boolean | false | Enable right-to-left mode |

### Other

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTipPointer` | boolean | true | Show arrow pointer |
| `width` | string | 'auto' | Tooltip width |
| `height` | string | 'auto' | Tooltip height |
| `id` | string | Generated | Component ID |

## Events

### Opening Events

```typescript
interface TooltipBeforeOpenArgs {
  target: Element;
  cancel: boolean;
  type: string;
}
```

**beforeOpen Event:**
```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip 
    target="#btn"
    content="Tooltip"
    @beforeOpen="onBeforeOpen"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    onBeforeOpen(args) {
      console.log('Opening tooltip for:', args.target);
      // Return true to allow, false to prevent
      args.cancel = false;
    }
  }
};
</script>
```

### Open Event

```typescript
interface TooltipOpenArgs {
  target: Element;
  type: string;
}
```

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip 
    target="#btn"
    content="Tooltip"
    @open="onOpen"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    onOpen(args) {
      console.log('Tooltip opened');
    }
  }
};
</script>
```

### Closing Events

```typescript
interface TooltipBeforeCloseArgs {
  target: Element;
  cancel: boolean;
  isSticky: boolean;
}
```

**beforeClose Event:**
```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip 
    target="#btn"
    content="Tooltip"
    @beforeClose="onBeforeClose"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    onBeforeClose(args) {
      console.log('Closing tooltip from:', args.target);
    }
  }
};
</script>
```

### Close Event

```typescript
interface TooltipCloseArgs {
  target: Element;
  type: string;
}
```

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip 
    target="#btn"
    content="Tooltip"
    @close="onClose"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    onClose(args) {
      console.log('Tooltip closed');
    }
  }
};
</script>
```

## Methods

### show()

Display the tooltip:

```vue
<template>
  <button @click="showTooltip" class="e-btn">Show Tooltip</button>
  <button id="target" class="e-btn" style="display: none;">Target</button>
  <ejs-tooltip 
    ref="tooltip"
    target="#target"
    content="Displayed programmatically"
    opensOn="Custom"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    showTooltip() {
      this.$refs.tooltip?.show();
    }
  }
};
</script>
```

### hide()

Hide the tooltip:

```vue
<template>
  <button @click="hideTooltip" class="e-btn">Hide Tooltip</button>
  <button id="target" class="e-btn">Target</button>
  <ejs-tooltip 
    ref="tooltip"
    target="#target"
    content="Click button to hide"
    :isSticky="true"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    hideTooltip() {
      this.$refs.tooltip?.hide();
    }
  }
};
</script>
```

### toggle()

Toggle tooltip visibility:

```vue
<template>
  <button @click="toggleTooltip" class="e-btn">Toggle Tooltip</button>
  <button id="target" class="e-btn">Target</button>
  <ejs-tooltip 
    ref="tooltip"
    target="#target"
    content="Toggle visibility"
    opensOn="Custom"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    toggleTooltip() {
      this.$refs.tooltip?.toggle();
    }
  }
};
</script>
```

### refresh()

Refresh tooltip position:

```vue
<template>
  <div style="overflow: auto; height: 300px; border: 1px solid #ddd;">
    <div style="padding: 50px; height: 500px;">
      <button id="target" class="e-btn">Hover</button>
      <ejs-tooltip 
        ref="tooltip"
        target="#target"
        content="Scroll container to test refresh"
      />
    </div>
  </div>
  <button @click="refreshPosition" class="e-btn" style="margin-top: 10px;">Refresh Position</button>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    refreshPosition() {
      this.$refs.tooltip?.refresh();
    }
  }
};
</script>
```

### destroy()

Destroy tooltip instance:

```vue
<template>
  <button @click="destroyTooltip" class="e-btn">Destroy</button>
  <button id="target" class="e-btn">Target</button>
  <ejs-tooltip 
    ref="tooltip"
    target="#target"
    content="This will be destroyed"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    destroyTooltip() {
      this.$refs.tooltip?.destroy();
    }
  }
};
</script>
```

## Position Options

```typescript
type TooltipPosition =
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'LeftTop'
  | 'LeftCenter'
  | 'LeftBottom'
  | 'RightTop'
  | 'RightCenter'
  | 'RightBottom'
  | 'BottomLeft'
  | 'BottomCenter'
  | 'BottomRight';
```

## Open Modes

```typescript
type TooltipOpenMode =
  | 'Hover'   // Open on mouse hover
  | 'Click'   // Open on click
  | 'Focus'   // Open on focus
  | 'Custom'; // Manual control only
```

## Animation Types

```typescript
interface AnimationSettings {
  effect: 'Fade' | 'Zoom' | 'None';
  duration: number;  // ms
  delay: number;     // ms
}
```

## Examples

### Complete API Demo

```vue
<template>
  <div style="padding: 20px; max-width: 600px;">
    <h2>Tooltip API Reference</h2>

    <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <h3>Interactive Demo</h3>

      <div style="margin: 10px 0;">
        <label>Position:</label>
        <select v-model="selectedPosition" style="padding: 5px; margin-left: 10px;">
          <option>TopCenter</option>
          <option>RightCenter</option>
          <option>BottomCenter</option>
          <option>LeftCenter</option>
        </select>
      </div>

      <div style="margin: 10px 0;">
        <label>Open Mode:</label>
        <select v-model="openMode" style="padding: 5px; margin-left: 10px;">
          <option>Hover</option>
          <option>Click</option>
          <option>Focus</option>
          <option>Custom</option>
        </select>
      </div>

      <div style="margin: 10px 0;">
        <label>
          <input type="checkbox" v-model="isSticky" />
          Sticky (Keep Open)
        </label>
      </div>

      <div style="margin: 20px 0; padding: 20px; background: white; border: 1px solid #ddd; text-align: center; min-height: 50px; display: flex; align-items: center; justify-content: center;">
        <button id="target" class="e-btn">
          {{ openMode === 'Custom' ? 'Use buttons below' : 'Interact with tooltip' }}
        </button>

        <ejs-tooltip 
          ref="tooltip"
          target="#target"
          :content="`Tooltip - ${selectedPosition}`"
          :position="selectedPosition"
          :opensOn="openMode"
          :isSticky="isSticky"
          @beforeOpen="onBeforeOpen"
          @open="onOpen"
          @beforeClose="onBeforeClose"
          @close="onClose"
        />
      </div>

      <div v-if="openMode === 'Custom'" style="margin: 10px 0; display: flex; gap: 10px;">
        <button @click="showTooltip" class="e-btn">Show</button>
        <button @click="hideTooltip" class="e-btn">Hide</button>
        <button @click="toggleTooltip" class="e-btn">Toggle</button>
      </div>

      <div style="margin: 15px 0; padding: 10px; background: #e8f5e9; border-left: 4px solid #4CAF50; border-radius: 4px; font-size: 12px;">
        <strong>Events Log:</strong>
        <div v-for="(log, idx) in eventLogs.slice(-3)" :key="idx" style="margin-top: 4px;">
          {{ log }}
        </div>
      </div>
    </div>

    <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <h3>Properties Reference</h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background: #e0e0e0;">
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Property</th>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Value</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Position</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{ selectedPosition }}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Open Mode</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{ openMode }}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Is Sticky</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{ isSticky }}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Is Open</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{ isOpen }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  },
  data() {
    return {
      selectedPosition: 'TopCenter',
      openMode: 'Hover',
      isSticky: false,
      isOpen: false,
      eventLogs: []
    };
  },
  methods: {
    logEvent(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.eventLogs.push(`[${timestamp}] ${message}`);
    },
    onBeforeOpen(args) {
      this.logEvent('beforeOpen event fired');
    },
    onOpen(args) {
      this.isOpen = true;
      this.logEvent('open event fired');
    },
    onBeforeClose(args) {
      this.logEvent('beforeClose event fired');
    },
    onClose(args) {
      this.isOpen = false;
      this.logEvent('close event fired');
    },
    showTooltip() {
      this.$refs.tooltip?.show();
      this.logEvent('show() called');
    },
    hideTooltip() {
      this.$refs.tooltip?.hide();
      this.logEvent('hide() called');
    },
    toggleTooltip() {
      this.$refs.tooltip?.toggle();
      this.logEvent('toggle() called');
    }
  }
};
</script>

<style scoped>
table {
  margin-top: 10px;
}

tr:nth-child(even) {
  background: #fafafa;
}

button {
  margin: 5px 0;
}
</style>
```

## Notes

- All position names use PascalCase
- `opensOn="Custom"` requires manual show/hide calls
- Events can be cancelled by setting `args.cancel = true`
- `show()`, `hide()`, `toggle()` work regardless of `opensOn` mode
- Animation settings apply to both open and close
- `windowCollision` auto-adjusts tooltip to stay visible in viewport
- Template takes precedence over `content` property
