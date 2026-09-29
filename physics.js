export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const approach=(x,t,r)=>x+clamp(t-x,-r,r);
export function createCar(){return {s:0,x:0,v:0,steer:0,throttle:0,brake:0,gear:1,ers:100,fuel:25,damage:0,tyres:100,lap:1,lapTime:0,total:0,best:Infinity,invalid:false};}
// Same normalized inputs and fixed time step for every device. Simplified driving model, not a full tyre simulator.
export function stepCar(c,input,dt,env){
 c.steer=approach(c.steer,input.steer,dt*2.5);c.throttle=approach(c.throttle,input.throttle,dt*2);c.brake=approach(c.brake,input.brake,dt*5);
 let boost=input.ers&&c.ers>0&&c.throttle>.1;let off=Math.abs(c.x)>env.width/2;let grip=(env.wet?.72:1)*(1-c.damage*.003)*(0.75+c.tyres*.0025);let aero=input.aero&&c.v>35&&!off;
 let acceleration=c.throttle*(12.8*(1-c.v/112))*(1-c.damage*.004)*(c.fuel>0?1:0)*(env.manual?clamp(1-Math.abs(c.v-(c.gear-1)*13)/45,.08,1):1)+(boost?4.2:0)-c.brake*25*grip-.7-c.v*c.v*(aero?.00038:.0006)*(1+env.setup*.3);
 if(off)acceleration-=c.v*.32;
 c.v=clamp(c.v+acceleration*dt,0,105);c.x+=(c.steer*(2+c.v*.17)*grip-env.curve*c.v*c.v*.018/(1+env.setup*.4))*dt;
 if(Math.abs(c.x)>env.width/2+8){c.x=Math.sign(c.x)*(env.width/2+8);c.v*=.92;c.damage=clamp(c.damage+dt*25,0,100);c.invalid=true;}
 if(off)c.invalid=true;
 c.s+=c.v*dt;c.total+=c.v*dt;c.lapTime+=dt;c.ers=clamp(c.ers+(boost?-18:c.brake>0?8:1.5)*dt,0,100);c.fuel=Math.max(0,c.fuel-c.throttle*dt*.018);c.tyres=Math.max(0,c.tyres-dt*(Math.abs(c.steer)*c.v*.0008+.005));
 if(!env.manual)c.gear=clamp(Math.floor(c.v/13)+1,1,8);
 if(c.s>=env.length){c.s-=env.length;c.lap++;let time=c.lapTime;c.lapTime=0;if(!c.invalid)c.best=Math.min(c.best,time);let valid=!c.invalid;c.invalid=false;return {lap:true,time,valid};}return null;
}
export function validateLayout(value){if(!value||typeof value!=='object'||Array.isArray(value))return false;return Object.values(value).every(v=>v&&Number.isFinite(v.x)&&v.x>=0&&v.x<=1&&Number.isFinite(v.y)&&v.y>=0&&v.y<=1&&Number.isFinite(v.size)&&v.size>=.5&&v.size<=2&&Number.isFinite(v.opacity)&&v.opacity>=.1&&v.opacity<=1&&typeof v.hidden==='boolean');}
