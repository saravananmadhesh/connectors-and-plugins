# Two-Way Binding and Forms — Syncfusion Vue NumericTextBox

## Table of Contents
- [Two-Way Binding](#two-way-binding)
- [Form Integration](#form-integration)
- [Validation](#validation)
- [Examples](#examples)

---

## Two-Way Binding

Use v-model for two-way data binding:

```vue
<template>
  <div>
    <ejs-numerictextbox
      v-model.number="price"
      placeholder="Enter price">
    </ejs-numerictextbox>

    <p>Current Price: ${{ price.toFixed(2) }}</p>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      price: 0
    }
  }
}
</script>
```

---

## Form Integration

Integrate NumericTextBox with forms:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="quantity">Quantity:</label>
      <ejs-numerictextbox
        id="quantity"
        v-model.number="formData.quantity"
        :min="1"
        :decimals="0"
        required>
      </ejs-numerictextbox>
    </div>

    <div class="form-group">
      <label for="price">Price ($):</label>
      <ejs-numerictextbox
        id="price"
        v-model.number="formData.price"
        :decimals="2"
        :min="0"
        required>
      </ejs-numerictextbox>
    </div>

    <div class="form-group">
      <label>Total: ${{ calculateTotal().toFixed(2) }}</label>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      formData: {
        quantity: 1,
        price: 0
      }
    }
  },
  methods: {
    calculateTotal() {
      return this.formData.quantity * this.formData.price;
    },
    submitForm() {
      console.log('Form submitted:', this.formData);
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

## Validation

Validate form input:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-field">
      <label for="age">Age (18-99):</label>
      <ejs-numerictextbox
        id="age"
        v-model.number="formData.age"
        :min="18"
        :max="99"
        :decimals="0"
        @blur="validateAge"
        required>
      </ejs-numerictextbox>
      <span v-if="errors.age" class="error">{{ errors.age }}</span>
    </div>

    <div class="form-field">
      <label for="discount">Discount (0-100%):</label>
      <ejs-numerictextbox
        id="discount"
        v-model.number="formData.discount"
        :min="0"
        :max="100"
        :decimals="2"
        @blur="validateDiscount"
        required>
      </ejs-numerictextbox>
      <span v-if="errors.discount" class="error">{{ errors.discount }}</span>
    </div>

    <button type="submit" :disabled="hasErrors">Submit</button>
  </form>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      formData: {
        age: null,
        discount: null
      },
      errors: {
        age: '',
        discount: ''
      }
    }
  },
  computed: {
    hasErrors() {
      return this.errors.age || this.errors.discount;
    }
  },
  methods: {
    validateAge() {
      if (!this.formData.age || this.formData.age < 18) {
        this.errors.age = 'Age must be at least 18';
      } else if (this.formData.age > 99) {
        this.errors.age = 'Age cannot exceed 99';
      } else {
        this.errors.age = '';
      }
    },
    validateDiscount() {
      if (this.formData.discount < 0 || this.formData.discount > 100) {
        this.errors.discount = 'Discount must be between 0 and 100';
      } else {
        this.errors.discount = '';
      }
    },
    submitForm() {
      this.validateAge();
      this.validateDiscount();
      
      if (!this.hasErrors) {
        console.log('Form submitted:', this.formData);
      }
    }
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.error {
  color: #d83b01;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## Examples

### Complete Form Demo

```vue
<template>
  <div class="form-demo">
    <h3>Complete Order Form</h3>

    <form @submit.prevent="submitOrder">
      <div class="form-row">
        <div class="form-col">
          <label for="quantity">Quantity:</label>
          <ejs-numerictextbox
            id="quantity"
            v-model.number="order.quantity"
            :min="1"
            :decimals="0"
            placeholder="Qty"
            required>
          </ejs-numerictextbox>
        </div>

        <div class="form-col">
          <label for="unit-price">Unit Price ($):</label>
          <ejs-numerictextbox
            id="unit-price"
            v-model.number="order.unitPrice"
            :decimals="2"
            :min="0"
            placeholder="Price"
            required>
          </ejs-numerictextbox>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label for="discount">Discount (%):</label>
          <ejs-numerictextbox
            id="discount"
            v-model.number="order.discountPercent"
            :decimals="2"
            :min="0"
            :max="100"
            placeholder="Discount"
            @change="calculateTotal">
          </ejs-numerictextbox>
        </div>

        <div class="form-col">
          <label for="tax">Tax Rate (%):</label>
          <ejs-numerictextbox
            id="tax"
            v-model.number="order.taxRate"
            :decimals="2"
            :min="0"
            placeholder="Tax"
            @change="calculateTotal">
          </ejs-numerictextbox>
        </div>
      </div>

      <div class="summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ order.subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Discount:</span>
          <span>${{ order.discountAmount.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax:</span>
          <span>${{ order.taxAmount.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ order.total.toFixed(2) }}</span>
        </div>
      </div>

      <button type="submit">Place Order</button>
    </form>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  },
  data() {
    return {
      order: {
        quantity: 1,
        unitPrice: 0,
        discountPercent: 0,
        taxRate: 8.5,
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        total: 0
      }
    }
  },
  watch: {
    'order.quantity': 'calculateTotal',
    'order.unitPrice': 'calculateTotal'
  },
  methods: {
    calculateTotal() {
      const subtotal = this.order.quantity * this.order.unitPrice;
      const discount = (subtotal * this.order.discountPercent) / 100;
      const afterDiscount = subtotal - discount;
      const tax = (afterDiscount * this.order.taxRate) / 100;

      this.order.subtotal = subtotal;
      this.order.discountAmount = discount;
      this.order.taxAmount = tax;
      this.order.total = afterDiscount + tax;
    },
    submitOrder() {
      console.log('Order submitted:', this.order);
    }
  },
  mounted() {
    this.calculateTotal();
  }
}
</script>

<style scoped>
.form-demo {
  padding: 20px;
  max-width: 600px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-col {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

.summary {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 16px;
  border-top: 1px solid #ccc;
  padding-top: 8px;
  margin-top: 8px;
}

button {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

button:hover {
  background: #106ebe;
}
</style>
```
