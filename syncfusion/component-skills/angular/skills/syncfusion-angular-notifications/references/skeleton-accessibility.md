# Accessibility Features

## Table of Contents
- [Overview](#overview)
- [WCAG and Compliance Standards](#wcag-and-compliance-standards)
- [Screen Reader Support](#screen-reader-support)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Keyboard Navigation](#keyboard-navigation)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)
- [Accessibility Validation](#accessibility-validation)

## Overview

The Skeleton component follows accessibility guidelines and standards to ensure loading states are perceivable by all users, including those using assistive technologies. The component is fully compliant with:

- **WCAG 2.2** - Web Content Accessibility Guidelines
- **Section 508** - Americans with Disabilities Act compliance
- **Screen Readers** - Works with NVDA, JAWS, and VoiceOver
- **Keyboard Navigation** - Fully keyboard accessible
- **Color Contrast** - Meets minimum contrast ratios
- **Mobile Device Support** - Accessible on iOS and Android

## WCAG and Compliance Standards

The Skeleton component meets the following accessibility standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 Support | ✅ Yes |
| Section 508 Support | ✅ Yes |
| Screen Reader Support | ✅ Yes |
| Right-to-Left Support | ✅ Yes |
| Color Contrast | ✅ Yes |
| Mobile Device Support | ✅ Yes |
| Keyboard Navigation Support | ✅ Yes |
| Accessibility Checker Validation | ✅ Yes |
| Axe-core Accessibility Validation | ✅ Yes |

### WCAG 2.2 Compliance Levels

The Skeleton component meets:
- **Level A** - Basic accessibility
- **Level AA** - Enhanced accessibility (recommended)
- **Level AAA** - Enhanced accessibility (best)

### Section 508 Compliance

Full compliance with Section 508 requirements for:
- Perceivable content
- Operable components
- Understandable interactions
- Robust code structure

## Screen Reader Support

The Skeleton component provides proper semantics for screen readers to announce loading states to users.

### Basic Screen Reader Announcement

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-accessible-skeleton',
  template: `
    <ejs-skeleton 
      height="15px" 
      label="Loading content, please wait...">
    </ejs-skeleton>
  `
})
export class AccessibleSkeletonComponent {}
```

### Live Region Support

Screen readers announce content changes in live regions automatically:

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-live-region-skeleton',
  template: `
    <div role="status" aria-live="polite" aria-busy="true">
      <ejs-skeleton width="100%" height="100px" label="Loading..."></ejs-skeleton>
      <p>Content is loading. Please wait.</p>
    </div>
  `
})
export class LiveRegionSkeletonComponent {}
```

### Custom Screen Reader Text

```typescript
// Provide descriptive labels for screen readers
<ejs-skeleton 
  shape="Circle" 
  width="50px"
  label="User profile photo placeholder">
</ejs-skeleton>

<ejs-skeleton 
  width="100%" 
  height="150px"
  label="Featured image loading">
</ejs-skeleton>

<ejs-skeleton 
  width="80%" 
  height="15px"
  label="Article title placeholder">
</ejs-skeleton>
```

## WAI-ARIA Attributes

The Skeleton component supports and implements WAI-ARIA attributes for proper semantic communication.

### ARIA Attributes Used

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `alert` | Conveys important, time-sensitive messages |
| `aria-label` | Text | Provides text label (from `label` property) |
| `aria-live` | `polite` \| `assertive` | Announces content changes |
| `aria-busy` | `true` \| `false` | Indicates loading state (true until complete) |

> **Note:** The Skeleton component applies `role="alert"` to its host element. Because `role="alert"` is an **assertive** live region, screen readers will **interrupt** the current announcement to announce the skeleton. This is the default behavior — no configuration is required.

### Using aria-label

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-aria-label-skeleton',
  template: `
    <!-- Using label property (sets aria-label internally) -->
    <ejs-skeleton 
      shape="Circle" 
      width="50px"
      label="User profile picture loading">
    </ejs-skeleton>
  `
})
export class AriaLabelSkeletonComponent {}
```

### Using aria-busy

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-aria-busy-skeleton',
  template: `
    <div [attr.aria-busy]="isLoading">
      <ejs-skeleton 
        width="100%" 
        height="100px"
        label="Content is loading">
      </ejs-skeleton>
    </div>
  `
})
export class AriaBusySkeletonComponent {
  isLoading = true;
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
```

### Using aria-live

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-aria-live-skeleton',
  template: `
    <!-- Announce loading status to screen readers -->
    <div role="status" aria-live="polite" aria-atomic="true">
      <p *ngIf="isLoading">{{ statusMessage }}</p>
      <ejs-skeleton *ngIf="isLoading" width="100%" height="100px"></ejs-skeleton>
    </div>
  `
})
export class AriaLiveSkeletonComponent {
  isLoading = true;
  statusMessage = 'Loading content, please wait...';
}
```

## Right-to-Left (RTL) Support

The Skeleton component automatically adjusts for right-to-left languages and layouts.

### Enable RTL

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-rtl-skeleton',
  template: `
    <ejs-skeleton 
      width="100%" 
      height="100px"
      [enableRtl]="true">
    </ejs-skeleton>
  `
})
export class RtlSkeletonComponent {}
```

### RTL Layout

```typescript
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-rtl-aware-skeleton',
  template: `
    <div [dir]="direction">
      <ejs-skeleton 
        width="100%" 
        height="100px"
        [enableRtl]="isRtlDirection">
      </ejs-skeleton>
    </div>
  `
})
export class RtlAwareSkeletonComponent implements OnInit {
  direction: 'ltr' | 'rtl' = 'ltr';
  isRtlDirection = false;
  
  ngOnInit() {
    // Detect language or user preference
    const language = document.documentElement.lang;
    if (['ar', 'he', 'fa', 'ur'].includes(language)) {
      this.direction = 'rtl';
      this.isRtlDirection = true;
    }
  }
}
```

