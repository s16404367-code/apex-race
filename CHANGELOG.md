# Changelog

## 3.0.1 — Handling & Reverse Update
- Correct physical/render steering sign alignment and driver input mapping.
- Deliberate automatic reverse, signed drive/braking and R indicator.
- ERS latch for keyboard/touch/gamepad, off on pause/reset.
- Recognizable pause control and compact right-hand dashboard.
- Complete-road scenery-footprint checks; three-point supported halo.
- New correction regressions and regenerated GLB.

## 3.0.0 — Dynamics Update
- New world-space planar four-wheel force/yaw model; front wheels steer rather than translating the car across the track.
- Engine torque map, eight ratios, shift cut, finite ERS, wheel friction circles, load transfer, thermal tyres/brakes, fuel mass.
- Marked active aero zones with front/rear animated flaps and reduced drag/downforce.
- Original AL-02 tapered geometry, wheel animation, suspension rods, mirrors, halo and downloadable GLB.
- Five map-derived real-circuit planforms under original public names with source notices.
- Engineering controls, compounds, timed service, sectors, telemetry CSV and save portability.
- Low/Medium/High/Ultra render scales, low default, scene batching retained.
- Fixed grass recovery resistance and rear grip reserve under assisted acceleration.
- Tested conservative full laps on five layouts, physics invariants, visual aero activation, input regressions and subpath boot.

## 2.1.2
Initial standalone foundation with UI, procedural fictional circuits and track-relative arcade dynamics. Superseded by 3.0 dynamics and sourced circuits. Old personal times are intentionally separated in a new storage namespace.
