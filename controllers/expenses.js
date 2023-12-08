const router = require("express").Router();
const { addSampleData } = require("../db/transactions");

// router.get("/profile/:sub", async (req, res) => {
//   const userId = req.params.sub;
//   if (!userId) return res.status(404).json({error: "User invalid"});
//   const response = await db.getUserBets(userId);
//   res.status(200).send(response.rows);
// });

router.get('/', async (req, res) => {
  try {
    // Call the function to add sample data
    let data = await addSampleData();
    console.log('here', data.rows[0])
    // Respond with a success message
    res.status(200).json({ message: data.rows[0].name });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error in adding sample data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router