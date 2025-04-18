import { unlockArmor, unlockElement, unlockWeapon } from '@/actions/App/Http/Controllers/CharacterController';
import { ActionButton } from '@/components/action';
import { Health } from '@/components/health';
import { SupportPointsIcon } from '@/icons/support-points-icon';
import { CharacterResponse, Game } from '@/types';
import { getElementBackground } from '@/utils/element-background';
import { elementClass } from '@/utils/element-classes';
import { elementCssVars } from '@/utils/element-css-vars';
import { ELEMENTS } from '@/utils/elements';
import { useCharacterRenderLoop } from '@/utils/use-character-render-loop';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    character: CharacterResponse;
    tier: number;
    next_threshold: number;
    game: Game;
    available_elements: string[];
}

export default function Upgrade({ game, character, tier, next_threshold, available_elements }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = tier === 1 ? available_elements : getTierOptions(tier, Boolean(character?.unlocked_armor_at?.length));
    const selectedOption = options[selectedIndex];
    const { submit, setData } = useForm();
    const previewAttribute = attributes[selectedOption as keyof typeof attributes];
    const { canvasRef, canvasWidth, canvasHeight } = useCharacterRenderLoop({
        ...character,
        ...previewAttribute,
    });
    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    };

    const handleConfirm = () => {
        if (tier === 1) {
            setData({ element: selectedOption });
            submit(unlockElement({ game, character }));
        } else if (tier === 2) {
            const action = selectedOption === 'armor' ? unlockArmor : unlockWeapon;
            submit(action({ game, character }));
        } else if (tier === 3) {
            const action = character?.unlocked_armor_at?.length ? unlockWeapon : unlockArmor;
            submit(action({ game, character }));
        }
    };

    useEffect(() => {
        if (tier === 1) {
            document.body.style.setProperty('--background', `var(--background-${selectedOption})`);
            document.body.style.setProperty('--foreground', `var(--foreground-${selectedOption})`);
        }
    }, [selectedOption, tier]);

    return (
        <div className="flex h-[100dvh] flex-col" style={tier === 1 ? elementCssVars(selectedOption) : {}}>
            <div className="flex items-center gap-2 p-5">
                <Health className="flex-1" health={character.health} />
                <p className="flex items-center gap-2 text-2xl">
                    <SupportPointsIcon />
                    {character.support_points ?? 0}/{next_threshold ?? 10}
                </p>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 text-center">
                <UpgradeHeading selection={selectedOption} />
                <UpgradeDescription selection={selectedOption} />
            </div>
            <div className="relative flex flex-col items-center overflow-hidden">
                <img
                    src={getElementBackground(selectedOption)}
                    className="pixelated absolute bottom-0 left-1/2 max-w-none -translate-x-1/2"
                    width={512}
                    height={256}
                />
                <canvas className="pixelated relative" ref={canvasRef} width={canvasWidth} height={canvasHeight} />
            </div>
            <div className="flex gap-x-3 gap-y-2 p-5">
                {[1, 2].includes(tier) && (
                    <ActionButton onClick={handlePrevious} size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </ActionButton>
                )}
                <ActionButton onClick={handleConfirm} className="flex-1">
                    Confirm
                </ActionButton>
                {[1, 2].includes(tier) && (
                    <ActionButton onClick={handleNext} size="icon">
                        <ArrowRight className="h-6 w-6" />
                    </ActionButton>
                )}
            </div>
        </div>
    );
}

const attributes = {
    fire: {
        element: ELEMENTS.FIRE,
    },
    water: {
        element: ELEMENTS.WATER,
    },
    earth: {
        element: ELEMENTS.EARTH,
    },
    air: {
        element: ELEMENTS.AIR,
    },
    lightning: {
        element: ELEMENTS.LIGHTNING,
    },
    ice: {
        element: ELEMENTS.ICE,
    },
    metal: {
        element: ELEMENTS.METAL,
    },
    nature: {
        element: ELEMENTS.NATURE,
    },
    armor: {
        unlocked_armor_at: new Date().toISOString(),
    },
    weapon: {
        unlocked_weapon_at: new Date().toISOString(),
    },
};

function getTierOptions(tier: number, has_armor: boolean): string[] {
    if (tier === 2) {
        return ['armor', 'weapon'];
    } else {
        return has_armor ? ['weapon'] : ['armor'];
    }
}

const UPGRADE_HEADINGS = {
    [ELEMENTS.FIRE]: 'Fire',
    [ELEMENTS.WATER]: 'Water',
    [ELEMENTS.EARTH]: 'Earth',
    [ELEMENTS.AIR]: 'Air',
    [ELEMENTS.LIGHTNING]: 'Lightning',
    [ELEMENTS.ICE]: 'Ice',
    [ELEMENTS.METAL]: 'Metal',
    [ELEMENTS.NATURE]: 'Nature',
    armor: 'Armor',
    weapon: 'Weapon',
} as const;

function UpgradeHeading({ selection }: { selection: string }) {
    return <h2 className="text-2xl">{UPGRADE_HEADINGS[selection as keyof typeof UPGRADE_HEADINGS]}</h2>;
}

const elementDescriptionTemplate = ({ weakness, strength }: { weakness: string; strength: string }) => (
    <>
        Attacks from <span className={elementClass(weakness)}>{weakness}</span> and attacks against{' '}
        <span className={elementClass(strength)}>{strength}</span> are double damage.
    </>
);
const UPGRADE_DESCRIPTIONS = {
    fire: elementDescriptionTemplate({ weakness: 'water', strength: 'nature' }),
    water: elementDescriptionTemplate({ weakness: 'lightning', strength: 'fire' }),
    earth: elementDescriptionTemplate({ weakness: 'air', strength: 'lightning' }),
    air: elementDescriptionTemplate({ weakness: 'ice', strength: 'earth' }),
    lightning: elementDescriptionTemplate({ weakness: 'earth', strength: 'water' }),
    ice: elementDescriptionTemplate({ weakness: 'metal', strength: 'air' }),
    metal: elementDescriptionTemplate({ weakness: 'nature', strength: 'ice' }),
    nature: elementDescriptionTemplate({ weakness: 'fire', strength: 'metal' }),
    armor: 'Double your defense and take half damage from all attacks.',
    weapon: 'Double your attack power and deal double damage on all attacks.',
};

function UpgradeDescription({ selection }: { selection: string }) {
    return <p className="text-sm">{UPGRADE_DESCRIPTIONS[selection as keyof typeof UPGRADE_DESCRIPTIONS]}</p>;
}
