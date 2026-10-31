# Advanced Content Loading Strategies

## Table of Contents

- [Overview](#overview)
- [Static Content](#static-content)
- [Loading from Partial Views](#loading-from-partial-views)
- [Lazy Loading Content](#lazy-loading-content)
- [Dynamic Content Rendering](#dynamic-content-rendering)
- [POST-Based Content Loading](#post-based-content-loading)
- [Performance Considerations](#performance-considerations)
- [Practical Implementation](#practical-implementation)

---

## Overview

The Accordion component supports multiple strategies for loading and displaying content in accordion items. Content can be:

- **Static text**: Defined directly in the markup or data source
- **HTML elements**: Referenced by ID and displayed in accordion panels
- **Partial views**: Server-rendered HTML fragments
- **Lazy loaded**: Fetched only when items are expanded
- **Dynamic**: Generated or fetched after initial page load

Choosing the right content loading strategy depends on your data volume, performance requirements, and user experience goals. This guide covers all available approaches and when to use each.

---

## Static Content

### Direct Text Content

The simplest content loading approach is to define content directly in accordion item declarations:

```cshtml
<ejs-accordion id="staticAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Installation" 
            content="Download the package and follow the installation wizard. The process typically takes 2-3 minutes.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Configuration" 
            content="Configure settings in the preferences panel. Most users can use the default configuration.">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

### HTML Element Content

Reference existing HTML elements by ID instead of duplicating content:

```cshtml
<ejs-accordion id="htmlRefAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Getting Started" content="#gettingStartedContent"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Features" content="#featuresContent"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<!-- Referenced HTML elements -->
<div id="gettingStartedContent" style="display:none;">
    <h4>Getting Started Guide</h4>
    <p>Follow these steps to get started...</p>
    <ol>
        <li>Install the package</li>
        <li>Configure settings</li>
        <li>Run the application</li>
    </ol>
</div>

<div id="featuresContent" style="display:none;">
    <h4>Key Features</h4>
    <ul>
        <li>Feature 1: Description</li>
        <li>Feature 2: Description</li>
    </ul>
</div>
```

### When to Use Static Content

- Small, predefined content that doesn't change
- Testing accordion functionality
- Simple FAQ sections
- Documentation that's infrequently updated
- Content that fits entirely within the initial page load

---

## Loading from Partial Views

### Rendering Partial Views as Content

ASP.NET Core partial views provide a way to encapsulate reusable HTML content. You can render partial views and include them in accordion items:

#### Main View

```cshtml
<ejs-accordion id="partialAccordion" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="User Profile">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Settings">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Preferences">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

@* Render partial views with unique IDs *@
<div id="userProfileContent" style="display:none;">
    @Html.Partial("_UserProfilePartial", Model.UserData)
</div>

<div id="settingsContent" style="display:none;">
    @Html.Partial("_SettingsPartial", Model.Settings)
</div>

<div id="preferencesContent" style="display:none;">
    @Html.Partial("_PreferencesPartial", Model.UserPreferences)
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('partialAccordion').ej2_instances[0];
        
        // Map items to partial view content by ID
        accordion.items[0].content = '#userProfileContent';
        accordion.items[1].content = '#settingsContent';
        accordion.items[2].content = '#preferencesContent';
        
        accordion.refresh();
    });
</script>
```

#### Partial View: `_UserProfilePartial.cshtml`

```cshtml
@model UserData

<div class="user-profile">
    <img src="@Model.AvatarUrl" alt="@Model.Name" class="user-avatar" />
    <h4>@Model.Name</h4>
    <p>Email: @Model.Email</p>
    <p>Joined: @Model.JoinDate.ToShortDateString()</p>
    <p>@Html.Raw(Model.Bio)</p>
</div>
```

### Advantages of Partial Views

- Encapsulate complex content structure
- Reuse content across multiple pages
- Leverage Razor templating
- Type-safe model binding
- Server-side data transformation
- Clean separation of concerns

### Performance Impact

- Content is rendered at initial page load
- Increases initial page size if content is large
- Use with lazy loading (next section) to load on-demand

---

## Lazy Loading Content

### On-Demand Content Fetching

Lazy loading fetches content only when accordion items are expanded, reducing initial page load time. Implement this by responding to the `expanding` event:

#### View with Lazy Loading

```cshtml
<ejs-accordion id="lazyAccordion" expandMode="Multiple" expanding="expanding">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Documentation">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Examples">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="API Reference">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('lazyAccordion').ej2_instances[0];
        var loadedItems = {}; // Track which items have been loaded
        
       function expanding(args) {
            if (args.isExpanding) {
                var itemIndex = accordion.items.indexOf(args.item);
                
                // Load content only if not already loaded
                if (!loadedItems[itemIndex]) {
                    loadItemContent(itemIndex);
                }
            }
        }
        
        function loadItemContent(index) {
            var contentEndpoint = [
                '/Content/GetDocumentation',
                '/Content/GetExamples',
                '/Content/GetAPIReference'
            ][index];
            
            // Fetch content from server
            fetch(contentEndpoint)
                .then(response => response.text())
                .then(html => {
                    // Update accordion item with fetched content
                    accordion.items[index].content = html;
                    accordion.refresh();
                    loadedItems[index] = true;
                })
                .catch(error => {
                    accordion.items[index].content = `<p>Error loading content: ${error}</p>`;
                    accordion.refresh();
                });
        }
    });
</script>
```

#### Controller Methods

```csharp
public class ContentController : Controller
{
    public IActionResult GetDocumentation()
    {
        // Generate or retrieve documentation HTML
        var html = @"
            <h3>Documentation</h3>
            <p>Comprehensive guide to using the Accordion component...</p>
            <!-- More documentation content -->
        ";
        return Content(html, "text/html");
    }
    
    public IActionResult GetExamples()
    {
        // Return examples HTML
        var html = @"
            <h3>Code Examples</h3>
            <pre><code>// Example code</code></pre>
        ";
        return Content(html, "text/html");
    }
    
    public IActionResult GetAPIReference()
    {
        // Return API reference HTML
        var html = @"
            <h3>API Reference</h3>
            <table><!-- API table --></table>
        ";
        return Content(html, "text/html");
    }
}
```

### Lazy Loading Benefits

- **Reduced Initial Load**: Only content for expanded items is fetched
- **Improved Performance**: Faster page rendering and responsiveness
- **Scalability**: Efficient with large datasets and many items
- **User-Driven Loading**: Content loads only when user needs it
- **Bandwidth Savings**: Unused content is never downloaded

### Implementation Patterns

```javascript
// Pattern 1: Track loaded items
var loadedItems = new Set();

function expanding(args) {
    if (args.isExpanding && !loadedItems.has(args.item.id)) {
        loadContent(args.item.id);
        loadedItems.add(args.item.id);
    }
}

// Pattern 2: Loading indicator
function expanding(args) {
    if (args.isExpanding && !args.item.content) {
        args.item.content = '<p class="loading">Loading...</p>';
        accordion.refresh();
        loadContent(args.item.id);
    }
}

// Pattern 3: Concurrent requests with queue
var contentQueue = [];
var isLoading = false;

function queueLoad(itemId) {
    contentQueue.push(itemId);
    processQueue();
}

function processQueue() {
    if (isLoading || contentQueue.length === 0) return;
    
    isLoading = true;
    var itemId = contentQueue.shift();
    loadContent(itemId).then(() => {
        isLoading = false;
        processQueue();
    });
}
```

---

## Dynamic Content Rendering

### Generating Content in Real-Time

Generate accordion content dynamically based on user actions, filters, or real-time data:

```cshtml
<ejs-accordion id="dynamicAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Current Status">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Activity Log">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Performance Metrics">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('dynamicAccordion').ej2_instances[0];
        
        // Refresh status every 5 seconds
        setInterval(function() {
            updateAccordionContent();
        }, 5000);
        
        function updateAccordionContent() {
            // Fetch current status
            fetch('/api/system-status')
                .then(r => r.json())
                .then(data => {
                    // Generate HTML dynamically
                    var statusHtml = `
                        <div class="status">
                            <p>CPU: ${data.cpuUsage}%</p>
                            <p>Memory: ${data.memoryUsage}%</p>
                            <p>Status: <span class="status-${data.status}">${data.status}</span></p>
                        </div>
                    `;
                    
                    accordion.items[0].content = statusHtml;
                    accordion.refresh();
                });
        }
        
        updateAccordionContent(); // Initial load
    });
</script>
```

### Real-Time Updates

For live-updating content, refresh specific items without reloading entire accordion:

```javascript
// Update single item content
function updateItemContent(itemIndex, newContent) {
    var accordion = document.getElementById('accordion').ej2_instances[0];
    accordion.items[itemIndex].content = newContent;
    accordion.refresh();
}

// WebSocket-based real-time updates
var socket = new WebSocket('ws://server/accordion-updates');
socket.onmessage = function(event) {
    var update = JSON.parse(event.data);
    updateItemContent(update.itemIndex, update.content);
};
```

---

## POST-Based Content Loading

### Submitting Data and Loading Response

Sometimes accordion content should be generated based on form submissions or POST requests:

#### View with Form-Based Loading

```cshtml
<form id="contentForm">
    <input type="text" id="searchTerm" placeholder="Search..." />
    <button type="submit">Search</button>
</form>

<ejs-accordion id="resultAccordion" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Search Results">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Related Topics">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    document.getElementById('contentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var searchTerm = document.getElementById('searchTerm').value;
        
        // POST request to server
        fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchTerm })
        })
        .then(response => response.json())
        .then(data => {
            var accordion = document.getElementById('resultAccordion').ej2_instances[0];
            
            // Update first item with search results
            accordion.items[0].content = generateResultsHtml(data.results);
            
            // Update second item with related topics
            accordion.items[1].content = generateRelatedHtml(data.related);
            
            accordion.refresh();
            accordion.expandItem(true, 0); // Expand first item
        });
    });
    
    function generateResultsHtml(results) {
        return results.map(r => `<p><a href="${r.url}">${r.title}</a></p>`).join('');
    }
    
    function generateRelatedHtml(related) {
        return related.map(r => `<p>${r}</p>`).join('');
    }
