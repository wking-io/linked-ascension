import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:39
 * @route /games/{game}/characters/{character}/welcome
 */
export const welcome = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
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
 * @see app/Http/Controllers/CharacterController.php:39
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return welcome.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:39
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: welcome.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::welcome
 * @see app/Http/Controllers/CharacterController.php:39
 * @route /games/{game}/characters/{character}/welcome
 */
welcome.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: welcome.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
export const support = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

support.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/support',
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return support.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: support.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::support
 * @see app/Http/Controllers/CharacterController.php:63
 * @route /games/{game}/characters/{character}/support
 */
support.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: support.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::edit
 * @see app/Http/Controllers/CharacterController.php:31
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
 * @see app/Http/Controllers/CharacterController.php:31
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
 * @see app/Http/Controllers/CharacterController.php:31
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
 * @see app/Http/Controllers/CharacterController.php:31
 * @route /games/{game}/characters/{character}/edit
 */
edit.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:23
 * @route /games/{game}/characters/{character}
 */
export const show = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}',
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:23
 * @route /games/{game}/characters/{character}
 */
show.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:23
 * @route /games/{game}/characters/{character}
 */
show.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::show
 * @see app/Http/Controllers/CharacterController.php:23
 * @route /games/{game}/characters/{character}
 */
show.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:82
 * @route /games/{game}/characters/{character}/claim
 */
export const claim = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

claim.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/claim',
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:82
 * @route /games/{game}/characters/{character}/claim
 */
claim.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return claim.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:82
 * @route /games/{game}/characters/{character}/claim
 */
claim.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: claim.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::claim
 * @see app/Http/Controllers/CharacterController.php:82
 * @route /games/{game}/characters/{character}/claim
 */
claim.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: claim.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:118
 * @route /games/{game}/characters/{character}/target
 */
export const target = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: target.url(args, options),
    method: 'get',
})

target.definition = {
    methods: ['get','head'],
    url: '\/games\/{game}\/characters\/{character}\/target',
}

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:118
 * @route /games/{game}/characters/{character}/target
 */
target.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return target.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:118
 * @route /games/{game}/characters/{character}/target
 */
target.get = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: target.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CharacterController::target
 * @see app/Http/Controllers/CharacterController.php:118
 * @route /games/{game}/characters/{character}/target
 */
target.head = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: target.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
export const attack = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: attack.url(args, options),
    method: 'post',
})

attack.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/attack',
}

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
attack.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return attack.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::attack
 * @see app/Http/Controllers/CharacterController.php:131
 * @route /games/{game}/characters/{character}/attack
 */
attack.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: attack.url(args, options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:153
 * @route /games/{game}/characters/{character}/unlock-element
 */
export const unlockElement = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockElement.url(args, options),
    method: 'post',
})

unlockElement.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-element',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:153
 * @route /games/{game}/characters/{character}/unlock-element
 */
unlockElement.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockElement.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockElement
 * @see app/Http/Controllers/CharacterController.php:153
 * @route /games/{game}/characters/{character}/unlock-element
 */
unlockElement.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockElement.url(args, options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:174
 * @route /games/{game}/characters/{character}/unlock-armor
 */
export const unlockArmor = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockArmor.url(args, options),
    method: 'post',
})

unlockArmor.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-armor',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:174
 * @route /games/{game}/characters/{character}/unlock-armor
 */
unlockArmor.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockArmor.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockArmor
 * @see app/Http/Controllers/CharacterController.php:174
 * @route /games/{game}/characters/{character}/unlock-armor
 */
unlockArmor.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockArmor.url(args, options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CharacterController::unlockWeapon
 * @see app/Http/Controllers/CharacterController.php:189
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
 * @see app/Http/Controllers/CharacterController.php:189
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
 * @see app/Http/Controllers/CharacterController.php:189
 * @route /games/{game}/characters/{character}/unlock-weapon
 */
unlockWeapon.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockWeapon.url(args, options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:204
 * @route /games/{game}/characters/{character}/unlock-special
 */
export const unlockSpecial = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockSpecial.url(args, options),
    method: 'post',
})

unlockSpecial.definition = {
    methods: ['post'],
    url: '\/games\/{game}\/characters\/{character}\/unlock-special',
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:204
 * @route /games/{game}/characters/{character}/unlock-special
 */
unlockSpecial.url = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return unlockSpecial.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace('{character}', parsedArgs.character.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::unlockSpecial
 * @see app/Http/Controllers/CharacterController.php:204
 * @route /games/{game}/characters/{character}/unlock-special
 */
unlockSpecial.post = (args: { game: string | { id: string }, character: string | { id: string } } | [game: string | { id: string }, character: string | { id: string }], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: unlockSpecial.url(args, options),
    method: 'post',
})

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

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:109
 * @route /games/{game}
 */
export const store = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/games\/{game}',
}

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:109
 * @route /games/{game}
 */
store.url = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { game: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { game: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            game: args[0],
        }
    }

    const parsedArgs = {
        game: typeof args.game === 'object'
            ? args.game.id
            : args.game,
    }

    return store.definition.url
            .replace('{game}', parsedArgs.game.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CharacterController::store
 * @see app/Http/Controllers/CharacterController.php:109
 * @route /games/{game}
 */
store.post = (args: { game: string | { id: string } } | [game: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

const CharacterController = { welcome, support, edit, show, claim, target, attack, unlockElement, unlockArmor, unlockWeapon, unlockSpecial, healHeart, store }

export default CharacterController