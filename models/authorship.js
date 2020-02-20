module.exports = (sequelize, type) => {
    return sequelize.define('autorstwo', {
        id_autora: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'autor',
                key: 'id_autora'
            }
        },
        id_ksiazki: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'ksiazka',
                key: 'id_ksiazki'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    )
}