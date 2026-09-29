"""Rebuild selected local track data from a downloaded upstream GeoJSON file."""
import json,math,pathlib,sys
root=pathlib.Path(__file__).resolve().parents[1]
j=json.load(open(sys.argv[1])); ids={'it-1922':('brianza','PARCO REALE','Monza',11,'park'),'it-1953':('santerno','SANTERNO VALLEY','Imola',19,'park'),'bh-2002':('sakhir','DUNE INTERNATIONAL','Bahrain',15,'desert'),'sa-2021':('corniche','RED SEA CORNICHE','Jeddah',27,'coast'),'gb-1948':('airfield','ROYAL AIRFIELD','Silverstone',18,'airfield')}
tracks=[]
for id,(code,name,ref,corners,theme) in ids.items():
 f=next(x for x in j['features'] if x['properties']['id']==id); coords=f['geometry']['coordinates'];lon,lat=coords[0]; pts=[[round((x-lon)*111320*math.cos(math.radians(lat)),3),round(-(y-lat)*111320,3)]for x,y,*_ in coords]
 if pts[-1]==pts[0]:pts.pop()
 t=dict(code=code,name=name,reference=ref,length=f['properties']['length'],corners=corners,theme=theme,shape=pts,source='https://github.com/bacinger/f1-circuits',sourceId=id,accuracy='Georeferenced 2D outline; approximate width, flat elevation, original scenery. Not surveyed or official.',aeroZones=[])
 # Game zones: choose long low-curvature spans from source segments; not official DRS rules.
 lens=[math.dist(pts[i],pts[(i+1)%len(pts)]) for i in range(len(pts))]; total=sum(lens); ranked=sorted(range(len(pts)),key=lambda i:lens[i],reverse=True); zones=[]
 for i in ranked:
  if lens[i]<100:continue
  start=sum(lens[:i])/total;end=(sum(lens[:i])+lens[i])/total
  if any(abs(start-z['start'])<.1 for z in zones):continue
  zones.append(dict(start=round(start+.003,5),end=round(end-.003,5),detection=round(max(0,start-.02),5)))
  if len(zones)==3:break
 t['aeroZones']=zones
 (root/'data/tracks'/f'{code}.json').write_text(json.dumps(t,indent=2));tracks.append(t)
(root/'data/tracks.js').write_text('// Georeferenced circuit outlines. Attribution: ./tracks/LICENSE.md\nexport const tracks = '+json.dumps(tracks,separators=(',',':'))+';\n')
