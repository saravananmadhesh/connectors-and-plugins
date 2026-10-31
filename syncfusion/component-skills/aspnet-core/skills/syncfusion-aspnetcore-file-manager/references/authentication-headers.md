# Authentication and Custom Headers

## Table of Contents
- [Authentication Overview](#authentication-overview)
- [Bearer Token Authentication](#bearer-token-authentication)
- [Custom Headers Setup](#custom-headers-setup)
- [Authentication Events](#authentication-events)
- [Secure Download Implementation](#secure-download-implementation)
- [Secure Image Loading](#secure-image-loading)
- [Practical Examples](#practical-examples)

## Authentication Overview

Secure File Manager integration requires proper authentication mechanisms:

**Authentication Methods:**
1. **Bearer Token** - JWT or OAuth tokens
2. **Custom Headers** - Application-specific auth
3. **Cookie-Based** - Session cookies
4. **OAuth 2.0** - Third-party authentication

## Bearer Token Authentication

### Basic Bearer Token Setup

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSend">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function getAuthToken() {
    return localStorage.getItem('authToken');
}

function onBeforeSend(args) {
    const token = getAuthToken();
    
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            // Add authorization header to all requests
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        };
    }
}
</script>
```

### Token Refresh Strategy

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithRefresh">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
class AuthenticationManager {
    constructor() {
        this.token = localStorage.getItem('authToken');
        this.refreshToken = localStorage.getItem('refreshToken');
    }
    
    async ensureValidToken() {
        // Check if token is expired
        if (this.isTokenExpired()) {
            await this.refreshAccessToken();
        }
        return this.token;
    }
    
    isTokenExpired() {
        if (!this.token) return true;
        try {
            const payload = JSON.parse(atob(this.token.split('.')[1]));
            return Date.now() >= payload.exp * 1000;
        } catch {
            return true;
        }
    }
    
    async refreshAccessToken() {
        try {
            const response = await fetch('/Auth/Refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: this.refreshToken })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.token = data.accessToken;
                localStorage.setItem('authToken', data.accessToken);
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
        }
    }
}

const authManager = new AuthenticationManager();

async function onBeforeSendWithRefresh(args) {
    const token = await authManager.ensureValidToken();
    
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        };
    }
}
</script>
```

**Controller Code (AuthController.cs)**:
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    
    [HttpPost("Refresh")]
    public IActionResult Refresh([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = _tokenService.RefreshAccessToken(request.RefreshToken);
            if (!result.Success)
            {
                return Unauthorized("Invalid refresh token");
            }
            
            return Ok(new { accessToken = result.AccessToken });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class RefreshTokenRequest
{
    public string RefreshToken { get; set; }
}
```

## Custom Headers Setup

### Add Custom Headers to All Requests

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithCustomHeaders">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function generateRequestId() {
    return 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function onBeforeSendWithCustomHeaders(args) {
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            // Authorization
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            
            // Custom headers
            xhr.setRequestHeader('X-API-Key', 'your-api-key');
            xhr.setRequestHeader('X-Request-ID', generateRequestId());
            xhr.setRequestHeader('X-Client-Version', '1.0.0');
            
            // Timestamp
            xhr.setRequestHeader('X-Timestamp', Date.now().toString());
            
            // Device info
            xhr.setRequestHeader('X-User-Agent', navigator.userAgent);
        };
    }
}
</script>
```

### Request Type-Specific Headers

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithActionHeaders">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeSendWithActionHeaders(args) {
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            const token = getAuthToken();
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            
            // Different headers for different actions
            switch(args.action) {
                case 'read':
                    xhr.setRequestHeader('X-Action', 'list');
                    break;
                case 'create':
                    xhr.setRequestHeader('X-Action', 'create');
                    break;
                case 'delete':
                    xhr.setRequestHeader('X-Action', 'delete');
                    xhr.setRequestHeader('X-Confirm-Action', 'true');
                    break;
                case 'upload':
                    xhr.setRequestHeader('X-Action', 'upload');
                    if (args.chunkIndex !== undefined) {
                        xhr.setRequestHeader('X-Chunk-Index', args.chunkIndex.toString());
                    }
                    break;
            }
        };
    }
}
</script>
```

## Authentication Events

### Before Send Event with Auth

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithValidation">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function isUserAuthenticated() {
    const token = localStorage.getItem('authToken');
    return token && token.length > 0;
}

function redirectToLogin() {
    window.location.href = '/Account/Login';
}

function onBeforeSendWithValidation(args) {
    console.log('Request action:', args.action);
    
    // Validate authentication before request
    if (!isUserAuthenticated()) {
        args.cancel = true;
        redirectToLogin();
        return;
    }
    
    // Add authentication headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
        };
    }
}
</script>
```

### Handle Authentication Errors

```html
<ejs-filemanager id="filemanager"
    failure="onRequestFailure">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onRequestFailure(args) {
    console.log('Request failed:', args.error);
    
    // Handle 401 Unauthorized
    if (args.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        window.location.href = '/Account/Login';
    }
    
    // Handle 403 Forbidden
    if (args.status === 403) {
        showError('Access denied');
    }
    
    // Handle other errors
    if (args.status >= 500) {
        showError('Server error');
    }
}

function showError(message) {
    alert(message);
}
</script>
```

## Secure Download Implementation

### Download with Authentication

```html
<ejs-filemanager id="filemanager"
    beforeDownload="onBeforeDownloadWithAuth">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        downloadUrl="/FileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeDownloadWithAuth(args) {
    console.log('Downloading:', args.fileDetails.map(f => f.name).join(', '));
    
    // Use fetch API instead of form POST
    args.useFormPost = false;
    
    // Add authentication headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            // For downloads, use XHR
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            
            // Additional headers
            xhr.setRequestHeader('X-Download-Type', 'secure');
            xhr.setRequestHeader('X-Request-Time', Date.now().toString());
        };
    }
}
</script>
```

### Download Progress with Auth

```html
<div id="progressBar" style="width: 0%; height: 20px; background: #4CAF50;"></div>

<ejs-filemanager id="filemanager"
    beforeDownload="onBeforeSecureDownload">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        downloadUrl="/FileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeSecureDownload(args) {
    args.useFormPost = false;
    
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    updateProgressBar(percentComplete);
                }
            });
        };
    }
}

function updateProgressBar(percentComplete) {
    console.log('Download progress: ' + percentComplete.toFixed(0) + '%');
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = percentComplete + '%';
    }
}
</script>
```

## Secure Image Loading

### Load Images with Authentication

```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    beforeImageLoad="onBeforeImageLoad">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeImageLoad(args) {
    console.log('Loading image for:', args.fileDetails.name);
    
    // Use fetch API instead of URL-based loading
    args.useImageAsUrl = false;
    
    // Add authentication headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            // For images, use XHR with headers
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            
            // Cache headers
            xhr.setRequestHeader('Cache-Control', 'max-age=3600');
            xhr.setRequestHeader('Accept', 'image/*');
        };
    }
}
</script>
```

### Image Cache with Auth

```html
<script>
class SecureImageCache {
    constructor() {
        this.cache = new Map();
    }
    
    async getImage(fileName, token) {
        // Check cache first
        if (this.cache.has(fileName)) {
            return this.cache.get(fileName);
        }
        
        try {
            // Fetch with authentication
            const response = await fetch('/FileManager/GetImage?file=' + encodeURIComponent(fileName), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Cache-Control': 'max-age=3600'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to load image: ' + response.statusText);
            }
            
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            // Cache the result
            this.cache.set(fileName, url);
            
            // Auto-cleanup after 1 hour
            setTimeout(() => {
                this.cache.delete(fileName);
                URL.revokeObjectURL(url);
            }, 3600000);
            
            return url;
        } catch (error) {
            console.error('Image fetch failed:', error);
            return null;
        }
    }
    
    clearCache() {
        this.cache.forEach((url) => {
            URL.revokeObjectURL(url);
        });
        this.cache.clear();
    }
}

const imageCache = new SecureImageCache();
</script>
```

## Practical Examples

### Example 1: JWT Token Management

**JavaScript Class (in Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithJWT">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
class JWTAuthManager {
    constructor() {
        this.token = this.loadToken();
    }
    
    loadToken() {
        return localStorage.getItem('jwtToken');
    }
    
    setToken(token) {
        localStorage.setItem('jwtToken', token);
        this.token = token;
    }
    
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + this.token
        };
    }
    
    isTokenValid() {
        if (!this.token) return false;
        
        try {
            const parts = this.token.split('.');
            if (parts.length !== 3) return false;
            
            const payload = JSON.parse(atob(parts[1]));
            return Date.now() < payload.exp * 1000;
        } catch {
            return false;
        }
    }
    
    async refreshToken() {
        try {
            const response = await fetch('/Auth/RefreshToken', {
                method: 'POST',
                headers: this.getAuthHeader()
            });
            
            if (response.ok) {
                const data = await response.json();
                this.setToken(data.token);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    }
}

const jwtAuth = new JWTAuthManager();

function onBeforeSendWithJWT(args) {
    if (!jwtAuth.isTokenValid()) {
        jwtAuth.refreshToken();
    }
    
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            Object.entries(jwtAuth.getAuthHeader()).forEach(function(item) {
                xhr.setRequestHeader(item[0], item[1]);
            });
        };
    }
}
</script>
```

**Controller Support (AuthController.cs)**:
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IJwtTokenService _jwtService;
    
    [HttpPost("RefreshToken")]
    [Authorize]
    public IActionResult RefreshToken()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var newToken = _jwtService.GenerateToken(userId);
            
            return Ok(new { token = newToken });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
```

### Example 2: Multi-Factor Authentication Headers

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithMFA">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function getMFAHeaders() {
    return {
        'X-MFA-Token': localStorage.getItem('mfaToken'),
        'X-MFA-Session-ID': sessionStorage.getItem('mfaSessionId'),
        'X-MFA-Device-ID': getDeviceId()
    };
}

function onBeforeSendWithMFA(args) {
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            
            // Add MFA headers
            var mfaHeaders = getMFAHeaders();
            Object.entries(mfaHeaders).forEach(function(item) {
                if (item[1]) {
                    xhr.setRequestHeader(item[0], item[1]);
                }
            });
        };
    }
}
</script>
```

### Example 3: API Key Authentication

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSendWithAPIKey">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
// Note: API Secret should never be exposed in client-side code
// This example shows the client requesting a signature from the server
const apiKeyAuth = {
    apiKey: document.querySelector('meta[name="api-key"]')?.content || 'your-api-key',
    
    async generateSignature(timestamp) {
        try {
            // Request signature from server (server signs with secret)
            const response = await fetch('/Auth/GenerateSignature?timestamp=' + timestamp, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.signature;
            }
        } catch (error) {
            console.error('Signature generation failed:', error);
        }
        return null;
    }
};

async function onBeforeSendWithAPIKey(args) {
    const timestamp = Date.now().toString();
    const signature = await apiKeyAuth.generateSignature(timestamp);
    
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('X-API-Key', apiKeyAuth.apiKey);
            xhr.setRequestHeader('X-Timestamp', timestamp);
            if (signature) {
                xhr.setRequestHeader('X-Signature', signature);
            }
        };
    }
}
</script>
```

**Controller Code (AuthController.cs)**:
```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly string _apiSecret = Environment.GetEnvironmentVariable("API_SECRET");
    
    [HttpPost("GenerateSignature")]
    public IActionResult GenerateSignature([FromQuery] string timestamp)
    {
        try
        {
            if (string.IsNullOrEmpty(timestamp))
            {
                return BadRequest("Timestamp required");
            }
            
            // Generate HMAC signature on server
            using (var hmac = new System.Security.Cryptography.HMACSHA256(
                System.Text.Encoding.UTF8.GetBytes(_apiSecret)))
            {
                var message = timestamp;
                var signature = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(message));
                var signatureHex = BitConverter.ToString(signature).Replace("-", "").ToLower();
                
                return Ok(new { signature = signatureHex });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
```

---

**Related Topics:**
- Server integration: See `server-integration.md`
- Security best practices: See `security-basics.md`
- Getting started with authentication: See `getting-started.md`
