const Hobby = require("../models/hobbies");
const router = require("express").Router();

router.get("/api/hobby",async (req, res) => {
  try {
    await Hobby.find({})
    .exec((error, result) => {
        if (error) res.status(404).send(error);
        console.log("/api/hobby = GET = result received");
        res.send(result);
    });
  } catch (error) {
      res.status(500).send(error);
  }
});

router.post("/api/hobby", async (req, res) => {
    try {
        if(!req.body) res.status(403).send('Body must be provided');

        const hobby = new Hobby(req.body);
        await hobby.save((error, result) => {
            if (error) {
                res.send(error);
            }
            console.log("/api/hobby = POST = result received");
            res.send(result);
        })
    } catch (error) {
        res.send(500).send(error);
    }
})

module.exports = router;