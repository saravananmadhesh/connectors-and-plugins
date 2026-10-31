# Data Binding in Accordion

## Table of Contents

- [Overview](#overview)
- [Static Item Binding](#static-item-binding)
- [Dynamic Data Binding](#dynamic-data-binding)
- [OData Service Integration](#odata-service-integration)
- [DataManager Configuration](#datamanager-configuration)
- [Property Mapping](#property-mapping)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

---

## Overview

Data binding is a powerful feature that allows you to populate accordion items from various data sources dynamically. Instead of hardcoding accordion items in markup, you can bind accordion items to:

- **Static arrays of objects** defined in your code-behind
- **Database queries** executed on the server
- **OData services** that return JSON data
- **Custom API endpoints** that provide accordion item data
- **DataManager** component with advanced query capabilities

Data binding enables you to:
- Generate accordion items from any data source
- Automatically map data properties to accordion properties
- Reduce markup by using templates and data binding
- Build dynamic accordion structures based on database content
- Handle large datasets efficiently

The core mechanism of data binding is mapping data source fields to accordion item properties through the `header` and `content` properties.

---

## Static Item Binding

### Direct Array Binding

The simplest form of data binding is to create a list of objects in your code-behind and bind directly to the accordion:

#### Controller Code

```csharp
public class AccordionController : Controller
{
    public IActionResult Index()
    {
        // Create a static list of accordion items
        List<AccordionData> accordionItems = new List<AccordionData>
        {
            new AccordionData 
            { 
                Title = "ASP.NET", 
                Details = "Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services." 
            },
            new AccordionData 
            { 
                Title = "ASP.NET MVC", 
                Details = "The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller." 
            },
            new AccordionData 
            { 
                Title = "JavaScript", 
                Details = "JavaScript (JS) is an interpreted computer programming language originally implemented as part of web browsers." 
            }
        };
        
        return View(accordionItems);
    }
}

public class AccordionData
{
    public string Title { get; set; }
    public string Details { get; set; }
}
```

#### Razor View

```cshtml
@model List<AccordionData>

<ejs-accordion id="staticAccordion">
    <e-accordion-accordionitems>
        @foreach(var item in Model)
        {
            <e-accordion-accordionitem header="@item.Title" content="@item.Details"></e-accordion-accordionitem>
        }
    </e-accordion-accordionitems>
</ejs-accordion>
```

### How This Works

1. The controller creates a `List<AccordionData>` with data
2. The list is passed to the view via the Model
3. The Razor loop iterates through each item
4. For each item, an `<e-accordion-accordionitem>` TagHelper is created
5. The `@item.Title` and `@item.Details` properties are bound to the header and content

### Advantages

- Simple and straightforward for small datasets
- No additional configuration required
- Works directly with C# objects
- Easy to debug and understand
- Suitable when data is already in memory

### Limitations

- Not suitable for large datasets
- Requires server-side rendering for every item
- Less efficient than dynamic loading
- Markup grows with item count

---

## Dynamic Data Binding

### DataSource Property Binding

For more dynamic scenarios, bind the accordion directly to a DataSource property:

#### Controller Code

```csharp
public class AccordionController : Controller
{
    public IActionResult GetAccordionData()
    {
        var items = new List<dynamic>
        {
            new { Header = "Product Features", Content = "Explore all features and capabilities..." },
            new { Header = "Pricing Plans", Content = "Flexible pricing options for every budget..." },
            new { Header = "Customer Support", Content = "24/7 support team ready to help..." }
        };
        
        return Json(items);
    }
    
    public IActionResult Index()
    {
        return View();
    }
}
```

#### Razor View with JavaScript

```cshtml
<ejs-accordion id="dynamicAccordion">
    <!-- Empty items; will be populated via dataSource -->
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Get reference to accordion instance
        var accordion = document.getElementById('dynamicAccordion').ej2_instances[0];
        
        // Fetch data from controller
        fetch('/Accordion/GetAccordionData')
            .then(response => response.json())
            .then(data => {
                // Set dataSource on accordion
                accordion.dataSource = data;
                // Refresh to render items
                accordion.dataBind();
            });
    });
</script>
```

### Benefits of Dynamic Binding

- Load data asynchronously after page load
- Update accordion content without page refresh
- Handle large datasets more efficiently
- Real-time data synchronization
- Better separation of concerns

---

## OData Service Integration

### OData with DataManager

The Accordion supports binding to OData services through the DataManager. This is useful for consuming remote APIs:

#### Controller (provides OData endpoint)

```csharp
public class FAQController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public FAQController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    // OData endpoint that returns FAQ items
    [HttpGet("odata/faqs")]
    public IActionResult GetFAQs()
    {
        var faqs = _context.FAQs.Select(f => new {
            Header = f.Question,
            Content = f.Answer
        }).ToList();
        
        return Ok(faqs);
    }
}
```

#### View with OData Binding

```cshtml
<ejs-accordion id="odataAccordion">
    <!-- Items populated from OData service -->
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('odataAccordion').ej2_instances[0];
        
        // Create DataManager instance pointing to OData service
        var dataManager = new ej.data.DataManager({
            url: '/api/faqs',
            adaptor: new ej.data.ODataAdaptor()
        });
        
        // Create query to fetch data
        var query = ej.data.Query().select(['Header', 'Content']);
        
        // Execute query and bind results
        dataManager.executeQuery(query).done(function(e) {
            accordion.dataSource = e.result;
            accordion.dataBind();
        });
    });
</script>
```

### OData Advantages

- Access remote data without page reload
- Server-side filtering and sorting
- Standard protocol for data APIs
- Works with various backend services
- Scalable for large datasets

---

## DataManager Configuration

### Advanced DataManager Setup

DataManager provides powerful querying capabilities:

```cshtml
<ejs-accordion id="advancedAccordion">
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('advancedAccordion').ej2_instances[0];
        
        // Configure DataManager with URL
        var dataManager = new ej.data.DataManager({
            url: '/api/accordion-items',
            adaptor: new ej.data.ODataV4Adaptor(),
            crossDomain: true
        });
        
        // Build a query with filtering and sorting
        var query = ej.data.Query()
            .select(['Title', 'Description', 'Category'])
            .where('Category', 'equal', 'Help')
            .sortBy('Title');
        
        // Execute the query
        dataManager.executeQuery(query)
            .done(function(e) {
                // Map response to accordion items
                var accordionItems = e.result.map(item => ({
                    Header: item.Title,
                    Content: item.Description
                }));
                
                accordion.dataSource = accordionItems;
                accordion.dataBind();
            })
            .fail(function(error) {
                console.error('Error loading accordion data:', error);
            });
    });
</script>
```

### DataManager Features

- **URL Configuration**: Point to any API endpoint
- **Adaptor Types**: Support for OData, ODataV4, WebAPI, RESTful, and custom adaptors
- **Querying**: Filter, sort, and select specific fields
- **Cross-Domain**: Make requests to different domains
- **Error Handling**: Catch and handle request failures

---

## Property Mapping

### Custom Property Names

When your data source uses different property names than the accordion expects, use property mapping:

#### Data Structure Example

```csharp
public class ProductSpec
{
    public int SpecId { get; set; }
    public string SpecName { get; set; }        // Maps to Header
    public string SpecValue { get; set; }       // Maps to Content
    public bool IsActive { get; set; }
}
```

#### Mapping in View

```cshtml
<ejs-accordion id="mappedAccordion">
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('mappedAccordion').ej2_instances[0];
        
        // Fetch product specifications
        fetch('/api/product-specs')
            .then(response => response.json())
            .then(data => {
                // Map incoming data to accordion item structure
                var mappedItems = data.map(spec => ({
                    Header: spec.SpecName,          // SpecName → Header
                    Content: spec.SpecValue,        // SpecValue → Content
                    Disabled: !spec.IsActive        // IsActive → Disabled (inverted)
                }));
                
                accordion.dataSource = mappedItems;
                accordion.dataBind();
            });
    });
</script>
```

### Key Mapping Rules

1. **Header Property**: Maps to item header text; can come from any data field
2. **Content Property**: Maps to item content; can come from any data field
3. **Disabled Property**: Controls if item is clickable
4. **Expanded Property**: Sets initial expanded state
5. **CssClass Property**: Applies CSS classes to items
6. **IconCss Property**: Adds icons to headers

---

## Practical Examples

### Example 1: FAQ from Database

```csharp
// Controller
public class FAQController : Controller
{
    private readonly ApplicationDbContext _db;
    
    public FAQController(ApplicationDbContext db) { _db = db; }
    
    public IActionResult GetFAQs()
    {
        var faqs = _db.FAQs
            .Where(f => f.Published)
            .OrderBy(f => f.DisplayOrder)
            .Select(f => new
            {
                Header = f.Question,
                Content = f.Answer,
                IconCss = "e-icons e-help-center"
            })
            .ToList();
        
        return Json(faqs);
    }
}
```

```cshtml
<!-- View -->
<ejs-accordion id="faqAccordion" expandMode="Multiple">
</ejs-accordion>

<script>
    fetch('/FAQ/GetFAQs')
        .then(r => r.json())
        .then(faqs => {
            var accordion = document.getElementById('faqAccordion').ej2_instances[0];
            accordion.dataSource = faqs;
            accordion.dataBind();
        });
</script>
```

### Example 2: Documentation Chapters

```csharp
// Controller returning documentation chapters
public IActionResult GetDocumentationChapters(int bookId)
{
    var chapters = _db.Chapters
        .Where(c => c.BookId == bookId)
        .Select(c => new
        {
            Header = $"{c.ChapterNumber}. {c.Title}",
            Content = c.HtmlContent,
            Expanded = c.IsFeatured
        })
        .ToList();
    
    return Json(chapters);
}
```

### Example 3: Dynamic Product Features

```csharp
// API endpoint for product features
public IActionResult GetProductFeatures(int productId)
{
    var features = _productService.GetFeatures(productId)
        .Select(f => new
        {
            Header = f.FeatureName,
            Content = RenderFeatureDescription(f),
            IconCss = f.IconClass,
            CssClass = f.PremiumFeature ? "premium-feature" : ""
        })
        .ToList();
    
    return Json(features);
}
```

---

## Best Practices

### 1. Error Handling

Always implement error handling for data binding:

```javascript
accordion.dataSource = null;
dataManager.executeQuery(query)
    .done(function(e) {
        accordion.dataSource = e.result;
        accordion.dataBind();
    })
    .fail(function(error) {
        accordion.dataSource = [{
            Header: "Error Loading Data",
            Content: "Please try again later.",
            Disabled: true
        }];
        accordion.dataBind();
    });
```

### 2. Large Datasets

For large datasets, implement server-side paging:

```javascript
var query = ej.data.Query()
    .select(['Header', 'Content'])
    .skip(0)              // Skip first N items
    .take(25);            // Take 25 items per page

dataManager.executeQuery(query)
    .done(function(e) {
        accordion.dataSource = e.result;
    });
```

### 3. Performance Optimization

- Load data asynchronously after page render
- Use DataManager querying for server-side filtering
- Implement pagination for large datasets
- Cache frequently accessed data
- Minimize HTML content in items

### 4. Data Validation

Ensure data integrity:

```javascript
var validItems = data.filter(item => 
    item.Header && item.Header.trim().length > 0 &&
    item.Content && item.Content.trim().length > 0
);

accordion.dataSource = validItems;
accordion.dataBind();
```

### 5. Real-Time Updates

Refresh accordion when source data changes:

```javascript
// Periodically refresh accordion data
setInterval(function() {
    refreshAccordionData();
}, 5000); // Refresh every 5 seconds

function refreshAccordionData() {
    fetch('/api/accordion-items')
        .then(r => r.json())
        .then(data => {
            var accordion = document.getElementById('accordion').ej2_instances[0];
            accordion.dataSource = data;
            accordion.dataBind();
        });
}
```

---

## Summary

Data binding transforms static accordion markup into dynamic, data-driven components:

- **Static Binding**: Use for small, predefined datasets with server-side rendering
- **Dynamic Binding**: Load data asynchronously after page load
- **OData/DataManager**: Integrate with remote APIs and implement advanced querying
- **Property Mapping**: Transform data structures to match accordion requirements
- **Error Handling**: Always handle failures in data loading
- **Performance**: Optimize for large datasets with pagination and efficient queries

Choose the binding approach that best matches your data source and use case requirements.
