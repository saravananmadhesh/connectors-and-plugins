# Images and Dividers in Card Component

## Images in Cards

### Full-Width Card Images

The Card component supports full-width images that span the entire card width. Add an image container with the `e-card-image` class:

```html
<div class="e-card">
    <div class="e-card-image">
        <!-- Image content goes here -->
    </div>
</div>
```

**Important:** By default, card images occupy the full width of their parent container.

### Adding Images

You can add background images via CSS or direct `<img>` tags:

**Using CSS background:**
```html
<div class="e-card">
    <div class="e-card-image" style="background-image: url('product.jpg'); background-size: cover; height: 250px;">
    </div>
</div>
```

**Using img tag:**
```html
<div class="e-card">
    <div class="e-card-image">
        <img src="product.jpg" alt="Product" style="width: 100%; height: auto;">
    </div>
</div>
```

### Image with Content

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="product.jpg" alt="Product" style="width: 100%; height: auto;">
    </div>
    <div class="e-card-content">
        <p>Product details...</p>
    </div>
</div>
```

## Image Titles and Overlays

Cards support overlay titles on images, positioned at the bottom-left by default.

### Basic Image with Title

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="gallery.jpg" alt="Gallery">
        <div class="e-card-title">Gallery Title</div>
    </div>
</div>
```

**Result:**
- Image displays full width
- Title overlay appears at bottom-left of the image with semi-transparent background

### Image Title with Multiple Cards

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="beach.jpg" alt="Beach">
        <div class="e-card-title">Summer Beach</div>
    </div>
</div>

<div class="e-card">
    <div class="e-card-image">
        <img src="mountain.jpg" alt="Mountain">
        <div class="e-card-title">Mountain Peak</div>
    </div>
</div>

<div class="e-card">
    <div class="e-card-image">
        <img src="forest.jpg" alt="Forest">
        <div class="e-card-title">Forest Path</div>
    </div>
</div>
```

## Customizing Image Title Position

By default, image titles appear at the bottom-left corner. You can customize the position using CSS.

### Top-Left Position

```css
.e-card-image .e-card-title {
    top: 10px;
    left: 10px;
    bottom: auto;
}
```

### Center Position

```css
.e-card-image .e-card-title {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: auto;
    text-align: center;
}
```

### Top-Right Position

```css
.e-card-image .e-card-title {
    top: 10px;
    right: 10px;
    left: auto;
    bottom: auto;
    text-align: right;
}
```

### Example: Custom Positioning

```html
<style>
    .custom-title-top-center .e-card-image .e-card-title {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        bottom: auto;
        text-align: center;
    }
</style>

<div class="e-card custom-title-top-center">
    <div class="e-card-image">
        <img src="featured.jpg" alt="Featured">
        <div class="e-card-title">Featured Content</div>
    </div>
</div>
```

## Dividers

Dividers (separators) are used to visually separate different sections within a card. Use the `e-card-separator` class to add a divider.

### Basic Divider

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Card Title</div>
        </div>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        Content after divider
    </div>
</div>
```

### Multiple Dividers

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Section 1</div>
        </div>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        Content for section 1
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        Content for section 2
    </div>
</div>
```

### Divider with Actions

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Product</div>
        </div>
    </div>
    
    <div class="e-card-content">
        Product description...
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Add to Cart</button>
        <button class="e-card-btn">View Details</button>
    </div>
</div>
```

## Complete Examples

### Example 1: Gallery Card

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="gallery.jpg" alt="Gallery" style="width: 100%; height: 200px; object-fit: cover;">
        <div class="e-card-title">Beautiful Landscape</div>
    </div>
    <div class="e-card-content">
        <p><strong>Location:</strong> Swiss Alps</p>
        <p><strong>Date:</strong> August 2026</p>
    </div>
</div>
```

### Example 2: Product Card with Details

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="product.jpg" alt="Product" style="width: 100%; height: 180px; object-fit: cover;">
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <p><strong>Product Name:</strong> Premium Keyboard</p>
        <p><strong>Price:</strong> $149.99</p>
        <p><strong>Rating:</strong> ★★★★★ (5.0)</p>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Buy Now</button>
        <button class="e-card-btn">Save for Later</button>
    </div>
</div>
```

### Example 3: Content Card with Dividers

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Article Summary</div>
            <div class="e-card-sub-title">April 16, 2026</div>
        </div>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <p>Introduction to the article topic...</p>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <p><strong>Key Points:</strong></p>
        <ul>
            <li>Point 1</li>
            <li>Point 2</li>
            <li>Point 3</li>
        </ul>
    </div>
</div>
```

## Best Practices

1. **Use appropriate image dimensions** — Keep images responsive and properly sized for different screen sizes
2. **Optimize image files** — Compress images to reduce page load time
3. **Provide alt text** — Always include descriptive alt text for accessibility
4. **Use dividers sparingly** — Add dividers only where they improve visual clarity and organization
5. **Consider mobile view** — Test how images and dividers appear on mobile devices
6. **Match your design** — Customize divider colors and styles to match your application theme
7. **Keep images proportional** — Maintain consistent aspect ratios across cards for visual consistency
