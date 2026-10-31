# Collaborative Editing

Enable real-time collaborative editing to allow multiple users to work on the same workbook, synchronize supported workbook actions, and view connected users and selections.

Collaborative editing uses the `@syncfusion/ej2-collaborator` package together with the Syncfusion Collaboration Server to synchronize workbook actions between users connected to the same collaboration room.

---

## Minimal Code

```tsx
import { useRef } from 'react';
import {
    CollaborativeEditingHandler,
    Inject,
    SpreadsheetComponent
} from '@syncfusion/ej2-react-spreadsheet';
import { CollaborationClient } from '@syncfusion/ej2-collaborator';
import { SpreadsheetEditorAdapter } from './SpreadsheetEditorAdapter';

const serviceUrl: string =
    '<your-collaboration-service-url>';
const currentUser: string = 'John';

export default function App() {

    const spreadsheetRef =
        useRef<SpreadsheetComponent>(null);

    const adapterRef =
        useRef<SpreadsheetEditorAdapter | null>(null);

    const created =
        async (): Promise<void> => {

            const spreadsheet =
                spreadsheetRef.current;

            if (!spreadsheet) {
                return;
            }

            const roomName: string =
                new URL(window.location.href)
                    .searchParams.get('id') ||
                'sample-room';

            const adapter =
                new SpreadsheetEditorAdapter(
                    spreadsheet,
                    serviceUrl,
                    currentUser
                );

            await adapter.loadFromServer(
                'Sample',
                roomName
            );

            const client =
                new CollaborationClient(
                    adapter,
                    {
                        serviceUrl,
                        connectionType: 'signalr',
                        currentUser
                    }
                );

            adapterRef.current = adapter;

            await client.joinRoomAsync(
                roomName
            );
        };

    const actionComplete = (
        args: any
    ): void => {

        adapterRef.current?.sendActionToServer(
            args
        );
    };

    return (
        <SpreadsheetComponent
            ref={spreadsheetRef}
            enableCollaborativeEditing={true}
            created={created}
            actionComplete={actionComplete}
        >
            <Inject
                services={[
                    CollaborativeEditingHandler
                ]}
            />
        </SpreadsheetComponent>
    );
}
```

---

## Install the Collaboration Client

Install the Collaborator package in the React application.

```bash
npm install @syncfusion/ej2-collaborator
```

For details about connection types, room management, and collaboration events, refer to the Collaboration Client documentation.

---

## Collaboration Client Configuration

The `CollaborationClient` connects the SpreadsheetEditor to the Collaboration Server and manages the collaboration session.

### Configuration Options

| Property | Description |
|-----------|-------------|
| `serviceUrl` | Specifies the Collaboration Server URL |
| `connectionType` | Specifies `signalr` or `websocket`. The client and server must use the same transport |
| `currentUser` | Specifies the display name of the current user |
| `onUserJoined` | Invoked when another user joins the room |
| `onUserLeft` | Invoked when another user leaves the room |

### Example

```tsx
const client =
    new CollaborationClient(
        adapter,
        {
            serviceUrl,
            connectionType: 'signalr',
            currentUser,
            onUserJoined: (user) => {
                console.log(
                    'User joined',
                    user
                );
            },
            onUserLeft: (user) => {
                console.log(
                    'User left',
                    user
                );
            }
        }
    );
```

---

## Create the SpreadsheetEditor Adapter

The `SpreadsheetEditorAdapter` implements `ICollaborationProvider` and acts as the bridge between the SpreadsheetEditor and Collaboration Client. It loads the synchronized workbook, sends local SpreadsheetEditor actions, and applies remote actions received through `data.payload`.

Create the `SpreadsheetEditorAdapter.ts` file.

