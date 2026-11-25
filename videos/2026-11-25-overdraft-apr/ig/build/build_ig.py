import sys; sys.path.insert(0,'../../build')
from build import build
B='/home/user/badmathyt/videos/2026-11-25-overdraft-apr/'
disp={4:'$34',8:'$24',10:'3',28:'BULLSH*T.',34:'FRIEND.'}
colors={r'17,000%,?':'r',r'\$34':'r',r'send':'y',r'save':'y',r'bullsh\*t[.]?':'r',r'protection[.,]?':'r',r'payday':'y',r'\$24':'g'}
build('IG',B+'ig/voice/',B+'ig/build/scene.html',['../../build/lib.js','ig.js'],None,[],None,disp,colors,{'max':3,'chars':18},17.33,B+'ig/captions.srt','../../../../')
