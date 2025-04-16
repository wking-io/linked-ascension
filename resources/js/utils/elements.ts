export const ELEMENTS = {
    FIRE: 'fire',
    WATER: 'water',
    EARTH: 'earth',
    AIR: 'air',
    LIGHTNING: 'lightning',
    ICE: 'ice',
    METAL: 'metal',
    NATURE: 'nature',
} as const;

export type Element = (typeof ELEMENTS)[keyof typeof ELEMENTS];

const ELEMENT_WEAKNESSES: Record<Element, Element> = {
    [ELEMENTS.FIRE]: ELEMENTS.WATER,
    [ELEMENTS.WATER]: ELEMENTS.LIGHTNING,
    [ELEMENTS.EARTH]: ELEMENTS.AIR,
    [ELEMENTS.AIR]: ELEMENTS.ICE,
    [ELEMENTS.LIGHTNING]: ELEMENTS.EARTH,
    [ELEMENTS.ICE]: ELEMENTS.METAL,
    [ELEMENTS.METAL]: ELEMENTS.NATURE,
    [ELEMENTS.NATURE]: ELEMENTS.FIRE,
};

const ELEMENT_STRENGTHS: Record<Element, Element> = {
    [ELEMENTS.FIRE]: ELEMENTS.NATURE,
    [ELEMENTS.WATER]: ELEMENTS.FIRE,
    [ELEMENTS.EARTH]: ELEMENTS.LIGHTNING,
    [ELEMENTS.AIR]: ELEMENTS.EARTH,
    [ELEMENTS.LIGHTNING]: ELEMENTS.WATER,
    [ELEMENTS.ICE]: ELEMENTS.AIR,
    [ELEMENTS.METAL]: ELEMENTS.ICE,
    [ELEMENTS.NATURE]: ELEMENTS.METAL,
};

export function getElementWeakness(element: Element): Element {
    return ELEMENT_WEAKNESSES[element];
}

export function getElementStrength(element: Element): Element {
    return ELEMENT_STRENGTHS[element];
}

export function isElementWeakness(attacker: Element, defender: Element): boolean {
    return getElementWeakness(defender) === attacker;
}

export function isElementStrength(attacker: Element, defender: Element): boolean {
    return getElementStrength(attacker) === defender;
}

export function getElementDamageMultiplier(attacker: Element, defender: Element): number {
    if (isElementWeakness(attacker, defender)) {
        return 0.5; // Double damage for weakness
    }
    if (isElementStrength(attacker, defender)) {
        return 2; // Double damage for strength
    }
    return 1; // Normal damage
}