</script>
```

#### Server-Side Handler

```csharp
[HttpPost("/api/search")]
public IActionResult Search([FromBody] SearchRequest request)
{
    var results = _searchService.Search(request.Query);
    var related = _searchService.GetRelatedTopics(request.Query);
    
    return Json(new {
        results = results.Select(r => new {
            title = r.Title,
            url = r.Url,
            snippet = r.Snippet
        }),
        related = related
    });
}

public class SearchRequest
{
    public string Query { get; set; }
}
```

---

## Performance Considerations

### Optimization Strategies

#### 1. Content Caching

```javascript
var contentCache = {};

function loadContent(itemId) {
    if (contentCache[itemId]) {
        return Promise.resolve(contentCache[itemId]);
    }
    
    return fetch(`/api/content/${itemId}`)
        .then(r => r.text())
        .then(html => {
            contentCache[itemId] = html;
            return html;
        });
}
```

#### 2. Debounce Requests

```javascript
var loadTimeout;

function expanding(args) {
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(() => {
        if (args.isExpanding && !args.item.contentLoaded) {
            loadContent(args.item.id);
        }
    }, 200);
}
```

#### 3. Parallel Loading

```javascript
var promises = [];

itemsToLoad.forEach(item => {
    promises.push(loadContent(item.id));
});

