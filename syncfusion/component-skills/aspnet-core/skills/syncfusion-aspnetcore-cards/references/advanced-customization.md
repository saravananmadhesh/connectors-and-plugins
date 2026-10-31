# Advanced Customization in Card Component

## Customizing Image Title Positioning

By default, card image titles appear at the bottom-left corner. Use CSS to customize the position for different visual effects.

### Bottom-Left (Default)

```css
.e-card-image .e-card-title {
    /* Default positioning - no CSS needed */
}
```

### Top-Left

```css
.e-card-image .e-card-title {
    top: 10px;
    left: 10px;
    bottom: auto;
}
```

### Top-Right

```css
.e-card-image .e-card-title {
    top: 10px;
    right: 10px;
    left: auto;
    bottom: auto;
    text-align: right;
}
```

### Bottom-Right

```css
.e-card-image .e-card-title {
    right: 10px;
    left: auto;
}
```

### Center (Centered Position)

```css
.e-card-image .e-card-title {
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
    text-align: center;
}
```

### Top-Center

```css
.e-card-image .e-card-title {
    top: 10px;
    left: 50%;
    bottom: auto;
    transform: translateX(-50%);
    text-align: center;
}
```

### Example: Implementing Custom Title Positioning

```html
<style>
    /* Custom classes for different title positions */
    .card-title-top-center .e-card-image .e-card-title {
        top: 10px;
        left: 50%;
        bottom: auto;
        transform: translateX(-50%);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 8px 16px;
    }

    .card-title-center .e-card-image .e-card-title {
        top: 50%;
        left: 50%;
        bottom: auto;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 12px 20px;
        font-weight: bold;
        font-size: 18px;
    }
</style>

<!-- Card with top-center title -->
<div class="e-card card-title-top-center">
    <div class="e-card-image">
        <img src="landscape.jpg" alt="Landscape" style="width: 100%; height: 300px; object-fit: cover;">
        <div class="e-card-title">Mountain Vista</div>
    </div>
</div>

<!-- Card with centered title -->
<div class="e-card card-title-center">
    <div class="e-card-image">
        <img src="featured.jpg" alt="Featured" style="width: 100%; height: 300px; object-fit: cover;">
        <div class="e-card-title">Featured Content</div>
    </div>
</div>
```

## Integrating Other Components Inside Cards

The Card component is flexible and can host other Syncfusion components for enhanced functionality.

### Integrating ListView Component

```html
<div class="e-card">
    <div class="e-card-header">
        <div class="e-card-header-caption">
            <div class="e-card-header-title">To-Do List</div>
        </div>
    </div>
    <div class="e-card-content">
        <!-- ListView component embedded here -->
        <ul id="todoList">
            <li>
                <span class="e-list-item-header">Complete project proposal</span>
            </li>
            <li>
                <span class="e-list-item-header">Review team feedback</span>
            </li>
            <li>
                <span class="e-list-item-header">Schedule meetings</span>
            </li>
        </ul>
    </div>
</div>
```

### Integrating Form Elements

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Contact Form</strong></p>
        <p><small>Send us a message</small></p>
    </div>
    <div class="e-card-content">
        <form>
            <div style="margin-bottom: 15px;">
                <label>Name:</label>
                <input type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Email:</label>
                <input type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label>Message:</label>
                <textarea style="width: 100%; height: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
            </div>
        </form>
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Send</button>
        <button class="e-card-btn">Clear</button>
    </div>
