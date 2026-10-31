# Complete API Reference

## Table of Contents

- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Arguments](#event-arguments)
- [Animation Effects](#animation-effects)
- [Quick Links to Detailed Examples](#quick-links-to-detailed-examples)

---

## Properties

### Accordion Properties

| Property | Type | Default | Description | Examples |
|----------|------|---------|-------------|----------|
| `items` | AccordionItemModel[] | [] | Array of accordion items | [Getting Started](./getting-started.md) |
| `dataSource` | object[] \| DataManager | - | External data source (OData, JSON, AJAX) | [Data Loading](./data-loading.md#datamanager-with-jsonajax) |
| `expandMode` | 'Single' \| 'Multiple' | 'Multiple' | Single or Multiple expand mode | [Expand Modes](./expand-modes.md) |
| `headerTemplate` | string \| Function | - | Custom HTML template for headers | [Templates](./templates.md#header-templates) |
| `itemTemplate` | string \| Function | - | Custom HTML template for entire items | [Templates](./templates.md#item-templates) |
| `expandedIndices` | number[] | [] | Indices of items to expand initially | [Getting Started](./getting-started.md#datasource-binding) |
| `animation` | AnimationSettings | {expand: {}, collapse: {}} | Animation with effect, duration, easing | [Customization](./customization-styling.md#animation-configuration) |
| `height` | string \| number | auto | Height of accordion container | [Customization](./customization-styling.md#customizing-container-and-items) |
| `width` | string \| number | 100% | Width of accordion container | [Customization](./customization-styling.md#customizing-container-and-items) |
| `locale` | string | 'en-US' | Localization identifier | - |
| `enableRtl` | boolean | false | Right-to-left text direction | [Advanced Features](./advanced-features.md) |
| `enablePersistence` | boolean | false | Persist expanded state in localStorage | - |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML content for security | - |

### AccordionItem Properties

| Property | Type | Default | Description | Examples |
|----------|------|---------|-------------|----------|
| `header` | string | - | Item header/title text | [Getting Started](./getting-started.md) |
| `content` | string | - | Item content/body HTML | [Getting Started](./getting-started.md) |
| `headerTemplate` | string \| Function | - | Custom header template for this item | [Templates](./templates.md) |
| `itemTemplate` | string \| Function | - | Custom item template (header + content) | [Templates](./templates.md) |
| `expanded` | boolean | false | Initial expanded state | [Getting Started](./getting-started.md#setting-initial-expanded-state) |
| `iconCss` | string | - | CSS class for icon display | [Customization](./customization-styling.md#icons-and-font-awesome) |
| `id` | string | - | Unique identifier for item | - |
| `cssClass` | string | - | Custom CSS class for styling | [Customization](./customization-styling.md) |
| `disabled` | boolean | false | Disable item interaction | [Advanced Features](./advanced-features.md#enableitemindex-isenable) |

### Animation Configuration

| Property | Type | Values | Description | Link |
|----------|------|--------|-------------|------|
| `expand.effect` | string | SlideDown, SlideUp, FadeIn, FadeOut, FadeZoomIn, FadeZoomOut, ZoomIn, ZoomOut, None | Expand animation effect | [Effects List](./customization-styling.md#built-in-animation-effects) |
| `expand.duration` | number | 0-Infinity | Duration in milliseconds | [Examples](./customization-styling.md#set-custom-animation-effects) |
| `expand.easing` | string | ease, ease-in, ease-out, ease-in-out, linear | Animation easing function | [Examples](./customization-styling.md#set-custom-animation-effects) |
| `collapse.effect` | string | SlideDown, SlideUp, FadeIn, FadeOut, FadeZoomIn, FadeZoomOut, ZoomIn, ZoomOut, None | Collapse animation effect | [Effects List](./customization-styling.md#built-in-animation-effects) |
| `collapse.duration` | number | 0-Infinity | Duration in milliseconds | [Examples](./customization-styling.md#set-custom-animation-effects) |
| `collapse.easing` | string | ease, ease-in, ease-out, ease-in-out, linear | Animation easing function | [Examples](./customization-styling.md#set-custom-animation-effects) |

---

## Methods

All 13 methods are comprehensively documented in [Advanced Features](./advanced-features.md#methods-reference) with detailed parameters, return types, and working examples:

### Item Manipulation

| Method | Parameters | Return | Description | Examples |
|--------|-----------|--------|-------------|----------|
| `addItem(item, index?)` | item: AccordionItemModel, index?: number | void | Add item at optional index | [Advanced Features](./advanced-features.md#additemitem-index) |
| `removeItem(index)` | index: number | void | Remove item at specified index | [Advanced Features](./advanced-features.md#removeitemindex) |
| `enableItem(index, isEnable)` | index: number, isEnable: boolean | void | Enable/disable item interaction | [Advanced Features](./advanced-features.md#enableitemindex-isenable) |
| `hideItem(index, isHidden)` | index: number, isHidden: boolean | void | Hide or show item | [Advanced Features](./advanced-features.md#hideitemindex-ishidden) |

### State Control

| Method | Parameters | Return | Description | Examples |
|--------|-----------|--------|-------------|----------|
| `expandItem(isExpand, index?)` | isExpand: boolean, index?: number | void | Expand/collapse specific item(s) | [Advanced Features](./advanced-features.md#expanditemisexpand-index) |
| `select(index)` | index: number | void | Select and expand item at index | [Advanced Features](./advanced-features.md#selectindex) |
| `refresh()` | none | void | Refresh accordion, re-render items | [Advanced Features](./advanced-features.md#refresh) |

### Data & Lifecycle

| Method | Parameters | Return | Description | Examples |
|--------|-----------|--------|-------------|----------|
| `dataBind()` | none | void | Bind data source to accordion | [Data Loading](./data-loading.md#rebinding-with-new-data) |
| `appendTo(selector?)` | selector?: string \| HTMLElement | void | Append accordion to target element | [Getting Started](./getting-started.md) |
| `destroy()` | none | void | Destroy accordion instance | [Advanced Features](./advanced-features.md#destroy) |
| `getRootElement()` | none | HTMLElement | Get root DOM element | [Advanced Features](./advanced-features.md#getrootelementmd) |

### Event Handling

| Method | Parameters | Return | Description | Examples |
|--------|-----------|--------|-------------|----------|
| `addEventListener(eventName, handler)` | eventName: string, handler: Function | void | Attach event listener | [Advanced Features](./advanced-features.md#addeventlistenereventname-handler) |
| `removeEventListener(eventName, handler)` | eventName: string, handler: Function | void | Remove event listener | [Advanced Features](./advanced-features.md#removeeventlistenereventname-handler) |

---

## Events

All 4 events with complete argument documentation in [Advanced Features](./advanced-features.md#events):

| Event | Arguments | Description | Examples |
|-------|-----------|-------------|----------|
| `expanding` | ExpandEventArgs | Fires before item expansion | [Advanced Features](./advanced-features.md) |
| `expanded` | ExpandedEventArgs | Fires after item expansion completes | [Advanced Features](./advanced-features.md) |
| `clicked` | AccordionClickArgs | Fires when accordion header is clicked | [Advanced Features](./advanced-features.md) |
| `created` | none | Fires when accordion component is created | [Advanced Features](./advanced-features.md) |
| `destroyed` | none | Fires when accordion component is destroyed | - |
---

## Event Arguments

### ExpandEventArgs

Fired when accordion begins expanding an item. Use `args.cancel = true` to prevent expansion.

| Property | Type | Description | Examples |
|----------|------|-------------|----------|
| `cancel` | boolean | Set to true to prevent expansion | [Advanced Features](./advanced-features.md) |
| `element` | HTMLElement | The item element being expanded | [Advanced Features](./advanced-features.md) |
| `content` | HTMLElement | The content element being revealed | [Advanced Features](./advanced-features.md) |
| `index` | number | Index of the item being expanded | [Advanced Features](./advanced-features.md) |

**See:** [Advanced Features - Events](./advanced-features.md)

### ExpandedEventArgs

Fired after accordion completes expanding an item.

| Property | Type | Description | Examples |
|----------|------|-------------|----------|
| `element` | HTMLElement | The item element that expanded | [Advanced Features](./advanced-features.md) |
| `content` | HTMLElement | The content element now visible | [Advanced Features](./advanced-features.md) |
| `index` | number | Index of the expanded item | [Advanced Features](./advanced-features.md) |
| `isExpanded` | boolean | Whether item is expanded (always true for this event) | [Advanced Features](./advanced-features.md) |

**See:** [Advanced Features - Events](./advanced-features.md)

### AccordionClickArgs

Fired when accordion header is clicked.

| Property | Type | Description | Examples |
|----------|------|-------------|----------|
| `cancel` | boolean | Set to true to prevent default behavior | [Advanced Features](./advanced-features.md) |
| `item` | AccordionItemModel | The accordion item that was clicked | [Advanced Features](./advanced-features.md) |
| `element` | HTMLElement | The header element clicked | [Advanced Features](./advanced-features.md) |
| `originalEvent` | Event | The original DOM click event | [Advanced Features](./advanced-features.md) |
| `name` | string | Event name ('clicked') | [Advanced Features](./advanced-features.md) |

**See:** [Advanced Features - Events](./advanced-features.md)

---

## Animation Effects

All 8 animation effects with configuration examples in [Customization & Styling](./customization-styling.md#built-in-animation-effects):

| Effect | Description | Use Case |
|--------|-------------|----------|
| `SlideDown` | Content slides down smoothly | Default expand animation |
| `SlideUp` | Content slides up smoothly | Default collapse animation |
| `FadeIn` | Content fades in gradually | Subtle appearance |
| `FadeOut` | Content fades out gradually | Subtle disappearance |
| `FadeZoomIn` | Content fades and zooms in | Emphasized entrance |
| `FadeZoomOut` | Content fades and zooms out | Emphasized exit |
| `ZoomIn` | Content zooms in | Sharp entrance |
| `ZoomOut` | Content zooms out | Sharp exit |
| `None` | No animation (disabled) | Performance optimization |

**See:** [Customization - Animation Effects](./customization-styling.md#built-in-animation-effects)

---

## Quick Links to Detailed Examples

### By Use Case

**Getting Started**
- [Installation & Setup](./getting-started.md)
- [Items Array Initialization](./getting-started.md#method-1-using-items-array-recommended)
- [HTML Markup Initialization](./getting-started.md#method-2-using-html-markup)
- [DataSource Binding](./getting-started.md#datasource-binding)

**Expand Modes**
- [Single vs Multiple Expand](./expand-modes.md)
- [Keeping Single Pane Open](./expand-modes.md)
- [Icon Click Behavior](./expand-modes.md#expand-collapse-on-icon-click)

**Customization**
- [CSS Selectors & Styling](./customization-styling.md#css-customization-basics)
- [Header Styling](./customization-styling.md#header-styling)
- [Icons & Font Awesome](./customization-styling.md#icons-and-font-awesome)
- [Animation Configuration](./customization-styling.md#animation-configuration)
- [Theming](./customization-styling.md#custom-themes)

**Data Loading**
- [Items Array Approach](./data-loading.md#approach-1-items-array-direct-binding)
- [DataSource Approach](./data-loading.md#approach-2-datasource-remotedynamic-binding)
- [JSON/AJAX Loading](./data-loading.md#datamanager-with-jsonajax)
- [OData Services](./data-loading.md#odata-service-data-source)
- [Nested Accordions](./data-loading.md#nested-accordions)

**Templates**
- [Header Templates](./templates.md#header-templates)
- [Item Templates](./templates.md#item-templates)
- [Data Binding with Templates](./templates.md#data-binding-with-templates)
- [Performance & Caching](./templates.md#performance-considerations)

**Advanced Features**
- [All 13 Methods](./advanced-features.md#methods-reference)
- [All 4 Events](./advanced-features.md#events)
- [Event Arguments](./advanced-features.md#complete-advanced-example)
- [State Management](./advanced-features.md)
- [Accessibility](./advanced-features.md)

**Advanced Use Cases**
- [Multi-Step Wizards](./advanced-use-cases.md#multi-step-form-wizard)
- [Form Validation](./advanced-use-cases.md#form-validation-with-accordion)
- [Checkout Flows](./advanced-use-cases.md#shopping-cart-checkout-flow)
- [Progress Tracking](./advanced-use-cases.md)

---

## Navigation Strategy

This API reference provides:
1. **Quick lookup tables** for all properties, methods, and events
2. **Direct links** to detailed implementations in focused reference files
3. **Avoids duplication** - examples exist in specific guides, not here
4. **Easy scanning** - find what you need, then jump to detailed examples

### Where to Find Examples

- **Properties & Configuration:** See the specific reference file in the "Examples" column
- **Methods:** Go to [Advanced Features](./advanced-features.md) for comprehensive documentation
- **Events:** Go to [Advanced Features](./advanced-features.md) for event handling examples
- **Animations:** Go to [Customization & Styling](./customization-styling.md) for animation examples
- **Templates:** Go to [Templates](./templates.md) for all template patterns
- **Data Binding:** Go to [Data Loading](./data-loading.md) for both items and dataSource approaches
- **Real-world Patterns:** Go to [Advanced Use Cases](./advanced-use-cases.md) for complete implementations

---

## TypeScript Support

All code examples use full TypeScript support with proper types:

```typescript
import { Accordion, AccordionItemModel, ExpandEventArgs } from '@syncfusion/ej2-navigations';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

// Full typing support
const items: AccordionItemModel[] = [...];
const accordion = new Accordion({ items });

accordion.addEventListener('expanding', (args: ExpandEventArgs) => {
    // Full type support for event arguments
});
```

See specific reference files for TypeScript patterns and interfaces.

---

## Summary

| Category | Count | Reference |
|----------|-------|-----------|
| **Properties** | 13 core + 9 item + 6 animation | [Properties Table](#properties) |
| **Methods** | 13 total | [Advanced Features](./advanced-features.md) |
| **Events** | 4 | [Advanced Features](./advanced-features.md) |
| **Event Arguments** | 3 interfaces with 14 total properties | [Event Arguments](#event-arguments) |
| **Animation Effects** | 8 | [Customization](./customization-styling.md) |
| **Reference Guides** | 8 focused files | [Quick Links](#quick-links-to-detailed-examples) |

Complete Accordion component documentation with production-ready examples and best practices.
