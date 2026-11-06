# Mentions in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Configure the Mention](#configure-the-mention)
- [Configure Mention Settings](#configure-mention-settings)
- [Configure the Mention Trigger](#configure-the-mention-trigger)
- [Configure the Mention Data Source](#configure-the-mention-data-source)
- [Configure Mention Fields](#configure-mention-fields)
- [Configure the Query](#configure-the-query)
- [Configure the Filter Type](#configure-the-filter-type)
- [Configure Highlighting](#configure-highlighting)
- [Configure the Mention Character in Selected Mentions](#configure-the-mention-character-in-selected-mentions)
- [Configure the Display Template](#configure-the-display-template)
- [Configure the Popup Size](#configure-the-popup-size)
- [Configure the Item Template](#configure-the-item-template)
- [Configure the No Records Template](#configure-the-no-records-template)
- [Handle Mention Selection](#handle-mention-selection)

---

## Overview

The AI AssistView supports **mentions in the prompt editor**, allowing users to select and reference items from a configured data source. When users type the configured mention character, a suggestion popup displays matching items. Users can then select an item to insert it as a mention in the prompt.

Use the [mentions](../api/ai-assistview#mentions) property to configure:

- The mention trigger character
- Data source (local or remote)
- Field mappings
- Filtering behavior
- Popup dimensions
- Templates for display, item, and no-records states

> A single component can register **multiple mention configurations** (for example, both `@` for agents and `/` for slash commands).

---

## Configure the Mention

The following example demonstrates a basic mention configuration using the `@` character as the trigger and a local data source.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule} from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="basic"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    {
      id: "TechSupport",
      name: "TechSupport",
      placeholder: "Ask about VPN, network, or device issues",
    },
    {
      id: "HRAssistant",
      name: "HRAssistant",
      placeholder: "Ask about leave, benefits, and HR policies",
    },
    {
      id: "KnowledgeBase",
      name: "KnowledgeBase",
      placeholder: "Search the internal knowledge base",
    },
  ];

  public commands: any[] = [
    {
      id: "table",
      name: "/table",
      description: "Answer as a markdown table",
      placeholder: "Format the response as a table",
    },
    {
      id: "rewrite",
      name: "/rewrite",
      description: "Rewrite content for clarity and professionalism",
      placeholder: "Improve clarity and professional tone",
    },
    {
      id: "checklist",
      name: "/checklist",
      description: "Convert a process into a step-by-step checklist",
      placeholder: "Convert the response into a checklist",
    },
  ];

  public mentions: any[] = [
    {
      mentionChar: "@",
      dataSource: this.agents,
      fields: { text: "name", value: "id" },
    },
    {
      mentionChar: "/",
      dataSource: this.commands,
      showMentionChar: false,
      fields: { text: "name", value: "id" },
    },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure Mention Settings

The `mentions` property accepts an **array of mention settings**. Each entry supports the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mentionChar` | `string` | `''` | Trigger character that opens the mention suggestion popup. |
| `dataSource` | `string[] \| DataManager \| { [key: string]: Object; }[] \| number[] \| boolean[]` | `[]` | Data source for the mention popup. Local collection or `DataManager` (local or remote). |
| `fields` | `FieldSettingsModel` | `{ text: 'text', value: 'id' }` | Field mappings for display text and item value. |
| `query` | `Query` | `null` | Syncfusion `Query` used to retrieve and process data from the data source. |
| `filterType` | `FilterType` | `'Contains'` | How the typed text is matched against mention items. |
| `highlight` | `boolean` | `false` | Whether the matching text is highlighted in the suggestion popup. |
| `showMentionChar` | `boolean` | `true` | Whether the trigger character is shown with the selected mention in the editor. |
| `popupWidth` | `string \| number` | `'auto'` | Width of the mention suggestion popup. |
| `popupHeight` | `string \| number` | `'300px'` | Height of the mention suggestion popup. |
| `displayTemplate` | `string \| Function` | `''` | Template that customizes the appearance of a selected mention in the editor. |
| `itemTemplate` | `string` | `''` | Template that customizes items in the mention suggestion popup. |
| `noRecordsTemplate` | `string` | `'No records found'` | Template shown when no mention items match the typed text. |

---

## Configure the Mention Trigger

Use the `mentionChar` property inside `mentions` to configure characters such as `@` or `/`.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: `<ejs-aiassistview
    id="mention-char"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;
  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];
  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" } },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" } },
  ];
  public onPromptRequest = () => {
    setTimeout(() => {
      let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.aiAssistViewComponent.addPromptResponse(defaultResponse);
    }, 1000);
  };
}
```

---

## Configure the Mention Data Source

Use the `dataSource` property to provide a local collection (string or object array) or a `DataManager` instance for local/remote data.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: `<ejs-aiassistview
    id="data-source"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;
  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];
  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" } },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" } },
  ];
  public onPromptRequest = () => {
    setTimeout(() => {
      let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.aiAssistViewComponent.addPromptResponse(defaultResponse);
    }, 1000);
  };
}
```

---

## Configure Mention Fields

Use the `fields` property to map object-based data sources — specify the property names that contain the display text and the value.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: `<ejs-aiassistview
    id="fields"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;
  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];
  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" } },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" } },
  ];
  public onPromptRequest = () => {
    setTimeout(() => {
      let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.aiAssistViewComponent.addPromptResponse(defaultResponse);
    }, 1000);
  };
}
```

---

## Configure the Query

Use the `query` property to apply additional data operations to the configured data source. It accepts a Syncfusion `Query` object. Default: `null`.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";
import { Query } from "@syncfusion/ej2-data";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: `<ejs-aiassistview
    id="query"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;
  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];
  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, query: new Query().take(2) },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" }, query: new Query().take(2) },
  ];
  public onPromptRequest = () => {
    setTimeout(() => {
      let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.aiAssistViewComponent.addPromptResponse(defaultResponse);
    }, 1000);
  };
}
```

---

## Configure the Filter Type

Use the `filterType` property to control how the text typed after the trigger character is matched. Default: `'Contains'`.

| Filter type | Description |
|-------------|-------------|
| `Contains` | Matches items whose display text contains the typed text. |
| `StartsWith` | Matches items whose display text starts with the typed text. |
| `EndsWith` | Matches items whose display text ends with the typed text. |

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="filter-type"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, filterType: "StartsWith" },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" }, filterType: "StartsWith" },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure Highlighting

Use the `highlight` property to specify whether the matching text is highlighted in the suggestion popup. Default: `false`.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="highlight"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, highlight: true },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" }, highlight: true },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure the Mention Character in Selected Mentions

Use the `showMentionChar` property to control whether the trigger character is displayed alongside the selected mention. Default: `true`. Set to `false` to omit the trigger character.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="show-mention-char"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="promptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" } },
    { mentionChar: "/", dataSource: this.commands, fields: { text: "name", value: "id" }, showMentionChar: false },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure the Display Template

Use the `displayTemplate` property to customize the appearance of a selected mention in the editor. The template receives the selected item's data, letting you render an icon, avatar, or extra information alongside the display text.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="display-template"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="promptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    {
      mentionChar: "@",
      dataSource: this.agents,
      fields: { text: "name", value: "id" },
      displayTemplate: '<span class="e-aiassist-mention-item-chip">${name}</span>',
    },
    {
      mentionChar: "/",
      dataSource: this.commands,
      fields: { text: "name", value: "id" },
      showMentionChar: false,
      displayTemplate: '<span class="e-aiassist-mention-item-chip">${name}</span>',
    },
  ];

  public promptRequest(): void {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse(
        "The selected mention has been processed.",
      );
    }, 1000);
  }
}
```

