# Validation & Events

Implement input validation, handle ValidateEvent, prevent errors, and create robust barcode generation workflows.

---

## Input Validation

### Check Value Before Encoding

```typescript
import { BarcodeGenerator } from '@syncfusion/ej2-barcode-generator';

function validateBarcodeInput(value: string, type: string): boolean {
    // Check: Value not empty
    if (!value || value.trim().length === 0) {
        console.error('Barcode value cannot be empty');
        return false;
    }
    
    // Type-specific validation
    switch(type) {
        case 'Code39':
            // Code39: Digits, uppercase letters, space, and -.+$/%
            return /^[A-Z0-9\s\-.+$/%]*$/.test(value);
        
        case 'Code11':
            // Code11: Digits and dash only
            return /^[0-9\-]*$/.test(value);
        
        case 'Code128':
            // Code128: Accepts all ASCII, highly flexible
            return value.length > 0 && value.length <= 500;
        
        case 'Codabar':
            // Codabar: Digits, symbols, special chars
            return /^[0-9\-$:/.+A-D]*$/.test(value);
        
        default:
            return true;
    }
}

// Usage
const inputValue = 'SYNCFUSION';
const barcodeType = 'Code39';

if (validateBarcodeInput(inputValue, barcodeType)) {
    const barcode = new BarcodeGenerator({
        type: barcodeType,
        value: inputValue,
        width: '200px',
        height: '150px'
    });
    
    barcode.appendTo('#barcode');
} else {
    console.error(`Invalid value "${inputValue}" for ${barcodeType}`);
}
```

### Validate QR Code Data

```typescript
function validateQRData(value: string): { valid: boolean; issue?: string } {
    // Check: Not empty
    if (!value || value.trim() === '') {
        return { valid: false, issue: 'Data cannot be empty' };
    }
    
    // Check: Size reasonable (up to ~2953 bytes for byte mode)
    if (value.length > 3000) {
        return { valid: false, issue: 'Data too large for QR code' };
    }
    
    // Check: Valid URL if it's a URL
    if (value.startsWith('http://') || value.startsWith('https://')) {
        try {
            new URL(value);
            return { valid: true };
        } catch {
            return { valid: false, issue: 'Invalid URL format' };
        }
    }
    
    return { valid: true };
}

// Usage
const urlQR = 'https://www.syncfusion.com';
const validation = validateQRData(urlQR);

if (validation.valid) {
    const qr = new QRCodeGenerator({
        value: urlQR
    });
    qr.appendTo('#qrcode');
} else {
    alert(`QR validation failed: ${validation.issue}`);
}
```

### Validate Data Matrix

```typescript
function validateDataMatrix(value: string, encoding: 'numeric' | 'alphanumeric' | 'byte' = 'byte'): boolean {
    switch(encoding) {
        case 'numeric':
            // Numbers only
            if (!/^\d+$/.test(value)) {
                console.error('Numeric encoding: digits only');
                return false;
            }
            // Check: Capacity (3116 max)
            return value.length <= 3116;
        
        case 'alphanumeric':
            // Uppercase letters, digits, space, special chars
            if (!/^[A-Z0-9\s\-.$/%+*]*$/.test(value)) {
                console.error('Alphanumeric encoding: uppercase, digits, special chars only');
                return false;
            }
            return value.length <= 2335;
        
        case 'byte':
            // Full ASCII
            return value.length <= 1556;
        
        default:
            return false;
    }
}

// Usage
const serialNumber = 'PROD-123456-ABC';
if (validateDataMatrix(serialNumber, 'alphanumeric')) {
    const dm = new DataMatrixGenerator({
        value: serialNumber
    });
    dm.appendTo('#datamatrix');
}
```

---

## Character Set Validation

### Pre-Check Before Creation

