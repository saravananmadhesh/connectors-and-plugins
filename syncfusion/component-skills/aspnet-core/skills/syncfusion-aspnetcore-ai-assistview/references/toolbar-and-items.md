# Toolbar Configuration and Items in AI AssistView

## Table of Contents
- [Configure Footer Toolbar](#configure-footer-toolbar)
- [Toolbar Positioning](#toolbar-positioning)
- [Adding Custom Items](#adding-custom-items)
- [Item Click Event](#item-click-event)
- [Adding Header Toolbar Items](#adding-header-toolbar-items)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Adding Custom Toolbar Items](#adding-custom-toolbar-items)
- [Regenerate Responses](#regenerate-responses)

## Configure Footer Toolbar

By default, the footer toolbar renders the `send` item. If attachment is enabled, the `attachment` item will also be rendered which allows users to send the prompt text or attach files as needed.

In the following example, AI AssistView component rendered with footer toolbar items such as `send` and `attachment` icons.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").EnableAttachments(true).PromptRequest("onPromptRequest").Created("onCreated").Render()
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
        }, 2000);
    }
</script>
```

## Toolbar Positioning

You can use the `ToolbarPosition` property to customize footer toolbar position. It has two modes such as `Inline`, and `Bottom`. By default, the toolbarPosition is `Inline`.

By setting toolbarPosition as `Bottom`, footer items will be rendered at the bottom with a dedicated footer area.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <button id="toolbarBtn" class="e-btn" onclick="UpdateToolbarPosition()">UpdateToolbarPosition</button>
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-footertoolbarsettings ToolbarPosition="Bottom"></e-aiassistview-footertoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }

    function UpdateToolbarPosition() {
        if (assistObj.footerToolbarSettings.toolbarPosition === 'Inline') {
            assistObj.footerToolbarSettings.toolbarPosition = 'Bottom';
        }
        else {
            assistObj.footerToolbarSettings.toolbarPosition = 'Inline';
        }
    }
</script>

<style>
    #toolbarBtn {
        margin-bottom: 10px;
    }
</style>
```

## Adding Custom Items

You can use the `e-aiassistview-footertoolbarsettings` tag helper to add custom items for the footer toolbar in the AI AssistView. The custom items will be added with the existing built-in items in the footer toolbar.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-footertoolbarsettings ToolbarPosition="Bottom" items="ViewBag.Items"></e-aiassistview-footertoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

## Item Click Event

The `ItemClick` event is triggered when the footer toolbar item is clicked.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-footertoolbarsettings itemClick="function(args){ footerItemClicked(args) }"></e-aiassistview-footertoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>

<script>
    function footerItemClicked(args) {
        // your required action here..
    }
</script>
```

## Adding Header Toolbar Items

### Items

The AI AssistView toolbar's can be rendered by defining an array of items. Items can be constructed with the following built-in command types or item template.

#### Adding Icon CSS

You can customize the toolbar icons by using the `iconCss` property.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();

public ActionResult Align()
{
    Items.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string align { get; set; }

    public string iconCss { get; set; }
}
```

#### Setting Item Type

You can change the toolbar item type by using the `type` property. The `type` supports three types of items such as `Button`, `Separator` and `Input`. By default, the type is `Button`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
public ActionResult ItemType()
{
    Items.Add(new ToolbarItemModel { type = "Button", iconCss = "e-icons e-refresh", align = "Right" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string iconCss { get; set; }
    public string align { get; set; }
    public string type { get; set; }
}
```

#### Setting Text

You can use the `text` property to set the text for toolbar item.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
using Syncfusion.EJ2.Navigations;

public List<ToolbarItem> Items = new List<ToolbarItem>();
public ActionResult Text()
{
    Items.Add(new ToolbarItem { Text = "Welcome User !", Align = ItemAlign.Right });
    ViewBag.Items = Items;
    return View();
}
```

#### Show or Hide Toolbar Item

You can use the `visible` property to specify whether to show or hide the toolbar item. By default, its value is `true`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
using Syncfusion.EJ2.Navigations;

public List<ToolbarItem> Items = new List<ToolbarItem>();
public ActionResult Visible()
{
    Items.Add(new ToolbarItem { Visible = false, Align = ItemAlign.Right, CssClass = "e-icons e-refresh" });
    ViewBag.Items = Items;
    return View();
}
```

#### Setting Disabled

You can use the `disabled` property to disable the toolbar item. By default, its value is `false`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
public ActionResult CustomResponse()
{
    Items.Add(new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right", disabled = true });
    Items.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-user" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string iconCss { get; set; }
    public string align { get; set; }
    public bool disabled { get; set; }
}
```

#### Setting Tooltip Text

You can use the `tooltip` property to specify the tooltip text to be displayed on hovering the toolbar item.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
public ActionResult Tooltip()
{
    Items.Add(new ToolbarItemModel { type = "Button", iconCss = "e-icons e-refresh", align = "Right", tooltip = "Refresh" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string type { get; set; }
    public string iconCss { get; set; }
    public string align { get; set; }
    public string tooltip { get; set; }
}
```

#### Setting CSS Class

You can use the `cssClass` property to customize the toolbar item.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>

<style>
    .custom-btn .e-user::before {
        color: blue;
        font-size: 15px;
    }
    .custom-btn.e-toolbar-item button.e-tbar-btn {
        border: 1px solid #dcdcdc;
    }
</style>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();

public ActionResult CssClass()
{
    Items.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-user", cssClass = "custom-btn", type = "Button" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string align { get; set; }
    public string iconCss { get; set; }
    public string type { get; set; }
    public string cssClass { get; set; }
}
```

#### Setting Alignment

You can change the alignment of toolbar item by using the `align` property. It supports three types of alignments such as `Left`, `Center` and `Right`. By default, the value is `Left`.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();

public ActionResult Align()
{
    Items.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string align { get; set; }
    public string iconCss { get; set; }
}
```

#### Enabling Tab Key Navigation

The `tabIndex` property of a Toolbar item is used to enable tab key navigation for the item. By default, the user can switch between items using the arrow keys, but the `tabIndex` property allows you to switch between items using the Tab and Shift+Tab keys as well.

```csharp
public List<ToolbarItem> Items = new List<ToolbarItem>();

public ActionResult Index()
{
    Items.Add(new ToolbarItem { Text = "Item 1", TabIndex = 1 });
    Items.Add(new ToolbarItem { Text = "Item 2", TabIndex = 2 });
    ViewBag.ToolbarItems = Items;
    return View();
}
```

#### Setting Template

You can use the `template` property to add custom toolbar item in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="ViewBag.Items"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
        var splitBtnObj = new ej.splitbuttons.DropDownButton({
            items: [
                { text: 'हिंदी' },
                { text: 'தமிழ்' },
                { text: 'తెలుగు' }
            ],
            content: 'English',
            iconCss: 'e-icons e-translate',
            cssClass: 'custom-dropdown'
        });
        splitBtnObj.appendTo('#ddMenu');
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>

<style>
    .custom-dropdown.e-dropdown-popup ul {
        min-width: 100px;
    }
</style>
```

```csharp
using Syncfusion.EJ2.Navigations;

public List<ToolbarItem> Items = new List<ToolbarItem>();
public ActionResult Template()
{
    Items.Add(new ToolbarItem { Type = ItemType.Input, Template = "<div id=\"ddMenu\"></div>", Align = ItemAlign.Center });
    ViewBag.Items = Items;
    return View();
}
```

### Item Clicked

The `itemClicked` event is triggered when the header toolbar item is clicked. The event argument (`ToolbarItemClickedEventArgs`) provides the following properties:

| Property | Type | Description |
|---|---|---|
| `item` | `ToolbarItemModel` | The toolbar item that was clicked. |
| `cancel` | `boolean` | Set to `true` to cancel the default action of the click. |
| `dataIndex` | `number` | The index of the message data associated with the click (not applicable for header toolbar). |
| `event` | `Event` | The underlying browser event that triggered the click. |
| `name` | `string` | The name of the event. |

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-toolbarsettings items="@Model.Items" itemClicked="onHeaderItemClicked"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
    function onHeaderItemClicked(args) {
        // args.item       - the clicked toolbar item model
        // args.event      - the browser click event
        console.log('Header toolbar item clicked:', args.item.iconCss);
    }
</script>
```

## Built-in Toolbar Items

### Prompt Toolbar

By default, the prompt toolbar renders the built-in items such as `edit` and `copy` items. These allow users to edit the prompt text or copy as needed.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

### Response Toolbar

By default, the response toolbar renders the built-in items like `copy`, `like`, and `dislike` items to perform response copy and perform rating actions.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

## Adding Custom Toolbar Items

### Prompt Toolbar

You can use the `e-aiassistview-prompttoolbarsettings` tag helper to add custom items for the prompt toolbar in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-prompttoolbarsettings items="ViewBag.Items"></e-aiassistview-prompttoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

### Response Toolbar

You can use the `e-aiassistview-responsetoolbarsettings` tag helper to add custom response toolbar in the AI AssistView.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-responsetoolbarsettings items="ViewBag.Items"></e-aiassistview-responsetoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
</script>
```

### Prompt Toolbar Item Clicked

You can use the `itemClicked` event on `e-aiassistview-prompttoolbarsettings` to handle clicks on custom prompt toolbar items. The event argument provides `item`, `dataIndex`, `cancel`, `event`, and `name` properties.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-prompttoolbarsettings items="ViewBag.Items" itemClicked="onPromptItemClicked"></e-aiassistview-prompttoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
    function onPromptItemClicked(args) {
        // args.item       - the clicked toolbar item model
        // args.dataIndex  - index of the prompt in the prompts collection
        console.log('Prompt toolbar item clicked at index:', args.dataIndex);
    }
</script>
```

### Response Toolbar Item Clicked

You can use the `itemClicked` event on `e-aiassistview-responsetoolbarsettings` to handle clicks on custom response toolbar items. The event argument provides `item`, `dataIndex`, `cancel`, `event`, and `name` properties.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };

    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@promptsData" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-responsetoolbarsettings items="ViewBag.Items" itemClicked="onResponseItemClicked"></e-aiassistview-responsetoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
    function onResponseItemClicked(args) {
        // args.item       - the clicked toolbar item model
        // args.dataIndex  - index of the response in the prompts collection
        // args.cancel     - set to true to cancel the default action
        console.log('Response toolbar item clicked at index:', args.dataIndex);
    }
</script>
```

## Regenerate Responses

The AI AssistView allows users to `regenerate` responses to request a new response for the same prompt. The navigation buttons with `previous` and `next` buttons are rendered along with a response index indicator (e.g., `1 / 3`) allowing users to navigate between all regenerated responses for the prompt.

> The navigation UI appears automatically once more than one response is available for a prompt either regenerated or preloaded using the `RegeneratedResponses` property in the `prompts` collection.

### Adding Regenerate Item

You can enable the regenerate button by adding the `e-assist-regenerate` icon to the `e-aiassistview-responsetoolbarsettings` tag helper.

### Adding Regenerated Response

When regenerated, it triggers the `promptRequest` event with the existing prompt, enabling you to call your preferred AI service again and update the response using the `addPromptResponse` method.

In the following example, AI AssistView control rendered with the built-in `regenerate` toolbar item in the response toolbar.

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@(ViewData["Prompts"])" promptRequest="onPromptRequest" created="onCreated">
        <e-aiassistview-responsetoolbarsettings items="@(ViewData["ToolbarItems"])" ></e-aiassistview-responsetoolbarsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj = null;

    var regenerateResponses = @Html.Raw(JsonSerializer.Serialize(ViewData["RegenerateResponses"]));

    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById('aiAssistView'), 'aiassistview');
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            var foundPrompt = assistObj.prompts.find(prompt => prompt.prompt == args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            var response;
            if (foundPrompt) {
                var randomIndex = Math.floor(Math.random() * regenerateResponses.length);
                response = regenerateResponses[randomIndex];
                } else {
                    response = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.";
                }
                assistObj.addPromptResponse(response);
            }, 1000);
    }
</script>
```

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace WebApplication.Pages
{
    public class RegenerateResponseModel : PageModel
    {
        public void OnGet()
        {
            var regenerateResponses = new[] {
                "AI, or Artificial Intelligence, refers to the simulation of human intelligence in machines programmed to think and learn like humans.",
                "Artificial Intelligence is the development of computer systems capable of performing tasks that typically require human intelligence.",
                "AI is a branch of computer science focused on building machines that can perform tasks requiring human-like intelligence."
            };

            ViewData["Prompts"] = new[]
            {
                new {
                    prompt = "What is AI?",
                    response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>",
                    suggestionData = new List<string>(),
                    regeneratedResponses = regenerateResponses
                }
            };

            ViewData["ToolbarItems"] = new[] {
                new { type = "Button", iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
                new { type = "Button", iconCss = "e-icons e-assist-like", tooltip = "Like" },
                new { type = "Button", iconCss = "e-icons e-assist-dislike", tooltip = "Need Improvement" },
                new { type = "Button", iconCss = "e-icons e-assist-regenerate", tooltip = "Regenerate" }
            };

            ViewData["RegenerateResponses"] = regenerateResponses;
        }
    }
}
```

### Pre-loading Regenerated Responses

You can use the `RegeneratedResponses` property in the `prompts` collection to pre-load multiple responses for a prompt at the initial render, without requiring the user to trigger the regenerate action. Users can navigate between the pre-loaded responses using the `previous` and `next` buttons in the response navigation UI.

In the following example, the `RegeneratedResponses` property is used to pre-load multiple responses for a prompt.

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
	<ejs-aiassistview id="aiAssistView" prompts="@(ViewData["Prompts"])" promptRequest="onPromptRequest" created="onCreated">
		<e-aiassistview-responsetoolbarsettings items="@(ViewData["ToolbarItems"])" ></e-aiassistview-responsetoolbarsettings>
	</ejs-aiassistview>
</div>

<script>
	var assistObj = null;

	function onCreated() {
		assistObj = ej.base.getComponent(document.getElementById('aiAssistView'), 'aiassistview');
	}

	function onPromptRequest(args) {
		setTimeout(function () {
			var foundPrompt = assistObj.prompts.find(prompt => prompt.prompt == args.prompt);
			var defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
			assistObj.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
		}, 1000);
	}

</script>
```

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication.Pages
{
    public class RegeneratePreloadModel : PageModel
    {
        // Core (Razor Pages) sample action providing prompts and toolbar items
        public void OnGet()
        {
            ViewData["Prompts"] = new[]
            {
                new {
                    prompt = "What is AI?",
                    response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>",
                    regeneratedResponses = new[] {
                        "AI, or Artificial Intelligence, refers to the simulation of human intelligence in machines programmed to think and learn like humans.",
                        "Artificial Intelligence is the development of computer systems capable of performing tasks that typically require human intelligence.",
                        "AI is a branch of computer science focused on building machines that can perform tasks requiring human-like intelligence."
                    }
                }
            };

            ViewData["ToolbarItems"] = new[] {
                new { type = "Button", iconCss = "e-icons e-assist-copy", tooltip = "Copy" },
                new { type = "Button", iconCss = "e-icons e-assist-like", tooltip = "Like" },
                new { type = "Button", iconCss = "e-icons e-assist-dislike", tooltip = "Need Improvement" },
                new { type = "Button", iconCss = "e-icons e-assist-regenerate", tooltip = "Regenerate" }
            };
        }
    }
}
```
