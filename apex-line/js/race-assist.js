// A conservative centreline speed envelope, not a fastest racing-line solver.
export function speedProfile(points,length,grip=1){
 const n=points.length-1,ds=length/n;
 const speeds=points.slice(0,n).map((p,i)=>{const a=points[(i-3+n)%n],b=points[(i+3)%n];const ax=p.x-a.x,az=p.z-a.z,bx=b.x-p.x,bz=b.z-p.z;const angle=Math.abs(Math.atan2(ax*bz-az*bx,ax*bx+az*bz));const curvature=angle/Math.max(1,(Math.hypot(ax,az)+Math.hypot(bx,bz))/2);return Math.min(90,Math.sqrt(5.0*grip/Math.max(curvature,.0001)));});
 // Circular backward braking pass; anticipates corners across the start line.
 for(let pass=0;pass<3;pass++)for(let i=n-1;i>=0;i--)speeds[i]=Math.min(speeds[i],Math.sqrt(speeds[(i+1)%n]**2+2*7*grip*ds));
 return {speeds,ds,length};
}
export function cornerAssist(profile,car,input,enabled=true,factor=1){
 const index=Math.floor(((car.s+Math.max(5,car.v*.65))%profile.length+profile.length)%profile.length/profile.ds);
 const target=profile.speeds[index]*Math.sqrt(factor);
 const demand=enabled&&car.direction===1&&car.u>4?Math.min(.85,Math.max(0,(car.v-target)/5)):0;
 return {target,active:demand>.01,input:{...input,brake:Math.max(input.brake||0,demand),throttle:demand>.01?0:input.throttle}};
}
// Store interpolated forward crossings of shared 25 m timing gates.
export class TimingGaps{
 constructor(){this.racers=new Map()}
 update(id,distance,time){let r=this.racers.get(id);if(!r){this.racers.set(id,{distance,time,gates:new Map()});return}if(distance>r.distance){for(let k=Math.floor(r.distance/25)+1;k<=Math.floor(distance/25);k++)if(!r.gates.has(k))r.gates.set(k,r.time+(time-r.time)*(k*25-r.distance)/(distance-r.distance));}r.distance=distance;r.time=time;for(const k of r.gates.keys())if(k<Math.floor(distance/25)-1200)r.gates.delete(k);}
 gap(a,b,length){if(a.total-b.total>=length)return '+'+Math.floor((a.total-b.total)/length)+' LAP';const ra=this.racers.get(a.name),rb=this.racers.get(b.name);if(!ra||!rb)return '—';let k=Math.floor(Math.min(a.total,b.total)/25);for(let i=0;i<20;i++,k--)if(ra.gates.has(k)&&rb.gates.has(k))return '+'+Math.max(0,rb.gates.get(k)-ra.gates.get(k)).toFixed(3)+'s';return '—';}
}
