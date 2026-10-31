# Getting Started with Avatar Control

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
- [Webpack Setup](#webpack-setup)
- [CSS Configuration](#css-configuration)
- [Basic Implementation](#basic-implementation)
- [Running the Application](#running-the-application)
- [ES5 Global Script Setup](#es5-global-script-setup)
- [CDN Setup](#cdn-setup)

## Installation and Dependencies

The Avatar control is part of the Syncfusion layouts package. To implement Avatar, you need to install the following package:

```bash
npm install @syncfusion/ej2-layouts
```

### Required Package

```
@syncfusion/ej2-layouts
```

This package contains all Avatar control files, styles, and dependencies.

### Full Package Installation

Alternatively, you can install the complete Syncfusion package which includes all controls:

```bash
npm install @syncfusion/ej2
```

## Webpack Setup

This guide assumes you're using a webpack-based project. Syncfusion provides a quickstart repository with webpack configuration pre-configured.

### Clone the Quickstart Repository

```bash
git clone url
```

### Navigate to Project Directory

```bash
cd ej2-quickstart
```

### Install Dependencies

```bash
npm install
```

The quickstart project includes:
- Pre-configured webpack.config.js
- Node.js v14.15.0 or higher requirement
- All necessary loaders and plugins
- Ready-to-use project structure

## CSS Configuration

Avatar requires CSS styling from the Syncfusion layouts package. Import the appropriate theme CSS into your application.

### Import CSS in Your Project

Add the following imports to your `src/styles/styles.css` or main CSS file:

```css
@import '../../node_modules/@syncfusion/ej2-base/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-layouts/styles/fluent2.css';
```

### Available Themes

Syncfusion provides multiple theme options:
- `fluent2.css` - Modern Fluent 2 design (recommended)
- `bootstrap5.3.css` - Bootstrap 5.3 compatible
- `material.css` - Material Design theme
- `highcontrast.css` - High contrast for accessibility

For this example, we use `fluent2.css` theme.

### Link CSS in HTML

If you prefer CDN links, add these in your HTML `<head>`:

```html
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

## Basic Implementation

The Avatar control is implemented using an HTML `<span>` element with the `.e-avatar` class.

### Minimal Example

```html
<span class="e-avatar">AB</span>
```

This creates a default-sized avatar displaying the text "AB".

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Avatar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <!-- Avatar element -->
        <span class="e-avatar">GR</span>
    </div>
</body>
</html>
```

### Different Avatar Types

Create various avatar instances with different content:

```html
<!-- Default avatar with initials -->
<span class="e-avatar">AB</span>

<!-- Circle avatar -->
<span class="e-avatar e-avatar-circle">CD</span>

<!-- Avatar with background image -->
<span class="e-avatar" style="background-image: url('profile.jpg')"></span>

<!-- Avatar with icon -->
<span class="e-avatar">
    <i class="e-icons e-user"></i>
</span>
```

## Running the Application

### Development Server

Start the development server using webpack:

```bash
npm start
```

This command:
- Starts webpack dev server (usually on port 8080)
- Enables hot module replacement
- Watches for file changes
- Auto-reloads in browser

### Production Build

Create an optimized production build:

```bash
npm run build
```

### Complete Working Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 for Avatar</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Essential JS 2 for Avatar UI Control" />
    <meta name="author" content="Syncfusion" />
    <link href="index.css" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='container'>
        <div id='element'>
            <!-- Avatar in different sizes -->
            <span class="e-avatar e-avatar-xlarge">AB</span>
            <span class="e-avatar e-avatar-large">AB</span>
            <span class="e-avatar">AB</span>
            <span class="e-avatar e-avatar-small">AB</span>
            <span class="e-avatar e-avatar-xsmall">AB</span>
        </div>
    </div>
    
    <style>
        #element {
            display: block;
            width: 300px;
            margin: 130px auto;
            border-radius: 3px;
            justify-content: center;
        }
    </style>
</body>
</html>
```

## ES5 Global Script Setup

For projects not using modules or webpack, you can use the global ES5 scripts provided by Syncfusion.

### Using Local Script References

**Step 1:** Download Syncfusion JavaScript ES5 distribution files from the Essential Studio installation directory.

**Script Location:**
```
{installed location}\Syncfusion\Essential Studio\JavaScript - EJ2\{VERSION}\Web (Essential JS 2)\JavaScript\ej2-layouts\dist\global\ej2-layouts.min.js
```

**Style Location:**
```
{installed location}\Syncfusion\Essential Studio\JavaScript - EJ2\{VERSION}\Web (Essential JS 2)\JavaScript\ej2-layouts\styles\bootstrap5.3.css
```

**Example Paths:**
```
C:\Program Files (x86)\Syncfusion\Essential Studio\JavaScript - EJ2\32.1.19\Web (Essential JS 2)\JavaScript\ej2-layouts\dist\global\ej2-layouts.min.js
```

**Step 2:** Create a resources folder and copy the files:

```bash
mkdir myapp/resources
# Copy ej2-layouts.min.js to myapp/resources/
# Copy bootstrap5.3.css to myapp/resources/
```

**Step 3:** Create an HTML page with global script references:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Avatar ES5 Example</title>
    <link href="resources/bootstrap5.3.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <span class='e-avatar e-avatar-xlarge'>AB</span>
    <span class='e-avatar e-avatar-xlarge e-avatar-circle'>CD</span>
    
    <script src="resources/ej2-layouts.min.js"></script>
</body>
</html>
```

### Complete ES5 Global Script Example

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Essential JS 2 Avatar</title>
    <link href="url" rel="stylesheet" type="text/css"/>
    <link href="url" rel="stylesheet" type="text/css"/>
</head>
<body>
    <!-- Avatar with initials -->
    <span class='e-avatar e-avatar-xlarge'>GR</span>
    
    <!-- Avatar circle -->
    <span class='e-avatar e-avatar-xlarge e-avatar-circle'>SJ</span>
</body>
</html>
```

## CDN Setup

Use Syncfusion CDN links for quick prototyping and testing without downloading files.

### CDN Link Format

```
Script: url
Styles: url
```

### Avatar with CDN Links

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar CDN Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Base theme CSS from CDN -->
    <link href="url" rel="stylesheet" />
    <!-- Avatar CSS from CDN -->
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='container'>
        <span class="e-avatar e-avatar-xlarge">AB</span>
        <span class="e-avatar e-avatar-large">CD</span>
        <span class="e-avatar">EF</span>
    </div>
    
    <!-- Avatar scripts from CDN -->
    <script src="url"></script>
</body>
</html>
```

### Recommended CDN Version

Current version: **32.1.19** (as of April 2026)

For latest version availability, visit: url

## Next Steps

- Explore [Avatar Types and Sizes](./avatar-types-and-sizes.md) for different shape options
- Learn about [Customization](./customization.md) for colors and media formats
- Check [Badge Integration](./avatar-with-badge.md) for notification scenarios
- Review [ListView Integration](./avatar-in-listview.md) for contact list patterns
