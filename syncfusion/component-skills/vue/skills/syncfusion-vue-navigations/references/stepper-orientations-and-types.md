# Orientations and Step Types

## Table of Contents
- [Orientations](#orientations)
- [Step Types](#step-types)
- [Label Positioning](#label-positioning)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)

## Orientations

The Stepper supports two layout orientations: horizontal and vertical.

### Horizontal Orientation (Default)

Steps are displayed in a left-to-right (or right-to-left) linear arrangement:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" orientation="horizontal" />
</template>
```

**Use Case:** Wide screens, simple linear workflows, checkout flows

### Vertical Orientation

Steps are displayed from top to bottom in a vertical stack:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" orientation="vertical" />
</template>
```

**Use Case:** Mobile screens, complex workflows, space-constrained layouts

## Step Types

The Stepper supports three different visual representations for steps:

### Default Type (Icon + Label)

Displays both the icon and label for each step:

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" stepType="Default" />
</template>
```

**Features:**
- Most informative visual representation
- Clear labeling and iconography
- Best for complex workflows

### Label Type (Label Only)

Displays only the step label, hiding icons:

```vue
<script setup>
const steps = ref([
  { label: 'Cart' },
  { label: 'Delivery' },
  { label: 'Payment' },
  { label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" stepType="Label" />
</template>
```

**Features:**
- Minimal, text-focused design
- Good for text-heavy workflows
- Cleaner appearance without icons

### Indicator Type (Icon Only)

Displays only the step indicator (icon or number), hiding labels:

```vue
<script setup>
const steps = ref([
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" stepType="Indicator" />
</template>
```

**Features:**
- Compact, space-efficient design
- Icons or numbered indicators
- Best for mobile screens or compact spaces

## Label Positioning

Control where labels appear relative to the step indicator using the `labelPosition` property (only applies to Default and Label step types):

### Top Position

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" labelPosition="Top" />
</template>
```

### Bottom Position (Default)

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" labelPosition="Bottom" />
</template>
```

### Start Position (Left/Right in RTL)

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" labelPosition="Start" />
</template>
```

### End Position (Right/Left in RTL)

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" labelPosition="End" />
</template>
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages using the `enableRtl` property:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'السلة' },
  { iconCss: 'sf-icon-transport', label: 'التوصيل' },
  { iconCss: 'sf-icon-payment', label: 'الدفع' },
  { iconCss: 'sf-icon-success', label: 'التأكيد' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" :enableRtl="true" />
</template>
```

**Effects:**
- Steps flow right-to-left
- Labels positioned on opposite sides
- Navigation reversed
- Text direction automatically adjusted

### Global RTL Configuration

Set RTL for your entire application:

```vue
<script setup>
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL globally
enableRtl(true);
</script>

<template>
  <!-- All Syncfusion components will be RTL -->
  <ejs-stepper :steps="steps" />
</template>
```

## Responsive Design

### Responsive Orientation Switching

Automatically switch orientation based on screen size:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const orientation = ref('horizontal');
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);

const handleResize = () => {
  orientation.value = window.innerWidth < 768 ? 'vertical' : 'horizontal';
};

onMounted(() => {
  // Set initial orientation
  handleResize();
  // Listen for resize events
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // Cleanup listener
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <ejs-stepper :steps="steps" :orientation="orientation" />
</template>
```

### Responsive Step Type Switching

Change step type for mobile:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const stepType = ref('Default');
const steps = ref([
  { text: '1', label: 'Cart' },
  { text: '2', label: 'Delivery' },
  { text: '3', label: 'Payment' }
]);

const handleResize = () => {
  stepType.value = window.innerWidth < 640 ? 'Indicator' : 'Default';
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <ejs-stepper :steps="steps" :stepType="stepType" />
</template>
```

### CSS Media Queries for Custom Styling

```vue
<style scoped>
/* Desktop */
@media (min-width: 768px) {
  :deep(.e-stepper) {
    padding: 20px;
  }
}

/* Tablet */
@media (min-width: 600px) and (max-width: 767px) {
  :deep(.e-stepper) {
    padding: 15px;
  }
}

/* Mobile */
@media (max-width: 599px) {
  :deep(.e-stepper) {
    padding: 10px;
  }
}
</style>
```

### Composable for Responsive Breakpoints

```vue
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Composable for responsive breakpoints
const useResponsive = () => {
  const screenWidth = ref(window.innerWidth);

  const handleResize = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    isMobile: computed(() => screenWidth.value < 640),
    isTablet: computed(() => screenWidth.value >= 640 && screenWidth.value < 1024),
    isDesktop: computed(() => screenWidth.value >= 1024)
  };
};

// Usage
const { isMobile, isTablet, isDesktop } = useResponsive();
const steps = ref([...]);

const orientation = computed(() => isMobile.value ? 'vertical' : 'horizontal');
const stepType = computed(() => isMobile.value ? 'Indicator' : 'Default');
</script>

<template>
  <ejs-stepper 
    :steps="steps" 
    :orientation="orientation"
    :stepType="stepType"
  />
</template>
```

## Common Combinations

### Mobile-Optimized Checkout
```vue
<ejs-stepper
  :steps="steps"
  orientation="vertical"
  stepType="Indicator"
  labelPosition="End"
/>
```

### Desktop-Optimized Progress
```vue
<ejs-stepper
  :steps="steps"
  orientation="horizontal"
  stepType="Default"
  labelPosition="Bottom"
/>
```

### Minimal Space-Efficient
```vue
<ejs-stepper
  :steps="steps"
  orientation="horizontal"
  stepType="Indicator"
  labelPosition="Top"
/>
```

### RTL Optimized
```vue
<ejs-stepper
  :steps="steps"
  :enableRtl="true"
  orientation="horizontal"
  stepType="Default"
  labelPosition="Bottom"
/>
```

## Troubleshooting

**Issue: Orientation not changing**
- ✅ Verify `orientation` prop is set correctly ("horizontal" or "vertical")
- ✅ Check CSS isn't forcing a specific layout
- ✅ Ensure component re-renders after state change
- ✅ Check browser DevTools for console errors

**Issue: Labels overlapping**
- ✅ Try different `labelPosition` values
- ✅ Use shorter label text
- ✅ Switch to `Indicator` step type to hide labels
- ✅ Increase component width or use vertical orientation

**Issue: RTL not working**
- ✅ Verify `enableRtl={true}` is set on component
- ✅ Check language/text is actually RTL
- ✅ Inspect with DevTools to confirm direction property
- ✅ Ensure Syncfusion CSS imports are present

**Issue: Responsive changes not applying**
- ✅ Verify resize listener is properly added with `onMounted`
- ✅ Check that computed properties are reactive
- ✅ Ensure listener is removed with `onUnmounted`
- ✅ Test resize event is firing with console.log()

