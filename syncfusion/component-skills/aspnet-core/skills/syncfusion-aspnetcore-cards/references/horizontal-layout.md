# Horizontal and Stacked Layouts in Card Component

## Horizontal Card Layout

By default, card elements are arranged vertically (stacked top to bottom). The `e-card-horizontal` class enables horizontal alignment where elements are arranged left to right.

### Basic Horizontal Layout

```html
<div class="e-card e-card-horizontal">
    <img src="image.jpg" alt="Image">
    <div class="e-card-content">
        Content on the right side
    </div>
</div>
```

**Result:**
- Image appears on the left
- Content flows to the right
- Elements align horizontally instead of stacking vertically

## Understanding Horizontal Layout

### Vertical (Default)

```
┌──────────────────┐
│   Image/Header   │
├──────────────────┤
│   Content        │
├──────────────────┤
│   Actions        │
└──────────────────┘
```

### Horizontal

```
┌─────────────────────────────────────┐
│ Image │ Content │ Actions on right  │
└─────────────────────────────────────┘
```

## Examples of Horizontal Layouts

### Example 1: Image Left + Content Right

```html
<div class="e-card e-card-horizontal">
    <img src="product.jpg" alt="Product" style="width: 150px; height: 150px; object-fit: cover;">
    <div class="e-card-content">
        <p><strong>Product Name</strong></p>
        <p>Price: $99.99</p>
        <p>High-quality product with excellent features.</p>
    </div>
</div>
```

**Result:**
- Product image fixed on left (150x150px)
- Content (title, price, description) flows on right
- Perfect for product listings

### Example 2: Thumbnail + Header + Content

```html
<div class="e-card e-card-horizontal">
    <div style="width: 100px;">
        <img src="user.jpg" alt="User" style="width: 100%; height: 100px; object-fit: cover;">
    </div>
    <div style="flex: 1; padding: 10px;">
        <div class="e-card-header">
            <p><strong>John Doe</strong></p>
            <p><small>Posted 2 hours ago</small></p>
        </div>
        <div class="e-card-content">
            <p>This is a social media post or comment content.</p>
        </div>
    </div>
</div>
```

**Result:**
- Thumbnail on left
- User info (header) and content on right
- Great for social media feeds

### Example 3: Icon + Content + Actions

```html
<div class="e-card e-card-horizontal">
    <div style="width: 80px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 40px;">📧</span>
    </div>
    <div style="flex: 1;">
        <div class="e-card-content">
            <p><strong>Email Notification</strong></p>
            <p>You have received a new email message.</p>
        </div>
    </div>
    <div style="display: flex; align-items: center;">
        <button class="e-card-btn">View</button>
    </div>
</div>
```

## Stacked Sections in Horizontal Layouts

The `e-card-stacked` class allows specific sections to remain vertically stacked within a horizontal layout.

### Syntax

```html
<div class="e-card e-card-horizontal">
    <img src="image.jpg" alt="Image">   <!-- Horizontal -->
    <div class="e-card-stacked">        <!-- Vertical -->
        <!-- Content stacks vertically here -->
    </div>
</div>
```

### Example: Image + Stacked Content

```html
<div class="e-card e-card-horizontal">
    <img src="product.jpg" alt="Product" style="width: 180px; height: 180px; object-fit: cover;">
    <div class="e-card-stacked">
        <div class="e-card-header">
            <div class="e-card-header-caption">
                <div class="e-card-header-title">Laptop Stand</div>
                <div class="e-card-sub-title">Office Equipment</div>
            </div>
        </div>
        <div class="e-card-content">
            <p><strong>Price:</strong> $49.99</p>
            <p><strong>Rating:</strong> ★★★★★ (4.8/5)</p>
            <p>Ergonomic design for improved posture and productivity.</p>
        </div>
        <div class="e-card-separator"></div>
        <div class="e-card-actions">
            <button class="e-card-btn">Add to Cart</button>
            <button class="e-card-btn">Save for Later</button>
        </div>
    </div>
</div>
```

**Result:**
- Image on left (fixed width)
- Header, content, separator, and actions stack vertically on right
- Clean product card layout

### Example: Multiple Stacked Sections

```html
<div class="e-card e-card-horizontal">
    <div style="width: 120px;">
        <img src="profile.jpg" alt="Profile" style="width: 100%; height: auto;">
    </div>
    <div class="e-card-stacked" style="flex: 1;">
        <div class="e-card-content">
            <p><strong>Jane Smith</strong></p>
            <p>Senior Designer at TechCorp</p>
        </div>
        <div class="e-card-separator"></div>
        <div class="e-card-content">
            <p>5 years of experience in UI/UX design and product development.</p>
        </div>
    </div>
</div>
```

