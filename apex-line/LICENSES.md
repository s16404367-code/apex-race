# Third-party licenses and asset provenance

Accessed 2026-09-29.

## Three.js and GLTFExporter
- Authors: Three.js contributors
- Source: https://github.com/mrdoob/three/tree/r170
- Delivery source: https://cdn.jsdelivr.net/npm/three@0.170.0/
- License: MIT, exact text in `vendor/THREE-LICENSE.txt`
- Commercial use / modification / redistribution: allowed subject to MIT notice retention
- Local: `vendor/three.module.js`, `vendor/GLTFExporter.js`
- Exporter's package import changed to a relative local module import.

## Geographic circuit outlines
- Author: Tomislav Bacinger
- Source: https://github.com/bacinger/f1-circuits
- Source GeoJSON: https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-circuits.geojson
- Revision retrieved: `394d8fbe70ef2c0b0c8d23ff7bee61fa09606055`
- License: MIT as published upstream. Exact notice in `data/tracks/LICENSE.md`.
- Commercial use / modification / redistribution: allowed under the published MIT terms; retain copyright and license.
- Selected IDs: it-1922, it-1953, bh-2002, sa-2021, gb-1948.
- Local derivatives: `data/tracks/*.json`, `data/tracks.js`
- Transform: local metre projection from longitude/latitude, north mapped to negative Z, closed endpoint deduplication. Runtime centripetal spline smoothing. No forced rescale to advertised length.
- Added original game data: public fictional names, scenery themes, simplified widths and auto-selected straight activation zones.
- Rebuild: `python3 tools/import-tracks.py PATH_TO_DOWNLOADED_GEOJSON`.
- Limitations: map outline data is not surveyed track engineering data. Repository license is the published basis for reuse; no independent chain-of-title certification. No circuit trademarks, official signage or proprietary 3D meshes are included.

## Original content
AL-02 procedural car/model export, fictional liveries, original fictional trackside geometry, UI and synthesized audio created for this project. No external fonts, photographs, music, voice samples or ripped commercial game assets. Source and GLB are included for the user's project use/modification; this document does not relicense third-party files.

The user-supplied specifications in `docs/specifications` are project reference documents, not third-party game assets.
