const express = require("express");
const User = require("./MongoDB");
const bcrypt = require("bcrypt");



const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const check = await User.findOne({ email });

    if (check) {
      const isMatch = await bcrypt.compare(password, check.password);
      if (isMatch) {
        res.json("exist");
      } else {
        res.json("incorrect password");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json({error: err});
  }
});

// authRouter.post("/signup", async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     const check = await collection.findOne({email: email });

//     if (check) {
//       return res.json("exist");
//     } 
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const data = {
//       name,
//       email,
//       password: hashedPassword, // Store the hashed password
//     };
    
//     await collection.insertOne([data]);
//     res.json("Sign Up Successfull");
    
//   } catch (err) {                                       
//     res.json({
//       error: err
//     });
//   }
// });


authRouter.post("/signup", async (req, res) => {
  try {
    const { name, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = authRouter;