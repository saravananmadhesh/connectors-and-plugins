# Expand Modes in Accordion

## Table of Contents

- [Overview](#overview)
- [Single Expand Mode](#single-expand-mode)
- [Multiple Expand Mode](#multiple-expand-mode)
- [Keeping Single Pane Open Always](#keeping-single-pane-open-always)
- [Choosing the Right Mode](#choosing-the-right-mode)
- [Interaction Patterns](#interaction-patterns)
- [Configuration Examples](#configuration-examples)

---

## Overview

The Accordion component supports two expand modes that determine how items behave when users interact with them:

1. **Single Expand Mode**: Only one item can be expanded at a time. Expanding a new item automatically collapses any previously expanded item.

2. **Multiple Expand Mode**: Multiple items can remain expanded simultaneously. Each item can be independently expanded or collapsed without affecting others.

The expand mode is controlled by the `expandMode` property on the `<ejs-accordion>` tag. Understanding these modes and when to use each is fundamental to implementing accordions that match your application's user experience requirements.

---

## Single Expand Mode

### Behavior

In Single expand mode, only one accordion item can be expanded at any given time. When a user clicks to expand an item, any previously expanded item is automatically collapsed. This creates mutually exclusive behavior similar to radio buttons or step-by-step wizards.

**Key Characteristics:**
- Only one item displays content at a time
- Expanding a new item collapses the currently expanded item
- Clear, focused presentation of one section at a time
- Reduces visual clutter when dealing with many items
- Prevents users from comparing multiple sections simultaneously

### Configuration

To enable Single expand mode, set the `expandMode` attribute to `"Single"`:

```cshtml
<ejs-accordion id="singleModeAccordion" expandMode="Single">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Getting Started" content="Installation and basic setup..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Features" content="Learn about key features..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Advanced" content="Advanced configuration..."></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

### Use Cases for Single Mode

- **Step-by-step Wizards**: Guide users through sequential steps where only the current step needs to be visible
- **Navigation Menus**: Provide menu hierarchies where users navigate to one section at a time
- **FAQ Sections with Limited Space**: When displaying space-constrained FAQs where showing all open answers would overflow the page
- **Tabbed Navigation**: Replace tab components with accordion behavior that only shows one tab content
- **Tutorial Sections**: Step through tutorial sections one at a time to maintain focus

### Example: Installation Wizard

```cshtml
<ejs-accordion id="wizardAccordion" expandMode="Single" expandedIndices="[0]">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem expanded="true" header="Step 1: System Requirements" 
            content="Verify your system meets the requirements. Check OS version, RAM, and disk space.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Step 2: Download" 
            content="Download the installation package from our website.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Step 3: Configure" 
            content="Configure installation settings and options.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Step 4: Complete" 
            content="Finish the installation and launch the application.">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

---

## Multiple Expand Mode

### Behavior

Multiple expand mode is the default behavior of the Accordion component. In this mode, users can expand multiple items simultaneously, and each item can be independently toggled without affecting others.

**Key Characteristics:**
- Multiple items can remain expanded at the same time
- Clicking an expanded item's header toggles it closed
- Clicking a collapsed item's header opens it without affecting other items
- Users can view and compare content from multiple sections
- Greater flexibility for users to organize information
- May require more vertical space due to multiple expanded items

### Configuration

To enable Multiple expand mode (or use the default), explicitly set the `expandMode` attribute to `"Multiple"` or omit it:

```cshtml
<!-- Explicitly setting Multiple mode -->
<ejs-accordion id="multiModeAccordion" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Features" content="Key features and capabilities..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Pricing" content="Pricing plans and options..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Support" content="Customer support information..."></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<!-- Or use the default by omitting expandMode -->
<ejs-accordion id="defaultAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Item 1" content="Content 1..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Item 2" content="Content 2..."></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

### Use Cases for Multiple Mode

- **FAQ Sections**: Display multiple FAQs with answers visible simultaneously for comparison
- **Documentation**: Show multiple sections of documentation that readers might want to reference together
- **Feature Lists**: Display features where users need to read and compare multiple feature descriptions
- **Product Details**: Multiple product aspects (specifications, warranty, support, reviews) that users might want to view together
- **Settings and Options**: Configuration pages with multiple settings categories that users might adjust independently

### Example: FAQ Section

```cshtml
<ejs-accordion id="faqAccordion" expandMode="Multiple">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="What is an Accordion?" 
            content="An accordion is a UI component that organizes content into collapsible sections called items or panes.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Can I use Multiple Expand Mode?" 
            content="Yes, the Accordion component supports Multiple expand mode, allowing multiple items to be open simultaneously.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="How do I customize animations?" 
            content="Use the animation property to configure expand and collapse animation effects, duration, and easing.">
        </e-accordion-accordionitem>
        <e-accordion-accordionitem header="Is data binding supported?" 
            content="Yes, you can bind accordion items to a DataSource for dynamic item generation.">
        </e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

---

## Keeping Single Pane Open Always

A common requirement in Single expand mode is to prevent the currently expanded item from being collapsed when clicked again. This ensures that at least one item is always expanded, which can be important for providing continuous context.

### Implementation Approach

To keep a single pane open always, use the `expanding` event to prevent collapse actions on the last expanded item. The `expanding` event fires before an item's state changes and provides a `cancel` property that can prevent the action.

### Event-Based Prevention

```cshtml
<ejs-accordion id="alwaysOpenAccordion" expandMode="Single">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem expanded="true" header="Section 1" content="Content for section 1..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Section 2" content="Content for section 2..."></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Section 3" content="Content for section 3..."></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('alwaysOpenAccordion').ej2_instances[0];
        
        function expanding(args) {
            // If trying to collapse an item (isCollapsed property is true or expand is false)
            // and there are no other expanded items, prevent the collapse
            if (!args.isExpanding) {
                // Check if this is the only expanded item
                var expandedItems = accordion.expandedIndices;
                if (expandedItems.length === 1) {
                    args.cancel = true; // Prevent collapse
                }
            }
        }
    });
</script>
```

### How This Works

1. The `expanding` event fires before an item expands or collapses
2. The event args include `cancel` property and `isExpanding` flag
3. Check if the action is a collapse (`!args.isExpanding`)
4. Check if there are other expanded items (`accordion.expandedIndices.length`)
5. If it's the only expanded item, set `args.cancel = true` to prevent collapse
6. Users can now expand different items, but cannot collapse the last one

### User Experience

With this pattern:
- Users can click any item to expand it
- The previously expanded item automatically collapses (Single mode behavior)
- At least one item is always expanded
- Clicking the currently expanded item's header does nothing (no visual feedback that it was clicked)
- This maintains a consistent context throughout the user's interaction

---

## Choosing the Right Mode

### Decision Matrix

| Scenario | Recommended Mode | Reason |
|----------|-----------------|--------|
| Step-by-step wizard | Single | Focus user attention on current step |
| FAQ section | Multiple | Users compare questions/answers |
| Menu navigation | Single | Clear navigation hierarchy |
| Feature comparison | Multiple | View multiple features simultaneously |
| Documentation index | Multiple | Reference multiple sections |
| Settings categories | Multiple | Adjust multiple settings in view |
| Tutorial sections | Single | Maintain focus on one lesson |
| Product details | Multiple | View different aspects together |
| Form sections | Single | Focus on current form section |
| Help topics | Multiple | Reference multiple help articles |

### Questions to Ask

When choosing a mode, consider:

1. **Will users need to compare information?** → Multiple mode
2. **Should we minimize scrolling and vertical space?** → Single mode
3. **Can we assume users focus on one thing at a time?** → Single mode
4. **Might users need context from multiple sections?** → Multiple mode
5. **Is this a linear workflow?** → Single mode
6. **Is this reference/browsing content?** → Multiple mode

---

## Interaction Patterns

### Single Mode Interactions

```
Initial State:
[Header 1] - Expanded ↓ Content 1...
[Header 2] - Collapsed
[Header 3] - Collapsed

User clicks Header 2:
[Header 1] - Collapsed
[Header 2] - Expanded ↓ Content 2...
[Header 3] - Collapsed

User clicks Header 3:
[Header 1] - Collapsed
[Header 2] - Collapsed
[Header 3] - Expanded ↓ Content 3...
```

### Multiple Mode Interactions

```
Initial State:
[Header 1] - Expanded ↓ Content 1...
[Header 2] - Collapsed
[Header 3] - Collapsed

User clicks Header 2:
[Header 1] - Expanded ↓ Content 1...
[Header 2] - Expanded ↓ Content 2...
[Header 3] - Collapsed

User clicks Header 1 (already expanded):
[Header 1] - Collapsed
[Header 2] - Expanded ↓ Content 2...
[Header 3] - Collapsed

User clicks Header 3:
[Header 1] - Collapsed
[Header 2] - Expanded ↓ Content 2...
[Header 3] - Expanded ↓ Content 3...
```

---

## Configuration Examples

### Single Mode with Initial State

```cshtml
<ejs-accordion id="singleWithInitial" expandMode="Single" expandedIndices="[0]">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="First" content="This item starts expanded"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Second" content="This item starts collapsed"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

### Multiple Mode with Multiple Initial Expanded Items

```cshtml
<ejs-accordion id="multiWithMultiple" expandMode="Multiple" expandedIndices="[0, 2]">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="First" content="Initially expanded"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Second" content="Initially collapsed"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Third" content="Initially expanded"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

### Switching Modes Dynamically

```cshtml
<ejs-accordion id="dynamicModeAccordion" expandMode="Single">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Item 1" content="Content 1"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Item 2" content="Content 2"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<button onclick="switchMode()">Switch to Multiple</button>

<script>
    function switchMode() {
        var accordion = document.getElementById('dynamicModeAccordion').ej2_instances[0];
        accordion.expandMode = accordion.expandMode === 'Single' ? 'Multiple' : 'Single';
        accordion.refresh();
    }
</script>
```

---

## Summary

- **Single Mode**: Use when only one item should be visible at a time (wizards, navigation, step-by-step workflows)
- **Multiple Mode**: Use when users need to view and compare multiple sections (FAQs, documentation, features)
- **Always Open**: In Single mode, use the `expanding` event to prevent collapsing the last expanded item when needed
- **Mode Selection**: Consider your use case, user tasks, and whether comparison or focus is more important

Choose the mode that best supports your users' tasks and provides the most intuitive interaction pattern for your content.
