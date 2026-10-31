# Populating Items and Data Binding in Carousel Control

## Table of Contents
- [Overview](#overview)
- [Method 1: Item Markup Binding](#method-1-item-markup-binding)
- [Method 2: Data Source Binding](#method-2-data-source-binding)
- [Selection and Navigation](#selection-and-navigation)
- [Partial Visible Slides](#partial-visible-slides)
- [Item-Level Customization](#item-level-customization)
- [Advanced Scenarios](#advanced-scenarios)

## Overview

The Carousel component supports two primary approaches for populating slides:

1. **Item Markup Binding** – Declare individual `<e-carousel-item>` elements in markup that can each have their own template and interval
2. **Data Source Binding** – Bind to a collection using `itemTemplate` for uniform template applied to all items

Choose the approach based on your use case:
- **Use Item Markup** when slides have different templates or individual intervals
- **Use Data Source** when all slides use the same template structure

## Method 1: Item Markup Binding

### Basic Item Structure

Each carousel item is defined with the `<e-carousel-item>` tag. Provide content via the `template` attribute:

```html
<ejs-carousel id="itemCarousel" autoPlay="true" interval="3000">
    <e-carousel-items>
        <e-carousel-item template="#slide1"></e-carousel-item>
        <e-carousel-item template="#slide2"></e-carousel-item>
        <e-carousel-item template="#slide3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="slide1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; font-size: 48px; margin: 0;">Slide 1</h1>
    </div>
</script>

<script id="slide2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; font-size: 48px; margin: 0;">Slide 2</h1>
    </div>
</script>

<script id="slide3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; font-size: 48px; margin: 0;">Slide 3</h1>
    </div>
</script>

<style>
#itemCarousel {
    height: 300px;
    max-width: 600px;
    margin: 20px auto;
}
</style>
```

### Individual Item Templates

Each item can have its own distinct template. This is powerful for gallery scenarios where each slide has different content:

```html
<ejs-carousel id="galleryCarousel" 
              autoPlay="false"
              buttonsVisibility="Visible"
              showIndicators="true">
    <e-carousel-items>
        <!-- Portfolio project 1 -->
        <e-carousel-item template="#project1"></e-carousel-item>
        
        <!-- Portfolio project 2 - different layout -->
        <e-carousel-item template="#project2"></e-carousel-item>
        
        <!-- Portfolio project 3 - video embed -->
        <e-carousel-item template="#project3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="project1" type="text/x-template">
    <div class="portfolio-slide">
        <img src="/portfolio/website.jpg" alt="Website Project" class="portfolio-image" />
        <div class="portfolio-info">
            <h3>Responsive Website</h3>
            <p>Modern e-commerce platform built with ASP.NET Core</p>
        </div>
    </div>
</script>

<script id="project2" type="text/x-template">
    <div class="portfolio-slide">
        <div class="portfolio-video">
            <video src="/portfolio/app-demo.mp4" controls style="width: 100%; height: 100%; object-fit: contain;"></video>
        </div>
        <div class="portfolio-info">
            <h3>Mobile App Demo</h3>
            <p>Cross-platform mobile application</p>
        </div>
    </div>
</script>

<script id="project3" type="text/x-template">
    <div class="portfolio-slide">
        <img src="/portfolio/dashboard.jpg" alt="Dashboard" class="portfolio-image" />
        <div class="portfolio-info">
            <h3>Analytics Dashboard</h3>
            <p>Real-time business analytics and reporting</p>
        </div>
    </div>
</script>

<style>
#galleryCarousel {
    height: 400px;
    max-width: 700px;
    margin: 20px auto;
}

.portfolio-slide {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
}

.portfolio-image {
    flex: 1;
    object-fit: cover;
    width: 100%;
}

.portfolio-video {
    flex: 1;
    background: #000;
}

.portfolio-info {
    padding: 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.portfolio-info h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
}

.portfolio-info p {
    margin: 0;
    color: #6c757d;
    font-size: 14px;
}
</style>
```

### Per-Item Interval Configuration

Set different auto-play intervals for individual items:

```html
<ejs-carousel id="variableIntervalCarousel" 
              autoPlay="true"
              buttonsVisibility="Hidden">
    <e-carousel-items>
        <!-- Shows for 2 seconds -->
        <e-carousel-item template="#fast" interval="2000"></e-carousel-item>
        
        <!-- Shows for 5 seconds (important content) -->
        <e-carousel-item template="#slow" interval="5000"></e-carousel-item>
        
        <!-- Default interval (3 seconds) -->
        <e-carousel-item template="#medium" interval="3000"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="fast" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
            <p style="font-size: 12px; margin: 0;">Quick update (2 seconds)</p>
            <h2 style="margin: 10px 0 0 0;">Fast Transition</h2>
        </div>
    </div>
</script>

<script id="slow" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
            <p style="font-size: 12px; margin: 0;">Important content (5 seconds)</p>
            <h2 style="margin: 10px 0 0 0;">Slow Transition</h2>
        </div>
    </div>
</script>

<script id="medium" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
            <p style="font-size: 12px; margin: 0;">Standard content (3 seconds)</p>
            <h2 style="margin: 10px 0 0 0;">Medium Transition</h2>
        </div>
    </div>
</script>

<style>
#variableIntervalCarousel {
    height: 250px;
    max-width: 600px;
    margin: 20px auto;
}
</style>
```

## Method 2: Data Source Binding

### Basic Data Binding

Bind carousel to a data collection from your ASP.NET Core controller/page model:

**File: `IndexModel.cs` (Page Model)**

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public List<SlideItem> Slides { get; set; }
    
    public void OnGet()
    {
        Slides = new List<SlideItem>
        {
            new SlideItem 
            { 
                Id = 1, 
                Title = "Summer Adventure", 
                ImageUrl = "https://ej2.syncfusion.com/aspnetcore/css/carousel/images/bridge.jpg" 
            },
            new SlideItem 
            { 
                Id = 2, 
                Title = "Nature Beauty", 
                ImageUrl = "https://ej2.syncfusion.com/aspnetcore/css/carousel/images/trees.jpg" 
            },
            new SlideItem 
            { 
                Id = 3, 
                Title = "Mountain Escape", 
                ImageUrl = "https://ej2.syncfusion.com/aspnetcore/css/carousel/images/waterfall.jpg" 
            }
        };
    }
}

public class SlideItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string ImageUrl { get; set; }
}
```

**File: `Index.cshtml` (Razor Page)**

```html
@page
@model IndexModel

<ejs-carousel id="dataCarousel"
              dataSource="@Model.Slides"
              itemTemplate="#slideTemplate"
              autoPlay="true"
              interval="3000"
              showIndicators="true">
</ejs-carousel>

<script id="slideTemplate" type="text/x-template">
    <div class="data-slide">
        <img src="${ImageUrl}" alt="${Title}" class="slide-image" />
        <div class="slide-caption">
            <h3>${Title}</h3>
        </div>
    </div>
</script>

<style>
#dataCarousel {
    height: 350px;
    max-width: 800px;
    margin: 30px auto;
}

.data-slide {
    height: 100%;
    position: relative;
}

.slide-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.slide-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    padding: 30px 20px 20px;
}

.slide-caption h3 {
    margin: 0;
    font-size: 20px;
}
</style>
```

### Complex Data Template

Use expressions and conditional logic in templates:

```html
<ejs-carousel id="complexCarousel"
              dataSource="@Model.Products"
              itemTemplate="#productTemplate"
              autoPlay="false"
              showIndicators="true">
</ejs-carousel>

<script id="productTemplate" type="text/x-template">
    <div class="product-slide">
        <img src="${ImageUrl}" alt="${ProductName}" />
        <div class="product-details">
            <h4>${ProductName}</h4>
            <p class="description">${Description}</p>
            <div class="product-meta">
                <span class="price">${Price}</span>
                <span class="rating">${Rating} ★</span>
            </div>
            <button class="btn-details">View Details</button>
        </div>
    </div>
</script>

<style>
#complexCarousel {
    height: 450px;
    max-width: 600px;
    margin: 20px auto;
}

.product-slide {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
}

.product-slide img {
    flex: 1;
    object-fit: cover;
    width: 100%;
}

.product-details {
    padding: 20px;
    background: #fff;
    flex: 0 0 auto;
}

.product-details h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
}

.description {
    margin: 0 0 15px 0;
    color: #666;
    font-size: 13px;
    line-height: 1.4;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 13px;
}

.price {
    font-weight: 600;
    color: #027cdb;
    font-size: 16px;
}

.rating {
    color: #ffc107;
}

.btn-details {
    background: #027cdb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}

.btn-details:hover {
    background: #0062cc;
}
</style>
```

## Selection and Navigation

### Set Initial Slide

Use `selectedIndex` to start carousel at a specific slide:

```html
<!-- Start at slide index 2 (third slide) -->
<ejs-carousel id="startCarousel"
              selectedIndex="2"
              autoPlay="true">
    <e-carousel-items>
        <e-carousel-item template="#s1"></e-carousel-item>
        <e-carousel-item template="#s2"></e-carousel-item>
        <e-carousel-item template="#s3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

### Manual Navigation Methods

Navigate slides programmatically using JavaScript:

```html
<div>
    <ejs-carousel id="controlledCarousel" autoPlay="false">
        <e-carousel-items>
            <e-carousel-item template="#slide1"></e-carousel-item>
            <e-carousel-item template="#slide2"></e-carousel-item>
            <e-carousel-item template="#slide3"></e-carousel-item>
        </e-carousel-items>
    </ejs-carousel>
    
    <div style="text-align: center; margin-top: 20px;">
        <button onclick="previousSlide()" class="btn">← Previous</button>
        <span id="slideInfo" style="margin: 0 20px;">Slide <span id="current">1</span> of 3</span>
        <button onclick="nextSlide()" class="btn">Next →</button>
    </div>
</div>

<script>
function nextSlide() {
    // Access carousel instance and call next() method
    var carousel = document.getElementById("controlledCarousel").ej2_instances[0];
    carousel.next();
    updateSlideInfo();
}

function previousSlide() {
    var carousel = document.getElementById("controlledCarousel").ej2_instances[0];
    carousel.prev();
    updateSlideInfo();
}

function updateSlideInfo() {
    var carousel = document.getElementById("controlledCarousel").ej2_instances[0];
    document.getElementById("current").innerHTML = carousel.selectedIndex + 1;
}
</script>

<style>
.btn {
    background: #027cdb;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn:hover {
    background: #0062cc;
}

#slideInfo {
    font-size: 14px;
    font-weight: 500;
}
</style>
```

## Partial Visible Slides

### Enable Partial Visible Mode

Show adjacent slide previews alongside the active slide:

```html
<ejs-carousel id="partialCarousel"
              partialVisible="true"
              autoPlay="true"
              interval="3000"
              animationEffect="Slide"
              loop="true"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#item1"></e-carousel-item>
        <e-carousel-item template="#item2"></e-carousel-item>
        <e-carousel-item template="#item3"></e-carousel-item>
        <e-carousel-item template="#item4"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="item1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">Item 1</div>
</script>

<script id="item2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">Item 2</div>
</script>

<script id="item3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">Item 3</div>
</script>

<script id="item4" type="text/x-template">
    <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">Item 4</div>
</script>

<style>
#partialCarousel {
    max-width: 800px;
    margin: 30px auto;
}
</style>
```

**Important:** Slide animation only works when `partialVisible="true"` is enabled.

### Customize Partial Slide Size

Use CSS to control visible area of adjacent slides:

```html
<style>
#partialCarousel .e-carousel-items {
    /* Adjust how much of adjacent slides show */
    margin: 0 60px;
}

#partialCarousel .e-carousel-item {
    /* Add spacing between items */
    margin: 0 10px;
}
</style>
```

## Item-Level Customization

### CSS Classes per Item

Set custom CSS classes for individual carousel items:

```html
<ejs-carousel id="customItemCarousel">
    <e-carousel-items>
        <e-carousel-item template="#slide1" css-class="light-slide"></e-carousel-item>
        <e-carousel-item template="#slide2" css-class="dark-slide"></e-carousel-item>
        <e-carousel-item template="#slide3" css-class="gradient-slide"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<style>
.light-slide {
    background: #f8f9fa;
}

.dark-slide {
    background: #2c3e50;
    color: white;
}

.gradient-slide {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
```

### HTML Attributes

Add custom HTML attributes to items:

```html
<ejs-carousel id="attrCarousel">
    <e-carousel-items>
        <e-carousel-item template="#slide1" htmlAttributes='new Dictionary<string, object> { { "data-category", "featured" } }'></e-carousel-item>
        <e-carousel-item template="#slide2" html-attributes='new Dictionary<string, object> { { "data-category", "popular" } }'></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

## Advanced Scenarios

### Dynamic Item Generation from Server

Render carousel items from list in C#:

```html
@page
@model CarouselModel

<ejs-carousel id="dynamicCarousel" autoPlay="true">
    <e-carousel-items>
        @foreach(var item in Model.CarouselItems)
        {
            <e-carousel-item template="#template@(item.Id)"></e-carousel-item>
        }
    </e-carousel-items>
</ejs-carousel>

@foreach(var item in Model.CarouselItems)
{
    <script id="template@(item.Id)" type="text/x-template">
        <div class="generated-slide">
            <h2>@item.Title</h2>
            <p>@item.Description</p>
            <img src="@item.ImageUrl" />
        </div>
    </script>
}
```

### Responsive Grid of Carousels

Create multiple carousels in a grid layout:

```html
<div class="carousel-grid">
    @for (int i = 1; i <= 3; i++)
    {
        <div class="carousel-column">
            <ejs-carousel id="carousel@(i)" 
                          autoPlay="true"
                          interval="@(2000 + i * 500)"
                          height="250px">
                <e-carousel-items>
                    <e-carousel-item template="#item1"></e-carousel-item>
                    <e-carousel-item template="#item2"></e-carousel-item>
                </e-carousel-items>
            </ejs-carousel>
        </div>
    }
</div>

<style>
.carousel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1000px;
    margin: 20px auto;
}
</style>
```

---

**Next Steps:** Review [Animations and Transitions](animations-transitions.md) for customizing transition effects, or see [Navigation Controls and Indicators](navigation-indicators.md) for UI customization options.
