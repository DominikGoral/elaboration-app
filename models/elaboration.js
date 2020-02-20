module.exports = (sequelize, type) => {
    return sequelize.define('opracowanie', {
        id_opracowania: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genezaPows: {
            type: type.TEXT
        },
        planWydarzen: {
            type: type.TEXT
        },
        streszczenie: {
            type: type.TEXT
        },
        streszczenieSzcz: {
            type: type.TEXT
        },
        charakterystyka: {
            type: type.TEXT
        },
        zatwierdzone: {
            type: type.BOOLEAN,
            allowNull: false
        },
        zmiana: {
            type: type.TEXT
        },
        id_ksiazki: {
            type: type.INTEGER,
            allowNull: false,
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