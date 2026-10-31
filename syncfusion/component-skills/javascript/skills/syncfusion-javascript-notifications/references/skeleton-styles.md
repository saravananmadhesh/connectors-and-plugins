# Skeleton Styles and Visibility

The Syncfusion EJ2 JavaScript Skeleton component supports custom CSS styling and visibility toggling for loading state management.

## Table of Contents
- [Custom CSS Classes](#custom-css-classes)
- [CSS Variable Customization](#css-variable-customization)
- [Visibility Toggle](#visibility-toggle)
- [Loading State Pattern](#loading-state-pattern)
- [Animation Speed Customization](#animation-speed-customization)

---

## Custom CSS Classes

Use the `cssClass` property to apply custom styles to the skeleton component:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  cssClass: 'my-custom-skeleton'
});
skeleton.appendTo('#skeleton');
```

### Custom Wave Color

```css
.my-custom-skeleton {
  background-color: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}
```

### Custom Background Color

```css
.my-dark-skeleton {
  background-color: #2c3e50;
  color: #ffffff;
}

.my-light-skeleton {
  background-color: #f5f5f5;
  border-radius: 8px;
}
```

### Custom Border Radius

```css
.rounded-skeleton {
  border-radius: 12px;
}

.circle-skeleton {
  border-radius: 50%;
}
```

---

## CSS Variable Customization

The Skeleton component uses CSS variables that can be overridden:

```css
/* Override skeleton colors */
.e-skeleton {
  --skeleton-bg: #e0e0e0;
  --skeleton-shimmer: rgba(255, 255, 255, 0.8);
}

/* Dark theme */
.e-skeleton.dark {
  --skeleton-bg: #424242;
  --skeleton-shimmer: rgba(255, 255, 255, 0.2);
}
```

---

## Visibility Toggle

The `visible` property controls whether the skeleton is displayed. Use it to show/hide skeletons based on loading state.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  visible: true  // Initially visible
});
skeleton.appendTo('#skeleton');

// Hide the skeleton
skeleton.hide();

// Show the skeleton
skeleton.show();
```

---

## Loading State Pattern

Common pattern: Show skeleton during data loading, then hide it and show actual content.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

let isLoading: boolean = true;
let userData: UserData | null = null;

// Create skeleton placeholders
let avatarSkeleton: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '64px',
  visible: isLoading
});
avatarSkeleton.appendTo('#avatar-skeleton');

let nameSkeleton: Skeleton = new Skeleton({
  shape: 'Text',
  height: '18px',
  width: '60%',
  visible: isLoading
});
nameSkeleton.appendTo('#name-skeleton');

let emailSkeleton: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '80%',
  visible: isLoading
});
emailSkeleton.appendTo('#email-skeleton');

// Simulate async data fetch
setTimeout(() => {
  userData = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg'
  };
  
  isLoading = false;
  
  // Hide all skeletons
  avatarSkeleton.hide();
  nameSkeleton.hide();
  emailSkeleton.hide();
  
  // Show actual content
  document.getElementById('actual-avatar')!.style.display = 'block';
  document.getElementById('actual-name')!.textContent = userData.name;
  document.getElementById('actual-email')!.textContent = userData.email;
}, 3000);
```

---

## Transition Pattern: Skeleton → Content

Smooth transition from skeleton to actual content:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let skeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '300px',
  cssClass: 'fade-skeleton'
});
skeleton.appendTo('#content-skeleton');

const actualContent: HTMLElement = document.getElementById('actual-content')!;
actualContent.style.display = 'none';
actualContent.style.opacity = '0';
actualContent.style.transition = 'opacity 0.3s ease-in-out';

// After loading completes
setTimeout(() => {
  // Fade out skeleton
  const skeletonElement: HTMLElement = document.getElementById('content-skeleton')!;
  skeletonElement.style.transition = 'opacity 0.3s ease-in-out';
  skeletonElement.style.opacity = '0';
  
  setTimeout(() => {
    skeleton.hide();
    
    // Fade in actual content
    actualContent.style.display = 'block';
    setTimeout(() => {
      actualContent.style.opacity = '1';
    }, 10);
  }, 300);
}, 3000);
```

```css
.fade-skeleton {
  transition: opacity 0.3s ease-in-out;
}
```

---

## Animation Speed Customization

Customize animation speed using CSS:

```css
/* Fast animation */
.fast-skeleton {
  animation-duration: 1s !important;
}

/* Slow animation */
.slow-skeleton {
  animation-duration: 2.5s !important;
}

/* Disable animation */
.no-animation-skeleton {
  animation: none !important;
}
```

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

let fastSkeleton: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px',
  cssClass: 'fast-skeleton'
});
fastSkeleton.appendTo('#fast-skeleton');
```

---

## Multiple Skeletons with Different Styles

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Article image
let articleImage: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '250px',
  cssClass: 'article-image-skeleton'
});
articleImage.appendTo('#article-image');

// Article title
let articleTitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '24px',
  width: '85%',
  cssClass: 'title-skeleton'
});
articleTitle.appendTo('#article-title');

// Article content lines
let line1: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '100%'
});
line1.appendTo('#article-line-1');

let line2: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '95%'
});
line2.appendTo('#article-line-2');

let line3: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '70%'
});
line3.appendTo('#article-line-3');
```

```css
.article-image-skeleton {
  border-radius: 8px;
}

.title-skeleton {
  background-color: #d0d0d0;
  border-radius: 4px;
}
```

---

## Conditional Rendering

Show skeleton only when needed:

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

function renderContent(loading: boolean, data?: any): void {
  const skeletonContainer: HTMLElement = document.getElementById('skeleton-container')!;
  const contentContainer: HTMLElement = document.getElementById('content-container')!;
  
  if (loading) {
    // Show skeleton
    skeletonContainer.style.display = 'block';
    contentContainer.style.display = 'none';
    
    let skeleton: Skeleton = new Skeleton({
      shape: 'Rectangle',
      width: '100%',
      height: '200px'
    });
    skeleton.appendTo('#skeleton-container');
  } else {
    // Show content
    skeletonContainer.style.display = 'none';
    contentContainer.style.display = 'block';
    
    if (data) {
      contentContainer.innerHTML = `<div>${data.title}</div>`;
    }
  }
}

// Usage
renderContent(true); // Show skeleton
// Later...
renderContent(false, { title: 'Loaded content' }); // Show content
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `''` | Custom CSS class for styling |
| `visible` | `boolean` | `true` | Controls visibility |

| Method | Description |
|--------|-------------|
| `show()` | Shows the skeleton |
| `hide()` | Hides the skeleton |
| `destroy()` | Destroys the component |

For complete API details, see [skeleton-api.md](./skeleton-api.md).
