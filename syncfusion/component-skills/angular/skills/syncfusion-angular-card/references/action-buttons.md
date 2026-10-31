# Action Buttons in Syncfusion Angular Cards

## Table of Contents
- [Creating Action Buttons](#creating-action-buttons)
- [Button Container Structure](#button-container-structure)
- [Horizontal Alignment (Default)](#horizontal-alignment-default)
- [Vertical Alignment](#vertical-alignment)
- [Icon Buttons](#icon-buttons)
- [Styling and Customization](#styling-and-customization)
- [Event Handling](#event-handling)
- [Complete Button Examples](#complete-button-examples)

---

## Creating Action Buttons

### Basic Action Button

Add interactive buttons to cards with the `e-card-actions` container:

```html
<div class="e-card">
  <div class="e-card-header">
    <div class="e-card-header-caption">
      <div class="e-card-header-title">Action Example</div>
    </div>
  </div>
  <div class="e-card-content">
    Card content goes here
  </div>
  <div class="e-card-actions">
    <button class="e-card-btn">Action 1</button>
    <button class="e-card-btn">Action 2</button>
  </div>
</div>
```

### Button Elements

You can use both `<button>` and `<a>` elements with the `e-card-btn` class:

```html
<div class="e-card-actions">
  <!-- Button element -->
  <button class="e-card-btn">Submit</button>
  
  <!-- Anchor (link) element -->
  <a href="#" class="e-card-btn">Share</a>
  
  <!-- Link with target -->
  <a href="/details" class="e-card-btn" target="_blank">Learn More</a>
</div>
```

---

## Button Container Structure

### e-card-actions Container

The `e-card-actions` div is a flexible container for action elements:

```html
<div class="e-card-actions">
  <!-- Place buttons here -->
</div>
```

**CSS Structure:**

```css
.e-card-actions {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
}
```

### Button Class Styling

The `e-card-btn` class provides default button styling:

```css
.e-card-btn {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.e-card-btn:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

.e-card-btn:active {
  background-color: #e0e0e0;
}
```

---

## Horizontal Alignment (Default)

Buttons are aligned horizontally by default, filling available space equally:

```html
<div class="e-card" style="max-width: 400px;">
  <div class="e-card-header-title">Eiffel Tower</div>
  <div class="e-card-content">
    The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
  </div>
  <div class="e-card-actions">
    <button class="e-card-btn">
      <img src="./fav.png" style="height: 18px;width: 18px;" title="Bookmark">
    </button>
    <button class="e-card-btn">
      <img src="./like.png" style="height: 18px;width: 18px;" title="Like">
    </button>
    <button class="e-card-btn">
      <img src="./share.png" style="height: 18px;width: 18px;" title="Share">
    </button>
  </div>
</div>
```

### CSS for Horizontal Layout

```css
.e-card-actions {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.e-card-btn {
  flex: 1;
  /* Buttons share equal width */
}
```

### Variable Width Buttons

Let buttons size to their content:

```css
.e-card-btn {
  flex: none;
  padding: 10px 16px;
}
```

```html
<div class="e-card-actions">
  <button class="e-card-btn">Short</button>
  <button class="e-card-btn">Save Changes</button>
  <button class="e-card-btn">X</button>
</div>
```

---

## Vertical Alignment

Stack buttons vertically by adding the `e-card-vertical` class:

```html
<div class="e-card" style="max-width: 400px;">
  <div class="e-card-header-title">Eiffel Tower</div>
  <div class="e-card-content">
    The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
  </div>
  <div class="e-card-actions e-card-vertical">
    <button class="e-card-btn">LIKE</button>
    <button class="e-card-btn">SHARE</button>
  </div>
</div>
```

### CSS for Vertical Layout

```css
.e-card-actions.e-card-vertical {
  flex-direction: column;
  gap: 8px;
}

.e-card-actions.e-card-vertical .e-card-btn {
  width: 100%;
}
```

### Vertical with Icon Buttons

```html
<div class="e-card-actions e-card-vertical">
  <button class="e-card-btn icon-btn">
    <i class="icon-heart"></i> Like
  </button>
  <button class="e-card-btn icon-btn">
    <i class="icon-share"></i> Share
  </button>
  <button class="e-card-btn icon-btn">
    <i class="icon-bookmark"></i> Save
  </button>
</div>
```

---

## Icon Buttons

### Image Icon Buttons

Use images as button icons (from utils example):

```html
<div class="e-card-actions">
  <button class="e-card-btn">
    <img src="./fav.png" style="height: 18px;width: 18px;" title="Bookmark">
  </button>
  <button class="e-card-btn">
    <img src="./like.png" style="height: 18px;width: 18px;" title="Like">
  </button>
  <button class="e-card-btn">
    <img src="./share.png" style="height: 18px;width: 18px;" title="Share">
  </button>
</div>
```

### Icon with Text

```html
<div class="e-card-actions">
  <button class="e-card-btn">
    <span style="display: flex; align-items: center; justify-content: center; gap: 6px;">
      <img src="./icon.png" style="height: 16px; width: 16px;">
      Action
    </span>
  </button>
</div>
```

### SVG Icons

```html
<div class="e-card-actions">
  <button class="e-card-btn">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  </button>
</div>
```

---

## Styling and Customization

### Primary Button Style

```css
.e-card-btn.btn-primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.e-card-btn.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
```

```html
<button class="e-card-btn btn-primary">Primary Action</button>
```

### Success Button Style

```css
.e-card-btn.btn-success {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.e-card-btn.btn-success:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}
```

### Danger Button Style

```css
.e-card-btn.btn-danger {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

.e-card-btn.btn-danger:hover {
  background-color: #c82333;
  border-color: #c82333;
}
```

### Outline Button Style

```css
.e-card-btn.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.e-card-btn.btn-outline:hover {
  background-color: #007bff;
  color: white;
}
```

### Disabled Button

```css
.e-card-btn:disabled,
.e-card-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #e0e0e0;
}

.e-card-btn:disabled:hover {
  background-color: #e0e0e0;
}
```

```html
<button class="e-card-btn" disabled>Disabled</button>
```

### Button Sizes

```css
/* Small button */
.e-card-btn.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

/* Large button */
.e-card-btn.btn-lg {
  padding: 14px 20px;
  font-size: 16px;
}
```

### Rounded Buttons

```css
.e-card-btn.btn-rounded {
  border-radius: 24px;
}

/* Fully rounded (pill shape) */
.e-card-btn.btn-pill {
  border-radius: 50px;
  padding: 10px 20px;
}
```

---

## Event Handling

### Click Events

```typescript
// card-with-buttons.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-with-buttons',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 400px;">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">Interactive Card</div>
        </div>
      </div>
      <div class="e-card-content">
        {{ message }}
      </div>
      <div class="e-card-actions">
        <button class="e-card-btn" (click)="onSave()">Save</button>
        <button class="e-card-btn" (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `
})
export class CardWithButtonsComponent {
  message = 'Click a button to see the message';

  onSave() {
    this.message = '✓ Changes saved successfully!';
  }

  onCancel() {
    this.message = 'Action cancelled';
  }
}
```

### Button State Management

```typescript
// card-with-state.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-with-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="e-card" style="max-width: 400px;">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">{{ title }}</div>
        </div>
      </div>
      <div class="e-card-content">
        {{ isLiked ? '❤️ You liked this' : '🤍 Like this card' }}
      </div>
      <div class="e-card-actions">
        <button class="e-card-btn"
                [class.btn-active]="isLiked"
                (click)="toggleLike()">
          {{ isLiked ? 'Unlike' : 'Like' }}
        </button>
        <button class="e-card-btn" (click)="onShare()">Share</button>
      </div>
    </div>
  `,
  styles: [`
    .e-card-btn.btn-active {
      background-color: #ff1744;
      color: white;
      border-color: #ff1744;
    }
  `]
})
export class CardWithStateComponent {
  title = 'Interactive Card';
  isLiked = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  onShare() {
    console.log('Share clicked');
  }
}
```

---

## Complete Button Examples

### Example 1: Horizontal Action Buttons (from utils)

```typescript
// horizontal-buttons.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-horizontal-buttons',
  standalone: true,
  template: `
    <div style="margin: 50px;">
      <div class="e-card" style="max-width:400px">
        <div class="e-card-header-title">Eiffel Tower</div>
        <div class="e-card-content">
          The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
        </div>
        <div class="e-card-actions">
          <button class="e-card-btn">
            <img src="./fav.png" style="height: 18px;width: 18px;" title="Bookmark">
          </button>
          <button class="e-card-btn">
            <img src="./like.png" style="height: 18px;width: 18px;" title="Like">
          </button>
          <button class="e-card-btn">
            <img src="./share.png" style="height: 18px;width: 18px;" title="Share">
          </button>
        </div>
      </div>
    </div>

    <div style="margin-left: 50px;">
      <div class="e-card" style="max-width:400px">
        <div class="e-card-header-title">Eiffel Tower</div>
        <div class="e-card-content">
          The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
        </div>
        <div class="e-card-actions e-card-vertical">
          <button class="e-card-btn">LIKE</button>
          <button class="e-card-btn">SHARE</button>
        </div>
      </div>
    </div>
  `
})
export class HorizontalButtonsComponent {}
```

### Example 2: Mixed Button Types

```typescript
// mixed-buttons.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-mixed-buttons',
  standalone: true,
  template: `
    <div class="e-card" style="max-width: 500px;">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">Complete Card</div>
          <div class="e-card-sub-title">With various button styles</div>
        </div>
      </div>
      <div class="e-card-content">
        This card demonstrates different button combinations and styles for various use cases.
      </div>
      <div class="e-card-actions">
        <button class="e-card-btn btn-primary">Primary</button>
        <button class="e-card-btn btn-outline">Outline</button>
      </div>
    </div>
  `,
  styles: [`
    .btn-primary {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-outline {
      background-color: transparent;
      color: #007bff;
      border: 2px solid #007bff;
    }

    .btn-outline:hover {
      background-color: #007bff;
      color: white;
    }
  `]
})
export class MixedButtonsComponent {}
```

### Example 3: Vertical Action Buttons

```typescript
// vertical-buttons.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-vertical-buttons',
  standalone: true,
  template: `
    <div style="margin: 50px;">
      <div class="e-card" style="max-width:400px">
        <div class="e-card-header-title">Eiffel Tower</div>
        <div class="e-card-content">
          The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
        </div>
        <div class="e-card-actions e-card-vertical">
          <button class="e-card-btn">LIKE</button>
          <button class="e-card-btn">SHARE</button>
        </div>
      </div>
    </div>
  `
})
export class VerticalButtonsComponent {}
```

### Example 4: Responsive Button Layout

```typescript
// responsive-buttons.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-responsive-buttons',
  standalone: true,
  template: `
    <div class="e-card">
      <div class="e-card-header">
        <div class="e-card-header-caption">
          <div class="e-card-header-title">Responsive Actions</div>
        </div>
      </div>
      <div class="e-card-content">
        Action buttons that adapt to screen size
      </div>
      <div class="e-card-actions" [class.vertical]="isMobileView">
        <button class="e-card-btn">Action 1</button>
        <button class="e-card-btn">Action 2</button>
      </div>
    </div>
  `,
  styles: [`
    .e-card-actions {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }

    .e-card-actions.vertical {
      flex-direction: column;
    }

    .e-card-actions.vertical .e-card-btn {
      width: 100%;
    }

    @media (max-width: 600px) {
      .e-card-actions {
        flex-direction: column;
      }

      .e-card-btn {
        width: 100%;
      }
    }
  `]
})
export class ResponsiveButtonsComponent {
  isMobileView = false;

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 600;
  }
}
```

---

## Common Patterns

### Pattern: Like/Favorite Toggle

```html
<div class="e-card-actions">
  <button class="e-card-btn" (click)="toggleFavorite()">
    {{ isFavorite ? '❤️ Favorite' : '🤍 Add to Favorites' }}
  </button>
</div>
```

### Pattern: Primary + Secondary Actions

```html
<div class="e-card-actions">
  <button class="e-card-btn btn-secondary">Cancel</button>
  <button class="e-card-btn btn-primary">Save</button>
</div>
```

### Pattern: Single Full-Width Action

```html
<div class="e-card-actions">
  <button class="e-card-btn" style="flex: 1; width: 100%;">Full Width Action</button>
</div>
```

---

## Troubleshooting

**Issue:** Buttons not displaying in a row
- **Check:** `flex-direction: row` is set
- **Verify:** Container has `display: flex`

**Issue:** Buttons have different widths
- **Check:** All buttons have `flex: 1` or `flex: none`
- **Ensure:** Padding is consistent

**Issue:** Text is cut off in buttons
- **Solution:** Remove `flex: 1` and use `flex: none` for variable width
- **Or:** Increase button padding and height

---

**Next:** Arrange cards horizontally in [Horizontal Layout](../horizontal-layout.md) reference.
