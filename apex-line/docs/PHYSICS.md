# Dynamics model and tuning

## Coordinates and clocks
SI internally (metres, seconds, kilograms, newtons, radians; temperatures °C and user tyre-pressure tuning psi). Fixed 120 Hz integrator, render requestAnimationFrame, HUD approximately 14 Hz, telemetry 10 Hz. Frame contribution is capped at 0.1 seconds; very slow rendering slows simulation rather than creating a spiral. Render-pose interpolation remains deferred.

World X/Z position and body heading are independent of the track spline. Body longitudinal velocity `u`, lateral velocity toward the spline positive normal (driver-left), and yaw form a planar rigid body. World forward is (sin heading, cos heading); its left normal is (cos heading, -sin heading). Positive internal steering/yaw turns driver-left. All driver inputs are converted at the input boundary: right is negative internal steering. Visual front pivots use the same signed angle as physics. The renderer uses heading+π because the model points along negative local Z. Rear wheels are not steered. Spline projection measures progress and track distance; it does not force a steering direction.

## Vehicle baseline
770 kg dry plus selected fuel, 3.4 m wheelbase, 0.29 m CG height, 1.66 m physics track, 1,250 kg m² yaw inertia, 0.36 m rolling radius. Eight decreasing gear ratios and 3.8 final drive. Torque is interpolated between 4,200–12,500 RPM points. Automatic changes at 11,400/6,900 RPM with 85 ms shift interruption. Launch clutch is an implicit idle-RPM floor, not a detailed clutch solver. Engine cut at zero fuel. Reverse uses a signed low-speed drive force, capped toward 8 m/s, through the same four-tyre integrator. Stop, release brake for roughly 0.2 seconds, then press brake again to select R. Holding brake through a stop does not automatically reverse. In R, gas brakes first, then selects first gear at rest. This deliberate direction selection also works with manual forward gears; no neutral/clutch control yet.

## Tyres and load
Four wheel patches calculate front/rear static load plus quasi-static longitudinal and lateral load transfer. Each wheel transforms local velocity into steered tyre coordinates. Relaxed slip angle drives a saturating lateral force. Requested longitudinal engine/brake force shares a friction-circle budget. Load sensitivity mildly reduces friction coefficient under high loads.

Slip ratio/omega are approximate output states inferred from unmet requested force, not a fully integrated rotating-wheel inertia model. ABS caps brake demand; TC preserves rear lateral grip and reduces power in large sideslip. Hardcore removes these aids. Steering assistance corrects desired yaw/sideslip through front steering only, not by directly rotating the body.

Compound, surface, temperature, pressure, wear and water modify friction. Sliding work heats tyres and drives wear; convection cools them. Wear above 98% produces a puncture grip reduction. Brake heat responds to braking work and cooling, and excessive heat fades brake torque. No pressure-temperature gas law or detailed flat-spot model yet.

## Aero and ERS
Dynamic pressure q = ½ ρ v². Front/rear wing and floor loads depend on setup, ride-height efficiency and part damage. Open aero continuously reduces drag 30%, front wing contribution 22% and rear wing contribution 44%, at full flap travel. Floor load stays unchanged. Rendering and force coefficients use the same continuous flap states.

Zone, dry conditions, >22 m/s speed, >65% throttle, <4% brake, low steering angle and healthy rear wing gate opening. No race detection gap is enforced. Zones are derived from long source polyline segments, not official regulations.

4,000 kJ battery, up to 180 kW drivetrain boost. Braking/coasting recovery is power-limited to 110 kW. Deploy is zero when empty or reversing. In the app, tap E/touch ERS/gamepad ERS to arm/disarm the selected strategy. OFF overrides all deployment strategies; ON still respects strategy, battery and pedal gates. Pause/reset clears the latch. Engine torque produces drivetrain force through ratios; ERS force is power divided by speed with a low-speed denominator guard. Total tyre force still cannot exceed the grip budget.

## Body integration
Semi-implicit forward/lateral integration with rotating-frame coupling; yaw acceleration from tyre-force moments over inertia. Low-speed blending damps lateral/yaw instability near rest. Drag opposes signed longitudinal travel. Track barriers project penetrations back inside and reflect outward normal velocity with inelastic damping. It is a 2D approximate collision hull, not full 3D contact dynamics.

Spring compression is a load/spring-rate filtered proxy used visually. Four-corner sprung-mass heave/roll/pitch and road-height suspension are **not** implemented. Body pitch/roll render proxies are driven by measured accelerations. Flat circuit elevation is explicit.

## Service, damage and timing
12 seconds of real session time for stationary service near start line; AI keeps moving. Fuel/tyres/energy/parts restored at completion. No separate pit lane or penalty director. Barrier normal impact damages front wing, suspension and floor outside Assisted mode; aero and steering respond. Other part fields exist for extension, but engine/rear-wing wear/retirement generation remains incomplete.

Lap timing requires a forward start-line crossing after at least 90% circuit progress; off-track lap invalidation and equal-distance thirds for sectors. No official timing-loop data. Manual reset invalidates lap and clears progress. Anti-shortcut logic is basic, not competitive anti-protest validation.

## Validation limits
Tests verify symmetry, speed response, finite energy, aero scaling, friction bound, braking, fuel and thermal state sanity. A conservative pure-pursuit test driver completes each circuit inside road width. No measured real-world tyre data, professional driver validation or gold-lap target has been used. This is an inspectable simplified dynamics foundation, not validated real-car fidelity.

## 3.0.2 speed assistance and energy corrections
A 1,800-sample centreline envelope uses heading change across ±3 samples. Baseline lateral acceleration budget 5 m/s²; speed ceiling 90 m/s. Three circular backward passes enforce v² <= next_v² + 2×7×distance. Runtime samples ahead by max(5 m, 0.65×speed) and reduces targets for weather, compound, tyre life and damage. Brake demand is a bounded proportional controller (0–0.85), overriding throttle when active. Reverse and speeds below 4 m/s bypass it. The recommendations are NOT optimal racing-line speeds; they exclude real elevation, detailed brake fade, traffic, and calibrated tyre telemetry. Profiles are available as CSV; wet-slick columns use the initial 0.48 factor, not a prediction for every dynamic condition.

3.0.2 supersedes earlier uncoupled energy recovery: requested brake recovery min(110, 160×brake) kW; coasting 12+18×engine-setting kW. A 2,400 N total rear regen force cap and 70% conversion efficiency apply. Actual recovery is proportional to delivered tyre longitudinal force and capped by speed/power/headroom. It replaces rear friction braking; coasting drag includes a shared engine/regen budget. No recovery under drive, below 3 m/s or in reverse. Full battery suppresses regen; physical engine drag remains. This is simplified blended braking, not a detailed motor/inverter simulation.

Active aero is latched in app inputs, while physics continues receiving an armed flag and enforcing conditions. Both toggles clear on pause/reset. G changes transmission mode but leaves the current gear unchanged; automatic shifting resumes under normal RPM rules. V controls braking assist.
