# Release notes and requirements audit

## Delivery status

Playable standalone foundation, release 2.1.2. The supplied file explicitly extends a v2.0 master specification, but that specification and source were not supplied. This release does not certify completion of v2.0 or every v2.1 requirement. Implementation was performed directly in the available workspace, not through Claude Code.

## Sequential development passes

### 2.1.0 — Foundation
- Motorsport menu, garage, session briefing, grid countdown, race HUD, results and records.
- Two procedural 3D circuits and original AL-01 model.
- Shared simplified physics model, basic AI rivals and four session formats.
- Static local assets with relative URLs for GitHub Pages.

### 2.1.1 — Cross-device layer
- Keyboard state polling, repeat protection, additive remapping, conflict replace/cancel/duplicate.
- Standard gamepad input, steering axis and pedal-button assignment, deadzone and inversion.
- Multi-pointer touch pedals and steering; buttons / drag wheel / slider.
- Normalized draggable/resizable layouts with per-orientation local profiles, opacity, grid snap, visibility, save/cancel/reset, JSON validation.
- Sensor-permission flow, actual-event motion verification, neutral calibration, sensitivity, deadzone, inversion and stale-signal fallback.
- Fullscreen handling, safe-area controls, resize-safe camera, paused editing and background focus safety.

### 2.1.2 — QA and corrective pass
- Fixed road triangle face visibility.
- Batched static scenery by material to reduce draw calls.
- Corrected curvature sign in road-relative lateral force.
- Corrected start-sign facing.
- Fixed mobile header overflow.
- Added test scripts, local dependency license, GitHub Pages deployment workflow and documentation.

## Verified in this environment

Automated Chromium using software WebGL, 800×600 and 390×844 viewports:
- Loaded without runtime page errors.
- Grid countdown transitions to race.
- Keyboard throttle accelerates the vehicle.
- Escape pauses and clears normalized input.
- Key conflict screen appears when assigning W to brake.
- Touch size change persists in active saved layout.
- Window blur pauses simulation.
- Mobile menu fits viewport without horizontal overflow.

Node tests passed:
- Identical normalized input streams produce identical vehicle states.
- Braking reduces speed.
- Start-line crossing increments lap.
- Barrier excursion produces damage and invalidates lap.
- Valid layout accepted; invalid range and null layout rejected.

Screenshots were inspected for desktop menu and race. High-resolution software rendering was slow; no real-device frame-rate claim is made.

## Implemented but not physically verified

Real gamepad axes/triggers and disconnects; simultaneous physical multitouch; actual motion permissions and sensor calibration; stale-sensor recovery on hardware; browser fullscreen and orientation lock across platforms; iOS Safari; Android Chrome/Firefox; notched-device safe areas; ultrawide screens. The code includes fallbacks, but these need device acceptance testing.

## Partial or deferred requirements

- Physics is road-relative arcade/simcade: no full free-body yaw dynamics, suspension, tyre temperature/pressure, slip curves, realistic downforce map or full collision solver. Fuel, tyre, wet grip and damage are scalar approximations.
- AI follows the spline with pace adjustments, not a tactical racing planner; no qualifying, championship progression or multiplayer.
- A single car chassis, no v2.0 car inventory.
- Pit service is a stopped-car action with a lap-time penalty, not a pit lane animation or strategic system. Race clock and rival progression do not include the 12-second service penalty; do not use this prototype for competitive timing.
- Responsive HUD is implemented, but draggable/resizable independently saved HUD widgets and all six requested HUD profiles are deferred.
- Touch wheel and slider share horizontal drag steering; visual rotary wheel, rotation controls, separate icon sizing, edge snap, independent edit opacity, gesture configuration, hold/toggle behaviors and six button skin presets are not implemented.
- Profile slots are independently saved; some named presets start from the same defaults. Left-hand, Two-thumb and Sim have limited preset modifications.
- Keyboard presets are default arrows+WASD and IJKL; not the full named preset suite. Individual binding removal is not yet exposed.
- Gamepad editor is limited to steering axis, throttle/brake button IDs, deadzone and inversion. Arbitrary action reassignment, wheel min/center/max wizard, axis pedals/combined pedals, response curves, saturation and vibration are deferred.
- Tilt has linear response with deadzone and common steering smoothing. Full curve presets, stored neutral calibration and speed-sensitive input assist are deferred.
- Controller connection uses a notification rather than a yes/no selection prompt. Device capability reporting distinguishes observed motion/controller data but not every possible keyboard capability nuance.
- No replay recorder, photo capture workflow, downloadable telemetry or mouse camera controls.
- No adaptive thermal detection or distant AI LOD; performance mode reduces pixel ratio and disables shadows.
- Accessibility includes readable text labels, high-contrast menus, larger settings text, no camera shake/flashing, but not a full accessibility audit or screen-reader-accessible driving experience.
- Detailed raw/filtered input-stage visualization is limited to normalized inputs and current physics controls, not a complete pipeline debugger.

## Recommended next releases

1. Hardware QA for Android/iOS/controller, fix device-specific findings, then add full gamepad calibration and HUD editor.
2. Integrate the original v2.0 source/requirements if provided; replace the simplified dynamics rather than claiming simulation fidelity prematurely.
3. Expand vehicle physics, AI racecraft, realistic pit timing and telemetry with regression tests.
4. Complete accessibility, browser performance benchmarks and cross-browser acceptance matrix before declaring a production-complete simulator.
