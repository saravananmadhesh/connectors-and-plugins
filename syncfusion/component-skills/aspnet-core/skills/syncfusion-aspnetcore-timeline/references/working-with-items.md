# Working with Timeline Items

## Overview
Timeline items represent individual events or milestones. Each item can display content, opposite content, icons, and be customized or disabled.

## Adding Items
Add items using the `<e-timeline-item>` tag helper:
```cshtml
<ejs-timeline id="timeline">
    <e-timeline-items>
        <e-timeline-item content="Design Phase"></e-timeline-item>
        <e-timeline-item content="Implementation Phase"></e-timeline-item>
        <e-timeline-item content="Testing Phase"></e-timeline-item>
    </e-timeline-items>
</ejs-timeline>
```

## Opposite Content
Display supplementary information opposite the main content:
```cshtml
<e-timeline-item content="Release" oppositeContent="Q2 2024"></e-timeline-item>
```

## Dot Customization
Add icons or images to the dot:
```cshtml
<e-timeline-item content="Completed" dotCss="e-icons e-check"></e-timeline-item>
```

## Disabled Items
Disable an item visually:
```cshtml
<e-timeline-item content="Deprecated" disabled="true"></e-timeline-item>
```


## Templated Content
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
- Use concise content for clarity.
- Use opposite content for dates or statuses.
- Use icons for quick status recognition.
