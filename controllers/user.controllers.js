const { sendResponse, AppError, catchAsync } = require("../helpers/utils.js")

const User = require("../models/User.js")

const userController = {}

//Create a User
userController.createUser = catchAsync(async (req, res, next) => {

    // get data from request
    let { name, roles } = req.body

    //Process
    let user = await User.create({ name, roles })

    // response
    sendResponse(res, 200, true, user, null, "Create User Success")

});


//Get users with pagination, Get list employee,Get list manager,Search for employee by name
userController.getAllUser = catchAsync(async (req, res, next) => {

    let { page, limit, ...filter } = { ...req.query }

    let filterConditions = [{}]

    if (filter.name) {
        filterConditions.push({
            name: { $regex: filter.name, $options: "i" },
        })
    }

    if (filter.roles) {
        filterConditions.push({
            roles: { $regex: filter.roles, $options: "i" },
        })
    }

    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const count = await User.countDocuments(filterCritera)
    const totalPages = Math.ceil(count / limit);
    const offset = limit * (page - 1)

    let users = await User.find(filterCritera)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)


    sendResponse(res, 200, true, { users, totalPages, count }, null, "Found list of User success")

})


//export
module.exports = userController