# Styling and Templates in Timeline

## Overview
Customize the appearance of Timeline using CSS classes, dot styling, connector customization, and templates for item content.

## Connector Styling
Apply a class to all connectors:
```cshtml
<ejs-timeline id="timeline" cssClass="custom-connector">
    ...
</ejs-timeline>
```

Apply a class to a specific item:
```cshtml
<e-timeline-item content="Special" cssClass="highlight"></e-timeline-item>
```

## Dot Styling
Change dot color or icon:
```cshtml
<e-timeline-item content="Done" dotCss="e-icons e-check custom-dot"></e-timeline-item>
```


## Templates
Use a template for advanced item content with dynamic values:

```cshtml
@using Syncfusion.EJ2.Layouts;

<div class="container" style="height: 350px">
    <ejs-timeline id="timeline">
        <e-timeline-items>
            <e-timeline-item content="#content-template"></e-timeline-item>
            <e-timeline-item content="#content-template"></e-timeline-item>
            <e-timeline-item content="#content-template"></e-timeline-item>
            <e-timeline-item content="Out for Delivery"></e-timeline-item>
        </e-timeline-items>
    </ejs-timeline>
</div>

<script id="content-template" type="text/x-jsrender">
    <div class="content-container">
        <div class="title">
            ${if(itemIndex==0)} Shipped
            ${else if(itemIndex==1)} Departed
            ${else if(itemIndex==2)} Arrived
            ${/if}
        </div>
        <span class="description">
            ${if(itemIndex==0)} Package details received
            ${else if(itemIndex==1)} In-transit
            ${else if(itemIndex==2)} Package arrived at nearest hub
            ${/if}
        </span>
        <div class="info">
            ${if(itemIndex==0)} - Awaiting dispatch
            ${else if(itemIndex==1)} (International warehouse)
            ${else if(itemIndex==2)} (New york - US)
            ${/if}
        </div>
    </div>
</script>

<style>
    .content-container {
        position: relative;
        width: 180px;
        padding: 10px;
        margin-left: 5px;
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        background-color: ghostwhite;
    }

    .content-container::before {
        content: '';
        position: absolute;
        left: -8px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 8px solid silver;
    }

    .content-container .title {
        font-size: 16px;
    }
    .content-container .description {
        color: #999999;
        font-size: 12px;
    }
    .content-container .info {
        color: #999999;
        font-size: 10px;
    }
</style>

## Best Practices
- Use CSS classes for maintainable styling.
- Prefer icon fonts for dot indicators.
- Keep templates accessible (add ARIA attributes as needed).
