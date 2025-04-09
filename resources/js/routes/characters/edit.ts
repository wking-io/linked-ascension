import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:25
 * @route /games/{game}/characters/{character}/edit
 */
export const edit = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/edit',
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:25
 * @route /games/{game}/characters/{character}/edit
 */
edit.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:25
 * @route /games/{game}/characters/{character}/edit
 */
edit.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:25
 * @route /games/{game}/characters/{character}/edit
 */
edit.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

export default edit