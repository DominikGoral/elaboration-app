module.exports = (sequelize, type) => {
    return sequelize.define('ksiazka', {
        id_ksiazki: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tytul: {
            type: type.STRING(100),
            allowNull: false,
            unique: true
        },
        dataWydania: {
            type: type.DATEONLY
        },
        wydawnictwo: {
            type: type.STRING(100),
            allowNull: false
        },
        opis: {
            type: type.TEXT
        },
        ranga: {
            type: type.ENUM('dodatkowa', 'do wyboru', 'obowiazkowa'),
            allowNull: false
        },
        szkola: {
            type: type.ENUM('SP', 'LICEUM')
        },
        czyOpracowana: {
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}