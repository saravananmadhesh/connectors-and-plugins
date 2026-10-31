# Button How-To Patterns

> Common patterns and recipes for implementing buttons in Vue 3 applications.

---

## Table of Contents

1. [Create a Block (Full-Width) Button](#create-a-block-full-width-button)
2. [Create a Rounded-Corner Button](#create-a-rounded-corner-button)
3. [Add Navigation Link](#add-navigation-link)
4. [Customize Appearance with CSS](#customize-appearance-with-css)
5. [Style Native Elements as Buttons](#style-native-elements-as-buttons)
6. [Set Disabled State](#set-disabled-state)
7. [Enable RTL Support](#enable-rtl-support)
8. [Add Tooltip on Hover](#add-tooltip-on-hover)
9. [Implement Repeat Button](#implement-repeat-button)

---

## Create a Block (Full-Width) Button

Use the `e-block` class to make a button span the full width of its container:

```vue
<template>
  <div class="button-container">
    <ejs-button css-class="e-block e-primary">
      Full Width Button
    </ejs-button>
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

<style scoped>
.button-container {
  width: 300px;
  padding: 10px;
}
</style>
```

---

## Create a Rounded-Corner Button

Use the `e-round-corner` class for a button with rounded corners:

```vue
<template>
  <div class="button-container">
    <ejs-button css-class="e-round-corner e-primary">
      Rounded Corner
    </ejs-button>
    
    <ejs-button css-class="e-round-corner e-outline e-info">
      Outline Rounded
    </ejs-button>
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

<style scoped>
.button-container {
  display: flex;
  gap: 10px;
}
</style>
```

---

## Add Navigation Link

Make a button navigate to a URL by adding a click handler:

```vue
<template>
  <div>
    <!-- Using click handler -->
    <ejs-button @click="navigateTo">
      Go to Dashboard
    </ejs-button>
    
    <!-- Alternative: Using router-link wrapper -->
    <RouterLink to="/dashboard">
      <ejs-button css-class="e-primary">
        Dashboard Link
      </ejs-button>
    </RouterLink>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const router = useRouter();

const navigateTo = () => {
  router.push('/dashboard');
};
</script>
```

---

## Customize Appearance with CSS

Override default styles with custom CSS:

```vue
<template>
  <div>
    <ejs-button css-class="e-primary custom-button">
      Custom Styled
    </ejs-button>
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

<style scoped>
.custom-button {
  padding: 10px 20px !important;
  font-size: 16px !important;
  border-radius: 8px !important;
  font-weight: bold !important;
}

:deep(.e-btn.custom-button) {
  background-color: #7b2cbf !important;
  border-color: #5a189a !important;
}

:deep(.e-btn.custom-button:hover) {
  background-color: #5a189a !important;
}
</style>
```

---

## Style Native Elements as Buttons

Apply Syncfusion button styles to native HTML elements:

```vue
<template>
  <div class="button-container">
    <!-- Style an input -->
    <input type="button" value="HTML Input" class="e-btn e-primary" />
    
    <!-- Style an anchor -->
    <a href="#" class="e-btn e-outline">HTML Anchor</a>
    
    <!-- Style a div -->
    <div class="e-btn e-flat e-small">HTML Div</div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 10px;
}
</style>
```

---

## Set Disabled State

Disable a button to prevent user interaction:

```vue
<template>
  <div>
    <ejs-button :disabled="isLoading">
      {{ isLoading ? 'Processing...' : 'Submit' }}
    </ejs-button>
    
    <button @click="toggleLoading">Toggle State</button>
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

const isLoading = ref(false);

const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};
</script>
```

**Result:** The button text changes and the button becomes disabled/enabled based on `isLoading` state.

---

## Enable RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <ejs-button css-class="e-primary" enable-rtl>
      أيقونة الزر
    </ejs-button>
    
    <button @click="isRTL = !isRTL">
      {{ isRTL ? 'LTR' : 'RTL' }}
    </button>
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

const isRTL = ref(false);
</script>
```

---

## Add Tooltip on Hover

Add a Tooltip component to display helpful text on hover:

```vue
<template>
  <div>
    <ejs-button 
      ref="btnRef"
      css-class="e-primary"
    >
      Hover over me
    </ejs-button>
    
    <ejs-tooltip target="btnRef" content="This is a helpful tooltip" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { TooltipComponent } from '@syncfusion/ej2-vue-popups';

export default {
  components: {
    'ejs-button': ButtonComponent,
    'ejs-tooltip': TooltipComponent
  }
};

const btnRef = ref(null);
</script>
```

---

## Implement Repeat Button

Create a button that repeats its action while held down:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <ejs-button 
      @mousedown="startRepeat"
      @mouseup="stopRepeat"
      @mouseleave="stopRepeat"
      css-class="e-primary"
    >
      Hold to increase count
    </ejs-button>
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

const count = ref(0);
let repeatInterval = null;

const startRepeat = () => {
  count.value++;
  repeatInterval = setInterval(() => {
    count.value++;
  }, 100);
};

const stopRepeat = () => {
  if (repeatInterval) {
    clearInterval(repeatInterval);
    repeatInterval = null;
  }
};
</script>
```

---

## Next Steps

- Explore more styling options in [button-style-and-appearance.md](button-style-and-appearance.md)
- Check accessibility features in [button-accessibility.md](button-accessibility.md)
- Review the complete API in [button-api.md](button-api.md)
- Learn about button types in [button-types-and-styles.md](button-types-and-styles.md)
