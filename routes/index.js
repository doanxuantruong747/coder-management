const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('CoderManagement');
});

const userRouter = require('./user.api.js')
router.use("/users", userRouter)

const taskRouter = require('./task.api.js')
router.use("/task", taskRouter)

module.exports = router;
