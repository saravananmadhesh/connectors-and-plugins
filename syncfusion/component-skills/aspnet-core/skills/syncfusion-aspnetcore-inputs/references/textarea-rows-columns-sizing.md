# TextArea Rows and Columns Sizing — ASP.NET Core

This reference covers controlling the visible dimensions of TextArea using the `rows` and `cols` properties.

## Table of Contents
- [Overview](#overview)
- [Rows Property](#rows-property)
- [Columns Property](#columns-property)
- [Combined Sizing](#combined-sizing)
- [Responsive Sizing](#responsive-sizing)
- [Examples](#examples)

---

## Overview

Control the visible dimensions of your TextArea using the `rows` and `cols` properties. These attributes define the initial height (in lines) and width (in characters), allowing precise control over layout.

---

## Rows Property

The `rows` attribute sets the visible number of lines (vertical height) of the TextArea.

### Basic Row Configuration

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" 
              placeholder="Enter comments"
              rows="5">
</ejs-textarea>
```

This creates a TextArea that displays 5 lines without scrolling.

### Common Row Sizes

| Rows | Use Case | Height |
|------|----------|--------|
| 1-2 | Short inline comment | ~30-50px |
| 3 | Quick feedback | ~70px |
| 5 | Standard comment | ~120px |
| 8 | Detailed feedback | ~180px |
| 10+ | Extended content | 250px+ |

**Razor View (CSHTML):**
```html
<!-- Compact (1 row - single line fallback) -->
<ejs-textarea id="compact" rows="1" placeholder="Quick note"></ejs-textarea>

<!-- Standard (3 rows - typical comment) -->
<ejs-textarea id="standard" rows="3" placeholder="Add a comment"></ejs-textarea>

<!-- Medium (5 rows - detailed feedback) -->
<ejs-textarea id="medium" rows="5" placeholder="Share feedback"></ejs-textarea>

<!-- Large (8 rows - extended content) -->
<ejs-textarea id="large" rows="8" placeholder="Write essay"></ejs-textarea>

<!-- Extra Large (12 rows - professional content) -->
<ejs-textarea id="xlarge" rows="12" placeholder="Write article"></ejs-textarea>
```

---

## Columns Property

The `cols` attribute sets the visible width of the TextArea, measured in average character widths.

### Basic Column Configuration

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" 
              placeholder="Enter comments"
              cols="50">
</ejs-textarea>
```

This creates a TextArea with width equivalent to 50 characters.

### Common Column Widths

| Cols | Width | Use Case |
|------|-------|----------|
| 20 | ~160px | Very narrow |
| 30 | ~240px | Mobile friendly |
| 40 | ~320px | Standard |
| 50 | ~400px | Good balance |
| 60 | ~480px | Wide |
| 80 | ~640px | Full screen desktop |

**Razor View (CSHTML):**
```html
<!-- Narrow (30 cols - mobile friendly) -->
<ejs-textarea id="narrow" cols="30" placeholder="Narrow"></ejs-textarea>

<!-- Standard (40 cols - good balance) -->
<ejs-textarea id="standard" cols="40" placeholder="Standard"></ejs-textarea>

<!-- Wide (60 cols - full screen on desktop) -->
<ejs-textarea id="wide" cols="60" placeholder="Wide"></ejs-textarea>

<!-- Extra wide (80 cols - professional/code) -->
<ejs-textarea id="xlarge" cols="80" placeholder="Extra Wide"></ejs-textarea>
```

---

## Combined Sizing

### Multiple TextArea Sizes

Create different sized textareas for various use cases:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <h5>Small Comment Box</h5>
    <ejs-textarea id="small" 
                  placeholder="Quick comment"
                  rows="3"
                  cols="35">
    </ejs-textarea>
</div>

<div class="form-group">
    <h5>Medium Feedback Form</h5>
    <ejs-textarea id="medium" 
                  placeholder="Your feedback"
                  rows="5"
                  cols="50">
    </ejs-textarea>
</div>

<div class="form-group">
    <h5>Large Essay Area</h5>
    <ejs-textarea id="large" 
                  placeholder="Write your essay"
                  rows="10"
                  cols="70">
    </ejs-textarea>
</div>
```

---

## Responsive Sizing

### Mobile vs Desktop

**Razor View (CSHTML):**
```html
<!-- Mobile: Smaller dimensions -->
<div class="d-block d-md-none">
    <ejs-textarea id="mobile" 
                  placeholder="Your text"
                  rows="2"
                  cols="25">
    </ejs-textarea>
</div>

<!-- Tablet: Medium dimensions -->
<div class="d-none d-md-block d-lg-none">
    <ejs-textarea id="tablet" 
                  placeholder="Your text"
                  rows="4"
                  cols="45">
    </ejs-textarea>
</div>

<!-- Desktop: Larger dimensions -->
<div class="d-none d-lg-block">
    <ejs-textarea id="desktop" 
                  placeholder="Your text"
                  rows="6"
                  cols="70">
    </ejs-textarea>
</div>
```

---

## Examples

### Form with Different Textarea Sizes

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "TextArea Sizing Examples";
}

<div class="container mt-5">
    <h2>TextArea Rows and Columns Examples</h2>

    <form asp-action="SubmitContent" method="post">
        <!-- Title - 1 row, standard width -->
        <div class="form-group mb-3">
            <label for="title" class="form-label">Title</label>
            <ejs-textarea id="title" 
                          name="title"
                          placeholder="Article title"
                          rows="1"
                          cols="50"
                          maxLength="100">
            </ejs-textarea>
            <small class="form-text text-muted">One line, max 100 characters</small>
        </div>

        <!-- Summary - 3 rows, standard width -->
        <div class="form-group mb-3">
            <label for="summary" class="form-label">Summary</label>
            <ejs-textarea id="summary" 
                          name="summary"
                          placeholder="Brief summary of content"
                          rows="3"
                          cols="60"
                          maxLength="300">
            </ejs-textarea>
            <small class="form-text text-muted">3 lines, max 300 characters</small>
        </div>

        <!-- Body - 8 rows, wide -->
        <div class="form-group mb-3">
            <label for="body" class="form-label">Article Body</label>
            <ejs-textarea id="body" 
                          name="body"
                          placeholder="Write your article content here"
                          rows="8"
                          cols="80"
                          maxLength="5000">
            </ejs-textarea>
            <small class="form-text text-muted">8 lines, max 5000 characters</small>
        </div>

        <!-- Tags - 2 rows, narrow -->
        <div class="form-group mb-3">
            <label for="tags" class="form-label">Tags</label>
            <ejs-textarea id="tags" 
                          name="tags"
                          placeholder="Comma-separated tags"
                          rows="2"
                          cols="40">
            </ejs-textarea>
            <small class="form-text text-muted">2 lines, narrower width</small>
        </div>

        <button type="submit" class="btn btn-primary">Publish</button>
    </form>
</div>
```

### Blog Post Composer

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Blog Post Composer";
}

<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Compose Blog Post</h3>

            <form asp-action="PublishPost" method="post">
                <!-- Post Title -->
                <div class="form-group mb-4">
                    <label for="post-title" class="form-label fw-bold">Post Title</label>
                    <ejs-textarea id="post-title" 
                                  name="title"
                                  placeholder="Enter a compelling title"
                                  rows="1"
                                  cols="80"
                                  floatLabelType="Auto"
                                  maxLength="120">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 120 characters</small>
                </div>

                <!-- Featured Image Alt Text -->
                <div class="form-group mb-4">
                    <label for="alt-text" class="form-label fw-bold">Image Alt Text</label>
                    <ejs-textarea id="alt-text" 
                                  name="altText"
                                  placeholder="Describe the featured image"
                                  rows="2"
                                  cols="60"
                                  floatLabelType="Auto"
                                  maxLength="200">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 200 characters</small>
                </div>

                <!-- Introduction -->
                <div class="form-group mb-4">
                    <label for="intro" class="form-label fw-bold">Introduction</label>
                    <ejs-textarea id="intro" 
                                  name="introduction"
                                  placeholder="Hook your readers with an engaging introduction"
                                  rows="3"
                                  cols="80"
                                  floatLabelType="Auto"
                                  maxLength="500">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 500 characters</small>
                </div>

                <!-- Main Content -->
                <div class="form-group mb-4">
                    <label for="content" class="form-label fw-bold">Main Content</label>
                    <ejs-textarea id="content" 
                                  name="content"
                                  placeholder="Write your full article content here"
                                  rows="12"
                                  cols="80"
                                  floatLabelType="Auto"
                                  resizeMode="Both"
                                  maxLength="10000">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 10,000 characters</small>
                </div>

                <!-- Conclusion -->
                <div class="form-group mb-4">
                    <label for="conclusion" class="form-label fw-bold">Conclusion</label>
                    <ejs-textarea id="conclusion" 
                                  name="conclusion"
                                  placeholder="Wrap up your thoughts"
                                  rows="4"
                                  cols="80"
                                  floatLabelType="Auto"
                                  maxLength="1000">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 1,000 characters</small>
                </div>

                <!-- Call to Action -->
                <div class="form-group mb-4">
                    <label for="cta" class="form-label fw-bold">Call to Action</label>
                    <ejs-textarea id="cta" 
                                  name="cta"
                                  placeholder="What should readers do next?"
                                  rows="2"
                                  cols="60"
                                  floatLabelType="Auto"
                                  maxLength="300">
                    </ejs-textarea>
                    <small class="form-text text-muted">Max 300 characters</small>
                </div>

                <div>
                    <button type="submit" class="btn btn-success me-2">
                        Publish Post
                    </button>
                    <button type="button" class="btn btn-outline-secondary">
                        Save as Draft
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .form-label {
        color: #333;
    }
    
    .card {
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
</style>
```

### Product Review Form with Size Variations

**Razor View (CSHTML):**
```html
@model ProductReviewViewModel

<div class="container mt-5">
    <h3>Write a Product Review</h3>

    <form asp-action="SubmitReview" method="post">
        <!-- Review Title - 1 row -->
        <div class="form-group mb-3">
            <label asp-for="Title">Review Title</label>
            <ejs-textarea asp-for="Title" 
                          placeholder="Give your review a title"
                          rows="1"
                          cols="60"
                          maxLength="100">
            </ejs-textarea>
        </div>

        <!-- Pros - 2 rows -->
        <div class="form-group mb-3">
            <label asp-for="Pros">What Did You Like? (Pros)</label>
            <ejs-textarea asp-for="Pros" 
                          placeholder="List the positive aspects..."
                          rows="2"
                          cols="60"
                          maxLength="300">
            </ejs-textarea>
        </div>

        <!-- Cons - 2 rows -->
        <div class="form-group mb-3">
            <label asp-for="Cons">What Could Be Better? (Cons)</label>
            <ejs-textarea asp-for="Cons" 
                          placeholder="List the negative aspects..."
                          rows="2"
                          cols="60"
                          maxLength="300">
            </ejs-textarea>
        </div>

        <!-- Full Review - 6 rows -->
        <div class="form-group mb-3">
            <label asp-for="FullReview">Full Review</label>
            <ejs-textarea asp-for="FullReview" 
                          placeholder="Share your detailed thoughts about this product"
                          rows="6"
                          cols="70"
                          resizeMode="Vertical"
                          maxLength="2000">
            </ejs-textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit Review</button>
    </form>
</div>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-resize.md` — Resize modes
- `textarea-styling-appearance.md` — Styling options
- `textarea-api.md` — Complete API reference
