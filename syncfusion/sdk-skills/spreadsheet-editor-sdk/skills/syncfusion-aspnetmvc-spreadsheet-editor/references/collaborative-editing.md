# Collaborative Editing

Enable real-time collaborative editing to allow multiple users to work on the same workbook, synchronize supported workbook actions, and view connected users and selections.

Collaborative editing uses the `@syncfusion/ej2-collaborator` package together with the Syncfusion Collaboration Server to synchronize workbook actions between users connected to the same collaboration room.

---

## Minimal Code

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet
<script>
    var module =
        ej.spreadsheet.CollaborativeEditing ||
        ej.spreadsheet.CollaborativeEditingHandler;
    ej.spreadsheet.Spreadsheet.Inject(
        module
    );
</script>
@Html.EJS().Spreadsheet("spreadsheet")
    .EnableCollaborativeEditing(true)
    .Created("createdHandler")
    .ActionComplete("actionCompleteHandler")
    .Render()
<script>
    var collaborationServiceUrl =
        '<your-collaboration-service-url>';
    var collaborationRoomName =
        new URL(window.location.href)
            .searchParams.get('id') ||
        'sample-room';
    var collaborationAdapter;
    var collaborationClient;
    async function createdHandler() {
        var currentUser = 'John';
        collaborationAdapter =
            new SpreadsheetEditorAdapter(
                this,
                collaborationServiceUrl,
                currentUser
            );
        await collaborationAdapter.loadFromServer(
            'Sample',
            collaborationRoomName
        );
        collaborationClient =
            new ej.collaborator.CollaborationClient(
                collaborationAdapter,
                {
                    serviceUrl:
                        collaborationServiceUrl,
                    connectionType:
                        'websocket',
                    currentUser:
                        currentUser
                }
            );
        await collaborationClient.joinRoomAsync(
            collaborationRoomName
        );
    }
    function actionCompleteHandler(args) {
        if (
            collaborationAdapter &&
            collaborationClient
        ) {
            collaborationAdapter
                .sendActionToServer(args);
        }
    }
