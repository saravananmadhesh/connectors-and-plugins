# Tooltip Configuration

## Table of Contents

- [Tooltip Overview](#tooltip-overview)
- [Enable Tooltips](#enable-tooltips)
- [Tooltip Format](#tooltip-format)
  - [Node Tooltip Format](#node-tooltip-format)
  - [Link Tooltip Format](#link-tooltip-format)
  - [Supported Placeholders](#supported-placeholders)
- [Inline Tooltip Formatting](#inline-tooltip-formatting)
- [Tooltip Appearance](#tooltip-appearance)
- [Tooltip Templates](#tooltip-templates)
  - [Node Tooltip Template](#node-tooltip-template)
  - [Link Tooltip Template](#link-tooltip-template)
  - [Node and Link Tooltip Templates](#node-and-link-tooltip-templates)
- [Tooltip Animation](#tooltip-animation)
- [Tooltip Rendering Event](#tooltip-rendering-event)
- [Conditional Tooltip Display](#conditional-tooltip-display)
- [Best Practices](#best-practices)

## Tooltip Overview

Sankey tooltips display contextual information when the pointer moves over a node or link. Configure tooltips by adding the `e-sankey-tooltipsettings` Tag Helper inside the `ejs-sankey` component.

Use the following properties to control tooltip content:

- `enable` - Enables or disables tooltips.
- `nodeFormat` - Controls the content displayed for nodes.
- `linkFormat` - Controls the content displayed for links.
- `fill` - Sets the tooltip background color.
- `opacity` - Sets the tooltip opacity.
- `enableAnimation` - Enables tooltip animation.
- `duration` - Sets the animation duration.
- `fadeOutDuration` - Sets the fade-out duration.
- `fadeOutMode` - Sets the fade-out behavior.

## Enable Tooltips

Set `enable="true"` in `e-sankey-tooltipsettings` to display tooltips for Sankey nodes and links.

```html
<ejs-sankey id="tooltipSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="100">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings enable="true">
    </e-sankey-tooltipsettings>
</ejs-sankey>
```

By default, the node tooltip displays the node name and value. The link tooltip displays the source node, target node, and corresponding values.

## Tooltip Format

Use the `nodeFormat` and `linkFormat` properties to customize the tooltip content.

- `nodeFormat` controls node tooltip content.
- `linkFormat` controls link tooltip content.

```html
<ejs-sankey id="formattedTooltipSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Product A">
            <e-sankey-node-label text="Product A">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Revenue">
            <e-sankey-node-label text="Revenue">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Product A"
            targetId="Revenue"
            value="500">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        nodeFormat="$name : $value"
        linkFormat="$start.name ($start.value) → $target.name ($target.value) : $value">
    </e-sankey-tooltipsettings>
</ejs-sankey>
```

### Node Tooltip Format

Use node-related placeholders in `nodeFormat`.

```html
<e-sankey-tooltipsettings
    enable="true"
    nodeFormat="$name : $value">
</e-sankey-tooltipsettings>
```

In this example:

- `$name` displays the hovered node name.
- `$value` displays the hovered node value.

### Link Tooltip Format

Use source, target, and link placeholders in `linkFormat`.

```html
<e-sankey-tooltipsettings
    enable="true"
    linkFormat="$start.name ($start.out) → $target.name ($target.in) : $value">
</e-sankey-tooltipsettings>
```

In this example:

- `$start.name` displays the source node name.
- `$start.out` displays the outgoing value from the source node.
- `$target.name` displays the target node name.
- `$target.in` displays the incoming value to the target node.
- `$value` displays the link value.

### Supported Placeholders

The following placeholders can be used in Sankey tooltip formats:

- `$name` or `${name}` - Displays the hovered node name.
- `$value` or `${value}` - Displays the hovered node or link value.
- `$start.name` or `${start.name}` - Displays the source node name.
- `$start.value` or `${start.value}` - Displays the source node value.
- `$start.out` or `${start.out}` - Displays the outgoing value from the source node.
- `$target.name` or `${target.name}` - Displays the target node name.
- `$target.value` or `${target.value}` - Displays the target node value.
- `$target.in` or `${target.in}` - Displays the incoming value to the target node.

> **Note:** Use node-related placeholders such as `$name` and `$value` in `nodeFormat`. Use source, target, and link-related placeholders in `linkFormat`.

## Inline Tooltip Formatting

Tooltip values can be formatted directly within the `nodeFormat` and `linkFormat` properties by adding number format specifiers to supported placeholders. This allows node and link values to be formatted without handling the `tooltipRendering` event.

Sankey tooltips support both `$placeholder` and `${placeholder}` syntax. When applying formatting, use the `${placeholder:format}` syntax.

```html
<ejs-sankey id="inlineFormatSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Product A">
            <e-sankey-node-label text="Product A">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Revenue">
            <e-sankey-node-label text="Revenue">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Product A"
            targetId="Revenue"
            value="500">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        nodeFormat="$name : ${value:n2}"
        linkFormat="$start.name (${start.out:n2}) → ${target.name} (${target.in:n2}) : ${value:n2}">
    </e-sankey-tooltipsettings>
</ejs-sankey>
```

In the above example:

- `$name` and `$start.name` display text values directly.
- `${value:n2}` displays the node or link value with two decimal places.
- `${start.out:n2}` displays the outgoing source value with two decimal places.
- `${target.in:n2}` displays the incoming target value with two decimal places.

Inline formatting can be applied to the following placeholders:

- `$value`, `${value}`, or `${value:n2}`
- `$start.value`, `${start.value}`, or `${start.value:n2}`
- `$start.out`, `${start.out}`, or `${start.out:n2}`
- `$target.value`, `${target.value}`, or `${target.value:n2}`
- `$target.in`, `${target.in}`, or `${target.in:n2}`

The following number formats are supported:

- `n2` - Number with two decimal places.
- `n0` - Number without decimal places.
- `c2` - Currency with two decimal places.
- `p1` - Percentage with one decimal place.
- `e1` - Exponential notation with one decimal place.

> **Important:** Number formatting requires the `${placeholder:format}` syntax. String placeholders such as `${name}`, `${start.name}`, and `${target.name}` are displayed as plain text and do not support number formatting.

If the specified format does not match the resolved value type, the original value is displayed.

## Tooltip Appearance

Use the tooltip settings to customize its fill color, opacity, and text appearance.

```html
<ejs-sankey id="styledTooltipSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="100">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        fill="#1F2937"
        opacity="0.9"
        nodeFormat="$name : ${value:n2}"
        linkFormat="$start.name → $target.name : ${value:n2}">
        <e-sankey-tooltip-textstyle
            color="#FFFFFF"
            fontFamily="Segoe UI"
            size="13px"
            fontWeight="500">
        </e-sankey-tooltip-textstyle>
    </e-sankey-tooltipsettings>
</ejs-sankey>
```

The primary appearance properties are:

- `fill` - Sets the tooltip background color.
- `opacity` - Controls tooltip transparency from `0` to `1`.
- `color` - Sets the tooltip text color.
- `fontFamily` - Sets the tooltip font family.
- `size` - Sets the tooltip text size.
- `fontWeight` - Sets the tooltip font weight.

## Tooltip Templates

Use the `nodeTemplate` and `linkTemplate` properties to create custom HTML layouts for node and link tooltips.

- `nodeTemplate` customizes the tooltip displayed for nodes.
- `linkTemplate` customizes the tooltip displayed for links.

Define the templates as HTML elements and assign their IDs to the corresponding tooltip properties.

### Node Tooltip Template

Use `nodeTemplate` to customize the content displayed when the pointer moves over a Sankey node.

```html
<ejs-sankey id="nodeTemplateSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="100">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        nodeTemplate="#nodeTooltipTemplate">
    </e-sankey-tooltipsettings>
</ejs-sankey>

<script id="nodeTooltipTemplate" type="text/x-template">
    <div class="sankey-node-tooltip">
        <div class="tooltip-title">${name}</div>
        <div class="tooltip-row">
            Node value:
            <strong>${value}</strong>
        </div>
    </div>
</script>

<style>
    .sankey-node-tooltip {
        min-width: 150px;
        padding: 10px;
        color: #FFFFFF;
        background: #1F2937;
        border-radius: 6px;
    }

    .sankey-node-tooltip .tooltip-title {
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 600;
    }

    .sankey-node-tooltip .tooltip-row {
        font-size: 12px;
    }
</style>
```

The node template supports the following values:

- `${name}` - Displays the hovered node name.
- `${value}` - Displays the hovered node value.

### Link Tooltip Template

Use `linkTemplate` to customize the tooltip displayed when the pointer moves over a Sankey link.

```html
<ejs-sankey id="linkTemplateSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="100">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        linkTemplate="#linkTooltipTemplate">
    </e-sankey-tooltipsettings>
</ejs-sankey>

<script id="linkTooltipTemplate" type="text/x-template">
    <div class="sankey-link-tooltip">
        <div class="tooltip-title">
            ${start.name} → ${target.name}
        </div>

        <div class="tooltip-row">
            Flow value:
            <strong>${value}</strong>
        </div>

        <div class="tooltip-row">
            Source output:
            <strong>${start.out}</strong>
        </div>

        <div class="tooltip-row">
            Target input:
            <strong>${target.in}</strong>
        </div>
    </div>
</script>

<style>
    .sankey-link-tooltip {
        min-width: 190px;
        padding: 10px;
        color: #FFFFFF;
        background: #0F766E;
        border-radius: 6px;
    }

    .sankey-link-tooltip .tooltip-title {
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 600;
    }

    .sankey-link-tooltip .tooltip-row {
        margin-top: 3px;
        font-size: 12px;
    }
</style>
```

The link template supports the following values:

- `${start.name}` - Displays the source node name.
- `${start.value}` - Displays the source node value.
- `${start.out}` - Displays the outgoing value from the source node.
- `${target.name}` - Displays the target node name.
- `${target.value}` - Displays the target node value.
- `${target.in}` - Displays the incoming value to the target node.
- `${value}` - Displays the hovered link value.

### Node and Link Tooltip Templates

Both templates can be configured in the same Sankey Chart.

```html
<ejs-sankey id="tooltipTemplateSankey" width="100%" height="420px">
    <e-sankey-nodes>
        <e-sankey-node id="Product A">
            <e-sankey-node-label text="Product A">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Revenue">
            <e-sankey-node-label text="Revenue">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Product A"
            targetId="Revenue"
            value="500">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings
        enable="true"
        nodeTemplate="#nodeTooltipTemplate"
        linkTemplate="#linkTooltipTemplate">
    </e-sankey-tooltipsettings>
</ejs-sankey>

<script id="nodeTooltipTemplate" type="text/x-template">
    <div class="custom-sankey-tooltip">
        <div class="tooltip-title">${name}</div>
        <div>
            Total flow:
            <strong>${value}</strong>
        </div>
    </div>
</script>

<script id="linkTooltipTemplate" type="text/x-template">
    <div class="custom-sankey-tooltip">
        <div class="tooltip-title">
            ${start.name} → ${target.name}
        </div>
        <div>
            Flow:
            <strong>${value}</strong>
        </div>
    </div>
</script>

<style>
    .custom-sankey-tooltip {
        min-width: 160px;
        padding: 10px;
        color: #FFFFFF;
        background: #1F2937;
        border: 1px solid #64748B;
        border-radius: 6px;
    }

    .custom-sankey-tooltip .tooltip-title {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 600;
    }
</style>
```

> **Note:** Use `nodeFormat` and `linkFormat` for text-based tooltip customization. Use `nodeTemplate` and `linkTemplate` when the tooltip requires a custom HTML layout, multiple sections, or advanced styling.

> **Important:** Template content that originates from users or external sources must be validated or encoded before it is inserted into the tooltip HTML.

## Tooltip Animation

Use `enableAnimation`, `duration`, `fadeOutDuration`, and `fadeOutMode` to control tooltip animation.

```html
<e-sankey-tooltipsettings
    enable="true"
    enableAnimation="true"
    duration="300"
    fadeOutDuration="1000"
    fadeOutMode="Move"
    nodeFormat="$name : $value"
    linkFormat="$start.name → $target.name : $value">
</e-sankey-tooltipsettings>
```

- `enableAnimation` enables or disables tooltip animation.
- `duration` defines the animation duration in milliseconds.
- `fadeOutDuration` specifies how long the fade-out animation lasts.
- `fadeOutMode` controls how the tooltip disappears.

## Tooltip Rendering Event

Use the `tooltipRendering` event to customize tooltip content dynamically before it is displayed.

```html
<ejs-sankey
    id="dynamicTooltipSankey"
    width="100%"
    height="420px"
    tooltipRendering="onTooltipRendering">

    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="100">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings enable="true">
    </e-sankey-tooltipsettings>
</ejs-sankey>

<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.node) {
            var nodeId = args.node.id || "";

            args.text =
                "<div>" +
                    "<b>" + nodeId + "</b><br/>" +
                    "Sankey node details" +
                "</div>";
        } else if (args.link) {
            var sourceId = args.link.sourceId || "";
            var targetId = args.link.targetId || "";
            var value = args.link.value || 0;

            args.text =
                "<div>" +
                    "<b>" +
                        sourceId + " → " + targetId +
                    "</b><br/>" +
                    "Value: " + value +
                "</div>";
        }
    }
</script>
```

Use `tooltipRendering` when the tooltip requires:

- Dynamically calculated values.
- Conditional text.
- Additional metadata.
- Custom HTML content.
- Locale-specific formatting.

## Conditional Tooltip Display

Set `args.cancel` to `true` in the `tooltipRendering` event to prevent the tooltip from being displayed for specific nodes or links.

```html
<ejs-sankey
    id="conditionalTooltipSankey"
    width="100%"
    height="420px"
    tooltipRendering="onConditionalTooltip">

    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node">
            </e-sankey-node-label>
        </e-sankey-node>

        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node">
            </e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link
            sourceId="Source"
            targetId="Target"
            value="80">
        </e-sankey-link>
    </e-sankey-links>

    <e-sankey-tooltipsettings enable="true">
    </e-sankey-tooltipsettings>
</ejs-sankey>

<script>
    function onConditionalTooltip(args) {
        if (!args || !args.link) {
            return;
        }

        var value = args.link.value || 0;

        if (value < 100) {
            args.cancel = true;
        }
    }
</script>
```

In this example, link tooltips are not displayed when the link value is less than `100`.

## Best Practices

1. Use `nodeFormat` and `linkFormat` for standard tooltip content.
2. Use inline formatting for number, currency, percentage, and exponential formats.
3. Use `tooltipRendering` only for dynamic, conditional, or calculated content.
4. Keep tooltip content concise and easy to scan.
5. Use sufficient contrast between the tooltip fill and text colors.
6. Avoid expensive calculations inside `tooltipRendering`.
7. Set `args.cancel` when a tooltip should not be displayed.
8. Validate externally supplied text before inserting it into tooltip HTML.