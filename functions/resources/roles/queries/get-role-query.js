const Models = require('models')

module.exports = class getRoleQuery {
    constructor(roleId) {
        this.details = {
            roleId
        }
    }

     get() {

       return  Models.roles.findAll({include : [{model : Models.users}],where : {id : this.details.roleId}})
    }
}