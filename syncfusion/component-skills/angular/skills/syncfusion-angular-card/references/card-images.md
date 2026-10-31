# Card Images in Syncfusion Angular Cards

## Table of Contents
- [Adding Images to Cards](#adding-images-to-cards)
- [Image Sizing and Dimensions](#image-sizing-and-dimensions)
- [Image Titles and Captions](#image-titles-and-captions)
- [Dividers for Visual Separation](#dividers-for-visual-separation)
- [Image Styling Techniques](#image-styling-techniques)
- [Integrating Other Components](#integrating-other-components)
- [Complete Image Examples](#complete-image-examples)

---

## Adding Images to Cards

### Basic Image Container

Add images to card content using the `e-card-image` class:

```html
<div class="e-card">
  <div class="e-card-image"></div>
  <div class="e-card-content">
    Content below the image
  </div>
</div>
```

By default, `e-card-image` occupies the full width of the card. Use CSS to set the background image:

```html
<div class="e-card">
  <div class="e-card-image" 
       style="background-image: url('hero-image.jpg');
               background-size: cover;
               background-position: center;
               height: 250px;">
  </div>
  <div class="e-card-content">
    Content positioned below the image
  </div>
</div>
```

### Image Placement

**Image at Top (default):**

```html
<div class="e-card">
  <div class="e-card-image" style="height: 200px; background-image: url('top.jpg'); background-size: cover;"></div>
  <div class="e-card-header">
    <div class="e-card-header-caption">
      <div class="e-card-header-title">Title</div>
    </div>
  </div>
  <div class="e-card-content">Content</div>
</div>
```

**Image with Header:**

```html
<div class="e-card">
  <div class="e-card-header">
    <div class="e-card-header-caption">
      <div class="e-card-header-title">Title</div>
    </div>
  </div>
  <div class="e-card-image" style="height: 250px; background-image: url('image.jpg'); background-size: cover;"></div>
  <div class="e-card-content">Content</div>
</div>
```

### Responsive Images

Make images responsive with max-width:

```css
.e-card-image {
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}

@media (max-width: 600px) {
  .e-card-image {
    height: 180px;
  }
}
```

---

## Image Sizing and Dimensions

### Fixed Height Images

```html
<div class="e-card-image" 
     style="height: 250px; 
             background-image: url('image.jpg');
             background-size: cover;
             background-position: center;">
</div>
```

### Aspect Ratio Preserved

Use padding-bottom trick for consistent aspect ratios:

```css
.e-card-image {
  background-size: cover;
  background-position: center;
  width: 100%;
  padding-bottom: 75%; /* 4:3 aspect ratio */
  height: 0;
}
```

### Square Images

```css
.e-card-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
}
```

### Custom Dimensions

```html
<!-- Small thumbnail -->
<div class="e-card-image" 
     style="height: 120px; width: 120px;">
</div>

<!-- Wide banner -->
<div class="e-card-image" 
     style="height: 300px; width: 100%;">
</div>

<!-- Full width tall image -->
<div class="e-card-image" 
     style="height: 400px; width: 100%;">
</div>
```

---

## Image Titles and Captions

### Basic Image Title

Add a title overlay on the image:

```html
<div class="e-card-image" 
     style="background-image: url('image.jpg');
             background-size: cover;
             background-position: center;
             height: 250px;
             position: relative;">
  <div class="e-card-title">Image Caption</div>
</div>
```

### Default Positioning

By default, `e-card-title` is positioned in the **bottom-left** with an overlay effect:

```css
.e-card-image .e-card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
}
```

### Custom Title Positioning

**Top-Left:**

```html
<div class="e-card-image" style="position: relative; height: 250px; background-image: url('image.jpg'); background-size: cover;">
  <div class="e-card-title e-card-top-left">Top Left Title</div>
</div>
```

```css
.e-card-image .e-card-title.e-card-top-left {
  top: 0;
  bottom: auto;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
}
```

**Top-Right:**

```html
<div class="e-card-image" style="position: relative; height: 250px; background-image: url('image.jpg'); background-size: cover;">
  <div class="e-card-title e-card-top-right">Top Right</div>
</div>
```

```css
.e-card-image .e-card-title.e-card-top-right {
  top: 0;
  bottom: auto;
  left: auto;
  right: 0;
  text-align: right;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
}
```

**Bottom-Right:**

```html
<div class="e-card-image" style="position: relative; height: 250px; background-image: url('image.jpg'); background-size: cover;">
  <div class="e-card-title e-card-bottom-right">Bottom Right</div>
</div>
```

```css
.e-card-image .e-card-title.e-card-bottom-right {
  right: 0;
  left: auto;
  text-align: right;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}
```

### Complete Image Example

```typescript
// image-card.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="e-card" style="max-width: 400px;">
      <div class="e-card-image">
        <div class="e-card-title">JavaScript</div>
      </div>
      <div class="e-card-content">
        JavaScript Succinctly was written to give readers an accurate, concise examination of JavaScript objects and their supporting nuances, such as complex values, primitive values, scope, inheritance, the head object, and more.
      </div>
    </div>
  `,
  styles: [`
    .e-card-image {
      background-image: url('assets/js-book.jpg');
      background-size: cover;
      background-position: center;
      height: 200px;
      position: relative;
    }

    .e-card-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      padding: 16px;
      font-size: 18px;
      font-weight: 600;
    }
  `]
})
export class ImageCardComponent {}
```

---

## Dividers for Visual Separation

### Basic Divider

Add visual separation between card sections:

```html
<div class="e-card">
  <div class="e-card-title">Explore Cities</div>
  <div class="e-card-separator"></div>
  <div class="e-card-content">
    Sydney is a city on the east coast of Australia.
  </div>
  <div class="e-card-separator"></div>
  <div class="e-card-content">
    New York City has been described as the cultural, financial, and media capital of the world.
  </div>
  <div class="e-card-separator"></div>
  <div class="e-card-content">
    Malaysia is one of the Southeast Asian countries.
  </div>
</div>
```

### Divider Styling

Default divider appearance:

```css
.e-card-separator {
  height: 1px;
  background-color: #ddd;
  margin: 16px 0;
}
```

### Custom Divider Styles

**Thick Divider:**

```css
.e-card-separator {
  height: 2px;
  background-color: #999;
}
```

**Colored Divider:**

```css
.e-card-separator {
  height: 2px;
  background: linear-gradient(to right, #667eea, #764ba2);
}
```

**Dashed Divider:**

```css
.e-card-separator {
  height: 1px;
  border-top: 1px dashed #ccc;
  background: none;
}
```

**Reduced Spacing:**

```css
.e-card-separator {
  margin: 8px 0;
  padding-bottom: 30px;
}
```

### Multiple Sections with Dividers

```html
<div class="e-card">
  <div class="e-card-title">Multi-Section Card</div>
  
  <div class="e-card-separator"></div>
  
  <div class="e-card-content">
    <strong>Section 1</strong>
    <p>First section content</p>
  </div>
  
  <div class="e-card-separator"></div>
  
  <div class="e-card-content">
    <strong>Section 2</strong>
    <p>Second section content</p>
  </div>
  
  <div class="e-card-separator"></div>
  
  <div class="e-card-actions">
    <button class="e-card-btn">Action</button>
  </div>
</div>
```

---

## Image Styling Techniques

### Image Filters

Apply effects to images:

```css
.e-card-image {
  background-image: url('image.jpg');
  background-size: cover;
  height: 250px;
  filter: brightness(0.8) contrast(1.2);
}

/* Hover effect */
.e-card:hover .e-card-image {
  filter: brightness(1) contrast(1);
}
```

### Image Gradient Overlay

Add gradient over images for better text contrast:

```html
<div class="e-card-image" 
     style="background-image: url('image.jpg');
             background-size: cover;
             height: 250px;
             position: relative;">
  <div style="position: absolute; 
              top: 0; left: 0; right: 0; bottom: 0;
              background: linear-gradient(135deg, 
                rgba(102, 126, 234, 0.4), 
                rgba(118, 75, 162, 0.4));">
  </div>
  <div class="e-card-title" style="position: relative; z-index: 1;">Title</div>
</div>
```

### Border and Shadow Effects

```css
.e-card-image {
  border: 3px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.e-card:hover .e-card-image {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
```

---

## Integrating Other Components

### Integrating ListView Components

Combine cards with Syncfusion components like ListView:

```typescript
// card-with-list.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ListView } from '@syncfusion/ej2-lists';

@Component({
  selector: 'app-card-with-list',
  standalone: true,
  template: `
    <div style="margin: 50px;">
      <div tabindex="0" class="e-card" id="basic">
        <div class="e-card-title">To-Do List</div>
        <div class="e-card-separator"></div>
        <div class="e-card-content">
          <div #listContainer id="element"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .e-card {
      max-width: 400px;
    }
  `]
})
export class CardWithListComponent implements AfterViewInit {
  @ViewChild('listContainer') listContainer!: ElementRef;

  ngAfterViewInit() {
    // Define array of objects
    const todoList: { [key: string]: Object }[] = [
      { todoList: 'Pay Bills' },
      { todoList: 'Call Chris' },
      { todoList: 'Meet Andrew' },
      { todoList: 'Visit Manager' },
      { todoList: 'Customer Meeting' }
    ];

    // Initialize ListView component
    const listviewInstance: ListView = new ListView({
      dataSource: todoList,
      fields: { text: 'todoList' },
      showCheckBox: true
    });

    // Render initialized ListView
    listviewInstance.appendTo('#element');
  }
}
```

### Integrating with Charts or Other Components

```html
<div class="e-card">
  <div class="e-card-header">
    <div class="e-card-header-title">Sales Analytics</div>
  </div>
  <div class="e-card-content">
    <!-- Chart component would go here -->
    <app-sales-chart></app-sales-chart>
  </div>
</div>
```

---

## Complete Image Examples

### Example 1: Simple Image Card

```typescript
// simple-image-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-image-card',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 300px;">
      <div class="e-card-image">
        <div class="e-card-title">JavaScript</div>
      </div>
      <div class="e-card-content">
        JavaScript Succinctly was written to give readers an accurate, concise examination of JavaScript objects and their supporting nuances.
      </div>
    </div>
  `,
  styles: [`
    .e-card-image {
      background-image: url('assets/javascript-book.jpg');
      background-size: cover;
      background-position: center;
      height: 200px;
      position: relative;
    }

    .e-card-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      padding: 16px;
      font-size: 18px;
      font-weight: 600;
    }
  `]
})
export class SimpleImageCardComponent {}
```

### Example 2: Card with Multiple Dividers (from utils)

```typescript
// cards-grid-dividers.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-grid-dividers',
  standalone: true,
  template: `
    <div tabindex="0" class="e-card" id="basic">
      <div class="e-card-title">Explore Cities</div>
      <div class="e-card-separator"></div>
      <div class="e-card-content">
        Sydney is a city on the east coast of Australia. Sydney is the capital city of New South Wales. About four million people
        live in Sydney which makes it the biggest city in Oceania.
      </div>
      <div class="e-card-separator"></div>
      <div class="e-card-content">
        New York City has been described as the cultural, financial, and media capital of the world, and exerts a significant impact
        upon commerce and etc.,
      </div>
      <div class="e-card-separator"></div>
      <div class="e-card-content">
        Malaysia is one of the Southeast Asian countries, on a peninsula of the Asian continent, to a certain extent; it can be recognized
        as part of the Asian continent.
      </div>
    </div>
  `,
  styles: [`
    .e-card {
      max-width: 600px;
    }
  `]
})
export class CardsGridDividersComponent {}
```

### Example 3: Responsive Image Grid

```typescript
// image-gallery-cards.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-image-gallery-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-container">
      <div class="e-card" *ngFor="let item of items">
        <div class="e-card-image" [style.background-image]="'url(' + item.image + ')'">
          <div class="e-card-title">{{ item.title }}</div>
        </div>
        <div class="e-card-content">
          {{ item.description }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      padding: 20px;
    }

    .e-card-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .e-card-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      padding: 16px;
      font-weight: 600;
    }

    .e-card:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      transform: translateY(-4px);
      transition: all 0.3s ease;
    }
  `]
})
export class ImageGalleryCardsComponent {
  items: CardItem[] = [
    {
      id: 1,
      image: 'assets/city1.jpg',
      title: 'Sydney Opera House',
      description: 'Iconic architectural landmark in Sydney, Australia'
    },
    {
      id: 2,
      image: 'assets/city2.jpg',
      title: 'New York Skyline',
      description: 'The Manhattan skyline featuring world-famous skyscrapers'
    },
    {
      id: 3,
      image: 'assets/city3.jpg',
      title: 'Malaysian Landscape',
      description: 'Tropical beauty of Southeast Asia'
    }
  ];
}
```

---

## Common Patterns

### Pattern: Image with Content Below

Perfect for blogs, product listings, or galleries:

```html
<div class="e-card">
  <div class="e-card-image" style="height: 240px; background-image: url('item.jpg'); background-size: cover;"></div>
  <div class="e-card-content">
    <h3>Item Title</h3>
    <p>Item description and details</p>
  </div>
</div>
```

### Pattern: Image with Title Overlay

Professional look with text overlaid on image:

```html
<div class="e-card">
  <div class="e-card-image" style="position: relative; height: 300px; background-image: url('hero.jpg'); background-size: cover;">
    <div class="e-card-title">Hero Title</div>
  </div>
  <div class="e-card-content">Content below</div>
</div>
```

### Pattern: Multiple Images with Separators

Showcase multiple images in one card:

```html
<div class="e-card">
  <div class="e-card-image" style="height: 200px; background-image: url('image1.jpg'); background-size: cover;"></div>
  <div class="e-card-separator"></div>
  <div class="e-card-image" style="height: 200px; background-image: url('image2.jpg'); background-size: cover;"></div>
  <div class="e-card-separator"></div>
  <div class="e-card-content">Image gallery with descriptions</div>
</div>
```

---

## Troubleshooting

**Issue:** Image not displaying
- **Check:** `background-image` URL is correct and accessible
- **Verify:** `height` is set (background images need dimensions)
- **Try:** Use `background-size: cover` or `contain`

**Issue:** Title text hard to read on image
- **Solution:** Add gradient overlay with `background: linear-gradient(...)`
- **Try:** Increase opacity or add text shadow

**Issue:** Image looks stretched
- **Fix:** Use `background-size: cover` or `contain` instead of `auto`
- **Ensure:** Aspect ratio is consistent

---

**Next:** Add interactive buttons to cards in [Action Buttons](../action-buttons.md) reference.
