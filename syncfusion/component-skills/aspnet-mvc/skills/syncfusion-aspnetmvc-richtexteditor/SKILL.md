---
name: syncfusion-aspnetmvc-richtexteditor
description: Implement Syncfusion ASP.NET MVC Rich Text Editor for HTML and Markdown editing. This skill covers editor setup with the EJ2 RichTextEditor HTML helper, including WYSIWYG and Markdown modes. Use this when working with toolbar configuration, editor modes (HTML, Markdown, IFrame, Inline), content management, media insertion, smart editing features (@mentions, emoji picker), paste cleanup, form validation, and AI assistant integration.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Syncfusion ASP.NET MVC Rich Text Editor

The Syncfusion ASP.NET MVC Rich Text Editor is a WYSIWYG ("what you see is what you get") editor that creates and edits content, returning it as valid **HTML markup** or **Markdown**. Both modes use the same `@Html.EJS().RichTextEditor()` HTML helper — the mode is controlled by the `EditorMode` property (`HTML` by default, `Markdown` for the Markdown Editor).

## When to Use This Skill

- Setting up the RTE in an ASP.NET MVC project (NuGet, CDN, ScriptManager)
- Rendering in HTML (WYSIWYG), Markdown, IFrame, or Inline mode
- Configuring toolbar items and toolbar types
- Inserting and managing images, video, audio, tables, and links
- Implementing smart editing features: @mentions, emoji picker, slash menu, mail merge
- Working in Markdown mode: live preview, custom syntax, supported commands
- Reading/setting editor value, auto-save, cursor position
- Paste cleanup and clipboard handling
- Form validation, MaxLength, XSS prevention, read-only mode
- Integrating the AI Assistant (AICommands / AIQuery)
- Customizing styles, placeholder, globalization, third-party libraries
- Accessibility and keyboard navigation

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation (`Syncfusion.EJ2.MVC5`)
- Namespace configuration in `Views/Web.config`
- CDN stylesheet and script in `_Layout.cshtml`
- ScriptManager registration
- Basic RTE render with HTML helper
- Configuring initial toolbar items

### Editor Modes and Types
📄 **Read:** [references/editor-modes.md](references/editor-modes.md)
- HTML mode (default WYSIWYG)
- Markdown mode (`EditorMode.Markdown`)
- When to use HTML vs Markdown mode
- IFrame mode (`IframeSettings`)
- Inline editing mode (`InlineMode`)
- Resizable editor

### Toolbar Configuration
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Toolbar types: Expand, MultiRow, Scrollable, Popup
- Built-in toolbar tool names reference
- Adding custom tools with template
- Toolbar position (top/bottom)
- Quick toolbars (image, link, table context menus)
- Programmatically enable/disable toolbar items

### Text Formatting
📄 **Read:** [references/text-formatting.md](references/text-formatting.md)
- Bold, italic, underline, strikethrough
- Font name, size, color, background color
- Headings and paragraph formats
- Text alignments
- Ordered/unordered lists, indent/outdent
- Blockquote, code block, inline code
- Remove formatting, format painter

### Insert Images and Media
📄 **Read:** [references/insert-media.md](references/insert-media.md)
- Insert images (upload, URL, base64)
- Image resize, alignment, and alt text
- Insert video and audio
- File browser integration
- Check image size on upload

### Tables and Links
📄 **Read:** [references/tables-links.md](references/tables-links.md)
- Insert and configure tables
- Table properties and toolbar
- Insert and edit hyperlinks
- Quick toolbar for tables and links

### Smart Editing Features
📄 **Read:** [references/smart-editing.md](references/smart-editing.md)
- Mention support (@ tagging users/objects)
- Emoji picker
- Slash commands menu
- Mail merge fields

### Markdown Mode
📄 **Read:** [references/markdown-mode.md](references/markdown-mode.md)
- Markdown toolbar items and configuration
- Full supported markdown syntax reference
- Live preview with Marked.js
- Split-pane preview layout with Splitter
- Custom markdown syntax (Formatter property)
- Mention support in Markdown mode

### Editor Value and State
📄 **Read:** [references/editor-value.md](references/editor-value.md)
- Setting initial content (`Value`)
- Getting editor value programmatically
- Auto-save with `SaveInterval`
- Update value on form submit
- Setting cursor position (`setRange`)
- Character count display

### Paste and Clipboard
📄 **Read:** [references/paste-clipboard.md](references/paste-clipboard.md)
- Paste cleanup configuration
- Handling paste events
- Restricting paste from external sources

### Validation and Security
📄 **Read:** [references/validation-security.md](references/validation-security.md)
- MaxLength with character count
- Form validation integration (required field)
- XHTML validation
- Prevent cross-site scripting (XSS)
- Read-only mode
- Disabling the editor

