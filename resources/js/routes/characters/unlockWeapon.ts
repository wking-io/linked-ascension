import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::unlockWeapon
 * @see app/Http/Controllers/CharacterController.php:186
 * @route /games/{game}/characters/{character}/unlock-weapon
 */
export const unlockWeapon = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockWeapon.url(args, options),
    method: 'post',
})

unlockWeapon.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-weapon',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockWeapon
 * @see app/Http/Controllers/CharacterController.php:186
 * @route /games/{game}/characters/{character}/unlock-weapon
 */
unlockWeapon.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockWeapon.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockWeapon
 * @see app/Http/Controllers/CharacterController.php:186
 * @route /games/{game}/characters/{character}/unlock-weapon
 */
unlockWeapon.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockWeapon.url(args, options),
    method: 'post',
})

export default unlockWeapon