### RTL with Arabic Example

```typescript
@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-arabic-skeleton',
  template: `
    <div dir="rtl" lang="ar">
      <h1>جاري التحميل...</h1>
      <ejs-skeleton 
        width="100%" 
        height="100px"
        label="جاري تحميل المحتوى"
        [enableRtl]="true">
      </ejs-skeleton>
    </div>
  `,
  styles: [`
    :host ::ng-deep { direction: rtl; }
  `]
})
export class ArabicSkeletonComponent {}
```

## Keyboard Navigation

The Skeleton component is accessible via keyboard navigation. While skeletons themselves are not interactive, they can be part of accessible content flows.

### Focus Management

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-keyboard-skeleton',
  template: `
    <div role="status" aria-live="polite">
      <ejs-skeleton 
        #skeletonElement
        width="100%" 
        height="100px"
        label="Loading content">
      </ejs-skeleton>
    </div>
  `
})
export class KeyboardSkeletonComponent {
  @ViewChild('skeletonElement') skeletonElement!: ElementRef;
}
```

### Skip Links with Skeleton

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-skip-link-skeleton',
  template: `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <div role="status" aria-live="polite">
      <ejs-skeleton width="100%" height="100px" label="Loading"></ejs-skeleton>
    </div>
    
    <main id="main-content">
      <!-- Main content here -->
    </main>
  `,
  styles: [`
    .skip-link {
      position: absolute;
      top: -9999px;
    }
    
    .skip-link:focus {
      top: 0;
      left: 0;
      z-index: 100;
    }
  `]
})
export class SkipLinkSkeletonComponent {}
```

## Color Contrast

The Skeleton component meets WCAG color contrast requirements for all themes and states.

### Contrast Ratios

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18pt+)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### High Contrast Support

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-high-contrast-skeleton',
  template: `
    <ejs-skeleton 
      width="100%" 
      height="100px"
      cssClass="high-contrast-skeleton">
    </ejs-skeleton>
  `,
  styles: [`
    @media (prefers-contrast: more) {
      :global(.high-contrast-skeleton) {
        background: #000 !important;
        filter: invert(1);
      }
    }
  `]
})
export class HighContrastSkeletonComponent {}
```

### Dark Mode Support

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-dark-mode-skeleton',
  template: `
    <ejs-skeleton 
      width="100%" 
      height="100px"
      [cssClass]="isDarkMode ? 'dark-theme' : 'light-theme'">
    </ejs-skeleton>
  `,
  styles: [`
    :global(.dark-theme) {
      background: #424242;
    }
    
    :global(.light-theme) {
      background: #f5f5f5;
    }
    
    @media (prefers-color-scheme: dark) {
      :global(.light-theme) {
        background: #424242;
      }
    }
  `]
})
export class DarkModeSkeletonComponent {
  isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
}
```

## Focus Management

Ensure proper focus management when content loads.

### Focus Transfer on Content Load

```typescript
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-focus-management-skeleton',
  template: `
    <div *ngIf="isLoading" role="status" aria-live="polite">
      <ejs-skeleton width="100%" height="100px" label="Loading content"></ejs-skeleton>
    </div>
    
    <div *ngIf="!isLoading" #contentRef>
      <h2>Content Loaded</h2>
      <p>This content is now visible and focused.</p>
    </div>
  `
})
export class FocusManagementComponent implements OnInit {
  @ViewChild('contentRef') contentRef!: ElementRef;
  
  isLoading = true;
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      // Transfer focus to loaded content
      setTimeout(() => {
        const heading = this.contentRef.nativeElement.querySelector('h2');
        heading?.focus();
      });
    }, 2000);
  }
}
```

### Focus Visible

```typescript
import { Component } from '@angular/core';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [SkeletonModule],
  standalone: true,
  selector: 'app-focus-visible-skeleton',
  template: `
    <ejs-skeleton width="100%" height="100px" cssClass="focus-visible-skeleton"></ejs-skeleton>
  `,
  styles: [`
    :global(.focus-visible-skeleton:focus-visible) {
      outline: 3px solid #4A90E2;
      outline-offset: 2px;
    }
  `]
})
export class FocusVisibleComponent {}
```

## Accessibility Validation

Use accessibility validation tools to ensure compliance.

### Using Accessibility Checker

The Skeleton component passes validation with:

```typescript
// Install accessibility-checker
npm install --save-dev accessibility-checker

// Use in tests
import { checkAccess } from 'accessibility-checker';

describe('Skeleton Accessibility', () => {
  it('should pass accessibility checks', async () => {
    const result = await checkAccess(document);
    expect(result.violations.length).toBe(0);
  });
});
```

### Using Axe-core

```typescript
// Install axe-core
npm install --save-dev axe-core axe-playwright

// Use in tests
import { injectAxe, checkA11y } from 'axe-playwright';

describe('Skeleton Axe Accessibility', () => {
  it('should have no accessibility violations', async () => {
    await injectAxe(page);
    await checkA11y(page);
  });
});
```

### Testing Accessibility

```typescript
// Test with screen reader simulation
describe('Skeleton Screen Reader Support', () => {
  it('should have proper aria-label', () => {
    const skeleton = document.querySelector('ejs-skeleton');
    expect(skeleton?.getAttribute('aria-label')).toBeTruthy();
  });
  
  it('should have correct role', () => {
    const skeleton = document.querySelector('ejs-skeleton');
    expect(skeleton?.getAttribute('role')).toBe('status');
  });
});
```

