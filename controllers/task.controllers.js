const e = require("express")
const { sendResponse, AppError } = require("../helpers/utils.js")

const Task = require("../models/Task.js")

const taskController = {}


//Create a Task
taskController.createTask = async (req, res, next) => {
    const data = req.body
    try {
        //always remember to control your inputs
        if (!data || Object.keys(data).length === 0)
            throw new AppError(400, "Bad Request", "Create Task Error")

        //mongoose query
        const created = await Task.create(data)
        sendResponse(res, 200, true, { data: created }, null, "Create Task Success")
    } catch (err) {
        next(err)
    }
}


//Get all Task
taskController.getAllTask = async (req, res, next) => {

    try {
        //mongoose query
        const listOfFound = await Task.find({}).populate("referenceTo")
        //this to query data from the reference and append to found result.
        sendResponse(res, 200, true, { data: listOfFound }, null, "Found list of tasks success")

    } catch (err) {
        next(err)
    }
}


//Get a detailed description of a single task by id
taskController.getDetailTaskById = async (req, res, next) => {
    const { id } = req.params
    try {

        //mongoose query
        const listOfFound = await Task.find({ _id: id }).populate("referenceTo")

        sendResponse(res, 200, true, { data: listOfFound }, null, "Found list of tasks success")
    } catch (err) {
        next(err)
    }
}


//Search all tasks of 1 member either by User name
taskController.getAllTaskOfOneMember = async (req, res, next) => {
    let { userName } = req.params
    try {
        //mongoose query
        let listOfFound = await Task.find({}).populate("referenceTo")

        listOfFound = listOfFound.filter((task) => {
            if (task.referenceTo.name.toString() === userName.toString())
                return task
        })

        //this to query data from the reference and append to found result.
        sendResponse(res, 200, true, { data: listOfFound }, null, "Found list of task success")

    } catch (err) {
        next(err)
    }
}



//update add task by name for user
taskController.addReference = async (req, res, next) => {
    //in real project you will getting info from req
    const { taskName } = req.params
    const { ref } = req.body
    try {
        let found = await Task.findOne({ name: taskName })
        found.referenceTo = ref;


        //mongoose query
        found = await found.save()
        sendResponse(res, 200, true, { data: found }, null, "Add reference success")
    } catch (err) {
        next(err)
    }
}


//update status task by name for user
taskController.addStatusTask = async (req, res, next) => {
    //in real project you will getting info from req
    const { id } = req.params
    let { status, isDeleted = true } = req.body
    try {
        let found = await Task.findOne({ _id: id })
        found.status = status;

        //logic  by changing isDeleted to true
        if (status === "archive") { found.isDeleted = isDeleted } else { found.isDeleted = !isDeleted }

        //mongoose query
        found = await found.save()
        sendResponse(res, 200, true, { data: found }, null, "Add reference success")
    } catch (err) {
        next(err)
    }
}

//


//export
module.exports = taskController