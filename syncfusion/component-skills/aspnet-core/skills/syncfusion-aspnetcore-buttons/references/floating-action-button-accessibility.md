# Accessibility – ASP.NET Core Floating Action Button

## Semantic HTML & ARIA

Floating action buttons require proper ARIA attributes for screen reader support:

```cshtml
<ejs-fab 
    id="fab"
    content="+"
    cssClass="e-primary"
    htmlAttributes="@new { 
        aria_label = 'Create new document'
    }">
</ejs-fab>
```

---

## Icon-Only Button Labels

When FAB contains only an icon, provide descriptive aria-label:

**✓ CORRECT:**
```cshtml
<ejs-fab 
    id="addBtn"
    iconCss="e-icons e-plus"
    cssClass="e-primary"
    htmlAttributes="@new { aria_label = 'Add new item' }">
</ejs-fab>
```

**✗ INCORRECT:**
```cshtml
<ejs-fab 
    id="addBtn"
    iconCss="e-icons e-plus"
    cssClass="e-primary">
</ejs-fab>
```

---

## Icon + Text Combination

When FAB has both icon and text, label is more discoverable:

```cshtml
<ejs-fab 
    id="fab"
    content="Create"
    iconCss="e-icons e-plus"
    cssClass="e-primary"
    htmlAttributes="@new { aria_label = 'Create new item' }">
</ejs-fab>
```

---

## Keyboard Navigation

Floating action buttons support:
- **Tab** — Navigate to FAB
- **Enter/Space** — Activate button action
- **Escape** — (if tooltip/menu present) Close popup

---

## Focus Management

```cshtml
<ejs-fab 
    id="fab"
    content="Help"
    iconCss="e-icons e-question-icon"
    htmlAttributes="@new { 
        aria_label = 'Get help',
        tabindex = '0'
    }">
</ejs-fab>

<style>
    .e-fab:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## Disabled State

```cshtml
<ejs-fab 
    id="fab"
    content="Save"
    disabled="true"
    htmlAttributes="@new { 
        aria_label = 'Save changes (disabled)',
        aria_disabled = 'true'
    }">
</ejs-fab>
```

---

## Common FAB Actions with Proper Labels

```cshtml
@{
    Dictionary<string, object> fabAttrs = new Dictionary<string, object>();
}

<!-- Compose Email -->
<ejs-fab 
    id="composeBtn"
    iconCss="e-icons e-mail-icon"
    cssClass="e-primary"
    onclick="openComposer()"
    htmlAttributes="@new { aria_label = 'Compose new email' }">
</ejs-fab>

<!-- Start Call -->
<ejs-fab 
    id="callBtn"
    iconCss="e-icons e-call-icon"
    cssClass="e-success"
    onclick="startCall()"
    htmlAttributes="@new { aria_label = 'Start new call' }">
</ejs-fab>

<!-- Chat -->
<ejs-fab 
    id="chatBtn"
    iconCss="e-icons e-chat-icon"
    cssClass="e-info"
    onclick="openChat()"
    htmlAttributes="@new { aria_label = 'Open chat' }">
</ejs-fab>

<!-- Edit -->
<ejs-fab 
    id="editBtn"
    iconCss="e-icons e-edit-icon"
    cssClass="e-warning"
    onclick="startEdit()"
    htmlAttributes="@new { aria_label = 'Edit content' }">
</ejs-fab>

<!-- Delete -->
<ejs-fab 
    id="deleteBtn"
    iconCss="e-icons e-delete-icon"
    cssClass="e-danger"
    onclick="confirmDelete()"
    htmlAttributes="@new { aria_label = 'Delete item (opens confirmation)' }">
</ejs-fab>
```

---

## Tooltip as Secondary Label

```cshtml
<ejs-fab 
    id="fab"
    iconCss="e-icons e-search-icon"
    htmlAttributes="@new { 
        aria_label = 'Search',
        title = 'Press Ctrl+F to search'
    }">
</ejs-fab>
```

---

## Complete Accessible Example

```cshtml
<style>
    .fab-container {
        position: relative;
        height: 500px;
        border: 1px solid #ddd;
    }
</style>

<div class="fab-container">
    <h2>Document Editor</h2>
    <p>Use the action button to create new content.</p>
    
    <ejs-fab 
        id="newDocBtn"
        iconCss="e-icons e-plus"
        cssClass="e-primary"
        position="BottomRight"
        target=".fab-container"
        onclick="createNewDocument()"
        htmlAttributes="@new { 
            aria_label = 'Create new document',
            aria_describedby = 'fab-help'
        }">
    </ejs-fab>
    
    <div id="fab-help" style="display: none;">
        Click the plus button to create a new document. You can also press Alt+N.
    </div>
</div>

<script>
    function createNewDocument() {
        alert('New document created');
    }
</script>
```

---

## See Also

- [Floating Action Button Getting Started](floating-action-button-getting-started.md)
- [Floating Action Button Positions](floating-action-button-positions.md)
- [Floating Action Button Icons](floating-action-button-icons.md)
- [Floating Action Button Styles](floating-action-button-styles.md)
