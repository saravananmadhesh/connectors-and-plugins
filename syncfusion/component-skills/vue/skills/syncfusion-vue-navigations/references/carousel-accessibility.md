# Accessibility

## Table of Contents
- [Compliance Standards](#compliance-standards)
- [ARIA Attributes and Roles](#aria-attributes-and-roles)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Color Contrast](#color-contrast)
- [RTL Support](#rtl-support)
- [Accessible Carousel Example](#accessible-carousel-example)

## Compliance Standards

The Syncfusion Vue Carousel complies with international accessibility standards:

- **WCAG 2.2 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - U.S. federal accessibility requirements
- **EN 301 549** - European standard for digital accessibility

## ARIA Attributes and Roles

The carousel automatically applies appropriate ARIA attributes for semantic HTML:

### Automatic ARIA Implementation

```vue
<template>
  <ejs-carousel>
    <!-- Automatically generates: -->
    <!-- <div role="region" aria-label="Carousel"> -->
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Custom ARIA Labels

Provide meaningful labels for screen readers:

```vue
<template>
  <ejs-carousel ariaLabel="Product gallery carousel, showing featured items">
    <e-carousel-items>
      <e-carousel-item template='<img src="product1.jpg" alt="Premium headphones" />' />
      <e-carousel-item template='<img src="product2.jpg" alt="Wireless speaker" />' />
      <e-carousel-item template='<img src="product3.jpg" alt="Portable charger" />' />
    </e-carousel-items>
  </ejs-carousel>
</template>
```

### ARIA Live Regions

Announce slide changes to screen readers:

```vue
<template>
  <div>
    <ejs-carousel 
      @slideChanged="onSlideChanged"
      ariaLabel="Product carousel"
    >
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    
    <!-- Live region for announcements -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announcement }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const announcement = ref('');

const onSlideChanged = (args) => {
  announcement.value = `Showing slide ${args.currentSlide + 1}`;
};
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

## Keyboard Navigation

The carousel supports full keyboard control:

### Supported Keys

| Key | Action |
|-----|--------|
| `→` (Right Arrow) | Next slide |
| `←` (Left Arrow) | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `Tab` | Navigate to focusable elements |
| `Shift+Tab` | Navigate backward to focusable elements |
| `Enter` | Activate focused button |
| `Space` | Toggle play/pause |

### Keyboard Navigation Example

```vue
<template>
  <div class="carousel-wrapper">
    <ejs-carousel 
      ref="carouselRef"
      @keydown="handleKeyboard"
      :selectedIndex="currentSlide"
      tabindex="0"
      role="region"
      ariaLabel="Keyboard-navigable carousel"
    >
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1 - Press arrow keys</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
        <e-carousel-item template='<h3>Slide 4</h3>' />
        <e-carousel-item template='<h3>Slide 5</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    
    <p aria-live="polite">Current slide: {{ currentSlide + 1 }} / 5</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);
const currentSlide = ref(0);

const handleKeyboard = (event) => {
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault();
      carouselRef.value?.next();
      currentSlide.value = (currentSlide.value + 1) % 5;
      break;
    case 'ArrowLeft':
      event.preventDefault();
      carouselRef.value?.prev();
      currentSlide.value = (currentSlide.value - 1 + 5) % 5;
      break;
    case 'Home':
      event.preventDefault();
      currentSlide.value = 0;
      break;
    case 'End':
      event.preventDefault();
      currentSlide.value = 4;
      break;
  }
};
</script>
```

## Screen Reader Support

### Meaningful Text Content

Always include descriptive text for carousel items:

```vue
<template>
  <ejs-carousel
    :dataSource="testimonials"
    :itemTemplate="renderTestimonial"
    ariaLabel="Customer testimonials carousel"
  >
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const testimonials = ref([
  {
    id: 1,
    author: 'Jane Doe',
    role: 'CEO, Tech Corp',
    content: 'Great product and excellent support!'
  },
  {
    id: 2,
    author: 'John Smith',
    role: 'Manager, Design Studio',
    content: 'Transformed our workflow completely.'
  },
  {
    id: 3,
    author: 'Sarah Johnson',
    role: 'Director, Marketing',
    content: 'Best investment we made this year.'
  }
]);

const renderTestimonial = (props) => {
  return `
    <article class="testimonial">
      <blockquote>
        <p>"${props.content}"</p>
        <footer>
          <strong>${props.author}</strong><br>
          <cite>${props.role}</cite>
        </footer>
      </blockquote>
    </article>
  `;
};
</script>
```

### Image Alternatives

Provide alt text for all images in carousel:

```vue
<template>
  <ejs-carousel
    :dataSource="imageGallery"
    :itemTemplate="renderImage"
    ariaLabel="Product image gallery"
  >
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const imageGallery = ref([
  { id: 1, src: 'laptop.jpg', alt: 'Silver laptop showing code editor with dark theme' },
  { id: 2, src: 'desk.jpg', alt: 'Organized workspace with dual monitors and ergonomic setup' },
  { id: 3, src: 'team.jpg', alt: 'Team of five developers collaborating at stand-up meeting' }
]);

const renderImage = (props) => {
  return `<img src="${props.src}" alt="${props.alt}" />`;
};
</script>
```

## Focus Management

### Visible Focus Indicators

Ensure clear focus indicators for keyboard users:

```vue
<template>
  <ejs-carousel 
    cssClass="accessible-carousel"
    buttonsVisibility="Visible"
  >
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
.accessible-carousel .e-carousel-prev:focus,
.accessible-carousel .e-carousel-next:focus {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
}

.accessible-carousel .e-indicator-item:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.accessible-carousel .e-carousel-play-button:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
</style>
```

### Focus Trapping

Implement focus trap for modal carousels:

```vue
<template>
  <div v-if="isOpen" class="carousel-modal" @keydown="handleModalKeys">
    <button @click="closeModal" class="close-btn" aria-label="Close carousel">✕</button>
    
    <ejs-carousel ref="modalCarousel">
      <e-carousel-items>
        <e-carousel-item template='<img src="slide1.jpg" />' />
        <e-carousel-item template='<img src="slide2.jpg" />' />
        <e-carousel-item template='<img src="slide3.jpg" />' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const modalCarousel = ref(null);

const openModal = () => isOpen.value = true;
const closeModal = () => isOpen.value = false;

const handleModalKeys = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};
</script>

<style scoped>
.carousel-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.carousel-modal .close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}
</style>
```

## Color Contrast

### Meeting WCAG AA Standards

Ensure text and UI elements have sufficient contrast:

```vue
<template>
  <ejs-carousel cssClass="high-contrast-carousel">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<style scoped>
/* WCAG AA: 4.5:1 for normal text, 3:1 for large text -->
.high-contrast-carousel .e-carousel-item {
  /* Dark text on light background: 7:1 ratio */
  background: #ffffff;
  color: #000000;
}

.high-contrast-carousel .e-indicator-item {
  /* 4.5:1 contrast ratio */
  background: #666666;
}

.high-contrast-carousel .e-indicator-item.e-active {
  background: #000000;
}

.high-contrast-carousel .e-carousel-prev,
.high-contrast-carousel .e-carousel-next {
  /* Sufficient contrast for buttons */
  background: #f3f4f6;
  color: #000000;
  border: 2px solid #000000;
}
</style>
```

## RTL Support

### Right-to-Left Language Support

Enable RTL for Arabic, Hebrew, and other RTL languages:

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <ejs-carousel 
      :enableRtl="isRTL"
      ariaLabel="معرض الصور"
    >
      <e-carousel-items>
        <e-carousel-item template='<h3>الشريحة الأولى</h3>' />
        <e-carousel-item template='<h3>الشريحة الثانية</h3>' />
        <e-carousel-item template='<h3>الشريحة الثالثة</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    
    <button @click="toggleRTL">
      {{ isRTL ? 'Switch to LTR' : 'التبديل إلى RTL' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const isRTL = ref(false);

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};
</script>
```

## Accessible Carousel Example

Complete accessible carousel implementation:

```vue
<template>
  <section class="carousel-section" aria-labelledby="carousel-title">
    <h2 id="carousel-title">Featured Products</h2>
    
    <div class="carousel-container">
      <ejs-carousel
        ref="carouselRef"
        :selectedIndex="currentSlide"
        :dataSource="products"
        :itemTemplate="renderProduct"
        ariaLabel="Featured products carousel, use arrow keys to navigate"
        @slideChanged="handleSlideChange"
        @keydown="handleKeyboard"
        tabindex="0"
        role="region"
      >
        <e-carousel-items />
      </ejs-carousel>
    </div>

    <!-- Live region for screen readers -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ liveAnnouncement }}
    </div>

    <!-- Navigation info for all users -->
    <div class="carousel-info">
      <p>
        <span aria-label="slide counter">Slide {{ currentSlide + 1 }} of {{ products.length }}</span>
        <span class="kbd-hint">Use arrow keys to navigate</span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);
const currentSlide = ref(0);
const liveAnnouncement = ref('');

const products = ref([
  { id: 1, name: 'Product A', description: 'High-quality item' },
  { id: 2, name: 'Product B', description: 'Best seller' },
  { id: 3, name: 'Product C', description: 'Premium choice' }
]);

const renderProduct = (props) => {
  return `
    <article class="product-item">
      <h3>${props.name}</h3>
      <p>${props.description}</p>
    </article>
  `;
};

const handleSlideChange = (args) => {
  currentSlide.value = args.currentSlide;
  liveAnnouncement.value = `Now showing ${products.value[args.currentSlide].name}`;
};

const handleKeyboard = (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    carouselRef.value?.next();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    carouselRef.value?.prev();
  }
};
</script>

<style scoped>
.carousel-section {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.carousel-container {
  margin: 2rem 0;
}

.carousel-info {
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
}

.kbd-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 12px;
  color: #999;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.product-item {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 24px;
}

.product-item p {
  margin: 0;
  opacity: 0.9;
}
</style>
```

## Accessibility Testing

Test your carousel with:

- **Keyboard:** Tab, arrow keys, Home/End
- **Screen readers:** NVDA (Windows), JAWS, VoiceOver (Mac)
- **Color contrast:** WebAIM Contrast Checker
- **Automated tools:** axe DevTools, WAVE
- **Manual testing:** Turn off CSS, disable JavaScript

## Best Practices

- Always provide clear, descriptive labels
- Maintain keyboard accessibility
- Test with real assistive technologies
- Ensure sufficient color contrast
- Include alternative text for images
- Announce dynamic changes to screen readers
- Support both mouse and keyboard navigation
- Test across different browsers and devices

## Related References
- [Getting Started](getting-started.md) - Initial setup
- [Styling and Appearance](styling-and-appearance.md) - Visual customization
- [API Events](api-events.md) - Handling user interactions
