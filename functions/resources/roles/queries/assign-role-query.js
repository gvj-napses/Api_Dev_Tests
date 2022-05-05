const Models = require('models')

module.exports = class assignRoleQuery {
    constructor(id,userId,roleId) {
        this.details = {
            id,
            userId,
            roleId
        }
    }

    async get() {

       // const userrole = await Models.userroles.create({id : this.details.id,userId:this.details.userId,roleId : this.details.roleId})
       const role = await Models.roles.findOne({where : {id : this.details.roleId}})
       const user = await Models.users.findOne({where : {id : this.details.userId}})
        return await user.addRole(role) 
    }
}