# Migration Rule Catalog

## Namespace Rules
- Xamarin.Forms -> Microsoft.Maui.Controls
- Xamarin.Essentials -> Microsoft.Maui
- Xamarin.Forms XAML schema -> MAUI XAML schema

## API Modernization Rules
- DependencyService -> DI via MauiProgram + constructor injection
- MessagingCenter -> modern messaging/event aggregator patterns
- Application.Current.Properties -> Preferences or secure storage abstraction

## Resource Rules
- Images -> Resources/Images (MauiImage)
- Fonts -> Resources/Fonts (MauiFont)
- Raw data -> Resources/Raw (MauiAsset)

## Renderer Strategy
- Detect renderer patterns and generate handler templates.
- Always flag renderer conversions as manual-review items.

## Dependency Rules
- Classify dependencies as Compatible, NeedsUpgrade, Unsupported.
- Provide replacement candidates where known.

## Platform Rules
- Android manifest migration: preserve and re-map permissions, intent filters, exported components, and package visibility requirements.
- iOS configuration migration: preserve required Info.plist keys, URL schemes, ATS exceptions, and entitlements.
- Windows migration: map UWP-specific behaviors to MAUI Windows equivalents and flag unsupported features explicitly.
- Startup and lifecycle migration: re-home native startup logic and lifecycle hooks into MAUI lifecycle events.
- Capability parity: verify platform capabilities after migration and emit unresolved items as manual action tasks.

## Platform Validation Rules
- Validate application launch on Android, iOS, and Windows targets configured for the project.
- Validate permission request flows used by migrated features.
- Validate deep-link and notification entry points where implemented in source.
- Validate native SDK initialization order for analytics, push, auth, maps, or similar integrations.
