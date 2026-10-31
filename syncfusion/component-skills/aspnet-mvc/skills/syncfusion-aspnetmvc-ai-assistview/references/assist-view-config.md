# Assist View Configuration — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Setting Prompt Placeholder](#setting-prompt-placeholder)
- [Pre-loading Prompt/Response Collection](#pre-loading-promptresponse-collection)
- [Rendering Responses as Markdown](#rendering-responses-as-markdown)
- [Adding Prompt Suggestions](#adding-prompt-suggestions)
- [Adding Suggestion Headers](#adding-suggestion-headers)
- [Prompter Avatar Icon (PromptIconCss)](#prompter-avatar-icon-prompticoncss)
- [Responder Avatar Icon (ResponseIconCss)](#responder-avatar-icon-responseiconcss)
- [Show or Hide Clear Button](#show-or-hide-clear-button)
- [Enable Scroll to Bottom Icon](#enable-scroll-to-bottom-icon)

---

## Setting Prompt Text

Use the `Prompt` property to pre-populate the prompt textarea on load. The user can edit or submit it immediately.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Prompt("What tools or apps can help me prioritize tasks?")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }
    function onPromptRequest(args) {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }
</script>
```

---

## Setting Prompt Placeholder

Use `PromptPlaceholder` to change the placeholder text shown in the empty textarea. Default value: `"Type prompt for assistance..."`.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .PromptPlaceholder("Type a message...")
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Pre-loading Prompt/Response Collection

Use the `Prompts` property to initialize the control with existing conversation history. Each item can contain a `prompt`, `response`, and optional `suggestionData`.

> The `Prompts` collection stores all prompts and responses generated during the session.

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var promptsData = new[]
    {
        new {
            prompt = "What is AI?",
            response = "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>",
            suggestionData = new List<string>()
        }
    };
    var promptsJson = Html.Raw(JsonConvert.SerializeObject(promptsData));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Prompts(promptsData)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);

    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            var found = prompts.find(p => p.prompt === args.prompt);
            var defaultResponse = 'Connect to your AI service for real-time processing.';
            assistObj.addPromptResponse(found ? found.response : defaultResponse);
        }, 2000);
    }
</script>
```

---

## Rendering Responses as Markdown

The AI AssistView natively converts Markdown-formatted response strings to HTML. Pass standard Markdown syntax in the `response` field or via `addPromptResponse()`. Supports headings, bold, italic, lists, code blocks, and links.

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var markdownData = new[]
    {
        new {
            prompt = "What is Markdown?",
            response = "# Markdown Guide\n\nMarkdown is a lightweight markup language:\n\n- **Headers:** Use `#`, `##`, `###`\n- **Bold:** `**text**`\n- **Italic:** `*text*`\n- **Code:** Triple backticks for code blocks\n\nIt's simple and perfect for documentation.",
            suggestions = new string[] { "How do I use bold?", "Show code block example" }
        },
        new {
            prompt = "How do I use bold?",
            response = "# Bold Text in Markdown\n\nUse double asterisks `**text**` or double underscores `__text__`:\n\n**This is bold text**",
            suggestions = new string[] { "What is Markdown?", "Show code block example" }
        }
    };

    var markdownSuggestions = new string[] { "What is Markdown?", "How do I use bold?" };
    var promptsJson = Html.Raw(JsonConvert.SerializeObject(markdownData));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Prompts(markdownData)
        .PromptSuggestions(markdownSuggestions)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    var suggestions = @Html.Raw(JsonConvert.SerializeObject(markdownSuggestions));

    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            var found = prompts.find(p => p.prompt === args.prompt);
            var defaultResponse = 'Connect to your AI service for real-time processing.';
            if (found) {
                assistObj.addPromptResponse(found.response);
                assistObj.promptSuggestions = found.suggestions || suggestions;
            } else {
                assistObj.addPromptResponse(defaultResponse);
                assistObj.promptSuggestions = suggestions;
            }
        }, 2000);
    }
</script>
```

> **Streaming Markdown:** When streaming character-by-character from a server, pass partial markdown strings repeatedly to `addPromptResponse(html, isFinal)`. Use `marked.js` to convert before passing.

---

## Adding Prompt Suggestions

Use `PromptSuggestions` to show clickable suggestion chips. Chips appear initially and can be updated dynamically after each response.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var defaultSuggestions = new string[] {
        "Best practices for clean, maintainable code?",
        "How to optimize code editor for speed?"
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptSuggestions(defaultSuggestions)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            var response1 = "Use clear naming, break code into small functions, avoid repetition, write tests, and follow coding standards.";
            var response2 = "Install useful extensions, set up shortcuts, enable linting, and customize settings for smoother development.";
            var defaultResponse = 'Connect to your AI service for real-time processing.';

            if (args.prompt === assistObj.promptSuggestions[0]) {
                assistObj.addPromptResponse(response1);
            } else if (args.prompt === assistObj.promptSuggestions[1]) {
                assistObj.addPromptResponse(response2);
            } else {
                assistObj.addPromptResponse(defaultResponse);
            }
        }, 2000);
    }
</script>
```

> **Dynamic update:** After a response, reassign `assistObj.promptSuggestions = newSuggestions` to show context-relevant follow-up chips.

---

## Adding Suggestion Headers

Use `PromptSuggestionsHeader` to display a header text above the suggestion chips.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .PromptSuggestions(defaultSuggestions)
    .PromptSuggestionsHeader("Suggested Prompts")
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Prompter Avatar Icon (PromptIconCss)

Customize the avatar icon shown beside user prompts using `PromptIconCss`. Accepts any Syncfusion icon class or custom CSS class.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .PromptIconCss("e-icons e-user")
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Responder Avatar Icon (ResponseIconCss)

Customize the avatar icon beside AI responses using `ResponseIconCss`. Default: `e-assistview-icon`.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .ResponseIconCss("e-icons e-bullet-4")
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Show or Hide Clear Button

Use `ShowClearButton` to show a clear (×) button inside the prompt textarea. Default: `false`. When clicked, the entered prompt text is cleared.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompt("What tools or apps can help me prioritize tasks?")
    .ShowClearButton(true)
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Enable Scroll to Bottom Icon

Use `EnableScrollToBottom` to show/hide the floating scroll-to-bottom button. Default: `true`. When the user scrolls up, a floating icon appears. Clicking it scrolls smoothly to the latest response.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var promptsData = new[]
    {
        new {
            prompt = "What tools or apps can help me prioritize tasks?",
            response = "<div>Here are some effective task prioritization tools:<ul><li><strong>Todoist:</strong> A robust task manager with priority levels.</li><li><strong>Asana:</strong> Project management with timeline views.</li><li><strong>Notion:</strong> All-in-one workspace for notes and tasks.</li></ul></div>"
        },
        new {
            prompt = "How do I manage multiple projects effectively?",
            response = "<div>Best practices:<ul><li><strong>Centralized dashboard:</strong> Track all projects in one place.</li><li><strong>Set clear milestones:</strong> Break into manageable phases.</li><li><strong>Regular reviews:</strong> Weekly status meetings.</li></ul></div>"
        }
    };
    var defaultSuggestions = new string[] {
        "What tools or apps can help me prioritize tasks?",
        "How do I manage multiple projects effectively?"
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .Prompts(promptsData)
        .PromptSuggestions(defaultSuggestions)
        .EnableScrollToBottom(true)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Views(view => {
            view.Type(AssistViewType.Assist).Name("Task Assistant").IconCss("e-icons e-assistview-icon").Add();
        })
        .Render()
</div>
```

> **Default behavior:** `EnableScrollToBottom` is `true` by default. Set to `false` to hide the floating icon entirely.
