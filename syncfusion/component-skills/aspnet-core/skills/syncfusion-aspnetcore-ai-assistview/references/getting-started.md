# Getting Started with ASP.NET Core AI AssistView

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [TagHelper Registration](#taghelper-registration)
- [Stylesheet and Script Resources](#stylesheet-and-script-resources)
- [Script Manager Registration](#script-manager-registration)
- [Basic Control](#basic-control)
- [Configure Suggestions and Responses](#configure-suggestions-and-responses)

### Install NuGet Package

Open the NuGet package manager in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution), search for `Syncfusion.EJ2.AspNet.Core` and install it.

## TagHelper Registration

Open `~/Pages/_ViewImports.cshtml` file and import the `Syncfusion.EJ2` TagHelper:

```razor
@addTagHelper *, Syncfusion.EJ2
```

## Stylesheet and Script Resources

Add the theme and script references using CDN inside the `<head>` of `~/Pages/Shared/_Layout.cshtml` file:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

## Script Manager Registration

Register the script manager `<ejs-scripts>` at the end of `<body>` in the ASP.NET Core application:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Basic Control

Add the Syncfusion ASP.NET Core AI AssistView tag helper in `~/Pages/Index.cshtml` page:

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView"></ejs-aiassistview>
</div>
```

Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>⌘</kbd>+<kbd>F5</kbd> (macOS) to run the app. The Syncfusion ASP.NET Core AI AssistView control will be rendered in the default web browser.

> **Note:** Starting from version 33.1x, when a user submits a prompt to the AI AssistView, the component automatically scrolls and focuses on the latest prompt and response. This behavior eliminates the need for users to manually scroll down to see the new response, ensuring they always view the most recent AI response without interruption. Prior to version 33.1x, the previous responses remained visible when new responses were added.

## Configure Suggestions and Responses

You can use the `promptSuggestions` property to add prompt suggestions and the `promptRequest` event to add responses when the prompt matches the specified prompts data, otherwise the default response will be displayed.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var suggestions = new string[] { "How do I prioritize my tasks?", "How can I improve my time management skills?" };

    var prompts = new[]
    {
        new { prompt = "How do I prioritize my tasks?", response = "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps. For more assistance, feel free to ask—I'm here to help!", suggestionData = new List<string> { } },
        new { prompt = "How can I improve my time management skills?", response = "To improve time management skills, try setting clear goals, using a planner or digital tools, prioritizing tasks, breaking tasks into smaller steps, and minimizing distractions. Regularly review and adjust your approach for better efficiency.", suggestionData = new List<string>  { } }
    };

    var promptsJson = JsonSerializer.Serialize(prompts);

}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@suggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

This basic setup provides you with a fully functional AI AssistView with prompt suggestions and response handling. For more advanced features like file attachments, custom templates, and multiple views, refer to the other reference documentation.
