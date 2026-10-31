# Dark Mode Implementation

## Table of Contents
- [Overview](#overview)
- [Global Dark Mode](#global-dark-mode)
- [Per-Component Dark Mode](#per-component-dark-mode)
- [Runtime Theme Switching](#runtime-theme-switching)

## Overview

Syncfusion Vue themes support both light and dark variants. Dark mode is toggled by applying the `e-dark-mode` CSS class to the `<body>` element or specific component containers.

**Supported themes with dark variants:**
- Tailwind 3.4 → tailwind3.css (light), tailwind3-dark.css (dark)
- Bootstrap 5.3 → bootstrap5.3.css (light), bootstrap5.3-dark.css (dark)
- Fluent 2 → fluent2.css (light), fluent2-dark.css (dark)
- Material 3 → material3.css (light), material3-dark.css (dark)

**How it works:**
- Import ONE theme CSS file (e.g., `tailwind3.css`)
- Apply `e-dark-mode` class to switch to dark variant
- Remove `e-dark-mode` class to return to light variant
- No need to import separate dark CSS files

## Global Dark Mode

Apply dark mode to all Syncfusion components by adding `e-dark-mode` to the `<body>` element.

### Static Dark Mode

```html
<!-- index.html -->
<body class="e-dark-mode">
  <div id="app"></div>
</body>
```

### Dynamic Dark Mode with State

```vue
<template>
  <div>
    <ejs-checkbox 
      label="Enable Dark Mode" 
      :checked="isDarkMode" 
      @change="handleDarkModeToggle"
    />
    <ejs-button cssClass="e-primary">Sample Button</ejs-button>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent,
    'ejs-button': ButtonComponent
  },
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    handleDarkModeToggle(event) {
      this.isDarkMode = event.checked ?? false;
      
      if (this.isDarkMode) {
        document.body.classList.add('e-dark-mode');
      } else {
        document.body.classList.remove('e-dark-mode');
      }
    }
  }
};
</script>
```

## Per-Component Dark Mode

Apply dark mode to specific components or sections by adding `e-dark-mode` to the component's container.

```vue
<template>
  <div>
    <h2>Light Mode Section</h2>
    <div>
      <ejs-button cssClass="e-primary">Light Button</ejs-button>
    </div>
    
    <h2>Dark Mode Section</h2>
    <div class="e-dark-mode">
      <ejs-button cssClass="e-primary">Dark Button</ejs-button>
    </div>
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
```

### Multiple Sections with Different Modes

```vue
<template>
  <div>
    <!-- Light mode navigation -->
    <div class="nav-section">
      <ejs-button>Home</ejs-button>
      <ejs-button>About</ejs-button>
    </div>
    
    <!-- Dark mode content area -->
    <div class="e-dark-mode content-section">
      <ejs-grid :dataSource="data">
        <e-columns>
          <e-column field='OrderID' width='100' />
          <e-column field='CustomerID' width='100' />
          <e-column field='Freight' width='100' format="C2" />
        </e-columns>
      </ejs-grid>
    </div>
  </div>
</template>

<script>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';

export default {
  components: {
    'ejs-button': ButtonComponent,
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
        { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
      ]
    };
  }
};
</script>
```

## Runtime Theme Switching

### With localStorage Persistence

```vue
<template>
  <div>
    <ejs-button @click="toggleDarkMode">
      Toggle {{ isDarkMode ? 'Light' : 'Dark' }} Mode
    </ejs-button>
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
      isDarkMode: false
    };
  },
  mounted() {
    // Initialize from localStorage
    const saved = localStorage.getItem('darkMode');
    this.isDarkMode = saved === 'true';
    this.applyDarkMode();
  },
  watch: {
    isDarkMode(newValue) {
      this.applyDarkMode();
      // Save to localStorage
      localStorage.setItem('darkMode', newValue.toString());
    }
  },
  methods: {
    applyDarkMode() {
      if (this.isDarkMode) {
        document.body.classList.add('e-dark-mode');
      } else {
        document.body.classList.remove('e-dark-mode');
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
};
</script>
```

### With System Preference Detection

```vue
<template>
  <div>
    <p>Current mode: {{ isDarkMode ? 'Dark' : 'Light' }}</p>
    <ejs-button @click="toggleDarkMode">
      Override System Preference
    </ejs-button>
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
      isDarkMode: false,
      mediaQuery: null
    };
  },
  mounted() {
    // Check system preference
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = this.mediaQuery.matches;
    
    // Listen for system preference changes
    this.handleChange = (e) => {
      this.isDarkMode = e.matches;
    };
    this.mediaQuery.addEventListener('change', this.handleChange);
    
    this.applyDarkMode();
  },
  beforeUnmount() {
    if (this.mediaQuery && this.handleChange) {
      this.mediaQuery.removeEventListener('change', this.handleChange);
    }
  },
  watch: {
    isDarkMode() {
      this.applyDarkMode();
    }
  },
  methods: {
    applyDarkMode() {
      if (this.isDarkMode) {
        document.body.classList.add('e-dark-mode');
      } else {
        document.body.classList.remove('e-dark-mode');
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
};
</script>
```
