# Telemetry in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuring Metrics](#configuring-metrics)
- [Customizing the Report](#customizing-the-report)
- [Displaying AI Data](#displaying-ai-data)
  - [Custom Attributes](#custom-attributes)
- [Key Characteristics](#key-characteristics)
- [Best Practices](#best-practices)

## Overview

The telemetry feature in AI AssistView tracks AI interaction metrics such as response `duration`, `toolCalls`, and `model` information, and renders a built-in telemetry button (displaying the duration) in each response toolbar when enabled. Hover over the telemetry button in any response toolbar to view the telemetry report in a tooltip.

Telemetry can be customized using the `telemetrySettings` property, which exposes:

| Property | Type | Description |
|----------|------|-------------|
| `enable` | `boolean` | Turns the telemetry feature on/off. |
| `metrics` | `TelemetryMetric[]` | Controls which metrics are captured and their display order in the tooltip. |
| `beforeReport` | `(report: TelemetryReport) => TelemetryReport \| null` | Invoked before the report is delivered. Return the (modified) report to deliver, or `null` to suppress it. |

### TelemetryMetric values

`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`.

> **Note:** `status` and `duration` are always retained in the report, and `customAttributes` are always shown in the tooltip — even if they are not listed in the `metrics` array.

## Getting Started

Enable telemetry with the `telemetrySettings` property.

### Composition API

```vue
<template>
  <div id="container" style="height: 420px; width: 550px; margin: 0 auto;">
    <ejs-aiassistview
      id="aiAssistView"
      ref="aiassist"
      :prompt-suggestions="suggestions"
      :telemetry-settings="telemetrySettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const aiassist = ref(null);

const suggestions = [
  "How do I set achievable goals at work?",
  "Why do people fly in their dreams?",
  "How can I mitigate the threats during product development?"
];

// Enables telemetry reporting for AI interactions
const telemetrySettings = {
  enable: true
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    const defaultResponse =
      "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
    aiassist.value.addPromptResponse(defaultResponse);
  }, 1000);
};
</script>
```

### Options API

```vue
<template>
  <div id="container" style="height: 420px; width: 550px; margin: 0 auto;">
    <ejs-aiassistview
      id="aiAssistView"
      ref="aiassist"
      :prompt-suggestions="suggestions"
      :telemetry-settings="telemetrySettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>
<script>
import { AIAssistViewComponent } from "@syncfusion/ej2-vue-interactive-chat";

export default {
  components: {
    "ejs-aiassistview": AIAssistViewComponent
  },
  data() {
    return {
      suggestions: [
        "How do I set achievable goals at work?",
        "Why do people fly in their dreams?",
        "How can I mitigate the threats during product development?"
      ],
      // Enables telemetry reporting for AI interactions
      telemetrySettings: {
        enable: true
      }
    };
  },
  methods: {
    onPromptRequest(args) {
      setTimeout(() => {
        const defaultAiassist = this.$refs.aiassist.ej2Instances;
        const defaultResponse =
          "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        defaultAiassist.addPromptResponse(defaultResponse);
      }, 1000);
    }
  }
};
</script>
```

## Configuring Metrics

Use the `metrics` property of `telemetrySettings` to control which metrics are captured in the report. The order of values in the `metrics` array also determines the display order of rows in the telemetry tooltip.

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

### Composition API

```vue
<script setup>
const telemetrySettings = {
  enable: true,
  // Limits the report to the specified metrics and fixes their display order in the tooltip.
  metrics: ["status", "duration", "model", "inputTokens", "outputTokens", "totalTokens"]
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    const defaultResponse = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";

    // Mock telemetry data with hard-coded usage values.
    const telemetryData = {
      model: "gpt-4o",
      inputTokens: 128,
      outputTokens: 512
    };

    aiassist.value.addPromptResponse(defaultResponse, true, telemetryData);
  }, 1000);
};
</script>
```

### Options API

```javascript
data() {
  return {
    telemetrySettings: {
      enable: true,
      // Limits the report to the specified metrics and fixes their display order in the tooltip.
      metrics: ["status", "duration", "model", "inputTokens", "outputTokens", "totalTokens"]
    }
  };
},
methods: {
  onPromptRequest(args) {
    setTimeout(() => {
      const defaultAiassist = this.$refs.aiassist.ej2Instances;
      const defaultResponse = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";

      // Mock telemetry data with hard-coded usage values.
      const telemetryData = {
        model: "gpt-4o",
        inputTokens: 128,
        outputTokens: 512
      };

      defaultAiassist.addPromptResponse(defaultResponse, true, telemetryData);
    }, 1000);
  }
}
```

## Customizing the Report

Use the `beforeReport` event in `telemetrySettings` to intercept the generated report before it is rendered. It accepts the report (`TelemetryReport`) as an argument and lets you modify it, or return `null` to suppress the report delivery. Custom attributes added in this callback are displayed additionally in the telemetry tooltip.

### Composition API

```vue
<script setup>
const telemetrySettings = {
  enable: true,
  // Invoked before every report is delivered. Return the report (modified or not)
  // to deliver it, or null to suppress the report entirely.
  beforeReport: (report) => {
    report.customAttributes = { region: "us-east-1", tenant: "acme", beta: true };
    return report;
  }
};
</script>
```

### Options API

```javascript
data() {
  return {
    telemetrySettings: {
      enable: true,
      // Invoked before every report is delivered. Return the report (modified or not)
      // to deliver it, or null to suppress the report entirely.
      beforeReport: function (report) {
        report.customAttributes = { region: "us-east-1", tenant: "acme", beta: true };
        return report;
      }
    }
  };
}
```

### Suppressing a Report

Returning `null` from `beforeReport` cancels delivery of the report for the current turn:

```javascript
const telemetrySettings = {
  enable: true,
  beforeReport: (report) => {
    // Skip telemetry for system/test prompts.
    if (report.status === "canceled") {
      return null;
    }
    return report;
  }
};
```

## Displaying AI Data

The AI AssistView automatically measures `duration`, `toolCalls`, and `streamingChunks`. To include model and token usage details, pass a `TelemetryData` object as the third argument to `addPromptResponse`. The `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, and `cachedInputTokens` values from this object are merged into the final telemetry report.

### addPromptResponse signature with telemetry

```typescript
addPromptResponse(
  outputResponse: string,
  isFinalUpdate?: boolean,
  telemetryData?: TelemetryData
): void
```

### TelemetryData fields

| Field | Type | Description |
|-------|------|-------------|
| `model` | `string` | Name of the AI model (for example, `gpt-4o`). |
| `inputTokens` | `number` | Tokens included in the input prompt. |
| `outputTokens` | `number` | Tokens generated in the response. |
| `reasoningTokens` | `number` | Tokens consumed for reasoning, when available. |
| `cachedInputTokens` | `number` | Input tokens served from the model cache, when available. |
| `customAttributes` | `Record<string, unknown>` | Custom key/value pairs surfaced as their own rows. |

### Composition API

```vue
<script setup>
const telemetrySettings = { enable: true };

const onPromptRequest = (args) => {
  setTimeout(() => {
    const defaultResponse = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";

    // Mock telemetry data with hard-coded usage values (model and token details).
    // In a real scenario, these values are obtained from the AI service response.
    const telemetryData = {
      model: "gpt-4o",
      inputTokens: 128,
      outputTokens: 512,
      reasoningTokens: 64,
      cachedInputTokens: 32,
      customAttributes: { region: "us-east-1", tenant: "acme" }
    };

    aiassist.value.addPromptResponse(defaultResponse, true, telemetryData);
  }, 1000);
};
</script>
```

### Options API

```javascript
data() {
  return { telemetrySettings: { enable: true } };
},
methods: {
  onPromptRequest(args) {
    setTimeout(() => {
      const defaultAiassist = this.$refs.aiassist.ej2Instances;
      const defaultResponse = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";

      // Mock telemetry data with hard-coded usage values (model and token details).
      // In a real scenario, these values are obtained from the AI service response.
      const telemetryData = {
        model: "gpt-4o",
        inputTokens: 128,
        outputTokens: 512,
        reasoningTokens: 64,
        cachedInputTokens: 32,
        customAttributes: { region: "us-east-1", tenant: "acme" }
      };

      defaultAiassist.addPromptResponse(defaultResponse, true, telemetryData);
    }, 1000);
  }
}
```

### Real-world integration with OpenAI

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: args.prompt }]
      })
    });
    const data = await response.json();
    const choice = data.choices[0];
    const usage = data.usage ?? {};

    aiassist.value.addPromptResponse(choice.message.content, true, {
      model: data.model,
      inputTokens: usage.prompt_tokens,
      outputTokens: usage.completion_tokens,
      customAttributes: {
        requestId: data.id,
        finishReason: choice.finish_reason
      }
    });
  } catch (error) {
    aiassist.value.addPromptResponse("Error: " + error.message, true);
  }
};
```

### Custom Attributes

Pass custom key/value pairs through the `customAttributes` field of the `TelemetryData` argument to surface domain-specific metrics (for example, `region`, `tenant`, `sessionId`, or `feature`) inside the telemetry report. Each entry is rendered as its own row in the telemetry tooltip and is included alongside the standard metrics regardless of the `metrics` filter.

```vue
<script setup>
const telemetrySettings = { enable: true };

const onPromptRequest = (args) => {
  setTimeout(() => {
    const defaultResponse = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";

    // Mock telemetry data with domain-specific custom attributes.
    // Each key in customAttributes becomes its own row in the telemetry tooltip.
    const telemetryData = {
      model: "gpt-4o",
      inputTokens: 128,
      outputTokens: 512,
      customAttributes: {
        region: "us-east-1",
        tenant: "acme",
        sessionId: "sess-7841",
        feature: "goal-coach"
      }
    };

    aiassist.value.addPromptResponse(defaultResponse, true, telemetryData);
  }, 1000);
};
</script>
```

## Key Characteristics

The following are the key behaviors and constraints of the telemetry support:

1. **Turn tracking** — A telemetry turn begins when a prompt is sent (or `executePrompt` is called) and ends when the response is completed or canceled (via the `stop responding` button, `cancelPrompt`, or `failPrompt`). The status is recorded as `completed` or `canceled` respectively in the report.

2. **Telemetry button state** — The telemetry button in the response toolbar displays `— ms` (a disabled state) when no telemetry report is available for the completed or cancelled response, and then shows only the `duration` value once the report is generated.

3. **Tooltip data display** — The telemetry tooltip only displays rows for metrics that have valid values. Count-based metrics (`toolCalls`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`, and `streamingChunks`) are displayed only when their values are positive numbers (greater than 0). Other metrics such as `model` and `status` are displayed whenever they are present.

4. **Duration formatting** — Duration values below 1 second are displayed in `ms`, and values of 1 second or above are displayed in `s` with two decimal places (for example, `500 ms`, `1.25 s`).

5. **Total tokens** — The `totalTokens` metric is automatically computed as the sum of `inputTokens` and `outputTokens` whenever either value is provided through `TelemetryData`.

6. **Metrics filter precedence** — When the `metrics` property of `telemetrySettings` is configured, only the specified metrics are retained in the report. However, `status` and `duration` are always retained, and `customAttributes` are always included in the tooltip.

7. **Regenerate flow** — Each regenerated response emits its own telemetry report. The report of the latest completion is bound to the prompt response.

## Best Practices

### 1. Always Set a `model` Value

```javascript
const telemetryData = {
  model: "gpt-4o", // Always identify the model for accurate reporting.
  inputTokens: 128,
  outputTokens: 512
};
```

### 2. Pass Real Token Counts from Your AI Service

```javascript
// Map OpenAI's `usage` payload into TelemetryData.
const telemetryData = {
  model: data.model,
  inputTokens: data.usage?.prompt_tokens,
  outputTokens: data.usage?.completion_tokens,
  cachedInputTokens: data.usage?.prompt_tokens_details?.cached_tokens
};
```

### 3. Use `customAttributes` for Domain Context

```javascript
const telemetryData = {
  model: "gpt-4o",
  inputTokens: 128,
  outputTokens: 512,
  customAttributes: {
    tenant: "acme",
    region: "us-east-1",
    feature: "goal-coach"
  }
};
```

### 4. Suppress Reports You Don't Need

```javascript
const telemetrySettings = {
  enable: true,
  beforeReport: (report) => {
    // Skip telemetry for short test responses.
    if (report.duration && report.duration < 100) {
      return null;
    }
    return report;
  }
};
```

### 5. Combine with `stop responding` and Cancellation

Because the telemetry report is generated only when a turn completes (or is canceled), make sure your `promptRequest` handler either:

- Calls `addPromptResponse(..., true, telemetryData)` to finalize the turn, or
- Calls `cancelPrompt()` / `failPrompt()` so the component records a `canceled` status.
