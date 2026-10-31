# API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Type Definitions](#type-definitions)
- [Item Model](#item-model)

---

## Properties

### Core Properties

#### `items: CarouselItemModel[]`
**Type:** Array of carousel items
**Description:** Collection of carousel items to display in the carousel.
**Default:** Empty array
**Example:**
```typescript
items: [
  { template: '<img src="image1.jpg" />' },
  { template: '<img src="image2.jpg" />' }
]
```

#### `dataSource: Record[]`
**Type:** Array of data objects
**Description:** Specifies the datasource for the carousel items. Used with `itemTemplate` for data binding.
**Default:** null
**Example:**
```typescript
dataSource: [
  { id: 1, image: 'image1.jpg' },
  { id: 2, image: 'image2.jpg' }
]
```

#### `autoPlay: boolean`
**Type:** Boolean
**Description:** Enables or disables automatic slide progression.
**Default:** false
**Example:**
```typescript
autoPlay: true  // Auto-play enabled
```

#### `interval: number`
**Type:** Number (milliseconds)
**Description:** Specifies the interval duration in milliseconds for carousel item transition when autoPlay is enabled.
**Default:** 5000
**Example:**
```typescript
interval: 3000  // Slide changes every 3 seconds
```

#### `loop: boolean`
**Type:** Boolean
**Description:** Defines whether the slide transitions loop end or not. When false, transition stops at last slide.
**Default:** true
**Example:**
```typescript
loop: false  // Stop at last slide
```

#### `selectedIndex: number`
**Type:** Number
**Description:** Specifies the index of the current carousel item (0-based).
**Default:** 0
**Example:**
```typescript
selectedIndex: 2  // Start at third slide
```

### Display Properties

#### `height: string | number`
**Type:** String or Number (pixels)
**Description:** Specifies the height of the Carousel. Number values are treated as pixels.
**Default:** null (auto height)
**Example:**
```typescript
height: "400px"
height: 400  // 400 pixels
height: "100%"
```

#### `width: string | number`
**Type:** String or Number (pixels)
**Description:** Specifies the width of the Carousel. Number values are treated as pixels.
**Default:** null (auto width)
**Example:**
```typescript
width: "100%"
width: 800  // 800 pixels
```

#### `cssClass: string`
**Type:** String
**Description:** Accepts single or multiple CSS classes (space-separated) for carousel customization.
**Default:** null
**Example:**
```typescript
cssClass: "dark-carousel custom-style"
```

#### `htmlAttributes: Record`
**Type:** Object
**Description:** Accepts HTML attributes/custom attributes to add to the carousel element.
**Default:** null
**Example:**
```typescript
htmlAttributes: { 'data-id': '1', 'role': 'region' }
```

### Indicator Properties

#### `showIndicators: boolean`
**Type:** Boolean
**Description:** Defines whether to show indicator positions. Indicators show current slide position.
**Default:** true
**Example:**
```typescript
showIndicators: true
```

#### `indicatorsType: CarouselIndicatorsType`
**Type:** Enum (Default | Dynamic | Fraction | Progress)
**Description:** Specifies the type of indicators to display.
**Default:** Default
**Example:**
```typescript
indicatorsType: "Numeric"  // Shows slide numbers
indicatorsType: "Progress"  // Shows progress bar
```

#### `indicatorsTemplate: string | Function`
**Type:** String or Function
**Description:** Accepts the template for indicator buttons.
**Default:** null
**Example:**
```typescript
indicatorsTemplate: '<span class="custom-indicator"></span>'
```

### Navigation Properties

#### `buttonsVisibility: CarouselButtonVisibility`
**Type:** Enum (Hidden | Visible | VisibleOnHover)
**Description:** Defines how to show previous, next buttons visibility.
**Default:** VisibleOnHover
**Example:**
```typescript
buttonsVisibility: "Visible"  // Always show buttons
```

#### `showPlayButton: boolean`
**Type:** Boolean
**Description:** Defines whether to show play/pause button.
**Default:** true
**Example:**
```typescript
showPlayButton: true
```

#### `previousButtonTemplate: string | Function`
**Type:** String or Function
**Description:** Accepts the template for previous navigation button.
**Default:** null
**Example:**
```typescript
previousButtonTemplate: '<button class="custom-prev">←</button>'
```

#### `nextButtonTemplate: string | Function`
**Type:** String or Function
**Description:** Accepts the template for next navigation button.
**Default:** null
**Example:**
```typescript
nextButtonTemplate: '<button class="custom-next">→</button>'
```

#### `playButtonTemplate: string | Function`
**Type:** String or Function
**Description:** Accepts the template for play/pause button.
**Default:** null
**Example:**
```typescript
playButtonTemplate: '<button class="custom-play">⏯</button>'
```

### Animation Properties

#### `animationEffect: CarouselAnimationEffect`
**Type:** Enum (None | Slide | Fade | Custom)
**Description:** Specifies the type of animation effects for slide transitions.
**Default:** Slide
**Example:**
```typescript
animationEffect: "Fade"  // Fade transition
```

#### `partialVisible: boolean`
**Type:** Boolean
**Description:** Enables active slide with partial previous/next slides visible.
**Default:** false
**Example:**
```typescript
partialVisible: true  // Show edges of adjacent slides
```

### Playback Properties

#### `pauseOnHover: boolean`
**Type:** Boolean
**Description:** Defines whether the slide transition gets paused on hover.
**Default:** false
**Example:**
```typescript
pauseOnHover: true  // Pause auto-play on hover
```

#### `enableTouchSwipe: boolean`
**Type:** Boolean
**Description:** Defines whether to enable swipe action on touch devices.
**Default:** true
**Example:**
```typescript
enableTouchSwipe: false  // Disable swiping
```

#### `swipeMode: CarouselSwipeMode`
**Type:** Enum
**Description:** Specifies whether slide transition should occur while swiping (touch/mouse).
**Default:** Both Touch and Mouse enabled
**Example:**
```typescript
swipeMode: "Touch"  // Only touch swiping
```

### Template Properties

#### `itemTemplate: string | Function`
**Type:** String or Function
**Description:** Specifies the template option for carousel items when using data binding.
**Default:** null
**Example:**
```typescript
itemTemplate: '<img src="${image}" alt="${alt}" />'
```

### Keyboard and Accessibility

#### `allowKeyboardInteraction: boolean`
**Type:** Boolean
**Description:** Defines whether to enable keyboard actions. Important when input elements are on slides.
**Default:** true
**Example:**
```typescript
allowKeyboardInteraction: false  // Disable arrow key navigation
```

#### `enableRtl: boolean`
**Type:** Boolean
**Description:** Enable or disable rendering carousel in right to left direction.
**Default:** false
**Example:**
```typescript
enableRtl: true  // RTL mode
```

### Advanced Properties

#### `enablePersistence: boolean`
**Type:** Boolean
**Description:** Enable or disable persisting component's state between page reloads.
**Default:** false
**Example:**
```typescript
enablePersistence: true
```

#### `locale: string`
**Type:** String
**Description:** Overrides the global culture and localization value for this component.
**Default:** 'en-US'
**Example:**
```typescript
locale: 'fr-FR'  // French locale
```

---

## Methods

### Initialization & Lifecycle

#### `appendTo(selector?: string | HTMLElement): void`
Appends the carousel control within the given HTML element.

**Parameters:**
- `selector` (optional): string | HTMLElement - Target element where carousel needs to be appended

**Returns:** void

**Example:**
```typescript
const carousel = new Carousel({ items: [...] });
carousel.appendTo("#carousel");  // Append to element with id="carousel"
```

#### `destroy(): void`
Destroys the carousel component and removes it from DOM.

**Returns:** void

**Example:**
```typescript
carousel.destroy();
```

#### `getRootElement(): HTMLElement`
Returns the root HTML element of the carousel component.

**Returns:** HTMLElement

**Example:**
```typescript
const element = carousel.getRootElement();
console.log(element);
```

### Slide Navigation

#### `next(): void`
Transitions from the current slide to the next slide.

**Returns:** void

**Example:**
```typescript
carousel.next();  // Go to next slide
```

#### `prev(): void`
Transitions from the current slide to the previous slide.

**Returns:** void

**Example:**
```typescript
carousel.prev();  // Go to previous slide
```

### Playback Control

#### `play(): void`
Starts automatic slide progression programmatically.

**Returns:** void

**Example:**
```typescript
carousel.play();  // Start auto-play
```

#### `pause(): void`
Pauses automatic slide progression programmatically.

**Returns:** void

**Example:**
```typescript
carousel.pause();  // Pause auto-play
```

### State Management

#### `dataBind(): void`
When invoked, applies pending property changes immediately to the component without full re-render.

**Returns:** void

**Example:**
```typescript
carousel.items = newItems;
carousel.dataBind();
```

#### `refresh(): void`
Applies all pending property changes and re-renders the component.

**Returns:** void

**Example:**
```typescript
carousel.loop = false;
carousel.interval = 2000;
carousel.refresh();  // Apply all changes
```

### Event Management

#### `addEventListener(eventName: string, handler: Function): void`
Adds the handler to the given event listener.

**Parameters:**
- `eventName`: string - Name of the event (e.g., 'slideChanged', 'slideChanging')
- `handler`: Function - Callback function to execute when event occurs

**Returns:** void

**Example:**
```typescript
carousel.addEventListener('slideChanged', (args) => {
  console.log('Current slide:', args.currentIndex);
});
```

#### `removeEventListener(eventName: string, handler: Function): void`
Removes the handler from the given event listener.

**Parameters:**
- `eventName`: string - Name of the event to remove handler from
- `handler`: Function - Reference to the function to remove

**Returns:** void

**Example:**
```typescript
const myHandler = (args) => console.log(args);
carousel.addEventListener('slideChanged', myHandler);
carousel.removeEventListener('slideChanged', myHandler);
```

### Advanced

#### `inject(moduleList: Function[]): void`
Dynamically injects required modules to the component for feature enabling/disabling.

**Parameters:**
- `moduleList`: Function[] - Array of module functions to inject

**Returns:** void

**Example:**
```typescript
carousel.inject([customModule]);
```

---

## Events

### slideChanging
Fired before the slide changes. Allows cancellation of the transition.

**Arguments: SlideChangingEventArgs**
- `cancel: boolean` - Set to true to prevent the transition
- `currentIndex: number` - Index of the current (before change) slide
- `currentSlide: HTMLElement` - Element of the current slide
- `nextIndex: number` - Index of the slide to be changed to
- `nextSlide: HTMLElement` - Element of the slide to be changed to
- `isSwiped: boolean` - Whether transition occurred via swiping
- `slideDirection: CarouselSlideDirection` - Direction of transition (Next | Previous)
- `name: string` - Event name

**Example:**
```typescript
carousel.addEventListener('slideChanging', (args) => {
  if (args.nextIndex === 5) {
    args.cancel = true;  // Prevent navigation to slide 5
  }
});
```

### slideChanged
Fired after the slide change is complete.

**Arguments: SlideChangedEventArgs**
- `currentIndex: number` - Index of the new current slide
- `currentSlide: HTMLElement` - Element of the current slide
- `previousIndex: number` - Index of the previous slide
- `previousSlide: HTMLElement` - Element of the previous slide
- `isSwiped: boolean` - Whether transition occurred via swiping
- `slideDirection: CarouselSlideDirection` - Direction of transition (Next | Previous)
- `name: string` - Event name

**Example:**
```typescript
carousel.addEventListener('slideChanged', (args) => {
  console.log(`Moved from slide ${args.previousIndex} to ${args.currentIndex}`);
  updateUI(args.currentIndex);
});
```

---

## Type Definitions

### CarouselAnimationEffect
Specifies the animation effects of carousel slide transitions.

```typescript
type CarouselAnimationEffect = 'None' | 'Slide' | 'Fade' | 'Custom';
```

**Values:**
- `None` - No animation, instant transition
- `Slide` - Horizontal slide transition (default)
- `Fade` - Fade in/out transition
- `Custom` - Custom animation effects

### CarouselButtonVisibility
Specifies the state of navigation buttons displayed in carousel.

```typescript
type CarouselButtonVisibility = 'Hidden' | 'Visible' | 'VisibleOnHover';
```

**Values:**
- `Hidden` - Navigation buttons are not visible
- `Visible` - Navigation buttons are always visible
- `VisibleOnHover` - Navigation buttons visible only on hover

### CarouselIndicatorsType
Specifies the type of indicators.

```typescript
type CarouselIndicatorsType = 'Default' | 'Dynamic' | 'Fraction' | 'Progress';
```

**Values:**
- `Default` - Bullet point indicators
- `Dynamic` - Animated indicator design
- `Fraction` - Numeric indicators (e.g., "1/5")
- `Progress` - Progress bar style indicators

### CarouselSwipeMode
Specifies which swipe interactions are enabled.

```typescript
type CarouselSwipeMode = 'Touch' | 'Mouse' | 'Both';
```

**Values:**
- `Touch` - Enable touch swiping only
- `Mouse` - Enable mouse swiping only
- `Both` - Enable both touch and mouse swiping

### CarouselSlideDirection
Specifies the direction of slide transition.

```typescript
type CarouselSlideDirection = 'Next' | 'Previous';
```

---

## Item Model

### CarouselItem
Specifies the carousel individual item.

**Properties:**
- `template?: string | Function` - HTML template for the item
- `cssClass?: string` - CSS classes for item customization
- `htmlAttributes?: Record<string, any>` - HTML attributes for the item
- `interval?: number` - Auto-play interval for this item (milliseconds)

**Example:**
```typescript
{
  template: '<img src="image.jpg" />',
  cssClass: 'featured',
  htmlAttributes: { 'data-id': '1' },
  interval: 3000
}
```

### CarouselItemModel
Extended model for data-bound carousel items.

**Extends:** CarouselItem

**Used with:** dataSource and itemTemplate properties

**Example:**
```typescript
const items: CarouselItemModel[] = [
  { template: '<img src="image1.jpg" />' },
  { template: '<img src="image2.jpg" />' }
];
```

---

## Complete Usage Example

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

// Create carousel with full configuration
const carousel = new Carousel({
  // Items
  items: [
    { template: '<img src="image1.jpg" />', interval: 3000 },
    { template: '<img src="image2.jpg" />', interval: 3000 },
    { template: '<img src="image3.jpg" />', interval: 3000 }
  ],
  
  // Display
  height: "400px",
  width: "100%",
  
  // Animation
  animationEffect: "Slide",
  
  // Navigation
  buttonsVisibility: "VisibleOnHover",
  
  // Indicators
  showIndicators: true,
  indicatorsType: "Dynamic",
  
  // Playback
  autoPlay: true,
  interval: 3000,
  pauseOnHover: true,
  loop: true,
  
  // Other
  enableTouchSwipe: true,
  allowKeyboardInteraction: true,
  showPlayButton: true
});

// Append to DOM
carousel.appendTo("#carousel");

// Add event listeners
carousel.addEventListener('slideChanged', (args) => {
  console.log(`Slide changed to ${args.currentIndex}`);
});

// Navigate programmatically
document.getElementById('nextBtn').addEventListener('click', () => {
  carousel.next();
});

// Control playback
document.getElementById('playBtn').addEventListener('click', () => {
  carousel.play();
});

// Cleanup
carousel.destroy();
```
