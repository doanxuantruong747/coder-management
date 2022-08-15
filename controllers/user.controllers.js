const { sendResponse, AppError } = require("../helpers/utils.js")

const User = require("../models/User.js")

const userController = {}
//Create a User
userController.createUser = async (req, res, next) => {

    const { name, roles } = req.body
    const data = { name, roles }
    try {

        //always remember to control your inputs
        if (!data) throw new AppError(402, "Bad Request", "Create User Error")
        //mongoose query
        const created = await User.create(data)
        sendResponse(res, 200, true, { data: created }, null, "Create User Success")
    } catch (err) {
        next(err)
    }
}


//Get all your User
userController.getAllUser = async (req, res, next) => {
    try {
        //mongoose query
        const listOfFound = await User.find({})
        sendResponse(res, 200, true, { data: listOfFound }, null, "Found list of User success")
    } catch (err) {
        next(err)
    }
}


//Get all your employee
userController.getAllUserEmployee = async (req, res, next) => {

    const filter = { roles: "employee" }
    try {
        //mongoose query
        const listOfFound = await User.find(filter)
        sendResponse(res, 200, true, { data: listOfFound }, null, "Found list of User success")
    } catch (err) {
        next(err)
    }
}


//Search for an employee by name
userController.getNameUserEmployee = async (req, res, next) => {

    let { targetName } = req.params

    try {
        //mongoose query
        let data = await (await User.find({ roles: "employee" })).filter((user) => {
            if (user.name.toLowerCase() === targetName.toLowerCase())
                // if (user.name.toLowerCase().includes(targetName.toLowerCase()))
                return user
        })

        if (!data) { throw new AppError(403, "data null") }

        sendResponse(res, 200, true, { data: data }, null, "Search User success")
    } catch (err) {
        next(err)
    }
}



//export
module.exports = userController