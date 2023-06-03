const User = require("../models/login-model");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = {
  secret: "your-secret-key",
};

//middlewares
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

checkDuplicateUser = async (req, res, next) => {
  User.findOne({
    userID: req.body.username,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! UserID already in use.",
        });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

//Controllers for authentication
signUp = (req, res) => {
  const user = new User({
    userID: req.body.username,
    Passwd: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then(() => {
      return res.status(201).json({
        sucess: true,
        message: "User registered!",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        sucess: false,
        error,
        message: "User not created!",
      });
    });
};

signIn = async (req, res) => {
  await User.findOne({ userID: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({
        sucess: false,
        accessToken: null,
        message: "User Not Found",
      });
    } else {
      var PasswordIsValid = bcrypt.compareSync(req.body.password, user.Passwd);
      if (!PasswordIsValid) {
        return res.status(401).send({
          sucess: false,
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600, // 1 hours
      });
      return res.status(200).json({
        sucess: true,
        id: user._id,
        username: user.userID,
        accessToken: token,
      });
    }
  });
};
module.exports = {
  signUp,
  verifyToken,
  checkDuplicateUser,
  signIn,
};
