const express = require("express");

const Users = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/register", Users.createUser);
router.post("/login", Users.login);
router.get("/getUser/:id", Users.getUser);
router.post("/follow", Users.followUser);

module.exports = router;
