---
name: node-editing
description: Enable TreeView node inline editing with validation, events, custom templates, and programmatic control.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Node Editing

## Table of Contents

- [Overview](#overview)
- [Enabling Node Editing](#enabling-node-editing)
- [Edit Mode Activation](#edit-mode-activation)
- [Inline Editing](#inline-editing)
- [Editing Events](#editing-events)
- [Edit Validation](#edit-validation)
- [Programmatic Edit](#programmatic-edit)
- [Edit Templates](#edit-templates)
- [Focus and Navigation](#focus-and-navigation)
- [Edit Restrictions](#edit-restrictions)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView editing features:
- **Inline Editing**: Click to edit node text
- **Activation**: Double-click, single-click, or programmatic
- **Validation**: Validate input before save
- **Events**: Fire before, during, and after edit
- **Templates**: Custom edit UI
- **Restrictions**: Prevent editing specific nodes

## Enabling Node Editing

### Basic Inline Editing

**C# (TreeViewController.cs)**:
```csharp
public IActionResult BasicEditing()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Editable Item 1" 
    });
    treeData.Add(new { 
        id = 2, 
        name = "Editable Item 2" 
    });
    treeData.Add(new { 
        id = 3, 
        name = "Editable Item 3" 
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeEdit" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<!-- Help text -->
<div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
    <strong>Edit Instructions:</strong> Double-click on a node to edit
</div>
```

### Enable with Checkboxes

**Razor View**:
```html
<ejs-treeview id="treeEditCheckbox" allowEditing="true" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

## Edit Mode Activation

### Edit on Double-Click (Default)

**Razor View**:
```html
<ejs-treeview id="treeDoubleClickEdit" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

### Edit on Single Click

**Razor View**:
```html
<ejs-treeview id="treeSingleClickEdit" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

## Inline Editing

### Basic Inline Text Edit

**Razor View**:
```html
<ejs-treeview id="treeInlineEdit" allowEditing="true" nodeEdited="onNodeEdited">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<div id="editLog" style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
    <strong>Edit Log:</strong>
    <div id="log"></div>
</div>

<script>
    function onNodeEdited(args) {
        var log = document.getElementById('log');
        var entry = document.createElement('div');
        entry.textContent = 'Changed "' + args.oldText + '" to "' + args.newText + '"';
        log.appendChild(entry);
    }
</script>
```

### Save Edit to Server

**Razor View**:
```html
<ejs-treeview id="treeSaveEdit" allowEditing="true" nodeEdited="saveNodeEdit">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function saveNodeEdit(args) {
        var nodeId = parseInt(args.node.getAttribute('data-uid'));
        var newText = args.newText;
        
        fetch('/TreeView/UpdateNodeText', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nodeId: nodeId,
                text: newText
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            console.log('Node text saved');
        })
        .catch(function(error) {
            console.error('Save failed:', error);
            args.cancel = true;  // Revert edit
        });
    }
</script>
```

## Editing Events

### Node Editing Event (Before)

**Razor View**:
```html
<ejs-treeview id="treeEditing" allowEditing="true" nodeEditing="onNodeEditing">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeEditing(args) {
        console.log('Editing node:', args.nodeData.name);
        console.log('Current text:', args.currentText);
        
        // Can cancel edit
        if (args.nodeData.id === 2) {
            args.cancel = true;
            console.log('Edit not allowed for this node');
        }
    }
</script>
```

### Node Edited Event (After)

**Razor View**:
```html
<ejs-treeview id="treeEdited" allowEditing="true" nodeEdited="onNodeEdited">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeEdited(args) {
        console.log('Old text:', args.oldText);
        console.log('New text:', args.newText);
        console.log('Node data:', args.nodeData);
    }
</script>
```

### Event Arguments Reference

**Reference**:
```html
<script>
    function onNodeEditing(args) {
        console.log('cancel:', args.cancel);                // Can cancel edit
        console.log('currentText:', args.currentText);      // Original text
        console.log('node:', args.node);                    // HTMLElement
        console.log('nodeData:', args.nodeData);            // Node data
    }
</script>
```

## Edit Validation

### Validate Text Length

**Razor View**:
```html
<ejs-treeview id="treeValidate" allowEditing="true" nodeEditing="validateEditLength">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function validateEditLength(args) {
        // Edit input box is in args.currentText
        var maxLength = 20;
        
        if (args.currentText && args.currentText.length > maxLength) {
            args.cancel = true;
            alert('Text must be ' + maxLength + ' characters or less');
        }
    }
</script>
```

### Validate with Regex

**Razor View**:
```html
<ejs-treeview id="treeRegexValidate" allowEditing="true" nodeEditing="validatePattern">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function validatePattern(args) {
        // Allow only alphanumeric and spaces
        var pattern = /^[a-zA-Z0-9 ]*$/;
        
        if (args.currentText && !pattern.test(args.currentText)) {
            args.cancel = true;
            alert('Only alphanumeric characters and spaces allowed');
        }
    }
</script>
```

### Prevent Empty Edit

**Razor View**:
```html
<ejs-treeview id="treePreventEmpty" allowEditing="true" nodeEditing="validateNotEmpty">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function validateNotEmpty(args) {
        if (!args.currentText || args.currentText.trim() === '') {
            args.cancel = true;
            alert('Node text cannot be empty');
        }
    }
</script>
```

## Programmatic Edit

### Programmatically Enter Edit Mode

**Razor View**:
```html
<button onclick="editNode(1)">Edit Node 1</button>

<ejs-treeview id="treeProgramEdit" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function editNode(nodeId) {
        var treeObj = document.getElementById('treeProgramEdit').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        
        if (nodeElement) {
            treeObj.beginEdit(nodeElement);
        }
    }
</script>
```

### Save Edit Programmatically

**Razor View**:
```html
<button onclick="saveCurrentEdit()">Save Edit</button>
<button onclick="cancelCurrentEdit()">Cancel Edit</button>

<ejs-treeview id="treeProgSave" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function saveCurrentEdit() {
        var treeObj = document.getElementById('treeProgSave').ej2_instances[0];
        var editedElement = treeObj.element.querySelector('.e-node-edit-focus');
        
        if (editedElement) {
            treeObj.endEdit();
        }
    }
    
    function cancelCurrentEdit() {
        var treeObj = document.getElementById('treeProgSave').ej2_instances[0];
        // Cancel by pressing Escape in the edit input
        var editInput = treeObj.element.querySelector('.e-node-edit');
        if (editInput) {
            var event = new KeyboardEvent('keydown', { key: 'Escape' });
            editInput.dispatchEvent(event);
        }
    }
</script>
```

## Edit Templates

### Custom Edit UI with TextBox

**Razor View**:
```html
<ejs-treeview id="treeTemplate" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
    <e-treeview-templates>
        <e-template>
            <div class="e-node-edit-wrapper">
                <input class="e-edit-input" type="text" />
            </div>
        </e-template>
    </e-treeview-templates>
</ejs-treeview>
```

### Template with Validation Feedback

**Razor View**:
```html
<ejs-treeview id="treeValidTemplate" allowEditing="true" nodeEditing="setupEditValidation">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function setupEditValidation(args) {
        var editInput = args.node.querySelector('.e-edit-input');
        if (editInput) {
            editInput.addEventListener('input', function() {
                if (this.value.length > 20) {
                    this.classList.add('e-error');
                } else {
                    this.classList.remove('e-error');
                }
            });
        }
    }
</script>

<style>
    .e-edit-input.e-error {
        border: 2px solid red;
    }
</style>
```

## Focus and Navigation

### Auto-Focus Edit Input

**Razor View**:
```html
<ejs-treeview id="treeAutoFocus" allowEditing="true" nodeEditing="autoFocusEdit">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function autoFocusEdit(args) {
        var editInput = args.node.querySelector('.e-edit-input');
        if (editInput) {
            editInput.focus();
            editInput.select();  // Select all text
        }
    }
</script>
```

## Edit Restrictions

### Prevent Editing Specific Nodes

**C# (TreeViewController.cs)**:
```csharp
public IActionResult EditRestrictions()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Editable", editable = true });
    treeData.Add(new { id = 2, name = "Read-only", editable = false });
    treeData.Add(new { id = 3, name = "Editable", editable = true });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeRestricted" allowEditing="true" nodeEditing="checkEditable">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function checkEditable(args) {
        if (!args.nodeData.editable) {
            args.cancel = true;
        }
    }
</script>
```

### Prevent Parent Node Editing

**Razor View**:
```html
<ejs-treeview id="treeParentOnly" allowEditing="true" nodeEditing="preventParentEdit">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function preventParentEdit(args) {
        // Only allow editing leaf nodes (no children)
        if (args.nodeData.hasChild) {
            args.cancel = true;
            alert('Cannot edit parent nodes');
        }
    }
</script>
```

## Advanced Patterns

### Pattern: Edit with Confirmation

**Razor View**:
```html
<ejs-treeview id="treeConfirm" allowEditing="true" nodeEdited="confirmEdit">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function confirmEdit(args) {
        if (confirm('Save changes to "' + args.newText + '"?')) {
            saveNodeEdit(args);
        } else {
            // Revert - user can use undo
            alert('Edit cancelled');
        }
    }
    
    function saveNodeEdit(args) {
        console.log('Changes saved to', args.newText);
    }
</script>
```

### Pattern: Edit History

**Razor View**:
```html
<button onclick="showHistory()">Show History</button>
<div id="history" style="margin-top: 20px; padding: 10px; background: #efefef;"></div>

<ejs-treeview id="treeHistory" allowEditing="true" nodeEdited="recordHistory">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var editHistory = [];
    
    function recordHistory(args) {
        editHistory.push({
            nodeId: parseInt(args.node.getAttribute('data-uid')),
            oldText: args.oldText,
            newText: args.newText,
            timestamp: new Date().toLocaleTimeString()
        });
    }
    
    function showHistory() {
        var historyDiv = document.getElementById('history');
        historyDiv.innerHTML = '<strong>Edit History:</strong>';
        
        editHistory.forEach(function(entry) {
            var item = document.createElement('div');
            item.textContent = entry.timestamp + ': "' + entry.oldText + '" → "' + entry.newText + '"';
            historyDiv.appendChild(item);
        });
    }
</script>
```

## Troubleshooting

### Issue: Edit Mode Not Activating

**Problem**: Double-click doesn't enter edit mode

**Solutions**:
1. Verify `allowEditing="true"` is set
2. Check `editSettings` configuration
3. Ensure node is not restricted with `editable="false"`
4. Check browser console for errors

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('allowEditing:', treeObj.allowEditing);
    console.log('editSettings:', treeObj.editSettings);
</script>
```

### Issue: Edit Text Not Saving

**Problem**: Changes revert after edit

**Solutions**:
1. Check nodeEdited event is firing
2. Verify server save endpoint works
3. Check for validation errors
4. Look for args.cancel = true in events

---

**Next Steps**: Explore related features:
- [Node Manipulation](node-manipulation.md) - Edit via API
- [Templates and Styling](templates-and-styling.md) - Custom edit UI
- [Node Selection](node-selection.md) - Select to edit
