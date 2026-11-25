import sys; sys.path.insert(0, '.')
from mixlib import *
DUR = 60.10
S = 'swipe_1'
P = [('glitch_1', 0.0, .6, None), ('swipe_1', .12, .7, None), ('glitch_1', .55, .5, .5), ('paper_slam_1', .78, .8, None), ('rubber_stamp_2', 2.06, .6, None),
 ('whoosh_2', 2.9, .4, None), ('swipe_2', 3.4, .6, None), ('swipe_2', 3.82, .6, None), ('swipe_2', 4.22, .6, None), ('rubber_stamp_2', 4.54, .7, None),
 ('whoosh_1', 5.6, .35, 1.5), ('footsteps_2', 6.15, .5, None), ('footsteps_1', 6.45, .5, None), ('footsteps_2', 6.72, .4, None), ('deep_boom_2', 6.72, .8, None), ('rubber_stamp_2', 6.8, .7, None),
 ('swoosh_2', 8.1, .5, None), ('thud_1', 8.38, .6, 1.0), ('click_1', 9.18, .4, .3), ('typewriter_2', 10.14, .35, 1.4),
 ('swoosh_2', 13.42, .5, None), ('click_1', 14.4, .7, .3), ('thud_2', 14.42, .5, .6), ('pop_2', 14.96, .5, None), ('pop_2', 15.5, .5, None), ('swoosh_2', 15.95, .4, None),
 ('whoosh_2', 16.9, .5, None), ('paper_slam_1', 17.55, .6, None), ('ding_2', 18.78, .35, None),
 ('swipe_1', 20.24, .6, None), ('pop_2', 20.95, .5, None), ('swoosh_2', 21.72, .6, None), ('swipe_2', 22.0, .5, None), ('click_1', 22.74, .4, .3), ('rubber_stamp_2', 23.02, .8, None), ('pop_2', 23.1, .6, None), ('pop_2', 23.55, .5, None), ('notification_chime_2', 23.58, .3, None),
 ('whoosh_2', 25.4, .4, None), ('click_2', 26.4, .3, .2), ('click_2', 26.7, .3, .2), ('click_2', 26.98, .3, .2), ('click_2', 27.26, .3, .2), ('swoosh_2', 27.5, .4, None), ('click_2', 27.7, .3, .2), ('click_2', 27.98, .3, .2), ('rubber_stamp_2', 28.04, .8, None), ('coins_drop_1', 29.2, .6, None), ('money_counter_1', 29.5, .3, 1.2),
 ('cash_register_1', 31.7, .8, None), ('money_counter_1', 31.7, .4, 1.0),
 ('swoosh_2', 35.3, .5, None), ('deep_boom_2', 36.92, 1.0, None), ('money_counter_1', 36.95, .45, 1.0), ('cash_register_2', 37.5, .5, None),
 ('swoosh_2', 38.42, .6, None), ('whoosh_1', 38.46, .3, 1.2), ('pop_2', 39.06, .5, None), ('notification_chime_1', 39.1, .4, 1.0), ('thud_1', 40.34, .6, 1.0), ('swipe_1', 41.0, .6, None),
 ('whoosh_2', 41.8, .4, None)] + [('rubber_stamp_2', round(42.32 + i * .26, 2), .55, None) for i in range(8)] + [('pop_2', 43.78, .5, None),
 ('clock_ticking_1', 44.95, .4, 1.5), ('pop_2', 45.02, .6, None), ('click_1', 45.78, .5, .3), ('success_chime_1', 45.95, .4, 1.0), ('thud_1', 46.2, .5, 1.0),
 ('paper_slam_1', 47.7, .6, None), ('click_1', 48.08, .4, .3), ('swipe_2', 50.4, .2, None),
 ('whoosh_2', 53.04, .35, None), ('rubber_stamp_2', 53.96, 1.0, None), ('deep_boom_2', 53.96, .7, None), ('rubber_stamp_2', 54.9, .4, None),
 ('gavel_2', 56.46, 1.0, 2.0), ('cell_door_1', 56.74, .8, 2.2), ('pop_2', 57.4, .5, None), ('thud_2', 58.18, .6, None), ('swipe_1', 59.72, .5, None), ('glitch_1', 59.72, .8, None)]
bed = 'tense_bed_2'
ensure_sfx(P, bed, '../sfx')
mix(P, DUR, bed, '../voice/narration.wav', '../sfx', 'mix.wav', quiet=(50.2, 53.1))