## Horizontal Layout with Actions

### Actions on the Right

```html
<div class="e-card e-card-horizontal">
    <div style="flex: 1;">
        <div class="e-card-content">
            <p><strong>Project Name</strong></p>
            <p>Status: In Progress</p>
        </div>
    </div>
    <div class="e-card-actions" style="align-self: center;">
        <button class="e-card-btn">Edit</button>
        <button class="e-card-btn">Archive</button>
    </div>
</div>
```

### Actions Below Content

```html
<div class="e-card e-card-horizontal">
    <img src="item.jpg" alt="Item" style="width: 150px; height: 150px; object-fit: cover;">
    <div class="e-card-stacked" style="flex: 1;">
        <div class="e-card-content">
            <p><strong>Item Title</strong></p>
            <p>Item description and details go here.</p>
        </div>
        <div class="e-card-actions">
            <button class="e-card-btn">Select</button>
            <button class="e-card-btn">Preview</button>
            <button class="e-card-btn">Remove</button>
        </div>
    </div>
</div>
```

## Real-World Examples

### Example 1: E-Commerce Product List Item

```html
<div class="e-card e-card-horizontal">
    <img src="laptop.jpg" alt="Laptop" style="width: 200px; height: 200px; object-fit: cover;">
    <div class="e-card-stacked" style="flex: 1; padding: 20px;">
        <div class="e-card-header">
            <p><strong>Portable Laptop 15"</strong></p>
            <p><small>Electronics > Computers</small></p>
        </div>
        <div class="e-card-content">
            <p><strong>Price:</strong> $1,299.99 <span style="text-decoration: line-through;">$1,499.99</span></p>
            <p><strong>Stock:</strong> 45 units available</p>
            <p>High-performance laptop with Intel Core i7, 16GB RAM, 512GB SSD.</p>
        </div>
        <div class="e-card-actions">
            <button class="e-card-btn">Add to Cart</button>
            <button class="e-card-btn">Buy Now</button>
            <button class="e-card-btn">Add to Wishlist</button>
        </div>
    </div>
</div>
```

### Example 2: Message/Comment Card

```html
<div class="e-card e-card-horizontal">
    <div style="width: 60px;">
        <img src="avatar.jpg" alt="Avatar" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
    </div>
    <div class="e-card-stacked" style="flex: 1;">
        <div class="e-card-header">
            <p><strong>Sarah Johnson</strong></p>
            <p><small>2 hours ago</small></p>
        </div>
        <div class="e-card-content">
            <p>Great product! I've been using it for a month and it's exactly what I was looking for. Highly recommended!</p>
        </div>
        <div class="e-card-actions">
            <button class="e-card-btn">Reply</button>
            <button class="e-card-btn">Like</button>
            <button class="e-card-btn">Report</button>
        </div>
    </div>
</div>
```

### Example 3: Task/Todo Item

```html
<div class="e-card e-card-horizontal" style="border-left: 4px solid #ffc107;">
    <div style="width: 50px; display: flex; align-items: center; justify-content: center;">
        <input type="checkbox" />
    </div>
    <div class="e-card-stacked" style="flex: 1;">
        <div class="e-card-content">
            <p><strong>Complete quarterly report</strong></p>
            <p>Due: April 30, 2026</p>
        </div>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background-color: #ffc107; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">HIGH PRIORITY</span>
        <button class="e-card-btn" style="padding: 6px 12px;">Edit</button>
    </div>
</div>
```

## Responsive Considerations

### Desktop Layout (Horizontal)

```html
<div class="e-card e-card-horizontal">
    <!-- Horizontal layout on desktop -->
</div>
```

### Mobile Layout (Vertical)

For mobile devices, consider switching to vertical layout:

```css
@media (max-width: 768px) {
    .e-card.e-card-horizontal {
        flex-direction: column;
    }
}
```

## Best Practices

1. **Fixed image width** — Set specific widths for images to maintain consistency
2. **Use flex layouts** — Apply `flex: 1` to content areas to fill available space
3. **Vertical centering** — Use `align-self: center` or flexbox for proper alignment
4. **Maintain proportions** — Keep image aspect ratios consistent across cards
5. **Responsive testing** — Test horizontal layouts on mobile to ensure they reflow properly
6. **Visual hierarchy** — Place images first (left), then content, then actions (right)
7. **Padding and spacing** — Add consistent padding within stacked sections
8. **Consider touch targets** — Ensure buttons are large enough for touch interaction on mobile
