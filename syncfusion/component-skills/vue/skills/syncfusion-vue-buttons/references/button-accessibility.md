# Button Accessibility

> Complete guide to making Syncfusion buttons fully accessible in compliance with WCAG 2.2, Section 508, and ADA standards.

---

## Table of Contents

1. [Standards Compliance](#standards-compliance)
2. [ARIA Attributes](#aria-attributes)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Accessible Button Examples](#accessible-button-examples)

---

## Standards Compliance

Syncfusion buttons are built with accessibility in mind and comply with:

- **WCAG 2.2 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - Rehabilitation Act compliance
- **ADA** - Americans with Disabilities Act

---

## ARIA Attributes

### Basic ARIA Support

Syncfusion buttons automatically expose the following ARIA attributes:

```vue
<template>
  <!-- Basic button with implicit ARIA role -->
  <ejs-button>Save</ejs-button>
  
  <!-- With explicit aria-label for icon-only buttons -->
  <ejs-button 
    icon-css="e-icons e-save"
    aria-label="Save document"
  />
  
  <!-- Disabled button with aria-disabled -->
  <ejs-button 
    :disabled="true"
    aria-disabled="true"
  >
    Unavailable
  </ejs-button>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>
```

### ARIA Attributes Reference

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `"button"` | Identifies the element as a button |
| `aria-label` | string | Accessible name for icon-only buttons |
| `aria-disabled` | `"true"` / `"false"` | Indicates disabled state |
| `aria-pressed` | `"true"` / `"false"` | Indicates toggle button state |
| `aria-describedby` | id | Links to description element |

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Move focus to the button |
| **Shift + Tab** | Move focus backward |
| **Enter** | Activate the button |
| **Space** | Activate the button |
| **Escape** | Close associated popups (DropdownButton, SpeedDial) |

### Implementation Example

```vue
<template>
  <div>
    <!-- Buttons are naturally keyboard accessible -->
    <ejs-button @click="handleClick">
      Click or press Enter/Space
    </ejs-button>
    
    <!-- Tab order can be controlled with tabindex -->
    <ejs-button tabindex="1" @click="first">First in tab order</ejs-button>
    <ejs-button tabindex="2" @click="second">Second in tab order</ejs-button>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const first = () => console.log('First button activated');
const second = () => console.log('Second button activated');
</script>
```

---

## Screen Reader Support

### Descriptive Labels

Provide clear, descriptive button text for screen readers:

```vue
<template>
  <!-- ✅ Good: Descriptive button text -->
  <ejs-button>Save Changes</ejs-button>
  
  <!-- ❌ Avoid: Ambiguous button text -->
  <ejs-button>Click here</ejs-button>
  
  <!-- ✅ Good: Icon with aria-label -->
  <ejs-button 
    icon-css="e-icons e-save"
    aria-label="Save your document"
  />
  
  <!-- ✅ Good: Icon with visible text -->
  <ejs-button icon-css="e-icons e-save">
    Save
  </ejs-button>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>
```

### Screen Reader Announcement Patterns

```vue
<template>
  <div>
    <!-- Button with state -->
    <ejs-button 
      :is-toggle="true"
      :aria-pressed="isActive"
      @click="toggleState"
    >
      {{ isActive ? 'Pause' : 'Play' }}
    </ejs-button>
    
    <!-- Button with hint text -->
    <div>
      <ejs-button aria-describedby="saveHint">
        Save Draft
      </ejs-button>
      <p id="saveHint" class="sr-only">
        Save your changes without submitting
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const isActive = ref(false);

const toggleState = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
/* Screen reader only text (visually hidden) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

---

## Accessible Button Examples

### Accessible Form Submit

```vue
<template>
  <form @submit.prevent="handleSubmit" aria-label="Login Form">
    <div class="form-group">
      <label for="email">Email:</label>
      <input 
        id="email"
        v-model="email"
        type="email"
        required
        aria-required="true"
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password:</label>
      <input 
        id="password"
        v-model="password"
        type="password"
        required
        aria-required="true"
      />
    </div>
    
    <!-- Accessible submit button -->
    <ejs-button 
      type="submit"
      css-class="e-primary"
      :disabled="isSubmitting"
      :aria-busy="isSubmitting"
    >
      {{ isSubmitting ? 'Logging in...' : 'Log In' }}
    </ejs-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

### Accessible Button Group

```vue
<template>
  <fieldset>
    <legend>Alignment Options</legend>
    <div class="e-btn-group" role="group" aria-label="Text alignment">
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
  </fieldset>
</template>

<script setup>
import { ref } from 'vue';

export default {
  setup() {
    const alignment = ref('left');
    return { alignment };
  }
};
</script>

<style scoped>
fieldset {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
}

legend {
  font-weight: 600;
  padding: 0 8px;
}
</style>
```

### Accessible Icon Button with Tooltip

```vue
<template>
  <div>
    <ejs-button 
      ref="deleteBtn"
      css-class="e-danger"
      icon-css="e-icons e-delete"
      aria-label="Delete this item"
      title="Delete this item (Cannot be undone)"
      @click="handleDelete"
    />
    
    <!-- Optional: Tooltip for additional context -->
    <div 
      role="tooltip"
      class="tooltip"
      v-if="showTooltip"
    >
      Permanently remove this item from the list
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const deleteBtn = ref(null);
const showTooltip = ref(false);

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    console.log('Item deleted');
  }
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
}
</style>
```

---

## Best Practices Checklist

- ✅ Provide descriptive, action-oriented button text
- ✅ Use `:disabled` for unavailable buttons (not `pointer-events: none`)
- ✅ Add `aria-label` for icon-only buttons
- ✅ Use `aria-pressed` for toggle buttons
- ✅ Ensure adequate color contrast (WCAG AA: 4.5:1)
- ✅ Support keyboard navigation (Tab, Enter, Space, Escape)
- ✅ Use `aria-busy` for async operations
- ✅ Provide clear focus indicators (default browser focus is OK)
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Follow logical tab order

---

## Next Steps

- Review styling in [button-style-and-appearance.md](button-style-and-appearance.md)
- Explore how-to patterns in [button-how-to.md](button-how-to.md)
- View complete API in [button-api.md](button-api.md)
