import assert from 'node:assert/strict';
import {createCar,stepCar} from '../physics.js';
import {createModel,animateModel} from '../js/vehicle/model.js';
import * as T from '../vendor/three.module.js';
let c=createCar();const step=(seconds,input)=>{for(let i=0;i<seconds*120;i++)stepCar(c,input,1/120)};
step(2,{throttle:1});step(8,{brake:1});assert.equal(c.direction,1);assert.equal(c.u,0);
step(.3,{});step(4,{brake:1,ers:true,aero:true});assert.equal(c.gear,-1);assert(c.u< -1&&c.u>=-8.1);assert.equal(c.deployKW,0);assert(!c.aeroOpen);
step(.1,{throttle:1});assert.equal(c.direction,-1);assert(c.u<0);step(5,{throttle:1});assert.equal(c.direction,1);assert(c.u>0);console.log('PASS deliberate reverse, capped speed, forward transition, ERS/aero inhibited');
for(const sign of [-1,1]){c=createCar();c.u=12;step(.5,{throttle:.2,steer:sign});const rig=createModel('#d5ff43');rig.rotation.y=c.heading+Math.PI;animateModel(rig,c,0);rig.updateMatrixWorld(true);let front=new T.Vector3(0,0,-1).transformDirection(rig.userData.steerPivots[0].matrixWorld),nose=new T.Vector3(0,0,-1).transformDirection(rig.matrixWorld);assert(Math.sign(nose.z*front.x-nose.x*front.z)===sign);assert(Math.sign(c.heading)===sign);assert(Math.sign(c.wx)===sign);}
console.log('PASS rendered front wheels, body heading and world trajectory agree in both directions');

for(const sign of [-1,1]){c=createCar();step(.3,{});step(2,{brake:1,steer:sign});assert.equal(c.direction,-1);assert(Math.sign(c.heading)===-sign);assert(Number.isFinite(c.lateral));}console.log('PASS reverse steering yaw reverses and remains finite');
