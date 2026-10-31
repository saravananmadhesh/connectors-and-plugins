# Generative UI — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Register Tools](#register-tools)
  - [Configure Tool Template and Handler](#configure-tool-template-and-handler)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
  - [Tool Block Type](#tool-block-type)
  - [Example — Weather Card Tool](#example--weather-card-tool)
  - [Example — Recipe Card Tool](#example--recipe-card-tool)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)
  - [System Prompt Pattern](#system-prompt-pattern)

---

## Register Tools

The `Generative UI` in AI AssistView allows you to render dynamic tools and UI elements within the AI AssistView. This enables seamless integration of interactive components based on AI-generated responses.

You can register custom tools using the `registerToolUI` method. It accepts tool name as string values, template and optional handler function. Tools are invoked by their name within block responses added through `addPromptResponse` method.

> **Note:** Use the blockType as `tool` and provide the tool name with the required properties through `props`. Tool should be registered before adding in responses and tool name should be unique.

### Configure Tool Template and Handler

When registering a tool, you can configure how it appears by specifying a template and implement its behavior through a handler function. The template controls the UI layout, while the handler is provided with the container element and any additional actions needed to enable interactive functionality.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div id="register-tool" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").PromptSuggestionsHeader("Suggested Prompts").PromptSuggestions((string[])ViewBag.PromptSuggestions).EnableStreaming(true).ShowClearButton(true).ToolbarSettings(new AIAssistViewToolbarSettings()
    {
        Items = ViewBag.Items,
        ItemClicked = "toolbarItemClicked"
    }).PromptRequest("onPromptRequest").Render()
</div>

<script>
    var aiAssistViewInst = null;
    var scoreBlocks = [];
    var weatherData = [
        { blockType: "text", content: "Here is the current weather forecast for your location:" },
        { blockType: "tool", toolName: "weather-card" },
        { blockType: "text", content: "**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**. There is a **100% chance of snow**, so it's recommended to bundle up and exercise caution if traveling. The weather system is expected to continue throughout the day with moderate precipitation." }
    ];

    window.onload = function () {
        aiAssistViewInst = ej.base.getComponent(document.getElementById('aiAssistView'), 'aiassistview');
        
        aiAssistViewInst.prompts = [
            {
                prompt: "What is the weather in New York?",
                suggestionData: []
            }
        ];
        // Register Weather Card Tool
        aiAssistViewInst.registerToolUI({
            toolName: 'weather-card',
            template: '<div tabindex="0" class="e-card" id="weather_card" role="button"><div class="e-card-header"><div class="e-card-header-caption"><div class="e-card-header-title">Today</div><div class="e-card-sub-title">New York - Scattered Showers.</div></div></div><div class="e-card-header weather_report"><div class="e-card-header-image"></div><div class="e-card-header-caption"><div class="e-card-header-title">1º / -4º</div><div class="e-card-sub-title">Chance for snow: 100%</div></div></div></div>'
        });

        // ==================== RECIPE TEMPLATE ====================
        function recipeTemplate(args) {
            var data = Object.assign({ title: "Custom Recipe", ingredients: [], instructions: [] }, args);
            var ingredientsList = (data.ingredients || [])
                .map(function (ing) {
                    return '<div class="ingredient-item">' +
                        '<span class="ingredient-name">' + (ing.name || "") + '</span>' +
                        '<span class="ingredient-qty">' + (ing.quantity || "") + '</span>' +
                        '</div>';
                })
                .join('');
            var instructionsList = (data.instructions || [])
                .map(function (inst, idx) { return '<div class="step-item"><span>' + (idx + 1) + '.</span> <span class="step-text">' + inst + '</span></div>'; })
                .join('');
            return '<div class="recipe-panel">' +
                '<div class="recipe-title">' + data.title + '</div>' +
                '<div class="recipe-section">' +
                '<h4>Ingredients</h4>' +
                '<div class="ingredients-list">' + ingredientsList + '</div>' +
                '</div>' +
                '<div class="recipe-section">' +
                '<h4>Instructions</h4>' +
                '<div class="instructions-list">' + instructionsList + '</div>' +
                '</div>' +
                '<button class="check-score-btn e-btn e-primary">Check Recipe Score</button>' +
                '</div>';
        }

        // Register Recipe Tool
        aiAssistViewInst.registerToolUI({
            toolName: 'recipe-maker',
            template: recipeTemplate({}),
            handler: function (container, args) {
                var recipeContainer = container;
                var checkScoreBtn = recipeContainer.querySelector('.check-score-btn');
                if (checkScoreBtn) {
                    checkScoreBtn.addEventListener('click', function () {
                        var recipe = getCurrentRecipeData(recipeContainer);
                        var score = calculateRecipeScore(recipe);
                        var comment = getScoreComment(score);
                        var scoreBlock = {
                            blockType: "tool",
                            toolName: "recipe-score-gauge",
                            props: { score: score, comment: comment }
                        };
                        scoreBlocks = [scoreBlock];
                        aiAssistViewInst.addPromptResponse({ blocks: scoreBlocks });
                    });
                }
            }
        });

        // ==================== RECIPE SCORE GAUGE TEMPLATE ====================
        function recipeScoreGaugeTemplate(args) {
            var score = args.score || 85;
            var comment = args.comment || "Excellent recipe";
            return '<div class="score-gauge-panel e-card">' +
                '<div class="e-card-content">' +
                '<div id="gauge_' + Math.random().toString(36).substr(2, 9) + '" class="score-gauge"></div>' +
                '<div class="score-value">' + score + '/100</div>' +
                '<div class="gauge-annotation">' + comment + '</div>' +
                '</div>' +
                '</div>';
        }

        aiAssistViewInst.registerToolUI({
            toolName: 'recipe-score-gauge',
            template: recipeScoreGaugeTemplate({}),
            handler: function (container, args) {
                var gaugeContainer = container.querySelector('[id^="gauge_"]');
                if (gaugeContainer && ej.circulargauge) {
                    var gauge = new ej.circulargauge.CircularGauge({
                        axes: [{
                            minimum: 0, maximum: 100,
                            pointers: [{
                                value: args.props.score || 85,
                                radius: '60%', type: 'RangeBar', color: '#FF6B6B'
                            }]
                        }]
                    });
                    gauge.appendTo(gaugeContainer);
                }
            }
        });
    };

    // ====================== RECIPE DATA / SCORING ======================
    function getCurrentRecipeData(container) {
        return {
            title: container.querySelector('.recipe-title').textContent.trim() || "Untitled Recipe",
            ingredients: Array.from(container.querySelectorAll('.ingredient-item')).map(function (el) {
                return {
                    name: el.querySelector('.ingredient-name').textContent.trim(),
                    quantity: el.querySelector('.ingredient-qty').textContent.trim()
                };
            }).filter(Boolean),
            instructions: Array.from(container.querySelectorAll('.step-item .step-text')).map(function (el) {
                return el.textContent.trim();
            }).filter(Boolean)
        };
    }

    function calculateRecipeScore(recipe) {
        var i, score = 100,
            ing = recipe.ingredients || [],
            ins = recipe.instructions || [],
            validIng = 0,
            validSteps = 0;
        if (!ing.length) return 15;
        if (!ins.length) return 20;
        for (i = 0; i < ing.length; i++) {
            var n = (ing[i].name || "").trim(),
                q = (ing[i].quantity || "").trim();
            if (n && n.length > 2 && q && q.length > 0) validIng++;
        }
        score += (validIng >= 5 ? 10 : validIng === 1 ? -20 : validIng === 2 ? -10 : 0);
        for (i = 0; i < ins.length; i++) {
            var s = (ins[i] || "").trim();
            if (s && s.length > 5) validSteps++;
        }
        score += (validSteps >= 4 ? 10 : validSteps === 1 ? -25 : validSteps === 2 ? -15 : validSteps === 3 ? -5 : 0);
        if (validIng >= 3 && validSteps >= 3) score += 8;
        score += Math.floor(Math.random() * 6);
        return score < 10 ? 10 : score > 100 ? 100 : score;
    }

    function getScoreComment(score) {
        if (score >= 90) return "Outstanding recipe! Highly recommended.";
        if (score >= 80) return "Very good recipe with excellent balance.";
        if (score >= 70) return "Solid recipe. Minor improvements possible.";
        return "Average recipe. Consider refining ingredients or steps.";
    }

    async function onPromptRequest(args) {
        await new Promise(function (resolve) { setTimeout(resolve, 1100); });

        if (args.prompt === "What is the weather in New York?") {
            aiAssistViewInst.addPromptResponse({ blocks: weatherData });
            return;
        }

        if (args.prompt === "Generate a score analysis for this recipe.") {
            aiAssistViewInst.addPromptResponse({ blocks: scoreBlocks });
            return;
        }

        var mockRecipe = {
            title: "Butter Toast",
            ingredients: [
                { name: "Bread", quantity: "2 slices" },
                { name: "Butter", quantity: "2 tbsp" }
            ],
            instructions: [
                "Toast the bread until golden brown",
                "Spread butter generously on warm toast",
                "Serve immediately"
            ]
        };

        aiAssistViewInst.addPromptResponse({
            blocks: [
                { blockType: "tool", toolName: "recipe-maker", props: mockRecipe }
            ]
        });
    }

    function toolbarItemClicked(args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = @Html.Raw(Json.Serialize(ViewBag.PromptSuggestions));
        }
    }
</script>

<style>
    #register-tool .banner-content .e-assistview-icon:before {
        font-size: 35px;
    }

    #register-tool .banner-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 330px;
        text-align: center;
    }

    #register-tool .e-assist-tool .e-card:hover,
    #register-tool .e-assist-tool .e-card-content:hover {
        background: none;
    }

    #register-tool .recipe-panel {
        border-radius: 16px;
        margin: 12px 0;
        padding: 15px 10px;
    }

    #register-tool .recipe-title {
        margin: 0 0 24px 0;
        font-size: 1.75rem;
        font-weight: 600;
        text-align: center;
        margin-bottom: 15px;
    }

    #register-tool .recipe-section h4 {
        margin: 20px 0 12px 0;
        font-size: 1.1rem;
    }

    #register-tool .ingredient-item,
    #register-tool .step-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-radius: 10px;
        margin-bottom: 10px;
        border: 1px solid #e2e8f0;
    }

    #register-tool .ingredient-name { flex: 1; font-weight: 500; }
    #register-tool .ingredient-qty {
        font-size: 0.95em;
        min-width: 80px;
        margin-right: 15px;
        text-align: right;
    }

    #register-tool .e-assist-tool .check-score-btn.e-btn {
        width: fit-content;
        margin: 0 auto;
        margin-top: 10px;
    }

    #register-tool .e-assist-tool .score-gauge-panel.e-card .e-circulargauge svg {
        border-radius: 10px;
    }

    #register-tool .recipe-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #register-tool .ingredients-list,
    #register-tool .instructions-list {
        margin-top: 10px;
    }

    #register-tool .ingredient-item,
    #register-tool .step-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
    }

    #register-tool .ingredient-name,
    #register-tool .step-text {
        flex: 1;
    }

    #register-tool .ingredient-qty {
        width: 90px;
        text-align: right;
    }

    #register-tool .editable {
        outline: none;
    }

    #register-tool .score-gauge-panel {
        padding: 20px;
        border-radius: 12px;
        text-align: center;
    }

    #register-tool .score-gauge {
        height: 380px;
        margin: 0 auto;
    }

    #register-tool .score-value {
        font-size: 2.4em;
        font-weight: bold;
        margin: 10px 0;
    }

    #register-tool .gauge-annotation {
        font-size: 22px;
        margin-top: 15px;
        font-family: inherit;
    }

    #register-tool #weather_card.e-card {
        background-image: url('https://ej2.syncfusion.com/javascript/demos/src/card/images/weather.png');
        width: 420px;
    }

    #register-tool #weather_card.e-card .e-card-header-caption .e-card-header-title,
    #register-tool #weather_card.e-card .e-card-header-caption .e-card-sub-title {
        color: white;
    }

    #register-tool #weather_card.e-card .weather_report .e-card-header-caption {
        text-align: right;
    }

    #register-tool #weather_card.e-card .e-card-header.weather_report .e-card-header-image {
        background-image: url('https://ej2.syncfusion.com/javascript/demos/src/card/images/rainy.svg');
    }

    #register-tool .col-xs-6.col-sm-6.col-lg-6.col-md-6 {
        width: 100%;
        padding: 10px;
    }

    #register-tool .card-layout {
        margin: auto;
        max-width: 400px;
    }
