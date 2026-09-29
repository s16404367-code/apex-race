import {CAR,COMPOUNDS,clamp,approach,engineTorque,aeroForces,tyreGrip,combinedForces} from './js/physics/models.js';
export {clamp,approach};
export function createCar(setup={}){return {s:0,x:0,v:0,u:0,lateral:0,heading:0,yaw:0,wx:0,wz:0,steer:0,steerAngle:0,throttle:0,brake:0,gear:1,lastGear:1,shift:0,rpm:CAR.idle,ers:100,energy:CAR.batteryKJ,deployKW:0,fuel:setup.fuel??25,damage:0,parts:{frontWing:0,rearWing:0,floor:0,engine:0,suspension:0},tyres:100,wheels:Array.from({length:4},()=>({temp:75,carcass:70,wear:0,pressure:setup.pressure??22,load:0,fx:0,fy:0,slip:0,slipAngle:0,omega:0,spin:0,brakeTemp:250,compression:0,lock:false,puncture:false,speed:0,surface:'asphalt'})),compound:setup.compound||'medium',lap:1,lapTime:0,total:0,best:Infinity,invalid:false,ax:0,ay:0,aeroOpen:false,aeroAvailable:false,aeroAngle:0,frontAeroAngle:0,downforce:0,drag:0,pitRemaining:0,sector:0,sectorTimes:[],lapProgress:0,retired:false};}
// Planar four-contact-patch rigid body. Body frame: forward u, right lateral.
// Positive heading/yaw turns right; front tyres alone receive steering angle.
export function stepCar(c,input,dt,env={}){
 const setup=env.setup??.5,wet=env.wet?1:0,assist=env.assist??'casual',mass=CAR.dryMass+c.fuel;
 c.throttle=approach(c.throttle,clamp(input.throttle||0,0,1),dt*2.7);c.brake=approach(c.brake,clamp(input.brake||0,0,1),dt*5);c.steer=approach(c.steer,clamp(input.steer||0,-1,1),dt*2.6);
 c.v=Math.hypot(c.u,c.lateral);const maxSteer=clamp(.52/(1+c.v*.075),.052,.52);let requestedSteer=c.steer*maxSteer;
 if(assist!=='hardcore'&&c.v>8){let yawTarget=c.u*Math.tan(requestedSteer)/(CAR.frontArm+CAR.rearArm);requestedSteer+=clamp((yawTarget-c.yaw)*.035+Math.atan2(c.lateral,Math.max(c.u,5))*.18,-.10,.10);}
 c.steerAngle=approach(c.steerAngle,clamp(requestedSteer,-maxSteer,maxSteer)*(1-c.parts.suspension*.004),dt*1.2);
 c.aeroAvailable=Boolean(env.aeroZone)&&!wet&&c.parts.rearWing<55&&c.v>22&&c.pitRemaining<=0;
 c.aeroOpen=c.aeroAvailable&&Boolean(input.aero)&&c.throttle>.65&&c.brake<.04&&Math.abs(c.steerAngle)<.08;
 c.aeroAngle=approach(c.aeroAngle,c.aeroOpen?1:0,dt*4);c.frontAeroAngle=approach(c.frontAeroAngle,c.aeroOpen?1:0,dt*5);
 const aero=aeroForces(c.v,setup,c.parts,c.aeroAngle,env.rideHeight??.06);c.downforce=aero.total;c.drag=aero.drag;
 if(c.pitRemaining>0){c.pitRemaining=Math.max(0,c.pitRemaining-dt);c.u=0;c.lateral=0;c.yaw=0;c.v=0;c.lapTime+=dt;if(c.pitRemaining===0){c.fuel=env.startFuel??25;c.energy=CAR.batteryKJ;c.parts={frontWing:0,rearWing:0,floor:0,engine:0,suspension:0};for(let w of c.wheels){w.wear=0;w.temp=75;w.puncture=false;}c.damage=0;}return null;}
 c.shift=Math.max(0,c.shift-dt);if(c.gear!==c.lastGear){c.shift=CAR.shiftTime;c.lastGear=c.gear;}
 const ratio=CAR.ratios[clamp(c.gear,1,8)-1]*CAR.finalDrive;
 c.rpm=clamp(Math.abs(c.u)/CAR.wheelRadius*ratio*60/(2*Math.PI),CAR.idle,CAR.limiter+500);
 if(!env.manual&&c.shift===0){if(c.rpm>11400&&c.gear<8){c.gear++;c.shift=CAR.shiftTime}else if(c.rpm<6900&&c.gear>1){c.gear--;c.shift=CAR.shiftTime}c.lastGear=c.gear;}
 const ersMode=env.ersMode||'manual';let wantsERS=input.ers||ersMode==='attack'||(ersMode==='balanced'&&c.v>45&&Math.abs(c.steerAngle)<.045);
 c.deployKW=wantsERS&&ersMode!=='off'&&ersMode!=='harvest'&&c.energy>0&&c.throttle>.7&&c.brake<.05?Math.min(CAR.boostKW,c.energy/dt):0;
 let torque=engineTorque(c.rpm)*c.throttle*(c.fuel>0?1:0)*(1-c.parts.engine*.009)*(c.shift>0?.10:1);if(c.rpm>=CAR.limiter)torque=0;
 let drive=torque*ratio*CAR.efficiency/CAR.wheelRadius+c.deployKW*1000/Math.max(Math.abs(c.u),18);
 const harvest=Math.min(110,c.brake*c.v*2.2+(c.throttle<.05?Math.max(0,c.v-8)*.25:0));c.energy=clamp(c.energy+(harvest-c.deployKW)*dt,0,CAR.batteryKJ);c.ers=c.energy/CAR.batteryKJ*100;
 const bias=env.brakeBias??.57;const wheelbase=CAR.frontArm+CAR.rearArm;const transferX=clamp(mass*c.ax*CAR.cgHeight/wheelbase,-mass*3,mass*3);const transferY=clamp(mass*c.ay*CAR.cgHeight/CAR.track,-mass*3,mass*3);
 const frontLoad=mass*9.81*CAR.rearArm/wheelbase+aero.front-transferX,rearLoad=mass*9.81*CAR.frontArm/wheelbase+aero.rear+transferX;
 let fxTotal=0,fyTotal=0,moment=0;
 for(let i=0;i<4;i++){
  let w=c.wheels[i],front=i<2,right=i%2===1,px=front?CAR.frontArm:-CAR.rearArm,py=right?CAR.track/2:-CAR.track/2;
  let load=Math.max(80,(front?frontLoad:rearLoad)/2+(right?-1:1)*transferY*.5);w.load=load;
  let lateralPos=c.x+py;w.surface=Math.abs(lateralPos)>(env.width??18)/2+2?'grass':Math.abs(lateralPos)>(env.width??18)/2?'kerb':'asphalt';
  let steer=front?c.steerAngle:0,cs=Math.cos(steer),sn=Math.sin(steer),u=c.u-c.yaw*py,v=c.lateral+c.yaw*px;
  let longitudinal=u*cs+v*sn,side=v*cs-u*sn;w.speed=Math.abs(longitudinal);const targetSlip=Math.atan2(side,Math.max(Math.abs(longitudinal),3));w.slipAngle+=(targetSlip-w.slipAngle)*(1-Math.exp(-Math.max(Math.abs(longitudinal),2)*dt/.4));
  const mu=tyreGrip(w,c.compound,wet,w.surface),limit=mu*load*Math.pow(Math.max(load,500)/2200,-.08);
  let wheelDrive=front?0:drive/2;const fade=clamp(1-Math.max(0,w.brakeTemp-900)/800,.35,1)*clamp(w.brakeTemp/160,.65,1);
  let braking=c.brake*CAR.brakeForce*(front?bias:1-bias)*.5*fade;
  w.lock=braking>limit&&c.v>3&&assist==='hardcore';if(assist!=='hardcore')braking=Math.min(braking,limit*.92);
  let requested=wheelDrive-braking*Math.sign(longitudinal||1);if(c.throttle<.05&&!front)requested-=Math.sign(longitudinal)*Math.min(500,c.rpm*.045);
  if(assist!=='hardcore'&&requested>limit*.93)requested=limit*.93;
  let lateralForce=-load*mu*Math.tanh(w.slipAngle*(front?8.2:10));if(w.lock)lateralForce*=.2;
  if(!front&&requested>0&&assist!=='hardcore'){const lateralUsage=clamp(Math.abs(lateralForce)/Math.max(limit,1),0,1);requested=Math.min(requested,limit*.95*Math.sqrt(1-lateralUsage*lateralUsage));requested*=clamp(1-(Math.abs(Math.atan2(c.lateral,Math.max(c.u,3)))-.06)/.12,0,1);}
  let [fx,fy]=combinedForces(requested,lateralForce,limit*(w.lock?.8:1));w.fx=fx;w.fy=fy;w.slip=clamp((requested-fx)/Math.max(limit,100),-2,2);
  const bx=fx*cs-fy*sn,by=fx*sn+fy*cs;fxTotal+=bx;fyTotal+=by;moment+=px*by-py*bx;
  w.omega=w.lock?0:longitudinal/CAR.wheelRadius*(1+Math.max(0,w.slip)*.6);w.spin=(w.spin+w.omega*dt)%(Math.PI*2);
  const slipWork=Math.abs(fy*side)+Math.abs(fx*w.slip*Math.max(w.speed,1));w.temp=clamp(w.temp+dt*(slipWork*.000035-(w.temp-(wet?25:35))*(.011+c.v*.0003)*(wet?2:1)),15,200);w.carcass+=(w.temp-w.carcass)*dt*.04;
  w.brakeTemp=clamp(w.brakeTemp+dt*(braking*w.speed*.00015-(w.brakeTemp-25)*(.018+c.v*.0005)),25,1500);
  w.wear=clamp(w.wear+(slipWork*.00000065+w.speed*.000006)*(COMPOUNDS[c.compound]||COMPOUNDS.medium).wear*(w.temp>120?2:1)*dt,0,100);w.puncture=w.wear>98;
  const target=clamp(load/(env.springRate??95000),0,.075);w.compression=approach(w.compression,target,dt*.15);
 }
 // Aerodynamic/rolling drag opposes motion; body-frame inertial coupling.
 let resistance=aero.drag+(Math.abs(c.x)>(env.width??18)/2+2?mass*.45+c.v*18:mass*.12);
 fxTotal-=Math.sign(c.u||1)*(resistance+(c.throttle<.02?Math.min(700,c.v*15):0));
 c.ax=clamp(fxTotal/mass,-55,35);c.ay=clamp(fyTotal/mass,-70,70);
 c.u+=(c.ax+c.yaw*c.lateral)*dt;c.lateral+=(c.ay-c.yaw*c.u)*dt;
 c.yaw+=clamp(moment/CAR.inertia,-15,15)*dt;c.yaw*=Math.exp(-dt*(c.v<3?6:.08));
 if(c.v<2){const targetYaw=c.u*Math.tan(c.steerAngle)/wheelbase;c.yaw=approach(c.yaw,targetYaw,dt*4);c.lateral*=Math.exp(-dt*12)}
 if(c.u<0&&c.throttle>=0){c.u=0;if(c.v<1)c.lateral=0;}
 c.heading+=c.yaw*dt;c.v=Math.hypot(c.u,c.lateral);
 c.wx+=(Math.sin(c.heading)*c.u+Math.cos(c.heading)*c.lateral)*dt;c.wz+=(Math.cos(c.heading)*c.u-Math.sin(c.heading)*c.lateral)*dt;
 c.fuel=Math.max(0,c.fuel-torque*c.rpm*2*Math.PI/60/44000000/.39*dt);c.lapTime+=dt;
 c.tyres=100-c.wheels.reduce((s,w)=>s+w.wear,0)/4;c.damage=Math.max(...Object.values(c.parts));
 // Projection/lap validation belongs to the track/session layer, not the integrator.
 return null;
}
export function validateLayout(value){if(!value||typeof value!=='object'||Array.isArray(value))return false;return Object.values(value).every(v=>v&&Number.isFinite(v.x)&&v.x>=0&&v.x<=1&&Number.isFinite(v.y)&&v.y>=0&&v.y<=1&&Number.isFinite(v.size)&&v.size>=.5&&v.size<=2&&Number.isFinite(v.opacity)&&v.opacity>=.1&&v.opacity<=1&&typeof v.hidden==='boolean');}
