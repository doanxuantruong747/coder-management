
const { sendResponse, AppError, catchAsync } = require("../helpers/utils.js")

const Tasks = require("../models/Task.js")

const taskController = {}


//Create a Task
taskController.createTask = catchAsync(async (req, res, next) => {
    // get data from request
    let { taskName, description } = req.body

    let task = await Tasks.findOne({ taskName })
    if (task) throw new AppError(400, "Task already exists", "Create Task Error")

    //Process
    task = await Tasks.create({ taskName, description, status: "pending", })

    // response
    sendResponse(res, 200, true, task, null, "Create Task Success")

});


//Get all Task & Search tasks of 1 member either by user name of assignee 
taskController.getAllTask = catchAsync(async (req, res, next) => {
    let { page, limit, userName, taskName, ...filter } = req.query


    const filterKeys = Object.keys(filter);
    if (filterKeys.length)
        throw new AppError(400, "Not accepted query", "Bad Request");


    let tasks = await Tasks.find({ isDeleted: false })
        .populate("assignee")
        .sort({ createdAt: -1 })

    if (userName)
        tasks = tasks.filter((task) => {
            if (task.assignee) {
                return (task.assignee.name.toLowerCase().includes(userName.toLowerCase()))
            }
        })

    if (taskName)
        tasks = tasks.filter((task) => {
            if (task.taskName) {
                return (task.taskName.toLowerCase().includes(taskName.toLowerCase()))
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

    let task = await Tasks.findOne({ taskId }).populate("assignee")

    if (!task) throw new AppError(400, "Task not found", "Get Single Task Error")

    sendResponse(res, 200, true, task, null, "tasks single successful")

});


//update add task by name for user
taskController.addAssignee = catchAsync(async (req, res, next) => {

    const { taskName } = req.params;
    let { ref } = req.body;

    let task = await Tasks.findOne({ taskName }).populate("assignee");
    if (!task) throw new AppError(400, "Task already exists", "add Assignee Task Error")

    if (ref) {
        task.assignee = ref;
        await task.save()
    }
    else { throw new AppError(400, `Use 'ref' to update Assignee`, "add Assignee Task Error") }

    sendResponse(res, 200, true, task, null, "Add Assignee success")

});


//update status task by name for user
taskController.updateStatusTask = catchAsync(async (req, res, next) => {

    const { id } = req.params
    let { status, isDeleted = true } = req.body

    let tasks = await Tasks.findOne({ _id: id }).populate("assignee")
    if (!tasks) throw new AppError(400, "Task already exists", "Update Task Error")

    tasks.status = status;

    //logic  by changing isDeleted to true
    if (status === "archive") { tasks.isDeleted = isDeleted } else { tasks.isDeleted = !isDeleted }

    //mongoose query
    tasks = await tasks.save()
    sendResponse(res, 200, true, tasks, null, "Update Status success")

})

//


//export
module.exports = taskController