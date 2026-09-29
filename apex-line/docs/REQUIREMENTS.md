# Master specification implementation audit

The supplied v2.0 and v2.1 briefs are in specifications/. Release 3.0.2 is a development increment. A version label does not mean every milestone from 0.1 through 1.0 or every v2.1 section is finished.

| Requested milestone | Status in this release |
|---|---|
| 0.1 First drive | Implemented: 3D car/track, controls, independent dynamics, walls, timing, pause/reset, low preset and static deployment. Five pure-physics automated laps pass. |
| 0.2 Core sim feel | Partial: engine/gearbox, front steering, load transfer, combined tyre force, aero, surfaces, four cameras. No full 3D rigid body/suspension, swept wheel contacts or validated tyre data. |
| 0.3 Energy/aero | Core implemented: finite ERS, harvest/deploy modes, game zones, flap animations, HUD and RPM sound. No detection-gap rules, full race director, debug-force rendering. |
| 0.4 Engineering | Partial: five compounds, wheel heat/wear/load, pressure/fuel/bias/ride/aero setup, sectors, telemetry CSV, timed service. No actual pit lane, limiter or full suspension setup. |
| 0.5 Damage | Partial: impact-based front wing/suspension/floor, coupled grip/steering/aero effects and front-wing visibility. No full subsystem impact classification, cooling damage, retirement or repair strategy. |
| 0.6 AI | Partial: five path-following opponents, corner lookahead, basic lane change/pass, grid/positions. AI does not use identical player dynamics; no robust defend/avoidance planner or AI LOD. |
| 0.7 Weather | Partial: selectable dry/wet grip, compound response, temperatures and lighting. No dynamic precipitation, spray, drying line, rubber, time-of-day/night system. |
| 0.8 Garage career | Livery and meaningful setup implemented. Upgrade tree, unlock economy, multiple cars and career development NOT implemented. |
| 0.9 Championship | Records and validated export/import implemented. Championship/weekends, ghosts and replay buffers NOT implemented. |
| 1.0 Polish | UI retained and controls tested, original model/audio, docs, local Pages subpath test. No hardware certification, real deployment, full accessibility/performance/30-minute acceptance. |

## v2.1 cross-device brief

Implemented: keyboard state polling, remapping with conflicts and multiple keys; standard gamepad steering/trigger buttons with axis selection/inversion/deadzone; multi-pointer touch buttons, drag wheel/slider; draggable size/opacity/optional visibility; normalized layouts, portrait/landscape profiles, save/cancel/reset/import/export; tilt permissions, live-event verification, calibration, deadzone/sensitivity/inversion and stale fallback; responsive camera/HUD, fullscreen handling, safe areas, reduced HUD/cinematic mode, background pause/input clear, control test meters, high contrast and larger settings text.

Still partial/deferred:
- Full menu/gamepad navigation and first-run setup wizard.
- Arbitrary gamepad action remapping, combined pedal axes, saturation/curves, min-center-max wheel calibration, haptics.
- Independent per-widget HUD dragging/resizing/visibility/profile saves.
- Rotary touch wheel art, per-button icon sizing/rotation/behaviour, edge snapping, six skins, optional gestures, separate edit opacity.
- Some named touch profile presets initialize alike; only limited preset differences exist.
- Complete keyboard preset suite and individual binding deletion UI.
- Tilt progressive/aggressive curves, stored neutral and device-specific landscape sign validation.
- Every input stage raw/normalized/filtered diagnostic graph and control priority arbitration.
- Real-device signal/focus/fullscreen/orientation tests and comprehensive accessibility.

## Circuit accuracy/legal reconciliation

The latest user asks for accurate real tracks; the master requires original public names and clean assets. We use MIT-published geographic outlines for all five requests with original public names. The geometry is not invented but is not a surveyed recreation. Start/direction inherit source order; source nominal lengths are displayed as nominal. Widths are fixed, terrain flat, structures original, zones game-defined. Official regulation/year validation and elevation remain unfulfilled. MIT notices and source revision included; no ripped assets used.

## Next release priorities
1. Human driving calibration, HD 4400 / real phone/controller acceptance and regression fixes.
2. Survey/reusable elevation and width data; robust collision/projection near close parallel track sections; real pit lanes and rules.
3. Four-corner sprung dynamics and wheel inertia, full damage lifecycle, pit limiter; calibrate against consistent test targets.
4. Complete HUD editor and gamepad calibration, then replay/ghosts.
5. Career/championship only after driving and device acceptance stabilize.

3.0.2 adds optional predictive corner braking, in-race transmission switching, timing-gate leaderboard gaps, aero toggle and coupled rear regen. These additions do not close the deferred full-simulator or hardware gates above.
