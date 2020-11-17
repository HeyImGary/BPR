const User = require("../models/users-model");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const body = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user"
    });
  }

  const x = new User(req.body);

  if (!x) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(x.password, salt);

  console.log(passwordHash);
  x.password = passwordHash;

  x.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: x._id
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: "User not created" });
    });
};

const login = async (req, res) => {
  const loginBody = await req.body;
  console.log(req.body.username);
  //console.log(loginBody);

  await User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }

    return res.status(200).json({ success: true, data: user });
  });
};

module.exports = { createUser, login };
