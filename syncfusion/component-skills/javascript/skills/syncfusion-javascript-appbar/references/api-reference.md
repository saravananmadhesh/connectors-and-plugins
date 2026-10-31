---
name: appbar-api-reference
description: Complete API reference for Syncfusion AppBar component including all properties, methods, and events with practical code examples
keywords: AppBar, API, Methods, Events, Properties, Events, Syncfusion EJ2
---

# AppBar API Reference

This comprehensive API reference documents all properties, methods, and events of the Syncfusion AppBar component with practical code examples.

## Table of Contents

- [Properties Overview](#properties-overview)
- [Methods](#methods)
  - [addEventListener](#addeventlistener)
  - [appendTo](#appendto)
  - [dataBind](#databind)
  - [destroy](#destroy)
  - [getRootElement](#getrootelement)
  - [refresh](#refresh)
  - [removeEventListener](#removeeventlistener)
  - [inject](#inject)
- [Events](#events)
  - [created](#created)
  - [destroyed](#destroyed)
- [State Persistence](#state-persistence-enablepersistence)
- [Internationalization & RTL Support](#internationalization--rtl-support)
  - [RTL Support](#rtl-support-enablertl)
  - [Locale Support](#locale-support-locale)
  - [Supported Locales](#supported-locales)
  - [Best Practices for RTL & i18n](#best-practices-for-rtl--i18n)
- [Complete Example](#complete-example-using-multiple-methods--events)

---

## Properties Overview

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `colorMode` | `AppBarColor` | `'Light'` | Color scheme: Light, Dark, Primary, Inherit |
| `cssClass` | `string` | `null` | Custom CSS classes for styling |
| `enablePersistence` | `boolean` | `false` | Persist component state between page reloads |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `htmlAttributes` | `Record` | `null` | Custom HTML attributes and ARIA labels |
| `isSticky` | `boolean` | `false` | Make AppBar sticky during scrolling |
| `locale` | `string` | `''` | Localization culture code |
| `mode` | `AppBarMode` | `'Regular'` | Height mode: Regular, Prominent, Dense |
| `position` | `AppBarPosition` | `'Top'` | Position: Top or Bottom |

For detailed property documentation, refer to:
- **Color Modes**: [color-and-theme-modes.md](./color-and-theme-modes.md)
- **Styling & CSS**: [styling-customization.md](./styling-customization.md)
- **Position & Sticky**: [positioning-and-sticky.md](./positioning-and-sticky.md)
- **Modes**: [size-and-height-modes.md](./size-and-height-modes.md)
- **State Persistence**: [See State Persistence section below](#state-persistence-enablepersistence)
- **Internationalization & RTL**: [See Internationalization & RTL section below](#internationalization--rtl-support)

---

## Methods

### addEventListener

Dynamically adds an event listener to the AppBar component.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `eventName` | `string` | Yes | Name of the event to listen to |
| `handler` | `Function` | Yes | Callback function to execute when event fires |

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark'
});
appBar.appendTo('#appbar');

// Add event listener dynamically
appBar.addEventListener('created', () => {
  console.log('AppBar created');
});

appBar.addEventListener('destroyed', () => {
  console.log('AppBar destroyed');
});
```

**Use Case:** Register event handlers after the component is created or conditionally based on user actions.

---

### appendTo

Appends the AppBar component to a specified target element in the DOM.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selector` | `string \| HTMLElement` | No | Target element (CSS selector string or HTMLElement) |

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

// Create AppBar
const appBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular'
});

// Append to specific container
appBar.appendTo('#app-container');

// Or append to existing element
const container = document.getElementById('navbar');
appBar.appendTo(container);
```

**Use Case:** Dynamically insert AppBar into the DOM after creation, useful for single-page applications.

---

### dataBind

Applies all pending property changes immediately and updates the component without waiting for the next render cycle.

**Parameters:** None

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Light',
  position: 'Top'
});
appBar.appendTo('#appbar');

// Update multiple properties
appBar.colorMode = 'Dark';
appBar.mode = 'Prominent';
appBar.isSticky = true;

// Apply changes immediately
appBar.dataBind();

console.log('AppBar updated:', appBar.colorMode, appBar.mode);
```

**Use Case:** Batch property updates and apply them all at once for better performance.

---

### destroy

Removes the AppBar component from the DOM and destroys all associated event listeners and resources.

**Parameters:** None

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Primary'
});
appBar.appendTo('#appbar');

// Perform operations...

// Clean up and remove component
appBar.destroy();

// AppBar is now removed from DOM and all events are cleaned up
console.log('AppBar destroyed');
```

**Use Case:** Clean up resources when unloading views in single-page applications or when dynamically removing the AppBar.

---

### getRootElement

Returns the root HTML element of the AppBar component.

**Parameters:** None

**Returns:** `HTMLElement` - The root AppBar container element

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  cssClass: 'custom-appbar'
});
appBar.appendTo('#appbar');

// Get the root element
const rootElement = appBar.getRootElement();

console.log('Root element:', rootElement);
console.log('CSS classes:', rootElement.classList);
console.log('Background color:', window.getComputedStyle(rootElement).backgroundColor);

// Apply additional styling
rootElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
```

**Use Case:** Access the DOM element for direct style manipulation, event delegation, or measuring dimensions.

---

### refresh

Applies all pending property changes and renders the component again.

**Parameters:** None

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Light',
  mode: 'Regular'
});
appBar.appendTo('#appbar');

// Change properties
appBar.colorMode = 'Dark';
appBar.mode = 'Prominent';
appBar.isSticky = true;

// Re-render component with all changes
appBar.refresh();

console.log('AppBar refreshed with new settings');
```

**Use Case:** Refresh the component view after making multiple property changes or after external CSS modifications.

---

### removeEventListener

Removes a previously registered event listener from the AppBar component.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `eventName` | `string` | Yes | Name of the event |
| `handler` | `Function` | Yes | Reference to the handler function to remove |

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark'
});
appBar.appendTo('#appbar');

// Define handler function
const onAppBarCreated = () => {
  console.log('AppBar was created');
};

// Add event listener
appBar.addEventListener('created', onAppBarCreated);

// Later, remove the event listener
appBar.removeEventListener('created', onAppBarCreated);

console.log('Event listener removed');
```

**Use Case:** Cleanup event handlers when they're no longer needed to prevent memory leaks.

---

### Inject

Dynamically injects required modules or services into the AppBar component.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `moduleList` | `Function[]` | Yes | Array of module/service functions to inject |

**Returns:** `void`

**Example:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { ServiceModule } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Primary'
});
appBar.appendTo('#appbar');

// Inject required modules
appBar.inject([ServiceModule]);

console.log('Modules injected successfully');
```

**Use Case:** Conditionally load feature modules or services based on user requirements or application state.

---

## Events

### created

Fired immediately after the AppBar component is created and initialized.

**Event Arguments:**
| Argument | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event |
| `type` | `string` | Type of event ('created', etc.) |

**Example - Basic Event Handling:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

const appBar = new AppBar({
  colorMode: 'Dark',
  mode: 'Regular',
  created: () => {
    console.log('✓ AppBar component created');
    // Initialize additional components or styles
    initializeAppBarContent();
  }
});

appBar.appendTo('#appbar');

function initializeAppBarContent() {
  const button = new Button({
    content: 'Action',
    cssClass: 'e-inherit'
  });
  button.appendTo('#appbar button');
}
```

**Example - Event Binding in HTML:**

```html
<div id="appbar"></div>
<script>
  const appBar = new ej.navigations.AppBar({
    colorMode: 'Primary',
    created: onAppBarCreated
  });
  appBar.appendTo('#appbar');

  function onAppBarCreated() {
    console.log('AppBar ready for interaction');
    document.getElementById('appbar').style.opacity = '1';
  }
</script>
```

**Example - Multiple Initialization Tasks:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { Menu } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  isSticky: true,
  created: async () => {
    // Task 1: Load user data
    const userData = await fetchUserData();
    
    // Task 2: Initialize nested components
    initializeMenuItems();
    
    // Task 3: Setup analytics
    trackAppBarLoad();
    
    // Task 4: Trigger UI animations
    showAppBar();
  }
});

appBar.appendTo('#appbar');

function initializeMenuItems() {
  const menu = new Menu({
    items: [
      { text: 'Home' },
      { text: 'About' },
      { text: 'Contact' }
    ]
  });
  menu.appendTo('#appbar-menu');
}

function showAppBar() {
  const element = appBar.getRootElement();
  element.classList.add('fade-in');
}
```

**Use Case:** 
- Initialize child components (Buttons, Menu, DropDownButton)
- Load configuration or user data
- Setup analytics or logging
- Apply initial animations or styles

---

### destroyed

Fired when the AppBar component is being destroyed or removed from the DOM.

**Event Arguments:**
| Argument | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the event |
| `type` | `string` | Type of event ('destroyed', etc.) |

**Example - Basic Cleanup:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  destroyed: () => {
    console.log('✓ AppBar component destroyed');
    // Cleanup resources
    cleanupAppBarResources();
  }
});

appBar.appendTo('#appbar');

function cleanupAppBarResources() {
  // Close any open menus
  // Unsubscribe from data services
  // Remove temporary event listeners
  console.log('Resources cleaned up');
}
```

**Example - SPA Page Transition:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

let currentAppBar: AppBar;

function navigateToPage(pageName: string) {
  // Destroy previous AppBar
  if (currentAppBar) {
    currentAppBar.destroyed = () => {
      console.log('Previous AppBar destroyed');
      loadPageAppBar(pageName);
    };
    currentAppBar.destroy();
  } else {
    loadPageAppBar(pageName);
  }
}

function loadPageAppBar(pageName: string) {
  currentAppBar = new AppBar({
    colorMode: pageName === 'admin' ? 'Primary' : 'Light',
    created: () => {
      console.log(`AppBar loaded for ${pageName}`);
    }
  });
  currentAppBar.appendTo('#appbar');
}
```

**Example - Resource Cleanup in Observable Pattern:**

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Subject } from 'rxjs';

class AppBarManager {
  private appBar: AppBar;
  private destroy$ = new Subject<void>();

  createAppBar() {
    this.appBar = new AppBar({
      colorMode: 'Dark',
      isSticky: true,
      destroyed: () => {
        console.log('AppBar destroyed - cleaning subscriptions');
        this.destroy$.next();
        this.destroy$.complete();
      }
    });
    this.appBar.appendTo('#appbar');
  }

  destroy() {
    this.appBar?.destroy();
  }
}
```

**Use Case:**
- Unsubscribe from data services
- Clean up event listeners
- Release memory resources
- Save component state (if enablePersistence is true)
- Handle page transitions in SPAs

---

---

## State Persistence (enablePersistence)

### Overview

The `enablePersistence` property enables automatic saving and restoration of the AppBar component's state across browser sessions. This is useful for maintaining user preferences like selected themes, modes, or positions.

**Property Details:**
- **Type:** `boolean`
- **Default:** `false`
- **Behavior:** When enabled, AppBar state is persisted to browser localStorage

### Basic Example - Enable Persistence

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  mode: 'Regular',
  position: 'Top',
  isSticky: true,
  enablePersistence: true,  // Enable state persistence
  created: () => {
    console.log('AppBar created - previous state restored if available');
  }
});

appBar.appendTo('#appbar');

// When user refreshes the page or returns later:
// ✓ colorMode remains 'Dark'
// ✓ mode remains 'Regular'
// ✓ isSticky remains true
// ✓ All other properties are restored
```

### Example - User Preference Management

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

class AppBarWithUserPreferences {
  private appBar: AppBar;

  initialize() {
    this.appBar = new AppBar({
      colorMode: 'Light',
      mode: 'Regular',
      enablePersistence: true,  // Persist across sessions
      created: () => this.setupThemeButtons()
    });

    this.appBar.appendTo('#appbar');
  }

  private setupThemeButtons() {
    // Create theme toggle buttons
    const lightBtn = new Button({
      content: '☀️ Light',
      cssClass: 'e-inherit',
      onClick: () => this.setTheme('Light')
    });
    lightBtn.appendTo('#btn-light');

    const darkBtn = new Button({
      content: '🌙 Dark',
      cssClass: 'e-inherit',
      onClick: () => this.setTheme('Dark')
    });
    darkBtn.appendTo('#btn-dark');

    const primaryBtn = new Button({
      content: '🎨 Primary',
      cssClass: 'e-inherit',
      onClick: () => this.setTheme('Primary')
    });
    primaryBtn.appendTo('#btn-primary');
  }

  private setTheme(theme: 'Light' | 'Dark' | 'Primary') {
    this.appBar.colorMode = theme;
    this.appBar.dataBind();
    console.log(`Theme changed to ${theme} and persisted`);
  }
}

// Usage
const appBarManager = new AppBarWithUserPreferences();
appBarManager.initialize();

// User's theme preference will be remembered on next visit
```

### Example - Persist Multiple Configurations

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  mode: 'Prominent',
  position: 'Top',
  isSticky: true,
  cssClass: 'my-appbar',
  enablePersistence: true,
  enableRtl: false,
  locale: 'en-US'
});

appBar.appendTo('#appbar');

// All properties are automatically persisted:
// localStorage.getItem('appBar') = {
//   "colorMode": "Dark",
//   "mode": "Prominent",
//   "position": "Top",
//   "isSticky": true,
//   "enableRtl": false,
//   "locale": "en-US"
// }
```

### Example - Manual State Save/Restore

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

class AppBarStateManager {
  private appBar: AppBar;
  private readonly STORAGE_KEY = 'appbar-state';

  initialize() {
    this.appBar = new AppBar({
      colorMode: 'Light',
      mode: 'Regular',
      enablePersistence: true
    });

    this.appBar.appendTo('#appbar');
  }

  // Manually save state
  saveState() {
    const state = {
      colorMode: this.appBar.colorMode,
      mode: this.appBar.mode,
      position: this.appBar.position,
      isSticky: this.appBar.isSticky,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    console.log('State saved:', state);
  }

  // Manually restore state
  restoreState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      this.appBar.colorMode = state.colorMode;
      this.appBar.mode = state.mode;
      this.appBar.position = state.position;
      this.appBar.isSticky = state.isSticky;
      this.appBar.dataBind();
      console.log('State restored:', state);
    }
  }

  // Clear saved state
  clearState() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('State cleared');
  }
}

// Usage
const stateManager = new AppBarStateManager();
stateManager.initialize();
stateManager.saveState();

// Later...
stateManager.restoreState();
stateManager.clearState();
```

### Best Practices

1. **Enable for User Preferences:** Use when AppBar configuration reflects user choices
2. **Combined with Events:** Use with `created` event to load custom data alongside persisted state
3. **Manual Override:** Use `refresh()` or `dataBind()` to update persisted state
4. **Clear on Logout:** Call `localStorage.removeItem()` when user logs out

---

## Internationalization & RTL Support

### Overview

AppBar supports both right-to-left (RTL) layout and internationalization (i18n) through the `enableRtl` and `locale` properties.

- **enableRtl:** Enables right-to-left text direction and layout mirroring
- **locale:** Sets the culture/language for internationalization

### RTL Support (enableRtl)

#### Basic RTL Example

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  mode: 'Regular',
  enableRtl: true,  // Enable right-to-left layout
  created: () => {
    console.log('AppBar configured for RTL languages');
  }
});

appBar.appendTo('#appbar');

// Result:
// ✓ Text flows right-to-left
// ✓ Layout is horizontally flipped
// ✓ Button groups align to right
// ✓ Spacing and padding mirrored
```

#### RTL with HTML Direction Attribute

```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>Arabic AppBar</title>
  <link href="styles.css" rel="stylesheet">
</head>
<body>
  <div id="appbar"></div>

  <script>
    const appBar = new ej.navigations.AppBar({
      colorMode: 'Primary',
      mode: 'Regular',
      enableRtl: true,
      created: function() {
        console.log('AppBar مجهز للغة العربية');
      }
    });
    appBar.appendTo('#appbar');
  </script>
</body>
</html>
```

#### RTL with TypeScript

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { Menu } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular',
  enableRtl: true,
  isSticky: true,
  created: () => {
    console.log('RTL AppBar with Menu initialized');
    initializeMenuWithRTL();
  }
});

appBar.appendTo('#appbar');

function initializeMenuWithRTL() {
  const menu = new Menu({
    items: [
      { text: 'الرئيسية' },           // Home in Arabic
      { text: 'حول' },                 // About
      { text: 'الخدمات' },             // Services
      { text: 'اتصل بنا' }             // Contact
    ],
    enableRtl: true
  });
  menu.appendTo('#appbar-menu');
}
```

#### RTL with CSS Flexbox Adjustment

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Dark',
  enableRtl: true,
  cssClass: 'appbar-rtl-custom'
});

appBar.appendTo('#appbar');

// CSS adjustments for RTL
const style = document.createElement('style');
style.textContent = `
  .appbar-rtl-custom {
    direction: rtl;
    text-align: right;
  }
  
  .appbar-rtl-custom .e-appbar-spacer {
    margin-left: 0;
    margin-right: auto;
  }
  
  .appbar-rtl-custom .e-btn {
    margin-left: 8px;
    margin-right: 0;
  }
`;
document.head.appendChild(style);
```

### Locale Support (locale)

#### Basic Locale Example

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Light',
  mode: 'Regular',
  locale: 'en-US',  // English (United States)
  created: () => {
    console.log('AppBar localized for en-US');
  }
});

appBar.appendTo('#appbar');
```

#### RTL + Locale Combination

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

// Arabic configuration
const arabicAppBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular',
  enableRtl: true,
  locale: 'ar-AE',  // Arabic (United Arab Emirates)
  created: () => {
    console.log('AppBar configured for Arabic');
  }
});
arabicAppBar.appendTo('#appbar-ar');

