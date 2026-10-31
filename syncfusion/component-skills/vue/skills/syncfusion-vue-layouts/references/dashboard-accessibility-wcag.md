# Dashboard Layout Accessibility (WCAG) (Vue 3)

## Table of Contents
- [WCAG 2.2 Level AA Compliance](#wcag-22-level-aa-compliance)
- [Section 508 Standards](#section-508-standards)
- [WAI-ARIA Roles and Properties](#wai-aria-roles-and-properties)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Language Support](#rtl-language-support)

## WCAG 2.2 Level AA Compliance

The Dashboard Layout component follows WCAG 2.2 Level AA standards for accessible dashboard interfaces.

### Core Compliance Areas

| Area | Standard | Support |
|------|----------|---------|
| Perceivable | 1.x | Text alternatives, color contrast |
| Operable | 2.x | Keyboard, timing, navigation |
| Understandable | 3.x | Readable, predictable input |
| Robust | 4.x | Compatible with assistive tech |

## Section 508 Standards

Section 508 requires federal agencies to make electronic content accessible. The Dashboard Layout supports these requirements through:

- Keyboard-accessible controls
- ARIA labels and roles
- Focus indicators
- Status announcements

## WAI-ARIA Roles and Properties

### Default ARIA Attributes

The component automatically applies ARIA attributes to panels:

```html
<div role="region" aria-label="Dashboard Panel" tabindex="0">
  <div class="e-panel-header" role="heading" aria-level="2">
    Panel Title
  </div>
  <div class="e-panel-content" role="group" aria-labelledby="panel-header-id">
    Content
  </div>
</div>
```

### Custom ARIA Labels

```vue
<script setup>
const panels = ref([
  {
    id: 'sales',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 2,
    header: 'Sales',
    content: 'Sales data',
    cssClass: 'aria-sales-panel'
  }
]);
</script>

<style>
.aria-sales-panel .e-panel-header {
  /* Will be picked up by aria-labelledby */
}
</style>
```

### Adding ARIA Descriptions

```vue
<script setup>
import { ref, onMounted, nextTick } from 'vue';

const dashboardRef = ref(null);

onMounted(async () => {
  await nextTick();
  const panels = document.querySelectorAll('.e-panel');
  panels.forEach(panel => {
    const id = panel.id;
    const header = panel.querySelector('.e-panel-header')?.textContent;
    panel.setAttribute('aria-label', `Dashboard panel: ${header}`);
    panel.setAttribute('aria-describedby', `${id}-description`);
  });
});
</script>
```

## Keyboard Navigation

### Default Keyboard Support

The Dashboard Layout supports these keyboard interactions:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next panel/control |
| `Shift + Tab` | Move focus to previous panel/control |
| `Enter` | Activate focused element |
| `Space` | Activate buttons or toggle state |
| `Esc` | Cancel current drag/resize |
| `Arrow keys` | Move focus within panel grid |

### Custom Keyboard Handlers

```vue
<template>
  <div @keydown="onKeyDown" tabindex="0">
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);

const onKeyDown = (event) => {
  // Custom shortcuts
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    saveLayout();
  }

  if (event.key === 'r' && event.ctrlKey) {
    event.preventDefault();
    resetLayout();
  }
};

const saveLayout = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('layout', JSON.stringify(layout));
};

const resetLayout = () => {
  if (confirm('Reset dashboard layout?')) {
    localStorage.removeItem('layout');
    location.reload();
  }
};
</script>
```

### Focus Indicators

```css
.e-panel:focus,
.e-panel-header:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

.e-resize-handle:focus {
  outline: 2px dashed #0066cc;
  outline-offset: 4px;
}

.e-panel-header button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 1px;
}
```

## Screen Reader Support

### Status Announcements

Announce layout changes to screen readers:

```vue
<script setup>
import { ref, onMounted } from 'vue';

const liveRegion = ref(null);
const message = ref('');

const announce = (text) => {
  message.value = text;
};

const onChange = (args) => {
  if (args.addedPanels.length > 0) {
    announce(`${args.addedPanels.length} panel(s) added`);
  }
  if (args.removedPanels.length > 0) {
    announce(`${args.removedPanels.length} panel(s) removed`);
  }
  if (args.changedPanels.length > 0) {
    announce(`${args.changedPanels.length} panel(s) moved or resized`);
  }
};
</script>

<template>
  <div>
    <div
      ref="liveRegion"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ message }}
    </div>
    <DashboardLayoutComponent :panels="panels" :change="onChange" />
  </div>
</template>

<style>
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

### Skip Navigation Link

```vue
<template>
  <div>
    <a href="#dashboard-main" class="skip-link">Skip to dashboard content</a>
    <DashboardLayoutComponent id="dashboard-main" :panels="panels" />
  </div>
</template>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
</style>
```

## RTL Language Support

### Enable RTL Mode

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :enableRtl="true"
  />
</template>
```

### Direction-Aware Styling

```css
[dir="rtl"] .e-panel-header {
  text-align: right;
}

[dir="ltr"] .e-resize-handle.e-south-east {
  right: 0;
  bottom: 0;
}

[dir="rtl"] .e-resize-handle.e-south-west {
  left: 0;
  bottom: 0;
}
```

### Dynamic RTL Switching

```vue
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const isRtl = ref(false);
const dashboardRef = ref(null);

const checkDirection = () => {
  isRtl.value = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
};

onMounted(() => {
  checkDirection();
  const observer = new MutationObserver(checkDirection);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <DashboardLayoutComponent :enableRtl="isRtl" :panels="panels" />
</template>
```

## Best Practices

1. **Always provide meaningful panel headers**: Screen readers announce headers first

2. **Test with actual screen readers**: NVDA, JAWS, VoiceOver, TalkBack

3. **Use semantic HTML in panel content**: Headings, lists, landmarks

4. **Maintain color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text

5. **Provide keyboard alternatives**: Every mouse action should be keyboard accessible

6. **Announce dynamic changes**: Use ARIA live regions for state changes

7. **Test RTL layouts**: Verify all interactions work in RTL mode

8. **Document accessibility features**: Include accessibility notes in your app's documentation

9. **Use focus-visible CSS**: Apply focus styles only to keyboard focus, not clicks

10. **Provide instructions**: Add help text explaining drag/resize interactions

**Next:** Learn about [advanced features](dashboard-advanced-features.md) for dynamic panels and performance.
