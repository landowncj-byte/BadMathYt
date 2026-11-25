import json,sys
d=sys.argv[1]; out=sys.argv[2]
w=json.load(open(d+'/words.json')); m=json.load(open(d+'/mouth.json'))
open(out,'w').write('const WORDS='+json.dumps(w)+';\nconst MOUTH='+json.dumps(m)+';\n')
