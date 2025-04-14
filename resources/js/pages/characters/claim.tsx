import { ActionAnchor, ActionLink } from '@/components/action';
import show from '@/routes/characters/show';
import { PageProps } from '@inertiajs/core';

interface Props extends PageProps {
    character_id: string;
    game_id: string;
}

export default function Claim({ character_id, game_id }: Props) {
    return (
        <div className="mx-auto flex h-[100dvh] max-w-sm flex-col justify-end p-5">
            <div className="flex flex-1 flex-col gap-2 leading-5">
                <p>Now that you are in, there are a few things you need to know:</p>
                <ol className="*:marker:text-foreground/40 my-2.5 ml-5 list-decimal space-y-2.5 *:pl-2">
                    <li>You need to join the chat group. I made this in a week so some info will only be available there.</li>
                    <li>
                        Points are earned by meeting other attendees and having them tap your gem. The more support you have, the more powerful you
                        become.
                    </li>
                    <li>
                        Once every hour you will be able to attack another character. This will reduce their health and force them to expend points to
                        stay in the game.
                    </li>
                    <li>If your health reaches 0 you will be unable to collect support points until you are healed.</li>
                    <li>There will be more fun revealed as we go.</li>
                </ol>
                <p>If you have any questions, please join the chat group and ask away. I want this to be fun and can't wait to meet you</p>
            </div>
            <div className="mb-2.5 h-[56px]">
                <ActionAnchor href="https://t.me/+1ccKQVHfyChjMmUx" className="w-full">
                    Join The Chat Group
                </ActionAnchor>
            </div>
            <div className="h-[56px]">
                <ActionLink href={show([game_id, character_id])} className="w-full">
                    View Character
                </ActionLink>
            </div>
        </div>
    );
}
