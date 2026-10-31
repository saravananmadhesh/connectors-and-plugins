---
name: api-reference
description: Complete API reference for Syncfusion Angular Timeline component including all properties, methods, and events with comprehensive code examples.
---

# API Reference - Timeline Component

Complete documentation of all Timeline component APIs with detailed explanations and working code examples.

## Table of Contents
- [Component Properties](#component-properties)
- [Item Properties](#item-properties)
- [Events](#events)
- [Enumerations](#enumerations)

---

## Component Properties

### align

**Type:** `string` | `TimelineAlign`  
**Default:** `After`  
**Description:** Defines the alignment of item content within the Timeline.

**Possible values:**
- `Before` - Content on left (vertical) or top (horizontal), opposite content on right/bottom
- `After` - Content on right (vertical) or bottom (horizontal), opposite content on left/top
- `Alternate` - Content alternates between sides
- `AlternateReverse` - Content alternates in reverse pattern

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-alignment',
  template: `
    <div class="container">
      <h2>Alignment: {{ currentAlign }}</h2>
      <div class="alignment-selector">
        <button (click)="currentAlign = 'Before'">Before</button>
        <button (click)="currentAlign = 'After'">After</button>
        <button (click)="currentAlign = 'Alternate'">Alternate</button>
        <button (click)="currentAlign = 'AlternateReverse'">AlternateReverse</button>
      </div>
      
      <ejs-timeline [align]="currentAlign" orientation="Vertical">
        <e-items>
          <e-item *ngFor="let item of items"
                  [content]="item.content"
                  [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .alignment-selector { margin-bottom: 20px; }
    button { margin-right: 10px; padding: 8px 16px; cursor: pointer; }
  `]
})
export class AlignmentComponent {
  currentAlign = 'Before';
  items: TimelineItemModel[] = [
    { content: 'Scheduled', oppositeContent: 'Meeting at 10 AM' },
    { content: 'In Progress', oppositeContent: 'Development phase' },
    { content: 'Completed', oppositeContent: 'Deployment done' }
  ];
}
```

---

### orientation

**Type:** `string` | `TimelineOrientation`  
**Default:** `Vertical`  
**Description:** Defines the orientation (layout direction) of the Timeline.

**Possible values:**
- `Vertical` - Items displayed top-to-bottom
- `Horizontal` - Items displayed left-to-right

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-orientation',
  template: `
    <div class="container">
      <h2>Timeline Orientation: {{ orientation }}</h2>
      <div class="orientation-selector">
        <button (click)="orientation = 'Vertical'">Vertical</button>
        <button (click)="orientation = 'Horizontal'">Horizontal</button>
      </div>
      
      <div [ngClass]="orientation === 'Horizontal' ? 'horizontal-container' : ''">
        <ejs-timeline [orientation]="orientation" align="Before">
          <e-items>
            <e-item *ngFor="let item of projectSteps"
                    [content]="item.content"
                    [oppositeContent]="item.oppositeContent"></e-item>
          </e-items>
        </ejs-timeline>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .orientation-selector { margin-bottom: 20px; }
    button { margin-right: 10px; padding: 8px 16px; cursor: pointer; }
    .horizontal-container { width: 100%; overflow-x: auto; }
    .horizontal-container > ejs-timeline { min-width: 1000px; }
  `]
})
export class OrientationComponent {
  orientation: any = 'Vertical';
  projectSteps: TimelineItemModel[] = [
    { content: 'Design', oppositeContent: 'Week 1-2' },
    { content: 'Development', oppositeContent: 'Week 3-6' },
    { content: 'Testing', oppositeContent: 'Week 7-8' },
    { content: 'Deployment', oppositeContent: 'Week 9' }
  ];
}
```

---

### reverse

**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether to display timeline items in reverse order (latest first).

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-reverse',
  template: `
    <div class="container">
      <h2>Activity Feed</h2>
      <div class="reverse-toggle">
        <label>
          <input type="checkbox" [(ngModel)]="isReverse">
          Show Recent First
        </label>
      </div>
      
      <ejs-timeline [reverse]="isReverse" align="Before" orientation="Vertical">
        <e-items>
          <e-item *ngFor="let activity of activities"
                  [content]="activity.content"
                  [oppositeContent]="activity.time"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .reverse-toggle { margin-bottom: 20px; }
    label { cursor: pointer; }
  `]
})
export class ReverseComponent {
  isReverse = true;
  activities: TimelineItemModel[] = [
    { content: 'User Registration', time: 'Jan 1, 2024 - 9:00 AM' },
    { content: 'Email Verification', time: 'Jan 2, 2024 - 2:30 PM' },
    { content: 'Profile Completion', time: 'Jan 3, 2024 - 11:15 AM' },
    { content: 'First Purchase', time: 'Jan 5, 2024 - 3:45 PM' },
    { content: 'Account Upgrade', time: 'Jan 8, 2024 - 10:20 AM' }
  ];
}
```

---

### items

**Type:** `TimelineItemModel[]`  
**Default:** `[]`  
**Description:** Defines the array of timeline items to display.

**Example:**

```ts
import { Component, OnInit } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-items-binding',
  template: `
    <div class="container">
      <h2>Timeline Items Binding</h2>
      <div class="controls">
        <button (click)="addItem()">Add Item</button>
        <button (click)="removeItem()">Remove Last Item</button>
      </div>
      
      <p>Total Items: {{ timelineItems.length }}</p>
      
      <ejs-timeline [items]="timelineItems" align="Before">
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .controls { margin-bottom: 20px; }
    button { margin-right: 10px; padding: 8px 16px; cursor: pointer; }
  `]
})
export class ItemsBindingComponent implements OnInit {
  timelineItems: TimelineItemModel[] = [];

