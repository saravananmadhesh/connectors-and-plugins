# Card Headers in Syncfusion Angular Cards

## Table of Contents
- [Header Structure](#header-structure)
- [Header Elements and Classes](#header-elements-and-classes)
- [Titles and Subtitles](#titles-and-subtitles)
- [Header Images](#header-images)
- [Image Positioning](#image-positioning)
- [Rounded Corners](#rounded-corners)
- [Complete Header Examples](#complete-header-examples)

---

## Header Structure

The Card header provides a semantic section for displaying contextual information like titles, subtitles, and avatars. Headers are entirely optional but commonly used for:

- **Display Headlines:** Main and secondary text
- **User Avatars:** Profile pictures or icons
- **Metadata:** Author, date, category labels
- **Visual Hierarchy:** Distinguish cards with varied header content

### Basic Header Container

```html
<div class="e-card">
  <div class="e-card-header">
    <!-- Header content goes here -->
  </div>
  <div class="e-card-content">
    <!-- Main content -->
  </div>
</div>
```

The `e-card-header` is a flexible container that can hold text and images in various arrangements.

---

## Header Elements and Classes

### CSS Classes for Headers

| Class | Purpose | Required |
|-------|---------|----------|
| `e-card-header` | Header container | Yes, for headers |
| `e-card-header-caption` | Text wrapper | Groups titles and subtitles |
| `e-card-header-title` | Main headline | Primary header text |
| `e-card-sub-title` | Secondary text | Supporting information |
| `e-card-header-image` | Image container | Avatar or header graphic |
| `e-card-corner` | Rounded image | Adds border-radius to images |

### Semantic Structure

```html
<div class="e-card-header">                    <!-- Header wrapper -->
  <div class="e-card-header-image"></div>      <!-- Image (optional, position 1) -->
  <div class="e-card-header-caption">          <!-- Text wrapper -->
    <div class="e-card-header-title"></div>    <!-- Main title -->
    <div class="e-card-sub-title"></div>       <!-- Subtitle (optional) -->
  </div>
  <!-- Image can also be positioned here for right-aligned layout -->
</div>
```

---

## Titles and Subtitles

### Title Only

The simplest header with just a title:

```html
<div class="e-card-header">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Card Title</div>
  </div>
</div>
```

### Title and Subtitle

Add supporting text below the title:

```html
<div class="e-card-header">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Main Title</div>
    <div class="e-card-sub-title">Supporting subtitle text</div>
  </div>
</div>
```

### Multiple Subtitles (via CSS)

Stack multiple subtitle-style lines using nested elements:

```html
<div class="e-card-header">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">John Doe</div>
    <div class="e-card-sub-title">Senior Developer</div>
    <div class="e-card-sub-title">Technology Lead</div>
  </div>
</div>
```

**CSS for spacing multiple subtitles:**

```css
.e-card-header .e-card-sub-title {
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.e-card-header .e-card-sub-title + .e-card-sub-title {
  margin-top: 2px;
}
```

---

## Header Images

### Basic Header Image

Add an image in the header (typically a small avatar):

```html
<div class="e-card-header">
  <div class="e-card-header-image" 
       style="width: 48px; height: 48px; 
               background-image: url('avatar.jpg');
               background-size: cover;">
  </div>
  <div class="e-card-header-caption">
    <div class="e-card-header-title">User Name</div>
  </div>
</div>
```

### Image with Caption

Position image before or after the caption:

**Image Before Caption (Left-aligned):**

```html
<div class="e-card-header">
  <div class="e-card-header-image" 
       style="width: 60px; height: 60px; 
               background-image: url('profile.jpg');
               background-size: cover;
               margin-right: 12px;">
  </div>
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Laura Callahan</div>
    <div class="e-card-sub-title">Sales Coordinator</div>
  </div>
</div>
```

**Image After Caption (Right-aligned):**

```html
<div class="e-card-header">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Laura Callahan</div>
    <div class="e-card-sub-title">Sales Coordinator</div>
  </div>
  <div class="e-card-header-image" 
       style="width: 60px; height: 60px; 
               background-image: url('profile.jpg');
               background-size: cover;
               margin-left: auto;">
  </div>
</div>
```

---

## Image Positioning

### Left-Aligned Image (Default)

Image appears to the left of text:

```html
<div class="e-card-header">
  <div class="e-card-header-image football e-card-corner"
       style="width: 48px; height: 48px;">
  </div>
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Laura Callahan</div>
    <div class="e-card-sub-title">Sales Coordinator and Representative</div>
  </div>
</div>
```

**CSS for left-aligned layout:**

```css
.e-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.e-card-header-image {
  flex-shrink: 0;
}

.e-card-header-caption {
  flex: 1;
}
```

### Right-Aligned Image

Image appears to the right of text:

```html
<div class="e-card-header">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Laura Callahan</div>
    <div class="e-card-sub-title">Sales Coordinator</div>
  </div>
  <div class="e-card-header-image football e-card-corner"
       style="width: 48px; height: 48px; margin-left: auto;">
  </div>
</div>
```

**CSS for right-aligned layout:**

```css
.e-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.e-card-header-image {
  flex-shrink: 0;
  margin-left: auto;
}

.e-card-header-caption {
  flex: 1;
}
```

### Centered Header Image

Center an image above the text (vertical layout):

```html
<div class="e-card-header" style="flex-direction: column; align-items: center; text-align: center;">
  <div class="e-card-header-image" 
       style="width: 80px; height: 80px; 
               background-image: url('avatar.jpg');
               background-size: cover;
               border-radius: 50%;
               margin-bottom: 12px;">
  </div>
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Jane Smith</div>
    <div class="e-card-sub-title">Product Manager</div>
  </div>
</div>
```

---

## Rounded Corners

### Using e-card-corner Class

Add the `e-card-corner` class to images for rounded corners:

```html
<div class="e-card-header-image e-card-corner"
     style="width: 48px; height: 48px; background-image: url('avatar.jpg');
             background-size: cover;">
</div>
```

### CSS for Rounded Corners

The `e-card-corner` class applies `border-radius: 4px`. For circular images:

```html
<div class="e-card-header-image"
     style="width: 48px; height: 48px; 
             background-image: url('avatar.jpg');
             background-size: cover;
             border-radius: 50%;">
</div>
```

### Customizing Border Radius

```css
/* Slight rounding (default) */
.e-card-header-image.e-card-corner {
  border-radius: 4px;
}

/* Fully rounded (circular) */
.e-card-header-image.rounded-circle {
  border-radius: 50%;
}

/* More rounded */
.e-card-header-image.rounded-lg {
  border-radius: 12px;
}
```

---

## Complete Header Examples

### Example 1: Product Card Header

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 300px;">
      <div class="e-card-header">
        <div class="e-card-header-image" 
             style="width: 80px; height: 80px; 
                     background-image: url('product.jpg');
                     background-size: cover;
                     margin-right: 12px;">
        </div>
        <div class="e-card-header-caption">
          <div class="e-card-header-title">Premium Widget</div>
          <div class="e-card-sub-title">Category: Electronics</div>
        </div>
      </div>
      <div class="e-card-content">
        High-quality widget with premium features and durability.
      </div>
    </div>
  `
})
export class ProductCardComponent {}
```

### Example 2: User Profile Header

```typescript
// user-card.component.ts
import { Component } from '@angular/core';

interface User {
  name: string;
  title: string;
  department: string;
  avatar: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 350px;">
      <div class="e-card-header user-header">
        <div class="e-card-header-image user-avatar" 
             [style.background-image]="'url(' + user.avatar + ')'">
        </div>
        <div class="e-card-header-caption">
          <div class="e-card-header-title">{{ user.name }}</div>
          <div class="e-card-sub-title">{{ user.title }}</div>
          <div class="e-card-sub-title">{{ user.department }}</div>
        </div>
      </div>
      <div class="e-card-content">
        Senior team member with expertise in multiple domains.
      </div>
    </div>
  `,
  styles: [`
    .user-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .user-avatar {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      background-size: cover;
      border-radius: 50%;
    }
  `]
})
export class UserCardComponent {
  user: User = {
    name: 'John Doe',
    title: 'Senior Developer',
    department: 'Engineering',
    avatar: 'assets/john.jpg'
  };
}
```

### Example 3: Article/Blog Header

```typescript
// blog-card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 400px;">
      <div class="e-card-header article-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">Angular Best Practices</div>
          <div class="e-card-sub-title">By Sarah Johnson</div>
          <div class="article-meta">March 27, 2026 • 8 min read</div>
        </div>
      </div>
      <div class="e-card-content">
        Learn essential patterns and techniques for building scalable Angular applications...
      </div>
      <div class="e-card-actions">
        <button class="e-card-btn">Read More</button>
      </div>
    </div>
  `,
  styles: [`
    .article-header {
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .e-card-header-title {
      color: white !important;
      font-size: 20px;
      font-weight: 600;
    }
    
    .e-card-sub-title {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    
    .article-meta {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 8px;
    }
  `]
})
export class BlogCardComponent {}
```

### Example 4: Multiple Cards with Headers

This example demonstrates the complete code snippet from utils (card-header-cs1):

```typescript
// cards-grid.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardData {
  title: string;
  subtitle: string;
  content: string;
  avatar: string;
}

@Component({
  selector: 'app-cards-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="margin: 50px;">
      <div tabindex="0" class="e-card" *ngFor="let card of cards">
        <div class="e-card-header">
          <div class="e-card-header-image football e-card-corner"></div>
          <div class="e-card-header-caption">
            <div class="e-card-header-title">{{ card.title }}</div>
            <div class="e-card-sub-title">{{ card.subtitle }}</div>
          </div>
        </div>
        <div class="e-card-content">
          {{ card.content }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .e-card {
      margin-bottom: 20px;
      max-width: 500px;
    }
  `]
})
export class CardsGridComponent {
  cards: CardData[] = [
    {
      title: 'Laura Callahan',
      subtitle: 'Sales Coordinator and Representative',
      content: 'Laura received a BA in psychology from the University of Washington. She has also completed a course in business French.',
      avatar: 'assets/laura.jpg'
    },
    {
      title: 'Michael King',
      subtitle: 'Project Manager',
      content: 'Michael leads cross-functional teams to deliver complex projects on time and within budget.',
      avatar: 'assets/michael.jpg'
    },
    {
      title: 'Emily Johnson',
      subtitle: 'UI/UX Designer',
      content: 'Emily specializes in creating intuitive and beautiful user interfaces for modern web applications.',
      avatar: 'assets/emily.jpg'
    }
  ];
}
```

---

## Common Header Patterns

### Pattern: Compact Header with Avatar

Minimal header with small avatar and text:

```html
<div class="e-card-header" style="display: flex; align-items: center; gap: 8px;">
  <div class="e-card-header-image" 
       style="width: 36px; height: 36px; 
               background-image: url('avatar.jpg');
               background-size: cover;
               border-radius: 50%;
               flex-shrink: 0;">
  </div>
  <div class="e-card-header-caption">
    <div class="e-card-header-title" style="font-size: 14px;">User Name</div>
  </div>
</div>
```

### Pattern: Large Header Image

Full-width header image with overlay text:

```html
<div class="e-card-header" style="position: relative; padding: 0;">
  <div style="background-image: url('banner.jpg'); 
              background-size: cover; 
              background-position: center;
              height: 200px;
              position: relative;">
    <div style="position: absolute; bottom: 0; left: 0; right: 0; 
                background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
                padding: 20px;
                color: white;">
      <div style="font-size: 20px; font-weight: 600;">Header Title</div>
      <div style="font-size: 14px; opacity: 0.9;">Subtitle text</div>
    </div>
  </div>
</div>
```

### Pattern: Status Badge Header

Header with title and status indicator:

```html
<div class="e-card-header" style="display: flex; align-items: center; justify-content: space-between;">
  <div class="e-card-header-caption">
    <div class="e-card-header-title">Task Name</div>
    <div class="e-card-sub-title">Assigned to John Doe</div>
  </div>
  <span style="background: #4CAF50; color: white; 
               padding: 4px 12px; border-radius: 20px; 
               font-size: 12px; font-weight: 500;">
    Active
  </span>
</div>
```

---

## Styling Tips

**Make headers stand out:**

```css
.e-card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.e-card-header-title {
  font-weight: 600;
  color: #333;
}

.e-card-header-image {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**Hover effects:**

```css
.e-card:hover .e-card-header-title {
  color: #007bff;
  transition: color 0.2s ease;
}
```

---

## Edge Cases

**Missing Avatar:** Provide fallback styling:

```css
.e-card-header-image {
  background-color: #e0e0e0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
```

**Long Text:** Use text truncation:

```css
.e-card-header-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

**Next:** Learn about images in card content in [Card Images](../card-images.md) reference.
