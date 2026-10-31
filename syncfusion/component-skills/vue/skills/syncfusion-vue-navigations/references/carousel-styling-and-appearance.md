# Styling and Appearance

## Table of Contents
- [CSS Class Structure](#css-class-structure)
- [Customizing Indicators](#customizing-indicators)
- [Customizing Navigation Buttons](#customizing-navigation-buttons)
- [Partial Slides Customization](#partial-slides-customization)
- [Theme Integration](#theme-integration)
- [Dark Mode](#dark-mode)
- [Custom Themes](#custom-themes)

## CSS Class Structure

The Syncfusion Carousel generates a hierarchical CSS class structure:

```
.e-carousel
  ├── .e-carousel-container
  │   ├── .e-carousel-item (each item)
  │   │   └── [content]
  │   └── .e-carousel-viewport
  ├── .e-carousel-navigator
  │   ├── .e-carousel-prev
  │   └── .e-carousel-next
  ├── .e-carousel-indicators
  │   └── .e-indicator-item (each indicator)
  └── .e-carousel-play-button
```

### Default Styling

```vue
<template>
  <ejs-carousel>
    <!-- Default Syncfusion styling applied -->
  </ejs-carousel>
</template>
```

### Custom Root Styling

Apply custom styling to the carousel root:

```vue
<template>
  <ejs-carousel cssClass="gallery-carousel">
    <e-carousel-items>
      <e-carousel-item template='<img src="image1.jpg" />' />
      <e-carousel-item template='<img src="image2.jpg" />' />
      <e-carousel-item template='<img src="image3.jpg" />' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.gallery-carousel {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
</style>
```

## Customizing Indicators

### Indicator Spacing and Size

```vue
<template>
  <ejs-carousel cssClass="custom-indicators">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
      <e-carousel-item template='<h3>Slide 4</h3>' />
      <e-carousel-item template='<h3>Slide 5</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.custom-indicators .e-carousel-indicators {
  gap: 12px;
}

.custom-indicators .e-indicator-item {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.custom-indicators .e-indicator-item.e-active {
  background: white;
  transform: scale(1.3);
}
</style>
```

### Indicator Shapes

Rectangular indicators:

```vue
<template>
  <ejs-carousel cssClass="rect-indicators">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.rect-indicators .e-indicator-item {
  width: 24px;
  height: 6px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 4px;
}

.rect-indicators .e-indicator-item.e-active {
  background: #2563eb;
  width: 32px;
}
</style>
```

### Indicator Position

By default, indicators appear at the bottom center. Customize position:

```vue
<template>
  <ejs-carousel cssClass="right-indicators">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.right-indicators .e-carousel-indicators {
  position: absolute;
  right: 16px;
  bottom: 50%;
  transform: translateY(50%);
  flex-direction: column;
  gap: 8px;
}
</style>
```

### Indicator Preview on Hover

Using custom template with preview images:

```vue
<template>
  <ejs-carousel cssClass="preview-indicators" :indicatorsTemplate="renderIndicator">
    <e-carousel-items>
      <e-carousel-item template='<img src="slide1.jpg" class="full-size" />' />
      <e-carousel-item template='<img src="slide2.jpg" class="full-size" />' />
      <e-carousel-item template='<img src="slide3.jpg" class="full-size" />' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
const renderIndicator = (props) => {
  const slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg'];
  return `
    <button class="indicator-with-preview" data-index="${props.index}">
      <img src="${slides[props.index]}" alt="Slide ${props.index + 1}" />
    </button>
  `;
};
</script>

<style scoped>
.indicator-with-preview {
  position: relative;
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-with-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.indicator-with-preview:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.indicator-with-preview.e-active {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px #2563eb;
}
</style>
```

## Customizing Navigation Buttons

### Button Styling

```vue
<template>
  <ejs-carousel cssClass="custom-nav-buttons" buttonsVisibility="Visible">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.custom-nav-buttons .e-carousel-prev,
.custom-nav-buttons .e-carousel-next {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-nav-buttons .e-carousel-prev:hover,
.custom-nav-buttons .e-carousel-next:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: scale(1.1);
}

.custom-nav-buttons .e-carousel-prev:active,
.custom-nav-buttons .e-carousel-next:active {
  transform: scale(0.95);
}
</style>
```

### Custom Button Templates

Using slot-based templates:

```vue
<template>
  <ejs-carousel buttonsVisibility="Visible">
    <template #previousButtonTemplate>
      <button class="custom-prev-btn">
        <span class="icon">←</span>
        <span class="label">Back</span>
      </button>
    </template>

    <template #nextButtonTemplate>
      <button class="custom-next-btn">
        <span class="label">Next</span>
        <span class="icon">→</span>
      </button>
    </template>

    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.custom-prev-btn, .custom-next-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.custom-prev-btn:hover, .custom-next-btn:hover {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
}

.icon {
  font-size: 16px;
}
</style>
```

## Partial Slides Customization

### Partial Slide Visibility

When `partialVisible="true"`, customize the slide edge appearance:

```vue
<template>
  <ejs-carousel :partialVisible="true" cssClass="partial-carousel">
    <e-carousel-items>
      <e-carousel-item template='<img src="slide1.jpg" />' />
      <e-carousel-item template='<img src="slide2.jpg" />' />
      <e-carousel-item template='<img src="slide3.jpg" />' />
      <e-carousel-item template='<img src="slide4.jpg" />' />
      <e-carousel-item template='<img src="slide5.jpg" />' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.partial-carousel {
  padding: 0 40px;
}

.partial-carousel .e-carousel-item {
  border-radius: 12px;
  overflow: hidden;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.partial-carousel .e-carousel-item.e-active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
</style>
```

## Theme Integration

### Using Syncfusion Built-in Themes

Import theme CSS in your component or main.js:

```javascript
// main.js
import '@syncfusion/ej2-base/styles/tailwind.css';
import '@syncfusion/ej2-navigations/styles/tailwind.css';
```

**Available Themes:**
- `bootstrap.css` - Bootstrap 5 styling
- `tailwind.css` - Tailwind CSS styling
- `material.css` - Material Design
- `fluent.css` - Microsoft Fluent Design

### Theme-Specific Customization

```vue
<template>
  <ejs-carousel cssClass="material-carousel">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
/* Material Theme Overrides */
.material-carousel .e-carousel-navigator {
  background: rgba(0, 0, 0, 0.2);
}

.material-carousel .e-indicator-item {
  background: rgba(255, 255, 255, 0.4);
}

.material-carousel .e-indicator-item.e-active {
  background: white;
}
</style>
```

## Dark Mode

### Implementing Dark Mode

```vue
<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <ejs-carousel cssClass="adaptive-carousel">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="toggleDarkMode">{{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isDarkMode = ref(false);
const toggleDarkMode = () => isDarkMode.value = !isDarkMode.value;
</script>

<style scoped>
.adaptive-carousel {
  background: white;
  color: #333;
  transition: all 0.3s ease;
}

.dark-mode .adaptive-carousel {
  background: #1a1a1a;
  color: #f5f5f5;
}

.adaptive-carousel .e-indicator-item {
  background: rgba(0, 0, 0, 0.3);
}

.dark-mode .adaptive-carousel .e-indicator-item {
  background: rgba(255, 255, 255, 0.3);
}

.adaptive-carousel .e-indicator-item.e-active {
  background: #333;
}

.dark-mode .adaptive-carousel .e-indicator-item.e-active {
  background: #f5f5f5;
}
</style>
```

## Custom Themes

### Creating a Complete Custom Theme

```vue
<template>
  <ejs-carousel cssClass="premium-carousel">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.premium-carousel {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --bg-color: #f8fafc;
  --text-color: #1e293b;
  
  background: var(--bg-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.premium-carousel .e-carousel-item {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.premium-carousel .e-carousel-indicators {
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 0;
}

.premium-carousel .e-indicator-item {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin: 0 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-carousel .e-indicator-item.e-active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

.premium-carousel .e-carousel-prev,
.premium-carousel .e-carousel-next {
  background: rgba(255, 255, 255, 0.9);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  color: var(--primary-color);
  font-weight: bold;
  transition: all 0.3s ease;
}

.premium-carousel .e-carousel-prev:hover,
.premium-carousel .e-carousel-next:hover {
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}
</style>
```

## Best Practices

- Use CSS variables for easy theme switching
- Apply transitions for smooth visual changes
- Test indicator visibility in dark mode
- Ensure button contrast meets WCAG standards
- Use scoped styles to avoid CSS conflicts
- Consider mobile-first approach for responsive design
- Test custom styling with all animation effects

## Related References
- [Getting Started](getting-started.md) - Theme import setup
- [Navigators and Indicators](navigators-and-indicators.md) - Indicator configuration
- [Accessibility](accessibility.md) - Color contrast and visibility