// Hebrew configuration
const hebrewAppBar = new AppBar({
  colorMode: 'Primary',
  mode: 'Regular',
  enableRtl: true,
  locale: 'he-IL',  // Hebrew (Israel)
  created: () => {
    console.log('AppBar configured for Hebrew');
  }
});
hebrewAppBar.appendTo('#appbar-he');

// English configuration
const englishAppBar = new AppBar({
  colorMode: 'Light',
  mode: 'Regular',
  enableRtl: false,
  locale: 'en-US',
  created: () => {
    console.log('AppBar configured for English');
  }
});
englishAppBar.appendTo('#appbar-en');
```

#### Language Switcher Example

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

class MultiLanguageAppBar {
  private appBar: AppBar;
  private currentLocale: string = 'en-US';

  initialize() {
    this.appBar = new AppBar({
      colorMode: 'Dark',
      mode: 'Regular',
      locale: this.currentLocale,
      created: () => this.setupLanguageSwitcher()
    });

    this.appBar.appendTo('#appbar');
  }

  private setupLanguageSwitcher() {
    const items = [
      { text: 'English', id: 'en-US' },
      { text: 'العربية', id: 'ar-AE' },
      { text: 'עברית', id: 'he-IL' },
      { text: 'Français', id: 'fr-FR' },
      { text: '日本語', id: 'ja-JP' }
    ];

    const langDropdown = new DropDownButton({
      items: items,
      content: '🌐 Language',
      cssClass: 'e-inherit',
      select: (args: any) => this.switchLanguage(args.item.id)
    });

    langDropdown.appendTo('#language-selector');
  }

  private switchLanguage(locale: string) {
    this.currentLocale = locale;
    this.appBar.locale = locale;
    
    // Enable RTL for RTL languages
    const rtlLanguages = ['ar-AE', 'he-IL'];
    this.appBar.enableRtl = rtlLanguages.includes(locale);
    
    this.appBar.dataBind();
    console.log(`Language switched to ${locale}`);
    
    // Update HTML direction
    document.documentElement.dir = this.appBar.enableRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }

  getCurrentLocale() {
    return this.currentLocale;
  }
}

// Usage
const multiLangAppBar = new MultiLanguageAppBar();
multiLangAppBar.initialize();
```

