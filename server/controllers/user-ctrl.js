const User = require("../models/users-model");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const body = req;

  body.followers = [];

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
      data: "no user found"
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(x.password, salt);

  x.password = passwordHash;

  x.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: "User created"
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: "User not created" });
    });
};

const login = async (req, res) => {
  await User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, data: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, data: "user not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, data: "Passwords do not match" });
    }

    return res.status(200).json({ success: true, data: user });
  });
};

const getUser = async (req, res) => {
  await User.findOne({ _id: req.params.id }, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, data: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, data: "No user found" });
    }

    return res.status(200).json({ success: true, data: user });
  });
};

const followUser = async (req, res) => {
  //finds the user to follow
  await User.findOne({ _id: req.body.id }, async function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, data: err });
    }

    if (!user) {
      console.log(err);
      res.status(404).json({ success: false, data: "user not found" });
    }
    //finds the user that has reqested to follow the other user
    await User.findOne({ _id: req.body.userId }, async function (err, user2) {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, data: err });
      }

      if (!user2) {
        console.log(err);
        res.status(404).json({ success: false, data: "user not found" });
      }

      console.log(user2);
      user.followers = [...user.followers, req.body.userId];

      user2.following = [...user2.following, req.body.id];
      await user2.save();
      await user.save();

      res.status(200).json({ success: true, data: "Followed user" });
    });
  });
};

module.exports = { createUser, login, getUser, followUser };
