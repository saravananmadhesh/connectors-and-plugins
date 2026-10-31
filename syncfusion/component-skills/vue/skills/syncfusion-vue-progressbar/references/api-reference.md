# ProgressBar API Reference

Complete API reference for the Syncfusion Vue 3 ProgressBar ([`ProgressBarComponent`](https://ej2.syncfusion.com/vue/documentation/api/progressbar/)) component, a versatile progress indication control that displays the progress of a task in linear or circular shapes with customizable animations, colors, annotations, and multiple progress states.

- **Base API Documentation:** [ProgressBar](https://ej2.syncfusion.com/vue/documentation/api/progressbar/index-default)
- **Package:** `@syncfusion/ej2-vue-progressbar`
- **Component:** `ProgressBarComponent`

## Table of Contents

- [Properties](#properties)
  - [Basic Configuration](#basic-configuration)
  - [Progress Value and Range](#progress-value-and-range)
  - [Appearance and Styling](#appearance-and-styling)
  - [Circular ProgressBar Specific](#circular-progressbar-specific)
  - [Secondary Progress and Segments](#secondary-progress-and-segments)
  - [Labels, Annotations, and Tooltips](#labels-annotations-and-tooltips)
  - [Animation and Interaction](#animation-and-interaction)
  - [Localization and State](#localization-and-state)
- [Data Models](#data-models)
  - [AnimationModel](#animationmodel)
  - [FontModel](#fontmodel)
  - [MarginModel](#marginmodel)
  - [ProgressAnnotationSettingsModel](#progressannotationsettingsmodel)
  - [TooltipSettingsModel](#tooltipsettingsmodel)
  - [RangeColorModel](#rangecolormodel)
- [Events](#events)
  - [animationComplete](#animationcomplete)
  - [load](#load)
  - [loaded](#loaded)
  - [progressCompleted](#progresscompleted)
  - [valueChanged](#valuechanged)
  - [textRender](#textrender)
  - [tooltipRender](#tooltiprender)
  - [mouseClick](#mouseclick)
  - [mouseDown](#mousedown)
  - [mouseMove](#mousemove)
  - [mouseUp](#mouseup)
  - [mouseLeave](#mouseleave)
- [Methods](#methods)
  - [destroy()](#destroy)
- [Enums](#enums)
  - [ProgressType](#progresstype)
  - [CornerType](#cornertype)
  - [ProgressTheme](#progresstheme)
- [Modules](#modules)
  - [ProgressAnnotation](#progressannotation)
  - [ProgressTooltip](#progresstooltip)
- [Common Usage Patterns](#common-usage-patterns)
  - [Pattern 1: Linear Progress with Animation](#pattern-1-linear-progress-with-animation)
  - [Pattern 2: Circular Progress with Annotation](#pattern-2-circular-progress-with-annotation)
  - [Pattern 3: Indeterminate Progress](#pattern-3-indeterminate-progress)
  - [Pattern 4: Segmented Progress for Multi-Step Process](#pattern-4-segmented-progress-for-multi-step-process)
  - [Pattern 5: Buffer/Secondary Progress](#pattern-5-buffersecondary-progress)
  - [Pattern 6: Range Colors and Gradients](#pattern-6-range-colors-and-gradients)
- [Additional Resources](#additional-resources)

---

## Properties

### Basic Configuration

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `type` | `ProgressType` | `'Linear'` | Specifies the type of progress bar. Supported values: `'Linear'`, `'Circular'`. | [type](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#type) |
| `value` | `number` | `null` | The current progress value (0-100 or custom range). | [value](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#value) |
| `width` | `string` | `null` | Sets the width of the progress bar (e.g., `'100%'`, `'500px'`). | [width](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#width) |
| `height` | `string` | `null` | Sets the height of the progress bar (e.g., `'100px'`, `'100%'`). | [height](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#height) |
| `margin` | `MarginModel` | `{}` | Defines outer spacing around the progress bar. See [`MarginModel`](#marginmodel). | [margin](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#margin) |
| `theme` | `ProgressTheme` | `'Fabric'` | Applies a predefined visual theme. Supported values: `'Fabric'`, `'Bootstrap'`, `'Bootstrap4'`, `'Material'`, `'Highcontrast'`, `'TailwindDark'`, `'Tailwind'`. | [theme](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#theme) |

### Progress Value and Range

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `minimum` | `number` | `0` | Specifies the minimum value of the progress range. | [minimum](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#minimum) |
| `maximum` | `number` | `100` | Specifies the maximum value of the progress range. | [maximum](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#maximum) |
| `isIndeterminate` | `boolean` | `false` | When `true`, enables indeterminate state for unknown progress. Use when the total progress amount is not known. | [isIndeterminate](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#isindeterminate) |
| `isActive` | `boolean` | `false` | When `true`, the indeterminate progress bar displays animation. Only applicable when `isIndeterminate` is `true`. | [isActive](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#isactive) |

### Appearance and Styling

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `progressColor` | `string` | `null` | Sets the fill color of the progress bar (hex or rgba). | [progressColor](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#progresscolor) |
| `trackColor` | `string` | `null` | Sets the background/track color of the progress bar (hex or rgba). | [trackColor](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#trackcolor) |
| `progressThickness` | `number` | `0` | Specifies the thickness/width of the progress bar in pixels. | [progressThickness](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#progressthickness) |
| `trackThickness` | `number` | `0` | Specifies the thickness/width of the track in pixels. | [trackThickness](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#trackthickness) |
| `cornerRadius` | `CornerType` | `'Auto'` | Specifies the corner style for the progress bar ends. Supported values: `'Auto'`, `'Square'`, `'Round'`, `'Round4px'`. | [cornerRadius](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#cornerradius) |
| `isGradient` | `boolean` | `false` | When `true`, applies a gradient fill to the progress bar. Requires `rangeColors` configuration. | [isGradient](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#isgradient) |
| `isStriped` | `boolean` | `false` | When `true`, displays diagonal stripes on the progress bar. | [isStriped](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#isstriped) |

### Circular ProgressBar Specific

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `radius` | `string` | `'100%'` | Specifies the radius of the circular progress bar (e.g., `'100%'`, `'80px'`). | [radius](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#radius) |
| `innerRadius` | `string` | `'100%'` | Specifies the inner radius for donut-style circular progress bars. | [innerRadius](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#innerradius) |
| `startAngle` | `number` | `0` | Specifies the start angle (in degrees) for circular progress bar rendering. | [startAngle](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#startangle) |
| `endAngle` | `number` | `0` | Specifies the end angle (in degrees) for circular progress bar rendering. | [endAngle](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#endangle) |
| `enablePieProgress` | `boolean` | `false` | When `true`, renders the circular progress as a pie chart view. | [enablePieProgress](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#enablepieprogress) |

### Secondary Progress and Segments

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `secondaryProgress` | `number` | `null` | Specifies the secondary progress value (e.g., for buffering in video streaming). | [secondaryProgress](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#secondaryprogress) |
| `secondaryProgressColor` | `string` | `''` | Sets the color for the secondary progress bar. By default, uses the primary progress color with half opacity. | [secondaryProgressColor](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#secondaryprogresscolor) |
| `secondaryProgressThickness` | `number` | `null` | Specifies the thickness for the secondary progress bar. By default, uses the primary progress thickness. | [secondaryProgressThickness](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#secondaryprogressthickness) |
| `segmentCount` | `number` | `1` | Specifies the number of segments to divide the progress bar (for multi-step visualization). | [segmentCount](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#segmentcount) |
| `segmentColor` | `string[]` | `null` | Array of colors for individual segments. If not provided, uses `progressColor`. | [segmentColor](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#segmentcolor) |
| `enableProgressSegments` | `boolean` | `false` | When `true`, enables segment visualization for the progress bar. | [enableProgressSegments](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#enableprogresssegments) |
| `gapWidth` | `number` | `null` | Specifies the gap width between segments in pixels. | [gapWidth](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#gapwidth) |

### Labels, Annotations, and Tooltips

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `showProgressValue` | `boolean` | `false` | When `true`, displays the progress value (percentage or custom text) on the progress bar. | [showProgressValue](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#showprogressvalue) |
| `labelOnTrack` | `boolean` | `true` | When `true`, positions the label on the progress bar itself. When `false`, positions it outside. | [labelOnTrack](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#labelontrack) |
| `labelStyle` | `FontModel` | `{}` | Customizes the font properties of the progress bar label. See [`FontModel`](#fontmodel). | [labelStyle](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#labelstyle) |
| `annotations` | `ProgressAnnotationSettingsModel[]` | `[]` | Array of annotation configurations for adding custom content to circular progress bars. See [`ProgressAnnotationSettingsModel`](#progressannotationsettingsmodel). | [annotations](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#annotations) |
| `tooltip` | `TooltipSettingsModel` | `{}` | Configures tooltip settings for the progress bar. See [`TooltipSettingsModel`](#tooltipsettingsmodel). | [tooltip](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#tooltip) |

### Animation and Interaction

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `animation` | `AnimationModel` | `{}` | Configures animation settings for the progress bar. See [`AnimationModel`](#animationmodel). | [animation](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#animation) |
| `role` | `ModeType` | `null` | Specifies the mode type for linear progress. Supported values: `'Progress'`, `'Buffer'`. | [role](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#role) |

### Localization and State

| Property | Type | Default | Description | Link |
|---|---|---|---|---|
| `locale` | `string` | `''` | Overrides the global culture and localization for this instance. | [locale](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#locale) |
| `enableRtl` | `boolean` | `false` | Enables right-to-left layout and rendering behavior. | [enableRtl](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#enablertl) |
| `enablePersistence` | `boolean` | `false` | When `true`, persists component state across page reloads. | [enablePersistence](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#enablepersistence) |
| `rangeColors` | `RangeColorModel[]` | `[]` | Array of range color configurations for applying different colors based on progress value ranges. See [`RangeColorModel`](#rangecolormodel). | [rangeColors](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#rangecolors) |

---

## Data Models

### AnimationModel

Configures animation settings for the progress bar.

| Property | Type | Description |
|---|---|---|
| `enable` | `boolean` | Enables animation when progress value changes. |
| `duration` | `number`| Duration of the animation in milliseconds. |
| `delay` | `number`| Delay before animation starts in milliseconds. |

**API Reference:** [AnimationModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/animationmodel)

### FontModel

Configures font properties for labels and annotations.

| Property | Type | Description |
|---|---|---|
| `size` | `string` | Font size (e.g., `'14px'`, `'1.5em'`). |
| `color` | `string` | Text color (hex, rgb, or named color). |
| `fontFamily` | `string` | Font family name. |
| `fontStyle` | `string` | Font style: `'Normal'`, `'Italic'`, `'Oblique'`. |
| `fontWeight` | `string` | Font weight: `'Normal'`, `'Bold'`, `'100'` to `'900'`. |
| `opacity` | `number` | Text opacity (0-1). |
| `textAlignment` | `string` | Text alignment: `'Center'`, `'Left'`, `'Right'`. |

**API Reference:** [FontModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/fontmodel)

### MarginModel

Configures outer spacing around the progress bar.

| Property | Type | Description |
|---|---|---|
| `left` | `number` | Left margin in pixels. |
| `right` | `number` | Right margin in pixels. |
| `top` | `number` | Top margin in pixels. |
| `bottom` | `number` | Bottom margin in pixels. |

**API Reference:** [MarginModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/marginmodel)

### ProgressAnnotationSettingsModel

Configures annotations (custom content) for circular progress bars.

| Property | Type | Description |
|---|---|---|
| `content` | `string` | `null` | HTML content or text to display in the annotation. Supports HTML strings and DOM elements. |
| `annotationAngle` | `number` | to move annotation. |
| `annotationRadius` | `string` | to move annotation. |

**API Reference:** [ProgressAnnotationSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/progressannotationsettingsmodel)

### TooltipSettingsModel

Configures tooltip display and formatting.

| Property | Type | Description |
|---|---|---|
| `enable` | `boolean` | Enables tooltip for the progress bar. |
| `format` | `string` | Format string for tooltip content (e.g., `'{value}%'`). |
| `showTooltipOnHover` | `boolean` | If set to true, tooltip will be displayed for the progress bar on mouse hover. |

**API Reference:** [TooltipSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/tooltipsettingsmodel)

### RangeColorModel

Configures color ranges for progress value-based styling.

| Property | Type | Description |
|---|---|---|
| `color` | `string` | The color to apply when progress is in this range. |
| `start` | `number` | The starting value of the range. |
| `end` | `number` | The ending value of the range. |

**API Reference:** [RangeColorModel](https://ej2.syncfusion.com/vue/documentation/api/progressbar/rangecolormodel)

---

## Events

### animationComplete

Triggers after the progress bar animation is completed.

**Event Arguments:** `IProgressValueEventArgs`

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The current progress value. |

**Example:**

```vue
<template>
  <ejs-progressbar :animationComplete="onAnimationComplete" />
</template>

<script setup>
const onAnimationComplete = (args) => {
  console.log('Animation completed. Value:', args.value);
};
</script>
```

**API Reference:** [animationComplete](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#animationcomplete)

### load

Triggers before the progress bar starts rendering.

**Event Arguments:** `ILoadedEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :load="onLoad" />
</template>

<script setup>
const onLoad = (args) => {
  console.log('Progress bar is loading...');
};
</script>
```

**API Reference:** [load](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#load)

### loaded

Triggers after the progress bar has finished rendering.

**Event Arguments:** `ILoadedEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :loaded="onLoaded" />
</template>

<script setup>
const onLoaded = (args) => {
  console.log('Progress bar loaded and ready.');
};
</script>
```

**API Reference:** [loaded](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#loaded)

### progressCompleted

Triggers after the progress value has reached the maximum value (100 or custom maximum).

**Event Arguments:** `IProgressValueEventArgs`

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The progress value at completion. |

**Example:**

```vue
<template>
  <ejs-progressbar :progressCompleted="onProgressCompleted" />
</template>

<script setup>
const onProgressCompleted = (args) => {
  console.log('Progress completed!', args.value);
};
</script>
```

**API Reference:** [progressCompleted](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#progresscompleted)

### valueChanged

Triggers after the progress value has changed.

**Event Arguments:** `IProgressValueEventArgs`

| Property | Type | Description |
|---|---|---|
| `value` | `number` | The new progress value. |

**Example:**

```vue
<template>
  <ejs-progressbar :valueChanged="onValueChanged" />
</template>

<script setup>
const onValueChanged = (args) => {
  console.log('Progress value changed to:', args.value);
};
</script>
```

**API Reference:** [valueChanged](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#valuechanged)

### textRender

Triggers before the progress bar label text is rendered, allowing customization.

**Event Arguments:** `ITextRenderEventArgs`

| Property | Type | Description |
|---|---|---|
| `text` | `string` | The label text to be rendered. |

**Example:**

```vue
<template>
  <ejs-progressbar :textRender="onTextRender" />
</template>

<script setup>
const onTextRender = (args) => {
  args.text = args.value + ' steps completed';
  console.log('Custom text:', args.text);
};
</script>
```

**API Reference:** [textRender](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#textrender)

### tooltipRender

Triggers before the tooltip content is rendered.

**Event Arguments:** `ITooltipRenderEventArgs`

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Defines tooltip text collections. |
| `name` | `string` | Defines the name of the event. |

**Example:**

```vue
<template>
  <ejs-progressbar :tooltipRender="onTooltipRender" />
</template>

<script setup>
const onTooltipRender = (args) => {
  args.text = 'Progress: ' + args.value + '%';
};
</script>
```

**API Reference:** [tooltipRender](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#tooltiprender)

### mouseClick

Triggers after a mouse click on the progress bar.

**Event Arguments:** `IMouseEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :mouseClick="onMouseClick" />
</template>

<script setup>
const onMouseClick = (args) => {
  console.log('Progress bar clicked');
};
</script>
```

**API Reference:** [mouseClick](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#mouseclick)

### mouseDown

Triggers after a mouse down event on the progress bar.

**Event Arguments:** `IMouseEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :mouseDown="onMouseDown" />
</template>

<script setup>
const onMouseDown = (args) => {
  console.log('Mouse down on progress bar');
};
</script>
```

**API Reference:** [mouseDown](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#mousedown)

### mouseMove

Triggers after a mouse move event on the progress bar.

**Event Arguments:** `IMouseEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :mouseMove="onMouseMove" />
</template>

<script setup>
const onMouseMove = (args) => {
  console.log('Mouse moved over progress bar');
};
</script>
```

**API Reference:** [mouseMove](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#mousemove)

### mouseUp

Triggers after a mouse up event on the progress bar.

**Event Arguments:** `IMouseEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :mouseUp="onMouseUp" />
</template>

<script setup>
const onMouseUp = (args) => {
  console.log('Mouse up on progress bar');
};
</script>
```

**API Reference:** [mouseUp](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#mouseup)

### mouseLeave

Triggers after a mouse leave event from the progress bar.

**Event Arguments:** `IMouseEventArgs`

**Example:**

```vue
<template>
  <ejs-progressbar :mouseLeave="onMouseLeave" />
</template>

<script setup>
const onMouseLeave = (args) => {
  console.log('Mouse left the progress bar');
};
</script>
```

**API Reference:** [mouseLeave](https://ej2.syncfusion.com/vue/documentation/api/progressbar/#mouseleave)

---

## Methods

### destroy()

Destroys the progress bar widget and releases resources.

**Signature:**

```typescript
destroy(): void
```

**Example:**

```vue
<script setup>
import { onUnmounted, ref } from 'vue';

const progressBarRef = ref(null);

onUnmounted(() => {
  progressBarRef.value.destroy();
});
</script>
```

**API Reference:** [destroy](https://ej2.syncfusion.com/vue/documentation/api/progressbar/index-default#destroy)

---

## Enums

### ProgressType

Specifies the type of progress bar.

| Value | Description |
|---|---|
| `'Linear'` | Linear progress bar (horizontal or vertical). |
| `'Circular'` | Circular/radial progress bar. |

### CornerType

Specifies the corner style for the progress bar ends.

| Value | Description |
|---|---|
| `'Auto'` | Corner style is determined automatically based on the progress bar type. |
| `'Square'` | Square corners (no rounding). |
| `'Round'` | Fully rounded corners (semi-circle). |
| `'Round4px'` | Rounded corners with 4px radius. |

### ProgressTheme

Specifies predefined visual themes.

| Value | Description |
|---|---|
| `'Fabric'` | Fabric design theme. |
| `'Bootstrap'` | Bootstrap theme. |
| `'Bootstrap4'` | Bootstrap 4 theme. |
| `'Material'` | Material design theme. |
| `'Highcontrast'` | High contrast theme. |
| `'TailwindDark'` | Tailwind dark theme. |
| `'Tailwind'` | Tailwind light theme. |

---

## Modules

Required modules must be injected to the ProgressBar component for certain features.

### ProgressAnnotation

Enables annotation support for adding custom content to circular progress bars.

**When to Use:** Use when adding annotations (custom HTML/text content) to the progress bar using the `annotations` property.

**Import:**

```javascript
import { ProgressAnnotation } from '@syncfusion/ej2-vue-progressbar';
```

**Registration (Composition API):**

```vue
<script setup>
import { provide } from 'vue';
import { ProgressAnnotation } from '@syncfusion/ej2-vue-progressbar';

provide('progressbar', [ProgressAnnotation]);
</script>
```

**Registration (Options API):**

```vue
<script>
import { ProgressAnnotation } from '@syncfusion/ej2-vue-progressbar';

export default {
  provide: {
    progressbar: [ProgressAnnotation]
  }
};
</script>
```

**Example Usage:**

```vue
<template>
  <div class="annotation-container">
    <h3>Circular Progressbar with Text Annotation</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="60"
      :animation="animation"
    >
      <e-progressbar-annotations>
        <e-progressbar-annotation
          :content="percentageContent"
        >
        </e-progressbar-annotation>
      </e-progressbar-annotations>
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);

const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};

const percentageContent = '<div style="font-size:28px;font-weight:bold;color:#007bff;">60%</div>';
</script>

<style scoped>
.annotation-container {
  text-align: center;
  padding: 20px;
}
</style>
```

### ProgressTooltip

Enables tooltip support for the progress bar.

**When to Use:** Use when displaying tooltips on the progress bar using the `tooltip` property.

**Import:**

```javascript
import { ProgressTooltip } from '@syncfusion/ej2-vue-progressbar';
```

**Registration (Composition API):**

```vue
<script setup>
import { provide } from 'vue';
import { ProgressTooltip } from '@syncfusion/ej2-vue-progressbar';

provide('progressbar', [ProgressTooltip]);
</script>
```

**Registration (Options API):**

```vue
<script>
import { ProgressTooltip } from '@syncfusion/ej2-vue-progressbar';

export default {
  provide: {
    progressbar: [ProgressTooltip]
  }
};
</script>
```

**Example Usage:**

```vue
<template>
  <ejs-progressbar
    type="Linear"
    :value="60"
    :tooltip="tooltipSettings"
  />
</template>

<script setup>
import { ref, provide } from 'vue';
import { ProgressBarComponent as EjsProgressbar, ProgressTooltip } from '@syncfusion/ej2-vue-progressbar';

const tooltipSettings = ref({
  enable: true,
  format: '${value}% completed'
});

provide('progressbar', [ProgressTooltip]);
</script>
```

---

## Common Usage Patterns

### Pattern 1: Linear Progress with Animation

```vue
<template>
  <div class="container">
    <ejs-progressbar
      id="linearProgress"
      type="Linear"
      :value="progressValue"
      :animation="animationSettings"
      progressColor="#0078d4"
      trackColor="#e3e3e3"
      :progressThickness="6"
      :trackThickness="6"
      :showProgressValue="true"
      :valueChanged="onValueChanged"
    />
    <button @click="incrementProgress">Increment Progress</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressBarComponent as EjsProgressbar } from '@syncfusion/ej2-vue-progressbar';

const progressValue = ref(0);
const animationSettings = ref({
  enable: true,
  duration: 2000,
  delay: 0
});

const onValueChanged = (args) => {
  console.log('Progress:', args.value);
};

const incrementProgress = () => {
  if (progressValue.value < 100) {
    progressValue.value += 10;
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  width: 100%;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>
```

### Pattern 2: Circular Progress with Annotation

```vue
<template>
  <div class="container">
    <ejs-progressbar
      id="circularProgress"
      type="Circular"
      :value="75"
      :radius="'160px'"
      :innerRadius="'70%'"
      :annotations="annotations"
      progressColor="#0078d4"
      trackColor="#e3e3e3"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation } from '@syncfusion/ej2-vue-progressbar';

const annotations = ref([
  {
    content: '<div style="font-size: 24px; font-weight: bold; color: #0078d4;">75%<br/><span style="font-size: 12px;">Complete</span></div>',
  }
]);

provide('progressbar', [ProgressAnnotation]);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
```

### Pattern 3: Indeterminate Progress

```vue
<template>
  <div class="container">
    <h3>Loading...</h3>
    <ejs-progressbar
      id="indeterminateProgress"
      type="Linear"
      :value="20"
      :isIndeterminate="true"
      :isActive="true"
      :animation="animationSettings"
      progressColor="#0078d4"
      :progressThickness="8"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressBarComponent as EjsProgressbar } from '@syncfusion/ej2-vue-progressbar';

const animationSettings = ref({
  enable: true,
  duration: 2000,
  delay: 0
});
</script>

<style scoped>
.container {
  padding: 40px;
}
</style>
```

### Pattern 4: Segmented Progress for Multi-Step Process

```vue
<template>
  <div class="container">
    <h3>Form Progress: Step {{ currentStep }} of 5</h3>
    <ejs-progressbar
      id="segmentedProgress"
      type="Linear"
      :value="segmentValue"
      :segmentCount="5"
      :enableProgressSegments="true"
      :gapWidth="5"
      :segmentColor="segmentColors"
      :progressThickness="8"
      :trackThickness="8"
      :showProgressValue="true"
    />
    <div class="button-group">
      <button @click="previousStep" :disabled="currentStep === 1">Previous</button>
      <button @click="nextStep" :disabled="currentStep === 5">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ProgressBarComponent as EjsProgressbar } from '@syncfusion/ej2-vue-progressbar';

const currentStep = ref(1);
const segmentValue = computed(() => currentStep.value * 20);
const segmentColors = ref(['#0078d4', '#107c10', '#107c10', '#107c10', '#107c10']);

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style scoped>
.container {
  padding: 40px;
}

.button-group {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

### Pattern 5: Buffer/Secondary Progress

```vue
<template>
  <div class="container">
    <h3>Video Streaming Progress</h3>
    <p>Playing: {{ currentProgress }}% | Buffered: {{ bufferedProgress }}%</p>
    <ejs-progressbar
      id="bufferProgress"
      type="Linear"
      :value="currentProgress"
      :secondaryProgress="bufferedProgress"
      progressColor="#0078d4"
      :secondaryProgressColor="'rgba(0, 120, 212, 0.3)'"
      :progressThickness="10"
      :trackThickness="10"
    />
    <button @click="simulatePlayback">Start Playback</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressBarComponent as EjsProgressbar } from '@syncfusion/ej2-vue-progressbar';

const currentProgress = ref(0);
const bufferedProgress = ref(0);

const simulatePlayback = () => {
  const playbackInterval = setInterval(() => {
    if (currentProgress.value >= 100) {
      clearInterval(playbackInterval);
      return;
    }
    currentProgress.value += 5;
    // Simulate buffering ahead
    if (bufferedProgress.value < 100) {
      bufferedProgress.value = Math.min(currentProgress.value + 20, 100);
    }
  }, 500);
};
</script>

<style scoped>
.container {
  padding: 40px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>
```

### Pattern 6: Range Colors and Gradients

```vue
<template>
  <div class="container">
    <h3>Adaptive Color Progress</h3>
    <p>Status: {{ getStatus(progressValue) }}</p>
    <ejs-progressbar
      id="rangeColorProgress"
      type="Linear"
      :value="progressValue"
      :rangeColors="rangeColors"
      :isGradient="true"
      :showProgressValue="true"
      :progressThickness="10"
      :trackThickness="10"
      @valueChanged="onValueChanged"
    />
    <input type="range" v-model="progressValue" min="0" max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressBarComponent as EjsProgressbar } from '@syncfusion/ej2-vue-progressbar';

const progressValue = ref(50);

const rangeColors = ref([
  { color: '#e81b23', start: 0, end: 30 },
  { color: '#f7630c', start: 30, end: 60 },
  { color: '#ffd324', start: 60, end: 75 },
  { color: '#107c10', start: 75, end: 100 }
]);

const onValueChanged = (args) => {
  console.log('Value:', args.value);
};

const getStatus = (value) => {
  if (value < 30) return 'Critical';
  if (value < 60) return 'Warning';
  if (value < 75) return 'Good';
  return 'Excellent';
};
</script>

<style scoped>
.container {
  padding: 40px;
}

input[type="range"] {
  margin-top: 20px;
  width: 100%;
}
</style>
```

---

## Additional Resources

- **Official Syncfusion Vue Documentation:** [ProgressBar](https://ej2.syncfusion.com/vue/documentation/progressbar/)
- **Component API:** [ProgressBarComponent](https://ej2.syncfusion.com/vue/documentation/api/progressbar/index-default)
- **Getting Started Guide:** [Getting Started](https://ej2.syncfusion.com/vue/documentation/progressbar/vue-3-getting-started)
- **Progress Types:** [Linear and Circular Progress](https://ej2.syncfusion.com/vue/documentation/progressbar/types)
- **Progress States:** [Progress States](https://ej2.syncfusion.com/vue/documentation/progressbar/states)
- **Customization:** [Customization](https://ej2.syncfusion.com/vue/documentation/progressbar/customization)
- **Annotations:** [Annotations](https://ej2.syncfusion.com/vue/documentation/progressbar/annotation)
- **Events:** [Events](https://ej2.syncfusion.com/vue/documentation/progressbar/events)
- **Community Forum:** [Syncfusion Community](https://www.syncfusion.com/forums)

---