#### Locale with Persistence

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';

const appBar = new AppBar({
  colorMode: 'Light',
  mode: 'Regular',
  locale: 'en-US',
  enablePersistence: true,  // Persist locale selection
  created: () => {
    const savedLocale = localStorage.getItem('user-locale');
    if (savedLocale) {
      appBar.locale = savedLocale;
      const rtlLocales = ['ar-AE', 'he-IL', 'ur-PK'];
      appBar.enableRtl = rtlLocales.includes(savedLocale);
      appBar.dataBind();
      console.log(`Restored locale: ${savedLocale}`);
    }
  }
});

appBar.appendTo('#appbar');

// Save locale preference
function setUserLocale(locale: string) {
  localStorage.setItem('user-locale', locale);
  appBar.locale = locale;
  appBar.dataBind();
}
```

### Supported Locales

| Locale Code | Language | Region | RTL |
|-------------|----------|--------|-----|
| `en-US` | English | United States | ❌ |
| `en-GB` | English | United Kingdom | ❌ |
| `de-DE` | German | Germany | ❌ |
| `fr-FR` | French | France | ❌ |
| `ja-JP` | Japanese | Japan | ❌ |
| `zh-CN` | Chinese | China | ❌ |
| `ar-AE` | Arabic | United Arab Emirates | ✅ |
| `ar-SA` | Arabic | Saudi Arabia | ✅ |
| `he-IL` | Hebrew | Israel | ✅ |
| `ur-PK` | Urdu | Pakistan | ✅ |

### Best Practices for RTL & i18n

1. **Always set `dir` attribute** on HTML element for RTL:
   ```html
   <html dir="rtl" lang="ar">
   ```

2. **Use locale codes** in IETF format (e.g., `ar-AE` not just `ar`)

3. **Test both LTR and RTL** layouts before deployment

4. **Combine enableRtl with locale:**
   ```typescript
   if (locale.startsWith('ar') || locale.startsWith('he')) {
     appBar.enableRtl = true;
   }
   ```

5. **Use CSS logical properties** for better i18n support:
   ```css
   /* Instead of: margin-left, margin-right */
   margin-inline-start: 1rem;
   margin-inline-end: 1rem;
   ```

---

## Complete Example: Using Multiple Methods & Events

```typescript
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

