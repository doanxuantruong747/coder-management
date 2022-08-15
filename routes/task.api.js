const express = require("express")
const router = express.Router()
const { createTask, getAllTask, getDetailTaskById, addReference, addStatusTask, getAllTaskOfOneMember } =
    require("../controllers/task.controllers.js")

//Read


/** Create a Task
 * @route POST api/users
 * @description create a task with the required information
 * @access public
 */
router.post("/", createTask)


/**Get all Task
 * @route GET api/task
 * @description get list of Tasks
 * @access public
 */
router.get("/", getAllTask)


/**Get a detailed description of a single task by id
 * @route GET api/task/:id
 * @description get a single task by id
 * @access public
 */
router.get("/:id", getDetailTaskById)



/**Search all tasks of 1 member either by user name
 * @route GET api/task
 * @description get all tasks of 1 member either by user name of referenceTo
 * @access public
 */
router.get("/search/:userName", getAllTaskOfOneMember)



/** update add task by name for user
 * @route GET api/task/:taskName
 * @description You could assign member to a task or unassign them (updata ref)
 * @access public
 */
router.put("/:taskName", addReference)


/** update status 
 * @route GET api/task/status/:id
 * @description update status task by id for user
 * @access public
 */
router.put("/status/:id", addStatusTask)







//export
module.exports = router