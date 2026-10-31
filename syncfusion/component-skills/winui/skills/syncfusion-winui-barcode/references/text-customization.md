# Text Customization

The Syncfusion WinUI Barcode control provides extensive options for customizing the display of the encoded text below the barcode. You can control visibility, spacing, and alignment to match your layout requirements.

## Value Property

The `Value` property specifies the text or data to encode in the barcode. By default, this text is displayed below the barcode bars or dots.

### Setting the Value

**XAML:**
```xml
<syncfusion:SfBarcode Value="48625310" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**C#:**
```csharp
SfBarcode barcode = new SfBarcode();
barcode.Value = "48625310";
barcode.Symbology = new CodabarBarcode();
```

### Value Requirements

The value must contain only characters supported by the chosen symbology:

```xml
<!-- Valid for Code39: uppercase, digits, special chars -->
<syncfusion:SfBarcode Value="PRODUCT-123">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>

<!-- Invalid for Code39: lowercase not supported -->
<syncfusion:SfBarcode Value="product-123">  <!-- Will cause error -->
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Best Practice:** Validate your data against the symbology's character set before setting the Value property.

## ShowValue Property

The `ShowValue` property controls whether the encoded text is displayed below the barcode. Default is `True`.

### Show Text (Default)

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       ShowValue="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode with "10110111" displayed below the bars.

### Hide Text

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Only barcode bars visible, no text below.

### When to Hide Text

Hide text when:
- Space is limited (small labels)
- Text is redundant (displayed elsewhere in UI)
- Design preference (cleaner look)
- QR codes where text is not typically shown
- Internal tracking codes (not meant for human reading)

### When to Show Text

Show text when:
- Manual data entry backup required
- Human verification needed
- Standard barcode label format
- Troubleshooting and debugging
- Educational or demonstration purposes

## TextSpacing Property

The `TextSpacing` property controls the vertical space (gap) between the barcode bars/dots and the displayed text. Default spacing is minimal.

### Default Spacing

```xml
<syncfusion:SfBarcode Value="10110111" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Increased Spacing

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       TextSpacing="7">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** 7-pixel gap between barcode and text.

### Reduced Spacing

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       TextSpacing="2">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### C# Example

```csharp
barcode.TextSpacing = 10;  // 10-pixel spacing
```

### Spacing Recommendations

| Use Case | Recommended Spacing |
|----------|---------------------|
| **Compact labels** | 2-3 pixels |
| **Standard labels** | 5-7 pixels (default) |
| **Large displays** | 10-15 pixels |
| **Print applications** | 5-10 pixels |

**Note:** Adjust spacing based on overall barcode height to maintain visual balance.

## HorizontalTextAlignment Property

The `HorizontalTextAlignment` property controls the horizontal alignment of text relative to the barcode. Uses standard `TextAlignment` enum values.

### Center Alignment (Default)

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       HorizontalTextAlignment="Center">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text centered below the barcode.

### Left Alignment

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       HorizontalTextAlignment="Left">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text aligned to the left edge of the barcode.

### Right Alignment

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       HorizontalTextAlignment="Right">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text aligned to the right edge of the barcode.

### C# Example

```csharp
using Microsoft.UI.Xaml;  // For TextAlignment enum

barcode.HorizontalTextAlignment = TextAlignment.Center;
// Options: Left, Center, Right
```

### Alignment Use Cases

| Alignment | Use Case |
|-----------|----------|
| **Center** | Standard labels, symmetric designs, QR codes |
| **Left** | Multi-barcode layouts, list views, left-aligned UIs |
| **Right** | RTL languages, right-aligned layouts, specific design requirements |

## VerticalTextAlignment Property

The `VerticalTextAlignment` property controls whether text appears above or below the barcode.

### Bottom Alignment (Default)

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       VerticalTextAlignment="Bottom">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text displayed below the barcode (standard position).

### Top Alignment

```xml
<syncfusion:SfBarcode Value="10110111" 
                       Height="150" 
                       VerticalTextAlignment="Top">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text displayed above the barcode.

### C# Example

```csharp
using Syncfusion.UI.Xaml.Barcode;

barcode.VerticalTextAlignment = BarcodeTextAlignment.Top;
// Options: Top, Bottom
```

### When to Use Top Alignment

- Custom label designs with text headers
- Multiple barcodes stacked vertically
- Space constraints at bottom of layout
- Design specifications requiring top placement

## Complete Customization Example

Here's an example combining all text customization options:

