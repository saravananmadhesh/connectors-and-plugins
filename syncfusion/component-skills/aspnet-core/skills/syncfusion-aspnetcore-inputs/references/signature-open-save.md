# Signature Open and Save — ASP.NET Core

This reference covers loading existing signatures and saving signatures in various formats using the Syncfusion ASP.NET Core Signature control.

## Table of Contents
- [Open / Load Signature](#open--load-signature)
- [Save as Base64](#save-as-base64)
- [Save as Blob](#save-as-blob)
- [Save as Image File](#save-as-image-file)
- [Save with Background](#save-with-background)
- [Complete Example](#complete-example)

---

## Open / Load Signature

The `load(signature, width?, height?)` method loads a previously saved signature onto the canvas. Accepts a base64 string or a hosted/online image URL in PNG, JPEG, or SVG format.

**Parameters:**
- `signature` (string) — base64 string or URL of the image
- `width` (number, optional) — width to render the loaded image
- `height` (number, optional) — height to render the loaded image

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div>
    <input type="text" id="signInput" 
           placeholder="Enter base64 or URL of signature" />
    
    <ejs-button id="loadBtn" 
                cssClass="e-primary" 
                content="Open">
    </ejs-button>
    
    <div id="signature-control">
        <ejs-signature id="signature"></ejs-signature>
    </div>
</div>

<script>
    document.getElementById("loadBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var value = document.getElementById('signInput').value;
        signature.load(value);
    });
</script>
```

---

## Save as Base64

The `getSignature(type?)` method returns the current canvas content as a base64-encoded string. Supports `'Png'`, `'Jpeg'`, and `'Svg'` formats (default: `'Png'`).

The returned base64 string can be stored in a database or passed back to `load()` to restore the signature.

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div>
    <ejs-signature id="signature"></ejs-signature>
    
    <ejs-button id="saveBase64Btn" 
                cssClass="e-primary" 
                content="Save as Base64">
    </ejs-button>
    
    <img id="previewImg" 
         alt="Saved signature" 
         style="border: 1px solid #ccc; margin-top: 8px; display: none;" />
</div>

<script>
    document.getElementById("saveBase64Btn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var base64 = signature.getSignature();
        console.log(base64); // data:image/png;base64,...
        
        // Display preview
        var img = document.getElementById('previewImg');
        img.src = base64;
        img.style.display = 'block';
    });
</script>
```

---

## Save as Blob

Two methods are available for blob output:

- **`saveAsBlob()`** — Returns a `Blob` object directly from the current canvas content.
- **`getBlob(url)`** — Converts a given base64/URL string to a `Blob` object.

Use blobs for file uploads, form submissions, or binary storage.

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<ejs-signature id="signature"></ejs-signature>

<ejs-button id="saveBlobBtn" 
            cssClass="e-primary" 
            content="Save as Blob">
</ejs-button>

<script>
    document.getElementById("saveBlobBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var blob = signature.saveAsBlob();
        
        // Create object URL for download
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'signature.png';
        a.click();
        URL.revokeObjectURL(url);
    });
</script>
```

**Converting a URL/base64 to Blob:**
```javascript
var signature = document.getElementById("signature").ej2_instances[0];
var blob = signature.getBlob(base64String);
```

---

## Save as Image File

The `save(type?, fileName?)` method saves the signature as a downloadable file. Triggers the `beforeSave` event for customization.

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<ejs-signature id="signature" beforeSave="onBeforeSave"></ejs-signature>

<ejs-button id="savePngBtn" cssClass="e-primary" content="Save as PNG"></ejs-button>
<ejs-button id="saveJpegBtn" cssClass="e-primary" content="Save as JPEG"></ejs-button>
<ejs-button id="saveSvgBtn" cssClass="e-primary" content="Save as SVG"></ejs-button>

<script>
    function onBeforeSave(args) {
        // Customize file name and type
        args.fileName = 'Signature_' + new Date().toISOString().slice(0, 10);
        console.log('Saving as:', args.fileType);
    }

    document.getElementById("savePngBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save('Png', 'MySignature');
    });

    document.getElementById("saveJpegBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save('Jpeg', 'MySignature');
    });

    document.getElementById("saveSvgBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save('Svg', 'MySignature');
    });
</script>
```

---

## Save with Background

By default, the signature is saved with its background color and image. Set `saveWithBackground="false"` to save only the strokes (transparent background).

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<ejs-signature id="signature" 
               backgroundColor="#fffacd"
               saveWithBackground="false">
</ejs-signature>

<ejs-button id="saveBtn" cssClass="e-primary" content="Save Strokes Only"></ejs-button>

<script>
    document.getElementById("saveBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        // Saved as transparent PNG
        signature.save('Png', 'SignatureNoBackground');
    });
</script>
```

---

## Complete Example

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div class="container">
    <h3>Signature Open/Save Demo</h3>
    
    <div class="mb-3">
        <input type="text" id="signInput" 
               class="form-control" 
               placeholder="Paste base64 or image URL to load" />
        <ejs-button id="loadBtn" cssClass="e-primary" content="Load Signature"></ejs-button>
    </div>
    
    <ejs-signature id="signature" 
                   backgroundColor="#ffffff"
                   strokeColor="#000000"
                   saveWithBackground="true"
                   change="onChange"
                   beforeSave="onBeforeSave">
    </ejs-signature>
    
    <div class="mt-3">
        <ejs-button id="saveBase64Btn" content="Get Base64"></ejs-button>
        <ejs-button id="saveBlobBtn" content="Save as Blob"></ejs-button>
        <ejs-button id="savePngBtn" cssClass="e-primary" content="Download PNG"></ejs-button>
        <ejs-button id="saveSvgBtn" content="Download SVG"></ejs-button>
    </div>
    
    <div id="output" class="mt-3"></div>
</div>

<script>
    function onChange() {
        console.log('Signature changed');
    }

    function onBeforeSave(args) {
        args.fileName = 'Sign_' + Date.now();
    }

    document.getElementById("loadBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var value = document.getElementById('signInput').value;
        if (value) signature.load(value);
    });

    document.getElementById("saveBase64Btn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var base64 = signature.getSignature();
        document.getElementById('output').innerHTML = 
            '<p>Base64 (first 100 chars): ' + base64.substring(0, 100) + '...</p>';
    });

    document.getElementById("saveBlobBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var blob = signature.saveAsBlob();
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'signature.png';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById("savePngBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save('Png', 'MySignature');
    });

    document.getElementById("saveSvgBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save('Svg', 'MySignature');
    });
</script>
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-api.md` — Complete API reference
- `signature-customization.md` — Customization options
- `signature-user-interaction.md` — User interaction patterns
