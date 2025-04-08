import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
export const claim = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

claim.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/claim',
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
        }
    }

    const parsedArgs = {
        game: args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return claim.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:60
 * @route /games/{game}/characters/{character}/claim
 */
claim.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: claim.url(args, options),
    method: 'head',
})

export default claim