# Contextual Tabs and Gallery Items

## Table of Contents

- [Contextual Tabs](#contextual-tabs)
- [Visibility Control](#visibility-control)
- [Gallery Items](#gallery-items)
- [Gallery Groups](#gallery-groups)
- [Complete Example](#complete-example)

## Contextual Tabs

Contextual tabs appear on demand based on user selection or application state (e.g., when image/table is selected).

### Basic Contextual Tab

```razor
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

<ejs-ribbon id="ribbon">
    <!-- Regular tabs -->
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <!-- Items -->
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>

    <!-- Contextual tabs container -->
    <e-ribbon-contextual-tabs>
        <e-ribbon-contextual-tab visible=true>
            <e-ribbon-tabs>
                <e-ribbon-tab header="Image Format">
                    <e-ribbon-groups>
                        <e-ribbon-group header="Image Formatting">
                            <!-- Image-specific items -->
                        </e-ribbon-group>
                    </e-ribbon-groups>
                </e-ribbon-tab>
            </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
</ejs-ribbon>
```

## Visibility Control

### Show/Hide Contextual Tab

```razor
<!-- Initially hidden -->
<e-ribbon-contextual-tab visible=false>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Shape Format">
            <!-- Shape-specific items -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</e-ribbon-contextual-tab>

<!-- Initially visible -->
<e-ribbon-contextual-tab visible=true>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Table Design">
            <!-- Table-specific items -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</e-ribbon-contextual-tab>
```

### Dynamic Visibility

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-contextual-tabs>
        <e-ribbon-contextual-tab id="imageTab" visible=false>
            <e-ribbon-tabs>
                <e-ribbon-tab header="Image Format">
                    <!-- Items -->
                </e-ribbon-tab>
            </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
</ejs-ribbon>

<script>
    function showImageTab() {
        var ribbon = document.getElementById("ribbon").ej2_instances[0];
        // Show contextual tab when image is selected
        // Set visible property on contextual tab
    }
</script>
```

## Gallery Items

Galleries display collections of items for visual selection (styles, templates, etc.).

### Basic Gallery Item

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<e-ribbon-item type=Gallery>
    <e-ribbon-gallerySettings>
        <e-ribbon-gallery-groups>
            <e-ribbon-gallery-group header="Styles">
                <e-ribbon-gallery-items>
                    <e-ribbon-gallery-item content="Normal"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="No Spacing"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="Heading 1"></e-ribbon-gallery-item>
                </e-ribbon-gallery-items>
            </e-ribbon-gallery-group>
        </e-ribbon-gallery-groups>
    </e-ribbon-gallerySettings>
</e-ribbon-item>
```

### Gallery with Icons

```razor
<e-ribbon-item type=Gallery>
    <e-ribbon-gallerySettings itemCount=4>
        <e-ribbon-gallery-groups>
            <e-ribbon-gallery-group header="Table Styles">
                <e-ribbon-gallery-items>
                    <e-ribbon-gallery-item content="Table Style 1" iconCss="e-icons e-table"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="Table Style 2" iconCss="e-icons e-table"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="Table Style 3" iconCss="e-icons e-table"></e-ribbon-gallery-item>
                </e-ribbon-gallery-items>
            </e-ribbon-gallery-group>
        </e-ribbon-gallery-groups>
    </e-ribbon-gallerySettings>
</e-ribbon-item>
```

### Disabled Gallery Items

```razor
<e-ribbon-gallery-item content="Disabled Style" disabled=true></e-ribbon-gallery-item>
```

## Gallery Groups

Organize gallery items into multiple groups.

### Multiple Gallery Groups

```razor
<e-ribbon-item type=Gallery>
    <e-ribbon-gallerySettings itemCount=4 popupWidth="400px" popupHeight="300px">
        <e-ribbon-gallery-groups>
            <!-- Group 1 -->
            <e-ribbon-gallery-group header="Built-in Styles">
                <e-ribbon-gallery-items>
                    <e-ribbon-gallery-item content="Normal"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="Heading 1"></e-ribbon-gallery-item>
                </e-ribbon-gallery-items>
            </e-ribbon-gallery-group>

            <!-- Group 2 -->
            <e-ribbon-gallery-group header="Custom Styles">
                <e-ribbon-gallery-items>
                    <e-ribbon-gallery-item content="Custom 1"></e-ribbon-gallery-item>
                    <e-ribbon-gallery-item content="Custom 2"></e-ribbon-gallery-item>
                </e-ribbon-gallery-items>
            </e-ribbon-gallery-group>
        </e-ribbon-gallery-groups>
    </e-ribbon-gallerySettings>
</e-ribbon-item>
```

### Gallery Settings

| Property | Type | Description |
|----------|------|-------------|
| `groups` | List | Gallery groups |
| `itemCount` | int | Items per row |
| `popupHeight` | string | Popup height (e.g., "300px") |
| `popupWidth` | string | Popup width (e.g., "400px") |

## Gallery Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Display text |
| `iconCss` | string | Icon class |
| `disabled` | bool | Disable selection |
| `cssClass` | string | Custom CSS class |

## Complete Example

Full ribbon with contextual tabs and galleries:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

<ejs-ribbon id="ribbon">
    <!-- File Menu -->
    @{
        List<MenuItem> fileOptions = new List<MenuItem>() {
            new MenuItem { Text = "New", IconCss = "e-icons e-file-new" },
            new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open" }
        };
    }
    <e-ribbon-filemenusettings visible="true" menuItems=fileOptions></e-ribbon-filemenusettings>

    <!-- Regular Tabs -->
    <e-ribbon-tabs>
        <!-- Home Tab -->
        <e-ribbon-tab header="Home" keyTip="H">
            <e-ribbon-groups>
                <e-ribbon-group header="Styles">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <!-- Quick Styles Gallery -->
                                <e-ribbon-item type=Gallery>
                                    <e-ribbon-gallerySettings itemCount=3 popupHeight="300px" popupWidth="350px">
                                        <e-ribbon-gallery-groups>
                                            <e-ribbon-gallery-group header="Quick Styles">
                                                <e-ribbon-gallery-items>
                                                    <e-ribbon-gallery-item content="Normal"></e-ribbon-gallery-item>
                                                    <e-ribbon-gallery-item content="Heading 1"></e-ribbon-gallery-item>
                                                    <e-ribbon-gallery-item content="Heading 2"></e-ribbon-gallery-item>
                                                    <e-ribbon-gallery-item content="Title"></e-ribbon-gallery-item>
                                                    <e-ribbon-gallery-item content="Subtitle"></e-ribbon-gallery-item>
                                                </e-ribbon-gallery-items>
                                            </e-ribbon-gallery-group>
                                        </e-ribbon-gallery-groups>
                                    </e-ribbon-gallerySettings>
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
                <e-ribbon-group header="Insert Content">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-image" content="Image"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-table" content="Table"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>

    <!-- Contextual Tabs -->
    <e-ribbon-contextual-tabs>
        <!-- Image Format Tab (appears when image selected) -->
        <e-ribbon-contextual-tab visible=false id="imageTab">
            <e-ribbon-tabs>
                <e-ribbon-tab header="Image Format">
                    <e-ribbon-groups>
                        <e-ribbon-group header="Image Styles">
                            <e-ribbon-collections>
                                <e-ribbon-collection>
                                    <e-ribbon-items>
                                        <e-ribbon-item type=Gallery>
                                            <e-ribbon-gallerySettings itemCount=3>
                                                <e-ribbon-gallery-groups>
                                                    <e-ribbon-gallery-group header="Image Styles">
                                                        <e-ribbon-gallery-items>
                                                            <e-ribbon-gallery-item content="Style 1"></e-ribbon-gallery-item>
                                                            <e-ribbon-gallery-item content="Style 2"></e-ribbon-gallery-item>
                                                            <e-ribbon-gallery-item content="Style 3"></e-ribbon-gallery-item>
                                                        </e-ribbon-gallery-items>
                                                    </e-ribbon-gallery-group>
                                                </e-ribbon-gallery-groups>
                                            </e-ribbon-gallerySettings>
                                        </e-ribbon-item>
                                    </e-ribbon-items>
                                </e-ribbon-collection>
                            </e-ribbon-collections>
                        </e-ribbon-group>
                    </e-ribbon-groups>
                </e-ribbon-tab>
            </e-ribbon-tabs>
        </e-ribbon-contextual-tab>

        <!-- Table Design Tab (appears when table selected) -->
        <e-ribbon-contextual-tab visible=false id="tableTab">
            <e-ribbon-tabs>
                <e-ribbon-tab header="Table Design">
                    <e-ribbon-groups>
                        <e-ribbon-group header="Table Styles">
                            <e-ribbon-collections>
                                <e-ribbon-collection>
                                    <e-ribbon-items>
                                        <e-ribbon-item type=Gallery>
                                            <e-ribbon-gallerySettings itemCount=4>
                                                <e-ribbon-gallery-groups>
                                                    <e-ribbon-gallery-group header="Table Styles">
                                                        <e-ribbon-gallery-items>
                                                            <e-ribbon-gallery-item content="Plain"></e-ribbon-gallery-item>
                                                            <e-ribbon-gallery-item content="Banded"></e-ribbon-gallery-item>
                                                            <e-ribbon-gallery-item content="Dark"></e-ribbon-gallery-item>
                                                        </e-ribbon-gallery-items>
                                                    </e-ribbon-gallery-group>
                                                </e-ribbon-gallery-groups>
                                            </e-ribbon-gallerySettings>
                                        </e-ribbon-item>
                                    </e-ribbon-items>
                                </e-ribbon-collection>
                            </e-ribbon-collections>
                        </e-ribbon-group>
                    </e-ribbon-groups>
                </e-ribbon-tab>
            </e-ribbon-tabs>
        </e-ribbon-contextual-tab>
    </e-ribbon-contextual-tabs>
</ejs-ribbon>

<script>
    // Show contextual tabs based on selection
    document.addEventListener('selection-changed', function(e) {
        var ribbon = document.getElementById("ribbon").ej2_instances[0];
        if (e.detail.type === 'image') {
            // Show Image Format tab
            document.getElementById("imageTab").ej2_instances[0].visible = true;
        } else if (e.detail.type === 'table') {
            // Show Table Design tab
            document.getElementById("tableTab").ej2_instances[0].visible = true;
        }
    });
</script>
```

## Best Practices

### 1. Use Contextual Tabs Wisely
- Show when specific content type is selected
- Hide when selection changes
- Keep related operations together

### 2. Gallery Organization
- Group similar items
- Use clear group headers
- Limit items visible (itemCount property)

### 3. Performance
- Show galleries only when needed
- Use reasonable popup sizes
- Lazy-load gallery content if complex

### 4. User Experience
- Visible feedback when contextual tab appears
- Clear item labels in galleries
- Disabled state for unavailable items

---
