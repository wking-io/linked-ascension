import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
export const attack = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: attack.url(args, options),
    method: 'post',
})

attack.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/attack',
}

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
attack.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return attack.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
attack.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: attack.url(args, options),
    method: 'post',
})

export default attack