import Action from '@/components/action';
import { useEffect, useRef, useState } from 'react';

const welcomeText = [
    "Well aren't we a lucky traveler. You have found a coveted character gem. One of eight currently scattered around the venue. Listen carefully to what I am about to tell you. A game of connections and combat is underway and here is what you need to earn your way to the top.",
    'By claiming this character you will enter a game of Linked Ascension. The goal? Be the character with the most points by the end of the conference. The catch? The only way to gain points is to meet others and earn their support by tapping the gem you now have in your possession.',
    'As you collect more points your character will increase in strength. Why? Because throughout the rest of this game you and the other players will be attempting to bring each other down. So I would highly recommend growing your strength as quickly as you can.',
    "New powers, improved stats, and hidden power up's that could change the dynamic of the game for the player who uncovers them are in your future. Does this sound like fun? I haven't even gotten to the rewards yet.",

    `A set of rewards await the top 3. In order of ranking they will choose from the following:\n- Free ticket to next React Miami\n- $200 of Cloudflare Credits\n- $200 of Vercel Credits`,

    'Soooooo, you in or not? If not just put the character gem back where you found it and go be lame somewhere else.',
];

export default function Welcome() {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLine, setCurrentLine] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showContinue, setShowContinue] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
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
        <div className="mx-auto flex max-w-sm flex-col justify-end p-5">
            <canvas ref={canvasRef} className="h-[364px] w-full" />
            <div className="relative mb-5 min-h-[240px]">
                <div className="flex flex-col gap-2">
                    {currentText.split('\n').map((line, i) => (
                        <div key={i}>
                            {line}
                            {i < currentText.split('\n').length - 1 && <br />}
                        </div>
                    ))}
                </div>
                {showContinue && (
                    <div className="border-t-foreground absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 animate-bounce border-8 border-b-0 border-transparent" />
                )}
            </div>
            <Action onClick={handleContinue} className="w-full">
                Continue
            </Action>
        </div>
    );
}
