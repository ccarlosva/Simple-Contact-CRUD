const express = require("express");
const router = express.Router()
const { createUser,
    createLogin,
    getCurrentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.route('/register').post(createUser)
router.route('/login').post(createLogin)
router.route('/current').get(validateToken, getCurrentUser)




module.exports = router