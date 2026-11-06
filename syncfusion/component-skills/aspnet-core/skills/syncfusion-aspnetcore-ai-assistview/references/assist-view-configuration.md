# Configuring Prompts and Responses in AI AssistView

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Setting Prompt Placeholder](#setting-prompt-placeholder)
- [Prompt-Response Collection](#prompt-response-collection)
- [Update Response as Markdown](#update-response-as-markdown)
- [Adding Prompt Suggestions](#adding-prompt-suggestions)
- [Adding Suggestion Headers](#adding-suggestion-headers)
- [Adding Prompt Icon CSS](#adding-prompt-icon-css)
- [Adding Response Icon CSS](#adding-response-icon-css)
- [Show or Hide Clear Button](#show-or-hide-clear-button)
- [Show or Hide Header](#show-or-hide-header)
- [Marking Response as Helpful](#marking-response-as-helpful)
- [Enable Scroll to Bottom Icon](#enable-scroll-to-bottom-icon)

## Setting Prompt Text

You can use the `prompt` property to define the prompt text for the AI AssistView control.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompt="What tools or apps can help me prioritize tasks?" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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

## Setting Prompt Placeholder

You can use the `promptPlaceholder` property to set the placeholder text for the prompt textarea. The default value is `Type prompt for assistance...`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptPlaceholder="Type a message..." promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest() {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Prompt-Response Collection

You can use the `prompts` property to initialize the control with the configured data as a collection of prompts and responses or individual entries.

> The `prompts` collection stores all the prompts and responses generated.

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
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
```

## Update Response as Markdown

The AI AssistView supports rendering responses as **Markdown** content, which is automatically converted to HTML using the built-in Markdown Converter. When you pass markdown-formatted text in the response, it will be displayed as formatted HTML in the AI AssistView. The streaming of markdown content happens seamlessly with built-in support for dynamic rendering.

You can use markdown syntax like **bold**, *italic*, headings, lists, code blocks, and links to format your responses.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
   var markdownData = new[]
    {
        new {
            prompt = "What is Markdown?",
            response = "# Markdown Guide\n\nMarkdown is a lightweight markup language:\n\n- **Headers:** Use `#`, `##`, `###`\n- **Bold:** `**text**` for bold\n- **Italic:** `*text*` for italic\n- **Code:** Triple backticks for code blocks\n- **Lists:** Use `-` for bullet points\n\nIt\'s simple and perfect for documentation.",
            suggestions = new string[] {"How do I use bold?", "Show code block example"}
        },
        new {
            prompt = "How do I use bold?",
            response = "# Bold Text in Markdown\n\nUse double asterisks `**text**` or double underscores `__text__`:\n\n**This is bold text**\n\nBoth methods produce the same result.",
            suggestions = new string[] {"What is Markdown?", "Show code block example"}
        }
    };
    var promptsJson = JsonSerializer.Serialize(markdownData);
    var markdownSuggestions = new string[] { "What is Markdown?", "How do I use bold?", "Show code block example" };

}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@markdownData" promptSuggestions="@markdownSuggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            if (foundPrompt) {
                assistObj.addPromptResponse(foundPrompt.response);
                assistObj.promptSuggestions = foundPrompt.suggestions || markdownSuggestions;
            } else {
                assistObj.addPromptResponse(defaultResponse);
                assistObj.promptSuggestions = markdownSuggestions;
            }    
        }, 2000);
    }
</script>
```

## Adding Prompt Suggestions

You can use the `promptSuggestions` property to add suggestions that help users refine their prompts. Additionally, custom headers can be set for suggestions further enhancing the user experience.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var defaultSuggestions = new string[] { "Best practices for clean, maintainable code?", "How to optimize code editor for speed?" };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
```

## Adding Suggestion Headers

You can use the `promptSuggestionsHeader` property to set the header text for the prompt suggestions in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var defaultSuggestions = new string[] { "Best practices for clean, maintainable code?", "How to optimize code editor for speed?" };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptSuggestionsHeader="Suggested Prompts" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
```

## Adding Prompt Icon CSS

You can customize the appearance of the prompter avatar by using the `promptIconCss` property.

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
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptIconCss="e-icons e-user" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
```

## Adding Response Icon CSS

You can use the `responseIconCss` property to customize the appearance of the responder avatar. By default, the `e-assistview-icon` class is added as the built-in AI AssistView response icon.

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
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" responseIconCss="e-icons e-bullet-4" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
```

## Show or Hide Clear Button

You can use the `showClearButton` property to show or hide the clear button. By default, its value is `false`, when the clear button is clicked, the prompt text entered will be cleared.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompt="What tools or apps can help me prioritize tasks?" showClearButton="true" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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

## Show or Hide Header

You can use the `showHeader` property to show or hide the header of the AI AssistView. By default, its value is `true`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" showHeader="false" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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

## Marking Response as Helpful

You can use the `isResponseHelpful` property on each item in the `prompts` collection to indicate whether the AI response is considered helpful. This property accepts a `boolean` value and reflects the helpfulness state of that prompt's response.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>", isResponseHelpful = true },
        new { prompt = "What is ML?", response = "<div>ML stands for Machine Learning, a subset of AI that allows systems to learn from data.</div>", isResponseHelpful = false }
    };
    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(p => p.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

## Enable Scroll to Bottom Icon

You can use the `enableScrollToBottom` property to show or hide the scroll-to-bottom indicator. By default, this property is `true`. When enabled, a floating icon/button appears when the user scrolls away from the bottom of the conversation. Clicking this icon smoothly scrolls the view to the bottom to display the latest response.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
   var promptsData = new[]
    {
        new {
            prompt = "What tools or apps can help me prioritize tasks?",
            response = "<div>Here are some effective task prioritization tools:<ul><li><strong>Todoist:</strong> A robust task manager with priority levels and project organization.</li><li><strong>Asana:</strong> Project management tool with timeline and board views.</li><li><strong>Microsoft To Do:</strong> Simple and integrated with Microsoft ecosystem.</li><li><strong>Notion:</strong> All-in-one workspace for notes, databases, and tasks.</li><li><strong>ClickUp:</strong> Comprehensive tool with customizable workflows and prioritization features.</li></ul></div>"
        },
        new {
            prompt = "How do I manage multiple projects effectively?",
            response = "<div>Here are best practices for managing multiple projects:<ul><li><strong>Use a centralized dashboard:</strong> Track all projects in one place.</li><li><strong>Set clear milestones:</strong> Break down each project into manageable phases.</li><li><strong>Prioritize tasks:</strong> Focus on high-impact items first.</li><li><strong>Delegate effectively:</strong> Assign tasks to team members based on skills.</li><li><strong>Regular reviews:</strong> Conduct weekly or bi-weekly project status meetings.</li></ul></div>"
        }
    };
    var promptsJson = JsonSerializer.Serialize(promptsData);
    var defaultSuggestions = new string[] { "What tools or apps can help me prioritize tasks?", "How do I manage multiple projects effectively?" };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-views>
            <e-aiassistview-view type="Assist" name="Task Assistant" IconCss="e-icons e-assistview-icon"></e-aiassistview-view>
        </e-aiassistview-views>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);    
        }, 2000);
    }
</script>
```
