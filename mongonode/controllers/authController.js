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

const userModel = require("../model/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).json({ message: "username and password not found" });
  }
  const foundUser = await userModel.findOne({ username: user });

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWT
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // this is for saving refresh tokens

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result, "authcontroller");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
