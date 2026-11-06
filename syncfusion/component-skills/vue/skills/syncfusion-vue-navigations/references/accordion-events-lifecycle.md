# Events & Lifecycle

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Expand/Collapse Events](#expandcollapse-events)
- [Click Events](#click-events)
- [Event Arguments](#event-arguments)
- [Common Patterns](#common-patterns)
- [Event Prevention](#event-prevention)

## Lifecycle Events

Lifecycle events fire when the accordion component is created, destroyed, or when panels expand/collapse.

### Component Created Event

Fires when the accordion is fully initialized:

```vue
<template>
  <div>
    <p v-if="createdMessage">{{ createdMessage }}</p>
    <ejs-accordion @created="onCreated">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const createdMessage = ref('');

const onCreated = (args) => {
  createdMessage.value = 'Accordion initialized successfully!';
  console.log('Accordion created:', args);
};
</script>
```

### Component Destroyed Event

Fires when the accordion component is destroyed:

```vue
<template>
  <div>
    <button @click="destroyAccordion">Destroy Accordion</button>
    <p v-if="isDestroyed" style="color: red">Accordion destroyed</p>

    <ejs-accordion v-if="!isDestroyed" @destroyed="onDestroyed">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const isDestroyed = ref(false);
const accordionRef = ref(null);

const onDestroyed = () => {
  console.log('Accordion destroyed');
};

const destroyAccordion = () => {
  accordionRef.value?.destroy?.();
  isDestroyed.value = true;
};
</script>
```

## Expand/Collapse Events

Events triggered when accordion panels are expanded or collapsed:

### Expanding Event (Before Expand)

Fires before a panel expands - can be canceled:

```vue
<template>
  <div>
    <p>{{ statusMessage }}</p>

    <ejs-accordion @expanding="onExpanding">
      <e-accordion-items>
        <e-accordion-item header="Always Expandable" content="This always expands" />
        <e-accordion-item header="Conditional Expand" content="This expands based on logic" />
        <e-accordion-item header="Locked" content="This cannot expand" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const statusMessage = ref('');

const onExpanding = (args) => {
  // Prevent expansion of locked item (index 2)
  if (args.index === 2) {
    args.cancel = true;
    statusMessage.value = 'Item is locked and cannot be expanded';
  } else {
    statusMessage.value = `Expanding item ${args.index + 1}...`;
  }
};
</script>
```

### Expanded Event (After Expand)

Fires after a panel has expanded:

```vue
<template>
  <div>
    <p v-if="expandedInfo">Expanded: {{ expandedInfo }}</p>

    <ejs-accordion @expanded="onExpanded">
      <e-accordion-items>
        <e-accordion-item header="Section 1" content="Content 1" />
        <e-accordion-item header="Section 2" content="Content 2" />
        <e-accordion-item header="Section 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const expandedInfo = ref('');

const onExpanded = (args) => {
  const headerText = args.accordion.items[args.index]?.headerTemplate || `Item ${args.index + 1}`;
  expandedInfo.value = `${headerText} expanded at ${new Date().toLocaleTimeString()}`;
};
</script>
```

### Collapse on Other Item Expand (Single Mode)

In Single mode, collapsing other items when one expands:

```vue
<template>
  <ejs-accordion :expandMode="'Single'" @expanding="onItemExpand">
    <e-accordion-items>
      <e-accordion-item header="Item 1" content="Content 1" />
      <e-accordion-item header="Item 2" content="Content 2" />
      <e-accordion-item header="Item 3" content="Content 3" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const onItemExpand = (args) => {
  console.log(`Item ${args.index} expanding, others will collapse`);
};
</script>
```

## Click Events

Handle clicks on headers and content:

### Header Click Event

```vue
<template>
  <div>
    <p v-if="clickInfo">{{ clickInfo }}</p>

    <ejs-accordion @clicked="onHeaderClick">
      <e-accordion-items>
        <e-accordion-item header="Click Me" content="You clicked the header!" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const clickInfo = ref('');

const onHeaderClick = (args) => {
  clickInfo.value = `Header ${args.index} clicked at ${new Date().toLocaleTimeString()}`;
};
</script>
```

### Multiple Item Click Tracking

```vue
<template>
  <div>
    <div>
      <h4>Click History</h4>
      <ul>
        <li v-for="(click, index) in clickHistory" :key="index">
          {{ click }}
        </li>
      </ul>
    </div>

    <ejs-accordion @clicked="trackClick">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
        <e-accordion-item header="Item 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const clickHistory = ref([]);

const trackClick = (args) => {
  const timestamp = new Date().toLocaleTimeString();
  clickHistory.value.push(`Item ${args.index} clicked at ${timestamp}`);
  
  // Keep only last 10 clicks
  if (clickHistory.value.length > 10) {
    clickHistory.value.shift();
  }
};
</script>
```

## Event Arguments

All events pass an `args` object with relevant information:

### Expand/Collapse Event Args

```vue
<template>
  <ejs-accordion @expanded="handleExpanded" @expanding="handleExpanding">
    <e-accordion-items>
      <e-accordion-item header="Item 1" content="Content 1" />
      <e-accordion-item header="Item 2" content="Content 2" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const handleExpanding = (args) => {
  console.log({
    // Properties available in expanding event:
    isExpanded: args.isExpanded,      // boolean - whether item is being expanded
    index: args.index,                 // number - index of the item
    cancel: args.cancel,              // boolean - set to true to cancel
    accordion: args.accordion,         // object - accordion instance
    element: args.element             // DOM element
  });
};

const handleExpanded = (args) => {
  console.log({
    // Properties available after expanded:
    isExpanded: args.isExpanded,       // true after expand completes
    index: args.index,
    accordion: args.accordion,
    element: args.element,
    contentElement: args.contentElement // the content DOM element
  });
};
</script>
```

### Click Event Args

```vue
<template>
  <ejs-accordion @clicked="handleClick">
    <e-accordion-items>
      <e-accordion-item header="Item 1" content="Content 1" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const handleClick = (args) => {
  console.log({
    // Properties in click event:
    index: args.index,                 // item index
    isExpanded: args.isExpanded,      // whether item was expanded after click
    originalEvent: args.originalEvent, // original click event
    element: args.element,             // clicked element
    accordion: args.accordion          // accordion instance
  });
};
</script>
```

## Common Patterns

### Prevent Expanding Specific Items

Useful for locked or disabled items:

```vue
<template>
  <div>
    <label>
      <input v-model="isLocked" type="checkbox" />
      Lock Item 2
    </label>

    <ejs-accordion @expanding="preventExpand">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Always expandable" />
        <e-accordion-item header="Item 2" content="Can be locked" />
        <e-accordion-item header="Item 3" content="Always expandable" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const isLocked = ref(false);

const preventExpand = (args) => {
  if (isLocked.value && args.index === 1) {
    args.cancel = true;
  }
};
</script>
```

### Track Expansion History

Monitor which items have been expanded:

```vue
<template>
  <div>
    <div style="margin-bottom: 20px">
      <h3>Expansion History</h3>
      <p>Items expanded: {{ expandedItems.join(', ') || 'None yet' }}</p>
      <p>Total expansions: {{ totalExpansions }}</p>
    </div>

    <ejs-accordion @expanded="trackExpansion">
      <e-accordion-items>
        <e-accordion-item header="Item 1" content="Content 1" />
        <e-accordion-item header="Item 2" content="Content 2" />
        <e-accordion-item header="Item 3" content="Content 3" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const expandedItems = ref([]);
const totalExpansions = ref(0);

const trackExpansion = (args) => {
  if (args.isExpanded && !expandedItems.value.includes(args.index)) {
    expandedItems.value.push(args.index);
  }
  totalExpansions.value++;
};
</script>
```

### Load Content on Expand

Fetch data only when item expands:

```vue
<template>
  <ejs-accordion @expanded="loadContentOnExpand">
    <e-accordion-items>
      <e-accordion-item
        v-for="item in items"
        :key="item.id"
        :header="item.header"
        :content="contentCache[item.id] || 'Loading...'"
      />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const items = ref([
  { id: 1, header: 'Data 1' },
  { id: 2, header: 'Data 2' },
  { id: 3, header: 'Data 3' }
]);

const contentCache = ref({});

const loadContentOnExpand = async (args) => {
  const itemId = items.value[args.index]?.id;
  
  if (args.isExpanded && itemId && !contentCache.value[itemId]) {
    try {
      const response = await fetch(`/api/content/${itemId}`);
      const data = await response.json();
      contentCache.value[itemId] = data.content;
    } catch (error) {
      contentCache.value[itemId] = 'Error loading content';
    }
  }
};
</script>
```

### Analytics Tracking

Track user interactions for analytics:

```vue
<template>
  <ejs-accordion @expanded="trackAnalytics" @clicked="trackClick">
    <e-accordion-items>
      <e-accordion-item header="Feature A" content="Content A" />
      <e-accordion-item header="Feature B" content="Content B" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const trackAnalytics = (args) => {
  const event = {
    eventType: 'accordion_expanded',
    itemIndex: args.index,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
  
  // Send to analytics service
  console.log('Analytics event:', event);
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
};

const trackClick = (args) => {
  const event = {
    eventType: 'accordion_click',
    itemIndex: args.index,
    timestamp: new Date().toISOString()
  };
  
  console.log('Click event:', event);
};
</script>
```

## Event Prevention

### Cancel Expansion with Confirmation

```vue
<template>
  <ejs-accordion @expanding="requireConfirmation">
    <e-accordion-items>
      <e-accordion-item header="Important Section" content="Requires confirmation to expand" />
      <e-accordion-item header="Normal Section" content="Expands without confirmation" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const requireConfirmation = (args) => {
  // Require confirmation only for first item
  if (args.index === 0) {
    const confirmed = confirm('This section requires confirmation. Continue?');
    if (!confirmed) {
      args.cancel = true;
    }
  }
};
</script>
```

### Prevent Closing Expanded Item

Keep an item open and prevent collapsing:

```vue
<template>
  <div>
    <label>
      <input v-model="lockFirstItem" type="checkbox" />
      Lock First Item Open
    </label>

    <ejs-accordion :expandMode="'Single'" @expanding="handleExpand">
      <e-accordion-items>
        <e-accordion-item header="Locked Section" content="Cannot close when locked" />
        <e-accordion-item header="Normal Section" content="Normal behavior" />
      </e-accordion-items>
    </ejs-accordion>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const lockFirstItem = ref(true);

const handleExpand = (args) => {
  // Prevent collapsing first item when it's locked
  if (lockFirstItem.value && !args.isExpanded && args.index === 0) {
    args.cancel = true;
  }
};
</script>
```

### Validate Before Expand

Perform validation before allowing expansion:

```vue
<template>
  <ejs-accordion @expanding="validateBeforeExpand">
    <e-accordion-items>
      <e-accordion-item header="Section 1" content="Content 1" />
      <e-accordion-item header="Requires Validation" content="Content 2" />
      <e-accordion-item header="Section 3" content="Content 3" />
    </e-accordion-items>
  </ejs-accordion>
</template>

<script setup>
import { ref } from 'vue';
import { AccordionComponent, AccordionItemsDirective, AccordionItemDirective } from '@syncfusion/ej2-vue-navigations';

export default {
  name: "App",
  components: {
    'ejs-accordion': AccordionComponent,
    'e-accordionitems': AccordionItemsDirective,
    'e-accordionitem': AccordionItemDirective
  }
}

const validateBeforeExpand = (args) => {
  // Custom validation for item index 1
  if (args.index === 1) {
    const isValid = performValidation();
    if (!isValid) {
      args.cancel = true;
      alert('Validation failed. Please complete the previous section.');
    }
  }
};

const performValidation = () => {
  // Perform any validation logic
  return true; // return false to prevent expansion
};
</script>
```

---

## Troubleshooting

**Issue: Events not firing**
- Ensure event handlers are properly bound with @eventname syntax
- Check browser console for JavaScript errors
- Verify accordion component is fully initialized

**Issue: Event.cancel not working**
- Make sure using `args.cancel = true` in before-expand events
- Note that `@expanded` fires after expand - cannot be canceled
- Use `@expanding` event to prevent expansion

**Issue: Multiple events firing**
- This is normal - both `@expanding` and `@expanded` fire for expansions
- Use appropriate event for your logic

**Issue: Performance issues with many event handlers**
- Avoid heavy processing in event handlers
- Debounce or throttle frequently-fired events
- Consider moving complex logic to computed properties
