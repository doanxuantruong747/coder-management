const express = require("express")
const router = express.Router()
const { createUser, getAllUserEmployee, getNameUserEmployee, getAllUser } =
    require("../controllers/user.controllers.js")

//Read

/** Create a User
 * @route POST api/users
 * @description create a user
 * @access public
 */
router.post("/", createUser)


/**Get all your Users
 * @route GET api/users
 * @description get list of Users
 * @access public
 */
router.get("/", getAllUser)


/**Get all your employee
 * @route GET api/users/employee
 * @description get list employee of Users
 * @access public
 */
router.get("/employee", getAllUserEmployee)


/** Search for an employee by name
 * @route GET api/users/:targetName
 * @description Search for an employee by name
 * @access public
 */
router.get("/search/:targetName", getNameUserEmployee)




//export
module.exports = router