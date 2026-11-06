# Accessibility

## Table of Contents
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [WCAG and Standards Compliance](#wcag-and-standards-compliance)
- [Screen Reader Support](#screen-reader-support)
- [Right-to-Left Support](#right-to-left-support)
- [Color Contrast](#color-contrast)
- [Mobile Accessibility](#mobile-accessibility)

## Keyboard Shortcuts

### Essential Navigation

| Shortcut | Action |
|----------|--------|
| Tab | Navigate focus through controls |
| Shift + Tab | Navigate backwards |
| Enter | Activate button, apply action |
| Escape | Cancel operation, close dialog |
| Delete | Delete selected annotation |

### Image Editing Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl + Z | Undo last action |
| Ctrl + Y | Redo last undone action |
| Ctrl + S | Save image |
| Ctrl + O | Open image |
| Ctrl + '+' | Zoom in |
| Ctrl + '-' | Zoom out |

### Keyboard Usage Examples

```typescript
// All shortcuts work automatically
// Users can:

// Zoom in/out with Ctrl+Plus/Minus
// Undo/Redo with Ctrl+Z/Ctrl+Y
// Delete selected shape with Delete key
// Navigate with Tab/Shift+Tab
// Activate with Enter key
// Cancel with Escape key
```

### Accessible Keyboard Navigation

```typescript
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px'
    // Keyboard navigation is enabled by default
    // All toolbar items accessible via keyboard
    // Form controls follow standard web patterns
});

// Make the host element focusable via standard HTML attribute
document.getElementById('imageeditor').setAttribute('tabindex', '0');
```

## WCAG and Standards Compliance

### Standards Support

The Image Editor follows these accessibility standards:

```typescript
// Supported standards:
// - WCAG 2.2 Level AA compliance
// - Section 508 (US Government)
// - ADA (Americans with Disabilities Act)
// - International accessibility guidelines
```

### Compliance Checklist

```typescript
const complianceStatus = {
    'WCAG 2.2': 'Full support',
    'Section 508': 'Full support',
    'Screen Reader': 'Full support',
    'Keyboard Navigation': 'Full support',
    'Color Contrast': 'Full support',
    'Right-to-Left': 'Full support',
    'Mobile Device': 'Full support',
    'Accessibility Checker': 'Valid',
    'Axe-core': 'Valid'
};
```

### Validation Tools

```typescript
// The Image Editor is tested with:
// - accessibility-checker npm package
// - axe-core automated testing
// - NVDA screen reader
// - JAWS screen reader
```

## Screen Reader Support

### ARIA Labels and Roles

The component uses proper ARIA attributes:

```typescript
// Automatic ARIA implementation:
// - role="img" for image canvas
// - role="toolbar" for toolbar area
// - aria-label for controls
// - aria-describedby for descriptions
// - aria-pressed for toggle buttons
// - aria-expanded for dropdowns
```

### Navigation with Screen Readers

Screen reader users can:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Open', 'Save', 'Crop', 'Rotate'],
    // Screen readers announce:
    // - "Image Editor toolbar with 4 buttons"
    // - Button names when focused
    // - Current zoom level
    // - Image dimensions
});
```

### Semantic HTML

The component uses semantic markup:

```html
<div role="region" aria-label="Image Editor">
    <toolbar role="toolbar">
        <button aria-label="Open Image">Open</button>
        <button aria-label="Save Image">Save</button>
    </toolbar>
    <canvas aria-label="Image Canvas"></canvas>
</div>
```

### Screen Reader Testing

```typescript
// To test with screen reader:
// 1. Enable NVDA or JAWS
// 2. Open Image Editor
// 3. Tab through controls
// 4. Screen reader announces:
//    - Control type (button, input)
//    - Label/name
//    - Current state
//    - Available actions
```

## Right-to-Left Support

### RTL Layout via CSS

Set the `dir` attribute on the host element and provide an RTL CSS theme:

```html
<div id="imageeditor" dir="rtl"></div>
```

```css
[dir="rtl"] .e-image-editor {
    direction: rtl;
    text-align: right;
}

/* Toolbar items mirror automatically */
[dir="rtl"] .e-toolbar {
    flex-direction: row-reverse;
}
```

### RTL with Locale

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { ImageEditor } from '@syncfusion/ej2-image-editor';

L10n.load({
    'ar': {
        'image-editor': {
            // Arabic translations here
        }
    }
});

const imageEditor = new ImageEditor({
    locale: 'ar'  // Arabic locale
});

imageEditor.appendTo('#imageeditor');
```

### RTL Languages Supported

- Arabic (ar)
- Hebrew (he)
- Persian (fa)
- Urdu (ur)
- Other RTL languages through locale settings

## Color Contrast

### Contrast Standards

The Image Editor meets WCAG color contrast ratios:

```typescript
// Color contrast levels:
// - Normal text: 4.5:1 minimum
// - Large text: 3:1 minimum
// - UI components: 3:1 minimum
// - Focus indicators: Clear, distinct colors
```

### Default Theme Contrast

```typescript
// Built-in themes ensure:
// - Dark text on light backgrounds (or vice versa)
// - Clear button states (normal, hover, pressed, disabled)
// - Distinct focus indicators
// - High contrast mode support
```

### Custom Contrast Theme

```typescript
// Create high contrast variant if needed
const customCSS = `
    .e-image-editor .e-toolbar-item {
        border: 2px solid #000;  /* Stronger borders */
        background: #fff;
        color: #000;
    }
    
    .e-image-editor .e-toolbar-item:focus {
        outline: 3px solid #ff00ff;  /* High contrast outline */
    }
`;

// Apply custom CSS
const style = document.createElement('style');
style.textContent = customCSS;
document.head.appendChild(style);
```

### Focus Indicators

Clear visual focus indicators:

```typescript
// Automatic focus management:
// - Tab navigation shows clear focus ring
// - Focus visible on all interactive elements
// - Color: typically 3px solid outline
// - Can be customized with CSS
```

## Mobile Accessibility

### Touch Target Size

```typescript
// Touch targets meet WCAG requirements:
// - Minimum 44x44 CSS pixels
// - Adequate spacing between controls
// - Easy to activate on touch devices
```

### Mobile Input

```typescript
// Mobile-accessible input methods:
// - File picker integrated
// - Touch keyboard support
// - Gesture support (pinch zoom, pan)
// - Long-press for context menus
```

### Responsive Accessibility

```typescript
const imageEditor = new ImageEditor({
    width: '100%',  // Responsive width
    height: '100%',
    // Automatically adjusts for mobile
    // Touch-friendly toolbar
    // Simplified controls on small screens
});
```

### Device Detection

```typescript
import { Browser } from '@syncfusion/ej2-base';

const imageEditor = new ImageEditor({
    created: () => {
        if (Browser.isDevice) {
            console.log('Mobile device detected');
            // Apply mobile-specific settings
            imageEditor.toolbar = ['Open', 'Crop', 'Rotate', 'Save'];
        }
    }
});
```

## Accessibility Best Practices

### Provide Alternatives

```typescript
// For image operations, provide:
// 1. Keyboard shortcuts
// 2. Toolbar buttons
// 3. Menu options
// 4. Right-click context menus

const imageEditor = new ImageEditor({
    toolbar: ['Rotate'],  // Visible control
    // + Keyboard shortcut for power users
    // + Right-click context menu
});
```

### Clear Labeling

```typescript
// Use descriptive labels:
// ✓ Good: "Increase Image Brightness"
// ✓ Good: "Rotate 90 Degrees Clockwise"
// ✗ Bad: "Action 1"
// ✗ Bad: "Click Here"
```

### Error Messages

```typescript
// Provide clear error messages:
const imageEditor = new ImageEditor({
    created: () => {
        try {
            imageEditor.open('url');
        } catch (error) {
            // Clear error message
            alert(`Error: Could not load image. ${error.message}`);
        }
    }
});
```

### State Feedback

```typescript
import { ImageEditor, OpenEventArgs } from '@syncfusion/ej2-image-editor';

// Indicate current state using the fileOpened event
const status = document.getElementById('status');

const imageEditor = new ImageEditor({
    created: () => {
        if (status) status.textContent = 'Loading image...';
        imageEditor.open('url');
    },
    fileOpened: (args: OpenEventArgs) => {
        if (status) status.textContent = 'Ready to edit';
    }
});

imageEditor.appendTo('#imageeditor');
```

### Testing Accessibility

```typescript
// Test with:
// 1. Keyboard only (disable mouse)
// 2. Screen reader (NVDA, JAWS)
// 3. Browser accessibility inspector
// 4. axe DevTools
// 5. Chrome Lighthouse audit
```

