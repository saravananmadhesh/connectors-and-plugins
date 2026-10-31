# Events and Interactions

The Sankey Chart provides comprehensive events that allow you to customize behavior, respond to user interactions, and hook into the chart lifecycle. These events enable advanced customization scenarios including data transformation, analytics tracking, and dynamic UI updates. All event functionality is self-contained and independent of styling configuration.

## Table of Contents
- [Event Categories](#event-categories)
  - [Lifecycle Events](#lifecycle-events)
  - [Interaction Events](#interaction-events)
  - [Rendering Events](#rendering-events)
  - [Other Events](#other-events)
- [Load Event](#load-event)
  - [Load Event Example: Apply Theme](#load-event-example-apply-theme)
- [Loaded Event](#loaded-event)
  - [Loaded Event Example: Initialize Analytics](#loaded-event-example-initialize-analytics)
- [Node Interaction Events](#node-interaction-events)
  - [Node Click Event](#node-click-event)
  - [Node Click Example: Select and Highlight](#node-click-example-select-and-highlight)
  - [Node Hover Events](#node-hover-events)
- [Link Interaction Events](#link-interaction-events)
  - [Link Click Event](#link-click-event)
  - [Link Hover Events](#link-hover-events)
- [Node Rendering Event](#node-rendering-event)
- [Link Rendering Event](#link-rendering-event)
- [Label Rendering Event](#label-rendering-event)
- [Legend Item Rendering Event](#legend-item-rendering-event)
- [Size Changed Event](#size-changed-event)
- [Export Events](#export-events)
  - [Before Export Event](#before-export-event)
  - [Export Completed Event](#export-completed-event)
- [Complete Event Handler Example](#complete-event-handler-example)
- [Best Practices](#best-practices)
  - [Event Handling](#event-handling)
  - [Performance Considerations](#performance-considerations)
  - [Accessibility](#accessibility)


## Event Categories

### Lifecycle Events

Events that trigger during chart loading and initialization:
- **Load** - Before the Sankey loads
- **Loaded** - After the Sankey is fully loaded and rendered

### Interaction Events

Events that respond to user actions:
- **NodeClick** - When a node is clicked
- **NodeEnter** - When mouse enters a node
- **NodeLeave** - When mouse leaves a node
- **LinkClick** - When a link is clicked
- **LinkEnter** - When mouse enters a link
- **LinkLeave** - When mouse leaves a link

### Rendering Events

Events that trigger during element rendering:
- **NodeRendering** - Before a node is rendered
- **LinkRendering** - Before a link is rendered
- **LabelRendering** - Before a label is rendered
- **LegendItemRendering** - Before a legend item is rendered
- **TooltipRendering** - Before a tooltip is rendered

### Other Events

- **SizeChanged** - When chart dimensions change
- **BeforeExport** - Before export process starts
- **AfterExport** - After export completes
- **BeforePrint** - Before print process starts

## Load Event

The `Load` event triggers before the Sankey Chart begins rendering. Use this event to customize configuration, apply themes, or prepare data before the chart loads:

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="loadSankey" 
    width="100%" 
    height="420px"
    load="onLoad">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
    function onLoad(args) {
        console.log('Sankey Chart is about to load');
    }
</script>
```

### Load Event Example: Apply Theme

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="loadSankey" 
    width="100%" 
    height="420px"
    load="onLoad">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLoad(args) {
    // Check if model exists, otherwise set directly on args
    let sankey = args.model || args;
    
    const userPreference = window.userPreference || 'dark';

    if (userPreference === 'dark') {
        sankey.theme = 'HighContrast';
        console.log(sankey.theme)
    }
    
    if (window.innerWidth < 768) {
        sankey.margin = { top: 10, bottom: 10, left: 10, right: 10 };
    }
}
</script>
```

## Loaded Event

The `Loaded` event triggers after the Sankey Chart is completely rendered and ready for interaction. Use this event to initialize calculations, perform analytics, or trigger dependent components:

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="loadedSankey" 
    width="100%" 
    height="420px"
    loaded="onLoaded">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLoaded(args) {
    console.log('Sankey Chart is fully loaded');
    
    // Example: Add an aria-label for screen readers now that the element is ready
    let element = document.getElementById('loadedSankey');
    if (element) {
        element.setAttribute('aria-label', 'Sankey diagram showing data flow');
    }
}
</script>

```

### Loaded Event Example: Initialize Analytics

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<div style="margin-bottom: 10px;">
    <button id="exportBtn" disabled onclick="exportSankey()">Export to PNG</button>
    <button id="printBtn" disabled onclick="printSankey()">Print Chart</button>
</div>

<ejs-sankey id="loadedSankey" 
    width="100%" 
    height="420px"
    loaded="onLoaded">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLoaded(args) {
    const chart = args.model || args.sankey || args;

    // Enable buttons now that rendering is finished
    const exportBtn = document.getElementById('exportBtn');
    const printBtn = document.getElementById('printBtn');
    
    if (exportBtn) exportBtn.disabled = false;
    if (printBtn) printBtn.disabled = false;

    console.log('Sankey Chart is fully loaded and controls are enabled.');
}

function exportSankey() {
    let sankeyObj = document.getElementById('loadedSankey').ej2_instances[0];
    // .export(type, fileName)
    sankeyObj.export('PNG', 'EnergyFlowDiagram');
}

function printSankey() {
    let sankeyObj = document.getElementById('loadedSankey').ej2_instances[0];
    sankeyObj.print();
}
</script>
```

## Node Interaction Events

Handle node click and hover events to respond to user actions and provide interactive feedback:

### Node Click Event

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<ejs-sankey id="nodeClickSankey" 
    width="100%" 
    height="420px"
    nodeClick="onNodeClick">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onNodeClick(args) {
    // Access the label of the clicked node
    let nodeLabel = args.node ? args.node.label : "Unknown Node";
    console.log('Node clicked: ' + nodeLabel);
    
    // Example: Alert the user or filter other dashboard components
    // alert('You selected: ' + nodeLabel);
}
</script>
```

### Node Click Example: Select and Highlight

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<div id="detailsPanel" style="margin-top: 10px; padding: 10px; border: 1px solid #ccc; background: #f9f9f9;">
    <strong>Selected Node:</strong> <span id="selectedNode">None</span>
</div>

<ejs-sankey id="nodeClickSankey" 
    width="100%" 
    height="420px"
    nodeClick="onNodeClick">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onNodeClick(args) {
    const node = args.node || args.data;
    
    if (node) {
        // Access the nested text property based on your console log structure
        const nodeLabel = (node.label.text ||  "Unknown Node");
        
        // Update UI
        document.getElementById('selectedNode').textContent = nodeLabel;
        
        console.log('Node ID:', node.id, 'Extracted Label:', nodeLabel);
    }
}
</script>
```

### Node Hover Events

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<ejs-sankey id="nodeHoverSankey" 
    width="100%" 
    height="420px"
    nodeEnter="onNodeEnter"
    nodeLeave="onNodeLeave">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onNodeEnter(args) {
    const node = args.node || args.data;
    // Accessing the nested text property found in your console logs
    const label =  node.label.text || node.label;
    
    console.log('Mouse entered node: ' + label);
    
    // Example: Highlight the node by changing the cursor
    document.getElementById('nodeHoverSankey').style.cursor = 'pointer';
}

function onNodeLeave(args) {
    const node = args.node || args.data;
    const label = node.label.text || node.label;
    
    console.log('Mouse left node: ' + label);
    
    // Reset cursor
    document.getElementById('nodeHoverSankey').style.cursor = 'default';
}
</script>
```

## Link Interaction Events

Handle link click and hover events:

### Link Click Event

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

<ejs-sankey id="linkClickSankey" 
    width="100%" 
    height="420px"
    linkClick="onLinkClick">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLinkClick(args) {
    // In linkClick, data is usually found under args.link or args.data
    const link = args.link || args.data;
    
    if (link) {
        const flowValue = link.value;
        const source = link.sourceId || link.sourceNodeID;
        const target = link.targetId || link.targetNodeID;
        
        console.log(`Link clicked: ${source} → ${target} (Value: ${flowValue})`);
        
        // Example: Display flow info in an alert or panel
        // alert(`Flow: ${flowValue} units from ${source} to ${target}`);
    }
}
</script>
```

### Link Hover Events

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<!-- Add this above your Sankey component -->
<div id="flowDisplay" style="height: 30px; font-weight: bold; color: #007bff;">
    Hover over a link to see flow details
</div>

<script>
// Implementing the helper functions used in your script
function displayFlowInfo(value) {
    document.getElementById('flowDisplay').innerText = "Current Flow: " + value + " units";
}

function hideFlowInfo() {
    document.getElementById('flowDisplay').innerText = "Hover over a link to see flow details";
}
</script>

<ejs-sankey id="linkHoverSankey" 
    width="100%" 
    height="420px"
    linkEnter="onLinkEnter"
    linkLeave="onLinkLeave">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLinkEnter(args) {
    const link = args.link || args.data;
    if (link) {
        // Change cursor to indicate interactivity
        document.getElementById('linkHoverSankey').style.cursor = 'pointer';
        
        // Use the flow value from the link object
        console.log('Flow Value:', link.value);
        if (typeof displayFlowInfo === "function") {
            displayFlowInfo(link.value);
        }
    }
}

function onLinkLeave(args) {
    // Reset cursor
    document.getElementById('linkHoverSankey').style.cursor = 'default';
    
    if (typeof hideFlowInfo === "function") {
        hideFlowInfo();
    }
}
</script>
```

## Node Rendering Event

The `NodeRendering` event triggers before each node is rendered, allowing dynamic node customization:

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="nodeRenderSankey" 
    width="100%" 
    height="420px"
    nodeRendering="onNodeRendering">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onNodeRendering(args) {
    // Customize nodes based on their ID or Label keywords
    const id = args.node.id;

    if (id.includes('Source') || id === 'Generation') {
        args.node.color = '#2E7D32'; // Green for energy sources
    } else if (id.includes('Consumer') || id === 'Consumption') {
        args.node.color = '#C62828'; // Red for end-point consumers
    } else {
        args.node.color = '#1565C0'; // Blue for distribution/mid-points
    }
}
</script>
```

## Link Rendering Event

The `LinkRendering` event triggers before each link is rendered, allowing dynamic link customization:

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="linkRenderSankey" 
    width="100%" 
    height="420px"
    linkRendering="onLinkRendering">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLinkRendering(args) {
    // Access the specific link and its value
    const link = args.link;
    const flowValue = link.value;

    if (flowValue > 500) {
        link.opacity = 0.8;
        link.color = '#D32F2F';  // Red for major flows
    } else if (flowValue > 200) {
        link.opacity = 0.5;
        link.color = '#F57C00';  // Orange for medium flows
    } else {
        link.opacity = 0.2;
        link.color = '#1976D2';  // Blue for minor flows
    }
}
</script>


```

## Label Rendering Event

The `LabelRendering` event triggers before each label is rendered, allowing dynamic label customization:

```html
<ejs-sankey id="labelRenderSankey" 
    width="100%" 
    height="420px"
    labelRendering="onLabelRendering">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLabelRendering(args) {
    // Customize label appearance
    console.log("Label Rendered");
}
</script>
```

## Legend Item Rendering Event

The `LegendItemRendering` event triggers before a legend item is rendered, allowing custom legend item styling:

```html
<ejs-sankey id="legendRenderSankey" 
    width="100%" 
    height="420px"
    legendItemRendering="onLegendItemRendering">
    
    <e-sankey-legendsettings visible="true"></e-sankey-legendsettings>

    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLegendItemRendering(args) {
    // args.text contains the label displayed in the legend
    const legendText = args.text || "";

    if (legendText.includes('Source') || legendText === 'Energy Input') {
        args.fill = '#2E7D32';  // Green for sources
    } else if (legendText.includes('Consumption') || legendText === 'Consumer') {
        args.fill = '#D32F2F';  // Red for consumers
    }
}
</script>
```

## Size Changed Event

Respond when the chart size changes (e.g., window resize):

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
<ejs-sankey id="sizeChangeSankey" 
    width="100%" 
    height="420px"
    sizeChanged="onSizeChanged">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onSizeChanged(args) {
    // args typically contains currentSize or the new dimensions
    const newWidth = args.currentSize ? args.currentSize.width : args.width;
    const newHeight = args.currentSize ? args.currentSize.height : args.height;

    console.log(`Chart resized to: ${newWidth} x ${newHeight}`);
}
</script>
```

## Export Events

### Before Export Event

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
@* Add the button above the chart *@
<div style="margin-bottom: 10px;">
    <button id="exportButton" onclick="exportDiagram()" class="e-btn">Export PNG</button>
</div>

<ejs-sankey id="beforeExportSankey" 
    width="100%" 
    height="420px"
    beforeExport="onBeforeExport">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onBeforeExport(args) {
    const date = new Date().toISOString().slice(0, 10);
    args.fileName = 'EnergyFlow_Report_' + date;
    console.log('Filename set to: ' + args.fileName);
}

function exportDiagram() {
    // Access the Syncfusion instance via the element ID
    let sankeyObj = document.getElementById('beforeExportSankey').ej2_instances[0];
    // .export(format, fileName)
    sankeyObj.export('PNG', 'FallbackName'); 
}
</script>

```

### Export Completed Event

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
@* Add the button above the chart *@
<div style="margin-bottom: 10px;">
    <button id="exportButton" onclick="exportDiagram()" class="e-btn">Export PNG</button>
</div>

<ejs-sankey id="exportCompleteSankey" 
    width="100%" 
    height="420px"
    exportCompleted="onExportCompleted">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onExportCompleted(args) {
    console.log('Export completed successfully');
    
    if (typeof showNotification === "function") {
        showNotification('Chart exported successfully');
    } else {
        alert('Chart exported successfully');
    }
}

function exportDiagram() {
    // Corrected the ID to match your component: exportCompleteSankey
    let sankeyElement = document.getElementById('exportCompleteSankey');
    
    if (sankeyElement && sankeyElement.ej2_instances) {
        let sankeyObj = sankeyElement.ej2_instances[0];
        sankeyObj.export('PNG', 'EnergyFlowDiagram'); 
    }
}
</script>

```

## Complete Event Handler Example

Combine multiple events for comprehensive handling:

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;
@* Add the button above the chart *@
<ejs-sankey id="completeSankey" 
    width="100%" 
    height="600px"
    load="onLoad"
    loaded="onLoaded"
    nodeClick="onNodeClick"
    linkClick="onLinkClick"
    nodeRendering="onNodeRendering"
    linkRendering="onLinkRendering">
    
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" 
                           targetId="@link.TargetId" 
                           value="@link.Value">
            </e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
// JavaScript functions (onLoad, onNodeClick, etc.) remain the same as your previous code
function onLoad(args) {
    console.log('1. Loading...');
}

function onLoaded(args) {
    console.log('2. Loaded and ready');
    // Ensure you have an element with id="exportBtn" if this is called
    let btn = document.getElementById('exportBtn');
    if(btn) btn.disabled = false;
}

function onNodeClick(args) {
    // Access node directly from args
    console.log('3. Node selected: ' + args.node.label.text);
    updateNodeInfo(args.node);
}

function onLinkClick(args) {
    // Access link directly from args
    console.log('4. Link selected: value = ' + args.link.value);
    updateFlowInfo(args.link);
}



function onNodeRendering(args) {
    // During rendering, properties are on args.node
    if (args.node) {
        // Use args.node.id if it's available, otherwise check args.node.label
        let idValue = args.node.id || 0; 
        args.node.fill = (idValue % 2 === 0) ? '#1976D2' : '#4CAF50';
    }
}

function onLinkRendering(args) {
    // During rendering, properties are on args.link
    if (args.link) {
        args.link.opacity = Math.min(args.link.value / 500, 1);
    }
}

function updateNodeInfo(node) {
    let container = document.getElementById('nodeInfo');
    if (container && node) {
        // Properties are directly on the passed object
        container.innerHTML = '<h3>' + (node.label || 'Unknown') + '</h3><p>ID: ' + (node.id || 'N/A') + '</p>';
    }
}

function updateFlowInfo(link) {
    let container = document.getElementById('flowInfo');
    if (container && link) {
        // Properties are directly on the passed object
        container.innerHTML = '<p>Flow Value: ' + link.value + '</p>';
    }
}

</script>
<div style="margin-bottom: 20px;">
    <!-- Export Button referenced in onLoaded -->
    <button id="exportBtn" onclick="exportSankey()" class="e-btn" disabled>Export PNG</button>
</div>

<!-- Info containers referenced in updateNodeInfo and updateFlowInfo -->
<div id="infoPanel" style="display: flex; gap: 20px; margin-top: 20px;">
    <div id="nodeInfo" style="padding: 10px; border: 1px solid #ccc; min-width: 200px;">
        <i>Click a node to see details</i>
    </div>
    <div id="flowInfo" style="padding: 10px; border: 1px solid #ccc; min-width: 200px;">
        <i>Click a link to see flow value</i>
    </div>
</div>

<script>
// Add the export function to trigger the download
function exportSankey() {
    let sankey = document.getElementById('completeSankey').ej2_instances[0];
    sankey.export('PNG', 'Sankey_Export');
}
</script>
```

## Best Practices

### Event Handling

1. **Minimize complex logic** in rendering events (performance impact)
2. **Use console logs** during development to verify event firing
3. **Handle errors gracefully** with try-catch blocks
4. **Avoid recursive updates** that trigger endless loops
5. **Cache frequently accessed data** for performance

### Performance Considerations

- Rendering events fire frequently - keep logic minimal
- Batch DOM updates when possible
- Avoid heavy calculations in event handlers
- Use requestAnimationFrame for animations
- Profile with DevTools to identify bottlenecks

### Accessibility

- Ensure keyboard navigation works with all events
- Provide text feedback for mouse events
- Support screen reader announcements
- Maintain focus management through interactions
- Test with assistive technologies
