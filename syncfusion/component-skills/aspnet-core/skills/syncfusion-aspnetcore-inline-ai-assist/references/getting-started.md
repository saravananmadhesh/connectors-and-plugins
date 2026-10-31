# Getting Started with Syncfusion ASP.NET Core Inline AI Assist

## Table of Contents
- [Install NuGet Package](#install-nuget-package)
- [Add Tag Helper](#add-tag-helper)
- [Add Resources](#add-resources)
- [Register Script Manager](#register-script-manager)
- [Render Control](#render-control)

## Install NuGet Package

Install the Syncfusion.EJ2.AspNet.Core NuGet package in your project:

**Method 1: NuGet Package Manager UI**
1. Open NuGet Package Manager (Tools → NuGet Package Manager → Manage NuGet Packages for Solution)
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click Install

## Add Tag Helper

The Syncfusion tag helper must be imported in the `_ViewImports.cshtml` file:

**File:** `~/Pages/_ViewImports.cshtml`

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This enables Syncfusion tag helpers throughout all Razor pages in the `Pages` folder.

## Add Resources

Add the necessary stylesheets and scripts in the `_Layout.cshtml` file. Use CDN references or local resources.

**File:** `~/Pages/Shared/_Layout.cshtml`

Add inside the `<head>` tag:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

## Register Script Manager

Register the script manager at the end of the `<body>` tag in `_Layout.cshtml`:

**File:** `~/Pages/Shared/_Layout.cshtml`

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The script manager initializes all Syncfusion controls and must be placed after all control declarations.

## Render Control

Add the Inline AI Assist control to your Razor page:

**File:** `~/Pages/Index.cshtml`

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
    
    <ejs-inlineaiassist id="defaultInlineAssist" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
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

**Run the Application**

Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (Windows) or <kbd>⌘</kbd>+<kbd>F5</kbd> (macOS) to run the application. The Syncfusion® ASP.NET Core Inline AI Assist control will be rendered in your default web browser.
