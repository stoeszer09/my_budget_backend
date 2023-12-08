const router = require("express").Router();
const { addUser } = require("../db/users");

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
    res.status(200).json({ message: data.rows, random: Math.random() });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error in adding sample data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /users
// router.get('/', (req, res) => {
//   res.status(200).send({ message: 'List of users worked' });
// });

// POST /users
router.post('/', async (req, res) => {
  const result = await addUser('Phil', '123abc')
  res.status(200).send({ message: result.rows });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  res.status(200).send({ message: 'Retrieve user worked' });
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  res.status(200).send({ message: 'Update user worked' });
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  res.status(200).send({ message: 'Delete user worked' });
});

// GET /users/:userId/recurring
router.get('/:userId/recurring', (req, res) => {
  res.status(200).send({ message: 'List of recurring transactions worked' });
});

// POST /users/:userId/recurring
router.post('/:userId/recurring', (req, res) => {
  res.status(200).send({ message: 'Create recurring transaction worked' });
});

// GET /users/:userId/categories
router.get('/:userId/categories', (req, res) => {
  res.status(200).send({ message: 'List of categories worked' });
});

// POST /users/:userId/categories
router.post('/:userId/categories', (req, res) => {
  res.status(200).send({ message: 'Create category worked' });
});

// GET /users/:userId/monthly-budgets
router.get('/:userId/monthly-budgets', (req, res) => {
  res.status(200).send({ message: 'List of monthly budgets worked' });
});

// POST /users/:userId/monthly-budgets
router.post('/:userId/monthly-budgets', (req, res) => {
  res.status(200).send({ message: 'Create monthly budget worked' });
});

module.exports = router