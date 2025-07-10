// const userDB = {
//   users: require("../model/user.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");
// const bcrypt = require("bcrypt");

// const handleLogin = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd) {
//     res.status(400).json({ message: "username and password not found" });
//   }
//   const foundUser = userDB.users.find((person) => person.username === user);
//   if (!foundUser) return res.sendStatus(401);

//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (match) {
//     res.json({ success: `User ${user} is Logged in` });
//   } else {
//     res.sendStatus(401);
//   }
// };

// module.exports = { handleLogin };

// Using JWT Tokens

const userDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).json({ message: "username and password not found" });
  }
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWT
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // this is for saving refresh tokens
    const otherUser = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUser, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
