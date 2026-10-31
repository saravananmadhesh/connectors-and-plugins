# File System Providers - Complete Reference

## Table of Contents
- [Physical File System Provider](#physical-file-system-provider)
- [Azure Cloud File System Provider](#azure-cloud-file-system-provider)
- [Amazon S3 Cloud File Provider](#amazon-s3-cloud-file-provider)
- [SharePoint File Provider](#sharepoint-file-provider)
- [File Transfer Protocol (FTP) Provider](#file-transfer-protocol-ftp-provider)
- [SQL Database File System Provider](#sql-database-file-system-provider)
- [Node File System Provider](#node-file-system-provider)
- [Google Drive File System Provider](#google-drive-file-system-provider)
- [Firebase Realtime Database Provider](#firebase-realtime-database-provider)
- [IBM Cloud Object Storage Provider](#ibm-cloud-object-storage-provider)

---

## Physical File System Provider

### Overview
Provides direct access to the physical file system on your server. This is the most straightforward provider for basic file management operations.

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/ej2-aspcore-file-provider ej2-aspcore-file-provider
cd ej2-aspcore-file-provider
```

**Restore NuGet packages in Visual Studio and build the project.**

### Configuration

Set the root directory in `FileManagerController.cs`:
```csharp
public FileManagerController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new PhysicalFileProvider();
    this.basePath = hostingEnvironment.ContentRootPath + "/Files/"; // Set root directory
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/FileManager/FileOperations',
        downloadUrl: 'http://localhost:62869/api/FileManager/Download',
        uploadUrl: 'http://localhost:62869/api/FileManager/Upload',
        getImageUrl: 'http://localhost:62869/api/FileManager/GetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- Direct file system access
- Full CRUD operations
- Upload/Download support
- Image thumbnail generation
- Folder creation and management

### Resources
- GitHub: https://github.com/SyncfusionExamples/ej2-aspcore-file-provider
- Key Features: https://github.com/SyncfusionExamples/ej2-aspcore-file-provider#key-features

---

## Azure Cloud File System Provider

### Overview
Enables access and management of blobs in Azure Blob Storage for cloud-based file management.

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/azure-aspcore-file-provider azure-aspcore-file-provider
cd azure-aspcore-file-provider
```

**Restore NuGet packages and build.**

### Configuration

**Register Azure Storage in `AzureProviderController.cs`:**
```csharp
public AzureProviderController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new AzureFileProvider();
    
    // Register Azure storage account
    string accountName = "your-storage-account";
    string accountKey = "your-account-key";
    string blobName = "files"; // Container name
    
    this.operation.RegisterAzure(accountName, accountKey, blobName);
    
    // Set blob container paths
    string blobPath = "https://your-storage-account.blob.core.windows.net/files/";
    string filePath = "https://your-storage-account.blob.core.windows.net/files/Files";
    
    this.operation.SetBlobContainer(blobPath, filePath);
}
```

**appsettings.json:**
```json
{
  "AzureSettings": {
    "StorageAccountName": "your-storage-account",
    "StorageAccountKey": "your-account-key",
    "BlobContainerName": "files",
    "BlobPath": "https://your-storage-account.blob.core.windows.net/files/",
    "FilePath": "https://your-storage-account.blob.core.windows.net/files/Files"
  }
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/AzureProvider/AzureFileOperations',
        downloadUrl: 'http://localhost:62869/api/AzureProvider/AzureDownload',
        uploadUrl: 'http://localhost:62869/api/AzureProvider/AzureUpload',
        getImageUrl: 'http://localhost:62869/api/AzureProvider/AzureGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### NuGet Package

```bash
dotnet add package Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core
```

### Key Features
- Blob storage access
- Container and directory management
- Scalable cloud storage
- Support for multiple containers

### Resources
- GitHub: https://github.com/SyncfusionExamples/azure-aspcore-file-provider
- NuGet: https://www.nuget.org/packages/Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core

---

## Amazon S3 Cloud File Provider

### Overview
Provides access to files stored in Amazon S3 buckets with full file management capabilities.

### Prerequisites

1. **Create AWS Account and S3 Bucket**
2. **Generate AWS Access Keys:** IAM > Users > Security credentials
3. **Note:**
   - AWS Access Key ID
   - AWS Secret Access Key
   - Bucket Name
   - AWS Region

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider.git amazon-s3-aspcore-file-provider
cd amazon-s3-aspcore-file-provider
```

### Configuration

**Register Amazon S3 in `AmazonS3ProviderController.cs`:**
```csharp
public AmazonS3ProviderController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new AmazonS3FileProvider();
    
    string bucketName = "your-bucket-name";
    string awsAccessKeyId = "your-access-key-id";
    string awsSecretAccessKey = "your-secret-access-key";
    string awsRegion = "us-east-1"; // e.g., us-west-2, eu-west-1
    
    this.operation.RegisterAmazonS3(bucketName, awsAccessKeyId, awsSecretAccessKey, awsRegion);
}
```

**appsettings.json:**
```json
{
  "AmazonS3Settings": {
    "BucketName": "your-bucket-name",
    "AwsAccessKeyId": "your-access-key-id",
    "AwsSecretAccessKey": "your-secret-access-key",
    "BucketRegion": "us-east-1"
  }
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/AmazonS3Provider/AmazonS3FileOperations',
        downloadUrl: 'http://localhost:62869/api/AmazonS3Provider/AmazonS3Download',
        uploadUrl: 'http://localhost:62869/api/AmazonS3Provider/AmazonS3Upload',
        getImageUrl: 'http://localhost:62869/api/AmazonS3Provider/AmazonS3GetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- S3 bucket operations
- Multi-region support
- Large file upload
- Batch operations

### Resources
- GitHub: https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider
- AWS S3 Documentation: https://docs.aws.amazon.com/s3/

---

## SharePoint File Provider

### Overview
Enables access to Microsoft SharePoint document libraries and file management within SharePoint environments.

### Prerequisites

1. **Azure Active Directory (AAD) App Registration**
2. **Tenant ID, Client ID, Client Secret**
3. **SharePoint Site Access Permissions**

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/sharepoint-aspcore-file-provider sharepoint-aspcore-file-provider
cd sharepoint-aspcore-file-provider
```

### Configuration

**1. Create App Registration in Azure AAD:**
- Go to Azure Portal → Azure Active Directory → App registrations
- Create new application
- Note: Tenant ID, Client ID
- Create Client Secret
- Grant SharePoint API permissions

**2. Configure appsettings.json:**
```json
{
  "SharePointSettings": {
    "TenantId": "<--Your-Tenant-Id-->",
    "ClientId": "<--Your-Client-Id-->",
    "ClientSecret": "<--Your-Client-Secret-->",
    "UserSiteName": "<--Your-SharePoint-Site-Name-->",
    "UserDriveId": "<--Your-Drive-Id-->"
  }
}
```

**3. SharePointController Setup:**
```csharp
public SharePointController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
{
    this.operation = new SharePointFileProvider();
    
    var settings = configuration.GetSection("SharePointSettings");
    string tenantId = settings["TenantId"];
    string clientId = settings["ClientId"];
    string clientSecret = settings["ClientSecret"];
    string siteName = settings["UserSiteName"];
    string driveId = settings["UserDriveId"];
    
    // Initialize SharePoint with credentials
    this.operation.RegisterSharePoint(tenantId, clientId, clientSecret, siteName, driveId);
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/SharePointProvider/SharePointFileOperations',
        downloadUrl: 'http://localhost:62869/api/SharePointProvider/SharePointDownload',
        uploadUrl: 'http://localhost:62869/api/SharePointProvider/SharePointUpload',
        getImageUrl: 'http://localhost:62869/api/SharePointProvider/SharePointGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- SharePoint document library access
- Microsoft Graph integration
- OAuth 2.0 authentication
- Team and personal site support

### Resources
- GitHub: https://github.com/SyncfusionExamples/sharepoint-aspcore-file-provider
- Microsoft Graph: https://docs.microsoft.com/en-us/graph/

---

## File Transfer Protocol (FTP) Provider

### Overview
Provides access to files stored on FTP servers with full file management capabilities.

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/ftp-aspcore-file-provider.git ftp-aspcore-file-provider
cd ftp-aspcore-file-provider
```

### Configuration

**Register FTP Connection in `FTPProviderController.cs`:**
```csharp
public FTPProviderController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new FTPFileProvider();
    
    string hostName = "ftp.example.com";
    string userName = "ftpuser";
    string password = "ftppassword";
    
    // Set FTP connection
    this.operation.SetFTPConnection(hostName, userName, password);
}
```

**appsettings.json:**
```json
{
  "FTPSettings": {
    "HostName": "ftp.example.com",
    "UserName": "ftpuser",
    "Password": "ftppassword",
    "Port": 21
  }
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/FTPProvider/FTPFileOperations',
        downloadUrl: 'http://localhost:62869/api/FTPProvider/FTPDownload',
        uploadUrl: 'http://localhost:62869/api/FTPProvider/FTPUpload',
        getImageUrl: 'http://localhost:62869/api/FTPProvider/FTPGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- FTP server access
- Remote file management
- Upload/Download operations
- Directory navigation

### Resources
- GitHub: https://github.com/SyncfusionExamples/ftp-aspcore-file-provider

---

## SQL Database File System Provider

### Overview
Manages file system data stored in SQL database tables, enabling ID-based file operations.

### Prerequisites

1. **SQL Server Database**
2. **FileManager.mdf database file**
3. **Connection string configured**

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/sql-server-database-aspcore-file-provider sql-server-database-aspcore-file-provider
cd sql-server-database-aspcore-file-provider
```

### Configuration

**appsettings.json:**
```json
{
  "ConnectionStrings": {
    "FileManagerConnection": "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\App_Data\\FileManager.mdf;Integrated Security=True;Connect Timeout=30"
  }
}
```

**Register SQL Connection in `SQLProviderController.cs`:**
```csharp
public SQLProviderController(IHostingEnvironment hostingEnvironment, IConfiguration configuration)
{
    this.operation = new SQLFileProvider();
    
    string connectionName = "FileManagerConnection";
    string tableName = "FileManager";
    string tableID = "Id";
    
    string connectionString = configuration.GetConnectionString(connectionName);
    
    // Set SQL connection
    this.operation.SetSQLConnection(connectionString, tableName, tableID);
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/SQLProvider/SQLFileOperations',
        downloadUrl: 'http://localhost:62869/api/SQLProvider/SQLDownload',
        uploadUrl: 'http://localhost:62869/api/SQLProvider/SQLUpload',
        getImageUrl: 'http://localhost:62869/api/SQLProvider/SQLGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- Database-backed file system
- ID-based operations
- Transaction support
- Relational data management

### Resources
- GitHub: https://github.com/SyncfusionExamples/sql-server-database-aspcore-file-provider
- FileManager.mdf: https://github.com/SyncfusionExamples/sql-server-database-aspcore-file-provider/blob/master/App_Data/FileManager.mdf

---

## Node File System Provider

### Overview
Node.js-based file system provider for lightweight backend file management.

### Setup Options

**Option 1: Using npm Package**

```bash
npm install @syncfusion/ej2-filemanager-node-filesystem
cd node_modules/@syncfusion/ej2-filemanager-node-filesystem
npm install
```

**Option 2: Cloning from GitHub**

```bash
git clone https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem.git node-filesystem-provider
cd node-filesystem-provider
npm install
```

### Configuration

**package.json scripts:**
```json
{
  "scripts": {
    "start": "node filesystem-server.js -d D:/Projects"
  }
}
```

**Set port and root directory:**
```bash
set PORT=3000 && node filesystem-server.js -d D:/Projects
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:3000/',
        downloadUrl: 'http://localhost:3000/Download',
        uploadUrl: 'http://localhost:3000/Upload',
        getImageUrl: 'http://localhost:3000/GetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- Lightweight Node.js backend
- Real-time file operations
- Stream-based file transfer
- Cross-platform support

### Resources
- NPM Package: https://www.npmjs.com/package/@syncfusion/ej2-filemanager-node-filesystem
- GitHub: https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem

---

## Google Drive File System Provider

### Overview
Enables access and management of files in Google Drive accounts using Google Drive APIs.

### Prerequisites

1. **Google Cloud Project**
2. **OAuth 2.0 Client Credentials**
3. **Google Drive API enabled**

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/google-drive-aspcore-file-provider google-drive-aspcore-file-provider
cd google-drive-aspcore-file-provider
```

### Configuration

**1. Generate OAuth 2.0 Credentials:**
- Go to Google Cloud Console
- Create OAuth 2.0 client credentials (Desktop application)
- Download JSON file

**2. Add credentials to project:**
- Place `client_secret.json` in:
  - `EJ2GoogleDriveFileProvider/credentials/client_secret.json`
  - `GoogleOAuth2.0Base/credentials/client_secret.json`

**3. GoogleDriveController Setup:**
```csharp
public GoogleDriveController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new GoogleDriveFileProvider();
    this.operation.RegisterGoogleDrive();
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/GoogleDriveProvider/GoogleDriveFileOperations',
        downloadUrl: 'http://localhost:62869/api/GoogleDriveProvider/GoogleDriveDownload',
        uploadUrl: 'http://localhost:62869/api/GoogleDriveProvider/GoogleDriveUpload',
        getImageUrl: 'http://localhost:62869/api/GoogleDriveProvider/GoogleDriveGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- Google Drive API integration
- OAuth 2.0 authentication
- Folder and file management
- Shared drive support

### Resources
- GitHub: https://github.com/SyncfusionExamples/google-drive-aspcore-file-provider
- Google Drive API: https://developers.google.com/drive/api/v3/reference/

---

## Firebase Realtime Database Provider

### Overview
Cloud-based file system provider using Firebase Realtime Database for storing file system metadata.

### Prerequisites

1. **Firebase Project**
2. **Realtime Database**
3. **Service Account Key**

### Setup Instructions

**Clone the repository:**
```bash
git clone https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider firebase-realtime-database-aspcore-file-provider
cd firebase-realtime-database-aspcore-file-provider
```

### Configuration

**1. Generate Service Account Key:**
- Firebase Console → Project Settings → Service Accounts
- Generate new private key (JSON format)
- Save as `access_key.json`

**2. Create Realtime Database JSON structure:**
```json
{
  "Files": [
    {
      "id": "1",
      "name": "Documents",
      "isFile": false,
      "parentId": "0",
      "size": 0,
      "dateModified": "2024-03-20T10:30:00Z",
      "dateCreated": "2024-03-15T14:20:00Z"
    },
    {
      "id": "2",
      "name": "report.pdf",
      "isFile": true,
      "parentId": "1",
      "size": 102400,
      "dateModified": "2024-03-20T10:30:00Z",
      "dateCreated": "2024-03-15T14:20:00Z"
    }
  ]
}
```

**3. Firebase Database Rules:**
```json
{
  "rules": {
    ".read": "auth!=null",
    ".write": "auth!=null"
  }
}
```

**4. Register Firebase in Controller:**
```csharp
public FirebaseRealtimeDBProviderController(IHostingEnvironment hostingEnvironment)
{
    this.operation = new FirebaseRealtimeDBFileProvider();
    
    string apiUrl = "https://your-project.firebaseio.com";
    string rootNode = "Files";
    string keyPath = hostingEnvironment.ContentRootPath + "/access_key.json";
    
    this.operation.RegisterFirebaseRealtimeDB(apiUrl, rootNode, keyPath);
}
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:62869/api/FirebaseProvider/FirebaseRealtimeFileOperations',
        downloadUrl: 'http://localhost:62869/api/FirebaseProvider/FirebaseRealtimeDownload',
        uploadUrl: 'http://localhost:62869/api/FirebaseProvider/FirebaseRealtimeUpload',
        getImageUrl: 'http://localhost:62869/api/FirebaseProvider/FirebaseRealtimeGetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- Cloud-based metadata storage
- Real-time synchronization
- Firebase authentication
- JSON-based structure

### Resources
- GitHub: https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider
- Firebase: https://firebase.google.com/

---

## IBM Cloud Object Storage Provider

### Overview
Node.js-based provider for managing files in IBM Cloud Object Storage.

### Setup Instructions

**Option 1: Using npm Package**

```bash
npm install @syncfusion/ej2-filemanager-ibm-cos-node-file-provider
cd node_modules/@syncfusion/ej2-filemanager-ibm-cos-node-file-provider
npm install
```

**Option 2: Cloning from GitHub**

```bash
git clone https://github.com/SyncfusionExamples/filemanager-ibm-cos-node-file-provider.git
cd filemanager-ibm-cos-node-file-provider
npm install
```

### Configuration

**Set port and start server:**
```bash
set PORT=3000 && node index.js
```

### TypeScript Implementation

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'http://localhost:3000/',
        downloadUrl: 'http://localhost:3000/Download',
        uploadUrl: 'http://localhost:3000/Upload',
        getImageUrl: 'http://localhost:3000/GetImage'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Key Features
- IBM Cloud Object Storage integration
- Scalable cloud storage
- Multi-region support
- REST API-based

### Resources
- NPM Package: https://www.npmjs.com/package/@syncfusion/ej2-filemanager-ibm-cos-node-file-provider
- GitHub: https://github.com/SyncfusionExamples/filemanager-ibm-cos-node-file-provider
- IBM Cloud: https://www.ibm.com/cloud/object-storage

---

## Comparison Table

| Provider | Type | Language | Setup Complexity | Cloud | Best For |
|----------|------|----------|------------------|-------|----------|
| Physical | On-Premise | C# | Low | No | Local file management |
| Azure | Cloud | C# | Medium | Yes | Enterprise Azure users |
| Amazon S3 | Cloud | C# | Medium | Yes | AWS environments |
| SharePoint | Cloud | C# | High | Yes | Microsoft environments |
| FTP | On-Premise | C# | Low | No | Legacy systems |
| SQL Database | On-Premise | C# | Medium | No | Database-driven apps |
| Node | Hybrid | Node.js | Low | Optional | Lightweight backends |
| Google Drive | Cloud | C# | Medium | Yes | Google Workspace |
| Firebase | Cloud | C# | Medium | Yes | Real-time apps |
| IBM Cloud | Cloud | Node.js | Medium | Yes | IBM Cloud users |

---

## Choosing a Provider

### Use Physical Provider if:
- Managing files on local server
- Need direct file system access
- Building internal tools

### Use Azure Provider if:
- Using Microsoft Azure services
- Need enterprise cloud storage
- Require compliance certifications

### Use Amazon S3 if:
- Using AWS infrastructure
- Need scalable storage
- Building AWS-native applications

### Use SharePoint if:
- Integrating with Microsoft 365
- Need document collaboration
- Enterprise SharePoint users

### Use Node Provider if:
- Need lightweight solution
- Using Node.js backend
- Building cross-platform apps

### Use Firebase if:
- Need real-time synchronization
- Building mobile-friendly apps
- Require Firebase integration

### Use Google Drive if:
- Integrating Google Workspace
- Need collaborative editing
- Google Cloud users

### Use SQL if:
- Metadata storage important
- Need relational queries
- Building enterprise apps

### Use FTP if:
- Working with legacy systems
- Need simple remote access
- Basic file management

### Use IBM Cloud if:
- IBM Cloud deployment
- Need object storage
- Large-scale applications
