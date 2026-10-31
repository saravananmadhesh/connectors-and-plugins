# Getting Started — Syncfusion Angular Mention

## Table of Contents
- [Prerequisites & Dependencies](#prerequisites--dependencies)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Import MentionModule](#import-mentionmodule)
- [Add Mention Component](#add-mention-component)
- [Binding a Data Source](#binding-a-data-source)
- [Display the Mention Character](#display-the-mention-character)
- [Run the Application](#run-the-application)

---

## Prerequisites & Dependencies

Ensure your development environment meets the [System Requirements for Syncfusion Angular UI Components](https://ej2.syncfusion.com/angular/documentation/system-requirement).

**Package dependency tree:**
```
@syncfusion/ej2-angular-dropdowns
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-dropdowns
        ├── @syncfusion/ej2-lists
        ├── @syncfusion/ej2-inputs
        ├── @syncfusion/ej2-navigations
        ├── @syncfusion/ej2-notifications
        └── @syncfusion/ej2-popups
              └── @syncfusion/ej2-buttons
```

---

## Installation

Use the Angular CLI schematic to install and auto-configure:

```bash
ng add @syncfusion/ej2-angular-dropdowns
```

This command:
- Adds `@syncfusion/ej2-angular-dropdowns` and peer dependencies to `package.json`
- Imports `MentionModule` in your application
- Registers the default Syncfusion Bootstrap 5 theme in `angular.json`

> **Angular 21 note:** Angular 21 uses standalone components by default. This guide uses the modern standalone architecture. For Angular 18 and below, see the NgModule approach below.

---

## CSS Imports

Add these imports to `styles.css` (order matters — import in dependency sequence):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/mention/index.css";
```

Replace `material3` with your preferred theme (e.g., `bootstrap5`, `fluent2`, `tailwind3`).

---

## Import MentionModule

### Angular 19+ (Standalone — Recommended)

Modify `src/app/app.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `<!-- Render Mention component -->`
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
```

### Angular 18 and Below (NgModule)

Modify `src/app/app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, MentionModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Add Mention Component

The Mention component requires a **target element** — a `div[contenteditable]`, `textarea`, or similar — specified via the `target` property.

```typescript
import { Component, OnInit } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label style="font-size: 15px; font-weight: 600;">Comments</label>
    <!-- Target element where Mention renders suggestions -->
    <div id="mentionElement"
         style="min-height: 100px; border: 1px solid #D7D7D7; border-radius: 4px; padding: 8px; font-size: 14px; width: 600px;">
    </div>
    <ejs-mention [target]="mentionTarget"></ejs-mention>
  `
})
export class AppComponent implements OnInit {
  // CSS selector string pointing to the target element
  public mentionTarget: string = '#mentionElement';

  ngOnInit(): void {}
}
```

> The `target` property accepts a CSS selector string or an `HTMLElement` reference. This is required — the Mention component listens to user input on this element.

---

## Binding a Data Source

Populate suggestions using the `dataSource` property. Pass an array of strings or objects:

```typescript
import { Component, OnInit } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type @ and tag user"
         style="min-height: 100px; border: 1px solid #D7D7D7; border-radius: 4px; padding: 8px;">
    </div>
    <ejs-mention [dataSource]="userData" [target]="mentionTarget"></ejs-mention>
  `
})
export class AppComponent implements OnInit {
  public userData: string[] = ['Selma Rose', 'Garth', 'Robert', 'William', 'Joseph'];
  public mentionTarget: string = '#mentionElement';

  ngOnInit(): void {}
}
```

**Behavior:** The suggestion popup opens when the user types `@` inside the target element.

---

## Display the Mention Character

By default, selected text is inserted **without** the trigger character. Use `showMentionChar` to include it, and `mentionChar` to customize the trigger:

```typescript
import { Component } from '@angular/core';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [MentionModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <label>Comments</label>
    <div id="mentionElement" placeholder="Type # and select a tag"></div>
    <ejs-mention
      [dataSource]="userData"
      [target]="mentionTarget"
      [showMentionChar]="true"
      [mentionChar]="mentionCharacter">
    </ejs-mention>
  `
})
export class AppComponent {
  public userData: string[] = ['Selma Rose', 'Garth', 'Robert', 'William', 'Joseph'];
  public mentionTarget: string = '#mentionElement';
  // Change trigger character to '#'
  public mentionCharacter: string = '#';
}
```

> **Default:** `mentionChar` is `@` and `showMentionChar` is `false`.

---

## Run the Application

```bash
ng serve --open
```

The app opens in your browser. Type `@` (or your custom character) inside the target element to see the suggestion popup.
