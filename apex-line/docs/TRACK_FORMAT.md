# Track data
`data/tracks/*.json` and generated `data/tracks.js`.

Fields: code, original public name, reference location, source nominal length (m), sourceId, source URL, corners (descriptive count), theme, shape `[x,z]` in projected metres, accuracy note, aeroZones.

Shape is closed at runtime with a centripetal Catmull-Rom curve. Render/timing length is measured from the interpolated curve, so may differ from nominal published length. Source coordinates are not stretched. Start line uses the source first coordinate. Direction follows source order; no independent timing-line survey.

Aero zones use normalized fractions `{start,end,detection}`. Detection is stored for extension but NOT enforced yet. Markers and map highlights use start/end. Zones are game-defined long-straight spans; detailed braking-zone, gap and session rule overrides remain future work.

Road width currently 18 m, kerbs and runoff procedural, flat elevation. Do not mistake boundary/scenery generation for surveyed geometry. Five themes use original generic trees/buildings and ground colours.

Rebuild selected files: `python3 tools/import-tracks.py source.geojson`. Exact license at `data/tracks/LICENSE.md`.
