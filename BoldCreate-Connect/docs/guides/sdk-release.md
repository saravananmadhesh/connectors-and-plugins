# Releasing the host SDKs

Two packages, one version, one changelog (`packages/sdk/CHANGELOG.md`):

| Package                          | Folder                | Registry            |
| -------------------------------- | --------------------- | ------------------- |
| `@syncfusion/boldcreate-connect` | `packages/sdk`        | private npm first   |
| `Syncfusion.BoldCreate.Connect`  | `packages/sdk-dotnet` | private NuGet first |

## Before a release

1. `pnpm test` passes. The `unit` step runs the TypeScript SDK tests; the `dotnet` step runs the .NET tests and a coverage gate (lines 90%, branches 80%). The `dotnet` step needs the .NET 8 SDK or newer. The library also targets `net10.0` when the .NET 10 SDK builds it (the project adds the target on its own); for a release build with the .NET 10 SDK so both targets are in the package. To get one without touching the system: `powershell -File dotnet-install.ps1 -Channel 10.0 -InstallDir .cache/tools/dotnet10 -NoPath`, then run `.cache/tools/dotnet10/dotnet pack ...`.
2. The API did not change under the SDKs: `pnpm build` rewrites `docs/openapi/v1.json`; a diff there means both SDKs need a change.
3. Set the same version in `packages/sdk/package.json` and `packages/sdk-dotnet/Syncfusion.BoldCreate.Connect/Syncfusion.BoldCreate.Connect.csproj`, and add the entry to `CHANGELOG.md` (copy it to `packages/sdk-dotnet/CHANGELOG.md`).
4. The public surface changed on purpose: `exports.test.ts` (TypeScript) and `The_public_surface_is_what_the_package_documents` (.NET) name every public type, so a new or removed one is a visible edit in the pull request.

## TypeScript

```sh
pnpm --filter @syncfusion/boldcreate-connect build
pnpm --filter @syncfusion/boldcreate-connect publish --provenance --access public   # or --registry <private>
```

`--provenance` needs a CI identity (GitHub Actions, GitLab or similar); publish from the pipeline, not a laptop, for a release.

## .NET

```sh
dotnet pack packages/sdk-dotnet/Syncfusion.BoldCreate.Connect -c Release -o artifacts
dotnet nuget sign artifacts/*.nupkg --certificate-path <cert.pfx> --certificate-password <password> --timestamper <url>
dotnet nuget push artifacts/*.nupkg --source <private feed> --api-key <key>
dotnet nuget push artifacts/*.snupkg --source <private feed> --api-key <key>
```

Make the SBOM for each release (for example `dotnet CycloneDX` for NuGet and `pnpm sbom` or `cyclonedx-npm` for npm) and attach it to the release.

## After

Tag `sdk-v<version>`. A bug fix ships in both SDKs, or the changelog says which one. Sessions and the lock file format are shared, so a change to either needs both SDKs and a new minor version.
