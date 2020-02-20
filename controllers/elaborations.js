const { Elaboration, Book, Authorship, Author, Modification } = require('../sequelize')
const { Op } = require('sequelize')
const { index } = require('../index')

exports.getElaborations = (req, res) => {
    if(req.session.usertype == 'uczen') {
        Elaboration.findAll({ include: [{
            model: Book,
            where: {
                czyOpracowana: 1
            }
        }], 
            where: { zatwierdzone: 1}}).then(elaborations => {
            console.log('opracowanie-uczen')
            res.render('elaborations-user', {items: elaborations})
        })
    } else if(req.session.usertype == 'administrator') {
        res.render('administrator')
    } else if(req.session.usertype == 'ekspert') {
        Elaboration.findAll({ include: [{
            model: Book,
            where: {
                czyOpracowana: 1
            }
        }]}).then(elaborations => {
            console.log('opracowanie-ekspert')
            res.render('elaborations-ekspert', { items: elaborations })
        })
    } else {
        res.redirect('/')
    }
}

exports.getElaborationById = (req, res) => {
    modifiedElaborationId = req.params.id
    if(req.session.usertype == 'uczen') {
        Elaboration.findOne({ include: [{
            model: Book
        }
        ], where: {
            id_opracowania: modifiedElaborationId
        }}).then(result => {
            console.log(modifiedElaborationId)
            res.render('elaboration-user', { item: result})})
    } else if(req.session.usertype == 'ekspert') {
        Elaboration.findOne({ include: [{
            model: Book
        }
        ], where: {
            id_opracowania: modifiedElaborationId
        }}).then(result => {
            console.log(modifiedElaborationId)
            res.render('updateElaboration-form', { item: result})})
    }
}

exports.getElaborationsToDo = (req, res) => {
    if(req.session.usertype == 'ekspert') {
        Authorship.findAll({ include: [{
            model: Book,
            where: {
                czyOpracowana: 0
            }
        },{
            model: Author
        }]}).then(results => res.render('create-elaboration', { items: results}))
    } else {
        res.redirect('/')
    }
}

exports.getElaborationToDoById = (req, res) => {
    insertedElaborationId = req.params.id
    if(req.session.usertype == 'ekspert') {
        Elaboration.findOne({ where: { id_ksiazki: insertedElaborationId }})
        .then(result => {
            //console.log(modifiedElaborationId)
            res.render('createElaboration-form', { item: result })
        })
    } else {
        res.redirect('/')
    }
}

exports.updateElaboration = (req, res) => {
    console.log(modifiedElaborationId)
    var genesis = req.body.genesis
    var plan = req.body.plan
    var summary = req.body.summary
    var extraSummary = req.body.extraSummary
    var characteristic = req.body.characteristic
    var change = req.body.change
    console.log(modifiedElaborationId)
    if(req.session.usertype == 'ekspert') {
        Elaboration.update({
            genezaPows: genesis,
            planWydarzen: plan,
            streszczenie: summary,
            streszczenieSzcz: extraSummary,
            charakterystyka: characteristic,
            zmiana: change,
            zatwierdzone: 0
        },
        {
            where: {
                id_opracowania: modifiedElaborationId
            }
        })
        .then(result => {
            console.log(modifiedElaborationId)
            res.redirect('/elaborations/update')
        })
    } else {
        res.redirect('/')
    }
}
exports.createElaboration = (req, res) => {
    console.log(insertedElaborationId)
    var genesis = req.body.genesis
    var plan = req.body.plan
    var summary = req.body.summary
    var extraSummary = req.body.extraSummary
    var characteristic = req.body.characteristic
    var change = req.body.change
    if(req.session.usertype == 'ekspert') {
        Elaboration.findOne({ where: { id_ksiazki: insertedElaborationId }})
        .then(result => {
            if(result == null) {
                Elaboration.create({
                    genezaPows: genesis,
                    planWydarzen: plan,
                    streszczenie: summary,
                    streszczenieSzcz: extraSummary,
                    charakterystyka: characteristic,
                    zmiana: change,
                    id_ksiazki: insertedElaborationId,
                    zatwierdzone: 0
                })
                res.redirect('/elaborations/create')
            } else {
                Elaboration.update({
                    genezaPows: genesis,
                    planWydarzen: plan,
                    streszczenie: summary,
                    streszczenieSzcz: extraSummary,
                    charakterystyka: characteristic,
                    zmiana: change,
                    zatwierdzone: 0
                },
                {
                    where: {
                        id_opracowania: insertedElaborationId
                    }
                })
                .then(result => {
                    console.log(insertedElaborationId)
                    res.redirect('/elaborations/create')
                })
            }
        })
    } else {
        res.redirect('/')
    }
    
}

exports.searchElaborations = (req, res) => {
    console.log('searchElaboration')
    var title = req.body.title
    var schoolType = req.body.schoolType
    if(req.session.usertype == 'ekspert') {
        if(schoolType == "") {
            Elaboration.findAll({ include: [{
                model: Book,
                where: {
                    tytul: {
                        [Op.startsWith]: title
                    }
                }
            }], where: { zatwierdzone: 1}
            }).then(elaborations => res.render('elaborations-ekspert', { items: elaborations }))
        } else {
            Elaboration.findAll({ include: [{
                model: Book,
                where: {
                    tytul: {
                        [Op.startsWith]: title
                    },
                    szkola: schoolType
                }
            }], where: { zatwierdzone: 1}
            }).then(elaborations => res.render('elaborations-ekspert', { items: elaborations }))
        }
    } else if(req.session.usertype == 'uczen') {
        if(schoolType == "") {
            Elaboration.findAll({ include: [{
                model: Book,
                where: {
                    tytul: {
                        [Op.startsWith]: title
                    }
                }
            }], where: { zatwierdzone: 1}
            }).then(elaborations => res.render('elaborations-user', { items: elaborations }))
        } else {
            Elaboration.findAll({ include: [{
                model: Book,
                where: {
                    tytul: {
                        [Op.startsWith]: title
                    },
                    szkola: schoolType
                }
            }], where: { zatwierdzone: 1}
            }).then(elaborations => res.render('elaborations-user', { items: elaborations }))
        }
    } else {
        res.redirect('/')
    }
}