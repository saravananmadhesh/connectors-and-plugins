# Accessibility – ASP.NET Core Speed Dial

## Semantic HTML & ARIA

Speed dial menus require proper ARIA attributes for screen reader support:

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Actions"
    items="items"
    target="#container"
    htmlAttributes="@new { 
        aria_label = 'Quick action menu',
        aria_haspopup = 'true',
        aria_expanded = 'false'
    }">
</ejs-speeddial>
```

---

## Keyboard Navigation

Speed dial menus support:
- **Tab** — Navigate to Speed Dial button
- **Enter/Space** — Open Speed Dial menu
- **Arrow Keys** — Navigate menu items
- **Enter** — Select menu item
- **Escape** — Close Speed Dial menu

---

## ARIA Attributes

### aria-label

Provide descriptive label for the button:

```cshtml
<ejs-speeddial 
    id="fab"
    content="+"
    items="items"
    target="#container"
    htmlAttributes="@new { 
        aria_label = 'Document quick actions',
        aria_haspopup = 'true'
    }">
</ejs-speeddial>
```

### aria-expanded

Indicates if the menu is open (automatically managed by Syncfusion):

```javascript
// Auto-managed, but you can check state:
var speedDial = document.getElementById('speeddial').ej2_instances[0];
var isOpen = speedDial.isOpen; // true or false
```

### aria-haspopup

Indicates the button opens a menu:

```cshtml
<ejs-speeddial 
    id="speeddial"
    content="Menu"
    items="items"
    target="#container"
    htmlAttributes="@new { aria_haspopup = 'true' }">
</ejs-speeddial>
```

---

## Menu Item Accessibility

Ensure menu items are properly labeled:

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { 
        text = "Edit",
        iconCss = "e-icons e-edit-icon",
        title = "Edit document"
    });
    items.Add(new { 
        text = "Share",
        iconCss = "e-icons e-share-icon",
        title = "Share with others"
    });
    items.Add(new { 
        text = "Delete",
        iconCss = "e-icons e-delete-icon",
        title = "Delete document"
    });
}

<ejs-speeddial 
    id="docActions"
    content="Actions"
    items="items"
    target="#container"
    htmlAttributes="@new { 
        aria_label = 'Document operations',
        aria_haspopup = 'true'
    }">
</ejs-speeddial>
```

---

## Focus Management

```cshtml
<div id="container" style="position: relative; height: 400px;">
    <ejs-speeddial 
        id="speeddial"
        content="Menu"
        items="items"
        target="#container"
        htmlAttributes="@new { 
            tabindex = '0',
            aria_label = 'Quick actions',
            aria_haspopup = 'true'
        }">
    </ejs-speeddial>
</div>

<style>
    .e-speed-dial:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## Complete Accessible Example

```cshtml
@{
    List<object> actions = new List<object>();
    actions.Add(new { 
        text = "Create",
        iconCss = "e-icons e-plus-icon",
        title = "Create new item"
    });
    actions.Add(new { 
        text = "Edit",
        iconCss = "e-icons e-edit-icon",
        title = "Edit current item"
    });
    actions.Add(new { 
        text = "Delete",
        iconCss = "e-icons e-delete-icon",
        title = "Delete current item"
    });
}

<style>
    .editor-container {
        position: relative;
        height: 500px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 20px;
    }
</style>

<div class="editor-container" id="editorContainer">
    <h2>Document Editor</h2>
    <p>This is your document content. Use the Speed Dial menu for quick actions.</p>
    
    <ejs-speeddial 
        id="editorActions"
        content="Menu"
        items="actions"
        target="#editorContainer"
        mode="Linear"
        direction="Up"
        position="BottomRight"
        htmlAttributes="@new { 
            aria_label = 'Document editor quick actions',
            aria_haspopup = 'true',
            aria_expanded = 'false'
        }">
    </ejs-speeddial>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var speedDial = document.getElementById('editorActions').ej2_instances[0];
    
    // Update aria-expanded when menu opens/closes
    speedDial.beforeOpen = function() {
        document.getElementById('editorActions').setAttribute('aria-expanded', 'true');
    };
    
    speedDial.beforeClose = function() {
        document.getElementById('editorActions').setAttribute('aria-expanded', 'false');
    };
});
</script>
```

---

## Radial vs Linear Accessibility

Both modes are accessible, but linear mode may be easier for screen reader users:

```cshtml
<!-- Linear Mode (Recommended for accessibility) -->
<ejs-speeddial 
    id="linearMenu"
    content="Actions"
    items="items"
    target="#container"
    mode="Linear"
    direction="Up"
    htmlAttributes="@new { 
        aria_label = 'Linear action menu'
    }">
</ejs-speeddial>

<!-- Radial Mode (Requires careful focus management) -->
<ejs-speeddial 
    id="radialMenu"
    content="Actions"
    items="items"
    target="#container"
    mode="Radial"
    htmlAttributes="@new { 
        aria_label = 'Radial action menu'
    }">
</ejs-speeddial>
```

---

## See Also

- [Speed Dial Getting Started](speeddial-getting-started.md)
- [Speed Dial Items](speeddial-items.md)
- [Speed Dial Display Modes](speeddial-display-modes.md)
- [Speed Dial Positions](speeddial-positions.md)