</script>
```

---

## Install the Collaboration Client

Install the Collaborator package in the application.

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

```javascript
collaborationClient =
    new ej.collaborator.CollaborationClient(
        collaborationAdapter,
        {
            serviceUrl:
                collaborationServiceUrl,
            connectionType:
                'signalr',
            currentUser:
                currentUser,
            onUserJoined: function(user) {
                console.log(
                    'User joined',
                    user
                );
            },
            onUserLeft: function(user) {
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

Create the `SpreadsheetEditorAdapter.js` file.

```javascript
class SpreadsheetEditorAdapter {
    constructor(
        spreadsheet,
        serviceUrl,
        currentUser
    ) {
        this.spreadsheet = spreadsheet;
        this.serviceUrl =
            serviceUrl.endsWith('/')
                ? serviceUrl
                : serviceUrl + '/';
        this.currentUser = currentUser;
        this.currentRoomName = '';
    }
    async loadFromServer(
        fileName,
        roomName
    ) {
        const response =
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
        const data =
            JSON.parse(
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
    sendActionToServer(action) {
        if (action) {
            this.spreadsheet
                .collaborativeEditingModule
                .sendActionToServer(
                    action
                );
        }
    }
    applyRemoteAction(
        action,
        data
    ) {
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

## Configure the ASP.NET MVC SpreadsheetEditor

Set `enableCollaborativeEditing` to `true`, inject the collaborative editing module, load the workbook, initialize the Collaboration Client, and join the collaboration room.

### Enable Collaborative Editing

Inject the collaborative editing module and enable collaborative editing when creating the Spreadsheet component.

```javascript
var module =
    ej.spreadsheet.CollaborativeEditing ||
    ej.spreadsheet.CollaborativeEditingHandler;

ej.spreadsheet.Spreadsheet.Inject(
    module
);
```

```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
    .EnableCollaborativeEditing(true)
```

### Load Workbook State

```javascript
await collaborationAdapter.loadFromServer(
    'Sample',
    collaborationRoomName
);
```

### Initialize the Collaboration Client

```javascript
collaborationClient =
    new ej.collaborator.CollaborationClient(
        collaborationAdapter,
        {
            serviceUrl:
                collaborationServiceUrl,
            connectionType:
                'signalr',
            currentUser:
                currentUser
        }
    );
```

### Send Local Actions

```javascript
function actionCompleteHandler(args) {
    if (
        collaborationAdapter &&
        collaborationClient
    ) {
        collaborationAdapter
            .sendActionToServer(args);
    }
}
```

### Apply Remote Actions

Remote actions received through the Collaboration Client are applied through:

```javascript
collaborationAdapter.applyRemoteAction(
    action,
    data
);
```

---

## Manage the Collaboration Room

The application must provide a room ID for each collaboration session and share the same room ID with all participating users. Users who use the same room ID join the same collaboration session. The room ID can be provided through a query parameter or another application-specific session mechanism.

### Example

```javascript
var collaborationRoomName =
    new URL(window.location.href)
        .searchParams.get('id') ||
    'sample-room';
```

### Join a Collaboration Room

Call `joinRoomAsync` with the shared room ID after loading the latest workbook state and room version.

```javascript
await collaborationClient.joinRoomAsync(
    collaborationRoomName
);
```

After joining the room, supported local actions are sent through `actionCompleteHandler`, and remote actions are applied through `SpreadsheetEditorAdapter.applyRemoteAction`.

---

## Presence Features

- Live collaborator selection indicators with participant-specific colors
- Connected users display
- Multi-user sheet awareness
- Automatic reconnection and missed-action recovery
- Late-join synchronization with the latest workbook state

---

## Server Configuration

Collaborative editing for ASP.NET MVC requires the Syncfusion Collaboration Server, Redis, and WebSocket transport. Configure the client with `connectionType: 'websocket'`.

### Install server packages

Install these packages in the ASP.NET MVC project:

```powershell
Install-Package Syncfusion.Collaborator.Server.AspNet.Mvc
Install-Package Syncfusion.EJ2.Spreadsheet.AspNet.Mvc5
```

`Syncfusion.EJ2.Spreadsheet.AspNet.Mvc5` provides the Spreadsheet workbook APIs used by the import and save endpoints. Keep the Syncfusion packages on compatible versions.

### Register the Collaboration Server (Global.asax.cs)

Register the Spreadsheet-specific `ICollaborationAdapter` and the MVC Collaboration Server once during application startup. Select `WebSocket`; do not configure SignalR for this MVC setup.

```csharp
namespace WebApplication1
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ServiceCollectionExtensions.RegisterAdapter(
                new SpreadsheetCollaborativeAdaptor());
            ServiceCollectionExtensions.AddCollaborationServer(options =>
            {
                options.ConnectionString = "Your Redis Connection string";
                options.ConnectionType = CollaborationConnectionType.WebSocket;
            });
        }
    }
}
```

**Placeholders**
- `"Your Redis Connection string"` → Replace with `{redisConnectionString}`

**Settings**
- `ConnectionString` — Redis connection string
- `ConnectionType` — `CollaborationConnectionType.WebSocket` (MVC supports WebSocket only)

---

### Mount the WebSocket endpoint (Startup.cs)

```csharp
namespace WebApplication1
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Map("/ws", map =>
            {
                map.Run(context =>
                {
                    var httpContext = HttpContext.Current;
                    if (httpContext == null)
                    {
                        context.Response.StatusCode = 500;
                        return Task.CompletedTask;
                    }
                    if (!httpContext.IsWebSocketRequest)
                    {
                        context.Response.StatusCode = 400;
                        return context.Response.WriteAsync(
                            "WebSocket connection required.");
                    }
                    httpContext.AcceptWebSocketRequest(
                        ServiceCollectionExtensions
                            .MapCollaborationServer());
                    return Task.CompletedTask;
                });
            });
        }
    }
}
```

### Implement the Spreadsheet collaboration adapter

The adapter translates Spreadsheet actions to the common collaboration format, transforms concurrent operations, and queues save requests. Add `Adapters/SpreadsheetCollaborativeAdaptor.cs`:

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Syncfusion.Collaboration.Core.Interfaces;
using Syncfusion.Collaboration.Core.Models;
using Syncfusion.Collaboration.Core.Services;
using Syncfusion.EJ2.Spreadsheet;
namespace WebApplication1.Adapters
{
    public class SpreadsheetCollaborativeAdaptor : ICollaborationAdapter
    {
        private static readonly JsonSerializerSettings OperationSettings =
            new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                }
            };
        public CollaborationAction MapControlToGenericAction(
            object controlAction)
        {
            var action = (ActionInfo)controlAction;
            return new CollaborationAction
            {
                RoomName = action.RoomName,
                ConnectionId = action.ConnectionId,
                CurrentUser = action.CurrentUser,
                Version = action.Version,
                ClientVersion = action.ClientVersion,
                IsTransformed = action.IsTransformed,
                Data = JsonConvert.SerializeObject(
                    action.Operations,
                    OperationSettings)
            };
        }
        public object MapGenericToControlAction(
            CollaborationAction action)
        {
            return new ActionInfo
            {
                RoomName = action.RoomName,
                ConnectionId = action.ConnectionId,
                CurrentUser = action.CurrentUser,
                Version = action.Version,
                ClientVersion = action.ClientVersion,
                IsTransformed = action.IsTransformed,
                Operations =
                    JsonConvert.DeserializeObject<List<SpreadsheetOperation>>(
                        action.Data,
                        OperationSettings)
            };
        }
        public void TransformOperations(
            List<CollaborationAction> actions)
        {
            if (actions == null || actions.Count < 2)
            {
                return;
            }
            var spreadsheetActions = actions
                .Select(action =>
                    (ActionInfo)MapGenericToControlAction(action))
                .ToList();
            if (CollaborativeEditingHandler.TransformOperations(
                    spreadsheetActions))
            {
                var transformedAction = spreadsheetActions.Last();
                actions.Last().Data = JsonConvert.SerializeObject(
                    transformedAction.Operations,
                    OperationSettings);
                actions.Last().IsTransformed =
                    transformedAction.IsTransformed;
            }
        }
        public async Task SaveOperationsAsync(
            List<CollaborationAction> actions,
            string roomName,
            bool partialSave)
        {
            if (actions == null || actions.Count == 0 ||
                string.IsNullOrWhiteSpace(roomName))
            {
                return;
            }
            var request = new SaveRequest
            {
                Actions = actions,
                PartialSave = partialSave,
                RoomName = roomName
            };
            var queue =
                CollaborationServiceContainer.Resolve<IBackgroundTaskQueue>();
            await queue.QueueBackgroundWorkItemAsync(request);
        }
        public async Task ProcessSaveRequestAsync(
            SaveRequest request,
            CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var workbookPath =
                WebApplication1.Controllers.CollaborativeEditingController
                    .GetRoomWorkbookPath(request.RoomName);
            var temporaryPath = workbookPath + "." +
                System.Guid.NewGuid().ToString("N") + ".xlsx";
            using (var engine = new ExcelEngine())
            {
                var workbook =
                    engine.Excel.Workbooks.Open(workbookPath);
                try
                {
                    var actions = request.Actions
                        .Select(action =>
                            (ActionInfo)MapGenericToControlAction(action))
                        .OrderBy(action => action.Version)
                        .ToList();
                    if (actions.Count > 1)
                    {
                        CollaborativeEditingHandler.TransformOperations(
                            actions);
                    }
                    var handler =
                        new CollaborativeEditingHandler(workbook);
                    foreach (var action in actions)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        handler.UpdateAction(action);
                    }
                    workbook.SaveAs(temporaryPath);
                }
                finally
                {
                    workbook.Close();
                }
            }
            // Replace the room workbook before clearing its saved action log.
            System.IO.File.Replace(temporaryPath, workbookPath, null);
            var actionService =
                CollaborationServiceContainer.Resolve<IActionService>();
            await actionService.ClearRecordsAsync(
                request.RoomName,
                request.PartialSave);
        }
    }
}
```

