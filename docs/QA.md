# QA results — 3.0.1

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
- Conservative automated driver completes all five outlines. Max centerline offsets: Monza 6.28 m, Imola 1.60 m, Bahrain 4.42 m, Jeddah 0.58 m, Silverstone 1.46 m. Nominal road half-width 9 m. This test does not certify human handling or AI racecraft.
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
