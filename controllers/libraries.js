const { Library, Book, User, Elaboration, sequelize } = require('../sequelize')
const { index } = require('../index')

exports.getMyLibrary = (req, res) => {
    if(req.session.usertype == 'uczen') {
        Library.findAll({ include: [{
            model: User
        },
        {
            model: Elaboration,
            include: Book
        }
        ], where: { id_uzytkownika: req.session.userId }}).then(results => {
            res.render('mylibrary', { items: results })
        })
    } else {
        res.redirect('/')
    }
}

exports.addToLibrary = (req, res) => {
    var elaborationId = req.params.id
    if(req.session.usertype == 'uczen') {
        Library.findAll({ attributes: ['id_opracowania'], where: {
            id_uzytkownika: req.session.userId
         }}).then(result => {
            for(i = 0; i < result.length; i++) {
                if(result[i]['id_opracowania'] == elaborationId) {
                    res.redirect('/mylibrary/all')
                }
            }
            Library.create({
                id_opracowania: elaborationId,
                id_uzytkownika: req.session.userId,
                dataDodania: new Date()   
            })
         }).then(
            res.redirect('/mylibrary/all')
        )
    } else {
        res.redirect('/')
    }
}

exports.deleteBook = (req, res, next) => {
    if(req.session.usertype == 'uczen') {
        Library.findOne({ where : { id_uzytkownika: req.session.userId, id_opracowania: req.params.id }}).then(result => {
            result.destroy()
        }).then(() => {
            res.redirect('/mylibrary/all')
        })
    } else {
        res.redirect('/')
    }
}