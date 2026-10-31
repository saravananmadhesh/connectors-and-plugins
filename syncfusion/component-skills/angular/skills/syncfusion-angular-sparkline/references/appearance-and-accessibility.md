# Appearance and Accessibility

## Table of Contents

- [Customizing Sparkline Appearance](#customizing-sparkline-appearance)
  - [Changing Colors Dynamically](#changing-colors-dynamically)
  - [CSS Classes for Styling](#css-classes-for-styling)
  - [Responsive Design](#responsive-design)
- [Localization](#localization)
  - [Changing Locale](#changing-locale)
  - [Supported Locales](#supported-locales)
  - [Custom Locale Strings](#custom-locale-strings)
- [Dark Mode Support](#dark-mode-support)
  - [Implementing Dark Theme](#implementing-dark-theme)
  - [CSS Variables for Themes](#css-variables-for-themes)
- [Real-World Examples](#real-world-examples)
  - [Dashboard with Theme Switching](#dashboard-with-theme-switching)
- [Testing for Accessibility](#testing-for-accessibility)
  - [Chrome DevTools Audit](#chrome-devtools-audit)
  - [Screen Reader Testing](#screen-reader-testing)
  - [Keyboard Navigation Testing](#keyboard-navigation-testing)
- [Best Practices](#best-practices)

## Customizing Sparkline Appearance

### Changing Colors Dynamically

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Column"
    [fill]="'#FF6B6B'"
    [border]="{ color: '#C92A2A', width: 2 }">
  </ejs-sparkline>`
})
export class ColoredSparklineComponent {
  data = [10, 25, 15, 30, 20]
}
```

### CSS Classes for Styling

Add custom CSS classes to style sparklines:

```typescript
@Component({
  template: `<ejs-sparkline 
    id="sparkline-1"
    [dataSource]="data"
    type="Area"
    class="custom-sparkline">
  </ejs-sparkline>`
})
export class CustomStyleComponent {
  data = [10, 25, 15, 30, 20]
}
```

```css
/* styles.css */
.custom-sparkline {
  background-color: #F5F5F5;
  border: 1px solid #DDD;
  border-radius: 4px;
  padding: 8px;
}

#sparkline-1 svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
```

### Responsive Design

Make sparklines adapt to different screen sizes:

```typescript
@Component({
  template: `<div class="sparkline-container">
    <ejs-sparkline 
      [dataSource]="data"
      [height]="containerHeight"
      [width]="containerWidth">
    </ejs-sparkline>
  </div>`
})
export class ResponsiveSparklineComponent {
  data = [10, 25, 15, 30, 20]
  containerHeight = '100px'
  containerWidth = '100%'
  
  constructor() {
    this.updateSizeForScreen()
    window.addEventListener('resize', () => this.updateSizeForScreen())
  }
  
  updateSizeForScreen() {
    const width = window.innerWidth
    if (width < 768) {
      this.containerHeight = '80px'
    } else if (width < 1024) {
      this.containerHeight = '100px'
    } else {
      this.containerHeight = '120px'
    }
  }
}
```

## Localization

### Changing Locale

Configure locale-specific formatting:

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';
import { setLocale } from '@syncfusion/ej2-base'

@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    xName="date"
    yName="value"
    valueType="Category"
    [dataSource]="data"
    [locale]="'fr-FR'">
  </ejs-sparkline>`
})
export class LocalizedSparklineComponent {
      data = [
        { date: 'Jan', value: 100 },
        { date: 'Fev', value: 150 },
        { date: 'Mar', value: 120 }
      ]

}
```

### Supported Locales

- `en-US` - English (US)
- `en-GB` - English (GB)
- `de-DE` - German
- `fr-FR` - French
- `es-ES` - Spanish
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- `ar-SA` - Arabic
- `he-IL` - Hebrew

### Custom Locale Strings

Create custom locale definitions:

```typescript
import { L10n } from '@syncfusion/ej2-base'

L10n.load({
  'custom-locale': {
    'sparkline': {
      'tooltip': 'Valeur: ${y}',
      'label': '${x}: ${y}'
    }
  }
})
```

## Dark Mode Support

### Implementing Dark Theme

```typescript
@Component({
  selector: 'app-root',
  template: `<div [ngClass]="{ dark: isDarkMode }">
    <button (click)="toggleDarkMode()">Toggle Theme</button>
    <ejs-sparkline 
      [dataSource]="data"
      [fill]="isDarkMode ? '#BB86FC' : '#6200EE'">
    </ejs-sparkline>
  </div>`,
  styles: [`
    :host.dark {
      background-color: #121212;
      color: #FFFFFF;
    }
    
    :host.dark ::ng-deep .e-sparkline {
      background-color: #1E1E1E;
    }
  `]
})
export class DarkModeComponent {
  isDarkMode = false
  data = [10, 25, 15, 30, 20]
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
  }
}
```

### CSS Variables for Themes

Use CSS custom properties for theme switching:

```css
:root {
  --sparkline-fill: #6200EE;
  --sparkline-bg: #FFFFFF;
  --sparkline-text: #000000;
}

[data-theme="dark"] {
  --sparkline-fill: #BB86FC;
  --sparkline-bg: #121212;
  --sparkline-text: #FFFFFF;
}

.custom-sparkline {
  background-color: var(--sparkline-bg);
  color: var(--sparkline-text);
}
```

## Real-World Examples

### Dashboard with Theme Switching

```typescript
@Component({
  imports: [SparklineModule, CommonModule],
  standalone: true,
  template: `<div class="dashboard" [ngClass]="{ dark: isDarkMode }">
    <div class="theme-toggle">
      <button (click)="toggleTheme()">
        {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>
    <div class="metrics">
      <div class="metric-card">
        <h3>Users</h3>
        <ejs-sparkline 
          [dataSource]="userData"
          type="Column"
          [fill]="sparklineFill"
          height="100px">
        </ejs-sparkline>
      </div>
    </div>
  </div>`,
  styles: [`
    .dashboard {
      background: white;
      color: #000;
      transition: 0.3s;
    }
    
    .dashboard.dark {
      background: #1E1E1E;
      color: white;
    }
    
    .metric-card {
      border: 1px solid #DDD;
      padding: 16px;
      margin: 8px;
      border-radius: 8px;
    }
    
    .dashboard.dark .metric-card {
      border-color: #444;
    }
  `]
})
export class DashboardComponent {
    isDarkMode = false
  revenueData = [5000, 7500, 6200, 8100, 7500]
  userData = [100, 150, 130, 180, 160]
  
  get sparklineFill(): string {
    return this.isDarkMode ? '#BB86FC' : '#6200EE'
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
  }
}
```

## Testing for Accessibility

### Chrome DevTools Audit

1. Open Chrome DevTools → Lighthouse
2. Run accessibility audit
3. Check for:
   - Color contrast
   - ARIA labels
   - Keyboard navigation
   - Screen reader compatibility

### Screen Reader Testing

Test with popular screen readers:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS)
- **TalkBack** (Android)

### Keyboard Navigation Testing

Verify:
- [ ] Sparkline can be focused (Tab key)
- [ ] Tooltip appears on focus (if enabled)
- [ ] All interactive elements are keyboard accessible
- [ ] No keyboard traps

## Best Practices

1. **Always include tooltips** for data visualization accessibility
2. **Use ARIA labels** to describe chart purpose
3. **Provide data tables** as fallback for screen readers
4. **Maintain color contrast** (WCAG AA minimum 4.5:1 for text)
5. **Support keyboard navigation** for all interactive elements
6. **Test with real assistive technology** before deployment
7. **Use semantic HTML** with proper role attributes
8. **Include focus indicators** for keyboard users