  ngOnInit() {
    this.initializeItems();
  }

  initializeItems() {
    this.timelineItems = [
      { content: 'Item 1', oppositeContent: 'Description 1' },
      { content: 'Item 2', oppositeContent: 'Description 2' },
      { content: 'Item 3', oppositeContent: 'Description 3' }
    ];
  }

  addItem() {
    const newItem: TimelineItemModel = {
      content: `Item ${this.timelineItems.length + 1}`,
      oppositeContent: `Description ${this.timelineItems.length + 1}`
    };
    this.timelineItems = [...this.timelineItems, newItem];
  }

  removeItem() {
    if (this.timelineItems.length > 0) {
      this.timelineItems = this.timelineItems.slice(0, -1);
    }
  }
}
```

---

### cssClass

**Type:** `string`  
**Default:** `''`  
**Description:** Defines CSS class(es) to customize the Timeline component appearance.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-css-customization',
  template: `
    <div class="container">
      <h2>Custom Styled Timeline</h2>
      
      <ejs-timeline cssClass="custom-timeline" align="Before">
        <e-items>
          <e-item *ngFor="let item of items"
                  [content]="item.content"
                  [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    
    /* Custom Timeline Styling */
    .custom-timeline.e-timeline .e-timeline-item.e-connector::after {
      border-color: #FF6B6B;
      border-width: 3px;
    }
    
    .custom-timeline.e-timeline .e-dot {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    .custom-timeline.e-timeline .e-content {
      background: #F8F9FA;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
  `]
})
export class CssCustomizationComponent {
  items: TimelineItemModel[] = [
    { content: 'Planning', oppositeContent: 'Phase 1' },
    { content: 'Design', oppositeContent: 'Phase 2' },
    { content: 'Development', oppositeContent: 'Phase 3' },
    { content: 'Testing', oppositeContent: 'Phase 4' }
  ];
}
```

---

### template

**Type:** `string | object`  
**Default:** `''`  
**Description:** Defines custom template for rendering timeline items. Template context contains the item model and current index.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-template-example',
  template: `
    <div class="container">
      <h2>Timeline with Custom Template</h2>
      
      <ejs-timeline [template]="itemTemplate" align="Before" orientation="Vertical">
        <e-items>
          <e-item *ngFor="let item of events; let i = index"
                  [content]="item.content"
                  [oppositeContent]="item.date"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
    
    <ng-template #itemTemplate let-data="">
      <div class="custom-item-template">
        <div class="item-number">{{ data.itemIndex + 1 }}</div>
        <div class="item-content">
          <h4>{{ data.item.content }}</h4>
          <p>{{ data.item.oppositeContent }}</p>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .container { padding: 20px; }
    
    .custom-item-template {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
    }
    
    .item-number {
      background: #2196F3;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .item-content h4 {
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .item-content p {
      margin: 0;
      color: #666;
      font-size: 12px;
    }
  `]
})
export class TemplateExampleComponent {
  events: TimelineItemModel[] = [
    { content: 'Project Kickoff', date: 'Jan 15, 2024' },
    { content: 'Design Phase Complete', date: 'Feb 20, 2024' },
    { content: 'Development Starts', date: 'Mar 1, 2024' },
    { content: 'Testing Phase', date: 'Apr 15, 2024' }
  ];
}
```

---

### locale

**Type:** `string`  
**Default:** `''` (uses global culture, defaults to 'en-US')  
**Description:** Overrides the global culture and localization value for this component instance. Useful for displaying locale-specific content, date formats, and translations within a single Timeline component.

**Supported Locales:** en-US, ar-AE, de-DE, es-ES, fr-FR, ja-JP, zh-CN, and many others

**Use Cases:**
- Display timeline with locale-specific date formats
- Use different numeric formats for different regions
- Apply locale-specific styling for different markets
- Support multiple languages in different Timeline instances on the same page

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-locale-example',
  template: `
    <div class="container">
      <h2>Timeline with Locale Support</h2>
      
      <div class="locale-selector">
        <label>Select Locale:</label>
        <select [(ngModel)]="selectedLocale" (change)="onLocaleChange()">
          <option value="en-US">English (United States)</option>
          <option value="de-DE">Deutsch (Deutschland)</option>
          <option value="es-ES">Español (España)</option>
          <option value="fr-FR">Français (France)</option>
          <option value="ja-JP">日本語 (日本)</option>
          <option value="zh-CN">中文 (中国)</option>
          <option value="ar-AE">العربية (الإمارات)</option>
        </select>
      </div>
      
      <div class="timeline-versions">
        <div class="timeline-wrapper">
          <h3>Timeline with {{ selectedLocale }} locale</h3>
          <ejs-timeline 
            [locale]="selectedLocale"
            align="Before"
            [items]="getLocalizedItems()">
          </ejs-timeline>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { 
      padding: 20px; 
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .locale-selector {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
      padding: 15px;
      background: #F5F5F5;
      border-radius: 4px;
    }
    
    .locale-selector label {
      font-weight: 500;
      color: #333;
    }
    
    .locale-selector select {
      padding: 8px 12px;
      border: 1px solid #DDD;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
    
    .timeline-versions {
      display: flex;
      gap: 20px;
    }
    
    .timeline-wrapper {
      flex: 1;
    }
    
    .timeline-wrapper h3 {
      color: #2196F3;
      margin-bottom: 15px;
    }
  `]
})
export class LocaleExampleComponent {
  selectedLocale = 'en-US';

  localeFormats: { [key: string]: { dateFormat: string; monthFormat: string } } = {
    'en-US': { dateFormat: 'MM/DD/YYYY', monthFormat: 'January' },
    'de-DE': { dateFormat: 'DD.MM.YYYY', monthFormat: 'Januar' },
    'es-ES': { dateFormat: 'DD/MM/YYYY', monthFormat: 'Enero' },
    'fr-FR': { dateFormat: 'DD/MM/YYYY', monthFormat: 'Janvier' },
    'ja-JP': { dateFormat: 'YYYY年MM月DD日', monthFormat: '1月' },
    'zh-CN': { dateFormat: 'YYYY年MM月DD日', monthFormat: '1月' },
    'ar-AE': { dateFormat: 'DD/MM/YYYY', monthFormat: 'يناير' }
  };

  timelineByLocale: { [key: string]: TimelineItemModel[] } = {
    'en-US': [
      { content: 'Concept', oppositeContent: 'January 2024' },
      { content: 'Planning', oppositeContent: 'February 2024' },
      { content: 'Execution', oppositeContent: 'March 2024' },
      { content: 'Review', oppositeContent: 'April 2024' }
    ],
    'de-DE': [
      { content: 'Konzept', oppositeContent: 'Januar 2024' },
      { content: 'Planung', oppositeContent: 'Februar 2024' },
      { content: 'Ausführung', oppositeContent: 'März 2024' },
      { content: 'Überprüfung', oppositeContent: 'April 2024' }
    ],
    'es-ES': [
      { content: 'Concepto', oppositeContent: 'Enero 2024' },
      { content: 'Planificación', oppositeContent: 'Febrero 2024' },
      { content: 'Ejecución', oppositeContent: 'Marzo 2024' },
      { content: 'Revisión', oppositeContent: 'Abril 2024' }
    ],
    'fr-FR': [
      { content: 'Concept', oppositeContent: 'Janvier 2024' },
      { content: 'Planification', oppositeContent: 'Février 2024' },
      { content: 'Exécution', oppositeContent: 'Mars 2024' },
      { content: 'Examen', oppositeContent: 'Avril 2024' }
    ],
    'ja-JP': [
      { content: 'コンセプト', oppositeContent: '2024年1月' },
      { content: '計画', oppositeContent: '2024年2月' },
      { content: '実行', oppositeContent: '2024年3月' },
      { content: 'レビュー', oppositeContent: '2024年4月' }
    ],
    'zh-CN': [
      { content: '概念', oppositeContent: '2024年1月' },
      { content: '规划', oppositeContent: '2024年2月' },
      { content: '执行', oppositeContent: '2024年3月' },
      { content: '审查', oppositeContent: '2024年4月' }
    ],
    'ar-AE': [
      { content: 'الفكرة', oppositeContent: 'يناير 2024' },
      { content: 'التخطيط', oppositeContent: 'فبراير 2024' },
      { content: 'التنفيذ', oppositeContent: 'مارس 2024' },
      { content: 'المراجعة', oppositeContent: 'أبريل 2024' }
    ]
  };

  getLocalizedItems(): TimelineItemModel[] {
    return this.timelineByLocale[this.selectedLocale] || this.timelineByLocale['en-US'];
  }

  onLocaleChange() {
    console.log('Locale changed to:', this.selectedLocale);
  }
}
```

**Practical Use Cases:**

**Case 1: Multilingual Event Timeline**
```ts
// Display same events in different languages based on user preference
const eventTimeline: { [locale: string]: TimelineItemModel[] } = {
  'en-US': [
    { content: 'Conference Starts', oppositeContent: '9:00 AM' },
    { content: 'Keynote Speech', oppositeContent: '10:00 AM - 11:00 AM' }
  ],
  'fr-FR': [
    { content: 'Conférence Commence', oppositeContent: '9h00' },
    { content: 'Discours Principal', oppositeContent: '10h00 - 11h00' }
  ]
};
```

**Case 2: Regional Project Timeline**
```ts
// Different timelines for different regional markets
<ejs-timeline locale="de-DE">
  <!-- German-localized dates and information -->
</ejs-timeline>
```

**Case 3: Educational Institution**
```ts
// Display academic calendar in student's preferred language
ngOnInit() {
  // Get student's preferred locale from user settings
  this.studentLocale = this.getUserLocale(); // e.g., 'ja-JP'
}
```

---

### enablePersistence

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable persisting component's internal state (such as scroll position) between page reloads using the browser's localStorage. When enabled, the component saves its state when destroyed and restores it when recreated.

**Use Cases:**
- Save user's scroll position in a timeline
- Remember expanded/collapsed states across sessions
- Maintain timeline navigation history

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-persistence',
  template: `
    <div class="container">
      <h2>Timeline with Persistence Enabled</h2>
      
      <div class="persistence-info">
        <p><strong>Info:</strong> Scroll position and state are saved to localStorage.</p>
        <p>Reload the page to see the timeline restore to the previous scroll position.</p>
        <button (click)="clearPersistence()" class="clear-btn">Clear Saved State</button>
      </div>
      
      <ejs-timeline 
        id="persistentTimeline"
        [enablePersistence]="true" 
        align="Before"
        [items]="longTimelineItems">
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { 
      padding: 20px; 
      max-width: 800px;
      margin: 0 auto;
    }
    
    .persistence-info {
      background: #E3F2FD;
      border: 1px solid #2196F3;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 20px;
    }
    
    .persistence-info p {
      margin: 10px 0;
      color: #1976D2;
    }
    
    .clear-btn {
      background: #FF5252;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .clear-btn:hover {
      background: #FF1744;
    }
  `]
})
export class PersistenceComponent {
  longTimelineItems: TimelineItemModel[] = [];

