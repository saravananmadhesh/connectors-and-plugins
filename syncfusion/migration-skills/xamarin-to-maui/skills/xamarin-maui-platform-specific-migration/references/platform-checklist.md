# Platform Migration Checklist

Use this checklist to verify platform parity when migrating Xamarin.Forms code into .NET MAUI.

## Android

Configuration:
- Manifest permissions migrated and reviewed.
- Intent filters migrated for deep links and app links.
- Exported flags reviewed for activities, services, and receivers.
- Package visibility declarations migrated where required.
- Feature declarations preserved (camera, location, bluetooth, etc.).

Runtime behavior:
- Runtime permission prompts validated in-app.
- Deep link entry and routing validated.
- Notification open and background handling validated.
- Foreground/background lifecycle callbacks validated.

Native integrations:
- SDK initialization moved to MAUI startup/lifecycle locations.
- Initialization order validated for dependent SDKs.

## iOS

Configuration:
- Info.plist keys migrated and reviewed.
- URL schemes and universal links migrated.
- Associated domains and entitlements preserved.
- ATS exceptions preserved only where required.
- Background modes preserved where feature dependent.

Runtime behavior:
- App launch and resume paths validated.
- Deep link and universal link handlers validated.
- Push notification callbacks validated.
- Permission prompts and denial flows validated.

Native integrations:
- AppDelegate lifecycle mappings validated.
- SDK initialization and callback wiring validated.

## Windows (MAUI)

Configuration:
- UWP declarations mapped to MAUI Windows equivalents.
- Package/identity assumptions reviewed.
- Unsupported features captured as manual actions.

Runtime behavior:
- Application launch validated.
- File/URI activation flows validated where used.
- Notification and protocol activation validated where implemented.

## Cross-platform parity

- No required capability was silently removed.
- Every unsupported feature has either replacement guidance or waiver approval.
- Manual action backlog includes owner, severity, and rationale.
- Final report includes evidence links for completed checks.
