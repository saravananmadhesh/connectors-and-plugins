# Text-to-Speech in AI AssistView

## Table of Contents
- [Prerequisites](#prerequisites)
- [Configure Text to Speech](#configure-text-to-speech)
- [Configuring the Speech Settings](#configuring-the-speech-settings)

## Prerequisites

Before integrating `Text-to-Speech`, ensure the following:

1. The Syncfusion AI AssistView control is properly set up in your ASP.NET Core application.
    - ASP.NET Core Getting Started Guide

2. The AI AssistView control is integrated with Azure OpenAI or your preferred AI service.
    - Integration of Azure OpenAI With ASP.NET Core AI AssistView control

## Configure Text to Speech

To enable the built-in Text-to-Speech functionality, add the `e-assist-audio` icon to the `e-aiassistview-responsetoolbarsettings` tag helper. When clicked, it fetches the text from the generated AI response and uses the browser's SpeechSynthesis API to read it aloud.

```razor
@model IndexModel
@using Syncfusion.EJ2.InteractiveChat

<div class="integration-texttospeech-section">
    <ejs-aiassistview id="aiAssistView" bannerTemplate="#bannerContent"
                      promptRequest="onPromptRequest"
                      stopRespondingClick="stopRespondingClick"
                      created="onCreated">
        <e-aiassistview-toolbarsettings items="@Model.ViewModel.Items" itemClicked="toolbarItemClicked"></e-aiassistview-toolbarsettings>
        <e-aiassistview-responsetoolbarsettings items="@Model.ViewModel.ResponseItems" ></e-aiassistview-responsetoolbarsettings>
    </ejs-aiassistview>
</div>

<script id="bannerContent" type="text/x-jsrender">
    <div class="banner-content">
        <div class="e-icons e-audio"></div>
        <i>Ready to assist voice enabled !</i>
    </div>
</script>

<script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
<script>
    var assistObj = null;
    var stopStreaming = false;

    // Initializes the AIAssistView component reference when created
    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById("aiAssistView"), "aiassistview");
    }

    // Handles toolbar item clicks, such as clearing the conversation on refresh
    function toolbarItemClicked(args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistObj.prompts = [];
            stopStreaming = true;
        }
    }

    // Streams the AI response character by character to create a typing effect
    async function streamResponse(response) {
        let lastResponse = '';
        const responseUpdateRate = 10;
        let i = 0;
        const responseLength = response.length;
        while (i < responseLength && !stopStreaming) {
            lastResponse += response[i];
            i++;
            if (i % responseUpdateRate === 0 || i === responseLength) {
                const htmlResponse = marked.parse(lastResponse);
                assistObj.addPromptResponse(htmlResponse);
                assistObj.scrollToBottom();
            }
            await new Promise(resolve => setTimeout(resolve, 15)); // Delay for streaming effect
        }
    }

    // Handles prompt requests by sending them to the server API endpoint and streaming the response
    function onPromptRequest(args) {
        // Get antiforgery token
        var tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
        var token = tokenElement ? tokenElement.value : '';

        if (!token) {
            assistObj.addPromptResponse('⚠️ Antiforgery token not found.');
            return;
        }

        fetch('/?handler=GetAIResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': token
            },
            body: JSON.stringify({ prompt: args.prompt || 'Hi' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseText => {
            const text = responseText.trim() || 'No response received.';
            stopStreaming = false;
            streamResponse(text);
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
            assistObj.addPromptResponse('⚠️ Something went wrong while connecting to the AI service. Please try again later.');
            stopStreaming = true;
        });
    }

    // Stops the ongoing streaming response
    function stopRespondingClick() {
        stopStreaming = true;
    }
</script>

<style>
    .integration-texttospeech-section {
        height: 450px;
        width: 650px;
        margin: 0 auto;
    }

    .integration-texttospeech-section .e-view-container {
        margin: auto;
    }

    .integration-texttospeech-section .e-banner-view {
        margin-left: 0;
    }

    .integration-texttospeech-section .banner-content .e-audio:before {
        font-size: 25px;
    }

    .integration-texttospeech-section .banner-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
</style>
```

```csharp
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenAI.Chat;

namespace WebApplication.Pages
{
    public class IndexModel : PageModel
    {

        public IndexViewModel ViewModel { get; set; } = new IndexViewModel();
        public void OnGet()
        {
            ViewModel.Items = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" }
            };

            ViewModel.ResponseItems = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Dislike" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-audio", tooltip = "Audio" }
            };
        }

        public async Task<IActionResult> OnPostGetAIResponse([FromBody] PromptRequest request)
        {
            try
            {
                var endpoint = "https://<your-resource-name>.openai.azure.com/";
                var apiKey = "<your-api-key>";
                var deploymentId = "<your-deployment-id>";

                var client = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
                var chatClient = client.GetChatClient(deploymentId);

                var messages = new List<ChatMessage>
                {
                    new SystemChatMessage("You are a helpful assistant."),
                    new UserChatMessage(request.Prompt)
                };

                var response = await chatClient.CompleteChatAsync(messages);
                return new JsonResult(response.Value.Content[0].Text);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error: " + ex.Message });
            }
        }
    }

    public class IndexViewModel
    {
        public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
        public List<ToolbarItemModel> ResponseItems { get; set; } = new List<ToolbarItemModel>();
    }

    public class PromptRequest
    {
        public string Prompt { get; set; }
    }

    public class ToolbarItemModel
    {
        public string align { get; set; }
        public string iconCss { get; set; }
        public string tooltip { get; set; }
    }
}
```

## Configuring the Speech Settings

You can use the `e-aiassistview-textToSpeechSettings` tag to customize the speech synthesis behavior using the following available properties such as `language`, `speechPitch`, `speechRate`, `volume` and `voice`.

```razor
@model IndexModel
@using Syncfusion.EJ2.InteractiveChat

<div class="integration-texttospeech-section">
    <ejs-aiassistview id="aiAssistView" bannerTemplate="#bannerContent"
                      promptRequest="onPromptRequest"
                      stopRespondingClick="stopRespondingClick"
                      created="onCreated">
        <e-aiassistview-toolbarsettings items="@Model.ViewModel.Items" itemClicked="toolbarItemClicked"></e-aiassistview-toolbarsettings>
        <e-aiassistview-responsetoolbarsettings items="@Model.ViewModel.ResponseItems" ></e-aiassistview-responsetoolbarsettings>
        <e-aiassistview-texttospeechsettings language="en-US"
                                             speechPitch="1"
                                             speechRate="1"
                                             volume="1">
        </e-aiassistview-texttospeechsettings>
    </ejs-aiassistview>
</div>

<script id="bannerContent" type="text/x-jsrender">
    <div class="banner-content">
        <div class="e-icons e-audio"></div>
        <i>Ready to assist voice enabled !</i>
    </div>
</script>

<script src="https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js"></script>
<script>
    var assistObj = null;
    var stopStreaming = false;

    // Initializes the AIAssistView component reference when created
    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById("aiAssistView"), "aiassistview");
    }

    // Handles toolbar item clicks, such as clearing the conversation on refresh
    function toolbarItemClicked(args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistObj.prompts = [];
            stopStreaming = true;
        }
    }

    // Streams the AI response character by character to create a typing effect
    async function streamResponse(response) {
        let lastResponse = '';
        const responseUpdateRate = 10;
        let i = 0;
        const responseLength = response.length;
        while (i < responseLength && !stopStreaming) {
            lastResponse += response[i];
            i++;
            if (i % responseUpdateRate === 0 || i === responseLength) {
                const htmlResponse = marked.parse(lastResponse);
                assistObj.addPromptResponse(htmlResponse);
                assistObj.scrollToBottom();
            }
            await new Promise(resolve => setTimeout(resolve, 15)); // Delay for streaming effect
        }
    }

    // Handles prompt requests by sending them to the server API endpoint and streaming the response
    function onPromptRequest(args) {
        // Get antiforgery token
        var tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
        var token = tokenElement ? tokenElement.value : '';

        if (!token) {
            assistObj.addPromptResponse('⚠️ Antiforgery token not found.');
            return;
        }

        fetch('/?handler=GetAIResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': token
            },
            body: JSON.stringify({ prompt: args.prompt || 'Hi' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(responseText => {
            const text = responseText.trim() || 'No response received.';
            stopStreaming = false;
            streamResponse(text);
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
            assistObj.addPromptResponse('⚠️ Something went wrong while connecting to the AI service. Please try again later.');
            stopStreaming = true;
        });
    }

    // Stops the ongoing streaming response
    function stopRespondingClick() {
        stopStreaming = true;
    }
</script>

<style>
    .integration-texttospeech-section {
        height: 450px;
        width: 650px;
        margin: 0 auto;
    }

    .integration-texttospeech-section .e-view-container {
        margin: auto;
    }

    .integration-texttospeech-section .e-banner-view {
        margin-left: 0;
    }

    .integration-texttospeech-section .banner-content .e-audio:before {
        font-size: 25px;
    }

    .integration-texttospeech-section .banner-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
</style>
```

```csharp
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenAI.Chat;

namespace WebApplication.Pages
{
    public class IndexModel : PageModel
    {

        public IndexViewModel ViewModel { get; set; } = new IndexViewModel();
        public void OnGet()
        {
            ViewModel.Items = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" }
            };

            ViewModel.ResponseItems = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Dislike" },
                new ToolbarItemModel { iconCss = "e-icons e-assist-audio", tooltip = "Audio" }
            };
        }

        public async Task<IActionResult> OnPostGetAIResponse([FromBody] PromptRequest request)
        {
            try
            {
                var endpoint = "https://<your-resource-name>.openai.azure.com/";
                var apiKey = "<your-api-key>";
                var deploymentId = "<your-deployment-id>";

                var client = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
                var chatClient = client.GetChatClient(deploymentId);

                var messages = new List<ChatMessage>
                {
                    new SystemChatMessage("You are a helpful assistant."),
                    new UserChatMessage(request.Prompt)
                };

                var response = await chatClient.CompleteChatAsync(messages);
                return new JsonResult(response.Value.Content[0].Text);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error: " + ex.Message });
            }
        }
    }

    public class IndexViewModel
    {
        public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
        public List<ToolbarItemModel> ResponseItems { get; set; } = new List<ToolbarItemModel>();
    }

    public class PromptRequest
    {
        public string Prompt { get; set; }
    }

    public class ToolbarItemModel
    {
        public string align { get; set; }
        public string iconCss { get; set; }
        public string tooltip { get; set; }
    }
}
```

### Speech Settings Properties

Configure the following properties in `e-aiassistview-textToSpeechSettings`:

| Property | Type | Default | Description |
|---|---|---|---|
| `language` | `string` | `'en-US'` | Language code for speech synthesis (e.g., `'en-US'`, `'fr-FR'`, `'de-DE'`). |
| `speechPitch` | `number` | `1` | Pitch of the speech (range 0.1 to 2, where 1 is normal). |
| `speechRate` | `number` | `1` | Speed of speech playback (range 0.1 to 2, where 1 is normal speed). |
| `volume` | `number` | `1` | Volume level for audio playback (range 0 to 1, where 1 is maximum). |
| `voice` | `string` | Auto-detected | Specific voice for speech synthesis (depends on browser and OS availability). |
