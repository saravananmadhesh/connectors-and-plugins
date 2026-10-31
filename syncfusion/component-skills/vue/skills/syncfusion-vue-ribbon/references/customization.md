# Customization in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [CSS Customization](#css-customization)
- [Theming](#theming)
- [RTL Support](#rtl-support)
- [Persistence](#persistence)
- [Localization](#localization)
- [Help Pane Template](#help-pane-template)
- [Tab Animation](#tab-animation)
- [KeyTips](#keytips)
- [Tooltips](#tooltips)
- [Custom Width](#custom-width)

## Overview

The Ribbon component provides extensive customization options including CSS classes, theming, RTL support, persistence, localization, help pane templates, animations, KeyTips, and tooltips.

## CSS Customization

Apply custom CSS classes to the ribbon and its elements.

### Ribbon CSS Class

```vue
<ejs-ribbon cssClass="custom-ribbon">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<style>
.custom-ribbon {
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.custom-ribbon .e-ribbon-tab {
  background-color: #f0f0f0;
}

.custom-ribbon .e-ribbon-group-header {
  color: #0078d4;
  font-weight: 600;
}
</style>
```

### Custom Icons

Use custom icon CSS classes:

```vue
<e-ribbon-item type="Button" :buttonSettings="customButton"></e-ribbon-item>

<script setup>
const customButton = {
  content: 'Custom',
  iconCss: 'custom-icon my-icon'
};
</script>

<style>
.custom-icon.my-icon {
  background-image: url('path/to/icon.svg');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
  display: inline-block;
}
</style>
```

### Group Custom Styling

```vue
<e-ribbon-group header="Clipboard" cssClass="custom-group">
  <!-- Group content -->
</e-ribbon-group>

<style>
.custom-group {
  border-left: 3px solid #0078d4;
}

.custom-group .e-ribbon-group-header {
  background-color: #e3f2fd;
}
</style>
```

## Theming

Apply Syncfusion themes or customize the appearance.

### Built-in Themes

Import a Syncfusion theme:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <!-- Tabs -->
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon } from '@syncfusion/ej2-vue-ribbon';
// Material theme
import "@syncfusion/ej2-material3-theme/styles/ribbon/index.css";
</script>
```

**Available Themes:**
- Material: `material.css`
- Bootstrap: `bootstrap5.css`
- Tailwind: `tailwind.css`
- Fluent: `fluent.css`
- Fabric: `fabric.css`
- High Contrast: `highcontrast.css`

### Bootstrap Theme Example

```javascript
// Bootstrap 5 theme
import "@syncfusion/ej2-bootstrap5-theme/styles/ribbon/index.css";
```

### Custom Theme Variables

Override CSS variables for customization:

```vue
<style>
:root {
  --ribbon-bg-color: #f5f5f5;
  --ribbon-tab-color: #333;
  --ribbon-tab-hover-bg: #e0e0e0;
  --ribbon-active-tab-bg: #0078d4;
  --ribbon-active-tab-color: white;
}

.e-ribbon {
  background-color: var(--ribbon-bg-color);
}

.e-ribbon-tab {
  color: var(--ribbon-tab-color);
}

.e-ribbon-tab:hover {
  background-color: var(--ribbon-tab-hover-bg);
}

.e-ribbon-tab.e-active {
  background-color: var(--ribbon-active-tab-bg);
  color: var(--ribbon-active-tab-color);
}
</style>
```

## RTL Support

Enable right-to-left support for languages like Arabic and Hebrew.

### Enable RTL

```vue
<ejs-ribbon :enableRtl="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="الرئيسية">
      <e-ribbon-groups>
        <e-ribbon-group header="الحافظة">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const pasteButton = {
  content: 'لصق',
  iconCss: 'e-icons e-paste'
};
</script>
```

## Persistence

Enable state persistence across page reloads.

### Enable Persistence

```vue
<ejs-ribbon 
  id="ribbon" 
  :enablePersistence="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
    <e-ribbon-tab header="Insert">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

**Persisted State:**
- Selected tab
- Active layout (Classic/Simplified)
- Minimized state
- Custom configurations

**Storage:** Uses browser's localStorage with key based on component ID.

## Localization

Localize ribbon text for different languages.

### Set Locale

```vue
<template>
  <ejs-ribbon locale="fr">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Accueil">
        <e-ribbon-groups>
          <e-ribbon-group header="Presse-papiers">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Set French locale
L10n.load({
  'fr': {
    'ribbon': {
      'overflow': 'Plus',
      'minimize': 'Réduire le ruban',
      'expand': 'Développer le ruban',
      'classicLayout': 'Disposition classique',
      'simplifiedLayout': 'Disposition simplifiée'
    }
  }
});

const pasteButton = {
  content: 'Coller',
  iconCss: 'e-icons e-paste'
};
</script>
```

### Spanish Localization Example

```javascript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'es': {
    'ribbon': {
      'overflow': 'Más',
      'minimize': 'Minimizar cinta',
      'expand': 'Expandir cinta',
      'classicLayout': 'Diseño clásico',
      'simplifiedLayout': 'Diseño simplificado'
    }
  }
});
```

## Help Pane Template

Add a custom help pane at the right end of the ribbon.

### Basic Help Pane

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <!-- Tab content -->
      </e-ribbon-tab>
    </e-ribbon-tabs>
    <template v-slot:helpPaneTemplate>
      <div class="help-pane">
        <button class="e-btn e-icon-btn" title="Help">
          <span class="e-icons e-help"></span>
        </button>
        <button class="e-btn e-icon-btn" title="Settings">
          <span class="e-icons e-settings"></span>
        </button>
      </div>
    </template>
  </ejs-ribbon>
</template>

<style>
.help-pane {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
}
</style>
```

### Help Pane with User Info

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <!-- Tabs -->
    </e-ribbon-tabs>
    <template v-slot:helpPaneTemplate>
      <div class="help-pane">
        <button class="e-btn e-icon-btn" @click="showHelp">
          <span class="e-icons e-help"></span>
        </button>
        <div class="user-info">
          <img src="avatar.jpg" alt="User" class="user-avatar" />
          <span>John Doe</span>
        </div>
      </div>
    </template>
  </ejs-ribbon>
</template>

<script setup>
const showHelp = () => {
  console.log('Opening help...');
};
</script>

<style>
.help-pane {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
```

## Tab Animation

Configure tab switching animations with detailed control over transition effects and timing.

### TabAnimationSettingsModel Properties

The `tabAnimation` property accepts an object with `previous` and `next` animation configurations:

```javascript
const tabAnimation = {
  previous: {
    effect: 'SlideLeftIn',      // Animation effect when switching to previous tab
    duration: 600,               // Duration in milliseconds (default: 600)
    easing: 'ease'               // CSS easing function (default: 'ease')
  },
  next: {
    effect: 'SlideRightIn',      // Animation effect when switching to next tab
    duration: 600,               // Duration in milliseconds (default: 600)
    easing: 'ease'               // CSS easing function (default: 'ease')
  }
};
```

### Animation Effects

**Slide Effects:**
- `SlideLeftIn` - Content slides in from left
- `SlideRightIn` - Content slides in from right
- `SlideLeftOut` - Content slides out to left
- `SlideRightOut` - Content slides out to right

**Fade Effects:**
- `FadeIn` - Content fades in smoothly
- `FadeOut` - Content fades out smoothly

**Other Effects:**
- `None` - No animation

### Easing Functions

CSS easing options:
- `ease` - Smooth acceleration/deceleration (default)
- `linear` - Constant speed
- `ease-in` - Slow start, fast end
- `ease-out` - Fast start, slow end
- `ease-in-out` - Slow start and end
- `cubic-bezier()` - Custom timing function

### Enable Tab Animation

```vue
<ejs-ribbon :tabAnimation="animationSettings">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
    <e-ribbon-tab header="Insert">
      <!-- Tab content -->
    </e-ribbon-tab>
    <e-ribbon-tab header="Design">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const animationSettings = {
  previous: {
    effect: 'SlideLeftIn',
    duration: 400,
    easing: 'ease-in-out'
  },
  next: {
    effect: 'SlideRightIn',
    duration: 400,
    easing: 'ease-in-out'
  }
};
</script>
```

### Fast Animation

For responsive interfaces with quick animations:

```vue
<script setup>
const fastAnimation = {
  previous: {
    effect: 'FadeIn',
    duration: 150,
    easing: 'linear'
  },
  next: {
    effect: 'FadeOut',
    duration: 150,
    easing: 'linear'
  }
};
</script>
```

### Slow Animation

For emphasizing tab transitions:

```vue
<script setup>
const slowAnimation = {
  previous: {
    effect: 'SlideLeftIn',
    duration: 800,
    easing: 'ease-in-out'
  },
  next: {
    effect: 'SlideRightIn',
    duration: 800,
    easing: 'ease-in-out'
  }
};
</script>
```

### Different Effects for Previous and Next

```vue
<script setup>
const mixedAnimation = {
  previous: {
    effect: 'FadeIn',
    duration: 300,
    easing: 'ease-out'
  },
  next: {
    effect: 'SlideRightIn',
    duration: 500,
    easing: 'ease-in'
  }
};
</script>
```

### Disable Animation

```vue
<ejs-ribbon :tabAnimation="{ previous: { effect: 'None' }, next: { effect: 'None' } }">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>
```

## KeyTips

Enable keyboard navigation with KeyTips.

### Enable KeyTips

```vue
<ejs-ribbon :enableKeyTips="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home" keyTip="H">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" keyTip="V" :buttonSettings="pasteButton">
                </e-ribbon-item>
                <e-ribbon-item type="Button" keyTip="X" :buttonSettings="cutButton">
                </e-ribbon-item>
                <e-ribbon-item type="Button" keyTip="C" :buttonSettings="copyButton">
                </e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
    <e-ribbon-tab header="Insert" keyTip="N">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const pasteButton = { content: 'Paste', iconCss: 'e-icons e-paste' };
const cutButton = { content: 'Cut', iconCss: 'e-icons e-cut' };
const copyButton = { content: 'Copy', iconCss: 'e-icons e-copy' };
</script>
```

**Usage:**
1. Press `Alt` or `F10` to activate KeyTips
2. Press the key shown to activate that item
3. Press `Esc` to cancel

### Layout Switcher KeyTip

```vue
<ejs-ribbon 
  :enableKeyTips="true"
  layoutSwitcherKeyTip="L">
  <e-ribbon-tabs>
    <!-- Tabs -->
  </e-ribbon-tabs>
</ejs-ribbon>
```

## Tooltips

Add tooltips to ribbon items.

### Item Tooltips

```vue
<e-ribbon-item 
  type="Button" 
  :buttonSettings="pasteButton"
  :ribbonTooltipSettings="pasteTooltip">
</e-ribbon-item>

<script setup>
const pasteButton = {
  content: 'Paste',
  iconCss: 'e-icons e-paste'
};

const pasteTooltip = {
  title: 'Paste',
  content: 'Paste the contents of the clipboard',
  iconCss: 'e-icons e-paste'
};
</script>
```

### Enhanced Tooltip with Shortcut

```vue
<e-ribbon-item 
  type="Button" 
  :buttonSettings="cutButton"
  :ribbonTooltipSettings="cutTooltip">
</e-ribbon-item>

<script setup>
const cutButton = {
  content: 'Cut',
  iconCss: 'e-icons e-cut'
};

const cutTooltip = {
  title: 'Cut (Ctrl+X)',
  content: 'Remove the selection and put it on the clipboard',
  iconCss: 'e-icons e-cut',
  cssClass: 'custom-tooltip'
};
</script>

<style>
.custom-tooltip .e-tooltip-content {
  max-width: 300px;
}
</style>
```

### Tooltip Properties

```javascript
const tooltipSettings = {
  title: 'Tooltip Title',          // Tooltip header
  content: 'Tooltip description',  // Tooltip body text
  iconCss: 'e-icons e-icon',       // Tooltip icon
  cssClass: 'custom-class'         // Custom CSS class
};
```

## Custom Width

Set a fixed width for the ribbon.

### Fixed Width

```vue
<ejs-ribbon width="1200px">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Responsive Width

```vue
<ejs-ribbon width="100%">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<style>
.e-ribbon {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
```

## Complete Customization Example

Comprehensive example with all customization options:

```vue
<template>
  <ejs-ribbon
    id="customRibbon"
    cssClass="custom-ribbon"
    width="100%"
    :enableRtl="false"
    :enablePersistence="true"
    :enableKeyTips="true"
    locale="en-US"
    activeLayout="Classic"
    :tabAnimation="animationSettings"
    layoutSwitcherKeyTip="L"
    @created="onCreated">
    
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home" keyTip="H">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard" cssClass="clipboard-group">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item 
                    type="Button" 
                    keyTip="V"
                    :buttonSettings="pasteButton"
                    :ribbonTooltipSettings="pasteTooltip">
                  </e-ribbon-item>
                  <e-ribbon-item 
                    type="Button" 
                    keyTip="X"
                    :buttonSettings="cutButton"
                    :ribbonTooltipSettings="cutTooltip">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
      
      <e-ribbon-tab header="Insert" keyTip="N">
        <e-ribbon-groups>
          <e-ribbon-group header="Tables">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="tableButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
    
    <template v-slot:helpPaneTemplate>
      <div class="help-pane">
        <button class="e-btn e-icon-btn" @click="showHelp" title="Help">
          <span class="e-icons e-help"></span>
        </button>
        <div class="user-info">
          <span class="e-icons e-user"></span>
          <span>{{ username }}</span>
        </div>
      </div>
    </template>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';
import { RibbonComponent as EjsRibbon,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem
} from '@syncfusion/ej2-vue-ribbon';

const username = ref('John Doe');

const animationSettings = {
  previous: { effect: 'SlideLeft', duration: 300, easing: 'ease' },
  next: { effect: 'SlideRight', duration: 300, easing: 'ease' }
};

const pasteButton = { content: 'Paste', iconCss: 'e-icons e-paste' };
const cutButton = { content: 'Cut', iconCss: 'e-icons e-cut' };
const tableButton = { content: 'Table', iconCss: 'e-icons e-table' };

const pasteTooltip = {
  title: 'Paste (Ctrl+V)',
  content: 'Paste the contents of the clipboard',
  iconCss: 'e-icons e-paste'
};

const cutTooltip = {
  title: 'Cut (Ctrl+X)',
  content: 'Cut the selection and put it on the clipboard',
  iconCss: 'e-icons e-cut'
};

const onCreated = () => {
  console.log('Ribbon created with custom settings');
};

const showHelp = () => {
  console.log('Opening help documentation');
};
</script>

<style>
.custom-ribbon {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.custom-ribbon .e-ribbon-tab.e-active {
  background-color: #0078d4;
  color: white;
}

.clipboard-group {
  border-left: 3px solid #0078d4;
}

.help-pane {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 0 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.user-info .e-icons {
  font-size: 18px;
}
</style>
```

This comprehensive customization guide enables full control over the Ribbon component's appearance and behavior.
