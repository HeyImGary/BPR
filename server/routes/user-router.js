const express = require("express");

const Users = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/register", Users.createUser);
router.post("/login", Users.login);

module.exports = router;
