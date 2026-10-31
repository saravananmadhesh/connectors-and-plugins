# Tooltip - Getting Started

## Overview

The Tooltip component provides contextual information when users hover over or interact with UI elements. Perfect for hints, descriptions, and secondary information.

## Installation

```bash
npm install @syncfusion/ej2-vue-popups
npm install @syncfusion/ej2-material3-theme --save
```

## Quick Start

### Basic Tooltip

```vue
<template>
  <div id="app">
    <div id="container">
      <ejs-tooltip content="Tooltip content" target="#target">
        <button id="target">Show Tooltip</button>
      </ejs-tooltip>
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

### Tooltip Component

```vue
<template>
  <div id="app">
    <ejs-tooltip content="This is a tooltip" target="#hoverBtn">
      <button id="hoverBtn" class="e-btn">Hover for Info</button>
    </ejs-tooltip>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

## Template-Based Tooltip

```vue
<template>
  <div style="padding: 20px;">
    <input id="nameInput" type="text" class="e-input" placeholder="Hover over field">
    
    <ejs-tooltip target="#nameInput" position="TopCenter">
      <div style="padding: 8px;">
        <strong>Enter your name</strong><br/>
        <small>Min 3 characters</small>
      </div>
    </ejs-tooltip>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

## Multiple Targets

```vue
<template>
  <div style="padding: 20px;">
    <div style="display: flex; gap: 10px;">
      <button class="tooltip-btn" title="Button 1 tooltip">Button 1</button>
      <button class="tooltip-btn" title="Button 2 tooltip">Button 2</button>
      <button class="tooltip-btn" title="Button 3 tooltip">Button 3</button>
    </div>

    <ejs-tooltip target=".tooltip-btn">
    </ejs-tooltip>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

## Tooltip Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string \| Function | '' | Tooltip text/HTML |
| `target` | string \| HTMLElement | - | Element to attach tooltip |
| `position` | string | 'TopCenter' | Tooltip placement |
| `openDelay` | number | 0 | Delay before opening (ms) |
| `closeDelay` | number | 0 | Delay before closing (ms) |
| `opensOn` | string | 'Hover' | Trigger event |
| `showTipPointer` | boolean | true | Show arrow pointer |
| `width` | string \| number | 'auto' | Tooltip width |
| `height` | string \| number | 'auto' | Tooltip height |
| `cssClass` | string | '' | Custom CSS classes |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML |
| `enableSticky` | boolean | false | Keep open until click |

## Common Patterns

### Info Icon Tooltip

```vue
<template>
  <div style="display: flex; align-items: center; gap: 10px;">
    <label>Username</label>
    <span id="infoIcon" class="e-icon-info" style="cursor: help;">
      ℹ️
    </span>

    <ejs-tooltip target="#infoIcon" content="Enter a unique username (3+ characters)">
    </ejs-tooltip>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

### Help Text on Focus

```vue
<template>
  <div style="padding: 20px;">
    <input
      id="emailInput"
      type="email"
      class="e-input"
      placeholder="your@email.com"
      @focus="showTooltip"
    >

    <ejs-tooltip ref="tooltipRef" target="#emailInput" position="BottomCenter" content="Valid format: example@domain.com">
    </ejs-tooltip>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    showTooltip: function() {
      this.$refs.tooltipRef.open();
    }
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

### Keyboard Shortcut Tooltip

