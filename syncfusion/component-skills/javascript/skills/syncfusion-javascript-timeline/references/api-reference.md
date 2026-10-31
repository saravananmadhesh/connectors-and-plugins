# Timeline API Reference

Quick reference guide for all Timeline properties, methods, events, and types. For detailed examples and use cases, see the linked reference guides.

## Table of Contents
- [Timeline Properties](#timeline-properties)
- [Timeline Methods](#timeline-methods)
- [Timeline Events](#timeline-events)
- [TimelineItemModel Properties](#timelineitemmodel-properties)
- [TimelineRenderingEventArgs](#timelinerenderingeventargs)
- [Enumerations](#enumerations)

---

## Timeline Properties

All properties with defaults. See reference guides for detailed examples and use cases.

| Property | Type | Default | Description | See |
|----------|------|---------|-------------|-----|
| `align` | string \| TimelineAlign | `After` | Content alignment mode | [alignment-and-orientation.md](alignment-and-orientation.md) |
| `cssClass` | string | `''` | CSS class for styling | [customization-styling.md](customization-styling.md) |
| `enablePersistence` | boolean | `false` | Persist state to localStorage | [api-reference.md § enablePersistence](#enablepersistence) |
| `enableRtl` | boolean | `false` | Enable RTL rendering | [api-reference.md § enableRtl](#enablertl) |
| `items` | TimelineItemModel[] | `[]` | Array of timeline items | [items-and-content.md](items-and-content.md) |
| `locale` | string | `'en-US'` | Localization setting | [api-reference.md § locale](#locale) |
| `orientation` | string \| TimelineOrientation | `Vertical` | Layout direction | [alignment-and-orientation.md](alignment-and-orientation.md) |
| `reverse` | boolean | `false` | Display in reverse order | [reverse-layout.md](reverse-layout.md) |
| `template` | string \| Function | undefined | Custom template selector | [templating.md](templating.md) |

### enablePersistence

**Type:** `boolean` **Default:** `false`

When enabled, saves Timeline state to browser localStorage and restores on page reload. Useful for persisting user preferences.

```typescript
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
  enablePersistence: true  // State persists across sessions
});
timeline.appendTo('#timeline');
```

### enableRtl

**Type:** `boolean` **Default:** `false`

Enable right-to-left rendering for RTL languages (Arabic, Hebrew, Persian, Urdu).

```typescript
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
  enableRtl: true  // Render RTL
});
timeline.appendTo('#timeline');
```

### locale

**Type:** `string` **Default:** `'en-US'`

Sets the localization culture. Supported values: `en-US`, `en-GB`, `de-DE`, `fr-FR`, `es-ES`, `it-IT`, `pt-BR`, `ja-JP`, `zh-CN`, `zh-TW`, `ko-KR`, `ar-AE`.

```typescript
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
  locale: 'de-DE'  // German locale
});
timeline.appendTo('#timeline');
```

---

## Timeline Methods

Methods available on the Timeline instance after initialization.

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `addEventListener` | `addEventListener(eventName: string, handler: Function): void` | void | Attach event listener to Timeline |
| `appendTo` | `appendTo(selector?: string \| HTMLElement): void` | void | Render Timeline to DOM element |
| `dataBind` | `dataBind(): void` | void | Apply pending property changes immediately |
| `getRootElement` | `getRootElement(): HTMLElement` | HTMLElement | Get Timeline root element |
| `refresh` | `refresh(): void` | void | Refresh Timeline rendering |
| `removeEventListener` | `removeEventListener(eventName: string, handler: Function): void` | void | Remove event listener |
| `inject` | `inject(moduleList: Function[]): void` | void | Dynamically inject required modules |

### addEventListener

Attaches an event listener to the Timeline instance.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });
timeline.appendTo('#timeline');

timeline.addEventListener('created', () => {
  console.log('Timeline created');
});
```

### appendTo

Renders the Timeline to a specified DOM element (string selector or HTMLElement).

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });

// Using string selector
timeline.appendTo('#timeline');

// Or using HTMLElement
const element = document.getElementById('timeline');
timeline.appendTo(element);
```

### dataBind

Applies all pending property changes immediately to the component.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });
timeline.appendTo('#timeline');

timeline.items = newItems;
timeline.dataBind();  // Apply changes immediately
```

### getRootElement

Returns the root HTMLElement of the Timeline component.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });
timeline.appendTo('#timeline');

const rootElement = timeline.getRootElement();
console.log(rootElement.classList); // Access element properties
```

### refresh

Applies all pending property changes and re-renders the component.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });
timeline.appendTo('#timeline');

timeline.items = updatedItems;
timeline.refresh();  // Re-render with new items
```

### removeEventListener

Removes an event listener from the Timeline instance.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });
timeline.appendTo('#timeline');

const handler = () => console.log('Timeline event');
timeline.addEventListener('created', handler);

// Later: remove the listener
timeline.removeEventListener('created', handler);
```

### inject

Dynamically injects required modules into the Timeline component.

```typescript
let timeline: Timeline = new Timeline({ items: [{}, {}, {}, {}] });

// Inject modules before appendTo
timeline.inject([Module1, Module2]);

timeline.appendTo('#timeline');
```

---

## Timeline Events

| Event | Arguments | Description | See |
|-------|-----------|-------------|-----|
| `beforeItemRender` | TimelineRenderingEventArgs | Fires before each item renders | [events-and-lifecycle.md](events-and-lifecycle.md) |
| `created` | Event | Fires after Timeline rendering completes | [events-and-lifecycle.md](events-and-lifecycle.md) |

Attach events in the configuration object:

```typescript
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
  created: () => {
    console.log('Timeline created');
  },
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    console.log(`Rendering item ${args.index}`);
  }
});
timeline.appendTo('#timeline');
```

---

## TimelineItemModel Properties

Configure individual timeline items.

| Property | Type | Default | Description | See |
|----------|------|---------|-------------|-----|
| `content` | string \| Function | `''` | Main item content | [items-and-content.md](items-and-content.md) |
| `cssClass` | string | `''` | CSS class for item styling | [items-and-content.md](items-and-content.md) |
| `disabled` | boolean | `false` | Disable item | [items-and-content.md](items-and-content.md) |
| `dotCss` | string | `''` | CSS class for dot | [customization-styling.md](customization-styling.md) |
| `oppositeContent` | string \| Function | `''` | Opposite-side content | [items-and-content.md](items-and-content.md) |

```typescript
const items: TimelineItemModel[] = [
  { content: 'Step 1', oppositeContent: 'Week 1' },
  { content: 'Step 2', oppositeContent: 'Week 2', disabled: true },
  { content: 'Step 3', dotCss: 'custom-dot', cssClass: 'custom-item' }
];
```

---

## TimelineRenderingEventArgs

Event arguments passed to `beforeItemRender` event handler.

| Property | Type | Description | See |
|----------|------|-------------|-----|
| `element` | HTMLElement | DOM element of the item being rendered | [events-and-lifecycle.md](events-and-lifecycle.md) |
| `index` | number | Zero-based index of current item | [events-and-lifecycle.md](events-and-lifecycle.md) |
| `name` | string | Event name ('beforeItemRender') | [events-and-lifecycle.md](events-and-lifecycle.md) |

```typescript
let timeline: Timeline = new Timeline({
  items: [{}, {}, {}, {}],
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    console.log(args.name);      // 'beforeItemRender'
    console.log(args.index);     // 0, 1, 2, 3...
    console.log(args.element);   // HTMLElement
  }
});
timeline.appendTo('#timeline');
```

---

## Enumerations

### TimelineAlign

Content alignment values:

```typescript
enum TimelineAlign {
  Before = 'Before',                    // Content before axis
  After = 'After',                      // Content after axis (default)
  Alternate = 'Alternate',              // Alternating layout
  AlternateReverse = 'AlternateReverse' // Reverse alternating
}
```

Usage: `align: 'Before'` or `align: TimelineAlign.Before`

### TimelineOrientation

Layout orientation values:

```typescript
enum TimelineOrientation {
  Vertical = 'Vertical',        // Vertical layout (default)
  Horizontal = 'Horizontal'     // Horizontal layout
}
```

Usage: `orientation: 'Vertical'` or `orientation: TimelineOrientation.Vertical`

---

## Quick Setup Example

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const items: TimelineItemModel[] = [
  { content: 'Planning', oppositeContent: 'Week 1' },
  { content: 'Development', oppositeContent: 'Week 2-3' },
  { content: 'Testing', oppositeContent: 'Week 4' },
  { content: 'Launch', oppositeContent: 'Week 5' }
];

let timeline: Timeline = new Timeline({
  items: items,
  align: 'Alternate',
  orientation: 'Vertical',
  reverse: false,
  cssClass: 'project-timeline',
  enablePersistence: true,
  locale: 'en-US',
  enableRtl: false,
  beforeItemRender: (args: TimelineRenderingEventArgs) => {
    console.log(`Rendering item ${args.index}`);
  },
  created: () => {
    console.log('Timeline ready');
  }
});

timeline.appendTo('#timeline');
```

**💡 Tip:** For detailed examples and use cases, navigate to the specific reference guides linked in the tables above.
