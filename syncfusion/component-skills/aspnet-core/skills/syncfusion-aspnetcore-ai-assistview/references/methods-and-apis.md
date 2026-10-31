# Methods and APIs in AI AssistView

## Table of Contents
- [Adding Prompt Response](#adding-prompt-response)
  - [Adding Responses as String](#adding-responses-as-string)
  - [Adding Responses as Object](#adding-responses-as-object)
- [Executing Prompt](#executing-prompt)

## Adding Prompt Response

You can use the `addPromptResponse` public method to add the prompts and responses to the AI AssistView. You can add it either as a `string` or `object` collection.

### Adding Responses as String

You can add string response by passing it as an argument for the `addPromptResponse('Response')` method which adds as the response of the last added prompt.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="addStringResponse" onclick="getPromptResponse()">Add String Response</button>
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
    function getPromptResponse() {
            assistObj.addPromptResponse('Dynamic response');
    }
</script>

<style>
    #addStringResponse {
        margin-bottom: 10px;
    }
</style>
```

### Adding Responses as Object

You can add object response by passing the prompt and response as a collection as an argument for the `addPromptResponse({prompt: 'Prompt text', response: 'Response text'})` method which adds as a new prompt and response in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="addObjectResponse" onclick="getPromptResponse()">Add Object Response</button>
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
    function getPromptResponse() {
        assistObj.addPromptResponse({ prompt: 'What is AI?', response: 'AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.' });
    }
</script>

<style>
    #addObjectResponse {
        margin-bottom: 10px;
    }
</style>
```

## Executing Prompt

You can use the `executePrompt` method to execute the prompts dynamically in the AI AssistView. It accepts prompts as string values, which triggers the `promptRequest` event and performs the callback actions.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="executePrompt" onclick="executePrompt()">Execute Prompt</button>
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
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
    function executePrompt() {
        assistObj.executePrompt('What is the current temperature?');
    }
</script>

<style>
    #executePrompt {
        margin-bottom: 10px;
    }
</style>
```

### Common Usage Patterns

**Pattern 1: Adding Dynamic String Responses**
```javascript
// Add a simple text response to the last prompt
assistObj.addPromptResponse('Here is your response');
```

**Pattern 2: Adding Prompt and Response Together**
```javascript
// Add a complete prompt-response pair
assistObj.addPromptResponse({
    prompt: 'What is Syncfusion?',
    response: 'Syncfusion provides UI components and tools for web, desktop, and mobile applications.'
});
```

**Pattern 3: Executing Prompts Programmatically**
```javascript
// Trigger a prompt dynamically which fires the promptRequest event
assistObj.executePrompt('Tell me about AI');
```

**Pattern 4: Adding HTML Responses**
```javascript
// Add HTML formatted responses
assistObj.addPromptResponse('<strong>Bold text</strong> and <em>italic text</em>');
```

**Pattern 5: Adding Markdown Responses**
```javascript
// Add markdown formatted responses (auto-converted to HTML)
assistObj.addPromptResponse('# Heading\n\n**Bold** and *italic*');
```

### Method Signatures

#### addPromptResponse(response: string | object): void

- **response (string)**: Plain text or HTML/Markdown content as a response to the last prompt
- **response (object)**: Object with `prompt` and `response` properties to add a complete prompt-response pair
  - `prompt`: The prompt text
  - `response`: The response content (supports HTML/Markdown)

#### executePrompt(prompt: string): void

- **prompt**: The prompt text to execute, which triggers the `promptRequest` event

### Best Practices

- Use `addPromptResponse(string)` when you already have an active prompt that needs a response
- Use `addPromptResponse({prompt, response})` to add complete conversational pairs programmatically
- Use `executePrompt()` to trigger the prompt request flow from code
- For formatted content, use HTML or Markdown syntax in response strings
- Handle responses asynchronously when integrating with external AI services
