const Models = require('models')

module.exports = class getallUsersQuery {
    constructor() {
        
    }

    get() {
        return Models.users.findAll({attributes : {exclude : ['id']}})
    }
}