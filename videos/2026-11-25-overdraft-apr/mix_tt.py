import sys; sys.path.insert(0,'/home/user/badmathyt/videos/2026-11-25-overdraft-apr')
from mixlib import mix
P=lambda f,at,d,g,fi=0,fo=0,off=0:(f,at,d,g,fi,fo,off)
FX=[P("deep_boom_2",0,.36,-4),P("glitch_1",.02,.4,-9),P("printer",.1,1.8,-9,0,.3),P("cash_register_1",.95,1.0,-8,0,.1),
P("swipe_2",2.6,.5,-8),P("pop_2",2.7,.3,-7),P("pop_2",3.9,.3,-7),P("rubber_stamp_2",4.62,.5,-3),P("deep_boom_2",4.62,.36,-7),
P("notification_chime_2",5.55,1.2,-8,0,.3),P("wrong_buzzer_1",5.6,.8,-12,0,.1),P("swipe_2",7.3,.5,-8),P("click_1",8.6,.3,-5),P("ding_2",9.5,.7,-8,0,.1),
P("deep_boom_1",10.45,1.6,-3,0,.5),P("paper_slam_2",10.45,.5,-7),P("glitch_1",10.45,.4,-9),P("rubber_stamp_2",12.3,.5,-4),
P("swoosh_2",13.1,.9,-8,0,.2),P("pop_2",13.9,.3,-8),P("click_1",14.6,.3,-5),P("coins_drop_2",15.14,.35,-8),P("coins_drop_2",15.29,.35,-8),P("coin_single_1",15.3,.8,-10,0,.2),P("ding_2",15.5,.7,-8,0,.1),
P("deep_boom_2",16.775,.36,-5),P("paper_slam_2",17.72,.5,-9),P("deep_boom_1",18.2,1.6,-4,0,.5),P("cash_register_1",18.25,1.0,-5,0,.1),
P("notification_chime_2",19.72,1.2,-14,0,.3),P("click_1",23.05,.3,-12),P("pop_1",23.85,1.0,-12,0,.3),P("glitch_1",25.2,.3,-9)]
FX+=[P("pop_2",20.6+.22*k,.2,-11) for k in range(10)]
BEDS=[("upbeat_bed_2",0.0,25.51,0,-1,.3,1.0)]
mix('/home/user/badmathyt/videos/2026-11-25-overdraft-apr/tiktok',25.51,FX,BEDS)
