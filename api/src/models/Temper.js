const {DataTypes, UUIDV4} = require('sequelize')

module.exports = (Sequelize) => {
    Sequelize.define('Temper',{
        // id : {
        //     type : DataTypes.UUID,
        //     defaultValue : UUIDV4,
        //     allowNull : false,
        //     primaryKey : true
        // }, El id se genera solo
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    })
}