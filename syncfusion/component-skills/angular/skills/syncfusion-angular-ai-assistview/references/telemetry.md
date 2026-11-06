# Telemetry in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuring Metrics](#configuring-metrics)
- [Customizing the Report](#customizing-the-report)
- [Displaying AI Data](#displaying-ai-data)
- [Custom Attributes](#custom-attributes)
- [Key Characteristics](#key-characteristics)

---

## Overview

The **telemetry** feature in AI AssistView tracks AI interaction metrics such as response duration, tool calls, and model information. It renders a built-in telemetry button (displaying the duration) in each response toolbar when enabled and can be customized using the `telemetrySettings` properties (`metrics` and `beforeReport` event).

You can hover over the telemetry button in any response toolbar to view the telemetry report in a tooltip.

### Enabling Telemetry

Set `telemetrySettings.enable` to `true` to display the telemetry button in the response toolbar.

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, TelemetrySettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [AIAssistViewModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div ejs-aiassistview
        #telemetryAIAssistView
        id="aiAssistView"
        [promptSuggestions]="promptSuggestions"
        [enableStreaming]="enableStreaming"
        [toolbarSettings]="toolbarSettings"
        [telemetrySettings]="telemetrySettings"
        (promptRequest)="onPromptRequest($event)">
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Telemetry</h3>
                <i>Send a prompt or pick a suggestion to see telemetry metrics for the turn.</i>
            </div>
        </ng-template>
    </div>`
})
export class AppComponent {
    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView!: AIAssistViewComponent;

    public enableStreaming: boolean = true;
    public promptSuggestions: string[] = [
        'Explain the basics of quantum computing.',
        'Suggest a healthy dinner recipe for tonight.',
        'How do I improve my public speaking skills?'
    ];
    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: () => {
            if (this.telemetryAIAssistView) {
                this.telemetryAIAssistView.prompts = [];
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }
    };
    public telemetrySettings: TelemetrySettingsModel = { enable: true };

    public onPromptRequest = (args: PromptRequestEventArgs): void => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service and pass usage data through the addPromptResponse third parameter to populate the telemetry report.';
            if (this.telemetryAIAssistView) {
                this.telemetryAIAssistView.addPromptResponse(defaultResponse, true);
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }, 1000);
    };
}
```

---

## Configuring Metrics

You can control which telemetry metrics are captured in the report using the `metrics` property of the `telemetrySettings` option. It accepts one or more values from the `TelemetryMetric` type.

Additionally, the **order of metrics in the `metrics` array also determines the display order of rows** in the telemetry tooltip.

### Available Metrics

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

### Example: Configuring Metrics

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, TelemetrySettingsModel, TelemetryMetric } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AIAssistViewModule],
    template: `
        <ejs-aiassistview
            #telemetryAIAssistView
            id="aiAssistView"
            [promptSuggestions]="promptSuggestions"
            [telemetrySettings]="telemetrySettings"
            (promptRequest)="onPromptRequest($event)">
            <ng-template #bannerTemplate>
                <div class="banner-content">
                    <div class="e-icons e-assistview-icon"></div>
                    <h3>AI Telemetry</h3>
                    <i>Customize which metrics are shown in the tooltip using the metrics array.</i>
                </div>
            </ng-template>
        </ejs-aiassistview>
    `
})
export class App {
    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView!: AIAssistViewComponent;
    public promptSuggestions: string[] = [
        'Explain the basics of quantum computing.',
        'Suggest a healthy dinner recipe for tonight.',
        'How do I improve my public speaking skills?'
    ];
    public telemetrySettings: TelemetrySettingsModel = {
        enable: true,
        metrics: [
            'duration',
            'model',
            'inputTokens',
            'outputTokens',
            'totalTokens'
        ] as TelemetryMetric[]
    };

    public onPromptRequest = (args: PromptRequestEventArgs): void => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            const telemetryData: TelemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512
            };
            if (this.telemetryAIAssistView) {
                this.telemetryAIAssistView.addPromptResponse(defaultResponse, true, telemetryData);
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }, 1000);
    };
}
```

---

## Customizing the Report

Use the `beforeReport` event in the `telemetrySettings` to intercept the generated report before it is rendered. It accepts the `TelemetryReport` as an argument and allows you to:

- Modify the report
- Return `null` to suppress the report delivery
- Add custom attributes (which are then displayed in the telemetry tooltip)

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, TelemetrySettingsModel, TelemetryReport } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [AIAssistViewModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div ejs-aiassistview
        #telemetryAIAssistView
        id="aiAssistView"
        [promptSuggestions]="promptSuggestions"
        [telemetrySettings]="telemetrySettings"
        (promptRequest)="onPromptRequest($event)">
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Telemetry</h3>
                <i>The beforeReport callback intercepts and augments the telemetry report before render.</i>
            </div>
        </ng-template>
    </div>`
})
export class AppComponent {
    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView!: AIAssistViewComponent;

