# Appearance & Customization

## Table of Contents
- [Customizing the Button](#customizing-the-button)
- [Customizing the Tooltip Display](#customizing-the-tooltip-display)
- [Applying Custom Styles with cssClass](#applying-custom-styles-with-cssclass)

## Customizing the Button

You can use the `buttonSettings` property to customize the appearance of the start and stop buttons in the speech-to-text conversion.

### Setting Start Content

Use the `content` property to define text content for the listening start state in the SpeechToText button.

### Setting Stop Content

Use the `stopContent` property to define text content for the listening stop state in the SpeechToText button.

### Setting Icon CSS

Use the `iconCss` property to apply a CSS class to customize the icon appearance for the listening start state. Common Syncfusion icon classes include `e-icons e-play`, `e-icons e-microphone`, etc.

### Setting Stop Icon CSS

Use the `stopIconCss` property to apply a CSS class to customize the icon appearance for the listening stop state. Common icons include `e-icons e-pause`, `e-icons e-stop`, etc.

### Positioning the Button Icon

The `iconPosition` property controls the icon's placement, allowing it to be displayed on the top, bottom, left, or right side of the button's text. Valid values are: `Top`, `Bottom`, `Left`, `Right`.

### Configuring the Primary Button

The `isPrimary` property configures the button's appearance to indicate a primary action. Setting this to `true` makes the button more prominent with a primary color style. This is a convenient alternative to manually adding the `e-primary` style via the `cssClass` property.

### Button Settings Example

The following code sample demonstrates how to configure these button properties:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :button-settings="buttonSettings"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const buttonSettings = {
  content: 'Start',
  stopContent: 'Stop',
  iconCss: 'e-icons e-play',
  stopIconCss: 'e-icons e-pause',
  iconPosition: 'Right',
  isPrimary: true
};

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Customizing the Tooltip Display

The `tooltipSettings` property allows customization of the tooltip's content and position.

### Setting Start Content

Use the `content` property to customize the content to be displayed in the tooltip when the speech recognition begins.

### Setting Stop Content

Use the `stopContent` property to customize the stop button tooltip text which is displayed on-hover.

### Positioning the Tooltip

The `position` property determines the placement of the tooltip relative to the button. Common positions include: `TopCenter`, `TopLeft`, `TopRight`, `BottomCenter`, `BottomLeft`, `BottomRight`, `LeftCenter`, `RightCenter`.

### Tooltip Settings Example

The following example shows how to configure the tooltip settings:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :tooltip-settings="tooltipSettings"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const tooltipSettings = {
  position: 'BottomRight',
  content: 'Click the button to start recognition',
  stopContent: 'Click the button to stop recognition'
};

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Applying Custom Styles with cssClass

The `cssClass` property provides a way to apply custom styling to the Speech-to-Text component. This property can be used to add custom user-defined classes or apply predefined Syncfusion styles.

### Predefined CSS Classes

The following table lists the predefined CSS classes you can use:

| CSS Class | Description |
|-----------|-------------|
| `e-primary` | Represents a primary action with primary color styling. |
| `e-outline` | Renders the button with an outline style. |
| `e-info` | Indicates an informative action with info color. |
| `e-success` | Indicates a positive action with success color. |
| `e-warning` | Warns the user of a potential issue with warning color. |
| `e-danger` | Indicates a destructive or negative action with danger color. |

### Setting CSS Class

You can use the `cssClass` property to customize the appearance of the SpeechToText component:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" css-class="e-success"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

### CSS Class Variants

Use different CSS classes for different visual styles:

```vue
<!-- Primary button with outline -->
<ejs-speechtotext css-class="e-primary"></ejs-speechtotext>

<!-- Info style button -->
<ejs-speechtotext css-class="e-info"></ejs-speechtotext>

<!-- Success style button -->
<ejs-speechtotext css-class="e-success"></ejs-speechtotext>

<!-- Warning style button -->
<ejs-speechtotext css-class="e-warning"></ejs-speechtotext>

<!-- Danger style button -->
<ejs-speechtotext css-class="e-danger"></ejs-speechtotext>

<!-- Outline style button -->
<ejs-speechtotext css-class="e-outline"></ejs-speechtotext>
```

### Custom Styling Examples

Combine multiple customization options for complete styling control:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext 
      id="speechtotext" 
      @transcript-changed="onTranscriptChange" 
      :button-settings="buttonSettings"
      :tooltip-settings="tooltipSettings"
      css-class="e-primary"
    ></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const buttonSettings = {
  content: 'Start Recording',
  stopContent: 'Stop Recording',
  iconCss: 'e-icons e-microphone',
  stopIconCss: 'e-icons e-stop',
  iconPosition: 'Left',
  isPrimary: true
};

const tooltipSettings = {
  position: 'TopCenter',
  content: 'Click to start voice recording',
  stopContent: 'Click to stop recording'
};

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```
