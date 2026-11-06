# Step Types and Orientations

## Table of Contents
- [Step Types Overview](#step-types-overview)
- [Default Type](#default-type)
- [Label Type](#label-type)
- [Label Positions](#label-positions)
- [Indicator Type](#indicator-type)
- [Horizontal Orientation](#horizontal-orientation)
- [Vertical Orientation](#vertical-orientation)

## Step Types Overview

The `stepType` property controls how steps are visually displayed. Choose the type that best matches your UI/UX requirements:

| Step Type | Display | Best For |
|-----------|---------|----------|
| **Default** | Icons/numbers + labels below | Most common, balanced approach |
| **Label** | Text labels only | Minimalist, text-focused flows |
| **Indicator** | Icons/numbers only | Space-constrained designs |

## Default Type

Default type displays both a step indicator (icon or number) and a label below it:

```html
<ejs-stepper id="stepper" stepType="Default">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Profile" text="Create account"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Verify Email" text="Confirm email"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Security" text="Set password"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Visual layout:**
```
  [icon]        [icon]        [icon]
  Label      -> Label      -> Label
  (connected by line)
```

**Characteristics:**
- Icons or numbers displayed in circular indicators
- Labels shown below indicators
- Text content appears as secondary information
- Most space-efficient for medium-width layouts
- Default: `stepType="Default"`

**Use cases:**
- Registration flows
- Checkout processes
- Installation wizards
- Multi-page forms

## Label Type

Label type displays only text labels without step indicators:

```html
<ejs-stepper id="stepper" stepType="Label">
    <e-stepper-steps>
        <e-stepper-step label="Shopping Cart" text="Review items"></e-stepper-step>
        <e-stepper-step label="Shipping" text="Enter address"></e-stepper-step>
        <e-stepper-step label="Payment" text="Select payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Visual layout:**
```
Cart Text -> Shipping Text -> Payment Text
```

**Characteristics:**
- No icons or indicators displayed
- Only labels shown
- Clean, minimal appearance
- Works well in text-heavy interfaces
- Requires descriptive labels for clarity

**Priority:** When both `label` and `text` are defined, `label` takes priority for display.

## Label Positions

```html
<ejs-stepper id="stepper" stepType="Label" labelPosition="Top">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Position options:**

### Top
Labels display above step indicators:

```html
<ejs-stepper stepType="Label" labelPosition="Top">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout:**
```
   Step 1     Step 2     Step 3
     ↓          ↓          ↓
   [icon]    [icon]     [icon]
```

### Bottom
Labels display below step indicators:

```html
<ejs-stepper stepType="Label" labelPosition="Bottom">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout:**
```
   [icon]    [icon]     [icon]
     ↓          ↓          ↓
   Step 1     Step 2     Step 3
```

### Start (Left in LTR, Right in RTL)
Labels display to the left of step indicators (in left-to-right layout):

```html
<ejs-stepper stepType="Label" labelPosition="Start">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout (horizontal):**
```
Step 1 [icon] ---> Step 2 [icon] ---> Step 3 [icon]
```

### End (Right in LTR, Left in RTL)
Labels display to the right of step indicators:

```html
<ejs-stepper stepType="Label" labelPosition="End">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout (horizontal stepper):**
```
[icon] Step 1 ---> [icon] Step 2 ---> [icon] Step 3
```

**Best practices by position:**
- **Top:** Most common, balanced visual appeal
- **Bottom:** Default, most readable
- **Start/End:** Compact horizontal layouts, space-constrained designs

## Indicator Type

Indicator type displays only icons or numbers without labels:

```html
<ejs-stepper id="stepper" stepType="Indicator">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Cart"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Visual layout:**
```
[icon] -----> [icon] -----> [icon]
```

**Characteristics:**
- No text labels displayed
- Only icons or step numbers shown
- Very compact, minimalist appearance
- Labels still provided but not displayed

**Use cases:**
- Mobile layouts (space-constrained)
- Compact dashboards
- Flows where icons clearly represent each step

## Horizontal Orientation

Horizontal orientation (default) displays steps side-by-side from left to right:

```html
<ejs-stepper id="stepper" orientation="Horizontal">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout:**
```
Step 1 -----> Step 2 -----> Step 3
```

**Characteristics:**
- Steps progress left-to-right
- Connecting lines between steps
- Ideal for wide layouts
- Easy to see overall workflow
- Default: `orientation="Horizontal"`

**Use cases:**
- Multi-step processes with 3-5 steps

**Limitations:**
- May wrap on narrow screens
- Space requirements increase with step count

## Vertical Orientation

Vertical orientation displays steps stacked top-to-bottom:

```html
<ejs-stepper id="stepper" orientation="Vertical">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
        <e-stepper-step label="Step 4"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Layout:**
```
     Step 1
       ↓
     Step 2
       ↓
     Step 3
       ↓
     Step 4
```

**Characteristics:**
- Better for narrow/mobile layouts
- Can accommodate many steps
- Natural scrolling behavior

**Best for:**
- Mobile applications
- Narrow sidebars
- Long workflows with many steps

## Combining Types and Orientations

**Example: Horizontal Label stepper:**
```html
<ejs-stepper orientation="Horizontal" stepType="Label" labelPosition="Top">
    <e-stepper-steps>
        <e-stepper-step label="Step 1" text="Begin"></e-stepper-step>
        <e-stepper-step label="Step 2" text="Continue"></e-stepper-step>
        <e-stepper-step label="Step 3" text="Complete"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Example: Vertical Indicator stepper:**
```html
<ejs-stepper orientation="Vertical" stepType="Indicator">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Profile"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

Choose combinations that suit your layout constraints and UX goals.
