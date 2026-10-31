# Header and Content in Card Component

## Table of Contents

- [Header Overview](#header-overview)
- [Header Elements](#header-elements)
- [Adding Titles and Subtitles](#adding-titles-and-subtitles)
- [Header Images](#header-images)
- [Content Areas](#content-areas)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Header Overview

The Card header is an optional section that displays information at the top of your card. Headers help organize and categorize the card content, making it easier for users to understand what the card contains.

**Key features:**
- Text-based headers (titles and descriptions)
- Optional header images
- Flexible layout using the `e-card-header` class
- Works with both vertical and horizontal layouts

## Header Elements

The Card component provides simple structure for building headers:

### HTML Structure

```html
<div class="e-card">
    <div class="e-card-header">           
        <!-- Header content goes here -->
    </div>
</div>
```

### Header Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `e-card-header` | `<div>` | Wrapper for entire header section |
| `e-card-image` | `<div>` | Image container (can be in header) |
| `e-card-corner` | Applied to image | Adds rounded corners to images |

## Adding Titles and Subtitles

### Basic Header

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Product Name</strong></p>
        <p>Category or Description</p>
    </div>
    <div class="e-card-content">
        More details about the product...
    </div>
</div>
```

**Result:**
- Title appears in bold
- Description appears below
- Both are in the header section

### Header-Only Card

If you only need a header:

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Just a Title</strong></p>
    </div>
</div>
```

## Header Images

Headers can include images for visual context. Use the `e-card-image` class to add images.

### Basic Header with Image

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-image e-card-corner" style="width: 60px; height: 60px;">
            <img src="profile.jpg" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="margin-left: 15px;">
            <p><strong>John Doe</strong></p>
            <p>Software Engineer</p>
        </div>
    </div>
    <div class="e-card-content">
        User profile details...
    </div>
</div>
```

**Result:**
- Profile image appears on the left
- Title and subtitle appear on the right
- `e-card-corner` class adds rounded corners to the image

## Content Areas

Content is the main body section of the card where you place the primary information.

### Basic Content

```html
<div class="e-card">
    <div class="e-card-content">
        <p>This is the main content of your card.</p>
        <p>You can add multiple paragraphs, lists, or any HTML.</p>
    </div>
</div>
```

### Content Placement Options

**Content inside header block:**
```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Title</div>
        </div>
        <div class="e-card-content">Content here</div>
    </div>
</div>
```

**Content as separate block (recommended):**
```html
<div class="e-card">
    <div class="e-card-header">
        <!-- Header elements -->
    </div>
    <div class="e-card-content">
        <!-- Content elements -->
    </div>
</div>
```

### Rich Content

Content areas support any HTML elements:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Article</div>
        </div>
    </div>
    <div class="e-card-content">
        <p>Description text...</p>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
        </ul>
        <p>More information...</p>
    </div>
</div>
```

## Complete Examples

### Example 1: User Card

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-image e-card-corner" style="width: 70px; height: 70px; margin-bottom: 10px;">
            <img src="user.jpg" alt="User" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <p><strong>Sarah Johnson</strong></p>
            <p>Product Manager</p>
        </div>
    </div>
    <div class="e-card-content">
        <p>Experienced product manager with 8 years in software development.</p>
    </div>
</div>
```

### Example 2: Blog Post Card

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Getting Started with ASP.NET Core</strong></p>
        <p><small>Published on April 16, 2026</small></p>
    </div>
    <div class="e-card-content">
        <p>Learn the fundamentals of ASP.NET Core development with our comprehensive guide.</p>
        <p>Topics covered: setup, routing, middleware, and more.</p>
    </div>
</div>
```

### Example 3: Product Card

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Wireless Headphones</strong></p>
        <p><small>Premium Audio Experience</small></p>
    </div>
    <div class="e-card-content">
        <p><strong>Price:</strong> $99.99</p>
        <p><strong>Features:</strong> Noise cancellation, 30-hour battery, Bluetooth 5.0</p>
        <p>High-quality sound and all-day comfort for work and play.</p>
    </div>
</div>
```

## Best Practices

1. **Keep titles concise** — Use clear, descriptive titles that immediately convey the card's purpose
2. **Use subtitles for context** — Add metadata, dates, categories, or descriptions in subtitles
3. **Optimize image sizes** — Resize header images appropriately (typically 40-80px for profile images)
4. **Maintain visual hierarchy** — Ensure titles are more prominent than subtitles
5. **Apply consistent styling** — Use CSS to standardize title colors, sizes, and spacing across all cards
6. **Test responsive layouts** — Verify headers display well on mobile and desktop devices
7. **Keep content scannable** — Use short paragraphs and lists in content areas for easy reading
