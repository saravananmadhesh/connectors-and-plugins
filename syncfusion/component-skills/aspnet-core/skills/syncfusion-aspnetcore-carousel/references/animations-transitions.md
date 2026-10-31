# Animations and Transitions in Carousel Control

## Table of Contents
- [Animation Effects](#animation-effects)
- [Slide Intervals](#slide-intervals)
- [Auto-Play Configuration](#autoPlay-configuration)
- [Pause on Hover](#pause-on-hover)
- [Looping Behavior](#looping-behavior)
- [Touch and Mouse Swiping](#touch-and-mouse-swiping)
- [Slide Change Events](#slide-change-events)
- [Custom Animation](#custom-animation)

## Animation Effects

### Built-in Animation Types

The Carousel component provides built-in animation effects controlled via the `animationEffect` property:

**Animation Effect Values:**

- **`Slide`** – Items slide horizontally; smooth horizontal transition (default)
- **`Fade`** – Items fade in/out; smooth opacity transition
- **`None`** – No animation; instant transition
- **`Custom`** – Apply custom CSS animations via `cssClass` property

### Slide Animation (Default)

The default smooth horizontal transition:

```html
<ejs-carousel id="slideCarousel"
              animationEffect="Slide"
              autoPlay="true"
              interval="3000"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#slide1"></e-carousel-item>
        <e-carousel-item template="#slide2"></e-carousel-item>
        <e-carousel-item template="#slide3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="slide1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 1 - Smooth Horizontal</h1>
    </div>
</script>

<script id="slide2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 2 - Smooth Horizontal</h1>
    </div>
</script>

<script id="slide3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 3 - Smooth Horizontal</h1>
    </div>
</script>
```

### Fade Animation

Cross-fade effect between slides:

```html
<ejs-carousel id="fadeCarousel"
              animationEffect="Fade"
              autoPlay="true"
              interval="2500"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#fade1"></e-carousel-item>
        <e-carousel-item template="#fade2"></e-carousel-item>
        <e-carousel-item template="#fade3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="fade1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Fade 1</h1>
    </div>
</script>

<script id="fade2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Fade 2</h1>
    </div>
</script>

<script id="fade3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Fade 3</h1>
    </div>
</script>
```

### No Animation

Instant transitions without effects:

```html
<ejs-carousel id="noAnimCarousel"
              animationEffect="None"
              autoPlay="true"
              interval="2000"
              height="250px">
    <e-carousel-items>
        <e-carousel-item template="#instant1"></e-carousel-item>
        <e-carousel-item template="#instant2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

## Slide Intervals

### Global Interval

Set the default transition interval for all slides (milliseconds):

```html
<!-- 3 second interval (3000 milliseconds) -->
<ejs-carousel id="intervalCarousel"
              autoPlay="true"
              interval="3000"
              animationEffect="Slide">
    <e-carousel-items>
        <e-carousel-item template="#item1"></e-carousel-item>
        <e-carousel-item template="#item2"></e-carousel-item>
        <e-carousel-item template="#item3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

**Common Interval Values:**

- `2000` – 2 seconds (fast)
- `3000` – 3 seconds (standard)
- `4000` – 4 seconds (moderate)
- `5000` – 5 seconds (slow, for complex content)
- `10000` – 10 seconds (very slow for detailed content)

### Per-Item Interval

Override interval for individual slides:

```html
<ejs-carousel id="variableIntervalCarousel"
              autoPlay="true"
              buttonsVisibility="Hidden"
              height="280px">
    <e-carousel-items>
        <!-- Announcement - quick transition -->
        <e-carousel-item template="#announcement" interval="2000"></e-carousel-item>
        
        <!-- Main content - normal -->
        <e-carousel-item template="#main" interval="4000"></e-carousel-item>
        
        <!-- Call-to-action - show longer -->
        <e-carousel-item template="#cta" interval="6000"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="announcement" type="text/x-template">
    <div style="background: #ffc107; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;text-align: center;">
        <h2 style="margin: 0; color: #333;">⚡ Breaking News (2 sec)</h2>
    </div>
</script>

<script id="main" type="text/x-template">
    <div style="background: #27ae60; height: 100%; display: flex; align-items: center; justify-content: center;">
        <h2 style="color: white; margin: 0;">Main Content (4 sec)</h2>
    </div>
</script>

<script id="cta" type="text/x-template">
    <div style="background: #e74c3c; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 20px; text-align: center;">
        <h2 style="color: white; margin: 0 0 15px 0;">Special Offer! (6 sec)</h2>
        <button style="background: white; color: #e74c3c; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">Learn More</button>
    </div>
</script>
```

## AutoPlay Configuration

### Enable Auto-Play

Automatically transition slides:

```html
<ejs-carousel id="autoplayCarousel"
              autoPlay="true"
              interval="4000"
              animation-effect="Slide">
    <e-carousel-items>
        <e-carousel-item template="#auto1"></e-carousel-item>
        <e-carousel-item template="#auto2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

### Disable Auto-Play

Manual navigation only (no automatic transitions):

```html
<ejs-carousel id="manualCarousel"
              autoPlay="false"
              buttons-visibility="Visible"
              show-indicators="true">
    <e-carousel-items>
        <e-carousel-item template="#manual1"></e-carousel-item>
        <e-carousel-item template="#manual2"></e-carousel-item>
        <e-carousel-item template="#manual3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; margin-top: 20px; color: #666;">
    Click the previous/next buttons or indicators to navigate manually.
</p>
```

## Pause on Hover

### Pause Auto-Play on Hover (Default)

By default, autoPlay pauses when user hovers over carousel:

```html
<!-- Auto-play pauses on hover (default behavior) -->
<ejs-carousel id="pauseOnHoverCarousel"
              autoPlay="true"
              pauseOnHover="true"
              interval="3000">
    <e-carousel-items>
        <e-carousel-item template="#hover1"></e-carousel-item>
        <e-carousel-item template="#hover2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #999; font-size: 13px;">
    Hover over carousel to pause autoPlay. Auto-play resumes when you leave.
</p>
```

### Disable Pause on Hover

Continue autoPlay even when hovering:

```html
<ejs-carousel id="noPauseCarousel"
              autoPlay="true"
              pauseOnHover="false"
              interval="3000">
    <e-carousel-items>
        <e-carousel-item template="#nopause1"></e-carousel-item>
        <e-carousel-item template="#nopause2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #999; font-size: 13px;">
    Auto-play continues even when hovering. Carousel does not pause.
</p>
```

## Looping Behavior

### Enable Looping (Default)

Cycles continuously from last slide back to first:

```html
<ejs-carousel id="loopCarousel"
              autoPlay="true"
              loop="true"
              interval="2500"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#loop1"></e-carousel-item>
        <e-carousel-item template="#loop2"></e-carousel-item>
        <e-carousel-item template="#loop3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    When reaching the last slide, carousel loops back to the first slide automatically.
</p>
```

### Disable Looping

Stop at last slide; autoPlay doesn't continue:

```html
<ejs-carousel id="noLoopCarousel"
              autoPlay="true"
              loop="false"
              interval="2500"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#noloop1"></e-carousel-item>
        <e-carousel-item template="#noloop2"></e-carousel-item>
        <e-carousel-item template="#noloop3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Auto-play stops at the last slide. Manual navigation via buttons still works.
</p>
```

## Touch and Mouse Swiping

### Enable Touch Swipe (Default)

Allow users to swipe slides on touch devices:

```html
<ejs-carousel id="swipeCarousel"
              enableTouchSwipe="true"
              autoPlay="true"
              buttonsVisibility="Hidden">
    <e-carousel-items>
        <e-carousel-item template="#swipe1"></e-carousel-item>
        <e-carousel-item template="#swipe2"></e-carousel-item>
        <e-carousel-item template="#swipe3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    On touch devices, swipe left/right to navigate slides.
</p>
```

### Disable Touch Swipe

Prevent swiping (useful when carousel contains form inputs):

```html
<ejs-carousel id="noSwipeCarousel"
              enableTouchSwipe="false"
              autoPlay="true"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#form1"></e-carousel-item>
        <e-carousel-item template="#form2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<p style="text-align: center; color: #666; font-size: 13px;">
    Swiping is disabled. Use buttons or indicators to navigate.
</p>
```

### Swipe Modes (Touch and Mouse)

Control which interactions enable swiping:

```html
<!-- Touch only (mobile) -->
<ejs-carousel id="touchOnlyCarousel"
              swapMode="Touch"
              enableTouchSwipe="true">
</ejs-carousel>

<!-- Mouse only (desktop drag) -->
<ejs-carousel id="mouseOnlyCarousel"
              swapMode="Mouse"
              enableTouchSwipe="true">
</ejs-carousel>

<!-- Both touch and mouse -->
<ejs-carousel id="bothCarousel"
              swapMode="Touch, Mouse"
              enableTouchSwipe="true">
</ejs-carousel>

<!-- Disable both -->
<ejs-carousel id="noSwipeCarousel"
              swapMode="None"
              enableTouchSwipe="false">
</ejs-carousel>
```

## Slide Change Events

### Handle Slide Changing Event

Triggered BEFORE slide transition occurs. Cancel transition if needed:

```html
<ejs-carousel id="changingCarousel"
              slideChanging="onSlideChanging"
              autoPlay="true"
              showIndicators="true">
    <e-carousel-items>
        <e-carousel-item template="#changing1"></e-carousel-item>
        <e-carousel-item template="#changing2"></e-carousel-item>
        <e-carousel-item template="#changing3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<div id="slidingInfo" style="text-align: center; margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
    <p id="infoText">Carousel ready</p>
</div>

<script>
function onSlideChanging(args) {
    // args.currentIndex - current slide index
    // args.nextIndex - next slide index  
    // args.isSwiped - true if swiped, false if autoPlay/button click
    // args.slideDirection - direction of transition
    // args.cancel - set to true to prevent transition
    
    var infoElement = document.getElementById("infoText");
    
    // Example: Prevent transition to slide with certain index
    if (args.nextIndex === 2) {
        // infoElement.innerHTML = "Skipped slide 3";
        // args.cancel = true;  // Uncomment to prevent transition
    }
    
    infoElement.innerHTML = "Transitioning from slide " + (args.currentIndex + 1) + " to " + (args.nextIndex + 1);
    
    if (args.isSwiped) {
        infoElement.innerHTML += " (via swipe)";
    }
}
</script>
```

### Handle Slide Changed Event

Triggered AFTER slide transition completes:

```html
<ejs-carousel id="changedCarousel"
              slideChanged="onSlideChanged"
              autoPlay="true">
    <e-carousel-items>
        <e-carousel-item template="#changed1"></e-carousel-item>
        <e-carousel-item template="#changed2"></e-carousel-item>
        <e-carousel-item template="#changed3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<div id="changedInfo" style="text-align: center; margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 4px;">
    <p id="changedText">Slide 1 active</p>
</div>

<script>
var slideViews = [0, 0, 0]; // Track view count for each slide

function onSlideChanged(args) {
    // args.currentIndex - current (now active) slide index
    // args.previousIndex - previous slide index
    // args.currentSlide - HTMLElement of current slide
    // args.previousSlide - HTMLElement of previous slide
    // args.isSwiped - true if user swiped
    // args.slideDirection - direction (Next/Previous)
    
    // Track slide views
    slideViews[args.currentIndex]++;
    
    var currentSlideNum = args.currentIndex + 1;
    var infoElement = document.getElementById("changedText");
    infoElement.innerHTML = "Slide " + currentSlideNum + " is now active (viewed " + slideViews[args.currentIndex] + " times)";
}
</script>
```

### Full Event Example with Logging

Track all slide transitions:

```html
<ejs-carousel id="logCarousel"
              slideChanging="onChanging"
              slideChanged="onChanged"
              autoPlay="true"
              interval="3000">
    <e-carousel-items>
        <e-carousel-item template="#log1"></e-carousel-item>
        <e-carousel-item template="#log2"></e-carousel-item>
        <e-carousel-item template="#log3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<div id="eventLog" style="margin-top: 20px; max-height: 200px; overflow-y: auto; background: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">
    <p style="margin: 0; color: #999;">(Event log appears here)</p>
</div>

<script>
var log = [];

function addLogEntry(message) {
    log.push(new Date().toLocaleTimeString() + ": " + message);
    if (log.length > 10) log.shift(); // Keep last 10 entries
    
    var logElement = document.getElementById("eventLog");
    logElement.innerHTML = log.map(entry => '<p style="margin: 2px 0; color: #333;">'+ entry + '</p>').join('');
    logElement.scrollTop = logElement.scrollHeight;
}

function onChanging(args) {
    addLogEntry("slideChanging: " + args.currentIndex + " → " + args.nextIndex);
}

function onChanged(args) {
    addLogEntry("slideChanged: now at index " + args.currentIndex);
}
</script>
```

## Custom Animation

### Custom CSS Animation

Apply custom animations using `animationEffect="Custom"` and `cssClass`:

```html
<ejs-carousel id="customCarousel"
              animationEffect="Custom"
              cssClass="custom-animation"
              autoPlay="true"
              interval="3000"
              height="300px">
    <e-carousel-items>
        <e-carousel-item template="#custom1"></e-carousel-item>
        <e-carousel-item template="#custom2"></e-carousel-item>
        <e-carousel-item template="#custom3"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="custom1" type="text/x-template">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 1</h1>
    </div>
</script>

<script id="custom2" type="text/x-template">
    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 2</h1>
    </div>
</script>

<script id="custom3" type="text/x-template">
    <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); height: 100%; display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; margin: 0;">Slide 3</h1>
    </div>
</script>

<style>
.custom-animation.e-carousel .e-carousel-item {
    animation: scaleIn 0.6s ease-in-out;
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.custom-animation.e-carousel .e-carousel-item .prev {
    animation: rotateOut 0.6s ease-in-out;
}

@keyframes rotateOut {
    from {
        transform: rotateY(0);
        opacity: 1;
    }
    to {
        transform: rotateY(90deg);
        opacity: 0;
    }
}
</style>
```

### Parallax Animation

Create a parallax effect with multiple layers:

```html
<ejs-carousel id="parallaxCarousel"
              animationEffect="Custom"
              cssClass="parallax-carousel"
              autoPlay="false"
              showIndicators="true"
              height="400px">
    <e-carousel-items>
        <e-carousel-item template="#parallax1"></e-carousel-item>
        <e-carousel-item template="#parallax2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>

<script id="parallax1" type="text/x-template">
    <div class="parallax-slide">
        <div class="parallax-layer bg-far" style="background-image: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"3\" fill=\"%23999\"/></svg>');"></div>
        <div class="parallax-layer bg-mid" style="background-color: #667eea;"></div>
        <div class="parallax-layer bg-near">
            <h1 style="color: white; margin: 0;">Parallax 1</h1>
        </div>
    </div>
</script>

<style>
.parallax-carousel .e-carousel-item {
    perspective: 1000px;
}

.parallax-slide {
    height: 100%;
    position: relative;
    overflow: hidden;
}

.parallax-layer {
    position: absolute;
    width: 100%;
    height: 100%;
}

.bg-far {
    transform: translateZ(-200px) scale(1.3);
}

.bg-mid {
    opacity: 0.7;
}

.bg-near {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}
</style>
```

---

**Next Steps:** Review [Navigation Controls and Indicators](navigation-indicators.md) for UI customization, or check [Populating Items](populating-items.md) for data binding techniques.
