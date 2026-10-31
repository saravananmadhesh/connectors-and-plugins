# Nested Accordion Structures

## Table of Contents

- [Overview](#overview)
- [Nesting Fundamentals](#nesting-fundamentals)
- [DOM Structure](#dom-structure)
- [Content Element References](#content-element-references)
- [Nested Data Binding](#nested-data-binding)
- [Multi-Level Patterns](#multi-level-patterns)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)

---

## Overview

Nested accordions enable hierarchical content organization where accordion items contain other accordions. Common use cases include:

- **Documentation**: Book → Chapter → Section → Subsection
- **Product Catalogs**: Category → Subcategory → Product Details
- **Organization Charts**: Department → Team → Employee
- **Taxonomies**: Domain → Phylum → Class → Order → Species
- **Course Content**: Course → Module → Lesson → Topic

Nesting creates intuitive navigation experiences for multi-level hierarchical data.

---

## Nesting Fundamentals

### Basic Nested Structure

The recommended approach for nested accordions is to define the nested accordion separately and reference it by ID using the `content` property:

```cshtml
<!-- Define nested accordion (hidden) -->
<div style="display: none">
    <ejs-accordion id="nestedBooks">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem header="Fiction" content="Classic novels and contemporary fiction"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Non-Fiction" content="History, science, biography and more"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Biography" content="Life stories and memoirs"></e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>

<!-- Parent accordion references nested accordion by ID -->
<ejs-accordion id="parentAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Books" content="#nestedBooks"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Magazines" content="Magazine content here"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Journals" content="Journal articles and research"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

**Key Pattern**: The `content='#nestedBooks'` property references the nested accordion by its ID. The nested accordion definition is hidden with `display: none` and displayed dynamically when the parent item is expanded.

### Multi-Level Nesting

For deeper hierarchies (3+ levels), define each level as a separate accordion and link them using the `content` property:

```cshtml
<!-- Level 3 Accordions (Regions) -->
<div style="display: none">
    <ejs-accordion id="northRegion">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem header="Branch 1" content="Northeast branch office"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Branch 2" content="Northwest branch office"></e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>

<div style="display: none">
    <ejs-accordion id="southRegion">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem header="Branch 3" content="Southeast branch office"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Branch 4" content="Southwest branch office"></e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>

<!-- Level 2 Accordions (Departments) -->
<div style="display: none">
    <ejs-accordion id="salesDept">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem header="North Region" content="#northRegion"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="South Region" content="#southRegion"></e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>

<!-- Level 1 - Main Accordion -->
<ejs-accordion id="orgChart">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Sales Department" content="#salesDept"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Marketing Department" content="Marketing team details"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

**Multi-Level Pattern**: Each level references the next level by ID. Level 3 accordions reference individual content, Level 2 accordions reference Level 3 accordions, and Level 1 references Level 2 accordions.

---

## DOM Structure

### Rendered Element Hierarchy

When the Accordion renders, it creates a specific DOM structure:

```html
<div id="accordion" class="e-accordion">
    <!-- Parent container -->
    <div class="e-acrdn-item">
        <!-- Item 1 -->
        <div class="e-acrdn-header e-active">
            <!-- Header is clickable -->
            Item 1 Header
        </div>
        <div class="e-acrdn-panel">
            <!-- Content panel - contains nested accordion -->
            <div id="nestedAccordion" class="e-accordion">
                <!-- Nested accordion renders here -->
                <div class="e-acrdn-item">
                    <div class="e-acrdn-header">
                        Nested Item Header
                    </div>
                    <div class="e-acrdn-panel">
                        Nested Item Content
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### CSS Class Reference

| Class | Purpose |
|-------|---------|
| `.e-accordion` | Main accordion container |
| `.e-acrdn-item` | Single accordion item |
| `.e-acrdn-header` | Header (clickable area) |
| `.e-acrdn-header.e-active` | Active/expanded header |
| `.e-acrdn-panel` | Content panel |
| `.e-acrdn-panel.e-open` | Expanded panel |

---

## Content Element References

### Using ID References

The `content` property accepts ID selectors to reference nested accordions or content elements:

```cshtml
<!-- Define nested accordion (hidden until referenced) -->
<div style="display: none">
    <ejs-accordion id="mediaLibrary">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem header="Video Files" content="MP4, WebM, OGG formats"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Audio Files" content="MP3, WAV, FLAC formats"></e-accordion-accordionitem>
            <e-accordion-accordionitem header="Image Files" content="JPG, PNG, SVG formats"></e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>

<!-- Define content templates -->
<div id="contentFiction" style="display: none;">
    <h4>Fiction Books</h4>
    <ul>
        <li>Novel 1 - Science Fiction</li>
        <li>Novel 2 - Fantasy Adventure</li>
        <li>Novel 3 - Mystery Thriller</li>
    </ul>
</div>

<div id="contentScience" style="display: none;">
    <h4>Science Books</h4>
    <ul>
        <li>Physics Fundamentals</li>
        <li>Chemistry Basics</li>
        <li>Biology Essentials</li>
    </ul>
</div>

<!-- Accordion references nested accordion and content elements by ID -->
<ejs-accordion id="library" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Fiction" content="#contentFiction"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Science" content="#contentScience"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Media Files" content="#mediaLibrary"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

**Benefits of ID References**:
- Content is defined once and reused across multiple items
- Cleaner markup with better separation of concerns
- Hidden content is revealed when accordion item is expanded
- Works with both plain HTML content and nested accordion components

### Lazy Loading Nested Content

Load nested accordion content only when parent item expands:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    var parentAccordion = document.getElementById('parent').ej2_instances[0];
    var loadedNested = {};
    
    parentAccordion.expanding = function(args) {
        if (args.isExpanding && !loadedNested[args.index]) {
            var panel = args.item.querySelector('.e-acrdn-panel');
            
            // Fetch nested accordion configuration
            fetch(`/api/nested-accordion/${args.index}`)
                .then(r => r.json())
                .then(config => {
                    // Create nested accordion dynamically
                    var nestedDiv = document.createElement('div');
                    nestedDiv.id = `nested-${args.index}`;
                    panel.appendChild(nestedDiv);
                    
                    // Initialize nested accordion
                    new ej.navigations.Accordion(config, nestedDiv);
                    loadedNested[args.index] = true;
                });
        }
    };
});
```

---

## Nested Data Binding

### Hierarchical Data Structure

Structure data with nested arrays:

```csharp
public class Category
{
    public string Name { get; set; }
    public List<SubCategory> SubCategories { get; set; }
}

public class SubCategory
{
    public string Name { get; set; }
    public List<Product> Products { get; set; }
}

public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}

// Controller
public IActionResult GetCatalog()
{
    var categories = new List<Category>
    {
        new Category 
        { 
            Name = "Electronics",
            SubCategories = new List<SubCategory>
            {
                new SubCategory
                {
                    Name = "Computers",
                    Products = new List<Product>
                    {
                        new Product { Name = "Laptop", Price = 999.99m },
                        new Product { Name = "Desktop", Price = 699.99m }
                    }
                }
            }
        }
    };
    
    return Json(categories);
}
```

### Dynamic Nested Accordion Generation

Generate nested accordions from hierarchical data by creating each level separately and referencing by ID:

```cshtml
@{
    var data = ViewBag.Categories as List<Category>;
}

<!-- Generate Level 2 Accordions (SubCategories) -->
@foreach (var category in data)
{
    <div style="display: none">
        <ejs-accordion id="subcat_@category.Name.Replace(" ", "_")">
            <e-accordion-accordionitems>
                @foreach (var subcat in category.SubCategories)
                {
                    <e-accordion-accordionitem header="@subcat.Name">
                        <ul>
                            @foreach (var product in subcat.Products)
                            {
                                <li>@product.Name - $@product.Price</li>
                            }
                        </ul>
                    </e-accordion-accordionitem>
                }
            </e-accordion-accordionitems>
        </ejs-accordion>
    </div>
}

<!-- Level 1 - Main Catalog Accordion -->
<ejs-accordion id="catalog">
    <e-accordion-accordionitems>
        @foreach (var category in data)
        {
            <e-accordion-accordionitem 
                header="@category.Name" 
                content="#subcat_@category.Name.Replace(" ", "_")">
            </e-accordion-accordionitem>
        }
    </e-accordion-accordionitems>
</ejs-accordion>
```

**Dynamic Generation Pattern**:
1. Generate all nested accordion definitions in hidden divs
2. Generate main accordion items with ID references to nested accordions
3. Each nested accordion ID is unique (based on category name)
4. The main accordion references these by ID using the `content` property

---

## Multi-Level Patterns

### Breadcrumb Navigation with Nested Accordions

Track user navigation through nested levels:

```javascript
class NestedAccordionTracker {
    constructor(parentSelector) {
        this.path = [];
        this.parentSelector = parentSelector;
    }
    
    trackExpansion(level, itemIndex, itemName) {
        // Trim path to current level
        this.path = this.path.slice(0, level);
        
        // Add new navigation point
        this.path.push({
            level: level,
            index: itemIndex,
            name: itemName
        });
        
        this.updateBreadcrumb();
    }
    
    updateBreadcrumb() {
        const breadcrumb = this.path
            .map(p => p.name)
            .join(' > ');
        console.log('Navigation path:', breadcrumb);
    }
    
    getCurrentPath() {
        return this.path;
    }
}

// Usage
var tracker = new NestedAccordionTracker('#accordion');

document.addEventListener('DOMContentLoaded', function() {
    var accordion = document.getElementById('level1').ej2_instances[0];
    
    accordion.expanding = function(args) {
        if (args.isExpanding) {
            tracker.trackExpansion(1, args.index, args.item.innerText);
        }
    };
});
```

### Synchronized Nested Accordions

Keep multiple nested levels in synchronized state:

```javascript
class SynchronizedNesting {
    constructor(parentId, nestedSelector) {
        this.parent = document.getElementById(parentId).ej2_instances[0];
        this.nestedAccordions = [];
        this.initializeNested(nestedSelector);
    }
    
    initializeNested(selector) {
        document.querySelectorAll(selector).forEach(elem => {
            if (elem.ej2_instances && elem.ej2_instances[0]) {
                this.nestedAccordions.push(elem.ej2_instances[0]);
            }
        });
        
        this.attachSyncHandlers();
    }
    
    attachSyncHandlers() {
        // Parent expansion affects nested accordions
        this.parent.expanding = (args) => {
            if (args.isExpanding) {
                // Collapse all nested accordions when parent item expands
                this.nestedAccordions.forEach(nested => {
                    nested.expandedIndices = [];
                });
            }
        };
        
        // Nested expansion can trigger parent updates
        this.nestedAccordions.forEach((nested, idx) => {
            nested.expanding = (args) => {
                console.log(`Level 2 accordion ${idx} expanding`);
            };
        });
    }
}

// Usage
var sync = new SynchronizedNesting('parent', '.nested-accordion');
```

### Expand All / Collapse All at Level

Control expansion at specific nesting levels:

```javascript
class LevelExpansionControl {
    constructor(accordionId) {
        this.accordion = document.getElementById(accordionId).ej2_instances[0];
    }
    
    expandAllNestedAt(level) {
        if (level === 0) {
            // Expand all items at current level
            var allIndices = this.accordion.items.map((_, idx) => idx);
            this.accordion.expandItem(true, allIndices);
        } else {
            // Expand nested accordions
            this.accordion.items.forEach(item => {
                var nested = item.querySelector('.e-accordion');
                if (nested && nested.ej2_instances) {
                    nested.ej2_instances[0].expandItem(true);
                }
            });
        }
    }
    
    collapseAllNestedAt(level) {
        if (level === 0) {
            this.accordion.expandItem(false);
        } else {
            this.accordion.items.forEach(item => {
                var nested = item.querySelector('.e-accordion');
                if (nested && nested.ej2_instances) {
                    nested.ej2_instances[0].expandItem(false);
                }
            });
        }
    }
}

// Usage
var control = new LevelExpansionControl('parent');
control.expandAllNestedAt(1);  // Expand all level 2 accordions
```

---

## Performance Considerations

### Large Nested Structures

**Problem**: Rendering many nested accordions can cause performance degradation.

**Solutions**:

1. **Lazy Load Content**:
```javascript
function expanding(args) {
    if (args.isExpanding && !args.item.hasAttribute('data-loaded')) {
        // Load content asynchronously
        loadContentAsync(args.index).then(content => {
            args.item.querySelector('.e-acrdn-panel').innerHTML = content;
            args.item.setAttribute('data-loaded', 'true');
        });
    }
}
```

2. **Virtualization** (Limit rendered items):
```javascript
var visibleNested = [];
var accordion = document.getElementById('parent').ej2_instances[0];

function expanding(args) {
    if (args.isExpanding) {
        // Render only visible nested accordions
        if (visibleNested.includes(args.index)) {
            renderNestedAccordion(args.index);
        }
    } else {
        // Destroy nested accordion to free memory
        destroyNestedAccordion(args.index);
    }
};
```

3. **Limit Nesting Depth**:
- Recommend max 3-4 levels of nesting
- Beyond that, consider alternative UI patterns
- Each level adds computational overhead

---

## Troubleshooting

### Nested Accordion Not Rendering

**Problem**: Nested accordion appears but doesn't initialize.

**Solutions**:
1. Ensure nested accordion has unique ID
2. Verify TagHelper namespace is registered in _ViewImports.cshtml
3. Check that child accordion is within parent's content panel
4. Verify all required scripts are loaded (ej2.min.js, ej2-navigations.min.js)

### Parent/Nested Event Conflicts

**Problem**: Events fire unexpectedly when expanding parent/nested items.

**Solutions**:
1. Stop event propagation: `event.stopPropagation()`
2. Check event handlers aren't attached to both parent and nested
3. Use specific selectors to target correct accordion instance

### Content Not Visible

**Problem**: Nested accordion content doesn't show when expanded.

**Solutions**:
1. Check if content element has display:none from CSS
2. Verify panel height is set correctly
3. Check z-index if content appears behind other elements
4. Ensure content is properly appended to panel div

### Memory Leaks with Dynamic Nesting

**Problem**: Application uses increasing memory with dynamic nested accordions.

**Solutions**:
1. Properly destroy nested accordions when parent collapses
2. Remove event listeners when destroying
3. Clear large data structures from memory
4. Use WeakMap for accordion references if appropriate

---

## Summary

Nested accordions enable sophisticated multi-level content hierarchies:

- **Basic Nesting**: Place accordions within content panels
- **Multi-Level**: Stack multiple accordion levels for deep hierarchies
- **Dynamic Generation**: Create nested structures from hierarchical data
- **Content References**: Reference reusable content elements by ID
- **Synchronization**: Keep nested levels coordinated
- **Performance**: Use lazy loading and virtualization for large datasets
- **Breadcrumbs**: Track user navigation through nested levels

Implement nested accordions to create intuitive navigation for complex, hierarchical information architectures in your applications.
