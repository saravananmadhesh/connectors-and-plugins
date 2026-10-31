# Getting Started with Syncfusion Angular Cards

## Table of Contents
- [Prerequisites and Setup](#prerequisites-and-setup)
- [Installing the Card Package](#installing-the-card-package)
- [CSS Theme Configuration](#css-theme-configuration)
- [Creating Your First Card](#creating-your-first-card)
- [Basic Structure](#basic-structure)
- [Adding Headers and Content](#adding-headers-and-content)
- [Complete Working Example](#complete-working-example)

---

## Prerequisites and Setup

Before implementing Syncfusion Angular Cards, ensure you have:

- **Node.js and npm:** Latest LTS version installed
- **Angular CLI:** Version 15+ (Angular 20+ recommended for standalone components)
- **Modern Browser:** Support for CSS flexbox and modern web standards
- **Code Editor:** VS Code or similar with TypeScript support

### Check Angular Version

```bash
ng version
```

The Card component works with Angular 12+ but this guide uses Angular 20+ standalone architecture for modern setup patterns.

---

## Installing the Card Package

### Step 1: Create New Angular Application

```bash
ng new syncfusion-card-app
cd syncfusion-card-app
```

When prompted, choose:
- **Style:** CSS (or SCSS if preferred)
- **Server-side rendering:** Choose your preference
- **AI Tool:** Select "none" unless you prefer assisted setup

### Step 2: Install Syncfusion Layouts Package

The Card component is part of the Syncfusion layouts package:

```bash
npm install @syncfusion/ej2-angular-layouts --save
```

**For Angular versions below 12 (legacy support):**

```bash
npm install @syncfusion/ej2-angular-layouts@ngcc --save
```

### Step 3: Verify Installation

Check that the package is added to `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-layouts": "^20.2.38",
    "@angular/common": "^21.0.0",
    "@angular/core": "^21.0.0"
  }
}
```

---

## CSS Theme Configuration

### Step 1: Add Theme Files

Open `src/styles.css` and add the Syncfusion CSS imports:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/card/index.css";
```

**Available Themes:**
- `material3.css` — Modern Material Design 3 (recommended)
- `material.css` — Material Design (classic)
- `bootstrap5.css` — Bootstrap 5 styling
- `fluent.css` — Microsoft Fluent design
- `tailwind.css` — Tailwind CSS theme

### Step 2: Application Styles

Your `src/styles.css` should now include:

```css
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
}

/* Syncfusion Themes */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material3.css';

/* Custom overrides (optional) */
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

---

## Creating Your First Card

### Step 1: Component Setup

Create or update `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Card';
}
```

### Step 2: HTML Template

Create or update `src/app/app.component.html`:

```html
<div class="container">
  <h1>{{ title }}</h1>
  
  <div class="e-card">
    <div class="e-card-header">
      <div class="e-card-header-caption">
        <div class="e-card-header-title">Welcome to Syncfusion Cards</div>
      </div>
    </div>
    <div class="e-card-content">
      This is your first Syncfusion Angular Card component!
    </div>
  </div>
</div>
```

### Step 3: Component Styles

Create or update `src/app/app.component.css`:

```css
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.e-card {
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Step 4: Run the Application

```bash
npm start
```

Navigate to `http://localhost:4200/`. Your first card will be displayed!

---

## Basic Structure

The Card component uses a semantic HTML structure with CSS classes:

```html
<div class="e-card">                    <!-- Root card container -->
  <div class="e-card-header">           <!-- Header section (optional) -->
    <div class="e-card-header-caption"> <!-- Caption wrapper -->
      <div class="e-card-header-title">Title</div>
      <div class="e-card-sub-title">Subtitle</div>
    </div>
  </div>
  
  <div class="e-card-content">          <!-- Main content area -->
    Card content goes here
  </div>
  
  <div class="e-card-actions">          <!-- Actions section (optional) -->
    <button class="e-card-btn">Action</button>
  </div>
</div>
```

**Key Points:**
- All sections are optional
- Styling is pure CSS (no JavaScript)
- Structure follows DOM natural flow for accessibility
- CSS classes provide semantic meaning

---

## Adding Headers and Content

### Simple Header Example

```html
<div class="e-card">
  <div class="e-card-header">
    <div class="e-card-header-caption">
      <div class="e-card-header-title">Card Title</div>
    </div>
  </div>
  
  <div class="e-card-content">
    This is the main content area of the card.
  </div>
</div>
```

### Header with Subtitle

```html
<div class="e-card">
  <div class="e-card-header">
    <div class="e-card-header-caption">
      <div class="e-card-header-title">Main Title</div>
      <div class="e-card-sub-title">Supporting subtitle or description</div>
    </div>
  </div>
  
  <div class="e-card-content">
    Main content goes here.
  </div>
</div>
```

### Content Area Patterns

The content section is flexible and can contain:

```html
<div class="e-card-content">
  <!-- Text content -->
  <p>Simple paragraph text</p>
  
  <!-- Lists -->
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  
  <!-- Multiple paragraphs -->
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

---

## Complete Working Example

Here's a complete, ready-to-use example with header, content, and basic styling:

### app.component.ts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards = [
    {
      id: 1,
      title: 'JavaScript Succinctly',
      subtitle: 'Essential Programming Concepts',
      content: 'A comprehensive guide to JavaScript fundamentals, objects, scope, inheritance, and more for developers at any level.'
    },
    {
      id: 2,
      title: 'Angular Best Practices',
      subtitle: 'Modern Web Development',
      content: 'Master standalone components, dependency injection, reactive forms, and build scalable Angular applications.'
    },
    {
      id: 3,
      title: 'Web Performance',
      subtitle: 'Optimization Techniques',
      content: 'Learn lazy loading, code splitting, bundling optimization, and performance monitoring techniques.'
    }
  ];
}
```

### app.component.html

```html
<div class="container">
  <h1>Getting Started with Cards</h1>
  <p class="subtitle">Multiple card examples with headers and content</p>
  
  <div class="cards-grid">
    <div class="e-card" *ngFor="let card of cards">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">{{ card.title }}</div>
          <div class="e-card-sub-title">{{ card.subtitle }}</div>
        </div>
      </div>
      
      <div class="e-card-content">
        {{ card.content }}
      </div>
      
      <div class="e-card-actions">
        <button class="e-card-btn">Learn More</button>
        <button class="e-card-btn">Save</button>
      </div>
    </div>
  </div>
</div>
```

### app.component.css

```css
.container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 32px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.e-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.e-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.e-card-header {
  padding: 16px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.e-card-header-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.e-card-sub-title {
  font-size: 14px;
  color: #999;
  margin-top: 4px;
}

.e-card-content {
  padding: 16px;
  line-height: 1.6;
  color: #555;
}

.e-card-actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
}

.e-card-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.e-card-btn:hover {
  background-color: #0056b3;
}

.e-card-btn:active {
  background-color: #003d82;
}
```

### main.ts (Bootstrap)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Next Steps

Now that you have your first card working:

1. **Add Headers with Images:** See [Card Headers](../card-headers.md) to include images in headers
2. **Include Content Images:** Read [Card Images](../card-images.md) to add images to content
3. **Interactive Buttons:** Explore [Action Buttons](../action-buttons.md) for event handling
4. **Horizontal Layouts:** Check [Horizontal Layout](../horizontal-layout.md) for side-by-side layouts
5. **Custom Styling:** Visit [Styling and Customization](../styling-customization.md) for CSS techniques

---

## Common Issues

**Issue:** Cards not displaying
- **Check:** Are CSS imports in `src/styles.css`?
- **Verify:** Package installation: `npm list @syncfusion/ej2-angular-layouts`

**Issue:** Styles not applying
- **Check:** Development server restarted after CSS changes
- **Verify:** Theme CSS is imported before custom styles

**Issue:** TypeScript errors
- **Check:** Using `standalone: true` in component
- **Update:** `ng version` to ensure Angular 20+

---

**Ready for more?** Each reference file builds on these fundamentals with advanced patterns and techniques.
