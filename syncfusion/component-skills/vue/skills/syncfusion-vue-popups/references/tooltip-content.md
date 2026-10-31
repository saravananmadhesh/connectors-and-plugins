# Tooltip - Content

## Content Types

Tooltips support various content formats: text, HTML, templates, and dynamic content.

## Text Content

### Simple String

```vue
<template>
  <button id="btn" class="e-btn">Hover for Text</button>
  <ejs-tooltip target="#btn" content="Simple text tooltip" />
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

### Multiline Text

```vue
<template>
  <button id="btn" class="e-btn">Hover for Info</button>
  <ejs-tooltip target="#btn" content="Line 1&#10;Line 2&#10;Line 3" />
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

## HTML Content

### Using Template Slot

```vue
<template>
  <button id="btn" class="e-btn">Hover for HTML</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 8px;">
        <strong>HTML Content</strong>
        <p>With <em>formatting</em></p>
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

### Formatted Text

```vue
<template>
  <button id="btn" class="e-btn">Details</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 10px; font-size: 14px;">
        <div style="color: #007bff; font-weight: bold;">Feature Info</div>
        <div style="margin-top: 8px; color: #666;">
          <p style="margin: 4px 0;">✓ Works offline</p>
          <p style="margin: 4px 0;">✓ Fast performance</p>
          <p style="margin: 4px 0;">✓ Cross-browser</p>
        </div>
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

## Dynamic Content

### Data-Driven Content

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <button 
      v-for="item in items"
      :key="item.id"
      :id="`btn${item.id}`"
      class="e-btn"
    >
      {{ item.label }}
    </button>
  </div>

  <ejs-tooltip 
    target=".e-btn"
    :content="getContent"
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
      items: [
        { id: 1, label: 'Save', tooltip: 'Save changes' },
        { id: 2, label: 'Delete', tooltip: 'Remove item' },
        { id: 3, label: 'Share', tooltip: 'Share with others' }
      ]
    };
  },
  methods: {
    getContent(element) {
      const text = element.textContent;
      const item = this.items.find(i => i.label === text);
      return item ? item.tooltip : '';
    }
  }
};
</script>
```

### Computed Content

```vue
<template>
  <input 
    id="inputRef"
    v-model="value"
    type="text"
    class="e-input"
    placeholder="Enter text"
  />

  <ejs-tooltip 
    target="#inputRef"
    :content="tooltipContent"
    position="BottomCenter"
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
      value: ''
    };
  },
  computed: {
    tooltipContent() {
      if (this.value.length === 0) {
        return 'Enter at least 3 characters';
      } else if (this.value.length < 3) {
        return `${3 - this.value.length} more characters needed`;
      } else {
        return 'Perfect! ✓';
      }
    }
  }
};
</script>
```

### Icon with Description

```vue
<template>
  <button id="btn" class="e-btn">Action</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
        <span style="font-size: 20px;">⚡</span>
        <div>
          <div style="font-weight: bold;">Quick Action</div>
          <div style="font-size: 12px; color: #666;">Shortcut: Ctrl+K</div>
        </div>
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

## Template Content

### Feature List

```vue
<template>
  <button id="btn" class="e-btn">Features</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 10px;">
        <div style="font-weight: bold; margin-bottom: 8px;">Supported:</div>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Desktop browsers</li>
          <li>Mobile devices</li>
          <li>Dark mode</li>
          <li>Keyboard navigation</li>
        </ul>
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

### Code Snippet

```vue
<template>
  <button id="btn" class="e-btn">API</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 10px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 12px;">
        <code>tooltip.show()</code><br/>
        <code>tooltip.hide()</code><br/>
        <code>tooltip.destroy()</code>
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

## Content with Formatting

### Emphasized Content

```vue
<template>
  <button id="btn" class="e-btn">Important</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 10px; border-left: 4px solid #ff6b6b;">
        <div style="color: #ff6b6b; font-weight: bold;">⚠️ Warning</div>
        <div style="margin-top: 5px; font-size: 13px;">
          This action cannot be undone
        </div>
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

### Success Content

```vue
<template>
  <button id="btn" class="e-btn">Complete</button>

  <ejs-tooltip target="#btn">
    <template #content>
      <div style="padding: 10px; border-left: 4px solid #51cf66;">
        <div style="color: #51cf66; font-weight: bold;">✓ Success</div>
        <div style="margin-top: 5px; font-size: 13px;">
          Operation completed successfully
        </div>
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

## Content with Styling

### Custom Styled Content

```vue
<template>
  <button id="btn" class="e-btn">Styled</button>

  <ejs-tooltip target="#btn" cssClass="custom-tooltip">
    <template #content>
      <div style="padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 4px;">
        <div style="font-weight: bold;">Premium Feature</div>
        <div style="margin-top: 5px; font-size: 12px;">
          Available in pro plan
        </div>
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

<style>
.custom-tooltip {
  background: transparent !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
</style>
```

## HTML Sanitization

By default, the tooltip sanitizes HTML content to prevent XSS attacks.

```vue
<template>
  <button id="btn" class="e-btn">Safe Content</button>

  <ejs-tooltip 
    target="#btn"
    :enableHtmlSanitizer="true"
    content="<script>alert('xss')</script><b>Bold text</b>"
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

## Examples

### Complete Content Demo

```vue
<template>
  <div style="padding: 20px;">
    <h2>Tooltip Content Types</h2>

    <div style="margin: 20px 0;">
      <h4>Text Content</h4>
      <button id="text" class="e-btn">Text</button>
      <ejs-tooltip target="#text" content="Simple text tooltip" />
    </div>

    <div style="margin: 20px 0;">
      <h4>HTML Content</h4>
      <button id="html" class="e-btn">HTML</button>
      <ejs-tooltip target="#html">
        <template #content>
          <div style="padding: 8px;">
            <strong>Rich HTML</strong><br/>
            With <em>formatting</em>
          </div>
        </template>
      </ejs-tooltip>
    </div>

    <div style="margin: 20px 0;">
      <h4>Dynamic Content</h4>
      <input id="input" v-model="inputValue" type="text" class="e-input" placeholder="Enter text" />
      <ejs-tooltip 
        target="#input"
        :content="dynamicContent"
        position="BottomCenter"
      />
    </div>

    <div style="margin: 20px 0;">
      <h4>Icon Content</h4>
      <button id="icon" class="e-btn">With Icon</button>
      <ejs-tooltip target="#icon">
        <template #content>
          <div style="display: flex; gap: 8px; align-items: center; padding: 8px;">
            <span style="font-size: 18px;">🎯</span>
            <span>Target achieved</span>
          </div>
        </template>
      </ejs-tooltip>
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
      inputValue: ''
    };
  },
  computed: {
    dynamicContent() {
      const len = this.inputValue.length;
      if (len === 0) return 'Start typing...';
      if (len < 5) return `${5 - len} more characters`;
      return '✓ Looks good!';
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

- Use `enableHtmlSanitizer={true}` for safe HTML content
- Templates allow Vue reactive content
- Dynamic content updates automatically with computed properties
- For complex UI, consider using a dialog instead
- Keep tooltip content concise and informative
