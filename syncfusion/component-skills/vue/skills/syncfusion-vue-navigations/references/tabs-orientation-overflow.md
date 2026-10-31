# Tab Orientation & Overflow Handling

## Table of Contents
- [Header Position (Orientation)](#header-position-orientation)
- [Tab Overflow Modes](#tab-overflow-modes)
- [Responsive Configuration](#responsive-configuration)
- [Touch and Swipe Support](#touch-and-swipe-support)
- [Practical Examples](#practical-examples)

## Header Position (Orientation)

The `headerPlacement` property controls the position of the tab header relative to content. This determines the tab's orientation layout.

### Header Placement Options

| Position | Description | Use Case |
|----------|-------------|----------|
| `Top` | Headers above content (default) | Standard horizontal navigation |
| `Bottom` | Headers below content | Bottom navigation bar style |
| `Left` | Headers to the left of content | Vertical left sidebar navigation |
| `Right` | Headers to the right of content | Vertical right sidebar navigation |

### Top Placement (Default)

Headers appear above the content area.

```vue
<template>
  <ejs-tab headerPlacement="Top">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content for Tab 1 appears below</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content for Tab 2 appears below</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 3' }">
        <template #content>Content for Tab 3 appears below</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Standard web applications, dashboard layouts, wizard flows

### Bottom Placement

Headers appear below the content area.

```vue
<template>
  <ejs-tab headerPlacement="Bottom">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Home' }">
        <template #content>Home content displayed above tabs</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Search' }">
        <template #content>Search content displayed above tabs</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Profile' }">
        <template #content>Profile content displayed above tabs</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Mobile applications, bottom navigation patterns, reduced scroll friction

### Left Placement

Headers appear to the left of the content area in a vertical sidebar.

```vue
<template>
  <ejs-tab headerPlacement="Left" style="height: 400px">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Account' }">
        <template #content>Account settings and profile information</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Security' }">
        <template #content>Security settings and two-factor authentication</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Preferences' }">
        <template #content>User preferences and notification settings</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Billing' }">
        <template #content>Billing history and payment methods</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Settings panels, documentation sidebars, context-specific navigation

### Right Placement

Headers appear to the right of the content area in a vertical sidebar.

```vue
<template>
  <ejs-tab headerPlacement="Right" style="height: 400px">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Content' }">
        <template #content>Main content area with navigation on right</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Details' }">
        <template #content>Additional details displayed here</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Related' }">
        <template #content>Related items and suggestions</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Right-to-left languages (RTL), side information panels, advanced controls

## Tab Overflow Modes

When there are many tabs and insufficient space, the `overflowMode` property controls how to handle overflow.

### Overflow Mode Options

| Mode | Description | Behavior |
|------|-------------|----------|
| `Scrollable` | Adds scroll buttons to navigate tabs | Horizontal scrolling with arrow buttons |
| `Popup` | Shows dropdown with hidden tabs | Click dropdown to select hidden tabs |

### Scrollable Mode (Default)

Adds navigation arrows at the ends of the tab header to scroll through tabs.

```vue
<template>
  <ejs-tab overflowMode="Scrollable" style="width: 400px">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Content 1</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>Content 2</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 3' }">
        <template #content>Content 3</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 4' }">
        <template #content>Content 4</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 5' }">
        <template #content>Content 5</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 6' }">
        <template #content>Content 6</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 7' }">
        <template #content>Content 7</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Horizontal scrolling interfaces, browser-like tab bars, when tabs are frequently added/removed

### Popup Mode

Shows a dropdown button with hidden tabs when overflow occurs.

```vue
<template>
  <ejs-tab overflowMode="Popup" style="width: 400px">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Dashboard' }">
        <template #content>Dashboard content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Analytics' }">
        <template #content>Analytics content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Reports' }">
        <template #content>Reports content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Users' }">
        <template #content>Users content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Settings' }">
        <template #content>Settings content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Help' }">
        <template #content>Help content</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Compact interfaces, mobile layouts, when space is limited

## Responsive Configuration

### Dynamic Width Control

Adjust tab width reactively based on viewport size:

```vue
<template>
  <div>
    <p>Current width: {{ tabWidth }}px</p>
    <ejs-tab :width="tabWidth">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Responsive' }">
          <template #content>Tab width adjusts with screen size</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Adaptive' }">
          <template #content>Automatically adapts to container</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabWidth = ref(window.innerWidth * 0.9);

const handleResize = () => {
  tabWidth.value = window.innerWidth * 0.9;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
```

### Height Management

Set fixed or flexible height for tab content:

```vue
<template>
  <ejs-tab height="500px">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Fixed Height' }">
        <template #content>
          <p>This content area has a fixed height of 500px</p>
          <p>Content can scroll if it exceeds the height</p>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Another Tab' }">
        <template #content>Another tab with same height</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Mobile-Responsive Setup

```vue
<template>
  <ejs-tab 
    :headerPlacement="isMobile ? 'Bottom' : 'Top'"
    :overflowMode="isMobile ? 'Popup' : 'Scrollable'"
    :height="isMobile ? 'auto' : '400px'"
  >
    <e-tab-items>
      <e-tab-item :header="{ text: 'Home' }">
        <template #content>Mobile-optimized content</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Search' }">
        <template #content>Search interface</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Profile' }">
        <template #content>User profile section</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const isMobile = ref(window.innerWidth <= 768);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>
```

## Touch and Swipe Support

### Enable Touch Swipe Navigation

By default, touch swipe is supported on mobile devices. Users can swipe left/right to navigate tabs.

```vue
<template>
  <ejs-tab style="touch-action: pan-y">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Swipe Left' }">
        <template #content>Swipe left to see next tab</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Swipe Right' }">
        <template #content>Swipe right to go back</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Mobile Touch' }">
        <template #content>Touch-friendly interface</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Track Swipe Events

```vue
<template>
  <div>
    <p>Last swipe direction: {{ lastSwipeDirection }}</p>
    <ejs-tab @select="handleTabSelect">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>First tab content</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Second tab content</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Third tab content</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

let previousIndex = 0;
const lastSwipeDirection = ref('');

const handleTabSelect = (args) => {
  if (args.selectedIndex > previousIndex) {
    lastSwipeDirection.value = 'Right (forward)';
  } else if (args.selectedIndex < previousIndex) {
    lastSwipeDirection.value = 'Left (backward)';
  }
  previousIndex = args.selectedIndex;
};
</script>
```

## Practical Examples

### Example 1: Settings Panel with Vertical Navigation

```vue
<template>
  <div class="settings-container">
    <h1>Account Settings</h1>
    <ejs-tab headerPlacement="Left" style="height: 500px">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Profile', iconCss: 'e-icons e-user' }">
          <template #content>
            <div class="setting-section">
              <h3>Profile Information</h3>
              <p>Edit your profile details</p>
            </div>
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Security', iconCss: 'e-icons e-lock' }">
          <template #content>
            <div class="setting-section">
              <h3>Security Settings</h3>
              <p>Manage password and two-factor authentication</p>
            </div>
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Privacy', iconCss: 'e-icons e-eye-off' }">
          <template #content>
            <div class="setting-section">
              <h3>Privacy Controls</h3>
              <p>Control who can see your information</p>
            </div>
          </template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Notifications', iconCss: 'e-icons e-bell' }">
          <template #content>
            <div class="setting-section">
              <h3>Notification Preferences</h3>
              <p>Choose how and when to receive notifications</p>
            </div>
          </template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
.settings-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
}

.setting-section {
  padding: 20px;
}
</style>
```

### Example 2: Mobile Bottom Navigation

```vue
<template>
  <ejs-tab headerPlacement="Bottom" overflowMode="Popup">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Home', iconCss: 'e-icons e-home', iconPosition: 'Top' }">
        <template #content>
          <div class="mobile-content">
            <h2>Home Feed</h2>
            <p>Latest updates and news</p>
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Search', iconCss: 'e-icons e-search', iconPosition: 'Top' }">
        <template #content>
          <div class="mobile-content">
            <h2>Search</h2>
            <p>Find products and content</p>
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Cart', iconCss: 'e-icons e-cart', iconPosition: 'Top' }">
        <template #content>
          <div class="mobile-content">
            <h2>Shopping Cart</h2>
            <p>Your items: 0</p>
          </div>
        </template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Account', iconCss: 'e-icons e-user', iconPosition: 'Top' }">
        <template #content>
          <div class="mobile-content">
            <h2>My Account</h2>
            <p>Profile and settings</p>
          </div>
        </template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
:deep(.e-tab) {
  height: 100vh;
}

.mobile-content {
  padding: 20px;
  text-align: center;
}
</style>
```

### Example 3: Many Tabs with Smart Overflow

```vue
<template>
  <ejs-tab overflowMode="Popup" style="width: 600px">
    <e-tab-items>
      <e-tab-item 
        v-for="(tab, index) in tabs" 
        :key="index"
        :header="{ text: tab }"
      >
        <template #content>{{ tab }} content area</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabs = ref([
  'Dashboard', 'Analytics', 'Reports', 'Users', 'Settings',
  'Help', 'Feedback', 'Logout', 'Notifications', 'Documents'
]);
</script>
```

## Best Practices

1. **Choose appropriate orientation**: Use Top/Bottom for horizontal layouts, Left/Right for vertical layouts
2. **Select overflow mode wisely**: Scrollable for many sequential tabs, Popup for compact interfaces
3. **Mobile optimization**: Use Bottom placement and Popup mode on mobile devices
4. **Touch support**: Test swipe gestures on actual devices before deployment
5. **Set appropriate heights**: Use fixed height for content sections to prevent layout shifts
6. **Responsive breakpoints**: Adjust orientation and overflow based on screen size
7. **Touch targets**: Ensure tab headers are at least 44px for mobile accessibility
