// Conservative footprint bound against EVERY centreline segment, including
// distant indices at hairpins. Radius includes the complete object footprint.
export function roadClear(samples,x,z,radius,margin=11.5){
 const limit=(radius+margin)**2;
 for(let i=0;i<samples.length-1;i++){
  const a=samples[i].p,b=samples[i+1].p,dx=b.x-a.x,dz=b.z-a.z;
  const q=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1)));
  if((x-a.x-q*dx)**2+(z-a.z-q*dz)**2<limit)return false;
 }
 return true;
}
