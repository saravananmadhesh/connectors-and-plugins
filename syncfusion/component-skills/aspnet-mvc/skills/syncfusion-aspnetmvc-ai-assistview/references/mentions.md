# Mentions in AI AssistView

## Table of Contents
- [Configure Mentions](#configure-mentions)
- [Configure Mention Settings](#configure-mention-settings)
- [Configure the Mention Trigger](#configure-the-mention-trigger)
- [Configure the Mention Data Source](#configure-the-mention-data-source)
- [Configure Mention Fields](#configure-mention-fields)
- [Configure the Query](#configure-the-query)
- [Configure the Filter Type](#configure-the-filter-type)
- [Configure Highlighting](#configure-highlighting)
- [Show Mention Character](#show-mention-character)
- [Configure the Display Template](#configure-the-display-template)
- [Configure the Mention Popup Size](#configure-the-mention-popup-size)
- [Configure the Item Template](#configure-the-item-template)
- [Configure the No Records Template](#configure-the-no-records-template)
- [Handle Mention Selection](#handle-mention-selection)

The Syncfusion AI AssistView supports mentions in the prompt editor, allowing users to select and reference items from a configured data source. When users type the configured mention character, a suggestion popup displays matching items, and they can select an item to insert it into the prompt.

Use the `Mentions` property to configure the mention trigger character, data source, field mappings, filtering behavior, popup dimensions, and templates.

## Configure Mentions

The following example demonstrates a basic mention configuration using the `@` character as the trigger and a local data source.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("basic")
            .PromptPlaceholder("Type '@' to mention an agent...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult Basic()
{
    return View();
}
```

## Configure Mention Settings

The `Mentions` property accepts an array of mention settings. Each mention setting supports the following properties.

| Property | Type | Default | Description |
|---|---|---|---|
| `MentionChar` | `string` | `''` | Specifies the trigger character that opens the mention suggestion popup |
| `DataSource` | `string[] \| DataManager \| { [key: string]: Object; }[] \| number[] \| boolean[]` | `[]` | Specifies the data source used to populate the mention suggestion popup. You can provide a local collection or a `DataManager` instance for local or remote data. |
| `Fields` | `FieldSettingsModel` | `{ text: 'text', value: 'id' }` | Specifies the field mappings used to display and identify mention items. |
| `Query` | `Query` | `null` | Specifies the `Query` used to retrieve and process data from the configured data source. |
| `FilterType` | `FilterType` | `Contains` | Specifies how the typed text is matched against mention items. |
| `Highlight` | `boolean` | `false` | Specifies whether the matching text is highlighted in the mention suggestion popup. |
| `ShowMentionChar` | `boolean` | `true` | Specifies whether the mention trigger character is displayed with the selected mention in the prompt editor. |
| `PopupWidth` | `string \| number` | `'auto'` | Specifies the width of the mention suggestion popup. |
| `PopupHeight` | `string \| number` | `'300px'` | Specifies the height of the mention suggestion popup. |
| `DisplayTemplate` | `string \| Function` | `''` | Specifies the template used to customize the appearance of a selected mention in the prompt editor. |
| `ItemTemplate` | `string` | `''` | Specifies the template used to customize the appearance of items in the mention suggestion popup. |
| `NoRecordsTemplate` | `string` | `'No records found'` | Specifies the template displayed in the mention suggestion popup when no matching items are available. |

## Configure the Mention Trigger

Use the `MentionChar` property inside [`Mentions`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_Mentions) to configure the characters such as `@` or `/`.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("mention-char")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult MentionChar()
{
    return View();
}
```

## Configure the Mention Data Source

Use the `DataSource` property inside [`Mentions`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_Mentions) to provide a local collection, such as a string array or an object array, or use a `DataManager` instance to retrieve data locally or from a remote data source.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("data-source")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult DataSource()
{
    return View();
}
```

## Configure Mention Fields

Use the `Fields` property inside [`Mentions`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.InteractiveChat.AIAssistView.html#Syncfusion_EJ2_InteractiveChat_AIAssistView_Mentions) to map object-based data sources, specify the property names that contain the display text and value.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("fields")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult Fields()
{
    return View();
}
```

## Configure the Query

Use the `Query` property to apply additional data operations to the configured mention data source. It accepts a Syncfusion `Query` object. The default value is `null`.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("query")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
        assistObj.mentions[0].query = new ej.data.Query().take(2);
        assistObj.mentions[1].query = new ej.data.Query().take(2);
        assistObj.dataBind();
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult Query()
{
    return View();
}
```

## Configure the Filter Type

Use the `FilterType` property to specify how the text typed after the mention trigger character is matched against the items in the data source. The default value is `Contains`.

The following filter types are supported:

| Filter type | Description |
|---|---|
| `Contains` | Matches items whose display text contains the typed text. |
| `StartsWith` | Matches items whose display text starts with the typed text. |
| `EndsWith` | Matches items whose display text ends with the typed text. |

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            filterType = "StartsWith"
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            filterType = "StartsWith"
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("filter-type")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult FilterType()
{
    return View();
}
```

## Configure Highlighting

Use the `Highlight` property to specify whether the matching text is highlighted in the mention suggestion popup. The default value is `false`. When set to `true`, the portion of the suggestion item that matches the typed text is highlighted.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            highlight = true
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            highlight = true
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("highlight")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult Highlight()
{
    return View();
}
```

## Show Mention Character

Use the `ShowMentionChar` property to specify whether the configured mention trigger character is displayed with the selected mention. The default value is `true`. When set to `false`, the trigger character is omitted from the displayed mention.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("show-mention-char")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult ShowMentionChar()
{
    return View();
}
```

## Configure the Display Template

Use the `DisplayTemplate` property to customize the appearance of a selected mention in the prompt editor. The template receives the selected item's data, allowing you to customize the rendered mention content.

For example, you can display an icon, avatar, or additional information along with the item's display text.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            displayTemplate = @"<span class='e-aiassist-mention-item-chip'>${name}</span>"
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            displayTemplate = @"<span class='e-aiassist-mention-item-chip'>${name}</span>"
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("display-template")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult DisplayTemplate()
{
    return View();
}
```

## Configure the Mention Popup Size

Use the `PopupWidth` and `PopupHeight` properties to customize the dimensions of the mention suggestion popup.

- `PopupWidth` - Specifies the popup width. It accepts CSS width values such as `'400px'` or `'50%'`, or a numeric value representing pixels. The default value is `'auto'`.
- `PopupHeight` - Specifies the popup height. It accepts CSS height values such as `'300px'` or `'50%'`, or a numeric value representing pixels. The default value is `'300px'`.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            popupWidth = "250px",
            popupHeight = "200px"
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            popupWidth = "250px",
            popupHeight = "200px"
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("popup-size")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult PopupSize()
{
    return View();
}
```

## Configure the Item Template

Use the `ItemTemplate` property to customize the appearance of items in the mention suggestion popup. You can use it to display additional information or visual elements, such as an avatar, icon, or description, along with the mention item's display text.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            itemTemplate = @"<div class='mention-item'><span class='mention-name'>${name}</span><span class='mention-description'>${description}</span></div>"
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            itemTemplate = @"<div class='mention-item'><span class='mention-name'>${name}</span><span class='mention-description'>${description}</span></div>"
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("item-template")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        }, 1000);
    }
</script>

<style>
    .e-assist-mention .mention-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 38px;
        padding: 6px 0;
        line-height: 1.2;
    }

    .e-assist-mention .mention-name {
        font-size: 13px;
        font-weight: 600;
    }

    .e-assist-mention .mention-description {
        margin-top: 2px;
        color: var(--color-sf-text-muted, #6b6b6b);
        font-size: 11px;
    }
</style>
```

```csharp
public ActionResult ItemTemplate()
{
    return View();
}
```

## Configure the No Records Template

Use the `NoRecordsTemplate` property to customize the content displayed when no mention items match the text entered by the user. The default value is `'No records found'`.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" },
            noRecordsTemplate = "No matching agents found. Try a different search."
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false,
            noRecordsTemplate = "No matching commands found. Try a different search."
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("no-records-template")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .Render()
    )
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult NoRecordsTemplate()
{
    return View();
}
```

## Handle Mention Selection

The `MentionSelect` event is triggered when a user selects an item from the mention suggestion popup. Use this event to access the selected mention data and perform custom actions.

The following table describes the event arguments available on the `MentionSelect` event.

| Argument | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Specifies whether the mention selection should be canceled. Set to `true` to prevent the default selection action. |
| `event` | `Event` | Specifies the original event that triggered the mention selection. Provides access to the underlying browser event details. |
| `isInteracted` | `boolean` | Specifies whether the selection was initiated through user interaction. Returns `true` when the action is performed directly by the user. |
| `itemData` | `FieldSettingsModel` | Specifies the data associated with the selected mention item. Contains the field settings information for the selected mention. |
| `name` | `string` | Specifies the name of the event. |

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var agents = new List<object>
    {
        new
        {
            id = "TechSupport",
            name = "TechSupport",
            description = "Troubleshoot technical issues",
            placeholder = "Ask about VPN, network, or device issues"
        },
        new
        {
            id = "HRAssistant",
            name = "HRAssistant",
            description = "Get assistance with HR policies",
            placeholder = "Ask about leave, benefits, and HR policies"
        },
        new
        {
            id = "KnowledgeBase",
            name = "KnowledgeBase",
            description = "Search internal documentation",
            placeholder = "Search the internal knowledge base"
        }
    };
    var commands = new List<object>
    {
        new
        {
            id = "table",
            name = "/table",
            description = "Answer as a markdown table",
            placeholder = "Format the response as a table"
        },
        new
        {
            id = "rewrite",
            name = "/rewrite",
            description = "Rewrite content for clarity",
            placeholder = "Improve clarity and professional tone"
        },
        new
        {
            id = "checklist",
            name = "/checklist",
            description = "Create a step-by-step checklist",
            placeholder = "Convert the response into a checklist"
        }
    };

    var mentions = new List<object>
    {
        new
        {
            mentionChar = "@",
            dataSource = agents,
            fields = new { text = "name", value = "id" }
        },
        new
        {
            mentionChar = "/",
            dataSource = commands,
            fields = new { text = "name", value = "id" },
            showMentionChar = false
        }
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @(
        Html.EJS().AIAssistView("mention-select")
            .PromptPlaceholder("Type '@' for agents or '/' for commands...")
            .Mentions((object)mentions)
            .PromptRequest("onPromptRequest")
            .Created("onCreated")
            .MentionSelect("onMentionSelect")
            .Render()
    )
    <p id="mention-status" aria-live="polite"></p>
</div>

<script>
    var assistObj;

    function onCreated() {
        assistObj = this;
    }

    function onPromptRequest() {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 1000);
    }

    function onMentionSelect(args) {
        var item = args && args.itemData ? args.itemData : {};
        var statusElement = document.getElementById('mention-status');
        if (statusElement) {
            statusElement.textContent = 'Selected mention: ' + (item.name || item.id || '');
        }
    }
</script>
```

**Event Arguments:**

The following arguments are available in the `mentionSelect` event handler:

| Argument | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Specifies whether the mention selection should be canceled. Set to `true` to prevent the default selection action. |
| `event` | `Event` | Specifies the original event that triggered the mention selection. Provides access to the underlying browser event details. |
| `isInteracted` | `boolean` | Specifies whether the selection was initiated through user interaction. Returns `true` when the action is performed directly by the user. |
| `itemData` | `FieldSettingsModel` | Specifies the data associated with the selected mention item. Contains the field settings information for the selected mention. |
| `name` | `string` | Specifies the name of the event. |

```csharp
public ActionResult MentionSelect()
{
    return View();
}
```
