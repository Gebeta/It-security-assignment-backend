const permissions = [
    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create feedback',
    'view all feedback',
    'update feedback',
    'view their feedback',
    'view feedback',
    'remove feedback',
    'view file'

]

const roles = {
    admin: [...permissions],
    user: [
        'view user',
        'update user',
        'update feedback',
        'create feedback',
        'view their feedback',
        'view file'
    ],
    
}

const users = [
    {
        username: 'admin',
        email: 'super@admin.com',
        password: 'superadmin',
        roles: ['admin']
    }
]

module.exports = { permissions, roles, users }
