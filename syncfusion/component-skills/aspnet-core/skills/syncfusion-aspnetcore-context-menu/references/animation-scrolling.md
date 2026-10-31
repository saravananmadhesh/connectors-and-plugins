# Animation and Scrolling

## Table of Contents
- [Animation Settings](#animation-settings)
- [Animation Effects](#animation-effects)
- [Duration and Easing](#duration-and-easing)
- [Enabling Scrolling](#enabling-scrolling)
- [Scroll Behavior](#scroll-behavior)
- [Performance Optimization](#performance-optimization)

## Animation Settings

The `animationSettings` property configures how submenus appear when opened. This creates smooth, professional transitions that improve UX.

**Property:** `animationSettings` (MenuAnimationSettingsModel)

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 items="Model.MenuItems"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.ZoomIn, Duration = 500 }">
</ejs-contextmenu>
```

**C# Data Binding:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "File", id = "file", items = new List<object> {
            new { text = "New", id = "new" },
            new { text = "Open", id = "open" }
        }}
    };
}
```

**AnimationSettings Properties:**

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `effect` | MenuEffect enum | SlideDown | Animation transition effect |
| `duration` | number (ms) | 400 | Animation duration in milliseconds |
| `easing` | string | ease | CSS easing function for smooth transition |

## Animation Effects

Four predefined animation effects are available for submenu transitions:

**1. SlideDown (Default)**
```csharp
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.SlideDown, Duration = 400 }"
```

**Behavior:** Submenu slides down from the top, revealing it gradually.

**Best For:** Standard menus, traditional UX expectations.

**2. ZoomIn**
```csharp
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.ZoomIn, Duration = 300 }"
```

**Behavior:** Submenu appears with a zoom scaling effect, starting small and growing to full size.

**Best For:** Modern UI, attention-grabbing animations, premium applications.

**3. FadeIn**
```csharp
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 200 }"
```

**Behavior:** Submenu gradually fades in from transparent to visible.

**Best For:** Subtle animations, accessibility-conscious designs, background elements.

**4. None**
```csharp
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.None }"
```

**Behavior:** Submenu appears instantly without animation.

**Best For:** Performance-critical scenarios, users with motion sensitivity, fast menus without transitions.

**Complete Example:**
```html
<!-- Comparison of all effects -->
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 items="Model.MenuItems"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 200 }">
</ejs-contextmenu>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "File", id = "file", items = new List<object> {
            new { text = "New", id = "new" },
            new { text = "Open", id = "open" },
            new { text = "Save", id = "save" }
        }}
    };
}
```

## Duration and Easing

Fine-tune animation timing and smoothness:

**Duration Property:**
```csharp
// Fast animation (200ms)
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.SlideDown, Duration = 200 }"

// Standard animation (400ms)
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.SlideDown, Duration = 400 }"

// Slow animation (800ms)
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.SlideDown, Duration = 800 }"
```

**Recommended Durations:**
| Duration | Perception | Use Case |
|----------|-----------|----------|
| 100-200ms | Very fast | Rapid navigation, performance priority |
| 300-400ms | Standard (default) | Balanced, feels responsive |
| 500-800ms | Smooth, deliberate | Visual emphasis, significant transitions |
| 1000+ms | Very slow | Special effects, accessibility features |

**Easing Property:**
Controls acceleration and deceleration of the animation:

```csharp
// Linear: constant speed
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"linear\" }"

// Ease (default): slow start, fast end
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"ease\" }"

// Ease-in: accelerating from zero velocity
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"ease-in\" }"

// Ease-out: decelerating to zero velocity
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"ease-out\" }"

// Ease-in-out: acceleration then deceleration
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"ease-in-out\" }"

// Cubic Bezier for custom curves
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Easing = \"cubic-bezier(0.42, 0, 0.58, 1)\" }"
```

**Easing Effects:**

| Easing | Animation Profile | Best For |
|--------|------------------|----------|
| linear | Constant speed | Mechanical, predictable animations |
| ease | Slow start, fast middle, slow end | Natural, smooth transitions |
| ease-in | Slow start, accelerates | Emphasis on starting smoothly |
| ease-out | Decelerates to stop | Emphasis on smooth stopping |
| ease-in-out | Smooth on both ends | Professional, polished feel |
| cubic-bezier | Custom curve | Fine-grained animation control |

**Example with Custom Timing:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 items="Model.MenuItems"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.ZoomIn, Duration = 600, Easing = \"cubic-bezier(0.34, 1.56, 0.64, 1)\" }">
</ejs-contextmenu>
```

## Enabling Scrolling

For menus with many items exceeding viewport height:

**Property:** `enableScrolling` (boolean)

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 enableScrolling="true"
                 items="Model.MenuItems">
</ejs-contextmenu>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>();
    // Generate 100 items
    for (int i = 1; i <= 100; i++)
    {
        MenuItems.Add(new { text = $"Item {i}", id = $"item_{i}" });
    }
}
```

**Default Behavior:**
- `enableScrolling="false"` (default): Menu extends beyond viewport if items exceed height
- `enableScrolling="true"`: Scrollbar appears, menu constrained to viewport

**When to Enable:**
- Large menu lists (>15-20 items)
- Unpredictable item counts (dynamic data)
- Constrained screen real estate
- Mobile/tablet views

**When to Disable:**
- Small, fixed menu lists
- Scrolling adds UI complexity
- Desktop-only applications with ample space

## Scroll Behavior

Configure scrolling characteristics when `enableScrolling="true"`:

**Scroll Direction:**
- Vertical scrolling (default): Items scroll up/down
- No horizontal scrolling: Items text should not overflow

**Scrollbar Appearance:**
- Displays automatically when content exceeds container
- Remove using CSS if custom scrollbar needed
- Styled per theme: Fluent, Material, Bootstrap, etc.

**BeforeOpen Event for Dynamic Height:**
Adjust menu height based on context in the `beforeOpen` event:

```html
<ejs-contextmenu id="contextmenu" target="#target" enableScrolling="true" items="Model.MenuItems">
</ejs-contextmenu>

<script>
var contextmenuInstance;
document.addEventListener('DOMContentLoaded', function() {
    contextmenuInstance = document.getElementById('contextmenu').ej2_instances[0];
    
    // Configure dynamic height
    contextmenuInstance.beforeOpen = function(args) {
        // Get available viewport height
        var availableHeight = window.innerHeight - args.top - 20;
        
        // Set max-height to available space
        var menuElement = document.querySelector('.e-contextmenu');
        if (menuElement) {
            menuElement.style.maxHeight = availableHeight + 'px';
        }
    };
});
</script>
```

**Example: Large Menu with Scrolling**
```html
<ejs-contextmenu id="largeMenu" 
                 target="#target" 
                 enableScrolling="true"
                 items="Model.MenuItems"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 200 }">
</ejs-contextmenu>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "Group 1", id = "group1", items = new List<object> {
            new { text = "Option 1.1", id = "opt1_1" },
            new { text = "Option 1.2", id = "opt1_2" }
        }},
        new { text = "Group 2", id = "group2", items = new List<object> {
            new { text = "Option 2.1", id = "opt2_1" }
        }}
    };
}
```

<style>
/* Optional: Custom scrollbar styling */
.e-contextmenu .e-ul::-webkit-scrollbar {
    width: 8px;
}

.e-contextmenu .e-ul::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.e-contextmenu .e-ul::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.e-contextmenu .e-ul::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
```

## Performance Optimization

Optimize context menu performance for large lists or frequent interactions:

**1. Reduce Animation Duration**
```csharp
// Faster animations for many items
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.None }"

// Or use simple fade instead of complex effects
animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 100 }"
```

**2. Virtualization for Very Large Lists**
When item count exceeds 1000, implement server-side data pagination:

```csharp
public List<object> GetMenuItems(int pageSize = 50)
{
    // Load only visible items from database
    return _context.MenuItems
        .Take(pageSize)
        .Select(m => new { text = m.Text, id = m.Id })
        .ToList();
}
```

**3. Lazy Loading Sub-Items**
Load submenu items only when parent is hovered:

```javascript
// JavaScript event handler
var contextmenu = document.getElementById('contextmenu').ej2_instances[0];
contextmenu.beforeOpen = function(args) {
    // Load submenu items dynamically
    if (args.item && !args.item.loaded) {
        loadSubmenuItems(args.item);
        args.item.loaded = true;
    }
};
```

**4. CSS-Level Performance**
Use optimized CSS for rendering:

```css
/* Enable GPU acceleration */
.e-contextmenu {
    will-change: transform, opacity;
    transform: translateZ(0);
}

/* Reduce repaints */
.e-menu-item {
    contain: layout style paint;
}
```

**5. Separator Performance**
Minimize separator rendering for large menus:

```csharp
// Instead of separators for every 10 items
for (int i = 0; i < items.Count; i ++)
{
    items.Add(item);
    // Add separator only between logical groups, not at regular intervals
    if (IsGroupBoundary(i))
    {
        items.Add(new { separator = true });
    }
}
```

**Benchmarks:**
| Configuration | Rendering Time | Notes |
|--------------|----------------|-------|
| 50 items, FadeIn(200ms) | ~50ms | Recommended default |
| 100 items, SlideDown(400ms) | ~80ms | Acceptable for most uses |
| 500 items, None animation | ~200ms | Performance priority |
| 1000+ items, virtualized | ~100ms | Requires server-side data loading |

