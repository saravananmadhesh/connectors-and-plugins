# Globalization and RTL Support in Syncfusion TypeScript Splitter

## Table of Contents
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Enable RTL](#enable-rtl)
- [RTL Property Details](#rtl-property-details)
- [RTL Examples](#rtl-examples)
- [Language Detection and Dynamic RTL](#language-detection-and-dynamic-rtl)
- [CSS Adjustments for RTL](#css-adjustments-for-rtl)
- [Best Practices for RTL](#best-practices-for-rtl)

---

The Syncfusion Splitter supports right-to-left (RTL) layout for languages that use RTL text direction such as Arabic, Hebrew, Urdu, and Persian.

---

## Right-to-Left (RTL) Support

RTL layout reverses the visual direction of the interface while maintaining functional behavior.

### RTL Text Direction Languages

The following languages use right-to-left text direction:

| Language | Language Code | Region |
|----------|---------------|--------|
| Arabic | ar | Middle East, North Africa |
| Hebrew | he | Israel |
| Urdu | ur | Pakistan, India |
| Persian/Farsi | fa | Iran |
| Kurdish | ku | Kurdistan region |
| Uyghur | ug | China |
| Pashto | ps | Afghanistan |
| Dhivehi/Maldivian | dv | Maldives |

---

## Enable RTL

Set the `enableRtl` property to `true` to enable right-to-left layout:

### Basic RTL Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    paneSettings: [
        { content: 'Left Pane' },
        { content: 'Middle Pane' },
        { content: 'Right Pane' }
    ],
    enableRtl: true,  // <-- Enable RTL
    height: '250px'
});
splitObj.appendTo('#splitter');
```

### RTL HTML Example

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">  <!-- Set HTML dir attribute -->

<head>
    <title>Essential JS 2 Splitter - RTL</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <!-- Splitter with RTL support -->
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>اليمين</h3>  <!-- Arabic text -->
                    محتوى الجزء الأيمن
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>الوسط</h3>
                    محتوى الجزء الأوسط
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>اليسار</h3>
                    محتوى الجزء الأيسر
                </div>
            </div>
        </div>
    </div>

    <script src="path/to/index.ts"></script>
</body>

</html>
```

---

## RTL Property Details

### enableRtl Property

```typescript
enableRtl: boolean  // Default: false
```

### Values

| Value | Result | Default |
|-------|--------|---------|
| `true` | Enable RTL layout | - |
| `false` | Standard LTR layout | ✓ Yes |

### Behavior Changes with RTL

When `enableRtl: true`:

1. **Pane Order:** Panes appear in reverse visual order (right-to-left)
2. **Separators:** Positioned for RTL flow
3. **Resize:** Drag left/right behavior reverses for vertical separators
4. **Collapse/Expand:** Icons positioned for RTL layout
5. **Text:** Automatically aligned right for RTL languages
6. **CSS:** Margin/padding properties mirror horizontally

---

## RTL Examples

### Example 1: Arabic Splitter with Collapsible Panes

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    enableRtl: true,
    paneSettings: [
        {
            size: '25%',
            collapsible: true,
            content: '<h3>القائمة</h3><p>محتوى القائمة الجانبية</p>'
        },
        {
            size: '50%',
            content: '<h3>المحتوى الرئيسي</h3><p>محتوى الصفحة الرئيسية</p>'
        },
        {
            size: '25%',
            collapsible: true,
            content: '<h3>التفاصيل</h3><p>جزء التفاصيل</p>'
        }
    ]
});
splitObj.appendTo('#splitter');
```

### Example 2: Hebrew Vertical Splitter

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    orientation: 'Vertical',
    enableRtl: true,
    paneSettings: [
        { size: '100px', content: 'כותרת עליונה' },
        { size: '250px', content: 'תוכן ראשי' },
        { size: '50px', collapsible: true, content: 'כלי עזר' }
    ]
});
splitObj.appendTo('#splitter');
```

### Example 3: Responsive Configuration with RTL

```typescript
let splitObj: Splitter = new Splitter({
    height: '500px',
    width: '100%',
    enableRtl: true,
    paneSettings: [
        {
            size: '25%',
            min: '18%',
            max: '40%',
            collapsible: true,
            content: 'تصفية البيانات'
        },
        {
            size: '50%',
            min: '40%',
            max: '70%',
            content: 'عرض البيانات'
        },
        {
            size: '25%',
            min: '18%',
            max: '40%',
            collapsible: true,
            content: 'معلومات إضافية'
        }
    ]
});
splitObj.appendTo('#splitter');
```

---

## Language Detection and Dynamic RTL

### Detecting User Language

```typescript
// Detect language from browser/locale
function getUserLanguage(): string {
    return navigator.language || navigator.userLanguage;
}

// RTL languages list
const rtlLanguages = ['ar', 'he', 'ur', 'fa', 'ku', 'ug', 'ps', 'dv'];

function isRtlLanguage(lang: string): boolean {
    return rtlLanguages.some(rtl => lang.startsWith(rtl));
}

// Initialize splitter with detected language
const userLang = getUserLanguage();
const enableRtl = isRtlLanguage(userLang);

let splitObj: Splitter = new Splitter({
    height: '300px',
    enableRtl: enableRtl,
    paneSettings: [...]
});
splitObj.appendTo('#splitter');
```

### Dynamic RTL Toggle

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '300px',
    enableRtl: false,  // Start with LTR
    paneSettings: [...]
});
splitObj.appendTo('#splitter');

