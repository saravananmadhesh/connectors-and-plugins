# Smart Paste Field Annotations

## Overview

Annotations improve AI accuracy by explicitly describing field intent and format requirements. The `data-smartpaste-description` attribute provides semantic context to the AI model for better field-to-value mapping.

## Basic Annotation Syntax

```cshtml
<input name="fieldName"
       data-smartpaste-description="Descriptive text explaining field purpose and format" />
```

## Annotation Examples

### Text Inputs

```cshtml
<!-- Full Name -->
<input name="fullName"
       data-smartpaste-description="Full name of the person in 'FirstName LastName' format" />

<!-- Email Address -->
<input name="email"
       data-smartpaste-description="Valid email address in format username@domain.com" />

<!-- Phone Number -->
<input name="phone"
       data-smartpaste-description="Phone number in format (555) 123-4567 or 555-123-4567" />

<!-- Address -->
<input name="address"
       data-smartpaste-description="Street address including house number and street name" />

<!-- City -->
<input name="city"
       data-smartpaste-description="City or municipality name" />

<!-- ZIP/Postal Code -->
<input name="zipCode"
       data-smartpaste-description="5-digit ZIP code in format 12345 or 12345-6789" />

<!-- Company Name -->
<input name="company"
       data-smartpaste-description="Company or organization name" />

<!-- Job Title -->
<input name="jobTitle"
       data-smartpaste-description="Job position or job title" />
```

### Textarea Inputs

```cshtml
<!-- Comments -->
<textarea name="comments"
          data-smartpaste-description="General comments or notes (multiline text allowed)">
</textarea>

<!-- Notes -->
<textarea name="notes"
          data-smartpaste-description="Additional notes or special instructions">
</textarea>

<!-- Bio/Description -->
<textarea name="bio"
          data-smartpaste-description="Brief biography or self-description (2-3 sentences)">
</textarea>
```

### Select/Dropdown Inputs

```cshtml
<!-- Country Selection -->
<select name="country"
        data-smartpaste-description="Country name or 2-letter country code (e.g., US, UK, CA)">
    <option value="">Select Country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
</select>

<!-- State/Province Selection -->
<select name="state"
        data-smartpaste-description="State or province abbreviation (e.g., CA, NY, ON)">
    <option value="">Select State</option>
    <option value="ca">California</option>
    <option value="ny">New York</option>
</select>

<!-- Industry Selection -->
<select name="industry"
        data-smartpaste-description="Industry sector or business category">
    <option value="">Select Industry</option>
    <option value="tech">Technology</option>
    <option value="healthcare">Healthcare</option>
</select>
```

### Radio Button Inputs

```cshtml
<!-- Gender Selection -->
<fieldset>
    <legend>Gender</legend>
    <label>
        <input type="radio" name="gender" value="male"
               data-smartpaste-description="Select if person is male" />
        Male
    </label>
    <label>
        <input type="radio" name="gender" value="female"
               data-smartpaste-description="Select if person is female" />
        Female
    </label>
    <label>
        <input type="radio" name="gender" value="other"
               data-smartpaste-description="Select if person prefers other or not specified" />
        Other
    </label>
</fieldset>

<!-- Subscription Type -->
<fieldset>
    <legend>Subscription Type</legend>
    <label>
        <input type="radio" name="subscriptionType" value="basic"
               data-smartpaste-description="Basic subscription tier" />
        Basic
    </label>
    <label>
        <input type="radio" name="subscriptionType" value="premium"
               data-smartpaste-description="Premium subscription tier with advanced features" />
        Premium
    </label>
</fieldset>
```

### Checkbox Inputs

