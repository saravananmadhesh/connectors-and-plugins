# Changelog

All notable changes to this plugin will be documented here.

## 0.7.2 - 2026-11-10

- Added the 10 agent skills published in `stripe/ai` (commit `d8e14797`), copied unchanged.
- README: added what the tools can do, write access, Human confirmation, sign-in options, the November 30, 2026 API key deadline, admin controls, rate limits and preview features.
- Recorded a live check of the hosted endpoint on 2026-11-10.

## 0.7.1 - 2026-10-31

- Sign-in is now OAuth: each member signs in to their own account. The `STRIPE_AGENT_KEY` setting is removed.

## 0.7.0 - 2026-10-29

- Updated plugin version for marketplace release.

## 0.2.0 - 2026-10-26

- Moved to `third_party/stripe/` to match the cursor/plugins layout.
- Added `assets/logo.svg` and set `logo` in the manifest.
- Added `LICENSE` (MIT), `license` and `minClientVersions` in the manifest.
- Rewrote the README in the Cursor plugin style (Install, MCP, Setup, Docs).

## 0.1.0 - 2026-10-24

- First version: Stripe remote MCP server over streamable HTTP.