```typescript
function getValidCharacterSet(type: string): RegExp {
    const charSets: { [key: string]: RegExp } = {
        'Code39': /^[A-Z0-9\s\-.+$/%]*$/,
        'Code39Extension': /^[\x00-\x7F]*$/,  // All ASCII
        'Code11': /^[0-9\-]*$/,
        'Code32': /^\d{8}$/,                  // 8 digits
        'Codabar': /^[0-9\-$:/.+A-D]*$/,
        'Code93': /^[A-Z0-9\s\-.+$/%]*$/,
        'Code128': /^[\x00-\x7F]*$/,          // All ASCII
        // QR/DataMatrix accept wide range
        'QRCodeGenerator': /^(.|\n)*$/,
        'DataMatrixGenerator': /^(.|\n)*$/
    };
    
    return charSets[type] || /^(.|\n)*$/;
}

function formatForBarcode(input: string, type: string): string {
    const charset = getValidCharacterSet(type);
    
    if (!charset.test(input)) {
        console.warn(`Converting "${input}" for ${type}`);
        
        // Code39: Convert to uppercase
        if (type === 'Code39') {
            return input.toUpperCase().replace(/[^A-Z0-9\s\-.+$/%]/g, '');
        }
        
        // Code11: Keep only digits and dashes
        if (type === 'Code11') {
            return input.replace(/[^\d\-]/g, '');
        }
        
        // Code128: Remove invalid chars
        return input.replace(/[\x80-\xFF]/g, '');
    }
    
    return input;
}

// Usage
const userInput = 'product-123@sync!';
const cleanedInput = formatForBarcode(userInput, 'Code39');
console.log(`Original: ${userInput}`);
console.log(`Cleaned: ${cleanedInput}`);  // "PRODUCT-123SYNC"

const barcode = new BarcodeGenerator({
    type: 'Code39',
    value: cleanedInput
});
```

---

## ValidateEvent Handling

### Catch Validation Errors

```typescript
import { BarcodeGenerator, ValidateEvent } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'INITIAL',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');

// Handle validation errors
barcode.onValidationFailed = (args: ValidateEvent) => {
    console.error('Barcode validation failed:', args);
    alert(`Error: ${args.errorMessage}`);
};

// Update with new value and catch errors
function updateBarcodeValue(newValue: string) {
    try {
        barcode.value = newValue;
        barcode.refresh();
    } catch (error) {
        console.error('Failed to update barcode:', error);
    }
}

// Safe update with validation
updateBarcodeValue('UPDATED-VALUE');
```

### Error Boundary

```typescript
class BarcodeErrorBoundary {
    private barcode: BarcodeGenerator;
    private container: HTMLElement;
    
    constructor(containerId: string, config: any) {
        this.container = document.getElementById(containerId);
        
        try {
            this.barcode = new BarcodeGenerator(config);
            this.barcode.appendTo(`#${containerId}`);
        } catch (error) {
            this.showError(`Failed to create barcode: ${error.message}`);
        }
    }
    
    private showError(message: string) {
        this.container.innerHTML = `
            <div style="color: red; padding: 10px; border: 1px solid red;">
                <strong>Error:</strong> ${message}
            </div>
        `;
    }
    
    updateValue(newValue: string) {
        try {
            if (!newValue || newValue.length === 0) {
                throw new Error('Barcode value cannot be empty');
            }
            
            this.barcode.value = newValue;
            this.barcode.refresh();
        } catch (error) {
            this.showError(error.message);
        }
    }
}

// Usage
const boundary = new BarcodeErrorBoundary('barcode', {
    type: 'Code128',
    value: 'INITIAL'
});

boundary.updateValue('NEW-VALUE');  // Success
boundary.updateValue('');            // Error: Barcode value cannot be empty
```

---

## Form Integration

### Barcode Generation Form

```html
<form id="barcode-form">
    <label for="barcode-type">Barcode Type:</label>
    <select id="barcode-type">
        <option value="Code128">Code128</option>
        <option value="Code39">Code39</option>
        <option value="QRCodeGenerator">QR Code</option>
        <option value="DataMatrixGenerator">Data Matrix</option>
    </select>
    
    <label for="barcode-value">Data:</label>
    <input type="text" id="barcode-value" placeholder="Enter barcode data" />
    
    <button type="button" id="generate-btn">Generate Barcode</button>
    <div id="barcode-error" style="color: red; display: none;"></div>
</form>

<div id="barcode"></div>
```

```typescript
document.getElementById('generate-btn').addEventListener('click', function() {
    const type = (document.getElementById('barcode-type') as HTMLSelectElement).value;
    const value = (document.getElementById('barcode-value') as HTMLInputElement).value;
    const errorDiv = document.getElementById('barcode-error');
    
    try {
        // Validation
        if (!value.trim()) {
            throw new Error('Please enter barcode data');
        }
        
        if (value.length > 500) {
            throw new Error('Data too long (max 500 characters)');
        }
        
        // Clear error
        errorDiv.style.display = 'none';
        
        // Create barcode
        const config: any = {
            type: type,
            value: value,
            width: '200px',
            height: '150px'
        };
        
        // Adjust for type
        if (type === 'QRCodeGenerator' || type === 'DataMatrixGenerator') {
            config.height = '200px';
            config.displayText = { visibility: false };
        }
        
        const barcodeClass = type === 'QRCodeGenerator' ? QRCodeGenerator : 
                           type === 'DataMatrixGenerator' ? DataMatrixGenerator :
                           BarcodeGenerator;
        
        const barcode = new barcodeClass(config);
        
        // Clear previous
        document.getElementById('barcode').innerHTML = '';
        barcode.appendTo('#barcode');
        
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
});
```

---

## Real-Time Validation

### Input with Live Preview

```typescript
let barcode: BarcodeGenerator;
const container = document.getElementById('barcode');

// Initialize
barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'Type something...',
    width: '200px',
    height: '150px'
});
barcode.appendTo('#barcode');

