# Getting Started with Angular Tabs

## Table of Contents
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Rendering Methods](#rendering-methods)
- [Basic Setup](#basic-setup)

## Installation

### Prerequisites
- Node.js and npm installed
- Angular 12+ (this guide uses Angular 21 standalone components)

### Create a New Angular Application

Use Angular CLI to set up a new project:

```bash
npm install -g @angular/cli
ng new syncfusion-angular-app
```

During creation, you'll be prompted to choose:
- Stylesheet format (CSS, SCSS, Less)
- Server-side rendering (SSR)
- AI tool integration

Navigate to the project directory:

```bash
cd syncfusion-angular-app
```

### Install Syncfusion Tab Package

Add the Syncfusion navigations package to your application:

```bash
npm install @syncfusion/ej2-angular-navigations --save
```

For Angular versions below 12, use the ngcc (Angular compatibility compiler) package:

```bash
npm install @syncfusion/ej2-angular-navigations@ngcc --save
```
## CSS Setup

Add the required CSS imports to your global stylesheet `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tab/index.css";
```

Available themes: material3, bootstrap, bootstrap4, bootstrap5, fabric, high-contrast, tailwind, fluent, fluent2

## Rendering Methods

### Method 1: JSON Items Collection

Define tabs using a JSON array with header and content properties:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element">
      <e-tabitems>
        <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
        <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Twitter' },
    { text: 'Facebook' },
    { text: 'WhatsApp' }
  ];

  public content0 = 'Twitter is an online social networking service...';
  public content1 = 'Facebook is an online social networking service...';
  public content2 = 'WhatsApp Messenger is a proprietary cross-platform...';
}
```

**Advantages:**
- Simple data-driven approach
- Easy to bind from arrays or API responses
- Quick to implement

**When to use:**
- String content or simple HTML
- Binding from data sources
- Dynamic tab creation

### Method 2: ng-template Approach

Use Angular templates for header and content:

```typescript
@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element">
      <e-tabitems>
        <e-tabitem>
          <ng-template #headerText>
            <div>Twitter</div>
          </ng-template>
          <ng-template #content>
            Twitter is an online social networking service that enables users
            to send and read short 140-character messages called "tweets".
          </ng-template>
        </e-tabitem>
        <e-tabitem>
          <ng-template #headerText>
            <div>Facebook</div>
          </ng-template>
          <ng-template #content>
            Facebook is an online social networking service headquartered
            in Menlo Park, California.
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

**Advantages:**
- Full control over header and content HTML
- Can include complex markup
- Supports nested templates

**When to use:**
- Complex HTML content
- Custom header styling
- Component integration

### Method 3: HTML Elements Structure

Use HTML wrapper elements with specific CSS classes:

```typescript
@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element">
      <div class="e-tab-header">
        <div>Twitter</div>
        <div>Facebook</div>
        <div>WhatsApp</div>
      </div>
      <div class="e-content">
        <div>
          Twitter is an online social networking service that enables users
          to send and read short 140-character messages called "tweets".
        </div>
        <div>
          Facebook is an online social networking service headquartered
          in Menlo Park, California.
        </div>
        <div>
          WhatsApp Messenger is a proprietary cross-platform instant messaging
          client for smartphones.
        </div>
      </div>
    </ejs-tab>
  `
})
export class AppComponent { }
```

**Key CSS Classes:**
- `e-tab-header` - Wrapper for all headers
- `e-content` - Wrapper for all content panels
- Individual divs within each wrapper become items

**Advantages:**
- Direct HTML control
- No template syntax needed
- Simpler for static content

**When to use:**
- Static HTML content
- Server-rendered content
- Simple tab structures

## Basic Setup

Minimal Tab implementation:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Home' }" content="Welcome home!"></e-tabitem>
        <e-tabitem [header]="{ text: 'About' }" content="About this app"></e-tabitem>
        <e-tabitem [header]="{ text: 'Contact' }" content="Contact us"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Run Your Application

```bash
npm start
```

The app will start on `http://localhost:4200` by default. You should see your tabs rendered.

## Module vs Standalone

**Standalone Architecture (Recommended - Angular 21+):**
```typescript
@Component({
  imports: [TabModule],  // Direct module import
  standalone: true,
  selector: 'app-root',
  template: `...`
})
```

**Module-based Architecture (Angular <21):**
```typescript
@NgModule({
  imports: [TabModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Next Steps

- Explore different **content rendering modes** (On Demand, Dynamic, Init)
- Learn about **tab selection** and event handling
- Customize **headers and styling**
- Add **animations and effects**
- Implement **dynamic tab operations** (add, remove, show, hide)
