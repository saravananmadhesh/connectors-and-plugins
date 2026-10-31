# Sidebar Types and Expansion Behavior

## Table of Contents
- [Understanding Sidebar Types](#understanding-sidebar-types)
- [Over Type](#over-type)
- [Push Type](#push-type)
- [Slide Type](#slide-type)
- [Auto Type](#auto-type)
- [Choosing the Right Type](#choosing-the-right-type)
- [Changing Type at Runtime](#changing-type-at-runtime)
- [Type Selection Best Practices](#type-selection-best-practices)
- [Type Comparison Table](#type-comparison-table)

## Understanding Sidebar Types

The Sidebar component supports four different expansion types, each providing unique visual and behavioral characteristics. The `type` property controls how the sidebar renders when expanded or collapsed. Each type is designed for specific use cases and user experiences.

Understanding these types is fundamental to implementing a sidebar that matches your application's layout requirements and user experience goals. The chosen type affects not only visual appearance but also how the main content responds to sidebar expansion.

## Over Type

The **Over** type makes the sidebar float above the main content area like a modal overlay. When expanded, the sidebar appears on top of the main content without pushing it aside. This type is ideal for mobile layouts or when you want to minimize layout disruption.

### Over Type Characteristics

- Sidebar floats on top of content
- Main content remains in its original position
- No layout shift or reflow occurs
- Typically paired with `showBackdrop="true"` for modal effect
- Suitable for mobile-first layouts
- Takes up no permanent page space

### Over Type Example

```cshtml
<ejs-sidebar id="over-sidebar" type="Over" isOpen="false" showBackdrop="true">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Navigation Menu</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;"><a href="/">Dashboard</a></li>
                <li style="padding: 8px 0;"><a href="/analytics">Analytics</a></li>
                <li style="padding: 8px 0;"><a href="/reports">Reports</a></li>
                <li style="padding: 8px 0;"><a href="/settings">Settings</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="toggleOver" content="Open Navigation"></ejs-button>

<div style="padding: 20px; background-color: #f5f5f5; height: 400px;">
    <h1>Main Content Area</h1>
    <p>Content remains visible behind the overlaid sidebar</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('over-sidebar').ej2_instances[0];
    document.getElementById('toggleOver').onclick = function () {
        sidebar.toggle();
    };
});
</script>
```

### Over Type Use Cases

- Mobile navigation hamburger menus
- Temporary menu panels
- Modal-style navigation overlays
- Minimizing visual disruption to main content
- Pop-up menus and dropdowns

## Push Type

The **Push** type causes the sidebar to push the main content area to the side when expanded. The main content shrinks horizontally to make room for the sidebar. This type works well on desktop layouts where significant horizontal space is available.

### Push Type Characteristics

- Sidebar pushes main content aside
- Main content shrinks horizontally
- Layout reflow occurs when sidebar expands
- Both sidebar and content visible simultaneously
- Full width is divided between sidebar and content
- Popular for desktop dashboards and applications

### Push Type Example

```cshtml
<ejs-sidebar id="push-sidebar" type="Push" isOpen="false" width="280px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Project Menu</h3>
            <div style="margin-top: 20px;">
                <h4 style="font-size: 12px; color: #666; margin-bottom: 10px;">PROJECTS</h4>
                <ul style="list-style: none; padding-left: 0;">
                    <li style="padding: 10px 5px; background-color: #f0f0f0; margin-bottom: 5px; border-radius: 4px;">
                        <a href="/" style="text-decoration: none;">Project Alpha</a>
                    </li>
                    <li style="padding: 10px 5px; margin-bottom: 5px; border-radius: 4px;">
                        <a href="/" style="text-decoration: none;">Project Beta</a>
                    </li>
                    <li style="padding: 10px 5px; margin-bottom: 5px; border-radius: 4px;">
                        <a href="/" style="text-decoration: none;">Project Gamma</a>
                    </li>
                </ul>
            </div>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <ejs-button id="togglePush" content="Toggle Sidebar"></ejs-button>
    <h1>Dashboard</h1>
</div>

<div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; height: 400px; display: flex;">
    <div style="flex: 1; padding: 20px;">
        <h2>Main Content</h2>
        <p>This content shrinks when sidebar is open</p>
        <div style="margin-top: 20px;">
            <div style="width: 100%; height: 100px; background-color: #e0e0e0; border-radius: 4px; margin-bottom: 15px;"></div>
            <div style="width: 100%; height: 100px; background-color: #e0e0e0; border-radius: 4px; margin-bottom: 15px;"></div>
            <div style="width: 100%; height: 100px; background-color: #e0e0e0; border-radius: 4px;"></div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('push-sidebar').ej2_instances[0];
    document.getElementById('togglePush').onclick = function () {
        sidebar.toggle();
    };
});
</script>
```

### Push Type Use Cases

- Desktop admin dashboards
- Multi-column layouts with navigation
- Applications where sidebar and content both need visibility
- Wide screen layouts
- Toolbars and side panels in design applications

## Slide Type

The **Slide** type translates both the sidebar and main content together based on sidebar width. The sidebar slides in from the side, and the main content shifts to reveal it, but the content area doesn't resize. The main content may become partially hidden by the sidebar.

### Slide Type Characteristics

- Sidebar slides from the edge
- Main content translates/shifts position
- Main content is not resized, may be partially covered
- Creates a sliding animation effect
- Content may extend beyond visible area
- Useful for specific layout patterns

### Slide Type Example

```cshtml
<ejs-sidebar id="slide-sidebar" type="Slide" isOpen="false" width="250px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Slide Navigation</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="/" style="text-decoration: none; color: #333;">Home</a>
                </li>
                <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="/" style="text-decoration: none; color: #333;">Products</a>
                </li>
                <li style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <a href="/" style="text-decoration: none; color: #333;">Services</a>
                </li>
                <li style="padding: 12px 0;">
                    <a href="/" style="text-decoration: none; color: #333;">Support</a>
                </li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f9f9f9;">
    <ejs-button id="toggleSlide" content="Slide Menu"></ejs-button>
</div>

<div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 300px; color: white; text-align: center;">
    <h2>Slide Type Demonstration</h2>
    <p style="font-size: 18px;">Content slides with the sidebar</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('slide-sidebar').ej2_instances[0];
    document.getElementById('toggleSlide').onclick = function () {
        sidebar.toggle();
    };
});
</script>
```

### Slide Type Use Cases

- Specific animation requirements
- Custom layout implementations
- Creative sidebar presentations
- Content carousel effects
- Specialized navigation patterns

## Auto Type

The **Auto** type provides responsive behavior, automatically selecting between Over and Push types based on screen resolution. On mobile devices, it behaves like Over (floating overlay), while on desktop screens, it behaves like Push (content adjustment). This is the default type and ideal for responsive applications.

### Auto Type Characteristics

- Mobile: behaves as Over type
- Desktop: behaves as Push type
- Automatic responsive switching
- No manual configuration needed per breakpoint
- Default type if not specified
- Ideal for responsive web applications
- Breakpoint determined by media query evaluation

### Auto Type Example

```cshtml
<ejs-sidebar id="auto-sidebar" type="Auto" isOpen="false" width="300px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Responsive Navigation</h3>
            <div style="font-size: 12px; color: #999; margin-bottom: 15px;">
                This sidebar is <strong>Over</strong> on mobile and <strong>Push</strong> on desktop
            </div>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0; border-left: 3px solid transparent;">
                    <a href="/" style="text-decoration: none;">📊 Dashboard</a>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid transparent;">
                    <a href="/" style="text-decoration: none;">👥 Users</a>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid transparent;">
                    <a href="/" style="text-decoration: none;">📈 Analytics</a>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid transparent;">
                    <a href="/" style="text-decoration: none;">⚙️ Settings</a>
                </li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #fff; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
    <ejs-button id="toggleAuto" content="☰ Menu" onclick="toggleMenu()"></ejs-button>
    <h1 style="margin: 0;">My App</h1>
    <div style="width: 40px;"></div>
</div>

<div style="padding: 40px; background-color: #f5f5f5; min-height: 500px;">
    <h2>Responsive Auto Type</h2>
    <p>
        This sidebar automatically adapts to your screen size:
    </p>
    <ul style="line-height: 1.8;">
        <li><strong>On mobile:</strong> Sidebar appears as an overlay on top of content (Over type)</li>
        <li><strong>On desktop:</strong> Sidebar pushes content to the side (Push type)</li>
        <li><strong>Seamless transition:</strong> No manual configuration needed</li>
        <li><strong>Best practice:</strong> Recommended for most responsive applications</li>
    </ul>
</div>

<script>
function toggleMenu() {
    var sidebar = document.getElementById('auto-sidebar').ej2_instances[0];
    sidebar.toggle();
}
</script>
```

### Auto Type Use Cases

- Responsive web applications
- Mobile-first design patterns
- Modern web applications
- Most general-purpose applications
- When supporting both desktop and mobile
- Default recommendation for new projects

## Choosing the Right Type

### Decision Matrix

| Use Case | Recommended Type | Reason |
|----------|-----------------|--------|
| Mobile app or responsive design | Auto | Automatically adapts to screen size |
| Mobile-only app | Over | Always overlay, minimal layout disruption |
| Desktop dashboard | Push | Shows sidebar and content simultaneously |
| Modal-like menu | Over + showBackdrop | Creates modal navigation effect |
| Content carousel | Slide | Natural sliding animation |
| Full-width layout | Push | Best use of desktop space |
| Limited horizontal space | Over | Preserves content area |
| Web app with both desktop/mobile users | Auto | Single solution for all devices |

### Type Selection Flowchart

1. **Is this a mobile-only app?** → Use **Over**
2. **Do you need responsive behavior (mobile + desktop)?** → Use **Auto**
3. **Is this desktop-only with wide screens?** → Use **Push**
4. **Do you want content to shift without resizing?** → Use **Slide**
5. **Unsure?** → Use **Auto** (safest default choice)

## Changing Type at Runtime

Sidebar type can be changed dynamically at runtime using the `dataBind()` method. This allows you to switch behavior based on user preferences or application state.

### Runtime Type Change Example

```cshtml
<div style="padding: 20px; background-color: #f0f0f0; margin-bottom: 20px;">
    <h3>Select Sidebar Type:</h3>
    <ejs-radiobutton id="radio-over" name="type-group" label="Over" value="Over" change="onTypeChange"></ejs-radiobutton>
    <ejs-radiobutton id="radio-push" name="type-group" label="Push" value="Push" change="onTypeChange"></ejs-radiobutton>
    <ejs-radiobutton id="radio-slide" name="type-group" label="Slide" value="Slide" change="onTypeChange"></ejs-radiobutton>
    <ejs-radiobutton id="radio-auto" name="type-group" label="Auto" value="Auto" checked="true" change="onTypeChange"></ejs-radiobutton>
</div>

<ejs-sidebar id="dynamic-sidebar" type="Auto" isOpen="true" width="280px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Navigation</h3>
            <p>Type can be changed using radio buttons above</p>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; height: 400px; background-color: #fff; border: 1px solid #ddd;">
    <h2>Content Area</h2>
    <p>Observe how content behaves as type changes</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('dynamic-sidebar').ej2_instances[0];
    
    function onTypeChange(args) {
        // Change sidebar type based on selected radio button
        sidebar.type = args.value;
        
        // Apply the changes immediately
        sidebar.dataBind();
    };
});
</script>
```

### Important: Using dataBind()

After modifying properties, always call `dataBind()` to apply changes:

```javascript
var sidebar = document.getElementById('my-sidebar').ej2_instances[0];

// Change multiple properties
sidebar.type = 'Push';
sidebar.width = '320px';
sidebar.animate = true;

// Apply all changes
sidebar.dataBind();
```

## Type Selection Best Practices

### Practice 1: Use Auto for Responsive Apps

Always use `type="Auto"` for applications that need to work on both desktop and mobile:

```cshtml
<!-- Best Practice -->
<ejs-sidebar id="nav-sidebar" type="Auto" isOpen="false">
    <!-- Content -->
</ejs-sidebar>
```

### Practice 2: Combine Over with Backdrop for Modal Effect

When using Over type, add backdrop for visual separation:

```cshtml
<!-- Best Practice -->
<ejs-sidebar id="modal-sidebar" type="Over" showBackdrop="true" closeOnDocumentClick="true">
    <!-- Content -->
</ejs-sidebar>
```

### Practice 3: Set Appropriate Width

Configure width based on content:

```cshtml
<!-- Best Practice: Specific width for navigation items -->
<ejs-sidebar id="sidebar" type="Push" width="280px">
    <!-- Content -->
</ejs-sidebar>
```

### Practice 4: Avoid Type Changes During Interaction

Don't change type while sidebar is being animated:

```javascript
// Bad Practice - avoid this
document.getElementById('toggleBtn').onclick = function() {
    sidebar.toggle();
    sidebar.type = 'Push'; // Don't change during animation
    sidebar.dataBind();
};
```

### Practice 5: Test Responsive Behavior

For Auto type, test on multiple screen sizes:

1. Desktop (1920px wide) - should be Push
2. Tablet (768px wide) - should transition
3. Mobile (375px wide) - should be Over

## Type Comparison Table

| Feature | Over | Push | Slide | Auto |
|---------|------|------|-------|------|
| Overlays content | Yes | No | No | Yes (mobile) / No (desktop) |
| Content shrinks | No | Yes | No | Yes (mobile) / No (desktop) |
| Content translates | No | No | Yes | No |
| Mobile-friendly | Yes | No | No | Yes |
| Desktop-friendly | No | Yes | Yes | Yes |
| Space-efficient | Yes | No | Yes | Responsive |
| Animation smooth | Yes | Yes | Yes | Yes |
| Full content visible | No | Yes | No | Responsive |
| Use backdrop overlay | Often | Rarely | Rarely | Responsive |
| Default type | No | No | No | **Yes** |

---

**Next Step:** Learn how to manage sidebar state with the `show()`, `hide()`, and `toggle()` methods in the [Managing State](managing-state.md) guide.
