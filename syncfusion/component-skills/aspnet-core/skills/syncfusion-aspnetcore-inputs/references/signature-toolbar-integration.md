# Signature Toolbar Integration — ASP.NET Core

This reference covers integrating the Syncfusion ASP.NET Core Signature control with the Toolbar component for a rich editing interface.

## Table of Contents
- [Overview](#overview)
- [Wiring Undo, Redo, and Clear](#wiring-undo-redo-and-clear)
- [Save Button Integration](#save-button-integration)
- [Stroke Color Picker](#stroke-color-picker)
- [Background Color Picker](#background-color-picker)
- [Stroke Width Dropdown](#stroke-width-dropdown)
- [Full Toolbar Example](#full-toolbar-example)

---

## Overview

Integrate `<ejs-signature>` with `<ejs-toolbar>` to provide a rich editing interface. The Signature's `change` event drives toolbar button state — enabling/disabling undo, redo, clear, and save based on the current signature state.

**Key pattern:**
- Call `canUndo()`, `canRedo()`, and `isEmpty()` inside the `change` handler to update button states.
- Use button `click` events to dispatch actions to the Signature component.

---

## Wiring Undo, Redo, and Clear

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons
@using Syncfusion.EJ2.Navigations

<div>
    <ejs-toolbar id="signatureToolbar">
        <e-toolbar-items>
            <e-toolbar-item text="Undo" 
                            prefixIcon="e-icons e-undo" 
                            tooltipText="Undo (Ctrl + Z)">
            </e-toolbar-item>
            <e-toolbar-item text="Redo" 
                            prefixIcon="e-icons e-redo" 
                            tooltipText="Redo (Ctrl + Y)">
            </e-toolbar-item>
            <e-toolbar-item text="Clear" 
                            prefixIcon="e-sign-icons e-clear" 
                            tooltipText="Clear">
            </e-toolbar-item>
        </e-toolbar-items>
    </ejs-toolbar>
    
    <ejs-signature id="signature" change="onChange"></ejs-signature>
</div>

<script>
    var toolbar = document.getElementById('signatureToolbar').ej2_instances[0];

    toolbar.clicked = function (args) {
        var signature = document.getElementById("signature").ej2_instances[0];
        
        if (args.item.tooltipText === 'Undo (Ctrl + Z)') {
            if (signature.canUndo()) signature.undo();
        } else if (args.item.tooltipText === 'Redo (Ctrl + Y)') {
            if (signature.canRedo()) signature.redo();
        } else if (args.item.tooltipText === 'Clear') {
            signature.clear();
        }
    };

    function onChange() {
        var signature = document.getElementById("signature").ej2_instances[0];
        // Update toolbar item state based on signature
        // (e.g., enable/disable buttons)
    }
</script>
```

---

## Save Button Integration

Use a `<ejs-splitbutton>` to let users choose the save format (PNG, JPEG, SVG):

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons
@using Syncfusion.EJ2.SplitButtons

<ejs-toolbar id="saveToolbar">
    <e-toolbar-items>
        <e-toolbar-item>
            <e-content-template>
                <ejs-splitbutton id="saveBtn" 
                                 content="Save" 
                                 iconCss="e-icons e-save"
                                 items="ViewBag.saveItems">
                </ejs-splitbutton>
            </e-content-template>
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<ejs-signature id="signature"></ejs-signature>

<script>
    var saveBtn = document.getElementById('saveBtn').ej2_instances[0];
    
    saveBtn.select = function (args) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.save(args.item.text, 'Signature');
    };
</script>
```

**Controller (Controllers/SignatureController.cs):**
```csharp
using Microsoft.AspNetCore.Mvc;

public class SignatureController : Controller
{
    public IActionResult Index()
    {
        ViewBag.saveItems = new[]
        {
            new { text = "Png" },
            new { text = "Jpeg" },
            new { text = "Svg" }
        };
        return View();
    }
}
```

---

## Stroke Color Picker

Add a color picker to the toolbar to change stroke color dynamically:

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons
@using Syncfusion.EJ2.Navigations

<ejs-toolbar id="colorToolbar">
    <e-toolbar-items>
        <e-toolbar-item>
            <e-content-template>
                <input type="color" id="strokeColorPicker" value="#000000" />
            </e-content-template>
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<ejs-signature id="signature" strokeColor="#000000"></ejs-signature>

<script>
    document.getElementById('strokeColorPicker').addEventListener('change', function(e) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.strokeColor = e.target.value;
    });
</script>
```

---

## Background Color Picker

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Navigations

<ejs-toolbar id="bgColorToolbar">
    <e-toolbar-items>
        <e-toolbar-item>
            <e-content-template>
                <input type="color" id="bgColorPicker" value="#ffffff" />
            </e-content-template>
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<ejs-signature id="signature" backgroundColor="#ffffff"></ejs-signature>

<script>
    document.getElementById('bgColorPicker').addEventListener('change', function(e) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.backgroundColor = e.target.value;
    });
</script>
```

---

## Stroke Width Dropdown

Add a dropdown to change stroke width:

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Navigations
@using Syncfusion.EJ2.DropDowns

<ejs-toolbar id="widthToolbar">
    <e-toolbar-items>
        <e-toolbar-item>
            <e-content-template>
                <ejs-dropdownlist id="widthDropdown"
                                  dataSource="ViewBag.widthData"
                                  value="2"
                                  placeholder="Stroke Width">
                </ejs-dropdownlist>
            </e-content-template>
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<ejs-signature id="signature" maxStrokeWidth="2"></ejs-signature>

<script>
    var widthDropdown = document.getElementById('widthDropdown').ej2_instances[0];
    
    widthDropdown.change = function (args) {
        var signature = document.getElementById("signature").ej2_instances[0];
        signature.maxStrokeWidth = parseFloat(args.value);
    };
</script>
```

**Controller (Controllers/SignatureController.cs):**
```csharp
public IActionResult Index()
{
    ViewBag.widthData = new[]
    {
        new { Text = "Thin (1)", Value = "1" },
        new { Text = "Normal (2)", Value = "2" },
        new { Text = "Thick (4)", Value = "4" },
        new { Text = "Bold (6)", Value = "6" }
    };
    return View();
}
```

---

## Full Toolbar Example

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs
@using Syncfusion.EJ2.Buttons
@using Syncfusion.EJ2.Navigations
@using Syncfusion.EJ2.DropDowns
@using Syncfusion.EJ2.SplitButtons

<div class="signature-editor">
    <ejs-toolbar id="signatureToolbar">
        <e-toolbar-items>
            <e-toolbar-item text="Undo" 
                            prefixIcon="e-icons e-undo" 
                            tooltipText="Undo (Ctrl + Z)">
            </e-toolbar-item>
            <e-toolbar-item text="Redo" 
                            prefixIcon="e-icons e-redo" 
                            tooltipText="Redo (Ctrl + Y)">
            </e-toolbar-item>
            <e-toolbar-item text="Clear" 
                            prefixIcon="e-sign-icons e-clear" 
                            tooltipText="Clear">
            </e-toolbar-item>
            <e-toolbar-item>
                <e-content-template>
                    <ejs-dropdownlist id="widthDropdown"
                                      dataSource="ViewBag.widthData"
                                      value="2"
                                      width="120px">
                    </ejs-dropdownlist>
                </e-content-template>
            </e-toolbar-item>
            <e-toolbar-item>
                <e-content-template>
                    <input type="color" id="strokeColorPicker" 
                           value="#000000" title="Stroke Color" />
                </e-content-template>
            </e-toolbar-item>
            <e-toolbar-item>
                <e-content-template>
                    <input type="color" id="bgColorPicker" 
                           value="#ffffff" title="Background Color" />
                </e-content-template>
            </e-toolbar-item>
            <e-toolbar-item>
                <e-content-template>
                    <ejs-splitbutton id="saveBtn" 
                                     content="Save" 
                                     iconCss="e-icons e-save"
                                     items="ViewBag.saveItems">
                    </ejs-splitbutton>
                </e-content-template>
            </e-toolbar-item>
        </e-toolbar-items>
    </ejs-toolbar>
    
    <ejs-signature id="signature" 
                   strokeColor="#000000"
                   backgroundColor="#ffffff"
                   maxStrokeWidth="2"
                   minStrokeWidth="0.5"
                   change="onSignatureChange">
    </ejs-signature>
</div>

<script>
    var toolbar = document.getElementById('signatureToolbar').ej2_instances[0];
    var signature = document.getElementById('signature').ej2_instances[0];
    var widthDropdown = document.getElementById('widthDropdown').ej2_instances[0];
    var saveBtn = document.getElementById('saveBtn').ej2_instances[0];

    // Toolbar button clicks
    toolbar.clicked = function (args) {
        if (args.item.tooltipText === 'Undo (Ctrl + Z)') {
            if (signature.canUndo()) signature.undo();
        } else if (args.item.tooltipText === 'Redo (Ctrl + Y)') {
            if (signature.canRedo()) signature.redo();
        } else if (args.item.tooltipText === 'Clear') {
            signature.clear();
        }
    };

    // Width change
    widthDropdown.change = function (args) {
        signature.maxStrokeWidth = parseFloat(args.value);
    };

    // Color changes
    document.getElementById('strokeColorPicker').addEventListener('change', function(e) {
        signature.strokeColor = e.target.value;
    });

    document.getElementById('bgColorPicker').addEventListener('change', function(e) {
        signature.backgroundColor = e.target.value;
    });

    // Save format
    saveBtn.select = function (args) {
        signature.save(args.item.text, 'Signature');
    };

    // Update toolbar state on signature change
    function onSignatureChange() {
        var undoItem = toolbar.items[0];
        var redoItem = toolbar.items[1];
        var clearItem = toolbar.items[2];

        undoItem.disabled = !signature.canUndo();
        redoItem.disabled = !signature.canRedo();
        clearItem.disabled = signature.isEmpty();
    }
</script>

<style>
    .signature-editor {
        width: 600px;
        margin: 0 auto;
    }
    #signature {
        border: 1px solid lightgray;
        height: 200px;
        width: 100%;
    }
</style>
```

**Controller (Controllers/SignatureController.cs):**
```csharp
using Microsoft.AspNetCore.Mvc;

public class SignatureController : Controller
{
    public IActionResult Index()
    {
        ViewBag.widthData = new[]
        {
            new { Text = "Thin (1)", Value = "1" },
            new { Text = "Normal (2)", Value = "2" },
            new { Text = "Thick (4)", Value = "4" },
            new { Text = "Bold (6)", Value = "6" }
        };
        
        ViewBag.saveItems = new[]
        {
            new { text = "Png" },
            new { text = "Jpeg" },
            new { text = "Svg" }
        };
        
        return View();
    }
}
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-api.md` — Complete API reference
- `signature-customization.md` — Customization options
- `signature-user-interaction.md` — User interaction patterns
- `signature-open-save.md` — Open/Save operations