</style>
```

```csharp
namespace AssistViewDemo.Controllers
{
    public class HomeController : Controller
    {
        public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();

        public IActionResult Index()
        {
            Items.Add(new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" });
            ViewBag.Items = Items;
            ViewBag.PromptSuggestions = new string[] {
                "What is the weather in New York?",
                "Create a recipe",
                "Generate a score analysis for this recipe."
            };
            return View();
        }

        public class ToolbarItemModel
        {
            public string iconCss { get; set; }
            public string align { get; set; }
        }
    }
}
```

---

## Add Tools in Prompt Responses

Use the `addPromptResponse` method to dynamically add tools to AI responses by passing the tool blocks in the response.

### Tool Block Type

Tools are defined within the `blocks` array of the response object passed to `addPromptResponse()`. Each tool block requires:

| Property | Type | Description |
|---|---|---|
| `blockType` | `'tool'` | Identifies this block as a tool block. Required. |
| `toolName` | string | Name of the registered tool (must match `registerToolUI()` call). |
| `props` | object | Optional properties/data passed to the tool handler and template. |

### Example — Weather Card Tool

The weather card is registered without a handler (template-only), and invoked when the API response contains weather data:

```javascript
var weatherData = [
    { blockType: "text", content: "Here is the current weather forecast for your location:" },
    { blockType: "tool", toolName: "weather-card" },
    { blockType: "text", content: "**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**..." }
];

aiAssistViewInst.addPromptResponse({ blocks: weatherData });
```

### Example — Recipe Card Tool

The recipe card is registered with both a template and a handler. The handler attaches the "Check Recipe Score" button click event:

```javascript
aiAssistViewInst.registerToolUI({
    toolName: 'recipe-maker',
    template: recipeTemplate({}),
    handler: function (container, args) {
        var checkScoreBtn = container.querySelector('.check-score-btn');
        checkScoreBtn.addEventListener('click', function () {
            var recipe = getCurrentRecipeData(container);
            var score = calculateRecipeScore(recipe);
            var scoreBlock = { blockType: "tool", toolName: "recipe-score-gauge", props: { score: score } };
            aiAssistViewInst.addPromptResponse({ blocks: [scoreBlock] });
        });
    }
});
```

---

## Configure AI for Generative UI Responses

You can configure the AI service to return structured JSON blocks through a system prompt. This ensures that AI-generated content is properly formatted and rendered as interactive tools or text blocks.

### System Prompt Pattern

```cshtml
@using Syncfusion.EJ2.InteractiveChat

<div class="generative-ui-section">
    @Html.EJS().AIAssistView("aiAssistView").PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var assistObj = null;

