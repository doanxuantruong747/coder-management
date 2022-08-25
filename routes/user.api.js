const express = require("express")
const router = express.Router()
const { createUser, getAllUser } =
    require("../controllers/user.controllers.js")

//Read

/** Create a User
 * @route POST api/users
 * @description create a user
 * @access public
 */
router.post("/", createUser)


/**GET /users?page=1&limit=10&name=`$userName`&roles=employee||manager
 * @route GET api/users
 * @description Get users with pagination, Get list employee,Get list manager,Search for employee by name
 * @access public
 */
router.get("/", getAllUser)


//export
module.exports = router