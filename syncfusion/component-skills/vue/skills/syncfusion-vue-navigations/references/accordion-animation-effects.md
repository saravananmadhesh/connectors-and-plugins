# Animation Effects

## Table of Contents
- [Overview](#overview)
- [Default Animations](#default-animations)
- [Available Animation Effects](#available-animation-effects)
- [Configuring Animation Properties](#configuring-animation-properties)
- [Custom Expand/Collapse Animations](#custom-expandcollapse-animations)
- [Disabling Animations](#disabling-animations)
- [Performance Considerations](#performance-considerations)
- [Common Patterns](#common-patterns)

## Overview

The Accordion component provides smooth animations when panels expand and collapse. By default, panels use `SlideDown` for expand and `SlideUp` for collapse animations. You can customize animations with various effects, durations, and easing functions.

Animation configuration includes:
- **Effect** - Type of animation (SlideDown, FadeIn, ZoomIn, etc.)
- **Duration** - How long animation runs in milliseconds
- **Easing** - Animation timing function (ease-in, ease-out, etc.)

## Default Animations

By default, the Accordion uses predefined animations for smooth expand/collapse:

### Default Configuration

```vue
<template>
  <ejs-accordion>
    <e-accordion-items>
      <e-accordion-item header="Section 1" content="This uses default animations" />
      <e-accordion-item header="Section 2" content="SlideDown on expand, SlideUp on collapse" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}
</script>
```

**Default Behavior:**
- **Expand:** SlideDown animation
- **Collapse:** SlideUp animation
- **Duration:** 400ms
- **Easing:** ease-out

These defaults provide natural, smooth transitions without additional configuration.

## Available Animation Effects

The Accordion supports multiple animation effects for both expand and collapse actions:

### Effect Types

| Effect | Description | Best For |
|--------|-------------|----------|
| `SlideDown` | Panel slides down smoothly | Default, natural expand |
| `SlideUp` | Panel slides up smoothly | Default, natural collapse |
| `FadeIn` | Panel fades in gradually | Subtle, minimalist UI |
| `FadeOut` | Panel fades out gradually | Subtle, minimalist UI |
| `FadeZoomIn` | Panel fades while growing | Modern, engaging |
| `FadeZoomOut` | Panel fades while shrinking | Modern, engaging |
| `ZoomIn` | Panel grows from center | Eye-catching expand |
| `ZoomOut` | Panel shrinks to center | Eye-catching collapse |
| `None` | No animation | Fast interaction |

### Choosing Effects

**For professional/minimal UI:**
```vue
const animation = {
  expand: { effect: 'FadeIn', duration: 300 },
  collapse: { effect: 'FadeOut', duration: 300 }
};
```

**For modern/engaging UI:**
```vue
const animation = {
  expand: { effect: 'FadeZoomIn', duration: 400 },
  collapse: { effect: 'FadeZoomOut', duration: 400 }
};
```

**For fast/responsive UI:**
```vue
const animation = {
  expand: { effect: 'None' },
  collapse: { effect: 'None' }
};
```

## Configuring Animation Properties

### Basic Animation Configuration

Set animation properties on the Accordion component:

```vue
<template>
  <ejs-accordion :animation="animationSettings">
    <e-accordion-items>
      <e-accordion-item header="Custom Animation" content="Slides at 500ms" />
      <e-accordion-item header="Another Item" content="Same animation effect" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const animationSettings = ref({
  expand: { effect: 'SlideDown', duration: 500 },
  collapse: { effect: 'SlideUp', duration: 500 }
});
</script>
```

### Animation Properties

Each animation object accepts:

```js
{
  effect: 'SlideDown' | 'FadeIn' | 'ZoomIn' | 'None',  // Animation type
  duration: 400,                                          // Milliseconds
  easing: 'ease-out'                                      // CSS easing function
}
```

## Custom Expand/Collapse Animations

Set different animations for expand and collapse actions:

### Expand and Collapse with Different Effects

```vue
<template>
  <ejs-accordion :animation="customAnimation">
    <e-accordion-items>
      <e-accordion-item header="Item" content="Different expand/collapse animations" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const customAnimation = ref({
  expand: { 
    effect: 'FadeZoomIn', 
    duration: 400, 
    easing: 'ease-out' 
  },
  collapse: { 
    effect: 'FadeZoomOut', 
    duration: 300, 
    easing: 'ease-in' 
  }
});
</script>
```

**Behavior:**
- Expanding uses FadeZoomIn (400ms, ease-out)
- Collapsing uses FadeZoomOut (300ms, ease-in)
- Creates asymmetric animation experience

### Interactive Animation Selection

Change animations based on user preferences:

```vue
<template>
  <div>
    <div style="margin-bottom: 20px">
      <label>Expand Animation: </label>
      <select v-model="expandEffect">
        <option value="SlideDown">SlideDown</option>
        <option value="FadeIn">FadeIn</option>
        <option value="ZoomIn">ZoomIn</option>
      </select>
    </div>

    <div style="margin-bottom: 20px">
      <label>Collapse Animation: </label>
      <select v-model="collapseEffect">
        <option value="SlideUp">SlideUp</option>
        <option value="FadeOut">FadeOut</option>
        <option value="ZoomOut">ZoomOut</option>
      </select>
    </div>

    <ejs-accordion 
      ref="accordionRef" 
      :animation="currentAnimation"
    >
      <e-accordion-items>
        <e-accordion-item header="Try it" content="Expand/collapse animations change above" />
        <e-accordion-item header="Test effects" content="Select different effects to see them in action" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const accordionRef = ref(null);
const expandEffect = ref('SlideDown');
const collapseEffect = ref('SlideUp');

const currentAnimation = computed(() => ({
  expand: { effect: expandEffect.value },
  collapse: { effect: collapseEffect.value }
}));
</script>
```

## Disabling Animations

For performance-critical scenarios or minimal UI, disable animations entirely:

### Disable All Animations

```vue
<template>
  <ejs-accordion :animation="noAnimation">
    <e-accordion-items>
      <e-accordion-item header="Instant Expand" content="No animation overhead" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const noAnimation = ref({
  expand: { effect: 'None' },
  collapse: { effect: 'None' }
});
</script>
```

**Result:** Panels expand/collapse instantly without visual transition

### Disable via CSS

Alternatively, override animations with CSS:

```css
.e-accordion .e-expand {
  animation: none !important;
}

.e-accordion .e-collapse {
  animation: none !important;
}
```

## Performance Considerations

### Animation Duration Impact

- **Shorter durations** (100-300ms) - Snappier feel, better for frequent interactions
- **Standard duration** (300-500ms) - Good balance for most UIs
- **Longer durations** (500ms+) - Smooth, premium feel, may feel slow

### Effect Complexity

**Performant animations:**
```js
{ effect: 'SlideDown', duration: 300 }  // Hardware-accelerated
{ effect: 'FadeIn', duration: 300 }     // Simple opacity
```

**Complex animations (use sparingly):**
```js
{ effect: 'FadeZoomIn', duration: 800 }  // Combined effects
{ effect: 'ZoomIn', duration: 800 }      // Scale transformation
```

### Best Practices

1. **Keep durations under 500ms** for responsive feel
2. **Match animations to content load** - Don't animate while loading
3. **Consider mobile devices** - Disable animations on low-end devices
4. **Test on various hardware** - Smooth on desktop may lag on mobile
5. **Use `None` for large lists** - Many animated items can impact performance

### Mobile-Friendly Pattern

```vue
<script setup>
import { ref, computed } from 'vue';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const isSlowDevice = () => {
  // Simple device detection
  return navigator.deviceMemory < 4;
};

const animationSettings = computed(() => 
  isSlowDevice() 
    ? { expand: { effect: 'None' }, collapse: { effect: 'None' } }
    : { expand: { effect: 'SlideDown', duration: 300 }, collapse: { effect: 'SlideUp', duration: 300 } }
);
</script>
```

## Common Patterns

### Pattern 1: Professional/Minimal UI

Subtle animations for business applications:

```vue
const minimalAnimation = {
  expand: { effect: 'FadeIn', duration: 250, easing: 'ease-out' },
  collapse: { effect: 'FadeOut', duration: 250, easing: 'ease-in' }
};
```

### Pattern 2: Modern/Engaging UI

Pronounced animations for contemporary applications:

```vue
const modernAnimation = {
  expand: { effect: 'FadeZoomIn', duration: 400, easing: 'ease-out' },
  collapse: { effect: 'FadeZoomOut', duration: 400, easing: 'ease-in' }
};
```

### Pattern 3: Fast/Responsive UI

Quick animations for fast-paced interactions:

```vue
const fastAnimation = {
  expand: { effect: 'SlideDown', duration: 150, easing: 'ease-out' },
  collapse: { effect: 'SlideUp', duration: 150, easing: 'ease-in' }
};
```

### Pattern 4: No Animation (Accessible/Performance)

Instant expand/collapse for accessibility and performance:

```vue
const noAnimation = {
  expand: { effect: 'None' },
  collapse: { effect: 'None' }
};
```

---

## Troubleshooting

**Issue: Animations not working**
- Verify CSS imports are included (animation requires base styles)
- Check that `animation` prop is properly formatted
- Ensure effect names match exactly (case-sensitive)

**Issue: Animations are stuttering/laggy**
- Reduce animation duration (try 200-300ms)
- Use simpler effects like 'FadeIn' instead of 'FadeZoomIn'
- Check browser DevTools performance tab
- Test on different devices/browsers

**Issue: Animation property changes not applying**
- Use `ref` to access accordion instance directly
- Update `animation` prop on component
- Force re-render if needed

**Issue: Animations disabled but still animating**
- Verify effect is set to 'None', not disabled
- Check for CSS overrides forcing animations
- Clear browser cache to reload styles

**Issue: Duration not changing**
- Ensure duration is in milliseconds (not seconds)
- Verify prop update triggers component refresh
- Check that animation object is being passed correctly
