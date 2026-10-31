# Official Microsoft Guidance Reference

Primary source:
- https://learn.microsoft.com/en-us/dotnet/maui/migration/multi-project-to-single-project?view=net-maui-10.0

Guidance captured in this skill:
1. Upgrade existing Xamarin.Forms app to latest 5.x before migration.
2. Create a new .NET MAUI single project (default, authoritative strategy).
3. Copy shared code and platform-specific code into MAUI project structure.
4. Migrate namespaces and incompatible APIs.
5. Migrate resources to MAUI Resources model.
6. Validate build and runtime behavior on target platforms.

Important caveat:
- In-place upgrade is not the default path due to architecture and build-system differences between Xamarin.Forms multi-project and MAUI single-project.
