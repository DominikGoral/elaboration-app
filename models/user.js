module.exports = (sequelize, type) => {
    return sequelize.define('uzytkownik', {
        id_uzytkownika: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        imie: {
            type: type.STRING(45),
            allowNull: false
        },
        nazwisko: {
            type: type.STRING(45),
            allowNull: false
        },
        dataUr: type.DATEONLY,
        szkola:type.ENUM('SP','LICEUM'),
        login: {
            type: type.STRING(20),
            allowNull: false,
            unique: true
        },
        haslo: {
            type: type.STRING(16),
            allowNull: false,
            validate: {
                len: [8, 16]
            }
        },
        typ: type.ENUM('uczen', 'ekspert', 'administrator'),
        zweryfikowany: {
            type: type.BOOLEAN,
            allowNull: false
        },
        numerKarty: {
            type: type.STRING(16),
            validate: {
                isCreditCard: true
            }
        }, 
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}