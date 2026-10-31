# Advanced Features

## Table of Contents
- [Inline Toolbar Settings](#inline-toolbar-settings)
- [Toolbar Items](#toolbar-items)
- [Keyboard Navigation](#keyboard-navigation)
- [Globalization](#globalization)
- [RTL Support](#rtl-support)
- [Accessibility](#accessibility)

## Inline Toolbar Settings

Configure toolbar items displayed in the Inline AI Assist popup footer.

**Tag Helper:** `<e-inlineaiassist-inlinetoolbarsettings>`

**Properties:**
- `items` - Array of toolbar items
- `toolbarPosition` - Position: "Inline" or "Bottom"
- `itemClick` - Event handler when toolbar item is clicked

### Basic Toolbar Configuration

```razor
<ejs-inlineaiassist id="assist1" relateTo="#btn">
    <e-inlineaiassist-inlinetoolbarsettings items="ViewBag.Items" itemClick="onToolbarItemClick"></e-inlineaiassist-inlinetoolbarsettings>
</ejs-inlineaiassist>
```

## Toolbar Items

Define toolbar items with specific properties to customize appearance and behavior.

### Item Properties

```csharp
public class ToolbarItem
{
    public string Type { get; set; }         // Button, Separator, Input
    public string Text { get; set; }         // Display text
    public string IconCss { get; set; }      // Icon class
    public string Align { get; set; }        // Left, Center, Right
    public string Tooltip { get; set; }      // Hover text
    public bool Visible { get; set; }        // Show/hide
    public bool Disabled { get; set; }       // Enable/disable
    public string CssClass { get; set; }     // Custom CSS
    public int TabIndex { get; set; }        // Tab navigation
    public string Template { get; set; }     // Custom HTML template
}
```

### Toolbar Item Example

```razor
@using Syncfusion.EJ2.InteractiveChat;

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
    }
    
    .custom-btn {
        background-color: #007bff;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
    }

</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-inlinetoolbarsettings items="ViewBag.Items" itemClick="onToolbarItemClick"></e-inlineaiassist-inlinetoolbarsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    
    function onCreated() {
        inlineAssist = this;
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    }
    
    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
    
    function onToolbarItemClick(args) {
        // Your required actions
    }
</script>
```

## Keyboard Navigation

Enable keyboard navigation in toolbar items using `tabIndex` property.

### Tab Navigation Configuration

```csharp
public List<ToolbarItem> Items = new List<ToolbarItem>();

public ActionResult Index()
{
    Items.Add(new ToolbarItem { Text = "Item 1", TabIndex = 1 });
    Items.Add(new ToolbarItem { Text = "Item 2", TabIndex = 2 });
    ViewBag.ToolbarItems = Items;
    return View();
}
```

**Result:** Users can switch between items using Tab and Shift+Tab keys in order specified by TabIndex values.

### Zero TabIndex

Setting TabIndex to 0 uses DOM element order:

```csharp
Items.Add(new ToolbarItem { Text = "Item 1", TabIndex = 0 });
Items.Add(new ToolbarItem { Text = "Item 2", TabIndex = 0 });
```

## Globalization

Support multiple languages and locales through localization.

### Localization (L10n)

Configure culture-specific text and labels:

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
    }
</style>

<script>
    ej.base.L10n.load({
        'de': {
            'inline-ai-assist': {
                'send': 'Senden',
                'stopResponseText': 'Antwort stoppen'
            }
        }
    });
</script>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="localization" locale="de" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    
    function onCreated() {
        inlineAssist = this;
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    }
    
    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

**Default Locale Text:**

| Key | Text |
|-----|------|
| send | Send |
| stopResponseText | Stop Responding |
| thinkingIndicator | Thinking |
| editingIndicator | Editing |

## RTL Support

Enable right-to-left text direction and layout using `enableRtl` property.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
    }
</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="enableRtl" enableRtl="true" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    
    function onCreated() {
        inlineAssist = this;
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    }
    
    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

## Accessibility

The Inline AI Assist control supports WCAG 2.1 accessibility standards:

- **Keyboard Support**: Full keyboard navigation
- **ARIA Labels**: Proper semantic structure
- **Focus Management**: Clear focus indicators
- **Screen Reader**: Compatible with assistive technologies
- **Color Contrast**: Meets accessibility standards

## Summary
- **Toolbar**: Customize items with type, text, icons, and alignment
- **Keyboard**: Enable tab navigation with tabIndex
- **Globalization**: L10n for multiple languages and locales
- **RTL**: Full right-to-left layout support
- **Accessibility**: WCAG 2.1 compliant

---
