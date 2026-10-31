# Globalization and Localization

Enable Splitter to support international audiences with right-to-left (RTL) layout, localized text, and multi-language support.

## Right-to-Left (RTL) Support

### Enable RTL with enableRtl Property

Use the `enableRtl` property to support right-to-left languages like Arabic, Hebrew, and Persian:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-rtl-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter 
      height='200px' 
      width='600px' 
      [enableRtl]='true'>
      <e-panes>
        <e-pane size='200px' content='<div class="content">Left pane</div>'>
        </e-pane>
        <e-pane size='200px' content='<div class="content">Middle pane</div>'>
        </e-pane>
        <e-pane size='200px' content='<div class="content">Right pane</div>'>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class RTLSplitterComponent {}
```

**Result**: Splitter layout mirrors for RTL languages. Panes arrange right-to-left, separators respond accordingly.

### RTL with Arabic Content

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-arabic-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter 
      height='300px' 
      width='100%' 
      [enableRtl]='true'>
      <e-panes>
        <!-- Right sidebar (visually on right due to RTL) -->
        <e-pane size='250px'>
          <ng-template #content>
            <div class='sidebar' dir='rtl'>
              <h3>القائمة</h3>
              <ul>
                <li>الرئيسية</li>
                <li>حول</li>
                <li>خدمات</li>
                <li>اتصل بنا</li>
              </ul>
            </div>
          </ng-template>
        </e-pane>

        <!-- Main content area -->
        <e-pane>
          <ng-template #content>
            <div class='content' dir='rtl'>
              <h1>مرحبا بك</h1>
              <p>هذا محتوى بسيط لتطبيق متعدد اللغات</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar, .content {
      padding: 20px;
      text-align: right;
      direction: rtl;
    }

    .sidebar {
      background-color: #f5f5f5;
      border-right: 1px solid #ddd;
    }

    .sidebar h3 {
      margin-top: 0;
    }

    .sidebar ul {
      list-style: none;
      padding: 0;
    }

    .sidebar li {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class ArabicSplitterComponent {}
```

### RTL with HTML Attribute

Set RTL at the document level:

```html
<!-- In index.html -->
<html dir="rtl" lang="ar">
  <head>
    <meta charset="utf-8">
    <title>تطبيق RTL</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

```typescript
// In app.component.ts
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Apply RTL globally
    document.body.setAttribute('dir', 'rtl');
  }
}
```

### RTL from User Settings

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dynamic-rtl',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin-bottom: 20px'>
      <label>
        <input 
          type='checkbox' 
          [checked]='isRTL'
          (change)='toggleRTL()' />
        Enable RTL
      </label>
      <p>Current: {{ isRTL ? 'RTL' : 'LTR' }}</p>
    </div>

    <ejs-splitter 
      #splitter
      height='300px' 
      width='100%' 
      [enableRtl]='isRTL'>
      <e-panes>
        <e-pane size='250px'>
          <ng-template #content>
            <div [dir]='isRTL ? "rtl" : "ltr"'>
              Left/Right Sidebar
            </div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div [dir]='isRTL ? "rtl" : "ltr"'>
              Main Content
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    label {
      display: block;
      margin-bottom: 10px;
      cursor: pointer;
    }

    input {
      margin-right: 10px;
    }
  `]
})
export class DynamicRTLComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;
  isRTL = false;

  toggleRTL(): void {
    this.isRTL = !this.isRTL;
  }
}
```

---

## Locale and Culture Support

### Set Global Locale

```typescript
import { Component, OnInit } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { setCulture } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-locale-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin-bottom: 20px'>
      <button (click)='setCultureEn()'>English</button>
      <button (click)='setCultureEs()'>Español</button>
      <button (click)='setCultureAr()'>العربية</button>
      <button (click)='setCultureJa()'>日本語</button>
      <p>Current Locale: {{ currentLocale }}</p>
    </div>

    <ejs-splitter 
      height='300px' 
      width='100%' 
      [enableRtl]='isRTL'>
      <e-panes>
        <e-pane size='250px'>
          <ng-template #content>
            <div>{{ localeName }}</div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div>{{ localeContent }}</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    button {
      padding: 8px 15px;
      margin-right: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }

    p {
      margin-top: 10px;
      font-weight: bold;
    }
  `]
})
export class LocaleSplitterComponent implements OnInit {
  currentLocale = 'en';
  isRTL = false;
  localeName = 'Language';
  localeContent = 'Select a language to change locale';

  ngOnInit(): void {
    this.setCultureEn();
  }

  setCultureEn(): void {
    setCulture('en');
    this.currentLocale = 'en';
    this.isRTL = false;
    this.localeName = 'Language';
    this.localeContent = 'English locale is set';
  }

  setCultureEs(): void {
    setCulture('es');
    this.currentLocale = 'es';
    this.isRTL = false;
    this.localeName = 'Idioma';
    this.localeContent = 'La configuración regional de español está establecida';
  }

  setCultureAr(): void {
    setCulture('ar');
    this.currentLocale = 'ar';
    this.isRTL = true;
    this.localeName = 'اللغة';
    this.localeContent = 'تم تعيين الإعدادات الإقليمية باللغة العربية';
  }

  setCultureJa(): void {
    setCulture('ja');
    this.currentLocale = 'ja';
    this.isRTL = false;
    this.localeName = '言語';
    this.localeContent = '日本語のロケール設定が有効になっています';
  }
}
```