---

## Configure the Popup Size

Use `popupWidth` and `popupHeight` to control the dimensions of the mention suggestion popup.

- `popupWidth` — CSS width value (`'400px'`, `'50%'`, or numeric pixels). Default: `'auto'`.
- `popupHeight` — CSS height value (`'300px'`, `'50%'`, or numeric pixels). Default: `'300px'`.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="popup-size"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, popupWidth: "250px", popupHeight: "200px" },
    { mentionChar: "/", dataSource: this.commands, fields: { text: "name", value: "id" }, showMentionChar: false, popupWidth: "250px", popupHeight: "200px" },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure the Item Template

Use the `itemTemplate` property to customize the appearance of items in the suggestion popup — display an avatar, icon, description, or other visual elements alongside the display text.

> The `item-template` snippet uses `styleUrls: ["styles.css"]` to provide item layout styles. The `styles.css` file is expected to live alongside `app.component.ts` and is not part of the TypeScript snippet.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  styleUrls: ["styles.css"],
  template: ` <ejs-aiassistview
    id="item-template"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", description: "Troubleshoot technical issues", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", description: "Get assistance with HR policies", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", description: "Search internal documentation", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", description: "Answer as a markdown table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", description: "Rewrite content for clarity", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", description: "Create a step-by-step checklist", placeholder: "Convert the response into a checklist" },
  ];

  public itemTemplate: string =
    '<div class="mention-item"><span class="mention-name">${name}</span><span class="mention-description">${description}</span></div>';
  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, itemTemplate: this.itemTemplate },
    { mentionChar: "/", dataSource: this.commands, fields: { text: "name", value: "id" }, showMentionChar: false, itemTemplate: this.itemTemplate },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Configure the No Records Template

Use the `noRecordsTemplate` property to customize the message shown when no mention items match the typed text. Default: `'No records found'`.

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
    id="no-records-template"
    #aiAssistViewComponent
    promptPlaceholder="Type '@' for agents or '/' for commands..."
    [mentions]="mentions"
    (promptRequest)="onPromptRequest()"
  ></ejs-aiassistview>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, noRecordsTemplate: "No matching agents found. Try a different search." },
    { mentionChar: "/", dataSource: this.commands, fields: { text: "name", value: "id" }, showMentionChar: false, noRecordsTemplate: "No matching commands found. Try a different search." },
  ];

  public onPromptRequest = () => {
      setTimeout(() => {
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        this.aiAssistViewComponent.addPromptResponse(defaultResponse);
      }, 1000);
  };
}
```

