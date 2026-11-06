---
name: accordion-api-reference
---

# Accordion API Reference

## Table of Contents

- [Accordion Properties](#accordion-properties)
- [Accordion Methods](#accordion-methods)
- [Accordion Events](#accordion-events)
- [AccordionItem Properties](#accordionitem-properties)
- [Animation Settings](#animation-settings)
- [Event Arguments](#event-arguments)

---

## Accordion Properties

The main Accordion component exposes the following properties for configuration:

### animation

**Type:** `AccordionAnimationSettingsModel`

**Default:** `{ expand: { effect: 'SlideDown', duration: 400, easing: 'linear' }, collapse: { effect: 'SlideUp', duration: 400, easing: 'linear' }}`

Specifies the animation configuration settings for expanding and collapsing the panel. This property controls both the expand and collapse animation effects, allowing you to customize the visual experience during state transitions.

**Example:** See [customization-animation.md](references/customization-animation.md) for animation configuration examples.

### dataSource

**Type:** `Object[]`

**Default:** `[]`

Specifies the datasource for the accordion items. This property enables you to bind dynamic data to accordion items, automatically generating AccordionItem elements from your data source. When using a dataSource, you must map the header and content properties to corresponding fields in your data.

**Example:** See [data-binding.md](references/data-binding.md) for data binding examples and OData integration patterns.

### enableHtmlSanitizer

**Type:** `boolean`

**Default:** `true`

Specifies whether to enable the rendering of untrusted HTML values in the Accordion component. When this property is enabled, the component will sanitize any suspected untrusted strings and scripts before rendering them. Set to `false` only when you are certain that all content is from trusted sources.

### enablePersistence

**Type:** `boolean`

**Default:** `false`

Enable or disable persisting component's state between page reloads. When enabled, the accordion remembers which items were expanded and restores this state when the page is reloaded. This improves user experience by maintaining the user's last viewed section.

### enableRtl

**Type:** `boolean`

**Default:** `false`

Enable or disable rendering component in right to left direction. Set to `true` for RTL languages like Arabic and Hebrew to properly mirror the accordion layout and controls.

### expandMode

**Type:** `ExpandMode` (`'Single'` | `'Multiple'`)

**Default:** `'Multiple'`

Specifies the options to expand single or multiple panel at a time. The possible values are:
- `'Single'`: Sets to expand only one Accordion item at a time. Expanding a new item collapses the previously expanded item.
- `'Multiple'`: Sets to expand more than one Accordion item at a time. Each item can be independently expanded or collapsed.

**Example:** See [expand-modes.md](references/expand-modes.md) for expand mode configuration and use cases.

### expandedIndices

**Type:** `number[]`

**Default:** `[]`

Specifies the expanded items at initial load. Provide an array of zero-based item indices that should be expanded when the accordion first renders. For example, `[0, 2]` expands the first and third items.

### headerTemplate

**Type:** `string` | `Function`

**Default:** `null`

Specifies the header title template option for accordion items. This allows you to create custom header content beyond simple text, enabling rich formatting and dynamic header layouts.

### height

**Type:** `string` | `number`

**Default:** `'auto'`

Specifies the height of the Accordion in pixels/number/percentage. Number value is considered as pixels. Use `'auto'` to let the accordion size based on content, or specify a fixed height like `'400px'` or `'500'` (interpreted as 500 pixels).

### itemTemplate

**Type:** `string` | `Function`

**Default:** `null`

Specifies the template option for accordion items. This property allows you to define a custom template for rendering entire accordion items, including both header and content areas with custom layouts.

### items

**Type:** `AccordionItemModel[]`

**Default:** `[]`

An array of item that is used to specify Accordion items. Each item in this array configures one accordion panel with header and content. This is the primary way to define static accordion items.

### locale

**Type:** `string`

**Default:** `''`

Overrides the global culture and localization value for this component. Default global culture is 'en-US'. Provide a locale string like `'fr-FR'` or `'de-DE'` to customize localized text and formatting for the accordion.

### width

**Type:** `string` | `number`

**Default:** `'100%'`

Specifies the width of the Accordion in pixels/number/percentage. Number value is considered as pixels. Use `'100%'` to span the full container width, or specify a fixed width like `'600px'`.

---

## Accordion Methods

The Accordion component provides the following methods for programmatic control:

### addItem(item, index?)

**Parameters:**
- `item`: `AccordionItemModel` | `AccordionItemModel[]` | `Object` | `Object[]` - Item array that is to be added to the Accordion.
- `index` (optional): `number` - Number value that determines where the item should be added. By default, item is added at the last index if the index is not specified.

**Returns:** `void`

Adds new item to the Accordion with the specified index of the Accordion. Use this method to dynamically insert new accordion items at runtime.

### destroy()

**Returns:** `void`

Removes the control from the DOM and also removes all its related events. Call this method when you need to completely remove the accordion component and clean up resources.

### enableItem(index, isEnable)

**Parameters:**
- `index`: `number` - Number value that determines which item should be enabled/disabled.
- `isEnable`: `boolean` - Boolean value that determines the action as enable (true) or disable (false). If the `isEnable` value is true, the item is enabled or else it is disabled.

**Returns:** `void`

Enables/Disables the specified Accordion item. Disabled items cannot be clicked or expanded by the user.

### expandItem(isExpand, index?)

**Parameters:**
- `isExpand`: `boolean` - Boolean value that determines the action as expand or collapse.
- `index` (optional): `number` - Number value that determines which item should be expanded/collapsed. `index` is optional parameter. Without Specifying index, based on the `isExpand` value all Accordion item can be expanded or collapsed.

**Returns:** `void`

Expands/Collapses the specified Accordion item. Without specifying an index, this method expands or collapses all items based on the `isExpand` value. This method enables programmatic control of accordion state.

**Example:** See [customization-animation.md](references/customization-animation.md) for expandItem usage patterns.

### hideItem(index, isHidden?)

**Parameters:**
- `index`: `number` - Number value that determines which item should be hidden/shown.
- `isHidden` (optional): `boolean` - Boolean value that determines the action either hide (true) or show (false). Default value is false. If the `isHidden` value is false, the item is shown or else item it is hidden.

**Returns:** `void`

Shows or hides the specified item from Accordion. Hidden items are not visible to users but remain in the DOM.

### removeItem(index)

**Parameters:**
- `index`: `number` - Number value that determines which item should be removed.

**Returns:** `void`

Dynamically removes item from Accordion. This method removes both the item from the items collection and from the DOM.

### select(index)

**Parameters:**
- `index`: `number` - Number value that determines which item should be focused.

**Returns:** `void`

Sets focus to the specified index item header in Accordion. This method brings keyboard focus to the accordion item header, making it the active accordion item.

---

## Accordion Events

The Accordion component fires the following events at various lifecycle stages:

### clicked

**Type:** `EmitType<AccordionClickArgs>`

The event will be fired while clicking anywhere within the Accordion. This includes clicks on item headers, content areas, and any child elements. Use this event to detect general user interaction with the accordion.

### created

**Type:** `EmitType<Event>`

The event will be fired once the control rendering is completed. This is the ideal place to initialize dependent components or perform setup operations that require the accordion to be fully rendered.

**Example:** See [customization-animation.md](references/customization-animation.md) for event handling examples.

### destroyed

**Type:** `EmitType<Event>`

The event will be fired when the control gets destroyed. Use this event to clean up any resources, event listeners, or dependent components associated with the accordion.

### expanded

**Type:** `EmitType<ExpandedEventArgs>`

The event will be fired after the item gets collapsed/expanded. This fires after the animation completes and the state change is final. Use this to respond to completed expansion/collapse operations.

**Example:** See [customization-animation.md](references/customization-animation.md) for expanded event examples.

### expanding

**Type:** `EmitType<ExpandEventArgs>`

The event will be fired before the item gets collapsed/expanded. This event fires before the animation starts and includes a `cancel` property that allows you to prevent the expansion/collapse action. Use this event to validate or conditionally prevent state changes.

**Example:** See [customization-animation.md](references/customization-animation.md) for expanding event examples and prevention patterns.

---

## AccordionItem Properties

Each item in the accordion is configured through AccordionItem properties:

### content

**Type:** `string`

**Default:** `null`

Sets the text content to be displayed for the Accordion item. This property also supports HTML elements, strings, or query selectors to reference external content.

**Example:** See [getting-started.md](references/getting-started.md) for content configuration examples.

### cssClass

**Type:** `string`

**Default:** `null`

Defines single/multiple classes (separated by a space) are to be used for Accordion item customization. Use CSS classes to apply custom styling to individual accordion items.

### disabled

**Type:** `boolean`

**Default:** `false`

Sets true to disable an accordion item. Disabled items cannot be clicked or expanded by the user and typically display in a disabled state visually.

### expanded

**Type:** `boolean`

**Default:** `false`

Sets the expand (true) or collapse (false) state of the Accordion item. By default, all the items are in a collapsed state. Set to `true` to render an item in the expanded state initially.

### header

**Type:** `string`

**Default:** `null`

Sets the header text to be displayed for the Accordion item. Like the content property, this also supports HTML elements, strings, or query selectors for advanced header configurations.

### iconCss

**Type:** `string`

**Default:** `null`

Defines an icon with the given custom CSS class that is to be rendered before the header text. Add the CSS classes to the `iconCss` property and write the CSS styles to the defined class to set images/icons. Adding icon is applicable only to the header.

### id

**Type:** `string`

**Default:** `null`

Sets unique ID to accordion item. This ID can be used to reference the item programmatically or in CSS selectors.

### visible

**Type:** `boolean`

**Default:** `true`

Sets false to hide an accordion item. Hidden items are not visible but remain in the accordion structure.

---

## Animation Settings

Animation behavior is configured through the AccordionAnimationSettings object:

### collapse

**Type:** `AccordionActionSettingsModel`

**Default:** `{ effect: 'SlideUp', duration: 400, easing: 'linear' }`

Specifies the animation to appear while collapsing the Accordion item. Configure effect (SlideUp, FadeOut, etc.), duration in milliseconds, and easing function.

### expand

**Type:** `AccordionActionSettingsModel`

**Default:** `{ effect: 'SlideDown', duration: 400, easing: 'linear' }`

Specifies the animation to appear while expanding the Accordion item. Configure effect (SlideDown, FadeIn, etc.), duration in milliseconds, and easing function.

---

## Event Arguments

Events provide event argument objects with additional context:

### AccordionClickArgs

An interface that holds options to control the accordion click action. Provides information about which item was clicked and the click event details.

### ExpandEventArgs

An interface that holds options to control the expanding item action. Includes a `cancel` property that allows preventing the expansion action.

**Properties:**
- `cancel`: `boolean` - Set to `true` to cancel the expand/collapse action

### ExpandedEventArgs

An interface that holds options to control the expanded item action. Provides information about which item was expanded/collapsed after the animation completes.

---

## Related References

For detailed usage examples and patterns:
- **Getting Started:** [references/getting-started.md](references/getting-started.md)
- **Expand Modes:** [references/expand-modes.md](references/expand-modes.md)
- **Data Binding:** [references/data-binding.md](references/data-binding.md)
- **Content Loading:** [references/content-loading.md](references/content-loading.md)
- **Customization:** [references/customization-animation.md](references/customization-animation.md)
- **Nested Accordions:** [references/nested-accordion.md](references/nested-accordion.md)

All APIs listed here are fully documented in the corresponding reference files with code examples and practical scenarios.
