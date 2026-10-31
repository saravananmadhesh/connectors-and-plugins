# Pane Content

## Table of Contents
- [HTML Markup Content](#html-markup-content)
- [Syncfusion Controls as Content](#syncfusion-controls-as-content)
  - [Grid as Pane Content](#grid-as-pane-content)
  - [JavaScript Initialization Approach](#javascript-initialization-approach)
    - [Accordion with Nested ListView](#accordion-with-nested-listview)
- [Plain Text Content](#plain-text-content)
- [Content Template](#content-template)
- [Selector-Based Content Loading](#selector-based-content-loading)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

## HTML Markup Content

You can render HTML markup directly inside pane elements. This is the most flexible way to add content including complex layouts, forms, and custom HTML.

### Inline HTML Content

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div class='content'><h3>Product Details</h3><p>Description of the product.</p><form><input type='text' placeholder='Enter name' /><button type='button'>Submit</button></form></div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div class='content'><h3>Reviews</h3><ul><li>Great product! - John</li><li>Highly recommended - Sarah</li></ul></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Multi-line HTML Content

For complex HTML, use C# string variables to organize content:

```csharp
@{
    var leftContent = @"
        <div class='panel'>
            <h4>Navigation Menu</h4>
            <nav class='menu'>
                <a href='#'>Dashboard</a>
                <a href='#'>Users</a>
                <a href='#'>Settings</a>
            </nav>
        </div>";
    
    var rightContent = @"
        <div class='panel'>
            <h4>Dashboard</h4>
            <p>Select a menu item to see details.</p>
        </div>";
}

<ejs-splitter id="splitter" height="500px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content=@leftContent></e-splitter-pane>
        <e-splitter-pane size="70%" content=@rightContent></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<style>
    .panel { padding: 20px; }
    .menu a { display: block; padding: 8px; color: #0078d4; }
    .menu a:hover { background: #f0f0f0; }
</style>
```

## Syncfusion Controls as Content

You can embed other Syncfusion ASP.NET Core controls within splitter panes for rich, functional layouts.

### Grid as Pane Content

```csharp
@{
    var gridContent = @"
        <div style='width:100%;height:100%;'>
            <ejs-grid id='grid' dataSource=@ViewBag.Data>
                <e-grid-columns>
                    <e-grid-column field='OrderID' headerText='Order ID' width=100></e-grid-column>
                    <e-grid-column field='CustomerName' headerText='Customer Name' width=150></e-grid-column>
                    <e-grid-column field='TotalAmount' headerText='Amount' width=100></e-grid-column>
                </e-grid-columns>
            </ejs-grid>
        </div>";
}

<ejs-splitter id="splitter" height="600px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>Navigation</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content=@gridContent></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### JavaScript Initialization Approach

For complex scenarios where you need dynamic control initialization or nested controls (like Accordion with ListView inside), use the `created` event to initialize controls via JavaScript. This approach provides more flexibility for interactive layouts.

#### Accordion with Nested ListView

This example demonstrates:
- Splitter with Accordion in left pane and content area in right pane
- Accordion initialized via JavaScript in the `created` event
- ListView controls dynamically created inside Accordion items when expanded
- Click events on ListView items to load content in the right pane

```csharp
@page
@using Syncfusion.EJ2

<div class="col-lg-12 control-section">
    <div class="control_wrapper">
        <ejs-splitter id="splitter-accordion" height="300px" width="100%" created="onSplitterCreated">
            <e-splitter-panes>
                <e-splitter-pane size="40%" min="30%" content="<div id='accordion-container'></div>"></e-splitter-pane>
                <e-splitter-pane size="60%" min="45%" content="<div id='content-area'></div>"></e-splitter-pane>
            </e-splitter-panes>
        </ejs-splitter>
    </div>
</div>

<style>
    .control_wrapper {
        max-width: 700px;
        margin: auto;
    }
    #content-area {
        padding: 18px;
    }
    #splitter-accordion .e-accordion .e-acrdn-item .e-acrdn-panel .e-acrdn-content {
        padding: 0px;
    }
    #splitter-accordion .e-accordion {
        border: none;
    }
    #splitter-accordion .e-accordion .e-acrdn-item.e-select {
        border: none;
    }
    #splitter-accordion .e-accordion .e-acrdn-item.e-selected.e-select > .e-acrdn-header {
        border: none;
    }
    #splitter-accordion .e-acrdn-header-content {
        display: block;
        text-decoration: none;
    }
</style>

<script>
    function onSplitterCreated(args) {
        // Initialize Accordion component
        var accordion = new ej.navigations.Accordion({
            items: [
                { header: 'ASP.NET', expanded: true, content: '<div id="nested-accordion-1"></div>' },
                { header: 'ASP.NET MVC', content: '<div id="nested-accordion-2"></div>' },
                { header: 'JavaScript', content: '<div id="nested-accordion-3"></div>' }
            ],
            expanding: onAccordionExpand
        });
        accordion.appendTo('#accordion-container');
        
        // Set initial content
        document.getElementById('content-area').innerHTML = '<h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.';
    }

    function onAccordionExpand(e) {
        var accordionIndex = [].indexOf.call(this.items, e.item);
        
        // Initialize ListView for each accordion item on first expansion
        if (e.isExpanded) {
            if (accordionIndex === 0) {
                initializeListView('nested-accordion-1', [
                    { text: 'Grid', id: '1' },
                    { text: 'Schedule', id: '2' },
                    { text: 'Chart', id: '3' }
                ]);
                updateContent('<h4>About ASP.NET</h4>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser.');
            }
            else if (accordionIndex === 1) {
                initializeListView('nested-accordion-2', [
                    { text: 'Grid', id: '4' },
                    { text: 'Schedule', id: '5' },
                    { text: 'Chart', id: '6' }
                ]);
                updateContent('<h4>About ASP.NET MVC</h4>The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.');
            }
            else if (accordionIndex === 2) {
                initializeListView('nested-accordion-3', [
                    { text: 'Grid', id: '7' },
                    { text: 'Schedule', id: '8' },
                    { text: 'Chart', id: '9' }
                ]);
                updateContent('<h4>About JavaScript</h4>JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user.');
            }
        }
    }

    function initializeListView(targetId, data) {
        var container = document.getElementById(targetId);
        if (container && container.querySelectorAll('.e-list-parent').length === 0) {
            var listView = new ej.lists.ListView({
                dataSource: data,
                select: onListItemSelect
            });
            listView.appendTo('#' + targetId);
        }
    }

    function onListItemSelect(e) {
        var itemId = e.item.dataset.uid;
        var content = '';
        
        switch(itemId) {
            case '1':
                content = '<h4>ASP.NET Grid</h4>The Grid component displays and edit data in a tabular format with rich features like sorting, filtering, paging, and grouping.';
                break;
            case '2':
                content = '<h4>ASP.NET Schedule</h4>The Scheduler component is used to manage the calendar and display appointments/events efficiently.';
                break;
            case '3':
                content = '<h4>ASP.NET Chart</h4>Chart component is used to visualize data in a graphical format with support for various chart types.';
                break;
            case '4':
                content = '<h4>ASP.NET MVC Grid</h4>The MVC Grid component offers a rich set of features like sorting, filtering, and paging.';
                break;
            case '5':
                content = '<h4>ASP.NET MVC Schedule</h4>The MVC Scheduler helps in planning and managing appointments effectively.';
                break;
            case '6':
                content = '<h4>ASP.NET MVC Chart</h4>MVC Chart provides interactive data visualization with multiple series types.';
                break;
            case '7':
                content = '<h4>JavaScript Grid</h4>JavaScript Grid component for web applications with high performance.';
                break;
            case '8':
                content = '<h4>JavaScript Schedule</h4>JavaScript-based calendar and scheduling component.';
                break;
            case '9':
                content = '<h4>JavaScript Chart</h4>JavaScript charting library for interactive visualizations.';
                break;
        }
        
        updateContent(content);
    }

    function updateContent(htmlContent) {
        document.getElementById('content-area').innerHTML = htmlContent;
    }
</script>
```

**Key features of this approach:**
- `created` event fires after splitter is initialized
- Accordion is created programmatically using `new ej.navigations.Accordion()`
- ListView controls are dynamically initialized inside accordion items
- `expanding` event handles dynamic content loading
- `select` event on ListView updates the content pane

**When to use JavaScript initialization:**
- When you need dynamic control creation based on user interactions
- When nesting complex controls (Accordion > ListView)
- When you need to load content via AJAX
- When you need programmatic control over control behavior

## Plain Text Content

For simple text content, use the `content` property with plain strings:

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="This is a simple text content for pane 1"></e-splitter-pane>
        <e-splitter-pane size="50%" content="This is a simple text content for pane 2"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**When to use:**
- Static text messages
- Simple labels or descriptions
- Quick status displays

## Content Template

Use the `<e-content-template>` tag helper to create flexible pane content. This approach is useful for dynamic or complex layouts.

```csharp
<ejs-splitter id="splitter" height="500px">
    <e-splitter-panes>
        <!-- Pane 1: Using content attribute -->
        <e-splitter-pane content="<div class='pane-content'><h3>Panel Title</h3><p>Template content can include any HTML.</p><button class='e-btn'>Action Button</button></div>"></e-splitter-pane>
        
        <!-- Pane 2: Using content attribute -->
        <e-splitter-pane content="<div class='pane-content'><h3>Another Panel</h3><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<style>
    .pane-content {
        padding: 20px;
        background: #f5f5f5;
        border-radius: 4px;
    }
</style>
```

**Key benefits:**
- Better code organization for complex templates
- Separates structure from HTML markup
- Easier to maintain and modify

## Selector-Based Content Loading

Load content from existing HTML elements using CSS selectors (ID or class). This is useful when content is defined elsewhere on the page.

### Using ID Selector

```csharp
<!-- Hidden content containers -->
<div id="nav-content" style="display:none;">
    <h3>Navigation</h3>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</div>

<div id="main-content" style="display:none;">
    <h3>Welcome</h3>
    <p>This is the main content area.</p>
</div>

<!-- Splitter with selector-based content -->
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" content="#nav-content"></e-splitter-pane>
        <e-splitter-pane size="75%" content="#main-content"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**How it works:**
- `content="#nav-content"` - References element with id="nav-content"
- Element is shown in pane when splitter renders
- Original hidden element is still removed from DOM
- Useful for DRY principle (Don't Repeat Yourself)

### Using Class Selector (Multiple Instances)

```csharp
<!-- Reusable content templates -->
<div class="pane-template">
    <h4>Section A</h4>
    <p>Section A content</p>
</div>

<div class="pane-template">
    <h4>Section B</h4>
    <p>Section B content</p>
</div>

<!-- Multiple splitters using same templates -->
<ejs-splitter id="splitter1" height="300px">
    <e-splitter-panes>
        <e-splitter-pane content=".pane-template:eq(0)"></e-splitter-pane>
        <e-splitter-pane content=".pane-template:eq(1)"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

## Practical Examples

### Example 1: Email Client Layout

```csharp
@{
    var folderContent = @"
        <div style='padding:15px;'>
            <h4>Folders</h4>
            <ul style='list-style:none;padding:0;'>
                <li value='inbox' onclick='loadFolder(this)' style='padding:8px;cursor:pointer;'>📬 Inbox</li>
                <li value='sent' onclick='loadFolder(this)' style='padding:8px;cursor:pointer;'>📤 Sent</li>
                <li value='drafts' onclick='loadFolder(this)' style='padding:8px;cursor:pointer;'>📝 Drafts</li>
            </ul>
        </div>";

    var messageContent = @"
        <div style='padding:15px;'>
            <h4>Messages</h4>
            <p>Select a folder to view messages.</p>
        </div>";
}

<ejs-splitter id="emailSplitter" height="600px">
    <e-splitter-panes>
        <e-splitter-pane size="20%;" min="150px" content=@folderContent></e-splitter-pane>
        <e-splitter-pane size="80%" content=@messageContent></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Example 2: Dashboard with Cards

```csharp
<ejs-splitter id="dashboardSplitter" height="500px" orientation="Vertical">
    <e-splitter-pane size="30%" content="<div style='background:#f0f0f0;padding:20px;text-align:center;'><h4>Key Metrics</h4><div style='background:white;padding:10px;margin:10px 0;border-radius:4px;'><h2>$45,230</h2><p>Total Sales</p></div></div>"></e-splitter-pane>
    <e-splitter-pane size="70%" content="<div style='padding:20px;'><h4>Details</h4><p>Detailed information appears here.</p></div>"></e-splitter-pane>
</ejs-splitter>
```

## Best Practices

1. **Keep HTML Clean** - Use external elements with selectors for reusable content
2. **Responsive Content** - Use percentage-based widths instead of fixed pixels
3. **Accessibility** - Ensure content HTML includes semantic tags (heading hierarchy, lists, etc.)
4. **Performance** - For large grids or tabular data, use virtual scrolling
5. **Dynamic Updates** - Use JavaScript methods to update pane content after initialization
