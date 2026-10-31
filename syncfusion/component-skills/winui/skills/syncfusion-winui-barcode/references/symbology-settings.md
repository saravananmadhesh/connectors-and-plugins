# Symbology-Specific Settings

Each barcode symbology in the Syncfusion WinUI Barcode control supports optional settings that affect encoding behavior, error correction, and data validation. This guide covers configuration options for both one-dimensional and two-dimensional barcodes.

## Table of Contents
- [One-Dimensional Barcode Settings](#one-dimensional-barcode-settings)
  - [EnableCheckSum](#enablechecksum)
  - [ShowCheckSum](#showchecksum)
  - [EncodeStartStopSymbols](#encodestartstopsymbols)
- [Two-Dimensional Barcode Settings](#two-dimensional-barcode-settings)
  - [DataMatrix Settings](#datamatrix-settings)
  - [QR Code Settings](#qr-code-settings)
- [Configuration Examples by Use Case](#configuration-examples-by-use-case)

## One-Dimensional Barcode Settings

One-dimensional barcodes (linear barcodes) support three main settings: checksum validation, checksum display, and start/stop symbol encoding.

### EnableCheckSum

The `EnableCheckSum` property enables redundancy checking using a check digit. This provides data validation to ensure the barcode is read correctly.

**Type:** Boolean (default: `False`)  
**Purpose:** Add error detection capability  
**Applicable to:** All 1D symbologies that support checksums

#### Without CheckSum

```xml
<syncfusion:SfBarcode Value="12345" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EnableCheckSum="False" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode encodes "12345" without validation digit.

#### With CheckSum Enabled

```xml
<syncfusion:SfBarcode Value="12345" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EnableCheckSum="True" 
                                    ShowCheckSum="False" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Check digit calculated and encoded in barcode, but not shown in text (unless ShowCheckSum=True).

#### How Checksums Work

1. Algorithm calculates a check digit from the data
2. Check digit is appended to the encoded data
3. Scanner validates the check digit when reading
4. If validation fails, scanner rejects the read

**Benefits:**
- Detects single-digit errors
- Reduces data entry mistakes
- Provides confidence in scanned data
- Industry-standard for critical applications

#### When to Enable CheckSum

| Use Case | Enable CheckSum? |
|----------|-----------------|
| **Retail products** | ✅ Yes (standard requirement) |
| **Pharmaceuticals** | ✅ Yes (safety critical) |
| **Financial transactions** | ✅ Yes (accuracy required) |
| **Internal tracking** | ⚠️ Optional (less critical) |
| **Temporary labels** | ❌ No (not necessary) |

### ShowCheckSum

The `ShowCheckSum` property controls whether the calculated check digit appears in the displayed text below the barcode.

**Type:** Boolean (default: `False`)  
**Prerequisite:** `EnableCheckSum` must be `True`

#### Hide CheckSum (Default)

```xml
<syncfusion:SfBarcode Value="48625310" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EnableCheckSum="True" 
                                    ShowCheckSum="False" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text displays "48625310" (original value), check digit hidden but encoded in bars.

#### Show CheckSum

```xml
<syncfusion:SfBarcode Value="48625310" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EnableCheckSum="True" 
                                    ShowCheckSum="True" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Text displays "486253102" (original value + check digit).

#### Decision Guide

**Show CheckSum when:**
- Manual data entry is required (humans need to type all digits)
- Full barcode value verification is needed
- Audit trails require complete number visibility
- Industry standards mandate display (e.g., ISBN with check digit)

**Hide CheckSum when:**
- Text is for reference only (scanning is primary method)
- Simpler display preferred
- Check digit confuses users
- Space is limited for text display

### EncodeStartStopSymbols

The `EncodeStartStopSymbols` property adds start and stop symbols that signal barcode readers where the code begins and ends.

**Type:** Boolean (default: varies by symbology)  
**Purpose:** Improve scanning reliability  
**Applicable to:** Symbologies that support start/stop characters (Codabar, Code39, Code93)

#### Without Start/Stop Symbols

```xml
<syncfusion:SfBarcode Value="A12345B" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EncodeStartStopSymbols="False" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Barcode without explicit start/stop markers (A and B are data).

#### With Start/Stop Symbols

```xml
<syncfusion:SfBarcode Value="12345" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode EncodeStartStopSymbols="True" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Start and stop symbols added automatically (system chooses appropriate symbols like A/B).

#### Symbology-Specific Start/Stop

| Symbology | Start/Stop Characters |
|-----------|----------------------|
| **Codabar** | A, B, C, or D |
| **Code39** | Asterisk (*) - always included automatically |
| **Code93** | Special character - always included automatically |

**Note:** Code39 and Code93 always include start/stop symbols (asterisk for Code39). This property is most relevant for Codabar.

#### When to Enable

**Enable when:**
- Using older scanners that need explicit markers
- Scanning in noisy environments
- Multiple barcodes on same label
- Partial scanning is possible (prevents misreads)

**Disable when:**
- Modern scanners with good detection
- Start/Stop symbols conflict with data format
- Symbology automatically includes them (Code39, Code93)

### Complete 1D Configuration Example

```xml
<syncfusion:SfBarcode Value="PRODUCT123" 
                       Height="150" 
                       Width="300"
                       ShowValue="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode EnableCheckSum="True" 
                                   ShowCheckSum="True"
                                   EncodeStartStopSymbols="True" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Code39 barcode with check digit, displayed text includes check digit, start/stop symbols encoded.

## Two-Dimensional Barcode Settings

Two-dimensional barcodes have more complex settings related to encoding format, matrix size, error correction, and version control.

## DataMatrix Settings

DataMatrix barcodes support two primary settings: encoding format and matrix size.

### Encoding Property

The `Encoding` property determines how data is encoded in the DataMatrix barcode.

**Type:** `DataMatrixEncoding` enum  
**Default:** `Auto`

#### Encoding Options

| Encoding | Character Set | Best For |
|----------|--------------|----------|
| **ASCII** | 0-127 (ASCII) | Standard alphanumeric text |
| **ASCIINumeric** | 0-9 only | Numeric data (most efficient) |
| **Auto** | All characters | Mixed data types (automatic selection) |
| **Base256** | 0-255 (Extended ASCII) | Binary data, special characters |

#### ASCII Encoding

```xml
<syncfusion:SfBarcode Value="ABC123" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode Encoding="ASCII" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Use for:** Standard text (A-Z, a-z, 0-9, basic punctuation)

#### ASCIINumeric Encoding

```xml
<syncfusion:SfBarcode Value="1234567890" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode Encoding="ASCIINumeric" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Use for:** Pure numeric data (most compact)  
**Efficiency:** 2 digits per codeword

#### Auto Encoding

```xml
<syncfusion:SfBarcode Value="Mix#123!abc@" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode Encoding="Auto" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Use for:** Unknown or mixed content (system selects optimal encoding)  
**Recommended:** Default choice for most applications

#### Base256 Encoding

```xml
<syncfusion:SfBarcode Value="Extended™©®" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode Encoding="Base256" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Use for:** Extended characters, binary data, special symbols

### MatrixSize Property

The `MatrixSize` property specifies the physical dimensions of the DataMatrix symbol.

**Type:** `DataMatrixSize` enum  
**Default:** `Auto` (size chosen based on data length)

#### Auto Size (Recommended)

```xml
<syncfusion:SfBarcode Value="AutoSize" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode MatrixSize="Auto" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** System selects smallest matrix that fits the data.

#### Fixed Square Size

```xml
<syncfusion:SfBarcode Value="FixedSize" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode MatrixSize="Size32x32" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** DataMatrix always uses 32×32 module grid.

#### Fixed Rectangular Size

```xml
<syncfusion:SfBarcode Value="Rect" Width="200" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode MatrixSize="Size16x48" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** DataMatrix uses 16×48 module grid (rectangular).

### DataMatrix Size Reference

#### Square Sizes

| Size | Modules | Numeric Capacity | Alphanumeric Capacity |
|------|---------|------------------|----------------------|
| Size10x10 | 10×10 | 6 | 3 |
| Size12x12 | 12×12 | 10 | 6 |
| Size14x14 | 14×14 | 16 | 10 |
| Size16x16 | 16×16 | 24 | 16 |
| Size18x18 | 18×18 | 36 | 25 |
| Size20x20 | 20×20 | 44 | 31 |
| Size22x22 | 22×22 | 60 | 43 |
| Size24x24 | 24×24 | 72 | 52 |
| Size26x26 | 26×26 | 88 | 64 |
| Size32x32 | 32×32 | 124 | 91 |
| Size36x36 | 36×36 | 172 | 127 |
| Size40x40 | 40×40 | 228 | 169 |
| Size44x44 | 44×44 | 288 | 214 |
| Size48x48 | 48×48 | 348 | 259 |
| Size52x52 | 52×52 | 408 | 304 |
| Size64x64 | 64×64 | 560 | 418 |
| Size72x72 | 72×72 | 736 | 550 |
| Size80x80 | 80×80 | 912 | 682 |
| Size88x88 | 88×88 | 1152 | 862 |
| Size96x96 | 96×96 | 1392 | 1042 |
| Size104x104 | 104×104 | 1632 | 1222 |
| Size120x120 | 120×120 | 2100 | 1573 |
| Size132x132 | 132×132 | 2608 | 1954 |
| Size144x144 | 144×144 | 3116 | 2335 |

#### Rectangular Sizes

| Size | Modules | Numeric Capacity | Alphanumeric Capacity |
|------|---------|------------------|----------------------|
| Size8x18 | 8×18 | 10 | 6 |
| Size8x32 | 8×32 | 20 | 13 |
| Size12x26 | 12×26 | 32 | 22 |
| Size12x36 | 12×36 | 44 | 31 |
| Size16x36 | 16×36 | 64 | 46 |
| Size16x48 | 16×48 | 98 | 72 |

### When to Set Fixed Size

**Use Auto (default) when:**
- Data length varies
- Want smallest possible code
- Don't have size constraints

**Use Fixed Size when:**
- Printer requires specific dimensions
- Label format is standardized
- Need consistent appearance across all codes
- Pre-printed boundaries on label

## QR Code Settings

QR codes support three main settings: version (size), error correction level, and input mode.

### QRVersion Property

The `QRVersion` property determines the size and data capacity of the QR code.

**Type:** `QRBarcodeVersion` enum  
**Range:** Version01 to Version40, or Auto  
**Default:** `Auto`

#### Version Structure

- **Version 1:** 21×21 modules
- **Version 2:** 25×25 modules
- **Version N:** (N×4 + 17) × (N×4 + 17) modules
- **Version 40:** 177×177 modules (maximum)

#### Auto Version (Recommended)

```xml
<syncfusion:SfBarcode Value="QR Code Data" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode QRVersion="Auto" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Smallest version that fits the data at current error correction level.

#### Fixed Version

```xml
<syncfusion:SfBarcode Value="Small" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode QRVersion="Version05" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Result:** Always uses Version 5 (37×37 modules), even if smaller version would work.

#### Version Selection Guide

| Data Length | Suggested Version | Modules |
|-------------|------------------|---------|
| < 20 chars | Version01-03 | 21×21 to 29×29 |
| 20-50 chars | Version04-08 | 33×33 to 49×49 |
| 50-150 chars | Version09-15 | 53×53 to 77×77 |
| 150-500 chars | Version16-25 | 81×81 to 117×117 |
| > 500 chars | Version26-40 | 121×121 to 177×177 |

**Recommendation:** Use `Auto` unless you need consistent QR code size regardless of data length.

### ErrorCorrectionLevel Property

The `ErrorCorrectionLevel` property determines how much of the QR code can be damaged while still remaining readable.

**Type:** `ErrorCorrectionLevel` enum  
**Default:** `Low`

#### Error Correction Levels

| Level | Recovery Capacity | Data Capacity | Use Case |
|-------|------------------|---------------|----------|
| **Low** | ~7% | Maximum | Clean environments, digital displays |
| **Medium** | ~15% | High | Standard use, printed labels |
| **Quartile** | ~25% | Medium | Outdoor use, wear expected |
| **High** | ~30% | Minimum | Harsh conditions, critical data |

#### Low Error Correction

```xml
<syncfusion:SfBarcode Value="http://example.com/long-url-here" 
                       Width="200" 
                       Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode ErrorCorrectionLevel="Low" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Best for:** Maximum data capacity, protected environments

#### Medium Error Correction (Recommended)

```xml
<syncfusion:SfBarcode Value="http://example.com" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode ErrorCorrectionLevel="Medium" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Best for:** General purpose, standard printing

#### Quartile Error Correction

```xml
<syncfusion:SfBarcode Value="Outdoor Label" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode ErrorCorrectionLevel="Quartile" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Best for:** Outdoor labels, moderate damage expected

#### High Error Correction

```xml
<syncfusion:SfBarcode Value="Critical" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode ErrorCorrectionLevel="High" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Best for:** Harsh environments, worn surfaces, small print

### InputMode Property

The `InputMode` property specifies the character encoding mode for the QR code data.

**Type:** `QRInputMode` enum  
**Default:** `BinaryMode`

#### Numeric Mode

```xml
<syncfusion:SfBarcode Value="1234567890" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode InputMode="NumericMode" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Characters:** 0-9 only  
**Efficiency:** 3.33 digits per codeword (most efficient for numbers)  
**Use for:** Phone numbers, numeric IDs, tracking numbers

#### AlphaNumeric Mode

```xml
<syncfusion:SfBarcode Value="PRODUCT-123" Width="200" Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode InputMode="AlphaNumericMode" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Characters:** 0-9, A-Z (uppercase), space, $ % * + - . / :  
**Efficiency:** 2 characters per codeword  
**Use for:** Product codes, simple URLs, uppercase text

#### Binary Mode (Default)

```xml
<syncfusion:SfBarcode Value="http://example.com/path?param=value" 
                       Width="200" 
                       Height="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode InputMode="BinaryMode" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Characters:** All Shift JIS characters (includes lowercase, special chars)  
**Efficiency:** 1 byte per codeword  
**Use for:** URLs, mixed case text, special characters, binary data

### Complete QR Configuration Example

```xml
<syncfusion:SfBarcode Value="https://syncfusion.com" 
                       Width="300" 
                       Height="300"
                       ShowValue="False"
                       AutoModule="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode QRVersion="Auto" 
                               ErrorCorrectionLevel="Medium"
                               InputMode="BinaryMode" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

## Configuration Examples by Use Case

### Use Case 1: Retail Product Barcode

```xml
<!-- UPC with checksum for retail -->
<syncfusion:SfBarcode Value="012345678905" Height="150" Width="300">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:UpcBarcode />  <!-- Checksum automatic -->
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Use Case 2: Pharmaceutical Tracking

```xml
<!-- Code39 with checksum and start/stop -->
<syncfusion:SfBarcode Value="MED-12345" Height="120" Width="280">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode EnableCheckSum="True" 
                                   ShowCheckSum="True"
                                   EncodeStartStopSymbols="True" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Use Case 3: Marketing QR Code

```xml
<!-- QR with high error correction for printed materials -->
<syncfusion:SfBarcode Value="https://promo.example.com" 
                       Width="250" 
                       Height="250"
                       ShowValue="False">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode ErrorCorrectionLevel="High" 
                               QRVersion="Auto"
                               InputMode="BinaryMode" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Use Case 4: Compact Component Label

```xml
<!-- DataMatrix for small labels -->
<syncfusion:SfBarcode Value="PART-A-12345" 
                       Width="100" 
                       Height="100"
                       ShowValue="False"
                       AutoModule="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode Encoding="Auto" 
                                       MatrixSize="Auto" />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

### Use Case 5: Shipping Label

```xml
<!-- GS1-128 for logistics -->
<syncfusion:SfBarcode Value="(01)12345678901231(10)ABC123" 
                       Height="150" 
                       Width="400">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:GS1Code128Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

## Best Practices

1. **Use Auto settings by default** - Let system optimize (QRVersion, MatrixSize, Encoding)
2. **Enable checksums for critical data** - Retail, pharmaceutical, financial applications
3. **Match error correction to environment** - Higher for outdoor/worn labels
4. **Choose appropriate input mode** - NumericMode for numbers, BinaryMode for mixed content
5. **Test with target scanners** - Verify settings work with your equipment
6. **Document configuration choices** - Record why specific settings were selected
7. **Consider data growth** - If data length may increase, test with maximum expected size

## Troubleshooting

### Issue: "Data too large for selected QR version"
**Solution:**
```xml
<syncfusion:QRBarcode QRVersion="Auto" />  <!-- Let system choose -->
```

### Issue: DataMatrix too small for data
**Solution:**
```xml
<syncfusion:DataMatrixBarcode MatrixSize="Auto" />
```

### Issue: QR code unreadable in harsh conditions
**Solution:**
```xml
<syncfusion:QRBarcode ErrorCorrectionLevel="High" />  <!-- Increase from Low/Medium -->
```

### Issue: Checksum showing in text but not wanted
**Solution:**
```xml
<syncfusion:CodabarBarcode EnableCheckSum="True" ShowCheckSum="False" />
```
