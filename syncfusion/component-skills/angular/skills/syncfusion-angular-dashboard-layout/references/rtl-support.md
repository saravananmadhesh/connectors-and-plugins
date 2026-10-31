# Right-to-Left (RTL) Support

## Overview

The Dashboard Layout component supports right-to-left (RTL) rendering, enabling you to build dashboards for languages like Arabic, Hebrew, and Persian. When RTL is enabled, the entire dashboard layout, including panels, navigation, and controls, automatically adapts to render from right to left.

## Enabling RTL

RTL support is enabled using the `enableRtl` property:

### Basic RTL Configuration

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-rtl-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[10, 10]"
      [enableRtl]="true"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class RtlDashboardComponent {
  public panels: any = [
    {
      id: 'Panel0',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      header: '<div>لوحة 0</div>',  // Arabic text
      content: '<div class="content">محتوى</div>'
    },
    {
      id: 'Panel1',
      sizeX: 3,
      sizeY: 2,
      row: 0,
      col: 1,
      header: '<div>لوحة 1</div>',
      content: '<div class="content">محتوى</div>'
    },
    {
      id: 'Panel2',
      sizeX: 1,
      sizeY: 3,
      row: 0,
      col: 4,
      header: '<div>لوحة 2</div>',
      content: '<div class="content">محتوى</div>'
    }
  ];
}
```

## Dynamic RTL Toggling

### Toggle RTL at Runtime

```typescript
@Component({
  selector: 'app-rtl-toggle',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="controls">
      <button (click)="toggleRtl()">
        {{ isRtl ? 'Switch to LTR' : 'Switch to RTL' }}
      </button>
    </div>
    <ejs-dashboardlayout 
      #dashboard
      [columns]="5"
      [enableRtl]="isRtl"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class RtlToggleComponent {
  public isRtl = false;
  
  public panels: any = [
    { id: 'p1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2' },
    { id: 'p3', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Panel 3' }
  ];
  
  toggleRtl() {
    this.isRtl = !this.isRtl;
    // Optionally save preference
    localStorage.setItem('rtlEnabled', this.isRtl.toString());
  }
}
```

## Language-Based RTL

### Auto-detect RTL Based on Language

```typescript
import { Component, OnInit } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-language-rtl',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="language-selector">
      <button (click)="setLanguage('en')">English</button>
      <button (click)="setLanguage('ar')">العربية</button>
      <button (click)="setLanguage('he')">עברית</button>
      <button (click)="setLanguage('fa')">فارسی</button>
    </div>
    <ejs-dashboardlayout 
      [columns]="5"
      [enableRtl]="isRtlLanguage"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class LanguageRtlComponent implements OnInit {
  public currentLanguage = 'en';
  public isRtlLanguage = false;
  
  private rtlLanguages = ['ar', 'he', 'fa', 'ur'];  // RTL language codes
  
  public panels: any = [];
  
  ngOnInit() {
    this.setLanguage('en');
  }
  
  setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.isRtlLanguage = this.rtlLanguages.includes(lang);
    this.updatePanelContent();
  }
  
  private updatePanelContent() {
    // Update panel headers and content based on language
    this.panels = this.getPanelsForLanguage(this.currentLanguage);
  }
  
  private getPanelsForLanguage(lang: string): any[] {
    const content: { [key: string]: any } = {
      'en': [
        { id: 'p1', header: 'Sales', content: 'Sales Data' },
        { id: 'p2', header: 'Revenue', content: 'Revenue Chart' }
      ],
      'ar': [
        { id: 'p1', header: 'المبيعات', content: 'بيانات المبيعات' },
        { id: 'p2', header: 'الإيرادات', content: 'مخطط الإيرادات' }
      ],
      'he': [
        { id: 'p1', header: 'מכירות', content: 'נתוני מכירות' },
        { id: 'p2', header: 'הכנסות', content: 'תרשים הכנסות' }
      ],
      'fa': [
        { id: 'p1', header: 'فروش', content: 'داده های فروش' },
        { id: 'p2', header: 'درآمد', content: 'نمودار درآمد' }
      ]
    };
    
    return (content[lang] || content['en']).map((item, index) => ({
      ...item,
      sizeX: 2,
      sizeY: 1,
      row: 0,
      col: index * 2
    }));
  }
}
```

## RTL with HTML dir Attribute

### Global RTL Configuration

For application-wide RTL support, set the HTML `dir` attribute:

```html
<!-- In index.html -->
<html dir="rtl" lang="ar">
  <head>
    <title>Dashboard Layout - RTL</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

Then in your component:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ejs-dashboardlayout [columns]="5" [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class AppComponent {
  public panels: any = [];
}
```

## RTL with CSS

### CSS Adjustments for RTL

When using RTL, you may need to adjust CSS for proper alignment:

```css
/* LTR Styles */
.dashboard-header {
  text-align: left;
  padding-left: 20px;
}

/* RTL Styles */
.e-rtl .dashboard-header {
  text-align: right;
  padding-right: 20px;
  padding-left: 0;
}

/* Panel Spacing */
.e-rtl .e-panel {
  margin-left: 0;
  margin-right: 10px;
}
```

## RTL with Drag and Drop

RTL fully supports drag-and-drop functionality:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [enableRtl]="true"
      [allowDragging]="true"
      [panels]="panels"
      (dragStart)="onDragStart($event)">
    </ejs-dashboardlayout>
  `
})
export class RtlDragDropComponent {
  public panels: any = [
    { id: 'p1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2' }
  ];
  
  onDragStart(args: any) {
    console.log('Drag started in RTL mode');
  }
}
```

## RTL with Responsive Design

RTL works seamlessly with responsive breakpoints:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="columns"
      [enableRtl]="isRtl"
      [mediaQuery]="mediaQuery"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class RtlResponsiveComponent implements OnInit {
  public columns = 5;
  public isRtl = true;
  public mediaQuery = '(max-width: 600px)';
  public panels: any = [];
  
  ngOnInit() {
    // Responsive RTL dashboard automatically
    // adjusts on mobile devices while maintaining RTL
  }
}
```

## Best Practices for RTL

### 1. Test Content in RTL

Always test panel content with RTL enabled to ensure proper display:

```typescript
// Use localized content
const arabicContent = '<div dir="rtl">المحتوى العربي</div>';
```

### 2. Use Logical CSS Properties

Use CSS logical properties for better RTL support:

```css
/* Logical properties work for both LTR and RTL */
.panel-content {
  padding-inline: 16px;      /* Works for both directions */
  margin-inline-start: 10px; /* Automatic left/right based on direction */
  text-align: start;         /* Automatic left/right based on direction */
}
```

### 3. Store RTL Preference

Save user's RTL preference:

```typescript
saveRtlPreference(enabled: boolean) {
  localStorage.setItem('rtlEnabled', enabled.toString());
}

loadRtlPreference(): boolean {
  return localStorage.getItem('rtlEnabled') === 'true';
}
```

### 4. Provide Language Switcher

Allow users to easily switch between LTR and RTL languages:

```typescript
languages = [
  { code: 'en', name: 'English', rtl: false },
  { code: 'ar', name: 'العربية', rtl: true },
  { code: 'he', name: 'עברית', rtl: true }
];
```
