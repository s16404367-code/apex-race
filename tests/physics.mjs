import assert from 'node:assert/strict';
import {createCar,stepCar,validateLayout} from '../physics.js';
const env={width:18,length:4280,curve:0,wet:false,setup:.5,manual:false};const input={steer:0,throttle:1,brake:0,ers:false,aero:false};
let a=createCar(),b=createCar();for(let i=0;i<1200;i++){stepCar(a,input,1/120,env);stepCar(b,{...input},1/120,env)}assert.deepEqual(a,b);assert(a.v>40);console.log('PASS deterministic shared physics');
let before=a.v;for(let i=0;i<240;i++)stepCar(a,{...input,throttle:0,brake:1},1/120,env);assert(a.v<before);console.log('PASS braking');
a=createCar();a.s=4279;a.v=50;const lap=stepCar(a,input,.1,env);assert(lap.lap&&lap.valid);assert.equal(a.lap,2);console.log('PASS lap crossing');
a=createCar();a.x=50;stepCar(a,input,1/120,env);assert(a.invalid&&a.damage>0);console.log('PASS barrier damage and invalidation');
assert(validateLayout({throttle:{x:.9,y:.8,size:1,opacity:.7,hidden:false}}));assert(!validateLayout({throttle:{x:99,y:.8,size:1,opacity:.7,hidden:false}}));assert(!validateLayout(null));console.log('PASS layout validation');
