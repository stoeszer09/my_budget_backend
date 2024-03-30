const DB_URI = process.env.DATABASE_URL;
const { Pool } = require('pg');
const client = new Pool({
    connectionString: DB_URI,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});
const { combineCategoryTransactions } = require("../utility/utils")

// const userExists = async (email, sub) => {
//   // Check to see if a user exists.
//   return (
//       (await client.query(
//           "SELECT user_id FROM users WHERE user_email=$1 OR user_id=$2",
//           [email, sub]
//       ).rows?.length) > 0
//   );
// };

// database.js

// Function to add a sample record to the database
async function addSampleData() {
    try {
        // await client.connect();
        const result = await client.query(
            'SELECT name FROM account_user WHERE name=$1',
            ['Phil']
        );
        console.log('Inserted data:', result.rows[0]);
        return result
    } catch (error) {
        console.error('Error adding sample data:', error);
        return false;
    } 
}

async function addExpense(date, notes, amount, category, userId) {
    try {
        const incomeId = await getCategoryId('income')
        const toCategory = await getCategoryId(category)
        const result = await client.query(
            'INSERT INTO transaction (amount, date, notes, account_user_id, to_category_id, from_category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ',
            [amount, date, notes, userId, toCategory, incomeId]
        );
        console.log('transaction added: ', result.rows)
        return result.rows
    } catch (error) {
        console.error('Error adding sample data:', error);
        return false;
    }
}

async function getCategoryId(name) {
    try {
        const result = await client.query(
            'SELECT id FROM category WHERE name=$1',
            [name]
        )
        return result.rows[0].id
    } catch (error) {
        console.error('Error getting category ID:', error);
        return false;
    }
}

async function getTransactions(userId, year, month) {
    if (!year) {
        year = new Date().getFullYear();
    }
    if (!month) {
        month = new Date().getMonth() + 1;
    }

    try {
        const transactions = await client.query(
            'SELECT transaction.amount AS expense, transaction.to_category_id AS "categoryId" FROM transaction JOIN account_user ON transaction.account_user_id=account_user.id WHERE account_user.auth =$1 AND EXTRACT(YEAR FROM transaction.date) = $2 AND EXTRACT(MONTH FROM transaction.date) = $3',
            [userId, year, month]
        );
        const categories = await client.query(
            'SELECT category.id AS "categoryId", category.amount AS "categoryBudget", category.name AS "categoryName" FROM category JOIN account_user ON category.account_user_id=account_user.id WHERE account_user.auth =$1 AND ((EXTRACT(YEAR FROM category.effective_date) < $2 OR (EXTRACT(YEAR FROM category.effective_date) = $2 AND EXTRACT(MONTH FROM category.effective_date) <= $3)) AND (end_date IS NULL OR (EXTRACT(YEAR FROM category.effective_date) > $2 OR (EXTRACT(YEAR FROM category.effective_date) = $2 AND EXTRACT(MONTH FROM category.effective_date) > $3))))',
            [userId, year, month]
        )
        const combinedCategoryTransactions = combineCategoryTransactions(transactions.rows, categories.rows);
        return combinedCategoryTransactions
    } catch (error) {
        console.error('Error getting transactions:', error);
        return false;
    }
}

// Export the addSampleData function
module.exports = {
    addSampleData,
    addExpense,
    getTransactions,
};