---

## Handle Mention Selection

The [mentionSelect](../api/ai-assistview#mentionselect) event is triggered when a user selects an item from the mention suggestion popup. Use it to access the selected mention data and perform custom actions.

### Event Arguments: `MentionSelectEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `itemData` | `object \| string \| number \| boolean` | The data record of the selected mention item. |
| `mentionChar` | `string` | The trigger character for the active mention configuration. |
| `mentionData` | `object` | Derived mention data (for example, `{ id, text }`). |
| `event` | `Event` | The original DOM event. |
| `name` | `string` | The event name (`mentionSelect`). |
| `cancel` | `boolean` | Set to `true` to cancel the mention insertion. |

### Example: Capturing the Selected Mention

```typescript
import { Component, ViewChild } from "@angular/core";
import { AIAssistViewComponent, AIAssistViewModule, MentionSelectEventArgs } from "@syncfusion/ej2-angular-interactive-chat";

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: "app-root",
  template: ` <ejs-aiassistview
      id="mention-select"
      #aiAssistViewComponent
      promptPlaceholder="Type '@' for agents or '/' for commands..."
      [mentions]="mentions"
      (promptRequest)="onPromptRequest()"
    ></ejs-aiassistview>
    <p>Selected mention: {{ selectedMention }}</p>`,
})
export class AppComponent {
  @ViewChild("aiAssistViewComponent")
  public aiAssistViewComponent!: AIAssistViewComponent;
  public selectedMention: string = "";

  public agents: any[] = [
    { id: "TechSupport", name: "TechSupport", placeholder: "Ask about VPN, network, or device issues" },
    { id: "HRAssistant", name: "HRAssistant", placeholder: "Ask about leave, benefits, and HR policies" },
    { id: "KnowledgeBase", name: "KnowledgeBase", placeholder: "Search the internal knowledge base" },
  ];
  public commands: any[] = [
    { id: "table", name: "/table", placeholder: "Format the response as a table" },
    { id: "rewrite", name: "/rewrite", placeholder: "Improve clarity and professional tone" },
    { id: "checklist", name: "/checklist", placeholder: "Convert the response into a checklist" },
  ];

  public mentionSelect = (args: MentionSelectEventArgs): void => {
    const item: any = args.itemData;
    this.selectedMention = item?.name || item?.id || '';
  };

  public mentions: any[] = [
    { mentionChar: "@", dataSource: this.agents, fields: { text: "name", value: "id" }, mentionSelect: this.mentionSelect },
    { mentionChar: "/", dataSource: this.commands, showMentionChar: false, fields: { text: "name", value: "id" }, mentionSelect: this.mentionSelect },
  ];

  public onPromptRequest = () => {
    setTimeout(() => {
      let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.aiAssistViewComponent.addPromptResponse(defaultResponse);
    }, 1000);
  };
}
```

---

## API Surface Summary

| Member | Type | Description |
|--------|------|-------------|
| `mentions` | `MentionSettings[]` | Input property on the component. Accepts an array of mention configurations. |
| `MentionSettings.mentionChar` | `string` | Trigger character (e.g. `@`, `/`). |
| `MentionSettings.dataSource` | `any[] \| DataManager` | Data source for the popup. |
| `MentionSettings.fields` | `FieldSettingsModel` | Field mappings (default `{ text: 'text', value: 'id' }`). |
| `MentionSettings.query` | `Query` | Syncfusion `Query` for additional data operations. |
| `MentionSettings.filterType` | `FilterType` | `'Contains'` \| `'StartsWith'` \| `'EndsWith'`. |
| `MentionSettings.highlight` | `boolean` | Whether to highlight matches in the popup. |
| `MentionSettings.showMentionChar` | `boolean` | Whether to display the trigger character with the selected mention. |
| `MentionSettings.popupWidth` | `string \| number` | Width of the popup. |
| `MentionSettings.popupHeight` | `string \| number` | Height of the popup. |
| `MentionSettings.displayTemplate` | `string \| Function` | Custom template for the selected mention in the editor. |
| `MentionSettings.itemTemplate` | `string` | Custom template for items in the popup. |
| `MentionSettings.noRecordsTemplate` | `string` | Custom template for the empty state. |
| `MentionSettings.mentionSelect` | `(args: MentionSelectEventArgs) => void` | Per-mention selection handler. |
| `mentionSelect` (event) | `EventEmitter<MentionSelectEventArgs>` | Fired when an item is selected from the mention popup. |
| `MentionSelectEventArgs` | object | `{ itemData, mentionChar, mentionData, event, name, cancel }`. |
