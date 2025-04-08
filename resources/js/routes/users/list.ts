import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::list
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
export const list = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ['get','head'],
    url: '\/users',
}

/**
 * @see \App\Http\Controllers\UserController::list
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
list.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return list.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::list
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
list.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: list.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::list
 * @see app/Http/Controllers/UserController.php:11
 * @route /users
 */
list.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: list.url(options),
    method: 'head',
})

export default list