class AppBarManager {
  private appBar: AppBar;

  initialize() {
    // Create AppBar with event handlers
    this.appBar = new AppBar({
      colorMode: 'Primary',
      mode: 'Regular',
      isSticky: true,
      enablePersistence: true,
      enableRtl: false,
      locale: 'en-US',
      created: () => this.onAppBarCreated(),
      destroyed: () => this.onAppBarDestroyed()
    });

    // Append to DOM
    this.appBar.appendTo('#app-navbar');

    // Add dynamic event listener
    this.appBar.addEventListener('created', () => {
      console.log('Dynamic listener: AppBar ready');
    });
  }

  private onAppBarCreated() {
    console.log('AppBar initialized');
    this.initializeButtons();
  }

  private initializeButtons() {
    const btn = new Button({
      content: 'Menu',
      cssClass: 'e-inherit'
    });
    btn.appendTo('#appbar-menu-btn');
  }

  updateAppBar(colorMode: string, mode: string) {
    // Update properties
    this.appBar.colorMode = colorMode as any;
    this.appBar.mode = mode as any;
    
    // Apply changes immediately
    this.appBar.dataBind();
  }

  refreshView() {
    this.appBar.refresh();
  }

  getAppBarElement() {
    return this.appBar.getRootElement();
  }

  cleanup() {
    // Remove event listener
    this.appBar.removeEventListener('created', this.onAppBarCreated);
    
    // Destroy component
    this.appBar.destroy();
  }

