# Validation & Security

## Form Integration

The Rich Text Editor can be used inside a standard HTML `<form>`. Use `v-model:value` (or the `name` attribute) and validate on `blur`.

```vue
<template>
  <form id="rteForm" @submit.prevent="onSubmit">
    <ejs-richtexteditor
      id="rte"
      name="content"
      v-model:value="formValue"
      :blur="onBlur"
    />
    <span v-if="errorMsg" style="color: red">{{ errorMsg }}</span>
    <button type="submit">Submit</button>
    <button type="reset" @click="onReset">Reset</button>
  </form>
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor
} from '@syncfusion/ej2-vue-richtexteditor';

const formValue = ref('');
const errorMsg = ref('');

const onBlur = () => {
  errorMsg.value = formValue.value ? '' : 'Content is required.';
};

const onSubmit = () => {
  if (!formValue.value) {
    errorMsg.value = 'Content is required.';
    return;
  }
  console.log('Submitted:', formValue.value);
};

const onReset = () => {
  formValue.value = '';
  errorMsg.value = '';
};

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor]);
</script>
```

## Read-Only Mode

Use `readonly: true` to display content without allowing edits. The toolbar is still visible but non-functional.

```vue
<ejs-richtexteditor
  :readonly="true"
  :value="content"
  :toolbarSettings="toolbarSettings"
/>
```

## Disabled Mode

Use `enabled: false` to fully disable the editor. The component becomes non-interactive and visually grayed out.

```vue
<ejs-richtexteditor
  :enabled="false"
  :value="content"
/>
```

### Toggle Read-Only / Disabled Programmatically

```js
const rteRef = ref(null);

// Toggle read-only
const setReadOnly = (value) => {
  rteRef.value.ej2Instances.readonly = value;
};

// Toggle disabled
const setEnabled = (value) => {
  rteRef.value.ej2Instances.enabled = value;
};
```

## XHTML Validation

Set `enableXhtml: true` to continuously validate the editor content against the XHTML standard. Invalid elements and attributes are automatically removed as the user types.

### What XHTML Validation Checks

**Attributes:**
- All attribute names must be lowercase
- Attribute values must be quoted
- Only valid attributes for the HTML element are allowed
- All required attributes must be present

**Elements:**
- All tag names must be lowercase
- All opening tags must have closing tags
- Only valid HTML elements are permitted
- Elements must be properly nested
- Content must have a single root element
- Inline elements cannot contain block elements

```vue
<ejs-richtexteditor
  :enableXhtml="true"
  :value="rteValue"
/>
```

```js
provide('richtexteditor', [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]);
```

## XSS Prevention

XSS prevention is enabled by default (`enableHtmlSanitizer: true`). The editor removes potentially dangerous tags (`<script>`) and event handler attributes (`onclick`, `onmouseover`) from the content automatically.

```vue
<!-- XSS sanitization is ON by default -->
<ejs-richtexteditor :value="untrustedContent" />

<!-- Disable if your backend handles sanitization -->
<ejs-richtexteditor :value="trustedContent" :enableHtmlSanitizer="false" />
```

> Only applies when `editorMode` is `HTML`.

### Custom XSS Filtering via `beforeSanitizeHtml`

Use the `beforeSanitizeHtml` event to override or extend the built-in sanitizer:

```vue
<template>
  <ejs-richtexteditor
    :value="value"
    :beforeSanitizeHtml="onBeforeSanitize"
  />
</template>

<script setup>
import { provide } from 'vue';
import { RichTextEditorComponent as EjsRichtexteditor, Toolbar, Link, HtmlEditor } from '@syncfusion/ej2-vue-richtexteditor';
import { detach } from '@syncfusion/ej2-base';

const value = `<div>Safe content</div><script>alert('xss')<\/script>`;

const onBeforeSanitize = (e) => {
  e.helper = (value) => {
    e.cancel = true; // override built-in sanitizer entirely
    const temp = document.createElement('div');
    temp.innerHTML = value;
    const scriptTag = temp.querySelector('script');
    if (scriptTag) detach(scriptTag);
    return temp.innerHTML;
  };
};

provide('richtexteditor', [Toolbar, Link, HtmlEditor]);
</script>
```

### Allow Specific iFrames

To permit `<iframe>` tags from trusted origins while blocking others:

```js
const onBeforeSanitize = (e) => {
  if (e.selectors?.tags) {
    // Remove the default rule that blocks all iframes
    e.selectors.tags = e.selectors.tags.filter(
      tag => tag !== 'iframe:not(.e-rte-embed-url)'
    );
    // Allow only iframes with https src
    e.selectors.tags.push('iframe[src^="https://"]');
  }
};
```

## Summary Table

| Feature | Property / API | Notes |
|---|---|---|
| Read-only | `:readonly="true"` | Toolbar visible but inactive |
| Disabled | `:enabled="false"` | Full component disabled |
| XHTML validation | `:enableXhtml="true"` | Auto-fixes on every input |
| XSS sanitization | `:enableHtmlSanitizer="true"` | On by default, HTML mode only |
| Custom sanitizer | `beforeSanitizeHtml` event | Set `e.cancel = true` to override built-in |