</div>
```

### Integrating DataGrid or Table

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Sales Data</strong></p>
        <p><small>Q1 2026 Performance</small></p>
    </div>
    <div class="e-card-content">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Sales</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Growth</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Product A</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$45,000</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd; color: green;">+15%</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Product B</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$32,000</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd; color: green;">+8%</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Product C</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">$28,500</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd; color: red;">-5%</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

## CSS Customization and Styling

### Custom Card Styling

```css
/* Custom card with border */
.custom-card {
    border: 2px solid #007bff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Card with colored left border */
.card-accent-left {
    border-left: 5px solid #28a745;
    padding-left: 15px;
}

/* Elevated card effect */
.card-elevated {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
}

.card-elevated:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Minimal card */
.card-minimal {
    border: 1px solid #e9ecef;
    box-shadow: none;
}
```

### Custom Header Styling

```css
/* Colored header background */
.header-primary {
    background-color: #007bff;
    color: white;
}

.header-primary .e-card-header-title {
    color: white;
}

.header-primary .e-card-sub-title {
    color: #e9ecef;
}

/* Header with gradient */
.header-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}
```

### Custom Button Styling

```css
/* Rounded buttons */
.e-card-btn.rounded {
    border-radius: 20px;
    padding: 8px 20px;
}

/* Full-width buttons */
.e-card-actions.full-width .e-card-btn {
    flex: 1;
}

/* Button with icons */
.e-card-btn.with-icon::before {
    content: "→ ";
    margin-right: 5px;
}

/* Ghost buttons */
.e-card-btn.ghost {
    background-color: transparent;
    border: 1px solid #007bff;
    color: #007bff;
}

.e-card-btn.ghost:hover {
    background-color: #007bff;
    color: white;
}
```

## Real-World Integration Examples

### Example 1: Analytics Dashboard Widget

```html
<div class="e-card custom-card card-elevated">
    <div class="e-card-header header-primary">
        <p><strong>Revenue Metrics</strong></p>
        <p><small>Last 30 days</small></p>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        <p><strong>Total Revenue:</strong> $125,400</p>
        <p><strong>Average Order:</strong> $1,250</p>
        <p><strong>Conversion Rate:</strong> 3.2%</p>
        <div style="margin-top: 15px; height: 150px; background-color: #f8f9fa; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
            <!-- Chart placeholder -->
            📊 Chart visualization here
        </div>
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">View Details</button>
        <button class="e-card-btn">Export</button>
    </div>
</div>
```

### Example 2: Team Member Card

```html
<div class="e-card custom-card">
    <div class="e-card-header header-gradient">
        <div class="e-card-image e-card-corner" style="width: 70px; height: 70px; margin-bottom: 10px;">
            <img src="team-member.jpg" alt="Member" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
            <p><strong>Alex Martinez</strong></p>
            <p><small>Lead Developer</small></p>
        </div>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        <p><strong>Experience:</strong> 8 years</p>
        <p><strong>Skills:</strong> C#, ASP.NET Core, Azure, SQL</p>
        <p><strong>Team:</strong> Backend Development</p>
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Contact</button>
        <button class="e-card-btn">View Profile</button>
    </div>
</div>
```

### Example 3: Notification Card with Status

```html
<div class="e-card card-accent-left" style="border-left-color: #ffc107;">
    <div class="e-card-header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <p><strong>System Update Available</strong></p>
                <p><small>2 hours ago</small></p>
            </div>
            <span style="background-color: #ffc107; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px;">PENDING</span>
        </div>
    </div>
    <div class="e-card-separator"></div>
    <div class="e-card-content">
        <p>A new system update is ready to install. This update includes security patches and performance improvements.</p>
    </div>
    <div class="e-card-actions">
        <button class="e-card-btn">Update Now</button>
        <button class="e-card-btn">Remind Later</button>
    </div>
</div>
```

## Best Practices for Advanced Customization

1. **Use CSS variables** — Define reusable colors and spacing for consistency
2. **Create utility classes** — Build modifier classes for common customizations
3. **Maintain accessibility** — Ensure custom colors meet WCAG contrast requirements
4. **Test responsiveness** — Verify customizations work on mobile and desktop
5. **Document custom classes** — Keep a style guide for component variants
6. **Consider performance** — Avoid heavy animations or complex selectors
7. **Use semantic structure** — Keep HTML semantic even with complex styling
8. **Plan for themes** — Design customizations that work across different color schemes