  constructor() {
    this.generateLongTimeline();
  }

  generateLongTimeline() {
    // Generate 50 items for demonstration
    for (let i = 1; i <= 50; i++) {
      this.longTimelineItems.push({
        content: `Event ${i}`,
        oppositeContent: `January ${i % 31 + 1}, 2024`
      });
    }
  }

  clearPersistence() {
    // Clear the localStorage entry for this timeline
    const persistenceKey = 'persistentTimeline';
    localStorage.removeItem(persistenceKey);
    alert('Saved state cleared! The page will reload.');
    location.reload();
  }
}
```

**How It Works:**
1. Component state (scroll position, etc.) is automatically saved to localStorage
2. When the component is created again, it reads the saved state and restores it
3. Storage key is based on the component's ID attribute
4. Persisted data is automatically cleared when the component is destroyed properly

---

### enableRtl

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable rendering the Timeline component in right-to-left (RTL) direction. Used for languages like Arabic, Hebrew, and Persian that are naturally written right-to-left.

**Use Cases:**
- Support for Arabic language timelines
- Support for Hebrew language timelines
- Support for Persian (Farsi) language timelines
- Multilingual applications with RTL support

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-rtl-support',
  template: `
    <div class="container">
      <h2>RTL Timeline Support</h2>
      
      <div class="language-selector">
        <button 
          (click)="setLanguage('en')" 
          [class.active]="currentLanguage === 'en'">
          English (LTR)
        </button>
        <button 
          (click)="setLanguage('ar')" 
          [class.active]="currentLanguage === 'ar'">
          العربية (RTL)
        </button>
      </div>
      
      <p class="lang-label">Current Language: {{ languageNames[currentLanguage] }}</p>
      
      <ejs-timeline 
        [enableRtl]="isRtl"
        align="Before"
        [items]="getRtlItems()"
        [attr.dir]="isRtl ? 'rtl' : 'ltr'">
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { 
      padding: 20px; 
      max-width: 800px;
      margin: 0 auto;
    }
    
    .language-selector {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    button {
      padding: 10px 20px;
      border: 2px solid #ccc;
      background: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    button.active {
      background: #2196F3;
      color: white;
      border-color: #2196F3;
    }
    
    .lang-label {
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }
    
    /* RTL-specific adjustments */
    :host[dir="rtl"] .e-timeline {
      text-align: right;
    }
  `]
})
export class RtlSupportComponent {
  currentLanguage: 'en' | 'ar' = 'en';
  
  languageNames: { [key: string]: string } = {
    'en': 'English (Left-to-Right)',
    'ar': 'العربية (Right-to-Left)'
  };

  timelineData: { [key: string]: TimelineItemModel[] } = {
    'en': [
      { content: 'Project Started', oppositeContent: 'January 2024' },
      { content: 'Design Phase', oppositeContent: 'February 2024' },
      { content: 'Development', oppositeContent: 'March - May 2024' },
      { content: 'Testing', oppositeContent: 'June 2024' },
      { content: 'Launch', oppositeContent: 'July 2024' }
    ],
    'ar': [
      { content: 'بدء المشروع', oppositeContent: 'يناير 2024' },
      { content: 'مرحلة التصميم', oppositeContent: 'فبراير 2024' },
      { content: 'التطوير', oppositeContent: 'مارس - مايو 2024' },
      { content: 'الاختبار', oppositeContent: 'يونيو 2024' },
      { content: 'الإطلاق', oppositeContent: 'يوليو 2024' }
    ]
  };

  get isRtl(): boolean {
    return this.currentLanguage === 'ar';
  }

  setLanguage(lang: 'en' | 'ar') {
    this.currentLanguage = lang;
  }

  getRtlItems(): TimelineItemModel[] {
    return this.timelineData[this.currentLanguage];
  }
}
```

**Key Features:**
- Automatically mirrors the timeline layout
- Content alignment switches automatically
- Connectors and dots are positioned correctly for RTL
- Works with all Timeline alignments and orientations

---

## Item Properties

Item properties are defined in the `TimelineItemModel` interface and applied to individual timeline items.

### content

**Type:** `string | object`  
**Description:** Defines the main text content or template for the Timeline item. Supports HTML and template syntax.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-item-content',
  template: `
    <div class="container">
      <h2>Item Content Examples</h2>
      
      <h3>String Content</h3>
      <ejs-timeline align="Before">
        <e-items>
          <e-item content="Simple text content"></e-item>
          <e-item content="Another item with text"></e-item>
        </e-items>
      </ejs-timeline>
      
      <h3>HTML Content</h3>
      <ejs-timeline align="Before" [items]="htmlItems">
      </ejs-timeline>
    </div>
  `,
  styles: [`.container { padding: 20px; }`]
})
export class ItemContentComponent {
  htmlItems: TimelineItemModel[] = [
    { 
      content: '<div><strong>Project Started</strong><p>Initial phase</p></div>',
      oppositeContent: 'Jan 2024'
    },
    { 
      content: '<div><strong>Milestone 1</strong><p>Completed successfully</p></div>',
      oppositeContent: 'Feb 2024'
    }
  ];
}
```

---

### oppositeContent

**Type:** `string | object`  
**Description:** Defines additional text content or template displayed on the opposite side of the item.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-opposite-content',
  template: `
    <div class="container">
      <h2>Timeline with Opposite Content</h2>
      
      <ejs-timeline align="Alternate" orientation="Vertical">
        <e-items>
          <e-item *ngFor="let item of timelineData"
                  [content]="item.content"
                  [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`.container { padding: 20px; }`]
})
export class OppositeContentComponent {
  timelineData: TimelineItemModel[] = [
    { content: 'Requirement Analysis', oppositeContent: 'Week 1-2' },
    { content: 'System Design', oppositeContent: 'Week 3-4' },
    { content: 'Implementation', oppositeContent: 'Week 5-8' },
    { content: 'Quality Assurance', oppositeContent: 'Week 9-10' }
  ];
}
```

---

### cssClass

**Type:** `string`  
**Description:** Defines CSS class(es) to customize individual item appearance.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-item-css-class',
  template: `
    <div class="container">
      <h2>Status Timeline with CSS Classes</h2>
      
      <ejs-timeline align="Before">
        <e-items>
          <e-item *ngFor="let item of statusItems"
                  [content]="item.content"
                  [oppositeContent]="item.status"
                  [cssClass]="'status-' + item.status"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    
    .status-completed .e-content {
      background: #D4EDDA;
      border-left: 4px solid #28A745;
    }
    
    .status-progress .e-content {
      background: #FFF3CD;
      border-left: 4px solid #FFC107;
    }
    
    .status-pending .e-content {
      background: #D1ECF1;
      border-left: 4px solid #17A2B8;
    }
  `]
})
export class ItemCssClassComponent {
  statusItems: any[] = [
    { content: 'Order Placed', status: 'completed' },
    { content: 'Processing', status: 'progress' },
    { content: 'Shipped', status: 'pending' }
  ];
}
```

