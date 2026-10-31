# MaskedTextBox API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | '' | Current masked text value |
| `mask` | string | '00/00/0000' | Input mask pattern |
| `promptChar` | string | '_' | Character for unfilled positions |
| `placeholder` | string | - | Placeholder text |
| `floatLabelType` | string | 'Never' | Float label behavior |
| `readonly` | boolean | false | Make read-only |
| `disabled` | boolean | false | Disable component |
| `customCharacters` | object | - | Custom mask character definitions |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |

---

## Mask Patterns

| Character | Description |
|-----------|-------------|
| `0` | Digit (0-9, required) |
| `9` | Digit (0-9, optional) |
| `#` | Digit (0-9, +/-, optional) |
| `L` | Letter (A-Z, a-z, required) |
| `?` | Letter (A-Z, a-z, optional) |
| `&` | Character, required |
| `C` | Character, optional |
| `A` | Alphanumeric, required |
| `a` | Alphanumeric, optional |

---

## Methods

| Method | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getValue()` | - | string | Get unmasked value |
| `getMaskedValue()` | - | string | Get masked value |
| `setValue(value)` | string | void | Set value |
| `setMask(mask)` | string | void | Change mask pattern |
| `enable()` | - | void | Enable component |
| `disable()` | - | void | Disable component |

---

## Events

```typescript
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);       // Masked value
  console.log(args.unmaskedValue); // Unmasked value
};

onBlur = (args: BlurEventArgs) => {
  console.log(args.value);
};

onFocus = (args: FocusEventArgs) => {
  console.log(args.value);
};
```

---

## Complete Example

```vue
<template>
  <div class="masked-demo">
    <h2>Masked Input Examples</h2>

    <!-- Phone Number -->
    <div class="input-group">
      <label>Phone Number:</label>
      <MaskedTextBoxComponent
        v-model="phone"
        :mask="'(999) 999-9999'"
        :promptChar="'_'"
        placeholder="(999) 999-9999"
        @change="onPhoneChange"
      />
      <p class="value">Unmasked: {{ unmaskValue(phone) }}</p>
    </div>

    <!-- Date Input -->
    <div class="input-group">
      <label>Birth Date:</label>
      <MaskedTextBoxComponent
        v-model="birthDate"
        :mask="'99/99/0000'"
        placeholder="MM/DD/YYYY"
        @change="onDateChange"
      />
    </div>

    <!-- SSN -->
    <div class="input-group">
      <label>Social Security Number:</label>
      <MaskedTextBoxComponent
        v-model="ssn"
        :mask="'999-99-9999'"
        placeholder="###-##-####"
        @change="onSSNChange"
      />
      <p class="value">Unmasked: {{ unmaskValue(ssn) }}</p>
    </div>

    <!-- Credit Card -->
    <div class="input-group">
      <label>Credit Card:</label>
      <MaskedTextBoxComponent
        v-model="creditCard"
        :mask="'0000-0000-0000-0000'"
        placeholder="0000-0000-0000-0000"
        @change="onCardChange"
      />
      <p class="value">Unmasked: {{ unmaskValue(creditCard) }}</p>
    </div>

    <!-- IP Address -->
    <div class="input-group">
      <label>IP Address:</label>
      <MaskedTextBoxComponent
        v-model="ipAddress"
        :mask="'999.999.999.999'"
        placeholder="###.###.###.###"
        @change="onIPChange"
      />
      <p class="value">Unmasked: {{ unmaskValue(ipAddress) }}</p>
    </div>

    <!-- Time -->
    <div class="input-group">
      <label>Time (HH:MM:SS):</label>
      <MaskedTextBoxComponent
        v-model="time"
        :mask="'99:99:99'"
        placeholder="HH:MM:SS"
        @change="onTimeChange"
      />
    </div>

    <!-- License Plate -->
    <div class="input-group">
      <label>License Plate:</label>
      <MaskedTextBoxComponent
        v-model="licensePlate"
        :mask="'LLL-9999'"
        placeholder="ABC-1234"
        @change="onPlateChange"
      />
    </div>

    <!-- Submit -->
    <button @click="submitForm" class="submit-btn">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const phone = ref('');
const birthDate = ref('');
const ssn = ref('');
const creditCard = ref('');
const ipAddress = ref('');
const time = ref('');
const licensePlate = ref('');

const onPhoneChange = (args) => {
  console.log('Phone:', args.value);
  validatePhone(args.value);
};

const onDateChange = (args) => {
  console.log('Date:', args.value);
  validateDate(args.value);
};

const onSSNChange = (args) => {
  console.log('SSN:', args.value);
};

const onCardChange = (args) => {
  console.log('Card:', args.value);
  validateCreditCard(args.value);
};

const onIPChange = (args) => {
  console.log('IP:', args.value);
  validateIP(args.value);
};

const onTimeChange = (args) => {
  console.log('Time:', args.value);
};

const onPlateChange = (args) => {
  console.log('Plate:', args.value);
};

const unmaskValue = (maskedValue) => {
  // Remove non-digit characters
  return maskedValue.replace(/\D/g, '');
};

const validatePhone = (value) => {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(value);
};

const validateDate = (value) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(value)) return false;
  
  const [month, day, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date instanceof Date && !isNaN(date);
};

const validateCreditCard = (value) => {
  const cardNumber = value.replace(/\D/g, '');
  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

const validateIP = (value) => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(value)) return false;

  const parts = value.split('.');
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
};

const submitForm = () => {
  const formData = {
    phone,
    birthDate,
    ssn,
    creditCard: creditCard.value.replace(/\D/g, ''),
    ipAddress,
    time,
    licensePlate
  };

  console.log('Form submitted:', formData);
};
</script>

<style scoped>
.masked-demo {
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  margin: 0 0 30px 0;
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 25px;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.value {
  margin: 8px 0 0 0;
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .masked-demo {
    padding: 15px;
  }

  .input-group {
    margin-bottom: 15px;
  }
}
</style>
```

