const router = require("express").Router();
const db = require("../db/transactions");

// router.get("/profile/:sub", async (req, res) => {
//   const userId = req.params.sub;
//   if (!userId) return res.status(404).json({error: "User invalid"});
//   const response = await db.getUserBets(userId);
//   res.status(200).send(response.rows);
// });

router.get('/', (req, res) => {
  res.status(200).send('hi')
})

module.exports = router