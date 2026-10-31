# Styling & Customization

## Table of Contents
- [Toolbar Container Styling](#toolbar-container-styling)
- [Toolbar Items Styling](#toolbar-items-styling)
- [Button Elements Styling](#button-elements-styling)
- [Icon Customization](#icon-customization)
- [Hover State Styling](#hover-state-styling)
- [Focus State Styling](#focus-state-styling)
- [Font Awesome Integration](#font-awesome-integration)
- [Icon Colors and Appearance](#icon-colors-and-appearance)

## Toolbar Container Styling

Customize the outer toolbar container with CSS properties.

### Container CSS Class

The main toolbar uses the `.e-toolbar` CSS class, which has an internal `.e-toolbar-items` container for items.

### Basic Container Styling

```css
.e-toolbar {
  border: 1px solid #d0d0d0;
  background-color: #ffffff;
  border-radius: 4px;
  display: block;
  height: 40px;
  position: relative;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}

/* Items container inside toolbar */
.e-toolbar .e-toolbar-items {
  display: inline-flex;
  height: 40px;
  vertical-align: middle;
  align-items: center;
}
```

### Container Properties

```css
.e-toolbar {
  /* Dimensions */
  width: 100%;
  height: 40px;
  min-height: 40px;
  
  /* Colors */
  background-color: #ffffff;
  border: 1px solid #d0d0d0;
  
  /* Appearance */
  border-radius: 4px;
  position: relative;
  display: block;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}

/* Items container */
.e-toolbar .e-toolbar-items {
  display: inline-flex;
  height: 40px;
  vertical-align: middle;
  align-items: center;
}
```

## Toolbar Items Styling

Style individual toolbar items using the `.e-toolbar-item` class. Items are flex containers within `.e-toolbar-items`.

### Item Container CSS

```css
.e-toolbar .e-toolbar-item {
  align-content: center;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  min-height: 32px;
  vertical-align: middle;
  width: auto;
  flex: 0 0 auto;
}
```

### Item Properties

```css
.e-toolbar .e-toolbar-item {
  /* Dimensions */
  height: 40px;
  min-height: 32px;
  min-width: 32px;
  width: auto;
  
  /* Spacing */
  padding: 4px 8px;
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

/* Non-separator items */
.e-toolbar .e-toolbar-item:not(.e-separator):not(.e-spacer) {
  height: 40px;
  margin: 0 2px;
}
```

## Button Elements Styling

Style button elements within toolbar items using the `.e-tbar-btn` class. Buttons are inside `.e-toolbar-item` containers.

### Button CSS

```css
.e-toolbar .e-toolbar-item .e-tbar-btn {
  background: #ffffff;
  border: 1px solid #d0d0d0;
  color: #333;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Button Properties

```css
.e-toolbar .e-tbar-btn {
  /* Dimensions */
  min-height: 32px;
  min-width: 70px;
  
  /* Colors */
  background: #ffffff;
  border: 1px solid #d0d0d0;
  color: #333333;
  
  /* Text */
  font-size: 14px;
  font-weight: 500;
  
  /* Spacing */
  padding: 6px 12px;
  border-radius: 2px;
  
  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
```

## Icon Customization

Style icons within toolbar buttons using the `.e-icons.e-btn-icon` class combination.

### Icon CSS Class

```css
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  color: #333;
  font-size: 16px;
  margin: 0;
  width: auto;
}
```

### Icon CSS Class

```css
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  background: #185655;
  color: #d7f9d4;
  font-size: 16px;
  line-height: 1;
}
```

### Icon Colors

```css
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  color: #333333;
  font-size: 16px;
  margin-right: 4px;
}

/* Colored icons */
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon.success {
  color: #4caf50;
}

.e-toolbar .e-tbar-btn .e-icons.e-btn-icon.warning {
  color: #ff9800;
}

.e-toolbar .e-tbar-btn .e-icons.e-btn-icon.error {
  color: #f44336;
}
```

### Icon with Text

```css
/* Icon before text */
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  margin-right: 6px;
}

/* Icon after text */
.e-toolbar .e-tbar-btn.suffix .e-icons.e-btn-icon {
  margin-left: 6px;
  margin-right: 0;
}
```

## Hover State Styling

Customize toolbar items during mouse hover.

### Hover CSS

```css
.e-toolbar .e-tbar-btn:hover {
  background: #c0e3a1;
  border: 1px solid green;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Hover Properties

```css
.e-toolbar .e-tbar-btn:hover {
  background-color: #e8f5e9;
  border-color: #4caf50;
  color: #1b5e20;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
  transition: all 0.2s ease;
}

.e-toolbar .e-tbar-btn:hover .e-icons.e-btn-icon {
  color: #1b5e20;
}
```

## Focus State Styling

Customize toolbar items when focused (keyboard or click).

### Focus CSS

```css
.e-toolbar .e-tbar-btn:focus {
  background: #add8e6;
  border: 1px solid #5a70cc;
  outline: 2px solid #2196f3;
  outline-offset: 2px;
}
```

### Focus Properties

```css
.e-toolbar .e-tbar-btn:focus {
  background-color: #e3f2fd;
  border-color: #2196f3;
  outline: 2px solid #2196f3;
  outline-offset: 2px;
  box-shadow: 0 0 4px rgba(33, 150, 243, 0.3);
}

.e-toolbar .e-tbar-btn:focus .e-icons.e-btn-icon {
  color: #1565c0;
}
```

### Active State

```css
.e-toolbar .e-tbar-btn:active {
  background-color: #bbdefb;
  border-color: #1976d2;
}
```

## Font Awesome Integration

Integrate third-party icons from Font Awesome library.

### Setup Font Awesome

Add the Font Awesome CDN link to your HTML:

```html
<link rel="stylesheet" href="url" />
```

### Use Font Awesome Icons

```typescript
<ejs-toolbar>
  <e-items>
    <e-item prefixIcon="fa fa-twitter"></e-item>
    <e-item prefixIcon="fa fa-facebook"></e-item>
    <e-item prefixIcon="fa fa-whatsapp"></e-item>
    <e-item prefixIcon="fa fa-instagram"></e-item>
    <e-item prefixIcon="fa fa-pinterest"></e-item>
  </e-items>
</ejs-toolbar>
```

### Font Awesome Icon Examples

| Icon Class | Icon Name |
|-----------|-----------|
| `fa fa-twitter` | Twitter |
| `fa fa-facebook` | Facebook |
| `fa fa-whatsapp` | WhatsApp |
| `fa fa-instagram` | Instagram |
| `fa fa-pinterest` | Pinterest |
| `fa fa-github` | GitHub |
| `fa fa-linkedin` | LinkedIn |
| `fa fa-youtube` | YouTube |

### Custom Font Awesome Styling

```css
.e-toolbar .e-icons.fa {
  font-size: 18px !important;
  color: #333;
}

.e-toolbar .e-icons.fa.fa-twitter {
  color: #1da1f2;
}

.e-toolbar .e-icons.fa.fa-facebook {
  color: #1877f2;
}

.e-toolbar .e-icons.fa.fa-whatsapp {
  color: #25d366;
}
```

### Template with Font Awesome Icons

```typescript
<e-item template='<button class="e-btn e-tbar-btn">
  <span>
    <i style="font-size: 3em !important; color: Tomato" 
       class="e-icons fa fa-twitter"></i>
  </span>
</button>'></e-item>
```

## Icon Colors and Appearance

### Custom Icon Colors

```css
/* Global icon color in toolbar */
.e-toolbar .e-icons.e-btn-icon {
  color: #333 !important;
}

/* Color per button type */
.e-toolbar .e-tbar-btn.save .e-icons.e-btn-icon {
  color: #4caf50;
}

.e-toolbar .e-tbar-btn.delete .e-icons.e-btn-icon {
  color: #f44336;
}

.e-toolbar .e-tbar-btn.edit .e-icons.e-btn-icon {
  color: #2196f3;
}
```

### Icon Size Variations

```css
/* Small icons */
.e-toolbar .e-icons.e-btn-icon.small {
  font-size: 14px;
}

/* Medium icons (default) */
.e-toolbar .e-icons.e-btn-icon {
  font-size: 16px;
}

/* Large icons */
.e-toolbar .e-icons.e-btn-icon.large {
  font-size: 20px;
}

/* Extra large icons */
.e-toolbar .e-icons.e-btn-icon.xlarge {
  font-size: 24px;
}
```

### Icon Spacing

```css
.e-toolbar .e-tbar-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  flex-shrink: 0;
}
```

## Complete Styling Example

```css
/* Toolbar Container */
.e-toolbar {
  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  display: block;
  height: 40px;
  position: relative;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}

/* Items Container */
.e-toolbar .e-toolbar-items {
  display: inline-flex;
  height: 40px;
  vertical-align: middle;
  align-items: center;
}

/* Toolbar Item Buttons */
.e-toolbar .e-toolbar-item .e-tbar-btn {
  background: #ffffff;
  border: 1px solid #d0d0d0;
  color: #333;
  padding: 6px 12px;
  border-radius: 3px;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  min-width: 70px;
}

/* Icon in Button */
.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
  color: #555;
  margin-right: 6px;
  font-size: 16px;
}

/* Hover State */
.e-toolbar .e-tbar-btn:hover {
  background: #f5f5f5;
  border-color: #999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Focus State */
.e-toolbar .e-tbar-btn:focus {
  outline: 2px solid #2196f3;
  outline-offset: 2px;
  box-shadow: 0 0 4px rgba(33, 150, 243, 0.3);
}

/* Separator Items */
.e-toolbar .e-toolbar-item.e-separator {
  display: flex;
  align-items: center;
  margin: 0 4px;
  min-height: auto;
  min-width: 1px;
  height: 24px;
  width: 1px;
  padding: 0;
}

.e-toolbar .e-toolbar-item.e-separator::after {
  content: '';
  height: 24px;
  width: 1px;
  background: #ddd;
}
```