    var systemPrompt = `
        You are an AI assistant that generates Syncfusion AIAssistView blocks.

        Return ONLY valid JSON.

        Instructions:
        1. Each response should be a JSON object with a 'blocks' array.
        2. Available block types: 'text' and 'tool'.
        3. Text blocks contain 'content' as markdown.
        4. Tool blocks require 'blockType' as 'tool', 'toolName' (string), and optional 'props' (object).
        5. Whenever weather-related queries are requested, invoke the weather-tool block with blockType "tool" and toolName "weather-tool".

        Example response:
        {
            "blocks": [
                { "blockType": "text", "content": "Here's what I found:" },
                { "blockType": "tool", "toolName": "weather-tool" }
            ]
        }
    `;

    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById("aiAssistView"), "aiassistview");
        
        assistObj.registerToolUI({
            toolName: 'weather-tool',
            template: weatherTemplate()
        });
    }

    function weatherTemplate(args) {
        return `<div tabindex="0" class="e-card" id="weather_card" role="button">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">Weather Forecast</div>
                </div>
            </div>
        </div>`;
    }

    async function onPromptRequest(args) {
        var apiKey = ''; // Your API key here
        
        try {
            var response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: args.prompt }
                    ],
                    temperature: 0.7
                })
            });
            
            var data = await response.json();
            var aiResponse = data.choices[0].message.content;
            var parsedResponse = JSON.parse(aiResponse);
            assistObj.addPromptResponse({ blocks: parsedResponse.blocks });
        } catch (error) {
            console.error('Error:', error);
            assistObj.addPromptResponse('Error connecting to AI service');
        }
    }
</script>
```

---

> **Important:** Ensure tool names are unique and registered before adding them to response blocks. Use the `props` field to pass dynamic data to tool handlers for customization and interactivity.
