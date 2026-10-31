# Action Buttons in Card Component

## Action Button Basics

Action buttons allow users to interact with card content. Buttons and links can be added within a card using the `e-card-actions` container class.

### Structure

```html
<div class="e-card">
    <div class="e-card-actions">
        <button class="e-card-btn">Button Label</button>
        <a href="#" class="e-card-btn">Link Label</a>
    </div>
</div>
```

### Action Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `e-card-actions` | `<div>` | Container for action buttons |
| `e-card-btn` | `<button>` or `<a>` | Styles individual buttons/links |
| `e-card-vertical` | Applied to `e-card-actions` | Stacks buttons vertically |

## Horizontal Action Buttons

By default, action buttons are arranged horizontally (left to right).

### Basic Horizontal Layout

```html
<div class="e-card">
    <div class="e-card-content">
        Your card content here
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Save</button>
        <button class="e-card-btn">Delete</button>
        <button class="e-card-btn">Share</button>
    </div>
</div>
```

**Result:**
- Buttons appear in a row
- Buttons are equally spaced
- Buttons align to the left by default

### Horizontal with Different Button Types

```html
<div class="e-card">
    <div class="e-card-content">
        Product details...
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Add to Cart</button>
        <a href="/details" class="e-card-btn">View Full Details</a>
    </div>
</div>
```

## Vertical Action Buttons

To stack action buttons vertically, add the `e-card-vertical` class to the actions container.

### Basic Vertical Layout

```html
<div class="e-card">
    <div class="e-card-actions e-card-vertical">
        <button class="e-card-btn">Edit</button>
        <button class="e-card-btn">Archive</button>
        <button class="e-card-btn">Delete</button>
    </div>
</div>
```

**Result:**
- Buttons stack vertically (top to bottom)
- Each button takes full width of the container
- Buttons are evenly spaced vertically

### Vertical with Links

```html
<div class="e-card">
    <div class="e-card-actions e-card-vertical">
        <a href="/profile" class="e-card-btn">View Profile</a>
        <a href="/settings" class="e-card-btn">Settings</a>
        <a href="/logout" class="e-card-btn">Logout</a>
    </div>
</div>
```

## Complete Card Examples

### Example 1: Product Card with Horizontal Actions

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="product.jpg" alt="Product" style="width: 100%; height: 200px; object-fit: cover;">
    </div>
    
    <div class="e-card-content">
        <p><strong>Wireless Mouse</strong></p>
        <p>Price: $29.99</p>
        <p>High precision, ergonomic design, 2.4GHz wireless</p>
    </div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Add to Cart</button>
        <button class="e-card-btn">More Info</button>
        <button class="e-card-btn">Share</button>
    </div>
</div>
```

### Example 2: To-Do Item with Vertical Actions

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Complete Project Proposal</strong></p>
        <p><small>Due: April 20, 2026</small></p>
    </div>
    
    <div class="e-card-content">
        <p>Finish the project proposal document and send for review.</p>
    </div>
    
    <div class="e-card-actions e-card-vertical">
        <button class="e-card-btn">Mark Complete</button>
        <button class="e-card-btn">Extend Deadline</button>
        <button class="e-card-btn">Delete</button>
    </div>
</div>
```

### Example 3: User Profile Card

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-image e-card-corner" style="width: 60px; height: 60px; margin-bottom: 10px;">
            <img src="user.jpg" alt="User" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <p><strong>John Anderson</strong></p>
            <p><small>Software Developer</small></p>
        </div>
    </div>
    
    <div class="e-card-content">
        <p>Experienced developer with expertise in ASP.NET Core and cloud technologies.</p>
    </div>
    
    <div class="e-card-actions">
        <button class="e-card-btn">Connect</button>
        <button class="e-card-btn">Message</button>
        <a href="#" class="e-card-btn">View Profile</a>
    </div>
</div>
```

### Example 4: Blog Post Card

```html
<div class="e-card">
    <div class="e-card-image">
        <img src="blog.jpg" alt="Blog" style="width: 100%; height: 180px; object-fit: cover;">
        <div class="e-card-title">Getting Started with Cloud</div>
    </div>
    
    <div class="e-card-content">
        <p><strong>Author:</strong> Sarah Johnson</p>
        <p><strong>Published:</strong> April 16, 2026</p>
        <p>Learn the basics of cloud computing and how to get started with your first cloud project...</p>
    </div>
    
    <div class="e-card-actions">
        <a href="/blog/cloud-guide" class="e-card-btn">Read Full Post</a>
        <button class="e-card-btn">Save</button>
        <button class="e-card-btn">Share</button>
    </div>
</div>
```

## Styling Action Buttons

### Custom Button Colors

```css
.e-card-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.e-card-btn:hover {
    background-color: #0056b3;
}
```

### Alternative Button Styles

```css
/* Primary style */
.e-card-btn.primary {
    background-color: #28a745;
}

/* Danger style */
.e-card-btn.danger {
    background-color: #dc3545;
}

/* Secondary style */
.e-card-btn.secondary {
    background-color: #6c757d;
}
```

### Usage

```html
<div class="e-card-actions">
    <button class="e-card-btn primary">Save</button>
    <button class="e-card-btn secondary">Cancel</button>
    <button class="e-card-btn danger">Delete</button>
</div>
```

## Button Spacing and Alignment

### Custom Spacing Between Buttons

```css
.e-card-actions {
    gap: 10px;  /* Space between buttons */
}
```

### Right-Aligned Buttons

```css
.e-card-actions {
    justify-content: flex-end;
}
```

### Space-Between Buttons

```css
.e-card-actions {
    justify-content: space-between;
}
```

### Center-Aligned Buttons

```css
.e-card-actions {
    justify-content: center;
}
```

## Best Practices

1. **Use clear labels** — Button text should clearly indicate the action (e.g., "Add to Cart", not "Click Here")
2. **Limit action count** — Keep to 2-4 actions per card to avoid overwhelming users
3. **Order by importance** — Place primary actions first (left for horizontal, top for vertical)
4. **Use consistent sizing** — All buttons in a card should be the same size
5. **Provide feedback** — Consider adding hover states and loading indicators
6. **Consider mobile** — Vertical layout works better on mobile; horizontal layout for desktop
7. **Test accessibility** — Ensure buttons are keyboard accessible and have proper ARIA labels
8. **Match your design** — Use colors and styles consistent with your application theme
