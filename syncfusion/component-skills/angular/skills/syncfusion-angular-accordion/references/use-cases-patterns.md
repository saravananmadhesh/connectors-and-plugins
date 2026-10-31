# Use Cases and Patterns in Angular Accordion

## Table of Contents
- [Common API Patterns](#common-api-patterns)
- [FAQ Section Pattern](#faq-section-pattern)
- [Wizard Form Pattern](#wizard-form-pattern)
- [Settings Panels Pattern](#settings-panels-pattern)
- [Navigation Menu Pattern](#navigation-menu-pattern)
- [Help and Documentation](#help-and-documentation)
- [Data Explorer Pattern](#data-explorer-pattern)

## Common API Patterns

### Pattern 1: Basic Accordion with All Core Properties

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-basic-pattern',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      [items]="items"
      [expandMode]="'Multiple'"
      [animation]="animationSettings"
      enableRtl="false"
      enablePersistence="true"
      width="100%"
      height="auto">
    </ejs-accordion>
  `
})
export class AppComponent {
  public items = [
    { header: 'Item 1', content: 'Content 1', expanded: true },
    { header: 'Item 2', content: 'Content 2', disabled: false },
    { header: 'Item 3', content: 'Content 3', cssClass: 'custom' }
  ];

  public animationSettings = {
    expand: { effect: 'SlideDown', duration: 400, easing: 'ease-out' },
    collapse: { effect: 'SlideUp', duration: 400, easing: 'ease-in' }
  };
}
```

### Pattern 2: Event Handling with All Events

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';
import { ExpandEventArgs, AccordionClickArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-events-pattern',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion
      (created)="onCreated($event)"
      (expanding)="onExpanding($event)"
      (expanded)="onExpanded($event)"
      (clicked)="onClicked($event)"
      (destroying)="onDestroying($event)"
      (destroyed)="onDestroyed($event)"
      [items]="items">
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' }
  ];

  onCreated(event: Event) {
    console.log('Accordion created');
  }

  onExpanding(event: ExpandEventArgs) {
    console.log(`Expanding item ${event.index}`);
  }

  onExpanded(event: ExpandEventArgs) {
    console.log(`Expanded item ${event.index}`);
  }

  onClicked(event: AccordionClickArgs) {
    console.log('Item clicked:', event.item.header);
  }

  onDestroying(event: Event) {
    console.log('Accordion destroying');
  }

  onDestroyed(event: Event) {
    console.log('Accordion destroyed');
  }
}
```

### Pattern 3: Complete Method Usage

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-methods-pattern',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <button (click)="addItemDemo()">Add Item</button>
      <button (click)="removeItemDemo()">Remove Item</button>
      <button (click)="expandItemDemo()">Expand First</button>
      <button (click)="collapseItemDemo()">Collapse First</button>
      <button (click)="enableItemDemo()">Enable Item 2</button>
      <button (click)="disableItemDemo()">Disable Item 2</button>
      <button (click)="hideItemDemo()">Hide Item 3</button>
      <button (click)="showItemDemo()">Show Item 3</button>
      <button (click)="selectItemDemo()">Focus Item 1</button>
    </div>
    
    <ejs-accordion #accordion [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1', visible: true },
    { header: 'Item 2', content: 'Content 2', visible: true },
    { header: 'Item 3', content: 'Content 3', visible: true }
  ];

  addItemDemo() {
    this.accordionObj?.addItem({ header: 'New Item', content: 'New Content' });
  }

  removeItemDemo() {
    const lastIndex = (this.accordionObj?.items?.length || 1) - 1;
    this.accordionObj?.removeItem(lastIndex);
  }

  expandItemDemo() {
    this.accordionObj?.expandItem(true, 0);
  }

  collapseItemDemo() {
    this.accordionObj?.expandItem(false, 0);
  }

  enableItemDemo() {
    this.accordionObj?.enableItem(1, true);
  }

  disableItemDemo() {
    this.accordionObj?.enableItem(1, false);
  }

  hideItemDemo() {
    this.accordionObj?.hideItem(2, true);
  }

  showItemDemo() {
    this.accordionObj?.hideItem(2, false);
  }

  selectItemDemo() {
    this.accordionObj?.select(0);
  }
}
```

### Pattern 4: Item Properties - Complete Reference

```typescript
const completeItemExample = {
  // Content properties
  header: 'Item Header',                    // string | HTMLElement
  content: 'Item Content',                  // string | HTMLElement | Function
  
  // State properties
  expanded: false,                          // boolean
  disabled: false,                          // boolean
  visible: true,                            // boolean
  
  // Styling properties
  cssClass: 'custom-item',                  // string
  iconCss: 'fas fa-arrow-right',            // string
  
  // Identification
  id: 'item-1'                              // string
};
```

## FAQ Section Pattern

### Basic FAQ Structure

Create a frequently asked questions section with expandable answers:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div class="faq-container">
      <h2>Frequently Asked Questions</h2>
      
      <ejs-accordion expandMode="Multiple">
        <e-accordionitems>
          <e-accordionitem>
            <ng-template #header>
              <div class="faq-question">What is your return policy?</div>
            </ng-template>
            <ng-template #content>
              <div class="faq-answer">
                We offer a 30-day money-back guarantee on all products. If you're not satisfied, simply return the item in its original condition for a full refund.
              </div>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>
              <div class="faq-question">How long does shipping take?</div>
            </ng-template>
            <ng-template #content>
              <div class="faq-answer">
                Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.
              </div>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>
              <div class="faq-question">Do you ship internationally?</div>
            </ng-template>
            <ng-template #content>
              <div class="faq-answer">
                Yes, we ship to most countries worldwide. International shipping rates vary by destination and will be calculated at checkout.
              </div>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>
    </div>
  `,
  styles: [`
    .faq-container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .faq-question { font-weight: 600; color: #333; }
    .faq-answer { line-height: 1.6; color: #666; padding: 10px 0; }
  `]
})
export class FaqComponent {}
```

### FAQ with Search

Add search functionality to filter questions:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-searchable-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule],
  template: `
    <div class="faq-container">
      <h2>Search FAQ</h2>
      
      <input 
        type="text" 
        placeholder="Search questions..." 
        [(ngModel)]="searchTerm"
        (input)="filterFaqs()">
      
      <ejs-accordion expandMode="Multiple">
        <e-accordionitems>
          <e-accordionitem *ngFor="let item of filteredFaqs">
            <ng-template #header>
              <div class="faq-question">{{ item.question }}</div>
              <span class="category">{{ item.category }}</span>
            </ng-template>
            <ng-template #content>
              <div class="faq-answer">{{ item.answer }}</div>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>
    </div>
  `,
  styles: [`
    .faq-container { padding: 20px; max-width: 800px; }
    input { width: 100%; padding: 10px; margin-bottom: 20px; }
    .faq-question { font-weight: 600; }
    .category { float: right; font-size: 0.85em; color: #999; }
  `]
})
export class SearchableFaqComponent {
  public searchTerm = '';
  public allFaqs: FaqItem[] = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day money-back guarantee...',
      category: 'Shipping'
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order using the tracking number...',
      category: 'Shipping'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards and PayPal...',
      category: 'Payment'
    }
  ];

  public filteredFaqs = this.allFaqs;

  filterFaqs() {
    if (!this.searchTerm) {
      this.filteredFaqs = this.allFaqs;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredFaqs = this.allFaqs.filter(faq =>
      faq.question.toLowerCase().includes(term) ||
      faq.answer.toLowerCase().includes(term)
    );
  }
}
```

## Wizard Form Pattern

### Multi-Step Wizard with Validation

Create a step-by-step wizard where users progress through accordion items:

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule],
  template: `
    <div class="wizard-container">
      <h2>Registration Wizard</h2>
      
      <ejs-accordion #wizard expandMode="Single" (expanding)="onExpanding($event)">
        <e-accordionitems>
          <!-- Step 1: Personal Information -->
          <e-accordionitem expanded="true">
            <ng-template #header>
              <div class="step-header">
                <span class="step-number">1</span>
                <span>Personal Information</span>
                <span *ngIf="step1Complete" class="check">✓</span>
              </div>
            </ng-template>
            <ng-template #content>
              <div class="form-group">
                <label>First Name:</label>
                <input type="text" [(ngModel)]="formData.firstName">
              </div>
              <div class="form-group">
                <label>Last Name:</label>
                <input type="text" [(ngModel)]="formData.lastName">
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" [(ngModel)]="formData.email">
              </div>
              <button (click)="validateStep1()">Next</button>
            </ng-template>
          </e-accordionitem>

          <!-- Step 2: Address Information -->
          <e-accordionitem [disabled]="!step1Complete">
            <ng-template #header>
              <div class="step-header">
                <span class="step-number">2</span>
                <span>Address</span>
                <span *ngIf="step2Complete" class="check">✓</span>
              </div>
            </ng-template>
            <ng-template #content>
              <div class="form-group">
                <label>Street Address:</label>
                <input type="text" [(ngModel)]="formData.address">
              </div>
              <div class="form-group">
                <label>City:</label>
                <input type="text" [(ngModel)]="formData.city">
              </div>
              <div class="form-group">
                <label>Zip Code:</label>
                <input type="text" [(ngModel)]="formData.zipCode">
              </div>
              <button (click)="validateStep2()">Next</button>
            </ng-template>
          </e-accordionitem>

          <!-- Step 3: Review and Submit -->
          <e-accordionitem [disabled]="!step2Complete">
            <ng-template #header>
              <div class="step-header">
                <span class="step-number">3</span>
                <span>Review & Submit</span>
              </div>
            </ng-template>
            <ng-template #content>
              <div class="review-section">
                <h4>Personal Information</h4>
                <p><strong>Name:</strong> {{ formData.firstName }} {{ formData.lastName }}</p>
                <p><strong>Email:</strong> {{ formData.email }}</p>
                
                <h4>Address Information</h4>
                <p><strong>Address:</strong> {{ formData.address }}</p>
                <p><strong>City:</strong> {{ formData.city }}</p>
                <p><strong>Zip:</strong> {{ formData.zipCode }}</p>
              </div>
              <button (click)="submitForm()">Submit</button>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>

      <div *ngIf="submitted" class="success-message">
        Registration completed successfully!
      </div>
    </div>
  `,
  styles: [`
    .wizard-container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .step-header { display: flex; align-items: center; gap: 10px; }
    .step-number { 
      width: 30px; height: 30px; 
      background: #667eea; color: white; 
      border-radius: 50%; 
      display: flex; align-items: center; justify-content: center; 
      font-weight: bold;
    }
    .check { color: green; font-weight: bold; }
    .form-group { margin: 15px 0; }
    input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    button { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px; }
    .review-section { padding: 20px; background: #f5f5f5; border-radius: 4px; margin: 20px 0; }
    .success-message { color: green; font-weight: bold; margin-top: 20px; }
  `]
})
export class WizardComponent {
  @ViewChild('wizard') wizard?: AccordionComponent;

  public step1Complete = false;
  public step2Complete = false;
  public submitted = false;

  public formData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  };

  validateStep1() {
    if (this.formData.firstName && this.formData.lastName && this.formData.email) {
      this.step1Complete = true;
      this.wizard?.expandItem(true, 1);
    } else {
      alert('Please fill in all fields');
    }
  }

  validateStep2() {
    if (this.formData.address && this.formData.city && this.formData.zipCode) {
      this.step2Complete = true;
      this.wizard?.expandItem(true, 2);
    } else {
      alert('Please fill in all fields');
    }
  }

  submitForm() {
    this.submitted = true;
    console.log('Form submitted:', this.formData);
  }

  onExpanding(event: any) {
    // Prevent expanding step 2 if step 1 not complete
    if (event.item === this.wizard?.items?.[1] && !this.step1Complete) {
      event.cancel = true;
    }
    // Prevent expanding step 3 if step 2 not complete
    if (event.item === this.wizard?.items?.[2] && !this.step2Complete) {
      event.cancel = true;
    }
  }
}
```

## Settings Panels Pattern

### Grouped Settings

Organize settings into logical categories:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule],
  template: `
    <div class="settings-container">
      <h2>Application Settings</h2>
      
      <ejs-accordion expandMode="Multiple">
        <e-accordionitems>
          <!-- General Settings -->
          <e-accordionitem expanded="true">
            <ng-template #header>General Settings</ng-template>
            <ng-template #content>
              <div class="setting">
                <label>App Theme:</label>
                <select [(ngModel)]="settings.theme">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div class="setting">
                <label>Language:</label>
                <select [(ngModel)]="settings.language">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </ng-template>
          </e-accordionitem>

          <!-- Notification Settings -->
          <e-accordionitem expanded="true">
            <ng-template #header>Notifications</ng-template>
            <ng-template #content>
              <div class="checkbox-setting">
                <input type="checkbox" [(ngModel)]="settings.emailNotifications">
                <label>Email Notifications</label>
              </div>
              <div class="checkbox-setting">
                <input type="checkbox" [(ngModel)]="settings.pushNotifications">
                <label>Push Notifications</label>
              </div>
              <div class="checkbox-setting">
                <input type="checkbox" [(ngModel)]="settings.smsAlerts">
                <label>SMS Alerts</label>
              </div>
            </ng-template>
          </e-accordionitem>

          <!-- Privacy Settings -->
          <e-accordionitem>
            <ng-template #header>Privacy & Security</ng-template>
            <ng-template #content>
              <div class="checkbox-setting">
                <input type="checkbox" [(ngModel)]="settings.twoFactorAuth">
                <label>Enable Two-Factor Authentication</label>
              </div>
              <div class="checkbox-setting">
                <input type="checkbox" [(ngModel)]="settings.dataCollection">
                <label>Allow Data Collection</label>
              </div>
              <div class="setting">
                <label>Session Timeout (minutes):</label>
                <input type="number" [(ngModel)]="settings.sessionTimeout">
              </div>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>

      <button (click)="saveSettings()">Save Settings</button>
    </div>
  `,
  styles: [`
    .settings-container { max-width: 500px; margin: 0 auto; padding: 20px; }
    .setting { margin: 15px 0; }
    .checkbox-setting { margin: 10px 0; }
    input[type="text"], input[type="number"], select { width: 100%; padding: 8px; }
    label { display: block; margin-bottom: 5px; font-weight: 500; }
    button { background: #667eea; color: white; padding: 10px 20px; margin-top: 20px; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class SettingsComponent {
  public settings = {
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: false,
    twoFactorAuth: true,
    dataCollection: false,
    sessionTimeout: 30
  };

  saveSettings() {
    console.log('Settings saved:', this.settings);
    alert('Settings saved successfully!');
  }
}
```

## Navigation Menu Pattern

### Hierarchical Navigation

Create a navigation menu using nested accordions:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: `
    <div class="nav-container">
      <h3>Site Navigation</h3>
      
      <ejs-accordion expandMode="Single">
        <e-accordionitems>
          <e-accordionitem expanded="true">
            <ng-template #header>Products</ng-template>
            <ng-template #content>
              <ul class="menu-list">
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Clothing</a></li>
                <li><a href="#">Home & Garden</a></li>
                <li><a href="#">Sports & Outdoors</a></li>
              </ul>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>Services</ng-template>
            <ng-template #content>
              <ul class="menu-list">
                <li><a href="#">Consulting</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Training</a></li>
              </ul>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>Company</ng-template>
            <ng-template #content>
              <ul class="menu-list">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>
    </div>
  `,
  styles: [`
    .nav-container { background: #f5f5f5; padding: 20px; border-radius: 4px; }
    .menu-list { list-style: none; padding: 0; }
    .menu-list li { margin: 8px 0; }
    .menu-list a { text-decoration: none; color: #667eea; }
    .menu-list a:hover { text-decoration: underline; }
  `]
})
export class NavMenuComponent {}
```

## Help and Documentation

### Contextual Help

Display help and documentation in accordion format:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div class="help-container">
      <h2>Help & Documentation</h2>
      
      <ejs-accordion expandMode="Multiple">
        <e-accordionitems>
          <e-accordionitem>
            <ng-template #header>Getting Started</ng-template>
            <ng-template #content>
              <h4>Quick Start Guide</h4>
              <ol>
                <li>Create an account</li>
                <li>Set up your profile</li>
                <li>Start using the application</li>
                <li>Explore advanced features</li>
              </ol>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>Common Tasks</ng-template>
            <ng-template #content>
              <ul>
                <li>How to import data</li>
                <li>How to export reports</li>
                <li>How to manage users</li>
                <li>How to configure settings</li>
              </ul>
            </ng-template>
          </e-accordionitem>

          <e-accordionitem>
            <ng-template #header>Troubleshooting</ng-template>
            <ng-template #content>
              <p><strong>Q: Application won't load</strong></p>
              <p>A: Clear your browser cache and try again.</p>
              
              <p><strong>Q: Data not syncing</strong></p>
              <p>A: Check your internet connection and try refreshing the page.</p>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>
    </div>
  `,
  styles: [`
    .help-container { max-width: 700px; margin: 0 auto; padding: 20px; }
    h4 { margin-top: 0; }
    ol, ul { margin-left: 20px; }
    p { margin: 10px 0; }
  `]
})
export class HelpComponent {}
```

## Data Explorer Pattern

### Browse Hierarchical Data

Display expandable data categories:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

interface DataCategory {
  name: string;
  description: string;
  records: number;
}

@Component({
  selector: 'app-data-explorer',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  template: `
    <div class="explorer-container">
      <h2>Data Explorer</h2>
      
      <ejs-accordion expandMode="Multiple">
        <e-accordionitems>
          <e-accordionitem *ngFor="let category of categories">
            <ng-template #header>
              <div class="category-header">
                <span>{{ category.name }}</span>
                <span class="record-count">({{ category.records }} records)</span>
              </div>
            </ng-template>
            <ng-template #content>
              <div class="category-content">
                <p>{{ category.description }}</p>
                <button>View Data</button>
                <button>Export</button>
              </div>
            </ng-template>
          </e-accordionitem>
        </e-accordionitems>
      </ejs-accordion>
    </div>
  `,
  styles: [`
    .explorer-container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .category-header { display: flex; justify-content: space-between; width: 100%; }
    .record-count { color: #999; font-size: 0.9em; }
    .category-content { padding: 10px 0; }
    button { background: #667eea; color: white; padding: 8px 15px; margin-right: 10px; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class DataExplorerComponent {
  public categories: DataCategory[] = [
    {
      name: 'Customers',
      description: 'Customer information and profiles',
      records: 1250
    },
    {
      name: 'Orders',
      description: 'Order history and tracking',
      records: 5432
    },
    {
      name: 'Products',
      description: 'Product catalog and inventory',
      records: 345
    },
    {
      name: 'Reports',
      description: 'Sales and analytics reports',
      records: 89
    }
  ];
}
```

