<?php

namespace App\Enums;

enum Element: string
{
    case FIRE = 'fire';
    case WATER = 'water';
    case EARTH = 'earth';
    case AIR = 'air';
    case LIGHTNING = 'lightning';
    case ICE = 'ice';
    case METAL = 'metal';
    case NATURE = 'nature';

    public function getWeakness(): self
    {
        return match ($this) {
            self::FIRE => self::WATER,
            self::WATER => self::LIGHTNING,
            self::EARTH => self::AIR,
            self::AIR => self::ICE,
            self::LIGHTNING => self::EARTH,
            self::ICE => self::METAL,
            self::METAL => self::NATURE,
            self::NATURE => self::FIRE,
        };
    }

    public function getStrength(): self
    {
        return match ($this) {
            self::FIRE => self::NATURE,
            self::WATER => self::FIRE,
            self::EARTH => self::LIGHTNING,
            self::AIR => self::EARTH,
            self::LIGHTNING => self::WATER,
            self::ICE => self::AIR,
            self::METAL => self::ICE,
            self::NATURE => self::METAL,
        };
    }

    public function isWeakness(Element $attacker): bool
    {
        return $this->getWeakness() === $attacker;
    }

    public function isStrength(Element $attacker): bool
    {
        return $this->getStrength() === $attacker;
    }

    public function getDamageMultiplier(Element $attacker): float
    {
        if ($this->isWeakness($attacker)) {
            return 0.5; // Double damage for weakness
        }
        if ($this->isStrength($attacker)) {
            return 2; // Double damage for strength
        }

        return 1; // Normal damage
    }
}