  private onAppBarDestroyed() {
    console.log('AppBar destroyed');
  }
}

// Usage
const manager = new AppBarManager();
manager.initialize();

// Later...
manager.updateAppBar('Dark', 'Prominent');
manager.refreshView();
manager.cleanup();
```

---

## Related Documentation

For more information about specific features:

- **Basic Setup**: [getting-started.md](./getting-started.md)
- **Positioning**: [positioning-and-sticky.md](./positioning-and-sticky.md)
- **Styling**: [styling-customization.md](./styling-customization.md)
- **Colors**: [color-and-theme-modes.md](./color-and-theme-modes.md)
- **Modes**: [size-and-height-modes.md](./size-and-height-modes.md)
- **Layout Patterns**: [layout-patterns-and-design.md](./layout-patterns-and-design.md)
- **Best Practices**: [best-practices-and-accessibility.md](./best-practices-and-accessibility.md)

---

## Event Flow Diagram

```
Component Lifecycle:
┌─────────────────────────────────────────────────────────┐
│ 1. new AppBar({...}) - Constructor                      │
│    ↓                                                     │
│ 2. appendTo() - Add to DOM                              │
│    ↓                                                     │
│ 3. ✅ 'created' Event Fires                             │
│    ├─ addEventListener() - Add dynamic listeners        │
│    ├─ Property access (.colorMode, .mode, etc)          │
│    ├─ Method calls (getRootElement, refresh, etc)       │
│    ├─ dataBind() - Apply batch updates                  │
│    └─ removeEventListener() - Clean listeners            │
│    ↓                                                     │
│ 4. destroy() - Remove component                         │
│    ↓                                                     │
│ 5. ✅ 'destroyed' Event Fires                           │
│    └─ Cleanup complete                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Event Emission Order

