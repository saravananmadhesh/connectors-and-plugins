# Signature Component — Getting Started with ASP.NET Core

Quick start guide for implementing the Signature Pad component in ASP.NET Core applications.

## Table of Contents
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Basic Implementation](#basic-implementation)
- [Saving Signatures](#saving-signatures)
- [Real-World Example](#real-world-example)

---

## Installation

### NuGet Package

Install the Syncfusion Signature component:

```powershell
Install-Package Syncfusion.EJ2.AspNetCore.Inputs
```

### Register in _Layout.cshtml

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signature Demo</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Syncfusion CSS -->
    <link href="https://cdn.syncfusion.com/ej2/latest/bootstrap.css" rel="stylesheet" />
</head>
<body>
    @RenderBody()

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Syncfusion JS -->
    <script src="https://cdn.syncfusion.com/ej2/latest/dist/ej2.min.js"></script>
</body>
</html>
```

### Register TagHelper

In `_ViewImports.cshtml`:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

---

## Basic Implementation

Add the Signature component to your Razor view:

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs

<div class='wrap'>
    <ejs-signature id="signature"></ejs-signature>
</div>

<style>
    .wrap {
        margin: 0 auto;
        width: 300px;
        text-align: center;
    }

    #signature {
        border: 1px solid lightgray;
        height: 100%;
        width: 100%;
    }
</style>
```

Press Ctrl+F5 to run the app. The Signature control will be rendered in the default web browser.

---

## Adding Controls

### With Buttons

Add undo/redo/clear buttons:

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons

<div class='wrap'>
    <div id="option">
        <table>
            <tr>
                <td>
                    <ejs-button id="undoBtn" cssClass="e-primary" content="Undo" disabled="true"></ejs-button>
                </td>
                <td>
                    <ejs-button id="redoBtn" cssClass="e-primary" content="Redo" disabled="true"></ejs-button>
                </td>
                <td>
                    <ejs-button id="clearBtn" cssClass="e-primary" content="Clear" disabled="true"></ejs-button>
                </td>
            </tr>
        </table>
    </div>
    <div id="signature-control">
        <ejs-signature id="signature" change="change"></ejs-signature>
    </div>
</div>

<script>
    document.getElementById("undoBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.undo();
        }
    });
    document.getElementById("redoBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.redo();
        }
    });
    document.getElementById("clearBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        if (!signature.isReadOnly && !signature.disabled) {
            signature.clear();
        }
    });

    function change() {
        var signature = document.getElementById("signature").ej2_instances[0];
        var undoBtn = document.getElementById("undoBtn").ej2_instances[0];
        var redoBtn = document.getElementById("redoBtn").ej2_instances[0];
        var clearBtn = document.getElementById("clearBtn").ej2_instances[0];

        if (!signature.disabled && !signature.isReadOnly) {
            undoBtn.disabled = !signature.canUndo();
            redoBtn.disabled = !signature.canRedo();
            clearBtn.disabled = signature.isEmpty();
        }
    }
</script>
```

---

## Saving Signatures

### Get Signature as Image

Use the `getSignature()` method to get the signature as a data URL:

**Razor View (CSHTML):**
```html
<ejs-button id="saveBtn" cssClass="e-primary" content="Save Signature"></ejs-button>

<script>
    document.getElementById("saveBtn").addEventListener('click', function () {
        var signature = document.getElementById("signature").ej2_instances[0];
        var signatureImage = signature.getSignature();
        console.log('Signature image URL:', signatureImage);
        
        // Send to server
        fetch('/api/signature/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: signatureImage })
        });
    });
</script>
```

---

## Project Setup

### Create ViewModel

**Models/SignatureViewModel.cs:**
```csharp
using System.ComponentModel.DataAnnotations;

public class SignatureViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Signature is required")]
    public string SignatureData { get; set; }

    [Required]
    [StringLength(100)]
    public string DocumentName { get; set; }

    public DateTime SignedDate { get; set; }

    [Phone]
    public string PhoneNumber { get; set; }
}
```

### Create Controller

**Controllers/SignatureController.cs:**
```csharp
using Microsoft.AspNetCore.Mvc;
using YourNamespace.Models;

public class SignatureController : Controller
{
    private readonly ILogger<SignatureController> _logger;

    public SignatureController(ILogger<SignatureController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Save(SignatureViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Validate signature data exists and is not empty
            if (string.IsNullOrEmpty(model.SignatureData))
            {
                return BadRequest("Signature cannot be empty");
            }

            // Save signature data to database
            // Example: _context.Signatures.Add(model);
            // _context.SaveChanges();

            _logger.LogInformation($"Signature saved for document: {model.DocumentName}");

            return Json(new { success = true, message = "Signature saved successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error saving signature: {ex.Message}");
            return StatusCode(500, "Error saving signature");
        }
    }
}
```

---

## Basic Implementation

### Simple Signature Pad

**Views/Signature/Index.cshtml:**
```html
@{
    ViewBag.Title = "Signature Pad";
}

<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Sign Below</h5>

            <div id="signature" style="border: 1px solid #ccc; border-radius: 4px; height: 300px;"></div>

            <div class="mt-3">
                <button class="btn btn-secondary" onclick="clearSignature()">Clear</button>
                <button class="btn btn-primary" onclick="saveSignature()">Save Signature</button>
            </div>
        </div>
    </div>
</div>

<script>
    let signaturePad;

    // Initialize Signature Pad
    function initializeSignature() {
        const container = document.getElementById('signature');
        const options = {
            height: '300px',
            width: '100%'
        };
        
        // Note: Syncfusion Signature component initialization
        // The exact implementation depends on your Syncfusion version
        // Example assumes Signature component with ID 'signature'
    }

