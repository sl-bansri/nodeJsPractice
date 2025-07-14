const userModel = require("../model/User");

const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  // const foundUser = userDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );

  // const foundUser = await userModel.findOne({ refreshToken }).exac();

  const foundUser = await userModel.findOne({ refreshToken });

  if (!foundUser) return res.sendStatus(403); // forbidden
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
