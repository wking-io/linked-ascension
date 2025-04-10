import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
export const show = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/blessings\/{blessing}',
}

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.url = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            game: args[0],
            character: args[1],
            blessing: args[2],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
        blessing: typeof args.blessing === 'object'
            ? args.blessing.id
            : args.blessing,
    }

    return show.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace('{blessing}', parsedArgs.blessing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.get = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\BlessingController::show
 * @see app/Http/Controllers/BlessingController.php:26
 * @route /games/{game}/characters/{character}/blessings/{blessing}
 */
show.head = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show