import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
export const welcome = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

welcome.definition = {
    methods: ['get','head'],
    url: '\/character\/{character}\/welcome',
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.url = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { character: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { character: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            character: args[0],
        }
    }

    const parsedArgs = {
        character: typeof args.character === 'object'
            ? args.character.id
            : args.character,
    }

    return welcome.definition.url
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.get = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /character/{character}/welcome
 */
welcome.head = (args: { character: string | { id: string } } | [character: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: welcome.url(args, options),
    method: 'head',
})

export default welcome