---

### disabled

**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether the timeline item is disabled (visually grayed out and not interactive).

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-disabled-items',
  template: `
    <div class="container">
      <h2>Timeline with Disabled Items</h2>
      
      <ejs-timeline align="Before">
        <e-items>
          <e-item *ngFor="let item of workflowItems"
                  [content]="item.content"
                  [oppositeContent]="item.oppositeContent"
                  [disabled]="item.disabled"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    
    .e-timeline .e-timeline-item.e-disabled .e-content {
      opacity: 0.5;
      color: #999;
    }
  `]
})
export class DisabledItemsComponent {
  workflowItems: any[] = [
    { content: 'Step 1: Setup', oppositeContent: 'Completed', disabled: false },
    { content: 'Step 2: Configuration', oppositeContent: 'Completed', disabled: false },
    { content: 'Step 3: Testing', oppositeContent: 'In Progress', disabled: false },
    { content: 'Step 4: Deployment', oppositeContent: 'Scheduled', disabled: true },
    { content: 'Step 5: Monitoring', oppositeContent: 'Future', disabled: true }
  ];
}
```

---

### dotCss

**Type:** `string`  
**Description:** Defines CSS class(es) to include custom icons or images in the Timeline item dot. Useful for displaying FontAwesome, Material Icons, or custom SVG icons.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-dot-css-icons',
  template: `
    <div class="container">
      <h2>Timeline with Icon Dots</h2>
      <p>Using Material Icons in Timeline dots</p>
      
      <ejs-timeline align="Before">
        <e-items>
          <e-item *ngFor="let item of processSteps"
                  [content]="item.content"
                  [oppositeContent]="item.phase"
                  [dotCss]="item.dotCss"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    
    /* Material Icon styling in dot */
    .e-timeline .e-dot::before {
      font-family: 'Material Icons';
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Icon-specific styles */
    .icon-design::before {
      content: '\\e3fd'; /* design_services icon */
    }
    
    .icon-develop::before {
      content: '\\e86e'; /* code icon */
    }
    
    .icon-test::before {
      content: '\\e8f0'; /* bug_report icon */
    }
    
    .icon-deploy::before {
      content: '\\e2c4'; /* cloud_upload icon */
    }
    
    /* Color coding */
    .icon-design .e-dot {
      background-color: #6366F1;
    }
    
    .icon-develop .e-dot {
      background-color: #8B5CF6;
    }
    
    .icon-test .e-dot {
      background-color: #EC4899;
    }
    
    .icon-deploy .e-dot {
      background-color: #10B981;
    }
  `]
})
export class DotCssIconsComponent {
  processSteps: any[] = [
    { 
      content: 'UI/UX Design', 
      phase: 'Week 1-2',
      dotCss: 'icon-design'
    },
    { 
      content: 'Backend Development', 
      phase: 'Week 3-5',
      dotCss: 'icon-develop'
    },
    { 
      content: 'QA Testing', 
      phase: 'Week 6-7',
      dotCss: 'icon-test'
    },
    { 
      content: 'Production Deploy', 
      phase: 'Week 8',
      dotCss: 'icon-deploy'
    }
  ];
}
```

---

## Events

### created

**Type:** `EmitType<Event>`  
**Description:** Event callback that is raised after the Timeline component has finished rendering and is ready for interaction.

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-created-event',
  template: `
    <div class="container">
      <h2>Timeline Created Event Example</h2>
      <p [ngClass]="{ 'success': isTimelineReady }">
        Timeline Status: {{ isTimelineReady ? 'Ready ✓' : 'Loading...' }}
      </p>
      
      <ejs-timeline (created)="onTimelineCreated()" align="Before">
        <e-items>
          <e-item *ngFor="let item of items"
                  [content]="item.content"
                  [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .success { color: #28A745; font-weight: bold; }
  `]
})
export class CreatedEventComponent {
  isTimelineReady = false;
  items: TimelineItemModel[] = [
    { content: 'Event 1', oppositeContent: 'Description 1' },
    { content: 'Event 2', oppositeContent: 'Description 2' },
    { content: 'Event 3', oppositeContent: 'Description 3' }
  ];

