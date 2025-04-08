export interface Auth {
    user: User;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    is_admin: boolean;
    name: string;
    username: string;
    email: string;
    provider: string;
    characters?: Array<Character>;
    supportedCharacters?: Array<Character>;
}

export type UserOverview = Pick<User, 'id' | 'name' | 'username'>;

export interface Game {
    id: number;
    name: string;
    startsAt: string;
    endsAt: string;
}

export interface CharacterResponse {
    id: number;
    name: string;
    health: number;
    gameId: number;
    userId: number;
    element?: string;
    armor?: boolean;
    weapon?: boolean;
    special?: boolean;
    claimed_at?: string;
    last_acted?: string;
    expended_points: number;
    supported_by: Array<UserOverview>;
}

export interface Character {
    id: number;
    name: string;
    gameId: number;
    userId: number;
    tier: Tier;
    claimedAt: string;
    lastActed: string;
    expendedPoints: number;
    supportedBy: Array<UserOverview>;
}

interface TierZero {
    kind: 'tierZero';
}

interface TierOne {
    kind: 'tierOne';
    element: Element;
}

interface TierTwo {
    kind: 'tierTwo';
    element: Element;
    selection: 'weapon' | 'armor';
}

interface TierThree {
    kind: 'tierThree';
    element: Element;
}

interface TierFour {
    kind: 'tierFour';
    element: Element;
}

type Tier = TierZero | TierOne | TierTwo | TierThree | TierFour;
