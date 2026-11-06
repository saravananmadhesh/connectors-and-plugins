# Collaborative Editing — Syncfusion ASP.NET MVC Block Editor

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Yjs Providers](#yjs-providers)
4. [Configuration](#configuration)
5. [Getting Started](#getting-started)
6. [User Presence & Remote Cursors](#user-presence--remote-cursors)
7. [Version History](#version-history)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The Block Editor supports real-time collaborative editing, enabling multiple users to work on the same document simultaneously. Collaboration is powered by **Yjs**, a Conflict-free Replicated Data Type (CRDT) framework that synchronizes document changes across all connected users and automatically resolves conflicts.

With collaboration enabled, users can:

* Edit the same document in real time
* View remote user cursors and selections
* Track active collaborators
* Perform collaboration-aware undo and redo operations
* Create, restore, compare, export, and import document versions

---

## Prerequisites

Before enabling collaboration, install the `yjs` library and a Yjs provider:

```powershell
npm install yjs
npm install y-websocket
```

See [Yjs Providers](https://docs.yjs.dev/ecosystem/connection-provider) to choose the right provider for your use case.

---

## Yjs Providers

A Yjs provider handles the transport of document updates between connected users. Choose a provider based on your deployment requirements.

| Provider | Type | Use Case |
| -------- | ---- | -------- |
| `y-websocket` | Self-hosted | Production deployments with your own WebSocket server. |
| `y-webrtc` | Peer-to-peer | Quick local testing and development; no server required. |
| `y-indexeddb` | Local storage | Offline persistence within a single browser. |
| [Hocuspocus](https://tiptap.dev/docs/hocuspocus/getting-started/overview) | Open-source server | Scalable Node.js server with pluggable storage and Redis support. |
| [Liveblocks](https://liveblocks.io/) | Fully managed | Hosted WebSocket infrastructure with REST API and DevTools. |
| [PartyKit](https://www.partykit.io/) | Serverless | Serverless provider on Cloudflare; ideal for prototyping. |

> **Note:** For development and testing, `y-webrtc` or PartyKit allow you to get started without a server. For production, use `y-websocket` or a managed provider such as Liveblocks or Hocuspocus for reliable, persistent synchronization.

---

## Configuration

Use the `CollaborationSettings` property to configure collaboration settings for your Block Editor. It provides properties such as `Adapter`, `Provider`, `EnableAwareness`, and `VersionHistory` which allow you to customize the collaboration behavior.

| Property | Type | Purpose |
|---|---|---|
| `Adapter` | object | Provides Yjs runtime and shared fragment |
| `Provider` | object | Connects users to the same shared document |
| `EnableAwareness` | bool | Enable remote cursors and user presence (default: `false`) |
| `VersionHistory` | object | Configure snapshot storage and lifecycle |

---

## Getting Started

### Step 1: Create a Yjs Document

Create a shared Yjs document and XML fragment in your Razor view:

```razor
<script>
    // Create a shared Yjs document and fragment
    var yDoc = new Y.Doc();
    var yFragment = yDoc.getXmlFragment('blockeditor');
</script>
```

### Step 2: Create a Yjs Adapter

Create an adapter that provides the Yjs runtime and the shared fragment to the Block Editor:

```razor
<script>
    var adapter = {
        yRuntime: Y,
        yXmlFragment: yFragment
    }
</script>
```

### Step 3: Configure a Provider

Create a provider that connects users to the same shared document. The following example uses `y-websocket` for production use. For local development, replace it with `y-webrtc` or a PartyKit provider — no server setup is required.

**Production (y-websocket):**

```razor
<script>
    var WebsocketProvider = window.WebsocketProvider;
    var provider = new WebsocketProvider(
        'wss://your-server-url',
        'document-room-id',
        yDoc
    );
</script>
```

**Development (y-webrtc):**

```razor
<script>
    var WebrtcProvider = window.WebrtcProvider;
    var provider = new WebrtcProvider('document-room-id', yDoc);
</script>
```

### Step 4: Enable Collaboration

Pass the adapter and provider to the Block Editor through the `CollaborationSettings` property:

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").CollaborationSettings(col => {
        col.Adapter("adapter").Provider("provider");
    }).Render()
</div>
```

### Complete Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor")
        .CollaborationSettings(col => {
            col.Adapter("adapter").Provider("provider").EnableAwareness(true);
        })
        .Users((List<UserPresence>)ViewBag.Users)
        .CurrentUserId("user-1")
        .Created("onCreated")
        .Render()
</div>

<script src="https://cdn.jsdelivr.net/npm/yjs@13.0.0/dist/y.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lib0@0.2.94/dist/lib0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/y-websocket@1.4.3/dist/y-websocket.js"></script>

<script>
    // Create Yjs document and adapter
    var yDoc = new Y.Doc();
    var yFragment = yDoc.getXmlFragment('blockeditor');
    
    var adapter = {
        yRuntime: Y,
        yXmlFragment: yFragment
    };
    
    // Create WebSocket provider for development
    var provider = new WebsocketProvider(
        'wss://your-collaboration-server.com',
        'document-123',
        yDoc
    );
    
    var blockEditorObj;
    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
    }
</script>
```

---

## User Presence & Remote Cursors

The Block Editor can display remote cursors, text selection overlays, and user details on hover. To enable these user presence features, set `EnableAwareness` to `true` in `CollaborationSettings`.

### Enable Awareness

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").CollaborationSettings(col => {
        col.Adapter("adapter")
           .Provider("provider")
           .EnableAwareness(true);
    }).Render()
</div>
```

### Configure Current User

Set the current user's display name and cursor highlight color using the `Users` and `CurrentUserId` properties. The `avatarBgColor` value is used for that user's remote cursor and text selection overlay.

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor")
        .CollaborationSettings(col => {
            col.Adapter("adapter")
               .Provider("provider")
               .EnableAwareness(true);
        })
        .Users((List<UserPresence>)ViewBag.Users)
        .CurrentUserId("user-1")
        .Created("onCreated")
        .Render()
</div>

<script>
    var blockEditorObj;
    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
        // Optionally set users at runtime
        blockEditorObj.users = [
            { id: 'user-1', user: 'John Doe', avatarBgColor: '#e74c3c' },
            { id: 'user-2', user: 'Jane Smith', avatarBgColor: '#3498db' }
        ];
        blockEditorObj.currentUserId = 'user-1';
    }
</script>
```

**User Model (C# Backend):**

```csharp
public class UserPresence
{
    public string id { get; set; }
    public string user { get; set; }
    public string avatarBgColor { get; set; }
}

public ActionResult Index()
{
    var users = new List<UserPresence>
    {
        new UserPresence { id = "user-1", user = "John Doe", avatarBgColor = "#e74c3c" },
        new UserPresence { id = "user-2", user = "Jane Smith", avatarBgColor = "#3498db" }
    };
    ViewBag.Users = users;
    return View();
}
```

### Get Active Users

Retrieve all currently connected users using the `users` property:

```javascript
var users = blockEditorObj.users;
console.log('Active users:', users);
```

---

## Version History

Version History allows you to capture document snapshots and restore earlier versions. This is a built-in capability of the Block Editor and does not require a third-party service.

### Enable Version History

Configure the `VersionHistory` property under `CollaborationSettings`:

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").CollaborationSettings(col => {
        col.Adapter("adapter")
           .Provider("provider")
           .VersionHistory(ver => {
               ver.Storage("myStorage").SnapshotInterval(3000);
           });
    }).Render()
</div>

<script>
    var myStorage = new CustomVersionStorage('blockeditor-' + uniqueId);
</script>
```

### Configure Snapshot Storage

Version snapshots need to be persisted to enable version history across browser sessions. Implement the `IVersionStorage` interface to provide a custom storage backend for managing snapshots.

The `IVersionStorage` interface defines the following methods:

| Method | Signature | Description |
| ------ | --------- | ----------- |
| `saveSnapshot` | `(snapshot: VersionSnapshot): Promise<void>` | Persist a snapshot. |
| `loadAllSnapshots` | `(): Promise<VersionSnapshot[]>` | Load all persisted snapshots, ordered by timestamp ascending. |
| `loadSnapshot` | `(id: string): Promise<VersionSnapshot \| null>` | Load a single snapshot by id. |
| `deleteSnapshot` | `(id: string): Promise<void>` | Permanently remove a snapshot by id. |
| `clearAll` | `(): Promise<void>` | Remove all snapshots from storage. |

**IndexedDB Implementation:**

```javascript
/**
 * Simple IndexedDB-based storage for version snapshots.
 * Implements IVersionStorage for persistence across browser sessions.
 */
class CustomVersionStorage {
    constructor(storeName) {
        this.storeName = storeName;
        this.db = null;
        this.initDb();
    }

    initDb() {
        const request = indexedDB.open(this.storeName, 1);
        
        request.onupgradeneeded = (e) => {
            this.db = e.target.result;
            if (!this.db.objectStoreNames.contains('snapshots')) {
                this.db.createObjectStore('snapshots', { keyPath: 'id' });
            }
        };
        
        request.onsuccess = (e) => {
            this.db = e.target.result;
        };
    }

    async saveSnapshot(snapshot) {
        const tx = this.db.transaction('snapshots', 'readwrite');
        return new Promise((resolve, reject) => {
            tx.objectStore('snapshots').add(snapshot);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async loadAllSnapshots() {
        const tx = this.db.transaction('snapshots', 'readonly');
        return new Promise((resolve, reject) => {
            const request = tx.objectStore('snapshots').getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async loadSnapshot(id) {
        const tx = this.db.transaction('snapshots', 'readonly');
        return new Promise((resolve, reject) => {
            const request = tx.objectStore('snapshots').get(id);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteSnapshot(id) {
        const tx = this.db.transaction('snapshots', 'readwrite');
        return new Promise((resolve, reject) => {
            tx.objectStore('snapshots').delete(id);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async clearAll() {
        const tx = this.db.transaction('snapshots', 'readwrite');
        return new Promise((resolve, reject) => {
            tx.objectStore('snapshots').clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
}
```

### Access the Version History Instance

After the Block Editor initializes, retrieve the version history instance and wait for snapshot data to load before calling any version history methods:

```javascript
var versionHistory = blockEditorObj.getVersionHistory();
versionHistory.whenReady().then(function () {
    // Snapshots are now loaded and ready to use
    console.log('Version history ready');
});
```

### Version History Methods

#### Create a Snapshot

Creates a new snapshot of the current document state with an optional label and metadata:

```javascript
versionHistory.createSnapshot({
    label: 'Before major update',
    modifiedBy: currentUserId
}).then(function (snapshot) {
    console.log('Snapshot created:', snapshot.id);
});
```

#### List Snapshots

Retrieves all saved snapshots or a paginated subset. Snapshots are returned in chronological order:

```javascript
// Retrieve all snapshots
var snapshots = versionHistory.getSnapshots();

// Retrieve a paginated subset — getSnapshots(skip, take)
var pageSnapshots = versionHistory.getSnapshots(20, 40);
console.log('Total snapshots:', snapshots.length);
```

#### Rename a Snapshot

Updates the label or metadata of an existing snapshot without modifying its content:

```javascript
versionHistory.renameSnapshot(snapshotId, 'Release Candidate').then(function () {
    console.log('Snapshot renamed');
});
```

#### Restore a Snapshot

Reverts the document to a previously saved snapshot state. The current document state is automatically backed up before restoration:

```javascript
versionHistory.restoreSnapshot(snapshotId).then(function () {
    console.log('Snapshot restored');
});
```

> **Note:** When a snapshot is restored, the current document state is automatically backed up before the restore operation is applied.

#### Compare Versions

Compares two snapshots to identify differences such as added, removed, or modified content:

```javascript
var diff = versionHistory.compareVersions(snapshotIdA, snapshotIdB);
console.log('Differences:', diff);
```

The returned `VersionDiff` object provides a summary of the differences between the two selected versions.

#### Export a Snapshot

Serializes a snapshot into a portable format that can be stored externally or transferred between systems:

```javascript
versionHistory.exportSnapshot(snapshotId).then(function (exported) {
    // Store externally or transfer between systems
    console.log('Snapshot exported');
});
```

#### Import a Snapshot

Imports a previously exported snapshot back into the version history storage:

```javascript
versionHistory.importSnapshot(exported).then(function (imported) {
    console.log('Snapshot imported:', imported.id);
});
```

### Version History Events

#### snapshotCreated

Triggered when a new snapshot is created:

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").CollaborationSettings(col => {
        col.VersionHistory(ver => {
            ver.Storage("myStorage").SnapshotCreated("onSnapshotCreated");
        });
    }).Render()
</div>

<script>
    function onSnapshotCreated(args) {
        var snapshot = args.snapshot;
        console.log('Snapshot created:', snapshot.id, snapshot.label);
    }
</script>
```

#### snapshotRestored

Triggered when a snapshot is restored:

```razor
<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").CollaborationSettings(col => {
        col.VersionHistory(ver => {
            ver.Storage("myStorage").SnapshotRestored("onSnapshotRestored");
        });
    }).Render()
</div>

<script>
    function onSnapshotRestored(args) {
        var snapshot = args.snapshot;
        var backupSnapshot = args.backupSnapshot;
        console.log('Snapshot restored:', snapshot.label);
        console.log('Backup created:', backupSnapshot.id);
    }
</script>
```

---

## Best Practices

* **Use WebRTC or PartyKit for development** — These providers require no server setup and are ideal for local testing and prototyping before moving to a production provider.

* **Use WebSocket-based providers in production** — `y-websocket`, Hocuspocus, or a managed service like Liveblocks provides reliable, low-latency, persistent synchronization at scale.

* **Use stable room identifiers** — Use a unique document ID as the collaboration room name to prevent unintended document sharing between different documents.

* **Persist snapshots externally** — Store snapshots in a database or cloud storage to preserve version history across sessions.

* **Enable awareness selectively** — Disable `EnableAwareness` when user presence information is not required to reduce network and processing overhead.

* **Limit concurrent users** — Monitor performance with many simultaneous editors; consider implementing rate limiting or connection thresholds.

* **Test conflict resolution** — Verify that Yjs correctly resolves simultaneous edits from multiple users in your use case.

---

## Troubleshooting

### Changes Are Not Synchronizing

Verify the following:

* All users are connected to the same collaboration room (same room ID).
* The provider connection is active and network accessible.
* The shared Yjs document is correctly configured with the same fragment name.
* No browser console errors are reported.

### Remote Cursors Are Not Visible

Verify the following:

* `EnableAwareness` is set to `true` in `CollaborationSettings`.
* The configured provider supports the Yjs awareness protocol (most do, but verify for custom providers).
* User information is set via the `Users` and `CurrentUserId` properties.
* Each user has a unique `id` value.

### Remote User Names Are Not Appearing on Cursors

Verify the following:

* The `user` field is populated for all entries in the `Users` array.
* User data is bound from `ViewBag.Users` or set dynamically in the `Created` event.

### Version History Is Not Available

Verify the following:

* A valid storage implementation (e.g., `CustomVersionStorage`) is provided through the `VersionHistory` property.
* The storage implementation correctly implements the `IVersionStorage` interface with all required methods.
* `whenReady()` has been awaited before accessing snapshots.
* Browser IndexedDB (if using IndexedDB storage) is not disabled or quota-limited.

### Performance Degradation with Many Users

* Reduce snapshot frequency by increasing `SnapshotInterval`.
* Disable `EnableAwareness` if user presence tracking is not essential.
* Consider splitting large documents into smaller collaborative spaces.
* Monitor network bandwidth and consider implementing compression on the provider.