```cshtml
<!-- Interests/Skills -->
<fieldset>
    <legend>Skills</legend>
    <label>
        <input type="checkbox" name="skills" value="csharp"
               data-smartpaste-description="Check if person has C# programming skills" />
        C#
    </label>
    <label>
        <input type="checkbox" name="skills" value="javascript"
               data-smartpaste-description="Check if person has JavaScript programming skills" />
        JavaScript
    </label>
    <label>
        <input type="checkbox" name="skills" value="database"
               data-smartpaste-description="Check if person has database design or management skills" />
        Database
    </label>
</fieldset>

<!-- Agreements/Consents -->
<label>
    <input type="checkbox" name="agreeToTerms"
           data-smartpaste-description="Check to indicate agreement to terms and conditions" />
    I agree to the terms and conditions
</label>
```

## Annotation Best Practices

| Practice | Example | Why |
|----------|---------|-----|
| **Be Specific** | "Valid email address" vs "Email" | Provides clear field intent to AI |
| **Include Format Requirements** | "Phone in (555) 123-4567 format" | Improves data consistency |
| **Use Intent-Based Language** | "Job position held" vs "Job" | Contextual clues aid AI interpretation |
| **Mention Valid Values** | "Country code: US, UK, CA" | Constrains AI output to expected options |
| **Describe Data Type** | "Use 5-digit ZIP code" | Ensures correct data format |
| **Avoid Ambiguity** | "First and last name" vs "Name" | Reduces interpretation errors |
| **Use Complete Sentences** | "Full name in FirstName LastName format" | More context for AI understanding |

## Supported Input Types

| Input Type | Support | Notes |
|-----------|---------|-------|
| **Text Input** | ✅ Full | Standard text input |
| **Email Input** | ✅ Full | Consider format annotation |
| **Tel Input** | ✅ Full | Specify phone format |
| **Number Input** | ✅ Full | Specify range or format |
| **Textarea** | ✅ Full | Multiline text support |
| **Select Dropdown** | ✅ Full | Helps identify option values |
| **Radio Buttons** | ✅ Full | Each button can have annotation |
| **Checkboxes** | ✅ Full | Multiple selection support |
| **Date Input** | ✅ Full | Format: YYYY-MM-DD or similar |
| **Time Input** | ✅ Full | Format: HH:MM or HH:MM:SS |

## Complete Form Example with Annotations

```cshtml
<form method="post">
    <div class="form-section">
        <h3>Personal Information</h3>
        
        <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input id="fullName" name="fullName" class="form-control"
                   data-smartpaste-description="Complete full name (FirstName LastName)" />
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" name="email" type="email" class="form-control"
                   data-smartpaste-description="Valid email address" />
        </div>

        <div class="form-group">
            <label for="phone">Phone:</label>
            <input id="phone" name="phone" type="tel" class="form-control"
                   data-smartpaste-description="Phone number in (555) 123-4567 format" />
        </div>
    </div>

    <div class="form-section">
        <h3>Address Information</h3>
        
        <div class="form-group">
            <label for="address">Street Address:</label>
            <input id="address" name="address" class="form-control"
                   data-smartpaste-description="Street address with house/building number" />
        </div>

        <div class="form-group">
            <label for="city">City:</label>
            <input id="city" name="city" class="form-control"
                   data-smartpaste-description="City or municipality name" />
        </div>

        <div class="form-group">
            <label for="state">State:</label>
            <select id="state" name="state" class="form-control"
                    data-smartpaste-description="State or province abbreviation">
                <option value="">Select State</option>
                <option value="ca">California</option>
                <option value="ny">New York</option>
            </select>
        </div>

        <div class="form-group">
            <label for="zipCode">ZIP Code:</label>
            <input id="zipCode" name="zipCode" class="form-control"
                   data-smartpaste-description="5-digit ZIP code (12345)" />
        </div>
    </div>

    <ejs-smartpaste id="smartPaste" content="Smart Paste" cssClass="e-primary"></ejs-smartpaste>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
</form>
```

## Performance Tips

- Keep descriptions concise (1-2 sentences max)
- Avoid extremely long descriptions
- Focus on disambiguation rather than detailed explanations
- Use consistent terminology across similar fields

## Reference
https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/annotation