# Action Buttons

## Table of Contents
- [Overview](#overview)
- [Action Button Structure](#action-button-structure)
- [Horizontal Alignment (Default)](#horizontal-alignment-default)
- [Vertical Alignment](#vertical-alignment)
- [Button Styling](#button-styling)
- [Mixed Button Types](#mixed-button-types)
- [Practical Examples](#practical-examples)
- [Event Handling](#event-handling)
- [Accessibility Considerations](#accessibility-considerations)
- [See Also](#see-also)

## Overview

Action buttons provide interactive functionality within cards. They enable user actions such as submitting forms, opening links, or triggering events. The Card component supports both button and anchor elements arranged in horizontal or vertical layouts.

---

## Action Button Structure

### Container Element

Create an action button container with the `e-card-actions` class:

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Card with Actions</div>
        </div>
    </div>
    <div class="e-card-content">
        Card content here
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Action 1</button>
        <button class="e-card-btn">Action 2</button>
    </div>
</div>
```

### Button Element

Use standard HTML `button` elements with the `e-card-btn` class:

```html
<button class="e-card-btn">
    Click Me
</button>
```

### Anchor Links

Mix anchor elements with buttons in the actions container:

```html
<div class="e-card-actions">
    <button class="e-card-btn">Buy Now</button>
    <a href="#details" class="e-card-btn">Details</a>
</div>
```

---

## Horizontal Alignment (Default)

By default, action buttons are aligned horizontally across the card. This is the standard layout for most use cases.

### Basic Horizontal Layout

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header-title">Eiffel Tower</div>
    <div class="e-card-content">
        The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">
            <img src="./fav.png" style="height: 18px; width: 18px;" title="Bookmark">
        </button>
        <button class="e-card-btn">
            <img src="./like.png" style="height: 18px; width: 18px;" title="Like">
        </button>
        <button class="e-card-btn">
            <img src="./share.png" style="height: 18px; width: 18px;" title="Share">
        </button>
    </div>
</div>
```

### Multiple Horizontal Buttons

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Product Card</div>
        </div>
    </div>
    <div class="e-card-content">
        Amazing product with great features and affordable price
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Add to Cart</button>
        <button class="e-card-btn">Wishlist</button>
        <button class="e-card-btn">Compare</button>
    </div>
</div>
```

### Text and Icon Buttons

```html
<div class="e-card-actions">
    <button class="e-card-btn">
        <span>📧 Email</span>
    </button>
    <button class="e-card-btn">
        <span>💬 Message</span>
    </button>
</div>
```

---

## Vertical Alignment

Add the `e-card-vertical` class to `e-card-actions` to stack buttons vertically:

```html
<div class="e-card" style="max-width: 400px;">
    <div class="e-card-header-title">Eiffel Tower</div>
    <div class="e-card-content">
        The Eiffel Tower is acknowledged as the universal symbol of Paris and France.
    </div>
    <div class="e-card-actions e-card-vertical">
        <button class="e-card-btn">LIKE</button>
        <button class="e-card-btn">SHARE</button>
        <button class="e-card-btn">MORE</button>
    </div>
</div>
```

### Vertical Button Styling

```html
<div class="e-card-actions e-card-vertical">
    <button class="e-card-btn" style="
        width: 100%;
        padding: 10px;
        text-align: left;
        border: none;
        background: transparent;
        cursor: pointer;
    ">
        📝 Edit
    </button>
    <button class="e-card-btn" style="
        width: 100%;
        padding: 10px;
        text-align: left;
        border: none;
        background: transparent;
        cursor: pointer;
    ">
        🗑️ Delete
    </button>
</div>
```

---

## Button Styling

### Custom Button Appearance

Style individual buttons with inline CSS or CSS classes:

```html
<div class="e-card-actions">
    <button class="e-card-btn" style="
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    ">
        Primary Action
    </button>
    <button class="e-card-btn" style="
        background-color: #6c757d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    ">
        Secondary Action
    </button>
</div>
```

### Icon-Only Buttons

```html
<div class="e-card-actions">
    <button class="e-card-btn" title="Bookmark" style="
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
    ">
        ⭐
    </button>
    <button class="e-card-btn" title="Like" style="
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
    ">
        👍
    </button>
    <button class="e-card-btn" title="Share" style="
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
    ">
        📤
    </button>
</div>
```

### Button with Padding and Spacing

```html
<div class="e-card-actions" style="gap: 10px; padding: 15px;">
    <button class="e-card-btn" style="
        flex: 1;
        padding: 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    ">
        Proceed
    </button>
    <button class="e-card-btn" style="
        flex: 1;
        padding: 12px;
        background-color: transparent;
        color: #6c757d;
        border: 1px solid #6c757d;
        border-radius: 4px;
        cursor: pointer;
    ">
        Cancel
    </button>
</div>
```

---

## Mixed Button Types

### Buttons and Anchor Tags

```html
<div class="e-card">
    <div class="e-card-content">
        Learn more about our services
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Subscribe</button>
        <a href="url" class="e-card-btn">Read More</a>
    </div>
</div>
```

### Button Groups with Different Styles

```html
<div class="e-card">
    <div class="e-card-header-title">Confirmation</div>
    <div class="e-card-content">
        Are you sure you want to proceed?
    </div>
    <div class="e-card-actions" style="justify-content: flex-end; gap: 10px;">
        <button class="e-card-btn" style="
            padding: 8px 16px;
            background: transparent;
            border: 1px solid #ccc;
            cursor: pointer;
        ">
            Cancel
        </button>
        <button class="e-card-btn" style="
            padding: 8px 16px;
            background-color: #dc3545;
            color: white;
            border: none;
            cursor: pointer;
        ">
            Confirm
        </button>
    </div>
</div>
```

---

## Practical Examples

### Shopping Card

```html
<div class="e-card" style="max-width: 350px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Wireless Headphones</div>
            <div class="e-card-sub-title">Premium Audio</div>
        </div>
    </div>
    <div class="e-card-content">
        $129.99
        <p>High-quality sound with noise cancellation</p>
    </div>
    <div class="e-card-actions" style="gap: 10px; padding: 10px;">
        <button class="e-card-btn" style="
            flex: 1;
            padding: 10px;
            background-color: #ffc107;
            border: none;
            cursor: pointer;
            font-weight: bold;
        ">
            Add to Cart
        </button>
        <button class="e-card-btn" style="
            flex: 1;
            padding: 10px;
            background-color: transparent;
            border: 1px solid #6c757d;
            cursor: pointer;
        ">
            Wishlist
        </button>
    </div>
</div>
```

### Settings Card

```html
<div class="e-card e-card-vertical" style="max-width: 400px;">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">Account Settings</div>
        </div>
    </div>
    <div class="e-card-actions e-card-vertical">
        <button class="e-card-btn" style="
            width: 100%;
            padding: 12px;
            text-align: left;
            border: none;
            background: transparent;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        ">
            👤 Profile
        </button>
        <button class="e-card-btn" style="
            width: 100%;
            padding: 12px;
            text-align: left;
            border: none;
            background: transparent;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        ">
            🔒 Security
        </button>
        <button class="e-card-btn" style="
            width: 100%;
            padding: 12px;
            text-align: left;
            border: none;
            background: transparent;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        ">
            🔔 Notifications
        </button>
        <button class="e-card-btn" style="
            width: 100%;
            padding: 12px;
            text-align: left;
            border: none;
            background: transparent;
            cursor: pointer;
        ">
            ⚙️ Preferences
        </button>
    </div>
</div>
```

---

## Event Handling

### Click Events

```html
<div class="e-card">
    <div class="e-card-content">
        Click the button to see an alert
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn" onclick="handleClick()">
            Click Me
        </button>
    </div>
</div>

<script>
function handleClick() {
    alert('Button clicked!');
}
</script>
```

### TypeScript Example

```typescript
// Get the button element
const button = document.querySelector('.e-card-btn');

// Add click event listener
button.addEventListener('click', (event: MouseEvent) => {
    console.log('Card button clicked');
    // Handle the action
});
```

---

## Accessibility Considerations

### Semantic HTML

Use proper button elements instead of divs styled as buttons:

```html
<!-- ✅ Good -->
<button class="e-card-btn">Action</button>

<!-- ❌ Avoid -->
<div class="e-card-btn" onclick="handleClick()">Action</div>
```

### ARIA Labels

Add descriptive labels for icon-only buttons:

```html
<button class="e-card-btn" aria-label="Add to favorites">
    ⭐
</button>
```

### Keyboard Navigation

Buttons are keyboard accessible by default when using standard HTML `button` elements.

---

## See Also
- [Getting Started](getting-started.md) - Basic setup
- [Customization and Styling](customization-and-styling.md) - Advanced styling
- [Component Integration](component-integration.md) - Adding interactive components
