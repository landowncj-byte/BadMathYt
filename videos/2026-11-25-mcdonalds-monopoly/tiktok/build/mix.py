import sys; sys.path.insert(0, '.')
from mixlib import *
DUR = 33.80
P = [('glitch_1', 0.0, .6, None), ('deep_boom_2', .02, .8, None), ('whoosh_2', 1.9, .4, None), ('pop_2', 2.0, .5, None), ('rubber_stamp_2', 2.68, .6, None), ('pop_2', 3.0, .5, None),
 ('whoosh_2', 3.7, .4, None), ('rubber_stamp_2', 3.8, .7, None), ('thud_1', 3.82, .5, 1.0)] + [('pop_2', round(3.95 + i * .2, 2), .4, None) for i in range(6)] + [
 ('swoosh_2', 5.2, .5, None), ('clock_ticking_1', 5.45, .4, .9), ('rubber_stamp_2', 6.02, .7, None),
 ('swoosh_2', 6.9, .5, None), ('thud_1', 7.2, .6, 1.0), ('rubber_stamp_2', 7.86, .8, None),
 ('swipe_1', 8.76, .6, None), ('pop_2', 9.3, .5, None), ('swoosh_2', 10.0, .6, None), ('swipe_2', 10.2, .5, None), ('click_1', 11.1, .4, .3), ('rubber_stamp_2', 11.42, .8, None), ('pop_2', 11.45, .6, None),
 ('whoosh_2', 12.2, .4, None)] + [('click_2', round(12.5 + i * .2, 2), .3, .2) for i in range(6)] + [('swoosh_2', 13.1, .4, None), ('rubber_stamp_2', 13.52, .8, None),
 ('swoosh_2', 14.1, .5, None), ('coins_drop_1', 14.14, .6, None), ('cash_register_1', 15.44, .8, None), ('money_counter_1', 15.44, .4, .9), ('whoosh_2', 16.3, .3, None), ('ding_1', 16.4, .3, None),
 ('swoosh_2', 18.0, .5, None), ('thud_1', 18.16, .5, 1.0), ('deep_boom_2', 19.26, 1.0, None), ('money_counter_1', 19.26, .45, .9), ('cash_register_2', 19.9, .5, None),
 ('paper_slam_1', 20.52, .6, None), ('click_1', 20.86, .4, .3), ('swipe_2', 23.3, .2, None),
 ('whoosh_2', 25.4, .35, None), ('rubber_stamp_2', 26.08, 1.0, None), ('deep_boom_2', 26.08, .7, None),
 ('swoosh_2', 27.3, .4, None), ('gavel_2', 27.7, 1.0, 2.0), ('cell_door_1', 27.98, .8, 2.2),
 ('swoosh_2', 29.1, .4, None), ('pop_2', 29.22, .5, None), ('pop_2', 29.5, .6, None), ('thud_1', 29.9, .5, 1.0), ('click_1', 30.6, .4, .3),
 ('swoosh_2', 31.1, .4, None)] + [('pop_2', round(31.2 + i * .17, 2), .4, None) for i in range(6)] + [
 ('pop_2', 32.04, .6, None), ('click_1', 32.8, .5, .3), ('success_chime_1', 32.95, .4, 1.0), ('glitch_1', 33.4, .8, None), ('swipe_1', 33.4, .5, None)]
bed = 'tense_bed_2'
ensure_sfx(P, bed, '../sfx')
mix(P, DUR, bed, '../voice/narration.wav', '../sfx', 'mix.wav', quiet=(23.2, 25.4))
