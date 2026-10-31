# Toast Templates and Styling

The Syncfusion EJ2 JavaScript Toast component supports custom templates, semantic CSS classes, and advanced styling options.

## Table of Contents
- [Template Property](#template-property)
- [HTML String Template](#html-string-template)
- [DOM Selector Template](#dom-selector-template)
- [Dynamic Templates](#dynamic-templates)
- [Semantic CSS Classes](#semantic-css-classes)
- [Custom Styling](#custom-styling)
- [Icon Customization](#icon-customization)

---

## Template Property

The `template` property allows you to customize the entire toast content using HTML strings or DOM elements.

---

## HTML String Template

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  template: '<div class="custom-toast"><h4>Custom Toast</h4><p>This is a custom template</p></div>',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## DOM Selector Template

Reference a DOM element as the template:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  template: '#toast-template',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000
});
toastObj.appendTo('#toast');
toastObj.show();
```

**HTML:**

```html
<script id="toast-template" type="text/x-handlebars-template">
  <div class="custom-toast">
    <div class="toast-header">
      <i class="e-icons e-check"></i>
      <strong>Success</strong>
    </div>
    <div class="toast-body">
      Your changes have been saved successfully.
    </div>
  </div>
</script>
```

---

## Dynamic Templates

Pass dynamic templates at `show()` call time:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000
});
toastObj.appendTo('#toast');

// Show with template
toastObj.show({
  template: '<div class="dynamic-toast"><h4>Dynamic Content</h4><p>Updated at ' + new Date().toLocaleTimeString() + '</p></div>'
});
```

---

## Semantic CSS Classes

The Toast component provides semantic CSS classes for visual differentiation:

| CSS Class | Purpose | Visual Style |
|-----------|---------|--------------|
| `e-toast-success` | Success messages | Green icon and border |
| `e-toast-info` | Informational messages | Blue icon and border |
| `e-toast-warning` | Warning messages | Yellow/orange icon and border |
| `e-toast-danger` | Error/danger messages | Red icon and border |

### Success Toast

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Success!',
  content: 'Operation completed successfully',
  cssClass: 'e-toast-success',
  icon: 'e-success',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Info Toast

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Information',
  content: 'New update available',
  cssClass: 'e-toast-info',
  icon: 'e-info',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Warning Toast

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Warning',
  content: 'Please review before continuing',
  cssClass: 'e-toast-warning',
  icon: 'e-warning',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Danger/Error Toast

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Error',
  content: 'Operation failed',
  cssClass: 'e-toast-danger',
  icon: 'e-error',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Custom Styling

### Override Title Color

```css
.custom-toast-title {
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}
```

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Custom Title',
  content: 'Custom styled toast',
  cssClass: 'custom-toast-title'
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Override Content Color

```css
.custom-toast-content {
  color: #f0f0f0;
  font-size: 14px;
  line-height: 1.5;
}
```

```typescript
let toastObj: Toast = new Toast({
  title: 'Styled Toast',
  content: 'Custom content styling',
  cssClass: 'custom-toast-content'
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Override Background Color

```css
.custom-toast-bg {
  background-color: #2c3e50;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

```typescript
let toastObj: Toast = new Toast({
  title: 'Dark Toast',
  content: 'Custom background',
  cssClass: 'custom-toast-bg'
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Icon Customization

### Custom Icon CSS

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Custom Icon',
  content: 'Toast with custom icon',
  icon: 'e-custom-icon',
  cssClass: 'custom-icon-toast'
});
toastObj.appendTo('#toast');
toastObj.show();
```

```css
.custom-icon-toast .e-toast-icon::before {
  content: '\e730';
  font-family: 'e-icons';
  color: #ff6b6b;
}
```

### Hide Icon

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'No Icon',
  content: 'Toast without icon',
  icon: ''
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Complete Template Example

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

const customTemplate: string = `
  <div class="e-toast-template">
    <div class="e-toast-header" style="display: flex; align-items: center; gap: 8px;">
      <i class="e-icons e-check-circle" style="font-size: 20px; color: #4caf50;"></i>
      <strong>Build Successful</strong>
    </div>
    <div class="e-toast-body" style="margin-top: 8px;">
      <p>All 42 tests passed in 2.3 seconds.</p>
      <div style="margin-top: 12px;">
        <a href="#" style="color: #1976d2; text-decoration: none; margin-right: 12px;">View Details</a>
        <a href="#" style="color: #1976d2; text-decoration: none;">View Logs</a>
      </div>
    </div>
  </div>
`;

let toastObj: Toast = new Toast({
  template: customTemplate,
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 8000,
  showCloseButton: true
});
toastObj.appendTo('#toast');
toastObj.show();
```

```css
.e-toast-template {
  padding: 12px 16px;
}

.e-toast-header {
  font-size: 16px;
}

.e-toast-body p {
  margin: 0;
  color: #555;
  font-size: 14px;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `template` | `string` | `''` | Custom template (HTML string or selector) |
| `cssClass` | `string` | `''` | Custom CSS class |
| `icon` | `string` | `''` | Custom icon class |

For complete API details, see [toast-api.md](./toast-api.md).
