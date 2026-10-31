# Customization & Styling

Customize barcode appearance with colors, dimensions, fonts, render modes, and advanced styling techniques.

## Table of Contents

- [Colors](#colors)
- [Dimensions](#dimensions)
- [Display Text](#display-text)
- [Render Modes](#render-modes)
- [Advanced Styling](#advanced-styling)
- [Responsive Design](#responsive-design)
- [Examples](#examples)

---

## Colors

### Forecolor (Barcode Bars)

The main color of the barcode:

```typescript
import { BarcodeGenerator } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px',
    foreColor: '#000000',  // Black (default)
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Common Colors:**
- `#000000` Black (standard alignment - maximum contrast)
- `#0066cc` Dark blue
- `#cc0000` Dark red
- `#006600` Dark green

### Backcolor (Background)

The background color behind the barcode:

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    foreColor: '#000000',
    backgroundColor: '#ffffff',  // White (default)
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');
```

**Contrast Guidelines:**

```typescript
// High contrast (recommended)
foreColor: '#000000',    // Black
backgroundColor: '#ffffff',    // White

// Professional contrast
foreColor: '#1a1a1a',    // Dark charcoal
backgroundColor: '#f5f5f5',    // Light gray

// Inverse contrast
foreColor: '#ffffff',    // White
backgroundColor: '#000000',    // Black

// Avoid low contrast
foreColor: '#cccccc',    // Light gray
backgroundColor: '#ffffff',    // White (UNREADABLE)
```

### Theme-Based Colors

```typescript
// Material Design colors
const barcodeLight = new BarcodeGenerator({
    foreColor: '#1769aa',  // Material Blue
    backgroundColor: '#eceff1',  // Material Light Blue-Gray
    value: 'DATA'
});

// Bootstrap colors
const barcodePrimary = new BarcodeGenerator({
    foreColor: '#0d6efd',  // Bootstrap Primary Blue
    backgroundColor: '#ffffff',
    value: 'DATA'
});

const barcodeSuccess = new BarcodeGenerator({
    foreColor: '#198754',  // Bootstrap Success Green
    backgroundColor: '#ffffff',
    value: 'DATA'
});
```

### Hex Color Reference

```typescript
// Reds
'#000000' // Black
'#800000' // Maroon
'#ff0000' // Red
'#ff6666' // Light Red

// Blues
'#000080' // Navy
'#0066cc' // Dark Blue
'#0099ff' // Medium Blue
'#99ccff' // Light Blue

// Greens
'#006600' // Dark Green
'#00cc00' // Medium Green
'#99ff99' // Light Green

// Neutral
'#ffffff' // White
'#f5f5f5' // Off-white
'#cccccc' // Light Gray
'#666666' // Dark Gray
'#333333' // Charcoal
```

---

## Dimensions

### Width & Height

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',    // Barcode width
    height: '150px',   // Barcode height
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

### Size Guidelines

| Use Case | Width | Height |
|----------|-------|--------|
| Mobile display | 100px | 75px |
| Standard label | 200px | 150px |
| Large poster | 400px | 300px |
| Print (high res) | 500px | 375px |
| Thumbnail | 80px | 60px |

### Width-Height Aspect Ratios

```typescript
// Square (QR, Data Matrix)
width: '200px',
height: '200px'

// Landscape (1D barcodes, 4:3)
width: '300px',
height: '225px'

// Wide landscape (1D barcodes, 16:9)
width: '400px',
height: '225px'

// Portrait (specialty)
width: '150px',
height: '300px'
```

### Responsive Sizing

```typescript
// Percentage-based (responsive to container)
const barcode = new BarcodeGenerator({
    width: '100%',      // Fill parent width
    height: '150px',    // Fixed height
    value: 'SYNCFUSION'
});

// Or maintain aspect ratio with CSS
const barcode = new BarcodeGenerator({
    width: '200px',
    height: '150px',
    value: 'SYNCFUSION'
});
```

**CSS for Responsive Container:**

```css
#barcode {
    max-width: 100%;
    height: auto;
    width: 200px;
}

/* Mobile breakpoint */
@media (max-width: 600px) {
    #barcode {
        width: 150px;
        height: auto;
    }
}
```

---

## Display Text

Control the text displayed alongside or below the barcode:

### Visibility

```typescript
// Hide text (common for barcodes in systems)
const barcode = new BarcodeGenerator({
    displayText: {
        visibility: false
    },
    value: 'SYNCFUSION',
    type: 'Code128'
});

// Show text
const barcode = new BarcodeGenerator({
    displayText: {
        visibility: true
    },
    value: 'SYNCFUSION',
    type: 'Code128'
});
```

### Custom Text

```typescript
// Override encoded data with custom label
const barcode = new BarcodeGenerator({
    displayText: {
        visibility: true,
        text: 'Product Code'  // Show instead of 'SYNCFUSION'
    },
    value: 'SYNCFUSION'
});
```

### Font Styling

```typescript
const barcode = new BarcodeGenerator({
    displayText: {
        visibility: true,
        text: 'Item Number',
        font: {
            size: '14px',
            color: '#333333',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold'
        }
    },
    value: 'SYNCFUSION'
});
```

### Alignment

```typescript
// Text position relative to barcode
const barcode = new BarcodeGenerator({
    displayText: {
        visibility: true,
        alignment: 'Center',  // Center (default), Left, Right
        margin: { top: 10, bottom: 0 }  // Spacing
    },
    value: 'SYNCFUSION'
});
```

### Complete Display Text Example

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SKU-987654',
    width: '250px',
    height: '150px',
    displayText: {
        visibility: true,
        text: 'Product Serial',
        font: {
            size: '12px',
            color: '#0066cc',
            fontWeight: 'bold'
        }
    },
    foreColor: '#000000',
    backgroundColor: '#ffffff'
});

barcode.appendTo('#barcode');
```

---

## Render Modes

### SVG (Recommended)

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    mode: 'SVG',  // Scalable Vector Graphics
    width: '200px',
    height: '150px'
});
```

**Advantages:**
- ✅ Scalable (no pixelation at any size)
- ✅ Perfect for printing
- ✅ Smaller export file sizes
- ✅ CSS styleable
- ✅ Accessible (screen readers)

**Best For:**
- Print media
- PDFs
- Responsive designs
- High-quality exports

### Canvas

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    mode: 'Canvas',  // Raster graphics
    width: '200px',
    height: '150px'
});
```

**Advantages:**
- ✅ Faster rendering for many barcodes
- ✅ Better performance with animations
- ✅ Smoother on less powerful devices

**Disadvantages:**
- ❌ Pixelates when scaled
- ❌ Larger export file sizes
- ❌ Not ideal for printing

**Best For:**
- Web displays only
- High-performance scenarios
- Real-time generation

---

## Advanced Styling

### CSS Styling SVG Barcodes

When using SVG mode, apply CSS:

```html
<style>
    #barcode svg {
        border: 2px solid #333;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 4px;
    }
</style>

<div id="barcode"></div>
```

### Container Styling

```typescript
// JavaScript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px'
});

barcode.appendTo('#barcode');
```

```css
/* CSS */
#barcode {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
    border: 1px solid #ddd;
    border-radius: 8px;
}
```

### Dynamic Theming

```typescript
function createThemedBarcode(theme: 'light' | 'dark') {
    const colors = {
        light: { foreColor: '#000000', backgroundColor: '#ffffff' },
        dark: { foreColor: '#ffffff', backgroundColor: '#1a1a1a' }
    };

    const barcode = new BarcodeGenerator({
        type: 'Code128',
        value: 'SYNCFUSION',
        ...colors[theme],
        width: '200px',
        height: '150px'
    });
    
    return barcode;
}

// Use theme
const lightBarcode = createThemedBarcode('light');
const darkBarcode = createThemedBarcode('dark');
```

### Print Stylesheet

```css
@media print {
    #barcode {
        background-color: white;  /* Force white bg on print */
        border: none;              /* Remove border */
        page-break-inside: avoid;  /* Keep on same page */
    }
    
    #barcode svg {
        max-width: 100%;
        height: auto;
    }
}
```

---

## Responsive Design

### Mobile-Optimized Barcode

```typescript
function createResponsiveBarcode(containerId: string) {
    const container = document.getElementById(containerId);
    const isMobile = window.innerWidth < 600;
    
    const barcode = new BarcodeGenerator({
        type: 'Code128',
        value: 'SYNCFUSION',
        width: isMobile ? '150px' : '200px',
        height: isMobile ? '112px' : '150px',
        mode: 'SVG',
        displayText: {
            visibility: !isMobile,  // Hide on mobile to save space
            font: { size: isMobile ? '10px' : '12px' }
        }
    });
    
    barcode.appendTo(`#${containerId}`);
}

createResponsiveBarcode('barcode');

// Recreate on resize
window.addEventListener('resize', () => {
    const container = document.getElementById('barcode');
    if (container) {
        container.innerHTML = '';  // Clear
        createResponsiveBarcode('barcode');
    }
});
```

### Grid Layout

```html
<style>
    .barcode-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    
    .barcode-item {
        text-align: center;
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 8px;
    }
</style>

<div class="barcode-grid">
    <div class="barcode-item">
        <h4>Product A</h4>
        <div id="barcode1"></div>
    </div>
    <div class="barcode-item">
        <h4>Product B</h4>
        <div id="barcode2"></div>
    </div>
</div>
```

---

## Examples

### Professional Label Design

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SKU-ABC-123456',
    width: '250px',
    height: '150px',
    mode: 'SVG',
    foreColor: '#1a1a1a',
    backgroundColor: '#f9f9f9',
    displayText: {
        visibility: true,
        text: 'Product Serial Number',
        font: {
            size: '11px',
            color: '#666666',
            fontWeight: 'normal'
        }
    }
});

barcode.appendTo('#barcode');
```

### High-Contrast Industrial Label

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'WAREHOUSE-ZONE-5',
    width: '300px',
    height: '200px',
    mode: 'SVG',
    foreColor: '#000000',
    backgroundColor: '#ffff00',  // High visibility yellow
    displayText: {
        visibility: true,
        font: { size: '14px', fontWeight: 'bold' }
    }
});

barcode.appendTo('#barcode');
```

### Minimalist Design

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'DATA',
    width: '150px',
    height: '100px',
    mode: 'SVG',
    foreColor: '#333333',
    backgroundColor: '#ffffff',
    displayText: { visibility: false }
});

barcode.appendTo('#barcode');
```

---

## Troubleshooting

**Issue:** "Barcode not scannable after color change"
- Check: Sufficient contrast between foreColor and backgroundColor
- Use: Black on white for highest readability
- Avoid: Low saturation colors (light grays, pastels)

**Issue:** "Text overlaps with barcode"
- Increase: Height to accommodate display text
- Set: `displayText.visibility: false` if text not needed
- Adjust: Font size smaller

**Issue:** "Barcode pixelates when scaled"
- Switch: From 'Canvas' mode to 'SVG' mode
- SVG automatically scales without quality loss

---

## Next Steps

Explore [Export & Printing](export-printing.md) to save your styled barcodes or [Barcode Types](barcode-types.md) to change the barcode format.