// Toggle RTL on button click
document.getElementById('toggleRtl').onclick = (): void => {
    const currentRtl = splitObj.enableRtl;
    splitObj.enableRtl = !currentRtl;
    splitObj.refresh();  // Refresh to apply changes
}
```

---

## CSS Adjustments for RTL

### RTL-Specific CSS

The Splitter automatically handles RTL styling, but you can add custom CSS if needed:

```css
/* RTL container */
[dir="rtl"] .e-splitter {
    direction: rtl;
}

/* RTL split bar */
[dir="rtl"] .e-splitter .e-split-bar {
    text-align: right;
}

/* RTL hover state */
[dir="rtl"] .e-splitter .e-split-bar.e-split-bar-hover {
    background: #3498db;
}
```

### Logical Properties (Modern CSS)

Instead of `left` and `right`, use logical properties for RTL compatibility:

```css
/* Instead of: margin-left, margin-right */
.pane {
    margin-inline-start: 10px;  /* Left in LTR, Right in RTL */
    margin-inline-end: 10px;    /* Right in LTR, Left in RTL */
    padding-inline-start: 15px;
    padding-inline-end: 15px;
}

/* Instead of: float: left, float: right */
.sidebar {
    float: inline-start;  /* Float left in LTR, right in RTL */
}
```

---

## Best Practices for RTL

### 1. Always Set HTML Dir Attribute

```html
<!-- For RTL languages -->
<html lang="ar" dir="rtl">

<!-- For LTR languages -->
<html lang="en" dir="ltr">
```

### 2. Use enableRtl Property

```typescript
const isRtl = document.documentElement.dir === 'rtl';

let splitObj: Splitter = new Splitter({
    enableRtl: isRtl,
    // ... rest of config
});
```

### 3. Test Both Orientations

- Test horizontal splitter in RTL
- Test vertical splitter in RTL
- Test collapsible panes in RTL
- Test resizing behavior in RTL

### 4. Provide RTL Content

```typescript
// Good: Content appropriate for RTL
const arabicContent = {
    sidebar: 'القائمة الجانبية',
    main: 'المحتوى الرئيسي',
    details: 'جزء التفاصيل'
};

// Use in splitter
let splitObj: Splitter = new Splitter({
    enableRtl: true,
    paneSettings: [
        { content: arabicContent.sidebar },
        { content: arabicContent.main },
        { content: arabicContent.details }
    ]
});
```

### 5. Test Nested Splitters with RTL

```typescript
// Outer splitter RTL
let outer: Splitter = new Splitter({
    enableRtl: true,
    orientation: 'Vertical'
});

// Inner splitter also RTL
let inner: Splitter = new Splitter({
    enableRtl: true,  // Match parent
    orientation: 'Horizontal'
});
```

---

## Complete RTL Application Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Application initialization
function initializeApp() {
    // Detect RTL from HTML or user preference
    const isRtl = document.documentElement.dir === 'rtl' || 
                  localStorage.getItem('language') === 'ar';

    // Initialize main splitter
    let mainSplit: Splitter = new Splitter({
        height: '600px',
        width: '100%',
        orientation: 'Vertical',
        enableRtl: isRtl,
        paneSettings: [
            { size: '60px', resizable: false },  // Header
            { size: '100%' },                     // Main area
            { size: '40px', resizable: false }   // Footer
        ]
    });
    mainSplit.appendTo('#mainSplit');

    // Initialize content splitter
    let contentSplit: Splitter = new Splitter({
        height: '100%',
        width: '100%',
        enableRtl: isRtl,
        paneSettings: [
            {
                size: '250px',
                min: '200px',
                max: '350px',
                collapsible: true
            },
            { size: '100%' },
            {
                size: '250px',
                min: '200px',
                max: '350px',
                collapsible: true
            }
        ]
    });
    contentSplit.appendTo('#contentSplit');

    // Language toggle
    document.getElementById('langToggle').onclick = (): void => {
        const newRtl = !isRtl;
        localStorage.setItem('language', newRtl ? 'ar' : 'en');
        location.reload();  // Reload to apply changes
    }
}

// Initialize on page load
window.addEventListener('load', initializeApp);
```

---

## Summary

- **enableRtl:** Set to `true` for right-to-left languages
- **HTML dir attribute:** Set `<html dir="rtl">` for proper text direction
- **Automatic layout:** Splitter automatically mirrors for RTL
- **Supported:** Arabic, Hebrew, Urdu, Persian, and other RTL languages
- **Consistent:** All features work the same in RTL and LTR modes
- **Testing:** Always test both orientations and collapsible panes
- **Nested splitters:** Ensure all levels use same `enableRtl` value
