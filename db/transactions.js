const DB_URI = process.env.DATABASE_URL;
const { Pool } = require('pg');
const client = new Pool({
    connectionString: DB_URI,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

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

// Export the addSampleData function
module.exports = {
    addSampleData,
    addExpense,
};
