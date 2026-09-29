# 3.0.3 — Racecraft & Rain Update

Complete ZIP release. All 3.0.1/3.0.2 controls, reverse, steering alignment, ERS/aero toggles, icon-only pause, compact HUD, timing and regeneration remain included.

## New
- Five AI cars now use the shared four-wheel integrator, fuel, tyres, gears, brakes, damage and weather response. Shared corner-speed and traffic-braking functions apply to the player when brake assist is ON. Difficulty only changes throttle aggression. AI does not deploy boost/aero, and uses automatic forward gears.
- Corner priority from the foremost front-wing tip along the track tangent, not car centre or screen coordinates; 0.25 m tie tolerance. Rules freeze for the corner. Meaningful alongside overlap keeps separate lane targets and lower speed; a following car aims for one car length clear space, expanded in rain.
- Two-car oriented hull collision solver with mass-weighted separation and equal/opposite normal impulses. Both cars react. It does not force the player backward or always sideways; contact direction and relative motion determine the outcome.
- Soft tyre spray, screen droplets and darker wet-road material. Low preset reduces particle counts. Dry sessions hide the effects.

## Rules and limits
This is the requested game-specific priority convention, not an official motorsport rules implementation. No automatic penalty is assigned to a leader whose follower yields onto grass. Existing off-track clean-lap invalidation and physical damage still apply. Priority does not disable collision response or protect deliberate contact.

The planner aims to leave room, not guarantee it. Six-car staggered dry/wet test laps were contact-free; side-by-side stress tests stayed on the road but still produced brief contacts on Monza and Imola. Player mistakes, spins and extreme pileups can defeat avoidance. There is no complete stewarding/overtake/optimal racing-line system.

Collision response is planar oriented rectangles, with no detailed body deformation, angular impact torque or swept high-speed collision detection. Rain is visual particles/material shading, not simulated standing water, drying or reflections. Real-device performance remains unverified. Full audit: docs/REQUIREMENTS.md and docs/QA.md.
