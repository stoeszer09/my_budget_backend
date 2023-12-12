const router = require("express").Router();
const { addUser, updateUserName } = require("../db/users");

// router.get("/profile/:sub", async (req, res) => {
//   const userId = req.params.sub;
//   if (!userId) return res.status(404).json({error: "User invalid"});
//   const response = await db.getUserBets(userId);
//   res.status(200).send(response.rows);
// });

// router.get('/', async (req, res) => {
//   try {
//     // Call the function to add sample data
//     let data = await addSampleData();
//     console.log('here', data.rows[0])
//     // Respond with a success message
//     res.status(200).json({ message: data.rows, random: Math.random() });
//   } catch (error) {
//     // Handle errors and respond with an error message
//     console.error("Error in adding sample data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// GET /users
router.get('/', (req, res) => {
  res.status(200).send({ message: 'List of users worked' });
});

// POST /users
router.post('/', async (req, res) => {
  const {name, auth} = req.body;
  if (!name || !auth) {
    res.status(401).send({ message: 'No data' })
  }  
  const result = await addUser(name, auth)
  res.status(200).send({ message: result.rows });
});

// GET /users/
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Retrieve user worked' });
});

// PUT /users/
router.put('/', (req, res) => {
  res.status(200).send({ message: 'Update user worked' });
});

// GET /users/:userId/recurring
router.get('/recurring', (req, res) => {
  res.status(200).send({ message: 'List of recurring transactions worked' });
});

// POST /users/recurring
router.post('/recurring', (req, res) => {
  res.status(200).send({ message: 'Create recurring transaction worked' });
});

// GET /users/categories
router.get('/categories', (req, res) => {
  res.status(200).send({ message: 'List of categories worked' });
});

// POST /users/categories
router.post('/categories', (req, res) => {
  res.status(200).send({ message: 'Create category worked' });
});

// GET /users/monthly-budgets
router.get('/monthly-budgets', (req, res) => {
  res.status(200).send({ message: 'List of monthly budgets worked' });
});

// PUT /users/monthly-budgets
router.put('/monthly-budgets', (req, res) => {
  const { name, budget, user} = req.body;
  const currentMonth = new Date().getMonth() + 1;
  if (name !== user.nickname) {
    updateUserName(name, user.sub)
  }
  res.status(200).send({ message: 'monthly budget updated' });
});

module.exports = router