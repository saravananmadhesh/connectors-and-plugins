# Avatar with Badge Integration

## Table of Contents
- [Badge Integration Overview](#badge-integration-overview)
- [Notification Badge Styles](#notification-badge-styles)
- [Overlap Positioning](#overlap-positioning)
- [All Size Combinations](#all-size-combinations)
- [Badge Count Examples](#badge-count-examples)
- [Complete Implementation](#complete-implementation)

## Badge Integration Overview

The Badge control can be combined with the Avatar control to create notification avatars that display status indicators or notification counts. This integration is useful for:

- **Notification badges**: Show unread message or notification counts
- **Status indicators**: Display online/offline or activity status
- **Priority indicators**: Highlight important user actions
- **Activity counts**: Show number of items associated with a user

### Badge Control Classes

The Badge control uses specific CSS classes to style notification indicators:

- `.e-badge` - Base badge class
- `.e-badge-notification` - Notification badge styling
- `.e-badge-overlap` - Overlaps badge on another element
- `.e-badge-circle` - Circular badge shape
- `.e-badge-primary` - Primary color theme
- `.e-badge-success` - Success color theme
- `.e-badge-danger` - Danger/error color theme

### Integration Pattern

Combine Avatar and Badge using a container:

```html
<div style="position: relative; display: inline-block;">
    <span class="e-avatar e-avatar-large e-avatar-circle">AB</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">3</span>
</div>
```

## Notification Badge Styles

### Primary Badge (Blue)

```html
<div style="position: relative; display: inline-block; margin: 10px;">
    <span class="e-avatar e-avatar-large e-avatar-circle">JD</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">5</span>
</div>
```

### Success Badge (Green)

```html
<div style="position: relative; display: inline-block; margin: 10px;">
    <span class="e-avatar e-avatar-large e-avatar-circle">AB</span>
    <span class="e-badge e-badge-success e-badge-overlap e-badge-notification e-badge-circle">12</span>
</div>
```

### Danger Badge (Red)

```html
<div style="position: relative; display: inline-block; margin: 10px;">
    <span class="e-avatar e-avatar-large e-avatar-circle">CD</span>
    <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle">99+</span>
</div>
```

## Overlap Positioning

### Overlap on Corner

The `.e-badge-overlap` class positions the badge on the corner of the avatar:

```html
<div style="position: relative; display: inline-block;">
    <span class="e-avatar e-avatar-xlarge e-avatar-circle">MK</span>
    <!-- Badge appears on top-right corner -->
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">8</span>
</div>
```

### No Overlap (Adjacent)

Without `.e-badge-overlap`, the badge appears next to the avatar:

```html
<div style="display: inline-block;">
    <span class="e-avatar e-avatar-xlarge e-avatar-circle">LP</span>
    <!-- Badge appears next to avatar -->
    <span class="e-badge e-badge-primary e-badge-notification">8</span>
</div>
```

### Custom Positioning with CSS

For advanced positioning, use CSS to customize badge placement:

```css
.avatar-badge-container {
    position: relative;
    display: inline-block;
}

.avatar-badge-container .custom-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 24px;
    height: 24px;
    background-color: #d83b01;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid white;
}
```

Usage:

```html
<div class="avatar-badge-container">
    <span class="e-avatar e-avatar-large e-avatar-circle">AB</span>
    <span class="custom-badge">3</span>
</div>
```

## All Size Combinations

### XSmall Avatar with Badge

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar with Badge - XSmall</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div style="margin: 10px;">
        <div style="position: relative; display: inline-block; margin: 5px;">
            <span class="e-avatar e-avatar-xsmall e-avatar-circle">AB</span>
            <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">3</span>
        </div>
    </div>
</body>
</html>
```

### Small Avatar with Badge

```html
<div style="position: relative; display: inline-block; margin: 5px;">
    <span class="e-avatar e-avatar-small e-avatar-circle">CD</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">6</span>
</div>
```

### Default Avatar with Badge

```html
<div style="position: relative; display: inline-block; margin: 5px;">
    <span class="e-avatar e-avatar-circle">EF</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">12</span>
</div>
```

### Large Avatar with Badge

```html
<div style="position: relative; display: inline-block; margin: 5px;">
    <span class="e-avatar e-avatar-large e-avatar-circle">GH</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">46</span>
</div>
```

### XLarge Avatar with Badge

```html
<div style="position: relative; display: inline-block; margin: 5px;">
    <span class="e-avatar e-avatar-xlarge e-avatar-circle">IJ</span>
    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">99+</span>
</div>
```

## Badge Count Examples

### Complete Size Grid with Badges

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Badge Size Grid</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="badge-grid">
        <!-- Row 1: Default shape -->
        <h3>Default Shape with Badges</h3>
        <div class="badge-row">
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-xsmall">AB</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">3</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-small">CD</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">7</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar">EF</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">14</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-large">GH</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">28</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-xlarge">IJ</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">99+</span>
            </div>
        </div>

        <!-- Row 2: Circle shape -->
        <h3>Circle Shape with Badges</h3>
        <div class="badge-row">
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-circle e-avatar-xsmall">KL</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">2</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-circle e-avatar-small">MN</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">5</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-circle">OP</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">11</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-circle e-avatar-large">QR</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">22</span>
            </div>
            <div class="avatar-badge-container">
                <span class="e-avatar e-avatar-circle e-avatar-xlarge">ST</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">45</span>
            </div>
        </div>
    </div>
    
    <style>
        .badge-grid {
            padding: 30px;
        }
        
        .badge-grid h3 {
            margin-bottom: 20px;
        }
        
        .badge-row {
            display: flex;
            gap: 30px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }
        
        .avatar-badge-container {
            position: relative;
            display: inline-block;
            text-align: center;
        }
    </style>
</body>
</html>
```

### Notification Count Variations

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Badge Count Examples</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="count-variations">
        <!-- No count (just dot) -->
        <div class="count-group">
            <h4>Dot Indicator</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-large e-avatar-circle">AB</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle"></span>
            </div>
        </div>

        <!-- Single digit -->
        <div class="count-group">
            <h4>Single Digit</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-large e-avatar-circle">CD</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification e-badge-circle">5</span>
            </div>
        </div>

        <!-- Double digits -->
        <div class="count-group">
            <h4>Double Digits</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-large e-avatar-circle">EF</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">25</span>
            </div>
        </div>

        <!-- Overflow count -->
        <div class="count-group">
            <h4>Overflow Count</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-large e-avatar-circle">GH</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">99+</span>
            </div>
        </div>
    </div>
    
    <style>
        .count-variations {
            display: flex;
            gap: 30px;
            padding: 30px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .count-group {
            text-align: center;
        }
        
        .count-group h4 {
            margin-bottom: 15px;
        }
    </style>
</body>
</html>
```

## Complete Implementation

### Real-World Example: Notification Center

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Notification Center</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="notification-center">
        <h3>Notification Center</h3>
        
        <div class="notification-group">
            <h4>Messages</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-circle e-avatar-large">AB</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">12</span>
            </div>
        </div>

        <div class="notification-group">
            <h4>Email</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-circle e-avatar-large">CD</span>
                <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">3</span>
            </div>
        </div>

        <div class="notification-group">
            <h4>Alerts</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-circle e-avatar-large">EF</span>
                <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">5</span>
            </div>
        </div>

        <div class="notification-group">
            <h4>Tasks</h4>
            <div style="position: relative; display: inline-block;">
                <span class="e-avatar e-avatar-circle e-avatar-large">GH</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">8</span>
            </div>
        </div>
    </div>
    
    <style>
        .notification-center {
            padding: 30px;
            max-width: 500px;
            margin: 30px auto;
        }
        
        .notification-group {
            margin-bottom: 25px;
        }
        
        .notification-group h4 {
            margin-bottom: 10px;
        }
    </style>
</body>
</html>
```

### Multiple Badge Scenarios

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Multi-Badge Avatar</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="multi-badge-examples">
        <!-- Badge + Status -->
        <div class="example">
            <h4>Notification + Status</h4>
            <div class="avatar-wrapper">
                <span class="e-avatar e-avatar-xlarge e-avatar-circle">AB</span>
                <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">3</span>
                <span class="status-dot online"></span>
            </div>
        </div>

        <!-- Different badge colors -->
        <div class="example">
            <h4>Color Variations</h4>
            <div style="display: flex; gap: 20px;">
                <div style="position: relative; display: inline-block;">
                    <span class="e-avatar e-avatar-large e-avatar-circle">CD</span>
                    <span class="e-badge e-badge-primary e-badge-overlap e-badge-notification">5</span>
                </div>
                <div style="position: relative; display: inline-block;">
                    <span class="e-avatar e-avatar-large e-avatar-circle">EF</span>
                    <span class="e-badge e-badge-success e-badge-overlap e-badge-notification">10</span>
                </div>
                <div style="position: relative; display: inline-block;">
                    <span class="e-avatar e-avatar-large e-avatar-circle">GH</span>
                    <span class="e-badge e-badge-danger e-badge-overlap e-badge-notification">2</span>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .multi-badge-examples {
            padding: 30px;
        }
        
        .example {
            margin-bottom: 30px;
        }
        
        .example h4 {
            margin-bottom: 15px;
        }
        
        .avatar-wrapper {
            position: relative;
            display: inline-block;
        }
        
        .status-dot {
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            bottom: 0;
            left: 0;
            border: 2px solid white;
        }
        
        .status-dot.online {
            background-color: #00b251;
        }
        
        .status-dot.offline {
            background-color: #d83b01;
        }
    </style>
</body>
</html>
```

## Next Steps

- Learn about [ListView Integration](./avatar-in-listview.md) for contact list patterns
- Explore [Customization](./customization.md) for more styling options
- Check [Types and Sizes](./avatar-types-and-sizes.md) for shape variations
