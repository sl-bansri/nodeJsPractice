const userModel = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "username and password not found" });

  // const duplicate = userDB.users.find((person) => person.username === user);
  const duplicate = await userModel.findOne({ username: user });
  // console.log(duplicate, "duplicate");

  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store newuser
    const result = await userModel.create({
      username: user,
      password: hashedPwd,
    });

    // OR

    // const newUser = new User.create({
    //   username: user,
    //   password: hashedPwd,
    // });
    //const result = await newUser.save()

    console.log(result, " result mgdb");
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
