import sys; sys.path.insert(0, '.')
from mixlib import *
DUR = 17.90
P = [('glitch_1', 0.0, .6, None), ('deep_boom_2', .02, .9, None), ('rubber_stamp_2', .03, .8, None),
 ('whoosh_2', 2.4, .4, None)] + [('pop_2', round(2.75 + i * .22, 2), .35, None) for i in range(8)] + [('rubber_stamp_2', 3.22, .8, None), ('thud_1', 3.24, .5, 1.0),
 ('swoosh_2', 4.9, .5, None), ('money_counter_1', 5.3, .45, .9), ('deep_boom_2', 5.94, 1.0, None), ('cash_register_1', 5.96, .7, None), ('thud_1', 6.94, .5, 1.0),
 ('whoosh_2', 7.3, .35, None), ('pop_2', 7.46, .5, None)] + [('pop_2', round(7.6 + i * .12, 2), .4, None) for i in range(4)] + [('rubber_stamp_2', round(8.36 + i * .1, 2), .6, None) for i in range(4)] + [
 ('swoosh_2', 9.4, .5, None)] + [(('swipe_1' if i % 2 else 'swipe_2'), round(9.45 + i * .46, 2), .55, None) for i in range(6)] + [('sad_trombone_1', 11.62, .6, 1.9), ('rubber_stamp_2', 11.62, .9, None),
 ('swoosh_2', 12.2, .4, None), ('gavel_2', 12.82, 1.0, 2.0), ('cell_door_1', 13.0, .7, 2.0), ('rubber_stamp_2', 13.18, .9, None),
 ('swoosh_2', 14.1, .5, None), ('whoosh_1', 14.1, .3, 1.2), ('pop_2', 15.1, .5, None), ('notification_chime_1', 15.12, .4, 1.0), ('success_chime_1', 16.9, .5, 1.0), ('glitch_1', 17.52, .8, None), ('swipe_1', 17.52, .5, None)]
bed = 'upbeat_bed_2'
ensure_sfx(P, bed, '../sfx')
mix(P, DUR, bed, '../voice/narration.wav', '../sfx', 'mix.wav', quiet=None, bedgain=.8)
