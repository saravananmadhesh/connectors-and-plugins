# Tooltips and Help Pane

## Table of Contents

- [Ribbon Tooltips](#ribbon-tooltips)
- [Tooltip Settings](#tooltip-settings)
- [Help Pane](#help-pane)
- [Help Pane Templates](#help-pane-templates)
- [Best Practices](#best-practices)
- [Complete Example](#complete-example)

## Ribbon Tooltips

Tooltips display helpful information about ribbon items when users hover over them.

### Basic Tooltip Configuration

```razor
@{
    var copyTooltip = new RibbonTooltipSettings { 
        Title = "Copy", 
        Content = "Copy selected content to clipboard" 
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button ribbonTooltipSettings=copyTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-copy" 
                                        content="Copy">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Tooltip with Keyboard Shortcut

```razor
@{
    var pasteTooltip = new RibbonTooltipSettings { 
        Title = "Paste", 
        Content = "Paste content from clipboard<br/><strong>Keyboard:</strong> Ctrl+V" 
    };

    var cutTooltip = new RibbonTooltipSettings { 
        Title = "Cut", 
        Content = "Cut selected content<br/><strong>Keyboard:</strong> Ctrl+X" 
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button ribbonTooltipSettings=pasteTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-paste" 
                                        content="Paste">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button ribbonTooltipSettings=cutTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-cut" 
                                        content="Cut">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Tooltip Settings

### RibbonTooltipSettings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Title` | string | "" | Tooltip title text |
| `Content` | string | "" | Tooltip content text |
| `IconUrl` | string | "" | Icon URL or CSS class |
| `Position` | TooltipPosition | Auto | Tooltip position (TopLeft, TopCenter, TopRight, MiddleLeft, MiddleCenter, MiddleRight, BottomLeft, BottomCenter, BottomRight, Auto) |

### Complete Tooltip Example

```razor
@using Syncfusion.EJ2.Ribbon

@{
    var boldTooltip = new RibbonTooltipSettings { 
        Title = "Bold", 
        Content = "Make text bold for emphasis<br/><strong>Keyboard:</strong> Ctrl+B<br/><strong>Toggle:</strong> Press again to unbold",
        Position = TooltipPosition.TopCenter,
        IconUrl = "e-icons e-bold"
    };

    var italicTooltip = new RibbonTooltipSettings { 
        Title = "Italic", 
        Content = "Make text italic for emphasis<br/><strong>Keyboard:</strong> Ctrl+I",
        Position = TooltipPosition.TopCenter,
        IconUrl = "e-icons e-italic"
    };

    var underlineTooltip = new RibbonTooltipSettings { 
        Title = "Underline", 
        Content = "Underline text for emphasis<br/><strong>Keyboard:</strong> Ctrl+U",
        Position = TooltipPosition.TopCenter,
        IconUrl = "e-icons e-underline"
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Font">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button ribbonTooltipSettings=boldTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-bold" 
                                        isToggle=true 
                                        content="Bold">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button ribbonTooltipSettings=italicTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-italic" 
                                        isToggle=true 
                                        content="Italic">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button ribbonTooltipSettings=underlineTooltip>
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-underline" 
                                        isToggle=true 
                                        content="Underline">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Help Pane

The `helpPaneTemplate` property renders a custom template in the right side of the ribbon header row. Pass a CSS selector string pointing to a hidden container element.

### Enable Help Pane

```razor
<ejs-ribbon id="ribbon" helpPaneTemplate="#helpPaneContent">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<!-- Hidden template element referenced by helpPaneTemplate -->
<div id="helpPaneContent" style="display:none">
    <div style="padding: 0 10px; display: flex; align-items: center; gap: 6px;">
        <span class="e-icons e-help" style="font-size: 16px;"></span>
        <a href="#" style="font-size: 13px; text-decoration: none;">Help</a>
    </div>
</div>
```

### Help Pane with Inline Template String

You can also pass an inline HTML string directly to `helpPaneTemplate`:

```razor
@{
    string helpTemplate = "<button class='e-btn e-small' onclick='openHelp()'>? Help</button>";
}

<ejs-ribbon id="ribbon" helpPaneTemplate="@helpTemplate">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function openHelp() {
        window.open('https://your-docs-url.com', '_blank');
    }
</script>
```

## Help Pane Templates

### Dynamic Help Content Based on Tab Selection

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<div class="ribbon-wrapper">
    <ejs-ribbon id="ribbon" tabSelected="onTabSelected">
        <e-ribbon-tabs>
            <!-- Home Tab -->
            <e-ribbon-tab header="Home" keyTip="H">
                <e-ribbon-groups>
                    <e-ribbon-group header="Clipboard">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button>
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-copy" 
                                            content="Copy">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>
                </e-ribbon-groups>
            </e-ribbon-tab>

            <!-- Insert Tab -->
            <e-ribbon-tab header="Insert" keyTip="I">
                <e-ribbon-groups>
                    <e-ribbon-group header="Insert Objects">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button>
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-image" 
                                            content="Image">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>
                </e-ribbon-groups>
            </e-ribbon-tab>

            <!-- Review Tab -->
            <e-ribbon-tab header="Review" keyTip="R">
                <e-ribbon-groups>
                    <e-ribbon-group header="Proofing">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button>
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-spell-check" 
                                            content="Spelling">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>
                </e-ribbon-groups>
            </e-ribbon-tab>
        </e-ribbon-tabs>
    </ejs-ribbon>
</div>

<!-- Help Pane Area -->
<div class="help-pane" id="helpPane">
    <div class="help-header">
        <h3 id="helpTitle">Help: Home Tab</h3>
    </div>
    <div class="help-content" id="helpContent">
        <p>Welcome to the Home tab. Here you'll find common editing commands like Copy, Paste, and Cut.</p>
        <h4>Quick Tips:</h4>
        <ul>
            <li><strong>Copy (Ctrl+C):</strong> Copies selected content</li>
            <li><strong>Paste (Ctrl+V):</strong> Pastes copied content</li>
            <li><strong>Cut (Ctrl+X):</strong> Cuts selected content</li>
        </ul>
    </div>
</div>

<style>
    .help-pane {
        border-left: 1px solid #ddd;
        padding: 20px;
        background-color: #f9f9f9;
        height: 300px;
        overflow-y: auto;
    }

    .help-header {
        margin-bottom: 15px;
        border-bottom: 2px solid #007bff;
        padding-bottom: 10px;
    }

    .help-header h3 {
        margin: 0;
        color: #007bff;
    }

    .help-content {
        font-size: 14px;
        line-height: 1.6;
    }

    .help-content ul {
        margin-top: 10px;
        padding-left: 20px;
    }

    .help-content li {
        margin-bottom: 8px;
    }
</style>

<script>
    function onTabSelected(args) {
        var tabHeaders = {
            0: 'Help: Home Tab',
            1: 'Help: Insert Tab',
            2: 'Help: Review Tab'
        };

        var tabContents = {
            0: `<p>Welcome to the Home tab. Here you'll find common editing commands.</p>
                <h4>Quick Tips:</h4>
                <ul>
                    <li><strong>Copy (Ctrl+C):</strong> Copies selected content</li>
                    <li><strong>Paste (Ctrl+V):</strong> Pastes copied content</li>
                    <li><strong>Cut (Ctrl+X):</strong> Cuts selected content</li>
                </ul>`,
            1: `<p>The Insert tab contains commands for adding objects to your document.</p>
                <h4>Quick Tips:</h4>
                <ul>
                    <li><strong>Image:</strong> Insert images from your computer or online</li>
                    <li><strong>Table:</strong> Insert a table with custom rows and columns</li>
                    <li><strong>Shape:</strong> Insert shapes and drawings</li>
                </ul>`,
            2: `<p>The Review tab has tools for checking and proofing your document.</p>
                <h4>Quick Tips:</h4>
                <ul>
                    <li><strong>Spelling:</strong> Check spelling and grammar</li>
                    <li><strong>Track Changes:</strong> Monitor document modifications</li>
                    <li><strong>Comments:</strong> Add and manage comments</li>
                </ul>`
        };

        document.getElementById('helpTitle').textContent = tabHeaders[args.tabIndex] || 'Help';
        document.getElementById('helpContent').innerHTML = tabContents[args.tabIndex] || '';
    }
</script>
```

## Best Practices

### 1. Clear, Concise Titles
- Keep titles short (2-4 words)
- Use action-oriented language
- Example: ✅ "Bold" vs ❌ "Apply bold formatting"

### 2. Helpful Descriptions
- Explain what the action does
- Include keyboard shortcut if available
- Mention use cases

### 3. Organize Help Content
- Group related tasks together
- Use clear headings
- Keep text scannable

### 4. Keyboard Shortcuts
- Always display keyboard shortcuts in tooltips
- Use consistent format: `Keyboard: Ctrl+C`
- Include modifier keys clearly

### 5. Visual Consistency
- Use consistent tooltip styling
- Match help pane design to ribbon theme
- Maintain readable font sizes

## Complete Example

### Full Featured Ribbon with Tooltips and Help Pane

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

@{
    var copyTooltip = new RibbonTooltipSettings { 
        Title = "Copy", 
        Content = "Copy selected content<br/><strong>Keyboard:</strong> Ctrl+C" 
    };

    var pasteTooltip = new RibbonTooltipSettings { 
        Title = "Paste", 
        Content = "Paste content from clipboard<br/><strong>Keyboard:</strong> Ctrl+V" 
    };

    var cutTooltip = new RibbonTooltipSettings { 
        Title = "Cut", 
        Content = "Cut selected content<br/><strong>Keyboard:</strong> Ctrl+X" 
    };
}

<div class="ribbon-help-wrapper">
    <div class="ribbon-section">
        <ejs-ribbon id="ribbon" tabSelected="onTabSelected" helpPaneTemplate="#helpPaneContent">
            <e-ribbon-tabs>
                <e-ribbon-tab header="Home" keyTip="H">
                    <e-ribbon-groups>
                        <e-ribbon-group header="Clipboard" showLauncherIcon=true>
                            <e-ribbon-collections>
                                <e-ribbon-collection>
                                    <e-ribbon-items>
                                        <e-ribbon-item type=Button ribbonTooltipSettings=pasteTooltip keyTip="PA">
                                            <e-ribbon-buttonsettings 
                                                iconCss="e-icons e-paste" 
                                                content="Paste">
                                            </e-ribbon-buttonsettings>
                                        </e-ribbon-item>
                                    </e-ribbon-items>
                                </e-ribbon-collection>
                                <e-ribbon-collection>
                                    <e-ribbon-items>
                                        <e-ribbon-item type=Button ribbonTooltipSettings=cutTooltip keyTip="CT">
                                            <e-ribbon-buttonsettings 
                                                iconCss="e-icons e-cut" 
                                                content="Cut">
                                            </e-ribbon-buttonsettings>
                                        </e-ribbon-item>
                                        <e-ribbon-item type=Button ribbonTooltipSettings=copyTooltip keyTip="CO">
                                            <e-ribbon-buttonsettings 
                                                iconCss="e-icons e-copy" 
                                                content="Copy">
                                            </e-ribbon-buttonsettings>
                                        </e-ribbon-item>
                                    </e-ribbon-items>
                                </e-ribbon-collection>
                            </e-ribbon-collections>
                        </e-ribbon-group>
                    </e-ribbon-groups>
                </e-ribbon-tab>
            </e-ribbon-tabs>
        </ejs-ribbon>
    </div>

    <!-- Help Pane -->
    <div class="help-pane">
        <div class="help-header">
            <h3>📚 Help & Tips</h3>
        </div>
        <div class="help-body" id="helpBody">
            <p><strong>Welcome!</strong></p>
            <p>Hover over ribbon items to see helpful information and keyboard shortcuts.</p>
            <h4>Getting Started:</h4>
            <ul>
                <li>Use <strong>Ctrl+C</strong> to copy</li>
                <li>Use <strong>Ctrl+V</strong> to paste</li>
                <li>Use <strong>Ctrl+X</strong> to cut</li>
            </ul>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
                💡 <strong>Tip:</strong> Press Alt to show KeyTips for keyboard navigation
            </p>
        </div>
    </div>
</div>

<style>
    .ribbon-help-wrapper {
        display: flex;
        gap: 0;
        height: 100%;
    }

    .ribbon-section {
        flex: 1;
        border-right: 1px solid #ddd;
    }

    .help-pane {
        width: 300px;
        background-color: #fafafa;
        border-left: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }

    .help-header {
        padding: 15px;
        border-bottom: 2px solid #007bff;
        background-color: #f0f8ff;
    }

    .help-header h3 {
        margin: 0;
        color: #007bff;
        font-size: 16px;
    }

    .help-body {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        font-size: 13px;
        line-height: 1.6;
    }

    .help-body h4 {
        margin: 15px 0 10px 0;
        color: #333;
    }

    .help-body ul {
        margin: 10px 0;
        padding-left: 20px;
    }

    .help-body li {
        margin-bottom: 8px;
        color: #555;
    }

    .help-body p {
        margin: 10px 0;
        color: #555;
    }
</style>

<script>
    function onTabSelected(args) {
        console.log('Tab ' + args.tabIndex + ' selected');
    }
</script>
```

---
