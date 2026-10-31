# Timeline Accessibility (Vue 3)

## Table of Contents
- [WCAG 2.2 and Section 508 Compliance](#wcag-22-and-section-508-compliance)
- [ARIA Attributes and Roles](#aria-attributes-and-roles)
- [Keyboard Navigation Support](#keyboard-navigation-support)
- [RTL (Right-to-Left) Language Support](#rtl-right-to-left-language-support)
- [Mobile Device Accessibility](#mobile-device-accessibility)

## WCAG 2.2 and Section 508 Compliance

The Timeline component supports WCAG 2.2 Level AA and Section 508 standards for accessible timeline displays.

### Key Compliance Areas

| Area | Standard | Support |
|------|----------|---------|
| Perceivable | 1.x | Text alternatives, color contrast |
| Operable | 2.x | Keyboard navigation, focus management |
| Understandable | 3.x | Readable, predictable |
| Robust | 4.x | Compatible with assistive technologies |

## ARIA Attributes and Roles

### Default ARIA Structure

The Timeline applies these ARIA attributes automatically:

```html
<div class="e-timeline" role="list">
  <div class="e-timeline-item" role="listitem" aria-posinset="1" aria-setsize="5">
    <div class="e-dot" role="img" aria-label="Event dot"></div>
    <div class="e-timeline-content">Event content</div>
  </div>
</div>
```

### Custom ARIA Labels

```vue
<template>
  <TimelineComponent :htmlAttributes="rootAttrs">
    <e-items>
      <e-item content="Event" />
    </e-items>
  </TimelineComponent>
</template>

<script setup>
const rootAttrs = {
  role: 'list',
  'aria-label': 'Project milestones timeline',
  'aria-describedby': 'timeline-description'
};
</script>

<p id="timeline-description" class="sr-only">
  A chronological list of project milestones
</p>
```

### Per-Item ARIA

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item
        content="Critical milestone"
        :htmlAttributes="{ 'aria-label': 'Critical milestone completed', role: 'listitem' }"
      />
    </e-items>
  </TimelineComponent>
</template>
```

## Keyboard Navigation Support

### Default Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus through timeline items |
| `Shift + Tab` | Move focus backward |
| `Enter` / `Space` | Activate focused item |
| `Arrow Up/Down` | Navigate items (vertical) |
| `Arrow Left/Right` | Navigate items (horizontal) |
| `Home` | Focus first item |
| `End` | Focus last item |

### Custom Keyboard Handlers

```vue
<template>
  <div @keydown="onKeyDown" tabindex="0">
    <TimelineComponent>
      <e-items>
        <e-item v-for="(item, i) in items" :key="i" :content="item.title" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([
  { title: 'A' },
  { title: 'B' },
  { title: 'C' }
]);

const currentFocus = ref(0);

const onKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault();
      if (currentFocus.value < items.value.length - 1) currentFocus.value++;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault();
      if (currentFocus.value > 0) currentFocus.value--;
      break;
    case 'Home':
      event.preventDefault();
      currentFocus.value = 0;
      break;
    case 'End':
      event.preventDefault();
      currentFocus.value = items.value.length - 1;
      break;
  }
};
</script>

<style scoped>
[tabindex="0"]:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
</style>
```

### Focus Indicators

```vue
<style>
.e-timeline .e-timeline-item:focus {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
  background: rgba(0, 102, 204, 0.05);
  border-radius: 4px;
}

.e-timeline .e-timeline-item:focus:not(:focus-visible) {
  outline: none;
}

.e-timeline .e-timeline-item:focus-visible {
  outline: 3px solid #0066cc;
}
</style>
```

## RTL (Right-to-Left) Language Support

### Enable RTL Mode

```vue
<template>
  <TimelineComponent :enableRtl="true">
    <e-items>
      <e-item content="Arabic event" />
    </e-items>
  </TimelineComponent>
</template>
```

### Document-Level RTL

```html
<html dir="rtl" lang="ar">
```

### Dynamic RTL Switching

```vue
<template>
  <div>
    <button @click="toggleRtl">Toggle RTL</button>
    <div style="height: 400px;">
      <TimelineComponent :enableRtl="isRtl">
        <e-items>
          <e-item v-for="(item, i) in items" :key="i" :content="item.title" />
        </e-items>
      </TimelineComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([{ title: 'A' }, { title: 'B' }]);
const isRtl = ref(false);

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
  document.documentElement.dir = isRtl.value ? 'rtl' : 'ltr';
};
</script>
```

### RTL-Specific Styling

```vue
<style>
[dir="rtl"] .e-timeline .e-timeline-content {
  text-align: right;
}

[dir="rtl"] .e-timeline .e-timeline-item {
  direction: rtl;
}
</style>
```

## Mobile Device Accessibility

### Touch Target Sizing

```vue
<style>
/* Larger touch targets on mobile */
@media (max-width: 768px) {
  .e-timeline .e-timeline-item {
    padding: 16px 12px;
    min-height: 48px;
  }

  .e-timeline .e-dot {
    width: 20px;
    height: 20px;
  }
}
</style>
```

### Mobile-Optimized Layout

```vue
<template>
  <div style="height: 500px;">
    <TimelineComponent
      cssClass="mobile-timeline"
      :orientation="orientation"
    >
      <e-items>
        <e-item v-for="item in items" :key="item.id" :content="item.title" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([{ id: 1, title: 'A' }, { id: 2, title: 'B' }, { id: 3, title: 'C' }]);

const screenWidth = ref(window.innerWidth);
const updateWidth = () => { screenWidth.value = window.innerWidth; };
onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
onUnmounted(() => window.removeEventListener('resize', updateWidth));

// Vertical on mobile, horizontal on desktop
const orientation = computed(() => screenWidth.value < 768 ? 'Vertical' : 'Horizontal');
</script>
```

### Responsive Container

```vue
<style>
.mobile-timeline {
  /* Ensure scrollable on small screens */
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Hide scrollbar for cleaner look */
.mobile-timeline::-webkit-scrollbar {
  display: none;
}
</style>
```

## Screen Reader Support

### Live Region Announcements

```vue
<template>
  <div>
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announcement }}
    </div>
    <TimelineComponent :beforeItemRender="announceItem">
      <e-items>
        <e-item v-for="item in items" :key="item.id" :content="item.title" />
      </e-items>
    </TimelineComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-layouts';

const items = ref([
  { id: 1, title: 'Project started' },
  { id: 2, title: 'Design complete' },
  { id: 3, title: 'Launch' }
]);

const announcement = ref('');

const announceItem = (args) => {
  const item = items.value[args.itemIndex];
  if (item) {
    announcement.value = `Item ${args.itemIndex + 1} of ${items.value.length}: ${item.title}`;
  }
};
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### High Contrast Support

```vue
<style>
/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .e-timeline .e-dot {
    border: 2px solid currentColor;
  }

  .e-timeline .e-connector {
    background: currentColor;
  }

  .e-timeline .e-timeline-item {
    border: 1px solid currentColor;
  }
}
</style>
```

### Reduced Motion Support

```vue
<style>
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .e-timeline .e-dot.pulse,
  .e-timeline .e-dot.pulse-orange {
    animation: none;
  }
}
</style>
```

## Best Practices

1. **Always provide ARIA labels**: For timeline root and important items

2. **Test with screen readers**: NVDA, JAWS, VoiceOver, TalkBack

3. **Use semantic HTML**: Headings, time elements for dates

4. **Provide keyboard alternatives**: All interactions should be keyboard accessible

5. **Maintain color contrast**: Minimum 4.5:1 for text, 3:1 for graphics

6. **Test RTL thoroughly**: Verify all interactions work in RTL

7. **Use prefers-reduced-motion**: Respect user motion preferences

8. **Support high contrast**: Test in Windows High Contrast mode

9. **Provide clear focus indicators**: Visible focus states for all interactive items

10. **Test on mobile devices**: Verify touch interactions work

**Next:** Return to the [SKILL.md](../SKILL.md#timeline) for the complete Timeline overview.
