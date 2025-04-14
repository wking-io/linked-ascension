import { unlockArmor, unlockElement, unlockSpecial, unlockWeapon } from '@/actions/App/Http/Controllers/CharacterController';
import { ActionButton } from '@/components/action';
import { Box } from '@/components/box';
import { Health } from '@/components/health';
import { SupportPointsIcon } from '@/icons/support-points-icon';
import { CharacterResponse, Game } from '@/types';
import { type PageProps } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import bg from '../../../images/bg.png';

interface Props extends PageProps {
    game: Game;
    character: CharacterResponse;
    tier: number;
    next_threshold: number;
}

const SPRITE_WIDTH = 128;
const SPRITE_HEIGHT = 128;
const CANVAS_SCALE = 1;
const CANVAS_WIDTH = SPRITE_WIDTH * CANVAS_SCALE;
const CANVAS_HEIGHT = SPRITE_HEIGHT * CANVAS_SCALE;

const ELEMENTS = ['fire', 'water', 'earth', 'air', 'lightning', 'ice', 'metal', 'nature'];

function getTierOptions(tier: number, has_armor: boolean) {
    if (tier === 1) {
        return ELEMENTS;
    } else if (tier === 2) {
        return ['armor', 'weapon'];
    } else if (tier === 3) {
        return has_armor ? ['weapon'] : ['armor'];
    } else {
        return ['special'];
    }
}

export default function Upgrade({ game, character, tier, next_threshold }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = getTierOptions(tier, Boolean(character?.unlocked_armor_at?.length));
    const selectedOption = options[selectedIndex];
    const { submit, setData } = useForm();

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    };

    const handleConfirm = () => {
        // TODO: Implement confirmation logic based on tier and selected option
        console.log('Confirming upgrade:', { tier, selectedOption });
        if (tier === 1) {
            setData({ element: selectedOption });
            submit(unlockElement({ game, character }));
        } else if (tier === 2) {
            const action = selectedOption === 'armor' ? unlockArmor : unlockWeapon;
            submit(action({ game, character }));
        } else if (tier === 3) {
            const action = character?.unlocked_armor_at?.length ? unlockWeapon : unlockArmor;
            submit(action({ game, character }));
        } else {
            submit(unlockSpecial({ game, character }));
        }
    };

    return (
        <div className="flex h-[100dvh] flex-col">
            <div className="flex items-center gap-2 p-5">
                <Health className="flex-1" health={character.health} />
                <p className="flex items-center gap-2 text-2xl">
                    <SupportPointsIcon />
                    {character.support_points}/{next_threshold}
                </p>
            </div>
            <div className="relative flex-1">
                <img src={bg} className="pixelated absolute bottom-0 left-1/2 max-w-none -translate-x-1/2" width={512} height={256} />
                <canvas className="pixelated relative" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </div>
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 p-5">
                <ActionButton onClick={handlePrevious} className="w-full">
                    <ArrowLeft className="h-6 w-6" />
                </ActionButton>
                <ActionButton onClick={handleConfirm} className="col-span-1">
                    Confirm
                </ActionButton>
                <ActionButton onClick={handleNext} className="w-full">
                    <ArrowRight className="h-6 w-6" />
                </ActionButton>
                <Box className="col-span-3 p-4 text-center">
                    <h2 className="text-xl font-bold">Tier {tier} Upgrade</h2>
                    <p className="mt-2 text-lg capitalize">{selectedOption}</p>
                </Box>
            </div>
        </div>
    );
}
