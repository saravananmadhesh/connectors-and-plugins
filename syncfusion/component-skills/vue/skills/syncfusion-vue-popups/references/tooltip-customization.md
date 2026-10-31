# Tooltip - Customization

## CSS Classes

Customize tooltip appearance with CSS classes.

### Custom Class

```vue
<template>
  <button id="btn" class="e-btn">Styled Tooltip</button>
  <ejs-tooltip 
    target="#btn"
    content="Custom styled"
    cssClass="custom-tooltip"
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

<style scoped>
:deep(.custom-tooltip .e-tooltip) {
  background-color: #2196F3;
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 500;
}

:deep(.custom-tooltip .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #2196F3;
}
</style>
```

### Multiple Classes

```vue
<template>
  <button id="btn" class="e-btn">Multi-class Tooltip</button>
  <ejs-tooltip 
    target="#btn"
    content="Multiple classes"
    cssClass="custom-tooltip error-style"
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

<style scoped>
:deep(.custom-tooltip.error-style .e-tooltip) {
  background-color: #f44336;
  border-left: 4px solid #d32f2f;
  padding: 12px 16px;
}
</style>
```

## Content Styling

### HTML Content

```vue
<template>
  <button id="btn" class="e-btn">Rich Content</button>
  <ejs-tooltip 
    target="#btn"
    :content="htmlContent"
    :isSticky="true"
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
      htmlContent: `
  <div style="padding: 8px;">
    <strong style="color: #2196F3;">Title</strong>
    <p style="margin: 8px 0; font-size: 12px;">Description text</p>
    <button style="padding: 4px 12px; background: #2196F3; color: white; border: none; border-radius: 4px;">Action</button>
  </div>
`
    };
  }
};
</script>id="btn" class="e-btn">List Tooltip</button>
  <ejs-tooltip 
    target="#btn"
    :content="listContent"
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
      listContent: `
  <ul style="margin: 0; padding: 0 20px; font-size: 12px;">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
`
    };
  }
}
const listContent = `
  <ul style="margin: 0; padding: 0 20px; font-size: 12px;">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
`;
</script>
```

## Color Schemes

### Primary Theme

```vue
<template>
  <button id="btn" class="e-btn">Primary</button>
  <ejs-tooltip 
    target="#btn"
    content="Primary theme"
    cssClass="tooltip-primary"
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

<style scoped>
:deep(.tooltip-primary .e-tooltip) {
  background-color: #2196F3;
  color: white;
}

:deep(.tooltip-primary .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #2196F3;
}
</style>
```

### Success Theme

```vue
<template>
  <button id="btn" class="e-btn">Success</button>
  <ejs-tooltip 
    target="#btn"
    content="Success message"
    cssClass="tooltip-success"
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

<style scoped>
:deep(.tooltip-success .e-tooltip) {
  background-color: #4CAF50;
  color: white;
}

:deep(.tooltip-success .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #4CAF50;
}
</style>
```

### Warning Theme

```vue
<template>
  <button id="btn" class="e-btn">Warning</button>
  <ejs-tooltip 
    target="#btn"
    content="Warning message"
    cssClass="tooltip-warning"
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

<style scoped>
:deep(.tooltip-warning .e-tooltip) {
  background-color: #FF9800;
  color: white;
}

:deep(.tooltip-warning .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #FF9800;
}
</style>
```

### Error Theme

```vue
<template>
  <button id="btn" class="e-btn">Error</button>
  <ejs-tooltip 
    target="#btn"
    content="Error message"
    cssClass="tooltip-error"
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

<style scoped>
:deep(.tooltip-error .e-tooltip) {
  background-color: #f44336;
  color: white;
}

:deep(.tooltip-error .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #f44336;
}
</style>
```

## Position Customization

### Customid="btn" class="e-btn">Custom Position</button>
  <ejs-tooltip 
    target="#btn"
    content="Offset position"
    position="TopCenter"
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

<style scoped>
:deep(.offset-tooltip .e-tooltip) {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
```

### Relative Positioning

```vueid="input"
      type="email"
      placeholder="Enter email"
      style="padding: 8px; width: 200px;"
    />
    <ejs-tooltip 
      target="#input"
      :content="emailTooltip"
      position="RightCenter"
      cssClass="form-tooltip"
    />
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
      emailTooltip: `
  <div style="font-size: 12px;">
    <p><strong>Email format:</strong></p>
    <p>user@example.com</p>
  </div>
`
    };
  }
} <div style="font-size: 12px;">
    <p><strong>Email format:</strong></p>
    <p>user@example.com</p>
  </div>
