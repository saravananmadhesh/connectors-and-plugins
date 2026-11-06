# Appearance and Styling in AI AssistView

## Table of Contents
- [Setting Width](#setting-width)
- [Setting Height](#setting-height)
- [CSS Class Customization](#css-class-customization)

## Setting Width

You can use the `width` property to set the width of the AI AssistView. The default value is `100%`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px;">
    <ejs-aiassistview id="aiAssistView" width="650px" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Setting Height

You can use the `height` property to set the height of the AI AssistView. The default value is `100%`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="width: 650px;">
    <ejs-aiassistview id="aiAssistView" height="350px" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## CSS Class Customization

You can customize the appearance of the AI AssistView control by using the `cssClass` property.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" cssClass="custom-container" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>

<style>
    .aiassist-container .e-aiassistview.custom-container {
        border-color: #e0e0e0;
        background-color: #f4f4f4;
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    }

    .aiassist-container .e-aiassistview.custom-container .e-view-header .e-toolbar,
    .aiassist-container .e-aiassistview.custom-container .e-view-header .e-toolbar-items {
        background: #d5d5d5;
    }

    .aiassist-container .e-aiassistview.custom-container .e-view-content .e-input-group {
        border: 3px solid #e0e0e0 !important;
    }
</style>
```

### Styling Tips

When customizing the appearance, consider these key CSS selectors:

- `.e-aiassistview` - Main component container
- `.e-view-header` - Header area containing view tabs
- `.e-view-content` - Content area with prompts and responses
- `.e-input-group` - Input area for prompts
- `.e-toolbar` - Toolbar items
- `.e-prompt-item` - Individual prompt items
- `.e-response-item` - Individual response items

Apply custom styles to these elements to match your application's design system.
