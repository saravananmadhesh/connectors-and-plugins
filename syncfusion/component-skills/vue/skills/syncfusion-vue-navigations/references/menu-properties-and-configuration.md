# Properties and Configuration

## Table of Contents
1. [Core Properties](#core-properties)
2. [Data Binding](#data-binding)
3. [Display and Layout](#display-and-layout)
4. [Interaction](#interaction)
5. [Animation and Effects](#animation-and-effects)
6. [Mobile and Responsive](#mobile-and-responsive)
7. [State Management](#state-management)
8. [Localization and Text](#localization-and-text)
9. [Security](#security)
10. [Styling and Theming](#styling-and-theming)

## Core Properties

### items
**Type:** `MenuItemModel[]`  
**Default:** `[]`  
**Description:** Array of menu items to display in the menu component.

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### id
**Type:** `string`  
**Default:** `undefined`  
**Description:** Unique identifier for the menu element.

```vue
<template>
  <ejs-menu id="main-menu" :items="items"></ejs-menu>
</template>
```

### template
**Type:** `string | Function`  
**Default:** `undefined`  
**Description:** Custom template for rendering menu items.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([...]);

const customItemTemplate = (props) => {
  return `<span>${props.iconCss}</span>${props.text}`;
};
</script>

<template>
  <ejs-menu
    :items="items"
    :template="customItemTemplate"
  ></ejs-menu>
</template>
```

## Data Binding

### fields
**Type:** `FieldSettingsModel`  
**Default:** `undefined`  
**Description:** Specifies field mappings for data binding from external data sources.

```vue
<script setup>
import { ref } from 'vue';
import { MenuComponent } from '@syncfusion/ej2-vue-navigations';

const data = ref([
  { Id: 1, Text: 'File', Childs: [
    { Id: 2, Text: 'New' },
    { Id: 3, Text: 'Open' }
  ] },
  { Id: 4, Text: 'Edit', Childs: [
    { Id: 5, Text: 'Cut' },
    { Id: 6, Text: 'Copy' }
  ] }
]);

const fieldSettings = {
  itemId: 'Id',
  text: 'Text',
  children: 'Childs'
};
</script>

<template>
  <ejs-menu
    :items="data"
    :fields="fieldSettings"
  ></ejs-menu>
</template>
```

**FieldSettingsModel Properties:**
- `itemId` - Unique item identifier field
- `text` - Item display text field
- `iconCss` - CSS class for icons
- `url` - Navigation URL field
- `children` - Child items field
- `htmlAttributes` - HTML attributes field
- `separator` - Separator field
- `disabled` - Disabled state field

## Display and Layout

### orientation
**Type:** `Orientation` ('Horizontal' | 'Vertical')  
**Default:** `'Horizontal'`  
**Description:** Sets the orientation of the menu items.

```vue
<template>
  <!-- Horizontal menu (default) -->
  <ejs-menu :items="items" orientation="Horizontal"></ejs-menu>

  <!-- Vertical menu -->
  <ejs-menu :items="items" orientation="Vertical"></ejs-menu>
</template>
```

### enableScrolling
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables scrolling for menus with content exceeding viewport.

```vue
<template>
  <ejs-menu
    :items="items"
    :enableScrolling="true"
  ></ejs-menu>
</template>
```

### cssClass
**Type:** `string`  
**Default:** `undefined`  
**Description:** Custom CSS classes to apply to the menu container.

```vue
<template>
  <ejs-menu
    :items="items"
    cssClass="custom-menu dark-theme"
  ></ejs-menu>
</template>
```

### title
**Type:** `string`  
**Default:** `undefined`  
**Description:** Title text displayed in hamburger mode.

```vue
<template>
  <ejs-menu
    :items="items"
    title="Menu"
  ></ejs-menu>
</template>
```

## Interaction

### showItemOnClick
**Type:** `boolean`  
**Default:** `false`  
**Description:** When enabled, sub-menus open on item click instead of hover.

```vue
<template>
  <!-- Sub-menus open on hover (default) -->
  <ejs-menu :items="items"></ejs-menu>

  <!-- Sub-menus open on click -->
  <ejs-menu :items="items" :showItemOnClick="true"></ejs-menu>
</template>
```

### hoverDelay
**Type:** `number`  
**Default:** `400`  
**Description:** Delay in milliseconds before sub-menu opens on hover.

```vue
<template>
  <!-- Default 400ms delay -->
  <ejs-menu :items="items"></ejs-menu>

  <!-- Custom delay - 200ms -->
  <ejs-menu :items="items" :hoverDelay="200"></ejs-menu>

  <!-- No delay -->
  <ejs-menu :items="items" :hoverDelay="0"></ejs-menu>
</template>
```

### target
**Type:** `string`  
**Default:** `undefined`  
**Description:** CSS selector for the element where hamburger menu toggles are added.

```vue
<template>
  <ejs-menu
    :items="items"
    :hamburgerMode="true"
    target=".navbar"
  ></ejs-menu>
</template>
```

## Animation and Effects

### animationSettings
**Type:** `MenuAnimationSettings`  
**Default:** `{ effect: 'SlideDown', duration: 400, easing: 'ease' }`  
**Description:** Configures animation effects when sub-menus open and close.

```vue
<script setup>
import { ref } from 'vue';

const animationSettings = {
  effect: 'SlideDown',
  duration: 400,
  easing: 'ease'
};

const customAnimation = {
  effect: 'ZoomIn',
  duration: 300,
  easing: 'ease-in-out'
};
</script>

<template>
  <ejs-menu
    :items="items"
    :animationSettings="customAnimation"
  ></ejs-menu>
</template>
```

**Available Effects:**
- `None` - No animation
- `SlideDown` - Slide down animation
- `SlideUp` - Slide up animation
- `SlideLeft` - Slide left animation
- `SlideRight` - Slide right animation
- `FadeIn` - Fade in animation
- `FadeOut` - Fade out animation
- `ZoomIn` - Zoom in animation
- `ZoomOut` - Zoom out animation

## Mobile and Responsive

### hamburgerMode
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables hamburger menu mode for mobile devices and responsive designs.

```vue
<template>
  <!-- Standard menu (default) -->
  <ejs-menu :items="items"></ejs-menu>

  <!-- Hamburger mode for mobile -->
  <ejs-menu
    :items="items"
    :hamburgerMode="true"
    title="Navigation"
  ></ejs-menu>
</template>
```

## State Management

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables state persistence to save expanded/collapsed menu state across page reloads.

```vue
<template>
  <!-- Without persistence (state lost on reload) -->
  <ejs-menu :items="items"></ejs-menu>

  <!-- With persistence (state saved in localStorage) -->
  <ejs-menu
    :items="items"
    :enablePersistence="true"
  ></ejs-menu>
</template>
```

The menu state is stored in browser localStorage with key: `{id}_menu`

## Localization and Text

### locale
**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Culture/language identifier for localization.

```vue
<template>
  <!-- English (default) -->
  <ejs-menu :items="items" locale="en-US"></ejs-menu>

  <!-- Spanish -->
  <ejs-menu :items="items" locale="es-ES"></ejs-menu>

  <!-- German -->
  <ejs-menu :items="items" locale="de-DE"></ejs-menu>

  <!-- Arabic (RTL) -->
  <ejs-menu :items="items" locale="ar-AE" :enableRtl="true"></ejs-menu>
</template>
```

## Security

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`  
**Description:** When enabled, sanitizes HTML content in menu items to prevent XSS attacks.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: '<strong>File</strong>' }
]);
</script>

<template>
  <!-- With sanitization enabled (recommended for user-provided content) -->
  <ejs-menu
    :items="items"
    :enableHtmlSanitizer="true"
  ></ejs-menu>

  <!-- Disable sanitization only if content is trusted -->
  <ejs-menu
    :items="items"
    :enableHtmlSanitizer="false"
  ></ejs-menu>
</template>
```

## Styling and Theming

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables right-to-left text direction support.

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'ملف',
    items: [
      { text: 'جديد' },
      { text: 'فتح' },
      { text: 'حفظ' }
    ]
  },
  {
    text: 'تحرير',
    items: [
      { text: 'قص' },
      { text: 'نسخ' },
      { text: 'لصق' }
    ]
  }
]);
</script>

<template>
  <!-- LTR layout (default) -->
  <ejs-menu :items="items"></ejs-menu>

  <!-- RTL layout for Arabic, Hebrew, etc. -->
  <ejs-menu
    :items="items"
    :enableRtl="true"
    locale="ar-AE"
  ></ejs-menu>
</template>
```

## MenuItemModel Properties

Individual menu items support these properties:

| Property | Type | Purpose |
|----------|------|---------|
| `text` | string | Display text for the item |
| `iconCss` | string | CSS class for item icon |
| `url` | string | Navigation URL |
| `items` | MenuItemModel[] | Child menu items |
| `disabled` | boolean | Disable the item |
| `separator` | boolean | Render as separator |
| `htmlAttributes` | Object | Custom HTML attributes |
| `id` | string | Unique item identifier |

**Complete MenuItem Example:**
```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    id: 'file',
    text: 'File',
    iconCss: 'e-icons e-folder-open',
    items: [
      {
        id: 'new',
        text: 'New',
        iconCss: 'e-icons e-new'
      },
      {
        id: 'open',
        text: 'Open',
        iconCss: 'e-icons e-open',
        url: '/open'
      },
      {
        separator: true
      },
      {
        id: 'exit',
        text: 'Exit',
        disabled: false
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Animation Settings Reference

```vue
<script setup>
import { ref } from 'vue';

const animationSettings = {
  effect: 'SlideDown',     // Animation effect type
  duration: 400,           // Duration in milliseconds
  easing: 'ease',          // Easing function
  delay: 0                 // Delay before animation starts
};
</script>

<template>
  <ejs-menu
    :items="items"
    :animationSettings="animationSettings"
  ></ejs-menu>
</template>
```

## Related Topics

- [Methods and API](./methods-api.md) - Available methods
- [Events and Callbacks](./events-and-callbacks.md) - Event handling
- [Data Binding](./data-binding.md) - Binding from data sources
- [Styling and Appearance](./styling-and-appearance.md) - Custom styling
- [Hamburger and Mobile Mode](./hamburger-mode.md) - Mobile implementation
