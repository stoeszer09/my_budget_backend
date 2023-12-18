const router = require("express").Router();
const { addSampleData, addExpense } = require("../db/transactions");
const { getUserId } = require("../db/users");


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
    return res.status(200).json({ message: data.rows, random: Math.random() });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error in adding sample data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/', async (req, res) => {
  const { date, notes, amount, category, user } = req.body;

  if (!user || !user.sub) {
    return res.status(401).send({ message: 'No data' })
  }
  
  try {
    const userId = await getUserId(user.sub)
    const result = await addExpense(date, notes, amount, category, userId);

    res.status(200).send({ message: 'transaction added' });
  } catch (error) {
    console.log('error adding transaction: ', error)
  }
})

module.exports = router