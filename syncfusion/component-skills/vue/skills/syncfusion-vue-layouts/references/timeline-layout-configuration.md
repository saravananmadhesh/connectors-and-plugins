# Timeline Layout Configuration (Vue 3)

## Table of Contents
- [Orientation Options](#orientation-options)
- [Alignment Modes](#alignment-modes)
- [Content Positioning Strategies](#content-positioning-strategies)
- [Choosing the Right Layout](#choosing-the-right-layout)
- [Globalization and Persistence](#globalization-and-persistence)

## Orientation Options

### Vertical Orientation (Default)

Items flow top-to-bottom:

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical">
      <e-items>
        <e-item content="Q1 2026" />
        <e-item content="Q2 2026" />
        <e-item content="Q3 2026" />
        <e-item content="Q4 2026" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### Horizontal Orientation

Items flow left-to-right:

```vue
<template>
  <div style="height: 200px;">
    <TimelineComponent orientation="Horizontal">
      <e-items>
        <e-item content="Step 1" />
        <e-item content="Step 2" />
        <e-item content="Step 3" />
        <e-item content="Step 4" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### Dynamic Orientation

```vue
<template>
  <div>
    <button @click="orientation = orientation === 'Vertical' ? 'Horizontal' : 'Vertical'">
      Toggle Orientation
    </button>
    <div :style="{ height: orientation === 'Vertical' ? '400px' : '200px' }">
      <TimelineComponent :orientation="orientation">
        <e-items>
          <e-item content="A" />
          <e-item content="B" />
          <e-item content="C" />
        </e-items>
      </TimelineComponent>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimelineComponent } from '@syncfusion/ej2-vue-layouts';

const orientation = ref('Vertical');
</script>
```

## Alignment Modes

### Before (Default)

Content appears to the left of the dot (in LTR):

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical" align="Before">
      <e-items>
        <e-item content="Event 1" oppositeContent="Description 1" />
        <e-item content="Event 2" oppositeContent="Description 2" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### After

Content appears to the right of the dot:

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical" align="After">
      <e-items>
        <e-item content="Event 1" oppositeContent="Description 1" />
        <e-item content="Event 2" oppositeContent="Description 2" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### Alternate

Items alternate between Before and After alignment:

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical" align="Alternate">
      <e-items>
        <e-item content="Event 1" oppositeContent="Description 1" />
        <e-item content="Event 2" oppositeContent="Description 2" />
        <e-item content="Event 3" oppositeContent="Description 3" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### AlternateReverse

Items alternate, starting from After:

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical" align="AlternateReverse">
      <e-items>
        <e-item content="Event 1" oppositeContent="Description 1" />
        <e-item content="Event 2" oppositeContent="Description 2" />
        <e-item content="Event 3" oppositeContent="Description 3" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

### Horizontal with Alternate

```vue
<template>
  <div style="height: 200px;">
    <TimelineComponent orientation="Horizontal" align="Alternate">
      <e-items>
        <e-item content="Milestone 1" oppositeContent="Jan 2026" />
        <e-item content="Milestone 2" oppositeContent="Apr 2026" />
        <e-item content="Milestone 3" oppositeContent="Jul 2026" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

## Content Positioning Strategies

### Single Content per Item

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Single line event" />
    </e-items>
  </TimelineComponent>
</template>
```

### Dual Content (content + oppositeContent)

```vue
<template>
  <TimelineComponent align="Alternate">
    <e-items>
      <e-item content="Title" oppositeContent="Date" />
    </e-items>
  </TimelineComponent>
</template>
```

### Multi-line Content

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="Line 1&#10;Line 2&#10;Line 3" />
    </e-items>
  </TimelineComponent>
</template>
```

### HTML Content

```vue
<template>
  <TimelineComponent>
    <e-items>
      <e-item content="<div class='custom-event'><strong>Bold</strong> normal text</div>" />
    </e-items>
  </TimelineComponent>
</template>
```

## Choosing the Right Layout

| Use Case | Orientation | Alignment |
|----------|-------------|-----------|
| Order/shipping tracking | Vertical | Before |
| Project milestones | Horizontal | Alternate |
| Activity feed | Vertical | After |
| Process flow | Vertical | Alternate |
| Roadmap | Horizontal | After |
| History (chronological) | Vertical | Before |

### Example: Process Flow

```vue
<template>
  <div style="height: 400px;">
    <TimelineComponent orientation="Vertical" align="Alternate">
      <e-items>
        <e-item content="Discovery" oppositeContent="Week 1" />
        <e-item content="Design" oppositeContent="Week 2-3" />
        <e-item content="Development" oppositeContent="Week 4-8" />
        <e-item content="Testing" oppositeContent="Week 9-10" />
        <e-item content="Launch" oppositeContent="Week 11" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

## Globalization and Persistence

### Locale Configuration

```vue
<template>
  <TimelineComponent locale="en-US">
    <e-items>
      <e-item content="Event" />
    </e-items>
  </TimelineComponent>
</template>
```

### Enable Persistence

```vue
<template>
  <TimelineComponent id="my-timeline" :enablePersistence="true">
    <e-items>
      <e-item content="Event" />
    </e-items>
  </TimelineComponent>
</template>
```

**Note:** Component must have an `id` attribute for persistence to work.

### RTL Support

```vue
<template>
  <div dir="rtl">
    <TimelineComponent :enableRtl="true">
      <e-items>
        <e-item content="Arabic content" />
      </e-items>
    </TimelineComponent>
  </div>
</template>
```

## Best Practices

1. **Choose orientation based on content**: Vertical for many items, horizontal for few

2. **Use alternate for balanced layouts**: When you have both content and dates

3. **Always set container height**: Required for rendering

4. **Consider mobile**: Horizontal may need scrolling on small screens

5. **Use opposite content wisely**: For dates, descriptions, or secondary info

6. **Test RTL**: Verify alignment works in right-to-left languages

7. **Persist user state**: When timeline state changes from defaults

**Next:** Learn about [items and content](timeline-items-and-content.md) for advanced item configuration.
