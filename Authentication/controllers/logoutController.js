const userDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client also delete the accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204); // no content
  }
  const refreshToken = cookies.jwt;

  //check is refreshtoken in db
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204); //no content
  }
  //Delete refreshTokens

  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "user.json"),
    JSON.stringify(userDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true }); // secure:true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