    public promptSuggestions: string[] = [
        'Explain the basics of quantum computing.',
        'Suggest a healthy dinner recipe for tonight.',
        'How do I improve my public speaking skills?'
    ];
    public telemetrySettings: TelemetrySettingsModel = {
        enable: true,
        beforeReport: (report: TelemetryReport) => {
            // Add custom attributes and suppress the report by returning null
            report.customAttributes = {
                region: 'us-east-1',
                tenant: 'acme',
                beta: true
            };
            return report;
        }
    };

    public onPromptRequest = (args: PromptRequestEventArgs): void => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            if (this.telemetryAIAssistView) {
                this.telemetryAIAssistView.addPromptResponse(defaultResponse, true);
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }, 1000);
    };
}
```

---

## Displaying AI Data

The AI AssistView automatically measures metrics such as `duration`, `toolCalls`, and `streamingChunks`. To include **model and token usage details**, configure the optional third parameter `TelemetryData` to the `addPromptResponse` method.

The `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, and `cachedInputTokens` values from this argument are merged into the final telemetry report.

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, TelemetrySettingsModel, TelemetryData } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [AIAssistViewModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div ejs-aiassistview
        #telemetryAIAssistView
        id="aiAssistView"
        [promptSuggestions]="promptSuggestions"
        [telemetrySettings]="telemetrySettings"
        (promptRequest)="onPromptRequest($event)">
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Telemetry</h3>
                <i>Pass usage data through the third parameter of addPromptResponse to enrich reports.</i>
            </div>
        </ng-template>
    </div>`
})
export class AppComponent {
    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView!: AIAssistViewComponent;

    public promptSuggestions: string[] = [
        'Explain the basics of quantum computing.',
        'Suggest a healthy dinner recipe for tonight.',
        'How do I improve my public speaking skills?'
    ];
    public telemetrySettings: TelemetrySettingsModel = { enable: true };

    public onPromptRequest = (args: PromptRequestEventArgs): void => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            if (this.telemetryAIAssistView) {
                const usageData: TelemetryData = {
                    model: 'gpt-4o-mini',
                    inputTokens: 128,
                    outputTokens: 96,
                    reasoningTokens: 24,
                    cachedInputTokens: 16
                };
                this.telemetryAIAssistView.addPromptResponse(defaultResponse, true, usageData);
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }, 1000);
    };
}
```

---

## Custom Attributes

Pass custom key/value pairs through the `customAttributes` field of the `TelemetryData` argument to surface domain-specific metrics (for example, `region`, `tenant`, `sessionId`, or `feature`) inside the telemetry report.

Each entry is rendered as its own row in the telemetry tooltip and is **included alongside the standard metrics regardless of the `metrics` filter**.

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, TelemetrySettingsModel, TelemetryData } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [AIAssistViewModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div ejs-aiassistview
        #telemetryAIAssistView
        id="aiAssistView"
        [promptSuggestions]="promptSuggestions"
        [telemetrySettings]="telemetrySettings"
        (promptRequest)="onPromptRequest($event)">
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Telemetry</h3>
                <i>Pass domain-specific attributes via TelemetryData customAttributes.</i>
            </div>
        </ng-template>
    </div>`
})
export class AppComponent {
    @ViewChild('telemetryAIAssistView')
    public telemetryAIAssistView!: AIAssistViewComponent;

    public promptSuggestions: string[] = [
        'Explain the basics of quantum computing.',
        'Suggest a healthy dinner recipe for tonight.',
        'How do I improve my public speaking skills?'
    ];
    public telemetrySettings: TelemetrySettingsModel = { enable: true };

    public onPromptRequest = (args: PromptRequestEventArgs): void => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            if (this.telemetryAIAssistView) {
                const usageData: TelemetryData = {
                    model: 'gpt-4o-mini',
                    customAttributes: {
                        region: 'us-east',
                        tenant: 'acme-corp',
                        sessionId: 'demo-session-42',
                        feature: 'ai-assistview'
                    }
                };
                this.telemetryAIAssistView.addPromptResponse(defaultResponse, true, usageData);
                this.telemetryAIAssistView.promptSuggestions = [
                    'Explain the basics of quantum computing.',
                    'Suggest a healthy dinner recipe for tonight.',
                    'How do I improve my public speaking skills?'
                ];
            }
        }, 1000);
    };
}
```

---

## Key Characteristics

The following are the key behaviors and constraints of the telemetry support:

1. **Turn tracking**: A telemetry turn begins when a prompt is sent (or `executePrompt` is called) and ends when the response is **completed or canceled** (via the `stop responding` button, `cancelPrompt`, or `failPrompt`). The status is recorded as `completed` or `canceled` respectively in the report.

2. **Telemetry button state**: The telemetry button in the response toolbar displays `— ms` (a disabled state) when no telemetry report is available for the completed or cancelled response, and then shows only the `duration` value once the report is generated.

3. **Tooltip data display**: The telemetry tooltip only displays rows for metrics that have valid values:
   - Count-based metrics (`toolCalls`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`, `streamingChunks`) are displayed only when their values are **positive numbers (> 0)**.
   - Other metrics such as `model` and `status` are displayed whenever they are present.

4. **Duration formatting**: Duration values below 1 second are displayed in `ms`; values of 1 second or above are displayed in `s` with two decimal places (for example, `500 ms`, `1.25 s`).

5. **Total tokens**: The `totalTokens` metric is automatically computed as the sum of `inputTokens` and `outputTokens` whenever either value is provided through `TelemetryData`.

6. **Metrics filter precedence**: When the `metrics` property of `telemetrySettings` is configured, only the specified metrics are retained in the report. However:
   - `status` and `duration` are **always retained**.
   - `customAttributes` are **always included** in the tooltip.

7. **Regenerate flow**: Each regenerated response emits its own telemetry report. The report of the latest completion is bound to the prompt response.

---

## API Surface Summary

| Member | Type | Description |
|--------|------|-------------|
| `telemetrySettings` | `TelemetrySettingsModel` | Input property on the component to enable and configure telemetry. |
| `telemetrySettings.enable` | `boolean` | Toggles the telemetry button in the response toolbar. |
| `telemetrySettings.metrics` | `TelemetryMetric[]` | Filters which metrics are captured and shown, in display order. |
| `telemetrySettings.beforeReport` | `(report: TelemetryReport) => TelemetryReport \| null` | Intercepts and mutates (or suppresses) the report before render. |
| `TelemetryMetric` | string union | One of: `status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`. |
| `TelemetryReport` | object | The resolved report passed to `beforeReport`. Supports a `customAttributes` map. |
| `TelemetryData` | object | Optional 3rd argument to `addPromptResponse`. Fields: `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, `cachedInputTokens`, `customAttributes`. |
| `addPromptResponse(response, isFinalUpdate?, telemetryData?)` | method | Pass `telemetryData` to enrich the report for the response. |