```vue
<template>
  <button id="saveBtn" class="e-btn" @click="save">Save</button>

  <ejs-tooltip target="#saveBtn" content="Shortcut: Ctrl+S">
  </ejs-tooltip>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  methods: {
    save: function() {
      console.log('Saving...');
    }
  },
  mounted: function() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.save();
      }
    });
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

## Position Options

- `TopLeft`, `TopCenter`, `TopRight`
- `LeftTop`, `LeftCenter`, `LeftBottom`
- `RightTop`, `RightCenter`, `RightBottom`
- `BottomLeft`, `BottomCenter`, `BottomRight`

```vue
<template>
  <div style="padding: 20px;">
    <div style="display: grid; grid-template-columns: repeat(3, 100px); gap: 20px;">
      <button id="tl" class="e-btn">TL</button>
      <button id="tc" class="e-btn">TC</button>
      <button id="tr" class="e-btn">TR</button>

      <button id="ll" class="e-btn">LL</button>
      <button id="lc" class="e-btn">LC</button>
      <button id="lr" class="e-btn">LR</button>

      <button id="rl" class="e-btn">RL</button>
      <button id="rc" class="e-btn">RC</button>
      <button id="rr" class="e-btn">RR</button>

      <button id="bl" class="e-btn">BL</button>
      <button id="bc" class="e-btn">BC</button>
      <button id="br" class="e-btn">BR</button>
    </div>

    <!-- Tooltips for each position -->
    <ejs-tooltip target="#tl" position="TopLeft" content="TopLeft" />
    <ejs-tooltip target="#tc" position="TopCenter" content="TopCenter" />
    <ejs-tooltip target="#tr" position="TopRight" content="TopRight" />
    <ejs-tooltip target="#ll" position="LeftTop" content="LeftTop" />
    <ejs-tooltip target="#lc" position="LeftCenter" content="LeftCenter" />
    <ejs-tooltip target="#lr" position="LeftBottom" content="LeftBottom" />
    <ejs-tooltip target="#rl" position="RightTop" content="RightTop" />
    <ejs-tooltip target="#rc" position="RightCenter" content="RightCenter" />
    <ejs-tooltip target="#rr" position="RightBottom" content="RightBottom" />
    <ejs-tooltip target="#bl" position="BottomLeft" content="BottomLeft" />
    <ejs-tooltip target="#bc" position="BottomCenter" content="BottomCenter" />
    <ejs-tooltip target="#br" position="BottomRight" content="BottomRight" />
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";

button {
  width: 100%;
}
</style>
```

## Events

| Event | Arguments | Description |
|-------|-----------|-------------|
| `beforeOpen` | TooltipEventArgs | Before tooltip opens |
| `afterOpen` | TooltipEventArgs | Tooltip opened |
| `beforeClose` | TooltipEventArgs | Before tooltip closes |
| `afterClose` | TooltipEventArgs | Tooltip closed |

```vue
<template>
  <button id="btn" class="e-btn">Event Demo</button>

  <ejs-tooltip
    target="#btn"
    content="Tooltip with events"
    @beforeOpen="onBeforeOpen"
    @afterOpen="onAfterOpen"
    @beforeClose="onBeforeClose"
    @afterClose="onAfterClose"
  />

  <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
    <p>Last Event: {{ lastEvent }}</p>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data: function() {
    return {
      lastEvent: ''
    };
  },
  methods: {
    onBeforeOpen: function() {
      this.lastEvent = 'beforeOpen';
    },
    onAfterOpen: function() {
      this.lastEvent = 'afterOpen';
    },
    onBeforeClose: function() {
      this.lastEvent = 'beforeClose';
    },
    onAfterClose: function() {
      this.lastEvent = 'afterClose';
    }
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
</style>
```

## Examples

### Complete Tooltip Demo

```vue
<template>
  <div style="padding: 20px;">
    <h2>Tooltip Examples</h2>

    <div style="margin: 20px 0;">
      <h4>Basic Tooltips</h4>
      <button id="btn1" class="e-btn">Hover Button</button>
      <ejs-tooltip target="#btn1" content="Simple tooltip" />
    </div>

    <div style="margin: 20px 0;">
      <h4>Position Examples</h4>
      <button id="btn2" class="e-btn">Top Position</button>
      <ejs-tooltip target="#btn2" position="TopCenter" content="Top positioned" />
      
      <button id="btn3" class="e-btn">Bottom Position</button>
      <ejs-tooltip target="#btn3" position="BottomCenter" content="Bottom positioned" />
    </div>

    <div style="margin: 20px 0;">
      <h4>Rich Content</h4>
      <button id="btn4" class="e-btn">Rich Tooltip</button>
      <ejs-tooltip target="#btn4">
        <div style="padding: 8px;">
          <strong>Rich Content</strong><br/>
          <small>With HTML formatting</small>
        </div>
      </ejs-tooltip>
    </div>

    <div style="margin: 20px 0;">
      <h4>Events</h4>
      <p>Open count: {{ openCount }}</p>
      <button id="btn5" class="e-btn">Event Tracker</button>
      <ejs-tooltip
        target="#btn5"
        content="Tracked tooltip"
        @afterOpen="increaseCount"
      />
    </div>
  </div>
</template>

<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";

export default {
  name: "App",
  components: {
    "ejs-tooltip": TooltipComponent
  },
  data: function() {
    return {
      openCount: 0
    };
  },
  methods: {
    increaseCount: function() {
      this.openCount++;
    }
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";

button {
  margin: 5px;
}
</style>
```

## Next Steps

- Learn [positioning and placement strategies](./tooltip-position.md)
- Explore [content templates](./tooltip-content.md)
- Discover [animation effects](./tooltip-animation.md)
- Check [accessibility features](./tooltip-accessibility.md)
