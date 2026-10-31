# Tooltip - Position

## Position Options

Tooltips can be positioned in 12 different locations around target elements.

## Position Values

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
  | 'BottomRight'
```

## Top Positions

### TopLeft

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="TopLeft" content="TopLeft" />
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

### TopCenter

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="TopCenter" content="TopCenter" />
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

### TopRight

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="TopRight" content="TopRight" />
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

## Left Positions

### LeftTop

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="LeftTop" content="LeftTop" />
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

### LeftCenter

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="LeftCenter" content="LeftCenter" />
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

### LeftBottom

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="LeftBottom" content="LeftBottom" />
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

## Right Positions

### RightTop

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="RightTop" content="RightTop" />
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

### RightCenter

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="RightCenter" content="RightCenter" />
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

### RightBottom

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="RightBottom" content="RightBottom" />
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

## Bottom Positions

### BottomLeft

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="BottomLeft" content="BottomLeft" />
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

### BottomCenter

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="BottomCenter" content="BottomCenter" />
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

### BottomRight

```vue
<template>
  <button id="btn" class="e-btn">Hover</button>
  <ejs-tooltip target="#btn" position="BottomRight" content="BottomRight" />
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

## Dynamic Positioning

### Automatic Collision Detection

Tooltips automatically reposition if they'd go off-screen:

```vue
<template>
  <button id="btn" class="e-btn">Auto Position</button>
  <ejs-tooltip 
    target="#btn"
    position="TopCenter"
    content="Repositions if off-screen"
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

### Position Based on Space

```vue
<template>
  <div style="display: flex; gap: 20px; margin: 50px 0;">
    <button id="left" class="e-btn">Left Space</button>
    <button id="center" class="e-btn" style="margin: 0 auto;">Center</button>
    <button id="right" class="e-btn">Right Space</button>
  </div>

  <ejs-tooltip target="#left" position="LeftCenter" content="Left aligned" />
  <ejs-tooltip target="#center" position="BottomCenter" content="Bottom" />
  <ejs-tooltip target="#right" position="RightCenter" content="Right aligned" />
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

## Relative Positioning

### Near Form Fields

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px; width: 300px;">
    <div>
      <lid="usernameInput"
        type="text"
        class="e-input"
        placeholder="3+ characters"
      >
      <ejs-tooltip
        target="#usernameInput"
        position="RightCenter"
        content="Min 3 characters, alphanumeric only"
      />
    </div>

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
        position="RightCenter"
        content="Valid email format required"
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
        position="RightCenter"
        content="Min 8 chars with uppercase and numbers"
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

input {
  width: 100%;
}
</style>
```

## Position with Offset

Using CSS to add spacing:

```vue
<template>
  <button id="btn" class="e-btn">Custom Offset</button>
  <ejs-tooltip 
    target="#btn"
    position="TopCenter"
    content="Offset from element"
    cssClass="offset-tooltip"
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

<style>
.offset-tooltip {
  margin-bottom: 10px !important;
}
</style>
```

## Examples

### Position Matrix Demo

```vue
<template>
  <div style="padding: 40px;">
    <h2>Tooltip Positions</h2>

    <div style="display: grid; grid-template-columns: repeat(3, 120px); gap: 30px; justify-content: center; margin: 60px 0;">
      <button id="tl" class="e-btn">TopLeft</button>
      <button id="tc" class="e-btn">TopCenter</button>
      <button id="tr" class="e-btn">TopRight</button>

      <button id="ll" class="e-btn">LeftTop</button>
      <div style="grid-column: 2;"></div>
      <button id="rl" class="e-btn">RightTop</button>

      <button id="lc" class="e-btn">LeftCenter</button>
      <div style="grid-column: 2;"></div>
      <button id="rc" class="e-btn">RightCenter</button>

      <button id="lb" class="e-btn">LeftBottom</button>
      <div style="grid-column: 2;"></div>
      <button id="rb" class="e-btn">RightBottom</button>

      <button id="bl" class="e-btn">BottomLeft</button>
      <button id="bc" class="e-btn">BottomCenter</button>
      <button id="br" class="e-btn">BottomRight</button>
    </div>

    <!-- Tooltips -->
    <ejs-tooltip target="#tl" position="TopLeft" content="TopLeft" />
    <ejs-tooltip target="#tc" position="TopCenter" content="TopCenter" />
    <ejs-tooltip target="#tr" position="TopRight" content="TopRight" />

    <ejs-tooltip target="#ll" position="LeftTop" content="LeftTop" />
    <ejs-tooltip target="#rl" position="RightTop" content="RightTop" />

    <ejs-tooltip target="#lc" position="LeftCenter" content="LeftCenter" />
    <ejs-tooltip target="#rc" position="RightCenter" content="RightCenter" />

    <ejs-tooltip target="#lb" position="LeftBottom" content="LeftBottom" />
    <ejs-tooltip target="#rb" position="RightBottom" content="RightBottom" />

    <ejs-tooltip target="#bl" position="BottomLeft" content="BottomLeft" />
    <ejs-tooltip target="#bc" position="BottomCenter" content="BottomCenter" />
    <ejs-tooltip target="#br" position="BottomRight" content="BottomRight" />
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
button {
  width: 100%;
}
</style>
```

## Notes

- Default position is `TopCenter`
- Tooltips auto-adjust if they would go off-screen
- Use `BottomCenter` or `RightCenter` for form fields
- Use `TopCenter` for UI elements in headers
- Consider viewport space when choosing position
- Pointer always indicates target element
