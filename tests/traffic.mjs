import assert from 'node:assert/strict';
import * as T from '../vendor/three.module.js';
import {createCar,stepCar} from '../physics.js';
import {collide,CornerPriority,trafficPlan,trafficPedals,noseProgress,gripFactor} from '../js/traffic.js';
const at=s=>({p:new T.Vector3(0,0,s),t:new T.Vector3(0,0,1),n:new T.Vector3(1,0,0)});
let a=createCar(),b=createCar();a.wz=0;b.wz=5;a.u=a.v=30;b.u=b.v=20;let momentum=a.u+b.u;assert(collide(a,b));assert(a.u<30&&b.u>20&&a.u>0);assert(Math.abs(a.u+b.u-momentum)<1e-9);console.log('PASS rear impact slows rear car, pushes front car forward, conserves linear momentum');
a=createCar();b=createCar();b.wx=2;a.lateral=3;b.lateral=0;assert(collide(a,b));assert(b.lateral>0&&a.lateral<3);assert.equal(a.u,0);assert.equal(b.u,0);console.log('PASS side impact pushes sideways without forced reverse');
a=createCar();b=createCar();b.wz=50;assert(!collide(a,b));
a=createCar();b=createCar();a.s=a.wz=100;b.s=b.wz=100.2;a.heading=0;b.heading=Math.PI/2;assert(noseProgress(a,at)>noseProgress(b,at));const rules=new CornerPriority();let r=rules.update([a,b],at,()=>.02,1000)[0];assert.equal(r.leader,a);b.s=b.wz=104;r=rules.update([a,b],at,()=>.02,1000)[0];assert.equal(r.leader,a);rules.update([a,b],at,()=>0,1000);assert.equal(rules.pairs.size,0);console.log('PASS front-wing tip (not centre) priority, frozen through corner, cleared on exit');
a.s=a.wz=100;b.s=b.wz=102;a.x=-2;b.x=2;let both=new CornerPriority().update([a,b],at,()=>.02,1000);assert(both[0].alongside);let pa=trafficPlan(a,[a,b],both,1000),pb=trafficPlan(b,[a,b],both,1000);assert(pa.lane<=-.6&&pb.lane>=.6);a.x=b.x=0;a.v=30;b.v=20;b.s=110;pa=trafficPlan(a,[a,b],[],1000);assert(pa.limit<20);assert(trafficPedals(a,{throttle:1},pa).brake>0);assert(gripFactor(a,true)<gripFactor(a,false));console.log('PASS alongside room, one-car clear-gap target, following brake, same grip factor');

// Shared control/physics parity: role does not alter the calculated result.
const player=createCar(),ai=structuredClone(player);for(let i=0;i<600;i++){const input={throttle:.8,brake:0,steer:.12};stepCar(player,input,1/120,{wet:true,assist:'casual',setup:.5});stepCar(ai,input,1/120,{wet:true,assist:'casual',setup:.5});}assert.deepEqual(player,ai);console.log('PASS identical inputs/settings produce identical player and AI dynamics');
