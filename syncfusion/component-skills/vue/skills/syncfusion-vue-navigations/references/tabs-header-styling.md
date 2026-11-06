# Header Styling & Customization

## Table of Contents
- [Built-In Header Styles](#built-in-header-styles)
- [Icon Positioning](#icon-positioning)
- [Icon Customization](#icon-customization)
- [Custom Styling](#custom-styling)
- [Styling Examples](#styling-examples)

## Built-In Header Styles

The Tab component provides predefined CSS classes to style tab headers. Apply these classes directly to the `<ejs-tab>` element.

### Style Class: `e-fill`

**Effect**: Selected tab header background is solid fill with highlight

```vue
<template>
  <ejs-tab class="e-fill">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: For prominent active tab indication with solid background color.

### Style Class: `e-background`

**Effect**: Tab header has solid fill background, selected header has highlighted border

```vue
<template>
  <ejs-tab class="e-background">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>
```

**When to use**: For subtle tab indication with border highlighting.

### Style Class: `e-background e-accent`

**Effect**: Tab header has solid fill background, selected header highlighted with accent color

```vue
<template>
  <ejs-tab class="e-background e-accent">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>
```

**When to use**: For branded or accent-colored tab highlighting. Most visually distinctive option.

### Default Style (No Class)

Without any class, the Tab component uses default styling with underline indication for active tabs.

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>
```

**When to use**: For minimal, clean interface with simple underline styling.

## Icon Positioning

Each tab header item can position its icon using the `iconPosition` property defined within the header model.

### Icon Positions

| Position | Description | Use Case |
|----------|-------------|----------|
| `Left` | Icon on the left of text (default) | Standard icon-text layout |
| `Right` | Icon on the right of text | Right-aligned icon design |
| `Top` | Icon above text | Vertical icon-text stacking |
| `Bottom` | Icon below text | Icon below label design |

### Icon Position: Left

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Home', iconCss: 'e-icons e-home', iconPosition: 'Left' }">
        <template #content>Home content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Profile', iconCss: 'e-icons e-user', iconPosition: 'Left' }">
        <template #content>Profile content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Settings', iconCss: 'e-icons e-settings', iconPosition: 'Left' }">
        <template #content>Settings content</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Icon Position: Top

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Dashboard', iconCss: 'e-icons e-dashboard', iconPosition: 'Top' }">
        <template #content>Dashboard content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Analytics', iconCss: 'e-icons e-chart-pie', iconPosition: 'Top' }">
        <template #content>Analytics content</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>
```

### Icon Position: Right

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Messages', iconCss: 'e-icons e-message', iconPosition: 'Right' }">
        <template #content>Messages content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Notifications', iconCss: 'e-icons e-bell', iconPosition: 'Right' }">
        <template #content>Notifications content</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>
```

## Icon Customization

Use the `iconCss` property in the header object to specify custom icon CSS classes.

### Available Icon Classes

Syncfusion provides icon classes prefixed with `e-icons e-`. Common examples:

- `e-icons e-home` - Home icon
- `e-icons e-user` - User/Profile icon
- `e-icons e-settings` - Settings icon
- `e-icons e-mail` - Mail/Message icon
- `e-icons e-chart-pie` - Chart icon
- `e-icons e-dashboard` - Dashboard icon
- `e-icons e-folder` - Folder icon
- `e-icons e-file` - File icon

### Example: Icon-Heavy Tab

```vue
<template>
  <ejs-tab class="e-fill">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Dashboard', iconCss: 'e-icons e-dashboard', iconPosition: 'Top' }">
        <template #content>Dashboard metrics and analytics</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Users', iconCss: 'e-icons e-people', iconPosition: 'Top' }">
        <template #content>User management</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Reports', iconCss: 'e-icons e-report', iconPosition: 'Top' }">
        <template #content>Report generation and viewing</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Settings', iconCss: 'e-icons e-settings', iconPosition: 'Top' }">
        <template #content>System configuration</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

## Custom Styling

### CSS Selectors for Tab Components

Beyond built-in classes, you can apply custom CSS:

**Tab container:**
```css
:deep(.e-tab) {
  border: 5px solid rgb(173, 255, 47);
}
```

**Tab header section:**
```css
:deep(.e-tab .e-tab-header) {
  background: #badfba !important;
}
```

**Tab header items/toolbar:**
```css
:deep(.e-tab .e-tab-header .e-toolbar-items) {
  background: #9faed8;
  border: 2px solid blue;
}
```

**Tab header icons:**
```css
:deep(.e-tab .e-tab-header .e-toolbar-item .e-tab-icon) {
  color: #badfba !important;
}
```

**Tab content section:**
```css
:deep(.e-tab .e-content) {
  background: #d1f6d1 !important;
}
```

**Tab content items:**
```css
:deep(.e-tab .e-content .e-item) {
  color: #a78515;
  font-size: 14px;
}
```

**Tab hover state:**
```css
:deep(.e-tab .e-tab-header .e-toolbar-item .e-tab-wrap:hover) {
  background: #d1f6d1 !important;
}
```

## Styling Examples

### Example 1: Modern Professional Style

```vue
<template>
  <ejs-tab class="professional-tab">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Overview' }">
        <template #content>Account overview and quick statistics</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Activity' }">
        <template #content>Recent activity and logs</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Settings' }">
        <template #content>Account settings and preferences</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
:deep(.professional-tab .e-tab-header) {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.professional-tab .e-tab-header .e-toolbar-item .e-tab-text) {
  color: white;
  font-weight: 500;
  padding: 12px 20px;
}

:deep(.professional-tab .e-tab-header .e-toolbar-item.e-active .e-tab-text) {
  border-bottom: 3px solid white;
}

:deep(.professional-tab .e-content) {
  background: #f8f9fa;
  padding: 20px;
}
</style>
```

### Example 2: Icon Tabs with Background

```vue
<template>
  <ejs-tab class="e-background e-accent">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Orders', iconCss: 'e-icons e-cart', iconPosition: 'Top' }">
        <template #content>Order management and history</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Payments', iconCss: 'e-icons e-money', iconPosition: 'Top' }">
        <template #content>Payment methods and history</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Shipments', iconCss: 'e-icons e-shipping', iconPosition: 'Top' }">
        <template #content>Shipment tracking and status</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Example 3: Minimal Clean Style

```vue
<template>
  <ejs-tab>
    <e-tab-items>
      <e-tab-item :header="{ text: 'Description' }">
        <template #content>Product description goes here</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Reviews' }">
        <template #content>Customer reviews section</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Specifications' }">
        <template #content>Account settings and preferences</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Example 4: Dark Mode with Reactive Class

```vue
<template>
  <div>
    <button @click="toggleDarkMode">Toggle Dark Mode</button>
    <ejs-tab :class="{ 'dark-theme': isDarkMode }">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Light' }">
          <template #content>This content supports light mode</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Dark' }">
          <template #content>This content supports dark mode</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
:deep(.dark-theme .e-tab-header) {
  background-color: #333;
}

:deep(.dark-theme .e-tab-header .e-toolbar-item .e-tab-text) {
  color: #fff;
}

:deep(.dark-theme .e-content) {
  background-color: #2a2a2a;
  color: #fff;
}
</style>
```

## Best Practices

1. **Choose style class based on importance**: Use `e-fill` for primary navigation, default for secondary
2. **Icon positioning**: Use `Left` or `Right` for horizontal layouts, `Top` or `Bottom` for compact designs
3. **Consistency**: Apply consistent styling across all tabs in your application
4. **Accessibility**: Ensure sufficient color contrast and don't rely on color alone to indicate state
5. **Performance**: Use CSS classes instead of inline styles for better performance and maintainability
