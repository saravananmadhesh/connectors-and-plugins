# Localization and Orientation in Angular Tab Component

## Table of Contents
1. [Localization](#localization)
2. [Header Placement (Orientation)](#header-placement-orientation)
3. [Overflow Modes](#overflow-modes)
4. [Responsive Orientation Changes](#responsive-orientation-changes)

---

## Localization

The Tab component supports localization for UI elements like the close button tooltip text. Use the [`locale`](https://ej2.syncfusion.com/angular/documentation/api/tab/#locale) property and the `L10n` class to define translations for different cultures.

**Property:** `locale`
- **Type:** string
- **Default:** 'en-US'
- **Description:** Sets the culture/language for Tab component text

**Localizable Strings:**

| Locale Key | Default Value | Purpose |
|-----------|---------------|---------|
| `closeButtonTitle` | "Close" | Tooltip text for close button |

### Basic Localization Example

```typescript
import { Component, OnInit } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      [locale]="locale"
      [showCloseButton]="true">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public locale = 'en-US';

  public headerText: object[] = [
    { text: 'Home' },
    { text: 'About' }
  ];

  public content0 = 'Welcome to the home tab';
  public content1 = 'About our application';

  ngOnInit(): void {
    // Set default English localization
    L10n.load({
      'en-US': {
        'tab': {
          'closeButtonTitle': 'Close'
        }
      }
    });
  }
}
```

### French Localization Example

```typescript
import { Component, OnInit } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="changeLocale('en-US')">English</button>
      <button (click)="changeLocale('fr-BE')">Français</button>
      <button (click)="changeLocale('de-DE')">Deutsch</button>
      <hr />
      <ejs-tab 
        id="element" 
        [locale]="currentLocale"
        [showCloseButton]="true">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent implements OnInit {
  public currentLocale = 'en-US';

  public headerText: object[] = [
    { text: 'Twitter' },
    { text: 'Facebook' },
    { text: 'WhatsApp' }
  ];

  public content0 = 'Twitter is an online social networking service...';
  public content1 = 'Facebook is an online social networking service...';
  public content2 = 'WhatsApp Messenger is a messaging client...';

  ngOnInit(): void {
    // Load multiple language translations
    L10n.load({
      'en-US': {
        'tab': {
          'closeButtonTitle': 'Close'
        }
      },
      'fr-BE': {
        'tab': {
          'closeButtonTitle': 'Fermer'  // French
        }
      },
      'de-DE': {
        'tab': {
          'closeButtonTitle': 'Schließen'  // German
        }
      }
    });
  }

  changeLocale(locale: string): void {
    this.currentLocale = locale;
  }
}
```

**Result:** Close button tooltip changes based on selected language:
- English: "Close"
- French: "Fermer"
- German: "Schließen"

### Custom Localization

```typescript
import { Component, OnInit } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      locale="es-ES"
      [showCloseButton]="true">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public headerText: object[] = [
    { text: 'Pestaña 1' }
  ];

  public content0 = 'Contenido en español';

  ngOnInit(): void {
    // Register Spanish translation
    L10n.load({
      'es-ES': {
        'tab': {
          'closeButtonTitle': 'Cerrar'  // Spanish: Close
        }
      }
    });
  }
}
```

---

## Header Placement (Orientation)

The Tab component allows placing headers at different positions using the [`headerPlacement`](https://ej2.syncfusion.com/angular/documentation/api/tab/#headerplacement) property. This supports both horizontal and vertical layouts.

**Property:** `headerPlacement`
- **Type:** string (HeaderPosition enum)
- **Default:** 'Top'
- **Options:** 'Top', 'Bottom', 'Left', 'Right'

| Position | Layout | Content Position | Use Case |
|----------|--------|------------------|----------|
| **Top** | Horizontal | Below headers | Standard navigation, most common |
| **Bottom** | Horizontal | Above headers | Footer-like navigation |
| **Left** | Vertical | Right of headers | Sidebar navigation |
| **Right** | Vertical | Left of headers | Right sidebar navigation |

### Top Placement (Default)

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      headerPlacement="Top">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Home' },
    { text: 'About' }
  ];

  public content0 = 'Home content displayed below';
  public content1 = 'About content displayed below';
}
```

### Bottom Placement

```typescript
<ejs-tab headerPlacement="Bottom">
  <e-tabitems>
    <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
    <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
  </e-tabitems>
</ejs-tab>
```

**Result:** Content appears above tab headers (useful for footer navigation)

### Left Placement (Vertical)

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      headerPlacement="Left"
      height="300px">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `,
  styles: [`
    :host ::ng-deep .e-tab {
      width: 100%;
    }
  `]
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Dashboard' },
    { text: 'Settings' },
    { text: 'Profile' }
  ];

  public content0 = 'Dashboard content on the right';
  public content1 = 'Settings content on the right';
  public content2 = 'Profile content on the right';
}
```

**Result:** Headers displayed vertically on left side, content on right

### Right Placement (Vertical)

```typescript
<ejs-tab 
  headerPlacement="Right"
  height="300px">
  <e-tabitems>
    <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
    <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
  </e-tabitems>
</ejs-tab>
```

**Result:** Headers on right side, content on left

### Dynamic Orientation Switching

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [TabModule, DropDownListModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <label>Header Placement:</label>
      <select [(ngModel)]="selectedPlacement" (change)="changePlacement()">
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      <hr />
      <ejs-tab 
        #tabObj
        id="element" 
        [headerPlacement]="selectedPlacement"
        height="250px">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public selectedPlacement = 'Top';

  public headerText: object[] = [
    { text: 'Tab 1' },
    { text: 'Tab 2' },
    { text: 'Tab 3' }
  ];

  public content0 = 'Content for Tab 1';
  public content1 = 'Content for Tab 2';
  public content2 = 'Content for Tab 3';

  changePlacement(): void {
    if (this.tabObj) {
      this.tabObj.headerPlacement = this.selectedPlacement as any;
      this.tabObj.refresh();
    }
  }
}
```

---

## Overflow Modes

When tab headers exceed available width, use the [`overflowMode`](https://ej2.syncfusion.com/angular/documentation/api/tab/#overflowmode) property to handle overflow.

**Property:** `overflowMode`
- **Type:** string (OverflowMode enum)
- **Default:** 'Scrollable'
- **Options:** 'Scrollable', 'Popup'

| Mode | Behavior | Best For |
|------|----------|----------|
| **Scrollable** | Arrow buttons for left/right scrolling | Large number of tabs |
| **Popup** | Hidden tabs in dropdown menu | Limited space, few tabs at a time |

### Scrollable Mode (Default)

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      overflowMode="Scrollable"
      width="300px">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        <e-tabitem [header]="headerText[3]" [content]="content3"></e-tabitem>
        <e-tabitem [header]="headerText[4]" [content]="content4"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Home' },
    { text: 'Products' },
    { text: 'About' },
    { text: 'Contact' },
    { text: 'FAQ' }
  ];

  public content0 = 'Home content';
  public content1 = 'Products content';
  public content2 = 'About content';
  public content3 = 'Contact content';
  public content4 = 'FAQ content';
}
```

**Result:** Left/right arrow buttons appear to scroll through tabs

### Popup Mode

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      overflowMode="Popup"
      width="300px">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        <e-tabitem [header]="headerText[3]" [content]="content3"></e-tabitem>
        <e-tabitem [header]="headerText[4]" [content]="content4"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Home' },
    { text: 'Products' },
    { text: 'About' },
    { text: 'Contact' },
    { text: 'FAQ' }
  ];

  public content0 = 'Home content';
  public content1 = 'Products content';
  public content2 = 'About content';
  public content3 = 'Contact content';
  public content4 = 'FAQ content';
}
```

**Result:** Dropdown menu shows hidden tabs

### Configurable Scroll Step

Use [`scrollStep`](https://ej2.syncfusion.com/angular/documentation/api/tab/#scrollstep) to control how many pixels the tab header scrolls when clicking arrow buttons.

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab 
      id="element" 
      overflowMode="Scrollable"
      [scrollStep]="50"
      width="300px">
      <e-tabitems>
        <e-tabitem 
          *ngFor="let item of headerText" 
          [header]="item" 
          [content]="'Content for ' + item.text">
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = Array.from({ length: 10 }, (_, i) => ({
    text: `Tab ${i + 1}`
  }));
}
```

**Property:** `scrollStep`
- **Type:** number
- **Default:** 0 (auto-calculated)
- **Unit:** pixels

---

## Responsive Orientation Changes

Automatically change orientation based on screen size using `@HostListener` or `window.matchMedia`.

```typescript
import { Component, ViewChild, HostListener } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Current layout: {{ currentLayout }}</p>
      <ejs-tab 
        #tabObj
        id="element" 
        [headerPlacement]="headerPlacement"
        height="300px">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public headerPlacement = 'Top';
  public currentLayout = 'Desktop (Headers Top)';

  public headerText: object[] = [
    { text: 'Tab 1' },
    { text: 'Tab 2' },
    { text: 'Tab 3' }
  ];

  public content0 = 'Content 1';
  public content1 = 'Content 2';
  public content2 = 'Content 3';

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;

    if (width < 768) {
      // Mobile: Left orientation
      this.headerPlacement = 'Left';
      this.currentLayout = 'Mobile (Headers Left)';
    } else if (width < 1024) {
      // Tablet: Top orientation
      this.headerPlacement = 'Top';
      this.currentLayout = 'Tablet (Headers Top)';
    } else {
      // Desktop: Top orientation
      this.headerPlacement = 'Top';
      this.currentLayout = 'Desktop (Headers Top)';
    }

    if (this.tabObj) {
      this.tabObj.headerPlacement = this.headerPlacement as any;
      this.tabObj.refresh();
    }
  }
}
```

---

## Best Practices

✅ **Do:**
- Use `locale` with `L10n.load()` for multi-language support
- Change `headerPlacement` based on available space
- Use `Scrollable` mode for many tabs, `Popup` for limited space
- Test localization with different character sets and RTL languages

❌ **Don't:**
- Hardcode localization strings in templates
- Change `headerPlacement` too frequently (impacts performance)
- Mix multiple overflow modes in single Tab
- Forget to register localization before setting locale property

---

## Related Properties

| Property | Type | Purpose |
|----------|------|---------|
| `locale` | string | Sets UI language and culture |
| `headerPlacement` | string | Header position (Top/Bottom/Left/Right) |
| `overflowMode` | string | Overflow handling (Scrollable/Popup) |
| `scrollStep` | number | Pixels to scroll per click |
| `reorderActiveTab` | boolean | Reorder from popup |

## Localization Locale Codes

Common locale codes:
- `en-US` - English (United States)
- `en-GB` - English (United Kingdom)
- `fr-FR` - French (France)
- `fr-BE` - French (Belgium)
- `de-DE` - German (Germany)
- `es-ES` - Spanish (Spain)
- `it-IT` - Italian (Italy)
- `pt-BR` - Portuguese (Brazil)
- `ja-JP` - Japanese (Japan)
- `zh-CN` - Chinese (Simplified)
