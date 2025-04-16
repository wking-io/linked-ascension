import { getSpriteSheet } from '@/lib/character';
import { CharacterResponse } from '@/types';
import { useEffect } from 'react';

import { useRef } from 'react';

const SPRITE_WIDTH = 256;
const SPRITE_HEIGHT = 256;
const CANVAS_SCALE = 1;
const CANVAS_WIDTH = SPRITE_WIDTH * CANVAS_SCALE;
const CANVAS_HEIGHT = SPRITE_HEIGHT * CANVAS_SCALE;
const FRAME_COUNT = 7; // Adjust based on your sprite sheet
const FPS = 8;

export function useCharacterRenderLoop(character: CharacterResponse) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const spriteImageRef = useRef<HTMLImageElement | null>(null);
    const currentFrameRef = useRef(0);
    const lastFrameTimeRef = useRef(0);

    useEffect(() => {
        const spriteSheet = getSpriteSheet(character);
        spriteImageRef.current = spriteSheet;

        const canvas = canvasRef.current;
        if (!canvas || !spriteImageRef.current) return;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

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
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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
    }, [character]);

    return { canvasRef, canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT };
}
