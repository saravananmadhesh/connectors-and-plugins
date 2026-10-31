# Carousel API Reference

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Enumerations](#enumerations)
- [Event Arguments](#event-arguments)
- [TagHelper Attributes](#taghelper-attributes)

## Properties

Complete reference of all Carousel component properties:

### allowKeyboardInteraction

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether to enable keyboard actions or not. When form input components are placed on carousel slides, disabling keyboard interaction prevents unintended navigation with arrow keys.

**TagHelper Syntax:**
```html
<ejs-carousel allowKeyboardInteraction="true"></ejs-carousel>
```

**JavaScript API:**
```csharp
// Set via property
carousel.allowKeyboardInteraction = false;
```

**Use Cases:**
- Disable when carousel contains form inputs (text boxes, dropdowns)
- Keep enabled for presentation/gallery mode
- Helpful for accessibility on mobile devices

---

### animationEffect

**Type:** `CarouselAnimationEffect` (enum)

**Default:** `Slide`

**Allowed Values:** `None`, `Slide`, `Fade`, `Custom`

**Description:** Specifies the type of animation effect applied during slide transitions.

**TagHelper Syntax:**
```html
<ejs-carousel animationEffect="Slide"></ejs-carousel>
<ejs-carousel animationEffect="Fade"></ejs-carousel>
<ejs-carousel animationEffect="None"></ejs-carousel>
<ejs-carousel animationEffect="Custom"></ejs-carousel>
```

**Examples:**
- **Slide** – Horizontal smooth transition (recommended for most use cases)
- **Fade** – Cross-fade opacity transition (good for content galleries)
- **None** – Instant change (lightweight, fast)
- **Custom** – Requires `cssClass` with custom CSS animations

---

### autoPlay

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether the slide transition is automatic or manual.

**TagHelper Syntax:**
```html
<ejs-carousel autoPlay="true"></ejs-carousel>
<ejs-carousel autoPlay="false"></ejs-carousel>
```

**Related Properties:** `interval`, `pauseOnHover`

---

### buttonsVisibility

**Type:** `CarouselButtonVisibility` (enum)

**Default:** `Visible`

**Allowed Values:** `Visible`, `Hidden`, `VisibleOnHover`

**Description:** Defines how to show the previous, next and play pause buttons visibility.

**TagHelper Syntax:**
```html
<!-- Buttons always visible -->
<ejs-carousel buttonsVisibility="Visible"></ejs-carousel>

<!-- Buttons never visible -->
<ejs-carousel buttonsVisibility="Hidden"></ejs-carousel>

<!-- Buttons visible only on hover -->
<ejs-carousel buttonsVisibility="VisibleOnHover"></ejs-carousel>
```

**Use Cases:**
- `Visible` – Standard galleries, e-commerce
- `Hidden` – Touch-focused mobile experiences
- `VisibleOnHover` – Minimal/clean desktop interfaces

---

### cssClass

**Type:** `string`

**Default:** `null`

**Description:** Accepts single/multiple classes (separated by space) to be used for carousel customization.

**TagHelper Syntax:**
```html
<ejs-carousel cssClass="branded-carousel landing-section"></ejs-carousel>
```

**Example:**
```css
.branded-carousel {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.landing-section .e-carousel {
    margin: 40px 0;
}
```

---

### dataSource

**Type:** `Record[]`

**Default:** `null`

**Description:** Specifies the datasource for the carousel items. Use with `itemTemplate` for uniform rendering.

**TagHelper Syntax:**
```html
<ejs-carousel dataSource="@Model.SlideItems"
              itemTemplate="#slideTemplate">
</ejs-carousel>
```

**C# Model:**
```csharp
public class SlideItem {
    public int Id { get; set; }
    public string Title { get; set; }
    public string ImageUrl { get; set; }
}

public List<SlideItem> SlideItems { get; set; }
```

**Template:**
```html
<script id="slideTemplate" type="text/x-template">
    <img src="${ImageUrl}" alt="${Title}" />
</script>
```

---

### enablePersistence

**Type:** `boolean`

**Default:** `false`

**Description:** Enable or disable persisting component's state (current slide, auto-play status) between page reloads.

**TagHelper Syntax:**
```html
<ejs-carousel enablePersistence="true"></ejs-carousel>
```

**Browser Storage:** Uses `localStorage` with key format: `{componentId}_persist`

---

### enableRtl

**Type:** `boolean`

**Default:** `false`

**Description:** Enable or disable rendering component in right to left direction. Useful for Arabic, Hebrew, and other RTL languages.

**TagHelper Syntax:**
```html
<!-- LTR (Left-to-Right) - Default -->
<ejs-carousel enableRtl="false"></ejs-carousel>

<!-- RTL (Right-to-Left) -->
<ejs-carousel enableRtl="true"></ejs-carousel>
```

**Effects:**
- Navigation buttons flip horizontally
- Slide direction reverses
- Text alignment adjusts
- Cultural expectations respected

---

### enableTouchSwipe

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether to enable swipe action in touch devices or not. Use `swipeMode` for granular control.

**TagHelper Syntax:**
```html
<!-- Enable swiping on touch devices -->
<ejs-carousel enableTouchSwipe="true"></ejs-carousel>

<!-- Disable swiping (useful with form inputs) -->
<ejs-carousel enableTouchSwipe="false"></ejs-carousel>
```

**Related:** `swipeMode` for combined touch/mouse control

---

### height

**Type:** `string | number`

**Default:** `auto`

**Description:** Specifies the height of the Carousel in pixels/number/percentage. Number value is considered as pixels.

**TagHelper Syntax:**
```html
<!-- Pixels (numeric) -->
<ejs-carousel height="300"></ejs-carousel>

<!-- Pixels (string) -->
<ejs-carousel height="300px"></ejs-carousel>

<!-- Percentage -->
<ejs-carousel height="50%"></ejs-carousel>

<!-- Viewport height -->
<ejs-carousel height="100vh"></ejs-carousel>
```

---

### htmlAttributes

**Type:** `Record`

**Default:** `null`

**Description:** Accepts HTML attributes/custom attributes to add to the carousel element.

**TagHelper Syntax:**
```html
<ejs-carousel htmlAttributes='new Dictionary<string, object> { 
    { "data-carousel-id", "gallery-1" },
    { "aria-label", "Product Gallery" }
}'>
</ejs-carousel>
```

---

### indicatorsTemplate

**Type:** `string | Function`

**Default:** `null`

**Description:** Accepts the template for indicator buttons. Use for custom indicator UI.

**TagHelper Syntax:**
```html
<ejs-carousel showIndicators="true"
              indicatorsTemplate="#customIndicator">
</ejs-carousel>

<script id="customIndicator" type="text/x-template">
    <button class="custom-dot">●</button>
</script>
```

---

### indicatorsType

**Type:** `CarouselIndicatorsType` (enum)

**Default:** `Default`

**Allowed Values:** `Default`, `Dynamic`, `Fraction`, `Progress`

**Description:** Specifies the type of indicators displayed.

**TagHelper Syntax:**
```html
<!-- Dot indicators (default) -->
<ejs-carousel indicatorsType="Default"></ejs-carousel>

<!-- Animated dynamic indicators -->
<ejs-carousel indicatorsType="Dynamic"></ejs-carousel>

<!-- Fraction display (e.g., "2 / 5") -->
<ejs-carousel indicatorsType="Fraction"></ejs-carousel>

<!-- Progress bar indicators -->
<ejs-carousel indicatorsType="Progress"></ejs-carousel>
```

**Use Cases:**
- `Default` – Standard galleries, most common
- `Dynamic` – Modern animated UI
- `Fraction` – Numerical position tracking
- `Progress` – Sequential progress visualization

---

### interval

**Type:** `number`

**Default:** `5000`

**Description:** Specifies the interval duration in milliseconds for carousel item transition. Per-item intervals can override this.

**TagHelper Syntax:**
```html
<!-- 3 second interval -->
<ejs-carousel interval="3000"></ejs-carousel>

<!-- 5 second interval -->
<ejs-carousel interval="5000"></ejs-carousel>

<!-- 1 second (fast) -->
<ejs-carousel interval="1000"></ejs-carousel>
```

**Per-Item Override:**
```html
<e-carousel-item template="#item1" interval="2000"></e-carousel-item>
<e-carousel-item template="#item2" interval="5000"></e-carousel-item>
```

---

### itemTemplate

**Type:** `string | Function`

**Default:** `null`

**Description:** Specifies the template option for carousel items when using data source binding. All items use same template.

**TagHelper Syntax:**
```html
<ejs-carousel dataSource="@Model.Items"
              itemTemplate="#itemTemplate">
</ejs-carousel>

<script id="itemTemplate" type="text/x-template">
    <div class="item-content">
        <img src="${ImageUrl}" alt="${Title}" />
        <h3>${Title}</h3>
    </div>
</script>
```

---

### items

**Type:** `CarouselItemModel[]`

**Default:** `[]`

**Description:** Allows defining the collection of carousel items to be displayed. Use `<e-carousel-items>` in TagHelper.

**TagHelper Syntax:**
```html
<ejs-carousel>
    <e-carousel-items>
        <e-carousel-item template="#item1"></e-carousel-item>
        <e-carousel-item template="#item2"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

---

### locale

**Type:** `string`

**Default:** `en-US`

**Description:** Overrides the global culture and localization value for this component.

**TagHelper Syntax:**
```html
<!-- English -->
<ejs-carousel locale="en-US"></ejs-carousel>

<!-- Arabic -->
<ejs-carousel locale="ar"></ejs-carousel>

<!-- French -->
<ejs-carousel locale="fr-FR"></ejs-carousel>
```

---

### loop

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether the slide transitions loop end or not. When false, transitions stop at last slide.

**TagHelper Syntax:**
```html
<!-- Enable looping (default) -->
<ejs-carousel loop="true"></ejs-carousel>

<!-- Disable looping -->
<ejs-carousel loop="false"></ejs-carousel>
```

---

### nextButtonTemplate

**Type:** `string | Function`

**Default:** `null`

**Description:** Accepts the template for next navigation button.

**TagHelper Syntax:**
```html
<ejs-carousel nextButtonTemplate="#nextBtn">
</ejs-carousel>

<script id="nextBtn" type="text/x-template">
    <button class="custom-next">Next ➜</button>
</script>
```

---

### partialVisible

**Type:** `boolean`

**Default:** `false`

**Description:** Enables active slide with partial previous/next slides visible. Slide animation only works when enabled.

**TagHelper Syntax:**
```html
<ejs-carousel partialVisible="true"
              animationEffect="Slide">
</ejs-carousel>
```

**Requirements:** Must enable `animationEffect="Slide"` or animation won't work with partial visibility.

---

### pauseOnHover

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether the slide transition gets paused on hover or not.

**TagHelper Syntax:**
```html
<!-- Pause on hover (default) -->
<ejs-carousel pauseOnHover="true"></ejs-carousel>

<!-- Continue playing on hover -->
<ejs-carousel pauseOnHover="false"></ejs-carousel>
```

---

### playButtonTemplate

**Type:** `string | Function`

**Default:** `null`

**Description:** Accepts the template for play/pause button.

**TagHelper Syntax:**
```html
<ejs-carousel showPlayButton="true"
              playButtonTemplate="#playBtn">
</ejs-carousel>

<script id="playBtn" type="text/x-template">
    <button class="custom-play">▶ Play</button>
</script>
```

---

### previousButtonTemplate

**Type:** `string | Function`

**Default:** `null`

**Description:** Accepts the template for previous navigation button.

**TagHelper Syntax:**
```html
<ejs-carousel previousButtonTemplate="#prevBtn">
</ejs-carousel>

<script id="prevBtn" type="text/x-template">
    <button class="custom-prev">◀ Prev</button>
</script>
```

---

### selectedIndex

**Type:** `number`

**Default:** `0`

**Description:** Specifies index of the current carousel item (0-based).

**TagHelper Syntax:**
```html
<!-- Start at first slide (default) -->
<ejs-carousel selectedIndex="0"></ejs-carousel>

<!-- Start at third slide -->
<ejs-carousel selectedIndex="2"></ejs-carousel>
```

**JavaScript Update:**
```csharp
carousel.selectedIndex = 3;  // Jump to 4th slide
```

---

### showIndicators

**Type:** `boolean`

**Default:** `true`

**Description:** Defines whether to show the indicator positions or not.

**TagHelper Syntax:**
```html
<!-- Show indicators (default) -->
<ejs-carousel showIndicators="true"></ejs-carousel>

<!-- Hide indicators -->
<ejs-carousel showIndicators="false"></ejs-carousel>
```

---

### showPlayButton

**Type:** `boolean`

**Default:** `false`

**Description:** Shows play/pause button to control auto-play. Depends on `buttonsVisibility`.

**TagHelper Syntax:**
```html
<ejs-carousel autoPlay="true"
              showPlayButton="true"
              buttonsVisibility="Visible">
</ejs-carousel>
```

**Requirement:** Must have `buttonsVisibility` not set to `Hidden`.

---

### swipeMode

**Type:** `CarouselSwipeMode` (bitwise enum)

**Default:** `Touch | Mouse`

**Allowed Values:** `Touch`, `Mouse`, `Touch | Mouse`, `None`

**Description:** Specifies which interaction types enable slide swiping.

**TagHelper Syntax:**
```html
<!-- Both touch and mouse (default) -->
<ejs-carousel swipeMode="Touch, Mouse"></ejs-carousel>

<!-- Touch only (mobile) -->
<ejs-carousel swipeMode="Touch"></ejs-carousel>

<!-- Mouse only (desktop) -->
<ejs-carousel swipeMode="Mouse"></ejs-carousel>

<!-- Disable both -->
<ejs-carousel swipeMode="None"></ejs-carousel>
```

---

### width

**Type:** `string | number`

**Default:** `auto`

**Description:** Specifies the width of the Carousel. Number value is considered as pixels.

**TagHelper Syntax:**
```html
<!-- Fixed width in pixels -->
<ejs-carousel width="600"></ejs-carousel>

<!-- Percentage width -->
<ejs-carousel width="100%"></ejs-carousel>

<!-- Max-width CSS -->
<ejs-carousel width="800px"></ejs-carousel>
```

---

## Events

Carousel component events for tracking slide transitions and user interactions:

### slideChanging

**Type:** `EventHandler<SlideChangingEventArgs>`

**Description:** Triggered BEFORE slide transition occurs. Can be cancelled.

**Event Arguments:**
- `cancel` (boolean) – Set to true to prevent transition
- `currentIndex` (number) – Current slide index
- `currentSlide` (HTMLElement) – Current slide element
- `nextIndex` (number) – Next slide index to transition to
- `nextSlide` (HTMLElement) – Next slide element
- `isSwiped` (boolean) – True if user swiped, false if auto/button
- `slideDirection` (CarouselSlideDirection) – `Next` or `Previous`

**TagHelper Syntax:**
```html
<ejs-carousel slideChanging="OnSlideChanging"></ejs-carousel>
```

**Razor Page Handler:**
```csharp
public void OnSlideChanging(dynamic args)
{
    // args.currentIndex – current slide
    // args.nextIndex – destination slide
    // args.cancel – prevent transition
}
```

**Example Use Case:** Validate before allowing certain slides, track analytics

### slideChanged

**Type:** `EventHandler<SlideChangedEventArgs>`

**Description:** Triggered AFTER slide transition completes.

**Event Arguments:**
- `currentIndex` (number) – Now-active slide index
- `currentSlide` (HTMLElement) – Now-active slide element
- `previousIndex` (number) – Previous slide index
- `previousSlide` (HTMLElement) – Previous slide element
- `isSwiped` (boolean) – True if user caused transition via swipe
- `slideDirection` (CarouselSlideDirection) – `Next` or `Previous`

**TagHelper Syntax:**
```html
<ejs-carousel slideChanged="OnSlideChanged"></ejs-carousel>
```

**Example Use Case:** Load async content, update page title, track slide views

---

## Enumerations

### CarouselAnimationEffect

Animation effect types for slide transitions:

```
None     = 0       // No animation, instant transition
Slide    = 1       // Horizontal smooth sliding
Fade     = 2       // Cross-fade opacity effect
Custom   = 3       // Custom CSS animation via cssClass
```

### CarouselButtonVisibility

Navigation button visibility modes:

```
Visible        = 0   // Always show
Hidden         = 1   // Never show
VisibleOnHover = 2   // Show only on hover
```

### CarouselIndicatorsType

Indicator style types:

```
Default  = 0   // Dot indicators
Dynamic  = 1   // Animated dynamic indicators
Fraction = 2   // Numerical fraction (X / Y)
Progress = 3   // Progress bar
```

### CarouselSlideDirection

Transition direction:

```
Next     = 0   // Moving to next slide
Previous = 1   // Moving to previous slide
```

### CarouselSwipeMode

Swipe interaction modes (bitwise):

```
Touch = 1             // Enable touch swipe
Mouse = 2             // Enable mouse drag swipe
Touch | Mouse = 3     // Both enabled
None = 0              // Disable swiping
```

---

## Event Arguments

Complete structure of event data:

### SlideChangingEventArgs

Fired before slide transition:

```csharp
public class SlideChangingEventArgs
{
    public bool Cancel { get; set; }           // Set true to prevent
    public int CurrentIndex { get; set; }       // Current index
    public HTMLElement CurrentSlide { get; set; }
    public int NextIndex { get; set; }          // Destination index
    public HTMLElement NextSlide { get; set; }
    public bool IsSwiped { get; set; }          // User swiped?
    public CarouselSlideDirection SlideDirection { get; set; }
    public string Name { get; set; }            // "slideChanging"
}
```

### SlideChangedEventArgs

Fired after slide transition completes:

```csharp
public class SlideChangedEventArgs
{
    public int CurrentIndex { get; set; }       // Now-active index
    public HTMLElement CurrentSlide { get; set; }
    public int PreviousIndex { get; set; }      // Previous index
    public HTMLElement PreviousSlide { get; set; }
    public bool IsSwiped { get; set; }          // User swiped?
    public CarouselSlideDirection SlideDirection { get; set; }
    public string Name { get; set; }            // "slideChanged"
}
```

---

## TagHelper Attributes

Complete list of TagHelper attributes (not case-sensitive, auto-converted):

| Attribute | Type | Example |
|-----------|------|---------|
| `id` | string | `<ejs-carousel id="myCarousel">` |
| `allowKeyboardInteraction` | boolean | `allowKeyboardInteraction="true"` |
| `animationEffect` | enum | `animationEffect="Slide"` |
| `autoPlay` | boolean | `autoPlay="true"` |
| `buttonsVisibility` | enum | `buttonsVisibility="Visible"` |
| `cssClass` | string | `cssClass="custom-carousel"` |
| `dataSource` | collection | `dataSource="@Model.Items"` |
| `enablePersistence` | boolean | `enablePersistence="true"` |
| `enableRtl` | boolean | `enableRtl="false"` |
| `enableTouchSwipe` | boolean | `enableTouchSwipe="true"` |
| `height` | string\|number | `height="300px"` |
| `htmlAttributes` | dictionary | `htmlAttributes='new Dictionary<string, object> {}'` |
| `indicatorsTemplate` | string | `indicatorsTemplate="#customIndicator"` |
| `indicatorsType` | enum | `indicatorsType="Default"` |
| `interval` | number | `interval="3000"` |
| `itemTemplate` | string | `itemTemplate="#itemTemplate"` |
| `locale` | string | `locale="en-US"` |
| `loop` | boolean | `loop="true"` |
| `nextButtonTemplate` | string | `nextButtonTemplate="#nextBtn"` |
| `partialVisible` | boolean | `partialVisible="false"` |
| `pauseOnHover` | boolean | `pauseOnHover="true"` |
| `playButtonTemplate` | string | `playButtonTemplate="#playBtn"` |
| `previousButtonTemplate` | string | `previousButtonTemplate="#prevBtn"` |
| `selectedIndex` | number | `selectedIndex="0"` |
| `showIndicators` | boolean | `showIndicators="true"` |
| `showPlayButton` | boolean | `showPlayButton="false"` |
| `swipeMode` | enum | `swipeMode="Touch, Mouse"` |
| `width` | string\|number | `width="600px"` |
| `slideChanging` | event | `slideChanging="OnSlideChanging"` |
| `slideChanged` | event | `slideChanged="OnSlideChanged"` |

---

**For more detailed examples and usage patterns, refer to the other reference guides in this skill.**
