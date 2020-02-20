module.exports = (sequelize, type) => {
    return sequelize.define('modyfikacja',{
        id_uzytkownika: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'uzytkownik',
                key: 'id_uzytkownika'
            }
        },
        id_opracowania: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'opracowanie',
                key: 'id_opracowania'
            }
        },
        dataModyfikacji: {
            type: type.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}