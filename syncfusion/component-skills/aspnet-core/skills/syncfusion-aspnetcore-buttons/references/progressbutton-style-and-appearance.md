# Style and Appearance – ASP.NET Core ProgressButton

## Color Variants

### Primary

```cshtml
<ejs-progressbutton id="progressBtn" content="Submit" cssClass="e-primary"></ejs-progressbutton>
```

### Success

```cshtml
<ejs-progressbutton id="progressBtn" content="Upload" cssClass="e-success"></ejs-progressbutton>
```

### Danger

```cshtml
<ejs-progressbutton id="progressBtn" content="Delete" cssClass="e-danger"></ejs-progressbutton>
```

## Custom Styling

```cshtml
<style>
    .custom-progress {
        background-color: #667eea !important;
    }
</style>

<ejs-progressbutton id="progressBtn" content="Custom" cssClass="custom-progress"></ejs-progressbutton>
```

## Size Variants

### Normal

```cshtml
<ejs-progressbutton id="progressBtn" content="Process"></ejs-progressbutton>
```

### Small

```cshtml
<ejs-progressbutton id="progressBtn" content="Process" cssClass="e-small"></ejs-progressbutton>
```

---

## See Also

- [ProgressButton Getting Started](progressbutton-getting-started.md)
- [ProgressButton Spinner and Progress](progressbutton-spinner-and-progress.md)
- [ProgressButton API](progressbutton-api.md)
