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
    } finally {
        // Close the database connection
        // await client.end();
        // return result ? result : null
    }
}

// Export the addSampleData function
module.exports = {
    addSampleData,
};
