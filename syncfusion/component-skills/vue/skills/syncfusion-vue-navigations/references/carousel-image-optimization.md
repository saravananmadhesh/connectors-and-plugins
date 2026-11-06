# Image Optimization

## Table of Contents
- [WebP Format Benefits](#webp-format-benefits)
- [WebP Implementation](#webp-implementation)
- [Image Conversion Tools](#image-conversion-tools)
- [Responsive Images](#responsive-images)
- [Lazy Loading](#lazy-loading)
- [Performance Testing](#performance-testing)
- [Browser Support](#browser-support)

## WebP Format Benefits

WebP is a modern image format developed by Google that provides:

- **70% smaller file size** compared to JPEG for equivalent quality
- **25% smaller than PNG** for lossless compression
- **Faster loading** times, especially on mobile networks
- **Better quality** at lower file sizes
- Supports both lossy and lossless compression
- Includes alpha channel for transparency

### Size Comparison Example

```
Original JPG:  424 KB
WebP (75%):     112 KB  (73% reduction)
WebP (85%):     158 KB  (63% reduction)

Original PNG:  892 KB
WebP (lossless): 245 KB  (73% reduction)
```

## WebP Implementation

### Basic WebP with Fallback

Use `<picture>` element for browser fallback:

```vue
<template>
  <ejs-carousel :dataSource="images" :itemTemplate="renderImage">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const images = ref([
  { id: 1, src: 'carousel/image1.webp', fallback: 'carousel/image1.jpg' },
  { id: 2, src: 'carousel/image2.webp', fallback: 'carousel/image2.jpg' },
  { id: 3, src: 'carousel/image3.webp', fallback: 'carousel/image3.jpg' }
]);

const renderImage = (props) => {
  return `
    <picture>
      <source srcset="${props.src}" type="image/webp">
      <img src="${props.fallback}" alt="Carousel item" />
    </picture>
  `;
};
</script>

<style scoped>
picture img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
```

### Multiple Resolutions with WebP

Serve different sizes based on device:

```vue
<template>
  <ejs-carousel :dataSource="responsiveImages" :itemTemplate="renderResponsiveImage">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const responsiveImages = ref([
  {
    id: 1,
    sources: {
      webp: {
        small: 'carousel/image1-400.webp',
        medium: 'carousel/image1-800.webp',
        large: 'carousel/image1-1200.webp'
      },
      jpg: {
        small: 'carousel/image1-400.jpg',
        medium: 'carousel/image1-800.jpg',
        large: 'carousel/image1-1200.jpg'
      }
    }
  }
  // ... more images
]);

const renderResponsiveImage = (props) => {
  const sizes = "(min-width: 1200px) 1200px, (min-width: 768px) 800px, 400px";
  return `
    <picture>
      <source
        srcset="${props.sources.webp.small} 400w, ${props.sources.webp.medium} 800w, ${props.sources.webp.large} 1200w"
        sizes="${sizes}"
        type="image/webp">
      <img
        srcset="${props.sources.jpg.small} 400w, ${props.sources.jpg.medium} 800w, ${props.sources.jpg.large} 1200w"
        sizes="${sizes}"
        src="${props.sources.jpg.medium}"
        alt="Carousel image"
      />
    </picture>
  `;
};
</script>
```

## Image Conversion Tools

### Command Line Conversion (cwebp)

Install cwebp tool and convert images:

```bash
# Install cwebp (macOS)
brew install webp

# Install cwebp (Windows - using Chocolatey)
choco install webp

# Convert single image
cwebp input.jpg -o output.webp

# Convert with quality setting (0-100, default 75)
cwebp input.jpg -o output.webp -q 85

# Convert PNG to WebP lossless
cwebp input.png -o output.webp -lossless

# Batch convert all JPGs in directory
for file in *.jpg; do cwebp "$file" -o "${file%.jpg}.webp"; done
```

### Online Conversion Tools

- **CloudConvert** - https://cloudconvert.com/ (supports batch)
- **Squoosh** - https://squoosh.app/ (Google's tool)
- **Online-Convert** - https://image.online-convert.com/
- **Convertio** - https://convertio.co/

### Build Tool Integration (Vite)

Install Vite plugin for automatic WebP generation:

```bash
npm install vite-plugin-imagemin
```

Configure in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    vue(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 85 },
      webp: {
        quality: 85
      }
    })
  ]
});
```

## Responsive Images

### Picture Element with Art Direction

```vue
<template>
  <ejs-carousel :dataSource="heroImages" :itemTemplate="renderHeroImage">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const heroImages = ref([
  {
    id: 1,
    mobile: 'carousel/hero-mobile-1.webp',
    tablet: 'carousel/hero-tablet-1.webp',
    desktop: 'carousel/hero-desktop-1.webp',
    fallback: 'carousel/hero-1.jpg'
  }
  // ... more images
]);

const renderHeroImage = (props) => {
  return `
    <picture>
      <source media="(min-width: 1024px)" srcset="${props.desktop}" type="image/webp">
      <source media="(min-width: 768px)" srcset="${props.tablet}" type="image/webp">
      <source media="(max-width: 767px)" srcset="${props.mobile}" type="image/webp">
      <img src="${props.fallback}" alt="Hero banner" />
    </picture>
  `;
};
</script>
```

### Srcset with Pixel Density

```vue
<template>
  <ejs-carousel :dataSource="dpiImages" :itemTemplate="renderDPIImage">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const dpiImages = ref([
  {
    id: 1,
    standard: 'carousel/image-1x.webp',
    retina: 'carousel/image-2x.webp',
    fallback: 'carousel/image-1x.jpg'
  }
  // ... more images
]);

const renderDPIImage = (props) => {
  return `
    <picture>
      <source srcset="${props.standard} 1x, ${props.retina} 2x" type="image/webp">
      <img src="${props.fallback}" alt="Carousel item" />
    </picture>
  `;
};
</script>
```

## Lazy Loading

### Native Lazy Loading

Use browser's native lazy loading attribute:

```vue
<template>
  <ejs-carousel :dataSource="lazyImages" :itemTemplate="renderLazyImage">
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref } from 'vue';

const lazyImages = ref([
  { id: 1, src: 'carousel/image1.webp', fallback: 'carousel/image1.jpg' },
  { id: 2, src: 'carousel/image2.webp', fallback: 'carousel/image2.jpg' },
  { id: 3, src: 'carousel/image3.webp', fallback: 'carousel/image3.jpg' }
]);

const renderLazyImage = (props) => {
  return `
    <picture>
      <source srcset="${props.src}" type="image/webp">
      <img src="${props.fallback}" alt="Carousel item" loading="lazy" />
    </picture>
  `;
};
</script>
```

### Manual Lazy Loading with Intersection Observer

```vue
<template>
  <ejs-carousel 
    ref="carouselRef"
    :dataSource="lazyLoadedImages"
    :itemTemplate="renderImage"
    @slideChanged="loadAdjacentSlides"
  >
    <e-carousel-items />
  </ejs-carousel>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const carouselRef = ref(null);
const lazyLoadedImages = ref([]);
const imageData = [
  { id: 1, src: 'carousel/image1.webp', loaded: false },
  { id: 2, src: 'carousel/image2.webp', loaded: false },
  { id: 3, src: 'carousel/image3.webp', loaded: false },
  { id: 4, src: 'carousel/image4.webp', loaded: false },
  { id: 5, src: 'carousel/image5.webp', loaded: false }
];

onMounted(() => {
  lazyLoadedImages.value = [...imageData];
  loadAdjacentSlides({ currentSlide: 0 });
});

const loadAdjacentSlides = (args) => {
  const { currentSlide } = args;
  
  // Load current, previous, and next slides
  const indexesToLoad = [
    currentSlide - 1,
    currentSlide,
    currentSlide + 1
  ].filter(i => i >= 0 && i < lazyLoadedImages.value.length);
  
  indexesToLoad.forEach(i => {
    if (!lazyLoadedImages.value[i].loaded) {
      preloadImage(i);
    }
  });
};

const preloadImage = (index) => {
  const img = new Image();
  img.onload = () => {
    lazyLoadedImages.value[index].loaded = true;
  };
  img.src = lazyLoadedImages.value[index].src;
};

const renderImage = (props) => {
  return `
    <img 
      src="${props.loaded ? props.src : 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E'}"
      alt="Carousel item ${props.id}"
      style="width: 100%; height: auto;"
    />
  `;
};
</script>
```

## Performance Testing

### Using Lighthouse

Test carousel performance with Chrome DevTools:

```javascript
// In browser console
// 1. Open DevTools (F12)
// 2. Go to Lighthouse tab
// 3. Click "Analyze page load"
// 4. Check Performance and Opportunities sections
```

### Network Throttling

Test with simulated slow connections:

```javascript
// DevTools > Network > Throttling
// Presets: Fast 3G, Slow 3G, Offline
```

### Measuring Image Load Times

```vue
<template>
  <ejs-carousel @slideChanged="measureLoadTime">
    <!-- carousel items -->
  </ejs-carousel>
  <div>{{ loadMetrics }}</div>
</template>

<script setup>
import { ref } from 'vue';

const loadMetrics = ref({});

const measureLoadTime = (args) => {
  const startTime = performance.now();
  
  // Image loading simulation
  setTimeout(() => {
    const endTime = performance.now();
    loadMetrics.value = {
      slide: args.currentSlide + 1,
      loadTime: (endTime - startTime).toFixed(2) + 'ms'
    };
  }, 100);
};
</script>
```

## Browser Support

### WebP Support Matrix

| Browser | WebP Support | Minimum Version |
|---------|--------------|-----------------|
| Chrome | ✅ Full | 23+ |
| Edge | ✅ Full | 18+ |
| Firefox | ✅ Full | 65+ |
| Safari | ⚠️ Partial | 16+ (macOS 13) |
| Opera | ✅ Full | 12.1+ |
| Internet Explorer | ❌ None | - |
| Samsung Internet | ✅ Full | 4+ |

### Feature Detection

Detect WebP support programmatically:

```javascript
const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
};

if (supportsWebP()) {
  // Load WebP images
} else {
  // Load fallback JPG/PNG
}
```

## Best Practices Checklist

- ✅ Convert all images to WebP format
- ✅ Maintain JPG fallbacks for older browsers
- ✅ Use `<picture>` element for compatibility
- ✅ Serve responsive images with srcset
- ✅ Implement lazy loading for below-fold slides
- ✅ Optimize image quality (75-85% quality is usually sufficient)
- ✅ Use Lighthouse to measure performance
- ✅ Test on real devices with slow connections
- ✅ Monitor Core Web Vitals (LCP, CLS, FID)
- ✅ Consider next-gen formats (AVIF) for future-proofing

## Related References
- [Getting Started](getting-started.md) - Project setup
- [Populating Items](populating-items.md) - Data binding patterns
- [Styling and Appearance](styling-and-appearance.md) - Image presentation
