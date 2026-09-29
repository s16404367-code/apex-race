import {clamp} from '../physics.js';
export const gripFactor=(c,wet)=>(wet?(c.compound==='wet'?.75:c.compound==='inter'?.65:.48):1)*clamp(c.tyres/100,.6,1)*clamp(1-c.damage*.004,.6,1);
export const wrapped=(d,length)=>((d+length/2)%length+length)%length-length/2;
export function noseProgress(c,trackAt){const a=trackAt(c.s),nx=c.wx+Math.sin(c.heading)*2.84,nz=c.wz+Math.cos(c.heading)*2.84;return c.s+(nx-a.p.x)*a.t.x+(nz-a.p.z)*a.t.z+.98*Math.abs(Math.cos(c.heading)*a.t.x-Math.sin(c.heading)*a.t.z);}
// Decisions are frozen for each pair during the corner, measured by front-wing tips.
export class CornerPriority{
 constructor(){this.pairs=new Map()}
 update(cars,trackAt,curvature,length){const decisions=[];for(let i=0;i<cars.length;i++)for(let j=i+1;j<cars.length;j++){const a=cars[i],b=cars[j],key=i+':'+j,d=wrapped(b.s-a.s,length);const near=Math.abs(d)<35,corner=near&&Math.max(...[0,20,45,75].map(x=>Math.abs(curvature(a.s+x))))>.008;let rule=this.pairs.get(key);if(!near||!corner){this.pairs.delete(key);continue}if(!rule){const delta=wrapped(noseProgress(b,trackAt)-noseProgress(a,trackAt),length);rule={a,b,aLeft:a.x<b.x,leader:Math.abs(delta)<.25?null:delta>0?b:a,alongside:Math.abs(d)<4.8&&Math.abs(a.x-b.x)>1.6};this.pairs.set(key,rule)}decisions.push(rule)}return decisions;
 }
}
export function trafficPlan(c,cars,rules,length,wet=false){let lane=0,limit=Infinity,yielding=false,alongside=false;for(const o of cars){if(o===c)continue;const d=wrapped(o.s-c.s,length),side=Math.abs(o.x-c.x);const rule=rules.find(r=>(r.a===c&&r.b===o)||(r.b===c&&r.a===o));if(rule?.alongside||Math.abs(d)<8&&side>1.6){alongside=true;const left=rule?.alongside?(rule.a===c?rule.aLeft:!rule.aLeft):c.x<o.x;lane=left?Math.min(lane,-1.6,o.x-2.8):Math.max(lane,1.6,o.x+2.8)}if(d>0&&d<100&&(side<2.6||rule&&!rule.alongside&&rule.leader===o)){const gap=d-5.2,desired=5.2+(wet?c.v*.25:0);limit=Math.min(limit,Math.max(0,Math.min(o.v+(gap-desired)*.7,Math.sqrt(o.v*o.v+2*4*gripFactor(c,wet)*Math.max(0,gap-desired)))));yielding=true;}}return {lane:clamp(lane,-6,6),limit,yielding,alongside};}
export function trafficPedals(c,input,plan){const brake=Number.isFinite(plan.limit)?clamp((c.v-plan.limit)/4,0,.9):0;return {...input,throttle:brake>.01?0:input.throttle,brake:Math.max(input.brake||0,brake)};}
function axes(c){return [{x:Math.sin(c.heading),z:Math.cos(c.heading)},{x:Math.cos(c.heading),z:-Math.sin(c.heading)}]}
function velocity(c){const [f,n]=axes(c);return {x:f.x*c.u+n.x*c.lateral,z:f.z*c.u+n.z*c.lateral}}
function setVelocity(c,v){const [f,n]=axes(c);c.u=v.x*f.x+v.z*f.z;c.lateral=v.x*n.x+v.z*n.z;c.v=Math.hypot(c.u,c.lateral)}
// Oriented planar hull overlap, equal-and-opposite normal impulse; no speed overwrite.
export function collide(a,b,damage=false){const aa=axes(a),bb=axes(b),dx=b.wx-a.wx,dz=b.wz-a.wz;let depth=Infinity,normal;
 for(const n of [...aa,...bb]){const radius=ax=>2.65*Math.abs(ax[0].x*n.x+ax[0].z*n.z)+1.05*Math.abs(ax[1].x*n.x+ax[1].z*n.z);const dot=dx*n.x+dz*n.z,overlap=radius(aa)+radius(bb)-Math.abs(dot);if(overlap<=0)return false;if(overlap<depth){depth=overlap;const sign=dot>=0?1:-1;normal={x:n.x*sign,z:n.z*sign}}}
 const ma=770+a.fuel,mb=770+b.fuel,ia=1/ma,ib=1/mb,sum=ia+ib,va=velocity(a),vb=velocity(b),relative=(vb.x-va.x)*normal.x+(vb.z-va.z)*normal.z;
 const correction=Math.max(0,depth-.015)*.65/sum;a.wx-=normal.x*correction*ia;a.wz-=normal.z*correction*ia;b.wx+=normal.x*correction*ib;b.wz+=normal.z*correction*ib;
 if(relative<0){const impulse=-(1.05)*relative/sum;va.x-=normal.x*impulse*ia;va.z-=normal.z*impulse*ia;vb.x+=normal.x*impulse*ib;vb.z+=normal.z*impulse*ib;setVelocity(a,va);setVelocity(b,vb);if(damage)for(const c of [a,b])c.parts.frontWing=clamp(c.parts.frontWing+Math.max(0,-relative-2)*.4,0,100)}return true;
}
export function projectRacer(c,samples,length){const count=samples.length-1,seed=Math.floor(c.s/length*count);let best=Infinity,result;for(let j=-20;j<=20;j++){const i=(seed+j+count)%count,a=samples[i].p,b=samples[i+1].p,dx=b.x-a.x,dz=b.z-a.z,q=clamp(((c.wx-a.x)*dx+(c.wz-a.z)*dz)/(dx*dx+dz*dz),0,1),x=a.x+q*dx,z=a.z+q*dz,d=(c.wx-x)**2+(c.wz-z)**2;if(d<best){best=d;result={s:(i+q)/count*length,x:((c.wx-x)*dz-(c.wz-z)*dx)/Math.hypot(dx,dz)}}}c.total+=wrapped(result.s-c.s,length);c.s=result.s%length;c.x=result.x;}

export function aiSteering(c,plan,trackAt){const look=4+c.v*.25,target=trackAt(c.s+look);target.p.addScaledVector(target.n,plan.lane);const bearing=Math.atan2(target.p.x-c.wx,target.p.z-c.wz),error=Math.atan2(Math.sin(bearing-c.heading),Math.cos(bearing-c.heading)),maxSteer=clamp(.52/(1+c.v*.075),.052,.52);return clamp(Math.atan2(2*3.4*Math.sin(error),look)/maxSteer,-1,1);}
