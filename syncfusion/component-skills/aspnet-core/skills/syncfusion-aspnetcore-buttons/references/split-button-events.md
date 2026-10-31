# Events – ASP.NET Core SplitButton

## Table of Contents
- [Event Overview](#event-overview)
- [click](#click)
- [select](#select)
- [beforeOpen](#beforeopen)
- [open](#open)
- [beforeClose](#beforeclose)
- [close](#close)
- [beforeItemRender](#beforeitemrender)
- [created](#created)
- [Combining Multiple Events](#combining-multiple-events)

---

## Event Overview

| Event | Trigger moment |
|-------|---------------|
| `click` | Primary button of SplitButton is clicked |
| `select` | A popup action item is selected |
| `beforeOpen` | Before the popup opens |
| `open` | After the popup opens |
| `beforeClose` | Before the popup closes |
| `close` | After the popup closes |
| `beforeItemRender` | While rendering each popup action item |
| `created` | Once the component has finished rendering |

Assign event handlers as JavaScript function names in the tag helper attributes.

---

## click

Fires when the **primary button** (left part) is clicked. Use this to trigger the default action.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    click="onPrimaryClick"></ejs-splitbutton>

<script>
    function onPrimaryClick(args) {
        // args.element – the button DOM element
        console.log('Primary action triggered');
    }
</script>
```

---

## select

Fires when a **popup item is selected** (clicked or activated via keyboard). Inspect `args.item` to determine which item was chosen.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    select="onItemSelect"></ejs-splitbutton>

<script>
    function onItemSelect(args) {
        // args.item.text  – text of selected item
        // args.item.id    – id of selected item (if set)
        switch (args.item.text) {
            case 'Cut':   performCut();   break;
            case 'Copy':  performCopy();  break;
            case 'Paste': performPaste(); break;
        }
    }
</script>
```

---

## beforeOpen

Fires **before the popup opens**. Use it to modify items or cancel the open action.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeOpen="onBeforeOpen"></ejs-splitbutton>

<script>
    function onBeforeOpen(args) {
        // args.cancel = true; // uncomment to prevent popup from opening
        console.log('Popup is about to open');
    }
</script>
```

---

## open

Fires **after the popup has opened**.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    open="onPopupOpen"></ejs-splitbutton>

<script>
    function onPopupOpen(args) {
        console.log('Popup opened');
    }
</script>
```

---

## beforeClose

Fires **before the popup closes**. Can be used to cancel the close action.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeClose="onBeforeClose"></ejs-splitbutton>

<script>
    function onBeforeClose(args) {
        // args.cancel = true; // uncomment to keep popup open
        console.log('Popup is about to close');
    }
</script>
```

---

## close

Fires **after the popup has closed**.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    close="onPopupClose"></ejs-splitbutton>

<script>
    function onPopupClose(args) {
        console.log('Popup closed');
    }
</script>
```

---

## beforeItemRender

Fires **while rendering each popup item**. Use it to customize item appearance, add custom HTML, badges, or modify attributes before the item is inserted into the DOM.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    beforeItemRender="onBeforeItemRender"></ejs-splitbutton>

<script>
    function onBeforeItemRender(args) {
        // args.item    – item data object
        // args.element – the rendered <li> element
        if (args.item.text === 'Cut') {
            args.element.style.color = 'red';
        }
    }
</script>
```

---

## created

Fires **once after the SplitButton component is fully rendered**. Use it for post-initialization logic.

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    created="onCreated"></ejs-splitbutton>

<script>
    function onCreated() {
        console.log('SplitButton component is ready');
    }
</script>
```

---

## Combining Multiple Events

Assign multiple events on a single SplitButton:

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    click="onPrimaryClick"
    select="onItemSelect"
    beforeOpen="onBeforeOpen"
    open="onPopupOpen"
    beforeClose="onBeforeClose"
    close="onPopupClose"
    beforeItemRender="onBeforeItemRender"
    created="onCreated">
</ejs-splitbutton>
```
