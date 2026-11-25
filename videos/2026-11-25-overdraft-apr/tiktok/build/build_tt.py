import sys; sys.path.insert(0,'../../build')
from build import build
B='/home/user/badmathyt/videos/2026-11-25-overdraft-apr/'
disp={2:'$34',7:'3.',8:'DAYS.',5:'$24',24:'17,000%',25:'APR.',33:'4¢',34:'',39:'4¢.',40:'',54:'FOLLOW',}
disp.pop(54); disp.pop(8)
fixes=[(41,41,17.72,18.2),(42,42,18.2,19.25)]
colors={r'17,000%,?':'r',r'\$34[.,]?':'r',r'apr[.,]?':'r',r'comment[.]?':'y',r'follow':'y',r'4¢[.]?':'g',r'\$24':'g',r'bureau':'y',r'hates[.]?':'r'}
build('TikTok',B+'tiktok/voice/',B+'tiktok/build/scene.html',['../../build/lib.js','../../build/yt.js','tt.js'],None,fixes,None,disp,colors,{'max':3,'chars':20},25.51,B+'tiktok/captions.srt','../../../../')
