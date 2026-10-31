# Customization and Styling

## Table of Contents
- [Color Customization](#color-customization)
- [Custom Sizes](#custom-sizes)
- [Media Format Support](#media-format-support)
- [CSS Class Customization](#css-class-customization)
- [Responsive Design](#responsive-design)
- [Advanced Examples](#advanced-examples)

## Color Customization

The Avatar control provides a default gray background color. You can customize the background color by adding CSS classes or by directly applying inline styles to individual avatars.

### Default Background

By default, Avatar has a light gray background:

```html
<span class="e-avatar">AB</span>
```

### Custom Color with CSS Classes

Create custom color classes and apply them to avatars:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Color Customization</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle green">AJ</span>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle violet">JK</span>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle rose">EL</span>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle blue">SR</span>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle red">PD</span>
    </div>
    
    <style>
        #element {
            display: flex;
            width: 400px;
            margin: 100px auto;
            border-radius: 3px;
            justify-content: center;
        }

        .e-avatar {
            margin: 2px;
        }

        .e-avatar.green {
            background-color: #87eb87;
        }

        .e-avatar.violet {
            background-color: #ee82ee;
        }

        .e-avatar.blue {
            background-color: #7171e4;
        }

        .e-avatar.red {
            background-color: #d86e6e;
        }

        .e-avatar.rose {
            background-color: #bc8f8f;
        }
    </style>
</body>
</html>
```

### Color Palette Options

Recommended color palette for avatars:

| Color | Hex Code | Use Case |
|-------|----------|----------|
| Green | #87eb87 | Success, Online status |
| Violet | #ee82ee | Creative, Purple theme |
| Rose | #bc8f8f | Warm, Friendly |
| Blue | #7171e4 | Professional, Info |
| Red | #d86e6e | Alert, Important |
| Orange | #ff9800 | Warning, Attention |
| Teal | #26c6da | Calming, Tech |
| Pink | #ec407a | Fun, Social |

## Custom Sizes

The Avatar control provides five predefined sizes, but you can create custom sizes by adjusting the font-size. Avatar width and height scale proportionally with the font-size.

### Custom Size with Font-Size

The avatar dimensions are relative to its font-size. By changing the font-size, you scale the avatar:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Custom Sizes</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <!-- Custom sizes using font-size -->
        <span class="e-avatar" style="font-size: 26px;">26px</span>
        <span class="e-avatar" style="font-size: 24px;">24px</span>
        <span class="e-avatar" style="font-size: 22px;">22px</span>
        <span class="e-avatar" style="font-size: 20px;">20px</span>
        <span class="e-avatar" style="font-size: 18px;">18px</span>
    </div>
    
    <style>
        #element {
            display: block;
            width: 400px;
            margin: 100px auto;
            border-radius: 3px;
        }
    </style>
</body>
</html>
```

### Scaling with CSS Classes

Create custom size classes for reuse:

```css
/* Extra large custom size */
.e-avatar.custom-xl {
    font-size: 32px;
}

/* Large custom size */
.e-avatar.custom-lg {
    font-size: 28px;
}

/* Medium custom size */
.e-avatar.custom-md {
    font-size: 24px;
}

/* Small custom size */
.e-avatar.custom-sm {
    font-size: 18px;
}

/* Tiny custom size */
.e-avatar.custom-xs {
    font-size: 14px;
}
```

Usage:

```html
<span class="e-avatar custom-xl">AB</span>
<span class="e-avatar custom-lg">CD</span>
<span class="e-avatar custom-md">EF</span>
<span class="e-avatar custom-sm">GH</span>
<span class="e-avatar custom-xs">IJ</span>
```

## Media Format Support

The Avatar control supports multiple media formats for displaying different types of content.

### Image Media Format

Display images using the `background-image` CSS property with cover sizing:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar with Images</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="media-container">
        <h3>Image Avatar</h3>
        <span class="e-avatar e-avatar-xlarge e-avatar-circle image"></span>
    </div>
    
    <style>
        .e-avatar.image {
            background-image: url(url);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
    </style>
</body>
</html>
```

### SVG Media Format

Embed SVG markup directly in the avatar:

```html
<span class="e-avatar e-avatar-xlarge e-avatar-circle">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="#007bff" />
        <text x="50" y="60" text-anchor="middle" font-size="40" fill="white" font-weight="bold">S</text>
    </svg>
</span>
```

### Font Icon Media Format

Display font icons inside avatars. This example uses Material Icons or Font Awesome:

```html
<span class="e-avatar e-avatar-xlarge e-avatar-circle">
    <div class="e-people icons"></div>
</span>

<style>
    @font-face {
        font-family: 'Contacts';
        src: url(data:application/x-font-ttf;charset=utf-8;base64,...);
    }

    .people,
    .e-people {
        font-family: 'Contacts';
    }

    .e-people:before {
        content: '\e700';
    }

    .e-avatar .e-people.icons {
        font-size: 24px;
    }
</style>
```

### Letter/Initial Media Format

Display user initials as text content:

```html
<!-- Single letter -->
<span class="e-avatar e-avatar-xlarge e-avatar-circle">A</span>

<!-- Two letters (initials) -->
<span class="e-avatar e-avatar-xlarge e-avatar-circle">AB</span>

<!-- Three letters -->
<span class="e-avatar e-avatar-xlarge e-avatar-circle">ABC</span>
```

### Word/Word Media Format

Display short words as avatar content:

```html
<span class="e-avatar e-avatar-xlarge e-avatar-circle">User</span>
<span class="e-avatar e-avatar-xlarge e-avatar-circle">Admin</span>
<span class="e-avatar e-avatar-xlarge e-avatar-circle">Guest</span>
```

### Mixed Media Types Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Media Formats</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="media-container">
        <!-- Image -->
        <div class="media-block">
            <div class="e-avatar e-avatar-xlarge e-avatar-circle image"></div>
            <div>Image</div>
        </div>

        <!-- SVG -->
        <div class="media-block">
            <div class="e-avatar e-avatar-xlarge e-avatar-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path fill="#ffffff" d="M16.033 11.049a5.155 5.155 0 1 1 0 10.312"/>
                </svg>
            </div>
            <div>SVG</div>
        </div>

        <!-- Initial -->
        <div class="media-block">
            <div class="e-avatar e-avatar-xlarge e-avatar-circle">GR</div>
            <div>Initial</div>
        </div>

        <!-- Icon -->
        <div class="media-block">
            <div class="e-avatar e-avatar-xlarge e-avatar-circle">
                <i class="icon-user"></i>
            </div>
            <div>FontIcon</div>
        </div>

        <!-- Word -->
        <div class="media-block">
            <div class="e-avatar e-avatar-xlarge e-avatar-circle">User</div>
            <div>Word</div>
        </div>
    </div>
    
    <style>
        .media-container {
            display: flex;
            gap: 30px;
            padding: 30px;
            flex-wrap: wrap;
        }

        .media-block {
            text-align: center;
        }

        .e-avatar.image {
            background-image: url(url);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
    </style>
</body>
</html>
```

## CSS Class Customization

### Styling Individual Avatars

Apply custom classes for consistent styling:

```css
/* Primary avatar style -->
.e-avatar.primary {
    background-color: #0071c1;
    color: white;
    font-weight: bold;
}

/* Success avatar -->
.e-avatar.success {
    background-color: #00b251;
    color: white;
}

/* Warning avatar -->
.e-avatar.warning {
    background-color: #ffc900;
    color: #333;
}

/* Danger avatar -->
.e-avatar.danger {
    background-color: #d83b01;
    color: white;
}

/* Info avatar -->
.e-avatar.info {
    background-color: #0078d4;
    color: white;
}
```

Usage:

```html
<span class="e-avatar e-avatar-circle primary">AB</span>
<span class="e-avatar e-avatar-circle success">CD</span>
<span class="e-avatar e-avatar-circle warning">EF</span>
<span class="e-avatar e-avatar-circle danger">GH</span>
<span class="e-avatar e-avatar-circle info">IJ</span>
```

### Hover and Active States

Add interactive states:

```css
.e-avatar {
    transition: all 0.3s ease;
    cursor: pointer;
}

.e-avatar:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.e-avatar:active {
    transform: scale(0.95);
}

.e-avatar.active {
    border: 3px solid #0071c1;
    box-sizing: border-box;
}
```

## Responsive Design

### Mobile-Friendly Avatars

```css
/* Desktop: Large avatars */
@media (min-width: 1024px) {
    .e-avatar.responsive {
        font-size: 24px;
    }
}

/* Tablet: Medium avatars */
@media (min-width: 600px) and (max-width: 1023px) {
    .e-avatar.responsive {
        font-size: 18px;
    }
}

/* Mobile: Small avatars */
@media (max-width: 599px) {
    .e-avatar.responsive {
        font-size: 14px;
    }
}
```

### Flexible Container Layout

```html
<div class="avatar-grid">
    <span class="e-avatar responsive">A</span>
    <span class="e-avatar responsive">B</span>
    <span class="e-avatar responsive">C</span>
    <span class="e-avatar responsive">D</span>
</div>

<style>
    .avatar-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
        gap: 10px;
        padding: 20px;
    }
    
    .e-avatar.responsive {
        font-size: 18px;
    }
    
    @media (max-width: 600px) {
        .avatar-grid {
            grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
        }
        
        .e-avatar.responsive {
            font-size: 12px;
        }
    }
</style>
```

## Advanced Examples

### Example 1: User Status with Badge

```html
<div style="position: relative; display: inline-block;">
    <span class="e-avatar e-avatar-large e-avatar-circle primary">JD</span>
    <span class="status-indicator online"></span>
</div>

<style>
    .status-indicator {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        bottom: 0;
        right: 0;
        border: 2px solid white;
    }
    
    .status-indicator.online {
        background-color: #00b251;
    }
    
    .status-indicator.offline {
        background-color: #a4373a;
    }
    
    .status-indicator.away {
        background-color: #ffb900;
    }
</style>
```

### Example 2: Avatar with Label

```html
<div class="avatar-with-label">
    <span class="e-avatar e-avatar-xlarge e-avatar-circle">AB</span>
    <div class="label">
        <div class="name">Alice Brown</div>
        <div class="role">Developer</div>
    </div>
</div>

<style>
    .avatar-with-label {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .label {
        display: flex;
        flex-direction: column;
    }
    
    .name {
        font-weight: bold;
        font-size: 14px;
    }
    
    .role {
        font-size: 12px;
        color: #666;
    }
</style>
```

### Example 3: Avatar Group

```html
<div class="avatar-group">
    <span class="e-avatar e-avatar-large e-avatar-circle" style="background-color: #0071c1;">AB</span>
    <span class="e-avatar e-avatar-large e-avatar-circle" style="background-color: #107c10;">CD</span>
    <span class="e-avatar e-avatar-large e-avatar-circle" style="background-color: #d83b01;">EF</span>
    <span class="e-avatar e-avatar-large e-avatar-circle more-indicator">+3</span>
</div>

<style>
    .avatar-group {
        display: flex;
        margin-left: -10px;
    }
    
    .avatar-group .e-avatar {
        margin-left: -10px;
        border: 3px solid white;
        box-sizing: border-box;
    }
    
    .avatar-group .more-indicator {
        background-color: #d0cece;
        color: #333;
        font-weight: bold;
    }
</style>
```

## Next Steps

- Explore [Badge Integration](./avatar-with-badge.md) for notification scenarios
- Review [ListView Integration](./avatar-in-listview.md) for contact list patterns
- Check [Types and Sizes](./avatar-types-and-sizes.md) for shape variations
