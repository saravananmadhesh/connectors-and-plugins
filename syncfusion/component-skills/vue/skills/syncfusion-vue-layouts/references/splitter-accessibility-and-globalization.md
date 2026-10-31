# Splitter Accessibility & Globalization (Vue 3)

## Table of Contents
- [WCAG 2.1 Compliance and Keyboard Navigation](#wcag-21-compliance-and-keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Internationalization](#internationalization)
- [Focus Management](#focus-management)

## WCAG 2.1 Compliance and Keyboard Navigation

### Default Keyboard Support

The Splitter component supports these keyboard interactions:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next pane/separator |
| `Shift + Tab` | Move focus to previous pane/separator |
| `Enter` / `Space` | Toggle collapse on focused separator |
| `Arrow Left/Right` | Resize horizontal separator (with focus) |
| `Arrow Up/Down` | Resize vertical separator (with focus) |
| `Home` | Set pane to minimum size |
| `End` | Set pane to maximum size |

### Custom Keyboard Handlers

```vue
<template>
  <div @keydown="onKeyDown" tabindex="0">
    <SplitterComponent height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><div>1</div></e-pane>
        <e-pane size="200px"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
const onKeyDown = (event) => {
  if (event.ctrlKey && event.key === 'r') {
    event.preventDefault();
    // Reset layout
  }
};
</script>

<style>
[tabindex="0"]:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
</style>
```

## ARIA Attributes

### Default ARIA Structure

The Splitter automatically applies:

```html
<div class="e-splitter" role="separator" aria-orientation="horizontal">
  <div class="e-pane" role="region" aria-label="Pane 1">...</div>
  <div class="e-split-bar" tabindex="0" role="separator" aria-valuenow="200" aria-valuemin="50" aria-valuemax="600"></div>
  <div class="e-pane" role="region" aria-label="Pane 2">...</div>
</div>
```

### Custom ARIA Labels

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :htmlAttributes="htmlAttrs"
  >
    <e-panes>
      <e-pane size="200px"><div>Navigation</div></e-pane>
      <e-pane><div>Content</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const htmlAttrs = {
  'aria-label': 'Main application splitter',
  'aria-describedby': 'splitter-description'
};
</script>

<p id="splitter-description" class="sr-only">
  Use Tab to focus the separator, then arrow keys to resize panes.
</p>
```

### Per-Pane Labels

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane
        size="200px"
        :htmlAttributes="leftAttrs"
      >
        <div>Sidebar</div>
      </e-pane>
      <e-pane
        :htmlAttributes="rightAttrs"
      >
        <div>Main</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const leftAttrs = {
  'aria-label': 'Navigation sidebar',
  role: 'navigation'
};

const rightAttrs = {
  'aria-label': 'Main content area',
  role: 'main'
};
</script>
```

## RTL (Right-to-Left) Support

### Enable RTL Mode

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :enableRtl="true"
  >
    <e-panes>
      <e-pane size="200px"><div>Right (first in RTL)</div></e-pane>
      <e-pane><div>Left (second in RTL)</div></e-pane>
    </e-panes>
  </SplitterComponent>
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
    <SplitterComponent
      height="400px"
      width="100%"
      :enableRtl="isRtl"
    >
      <e-panes>
        <e-pane size="200px"><div>Pane 1</div></e-pane>
        <e-pane><div>Pane 2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const isRtl = ref(document.documentElement.dir === 'rtl');

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
  document.documentElement.dir = isRtl.value ? 'rtl' : 'ltr';
};
</script>
```

## Internationalization

### Set Locale

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    locale="fr-FR"
  >
    <e-panes>
      <e-pane size="200px"><div>Panneau 1</div></e-pane>
      <e-pane><div>Panneau 2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Load Locale Dynamically

```vue
<template>
  <div>
    <select v-model="locale" @change="loadLocale">
      <option value="en-US">English</option>
      <option value="fr-FR">French</option>
      <option value="es-ES">Spanish</option>
      <option value="de-DE">German</option>
    </select>
    <SplitterComponent
      :key="locale"
      height="400px"
      width="100%"
      :locale="locale"
    >
      <e-panes>
        <e-pane size="200px"><div>{{ content[locale] }}</div></e-pane>
        <e-pane><div>Content</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { SplitterComponent, L10n } from '@syncfusion/ej2-base';
import { loadCldr } from '@syncfusion/ej2-base';

const locale = ref('en-US');
const content = ref({
  'en-US': 'Hello',
  'fr-FR': 'Bonjour',
  'es-ES': 'Hola',
  'de-DE': 'Hallo'
});

const loadLocale = async () => {
  try {
    const response = await fetch(`/locales/${locale.value}.json`);
    const data = await response.json();
    L10n.load(data);
  } catch (e) {
    console.error('Failed to load locale:', e);
  }
};
</script>
```

## Focus Management

### Custom Focus Indicators

```vue
<style>
.e-splitter .e-split-bar:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  background-color: #4d9fff;
}

.e-splitter .e-pane:focus {
  outline: 2px dashed #0066cc;
  outline-offset: -2px;
}
</style>
```

### Skip-to-Content Pattern

```vue
<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <SplitterComponent height="400px" width="100%">
      <e-panes>
        <e-pane size="200px">
          <nav>Navigation</nav>
        </e-pane>
        <e-pane>
          <main id="main-content" tabindex="-1">
            Main content
          </main>
        </e-pane>
      </e-panes>
    </SplitterComponent>
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

#main-content:focus {
  outline: 2px solid #0066cc;
}
</style>
```

### Announce Resize for Screen Readers

```vue
<template>
  <div>
    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>
    <SplitterComponent
      ref="splitterRef"
      id="a11y-splitter"
      height="400px"
      width="100%"
      :resizeStop="announceResize"
    >
      <e-panes>
        <e-pane size="200px"><div>1</div></e-pane>
        <e-pane size="200px"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const announcement = ref('');

const announceResize = () => {
  const panes = document.querySelectorAll('#a11y-splitter .e-pane');
  const sizes = Array.from(panes).map(p => p.style.flexBasis).join(' and ');
  announcement.value = `Pane sizes: ${sizes}`;
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

## Best Practices

1. **Always provide ARIA labels**: For each pane region

2. **Test with screen readers**: NVDA, JAWS, VoiceOver

3. **Support keyboard resize**: All mouse actions should be keyboard accessible

4. **Provide focus indicators**: Clear visual focus states

5. **Use semantic HTML inside panes**: Headings, landmarks

6. **Test RTL thoroughly**: Verify all interactions work in RTL

7. **Localize content**: Translate pane text for international users

8. **Announce dynamic changes**: Use ARIA live regions

**Next:** Learn about [style customization](splitter-style-customization.md) for theming.
