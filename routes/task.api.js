const express = require("express")
const router = express.Router()
const { createTask, getAllTask, getDetailTaskById, addReference, updateStatusTask } =
    require("../controllers/task.controllers.js")

//Read


/** Create a Task
 * @route POST api/users
 * @description create a task with the required information
 * @body {taskName,description,status}
 * @access public
 */
router.post("/", createTask)


/**Get all Task
 * @route GET api/tasks?page=1&limit=10&taskName=`$taskName`&userName=`$name`
 * @description Get list of Tasks, list tasks of 1 member either by user name of referenceTo
 * @access public
 */
router.get("/", getAllTask)


/**Get a detailed description of a single task by id
 * @route GET api/tasks/:id
 * @description get a single task by id
 * @access public
 */
router.get("/:id", getDetailTaskById)


/** update add task by name for user
 * @route PUT api/task/:taskName
 * @description You could assign member to a task or unassign them (updata ref)
 * @body {ref}
 * @access public 
 */
router.put("/:taskName", addReference)


/** update status 
 * @route PUT api/task/status/:id
 * @description update status task by id for user
 * @body {status}
 * @access public
 */
router.put("/status/:id", updateStatusTask)




//export
module.exports = router