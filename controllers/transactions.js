const router = require("express").Router();
const { addSampleData, addExpense, getTransactions } = require("../db/transactions");
const { getUserId } = require("../db/users");


// router.get("/profile/:sub", async (req, res) => {
//   const userId = req.params.sub;
//   if (!userId) return res.status(404).json({error: "User invalid"});
//   const response = await db.getUserBets(userId);
//   res.status(200).send(response.rows);
// });

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


router.get('/users/:userId', async (req, res) => {
  const {userId} = req.params;
  try {
    const transactions = await getTransactions(userId);
    console.log(transactions)

    // Collapse like transactions into a single one based on categoryId and returns an array
    const combinedData = transactions.reduce((result, currentObj) => {
      const existingObj = result.find(obj => obj.categoryId === currentObj.categoryId);
    
      if (existingObj) {
        existingObj.amount += currentObj.amount;
      } else {
        result.push({ ...currentObj });
      }
    
      return result;
    }, []);

    return res.status(200).json({transactions: combinedData})
    
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error in getting transactions: ", error);
    return res.status(200).json({ error: "Internal server error" });
  }
});

module.exports = router