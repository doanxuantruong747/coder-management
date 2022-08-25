
const { sendResponse, AppError, catchAsync } = require("../helpers/utils.js")

const Tasks = require("../models/Task.js")

const taskController = {}


//Create a Task
taskController.createTask = catchAsync(async (req, res, next) => {
    // get data from request
    let { taskName, description } = req.body

    //Process
    let task = await Tasks.create({ taskName, description, status: "pending", })

    // response
    sendResponse(res, 200, true, task, null, "Create Task Success")

});


//Get all Task & Search tasks of 1 member either by user name of referenceTo
taskController.getAllTask = catchAsync(async (req, res, next) => {
    let { page, limit, ...filter } = { ...req.query }
    const userName = req.query.userName
    let filterConditions = [{ isDeleted: false }]

    if (filter.taskName) {
        filterConditions.push({
            taskName: { $regex: filter.taskName, $options: "i" },
        })
    }

    const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};


    let tasks = await Tasks.find(filterCritera && { isDeleted: false })
        .populate("referenceTo")
        .sort({ createdAt: -1 })

    if (userName)
        tasks = tasks.filter((task) => {
            if (task.referenceTo) {
                if (userName.toLowerCase() === task.referenceTo.name.toLowerCase())
                    return task
            }
        })

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const count = tasks.length
    const totalPages = Math.ceil(count / limit);

    return sendResponse(res, 200, true, { tasks, totalPages, count }, null, "Get All Task successful")

})


//Get a detailed description of a single task by id
taskController.getDetailTaskById = catchAsync(async (req, res, next) => {
    const taskId = req.params.id;

    let task = await Tasks.findById(taskId).populate("referenceTo")

    if (!task) throw new AppError(400, "Task not found", "Get Single Task Error")

    sendResponse(res, 200, true, task, null, "tasks single successful")

});


//update add task by name for user
taskController.addReference = catchAsync(async (req, res, next) => {

    const { taskName } = req.params
    const { ref } = req.body

    let task = await Tasks.findOne({ taskName })
    task.referenceTo = ref;

    await task.save()
    sendResponse(res, 200, true, task, null, "Add reference success")

});


//update status task by name for user
taskController.updateStatusTask = catchAsync(async (req, res, next) => {

    const { id } = req.params
    let { status, isDeleted = true } = req.body

    let tasks = await Tasks.findOne({ _id: id })
    console.log('tasks:', tasks)
    tasks.status = status;

    //logic  by changing isDeleted to true
    if (status === "archive") { tasks.isDeleted = isDeleted } else { tasks.isDeleted = !isDeleted }

    //mongoose query
    tasks = await tasks.save()
    sendResponse(res, 200, true, tasks, null, "Add reference success")

})

//


//export
module.exports = taskController