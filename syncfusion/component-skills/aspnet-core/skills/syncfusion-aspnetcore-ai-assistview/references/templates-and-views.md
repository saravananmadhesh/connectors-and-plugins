# Templates and Custom Views in AI AssistView

## Table of Contents
- [Banner Template](#banner-template)
- [Prompt Item Template](#prompt-item-template)
- [Response Item Template](#response-item-template)
- [Response Animation Template](#response-animation-template)
- [Prompt Suggestion Item Template](#prompt-suggestion-item-template)
- [Footer Template](#footer-template)
- [Custom Views](#custom-views)
  - [Setting View Type](#setting-view-type)
  - [Setting Name](#setting-name)
  - [Setting Icon CSS](#setting-icon-css)
  - [Setting View Template](#setting-view-template)
  - [Setting Active View](#setting-active-view)

## Banner Template

You can use the `bannerTemplate` property to display additional information, such as a welcome note, and more in the AI AssistView. This banner is positioned at the top of the prompt and response conversation area within the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" bannerTemplate="#bannerContent" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>

<script id="bannerContent" type="text/x-jsrender">
    <div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <div>Your everyday AI companion.</div>
    </div>
</script>

<style>
    .aiassist-container .e-view-container {
        margin: auto;
    }

    .aiassist-container .e-banner-view {
        margin-left: 0;
    }

    .banner-content .e-assistview-icon:before {
        font-size: 35px;
    }

    .banner-content {
        text-align: center;
    }
</style>
```

## Prompt Item Template

You can use the `promptItemTemplate` property to customize the prompt items in the AI AssistView. The template context includes `prompt`, `toolbarItems` and `index` items.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptItemTemplate="#promptItemTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>

<script id="promptItemTemplate" type="text/x-jsrender">
    <div class="promptItemContent">
        <div class="prompt-header">
            You
            <span class="e-icons e-user"></span>
        </div>
        <div class="content">${prompt}</div>
    </div>
</script>

<style>
    .promptItemContent {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .promptItemContent {
        align-items: flex-end;
        margin-right: 20px
    }

    .promptItemContent .prompt-header {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }

    .promptItemContent .prompt-header span {
        margin-left: 10px;
    }

    .promptItemContent .content {
        margin-right: 35px;
    }
</style>
```

## Response Item Template

You can use the `responseItemTemplate` property to customize response items within the AI AssistView. The template context includes the `prompt`, `response`, `index`, `toolbarItems` and `output` items.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 400px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" responseItemTemplate="#responseItemTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>

<script id="responseItemTemplate" type="text/x-jsrender">
    <div class="responseItemContent">
        <div class="response-header">
            <span class="e-icons e-assistview-icon"></span>
            AI Assist
        </div>
        <div class="responseContent">${response}</div>
    </div>
</script>

<style>
    .responseItemContent {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 20px
    }
    .responseItemContent .response-header {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }
    .responseItemContent .responseContent {
        margin-left: 35px;
    }
    .responseItemContent .response-header .e-assistview-icon:before {
        margin-right: 10px;
    }
    .aiassist-container .e-response-item-template .e-toolbar-items {
        margin-left: 35px;
    }
</style>
```

## Response Animation Template

You can use the `responseAnimationTemplate` property to display a custom loading indicator while the AI AssistView is generating the response. This template is shown in place of the response item until the response is ready, providing visual feedback to the user during streaming or delayed responses.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 400px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" responseItemTemplate="#responseItemTemplate" responseAnimationTemplate="#responseAnimationTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>

<script id="responseItemTemplate" type="text/x-jsrender">
    <div class="responseItemContent">
        <div class="response-header">
            <span class="e-icons e-assistview-icon"></span>
            AI Assist
        </div>
        <div class="responseContent">${response}</div>
    </div>
</script>

<script id="responseAnimationTemplate" type="text/x-jsrender">
    <div class="assistview-loading-status">
        <div class="assistview-grid-icon">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
        </div>
        <span class="assistview-loading-label">Generating</span>
    </div>
</script>

<style>
    .responseItemContent {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 20px
    }
    .responseItemContent .response-header {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }
    .responseItemContent .responseContent {
        margin-left: 35px;
    }
    .responseItemContent .response-header .e-assistview-icon:before {
        margin-right: 10px;
    }
    .aiassist-container .e-response-item-template .e-toolbar-items {
        margin-left: 35px;
    }
    .assistview-loading-status {
        display: flex;
        gap: 10px;
        color: #666;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
    }
    .assistview-grid-icon {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }
    .assistview-grid-icon span {
        width: 4px;
        height: 4px;
        background: #8a8a8a;
        border-radius: 1px;
        opacity: 0.25;
        animation: assistview-pulse 1.8s ease-in-out infinite;
    }
    .assistview-grid-icon span:nth-child(1) { animation-delay: 0s; }
    .assistview-grid-icon span:nth-child(2) { animation-delay: 0.1s; }
    .assistview-grid-icon span:nth-child(3) { animation-delay: 0.2s; }
    .assistview-grid-icon span:nth-child(4) { animation-delay: 0.3s; }
    .assistview-grid-icon span:nth-child(5) { animation-delay: 0.4s; }
    .assistview-grid-icon span:nth-child(6) { animation-delay: 0.5s; }
    .assistview-grid-icon span:nth-child(7) { animation-delay: 0.6s; }
    .assistview-grid-icon span:nth-child(8) { animation-delay: 0.7s; }
    .assistview-grid-icon span:nth-child(9) { animation-delay: 0.8s; }
    @@keyframes assistview-pulse {
        0%,
        100% {
            opacity: 0.25;
        }
        50% {
            opacity: 1;
        }
    }
</style>
```

## Prompt Suggestion Item Template

You can use the `promptSuggestionItemTemplate` property to customize the prompt suggestion items in the AI AssistView. The template context includes the `index` and `promptSuggestion`.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var defaultSuggestions = new string[] { "Best practices for clean, maintainable code?", "How to optimize code editor for speed?" };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptSuggestionItemTemplate="#promptSuggestionItemTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var response1 = "Use clear naming, break code into small functions, avoid repetition, write tests, and follow coding standards.";
            var response2 = "Install useful extensions, set up shortcuts, enable linting, and customize settings for smoother development.";
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(args.prompt === assistObj.promptSuggestions[0] ? response1 : args.prompt === assistObj.promptSuggestions[1] ? response2 : defaultResponse);
        }, 2000);
    }
</script>

<script id="promptSuggestionItemTemplate" type="text/x-jsrender">
    <div class='suggestion-item active'>
        <span class="e-icons e-circle-info"></span>
        <div class="content">${promptSuggestion}</div>
    </div>
</script>

<style>
    .e-aiassistview .e-views .e-suggestions li {
        padding: 0;
        border: none;
        box-shadow: none;
    }

    .suggestion-item {
        display: flex;
        align-items: center;
        background-color: #686868;
        color: white;
        padding: 4px 10px;
        opacity: 0.8;
        gap: 5px;
        height: 35px;
        border-radius: 5px;
    }

    .suggestion-item .content {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
```

## Footer Template

You can use the `footerTemplate` property to customize the default footer area and manage prompt request actions in the AI AssistView. This allows users to create unique footers that meet their specific needs.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" footerTemplate="#footerContent" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'sendPrompt') {
            const textArea = document.getElementById('promptTextArea');
            if (textArea) {
                textArea.value = '';
                let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                assistObj.addPromptResponse(defaultResponse);
            }
        }
    });
</script>
<script id="footerContent" type="text/x-jsrender">
    <div class="custom-footer">
        <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
        <button id="sendPrompt" class="e-btn e-primary">Generate</button>
    </div>
</script>

<style>
    .custom-footer {
        display: flex;
        gap: 10px;
        padding: 10px;
        background-color: transparent;
    }

    #promptTextArea {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    #sendPrompt {
        padding: 5px 15px;
        align-self: flex-end;
    }
</style>
```

## Custom Views

### Setting View Type

You can set the type of view by using the `type` property. It accepts two values such as `Assist` and `Custom`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist"></e-aiassistview-view>
            <e-aiassistview-view type="Custom" name="Response" viewTemplate="<div class='view-container'><h5>Response view content</h5></div>"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting Name

You can use the `name` property to specify the header name of the `Assist` or `Custom` views in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist" name="Prompt"></e-aiassistview-view>
            <e-aiassistview-view type="Custom" name="Response" viewTemplate="<div class='view-container'><h5>Response view content</h5></div>"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting Icon CSS

You can customize the view icons by using the `iconCss` property. By default the `e-assistview-icon` class is added as built-in header icon for the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist"></e-aiassistview-view>
            <e-aiassistview-view type="Custom" name="Response" IconCss="e-comment-show" viewTemplate="<div class='view-container'><h5>Response view content</h5></div>"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

### Setting View Template

You can use the `viewTemplate` property to add the view content of the multiple views added in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="width: max(50%, 500px); margin: 30px auto;">
    <ejs-aiassistview id="aiAssistView">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist" name="Prompt" viewTemplate="<div class='view-container'><h5>Prompt view content</h5></div>"></e-aiassistview-view>
            <e-aiassistview-view type="Custom" name="Response" iconCss="e-icons e-comment-show" viewTemplate="<div class='view-container'><h5>Response view content</h5></div>"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<style>
    .view-container {
        margin: 20px auto;
        width: 80%;
    }
</style>
```

### Setting Active View

You can use the `activeView` property to set the active view in the AI AssistView. By default, the value is `0`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" activeView="1" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist"></e-aiassistview-view>
            <e-aiassistview-view type="Custom" name="Response" iconCss="e-icons e-comment-show" viewTemplate="<div class='view-container'><h5>Response view content</h5></div>"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>

<style>
    .view-container {
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```
