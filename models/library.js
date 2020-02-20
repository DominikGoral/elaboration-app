module.exports = (sequelize, type) => {
    return sequelize.define('biblioteka', {
        id_biblioteki: {
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_uzytkownika: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'uzytkownik',
                key: 'id_uzytkownika'
            }
        },
        id_opracowania: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'opracowanie',
                key: 'id_opracowania'
            }
        },
        dataDodania: {
            type: type.DATE,
            allowNull: false
        },
        dataUsuniecia: {
            type: type.DATE
        },
        czyUlubiona: {
            type: type.BOOLEAN
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}