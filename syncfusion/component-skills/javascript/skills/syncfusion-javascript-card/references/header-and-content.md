# Header and Content Structure

## Table of Contents
- [Header Structure](#header-structure)
- [Title and Subtitle](#title-and-subtitle)
- [Header Images](#header-images)
- [Content Sections](#content-sections)
- [Header with Images Examples](#header-with-images-examples)
- [Best Practices](#best-practices)

---

## Header Structure

The Card header is an optional container for metadata about the card's content. It uses semantic HTML with specific CSS classes to organize title, subtitle, and image information.

### Header Container

Create a header wrapper with the `e-card-header` class:

```html
<div class="e-card">
    <div class="e-card-header">
        <!-- Header content goes here -->
    </div>
    <div class="e-card-content">
        <!-- Card body content -->
    </div>
</div>
```

### Header Elements

The Card provides several header-related classes:

| Element | Class | Purpose |
|---------|-------|---------|
| Header container | `e-card-header` | Wraps header content |
| Caption wrapper | `e-card-header-caption` | Groups title and subtitle |
| Title | `e-card-header-title` | Main header text |
| Subtitle | `e-card-sub-title` | Secondary text (optional) |
| Image | `e-card-header-image` | Decorative header image |
| Corners | `e-card-corner` | Rounds image corners |

---

## Title and Subtitle

### Title Only

Add a main title to your card header:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Card Title</div>
        </div>
    </div>
    <div class="e-card-content">
        Card content here
    </div>
</div>
```

### Title and Subtitle

Include both a main title and subtitle:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Laura Callahan</div>
            <div class="e-card-sub-title">Sales Coordinator and Representative</div>
        </div>
    </div>
    <div class="e-card-content">
        Laura received a BA in psychology from the University of Washington. 
        She has also completed a course in business French.
    </div>
</div>
```

### Multiple Content with Subtitles

```html
<div class="e-card" style="max-width: 500px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Product Name</div>
            <div class="e-card-sub-title">Category • In Stock</div>
        </div>
    </div>
    <div class="e-card-content">
        $29.99
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        High-quality product with excellent reviews
    </div>
</div>
```

---

## Header Images

### Adding Header Images

Include an image in the card header by adding a `div` with the `e-card-header-image` class:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-image"></div>
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Header Title</div>
        </div>
    </div>
    <div class="e-card-content">
        Content here
    </div>
</div>
```

### Image Sizing

Style the header image with CSS to set dimensions:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-image" style="
            background-image: url('profile.png');
            background-size: cover;
            background-position: center;
            height: 48px;
            width: 48px;
            border-radius: 50%;
        "></div>
        <div class="e-card-header-caption">
            <div class="e-card-header-title">John Doe</div>
            <div class="e-card-sub-title">Developer</div>
        </div>
    </div>
</div>
```

### Image Positioning

#### Image Before Title (Left Alignment)

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-image football"></div>
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Laura Callahan</div>
            <div class="e-card-sub-title">Sales Coordinator</div>
        </div>
    </div>
    <div class="e-card-content">
        Professional summary here
    </div>
</div>
```

#### Image After Title (Right Alignment)

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Laura Callahan</div>
            <div class="e-card-sub-title">Sales Coordinator</div>
        </div>
        <div class="e-card-header-image football"></div>
    </div>
    <div class="e-card-content">
        Professional summary here
    </div>
</div>
```

### Rounded Corners on Images

Add the `e-card-corner` class to header for rounded corners:

```html
<div class="e-card">
    <div class="e-card-header e-card-corner">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Rounded Header</div>
        </div>
        <div class="e-card-header-image football"></div>
    </div>
</div>
```

---

## Content Sections

### Single Content Section

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Article Title</div>
        </div>
    </div>
    <div class="e-card-content">
        This is the main article content. It can contain multiple paragraphs, 
        lists, or any HTML elements.
    </div>
</div>
```

### Multiple Content Sections

Use separators to organize different content areas:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">User Profile</div>
        </div>
    </div>
    <div class="e-card-content">
        <strong>Bio:</strong> Software developer with 10+ years experience
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        <strong>Skills:</strong> TypeScript, React, Node.js, CSS
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        <strong>Contact:</strong> john@example.com
    </div>
</div>
```

### Content with Rich HTML

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Blog Post</div>
            <div class="e-card-sub-title">Published on March 15, 2024</div>
        </div>
    </div>
    <div class="e-card-content">
        <p>This is a paragraph of content.</p>
        <ul>
            <li>Point one</li>
            <li>Point two</li>
            <li>Point three</li>
        </ul>
        <p>More content here...</p>
    </div>
</div>
```

---

## Header with Images Examples

### Complete Profile Card

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header">
        <div class="e-card-header-image" style="
            background-image: url('avatar.png');
            background-size: cover;
            height: 48px;
            width: 48px;
            border-radius: 50%;
            margin-right: 10px;
        "></div>
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Emily Rodriguez</div>
            <div class="e-card-sub-title">Product Manager</div>
        </div>
    </div>
    <div class="e-card-content">
        Emily leads product strategy with a focus on user experience and 
        market innovation. She has over 8 years of product management experience.
    </div>
</div>
```

### Service Card with Icon

```html
<div class="e-card" style="max-width: 350px;">
    <div class="e-card-header">
        <div class="e-card-header-image" style="
            background-color: #007bff;
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
        ">📱</div>
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Mobile Development</div>
            <div class="e-card-sub-title">iOS & Android</div>
        </div>
    </div>
    <div class="e-card-content">
        Build native and cross-platform mobile applications with the latest 
        frameworks and best practices.
    </div>
</div>
```

### Team Member Card with Background Image

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header" style="
        background-image: url('header-bg.png');
        background-size: cover;
        background-position: center;
        padding: 20px;
    ">
        <div class="e-card-header-caption">
            <div class="e-card-header-title" style="color: white; font-weight: bold;">
                Alex Thompson
            </div>
            <div class="e-card-sub-title" style="color: rgba(255,255,255,0.9);">
                Lead Developer
            </div>
        </div>
    </div>
    <div class="e-card-content">
        Expert in full-stack web development with specialization in TypeScript 
        and enterprise applications.
    </div>
</div>
```

---

## Best Practices

### 1. Header Content Guidelines
- Keep titles concise (2-5 words recommended)
- Use subtitles for secondary information only
- Limit subtitle length to one line when possible

### 2. Image Sizing
- Header images: 40-80px dimensions recommended
- Use square images for circular avatars
- Optimize images for web (compressed, correct format)

### 3. Content Organization
- Use headers for key identifying information
- Reserve content area for descriptive text
- Use separators to break long content into sections

### 4. Accessibility
- Add meaningful alt text if using background images
- Ensure sufficient color contrast for titles
- Use semantic HTML structure
- Add `tabindex="0"` to cards for keyboard navigation

### 5. Responsive Design
```html
<div class="e-card" style="
    max-width: 400px;
    margin: 10px;
    flex: 1 1 calc(33% - 20px);
">
    <!-- Card content -->
</div>
```

---

## Troubleshooting

### Header not displaying properly
**Issue**: Header text or image not visible
**Solution**: Ensure `e-card-header` and child elements have correct classes

### Image not showing
**Issue**: Header image div is empty
**Solution**: Add background-image URL and height/width styles:
```css
.e-card-header-image {
    background-image: url('path/to/image.png');
    background-size: cover;
    height: 48px;
    width: 48px;
}
```

### Subtitle text overlapping
**Issue**: Subtitle text running into or under title
**Solution**: Add styling to `e-card-header-caption`:
```css
.e-card-header-caption {
    display: flex;
    flex-direction: column;
    flex: 1;
}
```

---

## See Also
- [Getting Started](getting-started.md) - Basic setup and installation
- [Card Layouts and Images](card-layout.md) - Full-width card images
- [Customization and Styling](customization-and-styling.md) - Header styling
