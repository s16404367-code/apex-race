# QA results — 3.0.3

## Automated, passed in this workspace
- Identical inputs produce identical physics state.
- Standstill acceleration to plausible bounded speed, no lateral drift.
- Symmetric left/right front-steer yaw and trajectories.
- ERS gives >1 m/s advantage in comparative deployment test (observed ~6.03 m/s), depletes battery; empty battery gives no boost.
- Aero outside zone rejected, inside zone opens; braking closes.
- v² downforce scaling; open flap lowers drag and rear load.
- Combined tyre force bounded by available friction.
- Braking stable; wet slick braking slower than dry.
- Fuel mass reduces acceleration; out-of-fuel engine cuts.
- Real-time service duration, thermal-state integration, layout validation.
- Conservative automated driver completes all five outlines. Max centerline offsets: Monza 7.51 m, Imola 1.65 m, Bahrain 2.00 m, Jeddah 0.58 m, Silverstone 1.45 m. Nominal road half-width 9 m. This test does not certify human handling or AI racecraft.
- Chromium: countdown, acceleration, pause, input clearing, keyboard conflict, touch resize/save, blur pause, 390×844 no horizontal menu overflow.
- All five 3D circuits load without page errors.
- Browser rig's rear AND front flaps visibly change physical rotation values in-zone; ERS power active; brake closure.
- Original car GLB successfully generated.
- `/project/index.html` relative-path boot via local request routing, no failed requests.

## Correction regressions
- Reverse: held brake cannot switch from forward through a stop; release/repress selects R; speed bounded; gas brakes backward travel before switching forward; reverse steering reverses yaw; ERS/aero inhibited in R.
- Both signed steering directions: rendered wheel axis, body heading and world movement agree. Keyboard driver-right maps to internal negative steering and driver-left to positive.
- Keyboard, touch pointer and simulated gamepad ERS press/release retains ON; another press turns OFF; pause clears.
- Every one of 1,800 rendered road/kerb quads on each of five circuits tested against all low scenery bounding footprints with separating-axis overlap checks: 1,740,600 comparisons total, zero overlaps. Overhead gantry elements above 3 m excluded; posts included. This tests generated scenery clearance, not complete vehicle collision fidelity or camera occlusion.
- Dashboard below minimap and in viewport at 1280×800, 390×844 and 844×390; visible R indicator in browser reverse test.
- GLB regenerated after halo change.

## Manual inspection performed
Desktop menu and race screenshots reviewed. Original AL-02 silhouette and circuit minimap visible. Test environment uses software WebGL; screenshots do not establish target GPU performance.

## NOT verified / acceptance gates
Actual GitHub-hosted URL (no account deployment performed); HD 4400; real multi-finger phone/tablet play; gamepad calibration on hardware; iOS/Android sensor permissions; fullscreen/orientation locks and notches; 30-minute memory/thermal session; gamepad menu navigation; long race AI avoidance; all corner cases of track limits/pit servicing; accessibility audit. Real circuit elevation/width/layout-year validation not done.

No blanket 'all versions complete' status is justified. See REQUIREMENTS.md.

## 3.0.2 additional passing regressions
- Aero toggle keyboard/touch/simulated gamepad, no pause text, brake closure/reopening while armed.
- G switches transmission, V switches assist; saved engine setting and remappable/touch controls.
- Timing tower changes leader/interval mode; unit checks verify 2.000 s shared-gate gap, lap deficits, missing data and no overwrite on reverse recrossing.
- Stronger brake recovery than light braking; coast recovers while slowing; zero full-throttle/stopped/full-battery recovery; engine setting affects both deceleration and recovered energy.
- Circular braking-envelope bound, wet reduction, assist disable and reverse bypass.
- Automated pure-pursuit steering with HELD FULL THROTTLE and the new braking controller, all five complete under 9 m maximum offset:

| Reference | Dry time s / max offset m | Wet slick time s / max offset m |
|---|---|---|
| Monza | 165.1 / 0.70 | 248.9 / 4.48 |
| Imola | 175.1 / 3.11 | 265.4 / 3.46 |
| Bahrain | 179.8 / 0.80 | 274.5 / 5.45 |
| Jeddah | 219.8 / 0.61 | 329.9 / 0.88 |
| Silverstone | 204.8 / 0.60 | 309.2 / 0.83 |

These are test-driver laps, not guaranteed best times or a claim of real-circuit accuracy. Human turn-in mistakes, damaged brakes and AI collisions can still cause excursions. The speed CSVs describe recommended envelopes, not validated speed limits.

## 3.0.3 traffic / weather regression results
- Rear-impact momentum transfer: front car speeds up, rear car slows, neither forced into reverse. Side contact changes lateral velocity. No overlap produces no collision.
- Front-wing-tip priority can differ from centre position; it is frozen through a corner and cleared on exit. Alongside lane reservation and following brake demand tested. Identical controls/setup give identical AI/player physical states.
- Six-car shared-controller laps across all five tracks, staggered starting grid, full throttle requests: all cars finish, no detected contact frames; maximum lateral offsets below 9 m.

| Reference | Dry completion s / max offset m | Wet slick completion s / max offset m |
|---|---|---|
| Monza | 179.9 / 3.00 | 271.9 / 4.47 |
| Imola | 194.5 / 3.20 | 294.6 / 3.49 |
| Bahrain | 196.2 / 3.00 | 299.9 / 5.43 |
| Jeddah | 235.4 / 3.00 | 354.0 / 3.00 |
| Silverstone | 220.9 / 3.00 | 333.3 / 3.00 |

- Side-by-side dry stress grid: all six finish and stay inside road width on each track. Contact frames: Monza 27, Imola 37, others 0. This explicitly does NOT certify contact-free racecraft. These are repeated 120 Hz overlap frames, not counts of independent incidents.
- Browser: wet droplets contain rendered pixels, overlay ignores pointer events, Low spray count 144, road roughness changes, AI tyre loads/gear states integrated, dry restart hides weather. Wet screenshot inspected.
- Existing browser controls, aero/ERS toggles, reverse, HUD layouts and road-clearance suites retained. Local /project/ boot remains tested; no actual GitHub deployment or physical-device certification.

Commands: npm run test:traffic, npm run test:alongside, npm run test:weather. Existing npm test / test:wet / test:browser / test:systems / test:corrections / test:subpath remain available.
