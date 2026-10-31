# Tooltip - Open Mode

## Open/Close Triggers

Control when tooltips appear and disappear using the `opensOn` property.

## Open Modes

### Hover (Default)

Tooltip appears on mouse hover and disappears on mouse leave:

```vue
<template>
  <button id="btn" class="e-btn">Hover to Show</button>
  <ejs-tooltip target="#btn" opensOn="Hover" content="Appears on hover" />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Click

Tooltip appears on click and closes on second click:

```vue
<template>
  <button id="btn" class="e-btn">Click to Show</button>
  <ejs-tooltip target="#btn" opensOn="Click" content="Click to toggle" />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Focus

Tooltip appears when element receives focus:

```vue
<template>
  <input 
    id="inputRef"
    type="text"
    class="e-input"
    placeholder="Focus to see tooltip"
  >
  <ejs-tooltip target="#inputRef" opensOn="Focus" content="This is a focused tooltip" />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Custom (Programmatic)

Manually control tooltip visibility:

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <button @click="showTooltip" class="e-btn">Show</button>
    <button @click="hideTooltip" class="e-btn">Hide</button>
    <button id="btn" class="e-btn">Target</button>
  </div>

  <ejs-tooltip ref="tooltipRef" target="#btn" opensOn="Custom" content="Manual control" />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  },
  methods: {
    showTooltip() {
      this.$refs.tooltipRef?.show?.();
    },
    hideTooltip() {
      this.$refs.tooltipRef?.hide?.();
    }
  }
};
</script>
```

## Delay Options

### Open Delay

Add delay before showing tooltip:

```vue
<template>
  <button id="btn" class="e-btn">Hover (500ms delay)</button>
  <ejs-tooltip 
    target="#btn"
    :openDelay="500"
    content="Appears after delay"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Close Delay

Add delay before hiding tooltip:

```vue
<template>
  <button id="btn" class="e-btn">Hover (stays 1s after hover)</button>
  <ejs-tooltip 
    target="#btn"
    :closeDelay="1000"
    content="Stays after leaving"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Combined Delays

```vue
<template>
  <button id="btn" class="e-btn">Hover (with delays)</button>
  <ejs-tooltip 
    target="#btn"
    :openDelay="300"
    :closeDelay="500"
    content="Delayed open and close"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

## Sticky Mode

Keep tooltip open until explicitly closed:

```vue
<template>
  <button id="btn" class="e-btn">Click to toggle (sticky)</button>
  <ejs-tooltip 
    target="#btn"
    opensOn="Click"
    :isSticky="true"
    content="Click elsewhere to close"
  />
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

## Common Patterns

### Smart Tooltip (Hover with Sticky Option)

```vue
<template>
  <button 
    id="btn"
    class="e-btn"
    @click="toggleSticky"
  >
    {{ isSticky ? 'Lock' : 'Unlock' }}
  </button>

  <ejs-tooltip 
    target="#btn"
    opensOn="Hover"
    :isSticky="isSticky"
    content="Click 'Lock' to keep tooltip open"
  />
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
      isSticky: false
    };
  },
  methods: {
    toggleSticky() {
      this.isSticky = !this.isSticky;
    }
  }
};
</script>
```

