import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
export const claim = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: claim.url(args, options),
    method: 'post',
})

claim.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/blessings\/{blessing}\/claim',
}

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
claim.url = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return claim.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace('{blessing}', parsedArgs.blessing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\BlessingController::claim
 * @see app/Http/Controllers/BlessingController.php:61
 * @route /games/{game}/characters/{character}/blessings/{blessing}/claim
 */
claim.post = (args: { game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }, blessing: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: claim.url(args, options),
    method: 'post',
})

export default claim