```ts
import {
    ICollaborationActionData,
    ICollaborationProvider
} from '@syncfusion/ej2-collaborator';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

export class SpreadsheetEditorAdapter
    implements ICollaborationProvider {

    public currentRoomName: string = '';

    public constructor(
        private spreadsheet: Spreadsheet,
        private serviceUrl: string,
        private currentUser: string
    ) {
        this.serviceUrl =
            serviceUrl.endsWith('/')
                ? serviceUrl
                : serviceUrl + '/';
    }

    public async loadFromServer(
        fileName: string,
        roomName: string
    ): Promise<void> {

        const response: Response =
            await fetch(
                this.serviceUrl +
                'api/CollaborativeEditing/ImportFile',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json'
                    },
                    body: JSON.stringify({
                        fileName,
                        roomName
                    })
                }
            );

        if (!response.ok) {
            throw new Error(
                'Failed to load the workbook.'
            );
        }

        const data: any = JSON.parse(
            await response.text()
        );

        this.currentRoomName = roomName;

        this.spreadsheet
            .collaborativeEditingModule
            .updateRoomInfo(
                roomName,
                data.version,
                this.serviceUrl +
                'api/CollaborativeEditing/'
            );

        this.spreadsheet
            .collaborativeEditingModule
            .setLocalUser(
                this.currentUser
            );

        this.spreadsheet.openFromJson({
            file: data.sfdt
        });
    }

    public sendActionToServer(
        action: any
    ): void {

        if (action) {
            this.spreadsheet
                .collaborativeEditingModule
                .sendActionToServer(
                    action
                );
        }
    }

    public applyRemoteAction(
        action: string,
        data: ICollaborationActionData
    ): void {

        if (data) {
            this.spreadsheet
                .collaborativeEditingModule
                .applyRemoteAction(
                    action,
                    data.payload
                );
        }
    }
}
```

### Adapter Responsibilities

- Load workbook data from the Collaboration Server
- Update room information and workbook version
- Set local user information
- Send local workbook actions to the server
- Apply remote workbook actions received from other users

### Main Methods

| Method | Description |
|----------|-------------|
| `loadFromServer()` | Loads workbook data and room version information |
| `sendActionToServer()` | Sends local workbook actions to the server |
| `applyRemoteAction()` | Applies remote workbook actions received from the server |

---

## Configure the React SpreadsheetEditor

Set `enableCollaborativeEditing` to `true`, inject `CollaborativeEditingHandler`, load the workbook, initialize the Collaboration Client, and join the collaboration room.

### Enable Collaborative Editing

```tsx
import {
    CollaborativeEditingHandler,
    Inject,
    SpreadsheetComponent
} from '@syncfusion/ej2-react-spreadsheet';

<SpreadsheetComponent
    enableCollaborativeEditing={true}>
    <Inject
        services={[
            CollaborativeEditingHandler
        ]}
    />
</SpreadsheetComponent>
```

### Load Workbook State

```tsx
await adapter.loadFromServer(
    'Sample',
    roomName
);
```

### Initialize the Collaboration Client

```tsx
const client =
    new CollaborationClient(
        adapter,
        {
            serviceUrl,
            connectionType: 'signalr',
            currentUser
        }
    );
```

### Send Local Actions

```tsx
const actionComplete = (
    args: any
): void => {

    adapterRef.current?.sendActionToServer(
        args
    );
};
```

### Apply Remote Actions

Remote actions received through the Collaboration Client are applied through:

```tsx
adapter.applyRemoteAction(
    action,
    data
);
```

---

## Manage the Collaboration Room

The application must provide a room ID for each collaboration session and share the same room ID with all participating users. Users who use the same room ID join the same collaboration session. The room ID can be provided through a query parameter or another application-specific session mechanism.

### Example

```tsx
const roomName: string =
    new URL(window.location.href)
        .searchParams.get('id') ||
    'sample-room';
```

### Join a Collaboration Room

Call `joinRoomAsync` with the shared room ID after loading the latest workbook state and room version.

```tsx
await client.joinRoomAsync(
    roomName
);
```

After joining the room, supported local actions are sent through `actionComplete`, and remote actions are applied through `SpreadsheetEditorAdapter.applyRemoteAction`.

---

## Presence Features

- Live collaborator selection indicators with participant-specific colors
- Connected users display
- Multi-user sheet awareness
- Automatic reconnection and missed-action recovery
- Late-join synchronization with the latest workbook state

---

## Server Configuration

Collaborative editing requires an ASP.NET Core Collaboration Server, Redis cache, and SignalR or WebSocket transport.