  onTimelineCreated() {
    console.log('Timeline component has been created and rendered!');
    this.isTimelineReady = true;
    // Perform initialization logic here
    this.initializeTimeline();
  }

  initializeTimeline() {
    console.log('Timeline ready with', this.items.length, 'items');
    // Load additional data, trigger animations, etc.
  }
}
```

---

### beforeItemRender

**Type:** `EmitType<TimelineRenderingEventArgs>`  
**Description:** Event that triggers before rendering each individual Timeline item. Allows you to modify item properties, apply conditional styling, or skip items.

**Event Arguments:**
- `data` (`TimelineItemModel`) - The current item being rendered
- `element` (`HTMLElement`) - The DOM element being rendered
- `index` (`number`) - Zero-based index of the current item
- `name` (`string`) - Name of the event ('beforeItemRender')

**Example:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule, TimelineRenderingEventArgs } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-before-item-render',
  template: `
    <div class="container">
      <h2>BeforeItemRender Event Example</h2>
      <p>Items with status "Current" are highlighted</p>
      
      <ejs-timeline (beforeItemRender)="onBeforeItemRender($event)" align="Before">
        <e-items>
          <e-item *ngFor="let item of statusItems"
                  [content]="item.content"
                  [oppositeContent]="item.status"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    
    .current-item .e-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    .current-item .e-dot {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 0 15px rgba(102, 126, 234, 0.6);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 15px rgba(102, 126, 234, 0.6); }
      50% { box-shadow: 0 0 25px rgba(102, 126, 234, 0.8); }
    }
    
    .past-item, .future-item { opacity: 0.6; }
    
    .future-item .e-dot {
      background-color: #BDBDBD;
    }
  `]
})
export class BeforeItemRenderComponent {
  statusItems: any[] = [
    { content: 'Order Placed', status: 'Completed' },
    { content: 'Processing', status: 'Current' },
    { content: 'Shipped', status: 'Pending' },
    { content: 'Delivery', status: 'Pending' }
  ];

  onBeforeItemRender(args: TimelineRenderingEventArgs) {
    const index = args.index;
    const element = args.element;
    const totalItems = this.statusItems.length;
    
    // Highlight current item (index 1 in this example)
    if (index === 1) {
      element.classList.add('current-item');
      console.log('Current item index:', index);
    } else if (index < 1) {
      element.classList.add('past-item');
    } else {
      element.classList.add('future-item');
    }
  }
}
```

