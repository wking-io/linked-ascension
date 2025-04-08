import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
export const welcome = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

welcome.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/welcome',
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.url = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return welcome.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.get = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:29
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.head = (args: { game: string | number, character: string | { id: string } } | [game: string | number, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: welcome.url(args, options),
    method: 'head',
})

export default welcome