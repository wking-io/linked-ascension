import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::healHeart
 * @see app/Http/Controllers/CharacterController.php:219
 * @route /games/{game}/characters/{character}/heal-heart
 */
export const healHeart = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: healHeart.url(args, options),
    method: 'post',
})

healHeart.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/heal-heart',
}

/**
 * @see \App\Http\Controllers\CharacterController::healHeart
 * @see app/Http/Controllers/CharacterController.php:219
 * @route /games/{game}/characters/{character}/heal-heart
 */
healHeart.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return healHeart.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::healHeart
 * @see app/Http/Controllers/CharacterController.php:219
 * @route /games/{game}/characters/{character}/heal-heart
 */
healHeart.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: healHeart.url(args, options),
    method: 'post',
})

export default healHeart