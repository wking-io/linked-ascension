import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Auth/AuthController.php:19
 * @route /login
 */
export const showLogin = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ['get','head'],
    url: '\/login',
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Auth/AuthController.php:19
 * @route /login
 */
showLogin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showLogin.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Auth/AuthController.php:19
 * @route /login
 */
showLogin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showLogin.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\AuthController::showLogin
 * @see app/Http/Controllers/Auth/AuthController.php:19
 * @route /login
 */
showLogin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showLogin.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\Auth\AuthController::redirect
 * @see app/Http/Controllers/Auth/AuthController.php:24
 * @route /auth/redirect
 */
export const redirect = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ['get','head'],
    url: '\/auth\/redirect',
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::redirect
 * @see app/Http/Controllers/Auth/AuthController.php:24
 * @route /auth/redirect
 */
redirect.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return redirect.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::redirect
 * @see app/Http/Controllers/Auth/AuthController.php:24
 * @route /auth/redirect
 */
redirect.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: redirect.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\AuthController::redirect
 * @see app/Http/Controllers/Auth/AuthController.php:24
 * @route /auth/redirect
 */
redirect.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: redirect.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\Auth\AuthController::callback
 * @see app/Http/Controllers/Auth/AuthController.php:32
 * @route /auth/callback
 */
export const callback = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ['get','head'],
    url: '\/auth\/callback',
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::callback
 * @see app/Http/Controllers/Auth/AuthController.php:32
 * @route /auth/callback
 */
callback.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return callback.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\AuthController::callback
 * @see app/Http/Controllers/Auth/AuthController.php:32
 * @route /auth/callback
 */
callback.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\AuthController::callback
 * @see app/Http/Controllers/Auth/AuthController.php:32
 * @route /auth/callback
 */
callback.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: callback.url(options),
    method: 'head',
})

const AuthController = { showLogin, redirect, callback }

export default AuthController