### Focus Tooltip for Form Fields

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px; width: 300px;">
    <div>
      <label>Email</label>
      <input 
        id="emailInput"
        type="email"
        class="e-input"
        placeholder="your@email.com"
      >
      <ejs-tooltip 
        target="#emailInput"
        opensOn="Focus"
        :closeDelay="500"
        content="Valid email: user@domain.com"
      />
    </div>

    <div>
      <label>Password</label>
      <input 
        id="passwordInput"
        type="password"
        class="e-input"
        placeholder="••••••••"
      >
      <ejs-tooltip 
        target="#passwordInput"
        opensOn="Focus"
        :closeDelay="500"
        content="Min 8 characters with mixed case"
      />
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
</style>
```

### Click Tooltip for Details

```vue
<template>
  <button 
    id="infoBtn"
    class="e-btn"
    style="background: #007bff; color: white;"
  >
    ℹ️ Learn More
  </button>

  <ejs-tooltip 
    target="#infoBtn"
    opensOn="Click"
    :isSticky="true"
    position="BottomCenter"
  >
    <template #content>
      <div style="padding: 8px; max-width: 250px;">
        <h4 style="margin-top: 0;">Feature Details</h4>
        <ul>
          <li>First feature</li>
          <li>Second feature</li>
          <li>Third feature</li>
        </ul>
        <small>Click elsewhere to close</small>
      </div>
    </template>
  </ejs-tooltip>
</template>

<script>
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  name: 'App',
  components: {
    'ejs-tooltip': TooltipComponent
  }
};
</script>
```

### Programmatic Control

```vue
<template>
  <div style="padding: 20px;">
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button @click="showTooltip" class="e-btn">Show</button>
      <button @click="hideTooltip" class="e-btn">Hide</button>
      <button @click="toggleTooltip" class="e-btn">Toggle</button>
    </div>

    <button id="btn" class="e-btn">Target Element</button>

    <ejs-tooltip 
      ref="tooltipRef"
      target="#btn"
      opensOn="Custom"
      content="Manually controlled"
    />

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <p>Status: {{ isOpen ? 'Open' : 'Closed' }}</p>
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
      isOpen: false
    };
  },
  methods: {
    showTooltip() {
      this.$refs.tooltipRef?.show?.();
      this.isOpen = true;
    },
    hideTooltip() {
      this.$refs.tooltipRef?.hide?.();
      this.isOpen = false;
    },
    toggleTooltip() {
      if (this.isOpen) {
        this.hideTooltip();
      } else {
        this.showTooltip();
      }
    }
  }
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
```

## Examples

### Complete Open Mode Demo

```vue
<template>
  <div style="padding: 20px;">
    <h2>Tooltip Open Modes</h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
      <div>
        <h4>Hover Mode</h4>
        <button id="hoverBtn" class="e-btn">Hover to show</button>
        <ejs-tooltip target="#hoverBtn" opensOn="Hover" content="Hover tooltip" />
      </div>

      <div>
        <h4>Click Mode</h4>
        <button id="clickBtn" class="e-btn">Click to show</button>
        <ejs-tooltip target="#clickBtn" opensOn="Click" content="Click tooltip" />
      </div>

      <div>
        <h4>Focus Mode</h4>
        <input id="focusInput" type="text" class="e-input" placeholder="Focus to show">
        <ejs-tooltip target="#focusInput" opensOn="Focus" content="Focus tooltip" />
      </div>

      <div>
        <h4>Programmatic</h4>
        <button @click="showProg" class="e-btn">Show/Hide</button>
        <button id="progBtn" class="e-btn">Target</button>
        <ejs-tooltip ref="progTooltip" target="#progBtn" opensOn="Custom" content="Custom tooltip" />
      </div>
    </div>

    <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
      <h4>Delay Examples</h4>
      <button id="delayBtn" class="e-btn">Hover (300ms delay)</button>
      <ejs-tooltip target="#delayBtn" :openDelay="300" content="Delayed tooltip" />
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
      isProgOpen: false
    };
  },
  methods: {
    showProg() {
      if (this.isProgOpen) {
        this.$refs.progTooltip?.hide?.();
      } else {
        this.$refs.progTooltip?.show?.();
      }
      this.isProgOpen = !this.isProgOpen;
    }
  }
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>
```

## Notes

- Default open mode is `Hover`
- Use `Focus` for accessibility on form fields
- `Click` mode is good for detailed information
- `Custom` mode allows full programmatic control
- Delays help reduce tooltip clutter
- `isSticky` keeps tooltip visible until dismissed
