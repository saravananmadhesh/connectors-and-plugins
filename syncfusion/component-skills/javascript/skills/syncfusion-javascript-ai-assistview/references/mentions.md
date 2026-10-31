# Mentions

## Table of Contents
- [Overview](#overview)
- [Configure the Mention](#configure-the-mention)
- [Configure Mention Settings](#configure-mention-settings)
  - [Mention Trigger Character](#configure-the-mention-trigger)
  - [Mention Data Source](#configure-the-mention-data-source)
  - [Mention Fields](#configure-mention-fields)
- [Configure the Query](#configure-the-query)
  - [Filter Type](#configure-the-filter-type)
  - [Highlight Matching Text](#configure-highlighting)
  - [Show Mention Character](#configure-the-mention-character-in-selected-mentions)
  - [Display Template](#configure-the-display-template)
  - [Popup Size](#configure-the-popup-size)
  - [Item Template](#configure-the-item-template)
  - [No Records Template](#configure-the-no-records-template)
- [Handle Mention Selection](#handle-mention-selection)

The Syncfusion AI AssistView supports **mentions** in the prompt editor, allowing users to select and reference items from a configured data source. When users type the configured mention character, a suggestion popup displays matching items. Users can then select an item to insert it as a mention in the prompt.

Use the [`mentions`](../api/ai-assistview#mentions) property to configure the mention trigger character, data source, field mappings, filtering behavior, popup dimensions, and templates.

---

## Overview

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: [
                { id: 'TechSupport', name: 'TechSupport' },
                { id: 'HRAssistant', name: 'HRAssistant' },
                { id: 'KnowledgeBase', name: 'KnowledgeBase' }
            ],
            fields: { text: 'name', value: 'id' }
        }
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'The selected mention has been processed. Connect the AIAssistView to your preferred AI service for real-time responses.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#mention-basic');
```

---

## Configure the Mention

The following example demonstrates a basic mention configuration using the `@` character as the trigger and a local data source.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Local data source for agent mentions.
const agents: any[] = [
    {
        id: 'TechSupport',
        name: 'TechSupport',
        placeholder: 'Ask about VPN, network, or device issues',
        iconCss: 'e-icons e-comment-status'
    },
    {
        id: 'HRAssistant',
        name: 'HRAssistant',
        placeholder: 'Ask about leave, benefits, and HR policies',
        iconCss: 'e-icons e-people'
    },
    {
        id: 'KnowledgeBase',
        name: 'KnowledgeBase',
        placeholder: 'Search the internal knowledge base',
        iconCss: 'e-icons e-objects'
    }
];

// Local data source for command mentions.
const commands: any[] = [
    {
        id: 'table',
        name: '/table',
        description: 'Answer as a markdown table',
        placeholder: 'Format the response as a table',
        iconCss: 'e-icons e-table'
    },
    {
        id: 'rewrite',
        name: '/rewrite',
        description: 'Rewrite content for clarity and professionalism',
        placeholder: 'Improve clarity and professional tone',
        iconCss: 'e-icons e-rename'
    },
    {
        id: 'checklist',
        name: '/checklist',
        description: 'Convert a process into a step-by-step checklist',
        placeholder: 'Convert the response into a checklist',
        iconCss: 'e-icons e-list-unordered'
    }
];

// Initializes AI AssistView with agent and command mention triggers.
const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: {
                text: 'name',
                value: 'id',
                iconCss: 'iconCss'
            }
        },
        {
            mentionChar: '/',
            dataSource: commands,
            showMentionChar: false,
            fields: {
                text: 'name',
                value: 'id',
                iconCss: 'iconCss'
            },
            itemTemplate:
                '<div class="listItems">' +
                    '<span class="commandIcon ${iconCss}"></span>' +
                    '<span class="commandName">${name}</span>' +
                    '<span class="commandDesc">${description}</span>' +
                '</div>'
        }
    ],
    promptRequest: (): void => {
        window.setTimeout((): void => {
            const defaultResponse: string =
                'The selected mention has been processed. Connect the AI AssistView to your preferred AI service for real-time responses.';

            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#basic');
```

---

## Configure Mention Settings

The `mentions` property accepts an array of mention settings. Each mention setting supports the following properties.

| Property | Type | Default | Description |
|---|---|---|---|
| `mentionChar` | `string` | `''` | Specifies the trigger character that opens the mention suggestion popup. |
| `dataSource` | `string[] \| DataManager \| { [key: string]: Object; }[] \| number[] \| boolean[]` | `[]` | Specifies the data source used to populate the mention suggestion popup. You can provide a local collection or a `DataManager` instance for local or remote data. |
| `fields` | `FieldSettingsModel` | `{ text: 'text', value: 'id' }` | Specifies the field mappings used to display and identify mention items. |
| `query` | `Query` | `null` | Specifies the `Query` used to retrieve and process data from the configured data source. |
| `filterType` | `FilterType` | `'Contains'` | Specifies how the typed text is matched against mention items. |
| `highlight` | `boolean` | `false` | Specifies whether the matching text is highlighted in the mention suggestion popup. |
| `showMentionChar` | `boolean` | `true` | Specifies whether the mention trigger character is displayed with the selected mention in the prompt editor. |
| `popupWidth` | `string \| number` | `'auto'` | Specifies the width of the mention suggestion popup. |
| `popupHeight` | `string \| number` | `'300px'` | Specifies the height of the mention suggestion popup. |
| `displayTemplate` | `string \| Function` | `''` | Specifies the template used to customize the appearance of a selected mention in the prompt editor. |
| `itemTemplate` | `string` | `''` | Specifies the template used to customize the appearance of items in the mention suggestion popup. |
| `noRecordsTemplate` | `string` | `'No records found'` | Specifies the template displayed in the mention suggestion popup when no matching items are available. |

### Configure the Mention Trigger

Use the `mentionChar` property inside [`mentions`](../api/ai-assistview#mentions) to configure the characters such as `@` or `/`.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' to mention an agent...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' }
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#mention-char');
```

### Configure the Mention Data Source

Use the `dataSource` property inside [`mentions`](../api/ai-assistview#mentions) to provide a local collection, such as a string array or an object array, or use a `DataManager` instance to retrieve data locally or from a remote data source.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    {
        id: 'TechSupport',
        name: 'TechSupport',
        placeholder: 'Ask about VPN, network, or device issues'
    },
    {
        id: 'HRAssistant',
        name: 'HRAssistant',
        placeholder: 'Ask about leave, benefits, and HR policies'
    },
    {
        id: 'KnowledgeBase',
        name: 'KnowledgeBase',
        placeholder: 'Search the internal knowledge base'
    }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' }
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#data-source');
```

### Configure Mention Fields

Use the `fields` property inside [`mentions`](../api/ai-assistview#mentions) to map object-based data sources, specify the property names that contain the display text and value.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let mentionData: { [key: string]: Object }[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

let aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' to mention an agent...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: mentionData,
            fields: { text: 'name', value: 'id' }
        }
    ],
    promptRequest: () => {
        setTimeout(() => {
            let defaultResponse = 'The selected mention has been processed.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#fields');
```

---

## Configure the Query

Use the `query` property to apply additional data operations to the configured mention data source. It accepts a Syncfusion `Query` object. The default value is `null`.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            query: new Query().take(2)
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#query');
```

### Configure the Filter Type

Use the `filterType` property to specify how the text typed after the mention trigger character is matched against the items in the data source. The default value is `Contains`.

The following filter types are supported:

| Filter type | Description |
|---|---|
| `Contains` | Matches items whose display text contains the typed text. |
| `StartsWith` | Matches items whose display text starts with the typed text. |
| `EndsWith` | Matches items whose display text ends with the typed text. |

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            filterType: 'StartsWith'
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#filter-type');
```

### Configure Highlighting

Use the `highlight` property to specify whether the matching text is highlighted in the mention suggestion popup. The default value is `false`. When set to `true`, the portion of the suggestion item that matches the typed text is highlighted.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            highlight: true
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#highlight');
```

### Configure the Mention Character in Selected Mentions

Use the `showMentionChar` property to specify whether the configured mention trigger character is displayed with the selected mention. The default value is `true`. When set to `false`, the trigger character is omitted from the displayed mention.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            showMentionChar: false
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#show-mention-char');
```

### Configure the Display Template

Use the `displayTemplate` property to customize the appearance of a selected mention in the prompt editor. The template receives the selected item's data, allowing you to customize the rendered mention content.

For example, you can display an icon, avatar, or additional information along with the item's display text.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            displayTemplate:
                '<span class="e-aiassist-mention-item-chip">${name}</span>'
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#display-template');
```

### Configure the Popup Size

Use the `popupWidth` and `popupHeight` properties to customize the dimensions of the mention suggestion popup.

- `popupWidth` - Specifies the popup width. It accepts CSS width values such as `'400px'` or `'50%'`, or a numeric value representing pixels. The default value is `'auto'`.
- `popupHeight` - Specifies the popup height. It accepts CSS height values such as `'300px'` or `'50%'`, or a numeric value representing pixels. The default value is `'300px'`.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            popupWidth: '250px',
            popupHeight: '200px'
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#popup-size');
```

### Configure the Item Template

Use the `itemTemplate` property to customize the appearance of items in the mention suggestion popup. You can use it to display additional information or visual elements, such as an avatar, icon, or description, along with the mention item's display text.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    {
        id: 'TechSupport',
        name: 'TechSupport',
        description: 'Troubleshoot technical issues'
    },
    {
        id: 'HRAssistant',
        name: 'HRAssistant',
        description: 'Get assistance with HR policies'
    },
    {
        id: 'KnowledgeBase',
        name: 'KnowledgeBase',
        description: 'Search internal documentation'
    }
];

const itemTemplate: string =
    '<div class="mention-item">' +
        '<span class="mention-name">${name}</span>' +
        '<span class="mention-description">${description}</span>' +
    '</div>';

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            itemTemplate: itemTemplate
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#item-template');
```

### Configure the No Records Template

Use the `noRecordsTemplate` property to customize the content displayed when no mention items match the text entered by the user. The default value is `'No records found'`.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            noRecordsTemplate: 'No matching agents found. Try a different search.'
        }
    ],
    promptRequest: (): void => {
        setTimeout((): void => {
            aiAssistView.addPromptResponse('The selected mention has been processed.');
        }, 1000);
    }
});

aiAssistView.appendTo('#no-records-template');
```

---

## Handle Mention Selection

The `mentionSelect` event is triggered when a user selects an item from the mention suggestion popup. Use this event to access the selected mention data and perform custom actions.

The following table lists the arguments available in the `mentionSelect` event.

| Argument | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Specifies whether the mention selection should be canceled. Set to `true` to prevent the default selection action. |
| `event` | `Event` | Specifies the original event that triggered the mention selection. Provides access to the underlying browser event details. |
| `isInteracted` | `boolean` | Specifies whether the selection was initiated through user interaction. Returns `true` when the action is performed directly by the user. |
| `itemData` | `FieldSettingsModel` | Specifies the data associated with the selected mention item. Contains the field settings information for the selected mention. |
| `name` | `string` | Specifies the name of the event. |

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let mentionData: { [key: string]: Object }[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

let aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' to mention an agent...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: mentionData,
            fields: { text: 'name', value: 'id' },
            mentionSelect: (args: any) => {
                let statusEl: HTMLElement = document.getElementById('mention-status');
                if (statusEl && args && args.itemData) {
                    statusEl.textContent = 'Selected mention: ' + (args.itemData.name || args.itemData.id);
                    statusEl.style.display = 'block';
                }
            }
        }
    ],
    promptRequest: () => {
        setTimeout(() => {
            let defaultResponse = 'The selected mention has been processed. Connect the AIAssistView to your preferred AI service for real-time responses.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

aiAssistView.appendTo('#mention-select');
```
