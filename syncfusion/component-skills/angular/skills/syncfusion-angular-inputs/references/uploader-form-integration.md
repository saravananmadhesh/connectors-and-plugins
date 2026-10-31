# Form Integration — Syncfusion Angular Uploader

## Table of Contents
- [HTML Form Submission](#html-form-submission)
- [Template-Driven Forms (ngModel)](#template-driven-forms-ngmodel)
- [Reactive Forms (FormGroup)](#reactive-forms-formgroup)
- [Required Validation](#required-validation)
- [Form Reset](#form-reset)

---

## HTML Form Submission

Integrate the Uploader with a standard HTML form for synchronous file submission:

**Configuration requirements:**
1. Set `saveUrl` and `removeUrl` to `null` (or empty strings)
2. Set `[autoUpload]="false"`
3. Add `name` attribute via `htmlAttributes`

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [UploaderModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form id="uploadForm" method="post" enctype="multipart/form-data" action="/api/upload">
      <ejs-uploader
        [asyncSettings]="asyncSettings"
        [autoUpload]="false"
        [htmlAttributes]="{ name: 'UploadFiles' }">
      </ejs-uploader>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  `
})
export class AppComponent {
  // saveUrl/removeUrl as null for synchronous form upload
  public asyncSettings = {
    saveUrl: null,
    removeUrl: null
  };
}
```

> When the form is submitted, all selected/dropped files are included in the multipart form data.  
> Resetting the form clears the file list and associated data.

---

## Template-Driven Forms (ngModel)

Bind the Uploader using `ngModel` in template-driven forms:

```typescript
import { Component } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [UploaderModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form #uploadForm="ngForm" (ngSubmit)="onSubmit(uploadForm)">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" name="fullName" ngModel required />
      </div>

      <div class="form-group">
        <label>Upload Document</label>
        <ejs-uploader
          name="document"
          [asyncSettings]="asyncSettings"
          [autoUpload]="false"
          [(ngModel)]="uploadedFiles"
          required>
        </ejs-uploader>
        <div *ngIf="uploadForm.submitted && !uploadedFiles?.length" class="error">
          Please select a file.
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  `
})
export class AppComponent {
  public uploadedFiles: any[] = [];

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  onSubmit(form: any): void {
    if (form.valid && this.uploadedFiles?.length) {
      console.log('Form submitted with files:', this.uploadedFiles);
    }
  }
}
```

---

## Reactive Forms (FormGroup)

Integrate the Uploader with reactive forms using `FormGroup` and `FormControl`:

```typescript
import { Component, OnInit } from '@angular/core';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  imports: [UploaderModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>User Name</label>
        <input type="text" formControlName="userName" />
        <div *ngIf="uploadForm.get('userName')?.invalid && uploadForm.get('userName')?.touched">
          Name is required.
        </div>
      </div>

      <div class="form-group">
        <label>Upload File</label>
        <ejs-uploader
          [asyncSettings]="asyncSettings"
          [autoUpload]="false"
          (selected)="onFilesSelected($event)"
          (removing)="onFileRemoved($event)">
        </ejs-uploader>
        <div *ngIf="uploadForm.get('uploadedFile')?.invalid && uploadForm.submitted" class="error">
          Please upload a file.
        </div>
      </div>

      <button type="submit" [disabled]="uploadForm.invalid">Submit</button>
    </form>
  `
})
export class AppComponent implements OnInit {
  public uploadForm!: FormGroup;

  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      userName: ['', Validators.required],
      uploadedFile: [null, Validators.required]  // Required file control
    });
  }

  onFilesSelected(args: any): void {
    // Update form control with selected file data
    if (args.filesData && args.filesData.length > 0) {
      this.uploadForm.get('uploadedFile')?.setValue(args.filesData);
      this.uploadForm.get('uploadedFile')?.markAsTouched();
    }
  }

  onFileRemoved(args: any): void {
    // Clear the form control when file is removed
    this.uploadForm.get('uploadedFile')?.setValue(null);
  }

  onSubmit(): void {
    if (this.uploadForm.valid) {
      console.log('Form values:', this.uploadForm.value);
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }
}
```

---

## Required Validation

**Method 1: HTML attribute on input element**

Add a `required` attribute directly and use `data-required-message` for a custom message:

```typescript
<ejs-uploader
  [asyncSettings]="asyncSettings"
  [autoUpload]="false"
  [htmlAttributes]="{
    required: 'true',
    'data-required-message': 'A file is required before submitting.'
  }">
</ejs-uploader>
```

**Method 2: Angular reactive form with Validators.required**

```typescript
// In FormGroup:
uploadedFile: [null, Validators.required]

// In template:
<div *ngIf="uploadForm.get('uploadedFile')?.hasError('required') && uploadForm.submitted">
  Please select a file to upload.
</div>
```

**Method 3: Template-driven required validation**

```typescript
<ejs-uploader
  name="file"
  ngModel
  required
  #fileInput="ngModel"
  [asyncSettings]="asyncSettings"
  [autoUpload]="false">
</ejs-uploader>
<div *ngIf="fileInput.invalid && form.submitted" class="error-msg">
  Please select a file.
</div>
```

---

## Form Reset

When an Angular form is reset, clear the Uploader file list programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  imports: [UploaderModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ejs-uploader
        #uploader
        [asyncSettings]="asyncSettings"
        [autoUpload]="false">
      </ejs-uploader>
      <button type="submit">Submit</button>
      <button type="button" (click)="resetForm()">Reset</button>
    </form>
  `
})
export class AppComponent {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public form: FormGroup;
  public asyncSettings = {
    saveUrl: 'https://your-api/uploader/save',
    removeUrl: 'https://your-api/uploader/remove'
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  onSubmit(): void {
    console.log('Submitted');
  }

  resetForm(): void {
    this.form.reset();
    // Also clear the uploader file list
    this.uploader.clearAll();
  }
}
```