When you create an AppBar with both events:

```typescript
const appBar = new AppBar({
  created: () => console.log('Event 1: created'),
  destroyed: () => console.log('Event 2: destroyed')
});
appBar.appendTo('#appbar');
// Output: "Event 1: created"

// ... later ...

appBar.destroy();
// Output: "Event 2: destroyed"
```

---

## API Property Type Reference

**AppBarColor Enum:**
```typescript
type AppBarColor = 'Light' | 'Dark' | 'Primary' | 'Inherit';
```

**AppBarMode Enum:**
```typescript
type AppBarMode = 'Regular' | 'Prominent' | 'Dense';
```

**AppBarPosition Enum:**
```typescript
type AppBarPosition = 'Top' | 'Bottom';
```

**htmlAttributes Type:**
```typescript
interface HtmlAttributes {
  [key: string]: string | number | boolean;
  // Examples:
  // 'aria-label': 'Application navigation bar'
  // 'data-test-id': 'appbar-main'
  // 'role': 'navigation'
}
```

---

## Performance Tips

1. **Use `dataBind()` for batch updates** instead of multiple refresh calls
2. **Remove unused event listeners** with `removeEventListener()` to prevent memory leaks
3. **Call `destroy()`** explicitly when removing AppBar to clean resources
4. **Use `getRootElement()`** for DOM queries instead of jQuery selections
5. **Enable `enablePersistence`** to maintain state across page reloads

---

Last Updated: 2026-04-07
Documentation Version: 1.0
Component Version: @syncfusion/ej2-navigations@32.1.19+
