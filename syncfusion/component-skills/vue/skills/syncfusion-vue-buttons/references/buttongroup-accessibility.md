# ButtonGroup Accessibility

> Complete guide to making Syncfusion button groups fully accessible in compliance with WCAG 2.2, Section 508, and ADA standards.

---

## Table of Contents

1. [Standards Compliance](#standards-compliance)
2. [Semantic HTML](#semantic-html)
3. [ARIA Attributes](#aria-attributes)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Accessible Button Group Examples](#accessible-button-group-examples)

---

## Standards Compliance

Syncfusion button groups comply with:

- **WCAG 2.2 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - Rehabilitation Act compliance
- **ADA** - Americans with Disabilities Act

---

## Semantic HTML

Use proper semantic HTML elements for button groups:

```vue
<template>
  <!-- ✅ Good: Using fieldset with legend -->
  <fieldset>
    <legend>Choose your preference:</legend>
    <div class="e-btn-group">
      <input type="radio" id="opt1" name="choice" value="option1" />
      <label class="e-btn" for="opt1">Option 1</label>
      
      <input type="radio" id="opt2" name="choice" value="option2" />
      <label class="e-btn" for="opt2">Option 2</label>
      
      <input type="radio" id="opt3" name="choice" value="option3" />
      <label class="e-btn" for="opt3">Option 3</label>
    </div>
  </fieldset>
  
  <!-- ❌ Avoid: Using div without semantic meaning -->
  <div class="e-btn-group">
    <div class="e-btn">Button 1</div>
    <div class="e-btn">Button 2</div>
  </div>
</template>

<style scoped>
fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}
</style>
```

---

## ARIA Attributes

### Group Role and Labels

```vue
<template>
  <!-- Explicit group role -->
  <div class="e-btn-group" role="group" aria-label="Text formatting options">
    <ejs-button>Bold</ejs-button>
    <ejs-button>Italic</ejs-button>
    <ejs-button>Underline</ejs-button>
  </div>
  
  <!-- Radio button group -->
  <div class="e-btn-group" role="radiogroup" aria-label="Size selection">
    <input type="radio" id="size-small" name="size" value="small" />
    <label class="e-btn" for="size-small">Small</label>
    
    <input type="radio" id="size-medium" name="size" value="medium" />
    <label class="e-btn" for="size-medium">Medium</label>
    
    <input type="radio" id="size-large" name="size" value="large" />
    <label class="e-btn" for="size-large">Large</label>
  </div>
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

| Attribute | Purpose |
|-----------|---------|
| `role="group"` | Identifies container as a group |
| `role="radiogroup"` | Identifies radio button group |
| `aria-label` | Provides accessible name for the group |
| `aria-labelledby` | Links to a heading that labels the group |
| `aria-describedby` | Links to description text |
| `aria-disabled` | Indicates disabled state |
| `aria-pressed` | Indicates pressed/active state |

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next button |
| **Shift + Tab** | Move focus to previous button |
| **Space/Enter** | Activate focused button |
| **Arrow Keys** | Navigate between radio buttons in a group |

### Implementation Example

```vue
<template>
  <div class="example-section">
    <h2>Keyboard Navigation Example</h2>
    
    <fieldset>
      <legend>Use Tab, Shift+Tab, and Arrow Keys to navigate</legend>
      
      <div class="e-btn-group" role="radiogroup">
        <input 
          type="radio"
          id="nav1"
          name="navigation"
          value="page1"
        />
        <label class="e-btn" for="nav1">Page 1</label>
        
        <input 
          type="radio"
          id="nav2"
          name="navigation"
          value="page2"
        />
        <label class="e-btn" for="nav2">Page 2</label>
        
        <input 
          type="radio"
          id="nav3"
          name="navigation"
          value="page3"
        />
        <label class="e-btn" for="nav3">Page 3</label>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.example-section {
  padding: 20px;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

legend {
  font-weight: bold;
  padding: 0 10px;
}
</style>
```

---

## Screen Reader Support

### Descriptive Labels

```vue
<template>
  <div class="example-section">
    <!-- ✅ Good: Clear, descriptive labels -->
    <fieldset>
      <legend>Sort by:</legend>
      <div class="e-btn-group">
        <input type="radio" id="sort-name" name="sort" value="name" />
        <label class="e-btn" for="sort-name">Name</label>
        
        <input type="radio" id="sort-date" name="sort" value="date" />
        <label class="e-btn" for="sort-date">Date</label>
        
        <input type="radio" id="sort-size" name="sort" value="size" />
        <label class="e-btn" for="sort-size">Size</label>
      </div>
    </fieldset>
    
    <!-- ❌ Avoid: Ambiguous labels -->
    <div class="e-btn-group">
      <label class="e-btn">A</label>
      <label class="e-btn">B</label>
      <label class="e-btn">C</label>
    </div>
  </div>
</template>

<style scoped>
.example-section {
  padding: 20px;
}

fieldset {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

legend {
  font-weight: bold;
  padding: 0 10px;
}
</style>
```

---

## Accessible Button Group Examples

### Accessible Form with Radio Buttons

```vue
<template>
  <form @submit.prevent="handleSubmit" class="accessible-form">
    <h1>Accessible Survey Form</h1>
    
    <!-- Question 1: Single Choice -->
    <fieldset>
      <legend>How satisfied are you with our service?</legend>
      
      <div class="e-btn-group" role="radiogroup" aria-labelledby="satisfaction-legend">
        <input 
          type="radio"
          id="very-poor"
          name="satisfaction"
          value="very_poor"
          v-model="formData.satisfaction"
          required
        />
        <label class="e-btn" for="very-poor">Very Poor</label>
        
        <input 
          type="radio"
          id="poor"
          name="satisfaction"
          value="poor"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="poor">Poor</label>
        
        <input 
          type="radio"
          id="average"
          name="satisfaction"
          value="average"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="average">Average</label>
        
        <input 
          type="radio"
          id="good"
          name="satisfaction"
          value="good"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="good">Good</label>
        
        <input 
          type="radio"
          id="very-good"
          name="satisfaction"
          value="very_good"
          v-model="formData.satisfaction"
        />
        <label class="e-btn" for="very-good">Very Good</label>
      </div>
    </fieldset>
    
    <!-- Question 2: Multiple Choice -->
    <fieldset>
      <legend>Which features do you use?</legend>
      
      <div class="e-btn-group" role="group" aria-labelledby="features-legend">
        <input 
          type="checkbox"
          id="feature-search"
          name="features"
          value="search"
          v-model="formData.features"
        />
        <label class="e-btn" for="feature-search">Search</label>
        
        <input 
          type="checkbox"
          id="feature-export"
          name="features"
          value="export"
          v-model="formData.features"
        />
        <label class="e-btn" for="feature-export">Export</label>
        
        <input 
          type="checkbox"
          id="feature-import"
          name="features"
          value="import"
          v-model="formData.features"
        />
        <label class="e-btn" for="feature-import">Import</label>
      </div>
    </fieldset>
    
    <div class="form-actions">
      <button type="submit" class="submit-btn">Submit Survey</button>
      <button type="reset" class="reset-btn">Clear All</button>
    </div>
    
    <div v-if="submitted" class="success-message" role="alert">
      Thank you for your feedback!
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  satisfaction: 'average',
  features: []
});

const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  console.log('Form submitted:', formData.value);
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
};
</script>

<style scoped>
.accessible-form {
  max-width: 600px;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 30px;
}

fieldset {
  margin-bottom: 30px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

legend {
  font-weight: bold;
  padding: 0 10px;
  margin-bottom: 10px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.submit-btn {
  background-color: #28a745;
  color: white;
}

.submit-btn:hover {
  background-color: #218838;
}

.submit-btn:focus {
  outline: 2px solid #28a745;
  outline-offset: 2px;
}

.reset-btn {
  background-color: #6c757d;
  color: white;
}

.reset-btn:hover {
  background-color: #5a6268;
}

.success-message {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
```

### Accessible Toolbar with Button Groups

```vue
<template>
  <div class="toolbar" role="toolbar" aria-label="Text formatting toolbar">
    <div class="toolbar-group">
      <span class="group-label">Text Style</span>
      <div class="e-btn-group" role="group" aria-label="Text emphasis">
        <ejs-button 
          icon-css="e-icons e-bold"
          aria-label="Bold"
          :aria-pressed="isBold"
          @click="isBold = !isBold"
        />
        <ejs-button 
          icon-css="e-icons e-italic"
          aria-label="Italic"
          :aria-pressed="isItalic"
          @click="isItalic = !isItalic"
        />
        <ejs-button 
          icon-css="e-icons e-underline"
          aria-label="Underline"
          :aria-pressed="isUnderline"
          @click="isUnderline = !isUnderline"
        />
      </div>
    </div>
    
    <div class="toolbar-group">
      <span class="group-label">Alignment</span>
      <div class="e-btn-group" role="radiogroup" aria-label="Text alignment">
        <input 
          type="radio"
          id="align-left"
          name="alignment"
          value="left"
          v-model="alignment"
        />
        <label class="e-btn" for="align-left">
          <span class="sr-only">Align left</span>
          ⬅
        </label>
        
        <input 
          type="radio"
          id="align-center"
          name="alignment"
          value="center"
          v-model="alignment"
        />
        <label class="e-btn" for="align-center">
          <span class="sr-only">Align center</span>
          ↔
        </label>
        
        <input 
          type="radio"
          id="align-right"
          name="alignment"
          value="right"
          v-model="alignment"
        />
        <label class="e-btn" for="align-right">
          <span class="sr-only">Align right</span>
          ➡
        </label>
      </div>
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

const isBold = ref(false);
const isItalic = ref(false);
const isUnderline = ref(false);
const alignment = ref('left');
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.group-label {
  font-weight: bold;
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
}

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

## Best Practices Checklist

- ✅ Use `<fieldset>` and `<legend>` for grouping related inputs
- ✅ Add `aria-label` or `aria-labelledby` to button groups
- ✅ Use semantic HTML input types (radio, checkbox)
- ✅ Provide clear, descriptive labels for each button
- ✅ Support keyboard navigation (Tab, Arrow keys)
- ✅ Ensure adequate color contrast (WCAG AA: 4.5:1)
- ✅ Use `:focus` states that are visible
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Announce group purpose and current selection
- ✅ Use `role="alert"` for dynamic status messages

---

## Next Steps

- Review styling in [buttongroup-style-and-appearance.md](buttongroup-style-and-appearance.md)
- Explore how-to patterns in [buttongroup-how-to.md](buttongroup-how-to.md)
- Learn about selection modes in [buttongroup-selection-and-nesting.md](buttongroup-selection-and-nesting.md)
