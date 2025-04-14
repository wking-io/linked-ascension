import { BlessingType, CharacterResponse, Element } from '@/types';
import { isElementStrength, isElementWeakness } from '@/utils/elements';

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
