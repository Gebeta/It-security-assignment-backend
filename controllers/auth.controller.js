
var _ = require('lodash');
var jwt = require('jsonwebtoken');


const { jwt_key } = require('../config/vars')
const userModel = require('../models/user.model')
const adminModel = require('../models/admin.model')
const roleModel = require('../models/role.model');
const { path } = require('../app');
const { populate } = require('../models/user.model');


exports.login = async (req, res, next) => {

    try {

        const user = await userModel.findOne({
            email: req.body.email
        })
        if (user && await user.verifyPassword(req.body.password)) {

            const user = await userModel.findOne({
                email: req.body.email
            }).select('-password').populate({path: 'roles', populate: { path: 'permissions' }})
            let permissions = user._doc.roles.reduce((prev, next) => {
                return [...prev, ...next.permissions.map(permission => permission.name)]
            }, [])
            user._doc.permissions = Array.from(new Set([...user._doc.permissions.map(v => v.name), ...permissions]))

            user._doc.roles = user._doc.roles.map(role => role.name)
            const userfortoken = _.pick(user, ['username', 'isAdmin','first_name', 'last_name', 'roles', 'permissions', '_id', 'email'])
            const user1 = await userModel.findOne({
                email: req.body.email
            }).select('-password')
            return res.json({
                ...user1._doc,
                token: jwt.sign({ data: userfortoken }, jwt_key, {
                    expiresIn: '7d'
                }, { algorithm: 'HS256' })
            });

        }

        throw new Error("Email/password not found")

    } catch (error) {

        res.json({
            error: true,
            message: error.message
        })
    }

}

exports.signup = async (req, res) => {

    try {

        const user = await userModel.findOne({
            email: req.body.email
        })
        if (user) {
            throw new Error("User already Exists")
        }
        const roles = await roleModel.findOne({
            name: "user"
        })
        const newUser = await new userModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            roles: roles._id,
        })

        await newUser.save()
        res.status(200).json(
            newUser
        )

    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}




exports.logout = async (req, res) => {

    try {
        req.session.destroy((err) => {
            if (err) {
                throw new Error("Something went wrong")
            }
            res.send("your logged out")
        });

    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.adminLogin = async (req, res, next) => {
    try {
        const user = await adminModel.findOne({
            email: req.body.email
        })
        if (user && await user.verifyPassword(req.body.password)) {
            const user = await adminModel.findOne({
                email: req.body.email
            }).select('-password').populate({path: 'roles', populate: { path: 'permissions' }})
            let permissions = user._doc.roles.reduce((prev, next) => {
                return [...prev, ...next.permissions.map(permission => permission.name)]
            }, [])
            user._doc.permissions = Array.from(new Set([...user._doc.permissions.map(v => v.name), ...permissions]))

            user._doc.roles = user._doc.roles.map(role => role.name)
            // const userfortoken = _.pick(user, ['username','roles', '_id', 'email'])
            const userfortoken = _.pick(user, ['username','isAdmin', 'roles', 'permissions', '_id', 'email'])
            return res.json({
                
                ...user._doc,
                token: jwt.sign(
                    { data: userfortoken },
                    jwt_key,
                    { expiresIn: '2h' },
                    { algorithm: 'HS256' })
            });
        }
        throw new Error("Email/password not found")

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

