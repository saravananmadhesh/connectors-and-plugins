# Sizing and Colors in Angular AppBar

## Table of Contents
- [Overview](#overview)
- [Size Modes](#size-modes)
  - [Regular AppBar](#regular-appbar)
  - [Prominent AppBar](#prominent-appbar)
  - [Dense AppBar](#dense-appbar)
- [Color Modes](#color-modes)
  - [Light AppBar](#light-appbar)
  - [Dark AppBar](#dark-appbar)
  - [Primary AppBar](#primary-appbar)
  - [Inherit AppBar](#inherit-appbar)
- [Combining Sizes and Colors](#combining-sizes-and-colors)
- [Property Reference](#property-reference)

## Overview

The Syncfusion Angular AppBar provides flexible sizing and color customization options through the `mode` and `colorMode` properties. These properties allow developers to create AppBars that fit various design requirements and application contexts.

## Size Modes

The AppBar supports three distinct size modes controlled by the `mode` property. Use the appropriate mode to match your design and content requirements.

### Regular AppBar

The Regular mode is the default and displays the AppBar with standard height. This is suitable for most applications and provides a balanced appearance for icons, text, and buttons.

**Default height:** ~56px (varies by theme)

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
        <span class="regular">Regular AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Prominent AppBar

The Prominent mode displays the AppBar with increased height, providing more space for larger titles, images, or additional content. This mode is useful for applications requiring more visual prominence for headers.

**Default height:** ~128px (varies by theme)

To enable Prominent mode, set the `mode` property to `"Prominent"`:

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
      <ejs-appbar colorMode="Primary" mode="Prominent" cssClass="prominent-appbar">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <span class="prominent">AppBar Component with Prominent mode</span>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### CSS Customization for Prominent AppBar

When using Prominent mode with large titles or images, you may need to customize the AppBar height and text alignment:

```css
/* Adjust prominent AppBar height */
.prominent-appbar.e-appbar.e-prominent {
  height: 150px; /* Increase if needed for larger content */
}

/* Align text in prominent AppBar */
.prominent {
  align-self: center;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
}
```

### Dense AppBar

The Dense mode displays the AppBar with reduced height, creating a compact appearance. This is ideal for applications with space constraints or dense layouts.

**Default height:** ~48px (varies by theme)

To enable Dense mode, set the `mode` property to `"Dense"`:

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
      <ejs-appbar colorMode="Primary" mode="Dense">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <span class="dense">Dense AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Mode Property Reference

| Mode | Height | Use Case | Default |
|------|--------|----------|---------|
| Regular | ~56px | Balanced layout, most applications | ✓ |
| Prominent | ~128px | Large titles, emphasis, showcase | |
| Dense | ~48px | Compact layouts, space constraints | |

## Color Modes

The AppBar supports four color modes controlled by the `colorMode` property. These define the background and text colors of the AppBar.

### Light AppBar

The Light mode is the default color mode. It displays the AppBar with a light background and corresponding dark text/icons, making it suitable for bright interfaces.

**Characteristics:**
- Light background color
- Dark text and icons
- Good contrast for readability
- Professional, minimal appearance

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
      <ejs-appbar>
        <a href="https://www.syncfusion.com/angular-components" target="_blank" rel="noopener">
          <div class="syncfusion-logo"></div>
        </a>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button [isPrimary]="true">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Dark AppBar

The Dark mode displays the AppBar with a dark background and light text/icons. This is suitable for modern interfaces or dark theme applications.

To enable Dark mode, set the `colorMode` property to `"Dark"`:

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
      <ejs-appbar colorMode="Dark">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Primary AppBar

The Primary mode displays the AppBar with primary theme colors (typically brand colors). This is the most commonly used mode for application branding.

**Characteristics:**
- Brand primary color background
- Light/white text and icons
- Professional, branded appearance
- High visual impact

To enable Primary mode, set the `colorMode` property to `"Primary"`:

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
    </div>
  `,
})
export class AppComponent { }
```

### Inherit AppBar

The Inherit mode makes the AppBar inherit background and text colors from its parent element. This is useful for creating AppBars that blend seamlessly with custom backgrounds.

To enable Inherit mode, set the `colorMode` property to `"Inherit"`:

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <ejs-appbar colorMode="Inherit">
        <a href="https://www.syncfusion.com/angular-components" target="_blank" rel="noopener">
          <div class="syncfusion-logo"></div>
        </a>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button [isPrimary]="true">FREE TRIAL</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### ColorMode Property Reference

| Color Mode | Background | Text/Icons | Use Case | Default |
|-----------|-----------|-----------|----------|---------|
| Light | Light | Dark | Default, minimal theme | ✓ |
| Dark | Dark | Light | Modern, dark themes | |
| Primary | Primary brand color | Light/White | Branding, emphasis | |
| Inherit | Parent element | Parent element | Custom backgrounds | |

## Combining Sizes and Colors

The `mode` and `colorMode` properties can be combined to create various AppBar styles:

### Example: Regular + Primary

```typescript
<ejs-appbar mode="Regular" colorMode="Primary">
  <!-- Standard height with brand colors -->
</ejs-appbar>
```

### Example: Prominent + Dark

```typescript
<ejs-appbar mode="Prominent" colorMode="Dark">
  <!-- Large height with dark theme -->
</ejs-appbar>
```

### Example: Dense + Inherit

```typescript
<ejs-appbar mode="Dense" colorMode="Inherit">
  <!-- Compact size inheriting parent colors -->
</ejs-appbar>
```

### Complete Example with All Combinations

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
      <!-- Regular + Primary -->
      <ejs-appbar mode="Regular" colorMode="Primary">
        <span>Regular Primary AppBar</span>
      </ejs-appbar>

      <!-- Prominent + Dark -->
      <ejs-appbar mode="Prominent" colorMode="Dark">
        <span class="prominent-text">Prominent Dark AppBar</span>
      </ejs-appbar>

      <!-- Dense + Light -->
      <ejs-appbar mode="Dense" colorMode="Light">
        <span>Dense Light AppBar</span>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

## Property Reference

| Property | Type | Values | Default | Description |
|----------|------|--------|---------|-------------|
| `mode` | string | "Regular" \| "Prominent" \| "Dense" | "Regular" | Controls AppBar height |
| `colorMode` | string | "Light" \| "Dark" \| "Primary" \| "Inherit" | "Light" | Controls AppBar colors |

## CSS Classes for Sizing and Colors

The AppBar applies CSS classes based on mode and colorMode:

**Size Mode Classes:**
- `.e-appbar` - Base AppBar class
- `.e-appbar.e-regular` - Regular size
- `.e-appbar.e-prominent` - Prominent size
- `.e-appbar.e-dense` - Dense size

**Color Mode Classes:**
- `.e-appbar.e-light` - Light colors
- `.e-appbar.e-dark` - Dark colors
- `.e-appbar.e-primary` - Primary colors
- `.e-appbar.e-inherit` - Inherit colors

### Custom Styling Example

```css
/* Customize regular primary AppBar */
.e-appbar.e-regular.e-primary {
  padding: 12px 16px;
  /* Custom styles */
}

/* Customize prominent dark AppBar */
.e-appbar.e-prominent.e-dark {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Customize dense light AppBar */
.e-appbar.e-dense.e-light {
  border-bottom: 1px solid #e0e0e0;
}
```

## Best Practices

1. **Choose appropriate mode**: Regular for most cases, Prominent for emphasis, Dense for space constraints
2. **Use Primary color**: Most effective for branding and user recognition
3. **Maintain contrast**: Ensure text is readable on background (especially with Inherit mode)
4. **Consider content**: Prominent mode works better with larger titles or additional content
5. **Test responsiveness**: AppBar sizes may appear differently on mobile devices
6. **Combine consistently**: Use same mode/colorMode throughout application for consistency
