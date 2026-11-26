import sys,re,os
# usage: qa_write.py <cut-label> <status-line> <body-file>   -> maintains qa.md: status block on top, one section per cut
qa='/home/user/badmathyt/videos/2026-11-26-fake-prince/qa.md'
label,status,body=sys.argv[1],sys.argv[2],open(sys.argv[3]).read()
t=open(qa).read() if os.path.exists(qa) else ''
if '## CRIME-SHOW BUILD STATUS' not in t:
    t='# QA - fake-prince (CRIME-SHOW pass, RULES 112)\n\nPhoto credit: Anthony Gignac booking photos, Miami-Dade County, public domain (Wikimedia Commons File:Anthony Gignac Miami PD mugshot.jpg), brand/photos/anthony-gignac/1.jpg. Footnote on every cut carries the credit. All other art is generic ILLUSTRATION / PROP.\n\n## CRIME-SHOW BUILD STATUS\n<!--S-->\n<!--/S-->\n\n'
# status
m=re.search(r'<!--S-->\n(.*?)<!--/S-->',t,re.S); lines=[l for l in m.group(1).split('\n') if l and not l.startswith('- %s:'%label) and not l.startswith('RENDERED READY: %s '%label)]
lines.append(status); t=t[:m.start(1)]+'\n'.join(lines)+'\n'+t[m.end(1):]
# section
sec='\n<!--C:%s-->\n%s\n<!--/C:%s-->\n'%(label,body,label)
if '<!--C:%s-->'%label in t: t=re.sub(r'\n<!--C:%s-->.*?<!--/C:%s-->\n'%(label,label),lambda _:sec,t,flags=re.S)
else: t+=sec
open(qa,'w').write(t)
