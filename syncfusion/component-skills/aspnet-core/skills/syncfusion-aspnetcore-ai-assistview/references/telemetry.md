# Telemetry in AI AssistView

## Table of Contents
- [Enable Telemetry](#enable-telemetry)
- [Configuring Metrics](#configuring-metrics)
- [Customizing the Report](#customizing-the-report)
- [Displaying AI Data](#displaying-ai-data)
- [Custom Attributes](#custom-attributes)
- [Key Characteristics](#key-characteristics)

The telemetry feature in AI AssistView tracks AI interaction metrics such as response duration, tool calls, and model information, and renders a built-in telemetry button (displaying the duration) in each response toolbar when enabled. It can also be customized using the `telemetrySettings` properties, which include `metrics` and the `beforeReport` event.

You can hover over the telemetry button in any response toolbar to view the telemetry report in a tooltip.

## Enable Telemetry

Enable telemetry by adding the `e-aiassistview-telemetrysettings` tag helper with the `enable` property set to `true`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var defaultSuggestions = new string[] { "How do I set achievable goals at work?", "Why do people fly in their dreams?", "How can I mitigate the threats during product development?" };
}

<div class="aiassist-container" style="height: 420px; width: 550px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-telemetrysettings enable="true"></e-aiassistview-telemetrysettings>
    </ejs-aiassistview>
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
        }, 1000);
    }
</script>
```

## Configuring Metrics

You can control which telemetry metrics are captured in the report using the `metrics` property of the [telemetrySettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_TelemetrySettings) option. It accepts one or more values from the `TelemetryMetric` type, such as `status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, and `totalTokens`.

Additionally, the order of metrics in the `metrics` array also determines the display order of rows in the telemetry tooltip.

| Metric | Description |
|---------|-------------|
| `status` | Indicates whether the response was completed or cancelled. |
| `duration` | Total time taken to generate the response. |
| `toolCalls` | Number of tool invocations performed while generating the response. |
| `streamingChunks` | Number of streamed content chunks received for the response. |
| `model` | Name of the AI model used to generate the response. |
| `inputTokens` | Number of tokens included in the input prompt. |
| `outputTokens` | Number of tokens generated in the response. |
| `totalTokens` | Total token count calculated as the sum of `inputTokens` and `outputTokens`. |
| `reasoningTokens` | Number of tokens consumed for reasoning by the model, when available. |
| `cachedInputTokens` | Number of input tokens served from the model cache, when available. |

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var defaultSuggestions = new string[] { "How do I set achievable goals at work?", "Why do people fly in their dreams?" };

    var allowedMetrics = new[] { "status", "duration", "model", "inputTokens", "outputTokens", "totalTokens" };
}

<div class="aiassist-container" style="height: 420px; width: 550px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-telemetrysettings enable="true" metrics="@allowedMetrics"></e-aiassistview-telemetrysettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with hard-coded usage values.
            var telemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512
            };
            assistObj.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
</script>
```

## Customizing the Report

Use the `beforeReport` callback of the [telemetrySettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_TelemetrySettings) to intercept the generated report before it is rendered. It accepts the report (`TelemetryReport`) as an argument and allows you to modify it, or return `null` to suppress the report delivery. Custom attributes added in this callback will be displayed additionally in the telemetry tooltip.

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var defaultSuggestions = new string[] { "How do I set achievable goals at work?", "Why do people fly in their dreams?" };
}

<div class="aiassist-container" style="height: 420px; width: 550px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-telemetrysettings enable="true" beforeReport="beforeReportHandler"></e-aiassistview-telemetrysettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    // Invoked before every report is delivered. Return the report (modified or not)
    // to deliver it, or null to suppress the report entirely.
    function beforeReportHandler(report) {
        report.customAttributes = { region: 'us-east-1', tenant: 'acme', beta: true };
        return report;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

## Displaying AI Data

The AI AssistView automatically measures the metrics `duration`, `toolCalls`, and `streamingChunks`. To include model and token usage details, configure the optional `TelemetryData` parameter of the [addPromptResponse](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_AddPromptResponse) method. The `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, and `cachedInputTokens` values from this argument are merged into the final telemetry report.

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var defaultSuggestions = new string[] { "How do I set achievable goals at work?", "Why do people fly in their dreams?" };
}

<div class="aiassist-container" style="height: 420px; width: 550px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-telemetrysettings enable="true"></e-aiassistview-telemetrysettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with hard-coded usage values (model and token details).
            // In a real scenario, these values are obtained from the AI service response.
            var telemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512,
                reasoningTokens: 64,
                cachedInputTokens: 32,
                customAttributes: { region: 'us-east-1', tenant: 'acme' }
            };
            assistObj.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
</script>
```

## Custom Attributes

Pass custom key/value pairs through the `customAttributes` field of the [TelemetryData](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_TelemetryData) argument to surface domain-specific metrics (for example, `region`, `tenant`, `sessionId`, or `feature`) inside the telemetry report. Each entry is rendered as its own row in the telemetry tooltip and is included alongside the standard metrics regardless of the `metrics` filter.

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var defaultSuggestions = new string[] { "How do I set achievable goals at work?", "Why do people fly in their dreams?" };
}

<div class="aiassist-container" style="height: 420px; width: 550px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@defaultSuggestions" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-telemetrysettings enable="true"></e-aiassistview-telemetrysettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with domain-specific custom attributes.
            // Each key in customAttributes becomes its own row in the telemetry tooltip.
            var telemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512,
                customAttributes: {
                    region: 'us-east-1',
                    tenant: 'acme',
                    sessionId: 'sess-7841',
                    feature: 'goal-coach'
                }
            };
            assistObj.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
</script>
```

## Key Characteristics

The following are the key behaviors and constraints of the telemetry support:

1. **Turn tracking**: A telemetry turn begins when a prompt is sent (or `executePrompt` is called) and ends when the response is completed or canceled (via the `stop responding` button, `cancelPrompt`, or `failPrompt`). The status is recorded as `completed` or `canceled` respectively in the report.

2. **Telemetry button state**: The telemetry button in the response toolbar displays `— ms` (a disabled state) when no telemetry report is available for the completed or cancelled response, and then shows only the `duration` value once the report is generated.

3. **Tooltip data display**: The telemetry tooltip only displays rows for metrics that have valid values. Count-based metrics — `toolCalls`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`, and `streamingChunks` — are displayed only when their values are positive numbers (greater than 0). Other metrics such as `model` and `status` are displayed whenever they are present.

4. **Duration formatting**: Duration values below 1 second are displayed in `ms`, and values of 1 second or above are displayed in `s` with two decimal places (for example, `500 ms`, `1.25 s`).

5. **Total tokens**: The `totalTokens` metric is automatically computed as the sum of `inputTokens` and `outputTokens` whenever either value is provided through `TelemetryData`.

6. **Metrics filter precedence**: When the `metrics` property of the [telemetrySettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_TelemetrySettings) option is configured, only the specified metrics are retained in the report. However, `status` and `duration` are always retained, and `customAttributes` are always included in the tooltip.

7. **Regenerate flow**: Each regenerated response emits its own telemetry report. The report of the latest completion is bound to the prompt response.
