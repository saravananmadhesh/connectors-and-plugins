# Collaborative Editing in ASP.NET Core Block Editor

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Yjs Providers](#yjs-providers)
4. [Getting Started](#getting-started)
5. [User Presence and Remote Cursors](#user-presence-and-remote-cursors)
6. [Configure Current User](#configure-current-user)
7. [Active Users](#active-users)
8. [Version History](#version-history)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Overview

The Block Editor supports real-time collaborative editing, enabling multiple users to work on the same document simultaneously. Collaboration is powered by **Yjs**, a Conflict-free Replicated Data Type (CRDT) framework that synchronizes document changes across all connected users and automatically resolves conflicts.

With collaboration enabled, users can:

- Edit the same document in real time
- View remote user cursors and selections
- Track active collaborators
- Perform collaboration-aware undo and redo operations
- Create, restore, compare, export, and import document versions

## Prerequisites

Before enabling collaboration, install the `yjs` library and a Yjs provider. See [Yjs Providers](https://docs.yjs.dev/ecosystem/connection-provider) to choose the right provider for your use case.

## Yjs Providers

A Yjs provider handles the transport of document updates between connected users. Choose a provider based on your deployment requirements.

| Provider | Type | Use Case |
| -------- | ---- | -------- |
| `y-websocket` | Self-hosted | Production deployments with your own WebSocket server |
| `y-webrtc` | Peer-to-peer | Quick local testing and development; no server required |
| `y-indexeddb` | Local storage | Offline persistence within a single browser |
| [Hocuspocus](https://tiptap.dev/docs/hocuspocus/getting-started/overview) | Open-source server | Scalable Node.js server with pluggable storage and Redis support |
| [Liveblocks](https://liveblocks.io/) | Fully managed | Hosted WebSocket infrastructure with REST API and DevTools |
| [PartyKit](https://www.partykit.io/) | Serverless | Serverless provider on Cloudflare; ideal for prototyping |

> **Note:** For development and testing, `y-webrtc` or PartyKit allow you to get started without a server. For production, use `y-websocket` or a managed provider such as Liveblocks or Hocuspocus for reliable, persistent synchronization.

## Configure Collaboration Settings

Use the `collaborationSettings` property of type `CollaborationSettingsModel` to configure collaboration settings for your Block Editor. It provides the following properties that allow you to customize the collaboration behavior:

| Property | Type | Description |
| -------- | ---- | ----------- |
| `provider` | `any` | Real-time transport used to synchronize document changes |
| `enableAwareness` | `boolean` | Enables user presence, remote cursors, and text selection overlays |
| `adapter` | `CollaborationAdapter` | Provides the Yjs runtime and shared XML fragment |
| `versionHistory` | `VersionHistorySettingsModel` | Configures document version history support |

## Getting Started

The following steps will help you set up real-time collaboration in the Block Editor using `Yjs`.

### Step 1: Create a Yjs Document

Create a shared Yjs document and XML fragment.

```razor
<script>
    // Create a shared Yjs document and fragment
    var yDoc = new Y.Doc();
    var yFragment = yDoc.getXmlFragment('blockeditor');
</script>
```

### Step 2: Create a Yjs Adapter

Create an adapter that provides the Yjs runtime and the shared fragment to the Block Editor.

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

Pass the adapter and provider to the Block Editor through the `collaborationSettings` property.

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor">
        <e-blockeditor-collaborationsettings adapter="adapter" provider="provider">
        </e-blockeditor-collaborationsettings>
    </ejs-blockeditor>
</div>
```

## User Presence and Remote Cursors

The Block Editor can display remote cursors, text selection overlays, and user details on hover. To enable these user presence features, set `enableAwareness` to `true` in `collaborationSettings` property.

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor">
        <e-blockeditor-collaborationsettings adapter="adapter" provider="provider" enableAwareness="true">
        </e-blockeditor-collaborationsettings>
    </ejs-blockeditor>
</div>
```

## Configure Current User

Set the current user's display name and cursor highlight color using the `users` and `currentUserId` properties. The `avatarBgColor` value is used for that user's remote cursor and text selection overlay.

The following properties are available when configuring users via the `users` property.

| Property | Type | Description |
| -------- | ---- | ----------- |
| `id` | `string` | Unique identifier for the user |
| `user` | `string` | Display name shown on remote cursors and presence indicators |
| `avatarBgColor` | `string` | Hex color used for this user's remote cursor and selection highlight |

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" created="onCreated"></ejs-blockeditor>
</div>

<script>
    var blockEditorObj;

    function onCreated() {
        blockEditorObj = ej.base.getComponent(document.getElementById('block-editor'), 'blockeditor');
        blockEditorObj.users = [{ id: 'user-1', user: 'John Doe', avatarBgColor: '#e74c3c' }];
        blockEditorObj.currentUserId = 'user-1';
    }
</script>
```

> When using the ASP.NET Core Tag Helper, the `users` collection and `currentUserId` can also be passed from the PageModel via `users="@Model.ViewModel.Users"` and `currentUserId="@Model.ViewModel.CurrentUserId"`, or set directly on the client-side instance as shown above.

## Active Users

### Get Active Users

Retrieve all currently connected users using the `users` property in the block editor.

```razor
<script>
    var users = blockEditorObj.users;
</script>
```

## Version History

`Version History` allows you to capture document snapshots and restore earlier versions. This is a built-in capability of the Block Editor and does not require a third-party service.

### Enable Version History

Configure the `versionHistory` property under `collaborationSettings` property by passing the storage instance and snapshot interval as attributes, similar to the `adapter` and `provider` properties.

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor">
        <e-blockeditor-collaborationsettings adapter="adapter" provider="provider" versionHistory="versionHistorySettings">
        </e-blockeditor-collaborationsettings>
    </ejs-blockeditor>
</div>

<script>
    var myStorage = new CustomVersionStorage('blockeditor-' + uniqueId);

    var versionHistorySettings = {
        storage: myStorage,
        snapshotInterval: 3000
    };
</script>
```

### Access the Version History Instance

After the Block Editor initializes, retrieve the version history instance and wait for snapshot data to load before calling any version history methods.

```razor
<script>
    var versionHistory = blockEditorObj.getVersionHistory();
    versionHistory.whenReady().then(function () {
        // Snapshots are now loaded and ready to use
    });
</script>
```

### Configure Snapshot Storage

Version snapshots need to be persisted to enable version history across browser sessions. Implement the `IVersionStorage` interface to provide a custom storage backend for managing snapshots. You can use IndexedDB, a backend database, or any other storage solution suitable for your deployment.

The `IVersionStorage` interface defines the following methods:

| Method | Signature | Description |
| ------ | --------- | ----------- |
| `saveSnapshot` | `(snapshot: VersionSnapshot): Promise<void>` | Persist a snapshot |
| `loadAllSnapshots` | `(): Promise<VersionSnapshot[]>` | Load all persisted snapshots, ordered by timestamp ascending |
| `loadSnapshot` | `(id: string): Promise<VersionSnapshot \| null>` | Load a single snapshot by id |
| `deleteSnapshot` | `(id: string): Promise<void>` | Permanently remove a snapshot by id |
| `clearAll` | `(): Promise<void>` | Remove all snapshots from storage |

```razor
<script>
    /**
     * Simple IndexedDB-based storage for version snapshots.
     * Implements IVersionStorage for persistence across browser sessions.
     */
    class CustomVersionStorage {
        // Implement the IVersionStorage interface methods
    }
</script>
```

### Version History Methods

#### Create a Snapshot

Creates a new snapshot of the current document state with an optional label and metadata.

```razor
<script>
    versionHistory.createSnapshot({
        label: 'Before major update',
        modifiedBy: currentUserId
    }).then(function (snapshot) {
        console.log(snapshot.id);
    });
</script>
```

#### List Snapshots

Retrieves all saved snapshots or a paginated subset. Snapshots are returned in chronological order.

```razor
<script>
    // Retrieve all snapshots
    var snapshots = versionHistory.getSnapshots();

    // Retrieve a paginated subset — getSnapshots(skip, take)
    var snapshots = versionHistory.getSnapshots(20, 40);
</script>
```

#### Rename a Snapshot

Updates the label or metadata of an existing snapshot without modifying its content.

```razor
<script>
    versionHistory.renameSnapshot(snapshotId, 'Release Candidate').then(function () {
        // Snapshot renamed
    });
</script>
```

#### Restore a Snapshot

Reverts the document to a previously saved snapshot state. The current document state is automatically backed up before restoration.

```razor
<script>
    versionHistory.restoreSnapshot(snapshotId).then(function () {
        // Snapshot restored
    });
</script>
```

> **Note:** When a snapshot is restored, the current document state is automatically backed up before the restore operation is applied.

#### Compare Versions

Compares two snapshots to identify differences such as added, removed, or modified content.

```razor
<script>
    var diff = versionHistory.compareVersions(snapshotIdA, snapshotIdB);
</script>
```

The returned `VersionDiff` object provides a summary of the differences between the two selected versions.

#### Export a Snapshot

Serializes a snapshot into a portable format that can be stored externally or transferred between systems.

```razor
<script>
    versionHistory.exportSnapshot(snapshotId).then(function (exported) {
        // Store externally or transfer between systems
    });
</script>
```

Exported snapshots can be stored externally or transferred between systems.

#### Import a Snapshot

Imports a previously exported snapshot back into the version history storage.

```razor
<script>
    versionHistory.importSnapshot(exported).then(function (imported) {
        // Snapshot imported
    });
</script>
```

### Version History Events

Use the following event callbacks in `versionHistory` settings to respond to snapshot lifecycle events.

#### snapshotCreated

Triggered when a new snapshot is created.

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor">
        <e-blockeditor-collaborationsettings versionHistory="versionHistorySettings">
        </e-blockeditor-collaborationsettings>
    </ejs-blockeditor>
</div>

<script>

    var versionHistorySettings = {
        storage: myStorage,
        snapshotCreated: onSnapshotCreated
    };

    function onSnapshotCreated(args) {
        var snapshot = args.snapshot;
        console.log(snapshot.id);
    }
</script>
```

#### snapshotRestored

Triggered when a snapshot is restored.

```razor
<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor">
        <e-blockeditor-collaborationsettings versionHistory="versionHistorySettings">
        </e-blockeditor-collaborationsettings>
    </ejs-blockeditor>
</div>

<script>

    var versionHistorySettings = {
        storage: myStorage,
        snapshotRestored: onSnapshotRestored
    };

    function onSnapshotRestored(args) {
        var snapshot = args.snapshot;
        var backupSnapshot = args.backupSnapshot;
        console.log(snapshot.label);
    }
</script>
```

## Best Practices

- **Use WebRTC or PartyKit for development** — These providers require no server setup and are ideal for local testing and prototyping before moving to a production provider
- **Use WebSocket-based providers in production** — `y-websocket`, Hocuspocus, or a managed service like Liveblocks provides reliable, low-latency, persistent synchronization at scale
- **Use stable room identifiers** — Use a unique document ID as the collaboration room name to prevent unintended document sharing between different documents
- **Persist snapshots externally** — Store snapshots in a database or cloud storage to preserve version history across sessions
- **Enable awareness selectively** — Disable `enableAwareness` when user presence information is not required to reduce network and processing overhead

## Troubleshooting

### Changes Are Not Synchronizing

Verify the following:

- All users are connected to the same collaboration room
- The provider connection is active
- The shared Yjs document is correctly configured

### Remote Cursors Are Not Visible

Verify the following:

- `enableAwareness` is set to `true`
- The configured provider supports the Yjs awareness protocol
- User information is set via the `users` and `currentUserId` properties
- Each user has a unique `id` value

### Remote User Names Are Not Appearing on Cursors

Verify the following:

- The `user` field is populated for all entries in the `users` array

### Version History Is Not Available

Verify the following:

- A valid `IVersionStorage` implementation is provided through the `versionHistory` settings
- `whenReady()` has been awaited before accessing snapshots
