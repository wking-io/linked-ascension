import create from './create'
import store from './store'
import edit from './edit'
import show from './show'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/games',
}

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GameController::index
 * @see app/Http/Controllers/GameController.php:15
 * @route /games
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const games = {
    create, 
    store, 
    edit, 
    index, 
    show,
}

export default games