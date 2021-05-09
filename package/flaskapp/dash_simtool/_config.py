# -*- coding: utf-8 -*-

start_sim_step = -2

step_map = {
    k: 'Stage {}'.format(k) if k >= 0 else
        'Post-blackout' if k == -2 else
        'Pre-restoration' if k == -1 else
        'Post-restoration' for k in range(-2, 32)
}

entity_network_map = {
    'ESO': 'chapelcross132kv',
    'DNO': 'chapelcross33kv',
    'TO': 'gretna400kv',
    'DER': 'ewehillgretna',
    'Observer': 'chapelcross33kv',
    'admin': 'chapelcross33kv',
}

demo = False