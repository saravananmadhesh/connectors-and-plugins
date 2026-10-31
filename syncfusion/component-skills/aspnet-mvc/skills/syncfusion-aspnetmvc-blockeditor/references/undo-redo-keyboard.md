# Undo/Redo & Keyboard Shortcuts — Syncfusion ASP.NET MVC Block Editor

## Undo/Redo

### Default Behavior

The Block Editor supports up to **30** undo/redo actions by default.

| Action | Windows | Mac |
|---|---|---|
| Undo | `Ctrl + Z` | `⌘ + Z` |
| Redo | `Ctrl + Y` | `⌘ + Y` |

### Configure Stack Size

Use `UndoRedoStack` to increase or decrease the history depth:

```razor
@Html.EJS().BlockEditor("block-editor").UndoRedoStack(50).Render()
```

```csharp
public ActionResult Index()
{
    ViewBag.BlocksData = GetBlocks();
    return View();
}
```

> Setting a very large stack size increases memory usage. For most applications, 30–50 steps is sufficient.

---

## Built-in Keyboard Shortcuts

### Content Editing & Formatting

| Action | Windows | Mac |
|---|---|---|
| Bold | `Ctrl + B` | `⌘ + B` |
| Italic | `Ctrl + I` | `⌘ + I` |
| Underline | `Ctrl + U` | `⌘ + U` |
| Strikethrough | `Ctrl + Shift + X` | `⌘ + ⇧ + X` |
| Insert Link | `Ctrl + K` | `⌘ + K` |

### Block Creation

| Action | Windows | Mac |
|---|---|---|
| Create Paragraph | `Ctrl + Alt + P` | `⌘ + ⌥ + P` |
| Create Heading 1 | `Ctrl + Alt + 1` | `⌘ + ⌥ + 1` |
| Create Heading 2 | `Ctrl + Alt + 2` | `⌘ + ⌥ + 2` |
| Create Heading 3 | `Ctrl + Alt + 3` | `⌘ + ⌥ + 3` |
| Create Heading 4 | `Ctrl + Alt + 4` | `⌘ + ⌥ + 4` |
| Create Checklist | `Ctrl + Shift + 7` | `⌘ + ⇧ + 7` |
| Create Bullet List | `Ctrl + Shift + 8` | `⌘ + ⇧ + 8` |
| Create Numbered List | `Ctrl + Shift + 9` | `⌘ + ⇧ + 9` |
| Create Quote | `Ctrl + Alt + Q` | `⌘ + ⌥ + Q` |
| Create Code Block | `Ctrl + Alt + K` | `⌘ + ⌥ + K` |
| Create Callout | `Ctrl + Alt + C` | `⌘ + ⌥ + C` |
| Insert Image | `Ctrl + Alt + /` | `⌘ + ⌥ + /` |
| Insert Divider | `Ctrl + Shift + -` | `⌘ + ⇧ + -` |

### Block Management

| Action | Windows | Mac |
|---|---|---|
| Duplicate Block | `Ctrl + D` | `⌘ + D` |
| Delete Block | `Ctrl + Shift + D` | `⌘ + ⇧ + D` |
| Move Block Up | `Ctrl + Shift + ↑` | `⌘ + ⇧ + ↑` |
| Move Block Down | `Ctrl + Shift + ↓` | `⌘ + ⇧ + ↓` |
| Increase Indent | `Ctrl + ]` or `Tab` | `⌘ + ]` or `Tab` |
| Decrease Indent | `Ctrl + [` or `Shift + Tab` | `⌘ + [` or `⇧ + Tab` |

### General Operations

| Action | Windows | Mac |
|---|---|---|
| Undo | `Ctrl + Z` | `⌘ + Z` |
| Redo | `Ctrl + Y` | `⌘ + Y` |
| Cut | `Ctrl + X` | `⌘ + X` |
| Copy | `Ctrl + C` | `⌘ + C` |
| Paste | `Ctrl + V` | `⌘ + V` |
| Print | `Ctrl + P` | `⌘ + P` |

---

## Customizing Keyboard Shortcuts

Override default shortcuts using the `KeyConfig` property. Pass an anonymous object where keys are action names and values are shortcut strings.

### Override Bold and Italic

```razor
@Html.EJS().BlockEditor("block-editor").KeyConfig(ViewData["keyConfig"]).Render()
```

```csharp
public ActionResult Index()
{
    var keyConfig = new
    {
        bold   = "alt+b",
        italic = "alt+i"
    };
    ViewData["keyConfig"] = keyConfig;
    return View();
}
```

### Common KeyConfig Action Names

| Action Name | Default Shortcut |
|---|---|
| `bold` | `ctrl+b` |
| `italic` | `ctrl+i` |
| `underline` | `ctrl+u` |
| `strikethrough` | `ctrl+shift+x` |
| `insertLink` | `ctrl+k` |

> Menu-level shortcuts (slash command, block action, context menu) are customized through their respective settings objects (`CommandMenuSettings`, `BlockActionsMenuSettings`, `ContextMenuSettings`) via a `shortcut` property on each item.
