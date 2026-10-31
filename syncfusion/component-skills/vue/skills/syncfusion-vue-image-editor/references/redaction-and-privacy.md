# Redaction and Privacy

## Redaction Overview

Redaction is a technique to conceal sensitive information in images by applying blur or pixelate effects over specific areas. This is essential for privacy protection and compliance with data protection regulations.

## Redaction Types

### Blur Redaction

Blur sensitive areas with a soft effect:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

imageEditor.drawRedact(
  'blur',    // Type: blur or pixelate
  x,         // X-coordinate
  y,         // Y-coordinate
  width,     // Width of redaction
  height,    // Height of redaction
  20         // Blur intensity (default 20)
);
```

### Pixelate Redaction

Pixelate sensitive areas for strong obfuscation:

```javascript
imageEditor.drawRedact(
  'pixelate',  // Type: pixelate
  x,
  y,
  width,
  height,
  8            // Pixel size (larger = more obfuscation)
);
```

## Common Redaction Scenarios

### Redacting Text/Documents

```javascript
// Blur a license plate number
imageEditor.drawRedact('blur', 100, 50, 150, 40, 20);

// Pixelate a face
imageEditor.drawRedact('pixelate', 200, 100, 200, 220, 15);
```

### Redacting Personal Information

```javascript
// Blur email address
imageEditor.drawRedact('blur', 50, 150, 200, 30, 25);

// Pixelate phone number
imageEditor.drawRedact('pixelate', 50, 190, 180, 30, 10);
```

### Redacting Sensitive Areas

```javascript
// Blur document ID
imageEditor.drawRedact('blur', 300, 250, 120, 40, 20);

// Pixelate signature
imageEditor.drawRedact('pixelate', 100, 350, 250, 60, 12);
```

## Redaction Parameters

| Parameter | Range | Purpose |
|-----------|-------|---------|
| **type** | 'blur' or 'pixelate' | Redaction method |
| **x** | 0 to image width | Horizontal position |
| **y** | 0 to image height | Vertical position |
| **width** | 1 to image width | Redaction area width |
| **height** | 1 to image height | Redaction area height |
| **value** | 1-50 (blur), 1-30 (pixelate) | Intensity/pixel size |

## Selecting Redactions

Get all redactions and select specific ones:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Get all redactions
const redactions = imageEditor.getRedacts();

// Select a specific redaction by ID
if (redactions.length > 0) {
  const redactId = redactions[0].id;
  imageEditor.selectRedact(redactId);
}
```

## Updating Redactions

Modify existing redactions:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Update redaction properties
imageEditor.updateRedact({
  id: redactId,
  x: 150,
  y: 150,
  width: 200,
  height: 60,
  value: 25  // New blur intensity
});
```

## Deleting Redactions

Remove redactions by ID:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Get redaction ID
const redactions = imageEditor.getRedacts();
if (redactions.length > 0) {
  const redactId = redactions[0].id;
  
  // Delete the redaction
  imageEditor.deleteRedact(redactId);
}
```

## Complete Redaction Example

```vue
<template>
  <div>
    <div>
      <select v-model="redactionType">
        <option value="blur">Blur</option>
        <option value="pixelate">Pixelate</option>
      </select>
      <input v-model.number="redactionIntensity" type="number" min="1" max="50" placeholder="Intensity">
      <button @click="startRedacting">Start Redacting</button>
      <button @click="deleteLastRedaction">Delete Last</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Redact', 'Undo', 'Redo']"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const redactionType = ref('blur');
const redactionIntensity = ref(20);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const startRedacting = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  // Draw a sample redaction in the middle of the image
  imageEditor.drawRedact(
    redactionType.value,
    200,
    200,
    150,
    60,
    redactionIntensity.value
  );
};

const deleteLastRedaction = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const redactions = imageEditor.getRedacts();
  if (redactions.length > 0) {
    const lastRedact = redactions[redactions.length - 1];
    imageEditor.deleteRedact(lastRedact.id);
  }
};
</script>
```

## Advanced Redaction Workflow

```vue
<template>
  <div>
    <div>
      <h3>Redact Sensitive Data</h3>
      <p>Redaction Type:
        <label><input v-model="redactionType" type="radio" value="blur"> Blur</label>
        <label><input v-model="redactionType" type="radio" value="pixelate"> Pixelate</label>
      </p>
      <p>
        <label>
          Intensity: {{ redactionIntensity }}
          <input v-model.number="redactionIntensity" type="range" min="1" max="50">
        </label>
      </p>
      <button @click="drawMultipleRedactions">Redact Demo Areas</button>
      <button @click="viewRedactions">View Redactions</button>
      <button @click="clearAllRedactions">Clear All</button>
      <button @click="saveRedacted">Save Redacted Image</button>
    </div>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
    <div v-if="redactionCount > 0">
      <p>Redactions Applied: {{ redactionCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);
const redactionType = ref('blur');
const redactionIntensity = ref(20);
const redactionCount = ref(0);

const drawMultipleRedactions = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Simulate redacting different areas
  imageEditor.drawRedact('blur', 50, 50, 100, 40, redactionIntensity.value);      // Top-left
  imageEditor.drawRedact('pixelate', 300, 100, 120, 50, 12);                       // Top-right
  imageEditor.drawRedact(redactionType.value, 150, 250, 150, 60, redactionIntensity.value); // Middle
  
  updateRedactionCount();
};

const viewRedactions = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const redactions = imageEditor.getRedacts();
  console.log('Current redactions:', redactions);
  alert(`Found ${redactions.length} redactions`);
};

const clearAllRedactions = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const redactions = imageEditor.getRedacts();
  redactions.forEach(redact => {
    imageEditor.deleteRedact(redact.id);
  });
  updateRedactionCount();
};

const updateRedactionCount = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  redactionCount.value = imageEditor.getRedacts().length;
};

const saveRedacted = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.save();
};
</script>

<style>
label {
  margin: 0 10px;
}

button {
  margin: 5px;
  padding: 8px 12px;
}

p {
  margin: 10px 0;
}
</style>
```

## Privacy Compliance

### GDPR Compliance

Redact personally identifiable information (PII):
- Names and personal identifiers
- Email addresses and phone numbers
- Social security or passport numbers
- Financial account information
- Medical records

### HIPAA Compliance

For healthcare images, redact:
- Patient names and ID numbers
- Birthdates and contact information
- Physician names
- Hospital/facility identifiers

## Best Practices

1. **Complete Coverage:** Ensure sensitive data is fully obscured
2. **Consistent Method:** Use blur for general PII, pixelate for stronger obfuscation
3. **Sufficient Intensity:** Test that text cannot be read through redaction
4. **Undo/Redo:** Use history to verify redaction placement
5. **Save Securely:** Export redacted images with appropriate access controls
6. **Audit Trail:** Track which areas were redacted and by whom

## Performance Considerations

- **Multiple Redactions:** Apply efficiently; don't redact overlapping areas
- **Intensity Levels:** Higher intensity values increase processing
- **Rendering:** Redactions render instantly without re-encoding
- **History:** All redactions tracked in undo/redo (16-step limit)
