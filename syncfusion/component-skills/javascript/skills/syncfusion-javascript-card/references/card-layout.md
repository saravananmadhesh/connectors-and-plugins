# Card Layouts and Images

## Table of Contents
- [Full-Width Card Images](#full-width-card-images)
- [Image Titles and Captions](#image-titles-and-captions)
- [Customizing Image Title Position](#customizing-image-title-position)
- [Separators and Dividers](#separators-and-dividers)
- [Horizontal Card Layout](#horizontal-card-layout)
- [Stacked Content within Horizontal](#stacked-content-within-horizontal)
- [Layout Best Practices](#layout-best-practices)

---

## Full-Width Card Images

### Basic Card Image

Add full-width images to your card using the `e-card-image` class:

```html
<div class="e-card">
    <div class="e-card-image" style="
        background-image: url('featured-image.png');
        background-size: cover;
        background-position: center;
        height: 200px;
    "></div>
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Featured Post</div>
        </div>
    </div>
    <div class="e-card-content">
        This is a featured post with a full-width image at the top.
    </div>
</div>
```

### Image with Content

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-image" style="
        background-image: url('javascript.png');
        background-size: cover;
        height: 160px;
    "></div>
    <div class="e-card-content">
        <strong>JavaScript Succinctly</strong>
        <p>JavaScript Succinctly was written to give readers an accurate, concise 
        examination of JavaScript objects and their supporting nuances, such as 
        complex values, primitive values, scope, inheritance, the head object, 
        and more.</p>
    </div>
</div>
```

### Responsive Image Height

```html
<div class="e-card" style="max-width: 100%; flex: 1 1 calc(33% - 20px);">
    <div class="e-card-image" style="
        background-image: url('responsive-image.png');
        background-size: cover;
        background-position: center;
        height: 200px;
    "></div>
    <div class="e-card-content">
        Responsive card with flexible sizing
    </div>
</div>
```

---

## Image Titles and Captions

### Adding Image Titles

Include a title or caption on the image using the `e-card-title` class:

```html
<div class="e-card">
    <div class="e-card-image" style="
        background-image: url('nodejs.png');
        background-size: cover;
        height: 160px;
    ">
        <div class="e-card-title">Node.js</div>
    </div>
    <div class="e-card-content">
        Node.js is a wildly popular platform for writing web applications that 
        has revolutionized web development in many ways, enjoying support across 
        the open source community as well as industry.
    </div>
</div>
```

### Default Title Positioning

By default, image titles are positioned in the **bottom-left corner** with an overlay:

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-image" style="
        background-image: url('book-cover.png');
        background-size: cover;
        height: 200px;
        position: relative;
    ">
        <div class="e-card-title" style="
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 10px;
            width: 100%;
        ">
            Book Title
        </div>
    </div>
</div>
```

### Title Overlay Styling

```html
<div class="e-card-image" style="
    background-image: url('image.png');
    background-size: cover;
    height: 200px;
">
    <div class="e-card-title" style="
        background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
        color: white;
        padding: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 18px;
        font-weight: bold;
    ">
        Scenic Location
    </div>
</div>
```

---

## Customizing Image Title Position

Image titles are positioned using inline CSS positioning. By default, titles appear in the bottom-left corner with an overlay background. You can customize the position using CSS absolute positioning within the image container.

### Bottom-Left Position (Default)

```html
<div class="e-card">
    <div class="e-card-image" style="
        background-image: url('image.png');
        background-size: cover;
        height: 200px;
        position: relative;
    ">
        <div class="e-card-title" style="
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 10px;
            width: 100%;
        ">
            Bottom Left Title
        </div>
    </div>
</div>
```

### Top-Left Position

```html
<div class="e-card">
    <div class="e-card-image" style="
        background-image: url('image.png');
        background-size: cover;
        height: 200px;
        position: relative;
    ">
        <div class="e-card-title" style="
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 10px;
        ">
            Top Left Title
        </div>
    </div>
</div>
```

### Top-Right Position

```html
<div class="e-card-image" style="
    background-image: url('image.png');
    background-size: cover;
    height: 200px;
    position: relative;
">
    <div class="e-card-title" style="
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 10px;
    ">
        Top Right Title
    </div>
</div>
```

### Bottom-Right Position

```html
<div class="e-card-image" style="
    background-image: url('image.png');
    background-size: cover;
    height: 200px;
    position: relative;
">
    <div class="e-card-title" style="
        position: absolute;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 10px;
    ">
        Bottom Right Title
    </div>
</div>
```

### Dynamic Title Position

```typescript
// TypeScript example for changing title position
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let dropDownListObject: DropDownList = new DropDownList({
    placeholder: "Select Position",
    change: changed,
});

dropDownListObject.appendTo('#title_position');

function changed(e: any) {
    let cardEle = document.querySelector('.e-card');
    let titleEle = cardEle.querySelector('.e-card-image .e-card-title');
    
    // Remove all position classes
    titleEle.className = 'e-card-title';
    
    // Add new position class
    titleEle.classList.add('e-card-' + e.value);
}
```

### Position Selection Example

```html
<div class="e-card">
    <div style="margin-bottom: 20px;">
        <label for="title_position">Choose Title Position:</label>
        <select id="title_position">
            <option value="bottom-left">Bottom Left</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-right">Bottom Right</option>
        </select>
    </div>
    <div class="e-card-image" style="
        background-image: url('node-js.png');
        background-size: cover;
        height: 200px;
        position: relative;
    ">
        <div class="e-card-title" style="
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 10px;
            width: 100%;
        ">
            Node.js
        </div>
    </div>
    <div class="e-card-content">
        Node.js is a wildly popular platform for writing web applications...
    </div>
</div>
```

---

## Separators and Dividers

### Basic Separator

Use the `e-card-separator` class to create visual dividers within cards:

```html
<div class="e-card">
    <div class="e-card-title">Explore Cities</div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        Sydney is a city on the east coast of Australia. Sydney is the capital 
        city of New South Wales. About four million people live in Sydney which 
        makes it the biggest city in Oceania.
    </div>
</div>
```

### Multiple Sections with Separators

```html
<div class="e-card" style="max-width: 500px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Explore Cities</div>
        </div>
    </div>
    
    <div class="e-card-content">
        <strong>Sydney</strong>
        <p>Sydney is a city on the east coast of Australia.</p>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <strong>New York</strong>
        <p>New York City has been described as the cultural, financial, and media 
        capital of the world.</p>
    </div>
    <div class="e-card-separator"></div>
    
    <div class="e-card-content">
        <strong>Malaysia</strong>
        <p>Malaysia is one of the Southeast Asian countries, on a peninsula of the 
        Asian continent.</p>
    </div>
</div>
```

### Customized Separator Styling

```html
<div class="e-card-separator" style="
    height: 2px;
    background: linear-gradient(to right, transparent, #ccc, transparent);
    margin: 20px 0;
"></div>
```

### Separator with Text

```html
<div class="e-card-content">
    First section content
</div>
<div style="
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
">
    <div style="flex: 1; height: 1px; background: #ccc;"></div>
    <span style="color: #999; font-size: 12px;">or</span>
    <div style="flex: 1; height: 1px; background: #ccc;"></div>
</div>
<div class="e-card-content">
    Second section content
</div>
```

---

## Horizontal Card Layout

### Basic Horizontal Layout

Use the `e-card-horizontal` class to align card elements side-by-side:

```html
<div class="e-card e-card-horizontal" style="width: 400px;">
    <img src="code.png" alt="Sample" style="height: 180px; width: 180px; object-fit: cover;">
    <div class="e-card-stacked">
        <div class="e-card-header">
            <div class="e-card-header-caption">
                <div class="e-card-header-title">Philips Trimmer</div>
            </div>
        </div>
        <div class="e-card-content">
            Powered by the innovative DuraPower Technology which optimizes power 
            consumption, Philips trimmers are designed to last longer than 4 
            ordinary trimmers.
        </div>
    </div>
</div>
```

### Layout Structure

```
e-card-horizontal
├── Image (left side)
└── e-card-stacked (right side, vertical content)
    ├── Header
    ├── Content
    └── Actions
```

### Multiple Horizontal Cards

```html
<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap;">
    <div class="e-card e-card-horizontal" style="flex: 1; min-width: 350px;">
        <img src="product1.png" alt="Product 1" style="height: 150px; width: 150px; object-fit: cover;">
        <div class="e-card-stacked">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">Product 1</div>
                </div>
            </div>
            <div class="e-card-content">$49.99</div>
        </div>
    </div>
    
    <div class="e-card e-card-horizontal" style="flex: 1; min-width: 350px;">
        <img src="product2.png" alt="Product 2" style="height: 150px; width: 150px; object-fit: cover;">
        <div class="e-card-stacked">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">Product 2</div>
                </div>
            </div>
            <div class="e-card-content">$69.99</div>
        </div>
    </div>
</div>
```

---

## Stacked Content within Horizontal

### Vertical Content in Horizontal Layout

Use `e-card-stacked` within `e-card-horizontal` to create vertically-aligned content:

```html
<div class="e-card e-card-horizontal" style="max-width: 500px;">
    <div style="
        flex-shrink: 0;
        height: 200px;
        width: 200px;
        background: url('image.png') center/cover;
    "></div>
    <div class="e-card-stacked">
        <div class="e-card-title">Product Name</div>
        <div class="e-card-content">
            Product description and details
        </div>
        <div class="e-card-actions">
            <button class="e-card-btn">Buy</button>
        </div>
    </div>
</div>
```

### Complex Stacked Layout

```html
<div class="e-card e-card-horizontal" style="max-width: 600px;">
    <img src="person.png" alt="Profile" style="
        height: 200px;
        width: 150px;
        object-fit: cover;
        flex-shrink: 0;
    ">
    <div class="e-card-stacked">
        <div class="e-card-header">
            <div class="e-card-header-caption">
                <div class="e-card-header-title">John Developer</div>
                <div class="e-card-sub-title">Senior Full-Stack Developer</div>
            </div>
        </div>
        
        <div class="e-card-content">
            <strong>Bio:</strong> Experienced developer with expertise in web technologies
        </div>
        <div class="e-card-separator"></div>
        
        <div class="e-card-content">
            <strong>Skills:</strong> TypeScript, React, Node.js, PostgreSQL
        </div>
        
        <div class="e-card-actions">
            <button class="e-card-btn">View Profile</button>
            <button class="e-card-btn">Contact</button>
        </div>
    </div>
</div>
```

---

## Layout Best Practices

### 1. Responsive Horizontal Cards

```html
<div class="e-card e-card-horizontal" style="
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
">
    <img src="image.png" alt="Image" style="
        height: auto;
        width: 100%;
        max-width: 200px;
        object-fit: cover;
    ">
    <div class="e-card-stacked" style="flex: 1; min-width: 250px;">
        <!-- Stacked content -->
    </div>
</div>

@media (max-width: 600px) {
    .e-card.e-card-horizontal {
        flex-direction: column;
    }
}
```

### 2. Image Aspect Ratios

```css
/* 16:9 aspect ratio */
.e-card-image-16-9 {
    padding-bottom: 56.25%;
    position: relative;
    overflow: hidden;
}

.e-card-image-16-9 img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Usage */
<div class="e-card-image-16-9">
    <img src="video-thumbnail.png" alt="Thumbnail">
</div>
```

### 3. Image Loading

```html
<div class="e-card-image" style="
    background-image: url('image.png');
    background-size: cover;
    background-position: center;
    height: 200px;
    background-color: #f0f0f0;
"></div>
```

### 4. Performance Considerations

- Use appropriately sized images (optimize with tools like ImageOptim, TinyPNG)
- Lazy load images for better initial page load
- Use modern image formats (WebP) with fallbacks

---

## Troubleshooting

### Horizontal layout not working
**Issue**: Elements stacking vertically instead of horizontally
**Solution**: Ensure `e-card-horizontal` class is on the root card element

### Image not displaying
**Issue**: `e-card-image` appears blank
**Solution**: Add background-image URL and dimensions:
```css
.e-card-image {
    background-image: url('path/to/image.png');
    background-size: cover;
    height: 200px;
}
```

### Separator not showing
**Issue**: Divider line is invisible
**Solution**: Ensure `e-card-separator` class is applied and browser supports it

---

## See Also
- [Getting Started](getting-started.md) - Basic setup
- [Header and Content](header-and-content.md) - Header structure
- [Customization and Styling](customization-and-styling.md) - Advanced styling
