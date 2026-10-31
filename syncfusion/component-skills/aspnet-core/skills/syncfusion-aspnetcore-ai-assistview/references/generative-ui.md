# Generative UI in AI AssistView

## Table of Contents
- [Register Tools](#register-tools)
- [Configure Tool Template and Handler](#configure-tool-template-and-handler)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)

## Register Tools

You can register custom tools using the `registerToolUI` method. It accepts tool name as string values, template and optional handler function. Tools are invoked by their name within block responses added through `addPromptResponse` method.

> **Note:** Use the blockType as `tool` and provide the tool name with the required properties through `props`. Tool should be registered before adding in responses and tool name should be unique.

## Configure Tool Template and Handler

When registering a tool, you can configure how it appears by specifying a template and implement its behavior through a handler function. The template controls the UI layout, while the handler is provided with the container element and any additional actions needed to enable interactive functionality.

In the following example, the AI AssistView component is rendered with custom tool registrations including weather cards, recipe makers, and recipe scoring tools.

```razor
@model IndexModel
@using Syncfusion.EJ2.InteractiveChat

<div id="register-tool" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView"
                        promptSuggestionsHeader="Suggested Prompts"
                        promptSuggestions="@Model.ViewModel.PromptSuggestions"
                        enableStreaming="true"
                        showClearButton="true"
                        promptRequest="onPromptRequest">
        <e-aiassistview-toolbarsettings items="@Model.ViewModel.Items" itemClicked="toolbarItemClicked"></e-aiassistview-toolbarsettings>
    </ejs-aiassistview>
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
                response: ""
            },
            {
                prompt: "Generate a score analysis for this recipe.",
                response: ""
            },
            {
                prompt: "Create a recipe",
                response: ""
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
            return '<div class="recipe-panel e-card">' +
                   '<div class="recipe-header">' +
                   '<h3 class="recipe-title" contenteditable="true">' + data.title + '</h3>' +
                   '</div>' +
                   '<div class="recipe-section">' +
                   '<h4>Ingredients</h4>' +
                   '<div class="ingredients-list">' +
                   (data.ingredients || []).map(function(ing) {
                       return '<div class="ingredient-item">' +
                              '<span class="ingredient-name" contenteditable="true">' + (ing.name || '') + '</span>' +
                              '<span class="ingredient-qty" contenteditable="true">' + (ing.quantity || '') + '</span>' +
                              '</div>';
                   }).join('') +
                   '</div>' +
                   '</div>' +
                   '<div class="recipe-section">' +
                   '<h4>Instructions</h4>' +
                   '<div class="instructions-list">' +
                   (data.instructions || []).map(function(instr, idx) {
                       return '<div class="step-item">' +
                              '<span class="step-text" contenteditable="true">' + (idx + 1) + '. ' + instr + '</span>' +
                              '</div>';
                   }).join('') +
                   '</div>' +
                   '</div>' +
                   '<button class="check-score-btn e-btn e-primary">Check Recipe Score</button>' +
                   '</div>';
        }

        // Register Recipe Tool
        aiAssistViewInst.registerToolUI({
            toolName: 'recipe-maker',
            template: recipeTemplate({}),
            handler: function(container, action) {
                var checkBtn = container.querySelector('.check-score-btn');
                if (checkBtn) {
                    checkBtn.onclick = function() {
                        var recipe = getCurrentRecipeData(container);
                        var score = calculateRecipeScore(recipe);
                        scoreBlocks = [
                            { blockType: "text", content: "Here's an analysis of your recipe:" },
                            { blockType: "tool", toolName: "recipe-score-gauge", props: { score: score, recipe: recipe } }
                        ];
                        aiAssistViewInst.addPromptResponse({ blocks: scoreBlocks });
                    };
                }
            }
        });

        // ==================== RECIPE SCORE GAUGE TEMPLATE ====================
        function recipeScoreGaugeTemplate(args) {
            var score = args.score || 85;
            return '<div class="score-gauge-panel e-card">' +
                   '<div class="score-gauge" id="recipeScoreGauge"></div>' +
                   '<div class="score-value">' + score + '%</div>' +
                   '<div class="gauge-annotation">' + getScoreComment(score) + '</div>' +
                   '</div>';
        }

        aiAssistViewInst.registerToolUI({
            toolName: 'recipe-score-gauge',
            template: recipeScoreGaugeTemplate({}),
            handler: function(container, action) {
                if (action && action.props) {
                    var score = action.props.score;
                    var gaugeDiv = container.querySelector('#recipeScoreGauge');
                    if (gaugeDiv) {
                        new ej.circulargauge.CircularGauge({
                            axes: [{
                                minimum: 0,
                                maximum: 100,
                                majorTicks: { interval: 20 },
                                lineStyle: { thickness: 2 },
                                pointers: [{ value: score, radius: '80%', type: 'Marker', markerShape: 'Circle' }],
                                ranges: [
                                    { start: 0, end: 30, color: '#FF5733' },
                                    { start: 30, end: 60, color: '#FFC300' },
                                    { start: 60, end: 100, color: '#4CAF50' }
                                ]
                            }]
                        }).appendTo(gaugeDiv);
                    }
                }
            }
        });
    };

    // ====================== RECIPE DATA / SCORING ======================
    function getCurrentRecipeData(container) {
        return {
            title: container.querySelector('.recipe-title').textContent.trim() || "Untitled Recipe",
            ingredients: Array.from(container.querySelectorAll('.ingredient-item')).map(function(item) {
                return {
                    name: item.querySelector('.ingredient-name').textContent.trim(),
                    quantity: item.querySelector('.ingredient-qty').textContent.trim()
                };
            }).filter(Boolean),
            instructions: Array.from(container.querySelectorAll('.step-item')).map(function(item) {
                return item.querySelector('.step-text').textContent.replace(/^\d+\.\s*/, '');
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
            if (n.length && q.length) validIng++;
        }
        score += (validIng >= 5 ? 10 : validIng === 1 ? -20 : validIng === 2 ? -10 : 0);
        for (i = 0; i < ins.length; i++) {
            var s = (ins[i] || "").trim();
            if (s.length > 10) validSteps++;
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
                { name: "Bread Slice", quantity: "2" },
                { name: "Butter", quantity: "2 tbsp" },
                { name: "Salt", quantity: "To taste" }
            ],
            instructions: [
                "Toast the bread slices until golden brown",
                "Apply butter generously on both sides",
                "Add salt to taste"
            ]
        };

        aiAssistViewInst.addPromptResponse({
            blocks: [
                { blockType: "text", content: "Here's a simple recipe for you:" },
                { blockType: "tool", toolName: "recipe-maker", props: mockRecipe }
            ]
        });
    }

    function toolbarItemClicked(args) {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewInst.prompts = [];
            aiAssistViewInst.promptSuggestions = @Html.Raw(Json.Serialize(Model.ViewModel.PromptSuggestions));
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
        gap: 10px;
        text-align: center;
    }

    #register-tool .e-assist-tool .e-card:hover,
    #register-tool .e-assist-tool .e-card-content:hover {
        background: none;
    }

    #register-tool .recipe-panel {
        border-radius: 16px;
        background: #f9fafb;
        padding: 15px 10px;
    }

    #register-tool .recipe-title {
        margin: 0 0 24px 0;
        font-size: 1.4rem;
        font-weight: 600;
    }

    #register-tool .recipe-section {
        margin-bottom: 15px;
    }

    #register-tool .recipe-section h4 {
        margin: 20px 0 12px 0;
        font-size: 1.1rem;
    }

    #register-tool .ingredient-item,
    #register-tool .step-item {
        display: flex;
        gap: 10px;
        padding: 8px;
        margin-bottom: 8px;
        border: 1px solid #e2e8f0;
    }

    #register-tool .ingredient-name { flex: 1; font-weight: 500; }
    #register-tool .ingredient-qty {
        font-size: 0.95em;
        color: #666;
        text-align: right;
    }

    #register-tool .e-assist-tool .check-score-btn.e-btn {
        width: fit-content;
        margin: 10px auto;
        margin-top: 10px;
    }

    #register-tool .e-assist-tool .score-gauge-panel.e-card .e-circulargauge svg {
        border-radius: 10px;
    }

    #register-tool .recipe-header {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    #register-tool .ingredients-list,
    #register-tool .instructions-list {
        margin-top: 10px;
    }

    #register-tool .ingredient-item,
    #register-tool .step-item {
        display: flex;
        gap: 10px;
        padding: 8px;
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
        border-radius: 10px;
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
        color: #333;
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
namespace WebApplication.Pages
{
    public class IndexModel : PageModel
    {
        public IndexViewModel ViewModel { get; set; } = new IndexViewModel();

        public void OnGet()
        {
            ViewModel.Items = new List<ToolbarItemModel>
            {
                new ToolbarItemModel { iconCss = "e-icons e-refresh", align = "Right" }
            };

            ViewModel.PromptSuggestions = new[]
            {
                "What is the weather in New York?",
                "Generate a score analysis for this recipe.",
                "Create a recipe"
            };
        }
    }

    public class IndexViewModel
    {
        public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();
        public string[] PromptSuggestions { get; set; }
    }

    public class ToolbarItemModel
    {
        public string align { get; set; }
        public string iconCss { get; set; }
    }
}
```

## Add Tools in Prompt Responses

Use the `addPromptResponse` method to dynamically add tools to AI responses by passing the tool blocks in the response.

```razor
var weatherData = [
    { blockType: "text", content: "Here is the current weather forecast for your location:" },
    { blockType: "tool", toolName: "weather-card" },
    { blockType: "text", content: "**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**." }
];

aiAssistViewInst.addPromptResponse({ blocks: weatherData });
```

## Configure AI for Generative UI Responses

You can configure the AI service to return structured JSON blocks through `system prompt`. This ensures that AI-generated content is properly formatted and rendered as interactive tools or text blocks.

The following example demonstrates how to connect your AI service to generate and display dynamic UI components within the AI AssistView.

```razor
@model IndexModel
@using Syncfusion.EJ2.InteractiveChat

<div class="generative-ui-section">
    <ejs-aiassistview id="aiAssistView"
                      promptRequest="onPromptRequest"
                      created="onCreated">
    </ejs-aiassistview>
</div>

<script>
    var assistObj = null;

    var systemPrompt = `
        You are an AI assistant that generates Syncfusion AIAssistView blocks.
        Return structured JSON responses with the following format:
        {
            "blocks": [
                { "blockType": "text", "content": "text content here" },
                { "blockType": "tool", "toolName": "weather-card", "props": { ... } }
            ]
        }
        
        1. For text responses, use blockType "text" with markdown content.
        2. For dynamic tools, use blockType "tool" with appropriate toolName and props.
        3. Combine multiple blocks for comprehensive responses.
        4. Whenever weather-related queries are requested, invoke the weather-tool block with blockType "tool" and toolName "weather-tool".
    `;

    function onCreated() {
        assistObj = ej.base.getComponent(document.getElementById("aiAssistView"), "aiassistview");

        assistObj.registerToolUI({
            toolName: 'weather-tool',
            template: weatherTemplate({}),
            handler: function(container, action) {
                // Handler logic for weather tool
            }
        });
    }

    function weatherTemplate(args) {
        return `<div tabindex="0" class="e-card" id="weather_card" role="button">
            <div class="e-card-header">
                <div class="e-card-header-caption">
                    <div class="e-card-header-title">Today</div>
                    <div class="e-card-sub-title">New York - Scattered Showers.</div>
                </div>
            </div>
        </div>`;
    }

    async function onPromptRequest(args) {
        var apiKey = ''; // Your API key here
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: args.prompt }
                    ]
                })
            });

            const data = await response.json();
            const blockData = JSON.parse(data.choices[0].message.content);
            assistObj.addPromptResponse({ blocks: blockData.blocks });
        } catch (error) {
            console.error('Error calling AI service:', error);
            assistObj.addPromptResponse('Error processing your request.');
        }
    }
</script>
```