`;
</script>

<style scoped>
:deep(.form-tooltip .e-tooltip) {
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

## Responsive Customization

### Mobile Optimized

```vue
<template>
  <button id="btn" class="e-btn">Responsive</button>
  <ejs-tooltip 
    target="#btn"
    content="Responsive tooltip"
    :position="responsivePosition"
    cssClass="responsive-tooltip"
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
      isMobile: window.innerWidth < 768
    };
  },
  computed: {
    responsivePosition() {
      return this.isMobile ? 'BottomCenter' : 'RightCenter';
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
};
</script>

<style scoped>
@media (max-width: 767px) {
  :deep(.responsive-tooltip .e-tooltip) {
    max-width: 90vw;
    padding: 10px;
    font-size: 12px;
  }
}

@media (min-width: 768px) {
  :deep(.responsive-tooltip .e-tooltip) {
    max-width: 300px;
    padding: 12px 16px;
  }
}
</style>
```

### Width Customization

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <button id="narrow" class="e-btn">Narrow</button>
    <button id="wide" class="e-btn">Wide</button>
  </div>

  <ejs-tooltip 
    target="#narrow"
    content="Narrow tooltip"
    cssClass="tooltip-narrow"
  />

  <ejs-tooltip 
    target="#wide"
    :content="wideContent"
    cssClass="tooltip-wide"
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
      wideContent: `
  <div>
    <h4>Detailed Information</h4>
    <p>This is a wider tooltip with more content and detailed explanation.</p>
  </div>
`
    };
  }
};
</script>

<style scoped>
:deep(.tooltip-narrow .e-tooltip) {
  max-width: 120px;
  font-size: 11px;
}

:deep(.tooltip-wide .e-tooltip) {
  max-width: 400px;
  font-size: 13px;
  line-height: 1.6;
}
</style>
```

## Advanced Styling

### Gradient Background

```vue
<template>
  <button id="btn" class="e-btn">Gradient</button>
  <ejs-tooltip 
    target="#btn"
    content="Gradient styled tooltip"
    cssClass="gradient-tooltip"
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

<style scoped>
:deep(.tooltip-gradient .e-tooltip) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

:deep(.tooltip-gradient .e-arrow-tip.e-tooltip-bottom) {
  border-top-color: #667eea;
}
</style>
```

### Shadow & Border

```vue
<template>
  <button id="btn" class="e-btn">Shadow</button>
  <ejs-tooltip 
    target="#btn"
    content="Elevated with shadow"
    cssClass="tooltip-shadow"
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

<style scoped>
:deep(.tooltip-shadow .e-tooltip) {
  background-color: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>
```

### Glass Morphism

```vue
<template>
  <button id="btn" class="e-btn">Glass</button>
  <ejs-tooltip 
    target="#btn"
    content="Modern glass effect"
    cssClass="glass-morphism-tooltip"
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

<style scoped>
:deep(.tooltip-glass .e-tooltip) {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  color: #333;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
```

## Examples

### Complete Customization Demo

```vue
<template>
  <div style="padding: 20px;">
    <h2>Tooltip Customization Examples</h2>
id="primary" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#primary'" content="Primary" cssClass="tooltip-primary" />
      </div>

      <div>
        <h4>Success</h4>
        <button id="success" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#success'" content="Success" cssClass="tooltip-success" />
      </div>

      <div>
        <h4>Warning</h4>
        <button id="warning" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#warning'" content="Warning" cssClass="tooltip-warning" />
      </div>

      <div>
        <h4>Error</h4>
        <button id="error" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#error'" content="Error" cssClass="tooltip-error" />
      </div>

      <div>
        <h4>Shadow</h4>
        <button id="shadow" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#shadow'" content="With shadow" cssClass="tooltip-shadow" />
      </div>

      <div>
        <h4>Gradient</h4>
        <button id="gradient" class="e-btn">Hover</button>
        <ejs-tooltip :target="'#gradient'" content="Gradient" cssClass="tooltip-gradient" />
      </div>
    </div>

    <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
      <h4>Rich Content Example</h4>
      <button id="rich" class="e-btn">Hover for details</button>
      <ejs-tooltip 
        target="#rich"
        :content="richContent"
        cssClass="tooltip-rich"
        :isSticky="true"
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
  },
  data() {
    return {
      richContent: `
  <div style="padding: 10px;">
    <strong style="color: #2196F3; font-size: 14px;">Feature Information</strong>
    <ul style="margin: 10px 0; padding-left: 20px; font-size: 12px;">
      <li>Supports multiple formats</li>
      <li>Real-time updates</li>
      <li>Mobile optimized</li>
    </ul>
    <button style="padding: 6px 12px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">Learn More</button>
  </div>
`
    };
  }
}     <li>Mobile optimized</li>
    </ul>
    <button style="padding: 6px 12px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">Learn More</button>
  </div>
`;
</script>

<style scoped>
:deep(.tooltip-primary .e-tooltip) {
  background-color: #2196F3;
  color: white;
}

:deep(.tooltip-success .e-tooltip) {
  background-color: #4CAF50;
  color: white;
}

:deep(.tooltip-warning .e-tooltip) {
  background-color: #FF9800;
  color: white;
}

:deep(.tooltip-error .e-tooltip) {
  background-color: #f44336;
  color: white;
}

:deep(.tooltip-shadow .e-tooltip) {
  background-color: white;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

:deep(.tooltip-gradient .e-tooltip) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

:deep(.tooltip-rich .e-tooltip) {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
}
</style>
```

## Notes

- Use `:deep()` selector for styling Syncfusion components
- Apply custom classes via `cssClass` prop
- Arrow tip color should match background
- Consider responsive designs for mobile
- Test with different content lengths
- Maintain proper contrast for accessibility
