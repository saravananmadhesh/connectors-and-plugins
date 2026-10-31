# API Reference - Syncfusion Angular AppBar

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [CSS Classes](#css-classes)
- [HTML Elements](#html-elements)

---

## Properties

### position
**Type:** `"Top"` | `"Bottom"`  
**Default:** `"Top"`

Specifies the position of the AppBar on the page. The AppBar can be positioned at the top or bottom of the viewport.

**Example - Top Position:**
```typescript
<ejs-appbar position="Top" colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
</ejs-appbar>
```

**Example - Bottom Position:**
```typescript
<ejs-appbar position="Bottom" colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
</ejs-appbar>
```

---

### isSticky
**Type:** `boolean`  
**Default:** `false`

Defines whether the AppBar position is fixed while scrolling the page. When set to `true`, the AppBar remains visible at its position while the user scrolls through the page content.

**Example - Sticky AppBar:**
```typescript
<ejs-appbar [isSticky]="true" colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>My App</span>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit">Login</button>
</ejs-appbar>

<!-- Content that scrolls -->
<div class="page-content">
  <p>Scrollable content goes here...</p>
</div>
```

---

### mode
**Type:** `"Regular"` | `"Prominent"` | `"Dense"`  
**Default:** `"Regular"`

Specifies the height mode of the AppBar. Controls the overall appearance and available space for content:
- **Regular**: Standard height (~56px) - suitable for most applications
- **Prominent**: Larger height (~128px) - for emphasis, large titles, or images
- **Dense**: Compressed height (~48px) - for space-constrained layouts

**Example - Regular Mode (Default):**
```typescript
<ejs-appbar mode="Regular" colorMode="Primary">
  <span>Regular AppBar</span>
</ejs-appbar>
```

**Example - Prominent Mode:**
```typescript
<ejs-appbar mode="Prominent" colorMode="Primary">
  <span class="prominent-title">Prominent AppBar with Large Title</span>
</ejs-appbar>
```

**Example - Dense Mode:**
```typescript
<ejs-appbar mode="Dense" colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>Compact AppBar</span>
</ejs-appbar>
```

---

### colorMode
**Type:** `"Light"` | `"Dark"` | `"Primary"` | `"Inherit"`  
**Default:** `"Light"`

Specifies the color theme of the AppBar:
- **Light**: Light background with dark text - minimal, professional appearance
- **Dark**: Dark background with light text - modern, sleek appearance
- **Primary**: Primary brand color background with light text - branded, prominent
- **Inherit**: Inherits colors from parent element - useful for custom backgrounds

**Example - Light Mode (Default):**
```typescript
<ejs-appbar colorMode="Light">
  <button ejs-button cssClass="e-inherit">Navigation</button>
</ejs-appbar>
```

**Example - Dark Mode:**
```typescript
<ejs-appbar colorMode="Dark">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
</ejs-appbar>
```

**Example - Primary Mode:**
```typescript
<ejs-appbar colorMode="Primary">
  <span>Branded AppBar</span>
</ejs-appbar>
```

**Example - Inherit Mode:**
```typescript
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <ejs-appbar colorMode="Inherit">
    <button ejs-button cssClass="e-inherit">Custom Background</button>
  </ejs-appbar>
</div>
```

---

### cssClass
**Type:** `string`

Accepts single or multiple CSS classes (separated by spaces) for custom styling of the AppBar. Use this to apply application-specific styles without modifying component internals.

**Example - Single Class:**
```typescript
<ejs-appbar colorMode="Primary" cssClass="custom-appbar">
  <span>Styled AppBar</span>
</ejs-appbar>
```

CSS:
```css
.custom-appbar.e-appbar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 12px 24px;
}
```

**Example - Multiple Classes:**
```typescript
<ejs-appbar 
  colorMode="Primary" 
  cssClass="custom-appbar shadowed-appbar responsive-appbar">
  <span>Multi-classed AppBar</span>
</ejs-appbar>
```

CSS:
```css
.shadowed-appbar { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); }
.responsive-appbar { padding: 12px 8px; }

@media (min-width: 768px) {
  .responsive-appbar { padding: 16px 24px; }
}
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting the AppBar component's state between page reloads. When enabled, the component state is saved to browser localStorage and restored on subsequent visits.

**Example - With Persistence:**
```typescript
<ejs-appbar 
  colorMode="Primary" 
  [enablePersistence]="true">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
</ejs-appbar>
```

**Use Case:** Useful for remembering user preferences or AppBar state (though basic AppBar state is typically not heavily persisted).

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering the AppBar in right-to-left (RTL) direction. Set to `true` for languages that read right-to-left (Arabic, Hebrew, Urdu, etc.).

**Example - RTL Support:**
```typescript
<ejs-appbar 
  colorMode="Primary" 
  [enableRtl]="true">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>تطبيقي</span>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit">تسجيل الدخول</button>
</ejs-appbar>
```

CSS for RTL:
```css
.e-appbar[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

---

### htmlAttributes
**Type:** `Record<string, any>`

Accepts HTML attributes/custom attributes that will be applied directly to the AppBar DOM element. Useful for accessibility, data attributes, or custom properties.

**Example - With Accessibility Attributes:**
```typescript
<ejs-appbar 
  colorMode="Primary"
  aria-label="Main application header"
  role="banner"
  data-theme="primary">
  <button 
    ejs-button 
    cssClass="e-inherit" 
    aria-label="Open menu"
    iconCss="e-icons e-menu">
  </button>
</ejs-appbar>
```

**Example - With Custom Data Attributes:**
```typescript
<ejs-appbar 
  colorMode="Primary"
  [htmlAttributes]="{ 'data-section': 'header', 'data-tracked': 'true' }">
  <span>Tracked AppBar</span>
</ejs-appbar>
```

Component TypeScript:
```typescript
export class AppComponent {
  htmlAttrs = {
    'data-section': 'header',
    'data-tracked': 'true',
    'aria-label': 'Main navigation'
  };
}
```

---

### locale
**Type:** `string`  
**Default:** `"en-US"`

Overrides the global culture and localization value for this specific AppBar component. Set to different locale codes for multi-language support.

**Example - With Locale:**
```typescript
<ejs-appbar 
  colorMode="Primary" 
  locale="ar-AE">
  <span>معلومات المحلية</span>
</ejs-appbar>
```

**Supported Locales:**
- `en-US` (English - US, default)
- `ar-AE` (Arabic)
- `de-DE` (German)
- `fr-FR` (French)
- `ja-JP` (Japanese)
- `zh-CN` (Chinese Simplified)
- `es-ES` (Spanish)
- And many others supported by Angular i18n

---

## Events

### created
**Type:** `EmitType<Event>`

Triggered after the AppBar component is created and fully initialized.

**Usage:**
```typescript
<ejs-appbar 
  colorMode="Primary"
  (created)="onAppBarCreated()">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
</ejs-appbar>
```

Component TypeScript:
```typescript
export class AppComponent {
  onAppBarCreated() {
    console.log('AppBar component created');
    // Perform initialization tasks
  }
}
```

**Use Case:** Initialize event handlers, load dynamic content, or trigger parent component updates after the AppBar is ready.

---

### destroyed
**Type:** `EmitType<Event>`

Triggered when the AppBar component is destroyed or removed from the DOM.

**Usage:**
```typescript
<ejs-appbar 
  colorMode="Primary"
  (destroyed)="onAppBarDestroyed()">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
</ejs-appbar>
```

Component TypeScript:
```typescript
export class AppComponent {
  onAppBarDestroyed() {
    console.log('AppBar component destroyed');
    // Clean up resources, listeners, etc.
  }
}
```

**Use Case:** Clean up resources, remove event listeners, or save final state before the component is removed.

---

## CSS Classes

The AppBar component automatically applies CSS classes based on configuration. These classes can be targeted for custom styling.

### Base Classes
| Class | Applied When | Description |
|-------|--------------|-------------|
| `.e-appbar` | Always | Base AppBar container |

### Position Classes
| Class | Applied When | Description |
|-------|--------------|-------------|
| `.e-appbar.e-top` | position="Top" | Top positioned AppBar |
| `.e-appbar.e-bottom` | position="Bottom" | Bottom positioned AppBar |

### Mode Classes
| Class | Applied When | Description |
|-------|--------------|-------------|
| `.e-appbar.e-regular` | mode="Regular" | Regular height |
| `.e-appbar.e-prominent` | mode="Prominent" | Prominent (tall) height |
| `.e-appbar.e-dense` | mode="Dense" | Dense (compact) height |

### Color Classes
| Class | Applied When | Description |
|-------|--------------|-------------|
| `.e-appbar.e-light` | colorMode="Light" | Light color theme |
| `.e-appbar.e-dark` | colorMode="Dark" | Dark color theme |
| `.e-appbar.e-primary` | colorMode="Primary" | Primary color theme |
| `.e-appbar.e-inherit` | colorMode="Inherit" | Inherit from parent |

**CSS Customization Example:**
```css
/* Target prominent dark AppBar */
.e-appbar.e-prominent.e-dark {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Target regular primary AppBar */
.e-appbar.e-regular.e-primary {
  border-bottom: 2px solid #1976d2;
}

/* Target dense light AppBar */
.e-appbar.e-dense.e-light {
  border-bottom: 1px solid #e0e0e0;
}
```

---

## HTML Elements

### Spacer Element
**Class:** `.e-appbar-spacer`

Creates flexible spacing within the AppBar. Uses flexbox to distribute available space.

```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit">Left</button>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit">Right</button>
</ejs-appbar>
```

**CSS:**
```css
.e-appbar-spacer {
  flex: 1;
}
```

---

### Separator Element
**Class:** `.e-appbar-separator`

Displays a vertical line that visually groups or separates AppBar content.

```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-cut"></button>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-copy"></button>
  <div class="e-appbar-separator"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-paste"></button>
</ejs-appbar>
```

**CSS:**
```css
.e-appbar-separator {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 8px;
}
```

---

## Complete Property Reference Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | string | "Top" | Vertical position: "Top" \| "Bottom" |
| `isSticky` | boolean | false | Fixed position during scroll |
| `mode` | string | "Regular" | Height: "Regular" \| "Prominent" \| "Dense" |
| `colorMode` | string | "Light" | Theme: "Light" \| "Dark" \| "Primary" \| "Inherit" |
| `cssClass` | string | - | Custom CSS classes |
| `enablePersistence` | boolean | false | Persist state between reloads |
| `enableRtl` | boolean | false | Right-to-left support |
| `htmlAttributes` | Record | - | Custom HTML attributes |
| `locale` | string | "en-US" | Localization |

## Complete Events Reference Table

| Event | Trigger | Arguments |
|-------|---------|-----------|
| `created` | After component creation | `Event` |
| `destroyed` | On component destruction | `Event` |

---

## API Combinations

### Common Property Combinations

**Top Sticky Navigation:**
```typescript
<ejs-appbar 
  position="Top" 
  [isSticky]="true" 
  mode="Regular" 
  colorMode="Primary">
</ejs-appbar>
```

**Prominent Branded Header:**
```typescript
<ejs-appbar 
  mode="Prominent" 
  colorMode="Primary"
  cssClass="branded-header">
</ejs-appbar>
```

**Dense Dark Toolbar:**
```typescript
<ejs-appbar 
  mode="Dense" 
  colorMode="Dark"
  cssClass="toolbar">
</ejs-appbar>
```

**RTL-Enabled AppBar:**
```typescript
<ejs-appbar 
  [enableRtl]="true"
  locale="ar-AE"
  colorMode="Primary">
</ejs-appbar>
```

**Accessible Navigation:**
```typescript
<ejs-appbar 
  colorMode="Primary"
  role="banner"
  aria-label="Main navigation">
</ejs-appbar>
```

---

**Next:** Explore specific features in [Design Patterns](design-patterns.md) or [Styling and Customization](styling-and-customization.md).
