# Getting Started with Angular MaskedTextBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Basic Implementation](#basic-implementation)
- [Setting a Mask](#setting-a-mask)
- [Running the Application](#running-the-application)

## Prerequisites

Create an Angular app using Angular CLI:

```bash
ng new my-app
cd my-app
ng serve
```

## Installation

Install the Syncfusion inputs package that contains the MaskedTextBox:

```bash
npm install @syncfusion/ej2-angular-inputs --save
```

## CSS Setup

Add CSS imports in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/maskedtextbox/index.css";
```

## Basic Implementation

### Step 1: Import MaskedTextBoxModule

Update `src/app/app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MaskedTextBoxModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 2: Add to Component

Create or update `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MaskedTextBox App';
}
```

### Step 3: Add to Template

Update `src/app/app.component.html`:

```html
<ejs-maskedtextbox placeholder="Enter Name"></ejs-maskedtextbox>
```

## Setting a Mask

Use the `mask` property to enforce a specific input format. Without a mask, MaskedTextBox behaves as a plain text input.

### Component

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  phoneMask: string = '000-000-0000';
}
```

### Template

```html
<div>
  <label class="label">Enter the mobile number</label>
  <ejs-maskedtextbox [mask]="phoneMask"></ejs-maskedtextbox>
</div>
```

## Floating Label

Use `floatLabelType` to control how the placeholder/label behaves:

```html
<!-- Placeholder floats above when focused or filled -->
<ejs-maskedtextbox
  [mask]="phoneMask"
  placeholder="Phone Number"
  floatLabelType="Auto">
</ejs-maskedtextbox>

<!-- Label always floats above -->
<ejs-maskedtextbox
  [mask]="phoneMask"
  placeholder="Phone Number"
  floatLabelType="Always">
</ejs-maskedtextbox>
```

## Running the Application

```bash
ng serve
```

The application opens in the browser. The `_` character is the default prompt character showing available input positions.

> **Tip:** The `mask` property is the primary configuration — without it, MaskedTextBox behaves as a plain text input. Always set `mask` for format enforcement.

## Reference Documentation

For complete API documentation, visit:
https://ej2.syncfusion.com/angular/documentation/maskedtextbox/getting-started