Promise.all(promises).then(() => {
    accordion.refresh();
});
```

#### 4. Content Size Optimization

- Minimize HTML in each item
- Use compression for content
- Load only visible items (virtualization for very large lists)
- Serve images/assets externally

---

## Practical Implementation

### Complete Example: Multi-Source Content Loading

```cshtml
<ejs-accordion id="completeAccordion" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Static Content" content="This is static content."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Dynamic Content"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Lazy Loaded"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('completeAccordion').ej2_instances[0];
        var loadedItems = {};
        
        // Second item: generate dynamic content on expand
        accordion.items[1].content = generateDynamicContent();
        
        // Third item: lazy load on expand
        function expanding(args) {
            if (args.isExpanding && accordion.items[2] === args.item && !loadedItems[2]) {
                loadLazyContent(2);
                loadedItems[2] = true;
            }
        }
        
        accordion.refresh();
    });
    
    function generateDynamicContent() {
        var timestamp = new Date().toLocaleString();
        return `<p>Generated at: ${timestamp}</p>`;
    }
    
    function loadLazyContent(index) {
        fetch('/api/lazy-content')
            .then(r => r.text())
            .then(html => {
                var accordion = document.getElementById('completeAccordion').ej2_instances[0];
                accordion.items[index].content = html;
                accordion.refresh();
            });
    }
</script>
```

---

## Summary

Choose your content loading strategy based on:

- **Static Content**: Small, predefined content
- **Partial Views**: Complex, reusable content structures
- **Lazy Loading**: Large datasets or performance-critical pages
- **Dynamic Content**: Real-time or frequently changing information
- **POST-Based**: Content generated from user input or filters

Combining strategies (static headers with lazy-loaded content, for example) provides optimal performance and user experience.
