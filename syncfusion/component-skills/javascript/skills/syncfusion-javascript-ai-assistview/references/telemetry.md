# Telemetry

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuring Metrics](#configuring-metrics)
  - [TelemetryMetric Type](#telemetrymetric-type)
- [Customizing the Report](#customizing-the-report)
- [Displaying AI Data](#displaying-ai-data)
  - [TelemetryData Interface](#telemetrydata-interface)
  - [Custom Attributes](#custom-attributes)
- [Key Characteristics](#key-characteristics)

The telemetry feature in AI AssistView tracks AI interaction metrics such as response duration, tool calls, and model/token information, and renders a built-in telemetry button (displaying the duration) in each response toolbar when enabled. It can be customized using the `telemetrySettings` property, which exposes a `metrics` filter and a `beforeReport` event.

You can hover over the telemetry button in any response toolbar to view the telemetry report in a tooltip.

---

## Overview

Telemetry is configured through the `telemetrySettings` property of the AIAssistView. When enabled, every prompt-response turn automatically measures interaction metrics and renders a small button on the response toolbar that shows the duration. Hovering the button opens a tooltip with the full report.

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the AI Assist control with telemetry enabled
const aiAssistView: AIAssistView = new AIAssistView({
    height: '420px',
    width: '550px',
    promptSuggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?",
        "How can I mitigate the threats during product development?"
    ],
    // Enables telemetry reporting for AI interactions
    telemetrySettings: {
        enable: true
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#gettingstarted');
```

## Configuring Metrics

You can control which telemetry metrics are captured in the report using the `metrics` property of the [`telemetrySettings`](../api/ai-assistview/telemetrySettings) option. It accepts one or more values from the `TelemetryMetric` type, such as `status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, and `totalTokens`.

Additionally, the order of metrics in the `metrics` array also determines the display order of rows in the telemetry tooltip.

### TelemetryMetric Type

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

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryData, TelemetryMetric } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the AI Assist control with telemetry metrics configured
const aiAssistView: AIAssistView = new AIAssistView({
    height: '420px',
    width: '550px',
    promptSuggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?"
    ],
    telemetrySettings: {
        enable: true,
        // Limits the report to the specified metrics and fixes their display order in the tooltip.
        metrics: ['status', 'duration', 'model', 'inputTokens', 'outputTokens', 'totalTokens'] as TelemetryMetric[]
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with hard-coded usage values.
            const telemetryData: TelemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512
            };
            aiAssistView.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
});

aiAssistView.appendTo('#metrics');
```

---

## Customizing the Report

Use the `beforeReport` event in the [`telemetrySettings`](../api/ai-assistview/telemetrySettings) to intercept the generated report before it is rendered. It accepts the report (`TelemetryReport`) as an argument and allows you to modify it, or return `null` to suppress the report delivery. Custom attributes added in this callback will be displayed additionally in the telemetry tooltip.

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryReport } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the AI Assist control with telemetry enabled
const aiAssistView: AIAssistView = new AIAssistView({
    height: '420px',
    width: '550px',
    promptSuggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?"
    ],
    telemetrySettings: {
        enable: true,
        // Invoked before every report is delivered. Return the report (modified or not)
        // to deliver it, or null to suppress the report entirely.
        beforeReport: (report: TelemetryReport): TelemetryReport | null => {
            report.customAttributes = { region: 'us-east-1', tenant: 'acme', beta: true };
            return report;
        }
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#beforereport');
```

### TelemetryReport Interface

```typescript
interface TelemetryReport {
    status?: 'completed' | 'cancelled';
    duration?: number;                       // milliseconds
    toolCalls?: number;
    streamingChunks?: number;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    reasoningTokens?: number;
    cachedInputTokens?: number;
    customAttributes?: { [key: string]: any };
}
```

---

## Displaying AI Data

The AI AssistView automatically measures the metrics such as `duration`, `toolCalls`, and `streamingChunks`. To include model and token usage details, configure the optional parameter `TelemetryData` to the [`addPromptResponse`](../api/ai-assistview#addpromptresponse) method. The `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, and `cachedInputTokens` values from this argument are merged into the final telemetry report.

### TelemetryData Interface

```typescript
interface TelemetryData {
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    reasoningTokens?: number;
    cachedInputTokens?: number;
    customAttributes?: { [key: string]: any };
}
```

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryData } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the AI Assist control with telemetry enabled
const aiAssistView: AIAssistView = new AIAssistView({
    height: '420px',
    width: '550px',
    promptSuggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?"
    ],
    telemetrySettings: {
        enable: true
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with hard-coded usage values (model and token details).
            // In a real scenario, these values are obtained from the AI service response.
            const telemetryData: TelemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512,
                reasoningTokens: 64,
                cachedInputTokens: 32,
                customAttributes: { region: 'us-east-1', tenant: 'acme' }
            };
            aiAssistView.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
});

aiAssistView.appendTo('#usagedata');
```

### Custom Attributes

Pass custom key/value pairs through the `customAttributes` field of the [`TelemetryData`](../api/ai-assistview#addpromptresponse) argument to surface domain-specific metrics (for example, `region`, `tenant`, `sessionId`, or `feature`) inside the telemetry report. Each entry is rendered as its own row in the telemetry tooltip and is included alongside the standard metrics regardless of the `metrics` filter.

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryData } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the AI Assist control with telemetry enabled and custom attributes attached
const aiAssistView: AIAssistView = new AIAssistView({
    height: '420px',
    width: '550px',
    promptSuggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?"
    ],
    telemetrySettings: {
        enable: true
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            // Mock telemetry data with domain-specific custom attributes.
            // Each key in customAttributes becomes its own row in the telemetry tooltip.
            const telemetryData: TelemetryData = {
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
            aiAssistView.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
});

aiAssistView.appendTo('#customattributes');
```

---

## Key Characteristics

The following are the key behaviors and constraints of the telemetry support:

1. **Turn tracking**: A telemetry turn begins when a prompt is sent (or `executePrompt` is called) and ends when the response is completed or cancelled (via the `stop responding` button, `cancelPrompt`, or `failPrompt`). The status is recorded as `completed` or `cancelled` respectively in the report.

2. **Telemetry button state**: The telemetry button in the response toolbar displays `— ms` (a disabled state) when no telemetry report is available for the completed or cancelled response, and then shows only the `duration` value once the report is generated.

3. **Tooltip data display**: The telemetry tooltip only displays rows for metrics that have valid values. Count-based metrics `toolCalls`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`, and `streamingChunks` are displayed only when their values are positive numbers (greater than 0). Other metrics such as `model` and `status` are displayed whenever they are present.

4. **Duration formatting**: Duration values below 1 second are displayed in `ms`, and values of 1 second or above are displayed in `s` with two decimal places (for example, `500 ms`, `1.25 s`).

5. **Total tokens**: The `totalTokens` metric is automatically computed as the sum of `inputTokens` and `outputTokens` whenever either value is provided through `TelemetryData`.

6. **Metrics filter precedence**: When the `metrics` property of the [`telemetrySettings`](../api/ai-assistview/telemetrySettings) option is configured, only the specified metrics are retained in the report. However, `status` and `duration` are always retained, and `customAttributes` are always included in the tooltip.

7. **Regenerate flow**: Each regenerated response emits its own telemetry report. The report of the latest completion is bound to the prompt response.
