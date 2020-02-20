const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const BookModel = require('./models/book');
const AuthorModel = require('./models/author');
const ElaborationModel = require('./models/elaboration');
const LibraryModel = require('./models/library');
const ModificationModel = require('./models/modification');
const AuthorshipModel = require('./models/authorship');


const sequelize = new Sequelize('opracowanie_db', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = UserModel(sequelize, Sequelize);
const Book = BookModel(sequelize, Sequelize);
const Author = AuthorModel(sequelize, Sequelize);
const Elaboration = ElaborationModel(sequelize, Sequelize);
const Library = LibraryModel(sequelize, Sequelize);
const Modification = ModificationModel(sequelize, Sequelize);
const Authorship = AuthorshipModel(sequelize, Sequelize);

//sequelize.sync();

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Author,
  Book,
  Elaboration,
  Library,
  Modification,
  Authorship,
  Sequelize,
  sequelize
}

