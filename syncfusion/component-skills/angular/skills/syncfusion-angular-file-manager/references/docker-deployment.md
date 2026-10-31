# Docker Deployment in Syncfusion Angular File Manager

The Syncfusion Angular [File Manager](https://www.syncfusion.com/angular-components/angular-file-manager) is a component for managing files and folders in a web application. It provides a Windows Explorer-like interface for file operations.

The unified Syncfusion File Manager provider service supports both Azure Blob Storage and Amazon S3 through a single Docker image. The service exposes the following operations: read, details, search, image preview, download, upload, create, rename, copy, move, and delete. Select the storage provider by setting the `FILEMANAGER_PROVIDER` environment variable:

| Provider | `FILEMANAGER_PROVIDER` value | Storage settings |
|----------|------------------------------|------------------|
| Azure Blob Storage | `azure` | `AZURE_*` variables |
| Amazon S3 | `amazon-s3` | `AWS_*` variables |

You can deploy the published image directly, or build a custom Docker image from the [Syncfusion File Manager providers repository](https://github.com/SyncfusionExamples/filemanager-providers).

> **Note:** The example in this guide uses the `:latest` tag for brevity. For production deployments, pin to a specific image tag that matches the version of `@syncfusion/ej2-angular-filemanager` you install on the client. See the [image tags listing](https://hub.docker.com/r/syncfusion/filemanager-provider/tags) on Docker Hub.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Docker deployment](#docker-deployment)
- [Configure the client-side File Manager component](#configure-the-client-side-file-manager-component)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Install [Docker](https://www.docker.com/products/container-runtime#/download) in your environment:

- On Windows, install [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/).
- On macOS, install [Docker Desktop for macOS](https://docs.docker.com/desktop/setup/install/mac-install/).
- On Linux, install [Docker Engine](https://docs.docker.com/engine/install/) with the Docker Compose plugin.

Create and configure either an Azure Blob Storage account and container or an Amazon S3 bucket before starting the service.

### Azure Blob Storage requirements

You need:

- An active Microsoft Azure subscription.
- An Azure Storage account and a Blob container within it.
- The storage account name and an access key and permissions to perform file and folder operations.

See the [Azure Storage account creation guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

### Amazon S3 requirements

You need:

- An active AWS account.
- An Amazon S3 bucket in a known AWS region.
- An IAM access key ID and secret access key and permission to perform file and folder operations.

See the [Amazon S3 bucket creation guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html).

## Configuration

`FILEMANAGER_PROVIDER` is required. The service fails to start if `FILEMANAGER_PROVIDER` is missing, empty, or set to any value other than `azure` or `amazon-s3`.

### Azure Blob Storage

Set `FILEMANAGER_PROVIDER` to `azure`, then provide the following variables:

| Environment variable | Required | Description |
|----------------------|----------|-------------|
| `AZURE_ACCOUNT_NAME` | Yes | Azure Storage account name. |
| `AZURE_ACCOUNT_KEY` | Yes | Azure Storage account key. |
| `AZURE_BLOB_NAME` | Yes | Blob container name. The container must already exist. |
| `AZURE_BLOB_PATH` | Yes | Full URL of the Blob container. Example: `https://<account>.blob.core.windows.net/<container>/` |
| `AZURE_FILE_PATH` | Yes | Full URL of the File Manager root path. The folder must exist on startup, the service does not auto-create it. Example: `https://<account>.blob.core.windows.net/<container>/<folder>` |

### Amazon S3

Set `FILEMANAGER_PROVIDER` to `amazon-s3`, then provide the following variables:

| Environment variable | Required | Description |
|----------------------|----------|-------------|
| `AWS_ACCESS_KEY_ID` | Yes | AWS IAM access key ID. |
| `AWS_SECRET_ACCESS_KEY` | Yes | AWS IAM secret access key. |
| `AWS_BUCKET_NAME` | Yes | S3 bucket name. The bucket must already exist. |
| `AWS_BUCKET_REGION` | Yes | AWS region that contains the bucket. Example: `us-east-1` |

## Docker deployment

The steps below use Compose. The same configuration works whether you rename the file to `docker-compose.yaml` or keep the `.yml` extension.

### Step 1: Pull the unified provider image

```bash
docker pull syncfusion/filemanager-provider:latest
```

### Step 2: Create the `docker-compose.yml` file

Use the Compose configuration for the provider you selected. Provide only the matching storage settings.

#### Amazon S3

```yaml
# docker-compose.yml
services:
  filemanager-provider:
    image: syncfusion/filemanager-provider:latest
    environment:
      FILEMANAGER_PROVIDER: amazon-s3
      AWS_ACCESS_KEY_ID: YOUR_AWS_ACCESS_KEY_ID
      AWS_SECRET_ACCESS_KEY: YOUR_AWS_SECRET_ACCESS_KEY
      AWS_BUCKET_NAME: YOUR_AWS_BUCKET_NAME
      AWS_BUCKET_REGION: YOUR_AWS_BUCKET_REGION
    ports:
      - "5000:80"
```

#### Azure Blob Storage

```yaml
# docker-compose.yml
services:
  filemanager-provider:
    image: syncfusion/filemanager-provider:latest
    environment:
      FILEMANAGER_PROVIDER: azure
      AZURE_ACCOUNT_NAME: YOUR_AZURE_ACCOUNT_NAME
      AZURE_ACCOUNT_KEY: YOUR_AZURE_ACCOUNT_KEY
      AZURE_BLOB_NAME: YOUR_AZURE_BLOB_NAME
      AZURE_BLOB_PATH: https://<account>.blob.core.windows.net/<container>/
      AZURE_FILE_PATH: https://<account>.blob.core.windows.net/<container>/<folder>
    ports:
      - "5000:80"
```

### Step 3: Run the container

In a terminal, navigate to the directory containing `docker-compose.yml` and run:

```bash
docker compose up
```

When you are using the published image directly, omit the `--build` option. To run detached, add `-d`. To follow logs in the foreground, omit `-d` (default).

The service is available at `http://localhost:5000`. Verify that it is running by opening `http://localhost:5000/api/Test`. A successful response confirms that the service is ready to integrate with the File Manager component.

To stop the container, run:

```bash
docker compose down
```

## Configure the client-side File Manager component

The unified service uses the same endpoints for both storage providers. Set the [`url`](https://ej2.syncfusion.com/angular/documentation/api/file-manager/ajaxsettingsmodel#url), [`uploadUrl`](https://ej2.syncfusion.com/angular/documentation/api/file-manager/ajaxsettingsmodel#uploadurl), [`downloadUrl`](https://ej2.syncfusion.com/angular/documentation/api/file-manager/ajaxsettingsmodel#downloadurl), and [`getImageUrl`](https://ej2.syncfusion.com/angular/documentation/api/file-manager/ajaxsettingsmodel#getimageurl) properties as follows:

| Property | Value |
|----------|-------|
| `url` | `http://localhost:5000/api/FileManager/FileOperations` |
| `uploadUrl` | `http://localhost:5000/api/FileManager/Upload` |
| `downloadUrl` | `http://localhost:5000/api/FileManager/Download` |
| `getImageUrl` | `http://localhost:5000/api/FileManager/GetImage` |

The following example shows an Angular client that configures the [`ajaxSettings`](https://ej2.syncfusion.com/angular/documentation/api/file-manager/index-default#ajaxsettings) properties:

```typescript
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager'
import { Component } from '@angular/core';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager id='filemanager' [ajaxSettings]='ajaxSettings' height="375px">
  </ejs-filemanager>`
})
export class App {
  public hostUrl: string = 'http://localhost:5000/';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations',
    uploadUrl: this.hostUrl + 'api/FileManager/Upload',
    downloadUrl: this.hostUrl + 'api/FileManager/Download',
    getImageUrl: this.hostUrl + 'api/FileManager/GetImage'
  };
}
```

The sample requires the File Manager theme styles. For package installation and CSS references, refer to the [Getting Started](./getting-started.md) page.

## Troubleshooting

- Verify that `FILEMANAGER_PROVIDER` is set to exactly `azure` or `amazon-s3`.
- Verify that all required environment variables for the selected provider are present and correct. Do not mix Azure and Amazon S3 settings in the same configuration.
- Confirm that the port mapping in `docker-compose.yml` matches the host URL configured in `ajaxSettings`. For example, with `5000:80`, use `http://localhost:5000/`.
- If the service does not start or file operations fail, verify the storage account or bucket permissions and confirm that the configured region, container, and paths are correct.
- If you see an intermittent **Name or service not known** error when connecting to the S3 endpoint (e.g. `your-bucket.s3.amazonaws.com`), add `dns: [8.8.8.8, 8.8.4.4, 1.1.1.1]` under the `filemanager` service in `docker-compose.yml` and recreate the container.

---

**Next:** Configure views at [views-and-layout.md](views-and-layout.md) or implement a custom backend at [custom-file-provider.md](custom-file-provider.md).
