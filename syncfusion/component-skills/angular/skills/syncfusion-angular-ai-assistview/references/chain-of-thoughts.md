# Chain of Thoughts in Angular AI AssistView Component

The AI AssistView supports rendering **Chain of Thoughts** (also called `Thinking`) blocks, allowing you to visualize the model's reasoning process step by step before the final response is generated. This is ideal for extended reasoning models (such as Claude 3.5, GPT-o1, and similar) that expose intermediate reasoning stages.

> The `AssistThinking` module must be injected into the AI AssistView using `AIAssistView.Inject(AssistThinking)` to utilize this support.

---

## Table of Contents
- [Enable Chain of Thoughts](#enable-chain-of-thoughts)
- [Types of Response Blocks](#types-of-response-blocks)
- [Configuring the Thinking Block](#configuring-the-thinking-block)
- [Adding Stages](#adding-stages)
- [Adding Stage Status](#adding-stage-status)
- [Adding Context Items](#adding-context-items)
- [Configuring the Thinking Block Template](#configuring-the-thinking-block-template)
- [Configuring the Item Template](#configuring-the-item-template)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

---

## Enable Chain of Thoughts

Import and inject the `AssistThinking` module before bootstrapping the component.

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewAllModule, AIAssistViewComponent, AIAssistView, AssistThinking } from '@syncfusion/ej2-angular-interactive-chat';

AIAssistView.Inject(AssistThinking);

@Component({
    imports: [ AIAssistViewAllModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div id="container">
      <br />
      <ejs-aiassistview
        id="aiAssistView"
        #assistInstance
        [prompts]="prompts"
        (promptRequest)="onPromptRequest($event)">
      </ejs-aiassistview>
    </div>
  `
})
export class AppComponent {
  @ViewChild('assistInstance')
  public assistInstance: AIAssistViewComponent;

  public prompts: any[] = [
    {
      prompt: 'Explain the water cycle.',
      response: 'The water cycle describes how water moves continuously through the environment via evaporation, condensation, and precipitation.',
      blocks: [
        {
          blockType: 'thinking',
          title: 'Understanding your request',
          collapsed: true,
          collapsible: true,
          isActive: false,
          stages: [
            {
              id: 'step1',
              status: 'completed',
              iconCss: 'e-icons e-check',
              content: 'Identified request as a water cycle explanation.'
            }
          ]
        },
        {
          blockType: 'thinking',
          title: 'Summarizing key stages',
          collapsed: true,
          collapsible: true,
          isActive: false,
          stages: [
            {
              id: 'step2',
              status: 'completed',
              iconCss: 'e-icons e-check',
              content: 'Summarized key stages concisely.'
            }
          ]
        },
        {
          blockType: 'thinking',
          title: 'Composing response',
          collapsed: true,
          collapsible: true,
          isActive: false,
          stages: [
            {
              id: 'step3',
              status: 'completed',
              iconCss: 'e-icons e-check',
              content: 'Composed a clear single-paragraph response.'
            }
          ]
        }
      ]
    }
  ];

  public onPromptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      this.assistInstance.addPromptResponse({
        response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.'
      });
    }, 1000);
  };
}
```

---

## Types of Response Blocks

A single response may contain `Thinking`, `Text`, and `tool` blocks in the `blocks` array. The component renders them in the order they appear.

| Block Type | Description |
|---|---|
| `TextBlock` | Renders plain/markdown text content. |
| `ToolBlock` | Represents a tool invocation block. |
| `ThinkingBlock` | Represents a collapsible reasoning/thinking block. |

> When only `blocks` are provided (no `response` text), the component renders the blocks directly and skips the default text-response rendering path. When both `blocks` and `response` are provided, the blocks are rendered first, followed by the response text.

---

## Configuring the Thinking Block

Use the `Thinking` block type in the `blocks` array of the `addPromptResponse` method to dynamically push thinking blocks into the component at runtime. Pass an object containing a `blocks` array, and set the second argument `isFinalUpdate` to `false` during streaming and `true` for the final update.

### ThinkingBlock Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | auto-generated | Unique identifier for the block, used for collapsing/expanding state. |
| `blockType` | `'thinking'` | — | Identifies this block as a thinking block. Required. |
| `title` | `string` | `'Thinking...'` | Heading text shown in the collapsible header. |
| `content` | `string` | — | Markdown text rendered as a description beneath the stages. |
| `isActive` | `boolean` | `false` | When `true`, a Syncfusion spinner is shown inside the thinking header to indicate the reasoning is still in progress. |
| `collapsed` | `boolean` | `true` | Initial collapsed state of the thinking block. |
| `collapsible` | `boolean` | `true` | Whether the block can be expanded or collapsed by the user. |
| `stages` | `ThinkingStage[]` | — | Array of reasoning stages rendered using the Timeline component. |

### Streaming Multi-Step Thinking with `addPromptResponse`

Push incremental thinking blocks as reasoning progresses, then deliver the final response text with `isFinalUpdate` set to `true`.

```typescript
import { Component, ViewChild } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AIAssistViewAllModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { AIAssistView, AssistThinking } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
AIAssistView.Inject(AssistThinking);

@Component({
  imports: [AIAssistViewAllModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
      <ejs-aiassistview
        id="aiAssistView"
        #assistInstance
        [promptSuggestions]="promptSuggestions"
        (promptRequest)="onPromptRequest($event)">
      </ejs-aiassistview>
    </div>
  `
})
export class AppComponent {
  @ViewChild('assistInstance')
  public assistInstance!: AIAssistViewComponent;

  public promptSuggestions: string[] = [
    'Build a modern dashboard for my business',
    'Create a login page with validation',
    'Make a task management board'
  ];

  public onPromptRequest = (args: PromptRequestEventArgs) => {
    // Step 1 — reasoning starts (isFinalUpdate: false)
    setTimeout(() => {
      this.assistInstance.addPromptResponse({
        blocks: [
          {
            blockType: 'thinking',
            title: 'Understanding your request',
            collapsible: true,
            collapsed: false,
            isActive: true,
            stages: [
              { id: 'step1', status: 'inprogress', content: 'Identified request as a business dashboard requirement.' }
            ]
          }
        ]
      }, false);

      // Step 2 — additional stage appended
      setTimeout(() => {
        this.assistInstance.addPromptResponse({
          blocks: [
            {
              blockType: 'thinking',
              title: 'Understanding your request',
              collapsible: true,
              collapsed: true,
              isActive: false,
              stages: [
                { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
              ]
            },
            {
              blockType: 'thinking',
              title: 'Selecting UI components',
              collapsible: true,
              collapsed: false,
              isActive: true,
              stages: [
                { id: 'step2', status: 'inprogress', content: 'Selecting the best UI components for the dashboard.' }
              ]
            }
          ]
        }, false);

        // Step 3 — final update with response text (isFinalUpdate: true)
        setTimeout(() => {
          this.assistInstance.addPromptResponse({
            blocks: [
              {
                blockType: 'thinking',
                title: 'Understanding your request',
                collapsible: true,
                collapsed: true,
                isActive: false,
                stages: [
                  { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                ]
              },
              {
                blockType: 'thinking',
                title: 'Selecting UI components',
                collapsible: true,
                collapsed: true,
                isActive: false,
                stages: [
                  { id: 'step2', status: 'completed', content: 'Selecting the best UI components for the dashboard.' }
                ]
              },
              {
                blockType: 'thinking',
                title: 'Finalizing output',
                collapsible: true,
                collapsed: true,
                isActive: false,
                stages: [
                  { id: 'step3', status: 'completed', iconCss: 'e-icons e-check', content: 'Generated final dashboard structure successfully.' }
                ]
              }
            ],
            response: '## Business Dashboard Structure\n\n**Generated successfully.**'
          }, true);
        }, 1000);
      }, 1000);
    }, 1000);
  };
}
```

---

## Adding Stages

Each entry in the `stages` array represents a single reasoning step.

### ThinkingStage Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the stage. |
| `content` | `string` | Markdown content for this stage. Supports `{index}` placeholders for inline context items. |
| `status` | `'completed'` \| `'inprogress'` \| `'failed'` | Controls the icon/spinner shown on the timeline dot. |
| `iconCss` | `string` | Custom CSS class for the timeline dot icon, overrides the default status icon. |
| `editableContext` | `ThinkingContextItem[]` | Inline context items injected into the stage content via `{index}` placeholders. |

## Adding Stage Status

Each thinking stage carries a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses.

---

## Adding Context Items

Inline context items are optionally clickable badges that appear inline within stage content. They are defined in the `editableContext` array of a `ThinkingStage` and are injected into the `content` string using `{index}` placeholders (the zero-based position in the `editableContext` array).

### ThinkingContextItem Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | `string` | Tooltip shown on hover. |
| `clickable` | `boolean` | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `ThinkingContextBadge` | Status badge appended to the item: `'success'`, `'warning'`, `'failed'`, `'pending'`, `'info'`, or `'none'`. |

Example stage using `editableContext` with `{index}` placeholders:

```typescript
{
  id: 'step2',
  status: 'inprogress',
  iconCss: 'e-icons e-check',
  content: 'Selected {0}, {1}, and {2} for dashboard layout.',
  editableContext: [
    { type: 'tool', name: 'Charts', value: 'Analytics visualization' },
    { type: 'tool', name: 'Grid', value: 'Tabular data' },
    { type: 'tool', name: 'Cards', value: 'KPI metrics' }
  ]
}
```

### Configuring `editableContextClicked`

The `editableContextClicked` event fires when a user clicks on an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

| Event Argument | Type | Description |
|----------------|------|-------------|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

```ts
onEditableContextClicked(args: any): void {
    if (args.contextItem.type === 'file') {
        this.openFilePreview(args.contextItem.name);
    }
}
```

---

## Configuring the Thinking Block Template

Use the `blockTemplate` property to customize thinking block rendering.

### Template Context Properties

| Property | Type | Description |
|----------|------|-------------|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | `number` | Zero-based index of this block in the `blocks` array. |

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIAssistViewAllModule, AIAssistViewComponent, PromptRequestEventArgs, AssistThinking, AIAssistView } from '@syncfusion/ej2-angular-interactive-chat';

AIAssistView.Inject(AssistThinking);

@Component({
    imports: [ AIAssistViewAllModule, CommonModule ],
    standalone: true,
    selector: 'app-root',
    template: `
      <div id="container" style="height: 600px; width: 100%;">
        <br />
        <ejs-aiassistview
          id="aiAssistView"
          #assistInstance
          [prompts]="prompts"
          [blockTemplate]="blockTemplate"
          (promptRequest)="onPromptRequest($event)">
        </ejs-aiassistview>
      </div>

      <!-- Block Template - Only for thinking blocks -->
      <ng-template #blockTemplate let-data>
        <ng-container *ngIf="data.block.blockType === 'thinking'; else defaultBlock">
          <div class="custom-thinking-block">
            <div class="custom-thinking-title">
              <span class="e-icons" [ngClass]="data.block.isActive ? 'e-spinner' : 'e-check'"></span>
              <strong>{{ data.block.title || 'Thinking' }}</strong>
            </div>
            <ul class="custom-thinking-stages">
              <li *ngFor="let stage of data.block.stages || []">
                {{ stage.content }}
              </li>
            </ul>
          </div>
        </ng-container>

        <!-- Default rendering for other block types -->
        <ng-template #defaultBlock>
          <div>{{ data.block.title }}</div>
        </ng-template>
      </ng-template>
    `
})
export class AppComponent {
  @ViewChild('assistInstance')
  public assistInstance: AIAssistViewComponent;

  @ViewChild('blockTemplate')
  public blockTemplate: any;

  public prompts: any[] = [
    {
      prompt: 'What is the capital of France?',
      response: 'The capital of France is Paris.',
      blocks: [
        {
          blockType: 'thinking',
          title: 'Fact lookup',
          isActive: false,
          collapsed: false,
          collapsible: false,
          stages: [
            { id: 'step1', status: 'completed', content: 'Checked knowledge base for European capitals.' }
          ]
        }
      ]
    }
  ];

  public onPromptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      const defaultResponse =
        'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
      this.assistInstance.addPromptResponse({
        blocks: [],
        response: defaultResponse
      }, true);
    }, 1000);
  };
}
```

> When `blockTemplate` is set, the default collapsible header, spinner, and Timeline rendering are completely replaced by your template. Collapse/expand behavior and spinner life cycle management must be handled within the template itself.

---

## Configuring the Item Template

Use the `itemTemplate` property to customize individual thinking stages inside the Timeline. This property applies to every stage item within all thinking blocks.

### Item Template Context Properties

| Property | Description |
|----------|-------------|
| `item` | Contains `content`, `cssClass`, `disabled`, `dotCss`, and `oppositeContent` properties of the timeline stage item. |
| `itemIndex` | Current item index in the timeline. |

```typescript
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AIAssistViewAllModule, AIAssistViewComponent, AIAssistView, AssistThinking } from '@syncfusion/ej2-angular-interactive-chat';

AIAssistView.Inject(AssistThinking);

@Component({
  imports: [AIAssistViewAllModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
      <br />
      <ejs-aiassistview
        id="aiAssistView"
        #assistInstance
        [prompts]="prompts"
        [itemTemplate]="itemTemplate"
        (promptRequest)="onPromptRequest()">
      </ejs-aiassistview>
    </div>
  `
})
export class AppComponent {
  @ViewChild('assistInstance')
  public assistInstance!: AIAssistViewComponent;

  // Define as a class property (function)
  public itemTemplate = (data: any) => {
    const item = data.item || data;
    const statusClass = item.isStageInProgress ? 'e-stage-inprogress' : 'e-stage-done';
    const iconCss = item.iconCss || item.dotCss || '';
    return `
      <div class="custom-stage-item ${statusClass}">
        <span class="e-icons ${iconCss}"></span>
        <div class="custom-stage-content">${item.content || ''}</div>
      </div>
    `;
  };

  public prompts: any[] = [
    {
      prompt: 'Explain the water cycle.',
      response: 'The water cycle describes how water moves continuously through the environment via evaporation, condensation, and precipitation.',
      blocks: [
        {
          blockType: 'thinking',
          title: 'Understanding your request',
          collapsed: true,
          collapsible: true,
          isActive: false,
          stages: [
            { id: 'step1', status: 'completed', iconCss: 'e-icons e-check', content: 'Identified request as a water cycle explanation.' }
          ]
        }
      ]
    }
  ];

  public onPromptRequest(): void {
    setTimeout(() => {
      this.assistInstance.addPromptResponse({
        response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.'
      });
    }, 1000);
  }
}
```

---

## Best Practices

### 1. Inject the `AssistThinking` Module Once

```ts
// ✅ Do — inject before bootstrap/component definition
AIAssistView.Inject(AssistThinking);
```

### 2. Use `isFinalUpdate` Correctly in `addPromptResponse`

- Pass `false` while thinking stages are still streaming/updating.
- Pass `true` only on the last update, typically alongside the final `response` text.

### 3. Keep Stage Content Concise

Each `stages[].content` entry should describe a single reasoning step succinctly; use `editableContext` for structured references instead of embedding long descriptions inline.

### 4. Reserve `blockTemplate` for Full Custom Rendering

Only use `blockTemplate` when the default collapsible header/timeline UI needs to be fully replaced — remember collapse/expand and spinner behavior become your responsibility.

---

## Troubleshooting

### Issue: Thinking Blocks Not Rendering

**Cause:** `AssistThinking` module not injected.

**Solution:**
```ts
import { AIAssistView, AssistThinking } from '@syncfusion/ej2-angular-interactive-chat';
AIAssistView.Inject(AssistThinking);
```

### Issue: Context Badges Not Appearing

**Cause:** `{index}` placeholder in `content` doesn't match the `editableContext` array position, or `editableContext` is missing.

**Solution:** Ensure placeholders (`{0}`, `{1}`, ...) are zero-based and correspond directly to entries in the `editableContext` array.

### Issue: Response Text Renders Before Thinking Completes

**Cause:** `response` was included in an intermediate (non-final) `addPromptResponse` call.

**Solution:** Only include `response` text in the call where `isFinalUpdate` is `true`.

---

## See Also

- [Prompt and response collection](https://ej2.syncfusion.com/angular/documentation/ai-assistview/assist-view#prompt-response-collection)
- [Tool blocks](https://ej2.syncfusion.com/angular/documentation/ai-assistview#tool-blocks)
- [Streaming responses](https://ej2.syncfusion.com/angular/documentation/ai-assistview/methods#streaming-response)
- [addPromptResponse method](https://ej2.syncfusion.com/angular/documentation/ai-assistview/methods#addpromptresponse)
