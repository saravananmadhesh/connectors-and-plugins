# ButtonGroup Getting Started

> The `ButtonGroup` is a CSS-based component that groups multiple buttons together. Use it to create button toolbars, aligned button sets, and radio/checkbox button selections.

---

## Table of Contents

1. [Installation](#installation)
2. [CSS Imports](#css-imports)
3. [Basic Implementation](#basic-implementation)
4. [Running the Application](#running-the-application)
5. [Next Steps](#next-steps)

---

## Installation

Install the button package (ButtonGroup is CSS-only):

```bash
npm install @syncfusion/ej2-vue-buttons --save
npm install @syncfusion/ej2-base --save
```

---

## CSS Imports

Import the required CSS files in your application:

```typescript
// In main.ts or App.vue
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/button-group/index.css";
```

---

## Basic Implementation

ButtonGroup uses the `e-btn-group` CSS class wrapper. Here's a minimal example:

```vue
<template>
  <div class="button-container">
    <h2>Basic ButtonGroup</h2>
    
    <!-- Horizontal ButtonGroup -->
    <div class="e-btn-group">
      <ejs-button>HTML</ejs-button>
      <ejs-button>CSS</ejs-button>
      <ejs-button>JavaScript</ejs-button>
    </div>
    
    <!-- Vertical ButtonGroup -->
    <h3>Vertical ButtonGroup</h3>
    <div class="e-btn-group e-vertical">
      <ejs-button>Cut</ejs-button>
      <ejs-button>Copy</ejs-button>
      <ejs-button>Paste</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.button-container {
  padding: 20px;
}

.e-btn-group {
  margin: 10px 0;
}
</style>
```

---

## Radio (Single-Select) ButtonGroup

Create a button group with radio-style single selection:

```vue
<template>
  <div class="button-container">
    <h2>Radio ButtonGroup</h2>
    <p>Selected: {{ selected }}</p>
    
    <div class="e-btn-group">
      <input 
        type="radio"
        id="radioleft"
        name="align"
        value="left"
        v-model="selected"
      />
      <label class="e-btn" for="radioleft">Left</label>
      
      <input 
        type="radio"
        id="radiomiddle"
        name="align"
        value="center"
        v-model="selected"
      />
      <label class="e-btn" for="radiomiddle">Center</label>
      
      <input 
        type="radio"
        id="radioright"
        name="align"
        value="right"
        v-model="selected"
      />
      <label class="e-btn" for="radioright">Right</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref('left');
</script>
```

---

## Checkbox (Multi-Select) ButtonGroup

Create a button group with checkbox-style multiple selection:

```vue
<template>
  <div class="button-container">
    <h2>Checkbox ButtonGroup</h2>
    <p>Selected styles: {{ selectedStyles.join(', ') || 'None' }}</p>
    
    <div class="e-btn-group">
      <input 
        type="checkbox"
        id="checkbold"
        name="font-style"
        value="bold"
        v-model="selectedStyles"
      />
      <label class="e-btn" for="checkbold">Bold</label>
      
      <input 
        type="checkbox"
        id="checkitalic"
        name="font-style"
        value="italic"
        v-model="selectedStyles"
      />
      <label class="e-btn" for="checkitalic">Italic</label>
      
      <input 
        type="checkbox"
        id="checkunderline"
        name="font-style"
        value="underline"
        v-model="selectedStyles"
      />
      <label class="e-btn" for="checkunderline">Underline</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedStyles = ref([]);
</script>
```

---

## Running the Application

1. **Development Server:**
   ```bash
   npm run dev
   ```

2. **Build for Production:**
   ```bash
   npm run build
   ```

3. **Preview Build:**
   ```bash
   npm run preview
   ```

---

## Complete Getting Started Example

```vue
<template>
  <div class="app-container">
    <h1>Syncfusion Vue ButtonGroup</h1>
    
    <section>
      <h2>Horizontal Buttons</h2>
      <div class="e-btn-group">
        <ejs-button css-class="e-primary">Primary</ejs-button>
        <ejs-button css-class="e-success">Success</ejs-button>
        <ejs-button css-class="e-info">Info</ejs-button>
      </div>
    </section>
    
    <section>
      <h2>Vertical Buttons</h2>
      <div class="e-btn-group e-vertical">
        <ejs-button>Top</ejs-button>
        <ejs-button>Middle</ejs-button>
        <ejs-button>Bottom</ejs-button>
      </div>
    </section>
    
    <section>
      <h2>Radio Selection</h2>
      <p>Selected: {{ alignment }}</p>
      <div class="e-btn-group">
        <input 
          type="radio"
          id="align-left"
          name="alignment"
          value="left"
          v-model="alignment"
        />
        <label class="e-btn" for="align-left">Left</label>
        
        <input 
          type="radio"
          id="align-center"
          name="alignment"
          value="center"
          v-model="alignment"
        />
        <label class="e-btn" for="align-center">Center</label>
        
        <input 
          type="radio"
          id="align-right"
          name="alignment"
          value="right"
          v-model="alignment"
        />
        <label class="e-btn" for="align-right">Right</label>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const alignment = ref('left');
</script>

<style scoped>
.app-container {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

section {
  margin: 40px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

h2 {
  margin-top: 0;
  color: #333;
}

p {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}
</style>
```

---

## Next Steps

- Explore styling options in [buttongroup-types-and-styles.md](buttongroup-types-and-styles.md)
- Learn about selection modes in [buttongroup-selection-and-nesting.md](buttongroup-selection-and-nesting.md)
- Review how-to patterns in [buttongroup-how-to.md](buttongroup-how-to.md)
- Check accessibility in [buttongroup-accessibility.md](buttongroup-accessibility.md)
