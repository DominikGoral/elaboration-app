module.exports = (sequelize, type) => {
    return sequelize.define('autor', {
        id_autora: {
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
        dataUr: {
            type: type.DATEONLY,
            allowNUll: false
        },
        dataSmierci: {
            type: type.DATEONLY
        },
        miejsceUr: {
            type: type.STRING(80),
            allowNull: false
        },
        narodowosc: {
            type: type.STRING(80),
            allowNull: false
        },
        biografia: {
            type: type.TEXT
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}