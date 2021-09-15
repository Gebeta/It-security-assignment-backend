const permissions = [
    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create feedback',
    'view all feedback',
    'view their feedback',
    'view feedback',
    'remove feedback',

]

const roles = {
    admin: [...permissions],
    user: [
        'view user',
        'update user',
        'create feedback',
        'view their feedback'
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
