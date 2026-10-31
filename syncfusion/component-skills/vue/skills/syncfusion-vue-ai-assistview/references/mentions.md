# Mentions in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Mentions Settings](#mentions-settings)
- [Configure the Trigger Character](#configure-the-trigger-character)
- [Configure the Data Source](#configure-the-data-source)
- [Configure Fields](#configure-fields)
- [Configure the Query](#configure-the-query)
- [Configure the Filter Type](#configure-the-filter-type)
- [Configure Highlighting](#configure-highlighting)
- [Configure the Mention Character in Selected Mentions](#configure-the-mention-character-in-selected-mentions)
- [Configure the Display Template](#configure-the-display-template)
- [Configure the Popup Size](#configure-the-popup-size)
- [Configure the Item Template](#configure-the-item-template)
- [Configure the No Records Template](#configure-the-no-records-template)
- [Handle Mention Selection](#handle-mention-selection)
- [Best Practices](#best-practices)

## Overview

The AI AssistView supports **mentions** in the prompt editor, allowing users to select and reference items from a configured data source. When users type the configured mention character, a suggestion popup displays matching items. Users can then select an item to insert it as a mention in the prompt.

Use the `mentions` property to configure the trigger character, data source, field mappings, filtering behavior, popup dimensions, and templates.

```typescript
mentions: MentionSettingsModel[]

interface MentionSettingsModel {
  mentionChar?: string;
  dataSource?: Array<any> | DataManager | string[] | number[] | boolean[];
  fields?: FieldSettingsModel;
  query?: Query;
  filterType?: FilterType; // 'Contains' | 'StartsWith' | 'EndsWith'
  highlight?: boolean;
  showMentionChar?: boolean;
  popupWidth?: string | number;
  popupHeight?: string | number;
  displayTemplate?: string | Function;
  itemTemplate?: string;
  noRecordsTemplate?: string;
}
```

## Getting Started

The following example demonstrates a basic mention configuration using the `@` character as the trigger and a local data source.

### Composition API

```vue
<template>
	<div id="container">
		<ejs-aiassistview id="aiAssistView" ref="aiassist" :mentions="mentions"
			prompt-placeholder="Type '@' for agents or '/' for commands..." :prompt-request="onPromptRequest">
		</ejs-aiassistview>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { AIAssistViewComponent as EjsAiassistview } from '@syncfusion/ej2-vue-interactive-chat';

const aiassist = ref(null);
const agents = [
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

const commands = [
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

const mentions = [
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
		itemTemplate: '<div class="listItems"><span class="commandIcon ${iconCss}"></span><span class="commandName">${name}</span><span class="commandDesc">${description}</span></div>'
	}
];

const onPromptRequest = () => {
	setTimeout(() => {
		const defaultResponse = 'The selected mention has been processed. Connect the AI AssistView to your preferred AI service for real-time responses.';
		aiassist.value.addPromptResponse(defaultResponse);
	}, 1000);
};
</script>
<style>
@import '@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css';

#container {
  height: 450px;
  width: 650px;
  margin: 20px auto;
}
</style>
```

### Options API

```vue
<template>
  <div id="container">
    <ejs-aiassistview id="aiAssistView" ref="aiassist" :mentions="mentions"
      prompt-placeholder="Type '@' for agents or '/' for commands..." :prompt-request="onPromptRequest">
    </ejs-aiassistview>
  </div>
</template>
<script>
import { AIAssistViewComponent } from '@syncfusion/ej2-vue-interactive-chat';

export default {
  components: {
    'ejs-aiassistview': AIAssistViewComponent
  },
  data() {
    return {
      agents: [
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
      ],
      commands: [
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
      ]
    };
  },
  computed: {
    mentions() {
      return [
        {
          mentionChar: '@',
          dataSource: this.agents,
          fields: {
            text: 'name',
            value: 'id',
            iconCss: 'iconCss'
          }
        },
        {
          mentionChar: '/',
          dataSource: this.commands,
          showMentionChar: false,
          fields: {
            text: 'name',
            value: 'id',
            iconCss: 'iconCss'
          },
          itemTemplate: '<div class="listItems"><span class="commandIcon ${iconCss}"></span><span class="commandName">${name}</span><span class="commandDesc">${description}</span></div>'
        }
      ];
    }
  },
  methods: {
    onPromptRequest() {
      setTimeout(() => {
        const defaultAiassist = this.$refs.aiassist.ej2Instances;
        const defaultResponse = 'The selected mention has been processed. Connect the AI AssistView to your preferred AI service for real-time responses.';
        defaultAiassist.addPromptResponse(defaultResponse);
      }, 1000);
    }
  }
};
</script>
<style>
@import '@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css';

#container {
  height: 450px;
  width: 650px;
  margin: 20px auto;
}
</style>
```

## Mentions Settings

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

## Configure the Trigger Character

Use the `mentionChar` property inside `mentions` to configure the characters such as `@` or `/`.

```javascript
const mentions = [
  { mentionChar: '@', dataSource: agents, fields: { text: 'name', value: 'id' } },
  { mentionChar: '/', dataSource: commands, showMentionChar: false, fields: { text: 'name', value: 'id' } }
];
```

> Tip: When the trigger character is a command (like `/`), set `showMentionChar: false` so the slash isn't displayed with the inserted mention.

## Configure the Data Source

Use the `dataSource` property to provide a local collection, such as a string array or an object array, or use a `DataManager` instance to retrieve data locally or from a remote data source.

### Local Collection (Object Array)

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: [
      { id: 'TechSupport', name: 'TechSupport' },
      { id: 'HRAssistant', name: 'HRAssistant' },
      { id: 'KnowledgeBase', name: 'KnowledgeBase' }
    ],
    fields: { text: 'name', value: 'id' }
  }
];
```

### Local Collection (String Array)

```javascript
const mentions = [
  {
    mentionChar: '#',
    dataSource: ['Documentation', 'Samples', 'Release Notes', 'Roadmap'],
    // No fields required when using string arrays.
  }
];
```

### Remote Data with DataManager

```javascript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const mentions = [
  {
    mentionChar: '@',
    dataSource: new DataManager({
      url: 'https://services.example.com/api/agents',
      adaptor: new ODataAdaptor()
    }),
    fields: { text: 'Name', value: 'Id' },
    query: new Query().take(20)
  }
];
```

## Configure Fields

Use the `fields` property to map object-based data sources. Specify the property names that contain the display text and value.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: mentionData,
    fields: {
      text: 'name',    // Display text
      value: 'id',     // Identifier
      iconCss: 'iconCss', // Optional icon class
      groupBy: 'category' // Optional grouping
    }
  }
];
```

> Default `fields` is `{ text: 'text', value: 'id' }`, so the `fields` property can be omitted when your data already follows that shape.

### Assigning the DataSource After Creation (Options API)

```javascript
data() {
  return {
    mentionData: [
      { id: 'TechSupport', name: 'TechSupport' },
      { id: 'HRAssistant', name: 'HRAssistant' },
      { id: 'KnowledgeBase', name: 'KnowledgeBase' }
    ],
    mentions: [
      {
        mentionChar: '@',
        fields: { text: 'name', value: 'id' }
      }
    ]
  };
},
created() {
  this.mentions[0].dataSource = this.mentionData;
}
```

## Configure the Query

Use the `query` property to apply additional data operations to the configured mention data source. It accepts a Syncfusion `Query` object. The default value is `null`.

```javascript
import { Query } from '@syncfusion/ej2-data';

const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    query: new Query().take(2)
  }
];
```

## Configure the Filter Type

Use the `filterType` property to specify how the text typed after the mention trigger character is matched against the items in the data source. The default value is `Contains`.

| Filter type | Description |
|---|---|
| `Contains` | Matches items whose display text contains the typed text. |
| `StartsWith` | Matches items whose display text starts with the typed text. |
| `EndsWith` | Matches items whose display text ends with the typed text. |

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    filterType: 'StartsWith'
  }
];
```

## Configure Highlighting

Use the `highlight` property to specify whether the matching text is highlighted in the mention suggestion popup. The default value is `false`. When set to `true`, the portion of the suggestion item that matches the typed text is highlighted.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    highlight: true
  }
];
```

## Configure the Mention Character in Selected Mentions

Use the `showMentionChar` property to specify whether the configured mention trigger character is displayed with the selected mention. The default value is `true`. When set to `false`, the trigger character is omitted from the displayed mention.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    showMentionChar: false
  }
];
```

## Configure the Display Template

Use the `displayTemplate` property to customize the appearance of a selected mention in the prompt editor. The template receives the selected item's data, allowing you to customize the rendered mention content. For example, you can display an icon, avatar, or additional information along with the item's display text.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    displayTemplate: '<span class="e-aiassist-mention-item-chip">${name}</span>'
  }
];
```

> Placeholder tokens use the field names configured in `fields.text` (for example, `${name}`).

## Configure the Popup Size

Use the `popupWidth` and `popupHeight` properties to customize the dimensions of the mention suggestion popup.

- `popupWidth` - Specifies the popup width. It accepts CSS width values such as `'400px'` or `'50%'`, or a numeric value representing pixels. The default value is `'auto'`.
- `popupHeight` - Specifies the popup height. It accepts CSS height values such as `'300px'` or `'50%'`, or a numeric value representing pixels. The default value is `'300px'`.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    popupWidth: '250px',
    popupHeight: '200px'
  }
];
```

## Configure the Item Template

Use the `itemTemplate` property to customize the appearance of items in the mention suggestion popup. You can use it to display additional information or visual elements, such as an avatar, icon, or description, along with the mention item's display text.

```javascript
const itemTemplate =
  '<div class="mention-item">' +
  '<span class="mention-name">${name}</span>' +
  '<span class="mention-description">${description}</span>' +
  '</div>';

const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    itemTemplate
  }
];
```

## Configure the No Records Template

Use the `noRecordsTemplate` property to customize the content displayed when no mention items match the text entered by the user. The default value is `'No records found'`.

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    noRecordsTemplate: 'No matching agents found. Try a different search.'
  }
];
```

## Handle Mention Selection

The `mentionSelect` event is triggered when a user selects an item from the mention suggestion popup. Use this event to access the selected mention data and perform custom actions.

### Composition API

```vue
<template>
	<div id="container">
		<ejs-aiassistview id="aiAssistView" ref="aiassist" :mentions="mentions" :mention-select="onMentionSelect"
			:prompt-placeholder="promptPlaceholder" :prompt-request="onPromptRequest">
		</ejs-aiassistview>
		<div id="mention-status" class="mention-status"></div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { AIAssistViewComponent as EjsAiassistview } from '@syncfusion/ej2-vue-interactive-chat';

const aiassist = ref(null);
const promptPlaceholder = "Type '@' to mention an agent...";
const mentions = [
	{
		mentionChar: '@',
		dataSource: [
			{ id: 'TechSupport', name: 'TechSupport' },
			{ id: 'HRAssistant', name: 'HRAssistant' },
			{ id: 'KnowledgeBase', name: 'KnowledgeBase' }
		],
		fields: {
			text: 'name',
			value: 'id'
		}
	}
];

const onMentionSelect = (args) => {
	const statusEl = document.getElementById('mention-status');
	if (statusEl && args && args.itemData) {
		statusEl.textContent = 'Selected mention: ' + (args.itemData.name || args.itemData.id);
		statusEl.style.display = 'block';
	}
};

const onPromptRequest = () => {
	setTimeout(() => {
		const defaultResponse = 'The selected mention has been processed. Connect the AIAssistView to your preferred AI service for real-time responses.';
		aiassist.value.addPromptResponse(defaultResponse);
	}, 1000);
};
</script>
<style>
@import '@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css';

#container {
	height: 450px;
	width: 650px;
	margin: 20px auto;
}
</style>
```

### Options API

```vue
<template>
	<div id="container">
		<ejs-aiassistview id="aiAssistView" ref="aiassist" :mentions="mentions" :mention-select="onMentionSelect"
			:prompt-placeholder="promptPlaceholder" :prompt-request="onPromptRequest">
		</ejs-aiassistview>
		<div id="mention-status" class="mention-status"></div>
	</div>
</template>
<script>
import { AIAssistViewComponent } from '@syncfusion/ej2-vue-interactive-chat';

export default {
	components: {
		'ejs-aiassistview': AIAssistViewComponent
	},
	data() {
		return {
			promptPlaceholder: "Type '@' to mention an agent...",
			mentions: [
				{
					mentionChar: '@',
					dataSource: [
						{ id: 'TechSupport', name: 'TechSupport' },
						{ id: 'HRAssistant', name: 'HRAssistant' },
						{ id: 'KnowledgeBase', name: 'KnowledgeBase' }
					],
					fields: {
						text: 'name',
						value: 'id'
					}
				}
			]
		};
	},
	methods: {
		onMentionSelect(args) {
			const statusEl = document.getElementById('mention-status');
			if (statusEl && args && args.itemData) {
				statusEl.textContent = 'Selected mention: ' + (args.itemData.name || args.itemData.id);
				statusEl.style.display = 'block';
			}
		},
		onPromptRequest() {
			setTimeout(() => {
				const defaultAiassist = this.$refs.aiassist.ej2Instances;
				const defaultResponse = 'The selected mention has been processed. Connect the AIAssistView to your preferred AI service for real-time responses.';
				defaultAiassist.addPromptResponse(defaultResponse);
			}, 1000);
		}
	}
};
</script>
<style>
@import '@syncfusion/ej2-tailwind3-theme/styles/tailwind3.css';

#container {
	height: 450px;
	width: 650px;
	margin: 20px auto;
}
</style>
```

### Event Arguments

The `mentionSelect` event provides:

| Property | Type | Description |
|----------|------|-------------|
| `itemData` | `object` | The data of the selected mention item (from the configured `dataSource`). |
| `itemElement` | `HTMLElement` | The DOM element of the selected popup item. |
| `mention` | `MentionSettingsModel` | The mention setting that produced this selection. |
| `text` | `string` | The display text inserted into the prompt editor. |

## Best Practices

### 1. Set `showMentionChar: false` for Slash Commands

Slash commands (`/table`, `/rewrite`) read more naturally when the `/` is part of the inserted token, so leave it visible. For agent mentions (`@TechSupport`), set `showMentionChar: false` when the agent name is self-explanatory.

```javascript
const mentions = [
  { mentionChar: '@', dataSource: agents, fields: { text: 'name', value: 'id' }, showMentionChar: false },
  { mentionChar: '/', dataSource: commands, fields: { text: 'name', value: 'id' } }
];
```

### 2. Combine `highlight` + `filterType` for Best UX

```javascript
const mentions = [
  {
    mentionChar: '@',
    dataSource: agents,
    fields: { text: 'name', value: 'id' },
    filterType: 'StartsWith',
    highlight: true
  }
];
```

### 3. Reuse Templates with Computed Properties

In the Options API, store the template string once and reference it from each mention setting:

```javascript
data() {
  return {
    itemTemplate: '<div class="mention-item">${name} – ${description}</div>',
    mentions: [
      { mentionChar: '@', dataSource: this.agents, fields: { text: 'name', value: 'id' }, itemTemplate: this.itemTemplate }
    ]
  };
}
```

### 4. Configure Sensible Defaults for `popupWidth` / `popupHeight`

A 250×200 popup works well for short command lists. Switch to `'auto'` and `'300px'` (the default) when the description text in `itemTemplate` is long.

### 5. Use `mentionSelect` to Track Usage Analytics

```javascript
const onMentionSelect = (args) => {
  analytics.track('mention_selected', {
    char: args.mention.mentionChar,
    id: args.itemData.id,
    text: args.text
  });
};
```