// Real-time input handling
(document.getElementById('realtime-input') as HTMLInputElement)
    .addEventListener('input', function(e) {
    const value = (e.target as HTMLInputElement).value;
    const errorMsg = document.getElementById('validation-msg');
    
    try {
        // Validation
        if (!value) {
            throw new Error('Cannot be empty');
        }
        
        if (value.length > 100) {
            throw new Error('Max 100 characters');
        }
        
        // Update barcode
        barcode.value = value;
        barcode.refresh();
        
        // Clear error
        errorMsg.textContent = '';
        
    } catch (error) {
        errorMsg.textContent = `⚠️ ${error.message}`;
    }
});
```

---

## Error Prevention Patterns

### Defensive Barcode Creation

```typescript
function createBarcodeDefensive(
    type: string,
    value: string,
    containerId: string
): boolean {
    try {
        // Pre-flight checks
        if (!value || typeof value !== 'string') {
            throw new Error('Value must be a non-empty string');
        }
        
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container #${containerId} not found`);
        }
        
        // Type-specific validation
        if (type === 'Code11' && !/^[0-9\-]*$/.test(value)) {
            throw new Error('Code11 only accepts digits and dashes');
        }
        
        if (type === 'Code32' && !/^\d{8}$/.test(value)) {
            throw new Error('Code32 requires exactly 8 digits');
        }
        
        // Create barcode
        const BarcodeClass = type === 'QRCodeGenerator' ? QRCodeGenerator :
                           type === 'DataMatrixGenerator' ? DataMatrixGenerator :
                           BarcodeGenerator;
        
        const barcode = new BarcodeClass({
            type: type,
            value: value,
            width: '200px',
            height: '150px'
        });
        
        barcode.appendTo(`#${containerId}`);
        return true;
        
    } catch (error) {
        console.error(`Barcode creation failed: ${error.message}`);
        showUserError(`Cannot create barcode: ${error.message}`);
        return false;
    }
}

function showUserError(message: string) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'background:red;color:white;padding:10px;margin:10px;';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

// Usage
createBarcodeDefensive('Code128', 'SYNCFUSION', 'barcode');
createBarcodeDefensive('Code11', 'ABC', 'barcode');  // Error: Code11 only accepts digits
```

---

## Sanitization

### Clean User Input

```typescript
function sanitizeInput(input: string, maxLength: number = 100): string {
    // Trim whitespace
    let cleaned = input.trim();
    
    // Truncate if too long
    if (cleaned.length > maxLength) {
        cleaned = cleaned.substring(0, maxLength);
    }
    
    // Remove control characters
    cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, '');
    
    // Remove potentially problematic chars
    cleaned = cleaned.replace(/[<>\"']/g, '');
    
    return cleaned;
}

// Usage
const userInput = '  Hello<>World  ';
const safe = sanitizeInput(userInput);
console.log(safe);  // "HelloWorld"

const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: safe
});
```

---

## Async Validation

### Validate Against Server

```typescript
async function validateBarcodeWithServer(value: string): Promise<boolean> {
    try {
        const response = await fetch('/api/validate-barcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value })
        });
        
        const result = await response.json();
        return result.valid;
        
    } catch (error) {
        console.error('Server validation failed:', error);
        return false;  // Fail safe
    }
}

// Usage
const barcodeInput = 'PROD-123';

// Validate before creation
(async () => {
    const isValid = await validateBarcodeWithServer(barcodeInput);
    
    if (isValid) {
        const barcode = new BarcodeGenerator({
            type: 'Code128',
            value: barcodeInput
        });
        barcode.appendTo('#barcode');
    } else {
        alert('Invalid barcode data');
    }
})();
```

---

## Troubleshooting

**Issue:** "Invalid character in value"
- Solution: Validate against barcode type's character set
- Use: `formatForBarcode()` to clean input before encoding

**Issue:** "Barcode refreshing causes errors"
- Check: New value is valid for barcode type
- Use: Try/catch around `refresh()` calls

**Issue:** "Form submission with invalid barcodes"
- Validate: Before form submission
- Show: Error messages to user
- Use: Form validation pattern shown above

---

## What's Next

You're now ready to build production barcode systems. Review [Customization & Styling](customization-styling.md) for UI polish, or [Export & Printing](export-printing.md) for output workflows.
