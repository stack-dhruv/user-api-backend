const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// getting list of all users
router.get("/users", async (req, res) => {
  try {
    //using async over here gives the error
    User.find({}, {password:0})
    .populate('hobbies')
    .exec((error, result) => {
      if (error) res.status(404).send(error);

      res.send(result);
    });

    // User.aggregate([
    //   {
    //     $match: { firstName: "Derril" },
    //   },
    // ]).unwind('email').exec((error, result) => {
    //   if (error) res.status(404).send(error);
    //   res.send(result);
    // });
  } catch (error) {
    res.status(500).send(error);
  }
});

// getting user from particular id
router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.find({_id:req.params.id}, {password:0});

    if (!userData) res.status(404).send(res);

    res.send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// post the user-data in the database
router.post("/users", async (req, res) => {
  try {
    // const userData = new User(req.body);
    // const userData = new User({
    //   firstName : req.body.firstName,
    //   lastName : req.body.lastName,
    //   email : req.body.email,
    //   dob : req.body.dob,
    //   hobbies: ['6264f34d03990361d262e901', '6264f39d5a170fe9e4c19e70', '6264f3aa5a170fe9e4c19e72']
    // })

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    // modifying the bulk userData of req.body with hashed password

    const userData = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      emai:req.body.email,
      dob:req.body.dob,
      password: passwordHash
    });

    userData.save()
      .then((result) => res.json({ message: "successfully added the data" }))
      .catch((error) => res.status(404).send(error));

    // saving the user data in the database
    // await userData.save((error, result) => {
    //   if (error) res.status(404).send(error);

    //   res.send(result);
    // });
  } catch (error) {
    res.status(500).send(error);
  }
});

// updating the data
router.patch("/users/:id", async (req, res) => {
  try {
    
    // validating the request body 
    if (!Object.keys(req.body).length) {
      return res.json({"message":"request body can't be empty"});
    }
    
    const _id = req.params.id;
    
    User.updateOne({ _id}, req.body, (error, result) => {
      if (error) {
        res.status(404).send(error);
      }

      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete the user data
router.delete("/users/:id", async (req, res) => {
  try {
    User.deleteOne({ _id: req.params.id }, (error, result) => {
      if (error) {
        res.status(404).send(error);
      }
      res.json({"message" : "deleted user successfully"});
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// finding the users from specific firstName
router.get("/users/find/:firstName", async (req, res) => {
  try {
    await User.aggregate([
      { $match : { firstName : req.params.firstName }},
      { $project : { password : 0 }},
      { $unwind: "$firstName" },
      { $limit : 1}
    ])
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send(error));

  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
