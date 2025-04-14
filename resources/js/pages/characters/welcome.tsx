import { ActionButton, ActionLink } from '@/components/action';
import { Title } from '@/components/title';
import { DialogueArrow } from '@/icons/dialogue-arrow-icon';
import type { PageProps } from '@inertiajs/core';
import claim from '@routes/characters/claim';
import { useEffect, useRef, useState } from 'react';
import bg from '../../../images/bg.png';
import spriteSheet from '../../../images/gem.png';

const SPRITE_WIDTH = 128; // Adjust based on your sprite dimensions
const SPRITE_HEIGHT = 128;
const CANVAS_SCALE = 1;
const CANVAS_WIDTH = SPRITE_WIDTH * CANVAS_SCALE;
const CANVAS_HEIGHT = SPRITE_HEIGHT * CANVAS_SCALE;
const FRAME_COUNT = 12; // Adjust based on your sprite sheet
const FPS = 16;

const welcomeText = [
    "Well aren't we a lucky traveler. You have found a coveted character gem. One of eight currently scattered around the venue. Listen carefully to what I am about to tell you. A game of connections and combat is underway and here is what you need to earn your way to the top.",
    'By claiming this character you will enter a game of Linked Ascension. The goal? Be the character with the most points by the end of the conference. The catch? The only way to gain points is to meet others and earn their support by tapping the gem you now have in your possession.',
    'As you collect more points your character will increase in strength. Why? Because throughout the rest of this game you and the other players will be attempting to bring each other down. So I would highly recommend growing your strength as quickly as you can.',
    "New powers, improved stats, and hidden power up's that could change the dynamic of the game for the player who uncovers them are in your future. Does this sound like fun? I haven't even gotten to the rewards yet.",

    `A set of rewards await the top 3. In order of ranking they will choose from the following:\n- Free ticket to next React Miami\n- $100 to Laravel Cloud and a free ticket to Laracon US\n- $5,000 in Cloudflare Credits`,

    'Soooooo, you in or not? If not just put the character gem back where you found it and go be lame somewhere else.',
];

interface Props extends PageProps {
    game_id: string;
    character_id: string;
}

export default function Welcome({ game_id, character_id }: Props) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showContinue, setShowContinue] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const spriteImageRef = useRef<HTMLImageElement | null>(null);
    const currentFrameRef = useRef(0);
    const lastFrameTimeRef = useRef(0);
    const isLastLine = currentLine === welcomeText.length - 1;

    useEffect(() => {
        const img = new Image();
        img.src = spriteSheet;
        spriteImageRef.current = img;

        const canvas = canvasRef.current;
        if (!canvas || !spriteImageRef.current) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = (timestamp: number) => {
            if (!lastFrameTimeRef.current) {
                lastFrameTimeRef.current = timestamp;
            }

            const elapsed = timestamp - lastFrameTimeRef.current;
            const frameInterval = 1000 / FPS;

            if (elapsed > frameInterval) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate current frame
                currentFrameRef.current = (currentFrameRef.current + 1) % FRAME_COUNT;

                // Draw current frame
                const sourceX = currentFrameRef.current * SPRITE_WIDTH;
                if (spriteImageRef.current) {
                    ctx.drawImage(spriteImageRef.current, sourceX, 0, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                }

                lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (currentLine >= welcomeText.length) return;

        const currentLineText = welcomeText[currentLine];

        if (isTyping) {
            if (currentIndex < currentLineText.length) {
                const timeout = setTimeout(() => {
                    setCurrentText((prev) => prev + currentLineText[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);
                }, 30);

                return () => clearTimeout(timeout);
            } else {
                setIsTyping(false);
                setShowContinue(welcomeText.length - 1 > currentLine);
            }
        }
    }, [currentIndex, currentLine, isTyping]);

    const handleContinue = () => {
        if (isTyping) {
            setIsTyping(false);
            setShowContinue(welcomeText.length - 1 > currentLine);
            const currentLineText = welcomeText[currentLine];
            setCurrentText(currentLineText);
            setCurrentIndex(currentLineText.length);
        } else {
            setCurrentText('');
            setCurrentIndex(0);
            setCurrentLine((prev) => prev + 1);
            setIsTyping(true);
            setShowContinue(false);
        }
    };

    return (
        <div className="mx-auto flex h-[100dvh] max-w-sm flex-col justify-end p-5">
            <div className="flex flex-1 items-center justify-center">
                <Title className="-translate-y-4" />
            </div>
            <div className="relative mb-5 flex flex-col items-center overflow-hidden">
                <img src={bg} className="pixelated absolute bottom-0 left-1/2 max-w-none -translate-x-1/2" width={512} height={256} />
                <canvas ref={canvasRef} className="pixelated relative" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </div>
            <div className="relative mb-5 min-h-[240px]">
                <div className="flex flex-col gap-2">
                    {currentText.split('\n').map((line, i) => (
                        <div key={i}>
                            {line}
                            {i < currentText.split('\n').length - 1 && <br />}
                        </div>
                    ))}
                </div>
                {showContinue && <DialogueArrow className="absolute -bottom-1 left-1/2 -translate-x-1/2 animate-bounce" />}
            </div>
            {isLastLine ? (
                <ActionLink href={claim([game_id, character_id])} className="w-full">
                    Claim Character
                </ActionLink>
            ) : (
                <ActionButton onClick={handleContinue} className="w-full">
                    Continue
                </ActionButton>
            )}
        </div>
    );
}
