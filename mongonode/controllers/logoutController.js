const userModel = require("../model/User");

const handleLogout = async (req, res) => {
  // On client also delete the accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;

  //check is refreshtoken in db
  const foundUser = await userModel.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //no content
  }
  //Delete refreshTokens

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result, "logoutcontroller");

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure:true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
