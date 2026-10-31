# Populating Carousel Items

## Table of Contents
- [Item Array Structure](#item-array-structure)
- [Template Syntax](#template-syntax)
- [Individual Item Templates](#individual-item-templates)
- [Data Source Binding](#data-source-binding)
- [Item-Specific Configuration](#item-specific-configuration)
- [Common Patterns](#common-patterns)

## Item Array Structure

The Carousel component requires an `items` array containing carousel item objects. Each item represents one slide:

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<img src="image1.jpg" />' },
    { template: '<img src="image2.jpg" />' },
    { template: '<img src="image3.jpg" />' }
  ]
});

carouselObj.appendTo("#carousel");
```

## Template Syntax

### Basic Image Template

```typescript
items: [
  { template: '<img src="image.jpg" alt="Image" style="height:100%;width:100%;" />' }
]
```

### HTML with Caption

```typescript
items: [
  {
    template: `<figure class="img-container">
      <img src="image.jpg" alt="Image" style="height:100%;width:100%;" />
      <figcaption class="img-caption">Image Caption</figcaption>
    </figure>`
  }
]
```

### Complex Content Template

```typescript
items: [
  {
    template: `<div class="slide-content">
      <h2>Slide Title</h2>
      <p>Slide description and content goes here</p>
      <button>Learn More</button>
    </div>`
  }
]
```

## Individual Item Templates

### Custom Template for Each Item

Apply different templates to different items:

```typescript
const carouselObj = new Carousel({
  items: [
    { 
      template: '<img src="image1.jpg" alt="1" style="height:100%;width:100%;" />' 
    },
    { 
      template: '<img src="image2.jpg" alt="2" style="height:100%;width:100%;" />' 
    },
    { 
      template: '<video width="100%" height="100%" controls><source src="video.mp4" type="video/mp4"></video>' 
    }
  ]
});

carouselObj.appendTo("#carousel");
```

### Per-Item Interval Configuration

Set different transition intervals for individual items:

```typescript
const carouselObj = new Carousel({
  autoPlay: true,
  interval: 3000, // Default interval
  items: [
    { template: '<img src="image1.jpg" />', interval: 2000 }, // 2 seconds
    { template: '<img src="image2.jpg" />', interval: 5000 }, // 5 seconds
    { template: '<img src="image3.jpg" />' }  // Uses default 3 seconds
  ]
});

carouselObj.appendTo("#carousel");
```

### Per-Item CSS Classes

Apply custom styling to individual items:

```typescript
const carouselObj = new Carousel({
  items: [
    { 
      template: '<img src="image1.jpg" />', 
      cssClass: 'dark-item' 
    },
    { 
      template: '<img src="image2.jpg" />', 
      cssClass: 'light-item' 
    }
  ]
});

carouselObj.appendTo("#carousel");
```

### Per-Item HTML Attributes

Add custom HTML attributes to items:

```typescript
const carouselObj = new Carousel({
  items: [
    { 
      template: '<img src="image1.jpg" />', 
      htmlAttributes: { 'data-id': '1', 'data-category': 'nature' } 
    },
    { 
      template: '<img src="image2.jpg" />', 
      htmlAttributes: { 'data-id': '2', 'data-category': 'urban' } 
    }
  ]
});

carouselObj.appendTo("#carousel");
```

## Data Source Binding

### Simple Data Source Binding

```typescript
const dataSource = [
  { id: 1, image: 'image1.jpg' },
  { id: 2, image: 'image2.jpg' },
  { id: 3, image: 'image3.jpg' }
];

const carouselObj = new Carousel({
  dataSource: dataSource,
  itemTemplate: '<img src="${image}" style="height:100%;width:100%;" />'
});

carouselObj.appendTo("#carousel");
```

### Data Source with Complex Templates

```typescript
const products = [
  { id: 1, name: 'Product 1', image: 'product1.jpg', price: '$99' },
  { id: 2, name: 'Product 2', image: 'product2.jpg', price: '$149' },
  { id: 3, name: 'Product 3', image: 'product3.jpg', price: '$199' }
];

const carouselObj = new Carousel({
  dataSource: products,
  itemTemplate: `<div class="product-card">
    <img src="\${image}" alt="\${name}" />
    <h3>\${name}</h3>
    <p class="price">\${price}</p>
  </div>`
});

carouselObj.appendTo("#carousel");
```

### Array of URLs

```typescript
const imageUrls = [
  'url',
  'url',
  'url',
  'url'
];

const carouselObj = new Carousel({
  dataSource: imageUrls,
  itemTemplate: '<img src="${}" style="height:100%;width:100%;" alt="carousel item" />'
});

carouselObj.appendTo("#carousel");
```

## Item-Specific Configuration

### CarouselItem Interface

Each item in the array can have the following properties:

```typescript
interface CarouselItem {
  template?: string | Function;      // HTML template for the item
  cssClass?: string;                 // Custom CSS classes
  htmlAttributes?: Record<string, any>; // HTML attributes
  interval?: number;                 // Auto-play interval in milliseconds
}
```

### Example with All Properties

```typescript
const carouselObj = new Carousel({
  items: [
    {
      template: '<img src="image1.jpg" alt="Slide 1" style="height:100%;width:100%;" />',
      cssClass: 'featured-slide',
      htmlAttributes: { 'data-slide-id': '1' },
      interval: 4000
    },
    {
      template: '<img src="image2.jpg" alt="Slide 2" style="height:100%;width:100%;" />',
      cssClass: 'regular-slide',
      htmlAttributes: { 'data-slide-id': '2' },
      interval: 3000
    }
  ]
});

carouselObj.appendTo("#carousel");
```

## Common Patterns

### Image Gallery

```typescript
const gallery = new Carousel({
  items: [
    { template: '<img src="photo1.jpg" />' },
    { template: '<img src="photo2.jpg" />' },
    { template: '<img src="photo3.jpg" />' },
    { template: '<img src="photo4.jpg" />' }
  ],
  autoPlay: true,
  interval: 3000
});

gallery.appendTo("#gallery");
```

### Product Showcase

```typescript
const products = [
  { name: 'Product A', image: 'prod-a.jpg', description: 'High quality product' },
  { name: 'Product B', image: 'prod-b.jpg', description: 'Best seller' },
  { name: 'Product C', image: 'prod-c.jpg', description: 'New arrival' }
];

const showcase = new Carousel({
  dataSource: products,
  itemTemplate: `<div class="product">
    <img src="\${image}" />
    <h3>\${name}</h3>
    <p>\${description}</p>
  </div>`,
  autoPlay: true
});

showcase.appendTo("#showcase");
```

### Mixed Content Carousel

```typescript
const carousel = new Carousel({
  items: [
    { template: '<img src="image.jpg" />' },
    { template: '<video controls><source src="video.mp4"></video>' },
    { template: '<div class="text-slide"><h2>Text Content</h2><p>Some text here</p></div>' },
    { template: '<iframe src="embedded.html"></iframe>' }
  ]
});

carousel.appendTo("#carousel");
```

### Dynamic Item Loading

```typescript
const carousel = new Carousel({
  items: [] // Start empty
});

carousel.appendTo("#carousel");

// Load items dynamically
async function loadItems() {
  const response = await fetch('/api/carousel-items');
  const items = await response.json();
  carousel.items = items;
  carousel.refresh();
}

loadItems();
```

## Performance Considerations

When using large datasets or many items:

1. **Use virtual rendering** - Consider implementing virtual scrolling for large lists
2. **Lazy load templates** - Load images and content as needed
3. **Optimize images** - Use compressed/optimized images for better performance
4. **Data binding** - Use data source binding instead of manual array for large datasets
5. **WebP format** - Use WebP images for significantly smaller file sizes and faster load times

### Using WebP Image Format

WebP is a modern image format that provides superior compression with better visual quality compared to JPEG and PNG. Using WebP can significantly improve carousel performance:

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<figure class="img-container"><img src="image1.webp" alt="Image 1" style="height:100%;width:100%;" /><figcaption class="img-caption">Image 1</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="image2.webp" alt="Image 2" style="height:100%;width:100%;" /><figcaption class="img-caption">Image 2</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="image3.webp" alt="Image 3" style="height:100%;width:100%;" /><figcaption class="img-caption">Image 3</figcaption></figure>' }
  ],
  animationEffect: "Fade"
});

carouselObj.appendTo("#carousel");
```

### WebP Benefits

- **Smaller file size** - 25-35% smaller than JPEG
- **Better quality** - Maintains visual quality at smaller sizes
- **Faster load times** - Reduces bandwidth and load times
- **Modern format** - Supported by all modern browsers

### Fallback for Older Browsers

Use picture element for browser compatibility:

```html
<img>
  <picture>
    <source srcset="image.webp" type="image/webp" />
    <source srcset="image.jpg" type="image/jpeg" />
    <img src="image.jpg" alt="Image" style="height:100%;width:100%;" />
  </picture>
</img>
```

### Data Source with WebP

```typescript
// Use data source with WebP images
const imageData = [
  { url: 'url' },
  { url: 'url' },
  { url: 'url' }
];

const carousel = new Carousel({
  dataSource: imageData,
  itemTemplate: '<img src="${url}" alt="carousel item" style="height:100%;width:100%;" />'
});

carousel.appendTo("#carousel");
```

### Optimization Strategy

```typescript
// Good: Use data source with WebP and large datasets
const largeDataSet = new Array(1000).fill(null).map((_, i) => ({
  image: `image-${i}.webp`  // Use WebP format
}));

const carousel = new Carousel({
  dataSource: largeDataSet,
  itemTemplate: '<img src="${image}" loading="lazy" />'  // Add lazy loading
});

carousel.appendTo("#carousel");
```