### Redis Configuration

Add the Redis connection string to `appsettings.json`.

```json
{
  "ConnectionStrings": {
    "Redis": "[REDIS_CONNECTION_STRING]"
  }
}
```

### Collaboration Server Registration

Configure the Collaboration Server and SpreadsheetEditor adapter.

```csharp
using Syncfusion.Collaboration.Core.Extensions;
using Syncfusion.Collaboration.Core.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCollaborationServer(options =>
{
    options.ConnectionString =
        builder.Configuration
            .GetConnectionString("Redis");

    options.ConnectionType =
        CollaborationConnectionType.SignalR;
});

builder.Services.AddSingleton<
    ICollaborationAdapter,
    SpreadsheetCollaborativeAdaptor>();

builder.Services.AddControllers();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.MapCollaborationServer();

app.Run();
```

### Collaboration Options

| Option | Description |
|---|---|
| `ConnectionString` | Redis connection string |
| `ConnectionType` | SignalR or WebSocket transport |
| `SaveThreshold` | Action count before save processing starts. Default: `100` |

### Required Components

- `Syncfusion.Collaborator.Server.AspNet.Core`
- Redis
- SignalR or WebSocket
- SpreadsheetEditor Collaboration Adapter

For Collaboration Server setup, Redis configuration, adapter implementation, endpoint registration, and deployment details, refer to the ASP.NET Core Collaboration Server documentation.

---

## Required Server APIs

The Collaboration Server should expose the following SpreadsheetEditor collaboration endpoints.

| API | Description |
|------|-------------|
| `ImportFile` | Loads workbook data and current server version |
| `UpdateAction` | Processes and broadcasts workbook actions |
| `UpdateSelection` | Synchronizes active cell and selection information |
| `GetActionsFromServer` | Returns missed actions for synchronization |

---

## Server Adapter

Implement `ICollaborationAdapter` to transform concurrent Spreadsheet operations and process queued save requests.

```csharp
public void TransformOperations(
    List<CollaborationAction> actions)
{
    List<ActionInfo> spreadsheetActions =
        actions
            .Select(action =>
                MapGenericToControlAction(action)
                as ActionInfo)
            .Where(action => action != null)
            .ToList();

    if (
        CollaborativeEditingHandler
            .TransformOperations(
                spreadsheetActions))
    {
        ActionInfo transformedAction =
            spreadsheetActions.Last();

        actions.Last().Data =
            JsonConvert.SerializeObject(
                transformedAction.Operations);
    }
}
```

---

## Supported Collaborative Actions

Collaborative editing supports synchronization of:

- Cell value, formula, and formatting changes
- Clipboard operations
- Sorting and filtering
- Row, column, and sheet operations
- Data validation and conditional formatting
- Comments, replies, notes, hyperlinks, and defined names
- Images and charts
- Workbook display and protection settings

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[ROOM_NAME]` | Collaboration room identifier | `'sales-team'` |
| `[SERVICE_URL]` | Collaboration server endpoint | `'https://your-service-url/'` |
| `[USER_NAME]` | User display name | `'John Doe'` |
| `[REDIS_CONNECTION_STRING]` | Redis connection string | `'localhost:6379'` |

### Documentation Link

Refer to the following documentation link to configure the collaboration server for collaborative editing:

https://help.syncfusion.com/document-processing/collaborator/collaboration-server

### GitHub Reference

Refer to the following GitHub reference for collaborative editing with Spreadsheet:

https://github.com/SyncfusionExamples/Spreadsheet-Collaborative-Editing

## Notes

- Install the `@syncfusion/ej2-collaborator` package before enabling collaborative editing.
- Inject `CollaborativeEditingHandler` using the `Inject` component before using collaborative editing.
- Set `enableCollaborativeEditing` to `true`.
- All participating users must join the same room ID.
- SignalR and WebSocket transports are supported.
- The client and server must use the same connection type.
- Redis is required for collaboration action and version storage.
- Connected users can view participant selections and editing presence.
- Missed actions are automatically recovered based on server version information.
- Users joining an existing room receive the latest workbook state.
- Undo and redo history is maintained locally and is not synchronized between users.