`ProcessSaveRequestAsync` applies each queued action to the room workbook, replaces the persisted file, and only then clears the processed action records. In a multi-server deployment, replace the local `App_Data` room files with shared durable storage.

### Add the collaboration API controller

The client adapter calls `ImportFile`, `UpdateAction`, and `GetActionsFromServer`. Spreadsheet presence also uses `UpdateSelection`, `GetRoomSelections`, and `RemoveUserSelection`. Implement these routes in a Web API 2 controller. Each room starts from `App_Data/Sample.xlsx`; subsequent save batches are applied to that room's workbook under `App_Data/Collaboration`.

```csharp
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Syncfusion.Collaboration.Core.Interfaces;
using Syncfusion.Collaboration.Core.Models;
using Syncfusion.Collaboration.Core.Services;
using Syncfusion.Collaboration.Core.Transports;
using Syncfusion.EJ2.Spreadsheet;
using Syncfusion.XlsIO;
namespace WebApplication1.Controllers
{
    [RoutePrefix("api/CollaborativeEditing")]
    public class CollaborativeEditingController : ApiController
    {
        private static readonly Regex ValidRoomName =
            new Regex(@"^[A-Za-z0-9_-]{1,64}$");
        private static readonly ConcurrentDictionary<string,
            ConcurrentDictionary<string, SpreadsheetSelectionInfo>>
            RoomSelections =
                new ConcurrentDictionary<string,
                    ConcurrentDictionary<string, SpreadsheetSelectionInfo>>();
        private static readonly object RoomWorkbookInitializationLock =
            new object();
        private static readonly JsonSerializerSettings JsonSettings =
            new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                }
            };
        private readonly IActionService actionService;
        private readonly ICollaborationAdapter adapter;
        private readonly IActiveTransport transport;
        public CollaborativeEditingController()
        {
            actionService =
                CollaborationServiceContainer.Resolve<IActionService>();
            adapter =
                CollaborationServiceContainer.Resolve<ICollaborationAdapter>();
            transport =
                CollaborationServiceContainer.Resolve<IActiveTransport>();
        }
        [HttpPost]
        [Route("ImportFile")]
        public async Task<HttpResponseMessage> ImportFile(
            [FromBody] ImportFileRequest request)
        {
            if (request == null || !IsValidRoom(request.roomName))
            {
                return Request.CreateErrorResponse(
                    HttpStatusCode.BadRequest,
                    "A valid roomName is required.");
            }
            try
            {
                var workbookPath =
                    GetRoomWorkbookPath(request.roomName);
                var pending = await actionService.GetPendingOperationsAsync(
                    request.roomName, 0, -1);
                var actions = pending
                    .Select(item =>
                        (ActionInfo)adapter.MapGenericToControlAction(item))
                    .OrderBy(action => action.Version)
                    .ToList();
                using (var engine = new ExcelEngine())
                {
                    var workbook =
                        engine.Excel.Workbooks.Open(workbookPath);
                    try
                    {
                        if (actions.Count > 0)
                        {
                            var handler =
                                new CollaborativeEditingHandler(workbook);
                            foreach (var action in actions)
                            {
                                handler.UpdateAction(action);
                            }
                        }
                        using (var stream = new MemoryStream())
                        {
                            workbook.SaveAs(stream);
                            var file = new HttpPostedFileAdapter(
                                stream.ToArray(),
                                "Sample.xlsx");
                            var sfdt = Workbook.Open(new OpenRequest
                            {
                                File = new HttpPostedFileBase[] { file }
                            });
                            var content = new DocumentContent
                            {
                                sfdt = sfdt,
                                version = actions.Count == 0
                                    ? 0
                                    : actions.Max(action => action.Version)
                            };
                            return Request.CreateResponse(
                                HttpStatusCode.OK, content);
                        }
                    }
                    finally
                    {
                        workbook.Close();
                    }
                }
            }
            catch (Exception exception)
            {
                Trace.TraceError(
                    "Spreadsheet import failed: {0}", exception);
                return Request.CreateErrorResponse(
                    HttpStatusCode.InternalServerError,
                    "The workbook could not be loaded.");
            }
        }
        [HttpPost]
        [Route("UpdateAction")]
        public async Task<IHttpActionResult> UpdateAction(
            [FromBody] ActionInfo request)
        {
            if (request == null || !IsValidRoom(request.RoomName))
            {
                return BadRequest("A valid roomName is required.");
            }
            var genericAction =
                adapter.MapControlToGenericAction(request);
            var updated = await actionService.AddOperationAsync(
                genericAction, adapter);
            if (updated == null)
            {
                return InternalServerError();
            }
            var spreadsheetAction =
                (ActionInfo)adapter.MapGenericToControlAction(updated);
            await transport.SendToGroupAsync(
                request.RoomName, "action", spreadsheetAction);
            return Ok(spreadsheetAction);
        }
        [HttpPost]
        [Route("GetActionsFromServer")]
        public async Task<IHttpActionResult> GetActionsFromServer(
            [FromBody] ActionInfo request)
        {
            if (request == null || !IsValidRoom(request.RoomName))
            {
                return BadRequest("A valid roomName is required.");
            }
            var pending =
                await actionService.GetEffectivePendingVersionAsync(
                    request.RoomName, request.Version);
            var actions = pending
                .Select(item =>
                    (ActionInfo)adapter.MapGenericToControlAction(item))
                .Where(action => action.Version > request.Version)
                .OrderBy(action => action.Version)
                .ToList();
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(
                JsonConvert.SerializeObject(actions, JsonSettings),
                System.Text.Encoding.UTF8,
                "application/json");
            return ResponseMessage(response);
        }
        [HttpPost]
        [Route("UpdateSelection")]
        public async Task<IHttpActionResult> UpdateSelection(
            [FromBody] SpreadsheetSelectionInfo request)
        {
            if (request == null || !IsValidRoom(request.RoomName) ||
                string.IsNullOrWhiteSpace(request.ConnectionId))
            {
                return BadRequest("Valid room and connection identifiers are required.");
            }
            var selections = RoomSelections.GetOrAdd(
                request.RoomName,
                _ => new ConcurrentDictionary<string, SpreadsheetSelectionInfo>());
            selections[request.ConnectionId] = request;
            await transport.SendToGroupAsync(
                request.RoomName, "action", request);
            return Ok(request);
        }
        [HttpGet]
        [Route("GetRoomSelections/{roomName}")]
        public IHttpActionResult GetRoomSelections(string roomName)
        {
            if (!IsValidRoom(roomName))
            {
                return BadRequest("A valid roomName is required.");
            }
            ConcurrentDictionary<string, SpreadsheetSelectionInfo> selections;
            var result = RoomSelections.TryGetValue(roomName, out selections)
                ? selections.Values.ToList()
                : new List<SpreadsheetSelectionInfo>();
            return Ok(result);
        }
        [HttpPost]
        [Route("RemoveUserSelection")]
        public IHttpActionResult RemoveUserSelection(
            [FromBody] RemoveSelectionRequest request)
        {
            if (request == null || !IsValidRoom(request.roomName) ||
                string.IsNullOrWhiteSpace(request.connectionId))
            {
                return BadRequest("Valid room and connection identifiers are required.");
            }
            ConcurrentDictionary<string, SpreadsheetSelectionInfo> selections;
            if (RoomSelections.TryGetValue(request.roomName, out selections))
            {
                SpreadsheetSelectionInfo removed;
                selections.TryRemove(request.connectionId, out removed);
            }
            return Ok();
        }
        private static bool IsValidRoom(string roomName)
        {
            return !string.IsNullOrWhiteSpace(roomName) &&
                ValidRoomName.IsMatch(roomName);
        }
        public static string GetRoomWorkbookPath(string roomName)
        {
            if (!IsValidRoom(roomName))
            {
                throw new ArgumentException(
                    "Invalid collaboration room name.", "roomName");
            }
            var appDataPath =
                HostingEnvironment.MapPath("~/App_Data");
            if (string.IsNullOrEmpty(appDataPath))
            {
                throw new InvalidOperationException(
                    "The App_Data directory could not be resolved.");
            }
            var sourcePath =
                Path.Combine(appDataPath, "Sample.xlsx");
            if (!File.Exists(sourcePath))
            {
                throw new FileNotFoundException(
                    "The source workbook was not found.", sourcePath);
            }
            var roomDirectory =
                Path.Combine(appDataPath, "Collaboration");
            Directory.CreateDirectory(roomDirectory);
            var roomPath =
                Path.Combine(roomDirectory, roomName + ".xlsx");
            lock (RoomWorkbookInitializationLock)
            {
                if (!File.Exists(roomPath))
                {
                    File.Copy(sourcePath, roomPath);
                }
            }
            return roomPath;
        }
        public class ImportFileRequest
        {
            public string fileName { get; set; }
            public string roomName { get; set; }
        }
        public class DocumentContent
        {
            public int version { get; set; }
            public string sfdt { get; set; }
        }
        public class RemoveSelectionRequest
        {
            public string roomName { get; set; }
            public string connectionId { get; set; }
        }
    }
    public class HttpPostedFileAdapter : System.Web.HttpPostedFileBase
    {
        private readonly byte[] fileBytes;
        public HttpPostedFileAdapter(byte[] fileBytes, string fileName)
        {
            this.fileBytes = fileBytes;
            FileName = fileName;
        }
        public override int ContentLength
        {
            get { return fileBytes.Length; }
        }
        public override string FileName { get; }
        public override Stream InputStream
        {
            get { return new MemoryStream(fileBytes); }
        }
    }
}
```

Register the API controllers with Web API 2 attribute routing as shown in `WebApiConfig.Register`. This uses the MVC `HttpPostedFileBase[]` shape required by `OpenRequest.File`. Keep the uploader's request content type and the workbook download response aligned with the Spreadsheet SDK version in use.

For general Collaboration Server concepts and public interfaces, see the [Collaboration Server documentation](https://help.syncfusion.com/document-processing/collaborator/collaboration-server).

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

## Notes

- Install `@syncfusion/ej2-collaborator` on the client and configure its `connectionType` as `websocket` to match the MVC server.
- All participants must use the same server URL and room ID.
- Redis stores collaboration action and version state; persist workbook changes separately before clearing processed actions.
- The sample in-memory selection dictionary is process-local; use a shared store if presence must span multiple web servers.
- Users joining an existing room load its current workbook state and recover missed actions from the server.