# File Attachments in Angular AI AssistView Component

The AI AssistView component supports file attachments, allowing users to include files along with their prompts to provide additional context and enhance interactions. Users can upload documents, images, and other file types to supplement their queries. Enable this functionality using the `enableAttachments` property and customize the behavior through the `attachmentSettings` configuration.

## Enable File Attachments

Enable file attachment support by setting the `enableAttachments` property to `true`. By default, it is disabled.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" ></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
}
```

---

## Configure Attachment Settings

Use the `attachmentSettings` property to customize file attachment behavior, including upload endpoints, file type restrictions, and size limits.

### Setting Save URL and Remove URL

Set the `saveUrl` and `removeUrl` properties to specify server endpoints for handling file uploads and removals. The `saveUrl` processes file uploads, while the `removeUrl` handles file deletion requests.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" [attachmentSettings]="attachmentSettings" ></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
    public attachmentSettings = {
      saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
      removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    };
}
```

### Setting File Type

Use the `allowedFileTypes` property to specify which file types users can upload. This property accepts file extensions (e.g., '.pdf', '.docx') or MIME types to control the types of files that can be attached.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" [attachmentSettings]="attachmentSettings" ></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.png'
  };
}
```

### attachmentTemplate Property

Use the `attachmentTemplate` property to control how attachments appear inside message bubbles after sending.

```typescript

import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" [attachmentSettings]="attachmentSettings" [attachmentTemplate]="attachmentTemplate"></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.png'
    };
    public attachmentTemplate = (context: any): string => {
        return `
            <div class="e-attached-file-temp">
                <div class="attached-file-name">${context.selectedFile.name}</div>
                <div class="attached-file-type">${context.selectedFile.type}</div>
            </div>
        `;
    }
}
```

---

### Setting File Size

Configure the `maxFileSize` property to define the maximum file size allowed for uploads. Specify the size in bytes. The default value is `2000000` bytes (2 MB). Files exceeding this limit will not be uploaded.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" [attachmentSettings]="attachmentSettings" ></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maxFileSize: 1000000 
    };
}
```

---

## Setting Maximum Count

Restrict how many files can be attached at once using the `maximumCount` property. The default value is `10`. If users select more than the allowed count, the maximum count reached error will be displayed.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent [enableAttachments]="enableAttachments" (promptRequest)="onPromptRequest()" [attachmentSettings]="attachmentSettings" ></div>`
})

export class App {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
    public enableAttachments: boolean = true;
    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maxFileSize: 1000000,
        maximumCount:5 
    };
}
```



