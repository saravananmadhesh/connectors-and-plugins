# Field Components Panel

The Field Components Panel is the left pane of the ASP.NET Core Form Builder. It contains the draggable palette of form fields, layout containers, and pre-built templates.

The panel has **Fields** and **Templates** tabs. The Templates tab is available in Developer mode. Search filters components by label or type; while searching, the accordion becomes a flat result list.

## Toolbox categories

### Basic

`textbox`, `textarea`, `checkbox`, `radio`, `number`, `inputMask`, `dropdown`, `multiselect`, `date`, and `button`.

### Advanced

`checkboxGroup`, `dateTime`, `time`, `dateRange`, `switch`, `rating`, `splitButton`, `rangeSlider`, `signature`, `imageEditor`, `fileUpload`, `colorPicker`, `richTextEditor`, and `dataGrid`.

### Layout

`message`, `panel`, `table`, `tabs`, `card`, and `staticHtml`. Layout components are stored in `layout[]` rather than in `properties`.

## Templates tab

Pre-built schemas can be dragged from the Templates tab onto the canvas. Bind them with `formTemplates`:

```cshtml
@model IndexModel

<ejs-form-builder id="form-builder-control"
                  formTemplates="Model.FormTemplate">
</ejs-form-builder>
```

```csharp
public class IndexModel : PageModel
{
    public List<FormTemplate> FormTemplate { get; set; }

    public void OnGet()
    {
        FormTemplate = new List<FormTemplate>
        {
            new FormTemplate
            {
                Id = "login form",
                Title = "login",
                Schema = FormSchema
            }
        };
    }
}
```

Dropping a template inserts its schema. Submit buttons inside templates are filtered to avoid duplicates.

## Customize toolbox items

Bind `toolboxCategories` to a model property:

```cshtml
@model IndexModel

<ejs-form-builder id="form-builder-control"
                  toolboxCategories="Model.ToolboxItemCategories">
</ejs-form-builder>
```

```csharp
public class IndexModel : PageModel
{
    public List<ToolboxCategories> ToolboxItemCategories { get; set; }

    public void OnGet()
    {
        ToolboxItemCategories = new List<ToolboxCategories>
        {
            new ToolboxCategories { Category = "basic", Items = new[] { "textbox", "textarea" } },
            new ToolboxCategories { Category = "advanced", Items = new[] { "date", "dateRange" } },
            new ToolboxCategories { Category = "layout", Items = new[] { "panel", "card" } }
        };
    }
}
```

Fields and templates can be reordered within layout containers through drag and drop.
