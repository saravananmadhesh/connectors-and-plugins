# Advanced Theming Features

## Table of Contents
- [Size Modes (Touch Support)](#size-modes-touch-support)
- [Theme Studio Customization](#theme-studio-customization)
- [Component-Specific Styling](#component-specific-styling)

## Size Modes (Touch Support)

Syncfusion Vue components provide two size modes to optimize UX across different devices and input methods:

- **Normal mode (default):** Standard control sizes optimized for mouse/keyboard input
- **Touch mode (bigger):** Enlarged controls with increased spacing for touch/mobile devices

### Global Size Mode

Enable touch mode for the entire application by adding the `e-bigger` class to `<body>`:

```html
<!-- index.html -->
<body class="e-bigger">
  <div id="app"></div>
</body>
```

**Effect:** All Syncfusion components increase in size with larger tap targets (44x44px minimum).

### Component-Specific Size Mode

Apply touch mode to individual components:

```vue
<template>
  <div>
    <!-- Regular size button -->
    <ejs-button>Normal Button</ejs-button>
    
    <!-- Touch-optimized button via container class -->
    <div class="e-bigger">
      <ejs-button>Touch Button</ejs-button>
    </div>
    
    <!-- Touch-optimized grid via cssClass prop -->
    <ejs-grid cssClass="e-bigger" :dataSource="data" />
  </div>
</template>

<script>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { GridComponent } from '@syncfusion/ej2-vue-grids';

export default {
  components: {
    'ejs-button': ButtonComponent,
    'ejs-grid': GridComponent
  },
  data() {
    return {
      data: []
    };
  }
};
</script>
```

### Runtime Size Mode Switching

Toggle size mode dynamically based on user preference or device detection:

```vue
<template>
  <div>
    <h3>Size Mode: {{ isTouchMode ? 'Touch' : 'Normal' }}</h3>
    <ejs-button @click="toggleSizeMode">
      Toggle Size Mode
    </ejs-button>
    
    <div style="margin-top: 20px;">
      <ejs-button :isPrimary="true">Sample Button</ejs-button>
    </div>
  </div>
</template>

<script>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  },
  data() {
    return {
      isTouchMode: false
    };
  },
  mounted() {
    // Auto-detect touch device on mount
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.isTouchMode = isTouchDevice;
    this.applySizeMode();
  },
  watch: {
    isTouchMode() {
      this.applySizeMode();
    }
  },
  methods: {
    applySizeMode() {
      if (this.isTouchMode) {
        document.body.classList.add('e-bigger');
      } else {
        document.body.classList.remove('e-bigger');
      }
    },
    toggleSizeMode() {
      this.isTouchMode = !this.isTouchMode;
    }
  }
};
</script>
```

## Theme Studio Customization

### Accessing Theme Studio

Visit [https://ej2.syncfusion.com/themestudio/?theme=tailwind3](https://ej2.syncfusion.com/themestudio/?theme=tailwind3)

**Available themes:**
- Material 3: `?theme=material3`
- Fluent 2: `?theme=fluent2`
- Bootstrap 5.3: `?theme=bootstrap5.3`
- Tailwind 3.4: `?theme=tailwind3`

### Customizing Theme Colors

Theme Studio exposes common theme variables for customization:

1. **Select base theme** (Material 3, Fluent 2, Bootstrap 5.3, Tailwind 3.4)
2. **Pick colors** using color pickers for primary, secondary, success, warning, error
3. **Preview changes** in real-time across multiple components
4. **Filter components** to generate CSS for specific components only (reduces bundle size)
5. **Download theme** as ZIP containing CSS, SCSS, and `settings.json`

### Using Downloaded Theme

```vue
<template>
  <div>
    <ejs-button :isPrimary="true">Custom Theme Button</ejs-button>
  </div>
</template>

<script>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style>
/* Option 1: Direct CSS import */
@import './custom-theme/custom-material3.css';

/* Option 2: Use HTML link tag in index.html */
/* <link href="./custom-theme/custom-material3.css" rel="stylesheet" /> */
</style>
```

### Re-importing Settings

To modify an existing custom theme:

1. Click **Import** icon in Theme Studio
2. Upload previously downloaded `settings.json`
3. Modify colors as needed
4. Download updated theme

**Use case:** Update brand colors across application without recreating theme from scratch.

### Filtering Components

Reduce CSS bundle size by including only used components:

1. Click **Filter** icon in Theme Studio
2. Select components (e.g., Button, Grid, Dropdown)
3. Click **Apply**
4. Download filtered theme (smaller CSS file)

**Example:** If app only uses Button, Grid, and Calendar, filter to those components instead of downloading full theme CSS (~300KB+ reduction).

## Component-Specific Styling

### Button Customization

```css
/* index.css */
.e-btn {
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.e-btn.e-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.e-btn.e-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
```