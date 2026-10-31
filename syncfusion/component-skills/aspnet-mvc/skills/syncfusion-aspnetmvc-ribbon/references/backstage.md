# Backstage View — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Overview](#overview)
- [Basic Backstage Setup](#basic-backstage-setup)
- [Adding Footer Items](#adding-footer-items)
- [Adding Separators](#adding-separators)
- [Back Button](#back-button)
- [Backstage Target](#backstage-target)
- [Custom Template](#custom-template)
- [Setting Width and Height](#setting-width-and-height)
- [Backstage Item Click Event](#backstage-item-click-event)

---

## Overview

The backstage view is a full-panel overlay (similar to the Office "File" menu backstage) that shows application-level settings, user info, recent documents, etc. It is configured via `BackStageMenu` on the ribbon.

- Items list appears on the **left**
- Content for the selected item appears on the **right**

---

## Basic Backstage Setup

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<BackstageItem> backstageItems = new List<BackstageItem>() {
        new BackstageItem { Id = "home", Text = "Home", IconCss = "e-icons e-home", Content = HomeContent() },
        new BackstageItem { Id = "new", Text = "New", IconCss = "e-icons e-file-new", Content = NewContent() },
        new BackstageItem { Id = "open", Text = "Open", IconCss = "e-icons e-folder-open", Content = OpenContent() }
    };
    BackStageMenu backstageSettings = new BackStageMenu() {
        Text = "File",
        Visible = true,
        BackButton = new BackstageBackButton { Text = "Close" },
        Items = backstageItems
    };
}

@Html.EJS().Ribbon("ribbon").BackStageMenu(backstageSettings).Tabs(tab =>
{
    tab.Header("Home").Groups(group =>
    {
        group.Header("Clipboard").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-paste").Content("Paste");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()

@functions {
    string HomeContent() {
        return "<div style='padding:20px'><div class='section-title'>New</div>" +
               "<div class='category_container'><div class='doc_category_image'></div>" +
               "<span class='doc_category_text'>New document</span></div>" +
               "<div class='section-title'>Recent</div>" +
               "<div class='section-content'><table><tbody><tr>" +
               "<td><span class='e-icons e-open-link'></span></td>" +
               "<td><span style='display:block;font-size:14px'>Ribbon.docx</span>" +
               "<span style='font-size:12px'>EJ2 >> Navigations >> Ribbon</span></td>" +
               "</tr></tbody></table></div></div>";
    }
    string NewContent() {
        return "<div style='padding:20px'><div class='section-title'>New</div>" +
               "<div class='category_container'><div class='doc_category_image'></div>" +
               "<span class='doc_category_text'>New document</span></div></div>";
    }
    string OpenContent() {
        return "<div style='padding:20px'>" +
               "<div class='section-content'><table><tbody><tr>" +
               "<td><span class='e-icons e-open-link'></span></td>" +
               "<td><span style='display:block;font-size:14px'>Open in Desktop App</span>" +
               "<span style='font-size:12px'>Use the full functionality of Ribbon</span></td>" +
               "</tr></tbody></table></div></div>";
    }
}

<style>
    .e-ribbon-backstage-content { width: 500px; height: 350px; }
    .section-title { font-size: 22px; }
    .category_container { width: 150px; padding: 15px; text-align: center; cursor: pointer; }
    .doc_category_image { width: 80px; height: 100px; background-color: #fff; border: 1px solid #7d7c7c; margin: 0 auto 10px; }
    .doc_category_text { font-size: 16px; }
    .section-content { padding: 12px 0; cursor: pointer; }
    .category_container:hover, .section-content:hover { background-color: #dfdfdf; border-radius: 5px; transition: all 0.3s; }
</style>
```

**Key `BackStageMenu` properties:**

| Property | Type | Description |
|---|---|---|
| `Text` | string | Label for the backstage trigger button (e.g., `"File"`) |
| `Visible` | bool | Show the backstage button; default `false` |
| `BackButton` | `BackstageBackButton` | Configure the close/back button |
| `Items` | `List<BackstageItem>` | Menu items list |
| `Target` | string | CSS selector for the container element |
| `Template` | string | JS template selector for full custom rendering |
| `Height` | string | CSS height of backstage panel |
| `Width` | string | CSS width of backstage panel |
| `HeaderHeight` | string | CSS height of the header area (controls the height of the section titles and back button) |
| `AutoClose` | bool | If `true`, closes backstage when an item is clicked; default `false` |

---

## Auto-Close Behavior

By default, clicking a backstage item does NOT close the backstage view. Set `AutoClose = true` to close it automatically:

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    AutoClose = true,  // Close backstage when user clicks an item
    BackButton = new BackstageBackButton { Text = "Close" },
    Items = backstageItems
};
```

---

## Header Height Customization

Adjust the header area height (where the back button and title sit) independently of the content area:

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    HeaderHeight = "60px",  // Larger header
    Height = "400px",
    Width = "550px",
    BackButton = new BackstageBackButton { Text = "Close" },
    Items = backstageItems
};
```

---

## Adding Footer Items

Footer items appear pinned at the bottom of the items list. Use `IsFooter = true` on a `BackstageItem`.

```cshtml
List<BackstageItem> backstageItems = new List<BackstageItem>() {
    new BackstageItem { Id = "home", Text = "Home", IconCss = "e-icons e-home", Content = HomeContent() },
    new BackstageItem { Id = "new",  Text = "New",  IconCss = "e-icons e-file-new", Content = NewContent() },
    // Separator before footer
    new BackstageItem { Separator = true, IsFooter = true },
    // Footer item
    new BackstageItem { Text = "Account", IsFooter = true, Content = AccountContent() }
};
```

---

## Adding Separators

Separators are horizontal rules between items. Set `Separator = true` on a `BackstageItem`.

```cshtml
List<BackstageItem> backstageItems = new List<BackstageItem>() {
    new BackstageItem { Id = "home",  Text = "Home",  IconCss = "e-icons e-home",        Content = HomeContent() },
    new BackstageItem { Id = "new",   Text = "New",   IconCss = "e-icons e-file-new",    Content = NewContent() },
    new BackstageItem { Id = "open",  Text = "Open",  IconCss = "e-icons e-folder-open", Content = OpenContent() },
    new BackstageItem { Separator = true },   // separator line
    new BackstageItem { Text = "Print", Content = PrintContent() }
};
```

---

## Back Button

The back button (top of the items list) closes the backstage view.

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    BackButton = new BackstageBackButton {
        Text = "Close",           // button label
        IconCss = "e-icons e-close", // optional icon
        Visible = true            // show the button; default true
    },
    Items = backstageItems
};
```

---

## Backstage Target

By default, the backstage overlays the ribbon element. Use `Target` to render it inside a specific container instead. The target element must have `position: relative`.

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    Target = "#targetElement",
    BackButton = new BackstageBackButton { Text = "Close" },
    Items = backstageItems
};

<div id="targetElement" style="position: relative; width: 700px; height: 500px;"></div>
@Html.EJS().Ribbon("ribbon").BackStageMenu(backstageSettings).Tabs(...).Render()
```

---

## Custom Template

Use `Template` to replace the entire backstage layout (both the left nav and the right content area) with a custom HTML template.

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Text = "File",
    Visible = true,
    BackButton = new BackstageBackButton { Text = "Close" },
    Template = "#templateContent"
};

@Html.EJS().Ribbon("ribbon").BackStageMenu(backstageSettings).Created("ribbonCreated").Tabs(...).Render()

<script type="text/x-jsrender" id="templateContent">
    <div id="temp-content" style="width:550px;height:350px;display:flex">
        <div id="items-wrapper" style="width:130px;background:#779de8;">
            <ul>
                <li id="close" onclick="closeContent()"><span class="e-icons e-close"></span> Close</li>
                <li id="new"  onclick="contentClick(this.id)"><span class="e-icons e-file-new"></span> New</li>
                <li id="open" onclick="contentClick(this.id)"><span class="e-icons e-folder-open"></span> Open</li>
            </ul>
        </div>
        <div id="content-wrapper">
            <div id="new-wrapper"  class="content-open"  style="padding:20px;"><!-- New content --></div>
            <div id="open-wrapper" class="content-close" style="padding:20px;"><!-- Open content --></div>
        </div>
    </div>
</script>

<script>
    function contentClick(id) {
        var ribbonEle = document.getElementById('ribbon');
        var open = ribbonEle.querySelector('.content-open');
        if (open) open.classList.replace('content-open', 'content-close');
        ribbonEle.querySelector('#' + id + '-wrapper').classList.add('content-open');
    }
    function closeContent() {
        document.getElementById('ribbon').querySelector('#ribbon_backstagepopup').style.display = 'none';
    }
    function ribbonCreated() {
        var ribbon = this;
        ribbon.element.querySelector('.e-ribbon-backstage').addEventListener('click', function() {
            ribbon.element.querySelector('#ribbon_backstagepopup').style.display = 'block';
        });
    }
</script>
<style>
    #content-wrapper .content-close { display: none; }
    #content-wrapper .content-open  { display: block; }
</style>
```

---

## Setting Width and Height

Customize backstage panel dimensions (default is based on content):

```cshtml
BackStageMenu backstageSettings = new BackStageMenu() {
    Height = "350px",
    Width = "500px",
    Text = "File",
    Visible = true,
    BackButton = new BackstageBackButton { Text = "Close" },
    Items = backstageItems
};
```

---

## Backstage Item Click Event

Use `BackStageItemClick` on a `BackstageItem` to handle selection:

```cshtml
new BackstageItem {
    Id = "home",
    Text = "Home",
    IconCss = "e-icons e-home",
    Content = HomeContent(),
    BackStageItemClick = "function(args){ backStageItemClickEvent(args) }"
}
```

```javascript
function backStageItemClickEvent(args) {
    // args contains the clicked item details
}
```