### Supported Locales

Syncfusion supports numerous locales:

| Locale Code | Language | RTL |
|---|---|---|
| en | English | ✗ |
| es | Spanish | ✗ |
| fr | French | ✗ |
| de | German | ✗ |
| pt | Portuguese | ✗ |
| ja | Japanese | ✗ |
| zh | Chinese (Simplified) | ✗ |
| ko | Korean | ✗ |
| ar | Arabic | ✓ |
| he | Hebrew | ✓ |
| fa | Persian/Farsi | ✓ |
| ur | Urdu | ✓ |
| hi | Hindi | ✗ |
| th | Thai | ✗ |
| tr | Turkish | ✗ |

---

## Text Direction Attributes

### HTML dir Attribute

Apply text direction to pane content:

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <e-pane size='250px'>
      <ng-template #content>
        <!-- LTR content -->
        <div dir='ltr'>
          <h3>English Text</h3>
          <p>This content flows left to right</p>
        </div>
      </ng-template>
    </e-pane>
    <e-pane>
      <ng-template #content>
        <!-- RTL content -->
        <div dir='rtl'>
          <h3>نص عربي</h3>
          <p>هذا المحتوى يتدفق من اليمين إلى اليسار</p>
        </div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Mixed Direction Content

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mixed-direction',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='250px'>
          <ng-template #content>
            <div class='panel' dir='ltr'>
              <h3>English Content</h3>
              <p>Left to right text</p>
              <p>Numbers: 1234567890</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='panel' dir='rtl'>
              <h3>محتوى عربي</h3>
              <p>نص من اليمين إلى اليسار</p>
              <p>الأرقام: ١٢٣٤٥٦٧٨٩٠</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .panel {
      padding: 20px;
      text-align: left;
    }

    [dir='rtl'] {
      text-align: right;
    }
  `]
})
export class MixedDirectionComponent {}
```

---

## Number and Date Formatting

### Locale-Aware Formatting

Different locales format numbers and dates differently:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-locale-formatting',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='250px'>
          <ng-template #content>
            <div class='panel'>
              <h3>Number Formatting</h3>
              <p>English: {{ englishNumber | number:'1.2-2' }}</p>
              <p>German: {{ germanNumber }}</p>
              <p>French: {{ frenchNumber }}</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='panel'>
              <h3>Date Formatting</h3>
              <p>English: {{ currentDate | date:'short' }}</p>
              <p>German: {{ currentDate | date:'dd.MM.yyyy' }}</p>
              <p>Arabic: {{ currentDate | date:'short' }}</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .panel {
      padding: 20px;
    }

    p {
      margin: 10px 0;
      font-size: 14px;
    }
  `]
})
export class LocaleFormattingComponent {
  englishNumber = 1234.56;
  germanNumber = '1.234,56'; // German uses comma for decimals
  frenchNumber = '1 234,56'; // French uses space for thousands
  currentDate = new Date();
}
```

---

## Best Practices for Globalization

✓ **Always set enableRtl** when supporting RTL languages
✓ **Use dir attribute** on content containers for proper text direction
✓ **Test with real locales** - not all RTL is the same
✓ **Consider number formats** - some locales use different separators
✓ **Test date formats** - DD/MM/YYYY vs MM/DD/YYYY
✓ **Use CSS that respects direction** - avoid left/right margins in favor of logical properties
✓ **Handle mixed content** - apps often mix LTR and RTL
✓ **Test on devices** - RTL behavior can vary across browsers

---

## Common Pitfalls

❌ **Only setting enableRtl** - also set `dir='rtl'` on HTML elements
✓ **Combine enableRtl with dir attributes** for complete RTL support

❌ **Forgetting to import setCulture** - won't change locale
✓ **Import and call setCulture()** for locale changes

❌ **Hard-coding text in components** - not translatable
✓ **Use translation libraries** (ngx-translate, i18n) for user-facing text

❌ **Assuming all RTL is the same** - each language has nuances
✓ **Test with native speakers** for each language