**Advanced BeforeItemRender Example - Skip Items:**

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule, TimelineRenderingEventArgs } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, TimelineModule, TimelineAllModule],
  standalone: true,
  selector: 'app-skip-items',
  template: `
    <div class="container">
      <h2>Skip Items Example</h2>
      <label>
        <input type="checkbox" [(ngModel)]="showInternalOnly">
        Show Internal Events Only
      </label>
      
      <ejs-timeline (beforeItemRender)="onBeforeItemRender($event)" align="Before">
        <e-items>
          <e-item *ngFor="let event of events"
                  [content]="event.content"
                  [oppositeContent]="event.visibility"></e-item>
        </e-items>
      </ejs-timeline>
    </div>
  `,
  styles: [`.container { padding: 20px; } label { cursor: pointer; }`]
})
export class SkipItemsComponent {
  showInternalOnly = false;
  events: any[] = [
    { content: 'Public Launch', visibility: 'Public' },
    { content: 'Team Meeting', visibility: 'Internal' },
    { content: 'Board Review', visibility: 'Internal' },
    { content: 'Press Conference', visibility: 'Public' }
  ];

  onBeforeItemRender(args: TimelineRenderingEventArgs) {
    // Hide items based on condition - set cancel = true to skip rendering
    if (this.showInternalOnly && args.data.oppositeContent === 'Public') {
      // Skip rendering this item
      // Note: In some versions, you may need to use args.cancel = true
      args.element.style.display = 'none';
    } else if (!this.showInternalOnly && args.data.oppositeContent === 'Internal') {
      args.element.style.display = 'none';
    }
  }
}
```

---

## Enumerations

### TimelineAlign

Specifies the alignment of item content within the Timeline.

```ts
enum TimelineAlign {
  After = 'After',
  Before = 'Before',
  Alternate = 'Alternate',
  AlternateReverse = 'AlternateReverse'
}
```

---

### TimelineOrientation

Defines the orientation type of the Timeline.

```ts
enum TimelineOrientation {
  Horizontal = 'Horizontal',
  Vertical = 'Vertical'
}
```

---
