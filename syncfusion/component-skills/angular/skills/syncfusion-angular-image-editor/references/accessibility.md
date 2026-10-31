# Accessibility in Angular Image Editor

The Image Editor is fully accessible and compliant with WCAG 2.2, Section 508, and ADA standards.

## Accessibility Standards

The Image Editor supports:
- ✓ WCAG 2.2 Level AA compliance
- ✓ Section 508 compliance
- ✓ Screen reader support
- ✓ Keyboard navigation
- ✓ Color contrast standards
- ✓ Right-to-left (RTL) support
- ✓ Mobile accessibility

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + S` | Save |
| `Ctrl + O` | Open |
| `Ctrl + +` | Zoom In |
| `Ctrl + -` | Zoom Out |
| `Delete` | Delete selected annotation |
| `Enter` | Apply crop/resize |
| `Escape` | Discard operation |

## Screen Reader Support

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-accessible-editor',
  template: `
    <h1>Image Editor</h1>
    <p>Use toolbar buttons or keyboard shortcuts to edit image</p>
    <ejs-imageeditor 
      #imageEditor
      role="region"
      aria-label="Image Editor"
    ></ejs-imageeditor>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class AccessibleEditorComponent { }
```

## Color Contrast

All UI elements meet WCAG AA contrast requirements:
- Text: minimum 4.5:1 ratio
- UI components: minimum 3:1 ratio

## Right-to-Left (RTL) Support

The Image Editor supports RTL languages. RTL mode can be enabled globally or per component:

```typescript
// Set RTL globally
document.documentElement.dir = 'rtl';

@Component({
  template: `
    <ejs-imageeditor></ejs-imageeditor>
  `
})
export class RTLEditorComponent { }
```

## Mobile Accessibility

The Image Editor is fully mobile-accessible:
- Touch gestures for all operations
- Large touch targets for buttons
- Adaptive toolbar layout
- Keyboard support on mobile

### Touch Gestures

- **Pinch**: Zoom in/out
- **Tap**: Select/activate
- **Drag**: Pan image or move annotations
- **Double-tap**: Zoom to fit

## Keyboard Navigation

Users can navigate all toolbar items and controls using:
- `Tab` - Move forward through controls
- `Shift + Tab` - Move backward through controls
- `Enter` - Activate button
- `Space` - Toggle checkbox/button

## ARIA Labels

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      aria-label="Image Editor - Use Ctrl+Z for undo, Ctrl+S to save"
    ></ejs-imageeditor>
  `
})
export class AriaLabelComponent { }
```

## Complete Accessible Setup

```typescript
@Component({
  selector: 'app-fully-accessible',
  template: `
    <div role="main">
      <h1>Image Editing Tool</h1>
      <p>Instructions: Use toolbar or keyboard shortcuts (Ctrl+Z: undo, Ctrl+S: save)</p>
      
      <ejs-imageeditor 
        #imageEditor
        aria-label="Image Editor with full keyboard support"
        role="region"
      ></ejs-imageeditor>
      
      <p>
        <strong>Keyboard Help:</strong>
        Ctrl+O: Open, Ctrl+S: Save, Ctrl+Z: Undo, 
        Ctrl+Y: Redo, Delete: Remove selected annotation
      </p>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class FullyAccessibleComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  ngOnInit() {
    // Detect and set RTL language
    if (document.documentElement.dir === 'rtl') {
      // RTL is automatically applied based on HTML dir attribute
    }
  }
}
```

## Testing Accessibility

Test with accessibility tools:
- Axe DevTools
- Accessibility Checker
- NVDA screen reader
- JAWS screen reader

## WAI-ARIA Roles

The Image Editor uses appropriate ARIA roles:
- `region` - Main editor area
- `button` - Toolbar buttons
- `toolbar` - Toolbar container
- `img` - Image preview

## Best Practices

1. **Provide keyboard alternatives** for all mouse actions
2. **Use semantic HTML** in custom templates
3. **Test with screen readers** regularly
4. **Maintain color contrast** in custom themes
5. **Support RTL** for international users

## Validation

The Image Editor passes:
- Axe-core automated checks
- Accessibility Checker validation
- Manual WCAG 2.2 assessment

## Edge Cases

**Issue:** Screen reader not reading toolbar
- **Solution:** Ensure toolbar items have aria-labels; use semantically correct HTML

**Issue:** Keyboard shortcuts not working
- **Solution:** Focus must be on Image Editor; verify keyboard layout matches