```xml
<Grid>
    <StackPanel Spacing="30">
        
        <!-- Standard barcode with centered text -->
        <syncfusion:SfBarcode Value="STANDARD-001" 
                               Height="120"
                               ShowValue="True"
                               TextSpacing="5"
                               HorizontalTextAlignment="Center"
                               VerticalTextAlignment="Bottom">
            <syncfusion:SfBarcode.Symbology>
                <syncfusion:Code39Barcode />
            </syncfusion:SfBarcode.Symbology>
        </syncfusion:SfBarcode>
        
        <!-- Barcode with text on top, right-aligned -->
        <syncfusion:SfBarcode Value="CUSTOM-002" 
                               Height="120"
                               ShowValue="True"
                               TextSpacing="8"
                               HorizontalTextAlignment="Right"
                               VerticalTextAlignment="Top">
            <syncfusion:SfBarcode.Symbology>
                <syncfusion:Code39Barcode />
            </syncfusion:SfBarcode.Symbology>
        </syncfusion:SfBarcode>
        
        <!-- Barcode without text -->
        <syncfusion:SfBarcode Value="NOTEXT-003" 
                               Height="120"
                               ShowValue="False">
            <syncfusion:SfBarcode.Symbology>
                <syncfusion:Code39Barcode />
            </syncfusion:SfBarcode.Symbology>
        </syncfusion:SfBarcode>
        
    </StackPanel>
</Grid>
```

## Programmatic Text Customization

Complete C# example for dynamic text configuration:

```csharp
using Syncfusion.UI.Xaml.Barcode;
using Microsoft.UI.Xaml;

public void CreateCustomBarcode()
{
    SfBarcode barcode = new SfBarcode
    {
        Value = "DYNAMIC-123",
        Height = 150,
        Width = 300,
        
        // Text customization
        ShowValue = true,
        TextSpacing = 10,
        HorizontalTextAlignment = TextAlignment.Center,
        VerticalTextAlignment = VerticalAlignment.Bottom
    };
    
    barcode.Symbology = new Code128BBarcode();
    
    // Add to UI
    myGrid.Children.Add(barcode);
}

// Toggle text visibility dynamically
public void ToggleTextVisibility(SfBarcode barcode)
{
    barcode.ShowValue = !barcode.ShowValue;
}

// Adjust spacing based on barcode height
public void SetAdaptiveSpacing(SfBarcode barcode)
{
    if (barcode.Height <= 100)
        barcode.TextSpacing = 3;  // Compact
    else if (barcode.Height <= 200)
        barcode.TextSpacing = 7;  // Standard
    else
        barcode.TextSpacing = 12; // Large
}
```

## Common Text Patterns

### Pattern 1: Product Label (Standard)
```xml
<syncfusion:SfBarcode Value="012345678905" 
                       Height="150" 
                       Width="300"
                       ShowValue="True"
                       HorizontalTextAlignment="Center">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:UpcBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Pattern 2: Shipping Label (No Text)
```xml
<syncfusion:SfBarcode Value="SHIP-12345" 
                       Height="100"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128CBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Pattern 3: Inventory Tag (Left Aligned)
```xml
<syncfusion:SfBarcode Value="INV-2024-001" 
                       Height="120"
                       HorizontalTextAlignment="Left"
                       TextSpacing="8">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Pattern 4: QR Code (Hidden Text)
```xml
<syncfusion:SfBarcode Value="http://example.com/product/12345" 
                       Width="200" 
                       Height="200"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

## Troubleshooting

### Issue: Text is cut off or not visible
**Solution:** 
- Increase the `Height` property of the barcode control
- Reduce `TextSpacing` if space is limited
- Verify `ShowValue="True"` is set

### Issue: Text overlaps with barcode bars
**Solution:**
- Increase `TextSpacing` value (try 5-10 pixels)
- Ensure adequate `Height` is set for the control

### Issue: Text appears in wrong position
**Solution:**
- Check `VerticalTextAlignment` (Top vs Bottom)
- Verify `HorizontalTextAlignment` setting
- Ensure control has adequate Width for alignment

### Issue: Text is too close to barcode
**Solution:**
```xml
<syncfusion:SfBarcode TextSpacing="10" ... />  <!-- Increase spacing -->
```

## Best Practices

1. **Always show text for retail products** - Humans need to read values when scanners fail
2. **Hide text for QR codes** - Text is not typically displayed for 2D barcodes
3. **Use center alignment for symmetry** - Most professional looking for standalone barcodes
4. **Match text spacing to barcode size** - Larger barcodes need more spacing
5. **Test text visibility on actual printer/display** - What looks good on screen may differ when printed
6. **Keep text spacing proportional** - TextSpacing of 5-10% of barcode height works well
