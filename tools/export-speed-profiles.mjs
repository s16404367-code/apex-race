import * as T from '../vendor/three.module.js';
import {tracks} from '../data/tracks.js';
import {speedProfile} from '../js/race-assist.js';
import {mkdirSync,writeFileSync} from 'node:fs';
mkdirSync('docs/speed-profiles',{recursive:true});
for(const track of tracks){const c=new T.CatmullRomCurve3(track.shape.map(([x,z])=>new T.Vector3(x,0,z)),true,'centripetal'),length=c.getLength(),points=Array.from({length:1801},(_,i)=>c.getPointAt((i%1800)/1800)),profile=speedProfile(points,length);const rows=profile.speeds.map((v,i)=>[i,(i*profile.ds).toFixed(2),(v*3.6).toFixed(1),(v*Math.sqrt(.48)*3.6).toFixed(1)].join(','));writeFileSync('docs/speed-profiles/'+track.reference.toLowerCase()+'.csv','sample,distance_m,dry_baseline_target_kmh,wet_slick_target_kmh\n'+rows.join('\n')+'\n');}
