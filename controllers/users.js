const { User } = require('../sequelize')

exports.getUsers = (req, res) => {
    User.findAll().then(users => res.render('users', {items: users}))
}
