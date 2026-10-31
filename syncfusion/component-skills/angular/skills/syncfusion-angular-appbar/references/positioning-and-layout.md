# Positioning and Layout in Angular AppBar

## Table of Contents
- [Positioning Overview](#positioning-overview)
- [Top AppBar](#top-appbar)
- [Bottom AppBar](#bottom-appbar)
- [Sticky AppBar](#sticky-appbar)
- [Position Property Reference](#position-property-reference)

## Positioning Overview

The AppBar component supports three positioning options controlled by the `position` and `isSticky` properties:

1. **Top AppBar** (default) - Appears at the top of the page
2. **Bottom AppBar** - Appears at the bottom of the page
3. **Sticky AppBar** - Remains visible while scrolling

Use positioning to determine where the AppBar is displayed in your application layout.

## Top AppBar

The Top AppBar is the default positioning option and places the AppBar at the top of the page content. This is ideal for primary navigation, branding, and application actions.

### Basic Top AppBar Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
      <div class="appbar-content" style="font-size: 12px">
        <p>
          The AppBar also known as action bar or nav bar displays information and actions 
          related to the current application screen. It is used to show branding, screen titles, 
          navigation, and actions.
        </p>
      </div>
    </div>
  `,
})
export class AppComponent { }
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### When to Use Top AppBar

- Primary application navigation
- Main application header and branding
- Top-level menu and actions
- Most common application layout pattern
- Mobile-friendly navigation (default behavior)

## Bottom AppBar

The Bottom AppBar positioning places the AppBar at the bottom of the page content. This layout is useful for mobile applications, bottom navigation patterns, and action toolbars.

### Basic Bottom AppBar Example

To create a Bottom AppBar, set the `position` property to `"Bottom"`:

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary" position="Bottom">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
      <div class="appbar-content" style="font-size: 12px">
        <p>
          The AppBar also known as action bar or nav bar displays information and actions 
          related to the current application screen. The bottom positioned AppBar is useful 
          for mobile navigation patterns.
        </p>
      </div>
    </div>
  `,
})
export class AppComponent { }
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### CSS for Bottom AppBar Layout

When using a Bottom AppBar, ensure your page layout has bottom margin or padding to accommodate it:

```css
body {
  margin: 0;
  padding: 0;
}

.control-container {
  min-height: 100vh;
  padding-bottom: 60px; /* Height for bottom AppBar */
}
```

### When to Use Bottom AppBar

- Mobile application bottom navigation
- Secondary action bar
- Material Design bottom navigation pattern
- Touch-friendly interface for mobile users
- Action sheets and quick actions at bottom

## Sticky AppBar

The Sticky AppBar positioning makes the AppBar remain visible while scrolling through page content. This is controlled by the `isSticky` property set to `true`.

### Basic Sticky AppBar Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary" [isSticky]="true">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
      <div class="appbar-content" style="font-size: 12px">
        <p>
          The AppBar also known as action bar or nav bar displays information and actions 
          related to the current application screen. It is used to show branding, screen titles, 
          navigation, and actions. The AppBar will be sticky while scrolling the AppBar content.
        </p>
        <p>
          Scroll down to see the sticky behavior. The AppBar remains visible at the top while 
          you scroll through the content.
        </p>
        <!-- Add content that causes scrolling -->
        <p>Additional content to demonstrate scrolling...</p>
        <p>More content here...</p>
        <p>And more content here...</p>
      </div>
    </div>
  `,
})
export class AppComponent { }
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### CSS for Sticky AppBar

The sticky behavior is handled by the component, but you may want to add overflow handling:

```css
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.control-container {
  position: relative;
  overflow-y: auto;
}
```

### When to Use Sticky AppBar

- Navigation should always be accessible
- Important actions need constant visibility
- Long scrolling content pages
- Dashboard layouts with persistent header
- Document viewers or content-heavy applications

## Position Property Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | "Top" \| "Bottom" | "Top" | Vertical position of the AppBar |
| `isSticky` | boolean | false | Makes AppBar sticky during scroll |

### Property Usage Examples

**Top Position (default):**
```typescript
<ejs-appbar position="Top">
  <!-- content -->
</ejs-appbar>
```

**Bottom Position:**
```typescript
<ejs-appbar position="Bottom">
  <!-- content -->
</ejs-appbar>
```

**Sticky at Top:**
```typescript
<ejs-appbar [isSticky]="true">
  <!-- content -->
</ejs-appbar>
```

**Sticky at Bottom:**
```typescript
<ejs-appbar position="Bottom" [isSticky]="true">
  <!-- content -->
</ejs-appbar>
```

## Combining Positions with Other Properties

Positions work with other AppBar properties for complete control:

### Top Position with Size Mode

```typescript
<ejs-appbar position="Top" mode="Prominent" colorMode="Primary">
  <!-- Creates a tall primary AppBar at top -->
</ejs-appbar>
```

### Bottom Position with Dense Mode

```typescript
<ejs-appbar position="Bottom" mode="Dense" colorMode="Dark">
  <!-- Creates a compact dark AppBar at bottom -->
</ejs-appbar>
```

### Sticky Prominent AppBar

```typescript
<ejs-appbar [isSticky]="true" mode="Prominent" colorMode="Primary">
  <!-- Creates a tall sticky AppBar at top -->
</ejs-appbar>
```

## Layout Considerations

### Fixed vs Absolute Positioning

By default, the sticky AppBar uses CSS `position: fixed` for sticky behavior. This:
- Takes the AppBar out of the normal document flow
- Makes it overlay on top of content
- Requires bottom/top margin on content to prevent overlap

### Content Layout with AppBar

When using AppBar, plan your content layout:

```css
/* For top AppBar */
body {
  padding-top: 60px; /* Adjust based on AppBar height */
}

/* For bottom AppBar */
body {
  padding-bottom: 60px; /* Adjust based on AppBar height */
}

/* For sticky AppBar */
/* Use margin to create space automatically */
```

## Common Patterns

### Pattern 1: Top Navigation with Sticky Behavior

```typescript
<ejs-appbar colorMode="Primary" [isSticky]="true">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>MyApp</span>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit">Settings</button>
</ejs-appbar>
```

### Pattern 2: Bottom Mobile Navigation

```typescript
<ejs-appbar position="Bottom" mode="Dense" colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-search"></button>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></button>
</ejs-appbar>
```

## Troubleshooting

**Sticky AppBar not working:**
- Verify `isSticky` property is set to `true`
- Check for overflow properties on parent containers that prevent fixed positioning

**Content overlapping AppBar:**
- Add margin/padding to body or container equal to AppBar height
- Use developer tools to inspect AppBar height

**Bottom AppBar at wrong position:**
- Verify `position="Bottom"` property is set
- Check CSS for conflicting positioning rules
