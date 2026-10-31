# Accessibility – ASP.NET Core DropDownButton

## Semantic HTML & ARIA

Dropdown buttons require proper ARIA attributes for screen reader support:

```cshtml
<ejs-dropdownbutton 
    id="editBtn"
    content="Edit"
    items="items"
    htmlAttributes="@new { 
        aria_label = 'Edit document options',
        aria_haspopup = 'true'
    }">
</ejs-dropdownbutton>
```

---

## Keyboard Navigation

Dropdown buttons support:
- **Tab** — Navigate to button
- **Enter/Space** — Open dropdown menu
- **Arrow Keys** — Navigate menu items
- **Enter** — Select menu item
- **Escape** — Close dropdown menu

---

## ARIA Attributes

### aria-label

Provide descriptive label for the button:

```cshtml
<ejs-dropdownbutton 
    id="formatBtn"
    content="Format"
    items="items"
    htmlAttributes="@new { aria_label = 'Text formatting options' }">
</ejs-dropdownbutton>
```

### aria-haspopup

Indicates the button opens a menu:

```cshtml
<ejs-dropdownbutton 
    id="moreBtn"
    content="More"
    items="items"
    htmlAttributes="@new { aria_haspopup = 'true' }">
</ejs-dropdownbutton>
```

### aria-expanded

Automatically managed by Syncfusion component (indicates if dropdown is open/closed).

---

## Menu Item Accessibility

Ensure menu items are properly structured:

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { 
        text = "Cut",
        iconCss = "e-icons e-cut-icon",
        title = "Cut selected text (Ctrl+X)"
    });
    items.Add(new { 
        text = "Copy",
        iconCss = "e-icons e-copy-icon",
        title = "Copy selected text (Ctrl+C)"
    });
    items.Add(new { 
        text = "Paste",
        iconCss = "e-icons e-paste-icon",
        title = "Paste from clipboard (Ctrl+V)"
    });
}

<ejs-dropdownbutton 
    id="editBtn"
    content="Edit"
    items="items"
    htmlAttributes="@new { 
        aria_label = 'Edit options',
        aria_haspopup = 'true'
    }">
</ejs-dropdownbutton>
```

---

## Disabled Items

Mark disabled items with `aria-disabled`:

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Save", disabled = false });
    items.Add(new { text = "Delete", disabled = true });
    items.Add(new { text = "Archive", disabled = false });
}
```

---

## Complete Accessible Example

```cshtml
@{
    List<object> fileActions = new List<object>();
    fileActions.Add(new { 
        text = "Save",
        iconCss = "e-icons e-save-icon",
        title = "Save file (Ctrl+S)"
    });
    fileActions.Add(new { 
        text = "Save As",
        iconCss = "e-icons e-save-icon",
        title = "Save file with new name"
    });
    fileActions.Add(new { separator = true });
    fileActions.Add(new { 
        text = "Delete",
        iconCss = "e-icons e-delete-icon",
        title = "Delete file"
    });
}

<div role="toolbar">
    <ejs-dropdownbutton 
        id="fileBtn"
        content="File"
        items="fileActions"
        htmlAttributes="@new { 
            aria_label = 'File operations',
            aria_haspopup = 'true'
        }">
    </ejs-dropdownbutton>
</div>

<style>
    [aria-expanded="true"] {
        background-color: #f0f0f0;
    }
</style>
```

---

## See Also

- [DropDownButton Getting Started](dropdownbutton-getting-started.md)
- [DropDownButton Popup Items](dropdownbutton-popup-items.md)
- [DropDownButton Events and Interactivity](dropdownbutton-events-and-interactivity.md)
