const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const session = require('express-session')
const { Op } = require('sequelize')
const { check, validationResult } = require('express-validator')
const { User, Elaboration, Author, Library, Book, Modification, Authorship, Sequelize, sequelize } = require('./sequelize')
const usersRoutes = require('./routes/users')
const elaborationsRoutes = require('./routes/elaborations')
const librariesRoutes = require('./routes/libraries')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

// Global variable for userId
let userId = 0
let modifiedElaborationId = 0
let insertedElaborationId = 0
let userLoggedIn = false
let expertLoggedIn = false
let firstName = ""
let surname = ""


app.engine('hbs', hbs({extname: 'hbs', defaultLayout:'layout', layoutsDir: __dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// Associations
Elaboration.belongsTo(Book, {
    foreignKey: 'id_ksiazki',
    allowNull: true
})
Author.belongsToMany(Book, { through: 'autorstwo', foreignKey: 'id_autora'})
Book.belongsToMany(Author, { through: 'autorstwo', foreignKey: 'id_ksiazki'})
Authorship.belongsTo(Book, { foreignKey: 'id_ksiazki'})
Authorship.belongsTo(Author, { foreignKey: 'id_autora'})
User.belongsToMany(Elaboration, { through: 'modyfikacja', foreignKey: 'id_uzytkownika'})
Elaboration.belongsToMany(User, { through: 'modyfikacja', foreignKey: 'id_opracowania'})
Modification.belongsTo(User, { foreignKey: 'id_uzytkownika'})
Modification.belongsTo(Elaboration, { foreignKey: 'id_opracowania'})
User.belongsToMany(Elaboration, { through: 'biblioteka', foreignKey: 'id_uzytkownika'})
Elaboration.belongsToMany(User, { through: 'biblioteka', foreignKey: 'id_opracowania'})
Library.belongsTo(User, { foreignKey: 'id_uzytkownika'})
Library.belongsTo(Elaboration, { foreignKey: 'id_opracowania'})

// Sesja
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    res.locals.userLoggedIn = userLoggedIn
    res.locals.expertLoggedIn = expertLoggedIn
    res.locals.firstName = firstName
    res.locals.surname = surname
    next()
})

// Routes
app.use('/users', usersRoutes)
app.use('/elaborations', elaborationsRoutes)
app.use('/mylibrary', librariesRoutes)


// API ENDPOINTS
const port = 8020
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
app.get('/', function(req, res, next){
    res.render('index')
})
// API ENDPOINTS for login and register page
app.get('/loginform', (req, res) => {
    res.render('login-form')
})
app.get('/registerform', (req, res) => {
    res.render('register-form')
})
app.post('/login', (req, res) => {
    res.json(req.body)
})
// Rejestracja
app.post('/register', [
    check('password').isLength({ min: 8, max: 20 }),
], (req, res) => {
    var firstName = req.body.firstname
    var surname = req.body.surname
    var dataOfBirth = req.body.dataOfBirth
    var school = req.body.school
    var userName = req.body.username
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    var userType = req.body.type
//    var creditCard = req.body.creditCard
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if(password == confirmPassword) {
        User.findOne({ where: { login: userName }}).then(result => {
            if(!result == null) {
                res.send('Użytkownik o podanym loginie już istnieje')
            } else {
                if(userType == 'uczen') {
                    User.create({
                        imie: firstName,
                        nazwisko: surname,
                        dataUr: dataOfBirth,
                        szkola: school,
                        login: userName,
                        haslo: password,
                        typ: userType,
                        zweryfikowany: 1,
                        //numerKarty: creditCard                    
                    })
                    res.redirect('/loginform')
                } else {
                    User.create({
                        imie: firstName,
                        nazwisko: surname,
                        dataUr: dataOfBirth,
                        szkola: school,
                        login: userName,
                        haslo: password,
                        typ: userType,
                        zweryfikowany: 0,
                        //numerKarty: creditCard                    
                    })
                    res.redirect('/loginform')
                }
            }
        })
    } else {
        res.send('Hasła nie są równe')
    }
})
// Logowanie
app.post('/auth', (req, res) => {
    var userName = req.body.username
    var password = req.body.password
    if(userName && password) {
        User.findAll({where: {login: userName, haslo: password}}).then(results => {
            if(results.length > 0) {
                //userId = results[0]['id_uzytkownika']
                //console.log(userId)
                req.session.userId = results[0]['id_uzytkownika']
                req.session.loggedin = true
                req.session.username = userName
                req.session.usertype = results[0]['typ']
                firstName = results[0]['imie']
                surname = results[0]['nazwisko']
                console.log(firstName)
                console.log(surname)
                if(req.session.usertype == 'uczen') {
                    userLoggedIn = true
                    console.log(userLoggedIn)
                } else {
                    expertLoggedIn = true
                    console.log(expertLoggedIn)
                }
                if(req.session.usertype == 'uczen'){
                    res.redirect('/mylibrary/all')
                } else {
                    res.redirect('elaborations/update')
                }
            } else {
                res.send('Incorrect Username and/or Password!')
            }
            res.end()
        }
        )
    } else {
        res.send('Please enter Username and Password!')
        res.end()
    }
})
// Wylogowywanie
app.get('/logout', (req, res) => {
    req.session.destroy()
    userLoggedIn = false
    expertLoggedIn = false
    firstName = ""
    surname = ""
    res.redirect('/')
})
/*
app.get('/libraries', (req, res) => {
    Library.findAll({
        include: [{
            model: User
        },
        {
            model: Elaboration
        }
        ]
    }).then(libraries => res.json(libraries))
})

app.get('/modifications', (req, res) => {
    Modification.findAll({
        include: [{
            model: User
        },
        {
            model: Elaboration
        }
        ]
    }).then(modifications => res.json(modifications))
})
app.get('/authorships', (req, res) => {
    Authorship.findAll({
        include: [{
            model: Author
        },
        {
            model: Book
        }
        ]
    }).then(authorships => res.json(authorships))
})

app.get('/users/:szkola', (req, res) => {
    User.findAll({ where: { szkola: req.params.szkola }}).then(users => res.render('index', { items: users}))
})
*/
