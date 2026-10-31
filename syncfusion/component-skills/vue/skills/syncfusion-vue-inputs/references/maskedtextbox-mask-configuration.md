# Mask Configuration — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Mask Syntax](#mask-syntax)
- [Common Patterns](#common-patterns)
- [Custom Prompts](#custom-prompts)
- [Prompt Character](#prompt-character)
- [Examples](#examples)

---

## Mask Syntax

The mask property uses special characters to define input patterns:

| Character | Meaning | Example |
|-----------|---------|---------|
| `9` | Numeric digit (0-9) | `9999` → 1234 |
| `#` | Numeric digit or + or - | `#9999` → +1234 |
| `a` | Alphabetic (A-Z, a-z) | `aaa` → ABC |
| `c` | Alphanumeric (0-9, A-Z, a-z) | `ccc` → 1AB |
| `&` | Character with strict requirement | `&&&` → ABC |
| `.` | Decimal point | `99.99` → 12.34 |
| `,` | Thousands separator | `9,999` → 1,234 |
| `:` | Time separator | `99:99:99` → 12:34:56 |
| `/` | Date separator | `99/99/9999` → 12/31/2024 |
| `-` | Literal dash | `999-99-9999` → 123-45-6789 |
| `(` `)` | Literal parentheses | `(999) 999-9999` |

---

## Common Patterns

### Phone Number (US)

```vue
<template>
  <ejs-maskedtextbox
    mask="(999) 999-9999"
    placeholder="(555) 555-5555">
  </ejs-maskedtextbox>
</template>
```

Output: `(555) 555-5555`

### Social Security Number

```vue
<template>
  <ejs-maskedtextbox
    mask="999-99-9999"
    placeholder="123-45-6789">
  </ejs-maskedtextbox>
</template>
```

Output: `123-45-6789`

### Credit Card

```vue
<template>
  <ejs-maskedtextbox
    mask="9999 9999 9999 9999"
    placeholder="1234 5678 9012 3456">
  </ejs-maskedtextbox>
</template>
```

Output: `1234 5678 9012 3456`

### Date (MM/DD/YYYY)

```vue
<template>
  <ejs-maskedtextbox
    mask="99/99/9999"
    placeholder="12/31/2024">
  </ejs-maskedtextbox>
</template>
```

Output: `12/31/2024`

### Time (HH:MM:SS)

```vue
<template>
  <ejs-maskedtextbox
    mask="99:99:99"
    placeholder="12:30:45">
  </ejs-maskedtextbox>
</template>
```

Output: `12:30:45`

### Postal Code

```vue
<template>
  <ejs-maskedtextbox
    mask="99999-9999"
    placeholder="12345-6789">
  </ejs-maskedtextbox>
</template>
```

Output: `12345-6789`

### International Phone

```vue
<template>
  <ejs-maskedtextbox
    mask="+1 (999) 999-9999"
    placeholder="+1 (555) 555-5555">
  </ejs-maskedtextbox>
</template>
```

Output: `+1 (555) 555-5555`

### Currency

```vue
<template>
  <ejs-maskedtextbox
    mask="$9,999.99"
    placeholder="$1,234.56">
  </ejs-maskedtextbox>
</template>
```

Output: `$1,234.56`

---

## Custom Prompts

Change the placeholder character shown for empty input positions:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="99/99/9999"
      prompt-char="_"
      placeholder="MM/DD/YYYY">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>
```

**Display:**
- Default prompt: `__/__/____`
- Custom prompt: `__/__/____`

---

## Prompt Character

The `prompt-char` property defines what character displays for empty positions:

```vue
<template>
  <div>
    <div class="prompt-demo">
      <label>Default Prompt (#):</label>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="(555) 555-5555">
      </ejs-maskedtextbox>
    </div>

    <div class="prompt-demo">
      <label>Underscore Prompt (_):</label>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        prompt-char="_"
        placeholder="(555) 555-5555">
      </ejs-maskedtextbox>
    </div>

    <div class="prompt-demo">
      <label>Asterisk Prompt (*):</label>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        prompt-char="*"
        placeholder="(555) 555-5555">
      </ejs-maskedtextbox>
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>

<style scoped>
.prompt-demo {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
</style>
```

**Property:** `promptChar` — `string`, defaults to `#`

---

## Examples

### Complete Mask Configuration Demo

```vue
<template>
  <div class="mask-config-demo">
    <h3>Mask Configuration Examples</h3>
    
    <div class="config-section">
      <h4>1. Financial Data</h4>
      <div class="input-group">
        <label>Currency:</label>
        <ejs-maskedtextbox
          mask="$9,999,999.99"
          prompt-char="_"
          placeholder="$1,000.00">
        </ejs-maskedtextbox>
      </div>
    </div>

    <div class="config-section">
      <h4>2. Personal Data</h4>
      <div class="input-group">
        <label>Phone:</label>
        <ejs-maskedtextbox
          mask="(999) 999-9999"
          placeholder="(555) 555-5555">
        </ejs-maskedtextbox>
      </div>
      <div class="input-group">
        <label>SSN:</label>
        <ejs-maskedtextbox
          mask="999-99-9999"
          placeholder="123-45-6789">
        </ejs-maskedtextbox>
      </div>
    </div>

    <div class="config-section">
      <h4>3. Date/Time Data</h4>
      <div class="input-group">
        <label>Date:</label>
        <ejs-maskedtextbox
          mask="99/99/9999"
          placeholder="MM/DD/YYYY">
        </ejs-maskedtextbox>
      </div>
      <div class="input-group">
        <label>Time:</label>
        <ejs-maskedtextbox
          mask="99:99:99"
          placeholder="HH:MM:SS">
        </ejs-maskedtextbox>
      </div>
    </div>

    <div class="config-section">
      <h4>4. Credit Card</h4>
      <div class="input-group">
        <label>Card Number:</label>
        <ejs-maskedtextbox
          mask="9999 9999 9999 9999"
          placeholder="1234 5678 9012 3456">
        </ejs-maskedtextbox>
      </div>
      <div class="input-group">
        <label>CVV:</label>
        <ejs-maskedtextbox
          mask="999"
          placeholder="123">
        </ejs-maskedtextbox>
      </div>
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>

<style scoped>
.mask-config-demo {
  padding: 20px;
}

.config-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.config-section h4 {
  margin-top: 0;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #666;
}
</style>
```
