const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck)
            return res.json({msg: "Username already exists", status: false});
        
        const emailCheck = await User.findOne({ email });
        if(emailCheck)
            return res.json({ msg: "Email already used", status: false });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });

    }catch (ex) {
        next(ex);
    }
};


module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
        userId,
        {
            isAvatarImageSet: true,
            avatarImage,
        },
        { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (ex) {
        next(ex);
    }
};


module.exports.logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };


module.exports.getAllUsers = async(req, res, next) => {
    try{
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
            ]);
            return res.json(users);

    }catch(ex){
        next(ex)
    }
}




//   router.post("/register", async (req, res) => {
//     try {
//       //generate new password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
//       //create new user
//       const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPassword,
//       });
  
//       //save user and respond
//       const user = await newUser.save();
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   });


