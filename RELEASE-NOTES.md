# 3.0.1 — Handling & Reverse Update

## Requested corrections
1. Two-bar PAUSE icon with a text label.
2. Fixed mismatched physical/render steering signs; aligned driver input direction and wheel load indexing.
3. Tap ERS to toggle, rather than hold. All input methods share a latch, cleared on pause/reset. ON arms your selected strategy; Off/Harvest remain non-deploying.
4. Compact speed/gear/pedal panel under the right-hand minimap.
5. All-road scenery clearance, including entire structure footprints and close parallel circuit arms.
6. Open three-point halo attached to the chassis, updated source and GLB.
7. Automatic reverse: stop, release brake briefly, press brake again. Gas brakes reverse travel before selecting forward at rest. R appears in the HUD. Reverse uses the tyre integrator with a low-speed drive ceiling; no boost or active aero.

Theme, livery colours and existing save format retained. Existing saved touch layouts are not overwritten; re-edit/reset if an old ERS button sits over the moved instruments.

See docs/QA.md for passing automated checks and unverified hardware gates. The five map-derived circuits are not surveyed reproductions. Full master-spec completion, career, full suspension/damage, hardware certification and real GitHub deployment remain outside this patch; see docs/REQUIREMENTS.md.
