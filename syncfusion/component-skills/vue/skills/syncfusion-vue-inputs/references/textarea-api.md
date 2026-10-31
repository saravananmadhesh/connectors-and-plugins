# TextArea API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | '' | The text content of the textarea |
| `placeholder` | string | - | Placeholder text |
| `rows` | number | 2 | Number of visible rows |
| `cols` | number | 20 | Number of visible columns |
| `maxLength` | number | - | Maximum character length |
| `minLength` | number | - | Minimum character length |
| `readonly` | boolean | false | Make textarea read-only |
| `disabled` | boolean | false | Disable the textarea |
| `required` | boolean | false | Mark as required |
| `resizable` | boolean | true | Allow manual resizing |
| `autoHeight` | boolean | false | Auto-expand height based on content |
| `floatLabelType` | string | 'Never' | Float label behavior |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |
| `locale` | string | 'en-US' | Localization language |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `focus()` | - | void | Set focus on textarea |
| `blur()` | - | void | Remove focus |
| `select()` | - | void | Select all text |
| `setSelectionRange(start, end)` | number, number | void | Select text range |
| `getValue()` | - | string | Get current value |
| `setValue(value)` | string | void | Set value |
| `enable()` | - | void | Enable component |
| `disable()` | - | void | Disable component |
| `destroy()` | - | void | Destroy component |

---

## Events

```typescript
// Text changed
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);
};

// Input event
onInput = (args: InputEventArgs) => {
  console.log(args.value);
};

// Blur event
onBlur = (args: BlurEventArgs) => {
  console.log(args.value);
};

// Resize event
onResize = (args: ResizeEventArgs) => {
  console.log(args.height);  // New height
};
```

---

## Complete Example

```vue
<template>
  <div class="textarea-demo">
    <!-- Basic TextArea -->
    <TextAreaComponent
      v-model="message"
      :rows="5"
      :cols="40"
      placeholder="Enter your message"
      @input="updateCharCount"
    />

    <!-- Character Count -->
    <p class="char-count">{{ message.length }} / 500 characters</p>

    <!-- Auto-Height TextArea -->
    <TextAreaComponent
      v-model="expandingText"
      :autoHeight="true"
      placeholder="This will expand as you type"
    />

    <!-- Display -->
    <button @click="submitMessage">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const message = ref('');
const expandingText = ref('');

const updateCharCount = (args) => {
  console.log(`Characters: ${args.value.length}`);
};

const submitMessage = () => {
  console.log('Message:', message.value);
};
</script>

<style scoped>
.textarea-demo {
  padding: 20px;
}

.char-count {
  font-size: 0.85rem;
  color: #666;
  margin: 5px 0 20px 0;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

