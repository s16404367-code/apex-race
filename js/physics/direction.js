import {clamp} from './models.js';

// Both directions use the same tyre integrator. Pedals are remapped here only.
// D -> R requires a fresh brake press after a deliberate stop/release.
export function directionPedals(car, input, dt) {
  const gas = clamp(input.throttle || 0, 0, 1);
  const brake = clamp(input.brake || 0, 0, 1);
  const stopped = Math.hypot(car.u, car.lateral) < .25;
  car.stoppedTime = stopped ? car.stoppedTime + dt : 0;
  if (car.direction === 1) {
    if (!stopped || gas > .05) car.reverseReady = false;
    if (car.stoppedTime > .18 && brake < .05 && gas < .05) car.reverseReady = true;
    if (car.reverseReady && brake > .2 && car.previousBrake <= .2 && gas < .05) {
      car.direction = -1;
      car.reverseReady = false;
      car.gear = -1;
      car.throttle = 0;
      car.brake = 0;
      car.u = car.lateral = car.yaw = 0;
    }
  } else if (stopped && gas > .2 && brake < .05) {
    car.direction = 1;
    car.gear = 1;
    car.throttle = 0;
    car.brake = 0;
    car.u = car.lateral = car.yaw = 0;
    car.stoppedTime = 0;
  }
  car.previousBrake = brake;
  return car.direction === -1
    ? { drive: gas > .05 ? 0 : brake, brake: gas, direction: -1 }
    : { drive: brake > .05 ? 0 : gas, brake, direction: 1 };
}
