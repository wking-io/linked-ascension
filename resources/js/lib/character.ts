import { BlessingType, CharacterResponse } from '@/types';
import type { Element } from '@/utils/elements';
import { ELEMENTS, isElementStrength, isElementWeakness } from '@/utils/elements';
import airArmor from '../../images/player-air-armor.png';
import airComplete from '../../images/player-air-complete.png';
import airWeapon from '../../images/player-air-weapon.png';
import air from '../../images/player-air.png';
import base from '../../images/player-base.png';
import earthArmor from '../../images/player-earth-armor.png';
import earthComplete from '../../images/player-earth-complete.png';
import earthWeapon from '../../images/player-earth-weapon.png';
import earth from '../../images/player-earth.png';
import fireArmor from '../../images/player-fire-armor.png';
import fireComplete from '../../images/player-fire-complete.png';
import fireWeapon from '../../images/player-fire-weapon.png';
import fire from '../../images/player-fire.png';
import iceArmor from '../../images/player-ice-armor.png';
import iceComplete from '../../images/player-ice-complete.png';
import iceWeapon from '../../images/player-ice-weapon.png';
import ice from '../../images/player-ice.png';
import lightningArmor from '../../images/player-lightning-armor.png';
import lightningComplete from '../../images/player-lightning-complete.png';
import lightningWeapon from '../../images/player-lightning-weapon.png';
import lightning from '../../images/player-lightning.png';
import metalArmor from '../../images/player-metal-armor.png';
import metalComplete from '../../images/player-metal-complete.png';
import metalWeapon from '../../images/player-metal-weapon.png';
import metal from '../../images/player-metal.png';
import natureArmor from '../../images/player-nature-armor.png';
import natureComplete from '../../images/player-nature-complete.png';
import natureWeapon from '../../images/player-nature-weapon.png';
import nature from '../../images/player-nature.png';
import waterArmor from '../../images/player-water-armor.png';
import waterComplete from '../../images/player-water-complete.png';
import waterWeapon from '../../images/player-water-weapon.png';
import water from '../../images/player-water.png';

export function attackPower(character: CharacterResponse) {
    return character.unlocked_weapon_at ? 2 : 1;
}

export function defensePower(character: CharacterResponse) {
    return character.unlocked_armor_at ? 1 : 0;
}

export function calculateDamage(character: CharacterResponse, target: CharacterResponse) {
    let attack = attackPower(character);
    const defense = defensePower(target);

    // Apply elemental multipliers
    if (character.element && target.element) {
        if (isElementWeakness(character.element as Element, target.element as Element)) {
            attack *= 2; // Double damage when attacker has advantage
        } else if (isElementStrength(character.element as Element, target.element as Element)) {
            attack *= 0.5; // Half damage when defender has advantage
        }
    }

    // Handle blessing effects (assuming a future implementation)
    if (character.blessing_type === BlessingType.DOUBLE_ATTACK_POWER) {
        attack *= 2;
    }

    // Calculate final damage (minimum 0)
    const damage = Math.max(attack - defense, 0);

    return damage;
}

const spriteSheetCache = new Map<string, HTMLImageElement>();

export function getSpriteSheet(character: CharacterResponse) {
    const cacheKey = `${character.element}-${character.unlocked_weapon_at}-${character.unlocked_armor_at}`;
    const cached = spriteSheetCache.get(cacheKey);
    if (cached) return cached;

    const spriteSheet = new Image();

    if (character.element === ELEMENTS.FIRE) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = fireComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = fireWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = fireArmor;
        } else {
            spriteSheet.src = fire;
        }
    } else if (character.element === ELEMENTS.LIGHTNING) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = lightningComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = lightningWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = lightningArmor;
        } else {
            spriteSheet.src = lightning;
        }
    } else if (character.element === ELEMENTS.WATER) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = waterComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = waterWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = waterArmor;
        } else {
            spriteSheet.src = water;
        }
    } else if (character.element === ELEMENTS.EARTH) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = earthComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = earthWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = earthArmor;
        } else {
            spriteSheet.src = earth;
        }
    } else if (character.element === ELEMENTS.AIR) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = airComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = airWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = airArmor;
        } else {
            spriteSheet.src = air;
        }
    } else if (character.element === ELEMENTS.ICE) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = iceComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = iceWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = iceArmor;
        } else {
            spriteSheet.src = ice;
        }
    } else if (character.element === ELEMENTS.METAL) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = metalComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = metalWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = metalArmor;
        } else {
            spriteSheet.src = metal;
        }
    } else if (character.element === ELEMENTS.NATURE) {
        if (character.unlocked_weapon_at && character.unlocked_armor_at) {
            spriteSheet.src = natureComplete;
        } else if (character.unlocked_weapon_at) {
            spriteSheet.src = natureWeapon;
        } else if (character.unlocked_armor_at) {
            spriteSheet.src = natureArmor;
        } else {
            spriteSheet.src = nature;
        }
    } else {
        spriteSheet.src = base;
    }

    spriteSheetCache.set(cacheKey, spriteSheet);
    return spriteSheet;
}
