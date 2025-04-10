<?php

namespace App\Enums;

enum BlessingType: string
{
    case DOUBLE_SUPPORT = 'double-support';
    case DOUBLE_ATTACK_POWER = 'double-attack-power';
    case INVINCIBLE = 'invincible';
    case DOUBLE_ACTION = 'double-action';
    case FREE_HEART = 'free-heart';
}
