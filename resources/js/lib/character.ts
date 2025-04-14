import { CharacterResponse } from '@/types';

export function attackPower(character: CharacterResponse) {
    return character.unlocked_weapon_at ? 2 : 1;
}

export function defensePower(character: CharacterResponse) {
    return character.unlocked_armor_at ? 1 : 0;
}

export function calculateDamage(character: CharacterResponse, target: CharacterResponse) {
    return target.health - (attackPower(character) - defensePower(target));
}
