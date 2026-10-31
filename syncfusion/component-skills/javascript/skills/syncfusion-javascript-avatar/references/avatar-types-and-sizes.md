# Avatar Types and Sizes

## Table of Contents
- [Avatar Sizes](#avatar-sizes)
- [Size Classes Reference](#size-classes-reference)
- [Avatar Types](#avatar-types)
- [Default Shape](#default-shape)
- [Circle Shape](#circle-shape)
- [Complete Examples](#complete-examples)

## Avatar Sizes

The Syncfusion Avatar control provides five predefined size classes that control the dimensions of the avatar. These sizes are useful for different UI contexts: large profile pictures, medium list items, and small notification icons.

### Size Classes Reference

| Class Name | Size | Usage |
|:-----------|:-----|:------|
| `.e-avatar-xlarge` | Extra Large | Profile sections, large user cards |
| `.e-avatar-large` | Large | User galleries, team displays |
| `.e-avatar` | Default/Medium | Standard lists, navigation bars |
| `.e-avatar-small` | Small | Sidebar avatars, compact lists |
| `.e-avatar-xsmall` | Extra Small | Comment threads, notification badges |

### Size Examples

All sizes shown with default shape (rounded rectangle):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Sizes</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <!-- Extra Large Avatar -->
        <span class="e-avatar e-avatar-xlarge"></span>
        
        <!-- Large Avatar -->
        <span class="e-avatar e-avatar-large"></span>
        
        <!-- Default Avatar -->
        <span class="e-avatar"></span>
        
        <!-- Small Avatar -->
        <span class="e-avatar e-avatar-small"></span>
        
        <!-- Extra Small Avatar -->
        <span class="e-avatar e-avatar-xsmall"></span>
    </div>
    
    <style>
        #element {
            display: block;
            width: 300px;
            margin: 100px auto;
            border-radius: 3px;
        }
        
        .e-avatar {
            background-image: url(url);
            margin: 5px;
        }
    </style>
</body>
</html>
```

### Size Variations with Text

Display all sizes with text content (initials):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar Sizes with Text</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <!-- Extra Large with text -->
        <span class="e-avatar e-avatar-xlarge">RT</span>
        
        <!-- Large with text -->
        <span class="e-avatar e-avatar-large">RT</span>
        
        <!-- Default with text -->
        <span class="e-avatar">RT</span>
        
        <!-- Small with text -->
        <span class="e-avatar e-avatar-small">RT</span>
        
        <!-- Extra Small with text -->
        <span class="e-avatar e-avatar-xsmall">RT</span>
    </div>
    
    <style>
        #element {
            display: block;
            width: 260px;
            margin: 100px auto;
            border-radius: 3px;
        }
    </style>
</body>
</html>
```

## Avatar Types

The Avatar control supports two distinct shape types:
1. **Default** - Rounded rectangle shape
2. **Circle** - Perfectly circular shape

### Default Shape

The default avatar shape is a rounded rectangle. This is the standard Avatar appearance and is applied by simply using the `.e-avatar` class without any additional shape modifier.

**Use Cases:**
- Profile pictures in teams/organizations
- Generic user representations
- When space is limited horizontally
- Traditional list representations

### Default Shape Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Default Avatar Shape</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <!-- Extra Large Default -->
        <span class="e-avatar e-avatar-xlarge">RT</span>
        
        <!-- Large Default -->
        <span class="e-avatar e-avatar-large">RT</span>
        
        <!-- Default -->
        <span class="e-avatar">RT</span>
        
        <!-- Small Default -->
        <span class="e-avatar e-avatar-small">RT</span>
        
        <!-- Extra Small Default -->
        <span class="e-avatar e-avatar-xsmall">RT</span>
    </div>
    
    <style>
        #element {
            display: block;
            width: 260px;
            margin: 100px auto;
            border-radius: 3px;
        }
    </style>
</body>
</html>
```

### Circle Shape

The circle avatar shape is created by adding the `.e-avatar-circle` modifier class along with the base `.e-avatar` class. This creates a perfectly round avatar, ideal for social media-like interfaces and modern applications.

**Use Cases:**
- Social media applications
- Modern UI designs
- Profile pictures
- Chat applications
- User mentions and selections
- Visually prominent user displays

### Circle Shape Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Circle Avatar Shape</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='element'>
        <!-- Extra Large Circle -->
        <span class="e-avatar e-avatar-xlarge e-avatar-circle">SJ</span>
        
        <!-- Large Circle -->
        <span class="e-avatar e-avatar-large e-avatar-circle">SJ</span>
        
        <!-- Default Circle -->
        <span class="e-avatar e-avatar-circle">SJ</span>
        
        <!-- Small Circle -->
        <span class="e-avatar e-avatar-small e-avatar-circle">SJ</span>
        
        <!-- Extra Small Circle -->
        <span class="e-avatar e-avatar-xsmall e-avatar-circle">SJ</span>
    </div>
    
    <style>
        #element {
            display: block;
            width: 260px;
            margin: 100px auto;
            border-radius: 3px;
        }
    </style>
</body>
</html>
```

## Complete Examples

### Example 1: All Sizes with Default Shape

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar - All Sizes Default</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <h3>Default Avatar Sizes</h3>
    <div class="avatar-container">
        <div class="size-group">
            <label>Extra Large</label>
            <span class="e-avatar e-avatar-xlarge">AB</span>
        </div>
        <div class="size-group">
            <label>Large</label>
            <span class="e-avatar e-avatar-large">CD</span>
        </div>
        <div class="size-group">
            <label>Default</label>
            <span class="e-avatar">EF</span>
        </div>
        <div class="size-group">
            <label>Small</label>
            <span class="e-avatar e-avatar-small">GH</span>
        </div>
        <div class="size-group">
            <label>Extra Small</label>
            <span class="e-avatar e-avatar-xsmall">IJ</span>
        </div>
    </div>
    
    <style>
        .avatar-container {
            display: flex;
            gap: 20px;
            padding: 30px;
            justify-content: center;
        }
        
        .size-group {
            text-align: center;
        }
        
        .size-group label {
            display: block;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 500;
        }
    </style>
</body>
</html>
```

### Example 2: All Sizes with Circle Shape

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar - All Sizes Circle</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <h3>Circle Avatar Sizes</h3>
    <div class="avatar-container">
        <div class="size-group">
            <label>Extra Large</label>
            <span class="e-avatar e-avatar-xlarge e-avatar-circle">KL</span>
        </div>
        <div class="size-group">
            <label>Large</label>
            <span class="e-avatar e-avatar-large e-avatar-circle">MN</span>
        </div>
        <div class="size-group">
            <label>Default</label>
            <span class="e-avatar e-avatar-circle">OP</span>
        </div>
        <div class="size-group">
            <label>Small</label>
            <span class="e-avatar e-avatar-small e-avatar-circle">QR</span>
        </div>
        <div class="size-group">
            <label>Extra Small</label>
            <span class="e-avatar e-avatar-xsmall e-avatar-circle">ST</span>
        </div>
    </div>
    
    <style>
        .avatar-container {
            display: flex;
            gap: 20px;
            padding: 30px;
            justify-content: center;
        }
        
        .size-group {
            text-align: center;
        }
        
        .size-group label {
            display: block;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 500;
        }
    </style>
</body>
</html>
```

### Example 3: Mixed Sizes and Shapes

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar - Mixed Types</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="mixed-container">
        <!-- Profile Section: Large Circle -->
        <div class="profile-section">
            <span class="e-avatar e-avatar-xlarge e-avatar-circle">AB</span>
            <h3>John Doe</h3>
        </div>
        
        <!-- Team Section: Medium Default -->
        <div class="team-section">
            <h4>Team Members</h4>
            <div class="team-list">
                <span class="e-avatar e-avatar-large">CD</span>
                <span class="e-avatar e-avatar-large">EF</span>
                <span class="e-avatar e-avatar-large">GH</span>
            </div>
        </div>
        
        <!-- Compact List: Small Default -->
        <div class="compact-section">
            <h4>Recent Activity</h4>
            <div class="activity-list">
                <div class="activity-item">
                    <span class="e-avatar e-avatar-small">IJ</span>
                    <span>User IJ commented</span>
                </div>
                <div class="activity-item">
                    <span class="e-avatar e-avatar-small">KL</span>
                    <span>User KL liked</span>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .mixed-container {
            padding: 30px;
            font-family: Arial, sans-serif;
        }
        
        .profile-section {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .team-section {
            margin-bottom: 30px;
        }
        
        .team-list {
            display: flex;
            gap: 10px;
        }
        
        .activity-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .activity-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    </style>
</body>
</html>
```

## Key Takeaways

- **5 Size Classes:** xlarge, large, default, small, xsmall - choose based on UI context
- **2 Shape Types:** Default (rounded rectangle) and Circle - select based on design
- **Flexible Sizing:** Combine size and shape classes for full flexibility
- **Text Content:** Avatars display initials, text, images, or icons
- **CSS-Based:** All styling is pure CSS, no JavaScript required
- **Responsive:** Avatar scales based on font-size and container

## Next Steps

- Learn about [Customization](./customization.md) for colors and media formats
- Explore [Badge Integration](./avatar-with-badge.md) for notification scenarios
- Review [ListView Integration](./avatar-in-listview.md) for contact list patterns