    function clearSignature() {
        const pad = document.getElementById('signature').ej2_instances[0];
        if (pad) {
            pad.clear();
        }
    }

    function saveSignature() {
        const pad = document.getElementById('signature').ej2_instances[0];
        if (!pad) {
            alert('Signature pad not initialized');
            return;
        }

        const signatureData = pad.getSignature();
        if (!signatureData || signatureData.length === 0) {
            alert('Please sign before saving');
            return;
        }

        // Send to server
        fetch('/Signature/Save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                documentName: 'Document',
                signatureData: signatureData,
                phoneNumber: ''
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Signature saved successfully');
                clearSignature();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', initializeSignature);
</script>
```

---

## Saving Signatures

### Export as Image

```javascript
function exportAsImage() {
    const pad = document.getElementById('signature').ej2_instances[0];
    if (!pad) return;

    const canvas = pad.getSignatureImage();
    
    // Create download link
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'signature.png';
    link.click();
}
```

### Export as Base64

```javascript
function exportAsBase64() {
    const pad = document.getElementById('signature').ej2_instances[0];
    if (!pad) return;

    const signatureData = pad.getSignature();
    console.log('Signature Base64:', signatureData);
    
    return signatureData;
}
```

### Save to Database

**Models/Signature.cs:**
```csharp
using System;

public class Signature
{
    public int Id { get; set; }
    public string SignatureData { get; set; }
    public string DocumentName { get; set; }
    public DateTime SignedDate { get; set; }
    public string UserName { get; set; }
}
```

**Controllers/SignatureController.cs (Extended):**
```csharp
[HttpPost]
public async Task<IActionResult> SaveSignature(SignatureViewModel model)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try
    {
        var signature = new Signature
        {
            SignatureData = model.SignatureData,
            DocumentName = model.DocumentName,
            SignedDate = DateTime.Now,
            UserName = User.Identity.Name
        };

        _context.Signatures.Add(signature);
        await _context.SaveChangesAsync();

        return Json(new { 
            success = true, 
            id = signature.Id,
            message = "Signature saved successfully" 
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = ex.Message });
    }
}
```

---

## Real-World Example

### Document Signing Form

**Views/Signature/DocumentSign.cshtml:**
```html
@{
    ViewBag.Title = "Sign Document";
}

<div class="container mt-5">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <h2>Document Signature Required</h2>

            <!-- Document Preview -->
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <h5 class="mb-0">Document to Sign</h5>
                </div>
                <div class="card-body" style="height: 200px; background: #f8f9fa; border: 1px solid #dee2e6;">
                    <p class="text-muted">
                        <strong>Service Agreement</strong><br>
                        Effective Date: @DateTime.Now.ToString("MMM dd, yyyy")<br>
                        <br>
                        This agreement outlines the terms and conditions of service...
                        [Document content preview]
                    </p>
                </div>
            </div>

            <!-- Signature Pad -->
            <form id="signatureForm">
                <div class="card">
                    <div class="card-header bg-light">
                        <h5 class="mb-0">Your Signature</h5>
                    </div>
                    <div class="card-body">
                        <div id="signaturePad" style="border: 2px solid #ddd; border-radius: 4px; height: 250px; background: white;"></div>

                        <div class="mt-2 text-muted small">
                            Sign above using your mouse or touchpad
                        </div>

                        <!-- Hidden input for signature data -->
                        <input type="hidden" id="signatureData" name="signatureData" />

                        <!-- Signer Information -->
                        <div class="mt-4">
                            <div class="mb-3">
                                <label for="signerName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="signerName" required />
                            </div>

                            <div class="mb-3">
                                <label for="signerDate" class="form-label">Date</label>
                                <input type="date" class="form-control" id="signerDate" required />
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-light">
                        <button type="button" class="btn btn-outline-secondary" onclick="clearSignaturePad()">
                            Clear Signature
                        </button>
                        <button type="button" class="btn btn-primary" onclick="submitSignature()">
                            Sign and Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function clearSignaturePad() {
        const pad = document.getElementById('signaturePad').ej2_instances[0];
        if (pad) {
            pad.clear();
        }
    }

    function submitSignature() {
        const pad = document.getElementById('signaturePad').ej2_instances[0];
        const signerName = document.getElementById('signerName').value;
        const signerDate = document.getElementById('signerDate').value;

        if (!signerName) {
            alert('Please enter your name');
            return;
        }

        if (!signerDate) {
            alert('Please select a date');
            return;
        }

        const signatureData = pad.getSignature();
        if (!signatureData) {
            alert('Please sign the document');
            return;
        }

        // Save signature
        fetch('/Signature/SaveSignature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                documentName: 'Service Agreement',
                signatureData: signatureData,
                signerName: signerName,
                signerDate: signerDate
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Document signed successfully!');
                // Redirect to confirmation page
                window.location.href = '/Signature/Confirmation?id=' + data.id;
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving');
        });
    }

    // Set default date to today
    document.addEventListener('DOMContentLoaded', function() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('signerDate').value = today;
    });
</script>
```

---

## See Also

- `signature-accessibility.md` — WCAG compliance and keyboard support
- `signature-user-interaction.md` — Drawing mechanics and events
- `signature-open-save.md` — Loading and exporting signatures
- `signature-toolbar-integration.md` — Undo/redo and toolbar
- `signature-customization.md` — Styling and appearance
- `signature-api.md` — Complete API reference
