# Internationalization and Right-to-Left Support

## Table of Contents
- [Introduction to RTL](#introduction-to-rtl)
- [EnableRtl Property](#enablertl-property)
- [RTL Positioning](#rtl-positioning)
- [RTL with Different Types](#rtl-with-different-types)
- [RTL with Multi-Sidebar](#rtl-with-multi-sidebar)
- [RTL CSS Considerations](#rtl-css-considerations)
- [RTL Content Guidelines](#rtl-content-guidelines)
- [Testing RTL Implementation](#testing-rtl-implementation)

## Introduction to RTL

Right-to-left (RTL) layout support is essential for applications serving Middle Eastern and North African markets where languages like Arabic, Hebrew, Farsi, and Urdu are written right-to-left. The Sidebar component provides built-in RTL support through the `enableRtl` property, automatically mirroring layout and animations for RTL contexts.

When RTL is enabled, the sidebar automatically:
- Positions on the right side by default
- Mirrors all animations and transitions
- Adjusts padding and margins
- Aligns content appropriately

## EnableRtl Property

The `enableRtl` property controls whether the sidebar renders in RTL mode.

### enableRtl Values

- `true` - Sidebar renders in right-to-left mode
- `false` (default) - Sidebar renders in left-to-right mode

### Basic RTL Example

```cshtml
<!-- RTL sidebar renders on the right -->
<ejs-sidebar id="rtl-sidebar" enableRtl="true" type="Push" isOpen="true">
    <e-content-template>
        <div style="padding: 20px; text-align: right;">
            <h3>قائمة التنقل</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0;">الرئيسية</li>
                <li style="padding: 10px 0;">عن الموقع</li>
                <li style="padding: 10px 0;">اتصل بنا</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; text-align: right;">
    <h1>المحتوى الرئيسي</h1>
    <p>الشريط الجانبي يظهر على اليمين في وضع RTL</p>
</div>
```

### Language-Based RTL

```cshtml
<!-- Conditionally enable RTL based on language -->
@{
    var isRtl = System.Globalization.CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
}

<ejs-sidebar id="lang-sidebar" enableRtl="@isRtl" type="Push">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>@ViewBag.MenuTitle</h3>
        </div>
    </e-content-template>
</ejs-sidebar>
```

## RTL Positioning

### RTL with Left Position

When `position="Left"` is set on an RTL sidebar, the sidebar appears on the left side:

```cshtml
<!-- RTL + Left position = sidebar on left -->
<ejs-sidebar id="rtl-left" enableRtl="true" position="Left" type="Push">
    <e-content-template>
        <p>RTL sidebar positioned LEFT</p>
    </e-content-template>
</ejs-sidebar>
```

### RTL with Right Position

When `position="Right"` (default), the sidebar appears on the right:

```cshtml
<!-- RTL + Right position = sidebar on right (natural RTL) -->
<ejs-sidebar id="rtl-right" enableRtl="true" position="Right" type="Push">
    <e-content-template>
        <p>RTL sidebar positioned RIGHT</p>
    </e-content-template>
</ejs-sidebar>
```

### Default RTL Positioning

The default positioning for RTL sidebars is Right, which provides natural layout for RTL languages:

```cshtml
<!-- Sidebar automatically appears on right for RTL -->
<ejs-sidebar id="rtl-default" enableRtl="true" type="Push">
    <e-content-template>
        <p>Default Right position for RTL</p>
    </e-content-template>
</ejs-sidebar>
```

## RTL with Different Types

### RTL + Over Type

```cshtml
<!-- Over type in RTL: sidebar floats from right -->
<ejs-sidebar id="rtl-over" enableRtl="true" type="Over" isOpen="false">
    <e-content-template>
        <div style="padding: 20px; text-align: right;">
            <h3>قائمة عائمة</h3>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="openRtlOver" content="فتح"></ejs-button>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <p>المحتوى الرئيسي</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('rtl-over').ej2_instances[0];
    document.getElementById('openRtlOver').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### RTL + Push Type

```cshtml
<!-- Push type in RTL: sidebar pushes content from right -->
<ejs-sidebar id="rtl-push" enableRtl="true" type="Push" isOpen="true" width="280px">
    <e-content-template>
        <div style="padding: 20px; text-align: right;">
            <h3>القائمة الرئيسية</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;">الصفحة الرئيسية</li>
                <li style="padding: 8px 0;">القسم الأول</li>
                <li style="padding: 8px 0;">القسم الثاني</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; text-align: right;">
    <h1>نموذج RTL + Push</h1>
    <p>المحتوى ينزاح من اليسار عند فتح الشريط</p>
</div>
```

### RTL + Slide Type

```cshtml
<!-- Slide type in RTL: sidebar slides from right -->
<ejs-sidebar id="rtl-slide" enableRtl="true" type="Slide" isOpen="false">
    <e-content-template>
        <p>قائمة منزلقة</p>
    </e-content-template>
</ejs-sidebar>
```

### RTL + Auto Type

```cshtml
<!-- Auto type in RTL: responsive with RTL mirroring -->
<ejs-sidebar id="rtl-auto" enableRtl="true" type="Auto" isOpen="false">
    <e-content-template>
        <div style="padding: 20px; text-align: right;">
            <h3>قائمة تفاعلية</h3>
            <p>تتكيف مع حجم الشاشة</p>
        </div>
    </e-content-template>
</ejs-sidebar>
```

## RTL with Multi-Sidebar

### Dual Sidebar RTL Layout

```cshtml
<!-- Left sidebar in RTL (appears on left) -->
<ejs-sidebar id="rtl-left-nav" enableRtl="true" position="Left" type="Push" width="240px" isOpen="true">
    <e-content-template>
        <div style="padding: 15px; text-align: right;">
            <h4>التنقل</h4>
        </div>
    </e-content-template>
</ejs-sidebar>

<!-- Right sidebar in RTL (appears on right - natural) -->
<ejs-sidebar id="rtl-right-detail" enableRtl="true" position="Right" type="Push" width="300px" isOpen="true">
    <e-content-template>
        <div style="padding: 15px; text-align: right;">
            <h4>التفاصيل</h4>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; text-align: right; background-color: #f5f5f5; min-height: 300px;">
    <h1>المحتوى الرئيسي</h1>
    <p>شريطان جانبيان في وضع RTL</p>
</div>
```

## RTL CSS Considerations

### Text Alignment in RTL

```cshtml
<ejs-sidebar id="rtl-text" enableRtl="true">
    <e-content-template>
        <div style="padding: 20px;">
            <!-- Text should align right in RTL -->
            <h3 style="text-align: right;">النص مرتب من اليمين</h3>
            
            <!-- Lists should flow RTL -->
            <ul style="list-style-position: inside; direction: rtl;">
                <li>العنصر الأول</li>
                <li>العنصر الثاني</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Direction CSS Property

```html
<style>
    .rtl-content {
        direction: rtl;
        text-align: right;
    }
    
    .rtl-content ul {
        padding-right: 20px;
        padding-left: 0;
    }
</style>

<ejs-sidebar id="rtl-styled" enableRtl="true">
    <e-content-template>
        <div class="rtl-content">
            <h3>قائمة</h3>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Padding/Margin Adjustments

```html
<style>
    .sidebar-rtl-padding {
        padding: 20px; /* Same on all sides */
    }
    
    .sidebar-rtl-item {
        margin-left: 0;
        margin-right: 10px; /* Right margin in RTL */
    }
</style>
```

## RTL Content Guidelines

### Guidelines for RTL Sidebar Content

1. **Text Direction**: Always set `direction: rtl` in RTL sidebars
2. **List Items**: Ensure list items flow from right to left
3. **Icons**: Position icons appropriately (right vs left)
4. **Links**: Ensure links are readable in RTL context
5. **Forms**: Input fields and labels should align appropriately
6. **Images**: Mirror directional indicators if needed

### Example: RTL Menu with Icons

```cshtml
<ejs-sidebar id="rtl-icons" enableRtl="true" position="Right" type="Push" width="280px">
    <e-content-template>
        <div style="padding: 20px; text-align: right; direction: rtl;">
            <h3>📋 القائمة الرئيسية</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0; display: flex; align-items: center; flex-direction: row-reverse;">
                    <span style="margin-left: 10px;">🏠</span>
                    <span>الرئيسية</span>
                </li>
                <li style="padding: 10px 0; display: flex; align-items: center; flex-direction: row-reverse;">
                    <span style="margin-left: 10px;">📊</span>
                    <span>التقارير</span>
                </li>
                <li style="padding: 10px 0; display: flex; align-items: center; flex-direction: row-reverse;">
                    <span style="margin-left: 10px;">⚙️</span>
                    <span>الإعدادات</span>
                </li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Example: RTL Form in Sidebar

```cshtml
<ejs-sidebar id="rtl-form" enableRtl="true" type="Push" width="320px">
    <e-content-template>
        <div style="padding: 20px; direction: rtl; text-align: right;">
            <h3>نموذج الاتصال</h3>
            <form style="display: flex; flex-direction: column;">
                <label style="margin-top: 15px; margin-bottom: 5px; text-align: right;">الاسم</label>
                <input type="text" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; direction: rtl;">
                
                <label style="margin-top: 15px; margin-bottom: 5px; text-align: right;">البريد الإلكتروني</label>
                <input type="email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; direction: rtl;">
                
                <button style="margin-top: 20px; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">إرسال</button>
            </form>
        </div>
    </e-content-template>
</ejs-sidebar>
```

## Testing RTL Implementation

### Manual RTL Testing

1. **Visual Inspection**: Verify sidebar appears on the correct side
2. **Animation Check**: Confirm animations slide in correct direction
3. **Content Alignment**: Check text and elements align properly
4. **Interaction**: Test opening/closing and state changes
5. **Responsiveness**: Test on different screen sizes

### Browser DevTools RTL Testing

In Chrome DevTools, you can simulate RTL:

```javascript
// In Chrome Console
document.documentElement.setAttribute('dir', 'rtl');
document.documentElement.lang = 'ar'; // Or appropriate RTL language code
```

### Programmatic RTL Testing

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

// Test RTL property
console.log('RTL Enabled:', sidebar.enableRtl);

// Verify position in RTL mode
if (sidebar.enableRtl) {
    console.log('Sidebar should be on', sidebar.position === 'Right' ? 'right' : 'left');
}
```

### Complete RTL Test Example

```cshtml
<!-- Multi-language selector for testing RTL -->
<div style="padding: 10px; background-color: #333; color: white;">
    <select id="language-selector" onchange="changeLanguage(this.value)">
        <option value="en">English (LTR)</option>
        <option value="ar">العربية (RTL)</option>
        <option value="he">עברית (RTL)</option>
        <option value="fa">فارسی (RTL)</option>
    </select>
</div>

<ejs-sidebar id="multilang-sidebar" type="Push" isOpen="true">
    <e-content-template>
        <div id="sidebar-content" style="padding: 20px;">
            <!-- Content changes based on language -->
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;" id="main-content">
    <!-- Main content -->
</div>

<script>
function changeLanguage(lang) {
    var sidebar = document.getElementById('multilang-sidebar').ej2_instances[0];
    var isRtl = ['ar', 'he', 'fa'].includes(lang);
    
    // Update sidebar RTL setting
    sidebar.enableRtl = isRtl;
    sidebar.dataBind();
    
    // Update document direction
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update content based on language
    var content = document.getElementById('sidebar-content');
    var mainContent = document.getElementById('main-content');
    
    if (lang === 'ar') {
        content.innerHTML = '<h3>القائمة الرئيسية</h3>';
        mainContent.innerHTML = '<h1>محتوى رئيسي</h1>';
    } else if (lang === 'he') {
        content.innerHTML = '<h3>התפריט הראשי</h3>';
        mainContent.innerHTML = '<h1>תוכן ראשי</h1>';
    } else {
        content.innerHTML = '<h3>Main Menu</h3>';
        mainContent.innerHTML = '<h1>Main Content</h1>';
    }
}
</script>
```

---

**Next Step:** Learn about [Styling and Appearance](styling-and-appearance.md) customization with animations and themes.
