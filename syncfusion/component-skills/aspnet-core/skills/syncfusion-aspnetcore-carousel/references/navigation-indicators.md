# Navigation Controls and Indicators in Carousel Control

## Table of Contents
- [Navigation Buttons](#navigation-buttons)
- [Button Templates](#button-templates)
- [Indicator Types](#indicator-types)
- [Indicator Templates](#indicator-templates)
- [Indicator Previews](#indicator-previews)
- [Play/Pause Button](#playpause-button)
- [Responsive Navigation](#responsive-navigation)
- [Accessibility](#accessibility)

## Navigation Buttons

### Navigation Button Visibility

Control when previous/next buttons appear using the `buttonsVisibility` property.

**Visibility Modes:**

- **`Visible`** – Buttons always visible (default)
- **`Hidden`** – Buttons not visible (navigation via indicators or keyboard)
- **`VisibleOnHover`** – Buttons appear only when user hovers over carousel

### Always Visible Navigation

Buttons visible at all times:

```html
<ejs-carousel id="visibleCarousel"
              buttonsVisibility="Visible"
              autoPlay="true"
              showIndicators="true"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#nav1"></e-carousel-item>
        <e-carousel-item template="#nav2"></e-carousel-item>
        <e-carousel-item template="#nav3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="nav1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 1</h1>
    </div>
</script>

<script id="nav2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 2</h1>
    </div>
</script>

<script id="nav3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 3</h1>
    </div>
</script>
```

### Hidden Navigation

Buttons not visible (use indicators, keyboard, or swipe):

```html
<ejs-carousel id="hiddenCarousel"
              buttonsVisibility="Hidden"
              autoPlay="false"
              showIndicators="true"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#hidden1"></e-carousel-item>
        <e-carousel-item template="#hidden2"></e-carousel-item>
        <e-carousel-item template="#hidden3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Navigation buttons are hidden. Use indicators or keyboard arrows to navigate.
</p>
```

### Hover-Only Navigation

Buttons appear only on hover:

```html
<ejs-carousel id="hoverCarousel"
              buttonsVisibility="VisibleOnHover"
              autoPlay="true"
              showIndicators="true"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#hover1"></e-carousel-item>
        <e-carousel-item template="#hover2"></e-carousel-item>
        <e-carousel-item template="#hover3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Hover over the carousel to reveal navigation buttons.
</p>
```

## Button Templates

### Previous Button Template

Customize the previous button appearance:

```html
<ejs-carousel id="prevTemplateCarousel"
              buttonsVisibility="Visible"
              previousButtonTemplate="#prevTemplate"
              nextButtonTemplate="#nextTemplate"
              autoPlay="true"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#item1"></e-carousel-item>
        <e-carousel-item template="#item2"></e-carousel-item>
        <e-carousel-item template="#item3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<!-- Custom Previous Button -->
<script id="prevTemplate" type="text/x-template">
    <button class="custom-nav-btn prev-btn" title="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span class="btn-label">Prev</span>
    </button>
</script>

<!-- Custom Next Button -->
<script id="nextTemplate" type="text/x-template">
    <button class="custom-nav-btn next-btn" title="Next slide">
        <span class="btn-label">Next</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>
</script>

<style>
.custom-nav-btn {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: #333;
    transition: all 0.3s ease;
}

.custom-nav-btn:hover {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.custom-nav-btn svg {
    width: 20px;
    height: 20px;
}

.btn-label {
    display: none;
}

@media (min-width: 768px) {
    .btn-label {
        display: inline;
    }
}
</style>
```

### Icon-Only Navigation Buttons

Minimalist icon buttons:

```html
<ejs-carousel id="iconCarousel"
              buttonsVisibility="Visible"
              previousButtonTemplate="#iconPrev"
              nextButtonTemplate="#iconNext"
              autoPlay="true">
    <e-carousel-items>
        <e-carousel-item template="#icon1"></e-carousel-item>
        <e-carousel-item template="#icon2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="iconPrev" type="text/x-template">
    <button class="icon-btn" title="Previous">◀</button>
</script>

<script id="iconNext" type="text/x-template">
    <button class="icon-btn" title="Next">▶</button>
</script>

<style>
.icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
}

.icon-btn:hover {
    background: rgba(0, 0, 0, 0.8);
}
</style>
```

## Indicator Types

### Default Indicator (Dot)

Traditional bullet points showing current slide position:

```html
<ejs-carousel id="defaultIndicatorCarousel"
              showIndicators="true"
              indicatorsType="Default"
              autoPlay="true"
              interval="2500">
    <e-carousel-items>
        <e-carousel-item template="#slide1"></e-carousel-item>
        <e-carousel-item template="#slide2"></e-carousel-item>
        <e-carousel-item template="#slide3"></e-carousel-item>
        <e-carousel-item template="#slide4"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Default indicators show dots. Click a dot to navigate to that slide.
</p>
```

### Dynamic Indicator

Animated indicator that scales/highlights the active position:

```html
<ejs-carousel id="dynamicIndicatorCarousel"
              showIndicators="true"
              indicatorsType="Dynamic"
              autoPlay="true"
              interval="2500">
    <e-carousel-items>
        <e-carousel-item template="#dyn1"></e-carousel-item>
        <e-carousel-item template="#dyn2"></e-carousel-item>
        <e-carousel-item template="#dyn3"></e-carousel-item>
        <e-carousel-item template="#dyn4"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Dynamic indicators with smooth animation highlighting the current slide.
</p>
```

### Fraction Indicator

Displays slide count as a fraction (e.g., "2 / 5"):

```html
<ejs-carousel id="fractionIndicatorCarousel"
              showIndicators="true"
              indicatorsType="Fraction"
              autoPlay="true"
              interval="3000">
    <e-carousel-items>
        <e-carousel-item template="#frac1"></e-carousel-item>
        <e-carousel-item template="#frac2"></e-carousel-item>
        <e-carousel-item template="#frac3"></e-carousel-item>
        <e-carousel-item template="#frac4"></e-carousel-item>
        <e-carousel-item template="#frac5"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Fraction indicator shows current position as "2 / 5" format.
</p>
```

### Progress Indicator

Progress bar showing how far through the carousel you are:

```html
<ejs-carousel id="progressIndicatorCarousel"
              showIndicators="true"
              indicatorsType="Progress"
              autoPlay="true"
              interval="2000">
    <e-carousel-items>
        <e-carousel-item template="#prog1"></e-carousel-item>
        <e-carousel-item template="#prog2"></e-carousel-item>
        <e-carousel-item template="#prog3"></e-carousel-item>
        <e-carousel-item template="#prog4"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Progress indicator shows a bar indicating position in the carousel sequence.
</p>
```

### Comparison of All Indicator Types

```html
<div class="indicator-comparison">
    <div class="comparison-item">
        <h4>Default (Dots)</h4>
        <ejs-carousel showIndicators="true" indicatorsType="Default" autoPlay="false" height="150px">
            <e-carousel-items>
                <e-carousel-item template="#comp1"></e-carousel-item>
                <e-carousel-item template="#comp2"></e-carousel-item>
                <e-carousel-item template="#comp3"></e-carousel-item>
            </e-carousel-items>
        </ejs-carousel>
    </div>
    
    <div class="comparison-item">
        <h4>Dynamic</h4>
        <ejs-carousel showIndicators="true" indicatorsType="Dynamic" autoPlay="false" height="150px">
            <e-carousel-items>
                <e-carousel-item template="#comp1"></e-carousel-item>
                <e-carousel-item template="#comp2"></e-carousel-item>
                <e-carousel-item template="#comp3"></e-carousel-item>
            </e-carousel-items>
        </ejs-carousel>
    </div>
    
    <div class="comparison-item">
        <h4>Fraction</h4>
        <ejs-carousel showIndicators="true" indicatorsType="Fraction" autoPlay="false" height="150px">
            <e-carousel-items>
                <e-carousel-item template="#comp1"></e-carousel-item>
                <e-carousel-item template="#comp2"></e-carousel-item>
                <e-carousel-item template="#comp3"></e-carousel-item>
            </e-carousel-items>
        </ejs-carousel>
    </div>
    
    <div class="comparison-item">
        <h4>Progress</h4>
        <ejs-carousel showIndicators="true" indicatorsType="Progress" autoPlay="false" height="150px">
            <e-carousel-items>
                <e-carousel-item template="#comp1"></e-carousel-item>
                <e-carousel-item template="#comp2"></e-carousel-item>
                <e-carousel-item template="#comp3"></e-carousel-item>
            </e-carousel-items>
        </ejs-carousel>
    </div>
</div>

<style>
.indicator-comparison {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.comparison-item {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
    background: #fafafa;
}

.comparison-item h4 {
    margin: 0 0 10px 0;
    font-size: 13px;
    font-weight: 600;
    color: #333;
}
</style>
```

## Indicator Templates

### Custom Indicator Template

Create custom indicator UI:

```html
<ejs-carousel id="customIndicatorCarousel"
              showIndicators="true"
              indicatorsTemplate="#customIndicatorTemplate"
              autoPlay="true"
              interval="3000"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#cind1"></e-carousel-item>
        <e-carousel-item template="#cind2"></e-carousel-item>
        <e-carousel-item template="#cind3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="customIndicatorTemplate" type="text/x-template">
    <button class="custom-indicator" title="Go to slide">●</button>
</script>

<style>
.custom-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    cursor: pointer;
    padding: 3px;
    margin: 0 6px;
    transition: all 0.3s ease;
}

.custom-indicator.e-active {
    background: white;
    width: 24px;
    border-radius: 6px;
}

.custom-indicator:hover {
    background: rgba(255, 255, 255, 0.8);
}
</style>
```

### Text Label Indicators

Show slide titles as indicators:

```html
<ejs-carousel id="labelIndicatorCarousel"
              showIndicators="true"
              indicatorsTemplate="#labelIndicatorTemplate"
              autoPlay="false"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#label1" data-title="First"></e-carousel-item>
        <e-carousel-item template="#label2" data-title="Second"></e-carousel-item>
        <e-carousel-item template="#label3" data-title="Third"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="labelIndicatorTemplate" type="text/x-template">
    <button class="text-indicator">${0}</button>
</script>

<style>
.text-indicator {
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    margin: 4px;
    transition: all 0.3s;
}

.text-indicator:hover {
    background: rgba(0, 0, 0, 0.6);
}

.text-indicator.e-active {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
    font-weight: 600;
}
</style>
```

## Indicator Previews

### Thumbnail Previews in Indicators

Show image previews in place of standard indicators:

```html
<ejs-carousel id="previewCarousel"
              showIndicators="true"
              indicatorsTemplate="#previewTemplate"
              autoPlay="false"
              height="400px">
    <e-carousel-items>
        <e-carousel-item template="#prev1"></e-carousel-item>
        <e-carousel-item template="#prev2"></e-carousel-item>
        <e-carousel-item template="#prev3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="previewTemplate" type="text/x-template">
    <button class="preview-indicator">
        <img src="${data-thumb}" alt="Preview" />
    </button>
</script>

<style>
.preview-indicator {
    width: 50px;
    height: 50px;
    padding: 0;
    border: 3px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    background: none;
    transition: all 0.3s;
    margin: 5px;
}

.preview-indicator img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.preview-indicator:hover {
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
}

.preview-indicator.e-active {
    border-color: white;
    box-shadow: 0 0 0 2px white;
}
</style>
```

## Play/Pause Button

### Show Play Button

Enable user control of auto-play:

```html
<ejs-carousel id="playButtonCarousel"
              autoPlay="true"
              interval="3000"
              showPlayButton="true"
              buttonsVisibility="Visible"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#play1"></e-carousel-item>
        <e-carousel-item template="#play2"></e-carousel-item>
        <e-carousel-item template="#play3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Click the play/pause button to control auto-play. Button must be enabled with <code>show-play-button="true"</code>.
</p>
```

### Custom Play Button Template

Customize play/pause button appearance:

```html
<ejs-carousel id="customPlayCarousel"
              autoPlay="true"
              showPlay-button="true"
              playButtonTemplate="#customPlayTemplate"
              buttonsVisibility="Visible"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#cp1"></e-carousel-item>
        <e-carousel-item template="#cp2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="customPlayTemplate" type="text/x-template">
    <button class="custom-play-btn" title="Play / Pause">
        <span class="play-icon">●</span>
    </button>
</script>

<style>
.custom-play-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #333;
    transition: all 0.3s;
}

.custom-play-btn:hover {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-play-btn .play-icon {
    font-size: 12px;
}

.custom-play-btn.e-pause .play-icon::after {
    content: ' ❚❚';
}
</style>
```

## Responsive Navigation

### Mobile-Friendly Navigation

Adapt navigation for mobile devices:

```html
<ejs-carousel id="responsiveCarousel"
              buttonsVisibility="VisibleOnHover"
              autoPlay="true"
              showIndicators="true"
              enableTouchSwipe="true">
    <e-carousel-items>
        <e-carousel-item template="#resp1"></e-carousel-item>
        <e-carousel-item template="#resp2"></e-carousel-item>
        <e-carousel-item template="#resp3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<style>
/* Mobile default: buttons hidden, swipe enabled */
@media (max-width: 768px) {
    /* Buttons appear on hover for better touch interaction */
    #responsiveCarousel .e-carousel-button {
        opacity: 0.7;
    }
}

/* Tablet and up: buttons always visible */
@media (min-width: 992px) {
    #responsiveCarousel .e-carousel-button {
        opacity: 1;
    }
}
</style>
```

### Touch-Optimized Buttons

Larger buttons for touch devices:

```html
<style>
#responsiveCarousel .e-carousel-button {
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
}

@media (min-width: 768px) {
    #responsiveCarousel .e-carousel-button {
        min-width: 50px;
        min-height: 50px;
    }
}
</style>
```

## Accessibility

### Keyboard Navigation

- **Left Arrow** – Previous slide
- **Right Arrow** – Next slide
- **Home** – First slide
- **End** – Last slide
- **Enter/Space** – Activate buttons/indicators

### ARIA Labels

Enable keyboard navigation:

```html
<ejs-carousel id="a11yCarousel"
              allowKeyboardInteraction="true"
              buttonsVisibility="Visible"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#a1"></e-carousel-item>
        <e-carousel-item template="#a2"></e-carousel-item>
        <e-carousel-item template="#a3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="color: #666; font-size: 13px;">
    Keyboard navigation enabled: Use arrow keys to navigate, Enter to activate buttons.
</p>
```

### Screen Reader Support

The carousel includes proper ARIA attributes for screen readers. Ensure:

1. Set meaningful `alt` text on images
2. Use semantic HTML in templates
3. Label buttons with `title` attributes
4. Test with screen reader (NVDA, JAWS, VoiceOver)

---

**Next Steps:** Review [API Reference](api-reference.md) for complete property documentation, or check [Populating Items](populating-items.md) for data binding techniques.