### AI Assistant Integration
📄 **Read:** [references/ai-assistant.md](references/ai-assistant.md)
- AICommands and AIQuery toolbar items
- `AiAssistantPromptRequest` event
- `addAIPromptResponse` method
- Streaming responses (typewriter effect)
- AI Assistant customization

### Customization and Advanced
📄 **Read:** [references/customization.md](references/customization.md)
- Custom CSS and style encapsulation
- Placeholder text and custom placeholder style
- Globalization (locale) and RTL support
- Third-party library integration
- Adding Google Fonts
- RTE inside Dialog or Tab

### Accessibility and Keyboard Support
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG compliance
- Keyboard navigation shortcuts
- ARIA attributes
- Screen reader support

### Events Reference
📄 **Read:** [references/events.md](references/events.md)
- Complete list of all Rich Text Editor events
- Event binding in ASP.NET MVC
- Lifecycle, focus, content change, and action events
- Image/media upload events
- Paste and clipboard events
- AI Assistant events
- Dialog and popup events
- Event usage patterns and best practices

### Methods Reference
📄 **Read:** [references/methods.md](references/methods.md)
- Comprehensive client-side method reference
- Content retrieval methods (getHtml, getText, getContent)
- Selection methods (selectAll, selectRange, getRange)
- Command execution (executeCommand)
- Toolbar manipulation methods
- Focus control methods
- Dialog and quick toolbar methods
- AI Assistant methods
- Component lifecycle methods

### Properties Reference
📄 **Read:** [references/properties.md](references/properties.md)
- Complete property reference for Rich Text Editor
- Core properties (Value, EditorMode, Height, Width)
- Toolbar and formatting properties
- Insert settings (image, video, audio, table, link)
- Editor mode settings (IFrame, Inline)
- Paste cleanup and security settings
- Auto-save and undo/redo configuration
- AI Assistant and emoji picker settings
- Localization and styling properties

---

## Quick Start

### HTML Mode (WYSIWYG)

**View (`Index.cshtml`):**
```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Value(ViewBag.value)
    .Render())
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.value = "<p>Hello <b>World</b></p>";
    return View();
}
```

---

## Coding Best Practices

### Multi-Property Guidelines
When configuring the Rich Text Editor with multiple properties, it's essential to use the `@(...)` wrapper to ensure proper execution in ASP.NET MVC. Chain the methods across multiple lines for better readability.

**Correct:**
```cshtml
@(Html.EJS().RichTextEditor("editor")
    .Value(ViewBag.value)
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Render())
```

**Avoid:**
```cshtml
@Html.EJS().RichTextEditor("editor").Value(ViewBag.value).Render()
```

---

### Markdown Mode

```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("mdEditor")
    .EditorMode(EditorMode.Markdown)
    .Value(ViewBag.value)
    .Render())
```

```csharp
public ActionResult Index()
{
    ViewBag.value = "**Hello** *World*";
    return View();
}
```

---

## Common Patterns

### Choosing HTML vs Markdown Mode

| Situation | Use |
|-----------|-----|
| Rich formatted output stored as HTML | `EditorMode.HTML` (default) |
| Plain-text Markdown stored in DB | `EditorMode.Markdown` |
| Need live preview of markdown | `EditorMode.Markdown` + Marked.js + Splitter |
| Need to render editor inside iframe for style isolation | `IframeSettings.Enable(true)` |
| Edit content inline on the page (no fixed toolbar) | `InlineMode.Enable(true)` |

### Configuring Toolbar

```csharp
// In controller
ViewBag.tools = new object[] {
    "Bold", "Italic", "Underline", "|",
    "Formats", "Alignments", "OrderedList", "UnorderedList", "|",
    "CreateLink", "Image", "CreateTable", "|",
    "SourceCode", "Undo", "Redo"
};
```

```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Value(ViewBag.value)
    .Render())
```

> Use `"|"` for vertical separator and `"-"` for horizontal separator in toolbar items.

---

## Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| `EditorMode` | `EditorMode` | `HTML` (default) or `Markdown` |
| `Value` | `string` | Initial editor content |
| `ToolbarSettings` | Object | Toolbar items and type |
| `IframeSettings` | Object | Enable iframe editing mode |
| `InlineMode` | Object | Enable inline editing |
| `MaxLength` | `int` | Maximum character limit |
| `ShowCharCount` | `bool` | Show character count |
| `SaveInterval` | `int` | Auto-save interval (ms) |
| `Placeholder` | `string` | Placeholder text |
| `ReadOnly` | `bool` | Make editor read-only |
| `Enabled` | `bool` | Enable/disable the editor |
| `Height` | `string` | Editor height |
